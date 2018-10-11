const g = {
    height: null,
    width: null,
    canvas: null,
    context: null,
    opacity: null,
    color: null,
    view: null,
    name: "xxx",
};
window.onload = function() {
    init()
}
;
function init() {
    g.canvas = document.getElementById("cc");
    g.context = g.canvas.getContext('2d');
    g.height = document.getElementById("height");
    g.width = document.getElementById("width");
    g.opacity = document.getElementById("op");
    g.view = document.getElementById("tmp");
    g.color = gc();
    g.view.style.background = g.color;
    if (document.cookie != "") {
       try  {
        var t = JSON.parse(document.cookie.toString().split(";")[0]);
        g.height.value = t.height;
        g.width.value = t.width;
        g.name = t.name;
       }

       catch(e)
       {  g.height.value = window.screen.availHeight;
        g.width.value = window.screen.availWidth}
    } else {
        g.height.value = window.screen.availHeight;
        g.width.value = window.screen.availWidth
    }
    Listners();
}
function Listners() {
    g.opacity.oninput = ()=>{
        document.getElementById("ov").innerText = g.opacity.value;
        g.view.style.opacity = g.opacity.value / 100
    }
    ;
    document.getElementById("dummy_click").onclick = function() {
        document.getElementById("color").click()
    }
    ;
    document.getElementById("random").onclick = function() {
        var _gc = gc();
        g.view.style.background = _gc;
        g.color = _gc
    }
    ;
    document.getElementById("dummy_click").onclick = function() {
        document.getElementById("color").click()
    }
    ;
    document.getElementById("reset").onclick = function() {
        Reset()
    }
    ;
    document.getElementById("save").onclick = function() {
        Save()
    }
    ;
    document.getElementById("color").onchange = function() {
        g.view.style.background = g.color = this.value
    }
}
function Reset() {
    document.cookie = "";
    g.height.value = window.screen.availHeight;
    g.width.value = window.screen.availWidth
}
function gc() {
    var str = "#";
    var c = "0123456789ABCDEF";
    for (var i = 0; i < 6; i++) {
        str += c[Math.floor(Math.random() * 15)]
    }
    return str
}
function Save() {
    g.canvas.height = g.height.value;
    g.canvas.width = g.width.value;
    g.context.globalAlpha = g.opacity.value / 100;
    g.context.fillStyle = g.color;
    g.context.fillRect(0, 0, g.width.value, g.height.value);
    g.canvas.toBlob(function(b) {
        let URLObj = window.URL || window.webkitURL;
        let a = document.createElement("a");
        a.href = URLObj.createObjectURL(b);
        a.download = g.color.toString() + ".png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a)
    });
    document.cookie = JSON.stringify({
        width: g.width.value,
        height: g.height.value
    })
}
if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function(callback, type, quality) {
            var canvas = this;
            setTimeout(function() {
                var binStr = atob(canvas.toDataURL(type, quality).split(',')[1])
                  , len = binStr.length
                  , arr = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i)
                }
                callback(new Blob([arr],{
                    type: type || 'image/png'
                }))
            })
        }
    })
}
