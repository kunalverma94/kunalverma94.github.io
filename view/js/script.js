const day = {
  "--dbgg_wh": "#FFFFFF",
  "--dbgg_pl": "#F3EFE0",
  "--dfbb": "#434242",
  "--primary": "#22A39F",
};
const night = {
  "--dbgg_wh": " #424242",
  "--dbgg_pl": "#424242",
  "--dfbb": "#FFFFFF",
  "--primary": "#00aaee",
};
var skillsets = {};
var lnStickyNavigation;

var x = new XMLHttpRequest();
x.open("GET", "../../view/js/skills.json");
x.onreadystatechange = function(e) {
  if (x.status === 200 && x.readyState === 4) {
    skillsets = JSON.parse(x.response);
    applySkills();
  }
};
x.send();
$(document).ready(function() {
  applyNavigation();
  applyResize();
  document.getElementsByClassName("mode")[0].click();
  checkHash();
});
function applyNavigation() {
  applyClickEvent();
  applyNavigationFixForPhone();
  applyScrollSpy();
  applyStickyNavigation();
}
function applyClickEvent() {
  $("a[href*=#]").on("click", function(e) {
    e.preventDefault();
    if ($($.attr(this, "href")).length > 0) {
      $("html, body").animate(
        { scrollTop: $($.attr(this, "href")).offset().top },
        400
      );
    }
    return false;
  });
}
function applyNavigationFixForPhone() {
  $(".navbar li a").click(function(event) {
    $(".navbar-collapse")
      .removeClass("in")
      .addClass("collapse");
  });
}
function applyScrollSpy() {
  $("#navbar-example").on("activate.bs.scrollspy", function() {
    window.location.hash = $(".nav .active a")
      .attr("href")
      .replace("#", "#/");
  });
}
function applyStickyNavigation() {
  lnStickyNavigation = $(".scroll-down").offset().top + 20;
  $(window).on("scroll", function() {
    stickyNavigation();
  });
  stickyNavigation();
}
function stickyNavigation() {
  if ($(window).scrollTop() > lnStickyNavigation) {
    $("body").addClass("fixed");
  } else {
    $("body").removeClass("fixed");
  }
}
function applyResize() {
  $(window).on("resize", function() {
    lnStickyNavigation = $(".scroll-down").offset().top + 20;
    $(".jumbotron").css({ height: $(window).height() + "px" });
  });
}
function checkHash() {
  lstrHash = window.location.hash.replace("#/", "#");
  if ($("a[href=" + lstrHash + "]").length > 0) {
    $("a[href=" + lstrHash + "]").trigger("click");
  }
}
function getScrollPercent() {
  var h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100 || 3;
}
$(document).scroll(function(e) {
  var t = Math.ceil(getScrollPercent());
  $("#progresses").css("width", t + "%");
});

document.getElementsByClassName("mode")[0].onclick = function() {
  let c = this.classList.contains("fa-sun-o");
  var s;
  if (c) {
    s = night;
    this.classList.replace("fa-sun-o", "fa-moon-o");
    GhostTost("Night Mode");
  } else {
    s = day;
    this.classList.replace("fa-moon-o", "fa-sun-o");
    GhostTost("Day Mode");
  }
  for (const key in s) {
    document.documentElement.style.setProperty(key, s[key]);
  }
};

function Getskil(skill, level) {
  var stars = "";
  let fillstars = Array.apply(null, { length: level }).map(
    g => '<span class="glyphicon glyphicon-star filled"></span>'
  );
  if (level < 5) {
    let emptystars = Array.apply(null, { length: 5 - level }).map(
      g => '<span class="glyphicon glyphicon-star"></span>'
    );
    stars = fillstars.concat(emptystars).join("");
  } else {
    stars = fillstars.join("");
  }
  return ` <li><span class="ability-title">${skill}</span><span class="ability-score">${stars}</span></li>`;
}

function applySkills() {
  let t = document.getElementById("skillmat");
  var s = document.querySelector(".flex");
  for (const key in skillsets) {
    var e = t.content.children[0].cloneNode(true);
    e.querySelector(".title").innerHTML = key;
    var _f = skillsets[key].map(g => Getskil(g.skill, g.level)).join("");
    e.querySelector("ul").innerHTML = _f;
    s.appendChild(e);
  }
}

function GhostTost(s) {
  var e = document.createElement("div");
  e.innerHTML = s;
  e.classList.add("flyon");
  document.querySelector("body").appendChild(e);
  setTimeout(function() {
    e.remove();
  }, 1000);
}

var _ai = 0;
if (window.innerHeight > 900) {
  var t = setInterval(() => {
    var f = document.getElementsByClassName("fb");
    let element = f[0];
    let prev = f[f.length - 1];

    if (_ai >= f.length - 1) {
      _ai = 0;
      element = prev;
      element.classList.remove("bboxed");
      element.getElementsByClassName("title")[0].classList.remove("tboxed");
    } else {
      _ai++;
    }
    prev = f[_ai - 1];
    if (prev) {
      element = prev;
      element.classList.remove("bboxed");
      element.getElementsByClassName("title")[0].classList.remove("tboxed");
    }
    element = f[_ai];
    element.classList.toggle("bboxed");
    element.getElementsByClassName("title")[0].classList.toggle("tboxed");
  }, 2000);
}
