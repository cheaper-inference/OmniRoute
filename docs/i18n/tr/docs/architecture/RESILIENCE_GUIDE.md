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

## 2. Bağlantı Soğutma Süresi

**Kapsam:** tek sağlayıcı bağlantısı/hesabı/anahtarı.

**Amaç:** aynı sağlayıcıya ait diğer bağlantılar hizmet vermeye devam ederken sorunlu bir anahtarı atlamak.

**Uygulama:**

- Kullanılamaz olarak işaretleme: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seçim: aynı dosyada `getProviderCredentials*`
- Soğutma süresi hesaplama: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ayarlar: `src/lib/resilience/settings.ts`

**Bağlantı başına alanlar:**

- `rateLimitedUntil` — soğutma süresinin sona ereceği zaman damgası
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — üstel geri çekilme sayacı

**Varsayılan soğutma süreleri:**

- OAuth tabanı: 5 sn
- API anahtarı tabanı: 3 sn
- API anahtarı 429: üst akıştaki `Retry-After`/sıfırlama başlıklarını/ayrıştırılabilir sıfırlama metnini tercih eder
- Geri çekilme: `baseCooldownMs * 2 ** failureIndex`

**Sağlayıcı başına yeniden deneme gecikmesi.** Sağlayıcı ayrıntı sayfasında bir **Yeniden deneme gecikmesi** seçimi bulunur (Otomatik,
15 sn'den 1 saate kadar). Bu ayar, `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
alanına kaydedilir (1–21600, `PATCH /api/resilience` aracılığıyla). Bir hız sınırı hatası üst akıştan yeniden deneme
ipucu taşımıyorsa bu değer, sağlayıcı için ölçeklendirilmiş geri çekilmenin yerine geçer ve
`backoffLevel` değerini 0'a sıfırlar (`open-sse/services/rotationConfig.ts::overrideFor`). Hız sınırı uygulanmış bir hata
için öncelik sırası, en yüksekten en düşüğe: üst akış yeniden deneme ipucu, ardından bağlantıya özgü
`providerSpecificData.rotationOverrides.rateLimitResetSeconds`, ardından sağlayıcı başına yeniden deneme gecikmesi, ardından
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` ortam değişkeni ve son olarak ölçeklendirilmiş geri çekilme. Otomatik seçeneği alanı kaldırır. Bu özellik yalnızca hız sınırı nedenini etkiler; terminal durumları hiçbir zaman etkilemez.

**Ani yük artışına karşı koruma:** eşzamanlı hataların soğutma süresini gereğinden fazla uzatmasını veya
`backoffLevel` değerini iki kez artırmasını önler.

**Eşzamanlılık sınırı 429 hataları geri çekilme basamaklarını yükseltmez.** Gövdesi bir
eşzamanlılık sınırı bildiren ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) bir `429`, hesabın sağlıklı ancak meşgul olduğu anlamına gelir.
`checkFallbackError()` `concurrency_limited` nedenini döndürür: hemen sonraki bağlantıya geçilir, bu bağlantı
sabit `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 sn) veya üst akış yeniden deneme ipucuyla soğutulur,
`backoffLevel` değiştirilmeden bırakılır ve `skipProviderBreaker` ayarlanır.
Açık bir kota gövdesi önceliklidir; dolayısıyla aynı zamanda bir kota deseniyle eşleşen gövde kota
kararı olarak kalır. Algılama: `src/shared/utils/classify429.ts` içindeki `looksLikeConcurrencyLimit()`;
karar: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (devre kesicinin
`FailureKind` değeri) değiştirilmez ve bu gövdeler için hâlâ `rate_limit` okur.

**Akış içeriği duraklamaları hesabı soğutmaz.** İçerik duraklaması izleyicisi
(`open-sse/utils/streamHandler.ts`) zamanında model çıktısı göndermeyen bir akıştan vazgeçtiğinde,
`markAccountUnavailable()` hatayı bağlantıya kaydeder ancak soğutma süresi ayarlamaz: duraklama bu isteğe aittir
ve çoğunlukla henüz çıktı üretmemiş uzun bir akıl yürütme turundan kaynaklanır. Operatörler
`resilienceSettings.streamStallCooldown.enabled` (varsayılan `false`) ile bunu isteğe bağlı olarak etkinleştirebilir.

**`p2c` hesap seçimi için isteğe bağlı gecikme sinyali.** Dağıtılan her deneme, her bağlantı (ve bağlantı + model)
için ilk bayta kadar geçen süreyi ve sonucu bellekteki kayan pencerede kaydeder: 15 dakika içindeki
son 20 örnek (`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts` içindeki
`safeLogEvents()` üzerinden kaydedilir). `resilienceSettings.p2cLatency.weight` değeri
`0`'ın üzerindeyse (aralık 0-20, varsayılan `0` = kapalı), `src/sse/services/auth.ts` içindeki
`compareP2CConnections()` çiftteki her adaya en fazla `weight` puan ekler. Bunun yarısı, daha hızlı adaya
oran olarak gecikmeden (iki kat yavaşlık tam yarıyı alır), diğer yarısı ise kayan hata oranından gelir.
Bu terim yalnızca her iki adayın da en az 3 örneği olduğunda uygulanır; böylece yeni hesaplar
cezalandırılmaz ve üst sınırı kota tarafından engellenmiş ve kotası tükenmiş cezaların altında kalır.
Kendi devresini oluşturmaz: başarısız hesaplar yine soğutma, kilitleme ve devre kesici katmanları tarafından
ele alınır. Bu ayarı `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` ile belirleyin.

**Akıl yürütme çerçeveleri içerik duraklaması bütçesini yeniden başlatır.** Bir akıl yürütme modeli,
ilk görünür belirtecinden önce dakikalarca düşünebilir: Claude, düşünme metni boş olabilen
`thinking_delta` çerçeveleri gönderir ve Responses API, birbiri ardına bir akıl yürütme öğesi akışı oluşturur.
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) bu çerçeveleri tanır ve izleyici,
turu iptal etmek yerine her birinde bütçesini yeniden başlatır. Bunlar yine de model çıktısı değildir;
bu nedenle yalnızca akıl yürütmeyle sona eren bir tur hâlâ boş olarak bildirilir ve akıl yürütmeyi durdurup
yalnızca kalp atışları gönderen bir tur da izleyiciyi yine tetikler.

Kiro'nun boş olmayan imzaya sahip ikili `reasoningContentEvent` çerçeveleri, bu akıl yürütme etkinliğini
yürütücü üzerinden boş bir `reasoning_content` deltası olarak korur. İmza iletilmez. Meta veriler,
tamamlanmamış çerçeveler ve boş imzalar içerik bütçesini yeniden başlatmaz; bağımsız etkin akış zaman aşımı
ve istemci iptali yine geçerlidir (`open-sse/executors/kiro/reasoning.ts`).

**Terminal durumlar (soğutma süresi DEĞİLDİR):**

- `banned` — yasaklı anahtar kelime / hesap yasaklama algılaması tarafından ayarlanır (bkz. [BAN_DETECTION](../security/BAN_DETECTION.md)). Üst akışın istek başına retleri (`request_rejected`, örneğin Anthropic OAuth 403 "Request not allowed") bunu hiçbir zaman ayarlamaz: bunlar bağlantı ve model başına sayılır ve büyüyen, `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 sa) ile sınırlı bir soğutma süresiyle o modeli dönüşümlü kullanımdan çıkarır veya model bilinmiyorsa bağlantıyı soğutur — `open-sse/services/requestRejectedStreak.ts`
- `expired` (sınırlı sayıda yeniden denemeden sonra üstel geri çekilmeyle terminal duruma geçer — `EXPIRED_RETRY_MAX = 3`; böylece geçici OAuth hataları hesap kalıcı olarak devre dışı bırakılmadan önce kendiliğinden düzelebilir)
- `credits_exhausted`

Bunlar, kimlik bilgileri değişene veya bir operatör bunları sıfırlayana kadar kalıcıdır. Terminal durumlarını geçici soğuma durumuyla üzerine yazmayın.

**Tembel kurtarma:** `rateLimitedUntil` geçmişse bağlantı yeniden uygun hâle gelir. Başarılı kullanımda `clearAccountError()` tüm hata alanlarını temizler.

### Claude OAuth kullanım duvarı: daha düşük öncelikli kanal + oturum limiti sıfırlama

**Kapsam:** tek bir Claude aboneliği (OAuth) bağlantısı. Her iki özellik de **bağlantı başına isteğe bağlıdır** (Bağlantıyı düzenle → Claude bölümü → `providerSpecificData` içindeki `lowPriorityMode` / `autoLimitReset`; her ikisi de varsayılan olarak kapalıdır) ve Claude Code'un `/low-priority` ile `/limit-reset` komutlarını yansıtır (kablo sözleşmesi Claude Code 2.1.263 sürümünden alınmıştır).

**Uygulama:**

- Durum makinesi + yanıt sınıflandırması: `open-sse/services/claudeLowPriority.ts`
- Sıfırlama durumu/claim istemcisi: `open-sse/services/claudeLimitReset.ts`
- Yürütücü kancası (header ekleme + aynı hesapla yeniden deneme): `open-sse/executors/base.ts::execute()`
- İsteğe bağlı kalıcılık: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Tetikleyici:** 5 saatlik kullanım duvarı — header'larında
`anthropic-ratelimit-unified-status: rejected` ve hesap uygunsa
`anthropic-ratelimit-unified-slow-offer: treatment` taşıyan bir `429`. İlk duvar
429'u oluşmadan hiçbir şey gönderilmez; unified header'ları olmayan ani bir 429,
normal soğuma yolundan geçer.

**Daha düşük öncelikli kanal** (`lowPriorityMode`):

- Duvar 429'unda yürütücü teklifi kabul eder ve **aynı** hesapla
  `anthropic-usage-limit: slow` header'ını kullanarak hemen yeniden dener; kanal,
  duyurulan `anthropic-ratelimit-unified-reset` zamanına (+60 saniye tolerans) kadar
  etkin kalır ve bu süre içindeki her istek header'ı taşır. Araya girilen 429,
  `handleChatCore`'a hiçbir zaman ulaşmaz; bu nedenle bağlantı **soğumaya alınmaz**
  ve başka bir hesaba döndürülmez.
- Sonraki yanıtlardaki `anthropic-ratelimit-unified-slow-status`: `active` /
  `not_needed` kanalı korur; `slot_busy` (429) veya `529`, sunucunun
  `anthropic-ratelimit-unified-slow-retry-after` değerini bekler (varsayılan 20
  saniye, 5–600 saniye aralığına sıkıştırılır, ±%30 jitter uygulanır) ve
  `anthropic-ratelimit-unified-slow-max-wait` ile sınırlı olarak yeniden dener
  (varsayılan 20 dakika, 1 dakika–6 saat aralığına sıkıştırılır). Bu süre aşıldığında
  kanal sona erer ve 10 dakikalık bir soğuma yeniden kabulü engeller. Bekleme ayrıca
  isteğin kendi upstream başlatma zaman aşımında kalan süreyle
  (`resolveFetchStartTimeout`, varsayılan 10 dakika) 5 saniyelik bir pay düşülerek
  sınırlandırılır: bu sınır olmasaydı varsayılan 20 dakikalık maksimum bekleme
  isteği aşar ve uyku bekleme sırasında kesilerek zarif `max_wait` sonu + soğuma
  yerine bir `TimeoutError` ortaya çıkardı.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 saatlik pencerenin
  yenilenmesi veya `anthropic-ratelimit-unified-overage-in-use: true` ile birlikte
  `ineligible` (ücretli ek kullanım artık duvarı karşıladığı için kanalı herhangi bir
  durumda `extra_usage` olarak sona erdirir) kanalı sonlandırır; ardından yanıt
  normal soğuma yoluna akar. `budget_exhausted`, duyurulan bütçe sıfırlama zamanına
  (en fazla 8 gün) kadar hatırlanır.
- Duvar denetimi, yürütücünün kendi 400 kaynaklı deneme içi yeniden denemelerinden
  (bağlam düzenleme, düşünme/efor sınırlandırmaları, parametrelerin otomatik
  öğrenilmesi) sonra çalışır; bu nedenle yalnızca bu yeniden denemelerden birinde
  ortaya çıkan bir duvar 429'u da soğuma yoluna ulaşmadan yakalanır.
- Durum bağlantı başına bellekte tutulur (yeniden başlatma, yeniden kabul için bir
  ek duvar 429'u gerektirir).

**Oturum limiti sıfırlama** (`autoLimitReset`, ikisi de etkinse kanaldan önce denenir):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` →
  `juniper_tide` bloğu; `arm: "reset"` ve `available: true` olduğunda,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`
  ile `{ "program": "juniper_tide" }` gönderilir (`providerSpecificData.organizationUUID`
  içindeki kuruluş UUID'si, bootstrap geri dönüşü).
- `result: reset|not_limited` → istek tam hızda (slow header olmadan) yeniden
  denenir. `already_used` / `not_offered`, `next_available_at` değerini (varsayılan
  bir hafta) anımsatır; herhangi bir hata 15 dakika geri çekilmeye neden olur.
  Sıfırlama haftada birdir ve yine haftalık limite dâhildir.

Regresyon korumaları: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Biriktirilmiş sıfırlamaları otomatik uygula

**Kapsam:** Codex ve Claude aboneliği (OAuth) bağlantıları.**Kaydol** : `bankedResetAutoApply` ayarı varsayılan olarak kapalıdır ve `dry-run` modundadır (Ayarlar → AI → Sıralı sıfırlamaları otomatik uygulama).

**Amaç:** Bir hesap kullanım duvarına çarptığında, operatörün Sağlayıcı Sınırları sayfasında "Kullan" tuşuna basmasını beklemek yerine, banka sıfırlamalarını kendi başına harcayın.

| Kredi türü (`creditTypes`) | Neler kurtarıldı                                         | Nerede çalışıyor                                           |
| -------------------------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| `codexCredits`             | Codex kredilerini sıfırlama                              | arka plan işi, her 60 saniyede bir                         |
| `claudeCredits`            | Claude banka hibeleri (`GRANT` kredileri)                | arka plan işi, her 60 saniyede bir                         |
| `claudeSessionReset`       | Claude haftalık oturum limitinin sıfırlanması (yukarıda) | hesap başına geçişle aynı politika aracılığıyla istek yolu |

**Uygulama:**

- Saf karar (her iki yol için belirlenmiş tek kural): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Arka plan işi: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` başladı)
- Claude istek yolu kapısı: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts` `setClaudeLimitResetPolicy()` aracılığıyla kayıtlı
- Tarih, büyük harfler ve web kancası: `src/lib/usage/bankedResetAudit.ts`
- Geçmiş API: `GET /api/settings/banked-reset-auto/history?limit=50` (yönetim yetkilendirmesi)

**Karar sırası** (ilk başarısız kural kaydedilen nedendir):

1. Özellik kapalı, kredi türü kapalı veya hesap kapsam dışı (`accountScope` `all` / `selected` artı hesap başına `connections` haritası).
2. İsteğe bağlı UTC programının dışında (`startHourUtc` > `endHourUtc` gece yarısını geçiyor).
3. Son 24 saatteki sınırlar: Herhangi iki kullanım arasındaki `maxPerAccountPerDay` (1), `maxPerDay` (3) ve `minSpacingMinutes` (30).
4. Tetikleyici: duvarlı bir `session` veya `weekly` penceresi ( `getQuotaWindowStatus().reachedThreshold` değil `isAccountQuotaExhausted()` okunur; bu, yalnızca harcanan her pencerede bir hesabı rapor eder) veya en az `expiringCreditMinUsedPercent` (50) kullanan bir hesapta `expiringCreditHours` (24) içinde süresi dolan bir kredi.
5. Doğal sıfırlama koruması: `sessionResetGuardMinutes` (90) içindeki duvarlı 5 saatlik pencere veya `weeklyResetGuardHours` (12) içindeki duvarlı haftalık pencere sıfırlandığında atlayın.
6. Haftalık kat: Haftalık kalan `weeklyFloorPercent` (10) altında olduğunda 5 saatlik sıfırlamayı atlayın.
7. `last-resort` modu: aynı sağlayıcının kapsam dahilindeki başka bir hesabında her iki pencerede de en az `poolHeadroomPercent` (10) kaldığında atlayın. Süresi dolan kredi tetikleyicileri bunu atlar.
8. `dry-run` bir satırı kaydeder ve hiçbir şeyi ödemez; `last-resort` ve `eager` kullanın.

Kota verilerinin eksik olması hiçbir zaman bir kullanımın kilidini açmaz: bilinmeyen bir sıfırlama süresi veya haftalık kullanım atlamaları.

**Claude oturumu sıfırlama:** özellik kapalıyken veya `claudeSessionReset` kapalıyken, hesap başına `autoLimitReset` geçişi tam olarak daha önce olduğu gibi karar verir. Her ikisi de açıkken bu özellik, hesap başına geçişlerin yerini alır: kapsam dahilindeki bir hesap, yalnızca politika izin verdiğinde talepte bulunabilir ve `dry-run` modunda hiçbir talepte bulunulmaz.

**Emniyet:** iş, onay başına en fazla bir kredi kullanır, kredileri listelemeden önce karar verir (atlanan bir hesap hiçbir zaman listelenmez), `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` idempotency anahtarlarını kullanır ve başarısız bir listeleme veya ödemeden sonra bir hesabı 1 saat süreyle yedekler. Her ödeme, başarısızlık ve prova kararı `audit_log` yazılır (`action: "bankedReset.redeem"`, belirteç veya kredi kimliği yoktur); büyük harfler bu satırlardan sayılır, böylece yeniden başlatmalarda hayatta kalırlar. Başarılı kullanımlar aynı zamanda `provider.reset_redeemed` web kancasını da tetikler.

Regresyon korumaları: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Oturum yakınlığı (#7274)

**Kapsam:** herhangi bir sağlayıcı için bir istemci oturumu
(`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header'ı) tek bir
bağlantıya sabitlenir.

**Amaç:** çok turlu bir aracıyı (Claude Code, aider, özel aracılar) istekler
arasında aynı hesapta tutarak, hesaplar arası bağlam kaybını ve hesap başına oturum
durumuna sahip sağlayıcılarda tekrarlanan soğuk başlatma 429'larını azaltmak.

**Uygulama:**

- TTL çözümleme: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin seçimi/oluşturulması: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header çıkarma (genel, herhangi bir sağlayıcı): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Kalıcı pin tablosu: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ayar: `sessionAffinityTtlMs` (ms cinsinden global TTL, `0` devre dışı bırakır) —
  `src/lib/db/settings.ts`. Daha önce Codex'e özel olan
  `codexSessionAffinityTtlMs` adından, `124_generic_session_affinity_ttl.sql`
  geçişiyle yeniden adlandırıldı; önceden yapılandırılmış Codex TTL'si yeni varsayılan
  değer olarak taşınır.

#7274'ten önce `resolveSessionAffinityTtlMs()`, `codex` dışındaki her sağlayıcı
için erken bir çıkışla `0` değerini döndürüyordu; bu nedenle pinleme mekanizması ve
header çıkarma zaten sağlayıcıdan bağımsız olsa da TTL ayarının (ve oturum
header'larının) başka hiçbir yerde etkisi yoktu. Düzeltme bu erken dönüşü kaldırdı;
TTL artık global olarak `0` değerinin üzerinde ayarlandığında her sağlayıcıya
aynı şekilde uygulanır.

Üç oturum yakınlığı header'ı upstream'e hiçbir zaman iletilmez — yürütücüler
istemci header'larını olduğu gibi geçirmek yerine kendi upstream header'larını
sıfırdan oluşturur; dolayısıyla bu yalnızca dahili bir ilişkilendirme kimliği
olarak kalır.

### Özel yönetilen oturum bağlantısı kiralamaları

**Kapsam:** bir etkin yönetilen HTTP istemcisi/oturumu, uygun bir OmniRoute bağlantısının sahibidir.

**Amaç:** istekler arasında katı bir yönlendirme sınırına ihtiyaç duyan istemciler için kalıcı ve
özel bağlantı sahipliği sağlamak. Bu, yumuşak bir süreklilik tercihi olan oturum benzerliğinden
farklıdır: özel kiralama, yaşam döngüsü durumunu SQLite'ta kalıcı hâle getirir, genel etkin sahip
ve etkin bağlantı benzersizliğini zorunlu kılar ve sağlayıcıya gönderimden önce eski bir
jenerasyonu reddeder.

Bu özellik API anahtarı başına isteğe bağlıdır. Yönetilen bir anahtarın `lease:exclusive` kapsamına
ve açık, boş olmayan bir `allowedConnections` listesine sahip olması gerekir. Her HTTP istemcisi
yaşam döngüsü uç noktasını kullanabilir; istemci adı, user-agent, sağlayıcı, OAuth yöntemi veya
model gerekli değildir. Kiralama bir modele değil, bağlantıya sahip olur; bu nedenle bağlantı
normal şekilde uygun kaldığı sürece model değişikliği bağlamayı korur. Normal model, kota, sağlık,
bekleme süresi ve izin listesi kuralları yetkili olmaya devam eder ve aynı jenerasyonu başka bir
boş, uygun bağlantıya geçirebilir.

Yaşam döngüsü, JSON `acquire`, `renew` ve `release` eylemlerine sahip
`POST /api/v1/session-leases` isteğidir. Yönetilen çıkarım istekleri opak
`X-OmniRoute-Lease-Owner` değerini ve tam `X-OmniRoute-Lease-Generation` değerini gönderir.
Sahip, `vlo_` ile başlayan 43 base64url karakteri kullanır; yalnızca SHA-256 karması saklanır.
Her nihai gönderim sınırı, kimliği doğrulanmış API anahtarı kimliğini ve etkin bağlantı kimliğini
de bağlar. Kiralama denetimi başlıkları günlüklerden, saklanan istek anlık görüntülerinden ve
yukarı akış yürütücüsü başlıklarından kaldırılır.

Normal yönlendirmede uygun yönetilen adaylar varsa ancak her boş aday yabancı bir etkin kiralama
tarafından kullanılıyorsa OmniRoute HTTP `429`, `lease-capacity-unavailable` kodunu,
`waiting-for-capacity` durumunu ve en erken ilgili sona erme zamanından türetilen sınırlı bir
`Retry-After` değerini döndürür. Normal uygun aday yokluğu kiralama çekişmesi değildir ve mevcut
yönlendirme hata anlamını korur.

İlgili mekanizmalar ayrı kalır:

- OAuth oturum doluluğu, OAuth hesapları için işlem yerelinde uygulanan yumuşak dağıtımdır.
- Hesap semaforları istek eşzamanlılığı izinleri verir ve istek tamamlandığında sona erer.
- Özel yönetilen oturum kiralamaları, jenerasyon sınırına sahip kalıcı yaşam döngüsü sahipliğidir.

## 3. Model Kilitleme

**Kapsam:** sağlayıcı + bağlantı + model üçlüsü.

**Duruma göre kapsam:** başarısız durum, kilitlemenin hangi anahtara yazılacağını belirler
(`open-sse/services/accountFallback/exactModelLock.ts` içindeki `resolveLockoutScope()`):

- `429` / `403` / `402` — kota veya yetkilendirme sinyali — **kota ailesini** kilitler:
  codex için bağlantının tamamındaki `codex` / `spark` kapsamı (her `gpt-5*` modeli), diğer
  sağlayıcılar için `getQuotaScopedModelForProvider()`.
- `404`, yalın modeli kilitler (`getModelLockKey()` `not_found` kapsamını daraltır).
- Diğer tüm durumlar — `5xx` aktarım/sunucu hataları ve OmniRoute'un kalite doğrulamasından
  sentezlediği `502` — yalnızca **tam** sağlayıcı/bağlantı/model üçlüsünü kilitler. Bir modeldeki
  hatalı akış, hesabın kotası hakkında kanıt oluşturmaz; bu kuraldan önce
  `codex/gpt-5.6-luna` üzerinde alınan tek bir boş yanıt, kotası etkilenmemişken bu bağlantının
  tüm `gpt-5*` modellerini 2–30 dakika boyunca (kademeli olarak artarak) yönlendirmeden
  çıkarıyordu.
- Çağıranın açık `scope` seçeneği her zaman önceliklidir (Antigravity `"exact"` iletir).

**Amaç:** yalnızca bir model kullanılamadığında veya kota sınırına ulaştığında tüm bağlantının
devre dışı bırakılmasını önlemek.

**Örnekler:**

- 429 döndüren model başına kota uygulayan sağlayıcılar
- Eksik bir model için 404 döndüren yerel sağlayıcılar
- Sağlayıcıya özgü mod/model izin hataları (ör. Grok modları)

**Uygulama:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Bekleme Süreleri Panosu (v3.8.0)

Arayüz: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Etkin kilitlemeleri şu bilgilerle listeler: sağlayıcı, bağlantı, model, neden, expiresAt.
Operatörler kart üzerinden bir modeli manuel olarak yeniden etkinleştirebilir.

**REST API:**

- `GET /api/resilience/model-cooldowns` — etkin kilitlemeleri listeler
- `DELETE /api/resilience/model-cooldowns` — manuel olarak yeniden etkinleştirir. Gövde: `{provider, connection, model}`. Kimlik doğrulama: management.

### Bekleme Süresi Yöneticisi

Arayüz: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Geçici bir nedenle yönlendirme dışı kalan her bağlantı için, her sağlayıcı sayfasını
ayrı ayrı açmak yerine tek bir sayfa sunar. Bağlantı bekleme sürelerini, model kilitlemelerini ve
terminal durumlarını listeler; bunları bağlantı başına, seçilenler için veya bir sağlayıcının
tüm bağlantıları için temizler ve en sık ayarlanan bekleme süresi kurallarını düzenler:
`streamStallCooldown.enabled` ile OAuth / API anahtarı `connectionCooldown` temel bekleme süresi
ve azami geri çekilme adımı sayısı (`PATCH /api/resilience` üzerinden kaydedilir). Terminal
durumlar (`banned`, `expired`, `credits_exhausted`) listelenir ancak burada hiçbir zaman
temizlenmez.

Aynı sayfadaki **Error cooldown rules** kartı, operatör hata kurallarını
(`settings.providerErrorRules`) ve sağlayıcı başına tüm durumları kapsayan varsayılanları
(`settings.providerErrorDefaults`) `PATCH /api/settings` üzerinden düzenler — eşleştirme
biçimleri için §7 altındaki "Operator-declared rules" bölümüne bakın. Süreler Default
(açık bir bekleme süresi yok), 30 min, 1 h, 5 h, 24 h veya 1–43.200 dakika (30 gün)
aralığında özel bir değer olabilir.

**REST API** (`src/lib/resilience/cooldownManager.ts`, kimlik doğrulama: management):

- `GET /api/resilience/cooldowns[?provider=]` — durum, kalan bekleme süresi, geri çekilme
  seviyesi, son hata türü ve model kilitlemeleriyle birlikte bağlantıları döndürür
  (kimlik bilgileri dahil değildir)
- `POST /api/resilience/cooldowns` — gövde `{connectionIds: string[]}` veya
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` döndürür

### Kilitleme ayarları arayüzü + başarıyla azalan kurtarma (v3.8.23)

Model kilitleme, her zaman etkin ve sabit kodlanmış bir davranış olmaktan çıkarılarak, kendi
ayar kartına ve kendini iyileştiren bir kurtarma yoluna sahip, tamamen yapılandırılabilir
ve isteğe bağlı bir özellik hâline getirildi.

**Ayar kartı:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Bu kart, yalnızca etkin kilitlemeleri _listeleyen_ yukarıdaki salt okunur
`ModelCooldownsCard`'dan **farklıdır** — yeni kart _parametreleri yapılandırır_. Varsayılanlar
`DEFAULT_MODEL_LOCKOUT_SETTINGS` (`src/lib/resilience/modelLockoutSettings.ts`) içinde bulunur:

| Ayar                    | Varsayılan                       | Anlam                                                                    |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Ana anahtar — model kilitleme **varsayılan olarak kapalıdır**.           |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model kapsamındaki hata olarak sayılan üst akış durumları.               |
| `baseCooldownMs`        | `120_000` (120 s)                | İlk hata için başlangıç kilitleme süresi.                                |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Kademeli olarak artırılan bekleme süresinin üst sınırı.                  |
| `maxBackoffSteps`       | `10`                             | Üstel geri çekilme artış adımlarının azami sayısı.                       |
| `useExponentialBackoff` | `true`                           | Yinelenen hataların bekleme süresini üstel olarak artırıp artırmayacağı. |

Ayarlar normal ayar deposu üzerinden kalıcı hâle getirilir ve resilience ayar şemasıyla
doğrulanır; kart `baseCooldownMs`/`maxCooldownMs` değerlerini
(`maxCooldownMs ≥ baseCooldownMs` olacak şekilde) ve `maxBackoffSteps` değerini sınırlar.

**Başarıyla azalan kurtarma:** kurtarma yalnızca zamanlayıcının sona ermesine bağlı değildir.
Sağlıklı bir yanıt, modelin hata sayısını azaltır; böylece kurtarma süresi içinde iyileşen bir
model, zamanlayıcısı dolmadan kademeli artışı durdurur (ve kilidi kaldırır). Başarılı bir
combo hedefinde `open-sse/services/combo.ts`,
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`) işlevini çağırır; bu işlev
kaydedilmiş `failureCount` değerini yarıya indirir (`Math.floor(failureCount / 2)`); değer
`0` olduğunda kilitleme girdisi tamamen silinir. Bunun karşılığı olan
`recordModelLockoutFailure()`, kademeli artış penceresi içindeki hatalarda sayıyı artırır
(ve bekleme süresini yükseltir). Bu başarıyla azalan kurtarma, normal zamanlayıcı süresinin
dolmasına ek olarak çalışır — iki yoldan biri modeli yeniden etkinleştirebilir.

**Durum:** kilitlenmeler **bellek içinde** tutulur (process başına `Map`'ler içinde, anahtarı
`provider:connectionId:model` olan `ModelLockoutEntry` değerleri; tam kapsamlı kilitlerin anahtarları
`provider:connectionId:exact:model`), veritabanına
kalıcı olarak yazılmaz — yeniden başlatma sonrasında kaybolurlar. _Ayarlar_ kalıcı olarak saklanır; etkin
kilitlenme _durumu_ geçicidir.

---

## 4. Kota-Paylaşım Eşzamanlılık Kontrolü (v3.8.36)

Abonelik hesapları (GLM, MiniMax, vb.) genellikle yalnızca ~ 1-3 eşzamanlı istekleri kabul eder; bunun aşılması 429'ları ve bekleme sürelerini tetikler. Bu durum akut **kota paylaşımı** (`qtSd/…`) birden fazla API anahtarının bir yukarı akış hesabını paylaştığı kombinasyonlar. Üç katman, paylaşılan bir hesabın su basmasını önler.

### Bağlantı başına eşzamanlılık sınırı (`max_concurrent`)

Her sağlayıcı bağlantısı bir `max_concurrent` tavanı bildirebilir (`provider_connections.max_concurrent`, bağlantı modunda / API / DB ayarlanır). Sınırsız olarak boş bırakın. Bu, — altındaki serileştirme katmanını çalıştıran ve bunu hesabın gerçek eşzamanlılığına ayarlayan tek düğmedir (örn. GLM ~ 1, MiniMax ~ 2).

### Model başına eşzamanlılık sınırları (`modelConcurrency`)

Bir bağlantı ayrıca `rateLimitOverrides` haritasında model başına tam eşzamanlılık tavanlarını bildirebilir:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Bağlantı modunda ayarlayın (**Hız sınırı → geçersiz kılar Model başına eşzamanlılık sınırları** , satır başına bir `model=cap` ) veya aynı JSON şekline sahip `PATCH /api/providers/[id]` aracılığıyla. Anahtar anlambilim:

- **Bağlantı genelinde ve modele özel:** `maxConcurrent` bağlantı genelinde paylaşılan tavan olmaya devam ediyor. Her ikisi de geçerli olduğunda, her iki geçit de aynı bileşik geçitte (`global → provider → account → model`) atomik olarak elde edilir; etkili davranış daha katı uygulanabilir sınırdır.
- **Tam model-anahtar eşleşmesi:** anahtar, — yönlendirme çözümünün ardından yürütücüye iletilen model dizisidir, istemci tarafı `provider/model` takma adı değil (`zai/glm-5` `glm-5` ile eşleşmez), normalde çıplak yukarı akış model kimliğidir (`glm-5`). Değerler pozitif tamsayı eşzamanlı istek tavanlarıdır.
- **Yerel sıraya alma, keşif yok:** aşırı istekler, mevcut queue/timeout anlambilimiyle (yazılan `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` kabul hataları) yerel olarak sıraya girer. OmniRoute — yukarı akış politikasını keşfetmez veya bu politikayı çıkarmaz, operatörün yapılandırdığı tavan değerleri tam olarak uygular. Doymuş bir model kapısı hiçbir zaman sağlayıcıyı devre dışı bırakmaz ve hiçbir zaman kalıcı bir model kilitlemesi yaratmaz; yukarı akış 429/cooldown/fallback davranışı hata geri döndürmez olarak kalır.
- **Bağlantı başına, işlem başına kapsam:** Büyük harfler veritabanı bağlantısı başınadır ve bellekte tutulur, bu nedenle aynı yukarı akış API anahtarını yeniden kullanan iki bağlantı birbiriyle koordine olmaz.
- **Yapılandırılmamış, değişmemiş anlamına gelir:** haritayı atlamak (veya kontrol paneli alanını boş bırakmak) hiçbir model kapısı eklemez. Herhangi bir evrensel sağlayıcı sınırı belirtmeden örnek yapılandırma:

```text
glm-5=1
glm-4.7=3
```

### Kota paylaşımı isteği serileştirme

Bir kota paylaşımı gönderimi, pozitif `max_concurrent` bildiren bir bağlantıyı hedeflediğinde, buna yönelik eşzamanlı istekler **hesap** bağlantı başına bir semafor (anahtar `qsconn:<connectionId>`) aracılığıyla serileştirilir: aşırı istekler **kuyrukta bekle** hesabı su basmak yerine. öyle **arızalı açma** — doymuş bir kuyruk veya zaman aşımı, gönderilebilir bir isteği reddetmek yerine bir yuva olmadan ilerler. Geçiş yap **Ayarlar → Dayanıklılığı → Bağlantı başına kota paylaşımı eşzamanlılığı** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, varsayılan olarak açıktır). `max_concurrent` sınırı olmadan davranış değişmez.

> Kota paylaşımlı yönlendirme kapısının (`selectQuotaShareTarget`, DRR + P2C) kendisi arıza durumunda açıktır ve yalnızca sabit sınırlayamadığı tek bağlantı havuzuna sahip bir üst sınır bağlantısı — önceliklerini kaldırır, dolayısıyla bu semafor aslında taşmayı içeren şeydir.

### Kombine soğuma süresine duyarlı yeniden deneme

Her kombo stratejisi için (etkinleştirildiğinde), bir SHORT geçici bekleme süresi için 429'u kristalize edecek bir istek, onu bekler ve 429 — döndürmek yerine yeniden gönderir; bu, çoklu model kombolarda Gemini sınıfı TPM/RPM pencerelerini (~ 60'lar yeniden deneme) kapsar, örneğin 2 modelli kombonun her iki hedefi de model başına hız sınırına ulaşır. `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ile sınırlandırılmıştır.**Ayarlar → Dayanıklılığı** . Asla `quota_exhausted` (gece yarısına kadar kilitli) veya auth/not-found nedenlerini beklemez. `comboTimeoutMs` ayarlandığında, bu son tarihten önce bitirilemeyen bir bekleme başlamaz (#18998): kombo, `COMBO_TIMEOUT` 504 yerine terminal yanıtıyla hemen yanıt verir.

Bir kombinasyon `config.comboCooldownWaitEnabled: false` ile devre dışı bırakılabilir. Yalnızca gerçek `false` bu paylaşılan birleşik beklemeleri (gönderim sonrası bekleme süresi ve dağıtım öncesi circuit-open/model-lock beklemeleri) ve bunların bekleme bütçesi zaman aşımı taban uzatmasını devre dışı bırakır. Eksik veya `true` küresel politikayı korur; `true` genel olarak devre dışı bırakılmış beklemeyi etkinleştiremez. Açık bir `targetTimeoutMs` hala kazanıyor. Bu vazgeçme, ayrı yerel Kodeks dönüş pimi dağıtım öncesi bekleme süresini değiştirmez.

Aynı geçit, sevk öncesi durumu (#16319) kapsar: modeli kısa bir geçici kilitlemede olduğundan bir kombonun her hedefi herhangi bir girişimde bulunulmadan atlandığında, sıfır denemeli yol, ipucu içermeyen bir `503 ALL_TARGETS_SKIPPED` yanıt vermek yerine kilitlemeyi aynı tavanlar altında bekler ve yeniden gönderir. Beklemeye izin verilmediğinde (tavan, deneme veya bütçe tükendiğinde veya özellik kapalı), terminal yanıtı, en erken geçici kilit süresinin sona ermesinden itibaren `retry_after` / `reset_at` taşıyan `429 rate_limit_error` yükseltilir; kota, kimlik doğrulama ve bulunamadı kilitleri ipucu içermeyen 503'ü korur.

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

## 7. Upstream Durumunun Yeniden Belirlenmesi (yanlış bildirilen kota hataları)

**Kapsam:** geçici kota tükenmesini yanlış HTTP durumuyla bildiren tek bir upstream gateway.

**Amaç:** yanıltıcı durumu SINIFLANDIRMADAN ÖNCE düzeltmek; böylece downstream tüketiciler (fallback engine, combo aggregation, istemciye gönderilen yanıt) hatanın gerçek yeniden denenebilir niteliğini görür.

Bazı gateway'ler GEÇİCİ kota tükenmesini yeniden denenemez bir HTTP
durumuyla bildirir. `agentrouter.org`, standart `429` yerine Çince bir gövdeyle
(`用户额度不足` / `额度不足`) `403` (bazen `400`) döndürür. Claude
Code gibi istemciler `403` durumunu kalıcı kabul edip oturumu sonlandırır ve düzeltme
olmadan fallback engine bunu bir kota olayı yerine `AUTH_ERROR` olarak sınıflandırır.

**Uygulama:**

- Kayıt defteri + eşleştirici: `open-sse/config/upstreamStatusRestatement.ts` — sağlayıcı başına bir kural listesi (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`); `applyStatusRestatement()` aracılığıyla eşleştirilir.
- Çağrı noktası: `open-sse/handlers/chatCore.ts` içindeki `providerFailure:` bloğu (yaklaşık 3654. satır); `parseUpstreamError()` bir upstream yanıtını hata HTTP durumuyla (`!providerResponse.ok`) ayrıştırdıktan hemen sonra ve herhangi bir sınıflandırma çalışmadan önce çağrılır. Böylece tüm downstream tüketiciler düzeltilmiş durumu görür. `200` SSE akışı içine gömülü hatalar ayrı ve daha sonraki bir akış ayrıştırma yolunu izler; bugün bu hook tarafından **kapsanmaz** — bu bilinen bir sınırlamadır ve şu an için agentrouter'ın hata HTTP durumu olarak ortaya çıkan yanlış durumu için gerekli değildir.
- Yeniden deneme uygunluğu: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES` içinde yer alır (`open-sse/services/combo/unavailableRetryGate.ts`); bu nedenle yeniden belirlenen hata, ölü bir `403` olarak sunulmak yerine gerçek bir yeniden deneme penceresi taşır.
- Sentetik `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) yalnızca yeniden belirlenen yanıtın **istemciye** bildirdiği değerdir; bağlantının dahili soğuma/kilitlenme süresinin kendisi değildir — bu süre, yeniden belirlenen hatayı fiilen ele alan mekanizma tarafından ayrı olarak yönetilir (Connection Cooldown'un §2'de açıklanan kademeli backoff'u; API anahtarı sağlayıcıları için temel değer `3s`; veya agentrouter gibi model başına kota kullanan sağlayıcılar için §3'teki Model Lockout). Router'ın dahili olarak yeniden denemeye, istemciye bildirdiği 60 saniyelik pencereden daha önce uygun hale gelmesi mümkündür — bu kasıtlı bir paydır, hata değildir.

Kalıcı hatalar (agentrouter'ın `无权访问模型` — bu modele erişim yok) ASLA yeniden
belirlenmez: `excludeMarkers`, `textMarkers` eşleşse bile kuralı veto eder;
böylece hata özgün durumunu korur ve hiçbir şey sonsuza kadar yeniden denenmez. Eşleşen
sağlayıcı sınıflandırma kuralı
(`open-sse/config/providerErrorRules.ts` içindeki
`agentrouter-model-access-denied`: `reason: "auth_error"`,
`scope: "model"`, bildirilen temel soğuma süresi `6h`), genel apikey kategorisindeki
`FORBIDDEN` erken dönüşünden _önce_, `checkFallbackError`
(`open-sse/services/accountFallback.ts`) tarafından
`honorsRuleLockScope(provider)` (#10334 — şu anda
`providerErrorRules.ts` içindeki `HONORS_RULE_LOCK_SCOPE_PROVIDERS` izin verilenler listesi aracılığıyla yalnızca agentrouter'a özel) koşuluyla ele alınır. Kuralın bildirdiği 6 saatlik soğuma süresi `fallbackResult.baseCooldownMs` üzerinden aktarılır; ancak yine de mevcut model başına kota kilitlenmesi yolunu (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`) kullanır (`#10334`, soğuma süresi kaynağı dışında bu yolu değiştirmez): diğer tüm model kilitlenmelerinde olduğu gibi operatörün `mlSettings.maxCooldownMs` değerine (varsayılan `1_800_000ms` / 30 dakika) düşürülür ve _kalıcı kilitlenme nedeni_ kuralın `"auth_error"` değeri değil, mevcut sabit `"forbidden"` değeri olarak kalır — uçtan uca yalnızca soğuma süresi dikkate alınır, neden dizesi dikkate alınmaz. Bağlantının kendisi etkin kalır; aynı bağlantıdaki kardeş modeller etkilenmez.

Yeniden belirlenen kota hataları (`额度不足`) üretimde bir sağlayıcı kuralına ulaşır
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, kendisine ait bildirilmiş bir soğuma süresi yoktur — persistence katmanının ölçeklendirilmiş backoff varsayılanı uygulanır). #10334'ten bu yana `ProviderErrorRuleMatch` içindeki `scope` uçtan uca TÜKETİLİR, ancak **yalnızca** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` izin verilenler listesinde yer alan sağlayıcılar için (`providerErrorRules.ts` — bugün yalnızca `"agentrouter"`, `honorsRuleLockScope()` aracılığıyla koşullandırılır). Diğer tüm sağlayıcılar için `scope`, #10334'ten önce olduğu gibi bilgilendirme amaçlı kalır.
`checkFallbackError`, eşleşen kuralın kapsamını `fallbackResult.ruleScope` olarak sunar;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`), bir `ruleScope` değerinin bağlantı genelinde ve kendi kendini kurtaran bir sinyal olarak dikkate alınmasının gerçekten güvenli olduğunu doğrulayan ortak korumadır (`scope` `"connection"`, `reason` `quota_exhausted`, hiçbir zaman `permanent` veya `creditsExhausted` değil — gelecekteki bir kuralın `scope` `"connection"` değerini kalıcı bir hesap durumuyla eşleştirmesine karşı koruma). İki tüketici bunu çağırır:

- **Kalıcılaştırma** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider **model başına** kilitleme dalına düşmek yerine
  (agentrouter `passthroughModels: true` → `hasPerModelQuota()`
  `true` döndürür), **geçici bağlantı soğutma süresi** uygular —
  `testStatus: "unavailable"` + `rateLimitedUntil`; hiçbir zaman terminal durum
  (`credits_exhausted`/`banned`/`expired`) oluşturmaz — böylece bağlantı,
  manuel kimlik bilgisi sıfırlaması gerektirmek yerine soğutma süresi
  dolduğunda kendiliğinden yeniden kullanılabilir. `disableCooling: true`
  olan bağlantılar için atlanır (#2997): bu devre dışı bırakma seçeneği bunun
  yerine model başına kilitlemeye düşer (belgelenmiş bir ödünleşim —
  dalın üzerindeki kod yorumuna bakın).
- **Aynı istek içindeki combo yönlendirmesi** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): aynı koruma, bağlantıyı
  `${provider}:${connectionId}` anahtarıyla bellekteki
  `exhaustedConnections` kümesine ekler. Bu yalnızca kendi hedef nesnesinde
  tam olarak bu `connectionId` değerini zaten taşıyan, aynı istekte kalan bir
  hedefi atlar (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections`
  aramasından önceki `if (provider &&
connectionId)`) — kardeş hedeflerin kendilerine ait sabitlenmiş
  `connectionId` taşımadığı ve her dağıtımda yanıttaki
  `X-OmniRoute-Selected-Connection-Id` başlığından yalnızca birinin çözümlendiği
  düz model listesi combo'su bu anahtar eşleşmesine hiçbir zaman ulaşmaz. Bu
  yaygın durumda, kalan bir adımın az önce tükenen hesabı yeniden kullanmasına
  karşı gerçek koruma bu Set değildir — üstteki kalıcılaştırma katmanıdır
  (bağlantının `rateLimitedUntil` değeri artık gelecektedir); ayrıca aynı
  koruma, hata için `transientRateLimitedProviders` değerinin bastırılmasını
  sağlar (bkz. "İki aşamalı tasarım" ve `targetExhaustion.ts` içindeki
  `isAgentrouterConnectionQuotaScope` dalının kod yorumu): Set işaretlenmeden
  bırakıldığında, `combo.ts` içindeki `allowRateLimitedConnection` zorunlu
  izin verme davranışı (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`)
  sağlayıcının kalan adımları için devreye GİRMEZ; dolayısıyla kimlik bilgisi
  seçiminin `rateLimitedUntil` filtresine (`src/sse/services/auth.ts:1238`)
  normal şekilde uyulur ve kalan bir adım farklı, hâlâ uygun bir agentrouter
  bağlantısını seçer ya da kullanılabilir kimlik bilgisi bulunamadığı için
  başarısız olur — bu dalın az önce soğutmaya aldığı bağlantıya zorla geri
  dönmez.

### İki aşamalı tasarım: durumun yeniden ifade edilmesi, ardından sınıflandırma

Durumun yeniden ifade edilmesi (`upstreamStatusRestatement.ts`) ve sağlayıcı
sınıflandırma kuralları (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`), her ikisi de sağlayıcı kimliği ve metin işaretçileri
üzerinden anahtarlanan ayrı kayıt defterleridir; ancak farklı yerlerde çalışır
ve farklı amaçlara hizmet ederler: yeniden ifade etme, HTTP durumunu
`chatCore.ts` içinde erkenden yeniden yazar; sınıflandırma kuralları ise
`checkFallbackError()` (`open-sse/services/accountFallback.ts`) içinde
yedek `reason` değerini seçer ve `scope` değerini (`model` / `provider` /
`connection`) kilitler.

Sınıflandırma kuralları, `providerErrorRules.ts` içindeki
`FULL_TEXT_RULE_PROVIDERS` izin listesindeki sağlayıcılar için yalnızca tam
hata **metnini** görür (gövde işaretçileri olan `额度不足` gibi değerleri
eşleştirmek için gereklidir) — şu anda yalnızca `"agentrouter"`. Diğer tüm
**yerleşik katalog** sağlayıcıları için `checkFallbackError`,
`getProviderErrorRuleMatch` işlevine yalnızca yapılandırılmış hatayı
(`{code, type}`) iletir; bu, başlık/durum/kod tabanlı kurallar için yeterlidir,
ancak gövde metni işaretçilerini göremez. `resolveRuleMatchBody()` yardımcısı
bu seçimi gerçekleştirir: izin listesindeki sağlayıcılar için tam hata metni,
diğerleri için yapılandırılmış hata. Bir **yerleşik** sağlayıcıyı
`FULL_TEXT_RULE_PROVIDERS` listesine eklemek, sağlayıcı başına açık bir
etkinleştirmedir — listedeki her sağlayıcı için varsayılan yolun bayt
düzeyinde değişmeden kalmasını sağlamak amacıyla vardır.

Bir kuralın `scope` değeri (`model` / `provider` / `connection`),
`FULL_TEXT_RULE_PROVIDERS` listesinden ayrı bir etkinleştirmedir:
`checkFallbackError` bunu yalnızca `fallbackResult.ruleScope` olarak sunar ve
aşağı akış tüketicileri bunu, aynı dosyadaki
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` izin listesinde bulunan sağlayıcılar için
bilgilendirici bir etiket olmanın ötesinde dikkate alır
(`honorsRuleLockScope()` üzerinden denetlenir — bugün yalnızca
`"agentrouter"`). İzin listesindeki bir sağlayıcı için
`scope: "connection"` eşleşmesinin gerçekte ne yaptığı konusunda yukarıdaki
"Yeniden ifade edilen kota hataları" bölümüne bakın.

**#11104 — operatör tarafından tanımlanan kurallar her iki izin listesini de
bypass eder.** Bir operatör, bu dosyayı düzenlemeden çalışma zamanında
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
üzerinden sağlayıcı başına bir kural tanımlayabilir. Bir operatör kuralını,
**varsayılan** yerleşik katalog kurallarının davranışını korumak amacıyla
kullanılan `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`
izin listelerinin arkasına almak, ayarlar mekanizmasını hâlihazırda listelenen
sağlayıcılar dışındaki her sağlayıcı için etkisiz hâle getirirdi; çünkü kuralı
tanımlamak zaten operatörün açık etkinleştirmesidir. `resolveRuleMatchBody()` ve
`honorsRuleLockScope()` önce `hasOperatorRuleForProvider()` kontrolü yapar:
operatör kuralına sahip bir sağlayıcı, diğer izin listelerinden herhangi birinde
yer alıp almadığına bakılmaksızın ham hata metnini alır ve tanımlanmış
`scope` değeri dikkate alınır.

**Operatör tarafından tanımlanan kurallar** (`OperatorProviderErrorRule`):
her kuralda isteğe bağlı bir `status` ve isteğe bağlı bir `match` bulunur
(`match`, hata metninde büyük/küçük harfe duyarsız düz bir alt dizedir;
hiçbir zaman RegExp değildir, dolayısıyla ReDoS'a neden olamaz) ve iki
alandan en az birini ayarlamalıdır. Her ikisi de ayarlanmışsa AND işlemiyle
birleştirilir; atlanan alan her şeyle eşleşir, dolayısıyla
`{match: "insufficient_quota"}` bu kodu taşıyan herhangi bir durumla
eşleşir. İlk eşleşen kural kazanır. `cooldownMs` en fazla 30 günü kabul eder;
toplamda en fazla 50 kural olabilir.

**Tümünü kapsayan varsayılanlar** (`settings.providerErrorDefaults`, isteğe bağlıdır, `setOperatorProviderErrorDefaults` üzerinden ayarlanır): `{[provider]: {cooldownMs, scope?, reason?}}`
`cooldownMs` değeri 1 dakika ile 30 gün arasında olmalıdır. Bir varsayılan yalnızca hiçbir operatör kuralı ve yerleşik katalog kuralı eşleşmediğinde ve yalnızca 402, 403, 408, 429 ile 5xx hatalarında uygulanır. İstek biçimi hataları (400, 404, 409, 413, 422) ve tek başına görülen 401 hataları kendi işleme mantığını korur. Açık bir `reason` belirtilmediğinde neden, `classifyError` işlevindekiyle aynı şekilde durum kodundan alınır. Bir varsayılan tanımlamak, `hasOperatorRuleForProvider()` açısından operatör kuralı sayılır; bu nedenle varsayılan `scope` değeri (`"connection"`) dikkate alınır. Bir varsayılana uygulanacak etkin bekleme süresi, `cooldownMs` ile sağlayıcının kendi yeniden deneme ipucundan (`Retry-After`, `x-ratelimit-reset` veya gövdedeki bir sıfırlama ipucu; bağlantı bekleme ayarındaki "upstream retry hints kullan" seçeneği açıkken motorun dikkate aldığı ipucunun aynısı) uzun olanıdır. Böylece bir varsayılan kısa bir upstream ipucunu uzatabilir, ancak gerçek bir sıfırlama süresini hiçbir zaman kısaltamaz. Açık bir operatör kuralı kendi `cooldownMs` değerini aynen korur. Ne bir kural ne de bir varsayılan, `markAccountUnavailable` içindeki bağlantı bekleme korumalarını devre dışı bırakır: etkin ve daha uzun bir bekleme süresi hiçbir zaman kısaltılmaz ve terminal durumun üzerine hiçbir zaman yazılmaz. `checkFallbackError` içinde daha önce çalıştırılan yerleşik metin algılayıcıları (kredilerin tükenmesi, günlük kotanın dolması, hesabın devre dışı bırakılması) kendi ifadeleri için hâlâ önceliklidir.

**Bilinen eksik — `providerRuleRegistry`, HTTP 400 için hiçbir zaman kullanılmıyor.**
`checkFallbackError` işlevinin `BAD_REQUEST` dalı, 400 durumunu tamamen kendi desen dizileri (`accountFallback.ts` içindeki `MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` vb.) üzerinden sınıflandırır ve üstündeki `configuredRule`/`getProviderErrorRuleMatch` dalına ulaşılmadan döner. `status: 400` içeren yerleşik bir katalog kuralı (veya operatör kuralı) söz dizimi açısından geçerli olsa da hiçbir zaman çalışmaz. Bugün mevcut kuralların hiçbiri 400'ü hedeflemiyor; dolayısıyla üretimde hiçbir şey etkilenmiyor — ancak gelecekteki bir 400 kuralının eklenebilmesi için önce bu dalın değiştirilmesi gerekir. Bu, kural eklemekten daha kapsamlı bir değişikliktir; çünkü desen dizisi davranışına zaten güvenen her sağlayıcı için 400'ün yeniden sınıflandırılmasına neden olur ve tek sağlayıcılı bir kural eklemesinin kapsamı dışındadır.

### Yeni bir kotayı yanlış bildiren gateway ekleme

1. `statusRestatementRegistry` içine (`open-sse/config/upstreamStatusRestatement.ts`) bir kural dizisi kaydedin. `textMarkers` değerlerini sağlayıcıya özgü tutun; `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) ile çakışan genel İngilizce ifadeleri hiçbir zaman yeniden kullanmayın.
2. Doğru kilit kapsamını seçmek için (`connection`, hesap genelindeki kota için; `model`, model başına hatalar için) isteğe bağlı olarak `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) içine sınıflandırma kuralları kaydedin. Bu adım, üretimde yalnızca kurallarının hata metninin tamamına (gövde işaretçilerine) ihtiyaç duyduğu sağlayıcılar için etkili olur: sağlayıcı kimliğini aynı dosyadaki `FULL_TEXT_RULE_PROVIDERS` içine ekleyin — aksi takdirde `checkFallbackError`, kurala yalnızca yapılandırılmış `{code, type}` hatasını iletir ve gövde metni kuralı canlı trafikte hiçbir zaman eşleşmez. Yalnızca `status`/`headers` üzerinden eşleşen kuralların (Opencode veya Minimax kuralları gibi) bu tercihe dahil edilmesi gerekmez. Ayrıca kural `scope: "connection"` bildiriyorsa ve amaç yalnızca bilgilendirici bir etiket değil, gerçekten bağlantı genelinde bir bekleme süresi ile aynı istek için combo atlama davranışıysa, sağlayıcı kimliğini aynı dosyadaki `HONORS_RULE_LOCK_SCOPE_PROVIDERS` içine ekleyin — bu, `markAccountUnavailable()` (`src/sse/services/auth.ts`) içindeki `isAgentrouterConnectionQuotaScope()` benzeri tüketimi ve `applyComboTargetExhaustion()` (`open-sse/services/combo/targetExhaustion.ts`) işlevini kontrol eder; bu ekleme yapılmadığında `scope` yine `fallbackResult.ruleScope` üzerinden aktarılır, ancak bunun üzerinde hiçbir işlem gerçekleştirilmez.
3. `tests/unit/upstream-status-restatement.test.ts` ve `tests/unit/agentrouter-error-rules.test.ts` dosyalarını örnek alarak birim testleri ekleyin. Testlere kalıcı değil / `creditsExhausted` değil korumaları ve — sağlayıcının izin listesine alınması gerekiyorsa — `resolveRuleMatchBody()` işlevinin yalnızca bu sağlayıcı için metnin tamamını döndürdüğünü doğrulayan bir test de dahil olmalıdır.

`chatCore.ts`, `classifyError` veya combo için değişiklik yapılması gerekmez.

#### Egress gruplu kilit (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` içindeki sağlayıcılar (opencode ailesi), upstream'in IP gruplu olduğunu varsayar (opencode ücretsiz katmanı hesap bazlı değil, IP bazlıdır — bkz. #9611): `quota_exhausted` **veya** `rate_limit_exceeded` olarak sınıflandırılan bir status-429, rotasyon bunları deneyebilmeden önce, son bilinen egress IP'si başarısız bağlantının IP'siyle eşleşen izin listesindeki aileye ait her bağlantıyı beklemeye alır
— N-1 garantili başarısız upstream çağrısını önler (#10460/#10525 ile aynı yapı).
`rate_limit_exceeded` özellikle dahil edilmiştir: `markAccountUnavailable` yolunda opencode'a özgü kurallar hiçbir zaman eşleşmez (`checkFallbackError` işlevine hiçbir başlık/gövde iletilmez ve opencode `FULL_TEXT_RULE_PROVIDERS` içinde değildir). Bu nedenle gövdesinde abonelik kotası metni ("monthly usage limit reached") bulunan bir 429, `status_429` kuralına ulaşılmadan önce kota metni geri dönüşü (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 saatlik bekleme süresi) tarafından `quota_exhausted` olarak sınıflandırılır — kota metni içermeyen bir 429 (yalın hız sınırlaması) ise `status_429` kuralı üzerinden `rate_limit_exceeded` olarak sınıflandırılır ve IP ailesini yine beklemeye alır. İzin listesindeki bir sağlayıcı için IP tabanlı hız sınırı, tükenmiş kotayla aynı sinyaldir. Gerçekçi sınırlar:

- **En iyi çaba**: kilit, bağlantının `proxy_logs` içindeki son bilinen `egress_ip` değerini çözümler (24 saatlik pencere, eşzamanlı, önbelleksiz). Önbelleğin soğuk olması (`egress_ip` hiç yoklanmamış) veya satır bulunmaması durumunda → başarısız bağlantı yine dal tarafından soğutulur (bugün olduğu gibi kaydedilir), yalnızca hiçbir kardeş kilitlenmez.
- **Asla terminal değil**: soğutma, yenilenen bir kota penceresidir
  (`testStatus: "unavailable"`); kalıcı bir durum hiçbir zaman IP düzeyindeki bir sinyalden türetilmez. `disableCooling` bağlantıları dalı tamamen atlar.
- **İzin verilen aile için kilit ayrıntı düzeyi değişir**: bu yalnızca bir kardeş optimizasyonu değil, kapsam değişikliğidir. opencode bir `passthroughModels` sağlayıcısıdır; dolayısıyla bu daldan önce bir 429, MODEL başına kilitleme üretirken artık bir bağlantı soğutması üretir — hiç kardeşi olmayan tek bir bağlantıyla çalışan bir operatör için bile. Bu, opencode kural tablosunun zaten doğru olduğunu bildirdiği ayrıntı düzeyidir (`scope: "connection"`, `providerErrorRules.ts`); ancak opencode şu ana kadar `HONORS_RULE_LOCK_SCOPE_PROVIDERS` içinde olmadığı için hiçbir zaman dikkate alınmamıştır. Dal, başarısız bağlantının soğutmasını ve `backoffLevel` değerini `connection` kapsamlı agentrouter dalını örnek alarak kendisi yazar ve döner — MODEL başına engelleme ile aşağıdaki genel yola hiçbir zaman ulaşılmaz.
- **Kombinasyon dahil**: agentrouter dalında olduğu gibi kapsam, bir kombinasyon çağırıcısının 429'a uyguladığı `persistUnavailableState`/`isCombo` düşürmesini kasıtlı olarak göz ardı eder. MODEL başına kilitleme bu kapsamın daha zayıf bir biçimi değildir; yanlış birimdir: tükenen IP hakkında hiçbir şey söylemez, dolayısıyla kombinasyon rotasyonu her kardeş için kesin olarak başarısız olacak bir çağrıyı tüketmeye devam eder.
- **Kardeş güvenliği**: zaten terminal durumda olan (banned/credits_exhausted) veya hâlihazırda daha uzun bir soğutmada bulunan bir kardeşin üzerine hiçbir zaman yazılmaz.
- **Özel izin listesi**: `EGRESS_BUCKETED_LOCK_PROVIDERS` listesinin genişletilmesi açık bir sahip kararıdır; genel bir bağlantı yoktur (pattern #10334/#10419). Kardeş sorgusu, aynı izin listesini SQL sabiti olarak tekrarlamak yerine ona bağlanır; böylece listenin genişletilmesi tek satırlık bir değişiklik olarak kalır.
- **Egress IP rotasyonu, her iki yönde**: arama penceresi (24 saat), egress-IP önbellek TTL'sinden (5 dakika) çok daha geniştir; bu nedenle "son bilinen IP" mevcut durumu değil, geçmişi ifade eder. Bir bağlantının proxy'si pencere içinde rotasyon yaptıysa kilit, gerçekten paylaşılan bir IP'yi **atlayabilir** (kaydedilen IP yeni ve tükenmemiş IP'dir) — ve simetrik olarak, o zamandan beri tükenen IP'den **uzaklaşmış** bir kardeşi soğutabilir. İkinci durum, o kardeşe bir soğutma penceresine mal olur; her ikisi de geçmiş tabanlı bir aramanın kabul edilen en iyi çaba sınırlarıdır.
- **Maliyet**: yalnızca 429 sıklığında gerçekleştirilen, `idx_pl_timestamp` üzerinden pencereyle filtrelenmiş `proxy_logs` üzerinde iki sınırlı tarama. Yeni indeks yoktur (migration 134 YAGNI). Orta büyüklükteki gerçek trafik içeren bir DB kopyasında ölçülmüştür; yüksek aktarım hızlı bir örnek aynı pencere içinde orantılı olarak daha fazla satır tutar.

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
