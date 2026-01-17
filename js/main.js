// ========== MENU SANDUÍCHE ==========
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.onclick = () => {
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('open');
};

// ========== ÁRVORE GENEALÓGICA ==========
const pessoas = [
  { nome: 'Carlos Borges', idade: 68, relacao: 'Avô', foto: 'https://randomuser.me/api/portraits/men/1.jpg', x: 300, y: 50 },
  { nome: 'Helena Borges', idade: 65, relacao: 'Avó', foto: 'https://randomuser.me/api/portraits/women/2.jpg', x: 600, y: 50 },
  { nome: 'Ricardo Borges', idade: 42, relacao: 'Filho', foto: 'https://randomuser.me/api/portraits/men/3.jpg', x: 450, y: 250 },
  { nome: 'Ana Borges', idade: 39, relacao: 'Nora', foto: 'https://randomuser.me/api/portraits/women/4.jpg', x: 650, y: 250 },
  { nome: 'Lucas Borges', idade: 17, relacao: 'Neto', foto: 'https://randomuser.me/api/portraits/men/5.jpg', x: 400, y: 450 },
  { nome: 'Marina Borges', idade: 15, relacao: 'Neta', foto: 'https://randomuser.me/api/portraits/women/6.jpg', x: 650, y: 450 }
];

const container = document.getElementById('treeContainer');
const svg = document.getElementById('treeLines');

// Criar os elementos de cada pessoa
pessoas.forEach(p => {
  const div = document.createElement('div');
  div.classList.add('person');
  div.style.position = 'absolute';
  div.style.left = p.x + 'px';
  div.style.top = p.y + 'px';
  div.innerHTML = `
    <img src="${p.foto}" alt="${p.nome}">
    <h4>${p.nome}</h4>
    <p>${p.relacao} • ${p.idade} anos</p>
  `;
  container.appendChild(div);
});

// Função para conectar nós com linhas SVG
function conectar(a, b) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', a.x + 75);
  line.setAttribute('y1', a.y + 120);
  line.setAttribute('x2', b.x + 75);
  line.setAttribute('y2', b.y);
  line.style.stroke = '#d4af37';
  line.style.strokeWidth = '2';
  line.style.opacity = '0.4';
  svg.appendChild(line);
}

// Ligações
conectar(pessoas[0], pessoas[2]);
conectar(pessoas[1], pessoas[2]);
conectar(pessoas[2], pessoas[4]);
conectar(pessoas[3], pessoas[5]);

// ========== ANIMAÇÃO DAS LINHAS E PESSOAS ==========
gsap.registerPlugin(ScrollTrigger);

// Animação de entrada dos blocos
gsap.utils.toArray('.person').forEach((p, i) => {
  gsap.to(p, {
    opacity: 1,
    scale: 1,
    duration: 1.2,
    delay: i * 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: p,
      start: 'top 90%',
    },
  });
});

// Efeito de linhas sendo desenhadas
gsap.fromTo(svg.querySelectorAll('line'),
  { strokeDasharray: 1000, strokeDashoffset: 1000 },
  {
    strokeDashoffset: 0,
    duration: 2,
    stagger: 0.3,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: '.arvore',
      start: 'top 80%'
    }
  });

// ========== BLOQUEIO DE TECLAS ==========
document.addEventListener('keydown', e => {
  if ((e.ctrlKey && ['c', 'u', 's', 'p'].includes(e.key)) || e.key === 'F12') {
    e.preventDefault();
    alert('🔒 Protegido por Moreira & Borges');
  }
});

// ========== TRADUÇÃO MULTILÍNGUE COMPLETA ==========
const translations = {
  pt: {
    inicio: 'Início',
    arvore: 'Árvore',
    sobre: 'Sobre Nós',
    contato: 'Contato',
    heroTitle: 'Descubra Suas Raízes',
    heroSubtitle: 'Veja sua história ganhar vida. Conecte gerações e reviva o legado da sua família. 🌳✨',
    treeTitle: 'Árvore Genealógica Viva',
    aboutTitle: 'Sobre Nós',
    aboutText: 'Unimos história e tecnologia para resgatar origens e preservar memórias. Desde 2021, referência internacional em genealogia e cidadania europeia.',
    aboutQuote: '“As raízes da sua história florescem quando você decide descobri-las.”',
    contactTitle: 'Fale Conosco',
    contactText: 'Inicie sua jornada genealógica agora.'
  },
  en: {
    inicio: 'Home',
    arvore: 'Family Tree',
    sobre: 'About Us',
    contato: 'Contact',
    heroTitle: 'Discover Your Roots',
    heroSubtitle: 'See your story come alive. Connect generations and relive your family legacy. 🌳✨',
    treeTitle: 'Living Family Tree',
    aboutTitle: 'About Us',
    aboutText: 'We merge history and technology to rediscover your origins and preserve family memories. Since 2021, an international reference in genealogy and European citizenship.',
    aboutQuote: '"The roots of your story bloom when you decide to discover them."',
    contactTitle: 'Contact Us',
    contactText: 'Begin your genealogical journey today.'
  },
  es: {
    inicio: 'Inicio',
    arvore: 'Árbol',
    sobre: 'Sobre Nosotros',
    contato: 'Contacto',
    heroTitle: 'Descubre tus Raíces',
    heroSubtitle: 'Mira cómo tu historia cobra vida. Conecta generaciones y revive el legado de tu familia. 🌳✨',
    treeTitle: 'Árbol Genealógico Vivo',
    aboutTitle: 'Sobre Nosotros',
    aboutText: 'Unimos historia y tecnología para redescubrir tus orígenes y preservar tus recuerdos familiares. Desde 2021, referencia internacional en genealogía y ciudadanía europea.',
    aboutQuote: '“Las raíces de tu historia florecen cuando decides descubrirlas.”',
    contactTitle: 'Contáctanos',
    contactText: 'Inicia tu viaje genealógico hoy.'
  }
};

// Função para trocar idioma dinamicamente
const langSelect = document.getElementById('langSelect');

function changeLanguage(lang) {
  const t = translations[lang];
  document.querySelector('[data-lang="inicio"]').textContent = t.inicio;
  document.querySelector('[data-lang="arvore"]').textContent = t.arvore;
  document.querySelector('[data-lang="sobre"]').textContent = t.sobre;
  document.querySelector('[data-lang="contato"]').textContent = t.contato;
  document.getElementById('heroTitle').textContent = t.heroTitle;
  document.getElementById('heroSubtitle').textContent = t.heroSubtitle;
  document.getElementById('treeTitle').textContent = t.treeTitle;
  document.getElementById('aboutTitle').textContent = t.aboutTitle;
  document.getElementById('aboutText').textContent = t.aboutText;
  document.getElementById('aboutQuote').textContent = t.aboutQuote;
  document.getElementById('contactTitle').textContent = t.contactTitle;
  document.getElementById('contactText').textContent = t.contactText;

  // Efeito suave de transição de idioma
  gsap.fromTo('body', { opacity: 0.8 }, { opacity: 1, duration: 0.6, ease: 'power1.out' });
}

// Listener da seleção
langSelect.addEventListener('change', e => changeLanguage(e.target.value));

// ========== ANIMAÇÕES GERAIS ==========
gsap.from('.hero h1', { opacity: 0, y: -50, duration: 1 });
gsap.from('.hero p', { opacity: 0, y: 40, duration: 1.2, delay: 0.3 });

anime({
  targets: '.logo',
  opacity: [0, 1],
  translateY: [-20, 0],
  duration: 1500,
  easing: 'easeOutExpo'
});

// ========== EFEITO PARALLAX NO HERO ==========
window.addEventListener('scroll', () => {
  const offset = window.scrollY * 0.4;
  document.querySelector('.hero').style.backgroundPositionY = `${offset}px`;
});