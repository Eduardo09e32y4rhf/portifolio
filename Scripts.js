document.addEventListener('DOMContentLoaded', () => {

  // MENU HAMBURGUER
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navClose = document.getElementById('nav-close');

  const openMenu = ()=> {
    navMenu.classList.add('show-menu');
    navToggle.classList.add('is-active');
    navToggle.setAttribute('aria-expanded','true');
  }
  const closeMenu = ()=> {
    navMenu.classList.remove('show-menu');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded','false');
  }

  if(navToggle) navToggle.addEventListener('click', ()=> navMenu.classList.contains('show-menu') ? closeMenu() : openMenu());
  if(navClose) navClose.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav__link').forEach(link=> link.addEventListener('click', closeMenu));

  // CARROSSEL CLIENTES + SERVIÇOS
  const carousel = document.getElementById('cs-carousel');
  let slides = Array.from(carousel.children);
  let slideIndex = 0;
  const interval = 5000;

  // CLONE para loop infinito apenas desktop
  if(window.innerWidth > 800){
    slides.forEach(slide => carousel.appendChild(slide.cloneNode(true)));
  }

  const showSlide = (index) => {
    const cardWidth = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(carousel).gap || 12);
    carousel.style.transform = `translateX(-${index * cardWidth}px)`;
    carousel.style.transition = 'transform 0.7s ease';
  }

  let autoplay = setInterval(()=> {
    slideIndex++;
    if(slideIndex >= slides.length/2){
      showSlide(slideIndex);
      setTimeout(()=> {
        carousel.style.transition = 'none';
        carousel.style.transform = 'translateX(0)';
        slideIndex = 0;
      },750);
    } else showSlide(slideIndex);
  }, interval);

  carousel.addEventListener('mouseenter', ()=> clearInterval(autoplay));
  carousel.addEventListener('mouseleave', ()=> {
    autoplay = setInterval(()=> {
      slideIndex++;
      if(slideIndex >= slides.length/2){
        showSlide(slideIndex);
        setTimeout(()=> {
          carousel.style.transition = 'none';
          carousel.style.transform = 'translateX(0)';
          slideIndex = 0;
        },750);
      } else showSlide(slideIndex);
    }, interval);
  });

  // COOKIES
  const cookieConsent = document.getElementById('cookie-consent');
  const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
  const cookieName = 'gslimp_cookies_accepted';

  if(!localStorage.getItem(cookieName)) setTimeout(()=> cookieConsent.classList.add('show'), 900);
  if(cookieAcceptBtn) cookieAcceptBtn.addEventListener('click', ()=>{
    localStorage.setItem(cookieName,'true');
    cookieConsent.classList.remove('show');
  });

});