# Resilience Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute bir-biri ilə əlaqəli, lakin fərqli üç dayanıqlılıq mexanizminə malikdir. Hər birinin fərqli əhatə dairəsi və məqsədi var. Marşrutlaşdırma davranışında sazlama apararkən onları bir-birindən ayrı nəzərdən keçirin.

![3-səviyyəli dayanıqlılıq modeli](../diagrams/exported/resilience-3layers.svg)

> Mənbə: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Provayder Dövrə Qoruyucusu

**Əhatə dairəsi:** bütöv provayder (məs., `glm`, `openai`, `anthropic`).

**Məqsəd:** yuxarı axın/xidmət səviyyəsində təkrar-təkrar uğursuz olan provayderə trafik göndərilməsini dayandırmaq.

**İcra:**

- Əsas sinif: `src/shared/utils/circuitBreaker.ts`
- Qoşulma: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status API-si: `GET /api/monitoring/health`
- Sıfırlama API-si: `POST /api/resilience/reset`
- Örtüklər: `open-sse/services/accountFallback.ts`
- DB cədvəli: `domain_circuit_breakers`

**Vəziyyətlər:**

- `CLOSED` — normal trafikə icazə verilir
- `DEGRADED` — trafikə hələ də icazə verilir, lakin provayder uğursuzluqlarının artması izlənilir; kifayət qədər uğurlu nəticədən, etibarlı bağlantı testindən və ya yeni uğursuzluq olmadan son uğursuzluq növü üçün ən uzun `OPEN` saxlama müddətindən (onun `cooldownByKind` dəyəri, əks halda `resetTimeout`, × `maxBackoffMultiplier`, ən azı bir soyuma müddəti) sonra `CLOSED` vəziyyətinə qayıdır
- `OPEN` — provayder müvəqqəti bloklanır; kombinə edilmiş marşrutlaşdırma onu ötürür
- `HALF_OPEN` — sıfırlama vaxtı bitib; sınaq sorğusuna icazə verilir

**Konfiqurasiya edilə bilən standart dəyərlər (`open-sse/config/constants.ts`, İdarəetmə paneli → Parametrlər → Dayanıqlılıq bölməsində təqdim olunur):**

| Sinif     | Deqradasiya həddi | Açılma həddi  | Sıfırlama vaxtı |
| --------- | ----------------- | ------------- | --------------- |
| OAuth     | 5 uğursuzluq      | 8 uğursuzluq  | 60s             |
| API açarı | 7 uğursuzluq      | 12 uğursuzluq | 30s             |
| Lokal     | hesablanır        | 2 uğursuzluq  | 15s             |

`degradationThreshold` provayderin nə zaman `DEGRADED` vəziyyətinə keçdiyini; `failureThreshold` isə onun nə zaman açıldığını və ötürüldüyünü idarə edir. Lokal provayder profilləri hələlik Dayanıqlılıq parametrləri səhifəsində təqdim edilmir.

**Aktivləşdirmə kodları:** yalnız provayder səviyyəli statuslar `[408, 500, 502, 503, 504]`. Hesab səviyyəli xətalarda (əksər 401/403/429 — bunlar soyuma və ya bloklanmaya aiddir) dövrə qoruyucusunu aktivləşdirməyin.

**Tənbəl bərpa:** `OPEN` müddəti bitdikdə `getStatus()`, `canExecute()`, `getRetryAfterMs()` vəziyyəti `HALF_OPEN` olaraq yeniləyir. Eyni oxuma əməliyyatları (və növbəti uğursuzluq) köhnəlmiş `DEGRADED` vəziyyətini yenidən `CLOSED` vəziyyətinə endirir. Fon taymerinə ehtiyac yoxdur.

---

### Könüllü qlobal Provayder Soyuması (pəncərə keçidi)

Dördüncü, **könüllü** qat (`PROVIDER_COOLDOWN_ENABLED`, standart olaraq **söndürülüb**) uğursuz provayderlərin
sorğulararası yaddaşını
`open-sse/services/providerCooldownTracker.ts` daxilində saxlayır və kombinə edilmiş hədəfin
müəyyənləşdirilməsi zamanı ona müraciət edilir ki, ardıcıl kombinə edilmiş sorğular indicə
uğursuz olmuş provayderi yenidən yoxlamasın. Provayder səviyyəli qeydlər `PROVIDER_PROFILES` pəncərə keçidinə tabedir:

| Profil    | aktivləşmə həddi (`providerFailureThreshold`) | müddət (`providerFailureWindowMs`) | soyuma müddəti (`providerCooldownMs`) |
| --------- | --------------------------------------------: | ---------------------------------: | ------------------------------------: |
| OAuth     |                                          `10` |                            `15min` |                                `5min` |
| API açarı |                                          `15` |                            `30min` |                               `10min` |

Həddən aşağı olduqda provayder **soyuma vəziyyətində** hesab edilmir; uğurlu nəticə
pəncərəni təmizləyir. Bağlantı səviyyəli qeydlər (`provider:connectionId`) isə
eksponensial `minRetryCooldownMs → maxRetryCooldownMs` geriçəkilməsini saxlayır. Əvəzləmələr:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Reqressiyadan qorunma testi: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Bağlantının soyuma müddəti

**Əhatə dairəsi:** tək provayder bağlantısı/hesabı/açarı.

**Məqsəd:** eyni provayderin digər bağlantıları xidmət göstərməyə davam edərkən bir nasaz açarı ötürmək.

**Reallaşdırma:**

- Əlçatmaz kimi işarələmə: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seçim: eyni fayldakı `getProviderCredentials*`
- Soyuma müddətinin hesablanması: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Parametrlər: `src/lib/resilience/settings.ts`

**Hər bağlantı üçün sahələr:**

- `rateLimitedUntil` — soyuma müddətinin bitdiyi vaxt damğası
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponensial geri çəkilmə sayğacı

**Defolt soyuma müddətləri:**

- OAuth üçün baza: 5s
- API açarı üçün baza: 3s
- API açarı üçün 429: yuxarı axından gələn `Retry-After`/sıfırlama başlıqlarına/təhlil edilə bilən sıfırlama mətninə üstünlük verir
- Geri çəkilmə: `baseCooldownMs * 2 ** failureIndex`

**Kütləvi eyni vaxtlı sorğu axınına qarşı qoruma:** paralel xətaların soyuma müddətini həddən artıq uzatmasının və ya `backoffLevel` dəyərini iki dəfə artırmasının qarşısını alır.

**Paralellik limiti ilə bağlı 429 xətaları geri çəkilmə pillələrini artırmır.** Gövdəsində
paralellik limitinin ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) bildirildiyi `429` hesabın sağlam, lakin məşğul olduğunu göstərir.
`checkFallbackError()` `concurrency_limited` səbəbini qaytarır: dərhal növbəti
bağlantıya keçin, cari bağlantı üçün sabit `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) müddəti və ya
yuxarı axının təkrar cəhd göstərişi qədər soyuma müddəti təyin edin, `backoffLevel` dəyərini dəyişmədən saxlayın və `skipProviderBreaker` təyin edin.
Açıq şəkildə kvotanı bildirən gövdə yenə də üstünlük təşkil edir; buna görə də kvota nümunəsinə uyğun gələn gövdə kvota
hökmü olaraq qalır. Aşkarlama: `src/shared/utils/classify429.ts` daxilində `looksLikeConcurrencyLimit()`;
hökm: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (kəsicinin
`FailureKind` dəyəri) dəyişməyib və bu gövdələr üçün hələ də `rate_limit` oxuyur.

**Axın məzmununun dayanması hesab üçün soyuma müddəti təyin etmir.** Məzmun dayanmasına nəzarət mexanizmi
(`open-sse/utils/streamHandler.ts`) vaxtında heç bir model çıxışı göndərməyən
axından imtina etdikdə, `markAccountUnavailable()` bağlantıdakı xətanı qeydə alır, lakin
soyuma müddəti təyin etmir: dayanma həmin sorğuya aiddir və əksər hallarda hələ çıxış verməyən
uzun əsaslandırma mərhələsidir. Operatorlar `resilienceSettings.streamStallCooldown.enabled`
vasitəsilə bunu yenidən aktivləşdirə bilərlər (defolt `false`).

**Əsaslandırma freymləri məzmun dayanması büdcəsini yenidən başladır.** Əsaslandırma modeli ilk
görünən tokenini yaratmazdan əvvəl dəqiqələrlə düşünə bilər: Claude, düşünmə mətni boş ola bilən
`thinking_delta` freymlərini yayımlayır, Responses API isə bir əsaslandırma elementini
digərinin ardınca yayımlayır. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) bu
freymləri tanıyır və nəzarət mexanizmi gedişi ləğv etmək əvəzinə hər freymdə büdcəsini yenidən başladır.
Bunlar yenə də model çıxışı deyil; buna görə yalnız əsaslandırma ilə bitən gediş hələ də
boş kimi bildirilir, əsaslandırmanı dayandırıb yalnız nəbz siqnalları göndərən gediş isə yenə də
nəzarət mexanizmini işə salır.

Kiro-nun boş olmayan imzaya malik binar `reasoningContentEvent` freymləri bu
əsaslandırma fəaliyyətini icra mexanizmindən boş `reasoning_content` deltası kimi keçirərək qoruyur. İmza
ötürülmür. Metaməlumatlar, natamam freymlər və boş imzalar məzmun
büdcəsini yenidən başlatmır; müstəqil aktiv axın taym-autu və müştəri tərəfindən ləğv hələ də
tətbiq olunur (`open-sse/executors/kiro/reasoning.ts`).

**Terminal vəziyyətlər (soyuma müddəti DEYİL):**

- `banned` — qadağan olunmuş açar sözün / hesab qadağasının aşkarlanması ilə (baxın: [BAN_DETECTION](../security/BAN_DETECTION.md)) və yuxarı axından hər sorğu üzrə ardıcıl üç rədd cavabından sonra (`request_rejected`, məsələn, Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`) təyin edilir; tək bir rədd cavabı yalnız bağlantı üçün soyuma müddəti təyin edir
- `expired` (məhdud sayda təkrar cəhddən sonra terminal vəziyyətə keçir — eksponensial geri çəkilmə ilə `EXPIRED_RETRY_MAX = 3` — beləliklə, keçici OAuth xətaları hesab daimi olaraq deaktiv edilməzdən əvvəl öz-özünə düzələ bilər)
- `credits_exhausted`

Bunlar etimadnamələr dəyişənə və ya operator onları sıfırlayana qədər qalır. Terminal vəziyyətləri keçici soyuma vəziyyəti ilə əvəz etməyin.

**Tənbəl bərpa:** `rateLimitedUntil` vaxtı keçdikdə bağlantı yenidən uyğun vəziyyətə gəlir. Uğurlu istifadədən sonra `clearAccountError()` bütün xəta sahələrini təmizləyir.

### Claude OAuth istifadə həddi: aşağı prioritetli zolaq + sessiya limitinin sıfırlanması

**Əhatə dairəsi:** bir Claude abunəlik (OAuth) bağlantısı. Hər iki funksiya **hər bağlantı üçün ayrıca
aktivləşdirilir** (Bağlantını redaktə et → Claude bölməsi → `providerSpecificData` daxilində `lowPriorityMode` / `autoLimitReset`;
hər ikisi defolt olaraq deaktivdir) və Claude Code-un `/low-priority` və
`/limit-reset` komandalarını təkrarlayır (şəbəkə protokolu Claude Code 2.1.263 versiyasından qeydə alınıb).

**Reallaşdırma:**

- Vəziyyət maşını + cavab təsnifatı: `open-sse/services/claudeLowPriority.ts`
- Sıfırlama statusu/tələb müştərisi: `open-sse/services/claudeLimitReset.ts`
- İcra mexanizmi qarmağı (başlıq əlavə edilməsi + eyni hesabda təkrar cəhd): `open-sse/executors/base.ts::execute()`
- Aktivləşdirmə seçiminin saxlanması: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Tətikləyici:** 5 saatlıq istifadə həddi — başlıqlarında
`anthropic-ratelimit-unified-status: rejected` və hesab uyğun olduqda
`anthropic-ratelimit-unified-slow-offer: treatment` olan `429`. İlk belə hədd
429-u yaranmazdan əvvəl heç nə göndərilmir; vahid başlıqları olmayan ani 429 normal soyuma yolundan keçir.

**Aşağı prioritetli zolaq** (`lowPriorityMode`):

- Divar 429-u zamanı icraçı təklifi qəbul edir və dərhal **eyni**
  hesabı `anthropic-usage-limit: slow` ilə yenidən sınayır; elan edilmiş
  `anthropic-ratelimit-unified-reset` vaxtına qədər (+60s güzəşt müddəti) zolaq aktiv qalır
  və həmin intervaldakı hər sorğu bu başlığı daşıyır. Tutulmuş 429 `handleChatCore`-a
  heç vaxt çatmır, buna görə də bağlantı soyutma rejiminə **salınmır** və başqa bağlantı ilə əvəz edilmir.
- Sonrakı cavablarda `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  zolağı saxlayır; `slot_busy` (429) və ya `529` serverin
  `anthropic-ratelimit-unified-slow-retry-after` müddətini (standart olaraq 20s, 5–600s aralığında məhdudlaşdırma, ±30% təsadüfi yayınma)
  gözləyir və yenidən sınayır; bu proses `anthropic-ratelimit-unified-slow-max-wait` ilə məhdudlaşdırılır (standart olaraq 20 min, 1 min–6 h
  aralığında məhdudlaşdırma) — bu müddət keçdikdə zolaq bitir və 10 dəqiqəlik soyuma müddəti yenidən qəbulu bloklayır. Gözləmə müddəti
  əlavə olaraq sorğunun öz yuxarı axın başlanğıc taymautundan qalan müddətlə
  (`resolveFetchStartTimeout`, standart olaraq 10 min) mənfi 5 s ehtiyatla məhdudlaşdırılır: bu məhdudiyyət olmasa,
  standart 20 dəqiqəlik maksimum gözləmə sorğunun ömrünü aşar və gözləmə
  prosesin ortasında dayandırılaraq normal `max_wait` sonlanması + soyuma əvəzinə
  `TimeoutError` göstərərdi.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h pəncərəsinin yenilənməsi və ya
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ödənişli limit aşımı artıq divarı əhatə etdiyindən istənilən statusda bunu
  `extra_usage` kimi sonlandırır) zolağı bitirir; bundan sonra cavab normal soyutma yoluna keçir. `budget_exhausted` elan edilmiş
  büdcə sıfırlanmasına qədər (≤ 8 gün) yadda saxlanılır.
- Divar yoxlaması icraçının 400 ilə başladılan cəhddaxili təkrarlarından (kontekst
  redaktəsi, düşünmə/səy məhdudiyyətləri, parametrin avtomatik öyrənilməsi) sonra işləyir, buna görə də yalnız
  həmin təkrarlardan birində üzə çıxan divar 429-u soyutma yoluna çatmaq əvəzinə yenə də tutulur.
- Vəziyyət hər bağlantı üçün yaddaşda saxlanılır (yenidən başlatma yenidən qəbul üçün bir əlavə divar 429-u tələb edir).

**Sessiya limitinin sıfırlanması** (`autoLimitReset`, hər ikisi aktiv olduqda zolaqdan əvvəl sınanır):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  bloku; `arm: "reset"` və `available: true` olduqda,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` sorğusu
  `{ "program": "juniper_tide" }` ilə göndərilir (təşkilat UUID-si
  `providerSpecificData.organizationUUID`-dən, ehtiyat variant kimi ilkin yükləmədən götürülür).
- `result: reset|not_limited` → sorğu tam sürətlə yenidən sınanır (yavaş rejim başlığı olmadan).
  `already_used` / `not_offered` `next_available_at` dəyərini yadda saxlayır (standart olaraq bir həftə);
  istənilən xəta 15 dəqiqəlik geri çəkilməyə səbəb olur. Sıfırlama həftədə bir dəfədir və yenə də
  həftəlik limitə daxil edilir.

Reqressiya qoruyucuları: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sessiya bağlılığı (#7274)

**Əhatə dairəsi:** **istənilən** provayder üçün bir bağlantıya bərkidilmiş bir klient sessiyası (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` başlığı).

**Məqsəd:** çoxaddımlı agenti (Claude Code, aider, fərdi agentlər) sorğular boyunca eyni hesabda saxlamaq, bununla da hesablararası kontekst itkisini və hər hesab üzrə sessiya vəziyyəti olan provayderlərdə təkrarlanan soyuq başlanğıc 429-larını azaltmaq.

**Reallaşdırma:**

- TTL-in müəyyənləşdirilməsi: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Bərkitmənin seçilməsi/yaradılması: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Başlığın çıxarılması (ümumi, istənilən provayder): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Davamlı saxlanılan bərkitmə cədvəli: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Parametr: `sessionAffinityTtlMs` (ms ilə qlobal TTL, `0` deaktiv edir) — `src/lib/db/settings.ts`. Yalnız Codex üçün olan `codexSessionAffinityTtlMs` adından `124_generic_session_affinity_ttl.sql` miqrasiyası ilə dəyişdirilib; bu miqrasiya əvvəllər konfiqurasiya edilmiş istənilən Codex TTL-ni yeni standart dəyər kimi daşıyır.

#7274-dən əvvəl `resolveSessionAffinityTtlMs()` `codex` istisna olmaqla hər provayder üçün dərhal `0` qaytarırdı, buna görə də bərkitmə mexanizmi və başlığın çıxarılması artıq provayderdən asılı olmasa belə, TTL parametri (və sessiya başlıqları) başqa heç bir yerdə təsir göstərmirdi. Düzəliş həmin erkən qaytarmanı aradan qaldırdı; TTL qlobal şəkildə `0`-dan yuxarı təyin edildikdən sonra artıq bütün provayderlərə bərabər şəkildə tətbiq olunur.

Üç sessiya bağlılığı başlığı heç vaxt yuxarı axına ötürülmür — icraçılar klient başlıqlarını olduğu kimi ötürmək əvəzinə öz yuxarı axın başlıqlarını sıfırdan qururlar, buna görə də bu, yalnız daxili korrelyasiya identifikatoru olaraq qalır.

### Eksklüziv idarə olunan sessiya bağlantısı icarələri

**Əhatə dairəsi:** bir aktiv idarə olunan HTTP klienti/sessiyası bir uyğun OmniRoute bağlantısına sahib olur.

**Məqsəd:** sorğular arasında sərt marşrutlaşdırma
sərhədinə ehtiyacı olan klientlər üçün davamlı eksklüziv bağlantı sahibliyi təmin etmək. Bu, yumşaq davamlılıq üstünlüyü olan sessiya bağlılığından fərqlənir:
eksklüziv icarə həyat dövrü vəziyyətini SQLite-da saxlayır, qlobal aktiv sahib və
aktiv bağlantı unikallığını təmin edir və provayderə yönləndirmədən əvvəl köhnəlmiş nəsli rədd edir.

Funksiya hər API açarı üçün ayrıca aktivləşdirilir. İdarə olunan açar `lease:exclusive` əhatə dairəsinə və
açıq şəkildə göstərilmiş, boş olmayan `allowedConnections` siyahısına malik olmalıdır. İstənilən HTTP klienti həyat dövrü son nöqtəsindən istifadə edə bilər;
klient adı, user-agent, provayder, OAuth metodu və ya model tələb olunmur. İcarə modelə deyil, bağlantıya sahib olur,
buna görə də bağlantı adi qaydada uyğun qaldığı müddətdə model dəyişikliyi bağlanmanı saxlayır.
Normal model, kvota, sağlamlıq, soyutma və icazə siyahısı qaydaları əsas qüvvədə qalır və
eyni nəsli başqa bir boş uyğun bağlantıya keçirə bilər.

Həyat dövrü `acquire`, `renew` və `release` JSON əməliyyatları ilə `POST /api/v1/session-leases` sorğusudur.
İdarə olunan inferensiya sorğuları qeyri-şəffaf `X-OmniRoute-Lease-Owner` dəyərini və dəqiq
`X-OmniRoute-Lease-Generation` dəyərini təqdim edir. Sahib identifikatoru `vlo_` prefiksindən və onun ardınca gələn 43 base64url simvolundan ibarətdir; yalnız
onun SHA-256 heşi saxlanılır. Hər bir yekun göndəriş səddi həmçinin autentifikasiya edilmiş API açarı ID-sini və
aktiv bağlantı ID-sini əlaqələndirir. İcarə idarəetmə başlıqları jurnallardan, saxlanılan sorğu anlıq görüntülərindən və
yuxarı axın icraçısının başlıqlarından silinir.

Adi marşrutlaşdırmada uyğun idarə olunan namizədlər varsa, lakin bütün boş namizədlər
başqa sahibə məxsus aktiv icarə ilə tutulubsa, OmniRoute HTTP `429`, lease-capacity-unavailable kodu,
waiting-for-capacity vəziyyəti və aidiyyəti olan ən erkən bitmə vaxtından hesablanan, məhdudlaşdırılmış `Retry-After` qaytarır.
Uyğunluq siyahısının adi qaydada boş olması icarə münaqişəsi deyil və mövcud marşrutlaşdırma xətası semantikasını saxlayır.

Əlaqəli mexanizmlər ayrı qalır:

- OAuth sessiya məşğulluğu OAuth hesabları üçün proses daxilində yumşaq paylamadır.
- Hesab semaforları sorğu paralelliyi icazələri verir və sorğu tamamlandıqda başa çatır.
- Eksklüziv idarə olunan sessiya icarələri nəsil səddi ilə davamlı həyat dövrü sahibliyidir.

---

## 3. Model Bloklanması

**Əhatə dairəsi:** provayder + bağlantı + model üçlüyü.

**Status üzrə açarın əhatə dairəsi:** bloklanmanın hansı açara yazılacağını uğursuzluq statusu müəyyən edir
(`open-sse/services/accountFallback/exactModelLock.ts` daxilində `resolveLockoutScope()`):

- `429` / `403` / `402` — kvota və ya istifadə hüququ siqnalı — **kvota ailəsini** bloklayır:
  codex üçün bağlantının bütün `codex` / `spark` əhatə dairəsini (bağlantının hər bir `gpt-5*` modelini),
  digər provayderlər üçün isə `getQuotaScopedModelForProvider()`.
- `404` yalnız modelin özünü bloklayır (`getModelLockKey()` `not_found` əhatəsini daraldır).
- İstənilən digər status — `5xx` ötürmə/server xətaları və keyfiyyət yoxlaması nəticəsində
  OmniRoute-un özünün yaratdığı `502` — yalnız **dəqiq**
  provayder/bağlantı/model üçlüyünü bloklayır. Bir modeldəki nasaz axın hesabın kvotası
  haqqında sübut deyil; bu qaydadan əvvəl `codex/gpt-5.6-luna` üzrə bir boş cavab,
  kvotaya toxunulmadığı halda həmin bağlantının bütün `gpt-5*` modellərini
  2–30 dəqiqə ərzində (artan müddətlə) marşrutlaşdırmadan çıxarırdı.
- Çağıranın açıq şəkildə verdiyi `scope` seçimi həmişə üstünlük təşkil edir (Antigravity `"exact"` ötürür).

**Məqsəd:** yalnız bir model əlçatan olmadıqda və ya kvota ilə məhdudlaşdırıldıqda bütün bağlantının deaktiv edilməsinin qarşısını almaq.

**Nümunələr:**

- Hər model üçün ayrıca kvota tətbiq edən və 429 qaytaran provayderlər
- Çatışmayan bir model üçün 404 qaytaran lokal provayderlər
- Provayderə xas rejim/model icazəsi xətaları (məsələn, Grok rejimləri)

**Reallaşdırma:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Soyuma Müddətləri İdarəetmə Paneli (v3.8.0)

İstifadəçi interfeysi: Parametrlər → Model Soyuma Müddətləri (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Aktiv bloklanmaları bu məlumatlarla siyahıya alır: provayder, bağlantı, model, səbəb, expiresAt. Operatorlar kartdan modeli əl ilə yenidən aktivləşdirə bilərlər.

**REST API:**

- `GET /api/resilience/model-cooldowns` — aktiv bloklanmaları siyahıya alır
- `DELETE /api/resilience/model-cooldowns` — əl ilə yenidən aktivləşdirmə. Gövdə: `{provider, connection, model}`. Autentifikasiya: idarəetmə.

### Soyuma Müddəti Meneceri

İstifadəçi interfeysi: Monitorinq → Soyuma Müddəti Meneceri (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Hər provayder səhifəsini ayrıca açmaq əvəzinə, müvəqqəti səbəbə görə
marşrutlaşdırmadan çıxarılmış bütün bağlantılar üçün vahid səhifə. Burada bağlantıların soyuma müddətləri, model bloklanmaları və terminal
vəziyyətlər siyahıya alınır; bunlar hər bağlantı, seçim və ya provayderin bütün bağlantıları üzrə təmizlənir
və ən çox tənzimlənən soyuma qaydaları redaktə edilir: `streamStallCooldown.enabled` və OAuth / API açarı üçün
`connectionCooldown` əsas soyuma müddəti və maksimum geriçəkilmə addımları (`PATCH /api/resilience` vasitəsilə
saxlanılır). Terminal vəziyyətlər (`banned`, `expired`, `credits_exhausted`) siyahıya
alınır, lakin burada heç vaxt təmizlənmir.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentifikasiya: idarəetmə):

- `GET /api/resilience/cooldowns[?provider=]` — status, qalan soyuma müddəti,
  geriçəkilmə səviyyəsi, son xəta növü və model bloklanmaları ilə bağlantılar (giriş məlumatları olmadan)
- `POST /api/resilience/cooldowns` — gövdə `{connectionIds: string[]}` və ya
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` qaytarır

### Bloklanma parametrləri interfeysi + uğurla azalan bərpa (v3.8.23)

Model bloklanması həmişə aktiv olan sərt kodlaşdırılmış davranışdan tam konfiqurasiya edilə bilən,
istəyə bağlı funksiyaya çevrildi və öz parametr kartını, eləcə də özünü bərpa edən sağalma mexanizmini əldə etdi.

**Parametrlər kartı:** Parametrlər → Model Bloklanması
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Bu, yuxarıdakı yalnız oxumaq üçün nəzərdə tutulmuş `ModelCooldownsCard` kartından (yalnız aktiv bloklanmaları
_siyahıya alır_) **fərqlidir** — yeni kart _parametrləri konfiqurasiya edir_. Standart dəyərlər
`DEFAULT_MODEL_LOCKOUT_SETTINGS` daxilindədir
(`src/lib/resilience/modelLockoutSettings.ts`):

| Parametr                | Standart dəyər                   | Mənası                                                                           |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Əsas keçid — model bloklanması **standart olaraq söndürülüb**.                   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model əhatəli xəta kimi sayılan yuxarı axın statusları.                          |
| `baseCooldownMs`        | `120_000` (120 san.)             | İlk xəta üçün ilkin bloklanma müddəti.                                           |
| `maxCooldownMs`         | `1_800_000` (30 dəq.)            | Artırılmış soyuma müddətinin yuxarı həddi.                                       |
| `maxBackoffSteps`       | `10`                             | Maksimum eksponensial geriçəkilmə artımı addımları.                              |
| `useExponentialBackoff` | `true`                           | Təkrarlanan xətaların soyuma müddətini eksponensial şəkildə artırıb-artırmaması. |

Parametrlər adi parametrlər anbarı vasitəsilə saxlanılır və dayanıqlılıq parametrləri sxemi ilə
yoxlanılır; kart `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` olmaqla) və `maxBackoffSteps` dəyərlərini icazə verilən hədlərlə məhdudlaşdırır.

**Uğurla azalan bərpa:** bərpa **yalnız** taymerin bitməsindən asılı deyil. Sağlam
cavab modelin xəta sayını addım-addım azaldır; beləliklə, müddətin ortasında bərpa olunan model
taymeri bitməzdən əvvəl artımı dayandırır (və bloklanmanı aradan qaldırır). Uğurlu
combo hədəfində `open-sse/services/combo.ts`, saxlanılmış
`failureCount` dəyərini **yarıya endirən** (`Math.floor(failureCount / 2)`) `decayModelFailureCount()`
funksiyasını (`open-sse/services/accountFallback.ts`) çağırır; dəyər `0` olduqda bloklanma
qeydi tamamilə silinir. Onun qarşılığı olan `recordModelLockoutFailure()`
artım pəncərəsi daxilindəki xətalar zamanı sayğacı artırır (və soyuma müddətini uzadır).
Uğurla azalma mexanizmi adi taymer müddətinin bitməsinə əlavədir —
hər iki yol modeli yenidən aktivləşdirə bilər.

**Vəziyyət:** bloklanmalar DB-də saxlanılmır, **yaddaşda** saxlanılır (açarı
`provider:connectionId:model` olan hər prosesə aid `ModelLockoutEntry` `Map`-ləri, dəqiq əhatəli kilidlər üçün isə
`provider:connectionId:exact:model`) — yenidən başladılma zamanı itirilirlər.
_Parametrlər_ daimi saxlanılır; aktiv bloklanma _vəziyyəti_ isə müvəqqətidir.

---

## 4. Quota-Share Paralellik Nəzarəti (v3.8.36)

Abunəlik hesabları (GLM, MiniMax və s.) çox vaxt yalnız ~1–3 paralel sorğunu
qəbul edir; bu həddin aşılması 429 xətalarına və gözləmə müddətlərinə səbəb olur.
Bu problem bir neçə API açarının eyni yuxarı səviyyəli hesabı paylaşdığı
**quota-share** (`qtSd/…`) kombinasiyalarında xüsusilə kəskindir. Üç qat ortaq
hesabın sorğu axınına məruz qalmasının qarşısını alır.

### Hər bağlantı üzrə paralellik həddi (`max_concurrent`)

Hər provayder bağlantısı `max_concurrent` yuxarı həddi təyin edə bilər
(`provider_connections.max_concurrent`, bağlantı modalında / API / DB-də
qurulur). Məhdudiyyət olmaması üçün onu boş saxlayın. Bu, aşağıdakı
ardıcıllaşdırma qatını idarə edən yeganə parametrdir — onu hesabın real
paralellik səviyyəsinə uyğun təyin edin (məsələn, GLM ~1, MiniMax ~2).

### Hər model üzrə paralellik hədləri (`modelConcurrency`)

Bağlantı əlavə olaraq `rateLimitOverrides` xəritəsində hər model üçün dəqiq
paralellik hədləri təyin edə bilər:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Bunu bağlantı modalında (**Sorğu sürəti limiti əvəzləmələri → Hər model üzrə
paralellik hədləri**, hər sətirdə bir `model=cap`) və ya eyni JSON strukturu ilə
`PATCH /api/providers/[id]` vasitəsilə təyin edin. Açar semantikaları:

- **Bağlantı miqyasında və modelə xas:** `maxConcurrent` ortaq
  bağlantı miqyaslı yuxarı hədd olaraq qalır. Hər ikisi tətbiq edildikdə, hər iki
  keçid eyni mürəkkəb keçiddə atomar şəkildə əldə edilir
  (`global → provider → account → model`); faktiki davranışı tətbiq olunan daha
  sərt limit müəyyənləşdirir.
- **Model açarının dəqiq uyğunluğu:** açar, marşrutlaşdırma həllindən sonra
  icraçıya ötürülən model sətridir — adətən müştəri tərəfindəki
  `provider/model` ləqəbi deyil, yuxarı səviyyəli sistemdəki sadə model
  identifikatorudur (`glm-5`) (`zai/glm-5`, `glm-5` ilə uyğun gəlmir).
  Dəyərlər paralel sorğular üçün müsbət tam ədəd hədləridir.
- **Lokal növbələmə, aşkarlama yoxdur:** artıq sorğular mövcud növbə/taymaut
  semantikası ilə lokal olaraq növbəyə alınır (tipləşdirilmiş
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` qəbul xətaları). OmniRoute
  yuxarı səviyyəli sistemin siyasətini aşkarlamır və ya təxmin etmir — operatorun
  konfiqurasiya etdiyi dəqiq hədləri tətbiq edir. Doymuş model keçidi heç vaxt
  provayderi deaktiv etmir və heç vaxt daimi model bloklanması yaratmır; yuxarı
  səviyyəli sistemin 429/gözləmə müddəti/ehtiyat varianta keçid davranışı xəta
  üçün son müdafiə vasitəsi olaraq qalır.
- **Hər bağlantı və hər proses üzrə əhatə dairəsi:** hədlər hər verilənlər bazası
  bağlantısı üçün ayrıdır və yaddaşda saxlanılır, buna görə də eyni yuxarı
  səviyyəli API açarından təkrar istifadə edən iki bağlantı bir-biri ilə
  koordinasiya etmir.
- **Konfiqurasiya edilməməsi dəyişiklik olmaması deməkdir:** xəritənin buraxılması
  (və ya idarəetmə panelindəki sahənin boş saxlanılması) heç bir model keçidi
  əlavə etmir. Hər hansı universal provayder limiti irəli sürməyən nümunə
  konfiqurasiya:

```text
glm-5=1
glm-4.7=3
```

### Quota-share sorğularının ardıcıllaşdırılması

Quota-share göndərişi müsbət `max_concurrent` təyin edən bağlantını
hədəflədikdə, həmin **hesaba** göndərilən paralel sorğular hər bağlantı üzrə
semafor (`qsconn:<connectionId>` açarı) vasitəsilə ardıcıllaşdırılır: artıq
sorğular hesabı sorğu axınına məruz qoymaq əvəzinə **növbədə gözləyir**. Bu,
**fail-open** prinsipilə işləyir — doymuş növbə və ya taymaut göndərilə bilən
sorğunu rədd etmək əvəzinə yuva olmadan davam edir. Bunu **Parametrlər →
Dayanıqlılıq → Quota-share üçün hər bağlantı üzrə paralellik** bölməsində
dəyişdirin (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standart
olaraq aktivdir). `max_concurrent` həddi olmadıqda davranış dəyişmir.

> Quota-share marşrutlaşdırma keçidi (`selectQuotaShareTarget`, DRR + P2C) özü də
> fail-open prinsipilə işləyir və yalnız həddə çatmış bağlantının
> _prioritetini azaldır_ — tək bağlantılı hovuzda sərt məhdudiyyət tətbiq edə
> bilməz, buna görə də sorğu axınını faktiki olaraq nəzarətdə saxlayan məhz bu
> semafordur.

### Kombinasiya üçün gözləmə müddətini nəzərə alan təkrar cəhd

Hər bir kombinasiya strategiyasında (aktiv olduqda), QISA keçici gözləmə müddəti
üçün 429 xətasını qəti hala gətirəcək sorğu 429 qaytarmaq əvəzinə müddətin
bitməsini gözləyir və yenidən göndərilir — bu, çoxmodelli kombinasiyalarda
Gemini sinifli TPM/RPM pəncərələrini (~60s retry-after), məsələn, 2 modelli
kombinasiyanın hər iki hədəfinin hər model üzrə sorğu sürəti limitinə çatmasını
əhatə edir. **Parametrlər → Dayanıqlılıq** bölməsindəki `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ilə məhdudlaşdırılır.
O, `quota_exhausted` (gecə yarısına qədər kilidlənib) və ya autentifikasiya /
tapılmadı səbəbləri üçün heç vaxt gözləmir.

Eyni keçid göndərişdən əvvəlki halı da əhatə edir (#16319): kombinasiyanın hər
bir hədəfi heç bir cəhd edilməzdən əvvəl modeli qısa keçici bloklanmada olduğu
üçün buraxıldıqda, sıfır cəhdli yol göstərişsiz `503 ALL_TARGETS_SKIPPED`
cavabı vermək əvəzinə eyni hədlər daxilində bloklanmanın bitməsini gözləyir və
sorğunu yenidən göndərir. Gözləməyə icazə verilmədikdə (həddə çatılıbsa, cəhd
və ya büdcə tükənibsə, yaxud funksiya deaktivdirsə), yekun cavab ən erkən keçici
bloklanmanın bitmə vaxtından `retry_after` / `reset_at` daşıyan
`429 rate_limit_error` cavabına yüksəldilir; kvota, autentifikasiya və
tapılmadı blokları göstərişsiz 503 cavabını saxlayır.

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

## 5. Sorğu Növbəsinə Qəbul Nəzarəti (v3.8.49 · məsələ #6593)

**Əhatə dairəsi**: yuxarıdakı üç mexanizmdən bir səviyyə aşağıda yerləşən, hər provider+connection üçün lokal sürət məhdudiyyəti növbəsi (`open-sse/services/rateLimitManager.ts`,
Bottleneck əsasında işləyir).

**`maxWaitMs` növbədə gözləmə müddətini, `executionMaxWaitMs` isə icra müddətini məhdudlaşdırır.**
Bu ikisi qəsdən ayrı saxlanılır və heç biri digərinə təsir etmir.

`resilienceSettings.requestQueue.maxWaitMs` **növbədə gözləmə büdcəsidir**: bu,
provider slotunun gözlənilməsini və daha sonra QUEUED vəziyyətində qalmağı əhatə edir; tapşırıq
QUEUED vəziyyətindən çıxıb icraya başlayan kimi onun taymeri
təmizlənir (`rateLimitManager.ts`, `wrappedFn`). Bu müddəti aşan sorğu
upstream-ə heç vaxt çatmır. Standart dəyər 30000ms-dir, bu dəyər
`src/lib/resilience/settings.ts` daxilindəki `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
tərəfindən verilir və
`tests/unit/ratelimit-admission-control-6593.test.ts` tərəfindən təsbit edilir; beləliklə, dəyərin dəyişdirilməsi
bu paraqrafın səssizcə köhnəlməsi əvəzinə həmin testi uğursuz edir.

`resilienceSettings.requestQueue.executionMaxWaitMs` Bottleneck-in
tapşırıq `expiration` dəyəri kimi aldığı parametrdir və onun taymeri yalnız göndərişdən sonra başlayır. Bu,
öz upstream taymautu olmayan icraçılar üçün qoruyucu mexanizmdir və icraçının öz fetch-başlama taymautu
daha uzundursa, həmin müddətə qədər artırılır; buna görə də normal işləyən, icra prosesindəki cavabı
yarımçıq dayandıra bilməz. Standart dəyər 600000ms-dir (10 dəq).

Növbə büdcəsinin `expiration` parametrinə ötürülməsi əvvəllər qeyri-inkremental
şlüzləri icranın ortasında dayandırırdı — onlar ilk baytları göndərməzdən əvvəl qanuni olaraq dəqiqələrlə işləyə bilər —
və məhz buna görə expiration xətası `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) kimi təqdim olunur, növbə büdcəsi isə
növbə taymautu kodunu daşıyır. Hər iki dəyəri `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) vasitəsilə və ya idarəetmə panelində
(**Parametrlər → Dayanıqlılıq**) dəyişə bilərsiniz. Normallaşdırılarkən hər ikisi 1ms–24h aralığı ilə məhdudlaşdırılır.

**Hər ikisi üçün prioritet sırası:** env dəyişəni yalnız _standart_ dəyəri təmin edir.
`resilienceSettings.requestQueue` daxilində saxlanılan dəyər (idarəetmə paneli / API patch vasitəsilə, `key_value`
daxilində saxlanılır) onu üstələyir, hər connection üçün təyin edilmiş
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` isə bundan da üstündür. Buna görə də
artıq saxlanılmış dəyəri olan deployment-da env dəyişəninin təyin edilməsi
heç nəyi dəyişmir — bunun əvəzinə saxlanılmış parametri silin və ya yeniləyin.

Növbədə qalma müddəti `maxWaitMs` ilə məhdudlaşdırılır; aşağıdakı `maxQueueDepth` isə
eyni anda neçə çağırışın növbədə ola biləcəyini məhdudlaşdırır.

**Cavab gövdəsində göstərilən təkrar cəhdlər: tempin tənzimlənməsi və bloklama.** 429 cavabının gövdəsi öz gözləmə
müddətini göstərə bilər (Gemini `RetryInfo.retryDelay`, "retry after Ns" mətni) və
`updateFromResponseBody` bunu oxuyur. Connection-un `maxWaitMs` həddinə uyğun gələn gözləmə
tempin tənzimlənməsidir: limiter həmin müddət ərzində öz rezervuarını boşaldır və növbədəki çağırışlar
rezervuar yenidən dolduqda göndərilir. `maxWaitMs` dəyərindən uzun gözləmə müddəti növbənin
gözləyib başa vuracağı bir hal deyil — Gemini tükənmiş gündəlik kvotaya
`retryDelay: "86399s"` ilə cavab verir. Yenidən qurulmuş 429-da (#16528) ötürülən `Retry-After`
artıq ehtiyat mexanizmin həmin müddət üçün modeli bloklamasına səbəb olur, lakin limiter-in də bu müddətə
dayandırılması yenə də açara erkən çatan istənilən çağırışı (məsələn, dayanıqlılığın sıfırlanmasından sonra)
bütün `maxWaitMs` müddəti ərzində ləngidərdi. Belə bir gözləmə typed Google `RetryInfo`
detalından (`google_rpc_retry_info` mənşəyi) gəldikdə və açarın limiter-i
artıq model üzrə əhatələndikdə (`getLimiterKey`-ə baxın), 429 əvəzinə həmin connection-da modelin
bloklanmasına çevrilir (`open-sse/services/rateLimitManager/bodyRetryPause.ts` daxilindəki
`lockModelForLongBodyRetry`, maksimum 24h) və limiter dayandırılmamış qalır.
Account seçimi `isModelLocked()` vasitəsilə bu bloklamanı ötürür; connection-a sabitlənmiş hədəflər üçün
combo-nun göndərişdən əvvəlki qapısı da eyni davranışı göstərir. Limiter-i hər kvota ailəsi üzrə olan
antigravity-də bloklama, digər kvota bloklamalarında olduğu kimi, konkret modelə tətbiq edilir. Alias modeli
həll etdikdə müştərinin istədiyi ad da bloklanır, çünki həmin yoxlamalar sorğuda göstərilən addan istifadə edir;
bloklama dəqiq şəkildə (`lockExactModel`) aparılır, buna görə antigravity kvota ailəsini və ya codex əhatəsini
keçən alias heç vaxt özünü bloklamır. Mətn şəklində ipucu, typed olmayan `retryDelay` və ya
bütün connection tərəfindən paylaşılan limiter dayandırmanı saxlayır. 429 emal yolu ilə yenicə yenidən qurulmuş
limiter dayandırıldıqda, qalan növbə vaxtı dayandırma bitməzdən əvvəl başa çatacaq çağırış həmin müddəti
gözləmək əvəzinə növbə taymautu kodu ilə dərhal rədd edilir (`checkLimiterPause`); qeydə alınmış bitmə vaxtı
limiter qurulmazdan əvvəlki məqama bağlanır, çünki Bottleneck yeniləmə saatını burada işə salır və rezervuarda
sonradan edilən istənilən dəyişiklik bu vaxtı unudur. Bu davranış
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` və
`tests/unit/rate-limit-body-retry-pause.test.ts` ilə əhatə olunur.

**`maxQueueDepth` — seçim əsasında aktivləşdirilən qəbul həddi (yeni).** `resilienceSettings.requestQueue.maxQueueDepth`
eyni provider+connection üçün neçə sorğunun növbədə (hələ göndərilməmiş) qala biləcəyini
məhdudlaşdırır. Növbədə artıq `maxQueueDepth` sayda sorğu olduqda,
yeni sorğu `limiter.schedule()`-ə çatmazdan **əvvəl** typed
`code: "RATE_LIMIT_QUEUE_FULL"` xətası ilə dərhal rədd edilir
— beləliklə, rəddetmə az resurs tələb edir və həmin sorğu üçün istənilən sonrakı
prompt sıxışdırma / tərcümə işindən əvvəl baş verir. Standart `0` =
deaktivdir və mövcud məhdudiyyətsiz növbə davranışını qoruyur; 0–100000 aralığı ilə məhdudlaşdırılır.
Dəyəri `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) və ya
`resilienceSettings.requestQueue.maxQueueDepth` (idarəetmə paneli/API patch) vasitəsilə dəyişə bilərsiniz.

Qəbul yoxlamasının özü saf funksiyadır
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), buna görə
real Bottleneck limiter-i olmadan unit test edilə bilər.

> #6593 nömrəli məsələnin açılmasına səbəb olan RFC həmçinin `bypassCompressionOnRateLimit`
> bayrağını təklif edirdi. Bu repozitoriyanın `open-sse/services/compression/` konveyeri
> sintez edilmiş 429 cavab gövdələrində HTTP cavab sıxılması deyil, çıxış LLM sorğusunda
> prompt/kontekst sıxılmasıdır (`chatCore.ts`, təxminən
> `resolveCompressionSettings`/`selectCompressionStrategy` bloku).
> Buna görə də, literal yan keçmə bayrağına uyğun gələn kod yolu yoxdur. Həmin
> prompt-sıxılma addımı həmçinin hazırda sorğu konveyerində `withRateLimit()`-dən
> _əvvəl_ icra olunur; buna görə də növbə dolu olduğu üçün imtina zamanı onu
> keçmək məqsədilə ardıcıllığın dəyişdirilməsi bu məsələnin əhatə dairəsindən
> kənar, ayrıca və daha böyük bir dəyişiklikdir. Bu, qəsdən burada tətbiq
> **edilməyib** və CPU-ya qənaətdən əldə olunan fayda ardıcıllığın dəyişdirilməsi
> riskinə dəyərsə, sonrakı iş kimi saxlanılıb.

### Sürət Məhdudiyyətinin Avtomatik Aktivləşdirilməsi üçün Təhlükəsizlik Mexanizmi və Qoşulma Qorunması (`rateLimitProtection`)

**Avtomatik aktivləşdirmə təhlükəsizlik mexanizmi** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, standart olaraq `true`):
OmniRoute standart olaraq bütün aktiv API açarlı provayder qoşulmaları (`getProviderCategory(provider) === "apikey"`) üçün sürət məhdudiyyəti növbəsi qorunmasını avtomatik aktivləşdirir. Bu, sürətə həssas yuxarı axın API açarlarına gələn sorğuların yuxarı axında ardıcıl 429 xətalarına səbəb olmaq əvəzinə Bottleneck vasitəsilə növbəyə alınmasını və sürətinin məhdudlaşdırılmasını təmin edir. Təhlükəsizlik mexanizmi yadda saxlanılmış idarəetmə paneli parametrindən (**Settings → Resilience** / `PATCH /api/resilience`) üstün olan `RATE_LIMIT_AUTO_ENABLE` mühit dəyişəni vasitəsilə dəyişdirilə bilər (`false`/`0`/`off` deaktiv edir, `true`/`1`/`on` aktiv olmağa məcbur edir).

**Hər qoşulma üzrə `rateLimitProtection` semantikası:**
Hər qoşulma üzrə sürət məhdudiyyəti qorunması provayder qoşulmalarındakı `rateLimitProtection` məntiqi sahəsi vasitəsilə izlənilir (SQLite-da `rate_limit_protection` kimi saxlanılır):

- **Açıq şəkildə aktiv (`rateLimitProtection === true`)**: Provayder kateqoriyasından və ya avtomatik aktivləşdirmə təhlükəsizlik mexanizminin aktiv olub-olmamasından asılı olmayaraq, bu qoşulma üçün sürət məhdudiyyəti qorunması açıq şəkildə aktivləşdirilib.
- **Açıq şəkildə qeyri-aktiv (`rateLimitProtection === false`)**: Açıq şəkildə təyin edilmiş qorunmanı deaktiv edir, lakin aktiv API açarlı qoşulmanı qlobal avtomatik aktivləşdirmə təhlükəsizlik mexanizmindən **kənarlaşdırmır**. `reconcileEnabledConnections` daxilində (`open-sse/services/rateLimitManager.ts`) `false` və `undefined` ekvivalentdir: yalnız `rateLimitProtection === true` açıq şəkildə təyin edilmiş əvəzləmə kimi qəbul olunur. `rateLimitProtection` dəyəri `false` olarsa (və ya təyin edilməzsə), aktiv API açarlı qoşulma yenə də avtomatik aktivləşdirmə şərtinə uyğun gəlir və sürət məhdudiyyəti ilə qorunmağa davam edir.
- **Hər qoşulma üzrə istisna yoxdur**: Operator hazırda avtomatik aktivləşdirməni digərləri üçün aktiv saxlayaraq «bu konkret aktiv API açarlı qoşulma sürət məhdudiyyəti növbəsi qorunması olmadan işləməlidir» tələbini ifadə edə bilməz. API açarlı qoşulmaları sürət məhdudiyyəti növbələri olmadan tam şəkildə işlətmək üçün təhlükəsizlik mexanizmi qlobal səviyyədə söndürülməlidir (`RATE_LIMIT_AUTO_ENABLE=false` və ya `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Dəstəklənən yazma yolları:**

- **`POST /api/rate-limits`**: Qoşulma üçün `rateLimitProtection` parametrini dəyişdirmək məqsədilə dəstəklənən idarəetmə yazma yolu (`{ connectionId: string, enabled: boolean }`). Bunun `enabled: true` ilə çağırılması açıq qorunmanı aktivləşdirir; `enabled: false` ilə çağırılması isə açıq qorunmanı aradan qaldırır (lakin avtomatik aktivləşdirmə aktivdirsə, aktiv API açarlı qoşulmalar qlobal təhlükəsizlik mexanizmi ilə qorunmağa davam edir).
- **`PUT /api/providers/[id]`**: Qəsdən `rateLimitProtection` parametrini qəbul **etmir** və ya dəyişdirmir (#11278). Provayder qoşulması metadatasının `PUT /api/providers/[id]` vasitəsilə yenilənməsi saxlanılmış sürət məhdudiyyəti qorunması vəziyyətini heç vaxt dəyişməyəcək.

---

## 6. Yavaş axın məhsuldarlığı nəzarətçisi (#9709)

İxtiyari `resilienceSettings.streamRecovery.throughputWatchdog` qoruyucusu hələ də fraqmentlər göndərən, lakin konfiqurasiya edilmiş faydalı çıxış sürətindən aşağı səviyyədə assistent çıxışı yaradan yuxarı axını aşkarlayır. Bu mexanizm məqsədli şəkildə boşdayanma taym-autundan fərqləndirilir: nəbz siqnalları və metadata heç bir taymeri sıfırlamır və irəliləyiş hesab edilmir. O, həmçinin çıxış keyfiyyətindən asılı olmayaraq mütləq təhlükəsizlik həddi olaraq qalan sərt cəhd müddəti limitindən (#9153) fərqlənir.

Nəzarətçi dayandırma tətbiq edə bilməzdən əvvəl isinmə müddətinin, ardınca isə tam sürüşən pəncərənin tamamlanmasını tələb edir. O, Chat Completions və Responses API çıxış hadisələrindəki mətn deltalarını hesablayır (UTF-8 baytlarının konservativ aproksimasiyası), yalnız istifadə məlumatı daşıyan və boş hadisələri nəzərə almır, alət çağırışı və ya əsaslandırma hadisələri davam edərkən isə qiymətləndirməni dayandırır. Defolt olaraq deaktivdir və `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ilə aktivləşdirilə bilər; pəncərə, isinmə müddəti, minimum sürət və ölçülə bilən minimum çıxış adi dayanıqlılıq parametrlərinin normallaşdırma təbəqəsi tərəfindən məhdudlaşdırılır.

Aktiv olduqda nəzarətçinin dayandırması yalnız aktiv yuxarı axın cəhdinə tətbiq edilir. Müştəriyə görünən hər hansı bayt göndərilməzdən əvvəl mövcud eyni hesab üzrə erkən bərpa yolu cəhdi yenidən aça bilər. Təsdiqdən sonra axın heç vaxt kor-koranə təkrar oynadılmır; yalnız mövcud təhlükəsiz axınortası davametmə müqaviləsi sonluğu birləşdirə bilər. Yekunlaşdırma birdəfəlik olaraq qalır, buna görə istifadə uçotu və semaforun buraxılması təkrarlanmır.

---

## 7. Yuxarı axın statusunun yenidən ifadə edilməsi (yanlış göstərilən kvota xətaları)

**Əhatə dairəsi:** müvəqqəti kvota tükənməsini yanlış HTTP statusu ilə bildirən bir yuxarı axın şlüzü.

**Məqsəd:** klassifikasiyadan ƏVVƏL yanıltıcı statusu düzəltmək ki, aşağı axın istehlakçıları (ehtiyat mexanizmi, combo aqreqasiyası, müştəriyə təqdim olunan cavab) xətanın həqiqi, təkrar cəhd edilə bilən xarakterini görsün.

Bəzi şlüzlər MÜVƏQQƏTİ kvota tükənməsini təkrar cəhd edilə bilməyən HTTP statusu ilə bildirir. `agentrouter.org` standart `429` əvəzinə Çin dilində məzmunla (`用户额度不足` / `额度不足`) `403` (bəzən `400`) qaytarır. Claude Code kimi müştərilər `403` statusunu daimi hesab edərək sessiyanı dayandırır və düzəliş edilməzsə, ehtiyat mexanizmi bunu kvota hadisəsi əvəzinə `AUTH_ERROR` kimi təsnif edər.

**İcra:**

- Reyestr + uyğunlaşdırıcı: `open-sse/config/upstreamStatusRestatement.ts` — `applyStatusRestatement()` vasitəsilə uyğunlaşdırılan, hər provayder üçün ayrıca qaydalar siyahısı (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`).
- Çağırış yeri: `open-sse/handlers/chatCore.ts` faylındakı `providerFailure:` bloku (təxminən 3654-cü sətir), `parseUpstreamError()` xəta HTTP statusuna (`!providerResponse.ok`) malik yuxarı axın cavabını təhlil etdikdən dərhal sonra və hər hansı klassifikasiya işə düşməzdən əvvəl yerləşir ki, bütün aşağı axın istehlakçıları düzəldilmiş statusu görsün. `200` SSE axınına yerləşdirilmiş xətalar ayrıca, daha sonrakı axın təhlili yolu ilə emal edilir və bu gün bu mexanizmlə **əhatə olunmur** — bu, agentrouter-in yanlış statusu üçün hələlik lazım olmayan məlum məhdudiyyətdir (çünki həmin status xəta HTTP statusu kimi üzə çıxır).
- Təkrar cəhd uyğunluğu: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES` siyahısındadır (`open-sse/services/combo/unavailableRetryGate.ts`), buna görə yenidən ifadə edilmiş xəta işləməyən `403` kimi üzə çıxmaq əvəzinə real təkrar cəhd pəncərəsi daşıyır.
- Sintetik `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) yalnız yenidən ifadə edilmiş cavabın **müştəriyə** bildirdiyi müddətdir; bu, bağlantının daxili soyuma/bloklama müddəti deyil — həmin müddət yenidən ifadə edilmiş xətanı faktiki emal edən mexanizm tərəfindən ayrıca idarə olunur (Connection Cooldown mexanizminin artan geriçəkilmə intervalı, §2, API açarı provayderləri üçün baza `3s`; yaxud agentrouter kimi model üzrə kvota provayderləri üçün Model Lockout, §3). Router daxili olaraq təkrar cəhd üçün müştəriyə elan etdiyi 60s pəncərəsindən daha tez uyğun vəziyyətə gələ bilər — bu, xəta deyil, məqsədli ehtiyat intervalıdır.

Daimi xətalar (agentrouter-in `无权访问模型` xətası — bu modelə giriş yoxdur) HEÇ VAXT yenidən ifadə edilmir: `textMarkers` uyğun gəlsə belə, `excludeMarkers` qaydanı ləğv edir, buna görə xəta ilkin statusunu saxlayır və heç bir mexanizm onu sonsuzadək təkrar sınamır. Uyğun provayder klassifikasiya qaydası (`open-sse/config/providerErrorRules.ts` faylındakı `agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`, elan edilmiş `6h` baza soyuma müddəti) ümumi apikey kateqoriyalı `FORBIDDEN` erkən qayıdışından _əvvəl_ `checkFallbackError` (`open-sse/services/accountFallback.ts`) tərəfindən nəzərə alınır və `honorsRuleLockScope(provider)` ilə idarə olunur (#10334 — hazırda `providerErrorRules.ts` faylındakı `HONORS_RULE_LOCK_SCOPE_PROVIDERS` icazə siyahısı vasitəsilə yalnız agentrouter üçün). Qaydanın elan edilmiş 6h soyuma müddəti `fallbackResult.baseCooldownMs` kimi ötürülür, lakin yenə də əvvəlcədən mövcud olan model üzrə kvota bloklama yoluna (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, soyuma müddətinin mənbəyi istisna olmaqla #10334 tərəfindən dəyişdirilməyib) daxil olur: hər bir digər model bloklamasında olduğu kimi, operatorun `mlSettings.maxCooldownMs` dəyərinə (defolt `1_800_000ms` / 30min) qədər azaldılır və _saxlanılan bloklama səbəbi_ qaydanın `"auth_error"` dəyəri deyil, əvvəlcədən mövcud olan sərt kodlaşdırılmış `"forbidden"` dəyəri olaraq qalır — başdan sona yalnız soyuma müddəti nəzərə alınır, səbəb sətri yox. Bağlantının özü aktiv qalır; eyni bağlantıdakı digər modellərə təsir göstərilmir.

Yenidən ifadə edilmiş kvota xətaları (`额度不足`) istehsal mühitində provayder qaydasına uyğun gəlir
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, özünə aid elan edilmiş gözləmə müddəti yoxdur — persistensiya qatının
miqyaslandırılmış eksponensial gecikmə üzrə standart dəyəri tətbiq olunur). #10334-dən bəri
`ProviderErrorRuleMatch` üzərindəki `scope` başdan sona istifadə olunur, lakin **yalnız**
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` icazə siyahısındakı provayderlər üçün
(`providerErrorRules.ts` — hazırda yalnız `"agentrouter"`,
`honorsRuleLockScope()` vasitəsilə məhdudlaşdırılır). Bütün digər
provayderlər üçün `scope`, #10334-dən əvvəl olduğu kimi, yalnız məlumat xarakterli olaraq qalır.
`checkFallbackError` uyğun gələn qaydanın əhatə dairəsini
`fallbackResult.ruleScope` kimi təqdim edir; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) isə `ruleScope` dəyərinin bağlantı miqyasında, öz-özünə bərpa olunan
siqnal kimi nəzərə alınmasının həqiqətən təhlükəsiz olduğunu təsdiqləyən ortaq yoxlamadır
(əhatə dairəsi `"connection"`, səbəb `quota_exhausted`, heç vaxt `permanent` deyil,
heç vaxt `creditsExhausted` deyil — gələcəkdə `"connection"` əhatə dairəsini
daimi hesab vəziyyəti ilə əlaqələndirən qaydaya qarşı müdafiədir). Ondan iki istehlakçı istifadə edir:

- **Persistensiya** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  agentrouter `passthroughModels: true` olduğu üçün → `hasPerModelQuota()`
  `true` qaytardığından, tranzit provayderin **hər model üzrə** bloklama
  qoluna düşmək əvəzinə **müvəqqəti bağlantı gözləmə müddəti** tətbiq edir —
  `testStatus: "unavailable"` + `rateLimitedUntil`, heç vaxt terminal status
  (`credits_exhausted`/`banned`/`expired`) deyil — beləliklə, bağlantı
  gözləmə müddəti bitdikdən sonra əl ilə etimadnamə sıfırlanmasını tələb etmək əvəzinə
  öz-özünə bərpa olunur. `disableCooling: true` olan bağlantılar üçün
  ötürülür (#2997): bu imtina seçimi əvəzində hər model üzrə bloklamaya keçir
  (sənədləşdirilmiş kompromisdir — qolun üstündəki kod şərhinə baxın).
- **Eyni sorğu daxilində kombinasiya marşrutlaşdırması** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): eyni yoxlama bağlantını
  `${provider}:${connectionId}` açarı ilə yaddaşdaxili `exhaustedConnections`
  çoxluğunda işarələyir. Bu, yalnız qalan EYNİ-SORĞU hədəfinin _öz hədəf
  obyektində artıq məhz həmin `connectionId` dəyəri olduqda_ onu ötürür
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` — `exhaustedConnections` axtarışından əvvəl) — qardaş
  hədəflərin özlərinə bərkidilmiş `connectionId` daşımadığı və dəyərin yalnız hər göndəriş üzrə
  cavabın `X-OmniRoute-Selected-Connection-Id` başlığından müəyyən edildiyi adi
  model siyahısı kombinasiyası heç vaxt həmin açarla uyğunlaşmır. Bu ümumi
  halda qalan qolun indicə tükənmiş hesabdan təkrar istifadəsinə qarşı həqiqi
  qoruma bu Set DEYİL — yuxarıdakı persistensiya qatının
  (bağlantının `rateLimitedUntil` dəyəri artıq gələcəkdədir) eyni yoxlamanın
  xəta üçün `transientRateLimitedProviders` dəyərini boğması ilə birləşməsidir
  (`targetExhaustion.ts` daxilindəki `isAgentrouterConnectionQuotaScope`
  qoluna aid kod şərhinə və aşağıdakı "İki mərhələli dizayn" bölməsinə baxın):
  həmin Set işarələnmədikdə `combo.ts` faylındakı `allowRateLimitedConnection`
  məcburi icazəsi (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`)
  provayderin qalan qolları üçün işə düşmür; buna görə etimadnamə seçiminin
  `rateLimitedUntil` filtri (`src/sse/services/auth.ts:1238`) normal şəkildə
  nəzərə alınır və qalan qol ya fərqli, hələ də uyğun agentrouter
  bağlantısını seçir, ya da əlçatan etimadnamə olmadığı üçün uğursuz olur —
  bu qolun indicə gözləmə rejiminə keçirdiyi bağlantıya məcburi şəkildə qayıtmır.

### İki mərhələli dizayn: statusun yenidən ifadəsi, sonra təsnifat

Statusun yenidən ifadəsi (`upstreamStatusRestatement.ts`) və provayder
təsnifat qaydaları (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) həm provayder identifikatorunu, həm də mətn markerlərini açar kimi
istifadə edən ayrı reyestrlərdir, lakin onlar fərqli yerlərdə işləyir və fərqli
məqsədlərə xidmət edir: yenidən ifadə `chatCore.ts` daxilində HTTP statusunu erkən mərhələdə
yenidən yazır; təsnifat qaydaları isə `checkFallbackError()` daxilində
ehtiyat `reason` dəyərini və kilid `scope` dəyərini
(`model` / `provider` / `connection`) seçir
(`open-sse/services/accountFallback.ts`).

Təsnifat qaydaları yalnız `providerErrorRules.ts` daxilindəki
`FULL_TEXT_RULE_PROVIDERS` icazə siyahısında göstərilən provayderlər üçün tam xəta
**mətnini** görür (`额度不足` kimi gövdə markerlərinə uyğun gəlmək üçün lazımdır) —
hazırda yalnız `"agentrouter"`. Bütün digər **daxili kataloq** provayderləri üçün
`checkFallbackError`, `getProviderErrorRuleMatch` funksiyasına yalnız strukturlaşdırılmış
xətanı (`{code, type}`) ötürür; bu, başlıq/status/kod əsaslı qaydalar üçün
kifayətdir, lakin gövdə mətni markerlərini görə bilmir.
`resolveRuleMatchBody()` köməkçisi bu seçimi həyata keçirir: icazə siyahısındakı
provayderlər üçün tam xəta mətni, digərləri üçün isə strukturlaşdırılmış xəta.
**Daxili** provayderin `FULL_TEXT_RULE_PROVIDERS` siyahısına əlavə edilməsi
hər provayder üzrə açıq seçimdir — bu, siyahıda olmayan hər provayder üçün
standart yolun bayt-bayt dəyişməz qalmasını təmin etmək məqsədi daşıyır.

Qaydanın `scope` dəyəri (`model` / `provider` / `connection`)
`FULL_TEXT_RULE_PROVIDERS` seçimindən ayrıdır: `checkFallbackError` onu yalnız
`fallbackResult.ruleScope` kimi təqdim edir və aşağı axındakı istehlakçılar
onu məlumat xarakterli etiketdən fərqli şəkildə yalnız eyni fayldakı
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` icazə siyahısında olan provayderlər üçün nəzərə alır
(`honorsRuleLockScope()` vasitəsilə məhdudlaşdırılır — hazırda yalnız
`"agentrouter"`). Provayder həmin icazə siyahısında olduqdan sonra
`scope: "connection"` uyğunluğunun əslində nə etdiyini öyrənmək üçün yuxarıdakı
"Yenidən ifadə edilmiş kvota xətaları" bölməsinə baxın.

**#11104 — operator tərəfindən elan edilən qaydalar hər iki icazə siyahısından yan keçir.** Operator bu faylı redaktə etmədən `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
vasitəsilə icra zamanı hər provayder üçün ayrıca qayda elan edə bilər. Operator qaydasını daxili kataloq qaydalarının **standart** davranışını qorumaq üçün nəzərdə tutulmuş
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` icazə siyahıları ilə məhdudlaşdırmaq, qaydanın elan edilməsinin artıq operatorun açıq şəkildə razılıq verməsi olduğunu nəzərə alsaq, parametrlər mexanizmini orada artıq sadalanmış provayderlərdən başqa bütün provayderlər üçün təsirsiz edərdi. Həm `resolveRuleMatchBody()`, həm də `honorsRuleLockScope()` əvvəlcə
`hasOperatorRuleForProvider()` yoxlamasını aparır: operator qaydası olan provayder xam xəta mətnini əldə edir və onun elan edilmiş `scope` dəyərinə hər iki icazə siyahısından hər hansı birində olub-olmamasından asılı olmayaraq riayət edilir.

**Məlum boşluq — HTTP 400 üçün `providerRuleRegistry` heç vaxt yoxlanılmır.**
`checkFallbackError` funksiyasının `BAD_REQUEST` budağı status 400-ü tamamilə öz nümunə massivləri (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` və s., `accountFallback.ts` daxilində) vasitəsilə təsnif edir və ondan yuxarıdakı `configuredRule`/`getProviderErrorRuleMatch` budağına çatmazdan əvvəl nəticə qaytarır.
`status: 400` olan daxili kataloq qaydası (və ya operator qaydası) sintaktik baxımdan düzgündür, lakin heç vaxt işə düşməyəcək. Hazırda mövcud qaydaların heç biri 400-ü hədəfləmir, buna görə istehsal mühitində heç nə təsirlənmir — lakin gələcək 400 qaydası əvvəlcə bu budağa toxunmağı tələb edəcək; bu isə qayda əlavə etməkdən daha böyük dəyişiklikdir (nümunə massivi davranışına artıq güvənən hər bir provayder üçün 400-ü yenidən təsnif edir) və tək provayder üçün qayda əlavə edilməsinin əhatə dairəsindən kənardadır.

### Kvotanı yanlış ifadə edən yeni şlüzün əlavə edilməsi

1. `statusRestatementRegistry` daxilində bir qayda massivi qeydiyyatdan keçirin
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` dəyərlərini
   provayderə xas saxlayın; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) ilə üst-üstə düşən ümumi ingilis ifadələrini heç vaxt təkrar istifadə etməyin.
2. Düzgün kilid əhatə dairəsini seçmək üçün istəyə bağlı olaraq
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) daxilində təsnifat qaydalarını qeydiyyatdan keçirin (`connection` hesab miqyaslı kvota üçün, `model` isə modelə görə xətalar üçün). Bu addım istehsal mühitində yalnız qaydaları tam xəta mətninə (gövdə markerlərinə) ehtiyac duyan provayderlər üçün qüvvəyə minir: provayder identifikatorunu eyni fayldakı `FULL_TEXT_RULE_PROVIDERS` siyahısına əlavə edin — əks halda `checkFallbackError` qaydaya yalnız strukturlaşdırılmış
   `{code, type}` xətasını ötürür və gövdə mətninə əsaslanan qayda canlı trafikdə heç vaxt uyğun gəlmir.
   Yalnız `status`/`headers` əsasında uyğunluq tapan qaydalar (Opencode və ya Minimax qaydaları kimi) bu aktivləşdirməni tələb etmir. Bundan ayrıca, qayda
   `scope: "connection"` elan edirsə və məqsəd sadəcə məlumat xarakterli etiket deyil, faktiki bağlantı miqyaslı gözləmə müddəti və eyni sorğu daxilində kombinasiya keçididirsə, provayder identifikatorunu eyni fayldakı `HONORS_RULE_LOCK_SCOPE_PROVIDERS` siyahısına əlavə edin — bu, `markAccountUnavailable()` (`src/sse/services/auth.ts`) daxilindəki `isAgentrouterConnectionQuotaScope()` tipli istehlakı və
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) funksiyasını idarə edir; bunsuz `scope`
   hələ də `fallbackResult.ruleScope` vasitəsilə ötürülür, lakin heç nə ona əsasən hərəkət etmir.
3. `tests/unit/upstream-status-restatement.test.ts`
   və `tests/unit/agentrouter-error-rules.test.ts` fayllarını nümunə götürərək vahid testləri əlavə edin (daimi olmama / `creditsExhausted` olmama qoruyucuları və — əgər provayderə icazə siyahısı lazımdırsa — `resolveRuleMatchBody()` funksiyasının yalnız həmin provayder üçün tam mətni qaytardığını təsdiqləyən test daxil olmaqla).

`chatCore.ts`, `classifyError` və ya kombinasiya kodunda heç bir dəyişiklik tələb olunmur.

#### Çıxış üzrə qruplaşdırılmış kilid (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` siyahısındakı provayderlər (opencode ailəsi) IP üzrə qruplaşdırılmış yuxarı axın kimi qəbul edilir (opencode-un pulsuz səviyyəsi hesab üzrə deyil, IP üzrə qruplaşdırılıb — baxın: #9611): `quota_exhausted`
**və ya** `rate_limit_exceeded` kimi təsnif edilmiş status-429, rotasiya onları sınamazdan əvvəl son məlum çıxış IP-si uğursuz bağlantının IP-si ilə uyğun gələn, icazə siyahısındakı ailəyə aid bütün bağlantıları gözləmə rejiminə keçirir
— beləliklə, uğursuz olacağına zəmanət verilən N-1 yuxarı axın çağırışının qarşısı alınır (#10460/#10525 ilə eyni quruluş).
`rate_limit_exceeded` qəsdən daxil edilib: `markAccountUnavailable`
yolunda opencode-a xas qaydalar heç vaxt uyğun gəlmir (`checkFallbackError` funksiyasına başlıqlar/gövdə ötürülmür, opencode `FULL_TEXT_RULE_PROVIDERS` siyahısında deyil), buna görə gövdəsində abunə kvotası mətni ("monthly usage limit
reached") olan 429, `status_429` qaydasına çatmamışdan əvvəl kvota mətni ehtiyat mexanizmi
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 saatlıq gözləmə müddəti) tərəfindən `quota_exhausted` kimi təsnif edilir — kvota mətni olmayan 429 isə (adi sürət məhdudlaşdırması) `status_429` qaydası vasitəsilə `rate_limit_exceeded` kimi təsnif edilir və yenə də IP ailəsini gözləmə rejiminə keçirir. İcazə siyahısındakı provayder üçün IP üzrə qruplaşdırılmış sürət məhdudiyyəti tükənmiş kvota ilə eyni siqnaldır. Faktiki məhdudiyyətlər:

- **Ən yaxşı səy prinsipi**: kilid bağlantının son məlum `egress_ip`
  dəyərini `proxy_logs`-dan müəyyən edir (24 saatlıq pəncərə, sinxron, keşsiz).
  Soyuq keş (`egress` IP-si heç vaxt yoxlanılmayıb) və ya sətrin olmaması →
  uğursuz bağlantı yenə də budaq tərəfindən soyutma rejiminə keçirilir (indiki
  kimi qeydə alınır), sadəcə heç bir əlaqəli bağlantı kilidlənmir.
- **Heç vaxt terminal deyil**: soyutma yenilənən kvota pəncərəsidir
  (`testStatus: "unavailable"`); IP səviyyəli siqnaldan heç vaxt daimi vəziyyət
  çıxarılmır. `disableCooling` bağlantıları bu budağı tamamilə ötürür.
- **İcazə siyahısındakı ailə üçün kilid qranulyarlığı dəyişir**: bu, yalnız
  əlaqəli bağlantı optimallaşdırması deyil, əhatə dairəsi dəyişikliyidir.
  opencode `passthroughModels` provayderidir, buna görə də bu budaqdan əvvəl 429
  hər MODEL üzrə kilidlənmə yaradırdı; indi isə bağlantının soyudulmasını
  yaradır — hətta heç bir əlaqəli bağlantısı olmadan tək bağlantı işlədən
  operator üçün belə. Bu, opencode qaydalar cədvəlinin artıq düzgün elan etdiyi
  qranulyarlıqdır (`scope: "connection"`, `providerErrorRules.ts`), lakin
  opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS` daxilində olmadığı üçün indiyədək
  heç vaxt tətbiq edilməyib. Budaq bağlantı əhatəli agentrouter budağını
  təkrarlayaraq uğursuz bağlantının soyutmasını + `backoffLevel` dəyərini özü
  yazır və geri qayıdır — aşağıdakı hər model üzrə blok və ümumi yol heç vaxt
  icra edilmir.
- **Combo daxildir**: agentrouter budağında olduğu kimi, əhatə dairəsi combo
  çağıranın 429-a tətbiq etdiyi `persistUnavailableState`/`isCombo`
  zəiflətməsini qəsdən nəzərə almır. Hər model üzrə kilidlənmə bu əhatə
  dairəsinin daha zəif forması deyil, yanlış vahiddir: tükənmiş IP barədə heç
  nə bildirmir, buna görə combo rotasiyası hər əlaqəli bağlantı üçün zəmanətli
  şəkildə uğursuz olacaq bir çağırışı sərf etməyə davam edərdi.
- **Əlaqəli bağlantıların təhlükəsizliyi**: artıq terminal vəziyyətdə olan
  (banned/credits_exhausted) və ya daha uzun soyutma rejimində olan əlaqəli
  bağlantının üzərinə heç vaxt yazılmır.
- **Eksklüziv icazə siyahısı**: `EGRESS_BUCKETED_LOCK_PROVIDERS` siyahısının
  genişləndirilməsi sahibin açıq qərarıdır; ümumi qoşulma yoxdur
  (nümunə #10334/#10419). Əlaqəli bağlantı sorğusu həmin icazə siyahısını SQL
  literalı kimi təkrarlamaq əvəzinə ona bağlanır, beləliklə onun
  genişləndirilməsi bir sətirlik dəyişiklik olaraq qalır.
- **Hər iki istiqamətdə egress IP rotasiyası**: axtarış pəncərəsi (24 saat)
  egress-IP keşinin TTL müddətindən (5 dəq) xeyli genişdir, buna görə “son məlum
  IP” cari vəziyyət deyil, tarixçədir. Bağlantının proksisi bu pəncərə ərzində
  rotasiya edibsə, kilid həqiqətən paylaşılan IP-ni **gözdən qaçıra** bilər
  (qeydə alınmış IP yeni, tükənməmiş IP-dir) — simmetrik olaraq isə tükənmiş
  IP-dən artıq uzaqlaşmış **əlaqəli bağlantını soyutma rejiminə keçirə** bilər.
  İkinci hal həmin əlaqəli bağlantıya bir soyutma pəncərəsi bahasına başa gəlir;
  hər iki hal tarixçəyə əsaslanan axtarışın qəbul edilmiş ən yaxşı səy
  məhdudiyyətləridir.
- **Xərc**: `proxy_logs` üzərində iki məhdud skan (pəncərə üzrə
  `idx_pl_timestamp` vasitəsilə filtrlənir), yalnız 429 tezliyində. Yeni indeks
  yoxdur (miqrasiya 134 YAGNI). Orta ölçülü real trafik verilənlər bazasının
  nüsxəsində ölçülüb; yüksək ötürmə qabiliyyətli instans eyni pəncərədə
  mütənasib olaraq daha çox sətir saxlayır.

---

## Digər Dayanıqlılıq Xüsusiyyətləri

- **20 marşrutlaşdırma strategiyası** (prioritet, çəkili, növbəli, kontekst ötürülməsi, əvvəlcə doldurma, p2c, təsadüfi, ən az istifadə olunan, xərc baxımından optimallaşdırılmış, sıfırlanmanı nəzərə alan, sıfırlama pəncərəsi, ehtiyat tutum, kvota üzrə çəkili, sərt təsadüfi, avtomatik, lkgp, kontekst baxımından optimallaşdırılmış, keş baxımından optimallaşdırılmış, birləşdirmə, konveyer) — baxın: [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Sıfırlanmanı nəzərə alan marşrutlaşdırma** (v3.8.0) — bağlantıları kvotanın sıfırlanma vaxtına görə prioritetləşdirir.
- **Fon rejiminin zəiflədilməsi** — Responses API `background: true` xəbərdarlıqla sinxron rejimə keçirilir.
- **Dinamik alət limiti aşkarlanması** — alət sayı limitinə çatdıqda provayderlərdən istifadənin intensivliyini azaldır.
- **Fövqəladə ehtiyat mexanizmi** — `OMNIROUTE_EMERGENCY_FALLBACK` ilə idarə olunur; operatorlar onu yenidən başlatmadan Feature Flags səhifəsindən dəyişə bilərlər.

---

## Sazlama

- Çəkili kombinasiya `503 all_targets_cooling_down` cavabı verir (`Retry-After` təyin edilib, `diagnostics.excluded` isə hər bir hədəfi `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` səbəbləri ilə sadalayır) → hovuz konfiqurasiya edilib və qoşulub, sadəcə hər bir hədəf dayanıqlılıq taymeri tərəfindən istisna edilib; `[COMBO] Weighted selection: every target excluded before dispatch — …` xəbərdarlığı səbəbləri və qalan saniyələri göstərir. Eyni kombinasiyadan gələn `404 no_executable_targets` cavabı heç bir dayanıqlılıq taymerinin işə düşmədiyini bildirir (icra ediləcək heç nə yoxdur və ya hər hesab əlçatanlıq yoxlamasından keçməyib). `targetResolution.ts` daxilində toplanmış istisnalar əsasında `open-sse/services/combo/pinRecovery.ts` daxilində yaradılıb.
- Provayder üçün bütün açarlar ötürülüb → həm dövrəqıranın vəziyyətini, həm də hər bir bağlantının `rateLimitedUntil`/`testStatus` dəyərlərini yoxlayın.
- Sıfırlama müddətindən sonra provayder həmişəlik istisna edilir → kod `getStatus()`/`canExecute()` əvəzinə birbaşa `state` oxuyur.
- Bir açar uğursuz olur, digərləri işləməlidir → dövrəqıran əvəzinə bağlantının soyuma müddətinə üstünlük verin.
- Yalnız bir model uğursuz olur → bağlantının soyuma müddəti əvəzinə model bloklanmasına üstünlük verin.
- Vəziyyət öz-özünə bərpa olunmalıdır, lakin olunmur → gələcək zaman damğasının olub-olmadığını və vaxtı bitmiş vəziyyəti yeniləyən oxuma yolunu yoxlayın. Daimi statuslar əl ilə dəyişiklik tələb edir.

---

## TLS Barmaq İzi və Gizlilik

Provayderə xas gizlilik (JA3/JA4, CCH, qarışdırma) ayrıca sənədləşdirilib — `docs/security/STEALTH_GUIDE.md` sənədinə baxın (git; `/docs` daxilində kompilyasiya edilməyib).

---

## Dayanıqlılıq Sınaqları (Mərhələ 8 · Blok C)

Dayanıqlılıq məntiqi üçün vahid testlərdən əlavə, üç test real gərginlik/nasazlıq şəraitində icra mühitini sınaqdan keçirir (hamısı inteqrasiya/gecə testləridir — heç biri PR-ları bloklamır):

| Test                      | Nəyi yoxlayır                                                                                                                                                                                                                                | İcra əmri                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Xaos                      | Saxta yuxarı axın qovşağı real gecikmə/sıfırlama/vaxt aşımı/503 əlavə edir; avtomatik qoruyucunun açıldığını/bərpa olunduğunu və `checkFallbackError` funksiyasının 503-ü bərpa edilə bilən alternativə keçid kimi təsnif etdiyini yoxlayır. | `RUN_CHAOS_INT=1 npm run test:chaos`  |
| Heap artımı               | `--expose-gc` altında hər `createSSEStream` üçün ~500 axın; heap müəyyən edilmiş həddi keçərsə, test uğursuz olur (OOM qoruyucusu #3069).                                                                                                    | `npm run test:heap`                   |
| k6 uzunmüddətli yük testi | `/api/monitoring/health` ünvanına davamlı yük; p95/xəta hədləri.                                                                                                                                                                             | `k6 run tests/load/k6-soak.js` (gecə) |

`.github/workflows/nightly-resilience.yml` tərəfindən idarə olunur (cron + əl ilə işə salma). Standart
`test:integration` zamanı xaos və heap testləri öz-özünə ötürülür (`RUN_CHAOS_INT`/`--expose-gc` olmadıqda).

---

## Həmçinin baxın

- [Arxitektura təlimatı](./ARCHITECTURE.md) — Sistem arxitekturası və daxili mexanizmlər
- [İstifadəçi təlimatı](../guides/USER_GUIDE.md) — Provayderlər, kombinasiyalar, CLI inteqrasiyası
- [Avtomatik kombinasiya mühərriki](../routing/AUTO-COMBO.md) — 16 amilli qiymətləndirmə, rejim paketləri
