document.addEventListener('DOMContentLoaded', () => {

  // ===================================
  // I. MENU HAMBURGUER
  // ===================================
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

  // Event Listeners
  if(navToggle) navToggle.addEventListener('click', ()=> navMenu.classList.contains('show-menu') ? closeMenu() : openMenu());
  if(navClose) navClose.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav__link').forEach(link=> link.addEventListener('click', closeMenu));


  // ===================================
  // II. CARROSSEL CLIENTES + SERVIÇOS (LÓGICA CORRIGIDA)
  // ===================================
  const carousel = document.getElementById('cs-carousel');
  const interval = 5000;
  let slideIndex = 0;
  
  let slides = Array.from(carousel.children);
  const totalOriginalSlides = slides.length; // Conta os slides originais (4)

  // CLONE para loop infinito apenas desktop (após 800px)
  if(window.innerWidth > 800){
    // Clona todos os slides ORIGINAIS e anexa
    Array.from(carousel.children).forEach(slide => carousel.appendChild(slide.cloneNode(true)));
    // ATUALIZA a variável slides para incluir os clones
    slides = Array.from(carousel.children);
  }

  const showSlide = (index) => {
    const firstSlide = slides[0];
    if (!firstSlide) return; 

    // Calcula a largura do card + gap (mais robusto)
    const cardWidth = firstSlide.getBoundingClientRect().width + 
                      parseFloat(getComputedStyle(carousel).gap || 0); 
                      
    carousel.style.transform = `translateX(-${index * cardWidth}px)`;
    carousel.style.transition = 'transform 0.7s ease';
  }

  const autoAdvance = ()=> {
    slideIndex++;
    // Checa se atingiu o fim dos slides originais para reiniciar (loop infinito)
    if(slideIndex >= totalOriginalSlides){ 
      showSlide(slideIndex);
      // Volta para o início (índice 0) após a transição terminar (700ms)
      setTimeout(()=> {
        carousel.style.transition = 'none'; // Desabilita a transição para o "teletransporte"
        carousel.style.transform = 'translateX(0)';
        slideIndex = 0;
      },750);
    } else {
      showSlide(slideIndex);
    }
  }

  let autoplay = setInterval(autoAdvance, interval);

  // Pausa/Continua o Autoplay no Hover
  carousel.addEventListener('mouseenter', ()=> clearInterval(autoplay));
  carousel.addEventListener('mouseleave', ()=> {
    autoplay = setInterval(autoAdvance, interval);
  });


  // ===================================
  // III. COOKIES
  // ===================================
  const cookieConsent = document.getElementById('cookie-consent');
  const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
  const cookieName = 'gslimp_cookies_accepted';

  if(!localStorage.getItem(cookieName)) setTimeout(()=> cookieConsent.classList.add('show'), 900);
  if(cookieAcceptBtn) cookieAcceptBtn.addEventListener('click', ()=>{
    localStorage.setItem(cookieName,'true');
    cookieConsent.classList.remove('show');
  });

});
