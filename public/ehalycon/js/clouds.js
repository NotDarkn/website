/*
based on spite/CSS3DClouds, with some modifications and refactoring

original: https://github.com/spite/CSS3DClouds/
*/

/*
MIT License

Copyright (c) 2020 Jaume Sanchez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

let world = document.getElementById("cloud_world");
let viewport = document.getElementById("cloud_viewport");
let objects = [];
let layers = [];

let world_angle_x = 0;
let world_angle_y = 0;
let distance = 0;

let frame_count = 0;
let previous_time = 0;
let previous_frame = 0;
let framerate;

//mouse event listeners
window.addEventListener("mousemove", event => {
  let degrees = 10; //camera rotation range 
  world_angle_y = -(0.5 - (event.clientX / window.innerWidth)) * degrees;
  world_angle_x = (0.5 - (event.clientY / window.innerHeight)) * degrees;
  update_view();
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
window.addEventListener("scroll", event => {
  let pos = document.documentElement.scrollTop || document.body.scrollTop;
  let max = document.documentElement.scrollHeight || document.body.scrollHeight;
  distance = (pos / max) * 2400;
  // distance = pos;
  update_view();
})

//update rotation and camera distance
function update_view() {
  world.style.transform = `
    translateZ(${distance}px)
    rotateX(${world_angle_x}deg)
    rotateY(${world_angle_y}deg)
  `;
}

//create 5 randomly spaced clouds
function generate() {
  objects = [];
  layers = [];
  if (world.hasChildNodes()) {
    while (world.childNodes.length >= 1) {
      world.removeChild(world.firstChild);
    }
  }

  for (let i = 0; i < 5; i++) {
    objects.push(create_cloud());
  }
}

//creates a single cloud with a randomized number of layers
function create_cloud() {
  let cloud_base = document.createElement("div");
  cloud_base.className = "cloud_base";

  let cloud_x = -window.innerWidth / 4 + Math.random() * window.innerWidth / 2;
  let cloud_y = Math.random() * window.innerHeight / 2;
  let cloud_z = Math.random() * 200;

  cloud_base.style.transform = `
    translateX(${cloud_x}px)
    translateY(${cloud_y}px)
    translateZ(${cloud_z}px)
  `;
  world.append(cloud_base);

  let iterations = 5 + Math.round(Math.random() * 10);
  for (let i = 0; i < iterations; i++) {
    let cloud_layer = document.createElement("div");
    let data = {
      x: -256 + Math.random() * 512,
      y: -170 + Math.random() * 340,
      z: -256 + Math.random() * 512,
      rotation: Math.random() * 360,
      scale: 1 + Math.random(),
      speed: -1 / 32 + Math.random() / 16
    };
    cloud_layer.className = "cloud_layer";
    cloud_layer.style.transform = `
      translateX(${data.x}px)
      translateY(${data.y}px)
      translateZ(${data.z}px)
      rotateZ(${data.rotation}deg)
      scale(${data.scale})
    `;
    cloud_layer.data = data;

    cloud_base.append(cloud_layer);
    layers.push(cloud_layer);
  }

  return cloud_base;
}

//calculate framerate (500ms average)
function timer() {
  let now = performance.now() / 1000;
  framerate = (frame_count - previous_frame) / (now - previous_time);
  previous_frame = frame_count;
  previous_time = now;
}

//slightly rotate each cloud to give illusion of movement
function apply_rotations() {
  for (let layer of layers) {
    let data = layer.data;
    data.rotation += data.speed;
    data.rotation %= 360;
  }
}

function update() {
  for (let layer of layers) {
    let data = layer.data;

    layer.style.transform = `
      translateX(${data.x}px)
      translateY(${data.y}px)
      translateZ(${data.z}px)
      rotateY(${-world_angle_y}deg)
      rotateX(${-world_angle_x}deg)
      rotateZ(${data.rotation}deg)
      scale(${data.scale})
    `;
  }

  frame_count++;
  requestAnimationFrame(update);
}

update();
setInterval(timer, 500);
setInterval(apply_rotations, 50 / 3);
