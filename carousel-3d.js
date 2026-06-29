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
    const infoName = document.getElementById('carousel-info-name');
    const infoSub = document.getElementById('carousel-info-sub');

    const N = items.length;
    let RADIUS = 300; 
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
            const scale = 0.45 + normZ * 0.7;
            const opacity = 0.15 + normZ * 0.85;
            const blur = (1 - normZ) * 8;
            const brightness = 0.3 + normZ * 0.7;
            const zIndex = Math.round(normZ * 100);

            item.style.transition = instant
                ? 'none'
                : 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.8s ease, filter 0.8s ease';

            item.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${scale})`;
            item.style.opacity = opacity;
            item.style.zIndex = zIndex;
            item.style.filter = `blur(${blur}px) brightness(${brightness})`;

            // Active Class
            item.classList.toggle('is-active', i === current);
        });

        // Update Info text
        const active = items[current];
        if (active && infoName && infoSub) {
            infoName.textContent = active.dataset.name || '';
            infoSub.textContent = active.dataset.sub || '';
            
            // Fade effect for info
            infoName.style.opacity = '1';
            infoSub.style.opacity = '1';
        }
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
        item.addEventListener('click', () => rotateTo(i));
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
        RADIUS = w < 600 ? 180 : w < 1000 ? 250 : 350;
        applyPositions(true);
    }

    // Start
    updateRadius();
    window.addEventListener('resize', updateRadius);

})();
