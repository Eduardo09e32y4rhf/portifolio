document.addEventListener('DOMContentLoaded', () => {

  // --- Pausa do carrossel ---
  const carousels = document.querySelectorAll('.carousel-container');
  carousels.forEach(container => {
    const track = container.querySelector('.carousel-track');
    const pauseAnimation = () => { if (track) track.style.animationPlayState = 'paused'; };
    const resumeAnimation = () => { if (track) track.style.animationPlayState = 'running'; };
    container.addEventListener('mouseenter', pauseAnimation);
    container.addEventListener('mouseleave', resumeAnimation);
    container.addEventListener('touchstart', pauseAnimation);
    container.addEventListener('touchend', () => setTimeout(resumeAnimation, 1000));
  });

  // --- Botão Curtir ---
  const likeButtons = document.querySelectorAll('.btn-curtir');
  likeButtons.forEach(button => {
    const itemId = button.getAttribute('data-id');
    const likesSpan = document.getElementById(`likes-${itemId}`);
    const heartAnimationDiv = document.querySelector(`.heart-animation[data-id="${itemId}"]`);
    let currentLikes = parseInt(localStorage.getItem(`likes-${itemId}`)) || parseInt(likesSpan.textContent);
    likesSpan.textContent = currentLikes;
    let isLiked = localStorage.getItem(`liked-${itemId}`) === 'true';
    if (isLiked) {
      button.classList.add('curtido');
      button.querySelector('i').classList.replace('far', 'fas');
    }
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      if (isLiked) {
        currentLikes -= 1;
        button.classList.remove('curtido');
        button.querySelector('i').classList.replace('fas', 'far');
        isLiked = false;
      } else {
        currentLikes += 1;
        button.classList.add('curtido');
        button.querySelector('i').classList.replace('far', 'fas');
        isLiked = true;
        if (heartAnimationDiv) {
          heartAnimationDiv.innerHTML = '<i class="fas fa-heart"></i>';
          heartAnimationDiv.classList.remove('animate');
          void heartAnimationDiv.offsetWidth;
          heartAnimationDiv.classList.add('animate');
        }
      }
      localStorage.setItem(`liked-${itemId}`, isLiked);
      localStorage.setItem(`likes-${itemId}`, currentLikes);
      likesSpan.textContent = currentLikes;
    });
  });

  // --- Bloqueio de copiar ---
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (['c','u','i','j','s','C','U','I','J','S'].includes(e.key)) {
        e.preventDefault();
        return false;
      }
    }
  });
});

// --- Função WhatsApp ---
function gerarLinkZap() {
  const select = document.getElementById('tipoEstofado');
  const opcaoSelecionada = select ? select.options[select.selectedIndex].text : 'Serviço';
  const mensagem = `Olá, quero fazer o orçamento de: ${opcaoSelecionada}`;
  const numeroTelefone = '5582991522179';
  const link = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, '_blank');
}