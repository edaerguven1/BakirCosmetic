/**
 * Bakır Cosmetic - Homepage Hero Slider
 * Dynamic slides for Olaplex, Igora, and Blondme with smooth transitions, progress indicators, and auto-play.
 */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-arrow.prev-slide');
    const nextBtn = document.querySelector('.hero-arrow.next-slide');

    if (slides.length === 0) return;

    let currentSlide = 0;
    let autoPlayInterval = null;
    const slideDuration = 6000; // 6 seconds per slide
    let isTransitioning = false;

    function showSlide(index) {
        if (index === currentSlide && slides[currentSlide].classList.contains('active')) return;
        
        // Remove active from all
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (dots[i]) {
                dots[i].classList.remove('active');
            }
        });

        currentSlide = (index + slides.length) % slides.length;

        // Activate current
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, slideDuration);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Event listeners for controls
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoPlay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startAutoPlay();
        });
    });

    // Pause auto-play when user hovers over controls or dots
    const heroSliderContainer = document.querySelector('.hero-slider-container');
    if (heroSliderContainer) {
        const controls = heroSliderContainer.querySelectorAll('.hero-slider-arrows, .hero-slider-nav, .btn');
        controls.forEach(ctrl => {
            ctrl.addEventListener('mouseenter', stopAutoPlay);
            ctrl.addEventListener('mouseleave', startAutoPlay);
        });
    }

    // Initialize first slide and start auto-play
    showSlide(0);
    startAutoPlay();
});
