// --- JAVASCRIPT (script.js) - APENAS FUNCIONALIDADES ESSENCIAIS ---

// 1. Pausa de Carrossel Animado em Interação
// ------------------------------------------

// Pausa a animação do carrossel ao tocar ou passar o mouse
const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach(container => {
    const track = container.querySelector('.carousel-track');
    
    // Para desktop
    container.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    container.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
    
    // Para mobile
    container.addEventListener('touchstart', () => {
        track.style.animationPlayState = 'paused';
    });
    container.addEventListener('touchend', () => {
        // Resume a animação após um breve atraso
        setTimeout(() => {
            track.style.animationPlayState = 'running';
        }, 1000); 
    });
});
