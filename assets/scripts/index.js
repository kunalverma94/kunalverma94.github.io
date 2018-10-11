var siz = 9;
var sizi = 0;
function gc() {
    var s = "0123456789ABCDEF";
    var c = "#";
    for (var i = 0; i < 6; i++) {
        c += s[Math.ceil(Math.random() * 15)];
    }

    return c;

}
var oo = [];

function stat() {

    for (var i = 0; i < 1000; i++) {
        var tt = new obj(Math.random() * (innerWidth - 40) + 20,Math.random() * (innerHeight - 40) + 20,20,gc(),Math.random() * 5,i);
        oo.push(tt);
    }

    const cn = document.getElementById("cn");
    const ct = document.getElementById("cn").getContext('2d');
    const ms = {
        x: innerWidth / 2,
        y: innerHeight / 2
    };
    addEventListener('mousemove', function(event) {
        ms.x = event.clientX;
        ms.y = event.clientY;

    });
    function obj(x, y, r, c, dd, nn) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.dx = dd;
        this.dy = dd;
        this.dr = function() {

            ct.beginPath();
            if (this.y + this.r > innerHeight || this.y - this.r < 0) {
                this.dy = -this.dy;

            }
            if (this.x + this.r > innerWidth || this.x - this.r < 0) {
                this.dx = -this.dx;

            }
            this.y += this.dy;
            this.x += this.dx;
            ct.fillStyle = this.c;
            if (ms.x - this.x < 50 && ms.x - this.x > -50 && ms.y - this.y < 50 && ms.y - this.y > -50) {
                if (this.r < siz) {
                    this.r += 1;
                }

            } else {
                if (this.r > sizi) {
                    this.r -= 1;
                }

            }
            ct.arc(this.x, this.y, this.r, 0, 2 * Math.PI);

            ct.fill();
            ct.fillStyle = "black";
            // ct.fillText(nn + "("+ Math.floor(this.x) +","+Math.floor(this.y) +")", this.x, this.y);
            ct.beginPath();
            ct.stroke();
        }
        this.an = function() {

            this.dr();

        }

    }

    function rs() {
        cn.height = innerHeight;
        cn.width = innerWidth;
        oo.forEach(function(e) {
            e.x = Math.random() * (innerWidth - 40) + 20;
            e.y = Math.random() * (innerHeight - 40) + 20;

        });

    }
    rs();
    anim();
    this.onresize = function() {
        rs();
    }
    function anim() {
        g = false;
        requestAnimationFrame(anim);
        ct.clearRect(0, 0, innerWidth, innerHeight)
        oo.forEach(function(e) {
            e.an();

        });

    }
}
window.onload = function() {

    setTimeout(function() {
        window.location.href = "#popup1";

    }, 4000);

}
function getDocHeight() {
    var D = document;
    return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight);
}
function fx() {
    window.location.href = "mailto:KunalVerma94@yahoo.com";
}
function woop() {
    if (Math.trunc($(window).scrollTop() + $(window).height()) == getDocHeight() || Math.trunc($(window).scrollTop() + $(window).height()) + 1 == getDocHeight() || Math.trunc($(window).scrollTop() + $(window).height()) - 1 == getDocHeight()) {
        $("#cn").css("z-index", "-1");

    } else {
        $("#cn").css("z-index", "auto");
    }

}
$(document).ready(function() {
    stat();

    woop();
    linkmap();
});
function linkmap() {
    $(".ax").click(function() {
        $("html, body").animate({
            scrollTop: $(".dd").offset().top
        }, 5050);

    });

  
    $("#i").click(function() {
        $("html, body").animate({
            scrollTop: $(".aa").offset().top
        });

    });
    $("#ii").click(function() {
        $("html, body").animate({
            scrollTop: $(".img2").offset().top
        });

    });
    $("#iii").click(function() {
        $("html, body").animate({
            scrollTop: $(".img3").offset().top
        });

    });
}