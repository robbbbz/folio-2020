import { sketch, settings, meshes } from "./canvas.js";

const canvasSketch = require("canvas-sketch");

let speed = 0;
let position = 0;
let block = document.getElementById("block");
let wrap = document.getElementById("wrap");
let elems = [...document.querySelectorAll(".n")];

let objs = Array(5).fill({ dist: 0 });


let attractMode = false;
let attractTo = 0;

window.addEventListener("wheel", (e) => {
  // delta Y => strength of scroll
  speed += e.deltaY * 0.0003;
  position += speed;
  // decrease the speed
  speed *= 0.8;
  // move the html elements slowly than regular scroll
  wrap.style.transform = `translate(0,${position * 100 + 50}px)`;

  let rounded = Math.round(position);

  // deviation from initial position to scroll pos
  let diff = rounded - position;
  // go back to original pos with deviation
  position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015;
});

function raf() {

  if(attractMode){
    console.log("in")
    position += -(position - attractTo)*0.05;
  }

  window.requestAnimationFrame(raf);

  objs.forEach((o, i) => {
    o.dist = Math.min(Math.abs(position - i), 1);

    // block value betw 0 & 1
    // 1 for the center block and 0 for the rest
    o.dist = 1 - o.dist ** 2;
    elems[i].style.transform = `scale(${1 + 2 * o.dist})`;
    // apply scroll position to update geometries position
    // check if meshes exists otherwise error because no meshes  😥😥😥😥😥
    if (meshes.length > 0) {
      let wheelScale = 1 + objs[i].dist;
      meshes[i].position.x = -i * 10 + position * 10;
      meshes[i].scale.set(wheelScale, wheelScale, wheelScale);
      meshes[i].material.uniforms.distanceToCenter.value = o.dist;
    }
  }
);
}

raf();
canvasSketch(sketch, settings);

let navs = [...document.querySelectorAll('li')];
let nav = document.querySelector('.nav');

nav.addEventListener('mouseenter',()=>{
  attractMode = true;
})
nav.addEventListener('mouseover',()=>{
  attractMode = true;
})

navs.forEach((el)=>{
  
  el.addEventListener('mouseover',(e)=>{
    console.log(e.target.getAttribute('data-nav'));
    attractTo = Number(e.target.getAttribute('data-nav'));
  })
})