// script.js
document.addEventListener('DOMContentLoaded', () => {
  // MENU HAMBURGUER LATERAL
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navClose = document.getElementById('nav-close');

  function openMenu(){
    navMenu.classList.add('show-menu');
    navToggle.classList.add('is-active');
    navToggle.setAttribute('aria-expanded','true');
  }
  function closeMenu(){
    navMenu.classList.remove('show-menu');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded','false');
  }

  if(navToggle){
    navToggle.addEventListener('click', () => {
      if(navMenu.classList.contains('show-menu')) closeMenu();
      else openMenu();
    });
  }
  if(navClose) navClose.addEventListener('click', closeMenu);

  // Fecha o menu ao clicar em link
  document.querySelectorAll('.nav__link').forEach(link=> link.addEventListener('click', closeMenu));

  // ================= CARROSSEL CLIENTES+SERVIÇOS (AUTO 5s LOOP SUAVE) =================
  const carousel = document.getElementById('cs-carousel');
  let slideIndex = 0;
  const slides = Array.from(carousel.children);
  const total = slides.length;
  const interval = 5000; // 5s

  // função para mover o carrossel para o índice
  function showSlide(i){
    // calcula deslocamento para que o slide i fique visível (suporta 48% width)
    const cardWidth = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(carousel).gap || 12);
    carousel.style.transform = `translateX(-${i * (cardWidth)}px)`;
    carousel.style.transition = 'transform 0.7s ease';
  }

  // loop infinito: clone slides no final quando necessário
  function setupInfinite(){
    // para mobile não duplicamos aqui (CSS mostra 1 por vez)
    // duplicamos todo o conjunto para efeito infinito em desktop
    const cloneFragment = document.createDocumentFragment();
    slides.forEach(node => cloneFragment.appendChild(node.cloneNode(true)));
    carousel.appendChild(cloneFragment);
  }

  setupInfinite();

  // autoplay
  let autoplay = setInterval(() => {
    slideIndex++;
    // quando passar da metade (original length) volta pro 0 sem animação
    if(slideIndex >= total){
      // anima para a posição do clone correspondente
      showSlide(slideIndex);
      // após anima finalizar, reset sem transição
      setTimeout(()=>{
        carousel.style.transition = 'none';
        carousel.style.transform = 'translateX(0)';
        slideIndex = 0;
      }, 750);
    } else {
      showSlide(slideIndex);
    }
  }, interval);

  // pausa autoplay quando o mouse estiver sobre o carrossel (útil em desktop)
  carousel.addEventListener('mouseenter', ()=> clearInterval(autoplay));
  carousel.addEventListener('mouseleave', ()=> {
    autoplay = setInterval(()=>{
      slideIndex++;
      if(slideIndex >= total){
        showSlide(slideIndex);
        setTimeout(()=>{carousel.style.transition = 'none';carousel.style.transform = 'translateX(0)';slideIndex = 0;},750);
      } else showSlide(slideIndex);
    }, interval);
  });

  // ================= LGPD COOKIES (mantive lógica simples) =================
  const cookieConsent = document.getElementById('cookie-consent');
  const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
  const cookieName = 'gslimp_cookies_accepted';

  function checkCookieConsent(){
    if(!localStorage.getItem(cookieName)){
      setTimeout(()=> cookieConsent.classList.add('show'), 900);
    }
  }
  if(cookieAcceptBtn) cookieAcceptBtn.addEventListener('click', ()=>{
    localStorage.setItem(cookieName, 'true');
    cookieConsent.classList.remove('show');
  });
  checkCookieConsent();

});