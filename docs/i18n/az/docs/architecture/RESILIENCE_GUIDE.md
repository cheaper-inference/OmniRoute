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

## 2. Bağlantı soyutlaması

**Əhatə dairəsi:** tək provayder bağlantısı/hesabı/açarı.

**Məqsəd:** eyni provayder üçün digər bağlantılar xidmət göstərməyə davam edərkən işləməyən bir açarı ötürmək.

**Tətbiq:**

- Əlçatmaz kimi işarələ: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seçim: eyni fayldakı `getProviderCredentials*`
- Soyutlama hesablanması: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Parametrlər: `src/lib/resilience/settings.ts`

**Hər bağlantı üçün sahələr:**

- `rateLimitedUntil` — soyutlamanın başa çatdığı vaxt damğası
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponensial soyutlama sayğacı

**Standart soyutlama müddətləri:**

- OAuth bazası: 5s
- API açarı bazası: 3s
- API açarı 429: upstream `Retry-After`/sıfırlama başlıqlarına/parse edilə bilən sıfırlama mətninə üstünlük verir
- Geri çəkilmə: `baseCooldownMs * 2 ** failureIndex`

**Provayder üzrə yenidən cəhd gecikməsi.** Provayder təfərrüatları səhifəsində **Retry delay** seçimi (Auto,
15s-dən 1h-dək) var. Bu seçim `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
sahəsini (`PATCH /api/resilience` vasitəsilə 1–21600) yadda saxlayır. Rate-limit xətası upstream yenidən cəhd
işarəsi daşımadıqda, həmin dəyər provayder üçün miqyaslandırılmış geri çəkilməni əvəz edir və
`backoffLevel` dəyərini 0-a sıfırlayır (`open-sse/services/rotationConfig.ts::overrideFor`). Rate-limit xətası üçün
üstünlük sırası (ən yüksəkdən başlayaraq): upstream yenidən cəhd işarəsi, sonra bağlantıya xas
`providerSpecificData.rotationOverrides.rateLimitResetSeconds`, sonra provayder üzrə yenidən cəhd gecikməsi,
sonra `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` mühit dəyişəni, daha sonra isə miqyaslandırılmış geri çəkilmədir.
Auto sahəni silir. Bu yalnız rate-limit səbəbinə təsir edir, heç vaxt terminal vəziyyətlərə təsir etmir.

**Anti-thundering-herd qoruması:** eyni vaxtda baş verən xətaların soyutmanı həddindən artıq uzatmasının və
`backoffLevel` dəyərinin iki dəfə artırılmasının qarşısını alır.

**Concurrency-limit 429-ları geri çəkilmə pilləsində yüksəlmir.** Gövdəsi
concurrency limitini bildirən ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) `429` hesabın sağlam, lakin məşğul olması deməkdir.
`checkFallbackError()` `concurrency_limited` səbəbini qaytarır: dərhal növbəti bağlantıya keçin, bu bağlantını sabit
`CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) müddətinə və ya upstream yenidən cəhd işarəsinə qədər soyudun,
`backoffLevel` dəyərini dəyişmədən saxlayın və `skipProviderBreaker` təyin edin.
Açıq quota gövdəsi yenə də üstün sayılır, buna görə quota nümunəsinə də uyğun gələn gövdə quota hökmü olaraq qalır.
Aşkarlama: `src/shared/utils/classify429.ts` daxilində `looksLikeConcurrencyLimit()`;
hökm: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (breaker-in
`FailureKind` dəyəri) dəyişməz qalır və bu gövdələr üçün hələ də `rate_limit` oxuyur.

**Axın məzmununun dayanması hesabı soyutmur.** Məzmun dayanması nəzarətçisi
(`open-sse/utils/streamHandler.ts`) vaxtında heç bir model çıxışı göndərməyən axından imtina etdikdə,
`markAccountUnavailable()` xətanı bağlantıda qeyd edir, lakin soyutma təyin etmir: dayanma həmin sorğuya aiddir və
ən çox ehtimal olunan səbəb hələ çıxış verməyən uzun düşünmə növbəsidir. Operatorlar
`resilienceSettings.streamStallCooldown.enabled` (standart olaraq `false`) vasitəsilə bu davranışı könüllü aktivləşdirə bilərlər.

**`p2c` hesab seçimi üçün könüllü gecikmə siqnalı.** Göndərilən hər cəhd hər bağlantı (həmçinin bağlantı + model)
üzrə ilk bayta qədər olan vaxtı və nəticəni yaddaşdaxili sürüşən pəncərədə qeyd edir: son 15 dəqiqə ərzində
son 20 nümunə (`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts` daxilində
`safeLogEvents()` tərəfindən qeyd olunur). `resilienceSettings.p2cLatency.weight` `0`-dan yuxarı olduqda
(aralıq 0-20, standart `0` = deaktiv), `src/sse/services/auth.ts` daxilində
`compareP2CConnections()` cütlükdəki hər namizədə `weight`-ə qədər xal əlavə edir. Bunun yarısı daha sürətli namizədə
nisbət kimi gecikmədən gəlir (iki dəfə yavaş olmaq tam yarını alır), digər yarısı isə sürüşən xəta dərəcəsindən gəlir.
Bu termin yalnız hər iki namizədin ən azı 3 nümunəsi olduqda tətbiq edilir; beləliklə yeni hesablar cəzalandırılmır və
onun maksimumu quota ilə bloklanmış və quota-sı tükənmiş namizədlər üçün cəzalardan aşağı olaraq qalır.
Bu, özünəməxsus circuit yaratmır: xətalı hesablar hələ də soyutma, kilidləmə və breaker qatları tərəfindən idarə olunur.
Bunu `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` ilə təyin edin.

**Reasoning çərçivələri məzmun dayanması büdcəsini yenidən başladır.** Reasoning modeli ilk görünən tokenindən əvvəl
dəqiqələrlə düşünə bilər: Claude düşünmə mətni boş ola bilən `thinking_delta` çərçivələrini axınla göndərir və
Responses API bir-birinin ardınca reasoning elementləri göndərir. `isReasoningProgressFrame()`
(`open-sse/utils/streamReadiness.ts`) bu çərçivələri tanıyır və nəzarətçi növbəni ləğv etmək əvəzinə
hər birində öz büdcəsini yenidən başladır. Bunlar hələ də model çıxışı deyil; buna görə yalnız reasoning ilə
başa çatan növbə yenə də boş kimi bildirilir, reasoning dayandıqdan sonra yalnız heartbeat göndərən növbə isə
nəzarətçini yenə işə salır.

Kiro-nun boş olmayan imzaya malik ikili `reasoningContentEvent` çərçivələri bu reasoning fəaliyyətini executor
vasitəsilə boş `reasoning_content` delta-sı kimi qoruyur. İmza ötürülmür. Metadata, natamam çərçivələr və boş
imzalar məzmun büdcəsini yenidən başlatmır; müstəqil aktiv axın vaxt limiti və müştəri ləğvi yenə də tətbiq olunur
(`open-sse/executors/kiro/reasoning.ts`).

**Terminal vəziyyətlər (soyutma DEYİL):**

- `banned` — qadağan olunmuş açar söz / hesab qadağası aşkarlanması ilə təyin edilir (bax: [BAN_DETECTION](../security/BAN_DETECTION.md)). Upstream sorğu üzrə imtinalar (`request_rejected`, məsələn Anthropic OAuth 403 "Request not allowed") bunu heç vaxt təyin etmir: onlar bağlantı və model üzrə hesablanır və böyüyən soyutma ilə həmin modeli rotasiyadan çıxarır; bu soyutma `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) ilə məhdudlaşır və ya model məlum olmadıqda bağlantını soyudur — `open-sse/services/requestRejectedStreak.ts`
- `expired` (məhdud sayda yenidən cəhddən sonra terminal vəziyyətə keçir — eksponensial geri çəkilmə ilə `EXPIRED_RETRY_MAX = 3`; beləliklə müvəqqəti OAuth xətaları hesab həmişəlik deaktiv edilməzdən əvvəl öz-özünə bərpa oluna bilər)
- `credits_exhausted`

Bunlar etimadnamələr dəyişdirilənə və ya operator onları sıfırlayana qədər qalır. Terminal vəziyyətlərini müvəqqəti soyuma vəziyyəti ilə əvəzləməyin.

**Tənbəl bərpa:** `rateLimitedUntil` keçmişdirsə, bağlantı yenidən uyğun vəziyyətə gəlir. Uğurlu istifadədən sonra `clearAccountError()` bütün xəta sahələrini təmizləyir.

### Claude OAuth istifadə limiti: aşağı prioritetli zolaq + sessiya limiti sıfırlaması

**Əhatə dairəsi:** bir Claude abunəliyi (OAuth) bağlantısı. Hər iki funksiya **bağlantı üzrə ayrıca aktivləşdirilir** (Edit connection → Claude bölməsi → `providerSpecificData` daxilində `lowPriorityMode` / `autoLimitReset`; hər ikisi standart olaraq söndürülüb) və Claude Code-un `/low-priority` və `/limit-reset` əmrlərini əks etdirir (wire contract Claude Code 2.1.263-dən götürülüb).

**İcra:**

- Vəziyyət maşını + cavabların təsnifatı: `open-sse/services/claudeLowPriority.ts`
- Sıfırlama statusu/iddia klienti: `open-sse/services/claudeLimitReset.ts`
- İcraçı hook-u (başlıq əlavə edilməsi + eyni hesabla yenidən cəhd): `open-sse/executors/base.ts::execute()`
- Aktivləşdirmənin saxlanması: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Tətikləyici:** 5 saatlıq istifadə limiti — başlıqlarında
`anthropic-ratelimit-unified-status: rejected` və hesab uyğun olduqda
`anthropic-ratelimit-unified-slow-offer: treatment` daşıyan `429`. İlk limit divarındakı
429-dan əvvəl heç nə göndərilmir; vahid başlıqlar olmadan baş verən partlayış tipli 429 normal soyuma yoluna keçir.

**Aşağı prioritetli zolaq** (`lowPriorityMode`):

- Limit divarındakı 429 zamanı icraçı təklifi qəbul edir və dərhal **eyni**
  hesabla `anthropic-usage-limit: slow` başlığı ilə yenidən cəhd edir; elan edilmiş
  `anthropic-ratelimit-unified-reset` (+60 saniyə güzəşt) vaxtına qədər zolaq aktiv qalır
  və həmin müddətdə hər sorğu bu başlığı daşıyır. Tutulan 429 `handleChatCore`-a heç vaxt
  çatmır, buna görə bağlantı **soyuma vəziyyətinə keçirilməyir** və başqa bağlantıya dəyişdirilmir.
- Sonrakı cavablardakı `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  zolağı saxlayır; `slot_busy` (429) və ya `529` serverin
  `anthropic-ratelimit-unified-slow-retry-after` dəyərini gözləyir (standart 20 saniyə,
  5–600 saniyə aralığında məhdudlaşdırılır, ±30% təsadüfi dəyişmə ilə) və yenidən cəhd edir.
  Bu proses `anthropic-ratelimit-unified-slow-max-wait` ilə məhdudlaşdırılır (standart 20 dəqiqə,
  1 dəqiqə–6 saat aralığında məhdudlaşdırılır) — bu müddət keçdikdə zolaq başa çatır və
  yenidən qəbul edilməni 10 dəqiqəlik soyuma müddəti bloklayır. Gözləmə, sorğunun öz
  upstream-start timeout müddətində qalan vaxtla da məhdudlaşdırılır
  (`resolveFetchStartTimeout`, standart olaraq 10 dəqiqə) və bundan 5 saniyə çıxılır:
  bu məhdudiyyət olmasaydı, standart 20 dəqiqəlik max-wait sorğunun müddətini aşar və yuxu
  müddəti gözləmə ortasında dayandırılaraq uğurlu `max_wait` sonu + soyuma əvəzinə
  `TimeoutError` üzə çıxardı.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 saatlıq pəncərənin
  dəyişməsi və ya `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`
  (ödənişli artıq istifadə artıq limiti qarşıladığı üçün bunu istənilən statusda
  `extra_usage` kimi başa çatdırır) zolağı bitirir; bundan sonra cavab normal soyuma yoluna
  keçir. `budget_exhausted` elan edilmiş büdcə sıfırlanmasına qədər (≤ 8 gün) yadda saxlanılır.
- Limit divarı yoxlaması icraçının öz 400 səbəbli cəhd daxilindəki yenidən cəhdlərindən
  (kontekstin redaktəsi, düşünmə/effort məhdudiyyətləri, parametrin avtomatik öyrənilməsi)
  sonra icra olunur; buna görə yalnız bu yenidən cəhdlərdən birində üzə çıxan limit divarı
  429-u da soyuma yoluna çatmadan tutulur.
- Vəziyyət hər bağlantı üzrə yaddaşda saxlanılır (yenidən başlatma yenidən qəbul üçün
  əlavə bir limit divarı 429-u tələb edir).

**Sessiya limitinin sıfırlanması** (`autoLimitReset`, hər ikisi aktiv olduqda zolaqdan əvvəl sınanır):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  bloku; `arm: "reset"` və `available: true` olduqda,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` sorğusu
  `{ "program": "juniper_tide" }` gövdəsi ilə göndərilir (`providerSpecificData.organizationUUID`
  daxilindəki təşkilat UUID-si, bootstrap ehtiyat variantı).
- `result: reset|not_limited` → sorğu tam sürətlə (slow başlığı olmadan) yenidən icra edilir.
  `already_used` / `not_offered` `next_available_at` dəyərini yadda saxlayır (standart olaraq
  bir həftə); istənilən xəta 15 dəqiqəlik geriçəkilmə tətbiq edir. Sıfırlama həftədə bir dəfə
  mümkündür və yenə də həftəlik limitə daxil edilir.

Reqressiya qoruyucuları: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Banklaşdırılmış sıfırlamaları avtomatik tətbiq edin

**Əhatə dairəsi:** Codex və Claude abunə (OAuth) əlaqələri.**Daxil olun** : `bankedResetAutoApply` parametri defolt olaraq söndürülüb və `dry-run` rejimindədir (Parametrlər → AI → Banklaşdırılmış sıfırlamaları avtomatik tətbiq edin).

**Məqsəd:** operatorun Provayder Limitləri səhifəsində "Geri Al" düyməsini basmasını gözləmək əvəzinə, hesab istifadə divarına dəyəndə banklaşdırılmış sıfırlamaları özbaşına xərcləyin.

| Kredit növü (`creditTypes`) | Nə geri alınır                                            | Harada qaçır                                            |
| --------------------------- | --------------------------------------------------------- | ------------------------------------------------------- |
| `codexCredits`              | Codex kreditlərini sıfırladı                              | fon işi, hər 60 s                                       |
| `claudeCredits`             | Claude bank qrantları (`GRANT` kreditləri)                | fon işi, hər 60 s                                       |
| `claudeSessionReset`        | Claude həftəlik sessiya limitinin sıfırlanması (yuxarıda) | hər hesab keçidi ilə eyni siyasət vasitəsilə sorğu yolu |

**İcra:**

- Təmiz qərar (hər iki yol üçün müəyyən edilmiş bir qayda): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Əsas iş: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` də başlamışdır)
- Claude sorğu yolu qapısı: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts`-də `setClaudeLimitResetPolicy()` vasitəsilə qeydiyyatdan keçmişdir
- Tarix, qapaqlar və webhook: `src/lib/usage/bankedResetAudit.ts`
- Tarix API: `GET /api/settings/banked-reset-auto/history?limit=50` (idarəetmə auth)

**Qərar əmri** (birinci uğursuz qayda qeydə alınmış səbəbdir):

1. Xüsusiyyət deaktivdir, kredit növü deaktivdir və ya hesab əhatə dairəsindən kənardır (`accountScope` `all` / `selected` və hər hesab üçün `connections` xəritəsi).
2. Əlavə UTC cədvəlindən kənarda (`startHourUtc` > `endHourUtc` gecə yarısını keçir).
3. Son 24 saat ərzində məhdudiyyətlər: `maxPerAccountPerDay` (1), `maxPerDay` (3) və `minSpacingMinutes` (30) istənilən iki ödəniş arasında.
4. Tətik: divarlı `session` və ya `weekly` pəncərəsi ( `getQuotaWindowStatus().reachedThreshold` dən oxunur, `isAccountQuotaExhausted()` deyil, yalnız xərclənmiş hər pəncərə ilə hesab haqqında məlumat verir) və ya ən azı `expiringCreditMinUsedPercent` (50) istifadə etmiş hesabda `expiringCreditHours` (24) daxilində müddəti bitən kredit.
5. Təbii sıfırlama qoruyucusu: divarlı 5 saatlıq pəncərə `sessionResetGuardMinutes` (90) daxilində və ya `weeklyResetGuardHours` daxilində divarlı həftəlik pəncərə (12) sıfırlandıqda keçin.
6. Həftəlik mərtəbə: həftəlik qalan `weeklyFloorPercent` (10) aşağı olduqda 5 saatlıq sıfırlamağa keçin.
7. `last-resort` rejimi: hər iki pəncərədə eyni provayderin digər əhatə dairəsi hesabında ən azı `poolHeadroomPercent` (10) qaldıqda keçin. Müddəti bitən kredit tətikləri bundan yan keçir.
8. `dry-run` sıra qeyd edir və heç nə geri qaytarmır; `last-resort` və `eager` geri qaytarılır.

Çatışmayan kvota datası heç vaxt geri ödəməni açmır: naməlum sıfırlama vaxtı və ya həftəlik istifadə atlanır.

**Claude sessiyasının sıfırlanması:** xüsusiyyət söndürüldükdə və ya `claudeSessionReset` söndürüldükdə, hər hesab üçün `autoLimitReset` keçidi əvvəlki kimi qərar verir. Hər ikisi aktiv olduqda, funksiya hər hesab üçün keçidləri əvəz edir: əhatə dairəsi daxilində hesab yalnız siyasət buna icazə verdikdə iddia edə bilər və `dry-run` rejimində heç bir iddia irəli sürülmür.

**Təhlükəsizlik:** iş hər bir işarə üçün ən çox bir kredit geri alır, kreditləri siyahıya salmazdan əvvəl qərar verir (keçilmiş hesab heç vaxt siyahıya alınmır), `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` identifikasiya açarlarından istifadə edir və uğursuz siyahıdan və ya ödənişdən sonra 1 saat ərzində hesabı söndürür. Hər bir geri alma, uğursuzluq və quru iş qərarı `audit_log` -yə yazılır (`action: "bankedReset.redeem"`, token və ya kredit idləri yoxdur); qapaqlar həmin cərgələrdən sayılır, ona görə də onlar yenidən işə salındıqda sağ qalırlar. Uğurlu ödənişlər `provider.reset_redeemed` webhook-u da işə salır.

Reqressiya qoruyucuları: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Sessiya bağlılığı (#7274)

**Əhatə dairəsi:** istənilən provayder üçün bir klient sessiyası
(`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` başlığı) bir bağlantıya bağlanır.

**Məqsəd:** çoxaddımlı agenti (Claude Code, aider, xüsusi agentlər) sorğular arasında eyni
hesabda saxlamaq; beləliklə, hesablar arasında kontekst itkisini və hər hesaba məxsus
sessiya vəziyyəti olan provayderlərdə təkrarlanan ilkin 429-ları azaltmaq.

**İcra:**

- TTL-nin həlli: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Bağlantının seçilməsi/yaradılması: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Başlığın çıxarılması (ümumi, istənilən provayder): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Saxlanılan bağlama cədvəli: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Parametr: `sessionAffinityTtlMs` (millisaniyə ilə qlobal TTL, `0` söndürür) —
  `src/lib/db/settings.ts`. Yalnız Codex üçün olan `codexSessionAffinityTtlMs` adından
  `124_generic_session_affinity_ttl.sql` miqrasiyası ilə dəyişdirilib; bu miqrasiya əvvəllər
  konfiqurasiya edilmiş istənilən Codex TTL-ni yeni standart dəyər kimi qoruyur.

#7274-dən əvvəl `resolveSessionAffinityTtlMs()` `codex` istisna olmaqla hər provayder üçün
birbaşa `0` qaytarırdı; buna görə TTL parametri (və sessiya başlıqları) başqa heç bir yerdə
təsir göstərmirdi, baxmayaraq ki, bağlama mexanizmi və başlığın çıxarılması artıq provayderdən
asılı deyildi. Düzəliş bu erkən qaytarılmanı aradan qaldırdı; qlobal olaraq `0`-dan böyük
dəyərə təyin edildikdə TTL indi bütün provayderlərə eyni qaydada tətbiq olunur.

Üç sessiya bağlılığı başlığı heç vaxt upstream-ə ötürülmür — icraçılar klient başlıqlarını
ötürmək əvəzinə öz upstream başlıqlarını sıfırdan qurur, buna görə bu, yalnız daxili
korrelyasiya identifikatoru olaraq qalır.

### Eksklüziv idarə olunan sessiya bağlantısı icarələri

**Əhatə dairəsi:** bir aktiv idarə olunan HTTP müştərisi/sessiyası bir uyğun OmniRoute bağlantısına sahibdir.

**Məqsəd:** sorğular arasında sərt marşrutlaşdırma sərhədinə ehtiyacı olan müştərilər üçün davamlı, eksklüziv bağlantı sahibliyini təmin etmək. Bu, yumşaq davamlılıq üstünlüyü olan sessiya yaxınlığından fərqlənir:
eksklüziv icarə SQLite-da həyat dövrü vəziyyətini saxlayır, qlobal aktiv sahiblik və
aktiv bağlantı unikallığını tətbiq edir və provayderə göndərilməzdən əvvəl köhnəlmiş generasiyanı rədd edir.

Bu funksiya hər API açarı üçün ayrıca aktivləşdirilir. İdarə olunan açar `lease:exclusive` əhatə dairəsinə və açıq, boş olmayan `allowedConnections` siyahısına malik olmalıdır. İstənilən HTTP müştərisi həyat dövrü son nöqtəsindən istifadə edə bilər; heç bir müştəri adı, user-agent, provayder, OAuth metodu və ya model tələb olunmur. İcarə modelə deyil, bağlantıya sahib olur; buna görə bağlantı adi qaydada uyğun olaraq qaldığı müddətdə modelin dəyişdirilməsi əlaqələndirməni saxlayır. Adi model, kvota, sağlamlıq, soyutma müddəti və icazə siyahısı qaydaları üstün olaraq qüvvədə qalır və eyni generasiyanı başqa boş, uyğun bağlantıya keçirə bilər.

Həyat dövrü `POST /api/v1/session-leases` ünvanında `acquire`, `renew` və `release` JSON əməliyyatları ilə idarə olunur.
İdarə olunan inferens sorğuları qeyri-şəffaf `X-OmniRoute-Lease-Owner` dəyərini və dəqiq
`X-OmniRoute-Lease-Generation` dəyərini təqdim edir. Sahib `vlo_` prefiksindən və 43 base64url simvolundan ibarətdir; yalnız onun SHA-256 heşi saxlanılır. Hər son göndəriş sərhədi həm autentifikasiya olunmuş API açarı ID-sini, həm də aktiv bağlantı ID-sini əlaqələndirir. İcarə idarəetmə başlıqları jurnallardan, saxlanılan sorğu görüntülərindən və yuxarı axın icraçısının başlıqlarından silinir.

Adi marşrutlaşdırmanın uyğun idarə olunan namizədləri olduğu, lakin hər boş namizədin xarici aktiv icarə tərəfindən tutulduğu halda, OmniRoute HTTP `429`, lease-capacity-unavailable kodunu, waiting-for-capacity vəziyyətini və ən erkən uyğun bitmə müddətindən hesablanan məhdud `Retry-After` dəyərini qaytarır.
Adi uyğun namizədlərin olmaması icarə mübahisəsi sayılmır və mövcud marşrutlaşdırma xətası semantikasını saxlayır.

Əlaqəli mexanizmlər ayrı olaraq qalır:

- OAuth sessiya tutulması OAuth hesabları üçün prosesdaxili yumşaq paylanmadır.
- Hesab semaforları sorğu paralelliyi icazələrini verir və sorğu tamamlandıqda başa çatır.
- Eksklüziv idarə olunan sessiya icarələri generasiya sərhədinə malik davamlı həyat dövrü sahibliyidir.

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
