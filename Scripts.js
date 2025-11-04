// --- ORÇAMENTO VIA WHATSAPP ---
const btn = document.getElementById("btnOrcamento");
if (btn) {
  btn.addEventListener("click", () => {
    const tipo = document.getElementById("tipoEstofado").value;
    const telefone = "5599999999999"; // Substitua pelo seu número
    const mensagem = `Olá! Gostaria de solicitar um orçamento para ${tipo}.`;
    const link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, "_blank");
  });
}

// --- SISTEMA DE CURTIDAS (COM PERSISTÊNCIA LOCAL) ---
const hearts = document.querySelectorAll(".heart");

hearts.forEach((heart) => {
  const index = heart.dataset.index;
  if (localStorage.getItem(`liked-${index}`) === "true") {
    heart.classList.add("liked");
  }

  heart.addEventListener("click", (e) => {
    e.preventDefault(); // evita selecionar a imagem
    e.stopPropagation();
    heart.classList.toggle("liked");
    const liked = heart.classList.contains("liked");
    localStorage.setItem(`liked-${index}`, liked);
  });
});

// --- NEXT.JS BASE EXEMPLO (API INTERNA) ---
/*
Se migrar para Next.js, crie este arquivo:
📁 /pages/api/like.js

export default function handler(req, res) {
  if (req.method === "POST") {
    // Aqui você pode salvar curtidas em banco de dados
    const { id, liked } = req.body;
    return res.status(200).json({ success: true, id, liked });
  } else {
    res.status(405).end();
  }
}
*/

// Esse script funciona tanto em site HTML puro quanto em Next.js.