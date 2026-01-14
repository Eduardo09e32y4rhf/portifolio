const translations = {
  pt: {
    brandSub: "Consultoria Genealógica",
    navHome: "Início",
    navServices: "Serviços",
    navAbout: "Sobre",
    navTestimonials: "Depoimentos",
    navContact: "Contato",
    heroTitle: "Seu direito pode se tornar um <em>passaporte global</em>",
    heroSubtitle: "Assessoria completa em cidadania portuguesa, italiana e espanhola.",
    heroCTA: "Falar com um especialista",
    heroPoint1: "✔️ Atendimento internacional",
    heroPoint2: "✔️ Pesquisa genealógica completa",
    heroPoint3: "✔️ Processo claro e acompanhado",
    servicesTitle: "Nossas Especialidades",
    srvPT: "Cidadania Portuguesa",
    srvPTDesc: "Tradicional e por ascendência sefardita.",
    srvIT: "Cidadania Italiana",
    srvITDesc: "Pesquisa e organização documental.",
    srvES: "Cidadania Espanhola",
    srvESDesc: "Orientação estratégica.",
    aboutTitle: "Quem Somos",
    aboutText: "Consultoria especializada em cidadanias e genealogia.",
    testimonialsTitle: "Depoimentos",
    testimonial1: "Equipe extremamente profissional.",
    contactTitle: "Atendimento via WhatsApp",
    contactText: "Fale diretamente com nossa equipe."
  },

  en: {
    brandSub: "Genealogy Consulting",
    navHome: "Home",
    navServices: "Services",
    navAbout: "About",
    navTestimonials: "Testimonials",
    navContact: "Contact",
    heroTitle: "Your right can become a <em>global passport</em>",
    heroSubtitle: "Complete support for Portuguese, Italian and Spanish citizenship.",
    heroCTA: "Talk to a specialist",
    heroPoint1: "✔️ International service",
    heroPoint2: "✔️ Full genealogy research",
    heroPoint3: "✔️ Clear process",
    servicesTitle: "Our Services",
    srvPT: "Portuguese Citizenship",
    srvPTDesc: "Traditional and Sephardic ancestry.",
    srvIT: "Italian Citizenship",
    srvITDesc: "Research and documentation.",
    srvES: "Spanish Citizenship",
    srvESDesc: "Strategic guidance.",
    aboutTitle: "About Us",
    aboutText: "Specialized consulting in citizenships.",
    testimonialsTitle: "Testimonials",
    testimonial1: "Extremely professional team.",
    contactTitle: "WhatsApp Support",
    contactText: "Talk directly with our team."
  },

  es: {
    brandSub: "Consultoría Genealógica",
    navHome: "Inicio",
    navServices: "Servicios",
    navAbout: "Sobre",
    navTestimonials: "Testimonios",
    navContact: "Contacto",
    heroTitle: "Tu derecho puede ser un <em>pasaporte global</em>",
    heroSubtitle: "Asesoría completa en ciudadanías europeas.",
    heroCTA: "Hablar con un especialista",
    heroPoint1: "✔️ Atención internacional",
    heroPoint2: "✔️ Investigación genealógica",
    heroPoint3: "✔️ Proceso claro",
    servicesTitle: "Especialidades",
    srvPT: "Ciudadanía Portuguesa",
    srvPTDesc: "Tradicional y sefardí.",
    srvIT: "Ciudadanía Italiana",
    srvITDesc: "Documentación y linaje.",
    srvES: "Ciudadanía Española",
    srvESDesc: "Orientación estratégica.",
    aboutTitle: "Quiénes Somos",
    aboutText: "Consultoría especializada.",
    testimonialsTitle: "Testimonios",
    testimonial1: "Equipo muy profesional.",
    contactTitle: "Atención por WhatsApp",
    contactText: "Habla directamente con el equipo."
  }
};

document.querySelectorAll(".lang-switch button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-switch button").forEach(b => b.classList.remove("active"));
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