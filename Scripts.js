document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica 1: Pausa de Carrossel Animado em Interação (EXISTENTE) ---
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        
        const pauseAnimation = () => {
            if (track) track.style.animationPlayState = 'paused';
        };
        const resumeAnimation = () => {
            if (track) track.style.animationPlayState = 'running';
        };
        
        // Para desktop
        container.addEventListener('mouseenter', pauseAnimation);
        container.addEventListener('mouseleave', resumeAnimation);
        
        // Para mobile
        container.addEventListener('touchstart', pauseAnimation);
        container.addEventListener('touchend', () => {
            // Resume a animação após um breve atraso
            setTimeout(resumeAnimation, 1000); 
        });
    });


    // --- Lógica 2: Botão Curtir (NOVO) ---
    const likeButtons = document.querySelectorAll('.btn-curtir');

    likeButtons.forEach(button => {
        const itemId = button.getAttribute('data-id');
        const likesSpan = document.getElementById(`likes-${itemId}`);
        
        // Inicializa o contador (se não estiver no localStorage, usa o valor do HTML)
        let currentLikes = parseInt(localStorage.getItem(`likes-${itemId}`)) || parseInt(likesSpan.textContent);
        likesSpan.textContent = currentLikes;
        
        let isLiked = localStorage.getItem(`liked-${itemId}`) === 'true';

        // Atualiza o estado visual inicial do botão
        if (isLiked) {
            button.classList.add('curtido');
            button.querySelector('i').classList.replace('far', 'fas'); // Ícone preenchido
        }

        button.addEventListener('click', () => {
            if (isLiked) {
                // Descurtir
                currentLikes -= 1;
                button.classList.remove('curtido');
                button.querySelector('i').classList.replace('fas', 'far');
                isLiked = false;
            } else {
                // Curtir
                currentLikes += 1;
                button.classList.add('curtido');
                button.querySelector('i').classList.replace('far', 'fas');
                isLiked = true;
            }
            
            // Salva e atualiza o contador na tela
            localStorage.setItem(`liked-${itemId}`, isLiked);
            localStorage.setItem(`likes-${itemId}`, currentLikes);
            likesSpan.textContent = currentLikes;
        });
    });


    // --- Lógica 3: Calculadora de Orçamento Rápido (NOVO) ---
    const selectEstofado = document.getElementById('tipoEstofado');
    const valorEstimadoSpan = document.getElementById('valorEstimado');

    const PRECO_BASE = 0;
    const SIMBOLO_MOEDA = 'R$ ';

    function calcularOrcamento() {
        // Pega o valor (que representa o preço) do option selecionado
        const precoUnitario = parseFloat(selectEstofado.value) || PRECO_BASE;
        
        // Formata e exibe o preço
        const valorFormatado = precoUnitario.toFixed(2).replace('.', ',');
        valorEstimadoSpan.textContent = SIMBOLO_MOEDA + valorFormatado;
    }

    // Evento para recalcular o orçamento ao mudar a seleção
    selectEstofado.addEventListener('change', calcularOrcamento);

    // Garante que o valor inicial seja exibido
    calcularOrcamento();
});


// Função para gerar o link do WhatsApp (DEVE SER GLOBAL)
function gerarLinkZap() {
    const select = document.getElementById('tipoEstofado');
    const estofado = select.options[select.selectedIndex].text;
    const valorEstimado = document.getElementById('valorEstimado').textContent;
    const precoSelecionado = parseFloat(select.value);

    let mensagemPadrao = `Olá Gslimp! Gostaria de um orçamento final para ${estofado}.`;
    
    if (precoSelecionado > 0) {
         mensagemPadrao += ` (Vi a estimativa de ${valorEstimado} no site).`;
    } else {
        mensagemPadrao = `Olá Gslimp! Gostaria de um orçamento para limpeza de estofado.`;
    }
    
    const numeroTelefone = '5582991522179'; // Use o número do seu CTA (82991522179)
    const encodedMessage = encodeURIComponent(mensagemPadrao);
    const linkZap = `https://wa.me/${numeroTelefone}?text=${encodedMessage}`;

    window.open(linkZap, '_blank');
}
