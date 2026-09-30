/* =============================================
           KATALOG EFEKTLERİ
           ============================================= */
        (function () {

            /* ── 1. REVEAL (scroll ile kartlar belirir) ── */
            const revealCards = document.querySelectorAll('.reveal-card');
            const revealObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });
            revealCards.forEach(c => revealObserver.observe(c));


            /* ── 2. 3D TILT + ALTIN SPOTLIGHT ── */
            const cards = document.querySelectorAll('.catalog-card');

            cards.forEach(card => {
                const spotlight = card.querySelector('.catalog-spotlight');

                card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;
                    const dx = e.clientX - cx;
                    const dy = e.clientY - cy;

                    /* Maksimum eğim: ±12 derece */
                    const rotY = (dx / rect.width) * 12;
                    const rotX = -(dy / rect.height) * 12;

                    card.classList.remove('tilt-reset');
                    card.classList.add('tilt-active');
                    card.style.transform =
                        `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;

                    /* Spotlight pozisyonu */
                    const px = ((e.clientX - rect.left) / rect.width) * 100;
                    const py = ((e.clientY - rect.top) / rect.height) * 100;
                    if (spotlight) {
                        spotlight.style.background =
                            `radial-gradient(circle at ${px}% ${py}%,
                            rgba(200,130,26,0.22) 0%,
                            rgba(200,130,26,0.06) 35%,
                            transparent 65%)`;
                    }
                });

                card.addEventListener('mouseleave', () => {
                    card.classList.remove('tilt-active');
                    card.classList.add('tilt-reset');
                    card.style.transform =
                        'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
                    if (spotlight) spotlight.style.background = '';
                });
            });


            /* ── 3. İNDİR BUTONU ANİMASYONU ── */
            document.querySelectorAll('.download-btn').forEach(btn => {
                btn.addEventListener('click', function (e) {
                    if (this.classList.contains('downloading') ||
                        this.classList.contains('downloaded')) return;

                    const original = this.innerHTML;
                    this.classList.add('downloading');
                    this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> İndiriliyor...';

                    setTimeout(() => {
                        this.classList.remove('downloading');
                        this.classList.add('downloaded');
                        this.innerHTML = '<i class="fa-solid fa-check"></i> İndirildi';

                        setTimeout(() => {
                            this.classList.remove('downloaded');
                            this.innerHTML = original;
                        }, 3000);
                    }, 1800);
                });
            });

        })();
