
const translations = {
  pt: {
    brand: "Consultoria Genealógica",
    navInicio: "Início",
    navServicos: "Serviços",
    navSobre: "Sobre",
    navDepoimentos: "Depoimentos",
    navContato: "Contato",
    heroTitle: "Transforme sua história em um <em>passaporte global</em>",
    heroDesc: "Assessoria completa em cidadania europeia com segurança, clareza e estratégia.",
    hero1: "✔ Atendimento internacional",
    hero2: "✔ Pesquisa genealógica profunda",
    hero3: "✔ Processo acompanhado do início ao fim",
    servicesTitle: "Especialidades",
    srvPT: "Cidadania Portuguesa",
    srvPTDesc: "Processos tradicionais e sefarditas.",
    srvIT: "Cidadania Italiana",
    srvITDesc: "Reconhecimento por descendência.",
    srvES: "Cidadania Espanhola",
    srvESDesc: "Assessoria estratégica.",
    aboutTitle: "Quem Somos",
    aboutDesc: "Consultoria especializada em cidadania internacional.",
    aboutHighlight: "Não é apenas um site. É uma estrutura de sucesso.",
    depTitle: "Depoimentos",
    depText: "A equipe organizou todo o meu processo com excelência.",
    contactTitle: "Atendimento via WhatsApp",
    contactDesc: "Clique abaixo e fale com nossa equipe."
  },

  en: {
    brand: "Genealogy Consulting",
    navInicio: "Home",
    navServicos: "Services",
    navSobre: "About",
    navDepoimentos: "Testimonials",
    navContato: "Contact",
    heroTitle: "Turn your history into a <em>global passport</em>",
    heroDesc: "Complete support for European citizenship.",
    hero1: "✔ International service",
    hero2: "✔ Deep genealogy research",
    hero3: "✔ End-to-end support",
    servicesTitle: "Specialties",
    srvPT: "Portuguese Citizenship",
    srvPTDesc: "Traditional and Sephardic processes.",
    srvIT: "Italian Citizenship",
    srvITDesc: "Recognition by descent.",
    srvES: "Spanish Citizenship",
    srvESDesc: "Strategic advisory.",
    aboutTitle: "About Us",
    aboutDesc: "Specialized international consulting.",
    aboutHighlight: "Not just a website. A success structure.",
    depTitle: "Testimonials",
    depText: "Extremely professional team.",
    contactTitle: "WhatsApp Support",
    contactDesc: "Click below to talk to us."
  },

  es: {
    brand: "Consultoría Genealógica",
    navInicio: "Inicio",
    navServicos: "Servicios",
    navSobre: "Sobre",
    navDepoimentos: "Testimonios",
    navContato: "Contacto",
    heroTitle: "Convierte tu historia en un <em>pasaporte global</em>",
    heroDesc: "Asesoría completa en ciudadanía europea.",
    hero1: "✔ Atención internacional",
    hero2: "✔ Investigación genealógica",
    hero3: "✔ Acompañamiento completo",
    servicesTitle: "Especialidades",
    srvPT: "Ciudadanía Portuguesa",
    srvPTDesc: "Procesos tradicionales y sefardíes.",
    srvIT: "Ciudadanía Italiana",
    srvITDesc: "Reconocimiento por descendencia.",
    srvES: "Ciudadanía Española",
    srvESDesc: "Asesoría estratégica.",
    aboutTitle: "Quiénes Somos",
    aboutDesc: "Consultoría especializada internacional.",
    aboutHighlight: "No es solo un sitio. Es una estructura de éxito.",
    depTitle: "Testimonios",
    depText: "Equipo muy profesional.",
    contactTitle: "Atención por WhatsApp",
    contactDesc: "Haz clic y habla con nosotros."
  }
};

document.querySelectorAll(".lang button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const lang = btn.dataset.lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  });
});