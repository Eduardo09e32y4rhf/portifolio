document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica: Carrossel Automático + Pausa em Interação (HÍBRIDO) --- 
    // Garante que a animação automática do CSS pause quando houver interação manual.
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        
        const pauseAnimation = () => {
            if (track) {
                // Pausa a rolagem automática (CSS Animation)
                track.style.animationPlayState = 'paused';
            }
        };
        
        const resumeAnimation = () => {
            if (track) {
                // Retoma a rolagem automática (CSS Animation)
                track.style.animationPlayState = 'running';
            }
        };

        // Pausa ao interagir via Mouse (Desktop)
        container.addEventListener('mouseenter', pauseAnimation);
        container.addEventListener('mouseleave', resumeAnimation);
        
        // Pausa ao interagir via Toque/Arrasto (Mobile)
        container.addEventListener('touchstart', pauseAnimation);
        container.addEventListener('touchend', () => {
            // Retoma a animação 1 segundo após o toque ser liberado, dando tempo para o scroll-snap finalizar.
            setTimeout(resumeAnimation, 1000); 
        });
    });

    // --- BLOQUEIO: Bloqueia a cópia pelo teclado (Ctrl/Cmd + C, U, I, J, S) --- 
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) { // Ctrl ou Cmd
            if (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J' || e.key === 's' || e.key === 'S') {
                e.preventDefault();
                return false;
            }
        }
    }); 
});

// A lógica de Curtir (likes) e a função de Orçamento Rápido (gerarLinkZap) foram removidas.

