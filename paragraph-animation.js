// Intersection Observer per animazione elementi
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Seleziona tutti gli elementi da animare (contenitori, non singoli testi)
const animatedElements = document.querySelectorAll('.grid-image, .bio-box, .about-image, .about-image-right img, .work-box, .gallery-full, .gallery-half, .about-paragraph');
animatedElements.forEach(element => {
    observer.observe(element);
});
