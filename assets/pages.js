(function(){
  /* ---- lightbox: any .shot button opens its full-size screenshot ---- */
  var lb=null,last=null;
  function closeLb(){ if(!lb) return; lb.remove(); lb=null; document.body.classList.remove('locked'); if(last) last.focus(); }
  function openLb(src,alt){
    closeLb();
    lb=document.createElement('div'); lb.className='lb'; lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true');
    lb.setAttribute('aria-label','Screenshot');
    var img=document.createElement('img'); img.src=src; img.alt=alt||'';
    var p=document.createElement('p'); p.textContent=alt||'';
    var b=document.createElement('button'); b.type='button'; b.setAttribute('aria-label','Close');
    b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    lb.appendChild(b); lb.appendChild(img); if(alt) lb.appendChild(p);
    lb.addEventListener('click',function(e){ if(e.target!==img) closeLb(); });
    document.body.appendChild(lb); document.body.classList.add('locked'); b.focus();
  }
  document.addEventListener('click',function(e){
    var s=e.target.closest('.shot'); if(!s) return;
    e.preventDefault(); last=s;
    var im=s.querySelector('img.scr');
    openLb(s.getAttribute('data-full')||(im&&im.src), im&&im.alt);
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeLb(); });

  /* ---- tour tabs ---- */
  [].forEach.call(document.querySelectorAll('.tour'),function(t){
    var btns=[].slice.call(t.querySelectorAll('.tabs button')), pans=[].slice.call(t.querySelectorAll('.tpanel'));
    function pick(i,focus){
      btns.forEach(function(b,j){ b.setAttribute('aria-selected',String(i===j)); b.tabIndex=i===j?0:-1; });
      pans.forEach(function(p,j){ p.classList.toggle('on',i===j); p.hidden=i!==j; });
      if(focus) btns[i].focus();
      var tb=btns[i], row=tb.parentNode;
      if(row.scrollWidth>row.clientWidth) row.scrollTo({left:tb.offsetLeft-row.offsetLeft-20,behavior:'smooth'});
    }
    btns.forEach(function(b,i){
      b.addEventListener('click',function(){ pick(i); });
      b.addEventListener('keydown',function(e){
        var k=e.key, n=btns.length;
        if(k==='ArrowRight'||k==='ArrowDown'){ e.preventDefault(); pick((i+1)%n,true); }
        if(k==='ArrowLeft'||k==='ArrowUp'){ e.preventDefault(); pick((i-1+n)%n,true); }
      });
    });
    pick(0);
  });

  /* ---- phone gallery arrows ---- */
  [].forEach.call(document.querySelectorAll('[data-gal]'),function(nav){
    var g=document.getElementById(nav.getAttribute('data-gal')); if(!g) return;
    nav.addEventListener('click',function(e){
      var b=e.target.closest('button'); if(!b) return;
      g.scrollBy({left:(b.getAttribute('data-d')==='-1'?-1:1)*Math.max(240,g.clientWidth*.8),behavior:'smooth'});
    });
  });
})();
