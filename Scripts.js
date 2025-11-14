/* Modernized JS:
   - Carousel: autoplay, drag-to-scroll, pause on hover/touch
   - Lazy-load video iframe & modal
   - Theme toggle (light/dark) persisted in localStorage
   - Scroll reveal with IntersectionObserver
   - Minor nav scroll behaviour + year injection
*/

/* ---------- Utilities ---------- */
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

/* ---------- Theme Toggle ---------- */
(function themeToggle(){
  const root = document.documentElement;
  const btn = $('#theme-toggle');
  const stored = localStorage.getItem('gslimp-theme') || 'light';
  root.setAttribute('data-theme', stored);

  function setIcon(theme) {
    if (!btn) return;
    btn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
  setIcon(stored);

  if (btn) btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('gslimp-theme', next);
    setIcon(next);
  });
})();

/* ---------- Navbar scroll effect ---------- */
(function navScroll(){
  const nav = $('#navbar');
  const threshold = 50;
  window.addEventListener('scroll', () => {
    if (window.scrollY > threshold) document.body.classList.add('scrolled');
    else document.body.classList.remove('scrolled');
  });
})();

/* ---------- Year auto update ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;
});

/* ---------- CAROUSEL MODULE ---------- */
(function carousels(){
  const tracks = $$('.carousel-track');

  tracks.forEach(track => {
    // Drag to scroll
    let isDown=false, startX=0, scrollLeft=0, hasDragged=false;
    const autoplay = track.classList.contains('auto-scroll') && track.dataset.autoplay !== 'false';
    const interval = Math.max(parseInt(track.dataset.interval || 18, 10), 8); // lower => faster
    let frameId = null;
    let paused = false;

    // Autoscroll logic: small increment per frame for smooth continuous movement
    const step = () => {
      if (!autoplay || paused) return;
      track.scrollLeft += 0.3; // tweak speed here
      // loop: when near end, jump to start smoothly
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
        // quick "rewind" effect
        track.scrollTo({ left: 0, behavior: 'smooth' });
      }
      frameId = requestAnimationFrame(step);
    };

    // Start autoplay if enabled
    if (autoplay) {
      frameId = requestAnimationFrame(step);
    }

    const pause = () => {
      paused = true;
      track.classList.add('paused');
      if (frameId) cancelAnimationFrame(frameId);
    };

    const resume = () => {
      paused = false;
      track.classList.remove('paused');
      if (autoplay) {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(step);
      }
    };

    // Mouse / touch handlers
    const down = (e) => {
      isDown = true;
      hasDragged = false;
      pause();
      track.classList.add('active-drag');
      const pageX = (e.touches) ? e.touches[0].pageX : e.pageX;
      startX = pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    };
    const up = () => {
      isDown = false;
      track.classList.remove('active-drag');
      // If user dragged, keep paused briefly
      if (hasDragged) setTimeout(resume, 800);
      else resume();
    };
    const move = (e) => {
      if (!isDown) return;
      const pageX = (e.touches) ? e.touches[0].pageX : e.pageX;
      const x = pageX - track.offsetLeft;
      const walk = (x - startX) * 1.8;
      if (Math.abs(walk) > 6) hasDragged = true;
      track.scrollLeft = scrollLeft - walk;
    };

    // hover to pause
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', () => { if (!isDown) resume(); });

    track.addEventListener('mousedown', down);
    track.addEventListener('touchstart', down, {passive:true});
    window.addEventListener('mouseup', up);
    track.addEventListener('touchend', up);

    track.addEventListener('mousemove', move);
    track.addEventListener('touchmove', move, {passive:true});
  });
})();

/* ---------- Lazy load video placeholder & modal ---------- */
(function videoModule(){
  const placeholders = $$('.video-placeholder');
  const modal = $('#videoModal');
  const modalIframe = $('#modal-iframe');

  placeholders.forEach(ph => {
    ph.addEventListener('click', () => {
      const src = ph.dataset.src;
      if (!src) return;
      // open modal and set iframe
      openModalWithSrc(src);
    });
  });

  function openModalWithSrc(src){
    if (!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
    modalIframe.src = src + '&autoplay=1';
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    modalIframe.src = '';
    document.body.style.overflow = '';
  }

  // modal close listeners
  document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  // escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // also connect hero "Assistir demo" button to modal
  document.querySelectorAll('.ghost-video-open').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const ph = placeholders[0];
      if (ph) {
        const src = ph.dataset.src;
        openModalWithSrc(src);
      }
    })
  });
})();

/* ---------- Scroll reveal (IntersectionObserver) ---------- */
(function revealModule(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal-visible');
      }
    });
  }, { threshold: 0.12 });

  const revealEls = $$('.servico-card, .depoimento-card, .stats-card, .header-section');
  revealEls.forEach(el => {
    el.classList.add('reveal');
    io.observe(el);
  });
})();

/* ---------- Minimal copy/devtools block (kept from original but less aggressive) ---------- */
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    const key = e.key.toLowerCase();
    // We will block typical "view-source / save / inspect" combos but keep accessibility in mind
    if (['u','s'].includes(key)) {
      e.preventDefault();
    }
  }
});

/* ---------- Small accessibility helpers: allow focusing carousel items ---------- */
document.querySelectorAll('.carousel-item').forEach(i => i.setAttribute('tabindex','0'));

/* End of script.js */