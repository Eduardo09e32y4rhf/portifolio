document.addEventListener('DOMContentLoaded', () => {

  // ===================================
  // I. MENU HAMBURGUER
  // ===================================
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  // Você não tinha o navClose no HTML original, mas é bom tê-lo para fechar
  const navClose = document.createElement('button');
  navClose.id = 'nav-close';
  navClose.className = 'nav__close';
  navClose.innerHTML = '✕';
  navClose.setAttribute('aria-label', 'Fechar menu');
  if(navMenu) navMenu.prepend(navClose); // Adiciona o botão de fechar ao menu

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
  if(navToggle && navMenu) {
      navToggle.addEventListener('click', ()=> navMenu.classList.contains('show-menu') ? closeMenu() : openMenu());
  }
  if(navClose) navClose.addEventListener('click', closeMenu);
  // Fecha o menu ao clicar em qualquer link de navegação
  document.querySelectorAll('.nav__link').forEach(link=> link.addEventListener('click', closeMenu));
  // Adiciona listener para fechar o menu ao clicar fora dele (apenas para mobile)
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('show-menu') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      closeMenu();
    }
  });


  // ===================================
  // II. COOKIES
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
