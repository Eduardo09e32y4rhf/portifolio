// --- JAVASCRIPT (script.js) - CÓDIGO COMPLETO ---

// 1. Contador Dinâmico para a Seção Stats (Contagem Infinita ao Visível)
// -----------------------------------------------------------------------

const counters = document.querySelectorAll('.counter');
const speed = 20; // Define o "passo" do incremento (maior = mais lento)
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

// Intersection Observer para iniciar a contagem quando a seção Stats estiver visível
const statsSection = document.querySelector('#stats');
let countersStarted = false; // Flag para garantir que o contador só inicie uma vez por visibilidade

const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.5 // 50% da seção visível
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            // Se a seção está visível e os contadores ainda não foram iniciados
            counters.forEach(counter => {
                // Reinicia para 0 antes de iniciar a contagem
                counter.innerText = 0; 
                updateCounter(counter);
            });
            countersStarted = true; // Define a flag como verdadeira
        } else if (!entry.isIntersecting) {
            // Se a seção não está mais visível, reseta a flag para permitir reiniciar na próxima vez
            countersStarted = false;
        }
    });
}, observerOptions);

if (statsSection) {
    observer.observe(statsSection);
}


// 2. Outras funcionalidades
// -----------------------------------------------------------------------------------------
// Exemplo de JS para o efeito "antes/depois" (se você quiser um slider)
document.querySelectorAll('.foto-card.before-after-effect').forEach(card => {
    const afterImage = card.querySelector('.after-image');
    const labelAntes = card.querySelector('.label-antes');
    const labelDepois = card.querySelector('.label-depois');

    card.addEventListener('mouseenter', () => {
        afterImage.style.opacity = '1';
        labelAntes.style.opacity = '0';
        labelDepois.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
        afterImage.style.opacity = '0';
        labelAntes.style.opacity = '1';
        labelDepois.style.opacity = '0';
    });
});

