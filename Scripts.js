document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Funcionalidade do Botão Hambúrguer
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fechar o menu ao clicar em um link (útil para navegação mobile)
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
});
