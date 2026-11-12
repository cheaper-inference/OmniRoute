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

CI ve Quality Gates iş akışlarının her biri istikrarlı bir karar verir: `Gate / CI` ve `Gate / Quality`. Sürümlendirilmiş kabul politikaları, her yukarı yönlü işi gerekli veya tavsiye niteliğinde olarak sıralar. Uygulanabilir bir gerekli iş başarılı olmalıdır: eksik, iptal edilmiş, atlanmış, beklemede ve bilinmeyen sonuçlar PASS oluşturamaz. Geçerli bir yalnızca belge veya yalnızca katalog sınıflandırması, kod şeridini uygulanamaz hale getirebilir; sıradan bir PR taslağı kabul edilen bir aday değildir. `hotfix` etiketi kanıtlardan feragat etmez.

Her iki iş akışı da PRs main/release şubelerine, `main` gönderimleri, manuel gönderimi ve grup birleştirme olaylarını kapsar. Tüm seçimi itin, dağıtın ve birleştirme grubunu çalıştırın. Güvenilir Bir Birleştirme kuyruğu taslağı aynı zamanda uygulanabilir `full-code`/`full-code-e2e` işlerini de çalıştırır; sıradan PRs bunları atlar. Manuel birleştirmeden önce, tam aday üzerinde tam gönderim çalıştırın. `release/**` aktarımlar bu iş akışlarını başlatmaz; Release-Green, birleştirilmiş üssü ayrı ayrı gözlemler (`docs/ops/RUNNER_BOX.md` → Barındırılan şerit). Çatallar ve birleştirme grupları, aksi takdirde kendi kendine barındırılan çalıştırıcıları seçen işler için barındırılan çalıştırıcıları kullanır; Yeterli barındırılan kapasitenin kullanıma sunulmadan önce doğrulanması gerekir.

Sıradan bir PR hızlı seçimi çalıştırır. Kabul politikasının `full-code` ve `full-code-e2e` şeritleri (E2E, entegrasyon, paket yapısı, Electron dumanı, Bun SQLite, ekosistem ve protokol istemcileri) yalnızca Birleştirme kuyruğu taslağında veya tam çalıştırmada çalışır: `gh workflow run ci.yml --ref <branch>`.

Her JSON makbuzu, teslim alınan SHA, iş akışı çalıştırmasını ve girişimini tanımlar. CLI checkout/event SHA uyumsuzluğunu reddeder. İş akışı testleri, politika üyeliğini karar işinin `needs` listesine bağlar, böylece yeni veya kaldırılmış bir şerit sessizce ortadan kaybolamaz. Makbuzlar, yayın, dağıtım veya mevcut bir tavsiye niteliğindeki tarayıcının dahili içeriğini değil, kendi iş akışlarını kapsar. Şube kurallarında gerekli olan kontrollerin yapılması ayrı bir idari değişiklik olup; işlerini tanımlamak tek başına bir şubeyi korumaz.

`API Route Typecheck`, hem toplu kararların hem de yerel tam gözlemcinin statik profilinin dışında bağımsız bir iş akışı kontrolüdür. Kesin aday için sonucunu ayrı ayrı inceleyin. `.github/workflows/api-route-typecheck.yml` PRs üzerinde `main` veya `release/**` çalışır, şube ailesinden birine, manuel gönderime ve `checks_requested` türündeki `merge_group` olaylarına iletir. Yol filtresi yoktur. Grupları birleştir `merge_group.head_sha` göz atın; diğer etkinlikler `github.sha` göz atın. Tüm olaylar aynı API teşhis kapısını ve geçit ünitesi testlerini kullanır. PR tabanı yeniden hedeflemeleri yeni bir kontrol talep eder; body/title düzenlemeleri yalnızca gözlem amaçlı `Admission not requested / API Route Typecheck` adını kullanır ve kabul kontrolünün yerini alamaz.

### Kabul düşürücüde tutulan kanıtlar

`scripts/quality/validate-release-acceptance.mjs` sağlanan bir planı ve onun bildirimlerini azaltır; planın sürüm hattının tamamını kapsadığını ortaya koymaz. Plan `VERIFIED` olsa bile raporları açıkça `releaseAcceptance: false` belirler. `release-acceptance.yml` iş akışı, gerçek yapı, paket, önyükleme veya promosyon makbuzlarını değil, hâlâ gölge fikstürleri kullanıyor.

CLI `--evidence-root` tutulan kanıtları doğrulamasını gerektirir. Dosyalar `<evidence-root>/<artifact_id>/<member>` olarak çözümlenir ve SHA-256 olarak karma işlemi uygulanır. Kanıtı olmayan bir PASS kaydı, eksik veya değiştirilmiş bir dosya, güvenli olmayan bir yol veya sembolik bağlantı, doğrulamayı engeller. Eksik dosyalar, boş başarılı günlüklere eşdeğer değildir. Mevcut SHA/run/attempt kontrolleri bağımsız kalır: eşleşen baytlar eski bir alındı bilgisini kurtaramaz. Dosya bütünlüğü, yürütme orijinalliğinin veya yapı tanıtımının kanıtı değildir.

### DAST doğrulanmış CI yapısını kullanır

Gerekli `dast-smoke` CI işi, `build` sonra `.github/workflows/dast-smoke.yml` çağırır. Desteklenen çatal PRs, yayın hedefi PRs ve birleştirme grupları dahil olmak üzere yapıyla aynı code/draft seçimini izler. Eksik, başarısız, iptal edilmiş veya beklenmedik bir şekilde atlanan DAST iş blokları `Gate / CI`. Yeniden kullanılabilir iş akışının bağımsız bir PR/dispatch tetikleyicisi yoktur; manuel doğrulama CI gönderimini kullanır, böylece yapı ve tüketici tek çalıştırmada kalır.

`scripts/ci/next-build-provenance.mjs` Next yapısının tamamını katran özeti, repository/event/run, üretici girişimi, head/base/checkout/tree, iş akışı kimlikleri, kilit dosyası, tam Düğüm version/ABI, platform ve paketleyiciyle mühürler. DAST `needs.build.outputs` değişmez yapıt ID seçer, indirme özeti doğrulamasını gerektirir ve izin verilenler listesindeki iki üyesini `scripts/ci/unpack-ci-build.py` aracılığıyla çıkarmadan önce ZIP bağımsız olarak üretici özetine göre karma hale getirir. Manifest ve katran arşivinin, Sonraki ağaç çıkarılmadan önce bağımsız üretici çıktılarıyla da eşleşmesi gerekir. Hiçbir zaman en son başarılı şube yapısını aramaz. Kısmi bir yeniden çalıştırma, ID ve tüm girdiler hala eşleştiğinde aynı yapımcı girişimini yeniden kullanabilir; makbuz her iki girişimi de kaydeder.

Tüketici, salt okunur depo iznine sahip ve depo sırları olmayan, barındırılan bir Linux çalıştırıcısında kalır. Üreticinin tam Node sürümünü yükler, ardından CLI `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1` ile birleştirir. `scripts/build/standaloneInput.mjs` herhangi bir geri dönüş derlemesinden önce eksik bir bağımsız sunucuyu reddeder; normal yerel CLI yapıları mevcut geri dönüşlerini korur. Sunucu hazırlığı, Schemathesis ve Promptfoo'nun tümü, değişmeyen 25 dakikalık iş sınırı dahilinde başarılı olmalıdır. Kaynak makbuzu, başarılı bir DAST taraması değil, giriş kimliğini ve baytları kanıtlar. Artefaktın süresinin dolması, koşucunun kesintiye uğraması veya başarısız bir tarayıcının eksik veya başarısız kanıt olarak kalması; bir tavsiye paketi aracılığıyla PASS haline gelemez.

### UI yürütme kapasitesi

CI UI envanterinin tamamını, her biri parça başına en fazla iki çalışana ve mevcut 15 dakikalık iş teslim süresine sahip dört `test-vitest` matris parçası olarak çalıştırır. İlk parça aynı zamanda MCP/autoCombo Vitest paketini de çalıştırıyor. Gerekli iş sonucu her matris ayağını kapsar; Bir parçanın başarısızlığı veya iptali aday kabulü anlamına gelmez.

Gecelik gözlemci, ilk alındıdaki MCP yürütmesi de dahil olmak üzere her UI parçası için ayrı bir tam aday makbuzu tutar. Dört makbuzun, günlüklerin ve eşleşen yürütme kimliklerinin tümü gereklidir. Yerel `npm run test:vitest:ui` hâlâ paketin tamamını seçiyor; bir `--shard` çalışması yalnızca kısmi kanıttır.

### Birim kapsamı koleksiyonu

On iki birim parçası, mevcut test yürütmeleri sırasında V8 kapsamını toplar. Başarılı bir parça, bir ara İstanbul raporu oluşturmadan orijinal dosyaları sıkıştırmak için `scripts/ci/compact-v8-coverage.mjs` çalıştırır. Son Kapsama işi, aday SHA, çalışma zamanına, kaynak köküne ve veri karmalarına göre on iki bildirimin tamamını doğrular, ardından c8'in raporlayıcılarını ve mevcut kapsam eşiklerini çalıştırır. Girişler c8'in genel dosya adı sırasını korur; parça başına ön birleştirme, karışık function/block kapsamı için güvenli değildir. Eksik, hatalı biçimlendirilmiş veya uyumsuz parçalar kabul edilemez. Başarısız olan test parçaları ham teşhis kapsamını ayrı olarak korur; son birleştirmeye giremez.

### Birim yürütme ilerleme durumu alındıları

Paylaşılan `test:unit:ci:shard` komutu, `scripts/ci/unit-progress-reporter.mjs` aracılığıyla `primary`, `dashboard` ve `serial` aşamalarını kaydeder. Normal test raporu mevcut kalır. Ayrı bir yalnızca meta veri makbuzu, her dosyanın başlangıcını ve bitişini kaydeder ve 30 saniyelik bir kalp atışı, hala etkin olan dosyaları ve geçen sürelerini listeler. Yalnızca izin verilenler listesine eklenen yürütme meta verilerini kaydeder; test açıklamaları, çıktı, hata gövdeleri ve ortamın tamamı serileştirilmemiştir.

CI JSONL dosyalarını `unit-progress-ci-<run>-<attempt>-<shard>` olarak saklar. İşin zaman aşımı daha sonraki yüklemeyi engelleyebilir; Halihazırda yayılan kalp atışları tanısal kanıt olmaya devam ediyor. Eksik kalp atışları aynı zamanda engellenen veya sonlandırılan bir koşucu sürecini de yansıtabilir. Bu makbuzlar mevcut test seçimini, eşzamanlılığı, son teslim tarihlerini ve çıkış durumunu korur; bunlar aday kabul kararları değildir.

### Sırayı birleştir

`queue` etiketi Birleştirme kuyruğuna (`.mergify.yml`) bir PR gönderir. Mergify, bir `mergify/merge-queue/` şubesinde bir PR taslağı açar, CI tüm seçimi orada çalıştırır ve orijinal PR `Gate / CI`, `Gate / Quality` ve `Merge integrity (changelog + generated skills)` geçtiğinde birleşir.

Mergify, kuyruk özetini taslağın açıklamasına yazar. Body/title-only `pull_request` `edited` olayları, çalıştırmaya özgü bir eşzamanlılık grubu kullanır ve sınıflandırmayı, test matrislerini, birleştirme bütünlüğünü veya kabul kararını yeniden çalıştırmaz. Yalnızca gözlem kontrolü adları `Gate / CI` veya `Gate / Quality` yerini alamaz. Hedef tabanı değiştiren bir düzenleme, yeni aday doğrulaması gerektirir.

Bir kuyruktan çıkarma işleminden sonra, bir itme her zaman PR yeniden kuyruğa almaz. Bunun üzerine `@mergifyio queue` yorum yapın.

### Statik tarama envanteri

Sürümlendirilmiş npm-alias envanteri ve statik tarama üyeliği `config/quality/gate-manifest.json` yayındadır. Komut dosyası adlarını ve tam komutları `package.json` göre doğrulamak için `npm run check:gate-manifest` çalıştırın; eklemeler, çıkarmalar ve komut kayması, CI hem yerel kancada hem de değişiklik sınıflandırma işlerinde başarısız olur. Takma ad bir iş akışı işi, matris örneği veya test durumu değildir: bu sayımlar birbirinin yerine kullanılabilir olarak sunulmamalıdır.

Seçilen takma adları çalıştırmadan incelemek için `npm run quality:scan -- --list` veya `npm run quality:scan:fast -- --list` kullanın. Çalıştırıcı npm giriş noktasını çağırır, böylece çalışma zamanı (yapılandırıldığı yerde Bun dahil) korunur. Bildiri, bu profillerin dışında ayrı olarak çağrılan takma adları kaydeder ve salt okunur tarama profillerinde bakım komutları yasaktır.

Bu profiller yalnızca statik taramayı kapsar. Ürün testlerini, kapsamı, paketlemeyi, harici kontrolleri veya adayın tam sürüm kabulünü onaylamazlar. İş akışı kabulü bağlantılı `config/quality/admission-policy.json` ve `scripts/quality/admission-verdict.mjs` kullanır. Sürüm gözlemcisi profilleri ayrı kalır; Geçerli çek ve makbuzlarını bağımsız olarak inceleyin. `audit:deps`, mutasyon testi seçimi ve çeviri kontrolleri de dahil olmak üzere gözlemcinin statik komutlarının tamamı `config/quality/release-green-static-profile.json` bildirilir. Yükleyici, npm komutlarını package.json ve modellenmiş CI/Quality bildirimlerine göre doğrular; kabuk belirteçlerini argüman olarak yürütmek yerine sürüklenmeyi reddeder. Gerekli tarayıcı SKIP/INCOMPLETE çıkışı PASS oluşturamıyor. Profil, harici hariç tutmaları kaydeder ve barındırılan kapsamın, test matrislerinin, paket veya dağıtım kanıtlarının yerini almaz. Aşağıdaki düzyazı envanteri bir kapının gerçekten çalıştığının kanıtı değil, bir referanstır.

Komut dosyaları `scripts/check/` (politika kapıları) ve `scripts/quality/` (cırcır motoru) altında yaşar. CI gerçeğinin kaynağı `.github/workflows/ci.yml`.

### Yayınlanmış temel belgelerin durumu

`.github/workflows/i18n-base-health.yml` `main` ve `release/v*` seçilen aktarımların ardından ve manuel gönderim sonrasında belgelerin durumunu gözlemler. Filtreleri belgeleri, kök Markdown'u, `llm.txt`, çeviri state/configuration ve ilgili i18n araçlarını kapsar. Tek `Published base documentation health` işi, barındırılan Ubuntu'yu ve beş dakikalık bir son tarihi kullanır. Salt okunur doğrulama gerçekleştirir ve bağımlılık kurulumu, çeviri veya durum benimsemesi olmadan bir tanılama makbuzu yazar.

`scripts/i18n/check-base-health.mjs` sıfır kaynak karma, eksik hedef, hedef karma, eski çeviri ve bölüm önbellek tutarsızlıkları gerektirir. Aynı zamanda mevcut çekirdek document/locale kapsamını ve kayıtlı kaynağını da doğrular. Geçersiz bağlam, eksik kapsam veya kesintiye uğramış denetleyici `INCOMPLETE` üretir; Onaylanmış sürüklenme `FAIL` üretir. Her ikisi de başarısız bir çıkış durumu döndürür. Makbuz, SHA ödemesine, iş akışına, çalıştırma ve denemeye bağlanır ve `i18n-base-health-<sha>-<run>-<attempt>` olarak saklanır.

Bu, yayınlanan tabanın bağımsız bir gözlemidir. Bir PR veya birleştirme grubu olayı, gerekli bir PR denetimi, bir npm takma adı veya statik tarama profili üyesi eklemez. Temel denetleyici aynı zamanda beş sınıfın tümünü mutlak modda engeller. Sıradan PR hazırlığı kabulden ayrı kalır. Başarılı bir yükleme, başarısız bir sağlık sonucunu PASS dönüştüremez.

Sıradan bir PR `--baseline-evidence` tarafından oluşturulan bir temel raporla `--preflight` kullanır. İngilizce bir kaynağı yalnızca çeviri kaydının tamamı ve gerçek hedef baytların tam olarak bu tabana göre değişmemesi durumunda beklemede bırakabilir. Yeni hedef veya bölüm önbellek tutarsızlıkları hâlâ engel teşkil ediyor ve eksik kanıtlar hazırlığa izin veremiyor. Rapor `preparationPending` ve `mergeReady` ayrı ayrı ortaya koyuyor: Başarılı hazırlık, bekleyen çevirileri birleştirmeye hazır hale getirmiyor. Kabul edilmeden önce oluşturulan adaydaki etkilenen aynaları yenileyin. Güvenilir Mergify kuyruk adayı `merge_group`, şube gönderimleri ve manuel CI çalıştırmaları, `--warn` veya devralınan hata bağışlaması olmadan mutlak denetleyiciyi kullanır. Eksik hedef karmaları ve silinmiş kayıtlı çekirdek dosyalar nedeniyle daraltılmış kapsam, başarılı bir mutlak karar üretemez.

### PR hızlı yolunu (`quality.yml`) serbest bırakın

`.github/workflows/quality.yml` main/release PRsCI tamamlar, `main` baskı yapar, grupları dağıtır ve birleştirir. PRs yol filtreli hızlı kontroller kullanır. Kalıcı olarak devre dışı bırakılan kopya yapı kaldırıldı; gerçek build/package/boot kontrolleri CI kalır. Ünite paketi ve vitest yalnızca CI (`Unit Tests (N/12)` ve `Vitest`) çalışır.

| İş                                               | Kapsam                                                                                                                                                                                                                            | Engelleme            |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API dokümanları referansları ve dokümanları-tümü                                                                                                                                                                   | Evet                 |
| `Fast Quality Gates`                             | Kod PRs; statik kontroller, tip kontrolü, gösterge tablosu tipi kontrolü, etkilenen birim testleri                                                                                                                                | Evet                 |
| `Forgotten sibling tests`                        | Kod PRs; Statik tüketicilere ve aday kardeş testlerine göre değişen modüller; varil ve dinamik içe aktarma yolları, referans verilen izin verilenler listesi istisnalarıyla birlikte tavsiye niteliğinde teşhis olarak raporlanır | **Danışma**          |
| `No new ESLint warnings`                         | Kod PRs; bastırmaya duyarlı tüy bırakmayan koruma                                                                                                                                                                                 | Evet, çatallar dahil |
| `Merge integrity (changelog + generated skills)` | Taslak olmayan PRs; değişiklik günlüğü ve oluşturulan beceri senkronizasyonu                                                                                                                                                      | Evet, çatallar dahil |

#### Unutulan kardeş testleri raporu

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` tavsiye niteliğindeki adımı olarak çalışır ve test etki haritasının arkasında içe aktarma çözümleyicisini yeniden kullanır. Değiştirilen her üretim modülü için, çekme isteği farkında aday testi bulunmadığında deterministik `changed module/symbol -> static consumer -> candidate sibling test` zincirlerini rapor eder. Markdown özeti ve JSON sonucu, herhangi bir engelleme kullanıma sunulmadan önce kalibrasyon için `forgotten-sibling-tests` iş akışı yapısı olarak tutulur.

Namlu yeniden dışa aktarımı ve dinamik içe aktarma işlemleri yalnızca çözümleme tanılamasıdır; asla engelleyici bir bulgu yaratmazlar. İncelenen istisnalar `config/quality/forgotten-sibling-allowlist.json` yayınlanıyor. Her giriş, tüketici ve aday testine isim vermeli, belirli bir gerekçe sunmalı ve bir GitHub sorununu veya çekme isteğini bağlamalıdır. Yanlış biçimlendirilmiş girişler kapatılamaz. İstisnalar, silinmiş bir aday testi veya `.skip`/`.todo` ekleyen bir farkı bastıramaz; iddia zayıflatma ve diğer maskeleme işlemleri, bağımsız olarak bloke eden `check:test-masking` kapısına ait olmaya devam etmektedir.

### İş: `lint`

Her PR `main` kadar çalışır. Başarısızlık durumunda bloklar birleşir.

| Komut Dosyası (`npm run ...`)     | Doğrular                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Engelleme                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js sürümü desteklenen aralıkta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Evet                                    |
| `check:cycles`                    | `src/` + `open-sse/` tamamında döngüsel içe aktarmalar (AST tabanlı, tsconfig `paths` çözümlendi). Herhangi bir döngü mevcut olduğunda çıplak 1'den çıkar ( #15281 bu yana arıza kapalıdır) ve SCCs listeler. `check:cycles:ratchet` ( CI çalıştırdığı şey), sayım `quality-baseline.json` `metrics.cycles` tavanını aştığında bloke eder — şu anda 14, `direction: down`, bu nedenle yalnızca düşebilir (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Evet (cırcır)                           |
| `check:boundary`                  | `open-sse → src` bağlantısı: motordan uygulamaya dosyadan dosyaya benzersiz içe aktarmalar (`scripts/quality/measure-boundary.mjs`; uç listesi, v4 core/module-split iyileştirme biriktirme listesidir). Bare = danışma raporu ( `quality:boundary` ile aynı). `check:boundary:ratchet` ( CI `quality.yml` hızlı kapı mandal döngüsünde de çalıştığı şey), sayım `quality-baseline.json` — ölçülen 771, `direction: down` tohumlanan `metrics.boundaryOpenSseToSrc` tavanını aştığında bloke eder; `--update` yalnızca onu düşürür; PRs baz-göreceli (`--base-ref`, aşağıya bakın)                                                                                                                                                                                                                                                                                                                                                                                                                | Evet (cırcır)                           |
| `check:route-validation:t06`      | Tüm rotalarda Zod şemaları mevcut (Kademe 6 politikası)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Evet                                    |
| `check:any-budget:t11`            | `@ts-expect-error // any` sayısı bütçeyi aşmıyor (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet                                    |
| `check:provider-consistency`      | `providers.ts` her sağlayıcının `providerRegistry.ts` (ve tam tersi, izin verilenler listesinde) eşleşen bir girişi vardır.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Evet                                    |
| `check:model-lifecycle`           | The three hand-maintained routing tables stay consistent with the checked-in lifecycle snapshot (#11503): `FITNESS_TABLE` (`taskFitness.ts`) scores no retired id that `REGISTRY` can route; her `BUILT_IN_ALIASES` hedefi `REGISTRY` mevcuttur ve kullanımdan kaldırılan kimlik anlık görüntüsünde yoktur; hala `REGISTRY` bulunan her emekli kimlik `allowedRetiredInCatalog` iletilir veya listelenir; ve bu anlık görüntüde hiçbir `DEFAULT_DEGRADATION_MAP` kaynağı veya hedefi kullanımdan kaldırılmış görünmüyor. Bu, bir modelin halihazırda canlı bir yukarı akış tarafından sunulduğunu kanıtlamaz. Çevrimdışı —, `npm run quality:refresh-model-lifecycle` (ağ; CI bağlı değil) ile elle yenilenen `config/quality/model-lifecycle.json` ile karşılaştırılır. `allowedRetiredInCatalog` bir yanma mandalıdır: yalnızca izleme sorunu olan bir giriş ekleyin.                                                                                                                           | Evet                                    |
| `check:fetch-targets`             | İstemci tarafı `src/` her `fetch("/api/...")` gerçek bir `route.ts` çözümlenir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Evet                                    |
| `check:deps`                      | Depodaki her `package.json` tüm `npm install` -able depoları `dependency-allowlist.json`; yeni sabitlenmemiş veya eğimli paketler işaretlendi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Evet                                    |
| `audit:deps`                      | Beş bağımsız kilit dosyasının tamamının npm denetimi (kök, Electron, OpenCode eklentileri v1/v2 ve sağlayıcı). Kritik tavsiyeler bloğu; yüksek uyarılar görünür uyarılar olmaya devam ediyor. Missing/failed denetimleri INCOMPLETE ve bloktur; kapsam başına kilit karmaları ve raporlar korunur.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet                                    |
| `check:lockfile`                  | `package-lock.json` bütünlüğü — https kaydı, bütünlük karmaları, ana bilgisayar geçersiz kılmaları yok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Evet                                    |
| `check:licenses`                  | Üretim bağımlılıkları için SPDX lisansı izin verilenler listesi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Evet                                    |
| `check:tracked-artifacts`         | Derleme yapıtları/taahhütlü `node_modules` sembolik bağlantıları yok (ayrıca husky ön işlemede çalışır; ön gönderim kasıtlı olarak hafiftir — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Evet                                    |
| `check:ai-attribution`            | PR taahhütlerinde, başlıkta veya gövdede AI/bot `Co-Authored-By` fragmanı veya AI oluşturma altbilgisi yok — Sert Kuralı #16 ( `quality.yml` PR geçiş döngüsünde → `release/**` —, olay yükünü okur, PRs — işlem yapılmaz ve PR→ `main` için `ci.yml` tiftiğinde yalnızca PR adımı; ayrıca güçlü `commit-msg` kancası; insan ortak yazarlara izin verilir; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | Her Vitest hariç tutma işlemi bir izleme sorununu adlandırır ve `config/quality/vitest-exclusions.json` (#13204) görünür                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Evet                                    |
| `check:file-size`                 | Kaynak dosyaları ( `src/` `.ts`/`.tsx`, `open-sse/`, `electron/`, `bin/`) `cap` içinde kalır ve test dosyaları (`*.test.ts(x)`) `testCap` içinde kalır; `file-size-baseline.json` (`frozen` / `testFrozen`) dondurulmuş dosyalar kayıtlı boyutlarını aşmamalıdır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Evet                                    |
| `check:error-helper`              | executors/handlers hata yanıtları `buildErrorBody()` / `sanitizeErrorMessage()` (Zor Kural #12) kullanır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Evet                                    |
| `check:migration-numbering`       | Geçiş SQL dosyaları sıralı olarak numaralandırılmıştır; boşluk veya kopya yoktur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Evet                                    |
| `check:public-creds`              | `publicCreds.ts` dışında gerçek OAuth `client_id`/`client_secret` veya Firebase Web anahtarı yok (Zor Kural #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Evet                                    |
| `check:db-rules`                  | `src/lib/db/` modülleri dışında ham SQL yok; `localDb.ts` varil ithalatı yok (Zor Kurallar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Evet                                    |
| `check:known-symbols`             | Dağıtım tablolarında kayıtlı sağlayıcı yürütücüleri, yönlendirme stratejileri ve çevirmenler, — diskindeki dosyalarla eşleşiyor, artık veya bildirilmemiş semboller yok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Evet                                    |
| `check:route-guard-membership`    | Bir alt süreç oluşturan her rota `isLocalOnlyPath()` (Zor Kurallar #15/#17) tarafından sınıflandırılır.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Evet                                    |
| `check:test-discovery`            | Depodaki her `*.test.ts` / `*.spec.ts` dosyası en az bir test çalıştırıcısı tarafından toplanır (cırcır: `test-discovery-baseline.json` yetim listesi yalnızca küçültülebilir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Evet                                    |
| `check:test-tla-order`            | `tests/unit` altındaki hiçbir `node:test` dosyası bir testi kaydetmez, üst düzey bir `await` ulaşır ve ardından daha fazlasını kaydeder (#18045; mandal: `test-tla-order-allowlist.json` yalnızca küçültülebilir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Evet                                    |
| `check:agent-skills-sync`         | Oluşturulan aracı becerileri yapıları kaynak kataloglarıyla eşleşiyor (sapma yok)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Sağlayıcı logos/assets kayıtlı bir menşe girişi taşır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON yapılandırma dosyaları depolanma kurallarını ayrıştırır ve karşılar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | Hatasız TypeScript derlemesi (yalnızca tavsiye niteliğinde uyarılar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Evet                                    |
| `typecheck:noimplicit:core`       | Sıkı `noImplicitAny` — ileriye dönük; önceden var olan birçok arama sitesinin hâlâ ek açıklamalara ihtiyacı var                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Danışma** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` kapsamı `src/app/(dashboard)/**` (#7033) — `typecheck:core` seçilmiş 27 dosyalık izin verilenler listesi herhangi bir kontrol paneli TSX içermez ve `next build` de hiçbir zaman tür kontrolü yapmaz (`next.config.mjs` `ignoreBuildErrors: true` ayarlar), dolayısıyla oradaki yetim tanımlayıcı regresyonları (#6625/#6909) CI için görünmezdi. Dondurulmuş per-file/per-TS-code sayım temel çizgisine karşı farklar (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` ile aynı eski uygulama modeli) — yalnızca temel sayım ötesindeki NEW hataları geçidi başarısız kılar; Önceden var olan bir hata düzeltildiğinde `--update` ile mandalı azaltın.                                                                                                                                                                                                                                                                                                           | Evet                                    |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) üzerinden tüm uygulama üretim türü kontrolü, `typecheck:core` 27 dosyalık izin verilenler listesi ve kontrol paneli geçidini kapsamaz. `config/quality/build-typecheck-baseline.json` karşı farklar; yeni veya yükseltilmiş (dosya, kod) başına sayım başarısız olursa, daha düşük bir sayım sizden hızlanma yapmanızı ister. `--update` `--force-regressions` geçilmediği sürece çalıştırma yeni veya yükseltilmiş bir çift içerdiği sürece reddeder ve `--force-nocheck` geçilmediği sürece yeni susturulmuş bir dosyayı reddeder, dolayısıyla taban çizgisini yeşile dönecek şekilde genişletmek ve kalıcı bir sessizlik vermek iki ayrı kasıtlı eylemdir. Çıplak `--force` reddedilir. Ayrıca `@ts-nocheck` derleme kapsamını `config/quality/ts-nocheck-baseline.json` karşı tarar, çünkü onu kullanan bir dosya hiçbir tanılama bildirmez ve aksi takdirde her kapı tarafından görünmez olur. | Evet                                    |

#### İki typecheck programı farklı yanıt veriyor

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) ve `check:build-typecheck`, farklı seçenekler altında farklı programlar derler ve aynı dosyanın birinde temiz, diğerinde hatalarla dolu olabilir.

`tsconfig.build.json` `"strict": false` ayarlar, dolayısıyla `noImplicitAny` kapalıdır. Çekirdek yapılandırma, daha katı seçeneklerle özel olarak hazırlanmış 27 dosyalık bir izin verilenler listesi derler ve her girişin içe aktarma grafiğini takip eder, böylece derleme programında hiçbir zaman görünmeyen dosyalar yine orada kontrol edilir.

Bir dosyanın yazılıp yazılmadığını değerlendirirken sonuç önemlidir:**`check:build-typecheck` kapsamında sıfır teşhis, sıfır anlamına gelmez** . `@ts-nocheck` 26 dosyadan çıkarmak, derleme programında bunlardan 23'ünün temiz olduğunu gösterdi; Bunlardan 16'sı yaklaşık 120 örtülü olarak ortaya çıktı - kesin olanda herhangi bir hata. Bir dosyayı temiz olarak çağırmadan önce her ikisini de kontrol edin.

### İş: `quality-gate`

`test-coverage` sonra çalışır. Başarısızlık durumunda bloklar birleşir.

| Senaryo                      | Doğrular                                                                                                                                                                      | Engelleme                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | `quality-metrics.json` yayar (ESLint uyarı sayısı, birleştirilmiş parça raporunun kapsamı)                                                                                    | Evet (cırcırın yukarı akışı) |
| `quality:ratchet`            | `quality-baseline.json` her ölçüm gerilemedi (ESLint uyarıları ≤ temeli; kapsam ≥ temeli)                                                                                     | Evet                         |
| `check:duplication`          | Kod çoğaltma (jscpd@4) `quality-baseline.json` temel çizgiyi aşmıyor                                                                                                          | Evet                         |
| `check:complexity`           | Dosya düzeyinde siklomatik karmaşıklık sınırı aşmaz (çekirdek ESLint `complexity` + `max-lines-per-function`)                                                                 | Evet                         |
| `check:cognitive-complexity` | Bilişsel karmaşıklık mandalı (`eslint-plugin-sonarjs`) — ayrı ESLint geçişi; CI her ikisini de tek `check:complexity-ratchets` adımı olarak birleştirilmiş şekilde çalıştırır | Evet                         |
| `check:dead-code`            | Kullanılmayan dışa aktarmalar/dosyalar mandalı (knip), taban çizgisine göre gerilemez                                                                                         | Evet                         |
| `check:compression-budget`   | Sıkıştırma karşılaştırmalı bütçe — motor başına jeton tasarruf tabanları gerilememelidir                                                                                      | Evet                         |
| `check:type-coverage`        | Yüzde tipi mandal (`type-coverage`) gerilemez; `typecheck:noimplicit:core` büyük ölçüde kapsıyor                                                                              | Evet                         |

### İşler: `codeql-scan` ve `codeql-admission`

`codeql-scan` tüm yapılandırılmış analiz kategorilerini üretir. Bu iş başarılı olduktan sonra `codeql-admission`, tam yüklemelerini ve aday uyarı mandalını doğrular. Yalnızca doküman adayları da dahil olmak üzere her ikisi de `Gate / CI` gerekli bağımlılıklarıdır. İdari aktivasyon ve kanarya gereklilikleri aşağıda "CodeQL mandalı" başlığı altında açıklanmıştır.

| Senaryo                | Doğrular                                                                                                                                                                                | Engelleme |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:codeql-ratchet` | Aday ref/SHA ve yapılandırılmış tüm analiz kategorileri, uyarı tetiklenmeden önce güncel olmalıdır; eksik kanıt blokları. Küresel envanter ayrı kalır — bkz. aşağıdaki "CodeQL mandalı" | Evet      |

### İş: `quality-extended`

İş, uygun adayları engeller. Paket boyutu, gizli bulgular, güvenlik açığı bulguları, iş akışı bulguları ve OpenAPI değişiklikleri gerekli mandallarla kontrol edilir. Döngüsel bağımlılık teşhisi tavsiye niteliğinde olmaya devam ediyor. Tarayıcı kurulumu gereklidir: `scripts/ci/install-quality-scanners.sh` sabitlenmiş sürümleri sağlar ve kurulum hatalarını yayar. Eksik araçlar, geçersiz raporlar veya eksik temeller, gerekli tarayıcı kapısı INCOMPLETE ayrılır.

| Senaryo                  | Doğrular                                                                                                                                                                                                                     | Engelleme                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:circular-deps`    | Döngüsel bağımlılık yok (dpdm)                                                                                                                                                                                               | **Danışma**                                 |
| `check:bundle-size`      | Paket boyutu sınırı aşmaz; kullanılamayan bir ölçüm başarısız olur                                                                                                                                                           | **--ratchet ile engelleme**                 |
| `check:secrets`          | Gitleak'in bulguları gerilemiyor; gerekli taramalar eksik tools/source/baseline, başarısız taramaları ve geçersiz raporları reddeder                                                                                         | **--ratchet ile engelleme**                 |
| `check:vuln-ratchet`     | Bağımlılık güvenlik açıkları gerilemez; gerekli taramalar eksik araçları, geçersiz raporları veya eksik temel çizgileri reddeder                                                                                             | **--ratchet ile engelleme**                 |
| `check:workflows`        | İş akışı tüyü (actionlint + zizmor); missing/broken tarayıcıları, geçersiz raporlar veya eksik mandal temel çizgisi INCOMPLETE olarak başarısız olur. Geçerli bulgular seçilen strict/advisory/ratchet politikasına uygundur | Yürütme gerekli; CI zizmor mandal engelleme |
| `check:openapi-breaking` | Sabitlenmiş olay taahhütlerine karşı genel API sözleşmesi (PR birleştirme tabanı, önce itme, birleştirme grubu tabanı; scheduled/manual ilk üst öğeyi kontrol edin); gerekli ölçüm başarısız olursa kapatılır                | **--ratchet ile engelleme**                 |

### İş: `docs-sync-strict`

`main` veya `release/**` yapılan çekme istekleri için bu iş yalnızca belge veya kod değişikliği olarak sınıflandırılan taslak olmayan (veya güvenilen kuyruk) adaylar için çalıştırılır. Ayrıca PR dışı CI etkinliklerinde de çalışır; bu iş akışının push tetikleyicisi `main` değil yalnızca `release/**` kapsar. Sıfırın dışında çıkan bir adım işi engeller; Yalnızca rapora ilişkin bulgular ve aşağıdaki belgelenen muafiyetler bunu sağlamaz.

| Senaryo                        | Doğrular                                                                                                                                                                                                                                                                                                                                                                                                                                         | Engelleme                                                                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Aşağıdaki 7 alt geçidi sırayla çalıştıran meta geçit                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                                                                                                                                                       |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG sürüm tutarlılığı, tam `llm.txt` aynaları, çevrilmiş CHANGELOG section/size değişmezleri ve geçersiz kılınan kopya belgelerin yokluğu                                                                                                                                                                                                                                                                                  | Evet                                                                                                                                                                       |
| ↳ `check:docs-frontmatter`     | Derlenmiş belge sayfaları geçerli ön konu başlıklarını taşır                                                                                                                                                                                                                                                                                                                                                                                     | Evet                                                                                                                                                                       |
| ↳ `check:docs-counts`          | Yüksek güvenirliğe sahip sayım değişmezleri katıdır; buluşsal dosya sayımı kontrolleri yalnızca komut dosyası `--strict` almadığı sürece uyarı verir ( CI meta geçidi bunu geçmez)                                                                                                                                                                                                                                                               | Sıkı katman engelleme; yumuşak katman danışmanlığı                                                                                                                         |
| ↳ `check:env-doc-sync`         | Kaynak env okumaları, `.env.example` ve `docs/reference/ENVIRONMENT.md` açıkça yoksayma, yalnızca belge ve yalnızca env izin verilenler listelerinden sonra aynı fikirde                                                                                                                                                                                                                                                                         | Evet, belgelenen izin verilenler listelerinin dışında                                                                                                                      |
| ↳ `check:deprecated-versions`  | Yok sayılan dokümanlar hariç, güvenli geçmiş bağlamların dışındaki potansiyel eski sürümleri ve eski güncelleme tarihlerini bildirir                                                                                                                                                                                                                                                                                                             | Mevcut CI kablolamasında tavsiye (`--strict` geçilmedi)                                                                                                                    |
| ↳ `check:doc-links`            | Dokümanlardaki dahili işaretleme bağlantıları gerçek dosyalara çözümlenir (`[text]`/`(path)` formu)                                                                                                                                                                                                                                                                                                                                              | Evet                                                                                                                                                                       |
| ↳ `check:fabricated-docs`      | Dokümanlarda belirtilen rotalar, env değişkenleri, CLI komutları, kanca adları ve dosya yolları kod tabanında mevcuttur. `--strict` aracılığıyla sert geçit; bayraksız geçici başarısızlık.                                                                                                                                                                                                                                                      | Evet ( CI `--strict` aracılığıyla)                                                                                                                                         |
| `check:cli-i18n`               | Kullanılan CLI `t()` anahtarları `en` mevcuttur; `pt-BR` her üst düzey bölümü korur; `zh-CN` ve `zh-TW` `en` tüm anahtarlarını içerir                                                                                                                                                                                                                                                                                                            | Evet                                                                                                                                                                       |
| `check:openapi-coverage`       | OpenAPI spesifikasyonu en azından gerçek rotaların cırcırlı bir katını kapsar                                                                                                                                                                                                                                                                                                                                                                    | Evet                                                                                                                                                                       |
| `check:openapi-security-tiers` | Bildirilen `x-loopback-only`/`x-always-protected` ek açıklamaları `routeGuard.ts` tarafından desteklenmelidir; ayrıştırıcı ve iletme uyumsuzlukları bloğu. Yalnızca yerel önekler altında eksik `x-loopback-only` için ters kontrol uyarıda bulunur ve yalnızca desen rotaları bu ters geçişin dışında bırakılır.                                                                                                                                | Parser/forward engellemeyi kontrol eder; ters kontrol tavsiyesi                                                                                                            |
| `check:openapi-routes`         | `openapi.yaml` her `/api...` yolu, gerekçelendirilmiş `KNOWN_STALE_SPEC` izin verilenler listesinden sonra parametreye duyarsız bir şekilde gerçek bir rotaya çözümlenir; eski izin verilenler listesi girişleri de başarısız oluyor                                                                                                                                                                                                             | Evet                                                                                                                                                                       |
| `check:docs-symbols`           | Kurallı ayna olmayan belgelerdeki dahili `/api/...` URL referansları, gerçek bir rotaya veya rota ailesine çözümlenir; proxy/upstream/placeholder/file referansları ve gerekçeli `KNOWN_STALE_DOC_REFS` girişleri hariç tutulur ve eski izin verilenler listesi girişleri başarısız olur                                                                                                                                                         | Evet                                                                                                                                                                       |
| `i18n translation drift`       | Mutlak kabul, sıfır kaynak, eksik hedef, hedef karma, eski çeviri ve bölüm önbellek tutarsızlıkları gerektirir. Sıradan PR hazırlığı, tam olarak devralınan kanıtları veya değişmemiş tam durum ve hedef baytlarla yalnızca İngilizce olarak bekleyen bir değişikliği koruyabilir; raporu ayrıca birleşmeye hazır olduğunu beyan eder. Eksik hedef karmaları ve eksik temel kanıt bloğu. Eski bölüm önbelleğinin bulunmaması bir arıza değildir. | Beş sınıfın tamamı queue/base kabulü engelliyor; sıradan hazırlık, yalnızca kanıtlanmış, miras alınan veya yalnızca İngilizce olarak beklemede olan çalışmalara izin verir |

`docs/diagrams/` kapsamında on iki README SVGs oluşturulur (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` hepsini yeniden oluşturur). Her birinin, taahhüt edilen dosya eski olduğunda başarısız olan bir bayt karşılaştırma birim testi (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) vardır ve `check:docs-counts` `<text>` düğümlerinden — kanonik sayıları okur, bu nedenle anahat belirleme adımı dosyadaki her özetlenen dizeyi görünmez `<text>` olarak tutar. SVG kanonik sayılar kontrolü, `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) listelenen dosyaları okur: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg` ve ayrıca `public/images/tier-flow-dark.svg` ve `tier-flow-light.svg`; Sonsuza kadar ücretsiz, katalog girişi, yinelenen havuz ve puanlama faktörleri iddialarında ayrıca `promise-pillars.svg`, `free-tier-budget.svg` ve `strategies-grid.svg` okunur. `free-tier-budget.svg` rakamlarını canlı katalog yükleyicisinden alır; bu nedenle, `FREE_MODEL_BUDGETS` veya sağlayıcının görünen adına yapılan bir değişiklik, o dosya yeniden oluşturulana kadar CI kırmızı renkte gösterir.

### İş: `i18n-ui-coverage`

| Senaryo                              | Doğrular                                                                                                                                                                                              | Engelleme     |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (satır içi) | UI i18n anahtar kapsamı ≥ %65'tir                                                                                                                                                                     | Evet          |
| `check-ui-value-drift` (satır içi)   | Yeniden yazılmış bir İngilizce **değer** geride eski bir çeviri bırakmaz                                                                                                                              | Evet          |
| `check-new-key-coverage` (satır içi) | A **yeni** İngilizce anahtar her yerel ayarda çevrilir — bir `__MISSING__:` işaretçisi reddedilir                                                                                                     | Evet          |
| `check-translation-ratio`            | Yerel ayar başına gerçek çeviri oranı (İngilizceyle aynı / yer tutucu / izin verilenler listesinin dışındaki eksik yapraklar) `config/quality/i18n-translation-baseline.json` + bolluğunu aşmamalıdır | **Engelleme** |

`fetch-depth: 0` — ihtiyaç duyuyor, değer kayması kapısı `en.json` birleştirme tabanına göre farklılaştırıyor.

#### `check-ui-value-drift` — eski çeviri kapısı

Diğer kapıların yapısal olarak göremediği gerilemeyi yakalar: İngilizce bir değer yeniden yazılır ve önceki İngilizceden türetilen çeviriler geride kalır, böylece İngilizce olmayan kullanıcılar güvenle ifade edilen, artık yanlış olan kopyayı okumaya devam eder.

Bu gerçekten gönderildi. Antigravity oturum açma yardımcısı (#5203) geldiğinde `oauthModal.googleOAuthWarning` yeniden yazıldı;**43 yerel ayardan 39'u** operatörlere " URL tamamını kopyalayıp aşağıya yapıştırmalarını" söyleyen bir metin tuttu, — bu sağlayıcı için tamamlanamayan bir akıştı. #8463 kadar fark edilmedi çünkü:

- `sync-ui-keys` yalnızca şu anahtarları doldurur:**mevcut olmayan** , asla öyle olanları **bayat** ;
- `check-ui-keys-coverage` anahtar _varlığını_ sayar, dolayısıyla eski bir çeviri kapsandığı gibi puanlanır;
- `check-translation-drift` `docs/i18n/<locale>/**.md` dokümantasyon aynalarını — izler, asla `src/i18n/messages/*.json` okumaz. 2026-09 yeniden senkronizasyonundan bu yana `docs-sync-strict` işinde engelleme: → `npm run i18n:run -- --files=<doc>` temel belgesini düzenleyin (bölüm düzeyinde, ucuz).

**Farkları tanıyan, temel destekli değil.** Birleştirme tabanındaki `en.json` çalışma ağacıyla karşılaştırır; İngilizce değeri değişen her anahtar için, hâlâ dokunulmamış bir çeviriye sahip olan herhangi bir yerel ayar eskidir. Bu kasıtlı olarak **mevcut borcun dondurulması** — a diff, uzun süredir devam eden bir çevirinin hangi eski İngilizceden geldiğini ortaya çıkaramaz, dolayısıyla kapı yalnızca mevcut değişikliğin neye dokunduğunu değerlendirir. Alternatif (anahtar başına karma taban çizgisi), her i18n PR çalkalanan, mevcut en büyük taban çizgisi olan 3 × olan ~ 600 KB ile oluşturulmuş bir dosyaya mal olacaktır.

Bunu tatmin etmenin iki yolu:

1. etkilenen çevirileri güncelleyin veya
2. bunları `__MISSING__:<new english>` — olarak ayarlayın ve ardından çeviri için düzeltilmiş İngilizceyi (`src/i18n/request.ts::deepMergeFallback`, #7258) ve anahtar kuyrukları sunar.

Eğer dize **Anlam** değişti, tercih et **anahtarı yeniden adlandırma** : yeni bir anahtar eski bir çeviriyi devralamaz. #8463 kullandığı model budur.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Değer kayması ve yeni anahtar kapıları, `scripts/i18n/resolve-ui-diff-base.mjs` değişmez bir karşılaştırmayı paylaşıyor. İş akışı her iki kontrole de aynı tabanı, taban ucunu ve aday SHAs aktarır. PR/base-retarget, push ve birleştirme grubu çalıştırmaları olay bağlamlarını kullanır. Bir aday şubenin gönderilmesi, onun tam olarak açık PR veya açık `i18n_base_sha` girişini gerektirir. `main` veya `release/vX.Y.Z` bu girdi olmadan gönderilmesi veya programlı gözlemi, son işlemi ilk üst öğesiyle karşılaştırır; bu, devralınan çeviri borcunun tamamının denetimi değildir. Yerel çağrı, örneğin yukarıdaki `BASE_REF` komutu gibi açık bir karşılaştırma tabanı gerektirir.

Eksik veya belirsiz karşılaştırma bağlamı, okunamayan veya geçersiz bir gerekli katalog ve değiştirilmiş bir aday, çıkış koduyla birlikte `INCOMPLETE` üretiyor **2** uyarı modu dahil. Katalog okumaları `scripts/i18n/read-ui-catalog.mjs` kullanır; okuma hataları boş nesnelerle değiştirilmez. Ne kullanılamayan bir temel ne de eksik bir girdi PASS oluşturmaz.

### İş: `i18n`

Tam i18n doğrulama matrisi (yerel ayar başına bir iş). İşin tamamı tavsiye niteliğindedir.

| Senaryo                         | Doğrular                             | Engelleme                                         |
| ------------------------------- | ------------------------------------ | ------------------------------------------------- |
| `validate_translation.py quick` | Yerel ayara göre çevirinin bütünlüğü | **Danışma** (Tüm işte `continue-on-error: true` ) |

### İş: `pr-test-policy`

Yalnızca çekme istekleriyle çalışır.

| Senaryo                | Doğrular                                                                                                                                                | Engelleme |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` veya `bin/` üretim kodunu değiştiren PRs, testleri içermeli veya güncellemelidir (Zor Kural #8)                        | Evet      |
| `check:test-masking`   | Değiştirilen test dosyaları net onay sayısını azaltmaz veya `assert.ok(true)` totolojilerini eklemez                                                    | Evet      |
| `check:pr-evidence`    | PR gövdesi, değişiklik için test/VPS kanıtlarından bahsediyor ( PR düzyazısı — kırılgan hale getirerek Sert Kural #18 mekanize ediyor, bkz. İş Listesi) | Evet      |

### İş: `test-vitest`

`changes` sınıflandırma işine ihtiyacı var. Geçerli matris parçaları başarısızlık durumunda birleştirmeyi engeller.

| Süit             | Doğrular                                                    | Engelleme                                                                                                                             |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP sunucusu (110 araç), autoCombo, önbellek — hızlı koşucu | Evet                                                                                                                                  |
| `test:vitest:ui` | UI bileşen testleri — vitest koşucusu                       | **Engelleme** — önceden var olan hataları `vitest.config.ts` açıkça hariç tutulmuştur; yeni başarısızlıklar işi başarısızlığa uğratır |

### Gecelik iş akışları (planlanmış, tavsiye niteliğinde)

Bunlar hiçbir zaman PRs değil, bir cron programında (ve `workflow_dispatch`) çalışır. Hepsi tavsiye niteliğindedir.

| İş akışı               | Doğrular                                                                                                                                                                    | Engelleme   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | rastgele tohum + yüksek çalıştırma sayısıyla hızlı kontrol özelliği testleri                                                                                                | **Danışma** |
| `nightly-resilience`   | yığın büyüme kapısı, kaos hata enjeksiyonu, k6 load/soak                                                                                                                    | **Danışma** |
| `nightly-llm-security` | Promptfoo enjeksiyon koruması (blok modu) + garak araştırmaları (sağlayıcı sırrı olmadan atlanır)                                                                           | **Danışma** |
| `nightly-schemathesis` | `docs/openapi.yaml` kullanarak canlı bir OmniRoute karşı OpenAPI sözleşmesi bulanıklaştırma (şematez) — spesifikasyon ihlallerini/işlenmeyen 500'leri yüzeyler (Fase 8 B.4) | **Danışma** |
| `nightly-mutation`     | Hızlı birim şeridi üzerinde Stryker mutasyon testi puanı — hayatta kalan mutantların yüzey zayıflığını öne sürüyor                                                          | **Danışma** |
| `nightly-compat`       | Desteklenen `engines.node` aralıklarında düğüm motoru uyumluluk matrisi                                                                                                     | **Danışma** |

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
