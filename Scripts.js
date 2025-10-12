// ------------------------------------
// MENU MOBILE
// ------------------------------------
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});


// ------------------------------------
// DEPOIMENTOS (Carrossel com Dots e Hover)
// ------------------------------------
const testimonialSlide = document.getElementById('testimonialSlide');
const testimonialDotsContainer = document.getElementById('testimonialDots');
const totalTestimonials = testimonialSlide.children.length;
let currentTestimonialIndex = 0;
let testimonialSlideInterval;

// Gera os dots dinamicamente
for (let i = 0; i < totalTestimonials; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = i;
    testimonialDotsContainer.appendChild(dot);
}

function updateTestimonialDots() {
    document.querySelectorAll('.testimonial-dots .dot').forEach(dot => dot.classList.remove('active'));
    document.querySelector(`.testimonial-dots .dot[data-index="${currentTestimonialIndex}"]`).classList.add('active');
}

function moveTestimonialSlide(index) {
    currentTestimonialIndex = index;
    testimonialSlide.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
    updateTestimonialDots();
}

function startTestimonialSlider() {
    testimonialSlideInterval = setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonials;
        moveTestimonialSlide(currentTestimonialIndex);
    }, 4000);
}

testimonialDotsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
        clearInterval(testimonialSlideInterval);
        moveTestimonialSlide(parseInt(e.target.dataset.index));
        startTestimonialSlider(); 
    }
});

const testimonialContainer = document.querySelector('.testimonial-container');
testimonialContainer.addEventListener('mouseenter', () => clearInterval(testimonialSlideInterval));
testimonialContainer.addEventListener('mouseleave', startTestimonialSlider);

moveTestimonialSlide(0); 
startTestimonialSlider(); 


// ------------------------------------
// CONTADOR (Rápido e na Visibilidade)
// ------------------------------------
const counterElement = document.getElementById("counter");
const counterTarget = 4000;
let counterAnimationStarted = false;

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimationStarted) {
            counterAnimationStarted = true;
            const duration = 1500; // 1.5 segundos
            let startTime;

            function animateCounter(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1); 

                let currentCount = Math.floor(percentage * counterTarget);
                counterElement.textContent = `+${currentCount.toLocaleString('pt-BR')} Clientes Atendidos`;

                if (percentage < 1) {
                    requestAnimationFrame(animateCounter);
                } else {
                    counterElement.textContent = `+${counterTarget.toLocaleString('pt-BR')} Clientes Atendidos`; 
                }
            }
            requestAnimationFrame(animateCounter);
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.5 }); 

counterObserver.observe(counterElement);


// ------------------------------------
// SOBRE - CARROSSEL DE IMAGENS (Loop Infinito)
// ------------------------------------
const sobreTrack = document.getElementById("sobreTrack");
let sobreIdx = 0;
const numOriginalSobreItems = 3;
let sobreInterval;

function updateSobreTrack() {
    sobreIdx = (sobreIdx + 1);
    const itemToTranslate = sobreTrack.children[0].offsetWidth;

    if (sobreIdx > numOriginalSobreItems) {
        sobreTrack.style.transition = 'none';
        sobreIdx = 1;
        sobreTrack.style.transform = `translateX(-${sobreIdx * itemToTranslate}px)`;
        void sobreTrack.offsetWidth; // Força reflow
        sobreTrack.style.transition = 'transform 1s ease';
    } else {
        sobreTrack.style.transition = 'transform 1s ease';
    }

    sobreTrack.style.transform = `translateX(-${sobreIdx * itemToTranslate}px)`;
}

function startSobreSlider() {
    sobreInterval = setInterval(updateSobreTrack, 2500);
}

sobreTrack.addEventListener('mouseenter', () => clearInterval(sobreInterval));
sobreTrack.addEventListener('mouseleave', startSobreSlider);

startSobreSlider();
