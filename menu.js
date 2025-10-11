// Menu mobile toggle
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
menuToggle.addEventListener("click", () => { menu.classList.toggle("active"); });

// Fechar menu ao clicar em um link
document.querySelectorAll("#menu li a").forEach(link => {
  link.addEventListener("click", () => { menu.classList.remove("active"); });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) { nav.style.background = 'rgba(0,0,0,0.95)'; }
  else { nav.style.background = 'rgba(0,0,0,0.9)'; }
});

// ScrollReveal animations
ScrollReveal().reveal('section h2', { delay: 200, distance: '40px', origin: 'top', duration: 1000 });
ScrollReveal().reveal('.services .service', { interval: 200, distance: '40px', origin: 'bottom', duration: 1000 });
ScrollReveal().reveal('.team .member', { interval: 200, distance: '40px', origin: 'left', duration: 1000 });
ScrollReveal().reveal('.contact', { delay: 300, distance: '50px', origin: 'bottom', duration: 1000 });

// Depoimentos - carrossel automático
const slideContainer = document.querySelector('.testimonial-slide');
const slides = document.querySelectorAll('.testimonial');
let index = 0;
function showNextSlide() {
  index++;
  if (index >= slides.length) index = 0;
  slideContainer.style.transform = `translateX(-${index * 100}%)`;
}
setInterval(showNextSlide, 4000);
