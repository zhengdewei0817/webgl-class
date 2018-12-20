

function Main() {
    this.webgl = window.utils.g_gl('myCanvas');
    this.v3PositionIndex = 0;
    this.jsArrayData = [0.0, 1.0, 0.0,//�϶���
        -1.0, -1.0, 0.0,//�󶥵�
        1.0, -1.0, 0.0]
    this.init();
}
/**
 * 创建shader
 * 绑定shader
 * 编译shader
 * 
 * 创建 createProgram 这是干什么的
 * 添加片段着色器活着顶点着色器
 * linkProgram
 * 使用program
 */
Main.prototype.init = function () {
    var vertexShaderObject = this.webgl.createShader(this.webgl.VERTEX_SHADER);
    var fragmentShaderObject = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);
    this.webgl.shaderSource(vertexShaderObject, window.utils.getShaderSource('shader-vs'))
    this.webgl.shaderSource(fragmentShaderObject, window.utils.getShaderSource('shader-fs'))
    this.webgl.compileShader(vertexShaderObject);
    this.webgl.compileShader(fragmentShaderObject);

    var program = this.webgl.createProgram();
    this.webgl.attachShader(program, vertexShaderObject);
    this.webgl.attachShader(program, fragmentShaderObject);
    this.webgl.linkProgram(program);

    this.webgl.useProgram(program);
    this.program = program;
}
/**
 * 删除颜色
 * 删除缓冲区
 * 创建传冲去
 * 绑定缓冲区类型
 * 绑定换从去的数据
 * 获取shader中的变量，内存中的存储地址
 * 开启变量v3PositionIndex
 * 将缓冲区的对象分配给变量
 */
Main.prototype.draw = function () {
    this.webgl.clearColor(0.0,0.0,0.0,1.0) ;
    this.webgl.clear(this.webgl.COLOR_BUFFER_BIT)
    this.buffer = this.webgl.createBuffer();
    this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.buffer);
    this.webgl.bufferData(this.webgl.ARRAY_BUFFER, new Float32Array(this.jsArrayData), this.webgl.STREAM_DRAW);
    
    var v3PositionIndex = this.webgl.getAttribLocation(this.program, 'v3Position')
    this.webgl.enableVertexAttribArray(v3PositionIndex);
    this.webgl.vertexAttribPointer(v3PositionIndex, 3, this.webgl.FLOAT, false, 0, 0);
    this.webgl.drawArrays(this.webgl.TRIANGLES, 0, 3)
}


var main = new Main();
main.draw();