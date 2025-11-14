/* ==========================================================
   GSLIMP — Apple-like premium + Nubank gradient + Dark/Light
   Advanced UI: theme transitions, animations, mobile menu
========================================================== */

/* IMPORTS */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');

:root{
  /* brand gradient (Nubank-ish) */
  --brand-1: #0066ff; /* base blue-ish */
  --brand-2: #7A05BE; /* roxo */
  --brand-3: #9C4DFF;

  --bg: #ffffff;
  --surface: #ffffff;
  --text: #0b1220;
  --muted: #6b7280;
  --border: rgba(11,17,32,0.06);

  --radius: 14px;
  --radius-lg: 18px;
  --gap: 24px;
  --maxw: 1180px;
  --transition: 360ms cubic-bezier(.2,.9,.2,1);
  --shadow-sm: 0 6px 18px rgba(11,17,32,0.04);
  --shadow-lg: 0 20px 50px rgba(11,17,32,0.08);
}

/* dark overrides */
[data-theme="dark"]{
  --bg: #0d0d10;
  --surface: #0f1114;
  --text: #e8eef8;
  --muted: #98a2b3;
  --border: rgba(255,255,255,0.04);
}

/* base */
*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  background:var(--bg);
  color:var(--text);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  transition: background var(--transition), color var(--transition);
}

.container{
  width:min(92%, var(--maxw));
  margin:0 auto;
}

/* header */
.header{
  position:sticky;
  top:12px;
  z-index:1200;
  padding:6px 0;
  pointer-events:auto;
}

.header-inner{
  display:flex;
  gap:12px;
  align-items:center;
  justify-content:space-between;
  background: linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0.45));
  border-radius:12px;
  padding:10px 14px;
  box-shadow:var(--shadow-sm);
  border:1px solid var(--border);
  backdrop-filter: blur(8px);
}

[data-theme="dark"] .header-inner{
  background: linear-gradient(180deg, rgba(10,10,12,0.55), rgba(10,10,12,0.45));
}

/* brand */
.brand{ font-weight:900; font-size:1.05rem; color:transparent; background:linear-gradient(90deg,var(--brand-1), var(--brand-2)); -webkit-background-clip:text; }

/* nav */
.nav{ display:flex; gap:18px; align-items:center; }
.nav a{ color:var(--text); text-decoration:none; font-weight:600; padding:8px 10px; border-radius:8px; transition:var(--transition); }
.nav a:hover{ color:var(--brand-2); background:rgba(0,0,0,0.03); }

/* actions */
.actions{ display:flex; gap:10px; align-items:center; }

/* hamburger (mobile) */
.hamburger{
  display:none;
  width:46px; height:40px; border-radius:10px; background:transparent; border:1px solid var(--border); padding:6px; cursor:pointer;
}
.hamburger .hamburger-inner,
.hamburger .hamburger-inner::before,
.hamburger .hamburger-inner::after{
  width:22px; height:2px; background:var(--text); display:block; border-radius:2px; transition:all 240ms var(--transition); position:relative;
}
.hamburger .hamburger-inner::before,
.hamburger .hamburger-inner::after{
  content:""; position:absolute; left:0;
}
.hamburger .hamburger-inner::before{ top:-7px; }
.hamburger .hamburger-inner::after{ top:7px; }

/* when open */
.hamburger[aria-expanded="true"] .hamburger-inner{ transform: rotate(45deg); }
.hamburger[aria-expanded="true"] .hamburger-inner::before{ transform: rotate(90deg); top:0; }
.hamburger[aria-expanded="true"] .hamburger-inner::after{ opacity:0; }

/* theme toggle */
.theme-toggle{
  background:var(--surface); border:1px solid var(--border); padding:8px; border-radius:10px; cursor:pointer; display:grid; place-items:center;
}
.theme-toggle .icon{ display:inline-block; transition: transform 420ms var(--transition), opacity 300ms var(--transition); color:var(--text); }
.theme-toggle .sun{ transform: translateY(0) scale(1); opacity:1; }
[data-theme="dark"] .theme-toggle .sun{ transform: translateY(-8px) scale(0.6); opacity:0; }
.theme-toggle .moon{ transform: translateY(8px) scale(0.6); opacity:0; }
[data-theme="dark"] .theme-toggle .moon{ transform: translateY(0) scale(1); opacity:1; }

/* hero */
.hero{ min-height:78vh; display:flex; align-items:center; padding:64px 0; }
.hero-grid{ display:grid; grid-template-columns: 1fr 420px; gap:40px; align-items:center; }
.hero-left h1{ font-size:2.6rem; line-height:1.02; margin-bottom:10px; font-weight:800; }
.accent{ background:linear-gradient(90deg,var(--brand-1),var(--brand-2)); -webkit-background-clip:text; color:transparent; }
.lead{ color:var(--muted); margin-bottom:18px; max-width:54ch; }

/* buttons */
.btn{ padding:10px 16px; border-radius:12px; font-weight:700; display:inline-flex; gap:10px; align-items:center; }
.btn-primary{ background:linear-gradient(90deg,var(--brand-1),var(--brand-2)); color:#fff; box-shadow:var(--shadow-lg); border:none; }
.btn-wpp{ background:#25d366; color:#fff; }
.btn-ghost{ background:transparent; border:1px solid var(--border); color:var(--text); }

/* features */
.features{ display:flex; gap:18px; margin-top:16px; list-style:none; padding-left:0; color:var(--muted); }

/* device card */
.device-card{ border-radius:16px; overflow:hidden; box-shadow:var(--shadow-lg); border:1px solid var(--border); background:linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.75)); }
[data-theme="dark"] .device-card{ background:linear-gradient(180deg, rgba(14,14,16,0.6), rgba(14,14,16,0.5)); }
.device-media{ position:relative; width:100%; height:260px; overflow:hidden; cursor:pointer; }
.device-media img{ width:100%; height:100%; object-fit:cover; display:block; }
.play-large{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:72px; height:72px; border-radius:16px; display:grid; place-items:center; background:linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); color:#fff; border:1px solid rgba(255,255,255,0.06); }

/* section, cards, grids */
.section{ padding:72px 0; }
.section-title{ font-size:1.8rem; margin-bottom:8px; font-weight:800; text-align:center; }
.section-lead{ color:var(--muted); text-align:center; margin-bottom:28px; }
.grid{ display:grid; gap:24px; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); margin-top:16px; }
.card{ background:var(--surface); padding:20px; border-radius:12px; border:1px solid var(--border); box-shadow:var(--shadow-sm); }

/* stats */
.stats-grid{ display:flex; gap:18px; justify-content:center; }
.stat-num{ display:block; font-weight:900; font-size:1.6rem; color:var(--brand-2); }
.stat-label{ color:var(--muted); display:block; margin-top:6px; }

/* before-after */
.section-alt{ background: linear-gradient(180deg, rgba(6,6,10,0.01), transparent); }
.before-after-grid{ display:grid; gap:20px; grid-template-columns: repeat(auto-fit, minmax(320px,1fr)); margin-top:20px; }
.ba-card{ border-radius:12px; overflow:hidden; border:1px solid var(--border); background:var(--surface); padding:12px; }
.ba-figure{ position:relative; height:300px; border-radius:10px; overflow:hidden; background:#efefef; touch-action:none; user-select:none; }
.ba-image{ position:absolute; inset:0; background-size:cover; background-position:center; }
.ba-after{ z-index:2; clip-path: inset(0 50% 0 0); transition: clip-path 220ms var(--transition); }
.ba-handle{ position:absolute; left:50%; top:0; bottom:0; width:36px; margin-left:-18px; z-index:3; display:flex; align-items:center; justify-content:center; pointer-events:none; }
.ba-handle span{ width:36px; height:36px; border-radius:10px; background:linear-gradient(180deg,#fff,#f7f7f7); border:1px solid var(--border); box-shadow:var(--shadow-sm); display:flex; align-items:center; justify-content:center; }

/* carousel */
.carousel-wrap{ margin-top:10px; overflow:hidden; }
.carousel-track{ display:flex; gap:18px; padding:10px; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; scroll-behavior:smooth; }
.depo{ min-width:260px; scroll-snap-align:center; padding:18px; border-radius:12px; background:var(--surface); border:1px solid var(--border); }

/* CTA */
.cta-final{ text-align:center; padding:64px 0; }
.cta{ display:inline-block; margin-top:14px; }

/* footer */
.footer{ border-top:1px solid var(--border); padding:36px 0; margin-top:40px; color:var(--muted); }

/* modal */
.modal{ position:fixed; inset:0; display:none; align-items:center; justify-content:center; z-index:2000; padding:18px; }
.modal.show{ display:flex; }
.modal-backdrop{ position:absolute; inset:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); }
.modal-body{ position:relative; width:min(1100px,96%); height:min(64vh,720px); border-radius:12px; overflow:hidden; background:transparent; }
.modal-close{ position:absolute; right:12px; top:12px; z-index:20; background:rgba(255,255,255,0.06); border:0; color:#fff; padding:8px 10px; border-radius:8px; cursor:pointer; }

/* WhatsApp float */
.whatsapp-float{ position:fixed; right:20px; bottom:20px; width:62px; height:62px; border-radius:14px; display:grid; place-items:center; background:linear-gradient(90deg,var(--brand-1),var(--brand-2)); color:#fff; box-shadow:var(--shadow-lg); z-index:1500; }

/* reveal helper */
.reveal{ opacity:0; transform: translateY(12px); transition: opacity 640ms var(--transition), transform 640ms var(--transition); will-change:opacity,transform; }
.reveal.visible{ opacity:1; transform:none; }

/* accessibility */
@media (prefers-reduced-motion: reduce){
  *{ transition:none !important; animation:none !important; scroll-behavior:auto !important; }
}

/* responsiveness */
@media (max-width: 980px){
  .hero-grid{ grid-template-columns: 1fr; gap:20px; }
  .device-media{ height:220px; }
  .nav{ display:none; }
  .hamburger{ display:block; }
}

@media (max-width:520px){
  .hero-left h1{ font-size:1.6rem; }
  .device-media{ height:180px; }
  .ba-figure{ height:200px; }
  .carousel-track{ gap:14px; }
}