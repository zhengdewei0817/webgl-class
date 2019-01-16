function Main () {
  this.webgl = window.utils.g_gl('myCanvas');
  this.program = null;
  this.ang = 0;
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
  var fragmentShaderObject = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);

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
  this.anim = this.webgl.getUniformLocation(this.program, 'anim');


  this.buffer = this.webgl.createBuffer();
  this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.buffer);
  this.webgl.bufferData(this.webgl.ARRAY_BUFFER, new Float32Array(this.jsArrayData), this.webgl.STREAM_DRAW);
  
  this.indexBuffer = this.webgl.createBuffer();
  this.webgl.bindBuffer(this.webgl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  this.webgl.bufferData(this.webgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.jsArrayIndex),this.webgl.STREAM_DRAW)

  this.webgl.enableVertexAttribArray(this.v3PositionIndex);
  this.webgl.vertexAttribPointer(this.v3PositionIndex, 3, this.webgl.FLOAT, false, 4*3, 0);

}

Main.prototype.draw = function () {
  this.webgl.clear(this.webgl.COLORE_BUFFER_BIT);
  this.ang += 0.3;
  var radian = Math.PI / 180 * this.ang;
  var cosB = Math.cos(radian)
  var sinB = Math.sin(radian)
  this.mat  = new Float32Array([
    cosB, sinB, 0.0, 0.0,
    -sinB, cosB, 0.0,0.0,
    0.0,0.0,1.0,0.0,
    0.0,0.0,0.0,1.0
  ])
  // 创建缓冲区
  // 确定缓冲区类型
  // 绑定缓冲区
  // 获取getAttribLocation
  // 启用顶点缓冲区
  // 设置顶点缓冲区类型
  this.webgl.uniformMatrix4fv(this.anim, false, this.mat)
  this.webgl.drawElements(this.webgl.TRIANGLES, 6, this.webgl.UNSIGNED_SHORT, 0);

}



var main = new Main();
main.initDraw();

function tick() {
  requestAnimFrame(tick);
  main.draw();
}


tick();