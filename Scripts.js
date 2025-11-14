/* ============================
   VARIÁVEIS GLOBAIS
============================ */
:root {
  --cor-primaria: #6C00FF;
  --cor-primaria-2: #7B2FFF;
  --cor-primaria-3: #9C4DFF;

  --radius: 18px;
  --trans: 0.3s ease;

  /* Modo Claro */
  --bg: #ffffff;
  --texto: #1c1c1c;
  --cartao: #f1f1f5;
}

/* MODO ESCURO */
[data-theme="dark"] {
  --bg: #0d0d0f;
  --texto: #efefef;
  --cartao: #1a1a1d;
}

/* ============================
   RESET + BASE
============================*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

body {
  background: var(--bg);
  color: var(--texto);
  transition: background var(--trans), color var(--trans);
}

.container {
  width: 90%;
  max-width: 1250px;
  margin: auto;
}

/* ============================
   HEADER
============================*/
.header {
  padding: 18px 0;
  backdrop-filter: blur(14px);
  background: rgba(255,255,255,0.5);
  position: sticky;
  top: 0;
  z-index: 10;
}

[data-theme="dark"] .header {
  background: rgba(0,0,0,0.4);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: 900;
  font-size: 1.7rem;
  background: linear-gradient(45deg, var(--cor-primaria), var(--cor-primaria-3));
  -webkit-background-clip: text;
  color: transparent;
}

.menu a {
  margin-left: 25px;
  text-decoration: none;
  font-weight: 600;
  color: var(--texto);
  transition: var(--trans);
}

.menu a:hover {
  color: var(--cor-primaria);
}

.btn {
  padding: 8px 18px;
  color: white !important;
  background: var(--cor-primaria);
  border-radius: var(--radius);
}

/* Toggle Tema */
.theme-toggle {
  background: var(--cartao);
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: var(--trans);
}

/* ============================
   HERO
============================*/
.hero {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  background: linear-gradient(
      to bottom right,
      var(--cor-primaria),
      var(--cor-primaria-3)
  );
  color: white;
}

.hero-inner {
  max-width: 700px;
  padding: 20px;
}

.hero .gradient {
  background: linear-gradient(45deg, #fff, #ddd);
  -webkit-background-clip: text;
  color: transparent;
}

/* CTA WhatsApp */
.cta-wpp {
  background: #25d366;
  padding: 14px 26px;
  color: white;
  border-radius: var(--radius);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: bold;
  display: inline-block;
  margin-top: 25px;
  transition: var(--trans);
}

.cta-wpp:hover {
  transform: scale(1.05);
}

/* ============================
   SEÇÕES
============================*/
.section {
  padding: 80px 0;
}

.titulo {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.1rem;
  font-weight: 800;
}

/* Cards */
.grid-services {
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.card {
  background: var(--cartao);
  padding: 30px;
  border-radius: var(--radius);
  transition: var(--trans);
}

.card:hover {
  transform: translateY(-4px);
}

/* Vídeo */
.video-section .video-wrapper {
  border-radius: var(--radius);
  overflow: hidden;
}

.video-grid {
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.video-wrapper iframe {
  width: 100%;
  height: 350px;
}

/* Depoimentos */
.carousel {
  display: flex;
  gap: 25px;
  overflow-x: auto;
  padding-bottom: 15px;
}

.depo {
  min-width: 260px;
  text-align: center;
}

/* CTA FINAL */
.cta-final {
  text-align: center;
  padding: 80px 20px;
}

.cta {
  padding: 12px 20px;
  background: var(--cor-primaria);
  color: white;
  border-radius: var(--radius);
  text-decoration: none;
  margin-top: 20px;
  display: inline-block;
}

/* FOOTER */
.footer {
  text-align: center;
  padding: 40px 0;
  opacity: 0.7;
}