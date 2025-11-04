// --- 1. Lógica do Comparador Antes/Depois ---
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.before-after-slider .slider');
    const afterImg = document.querySelector('.before-after-slider .after-img');
    const sliderBar = document.querySelector('.before-after-slider .slider-bar');

    if (slider && afterImg && sliderBar) {
        // Função para atualizar a posição do slider e o corte da imagem
        function updateSlider(value) {
            // Atualiza a largura da imagem 'Depois' (corte)
            afterImg.style.width = value + '%';
            // Atualiza a posição da barra deslizante
            sliderBar.style.left = value + '%';
        }

        // Evento de entrada (arrastar ou clicar)
        slider.addEventListener('input', (e) => {
            updateSlider(e.target.value);
        });

        // Configura o valor inicial (50%)
        updateSlider(slider.value);
    }
});


// --- 2. Lógica do Botão Curtir ---
document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.btn-curtir');

    likeButtons.forEach(button => {
        const itemId = button.getAttribute('data-id');
        const likesSpan = document.getElementById(`likes-${itemId}`);
        let currentLikes = parseInt(likesSpan.textContent);
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
                localStorage.setItem(`liked-${itemId}`, 'false');
            } else {
                // Curtir
                currentLikes += 1;
                button.classList.add('curtido');
                button.querySelector('i').classList.replace('far', 'fas');
                isLiked = true;
                localStorage.setItem(`liked-${itemId}`, 'true');
            }
            // Atualiza o contador na tela
            likesSpan.textContent = currentLikes;
        });
    });
});


// --- 3. Lógica da Calculadora de Orçamento Rápido ---
document.addEventListener('DOMContentLoaded', () => {
    const selectEstofado = document.getElementById('tipoEstofado');
    const valorEstimadoSpan = document.getElementById('valorEstimado');

    // Mapeamento de preços por tipo de estofado (mantido no HTML para simplicidade)
    const PRECO_BASE = 0; // Preço inicial
    const SIMBOLO_MOEDA = 'R$ ';

    function calcularOrcamento() {
        const precoUnitario = parseFloat(selectEstofado.value) || PRECO_BASE;
        
        // Simplesmente mostra o preço base do item selecionado
        const valorFormatado = precoUnitario.toFixed(2).replace('.', ',');
        valorEstimadoSpan.textContent = SIMBOLO_MOEDA + valorFormatado;
    }

    // Evento para recalcular o orçamento ao mudar a seleção
    selectEstofado.addEventListener('change', calcularOrcamento);

    // Garante que o valor inicial seja exibido
    calcularOrcamento();
});

// Lógica para gerar o link do WhatsApp
function gerarLinkZap() {
    const select = document.getElementById('tipoEstofado');
    const estofado = select.options[select.selectedIndex].text;
    const valorEstimado = document.getElementById('valorEstimado').textContent;

    let mensagemPadrao = `Olá! Gostaria de um orçamento final para: ${estofado}.`;
    
    if (parseFloat(select.value) > 0) {
         mensagemPadrao += ` (Valor Estimado no site: ${valorEstimado}).`;
    } else {
        mensagemPadrao = `Olá! Gostaria de um orçamento para limpeza de estofado.`;
    }
    
    const numeroTelefone = '5511999999999'; // Substitua pelo seu número de WhatsApp
    const encodedMessage = encodeURIComponent(mensagemPadrao);
    const linkZap = `https://wa.me/${numeroTelefone}?text=${encodedMessage}`;

    window.open(linkZap, '_blank');
}
