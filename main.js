document.addEventListener('DOMContentLoaded', () => {

    // Custom cursor logic moved to standalone cursor.js for modularity.

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Before / After Slider Logic ---
    const sliderContainer = document.querySelector('.comparison-slider');
    const overlay = document.querySelector('.c-overlay');
    const handle = document.querySelector('.c-handle');
    let isDragging = false;

    if (sliderContainer && overlay && handle) {

        const moveSlider = (e) => {
            if (!isDragging) return;

            // Get X position relative to container
            const rect = sliderContainer.getBoundingClientRect();
            let x = (e.clientX || e.touches[0].clientX) - rect.left;

            // Clamp values
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;

            const percentage = (x / rect.width) * 100;

            overlay.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        };

        // Mouse Events
        handle.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        document.addEventListener('mousemove', moveSlider);

        // Touch Events
        handle.addEventListener('touchstart', () => isDragging = true);
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', moveSlider);
    }

    // --- Product Catalog Logic ---
    // --- Product Catalog Logic ---
    let allProducts = [];
    let currentFiltered = [];

    const normalizeFilterText = (value = '') => value
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ı/g, 'i')
        .toLocaleLowerCase('tr-TR')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();

    const canonicalBrandLabel = (brand = '', productName = '') => {
        const brandKey = normalizeFilterText(brand).replace(/\s/g, '');
        const productKey = normalizeFilterText(productName).replace(/\s/g, '');

        if (brandKey.includes('morfose')) return 'Morfose';
        if (brandKey.includes('osis') || productKey.includes('osis')) return 'Osis+';
        if (brandKey.includes('schwarzkopf') || brandKey.includes('igora')) return 'Schwarzkopf';

        return brand.toString().trim();
    };

    const canonicalBrandKey = (brand = '', productName = '') =>
        normalizeFilterText(canonicalBrandLabel(brand, productName)).replace(/\s/g, '');

    // Pagination State
    const ITEMS_PER_PAGE = 12;
    let currentPage = 1;

    // Initialize Catalog
    window.initProductCatalog = async () => {
        try {
            // Check if window.PRODUCT_DATA exists (loaded from products_db.js)
            if (window.PRODUCT_DATA) {
                allProducts = window.PRODUCT_DATA.map(product => ({
                    ...product,
                    brand: canonicalBrandLabel(product.brand, product.name)
                }));
            } else {
                console.error("Product database not loaded!");
                allProducts = [];
            }

            currentFiltered = [...allProducts];

            // Check for initial URL params
            const urlParams = new URLSearchParams(window.location.search);
            const paramCategory = urlParams.get('category');
            const paramBrand = urlParams.get('brand');

            if (paramCategory) {
                const btn = [...document.querySelectorAll('#category-filters button')].find(button => {
                    if (button.dataset.filter === paramCategory) return true;
                    return (button.dataset.group || '').split(',').includes(paramCategory);
                });
                if (btn) btn.click();
                else renderProducts();
            } else if (paramBrand) {
                const requestedBrandKey = canonicalBrandKey(paramBrand);
                const btn = [...document.querySelectorAll('#brand-filters button[data-brand]')]
                    .find(button => canonicalBrandKey(button.dataset.brand) === requestedBrandKey);

                if (btn) {
                    btn.click();
                } else {
                    currentFiltered = allProducts.filter(product =>
                        canonicalBrandKey(product.brand, product.name) === requestedBrandKey
                    );
                    renderProducts();
                }
            } else {
                renderProducts(); // Default render all
            }

            // Search Input Listener
            const searchInput = document.getElementById('product-search');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    applyFilters();
                });
            }

        } catch (err) {
            console.error(err);
            const container = document.getElementById('product-container');
            if (container) container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Ürünler yüklenirken bir hata oluştu.</p>';
        }
    };

    // Render Products
    function renderProducts() {
        const container = document.getElementById('product-container');
        const paginationContainer = document.getElementById('pagination-controls');

        if (!container) return;

        container.innerHTML = '';
        if (paginationContainer) paginationContainer.innerHTML = '';

        const countEl = document.getElementById('live-product-count');
        if (countEl) countEl.innerText = currentFiltered.length;

        if (currentFiltered.length === 0) {
            if (allProducts.length === 0) {
                container.innerHTML = '<div class="catalog-empty-state"><i class="fa-solid fa-triangle-exclamation"></i><h2>Ürün verisi yüklenemedi</h2><p>Lütfen sayfayı yenileyin veya bizimle iletişime geçin.</p></div>';
                return;
            }

            const searchInput = document.getElementById('product-search');
            const hasSearch = Boolean(searchInput && searchInput.value.trim());
            const heading = hasSearch ? 'Aradığınız ürün listede görünmüyor' : 'Bu ürün grubu henüz çevrim içi katalogda yok';
            container.innerHTML = `
                <div class="catalog-empty-state">
                    <span class="catalog-empty-kicker">ÜRÜN DESTEĞİ</span>
                    <i class="fa-solid fa-comments"></i>
                    <h2>${heading}</h2>
                    <p>Stok ve alternatif ürün bilgisi için ekibimize doğrudan ulaşabilirsiniz.</p>
                    <div class="catalog-empty-actions">
                        <a href="https://wa.me/905321750818?text=Merhaba%2C%20arad%C4%B1%C4%9F%C4%B1m%20%C3%BCr%C3%BCn%20grubu%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" class="btn btn-copper">
                            <i class="fa-brands fa-whatsapp"></i> WhatsApp'tan Sor
                        </a>
                        <a href="tel:+905321750818" class="btn btn-outline">
                            <i class="fa-solid fa-phone"></i> Bizi Ara
                        </a>
                    </div>
                </div>`;
            return;
        }

        // Pagination Logic
        const totalPages = Math.ceil(currentFiltered.length / ITEMS_PER_PAGE);

        // Ensure valid page
        if (currentPage > totalPages) currentPage = 1;

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const productsToShow = currentFiltered.slice(startIndex, endIndex);

        productsToShow.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = 'product-card visible';
            card.style.transitionDelay = `${(index % ITEMS_PER_PAGE) * 0.05}s`;

            const imgUrl = product.image || 'assets/images/product-placeholder.svg';
            const shortDesc = product.description ? (product.description.length > 65 ? product.description.substring(0, 65) + '...' : product.description) : 'Profesyonel kuaför ve bakım serisi.';
            const catLabel = product.category ? product.category.replace('-', ' ').toUpperCase() : 'KOLEKSİYON';

            card.innerHTML = `
                <a href="product-detail.html?id=${product.id}#${product.id}" class="classic-3d-card">
                    <div class="p-image-3d">
                        <div class="card-glow-bg"></div>
                        <img src="${imgUrl}" alt="${product.name}" class="img-3d-render" loading="lazy" decoding="async">
                    </div>
                    <div class="p-info-3d">
                        <div>
                            <h3>${product.name}</h3>
                            <p class="p-desc-3d">${shortDesc}</p>
                        </div>
                        <div class="p-action">
                            <span class="btn-incele">İNCELE <i class="fa-solid fa-arrow-right"></i></span>
                        </div>
                    </div>
                </a>
            `;
            container.appendChild(card);
        });

        requestAnimationFrame(() => {
            initTilt();
        });

        // Render Pagination Controls
        if (totalPages > 1 && paginationContainer) {
            renderPaginationControls(totalPages, paginationContainer);
        }
    }

    function renderPaginationControls(totalPages, container) {
        const scrollToTarget = () => {
            const targetSec = document.querySelector('.catalog-main-section') || document.querySelector('.catalog-section');
            if (targetSec) {
                window.scrollTo({ top: targetSec.offsetTop - 100, behavior: 'smooth' });
            }
        };

        // Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn';
        prevBtn.type = 'button';
        prevBtn.setAttribute('aria-label', 'Önceki ürün sayfası');
        prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderProducts();
                scrollToTarget();
            }
        });
        container.appendChild(prevBtn);

        // Page Numbers
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);

        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement('button');
            btn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
            btn.type = 'button';
            btn.setAttribute('aria-label', `${i}. ürün sayfasına git`);
            if (i === currentPage) btn.setAttribute('aria-current', 'page');
            btn.innerText = i;
            btn.addEventListener('click', () => {
                currentPage = i;
                renderProducts();
                scrollToTarget();
            });
            container.appendChild(btn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn';
        nextBtn.type = 'button';
        nextBtn.setAttribute('aria-label', 'Sonraki ürün sayfası');
        nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderProducts();
                scrollToTarget();
            }
        });
        container.appendChild(nextBtn);
    }

    // Filter Logic
    function applyFilters() {
        // Reset to page 1 on filter change
        currentPage = 1;

        const activeCatBtn = document.querySelector('#quick-pills button.active') || document.querySelector('#category-filters button.active');
        const activeBrandBtn = document.querySelector('#brand-filters button.active');
        const searchInput = document.getElementById('product-search');
        const searchQuery = searchInput ? normalizeFilterText(searchInput.value) : '';

        // Category Filter Logic
        let allowedCategories = ['all'];

        if (activeCatBtn) {
            if (activeCatBtn.dataset.group) {
                allowedCategories = activeCatBtn.dataset.group.split(',');
            } else {
                allowedCategories = [activeCatBtn.dataset.filter || 'all'];
            }
        }

        const activeBrand = activeBrandBtn ? activeBrandBtn.dataset.brand : 'all';

        currentFiltered = allProducts.filter(p => {
            let catMatch = false;
            if (allowedCategories.includes('all')) {
                catMatch = true;
            } else {
                if (allowedCategories.includes(p.category)) {
                    catMatch = true;
                }
            }

            const brandMatch = activeBrand === 'all' ||
                canonicalBrandKey(p.brand, p.name) === canonicalBrandKey(activeBrand);

            let searchMatch = true;
            if (searchQuery) {
                const combinedText = normalizeFilterText(`${p.name} ${p.brand} ${p.description || ''}`);
                searchMatch = combinedText.includes(searchQuery);
            }

            return catMatch && brandMatch && searchMatch;
        });

        renderProducts();
    }

    // Event Listeners for Filters (#category-filters, #brand-filters, and #quick-pills)
    const categoryButtons = document.querySelectorAll('#category-filters button');
    const brandButtons = document.querySelectorAll('#brand-filters button');
    const quickPills = document.querySelectorAll('#quick-pills button');

    [...categoryButtons, ...brandButtons, ...quickPills].forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = e.target.closest('#category-filters') || e.target.closest('#brand-filters') || e.target.closest('#quick-pills');

            if (container) {
                container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            }

            // If quick pills clicked, clear category sidebar selection so they don't conflict
            if (e.target.closest('#quick-pills')) {
                document.querySelectorAll('#category-filters button').forEach(b => b.classList.remove('active'));
            }
            // If category sidebar clicked, clear quick pills selection
            if (e.target.closest('#category-filters')) {
                document.querySelectorAll('#quick-pills button').forEach(b => b.classList.remove('active'));
            }

            e.target.classList.add('active');
            applyFilters();

            // Uzun ürün listesinden kısa/boş bir sonuca geçildiğinde içerik ekranın
            // üzerinde kalmasın. Mobil filtre çekmecesini de seçimden sonra kapat.
            const openSidebar = document.getElementById('product-sidebar');
            if (openSidebar && openSidebar.classList.contains('active')) {
                openSidebar.classList.remove('active');
                const filterButton = document.getElementById('filter-toggle');
                if (filterButton) filterButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }

            requestAnimationFrame(() => {
                const catalogContent = document.querySelector('.catalog-content');
                if (!catalogContent) return;

                const targetTop = catalogContent.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
            });
        });
    });




    // --- Mobile Filter Drawer Logic ---
    const filterToggleBtn = document.getElementById('filter-toggle');
    const productSidebar = document.getElementById('product-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');

    if (filterToggleBtn && productSidebar) {
        filterToggleBtn.addEventListener('click', () => {
            productSidebar.classList.add('active');
            filterToggleBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', () => {
            productSidebar.classList.remove('active');
            if (filterToggleBtn) filterToggleBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    }

    // Close the product filter panel when the user clicks outside it.
    document.addEventListener('click', (e) => {
        if (productSidebar && productSidebar.classList.contains('active') &&
            !productSidebar.contains(e.target) &&
            filterToggleBtn && !filterToggleBtn.contains(e.target)) {
            productSidebar.classList.remove('active');
            filterToggleBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });



    // --- Product Detail Page Logic ---
    window.initProductDetail = async () => {
        const container = document.getElementById('product-detail-container');
        if (!container) return;

        const urlParams = new URLSearchParams(window.location.search);
        let productId = urlParams.get('id');

        // Fallback to hash if query param is missing (common with some local servers/rewrites)
        if (!productId && window.location.hash) {
            productId = window.location.hash.substring(1);
        }

        if (!productId) {
            console.error("Product ID not found in URL or Hash", window.location.href);
            container.innerHTML = '<div style="text-align:center; padding:50px;"><h2>Ürün bulunamadı</h2><p>Lütfen koleksiyon sayfasından tekrar deneyin.</p><a href="products.html" class="btn btn-copper" style="margin-top:20px; display:inline-block;">Koleksiyona Dön</a></div>';
            return;
        }

        try {
            // Load from global
            let products = window.PRODUCT_DATA || [];

            // Fallback check if initProductCatalog hasn't run or script not loaded
            if (products.length === 0) {
                console.error("Product DB not found");
                container.innerHTML = '<p>Veritabanı yüklenemedi.</p>';
                return;
            }

            const product = products.find(p => p.id === productId);

            if (!product) {
                container.innerHTML = '<p>Ürün bulunamadı.</p>';
                return;
            }

            document.title = `${product.name} | Bakır Cosmetic`;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                const description = product.description || `${product.name} hakkında ürün bilgileri.`;
                metaDescription.setAttribute('content', description.slice(0, 155));
            }

            // Render Detail with Gallery Support
            let galleryHtml = '';
            if (product.gallery && product.gallery.length > 0) {
                galleryHtml = `
                    <div class="gallery-thumbs">
                        ${product.gallery.map((img, index) => `
                            <div class="thumb-img ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
                                <img src="${img}" alt="${product.name} thumb">
                            </div>
                        `).join('')}
                    </div>
                 `;
            }

            container.innerHTML = `
                <div class="detail-image">
                     <div class="detail-main-img">
                        <img id="main-product-img" src="${product.image}" alt="${product.name}">
                     </div>
                     ${galleryHtml}
                </div>
                <div class="detail-info">
                    <span class="d-brand">${product.brand}</span>
                    <h1 class="d-title">${product.name}</h1>

                    <p class="d-desc">${product.description}</p>

                    <div class="d-actions">
                        <a href="https://wa.me/905321750818?text=${encodeURIComponent(`Merhaba, ${product.name} hakkında bilgi almak istiyorum.`)}" target="_blank" rel="noopener noreferrer" class="btn btn-copper">
                            <i class="fa-brands fa-whatsapp"></i> SİPARİŞ HATTI
                        </a>
                    </div>
                </div>
            `;

        } catch (err) {
            console.error(err);
            container.innerHTML = '<p>Veri yüklenemedi.</p>';
        }
    };

    // --- Mobile Menu Toggle ---
    const burger = document.querySelector('.burger-menu');
    if (burger) {
        const overlay = document.querySelector('.mobile-menu-overlay');

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            overlay.classList.toggle('active');
            const isOpen = overlay.classList.contains('active');
            burger.setAttribute('aria-expanded', String(isOpen));
            burger.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
            overlay.setAttribute('aria-hidden', String(!isOpen));
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu/link logic
        const mobileLinks = document.querySelectorAll('.mobile-nav a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                overlay.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                burger.setAttribute('aria-label', 'Menüyü aç');
                overlay.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && overlay.classList.contains('active')) {
                burger.classList.remove('active');
                overlay.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                burger.setAttribute('aria-label', 'Menüyü aç');
                overlay.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                burger.focus();
            }
        });
    }

    // --- Intersection Observer for Scroll Reveal ---
    function observeCards() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-card:not(.visible)').forEach(card => {
            observer.observe(card);
        });
    }

    // --- Ultra-Smooth 3D Tilt Effect ---
    function initTilt() {
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const cards = document.querySelectorAll('.product-card:not(.tilt-init)');

        cards.forEach(card => {
            card.classList.add('tilt-init');
            let targetX = 0, targetY = 0;
            let currentX = 0, currentY = 0;
            let isHovering = false;
            let requestRef = null;
            let cachedRect = null;

            const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

            const animateTilt = () => {
                if (!isHovering && Math.abs(currentX) < 0.05 && Math.abs(currentY) < 0.05) {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)`;
                    cancelAnimationFrame(requestRef);
                    requestRef = null;
                    return;
                }

                currentX = lerp(currentX, targetX, 0.12);
                currentY = lerp(currentY, targetY, 0.12);

                const scale = isHovering ? lerp(1, 1.02, 0.12) : lerp(1.02, 1, 0.12);

                card.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale3d(${scale.toFixed(3)}, ${scale.toFixed(3)}, 1) translateZ(0)`;

                requestRef = requestAnimationFrame(animateTilt);
            };

            card.addEventListener('mouseenter', () => {
                cachedRect = card.getBoundingClientRect();
                isHovering = true;
                if (!requestRef) requestRef = requestAnimationFrame(animateTilt);
            });

            card.addEventListener('mousemove', (e) => {
                if (!cachedRect) cachedRect = card.getBoundingClientRect();
                const x = e.clientX - cachedRect.left;
                const y = e.clientY - cachedRect.top;

                const centerX = cachedRect.width / 2;
                const centerY = cachedRect.height / 2;

                targetX = ((y - centerY) / centerY) * 7;
                targetY = ((centerX - x) / centerX) * 7;

                isHovering = true;
                if (!requestRef) requestRef = requestAnimationFrame(animateTilt);
            });

            card.addEventListener('mouseleave', () => {
                targetX = 0;
                targetY = 0;
                isHovering = false;
                cachedRect = null;
            });
        });
    }

    // Initialize page-specific product views without inline scripts.
    if (document.getElementById('product-container')) {
        window.initProductCatalog();
    }

    if (document.getElementById('product-detail-container')) {
        window.initProductDetail();
    }

    // Call observeCards for static sections if any
    observeCards();
    initTilt();

});

window.changeMainImage = (src, thumbElement) => {
    const mainImg = document.getElementById('main-product-img');
    if (mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = src;
            mainImg.style.opacity = '1';
        }, 150); // Small delay for fade effect
    }

    // Update active thumb
    document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
    if (thumbElement) thumbElement.classList.add('active');
};

// --- Stats Section Logic (Counter Animation) ---
function initStats() {
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function animateCounter(el, target, duration) {
        const start = performance.now();
        const countEl = el.querySelector('.stats-count');
        if (!countEl) return;

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuart(progress);
            const current = Math.round(eased * target);

            countEl.textContent = current.toLocaleString('tr-TR');

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                countEl.textContent = target.toLocaleString('tr-TR');
            }
        }

        requestAnimationFrame(update);
    }

    const items = document.querySelectorAll('.stats-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const target = parseInt(item.dataset.target, 10);

                item.classList.add('is-visible');

                const duration = target >= 1000 ? 2200 : target >= 100 ? 1800 : 1400;
                animateCounter(item, target, duration);

                observer.unobserve(item);
            }
        });
    }, {
        threshold: 0.25
    });

    items.forEach(item => observer.observe(item));
}

// Stats initialization
document.addEventListener('DOMContentLoaded', () => {
    initStats();

    // --- Mobile Fixed Contact Bar ---
    if (!document.querySelector('.mobile-contact-bar')) {
        document.body.insertAdjacentHTML('beforeend', `
            <nav class="mobile-contact-bar" aria-label="Hızlı iletişim">
                <a href="https://wa.me/905321750818" target="_blank" rel="noopener noreferrer" class="mobile-contact-whatsapp" aria-label="WhatsApp ile iletişime geç" title="WhatsApp">
                    <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
                </a>
                <a href="tel:+905321750818" class="mobile-contact-call" aria-label="Bakır Cosmetic'i ara" title="Ara">
                    <i class="fa-solid fa-phone" aria-hidden="true"></i>
                </a>
            </nav>`);
    }

});
