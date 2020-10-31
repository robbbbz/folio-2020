export const fragmentShader = /* glsl*/ `
uniform vec3 color;
uniform vec2 resolution;
uniform float time;
uniform sampler2D texture;

varying vec2 vUv;
  void main () {
    vec4 t = texture2D(texture, vUv);


    gl_FragColor = t;
  }
`;