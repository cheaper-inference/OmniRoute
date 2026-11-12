# Release-Green: candidate validation and evidence (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green belirli bir işlemi gözlemler ve doğrulama sonuçlarını bildirir. [Kalite Kapıları referansı](../architecture/QUALITY_GATES.md) mevcut CI profillerini, gerekli kontrolleri ve kabul politikasını tanımlar. `config/quality/admission-policy.json` sürümlendirilmiş kabul politikası, `Gate / CI` ve `Gate / Quality` için yürütülebilir sözleşmedir.

## CI ve gözlemci kapsamı

`ci.yml` ve `quality.yml` ana ve sürüm dallarına çekme isteklerini kapsar. Seçilen profil hangi işlerin geçerli olduğunu belirler. Tam CI ayrıca sıradan bir çekme isteğinin yürütmediği şeritleri de içerir. Hızlı gözlemci sonucu bu işlerin yerini alamaz ve tamamlanmış bir iş akışı sarmalayıcısı, girişlerinin yerini alamaz.

Üretim yapısı CI aittir. `quality.yml` yinelenen bir danışma yapısı yoktur. Eksik eserler, iptal edilen işler ve eksik ölçümler, gerekli kontrolün başarılı olduğunu göstermez. Sonuçları kabul etmeden önce mevcut tabanı, başı ve birleşik adayı onaylayın.

## Yerel doğrulama

Bağımlılıklarını hazırladıktan sonra gözlemciyi sahip olunan bir çalışma ağacında çalıştırın. Yoğun doğrulamadan önce `docs/ops/WORKTREE_ISOLATION.md` çalışma ağacını ve kaynak protokolünü izleyin.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Hızlı profil kısmidir. Tam profil, modellenen gereksinimlerini kontrol eder ve komut girişlerini korur; dağıtımı onaylamaz veya geçerli barındırılan kontrollerin yerine geçmez. Rapor, yürütme hatasını metrik sapmadan ayırıyor. Gerekli mandallar seçilen politikaya göre engellemeye devam eder. Sadece geçer bir sonuç elde etmek için taban çizgisini yükseltmeyin.

## Gecelik ve manuel taramalar

Gecelik sürüm ve uyumluluk çözümleyicileri standart bir sürüm dalı seçer. Bu seçim, iş akışını tetikleyen dalla eşleşmelidir ve paketler, olayın değişmez SHA kullanır. Manuel yürütme için `release_branch` amaçlanan sürümü seçin ve aynı referansla gönderin:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Seçilen kod yürütülmeden şubeler arası gönderim reddedilir. Barındırılan ana paketler `main` kontrol eder ve kurulumdan önce SHA hala çözümlenen hedefle eşleştiğini doğrular. Çözümleme sırasında ana hareketler varsa, yeni kayıtta tamamlanmamış taramayı yeniden çalıştırın. Farklı adaylara ait süit faturalarını birleştirmeyin.

## Arıza triyajı ve kurtarma

Olayı bir teşhis indeksi olarak kullanın, ardından tam çalıştırmayı, girişimi, başarısız adımı ve yapıyı inceleyin. Başarısızlığı katkıda bulunan bir kişiye atfetmeden önce eşdeğer temel ve aday kanıtları karşılaştırın. Altyapı hataları, devralınan kusurlar, aday gerilemeleri ve bekleyen onaylar farklı çözümler gerektirir.

`/green-prs`, `/sweep-reds`, `/validate-release-green` ve `/babysit` becerileri, belgelenmiş kapsamları kapsamında kanıt toplar ve düzeltmeler hazırlar. Katkıda bulunan krediyi koruyun, izole onarım şubelerini kullanın ve yetkili bir birleştirme öncesinde gerekli tüm kontrolleri doğrulayın. Hiçbir otomatik yeniden başlangıç veya olay kapatma mevcut adayın yerini tutmaz.
