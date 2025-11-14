document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica 1: Carrossel Automático + Pausa em Interação (AJUSTADO) --- 
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        
        const pauseAnimation = () => {
            if (track) {
                // Pausa a rolagem automática via CSS Animation
                track.style.animationPlayState = 'paused';
            }
        };
        
        const resumeAnimation = () => {
            if (track) {
                // Retoma a rolagem automática via CSS Animation
                track.style.animationPlayState = 'running';
            }
        };

        // Pausa quando o mouse entra (Desktop)
        container.addEventListener('mouseenter', pauseAnimation);
        
        // Retoma quando o mouse sai (Desktop)
        container.addEventListener('mouseleave', resumeAnimation);
        
        // Pausa quando o toque começa (Mobile/Manual start)
        container.addEventListener('touchstart', pauseAnimation);
        
        // Retoma 1 segundo após o toque terminar (Mobile/Manual end)
        container.addEventListener('touchend', () => {
            setTimeout(resumeAnimation, 1000); 
        });

        // O CSS foi modificado para adicionar scroll-snap para rolagem manual suave.
    });

    // --- BLOQUEIO 4: Bloqueia a cópia pelo teclado (MANTIDO) --- 
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) { // Ctrl ou Cmd
            if (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J' || e.key === 's' || e.key === 'S') {
                e.preventDefault();
                return false;
            }
        }
    }); 
});
