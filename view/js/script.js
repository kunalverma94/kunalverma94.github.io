const day = {
    '--dbgg_wh': '#FFFFFF',
    '--dbgg_pl': '#F3EFE0',
    '--dfbb': '#434242',
    '--primary': '#22A39F'
}
const night = {
    '--dbgg_wh': ' #424242',
    '--dbgg_pl': '#424242',
    '--dfbb': '#FFFFFF',
    '--primary': '#00aaee'

}
let s12 = [
    { "skill": "Javascript", "level": 5 },
    { "skill": "Bootstrap,Material and other CSS Framework", "level": 5 },
    { "skill": "CSS(3)", "level": 5 },
    { "skill": "HTML(5)", "level": 5 },
    { "skill": "JSON,XML,AJAX", "level": 5 },
    { "skill": "Oracle, PLSQL &MSSQL", "level": 5 },
    { "skill": "Node JS", "level": 5 },
    { "skill": "Command line Inteface", "level": 4 },
    { "skill": "JQuery,JQueryUI", "level": 5 },
    { "skill": "C#", "level": 5 },
    { "skill": "C,C++ Java", "level": 3 },
    { "skill": ".NET Framework", "level": 4 },
    { "skill": "Animations", "level": 4 }];

let s11 = [
    { "skill": "Angular", "level": 4 },
    { "skill": "React JS", "level": 4 },
    { "skill": "RXjs", "level": 4 },
    { "skill": "FireBase", "level": 4 },
    { "skill": ".NET Core", "level": 3 },
    { "skill": "ASP.NET MVC", "level": 5 },
    { "skill": "ADO.NET EntitiyFrameWork", "level": 5 },
    { "skill": "MongoDB", "level": 3 },
    { "skill": "Node js", "level": 4 },
    { "skill": "Design Pattern", "level": 4 },
    { "skill": "SOLID Principals", "level": 4 },
    { "skill": "Object Orientated Programming", "level": 4 },
    { "skill": "Agile &Scrum Methodology", "level": 5 },
    { "skill": "REST,SOAP,WFC,AJAX", "level": 3 },
    { "skill": "Data structure", "level": 3 }
];

let t11 = [
    { "skill": "IE/Chrome debugging", "level": 5 },
    { "skill": "Fiddler", "level": 5 },
    { "skill": "Performance and IT Security Threats Analysis", "level": 5 },
    { "skill": "Visual Studio &VS code", "level": 5 },
    { "skill": "Webkit browsers", "level": 5 },
    { "skill": "Adobe suits", "level": 4 },
    { "skill": "MS office Suite", "level": 4 }];

let t12 = [
    { "skill": "visual studio Team", "level": 4 },
    { "skill": "TFS", "level": 4 },
    { "skill": "Git / Git Flow", "level": 4 },
    { "skill": "Website optimisation", "level": 4 },
    { "skill": "Debugging &Code implementation", "level": 4 }
];
skillsets = {
    'skillset1': s11,
    'skillset2': s12,
    'toolset1': t11,
    'toolset2': t12,
}

var lnStickyNavigation;
$(document).ready(function () {
    applyNavigation();
    applyResize();
    applySkills();
    document.getElementsByClassName("mode")[0].click();
    checkHash();
}); function applyNavigation() { applyClickEvent(); applyNavigationFixForPhone(); applyScrollSpy(); applyStickyNavigation(); } function applyClickEvent() { $('a[href*=#]').on('click', function (e) { e.preventDefault(); if ($($.attr(this, 'href')).length > 0) { $('html, body').animate({ scrollTop: $($.attr(this, 'href')).offset().top }, 400); } return false; }); } function applyNavigationFixForPhone() { $('.navbar li a').click(function (event) { $('.navbar-collapse').removeClass('in').addClass('collapse'); }); } function applyScrollSpy() { $('#navbar-example').on('activate.bs.scrollspy', function () { window.location.hash = $('.nav .active a').attr('href').replace('#', '#/'); }); } function applyStickyNavigation() { lnStickyNavigation = $('.scroll-down').offset().top + 20; $(window).on('scroll', function () { stickyNavigation(); }); stickyNavigation(); } function stickyNavigation() { if ($(window).scrollTop() > lnStickyNavigation) { $('body').addClass('fixed'); } else { $('body').removeClass('fixed'); } } function applyResize() { $(window).on('resize', function () { lnStickyNavigation = $('.scroll-down').offset().top + 20; $('.jumbotron').css({ height: ($(window).height()) + 'px' }); }); } function checkHash() { lstrHash = window.location.hash.replace('#/', '#'); if ($('a[href=' + lstrHash + ']').length > 0) { $('a[href=' + lstrHash + ']').trigger('click'); } }
function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100) || 3;
}
$(document).scroll(function (e) {
    var t = Math.ceil(getScrollPercent());
    $("#progresses").css("width", t + "%");
});

document.getElementsByClassName("mode")[0].onclick = function () {
    let c = this.classList.contains("fa-sun-o");
    var s;
    if (c) {
        s = night;
        this.classList.replace("fa-sun-o", "fa-moon-o");
        GhostTost("Night Mode");
    }
    else {
        s = day;
        this.classList.replace("fa-moon-o", "fa-sun-o");
        GhostTost("Day Mode");
    }
    for (const key in s) {
        document.documentElement.style.setProperty(key, s[key]);
    }
}

function Getskil(skill, level) {
    var stars = "";
    let fillstars = Array.apply(null, { length: level }).map(g => '<span class="glyphicon glyphicon-star filled"></span>');
    if (level < 5) {
        let emptystars = Array.apply(null, { length: 5 - level }).map(g => '<span class="glyphicon glyphicon-star"></span>');
        stars = fillstars.concat(emptystars).join('');
    }
    else {
        stars = fillstars.join('');

    }
    return ` <li><span class="ability-title">${skill}</span><span class="ability-score">${stars}</span></li>`

}

function applySkills() {
    for (const key in skillsets) {
        var f = skillsets[key].map(g => Getskil(g.skill, g.level)).join('');
        document.getElementsByClassName(key)[0].innerHTML = f


    }

}

function GhostTost(s) {
    var e = document.createElement("div");
    e.innerHTML = s;
    e.classList.add("flyon");
    document.querySelector("body").appendChild(e);
    setTimeout(function () {
        e.remove();
    }
        , 1000);

}
