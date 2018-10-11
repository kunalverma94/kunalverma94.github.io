var lnStickyNavigation; $(document).ready(function() { applyNavigation(); applyResize(); checkHash(); }); function applyNavigation() { applyClickEvent(); applyNavigationFixForPhone(); applyScrollSpy(); applyStickyNavigation(); } function applyClickEvent() { $('a[href*=#]').on('click', function(e) { e.preventDefault(); if ($($.attr(this, 'href')).length > 0) { $('html, body').animate({ scrollTop: $($.attr(this, 'href')).offset().top }, 400); } return false; }); } function applyNavigationFixForPhone() { $('.navbar li a').click(function(event) { $('.navbar-collapse').removeClass('in').addClass('collapse'); }); } function applyScrollSpy() { $('#navbar-example').on('activate.bs.scrollspy', function() { window.location.hash = $('.nav .active a').attr('href').replace('#', '#/'); }); } function applyStickyNavigation() { lnStickyNavigation = $('.scroll-down').offset().top + 20; $(window).on('scroll', function() { stickyNavigation(); }); stickyNavigation(); } function stickyNavigation() { if ($(window).scrollTop() > lnStickyNavigation) { $('body').addClass('fixed'); } else { $('body').removeClass('fixed'); } } function applyResize() { $(window).on('resize', function() { lnStickyNavigation = $('.scroll-down').offset().top + 20; $('.jumbotron').css({ height: ($(window).height()) + 'px' }); }); } function checkHash() { lstrHash = window.location.hash.replace('#/', '#'); if ($('a[href=' + lstrHash + ']').length > 0) { $('a[href=' + lstrHash + ']').trigger('click'); } }
function getScrollPercent() {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return ((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100)||3;
}
$(document).scroll(function(e)
{
    var t=Math.ceil(getScrollPercent());
       $("#progresses").css("width",t+"%");
});
