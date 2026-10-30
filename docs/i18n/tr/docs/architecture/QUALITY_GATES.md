# Quality Gates Reference (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Bu belge, OmniRoute'taki tüm CI kalite kapıları için yetkili referanstır.
Her kapıyı, neyi doğruladığını, hangi CI işinde çalıştığını, bir ratchet temel çizgisi mi
yoksa geçti/kaldı politikası mı kullandığını ve derlemeyi engelleyip engellemediğini ya da yalnızca danışman niteliğinde olup olmadığını açıklar.

Kısa bir özet ve izin listesi politikası için `AGENTS.md` içindeki
"Quality Gates & Ratchets" bölümüne bakın. Aynı sistemin kritik değerlendirmesi, olgunluk
sınıflandırması ve araçtan bağımsız çoğaltma planı için
[Kalite Kapısı Uygulama Kılavuzu](../ops/QUALITY_GATE_PLAYBOOK.md) belgesine bakın.

---

## Geçit envanteri ve yürütme profilleri

### Aday kabulü

CI ve Quality Gates iş akışlarının her biri kararlı bir karar üretir: `Gate / CI` ve
`Gate / Quality`. Bunların sürümlendirilmiş kabul politikası, tüm üst akış işlerini
zorunlu veya tavsiye niteliğinde olarak listeler. Uygulanabilir bir zorunlu iş başarılı
olmalıdır: eksik, iptal edilmiş, atlanmış, beklemede olan ve bilinmeyen sonuçlar PASS
durumunu doğrulayamaz. Geçerli bir yalnızca dokümantasyon veya yalnızca katalog
sınıflandırması, bir kod hattını uygulanamaz hâle getirebilir; taslak bir PR kabul
edilen bir aday değildir. Bir `hotfix` etiketi kanıt gerekliliğini ortadan kaldırmaz.

Her iki iş akışı da main/release dallarına yönelik PR'leri, `main` dalına gönderimleri,
manuel dispatch ve merge-group olaylarını kapsar. Push, dispatch ve merge-group tam
seçimi çalıştırır. `release/**` dallarına yapılan gönderimler bunları başlatmaz
(2026-10-18): her değişiklik matrisi zaten kendi PR'inde çalıştırmıştır ve birleştirilmiş
kombinasyon Release-Green'in işidir (`docs/ops/RUNNER_BOX.md` → Barındırılan hat). Fork'lar
ve merge grupları, normalde kendi kendine barındırılan çalıştırıcıları seçen işler için
barındırılan çalıştırıcılar kullanır; kullanıma sunmadan önce yeterli barındırılan
kapasitenin mevcut olduğu doğrulanmalıdır.

Her JSON makbuzu, checkout yapılan SHA'yı, iş akışı çalıştırmasını ve denemeyi tanımlar.
CLI, checkout/olay SHA uyuşmazlığını reddeder. İş akışı testleri, politika üyeliğini
karar işinin `needs` listesine bağlar; böylece yeni veya kaldırılmış bir hat sessizce
ortadan kaybolamaz. Makbuzlar; yayımlama, dağıtım veya mevcut bir tavsiye niteliğindeki tarayıcının iç işleyişini değil, kendi iş akışlarını kapsar. Geçerli kontrolleri dal kurallarında zorunlu kılmak ayrı bir idari değişikliktir; işlerini tanımlamak tek başına bir dalı korumaz.

`API Route Typecheck`, her iki toplu hükmün ve yerel tam gözlemcinin statik profilinin dışında kalan bağımsız bir iş akışı kontrolüdür. Tam aday için sonucunu ayrı olarak inceleyin. `.github/workflows/api-route-typecheck.yml`; `main` veya `release/**` dallarını hedefleyen PR'larda, bu iki dal ailesinden birine yapılan push'larda ve manuel tetiklemede çalışır. Herhangi bir yol filtresi yoktur. PR hedef dalı değişiklikleri yeni bir kontrol talep eder; gövde/başlık düzenlemeleri yalnızca gözlem amaçlı `Admission not requested / API Route Typecheck` adını kullanır ve kabul kontrolünün yerini alamaz. İş akışı bir merge-group tetikleyicisi tanımlamaz. Bu kontrolü zorunlu kılan herhangi bir merge-queue kullanıma alımı, önce söz konusu olay için kontrolün yürütülmesini sağlamalıdır.

### UI yürütme kapasitesi

CI, tam UI envanterini dört `test-vitest` matris parçası olarak çalıştırır; her birinde
en fazla iki worker ve mevcut 15 dakikalık iş zaman sınırı bulunur. İlk parça ayrıca
MCP/autoCombo Vitest paketini de çalıştırır. Zorunlu iş sonucu, matrisin her ayağını
kapsar; bir parçanın başarısız olması veya iptal edilmesi aday kabulünü doğrulayamaz.

Gecelik gözlemci, ilk makbuzdaki MCP yürütmesi dâhil olmak üzere her UI parçası için
ayrı bir tam aday makbuzu tutar. Dört makbuzun, günlüklerin ve eşleşen yürütme
kimliklerinin tamamı zorunludur. Yerel `npm run test:vitest:ui` hâlâ tam paketi seçer;
tek bir `--shard` çalıştırması yalnızca kısmi kanıttır.

### Birim kapsamı toplama

On iki birim parçası, mevcut test yürütmeleri sırasında V8 kapsamını toplar. Başarılı
bir parça, ara bir Istanbul raporu oluşturmadan özgün dosyaları sıkıştırmak için
`scripts/ci/compact-v8-coverage.mjs` komutunu çalıştırır. Son Coverage işi, on iki
manifestin tamamını aday SHA, çalışma zamanı, kaynak kökü ve veri karmalarına göre
doğrular; ardından c8 raporlayıcılarını ve mevcut kapsam eşiklerini çalıştırır.
Girdiler, c8'in genel dosya adı sırasını korur; parça bazında ön birleştirme, karma
fonksiyon/blok kapsamı için güvenli değildir. Eksik, hatalı biçimlendirilmiş veya
uyumsuz parçalar kabulün başarısız olmasına neden olur. Başarısız test parçaları,
ham tanılama kapsamını ayrı olarak saklar; bu kapsam son birleştirmeye dâhil edilemez.

### Birim yürütme ilerleme kayıtları

Paylaşılan `test:unit:ci:shard` komutu, `primary`, `dashboard` ve `serial` aşamalarını `scripts/ci/unit-progress-reporter.mjs` aracılığıyla kaydeder. Normal test raporu kullanılabilir olmaya devam eder. Yalnızca meta veri içeren ayrı bir kayıt, her dosyanın başlangıcını ve tamamlanmasını kaydeder; 30 saniyelik düzenli durum bildirimi ise hâlâ etkin olan dosyaları ve geçen sürelerini listeler. Yalnızca izin verilen yürütme meta verileri kaydedilir; test açıklamaları, çıktılar, hata içerikleri ve ortamın tamamı serileştirilmez.

CI ve Quality, JSONL dosyalarını `unit-progress-ci-<run>-<attempt>-<shard>` ve `unit-progress-quality-<run>-<attempt>-<shard>` olarak saklar. Bir iş zaman aşımı, sonraki yüklemeyi engelleyebilir; önceden gönderilmiş düzenli durum bildirimleri tanılama kanıtı olarak kalır. Eksik düzenli durum bildirimleri, engellenmiş veya sonlandırılmış bir çalıştırıcı sürecine de işaret edebilir. Bu kayıtlar mevcut test seçimini, eşzamanlılığı, son tarihleri ve çıkış durumunu korur; aday kabulüyle ilgili kararlar değildir.

### Kabul sonuçlarını birleştiren modülde saklanan kanıtlar

`scripts/quality/validate-release-acceptance.mjs`, verilen planı ve manifestlerini birleştirir; planın tüm yayın işlem hattını kapsadığını kanıtlamaz. Plan `VERIFIED` olsa bile raporları açıkça `releaseAcceptance: false` ayarlar. `release-acceptance.yml` iş akışı hâlâ gerçek derleme, paketleme, başlatma veya yükseltme kayıtları yerine shadow test verilerini kullanır.

CLI, saklanan kanıtları doğrulamak için `--evidence-root` gerektirir. Dosyalar `<evidence-root>/<artifact_id>/<member>` yolunda bulunur ve SHA-256 özetleri hesaplanır. Kanıtsız bir PASS kaydı, eksik veya değiştirilmiş dosya, güvenli olmayan yol ya da sembolik bağlantı doğrulamayı engeller. Eksik dosyalar, başarılı çalıştırmaların boş günlükleriyle eşdeğer değildir. Mevcut SHA/run/attempt kontrolleri bağımsız kalır: eşleşen baytlar güncelliğini yitirmiş bir kaydı geçerli kılamaz. Dosya bütünlüğü, çalıştırmanın gerçekliğini veya artefaktın yükseltildiğini kanıtlamaz.

### Statik tarama envanteri

Sürümlendirilmiş npm alias envanteri ve statik tarama üyeliği
`config/quality/gate-manifest.json` içinde bulunur. Script adlarını ve tam komutları
`package.json` ile karşılaştırarak doğrulamak için `npm run check:gate-manifest`
komutunu çalıştırın; eklemeler, kaldırmalar ve komut sapmaları hem yerel hook'un hem de
CI'daki değişiklik sınıflandırma işlerinin başarısız olmasına neden olur. Bir alias;
iş akışı işi, matris örneği veya test senaryosu değildir: bu sayıların birbirinin
yerine kullanılabilir olduğu belirtilmemelidir.

Seçilen alias'ları çalıştırmadan incelemek için
`npm run quality:scan -- --list` veya `npm run quality:scan:fast -- --list`
komutunu kullanın. Çalıştırıcı npm entrypoint'ini çağırdığı için, yapılandırıldığı
durumlarda Bun dâhil olmak üzere çalışma zamanı korunur. Manifest, bu profillerin
dışındaki alias'ları ayrı ayrı çağrılanlar olarak kaydeder ve salt okunur tarama
profillerinde bakım komutları yasaktır.

Bu profiller yalnızca statik taramayı kapsar. Ürün testlerini, kapsamı, paketlemeyi,
harici kontrolleri veya bir adayın tam sürüm kabulünü onaylamaz. İş akışı kabulü,
bağlantılı `config/quality/admission-policy.json` ve
`scripts/quality/admission-verdict.mjs` dosyalarını kullanır. Release-observer
profilleri ayrı kalır; bunların uygulanabilir kontrollerini ve makbuzlarını bağımsız
olarak inceleyin. Tam gözlemcinin statik komutları,
`audit:deps`, mutasyon testi seçimi ve çeviri kontrolleri dâhil olmak üzere
`config/quality/release-green-static-profile.json` içinde bildirilir. Yükleyici,
npm komutlarını package.json ve modellenmiş CI/Quality bildirimlerine göre doğrular;
shell token'larını argüman olarak çalıştırmak yerine sapmayı reddeder. Zorunlu
tarayıcılardan gelen SKIP/INCOMPLETE çıktısı PASS durumunu doğrulayamaz. Profil,
harici hariç tutmalarını kaydeder ve barındırılan kapsamın, test matrislerinin, paket
veya dağıtım kanıtlarının yerini almaz. Aşağıdaki açıklayıcı envanter bir referanstır;
bir geçidin gerçekten çalıştığının kanıtı değildir.

Script'ler `scripts/check/` (politika geçitleri) ve `scripts/quality/` (ratchet motoru)
altında bulunur. CI'ın doğruluk kaynağı `.github/workflows/ci.yml` dosyasıdır.

### Yayımlanan temel dokümantasyonun durumu

`.github/workflows/i18n-base-health.yml`, `main` ve `release/v*` dallarına yapılan seçili
gönderimlerden sonra ve manuel tetikleme sırasında dokümantasyonun durumunu izler. Filtreleri;
dokümantasyonu, kök dizindeki Markdown dosyalarını, `llm.txt` dosyasını, çeviri durumunu/yapılandırmasını
ve ilgili i18n araçlarını kapsar. Tek `Published base documentation health` işi, barındırılan Ubuntu'yu
kullanır ve beş dakikalık bir zaman sınırına sahiptir. Salt okunur doğrulama gerçekleştirir ve
bağımlılık kurulumu, çeviri veya durum benimsemesi olmadan bir tanılama makbuzu yazar.

`scripts/i18n/check-base-health.mjs`; kaynak karması, eksik hedef, hedef karması,
güncelliğini yitirmiş çeviri ve bölüm önbelleği tutarsızlıklarının bulunmamasını gerektirir.
Ayrıca mevcut çekirdek belge/yerel ayar kapsamını ve bunun kaydedilmiş kaynağını doğrular.
Geçersiz bağlam, eksik kapsam veya kesintiye uğramış bir denetleyici `INCOMPLETE`; doğrulanmış
sapma ise `FAIL` sonucunu üretir. Her ikisi de başarısızlığı belirten bir çıkış durumu döndürür.
Makbuz; kullanıma alınan SHA'ya, iş akışına, çalıştırmaya ve denemeye bağlıdır ve
`i18n-base-health-<sha>-<run>-<attempt>` olarak saklanır.

Bu, yayımlanan temelin bağımsız bir gözlemidir. Bir PR veya birleştirme grubu olayı,
zorunlu bir PR denetimi, npm takma adı ya da statik tarama profili üyesi eklemez.
Mevcut diferansiyel PR politikası ve temel denetleyicinin tavsiye niteliğindeki sınıflandırmaları
ayrı kalır. Başarılı bir yükleme, başarısız bir durum sonucunu PASS'e dönüştüremez.

### Release PR hızlı yolu (`quality.yml`)

`.github/workflows/quality.yml`; main/release PR'lerinde, `main` dalına gönderimlerde,
dispatch ve merge gruplarında CI'ı tamamlar. PR'ler, yol filtreli hızlı kontrolleri
kullanır. Kalıcı olarak devre dışı bırakılmış yinelenen build kaldırılmıştır; gerçek
build/package/boot kontrolleri CI'da kalır.

| İş                                               | Kapsam                                                                                                                                                                                                                                    | Engelleme             |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | Dokümantasyon/kod PR'ları; API dokümantasyonu referansları ve docs-all                                                                                                                                                                    | Evet                  |
| `Fast Quality Gates`                             | Kod PR'ları; statik kontroller, tür denetimi, dashboard tür denetimi, etkilenen birim testleri                                                                                                                                            | Evet                  |
| `Forgotten sibling tests`                        | Kod PR'ları; değiştirilen modüllerden statik tüketicilere ve aday kardeş testlere kadar izleme; barrel ve dinamik içe aktarma yolları, referans verilen izin listesi istisnalarıyla birlikte öneri niteliğinde tanılama olarak raporlanır | **Öneri niteliğinde** |
| `Vitest (fast-path)`                             | Kod PR'ları; hızlı vitest paketi                                                                                                                                                                                                          | Evet                  |
| `Unit Tests fast-path`                           | Kod PR'ları; 4 parçalı birim testi paketi                                                                                                                                                                                                 | Evet                  |
| `No new ESLint warnings`                         | Kod PR'ları; bastırmaları dikkate alan lint koruması                                                                                                                                                                                      | Evet, fork'lar dâhil  |
| `Merge integrity (changelog + generated skills)` | Taslak olmayan PR'lar; değişiklik günlüğü ve oluşturulan skill eşitlemesi                                                                                                                                                                 | Evet, fork'lar dâhil  |

#### Unutulan kardeş testler raporu

`npm run check:forgotten-sibling-tests`, test etki haritasının arkasındaki içe aktarma çözümleyicisini yeniden kullanır.
Değiştirilen her üretim modülü için, aday test pull request diff'inde bulunmadığında belirlenimci
`changed module/symbol -> static consumer -> candidate sibling test` zincirlerini raporlar.
Markdown özeti ve JSON sonucu, herhangi bir engelleyici kullanıma geçilmeden önce kalibrasyon amacıyla
`forgotten-sibling-tests` iş akışı artefaktı olarak saklanır.

Barrel yeniden dışa aktarmaları ve dinamik içe aktarmalar yalnızca çözümleme tanılamalarıdır; hiçbir zaman
engelleyici bir bulgu oluşturmazlar. İncelenmiş istisnalar
`config/quality/forgotten-sibling-allowlist.json` içinde bulunur. Her girdi, tüketiciyi ve aday
testi adlandırmalı, belirli bir gerekçe sunmalı ve bir GitHub issue'suna veya pull request'e bağlantı vermelidir. Hatalı biçimlendirilmiş girdiler
güvenli biçimde başarısız olur. İstisnalar, silinmiş bir aday testi veya `.skip`/`.todo` ekleyen bir diff'i
bastıramaz; assertion zayıflatma ve diğer maskeleme yöntemleri, bağımsız olarak engelleyici olan
`check:test-masking` kontrolünün sorumluluğunda kalır.

### İş: `lint`

`main` dalına gönderilen her PR'da çalışır. Başarısızlık durumunda birleştirmeyi engeller.

| Betik (`npm run ...`)             | Doğruladıkları                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Engelleyici                                       |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:node-runtime`              | Node.js sürümünün desteklenen aralıkta olması                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Evet                                              |
| `check:test-tla-order`            | `tests/unit` altındaki hiçbir `node:test` dosyasının bir test kaydedip üst düzey bir `await` ifadesine ulaştıktan sonra daha fazla test kaydetmemesi (#18045; kademeli sıkılaştırma: `test-tla-order-allowlist.json` yalnızca küçülebilir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Evet                                              |
| `check:cycles`                    | `src/` + `open-sse/` genelindeki döngüsel içe aktarımlar (AST tabanlı, tsconfig `paths` çözümlenmiş). Herhangi bir döngü olduğunda doğrudan çalıştırma 1 koduyla çıkar (kapalı durumda başarısız olma davranışı #15281'den beri geçerlidir) ve SCC'leri listeler. `check:cycles:ratchet` (CI'ın çalıştırdığı), sayı `quality-baseline.json` içindeki `metrics.cycles` üst sınırını aştığında engeller — şu anda 14, `direction: down`; dolayısıyla yalnızca azalabilir (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Evet (kademeli sıkılaştırma)                      |
| `check:boundary`                  | `open-sse → src` bağımlılığı: motordan uygulamaya yapılan benzersiz dosyadan dosyaya içe aktarımlar (`scripts/quality/measure-boundary.mjs`; kenar listesi, v4 çekirdek/modül ayırma düzeltme iş listesidir). Doğrudan çalıştırma = bilgilendirici rapor (`quality:boundary` ile aynı). `check:boundary:ratchet` (CI'ın çalıştırdığı ve ayrıca `quality.yml` hızlı denetimler kademeli sıkılaştırma döngüsünde bulunan), sayı `quality-baseline.json` içindeki `metrics.boundaryOpenSseToSrc` üst sınırını aştığında engeller — ölçülen 771 değeriyle başlatılmıştır, `direction: down`; `--update` yalnızca bu değeri düşürür; PR'larda tabana göre değerlendirilir (`--base-ref`, aşağıya bakın)                                                                                                                                                                                                                                                                                                              | Evet (kademeli sıkılaştırma)                      |
| `check:route-validation:t06`      | Tüm rotalarda Zod şemaları mevcut (Kademe 6 politikası)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Evet                                              |
| `check:any-budget:t11`            | `@ts-expect-error // any` sayısı bütçeyi aşmıyor (Kademe 11 turnikesi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Evet                                              |
| `check:provider-consistency`      | `providers.ts` içindeki her sağlayıcının `providerRegistry.ts` içinde eşleşen bir girdisi vardır (ve izin verilenler listesi kapsamında bunun tersi de geçerlidir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Evet                                              |
| `check:model-lifecycle`           | Elle tutulan üç yönlendirme tablosu, depoya eklenmiş yaşam döngüsü anlık görüntüsüyle (#11503) tutarlı kalır: `FITNESS_TABLE` (`taskFitness.ts`), `REGISTRY` tarafından yönlendirilebilen kullanımdan kaldırılmış hiçbir kimliği puanlamaz; her `BUILT_IN_ALIASES` hedefi `REGISTRY` içinde bulunur ve kullanımdan kaldırılmış kimliklerin anlık görüntüsünde bulunmaz; hâlâ `REGISTRY` içinde bulunan kullanımdan kaldırılmış her kimlik yönlendirilir veya `allowedRetiredInCatalog` içinde listelenir; ayrıca hiçbir `DEFAULT_DEGRADATION_MAP` kaynağı ya da hedefi bu anlık görüntüde kullanımdan kaldırılmış olarak görünmez. Bu, bir modelin şu anda canlı bir üst hizmet tarafından sunulduğunu kanıtlamaz. Çevrimdışı — elle `npm run quality:refresh-model-lifecycle` (ağ gerektirir; CI'a bağlanmamıştır) kullanılarak yenilenen `config/quality/model-lifecycle.json` ile karşılaştırır. `allowedRetiredInCatalog`, kademeli azaltma mandalıdır: yalnızca bir takip kaydıyla birlikte girdi ekleyin. | Evet                                              |
| `check:fetch-targets`             | İstemci tarafındaki `src/` içinde bulunan her `fetch("/api/...")`, gerçek bir `route.ts` dosyasına çözümlenir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Evet                                              |
| `check:deps`                      | Depodaki her `package.json` genelinde `npm install` ile kurulabilen tüm bağımlılıklar `dependency-allowlist.json` içindedir; yeni sabitlenmemiş veya ad benzerliği saldırısına maruz kalmış paketler işaretlenir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet                                              |
| `audit:deps`                      | Beş bağımsız lockfile'ın (kök, Electron, OpenCode eklentileri v1/v2 ve sağlayıcı) tümü için npm denetimi. Kritik güvenlik bildirimleri engeller; yüksek önem düzeyindeki bildirimler görünür uyarılar olarak kalır. Eksik/başarısız denetimler INCOMPLETE olarak değerlendirilir ve engeller; kapsam başına lock karmaları ve raporlar saklanır.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet                                              |
| `check:lockfile`                  | `package-lock.json` bütünlüğü — https kayıt defteri, bütünlük karmaları, ana makine geçersiz kılmaları yok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Evet                                              |
| `check:licenses`                  | Üretim bağımlılıkları için SPDX lisans izin listesi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                              |
| `check:tracked-artifacts`         | Derleme çıktıları / commit edilmiş `node_modules` sembolik bağlantıları yok (husky pre-commit sırasında da çalışır; pre-push kasıtlı olarak hafiftir — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Evet                                              |
| `check:ai-attribution`            | PR commit'lerinde, başlığında veya gövdesinde yapay zekâ/bot `Co-Authored-By` alt bilgisi ya da yapay zekâ üretimi dipnotu yok — Kesin Kural #16 (`quality.yml` içindeki PR→`release/**` hızlı denetimler döngüsünde — olay yükünü okur, PR dışında işlem yapmaz — ve `ci.yml` lint içinde PR→`main` için yalnızca PR'lerde çalışan bir adım; ayrıca husky `commit-msg` kancası; insan ortak yazarlarına izin verilir; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Her Vitest hariç tutma işlemi bir takip kaydı numarası belirtir ve `config/quality/vitest-exclusions.json` içinde yer alır (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                              |
| `check:file-size`                 | Kaynak dosyalar (`src/`, `open-sse/`, `electron/`, `bin/` içindeki `.ts`/`.tsx` dosyaları) `cap` sınırı, test dosyaları (`*.test.ts(x)`) ise `testCap` sınırı içinde kalır; `file-size-baseline.json` içinde dondurulan (`frozen` / `testFrozen`) dosyalar kaydedilmiş boyutlarını aşmamalıdır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Evet                                              |
| `check:error-helper`              | Yürütücülerdeki/işleyicilerdeki hata yanıtları `buildErrorBody()` / `sanitizeErrorMessage()` kullanır (Kesin Kural #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Evet                                              |
| `check:migration-numbering`       | Geçiş SQL dosyaları boşluk veya yinelenen numara olmadan sıralı şekilde numaralandırılmıştır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Evet                                              |
| `check:public-creds`              | `publicCreds.ts` dışında değişmez OAuth `client_id`/`client_secret` veya Firebase Web anahtarları bulunmaz (Kesin Kural #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Evet                                              |
| `check:db-rules`                  | `src/lib/db/` modülleri dışında ham SQL bulunmaz; `localDb.ts` dosyasından toplu içe aktarma yapılmaz (Kesin Kurallar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Evet                                              |
| `check:known-symbols`             | Dağıtım tablolarında kayıtlı sağlayıcı yürütücüleri, yönlendirme stratejileri ve dönüştürücüler diskteki dosyalarla eşleşir; sahipsiz veya bildirilmemiş sembol bulunmaz                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Evet                                              |
| `check:route-guard-membership`    | Bir alt süreç başlatan her rota `isLocalOnlyPath()` tarafından sınıflandırılır (Kesin Kurallar #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Evet                                              |
| `check:test-discovery`            | Depodaki her `*.test.ts` / `*.spec.ts` dosyası en az bir test çalıştırıcısı tarafından toplanır (mandal: `test-discovery-baseline.json` içindeki sahipsiz dosya listesi yalnızca küçülebilir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Evet                                              |
| `check:agent-skills-sync`         | Oluşturulan agent-skills çıktıları kaynak kataloglarıyla eşleşir (sapma yoktur)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Sağlayıcı logoları/varlıkları kayıtlı bir kaynak bilgisi girdisine sahiptir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `lint:json`                       | JSON yapılandırma dosyaları ayrıştırılır ve depo lint kurallarını karşılar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | Hatasız TypeScript derlemesi (yalnızca öneri niteliğinde uyarılar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Evet                                              |
| `typecheck:noimplicit:core`       | Katı `noImplicitAny` — geleceğe yönelik; önceden var olan birçok çağrı noktasının hâlâ tür ek açıklamalarına ihtiyacı vardır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **Öneri niteliğinde** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` ile sınırlandırılmış `tsc` (#7033) — `typecheck:core` komutunun özenle seçilmiş 27 dosyalık izin listesi hiçbir dashboard TSX dosyasını içermez ve `next build` de bunu hiçbir zaman tür denetiminden geçirmez (`next.config.mjs`, `ignoreBuildErrors: true` olarak ayarlanmıştır); bu nedenle buradaki sahipsiz tanımlayıcı regresyonları (#6625/#6909) CI tarafından görülemiyordu. Sabitlenmiş dosya başına/TS kodu başına sayı temel çizgisine (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` ile aynı eski kayıt zorlama kalıbı) göre farkları karşılaştırır — yalnızca temel çizgideki sayıyı aşan YENİ hatalar geçidi başarısız kılar; önceden var olan bir hata düzeltildiğinde `--update` ile eşiği düşürün.                                                                                                                                                                                                                                      | Evet                                              |

### İş: `quality-gate`

`test-coverage` sonrasında çalışır. Başarısızlık durumunda birleştirmeyi engeller.

| Betik                        | Doğruladığı                                                                                                                                                                                           | Engelleyici                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `quality:collect`            | `quality-metrics.json` dosyasını oluşturur (ESLint uyarı sayısı, birleştirilmiş parça raporundan kapsam)                                                                                              | Evet (eşik mekanizmasının öncülü) |
| `quality:ratchet`            | `quality-baseline.json` içindeki hiçbir metrik gerilememiştir (ESLint uyarıları ≤ temel çizgi; kapsam ≥ temel çizgi)                                                                                  | Evet                              |
| `check:duplication`          | Kod yineleme oranı (jscpd@4), `quality-baseline.json` içindeki temel çizgiyi aşmaz                                                                                                                    | Evet                              |
| `check:complexity`           | Dosya düzeyindeki döngüsel karmaşıklık üst sınırı aşmaz (temel ESLint `complexity` + `max-lines-per-function`)                                                                                        | Evet                              |
| `check:cognitive-complexity` | Bilişsel karmaşıklık eşik mekanizması (`eslint-plugin-sonarjs`) — ayrı ESLint geçişi; CI her ikisini tek bir `check:complexity-ratchets` adımı olarak birleştirir                                     | Evet                              |
| `check:dead-code`            | Kullanılmayan dışa aktarımlar / dosyalar eşik mekanizması, temel çizgiye kıyasla gerilemez                                                                                                            | Evet                              |
| `check:compression-budget`   | Sıkıştırma kıyaslama bütçesi — motor başına token tasarrufu alt sınırları gerilememelidir                                                                                                             | Evet                              |
| `check:type-coverage`        | Türlendirilmiş yüzde eşik mekanizması (`type-coverage`) gerilemez; büyük ölçüde `typecheck:noimplicit:core` işlevini kapsar                                                                           | Evet                              |
| `check:codeql-ratchet`       | Açık CodeQL uyarılarının sayısı gerilemez (`gh api` aracılığıyla okur; token olmadan sorunsuzca atlar) — yenileme sıklığı ve manuel tetikleme için aşağıdaki "CodeQL eşik mekanizması" bölümüne bakın | Evet                              |

### İş: `quality-extended`

Bu iş, geçerli adayları engeller. Paket boyutu, gizli bilgi bulguları, güvenlik açığı
bulguları, iş akışı bulguları ve OpenAPI değişiklikleri zorunlu eşik mekanizmalarıyla
denetlenir. Döngüsel bağımlılık tanılamaları öneri niteliğinde kalır. Tarayıcıların
kurulması zorunludur: `scripts/ci/install-quality-scanners.sh`, sabitlenmiş sürümleri
kurar ve kurulum hatalarını iletir. Eksik araçlar, geçersiz raporlar veya eksik temel
çizgiler, zorunlu tarayıcı geçidini TAMAMLANMAMIŞ durumda bırakır.

| Betik                    | Doğruladığı                                                                                                                                                                                                                     | Engelleme Durumu                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `check:circular-deps`    | Döngüsel bağımlılık yok (dpdm)                                                                                                                                                                                                  | **Bilgilendirme amaçlı**                                       |
| `check:bundle-size`      | Paket boyutu üst sınırı aşmaz; ölçümün kullanılamaması başarısızlığa neden olur                                                                                                                                                 | **--ratchet ile engelleyici**                                  |
| `check:secrets`          | Gitleaks bulguları gerilemez; zorunlu taramalar eksik araçları/kaynakları/temel değerleri, başarısız taramaları ve geçersiz raporları reddeder                                                                                  | **--ratchet ile engelleyici**                                  |
| `check:vuln-ratchet`     | Bağımlılık güvenlik açıkları gerilemez; zorunlu taramalar eksik araçları, geçersiz raporları veya eksik temel değerleri reddeder                                                                                                | **--ratchet ile engelleyici**                                  |
| `check:workflows`        | İş akışı lint denetimi (actionlint + zizmor); eksik/bozuk tarayıcılar, geçersiz raporlar veya eksik ratchet temel değeri INCOMPLETE olarak başarısız olur. Geçerli bulgular, seçilen strict/advisory/ratchet politikasını izler | Çalıştırılması zorunludur; zizmor ratchet CI'da engelleyicidir |
| `check:openapi-breaking` | Sabitlenmiş olay commit'lerine göre genel API sözleşmesi (PR merge-base, push öncesi, merge-group temeli; zamanlanmış/manuel checkout için ilk üst öğe); zorunlu ölçüm kapalı şekilde başarısız olur                            | **--ratchet ile engelleyici**                                  |

### İş: `docs-sync-strict`

`main` veya `release/**` dalına yönelik pull request'lerde bu iş yalnızca taslak olmayan (veya güvenilir bir kuyruktan gelen) ve dokümantasyon ya da kod değişikliği olarak sınıflandırılan adaylar için çalışır. PR dışındaki CI olaylarında da çalışır; bu iş akışının push tetikleyicisi yalnızca `main` dalını kapsar, `release/**` dallarını kapsamaz. Sıfırdan farklı çıkış koduyla biten bir adım işi engeller; yalnızca raporlanan bulgular ve aşağıda belgelenen istisnalar engellemez.

| Betik                          | Doğruladığı                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Engelleme Durumu                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Aşağıdaki 7 alt geçidi sırayla çalıştıran meta geçit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet                                                                                                                                 |
| ↳ `check:docs-sync`            | Paket/OpenAPI/CHANGELOG sürüm tutarlılığı, `llm.txt` dosyasının birebir aynaları, çevrilmiş CHANGELOG'un bölüm ve boyut değişmezleri ve yerlerine yenileri konmuş yinelenen belgelerin bulunmaması                                                                                                                                                                                                                                                                                                                                                  | Evet                                                                                                                                 |
| ↳ `check:docs-frontmatter`     | Derlenmiş dokümantasyon sayfalarının geçerli frontmatter başlıkları içermesi                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Evet                                                                                                                                 |
| ↳ `check:docs-counts`          | Yüksek güvenilirlikteki sayım değişmezleri katı biçimde uygulanır; dosya sayısına ilişkin sezgisel kontroller, betiğe `--strict` verilmedikçe yalnızca uyarır (CI meta geçidi bu bayrağı vermez)                                                                                                                                                                                                                                                                                                                                                    | Katı katman engelleyicidir; esnek katman tavsiye niteliğindedir                                                                      |
| ↳ `check:env-doc-sync`         | Açıkça belirtilen yok sayma, yalnızca dokümantasyonda bulunma ve yalnızca ortamda bulunma izin listeleri uygulandıktan sonra kaynak koddaki ortam değişkeni okumaları, `.env.example` ve `docs/reference/ENVIRONMENT.md` birbiriyle uyuşur                                                                                                                                                                                                                                                                                                          | Evet, belgelenmiş izin listelerinin dışında                                                                                          |
| ↳ `check:deprecated-versions`  | Yok sayılan belgeleri hariç tutarak güvenli tarihsel bağlamlar dışındaki olası eski sürümleri ve eski güncelleme tarihlerini raporlar                                                                                                                                                                                                                                                                                                                                                                                                               | Mevcut CI bağlantısında tavsiye niteliğindedir (`--strict` verilmez)                                                                 |
| ↳ `check:doc-links`            | Dokümanlardaki dahili markdown bağlantıları gerçek dosyalara çözümlenir (`[text]`/`(path)` biçimi)                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Evet                                                                                                                                 |
| ↳ `check:fabricated-docs`      | Dokümanlarda belirtilen rotalar, ortam değişkenleri, CLI komutları, hook adları ve dosya yolları kod tabanında bulunur. `--strict` ile katı geçit; bayrak olmadan engelleyici olmayan başarısızlık.                                                                                                                                                                                                                                                                                                                                                 | Evet (CI'da `--strict` aracılığıyla)                                                                                                 |
| `check:cli-i18n`               | CLI'da kullanılan `t()` anahtarları `en` içinde bulunur; `pt-BR` her üst düzey bölümü korur; `zh-CN` ve `zh-TW`, `en` içindeki her anahtarı içerir                                                                                                                                                                                                                                                                                                                                                                                                  | Evet                                                                                                                                 |
| `check:openapi-coverage`       | OpenAPI spesifikasyonu, gerçek rotaların en az ratchet ile belirlenen alt sınırını kapsar                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Evet                                                                                                                                 |
| `check:openapi-security-tiers` | Bildirilen `x-loopback-only`/`x-always-protected` ek açıklamalarının `routeGuard.ts` tarafından desteklenmesi gerekir; ayrıştırıcı hataları ve ileri yönlü kontroldeki uyuşmazlıklar engeller. Yalnızca yerel erişime izin veren önekler altında eksik `x-loopback-only` için yapılan ters kontrol uyarı verir; yalnızca desenlerle tanımlanan rotalar bu ters kontrolden hariç tutulur.                                                                                                                                                            | Ayrıştırıcı ve ileri yönlü kontroller engelleyicidir; ters kontrol tavsiye niteliğindedir                                            |
| `check:openapi-routes`         | Gerekçelendirilmiş `KNOWN_STALE_SPEC` izin listesi uygulandıktan sonra `openapi.yaml` içindeki her `/api...` yolu, parametre farklarından bağımsız olarak gerçek bir rotayla eşleşir; izin listesindeki artık geçerli olmayan girdiler de başarısızlığa yol açar                                                                                                                                                                                                                                                                                    | Evet                                                                                                                                 |
| `check:docs-symbols`           | Ayna olmayan kanonik belgelerdeki dahili `/api/...` URL referansları gerçek bir rotayla veya rota ailesiyle eşleşir; vekil sunucu, üst kaynak, yer tutucu ve dosya referansları ile gerekçelendirilmiş `KNOWN_STALE_DOC_REFS` girdileri hariç tutulur, izin listesindeki artık geçerli olmayan girdiler ise başarısızlığa yol açar                                                                                                                                                                                                                  | Evet                                                                                                                                 |
| `i18n translation drift`       | Temel belgelerin kaynak/hedef karmalarını ve çevirinin kökenini denetler. PR karşılaştırması yalnızca birebir aynı devralınmış hatalara izin verir; kaynak, eksik hedef, hedef karması, güncelliğini yitirmiş çeviri veya bölüm önbelleğiyle ilgili yeni ya da doğrulanmamış tutarsızlıklar engeller. PR karşılaştırması dışında kaynak/eksik hedef/hedef karması hataları engellerken güncelliğini yitirmiş çeviriler ve tutarsız bölüm önbellekleri yalnızca uyarı olarak kalır. Eski biçimdeki bölüm önbelleğinin bulunmaması bir hata değildir. | Yeni/doğrulanmamış PR sapması engeller; birebir aynı devralınmış sapma yalnızca uyarıdır; PR dışındaki kurallar hata türüne bağlıdır |

### İş: `i18n-ui-coverage`

| Betik                                | Doğruladığı                                                                                                                                                                                                 | Engelleyici     |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (satır içi) | UI i18n anahtar kapsamı ≥ %65'tir                                                                                                                                                                           | Evet            |
| `check-ui-value-drift` (satır içi)   | Yeniden yazılmış bir İngilizce **değer**, geride eski çeviri bırakmaz                                                                                                                                       | Evet            |
| `check-new-key-coverage` (satır içi) | **Yeni** bir İngilizce anahtar her yerel ayarda çevrilmiştir — `__MISSING__:` işaretçisi reddedilir                                                                                                         | Evet            |
| `check-translation-ratio`            | Yerel ayar başına gerçek çeviri oranı (İngilizceyle aynı / yer tutucu / izin verilenler listesinin dışında eksik kalanlar), `config/quality/i18n-translation-baseline.json` + tolerans değerini aşmamalıdır | **Engelleyici** |

`fetch-depth: 0` gerektirir — değer sapması kapısı, `en.json` dosyasını birleştirme tabanıyla karşılaştırır.

#### `check-ui-value-drift` — eski çeviri kapısı

Diğer kapıların yapısal olarak göremediği i18n regresyonunu yakalar: İngilizce bir değer
yeniden yazılırken _önceki_ İngilizceden türetilmiş çeviriler geride kalır; böylece
İngilizce konuşmayan kullanıcılar, kendinden emin bir dille yazılmış ancak artık yanlış olan metni okumaya devam eder.

Bu gerçekten üretime çıktı. Antigravity oturum açma yardımcısı eklendiğinde (#5203)
`oauthModal.googleOAuthWarning` yeniden yazıldı; **43 yerel ayarın 39'u**, operatörlere "tam
URL'yi kopyalayıp aşağıya yapıştırmalarını" söyleyen metni korudu — bu sağlayıcı için
tamamlanması mümkün olmayan bir akış. Aşağıdaki nedenlerden dolayı #8463'e kadar fark edilmedi:

- `sync-ui-keys` yalnızca **bulunmayan** anahtarları geri doldurur, **eski** olanları asla doldurmaz;
- `check-ui-keys-coverage` anahtar _varlığını_ sayar, dolayısıyla eski bir çeviri kapsanmış olarak değerlendirilir;
- `check-translation-drift`, `docs/i18n/<locale>/**.md` dokümantasyon yansımalarını izler —
  `src/i18n/messages/*.json` dosyasını asla okumaz. 2026-09 yeniden eşitlemesinden bu yana
  `docs-sync-strict` işinde engelleyicidir: temel bir belgeyi düzenleyin → `npm run i18n:run -- --files=<doc>` (bölüm düzeyinde, düşük maliyetli).

**Fark duyarlıdır, taban çizgisine dayanmaz.** Birleştirme tabanındaki `en.json` ile çalışma
ağacını karşılaştırır; İngilizce değeri değişen her anahtar için, hâlâ dokunulmamış bir
çeviriyi barındıran yerel ayar eski kabul edilir. Bu, **önceden var olan borcu bilinçli olarak dondurur** — bir fark,
uzun süredir mevcut olan bir çevirinin hangi eski İngilizce metinden geldiğini ortaya çıkaramaz; dolayısıyla kapı
yalnızca mevcut değişikliğin dokunduğu öğeleri değerlendirir. Alternatif yöntem (anahtar başına karma taban çizgisi),
mevcut en büyük taban çizgisinin 3 katı olan yaklaşık 600 KB boyutunda üretilmiş bir dosya gerektirir ve her i18n PR'ında değişirdi.

Bu denetimi geçmenin iki yolu vardır:

1. etkilenen çevirileri güncellemek veya
2. bunları `__MISSING__:<new english>` olarak ayarlamak — çalışma zamanı daha sonra düzeltilmiş İngilizceyi
   sunar (`src/i18n/request.ts::deepMergeFallback`, #7258) ve anahtar çeviri kuyruğuna alınır.

Dizenin **anlamı** değiştiyse **anahtarı yeniden adlandırmayı** tercih edin: yeni bir anahtar,
eski bir çeviriyi devralamaz. #8463'ün kullandığı kalıp budur.

```bash
npm run i18n:check-value-drift          # katı (CI'ın çalıştırdığı)
npm run i18n:check-value-drift:warn     # yalnızca raporla
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Değer sapması ve yeni anahtar denetimleri, `scripts/i18n/resolve-ui-diff-base.mjs` tarafından sağlanan tek bir değişmez karşılaştırmayı paylaşır. İş akışı, aynı taban, taban ucu ve aday SHA'larını her iki denetime de iletir. PR/taban yeniden hedefleme, push ve merge-group çalıştırmaları kendi olay bağlamlarını kullanır. Bir aday dalı manuel olarak tetiklemek, onun açık PR'ının tam olarak belirtilmesini veya açıkça `i18n_base_sha` girdisinin sağlanmasını gerektirir. Bu girdi olmadan `main` ya da `release/vX.Y.Z` için manuel veya zamanlanmış gözlem, son commit'i ilk üst commit'iyle karşılaştırır; bu, devralınan tüm çeviri borcunun denetimi değildir. Yerel çağrı, örneğin yukarıdaki `BASE_REF` komutu gibi açıkça belirtilmiş bir karşılaştırma tabanı gerektirir.

Eksik veya belirsiz karşılaştırma bağlamı, okunamayan ya da geçersiz bir zorunlu katalog ve değişmiş bir aday, uyarı modunda da dahil olmak üzere **2** çıkış koduyla `INCOMPLETE` sonucunu üretir. Katalog okumaları `scripts/i18n/read-ui-catalog.mjs` kullanır; okuma hataları boş nesnelerle değiştirilmez. Ne kullanılamayan bir taban ne de eksik girdi PASS sonucunu oluşturur.

### İş: `i18n`

Tam i18n doğrulama matrisi (yerel ayar başına bir iş). İşin tamamı bilgilendirme amaçlıdır.

| Betik                           | Doğruladığı                              | Engelleyici                                                   |
| ------------------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Yerel ayar başına çeviri tamamlanmışlığı | **Bilgilendirme amaçlı** (tüm işte `continue-on-error: true`) |

### İş: `pr-test-policy`

Yalnızca çekme isteklerinde çalışır.

| Betik                  | Doğruladığı                                                                                                                                            | Engelleyici |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` veya `bin/` içindeki üretim kodunu değiştiren PR'lar testleri içermeli veya güncellemelidir (Kesin Kural #8)          | Evet        |
| `check:test-masking`   | Değiştirilen test dosyaları net doğrulama sayısını azaltmaz veya `assert.ok(true)` totolojileri eklemez                                                | Evet        |
| `check:pr-evidence`    | PR gövdesi, değişiklik için test/VPS kanıtlarını belirtir (PR metninde arama yaparak Kesin Kural #18'i mekanikleştirir — kırılgandır, bkz. İş Listesi) | Evet        |

### İş: `test-vitest`

`changes` sınıflandırma işini gerektirir. Geçerli matris parçaları başarısız olduğunda birleştirmeyi engeller.

| Paket            | Doğruladıkları                                                      | Engelleyici                                                                                                                 |
| ---------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP sunucusu (110 araç), autoCombo, önbellek — vitest çalıştırıcısı | Evet                                                                                                                        |
| `test:vitest:ui` | UI bileşen testleri — vitest çalıştırıcısı                          | **Engelleyici** — önceden var olan hatalar `vitest.config.ts` içinde açıkça hariç tutulur; yeni hatalar işi başarısız kılar |

### Gecelik iş akışları (zamanlanmış, bilgilendirici)

Bunlar cron zamanlamasıyla (ve `workflow_dispatch` ile) çalışır, PR'larda hiçbir zaman çalışmaz. Tümü bilgilendirme amaçlıdır.

| İş akışı               | Doğruladıkları                                                                                                                                                                                 | Engelleyici        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | rastgele seed ve yüksek çalıştırma sayısıyla fast-check özellik testleri                                                                                                                       | **Bilgilendirici** |
| `nightly-resilience`   | heap büyüme eşiği, kaos hata enjeksiyonu, k6 yük/uzun süreli yük testi                                                                                                                         | **Bilgilendirici** |
| `nightly-llm-security` | promptfoo enjeksiyon koruması (engelleme modu) + garak probları (sağlayıcı gizli anahtarı olmadan atlanır)                                                                                     | **Bilgilendirici** |
| `nightly-schemathesis` | `docs/openapi.yaml` kullanılarak çalışan bir OmniRoute'a karşı OpenAPI sözleşmesi fuzz testi (schemathesis) — spesifikasyon ihlallerini / işlenmemiş 500 hatalarını ortaya çıkarır (Faz 8 B.4) | **Bilgilendirici** |
| `nightly-mutation`     | hızlı birim testi hattı üzerinde Stryker mutasyon testi puanı — hayatta kalan mutantlar zayıf doğrulamaları ortaya çıkarır                                                                     | **Bilgilendirici** |
| `nightly-compat`       | desteklenen `engines.node` aralıkları genelinde Node altyapısı uyumluluk matrisi                                                                                                               | **Bilgilendirici** |

Performans temel değerleri (heap, TTFB, derleme süresi) kaydedilir ancak eşik olarak uygulanmaz: bkz. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Hız aşaması (2026-08-30 → v4.0 LTS): tüm temel değerler %20 gevşetildi

Sahip kararı (2026-08-30): v4.0 modülerleştirmesine kadar teslimat hızı, teknik borcu
sınırlamaktan daha önemlidir. Tüm **sayısal** kademeli eşik temel değerleri, denetlenebilir tek
bir geçişte %20 gevşetildi ve aşama `config/quality/quality-baseline.json` içinde tanımlandı:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Değişenler                                                                                                                                                                                                                               | Konum                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — düşük olması daha iyi olan sayımlar ×1.2, yüksek olması daha iyi olan yüzdeler ÷1.2 (kapsam alt sınırı 60 olarak korundu, `eslintErrors` 0 olarak kaldı, `eslintWarnings` 0 → dondurulmuş bastırma sayısının %20'si) | `quality-baseline.json` (`_relax_velocity_2026_08_30` notu tüm önce → sonra değerlerini listeler)      |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                         | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, her `frozen[*]` / `testFrozen[*]` satır sınırı ×1.2                                                                                                                                                                    | `file-size-baseline.json`                                                                              |
| dosya başına / TS kodu başına sayımlar ×1.2                                                                                                                                                                                              | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                      | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` olduğunda `--require-tighten` öneri niteliğine dönüşür                                                                                                                                                | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| gecelik `bank-ratchet-shrinks` duraklatılır (ölçülen küçülmeyi kaydederek ek kapasiteyi geri alırdı)                                                                                                                                     | `.github/workflows/nightly-release-green.yml`                                                          |

İzin listeleri (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) birer bütçe **değildir** ve bunlara dokunulmadı. Başarılı/başarısız ilke kapıları (gizli bilgiler, SQL kuralları,
belge/ortam sözleşmesi, i18n eşliği, birim testleri) değişmedi — başarısız bir test hâlâ başarısızdır.

**Araçlar**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — tek
  seferlik gevşetme (`scripts/quality/relax-baselines.mjs`); aynı notla ikinci kez çalışmayı
  reddeder.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  her sayısal kapıyı CI'ın yaptığı şekilde ölçer ve kapı başına kalan ek kapasiteyi yazdırır
  (`scripts/quality/baseline-headroom.mjs`). Gecelik `baseline-headroom` işi, tabloyu iş akışı
  çalıştırma özetinde yayımlar ve JSON/Markdown raporunu 90 gün saklanacak şekilde
  `baseline-headroom-<run_id>` olarak yükler. Uyarı ve kritik satırları, sınırlarının %10'u
  içinde olan veya sınırı zaten aşmış kapıları belirtir. Bütçelerin tüketilmesine yönelik erken
  uyarı olarak bu raporları inceleyin; soruna neden olan kapının `_rebaseline_*` notlarını kontrol
  edin. İş artık kalıcı bir sorun kaydı oluşturmaz veya güncellemez; #12149 önceki rapor
  geçmişini korur.

**Yeni kod modu (Clean-as-You-Code) — 2026-08-30'dan beri yalnızca PR hızlı yolu**

`pull_request` olaylarında `quality.yml`, `check:file-size`, `check:complexity-ratchets` ve
`check:dead-code` komutlarına `--base-ref <PR base SHA>` iletir. `check:complexity-ratchets` ve
`check:dead-code` için kapı, HEAD'i birleştirme tabanıyla **yalnızca PR'ın dokunduğu dosyalarla
sınırlı olarak** karşılaştırır (`scripts/check/newCodeMode.mjs`: birleştirme tabanı geçici bir
`git worktree` içinde oluşturulur, ESLint/knip burada ve HEAD üzerinde çalıştırılır, dosya
başına sayımların farkı alınır):

- **engelleyici** — PR, değiştirdiği dosyalara döngüsel/bilişsel karmaşıklık ihlalleri veya ölü dışa aktarımlar ekledi
  (günlükte `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **uyarı niteliğinde** — genel toplamın dondurulmuş temel değerle karşılaştırılması. Devralınan sapma,
  masum bir PR'yi asla kırmızı olarak işaretlemez; sapma, sürüm uzlaştırması sırasında düzeltilmek üzere izlenir ve
  kapasite payı görevi tarafından takip edilir.

`check:file-size`, temel referansı kendi kurallarına göre kullanır (`scripts/check/check-file-size.mjs`, #8522):
ağaçtaki her kaynak ve test dosyasını kontrol eder, her birinin PR tabanındaki satır sayısını
`git show` ile okur ve bir dosyayı yalnızca temel değer tavanı (`frozen` / `testFrozen` ya da
temel değerin dışında kalan bir dosya için `cap` / `testCap`) ile taban boyutundan büyük olanı
aştığında başarısız sayar. Bu nedenle, tabanda zaten sapmış bir dosya masum bir PR'ı hiçbir
zaman başarısız kılmaz.

`check:boundary:ratchet`, aynı kuralı tek sayısına uygular
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR olaylarında hem
`quality.yml` hızlı geçitleri hem de `ci.yml` lint işi PR'ın taban SHA'sını geçirir, taban commit'i
bir `git archive` dışa aktarımından ölçülür ve PR yalnızca `open-sse → src` kenarlarının
sayısı, `metrics.boundaryOpenSseToSrc` ile tabandaki sayının büyük olanını aştığında başarısız olur.
Tavanın üzerindeki taban sapması bildirilir (`base drift herdado`), ancak masum bir PR'ın hiçbir
zaman başarısız olmasına yol açmaz; push → main mutlak tavanı korur ve çözümlenemeyen bir taban
SHA'sı, bir uyarıyla bu tavana geri döner.

`workflow_dispatch` çalıştırmaları, sürümün yeşil durum taraması ve gecelik boşluk işi bir PR
tabanına sahip değildir ve mutlak (global) karşılaştırmayı korur. Kapsama, yineleme ve tip kapsamı
şimdilik global kalır (araçları dosya başına farkı düşük maliyetle üretmez) — aynı uygulama için
adaylardır.

**Aşamanın v4.0'da kapatılması (LTS = öncekinden daha sıkı, "normale dönüş" değil)**

1. Saf `release/v4.0.0` ucunda: kayıt için `npm run quality:headroom --json`, ardından
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` ve her typecheck geçidinin
   `--update` seçeneğini çalıştırın — her taban çizgisi ölçülen değere düşer.
2. `quality-baseline.json` dosyasından `_policy` öğesini silin (`--require-tighten` ile gecelik
   biriktirmeyi yeniden etkinleştirir), `check-openapi-coverage.mjs` içindeki `THRESHOLD = 36`
   değerini (veya daha yüksek bir değeri) geri yükleyin.
3. Modülerleştirmenin fayda sağladığı yerlerde ölçülen değerlerin ötesinde sıkılaştırın:
   dosya boyutu `cap` değerini yeniden 1000'e (veya 800'e), kapsama alt sınırlarını +5'e,
   modülerleştirilmiş paketler için kullanılmayan dışa aktarımları 0'a ayarlayın.

## Ratchet Temel Değeri (`quality-baseline.json`)

Ratchet motoru (`scripts/quality/check-quality-ratchet.mjs`), `quality-baseline.json` dosyasını okur
ve yeni toplanan `quality-metrics.json` ile karşılaştırır. Epsilon değerinin ötesinde gerileyen
herhangi bir metrik derlemenin başarısız olmasına neden olur.

Şu anda izlenen metrikler:

| Metrik                | Yön    | Anlamı                                  |
| --------------------- | ------ | --------------------------------------- |
| `eslintWarnings`      | `down` | ESLint uyarılarının sayısı artmamalıdır |
| `coverage.statements` | `up`   | İfade kapsamı düşmemelidir              |
| `coverage.lines`      | `up`   | Satır kapsamı düşmemelidir              |
| `coverage.functions`  | `up`   | Fonksiyon kapsamı düşmemelidir          |
| `coverage.branches`   | `up`   | Dal kapsamı düşmemelidir                |

Gerçek bir iyileştirmeden sonra temel değeri güncellemek için:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` bayrağı, geçerli ölçüm değerlerini `quality-baseline.json` dosyasına yazar.
Bu dosyayı metriği iyileştiren değişiklikle birlikte commit edin. Temel değeri güncellemeden
bir metriği iyileştiren PR, `--require-tighten` tarafından yakalanacaktır (Aşama 6A.5,
uygulama bekleniyor).

### CodeQL ratchet: yenileme sıklığı ve manuel tetikleme

`check:codeql-ratchet`, **her PR için değil, bir zamanlamaya göre yenilenen depo durumunu okur.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup`, `state: configured`,
`schedule: weekly` bildirir: bu, gönderim başına analiz değil, GitHub'ın varsayılan kurulum
taramasıdır. Sonuç olarak: uyarıları DÜZELTEN bir PR birleştirildikten sonra ratchet, bir sonraki
zamanlanmış tarama çalışana kadar eski ve daha yüksek sayıyı okumaya devam eder; dolayısıyla tarama
güncel durumu yakalayana kadar, düzeltme PR'ının kendi devam PR'ları da dahil olmak üzere her açık
PR'da gerileme bildirir.

**Manuel yenileme**: `gh workflow run codeql.yml --ref release/vX.Y.Z`, analizi yeniden çalıştırır
ve uyarıları dakikalar içinde yeniden yayımlar. Önce `.github/workflows/codeql.yml` dosyasını okuyun;
başlığı, bunun yalnızca `workflow_dispatch` olmasının nedenini **GitHub'ın "default setup" özelliğiyle
çakışması** olarak açıklar (`CodeQL analyses from advanced configurations cannot be processed when
the default setup is enabled`). `push`/`pull_request`/`schedule` tetikleyicilerini geri yüklemek,
öncelikle bir **sahip eylemi** gerektirir: Settings → Code security → CodeQL: Default → Advanced.
Bu geçişi yapmadan bir `schedule:` tetikleyicisi eklemeyin; yalnızca başarısız çalıştırmalara neden
olur.

**Sayı düştükten sonra temel değeri sıkılaştırın** — `node scripts/check/check-codeql-ratchet.mjs
--update`, yeni ölçülen sayıyı `quality-baseline.json` → `metrics.codeqlAlerts.value` konumuna
yazar; böylece ratchet, eski üst sınıra geri dönüşü sessizce kabul etmez. Uygulamalı örnek
(2026-09-02/03): PR #12502, 7 gerçek uyarıyı düzeltti (ölçülen açık uyarı sayısı 13 → 6);
PR #12530, eşleşmesi için sabitlenmiş temel değeri 11 → 6 olarak sıkılaştırdı; kalan 6 uyarı
daha sonra uyarı başına gerekçe belirtilerek kapatıldı ve açık uyarı sayısı 0'a indirildi.

**Kapatma kararları operatöre aittir (Kesin Kural #14)** — kapatma yorumuna teknik gerekçeyi
kaydetmeden asla bir CodeQL uyarısını kapatmayın: üst sistem protokolü gereksinimi için `won't fix`,
bir test fixture'ı için `used in tests`, CodeQL'in göremediği bir sanitizer için `false positive`
(emsal: `docs/security/ERROR_SANITIZATION.md`).

---

## Test Yeniden Deneme Politikası (WS5.4, v3.8.49)

Yeniden deneme çalıştırıcı bazındadır, asla genel kapsamlı değildir — genel kapsamlı bir yeniden deneme, gerçek regresyonları
görünmez kararsızlıklara dönüştürür:

| Çalıştırıcı       | Politika                                                                                                                                  | Neden                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e)  | Yalnızca CI'da `retries: 1`, ayrıca `trace: on-first-retry`                                                                               | Tarayıcı/ağ zamanlaması gerçekten belirlenimsizdir; iz içeren tek bir yeniden deneme, kararsızlığı teşhis edilebilir bir artefakta dönüştürür |
| Vitest            | Genel yeniden deneme YOK. Kararsızlığı kanıtlanmış bir test, test bazında açık bir yeniden deneme alır (diff'te görünür, PR'da incelenir) | Karantina listesini repoda ve her zaman şeffaf tutar                                                                                          |
| node:test (birim) | Asla yeniden deneme YOK                                                                                                                   | Kararsız bir birim testi, testteki bir hatadır — düzeltin, yeniden zar atmayın                                                                |

Kararsızlık telemetrisi devreye girdikten sonraki hedef SLO'lar (WS5.2/5.3): test başına <%1 kararsızlık oranı
("hemen düzelt" eşiği), işlem hattı başına ≥%95 geçme oranı. Sektör referans değerleridir —
kendi ölçümlerimize göre yeniden kalibre edilmelidir.

## Sürüm Düzeyinde Mandal Sapması (WS5.5, v3.8.49)

Bir mandal (dosya boyutu, karmaşıklık, eslint uyarıları) SAF sürüm
ucunda gerilediğinde — yani birleştirmelerin BİLEŞİMİ gerilemeye neden olduğunda ve hiçbir PR kendi
dalında bu gerilemeyi tek başına yeniden oluşturamadığında — düzeltme **bir kez, sürüm
dalında, sürüm sorumlusuna** aittir: ayırmayı/yeniden düzenlemeyi tercih edin; taban çizgisini yalnızca belgelenmiş
gerekçe girdisiyle yeniden belirleyin. Bileşim sapmasını asla katkıda bulunan birinin PR'ına yüklemeyin ve
taban çizgisini PR bazında asla yeniden belirlemeyin (bu, gerçek regresyonları gizler). Önce ayrım yapın: PR'ınızın buna neden olduğunu varsaymadan önce
kırmızı durumu saf uç üzerinde bir inceleme worktree'sinde yeniden oluşturun.

## Mandal Küçülmelerini Kaydetme — aşağı yön (#8584)

Mandal yalnızca yarı otomatiktir ve otomatik olan yanlış yarıdır. Bir üst sınırı **yükseltmek**,
on saniye süren manuel bir JSON düzenlemesidir ve kırmızı bir PR'ın engelini kaldırmanın en hızlı yoludur.
Bir üst sınırı **düşürmek** ise birinin `--update` çalıştırıp sonucu commit etmesini gerektirir — ve
`bank-ratchet-shrinks` işi devreye girene kadar hiçbir iş akışı bunu çalıştırmıyordu. Ölçülen sonuç
(2026-07-25): 800 satırlık yeni dosya üst sınırında veya altında bulunan hâlihazırda dondurulmuş 18 dosya; en kötü örnek
132× farkla (`src/shared/validation/schemas.ts`, 2.523 üst sınır taşıyan 19 satır);
karmaşıklık tavanı, tam olarak bir düşüşle (−1), yaklaşık 37 yeniden taban belirleme notu boyunca `1794 → 2169`
seviyesine çıktı; ayrıca "sonraki döngüde `--update` ile sıkılaştır" 31 kez yazıldı ve
bir kez uygulandı. Kendisini gerektiren koddan daha uzun yaşayan bir üst sınır, tamamlanan her
ayrıştırmayı sessizce dosyayı bir sonraki düzenleyen kişi için büyüme payına dönüştürür.

`nightly-release-green.yml` → **`bank-ratchet-shrinks`** işi bu döngüyü kapatır:

|          |                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| Çalışır  | `schedule` (günde 3×) + `workflow_dispatch` — kasıtlı olarak `push` üzerinde **değil**                        |
| Ölçer    | en yüksek `release/vX.Y.Z`; `release-green` ile aynı çözümleme + enjeksiyon koruması                          |
| Yazar    | `check:file-size --update` ve `check:complexity-ratchets --update` (ikisi de yapısı gereği yalnızca küçültür) |
| Doğrular | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                      |
| Sunar    | sürüm dalına karşı her zaman güncel tek bir PR — zorla güncellenir, asla istenmeyen PR yağmuruna neden olmaz  |

Kaydetme işlemi push başına değil toplu olarak yapılır; çünkü gecikme gereksinimi yoktur (bir küçülmenin
8 saat içinde kaydedilmesi yeterlidir), oysa birleştirme başına çalıştırma, birleştirme kampanyaları
sırasında PR dalını tekrar tekrar oluşturur ve her seferinde tam bir ESLint taramasının maliyetine katlanırdı. Algılama
push üzerinde kalır (`release-green`); yalnızca kaydetme işlemi toplu hâle getirilmiştir.

### Güvenlik doğrulayıcısı

İş, taban çizgilerine gözetimsiz olarak yazdığı için bunu kabul edilebilir kılan
`verify-ratchet-bank.mjs` dosyasıdır. `--update` sonrasındaki ağacı `HEAD` ile karşılaştırır ve her değişiklik
aşağıdakilerden biri olmadığı sürece **herhangi bir commit oluşmadan önce işi iptal eder** — hiçbir PR açılmaz:

- bir `frozen` / `testFrozen` sayısal girdisinin **düşürülmesi** veya **kaldırılması**
- `complexity-baseline.json` → `count` değerinin **düşürülmesi**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` değerinin **düşürülmesi**

Diğer her şey başarısız olur: bir sayıyı yükseltmek, girdi eklemek, `cap`/`testCap` değerini değiştirmek veya
bir `_rebaseline_*` notunu silmek/yeniden yazmak (bu notlar, her tavanın neden var olduğuna ilişkin denetim kaydıdır
ve dosya girdileriyle aynı `frozen` nesnesinin içinde saklanır).
Bir üst sınırı yükseltebilen bir bot, mevcut durumdan kesinlikle daha kötü olurdu. Regresyon
koruması: `tests/unit/verify-ratchet-bank.test.ts`.

İş hiçbir zaman `release/*` dallarına push yapmaz — PR'ı bir insan birleştirir; dolayısıyla hatalı bir ölçüm
incelenmeden sisteme giremez.

## İzin Listesi Politikası

Önceden var olan ihlaller nedeniyle başarısız olmaması gereken her geçit, dondurulmuş bir izin listesi kullanır
(ör. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politika şöyledir:

**Kök nedeni düzeltin; izin listesini yalnızca ihlal önceden mevcutsa ve
aynı PR içinde düzeltilemiyorsa kullanın.**

Bir izin listesine girdi eklerken:

1. Gerekçeyi açıklayan bir yorum ekleyin.
2. Takip kaydına referans verin (ör. `// #3498 — Phase 2 feature, not yet implemented`).
3. İhlali düzelten PR içinde girdiyi de kaldırın — artık etkin bir ihlali
   bastırmayan eski bir girdi başlı başına bir kusurdur (6A.3 eski-yaptırım denetimi,
   uygulandığında sahipsiz bir izin listesi girdisi nedeniyle geçidi başarısız kılacaktır).

Testlerin daha hızlı geçmesini sağlamak için izin listesine **girdi eklemeyin**. Sürekli büyüyen
bir izin listesiyle yeşil olan bir geçit, sahte bir kalite algısı yaratır.

### PR'ınızda bir geçit başarısız olduğunda

1. **Geçit çıktısını dikkatlice okuyun** — çıktıda, kuralı tam olarak hangi dosyanın veya sembolün
   ihlal ettiği belirtilir.
2. **İhlali düzeltin** — çoğu geçit, kod doğru hâle gelir gelmez geçen deterministik dosya sistemi
   denetimleridir.
3. **İhlal önceden mevcutsa** (yani ihlali siz oluşturmadıysanız ancak geçit artık bu ihlali
   kapsıyorsa): gerekçeyi açıklayan bir yorum ve takip kaydıyla birlikte izin listesine bir girdi ekleyin.
4. **Geçit bir mandalsa** (kapsama, ESLint uyarıları, tekrar, karmaşıklık):
   değişikliğiniz metriği kötüleştirmiştir. Temel sorunu düzeltin veya (nadiren) değişiklik
   kasıtlıysa ve metrikteki kötüleşme kabul edilebilirse `npm run quality:ratchet -- --update`
   komutunu çalıştırın — ancak nedenini PR açıklamasında belgeleyin.
5. **Bilgilendirme amaçlı geçitler** (`continue-on-error: true`) yalnızca bilgi verir — birleştirmeyi
   engellemezler ancak CI özetinde görünürler. Yine de bunları düzeltin.

---

## Yeni Bir Geçit Ekleme

1. `scripts/check/check-<name>.mjs` (veya `.ts`) dosyasını oluşturun. Politika geçitleri 0/1 çıkış koduyla sonlanır.
   Mandallı ölçüm tarzındaki geçitler, `collect-metrics.mjs` aracılığıyla `quality-metrics.json` dosyasına bir metrik yazar.
2. `package.json` dosyasına `"check:<name>": "node scripts/check/check-<name>.mjs"` ekleyin ve
   takma adı ve tam komutunu `config/quality/gate-manifest.json` içinde eşitleyin.
   Mevcut bir doğrulama takma adını değiştirirken veya kaldırırken de aynı eşitlemeyi uygulayın.
   `npm run check:gate-manifest` komutunu çalıştırın; pre-commit hook'u ve CI değişiklik sınıflandırması
   bu sözleşmenin uygulanmasını sağlar.
3. Bunu `.github/workflows/ci.yml` içinde uygun işin altına bağlayın
   (politika → `lint` veya `docs-sync-strict`; mandallı ölçüm → `quality-gate`).
4. Bir izin listesi varsa eski girdilerin otomatik olarak algılanması için
   `scripts/check/lib/allowlist.mjs` içindeki `reportStaleEntries()` işlevini uygulayın.
5. `tests/unit/build/` içinde geçidin algılama mantığını kapsayan bir test yazın.
6. Bu belgeyi güncelleyin (ilgili iş tablosuna bir satır ekleyin).

---

## Ajan araçları: Döngü içinde LSP (isteğe bağlı)

CI geçitlerine ek olarak OmniRoute, **isteğe bağlı** bir `agent-lsp` iskeleti
(proje düzeyinde bir `.mcp.json`, Aşama 7 Görev 15) sunar. Kodlama ajanlarına bir TypeScript dil sunucusu
sağlamak için `.mcp.json` oluşturun; böylece ajanlar kod yazmadan **önce** sembolleri /
tanılamaları çözümler — bu, `typecheck:core` için derle-önce-iddia-et yaklaşımını destekleyen
ve "uydurulmuş sembol" hatalarını kaynağında azaltan bir yardımcıdır. Kasıtlı olarak
otomatik yüklenmez (MCP↔LSP köprüsünü siz seçip doğrularsınız); bozuk bir girdi yalnızca bir
bağlantı hatasını günlüğe kaydeder ve oturumları hiçbir zaman bozmaz.

---

## Rasyonalizasyon İş Listesi (ROI incelemesi — Aşama 9 Dalga 3)

Bu envanter, 2026-06-17 tarihinde `ci.yml` ile karşılaştırılarak uzlaştırıldı (önceki sürümde
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` yer almıyordu). Uzlaştırılan kümenin ROI incelemesi,
aşağıdaki rasyonalizasyon adaylarını belirledi. **Birleştirmeler mekanik CI
değişiklikleridir; etkinleştirme/kaldırma işlemleri ise operatöre bırakılmış politika kararlarıdır.** Aşağıdakilerin
hiçbiri henüz uygulanmamıştır.

**Yukarıda ayrıca belgelenmemiş olanlar** (tavsiye niteliğinde, düşük sinyalli): `docs-lint` işi
(markdownlint + Vale, işin tamamında `continue-on-error`) ve bağımsız tarayıcı iş akışları
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`,
`quality-baseline.json` içinde yer alıyor ancak `ci.yml` dosyasındaki engelleyici bir mandala bağlı değil — bu metrik
şu anda sahipsizdir.

### Birleştirme / yinelenenleri kaldırma (mekanik, daha düşük risk)

Her aday, 2026-06-17 tarihinde canlı geçit durumuna göre doğrulandı (güven ama doğrula);
“bariz” görünen birkaç birleştirmenin aslında teknik borcu gizlediği ortaya çıktı ve bunlar **doğrudan uygulanabilecek**
değişiklikler değildir.

- **`check:docs-sync` iki kez çalışıyor** — `lint` işi içinde bağımsız olarak, ayrıca `check:docs-all` (`docs-sync-strict`) ve husky pre-commit hook içinde çalışıyor. ✅ **TAMAMLANDI** — bağımsız `lint` çağrısı kaldırıldı.
- **CVE taraması** — ❌ **Temiz bir birleştirme DEĞİL.** `audit:deps`, beş lockfile dosyasının tamamındaki kritik uyarıları ve tamamlanmamış denetimleri engellerken mevcut politika kapsamında yüksek önem düzeyindeki uyarıları ikaz olarak bildiriyor; `check:vuln-ratchet` (osv) ise yalnızca depoya kaydedilmiş baseline değerine kıyasla bir _gerileme_ olduğunda başarısız oluyor ve ölçüm gerektiğinde eksik ölçümleri reddediyor. Anlamları farklıdır — `audit:deps` kaldırılırsa mutlak kritik geçit ve bağımsız paket denetimi kayıtları kaybedilir. İkisini de koruyun.
- **Döngü algılama** — ✅ **TAMAMLANDI** (#15159 G-01/G-02). Buradaki eski metin, `check:cycles` kontrolünü “yeşil, özenle seçilmiş” geçit olarak adlandırıyor ve `check:circular-deps` (dpdm) 91 döngü bildirdiği için bunun engelleyici olarak tutulmasını gerekçelendiriyordu. Bu yeşil durum **yanlış bir yeşildi**: `check:cycles`, 5 alt dizini (450 dosya) tarıyor, yalnızca statik `import|export … from` ifadelerini eşleştiriyor ve tüm `@/` ile `@omniroute/open-sse/` belirteçlerini göz ardı ediyordu; dolayısıyla depoda ağırlıklı olan dinamik içe aktarma + alias döngülerini göremiyordu. Düzeltildi: geçit artık `src` + `open-sse` dizinlerinde dolaşıyor (5023 dosya), belirteçleri TypeScript AST içinden topluyor (böylece `import("…")` hesaba katılırken tür konumundaki `typeof import("…")` hesaba katılmıyor) ve tsconfig `paths` değerlerini çözümlüyor. 0 değil, **14** döngü buluyor. Önceden var olan 14 döngü bir geçit PR’ında düzeltilemeyeceğinden, `check:cycles` artık bir **mandaldır** (`--ratchet`, `quality-baseline.json` içinde tavan `metrics.cycles.value = 14`, `direction: down`) — her türlü _gerilemeyi_ engeller ve sayı yalnızca azalabilir. CI, `npm run check:cycles:ratchet` komutunu çalıştırır. Azaltma çalışmaları **A-01** ile birlikte yürütülür. `check:circular-deps` (dpdm), daha geniş kapsamlı ikinci bir görüş olarak tavsiye niteliğinde kalır.
- **Karmaşıklık** — ✅ **TAMAMLANDI** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): tek bir ESLint taraması; cyclomatic+max-lines ve cognitive baseline değerlerinin bağımsız kalması için sayımlar ruleId bazında yapılır; bağımsız `check:complexity` / `check:cognitive-complexity`, yerel `--update` kullanımı için korunur.
- **`/api` anti-halüsinasyon** — ✅ **TAMAMLANDI** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` için tek bir FS envanteri; openapi-routes + docs-symbols hâlâ bağımsız olarak raporlanır; bağımsız kontroller yerel çalıştırmalar için korunur.
- **`check:node-runtime` 11 işte çalışıyor** — ⚠️ **düşük ROI.** Her biri ayrı bir runner’dır ve kontrol <1 sn sürer; toplam tasarruf yaklaşık 10 sn’dir, buna karşılık iş başına düşük maliyetli bir koruma kaybedilir. Değişiklik zahmetine değmez.
- **CI lint üzerinde `typecheck:noimplicit:core`** — ✅ **lint işinden kaldırıldı** (tavsiye niteliğindeydi ve `continue-on-error` kullanıyordu); engelleyici tür yüzeyi `typecheck:core` + `check:type-coverage` şeklindedir. Yerel script korundu.

### Etkinleştir / karar ver (operatör politikası)

- `check:openapi-security-tiers` (tavsiye niteliğinde) — ❌ **Doğrudan etkinleştirilemez.** 0 koduyla çıkar ancak `LOCAL_ONLY_API_PREFIXES` altındaki bazı `traffic-inspector` route’larında `x-loopback-only: true` açıklamasının bulunmadığı konusunda uyarır. Bunu zorunlu kılmak için önce söz konusu açıklamaların `openapi.yaml` dosyasına eklenmesi gerekir.
- `typecheck:noimplicit:core` (tavsiye niteliğinde) — engelleyici `check:type-coverage` mandalı tarafından büyük ölçüde kapsanıyor. Bir mandala dönüştürün veya yinelenen ikinci `tsc` geçişini kaldırın.
- `test:vitest:ui` (artık **engelleyici**) — önceden var olan hatalar, `vitest.config.ts` içinde `// #8618` takip yorumlarıyla açıkça hariç tutulmuştur; yeni hatalar işin başarısız olmasına neden olur.
- `check:secrets` (gitleaks, engelleyici mandal) — mevcut tavan, `quality-baseline.json` içindeki `metrics.secretFindings` değeridir. Her istisna için gerekçelendirilmiş bir `.gitleaks.toml` girdisi gerekir; kullanılamayan ölçüm EKSİK’tir. Tarama, GitHub’ın yerel gizli bilgi taramasını ve `check:public-creds` kontrolünü tamamlar.
- `check:pr-evidence` (engelleyici, PR gövdesindeki düz metni grep ile tarar) — yanlış pozitif riski yüksektir; kaldırılması, Kesin Kural #18’in uygulanmasını zayıflatır; dolayısıyla bu gerçek bir politika kararıdır.
- `semgrep` (tavsiye niteliğinde bağımsız kontrol) — OWASP aileleri bakımından CodeQL ile çakışır; baseline değerini bir mandala bağlayın veya kaldırın.

---

## İlgili Belgeler

- Tedarik zinciri (kaynak doğrulama, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — anahtar kümesi eşitliği geçidi

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, iş `i18n-ui-coverage`).
Her `src/i18n/messages/<locale>.json` dosyasındaki uç anahtar kümesini `en.json` ile karşılaştırır ve
anahtarın ne zaman eklendiğine bakılmaksızın eksik veya fazla herhangi bir uç anahtar olduğunda başarısız olur. `__MISSING__:`
yer tutucuları mevcut kabul edilir (bunların içeriği oran geçidinin sorumluluğundadır). Bu, fark tabanlı/yüzde tabanlı
iki geçidin mutlak tamamlayıcısıdır: `check-ui-keys-coverage`, yerel ayar başına %80'lik bir alt sınır uygular
(~13.000 anahtardan 43'ü eksik olsa bile oran hâlâ %99,7 görünür) ve `check-new-key-coverage` yalnızca
bir PR'ın `en.json` dosyasına eklediği anahtarları değerlendirir. Bir yerel ayar grubu, dalının ayrıldığı günkü `en.json`
dosyasından oluşturulur ve ana dal anahtar eklemeye devam ederken günlerce çevrilir; grup PR'ı kendisi hiçbir
anahtar eklemediğinden, grup 1 (#13044) dokuz yerel ayarda 43 anahtar ve grup 2 (#13660) sekiz yerel ayarda
10 anahtar eksik olarak birleştirildiğinde iki kardeş geçit de sessiz kaldı (2026-09-15). Başarısız bir denetimi
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ile düzeltin; bir `extra` uç anahtar,
kaynağın bunu kaldırdığı anlamına gelir — yerel ayardan silin. `--warn`, başarısız olmadan raporlar.
`--catalog=cli`, aynı karşılaştırmayı `bin/cli/locales` üzerinde çalıştırır (`npm run i18n:check-keys:cli`);
her iki adım da `i18n-ui-coverage` işinde yer alır.

#### `check-new-key-coverage` — yeni anahtar i18n geçidi

`check-ui-value-drift` geçidinin kardeşidir. O geçit, çevirileri geride bırakılmış şekilde **yeniden yazılan**
bir İngilizce değeri yakalar; bu geçit ise bazı yerel ayarlara hiç eklenmemiş **yeni eklenen**
bir İngilizce anahtarı yakalar.

`check-ui-keys-coverage` bu durumu göremez: yerel ayar başına yüzdelik bir alt sınır uygular ve
~13.000 uç anahtardan on birinin eksik olması kapsamı %99,9'da bırakır. Dil başına bir yüzde,
"bu özellik çevrilmeden yayımlandı" durumunu ifade edemez — bir özelliğin tamamı, hiçbir metin olmadan
yeni bir yerel ayara eklenebilir ve bu sayı hiç değişmeyebilir.

Kodladığı olay şudur: Orchestration Canvas'ın 3. Aşaması, on bir anahtarı o sırada mevcut olan
42 yerel ayarın tamamına çevirdi. Saatler sonra AB dilleri grubu (#13044), depodaki yerel ayar sayısını
51'e çıkardı ve dokuz yeni yerel ayar (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) bu anahtarları hiç
almadı. `deepMergeFallback`, eksik bir anahtar yerine İngilizcesini koyduğu için hata biçimi boş kullanıcı
arayüzü değil, çevrilmemiş kullanıcı arayüzüydü — gerçekti ve tasarım gereği sessizdi.

Kardeşi gibi bu geçit de **fark farkındalıklıdır**; birleştirme tabanındaki İngilizceyi çalışma
ağacıyla karşılaştırır, böylece önceden var olan eksikler sabit kalır ve geçidin etkinleştirilmesi için
herhangi bir geçiş işlemi gerekmez.

**Bir `__MISSING__:<english>` işareti bunu karşılamaz (2026-09-17'den beri).** Daha önce bu,
belgelenmiş erteleme yöntemiydi — çalışma zamanı doğru İngilizceye geri döner — ta ki 2026-09-16'da
sekiz özellik PR'ı 61 anahtar ekleyip çevirmek yerine işareti 65 yerel ayarın tamamına basana kadar:
bu geçit hepsini kabul etti, PR'ları hiçbir şey engellemedi ve ardından engelleyici gerçek çeviri oranı
geçidi sürüm ucunda herkes için başarısız oldu (pt-BR %3,2 > %2,5 + %0,5). Bir işaret artık eksik
çeviri olarak değerlendirilir. Başarısız bir denetimi
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ile veya
tüm yerel ayarlar için paralel olarak `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
ayrılmış durumda güvenli, `OMNIROUTE_TRANSLATION_*` ortam değişkeni olmadan başlatılmayı reddeder) ile düzeltin.
İngilizce kalması gereken bir anahtar (sabitlenmiş ürün/motor/bayrak adı), hiçbir zaman bir işaretin arkasında
değil, `scripts/i18n/untranslatable-keys.json` içinde yer almalıdır.
`vi`, işaretleri tamamen yasaklar (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — bekletilen test geçidi

`vitest.config.ts` dosyasının `exclude` listesindeki bir dosya, çalıştırılmayan bir testtir ve kaynak
ağacını okuyan kişiye kapsamın parçasıymış gibi görünür. Altmış iki dosya,
`// #8618 — pre-existing failure; remove this exclusion when fixed` yorumunun arkasında birikti. #8618 numaralı
sorun 2026-08-11 tarihinde kapatılırken izlediği liste 45 girdiden 62 girdiye çıktı ve her yeni girdi,
kapatılmış bir soruna işaret eden yorumu devraldı. Liste nihayet dosya dosya ölçüldüğünde (#13204),
**62 dosyanın 51'i hiçbir kaynak değişikliği olmadan mevcut ağaçta başarılı oldu**.

Geçit, gerçek bir dosyaya çözümlenen her dışlamanın (a) bir takip sorunu belirtmesini ve
(b) ölçülen durumuyla birlikte `config/quality/vitest-exclusions.json` içinde görünmesini zorunlu kılar;
böylece yeni bir dışlama eklemek, 60 girdili bir diziye bir satır daha eklemek yerine özel bir dosyada
incelenebilir bir fark oluşturur. Dışlanan testleri kasıtlı olarak yeniden çalıştırmaz — bu işlem yaklaşık
10 dakika sürer ve periyodik bir işe aittir; envanter, her birinin en son ne zaman ölçüldüğünü kaydeder.
