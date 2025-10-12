/* scripts.js
   Funcionalidades:
   - Menu "sanduíche" mobile (toggle acessível)
   - Carrossel de depoimentos com autoplay, controles e pausa no hover
   - Insert ano no rodapé
*/

document.addEventListener('DOMContentLoaded', function () {
  // NAV MENU (sandwich) - mobile
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');

  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (open) menu.classList.add('mobile-open');
    else menu.classList.remove('mobile-open');
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    setMenu(!isOpen);
  });

  // Close menu when a link is clicked (mobile)
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setMenu(false));
  });

  // Close menu on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  // FOOTER YEAR
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* TESTIMONIALS CAROUSEL */
  const track = document.getElementById('testimonialsTrack');
  const items = Array.from(track.querySelectorAll('.testimonial'));
  const prevBtn = document.getElementById('prevTest');
  const nextBtn = document.getElementById('nextTest');

  // duplicate to make infinite feel smoother: clone first and last
  if (items.length > 0) {
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.firstChild);
  }

  let index = 1; // start after the prepended clone
  let itemWidth = items[0] ? items[0].getBoundingClientRect().width + 14 : 340; // include gap
  function updateWidths() {
    const firstItem = track.querySelector('.testimonial');
    itemWidth = firstItem ? firstItem.getBoundingClientRect().width + 14 : 340;
    moveToIndex(index, false);
  }

  window.addEventListener('resize', updateWidths);

  function moveToIndex(i, animate = true) {
    if (!track) return;
    if (!animate) track.style.transition = 'none';
    else track.style.transition = 'transform .6s cubic-bezier(.2,.9,.3,1)';

    const x = - (i * itemWidth);
    track.style.transform = `translateX(${x}px)`;
    if (!animate) requestAnimationFrame(() => track.style.transition = 'transform .6s cubic-bezier(.2,.9,.3,1)');
  }

  // initial layout after DOM paints
  setTimeout(() => {
    updateWidths();
  }, 50);

  function next() {
    if (index >= track.children.length - 1) return;
    index++;
    moveToIndex(index, true);
  }
  function prev() {
    if (index <= 0) return;
    index--;
    moveToIndex(index, true);
  }

  nextBtn.addEventListener('click', () => {
    next();
    resetAutoplay();
  });
  prevBtn.addEventListener('click', () => {
    prev();
    resetAutoplay();
  });

  // when transition ends: handle clones wrap-around
  track.addEventListener('transitionend', () => {
    // if at last clone (end), jump to real first
    if (track.children[index].classList.contains('testimonial') && index === track.children.length - 1) {
      index = 1;
      moveToIndex(index, false);
    }
    // if at first clone, jump to real last
    if (index === 0) {
      index = track.children.length - 2;
      moveToIndex(index, false);
    }
  });

  // Autoplay
  let autoplay = true;
  let autoplayInterval = 4200;
  let autoplayId = null;

  function startAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
    autoplayId = setInterval(() => {
      next();
    }, autoplayInterval);
  }

  function stopAutoplay() {
    if (autoplayId) { clearInterval(autoplayId); autoplayId = null; }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pause on hover/focus
  const testimonialsWrap = document.getElementById('testimonialsWrap');
  if (testimonialsWrap) {
    testimonialsWrap.addEventListener('mouseenter', stopAutoplay);
    testimonialsWrap.addEventListener('mouseleave', startAutoplay);
    testimonialsWrap.addEventListener('focusin', stopAutoplay);
    testimonialsWrap.addEventListener('focusout', startAutoplay);
  }

  startAutoplay();

  // improve initial visibility: ensure nav menu closed
  setMenu(false);
});
