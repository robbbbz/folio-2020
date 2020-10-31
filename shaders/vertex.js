
export const vertexShader = /* glsl*/ `
varying vec2 vUv;

uniform float time;
void main () {
  //vUv = uv;
  vUv = (uv - vec2(0.5))*0.9 + vec2(0.5);

  vec3 pos = position;
  pos.y += sin(time*1.2)*0.3;
  vUv.y -= sin(time*0.4)*0.03;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
