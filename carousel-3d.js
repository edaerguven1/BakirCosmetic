/**
 * Bakır Cosmetic - 3D Ring Carousel Logic
 * Optimized for performance and smooth high-end transitions.
 */

(function () {
    const scene = document.getElementById('carousel3dScene');
    if (!scene) return;

    const items = Array.from(document.querySelectorAll('.carousel-3d-item'));
    const btnPrev = document.getElementById('carousel3dPrev');
    const btnNext = document.getElementById('carousel3dNext');

    const N = items.length;
    let RADIUS = 380;
    let current = 0;
    let animating = false;

    /* ---------- Calculate and Apply Positions ---------- */
    function applyPositions(instant) {
        items.forEach((item, i) => {
            const angle = ((i - current + N) % N) / N * Math.PI * 2;
            const sinA = Math.sin(angle);
            const cosA = Math.cos(angle);

            const x = sinA * RADIUS;
            const z = cosA * RADIUS;

            // z: -R (back) ... +R (front)
            const normZ = (z + RADIUS) / (RADIUS * 2); // 0 → 1
            const scale = 0.65 + normZ * 0.38;
            const opacity = 0.35 + normZ * 0.65;
            const blur = Math.max(0, (1 - normZ) * 2.0);
            const brightness = 0.5 + normZ * 0.5;
            const zIndex = Math.round(normZ * 100);

            item.style.willChange = 'transform, opacity';
            item.style.transition = instant
                ? 'none'
                : 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.8s ease';

            item.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${scale})`;
            item.style.opacity = opacity;
            item.style.zIndex = zIndex;
            item.style.filter = normZ > 0.9 ? 'none' : `blur(${blur.toFixed(1)}px) brightness(${brightness.toFixed(2)})`;

            // Active Class
            item.classList.toggle('is-active', i === current);
            item.setAttribute('aria-current', i === current ? 'true' : 'false');
        });

    }

    /* ---------- Rotation Logic ---------- */
    function rotateTo(targetIdx) {
        if (animating || targetIdx === current) return;
        animating = true;

        let diff = ((targetIdx - current) + N) % N;
        const dir = diff <= N / 2 ? 1 : -1;
        const steps = dir === 1 ? diff : N - diff;

        let step = 0;
        function tick() {
            if (step >= steps) {
                animating = false;
                return;
            }
            current = ((current + dir) + N) % N;
            applyPositions(false);
            step++;
            setTimeout(tick, 100);
        }
        tick();
    }

    function rotateBy(dir) {
        if (animating) return;
        current = ((current + dir) + N) % N;
        applyPositions(false);
    }

    /* ---------- Event Listeners ---------- */
    items.forEach((item, i) => {
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `${item.dataset.name || `Proje ${i + 1}`} projesini göster`);
        item.addEventListener('click', () => rotateTo(i));
        item.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                rotateTo(i);
            }
        });
    });

    if (btnPrev) btnPrev.addEventListener('click', () => rotateBy(-1));
    if (btnNext) btnNext.addEventListener('click', () => rotateBy(1));

    // Keyboard support
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') rotateBy(-1);
        if (e.key === 'ArrowRight') rotateBy(1);
    });

    // Touch / Swipe Support
    let touchStartX = 0;
    scene.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    scene.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) rotateBy(dx > 0 ? -1 : 1);
    });

    /* ---------- Responsive Scaling ---------- */
    function updateRadius() {
        const w = window.innerWidth;
        RADIUS = w < 600 ? 190 : w < 1000 ? 280 : 380;
        applyPositions(true);
    }

    // Start
    updateRadius();
    window.addEventListener('resize', updateRadius);

})();
