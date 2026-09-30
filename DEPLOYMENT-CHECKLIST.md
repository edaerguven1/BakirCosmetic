# Bakır Cosmetic — Deploy Kontrol Listesi

Son yerel denetim: **27 Eylül 2026**

## Tamamlanan kontroller

- 8 yayın sayfası masaüstü (1440×900) ve mobil (390×844) görünümde tarandı.
- Yatay taşma, kırık görsel, yinelenen `id`, etiketsiz görünür bağlantı/düğme ve tarayıcı konsol hatası bulunmadı.
- 147 ürünün kimliği, zorunlu alanları ve görsel dosyaları doğrulandı.
- Ürün arama, marka filtreleri, sayfalama, mobil menü, hero slider, proje carousel'i, KVKK penceresi ve klavye odağı doğrulandı.
- Telefon ve WhatsApp bağlantıları ile dört PDF katalog doğrulandı.
- Düşük kontrastlı alt bilgi ve bakır düğme yazıları düzeltildi.
- Yerel kaynaklar, sayfa içi bağlantılar, JavaScript sözdizimi ve olası gizli anahtarlar tarandı.

## Yayından önce çözülmesi gerekenler

- Kesin alan adını belirleyin. `bakircosmetic.com` için yapılan son DNS sorgusu kayıt bulamadı.
- `info@bakircosmetic.com` kullanılacaksa alan adı ile MX/e-posta servisini kurup doğrulayın; aksi halde sitedeki e-posta adresini çalışan adresle değiştirin.
- Görseller optimizasyon sonrasında yaklaşık **22,45 MB**, katalog dosyaları yaklaşık **71,15 MB** boyutundadır. En büyük iki PDF **37,13 MB** ve **24,29 MB** olduğu için kataloglar ileride ayrıca sıkıştırılabilir veya CDN üzerinden sunulabilir.
- İletişim sayfası telefon, WhatsApp, e-posta ve mağaza bilgileriyle çalışır; iletişim formu ve teşekkür sayfası bilinçli olarak kullanılmamaktadır.
- KVKK metnindeki veri sorumlusu unvanını, işletmenin resmî ticaret sicili/vergi kaydındaki tam unvanıyla karşılaştırın ve gerekirse “Bakır Cosmetic” ifadesini güncelleyin.

## Yayına dahil edilecekler

- `index.html`, `about.html`, `products.html`, `product-detail.html`
- `studio.html`, `contact.html`, `catalogs.html`, `404.html`
- `style.css`, `mobile.css`, `main.js`, `privacy-modal.js`, `cursor.js`, `hero-slider.js`, `carousel-3d.js`
- `assets/css/`, `assets/js/`
- `assets/`, `data/products_db.js`, `robots.txt`
- Lisans ve proje belgeleri arşivde tutulacaksa `THIRD_PARTY_NOTICES.md`, `README.md` ve rehber dosyaları

## Yayına dahil edilmemesi gerekenler

- `.codex-backups/`, `.git/`, `.vscode/`
- Yerel denetim ve yedek klasörleri: `.codex-tools/`, `.codex-backups/`

## Alan adı belli olduğunda

- Her sayfaya kesin alan adıyla canonical URL ekleyin.
- Open Graph URL ve görsel adreslerini kesin alan adıyla ekleyin.
- `sitemap.xml` oluşturup `robots.txt` içine ekleyin.
- `info@bakircosmetic.com` adresinin DNS/MX kaydını doğrulayın.

## Hosting ayarları

- HTTPS zorunlu olsun.
- HTML için kısa, parmak izli statik dosyalar için uzun önbellek kullanın.
- `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` ve uygun CSP başlıklarını hosting katmanında tanımlayın.
- 404 yönlendirmesini `404.html` dosyasına bağlayın.

Natro panel adımları için `NATRO-YAYIN-REHBERI.md` dosyasını izleyin.
