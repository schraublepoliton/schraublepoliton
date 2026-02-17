(function(){
  'use strict';

  function toast(msg, ms=1200){
    const d=document.createElement('div');
    d.textContent=msg; Object.assign(d.style,{position:'fixed',right:'16px',bottom:'16px',background:'linear-gradient(90deg,#0b1220,#071029)',color:'#9fefff',padding:'10px 14px',borderRadius:'8px',boxShadow:'0 8px 40px rgba(2,6,23,0.6)',zIndex:99999,fontWeight:700});
    document.body.appendChild(d); setTimeout(()=>d.remove(),ms);
  }

  function highlightActiveNav(){
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-nav a').forEach(a=>{
      const href = a.getAttribute('href');
      if(href===path || (href==='index.html' && path==='index.html')) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  function initNeonToggle(){
    const btn = document.getElementById('neon-toggle');
    if(!btn) return;
    const state = localStorage.getItem('neonMode') === 'true';
    if(state) document.documentElement.classList.add('neon-mode');
    btn.setAttribute('aria-pressed', String(state));
    btn.addEventListener('click', ()=>{
      const on = document.documentElement.classList.toggle('neon-mode');
      localStorage.setItem('neonMode', on);
      btn.setAttribute('aria-pressed', String(on));
      toast(on? 'Neon mode enabled' : 'Neon mode disabled');
    });
  }

  function animateCoolMeter(){
    const fill = document.querySelector('#cool-meter .fill');
    if(!fill) return; setTimeout(()=>{ fill.style.width = (70 + Math.floor(Math.random()*25)) + '%'; }, 600);
  }

  function wireEscapeOverlay(){
    const openBtn = document.getElementById('escape-btn');
    const overlay = document.getElementById('escape-overlay');
    const close = document.getElementById('escape-close');
    const accept = document.getElementById('escape-accept');
    if(!overlay) return;
    function open(){ document.documentElement.classList.add('escape-mode'); overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
    function closeOverlay(){ document.documentElement.classList.remove('escape-mode'); overlay.classList.remove('open'); overlay.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
    openBtn?.addEventListener('click', open); close?.addEventListener('click', closeOverlay); accept?.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && overlay.classList.contains('open')) closeOverlay(); });
  }

  function wireContactForm(){
    const form = document.getElementById('contact-form');
    if(!form) return form.addEventListener('submit', function(e){ e.preventDefault(); toast('Message submitted (demo)'); form.reset(); });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    highlightActiveNav(); initNeonToggle(); animateCoolMeter(); wireEscapeOverlay(); wireContactForm();

    // graceful degradation: ensure images have alt
    document.querySelectorAll('img').forEach(img=>{ if(!img.alt) img.alt = 'site image'; });
  });
})();