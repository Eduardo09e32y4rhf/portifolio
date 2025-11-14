/* Advanced JS for Gslimp
   - Theme advanced (system pref, saved, time fallback, animated icons)
   - Mobile menu (hamburger)
   - Scroll reveal (IntersectionObserver, respects reduced-motion)
   - Carousel autoscroll + drag + pause + loop
   - Before/After pointer slider
   - Video modal (lazy iframe)
   - Year injection + small accessibility niceties
*/

/* -------------------- Utilities -------------------- */
const $ = (sel, ctx = document) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx = document) => Array.from((ctx || document).querySelectorAll(sel));
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------------------- Year injection -------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;
});

/* -------------------- THEME: detect & toggle -------------------- */
(function ThemeManager(){
  const root = document.documentElement;
  const btn = $('#themeToggle');

  function systemPref() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }

  // Load saved, else system pref, else time-of-day fallback
  const saved = localStorage.getItem('gslimp:theme');
  if (saved) root.setAttribute('data-theme', saved);
  else {
    // prefer system, if not available use hour >= 18 or <=6 as dark fallback
    try {
      const detected = systemPref();
      root.setAttribute('data-theme', detected);
    } catch (e) {
      const hour = new Date().getHours();
      root.setAttribute('data-theme', (hour >= 18 || hour < 6) ? 'dark' : 'light');
    }
  }

  // Toggle with animation-friendly guard
  if (btn) {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      // small fade effect by toggling class on root (CSS handles transitions)
      root.style.transition = 'background 420ms cubic-bezier(.2,.9,.2,1), color 420ms cubic-bezier(.2,.9,.2,1)';
      root.setAttribute('data-theme', next);
      localStorage.setItem('gslimp:theme', next);
      // accessible announce could be added here
    });
  }

  // If system pref changes, respect it unless user saved choice
  if (!saved && window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', (e) => {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    });
  }
})();

/* -------------------- MOBILE MENU -------------------- */
(function MobileMenu(){
  const toggle = $('#mobileToggle');
  const nav = $('#mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? '' : 'flex';
    nav.style.flexDirection = expanded ? '' : 'column';
    nav.style.gap = expanded ? '' : '12px';
    // close on outside click
    if (!expanded) {
      setTimeout(() => {
        const off = (e) => {
          if (!nav.contains(e.target) && e.target !== toggle) {
            nav.style.display = '';
            toggle.setAttribute('aria-expanded', 'false');
            document.removeEventListener('click', off);
          }
        };
        document.addEventListener('click', off);
      }, 0);
    }
  });
})();

/* -------------------- Scroll Reveal -------------------- */
(function Reveal(){
  if (prefersReduced) {
    // reveal all instantly
    $$('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // optional: unobserve to free memory
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$('.reveal').forEach(el => obs.observe(el));
})();

/* -------------------- Carousel (autoscroll + drag) -------------------- */
(function Carousel(){
  const tracks = $$('.carousel-track');
  tracks.forEach(track => {
    let isDown = false, startX = 0, scrollLeft = 0, raf = null;
    const autoplay = track.dataset.autoplay !== 'false';
    const speed = parseFloat(track.dataset.speed) || 0.35;

    // autoscroll
    const step = () => {
      if (!autoplay || isDown) return;
      track.scrollLeft += speed;
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
        // smooth reset
        track.scrollTo({ left: 0, behavior: 'smooth' });
      }
      raf = requestAnimationFrame(step);
    };
    if (autoplay && !prefersReduced) raf = requestAnimationFrame(step);

    const pause = () => { if (raf) cancelAnimationFrame(raf); raf = null; };
    const resume = () => { if (autoplay && !prefersReduced && !raf) raf = requestAnimationFrame(step); };

    track.addEventListener('pointerdown', (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.setPointerCapture?.(e.pointerId);
      pause();
    });
    track.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.6;
      track.scrollLeft = scrollLeft - walk;
    });
    track.addEventListener('pointerup', (e) => {
      isDown = false;
      track.releasePointerCapture?.(e.pointerId);
      setTimeout(resume, 500);
    });
    track.addEventListener('pointercancel', () => { isDown = false; resume(); });

    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', () => { if (!isDown) resume(); });
  });
})();

/* -------------------- Before/After Slider -------------------- */
(function BeforeAfter(){
  const figures = $$('.ba-figure');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  figures.forEach(fig => {
    const before = fig.dataset.before;
    const after = fig.dataset.after;
    const beforeEl = fig.querySelector('.ba-before');
    const afterEl = fig.querySelector('.ba-after');
    const handle = fig.querySelector('.ba-handle');

    if (before) beforeEl.style.backgroundImage = `url("${before}")`;
    if (after) afterEl.style.backgroundImage = `url("${after}")`;

    // initial
    const rect = fig.getBoundingClientRect();
    const width = fig.clientWidth;
    const setPos = (x) => {
      const pct = clamp(((x - fig.getBoundingClientRect().left) / fig.clientWidth) * 100, 0, 100);
      afterEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = `${pct}%`;
    };
    // start centered
    setPos(fig.getBoundingClientRect().left + fig.clientWidth / 2);

    let active = false;
    fig.addEventListener('pointerdown', (e) => {
      active = true;
      fig.setPointerCapture?.(e.pointerId);
      setPos(e.clientX);
    });
    fig.addEventListener('pointermove', (e) => {
      if (!active) return;
      setPos(e.clientX);
    });
    const up = (e) => {
      active = false;
      try { fig.releasePointerCapture?.(e.pointerId); } catch {}
    };
    fig.addEventListener('pointerup', up);
    fig.addEventListener('pointercancel', up);

    // responsive adjustment
    window.addEventListener('resize', () => {
      setPos(fig.getBoundingClientRect().left + fig.clientWidth / 2);
    });
  });
})();

/* -------------------- Video modal (lazy load) -------------------- */
(function VideoModal(){
  const modal = $('#videoModal');
  const iframe = $('#modal-iframe');
  const openers = [...$$('.video-open'), ...$$('.device-media')];

  function open(src){
    if (!modal || !iframe) return;
    iframe.src = src + (src.includes('?') ? '&autoplay=1&rel=0' : '?autoplay=1&rel=0');
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    if (!modal || !iframe) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    iframe.src = '';
    document.body.style.overflow = '';
  }

  openers.forEach(el => {
    el.addEventListener('click', (e) => {
      // prefer data-video then data-src
      const src = el.dataset.video || el.dataset.src || el.closest('.device-media')?.dataset?.src;
      if (src) open(src);
    });
  });

  $$('.modal [data-close]').forEach(btn => btn.addEventListener('click', close));
  modal?.addEventListener('click', (e) => { if (e.target.classList.contains('modal-backdrop')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

/* -------------------- Small niceties -------------------- */
// Make .reveal elements visible if JS disabled or observer didn't run
window.addEventListener('load', () => {
  setTimeout(() => {
    $$('.reveal').forEach(el => {
      if (!el.classList.contains('visible')) el.classList.add('visible');
    });
  }, 1000);
});

/* -------------------- Non-intrusive copy/devtools block (keeps accessibility) -------------------- */
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && ['u','s'].includes(e.key.toLowerCase())) {
    // Prevent accidental page-source or save in some contexts (non-intrusive)
    e.preventDefault();
  }
});