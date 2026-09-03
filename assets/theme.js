/* Tekzova theme 2 — progressive enhancement only.
   The page is complete and readable with this file blocked or absent.
   Two jobs: reveal-on-scroll, and pausing the looping animations when
   the tab is hidden so a background tab costs nothing. */
(function () {
  'use strict';

  var reduce = false;
  try {
    reduce = window.matchMedia &&
             window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) { reduce = false; }

  /* ---------- reveal on scroll ---------- */
  var items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || reduce) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) {
          entries[j].target.classList.add('in');
          io.unobserve(entries[j].target);
        }
      }
    }, { rootMargin: '0px 0px -9% 0px', threshold: 0.06 });
    for (var k = 0; k < items.length; k++) io.observe(items[k]);
  }

  /* ---------- don't animate a tab nobody is looking at ---------- */
  if (!reduce && 'hidden' in document) {
    var css = null;
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        if (css) return;
        css = document.createElement('style');
        css.textContent =
          '.blob,.floaty,.marq .track,.scr,.li .bx,.li .bx svg,' +
          '.li .n em::after,.bench .dots span,.statement::before,' +
          '.cta::before,.cta::after{animation-play-state:paused!important}';
        document.head.appendChild(css);
      } else if (css) {
        css.parentNode.removeChild(css);
        css = null;
      }
    });
  }
})();
