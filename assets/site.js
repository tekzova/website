/* Tekzova — progressive enhancement only.
   Every page is complete and readable with JavaScript disabled; this adds the
   scroll reveal and nothing else. */
(function () {
  'use strict';

  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.rv');

  if (!('IntersectionObserver' in window) || reduce) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('in');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

  Array.prototype.forEach.call(items, function (el) {
    /* stagger siblings so a row of cards arrives in sequence, not all at once */
    var sibs = el.parentNode ? el.parentNode.children : [];
    var idx = Array.prototype.indexOf.call(sibs, el);
    el.style.transitionDelay = (Math.min(idx, 5) * 70) + 'ms';
    io.observe(el);
  });
})();
