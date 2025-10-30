    // ==================== FUNCIONALIDADE LGPD/COOKIES (CORREÇÃO PARA APARECER SEMPRE) ====================
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
    // REMOVEMOS: const cookieName = 'gslimp_cookies_accepted'; 
    
    /**
     * Mostra a barra de cookies SEMPRE, ignorando o localStorage.
     */
    function checkCookieConsent() {
        // Apenas mostra o banner
        cookieConsent.style.display = 'block';
        cookieConsent.style.opacity = 1;

        // Adiciona a classe 'show' após um pequeno atraso
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 100); 
    }

    /**
     * Esconde a barra após o clique
     */
    if (cookieAcceptBtn) {
        cookieAcceptBtn.addEventListener('click', () => {
            // REMOVEMOS: localStorage.setItem(cookieName, 'true');
            
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
