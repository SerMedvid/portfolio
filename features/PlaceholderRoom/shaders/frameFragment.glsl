uniform float uProgress;
uniform float uDisplacementFactor;
uniform sampler2D uTextureStart;
uniform sampler2D uTextureEnd;
uniform sampler2D uDisplacementTexture;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    vec4 dispTexture = texture2D(uDisplacementTexture, vUv);

    vec2 distortedPosition = vec2(uv.x + uProgress * (dispTexture.r * uDisplacementFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x - (1.0 - uProgress) * (dispTexture.r * uDisplacementFactor), uv.y);

    vec4 textureStart = texture2D(uTextureStart, distortedPosition);
    vec4 textureEnd = texture2D(uTextureEnd, distortedPosition2);

    vec4 finlaTexture = mix(textureStart, textureEnd, uProgress);

    gl_FragColor = finlaTexture;
}