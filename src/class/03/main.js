function Main () {
  this.webgl = window.utils.g_gl('myCanvas');
  this.program = null;

  this.jsArrayData = [
    -0.5, 0.5, 0.0,
    0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0,
  ]
  this.jsArrayIndex = [
    0,1,2,
    0,2,3
  ]

  this.init();
}

Main.prototype.init = function() {
  var vertexShaderObject = this.webgl.createShader(this.webgl.VERTEX_SHADER);
  var fragmentShaderObject = this.webgl.createShader(this.webgl.FRAGMNET_SHADER);

  this.webgl.shaderSource(vertexShaderObject, window.utils.getShaderSource('shader-vs'));
  this.webgl.shaderSource(fragmentShaderObject, window.utils.getShaderSource('shader-fs'));

  this.webgl.compileShader(vertexShaderObject);
  this.webgl.compileShader(fragmentShaderObject);

  this.program = this.webgl.createProgram();
  this.webgl.attachShader(this.program, vertexShaderObject);
  this.webgl.attachShader(this.program, fragmentShaderObject);

  this.webgl.linkProgram(this.program);

  this.webgl.useProgram(this.program);
}

Main.prototype.initDraw = function () {
  this.v3PositionIndex = this.webgl.getAttribLocation(this.program, 'v3Position');
  
  this.buffer = this.webgl.createBuffer();
  this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.buffer);
  this.webgl.bufferData(this.webgl.ARRAY_BUFFER, new Float32Array(this.jsArrayData), this.webgl.SRARIC_DRAW);
  
}

Main.prototype.draw = function () {
  this.webgl.clear(this.webgl.COLORE_BUFFER_BIT);
  // 创建缓冲区
  // 确定缓冲区类型
  // 绑定缓冲区
  // 获取getAttribLocation
  // 启用顶点缓冲区
  // 设置顶点缓冲区类型
  this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.buffer);


}

var main = new Main();
main.initDraw();