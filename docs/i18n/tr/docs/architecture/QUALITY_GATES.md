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

## Gate envanteri ve yürütme profilleri

### Aday kabulü

CI ve Quality Gates iş akışlarının her biri kararlı bir sonuç üretir: `Gate / CI` ve
`Gate / Quality`. Sürümlendirilmiş kabul politikası, yukarı akıştaki her işi zorunlu
veya tavsiye niteliğinde olarak listeler. Uygulanabilir bir zorunlu iş başarılı
olmalıdır: eksik, iptal edilmiş, atlanmış, bekleyen ve bilinmeyen sonuçlar PASS
oluşturamaz. Geçerli bir yalnızca doküman veya yalnızca katalog sınıflandırması,
bir kod hattını uygulanamaz hâle getirebilir; taslak PR kabul edilen bir aday
değildir. `hotfix` etiketi kanıt gerekliliğini kaldırmaz.

Her iki iş akışı da main/release dallarına yönelik PR'ları, `main` dalına yapılan
push'ları, manuel çalıştırmaları ve merge-group olaylarını kapsar. Push, dispatch
ve merge-group tam seçimi çalıştırır. `release/**` dallarına yapılan push'lar bunları
başlatmaz (2026-10-18): her değişiklik zaten PR'ı üzerinde matrisi çalıştırmıştır
ve birleştirilmiş birleşimin sorumluluğu Release-Green'e aittir
(`docs/ops/RUNNER_BOX.md` → Hosted hattı). Fork'lar ve merge grupları, aksi hâlde
self-hosted runner seçen işler için hosted runner kullanır; kullanıma sunmadan önce
yeterli hosted kapasitesi doğrulanmalıdır.

Her JSON makbuzu, kontrol edilen SHA'yı, iş akışı çalıştırmasını ve denemesini
tanımlar. CLI, checkout/olay SHA uyuşmazlığını reddeder. İş akışı testleri, politika
üyeliğini verdict işinin `needs` listesine bağlar; böylece yeni veya kaldırılmış bir
hat sessizce ortadan kaybolamaz. Makbuzlar kendi iş akışlarını kapsar; yayımlamayı,
dağıtımı veya mevcut bir tavsiye niteliğindeki tarayıcının iç işleyişini kapsamaz.
Her iki kontrol adının dal kurallarında etkinleştirilmesi ayrı bir yönetimsel
değişikliktir; bu işlerin eklenmesi tek başına bir dalı korumaz.

### Statik tarama envanteri

Sürümlendirilmiş npm takma adları envanteri ve statik tarama üyeliği
`config/quality/gate-manifest.json` içinde bulunur. Betik adlarını ve tam komutları
`package.json` ile karşılaştırarak doğrulamak için `npm run check:gate-manifest`
komutunu çalıştırın; eklemeler, kaldırmalar ve komut sapmaları hem yerel kancanın
hem de CI'daki değişiklik sınıflandırma işlerinin başarısız olmasına neden olur.
Bir takma ad, iş akışı işi, matris örneği veya test durumu değildir: bu sayımlar
birbirinin yerine kullanılabilir olarak sunulmamalıdır.

Çalıştırmadan seçilen takma adları incelemek için `npm run quality:scan -- --list`
veya `npm run quality:scan:fast -- --list` komutunu kullanın. Çalıştırıcı npm giriş
noktasını çağırır; bu nedenle çalışma zamanı (yapılandırılmışsa Bun dahil) korunur.
Manifest, bu profillerin dışındaki takma adları ayrı olarak çağrılanlar şeklinde
kaydeder ve bakım komutları salt okunur tarama profillerinde yasaktır.

Bu profiller yalnızca statik taramayı kapsar. Ürün testlerini, kapsamı, paketlemeyi,
harici kontrolleri veya bir adayın tam sürüm kabulünü onaylamazlar. İş akışı kabulü,
bağlantılı `config/quality/admission-policy.json` ve
`scripts/quality/admission-verdict.mjs` dosyalarını kullanır. Release-observer
profilleri ayrı kalır; uygulanabilir kontrollerini ve makbuzlarını bağımsız olarak
inceleyin. Aşağıdaki düzyazı envanteri bir başvurudur; bir kapının gerçekten
çalıştığının kanıtı değildir.

Betikler politika kapıları için `scripts/check/`, ratchet motoru için
`scripts/quality/` altında bulunur. CI için asıl doğruluk kaynağı
`.github/workflows/ci.yml` dosyasıdır.

### Release PR hızlı yolu (`quality.yml`)

`.github/workflows/quality.yml`, main/release PR'larında, `main` dalına yapılan
push'larda, dispatch ve merge gruplarında CI'ı tamamlar. PR'lar yol filtreli hızlı
kontrolleri kullanır. Kalıcı olarak devre dışı bırakılmış yinelenen derleme
kaldırılmıştır; gerçek derleme/paketleme/önyükleme kontrolleri CI'da kalır.

| İş                                               | Kapsam                                                                                                                                                                                                                             | Engelleme               |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Doküman/kod PR'ları; API doküman referansları ve tüm dokümanlar                                                                                                                                                                    | Evet                    |
| `Fast Quality Gates`                             | Kod PR'ları; statik kontroller, tür denetimi, gösterge paneli tür denetimi, etkilenen birim testleri                                                                                                                               | Evet                    |
| `Forgotten sibling tests`                        | Kod PR'ları; statik tüketicilere ve aday kardeş testlerine kadar izlenen değiştirilmiş modüller; barrel ve dinamik içe aktarma yolları, başvurulan izin listesi istisnalarıyla birlikte tavsiye niteliğinde tanı olarak bildirilir | **Tavsiye niteliğinde** |
| `Vitest (fast-path)`                             | Kod PR'ları; hızlı vitest paketi                                                                                                                                                                                                   | Evet                    |
| `Unit Tests fast-path`                           | Kod PR'ları; 4 parçalı birim paketi                                                                                                                                                                                                | Evet                    |
| `No new ESLint warnings`                         | Kod PR'ları; bastırmaları dikkate alan lint koruması                                                                                                                                                                               | Fork'lar dahil Evet     |
| `Merge integrity (changelog + generated skills)` | Taslak olmayan PR'lar; değişiklik günlüğü ve oluşturulan yetenek senkronizasyonu                                                                                                                                                   | Fork'lar dahil Evet     |

#### Forgotten sibling tests raporu

`npm run check:forgotten-sibling-tests`, test etki haritasının arkasındaki içe aktarma çözümleyicisini yeniden kullanır.
Değiştirilen her üretim modülü için, aday test çekme isteği farkında bulunmadığında deterministik
`changed module/symbol -> static consumer -> candidate sibling test` zincirlerini raporlar. Markdown özeti ve JSON sonucu,
herhangi bir engelleyici kullanıma geçilmeden önce kalibrasyon amacıyla
`forgotten-sibling-tests` iş akışı yapıtı olarak saklanır.

Barrel yeniden dışa aktarımları ve dinamik içe aktarımlar yalnızca çözümleme tanılarıdır; hiçbir zaman
engelleyici bulgu oluşturmazlar. İncelenmiş istisnalar
`config/quality/forgotten-sibling-allowlist.json` dosyasında bulunur. Her giriş, tüketiciyi ve aday
testi belirtmeli, özel bir gerekçe sunmalı ve bir GitHub issue'suna veya pull request'e bağlantı vermelidir. Hatalı
girişler güvenli kapanma davranışıyla başarısız olur. İstisnalar silinmiş bir aday testi veya `.skip`/`.todo` ekleyen
bir farkı bastıramaz; assertion zayıflatma ve diğer maskeleme işlemlerinin sorumluluğu, bağımsız olarak engelleyici
`check:test-masking` geçidine aittir.

### İş: `lint`

Her `main` dalına yönelik PR'da çalışır. Başarısızlık durumunda birleştirmeyi engeller.

| Script (`npm run ...`)            | Doğruladığı                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Engelleyici                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | Node.js sürümünün desteklenen aralıkta olması                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Evet                                          |
| `check:cycles`                    | `src/` + `open-sse/` genelindeki döngüsel içe aktarmalar (AST tabanlı, tsconfig `paths` çözümlenmiş). Herhangi bir döngü mevcut olduğunda yalın çalıştırma her zaman 1 durum koduyla çıkar (fail-closed, #15281'den beri) ve SCC'leri listeler. `check:cycles:ratchet` (CI'ın çalıştırdığı) sayı `quality-baseline.json` içindeki `metrics.cycles` üst sınırını aştığında engeller — şu anda 14, `direction: down`; dolayısıyla yalnızca azalabilir (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Evet (ratchet)                                |
| `check:boundary`                  | `open-sse → src` bağımlılığı: motordan uygulamaya yapılan dosyadan dosyaya benzersiz içe aktarmalar (`scripts/quality/measure-boundary.mjs`; kenar listesi, v4 çekirdek/modül ayrımı iyileştirme biriktirme listesidir). Yalın çalıştırma, öneri niteliğinde bir rapor sunar (`quality:boundary` ile aynı). `check:boundary:ratchet` (CI'ın çalıştırdığı ve `quality.yml` hızlı kapılar ratchet döngüsünde de yer alan) sayı `quality-baseline.json` içindeki `metrics.boundaryOpenSseToSrc` üst sınırını aştığında engeller — ölçülen 771 olarak başlangıç değeri atanmıştır, `direction: down`; `--update` yalnızca bu değeri düşürür; PR'larda tabana göre göreli çalışır (`--base-ref`, aşağıya bakın)                                                                                                                                                                                                                                                                                                                                                      | Evet (ratchet)                                |
| `check:route-validation:t06`      | Tüm rotalarda Zod şemalarının bulunması (Katman 6 politikası)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Evet                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any` sayısı bütçeyi aşmıyor (Katman 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Evet                                          |
| `check:provider-consistency`      | `providers.ts` içindeki her sağlayıcının `providerRegistry.ts` içinde eşleşen bir girdisi vardır (ve izin verilenler listesi dahilinde tersi de geçerlidir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Evet                                          |
| `check:model-lifecycle`           | Elle sürdürülen üç yönlendirme tablosu, depoya dahil edilen yaşam döngüsü anlık görüntüsüyle (#11503) tutarlı kalır: `FITNESS_TABLE` (`taskFitness.ts`), `REGISTRY`'nin yönlendirebildiği hiçbir kullanımdan kaldırılmış kimliğe puan vermez; her `BUILT_IN_ALIASES` hedefi `REGISTRY` içinde bulunur ve kullanımdan kaldırılmış kimlikler anlık görüntüsünde yer almaz; `REGISTRY` içinde hâlâ bulunan her kullanımdan kaldırılmış kimlik iletilir veya `allowedRetiredInCatalog` içinde listelenir; ayrıca hiçbir `DEFAULT_DEGRADATION_MAP` kaynağı ya da hedefi bu anlık görüntüde kullanımdan kaldırılmış olarak görünmez. Bu, bir modelin şu anda canlı bir üst akış tarafından sunulduğunu kanıtlamaz. Çevrimdışıdır — `npm run quality:refresh-model-lifecycle` ile elle yenilenen `config/quality/model-lifecycle.json` ile karşılaştırır (ağ gerekir; CI'ye bağlanmamıştır). `allowedRetiredInCatalog` bir azaltma kademesidir: yalnızca bir takip konusu ile birlikte giriş ekleyin.                                                                  | Evet                                          |
| `check:fetch-targets`             | İstemci tarafındaki `src/` içinde bulunan her `fetch("/api/...")`, gerçek bir `route.ts` dosyasına çözümlenir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Evet                                          |
| `check:deps`                      | Depodaki her `package.json` dosyasındaki `npm install` ile kurulabilen tüm bağımlılıklar `dependency-allowlist.json` içinde yer alır; yeni sabitlenmemiş veya slopsquatting yapan paketler işaretlenir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Evet                                          |
| `audit:deps`                      | `npm audit` (kök + electron) — yüksek/kritik güvenlik uyarısı yoktur (osv `check:vuln-ratchet` ile örtüşür; Rationalization Backlog'a bakın)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Evet                                          |
| `check:lockfile`                  | `package-lock.json` bütünlüğü — https kayıt defteri, bütünlük karmaları, ana bilgisayar geçersiz kılmaları yok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Evet                                          |
| `check:licenses`                  | Üretim bağımlılıkları için SPDX lisans izin listesi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                          |
| `check:tracked-artifacts`         | Derleme yapıtları / işlenmiş `node_modules` sembolik bağlantıları yok (husky pre-commit içinde de çalışır; pre-push kasıtlı olarak hafiftir — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Evet                                          |
| `check:ai-attribution`            | PR commit'lerinde, başlığında veya gövdesinde yapay zekâ/bot `Co-Authored-By` etiketi ya da yapay zekâ üretimi alt bilgisi yok — 16. Kesin Kural (`quality.yml` içindeki PR→`release/**` için hızlı geçişler döngüsünde — olay yükünü okur, PR dışındayken işlem yapmaz — ve PR→`main` için `ci.yml` lint aşamasında yalnızca PR'lara yönelik bir adım; ayrıca husky `commit-msg` kancası; insan ortak yazarlarına izin verilir; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | Her Vitest hariç tutması bir takip sorununu belirtir ve `config/quality/vitest-exclusions.json` içinde yer alır (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Evet                                          |
| `check:file-size`                 | Kaynak dosyaları (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) `cap` sınırı içinde, test dosyaları (`*.test.ts(x)`) ise `testCap` sınırı içinde kalır; `file-size-baseline.json` içinde dondurulmuş (`frozen` / `testFrozen`) dosyalar, kaydedilen boyutlarını aşacak şekilde büyümemelidir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Evet                                          |
| `check:error-helper`              | Yürütücülerde/işleyicilerdeki hata yanıtları `buildErrorBody()` / `sanitizeErrorMessage()` kullanır (Katı Kural #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Evet                                          |
| `check:migration-numbering`       | Migration SQL dosyaları sıralı olarak numaralandırılmıştır; eksik veya yinelenen numara yoktur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Evet                                          |
| `check:public-creds`              | `publicCreds.ts` dışında gerçek OAuth `client_id`/`client_secret` veya Firebase Web anahtarı yoktur (Katı Kural #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Evet                                          |
| `check:db-rules`                  | `src/lib/db/` modülleri dışında ham SQL yoktur; `localDb.ts` üzerinden barrel import kullanılmaz (Katı Kurallar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Evet                                          |
| `check:known-symbols`             | Dağıtım tablolarında kaydedilen sağlayıcı yürütücüleri, yönlendirme stratejileri ve çeviriciler diskteki dosyalarla eşleşir; sahipsiz veya bildirilmemiş sembol yoktur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Evet                                          |
| `check:route-guard-membership`    | Alt süreç oluşturan her rota `isLocalOnlyPath()` tarafından sınıflandırılır (Katı Kurallar #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                          |
| `check:test-discovery`            | Depodaki her `*.test.ts` / `*.spec.ts` dosyası en az bir test çalıştırıcısı tarafından toplanır (ratchet: `test-discovery-baseline.json` içindeki artık dosyalar listesi yalnızca küçülebilir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Evet                                          |
| `check:test-tla-order`            | `tests/unit` altındaki hiçbir `node:test` dosyası test kaydedip üst düzey bir `await` ifadesine ulaştıktan sonra başka testler kaydetmez (#18045; ratchet: `test-tla-order-allowlist.json` yalnızca küçülebilir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet                                          |
| `check:agent-skills-sync`         | Oluşturulan agent-skills yapıtları kaynak kataloğuyla eşleşir (sapma yoktur)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Sağlayıcı logoları/varlıkları, kaydedilmiş bir kaynak bilgisi girdisi içerir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON yapılandırma dosyaları ayrıştırılır ve depo lint kurallarını karşılar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | Hatasız TypeScript derlemesi (yalnızca bilgilendirme amaçlı uyarılar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Evet                                          |
| `typecheck:noimplicit:core`       | Katı `noImplicitAny` — geleceğe dönük; önceden mevcut birçok çağrı noktası hâlâ açıklama gerektiriyor                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **Bilgilendirme** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, `src/app/(dashboard)/**` kapsamına alınmıştır (#7033) — `typecheck:core`'un seçilmiş 27 dosyalık izin listesinde hiçbir dashboard TSX dosyası bulunmaz ve `next build` de tür denetimi yapmaz (`next.config.mjs`, `ignoreBuildErrors: true` ayarını yapar); bu nedenle buradaki sahipsiz tanımlayıcı gerilemeleri (#6625/#6909) CI tarafından görünmez durumdaydı. Dondurulmuş dosya başına/TS kodu başına sayı taban çizgisiyle karşılaştırır (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` ile aynı eski durum zorunluluğu kalıbı) — yalnızca taban çizgisindeki sayıyı AŞAN YENİ hatalar kapıyı geçirmeyi başarısız kılar; önceden mevcut bir hata düzeltildiğinde `--update` ile kademeli olarak azaltın.                                                                                                                                                                                                                                                                                                               | Evet                                          |
| `check:build-typecheck`           | `tsconfig.build.json` üzerinden (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) tüm uygulamanın üretim tür denetimi; `typecheck:core`'un 27 dosyalık izin listesi ile dashboard kapısının kapsamadığı yüzey. `config/quality/build-typecheck-baseline.json` ile karşılaştırır; dosya ve kod başına yeni veya artırılmış bir sayı başarısız olur, daha düşük bir sayı sizden kademeli azaltma yapmanızı ister. Çalışma yeni veya artırılmış bir çift içeriyorsa `--update` işlemi, `--force-regressions` geçirilmediği sürece reddeder; ayrıca yeni susturulmuş bir dosyayı da `--force-nocheck` geçirilmediği sürece reddeder. Böylece taban çizgisini genişleterek yeşil sonuç elde etmek ile kalıcı bir sessizlik tanımak iki ayrı, bilinçli eylem olur. Yalın bir `--force` reddedilir. Ayrıca derleme kapsamını `config/quality/ts-nocheck-baseline.json` ile karşılaştırarak `@ts-nocheck` kullanımı açısından tarar; çünkü bunu kullanan bir dosya hiçbir tanı bildirimi üretmez ve aksi hâlde her kapı tarafından görünmez olur. | Evet                                          |

#### İki tür denetimi programı farklı yanıtlar verir

`typecheck:core` ve `check:build-typecheck`, farklı seçeneklerle farklı programları
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

| Betik                        | Doğruladığı                                                                                                                                                                                 | Engelleyici                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | `quality-metrics.json` üretir (ESLint uyarı sayısı, birleştirilmiş shard raporundan kapsam)                                                                                                 | Evet (ratchet'ın upstream'i) |
| `quality:ratchet`            | `quality-baseline.json` içindeki her ölçüm gerilememiştir (ESLint uyarıları ≤ baseline; kapsam ≥ baseline)                                                                                  | Evet                         |
| `check:duplication`          | Kod çoğaltması (jscpd@4), `quality-baseline.json` içindeki baseline değerini aşmaz                                                                                                          | Evet                         |
| `check:complexity`           | Dosya düzeyindeki siklomatik karmaşıklık sınırı aşmaz (çekirdek ESLint `complexity` + `max-lines-per-function`)                                                                             | Evet                         |
| `check:cognitive-complexity` | Bilişsel karmaşıklık ratchet'ı (`eslint-plugin-sonarjs`) — ayrı bir ESLint geçişi; CI her ikisini tek `check:complexity-ratchets` adımı olarak birleştirir                                  | Evet                         |
| `check:dead-code`            | Kullanılmayan dışa aktarımlar / dosyalar ratchet'ı (knip), baseline'a göre gerilemez                                                                                                        | Evet                         |
| `check:compression-budget`   | Sıkıştırma kıyaslama bütçesi — motor başına belirteç tasarrufu tabanları gerilememelidir                                                                                                    | Evet                         |
| `check:type-coverage`        | Tür belirtilmiş yüzdesi ratchet'ı (`type-coverage`) gerilemez; büyük ölçüde `typecheck:noimplicit:core` denetimini kapsar                                                                   | Evet                         |
| `check:codeql-ratchet`       | Açık CodeQL uyarı sayısı gerilemez (`gh api` aracılığıyla okunur; belirteç olmadan zarifçe atlanır) — yenileme sıklığı ve manuel tetikleyici için aşağıdaki "CodeQL ratchet" bölümüne bakın | Evet                         |

### İş: `quality-extended`

İşin tamamı danışma niteliğindedir (`continue-on-error: true`). npm tabanlı ratchet'lar
gerçekten çalışır; harici tarayıcılar `gh release download` aracılığıyla yüklenir ve
bir ikili dosya hâlâ mevcut değilse kendilerini atlar (çıkış 0).

| Betik                    | Doğruladığı                                                                                                                                                                                                                 | Engelleyici                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `check:circular-deps`    | Döngüsel bağımlılık yoktur (dpdm)                                                                                                                                                                                           | **Danışma niteliğinde**                                   |
| `check:bundle-size`      | Paket boyutu sınırı aşmaz                                                                                                                                                                                                   | **Danışma niteliğinde**                                   |
| `check:secrets`          | Gizli bilgi taraması (gitleaks) — ikili dosya yoksa atlanır                                                                                                                                                                 | **Danışma niteliğinde**                                   |
| `check:vuln-ratchet`     | Bağımlılık güvenlik açıkları (osv-scanner) gerilemez — ikili dosya yoksa atlanır                                                                                                                                            | **Danışma niteliğinde**                                   |
| `check:workflows`        | İş akışı lint denetimi (actionlint + zizmor); eksik/bozuk tarayıcılar, geçersiz raporlar veya eksik ratchet baseline'ı INCOMPLETE olarak başarısız olur. Geçerli bulgular seçilen strict/danışma/ratchet politikasını izler | Çalıştırma gerekli; CI'da zizmor ratchet'ı engelleyicidir |
| `check:openapi-breaking` | Temel dala kıyasla herkese açık API sözleşmesindeki (`openapi.yaml`) geriye dönük uyumsuz değişiklikler (oasdiff) — `openapiBreaking=N` üretir; oasdiff yoksa veya temel spesifikasyon çözümlenemiyorsa atlanır             | **Danışma niteliğinde**                                   |

### İş: `docs-sync-strict`

`main` dalına açılan her PR'da çalışır. Hata durumunda birleştirmeyi engeller.

| Script                         | Doğruladığı                                                                                                                                                                             | Engelleyici                          |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:docs-all`               | Aşağıdaki 6 alt kapıyı sırayla çalıştıran meta kapı                                                                                                                                     | Evet                                 |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt sürüm tutarlılığı                                                                                                                                         | Evet                                 |
| ↳ `check:docs-counts`          | Düz yazıdaki sayımlar (sağlayıcı sayısı, geçiş sayısı vb.) gerçek sayıların eşik penceresi içinde                                                                                       | Evet                                 |
| ↳ `check:env-doc-sync`         | `.env.example` içindeki her ortam değişkeni bir dokümantasyon tablosunda belgelenir ve bunun tersi de geçerlidir                                                                        | Evet                                 |
| ↳ `check:deprecated-versions`  | Dokümanlarda kullanımdan kaldırılmış sürüm dizeleri yok                                                                                                                                 | Evet                                 |
| ↳ `check:doc-links`            | Dokümanlardaki dahili Markdown bağlantıları gerçek dosyalara çözümlenir (`[text]`/`(path)` biçimi)                                                                                      | Evet                                 |
| ↳ `check:fabricated-docs`      | Dokümanlarda belirtilen rotalar, ortam değişkenleri, CLI komutları, kanca adları ve dosya yolları kod tabanında mevcut. `--strict` ile kesin kapı; bayrak olmadan yumuşak başarısızlık. | Evet (`--strict` aracılığıyla CI'da) |
| `check:cli-i18n`               | CLI komut dizeleri tüm i18n yerel ayar dosyalarında mevcut                                                                                                                              | Evet                                 |
| `check:openapi-coverage`       | OpenAPI belirtimi, gerçek rotaların en az eşiklenmiş tabanını kapsar                                                                                                                    | Evet                                 |
| `check:openapi-security-tiers` | `openapi.yaml` içindeki güvenlik katmanı ek açıklamaları `routeGuard.ts` sınıflandırmalarıyla tutarlıdır                                                                                | **Öneri niteliğinde**                |
| `check:openapi-routes`         | `openapi.yaml` içindeki her yol gerçek bir `route.ts` dosyasına çözümlenir (halüsinasyon karşıtı)                                                                                       | Evet                                 |
| `check:docs-symbols`           | `docs/**/*.md` içindeki her `/api/...` başvurusu gerçek bir `route.ts` dosyasına çözümlenir (halüsinasyon karşıtı)                                                                      | Evet                                 |
| `i18n translation drift`       | i18n yerel ayar dosyalarındaki çevrilmemiş anahtarlar — yalnızca uyarı                                                                                                                  | **Öneri niteliğinde**                |

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

| Script                            | Doğruladığı                                                                                                                                                                                   | Engelleyici           |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `check-ui-keys-coverage` (inline) | UI i18n anahtar kapsamı ≥ %65                                                                                                                                                                 | Evet                  |
| `check-ui-value-drift` (inline)   | Yeniden yazılan bir İngilizce **değer**, geride güncel olmayan bir çeviri bırakmaz                                                                                                            | Evet                  |
| `check-new-key-coverage` (inline) | **Yeni** bir İngilizce anahtar her yerel ayarda çevrilmiştir — `__MISSING__:` işareti reddedilir                                                                                              | Evet                  |
| `check-translation-ratio`         | Yerel ayar başına gerçek çeviri oranı (İngilizceyle aynı / yer tutucu / izin listesi dışındaki eksik öğeler), `config/quality/i18n-translation-baseline.json` + tolerans değerini aşmamalıdır | **Öneri niteliğinde** |

`fetch-depth: 0` gerekir — değer değişimi kapısı, `en.json` dosyasını birleştirme tabanına göre karşılaştırır.

#### `check-ui-value-drift` — güncel olmayan çeviri kapısı

Diğer kapıların yapısal olarak tespit edemediği bir i18n gerilemesini yakalar: İngilizce bir değer
yeniden yazılır ve _önceki_ İngilizceden türetilen çeviriler geride kalır; böylece
İngilizce olmayan kullanıcılar kendinden emin bir dille yazılmış, ancak artık yanlış olan metni okumaya devam eder.

Bu gerçekten kullanıma sunuldu. Antigravity
giriş yardımcısı eklendiğinde `oauthModal.googleOAuthWarning` yeniden yazıldı (#5203); **43 yerel ayarın 39'u** operatörlere "tam URL'yi kopyalayıp
aşağıya yapıştırmalarını" söyleyen metni korudu — bu sağlayıcı için tamamlanamayan bir akış. #8463'e kadar fark edilmedi, çünkü:

- `sync-ui-keys` yalnızca **eksik** anahtarları tamamlar, **eskimiş** olanları hiçbir zaman tamamlamaz;
- `check-ui-keys-coverage` anahtarın _varlığını_ sayar; bu nedenle eski bir çeviri kapsamda sayılır;
- `check-translation-drift`, `docs/i18n/<locale>/**.md` dokümantasyon yansımalarını izler —
  `src/i18n/messages/*.json` dosyalarını hiçbir zaman okumaz. 2026-09 yeniden senkronizasyonundan beri `docs-sync-strict` işinde engelleyici: bir temel dokümanı düzenleyin → `npm run i18n:run -- --files=<doc>` (bölüm düzeyinde, düşük maliyetli).

**Diff-aware, not baseline-backed.** Birleştirme tabanındaki `en.json` ile çalışma ağacını karşılaştırır; İngilizce değeri değişen her anahtar için, hâlâ dokunulmamış bir çeviriyi koruyan yerel ayar eski kabul edilir. Bu yaklaşım, önceden var olan borcu kasıtlı olarak **dondurur** — bir diff, uzun süredir var olan bir çevirinin hangi eski İngilizceden geldiğini ortaya çıkaramaz; bu nedenle kapı yalnızca mevcut değişikliğin dokunduğu şeyleri değerlendirir. Alternatif olan, anahtar başına hash tabanı kullanmak, yaklaşık 600 KB'lık oluşturulmuş bir dosyanın maliyetine yol açardı; bu, mevcut en büyük tabanın 3 katı büyüklüğünde olur ve her i18n PR'ında değişirdi.

Bunu karşılamanın iki yolu vardır:

1. etkilenen çevirileri güncellemek veya
2. bunları `__MISSING__:<new english>` olarak ayarlamak — çalışma zamanı düzeltilmiş İngilizceyi sunar
   (`src/i18n/request.ts::deepMergeFallback`, #7258) ve anahtar çeviri kuyruğuna alınır.

Dizenin **anlamı** değiştiyse, **anahtarı yeniden adlandırmayı** tercih edin: yeni bir anahtar,
eski bir çeviriyi devralamaz. #8463'te kullanılan yöntem budur.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Temel katalog okunamadığında (temel ref'i olmayan sığ klon) `SKIP reason=base-unresolved` ile 0 durum koduyla çıkar; `check-openapi-breaking` ile aynı davranışı gösterir.

### İş: `i18n`

Tam i18n doğrulama matrisi (yerel ayar başına bir iş). İşin tamamı danışma amaçlıdır.

| Betik                           | Doğruladığı şey                    | Engelleyici                                                   |
| ------------------------------- | ---------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Yerel ayar başına çeviri bütünlüğü | **Danışma amaçlı** (işin tamamında `continue-on-error: true`) |

### İş: `pr-test-policy`

Yalnızca pull request'lerde çalışır.

| Betik                  | Doğruladığı şey                                                                                                                                      | Engelleyici |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` veya `bin/` içindeki üretim kodunu değiştiren PR'lar test içermeli veya testleri güncellemelidir (Katı Kural #8)    | Evet        |
| `check:test-masking`   | Değiştirilen test dosyaları net assert sayısını azaltmaz veya `assert.ok(true)` totolojileri eklemez                                                 | Evet        |
| `check:pr-evidence`    | PR gövdesi değişiklik için test/VPS kanıtına atıfta bulunur (PR metnini grep ederek Katı Kural #18'i mekanikleştirir — kırılgandır, Backlog'a bakın) | Evet        |

### İş: `test-vitest`

`build` sonrasında çalışır. Başarısızlık durumunda birleştirmeyi engeller.

| Paket            | Doğruladığı şey                                                     | Engelleyici                                                                                                                 |
| ---------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP sunucusu (110 araç), autoCombo, önbellek — vitest çalıştırıcısı | Evet                                                                                                                        |
| `test:vitest:ui` | UI bileşeni testleri — vitest çalıştırıcısı                         | **Engelleyici** — önceden var olan hatalar `vitest.config.ts` içinde açıkça hariç tutulur; yeni hatalar işi başarısız kılar |

### Gecelik iş akışları (zamanlanmış, danışma amaçlı)

Bunlar bir cron zamanlamasıyla (ve `workflow_dispatch`) çalışır, PR'larda hiçbir zaman çalışmaz. Tümü danışma amaçlıdır.

| İş Akışı               | Doğruladığı                                                                                                                                                                             | Engelleyici |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | rastgele tohum + yüksek çalıştırma sayısıyla fast-check özellik testleri                                                                                                                | **Danışma** |
| `nightly-resilience`   | heap büyüme eşiği, kaos hata enjeksiyonu, k6 yük/soak testleri                                                                                                                          | **Danışma** |
| `nightly-llm-security` | promptfoo enjeksiyon koruması (engelleme modu) + garak probları (sağlayıcı gizli anahtarı olmadan atlanır)                                                                              | **Danışma** |
| `nightly-schemathesis` | canlı bir OmniRoute üzerinde `docs/openapi.yaml` kullanılarak OpenAPI sözleşme fuzzing'i (schemathesis) — belirtim ihlallerini / işlenmeyen 500 hatalarını ortaya çıkarır (Aşama 8 B.4) | **Danışma** |
| `nightly-mutation`     | fast unit lane üzerindeki Stryker mutasyon testi puanı — hayatta kalan mutantlar zayıf assert'leri ortaya çıkarır                                                                       | **Danışma** |
| `nightly-compat`       | desteklenen `engines.node` aralıkları genelinde Node motoru uyumluluk matrisi                                                                                                           | **Danışma** |

Performans temel değerleri (heap, TTFB, derleme süresi) kaydedilir, eşik olarak kullanılmaz: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) dosyasına bakın.

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
