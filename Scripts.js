/* ============================
   GSLIMP — FINAL SCRIPT (ONE-PAGE)
   - theme toggle (saved + system)
   - mobile menu
   - reveal
   - carousel auto + drag
   - video modal lazy
   - simulador (click image -> modal -> whatsapp)
   - geolocation distance check (Arapiraca 15km)
   - protections (selection, contextmenu, shortcuts, printscreen blur)
   ============================ */

const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ========== Year ========== */
document.addEventListener('DOMContentLoaded', () => {
  $('#year')?.textContent = new Date().getFullYear();
});

/* ========== THEME ========== */
(function(){
  const root = document.documentElement;
  const toggle = $('#themeToggle');
  const saved = localStorage.getItem('gslimp:theme');

  function prefersDark() {
    try { return window.matchMedia('(prefers-color-scheme: dark)').matches; } catch(e) { return false; }
  }

  if (saved) root.setAttribute('data-theme', saved);
  else root.setAttribute('data-theme', prefersDark() ? 'dark' : 'light');

  toggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.style.transition = 'background 420ms,color 420ms';
    root.setAttribute('data-theme', next);
    localStorage.setItem('gslimp:theme', next);
    setTimeout(()=>root.style.transition='',600);
  });
})();

/* ========== MOBILE MENU ========== */
(function(){
  const bt = $('#mobileToggle'), nav = $('#mainNav');
  if(!bt||!nav) return;
  bt.addEventListener('click', ()=> {
    const open = bt.getAttribute('aria-expanded') === 'true';
    bt.setAttribute('aria-expanded', String(!open));
    if(!open){
      nav.style.display='flex'; nav.style.flexDirection='column'; nav.style.gap='12px'; nav.style.padding='12px';
      setTimeout(()=>{ const off = (e)=>{ if(!nav.contains(e.target)&&e.target!==bt){ nav.style.display=''; bt.setAttribute('aria-expanded','false'); document.removeEventListener('click',off); } }; document.addEventListener('click', off); },0);
    } else { nav.style.display=''; nav.style.flexDirection=''; nav.style.gap=''; nav.style.padding=''; }
  });
})();

/* ========== REVEAL ========== */
(function(){
  const els = $$('.reveal');
  if(prefersReduced){ els.forEach(e=>e.classList.add('visible')); return; }
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add('visible'); obs.unobserve(en.target); }
    });
  },{threshold:0.12});
  els.forEach(e=>obs.observe(e));
})();

/* ========== CAROUSEL ========== */
(function(){
  const tracks = $$('.carousel-track');
  tracks.forEach(track=>{
    let isDown=false, startX=0, scrollLeft=0, raf=null;
    const autoplay = track.dataset.autoplay !== 'false', speed = parseFloat(track.dataset.speed)||0.35;
    const step = ()=>{ if(!autoplay||isDown) return; track.scrollLeft += speed; if(track.scrollLeft+track.clientWidth >= track.scrollWidth-2) track.scrollTo({left:0,behavior:'smooth'}); raf = requestAnimationFrame(step); };
    if(autoplay && !prefersReduced) raf = requestAnimationFrame(step);
    const pause=()=>{ if(raf) cancelAnimationFrame(raf); raf=null; }, resume=()=>{ if(autoplay && !prefersReduced && !raf) raf = requestAnimationFrame(step); };

    track.addEventListener('pointerdown', e=>{ isDown=true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; track.setPointerCapture?.(e.pointerId); pause(); });
    track.addEventListener('pointermove', e=>{ if(!isDown) return; const x=e.pageX - track.offsetLeft; const walk=(x - startX)*1.6; track.scrollLeft = scrollLeft - walk; });
    track.addEventListener('pointerup', e=>{ isDown=false; track.releasePointerCapture?.(e.pointerId); setTimeout(resume,500); });
    track.addEventListener('pointercancel', ()=>{ isDown=false; resume(); });
    track.addEventListener('mouseenter', pause); track.addEventListener('mouseleave', ()=>{ if(!isDown) resume(); });
  });
})();

/* ========== VIDEO MODAL ========== */
(function(){
  const modal = $('#videoModal'), iframe = $('#modal-iframe');
  const openers = $$('.video-open'), medias = $$('.device-media'), thumbs = $$('.video-thumb');

  function open(src){
    if(!modal||!iframe) return;
    iframe.src = src + (src.includes('?') ? '&autoplay=1&rel=0' : '?autoplay=1&rel=0');
    modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  }
  function close(){
    if(!modal||!iframe) return;
    iframe.src=''; modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow='';
  }

  openers.forEach(b => b.addEventListener('click', ()=> open(b.dataset.video)));
  medias.forEach(m => m.addEventListener('click', ()=> open(m.dataset.src)));
  thumbs.forEach(t => t.addEventListener('click', ()=> open(t.dataset.video)));

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

  // haversine
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
    simTitle.textContent = `Orçamento — ${type}`;
    simDesc.textContent = `Escolha tamanho e quantidade. Podemos usar sua localização para verificar distância (Arapiraca + ${ALLOWED_KM} km).`;
    geoMsg.textContent = '';
    lastCoords = null;
    simModal.classList.add('show'); simModal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  }

  function closeSim(){
    simModal.classList.remove('show'); simModal.setAttribute('aria-hidden','true'); document.body.style.overflow='';
  }

  items.forEach(it => {
    it.addEventListener('click', ()=> openSim(it.dataset.type,it.dataset.id));
    it.addEventListener('keydown', e=> { if(e.key==='Enter') openSim(it.dataset.type,it.dataset.id); });
  });

  $('#simCancel').addEventListener('click', ()=> closeSim());

  // geolocation
  useGeo?.addEventListener('click', () => {
    geoMsg.textContent = 'Solicitando localização...';
    if (!navigator.geolocation) { geoMsg.textContent = 'Geolocalização não suportada.'; return; }
    navigator.geolocation.getCurrentPosition(pos => {
      lastCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
      const d = distKm(lastCoords, ARAPIRACA);
      geoMsg.textContent = `Você está a ${d.toFixed(1)} km de Arapiraca.`;
      if (d <= ALLOWED_KM) geoMsg.textContent += ' ✔️ Dentro da área de atuação.';
      else geoMsg.textContent += ' ⚠ Fora da área (podem haver taxas).';
    }, err => {
      geoMsg.textContent = 'Erro ao obter localização.';
    }, { enableHighAccuracy:true, timeout:10000 });
  });

  // send -> WhatsApp
  $('#simSend').addEventListener('click', ()=> {
    const size = sizeEl.value || 'Médio';
    const qty = qtyEl.value || 1;
    let locationNote = '';
    let distanceNote = '';
    if(lastCoords){
      const d = distKm(lastCoords, ARAPIRACA);
      distanceNote = `Distância aprox: ${d.toFixed(1)} km.`;
      locationNote = `Localização (lat,lon): ${lastCoords.lat.toFixed(5)}, ${lastCoords.lon.toFixed(5)}.`;
    } else {
      locationNote = 'Localização não fornecida.';
    }

    // prefill message
    const msg = `Olá Gslimp! Solicito orçamento para: ${currentType}\nTamanho: ${size}\nQuantidade: ${qty}\n${distanceNote}\n${locationNote}\nAtuação em Arapiraca e região (até 15km) - por favor confirmar disponibilidade.`;
    const phone = '5582991522179'; // substitute your number
    const wa = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

    // Close modal and open whatsapp
    closeSim();
    window.open(wa, '_blank');
  });

  // close modal on backdrop or close buttons
  $$('.modal [data-close]').forEach(x => x.addEventListener('click', ()=> {
    const m = x.closest('.modal'); m.classList.remove('show'); m.setAttribute('aria-hidden','true'); document.body.style.overflow='';
  }));
})();

/* ========== small niceties end ========== */
/* ensure reveals visible after load */
window.addEventListener('load', ()=> setTimeout(()=> $$('.reveal').forEach(e=> e.classList.add('visible')), 800));

/* ========== PROTECTIONS (front-end maximum) ========== */
/* selection/drag/contextmenu block (CSS also applied) */
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
document.addEventListener('dragstart', e => e.preventDefault());
document.addEventListener('contextmenu', e => e.preventDefault());

/* keyboard shortcuts */
document.addEventListener('keydown', e => {
  const key = (e.key||'').toLowerCase();
  if (e.key === 'F12' ||
      (e.ctrlKey && key==='u') ||
      (e.ctrlKey && key==='s') ||
      (e.ctrlKey && key==='c') ||
      (e.ctrlKey && e.shiftKey && key==='i') ||
      (e.ctrlKey && e.shiftKey && key==='j')) {
    e.preventDefault();
    return false;
  }
});

/* PrintScreen attempt: clear clipboard and warn (best-effort only) */
document.addEventListener('keyup', e => {
  if (e.key === 'PrintScreen') {
    try { navigator.clipboard.writeText(''); } catch(e) {}
    try { alert('⛔ Captura de tela detectada — algumas proteções ativas.'); } catch(e) {}
  }
});

/* blur when tab hidden */
document.addEventListener('visibilitychange', ()=> {
  if (document.visibilityState === 'hidden') document.body.style.filter = 'blur(30px)';
  else document.body.style.filter = '';
});

/* anti devtools image trick */
(function(){
  const img = new Image();
  Object.defineProperty(img, 'id', { get: function(){ try { document.documentElement.innerHTML = "<div style='height:100vh;display:flex;align-items:center;justify-content:center;background:#111;color:#f33;font-size:20px'>⛔ Acesso Bloqueado</div>"; } catch(e){} throw new Error('DevTools blocked'); }});
  console.log('%c', img);
})();

/* anti-inspect by dimension diff */
setInterval(()=> {
  if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
    try { document.documentElement.innerHTML = "<div style='height:100vh;display:flex;align-items:center;justify-content:center;background:#111;color:#f33;font-size:22px'>⛔ Inspeção detectada — acesso bloqueado.</div>"; } catch(e) {}
  }
}, 700);

/* anti-iframe */
if (window.top !== window.self) { try { window.top.location = window.self.location; } catch(e){} }

/* non-intrusive: clear selection on mouseup */
document.addEventListener('mouseup', ()=> window.getSelection()?.removeAllRanges?.());

/* make images non-draggable (double-check) */
$$('img').forEach(img=>{ try{ img.draggable=false; img.style.pointerEvents='none'; }catch(e){} });

/* End of script */