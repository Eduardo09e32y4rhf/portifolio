document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica 1: Pausa de Carrossel Animado em Interação ---
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        
        const pauseAnimation = () => {
            if (track) track.style.animationPlayState = 'paused';
        };
        const resumeAnimation = () => {
            if (track) track.style.animationPlayState = 'running';
        };
        
        // Desktop e Mobile
        container.addEventListener('mouseenter', pauseAnimation);
        container.addEventListener('mouseleave', resumeAnimation);
        container.addEventListener('touchstart', pauseAnimation);
        container.addEventListener('touchend', () => {
            setTimeout(resumeAnimation, 1000); 
        });
    });


    // --- Lógica 2: Botão Curtir (Com Coração Vermelho e Animação no Centro) ---
    const likeButtons = document.querySelectorAll('.btn-curtir');

    likeButtons.forEach(button => {
        const itemId = button.getAttribute('data-id');
        const likesSpan = document.getElementById(`likes-${itemId}`);
        const heartAnimationDiv = document.querySelector(`.heart-animation[data-id="${itemId}"]`); // Pega o div de animação
        
        let currentLikes = parseInt(localStorage.getItem(`likes-${itemId}`)) || parseInt(likesSpan.textContent);
        likesSpan.textContent = currentLikes;
        
        let isLiked = localStorage.getItem(`liked-${itemId}`) === 'true';

        // Estado inicial
        if (isLiked) {
            button.classList.add('curtido');
            button.querySelector('i').classList.replace('far', 'fas');
        }

        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede que o clique no botão se propague para o card (se houver)

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

                // Animação do coração no centro da imagem
                if (heartAnimationDiv) {
                    heartAnimationDiv.innerHTML = '<i class="fas fa-heart"></i>'; // Adiciona o ícone
                    heartAnimationDiv.classList.remove('animate'); // Reseta a animação
                    void heartAnimationDiv.offsetWidth; // Força o reflow para reiniciar
                    heartAnimationDiv.classList.add('animate'); // Inicia a animação
                }
            }
            
            // Salva o estado e atualiza o display
            localStorage.setItem(`liked-${itemId}`, isLiked);
            localStorage.setItem(`likes-${itemId}`, currentLikes);
            likesSpan.textContent = currentLikes;
        });
    });

});


// Função para gerar o link do WhatsApp (Visível globalmente para o onclick)
function gerarLinkZap() {
    const select = document.getElementById('tipoEstofado');
    const opcaoSelecionada = select.options[select.selectedIndex].text; 

    // Mensagem de orçamento corrigida
    const mensagemPadrao = `Olá, quero fazer o orçamento de: ${opcaoSelecionada}`;
    
    const numeroTelefone = '5582991522179'; 
    const encodedMessage = encodeURIComponent(mensagemPadrao);
    const linkZap = `https://wa.me/${numeroTelefone}?text=${encodedMessage}`;

    window.open(linkZap, '_blank');
}
