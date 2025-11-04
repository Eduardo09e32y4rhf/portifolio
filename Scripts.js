// --- JAVASCRIPT (script.js) - CÓDIGO COMPLETO ---

// 1. Contador Dinâmico para a Seção Stats (Contagem Infinita)
// -----------------------------------------------------------------------

const counters = document.querySelectorAll('.counter');
const speed = 20; // Define o "passo" do incremento (maior = mais lento)
const resetDelay = 5000; // Tempo em milissegundos (5 segundos) antes de reiniciar a contagem

// Função que inicia e executa a contagem
const updateCounter = (counter) => {
    // Pega o valor final a partir do atributo data-target no HTML
    const target = +counter.getAttribute('data-target');
    // Pega o valor atual do texto
    let current = +counter.innerText;
    
    // Calcula o incremento. Garante que o contador suba rápido
    const increment = Math.ceil(target / speed);

    if (current < target) {
        // Se ainda não alcançou o alvo
        current += increment;
        
        // Evita que o número salte o alvo no final da contagem
        if (current > target) {
            current = target;
        }
        
        // Atualiza o texto
        counter.innerText = current;
        
        // Chama a função novamente após 1ms, criando o efeito rápido
        setTimeout(() => updateCounter(counter), 1);
        
    } else {
        // Se o valor alcançou o alvo, define o valor final exato
        counter.innerText = target;
        
        // Configura o reinício (Contagem "infinita")
        setTimeout(() => {
            counter.innerText = 0; // Reseta o contador para 0
            updateCounter(counter); // Inicia a contagem novamente
        }, resetDelay);
    }
};

// Inicia a contagem para todos os elementos .counter
counters.forEach(counter => {
    updateCounter(counter);
});

// 2. Outras funcionalidades
// -----------------------------------------------------------------------------------------
// Adicione outras funções JS (ex: galeria interativa, menu mobile) aqui
