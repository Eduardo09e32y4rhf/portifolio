// --- JAVASCRIPT (script.js) - FUNCIONALIDADES DINÂMICAS ---

// 1. Contador Dinâmico para a Seção Stats (Contagem Imediata)
// -----------------------------------------------------------------------
const counters = document.querySelectorAll('.counter');
const speed = 20; 
const resetDelay = 5000; 

const updateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    let current = +counter.innerText;
    
    const increment = Math.ceil(target / speed);

    if (current < target) {
        current += increment;
        
        if (current > target) {
            current = target;
        }
        
        counter.innerText = current;
        
        setTimeout(() => updateCounter(counter), 1);
        
    } else {
        counter.innerText = target;
        
        // Reinicia a contagem após 'resetDelay'
        setTimeout(() => {
            counter.innerText = 0; 
            updateCounter(counter); 
        }, resetDelay);
    }
};

// Inicia a contagem imediatamente
window.addEventListener('load', () => {
    counters.forEach(counter => {
        counter.innerText = 0; 
        updateCounter(counter);
    });
});


// 2. Pausa de Carrossel Animado em Interação
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
