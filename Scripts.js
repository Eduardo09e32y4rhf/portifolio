// MENU SANDUÍCHE
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.onclick = () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("open");
};

// ÁRVORE GENEALÓGICA (geração automática)
const pessoas = [
  { nome: "Carlos Borges", idade: 68, relacao: "Avô", foto: "https://randomuser.me/api/portraits/men/1.jpg" },
  { nome: "Helena Moreira", idade: 65, relacao: "Avó", foto: "https://randomuser.me/api/portraits/women/2.jpg" },
  { nome: "Ricardo Borges", idade: 42, relacao: "Filho", foto: "https://randomuser.me/api/portraits/men/3.jpg" },
  { nome: "Ana Borges", idade: 39, relacao: "Nora", foto: "https://randomuser.me/api/portraits/women/4.jpg" },
  { nome: "Lucas Borges", idade: 17, relacao: "Neto", foto: "https://randomuser.me/api/portraits/men/5.jpg" },
  { nome: "Marina Borges", idade: 15, relacao: "Neta", foto: "https://randomuser.me/api/portraits/women/6.jpg" }
];

const treeContainer = document.querySelector(".tree-container");

pessoas.forEach((pessoa, i) => {
  const div = document.createElement("div");
  div.classList.add("person");
  div.innerHTML = `
    <img src="${pessoa.foto}" alt="${pessoa.nome}">
    <h4>${pessoa.nome}</h4>
    <p>${pessoa.relacao} • ${pessoa.idade} anos</p>
  `;
  treeContainer.appendChild(div);
});

// ANIMAÇÕES GSAP
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".person").forEach((el, i) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    }
  );
});

// EFEITO BRILHO AO ROLAR
anime({
  targets: "h2, h1",
  opacity: [0, 1],
  translateY: [50, 0],
  duration: 1500,
  easing: "easeOutExpo",
  delay: anime.stagger(200),
});

// BLOQUEIO DE TECLAS
document.addEventListener("keydown", (e) => {
  if (
    (e.ctrlKey && ["c", "u", "s"].includes(e.key)) ||
    e.key === "F12"
  ) {
    e.preventDefault();
  }
});