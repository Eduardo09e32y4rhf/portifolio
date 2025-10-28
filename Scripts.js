// MENU HAMBÚRGUER
const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// FECHAR MENU AO CLICAR EM LINK
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('active');
  });
});

// CARROSSEL SIMPLES PARA MOBILE
const testimonials = document.querySelector('.testimonials-carousel');
let isDown = false;
let startX;
let scrollLeft;

testimonials.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX - testimonials.offsetLeft;
  scrollLeft = testimonials.scrollLeft;
});
testimonials.addEventListener('mouseleave', () => (isDown = false));
testimonials.addEventListener('mouseup', () => (isDown = false));
testimonials.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - testimonials.offsetLeft;
  const walk = (x - startX) * 2;
  testimonials.scrollLeft = scrollLeft - walk;
});