
export const vertexShader = /* glsl*/ `
varying vec2 vUv;

uniform float time;
void main () {
  vUv = uv;
  
  vec3 pos = position;
  pos.y += sin(time)*0.3;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
