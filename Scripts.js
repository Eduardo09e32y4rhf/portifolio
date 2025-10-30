
// --- Conteúdo do arquivo script.js ---
document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== FUNCIONALIDADE DO MENU HAMBURGUER (MOBILE) ====================
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        // Correção 2: Garante o funcionamento do hambúrguer
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            navToggle.classList.toggle('is-active'); 
            // Controla a rolagem do corpo quando o menu está aberto
            document.body.classList.toggle('no-scroll');
        });
    }

    // Fecha o menu ao clicar em qualquer link
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

    // ==================== FUNCIONALIDADE LGPD/COOKIES (Aparece toda vez) ====================
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
    
    function checkCookieConsent() {
        // Item 4: O cookie deve aparecer sempre (ignora localStorage)
        cookieConsent.style.display = 'block';
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 100); 
    }

    if (cookieAcceptBtn) {
        cookieAcceptBtn.addEventListener('click', () => {
            cookieConsent.classList.remove('show');
            setTimeout(() => {
                 cookieConsent.style.display = 'none';
            }, 300);
        });
    }

    // Executa a verificação ao carregar a página
    checkCookieConsent();


    // ==================== CARROSSEL INFINITO (Itens 3 e 5: Adiciona Duplicação para o loop CSS) ====================
    
    function setupInfiniteCarousel(trackSelector) {
        const track = document.querySelector(trackSelector);
        if (!track) return;

        // Clona os primeiros 5 itens (ou o número de itens visíveis + 1 ou 2) para criar o loop
        const items = Array.from(track.children);
        
        // Clona e adiciona os itens no final. Usaremos 5 clones por segurança.
        items.slice(0, 5).forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
        
        // NOTA: A animação de rolagem (automática) é feita via CSS (@keyframes)
    }

    // Aplica a lógica de duplicação para os dois carrosséis
    setupInfiniteCarousel('.services__carousel-track');
    setupInfiniteCarousel('.testimonials__carousel-track');

});
