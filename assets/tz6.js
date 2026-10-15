/* tekzova.com — drawer menu, screenshot lightbox, scroll reveal. The pages work without this file. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // drawer
  var drawer = document.getElementById('drawer'), btn = document.querySelector('.menu-btn');
  if (drawer && btn) {
    var scrim = document.createElement('div'); scrim.className = 'scrim'; document.body.appendChild(scrim);
    function set(open) { drawer.classList.toggle('open', open); scrim.classList.toggle('open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); document.body.style.overflow = open ? 'hidden' : ''; }
    btn.addEventListener('click', function () { set(!drawer.classList.contains('open')); });
    scrim.addEventListener('click', function () { set(false); });
    var close = drawer.querySelector('.menu-close'); if (close) close.addEventListener('click', function () { set(false); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  }

  // lightbox for screenshots
  var lb = document.createElement('div'); lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', 'Screenshot');
  lb.innerHTML = '<button type="button" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button><img alt="">';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img');
  function closeLb() { lb.classList.remove('open'); }
  lb.addEventListener('click', function (e) { if (e.target !== lbImg) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  [].forEach.call(document.querySelectorAll('.shot-btn'), function (b) {
    b.addEventListener('click', function () { var im = b.querySelector('img'); lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt; lb.classList.add('open'); });
  });

  // reveal on scroll
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) { entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    [].forEach.call(els, function (el) { io.observe(el); });
  } else { [].forEach.call(els, function (el) { el.classList.add('in'); }); }

  var yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
