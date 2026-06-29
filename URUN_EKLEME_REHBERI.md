# Ürün ve Fotoğraf Ekleme Rehberi

Bu dosya, sitenize yeni ürün eklerken izlemeniz gereken adımları basitçe anlatır.

## Önemli Tavsiye: Fotoğraflar Nasıl Eklenmeli? 📸
İki yöntem vardır: Link ile eklemek veya Dosya olarak eklemek.
**Bizim önerimiz kesinlikle DOSYA OLARAK eklemektir.**

| Yöntem | Avantajı | Riski (Dezavantajı) |
| :--- | :--- | :--- |
| **Link (URL)** | Yer kaplamaz, hızlıdır. | Link aldığınız site fotoğrafı silerse sizin sitenizde de silinir. |
| **Dosya (Önerilen)** | Fotoğraf sizindir, asla kaybolmaz. | Biraz yer kaplar (önemsiz miktarda). |

**Neden Dosya?**
Çünkü profesyonel bir şirket sitesinde "kırık resim" (açılmayan fotoğraf) olması büyük prestij kaybıdır. Başka siteye güvenip link vermektense, fotoğrafı indirip kendi klasörümüze koymak en garantisidir.emek ve siteye tanıtmak için aşağıdaki adımları izleyebilirsiniz.

## İpucu: Kaliteyi Bozmadan Boyut Küçültme 📉
Fotoğrafların hem net olması hem de sitenin hızlı açılması için şu 3 altın kuralı uygulayın:

1.  **Format Olarak WEBP Kullanın:**
    *   JPG veya PNG yerine `.webp` formatını tercih edin. Hem çok daha az yer kaplar hem de kalitesi bozulmaz. Google'ın önerdiği formattır.

2.  **Boyutları Küçültün:**
    *   Telefonla çektiğiniz fotoğraflar bazen devasa (4000x3000 piksel) olabilir. Web sitesi için bu kadarına gerek yok.
    *   **İdeal Boyut:** Genişlik **800px** veya **1000px** yeterlidir.

3.  **Nasıl Yapılır?**
    *   **Squoosh.app (Ücretsiz):** Google'ın sitesidir. Fotoğrafı atın, sağdan "WebP" seçin, boyutunu ayarlayın ve indirin. %90 daha az yer kaplar!
    *   **TinyPNG.com:** Fotoğrafları buraya atıp sıkıştırılmış hallerini indirebilirsiniz.

## 1. Fotoğrafı Yükleme
Öncelikle ürün fotoğrafınızın adını basit ve anlaşılır yapın (örneğin: `morfose_sut_terapisi.webp` veya `morfose_fonsuyu.jpg`). Türkçe karakter ve boşluk kullanmamaya özen gösterin.

1.  Bu klasöre gidin: `c:\Users\LENOVO\.gemini\antigravity\scratch\bakir_cosmetic\assets\products\morfose\`
    *(Eğer `morfose` klasörü yoksa `products` klasörü içine `morfose` adında yeni bir klasör açın - **Ben sizin için bu klasörü oluşturdum!**)*
2.  Fotoğrafınızı bu klasörün içine yapıştırın.

Adresiniz şu şekilde olacak:
`assets/products/morfose/SENIN_DOSYA_ADIN.jpg`

## İpucu: Uzun Açıklama ve Paragraf Ekleme 📝
Eğer açıklama kısmına (description) uzun ve paragraflı yazı eklemek isterseniz, çift tırnak `"` yerine **Ters Tırnak** (Backtick) `` ` `` kullanmalısınız.

**Nasıl Yapılır?**
Klavyede `AltGr + ;` (noktalı virgül) tuşuna iki kere basarak çıkarabilirsiniz.

```javascript
    "description": `Reishi teknolojisi...
    
    Bu yeni paragraf.
    
    Bu da üçüncü paragraf.`
```

## 2. Ürünü Sisteme Ekleme (Kod Kısmı)
Fotoğrafı yükledikten sonra siteye "bu fotoğrafı kullan" dememiz gerekiyor. Bunun için **`data/products_db.js`** dosyasını düzenleyeceğiz.

1.  `data/products_db.js` dosyasını açın.
2.  Dosyanın en altına doğru inin.
3.  Aşağıdaki şablonu kullanarak ürün bilgilerini girin:

```javascript
    {
        "id": "p017", 
        "name": "Yeni Ürün Adı",
        "category": "care",
        "brand": "Morfose",
        "image": "assets/products/morfose/ana_resim.jpg", 
        "gallery": [
             "assets/products/morfose/ana_resim.jpg",
             "assets/products/morfose/yan_resim.jpg",
             "assets/products/morfose/arka_resim.jpg"
        ],
        "description": "Ürün açıklaması buraya gelecek."
    },
```

**Dikkat Edilmesi Gerekenler:**
*   **"image"**: Ürün kartında görünecek ana resim.
*   **"gallery"**: (İsteğe bağlı) Ürün detay sayfasında altta çıkacak küçük resimler listesi. Köşeli parantez `[]` içine, tırnak işaretleriyle yazılır. Aralarına virgül konur.
*   **"id"**: Her ürünün benzersiz bir numarası olmalı (p017, p018... vb).
*   **Virgül**: Her ürün bloğunun sonuna (süslü parantezden sonra) virgül koymayı unutmayın.

## Örnek İşlem

Diyelim ki elinizde `morfose_sut.jpg` diye bir fotoğraf var.
1. Fotoğrafı `assets/products/morfose/` klasörüne atın.
2. `data/products_db.js` dosyasını açın ve listeye ekleyin:

```diff
+   {
+       "id": "p017",
+       "name": "Morfose Süt Terapisi",
+       ...
+       "image": "assets/products/morfose/morfose_sut.jpg"
+   }
```

Kaydettikten sonra sayfayı yenilediğinizde ürün görünecektir.
