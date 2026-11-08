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
