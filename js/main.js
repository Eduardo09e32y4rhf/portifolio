// MENU
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.onclick = () => navMenu.classList.toggle('active');

// ÁRVORE GENEALÓGICA
const people = [
  { name: 'Carlos', relation: 'Bisavô', gen: 1 },
  { name: 'Helena', relation: 'Bisavó', gen: 1 },
  { name: 'Miguel', relation: 'Bisavô', gen: 1 },
  { name: 'Lúcia', relation: 'Bisavó', gen: 1 },
  { name: 'Ricardo', relation: 'Avô', gen: 2 },
  { name: 'Ana', relation: 'Avó', gen: 2 },
  { name: 'João', relation: 'Avô', gen: 2 },
  { name: 'Rita', relation: 'Avó', gen: 2 },
  { name: 'Marcos', relation: 'Pai', gen: 3 },
  { name: 'Clara', relation: 'Mãe', gen: 3 },
  { name: 'Paulo', relation: 'Tio', gen: 3 },
  { name: 'Cecília', relation: 'Tia', gen: 3 },
  { name: 'Lucas', relation: 'Filho', gen: 4 },
  { name: 'Marina', relation: 'Filha', gen: 4 },
  { name: 'Enzo', relation: 'Sobrinho', gen: 4 },
  { name: 'Isabela', relation: 'Sobrinha', gen: 4 },
  { name: 'Caio', relation: 'Neto', gen: 5 },
  { name: 'Helena Jr.', relation: 'Neta', gen: 5 },
  { name: 'Gabriel', relation: 'Neto', gen: 5 },
  { name: 'Sofia', relation: 'Neta', gen: 5 },
];

const container = document.getElementById('peopleContainer');
const svg = document.getElementById('treeSVG');

// Gera posições baseadas na geração
function getPosition(gen, index, total) {
  const y = 100 + gen * 130;
  const spacing = 100 / (total + 1);
  const xPercent = spacing * (index + 1);
  return { x: xPercent, y };
}

// Adiciona nós
const genMap = {};
people.forEach(p => {
  if (!genMap[p.gen]) genMap[p.gen] = [];
  genMap[p.gen].push(p);
});

Object.keys(genMap).forEach(gen => {
  const members = genMap[gen];
  members.forEach((p, i) => {
    const { x, y } = getPosition(gen, i, members.length);
    const div = document.createElement('div');
    div.classList.add('person');
    div.style.left = `${x}%`;
    div.style.top = `${y}px`;
    div.innerHTML = `
      <img src="https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 90)}.jpg">
      <span>${p.name}<br><small>${p.relation}</small></span>
    `;
    container.appendChild(div);
  });
});

// Desenha galhos (linhas)
const lines = [];
Object.keys(genMap).forEach(gen => {
  const nextGen = genMap[parseInt(gen) + 1];
  if (!nextGen) return;
  genMap[gen].forEach((parent, i) => {
    const parentPos = getPosition(gen, i, genMap[gen].length);
    nextGen.forEach((child, j) => {
      const childPos = getPosition(parseInt(gen) + 1, j, nextGen.length);
      const dx = Math.abs(childPos.x - parentPos.x);
      if (dx < 25) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', `${parentPos.x}%`);
        line.setAttribute('y1', parentPos.y + 20);
        line.setAttribute('x2', `${childPos.x}%`);
        line.setAttribute('y2', childPos.y - 20);
        line.style.stroke = '#d4af37';
        line.style.strokeWidth = '2';
        line.style.opacity = '0.4';
        svg.appendChild(line);
        lines.push(line);
      }
    });
  });
});

// Animações com GSAP
gsap.from('.person', {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.1,
  scrollTrigger: { trigger: '#arvore', start: 'top 80%' }
});

gsap.fromTo(lines, 
  { strokeDasharray: 200, strokeDashoffset: 200 },
  { strokeDashoffset: 0, duration: 2, stagger: 0.1, scrollTrigger: { trigger: '#arvore', start: 'top 80%' } }
);