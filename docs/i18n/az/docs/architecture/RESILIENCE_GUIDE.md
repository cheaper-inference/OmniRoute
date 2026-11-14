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

- `banned` — qadağan edilmiş açar söz / hesab qadağasının aşkarlanması ilə təyin olunur (bax [BAN_DETECTION](../security/BAN_DETECTION.md) ). Upstream hər sorğuya rədd cavabı (`request_rejected`, məsələn Anthropic OAuth 403 "Sorğu icazə verilmir") onu heç vaxt təyin etmir: onlar hər bir əlaqə və model üzrə sayılır və `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 saat) ilə məhdudlaşan artan soyuma müddəti ilə həmin modeli fırlanmadan çıxarın və ya heç bir model məlum olmayan — `open-sse/services/requestRejectedStreak.ts` əlaqəni soyudun
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

**Tətik:** başlıqları `anthropic-ratelimit-unified-status: rejected` daşıyan 5 saatlıq istifadə divarı — a `429` və hesab uyğun olduqda `anthropic-ratelimit-unified-slow-offer: treatment`. O ilk divardan əvvəl heç nə göndərilmir 429; vahid başlıqları olmayan partlayış 429 normal soyutma yolundan keçir.

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

### Banklaşdırılmış sıfırlamaları avtomatik tətbiq edin

**Əhatə dairəsi:** Codex və Claude abunə (OAuth) əlaqələri.** Daxil olun** : `bankedResetAutoApply` parametri defolt olaraq söndürülüb və `dry-run` rejimindədir (Parametrlər → AI → Banklaşdırılmış sıfırlamaları avtomatik tətbiq edin).

**Məqsəd:** operatorun Provayder Limitləri səhifəsində "Geri Al" düyməsini basmasını gözləmək əvəzinə, hesab istifadə divarına dəyəndə banklaşdırılmış sıfırlamaları özbaşına xərcləyin.

| Kredit növü (`creditTypes`) | Nə geri alınır                                            | Harada qaçır                                            |
| --------------------------- | --------------------------------------------------------- | ------------------------------------------------------- |
| `codexCredits`              | Codex kreditləri sıfırlayın                               | fon işi, hər 60 s                                       |
| `claudeCredits`             | Claude bank qrantları (`GRANT` kreditləri)                | fon işi, hər 60 s                                       |
| `claudeSessionReset`        | Claude həftəlik sessiya limitinin sıfırlanması (yuxarıda) | hər hesab keçidi ilə eyni siyasət vasitəsilə sorğu yolu |

**İcra:**

- Təmiz qərar (hər iki yol üçün müəyyən edilmiş bir qayda): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Əsas iş: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts`-da başladı)
- Claude sorğu yolu qapısı: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts`-də `setClaudeLimitResetPolicy()` vasitəsilə qeydiyyatdan keçmişdir
- Tarix, caps və webhook: `src/lib/usage/bankedResetAudit.ts`
- Tarix API: `GET /api/settings/banked-reset-auto/history?limit=50` (idarəetmə auth)

**Qərar əmri** (birinci uğursuz qayda qeydə alınmış səbəbdir):

1. Xüsusiyyət deaktivdir, kredit növü deaktivdir və ya hesab əhatə dairəsindən kənardır (`accountScope` `all` / `selected` plus hər hesab üçün `connections` xəritəsi).
2. Əlavə UTC cədvəlindən kənarda (`startHourUtc` > `endHourUtc` gecə yarısını keçir).
3. Son 24 saat ərzində böyük hərflər: `maxPerAccountPerDay` (1), `maxPerDay` (3) və `minSpacingMinutes` (30) istənilən iki ödəniş arasında.
4. Tətik: divarlı `session` və ya `weekly` pəncərəsi (yalnız xərclənən hər pəncərə ilə hesab haqqında hesabat verən `isAccountQuotaExhausted()` deyil, `getQuotaWindowStatus().reachedThreshold` dən oxuyun) və ya ən azı `expiringCreditMinUsedPercent` (50) istifadə etmiş hesabda `expiringCreditHours` (24) daxilində müddəti bitən kredit.
5. Təbii sıfırlama qoruyucusu: divarlı 5 saatlıq pəncərə `sessionResetGuardMinutes` (90) daxilində və ya divarlı həftəlik pəncərə `weeklyResetGuardHours` (12) daxilində sıfırlandıqda keçin.
6. Həftəlik mərtəbə: həftəlik qalan `weeklyFloorPercent` (10) aşağı olduqda 5 saatlıq sıfırlamanı atlayın.
7. `last-resort` rejimi: eyni provayderin digər əhatə dairəsi hesabında hər iki pəncərədə ən azı `poolHeadroomPercent` (10) qaldıqda keçin. Müddəti bitən kredit tətikləri bundan yan keçir.
8. `dry-run` sıra qeyd edir və heç nə geri qaytarmır; `last-resort` və `eager` geri qaytarın.

Çatışmayan kvota datası heç vaxt ödənişin kilidini açmır: naməlum sıfırlama vaxtı və ya həftəlik istifadə atlanır.

**Claude sessiyasının sıfırlanması:** xüsusiyyət söndürüldükdə və ya `claudeSessionReset` söndürüldükdə, hesab başına `autoLimitReset` keçidi əvvəlki kimi tam olaraq qərar verir. Hər ikisi aktiv olduqda, funksiya hər hesab üçün keçidləri əvəz edir: əhatə dairəsi daxilində hesab yalnız siyasət buna icazə verdikdə iddia edə bilər və `dry-run` rejimində heç bir iddia irəli sürülmür.

**Təhlükəsizlik:** iş hər bir işarə üçün ən çox bir kredit geri alır, kreditləri siyahıya salmazdan əvvəl qərar verir (keçilmiş hesab heç vaxt siyahıya alınmır), `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` idempotency açarlarından istifadə edir və uğursuz siyahı və ya ödənişdən sonra 1 saat ərzində hesabı söndürür. Hər bir satınalma, uğursuzluq və quru iş qərarı `audit_log` -ə yazılır (`action: "bankedReset.redeem"`, token və ya kredit identifikatoru yoxdur); qapaqlar həmin cərgələrdən sayılır, ona görə də onlar yenidən işə salındıqda sağ qalırlar. Uğurlu ödənişlər həmçinin `provider.reset_redeemed` webhook-u işə salır.

Reqressiya qoruyucuları: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Sessiya yaxınlığı (#7274)

**Əhatə dairəsi:** bir əlaqə üçün bağlanmış bir müştəri sessiyası (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` başlığı)** hər hansı** provayder.

**Məqsəd:** Çoxdövrəli agenti (Claude Kodu, köməkçi, xüsusi agentlər) sorğular üzrə eyni hesabda saxlayın, hesablar arası kontekst itkisini və hər hesab sessiyası vəziyyətinə malik provayderlərdə təkrar soyuq başlanğıc 429-ları azaldın.

**İcra:**

- TTL həlli: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Başlığın çıxarılması (ümumi, istənilən provayder): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Davamlı pin cədvəli: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Parametr: `sessionAffinityTtlMs` (ms-də qlobal TTL, `0` söndürür) — `src/lib/db/settings.ts`. Yeni defolt olaraq əvvəllər konfiqurasiya edilmiş hər hansı Codex TTL daşıyan `124_generic_session_affinity_ttl.sql` miqrasiya yolu ilə yalnız Codex-dən `codexSessionAffinityTtlMs` -dən adlandırıldı.

#7274 əvvəl `resolveSessionAffinityTtlMs()` `codex` istisna olmaqla, hər bir provayder üçün `0` -ə bərkidilmişdi, ona görə də TTL parametrinin (və sessiya başlıqlarının) heç bir yerdə təsiri yox idi, baxmayaraq ki, bağlama mexanizmi və başlığın çıxarılması artıq provayder-aqnostik idi. Düzəltmə erkən geri dönüşü aradan qaldırdı; TTL indi qlobal miqyasda `0` dən yuxarı təyin edilmiş hər bir provayderə eyni şəkildə tətbiq edilir.

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
- Eksklüziv idarə olunan sessiya icarələri nəsil hasarına malik davamlı ömür dövrü mülkiyyətidir.

---

## 3. Model Kilidlənməsi

**Əhatə dairəsi:** provayder + bağlantı + model üçlüyü.

**Statusa görə əhatə dairəsi:** kilidlənmənin hansı açarı yazacağını uğursuz status müəyyən edir
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kvota və ya hüquq siqnalıdır — **kvota ailəsini** kilidləyir:
  codex üçün bütün `codex` / `spark` əhatə dairəsini (bağlantının hər bir `gpt-5*` modeli), digər provayderlər üçün isə `getQuotaScopedModelForProvider()`.
- `404` sadə modeli kilidləyir (`getModelLockKey()` `not_found` halını daraldır).
- İstənilən digər status — `5xx` nəqliyyat/server xətaları və OmniRoute-un keyfiyyət yoxlamasından sintez etdiyi `502` — yalnız **dəqiq**
  provayder/bağlantı/model tuple-ını kilidləyir. Bir modeldəki uğursuz axın hesabın kvotası barədə dəlil deyil; bu qaydadan əvvəl
  `codex/gpt-5.6-luna` üzərindəki bir boş cavab həmin bağlantının bütün `gpt-5*` modellərini
  2–30 dəqiqəlik (artan) müddətə marşrutlaşdırmadan çıxarırdı, halbuki kvotasına toxunulmurdu.
- Çağıranın açıq şəkildə verdiyi `scope` seçimi həmişə üstün olur (Antigravity `"exact"` ötürür).

**Məqsəd:** yalnız bir model əlçatmaz və ya kvota ilə məhdud olduqda bütün bağlantının deaktiv edilməsinin qarşısını almaq.

**Nümunələr:**

- 429 qaytaran model üzrə kvota provayderləri
- Çatışmayan bir model üçün 404 qaytaran lokal provayderlər
- Provayderə xas rejim/model icazəsi xətaları (məsələn, Grok rejimləri)

**İmplementasiya:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Soyutma Paneli (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Aktiv kilidlənmələri aşağıdakılarla siyahıya alır: provayder, bağlantı, model, səbəb, expiresAt. Operatorlar kartdan modeli əl ilə yenidən aktivləşdirə bilərlər.

**REST API:**

- `GET /api/resilience/model-cooldowns` — aktiv kilidlənmələri siyahıya alır
- `DELETE /api/resilience/model-cooldowns` — əl ilə yenidən aktivləşdirmə. Body: `{provider, connection, model}`. Auth: management.

### Soyutma meneceri

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Keçici səbəbə görə marşrutlaşdırmadan çıxarılmış hər bir bağlantı üçün ayrıca provayder səhifəsini açmaq əvəzinə bir səhifə təqdim edir.
Bağlantı soyumalarını, model kilidlənmələrini və terminal vəziyyətləri siyahıya alır, onları bağlantı üzrə, seçilmiş bağlantılar üçün və ya bir provayderin
bütün bağlantıları üçün təmizləyir, həmçinin ən çox tənzimlənən soyutma qaydalarını redaktə edir: `streamStallCooldown.enabled` və OAuth / API-key
`connectionCooldown` əsas soyutma müddətini və maksimum geri çəkilmə addımlarını (`PATCH /api/resilience` vasitəsilə yadda saxlanılır).
Terminal vəziyyətlər (`banned`, `expired`, `credits_exhausted`) siyahıya alınır, lakin burada heç vaxt təmizlənmir.

Eyni səhifədəki **Error cooldown rules** kartı operator xətası qaydalarını (`settings.providerErrorRules`) və provayder üzrə ümumi ehtiyat
standartlarını (`settings.providerErrorDefaults`) `PATCH /api/settings` vasitəsilə redaktə edir — onların uyğunlaşdırılması barədə §7-dəki
"Operator-declared rules" bölməsinə baxın. Müddətlər Default (açıq soyutma müddəti yoxdur), 30 dəqiqə,
1 saat, 5 saat, 24 saat və ya 1–43.200 dəqiqə (30 gün) aralığında xüsusi dəyər ola bilər.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — statusu, qalan soyutma müddətini,
  geri çəkilmə səviyyəsini, son xəta tipini və model kilidlənmələrini (məxfi məlumatlar olmadan) göstərən bağlantılar
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` və ya
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` qaytarır

### Kilidlənmə parametrləri UI-si + uğurla azalma yolu ilə bərpa (v3.8.23)

Model kilidlənməsi həmişə aktiv olan sərt kodlaşdırılmış davranışdan öz parametrlər kartı və özünü bərpa edən yolu olan,
tamamilə konfiqurasiya edilə bilən, qoşulma tələb edən xüsusiyyətə çevrildi.

**Parametrlər kartı:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Bu, yuxarıdakı yalnız oxumaq üçün nəzərdə tutulmuş `ModelCooldownsCard`-dan **fərqlidir** (həmin kart yalnız aktiv kilidlənmələri
_siyahıya alır_) — yeni kart isə _parametrləri konfiqurasiya edir_. Standart dəyərlər `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) daxilində saxlanılır:

| Setting                 | Default                          | Meaning                                                                                 |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Əsas keçid — model kilidlənməsi **standart olaraq deaktivdir**.                         |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model əhatəli uğursuzluq kimi hesablanan yuxarı axın statusları.                        |
| `baseCooldownMs`        | `120_000` (120 s)                | İlk uğursuzluq üçün ilkin kilidlənmə müddəti.                                           |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Artırılmış soyutma müddəti üçün yuxarı hədd.                                            |
| `maxBackoffSteps`       | `10`                             | Eksponensial geri çəkilmə üzrə maksimum artım addımları.                                |
| `useExponentialBackoff` | `true`                           | Təkrarlanan uğursuzluqların soyutma müddətini eksponensial şəkildə artırıb-artırmaması. |

Parametrlər adi parametrlər yaddaşında saxlanılır və dayanıqlılıq parametrləri sxemi vasitəsilə yoxlanılır; kart
`baseCooldownMs`/`maxCooldownMs` dəyərlərini (`maxCooldownMs ≥ baseCooldownMs` şərti ilə) və `maxBackoffSteps` dəyərini məhdudlaşdırır.

**Uğurla azalma yolu ilə bərpa:** bərpa yalnız taymerin başa çatmasından ibarət deyil. Sağlam cavab modelin uğursuzluq sayını
azaldır ki, bərpa olunmuş model artımı dayandırsın (və) taymeri başa çatmadan əvvəl kilidlənməni aradan qaldırsın. Uğurlu
kombinasiya hədəfində `open-sse/services/combo.ts`, `decayModelFailureCount()` funksiyasını
(`open-sse/services/accountFallback.ts`) çağırır; bu funksiya saxlanılan
`failureCount` dəyərini yarıya endirir (`Math.floor(failureCount / 2)`); dəyər `0` olduqda kilidlənmə qeydi tamamilə silinir. Bunun əksi olan
`recordModelLockoutFailure()` artım pəncərəsi daxilindəki uğursuzluqlarda sayğacı artırır (və soyutma müddətini artırır). Bu uğurla azalma yolu adi taymerin başa çatmasına əlavədir —
istənilən yol modeli yenidən aktivləşdirə bilər.

**Vəziyyət:** bloklamalar proses daxilində **yaddaşda** saxlanılır (`provider:connectionId:model` açarı ilə
`ModelLockoutEntry` obyektlərindən ibarət hər-proses `Map`-lərində, dəqiq əhatə dairəli bloklamalar isə
`provider:connectionId:exact:model` açarı ilə), DB-də
saxlanılmır — yenidən başladıldıqda itirilir. _Parametrlər_ saxlanılır; aktiv bloklama _vəziyyəti_ isə müvəqqətidir.

---

## 4. Kvota-Paylaşma Paralelliyinə Nəzarət (v3.8.36)

Abunə hesabları (GLM, MiniMax və s. ) çox vaxt yalnız ~ 1–3 paralel sorğuları qəbul edir; bunun aşılması 429 saniyə və soyuma müddətini tetikler. Bu altında kəskindir** kvota payı** (`qtSd/…`) kombinləri, burada bir neçə API düyməsi bir yuxarı hesab paylaşır. Üç qat paylaşılan hesabı su altında saxlamaqdan qoruyur.

### Hər bağlantı üzrə paralellik həddi (`max_concurrent`)

Hər bir provayder bağlantısı `max_concurrent` tavanı elan edə bilər (`provider_connections.max_concurrent`, əlaqə modal / API / DB). Heç bir məhdudiyyət olmadan boş buraxın. Bu, — altındakı seriallaşdırma qatını idarə edən tək düymədir, onu hesabın real paralelliyinə təyin edir (məsələn, GLM ~ 1, MiniMax ~ 2).

### Hər model üçün uyğunluq hədləri (`modelConcurrency`)

Bağlantı əlavə olaraq öz `rateLimitOverrides` xəritəsində hər model üzrə dəqiq paralellik tavanlarını elan edə bilər:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Onu əlaqə modalında təyin edin (** Məzənnə limiti → Hər modelin paralellik hədlərini ləğv edir** , hər sətir üçün bir `model=cap` ) və ya eyni JSON forması ilə `PATCH /api/providers/[id]` vasitəsilə. Əsas semantika:

- **Bağlantı miqyasında və modelə xas:** `maxConcurrent` paylaşılan əlaqə tavanı olaraq qalır. Hər ikisi tətbiq edildikdə, hər iki qapı eyni kompozit qapıda (`global → provider → account → model`) atomik şəkildə alınır; effektiv davranış daha sərt tətbiq olunan hədddir.
- **Exact model-key match:** the key is the model string passed to the executor after routing resolution — normally the bare upstream model id (`glm-5`), not a client-side `provider/model` alias (`zai/glm-5` does not match `glm-5`). Values are positive-integer concurrent-request ceilings.
- **Yerli növbə, aşkarlama yoxdur:** artıq sorğular mövcud queue/timeout semantikası ilə yerli növbəyə (yazılmış `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` qəbul xətaları) malikdir. OmniRoute yuxarı siyasəti aşkar etmir və ya nəticə çıxarmır — o, operatorun konfiqurasiya etdiyi dəqiq tavanları tətbiq edir. Doymuş model qapısı heç vaxt provayderi söndürmür və heç vaxt daimi model blokirovkası yaratmır; upstream 429/cooldown/fallback davranışı səhv backstop olaraq qalır.
- **Hər bir əlaqə, hər bir proses əhatəsi:** qapaqlar verilənlər bazası bağlantısı üzrədir və yaddaşda saxlanılır, buna görə də eyni yuxarı axın API düyməsini təkrar istifadə edən iki əlaqə bir-biri ilə əlaqələndirilmir.
- **Konfiqurasiya edilməmiş, dəyişməmiş deməkdir:** xəritənin buraxılması (və ya tablosunun sahəsini boş qoymaq) heç bir model qapısı əlavə etmir. Hər hansı universal provayder məhdudiyyəti qoymadan konfiqurasiya nümunəsi:

```text
glm-5=1
glm-4.7=3
```

### Kvota-paylaşma sorğusunun seriallaşdırılması

Kvota payı göndərilməsi müsbət `max_concurrent` elan edən əlaqəni hədəflədikdə, ona paralel sorğular** hesab** hər bir əlaqə semaforu (açar `qsconn:<connectionId>`) vasitəsilə seriallaşdırılır: artıq sorğular** növbədə gözləyin** hesabı doldurmaq əvəzinə. elədir** uğursuz-açıq** — doymuş növbə və ya vaxt aşımı göndərilə bilən sorğunu heç vaxt rədd etmək əvəzinə boşluq olmadan davam edir. Daxil edin** Parametrlər → Dayanıqlılıq → Kvota-paylaşma hər bağlantı üzrə paralellik** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, defolt aktivdir). `max_concurrent` qapağı olmadan davranış dəyişməzdir.

> Kvota payı yönləndirmə qapısının (`selectQuotaShareTarget`, DRR + P2C) özü uğursuzdur və yalnız bir bağlantı hovuzu olan — at-cap bağlantısını _deprioritizasiya edir, onu məhdudlaşdıra bilməz, ona görə də bu semafor əslində daşqını ehtiva edir.

### Kombo soyutma müddətindən xəbərdar təkrar cəhd edin

Hər bir kombinasiya strategiyası üçün (aktiv olduqda) SHORT müvəqqəti soyutma müddəti üçün 429-u kristallaşdıran sorğu onu gözləyir və 429 — qaytarmaq əvəzinə yenidən göndərilir, bu, Gemini sinif TPM/RPM pəncərələrini (~ 60-ların təkrar cəhdindən sonra) əhatə edir, hər iki kombo-model kombinasiyası, dərəcə həddi. `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ilə məhdudlaşır** Parametrlər → Dayanıqlıq** . Heç vaxt `quota_exhausted` (gecə yarısına qədər kilidlənir) və ya auth/not-found səbəbləri ilə gözləmir. `comboTimeoutMs` dəsti ilə, bu son tarixdən əvvəl başa çata bilməyən gözləmə başlamaz (#18998): Combo `COMBO_TIMEOUT` 504 əvəzinə terminal cavabı ilə dərhal cavab verir.

Kombo `config.comboCooldownWaitEnabled: false` ilə imtina edə bilər. Yalnız literal `false` bu paylaşılan kombinasiya gözləmələrini (göndərmədən sonrakı soyuma və göndərilmədən əvvəl circuit-open/model-lock gözləmələri) və onların gözləmə-büdcə müddətinin uzadılmasını deaktiv edir. Eksik və ya `true` qlobal siyasəti qoruyur; `true` qlobal olaraq deaktiv edilmiş gözləməni aktivləşdirə bilməz. Açıq `targetTimeoutMs` hələ də qalib gəlir. Bu imtina ayrı-ayrı yerli-Codex dönmə sancağı göndərilmə öncəsi gözləməsini dəyişmir.

Eyni darvaza göndərilmə qabağı qutunu (#16319) əhatə edir: hər hansı bir cəhd edilməzdən əvvəl kombinasiyanın hər hədəfi atlandıqda, onun modeli qısa keçici blokada oturur, sıfır cəhd yolu eyni tavanlar altında kilidi gözləyir və işarəsiz `503 ALL_TARGETS_SKIPPED` a cavab vermək əvəzinə yenidən göndərilir. Heç bir gözləməyə icazə verilmədikdə (tavan, cəhd və ya büdcə tükəndikdə və ya funksiya sönür), terminal cavabı ən erkən keçid kilidinin bitməsindən etibarən `retry_after` / `reset_at` daşıyan `429 rate_limit_error` səviyyəsinə yüksəlir; kvota, auth və tapılmayan kilidlər işarəsiz 503-ü saxlayır.

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

## 7. Upstream Status Restatement (səhv göstərilmiş kvota xətaları)

**Əhatə dairəsi:** müvəqqəti kvota tükənməsini yanlış HTTP statusu ilə bildirən bir upstream gateway.

**Məqsəd:** təsnifatdan ƏVVƏL yanıltıcı statusu düzəltmək ki, aşağı axındakı istehlakçılar (fallback mühərriki, combo aqreqasiyası, müştəriyə qaytarılan cavab) xətanın həqiqətən yenidən cəhd edilə bilən xarakterini görsün.

Bəzi gateway-lər MÜVƏQQƏTİ kvota tükənməsini yenidən cəhd edilə bilməyən HTTP
statusu ilə bildirir. `agentrouter.org` standart `429` əvəzinə Çin dilində mətn
(`用户额度不足` / `额度不足`) ilə `403` (bəzən `400`) qaytarır. Claude
Code kimi müştərilər `403`-ü daimi xəta hesab edir və sessiyanı dayandırır; düzəliş
olmadan fallback mühərriki bunu kvota hadisəsi əvəzinə `AUTH_ERROR` kimi
təsnif edərdi.

**İcra:**

- Reyestr + matcher: `open-sse/config/upstreamStatusRestatement.ts` — qaydaların
  (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`) provayderə
  görə siyahısı; uyğunlaşdırma `applyStatusRestatement()` vasitəsilə aparılır.
- Çağırılma nöqtəsi: `open-sse/handlers/chatCore.ts` faylındakı
  `providerFailure:` bloku (təxminən 3654-cü sətir); upstream cavabını xəta HTTP
  statusu ilə (`!providerResponse.ok`) `parseUpstreamError()` təhlil etdikdən dərhal
  sonra və hər hansı təsnifat başlamazdan əvvəl çağırılır ki, bütün aşağı axın
  istehlakçıları düzəldilmiş statusu görsün. `200` SSE axını daxilində yerləşdirilmiş
  xətalar ayrıca, axının daha sonrakı təhlili yolundan keçir və bu gün bu hook tərəfindən
  **əhatə olunmur** — məlum məhdudiyyətdir və agentrouter-ın xəta HTTP statusu kimi
  üzə çıxan yanlış statusu üçün hələlik tələb olunmur.
- Yenidən cəhdə uyğunluq: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES` siyahısında
  (`open-sse/services/combo/unavailableRetryGate.ts`) yer alır; buna görə restatement
  edilmiş xəta ölü `403` kimi üzə çıxmaq əvəzinə real yenidən cəhd pəncərəsi daşıyır.
- Sintetik `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) yalnız
  restatement edilmiş cavabın **müştəriyə** bildirdiyi müddətdir; bu, bağlantının
  daxili soyuma/bloklama müddəti deyil — həmin müddət restatement edilmiş xətanı
  faktiki idarə edən mexanizmdən asılı olaraq ayrıca tənzimlənir (Connection
  Cooldown-un artan backoff mexanizmi, §2, API açarı ilə işləyən provayderlər üçün
  baza `3s`; və ya agentrouter kimi hər model üzrə kvota tətbiq edən provayderlər
  üçün Model Lockout, §3). Router daxildə yenidən cəhd üçün müştəriyə elan etdiyi
  60 saniyəlik pəncərədən daha tez uyğun vəziyyətə gələ bilər — bu, qəsdən yaradılmış
  ehtiyat payıdır, xəta deyil.

Daimi xətalar (`agentrouter`-ın `无权访问模型` — bu modelə giriş yoxdur) HEÇ VAXT
restatement edilmir: `textMarkers` uyğun gəlsə belə, `excludeMarkers` qaydanı
ləğv edir; buna görə xəta ilkin statusunu saxlayır və heç nə onu sonsuza qədər
yenidən cəhd etmir. Uyğun provayder təsnifat qaydasına
(`open-sse/config/providerErrorRules.ts` daxilindəki
`agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, elan edilmiş `6h` baza soyuma müddəti)
`checkFallbackError` (`open-sse/services/accountFallback.ts`)
ümumi apikey kateqoriyasındakı `FORBIDDEN` erkən qaytarmasından _əvvəl_
müraciət edir; bu davranış `honorsRuleLockScope(provider)` şərtinə əsaslanır
(`#10334` — hazırda `providerErrorRules.ts` daxilindəki
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-i vasitəsilə yalnız agentrouter-a
məxsusdur). Qaydanın elan etdiyi 6 saatlıq soyuma müddəti
`fallbackResult.baseCooldownMs` kimi ötürülür, lakin yenə də əvvəlcədən mövcud
olan hər model üzrə kvota bloklama yoluna
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`) daxil olur (`#10334` tərəfindən yalnız soyuma
mənbəsi dəyişdirilib): bu müddət hər digər model bloklamasında olduğu kimi,
operatorun `mlSettings.maxCooldownMs` dəyəri ilə (standart
`1_800_000ms` / 30 dəqiqə) aşağı həddə məhdudlaşdırılır və
_qalıcı bloklama səbəbi_ qaydanın `"auth_error"` dəyəri deyil, əvvəlcədən sabit
kodlaşdırılmış `"forbidden"` olaraq qalır — başdan sona yalnız soyuma müddətinə
əməl edilir, səbəb sətrinə yox. Bağlantının özü aktiv qalır; eyni bağlantıdakı
qardaş modellərə təsir olunmur.

Restatement edilmiş kvota xətaları (`额度不足`) istehsal mühitində provayder
qaydasına (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, özünün elan etdiyi soyuma müddəti yoxdur — persistence
qatının miqyaslandırılmış standart backoff-u tətbiq edilir) çatır. `#10334`-dən
bəri `ProviderErrorRuleMatch` daxilindəki `scope` başdan sona İSTİFADƏ OLUNUR,
lakin **yalnız** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-ində olan
provayderlər üçün (`providerErrorRules.ts` — hazırda yalnız `"agentrouter"`,
`honorsRuleLockScope()` vasitəsilə şərtləndirilir). Bütün digər provayderlər
üçün `scope`, `#10334`-dən əvvəl olduğu kimi, məlumat xarakteri daşıyır.
`checkFallbackError` uyğun gələn qaydanın scope dəyərini
`fallbackResult.ruleScope` kimi üzə çıxarır;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) `ruleScope` dəyərinin bağlantı səviyyəsində və
öz-özünə bərpa olunan siqnal kimi həqiqətən təhlükəsiz tətbiq edilə biləcəyini
təsdiqləyən ümumi qoruyucudur (scope `"connection"`, reason `quota_exhausted`,
heç vaxt `permanent` deyil, heç vaxt `creditsExhausted` deyil — gələcəkdə
`"connection"` scope-unu daimi hesab vəziyyəti ilə qoşa biləcək qaydaya qarşı
müdafiədir). İki istehlakçı onu çağırır:

- **Persistensiya** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider **model üzrə** bloklama budağına düşmək əvəzinə
  (agentrouter `passthroughModels: true` → `hasPerModelQuota()`
  `true` qaytarır), **müvəqqəti bağlantı soyutması** tətbiq edir —
  `testStatus: "unavailable"` + `rateLimitedUntil`, heç vaxt terminal status
  (`credits_exhausted`/`banned`/`expired`) tətbiq etmir — beləliklə bağlantı
  əl ilə credential sıfırlaması tələb etmək əvəzinə soyutma müddəti bitdikdən
  sonra öz-özünə bərpa olunur.
  `disableCooling: true` olan bağlantılar üçün ötürülür (#2997): bu imtina
  seçimi əvəzinə model üzrə bloklamaya düşür (sənədləşdirilmiş güzəştdir —
  budağın yuxarısındakı kod şərhinə baxın).
- **Eyni sorğuda combo marşrutlaşdırması** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): eyni qoruyucu mexanizm
  bağlantını yaddaşdaxili `exhaustedConnections` dəstinə,
  `${provider}:${connectionId}` açarı ilə əlavə edir. Bu, yalnız
  _öz target obyektində artıq həmin dəqiq `connectionId`-ni daşıyan_ qalan
  SAME-REQUEST target-ını ötürür
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections`
  axtarışından əvvəlki `if (provider &&
connectionId)`) — adi model-siyahısı combo-sunda qardaş target-lar
  özlərinə aid sabit `connectionId` daşımır və onlardan biri yalnız hər
  dispatch zamanı cavabın
  `X-OmniRoute-Selected-Connection-Id` başlığından həll olunur; buna görə
  həmin açar uyğunluğu heç vaxt baş vermir. Bu ümumi halda qalan bir
  mərhələnin yenicə tükənmiş hesabı yenidən istifadə etməsinə qarşı real
  qoruma bu Set deyil — yuxarıdakı persistensiya qatıdır (bağlantının
  `rateLimitedUntil` dəyəri artıq gələcək zamandadır) və bununla birlikdə
  eyni qoruyucu mexanizmin uğursuzluq üçün `transientRateLimitedProviders`
  dəyərini sıxışdırmasıdır (bax: “İki mərhələli dizayn” və
  `targetExhaustion.ts` faylındakı
  `isAgentrouterConnectionQuotaScope` budağının kod şərhi): Set işarələnmədən
  qaldığı üçün `combo.ts`-dəki `allowRateLimitedConnection` məcburi icazəsi
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provider-in qalan
  mərhələləri üçün işə düşmür; buna görə credential seçiminin
  `rateLimitedUntil` filtri (`src/sse/services/auth.ts:1238`) normal qaydada
  tətbiq olunur və qalan mərhələ ya başqa, hələ uyğun olan agentrouter
  bağlantısını seçir, ya da mövcud credential olmadığını bildirərək uğursuz
  olur — bu budaq tərəfindən yenicə soyudulmuş bağlantıya zorla qayıtmır.

### İki mərhələli dizayn: statusun yenidən ifadəsi, sonra təsnifat

Statusun yenidən ifadəsi (`upstreamStatusRestatement.ts`) və provider
təsnifat qaydaları (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) hər ikisi provider identifikatoru və mətn
markerləri əsasında işləyən, lakin müxtəlif yerlərdə icra olunan və
müxtəlif məqsədlərə xidmət edən ayrı reyestrlərdir: yenidən ifadə etmə
HTTP statusunu erkən mərhələdə `chatCore.ts` daxilində yenidən yazır;
təsnifat qaydaları isə `checkFallbackError()` daxilində ehtiyat
`reason` dəyərini və bloklama `scope`-unu
(`model` / `provider` / `connection`) seçir
(`open-sse/services/accountFallback.ts`).

Təsnifat qaydaları tam xəta **mətnini** ( `额度不足` kimi body
marker-lərini uyğunlaşdırmaq üçün tələb olunur) yalnız
`providerErrorRules.ts` faylındakı `FULL_TEXT_RULE_PROVIDERS`
icazə siyahısında göstərilən provider-lər üçün görür — hazırda yalnız
`"agentrouter"`. Digər bütün **daxili kataloq** provider-ləri üçün
`checkFallbackError`, `getProviderErrorRuleMatch` funksiyasına yalnız
strukturlaşdırılmış xətanı (`{code, type}`) ötürür; bu, başlıq/status/code
əsaslı qaydalar üçün kifayətdir, lakin body mətn marker-lərini görə bilmir.
`resolveRuleMatchBody()` köməkçi funksiyası bu seçimi həyata keçirir:
icazə siyahısındakı provider-lər üçün tam xəta mətni, digər hallarda isə
strukturlaşdırılmış xəta. **Daxili** provider-i
`FULL_TEXT_RULE_PROVIDERS` siyahısına əlavə etmək açıq provider üzrə
qoşulmadır — bu siyahıda olmayan hər provider üçün standart yolun
bayt-bayt dəyişməz qalmasını təmin etmək üçün mövcuddur.

Qaydanın `scope`-u (`model` / `provider` / `connection`),
`FULL_TEXT_RULE_PROVIDERS`-dan ayrıca qoşulan seçimdir:
`checkFallbackError` onu yalnız `fallbackResult.ruleScope` kimi təqdim edir
və sonrakı istifadəçilər onu informativ etiketdən başqa hər hansı formada
yalnız eyni fayldakı `HONORS_RULE_LOCK_SCOPE_PROVIDERS` icazə siyahısında
olan provider-lər üçün nəzərə alır (`honorsRuleLockScope()` vasitəsilə
məhdudlaşdırılır — hazırda yalnız `"agentrouter"`). Provider bu icazə
siyahısına daxil olduqdan sonra `scope: "connection"` uyğunluğunun
praktik olaraq nə etdiyini öyrənmək üçün yuxarıdakı “Yenidən ifadə edilmiş
kvota xətaları” bölməsinə baxın.

**#11104 — operator tərəfindən elan edilən qaydalar hər iki icazə
siyahısını keçə bilər.** Operator bu faylı dəyişmədən, icra zamanı
`settings.providerErrorRules` vasitəsilə provider üzrə qayda elan edə bilər
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`).
Operator qaydasını **standart** daxili kataloq qaydalarının davranışını
qorumaq üçün nəzərdə tutulan `FULL_TEXT_RULE_PROVIDERS`/
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` icazə siyahıları ilə məhdudlaşdırmaq,
elan edilən qayda artıq operatorun açıq seçimi olduğuna görə siyahılarda
artıq göstərilənlərdən başqa bütün provider-lər üçün settings mexanizmini
işləməz vəziyyətə gətirərdi. `resolveRuleMatchBody()` və
`honorsRuleLockScope()` əvvəlcə `hasOperatorRuleForProvider()` yoxlayır:
operator qaydası olan provider, digər icazə siyahılarından hər hansı birində
olub-olmamasından asılı olmayaraq xam xəta mətnini alır və elan edilmiş
`scope` dəyərinə əməl edilir.

**Operator tərəfindən elan edilən qaydalar** (`OperatorProviderErrorRule`):
hər qaydada ixtiyari `status` və ixtiyari `match` (xəta mətnində böyük-kiçik
hərfə həssas olmayan sadə alt sətir; heç vaxt RegExp deyil, buna görə ReDoS-a
səbəb ola bilməz) olur və bu ikisindən ən azı biri təyin edilməlidir. Hər
ikisi təyin edildikdə onlar AND məntiqi ilə birləşdirilir; buraxılmış sahə
istənilən dəyərlə uyğunlaşır, buna görə `{match: "insufficient_quota"}`
həmin kodu daşıyan istənilən statusla uyğunlaşır. İlk uyğun gələn qayda
qalib olur. `cooldownMs` ən çox 30 gün qəbul edir; ümumilikdə ən çox 50
qaydaya icazə verilir.

**Bütün halları əhatə edən standartlar** (`settings.providerErrorDefaults`, seçimə bağlıdır, `setOperatorProviderErrorDefaults` vasitəsilə təyin edilir): `{[provider]: {cooldownMs, scope?, reason?}}`
`cooldownMs` 1 dəqiqədən 30 günə qədər ola bilər. Standart yalnız heç bir operator qaydası və daxili kataloq qaydası uyğun gəlmədikdə, həmçinin yalnız 402, 403, 408, 429 və 5xx xətaları üçün tətbiq olunur. Sorğu forması xətaları (400, 404, 409, 413, 422) və ayrıca 401 xətaları öz emal qaydalarını saxlayır. Aşkar `reason` olmadıqda, səbəb statusdan götürülür və `classifyError` funksiyasındakı ilə eyni qaydada müəyyən edilir. Standart elan etmək `hasOperatorRuleForProvider()` üçün operator qaydası hesab olunur; buna görə onun `scope`-u (standart olaraq `"connection"`) nəzərə alınır. Standartın effektiv gözləmə müddəti onun `cooldownMs` dəyəri ilə provayderin öz təkrar cəhd göstərişindən (`Retry-After`, `x-ratelimit-reset` və ya cavab mətnindəki sıfırlama göstərişi — bağlantı üzrə gözləmə parametri olan "upstream retry hints istifadə et" aktiv olduqda mühərrikin nəzərə aldığı göstərişlə eyni) daha uzun olanıdır. Beləliklə, standart qısa upstream göstərişini uzada bilər, lakin real sıfırlama müddətini heç vaxt qısalda bilməz. Aşkar operator qaydası öz dəqiq `cooldownMs` dəyərini saxlayır. Nə qayda, nə də standart `markAccountUnavailable` daxilindəki bağlantı üzrə gözləmə qoruyucularını keçmir: aktiv və daha uzun gözləmə müddəti heç vaxt qısaldılmır və terminal status heç vaxt üzərinə yazılmır. `checkFallbackError` daxilində daha əvvəl işləyən daxili mətn detektorları (kreditlərin tükənməsi, gündəlik kvota, hesabın deaktiv edilməsi) öz ifadələri üçün yenə üstünlük təşkil edir.

**Məlum boşluq — `providerRuleRegistry` HTTP 400 üçün heç vaxt yoxlanılmır.**
`checkFallbackError` funksiyasının `BAD_REQUEST` qolu status 400-ü tamamilə öz pattern massivləri (`accountFallback.ts` daxilindəki `MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` və s.) vasitəsilə təsnif edir və yuxarıdakı `configuredRule`/`getProviderErrorRuleMatch` qoluna çatmadan geri qayıdır. `status: 400` olan daxili kataloq qaydası (və ya operator qaydası) sintaktik baxımdan düzgündür, lakin heç vaxt işləməyəcək. Hazırda mövcud qaydaların heç biri 400 statusunu hədəfləmir, buna görə istehsal mühitində heç nəyə təsir edilmir — lakin gələcəkdə 400 qaydası əlavə etmək üçün əvvəlcə bu qola dəyişiklik edilməlidir. Bu, qayda əlavə etməkdən daha böyük dəyişiklikdir, çünki pattern massivlərinin davranışına artıq əsaslanan hər bir provayder üçün 400-ün təsnifatını dəyişir və tək provayder qaydasının əlavə edilməsi çərçivəsindən kənardadır.

### Yeni kvotanı yanlış göstərən gateway əlavə etmək

1. `statusRestatementRegistry` daxilində bir qayda massivi qeydiyyatdan keçirin
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` provayderə xas saxlanılmalıdır; `CREDITS_EXHAUSTED_SIGNALS` ilə (`open-sse/services/accountFallback.ts`) toqquşan ümumi ingiliscə ifadələri heç vaxt təkrar istifadə etməyin.
2. Düzgün bloklama əhatə dairəsini seçmək üçün təsnifat qaydalarını istəyə bağlı olaraq
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) daxilində qeydiyyatdan keçirin (`connection` hesab üzrə ümumi kvota, `model` isə model üzrə xətalar üçün). Bu addım istehsal mühitində yalnız qaydaları tam xəta mətninə (cavab mətninin markerlərinə) ehtiyac duyan provayderlər üçün təsirli olur: provayder identifikatorunu eyni fayldakı `FULL_TEXT_RULE_PROVIDERS` siyahısına əlavə edin — əks halda `checkFallbackError` qaydaya yalnız strukturlaşdırılmış `{code, type}` xətasını ötürür və cavab mətni qaydası real trafiki heç vaxt uyğunlaşdırmır.
   Yalnız `status`/`headers` əsasında uyğunlaşan qaydaların (Opencode və Minimax qaydaları kimi) bu seçimə ehtiyacı yoxdur. Bundan əlavə, qayda `scope: "connection"` elan edirsə və məqsəd yalnız məlumat xarakterli etiket deyil, həqiqi bağlantı üzrə ümumi gözləmə və eyni sorğuda combo keçidinin buraxılmasıdırsa, provayder identifikatorunu eyni fayldakı `HONORS_RULE_LOCK_SCOPE_PROVIDERS` siyahısına əlavə edin — bu, `markAccountUnavailable()` (`src/sse/services/auth.ts`) daxilində `isAgentrouterConnectionQuotaScope()` tipli istifadəyə və `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) tətbiqinə nəzarət edir; bu siyahıya əlavə edilmədikdə `scope` yenə `fallbackResult.ruleScope` vasitəsilə ötürülür, lakin heç bir əməliyyat həyata keçirilmir.
3. `tests/unit/upstream-status-restatement.test.ts` və `tests/unit/agentrouter-error-rules.test.ts` fayllarındakı testlərə uyğun olaraq unit testlər əlavə edin (buraya `not-permanent` / `not-creditsExhausted` qoruyucuları və — provayderin allowlist-ə ehtiyacı varsa — `resolveRuleMatchBody()` funksiyasının tam mətni yalnız həmin provayder üçün qaytardığını təsdiqləyən test də daxildir).

`chatCore.ts`, `classifyError` və ya combo üçün heç bir dəyişiklik lazım deyil.

#### Egress-buketli bloklama (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` siyahısındakı provayderlər (opencode ailəsi) IP-buketli upstream kimi qəbul edilir (opencode-un pulsuz səviyyəsi hesab üzrə deyil, IP üzrə buketlənir — #9611-ə baxın): `quota_exhausted`
**və ya** `rate_limit_exceeded` kimi təsnif edilən 429 statusu, rotasiya onları sınamazdan əvvəl son məlum egress IP-si xəta baş verən bağlantının IP-si ilə uyğun gələn allowlist-dəki ailəyə aid hər bir bağlantını gözləmə vəziyyətinə keçirir
— beləliklə, əvvəlcədən uğursuz olacağı məlum olan N-1 upstream çağırışının qarşısı alınır (#10460/#10525 ilə eyni yanaşma).
`rate_limit_exceeded` qəsdən daxil edilib: `markAccountUnavailable` yolunda opencode-a xas qaydalar heç vaxt uyğun gəlmir (`checkFallbackError` funksiyasına başlıqlar/cavab mətni ötürülmür, opencode `FULL_TEXT_RULE_PROVIDERS` siyahısında deyil). Buna görə cavab mətnində abunəlik kvotası ifadəsi ("monthly usage limit reached") olan 429, `status_429` qaydasına çatmazdan əvvəl kvota mətni üzrə fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 saatlıq gözləmə) tərəfindən `quota_exhausted` kimi təsnif edilir — kvota mətni olmayan 429 (adi rate limiting) isə `status_429` qaydası vasitəsilə `rate_limit_exceeded` kimi təsnif edilir və yenə də IP ailəsini gözləmə vəziyyətinə keçirir. Allowlist-dəki provayder üçün IP-buketli rate limit tükənmiş kvota ilə eyni siqnaldır. Əsas məhdudiyyətlər:

- **Ən yaxşı səy**: lock `proxy_logs`-dan (24 saatlıq pəncərə, sinxron, keşsiz) bağlantının son məlum `egress_ip` ünvanını müəyyənləşdirir. Soyuq keş (`egress_ip` heç vaxt yoxlanılmayıb) və ya sətir yoxdursa → uğursuz bağlantı yenə də budaq tərəfindən soyudulur (bugünkü kimi qeyd edilir), sadəcə heç bir qardaş bağlantı kilidlənmir.
- **Heç vaxt terminal deyil**: soyutma yenilənən kvota pəncərəsidir
  (`testStatus: "unavailable"`); daimi vəziyyət heç vaxt IP səviyyəli siqnaldan
  törədilmir. `disableCooling` bağlantıları budağı tamamilə ötürür.
- **İcazə verilən ailə üçün kilidləmə qranulyarlığı dəyişir**: bu, yalnız qardaş optimallaşdırması deyil, əhatə dairəsi dəyişikliyidir. opencode `passthroughModels` provayderidir, buna görə bu budaqdan əvvəl 429 model üzrə kilidlənməyə səbəb olurdu; indi isə qardaşı ümumiyyətlə olmayan tək bağlantı ilə işləyən operator üçün belə, bağlantının soyudulmasına səbəb olur. Bu, opencode qayda cədvəlinin artıq düzgün elan etdiyi qranulyarlıqdır (`scope: "connection"`,
  `providerErrorRules.ts`); indiyədək isə opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` daxilində olmadığı üçün buna heç vaxt əməl
  edilməyib. Budaq uğursuz bağlantının soyutmasını və `backoffLevel` dəyərini
  agentrouter-un bağlantı əhatəli budağını təqlid edərək özü yazır və geri qayıdır — model üzrə bloklama və aşağıdakı ümumi yol heç vaxt işə düşmür.
- **Kombo da daxildir**: agentrouter budağında olduğu kimi, əhatə dairəsi kombonun çağıran tərəfinin 429 üçün tətbiq etdiyi `persistUnavailableState`/`isCombo` zəiflətməsini qəsdən nəzərə almır. Model üzrə kilidlənmə bu əhatə dairəsinin daha zəif forması deyil, yanlış vahididir: tükənmiş IP barədə heç nə demir və buna görə kombo rotasiyası hər qardaş üçün mütləq uğursuz olacaq bir çağırışı sərf etməyə davam edərdi.
- **Qardaş təhlükəsizliyi**: artıq terminal vəziyyətdə olan (banned/credits_exhausted) və ya daha uzun soyutma müddətində olan qardaşın üzərinə heç vaxt yazılmır.
- **Eksklüziv icazə siyahısı**: `EGRESS_BUCKETED_LOCK_PROVIDERS` siyahısının genişləndirilməsi açıq sahib qərarıdır; ümumi qoşulma yoxdur (pattern #10334/#10419). Qardaş sorğusu həmin icazə siyahısını SQL literalı kimi təkrarlamaq əvəzinə ona bağlanır, buna görə siyahının genişləndirilməsi bir sətirlik dəyişiklik olaraq qalır.
- **Egress IP rotasiyası, hər iki istiqamətdə**: axtarış pəncərəsi (24 saat) egress-IP keşinin TTL-indən (5 dəqiqə) xeyli genişdir, buna görə “son məlum IP” cari vəziyyət deyil, tarixçəyə əsaslanır. Bağlantının proksisi həmin pəncərə ərzində rotasiya edibsə, kilid həqiqətən paylaşılmış IP-ni **qaçıra** bilər (qeyd edilmiş IP yeni, tükənməmiş IP-dir) — və simmetrik olaraq, tükənmiş IP-dən sonra rotasiya etmiş qardaşı da **soyuda** bilər. İkinci hal həmin qardaşa bir soyutma pəncərəsinə başa gəlir; hər ikisi tarixçəyə əsaslanan axtarışın qəbul edilən ən yaxşı səy məhdudiyyətləridir.
- **Maya dəyəri**: yalnız 429 tezliyində `proxy_logs` cədvəlində iki məhdud skan (pəncərə `idx_pl_timestamp` vasitəsilə filtrlənir). Yeni indeks yoxdur (miqrasiya 134 YAGNI). Orta ölçülü, real trafikə malik verilənlər bazası nüsxəsində ölçülüb; yüksək ötürmə qabiliyyətli instans eyni pəncərədə mütənasib olaraq daha çox sətir saxlayır.

## Digər Dözümlülük Xüsusiyyətləri

- **22 marşrutlaşdırma strategiyası** (prioritet, ağırlıqlı, dairəvi sistem, kontekst-rele, birinci doldur, p2c, təsadüfi, ən az istifadə edilən, xərc optimallaşdırılmış, sıfırlanaraq xəbərdar olan, sıfırlama-pəncərə, ilk istifadə müddəti, boşluq, kvota ilə ölçülmüş, ciddi-təsadüfi, avtomatik, lkgp, kontekst-optimallaşdırılmış, jest-optimallaşdırılmış, keşiş-optimallaşdırılmış, cache-optimallaşdırılmış) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md)
- **Yenidən qurulan marşrutlaşdırma** (v3.8.0) — keçidləri kvota sıfırlama vaxtı ilə prioritetləşdirir.
- **Fon rejiminin pozulması** — Cavabları API `background: true` xəbərdarlıqla sinxronlaşdırılmaq üçün pisləşdi.
- **Dinamik alət limitinin aşkarlanması** — alətlərin sayı limitlərinə çatdıqda provayderləri geri götürür.
- **Təcili dönüş** — `OMNIROUTE_EMERGENCY_FALLBACK` tərəfindən idarə olunur; operatorlar onu yenidən başlatmadan Xüsusiyyət Bayraqları səhifəsindən ləğv edə bilər.

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
