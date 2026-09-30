# Ürün Ekleme Rehberi

Yeni ürünler doğrudan `data/products_db.js` dosyasındaki `products` dizisine eklenir. Ürün görselleri `assets/images/products/<marka>/` altında tutulur.

## 1. Görseli hazırlayın

- WebP kullanın.
- Ürün kartları için görselin uzun kenarını yaklaşık 1200–1600 piksel tutun.
- Dosya adında küçük harf, rakam ve kısa çizgi kullanın: `morfose-sac-spreyi.webp`.
- Aynı görseli farklı adlarla tekrar yüklemeyin.
- Başka sitelerdeki görsel adreslerini kullanmayın; dosyayı bu projede saklayın.

Örnek hedef:

```text
assets/images/products/morfose/morfose-sac-spreyi.webp
```

## 2. Ürün kaydını ekleyin

`data/products_db.js` içindeki son ürünün ardından şu yapıyı ekleyin:

```javascript
{
    id: "p148",
    name: "Morfose Saç Spreyi",
    category: "styling",
    brand: "Morfose",
    image: "assets/images/products/morfose/morfose-sac-spreyi.webp",
    gallery: [
        "assets/images/products/morfose/morfose-sac-spreyi.webp"
    ],
    description: "Ürünün kısa ve anlaşılır açıklaması."
},
```

- `id` her üründe benzersiz olmalıdır.
- `brand` mevcut filtrelerde kullanılan marka yazımıyla birebir aynı olmalıdır.
- `category` mevcut kategori değerlerinden biri olmalıdır.
- `image` kartta görünen ana görseldir.
- `gallery` ürün detayındaki görsellerdir; gerek yoksa yalnızca ana görseli ekleyebilirsiniz.

Mevcut marka ve kategori yazımlarını kontrol etmek için aynı dosyadaki diğer ürünleri örnek alın. Yeni bir marka veya kategori eklenirse `products.html` üzerindeki filtre seçeneklerini de güncelleyin.

## 3. Kontrol edin

Proje klasöründe yerel sunucuyu başlatın:

```powershell
npx http-server . -p 8765
```

Ardından şunları doğrulayın:

1. `http://127.0.0.1:8765/products.html` sayfasında ürün kartı görünüyor.
2. Marka ve kategori filtreleri ürünü buluyor.
3. Ürün detay sayfası açılıyor.
4. Ana görsel ve galeri görselleri kırık görünmüyor.
5. Mobil genişlikte kart taşmıyor.

Yeni dosyaları canlı sunucuya aktarırken hem `data/products_db.js` dosyasını hem de eklediğiniz WebP görsellerini yükleyin.
