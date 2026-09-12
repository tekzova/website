(function(){
  /* ---- drawer ---- */
  var burger=document.getElementById('burger'),
      drawer=document.getElementById('drawer'),
      scrim=document.getElementById('scrim'),
      dclose=document.getElementById('dclose');

  function open(){
    drawer.hidden=false;scrim.hidden=false;
    burger.setAttribute('aria-expanded','true');
    document.body.classList.add('locked');
    var f=drawer.querySelector('a,button');if(f)f.focus();
  }
  function close(){
    drawer.hidden=true;scrim.hidden=true;
    burger.setAttribute('aria-expanded','false');
    document.body.classList.remove('locked');
    burger.focus();
  }
  burger.addEventListener('click',function(){drawer.hidden?open():close();});
  dclose.addEventListener('click',close);
  scrim.addEventListener('click',close);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!drawer.hidden)close();});
  drawer.addEventListener('click',function(e){if(e.target.closest('a'))close();});
  window.addEventListener('resize',function(){if(window.innerWidth>=900&&!drawer.hidden)close();});

  /* ---- scroll reveal ---- */
  var rv=Array.prototype.slice.call(document.querySelectorAll('.rv'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
    },{rootMargin:'0px 0px -6% 0px',threshold:.06});
    rv.forEach(function(el){
      if(el.getBoundingClientRect().top < window.innerHeight*.96){el.classList.add('in');}
      else{io.observe(el);}
    });
  }else{ rv.forEach(function(el){el.classList.add('in');}); }

  /* ---- platform filter ---- */
  var fbtns=Array.prototype.slice.call(document.querySelectorAll('.filter button')),
      cards=Array.prototype.slice.call(document.querySelectorAll('#grid .app'));
  fbtns.forEach(function(b){
    b.addEventListener('click',function(){
      var f=b.dataset.f;
      fbtns.forEach(function(o){o.setAttribute('aria-pressed',String(o===b));});
      cards.forEach(function(c){
        c.hidden = !(f==='all' || (c.dataset.p||'').indexOf(f)>-1);
      });
    });
  });
})();
