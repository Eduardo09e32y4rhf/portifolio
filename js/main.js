// =========================
// Helpers
// =========================
function qs(sel, el = document) { return el.querySelector(sel); }
function qsa(sel, el = document) { return [...el.querySelectorAll(sel)]; }

function lockScroll(lock) {
  document.documentElement.style.overflow = lock ? "hidden" : "";
  document.body.style.overflow = lock ? "hidden" : "";
}

// =========================
// Drawer (mobile menu)
// =========================
const drawer = qs("#drawer");
const menuBtn = qs("#menuBtn");
const closeDrawer = qs("#closeDrawer");

function openDrawer() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  menuBtn?.setAttribute("aria-expanded", "true");
  lockScroll(true);
}

function hideDrawer() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  menuBtn?.setAttribute("aria-expanded", "false");
  lockScroll(false);
}

menuBtn?.addEventListener("click", openDrawer);
closeDrawer?.addEventListener("click", hideDrawer);

drawer?.addEventListener("click", (e) => {
  if (e.target === drawer) hideDrawer();
});

qsa("[data-close]", drawer).forEach(a => {
  a.addEventListener("click", hideDrawer);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideDrawer();
    closeAllModals();
  }
});

// =========================
// Modals
// =========================
function openModal(id) {
  const m = qs(`#${id}`);
  if (!m) return;
  m.classList.add("open");
  m.setAttribute("aria-hidden", "false");
  lockScroll(true);
}

function closeModal(modalEl) {
  modalEl.classList.remove("open");
  modalEl.setAttribute("aria-hidden", "true");
  lockScroll(false);
}

function closeAllModals() {
  qsa(".modal.open").forEach(m => {
    m.classList.remove("open");
    m.setAttribute("aria-hidden", "true");
  });
  lockScroll(false);
}

qsa("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.getAttribute("data-modal")));
});

qsa(".modal").forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });

  qsa("[data-close]", modal).forEach(btn => {
    btn.addEventListener("click", () => closeModal(modal));
  });
});

// =========================
// Swiper
// =========================
const swiperEl = qs(".projects-swiper");
let swiper;

if (swiperEl) {
  swiper = new Swiper(".projects-swiper", {
    slidesPerView: 1,
    spaceBetween: 18,
    loop: true,
    speed: 550,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  });

  qs("#prevBtn")?.addEventListener("click", () => swiper.slidePrev());
  qs("#nextBtn")?.addEventListener("click", () => swiper.slideNext());
}

// =========================
// Year + phone time
// =========================
const yearEl = qs("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const phoneTime = qs("#phoneTime");
function updatePhoneTime() {
  if (!phoneTime) return;
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  phoneTime.textContent = `${hh}:${mm}`;
}
updatePhoneTime();
setInterval(updatePhoneTime, 15000);