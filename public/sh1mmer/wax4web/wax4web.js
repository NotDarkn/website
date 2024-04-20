// wax4web

var ENABLE_WAX4WEB = true;

if (!ENABLE_WAX4WEB) throw "wax4web is disabled on this site";

const wax4webTarZipChunks = 2;
const minDiskSize = 1024 * 1024 * 1024; // 1 GiB
let waxOptions;
let startButton;
let downloadButton;
let displayContainer;
let linuxOutput;
let waxOutput;
let building = false;
let waxTextOut = "";
let waxOutputIO;
let curLoadingFile = "";
let uploadedName = "shim.bin";

function uploadFile(accept, callback) {
	var input = document.createElement("input");
	input.type = "file";
	input.accept = accept;
	input.onchange = async function() {
		callback(this.files[0]);
	}
	input.click();
}

function unzipFile(data) {
	return new Promise(async function(resolve, error) {
		let entries = await new zip.ZipReader(new zip.Uint8ArrayReader(new Uint8Array(data))).getEntries();
		if (entries.length) {
			for (var i = 0; i < entries.length; i++) {
				if (!entries[i].directory) {
					resolve(await entries[i].getData(new zip.Uint8ArrayWriter()));
					break;
				}
				if (i == entries.length - 1) error();
			}
		}
		error();
	});
}

function getTime() {
	var dateTime = new Date();
	return dateTime.getFullYear().toString()+"-"+(dateTime.getMonth()+1).toString()+"-"+dateTime.getDate().toString()+"-"+dateTime.getHours().toString()+"-"+dateTime.getMinutes().toString();
}

function progressFetch(url) {
	return new Promise(function(success, fail) {
		var req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.responseType = "arraybuffer";
		req.onload = function() {
			if (req.status >= 400) {
				if (fail) fail(req.status);
			} else {
				if (success) success(this.response);
			}
		}
		req.onprogress = function(e) {
			if (e.lengthComputable) updateLoadProgress(url, e.loaded / e.total);
		}
		req.onerror = function() {
			if (fail) fail("unknown");
		}
		req.send();
	});
}

function concatBuffers(buffers) {
	let buffer = new Uint8Array(buffers.reduce((s, v) => s + v.byteLength, 0));
	let curOffset = 0;
	for (var i = 0; i < buffers.length; i++) {
		buffer.set(new Uint8Array(buffers[i]), curOffset);
		curOffset += buffers[i].byteLength;
	}
	return buffer.buffer;
}

async function fetchWax4WebTar() {
	console.log("fetching wax4web.tar.zip");
	let chunks = [];
	for (var i = 0; i < wax4webTarZipChunks; i++) {
		chunks.push(await progressFetch("/sh1mmer/wax4web/wax4web_tar_zip/" + i + ".bin"));
	}
	var wax4WebTar = await unzipFile(concatBuffers(chunks));
	return wax4WebTar;
}

function growBlob(blob, size) {
	var addedSize = size - blob.size;
	if (addedSize <= 0) return blob;
	return new Blob([blob, new ArrayBuffer(addedSize)]);
}

async function doneBuilding() {
	console.log("done building");
	var finalSizeFile = await emulator.read_file("/finalsize");
	var finalBytes = parseInt(new TextDecoder().decode(finalSizeFile));
	console.log("final bytes: " + finalBytes);
	var blob = emulator.disk_images.hda.get_as_file().slice(0, finalBytes, "application/octet-stream");
	downloadButton.download = "injected_" + getTime() + "_" + uploadedName;
	downloadButton.href = URL.createObjectURL(blob);
	downloadButton.style.display = "block";
	downloadButton.click();
}

function updateLoadProgress(name, percent) {
	if (name != curLoadingFile) {
		if (curLoadingFile.length) waxOutputIO.print("\n");
		curLoadingFile = name;
	}
	waxOutputIO.print("\rLoading " + name + " " + Math.round(percent * 100) + "%  ");
}

function initFromFile(file) {
	uploadedName = file.name;
	if (file.size < minDiskSize) file = new File([growBlob(file, minDiskSize)], file.name);
	waxOptions.querySelectorAll("input").forEach(e => e.setAttribute("disabled", ""));
	startButton.style.display = "none";
	linuxOutput.textContent = "Loading...";
	displayContainer.style.display = "flex";
	console.log("creating emulator...");
	window.emulator = new V86Starter({
		wasm_path: "/sh1mmer/wax4web/v86.wasm",
		memory_size: 512 * 1024 * 1024,
		vga_memory_size: 2 * 1024 * 1024,
		screen_container: document.getElementById("screen_container"),
		bios: {
			url: "/sh1mmer/wax4web/seabios.bin"
		},
		vga_bios: {
			url: "/sh1mmer/wax4web/vgabios.bin"
		},
		bzimage: {
			url: "/sh1mmer/wax4web/bzImage"
		},
		initrd: {
			url: "/sh1mmer/wax4web/rootfs.cpio.gz"
		},
		hda: {
			buffer: file
		},
		filesystem: {},
		autostart: false
	});
	emulator.add_listener("download-progress", function(p) {
		if (p.lengthComputable) updateLoadProgress(p.file_name, p.loaded / p.total);
	});
	emulator.add_listener("emulator-ready", async function() {
		var opts = Array.from(waxOptions.querySelectorAll("input[type=checkbox]"));
		for (var i = 0; i < opts.length; i++) {
			if (opts[i].checked) await emulator.create_file("/opt." + opts[i].name, new Uint8Array());
		}
		await emulator.create_file("/wax4web.tar", await fetchWax4WebTar());
		console.log("running...");
		emulator.run();
	});
	emulator.add_listener("serial0-output-byte", async function(byte) {
		waxOutputIO.writeUTF8(new Uint8Array([byte]));
		waxTextOut += String.fromCharCode(byte);
		if (waxTextOut.endsWith("Your shim has finished building")) {
			building = false;
			doneBuilding();
		}
	});
	function writeData(str) {
		emulator.serial0_send(str);
	}
	waxOutputIO.onVTKeystroke = writeData;
	waxOutputIO.sendString = writeData;
	building = true;
}

function loadWax4Web() {
	waxOptions = document.getElementById("waxOptions");
	startButton = document.getElementById("startButton");
	downloadButton = document.getElementById("downloadButton");
	displayContainer = document.getElementById("displayContainer");
	linuxOutput = document.getElementById("linuxOutput");
	waxOutput = new hterm.Terminal({storage: new lib.Storage.Memory()});
	waxOutput.decorate(document.getElementById("waxOutput"));
	waxOutput.installKeyboard();
	waxOutput.onTerminalReady = function() {
		waxOutput.setFontSize(13);
		waxOutputIO = waxOutput.io.push();
		waxOutputIO.print("\x1b[?25l");
		startButton.addEventListener("click", function() {
			uploadFile(".bin, .img", initFromFile);
		}, false);
		startButton.classList.remove("disabled");
	}
}

window.addEventListener("load", loadWax4Web, false);
window.onbeforeunload = function() {
	if (building) return true;
}
