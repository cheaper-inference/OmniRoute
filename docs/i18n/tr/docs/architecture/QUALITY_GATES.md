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

## Kapı envanteri ve yürütme profilleri

### Aday kabulü

CI ve Quality Gates iş akışlarının her biri istikrarlı bir karar verir: `Gate / CI` ve `Gate / Quality`. Sürümlendirilmiş kabul politikaları, her yukarı yönlü işi gerekli veya tavsiye niteliğinde olarak sıralar. Geçerli bir gerekli iş başarılı olmalıdır: eksik, iptal edilmiş, atlanmış, beklemede ve bilinmeyen sonuçlar PASS oluşturamaz. Geçerli bir yalnızca belge veya yalnızca katalog sınıflandırması, kod şeridini uygulanamaz hale getirebilir; sıradan bir PR taslağı kabul edilen bir aday değildir. Bir `hotfix` etiketi delillerden feragat etmez.

Her iki iş akışı da PRs main/release dallarına, `main` gönderimleri, manuel gönderimi ve grup birleştirme olaylarını kapsar. Tüm seçimi itin, dağıtın ve birleştirme grubunu çalıştırın. Güvenilir Birleştirme kuyruğu taslağı aynı zamanda uygulanabilir `full-code`/`full-code-e2e` işlerini de çalıştırır; sıradan PRs onları atlar. Manuel birleştirmeden önce, tam aday üzerinde tam gönderim çalıştırın. `release/**` yapılan aktarımlar bu iş akışlarını başlatmaz; Release-Green, birleştirilmiş üssü ayrı ayrı gözlemler (`docs/ops/RUNNER_BOX.md` → Barındırılan şerit). Çatallar ve birleştirme grupları, aksi takdirde kendi kendine barındırılan çalıştırıcıları seçen işler için barındırılan çalıştırıcıları kullanır; Yeterli barındırılan kapasitenin kullanıma sunulmadan önce doğrulanması gerekir.

Sıradan bir PR hızlı seçimi çalıştırır. Kabul ilkesinin `full-code` ve `full-code-e2e` şeritleri (E2E, entegrasyon, paket yapısı, Electron duman, Bun SQLite, ekosistem ve protokol istemcileri) yalnızca Birleştirme kuyruğu taslağında veya tam çalıştırmada çalışır: `gh workflow run ci.yml --ref <branch>`.

Her JSON makbuzu, teslim alınan SHA, iş akışı çalıştırmasını ve girişimini tanımlar. CLI checkout/event SHA uyumsuzluğunu reddeder. İş akışı testleri, politika üyeliğini karar işinin `needs` listesine bağlar, böylece yeni veya kaldırılmış bir şerit sessizce ortadan kaybolamaz. Makbuzlar, yayın, dağıtım veya mevcut bir tavsiye niteliğindeki tarayıcının dahili içeriğini değil, kendi iş akışlarını kapsar. Şube kurallarında gerekli olan kontrollerin yapılması ayrı bir idari değişiklik olup; işlerini tanımlamak tek başına bir şubeyi korumaz.

`API Route Typecheck`, hem toplu kararların hem de yerel tam gözlemcinin statik profilinin dışında bağımsız bir iş akışı kontrolüdür. Kesin aday için sonucunu ayrı ayrı inceleyin. `.github/workflows/api-route-typecheck.yml` PRs üzerinde `main` veya `release/**` içinde çalışır, dal ailesine, manuel gönderime ve `checks_requested` türündeki `merge_group` olaylarına iletir. Yol filtresi yoktur. Grupları birleştir `merge_group.head_sha` göz atın; diğer olaylar `github.sha` göz atın. Tüm olaylar aynı API teşhis kapısını ve geçit ünitesi testlerini kullanır. PR temel yeniden hedeflemeleri yeni bir kontrol talep eder; body/title düzenlemeleri yalnızca gözlem amaçlı `Admission not requested / API Route Typecheck` adını kullanır ve kabul kontrolünün yerini alamaz.

### Kabul indirgeyicisinde saklanan kanıtlar

`scripts/quality/validate-release-acceptance.mjs`, sağlanan bir planı ve manifestlerini
indirger; planın eksiksiz sürüm hattını kapsadığını tesis etmez. Raporları, söz konusu plan
`VERIFIED` olsa bile açıkça `releaseAcceptance: false` değerini ayarlar.
`release-acceptance.yml` iş akışı hâlâ gerçek derleme, paketleme, başlatma veya yükseltme
makbuzları yerine gölge fikstürler kullanır.

CLI, saklanan kanıtları doğrulamak için `--evidence-root` seçeneğini gerektirir. Dosyalar
`<evidence-root>/<artifact_id>/<member>` olarak çözümlenir ve SHA-256 ile özetlenir.
Kanıtsız bir PASS kaydı, eksik veya değiştirilmiş bir dosya, güvenli olmayan bir yol
ya da sembolik bağlantı doğrulamayı engeller. Eksik dosyalar, boş ve başarılı günlüklerle
eşdeğer değildir. Mevcut SHA/çalıştırma/deneme kontrolleri birbirinden bağımsız kalır:
eşleşen baytlar güncelliğini yitirmiş bir makbuzu kurtaramaz. Dosya bütünlüğü, yürütme
özgünlüğünün veya yapıt yükseltmesinin kanıtı değildir.

### DAST, doğrulanmış CI derlemesini kullanır

Zorunlu CI işi `dast-smoke`, `build` sonrasında `.github/workflows/dast-smoke.yml` iş akışını çağırır. Desteklenen fork PR'ları, sürüm dalını hedefleyen PR'lar ve birleştirme grupları dahil olmak üzere derlemeyle aynı kod ve taslak seçimini izler. Eksik, başarısız, iptal edilmiş veya beklenmedik biçimde atlanmış bir DAST işi `Gate / CI` kapısını engeller. Yeniden kullanılabilir iş akışının bağımsız PR veya elle başlatma tetikleyicisi yoktur; elle doğrulama, derleme ve tüketiciyi aynı çalıştırmada tutmak için CI'ın başlatılmasını kullanır.

`scripts/ci/next-build-provenance.mjs`, Next çıktısının tamamını tar özeti, depo/olay/çalıştırma, üretici denemesi, head/base/checkout/tree, iş akışı kimlikleri, kilit dosyası, tam Node sürümü ve ABI, platform ve paketleyiciyle mühürler. DAST, değişmez çıktı kimliğini `needs.build.outputs` içinden seçer, indirme özeti doğrulaması ister ve izin verilen iki üyeyi `scripts/ci/unpack-ci-build.py` ile çıkarmadan önce ZIP karmasını bağımsız olarak hesaplayıp üreticinin özetiyle karşılaştırır. Next ağacı çıkarılmadan önce manifest ve tar arşivi de bağımsız üretici çıktılarıyla eşleşmelidir. Hiçbir zaman dalın en son başarılı derlemesini aramaz. Kısmi yeniden çalıştırma, kimliği ve tüm girdiler hâlâ eşleşiyorsa aynı üretici denemesini yeniden kullanabilir; kanıt kaydı her iki denemeyi kaydeder.

Tüketici, yalnızca depo okuma iznine sahip ve depo sırları bulunmayan barındırılan bir Linux çalıştırıcısında kalır. Üreticinin tam Node sürümünü kurar, ardından CLI'ı `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1` ile oluşturur. `scripts/build/standaloneInput.mjs`, herhangi bir yedek derlemeden önce eksik bağımsız sunucuyu reddeder; normal yerel CLI derlemeleri mevcut yedek yöntemlerini korur. Sunucunun hazır olması, Schemathesis ve promptfoo kontrollerinin tümü, işin değişmeyen 25 dakikalık sınırı içinde başarılı olmalıdır. Köken kanıt kaydı, girdilerin kimliğini ve baytlarını kanıtlar; DAST taramasının başarılı olduğunu kanıtlamaz. Çıktının süresinin dolması, çalıştırıcının kesintiye uğraması veya tarayıcının başarısız olması, eksik ya da başarısız kanıt olarak kalır; tavsiye niteliğindeki bir sarmalayıcı bunu PASS sonucuna dönüştüremez.

### UI yürütme kapasitesi

CI, tam UI envanterini dört `test-vitest` matris parçası olarak çalıştırır; parça başına
en fazla iki worker ve mevcut 15 dakikalık iş zaman sınırı kullanılır. İlk parça ayrıca
MCP/autoCombo Vitest paketini de çalıştırır. Zorunlu iş sonucu, matrisin her ayağını
kapsar; tek bir parçanın başarısız olması veya iptal edilmesi aday kabulünü tesis edemez.

Gecelik gözlemci, ilk makbuzdaki MCP yürütmesi dâhil olmak üzere her UI parçası için
tam olarak aynı adaya ait ayrı bir makbuzu saklar. Dört makbuzun, günlüklerin ve eşleşen yürütme
kimliklerinin tamamı gereklidir. Yerel `npm run test:vitest:ui` hâlâ eksiksiz paketi
seçer; tek bir `--shard` çalıştırması yalnızca kısmi kanıttır.

### Birim kapsamı toplama

On iki birim parçası, mevcut test yürütmeleri sırasında V8 kapsamını toplar. Başarılı
bir parça, ara bir Istanbul raporu oluşturmadan özgün dosyaları sıkıştırmak için
`scripts/ci/compact-v8-coverage.mjs` dosyasını çalıştırır. Son Coverage işi, on iki
manifestin tamamını aday SHA'ya, çalışma zamanına, kaynak köküne ve veri özetlerine
göre doğrular; ardından c8'in raporlayıcılarını ve mevcut kapsam eşiklerini çalıştırır.
Girdiler, c8'in genel dosya adı sırasını korur; parça başına ön birleştirme, karma
fonksiyon/blok kapsamı için güvenli değildir. Eksik, hatalı biçimlendirilmiş veya
uyumsuz parçalar kabulün başarısız olmasına neden olur. Başarısız test parçaları, ham
tanılama kapsamını ayrı olarak saklar; bu kapsam nihai birleştirmeye giremez.

### Birim yürütme ilerleme kayıtları

Paylaşılan `test:unit:ci:shard` komutu, `primary`, `dashboard` ve `serial` aşamalarını `scripts/ci/unit-progress-reporter.mjs` aracılığıyla kaydeder. Normal test raporu kullanılabilir olmaya devam eder. Yalnızca meta veri içeren ayrı bir kayıt, her dosyanın başlangıcını ve tamamlanmasını kaydeder; 30 saniyelik düzenli durum bildirimi ise hâlâ etkin olan dosyaları ve geçen sürelerini listeler. Yalnızca izin verilen yürütme meta verileri kaydedilir; test açıklamaları, çıktılar, hata içerikleri ve ortamın tamamı serileştirilmez.

CI, JSONL dosyalarını `unit-progress-ci-<run>-<attempt>-<shard>` olarak saklar. Bir iş zaman aşımı, sonraki yüklemeyi engelleyebilir; önceden gönderilmiş düzenli durum bildirimleri tanılama kanıtı olarak kalır. Eksik düzenli durum bildirimleri, engellenmiş veya sonlandırılmış bir çalıştırıcı sürecine de işaret edebilir. Bu kayıtlar mevcut test seçimini, eşzamanlılığı, son tarihleri ve çıkış durumunu korur; aday kabulüyle ilgili kararlar değildir.

### Sırayı birleştir

`queue` etiketi Birleştirme kuyruğuna (`.mergify.yml`) bir PR gönderir. Mergify, bir `mergify/merge-queue/` dalında bir PR taslağı açar, CI tüm seçimi orada çalıştırır ve orijinal PR `Gate / CI`, `Gate / Quality` ve `Merge integrity (changelog + generated skills)` geçtiğinde birleşir.

Mergify, sıra özetini taslağın açıklamasına yazar ve diğer uygulamalar da bunu düzenleyebilir. Böyle bir taslaktaki `pull_request` `edited` olayı kendi eşzamanlılık grubunu (`-queue-edit-<run_id>`) alır, böylece taslağın gerçek çalışmasını iptal edemez ve geçidi ve matrisi atlar. Yalnızca `Merge integrity` hala çalışıyor. Atlanan geçit işi farklı bir kontrol adı taşır çünkü Mergify atlanan bir `Gate / CI` başarısız bir kontrol olarak okur ve PR kuyruktan çıkarır.

Kuyruktan çıkarma işleminden sonra push her zaman PR yeniden kuyruğa almaz. Bunun üzerine `@mergifyio queue` yorumlayın.

### Statik tarama envanteri

Sürümlendirilmiş npm alias envanteri ve statik tarama üyeliği
`config/quality/gate-manifest.json` içinde bulunur. Betik adlarını ve tam komutları
`package.json` dosyasına göre doğrulamak için `npm run check:gate-manifest` komutunu
çalıştırın; eklemeler, kaldırmalar ve komut sapmaları hem yerel hook'un hem de CI'daki
değişiklik sınıflandırma işlerinin başarısız olmasına neden olur. Bir alias; iş akışı
işi, matris örneği veya test vakası değildir: bu sayılar birbirinin yerine kullanılabilir
şekilde sunulmamalıdır.

Seçilen alias'ları çalıştırmadan incelemek için
`npm run quality:scan -- --list` veya `npm run quality:scan:fast -- --list`
komutunu kullanın. Çalıştırıcı npm giriş noktasını çağırır; böylece yapılandırılmış
olduğu durumlarda Bun dâhil olmak üzere giriş noktasının çalışma zamanı korunur.
Manifest, bu profillerin dışındaki alias'ları ayrı ayrı çağrılanlar olarak kaydeder
ve salt okunur tarama profillerinde bakım komutları yasaktır.

Bu profiller yalnızca statik taramayı kapsar. Ürün testlerini, kapsamı, paketlemeyi,
harici kontrolleri veya bir adayın tam sürüm kabulünü onaylamazlar. İş akışı kabulü,
bağlantılı `config/quality/admission-policy.json` ve
`scripts/quality/admission-verdict.mjs` dosyalarını kullanır. Release-observer profilleri
ayrı kalır; bunların geçerli kontrollerini ve makbuzlarını bağımsız olarak inceleyin.
Tam gözlemcinin statik komutları; `audit:deps`, mutasyon testi seçimi ve çeviri
kontrolleri dâhil olmak üzere `config/quality/release-green-static-profile.json`
içinde bildirilir. Yükleyici, npm komutlarını package.json ve modellenmiş CI/Quality
bildirimlerine göre doğrular; shell token'larını bağımsız değişkenler olarak yürütmek
yerine sapmayı reddeder. Zorunlu tarayıcıların SKIP/INCOMPLETE çıktısı PASS durumunu
tesis edemez. Profil, harici kapsam dışı bırakmalarını kaydeder ve barındırılan kapsam,
test matrisleri, paket veya dağıtım kanıtlarının yerini almaz. Aşağıdaki düzyazı
envanteri bir referanstır; bir geçidin gerçekten çalıştığının kanıtı değildir.

Betikler `scripts/check/` (politika geçitleri) ve `scripts/quality/` (ratchet motoru)
altında bulunur. CI için doğruluğun kaynağı `.github/workflows/ci.yml` dosyasıdır.

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

### PR hızlı yolunu (`quality.yml`) serbest bırakın

`.github/workflows/quality.yml` main/release PRs üzerinde CI tamamlar, `main` iter, grupları gönderir ve birleştirir. PRs yol filtreli hızlı kontrolleri kullanır. Kalıcı olarak devre dışı bırakılan kopya yapı kaldırıldı; gerçek build/package/boot kontrolleri CI kalır. Birim paketi ve vitest yalnızca CI (`Unit Tests (N/8)` ve `Vitest`) cinsinden çalışır.

| İş                                               | Kapsam                                                                                                                                                                                                                            | Engelleme            |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API dokümanlar referanslar ve dokümanlar-tümü                                                                                                                                                                      | Evet                 |
| `Fast Quality Gates`                             | Kod PRs; statik kontroller, tip kontrolü, gösterge tablosu tipi kontrolü, etkilenen birim testleri                                                                                                                                | Evet                 |
| `Forgotten sibling tests`                        | Kod PRs; Statik tüketicilere ve aday kardeş testlerine göre değişen modüller; varil ve dinamik içe aktarma yolları, referans verilen izin verilenler listesi istisnalarıyla birlikte tavsiye niteliğinde teşhis olarak raporlanır | **Danışma**          |
| `No new ESLint warnings`                         | Kod PRs; bastırmaya duyarlı tüy bırakmayan koruma                                                                                                                                                                                 | Evet, çatallar dahil |
| `Merge integrity (changelog + generated skills)` | Taslak olmayan PRs; değişiklik günlüğü ve oluşturulan beceri senkronizasyonu                                                                                                                                                      | Evet, çatallar dahil |

#### Unutulan kardeş testleri raporu

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` tavsiye niteliğindeki bir adımı olarak çalışır ve test etki haritasının arkasında içe aktarma çözümleyicisini yeniden kullanır. Değiştirilen her üretim modülü için, çekme isteği farkında aday testi bulunmadığında deterministik `changed module/symbol -> static consumer -> candidate sibling test` zincirlerini rapor eder. Markdown özeti ve JSON sonucu, herhangi bir engelleme kullanıma sunulmadan önce kalibrasyon için `forgotten-sibling-tests` iş akışı yapısı olarak korunur.

Namlu yeniden dışa aktarımı ve dinamik içe aktarma işlemleri yalnızca çözümleme tanılamasıdır; asla engelleyici bir bulgu yaratmazlar. İncelenen istisnalar `config/quality/forgotten-sibling-allowlist.json` yayınlanıyor. Her giriş, tüketici ve aday testine isim vermeli, belirli bir gerekçe sunmalı ve bir GitHub sorununu veya çekme isteğini bağlamalıdır. Yanlış biçimlendirilmiş girişler kapatılamaz. İstisnalar, silinmiş bir aday testi veya `.skip`/`.todo` ekleyen bir farkı bastıramaz; iddia zayıflatma ve diğer maskeleme işlemleri bağımsız olarak bloke eden `check:test-masking` kapısına ait olmaya devam etmektedir.

### İş: `lint`

`main` dalına yönelik her PR'da çalışır. Başarısızlık durumunda birleştirmeyi engeller.

| Betik (`npm run ...`)             | Doğruladığı                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Engelleyici                                    |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `check:node-runtime`              | Node.js sürümünün desteklenen aralıkta olması                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Evet                                           |
| `check:cycles`                    | `src/` + `open-sse/` genelindeki döngüsel içe aktarmalar (AST tabanlı, tsconfig `paths` çözümlenmiş). Yalın komut, herhangi bir döngü mevcut olduğunda 1 koduyla çıkar (kapatma güvenli davranış, #15281'den beri) ve SCC'leri listeler. `check:cycles:ratchet` (CI'ın çalıştırdığı), sayı `quality-baseline.json` içindeki `metrics.cycles` üst sınırını aştığında engeller — şu anda 14, `direction: down`; dolayısıyla yalnızca azalabilir (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet (mandal)                                  |
| `check:boundary`                  | `open-sse → src` bağımlılığı: motordan uygulamaya yapılan benzersiz dosyadan dosyaya içe aktarmalar (`scripts/quality/measure-boundary.mjs`; kenar listesi, v4 çekirdek/modül ayırma iyileştirme iş listesidir). Yalın komut = bilgilendirici rapor (`quality:boundary` ile aynı). `check:boundary:ratchet` (CI'ın çalıştırdığı ve ayrıca `quality.yml` hızlı denetim mandal döngüsünde bulunan), sayı `quality-baseline.json` içindeki `metrics.boundaryOpenSseToSrc` üst sınırını aştığında engeller — ölçülen 771 değeriyle başlatılmıştır, `direction: down`; `--update` yalnızca bu değeri düşürür; PR'larda tabana göre değerlendirilir (`--base-ref`, aşağıya bakın)                                                                                                                                                                                                                                                                                                                                                                                     | Evet (mandal)                                  |
| `check:route-validation:t06`      | Tüm rotalarda Zod şemalarının bulunması (Kademe 6 ilkesi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Evet                                           |
| `check:any-budget:t11`            | `@ts-expect-error // any` sayısı bütçeyi aşmaz (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet                                           |
| `check:provider-consistency`      | `providers.ts` içindeki her sağlayıcının `providerRegistry.ts` içinde eşleşen bir girdisi vardır (ve izin listesi kapsamında bunun tersi de geçerlidir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Evet                                           |
| `check:model-lifecycle`           | Elle yönetilen üç yönlendirme tablosu, depoya kaydedilmiş yaşam döngüsü anlık görüntüsüyle (#11503) tutarlı kalır: `FITNESS_TABLE` (`taskFitness.ts`), `REGISTRY` tarafından yönlendirilebilen kullanımdan kaldırılmış hiçbir kimliğe puan vermez; her `BUILT_IN_ALIASES` hedefi `REGISTRY` içinde bulunur ve kullanımdan kaldırılmış kimliklerin anlık görüntüsünde bulunmaz; hâlâ `REGISTRY` içinde bulunan, kullanımdan kaldırılmış her kimlik yönlendirilir veya `allowedRetiredInCatalog` içinde listelenir; ayrıca hiçbir `DEFAULT_DEGRADATION_MAP` kaynağı ya da hedefi bu anlık görüntüde kullanımdan kaldırılmış olarak görünmez. Bu, bir modelin şu anda etkin bir üst akış tarafından sunulduğunu kanıtlamaz. Çevrimdışı çalışır; elle `npm run quality:refresh-model-lifecycle` kullanılarak yenilenen `config/quality/model-lifecycle.json` ile karşılaştırır (ağ gerektirir; CI'a bağlanmamıştır). `allowedRetiredInCatalog`, giderek daralan bir kontrol mekanizmasıdır: yalnızca bir takip kaydıyla birlikte girdi ekleyin.                     | Evet                                           |
| `check:fetch-targets`             | İstemci tarafındaki `src/` içinde bulunan her `fetch("/api/...")` çağrısı gerçek bir `route.ts` dosyasına çözümlenir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Evet                                           |
| `check:deps`                      | Depodaki her `package.json` genelinde `npm install` ile kurulabilen tüm bağımlılıklar `dependency-allowlist.json` içinde bulunur; sabitlenmemiş veya yazım benzerliğiyle kötüye kullanılan yeni paketler işaretlenir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Evet                                           |
| `audit:deps`                      | Beş bağımsız kilit dosyasının (kök, Electron, OpenCode eklentileri v1/v2 ve sağlayıcı) npm denetimi. Kritik güvenlik uyarıları engelleyicidir; yüksek önem dereceli uyarılar görünür uyarılar olarak kalır. Eksik/başarısız denetimler TAMAMLANMAMIŞ kabul edilir ve engelleyicidir; kapsam başına kilit karmaları ve raporlar saklanır.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Evet                                           |
| `check:lockfile`                  | `package-lock.json` bütünlüğü — https kayıt defteri, bütünlük karmaları, ana makine geçersiz kılmaları yok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Evet                                           |
| `check:licenses`                  | Üretim bağımlılıkları için SPDX lisans izin listesi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                           |
| `check:tracked-artifacts`         | Derleme yapıtları / kaydedilmiş `node_modules` sembolik bağlantıları yok (husky pre-commit sırasında da çalışır; pre-push kasıtlı olarak hafiftir — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Evet                                           |
| `check:ai-attribution`            | PR commit'lerinde, başlığında veya gövdesinde AI/bot `Co-Authored-By` son bilgisi ya da AI üretimi alt bilgisi yok — Kesin Kural #16 (`quality.yml` içindeki PR→`release/**` hızlı geçitler döngüsünde — olay yükünü okur, PR dışında işlem yapmaz — ve `ci.yml` lint işleminde PR→`main` için yalnızca PR'lara özel bir adım; ayrıca husky `commit-msg` kancası; insan ortak yazarlarına izin verilir; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | Her Vitest hariç tutması bir takip sorununu belirtir ve `config/quality/vitest-exclusions.json` içinde yer alır (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Evet                                           |
| `check:file-size`                 | Kaynak dosyaları (`src/`, `open-sse/`, `electron/`, `bin/` içindeki `.ts`/`.tsx`) `cap`, test dosyaları (`*.test.ts(x)`) ise `testCap` sınırları içinde kalır; `file-size-baseline.json` içinde dondurulan (`frozen` / `testFrozen`) dosyalar kaydedilmiş boyutlarını aşmamalıdır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Evet                                           |
| `check:error-helper`              | Yürütücülerdeki/işleyicilerdeki hata yanıtları `buildErrorBody()` / `sanitizeErrorMessage()` kullanır (Kesin Kural #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Evet                                           |
| `check:migration-numbering`       | Geçiş SQL dosyaları boşluk veya yinelenen numara olmadan sıralı şekilde numaralandırılmıştır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Evet                                           |
| `check:public-creds`              | `publicCreds.ts` dışında değişmez OAuth `client_id`/`client_secret` veya Firebase Web anahtarları yoktur (Kesin Kural #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Evet                                           |
| `check:db-rules`                  | `src/lib/db/` modülleri dışında ham SQL yoktur; `localDb.ts` dosyasından toplu içe aktarma yoktur (Kesin Kurallar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Evet                                           |
| `check:known-symbols`             | Dağıtım tablolarına kaydedilen sağlayıcı yürütücüleri, yönlendirme stratejileri ve çevirmenler diskteki dosyalarla eşleşir — sahipsiz veya bildirilmemiş sembol yoktur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Evet                                           |
| `check:route-guard-membership`    | Alt süreç başlatan her rota `isLocalOnlyPath()` tarafından sınıflandırılır (Kesin Kurallar #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                           |
| `check:test-discovery`            | Depodaki her `*.test.ts` / `*.spec.ts` dosyası en az bir test çalıştırıcısı tarafından toplanır (ratchet: `test-discovery-baseline.json` içindeki yetim listesi yalnızca küçülebilir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Evet                                           |
| `check:test-tla-order`            | `tests/unit` altındaki hiçbir `node:test` dosyası bir test kaydedip üst düzey bir `await` ifadesine ulaştıktan sonra başka testler kaydetmez (#18045; ratchet: `test-tla-order-allowlist.json` yalnızca küçülebilir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Evet                                           |
| `check:agent-skills-sync`         | Oluşturulan aracı becerileri yapıtları kaynak kataloglarıyla eşleşir (sapma yoktur)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | Sağlayıcı logoları/varlıkları, kaydedilmiş bir kaynak bilgisi girdisi taşır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `lint:json`                       | JSON yapılandırma dosyaları ayrıştırılır ve depo lint kurallarını karşılar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | Hatasız TypeScript derlemesi (yalnızca bilgilendirici uyarılar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Evet                                           |
| `typecheck:noimplicit:core`       | Katı `noImplicitAny` — ileriye dönüktür; önceden var olan birçok çağrı noktasına hâlâ açıklama eklenmesi gerekir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Bilgilendirici** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` kapsamıyla sınırlı `tsc` (#7033) — `typecheck:core` komutunun özenle seçilmiş 27 dosyalık izin listesi hiçbir dashboard TSX dosyasını içermiyor ve `next build` de bunlar için hiçbir zaman tür denetimi yapmıyor (`next.config.mjs`, `ignoreBuildErrors: true` ayarını yapıyor); bu nedenle buradaki sahipsiz tanımlayıcı regresyonları (#6625/#6909) CI tarafından görülemiyordu. Sabitlenmiş dosya başına/TS kodu başına sayı temel çizgisiyle karşılaştırma yapar (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` ile aynı bayatlık zorlama kalıbı) — yalnızca temel çizgideki sayıyı aşan YENİ hatalar geçidi başarısız kılar; önceden var olan bir hata düzeltildiğinde `--update` ile kademeli olarak azaltın.                                                                                                                                                                                                                                                                                       | Evet                                           |
| `check:build-typecheck`           | `tsconfig.build.json` üzerinden (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) tüm uygulamanın üretim tür denetimi; `typecheck:core`'un 27 dosyalık izin listesi ile dashboard kapısının kapsamadığı yüzey. `config/quality/build-typecheck-baseline.json` ile karşılaştırır; dosya ve kod başına yeni veya artırılmış bir sayı başarısız olur, daha düşük bir sayı sizden kademeli azaltma yapmanızı ister. Çalışma yeni veya artırılmış bir çift içeriyorsa `--update` işlemi, `--force-regressions` geçirilmediği sürece reddeder; ayrıca yeni susturulmuş bir dosyayı da `--force-nocheck` geçirilmediği sürece reddeder. Böylece taban çizgisini genişleterek yeşil sonuç elde etmek ile kalıcı bir sessizlik tanımak iki ayrı, bilinçli eylem olur. Yalın bir `--force` reddedilir. Ayrıca derleme kapsamını `config/quality/ts-nocheck-baseline.json` ile karşılaştırarak `@ts-nocheck` kullanımı açısından tarar; çünkü bunu kullanan bir dosya hiçbir tanı bildirimi üretmez ve aksi hâlde her kapı tarafından görünmez olur. | Evet                                           |

#### İki tür denetimi programı farklı yanıtlar verir

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) ve `check:build-typecheck`, farklı seçeneklerle farklı programları
derler ve aynı dosya birinde temiz, diğerinde hatalarla dolu olabilir.

`tsconfig.build.json`, `"strict": false` ayarını yapar; bu nedenle `noImplicitAny`
kapalıdır. Core yapılandırması, daha katı seçeneklerle seçilmiş 27 dosyalık bir izin
listesini derler ve her girdinin içe aktarma grafiğini izler; bu nedenle derleme
programında hiç görünmeyen dosyalar burada yine de denetlenir.

Dosyanın tür denetiminden geçip geçmediğini değerlendirirken sonuç önemlidir:
**`check:build-typecheck` altında sıfır tanı bildirimi, sıfır anlamına gelmez**. 26
dosyadan `@ts-nocheck` kaldırıldığında, bunların 23'ü derleme programında temiz çıktı;
bunların on altısında katı programda yaklaşık 120 örtük-any hatası ortaya çıktı. Bir
dosyayı temiz kabul etmeden önce her ikisini de denetleyin.

### İş: `quality-gate`

`test-coverage` sonrasında çalışır. Başarısızlık durumunda birleştirmeyi engeller.

| Betik                        | Doğruladığı                                                                                                                                                                 | Engelleyici                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | `quality-metrics.json` dosyasını üretir (ESLint uyarı sayısı, birleştirilmiş parça raporundan kapsam)                                                                       | Evet (mandalın yukarısında) |
| `quality:ratchet`            | `quality-baseline.json` içindeki her metrik gerilememiştir (ESLint uyarıları ≤ temel çizgi; kapsam ≥ temel çizgi)                                                           | Evet                        |
| `check:duplication`          | Kod yinelemesi (jscpd@4), `quality-baseline.json` içindeki temel çizgiyi aşmaz                                                                                              | Evet                        |
| `check:complexity`           | Dosya düzeyindeki döngüsel karmaşıklık üst sınırı aşmaz (temel ESLint `complexity` + `max-lines-per-function`)                                                              | Evet                        |
| `check:cognitive-complexity` | Bilişsel karmaşıklık mandalı (`eslint-plugin-sonarjs`) — ayrı ESLint geçişi; CI, ikisini tek bir `check:complexity-ratchets` adımı olarak birleştirilmiş biçimde çalıştırır | Evet                        |
| `check:dead-code`            | Kullanılmayan dışa aktarımlar / dosyalar mandalı (knip), temel çizgiye kıyasla gerilemez                                                                                    | Evet                        |
| `check:compression-budget`   | Sıkıştırma karşılaştırması bütçesi — motor başına token tasarrufu alt sınırları gerilememelidir                                                                             | Evet                        |
| `check:type-coverage`        | Türlendirilmiş yüzde mandalı (`type-coverage`) gerilemez; büyük ölçüde `typecheck:noimplicit:core` kapsamını içerir                                                         | Evet                        |

### İşler: `codeql-scan` ve `codeql-admission`

`codeql-scan`, yapılandırılmış tüm analiz kategorilerini üretir. Bu iş başarıyla tamamlandıktan sonra `codeql-admission`, onun tam yüklemelerini ve adayın uyarı ratchet sınırını doğrular. Her ikisi de yalnızca belge değiştiren adaylar dahil olmak üzere `Gate / CI` kapısının zorunlu bağımlılıklarıdır. Yönetimsel etkinleştirme ve canary denemesi gereksinimleri aşağıdaki “CodeQL ratchet” bölümünde açıklanmıştır.

| Betik                  | Doğruladığı                                                                                                                                                                                                  | Engelleyici |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check:codeql-ratchet` | Uyarı ratchet kontrolünden önce aday ref/SHA değeri ve yapılandırılmış tüm analiz kategorileri güncel olmalıdır; eksik kanıt engeller. Genel envanter ayrı kalır — aşağıdaki “CodeQL ratchet” bölümüne bakın | Evet        |

### İş: `quality-extended`

Bu iş, geçerli adayları engeller. Paket boyutu, gizli bilgi bulguları, güvenlik açığı
bulguları, iş akışı bulguları ve OpenAPI değişiklikleri zorunlu mandallarla
denetlenir. Döngüsel bağımlılık tanılamaları öneri niteliğinde kalır. Tarayıcı
kurulumu zorunludur: `scripts/ci/install-quality-scanners.sh`, sabitlenmiş sürümleri
kurar ve kurulum hatalarını iletir. Eksik araçlar, geçersiz raporlar veya eksik
temel çizgiler, zorunlu tarayıcı geçidini TAMAMLANMAMIŞ durumda bırakır.

| Betik                    | Doğruladığı                                                                                                                                                                                                                     | Engelleme                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `check:circular-deps`    | Döngüsel bağımlılık yok (dpdm)                                                                                                                                                                                                  | **Tavsiye niteliğinde**                                        |
| `check:bundle-size`      | Paket boyutu üst sınırı aşmaz; ölçümün kullanılamaması başarısızlığa neden olur                                                                                                                                                 | **--ratchet ile engelleyici**                                  |
| `check:secrets`          | Gitleaks bulguları gerilemez; zorunlu taramalar eksik araçları/kaynağı/referans değerini, başarısız taramaları ve geçersiz raporları reddeder                                                                                   | **--ratchet ile engelleyici**                                  |
| `check:vuln-ratchet`     | Bağımlılık güvenlik açıkları gerilemez; zorunlu taramalar eksik araçları, geçersiz raporları veya eksik referans değerlerini reddeder                                                                                           | **--ratchet ile engelleyici**                                  |
| `check:workflows`        | İş akışı lint denetimi (actionlint + zizmor); eksik/bozuk tarayıcılar, geçersiz raporlar veya eksik ratchet referans değeri INCOMPLETE olarak başarısız olur. Geçerli bulgular, seçilen katı/tavsiye/ratchet politikasını izler | Çalıştırılması zorunludur; zizmor ratchet CI'da engelleyicidir |
| `check:openapi-breaking` | Sabitlenmiş olay commit'lerine göre herkese açık API sözleşmesi (PR merge-base, push öncesi, merge-group tabanı; zamanlanmış/manuel checkout için ilk üst commit); zorunlu ölçüm güvenli şekilde başarısız olur                 | **--ratchet ile engelleyici**                                  |

### İş: `docs-sync-strict`

`main` veya `release/**` dalına yönelik pull request'lerde bu iş yalnızca taslak olmayan (veya güvenilir bir kuyruktan gelen) ve dokümantasyon ya da kod değişikliği olarak sınıflandırılan adaylar için çalışır. PR dışındaki CI olaylarında da çalışır; bu iş akışının push tetikleyicisi yalnızca `main` dalını kapsar, `release/**` dallarını kapsamaz. Sıfırdan farklı çıkış koduyla biten bir adım işi engeller; yalnızca raporlanan bulgular ve aşağıda belgelenen istisnalar engellemez.

| Betik                          | Doğruladığı                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Engelleme                                                                                                                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Aşağıdaki 7 alt geçidi sırayla çalıştıran meta geçit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet                                                                                                                                 |
| ↳ `check:docs-sync`            | Paket/OpenAPI/CHANGELOG sürüm tutarlılığı, `llm.txt` dosyasının birebir aynaları, çevrilmiş CHANGELOG'un bölüm ve boyut değişmezleri ve yerlerine yenileri konmuş yinelenen belgelerin bulunmaması                                                                                                                                                                                                                                                                                                                                                  | Evet                                                                                                                                 |
| ↳ `check:docs-frontmatter`     | Derlenmiş dokümantasyon sayfalarının geçerli frontmatter başlıkları içermesi                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Evet                                                                                                                                 |
| ↳ `check:docs-counts`          | Yüksek güvenilirlikteki sayım değişmezleri katı biçimde uygulanır; dosya sayısına ilişkin sezgisel kontroller, betiğe `--strict` verilmedikçe yalnızca uyarır (CI meta geçidi bu bayrağı vermez)                                                                                                                                                                                                                                                                                                                                                    | Katı katman engelleyicidir; esnek katman tavsiye niteliğindedir                                                                      |
| ↳ `check:env-doc-sync`         | Açıkça belirtilen yok sayma, yalnızca dokümantasyonda bulunma ve yalnızca ortamda bulunma izin listeleri uygulandıktan sonra kaynak koddaki ortam değişkeni okumaları, `.env.example` ve `docs/reference/ENVIRONMENT.md` birbiriyle uyuşur                                                                                                                                                                                                                                                                                                          | Evet, belgelenmiş izin listelerinin dışında                                                                                          |
| ↳ `check:deprecated-versions`  | Yok sayılan belgeleri hariç tutarak güvenli tarihsel bağlamlar dışındaki olası eski sürümleri ve eski güncelleme tarihlerini raporlar                                                                                                                                                                                                                                                                                                                                                                                                               | Mevcut CI bağlantısında tavsiye niteliğindedir (`--strict` verilmez)                                                                 |
| ↳ `check:doc-links`            | Dokümantasyondaki dahili markdown bağlantıları gerçek dosyalara çözümlenir (`[text]`/`(path)` biçimi)                                                                                                                                                                                                                                                                                                                                                                                                                                               | Evet                                                                                                                                 |
| ↳ `check:fabricated-docs`      | Dokümantasyonda belirtilen rotalar, ortam değişkenleri, CLI komutları, hook adları ve dosya yolları kod tabanında mevcuttur. `--strict` aracılığıyla katı geçit; bayrak olmadan engelleyici olmayan başarısızlık.                                                                                                                                                                                                                                                                                                                                   | Evet (CI'da `--strict` aracılığıyla)                                                                                                 |
| `check:cli-i18n`               | CLI'da kullanılan `t()` anahtarları `en` içinde bulunur; `pt-BR` her üst düzey bölümü korur; `zh-CN` ve `zh-TW`, `en` içindeki her anahtarı içerir                                                                                                                                                                                                                                                                                                                                                                                                  | Evet                                                                                                                                 |
| `check:openapi-coverage`       | OpenAPI belirtimi, gerçek rotaların en az ratchet ile belirlenmiş alt sınırını kapsar                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Evet                                                                                                                                 |
| `check:openapi-security-tiers` | Bildirilen `x-loopback-only`/`x-always-protected` ek açıklamalarının `routeGuard.ts` tarafından desteklenmesi gerekir; ayrıştırıcı hataları ve ileri yönlü kontroldeki uyuşmazlıklar engeller. Yalnızca yerel erişime izin veren önekler altında eksik `x-loopback-only` için yapılan ters kontrol uyarı verir; yalnızca desenlerle tanımlanan rotalar bu ters kontrolden hariç tutulur.                                                                                                                                                            | Ayrıştırıcı ve ileri yönlü kontroller engelleyicidir; ters kontrol tavsiye niteliğindedir                                            |
| `check:openapi-routes`         | Gerekçelendirilmiş `KNOWN_STALE_SPEC` izin listesi uygulandıktan sonra `openapi.yaml` içindeki her `/api...` yolu, parametre farklarından bağımsız olarak gerçek bir rotayla eşleşir; izin listesindeki artık geçerli olmayan girdiler de başarısızlığa yol açar                                                                                                                                                                                                                                                                                    | Evet                                                                                                                                 |
| `check:docs-symbols`           | Ayna olmayan kanonik belgelerdeki dahili `/api/...` URL referansları gerçek bir rotayla veya rota ailesiyle eşleşir; vekil sunucu, üst kaynak, yer tutucu ve dosya referansları ile gerekçelendirilmiş `KNOWN_STALE_DOC_REFS` girdileri hariç tutulur, izin listesindeki artık geçerli olmayan girdiler ise başarısızlığa yol açar                                                                                                                                                                                                                  | Evet                                                                                                                                 |
| `i18n translation drift`       | Temel belgelerin kaynak/hedef karmalarını ve çevirinin kökenini denetler. PR karşılaştırması yalnızca birebir aynı devralınmış hatalara izin verir; kaynak, eksik hedef, hedef karması, güncelliğini yitirmiş çeviri veya bölüm önbelleğiyle ilgili yeni ya da doğrulanmamış tutarsızlıklar engeller. PR karşılaştırması dışında kaynak/eksik hedef/hedef karması hataları engellerken güncelliğini yitirmiş çeviriler ve tutarsız bölüm önbellekleri yalnızca uyarı olarak kalır. Eski biçimdeki bölüm önbelleğinin bulunmaması bir hata değildir. | Yeni/doğrulanmamış PR sapması engeller; birebir aynı devralınmış sapma yalnızca uyarıdır; PR dışındaki kurallar hata türüne bağlıdır |

`docs/diagrams/` altındaki on iki README SVG'si oluşturulur (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` tümünü yeniden oluşturur). Her biri için bir bayt karşılaştırmalı birim testi
(`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` işi) bulunur; bu test, işlenmiş dosya güncel olmadığında başarısız olur ve
`check:docs-counts`, `<text>` düğümlerinden kanonik sayıları okur — bu nedenle dış hatları oluşturma adımı, dosyadaki her dış hatlı dizeyi görünmez `<text>` olarak tutar. SVG kanonik sayı denetimi,
`SVG_DIAGRAM_FILES` içinde listelenen dosyaları okur (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg` ile `public/images/tier-flow-dark.svg` ve `tier-flow-light.svg`; free-forever, catalog-entry,
recurring-pool ve scoring-factors iddiaları da `promise-pillars.svg`, `free-tier-budget.svg` ve
`strategies-grid.svg` dosyalarını okur. `free-tier-budget.svg`
şekillerini canlı katalog yükleyicisinden alır; bu nedenle `FREE_MODEL_BUDGETS` değerinde veya bir sağlayıcının görünen adında yapılan bir değişiklik, bu dosya yeniden oluşturulana kadar CI'ı kırmızıya çevirir.

### İş: `i18n-ui-coverage`

| Betik                                | Doğruladığı                                                                                                                                                                                         | Engelleyici     |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (satır içi) | UI i18n anahtarı kapsamı ≥ %65                                                                                                                                                                      | Evet            |
| `check-ui-value-drift` (satır içi)   | Yeniden yazılmış bir İngilizce **değer**, geride güncelliğini yitirmiş çeviri bırakmaz                                                                                                              | Evet            |
| `check-new-key-coverage` (satır içi) | **Yeni** bir İngilizce anahtar her yerel ayarda çevrilmiştir — `__MISSING__:` işareti reddedilir                                                                                                    | Evet            |
| `check-translation-ratio`            | Yerel ayar başına gerçek çeviri oranı (izin listesinin dışındaki İngilizceyle aynı / yer tutucu / eksik yapraklar), `config/quality/i18n-translation-baseline.json` + tolerans değerini aşmamalıdır | **Engelleyici** |

`fetch-depth: 0` gerektirir — değer sapması geçidi, `en.json` dosyasını birleştirme tabanıyla karşılaştırır.

#### `check-ui-value-drift` — güncel olmayan çeviri kapısı

Diğer geçitlerin yapısal olarak göremediği tek i18n regresyonunu yakalar: Bir İngilizce değer
yeniden yazılırken _önceki_ İngilizce metinden türetilmiş çeviriler geride kalır; böylece
İngilizce dışındaki dilleri kullanan kullanıcılar, kendinden emin bir dille yazılmış ancak artık
yanlış olan metni okumaya devam eder.

Bu durum gerçekten üretime çıktı. Antigravity oturum açma yardımcısı eklendiğinde (#5203)
`oauthModal.googleOAuthWarning` yeniden yazıldı; **43 yerel ayarın 39'unda** operatörlere
"tam URL'yi kopyalayıp aşağıya yapıştırmalarını" söyleyen metin korundu — bu sağlayıcı için
tamamlanması mümkün olmayan bir akış. Aşağıdaki nedenlerle #8463'e kadar fark edilmedi:

- `sync-ui-keys` yalnızca **bulunmayan** anahtarları ekler, **güncelliğini yitirmiş** olanları asla güncellemez;
- `check-ui-keys-coverage` anahtar _varlığını_ saydığından, güncelliğini yitirmiş bir çeviriyi kapsanmış kabul eder;
- `check-translation-drift`, `docs/i18n/<locale>/**.md` dokümantasyon yansımalarını izler —
  `src/i18n/messages/*.json` dosyalarını hiçbir zaman okumaz. 2026-09 yeniden eşitlemesinden beri
  `docs-sync-strict` işinde engelleyicidir: temel bir belgeyi düzenleyin → `npm run i18n:run -- --files=<doc>`
  (bölüm düzeyinde, düşük maliyetli).

**Fark değişikliklerine duyarlıdır, taban çizgisine dayanmaz.** Birleştirme tabanındaki `en.json`
ile çalışma ağacını karşılaştırır; İngilizce değeri değişen her anahtar için, hâlâ dokunulmamış
bir çeviriyi tutan her yerel ayar güncelliğini yitirmiş sayılır. Bu, **önceden var olan teknik
borcu kasıtlı olarak dondurur** — bir fark, uzun süredir mevcut bir çevirinin hangi eski İngilizce
metinden geldiğini gösteremez; bu nedenle geçit yalnızca mevcut değişikliğin dokunduğu öğeleri
değerlendirir. Alternatif çözüm (anahtar başına karma taban çizgisi), mevcut en büyük taban
çizgisinin 3 katı olan yaklaşık 600 KB'lık oluşturulmuş bir dosya gerektirir ve her i18n PR'ında
gereksiz değişiklik üretirdi.

Bunu karşılamanın iki yolu vardır:

1. etkilenen çevirileri güncellemek veya
2. bunları `__MISSING__:<new english>` olarak ayarlamak — çalışma zamanı daha sonra düzeltilmiş
   İngilizce metni sunar (`src/i18n/request.ts::deepMergeFallback`, #7258) ve anahtar çeviri
   kuyruğuna alınır.

Dizenin **anlamı** değiştiyse **anahtarı yeniden adlandırmayı** tercih edin: yeni bir anahtar,
güncelliğini yitirmiş bir çeviriyi devralamaz. #8463'te kullanılan yöntem budur.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Değer sapması ve yeni anahtar denetimleri, `scripts/i18n/resolve-ui-diff-base.mjs` tarafından sağlanan tek bir değişmez karşılaştırmayı paylaşır. İş akışı, aynı taban, taban ucu ve aday SHA'larını her iki denetime de iletir. PR/taban yeniden hedefleme, push ve merge-group çalıştırmaları kendi olay bağlamlarını kullanır. Bir aday dalı manuel olarak tetiklemek, onun açık PR'ının tam olarak belirtilmesini veya açıkça `i18n_base_sha` girdisinin sağlanmasını gerektirir. Bu girdi olmadan `main` ya da `release/vX.Y.Z` için manuel veya zamanlanmış gözlem, son commit'i ilk üst commit'iyle karşılaştırır; bu, devralınan tüm çeviri borcunun denetimi değildir. Yerel çağrı, örneğin yukarıdaki `BASE_REF` komutu gibi açıkça belirtilmiş bir karşılaştırma tabanı gerektirir.

Eksik veya belirsiz karşılaştırma bağlamı, okunamayan ya da geçersiz bir zorunlu katalog ve değişmiş bir aday, uyarı modunda da dahil olmak üzere **2** çıkış koduyla `INCOMPLETE` sonucunu üretir. Katalog okumaları `scripts/i18n/read-ui-catalog.mjs` kullanır; okuma hataları boş nesnelerle değiştirilmez. Ne kullanılamayan bir taban ne de eksik girdi PASS sonucunu oluşturur.

### İş: `i18n`

Tam i18n doğrulama matrisi (yerel ayar başına bir iş). İşin tamamı tavsiye niteliğindedir.

| Senaryo                         | Doğrular                             | Engelleme                                         |
| ------------------------------- | ------------------------------------ | ------------------------------------------------- |
| `validate_translation.py quick` | Yerel ayara göre çevirinin bütünlüğü | **Danışma** (tüm işte `continue-on-error: true` ) |

### İş: `pr-test-policy`

Yalnızca çekme istekleriyle çalışır.

| Senaryo                | Doğrular                                                                                                                                                  | Engelleme |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` veya `bin/` üretim kodunu değiştiren PRs testleri içermeli veya güncellemelidir (Zor Kural #8)                           | Evet      |
| `check:test-masking`   | Değiştirilen test dosyaları net iddia sayısını azaltmıyor veya `assert.ok(true)` totolojileri eklemiyor                                                   | Evet      |
| `check:pr-evidence`    | PR gövdesi, test/VPS değişikliğine dair kanıtlardan bahsediyor ( PR düzyazı — kırılganlığını grep ederek Sert Kural #18 mekanize ediyor, bkz. İş Listesi) | Evet      |

### İş: `test-vitest`

`changes` sınıflandırma işini gerektirir. Geçerli matris parçaları başarısız olduğunda birleştirmeyi engeller.

| Paket            | Doğruladıkları                                                      | Engelleyici                                                                                                               |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP sunucusu (110 araç), autoCombo, önbellek — vitest çalıştırıcısı | Evet                                                                                                                      |
| `test:vitest:ui` | Kullanıcı arayüzü bileşen testleri — vitest çalıştırıcısı           | **Engelleyici** — önceden mevcut hatalar `vitest.config.ts` içinde açıkça hariç tutulur; yeni hatalar işi başarısız kılar |

### Gecelik iş akışları (planlanmış, tavsiye niteliğinde)

Bunlar asla PRs değil, bir cron çizelgesinde (ve `workflow_dispatch`) çalışır. Hepsi tavsiye niteliğindedir.

| İş akışı               | Doğrular                                                                                                                                                                      | Engelleme   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | rastgele tohum + yüksek çalışma sayısıyla hızlı kontrol özellik testleri                                                                                                      | **Danışma** |
| `nightly-resilience`   | yığın büyüme kapısı, kaos hata enjeksiyonu, k6 load/soak                                                                                                                      | **Danışma** |
| `nightly-llm-security` | Promptfoo enjeksiyon koruması (blok modu) + garak araştırmaları (sağlayıcı sırrı olmadan atlanır)                                                                             | **Danışma** |
| `nightly-schemathesis` | `docs/openapi.yaml` — kullanılarak canlı bir OmniRoute karşı OpenAPI sözleşmesi bulanıklaştırma (şematez) spesifikasyon ihlallerini/işlenmemiş 500'leri yüzeyler (Fase 8 B.4) | **Danışma** |
| `nightly-mutation`     | Hızlı birim şerit — hayatta kalan mutantların yüzey zayıflığına ilişkin Stryker mutasyon testi puanı                                                                          | **Danışma** |
| `nightly-compat`       | Desteklenen `engines.node` aralıklarında düğüm motoru uyumluluk matrisi                                                                                                       | **Danışma** |

Performans temel çizgileri (yığın, TTFB, derleme süresi) geçitli değil, kaydedilir: bkz. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### CodeQL mandalı: aday kabulü ve veri havuzu envanteri

CI açık bir bağımlılık zinciri yoluyla aday CodeQL kabulüne sahiptir: `codeql-scan` `codeql.yml` dört dilli matrisi çağırır, ardından `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate` çalıştırır. `Gate / CI` her iki sonucu da gerektirir. Kalite kendi sayısal kontrollerini korur ancak yapımcı işini bitirmeden tarayıcıyı sorgulamaz; `Gate / Quality` tek başına tam aday kabulü anlamına gelmez. CodeQL yalnızca belge adayları için zorunlu olmaya devam ediyor.

`config/quality/codeql-admission-policy.json` politika Eylemler'i, C/C++, JavaScript/TypeScript ve Python'u, sorgu paketi varsayılanını, uzaktan tehdit modelini ve derleme modunu (hiçbiri) seçer. Yapımcı ön kontrolü, bekleyen bir etkinleştirme kaydını reddeder ve açık hedef listesinin dışına dallanır. Mevcut hedefler anadir ve release/v3.8.54. Sözleşme testleri bu sınırlı listeyi ve bakım itme tetikleyicisini paket sürümüyle karşılaştırır; Bir sonraki sürümün katılım sürecinin gözden geçirilmesi gerekiyor. CI mevcut daha geniş sürümlü PR tetikleyicisi korunur, ancak yerleşik olmayan bir hedef, ölçülmemiş bir PASS elde etmek yerine çıkarmadan önce HOLD bildirir.

Her matris işi, gerçek SARIF yükleme ID, dilini, kategorisini, çalıştırma ve denemesini, arayanın iş akışı kimliğini, olay ref/head/base/merge SHA ve politika karmasını kaydeder. Bağımlı iş yalnızca bu çalıştırmanın girişlerini indirir ve yapı özetlerini doğrular. Dört kategorinin tamamını, başarılı bir yapımcıyı ve her tam yüklemenin tamamlanmış işlemini gerektirir. Bir dalda bulunan en son analizi değil, API sarif_id filtresini kullanır. Kısmi tekrar çalıştırmalar, aynı çalıştırmanın ve adayın daha önceki bir denemesindeki başarılı kategorileri yeniden kullanabilir ve üretim denemesini koruyabilir; Başarısız olan bir mevcut üretici önceki yeşil kanıtları yeniden kullanamaz.

CodeQL eylemi işlenmeyi bekler, ancak sabitlenmiş uygulaması uyarı verebilir ve durum okuma hatası veya tükenmiş bekleme sonrasında devam edebilir. Bu nedenle kabul, işlemi tekrar doğrular. Eksik kategoriler, bekleyen işlemler, başarısız veya iptal edilen işler, eski kimlik, eksik sayfalandırma veya kullanılamayan APIs HOLD üretir ve 2'den çıkar. Bağımsız bir tarayıcı iş akışı için sabit bir bekleme kalmaz. Taranmamış bir PR bir uyarı sorgusu 0 döndürdüğü için geçemez. `metrics.codeqlAlerts.value` üzerinde ölçülen bir sayım 1'den çıkar; taban çizgisi başka bir şubenin uyarılarını absorbe edecek şekilde yükseltilmemiştir. [Yükleme durumu ve analiz araması](https://docs.github.com/en/rest/code-scanning/code-scanning).

Makbuz kayıtları IDs, kategorileri, araç sürümlerini, ref/SHA, temel ve uyarı numaralarını yükler ve analiz eder. SARIF identity/result sayımı, minimum kural sayıları ve kesin uyarı örnekleri zorunlu olmaya devam ediyor. PR/analysis kimlikleri kabul edilmeden önce yeniden kontrol edilir. Bu kontroller, çıkarılan her kaynak dosyanın envanterini değil, yapılandırılmış kategori kapsamını oluşturur. C/C++ inşa edilmeden çıkarma, bir proje inşası sırasında oluşturulan kodu içermez. Kaynak hariç tutmaların hala gözden geçirilmesi gerekiyor ve katkıda bulunanların atıflarının karşılaştırılabilir kesin temelli kanıtlara ihtiyacı var.

`codeql-maintenance.yml` PR/main üreticilerini çoğaltmadan aktif sürümlü anlık taramalar ve haftalık program sağlar. `nightly-codeql-inventory.yml`, `--strict-measurement` ve ölçüm kullanılamadığında ortaya çıkan bir hatayla birlikte depo çapındaki temel çizgiyi ayrı tutar. Yerel miras koleksiyoncusunun zarif atlaması aday kabulü anlamına gelmiyor. Sıkılaştırma, doğrulanmış daha düşük küresel sayımdan sonra açık bir `--update` olmaya devam ediyor.

Varsayılan Kurulum yapılandırılırken Gelişmiş iş akışı yayınlanmamalıdır: GitHub bu birleşimi reddeder. Sürümlendirilmiş politikası, gözden geçirilen idari geçiş tekrar okununcaya kadar beklemede kalacaktır. Yayınlanmadan önce, bir operatör pin deposu, head/base/tree, policy/patch/rollback karmaları ve gözlemlenen kurulum durumu; `node scripts/quality/codeql-producer.mjs verify-admin-readback` sağlanan beklenen ve gerçek JSON kayıtlarını kontrol eder. Bu teknik bir korumadır, operatörün onayı veya yeni okumaların getirilmesi için bir yedek değildir. PR belirteci hiçbir zaman Yönetim erişimi talep etmez. Kullanıma sunma ve herhangi bir tarayıcı değişikliği, ayrı bir okumanın yanı sıra gerçek PR, çatal ve birleştirme grubu uyumluluğu kanıtını gerektirir.

Çatallar, barındırılan çalıştırıcıları kullanır, kalıcı kimlik bilgileri olmadan ödeme yapar, yapımcıda install/build projesi yoktur ve devralınan depo sırları yoktur. GitHub azaltılmış çatal belirteci ile pull_request olayı için SARIF yüklemesini destekler; ilk kez katkı yürütme onayı GitHub politikası olmaya devam ediyor. Güvenilmeyen kodu yürütmek için asla pull_request_target kullanmayın. Geçişin tamamlandığını düşünmeden önce gerçek belirteç izinlerini, analiz_anahtarını ve kontrollü kanaryadaki tüm kategori ortamlarını doğrulayın. [Çatal yükleme kuralları](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [çakışan kurulum modları](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**İşten çıkarmalar operatörün çağrısıdır ( #14 Katı Kuralı)** — işten çıkarma yorumunda teknik gerekçeyi kaydetmeden bir CodeQL uyarısını asla reddetmez: Yukarı akış protokolü gerekliliği için `won't fix`, bir test fikstürü için `used in tests`, bir sanite edici için `false positive` CodeQL göremez (emsal: `docs/security/ERROR_SANITIZATION.md`).

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

**Yukarıda ayrıca belgelenmemiş olanlar** (tavsiye niteliğinde, düşük sinyalli): `docs-lint` işi (markdownlint + Vale, tüm işte `continue-on-error`) ve bağımsız tarayıcı iş akışları `semgrep.yml` / `scorecard.yml`. CodeQL artık yukarıda açıklanan etkinleştirme gereksinimlerine tabi olarak `Gate / CI` altında zorunlu üretici ve kabul işlerine sahiptir. `semgrepFindings: 0`, `quality-baseline.json` içindedir ancak `ci.yml` içinde engelleyici bir ratchet'e bağlanmamıştır — metrik şu anda bağlantısızdır.

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
