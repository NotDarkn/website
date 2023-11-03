async function start() {
    if (!("showSaveFilePicker" in window)) {
      try {
        const compatAlert = document.querySelector("#compatAlert");
        compatAlert.style.display = "initial";
      } catch (e) {
        console.log(e);
      }
    }

    if (isMobileDevice = true) {
        try {
            const mobileAlert = document.querySelector("#mobileAlert");
            const compatAlert = document.querySelector("#compatAlert");
            mobileAlert.style.display = "initial";
            compatAlert.style.display = "none";
          } catch (e) {
            console.log(e);
          }
    }

    let data;
    try {
      data = await (await fetch("data.json")).json();
    } catch (error) {
      console.error(error);
      try {
        const dataAlert = document.querySelector("#dataAlert");
        dataAlert.style.display = "initial";
      } catch (e) {
        console.log(e);
      }
    }

    const select = document.querySelector("#mirror");
    for (let mirror in data) {
      let opt = new Option(mirror);
      select.appendChild(opt);
    }
    const file = document.querySelector("#file");
    let children = [];
    select.addEventListener("change", () => {
      for (let child of children) {
        child.remove();
      }
      children = [];

      for (let name in data[select.value]) {
        let opt = new Option(name);
        file.appendChild(opt);
        children.push(opt);
      }
    });

    const download = document.querySelector("#download");

    const progress = document.querySelector("#progress");

    download.addEventListener("click", async () => {
      let urls = data[select.value][file.value];

      if (typeof urls === "object") {
        let ws_dest = await window
          .showSaveFilePicker()
          .then((handle) => handle.createWritable());
        window.wsd = ws_dest;

        try {
          for (let i in urls) {
            let url = urls[i];
            let req = await fetch(url);
            if (req.status != 200) {
              const defectiveMirrorAlert = document.querySelector(
                "#defectiveMirrorAlert",
              );
              defectiveMirrorAlert.style.display = "initial";
              await sleep(7000);
              window.location.reload();
            }
            await req.body.pipeTo(ws_dest, { preventClose: true });
            progress.style.display = "";
            progress.innerText = `Progress: ${Math.floor(
              (i / urls.length) * 100,
            )}%`;
          }
        } catch {
          const corsAlert = document.querySelector("#corsAlert");
          corsAlert.style.display = "initial";
          await sleep(20000);
          window.location.reload();
        }

        console.log("done!");

        progress.innerText = `Progress: Done!`;
        ws_dest.close();
      } else if (urls) {
        window.open(urls);
      }
    });

    const mirror = document.querySelector("#mirror");
    const boardd = document.querySelector("#file");
    const downloadd = document.querySelector("#download");

    mirror.addEventListener("change", () => {
      if (mirror.value !== "select a mirror") {
        boardd.style.display = "initial";
      } else {
        boardd.style.display = "none";
        downloadd.style.display = "none";
      }
    });

    boardd.addEventListener("change", () => {
      if (boardd.value !== "select a board") {
        downloadd.style.display = "initial";
      } else {
        downloadd.style.display = "none";
      }
    });
  }
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
 }