# Resilience Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute üç farklı ancak birbiriyle ilişkili esneklik mekanizması vardır. Her birinin kapsamı ve amacı farklıdır. Yönlendirme davranışında hata ayıklarken bunları ayrı tutun.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Kaynak: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Esneklik geçişleri için Env-vs-dashboard önceliği.** — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — ortamından tohumlanan isteğe bağlı esneklik geçişleri yalnızca _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) sağlar. `resilienceSettings` bir boole varlığını sürdürdü (Kontrol Paneli →** Ayarlar → Esneklik** / `PATCH /api/resilience`, `key_value` içinde saklanır) env değerini kazanır: normalleştirme (`toBoolean`, `src/lib/resilience/settings/normalize.ts`), mevcut olduğu sürece depolanan boole değerini korur. Kontrol panelinin `false` zaten kaydettiği bir dağıtımda böyle bir env var'ı `true` olarak ayarlamak hiçbir şeyi değiştirmez — geçişi çevirir** Ayarlar → Esneklik** (veya saklanan alanı temizleyin).

## 1. Sağlayıcı Devre Kesici (Provider Circuit Breaker)

**Kapsam:** sağlayıcının tamamı (ör. `glm`, `openai`, `anthropic`).

**Amaç:** yukarı akış/servis düzeyinde tekrar tekrar başarısız olan bir sağlayıcıya trafik göndermeyi durdurmak.

**Uygulama:**

- Çekirdek sınıf: `src/shared/utils/circuitBreaker.ts`
- Bağlantılar: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Durum API'si: `GET /api/monitoring/health`
- Sıfırlama API'si: `POST /api/resilience/reset`
- Sarmalayıcılar: `open-sse/services/accountFallback.ts`
- DB tablosu: `domain_circuit_breakers`

**Durumlar:**

- `CLOSED` — normal trafiğe izin verilir
- `DEGRADED` — trafiğe hâlâ izin verilir, ancak artan sağlayıcı hataları izlenir; yeterli sayıda başarı durumunda, geçerli bir bağlantı testinde veya son hata türü için en uzun `OPEN` bekleme süresi (o türün `cooldownByKind` değeri, yoksa `resetTimeout`, × `maxBackoffMultiplier`, en az bir cooldown) boyunca yeni bir hata oluşmadan geçmesi durumunda `CLOSED` durumuna döner
- `OPEN` — sağlayıcı geçici olarak engellenir; combo yönlendirme onu atlar
- `HALF_OPEN` — sıfırlama zaman aşımı doldu; deneme isteğine izin verilir

**Yapılandırılabilir varsayılanlar (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience altında sunulur):**

| Sınıf   | Degraded eşiği | Açılma eşiği | Sıfırlama zaman aşımı |
| ------- | -------------- | ------------ | --------------------- |
| OAuth   | 5 hata         | 8 hata       | 60sn                  |
| API-key | 7 hata         | 12 hata      | 30sn                  |
| Local   | türetilmiş     | 2 hata       | 15sn                  |

`degradationThreshold`, sağlayıcının ne zaman `DEGRADED` durumuna gireceğini; `failureThreshold` ise ne zaman açılacağını ve atlanacağını kontrol eder. Yerel (Local) sağlayıcı profilleri henüz Resilience ayarları sayfasında sunulmamaktadır.

**Tetikleme kodları:** yalnızca sağlayıcı düzeyindeki durumlar `[408, 500, 502, 503, 504]`. Hesap düzeyindeki hatalar için tetikleme YAPMAYIN (çoğu 401/403/429 — bunlar cooldown veya lockout kapsamına girer).

**Tembel kurtarma (lazy recovery):** `OPEN` süresi dolduğunda `getStatus()`, `canExecute()`, `getRetryAfterMs()` durumu `HALF_OPEN` olarak yeniler. Aynı okumalar (ve bir sonraki hata), bayatlamış bir `DEGRADED` durumunu `CLOSED` durumuna geri düşürür. Arka plan zamanlayıcısı gerekmez.

---

### İsteğe bağlı genel Sağlayıcı Cooldown'u (pencere kapısı)

Dördüncü, **isteğe bağlı** bir katman (`PROVIDER_COOLDOWN_ENABLED`, varsayılan **kapalı**),
başarısız olan sağlayıcıların istekler arası hafızasını
`open-sse/services/providerCooldownTracker.ts` içinde tutar; combo hedef
çözümlemesi tarafından kullanılarak, art arda gelen combo isteklerinin az önce
başarısız olmuş bir sağlayıcıyı tekrar tekrar denemesi engellenir. Sağlayıcı düzeyindeki
kayıtlar, `PROVIDER_PROFILES` pencere kapısına uyar:

| Profil  | tetikleme eşiği (`providerFailureThreshold`) | pencere (`providerFailureWindowMs`) | cooldown süresi (`providerCooldownMs`) |
| ------- | -------------------------------------------: | ----------------------------------: | -------------------------------------: |
| OAuth   |                                         `10` |                             `15min` |                                 `5min` |
| API key |                                         `15` |                             `30min` |                                `10min` |

Eşiğin altında sağlayıcı cooldown'da **sayılmaz**; bir başarı pencereyi temizler.
Bağlantı düzeyindeki kayıtlar (`provider:connectionId`) bunun yerine üstel
`minRetryCooldownMs → maxRetryCooldownMs` geri çekilmesini kullanmaya devam eder. Geçersiz kılmalar:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regresyon koruması: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Bağlantı Bekleme Süresi

**Kapsam:** tek sağlayıcı connection/account/key.

**Amaç:** Aynı sağlayıcının diğer bağlantıları hizmet vermeye devam ederken hatalı bir anahtarı atlayın.

**Uygulama:**

- Kullanılamıyor olarak işaretle: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seçim: aynı dosyada `getProviderCredentials*`
- Bekleme süresi hesabı: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ayarlar: `src/lib/resilience/settings.ts`

**Bağlantı başına alanlar:**

- bekleme süresi dolana kadar `rateLimitedUntil` — zaman damgası
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — üstel geri çekilme sayacı

**Varsayılan bekleme süreleri:**

- OAuth tabanı: 5s
- API anahtarı tabanı: 3 sn
- API anahtarı 429: yukarı akış `Retry-After`/reset headers/parseable sıfırlama metnini tercih eder
- Geri çekilme: `baseCooldownMs * 2 ** failureIndex`

**Sağlayıcı başına yeniden deneme gecikmesi.** Sağlayıcı ayrıntı sayfasında bir** Gecikmeyi yeniden dene** (Otomatik, 15 saniyeden 1 saate kadar) seçeneğini seçin. `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` kaydeder (1–21600, `PATCH /api/resilience` aracılığıyla). Hız sınırı hatası herhangi bir yukarı akış yeniden deneme ipucu taşımadığında, bu değer sağlayıcı için ölçeklendirilmiş geri çekilmenin yerini alır ve `backoffLevel` 0'a (`open-sse/services/rotationConfig.ts::overrideFor`) sıfırlar. Hız sınırlı hatanın önceliği, önce en yüksek: yukarı akış yeniden deneme ipucu, ardından bağlantı başına `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, ardından sağlayıcı başına yeniden deneme gecikmesi, ardından env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` ve ardından ölçeklendirilmiş geri çekilme. Alanı otomatik olarak kaldırır. Yalnızca hız sınırı nedenini etkiler, hiçbir zaman terminal durumlarını etkilemez.

**Gök gürültüsüne karşı sürü koruması:** Bekleme süresinin aşırı uzatılmasından veya `backoffLevel` iki kez arttırılmasından kaynaklanan eşzamanlı arızaları önler.

**Eşzamanlılık sınırı 429'lar geri çekilme merdivenini tırmanmaz.** Bünyesinde bir eşzamanlılık sınırı rapor eden bir `429` ("çok fazla eşzamanlı istek", "eşzamanlılık sınırı", "paralel istek sınırı", GLM `并发数过高`) hesabın sağlıklı ancak meşgul olduğu anlamına gelir. `checkFallbackError()` `concurrency_limited` nedenini döndürür: şimdi bir sonraki bağlantıya geçin, bunu sabit bir `CONCURRENCY_LIMIT_COOLDOWN_MS` (1'ler) veya yukarı akış yeniden deneme ipucu için soğutun, `backoffLevel` değiştirmeden tutun ve `skipProviderBreaker` ayarlayın. Açık bir kota gövdesi yine de kazanır, dolayısıyla kota modeliyle de eşleşen bir gövde kota kararı olarak kalır. Algılama: `src/shared/utils/classify429.ts` `looksLikeConcurrencyLimit()` ; karar: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (kırıcının `FailureKind`) değişmemiştir ve bu gövdeler için hâlâ `rate_limit` okur.

**Akış içeriği duraklamaları hesabı soğutmaz.** İçerik duraklaması gözlemcisi (`open-sse/utils/streamHandler.ts`) zamanında hiçbir model çıkışı göndermeyen bir akıştan vazgeçtiğinde, `markAccountUnavailable()` bağlantıdaki hatayı kaydeder ancak bekleme süresi belirlemez: duraklama bu isteğe aittir, çoğunlukla henüz çıktısı olmayan uzun bir akıl yürütme dönüşüdür. Operatörler `resilienceSettings.streamStallCooldown.enabled` (varsayılan `false`) ile tekrar kaydolabilirler.

**`p2c` hesap seçimi için gecikme sinyalini etkinleştirin.** Gönderilen her deneme, ilk bayta kadar geçen süreyi ve bağlantı başına (ve bağlantı + modeli başına) sonucunu bir bellek içi geçiş penceresinde kaydeder: 15 dakika içindeki son 20 örnek (`open-sse/services/connectionLatencyTracker.ts`, `safeLogEvents()` `src/sse/handlers/chatHelpers.ts` kaydedilir). `resilienceSettings.p2cLatency.weight` `0` üzerinde olduğunda (0-20 aralığı, varsayılan `0` = kapalı), `src/sse/services/auth.ts` `compareP2CConnections()` çiftin her adayına `weight` puanı ekler. Bunun yarısı, daha hızlı olan adaya oranla gecikmeden (iki kat daha yavaş, tam yarıyı alır) ve yarısı da yuvarlanma hatası oranından gelir. Bu terim yalnızca her iki adayın da en az 3 örneğe sahip olması durumunda geçerlidir; dolayısıyla yeni hesaplar cezalandırılmaz ve tavanı, kota bloke edilen ve kotası tükenen cezaların altında kalır. Kendine ait bir devre eklemez: Arızalı hesaplar hâlâ bekleme süresi, kilitleme ve devre dışı bırakma katmanları tarafından yönetilir. `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` ile ayarlayın.

**Akıl yürütme çerçeveleri içerik duraklama bütçesini yeniden başlatır.** Bir akıl yürütme modeli, ilk görünür belirtecinden önce dakikalarca düşünebilir: Claude düşünme metni boş olabilecek `thinking_delta` çerçevelerini akıtır ve Yanıtlar API bir akıl yürütme öğesini birbiri ardına akıtır. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) bu kareleri tanır ve gözlemci, dönüşü iptal etmek yerine her biri için bütçesini yeniden başlatır. Bunlar hala model çıktısı değil, dolayısıyla yalnızca akıl yürütmeyle biten bir dönüş hala boş olarak bildiriliyor ve akıl yürütmeyi durduran ve yalnızca kalp atışı gönderen bir dönüş yine de bekçi köpeğini şaşırtıyor.

Kiro boş olmayan imzaya sahip ikili `reasoningContentEvent` çerçeveleri, yürütücü aracılığıyla bu muhakeme faaliyetini boş bir `reasoning_content` deltası olarak korur. İmza iletilmiyor. Meta veriler, eksik çerçeveler ve boş imzalar içerik bütçesini yeniden başlatmaz; bağımsız aktif akış zaman aşımı ve istemci iptali hala geçerlidir (`open-sse/executors/kiro/reasoning.ts`).

**Terminal durumları (NOT bekleme süreleri):**

- `banned` — yasaklı anahtar kelime/hesap yasağı tespiti (bkz. [BAN_DETECTION](../security/BAN_DETECTION.md) ) ve istek başına üç ardışık yukarı akış reddi ile ayarlanır (`request_rejected`, örneğin Anthropic OAuth 403 "İsteğe izin verilmedi" — `open-sse/services/requestRejectedStreak.ts`); tek bir reddetme yalnızca bağlantıyı soğutur
- `expired` (sınırlı yeniden denemelerden sonra terminale geçişler — `EXPIRED_RETRY_MAX = 3` üstel geri çekilme ile — böylece geçici OAuth hataları hesap kalıcı olarak devre dışı bırakılmadan önce kendi kendini onarabilir)
- `credits_exhausted`

Bunlar, kimlik bilgileri değişene veya operatör bunları sıfırlayana kadar devam eder. Geçici soğuma durumuyla terminal durumlarının üzerine yazmayın.

**Tembel iyileşme:** `rateLimitedUntil` sona erdiğinde bağlantı tekrar uygun hale gelir. Başarılı kullanımda `clearAccountError()` tüm hata alanlarını temizler.

### Claude OAuth kullanım duvarı: düşük öncelikli şerit + oturum sınırı sıfırlama

**Kapsam:** bir Claude aboneliği (OAuth) bağlantısı. Her iki özellik de** bağlantı başına katılım** ( → Claude bölümünü → `lowPriorityMode` / `autoLimitReset` bağlantısını `providerSpecificData` içinde düzenleyin, her ikisi de varsayılan olarak kapalıdır) ve Claude Code'un `/low-priority` ve `/limit-reset` komutlarını yansıtın ( Claude Code 2.1.263'ten alınan banka sözleşmesi).

**Uygulama:**

- Durum makinesi + yanıt sınıflandırması: `open-sse/services/claudeLowPriority.ts`
- status/claim istemcisini sıfırlayın: `open-sse/services/claudeLimitReset.ts`
- Yürütücü kancası (başlık enjeksiyonu + aynı hesabın yeniden denemesi): `open-sse/executors/base.ts::execute()`
- Etkinleştirme kalıcılığı: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Tetiklemek:** başlıkları `anthropic-ratelimit-unified-status: rejected` taşıyan 5 saatlik kullanım duvarı — a `429` ve hesap uygun olduğunda `anthropic-ratelimit-unified-slow-offer: treatment`. 429 numaralı ilk duvarın önüne hiçbir şey gönderilmez; birleşik başlıklara sahip olmayan bir patlama 429, normal bekleme süresi yolundan geçer.

**Düşük öncelikli şerit** (`lowPriorityMode`):

- 429 numaralı duvarda icracı teklifi kabul eder ve hemen yeniden deneme yapar.** Aynı** `anthropic-usage-limit: slow` ile hesap; şerit, duyurulan `anthropic-ratelimit-unified-reset` (+ 60s ödemesi) kadar aktif kalır ve bu penceredeki her istek, başlığı taşır. Ele geçirilen 429 hiçbir zaman `handleChatCore` ulaşmaz, dolayısıyla bağlantı** Olumsuz** bekleme süresine girer ve döndürülmez.
- sonraki yanıtlarda `anthropic-ratelimit-unified-slow-status` : `active` / `not_needed` şeridi koruyun; `slot_busy` (429) veya bir `529` sunucunun `anthropic-ratelimit-unified-slow-retry-after` bekleyin (varsayılan 20 saniye, kıskaç 5-600 saniye, ±%30 titreşim) ve `anthropic-ratelimit-unified-slow-max-wait` (varsayılan 20 dakika, kıskaç 1 dakika – 6 saat) — ile sınırlanarak şerit bitiminden sonra ve 10 dakikalık bir bekleme süresi yeniden kabulü bloke ederek yeniden deneyin. Bekleme ayrıca, isteğin kendi yukarı akış başlangıç zaman aşımından (`resolveFetchStartTimeout`, varsayılan olarak 10 dakika) geriye kalan değer eksi 5 saniyelik bir kenar boşluğu ile sınırlandırılır: bu sınır olmadan, 20 dakikalık varsayılan maksimum bekleme, istekten daha uzun süre dayanır ve uyku, beklemenin ortasında iptal edilir ve zarif `max_wait` end + soğuma yerine bir `TimeoutError` ortaya çıkar.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h pencere geçişi veya `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ücretli fazlalık artık duvarı kapladığından herhangi bir durumda `extra_usage` olarak sona erer) şeridi sonlandırın; yanıt daha sonra normal soğuma yoluna akar. `budget_exhausted` açıklanan bütçe sıfırlanana kadar hatırlanır (≤ 8 gün).
- Duvar kontrolü, uygulayıcının kendi 400 güdümlü intra-girişim yeniden denemesinden (bağlam düzenleme, thinking/effort kelepçeleri, param otomatik öğrenme) sonra çalışır, böylece soğuma yoluna ulaşmak yerine yalnızca bu yeniden denemelerden birinde yüzeye çıkan bir duvar (429) hala durdurulur.
- Durum, bağlantı başına bellektedir (yeniden başlatma, yeniden kabul için ekstra bir duvar 429'a mal olur).

**Oturum sınırı sıfırlama** (`autoLimitReset`, her ikisi de açıkken şeritten önce denendi):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` bloğu; `arm: "reset"` ve `available: true` olduğunda, `{ "program": "juniper_tide" }` ile `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ( `providerSpecificData.organizationUUID` UUID organizasyonu, önyükleme geri dönüşü).
- `result: reset|not_limited` → istek tam hızda yeniden denenir (yavaş başlık yok). `already_used` / `not_offered` notu `next_available_at` (varsayılan bir hafta); herhangi bir başarısızlık 15 dakika geriler. Sıfırlama haftada bir kez yapılır ve yine de haftalık sınıra dahil edilir.

Regresyon korumaları: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Oturum benzeşimi (#7274)

**Kapsam:** bir bağlantıya sabitlenmiş bir istemci oturumu (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` başlığı)** herhangi** sağlayıcı.

**Amaç:** istekler arasında çok yönlü bir aracıyı (Claude Code, yardımcı, özel aracılar) aynı hesapta tutarak hesaplar arası bağlam kaybını ve hesap başına oturum durumu olan sağlayıcılarda tekrarlanan soğuk başlatma 429'ları azaltır.

**Uygulama:**

- TTL çözünürlüğü: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Başlık çıkarma (genel, herhangi bir sağlayıcı): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Kalıcı pin tablosu: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ayar: `sessionAffinityTtlMs` (ms cinsinden global TTL, `0` devre dışı bırakılır) — `src/lib/db/settings.ts`. Önceden yapılandırılmış herhangi bir Codex TTL yeni varsayılan olarak taşıyan `124_generic_session_affinity_ttl.sql` geçişiyle Yalnızca Codex `codexSessionAffinityTtlMs` yeniden adlandırıldı.

#7274'ten önce `resolveSessionAffinityTtlMs()`, `codex` dışındaki tüm sağlayıcılar için `0` sabit bir şekilde bağlanıyordu; bu nedenle, sabitleme mekanizması ve başlık çıkarma zaten sağlayıcıdan bağımsız olmasına rağmen TTL ayarının (ve oturum başlıklarının) başka hiçbir yerde etkisi yoktu. Düzeltme bu erken dönüşü ortadan kaldırdı; TTL artık küresel olarak `0` üzerinde ayarlandığında her sağlayıcı için aynı şekilde geçerlidir.

Üç oturum benzeşimi başlığı hiçbir zaman yukarı akışa iletilmez — uygulayıcıları, istemci üstbilgilerini aktarmak yerine kendi yukarı akış başlıklarını sıfırdan oluşturur, dolayısıyla bu yalnızca dahili bir korelasyon kimliği olarak kalır.

### Özel yönetilen oturum bağlantı kiralamaları

**Kapsam:** etkin bir yönetilen HTTP client/session bir uygun OmniRoute bağlantısına sahiptir.

**Amaç:** İstekler arasında sert bir yönlendirme çitine ihtiyaç duyan istemciler için dayanıklı, özel bağlantı sahipliği sağlayın. Bu, yumuşak süreklilik tercihi olan oturum benzeşiminden farklıdır: özel bir kiralama, SQLite yaşam döngüsü durumunu sürdürür, küresel aktif sahip ve aktif bağlantı benzersizliğini zorlar ve sağlayıcı gönderiminden önce eski bir nesli reddeder.

Bu özellik, API anahtarı başına etkinleştirilebilir. Yönetilen bir anahtarın `lease:exclusive` kapsamına ve açık, boş olmayan bir `allowedConnections` listesine sahip olması gerekir. Herhangi bir HTTP istemcisi yaşam döngüsü uç noktasını kullanabilir; istemci adı, kullanıcı aracısı, sağlayıcı, OAuth yöntemi veya modeli gerekmez. Kira sözleşmesi bir modele değil bir bağlantıya sahiptir; bu nedenle, bağlantı normalde uygun kalırken model değişikliği bağlayıcılığı korur. Normal model, kota, sistem durumu, bekleme süresi ve izin verilenler listesi kuralları geçerli olmaya devam eder ve aynı nesli başka bir ücretsiz uygun bağlantıya geçirebilir.

Yaşam döngüsü, JSON eylemleri `acquire`, `renew` ve `release` ile `POST /api/v1/session-leases`. Yönetilen çıkarım istekleri, opak `X-OmniRoute-Lease-Owner` değerini ve tam `X-OmniRoute-Lease-Generation` sunar. Sahibi `vlo_` ve ardından 43 base64url karakterini kullanıyor; yalnızca SHA-256 karması saklanır. Her son gönderim çiti aynı zamanda kimliği doğrulanmış API anahtarını ID ve aktif bağlantı ID de bağlar. Kira kontrolü başlıkları günlüklerden, tutulan istek anlık görüntülerinden ve yukarı akış yürütücü başlıklarından kaldırılır.

Sıradan yönlendirmede uygun yönetilen adaylar varsa ancak her ücretsiz aday yabancı bir aktif kiralama tarafından kullanılıyorsa OmniRoute, HTTP `429`, kiralama kapasitesi kullanılamıyor kodunu, kapasite için bekleme durumunu ve ilgili en erken geçerlilik süresinden türetilen sınırlı bir `Retry-After` döndürür. Sıradan boş uygunluk, kira çekişmesi değildir ve mevcut yönlendirme hatası anlamını korur.

İlgili mekanizmalar ayrı kalır:

- OAuth oturum doluluğu, OAuth hesapları için süreç yerel yumuşak dağıtımıdır.
- Hesap semaforları istek-eşzamanlılık izinlerini verir ve istek tamamlandığında sona erer.
- Özel yönetilen oturum kiralamaları, nesil çiti ile dayanıklı yaşam döngüsü mülkiyetidir.

---

## 3. Model Kilitleme

**Kapsam:** sağlayıcı + bağlantı + model üçlüsü.

**Durum koduna göre anahtar kapsamı:** başarısız olan durum kodu, bir kilidin hangi anahtara yazılacağına karar verir (`open-sse/services/accountFallback/exactModelLock.ts` içindeki `resolveLockoutScope()`):

- `429` / `403` / `402` — bir kota veya yetkilendirme sinyali — **kota ailesini** kilitle:
  codex için tüm `codex` / `spark` kapsamı (bağlantının her `gpt-5*` modeli),
  diğer sağlayıcılar için `getQuotaScopedModelForProvider()`.
- `404` yalnızca modelin kendisini kilitler (`getModelLockKey()`, `not_found` durumunu daraltır).
- Diğer tüm durumlar — `5xx` taşıma/sunucu hataları ve OmniRoute'un kalite doğrulamasından kendisinin ürettiği `502` — yalnızca **tam** sağlayıcı/bağlantı/model üçlüsünü kilitler. Tek bir modeldeki bozuk bir akış, hesabın kotası hakkında kanıt değildir; bu kuraldan önce `codex/gpt-5.6-luna` üzerindeki tek bir boş yanıt, kotaya hiç dokunulmamışken o bağlantının tüm `gpt-5*` modellerini 2–30 dakika (kademeli artarak) yönlendirme dışına çıkarıyordu.
- Çağıranın açık `scope` seçeneği her zaman önceliklidir (Antigravity `"exact"` gönderir).

**Amaç:** yalnızca tek bir model kullanılamaz veya kota sınırlı durumdayken tüm bağlantıyı devre dışı bırakmaktan kaçınmak.

**Örnekler:**

- Model başına kota uygulayıp 429 döndüren sağlayıcılar
- Eksik bir model için 404 döndüren yerel sağlayıcılar
- Sağlayıcıya özgü mod/model izin hataları (ör. Grok modları)

**Uygulama:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Bekleme Süreleri Panosu (v3.8.0)

Arayüz: Ayarlar → Model Bekleme Süreleri (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Etkin kilitleri şu bilgilerle listeler: provider, connection, model, reason, expiresAt. Operatörler kart üzerinden bir modeli elle yeniden etkinleştirebilir.

**REST API:**

- `GET /api/resilience/model-cooldowns` — etkin kilitleri listeler
- `DELETE /api/resilience/model-cooldowns` — elle yeniden etkinleştirme. Gövde: `{provider, connection, model}`. Kimlik doğrulama: management.

### Bekleme Süresi Yöneticisi

Arayüz: İzleme → Bekleme Süresi Yöneticisi (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Her sağlayıcı sayfasını tek tek açmak yerine, geçici bir nedenle yönlendirme dışında kalan her bağlantı için tek bir sayfadır. Bağlantı bekleme sürelerini, model kilitlerini ve nihai durumları listeler; bunları bağlantı başına, bir seçim için veya bir sağlayıcının tüm bağlantıları için temizler ve en sık ayarlanan bekleme süresi kurallarını düzenler: `streamStallCooldown.enabled` ile OAuth / API-key `connectionCooldown` temel bekleme süresi ve maksimum geri çekilme adımları (`PATCH /api/resilience` aracılığıyla kaydedilir). Nihai durumlar (`banned`, `expired`, `credits_exhausted`) listelenir ancak burada asla temizlenmez.

**REST API** (`src/lib/resilience/cooldownManager.ts`, kimlik doğrulama: management):

- `GET /api/resilience/cooldowns[?provider=]` — durum, kalan bekleme süresi, geri çekilme seviyesi, son hata türü ve model kilitleriyle birlikte bağlantılar (kimlik bilgileri olmadan)
- `POST /api/resilience/cooldowns` — gövde `{connectionIds: string[]}` veya `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` döndürür

### Kilitleme ayarları arayüzü + başarıyla azalan kurtarma (v3.8.23)

Model kilitleme, her zaman açık ve sabit kodlanmış bir davranıştan, kendi ayar kartına ve kendi kendini iyileştiren bir kurtarma yoluna sahip, tamamen yapılandırılabilir ve isteğe bağlı (opt-in) bir özelliğe dönüştü.

**Ayar kartı:** Ayarlar → Model Kilitleme
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Bu kart, yukarıdaki salt okunur `ModelCooldownsCard` bileşeninden **farklıdır** (o yalnızca etkin kilitleri _listeler_) — yeni kart _parametreleri yapılandırır_. Varsayılanlar `DEFAULT_MODEL_LOCKOUT_SETTINGS` içinde tanımlıdır
(`src/lib/resilience/modelLockoutSettings.ts`):

| Ayar                    | Varsayılan                       | Anlam                                                                    |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Ana anahtar — model kilitleme **varsayılan olarak kapalıdır**.           |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model kapsamlı bir hata olarak sayılan yukarı akış durum kodları.        |
| `baseCooldownMs`        | `120_000` (120 sn)               | İlk hata için başlangıç kilitleme süresi.                                |
| `maxCooldownMs`         | `1_800_000` (30 dk)              | Kademelendirilmiş bekleme süresinin üst sınırı.                          |
| `maxBackoffSteps`       | `10`                             | Maksimum üstel geri çekilme kademesi sayısı.                             |
| `useExponentialBackoff` | `true`                           | Yinelenen hataların bekleme süresini üstel olarak artırıp artırmayacağı. |

Ayarlar normal ayar deposu aracılığıyla kalıcı olur ve dayanıklılık ayarları şemasıyla doğrulanır; kart `baseCooldownMs`/`maxCooldownMs` değerlerini (`maxCooldownMs ≥ baseCooldownMs` olacak şekilde) ve `maxBackoffSteps` değerini sınırlar.

**Başarıyla azalan kurtarma:** kurtarma **yalnızca** zamanlayıcının dolması değildir. Sağlıklı bir yanıt, modelin hata sayısını geriye doğru azaltır; böylece pencerenin ortasında iyileşen bir model, zamanlayıcısı dolmadan önce kademe artışını durdurur (ve kilidi kalkar). Başarılı bir combo hedefinde `open-sse/services/combo.ts`, `decayModelFailureCount()` fonksiyonunu çağırır (`open-sse/services/accountFallback.ts`); bu fonksiyon saklanan `failureCount` değerini **yarıya indirir** (`Math.floor(failureCount / 2)`); değer `0`'a ulaştığında kilit kaydı tamamen silinir. Karşıt fonksiyon `recordModelLockoutFailure()` ise kademelendirme penceresi içindeki hatalarda sayacı artırır (ve bekleme süresini kademelendirir). Bu başarı-azalışı, düz zamanlayıcı dolmasına ek olarak çalışır — iki yol da bir modeli yeniden etkinleştirebilir.

**Durum:** kilitler **bellekte** tutulur (`provider:connectionId:model` anahtarlı `ModelLockoutEntry` içeren işlem başına `Map`ler; tam kapsamlı kilitler `provider:connectionId:exact:model` anahtarlı), veritabanına kalıcı olarak yazılmaz — yeniden başlatmada kaybolurlar. _Ayarlar_ kalıcıdır; etkin kilit _durumu_ geçicidir.

---

## 4. Kota Paylaşımlı Eşzamanlılık Denetimi (v3.8.36)

Abonelik hesapları (GLM, MiniMax vb.) genellikle yalnızca ~1–3 eşzamanlı
isteği kabul eder; bu sınırın aşılması 429 hatalarını ve bekleme sürelerini
tetikler. Bu durum, birden fazla API anahtarının aynı üst hesapla paylaşıldığı
**kota paylaşımlı** (`qtSd/…`) kombinasyonlarda özellikle kritiktir. Üç katman,
paylaşılan bir hesabın isteklerle aşırı yüklenmesini önler.

### Bağlantı başına eşzamanlılık sınırı (`max_concurrent`)

Her sağlayıcı bağlantısı bir `max_concurrent` üst sınırı tanımlayabilir
(`provider_connections.max_concurrent`, bağlantı modalında / API'de / DB'de
ayarlanır). Sınırsız olması için boş bırakın. Bu, aşağıdaki serileştirme
katmanını yönlendiren tek ayardır — değeri hesabın gerçek eşzamanlılık
kapasitesine ayarlayın (ör. GLM ~1, MiniMax ~2).

### Model başına eşzamanlılık sınırları (`modelConcurrency`)

Bir bağlantı, `rateLimitOverrides` haritası içinde model başına kesin
eşzamanlılık üst sınırları da tanımlayabilir:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Bunu bağlantı modalında (**Rate limit overrides → Per-model
concurrency caps**, satır başına bir `model=cap`) veya aynı JSON yapısıyla
`PATCH /api/providers/[id]` üzerinden ayarlayın. Anahtarların anlamları:

- **Bağlantı geneli ve modele özgü:** `maxConcurrent`, bağlantı genelindeki
  paylaşılan üst sınır olmaya devam eder. Her ikisi de uygulandığında, aynı
  bileşik geçitte (`global → provider → account → model`) her iki kapı da
  atomik olarak edinilir; etkin davranış, uygulanabilir daha katı sınırdır.
- **Tam model anahtarı eşleşmesi:** Anahtar, yönlendirme çözümlemesinden sonra
  yürütücüye aktarılan model dizesidir — normalde istemci tarafındaki
  `provider/model` takma adı (`zai/glm-5`, `glm-5` ile eşleşmez) değil, yalın
  üst model kimliğidir (`glm-5`). Değerler, pozitif tamsayı cinsinden
  eşzamanlı istek üst sınırlarıdır.
- **Yerel kuyruğa alma, keşif yok:** Fazla istekler mevcut kuyruk/zaman aşımı
  semantiğiyle yerel olarak kuyruğa alınır (tiplendirilmiş
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` kabul hataları). OmniRoute,
  üst akış politikasını keşfetmez veya çıkarmaz — operatörün yapılandırdığı
  kesin sınırları uygular. Dolu bir model geçidi sağlayıcıyı hiçbir zaman
  devre dışı bırakmaz ve kalıcı bir model kilitlenmesi oluşturmaz; üst akış
  429/bekleme süresi/geri dönüş davranışı hata durumundaki güvenlik ağı olarak
  kalır.
- **Bağlantı başına, işlem başına kapsam:** Sınırlar veritabanı bağlantısı
  başınadır ve bellekte tutulur; bu nedenle aynı üst akış API anahtarını
  yeniden kullanan iki bağlantı birbirleriyle koordinasyon kurmaz.
- **Yapılandırılmamış olması değişiklik yapmaz:** Haritanın atlanması (veya
  kontrol paneli alanının boş bırakılması) model geçidi eklemez. Herhangi bir
  evrensel sağlayıcı sınırı varsaymadan örnek yapılandırma:

```text
glm-5=1
glm-4.7=3
```

### Kota paylaşımlı istek serileştirmesi

Kota paylaşımlı dağıtım, pozitif bir `max_concurrent` tanımlayan bir bağlantıyı
hedeflediğinde, ilgili **hesaba** yönelik eşzamanlı istekler bağlantı başına
bir semafor (`qsconn:<connectionId>` anahtarı) üzerinden serileştirilir: fazla
istekler hesabı aşırı yüklemek yerine **kuyrukta bekler**. Bu mekanizma
**fail-open** çalışır — doymuş bir kuyruk veya zaman aşımı, dağıtılabilir bir
isteği hiçbir zaman reddetmek yerine yuva olmadan devam eder. Ayar şu konumdan
değiştirilebilir: **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`,
varsayılan açık). `max_concurrent` sınırı olmadan davranış değişmez.

> Kota paylaşımlı yönlendirme geçidi (`selectQuotaShareTarget`, DRR + P2C)
> kendisi de **fail-open** çalışır ve yalnızca kapasite sınırına ulaşmış bir
> bağlantının önceliğini azaltır — tek bağlantılı bir havuzda kesin bir sınır
> uygulayamaz; dolayısıyla taşmayı fiilen kontrol eden mekanizma bu semafordur.

### Kombinasyon bekleme süresini dikkate alan yeniden deneme

Etkin olduğunda, her kombinasyon stratejisi için, kısa süreli geçici bir bekleme
süresinde 429 oluşturacak bir istek, 429'u döndürmek yerine bekleme süresinin
dolmasını bekler ve yeniden dağıtılır — bu, çok modelli kombinasyonlarda
Gemini sınıfı TPM/RPM pencerelerini (~60 saniyelik retry-after) kapsar; örneğin
2 modelli bir kombinasyonun her iki hedefi de model başına hız sınırına
ulaştığında. Bu davranış, **Settings → Resilience** içindeki
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ile
sınırlandırılır. `quota_exhausted` (gece yarısına kadar kilitli) veya
kimlik doğrulama/bulunamama nedenleri için hiçbir zaman beklemez.

Bir kombinasyon `config.comboCooldownWaitEnabled: false` ile kapsam dışı
bırakılabilir. Yalnızca gerçek `false` değeri, bu paylaşılan kombinasyon
beklemelerini (dağıtım sonrası bekleme süresi ve dağıtım öncesi devre açık/model
kilitli beklemeleri) ve bekleme bütçesi zaman aşımı tabanının genişletilmesini
devre dışı bırakır. Eksik değer veya `true`, genel politikayı korur; `true`,
genel olarak devre dışı bırakılmış beklemeyi etkinleştiremez. Açıkça belirtilen
`targetTimeoutMs` yine önceliklidir. Bu kapsam dışı bırakma, ayrı yerel-Codex
tur sabitleme dağıtım öncesi beklemesini değiştirmez.

Aynı geçit, dağıtım öncesi durumu da kapsar (#16319): bir kombinasyonun her
hedefi, herhangi bir deneme yapılmadan önce modeli kısa süreli geçici bir
kilitlenme içinde olduğu için atlandığında, sıfır denemeli yol, kilitlenmenin
sona ermesini aynı üst sınırlar altında bekler ve ipuçsuz
`503 ALL_TARGETS_SKIPPED` yanıtı vermek yerine yeniden dağıtım yapar. Beklemeye
izin verilmediğinde (üst sınır, deneme veya bütçe tükendiğinde ya da özellik
devre dışı olduğunda), terminal yanıt, en erken geçici kilit sona erme
zamanından alınan `retry_after` / `reset_at` değerlerini içeren
`429 rate_limit_error` yanıtına yükseltilir; kota, kimlik doğrulama ve
bulunamayan kilitleri ipuçsuz 503 yanıtını korur.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. İstek Kuyruğu Kabul Kontrolü (v3.8.49 · issue #6593)

**Kapsam**: sağlayıcı+bağlantı başına yerel hız sınırı kuyruğu (`open-sse/services/rateLimitManager.ts`,
Bottleneck tarafından desteklenir), yukarıdaki üç mekanizmanın bir katman altında.

**`maxWaitMs` kuyruk beklemesini sınırlar; `executionMaxWaitMs` yürütmeyi sınırlar.**
İkisi bilinçli olarak ayrıdır ve hiçbiri diğerini beslemez.

`resilienceSettings.requestQueue.maxWaitMs` **kuyruk-bekleme bütçesidir**: bir
sağlayıcı yuvasını beklemeyi ve ardından QUEUED durumunda oturmayı kapsar; iş
QUEUED durumundan çıkıp yürütülmeye başladığı anda zamanlayıcısı temizlenir
(`rateLimitManager.ts`, `wrappedFn`). Bunu aşan bir istek asla yukarı akışa
ulaşmaz. Varsayılan 30000ms olup `src/lib/resilience/settings.ts` içindeki
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` tarafından sağlanır ve
`tests/unit/ratelimit-admission-control-6593.test.ts` tarafından sabitlenir;
dolayısıyla burada yapılacak bir değişiklik, bu paragrafın sessizce güncelliğini
yitirmesi yerine o testi kırmızıya döndürür.

`resilienceSettings.requestQueue.executionMaxWaitMs`, Bottleneck'in iş `expiration`
değeri olarak aldığı şeydir; zamanlayıcısı yalnızca gönderimden sonra başlar.
Kendi yukarı akış zaman aşımı olmayan yürütücüler için bir güvencedir ve
yürütücünün kendi fetch-başlangıç zaman aşımı daha uzunsa o değere yükseltilir;
böylece sağlıklı, devam eden bir yanıtı kesemez. Varsayılan 600000ms (10 dk).

Kuyruk bütçesinin `expiration` değerine beslenmesi, artımlı olmayan ağ
geçitlerini eskiden uçuş ortasında öldüren şeydi — ilk baytlardan önce meşru
olarak dakikalarca çalışırlar — ve bir expiration'ın `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) olarak yüzeye çıkarılmasının, kuyruk
bütçesinin ise kuyruk-zaman-aşımı kodunu taşımasının nedeni budur. İkisinden
birini `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (ortam değişkeni) veya pano
(**Settings → Resilience**) üzerinden geçersiz kılabilirsiniz. İkisi de
normalleştirilirken 1ms–24 saat aralığına kırpılır.

**Her ikisi için öncelik:** ortam değişkeni yalnızca _varsayılanı_ sağlar.
`resilienceSettings.requestQueue` içinde kalıcılaştırılmış bir değer
(pano / API yaması, `key_value` içinde saklanır) onu yener ve bağlantı başına
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` da onu yener. Bu nedenle,
zaten kalıcı bir değere sahip bir dağıtımda ortam değişkenini ayarlamak hiçbir
şeyi değiştirmez — bunun yerine kalıcı ayarı temizleyin veya güncelleyin.

Kuyrukta kalış `maxWaitMs` ile sınırlıdır; aşağıdaki `maxQueueDepth` ise aynı
anda kaç çağıranın kuyruğa alınabileceğini sınırlar.

**Gövdede belirtilen yeniden denemeler: tempolama vs kilitleme.** Bir 429
gövdesi kendi bekleme süresini adlandırabilir (Gemini `RetryInfo.retryDelay`,
"retry after Ns" metni); bunu `updateFromResponseBody` okur. Bağlantının
`maxWaitMs` değerine sığan bir bekleme tempolamadır: sınırlayıcı rezervuarını
o süre boyunca boşaltır ve kuyruktaki çağrılar, rezervuar dolduğunda
gönderilir. `maxWaitMs` değerinden uzun bir bekleme, kuyruğun sonuna kadar
bekleyebileceği bir şey değildir — Gemini, tükenmiş bir günlük kotayı
`retryDelay: "86399s"` ile yanıtlar. Yeniden oluşturulan 429'daki (#16528)
aktarılan `Retry-After`, fallback motorunun modeli o pencere için kilitlemesini
zaten sağlar; ancak sınırlayıcıyı da bunun için duraklatmak, anahtara erken
ulaşan herhangi bir çağrıyı (örneğin bir dayanıklılık sıfırlamasından sonra)
yine de tüm `maxWaitMs` boyunca durdururdu. Böyle bir bekleme tiplendirilmiş
bir Google `RetryInfo` detayından (`google_rpc_retry_info` kökeni) geldiğinde
ve anahtarın sınırlayıcısı zaten model kapsamlıysa (bkz. `getLimiterKey`), 429
bunun yerine o bağlantıda bir model kilitlemesine dönüşür
(`open-sse/services/rateLimitManager/bodyRetryPause.ts` içindeki
`lockModelForLongBodyRetry`, 24 saat ile sınırlıdır) ve sınırlayıcı
duraklatılmadan bırakılır. Hesap seçimi bu kilidi `isModelLocked()` aracılığıyla
atlar; bağlantıya sabitlenmiş hedefler için combo gönderim-öncesi kapısı da
öyle yapar. Sınırlayıcısı kota ailesi başına olan antigravity'de kilit, diğer
kota kilitleri gibi tam model üzerindedir. Bir takma ad onu o modele çözdüğünde
istemcinin istediği ad da kilitlenir, çünkü bu denetimler istenen adı kullanır;
tam olarak kilitlenir (`lockExactModel`), böylece bir antigravity kota ailesini
veya bir codex kapsamını aşan bir takma ad asla kendininkini kilitlemez. Düz
metin bir ipucu, tiplendirilmemiş bir `retryDelay` veya tüm bağlantı tarafından
paylaşılan bir sınırlayıcı duraklatmayı korur. 429 yolunun az önce yeniden
oluşturduğu sınırlayıcı durakladığında, kalan kuyruk süresi duraklamadan önce
biten bir çağıran, o süreyi beklemek yerine anında kuyruk-zaman-aşımı koduyla
(`checkLimiterPause`) geri çevrilir; kaydedilen bitiş, sınırlayıcı
oluşturulmadan önce, Bottleneck'in yenileme saatini başlattığı noktaya
sabitlenir ve rezervuarda sonradan yapılan herhangi bir değişiklik bunu
unutur. `tests/unit/rate-limit-long-body-retry-lockout.test.ts` ve
`tests/unit/rate-limit-body-retry-pause.test.ts` tarafından kapsanır.

**`maxQueueDepth` — isteğe bağlı kabul sınırı (yeni).**
`resilienceSettings.requestQueue.maxQueueDepth`, tek bir sağlayıcı+bağlantı
için aynı anda kaç isteğin kuyrukta (henüz gönderilmemiş) bekleyebileceğini
sınırlar. Kuyruk zaten `maxQueueDepth` istek tuttuğunda, yeni bir istek daha
`limiter.schedule()` çağrısına **ulaşmadan** tiplendirilmiş bir
`code: "RATE_LIMIT_QUEUE_FULL"` hatasıyla hızlıca reddedilir — böylece
reddetme ucuzdur ve o istek için sonraki herhangi bir istem-sıkıştırma /
çeviri işleminden önce gerçekleşir. Varsayılan `0` = devre dışı; mevcut
sınırsız kuyruk davranışı korunur; 0–100000 aralığında sınırlıdır.
`RATE_LIMIT_MAX_QUEUE_DEPTH` (ortam değişkeni) veya
`resilienceSettings.requestQueue.maxQueueDepth` (pano/API yaması) ile geçersiz
kılınabilir.

Kabul denetiminin kendisi saf bir fonksiyondur
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`);
böylece gerçek bir Bottleneck sınırlayıcısı olmadan birim testi yapılabilir.

> #6593'ü açan RFC ayrıca bir `bypassCompressionOnRateLimit`
> bayrağı da önermişti. Bu reponun `open-sse/services/compression/` hattı,
> giden LLM isteği üzerinde prompt/bağlam sıkıştırmasıdır (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` bloğu civarında) —
> sentezlenen 429 gövdeleri üzerinde HTTP yanıt sıkıştırması değildir —
> dolayısıyla literal bir bypass bayrağıyla eşleşen bir kod yolu yoktur. Bu
> prompt sıkıştırma adımı ayrıca şu anda istek hattında `withRateLimit()`'ten
> _önce_ çalışır; bu nedenle, kuyruk dolu reddinde onu atlamak üzere yeniden
> sıralamak, bu issue'nun kapsamından ayrı ve daha büyük bir değişikliktir;
> bilinçli olarak burada uygulanmamıştır ve CPU tasarrufu kazancı yeniden
> sıralama riskine değerse bir takip işi olarak bırakılmıştır.

### Hız Sınırı Otomatik Etkinleştirme Güvenlik Ağı ve Bağlantı Koruması (`rateLimitProtection`)

**Otomatik etkinleştirme güvenlik ağı** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, varsayılan `true`):
OmniRoute, varsayılan olarak tüm aktif API anahtarı sağlayıcı bağlantıları için hız sınırı kuyruk korumasını otomatik olarak etkinleştirir (`getProviderCategory(provider) === "apikey"`). Bu, hıza duyarlı yukarı akış API anahtarlarına gelen isteklerin, yukarı akış 429 hatalarına ani bir patlamayla çarpmak yerine Bottleneck üzerinden kuyruğa alınmasını ve kısıtlanmasını sağlar. Güvenlik ağı, `RATE_LIMIT_AUTO_ENABLE` ortam değişkeni (`false`/`0`/`off` devre dışı bırakır, `true`/`1`/`on` zorla açar) aracılığıyla geçersiz kılınabilir; bu değişken, kalıcı pano ayarının (**Ayarlar → Dayanıklılık** / `PATCH /api/resilience`) önüne geçer.

**Bağlantı başına `rateLimitProtection` anlambilimi:**
Bağlantı başına hız sınırı koruması, sağlayıcı bağlantılarındaki `rateLimitProtection` boolean alanı üzerinden izlenir (SQLite'ta `rate_limit_protection` olarak kalıcı hale getirilir):

- **Açık açık (`rateLimitProtection === true`)**: Sağlayıcı kategorisinden veya otomatik etkinleştirme güvenlik ağının açık olup olmadığından bağımsız olarak, bu bağlantı için hız sınırı koruması açıkça etkinleştirilir.
- **Açık kapalı (`rateLimitProtection === false`)**: Açık korumayı devre dışı bırakır, ancak aktif bir API anahtarı bağlantısını global otomatik etkinleştirme güvenlik ağının kapsamı **dışına çıkarmaz**. `reconcileEnabledConnections` içinde (`open-sse/services/rateLimitManager.ts`), `false` ve `undefined` eşdeğerdir: yalnızca `rateLimitProtection === true` açık bir geçersiz kılma olarak değerlendirilir. `rateLimitProtection` `false` (veya ayarlanmamış) ise, aktif bir API anahtarı bağlantısı yine de otomatik etkinleştirme koşuluyla eşleşir ve hız sınırı korumalı kalır.
- **Bağlantı başına vazgeçme yok**: Bir operatör, diğerleri için otomatik etkinleştirmeyi aktif tutarken "bu tek aktif API anahtarı bağlantısı hız sınırı kuyruk koruması olmadan çalışmalı" ifadesini şu anda tanımlayamaz. API anahtarı bağlantılarını hız sınırı kuyrukları olmadan tamamen çalıştırmak için, güvenlik ağının global olarak kapatılması gerekir (`RATE_LIMIT_AUTO_ENABLE=false` veya `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Desteklenen yazma yolları:**

- **`POST /api/rate-limits`**: Bir bağlantı için `rateLimitProtection`'ı açıp kapatmak üzere desteklenen yönetim yazma yolu (`{ connectionId: string, enabled: boolean }`). Bunu `enabled: true` ile çağırmak açık korumayı etkinleştirir; `enabled: false` ile çağırmak açık korumayı kaldırır (ancak otomatik etkinleştirme açıksa, aktif API anahtarı bağlantıları global güvenlik ağı kapsamında korunmaya devam eder).
- **`PUT /api/providers/[id]`**: Kasıtlı olarak `rateLimitProtection`'ı kabul etmez ve değiştirmez (#11278). Sağlayıcı bağlantı meta verilerini `PUT /api/providers/[id]` üzerinden güncellemek, kalıcı hız sınırı koruma durumunu asla değiştirmeyecektir.

---

## 6. Yavaş akış verimi gözlemcisi (#9709)

İsteğe bağlı `resilienceSettings.streamRecovery.throughputWatchdog` koruması, hâlâ yığınlar gönderen ancak yapılandırılmış faydalı çıktı oranının altında yardımcı çıktı üreten bir yukarı akışı algılar. Boşta kalma zaman aşımından kasıtlı olarak farklıdır: Kalp atışları ve meta veriler ne zamanlayıcıyı sıfırlar ne de ilerleme olarak sayılmaz. Ayrıca, çıktı kalitesinden bağımsız olarak mutlak bir güvenlik tavanı olarak kalan zorlu girişim son tarihinden (#9153) de farklıdır.

Bekçinin, durdurulabilmesi için bir ısınma süresine ve ardından tam bir geçiş aralığına ihtiyacı vardır. Sohbet Tamamlamaları ve Yanıtlar API çıktı olaylarından (koruyucu bir UTF-8 bayt proxy'si) gelen metin deltalarını sayar, yalnızca kullanıma yönelik ve boş olayları yok sayar ve araç çağrısı veya akıl yürütme olayları uçuş halindeyken yargılamayı askıya alır. Varsayılan olarak devre dışıdır ve `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ile etkinleştirilebilir (bu env değeri yalnızca varsayılan — kaydedilmiş bir `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean kazanır; bu kılavuzun üst kısmındaki env-vs-dashboard öncelik notuna bakın); pencere, ısınma, minimum hız ve minimum ölçülebilir çıktı, normal esneklik ayarları normalleştirme katmanı tarafından sınırlanır.

Etkinleştirildiğinde, gözlemci iptali yalnızca etkin yukarı akış girişimine uygulanır. İstemcinin görebileceği herhangi bir bayttan önce, aynı hesabın mevcut erken kurtarma yolu, denemeyi yeniden açabilir. Kaydedildikten sonra akış hiçbir zaman körü körüne yeniden oynatılmaz; yalnızca mevcut güvenli orta akış devam sözleşmesi bir sonek ekleyebilir. Sonlandırma tek seferde kalır, dolayısıyla kullanım hesaplaması ve semafor sürümü kopyalanmaz.

---

## 7. Upstream Durum Yeniden İfadesi (yanlış bildirilen kota hataları)

**Kapsam:** geçici kota tükenmesini yanlış bir HTTP durumuyla bildiren tek bir upstream ağ geçidi.

**Amaç:** sınıflandırmadan ÖNCE yanıltıcı bir durumu düzeltmek; böylece aşağı akış tüketicileri (fallback motoru, combo agregasyonu, istemciye dönen yanıt) hatanın gerçek yeniden denenebilir niteliğini görür.

Bazı ağ geçitleri GEÇİCİ kota tükenmesini yeniden denenemez bir HTTP
durumuyla işaret eder. `agentrouter.org`, standart `429` yerine Çince bir
gövdeyle (`用户额度不足` / `额度不足`) `403` (bazen `400`) döndürür. Claude
Code gibi istemciler `403`'ü kalıcı olarak değerlendirip oturumu sonlandırır;
düzeltme yapılmazsa fallback motoru bunu bir kota olayı yerine `AUTH_ERROR`
olarak sınıflandırır.

**Uygulama:**

- Kayıt + eşleştirici: `open-sse/config/upstreamStatusRestatement.ts` —
  sağlayıcı başına bir kural listesi (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` aracılığıyla eşleştirilir.
- Çağrı noktası: `open-sse/handlers/chatCore.ts` içindeki `providerFailure:`
  bloğu (yaklaşık 3654. satır), `parseUpstreamError()` hata HTTP durumu
  taşıyan bir upstream yanıtını ayrıştırdıktan (`!providerResponse.ok`) hemen
  sonra ve herhangi bir sınıflandırma çalışmadan önce; böylece tüm aşağı akış
  tüketicileri düzeltilmiş durumu görür. Bir `200` SSE akışının içine gömülü
  hatalar, ayrı ve daha geç işleyen bir akış-ayrıştırma yolunu izler ve bugün
  bu hook tarafından **kapsanmaz** — bilinen bir sınırlamadır; agentrouter'ın
  yanlış durum bildirimi için (ki bu bir hata HTTP durumu olarak ortaya çıkar)
  henüz gerekli değildir.
- Yeniden deneme uygunluğu: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`
  içindedir (`open-sse/services/combo/unavailableRetryGate.ts`); bu nedenle
  yeniden ifade edilen bir hata, ölü bir `403` olarak görünmek yerine gerçek
  bir yeniden deneme penceresi taşır.
- Sentetik `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`),
  yalnızca yeniden ifade edilen yanıtın **istemciye** bildirdiği değerdir;
  bağlantının dahili cooldown/lockout süresinin kendisi değildir — bu süre,
  yeniden ifade edilen hatayı fiilen ele alan mekanizma tarafından ayrıca
  yönetilir (Connection Cooldown'un kademeli artan backoff'u, §2, API-key
  sağlayıcıları için taban `3s`; ya da agentrouter gibi model-başına-kota
  sağlayıcıları için Model Lockout, §3). Yönlendirici, istemciye duyurduğu
  60s penceresinden daha önce dahili olarak yeniden denemeye uygun hale
  gelebilir — bu kasıtlı bırakılmış bir paydır, hata değildir.

Kalıcı hatalar (agentrouter'ın `无权访问模型` hatası — bu modele erişim yok)
ASLA yeniden ifade edilmez: `textMarkers` eşleşse bile `excludeMarkers` kuralı
veto eder; böylece hata orijinal durumunu korur ve hiçbir şey onu sonsuza dek
yeniden denemez. Eşleşen sağlayıcı sınıflandırma kuralı
(`open-sse/config/providerErrorRules.ts` içindeki
`agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`,
bildirilmiş `6h` taban cooldown), `checkFallbackError`
(`open-sse/services/accountFallback.ts`) tarafından genel apikey kategorisindeki
`FORBIDDEN` erken dönüşünden _önce_, `honorsRuleLockScope(provider)` koşuluna
bağlı olarak değerlendirilir (#10334 — şu anda `providerErrorRules.ts`
içindeki `HONORS_RULE_LOCK_SCOPE_PROVIDERS` izin listesi aracılığıyla yalnızca
agentrouter'a özeldir). Kuralın bildirilmiş 6h cooldown'u
`fallbackResult.baseCooldownMs` olarak akar, ancak yine de önceden var olan
model-başına-kota lockout yolunu besler (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`; cooldown kaynağı dışında #10334 ile
değişmemiştir): diğer tüm model lockout'ları gibi operatörün
`mlSettings.maxCooldownMs` değerine (varsayılan `1_800_000ms` / 30dk)
sınırlandırılır ve _persist edilen lockout nedeni_, kuralın `"auth_error"`
değeri değil, önceden var olan sabit kodlanmış `"forbidden"` değeri olarak
kalır — uçtan uca yalnızca cooldown süresi dikkate alınır, neden dizgisi
değil. Bağlantının kendisi aktif kalır; aynı bağlantıdaki kardeş modeller
etkilenmez.

Yeniden ifade edilen kota hataları (`额度不足`) üretimde bir sağlayıcı kuralına
ulaşır (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, kendine ait bildirilmiş bir cooldown'u yok — kalıcılık katmanının
ölçeklenen backoff varsayılanı uygulanır). #10334'ten bu yana,
`ProviderErrorRuleMatch` üzerindeki `scope` uçtan uca TÜKETİLMEKTEDİR, ancak
**yalnızca** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` izin listesindeki sağlayıcılar
için (`providerErrorRules.ts` — bugün yalnızca `"agentrouter"`,
`honorsRuleLockScope()` aracılığıyla koşula bağlıdır). Diğer tüm sağlayıcılar
için `scope`, tam olarak #10334 öncesindeki gibi bilgilendirici olarak kalır.
`checkFallbackError`, eşleşen kuralın scope'unu `fallbackResult.ruleScope`
olarak ortaya çıkarır; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`), bir `ruleScope`'un bağlantı genelinde, kendi
kendine iyileşen bir sinyal olarak dikkate alınmasının gerçekten güvenli
olduğunu doğrulayan paylaşılan koruyucudur (scope `"connection"`, reason
`quota_exhausted`, asla `permanent`, asla `creditsExhausted` — gelecekte scope
`"connection"`ı kalıcı bir hesap durumuyla eşleştirebilecek bir kurala karşı
bir savunma). Bunu iki tüketici çağırır:

- **Kalıcılık** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough sağlayıcının **model başına** kilitleme dalına düşmek yerine
  (agentrouter `passthroughModels: true` → `hasPerModelQuota()` `true`
  döndürür), **geçici bir bağlantı soğuma süresi** uygular —
  `testStatus: "unavailable"` + `rateLimitedUntil`, asla nihai bir durum değil
  (`credits_exhausted`/`banned`/`expired`) — böylece bağlantı, soğuma süresi
  dolduğunda manuel bir kimlik bilgisi sıfırlaması gerektirmek yerine kendini
  kurtarır. `disableCooling: true` olan bağlantılar için atlanır (#2997): bu
  vazgeçme (opt-out) bunun yerine model başına kilitlemeye düşer (belgelenmiş
  bir ödünleşim — dalın üzerindeki kod yorumuna bakın).
- **Aynı istek içi combo yönlendirmesi** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): aynı koruma, bağlantıyı
  bellek içi `exhaustedConnections` kümesine `${provider}:${connectionId}`
  anahtarıyla işaretler. Bu, yalnızca _kendi hedef nesnesinde bu tam
  `connectionId` değerini zaten taşıyan_ kalan bir AYNI-İSTEK hedefini atlar
  (`getExhaustedTargetSkipReason()`, `open-sse/services/combo/comboPredicates.ts`,
  `exhaustedConnections` aramasından önce `if (provider && connectionId)`) —
  kardeş hedeflerin kendilerine ait sabitlenmiş bir `connectionId` taşımadığı
  ve birinin yalnızca yanıtın `X-OmniRoute-Selected-Connection-Id` başlığından
  gönderim başına çözümlendiği düz bir model listesi combo'su, bu anahtar
  eşleşmesine asla takılmaz. Bu yaygın durum için, kalan bir ayağın az önce
  tükenmiş hesabı yeniden kullanmasına karşı gerçek koruma bu küme DEĞİLDİR —
  yukarıdaki kalıcılık katmanıdır (bağlantının `rateLimitedUntil` değeri artık
  gelecekte bir zamandadır) ve aynı korumanın bu hata için
  `transientRateLimitedProviders`'ı bastırmasıyla birleşir (bkz. "İki aşamalı
  tasarım" ve `targetExhaustion.ts` içindeki `isAgentrouterConnectionQuotaScope`
  dalındaki kod yorumu): bu küme işaretlenmemiş bırakıldığında, `combo.ts`'nin
  `allowRateLimitedConnection` zorla-izin-ver mekanizması
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) sağlayıcının kalan
  ayakları için devreye GİRMEZ, böylece kimlik bilgisi seçiminin
  `rateLimitedUntil` filtresi (`src/sse/services/auth.ts:1238`) normal şekilde
  uygulanır ve kalan bir ayak ya farklı, hâlâ uygun bir agentrouter bağlantısı
  seçer ya da kullanılabilir kimlik bilgisi olmadan başarısız olur — bu dalın
  az önce soğumaya aldığı bağlantıya kendini zorla geri sokmaz.

### İki aşamalı tasarım: durum yeniden ifadesi, ardından sınıflandırma

Durum yeniden ifadesi (`upstreamStatusRestatement.ts`) ve sağlayıcı
sınıflandırma kuralları (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`), her ikisi de sağlayıcı kimliği ve metin işaretçileri
üzerinden anahtarlanan ayrı kayıt defterleridir, ancak farklı yerlerde çalışır
ve farklı amaçlara hizmet eder: yeniden ifade, HTTP durumunu `chatCore.ts`
içinde erken bir aşamada yeniden yazar; sınıflandırma kuralları ise yedek
(fallback) `reason` değerini seçer ve `scope`'u (`model` / `provider` /
`connection`) `checkFallbackError()` (`open-sse/services/accountFallback.ts`)
içinde kilitler.

Sınıflandırma kuralları, tam hata **metnini** (`额度不足` gibi gövde
işaretçilerini eşleştirmek için gereklidir) yalnızca `providerErrorRules.ts`
içindeki `FULL_TEXT_RULE_PROVIDERS` izin listesinde yer alan sağlayıcılar için
görür — şu anda yalnızca `"agentrouter"`. Diğer her **yerleşik katalog**
sağlayıcısı için `checkFallbackError`, `getProviderErrorRuleMatch`'e yalnızca
yapılandırılmış hatayı (`{code, type}`) verir; bu, başlık/durum/kod tabanlı
kurallar için yeterlidir ancak gövde metni işaretçilerine karşı kördür.
`resolveRuleMatchBody()` yardımcısı bu seçimi gerçekleştirir: izin listesindeki
sağlayıcılar için tam hata metni, aksi hâlde yapılandırılmış hata.
`FULL_TEXT_RULE_PROVIDERS`'a **yerleşik** bir sağlayıcı eklemek, sağlayıcı
başına açık bir katılımdır (opt-in) — listede olmayan her sağlayıcının
varsayılan yolu bayt bayta değişmeden kalsın diye vardır.

Bir kuralın `scope`'u (`model` / `provider` / `connection`),
`FULL_TEXT_RULE_PROVIDERS`'dan ayrı bir katılımdır: `checkFallbackError` bunu
yalnızca `fallbackResult.ruleScope` olarak sunar ve aşağı akış tüketicileri de
bunu, aynı dosyadaki `HONORS_RULE_LOCK_SCOPE_PROVIDERS` izin listesindeki
sağlayıcılar için, bilgilendirici bir etiketten öte bir şey olarak ancak
dikkate alır (`honorsRuleLockScope()` üzerinden denetlenir — bugün yalnızca
`"agentrouter"`). Bir sağlayıcı bu izin listesine girdiğinde bir
`scope: "connection"` eşleşmesinin gerçekte ne yaptığı için yukarıdaki
"Yeniden ifade edilen kota hataları" bölümüne bakın.

**#11104 — operatör tarafından bildirilen kurallar her iki izin listesini de
atlar.** Bir operatör, bu dosyayı düzenlemeden çalışma zamanında
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
aracılığıyla sağlayıcı başına bir kural bildirebilir. Bir operatör kuralını
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` arkasına
kapılamak — yerleşik katalog kurallarının **varsayılan** davranışını korumak
için tasarlanmış izin listeleri — kuralı bildirmenin zaten operatörün açık
katılımı olduğu göz önüne alındığında, ayarlar mekanizmasını zaten orada
listelenmiş olanlar dışındaki her sağlayıcı için etkisiz kılardı.
`resolveRuleMatchBody()` ve `honorsRuleLockScope()` ikisi de önce
`hasOperatorRuleForProvider()`'ı kontrol eder: bir operatör kuralına sahip
sağlayıcı, her iki izin listesinde de yer alıp almadığına bakılmaksızın ham
hata metnini alır ve bildirilen `scope`'u uygulanır.

**Bilinen eksik — HTTP 400 için `providerRuleRegistry`'ye asla
başvurulmaz.** `checkFallbackError`'ın `BAD_REQUEST` dalı, 400 durumunu
tamamen kendi desen dizileri (`accountFallback.ts` içindeki
`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` vb.) üzerinden
sınıflandırır ve üzerindeki `configuredRule`/`getProviderErrorRuleMatch`
dalına ulaşılmadan önce döner. `status: 400` içeren yerleşik bir katalog
kuralı (veya bir operatör kuralı) sözdizimsel olarak geçerlidir ancak asla
tetiklenmez. Bugün hiçbir mevcut kural 400'ü hedeflemiyor, dolayısıyla
üretimde hiçbir şey etkilenmiyor — ancak gelecekteki bir 400 kuralı önce bu
dalın elden geçirilmesini gerektirir; bu, bir kural eklemekten daha büyük bir
değişikliktir (desen dizisi davranışına zaten dayanan her sağlayıcı için
400'ü yeniden sınıflandırır) ve tek sağlayıcılı bir kural eklemesinin kapsamı
dışındadır.

### Kotayı yanlış bildiren yeni bir ağ geçidi ekleme

1. `statusRestatementRegistry` içine tek bir kural dizisi kaydedin
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers`
   değerlerini sağlayıcıya özgü tutun; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) ile çakışan genel İngilizce
   ifadeleri asla yeniden kullanmayın.
2. İsteğe bağlı olarak, doğru kilit kapsamını seçmek için
   `open-sse/config/providerErrorRules.ts` içine (`providerRuleRegistry`)
   sınıflandırma kuralları kaydedin (hesap genelinde kota için `connection`,
   model bazlı hatalar için `model`). Bu adım, üretim ortamında yalnızca
   kuralları tam hata metnine (gövde işaretçileri) ihtiyaç duyan sağlayıcılar
   için etkili olur: sağlayıcı kimliğini aynı dosyadaki
   `FULL_TEXT_RULE_PROVIDERS` listesine ekleyin — aksi takdirde
   `checkFallbackError` kurala yalnızca yapılandırılmış `{code, type}`
   hatasını iletir ve gövde metnine dayalı bir kural canlı trafikte asla
   eşleşmez. Yalnızca `status`/`headers` üzerinden eşleşen kurallar
   (Opencode'un veya Minimax'in kuralları gibi) bu katılıma ihtiyaç duymaz.
   Bundan ayrı olarak, kural `scope: "connection"` bildiriyorsa ve amaç
   gerçek bir bağlantı genelinde bekleme süresi ile aynı istek içinde combo
   atlama ise (yalnızca bilgilendirici bir etiket değil), sağlayıcı kimliğini
   aynı dosyadaki `HONORS_RULE_LOCK_SCOPE_PROVIDERS` listesine ekleyin — bu,
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) ve
   `applyComboTargetExhaustion()` (`open-sse/services/combo/targetExhaustion.ts`)
   içindeki `isAgentrouterConnectionQuotaScope()` tarzı tüketimi denetleyen
   mekanizmadır; bu olmadan `scope` yine de `fallbackResult.ruleScope`
   üzerinden akar ancak hiçbir şey buna göre hareket etmez.
3. `tests/unit/upstream-status-restatement.test.ts` ve
   `tests/unit/agentrouter-error-rules.test.ts` dosyalarını örnek alan birim
   testleri ekleyin (not-permanent / not-creditsExhausted korumaları dahil
   ve — sağlayıcının izin listesine ihtiyacı varsa —
   `resolveRuleMatchBody()` fonksiyonunun tam metni yalnızca o sağlayıcı
   için döndürdüğünü doğrulayan bir test).

`chatCore.ts`, `classifyError` veya combo'da herhangi bir değişiklik gerekmez.

#### Egress gruplu kilit (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` içindeki sağlayıcılar (opencode ailesi),
IP gruplu upstream olarak ele alınır (opencode ücretsiz katmanı hesap gruplu
değil, IP grupludur — bkz. #9611): `quota_exhausted` **veya**
`rate_limit_exceeded` olarak sınıflandırılan bir status-429, rotasyon bunları
deneyemeden önce, son bilinen çıkış IP'si başarısız olan bağlantınınkiyle
eşleşen izin listesindeki aileye ait her bağlantıyı beklemeye alır
— böylece N-1 adet garantili başarısız upstream çağrısı önlenir
(#10460/#10525 ile aynı yapı).
`rate_limit_exceeded` kasıtlı olarak dahil edilmiştir:
`markAccountUnavailable` yolunda opencode'a özgü kurallar asla eşleşmez
(`checkFallbackError`'a hiçbir header/gövde verilmez, opencode
`FULL_TEXT_RULE_PROVIDERS` içinde değildir), dolayısıyla gövdesinde abonelik
kotası metnini ("monthly usage limit reached") taşıyan bir 429, `status_429`
kuralına hiç ulaşılmadan önce kota-metni geri dönüş mekanizması
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 saatlik bekleme)
tarafından `quota_exhausted` olarak sınıflandırılır — buna karşılık kota
metni içermeyen bir 429 (düz hız sınırlama) `status_429` kuralı üzerinden
`rate_limit_exceeded` olarak sınıflandırılır ve yine de IP ailesini beklemeye
alır. İzin listesindeki bir sağlayıcı için IP gruplu bir hız sınırı, tükenmiş
bir kotayla aynı sinyaldir. Dürüst sınırlar:

- **Best-effort**: kilit, bağlantının bilinen son `egress_ip` değerini `proxy_logs`
  üzerinden çözümler (24 saatlik pencere, senkron, önbellek yok). Soğuk önbellek
  (egress IP hiç yoklanmamış) veya satır yok → başarısız olan bağlantı yine de dal
  tarafından soğutulur (bugünkü gibi kaydedilir), yalnızca hiçbir kardeş
  kilitlenmez.
- **Asla nihai değil**: soğuma, yenilenen bir kota penceresidir
  (`testStatus: "unavailable"`); IP düzeyindeki bir sinyalden asla kalıcı bir durum
  türetilmez. `disableCooling` bağlantıları dalı tamamen atlar.
- **İzin listesindeki aile için kilit granülaritesi değişiyor**: bu bir kapsam
  değişikliğidir, yalnızca bir kardeş optimizasyonu değil. opencode bir
  `passthroughModels` sağlayıcısıdır; dolayısıyla bu daldan önce bir 429, MODEL
  başına kilitlenme üretiyordu; artık bir bağlantı soğuması üretiyor — hiç kardeşi
  olmayan tek bir bağlantı çalıştıran bir operatör için bile. Bu, opencode kural
  tablosunun zaten doğru olarak bildirdiği granülaritedir (`scope: "connection"`,
  `providerErrorRules.ts`); ancak opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
  içinde olmadığı için şimdiye kadar hiç uygulanmadı. Dal, başarısız bağlantının
  soğumasını ve `backoffLevel` değerini kendisi yazar; bağlantı kapsamlı
  agentrouter dalını birebir yansıtır ve döner — model başına blok ile aşağıdaki
  genel yola asla ulaşılmaz.
- **Combo dahil**: agentrouter dalında olduğu gibi, kapsam, bir combo
  çağırıcısının 429'a uyguladığı `persistUnavailableState`/`isCombo` düşürmesini
  kasıtlı olarak yok sayar. Model başına kilitlenme bu kapsamın daha zayıf bir
  biçimi değildir, yanlış birimdir: tükenen IP hakkında hiçbir şey söylemez;
  dolayısıyla combo rotasyonu kardeş başına garantili başarısız bir çağrı yakmaya
  devam eder.
- **Kardeş güvenliği**: zaten nihai durumda (banned/credits_exhausted) veya zaten
  daha uzun bir soğumada bulunan bir kardeşin üzerine asla yazılmaz.
- **Özel izin listesi**: `EGRESS_BUCKETED_LOCK_PROVIDERS` listesini genişletmek
  açık bir sahip kararıdır; genel bir bağlantı yoktur (pattern #10334/#10419).
  Kardeş sorgusu, aynı izin listesini bir SQL sabiti olarak tekrarlamak yerine
  bağlar; böylece genişletme tek satırlık bir değişiklik olarak kalır.
- **Egress IP rotasyonu, her iki yönde**: arama penceresi (24 saat), egress-IP
  önbellek TTL'sinden (5 dk) çok daha geniştir; dolayısıyla "bilinen son IP"
  güncel durum değil, geçmiştir. Bir bağlantının vekil sunucusu pencere içinde
  değiştiyse kilit, gerçekten paylaşılan bir IP'yi **ıskalayabilir** (kaydedilen
  IP yeni, tükenmemiş olandır) — ve simetrik olarak, o zamandan beri tükenen
  IP'den **uzaklaşmış bir kardeşi soğutabilir**. İkinci durum, söz konusu kardeşe
  bir soğuma penceresine mal olur; her ikisi de geçmişe dayalı bir aramanın kabul
  edilmiş best-effort sınırlarıdır.
- **Maliyet**: `proxy_logs` üzerinde iki sınırlı tarama (`idx_pl_timestamp`
  aracılığıyla pencere filtreli), yalnızca 429 sıklığında. Yeni indeks yok
  (migration 134 YAGNI). Orta büyüklükte, gerçek trafikli bir DB kopyasında
  ölçüldü; yüksek işlem hacimli bir örnek, aynı pencerede orantılı olarak daha
  fazla satır tutar.

---

## Diğer Dayanıklılık Özellikleri

- **20 yönlendirme stratejisi** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — bkz. [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Sıfırlama-duyarlı yönlendirme** (v3.8.0) — bağlantıları kota sıfırlama zamanına göre önceliklendirir.
- **Arka plan modu düşürülmesi** — Responses API `background: true` uyarıyla birlikte senkron moda düşürülür.
- **Dinamik araç limiti algılama** — araç sayısı limitlerine ulaşıldığında sağlayıcılara geri çekilme uygular.
- **Acil durum yedeği** — `OMNIROUTE_EMERGENCY_FALLBACK` ile kontrol edilir; operatörler yeniden başlatma olmadan Feature Flags sayfasından geçersiz kılabilir.

---

## Hata Ayıklama

- Weighted combo `503 all_targets_cooling_down` yanıtı veriyor (`Retry-After` ayarlanmış, `diagnostics.excluded` her hedefi `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` ile listeliyor) → havuz yapılandırılmış ve bağlı, her hedef yalnızca bir dayanıklılık zamanlayıcısı tarafından hariç tutulmuş demektir; `[COMBO] Weighted selection: every target excluded before dispatch — …` uyarısı nedenleri ve kalan saniyeleri belirtir. Aynı combo'dan gelen bir `404 no_executable_targets` ise hiçbir dayanıklılık zamanlayıcısının devrede olmadığı anlamına gelir (çalıştırılacak bir şey yok ya da her hesap kullanılabilirlik yoklamasından kalmıştır). `targetResolution.ts` içinde toplanan hariç tutmalardan `open-sse/services/combo/pinRecovery.ts` içinde oluşturulmuştur.
- Bir sağlayıcının tüm anahtarları atlanıyor → hem devre kesici durumunu HEM de her bağlantının `rateLimitedUntil`/`testStatus` değerini kontrol edin.
- Sıfırlama penceresinden sonra sağlayıcı kalıcı olarak hariç tutuluyor → `getStatus()`/`canExecute()` yerine ham `state` okuyan kod var demektir.
- Bir anahtar başarısız oluyor, diğerleri çalışmalı → devre kesici yerine bağlantı bekleme süresini (connection cooldown) tercih edin.
- Yalnızca bir model başarısız oluyor → bağlantı bekleme süresi yerine model kilidini (model lockout) tercih edin.
- Durumun kendiliğinden düzelmesi gerekirken düzelmiyor → gelecekteki bir zaman damgası + süresi dolmuş durumu yenileyen okuma yolu olup olmadığını kontrol edin. Kalıcı durumlar manuel değişiklik gerektirir.

---

## Çalışma zamanı durumu — ajan hızlı başvurusu

> Ajan kılavuzunun 40k bağlam bütçesinin altında kalması için `AGENTS.md` → "Resilience Runtime State"
> bölümünden olduğu gibi taşındı (PR #12743). Bu, yukarıdaki bölümlerin
> ajanlara yönelik yoğunlaştırılmış görünümüdür; numaralı bölümler tam referans
> olmaya devam eder.

OmniRoute'ta birbiriyle ilişkili ancak farklı üç geçici hata mekanizması vardır.
Yönlendirme davranışında hata ayıklarken kapsamlarını ayrı tutun. Bir bakışta
harita için
[3 katmanlı dayanıklılık diyagramına](../diagrams/exported/resilience-3layers.svg)
(kaynak: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
bakın.

### Sağlayıcı Devre Kesici

**Kapsam**: sağlayıcının tamamı, örn. `glm`, `openai`, `anthropic`.

**Amaç**: yukarı akış/hizmet düzeyinde tekrar tekrar başarısız olan bir sağlayıcıya
trafik göndermeyi durdurmak; böylece sağlıksız tek bir sağlayıcı her isteği
yavaşlatmaz.

**Uygulama**:

- Çekirdek sınıf: `src/shared/utils/circuitBreaker.ts`
- Sohbet kapısı/yürütme bağlantısı: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Çalışma zamanı durum API'si: `src/app/api/monitoring/health/route.ts`
- Paylaşılan sarmalayıcılar: `open-sse/services/accountFallback.ts`
- Kalıcı durum tablosu: `domain_circuit_breakers`

**Durumlar** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normal trafiğe izin verilir.
- `DEGRADED`: erken uyarı bandı — hatalar düşürülme eşiğini aştı ancak henüz kesici
  eşiğini aşmadı; trafik akmaya devam eder, paneller uyarıyı gösterir. Geçerli bir bağlantı
  testi veya yeni hata olmayan sakin bir pencere, durumu `CLOSED`'a döndürür
  (pencere `docs/architecture/RESILIENCE_GUIDE.md` dosyasında açıklanmıştır).
- `OPEN`: sağlayıcı geçici olarak engellenmiştir; çağıranlar bir provider-circuit-open yanıtı
  alır ya da combo yönlendirme başka bir hedefe atlar.
- `HALF_OPEN`: sıfırlama zaman aşımı dolmuştur; bir yoklama isteğine izin verilir. Başarı
  kesiciyi kapatır, başarısızlık onu tekrar açar.

**Varsayılanlar** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`,
`src/lib/resilience/settings.ts` içindeki `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` üzerinden
tüketilir → `src/sse/handlers/chatHelpers.ts` içindeki `getCircuitBreaker(provider, …)`). Tüm sağlayıcı
kesicisi `circuitBreakerThreshold` / `circuitBreakerReset` üzerinde çalışır:

| Profil  | düşürülme eşiği | açılma eşiği (`circuitBreakerThreshold`) | sıfırlama (`circuitBreakerReset`) |
| ------- | --------------: | ---------------------------------------: | --------------------------------: |
| OAuth   |             `5` |                                      `8` |                             `60s` |
| API key |             `7` |                                     `12` |                             `30s` |
| Local   |    (türetilmiş) |                                      `2` |                             `15s` |

`PROVIDER_PROFILES` ayrıca `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 dk) ve `providerCooldownMs` (5/10/1 dk) tanımlar: bunlar,
**isteğe bağlı genel Provider Cooldown'un pencere kapısını** besler
(`PROVIDER_COOLDOWN_ENABLED`, varsayılan kapalı) — `open-sse/services/providerCooldownTracker.ts`
içindeki sağlayıcı düzeyindeki bir girdi, yalnızca `providerFailureWindowMs` içinde
`providerFailureThreshold` kadar hata sonrasında soğuma sayılır ve ardından
`providerCooldownMs` boyunca soğur. Bunlar canlı kesicinin eşikleri DEĞİLDİR — kesici
davranışı bekleyerek bunları ayarlamayın. Her varsayılan, `OMNIROUTE_PROVIDER_BREAKER_*` ve
`OMNIROUTE_CIRCUIT_BREAKER_*` ortam değişkenleri aracılığıyla geçersiz kılınabilir;
çalışma zamanına uygun referans tablosu `docs/architecture/RESILIENCE_GUIDE.md` dosyasında bulunur.

Sağlayıcı kesicisini yalnızca sağlayıcı düzeyindeki hata durumları tetiklemelidir:

```ts
(408, 500, 502, 503, 504);
```

Çoğu `401`, `403` veya `429` durumu gibi normal hesap/anahtar/model hataları için
tüm sağlayıcı kesicisini tetiklemeyin. Bunlar genellikle bağlantı bekleme süresine (connection
cooldown) veya model kilidine (model lockout) aittir. Genel bir API anahtarı sağlayıcısı
`403` hatası, nihai bir sağlayıcı/hesap hatası olarak sınıflandırılmadıkça kurtarılabilir
olmalıdır.

Kesici, arka plan zamanlayıcısı yerine tembel (lazy) kurtarma kullanır. `OPEN` süresi dolduğunda, `getStatus()`, `canExecute()` ve `getRetryAfterMs()` gibi okumalar durumu `HALF_OPEN` olarak yeniler; böylece panolar ve combo aday oluşturucuları, süresi dolmuş bir sağlayıcıyı sonsuza kadar hariç tutmaya devam etmez.

### Bağlantı Soğuma Süresi

**Kapsam**: tek bir sağlayıcı bağlantısı/hesabı/anahtarı.

**Amaç**: aynı sağlayıcının diğer bağlantılarının istekleri sunmaya devam etmesine izin verirken, hatalı tek bir anahtarı/hesabı geçici olarak atlamak.

**Uygulama**:

- Yazma/güncelleme yolu: `src/sse/services/auth.ts::markAccountUnavailable()`
- Hesap seçimi/filtreleme: `src/sse/services/auth.ts::getProviderCredentials...`
- Soğuma süresi hesaplama: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ayarlar: `src/lib/resilience/settings.ts`

Sağlayıcı bağlantılarındaki önemli alanlar:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Hesap seçimi sırasında, şu koşul sağlandığı sürece bir bağlantı atlanır:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Soğuma süreleri de tembeldir: `rateLimitedUntil` geçmişte kaldığında, bağlantı yeniden uygun hale gelir. Başarılı kullanımda `clearAccountError()`, `testStatus`, `rateLimitedUntil`, hata alanlarını ve `backoffLevel` değerini temizler.

Varsayılan bağlantı soğuma süresi davranışı:

- OAuth temel soğuma süresi: `5s`.
- API anahtarı temel soğuma süresi: `3s`.
- API anahtarı `429` durumunda, mevcut olduğunda yukarı akış (upstream) yeniden deneme ipuçları (`Retry-After`, sıfırlama başlıkları veya ayrıştırılabilir sıfırlama metni) tercih edilmelidir.
- Tekrarlanan kurtarılabilir hatalar üstel geri çekilme kullanır:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Thundering-herd önleme koruması, aynı bağlantıdaki eşzamanlı hataların soğuma süresini tekrar tekrar uzatmasını veya `backoffLevel` değerini iki kez artırmasını engeller.

Nihai (terminal) durumlar soğuma süresi değildir. `banned`, `expired` (yalnızca `EXPIRED_RETRY_MAX` aracılığıyla N sınırlı yeniden denemeden sonra nihai hale gelir) ve `credits_exhausted` durumlarının, kimlik bilgileri/ayarlar değişene veya bir operatör bunları sıfırlayana kadar kullanılamaz kalması amaçlanmıştır. Nihai durumları geçici soğuma durumuyla geçersiz kılmayın.

### Model Kilitlenmesi

**Kapsam**: sağlayıcı + bağlantı + model.

**Amaç**: bir bağlantı için yalnızca tek bir model kullanılamaz veya kota sınırlı olduğunda, bağlantının tamamını devre dışı bırakmaktan kaçınmak.

Örnekler:

- Model başına kota uygulayıp `429` döndüren sağlayıcılar.
- Eksik bir model için `404` döndüren yerel sağlayıcılar.
- Seçili Grok modları gibi sağlayıcıya özgü mod/model izin hataları.

Model kilitlenmesi `open-sse/services/accountFallback.ts` içinde bulunur ve aynı bağlantının diğer modelleri sunmaya devam etmesini sağlar.

### Hata Ayıklama Kılavuzu

- Bir sağlayıcının tüm anahtarları atlanıyorsa, hem sağlayıcı kesici durumunu hem de her bağlantının `rateLimitedUntil`/`testStatus` değerlerini inceleyin.
- Sıfırlama penceresinden sonra bir sağlayıcı kalıcı olarak hariç tutuluyor görünüyorsa, kodun `getStatus()`/`canExecute()` kullanmak yerine ham `state` değerini okuyup okumadığını kontrol edin.
- Bir sağlayıcı anahtarı başarısız oluyor ancak diğerlerinin çalışması gerekiyorsa, sağlayıcı kesicisi yerine bağlantı soğuma süresini tercih edin.
- Yalnızca bir model başarısız oluyorsa, bağlantı soğuma süresi yerine model kilitlenmesini tercih edin.
- Bir durumun kendi kendine iyileşmesi gerekiyorsa, gelecekte bir zaman damgası/sıfırlama zaman aşımına ve süresi dolmuş durumu yenileyen bir okuma yoluna sahip olmalıdır. Kalıcı durumlar, manuel kimlik bilgisi veya yapılandırma değişiklikleri gerektirir.

---

## TLS Parmak İzi ve Stealth

Sağlayıcıya özel stealth (JA3/JA4, CCH, obfuscation) ayrı olarak belgelenmiştir — bkz. `docs/security/STEALTH_GUIDE.md` (git; `/docs` içine derlenmez).

---

## Dayanıklılık testleri (Faz 8 · Blok C)

Dayanıklılık mantığına yönelik birim testlerinin ötesinde, üç test çalışma zamanını
gerçek stres/hata koşulları altında zorlar (hepsi entegrasyon/gecelik — hiçbiri PR'ları engellemez):

| Test        | Ne                                                                                                                                                                                                         | Çalıştırma                               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Sahte upstream düğümü gerçek gecikme/reset/zaman aşımı/503 enjekte eder; devre kesicinin açılıp toparlandığını ve `checkFallbackError`'un 503'ü kurtarılabilir fallback olarak sınıflandırdığını doğrular. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | `--expose-gc` altında `createSSEStream` başına ~500 akış; yığın (heap) tavanın ötesine büyürse başarısız olur (OOM koruması #3069).                                                                        | `npm run test:heap`                      |
| k6 soak     | `/api/monitoring/health` adresine sürekli yük; p95/hata eşikleri.                                                                                                                                          | `k6 run tests/load/k6-soak.js` (gecelik) |

`.github/workflows/nightly-resilience.yml` tarafından yönetilir (cron + dispatch).
Varsayılan `test:integration` içinde chaos ve heap testleri kendini atlar (`RUN_CHAOS_INT`/`--expose-gc` olmadan).

---

## Ayrıca Bkz.

- [Mimari Kılavuzu](./ARCHITECTURE.md) — Sistem mimarisi ve iç işleyiş
- [Kullanıcı Kılavuzu](../guides/USER_GUIDE.md) — Sağlayıcılar, kombinasyonlar, CLI entegrasyonu
- [Auto-Combo Motoru](../routing/AUTO-COMBO.md) — 16 faktörlü puanlama, mod paketleri
