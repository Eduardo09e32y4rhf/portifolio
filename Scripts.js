/* ========== CONFIGURAÇÃO (edite aqui) ========== */
/* Número: formato DDI + DDD + número (ex: 5582987654321) */
const PHONE = "55829XXXXXXXX"; // <<-- insira seu número completo (ex: 5582987654321)
const EMPRESA = "Gslimp";
const ATUACAO = "Arapiraca (até 15 km)";
/* ================================================= */

/* Mapas de texto exibido */
const tipoMap = {
  "sofá-3l":"Sofá 3 lugares",
  "sofá-2l":"Sofá 2 lugares",
  "sofá-1l":"Sofá 1 lugar / Poltrona",
  "cadeira":"Cadeira",
  "colchao":"Colchão / Cama",
  "tapete":"Tapete",
  "estofado-automovel":"Estofado automóvel",
  "outro":"Outro"
};

const materialMap = {
  "tecido":"Tecido comum",
  "suede":"Suede",
  "veludo":"Veludo",
  "microfibra":"Microfibra",
  "lona":"Lona / Sintético",
  "couro":"Couro / Couro sintético",
  "nao-sei":"Não sei"
};

/* Preços base (valores de exemplo) — ajuste conforme sua política */
const preçoBase = {
  "sofá-3l": 120,
  "sofá-2l": 90,
  "sofá-1l": 60,
  "cadeira": 35,
  "colchao": 100,
  "tapete": 80,
  "estofado-automovel": 120,
  "outro": 80
};

/* Multiplicador por material (ex.: tecidos delicados dão custo maior) */
const materialMul = {
  "tecido": 1.0,
  "suede": 1.15,
  "veludo": 1.18,
  "microfibra": 1.05,
  "lona": 0.95,
  "couro": 1.25,
  "nao-sei": 1.0
};

/* Acrescenta por quantidade de manchas */
const manchasMul = {
  "0": 1.0,
  "1": 1.08,
  "2": 1.18,
  "3": 1.35
};

/* DOM */
const tipoEl = document.getElementById('tipo');
const materialEl = document.getElementById('material');
const manchasEl = document.getElementById('manchas');
const nomeEl = document.getElementById('nome');
const bairroEl = document.getElementById('bairro');
const estimativaEl = document.getElementById('estimativa');
const simularBtn = document.getElementById('simularBtn');
const limparBtn = document.getElementById('limparBtn');
const whatsFab = document.getElementById('whatsFab');
const openWhats = document.getElementById('openWhats');
const btnSim = document.getElementById('btn-sim');

/* Helpers */
function formatCurrencyBR(value){
  // formata em R$ com duas casas e vírgula
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcularEstimativa(){
  const tipo = tipoEl.value;
  const material = materialEl.value;
  const manchas = manchasEl.value;

  const base = preçoBase[tipo] || 80;
  const mm = materialMul[material] || 1.0;
  const msc = manchasMul[manchas] || 1.0;

  let valor = base * mm * msc;

  // arredondar para 0.50 ou inteiro
  valor = Math.round(valor / 5) * 5;

  return valor;
}

function criarMensagemWhats(){
  const tipo = tipoEl.value;
  const material = materialEl.value;
  const manchas = manchasEl.value;
  const nome = nomeEl.value.trim();
  const bairro = bairroEl.value.trim();
  const estim = calcularEstimativa();

  const linhas = [];
  linhas.push(`Olá! Gostaria de um orçamento para limpeza.`);
  linhas.push(`Empresa: ${EMPRESA}`);
  linhas.push(`Atuação: ${ATUACAO}`);
  linhas.push(`Tipo: ${tipoMap[tipo] || tipo}`);
  linhas.push(`Material: ${materialMap[material] || material}`);
  linhas.push(`Manchas: ${manchas === "0" ? "Não" : (manchas === "1" ? "Poucas" : manchas === "2" ? "Algumas" : "Muitas")}`);
  if(nome) linhas.push(`Nome: ${nome}`);
  if(bairro) linhas.push(`Bairro: ${bairro}`);
  linhas.push(`Estimativa: ${formatCurrencyBR(estim)}`);
  linhas.push("");
  linhas.push("Pode me informar disponibilidade e o preço final?");

  const texto = linhas.join("\n");
  return texto;
}

/* Gera URL do WhatsApp (usa web.whatsapp para desktop e api.whatsapp para mobile) */
function buildWhatsUrl(text){
  const ua = navigator.userAgent || "";
  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(ua);
  const base = isMobile ? "https://api.whatsapp.com/send" : "https://web.whatsapp.com/send";
  return `${base}?phone=${PHONE}&text=${encodeURIComponent(text)}`;
}

/* Atualiza estimativa na UI */
function updateUIEstimativa(){
  const val = calcularEstimativa();
  estimativaEl.textContent = formatCurrencyBR(val);
}

/* Eventos */
tipoEl.addEventListener('change', updateUIEstimativa);
materialEl.addEventListener('change', updateUIEstimativa);
manchasEl.addEventListener('change', updateUIEstimativa);

document.addEventListener('DOMContentLoaded', function(){
  updateUIEstimativa();

  // Ajusta o link do fab (mensagem genérica)
  const genMsg = `Olá! Gostaria de informações sobre serviços da ${EMPRESA} em ${ATUACAO}.`;
  whatsFab.href = buildWhatsUrl(genMsg);
});

/* Botão que envia mensagem com dados do formulário */
simularBtn.addEventListener('click', function(){
  const mensagem = criarMensagemWhats();
  const url = buildWhatsUrl(mensagem);
  window.open(url, "_blank");
});

/* Limpar campos */
limparBtn.addEventListener('click', function(){
  tipoEl.selectedIndex = 0;
  materialEl.selectedIndex = 0;
  manchasEl.selectedIndex = 0;
  nomeEl.value = "";
  bairroEl.value = "";
  updateUIEstimativa();
});

/* Abrir WhatsApp social */
openWhats.addEventListener('click', function(e){
  e.preventDefault();
  const genMsg = `Olá! Gostaria de informações sobre serviços da ${EMPRESA} em ${ATUACAO}.`;
  window.open(buildWhatsUrl(genMsg), "_blank");
});

/* Rolar para simulador */
btnSim.addEventListener('click', function(e){
  e.preventDefault();
  document.getElementById('simulador').scrollIntoView({behavior:'smooth', block:'center'});
});

/* Atalho teclado "w" abre WhatsApp */
document.addEventListener('keydown', function(e){
  if(e.key.toLowerCase() === 'w' && !e.metaKey && !e.ctrlKey && !e.altKey){
    const genMsg = `Olá! Gostaria de informações sobre serviços da ${EMPRESA}.`;
    window.open(buildWhatsUrl(genMsg), "_blank");
  }
});

/* Validação básica: alerta se PHONE não atualizado */
(function checkPhone(){
  if(!PHONE || PHONE.includes('X')){
    console.warn("ATENÇÃO: Substitua PHONE em app.js pelo número completo no formato DDI+DDD+NUM (ex: 5582987654321).");
  }
})();