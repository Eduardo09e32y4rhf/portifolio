document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica 1: Pausa de Carrossel Animado em Interação (MANTIDA) --- 
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        
        const pauseAnimation = () => {
            if (track) track.style.animationPlayState = 'paused';
        };
        
        const resumeAnimation = () => {
            if (track) track.style.animationPlayState = 'running';
        };

        // Desktop e Mobile
        container.addEventListener('mouseenter', pauseAnimation);
        container.addEventListener('mouseleave', resumeAnimation);
        container.addEventListener('touchstart', pauseAnimation);
        
        container.addEventListener('touchend', () => {
            // Pausa por 1 segundo após o toque ser liberado
            setTimeout(resumeAnimation, 1000); 
        });
    });

    // --- Lógica 2: Botão Curtir (REMOVIDA) ---
    // O código de likes foi totalmente removido daqui.

    // --- BLOQUEIO 4: Bloqueia a cópia pelo teclado (Ctrl/Cmd + C) (MANTIDO) --- 
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) { // Ctrl ou Cmd
            if (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J' || e.key === 's' || e.key === 'S') {
                e.preventDefault();
                return false;
            }
        }
    }); 
});

// Função para gerar o link do WhatsApp (REMOVIDA) 
// A função 'gerarLinkZap' foi removida, pois ela era usada pelo bloco de Orçamento Rápido removido.
