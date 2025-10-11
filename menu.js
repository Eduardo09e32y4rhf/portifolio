/* RESET */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #000; color: #fff; font-family: 'Roboto', sans-serif; line-height: 1.6; scroll-behavior: smooth; }
a { text-decoration: none; color: inherit; }

/* NAVBAR */
nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 50px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(6px);
  position: fixed; width: 100%; top: 0; z-index: 1000;
  transition: background 0.3s;
}
nav .logo { font-size: 1.7rem; font-weight: bold; font-family: 'Orbitron', sans-serif; color: #0ff; letter-spacing: 2px; }
nav ul { list-style: none; display: flex; gap: 25px; }
nav ul li a { font-weight: bold; transition: color 0.3s; }
nav ul li a:hover { color: #0ff; }
.menu-toggle { display: none; flex-direction: column; cursor: pointer; }
.menu-toggle div { width: 25px; height: 3px; background: #fff; margin: 4px 0; transition: 0.3s; }
@media (max-width: 768px) {
  nav ul { display: none; flex-direction: column; position: absolute; top: 70px; right: 0; width: 200px; background: #111; padding: 20px; }
  nav ul.active { display: flex; }
  .menu-toggle { display: flex; }
}

/* HERO */
.hero {
  height: 100vh;
  background: url('https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1600&q=80') no-repeat center center/cover;
  display: flex; justify-content: center; align-items: center;
  text-align: center; padding: 0 20px; position: relative;
  animation: heroZoom 20s infinite alternate ease-in-out;
}
.hero::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); }
.hero div { position: relative; z-index: 1; animation: fadeIn 2s ease-in-out; }
.hero h1 { font-size: 3rem; margin-bottom: 20px; color: #0ff; font-family: 'Orbitron', sans-serif; }
.hero p { font-size: 1.2rem; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes heroZoom { 0% { background-size: 100% auto; } 100% { background-size: 110% auto; } }

/* SECTIONS */
section { padding: 100px 50px; text-align: center; }
section h2 { font-size: 2rem; margin-bottom: 30px; color: #0ff; font-family: 'Orbitron', sans-serif; }
section p { max-width: 800px; margin: auto; }

/* SERVIÇOS */
.services { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 40px; }
.service { background: #111; padding: 30px; border-radius: 10px; transition: transform 0.3s, background 0.3s; font-size:1.1rem; }
.service:hover { background: #0ff; color: #000; transform: translateY(-10px); }
.service p { font-size: 14px; margin-top: 8px; opacity: 0.9; }

/* ACIONISTAS */
.team { display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; margin-top: 40px; }
.member { background: #111; padding: 20px; border-radius: 10px; width: 250px; transition: transform 0.3s; }
.member:hover { transform: scale(1.05); }
.member img { width: 100%; border-radius: 10px; margin-bottom: 15px; }
.member p.role { font-weight: bold; color: #007bff; margin-bottom: 5px; }
.member p.desc { font-size: 14px; opacity: 0.9; }

/* DEPOIMENTOS */
.testimonials { background: #111; padding: 80px 50px; }
.testimonial-container { max-width: 800px; margin: auto; position: relative; overflow: hidden; }
.testimonial-slide { display: flex; transition: transform 0.5s ease-in-out; }
.testimonial { min-width: 100%; background: #222; padding: 30px; border-radius: 10px; margin: 0 10px; box-sizing: border-box; }
.testimonial p { font-style: italic; margin-bottom: 10px; }
.testimonial h4 { color: #0ff; }

/* CONTATO */
.contact a.whatsapp-link { color: #0ff; font-weight: bold; font-size: 1.1rem; }

/* WHATSAPP FIXO */
.whatsapp-fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #25d366;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  transition: transform 0.3s;
}
.whatsapp-fixed:hover { transform: scale(1.1); }
.whatsapp-fixed img { width: 35px; height: 35px; }

/* FOOTER */
footer { background: #111; text-align: center; padding: 20px; margin-top: 40px; font-size: 0.9rem; color: #aaa; }
footer a { color: #0ff; margin: 0 10px; transition: 0.3s; }
footer a:hover { color: #fff; }
