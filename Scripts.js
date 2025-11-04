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
        
        // Desktop
        container.addEventListener('mouseenter', pauseAnimation);
        container.addEventListener('mouseleave', resumeAnimation);
        
        // Mobile
        container.addEventListener('touchstart', pauseAnimation);
        container.addEventListener('touchend', () => {
            setTimeout(resumeAnimation, 1000); 
        });
    });


    // --- Lógica 2: Botão Curtir (Persistência com LocalStorage) ---
    const likeButtons = document.querySelectorAll('.btn-curtir');

    likeButtons.forEach(button => {
        const itemId = button.getAttribute('data-id');
        const likesSpan = document.getElementById(`likes-${itemId}`);
        
        // Puxa o contador do localStorage ou usa o valor inicial do HTML
        let currentLikes = parseInt(localStorage.getItem(`likes-${itemId}`)) || parseInt(likesSpan.textContent);
        likesSpan.textContent = currentLikes;
        
        let isLiked = localStorage.getItem(`liked-${itemId}`) === 'true';

        // Estado inicial
        if (isLiked) {
            button.classList.add('curtido');
            button.querySelector('i').classList.replace('far', 'fas');
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
            
            // Salva o estado
            localStorage.setItem(`liked-${itemId}`, isLiked);
            localStorage.setItem(`likes-${itemId}`, currentLikes);
            likesSpan.textContent = currentLikes;
        });
    });

    // --- Lógica 3: Calculadora de Orçamento Rápido (Função Global para o Botão) ---

});


// Função para gerar o link do WhatsApp (Visível globalmente para o onclick no HTML)
function gerarLinkZap() {
    const select = document.getElementById('tipoEstofado');
    // Pega o TEXTO visível da opção selecionada
    const opcaoSelecionada = select.options[select.selectedIndex].text; 

    // Mensagem de orçamento corrigida
    const mensagemPadrao = `Olá, quero fazer um orçamento para a seguinte opção: ${opcaoSelecionada}`;
    
    // Seu número de WhatsApp (82) 99152-2179
    const numeroTelefone = '5582991522179'; 
    const encodedMessage = encodeURIComponent(mensagemPadrao);
    const linkZap = `https://wa.me/${numeroTelefone}?text=${encodedMessage}`;

    window.open(linkZap, '_blank');
}
