function simular() {
    const produto = document.getElementById("produto").value;

    if (!produto) {
        alert("Selecione um produto!");
        return;
    }

    const mensagem = `Olá! Gostaria de um orçamento para limpeza de ${produto}.`;
    const url = `https://wa.me/5582988117760?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
}

// SLIDER DE DEPOIMENTOS
let atual = 0;
setInterval(() => {
    const itens = document.querySelectorAll(".depoimentos-slider p");

    itens.forEach(el => el.classList.remove("depoimento-ativo"));
    itens[atual].classList.add("depoimento-ativo");

    atual = (atual + 1) % itens.length;
}, 4000);