# Bakır Cosmetic — Natro'da Yayına Alma Rehberi

Bu proje statik HTML/CSS/JavaScript sitesidir. Veritabanı veya WordPress kurulumu gerektirmez.

## 1. Hosting hesabını kontrol edin

Alan adı tek başına site dosyalarını barındırmaz. Natro Müşteri Paneli'nde **Hosting Yönetimi → Web Hosting Hesapları** bölümünü açın.

- Aktif bir hosting paketi görünüyorsa ilgili pakette **Yönet** seçeneğine girin.
- Paket görünmüyorsa gelecekte yeni ürün, fotoğraf ve katalog eklenebilmesi için en az **10 GB disk alanı**, SSL ve tercihen e-posta desteği sunan bir Linux/cPanel hosting paketi seçin.
- `info@...` adresi kullanılacaksa pakette e-posta hizmetinin bulunduğunu doğrulayın.

## 2. Alan adını hosting hesabına bağlayın

Natro panelinde **Alan Adı Yönetimi → Aktif Alan Adları → Yönet → DNS Sunucuları** yolunu izleyin. Hosting hesabında gösterilen nameserver değerlerini kullanın. Natro'nun resmî dokümanlarında Natro hosting için `NS1.NATROHOST.COM` ve `NS2.NATROHOST.COM` değerleri belirtilmektedir; panelinizde farklı değer gösteriliyorsa paneldeki güncel değerleri esas alın.

Ardından **Hosting Yönetimi → Web Alanı Yönetimi** bölümünden alan adını web alanına ekleyin. DNS değişikliklerinin internete yayılması birkaç dakika ile 24–48 saat arasında sürebilir.

## 3. Site dosyalarını yükleyin

Linux/cPanel kullanıyorsanız **Dosya Yöneticisi → public_html** klasörünü açın. Windows/Plesk kullanıyorsanız hedef klasör genellikle **httpdocs** olur.

Site varlıkları yaklaşık **94,15 MB** boyutundadır. Büyük katalog PDF'leri nedeniyle panelin tek dosya yükleme sınırına takılmamak adına FTP/FileZilla ile klasörleri doğrudan yüklemek daha güvenilir olabilir.

Aşağıdaki dosya ve klasörleri web kök dizinine yükleyin:

- `index.html`, `about.html`, `products.html`, `product-detail.html`
- `studio.html`, `contact.html`, `catalogs.html`, `404.html`
- `style.css`, `mobile.css`, `main.js`, `privacy-modal.js`, `cursor.js`, `hero-slider.js`, `carousel-3d.js`
- `assets/css/`, `assets/js/`
- `assets/`, `data/products_db.js`, `robots.txt`

`index.html` dosyası doğrudan `public_html` veya `httpdocs` içinde bulunmalıdır; dosyaları fazladan bir proje klasörünün içine bırakmayın.

`.git`, `.codex-backups`, `.vscode`, test dosyaları, veri hazırlama betikleri ve ham çalışma dosyalarını yüklemeyin. Tam liste için `DEPLOYMENT-CHECKLIST.md` dosyasına bakın.

## 4. HTTPS ve e-postayı etkinleştirin

- Hosting panelinden ücretsiz SSL/AutoSSL özelliğini etkinleştirin.
- `http://` isteklerini `https://` adresine yönlendirin.
- E-posta kullanılacaksa panelde **E-posta Hesapları** bölümünden `info@alanadiniz` hesabını oluşturun.
- MX, SPF ve DKIM kayıtlarının panelde doğrulandığını kontrol edin.

## 5. Alan adı belli olduğunda projeyi son kez güncelleyin

Yayın öncesinde gerçek alan adıyla şu işlemler yapılmalıdır:

- canonical URL'ler,
- Open Graph adresleri ve paylaşım görseli,
- `sitemap.xml` ve `robots.txt` içindeki sitemap adresi,
- iletişim sayfasındaki e-posta adresi,
- KVKK metnindeki veri sorumlusunun resmî ticari unvanı.

## 6. Yayın sonrası kontrol

- Ana sayfa ve tüm menü bağlantılarını açın.
- Mobil görünümü kontrol edin.
- Bir ürün detayına girip WhatsApp bağlantısını deneyin.
- PDF katalogları indirin.
- SSL kilidini ve `www`/www'siz adres yönlendirmesini kontrol edin.
- Var olmayan bir adresi açıp özel 404 sayfasının geldiğini doğrulayın.

## Natro'nun resmî kaynakları

- [Hosting'e alan adı ve web alanı ekleme](https://www.natro.com/blog/hostinge-alan-adi-ve-web-alani-nasil-eklenir/)
- [FTP bilgilerine ulaşma ve doğru yükleme klasörleri](https://www.natro.com/blog/ftp-bilgilerime-nasil-ulasabilirim/)
- [cPanel özellikleri ve dosya yönetimi](https://www.natro.com/blog/cpanel-nedir-ozellikleri-nelerdir/)
