/* path: script.js
   Minimal, defensive JS: mobile menu, reveal, carousel, modals, simulador -> WhatsApp
*/

/* tiny helpers */
const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));
const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* YEAR */
document.addEventListener('DOMContentLoaded', () => {
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
});

/* MOBILE MENU */
(function(){
  const bt = $('#mobileToggle'), navLinks = $('#navLinks');
  if (!bt || !navLinks) return;
  bt.addEventListener('click', () => {
    const open = bt.getAttribute('aria-expanded') === 'true';
    bt.setAttribute('aria-expanded', String(!open));
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
  });
})();

/* THEME TOGGLE (light/dark small) */
(function(){
  const btn = $('#themeToggle');
  if(!btn) return;
  const root = document.documentElement;
  btn.addEventListener('click', ()=>{
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    btn.querySelector('i')?.classList.toggle('fa-sun');
    btn.querySelector('i')?.classList.toggle('fa-moon');
  });
})();

/* REVEAL ON SCROLL */
(function(){
  const els = $$('.reveal');
  if (!els.length) return;
  if (prefersReduced) { els.forEach(e=>e.classList.add('visible')); return; }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(e => obs.observe(e));
})();

/* CAROUSEL: simple auto + drag */
(function(){
  const tracks = $$('.carousel-track');
  tracks.forEach(track => {
    let isDown = false, startX = 0, scrollLeft = 0, raf = null;
    const autoplay = track.dataset.autoplay !== 'false' && track.dataset.autoplay !== '0';
    const speed = parseFloat(track.dataset.speed) || 0.4;

    const step = () => {
      if (!autoplay || isDown || prefersReduced) { raf = requestAnimationFrame(step); return; }
      track.scrollLeft = Math.min(track.scrollLeft + speed, track.scrollWidth - track.clientWidth);
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) track.scrollLeft = 0;
      raf = requestAnimationFrame(step);
    };
    if (autoplay && !prefersReduced) raf = requestAnimationFrame(step);

    const pause = () => { if (raf) cancelAnimationFrame(raf); raf = null; };
    const resume = () => { if (!raf && autoplay && !prefersReduced) raf = requestAnimationFrame(step); };

    track.addEventListener('pointerdown', e => {
      isDown = true;
      const rect = track.getBoundingClientRect();
      startX = e.clientX - rect.left;
      scrollLeft = track.scrollLeft;
      track.setPointerCapture?.(e.pointerId);
      pause();
    });
    track.addEventListener('pointermove', e => {
      if (!isDown) return;
      const rect = track.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const walk = (x - startX) * 1.6;
      track.scrollLeft = scrollLeft - walk;
    });
    const up = (e) => { isDown = false; try { track.releasePointerCapture?.(e.pointerId); } catch(e){} resume(); };
    track.addEventListener('pointerup', up);
    track.addEventListener('pointercancel', ()=>{ isDown=false; resume(); });
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', ()=>{ if(!isDown) resume(); });
  });
})();

/* VIDEO MODAL (lazy iframe) */
(function(){
  const modal = $('#videoModal'), iframe = $('#modal-iframe');
  const openers = $$('.video-open'), medias = $$('.phone-screen'), thumbs = $$('.video-thumb');

  function open(src){
    if (!modal || !iframe || !src) return;
    iframe.src = src + (src.includes('?') ? '&autoplay=1&rel=0' : '?autoplay=1&rel=0');
    modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  }
  function close(){
    if (!modal || !iframe) return;
    iframe.src = '';
    modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow='';
  }

  // click handlers
  medias.forEach(m => {
    const src = m.dataset.src || m.getAttribute('data-src');
    if (!src) return;
    m.addEventListener('click', ()=> open(src));
    m.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(src); });
  });
  thumbs.forEach(t => {
    const src = t.dataset.video;
    if (!src) return;
    t.addEventListener('click', ()=> open(src));
    t.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(src); });
  });
  $$('.video-open').forEach(b => { if (b.dataset && b.dataset.video) b.addEventListener('click', ()=> open(b.dataset.video)); });

  $$('.modal [data-close]').forEach(x => x.addEventListener('click', close));
  modal?.addEventListener('click', e => { if (e.target.classList.contains('modal-backdrop')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

/* SIMULADOR -> WhatsApp + optional geolocation */
(function(){
  const items = $$('.ba-card.item'), simModal = $('#simModal'), simSize = $('#simSize'), simQty = $('#simQty');
  const useGeo = $('#useGeo'), geoMsg = $('#geoMsg'), simSend = $('#simSend'), openSimBtn = $('#openSim');
  const ARAPIRACA = { lat: -9.7526, lon: -36.6614 };
  const ALLOWED_KM = 15;
  let lastCoords = null, currentType = 'Solicitação';

  function distKm(a,b){
    const toRad = v => v * Math.PI / 180;
    const R = 6371;
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lon - a.lon);
    const la1 = toRad(a.lat), la2 = toRad(b.lat);
    const h = Math.sin(dLat/2)**2 + Math.cos(la1)*Math.cos(la2)*Math.sin(dLon/2)**2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function openSim(type){
    currentType = type || 'Serviço';
    if (simModal) { simModal.classList.add('show'); simModal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
    if (geoMsg) geoMsg.textContent = '';
    lastCoords = null;
  }
  function closeSim(){ if (simModal) { simModal.classList.remove('show'); simModal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; } }

  items.forEach(it => {
    it.addEventListener('click', ()=> openSim(it.dataset.type));
    it.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openSim(it.dataset.type); });
  });

  if (openSimBtn) openSimBtn.addEventListener('click', ()=> openSim('Orçamento'));

  $('#simCancel')?.addEventListener('click', closeSim);

  if (useGeo) useGeo.addEventListener('click', ()=>{
    if (geoMsg) geoMsg.textContent = 'Solicitando localização...';
    if (!navigator.geolocation) { if (geoMsg) geoMsg.textContent = 'Geolocalização não suportada.'; return; }
    navigator.geolocation.getCurrentPosition(pos => {
      lastCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
      const d = distKm(lastCoords, ARAPIRACA);
      if (geoMsg) {
        geoMsg.textContent = `Você está a ${d.toFixed(1)} km de Arapiraca.`;
        geoMsg.textContent += d <= ALLOWED_KM ? ' ✔️ Dentro da área.' : ' ⚠ Fora da área (podem haver taxas).';
      }
    }, err => { if (geoMsg) geoMsg.textContent = 'Erro ao obter localização.'; }, { enableHighAccuracy:true, timeout:10000 });
  });

  if (simSend) simSend.addEventListener('click', ()=>{
    const size = simSize?.value || 'Médio';
    const qty = simQty?.value || 1;
    let locationNote = 'Localização não fornecida.';
    let distanceNote = '';
    if (lastCoords) {
      const d = distKm(lastCoords, ARAPIRACA);
      distanceNote = `Distância aprox: ${d.toFixed(1)} km.`;
      locationNote = `Localização: ${lastCoords.lat.toFixed(5)},${lastCoords.lon.toFixed(5)}.`;
    }
    const msg = `Olá Gslimp! Solicito orçamento para: ${currentType}\nTamanho: ${size}\nQuantidade: ${qty}\n${distanceNote}\n${locationNote}\nAtuação em Arapiraca e região (até ${ALLOWED_KM}km).`;
    const phone = '5582991522179';
    const wa = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    closeSim();
    window.open(wa, '_blank');
  });

  // modal close bindings
  $$('.modal [data-close]').forEach(x => x.addEventListener('click', ()=> {
    const m = x.closest('.modal'); if (m) { m.classList.remove('show'); m.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  }));
})();

/* small niceties */
window.addEventListener('load', ()=> setTimeout(()=> $$('.reveal').forEach(e=> e.classList.add('visible')), 300));