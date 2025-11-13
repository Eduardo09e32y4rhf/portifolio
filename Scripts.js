document.addEventListener('DOMContentLoaded', () => {

    const carousels = document.querySelectorAll('.carousel-track');

    carousels.forEach(track => {
        let isDown = false;
        let startX;
        let scrollLeft;
        let hasDragged = false; // Flag para detectar se houve um arrasto manual

        // --- Lógica 2: Pausa Automática ao Interagir ---

        // Pausa a animação quando o mouse/touch entra
        const pauseAnimation = () => {
            track.classList.add('paused');
        };

        // Retoma a animação (após um pequeno atraso, se não houver arrasto recente)
        const resumeAnimation = () => {
            // Se o usuário não estava arrastando (apenas um hover rápido), retoma.
            if (!hasDragged) {
                track.classList.remove('paused');
            } else {
                // Se arrastou, dá um tempo (1 segundo) antes de retomar automaticamente
                setTimeout(() => {
                    track.classList.remove('paused');
                    hasDragged = false;
                }, 1000);
            }
        };

        // Eventos de Hover (PC)
        track.addEventListener('mouseenter', pauseAnimation);
        track.addEventListener('mouseleave', resumeAnimation);
        
        // Eventos de Touch (Celular): Usamos os eventos de drag abaixo

        // --- Lógica 1: Habilita Arrasto Manual do Carrossel (Drag to Scroll) ---

        // 1. Mouse Pressionado / Toque iniciado
        const handleDown = (e) => {
            isDown = true;
            pauseAnimation(); // Pausa a animação ao iniciar o clique/toque
            track.classList.add('active-drag'); // Adiciona classe visual (opcional)

            // Usa e.pageX (mouse) ou e.touches[0].pageX (touch)
            const pageX = e.type.startsWith('touch') ? e.touches[0].pageX : e.pageX;
            
            startX = pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
            hasDragged = false;
        };

        // 2. Mouse Solto / Toque finalizado
        const handleUp = () => {
            isDown = false;
            track.classList.remove('active-drag');
            resumeAnimation(); // Tenta retomar a animação após soltar
        };
        
        // 3. Mouse Movendo / Toque Arrastando
        const handleMove = (e) => {
            if (!isDown) return;
            // Previne o comportamento padrão (ex: scroll vertical em alguns casos)
            // Mas não previne o scroll horizontal nativo (que queremos)
            // e.preventDefault(); 
            
            const pageX = e.type.startsWith('touch') ? e.touches[0].pageX : e.pageX;
            
            const x = pageX - track.offsetLeft;
            const walk = (x - startX) * 2; // Multiplicador de velocidade
            
            // Verifica se o movimento é significativo para registrar como arrasto
            if (Math.abs(walk) > 10) {
                 hasDragged = true;
            }

            // Move o scroll na direção oposta ao movimento do mouse/touch
            track.scrollLeft = scrollLeft - walk;
        };
        
        // Aplica os Eventos
        track.addEventListener('mousedown', handleDown);
        track.addEventListener('touchstart', handleDown);

        track.addEventListener('mouseup', handleUp);
        track.addEventListener('mouseleave', handleUp); // Trata o caso de soltar o mouse fora
        track.addEventListener('touchend', handleUp);
        
        track.addEventListener('mousemove', handleMove);
        track.addEventListener('touchmove', handleMove);
    });

    // --- BLOQUEIO: Bloqueia a cópia e ferramentas de desenvolvedor pelo teclado ---
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


// Função para gerar o link do WhatsApp (MANTIDA, mas não é mais usada no HTML)
function gerarLinkZap() {
    // ... (mantenha a função inalterada) ...
}
