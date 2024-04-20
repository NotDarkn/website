const $ = (_) => document.querySelector(_);

window.addEventListener("load", () => {
  $("#injector_output").value = "";
  $("#hd_image").addEventListener("change", (e) => {
    if ($("#hd_image").files.length < 0) {
      alert("Please select a file!");
    } else {
      startVM();
    }
  });
});
window.addEventListener(
  "beforeunload",
  (event) => {
    if (building) {
      event.preventDefault();
      event.returnValue = "";
    }
  },
  { capture: true },
);
function start() {
  $("#injector_output").value = "";
  const hdImageInput = $("#hd_image");
  hdImageInput.setAttribute("accept", ".bin");
  hdImageInput.click();
}
function startVM() {
  var emulator = (window.emulator = new V86Starter({
    wasm_path: "/sh1mmer/wax4web/v86.wasm",
    memory_size: 512 * 1024 * 1024,
    vga_memory_size: 2 * 1024 * 1024,
    screen_container: $("#screen_container"),
    bios: {
      url: "/sh1mmer/wax4web/seabios.bin",
    },
    vga_bios: {
      url: "/sh1mmer/wax4web/vgabios.bin",
    },
    bzimage: {
      url: "/sh1mmer/wax4web/bzImage",
    },
    initrd: {
      url: "/sh1mmer/wax4web/legacy",
    },
    hda: {
      buffer: document.all.hd_image.files[0],
    },
    serial_container: $("#injector_output"),
    autostart: true,
  }));
  emulator.add_listener("serial0-output-char", function (char) {
    data += char;
    if (data.endsWith("Your shim has finished building")) {
      generateURL();
    }
  });
  building = true;
}
function generateURL() {
  building = false;
  document.all.downloadURL.href = window.URL.createObjectURL(
    emulator.disk_images.hda.get_as_file(),
  );
  document.all.downloadURL.click();
}
var data = "";
var building = false;