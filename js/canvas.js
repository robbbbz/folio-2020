import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {vertexShader} from "../shaders/vertex.js"
import {fragmentShader} from "../shaders/fragment.js"
const canvasSketch = require("canvas-sketch");




export const sketch = ({ context }) => {
    
  var el = document.querySelector('canvas');
  document.getElementById("container").appendChild(el);


  const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    color: { value: new THREE.Color('green') }
  },
  side: THREE.DoubleSide
});


  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("white", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 200);
  camera.position.set(0, 0, -40);
  // Look at the point of origin
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup texture
  // We load once for the sake of optimization
  const textureLoader = new THREE.TextureLoader();



  // Setup Light
  const lightGroup = new THREE.Group();

  const light = new THREE.PointLight("white", 1);
  const light2 = new THREE.PointLight("white", 1);
  light.position.set(0, 10, 0);
  light2.position.set(0, -10, 0);
  lightGroup.add(light);
  lightGroup.add(light2);
  scene.add(lightGroup);
  scene.add(new THREE.PointLightHelper(light, 2))

  const geometry = new THREE.PlaneGeometry( 5, 20, 32 );
  const material2 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

  const plane = new THREE.Mesh( geometry, material );
  scene.add( plane );
  scene.add(new THREE.GridHelper(100, 40));

 
  /*
  modelLoader.load(
    // resource URL
    GLTFModel,
    // called when the resource is loaded
    (gltf) => {
      console.log(gltf)
      const gltfScale = new THREE.Vector3(0.2, 0.2, 0.2);
      console.log("gltfscale", gltfScale)
      gltf.scene.scale.copy(gltfScale);
      let model = gltf.scene.children[0].children[0].children[0].children[0];
      console.log("model", model)
      model.position.set(5, 0, 0);
      model.scale.set(0.8, 0.8, 0.8);
      model.rotateX(Math.PI / -2);
      model.rotateY(Math.PI / -16);
      model.rotateZ(Math.PI / 2);
      model.material = material;
      console.log("model", model);

      
      //sample random points from mesh surface
      let sampler = new MeshSurfaceSampler(model)
        .setWeightAttribute('uv')
        .build();

      let number = 1000;
      let position = new THREE.Vector3();
      let normal = new THREE.Vector3();


      let geometry = new THREE.BufferGeometry();
      let bufferPosition = new Float32Array(number*3);


      for (var i = 0; i < number; i++) {
        sampler.sample(position, normal);
        // i*3 is the index in the current array
        bufferPosition.set([position.x,position.y,position.z],i*3)
        //console.log("bufferPosition.set("+i*3+")")
      }
      // we add the array in the buffer geometry
      geometry.setAttribute('position', new THREE.BufferAttribute(bufferPosition,3));
      

      //get points from model
      let points = new THREE.Points(geometry, material);
      scene.add(points)

      // gltf.scene
      //scene.add(model);
      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object

    },
    // called while loading is progressing
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    (error) => {
      console.log('An error happened');
    }
  );

*/

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {

      //controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      // controls.dispose();
      renderer.dispose();
    }
  };
};

export const settings = {
  /*   // Make the loop animated
    // dimensions: [512,512],
    // units : 'cm',
    scaleToView: 'true',
    pixelsPerInch: 72, 
    orientation: 'landscape', */
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};
