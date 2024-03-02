uniform sampler2D uTextureStart;
uniform sampler2D uTextureEnd;
uniform float uProgress;

varying vec2 vUv;

float inverseLerp(float value, float minValue, float maxValue) {
    return (value - minValue) / (maxValue - minValue);
}

float remap(float value, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(value, inMin, inMax);
    return mix(outMin, outMax, t);
}

void main() {
    vec4 textureStart = texture2D(uTextureStart, vUv);
    vec4 textureEnd = texture2D(uTextureEnd, vUv);
    float pct = vUv.x;

    float progression = remap(uProgress, 0., 1., 0.5, 1.);
    float yRange = remap(vUv.y, 0., 1., -1., 1.);
    float xCompansation = 1. - abs(remap(uProgress, 0., 1., -1., 1.));

    float dist = cos((yRange + 10.) * 40.) * 0.03 * xCompansation;

    pct = smoothstep(progression - 0.05, progression + 0.05, pct + dist);

    vec4 finalTexture = mix(textureStart, textureEnd, pct);

    gl_FragColor = finalTexture;
}