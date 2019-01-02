
window.utils = {
    getShaderSource: function(scriptID) {
        var shaderScript = document.getElementById(scriptID);
        if (shaderScript == null) return "";
    
        var sourceCode = "";
        var child = shaderScript.firstChild;
        while (child) {
            if (child.nodeType == child.TEXT_NODE) sourceCode += child.textContent;
            child = child.nextSibling;
        }
    
        return sourceCode;
    },
    g_gl: function(id) {
        var canvas = document.getElementById(id);
        return canvas.getContext('experimental-webgl');
    },
    getShader: function (url) {
        return import(url)
    }
}