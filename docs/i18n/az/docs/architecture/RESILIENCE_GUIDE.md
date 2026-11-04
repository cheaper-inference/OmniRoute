# Resilience Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute üç fərqli, lakin əlaqəli möhkəmlik mexanizminə malikdir. Hər birinin fərqli əhatə dairəsi və məqsədi var. Marşrutlaşdırma davranışını sazlayarkən onları ayrı saxlayın.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Mənbə: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Dayanıqlıq keçidləri üçün Env-vs-dashboard üstünlüyü.** Mühitdən səpilən — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — yalnız _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) təmin edir. Boolean `resilienceSettings` -də davam etdi (Dashboard →** Parametrlər → Resilience** / `PATCH /api/resilience`, `key_value`-də saxlanılır) env dəyəri üzərində qalib gəlir: normallaşdırma (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) mövcud olduqda saxlanılan mantiqi saxlayır. İdarə panelinin artıq saxlanmış `false` olduğu yerləşdirmədə belə bir env var-ın `true` olaraq təyin edilməsi heç nəyi dəyişmir — keçidi çevirin** Parametrlər → Dayanıqlıq** (və ya saxlanılan sahəni təmizləyin) əvəzinə.

## 1. Provayder Circuit Breaker-i

**Əhatə dairəsi:** bütöv provayder (məs., `glm`, `openai`, `anthropic`).

**Məqsəd:** yuxarı axın/xidmət səviyyəsində dəfələrlə uğursuz olan provayderə trafik göndərməyi dayandırmaq.

**İmplementasiya:**

- Əsas sinif: `src/shared/utils/circuitBreaker.ts`
- Bağlantı (wiring): `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status API-si: `GET /api/monitoring/health`
- Sıfırlama API-si: `POST /api/resilience/reset`
- Wrapper-lər: `open-sse/services/accountFallback.ts`
- DB cədvəli: `domain_circuit_breakers`

**Vəziyyətlər:**

- `CLOSED` — normal trafikə icazə verilir
- `DEGRADED` — trafikə hələ də icazə verilir, lakin provayderin artan uğursuzluqları izlənilir; kifayət qədər uğur, etibarlı bağlantı testi və ya son uğursuzluq növü üçün ən uzun `OPEN` saxlanma müddətindən (həmin növün `cooldownByKind` dəyəri, əks halda `resetTimeout`, × `maxBackoffMultiplier`, ən azı bir cooldown) sonra yeni uğursuzluq olmadıqda `CLOSED` vəziyyətinə qayıdır
- `OPEN` — provayder müvəqqəti bloklanıb; combo marşrutlaşdırma onu ötürür
- `HALF_OPEN` — sıfırlama vaxtı bitib; yoxlama (probe) sorğusuna icazə verilir

**Konfiqurasiya edilə bilən standart dəyərlər (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience bölməsində göstərilir):**

| Sinif   | DEGRADED həddi | Açılma həddi  | Sıfırlama vaxtı |
| ------- | -------------- | ------------- | --------------- |
| OAuth   | 5 uğursuzluq   | 8 uğursuzluq  | 60s             |
| API-key | 7 uğursuzluq   | 12 uğursuzluq | 30s             |
| Lokal   | hesablanır     | 2 uğursuzluq  | 15s             |

`degradationThreshold` provayderin `DEGRADED` vəziyyətinə nə vaxt keçəcəyini idarə edir; `failureThreshold` isə onun nə vaxt açılacağını və ötürüləcəyini idarə edir. Lokal provayder profilləri hələlik Resilience parametrləri səhifəsində göstərilmir.

**İşə düşmə kodları:** yalnız provayder səviyyəli statuslar `[408, 500, 502, 503, 504]`. Hesab səviyyəli xətalara görə işə DÜŞMƏYİN (əksər 401/403/429 — onlar cooldown və ya bloklanma (lockout) mexanizmlərinə aiddir).

**Tənbəl bərpa (lazy recovery):** `OPEN` müddəti bitdikdə `getStatus()`, `canExecute()`, `getRetryAfterMs()` vəziyyəti `HALF_OPEN`-ə yeniləyir. Eyni oxumalar (və növbəti uğursuzluq) köhnəlmiş `DEGRADED`-i tədricən `CLOSED`-ə qaytarır. Fon taymerinə ehtiyac yoxdur.

---

### Seçimə bağlı qlobal Provider Cooldown (pəncərə qapısı)

Dördüncü, **seçimə bağlı** qat (`PROVIDER_COOLDOWN_ENABLED`, standart olaraq **söndürülüb**) uğursuz olan provayderlərin sorğulararası yaddaşını `open-sse/services/providerCooldownTracker.ts` faylında saxlayır; combo hədəf seçimi ona müraciət edir ki, ardıcıl combo sorğuları təzəcə uğursuz olmuş provayderi təkrar-təkrar gəzməsin. Provayder səviyyəli qeydlər `PROVIDER_PROFILES` pəncərə qapısına riayət edir:

| Profil  | işə düşmə həddi (`providerFailureThreshold`) | pəncərənin içində (`providerFailureWindowMs`) | soyuma müddəti (`providerCooldownMs`) |
| ------- | -------------------------------------------: | --------------------------------------------: | ------------------------------------: |
| OAuth   |                                         `10` |                                       `15min` |                                `5min` |
| API key |                                         `15` |                                       `30min` |                               `10min` |

Həddin altında provayder soyuma hesab **edilmir**; uğurlu nəticə pəncərəni təmizləyir. Bağlantı səviyyəli qeydlər (`provider:connectionId`) əvəzində eksponensial `minRetryCooldownMs → maxRetryCooldownMs` geri çəkilməsini (backoff) saxlayır. Üstələmələr: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Reqressiya mühafizəsi: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Bağlantının soyudulması

**Əhatə dairəsi:** tək provayder connection/account/key.

**Məqsəd:** eyni provayder üçün digər bağlantılar xidmət etməyə davam edərkən bir pis açarı keçin.

**İcra:**

- Əlçatmaz olaraq qeyd edin: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seçim: eyni faylda `getProviderCredentials*`
- Soyuducu hesablama: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Parametrlər: `src/lib/resilience/settings.ts`

**Əlaqə başına sahələr:**

- soyutma müddəti bitənə qədər `rateLimitedUntil` — vaxt damğası
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponensial geri çəkilmə sayğacı

**Defolt soyutma müddəti:**

- OAuth bazası: 5s
- API açarı bazası: 3s
- API açarı 429: yuxarı `Retry-After`/ sıfırlama headers/parseable sıfırlama mətninə üstünlük verir
- Geri çəkilmə: `baseCooldownMs * 2 ** failureIndex`

**Hər provayder üçün təkrar cəhd gecikməsi.** Provayderin ətraflı səhifəsində a var** Yenidən cəhd gecikməsi** seçin (Avtomatik, 15 saniyədən 1 saata qədər). `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` qənaət edir (1–21600, `PATCH /api/resilience` vasitəsilə). Məzənnə limiti xətası yuxarı axın təkrar cəhd göstərişi daşımadıqda, bu dəyər provayder üçün miqyaslı geri çəkilməni əvəz edir və `backoffLevel` 0-a sıfırlayır (`open-sse/services/rotationConfig.ts::overrideFor`). Məhdud dərəcəsi xətası üçün üstünlük, əvvəlcə ən yüksək: yuxarı axın üzrə təkrar cəhd göstərişi, sonra hər bağlantı üzrə `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, sonra hər provayder üçün təkrar cəhd gecikməsi, sonra env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, sonra miqyaslı geri çəkilmə. Sahəni avtomatik silir. Bu, yalnız tarif limiti səbəbinə təsir edir, heç vaxt terminal vəziyyətlərinə təsir etmir.

**Göy gurultusuna qarşı mühafizəçi:** soyutma müddətini həddən artıq uzatmaq və ya `backoffLevel` ikiqat artırmaqdan paralel uğursuzluqların qarşısını alır.

**Paralellik limiti 429-lar geri çəkilmə nərdivanına qalxmır.** Bədəni paralellik limitini bildirən `429` (“çox sayda paralel sorğu”, “koncurrency limit”, “paralel sorğu limiti”, GLM `并发数过高`) hesabın sağlam, lakin məşğul olduğunu bildirir. `checkFallbackError()` `concurrency_limited` səbəbini qaytarır: indi növbəti əlaqəyə keçin, bunu sabit `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) və ya yuxarı axının təkrar cəhdi üçün sərinləyin, `backoffLevel` dəyişməz saxlayın və `skipProviderBreaker` təyin edin. Açıq kvota orqanı hələ də qalib gəlir, buna görə də kvota nümunəsinə uyğun gələn orqan kvota hökmü olaraq qalır. Aşkarlama: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`; hökm: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (qırıcının `FailureKind`) dəyişməzdir və hələ də bu orqanlar üçün `rate_limit` oxuyur.

**Axın məzmunu stendləri hesabı soyutmur.** Məzmun-stall nəzarətçisi (`open-sse/utils/streamHandler.ts`) vaxtında heç bir model çıxışı göndərməyən axından imtina etdikdə, `markAccountUnavailable()` əlaqədə xətanı qeyd edir, lakin heç bir soyuma müddəti təyin etmir: stall həmin sorğuya aiddir, çox vaxt hələ heç bir çıxışı olmayan uzun əsaslandırma dönüşü. Operatorlar `resilienceSettings.streamStallCooldown.enabled` ilə yenidən daxil ola bilər (defolt `false`).

**`p2c` hesabı seçimi üçün gecikmə siqnalı daxil olun.** Göndərilən hər bir cəhd yaddaşdaxili dönmə pəncərəsində onun ilk bayta qədər vaxtını və hər bir əlaqəyə (və hər bir əlaqə + modelinə) nəticəni qeyd edir: 15 dəqiqə ərzində son 20 nümunə (`open-sse/services/connectionLatencyTracker.ts`, `safeLogEvents()` dən `src/sse/handlers/chatHelpers.ts`-də qeydə alınıb). `resilienceSettings.p2cLatency.weight` `0` dən yuxarı olduqda (diapazon 0-20, defolt `0` = deaktiv), `src/sse/services/auth.ts` -da `compareP2CConnections()` cütün hər bir namizədinə `weight` bal əlavə edir. Bunun yarısı gecikmənin daha sürətli namizədə nisbətindən (iki dəfə yavaş tam yarısını alır) və yarısı isə yuvarlanan səhv nisbətindən gəlir. Termin yalnız hər iki namizəddə ən azı 3 nümunə olduqda tətbiq edilir, beləliklə, yeni hesablar cəzalandırılmır və onun tavanı kvota ilə bloklanmış və kvota tükənmiş cəzalardan aşağıda qalır. O, özünə məxsus heç bir dövrə əlavə etmir: uğursuz hesablar hələ də soyutma, bloklama və kəsici təbəqələr tərəfindən idarə olunur. `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` ilə təyin edin.

**Mühakimə çərçivələri məzmun bloku büdcəsini yenidən işə salır.** Mühakimə modeli ilk görünən işarədən əvvəl bir neçə dəqiqə düşünə bilər: Claude düşüncə mətni boş ola bilən `thinking_delta` çərçivələrini yayımlayır və API Cavabları bir-birinin ardınca əsaslandırma elementlərini yayımlayır. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) bu kadrları tanıyır və gözətçi növbəni ləğv etmək əvəzinə hər biri üzrə öz büdcəsini yenidən işə salır. Onlar hələ də model çıxışı deyillər, ona görə də yalnız əsaslandırma ilə bitən növbə hələ də boş olaraq bildirilir və əsaslandırmanı dayandıran və yalnız ürək döyüntüləri göndərən növbə hələ də nəzarətçi iti itələyir.

Kiro-nın boş olmayan imzası olan ikili `reasoningContentEvent` çərçivələri icraçı vasitəsilə bu əsaslandırma fəaliyyətini boş `reasoning_content` deltası kimi qoruyur. İmza ötürülmür. Metadata, natamam çərçivələr və boş imzalar məzmun büdcəsini yenidən başlatmır; müstəqil aktiv axın fasiləsi və müştərinin ləğvi hələ də tətbiq olunur (`open-sse/executors/kiro/reasoning.ts`).

**Terminal vəziyyətləri (NOT soyutma müddəti):**

- `banned` — qadağan edilmiş açar söz / hesabın qadağasının aşkarlanması (bax: [BAN_DETECTION](../security/BAN_DETECTION.md) ) və üç ardıcıl yuxarı axın üzrə hər sorğu imtinası (`request_rejected`, məsələn Anthropic OAuth 403 "Sorğuya icazə verilmir" — `open-sse/services/requestRejectedStreak.ts`); tək bir imtina yalnız əlaqəni soyuyur
- `expired` (məhdudlaşdırılmış təkrar cəhdlərdən sonra terminala keçid — `EXPIRED_RETRY_MAX = 3` eksponensial geri çəkilmə ilə — beləliklə keçici OAuth xətaları hesab həmişəlik deaktiv edilməzdən əvvəl özünü sağalda bilər)
- `credits_exhausted`

Bunlar etimadnamələr dəyişənə və ya operator onları sıfırlayana qədər davam edir. Keçici soyutma vəziyyəti ilə terminal vəziyyətlərinin üzərinə yazmayın.

**Tənbəl bərpa:** `rateLimitedUntil` keçmişdə, əlaqə yenidən uyğun olur. Uğurlu istifadə zamanı `clearAccountError()` bütün xəta sahələrini təmizləyir.

### Claude OAuth istifadə divarı: aşağı prioritet zolağı + sessiya limitinin sıfırlanması

**Əhatə dairəsi:** bir Claude abunə (OAuth) bağlantısı. Hər iki xüsusiyyət var** hər bir əlaqə üçün daxil olun** ( `autoLimitReset` `providerSpecificData` Claude → → `lowPriorityMode` ikisi defoltdur) və güzgü Claude Kodunun `/low-priority` və `/limit-reset` əmrlərini ( Claude Code 2.1.263-dən götürülmüş naqil müqaviləsi).

**İcra:**

- Dövlət maşını + cavab təsnifatı: `open-sse/services/claudeLowPriority.ts`
- status/claim müştərisini sıfırlayın: `open-sse/services/claudeLimitReset.ts`
- İcraçı çəngəl (başlıq injection + eyni hesabın təkrar cəhdi): `open-sse/executors/base.ts::execute()`
- Daxil olmaq əzmkarlığı: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Tətik:** başlıqları `anthropic-ratelimit-unified-status: rejected` daşıyan 5 saatlıq istifadə divarı — a `429` və hesab uyğun olduqda `anthropic-ratelimit-unified-slow-offer: treatment`. O birinci divardan əvvəl heç nə göndərilmir 429; vahid başlıqları olmayan partlayış 429 normal soyutma yolundan keçir.

**Aşağı prioritet zolaq** (`lowPriorityMode`):

- Divarda 429 icraçı təklifi qəbul edir və dərhal yenidən cəhd edir** eyni** `anthropic-usage-limit: slow` ilə hesab; zolaq elan edilən `anthropic-ratelimit-unified-reset` (+ 60s grace) qədər aktiv qalır və həmin pəncərədəki hər sorğu başlığı daşıyır. Tutulan 429 heç vaxt `handleChatCore` çatmır, deməli, əlaqə belədir** yox** soyumağa qoyun və fırlanmır.
- `anthropic-ratelimit-unified-slow-status` on later responses: `active` / `not_needed` keep the lane; `slot_busy` (429) or a `529` wait the server's `anthropic-ratelimit-unified-slow-retry-after` (default 20s, clamp 5–600s, ±30% jitter) and retry, bounded by `anthropic-ratelimit-unified-slow-max-wait` (default 20 min, clamp 1 min–6 h) — past that the lane ends and a 10-minute cool-off blocks re-acceptance. The wait is additionally capped by what is left of the request's own upstream-start timeout (`resolveFetchStartTimeout`, 10 min by default) minus a 5 s margin: without that cap the 20-minute default max-wait would outlive the request and the sleep would be aborted mid-wait, surfacing a `TimeoutError` instead of the graceful `max_wait` end + cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 saatlıq pəncərə sürüşməsi və ya `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (hər hansı bir statusda onu `extra_usage` kimi bitirir, çünki ödənilmiş həddən artıq ödəniş artıq divarı əhatə edir) zolağı bitirir; cavab sonra normal soyutma yoluna axır. `budget_exhausted` elan edilmiş büdcə sıfırlanmasına qədər yadda qalır (≤ 8 gün).
- Divar yoxlaması icraçının özünün 400-dən çox idarə etdiyi daxili cəhddən (kontekstdə redaktə, thinking/effort sıxacları, parametr avtomatik öyrənmə) sonra həyata keçirilir, beləliklə, soyutma yoluna çatmaq əvəzinə, yalnız bu cəhdlərdən birində səthlər olan divar 429 hələ də kəsilir.
- Vəziyyət hər bir əlaqə üçün yaddaşdadır (yenidən işə salınma yenidən qəbul etmək üçün əlavə bir divara 429 baha başa gəlir).

**Sessiya limitinin sıfırlanması** (`autoLimitReset`, hər ikisi açıq olduqda zolaqdan əvvəl cəhd edildi):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` bloku; `arm: "reset"` və `available: true` olduqda, `{ "program": "juniper_tide" }` ilə `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ( `providerSpecificData.organizationUUID` dən UUID təşkilatı, bootstrap geri qaytarılması).
- `result: reset|not_limited` → sorğu tam sürətlə təkrar sınanır (yavaş başlıq yoxdur). `already_used` / `not_offered` memoise `next_available_at` (standart bir həftə); hər hansı bir uğursuzluq 15 dəqiqə geri çəkilir. Sıfırlama həftədə bir dəfədir və yenə də həftəlik limitə hesablanır.

Reqressiya qoruyucuları: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sessiya yaxınlığı (#7274)

**Əhatə dairəsi:** bir əlaqə üçün bağlanmış bir müştəri sessiyası (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` başlığı)** hər hansı** provayder.

**Məqsəd:** Çoxdövrəli agenti (Claude Kodu, köməkçi, xüsusi agentlər) sorğular üzrə eyni hesabda saxlayın, hesablar arası kontekst itkisini və hər hesab sessiyası vəziyyətinə malik provayderlərdə təkrar soyuq başlanğıc 429-ları azaldın.

**İcra:**

- TTL həlli: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Başlığın çıxarılması (ümumi, istənilən provayder): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Davamlı pin cədvəli: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Parametr: `sessionAffinityTtlMs` (ms-də qlobal TTL, `0` söndürür) — `src/lib/db/settings.ts`. Yeni defolt olaraq əvvəllər konfiqurasiya edilmiş hər hansı Codex TTL daşıyan `124_generic_session_affinity_ttl.sql` miqrasiya yolu ilə yalnız Codex-dən `codexSessionAffinityTtlMs` -dən adlandırıldı.

#7274-dən əvvəl `resolveSessionAffinityTtlMs()`, `codex` istisna olmaqla, hər bir provayder üçün `0` -ə bərkidilmişdi, buna görə də TTL parametrinin (və sessiya başlıqlarının) heç bir yerdə təsiri yox idi, baxmayaraq ki, bağlama mexanizmi və başlığın çıxarılması artıq provayder-aqnostik idi. Düzəltmə erkən geri dönüşü aradan qaldırdı; TTL indi qlobal miqyasda `0` dən yuxarı təyin edilmiş hər bir provayderə eyni şəkildə tətbiq edilir.

Üç sessiyaya yaxınlıq başlığı heç vaxt ötürülmür, — icraçıları müştəri başlıqlarını ötürməkdənsə, öz yuxarı başlıqlarını sıfırdan qurur, buna görə də bu, yalnız daxili korrelyasiya id olaraq qalır.

### Eksklüziv idarə olunan sessiya bağlantısı icarələri

**Əhatə dairəsi:** bir aktiv idarə olunan HTTP client/session bir uyğun OmniRoute bağlantısına malikdir.

**Məqsəd:** sorğular arasında sərt marşrutlama hasarına ehtiyacı olan müştərilər üçün davamlı eksklüziv əlaqə mülkiyyətini təmin edin. Bu, yumşaq davamlılıq üstünlükləri olan sessiya yaxınlığından fərqlənir: eksklüziv icarə SQLite-da həyat dövrü vəziyyətini davam etdirir, qlobal aktiv sahib və aktiv əlaqə unikallığını tətbiq edir və provayderin göndərilməsindən əvvəl köhnəlmiş nəsli rədd edir.

Bu xüsusiyyət hər API açarına daxil olmaqdır. İdarə olunan açarın `lease:exclusive` əhatə dairəsi və açıq boş olmayan `allowedConnections` siyahısı olmalıdır. İstənilən HTTP müştərisi həyat dövrünün son nöqtəsindən istifadə edə bilər; heç bir müştəri adı, istifadəçi agenti, provayder, OAuth metodu və ya modeli tələb olunmur. İcarə modelə deyil, əlaqəyə sahibdir, ona görə də model dəyişikliyi əlaqə adi qaydada uyğun olaraq qaldığı halda bağlamanı saxlayır. Normal model, kvota, sağlamlıq, soyuma müddəti və icazə siyahısı qaydaları etibarlı olaraq qalır və eyni nəsli başqa bir pulsuz uyğun əlaqəyə keçə bilər.

Həyat dövrü `acquire`, `renew` və `release` JSON hərəkətləri ilə `POST /api/v1/session-leases`. İdarə olunan nəticə sorğuları qeyri-şəffaf `X-OmniRoute-Lease-Owner` dəyərini və dəqiq `X-OmniRoute-Lease-Generation` təqdim edir. Sahib `vlo_` və ardınca 43 base64url simvolundan istifadə edir; yalnız onun SHA-256 hashı saxlanılır. Hər bir son göndərmə çəpəri həmçinin təsdiqlənmiş API açarı ID və aktiv əlaqə ID birləşdirir. İcarəyə nəzarət başlıqları jurnallardan, saxlanılan sorğu anlıq görüntülərindən və yuxarı axın icraçı başlıqlarından silinir.

Adi marşrutlaşdırmada uyğun idarə olunan namizədlər varsa, lakin hər bir pulsuz namizəd xarici aktiv icarə ilə məşğuldursa, OmniRoute HTTP `429`, icarəyə götürülmüş tutumun əlçatmaz kodunu, tutum üçün gözləmə vəziyyətini və ən erkən müvafiq müddətdən əldə edilən məhdud `Retry-After` qaytarır. Adi boş uyğunluq icarə mübahisəsi deyil və mövcud marşrut xətası semantikasını saxlayır.

Əlaqədar mexanizmlər ayrı qalır:

- OAuth sessiyasının məşğulluğu OAuth hesabları üçün proses-lokal yumşaq paylamadır.
- Hesab semaforları sorğuya uyğunluq icazələri verir və sorğu tamamlandıqda sona çatır.
- Eksklüziv idarə olunan sessiya icarələri nəsil hasarına malik davamlı həyat dövrü mülkiyyətidir.

---

## 3. Model kilidlənməsi

**Əhatə dairəsi:** provayder + bağlantı + model üçlüyü.

**Statusa görə açar əhatəsi:** uğursuz status kilidlənmənin hansı açara yazılacağına qərar verir
(`open-sse/services/accountFallback/exactModelLock.ts` faylındakı `resolveLockoutScope()`):

- `429` / `403` / `402` — kvota və ya səlahiyyət siqnalıdır — **kvota ailəsini** kilidləyir:
  codex üçün bütün `codex` / `spark` əhatəsi (bağlantının hər bir `gpt-5*` modeli),
  digər provayderlər üçün `getQuotaScopedModelForProvider()`.
- `404` modelin özünü kilidləyir (`getModelLockKey()` `not_found` halını daraldır).
- İstənilən digər status — `5xx` transport/server xətaları və OmniRoute-un keyfiyyət
  yoxlamasından özünün sintez etdiyi `502` — yalnız **dəqiq**
  provayder/bağlantı/model üçlüyünü kilidləyir. Bir modeldəki pis stream hesabın
  kvotası haqqında dəlil deyil; bu qaydadan əvvəl `codex/gpt-5.6-luna` üzərində bir
  boş cavab həmin bağlantının bütün `gpt-5*` modellərini 2–30 dəqiqəlik (artırıla
  bilən) müddətə marşrutlaşdırmadan çıxarırdı, halbuki kvotasına toxunulmamışdı.
- Çağırıcının açıq şəkildə göstərdiyi `scope` seçimi həmişə üstün gəlir (Antigravity `"exact"` ötürür).

**Məqsəd:** yalnız bir model əlçatan olmadıqda və ya kvota ilə məhdudlaşdıqda bütün bağlantını deaktiv etməmək.

**Nümunələr:**

- Model başına kvotalı provayderlərin 429 qaytarması
- Yerli provayderlərin çatışmayan bir model üçün 404 qaytarması
- Provayderə xas rejim/model icazə xətaları (məs., Grok rejimləri)

**İmplementasiya:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Cooldowns paneli (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Aktiv kilidlənmələri bu məlumatlarla göstərir: provayder, bağlantı, model, səbəb, expiresAt. Operatorlar modeli kartdan əl ilə yenidən aktivləşdirə bilərlər.

**REST API:**

- `GET /api/resilience/model-cooldowns` — aktiv kilidlənmələrin siyahısı
- `DELETE /api/resilience/model-cooldowns` — əl ilə yenidən aktivləşdirmə. Gövdə: `{provider, connection, model}`. Autentifikasiya: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Hər provayder səhifəsini ayrıca açmaq əvəzinə, keçici səbəbə görə marşrutlaşdırmadan
kənar qalan hər bağlantı üçün tək səhifə. Bağlantı cooldown-larını, model kilidlənmələrini
və terminal (yekun) vəziyyətləri göstərir; onları bağlantı başına, seçim üzrə və ya bir
provayderin bütün bağlantıları üçün təmizləyir və ən çox tənzimlənən cooldown qaydalarını
redaktə edir: `streamStallCooldown.enabled` və OAuth / API-açar `connectionCooldown`
baza cooldown-u ilə maksimum backoff addımları (`PATCH /api/resilience` vasitəsilə
saxlanılır). Terminal vəziyyətlər (`banned`, `expired`, `credits_exhausted`) göstərilir,
lakin burada heç vaxt təmizlənmir.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentifikasiya: management):

- `GET /api/resilience/cooldowns[?provider=]` — status, qalan cooldown, backoff
  səviyyəsi, son xəta növü və model kilidlənmələri ilə bağlantılar (etibarnamələr olmadan)
- `POST /api/resilience/cooldowns` — gövdə `{connectionIds: string[]}` və ya
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` qaytarır

### Kilidlənmə parametrləri UI + uğura əsaslanan azalma ilə bərpa (v3.8.23)

Model kilidlənməsi həmişə aktiv olan, kodda bərkidilmiş davranışdan tam konfiqurasiya
edilə bilən, istəyə bağlı (opt-in) bir xüsusiyyətə çevrildi — öz parametrlər kartı və
özünü bərpa edən bərpa yolu ilə.

**Parametrlər kartı:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Bu, yuxarıdakı yalnız-oxunan `ModelCooldownsCard`-dan (ki, yalnız aktiv kilidlənmələri
_göstərir_) **fərqlidir** — yeni kart _parametrləri konfiqurasiya edir_. Defolt dəyərlər
`DEFAULT_MODEL_LOCKOUT_SETTINGS`-də yerləşir
(`src/lib/resilience/modelLockoutSettings.ts`):

| Parametr                | Defolt dəyər                     | Mənası                                                         |
| ----------------------- | -------------------------------- | -------------------------------------------------------------- |
| `enabled`               | `false`                          | Əsas açar — model kilidlənməsi **defolt olaraq sönülüdür**.    |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model əhatəli uğursuzluq sayılan upstream statuslar.           |
| `baseCooldownMs`        | `120_000` (120 s)                | İlk uğursuzluq üçün ilkin kilidlənmə müddəti.                  |
| `maxCooldownMs`         | `1_800_000` (30 dəq)             | Artırılmış cooldown-un yuxarı həddi.                           |
| `maxBackoffSteps`       | `10`                             | Maksimum eksponensial-backoff eskalasiya addımları.            |
| `useExponentialBackoff` | `true`                           | Təkrarlanan uğursuzluqların cooldown-u eksponensial artırması. |

Parametrlər standart parametrlər anbarı vasitəsilə saxlanılır və resilience parametrlər
sxemi ilə yoxlanılır; kart `baseCooldownMs`/`maxCooldownMs` dəyərlərini
(`maxCooldownMs ≥ baseCooldownMs` şərti ilə) və `maxBackoffSteps`-i məhdudlaşdırır.

**Uğura əsaslanan azalma ilə bərpa:** bərpa **yalnız** taymerin bitməsi deyil. Sağlam
cavab modelin uğursuzluq sayını geriyə endirir, buna görə də pəncərə ortasında bərpa
olunan model taymeri bitməzdən əvvəl eskalasiyanı dayandırır (və təmizlənir). Uğurlu
combo hədəfində `open-sse/services/combo.ts` `decayModelFailureCount()` funksiyasını
çağırır (`open-sse/services/accountFallback.ts`), bu da saxlanılan `failureCount`-u
**yarıya bölür** (`Math.floor(failureCount / 2)`); `0`-a çatdıqda kilidlənmə qeydi
tamamilə silinir. Əks funksiya `recordModelLockoutFailure()` isə eskalasiya pəncərəsindəki
uğursuzluqlarda sayı artırır (və cooldown-u eskalasiya edir). Bu uğur-azalması sadə
taymer bitməsinə əlavədir — hər iki yol modeli yenidən aktivləşdirə bilər.

**Vəziyyət:** kilidlənmələr **yaddaşda** saxlanılır (`provider:connectionId:model`
açarı ilə `ModelLockoutEntry`-lərin proses səviyyəli `Map`-ləri, dəqiq əhatəli kilidlər
`provider:connectionId:exact:model` ilə), verilənlər bazasına yazılmır — yenidən
başladılmada itirlər. _Parametrlər_ saxlanılır; aktiv kilidlənmə _vəziyyəti_ isə
müvəqqətidir (efemerdir).

---

## 4. Kvota-paylaşımı üzrə paralellik nəzarəti (v3.8.36)

Abunə hesabları (GLM, MiniMax və s.) çox vaxt yalnız ~1–3 paralel
sorğunu qəbul edir; limiti aşmaq 429 xətalarını və soyuma müddətlərini
işə salır. Bu hal bir neçə API açarının eyni upstream hesabını paylaşdığı
**kvota-paylaşımı** (`qtSd/…`) kombinasiyalarında xüsusilə kəskindir. Üç
qat mexanizm paylaşılan hesabın həddən artıq sorğu ilə yüklənməsinin qarşısını alır.

### Bağlantı üzrə paralellik limiti (`max_concurrent`)

Hər provayder bağlantısı `max_concurrent` limiti elan edə bilər
(`provider_connections.max_concurrent`, bağlantı modalında / API-də / DB-də
təyin edilir). Limit istəmirsinizsə, sahəni boş saxlayın. Bu, aşağıda
izah olunan seriallaşdırma qatını idarə edən əsas parametrdir — onu hesabın
real paralellik səviyyəsinə uyğun təyin edin (məsələn, GLM ~1, MiniMax ~2).

### Model üzrə paralellik limitləri (`modelConcurrency`)

Bağlantı əlavə olaraq `rateLimitOverrides` xəritəsində hər model üçün dəqiq
paralellik limitləri elan edə bilər:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Bunu bağlantı modalında (**Rate limit overrides → Per-model
concurrency caps**, hər sətirdə bir `model=cap`) və ya eyni JSON strukturu ilə
`PATCH /api/providers/[id]` vasitəsilə təyin edin. Əsas semantika:

- **Bağlantı üzrə və modelə xas:** `maxConcurrent` bütün bağlantı üçün ortaq
  limit olaraq qalır. Hər ikisi tətbiq edildikdə, eyni kompozit kiliddə
  (`global → provider → account → model`) hər iki kilid atomik şəkildə
  əldə edilir; effektiv davranışı tətbiq olunan daha sərt limit müəyyən edir.
- **Model açarının dəqiq uyğunluğu:** açar marşrutlaşdırma həll edildikdən sonra
  icraçıya ötürülən model sətridir — adətən upstream model identifikatorunun
  özüdür (`glm-5`), müştəri tərəfli `provider/model` alias-ı deyil
  (`zai/glm-5`, `glm-5` ilə uyğun gəlmir). Dəyərlər müsbət tam ədədlə
  ifadə olunan paralel sorğu limitləridir.
- **Yerli növbəyə yerləşdirmə, aşkarlama yoxdur:** artıq sorğular mövcud
  növbə/zaman aşımı semantikası ilə yerli növbəyə yerləşdirilir (tipli
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` qəbul xətaları). OmniRoute
  upstream siyasətini aşkar etmir və ya çıxarmır — operatorun konfiqurasiya
  etdiyi dəqiq limitləri tətbiq edir. Dolu model kilidi provayderi heç vaxt
  deaktiv etmir və model üçün daimi bloklanma yaratmır; upstream 429/soyuma/
  ehtiyat keçidi davranışı xəta zamanı ehtiyat mexanizm olaraq qalır.
- **Bağlantı və proses üzrə əhatə dairəsi:** limitlər hər verilənlər bazası
  bağlantısı üçün ayrıdır və yaddaşda saxlanılır; buna görə eyni upstream API
  açarını yenidən istifadə edən iki bağlantı bir-biri ilə koordinasiya olunmur.
- **Konfiqurasiya edilmədikdə dəyişiklik yoxdur:** xəritənin buraxılması (və ya
  idarə panelindəki sahənin boş saxlanması) model kilidi əlavə etmir. Heç bir
  universal provayder limiti təsdiqləməyən nümunə konfiqurasiya:

```text
glm-5=1
glm-4.7=3
```

### Kvota-paylaşımı sorğularının seriallaşdırılması

Kvota-paylaşımı dispetçerliyi müsbət `max_concurrent` elan edən bağlantını
hədəflədikdə, həmin **hesaba** yönələn paralel sorğular bağlantı üzrə
semafor vasitəsilə (`qsconn:<connectionId>` açarı) seriallaşdırılır: artıq
sorğular hesabı həddən artıq yükləmək əvəzinə **növbədə gözləyir**. Bu
mexanizm **fail-open** rejimində işləyir — dolu növbə və ya zaman aşımı
slot əldə edilmədən davam edir və dispetç edilə bilən sorğunu heç vaxt
rədd etmir. Parametri **Settings → Resilience → Quota-share per-connection
concurrency** bölməsindən dəyişin
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standart olaraq
aktivdir). `max_concurrent` limiti olmadıqda davranış dəyişmir.

> Kvota-paylaşımı marşrutlaşdırma kilidi (`selectQuotaShareTarget`, DRR + P2C)
> özü də **fail-open** rejimində işləyir və limitə çatmış bağlantının yalnız
> _prioritetini azaldır_ — bir bağlantılı hovuzda sərt limit tətbiq edə bilməz;
> buna görə yüklənməni faktiki olaraq məhdudlaşdıran məhz bu semafordur.

### Kombinasiya üzrə soyuma müddətini nəzərə alan yenidən cəhd

Bütün kombinasiya strategiyaları üçün (aktiv olduqda), qısa müddətli
müvəqqəti soyuma müddəti səbəbindən 429 ilə nəticələnəcək sorğu 429 qaytarmaq
əvəzinə həmin müddətin bitməsini gözləyir və yenidən dispetç edilir — buna
çoxmodeli kombinasiyalarda Gemini sinfi TPM/RPM pəncərələri (~60 saniyəlik
retry-after) də daxildir; məsələn, 2 modeldən ibarət kombinasiyanın hər iki
hədəfi model üzrə sürət limitinə çatdıqda. Bu davranış **Settings →
Resilience** bölməsindəki `comboCooldownWait` (`enabled`, `maxWaitMs`,
`maxAttempts`, `budgetMs`) ilə məhdudlaşdırılır. `quota_exhausted` səbəbinə
görə (gecəyarısına qədər bloklanmış) və ya autentifikasiya/tapılmama
səbəblərinə görə heç vaxt gözləmir.

Kombinasiya `config.comboCooldownWaitEnabled: false` ilə bu funksiyanı
söndürə bilər. Yalnız literal `false` bu ortaq kombinasiya gözləmələrini
(dispetçerlikdən sonrakı soyuma müddəti və dispetçerlikdən əvvəlki dövrə
açıq/model kilidi gözləmələri) və gözləmə büdcəsi üçün zaman aşımı alt
həddinin genişləndirilməsini deaktiv edir. Dəyərin olmaması və ya `true`
qlobal siyasəti saxlayır; `true` qlobal olaraq deaktiv edilmiş gözləməni
aktivləşdirə bilməz. Açıq şəkildə təyin edilmiş `targetTimeoutMs` yenə də
üstün sayılır. Bu seçim ayrıca native-Codex növbə-pin dispetçerlikdən əvvəlki
gözləməsini dəyişmir.

Eyni kilid dispetçerlikdən əvvəlki halı da əhatə edir (#16319): cəhd
edilməzdən əvvəl kombinasiyanın bütün hədəfləri model qısa müddətli
müvəqqəti bloklanmada olduğuna görə buraxıldıqda, sıfır cəhdli yol kilidin
bitməsini eyni limitlər çərçivəsində gözləyir və işarəsiz
`503 ALL_TARGETS_SKIPPED` cavabı vermək əvəzinə yenidən dispetç edir.
Gözləməyə icazə verilmədikdə (limit, cəhd və ya büdcə tükəndikdə, yaxud
funksiya söndürüldükdə) terminal cavab ən erkən müvəqqəti kilidin bitmə
vaxtından `retry_after` / `reset_at` daşıyan
`429 rate_limit_error` cavabına yüksəldilir; kvota, autentifikasiya və
tapılmama kilidləri isə işarəsiz 503 olaraq qalır.

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

## 5. Sorğu Növbəsinə Qəbul Nəzarəti (v3.8.49 · issue #6593)

**Əhatə**: provayder+bağlantı üzrə lokal rate-limit növbəsi (`open-sse/services/rateLimitManager.ts`,
Bottleneck ilə dəstəklənir), yuxarıdakı üç mexanizmdən bir qat aşağıda yerləşir.

**`maxWaitMs` növbədə gözləməni məhdudlaşdırır; `executionMaxWaitMs` icranı məhdudlaşdırır.**
İkisi qəsdən ayrıdır və heç biri digərinə ötürülmür.

`resilienceSettings.requestQueue.maxWaitMs` — **növbə-gözləmə büdcəsidir**: o,
provayder slotunun gözlənilməsini və sonra QUEUED vəziyyətində qalmağı əhatə edir və
taymer iş QUEUED statusundan çıxıb icraya başladığı anda sıfırlanır
(`rateLimitManager.ts`, `wrappedFn`). Onu aşan sorğu heç vaxt upstream-ə çatmır.
Defolt 30000ms, `src/lib/resilience/settings.ts`-də `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
tərəfindən təmin edilir və
`tests/unit/ratelimit-admission-control-6593.test.ts` ilə bərkidilib, buna görə də ona
edilən dəyişiklik həmin testi qırmızıya salır, bu abzası isə sakitcə köhnəlmiş
vəziyyətdə qoymur.

`resilienceSettings.requestQueue.executionMaxWaitMs` Bottleneck-in iş `expiration`
kimi qəbul etdiyi dəyərdir, taymeri isə yalnız dispatch-dən sonra başlayır. Bu, öz
upstream timeout-u olmayan executor-lar üçün son ehtiyatdır və executor-un öz
fetch-başlanğıc timeout-u daha uzun olduqda həmin dəyərə qədər qaldırılır, buna görə də
sağlam, icrada olan cavabı kəsə bilməz. Defolt 600000ms (10 dəq).

Növbə büdcəsinin `expiration`-a ötürülməsi keçmişdə qeyri-inkremental gateway-ləri
icra ortasında kəsirdi — onlar ilk baytlar gələnə qədər dəqiqələrlə qanuni olaraq
işləyirlər — və buna görə də expiration `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) kimi üzə çıxarılır, növbə büdcəsi isə
növbə-timeout kodunu daşıyır. Hər ikisini `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) və ya dashboard
(**Settings → Resilience**) vasitəsilə override edin. Hər ikisi normallaşdırma zamanı
1ms–24 saat aralığına sıxılır.

**Hər ikisi üçün prioritet:** env dəyişəni yalnız _defoltu_ təmin edir.
`resilienceSettings.requestQueue`-də saxlanılmış dəyər (dashboard / API patch,
`key_value`-də saxlanılır) ondan üstün gəlir, bağlantı üzrə
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` isə ondan da üstün gəlir. Buna
görə də artıq saxlanılmış dəyəri olan bir deployment-də env dəyişənini təyin etmək
heç nəyi dəyişmir — əvəzində saxlanılmış parametri silin və ya yeniləyin.

Növbədə qalma `maxWaitMs` ilə məhdudlaşır; aşağıdakı `maxQueueDepth` isə eyni anda
neçə çağıranın növbədə ola biləcəyini məhdudlaşdırır.

**Bədəndə göstərilən təkrar cəhdlər: templəndirmə (pacing) və bloklama (lockout).**
429 bədəni öz gözləməsini göstərə bilər (Gemini `RetryInfo.retryDelay`, "retry after
Ns" mətni), bunu `updateFromResponseBody` oxuyur. Bağlantının `maxWaitMs`-inə sığan
gözləmə templəndirmədir: limiter bu müddət ərzində rezervuarını boşaldır və o yenidən
dolduqda növbədəki çağırışlar dispatch olunur. `maxWaitMs`-dən uzun gözləmə növbənin
otura biləcəyi bir şey deyil — Gemini tükənmiş gündəlik kvotaya `retryDelay:
"86399s"` ilə cavab verir. Yenidən qurulan 429-da ötürülən `Retry-After` (#16528)
artıq fallback mühərrikinin modeli həmin pəncərə üçün kilidləməsini təmin edir, amma
limiteri də ona görə dayandırmaq, açara tez çatan istənilən çağırışı (məsələn,
resilience sıfırlanmasından sonra) bütün `maxWaitMs` boyunca dayandırardı. Belə bir gözləmə tiplənmiş Google `RetryInfo`
detalından (`google_rpc_retry_info` mənşəyi) gəldikdə və açarın limiteri artıq modelə
sxoplandıqda (bax. `getLimiterKey`), 429 əvəzində həmin bağlantıda model
bloklamasına çevrilir (`open-sse/services/rateLimitManager/bodyRetryPause.ts`-də
`lockModelForLongBodyRetry`, 24 saatla məhdudlaşır) və limiter dayandırılmamış
qalır. Hesab seçimi `isModelLocked()` vasitəsilə həmin kilidə görə atlayır,
bağlantıya bərkidilmiş hədəflər üçün kombinə (combo) dispatch-qabağı qapı da eləcə
edir. Limitəri kvota ailəsi üzrə olan antigravity-də kilid, digər kvota kilidləri kimi,
dəqiq model üzərindədir. Alias sorğunu həmin modelə həll etdikdə müştərinin istədiyi
ad da kilidlənir, çünki bu yoxlamalar istənilən addan istifadə edir; ad dəqiq şəkildə
kilidlənir (`lockExactModel`), buna görə də antigravity kvota ailəsini və ya codex
əhatəsini keçən alias heç vaxt özünü kilidləmir. Nəsr formasında ipucu, tiplənməmiş
`retryDelay` və ya bütün bağlantı tərəfindən paylaşılan limiter pauzanı saxlayır.
429 yolunun bu az əvvəl yenidən qurduğu limiter həqiqətən pauza etdikdə, qalan növbə
vaxtı pauzadan əvvəl bitən çağıran həmin vaxtı gözləmək əvəzinə dərhal növbə-timeout
kodu ilə geri çevrilir (`checkLimiterPause`); qeyd olunmuş son limiter qurulmazdan
əvvəl, Bottleneck-in yenilənmə saatını başlatdığı nöqtədə lövbərlənir və rezervuara
sonradan edilən istənilən dəyişiklik onu unudur. Bu,
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` və
`tests/unit/rate-limit-body-retry-pause.test.ts` ilə əhatə olunub.

**`maxQueueDepth` — istəyə bağlı (opt-in) qəbul həddi (yeni).** `resilienceSettings.requestQueue.maxQueueDepth`
bir provayder+bağlantı üçün eyni anda neçə sorğunun növbədə (hələ dispatch
olunmamış) qala biləcəyini məhdudlaşdırır. Növbə artıq `maxQueueDepth` sorğu
saxladıqda, yeni sorğu `limiter.schedule()`-ə çatmazdan **əvvəl** tiplənmiş
`code: "RATE_LIMIT_QUEUE_FULL"` xətası ilə sürətli rədd edilir — buna görə də rədd
ucuz başa gəlir və həmin sorğu üçün istənilən aşağı axın prompt-sıxılma / tərcümə
işindən əvvəl baş verir. Defolt `0` = söndürülüb, mövcud məhdudiyyətsiz-növbə
davranışını qoruyur; 0–100000 aralığında məhdudlaşıb. `RATE_LIMIT_MAX_QUEUE_DEPTH`
(env) və ya `resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch)
vasitəsilə override edin.

Qəbul yoxlamasının özü təmiz funksiyadır
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), buna görə də
real Bottleneck limiteri olmadan vahid-test oluna bilər.

> #6593-ü açan RFC həmçinin `bypassCompressionOnRateLimit`
> bayrağını təklif edirdi. Bu repodakı `open-sse/services/compression/`
> pipeline-ı sintez olunmuş 429 body-ləri üzərində HTTP cavab sıxılması deyil,
> gedən LLM sorğusunda prompt/kontekst sıxılmasıdır (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` blokunun ətrafında)
> — literal bypass bayrağı üçün uyğun kod yolu mövcud deyil. Həmin
> prompt-sıxılma addımı hazırda sorğu pipeline-ında `withRateLimit()`-dən
> _əvvəl_ icra olunur, ona görə də növbə-dolu rəddində onu atlamaq üçün
> sıralamanın dəyişdirilməsi bu issue-nun əhatəsindən kənara çıxan, ayrıca və
> daha böyük bir dəyişiklikdir; o, qəsdən burada **implementasiya edilməyib**
> və CPU qənaəti qazancı sıralama riskinə dəyər olduğu halda sonrakı iş kimi
> saxlanılıb.

### Rate-Limit avtomatik aktivləşdirmə təhlükəsizlik şəbəkəsi və bağlantı qorunması (`rateLimitProtection`)

**Avtomatik aktivləşdirmə təhlükəsizlik şəbəkəsi** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, standart `true`):
Standart olaraq, OmniRoute bütün aktiv API-açar provayder bağlantıları üçün rate-limit növbə qorunmasını avtomatik aktivləşdirir (`getProviderCategory(provider) === "apikey"`). Bu, sürət məhdudiyyətinə həssas upstream API açarlarına gələn sorğuların upstream 429 xətalarına partlamaq əvəzinə Bottleneck vasitəsilə növbəyə alınmasını və boğulmasını təmin edir. Təhlükəsizlik şəbəkəsi `RATE_LIMIT_AUTO_ENABLE` mühit dəyişəni ilə üstələnə bilər (`false`/`0`/`off` söndürür, `true`/`1`/`on` məcburi aktivləşdirir) və bu, saxlanılmış dashboard parametrlərindən (**Parametrlər → Dayanıqlılıq** / `PATCH /api/resilience`) üstünlük təşkil edir.

**Bağlantı səviyyəsində `rateLimitProtection`-ın semantikası:**
Bağlantı səviyyəsində rate-limit qorunması provayder bağlantılarındakı `rateLimitProtection` boolean sahəsi ilə izlənilir (SQLite-də `rate_limit_protection` kimi saxlanılır):

- **Aşkar aktiv (`rateLimitProtection === true`)**: Provayder kateqoriyasından və ya avtomatik aktivləşdirmə təhlükəsizlik şəbəkəsinin yandırılıb-yandırılmamasından asılı olmayaraq, bu bağlantı üçün rate-limit qorunması aşkar şəkildə aktivləşdirilir.
- **Aşkar sönük (`rateLimitProtection === false`)**: Aşkar qorunmanı söndürür, lakin aktiv API-açar bağlantısını qlobal avtomatik aktivləşdirmə təhlükəsizlik şəbəkəsindən **çıxarmır**. `reconcileEnabledConnections` funksiyasında (`open-sse/services/rateLimitManager.ts`) `false` və `undefined` ekvivalentdir: yalnız `rateLimitProtection === true` aşkar üstələmə kimi qəbul edilir. `rateLimitProtection` `false` olduqda (və ya təyin edilmədikdə), aktiv API-açar bağlantısı yenə də avtomatik aktivləşdirmə şərtinə uyğun gəlir və rate-limit qorunması altında qalır.
- **Bağlantı səviyyəsində imtina yoxdur**: Operator hazırda digərləri üçün avtomatik aktivləşdirməni aktiv saxlayarkən "bu tək aktiv API-açar bağlantısı rate-limit növbə qorunması olmadan işləməlidir" tələbini ifadə edə bilmir. API-açar bağlantılarını rate-limit növbələri olmadan tamamilə işlətmək üçün təhlükəsizlik şəbəkəsi qlobal olaraq söndürülməlidir (`RATE_LIMIT_AUTO_ENABLE=false` və ya `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Dəstəklənən yazma yolları:**

- **`POST /api/rate-limits`**: Bağlantı üçün `rateLimitProtection`-ı açıb-bağlamaq məqsədilə dəstəklənən idarəetmə yazma yolu (`{ connectionId: string, enabled: boolean }`). Bunu `enabled: true` ilə çağırmaq aşkar qorunmanı yandırır; `enabled: false` ilə çağırmaq isə aşkar qorunmanı aradan qaldırır (lakin avtomatik aktivləşdirmə yandırılıbsa, aktiv API-açar bağlantıları qlobal təhlükəsizlik şəbəkəsi altında qorunmaqla qalır).
- **`PUT /api/providers/[id]`**: Qəsdən `rateLimitProtection`-ı qəbul etmir və onu dəyişmir (#11278). `PUT /api/providers/[id]` vasitəsilə provayder bağlantısı metadatasının yenilənməsi heç vaxt saxlanılmış rate-limit qorunma vəziyyətini dəyişməyəcək.

---

## 6. Yavaş axın ötürücülük nəzarətçisi (#9709)

İsteğe bağlı `resilienceSettings.streamRecovery.throughputWatchdog` qoruyucusu hələ də hissələr göndərən, lakin konfiqurasiya edilmiş faydalı çıxış sürətindən aşağı köməkçi çıxış istehsal edən yuxarı axını aşkarlayır. Bu, boş vaxtdan qəsdən fərqlənir: ürək döyüntüləri və metadata nə taymeri sıfırlayır və nə də irəliləyiş hesab edilmir. O, həmçinin çıxış keyfiyyətindən asılı olmayaraq mütləq təhlükəsizlik tavanı olaraq qalan sərt cəhdin son tarixindən (#9153) fərqlənir.

Gözətçi iti dayandırmadan əvvəl istiləşmə müddətini və sonra tam yuvarlanan pəncərəni tələb edir. O, Söhbət Tamamlamaları və Cavabları API çıxış hadisələrindən (mühafizəkar UTF-8 bayt proksi) mətn deltalarını hesablayır, yalnız istifadə və boş hadisələrə məhəl qoymur və alət çağırışı və ya əsaslandırma hadisələri uçuşda olarkən mühakiməni dayandırır. O, defolt olaraq qeyri-aktivdir və `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ilə aktivləşdirilə bilər (bu env dəyəri yalnız defolt — yadda saxlanmış `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean qalibiyyətini yaradır; bu təlimatın yuxarısındakı env-vs-dashboard prioritet qeydinə baxın); pəncərə, istiləşmə, minimum sürət və minimum ölçülə bilən çıxış normal dayanıqlıq parametrlərinin normallaşdırma təbəqəsi ilə məhdudlaşır.

Aktivləşdirildikdə, gözətçinin ləğvi yalnız aktiv yuxarı axını cəhdinə tətbiq edilir. Müştəri tərəfindən görünən hər hansı baytdan əvvəl, mövcud eyni hesabın erkən bərpa yolu cəhdi yenidən aça bilər. Təhlükədən sonra axın heç vaxt kor-koranə təkrarlanmır; yalnız mövcud təhlükəsiz orta axın davamı müqaviləsi şəkilçi tikə bilər. Yekunlaşdırma tək çəkiliş olaraq qalır, ona görə də istifadə uçotu və semafor buraxılışı təkrarlanmır.

---

## 7. Upstream Statusunun Yenidən İfadəsi (səhv göstərilən kvota xətaları)

**Əhatə:** müvəqqəti kvota tükənməsini yanlış HTTP statusu ilə bildirən bir upstream gateway.

**Məqsəd:** təsnifatdan ƏVVƏL yanıltıcı statusu düzəltmək ki, aşağı axın istehlakçıları (fallback mühərriki, combo aqreqasiyası, müştəriyə yönələn cavab) xətanın həqiqi yenidən cəhd edilə bilən təbiətini görsün.

Bəzi gateway-lər MÜVƏQQƏTİ kvota tükənməsini yenidən cəhd edilə bilməyən HTTP
statusu ilə siqnallaşdırır. `agentrouter.org` standart `429` əvəzinə Çin dilində
bir mətn ilə (`用户额度不足` / `额度不足`) `403` (bəzən `400`) qaytarır. Claude
Code kimi müştərilər `403`-ü daimi kimi qəbul edib sessiyanı dayandırır və
düzəliş olmadan fallback mühərriki onu kvota hadisəsi əvəzinə `AUTH_ERROR`
kimi təsnifləşdirir.

**İmplementasiya:**

- Reyestr + uyğunlaşdırıcı: `open-sse/config/upstreamStatusRestatement.ts` —
  təchizatçı üzrə qaydalar siyahısı (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` vasitəsilə uyğunlaşdırılır.
- Çağırış nöqtəsi: `open-sse/handlers/chatCore.ts` faylındakı `providerFailure:`
  bloku (təxminən sətir 3654), `parseUpstreamError()` xətalı HTTP statusu ilə
  upstream cavabını parse etdikən (`!providerResponse.ok`) dərhal sonra və
  hər hansı təsnifat işə düşməzdən əvvəl, beləliklə hər bir aşağı axın
  istehlakçısı düzəldilmiş statusu görür. `200` SSE axınının içinə yerləşdirilmiş
  xətalar ayrıca, daha sonrakı bir axın-parse yolu ilə gedir və bu gün bu hook
  tərəfindən əhatə **olunmur** — məlum məhdudiyyətdir, agentrouter-in yanlış
  statusu üçün hələ lazım deyil (o, xətalı HTTP statusu kimi üzə çıxır).
- Yenidən cəhd uyğunluğu: `429` `RETRY_AFTER_ELIGIBLE_STATUSES`
  siyahısındadır (`open-sse/services/combo/unavailableRetryGate.ts`), buna görə
  yenidən ifadə edilmiş xəta ölü bir `403` kimi üzə çıxmaq əvəzinə real bir
  yenidən cəhd pəncərəsi daşıyır.
- Sintetik `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) yalnız
  yenidən ifadə edilmiş cavabın **müştəriyə** dediyi şeydir; o, özü bağlantının
  daxili cooldown/lockout müddəti deyil — o, yenidən ifadə edilmiş xətanı
  həqiqətən idarə edən mexanizmdən asılı olaraq ayrıca tənzimlənir
  (Connection Cooldown-un eskalasiya olunan backoff-u, §2, API-açar
  təchizatçıları üçün baza `3s`; və ya agentrouter kimi per-model-quota
  təchizatçıları üçün Model Lockout, §3). Router daxili olaraq müştəriyə
  elan etdiyi 60s pəncərəsindən daha tez yenidən cəhd üçün uyğun ola bilər —
  qəsdən buraxılmış ehtiyat marjasıdır, baq deyil.

Daimi xətalar (agentrouter-in `无权访问模型` — bu modelə giriş yoxdur) HEÇ VAXT
yenidən ifadə edilmir: `excludeMarkers` `textMarkers` uyğunlaşsa belə qaydanı
veto edir, beləliklə xəta orijinal statusunu saxlayır və heç nə onu əbədi
olaraq yenidən cəhd etmir. Uyğun təchizatçı təsnifat qaydası
(`open-sse/config/providerErrorRules.ts` faylında `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, elan edilmiş `6h` baza cooldown-u)
`checkFallbackError` (`open-sse/services/accountFallback.ts`) tərəfindən
ümumi apikey-kateqoriya `FORBIDDEN` erkən-return-dan _əvvəl_ yoxlanılır,
`honorsRuleLockScope(provider)` ilə qapılanıb (#10334 — hazırda
`providerErrorRules.ts` faylındakı `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-i
vasitəsilə yalnız agentrouter-ə xasdır). Qaydanın elan edilmiş 6h cooldown-u
`fallbackResult.baseCooldownMs` kimi axır, amma o, yenə də mövcud
per-model-quota lockout yolunu qidalandırır (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, cooldown mənbəyindən başqa #10334 ilə dəyişməyib):
hər bir digər model lockout-u kimi operatorun `mlSettings.maxCooldownMs`
dəyərinə (defolt `1_800_000ms` / 30dəq) aşağı sıxılır və _saxlanılan lockout
səbəbi_ qaydanın `"auth_error"` dəyəri yox, mövcud hardcode olunmuş
`"forbidden"` olaraq qalır — səbəb sətri yox, yalnız cooldown müddəti
səcdən-sonadək hörmət olunur. Bağlantının özü aktiv qalır; eyni
bağlantıdakı qardaş modellər təsirsizdir.

Yenidən ifadə edilmiş kvota xətaları (`额度不足`) produkşenda bir təchizatçı
qaydasına çatır (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, özünə məxsus elan edilmiş cooldown yoxdur — persistence
qatının miqyaslanmış backoff defoltu tətbiq olunur). #10334-dən bəri
`ProviderErrorRuleMatch` üzərindəki `scope` səcdən-sonadək istehlak OLUNUR, amma
**yalnız** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-indəki təchizatçılar üçün
(`providerErrorRules.ts` — bu gün yalnız `"agentrouter"`, `honorsRuleLockScope()`
vasitəsilə qapılanır). Hər bir digər təchizatçı üçün `scope` #10334-dən əvvəlki
kimi məlumat xarakterli qalır. `checkFallbackError` uyğunlaşmış qaydanın
scope-unu `fallbackResult.ruleScope` kimi üzə çıxarır;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) bir
`ruleScope`-un bağlantı miqyaslı, öz-özünü bərpa edən siqnal kimi hörmət
edilməyə həqiqətən təhlükəsiz olduğunu təsdiq edən paylaşılan qoruyucudur
(scope `"connection"`, səbəb `quota_exhausted`, heç vaxt `permanent` deyil,
heç vaxt `creditsExhausted` deyil — gələcəkdə scope `"connection"` ilə daimi
hesab vəziyyətinin birləşdirilməsinə qarşı müdafiə). İki istehlakçı onu çağırır:

- **Davamlılıq** (`markAccountUnavailable()`, `src/sse/services/auth.ts`): passthrough-provayderin **model-başına** kilidlənmə qoluna düşmək əvəzinə (agentrouter `passthroughModels: true`-dur → `hasPerModelQuota()` `true` qaytarır), o, **müvəqqəti bağlantı sərinləməsi** tətbiq edir — `testStatus: "unavailable"` + `rateLimitedUntil`, heç vaxt yekun status deyil (`credits_exhausted`/`banned`/`expired`) — beləliklə, əl ilə giriş məlumatlarının sıfırlanması tələb olunmaq əvəzinə bağlantı sərinləmə müddəti bitdikdən sonra özünü bərpa edir. `disableCooling: true` olan bağlantılar üçün atlanır (#2997): həmin imtina seçimi əvəzinə model-başına kilidlənməyə keçir (sənədləşdirilmiş bir kompromisdir — qolun üstündəki kod şərhinə baxın).
- **Eyni-sorğu combo marşrutlaşdırması** (`applyComboTargetExhaustion()`, `open-sse/services/combo/targetExhaustion.ts`): eyni qoruyucu bağlantını yaddaşdaxili `exhaustedConnections` çoxluğuna `${provider}:${connectionId}` açarı ilə işarələyir. Bu, yalnız öz hədəf obyektində _həmin `connectionId`-ni artıq özü daşıyan_ qalan bir EYNİ-SORĞU hədəfi atlamağa yarayır (`getExhaustedTargetSkipReason()`, `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections` axtarışından əvvəl `if (provider &&
connectionId)`) — qardaş hədəflərin öz sabitlənmiş `connectionId`-sini daşımadığı və birinin yalnız cavabın `X-OmniRoute-Selected-Connection-Id` başlığından hər göndərişdə həll edildiyi sadə model-siyahısı combo-sunda heç vaxt bu açar uyğunluğuna düşmür. Bu geniş yayılmış halda, qalan ayağın indicə tükənmiş hesabı təkrar istifadə etməsinə qarşı real müdafiə bu Set DEYİL — o, yuxarıdakı davamlılıq qatıdır (bağlantının `rateLimitedUntil` dəyəri artıq gələcəkdədir) və eyni qoruyucunun bu uğursuzluq üçün `transientRateLimitedProviders`-i yatırtması ilə birləşir ("İki mərhələli dizayn"a və `targetExhaustion.ts`-də `isAgentrouterConnectionQuotaScope` qolundakı kod şərhinə baxın): həmin Set işarəsiz qaldıqda, `combo.ts`-in `allowRateLimitedConnection` məcburi icazəsi (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provayderin qalan ayaqları üçün işə düşmür, beləliklə giriş məlumatı seçiminin `rateLimitedUntil` filtri (`src/sse/services/auth.ts:1238`) normal şəkildə hörmət olunur və qalan ayaq ya fərqli, hələ də uyğun olan bir agentrouter bağlantısı seçir, ya da mövcud giriş məlumatı olmadan uğursuz olur — bu qolun indicə sərinlətdiyi bağlantıya öz yolunu məcburən geri qaytarmır.

### İki mərhələli dizayn: statusun yenidən ifadəsi, sonra təsnifat

Statusun yenidən ifadəsi (`upstreamStatusRestatement.ts`) və provayder təsnifat qaydaları (`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`) hər ikisi provayder id-si və mətn markerləri ilə açarlanan ayrı reyestrlərdir, lakin onlar fərqli yerlərdə işləyir və fərqli məqsədlərə xidmət edirlər: yenidən ifadə HTTP statusunu `chatCore.ts`-də erkən mərhələdə yenidən yazır; təsnifat qaydaları isə fallback `reason`-u seçir və `checkFallbackError()` daxilində `scope`-u kilidləyir (`model` / `provider` / `connection`) (`open-sse/services/accountFallback.ts`).

Təsnifat qaydaları tam xəta **mətnini** (`额度不足` kimi body markerlərini uyğunlaşdırmaq üçün lazımdır) yalnız `providerErrorRules.ts`-dəki `FULL_TEXT_RULE_PROVIDERS` icazə siyahısında olan provayderlər üçün görür — hazırda yalnız `"agentrouter"`. Hər bir digər **daxili kataloq** provayderi üçün `checkFallbackError`, `getProviderErrorRuleMatch`-ə yalnız strukturlaşdırılmış xətanı (`{code, type}`) ötürür ki, bu da başlıq/status/kod əsaslı qaydalar üçün kifayətdir, lakin body-mətn markerlərinə qarşı kordur. `resolveRuleMatchBody()` köməkçisi bu seçimi həyata keçirir: icazə siyahısındakı provayderlər üçün tam xəta mətni, əks halda strukturlaşdırılmış xəta. `FULL_TEXT_RULE_PROVIDERS`-ə **daxili** provayder əlavə etmək aşkar provayder-başına opt-in-dir — bu, siyahıda olmayan hər provayder üçün standart yolun bayt-bayt dəyişməz qalması üçündür.

Bir qaydanın `scope`-u (`model` / `provider` / `connection`) `FULL_TEXT_RULE_PROVIDERS`-dən ayrı bir opt-in-dir: `checkFallbackError` onu yalnız `fallbackResult.ruleScope` kimi üzə çıxarır və aşağı axın istehlakçıları onu yalnız eyni fayldakı `HONORS_RULE_LOCK_SCOPE_PROVIDERS` icazə siyahısındakı provayderlər üçün informasiya etiketindən fərqli bir şey kimi hörmət edir (`honorsRuleLockScope()` vasitəsilə idarə olunur — bu gün yalnız `"agentrouter"`). Bir provayder həmin icazə siyahısına daxil olduqdan sonra `scope: "connection"` uyğunluğunun əslində nə etdiyi üçün yuxarıdakı "Yenidən ifadə olunmuş kvota xətaları" bölməsinə baxın.

**#11104 — operator tərəfindən elan edilmiş qaydalar hər iki icazə siyahısını yan keçir.** Operator bu faylı redaktə etmədən `settings.providerErrorRules` (`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) vasitəsilə iş vaxtında provayder-başına qayda elan edə bilər. Operator qaydasını `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` arxasında qapılamaq — daxili kataloq qaydalarının **standart** davranışını qorumaq üçün nəzərdə tutulmuş icazə siyahıları — parametrlər mexanizmini artıq orada siyahıya alınmışlar istisna olmaqla hər provayder üçün təsirsiz edərdi, çünki qaydanı elan etmək artıq operatorun aşkar opt-in-dir. `resolveRuleMatchBody()` və `honorsRuleLockScope()` hər ikisi əvvəlcə `hasOperatorRuleForProvider()`-i yoxlayır: operator qaydası olan bir provayder xam xəta mətnini alır və elan edilmiş `scope`-u hörmət olunur, o, hər hansı bir icazə siyahısında da görünüb-görünməməsindən asılı olmayaraq.

**Məlum boşluq — `providerRuleRegistry` HTTP 400 üçün heç vaxt istifadə olunmur.** `checkFallbackError`-in `BAD_REQUEST` qolu 400 statusunu tamamilə öz şablon massivləri (`accountFallback.ts`-dəki `MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` və s.) vasitəsilə təsnif edir və özündən yuxarıdakı `configuredRule`/`getProviderErrorRuleMatch` qoluna çatılmamışdan əvvəl qayıdır. `status: 400` olan daxili kataloq qaydası (və ya operator qaydası) sintaktik cəhətdən etibarlıdır, lakin heç vaxt işə düşməyəcək. Bu gün heç bir mövcud qayda 400-ü hədəfləmir, ona görə də prodakşnda heç nə təsirlənmir — lakin gələcək bir 400 qaydası əvvəlcə bu qolun dəyişdirilməsini tələb edir ki, bu da qayda əlavə etməkdən daha böyük bir dəyişiklikdir (o, artıq şablon-massiv davranışına güvənən hər provayder üçün 400-ü yenidən təsnif edir) və tək-provayder qayda əlavəsinin əhatə dairəsindən kənardır.

### Kvotanı səhv bildirən yeni gateway əlavə etmək

1. Bir qayda massivini `statusRestatementRegistry`-də qeydiyyatdan keçirin
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers`-i
   provayderə xas saxlayın; `CREDITS_EXHAUSTED_SIGNALS` ilə toqquşan
   generik ingilis ifadələrini heç vaxt təkrar istifadə etməyin
   (`open-sse/services/accountFallback.ts`).
2. İstəyə bağlı olaraq düzgün kilid əhatəsini (`connection` — hesab üzrə
   kvota üçün, `model` — model üzrə xətalar üçün) seçmək məqsədilə
   `open-sse/config/providerErrorRules.ts` faylında (`providerRuleRegistry`)
   təsnifat qaydalarını qeydiyyatdan keçirin. Bu addım yalnız production
   mühitində, qaydaları tam xəta mətninə (body markerlərinə) ehtiyac duyan
   provayderlər üçün qüvvəyə minir: provayder id-ni eyni fayldakı
   `FULL_TEXT_RULE_PROVIDERS`-ə əlavə edin — əks halda `checkFallbackError`
   qaydaya yalnız strukturlaşdırılmış `{code, type}` xətasını ötürür və
   body mətninə əsaslanan qayda canlı trafikdə heç vaxt uyğun gəlməyəcək.
   Yalnız `status`/`headers` üzərindən uyğunlaşan qaydalar (Opencode və ya
   Minimax qaydaları kimi) bu opt-in-ə ehtiyac duymur. Bundan ayrı olaraq,
   əgər qayda `scope: "connection"` elan edir və məqsəd real bağlantı
   səviyyəli cooldown və eyni sorğuda combo skip-dir (sadəcə informasiya
   etiketi deyil), provayder id-ni eyni fayldakı
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ə əlavə edin — məhz bu,
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) və
   `applyComboTargetExhaustion()` (`open-sse/services/combo/targetExhaustion.ts`)
   daxilində `isAgentrouterConnectionQuotaScope()` tipli istehlakı idarə edir;
   bu olmadan `scope` hələ də `fallbackResult.ruleScope` vasitəsilə ötürülür,
   lakin heç nə ona əsasən hərəkət etmir.
3. `tests/unit/upstream-status-restatement.test.ts` və
   `tests/unit/agentrouter-error-rules.test.ts` fayllarına bənzər vahid
   testləri əlavə edin (not-permanent / not-creditsExhausted qoruyucuları
   daxil olmaqla, və — əgər provayder allowlist-ə ehtiyac duyursa —
   `resolveRuleMatchBody()` funksiyasının tam mətni yalnız həmin provayder
   üçün qaytardığını yoxlayan test).

`chatCore.ts`, `classifyError` və ya combo-da heç bir dəyişiklik tələb olunmur.

#### Egress-bucket əsaslı kilid (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-dəki provayderlər (opencode ailəsi)
IP-bucket əsaslı upstream kimi qəbul edilir (opencode-un pulsuz tarifi
hesab əsaslı deyil, IP-bucket əsaslıdır — bax: #9611): status-429 ilə
təsnif edilmiş `quota_exhausted` **və ya** `rate_limit_exceeded`, rotasiya
onları sınamağa macal tapmazdan əvvəl, son məlum egress IP-si uğursuz
bağlantının IP-si ilə üst-üstə düşən allowlist ailəsindəki bütün
bağlantıları cooldown-a salır — bu, N-1 sayda zəmanətli uğursuz upstream
çagrısının qarşısını alır (#10460/#10525 ilə eyni sxem).
`rate_limit_exceeded` qəsdən daxil edilib: `markAccountUnavailable`
yolunda opencode-a xas qaydalar heç vaxt uyğun gəlmir (`checkFallbackError`-ə
headers/body ötürülmür, opencode `FULL_TEXT_RULE_PROVIDERS`-də deyil),
ona görə də body-də abunə kvotası mətni daşıyan ("monthly usage limit
reached") bir 429, `status_429` qaydasına çatmazdan əvvəl kvota mətni
fallback-ı (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 saatlıq
cooldown) tərəfindən `quota_exhausted` kimi təsnif edilir — kvota mətni
olmayan 429 (adi rate limiting) isə `status_429` qaydası vasitəsilə
`rate_limit_exceeded` kimi təsnif edilir və yenə də IP ailəsini cooldown-a
salır. Allowlist-də olan provayder üçün IP-bucket əsaslı rate limit,
tükənmiş kvota ilə eyni siqnaldır. Dürüst məhdudiyyətlər:

- **Best-effort**: kilid bağlantının son məlum `egress_ip` ünvanını
  `proxy_logs`-dan həll edir (24 saatlıq pəncərə, sinxron, keşsiz). Soyuq keş
  (egress IP heç vaxt yoxlanılmayıb) və ya sətir yoxdursa → uğursuz bağlantı
  yenə də budaq tərəfindən soyudulur (bu günkü kimi qeyd olunur), sadəcə heç
  bir qardaş kilidlənmir.
- **Heç vaxt terminal deyil**: soyuma yenilənən kvota pəncərəsidir
  (`testStatus: "unavailable"`); daimi vəziyyət heç vaxt IP səviyyəli siqnaldan
  törədilmir. `disableCooling` bağlantıları budağı tamamilə atlayır.
- **İcazə siyahısındakı ailə üçün kilid qranulyarlığı dəyişir**: bu, əhatə
  dairəsi dəyişikliyidir, təkcə qardaş optimallaşdırması deyil. opencode
  `passthroughModels` provayderidir, ona görə də bu budaqdan əvvəl 429 MODEL
  başına kilidlənmə yaradırdı; indi isə bağlantı soyuması yaradır — o cümlədən
  heç bir qardaşı olmayan tək bağlantı işlədən operator üçün də. Bu, opencode
  qayda cədvəlinin artıq düzgün elan etdiyi qranulyarlıqdır
  (`scope: "connection"`, `providerErrorRules.ts`), indiyə qədər heç vaxt yerinə
  yetirilməyib, çünki opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-də deyil.
  Budaq uğursuz bağlantının soyumasını + `backoffLevel`-ını özü yazır,
  bağlantı əhatəli agentrouter budağını əks etdirir və qayıdır — model başına
  blok və aşağıdakı ümumi yol heç vaxt çatılmır.
- **Combo daxildir**: agentrouter budağı kimi, əhatə dairəsi combo çağıranın
  429-a tətbiq etdiyi `persistUnavailableState`/`isCombo` endirməsini qəsdən
  nəzərə almır. Model başına kilidlənmə bu əhatənin daha zəif forması deyil,
  yanlış vahiddir: tükənmiş IP haqqında heç nə demir, ona görə də combo
  rotasiyası hər qardaş üçün zəmanətli uğursuz bir çağırışı yandırmağa davam
  edərdi.
- **Qardaş təhlükəsizliyi**: artıq terminal vəziyyətdə olan (qadağan
  edilmiş/credits_exhausted) və ya artıq daha uzun soyumada olan bir qardaşın
  üzərinə heç vaxt yazılmır.
- **Eksklüziv icazə siyahısı**: `EGRESS_BUCKETED_LOCK_PROVIDERS`-i
  genişləndirmək sahibin açıq qərarıdır; ümumi bağlama yoxdur (pattern
  #10334/#10419). Qardaş sorğusu həmin eyni icazə siyahısını SQL literali kimi
  təkrarlamaq əvəzinə ona bağlayır, ona görə də onu genişləndirmək bir
  sətirlik dəyişiklik olaraq qalır.
- **Egress IP rotasiyası, hər iki istiqamətdə**: axtarış pəncərəsi (24 saat)
  egress-IP keş TTL-indən (5 dəq) xeyli genişdir, ona görə də "son məlum IP"
  cari vəziyyət deyil, tarixçədir. Əgər bağlantının proksisi pəncərə daxilində
  rotasiya olunubsa, kilid həqiqətən paylaşılan IP-ni **qaçıra bilər** (qeyd
  olunmuş IP yeni, tükənməmiş olandır) — və simmetrik olaraq, o vaxtdan bəri
  tükənmiş IP-dən **rotasiya ilə uzaqlaşmış bir qardaşı soyuda bilər**. İkinci
  hal həmin qardaşa bir soyuma pəncərəsinə başa gəlir; hər ikisi tarixçə
  əsaslı axtarışın qəbul edilmiş best-effort məhdudiyyətləridir.
- **Xərc**: `proxy_logs`-un iki məhdud skanı (`idx_pl_timestamp` vasitəsilə
  pəncərə filtrli), yalnız 429 tezliyində. Yeni indeks yoxdur (miqrasiya 134
  YAGNI). Orta ölçülü real trafikli DB nüsxəsində ölçülüb; yüksək ötürmə
  qabiliyyətli instansiya eyni pəncərədə mütənasib olaraq daha çox sətir
  saxlayır.

---

## Digər Dayanıqlılıq Xüsusiyyətləri

- **20 marşrutlaşdırma strategiyası** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — baxın: [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Sıfırlanmadan xəbərdar marşrutlaşdırma** (v3.8.0) — kvota sıfırlanma vaxtına görə bağlantıları prioritetləşdirir.
- **Arxa plan rejiminin degradasiyası** — Responses API-də `background: true` xəbərdarlıqla sinxron rejimə endirilir.
- **Dinamik alət limiti aşkarlanması** — alət sayı limitlərinə çatıldıqda provayderləri geri çəkir.
- **Təcili ehtiyat (fallback)** — `OMNIROUTE_EMERGENCY_FALLBACK` ilə idarə olunur; operatorlar onu yenidən başlatma tələb etmədən Feature Flags səhifəsindən üstələyə bilərlər.

---

## Sazlama

- Çəkili kombo `503 all_targets_cooling_down` cavabı verirsə (`Retry-After` təyin olunub, `diagnostics.excluded` hər hədəfi `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` ilə göstərir) → hovuz konfiqurasiya olunub və bağlıdır, hər hədəf sadəcə dayanıqlılıq taymeri ilə istisna edilib; `[COMBO] Weighted selection: every target excluded before dispatch — …` xəbərdarlığı səbəbləri və qalan saniyələri göstərir. Eyni kombodan gələn `404 no_executable_targets` heç bir dayanıqlılıq taymerinin iştirak etmədiyi deməkdir (icra edəcək heç nə yoxdur və ya hər hesab əlçatanlıq yoxlamasından keçməyib). `targetResolution.ts` faylında toplanan istisnalardan `open-sse/services/combo/pinRecovery.ts` faylında qurulub.
- Bir provayderin bütün açarları ötürülürsə → həm dövrə qırıcısının vəziyyətini, HƏM DƏ hər bağlantının `rateLimitedUntil`/`testStatus` dəyərini yoxlayın.
- Sıfırlanma pəncərəsindən sonra provayder daimi istisna olunubsa → kod `getStatus()`/`canExecute()` əvəzinə xam `state` oxuyur.
- Bir açar uğursuz olur, digərləri işləməlidir → dövrə qırıcısı əvəzinə bağlantı soyudulmasına üstünlük verin.
- Yalnız bir model uğursuz olursa → bağlantı soyudulması əvəzinə model kilidlənməsinə üstünlük verin.
- Vəziyyət özünü bərpa etməlidir, amma etmir → gələcək zaman damğasını + vaxtı keçmiş vəziyyəti yeniləyən oxu yolunu yoxlayın. Daimi statuslar əl ilə dəyişiklik tələb edir.

---

## Runtime vəziyyəti — agent üçün sürətli arayış

> `AGENTS.md` → "Resilience Runtime State" bölməsindən (PR #12743) sözbəsöz köçürülüb ki,
> agent bələdçisi 40k kontekst büdcəsi daxilində qalsın. Bu, yuxarıdakı bölmələrin
> sıxılmış, agentə yönəlmiş görünüşüdür; nömrələnmiş bölmələr tam arayış olaraq qalır.

OmniRoute-da əlaqəli, lakin fərqli üç müvəqqəti uğursuzluq mexanizmi var.
Marşrutlaşdırma davranışını sazlayarkən onların əhatə dairələrini ayrı saxlayın.
Bir baxışda xəritə üçün [3 qatlı dayanıqlılıq diaqramına](../diagrams/exported/resilience-3layers.svg)
(mənbə: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
baxın.

### Provayder Dövrə Qırıcısı

**Əhatə**: bütöv provayder, məs. `glm`, `openai`, `anthropic`.

**Məqsəd**: yuxarı axın/xidmət səviyyəsində təkrarlanan uğursuzluqlar yaşayan
provayderə trafik göndərməyi dayandırmaq ki, sağlam olmayan bir provayder hər sorğunu ləngitməsin.

**Tətbiq**:

- Əsas sinif: `src/shared/utils/circuitBreaker.ts`
- Chat qapısı/icra bağlanması: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime status API: `src/app/api/monitoring/health/route.ts`
- Paylaşılan wrapper-lər: `open-sse/services/accountFallback.ts`
- Saxlanılan vəziyyət cədvəli: `domain_circuit_breakers`

**Vəziyyətlər** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normal trafikə icazə verilir.
- `DEGRADED`: erkən xəbərdarlıq zolağı — uğursuzluqlar degradasiya həddini keçib, amma hələ
  qırıcı həddini yox; trafik hələ də axır, idarə panelləri xəbərdarlığı göstərir. Etibarlı
  bağlantı testi və ya yeni uğursuzluq olmayan sakit pəncərə onu `CLOSED` vəziyyətinə qaytarır
  (pəncərə `docs/architecture/RESILIENCE_GUIDE.md` faylında göstərilib).
- `OPEN`: provayder müvəqqəti bloklanıb; çağıranlar provayder-dövrəsi-açıq cavabı alır
  və ya kombo marşrutlaşdırması başqa hədəfə keçir.
- `HALF_OPEN`: sıfırlanma müddəti bitib; sınaq sorğusuna icazə verilir. Uğur qırıcını
  bağlayır, uğursuzluq onu yenidən açır.

**Defolt dəyərlər** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts` faylındakı
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` vasitəsilə istehlak olunur →
`src/sse/handlers/chatHelpers.ts` faylındakı `getCircuitBreaker(provider, …)`). Bütöv-provayder
qırıcısı `circuitBreakerThreshold` / `circuitBreakerReset` əsasında işləyir:

| Profil    | degradasiya həddi | açılma həddi (`circuitBreakerThreshold`) | sıfırlanma (`circuitBreakerReset`) |
| --------- | ----------------: | ---------------------------------------: | ---------------------------------: |
| OAuth     |               `5` |                                      `8` |                              `60s` |
| API açarı |               `7` |                                     `12` |                              `30s` |
| Yerli     |      (törədilmiş) |                                      `2` |                              `15s` |

`PROVIDER_PROFILES` həmçinin `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 dəq) və `providerCooldownMs` (5/10/1 dəq) təyin edir: bunlar
**opt-in qlobal Provider Cooldown-un pəncərə qapısını** (`PROVIDER_COOLDOWN_ENABLED`, defolt olaraq
söndürülüb) təmin edir — `open-sse/services/providerCooldownTracker.ts` faylındakı provayder səviyyəli
qeyd yalnız `providerFailureWindowMs` daxilində `providerFailureThreshold` qədər uğursuzluqdan sonra
soyuyur sayılır və sonra `providerCooldownMs` müddətinə soyuyur. Bunlar canlı qırıcının həddləri
DEYİL — qırıcı davranışı gözləyərək onları tənzimləməyin. Hər bir defolt dəyər
`OMNIROUTE_PROVIDER_BREAKER_*` və `OMNIROUTE_CIRCUIT_BREAKER_*` mühit dəyişənləri ilə üstələnə bilər;
runtime-a dəqiq uyğun arayış cədvəli `docs/architecture/RESILIENCE_GUIDE.md` faylında yerləşir.

Provayder qırıcısını yalnız provayder səviyyəli uğursuzluq statusları işə salmalıdır:

```ts
(408, 500, 502, 503, 504);
```

Çox `401`, `403` və ya `429` halları kimi normal hesab/açar/model xətaları üçün
bütöv-provayder qırıcısını işə salmayın. Bunlar adətən bağlantı soyudulması və ya model
kilidlənməsinə aiddir. Ümumi API açarı provayderinin `403` xətası, terminal provayder/hesab
xətası kimi təsnif edilmədikcə, bərpa edilə bilən olmalıdır.

Breaker fon taymeri yox, tənbəl (lazy) bərpa mexanizmi istifadə edir. `OPEN` müddəti bitdikdə, `getStatus()`, `canExecute()` və `getRetryAfterMs()` kimi oxuma əməliyyatları vəziyyəti `HALF_OPEN` olaraq yeniləyir, beləcə panel lövhələri (dashboards) və kombo namizəd qurucuları müddəti bitmiş provayderi əbədi olaraq istisna etmir.

### Bağlantı soyuma müddəti (Connection Cooldown)

**Əhatə**: bir provayder bağlantısı/hesabı/açarı.

**Məqsəd**: eyni provayderin digər bağlantılarına sorğulara xidmət etməyə davam etməyə icazə verərkən, bir problemli açarı/hesabı müvəqqəti olaraq atlamaq.

**Tətbiq**:

- Yazma/yeniləmə yolu: `src/sse/services/auth.ts::markAccountUnavailable()`
- Hesab seçimi/filtrasiyası: `src/sse/services/auth.ts::getProviderCredentials...`
- Soyuma müddətinin hesablanması: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Parametrlər: `src/lib/resilience/settings.ts`

Provayder bağlantılarındakı vacib sahələr:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Hesab seçimi zamanı bağlantı aşağıdakı halda atlanır:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Soyuma müddətləri də tənbəldir: `rateLimitedUntil` keçmişdə qaldıqda, bağlantı yenidən uyğun olur. Uğurlu istifadə zamanı `clearAccountError()` `testStatus`, `rateLimitedUntil`, xəta sahələrini və `backoffLevel`-i təmizləyir.

Defolt bağlantı soyuma davranışı:

- OAuth baza soyuma müddəti: `5s`.
- API-açarı baza soyuma müddəti: `3s`.
- API-açarı `429` halı mövcud olduqda yuxarı axının (upstream) təkrar cəhd göstərişlərinə (`Retry-After`, sıfırlanma başlıqları və ya təhlil edilə bilən sıfırlanma mətni) üstünlük verməlidir.
- Təkrarlanan bərpa edilə bilən uğursuzluqlar eksponensial geri çəkilmə (exponential backoff) istifadə edir:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd mühafizəsi eyni bağlantıda paralel uğursuzluqların soyuma müddətini təkrar-təkrar uzatmasının və ya `backoffLevel`-i ikiqat artırmasının qarşısını alır.

Terminal vəziyyətlər soyuma müddəti deyil. `banned`, `expired` (yalnız `EXPIRED_RETRY_MAX` vasitəsilə N sayda məhdud təkrar cəhddən sonra terminal olur) və `credits_exhausted` vəziyyətləri kimlik məlumatları/parametrlər dəyişənə və ya operator onları sıfırlayana qədər əlçatan olmamaq üçün nəzərdə tutulub. Terminal vəziyyətləri müvəqqəti soyuma vəziyyəti ilə üstələməyin.

### Model kilidlənməsi (Model Lockout)

**Əhatə**: provayder + bağlantı + model.

**Məqsəd**: həmin bağlantı üçün yalnız bir model əlçatan olmadıqda və ya kvota ilə məhdudlaşdırıldıqda bütöv bağlantını söndürməkdən qaçınmaq.

Nümunələr:

- Hər model üzrə kvota tətbiq edən və `429` qaytaran provayderlər.
- Çatışmayan bir model üçün `404` qaytaran lokal provayderlər.
- Seçilmiş Grok rejimləri kimi provayderə xas rejim/model icazəsi uğursuzluqları.

Model kilidlənməsi `open-sse/services/accountFallback.ts`-də yerləşir və eyni bağlantının digər modellərə xidmət etməyə davam etməsinə imkan verir.

### Xəta ayıqlama təlimatları

- Bir provayderin bütün açarları atlanırsa, həm provayder breaker vəziyyətini, həm də hər bağlantının `rateLimitedUntil`/`testStatus` dəyərlərini yoxlayın.
- Sıfırlanma pəncərəsindən sonra provayder daimi istisna olunmuş görünürsə, kodun `getStatus()`/`canExecute()` əvəzinə xam `state` oxuyub-oxumadığını yoxlayın.
- Bir provayder açarı uğursuz olarsa, lakin digərləri işləməlidirsə, provayder breaker əvəzinə bağlantı soyuma müddətinə üstünlük verin.
- Yalnız bir model uğursuz olarsa, bağlantı soyuma müddəti əvəzinə model kilidlənməsinə üstünlük verin.
- Bir vəziyyət özünü bərpa etməlidirsə, gələcək vaxt möhürü/sıfırlanma taym-autu və müddəti bitmiş vəziyyəti yeniləyən oxuma yolu olmalıdır. Daimi statuslar əl ilə kimlik məlumatı və ya konfiqurasiya dəyişiklikləri tələb edir.

---

## TLS Barmaq İzi və Gizlilik

Provayderə xas gizlilik (JA3/JA4, CCH, obfus-kasiya) ayrıca sənədləşdirilib — baxın `docs/security/STEALTH_GUIDE.md` (git; `/docs`-a kompilyasiya edilmir).

---

## Dayanıqlılıq testləri (Phase 8 · Block C)

Dayanıqlılıq məntiqi üçün unit testlərdən əlavə, üç test runtime-ı real
stress/xəta şəraitində yoxlayır (hamısı integration/nightly — heç biri PR-ları bloklamır):

| Test        | Nə yoxlayır                                                                                                                                                                                                  | İşə salınma                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Chaos       | Saxta-upstream node real latency/reset/timeout/503 injeksiya edir; circuit breaker-in açıldığını/bərpa olunduğunu və `checkFallbackError`-un 503-ü bərpa edilə bilən fallback kimi təsnif etdiyini yoxlayır. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | `--expose-gc` altında hər `createSSEStream` üçün ~500 stream; heap limiti aşarsa uğursuz olur (OOM qoruyucusu #3069).                                                                                        | `npm run test:heap`                      |
| k6 soak     | `/api/monitoring/health` ünvanına davamlı yük; p95/xəta eşik dəyərləri.                                                                                                                                      | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` tərəfindən orkestri olunur (cron + dispatch). Defolt
`test:integration`-da chaos və heap avtomatik ötürülür (`RUN_CHAOS_INT`/`--expose-gc` olmadan).

---

## Həmçinin bax

- [Arxitektura Bələdçisi](./ARCHITECTURE.md) — Sistem arxitekturası və daxili quruluş
- [İstifadəçi Bələdçisi](../guides/USER_GUIDE.md) — Provayderlər, kombolar, CLI inteqrasiyası
- [Auto-Combo Mühərriki](../routing/AUTO-COMBO.md) — 16 faktorlu qiymətləndirmə, rejim paketləri
