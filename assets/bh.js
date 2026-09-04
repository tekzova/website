/* Tekzova theme 4 — the drawer menu, and one scroll reveal.
   Everything here is progressive: with JS off the page is complete,
   the drawer links still exist in the footer, and nothing is hidden. */
(function () {
  'use strict';

  /* ---------------- the three-dash menu ---------------- */
  var burger = document.querySelector('.burger');
  var drawer = document.getElementById('drawer');
  var scrim  = document.getElementById('scrim');
  var closeB = document.querySelector('.dclose');

  if (burger && drawer && scrim) {
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      drawer.hidden = false;
      scrim.hidden = false;
      /* next frame, so the transition actually runs */
      requestAnimationFrame(function () {
        drawer.classList.add('on');
        scrim.classList.add('on');
      });
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('locked');
      var first = drawer.querySelector('.dclose');
      if (first) first.focus();
    }

    function close() {
      drawer.classList.remove('on');
      scrim.classList.remove('on');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('locked');
      window.setTimeout(function () {
        if (!drawer.classList.contains('on')) {
          drawer.hidden = true;
          scrim.hidden = true;
        }
      }, 340);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    burger.addEventListener('click', function () {
      if (burger.getAttribute('aria-expanded') === 'true') close(); else open();
    });
    scrim.addEventListener('click', close);
    if (closeB) closeB.addEventListener('click', close);

    /* a link inside the drawer closes it — same-page anchors especially */
    drawer.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (a) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') close();
    });

    /* keep focus inside the drawer while it is open */
    drawer.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = drawer.querySelectorAll('a[href], button:not([disabled])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    /* a resize into desktop width leaves no burger to close it with */
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900 && burger.getAttribute('aria-expanded') === 'true') close();
    });
  }

  /* ---------------- one reveal per element ---------------- */
  var items = document.querySelectorAll('.rv');
  if (!items.length) return;

  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('in');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  items.forEach(function (el) { io.observe(el); });
})();
