/* ==========================================================
   GSLIMP — Final ULTRA (Apple-like + Nubank gradient + Dark/Light)
   Inclui: fundos, seções com profundidade, hero, mobile, before/after, proteções visuais
========================================================== */

/* IMPORT FONTS */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');

:root{
  /* brand gradient (Nubank-ish) */
  --brand-1: #0066ff;
  --brand-2: #6C00FF;
  --brand-3: #9C4DFF;

  /* light theme soft background (Apple-like) */
  --bg-top: #f7f9fc;
  --bg-mid: #ffffff;
  --bg-bottom: #f7fbff;

  --bg: var(--bg-mid);
  --surface: #ffffff;
  --text: #0b1220;
  --muted: #6b7280;
  --border: rgba(11,17,32,0.06);

  --radius: 14px;
  --radius-lg: 20px;
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
  color:var(--text);
  background: linear-gradient(to bottom, var(--bg-top) 0%, var(--bg-mid) 40%, var(--bg-bottom) 100%);
  transition: background var(--transition), color var(--transition);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
}

/* dark body background override */
[data-theme="dark"] body { background: linear-gradient(180deg, #060608 0%, #0b0c0f 100%); }

/* container */
.container { width:min(92%, var(--maxw)); margin:0 auto; }

/* header */
.header{ position:sticky; top:12px; z-index:1200; padding:6px 0; }
.header-inner{
  display:flex; gap:12px; align-items:center; justify-content:space-between;
  background: linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0.45));
  border-radius:12px; padding:10px 14px; box-shadow:var(--shadow-sm); border:1px solid var(--border);
  backdrop-filter: blur(8px);
}
[data-theme="dark"] .header-inner{ background: linear-gradient(180deg, rgba(10,10,12,0.55), rgba(10,10,12,0.45)); }

/* brand */
.brand{ font-weight:900; font-size:1.05rem; color:transparent; background:linear-gradient(90deg,var(--brand-1), var(--brand-2)); -webkit-background-clip:text; }

/* nav */
.nav{ display:flex; gap:18px; align-items:center; }
.nav a{ color:var(--text); text-decoration:none; font-weight:600; padding:8px 10px; border-radius:8px; transition:var(--transition); }
.nav a:hover{ color:var(--brand-2); background:rgba(0,0,0,0.03); }

/* actions */
.actions{ display:flex; gap:10px; align-items:center; }
.theme-toggle{ background:var(--surface); border:1px solid var(--border); padding:8px; border-radius:10px; cursor:pointer; display:grid; place-items:center; }

/* hamburger */
.hamburger{ display:none; width:46px; height:40px; border-radius:10px; background:transparent; border:1px solid var(--border); padding:6px; cursor:pointer; }
.hamburger .hamburger-inner, .hamburger .hamburger-inner::before, .hamburger .hamburger-inner::after{ width:22px; height:2px; background:var(--text); display:block; border-radius:2px; position:relative; }
.hamburger .hamburger-inner::before{ content:""; position:absolute; left:0; top:-7px; }
.hamburger .hamburger-inner::after{ content:""; position:absolute; left:0; top:7px; }
.hamburger[aria-expanded="true"] .hamburger-inner{ transform: rotate(45deg); }
.hamburger[aria-expanded="true"] .hamburger-inner::before{ transform: rotate(90deg); top:0; }
.hamburger[aria-expanded="true"] .hamburger-inner::after{ opacity:0; }

/* hero */
.hero{ min-height:78vh; display:flex; align-items:center; padding:64px 0; }
.hero-grid{ display:grid; grid-template-columns: 1fr 420px; gap:40px; align-items:center; }
.hero-left h1{ font-size:2.6rem; line-height:1.02; margin-bottom:10px; font-weight:800; color:var(--text); }
.gradient-text{ background:linear-gradient(90deg,var(--brand-1),var(--brand-2)); -webkit-background-clip:text; color:transparent; }
.lead{ color:var(--muted); margin-bottom:18px; max-width:54ch; }

/* hero background (to avoid white-only mobile) */
.hero {
  background: linear-gradient(135deg, rgba(108,0,255,0.95) 0%, rgba(0,102,255,0.9) 100%);
  color:#fff;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  box-shadow: var(--shadow-lg);
}
[data-theme="dark"] .hero { filter: saturate(1.05) brightness(0.95); }

/* buttons */
.btn{ padding:10px 16px; border-radius:12px; font-weight:700; display:inline-flex; gap:10px; align-items:center; }
.btn-primary{ background:linear-gradient(90deg,var(--brand-1),var(--brand-2)); color:#fff; box-shadow:var(--shadow-lg); border:none; }
.btn-wpp{ background:#25d366; color:#fff; border-radius:12px; padding:12px 18px; }
.btn-ghost{ background:transparent; border:1px solid var(--border); color:var(--text); }

/* features */
.features{ display:flex; gap:18px; margin-top:16px; list-style:none; padding-left:0; color:var(--muted); }

/* device card */
.device-card{ border-radius:16px; overflow:hidden; box-shadow:var(--shadow-lg); border:1px solid var(--border); background:linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8)); }
[data-theme="dark"] .device-card{ background:linear-gradient(180deg, rgba(10,10,12,0.6), rgba(10,10,12,0.5)); }
.device-media{ position:relative; width:100%; height:260px; overflow:hidden; cursor:pointer; }
.device-media img{ width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; user-drag: none; -webkit-user-drag: none; }
.play-large{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:72px; height:72px; border-radius:16px; display:grid; place-items:center; background:linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); color:#fff; border:1px solid rgba(255,255,255,0.06); }

/* sections & cards */
.section{ padding:72px 0; background:transparent; }
.section-title{ font-size:1.8rem; margin-bottom:8px; font-weight:800; text-align:center; color:var(--text); }
.section-lead{ color:var(--muted); text-align:center; margin-bottom:28px; }
.grid{ display:grid; gap:24px; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); margin-top:16px; }
.card{ background:var(--surface); padding:20px; border-radius:12px; border:1px solid var(--border); box-shadow:var(--shadow-sm); }

/* stats */
.stats-grid{ display:flex; gap:18px; justify-content:center; }
.stat-num{ display:block; font-weight:900; font-size:1.6rem; color:var(--brand-2); }
.stat-label{ color:var(--muted); display:block; margin-top:6px; }

/* before/after */
.section-alt{ background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent); }
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

/* CTA final */
.cta-final{ text-align:center; padding:64px 0; }
.cta{ display:inline-block; margin-top:14px; }

/* footer */
.footer{ border-top:1px solid var(--border); padding:36px 0; margin-top:40px; color:var(--muted); }

/* modal */
.modal{ position:fixed; inset:0; display:none; align-items:center; justify-content:center; z-index:2000; padding:18px; }
.modal.show{ display:flex; }
.modal-backdrop{ position:absolute; inset:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); }
.modal-body{ position:relative; width:min(1100px,96%); height:min(64vh,720px); border-radius:12px; overflow:hidden; background:transparent; }
.modal-body iframe{ width:100%; height:100%; border:0; }
.modal-close{ position:absolute; right:12px; top:12px; z-index:20; background:rgba(255,255,255,0.06); border:0; color:#fff; padding:8px 10px; border-radius:8px; cursor:pointer; }

/* whatsapp float */
.whatsapp-float{ position:fixed; right:20px; bottom:20px; width:62px; height:62px; border-radius:14px; display:grid; place-items:center; background:linear-gradient(90deg,var(--brand-1),var(--brand-2)); color:#fff; box-shadow:var(--shadow-lg); z-index:1500; }

/* reveal helper */
.reveal{ opacity:0; transform: translateY(12px); transition: opacity 640ms var(--transition), transform 640ms var(--transition); will-change:opacity,transform; }
.reveal.visible{ opacity:1; transform:none; }

/* Accessibility reduce-motion */
@media (prefers-reduced-motion: reduce){
  *{ transition:none !important; animation:none !important; scroll-behavior:auto !important; }
}

/* PROTECTION CSS: block select, prevent drag effects */
* { -webkit-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: transparent; }
img, svg { pointer-events: none; user-drag: none; -webkit-user-drag: none; }

/* responsive */
@media (max-width:980px){
  .hero-grid{ grid-template-columns:1fr; gap:20px; }
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