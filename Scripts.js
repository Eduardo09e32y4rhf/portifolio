
// --- JAVASCRIPT (script.js) - CÓDIGO FINAL CORRIGIDO E OTIMIZADO ---

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
        
        // Reinicia a contagem após 'resetDelay' para o efeito "dinâmico"
        setTimeout(() => {
            counter.innerText = 0; 
            updateCounter(counter); 
        }, resetDelay);
    }
};

// Inicia a contagem imediatamente após o carregamento da página
window.addEventListener('load', () => {
    counters.forEach(counter => {
        counter.innerText = 0; 
        updateCounter(counter);
    });
});


// 2. Outras funcionalidades (Galeria Antes/Depois e Carrossel)
// -----------------------------------------------------------------------------------------

// Efeito "antes/depois" ao passar o mouse/tocar (mantido)
document.querySelectorAll('.foto-card.before-after-effect').forEach(card => {
    const afterImage = card.querySelector('.after-image');
    const labelAntes = card.querySelector('.label-antes');
    const labelDepois = card.querySelector('.label-depois');

    const handleEnter = () => {
        if (!afterImage || !labelAntes || !labelDepois) return;
        afterImage.style.opacity = '1';
        labelAntes.style.opacity = '0';
        labelDepois.style.opacity = '1';
    };

    const handleLeave = () => {
        if (!afterImage || !labelAntes || !labelDepois) return;
        afterImage.style.opacity = '0';
        labelAntes.style.opacity = '1';
        labelDepois.style.opacity = '0';
    };

    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);
    
    // Adiciona o toggle para mobile/touch
    card.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        if(card.classList.contains('active-touch')) {
            handleLeave();
            card.classList.remove('active-touch');
        } else {
            handleEnter();
            card.classList.add('active-touch');
        }
    });
});


// 3. Pausa de Carrossel Animado em Interação
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
