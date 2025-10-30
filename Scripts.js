document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== FUNCIONALIDADE DO MENU HAMBURGUER (MOBILE) ====================
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        // CORREÇÃO: A classe 'is-active' será adicionada/removida no toggle para a transição CSS
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            navToggle.classList.toggle('is-active'); 
        });
    }

    // Fecha o menu ao clicar em qualquer link (para navegação suave)
    navLinks.forEach(link => link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        if (navToggle) {
            navToggle.classList.remove('is-active'); // Garante que o ícone volte para o hambúrguer
        }
    }));

    // ==================== EFEITO DO HEADER AO ROLAR (Scroll Header) ====================
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) { 
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==================== FUNCIONALIDADE LGPD/COOKIES ====================
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
    const cookieName = 'gslimp_cookies_accepted'; 

    /**
     * Verifica se o usuário já aceitou os cookies
     */
    function checkCookieConsent() {
        if (!localStorage.getItem(cookieName)) {
            // Mostra a barra após um pequeno atraso
            setTimeout(() => {
                cookieConsent.classList.add('show');
            }, 1000); 
        }
    }

    /**
     * Salva a aceitação do usuário e esconde a barra
     */
    if (cookieAcceptBtn) {
        cookieAcceptBtn.addEventListener('click', () => {
            // 1. Salva a aceitação
            localStorage.setItem(cookieName, 'true');
            
            // 2. Esconde a barra com efeito
            cookieConsent.classList.remove('show');
            cookieConsent.style.opacity = 0;
            setTimeout(() => {
                 cookieConsent.style.display = 'none';
            }, 300);
        });
    }

    // Executa a verificação ao carregar a página
    checkCookieConsent();
});