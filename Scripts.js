document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Funcionalidade do Botão Hambúrguer
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Alterna o ícone do hambúrguer para um 'X' se desejar
        // const icon = hamburger.querySelector('i');
        // if (navMenu.classList.contains('active')) {
        //     icon.classList.remove('fa-bars');
        //     icon.classList.add('fa-times');
        // } else {
        //     icon.classList.remove('fa-times');
        //     icon.classList.add('fa-bars');
        // }
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

    // Observação: Para carrosséis de imagens automáticos, seria necessário 
    // adicionar uma biblioteca JS como Slick.js ou Swiper.js, ou escrever 
    // código adicional aqui para a funcionalidade de deslizamento ('slider').
});
