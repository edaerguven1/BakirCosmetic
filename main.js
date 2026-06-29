document.addEventListener('DOMContentLoaded', () => {

    // Custom cursor logic moved to standalone cursor.js for modularity.

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

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

    // Pagination State
    const ITEMS_PER_PAGE = 12;
    let currentPage = 1;

    // Initialize Catalog
    window.initProductCatalog = async () => {
        try {
            // Check if window.PRODUCT_DATA exists (loaded from products_db.js)
            if (window.PRODUCT_DATA) {
                allProducts = window.PRODUCT_DATA;
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
                const btn = document.querySelector(`#category-filters button[data-filter="${paramCategory}"]`);
                if (btn) btn.click();
            } else if (paramBrand) {
                const btn = document.querySelector(`#brand-filters button[data-brand="${paramBrand}"]`);
                if (btn) btn.click();
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

        if (currentFiltered.length === 0) {
            const msg = allProducts.length === 0 ? "Veritabanı yüklenemedi." : "Kriterlere uygun ürün bulunamadı.";
            container.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">${msg}</p>`;
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
            card.className = 'product-card reveal-card';
            // Staggered delay for the initial load or filter
            card.style.transitionDelay = `${(index % ITEMS_PER_PAGE) * 0.1}s`;

            const imgUrl = product.image || 'https://placehold.co/600x800?text=No+Image';

            card.innerHTML = `
                <a href="product-detail.html?id=${product.id}#${product.id}" class="p-link">
                    <div class="p-image">
                        <img src="${imgUrl}" alt="${product.name}" loading="lazy">
                    </div>
                    <div class="p-info">
                        <p>${product.brand}</p>
                        <h3>${product.name}</h3>
                        <span class="p-link-text">İNCELE <i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </a>
            `;
            container.appendChild(card);
            
            // Trigger animation in next frame
            requestAnimationFrame(() => {
                observeCards();
                initTilt();
            });
        });

        // Render Pagination Controls
        if (totalPages > 1 && paginationContainer) {
            renderPaginationControls(totalPages, paginationContainer);
        }
    }

    function renderPaginationControls(totalPages, container) {
        // Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn';
        prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderProducts();
                window.scrollTo({ top: document.querySelector('.catalog-section').offsetTop - 100, behavior: 'smooth' });
            }
        });
        container.appendChild(prevBtn);

        // Page Numbers
        // Simple logic: Show all if <= 5, else show partial (impl simplified for now)
        // For better UX with many pages, would need ellipsis logic. 
        // Showing up to 5 pages around current page for simplicity.

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);

        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement('button');
            btn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
            btn.innerText = i;
            btn.addEventListener('click', () => {
                currentPage = i;
                renderProducts();
                window.scrollTo({ top: document.querySelector('.catalog-section').offsetTop - 100, behavior: 'smooth' });
            });
            container.appendChild(btn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn';
        nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderProducts();
                window.scrollTo({ top: document.querySelector('.catalog-section').offsetTop - 100, behavior: 'smooth' });
            }
        });
        container.appendChild(nextBtn);
    }

    // Filter Logic
    // Filter Logic
    function applyFilters() {
        // Reset to page 1 on filter change
        currentPage = 1;

        const activeCatBtn = document.querySelector('#category-filters button.active');
        const activeBrandBtn = document.querySelector('#brand-filters button.active');
        const searchInput = document.getElementById('product-search');
        const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

        // Category Filter Logic
        let allowedCategories = ['all'];

        if (activeCatBtn) {
            // Check if it's a group (data-group) or single filter (data-filter)
            if (activeCatBtn.dataset.group) {
                // It's a group, allow any category in the list
                allowedCategories = activeCatBtn.dataset.group.split(',');
            } else {
                // It's a single category
                allowedCategories = [activeCatBtn.dataset.filter || 'all'];
            }
        }

        const activeBrand = activeBrandBtn ? activeBrandBtn.dataset.brand : 'all';

        currentFiltered = allProducts.filter(p => {
            // Category Match
            let catMatch = false;
            if (allowedCategories.includes('all')) {
                catMatch = true;
            } else {
                // If product category is in the allowed list
                if (allowedCategories.includes(p.category)) {
                    catMatch = true;
                }
                // Backward Compatibility Mapping
                // If product has old 'care' category but we are looking for 'shampoo', we might miss it.
                // But if we are filtering by GROUP 'care,shampoo,etc', then old 'care' items will show up naturally if 'care' is in the group string.
                // The updated HTML details include 'care' in the "Saç Bakım" group string, so legacy items work fine.
            }

            // Brand Match
            const brandMatch = activeBrand === 'all' || p.brand === activeBrand;

            // Search Match
            let searchMatch = true;
            if (searchQuery) {
                const combinedText = `${p.name} ${p.brand} ${p.description || ''}`.toLowerCase();
                searchMatch = combinedText.includes(searchQuery);
            }

            return catMatch && brandMatch && searchMatch;
        });

        renderProducts();
    }

    // Event Listeners for Filters
    // Note: We use event delegation or select all potential buttons
    const categoryButtons = document.querySelectorAll('#category-filters button');
    const brandButtons = document.querySelectorAll('#brand-filters button');

    [...categoryButtons, ...brandButtons].forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active from all buttons in this filter container
            // For nested tree, we need to be careful to deselect everything in #category-filters
            const container = e.target.closest('#category-filters') || e.target.closest('#brand-filters');

            // If clicking a group header that is NOT a filter button itself (some designs have headers as buttons)
            // In our HTML, headers have data-group, children have data-filter. Both are buttons.

            if (container) {
                container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            }

            e.target.classList.add('active');
            applyFilters();
        });
    });




    // --- Mobile Filter Drawer Logic ---
    const filterToggleBtn = document.getElementById('filter-toggle');
    const productSidebar = document.getElementById('product-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');

    if (filterToggleBtn && productSidebar) {
        filterToggleBtn.addEventListener('click', () => {
            productSidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', () => {
            productSidebar.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close when clicking outside (optional)
    document.addEventListener('click', (e) => {
        if (productSidebar.classList.contains('active') &&
            !productSidebar.contains(e.target) &&
            !filterToggleBtn.contains(e.target)) {
            productSidebar.classList.remove('active');
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
                        <a href="https://wa.me/905321750818?text=Merhaba, ${product.name} hakkında bilgi almak istiyorum." target="_blank" class="btn btn-copper">
                            <i class="fa-brands fa-whatsapp"></i> SiPARİŞ HATTI
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
            document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu/link logic
        const mobileLinks = document.querySelectorAll('.mobile-nav a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Contact Form Handling (Local vs Production) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // Check if running locally
            if (window.location.protocol === 'file:') {
                e.preventDefault();
                alert('⚠️ Test Modu (Dosya Üzerinden Çalışıyor):\n\nBu form güvenliği nedeniyle sadece gerçek bir web sitesine (domain) yüklendiğinde mail gönderir.\n\nŞu an sadece "Görünüm" ve "Sayfa Yönlendirmesini" test ediyorsunuz. Sitenizi yayınladığınızda mail sistemi otomatik devreye girecektir.');
                window.location.href = 'thank-you.html'; // Simulate success
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
            let requestRef;

            const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

            const animateTilt = () => {
                if (!isHovering && Math.abs(currentX) < 0.1 && Math.abs(currentY) < 0.1) {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                    cancelAnimationFrame(requestRef);
                    requestRef = null;
                    return;
                }

                currentX = lerp(currentX, targetX, 0.1);
                currentY = lerp(currentY, targetY, 0.1);

                const scale = isHovering ? lerp(1, 1.02, 0.1) : lerp(1.02, 1, 0.1);

                card.style.transform = `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg) scale3d(${scale}, ${scale}, ${scale})`;
                
                requestRef = requestAnimationFrame(animateTilt);
            };

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                targetX = ((y - centerY) / centerY) * 10;
                targetY = ((centerX - x) / centerX) * 10;

                isHovering = true;
                if (!requestRef) requestRef = requestAnimationFrame(animateTilt);
            });

            card.addEventListener('mouseleave', () => {
                targetX = 0;
                targetY = 0;
                isHovering = false;
            });
        });
    }

    // Call observeCards for static sections if any
    observeCards();
    initTilt();

});

// Global Helper (optional)
window.openProductModal = (id) => {
    // Legacy support or remove
    window.location.href = `product-detail.html?id=${id}`;
};

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
});
