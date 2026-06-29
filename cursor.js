/**
 * Bakır Cosmetic - Global Custom Cursor
 * Provides a premium gold ring cursor with smooth lag effect.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check for fine pointer (mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // Create cursor elements if they don't exist
    let dot = document.querySelector('.cursor-dot');
    let outline = document.querySelector('.cursor-outline');

    if (!dot) {
        dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);
    }
    if (!outline) {
        outline = document.createElement('div');
        outline.className = 'cursor-outline';
        document.body.appendChild(outline);
    }

    // Cursor position state
    const mouse = { x: -100, y: -100 }; // Current mouse position
    const pos = { x: 0, y: 0 };       // Current cursor-outline position
    const speed = 0.15;               // Follow speed (0 to 1)

    // Update mouse position
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // Dot follows instantly
        dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
    });

    // Animate outline with "lerp" (linear interpolation) for smoothness
    const animate = () => {
        pos.x += (mouse.x - pos.x) * speed;
        pos.y += (mouse.y - pos.y) * speed;

        outline.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

        requestAnimationFrame(animate);
    };
    animate();

    // Handle Hover Effects
    const hoverTargets = 'a, button, .product-card, .brand-item, .comparison-slider';
    
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverTargets)) {
            outline.classList.add('cursor-hover');
            dot.classList.add('cursor-hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverTargets)) {
            outline.classList.remove('cursor-hover');
            dot.classList.remove('cursor-hover');
        }
    });

    // Hide/Show on leave/enter window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        outline.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        outline.style.opacity = '1';
    });
});
