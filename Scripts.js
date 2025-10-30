// --- Conteúdo do arquivo script.js ---
document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== FUNCIONALIDADE DO MENU HAMBURGUER (MOBILE) ====================
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        // CORREÇÃO 1: Menu Hambúrguer
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            navToggle.classList.toggle('is-active'); 
            // Controla a rolagem do corpo quando o menu está aberto
            document.body.classList.toggle('no-scroll');
        });
    }

    // Fecha o menu ao clicar em qualquer link (para navegação suave)
    navLinks.forEach(link => link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        if (navToggle) {
            navToggle.classList.remove('is-active'); 
        }
        document.body.classList.remove('no-scroll');
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

    // ==================== FUNCIONALIDADE LGPD/COOKIES (CORREÇÃO PARA APARECER SEMPRE) ====================
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
    // REMOVIDA: A lógica de 'localStorage' para que apareça em TODA atualização (Regra 4).
    
    /**
     * Mostra a barra de cookies SEMPRE.
     */
    function checkCookieConsent() {
        // Garante que o display seja 'block' (definido como 'none' no CSS para controle inicial)
        cookieConsent.style.display = 'block';

        // Adiciona a classe 'show' após um pequeno atraso para iniciar a transição
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 100); 
    }

    /**
     * Esconde a barra após o clique, mas NÃO salva no localStorage
     */
    if (cookieAcceptBtn) {
        cookieAcceptBtn.addEventListener('click', () => {
            
            // Esconde a barra com efeito
            cookieConsent.classList.remove('show');
            cookieConsent.style.opacity = 0;
            setTimeout(() => {
                 cookieConsent.style.display = 'none';
            }, 300);
        });
    }

    // Executa a verificação ao carregar a página
    checkCookieConsent();


    // ==================== CARROSSEL INFINITO (Duplicação para o loop CSS) ====================
    
    function setupInfiniteCarousel(trackSelector) {
        const track = document.querySelector(trackSelector);
        if (!track) return;

        // Clona e adiciona os 5 primeiros itens para o efeito infinito
        const itemsToClone = Array.from(track.children).slice(0, 5); 
        
        itemsToClone.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
        
        // A animação de rolagem é feita via CSS (@keyframes)
    }

    // Aplica a lógica de duplicação para os dois carrosséis (Correção 2 e 3)
    setupInfiniteCarousel('.services__carousel-track');
    setupInfiniteCarousel('.testimonials__carousel-track');

});
