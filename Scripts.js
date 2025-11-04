// --- JAVASCRIPT (script.js) - CÓDIGO FINAL CORRIGIDO ---

// 1. Contador Dinâmico para a Seção Stats (Contagem Imediata e Infinita)
// -----------------------------------------------------------------------

const counters = document.querySelectorAll('.counter');
const speed = 20; // A "velocidade" (maior = mais lento)
const resetDelay = 5000; // Tempo em milissegundos (5 segundos) antes de reiniciar a contagem

// Função que inicia e executa a contagem
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
        
        // Mantém a chamada recursiva rápida
        setTimeout(() => updateCounter(counter), 1);
        
    } else {
        counter.innerText = target;
        
        // Reinicia a contagem após 'resetDelay'
        setTimeout(() => {
            counter.innerText = 0; // Reseta o contador para 0
            updateCounter(counter); // Inicia a contagem novamente
        }, resetDelay);
    }
};

// **CORREÇÃO: Inicia a contagem imediatamente no carregamento da página**
// Isso resolve o problema de o contador ficar parado em 0%.
window.addEventListener('load', () => {
    counters.forEach(counter => {
        // Garante que todos comecem em 0
        counter.innerText = 0; 
        updateCounter(counter);
    });
});


// 2. Outras funcionalidades (Galeria Antes/Depois)
// -----------------------------------------------------------------------------------------

// JS para o efeito "antes/depois" ao passar o mouse/tocar (melhoria de UX)
document.querySelectorAll('.foto-card.before-after-effect').forEach(card => {
    const afterImage = card.querySelector('.after-image');
    const labelAntes = card.querySelector('.label-antes');
    const labelDepois = card.querySelector('.label-depois');

    const handleEnter = () => {
        afterImage.style.opacity = '1';
        labelAntes.style.opacity = '0';
        labelDepois.style.opacity = '1';
    };

    const handleLeave = () => {
        afterImage.style.opacity = '0';
        labelAntes.style.opacity = '1';
        labelDepois.style.opacity = '0';
    };

    // Para desktop
    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);
    
    // Para mobile (efeito de toque - touchstart/touchend)
    card.addEventListener('touchstart', handleEnter);
    card.addEventListener('touchend', handleLeave);
});
