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

CI ve Quality Gates iş akışlarının her biri istikrarlı bir karar verir: `Gate / CI` ve `Gate / Quality`. Sürümlendirilmiş kabul politikaları, her yukarı yönlü işi gerekli veya tavsiye niteliğinde olarak sıralıyor. Geçerli bir gerekli iş başarılı olmalıdır: eksik, iptal edilmiş, atlanmış, beklemede ve bilinmeyen sonuçlar PASS oluşturamaz. Geçerli bir yalnızca belge veya yalnızca katalog sınıflandırması, kod şeridini uygulanamaz hale getirebilir; PR taslağı kabul edilen bir aday değildir. Bir `hotfix` etiketi delillerden feragat etmez.

Her iki iş akışı da PRs main/release dallarına, `main` gönderimleri, manuel gönderimi ve grup birleştirme olaylarını kapsar. Tüm seçimi itin, dağıtın ve birleştirme grubunu çalıştırın. `release/**` yapılan itmeler onları başlatmıyor (2026-10-18): her değişiklik zaten matrisi kendi PR çalıştırıyordu ve birleştirilmiş kombinasyon Release-Green'in işi (`docs/ops/RUNNER_BOX.md` → Barındırılan şerit). Çatallar ve birleştirme grupları, aksi takdirde kendi kendine barındırılan çalıştırıcıları seçen işler için barındırılan çalıştırıcıları kullanır; Yeterli barındırılan kapasitenin kullanıma sunulmadan önce doğrulanması gerekir.

Sıradan bir PR hızlı seçimi çalıştırır. Kabul ilkesinin `full-code` ve `full-code-e2e` şeritleri (E2E, entegrasyon, paket yapısı, Electron duman, Bun SQLite, ekosistem ve protokol istemcileri) yalnızca Birleştirme kuyruğu taslağında veya tam çalıştırmada çalışır: `gh workflow run ci.yml --ref <branch>`.

Her JSON makbuzu, teslim alınan SHA, iş akışı çalıştırmasını ve girişimini tanımlar. CLI checkout/event SHA uyumsuzluğunu reddeder. İş akışı testleri, politika üyeliğini karar işinin `needs` listesine bağlar, böylece yeni veya kaldırılmış bir şerit sessizce ortadan kaybolamaz. Makbuzlar, yayın, dağıtım veya mevcut bir tavsiye niteliğindeki tarayıcının dahili içeriğini değil, kendi iş akışlarını kapsar. Şube kurallarında her iki çek adının da etkinleştirilmesi ayrı bir yönetim değişikliğidir; bu işlerin eklenmesi şubeyi korumaz.

### Sırayı birleştir

`queue` etiketi Birleştirme kuyruğuna (`.mergify.yml`) bir PR gönderir. Mergify, bir `mergify/merge-queue/` dalında bir PR taslağı açar, CI tüm seçimi orada çalıştırır ve orijinal PR `Gate / CI`, `Gate / Quality` ve `Merge integrity (changelog + generated skills)` geçtiğinde birleşir.

Mergify, sıra özetini taslağın açıklamasına yazar ve diğer uygulamalar da bunu düzenleyebilir. Böyle bir taslaktaki `pull_request` `edited` olayı kendi eşzamanlılık grubunu (`-queue-edit-<run_id>`) alır, böylece taslağın gerçek çalışmasını iptal edemez ve geçidi ve matrisi atlar. Yalnızca `Merge integrity` hala çalışıyor. Atlanan geçit işi farklı bir kontrol adı taşır çünkü Mergify atlanan bir `Gate / CI` başarısız bir kontrol olarak okur ve PR kuyruktan çıkarır.

Kuyruktan çıkarma işleminden sonra push her zaman PR yeniden kuyruğa almaz. Bunun üzerine `@mergifyio queue` yorumlayın.

### Statik tarama envanteri

Sürümlendirilmiş npm-alias envanteri ve statik tarama üyeliği `config/quality/gate-manifest.json` yayınlanıyor. Komut dosyası adlarını ve tam komutları `package.json` göre doğrulamak için `npm run check:gate-manifest` çalıştırın; eklemeler, çıkarmalar ve komut kayması CI hem yerel kancada hem de değişiklik sınıflandırma işlerinde başarısız olur. Takma ad bir iş akışı işi, matris örneği veya test durumu değildir: bu sayımlar birbirinin yerine kullanılabilir olarak sunulmamalıdır.

Seçilen takma adları çalıştırmadan incelemek için `npm run quality:scan -- --list` veya `npm run quality:scan:fast -- --list` kullanın. Koşucu npm giriş noktasını çağırır, böylece çalışma zamanı (yapılandırılan yerde Bun dahil) korunur. Bildirim, bu profillerin dışında ayrı olarak çağrılan takma adları kaydeder ve salt okunur tarama profillerinde bakım komutları yasaktır.

Bu profiller yalnızca statik taramayı kapsar. Ürün testlerini, kapsamı, paketlemeyi, harici kontrolleri veya adayın tam sürüm kabulünü onaylamazlar. İş akışı kabulü bağlantılı `config/quality/admission-policy.json` ve `scripts/quality/admission-verdict.mjs` kullanır. Sürüm gözlemcisi profilleri ayrı kalır; Geçerli çek ve makbuzlarını bağımsız olarak inceleyin. Aşağıdaki düzyazı envanteri bir kapının gerçekten çalıştığının kanıtı değil, bir referanstır.

Komut dosyaları `scripts/check/` (politika kapıları) ve `scripts/quality/` (cırcır motoru) altında yaşar. Doğruluğun CI kaynağı `.github/workflows/ci.yml`.

### PR hızlı yolunu (`quality.yml`) serbest bırakın

`.github/workflows/quality.yml` main/release PRs üzerinde CI tamamlar, `main` iter, grupları gönderir ve birleştirir. PRs yol filtreli hızlı kontrolleri kullanır. Kalıcı olarak devre dışı bırakılan kopya yapı kaldırıldı; gerçek build/package/boot kontrolleri CI kalır. Birim paketi ve vitest yalnızca CI (`Unit Tests (N/8)` ve `Vitest`) cinsinden çalışır.

| İş                                               | Kapsam                                                                                                                                            | Engelleme            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API dokümanlar referanslar ve dokümanlar-tümü                                                                                      | Evet                 |
| `Fast Quality Gates`                             | Kod PRs; statik kontroller, tip kontrolü, kontrol paneli tipi kontrolü, etkilenen birim testleri, unutulmuş kardeş testleri (tavsiye niteliğinde) |
| `No new ESLint warnings`                         | Kod PRs; bastırmaya duyarlı tüy bırakmayan koruma                                                                                                 | Evet, çatallar dahil |
| `Merge integrity (changelog + generated skills)` | Taslak olmayan PRs; değişiklik günlüğü ve oluşturulan beceri senkronizasyonu                                                                      | Evet, çatallar dahil |

#### Unutulan kardeş testleri raporu

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` tavsiye niteliğindeki bir adımı olarak çalışır ve test etki haritasının arkasında içe aktarma çözümleyicisini yeniden kullanır. Değiştirilen her üretim modülü için, çekme isteği farkında aday testi bulunmadığında deterministik `changed module/symbol -> static consumer -> candidate sibling test` zincirlerini rapor eder. Markdown özeti ve JSON sonucu, herhangi bir engelleme kullanıma sunulmadan önce kalibrasyon için `forgotten-sibling-tests` iş akışı yapısı olarak korunur.

Namlu yeniden dışa aktarımı ve dinamik içe aktarma işlemleri yalnızca çözümleme tanılamasıdır; asla engelleyici bir bulgu yaratmazlar. İncelenen istisnalar `config/quality/forgotten-sibling-allowlist.json` yayınlanıyor. Her giriş, tüketici ve aday testine isim vermeli, belirli bir gerekçe sunmalı ve bir GitHub sorununu veya çekme isteğini bağlamalıdır. Yanlış biçimlendirilmiş girişler kapatılamaz. İstisnalar, silinmiş bir aday testi veya `.skip`/`.todo` ekleyen bir farkı bastıramaz; iddia zayıflatma ve diğer maskeleme işlemleri bağımsız olarak bloke eden `check:test-masking` kapısına ait olmaya devam etmektedir.

### İş: `lint`

Her PR `main` kadar çalışır. Başarısızlık durumunda bloklar birleşir.

| Komut dosyası (`npm run ...`)     | Doğrular                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Engelleme                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js sürümü desteklenen aralıkta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Evet                                    |
| `check:cycles`                    | `src/` + `open-sse/` tamamında döngüsel içe aktarmalar (AST tabanlı, tsconfig `paths` çözümlendi). Herhangi bir döngü mevcut olduğunda Bare 1'den çıkar ( #15281 bu yana arıza kapalıdır) ve SCCs listeler. `check:cycles:ratchet` ( CI çalıştırdığı şey), sayım şu anda `quality-baseline.json` — 14 olan `metrics.cycles` tavanını aştığında bloke olur, `direction: down`, bu nedenle yalnızca düşebilir (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet (cırcır)                           |
| `check:boundary`                  | `open-sse → src` birleştirme: motordan uygulamaya dosyadan dosyaya benzersiz içe aktarmalar (`scripts/quality/measure-boundary.mjs`; uç listesi, v4 core/module-split iyileştirme biriktirme listesidir). Bare = danışma raporu ( `quality:boundary` ile aynı). `check:boundary:ratchet` ( CI, aynı zamanda `quality.yml` hızlı kapı mandal döngüsünde de çalıştığı şey), sayım ölçülen 771'de tohumlanan `quality-baseline.json` — `metrics.boundaryOpenSseToSrc` tavanını aştığında bloke eder, `direction: down`; `--update` yalnızca onu düşürür; PRs tabana göre (`--base-ref`, aşağıya bakın)                                                                                                                                                                                                                                                                                                                                                                                                           | Evet (cırcır)                           |
| `check:route-validation:t06`      | Tüm rotalarda Zod şemaları mevcut (Kademe 6 politikası)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Evet                                    |
| `check:any-budget:t11`            | `@ts-expect-error // any` sayısı bütçeyi aşmıyor (Kademe 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Evet                                    |
| `check:provider-consistency`      | `providers.ts` her sağlayıcının `providerRegistry.ts` eşleşen bir girişi vardır (ve bunun tersi de izin verilenler listesindedir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                    |
| `check:model-lifecycle`           | Elle tutulan üç yönlendirme tablosu, kontrol edilen yaşam döngüsü anlık görüntüsüyle (#11503) tutarlı kalır: `FITNESS_TABLE` (`taskFitness.ts`), `REGISTRY` yönlendirebileceği kullanımdan kaldırılmış bir kimlik almaz; her `BUILT_IN_ALIASES` hedefi `REGISTRY` mevcuttur ve kullanımdan kaldırılan kimlik anlık görüntüsünde yoktur; hala `REGISTRY` olan her emekli kimlik `allowedRetiredInCatalog` iletilir veya listelenir; ve bu anlık görüntüde hiçbir `DEFAULT_DEGRADATION_MAP` kaynağı veya hedefi kullanımdan kaldırılmış görünmüyor. Bu, bir modelin halihazırda canlı bir yukarı akış tarafından sunulduğunu kanıtlamaz. Çevrimdışı —, `config/quality/model-lifecycle.json` ile karşılaştırılır, `npm run quality:refresh-model-lifecycle` ile elle yenilenir (ağ; CI bağlı değildir). `allowedRetiredInCatalog` bir yanma mandalıdır: yalnızca izleme sorunu olan bir giriş ekleyin.                                                                                                          | Evet                                    |
| `check:fetch-targets`             | İstemci tarafı `src/` her `fetch("/api/...")` gerçek bir `route.ts` çözümlenir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet                                    |
| `check:deps`                      | Depodaki her `package.json` tüm `npm install` -able derinlikleri `dependency-allowlist.json` içindedir; yeni sabitlenmemiş veya eğimli paketler işaretlendi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Evet                                    |
| `audit:deps`                      | `npm audit` (kök + elektronu) — high/critical tavsiyesi yok (osv `check:vuln-ratchet` ile örtüşüyor; bkz. Rasyonalizasyon İş Listesi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Evet                                    |
| `check:lockfile`                  | `package-lock.json` bütünlüğü — https kayıt defteri, bütünlük karmaları, ana bilgisayar geçersiz kılmaları yok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet                                    |
| `check:licenses`                  | Üretim bağımlılıkları için SPDX lisansı izin verilenler listesi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Evet                                    |
| `check:tracked-artifacts`         | Derleme yapıtları/taahhütlü `node_modules` sembolik bağlantıları yok (ayrıca husky ön işlemede çalışır; ön itme kasıtlı olarak hafiftir — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Evet                                    |
| `check:ai-attribution`            | PR taahhütlerinde, başlıkta veya gövdede AI/bot `Co-Authored-By` fragmanı veya AI oluşturma altbilgisi yok — Sert Kural #16 ( PR→ `release/**` — için `quality.yml` hızlı geçiş döngüsünde olay yükünü okur, PRs — işlem yapılmaz ve PR→ `main` için `ci.yml` lint'te yalnızca PR adımı; ayrıca husky `commit-msg` kancası; insan ortak yazarlara izin verilir; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Her Vitest hariç tutma işlemi bir izleme sorununu adlandırır ve `config/quality/vitest-exclusions.json` (#13204) görünür                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Evet                                    |
| `check:file-size`                 | Kaynak dosyaları (`.ts`, `open-sse/`, `electron/`, `bin/` `src/`/`.tsx` ) `cap` içinde kalır ve test dosyaları (`*.test.ts(x)`) `testCap` içinde kalır; `file-size-baseline.json` (`frozen` / `testFrozen`) biçiminde dondurulmuş dosyalar kayıtlı boyutlarını aşmamalıdır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Evet                                    |
| `check:error-helper`              | executors/handlers hata yanıtları `buildErrorBody()` / `sanitizeErrorMessage()` kullanır (Katı Kural #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Evet                                    |
| `check:migration-numbering`       | Taşıma SQL dosyaları sıralı olarak numaralandırılmıştır; boşluk veya kopya yoktur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                    |
| `check:public-creds`              | `publicCreds.ts` dışında gerçek OAuth `client_id`/`client_secret` veya Firebase Web anahtarı yok (Zor Kural #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Evet                                    |
| `check:db-rules`                  | `src/lib/db/` modüllerinin dışında ham SQL yok; `localDb.ts` varil ithalatı yok (Zor Kurallar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Evet                                    |
| `check:known-symbols`             | Dağıtım tablolarında kayıtlı sağlayıcı yürütücüleri, yönlendirme stratejileri ve çevirmenler, yetim veya bildirilmemiş semboller olmaksızın disk — dosyalarla eşleşir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Evet                                    |
| `check:route-guard-membership`    | Bir alt süreç oluşturan her rota `isLocalOnlyPath()` (Zor Kurallar #15/#17) göre sınıflandırılır.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                    |
| `check:test-discovery`            | Depodaki her `*.test.ts` / `*.spec.ts` dosyası en az bir test çalıştırıcısı tarafından toplanır (cırcır: `test-discovery-baseline.json` yetim listesi yalnızca küçültülebilir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet                                    |
| `check:test-tla-order`            | `tests/unit` altındaki hiçbir `node:test` dosyası bir testi kaydetmez, üst düzey bir `await` ulaşır ve ardından daha fazlasını kaydeder (#18045; ratchet: `test-tla-order-allowlist.json` yalnızca küçültülebilir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Evet                                    |
| `check:agent-skills-sync`         | Oluşturulan aracı becerileri yapıları kaynak kataloglarıyla eşleşiyor (sapma yok)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | Sağlayıcı logos/assets kayıtlı bir menşe girişi taşıyor                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | JSON yapılandırma dosyaları repo lint kurallarını ayrıştırır ve karşılar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | hatasız TypeScript derlemesi (yalnızca tavsiye amaçlı uyarılar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Evet                                    |
| `typecheck:noimplicit:core`       | Sıkı `noImplicitAny` — ileriye dönük; önceden var olan birçok arama sitesinin hâlâ ek açıklamalara ihtiyacı var                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **Danışma** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` kapsamı `src/app/(dashboard)/**` (#7033) — `typecheck:core` seçilmiş 27 dosyalı izin verilenler listesi herhangi bir TSX kontrol paneli içermez ve `next build` de hiçbir zaman tür kontrolü yapmaz (`next.config.mjs` `ignoreBuildErrors: true` ayarlar), dolayısıyla oradaki yetim tanımlayıcı regresyonları (#6625/#6909) CI tarafından görünmezdi. Dondurulmuş per-file/per-TS-code sayım temel çizgisine karşı farklar (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` ile aynı eski uygulama modeli) — yalnızca temel sayım ötesindeki NEW hataları geçidi başarısızlığa uğratır; Önceden var olan bir hata düzeltildiğinde `--update` ile mandalı azaltın.                                                                                                                                                                                                                                                                                                            | Evet                                    |
| `check:build-typecheck`           | `tsconfig.build.json` üzerinde tam uygulama üretim türü kontrolü (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), yüzey `typecheck:core` 27 dosyalık izin verilenler listesi ve kontrol paneli kapısı kapsamaz. `config/quality/build-typecheck-baseline.json` karşı farklar; yeni veya yükseltilmiş (dosya, kod) başına sayım başarısız olursa, daha düşük bir sayım sizden hızlanma yapmanızı ister. `--update` `--force-regressions` geçilmediği sürece çalıştırma yeni veya yükseltilmiş bir çift içerdiği sürece reddeder ve `--force-nocheck` geçilmediği sürece yeni susturulmuş bir dosyayı reddeder, dolayısıyla taban çizgisini yeşile dönecek şekilde genişletmek ve kalıcı bir sessizlik vermek iki ayrı kasıtlı eylemdir. Çıplak bir `--force` reddedilir. Ayrıca `@ts-nocheck` için derleme kapsamını `config/quality/ts-nocheck-baseline.json` karşı tarar, çünkü onu kullanan bir dosya hiçbir tanılama bildirmez ve aksi takdirde her kapı tarafından görünmez olur. | Evet                                    |

#### İki typecheck programı farklı yanıt veriyor

`typecheck:core` ve `check:build-typecheck` farklı seçenekler altında farklı programlar derler ve aynı dosyanın birinde temiz, diğerinde hatalarla dolu olabilir.

`tsconfig.build.json` `"strict": false` ayarlar, dolayısıyla `noImplicitAny` kapalıdır. Çekirdek yapılandırma, daha katı seçeneklerle özel olarak hazırlanmış 27 dosyalık bir izin verilenler listesi derler ve her girişin içe aktarma grafiğini takip eder, böylece derleme programında hiçbir zaman görünmeyen dosyalar yine orada kontrol edilir.

Bir dosyanın yazılıp yazılmadığını değerlendirirken sonuç önemlidir:** `check:build-typecheck` kapsamında sıfır teşhis, sıfır anlamına gelmez** . `@ts-nocheck` 26 dosyadan çıkarılması, bunların 23'ünün derleme programında temiz olduğunu gösterdi; Bunlardan 16'sı yaklaşık 120 örtülü olarak ortaya çıktı; katı olanda herhangi bir hata yoktu. Bir dosyayı temiz olarak çağırmadan önce her ikisini de kontrol edin.

### İş: `quality-gate`

`test-coverage` sonra çalışır. Başarısızlık durumunda bloklar birleşir.

| Senaryo                      | Doğrular                                                                                                                                                                     | Engelleme                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | `quality-metrics.json` (ESLint uyarı sayısı, birleştirilmiş parça raporunun kapsamı) yayar                                                                                   | Evet (cırcırın yukarı akışı) |
| `quality:ratchet`            | `quality-baseline.json` her ölçüm gerilemedi (ESLint uyarıları ≤ taban çizgisi; kapsama ≥ taban çizgisi)                                                                     | Evet                         |
| `check:duplication`          | Kod çoğaltma (jscpd@4) `quality-baseline.json` temel çizgiyi aşmıyor                                                                                                         | Evet                         |
| `check:complexity`           | Dosya düzeyinde siklomatik karmaşıklık sınırı aşmaz (çekirdek ESLint `complexity` + `max-lines-per-function`)                                                                | Evet                         |
| `check:cognitive-complexity` | Bilişsel karmaşıklık mandalı (`eslint-plugin-sonarjs`) — ayrı ESLint geçişi; CI her ikisini de tek `check:complexity-ratchets` adımı olarak birleştirilmiş olarak çalıştırır | Evet                         |
| `check:dead-code`            | Kullanılmayan dışa aktarmalar/dosyalar mandalı (knip), taban çizgisine göre gerilemez                                                                                        | Evet                         |
| `check:compression-budget`   | Sıkıştırma karşılaştırmalı bütçe — motor başına jeton tasarruf tabanları gerilememelidir                                                                                     | Evet                         |
| `check:type-coverage`        | Yüzde tipi mandal (`type-coverage`) gerilemez; büyük ölçüde `typecheck:noimplicit:core` kapsar                                                                               | Evet                         |
| `check:codeql-ratchet`       | Açık CodeQL uyarı sayısı gerilemez ( `gh api` yoluyla okur; belirteç olmadan zarif atlama) — yenileme temposu ve manuel tetikleme: aşağıdaki "CodeQL mandalı" bölümüne bakın | Evet                         |

### İş: `quality-extended`

İşin tamamı tavsiye niteliğindedir (`continue-on-error: true`). NPM tabanlı mandallar gerçekten çalışıyor; harici tarayıcılar `gh release download` yoluyla kurulur ve bir ikili dosya hala mevcut olmadığında kendi kendine atlar (çıkış 0).

| Senaryo                  | Doğrular                                                                                                                                                                                                                      | Engelleme                                   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:circular-deps`    | Döngüsel bağımlılık yok (dpdm)                                                                                                                                                                                                | **Danışma**                                 |
| `check:bundle-size`      | Paket boyutu sınırı aşmıyor                                                                                                                                                                                                   | **Danışma**                                 |
| `check:secrets`          | Gizli tarama (gitleaks) ikili dosya yoksa — atlar                                                                                                                                                                             | **Danışma**                                 |
| `check:vuln-ratchet`     | Bağımlılık güvenlik açıkları (osv tarayıcı), ikili dosyanın mevcut olmaması durumunda — atlamalarını gerilemez                                                                                                                | **Danışma**                                 |
| `check:workflows`        | İş akışı tüyü (actionlint + zizmor); missing/broken tarayıcılar, geçersiz raporlar veya eksik mandal temel çizgisi INCOMPLETE olarak başarısız oluyor. Geçerli bulgular seçilen strict/advisory/ratchet politikasına uygundur | Yürütme gerekli; CI zizmor cırcır engelleme |
| `check:openapi-breaking` | Genel API sözleşmesi (`openapi.yaml`) ile temel şube (oasdiff) arasında yapılan son değişiklikler — `openapiBreaking=N` yayar; oasdiff yoksa veya temel özellikler çözülemiyorsa atlanır                                      | **Danışma**                                 |

### İş: `docs-sync-strict`

Her PR `main` kadar çalışır. Başarısızlık durumunda bloklar birleşir.

| Senaryo                        | Doğrular                                                                                                                                                                                    | Engelleme                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `check:docs-all`               | Aşağıdaki 6 alt geçidi sırayla çalıştıran meta geçit                                                                                                                                        | Evet                               |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt sürüm tutarlılığı                                                                                                                                             | Evet                               |
| ↳ `check:docs-counts`          | Düzyazıdaki sayımlar (sağlayıcı sayısı, geçiş sayısı vb.) gerçek sayımların mandal penceresi dahilindedir                                                                                   | Evet                               |
| ↳ `check:env-doc-sync`         | `.env.example` her env var, bir dokümanlar tablosunda belgelenir ve bunun tersi de geçerlidir                                                                                               | Evet                               |
| ↳ `check:deprecated-versions`  | Dokümanlarda kullanımdan kaldırılmış sürüm dizesi yok                                                                                                                                       | Evet                               |
| ↳ `check:doc-links`            | Dokümanlardaki dahili işaretleme bağlantıları gerçek dosyalara çözümlenir (`[text]`/`(path)` formu)                                                                                         | Evet                               |
| ↳ `check:fabricated-docs`      | Dokümanlarda belirtilen rotalar, env değişkenleri, CLI komutları, kanca adları ve dosya yolları kod tabanında mevcuttur. `--strict` aracılığıyla sert geçit; bayraksız geçici başarısızlık. | Evet ( CI `--strict` aracılığıyla) |
| `check:cli-i18n`               | CLI komut dizeleri tüm i18n yerel ayar dosyalarında mevcuttur                                                                                                                               | Evet                               |
| `check:openapi-coverage`       | OpenAPI spesifikasyonu en azından gerçek rotaların cırcırlı bir katını kapsar                                                                                                               | Evet                               |
| `check:openapi-security-tiers` | `openapi.yaml` güvenlik katmanı ek açıklamaları `routeGuard.ts` sınıflandırmalarıyla tutarlıdır                                                                                             | **Danışma**                        |
| `check:openapi-routes`         | `openapi.yaml` her yol gerçek bir `route.ts` (anti-halüsinasyon) çözümlenir                                                                                                                 | Evet                               |
| `check:docs-symbols`           | `docs/**/*.md` her `/api/...` referansı gerçek bir `route.ts` (halüsinasyon karşıtı) çözümlenir                                                                                             | Evet                               |
| `i18n translation drift`       | i18n yerel ayar dosyalarındaki çevrilmemiş anahtarlar — yalnızca uyar                                                                                                                       | **Danışma**                        |

`docs/diagrams/` altında on iki README SVGs oluşturulur (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` hepsini yeniden oluşturur). Her birinin, taahhüt edilen dosya eski olduğunda başarısız olan bir bayt karşılaştırma birimi testi (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) vardır ve `check:docs-counts` `<text>` düğümlerinden — kanonik sayıları okur; bu nedenle anahat belirleme adımı, dosyadaki her özetlenen dizeyi görünmez olarak tutar `<text>`. SVG kanonik sayılar denetimi, `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) içinde listelenen dosyaları okur: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, artı `public/images/tier-flow-dark.svg` ve `tier-flow-light.svg`; Sonsuza kadar ücretsiz, katalog girişi, yinelenen havuz ve puanlama faktörleri iddiaları aynı zamanda `promise-pillars.svg`, `free-tier-budget.svg` ve `strategies-grid.svg` olarak da okunur. `free-tier-budget.svg` rakamlarını canlı katalog yükleyicisinden alır; dolayısıyla `FREE_MODEL_BUDGETS` veya sağlayıcının görünen adında yapılan bir değişiklik, o dosya yeniden oluşturulana kadar CI kırmızılaştırır.

### İş: `i18n-ui-coverage`

| Senaryo                              | Doğrular                                                                                                                                                                                            | Engelleme   |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (satır içi) | UI i18n anahtar kapsamı ≥ %65'tir                                                                                                                                                                   | Evet        |
| `check-ui-value-drift` (satır içi)   | Yeniden yazılmış bir İngilizce** değer** geride eski bir çeviri bırakmaz                                                                                                                            | Evet        |
| `check-new-key-coverage` (satır içi) | A** yeni** İngilizce anahtar her yerel ayarda çevrilir — ve `__MISSING__:` işaretçisi reddedilir                                                                                                    | Evet        |
| `check-translation-ratio`            | Yerel ayar başına gerçek çeviri oranı (İngilizceyle aynı / yer tutucu / izin verilenler listesinin dışındaki eksik yapraklar) `config/quality/i18n-translation-baseline.json` + slack'ı aşmamalıdır | **Danışma** |

Değer kayması kapısının `fetch-depth: 0` — ihtiyacı vardır, `en.json` birleştirme tabanına göre farklılık gösterir.

#### `check-ui-value-drift` — eski çeviri kapısı

Diğer kapıların yapısal olarak göremediği gerilemeyi yakalar: İngilizce bir değer yeniden yazılır ve önceki İngilizceden türetilen çeviriler geride kalır, böylece İngilizce olmayan kullanıcılar güvenle ifade edilen, artık yanlış olan kopyayı okumaya devam eder.

Bu gerçekten gönderildi. Antigravity oturum açma yardımcısı indiğinde `oauthModal.googleOAuthWarning` yeniden yazıldı (#5203);** 43 yerel ayardan 39'u** operatörlere " URL tamamını kopyalayıp aşağıya yapıştırmalarını" söyleyen bir metin tuttu; bu sağlayıcı için tamamlanamayan bir —. #8463 kadar fark edilmedi çünkü:

- `sync-ui-keys` yalnızca şu anahtarları doldurur:** mevcut olmayan** , asla öyle olanları** bayat** ;
- `check-ui-keys-coverage` _presence_ anahtarını sayar, dolayısıyla eski bir çeviri kapsandığı gibi puanlanır;
- `check-translation-drift` `docs/i18n/<locale>/**.md` belgeleme aynalarını izler — hiçbir zaman `src/i18n/messages/*.json` okumaz. 2026-09 yeniden senkronizasyonundan bu yana `docs-sync-strict` işinde engelleme: → `npm run i18n:run -- --files=<doc>` temel belgesini düzenleyin (bölüm düzeyinde, ucuz).

**Farkları tanıyan, temel destekli değil.** Birleştirme tabanındaki `en.json` çalışma ağacıyla karşılaştırır; İngilizce değeri değişen her anahtar için, hâlâ dokunulmamış bir çeviriye sahip olan herhangi bir yerel ayar eskidir. Bu kasıtlı olarak** mevcut borcun dondurulması** — a diff, uzun süredir devam eden bir çevirinin hangi eski İngilizceden geldiğini ortaya çıkaramaz, dolayısıyla kapı yalnızca mevcut değişikliğin neye dokunduğunu değerlendirir. Alternatif (anahtar başına hash taban çizgisi), her i18n PR çalkalanan ~ 600 KB bir dosyaya, yani mevcut en büyük taban çizgisinin 3 × mal olacaktır.

Bunu tatmin etmenin iki yolu:

1. etkilenen çevirileri güncelleyin veya
2. bunları çalışma zamanında `__MISSING__:<new english>` — olarak ayarlayın, ardından düzeltilmiş İngilizceyi (`src/i18n/request.ts::deepMergeFallback`, #7258) ve çeviri için anahtar sıralarını sunar.

Eğer dize** Anlam** değişti, tercih et** anahtarı yeniden adlandırma** : yeni bir anahtar eski bir çeviriyi devralamaz. #8463 kullandığı model budur.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Temel katalog okunamadığında `SKIP reason=base-unresolved` ile 0'dan çıkar (temel referansı olmayan sığ klon), `check-openapi-breaking` yansıtır.

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

`build` sonra çalışır. Başarısızlık durumunda bloklar birleşir.

| Süit             | Doğrular                                                     | Engelleme                                                                                                                         |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP sunucusu (110 araç), autoCombo, önbellek — hızt koşucusu | Evet                                                                                                                              |
| `test:vitest:ui` | UI bileşen testleri — vitest koşucusu                        | **Engelleme** — önceden var olan hataları `vitest.config.ts` açıkça hariç tutulur; yeni başarısızlıklar işi başarısızlığa uğratır |

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
- **öneri niteliğinde** — genel toplamın dondurulmuş temel değerle karşılaştırılması. Devralınan sapma hiçbir
  zaman masum bir PR'ı başarısız kılmaz; sapma, sürüm uzlaştırmasında yeniden dondurulur ve ek kapasite işi tarafından izlenir.

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

Önceden mevcut ihlaller nedeniyle başarısız olmaması gereken her geçit, sabitlenmiş bir izin listesi
(ör. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`) kullanır. Politika şöyledir:

**Temel nedeni düzeltin; izin listesini yalnızca ihlal önceden mevcutsa ve
aynı PR içinde düzeltilemiyorsa kullanın.**

Bir izin listesine girdi eklerken:

1. Gerekçeyi açıklayan bir yorum ekleyin.
2. Takip sorununa referans verin (ör. `// #3498 — Aşama 2 özelliği, henüz uygulanmadı`).
3. İhlali düzelten PR içinde girdiyi de kaldırın — artık etkin bir ihlali
   bastırmayan eski bir girdi başlı başına bir kusurdur (6A.3 eski-yaptırım denetimi,
   uygulandığında sahipsiz bir izin listesi girdisi nedeniyle geçidi başarısız kılacaktır).

Testlerin daha hızlı geçmesini sağlamak için izin listesine girdi **eklemeyin**. Büyüyen bir
izin listesine sahip yeşil bir geçit, sahte bir kalite algısı yaratır.

### PR'ınızda bir geçit başarısız olduğunda

1. **Geçit çıktısını dikkatlice okuyun** — çıktıda, kuralı tam olarak hangi dosyanın veya sembolün
   ihlal ettiği belirtilir.
2. **İhlali düzeltin** — çoğu geçit, kod doğru hâle gelir gelmez başarılı olan deterministik dosya sistemi denetimleridir.
3. **İhlal önceden mevcutsa** (yani ihlali siz oluşturmadıysanız ancak geçit artık
   bunu kapsıyorsa): gerekçe yorumu ve takip sorunuyla birlikte bir izin listesi girdisi ekleyin.
4. **Geçit bir mandallı ölçümse** (kapsam, ESLint uyarıları, tekrar, karmaşıklık):
   değişikliğiniz metriği kötüleştirmiştir. Temel sorunu düzeltin veya (nadiren) değişiklik
   kasıtlıysa ve metrikteki kötüleşme kabul edilebilirse
   `npm run quality:ratchet -- --update` komutunu çalıştırın — ancak nedenini PR açıklamasında belgeleyin.
5. **Tavsiye niteliğindeki geçitler** (`continue-on-error: true`) bilgilendirme amaçlıdır — birleştirmeyi
   engellemezler ancak CI özetinde görünürler. Yine de bunları düzeltin.

---

## Yeni Bir Geçit Ekleme

1. `scripts/check/check-<name>.mjs` (veya `.ts`) dosyasını oluşturun. Politika geçitleri 0/1 çıkış koduyla sonlanır.
   Mandallı ölçüm tarzındaki geçitler, `collect-metrics.mjs` aracılığıyla `quality-metrics.json` dosyasına bir metrik yazar.
2. `package.json` dosyasına `"check:<name>": "node scripts/check/check-<name>.mjs"` ekleyin.
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

## Rasyonalizasyon İş Listesi (ROI incelemesi — Faz 9 Dalga 3)

Bu envanter, 2026-06-17 tarihinde `ci.yml` ile karşılaştırılarak uzlaştırıldı (önceki sürümde
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` yer almıyordu). Uzlaştırılmış kümenin ROI incelemesi
aşağıdaki rasyonalizasyon adaylarını belirledi. **Birleştirmeler mekanik CI
değişiklikleridir; etkinleştirme/kaldırma işlemleri ise operatöre bırakılmış politika kararlarıdır.** Aşağıdakilerin hiçbiri
henüz uygulanmamıştır.

**Yukarıda ayrıca belgelenmemiş olanlar** (tavsiye niteliğinde, düşük sinyalli): `docs-lint` işi
(markdownlint + Vale, işin tamamında `continue-on-error`) ve bağımsız tarayıcı iş akışları
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`,
`quality-baseline.json` içinde yer almaktadır ancak `ci.yml` içinde engelleyici bir ratchet'a
bağlı değildir — metrik şu anda sahipsizdir.

### Birleştirme / tekilleştirme (mekanik, daha düşük risk)

Her aday, 2026-06-17 tarihinde canlı gate durumuna karşı doğrulandı (güven ama doğrula);
“bariz” görünen bazı birleştirmelerin borç gizlediği ortaya çıktı ve bunlar **temiz birer doğrudan ikame değildir**.

- **`check:docs-sync` iki kez çalışıyor** — `lint` işi içinde bağımsız olarak ve ayrıca `check:docs-all` (`docs-sync-strict`) ile husky pre-commit hook'u içinde. ✅ **TAMAMLANDI** — bağımsız `lint` çağrısı kaldırıldı.
- **CVE taraması** — ❌ **Temiz bir birleştirme DEĞİL.** `audit:deps`, herhangi bir yüksek/kritik CVE olduğunda kesin olarak başarısız olur; `check:vuln-ratchet` (osv) ise yalnızca baseline'a kıyasla bir _gerileme_ olduğunda başarısız olur (şu anda 1 MODERATE). Semantikleri farklıdır — `audit:deps` kaldırılırsa mutlak yüksek/kritik gate kaybedilir. İkisini de koruyun.
- **Döngü tespiti** — ✅ **TAMAMLANDI** (#15159 G-01/G-02). Buradaki eski metin, `check:cycles` için “yeşil, özenle seçilmiş” gate ifadesini kullanıyor ve `check:circular-deps` (dpdm) 91 döngü bildirdiği için bunun engelleyici olarak tutulmasını gerekçelendiriyordu. Bu yeşil durum **yalancı yeşildi**: `check:cycles` 5 alt dizini (450 dosya) tarıyor, yalnızca statik `import|export … from` ifadelerini eşleştiriyor ve tüm `@/` ile `@omniroute/open-sse/` belirticilerini eliyordu; dolayısıyla depoda baskın olan dinamik import + alias döngülerini göremiyordu. Düzeltildi: gate artık `src` + `open-sse` dizinlerini (5023 dosya) dolaşıyor, belirticileri TypeScript AST'sinden topluyor (böylece `import("…")` sayılırken tür konumundaki `typeof import("…")` sayılmıyor) ve tsconfig `paths` değerlerini çözümlüyor. 0 değil, **14** döngü buluyor. Önceden var olan 14 döngü bir gate PR'ında düzeltilemeyeceğinden `check:cycles` artık bir **ratchet**'tır (`--ratchet`, `quality-baseline.json` içinde tavan `metrics.cycles.value = 14`, `direction: down`) — herhangi bir _gerilemeyi_ engeller ve sayı yalnızca azalabilir. CI, `npm run check:cycles:ratchet` komutunu çalıştırır. Azaltma çalışmaları **A-01** ile birlikte yürütülür. `check:circular-deps` (dpdm), daha geniş kapsamlı ikinci görüş olarak tavsiye niteliğinde kalır.
- **Karmaşıklık** — ✅ **TAMAMLANDI** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): tek bir ESLint taraması, cyclomatic+max-lines ve cognitive baseline'larının bağımsız kalması için ruleId bazında sayım yapar; ayrı `check:complexity` / `check:cognitive-complexity` komutları yerel `--update` işlemleri için korunur.
- **`/api` anti-halüsinasyon** — ✅ **TAMAMLANDI** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` için tek bir FS envanteri; openapi-routes + docs-symbols hâlâ bağımsız olarak rapor verir; ayrı komutlar yerel çalıştırmalar için korunur.
- **`check:node-runtime` 11 işte çalışıyor** — ⚠️ **düşük ROI.** Her biri ayrı bir runner'dır ve kontrol <1 sn sürer; ucuz bir iş başına korumanın kaybedilmesine karşılık toplam tasarruf ~10 sn'dir. Bu değişikliğe değmez.
- **CI lint'te `typecheck:noimplicit:core`** — ✅ **lint işinden kaldırıldı** (tavsiye niteliğinde `continue-on-error` idi); engelleyici tür yüzeyi `typecheck:core` + `check:type-coverage` şeklindedir. Yerel script korundu.

### Etkinleştirme / karar verme (operatör politikası)

- `check:openapi-security-tiers` (tavsiye niteliğinde) — ❌ **Temiz biçimde etkinleştirilemez.** 0 koduyla çıkar ancak `LOCAL_ONLY_API_PREFIXES` altındaki bazı `traffic-inspector` route'larında `x-loopback-only: true` annotation'ının eksik olduğu konusunda uyarır. Bunu zorunlu kılmak için önce söz konusu annotation'ların `openapi.yaml` dosyasına eklenmesi gerekir.
- `typecheck:noimplicit:core` (tavsiye niteliğinde) — büyük ölçüde engelleyici `check:type-coverage` ratchet'ı tarafından kapsanır. Bir ratchet'a dönüştürün veya yinelenen ikinci `tsc` geçişini kaldırın.
- `test:vitest:ui` (artık **engelleyici**) — önceden var olan hatalar, `vitest.config.ts` içinde `// #8618` takip yorumlarıyla açıkça hariç tutulmuştur; yeni hatalar işi başarısız kılar.
- `check:secrets` (gitleaks, belgelenmiş 3 false-positive değerinde dondurulmuş engelleyici ratchet) — 0'a ulaşmak için bu 3 öğeyi allowlist'e ekleyin veya tavsiye niteliğine düşürün. GitHub'ın yerleşik secret-scanning özelliği + `check:public-creds` ile örtüşür.
- `check:pr-evidence` (engelleyici, PR gövdesindeki düzyazıda grep yapar) — false-positive riski yüksektir; kaldırılması Hard Rule #18 uygulamasını zayıflatır, dolayısıyla bu gerçek bir politika kararıdır.
- `semgrep` (tavsiye niteliğinde bağımsız iş akışı) — OWASP aileleri bakımından CodeQL ile örtüşür; baseline'ını bir ratchet'a bağlayın veya kaldırın.

---

## İlgili Dokümantasyon

- Tedarik zinciri (kaynak doğrulama, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — anahtar kümesi eşitliği geçidi

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, iş `i18n-ui-coverage`).
Her `src/i18n/messages/<locale>.json` dosyasındaki uç anahtar kümesini `en.json` ile karşılaştırır ve
anahtarın ne zaman eklendiğine bakmaksızın eksik veya fazladan herhangi bir uç anahtar olduğunda başarısız olur.
`__MISSING__:` yer tutucuları mevcut sayılır (bunların içeriği oran geçidinin konusudur). Bu geçit,
fark tabanlı/yüzdesel diğer iki geçidin mutlak tamamlayıcısıdır: `check-ui-keys-coverage`, yerel ayar
başına %80 alt sınırını zorunlu kılar (~13.000 anahtardan 43'ünün eksik olması yine %99,7 olarak görünür);
`check-new-key-coverage` ise yalnızca bir PR'ın `en.json` dosyasına eklediği anahtarları değerlendirir.
Bir yerel ayar toplu işi, dalının oluşturulduğu günkü `en.json` dosyasından üretilir ve taban dalına yeni
anahtarlar eklenmeye devam ederken günlerce çeviri yapar; toplu iş PR'ı kendisi hiçbir anahtar eklemediğinden,

1. toplu iş (#13044) dokuz yerel ayarda 43 anahtar eksik ve 2. toplu iş (#13660) sekiz yerel ayarda
   10 anahtar eksik olarak birleştirildiğinde iki kardeş geçit de sessiz kaldı (2026-09-15). Kırmızı durumu
   `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ile düzeltin; `extra` bir uç anahtar,
   kaynağın onu kaldırdığı anlamına gelir — yerel ayardan silin. `--warn`, başarısız olmadan raporlar.
   `--catalog=cli`, aynı karşılaştırmayı `bin/cli/locales` üzerinde çalıştırır (`npm run i18n:check-keys:cli`);
   her iki adım da `i18n-ui-coverage` işinde yer alır.

#### `check-new-key-coverage` — yeni anahtar i18n geçidi

`check-ui-value-drift` geçidinin kardeşidir. O geçit, çevirileri geride kalmış bir İngilizce değerin
**yeniden yazıldığını** yakalar; bu geçit ise bazı yerel ayarlara hiç eklenmemiş bir İngilizce anahtarın
**eklendiğini** yakalar.

`check-ui-keys-coverage` bu durumu göremez: yerel ayar başına yüzdesel bir alt sınırı zorunlu kılar ve
~13.000 uç anahtardan on birinin eksik olması kapsamı %99,9'da bırakır. Dil başına bir yüzde,
"bu özellik çevrilmeden yayımlandı" durumunu ifade edemez — yeni bir yerel ayara hiçbir metni olmadan
bütün bir özellik eklenebilir ve bu sayı hiç değişmeyebilir.

Kodladığı olay şudur: Orchestration Canvas'ın 3. Aşaması, on bir anahtarını o sırada mevcut olan 42 yerel
ayarın tamamına çevirdi. Saatler sonra AB dilleri toplu işi (#13044), depoyu 51 yerel ayara çıkardı ve
yeni gelen dokuz yerel ayar (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) bu anahtarları hiçbir
zaman almadı. `deepMergeFallback`, eksik bir anahtar yerine İngilizceyi koyduğundan hata modu boş bir
arayüz değil, çevrilmemiş bir arayüzdü — gerçek ve tasarım gereği sessiz.

Kardeşi gibi bu geçit de **fark bilincine sahiptir**; birleştirme tabanındaki İngilizceyi çalışma
ağacıyla karşılaştırır. Böylece önceden var olan boşluklar dondurulmuş kalır ve geçidin etkinleştirilmesi
için herhangi bir geçiş gerekmez.

**Bir `__MISSING__:<english>` işaretçisi bu geçidi karşılamaz (2026-09-17'den beri).** Önceden bu,
belgelenmiş erteleme yöntemiydi — çalışma zamanı doğru İngilizceye geri döner — ancak 2026-09-16'da sekiz
özellik PR'ı 61 anahtar ekledi ve çevirmek yerine işaretçiyi 65 yerel ayarın tamamına bastı: bu geçit
hepsini kabul etti, PR'ları hiçbir şey engellemedi ve gerçek çeviri oranını zorunlu kılan engelleyici geçit
daha sonra sürüm ucunda herkes için başarısız oldu (pt-BR %3,2 > %2,5 + %0,5). Bir işaretçi artık eksik
çeviri olarak değerlendirilir. Kırmızı durumu
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ile veya
`npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, bağlantıdan bağımsız çalışabilir,
`OMNIROUTE_TRANSLATION_*` ortam değişkenleri olmadan başlamayı reddeder) kullanarak tüm yerel ayarlarda
paralel biçimde düzeltin. İngilizce kalması gereken bir anahtar (sabitlenmiş ürün/motor/bayrak adı),
hiçbir zaman bir işaretçinin arkasında değil, `scripts/i18n/untranslatable-keys.json` içinde yer almalıdır.
`vi`, işaretçileri tamamen yasaklar (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — bekletilen test geçidi

`vitest.config.ts` dosyasının `exclude` listesindeki bir dosya, çalışmayan bir testtir ve ağacı okuyan
kişiye kapsam varmış gibi görünür. Altmış iki dosya,
`// #8618 — önceden var olan hata; düzeltildiğinde bu hariç tutmayı kaldırın` yorumunun arkasında birikti.
#8618 numaralı kayıt 2026-08-11'de kapatılırken, izlediği liste 45 girdiden 62 girdiye çıktı ve her yeni
girdi kapanmış bir kayda işaret eden yorumu devraldı. Liste sonunda dosya bazında ölçüldüğünde (#13204),
**62 dosyanın 51'i kaynakta hiçbir değişiklik yapılmadan mevcut ağaçta başarılı oldu**.

Geçit, gerçek bir dosyaya çözümlenen her hariç tutmanın (a) bir izleme kaydı belirtmesini ve
(b) ölçülen durumuyla birlikte `config/quality/vitest-exclusions.json` içinde görünmesini zorunlu kılar.
Böylece yeni bir hariç tutma eklemek, 60 girdili bir diziye bir satır daha eklemek yerine özel bir dosyada
incelenebilir bir fark oluşturur. Hariç tutulan testleri kasıtlı olarak yeniden çalıştırmaz — bu işlem
yaklaşık 10 dakika sürer ve periyodik bir işe aittir; envanter, her birinin en son ne zaman ölçüldüğünü
kaydeder.
