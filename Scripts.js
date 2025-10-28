document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== FUNCIONALIDADE DO MENU HAMBURGUER (MOBILE) ====================
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        // Novo: Adicionando os ícones de toggle diretamente no HTML via JS (melhor prática seria ter no HTML)
        // Mas se o HTML não pode ser editado manualmente, essa é a solução
        navToggle.innerHTML = '<i class="fas fa-bars toggle-open"></i><i class="fas fa-times toggle-close"></i>';

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            // NOVO: Adiciona a classe 'is-active' ao toggle para o CSS controlar a mudança visual
            navToggle.classList.toggle('is-active'); 
        });
    }

    // Fecha o menu ao clicar em qualquer link (para navegação suave)
    navLinks.forEach(link => link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        if (navToggle) {
            navToggle.classList.remove('is-active'); // Garante que o ícone volte para o hambúrguer
        }
    }));

    // ==================== EFEITO DO HEADER AO ROLAR (Scroll Header) ====================
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) { 
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

});
