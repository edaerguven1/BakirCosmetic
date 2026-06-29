/**
 * Bakır Cosmetic - Hero 3D Waving Grid
 * Renders a dynamic 3D grid with particles that reacts to mouse movement.
 */

class Hero3D {
    constructor() {
        this.container = document.querySelector('.hero-bg');
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        this.particles = null;
        this.count = 50; // Grid resolution
        this.spacing = 1.5;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        const positions = new Float32Array(this.count * this.count * 3);
        const colors = new Float32Array(this.count * this.count * 3);
        
        const goldColor = new THREE.Color(0xD4AF37);
        const darkColor = new THREE.Color(0x333333);

        let i = 0;
        for (let x = 0; x < this.count; x++) {
            for (let z = 0; z < this.count; z++) {
                // Pos
                positions[i] = (x - this.count / 2) * this.spacing;
                positions[i + 1] = 0;
                positions[i + 2] = (z - this.count / 2) * this.spacing;

                // Color (gradient based on position)
                const mixedColor = goldColor.clone().lerp(darkColor, (x / this.count));
                colors[i] = mixedColor.r;
                colors[i + 1] = mixedColor.g;
                colors[i + 2] = mixedColor.b;

                i += 3;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.12,
            vertexColors: true,
            transparent: true,
            opacity: 1.0,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);

        // Add structural lines (Wireframe effect)
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0xD4AF37, 
            transparent: true, 
            opacity: 0.1,
            blending: THREE.AdditiveBlending 
        });
        this.lines = new THREE.LineSegments(geometry, lineMaterial);
        this.scene.add(this.lines);

        this.camera.position.y = 15;
        this.camera.position.z = 25;
        this.camera.lookAt(0, 0, 0);
    }

    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.targetX = (e.clientX - window.innerWidth / 2) * 0.01;
            this.targetY = (e.clientY - window.innerHeight / 2) * 0.01;
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const positions = this.particles.geometry.attributes.position.array;
        const time = Date.now() * 0.001;

        // Smooth camera movement based on mouse
        this.mouseX += (this.targetX - this.mouseX) * 0.05;
        this.mouseY += (this.targetY - this.mouseY) * 0.05;
        
        this.particles.rotation.y = this.mouseX * 0.2;
        this.particles.rotation.x = this.mouseY * 0.1;
        if (this.lines) {
            this.lines.rotation.y = this.mouseX * 0.2;
            this.lines.rotation.x = this.mouseY * 0.1;
        }

        let i = 0;
        for (let x = 0; x < this.count; x++) {
            for (let z = 0; z < this.count; z++) {
                // positions[i + 1] = Math.sin(xAngle + time) * 1.5 + Math.cos(zAngle + time) * 1.5;
                positions[i + 1] = 0; 

                i += 3;
            }
        }

        this.particles.geometry.attributes.position.needsUpdate = true;
        this.lines.geometry.attributes.position.needsUpdate = true;
        this.renderer.render(this.scene, this.camera);
    }
}

// Global start
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        new Hero3D();
    } else {
        console.warn('Three.js not loaded. Hero 3D skipped.');
    }
});
