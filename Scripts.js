:root {
    --cor-fundo-principal: #0F172A; /* Azul escuro */
    --cor-fundo-card-dark: #1E293B; /* Azul mais claro para cards */
    --cor-fundo-card-light: #F8FAFC; /* Branco muito suave */
    --cor-detalhe-vermelho: #EF4444; /* Vermelho para destaque de antes */
    --cor-texto-claro: #F1F5F9; /* Texto claro */
    --cor-texto-escuro: #334155; /* Texto escuro */
    --cor-gradiente-start-cta: #00C6FF; /* Ciano */
    --cor-gradiente-end-cta: #0072FF; /* Azul mais forte */
}

/* Base e Tipografia */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    color: var(--cor-texto-claro);
    background-color: var(--cor-fundo-principal);
    line-height: 1.6;
}

.poppins {
    font-family: 'Poppins', sans-serif;
}

h1, h2, h3, h4 {
    margin-bottom: 0.5em;
}

h1 { font-size: 3em; font-weight: 800; }
h2 { font-size: 2.2em; font-weight: 700; }
h3 { font-size: 1.5em; font-weight: 600; }

a {
    text-decoration: none;
    color: inherit;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Componentes Comuns */
.tag {
    display: inline-block;
    padding: 6px 15px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.9em;
    color: var(--cor-fundo-principal);
    margin-bottom: 20px;
}

.header-section {
    text-align: center;
    margin-bottom: 60px;
}

.header-section h2 {
    color: white;
}

.icon-wrapper {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--cor-gradiente-start-cta), var(--cor-gradiente-end-cta));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    color: white;
    margin-bottom: 15px;
}

.btn-cta {
    display: inline-flex;
    align-items: center;
    padding: 15px 30px;
    background: linear-gradient(90deg, var(--cor-gradiente-start-cta), var(--cor-gradiente-end-cta));
    border-radius: 10px;
    font-weight: 700;
    text-transform: uppercase;
    transition: transform 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 100, 255, 0.4);
    color: white;
}

.btn-cta:hover {
    transform: translateY(-2px);
}

.btn-wpp-style {
    padding: 0; 
    background: none;
    box-shadow: none;
}

.icon-wpp-wrapper {
    display: flex;
    align-items: center;
    padding: 15px 30px;
    background: linear-gradient(90deg, #10B981, #059669); /* Verde WhatsApp */
    border-radius: 10px;
    transition: background 0.3s ease;
}

.btn-wpp-style .icon-wpp-wrapper i {
    margin-right: 10px;
    font-size: 1.2em;
}

/* --- Seção Hero --- */
#hero {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-top: 100px;
    padding-bottom: 80px;
}

#hero h1 {
    margin-top: 20px;
    margin-bottom: 20px;
}

#hero p {
    max-width: 700px;
    font-size: 1.2em;
    margin-bottom: 40px;
    color: var(--cor-texto-claro);
}

/* --- Seção Stats --- */
#stats {
    background-color: var(--cor-fundo-card-dark);
    padding: 60px 20px;
    display: flex;
    justify-content: space-around;
    text-align: center;
    border-radius: 15px;
    transform: translateY(50%); /* Move a seção para cima */
    margin-bottom: 50px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.stats-card {
    padding: 0 20px;
}

.stats-card h3 {
    font-size: 2.5em;
    font-weight: 800;
    color: var(--cor-gradiente-start-cta);
    margin-bottom: 5px;
}

.stats-card p {
    font-size: 1em;
    color: var(--cor-texto-claro);
}

/* --- Seção Serviços --- */
#servicos {
    padding: 80px 0;
    padding-top: 100px; /* Ajusta o padding para compensar o stats */
    background-color: var(--cor-fundo-principal);
}

.servicos-grid {
    display: grid;
    /* Alterado para permitir 4 ou mais itens. Tenta 4 colunas em telas grandes */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
}

.servico-card {
    background-color: var(--cor-fundo-card-dark);
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    transition: background-color 0.3s ease;
}

.servico-card:hover {
    background-color: var(--cor-ffundo-card-dark);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.servico-card p {
    color: #94A3B8;
    font-size: 0.95em;
}

/* --- Seção Diferenciais --- */
#diferenciais {
    padding: 80px 0;
    background-color: var(--cor-fundo-card-dark);
}

.diferenciais-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.card-dark {
    background-color: var(--cor-fundo-principal);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.card-dark h3 {
    color: var(--cor-gradiente-start-cta);
    margin-top: 10px;
}

.card-dark p {
    color: #94A3B8;
}

/* --- Seção Galeria Antes e Depois (4 Cards Individuais) --- */
#galeria {
    padding: 80px 0;
    background-color: white;
    color: var(--cor-fundo-principal);
}

#galeria .header-section h2 {
    color: var(--cor-fundo-principal);
}

#galeria .header-section p {
    color: #666;
    font-size: 1.1em;
}

.galeria-grid {
    display: grid;
    /* 2 colunas para o layout Antes/Depois/Antes/Depois */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
}

.foto-card {
    position: relative;
    background-color: var(--cor-fundo-card-light);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.foto-card img {
    width: 100%;
    height: 250px; /* Altura fixa para todos os cards */
    display: block;
    object-fit: cover;
}

/* Estilo para os labels ANTES e DEPOIS */
.label-antes,
.label-depois {
    position: absolute;
    bottom: 0; /* Coloca o label no rodapé da imagem */
    left: 0;
    padding: 10px 15px;
    color: white;
    font-weight: 700;
    font-size: 1.1em;
    border-top-right-radius: 10px; /* Para dar um corte suave */
    z-index: 10;
}

.label-antes {
    background-color: var(--cor-detalhe-vermelho); /* Cor vermelha para ANTES */
}

.label-depois {
    background-color: var(--cor-gradiente-end-cta); /* Azul mais forte para DEPOIS */
}


.titulo-foto {
    width: 100%;
    padding: 15px;
    background: white; /* Fundo branco para o título */
    color: var(--cor-fundo-principal);
    font-weight: 600;
    font-size: 1.1em;
    text-align: center;
    border-top: 1px solid #eee;
}


/* --- Seção Depoimentos --- */
#depoimentos {
    padding: 80px 0;
    background-color: var(--cor-fundo-card-light);
    color: var(--cor-fundo-principal);
}

#depoimentos .header-section h2 {
    color: var(--cor-fundo-principal);
}

.depoimentos-grid {
    display: grid;
    /* Alterado para permitir 4 depoimentos em uma grade 2x2 em telas grandes */
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.depoimento-card {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.depoimento-card blockquote {
    font-style: italic;
    margin: 15px 0;
    color: var(--cor-texto-escuro);
    font-size: 1.05em;
}

.perfil {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.perfil img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    object-fit: cover;
}

.perfil strong {
    color: var(--cor-fundo-principal);
}

.perfil span {
    display: block;
    font-size: 0.9em;
    color: #666;
}

.estrelas i {
    color: gold;
    font-size: 1em;
}

/* --- Seção Contato --- */
#solicite-orcamento {
    padding: 80px 0;
    background-color: var(--cor-fundo-principal);
    text-align: center;
}

.tag-contato {
    background-color: #FFEBCC;
    color: var(--cor-fundo-principal);
}

.contato-wrapper {
    background-color: var(--cor-fundo-card-dark);
    padding: 40px;
    border-radius: 10px;
    max-width: 800px;
    margin: 0 auto;
}

.contato-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    text-align: left;
}

.info-item {
    display: flex;
    align-items: flex-start;
}

.icon-box {
    background: linear-gradient(135deg, var(--cor-gradiente-start-cta), var(--cor-gradiente-end-cta));
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    margin-right: 15px;
    flex-shrink: 0;
}

.details span {
    font-weight: 700;
    color: var(--cor-gradiente-start-cta);
    display: block;
    margin-bottom: 5px;
}

.details p {
    margin: 0;
    color: var(--cor-texto-claro);
    font-size: 1em;
}


/* --- Rodapé --- */
footer {
    background-color: var(--cor-fundo-card-dark);
    padding: 50px 0 10px;
    color: #94A3B8;
}

.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 40px;
    padding-bottom: 40px;
}

.footer-about h3 {
    color: white;
    font-size: 1.8em;
}

.footer-about p {
    font-size: 0.9em;
}

.footer-social a {
    font-size: 1.5em;
    margin-right: 15px;
    color: #94A3B8;
    transition: color 0.3s ease;
}

.footer-social a:hover {
    color: var(--cor-gradiente-start-cta);
}

.footer-links ul {
    list-style: none;
}

.footer-links a {
    display: block;
    margin-bottom: 10px;
    transition: color 0.3s ease;
    font-size: 0.95em;
}

.footer-links a:hover {
    color: white;
}

.copyright {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #334155;
    font-size: 0.8em;
    color: #64748B;
}

/* --- Botão Flutuante WhatsApp --- */
.whatsapp-float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 20px;
    right: 20px;
    background-color: #25d366;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    font-size: 30px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s ease;
}

.whatsapp-float:hover {
    transform: scale(1.1);
}

/* --- Media Queries (Responsividade) --- */
@media (max-width: 900px) {
    .contato-info-grid {
        grid-template-columns: 1fr;
    }

    .footer-grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 768px) {
    h1 { font-size: 2.5em; }
    h2 { font-size: 1.8em; }

    #hero {
        min-height: 60vh;
    }

    #stats {
        flex-direction: column;
        align-items: center;
        transform: translateY(0);
        margin-bottom: 0;
        border-radius: 0;
    }

    .stats-card {
        padding: 15px 0;
        border-bottom: 1px solid #334155;
        width: 100%;
    }

    .stats-card:last-child {
        border-bottom: none;
    }
    
    .servicos-grid {
        grid-template-columns: 1fr;
    }

    .galeria-grid {
        grid-template-columns: 1fr; /* Em telas menores, 1 card por linha */
    }

    .foto-card .image-wrapper {
        flex-direction: column; /* Em telas menores, imagens 'antes' e 'depois' empilhadas */
    }

    .foto-card img {
        width: 100%; /* Cada imagem ocupa 100% da largura do card */
    }

    .label-antes,
    .label-depois {
        position: relative; /* Ajusta o posicionamento para empilhamento */
        top: auto;
        left: auto;
        margin: 10px auto 0; /* Centraliza e adiciona margem */
        width: fit-content; /* Largura se ajusta ao conteúdo */
    }
    
    .label-depois {
        margin-left: auto; /* Centraliza o label depois também */
    }


    .depoimentos-grid {
        grid-template-columns: 1fr;
    }

    .footer-grid {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .footer-about, .footer-links, .footer-contact {
        padding-bottom: 20px;
        border-bottom: 1px solid #334155;
    }
    
    .footer-about:last-child { border-bottom: none; }
    
    .footer-social {
        justify-content: center;
        display: flex;
    }
    
    .info-item {
        justify-content: center;
        text-align: center;
    }

    .icon-box {
        margin-right: 0;
        margin-bottom: 10px;
    }

    .info-item {
        flex-direction: column;
        align-items: center;
    }
}
