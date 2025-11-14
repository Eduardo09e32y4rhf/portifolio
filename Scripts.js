/* ==========================
   GSLIMP — script.js (FINAL ULTRA)
   Funcionalidades:
   - Theme manager (system pref, saved, time fallback)
   - Mobile menu
   - Scroll reveal (prefers-reduced-motion safe)
   - Carousel autoscroll + drag + pause
   - Before/After pointer slider
   - Video modal lazy load
   - Year injection
   - Proteções Ultra (copy/block/anti-devtools/anti-iframe/anti-print)
   - Código organizado e completo
   ========================== */

/* Utility selectors */
const $ = (sel, ctx = document) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx = document) => Array.from((ctx || document).querySelectorAll(sel));
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------------------- Year injection -------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if (el) el.textContent = y;
});

/* -------------------- THEME MANAGER -------------------- */
(function ThemeManager() {
  const root = document.documentElement;
  const toggle = $('#themeToggle');
  const saved = localStorage.getItem('gslimp:theme');

  function systemPref() {
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch (e) {}
    return 'light';
  }

  if (saved) root.setAttribute('data-theme', saved);
  else {
    const detected = systemPref();
    if (detected) root.setAttribute('data-theme', detected);
    else {
      const hour = new Date().getHours();
      root.setAttribute('data-theme', (hour >= 18 || hour < 6) ? 'dark' : 'light');
    }
  }

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.style.transition = 'background 420ms cubic-bezier(.2,.9,.2,1), color 420ms cubic-bezier(.2,.9,.2,1)';
    root.setAttribute('data-theme', next);
    localStorage.setItem('gslimp:theme', next);
    setTimeout(() => root.style.transition = '', 500);
  });

  if (!saved && window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', e => root.setAttribute('data-theme', e.matches ? 'dark' : 'light'));
  }
})();

/* -------------------- MOBILE MENU -------------------- */
(function MobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const opened = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!opened));
    if (!opened) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
      nav.style.padding = '12px';
      // outside click closes
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
    } else {
      nav.style.display = '';
      nav.style.flexDirection = '';
      nav.style.gap = '';
      nav.style.padding = '';
    }
  });
})();

/* -------------------- SCROLL REVEAL -------------------- */
(function Reveal() {
  const els = $$('.reveal');
  if (prefersReduced) { els.forEach(el => el.classList.add('visible')); return; }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

/* -------------------- CAROUSEL (autoscroll + drag) -------------------- */
(function Carousel() {
  const tracks = $$('.carousel-track');
  tracks.forEach(track => {
    let isDown = false, startX = 0, scrollLeft = 0, raf = null;
    const autoplay = track.dataset.autoplay !== 'false';
    const speed = parseFloat(track.dataset.speed) || 0.35;

    const step = () => {
      if (!autoplay || isDown) return;
      track.scrollLeft += speed;
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
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

/* -------------------- BEFORE/AFTER SLIDER -------------------- */
(function BeforeAfter() {
  const figs = $$('.ba-figure');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  figs.forEach(fig => {
    const before = fig.dataset.before; const after = fig.dataset.after;
    const beforeEl = fig.querySelector('.ba-before'); const afterEl = fig.querySelector('.ba-after');
    const handle = fig.querySelector('.ba-handle');

    if (before) beforeEl.style.backgroundImage = `url("${before}")`;
    if (after) afterEl.style.backgroundImage = `url("${after}")`;

    const setPos = (clientX) => {
      const rect = fig.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 0, rect.width);
      const pct = (x / rect.width) * 100;
      afterEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = `${pct}%`;
    };

    const initX = fig.getBoundingClientRect().left + fig.clientWidth / 2;
    setPos(initX);

    let active = false;
    fig.addEventListener('pointerdown', (e) => {
      active = true;
      fig.setPointerCapture?.(e.pointerId);
      setPos(e.clientX);
    });
    fig.addEventListener('pointermove', (e) => { if (!active) return; setPos(e.clientX); });
    const up = (e) => { active = false; try { fig.releasePointerCapture?.(e.pointerId); } catch {} };
    fig.addEventListener('pointerup', up);
    fig.addEventListener('pointercancel', up);

    window.addEventListener('resize', () => {
      const center = fig.getBoundingClientRect().left + fig.clientWidth / 2;
      setPos(center);
    });
  });
})();

/* -------------------- VIDEO MODAL lazy load -------------------- */
(function VideoModal() {
  const modal = $('#videoModal'); const iframe = $('#modal-iframe');
  const openers = [...$$('.video-open'), ...$$('.device-media')];

  function open(src) {
    if (!modal || !iframe) return;
    iframe.src = src + (src.includes('?') ? '&autoplay=1&rel=0' : '?autoplay=1&rel=0');
    modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden';
  }
  function close() {
    if (!modal || !iframe) return;
    modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); iframe.src = ''; document.body.style.overflow = '';
  }

  openers.forEach(el => {
    el.addEventListener('click', (e) => {
      // prefer data-video then data-src; element might be .device-media or button
      const src = el.dataset.video || el.dataset.src || el.closest('.device-media')?.dataset?.src;
      if (src) open(src);
    });
  });

  $$('.modal [data-close]').forEach(btn => btn.addEventListener('click', close));
  modal?.addEventListener('click', (e) => { if (e.target.classList.contains('modal-backdrop')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

/* -------------------- Small niceties -------------------- */
window.addEventListener('load', () => {
  setTimeout(() => $$('.reveal').forEach(el => { if (!el.classList.contains('visible')) el.classList.add('visible'); }), 1000);
});

/* ==========================
   ULTRA PROTECTIONS (FRONT-END MAX)
   - selection/drag/contextmenu blocking
   - keyboard shortcuts blocking
   - PrintScreen handler
   - blur on hidden (anti-record)
   - anti-devtools image trick + dimension check
   - anti-iframe
   - make images non-draggable
   ========================== */

/* Prevent selection and copying at runtime (extra safety) */
document.addEventListener("selectstart", e => e.preventDefault());
document.addEventListener("copy", e => e.preventDefault());
document.addEventListener("dragstart", e => e.preventDefault());

/* Block right click */
document.addEventListener("contextmenu", e => e.preventDefault());

/* Block common shortcuts (non-intrusive message optional) */
document.addEventListener("keydown", function(e) {
  const key = e.key?.toLowerCase?.() || '';
  try {
    if (
      e.key === "F12" ||
      (e.ctrlKey && key === "u") ||
      (e.ctrlKey && key === "s") ||
      (e.ctrlKey && key === "p") ||
      (e.ctrlKey && key === "c") ||
      (e.ctrlKey && e.shiftKey && key === "i") ||
      (e.ctrlKey && e.shiftKey && key === "j")
    ) {
      e.preventDefault();
      // optional visual warning (comment out if undesired)
      // alert('Ação não permitida.');
      return false;
    }
  } catch (err) { /* swallow */ }
});

/* PrintScreen attempt: clear clipboard on Windows PrintScreen */
document.addEventListener("keyup", function(e) {
  if (e.key === "PrintScreen") {
    try { navigator.clipboard.writeText(''); } catch (err) {}
    try { alert("⛔ PrintScreen desativado neste site."); } catch (e) {}
  }
});

/* Blur page when tab hidden (anti-record attempt) */
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    document.body.style.filter = "blur(40px)";
  } else {
    document.body.style.filter = "";
  }
});

/* Anti DevTools trick (image getter) */
(function(){
  const img = new Image();
  Object.defineProperty(img, 'id', {
    get: function() {
      try {
        document.documentElement.innerHTML = "<div style='display:flex;align-items:center;justify-content:center;height:100vh;background:#111;color:#f33;font-size:20px'>⛔ Acesso Bloqueado</div>";
      } catch(e){}
      throw new Error('DevTools blocked');
    }
  });
  // Some consoles will evaluate objects; this triggers the getter on many consoles
  console.log('%c', img);
})();

/* Anti DevTools via dimension detection (interval) */
setInterval(function() {
  const devtools = window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 250;
  if (devtools) {
    try {
      document.documentElement.innerHTML = "<div style='display:flex;align-items:center;justify-content:center;height:100vh;background:#111;color:#ff5555;font-size:22px'>⛔ Inspeção detectada — acesso bloqueado.</div>";
    } catch(e){}
  }
}, 600);

/* Anti-iframe: bust out if embedded */
if (window.top !== window.self) {
  try { window.top.location = window.self.location; } catch (e) { /* ignore */ }
}

/* Make images non-draggable and remove pointer events (already in CSS but double ensure) */
$$('img').forEach(img => { try { img.draggable = false; img.style.pointerEvents = 'none'; } catch(e){} });

/* Final non-intrusive fallback protection: clear selection if user tries to select */
document.addEventListener('mouseup', () => { window.getSelection()?.removeAllRanges?.(); });

/* End of script.js */