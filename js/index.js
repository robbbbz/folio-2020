import {sketch,settings} from "./canvas.js"
const canvasSketch = require("canvas-sketch");

let speed = 0;
let position = 0;
let block = document.getElementById("block");
let wrap = document.getElementById("wrap");
let elems = [...document.querySelectorAll('.n')];


let objs = Array(5).fill({dist:0});


window.addEventListener("wheel", (e)=>{
  // delta Y => strength of scroll
  speed += e.deltaY * 0.0003;
  position += speed;
  // decrease the speed
  speed *=0.8;
  // move the html elements slowly than regular scroll
  wrap.style.transform = `translate(0,${position*100+50}px)`

  let rounded = Math.round(position);

  // Increment the position with a tiny fraction of diff
  let diff = (rounded-position);
  // Increment the diff with a factor of 0.7
  position += Math.sign(diff)*Math.pow(Math.abs(diff), 0.7) * 0.015;
 
})


function raf(){
  window.requestAnimationFrame(raf);

  objs.forEach((o,i)=>{
    o.dist = Math.min(Math.abs(position - i),1);
    o.dist = 1 - o.dist**2;
    elems[i].style.transform = `scale(${1 +2 *o.dist})`
  })
  
}

raf();
canvasSketch(sketch, settings);
