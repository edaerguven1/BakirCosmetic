/* ── Gradient Hero Canvas ── */
        (function () {
            const canvas = document.getElementById('hero-canvas');
            const ctx = canvas.getContext('2d');
            let W, H, frame = 0;

            function resize() {
                W = canvas.width = canvas.offsetWidth;
                H = canvas.height = canvas.offsetHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            const orbs = [
                { bx: 0.15, by: 0.5, r: 0.6, speed: 0.006, phase: 0 },
                { bx: 0.85, by: 0.3, r: 0.5, speed: 0.009, phase: 2.1 },
                { bx: 0.5, by: 0.85, r: 0.45, speed: 0.007, phase: 4.2 },
                { bx: 0.3, by: 0.1, r: 0.38, speed: 0.011, phase: 1.0 },
            ];

            const C1 = [200, 130, 26];
            const C2 = [150, 80, 10];

            function draw() {
                frame++;
                ctx.clearRect(0, 0, W, H);
                ctx.fillStyle = '#080808';
                ctx.fillRect(0, 0, W, H);

                orbs.forEach((o, i) => {
                    const x = (o.bx + Math.sin(frame * o.speed + o.phase) * 0.18) * W;
                    const y = (o.by + Math.cos(frame * o.speed * 0.7 + o.phase) * 0.22) * H;
                    const r = o.r * Math.min(W, H);
                    const col = i % 2 === 0 ? C1 : C2;
                    const alpha = [0.16, 0.10, 0.07, 0.05][i];

                    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
                    g.addColorStop(0, `rgba(${col},${alpha})`);
                    g.addColorStop(0.5, `rgba(${col},${alpha * 0.3})`);
                    g.addColorStop(1, `rgba(0,0,0,0)`);
                    ctx.fillStyle = g;
                    ctx.fillRect(0, 0, W, H);
                });

                /* Dalga çizgileri */
                for (let i = 0; i < 7; i++) {
                    const y = (H / 8) * (i + 1) + Math.sin(frame * 0.012 + i * 0.9) * 10;
                    ctx.beginPath();
                    ctx.moveTo(0, y); ctx.lineTo(W, y);
                    ctx.strokeStyle = `rgba(200,130,26,${0.02 + Math.sin(frame * 0.018 + i) * 0.008})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }

                /* Köşe aksen noktaları */
                [[40, 40], [W - 40, 40], [40, H - 40], [W - 40, H - 40]].forEach(([x, y], i) => {
                    const a = 0.25 + Math.sin(frame * 0.04 + i) * 0.18;
                    ctx.beginPath();
                    ctx.arc(x, y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(200,130,26,${a})`;
                    ctx.fill();
                });

                requestAnimationFrame(draw);
            }
            draw();
        })();

/* Additional page interactions */

(function () {

            /* ── Scroll reveal ── */
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.contact-left, .contact-right')
                .forEach(el => observer.observe(el));


            /* ── Ripple efekti — Gönder butonu ── */
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.addEventListener('click', function (e) {
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;

                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple');
                    ripple.style.cssText =
                        `width:${size}px; height:${size}px; left:${x}px; top:${y}px;`;
                    this.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 700);
                });
            }


            /* ── İletişim kartları — staggered reveal ── */
            const infoCards = document.querySelectorAll('.info-card');
            const cardObserver = new IntersectionObserver(entries => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                        }, i * 100);
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            infoCards.forEach((card, i) => {
                card.style.opacity = '0';
                card.style.transform = 'translateX(-20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, background 0.35s ease, border-color 0.35s ease';
                cardObserver.observe(card);
            });


            /* ── Çalışma saatleri reveal ── */
            const hourItems = document.querySelectorAll('.hour-item');
            const hourObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const items = document.querySelectorAll('.hour-item');
                        items.forEach((item, i) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, i * 80);
                        });
                        hourObserver.disconnect();
                    }
                });
            }, { threshold: 0.3 });

            hourItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(15px)';
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.3s, border-color 0.3s';
                hourObserver.observe(item);
            });

        })();
