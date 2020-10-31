export const fragmentShader = /* glsl*/ `
uniform vec3 color;
uniform vec2 resolution;
uniform float time;
uniform sampler2D texture;
uniform float distanceToCenter;

varying vec2 vUv;
  void main () {

    //sampling texture
    vec4 t = texture2D(texture, vUv);
    gl_FragColor = t;

    //not necessary
    float bw = (t.r,t.g,t.b)/3.;
    vec4 newVec = vec4(bw, bw, bw, 1.);
    gl_FragColor = mix(newVec, t ,distanceToCenter);

    //deal w/ alpha
    gl_FragColor.a = clamp(distanceToCenter, 0.6,1.0);
  }
`;