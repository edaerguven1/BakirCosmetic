(function () {

            /* ── Gradient Hero Canvas ── */
            const canvas = document.getElementById('hero-canvas');
            if (canvas) {
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
            }


            /* ── IntersectionObserver — genel reveal ── */
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            /* Neden Bakır kartları */
            document.querySelectorAll('.why-card').forEach(el => observer.observe(el));

            /* Marka öğeleri */
            document.querySelectorAll('.brand-item').forEach(el => observer.observe(el));

            /* Hikaye bölümü */
            document.querySelectorAll('.story-reveal').forEach(el => observer.observe(el));

            /* ── Neden Bakır — sayaç animasyonu ── */
            const whyCards = document.querySelectorAll('.why-card');
            const counterObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const numEl = entry.target.querySelector('.why-number');
                    if (!numEl || numEl.dataset.counted) return;

                    // Ignore 7/24
                    if (numEl.textContent.includes('/')) {
                        numEl.dataset.counted = true;
                        return;
                    }

                    numEl.dataset.counted = true;

                    const text = numEl.textContent.trim();
                    const suffix = text.replace(/[0-9]/g, ''); // '+', '/', '24' gibi
                    const number = parseInt(text.replace(/\D/g, ''), 10);

                    if (isNaN(number)) return; // "7/24" gibi sayısal olmayan → olduğu gibi kalsın

                    let start = 0;
                    const duration = 1600;
                    const startTime = performance.now();

                    function tick(now) {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        start = Math.round(eased * number);
                        numEl.textContent = start + suffix;
                        if (progress < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);

                    counterObserver.unobserve(entry.target);
                });
            }, { threshold: 0.4 });

            whyCards.forEach(el => counterObserver.observe(el));


            /* ── Marka duvarı — mouse spotlight ── */
            document.querySelectorAll('.brand-item').forEach(item => {
                item.addEventListener('mousemove', e => {
                    const rect = item.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    item.style.setProperty('--mx', x + '%');
                    item.style.setProperty('--my', y + '%');
                    item.querySelector('::before'); // CSS var güncellenir
                });
            });

        })();
