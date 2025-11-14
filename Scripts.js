/* script.js
   Path: /script.js
   Cleaned & defensive: theme, mobile menu, reveal, carousel, video modal, simulador
*/

/* tiny selectors */
const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));
const prefersReduced = (typeof window !== 'undefined') && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ========== YEAR ========== */
document.addEventListener('DOMContentLoaded', () => {
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
});

/* ========== THEME ========== */
(function(){
  try {
    const root = document.documentElement;
    const toggle = $('#themeToggle');
    const saved = localStorage.getItem('gslimp:theme');

    const prefersDark = () => {
      try { return window.matchMedia('(prefers-color-scheme: dark)').matches; } catch(e) { return false; }
    };

    if (saved) root.setAttribute('data-theme', saved);
    else root.setAttribute('data-theme', prefersDark() ? 'dark' : 'light');

    if (toggle) {
      toggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.style.transition = 'background 420ms,color 420ms';
        root.setAttribute('data-theme', next);
        localStorage.setItem('gslimp:theme', next);
        setTimeout(()=>root.style.transition='',600);
      });
    }
  } catch(e) { console.warn('theme init failed', e); }
})();

/* ========== MOBILE MENU ========== */
(function(){
  const bt = $('#mobileToggle'), nav = $('#mainNav');
  if(!bt||!nav) return;
  bt.addEventListener('click', ()=> {
    const open = bt.getAttribute('aria-expanded') === 'true';
    bt.setAttribute('aria-expanded', String(!open));
    if(!open){
      nav.style.display='flex';
      nav.style.flexDirection='column';
      nav.style.gap='12px';
      nav.style.padding='12px';
      // close on outside click
      setTimeout(()=>{ const off = (e)=>{ if(!nav.contains(e.target) && e.target !== bt){ nav.style.display=''; nav.style.flexDirection=''; nav.style.gap=''; nav.style.padding=''; bt.setAttribute('aria-expanded','false'); document.removeEventListener('click',off); } }; document.addEventListener('click', off); },0);
    } else {
      nav.style.display=''; nav.style.flexDirection=''; nav.style.gap=''; nav.style.padding='';
    }
  });
})();

/* ========== REVEAL ========== */
(function(){
  try {
    const els = $$('.reveal');
    if (prefersReduced){ els.forEach(e=>e.classList.add('visible')); return; }
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){ en.target.classList.add('visible'); obs.unobserve(en.target); }
      });
    },{threshold:0.12});
    els.forEach(e=>obs.observe(e));
  } catch(e){ console.warn('reveal error', e); $$('.reveal').forEach(e=>e.classList.add('visible')); }
})();

/* ========== CAROUSEL ========== */
(function(){
  const tracks = $$('.carousel-track');
  tracks.forEach(track=>{
    let isDown=false, startX=0, scrollLeft=0, raf=null;
    const autoplay = track.dataset.autoplay !== 'false' && track.dataset.autoplay !== '0', speed = parseFloat(track.dataset.speed) || 0.35;
    // autoplay loop step
    const step = ()=>{ 
      if(!autoplay || isDown || prefersReduced) { raf = requestAnimationFrame(step); return; }
      // move in pixels per frame (based on speed)
      track.scrollLeft = Math.min(track.scrollLeft + speed, track.scrollWidth - track.clientWidth);
      // loop when reached end
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
        // instant jump to start (avoid smooth to keep continuity)
        track.scrollLeft = 0;
      }
      raf = requestAnimationFrame(step);
    };
    if(autoplay && !prefersReduced) raf = requestAnimationFrame(step);

    const pause=()=>{ if(raf) cancelAnimationFrame(raf); raf=null; };
    const resume=()=>{ if(autoplay && !prefersReduced && !raf) raf = requestAnimationFrame(step); };

    // pointer dragging with bounding rect
    track.addEventListener('pointerdown', e=>{
      isDown=true;
      const rect = track.getBoundingClientRect();
      startX = e.clientX - rect.left;
      scrollLeft = track.scrollLeft;
      if (e.pointerId) track.setPointerCapture?.(e.pointerId);
      pause();
    });
    track.addEventListener('pointermove', e=>{
      if(!isDown) return;
      const rect = track.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const walk = (x - startX) * 1.6;
      track.scrollLeft = scrollLeft - walk;
    });
    const up = (e) => { isDown=false; if (e && e.pointerId) track.releasePointerCapture?.(e.pointerId); setTimeout(resume,250); };
    track.addEventListener('pointerup', up);
    track.addEventListener('pointercancel', ()=>{ isDown=false; resume(); });
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', ()=>{ if(!isDown) resume(); });
    // accessibility: keyboard scroll
    track.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowLeft') track.scrollLeft -= 260;
      if(e.key === 'ArrowRight') track.scrollLeft += 260;
    });
  });
})();

/* ========== VIDEO MODAL ========== */
(function(){
  const modal = $('#videoModal'), iframe = $('#modal-iframe');
  const openers = $$('.video-open'), medias = $$('.device-media'), thumbs = $$('.video-thumb');

  function open(src){
    if(!modal||!iframe||!src) return;
    // use autoplay param
    iframe.src = src + (src.includes('?') ? '&autoplay=1&rel=0' : '?autoplay=1&rel=0');
    modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    // focus modal for accessibility
    setTimeout(()=> modal.querySelector('.modal-close')?.focus?.(), 200);
  }
  function close(){
    if(!modal||!iframe) return;
    // remove src fully to stop playback
    iframe.src='';
    modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow='';
  }

  openers.forEach(b => {
    if(b && b.dataset && b.dataset.video) b.addEventListener('click', ()=> open(b.dataset.video));
  });
  medias.forEach(m => {
    if (m && m.dataset && m.dataset.src) {
      m.addEventListener('click', ()=> open(m.dataset.src));
      m.addEventListener('keydown', (e) => { if (e.key==='Enter' || e.key===' ') open(m.dataset.src); });
    }
  });
  thumbs.forEach(t => { if(t && t.dataset && t.dataset.video) t.addEventListener('click', ()=> open(t.dataset.video)); });

  $$('.modal [data-close]').forEach(x => x.addEventListener('click', close));
  modal?.addEventListener('click', e=> { if(e.target.classList.contains('modal-backdrop')) close(); });
  document.addEventListener('keydown', e=> { if(e.key==='Escape') close(); });
})();

/* ========== SIMULADOR: click image -> modal -> whatsapp ========== */
(function(){
  const items = $$('.ba-card.item'), simModal = $('#simModal'), simTitle = $('#simTitle'), simDesc = $('#simDesc');
  const sizeEl = $('#simSize'), qtyEl = $('#simQty'), useGeo = $('#useGeo'), geoMsg = $('#geoMsg');
  let currentType = null;
  let currentId = null;
  let lastCoords = null;
  const ARAPIRACA = { lat: -9.7526, lon: -36.6614 }; // approx
  const ALLOWED_KM = 15;

  function distKm(a,b){
    const toRad = v => v * Math.PI/180;
    const R = 6371;
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lon - a.lon);
    const la1 = toRad(a.lat), la2 = toRad(b.lat);
    const h = Math.sin(dLat/2)**2 + Math.cos(la1)*Math.cos(la2)*Math.sin(dLon/2)**2;
    return 2*R*Math.asin(Math.sqrt(h));
  }

  function openSim(type,id){
    currentType = type; currentId = id;
    if (simTitle) simTitle.textContent = `Orçamento — ${type}`;
    if (simDesc) simDesc.textContent = `Escolha tamanho e quantidade. Podemos usar sua localização para verificar distância (Arapiraca + ${ALLOWED_KM} km).`;
    if (geoMsg) geoMsg.textContent = '';
    lastCoords = null;
    if (simModal) { simModal.classList.add('show'); simModal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  }

  function closeSim(){
    if (simModal) { simModal.classList.remove('show'); simModal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  }

  items.forEach(it => {
    if(!it) return;
    it.addEventListener('click', ()=> openSim(it.dataset.type || 'Item', it.dataset.id || ''));
    it.addEventListener('keydown', e=> { if(e.key==='Enter' || e.key === ' ') openSim(it.dataset.type || 'Item', it.dataset.id || ''); });
  });

  const simCancel = $('#simCancel');
  if (simCancel) simCancel.addEventListener('click', ()=> closeSim());

  // geolocation
  if (useGeo) {
    useGeo.addEventListener('click', () => {
      if (geoMsg) geoMsg.textContent = 'Solicitando localização...';
      if (!navigator.geolocation) { if (geoMsg) geoMsg.textContent = 'Geolocalização não suportada.'; return; }
      navigator.geolocation.getCurrentPosition(pos => {
        lastCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        const d = distKm(lastCoords, ARAPIRACA);
        if (geoMsg) {
          geoMsg.textContent = `Você está a ${d.toFixed(1)} km de Arapiraca.`;
          if (d <= ALLOWED_KM) geoMsg.textContent += ' ✔️ Dentro da área de atuação.';
          else geoMsg.textContent += ' ⚠ Fora da área (podem haver taxas).';
        }
      }, err => {
        if (geoMsg) geoMsg.textContent = 'Erro ao obter localização.';
      }, { enableHighAccuracy:true, timeout:10000 });
    });
  }

  // send -> WhatsApp
  const simSend = $('#simSend');
  if (simSend) simSend.addEventListener('click', ()=> {
    const size = sizeEl?.value || 'Médio';
    const qty = qtyEl?.value || 1;
    let locationNote = '';
    let distanceNote = '';
    if(lastCoords){
      const d = distKm(lastCoords, ARAPIRACA);
      distanceNote = `Distância aprox: ${d.toFixed(1)} km.`;
      locationNote = `Localização (lat,lon): ${lastCoords.lat.toFixed(5)}, ${lastCoords.lon.toFixed(5)}.`;
    } else {
      locationNote = 'Localização não fornecida.';
    }

    const msg = `Olá Gslimp! Solicito orçamento para: ${currentType || '—'}\nTamanho: ${size}\nQuantidade: ${qty}\n${distanceNote}\n${locationNote}\nAtuação em Arapiraca e região (até ${ALLOWED_KM}km) - por favor confirmar disponibilidade.`;
    const phone = '5582991522179'; // substitute your number
    const wa = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

    closeSim();
    window.open(wa, '_blank');
  });

  // close modal on backdrop or close buttons (already handled but double guard)
  $$('.modal [data-close]').forEach(x => x.addEventListener('click', ()=> {
    const m = x.closest('.modal'); if(m){ m.classList.remove('show'); m.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  }));
})();

/* ========== small niceties end ========== */
/* ensure reveals visible after load */
window.addEventListener('load', ()=> setTimeout(()=> $$('.reveal').forEach(e=> e.classList.add('visible')), 800));

/* Minimal protections only (non-invasive): clear accidental selections on mouseup for UX */
document.addEventListener('mouseup', ()=> window.getSelection()?.removeAllRanges?.());

/* Ensure images are not draggable */
$$('img').forEach(img=>{ try{ img.draggable=false; }catch(e){} });