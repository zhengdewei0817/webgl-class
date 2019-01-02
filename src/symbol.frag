precision highp float;
uniform sampler2D uSampler;
uniform bool uForRenderPNG8Text;
uniform bool uHighlight;
varying vec2 vTextureCoord;
void main(void) {
    vec4 color = texture2D(uSampler, vTextureCoord);
    if (uForRenderPNG8Text == true && color.a < 0.7) {
        color.a = 0.0;
    }
    if (uHighlight == true) {
        float a = color.a;
        if (a != 0.0) {
            float r = color.r;
            float g = color.g;
            float b = color.b;
            float m = floor((r * 255.0 + g * 255.0 + b * 255.0) / 3.0 + 0.5);
            float diff = m - 90.0;
            if (diff < 0.0) {
                diff = 0.0;
            }
            color.r = (51.0 + diff * 1.3) / 255.0;
            color.g = (133.0 + diff * 0.8) / 255.0;
            color.b = 1.0;
        }
    }
    gl_FragColor = color;
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
