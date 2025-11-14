/* GSLIMP — JS (Apple-like, minimal & reliable)
   Features:
   - Theme toggle persisted
   - Scroll reveal (IntersectionObserver)
   - Video modal lazy load
   - Before/After slider (drag + pointer)
   - Carousel autoscroll + drag + pause
   - Small nav scroll tweak + year injection
*/

/* ---- Utilities ---- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ---- Year injection ---- */
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if (el) el.textContent = y;
});

/* ---- Theme toggle ---- */
(function themeToggle(){
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('gslimp-theme') || 'light';
  root.setAttribute('data-theme', saved);
  if (!btn) return;

  const setIcon = (theme) => btn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  setIcon(saved);

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('gslimp-theme', next);
    setIcon(next);
  });
})();

/* ---- Scroll reveal ---- */
(function reveal(){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  const els = $$('.reveal');
  els.forEach(el => obs.observe(el));
})();

/* ---- NAV small behaviour ---- */
(function navBehavior(){
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) nav.style.transform = 'translateY(-6px) scale(0.995)';
    else nav.style.transform = '';
  });
})();

/* ---- Video modal (lazy iframe) ---- */
(function videoModal(){
  const modal = $('#videoModal');
  const iframe = $('#modalVideo');
  const openers = $$('.video-open, .device-media');

  function open(src){
    if (!modal || !iframe) return;
    iframe.src = src + ((src.indexOf('?') === -1) ? '?autoplay=1&rel=0' : '&autoplay=1&rel=0');
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    if (!modal || !iframe) return;
    iframe.src = '';
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  openers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const src = btn.dataset.video || btn.dataset.src || btn.closest('.device-media')?.dataset?.src;
      if (src) open(src);
    });
  });

  $$('.modal [data-close]').forEach(el => el.addEventListener('click', close));
  modal?.addEventListener('click', (e) => { if (e.target.classList.contains('modal-backdrop')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

/* ---- Before / After slider (pointer events) ---- */
(function beforeAfter(){
  const figures = $$('.ba-figure');

  figures.forEach(fig => {
    const beforeUrl = fig.dataset.before;
    const afterUrl  = fig.dataset.after;
    const beforeEl  = fig.querySelector('.ba-before');
    const afterEl   = fig.querySelector('.ba-after');
    const handle    = fig.querySelector('.ba-handle');

    // set images as background
    if (beforeUrl) beforeEl.style.backgroundImage = `url("${beforeUrl}")`;
    if (afterUrl)  afterEl.style.backgroundImage  = `url("${afterUrl}")`;

    // initial split
    let width = fig.clientWidth;
    let pos = width / 2;

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    const update = (clientX) => {
      const rect = fig.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 0, rect.width);
      const pct = (x / rect.width) * 100;
      afterEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = `${pct}%`;
    };

    // pointer events
    let active = false;
    fig.addEventListener('pointerdown', (e) => {
      active = true;
      fig.setPointerCapture(e.pointerId);
      update(e.clientX);
    });
    fig.addEventListener('pointermove', (e) => {
      if (!active) return;
      update(e.clientX);
    });
    fig.addEventListener('pointerup', (e) => {
      active = false;
      (e.target).releasePointerCapture?.(e.pointerId);
    });
    // touch fallback: no-op because pointer events handle touch

    // on resize reset
    window.addEventListener('resize', () => {
      width = fig.clientWidth;
      update(width / 2 + fig.getBoundingClientRect().left);
    });
  });
})();

/* ---- Carousel (auto scroll + drag + pause) ---- */
(function carousel(){
  const tracks = $$('.carousel-track');

  tracks.forEach(track => {
    let isDown = false, startX=0, scrollLeft=0, hasDragged=false, raf=0;
    const autoplay = track.dataset.autoplay === 'true' || track.dataset.autoplay === undefined;
    const speed = parseFloat(track.dataset.speed || 0.35); // pixels per frame

    // autoscroll frame
    const step = () => {
      if (!autoplay || isDown) return;
      track.scrollLeft += speed;
      // loop smoothly
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      }
      raf = requestAnimationFrame(step);
    };
    if (autoplay) raf = requestAnimationFrame(step);

    const pause = () => { cancelAnimationFrame(raf); };
    const resume = () => { if (autoplay) raf = requestAnimationFrame(step); };

    // hover pause
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', () => { if (!isDown) resume(); });

    // drag to scroll (mouse & touch via pointer)
    track.addEventListener('pointerdown', (e) => {
      isDown = true;
      hasDragged = false;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.classList.add('dragging');
      pause();
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.6;
      if (Math.abs(walk) > 5) hasDragged = true;
      track.scrollLeft = scrollLeft - walk;
    });
    track.addEventListener('pointerup', (e) => {
      isDown = false;
      track.classList.remove('dragging');
      try { track.releasePointerCapture(e.pointerId); } catch {}
      // resume with small delay if dragged
      setTimeout(resume, hasDragged ? 800 : 300);
    });
    track.addEventListener('pointercancel', () => { isDown=false; track.classList.remove('dragging'); resume(); });
  });
})();

/* ---- Small copy protection (non intrusive) ---- */
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && ['u','s'].includes(e.key.toLowerCase())) e.preventDefault();
});