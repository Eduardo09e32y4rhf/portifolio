
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica 1: Pausa de Carrossel Animado em Interação ---
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        
        // Verifica se o track existe (para evitar erros caso o HTML esteja incompleto)
        if (!track) return; 
        
        const pauseAnimation = () => {
            track.style.animationPlayState = 'paused';
        };
        const resumeAnimation = () => {
            track.style.animationPlayState = 'running';
        };
        
        // Desktop e Mobile
        container.addEventListener('mouseenter', pauseAnimation);
        container.addEventListener('mouseleave', resumeAnimation);
        container.addEventListener('touchstart', pauseAnimation);
        container.addEventListener('touchend', () => {
            // Retorna a animação após um breve atraso de 1 segundo
            setTimeout(resumeAnimation, 1000); 
        });
    });


    // --- BLOQUEIO: Bloqueia a cópia e ferramentas de desenvolvedor pelo teclado (Ctrl/Cmd + C, U, I, J, S) ---
    document.addEventListener('keydown', (e) => {
        // e.ctrlKey é para Windows/Linux, e.metaKey é para Mac (Cmd)
        if (e.ctrlKey || e.metaKey) { 
            const key = e.key.toLowerCase();
            // Bloqueia C, U, I, J, S
            if (key === 'c' || key === 'u' || key === 'i' || key === 'j' || key === 's') {
                e.preventDefault();
            }
        }
    });

});


// Função para gerar o link do WhatsApp (Visível globalmente para o onclick)
function gerarLinkZap() {
    const select = document.getElementById('tipoEstofado');
    
    // Verifica se o elemento existe e se uma opção foi selecionada
    if (!select || select.selectedIndex === -1) {
        alert("Por favor, selecione um tipo de estofado.");
        return;
    }
    
    const opcaoSelecionada = select.options[select.selectedIndex].text; 

    // Mensagem a ser enviada
    const mensagemPadrao = `Olá, Gslimp! Quero fazer o orçamento de: ${opcaoSelecionada}`;
    
    // Número do WhatsApp (55=Código do País, 82=DDD, 991522179=Número)
    const numeroTelefone = '5582991522179'; 
    
    const encodedMessage = encodeURIComponent(mensagemPadrao);
    const linkZap = `https://wa.me/${numeroTelefone}?text=${encodedMessage}`;

    // Abre o link em uma nova aba
    window.open(linkZap, '_blank');
}
