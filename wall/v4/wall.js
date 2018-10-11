const g = {
    height: null,
    width: null,
    canvas: null,
    context: null,
    opacity: null,
    color: null,
    view: null,
    name: "xxx",
    text: '',
    txt_size: 150,
    txt_color: "white",
    once:true,
    gradient: new Gradient(false, 180)
};
const notificationDuration = 250;
window.onload = function () {
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
    g.mode = document.getElementById("mode");
    g.color = gc();
    g.view.style.background = g.color;
    if (document.cookie != "") {
        try {
            var t = JSON.parse(document.cookie.toString().split(";")[0]);
            g.height.value = t.height;
            g.width.value = t.width;
            g.name = t.name;
        } catch (error) {
            g.height.value = window.screen.availHeight;
            g.width.value = window.screen.availWidth
        }
     
    } else {
        g.height.value = window.screen.availHeight;
        g.width.value = window.screen.availWidth
    }
    Listners()
    mod(0);
}
function Listners() {
    g.opacity.oninput = function () {
        document.getElementById("ov").innerText = g.opacity.value;
        g.view.style.opacity = g.opacity.value / 100;
    }
        ;
    document.getElementById("dummy_click").onclick = function () {
        document.getElementById("color").click()
    }
        ;
    document.getElementById("Dtxt_color").onclick = function () {
        document.getElementById("txt_color").click()
    }
        ;
    document.getElementById("txt_color").oninput = function () {
        g.txt_color = this.value;
        document.getElementById("Dtxt_color").style.background = g.txt_color;
        document.getElementById("_tmpico").style.color = g.txt_color;
    }
        ;
    document.getElementById("random").onclick = function () {
        if (g.gradient.mode) {
            g.gradient.renew();
            g.view.style.background = g.gradient.get_style();
            return;
        }
        var _gc = gc();
        g.view.style.background = _gc;
        g.color = _gc;
        M.toast({
            html: "Color: " + _gc,
            displayLength: notificationDuration
        });
    }
        ;
    document.getElementById("reset").onclick = function () {
        Reset()
    }
        ;
    document.getElementById("save").onclick = function () {
        Save()
    }
        ;
    document.getElementById("color").onchange = function () {
        g.view.style.background = g.color = this.value
    }
        ;
    document.getElementById("grad").onchange = function () {
        g.gradient.mode = this.checked;
        document.getElementById("_v").disabled = !this.checked;
        document.getElementById("dummy_click").classList.toggle("disabled", this.checked);
        document.getElementById("random").click()
    }
        ;
    document.getElementById("_v").onchange = function () {
        g.gradient.vrchange(this.checked)
    }
     
}
function Reset() {
    document.cookie = "";
    g.text = "";
    g.height.value = window.screen.availHeight;
    g.width.value = window.screen.availWidth
    document.getElementById("_tmpico").innerHTML = g.text;
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
    g.context.fillStyle = g.color;
    if (g.gradient.mode) {
        var grd = g.context.createLinearGradient(0, 0, innerWidth, 0);
        grd = g.gradient.vr();
        grd.addColorStop(0, g.gradient.c2);
        grd.addColorStop(1, g.gradient.c1);
        g.context.fillStyle = grd;
    }
    g.context.globalAlpha = g.opacity.value / 100;
    g.context.fillRect(0, 0, g.width.value, g.height.value);
    if (g.text != "") {
        g.context.font = g.txt_size + "px Open Sans";
        g.context.fillStyle = g.txt_color;
        g.context.textAlign = "center";
        g.context.fillText(g.text, g.width.value / 2, g.height.value / 2);
    }


    g.canvas.toBlob(function (b) {
        let URLObj = window.URL || window.webkitURL;
        let a = document.createElement("a");
        a.href = URLObj.createObjectURL(b);
        if (g.gradient.mode) {
            a.download = g.gradient.c1 + "_" + g.gradient.c2 + ".png";
        } else
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
        value: function (callback, type, quality) {
            var canvas = this;
            setTimeout(function () {
                var binStr = atob(canvas.toDataURL(type, quality).split(',')[1])
                    , len = binStr.length
                    , arr = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i)
                }
                callback(new Blob([arr], {
                    type: type || 'image/png'
                }))
            })
        }
    })
}
; function Gradient(mode, degree) {
    this.mode = mode;
    this.c1 = gc();
    this.c2 = gc();
    this.degree = degree;
    this.v = false;
    this.get_style = function () {
        return "linear-gradient(" + this.degree + "deg," + this.c2 + "," + this.c1 + ")";
    }
        ;
    this.renew = function () {
        this.c1 = gc();
        this.c2 = gc();
        M.toast({
            html: "Color: " + this.c1 + " &amp; " + this.c2,
            displayLength: notificationDuration
        });
    }
        ;
    this.vrchange = function (v) {
        this.v = v;
        if (this.v) {
            this.degree = 90;
        } else {
            this.degree = 180;
        }
        g.view.style.background = g.gradient.get_style();
    }
        ;
    this.vr = function () {
        if (this.v) {
            return g.context.createLinearGradient(0, innerHeight / 4, innerWidth, innerHeight / 4);
        } else {
            return g.context.createLinearGradient(innerWidth / 2, 0, innerWidth / 2, innerHeight);
        }
    }
}
function foo(n) {
    n = (n == undefined ? 5 : n);
    var l = Number(document.getElementById("symbol_list").children.length.toString());
    if (l == n)
        return;
    if (l > n) {
        while (l != n) {
            l--;

            document.getElementById("symbol_list").removeChild(document.getElementById("symbol_list").children[l]);
        }
        return;
    }
    else {
        var rr = n - document.getElementById("symbol_list").children.length;
        var t = Array.apply(null, { length: rr }).map(Number.call, function (e) {
            return '<li onclick="boo(this)" > &#' + (9728 + e + l) + ';';
        });

        document.getElementById("symbol_list").innerHTML += t.join('</li>');
    }
}
function boo(e) {

    g.text = e.innerHTML;
    e.style.background = "#26a69a";
    document.getElementById("_tmpico").innerHTML = g.text;
}


function mod(i) {
    var e = document.getElementById("pl");

    if (i > 0)
        e.value = Number(e.value) + 1;
    if (i < 0)
        e.value = Number(e.value) - 1;;
    poo(e.value);
}
function poo(n) {
    var t = Array.apply(null, { length: 50 }).map(Number.call, function (e) {
        return '<li  onclick="boo(this)" >&#' + Number(9728 + Number(e) + Number((n - 1) * 50)) + ';';
    });
    document.getElementById("symbol_list").innerHTML = t.join('</li>');
}



function symbol_shutter()
    {
        var e= document.querySelector(".ls");
        var c=e.classList.contains("ups");
        var caller=document.querySelector(".symbol_shutter");
        e.classList.toggle("ups",!c);
        caller.classList.toggle("hide",!caller.classList.contains("hide"));
    }
    function controll_shutter()
    {
        var e= document.querySelector(".controls");
        var c=e.classList.contains("downs");
        e.classList.toggle("downs",!c);
    }
    
function demoInsertText() {
   if (g.once) {
    alert("this feature under construction.OK");
    g.once=false;
   }
   g.text="❝Hola ❢ Mundo❞";
    g.txt_size=Math.ceil(innerWidth/9);
    document.getElementById("_tmpico").innerHTML = g.text;
}

function demoInsertQuote() { 
    
    var t="❝Yesterday is history, tomorrow is mistry but today is a gift that's why it's called the present.❞― Master Oogway";
    alert("comming Soon");
     
 }
 
 
