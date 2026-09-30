# Bakır Cosmetic

Bakır Cosmetic için geliştirilen responsive kurumsal ürün kataloğu ve salon tasarımı sitesi. Proje; profesyonel kuaför ürünlerini, marka koleksiyonlarını, PDF katalogları ve tamamlanan salon projelerini tek bir arayüzde sunar.

## Öne çıkan özellikler

- 147 ürün ve 23 marka filtresi
- Metin arama, kategori/marka filtreleme ve sayfalama
- Dinamik ürün detay sayfaları ve ürüne özel WhatsApp mesajı
- Responsive masaüstü, tablet ve mobil yerleşimler
- Mobil hızlı arama ve WhatsApp bağlantıları
- Hero slider ve klavye ile kullanılabilen proje carousel'i
- Dört indirilebilir PDF ürün kataloğu
- Erişilebilir mobil menü, modal odak yönetimi ve ana içeriğe geçiş bağlantısı
- Özel 404 sayfası ve arama motoru tarama kuralları

## Teknik yapı

- Semantik HTML5
- CSS3 ve responsive breakpoint'ler
- Vanilla JavaScript
- Statik JavaScript ürün veritabanı
- Sayfa bazlı CSS ve JavaScript modülleri
- Tek kaynaktan üretilen KVKK modal bileşeni

Ana dosyalar:

- `index.html`: Ana sayfa
- `about.html`: Kurumsal sayfa
- `products.html`: Filtrelenebilir ürün kataloğu
- `product-detail.html`: Dinamik ürün detay görünümü
- `studio.html`: Salon tasarımı hizmeti
- `catalogs.html`: PDF kataloglar
- `contact.html`: Mağaza, telefon, WhatsApp, harita ve çalışma saatleri
- `main.js`: Ortak etkileşimler ve ürün kataloğu
- `privacy-modal.js`: KVKK bileşeni ve klavye/odak yönetimi
- `assets/css/` ve `assets/js/`: Sayfaya özel stiller ve davranışlar
- `data/products_db.js`: Ürün verileri

## Performans çalışmaları

Büyük PNG/JPEG dosyaları WebP formatına dönüştürüldü. Görsel klasörü yaklaşık **121,46 MB'den 22,44 MB'ye** düşürüldü. Görsellerde lazy loading ve async decoding kullanıldı. PDF katalogları indirme dosyası olarak ayrı tutulmaktadır.

## Yerel çalıştırma

Proje statik olduğu için herhangi bir derleme adımı gerektirmez. Dosyaları doğrudan açmak yerine yerel bir HTTP sunucusu kullanın:

```bash
npx http-server . -p 8765
```

Ardından `http://127.0.0.1:8765` adresini açın.

## Doğrulama

Yayın öncesi denetim kapsamında:

- sekiz yayın sayfası masaüstü ve mobil boyutlarda test edildi,
- kırık yerel kaynaklar ve ürün görselleri tarandı,
- yinelenen kimlikler, yatay taşma ve etiketsiz etkileşimler kontrol edildi,
- JavaScript sözdizimi ve tarayıcı konsolu doğrulandı,
- mobil menü, ürün filtreleri, slider, carousel ve KVKK penceresi klavye ile test edildi.

## Yayınlama

Natro üzerinden yayınlama adımları için [`NATRO-YAYIN-REHBERI.md`](NATRO-YAYIN-REHBERI.md), üretim dosya listesi için [`DEPLOYMENT-CHECKLIST.md`](DEPLOYMENT-CHECKLIST.md) dosyasına bakın.

Gerçek alan adı kesinleştiğinde canonical adresler, Open Graph bilgileri ve `sitemap.xml` üretim alan adına göre eklenmelidir.

Yeni ürün eklemek için [Ürün Ekleme Rehberi](URUN_EKLEME_REHBERI.md) dosyasını kullanın.
