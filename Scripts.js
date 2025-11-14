document.addEventListener('DOMContentLoaded', () => {

    /* --- LÓGICA DE PAUSA DOS CARROSÉIS (AUTO + TOUCH MANUAL) --- */
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');

        const pause = () => track && (track.style.animationPlayState = 'paused');
        const resume = () => track && (track.style.animationPlayState = 'running');

        // Desktop
        container.addEventListener('mouseenter', pause);
        container.addEventListener('mouseleave', resume);

        // Mobile
        container.addEventListener('touchstart', pause);
        container.addEventListener('touchmove', pause);
        container.addEventListener('touchend', () => {
            setTimeout(resume, 800);
        });
    });

    /* --- BLOQUEIO: PREVENIR CTRL+C, CTRL+U, CTRL+S, etc --- */
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            const block = ['c','u','i','j','s'];
            if (block.includes(e.key.toLowerCase())) {
                e.preventDefault();
                return false;
            }
        }
    });

});