// Menu hambúrguer responsivo
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.querySelector("ul").classList.toggle("active");
  menuToggle.classList.toggle("open");
});

// Carrossel de depoimentos suave (mobile-friendly)
const testimonials = document.querySelector(".testimonials-carousel");
let isDown = false;
let startX;
let scrollLeft;

testimonials.addEventListener("mousedown", (e) => {
  isDown = true;
  testimonials.classList.add("active");
  startX = e.pageX - testimonials.offsetLeft;
  scrollLeft = testimonials.scrollLeft;
});
testimonials.addEventListener("mouseleave", () => (isDown = false));
testimonials.addEventListener("mouseup", () => (isDown = false));
testimonials.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - testimonials.offsetLeft;
  const walk = (x - startX) * 2;
  testimonials.scrollLeft = scrollLeft - walk;
});

// Fecha o menu ao clicar em um link
document.querySelectorAll(".nav a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.querySelector("ul").classList.remove("active");
  })
);