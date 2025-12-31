// Helpers
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => [...el.querySelectorAll(s)];

function setYear() {
  const y = new Date().getFullYear();
  const el = qs("#year");
  if (el) el.textContent = String(y);
}

function setPhoneTime() {
  const el = qs("#phoneTime");
  if (!el) return;

  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  el.textContent = `${hh}:${mm}`;
}

// Drawer
function initDrawer() {
  const btn = qs("#menuBtn");
  const drawer = qs("#drawer");
  const close = qs("#closeDrawer");

  if (!btn || !drawer || !close) return;

  const open = () => {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const hide = () => {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  btn.addEventListener("click", open);
  close.addEventListener("click", hide);
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) hide();
  });

  qsa("[data-close]", drawer).forEach(a => a.addEventListener("click", hide));
}

// Modals
function initModals() {
  const openBtns = qsa("[data-modal]");
  const closeBtns = qsa("[data-close]");

  const openModal = (id) => {
    const modal = qs(`#${id}`);
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = (modal) => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openBtns.forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.modal));
  });

  closeBtns.forEach(btn => {
    const modal = btn.closest(".modal");
    if (!modal) return;
    btn.addEventListener("click", () => closeModal(modal));
  });

  qsa(".modal").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const modal = qs(".modal.open");
    if (modal) closeModal(modal);
  });
}

// Swiper
function initSwiper() {
  const el = qs(".projects-swiper");
  if (!el || typeof Swiper === "undefined") return;

  const swiper = new Swiper(el, {
    slidesPerView: 1,
    spaceBetween: 16,
    centeredSlides: false,
    loop: false,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  });

  const prev = qs("#prevBtn");
  const next = qs("#nextBtn");
  if (prev) prev.addEventListener("click", () => swiper.slidePrev());
  if (next) next.addEventListener("click", () => swiper.slideNext());
}

setYear();
setPhoneTime();
setInterval(setPhoneTime, 15000);

initDrawer();
initModals();
initSwiper();