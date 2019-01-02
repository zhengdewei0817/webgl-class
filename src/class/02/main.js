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
  var fragmentObject = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);
  this.webgl.shaderSource(vertexShaderObject, window.utils.getShaderSource('shader-vs'));
  this.webgl.shaderSource(fragmentObject, window.utils.getShaderSource('shader-fs'));

  this.webgl.compileShader(vertexShaderObject);
  this.webgl.compileShader(fragmentObject);

  this.program = this.webgl.createProgram();
  this.webgl.attachShader(this.program, vertexShaderObject);
  this.webgl.attachShader(this.program, fragmentObject);
  this.webgl.linkProgram(this.program);

  this.webgl.useProgram(this.program);
}

Main.prototype.draw = function () {
  this.webgl.clearColor(0.0,0.0,0.0,1.0);
  // this.webgl.clear()

  this.buffer = this.webgl.createBuffer();
  this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.buffer);
  this.webgl.bufferData(this.webgl.ARRAY_BUFFER, new Float32Array(this.jsArrayData), this.webgl.STREAM_DRAW);
  
  

  this.indexBuffer = this.webgl.createBuffer();
  this.webgl.bindBuffer(this.webgl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  this.webgl.bufferData(this.webgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.jsArrayIndex), this.webgl.STREAM_DRAW);


  var positionIndex = this.webgl.getAttribLocation(this.program, 'v3Position');
  this.webgl.enableVertexAttribArray(positionIndex);
  this.webgl.vertexAttribPointer(positionIndex, 3, this.webgl.FLOAT, false, 4 * 3, 0); // 偏移量
  // this.webgl.drawArrays(this.webgl.TRIANGLES, 0, 3)

  this.webgl.drawElements(this.webgl.TRIANGLES,6,this.webgl.UNSIGNED_SHORT,0); // 绘制点个数
}

var main = new Main();
main.draw();