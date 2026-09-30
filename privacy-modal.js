(() => {
    const modalMarkup = `
        <div id="kvkk-modal" class="kvkk-modal" role="dialog" aria-modal="true" aria-labelledby="kvkk-modal-title" aria-hidden="true">
            <div class="kvkk-modal-overlay close-kvkk-modal"></div>
            <div class="kvkk-modal-content">
                <button class="close-kvkk-btn close-kvkk-modal" type="button" aria-label="KVKK penceresini kapat">
                    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
                <div class="kvkk-modal-header">
                    <h2 id="kvkk-modal-title">İnternet Sitesi KVKK Aydınlatma Metni</h2>
                </div>
                <div class="kvkk-modal-body">
                    <p class="kvkk-updated"><strong>Son güncelleme:</strong> 27 Eylül 2026</p>
                    <p>Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun (KVKK) 10. maddesi kapsamında; Bakır Cosmetic internet sitesini ziyaret eden ve telefon, WhatsApp, Instagram veya mağaza kanalları üzerinden bizimle iletişim kuran kişileri bilgilendirmek amacıyla hazırlanmıştır.</p>

                    <h3>1. Veri Sorumlusu</h3>
                    <p>Kişisel verileriniz, veri sorumlusu sıfatıyla <strong>Bakır Cosmetic</strong> tarafından işlenebilir. İletişim adresimiz: Ertuğrul Gazi Mahallesi, 330. Sokak, 63300 Haliliye / Şanlıurfa. Telefon: <a href="tel:+905321750818">0532 175 08 18</a>.</p>

                    <h3>2. İşlenen Veriler ve Toplama Yöntemi</h3>
                    <p>İnternet sitemizde üyelik, çevrim içi ödeme veya iletişim formu bulunmamaktadır. Bizimle iletişime geçmeniz hâlinde aşağıdaki veriler, kullandığınız kanala ve paylaştığınız bilgilere bağlı olarak işlenebilir:</p>
                    <ul>
                        <li>Ad, soyad veya sosyal medya kullanıcı adı gibi kimlik bilgileri,</li>
                        <li>Telefon numarası gibi iletişim bilgileri,</li>
                        <li>Mesaj, talep, ürün veya proje bilgileri ile yazışma kayıtları,</li>
                        <li>İnternet sitesinin güvenliği ve çalışması için hosting hizmeti kapsamında oluşabilecek IP adresi, tarih-saat ve erişim/hata kayıtları.</li>
                    </ul>
                    <p>Veriler; elektronik iletişim kanalları, telefon, yüz yüze görüşmeler ve internet sitesi altyapısı üzerinden otomatik veya otomatik olmayan yöntemlerle elde edilir. Lütfen talebiniz için gerekli olmayan özel nitelikli kişisel verileri mesajlarınızda paylaşmayın.</p>

                    <h3>3. İşleme Amaçları ve Hukuki Sebepler</h3>
                    <p>Kişisel veriler; soruların ve taleplerin yanıtlanması, ürün ve hizmetler hakkında bilgi verilmesi, teklif ve proje süreçlerinin yürütülmesi, müşteri ilişkilerinin yönetilmesi, hukuki yükümlülüklerin yerine getirilmesi, uyuşmazlıklarda hakların korunması ve internet sitesinin güvenliğinin sağlanması amaçlarıyla işlenebilir.</p>
                    <p>Bu işlemler, niteliğine göre KVKK'nın 5. maddesindeki sözleşmenin kurulması veya ifası, hukuki yükümlülüğün yerine getirilmesi, bir hakkın tesisi, kullanılması veya korunması ve temel haklarınıza zarar vermemek kaydıyla veri sorumlusunun meşru menfaati hukuki sebeplerine dayanır. Açık rıza gereken ayrı bir işlem yapılırsa rızanız ayrıca alınır.</p>

                    <h3>4. Verilerin Aktarılması</h3>
                    <p>Verileriniz; yalnızca gerekli olduğu ölçüde hosting ve bilişim hizmeti sağlayıcılarına, iletişim için seçtiğiniz WhatsApp/Instagram gibi platformlara, hukuki veya mali danışmanlara ve kanunen yetkili kamu kurumlarına aktarılabilir. Aktarım işlemleri KVKK'nın 8. ve uygulanması hâlinde 9. maddesindeki şartlara uygun olarak yürütülür.</p>
                    <p>Site, Google Maps üzerinden sağlanan dış içeriği kullanır. Harita içeriği yüklenirken IP adresi ile tarayıcı/cihaz bilgileri ilgili hizmet sağlayıcılar tarafından kendi gizlilik politikaları kapsamında işlenebilir ve yurt dışındaki sunuculara iletilebilir. WhatsApp veya Instagram bağlantısını açtığınızda da ilgili platformun gizlilik koşulları geçerli olur.</p>

                    <h3>5. Çerezler ve Saklama Süresi</h3>
                    <p>Bakır Cosmetic bu sitede reklam, profil oluşturma veya birinci taraf analiz çerezi kullanmamaktadır. Dış hizmet sağlayıcılar kendi teknikleri kapsamında çerez veya benzer teknolojiler kullanabilir. Kişisel veriler, işleme amacı için gerekli süre ve ilgili mevzuatta öngörülen yasal saklama süreleri boyunca tutulur; sürenin sonunda silinir, yok edilir veya anonim hâle getirilir.</p>

                    <h3>6. KVKK Kapsamındaki Haklarınız</h3>
                    <p>KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme, verilerin aktarıldığı üçüncü kişileri bilme, eksik veya yanlış verilerin düzeltilmesini isteme, Kanundaki şartlar çerçevesinde silinmesini veya yok edilmesini talep etme, düzeltme ve silme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme, otomatik sistemlerle yapılan analizler sonucunda aleyhinize bir sonuca itiraz etme ve hukuka aykırı işleme nedeniyle zarara uğramanız hâlinde tazminat talep etme haklarına sahipsiniz.</p>

                    <h3>7. Başvuru Yöntemi</h3>
                    <p>Haklarınıza ilişkin başvurunuzu, kimliğinizi ve talebinizi doğrulamaya yeterli bilgileri içerecek şekilde, yukarıdaki mağaza adresine yazılı olarak iletebilirsiniz. Başvurular, KVKK ve ilgili mevzuatta öngörülen süre ve usule göre sonuçlandırılır. Başvuru kanalları değişirse güncel bilgiler bu metinde yayımlanır.</p>
                </div>
            </div>
        </div>`;

    function initPrivacyModal() {
        if (!document.getElementById('kvkk-modal')) {
            document.body.insertAdjacentHTML('beforeend', modalMarkup);
        }

        const modal = document.getElementById('kvkk-modal');
        const openButtons = document.querySelectorAll('.open-kvkk-modal');
        const closeButtons = modal.querySelectorAll('.close-kvkk-modal');
        let lastTrigger = null;
        let previousBodyOverflow = '';

        const focusableElements = () => Array.from(modal.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(element => element.offsetParent !== null);

        const openModal = trigger => {
            lastTrigger = trigger;
            previousBodyOverflow = document.body.style.overflow;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            window.setTimeout(() => modal.querySelector('.close-kvkk-btn')?.focus(), 100);
        };

        const closeModal = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = previousBodyOverflow;
            lastTrigger?.focus();
        };

        openButtons.forEach(button => {
            button.addEventListener('click', event => {
                event.preventDefault();
                openModal(button);
            });
        });

        closeButtons.forEach(button => button.addEventListener('click', closeModal));

        document.addEventListener('keydown', event => {
            if (!modal.classList.contains('active')) return;

            if (event.key === 'Escape') {
                closeModal();
                return;
            }

            if (event.key !== 'Tab') return;
            const focusable = focusableElements();
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPrivacyModal);
    } else {
        initPrivacyModal();
    }
})();
