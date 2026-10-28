# Resilience Guide (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute nwere usoro resilience atọ dị iche iche mana metụtara ibe ha. Nke ọ bụla nwere oke na ebumnuche dị iche. Jide ha iche iche mgbe ị na-edozi omume routing.

![Ihe nlereanya resilience nke ọkwa atọ](../diagrams/exported/resilience-3layers.svg)

> Isi mmalite: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Mgbochi Sekiti Provider

**Oke:** provider niile (dịka `glm`, `openai`, `anthropic`).

**Ebumnuche:** kwụsị iziga traffic na provider na-adà ugboro ugboro na ogo upstream/ọrụ.

**Nmejuputa:**

- Klasu bụ isi: `src/shared/utils/circuitBreaker.ts`
- Njikọta: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API ọnọdụ: `GET /api/monitoring/health`
- API nrụzigharị: `POST /api/resilience/reset`
- Ihe mkpuchi: `open-sse/services/accountFallback.ts`
- Tebulu DB: `domain_circuit_breakers`

**Ọnọdụ:**

- `CLOSED` — a na-anabata traffic nkịtị
- `DEGRADED` — a ka na-anabata traffic, mana a na-esochi ndaa nke provider rịgoro elu; ọ na-alaghachi na `CLOSED` mgbe ihe ịga nke ọma zuru ezu, mgbe ule njikọ ziri ezi gafere, ma ọ bụ mgbe njide `OPEN` kacha ogologo maka ụdị ndaa ikpeazụ gachara (urụ `cooldownByKind` ya, ma ọ bụ `resetTimeout`, × `maxBackoffMultiplier`, opekata mpe otu oge cooldown) n'enweghị ndaa ọhụrụ
- `OPEN` — egbochiri provider nwa oge; combo routing na-agafere ya
- `HALF_OPEN` — oge nrụzigharị agafeela; a na-anabata arịrị nyocha

**Ndabara nke enwere ike ịhazigharị (`open-sse/config/constants.ts`, a na-egosi na Dashboard → Settings → Resilience):**

| Klasu   | Na-abanye DEGRADED na | Na-emeghe na | Oge nrụzigharị |
| ------- | --------------------- | ------------ | -------------- |
| OAuth   | ndaa 5                | ndaa 8       | 60s            |
| API-key | ndaa 7                | ndaa 12      | 30s            |
| Local   | enweta ya site        | ndaa 2       | 15s            |

`degradationThreshold` na-achịkwa oge provider na-abanye na `DEGRADED`; `failureThreshold` na-achịkwa oge ọ na-emeghe wee bụrụ nke a na-agafere. A ka adjị egosi profaịlụ provider Local na ibe ntọala Resilience.

**Koodu ndị na-akpali (trip):** naanị ọnọdụ nke ogo provider `[408, 500, 502, 503, 504]`. EGBULA akpali maka njehie nke ogo akaụntụ (ọtụtụ 401/403/429 — ndị ahụ bụ nke cooldown ma ọ bụ lockout).

**Nweghachite n'ụzọ nwayọọ:** mgbe `OPEN` gụsịrị oge, `getStatus()`, `canExecute()`, `getRetryAfterMs()` na-emelite ọnọdụ ka ọ bụrụ `HALF_OPEN`. Ịgụ otu ahụ (na ndaa na-esote) na-ebelata `DEGRADED` ochie laghachi na `CLOSED`. Achọghị timer nke azụ.

---

### Provider Cooldown zuru ụwa ọnụ nke nhọrọ onwe (ọnụ ụzọ windo)

Ọkwa nke anọ, nke **nhọrọ onwe** (`PROVIDER_COOLDOWN_ENABLED`, ndabara **gbanyụrụ**) na-echekwa ncheta nke gafee arịrị banyere provider ndị na-adà na `open-sse/services/providerCooldownTracker.ts`, nke nkwubi ihe mgbaru ọsọ combo na-arịọ aka, ka arịrị combo ndị na-eso ibe ha kwụsị ịgaghari ọzọ provider nke dara na-adịbeghị anya. Ntinye nke ogo provider na-erubere ọnụ ụzọ windo nke `PROVIDER_PROFILES` isi:

| Profaịlụ | na-akpali mgbe (`providerFailureThreshold`) | n'ime (`providerFailureWindowMs`) | na-adị jụụ ruo (`providerCooldownMs`) |
| -------- | ------------------------------------------: | --------------------------------: | ------------------------------------: |
| OAuth    |                                        `10` |                           `15min` |                                `5min` |
| API key  |                                        `15` |                           `30min` |                               `10min` |

N'okpuru ọkọlọtọ ahụ, **anaghị** agụ provider dị ka nke na-adị jụụ; ihe ịga nke ọma na-ehichapụ windo ahụ. Ntinye nke ogo njikọ (`provider:connectionId`) kama na-ejide backoff exponential nke `minRetryCooldownMs → maxRetryCooldownMs`. Ihe ndị na-anọchi anya: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Nchekwa regression: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Oge Nkwụsịtụ Njikọ

**Oke:** otu njikọ/akaụntụ/igodo nke otu onye na-enye.

**Ebumnuche:** gafere otu igodo na-adịghị mma ka njikọ ndị ọzọ nke otu onye na-enye ahụ na-aga n'ihu na-eje ozi.

**Nhazi:**

- Ika ka ọ dịghị: `src/sse/services/auth.ts::markAccountUnavailable()`
- Nhọrọ: `getProviderCredentials*` n'otu faịlụ ahụ
- Ịgbakọ oge nkwụsịtụ: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ntọala: `src/lib/resilience/settings.ts`

**Ogbe maka njikọ ọ bụla:**

- `rateLimitedUntil` — akara oge ruo mgbe oge nkwụsịtụ ga-agwụ
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ọnụ ọgụgụ backoff exponential

**Oge nkwụsịtụ ndabara:**

- OAuth ndabara: 5s
- API-key ndabara: 3s
- API-key 429: na-ahọrọ ndị isi `Retry-After`/reset nke upstream ma ọ bụ ederede reset a pụrụ ịgụ
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Nchekwa megide thundering-herd:** na-egbochi ọdịda ndị na-eme n'otu oge izu oke ịgbatị oge nkwụsịtụ karịrị ọ dị mkpa ma ọ bụ ịgbakwụnye `backoffLevel` ugboro abụọ.

**429 nke oke concurrency anaghị arịgo nzọụkwụ backoff.** Otu `429` nke ahụ ya na-akọ oke
concurrency ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) pụtara na akaụntụ ahụ dị mma ma na-arụsi ọrụ ike.
`checkFallbackError()` na-enye ihe mere bụ `concurrency_limited`: gafee njikọ
na-esote ozugbo, jụọ nke a oge `CONCURRENCY_LIMIT_COOLDOWN_MS` kwụsie ike (1s) ma ọ bụ
ntụziaka retry nke upstream, debe `backoffLevel` ka ọ ghara ịgbanwe, debe `skipProviderBreaker`.
Ahụ quota a kapịrị ọnụ ka na-emeri, ya mere ahụ nke kwekọrịta ụdị quota na-anọgide dị ka ikpe
quota. Nchọpụta: `looksLikeConcurrencyLimit()` na `src/shared/utils/classify429.ts`;
ikpe: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()`
(`FailureKind` nke breaker) adịghị agbanwe ma ka na-agụ `rate_limit` maka ahụ ndị a.

**Nkwụsị ọdịnaya stream anaghị ejụ akaụntụ.** Mgbe nlekọta nkwụsị ọdịnaya
(`open-sse/utils/streamHandler.ts`) kwụsịtụrụ stream nke ezighị mmepụta model ọ bụla
n'oge, `markAccountUnavailable()` na-edekọ njehie ahụ na njikọ ahụ ma anaghị edobe
oge nkwụsịtụ: nkwụsị ahụ bụ nke arịrị ahụ, nke ọtụtụ ugboro bụ otu ntụgharị reasoning
ogologo nke na-enwebeghị mmepụta ọ bụla. Ndị na-arụ ọrụ nwere ike ịhọrọ ịlaghachi na ya site na
`resilienceSettings.streamStallCooldown.enabled`
(ndabara `false`).

**Ihe ngosi latency nke bụ opt-in maka nhọrọ akaụntụ `p2c`.** Nnwa ọ bụla e zipụrụ na-edekọ
oge ọ ruru ruo byte mbụ na nsonaazụ ya maka njikọ ọ bụla (na maka njikọ + model) n'ime
windo na-agagharị n'ime nchekwa: ihe nlere 20 ikpeazụ n'ime nkeji 15
(`open-sse/services/connectionLatencyTracker.ts`, edekọtara site na `safeLogEvents()` na
`src/sse/handlers/chatHelpers.ts`). Mgbe `resilienceSettings.p2cLatency.weight` karịrị `0`
(oke 0-20, ndabara `0` = gbanyụrụ), `compareP2CConnections()` na `src/sse/services/auth.ts` na-agbakwụnye
ruo ihe `weight` n'ọnụ ọgụgụ onye asọmpi ọ bụla n'ime abụọ ahụ. Ọkara nke ya sitere na latency dị ka
nkesa metụtara onye asọmpi na-arụ ọrụ ngwa karịa ya (nke nwayọọ ugboro abụọ na-ewere ọkara ahụ
niile) na ọkara sitere na ọnụego njehie na-agagharị.
Okwu ahụ na-arụ ọrụ naanị mgbe ndị asọmpi abụọ ahụ nwere opekempe ihe nlere 3, ka e ghara ịta
akaụntụ ọhụrụ ahụhụ, ma oke elu ya ka dị n'okpuru ntaramahụhụ quota-blocked na
quota-exhausted. Ọ naghị etinye circuit nke ya: akaụntụ ndị na-adịda ka oyi nkwụsịtụ,
igbachi na breaker na-elekọta. Hazie ya site na `PATCH /api/resilience`
`{ "p2cLatency": { "weight": 10 } }`.

**Frame reasoning na-amaliteghachi ego nkwụsị ọdịnaya.** Model reasoning nwere ike iche echiche
ruo nkeji ole na ole tupu token mbụ ya a hụrụ anya: Claude na-ezipụta frame `thinking_delta`
nke ederede echiche ya nwere ike ịdị ohere, ma Responses API na-ezipụta otu ihe reasoning
n'otu n'otu. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) na-amata
frame ndị a, ma nlekọta ahụ na-amaliteghachi ego ya n'otu ọ bụla n'ime ha kama ịkagbu
ntụgharị ahụ. Ha ka abụghị mmepụta model, ya mere ntụgharị nke gụsịrị naanị na reasoning
ka a na-akọ dị ka ohere, ma ntụgharị nke kwụsịrị reasoning ma na-eziga naanị heartbeat
ka na-akpali nlekọta ahụ.

Frame binary `reasoningContentEvent` nke Kiro nwere mbinye aka na-adịghị ohere na-edebe
ọrụ reasoning a site na executor dị ka delta `reasoning_content` ohere. Agaghị ezipụ
mbinye aka ahụ. Metadata, frame ndị na-ezughị oke na mbinye aka ohere anaghị amaliteghachi
ego ọdịnaya; oge oke stream na-arụ ọrụ nke onwe ya na ịkagbu onye ahịa ka na-arụ ọrụ
(`open-sse/executors/kiro/reasoning.ts`).

**Ọnọdụ ikpeazụ (ABỤGHỊ oge nkwụsịtụ):**

- `banned` — nke nchọpụta okwu machibidoro / machibido akaụntụ na-edobe (lee [BAN_DETECTION](../security/BAN_DETECTION.md)), na site na mmeju atọ n'usoro nke upstream maka arịrị ọ bụla (`request_rejected`, dị ka Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); otu mmeju na-ejụ naanị njikọ ahụ
- `expired` (na-agafe na ọnọdụ ikpeazụ mgbe nnwa nwere oke gafere — `EXPIRED_RETRY_MAX = 3` nwere backoff exponential — ka njehie OAuth nke oge obere nwee ike ịgwọ onwe ha tupu e kwụsịrị akaụntụ ahụ kpamkpam)
- `credits_exhausted`

Ndị a na-anọgide ruo mgbe nzere gbanwere ma ọ bụ onye na-arụ ọrụ tọgharịrị ha. Emela idewanye ọnọdụ nkwụsịtụ nke oge obere n'elu ọnọdụ ikpeazụ.

**Nweghachi nwayọọ:** mgbe `rateLimitedUntil` gafere, njikọ ahụ na-etozu oke ọzọ. Mgbe e jiri ya rụọ ọrụ nke ọma, `clearAccountError()` na-ehichapụ ogbe njehie niile.

### Mgbidi ojiji Claude OAuth: ụzọ ọkwa dị ala + ntọgharị oke session

**Oke:** otu njikọ ndebanye aha Claude (OAuth). Atụmatụ abụọ ahụ bụ **opt-in maka
njikọ ọ bụla** (Dezie njikọ → ngalaba Claude → `lowPriorityMode` / `autoLimitReset` na
`providerSpecificData`, abụọ ndabara gbanyụrụ) ma na-egosipụta omume iwu `/low-priority` na
`/limit-reset` nke Claude Code (nkwekọrịta wire e nwetara site na Claude Code 2.1.263).

**Nhazi:**

- Igwe steeti + nkewa nzaghachi: `open-sse/services/claudeLowPriority.ts`
- Client ọnọdụ ịtọgharị/claim: `open-sse/services/claudeLimitReset.ts`
- Hook executor (ịtinye header + nnwa ọzọ n'otu akaụntụ): `open-sse/executors/base.ts::execute()`
- Ịdịgide opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Ihe na-akpata:** mgbidi ojiji awa 5 — `429` nke headers ya na-ebu
`anthropic-ratelimit-unified-status: rejected` na, mgbe akaụntụ ahụ ruru eru,
`anthropic-ratelimit-unified-slow-offer: treatment`. Enweghị ihe a na-ezipụ tupu mgbidi
429 mbụ ahụ; 429 mgbawa na-enweghị unified headers na-aga n'ụzọ cooldown nkịtị.

**Ụzọ mkpa dị ala** (`lowPriorityMode`):

- Na mgbidi 429 ahụ, executor na-anabata onyinye ahụ ma na-anwa ozugbo akaụntụ **otu**
  ahụ ọzọ site na `anthropic-usage-limit: slow`; ụzọ ahụ na-anọgide na-arụ ọrụ ruo oge
  `anthropic-ratelimit-unified-reset` a kwupụtara (+60s oge amara) ma arịrị ọ bụla n'ime
  windo ahụ na-ebu header ahụ. 429 a jidere anaghị erute `handleChatCore`, yabụ a **anaghị**
  etinye njikọ ahụ na cooldown ma ọ bụ tụgharịa ya pụọ.
- `anthropic-ratelimit-unified-slow-status` na nzaghachi ndị sochirinụ: `active` /
  `not_needed` na-edebe ụzọ ahụ; `slot_busy` (429) ma ọ bụ `529` na-echere
  `anthropic-ratelimit-unified-slow-retry-after` nke sava (ndabara 20s, clamp 5–600s,
  ±30% jitter) wee nwaa ọzọ, nke `anthropic-ratelimit-unified-slow-max-wait` (ndabara
  20 min, clamp 1 min–6 h) na-agbochị oke — gafere nke ahụ ụzọ ahụ na-agwụ ma cool-off
  nke nkeji 10 na-egbochi ịnabata ọzọ. A na-agbochị oge ọchere ahụ nke ọzọ site na ihe
  fọdụrụ n'ime timeout mmalite upstream nke arịrị ahụ n'onwe ya
  (`resolveFetchStartTimeout`, 10 min n'ụzọ ndabara) wepụ oke sekọnd 5: n'enweghị oke
  ahụ, max-wait ndabara nke nkeji 20 ga-adị ndụ karịa arịrị ahụ ma a ga-akwụsị ụra ahụ
  n'etiti oge ọchere, na-egosi `TimeoutError` kama njedebe `max_wait` dị nwayọ + cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, ntụgharị windo awa 5, ma ọ bụ
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (nke na-agwụcha ya dị ka
  `extra_usage` n'ọnọdụ ọ bụla, ebe ọ bụ na overage a kwụrụ ụgwọ ugbu a na-ekpuchi mgbidi
  ahụ) na-agwụcha ụzọ ahụ; nzaghachi ahụ wee na-asọ n'ụzọ cooldown nkịtị. A na-echeta
  `budget_exhausted` ruo ịtọgharị budget a kwupụtara (≤ ụbọchị 8).
- Nlele mgbidi ahụ na-agba ọsọ mgbe nnwa ọzọ n'ime otu mbọ nke executor n'onwe ya nke 400
  na-akpali (ndezi ọdịnaya, clamp thinking/effort, auto-learn param) gachara, yabụ mgbidi
  429 nke na-apụta naanị n'otu n'ime nnwa ọzọ ndị ahụ ka a na-ejide kama ọ ga-eru ụzọ
  cooldown.
- Steeti ahụ dị na nchekwa maka njikọ ọ bụla (ịmalite ọzọ na-eri otu mgbidi 429 ọzọ iji
  nara ọzọ).

**Ịtọgharị oke oge** (`autoLimitReset`, a na-anwa ya tupu ụzọ ahụ mgbe ha abụọ nọ n'ọrụ):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blọk
  `juniper_tide`; mgbe `arm: "reset"` na `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` na
  `{ "program": "juniper_tide" }` (UUID òtù ahụ sitere na
  `providerSpecificData.organizationUUID`, fallback bootstrap).
- `result: reset|not_limited` → a na-anwa arịrị ahụ ọzọ n'ọsọ zuru oke (enweghị header
  slow). `already_used` / `not_offered` na-echeta `next_available_at` (ndabara otu izu);
  ọdịda ọ bụla na-alaghachi azụ nkeji 15. Ịtọgharị ahụ bụ otu ugboro n'izu ma ka na-agụ
  na oke izu ahụ.

Nchekwa regression: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Mmasi oge (#7274)

**Oke:** otu oge onye ahịa (header `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) kpịrịrị n'otu njikọ, maka onye na-enye **ọ bụla**.

**Ebumnuche:** idebe agent multi-turn (Claude Code, aider, ndị agent omenala) n'otu akaụntụ gafee arịrị, na-ebelata mfu ọdịnaya gafee akaụntụ na 429 mmalite oyi ugboro ugboro na ndị na-enye nwere steeti oge nke akaụntụ ọ bụla.

**Nhazi:**

- Ngwọta TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Nhọrọ/ịmepụta pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Mwepụ header (izugbe, onye na-enye ọ bụla): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tebul pin echekwara: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ntọala: `sessionAffinityTtlMs` (TTL zuru ụwa ọnụ na ms, `0` na-agbanyụ ya) — `src/lib/db/settings.ts`. A kpọgharịrị aha ya site na `codexSessionAffinityTtlMs` nke bụ naanị Codex site na migration `124_generic_session_affinity_ttl.sql`, nke na-ebufe TTL Codex ọ bụla haziri na mbụ dị ka ndabara ọhụrụ.

Tupu #7274, `resolveSessionAffinityTtlMs()` siri ike laghachi na `0` maka onye na-enye ọ bụla ma e wepụ `codex`, yabụ ntọala TTL (na headers oge ahụ) enweghị mmetụta n'ebe ọ bụla ọzọ ọbụlagodi na usoro ịkpịnịrị na mwepụ header ahụ adabereghị na onye na-enye ọ bụla. Ndochi ahụ wepụrụ early-return ahụ; TTL ugbu a na-etinye n'otu ụzọ na onye na-enye ọ bụla ozugbo e setịpụrụ ya zuru ụwa ọnụ n'elu `0`.

A naghị ezipụ headers mmasi oge atọ ahụ gaa upstream — ndị executor na-ewu headers upstream ha n'onwe ha site n'isi kama ịgafe headers onye ahịa, yabụ nke a na-anọgide dị ka id mmekọrịta ime ọnụ naanị.

### Mgbazinye njikọ oge a na-achịkwa pụrụ iche

**Oke:** otu onye ahịa/oge HTTP a na-achịkwa nke na-arụ ọrụ nwere otu njikọ OmniRoute ruuru eru.

**Ebumnuche:** inye ịnwe njikọ pụrụ iche na-adịgide maka ndị ahịa chọrọ mgbidi nhazi siri
ike gafee arịrị. Nke a dị iche na mmasi oge, nke bụ mmasị ịga n'ihu dị nwayọ:
mgbazinye pụrụ iche na-edebe steeti lifecycle na SQLite, na-akwado ịdị pụrụ iche nke
onye nwe na-arụ ọrụ na njikọ na-arụ ọrụ zuru ụwa ọnụ, ma na-ajụ ọgbọ ochie tupu iziga
onye na-enye.

Atụmatụ a bụ nke a na-ahọrọ (opt-in) maka API key ọ bụla. Key a na-achịkwa ga-enwe scope `lease:exclusive` na ndepụta `allowedConnections` kọwara nke ọma nke na-abụghị nke efu. HTTP client ọ bụla nwere ike iji endpoint lifecycle ahụ; achọghị aha client, user-agent, onye na-enye ọrụ, usoro OAuth, ma ọ bụ model. Lease ahụ nwere njikọ, ọ bụghị model, ya mere mgbanwe model na-edebe ijikọ ahụ mgbe njikọ ahụ ka na-adị irè dị ka o na-adị nkịtị. Iwu model nkịtị, quota, ahụike, cooldown, na allowlist ka na-anọgide na nke kacha ike, ha nwekwara ike ịkwaga otu generation ahụ na njikọ ọzọ dị onwe nke dị irè.

Lifecycle ahụ bụ `POST /api/v1/session-leases` nwere omume JSON `acquire`, `renew`, na `release`. Arịrịọ inference a na-achịkwa na-ewetara uru `X-OmniRoute-Lease-Owner` nke a na-apụghị ịgụ na `X-OmniRoute-Lease-Generation` ziri ezi. Onye nwe lease na-eji `vlo_` nke 43 mkpụrụedemede base64url na-eso ya; naanị hash SHA-256 ya ka a na-echekwa. Fence nzipu ikpeazụ ọ bụla na-ejikọkwa ID API key e kwadoro na ID njikọ na-arụ ọrụ. A na-ewepụ header nchịkwa lease na log, na foto arịrịọ e debere, na header onye na-agba ọsọ upstream.

Ọ bụrụ na routing nkịtị nwere ndị a na-achịkwa dị irè ma lease ọzọ na-arụ ọrụ jupụtara na onye ọ bụla dị onwe, OmniRoute na-alọghachi HTTP `429`, koodu lease-capacity-unavailable, ọnọdụ na-echere ikike, na `Retry-After` nwere ókè nke sitere na oge mmechi metụtara kacha ọsọ. Enweghị ihe dị irè nkịtị abụghị esemokwu lease; ọ na-edebe semantics njehie routing ya dị ka o dị.

Usoro ndị metụtara ka na-adị iche iche:

- Ịnọ n'ime session OAuth bụ nkesa nro nke process maka akaụntụ OAuth.
- Semaphore akaụntụ na-enye ikike arịrịọ n'otu oge ma na-agwụ mgbe arịrịọ zuru ezu.
- Lease session naanị otu onye a na-achịkwa bụ nnwere lifecycle na-adịgide adịgide nwere fence generation.

## 3. Mkpochi Model (Model Lockout)

**Oke ọkpụrụkpụ:** atọ nke provider + connection + model.

**Oke igodo dị ka ọnọdụ si dị:** ọnọdụ na-adaghị ka ọ ga-ekpebi igodo nke
mkpochi ga-edebe na ya (`resolveLockoutScope()` na `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — ihe ngosi nke quota ma ọ bụ ikike — kpuchie **ezinụlọ quota**:
  maka codex ọ bụ oke `codex` / `spark` niile (model `gpt-5*` ọ bụla nke
  connection ahụ), maka ndị provider ndị ọzọ `getQuotaScopedModelForProvider()`.
- `404` na-akpọchie model ahụ naanị ya (`getModelLockKey()` na-akpọwanyẹ `not_found`).
- Ọnọdụ ọ bụla ọzọ — ndaa `5xx` nke transport/server na `502` nke OmniRoute
  nwe onwe ya mepụtara site n'ọtụlele ọdịmma — na-akpọchie naanị **ọkọwaziri**
  atọ provider/connection/model. Iyi ọjọọ na otu model abụghị ihe akaebe
  banyere quota nke akaụntụ ahụ; tupu iwu a, otu nzaghachi efu na
  `codex/gpt-5.6-luna` wepụtara model `gpt-5*` ọ bụla nke connection ahụ
  na routing ruo nkeji 2–30 (na-arị elu) ebe quota ya ka dị ọcha.
- Nhọrọ `scope` nke onye na-akpọpụtara depụtara na-enwe ike mgbe niile (Antigravity na-agafe `"exact"`).

**Ebumnuche:** izere ime ka connection dum kwụsị ịrụ ọrụ mgbe naanị otu model adịghị ma ọ bụ nwere oke quota.

**Ihe atụ:**

- Ndị provider nke quota per-model na-eweghachite 429
- Ndị provider obodo na-eweghachite 404 maka otu model nke efughị
- Ndaa ikike mode/model nke provider kpọmkwem (dịka, ọnọdụ Grok)

**Nhazi:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard nke Model Cooldowns (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Ọ na-edepụta ndị mkpochi na-arụ ọrụ ugbu a yana: provider, connection, model, ihe kpatara, expiresAt. Ndị ọrụ nwere ike ịmalitegharị model n'aka site na kaadị ahụ.

**REST API:**

- `GET /api/resilience/model-cooldowns` — depụtara ndị mkpochi na-arụ ọrụ
- `DELETE /api/resilience/model-cooldowns` — ịmalitegharị n'aka. Ahụ: `{provider, connection, model}`. Nkwenye: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Otu ibe maka connection ọ bụla nke pụrụ na routing n'ihi ihe kpọmkwem nke oge, kama
ịmegharị ibe nke provider ọ bụla. Ọ na-edepụta cooldowns nke connection, mkpochi model na
ọnọdụ ikpeazụ, na-asachapụ ha per connection, maka nhọrọ, ma ọ bụ maka connection niile
nke otu provider, ma na-agbanwe iwu cooldown ndị a na-agbanwekarị: `streamStallCooldown.enabled` na OAuth / API-key
`connectionCooldown` nke cooldown isi na nzọụkwụ kacha elu nke backoff (na-echekwa site na
`PATCH /api/resilience`). Ọnọdụ ikpeazụ (`banned`, `expired`, `credits_exhausted`) na-egosi
ma a naghị asachapụ ha ebe a.

**REST API** (`src/lib/resilience/cooldownManager.ts`, nkwenye: management):

- `GET /api/resilience/cooldowns[?provider=]` — connections yana ọnọdụ, cooldown fọdụrụ,
  ọkwa backoff, ụdị njehie ikpeazụ na mkpochi model (enweghị nzuzo)
- `POST /api/resilience/cooldowns` — ahụ `{connectionIds: string[]}` ma ọ bụ
  `{all: true, provider?}`; na-eweghachite `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI ntọala mkpochi + mweghachi nke ibelata ihe ịga nke ọma (v3.8.23)

Mkpochi model sitere na omume nke e kụrụ ike mgbe niile gaa na njirimara nke
enwere ike nhazi dum, nke mmadụ họrọ, nke nwere kaadị ntọala ya na ụzọ mweghachi nke na-azọzọ onwe ya.

**Kaadị ntọala:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Nke a **dị iche** na `ModelCooldownsCard` nke a na-agu naanị nke dị n'elu (nke na
-ndepụta naanị_ mkpochi na-arụ ọrụ) — kaadị ọhụrụ ahụ _na-ahazi ndị ọnụ ọgụgụ_. Ndị
ezinaụlọ dị na `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Ntọala                  | Ezinaụlọ                         | Ihe ọ pụtara                                             |
| ----------------------- | -------------------------------- | -------------------------------------------------------- |
| `enabled`               | `false`                          | Mgbanwe isi — mkpochi model **gbanyụrụ na ndabara**.     |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Ọnọdụ upstream ndị na-agụ dị ka ndaa nke oke-model.      |
| `baseCooldownMs`        | `120_000` (120 s)                | Ogologo mkpochi mbụ maka ndaa mbụ.                       |
| `maxCooldownMs`         | `1_800_000` (nkeji 30)           | Oke nke cooldown rịrị elu.                               |
| `maxBackoffSteps`       | `10`                             | Nzọụkwụ kacha elu nke ịrị elu exponential-backoff.       |
| `useExponentialBackoff` | `true`                           | Ịrụ ọtụtụ ndaa na-arịkwalite cooldown n'ụzọ exponential. |

Ntọala na-adịgide site na ụlọ ọrụ ntọala nkịtị ma na-enyocha site na
skima ntọala resilience; kaadị ahụ na-akpụ `baseCooldownMs`/`maxCooldownMs`
(yana `maxCooldownMs ≥ baseCooldownMs`) na `maxBackoffSteps`.

**Mweghachi nke ibelata ihe ịga nke ọma:** mweghachi **abụghị** naanị mmebi
oge naanị ya. Nzaghachi dị mma na-ebelata ọnụ ọgụgụ ndaa nke model ahụ
ka model nke weghachiri n'etiti oge ahụ kwụsị ịrị elu (ma sachapụ) tupu oge ya
emecha. Na ebumnuche combo gara nke ọma, `open-sse/services/combo.ts` na-akpọ
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), nke **na-ekewara
ọkara** `failureCount` echekwara (`Math.floor(failureCount / 2)`); mgbe ọ ruru `0` a
na-ehichapụ ihe mkpochi dum. Nke nwere ntụgharị `recordModelLockoutFailure()`
na-agbakwụnye ọnụ ọgụgụ ahụ (ma na-arịkwalite cooldown) na ndaa nọ n'ime
oge ịrị elu. Ibelata ihe ịga nke ọma a dịkwa ma ọnụ na mmebi oge nkịtị —
ụzọ ọ bụla n'ime ha nwere ike ịmalitegharị model.

**Ọnọdụ:** a na-ejide mkpochi **n'ime nchekwa** (`Map` per-usoro nke
`ModelLockoutEntry` nke e ji igodo `provider:connectionId:model`, ndị mkpochi
oke-ọkọwaziri site na `provider:connectionId:exact:model`), a naghị edebe ha na
DB — a na-efunahụ ha mgbe e megharịrị. _Ntọala_ ka na-adịgide; _ọnọdụ_
mkpochi na-arụ ọrụ dị n'oge gachara.

---

## 4. Njikwa Ọtụtụ Arịrị Otu Oge nke Quota-Share (v3.8.36)

Akaụntụ ndebanye aha (GLM, MiniMax, wdg.) na-anabatakarị naanị ~1–3 arịrị otu oge; ịgafere nke ahụ na-akpata 429 na oge cooldown. Nke a na-adị oke njọ n'okpuru combo **quota-share** (`qtSd/…`), ebe ọtụtụ igodo API na-ekekọrịta otu akaụntụ upstream. Ọkwa atọ na-egbochi ka arịrị jupụta akaụntụ ekerịta.

### Oke arịrị otu oge maka njikọ ọ bụla (`max_concurrent`)

Njikọ onye na-enye ọ bụla nwere ike ịkwupụta oke `max_concurrent` (`provider_connections.max_concurrent`, edobere na modal njikọ / API / DB). Hapụ ya oghere maka enweghị oke. Nke a bụ otu bọtịnụ ahụ na-achịkwa ọkwa ịdobe n'usoro dị n'okpuru — debe ya na ọnụọgụ arịrị otu oge n'ezie nke akaụntụ ahụ (dịka GLM ~1, MiniMax ~2).

### Oke arịrị otu oge maka nlereanya ọ bụla (`modelConcurrency`)

Njikọ nwere ike ịkwupụtakwa oke arịrị otu oge ziri ezi maka nlereanya ọ bụla n'ime map `rateLimitOverrides` ya:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Debe ya na modal njikọ (**Ndọpụta oke ọnụego → Oke arịrị otu oge maka nlereanya ọ bụla**, otu `model=cap` n'ahịrị ọ bụla) ma ọ bụ site na `PATCH /api/providers/[id]` na otu ụdị JSON ahụ. Ọdịmma ndị igodo:

- **Nke njikọ dum vs nke nlereanya pụrụ iche:** `maxConcurrent` ka na-anọgide dị ka oke ekerịta nke njikọ dum. Mgbe ha abụọ na-adị irè, a na-enweta ụzọ abụọ ahụ otu oge n'otu ụzọ mejupụtara (`global → provider → account → model`); omume dị irè bụ oke kacha sie ike nke na-adị irè.
- **Nnabata igodo-nlereanya ziri ezi:** igodo ahụ bụ eriri nlereanya e nyefere onye na-arụ ọrụ mgbe routing dochachara — n'ọtụtụ oge ọ bụ id nlereanya upstream dị larịị (`glm-5`), ọ bụghị aha ọzọ `provider/model` n'akụkụ onye ahịa (`zai/glm-5` adabaghị na `glm-5`). Ọnụ ọgụgụ ndị ahụ bụ oke arịrị otu oge nke ọnụọgụ ezi karịa efu.
- **Nhazi ahịrị n'ebe ahụ, enweghị nchọpụta:** arịrị karịrị oke na-eche n'ahịrị n'ebe ahụ na ọdịmma ahịrị/timeout dị adị (njehie nnabata edepụtara `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute anaghị achọpụta ma ọ bụ nyochaa iwu upstream — ọ na-amanye oke ndị onye ọrụ haziri ziri ezi. Ụzọ nlereanya jupụtara anaghị agbanyụ onye na-enye ma ọ bụ mepụta mkpọchị nlereanya na-adịgide adịgide; omume upstream 429/cooldown/fallback ka na-anọgide dị ka nchekwa njehie ikpeazụ.
- **Oke nke njikọ ọ bụla, usoro ọ bụla:** oke ndị ahụ bụ nke njikọ nchekwa data ọ bụla ma e jide ha n'echeta, ya mere njikọ abụọ na-eji otu igodo API upstream ahụ ọzọ anaghị arụkọ ọrụ ọnụ.
- **Enweghị nhazi pụtara enweghị mgbanwe:** ịhapụ map ahụ (ma ọ bụ ịhapụ oghere dashboard n'efu) anaghị etinye ụzọ nlereanya ọ bụla. Nhazi nlereanya na-ekwupụtaghị oke ọ bụla zuru ụwa ọnụ nke onye na-enye:

```text
glm-5=1
glm-4.7=3
```

### Ịdobe arịrị Quota-share n'usoro

Mgbe nkesa quota-share lekwasịrị njikọ na-akpọsa `max_concurrent` dị mma, a na-edobe arịrị otu oge gaa na **akaụntụ** ahụ n'usoro site na semaphore nke njikọ ọ bụla (igodo `qsconn:<connectionId>`): arịrị karịrị oke **na-eche n'ahịrị** kama ịjupụta akaụntụ ahụ. Ọ bụ **fail-open** — ahịrị jupụtara ma ọ bụ timeout na-aga n'ihu na-enweghị ohere kama ịjụ arịrị nwere ike ịkesa ọ bụla. Gbanwee ya na **Ntọala → Nkwusi ike → Ọtụtụ arịrị otu oge nke njikọ ọ bụla nke Quota-share** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ndabara bụ ọn). Na-enweghị oke `max_concurrent`, omume ahụ adịghị agbanwe.

> Ụzọ routing quota-share (`selectQuotaShareTarget`, DRR + P2C) n'onwe ya bụ fail-open ma ọ na-_belata mkpa_ naanị njikọ ruru oke — na pool nwere naanị otu njikọ, ọ nweghị ike ịnye oke siri ike, ya mere semaphore a ka bụ nke na-egbochi ide arịrị ahụ n'ezie.

### Ịnwale ọzọ na-amata cooldown nke combo

Maka atụmatụ combo ọ bụla (mgbe e gbasara ya), arịrị ga-akpụ 429 maka cooldown nwa oge na-agafe agafe na-eche ka ọ gafee ma kesaa ọzọ kama ịweghachite 429 ahụ — nke a na-ekpuchi windo TPM/RPM klaasị Gemini (~60s retry-after) na combo ọtụtụ nlereanya, dịka ebumnuche abụọ nke combo nlereanya 2 na-akụ oke ọnụego nke nlereanya ọ bụla. Oke ya bụ `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) na **Ntọala → Nkwusi ike**. Ọ naghị eche na `quota_exhausted` (ekpochiri ruo etiti abalị) ma ọ bụ ihe mere bụ auth/not-found.

Ụzọ ahụ ka ahụ na-ekpuchi ọnọdụ tupu ekesa (#16319): mgbe a na-agafe ebumnuche ọ bụla nke combo tupu e me nnwale ọ bụla n'ihi na nlereanya ya nọ n'ọnọdụ mkpọchị nwa oge na-agafe agafe, ụzọ na-enweghị nnwale ahụ na-eche ka mkpọchị ahụ gafee n'okpuru otu oke ahụ ma kesaa ọzọ, kama ịza `503 ALL_TARGETS_SKIPPED` na-enweghị ntụzịaka. Mgbe achọtaghị ịchere (oke, nnwale ma ọ bụ ego enyere ezuola, ma ọ bụ a gbanyụrụ atụmatụ ahụ), nzaghachi ikpeazụ na-arịgo na `429 rate_limit_error` na-ebu `retry_after` / `reset_at` site na oge njedebe mkpọchị na-agafe agafe kacha nta; mkpọchị quota, auth na not-found na-edebe 503 na-enweghị ntụzịaka.

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

## 5. Nlekota Nnabata Ahịrị Arịrị (v3.8.49 · nsogbu #6593)

**Oke ọ metụtara**: ahịrị njide-ọnụego (rate-limit) nke obodo nke provider+connection ọ bụla (`open-sse/services/rateLimitManager.ts`, nke Bottleneck na-akwado), otu ọkwa n'okpuru usoro atọ dị n'elu.

**`maxWaitMs` na-agbochi oge ichere n'ahịrị; `executionMaxWaitMs` na-agbochi oge mmejuputa.** A kewapụrụ ha abụọ n'ebumnuche, ọ nweghị nke na-enye nke ọzọ ihe.

`resilienceSettings.requestQueue.maxWaitMs` bụ **ego-ekele oge ichere n'ahịrị**: ọ na-akpuchi ichere oghere provider na ịnọdụ ala n'ọnọdụ QUEUED, a na-akpochapụ elekere ya ozugbo ọrụ ahụ hapụrụ QUEUED ma bido rụọ ọrụ (`rateLimitManager.ts`, `wrappedFn`). Arịrị gafere ya agaghị eru upstream. Ndabara 30000ms, nke `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` na-enye na `src/lib/resilience/settings.ts` ma nke `tests/unit/ratelimit-admission-control-6593.test.ts` na-akpọchi, yabụ mgbanwe na ya ga-eme ka ule ahụ daa (red) kama ịhapụ paragraf a ka ọ gharalaa na sekret.

`resilienceSettings.requestQueue.executionMaxWaitMs` bụ ihe Bottleneck na-anata dị ka `expiration` nke ọrụ, nke elekere ya na-amalite naanị mgbe e zigara (dispatch) ọrụ ahụ. Ọ bụ nchedo azụ maka ndị na-arụ ọrụ (executors) na-enweghị timeout upstream nke ha, a na-ebuli ya ruo timeout mbido-fetch nke onye na-arụ ọrụ ma ọ bụrụ na nke ahụ ka ogologo, ka ọ ghara ịgbee nzaghachi dị mma nke nọ n'ụzọ (in-flight) n'etiti. Ndabara 600000ms (nkeji 10).

Itinye ego-ekele ahịrị n'ime `expiration` bụ ihe na-egbu gateway ndị na-abụghị incremental n'etiti ụzọ — ha na-arụ ọrụ n'ụzọ ziri ezi ruo nkeji ole na ole tupu byte mbụ — ọ bụkwa ya mere a na-egosi expiration dị ka `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ebe ego-ekele ahịrị na-ebu koodu queue-timeout. Gbanwee nke ọ bụla site na `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ma ọ bụ dashboard (**Nhazi → Nkwụsi Ike**). A na-akpọchi ha abụọ n'etiti 1ms–24h mgbe e mechara normalize ha.

**Usoro ibu-isi (precedence), maka ha abụọ:** env var na-enye naanị _ndabara_. Uru echekwara na `resilienceSettings.requestQueue` (dashboard / API patch, nke a na-echekwa na `key_value`) na-emeri ya, uru `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` nke connection ọ bụla na-emerikwa nke ahụ. Yabụ ịtọ env var na nkwalite (deployment) nke enwerịrị uru echekwara agaghị agbanwe ihe ọ bụla — kpochapụ ma ọ bụ melite ntọala echekwara kama.

Oge ịnọ n'ahịrị ka `maxWaitMs` gbochiri; `maxQueueDepth` dị n'okpuru na-agbochi ọnụọgụ ndị na-akpọ oku nwere ike ịnọ n'ahịrị n'otu oge.

**Nnloghachi a kpọrọ n'ahụ: ịga nwayọ (pacing) vs mgbochi (lockout).** Ahụ 429 nwere ike ịkpọ aha oge ichere ya n'onwe ya (Gemini `RetryInfo.retryDelay`, ederede "retry after Ns"), nke `updateFromResponseBody` na-agụ. Oge ichere dabara n'`maxWaitMs` nke connection bụ pacing: limiter na-ekwupụ reservoir ya ruo oge ahụ, oku ndị nọ n'ahịrị na-esi apụ (dispatch) mgbe ọ jupụtachara ọzọ. Oge ichere ka ogologo karịa `maxWaitMs` abụghị ihe ahịrị nwere ike ịnọdụ chere — Gemini na-aza quota kwa ụbọchị gwuchara na `retryDelay: "86399s"`. `Retry-After` a nyefere na 429 ewuliri ọzọ (#16528) na-eme ka fallback engine kpọchie model n'ime windo oge ahụ, ma ịkwụsị limiter maka ya ga-aga n'ihu na-egbochi oku ọ bụla ruru key ahụ n'oge (dịka ọmụmaatụ, mgbe e mere resilience reset) ruo `maxWaitMs` niile. Mgbe oge ichere dị otú ahụ si na nkọwa Google `RetryInfo` nke e depụtara (provenance `google_rpc_retry_info`) bịa, ma limiter nke key ahụ ka a kpọchiri na model (lee `getLimiterKey`), 429 ahụ ghọrọ mgbochi model na connection ahụ kama (`lockModelForLongBodyRetry` na `open-sse/services/rateLimitManager/bodyRetryPause.ts`, nke a gbochiri na 24h), a hapụrụkwa limiter ka ọ ghara ịkwụsị. Nhọrọ akaụntụ na-agafe mgbochi ahụ site na `isModelLocked()`, ọnụ ụzọ combo tupu iziga (pre-dispatch gate) maka target ndị e kpọchiri na connection na-eme otu ahụkwa. Na antigravity, nke limiter ya dị kwa ezinụlọ quota, mgbochi ahụ dị na model kpọmkwem, dị ka mgbochi quota ndị ọzọ ya. A na-akpọchikwa aha onye ahịa (client) rịọrọ mgbe alias doziri ya ka ọ bụrụ model ahụ, n'ihi na nyocha ndị ahụ na-eji aha a rịọrọ arụ ọrụ; a na-akpọchi ya kpọmkwem (`lockExactModel`), yabụ alias gafere ezinụlọ quota antigravity ma ọ bụ scope codex agaghị akpọchi nke ya. Nkọwa okwu nkịtị (prose hint), `retryDelay` na-enweghị ụdị (untyped), ma ọ bụ limiter connection niile na-ekekọrịta na-edebe nkwụsị ahụ. Mgbe limiter nke ụzọ 429 wụziri ọzọ n'ezie kwụsịrị, a na-atụfụ ozugbo onye na-akpọ nke oge ahịrị ya fọdụrụ na-agwụ tupu nkwụsị ahụ agwụ, na koodu queue-timeout (`checkLimiterPause`), kama ịchere ka oge ahụ gafee; a na-akwado njedebe edekọtara tupu e wuo limiter, ebe Bottleneck na-amalite elekere refresh ya, mgbanwe ọ bụla e mere na reservoir mgbe ahụ na-echefu ya. `tests/unit/rate-limit-long-body-retry-lockout.test.ts` na `tests/unit/rate-limit-body-retry-pause.test.ts` na-akpuchi ya.

**`maxQueueDepth` — oke nnabata nke a họrọ (opt-in) (ohuru).** `resilienceSettings.requestQueue.maxQueueDepth` na-agbochi ọnụọgụ arịrị nwere ike ịnọ n'ahịrị (a ka na-ebufeghị ha) maka otu provider+connection n'otu oge. Mgbe ahịrị ji arịrị ruru `maxQueueDepth`, a na-ajụ arịrị ọhụrụ ngwa ngwa na njehie e depụtara `code: "RATE_LIMIT_QUEUE_FULL"` **tupu** ọ rute `limiter.schedule()` — yabụ njụ ahụ dị ọnụ ala ma na-emekarị tupu ọrụ prompt-compression / ntụgharị ọ bụla nke downstream maka arịrị ahụ. Ndabara `0` = gbanyụrụ, nke na-edebe omume ahịrị-enweghị-oke dị adị; oke 0–100000. Gbanwee site na `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ma ọ bụ `resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Nyocha nnabata n'onwe ya bụ pure function (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) yabụ a nwere ike ịme ya unit test na-enweghị limiter Bottleneck n'ezie.

> RFC nke meghere #6593 tụkwara atụmatụ otu flag `bypassCompressionOnRateLimit`.
> Pipeline `open-sse/services/compression/` nke repo a bụ
> mkpakọ prompt/context na arịrịọ LLM na-apụ (`chatCore.ts`,
> gburugburu ngọngọ `resolveCompressionSettings`/`selectCompressionStrategy`),
> ọ bụghị mkpakọ nzaghachi HTTP na ahụ 429 e mepụtara — ọ dịghị
> ụzọ koodu dabara maka flag bypass n'eziokwu. Nzọụkwụ mkpakọ prompt
> ahụ na-agba ọsọ ugbu a _tupu_ `withRateLimit()` n'ime pipeline arịrịọ, ya mere,
> ịtụgharị usoro iji zere ya mgbe a jụrụ arịrịọ n'ihi na queue juru bụ mgbanwe dị iche
> ma buru ibu karịa oke okwu a; e meghị ya **n'ezi ebumnuche**
> ebe a, e hapụrụ ya dị ka nke na-esote ma ọ bụrụ na uru nchekwa CPU kwesịrị
> ihe ize ndụ ntụgharị usoro.

### Nta Nchekwa Auto-Enable Rate-Limit & Nchebe Njikọ (`rateLimitProtection`)

**Nta nchekwa auto-enable** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ndabara `true`):
N'ụzọ ndabara, OmniRoute na-arụsi nchebe queue rate-limit n'ụzọ akpaghị aka maka njikọ ndị provider API-key niile na-arụ ọrụ (`getProviderCategory(provider) === "apikey"`). Nke a na-ahụ na a na-etinye arịrịọ na-abata n'ugboro API keys upstream ndị na-adị mfe mmetụta rate n'queue ma na-achịkwa ha site na Bottleneck kama ịwụba n'ime njehie 429 upstream. Enwere ike ịkagbu nta nchekwa ahụ site na mgbanwe gburugburu `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` na-agbanyụ, `true`/`1`/`on` na-amanye), nke na-ewere ọnọdụ n'elu ntọala dashboard echekwara (**Ntọala → Nkwusike** / `PATCH /api/resilience`).

**Nkọwa nke `rateLimitProtection` nke njikọ ọ bụla:**
A na-esochi nchebe rate-limit nke njikọ ọ bụla site na ubi boolean `rateLimitProtection` dị na njikọ ndị provider (echekwa ya dị ka `rate_limit_protection` na SQLite):

- **Kwadoro n'ụzọ doro anya (`rateLimitProtection === true`)**: E rụrụ nchebe rate-limit n'ụzọ doro anya maka njikọ a, n'agbanyeghị ụdị provider ma ọ bụ ma a gbadoro nta nchekwa auto-enable.
- **Gbanyụrụ n'ụzọ doro anya (`rateLimitProtection === false`)**: Na-agbanyụ nchebe doro anya, mana ọ **anaghị** wepụ njikọ API-key na-arụ ọrụ n'ime nta nchekwa auto-enable zuru ụwa ọnụ. Na `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` na `undefined` hà otu: naanị `rateLimitProtection === true` ka a na-ewere dị ka nkagbu doro anya. Ọ bụrụ na `rateLimitProtection` bụ `false` (ma ọ bụ edobeghị ya), njikọ API-key na-arụ ọrụ ka dabara n'ọnọdụ auto-enable ma ka nọ n'okpuru nchebe rate-limit.
- **Enweghị opt-out maka njikọ ọ bụla**: Onye njikwa enweghị ike ugbu a ịgosi "njikọ API-key na-arụ ọrụ a naanị a ga-agba ọsọ na-enweghị nchebe queue rate-limit" ka auto-enable ka na-arụsi ọrụ ike maka ndị ọzọ. Iji gbaa njikọ API-key na-enweghị queue rate-limit kpamkpam, a ga-agbanyụ nta nchekwa ahụ n'ụzọ zuru ụwa ọnụ (`RATE_LIMIT_AUTO_ENABLE=false` ma ọ bụ `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Ụzọ ede akwadoro:**

- **`POST /api/rate-limits`**: Ụzọ ede njikwa akwadoro iji tụgharịa `rateLimitProtection` maka njikọ (`{ connectionId: string, enabled: boolean }`). Ịkpọ ya na `enabled: true` na-agbanye nchebe doro anya; ịkpọ ya na `enabled: false` na-ewepụ nchebe doro anya (agbanyeghị na njikọ API-key ndị na-arụ ọrụ ka nọ n'okpuru nta nchekwa zuru ụwa ọnụ ma ọ bụrụ na auto-enable dọrọ).
- **`PUT /api/providers/[id]`**: N'ezi ebumnuche, ọ **anaghị** anabata ma ọ bụ tụgharịa `rateLimitProtection` (#11278). Imelite metadata njikọ provider site na `PUT /api/providers/[id]` agaghị agbanwe ọnọdụ nchebe rate-limit echekwara.

---

## 6. Nchele nnyefe (throughput) maka stream na-adị nwayọọ (#9709)

Nchele nhọrọ `resilienceSettings.streamRecovery.throughputWatchdog` na-achọpụta upstream nke ka na-eziga chunks ma na-emepụta output nke assistant dị n'okpuru ọnụego output bara uru e debeere. E mere ya ka ọ dị iche na idle timeout n'ebumuche: heartbeats na metadata anaghị edozigharị oge elekere (timer) ọ bụla, ha anaghịkwa agụ dị ka ọganihu. Ọ dịkwa iche na hard attempt deadline (#9153), nke ka na-anọgide dị ka ọnụ nchekwa zuru oke n'agbanyeghị àgwà output.

Nchele ahụ chọrọ oge warm-up nke sochiri windo na-agagharị (rolling window) zuru oke tupu ọ nwee ike ịkwụsị (abort). Ọ na-agụ text deltas sitere na Chat Completions na events output nke Responses API (ihe nnọchi byte UTF-8 e ji ụzọ gbochie gụọ), ọ na-eleghara events bụ naanị usage na ndị dị oghere anya, ọ na-atụkwụsịkwa ikpe mgbe events tool-call ma ọ bụ reasoning ka nọ n'ụzọ. A gbanyụsịrị ya n'ụzọ ndabara, enwere ike ịgbanye ya site na `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; windo, warm-up, ọnụego kacha nta, na output kacha nta a nwere ike ịtụle, ha niile ka n'okpuru oke nke ọwa normalization nke resilience-settings nkịtị.

Mgbe a gbanyere ya, ịkwụsị nke nchele na-emetụta naanị mgbalị (attempt) upstream na-arụ ọrụ. Tupu bytes ọ bụla rụọ aka onye ahịa, ụzọ early-recovery nke otu akaụntụ dị adị nwere ike imepegharị mgbalị ahụ. Mgbe e mesịrị commit, anaghị achọpụtaghachi (replay) stream ahụ n'ụzọ na-enweghị nlele; naanị nkwekọrịta safe mid-stream continuation dị adị nwere ike ijikọ suffix. Finalization ka na-abụ otu ugbororo (single-shot), n'ihi ya ịgụ usage na mwepụta semaphore anaghị eme ugboro abụọ.

---

## 7. Nkwughachi Ọnọdụ Upstream (njehie oke ojiji e kwuru n'ụzọ na-ezighi ezi)

**Oke:** otu gateway upstream nke na-akọ na oke ojiji agwụla nwa oge site n'iji ọnọdụ HTTP na-ezighi ezi.

**Ebumnuche:** imezi ọnọdụ na-eduhie eduhie TUPU nhazi, ka ndị na-eji ya n'akụkụ downstream (fallback engine, nchịkọta combo, nzaghachi a na-ezigara client) wee hụ na ọdịda ahụ bụ nke enwere ike ịnwale ọzọ n'ezie.

Ụfọdụ gateway na-egosi na oke ojiji agwụla NWA OGE site n'iji ọnọdụ HTTP
nke enweghị ike ịnwale ọzọ. `agentrouter.org` na-eweghachi `403` (mgbe ụfọdụ `400`) tinyere body n'asụsụ Chinese
(`用户额度不足` / `额度不足`) kama `429` ọkọlọtọ. Client dịka Claude
Code na-ewere `403` dị ka nke na-adịgide adịgide ma kwụsị session ahụ, ma ọ bụrụ na emeghị mmezi
fallback engine ga-ahazi ya dịka `AUTH_ERROR` kama ihe omume metụtara oke
ojiji.

**Mmejuputa:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — ndepụta
  iwu maka provider ọ bụla (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), nke a na-eme ka ọ dakọọ site na `applyStatusRestatement()`.
- Ebe a na-akpọ ya: block `providerFailure:` dị na `open-sse/handlers/chatCore.ts`
  (gburugburụ ahịrị 3654), ozugbo `parseUpstreamError()` tụlechara nzaghachi upstream
  nke nwere ọnọdụ HTTP njehie (`!providerResponse.ok`), na tupu
  nhazi ọ bụla amalite, ka onye ọ bụla na-eji ya n'akụkụ downstream wee hụ
  ọnọdụ e meziri. Njehie ndị e tinyere n'ime stream SSE `200` na-agbaso ụzọ ọzọ
  e ji atụle stream nke na-abịa mgbe e mesịrị, ma hook a **anaghị** ekpuchi ha taa — nke a bụ
  mmachi a maara ama, nke na-adịbeghị mkpa maka ọnọdụ agentrouter kọrọ n'ụzọ na-ezighi ezi (nke
  na-apụta dịka ọnọdụ HTTP njehie).
- Ntozu maka nnwale ọzọ: `429` dị na `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), ya mere njehie e kwughachiri ọnọdụ ya
  na-enwe oge nnwale ọzọ n'ezie kama ịpụta dịka `403` na-adịghị arụ ọrụ.
- `60s` `defaultRetryAfterMs` sịntetik ahụ (`upstreamStatusRestatement.ts`)
  bụ naanị ihe nzaghachi e kwughachiri ọnọdụ ya na-agwa **client**; ọ bụghị n'onwe ya
  ogologo oge cooldown/lockout dị n'ime connection — nke ahụ na-adabere
  iche n'usoro ọ bụla na-edozi njehie e kwughachiri ọnọdụ ya n'ezie
  (backoff na-arị elu nke Connection Cooldown, §2, nke nwere ntọala `3s` maka provider
  API-key; ma ọ bụ Model Lockout, §3, maka provider nwere oke ojiji kwa model dịka
  agentrouter). Router nwere ike iru ntozu maka ịnwale ọzọ n'ime sistemụ
  tupu oge 60s ọ na-akpọsa nye client — nke a bụ ohere agbakwunyere e bu n'obi,
  ọ bụghị bug.

A naghị ekwughachi ọnọdụ njehie na-adịgide adịgide (nke agentrouter `无权访问模型` — enweghị ikike ịnweta model a)
MA ỌLỊ: `excludeMarkers` na-ajụ iwu ahụ ọbụlagodi mgbe `textMarkers` dakọtara,
ya mere njehie ahụ na-edobe ọnọdụ mbụ ya, ọ dịghịkwa ihe na-anwale ya ọzọ ruo mgbe ebighị ebi. Iwu nhazi provider
kwekọrọ na ya
(`agentrouter-model-access-denied` dị na `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown ntọala ekwuputara nke `6h`) ka
`checkFallbackError` (`open-sse/services/accountFallback.ts`) na-enyocha
_tupu_ generic apikey-category `FORBIDDEN` early-return, nke
`honorsRuleLockScope(provider)` na-achịkwa (#10334 — ugbu a ọ bụ naanị agentrouter site na
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dị na
`providerErrorRules.ts`). Cooldown 6h nke iwu ahụ kwuputara na-agafe dịka
`fallbackResult.baseCooldownMs`, mana ọ ka na-abanye n'ụzọ lockout
oke ojiji kwa model nke dịbu adị (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, nke #10334 agbanweghị ma e wezụga isi mmalite
cooldown): a na-ewedata ya ruo na `mlSettings.maxCooldownMs` nke operator
(ndabara `1_800_000ms` / 30min), dịka lockout model ndị ọzọ niile, ebe
_ihe kpatara lockout echekwara_ ka bụ `"forbidden"` e tinyere n'ime koodu na mbụ,
ọ bụghị `"auth_error"` nke iwu ahụ — naanị ogologo oge cooldown ka a na-asọpụrụ
site na mmalite ruo na njedebe, ọ bụghị eriri ederede ihe kpatara ya. Connection ahụ n'onwe ya ka na-arụ ọrụ;
ọ naghị emetụta model ndị ọzọ nọ n'otu connection ahụ.

Njehie oke ojiji e kwughachiri ọnọdụ ha (`额度不足`) na-erute iwu provider na production
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, enweghị cooldown nke ya ekwuputara — ndabara scaled backoff nke persistence layer
ka a na-etinye). Kemgbe #10334, a na-eji `scope` dị na
`ProviderErrorRuleMatch` site na mmalite ruo na njedebe, mana **naanị** maka provider ndị dị na
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
taa ọ bụ naanị `"agentrouter"`, nke `honorsRuleLockScope()` na-achịkwa). Maka
provider ndị ọzọ niile, `scope` ka bụ naanị ozi, kpọmkwem dịka ọ dị tupu #10334.
`checkFallbackError` na-ewepụta scope nke iwu dakọtara dịka
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) bụ guard a na-ekekọrịta nke na-egosi na
`ruleScope` dị mma n'ezie ka e were ya dịka signal gbasara connection dum nke nwere ike ịgbake n'onwe ya
(scope `"connection"`, reason `quota_exhausted`, ọ bụghị `permanent` ma ọlị,
ọ bụghịkwa `creditsExhausted` ma ọlị — nchebe megide iwu nwere ike ịbịa n'ọdịnihu nke jikọtara scope
`"connection"` na ọnọdụ account na-adịgide adịgide). Ndị na-eji ya abụọ na-akpọ ya:

- **Nchekwa na-adịgide** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  kama ịbanye na ngalaba mgbochi nke passthrough-provider nke dị **maka model ọ bụla**
  (agentrouter bụ `passthroughModels: true` → `hasPerModelQuota()`
  na-eweghachi `true`), ọ na-etinye **oge nkwụsị njikọ nwa oge** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ọ bụghịkwa ọnọdụ njedebe
  (`credits_exhausted`/`banned`/`expired`) — ka njikọ ahụ nwee ike ịlaghachi
  n'onwe ya ozugbo oge nkwụsị ahụ gafere kama ịchọ iji aka tọgharịa nzere.
  A na-amafe nke a maka njikọ nwere `disableCooling: true` (#2997): nhọrọ ịjụ
  ahụ na-eme ka ọ banye na mgbochi maka model ọ bụla kama (nke a bụ nkwụrịta
  a kọwara n'akwụkwọ — lee nkọwa dị na koodu n'elu ngalaba ahụ).
- **Nhazi ụzọ ngwakọta n'ime otu arịrịọ** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): otu ihe nche ahụ na-etinye
  njikọ ahụ n'ime setị `exhaustedConnections` dị na ebe nchekwa, nke igodo ya bụ
  `${provider}:${connectionId}`. Nke a na-amafe naanị ebumnuche SAME-REQUEST
  fọdụrụ nke _ya onwe ya nwere kpọmkwem `connectionId` ahụ_ n'elu ihe ebumnuche
  nke ya (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` tupu nchọgharị `exhaustedConnections`) — ngwakọta ndepụta
  model nkịtị, ebe ebumnuche ibe ya enweghị `connectionId` nke aka ha etinyere
  kpọmkwem, ma a na-ekpebi naanị otu n'oge dispatch ọ bụla site na header
  `X-OmniRoute-Selected-Connection-Id` nke nzaghachi, anaghị enweta ndakọrịta
  igodo ahụ. Maka ọnọdụ a a na-ahụkarị, ezigbo nchebe megide akụkụ fọdụrụ iji
  akaụntụ ahụ ka gwụrụ eme ihe ọzọ ABỤGHỊ Set a — ọ bụ oyi akwa nchekwa
  dị n'elu (ugbu a `rateLimitedUntil` nke njikọ ahụ dị n'ọdịnihu) tinyere otu
  ihe nche a nke na-egbochi `transientRateLimitedProviders` maka ọdịda ahụ
  (lee "Nhazi nwere ọkwa abụọ" na nkọwa dị na koodu n'alaka
  `isAgentrouterConnectionQuotaScope` dị na `targetExhaustion.ts`): ebe a hapụrụ
  Set ahụ n'enweghị akara, ikike mmanye `allowRateLimitedConnection` nke
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ANAGHỊ
  arụ ọrụ maka akụkụ ndị provider ahụ fọdụrụ, ya mere a na-asọpụrụ nzacha
  `rateLimitedUntil` nke nhọrọ nzere (`src/sse/services/auth.ts:1238`) dịka
  o kwesịrị, akụkụ fọdụrụ ga-ahọrọ njikọ agentrouter ọzọ ka tozuru etozu
  ma ọ bụ daa n'ihi na enweghị nzere dị — ọ naghị amanye ụzọ ya ịlaghachi
  na njikọ ngalaba a ka tinyere n'ọnọdụ nkwụsị.

### Nhazi nwere ọkwa abụọ: ikwughachi ọnọdụ, emesịa nhazi ụdị

Ikwughachi ọnọdụ (`upstreamStatusRestatement.ts`) na iwu nhazi provider
(`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`) bụ ndekọ
iwu abụọ dị iche iche nke ha abụọ ji id provider na akara ederede dịka igodo,
mana ha na-arụ ọrụ n'ebe dị iche iche ma na-arụ ebumnuche dị iche iche:
ikwughachi ọnọdụ na-edegharị ọnọdụ HTTP n'oge mbụ n'ime `chatCore.ts`;
iwu nhazi na-ahọrọ `reason` ndabere na `scope` nke mgbochi
(`model` / `provider` / `connection`) n'ime `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Iwu nhazi na-ahụ naanị **ederede** njehie zuru ezu (nke dị mkpa iji dakọrịta
akara dị n'ime body dịka `额度不足`) maka provider ndị edepụtara na allowlist
`FULL_TEXT_RULE_PROVIDERS` dị na `providerErrorRules.ts` — ugbu a ọ bụ naanị
`"agentrouter"`. Maka provider **katalọgụ arụnyere n'ime sistemụ** ndị ọzọ
niile, `checkFallbackError` na-enye `getProviderErrorRuleMatch` naanị njehie
ahaziri ahazi (`{code, type}`), nke zuru ezu maka iwu dabere na
header/ọnọdụ/koodu mana ọ naghị ahụ akara ederede dị na body.
Ihe enyemaka `resolveRuleMatchBody()` na-eme nhọrọ a: ederede njehie zuru ezu
maka provider dị na allowlist, ma nye njehie ahaziri ahazi maka ndị ọzọ.
Ịgbakwunye provider **arụnyere n'ime sistemụ** na `FULL_TEXT_RULE_PROVIDERS`
bụ nhọrọ nnabata doro anya maka provider ọ bụla — ọ dị ka ụzọ ndabara maka
provider ọ bụla na-anọghị na ndepụta ahụ wee nọgide n'enweghị mgbanwe ọbụna
n'otu byte.

`scope` nke iwu (`model` / `provider` / `connection`) bụ nhọrọ nnabata dị
iche na `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` na-egosipụta ya naanị
dịka `fallbackResult.ruleScope`, ndị na-eji ya n'okpuru na-asọpụrụ ya dịka
ihe karịrị akara ozi naanị maka provider ndị dị na allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` n'otu faịlụ ahụ (nke
`honorsRuleLockScope()` na-achịkwa — taa ọ bụ naanị `"agentrouter"`). Lee
"Njehie oke e kwughachiri ọnọdụ ha" dị n'elu maka ihe ndakọrịta
`scope: "connection"` na-eme n'ezie ozugbo provider nọ na allowlist ahụ.

**#11104 — iwu onye njikwa kwupụtara na-agafe allowlist abụọ ahụ.** Onye
njikwa nwere ike ikwupụta iwu maka provider ọ bụla n'oge ọrụ site na
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
na-edeghị faịlụ a. Itinye iwu onye njikwa n'azụ
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlist
e mere iji chebe omume **ndabara** nke iwu katalọgụ arụnyere n'ime sistemụ —
ga-eme ka usoro ntọala ahụ ghara ịrụ ọrụ maka provider ọ bụla ma e wezụga
ndị edepụtarala ebe ahụ, ebe ikwupụta iwu ahụ n'onwe ya abụrụlarị nhọrọ
nnabata doro anya nke onye njikwa. `resolveRuleMatchBody()` na
`honorsRuleLockScope()` na-ebu ụzọ lelee `hasOperatorRuleForProvider()`:
provider nwere iwu onye njikwa na-enweta ederede njehie na-enweghị nhazi,
a na-asọpụrụkwa `scope` o kwupụtara, n'agbanyeghị ma ọ pụtakwara na nke ọ bụla
n'ime allowlist ndị ahụ.

**Oghere a maara — a naghị ajụ `providerRuleRegistry` maka HTTP 400 ma ọlị.**
Alaka `BAD_REQUEST` nke `checkFallbackError` na-ahazi ọnọdụ 400 kpamkpam site
na ndepụta pattern nke ya (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, dgz. dị na `accountFallback.ts`) ma na-eweghachi
nsonaazụ tupu e ruo alaka `configuredRule`/`getProviderErrorRuleMatch` dị
n'elu ya. Iwu katalọgụ arụnyere n'ime sistemụ (ma ọ bụ iwu onye njikwa) nwere
`status: 400` ziri ezi n'usoro syntax mana ọ gaghị arụ ọrụ ma ọlị. Ọ dịghị
iwu dị ugbu a na-elekwasị anya na 400, ya mere ọ dịghị ihe metụtara
n'ọrụ mmepụta — mana iwu 400 n'ọdịnihu chọrọ ka e buru ụzọ gbanwee alaka a,
nke bụ mgbanwe buru ibu karịa ịgbakwunye iwu (ọ na-ahazigharị 400 maka
provider ọ bụla na-adabere ugbu a na omume ndepụta pattern) ma gafee oke
ọrụ nke ịgbakwunye iwu maka naanị otu provider.

### Ịgbakwụnye gateway ọhụrụ na-akọwa quota n'ụzọ na-ezighi ezi

1. Debanye otu array iwu na `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mee ka `textMarkers`
   bụrụ ndị kpatre onye na-enye ọrụ ahụ; ọ ghara iji ọzọ nkebiokwu Bekee
   ndị izugbe ga-ejikọta na `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Ọ bụrụ na ị chọrọ, debanye iwu nkewa na
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) iji
   họrọ oke mkpọchi ziri ezi (`connection` maka quota nke akaụntụ niile,
   `model` maka njehie nke ụdị ọ bụla). Nzọụkwụ a na-arụ ọrụ naanị na
   production maka ndị na-enye ọrụ nke iwu ha chọrọ ederede njehie zuru
   ezu (akara body): tinye id onye na-enye ọrụ na
   `FULL_TEXT_RULE_PROVIDERS` n'otu faịlụ ahụ — ọ bụrụ na ọ bụghị otu a,
   `checkFallbackError` na-enye iwu ahụ naanị njehie haziri `{code, type}`
   ma iwu dabere na ederede body agaghị adabata na okporo ụzọ dị ndụ
   ọbụladị otu ugboro. Iwu ndị na-adabata naanị na `status`/`headers`
   (dị ka nke Opencode ma ọ bụ nke Minimax) achọghị ntinye a (opt-in).
   N'ụzọ dị iche, ọ bụrụ na iwu ahụ kwupụtara `scope: "connection"` ma
   ebumnuche bụ n'ezie oge jụrụ oyi nke njikọ niile tinyere ịwụfe combo
   n'otu arịrịọ ahụ (ọ bụghị naanị akara ozi), tinye id onye na-enye ọrụ
   na `HONORS_RULE_LOCK_SCOPE_PROVIDERS` n'otu faịlụ ahụ — nke a bụ ihe
   na-achị ojiji ụdị `isAgentrouterConnectionQuotaScope()` na
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) na
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); na-enweghị ya, `scope`
   ka na-agafe site na `fallbackResult.ruleScope` ma ọ dịghị ihe na-eme
   ya ihe.
3. Tinye ule otu (unit tests) na-adị ka
   `tests/unit/upstream-status-restatement.test.ts` na
   `tests/unit/agentrouter-error-rules.test.ts` (gụnyere nchebe
   ọbụghị-permanent / ọbụghị-creditsExhausted, na — ọ bụrụ na onye na-enye
   ọrụ chọrọ ndepụta ekwenyere (allowlist) — ule na-ekwupụta na
   `resolveRuleMatchBody()` na-eweghachite ederede zuru ezu naanị maka
   onye na-enye ọrụ ahụ).

Ọ dịghị mgbanwe ọ bụla dị mkpa na `chatCore.ts`, `classifyError`, ma ọ bụ combo.

#### Mkpọchi e kewara n'ite egress (#10880)

Ndị na-enye ọrụ dị na `EGRESS_BUCKETED_LOCK_PROVIDERS` (ezinụlọ opencode)
a na-ele ha anya dị ka upstream e kewara n'ite IP (ọkwa efu nke opencode
bụ nke e kewara n'ite IP, ọ bụghị nke e kewara n'ite akaụntụ — lee #9611):
status-429 a kọwapụtara dị ka `quota_exhausted` **ma ọ bụ**
`rate_limit_exceeded` na-ajụ oyi njikọ ọ bụla nke ezinụlọ ekwenyere nke
IP egress ikpeazụ ama ya dabara na nke njikọ dara ada, tupu ntụgharị
enwe ike ịnwale ha — izere oku upstream N-1 nke ga-adaba n'ezie (otu ụdị
dị ka #10460/#10525). E tinyere `rate_limit_exceeded` n'echiche buru
ibù: na ụzọ `markAccountUnavailable` iwu ndị kpatre opencode anaghị
adabata (a na-enyefunyeghị headers/body nye `checkFallbackError`,
opencode anọghị na `FULL_TEXT_RULE_PROVIDERS`), n'ihi ya 429 nke ahụ ya
na-ebu ederede quota nke ndebanye aha ("eruola oke ojiji ọnwa") a
na-akọwapụta ya dị ka `quota_exhausted` site na fallback ederede quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; oge jụrụ oyi nke
awa 1) tupu a ruo iwu `status_429` ọbụladị — ebe 429 na-enweghị ederede
quota (mmachi ọsọ nkịtị) na-akọwapụta site na iwu `status_429` dị ka
`rate_limit_exceeded` ma ka na-ajụ ezinụlọ IP ahụ oyi. Maka onye na-enye
ọrụ ekwenyere, oke ọsọ e kewara n'ite IP bụ otu akara dị ka quota gwụrụ.
Oke eziokwu:

- **Mbọ kacha mma**: mkpọchi ahụ na-achọpụta `egress_ip` ikpeazụ a maara
  nke njikọ ahụ site na `proxy_logs` (window awa 24, synchronous, enweghị
  cache). Cache oyi (a chọpụtaghị egress IP ọ bụla) ma ọ bụ enweghị ahịrị →
  alaka ahụ ka na-ajụta njikọ na-adaghị (edekọtara ya dị ka taa), naanị na a
  gbachighị nwanne ọ bụla.
- **Ọ bụghị nke ikpeazụ**: oge jụta ahụ bụ window oke na-emegharị ọhụrụ
  (`testStatus: "unavailable"`); a naghị ewepụta ọnọdụ ebighi ebi site na
  akara ọkwa IP. Njikọ `disableCooling` na-agafee alaka ahụ kpamkpam.
- **Nkenke mkpọchi na-agbanwe maka ezinụlọ dị na allowlist**: nke a bụ
  mgbanwe mpaghara, ọ bụghị naanị nkwalite nwanne. opencode bụ provider
  `passthroughModels`, n'ihi ya tupu alaka a, 429 na-emepụta mgbochi
  kwa-MODEL; ugbu a ọ na-emepụta oge jụta nke njikọ — gụnyere maka onye ọrụ
  na-agba otu njikọ na-enweghị nwanne ọ bụla ọzọ. Nke ahụ bụ nkenke nke
  tebụl iwu opencode kwupụtara na ọ ziri ezi (`scope: "connection"`,
  `providerErrorRules.ts`), nke a sọpụtaghị ruo ugbu a n'ihi na opencode
  anọghị na `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Alaka ahụ na-edega n'onwe ya
  oge jụta nke njikọ na-adaghị + `backoffLevel`, na-eso ụdị alaka
  agentrouter nke mpaghara njikọ, wee laghachi — a naghị eru blọk kwa-model
  ahụ na ụzọ izugbe dị n'okpuru.
- **Combo gụnyere**: dị ka alaka agentrouter, mpaghara ahụ na-amachibhị
  n'ebumnuche mbelata `persistUnavailableState`/`isCombo` nke onye na-akpọ
  combo na-etinye na 429. Mgbochi kwa-model abụghị ụdị dị nro nke mpaghara
  a, ọ bụ otu ezighi ezi: ọ sịghị ihe ọ bụla gbasara IP gwụchara, n'ihi ya
  ntụgharị combo ga-aga n'ihu na-efunahụ otu oku nke e jirila anya na ọ
  ga-adaghị kwa nwanne.
- **Nchekwa nwanne**: a naghị edega n'elu nwanne nke adịlarị n'ọnọdụ ikpeazụ
  (machibidoro/credits_exhausted) ma ọ bụ nke adịlarị na oge jụta ka ogologo.
- **Allowlist pụrụ iche**: ịgbasa `EGRESS_BUCKETED_LOCK_PROVIDERS` bụ mkpebi
  doro anya nke onye nwe ya; enweghị wiring izugbe (pattern #10334/#10419).
  Ajụjụ nwanne ahụ na-ejikọ otu allowlist ahụ kama ịmegharị ya dị ka SQL
  literal, n'ihi ya ịgbasaa ya ka na-anọrị mgbanwe otu ahịrị.
- **Ntụgharị egress IP, n'ụzọ abụọ**: window nchọpụta ahụ (awa 24) gara aga
  karịa cache TTL nke egress IP (nkeji 5), n'ihi ya "IP ikpeazụ a maara" bụ
  akụkọ gara aga, ọ bụghị ọnọdụ ugbu a. Ọ bụrụ na proxy nke njikọ atụgharị
  n'ime window ahụ, mkpọchi nwere ike **gafee** IP e kesara n'ezie (IP
  edekọtara bụ nke ọhụrụ, nke na-agwụbeghị) — na n'ụzọ yiri ya ọ nwere ike
  **jụta nwanne nke atụgharịlarị pụọ** na IP gwụchara ahụ. Ọnọdụ nke abụọ
  na-eri nwanne ahụ otu window oge jụta; ha abụọ bụ oke anabatara nke mbọ
  kacha mma nke nchọpụta dabere na akụkọ gara aga.
- **Ọnụego**: nyocha abụọ e gbochiri oke nke `proxy_logs` (e nyochachara site
  na window site na `idx_pl_timestamp`), naanị na ugboro ugboro 429. Enweghị
  index ọhụrụ (migration 134 YAGNI). E tụrụ ya n'elu nkọwa DB nke traffic
  eziokwu nke nha ọkara; instance nke throughput elu na-ejide ọtụtụ ahịrị
  karịa n'otu window ahụ n'ụzọ hà na ya.

---

## Atụmatụ Resilience Ndị Ọzọ

- **Atụmatụ routing 20** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — lee [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routing na-amata oge nrụzi** (v3.8.0) — na-enye njikọ ndị dị mkpa ịnọ n'iru dabere na oge nrụzi quota ha.
- **Mbelata ọnọdụ background** — Responses API `background: true` belatara ruo na sync tinyere ịdọ aka ná ntị.
- **Nchọpụta oke ngwá ọrụ na-agbanwe agbanwe** — na-eweghachi ndị provider mgbe oke ọnụ ọgụgụ ngwá ọrụ ruru.
- **Nzọlite mberede** — `OMNIROUTE_EMERGENCY_FALLBACK` na-achịkwa ya; ndị ọrụ nwere ike ịkagbu ya site na peeji Feature Flags na-enweghị ịmalitegharịa (restart).

---

## Nchọpụta mmejọ

- Weighted combo na-azaghachi `503 all_targets_cooling_down` (e tinyela `Retry-After`, `diagnostics.excluded` na-edepụta target ọ bụla tinyere `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → e haziri pool ma jikọọ ya, naanị timer resilience ka wepụrụ target ọ bụla; ịdọ aka ná ntị `[COMBO] Weighted selection: every target excluded before dispatch — …` na-akpọ aha ihe kpatara ya na sekọnd fọdụrụ. `404 no_executable_targets` sitere na combo otu ahụ pụtara na ọ dịghị timer resilience sonyere (ọ dịghị ihe ọ bụla ga-arụ, ma ọ bụ akaụntụ ọ bụla dara na ule nnọdụ). E wuru ya na `open-sse/services/combo/pinRecovery.ts` site na ndị a wepụrụ nke e chịkọtara na `targetResolution.ts`.
- A leghara igodo niile maka otu provider anya → chọọ ma ọnọdụ circuit breaker MA `rateLimitedUntil`/`testStatus` nke njikọ ọ bụla.
- A wepụrụ provider kpamkpam mgbe windo nrụzi gachara → koodu na-agụ `state` raw kama `getStatus()`/`canExecute()`.
- Otu igodo dara, ndị ọzọ kwesịrị ịrụ ọrụ → họrọ connection cooldown karia circuit breaker.
- Naanị otu model dara → họrọ model lockout karia connection cooldown.
- Ọnọdụ kwesịrị ịzọlite onwe ya ma ọ naghị eme ya → chọọ timestamp nke oge ọhụrụ na ụzọ ịgụ na-emelite ọnọdụ gụchara. Ọnọdụ kpamkpam chọrọ mgbanwe aka.

---

## Ọnọdụ runtime — ntụaka ngwa ngwa maka agent

> E bufere ya oku site na `AGENTS.md` → "Resilience Runtime State" (PR #12743) ka
> ntụziaka agent nọgide n'okpuru ego context 40k. Ọ bụ nlele mkpirikpi nke na-eche
> ihu agent nke ngalaba ndị dị n'elu; ngalaba ndị a na-agụ ọnụ ka ọ bụrụ ntụaka zuru oke.

OmniRoute nwere usoro atọ metụtara ibe ha ma dị iche maka ọdịda nwa oge. Kwe ka
oke ha dị iche mgbe ị na-achọpụta mmejọ omume routing. Lee
[diagram resilience 3-ọkwa](../diagrams/exported/resilience-3layers.svg)
(isi: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
maka maapụ nke a hụrụ n'anya ngwa ngwa.

### Circuit Breaker nke Provider

**Oke**: provider niile, dịka `glm`, `openai`, `anthropic`.

**Ebumnuche**: ịkwụsị iziga traffic na provider na-adaghị ugboro ugboro n'ọkwa
upstream/ọrụ, ka otu provider na-adịghị mma ghara ịsọsụ arịrị ọ bụla.

**Ebe e mepụtara ya**:

- Klas isi: `src/shared/utils/circuitBreaker.ts`
- Nhazi ọnụ ụzọ/ọrụ chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API ọnọdụ runtime: `src/app/api/monitoring/health/route.ts`
- Mkpọchi ndị a na-ekekọrịta: `open-sse/services/accountFallback.ts`
- Tabelu ọnọdụ echekwara: `domain_circuit_breakers`

**Ọnọdụ** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: a na-anabata traffic nkịtị.
- `DEGRADED`: mpaghara ịdọ aka ná ntị n'oge — ọdịda gafere oke mbelata ma
  erubeghị oke breaker; traffic ka na-asọ, dashboard na-egosi ịdọ aka ná ntị. Ule njikọ
  ziri ezi ma ọ bụ windo dị jụụ na-enweghị ọdịda ọhụrụ na-eweghachi ya na `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` nwere windo ahụ).
- `OPEN`: e gbochiri provider nwa oge; ndị na-akpọ na-enweta nzaghachi
  provider-circuit-open ma ọ bụ routing combo na-agafe na target ọzọ.
- `HALF_OPEN`: oge nrụzi gachara; kwenyere arịrị nyocha (probe). Ihe ịga nke ọma
  na-emechi breaker, ọdịda na-emeghe ya ọzọ.

**Ndabara** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, nke a na-eri site na
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` na `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` na `src/sse/handlers/chatHelpers.ts`). Breaker nke
provider niile na-arụ ọrụ na `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profaịlụ |   na-ada na | na-emeghe na (`circuitBreakerThreshold`) | nrụzi (`circuitBreakerReset`) |
| -------- | ----------: | ---------------------------------------: | ----------------------------: |
| OAuth    |         `5` |                                      `8` |                         `60s` |
| API key  |         `7` |                                     `12` |                         `30s` |
| Local    | (ewepụtara) |                                      `2` |                         `15s` |

`PROVIDER_PROFILES` na-akọwakwa `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 nkeji) na `providerCooldownMs` (5/10/1 nkeji): ndị a na-akwalite
**ọnụ ụzọ windo nke Provider Cooldown zuru ụwa ọnụ nke a họọrọ (opt-in)** (`PROVIDER_COOLDOWN_ENABLED`, ndabara
gbanyụrụ) — ntinye ọkwa provider na `open-sse/services/providerCooldownTracker.ts` na-agụ naanị dị ka
na-ajụ jụ mgbe ọdịda ruru `providerFailureThreshold` n'ime `providerFailureWindowMs`, ma jụụ
maka `providerCooldownMs`. Ha ABỤGHỊ oke nke breaker dị ndụ — atụnula ha
na-atụ anya omume breaker. Enwere ike ịkagbu ndabara ọ bụla site na
env vars `OMNIROUTE_PROVIDER_BREAKER_*` na `OMNIROUTE_CIRCUIT_BREAKER_*`;
tabelu ntụaka ziri ezi nke runtime bi na `docs/architecture/RESILIENCE_GUIDE.md`.

Naanị ọnọdụ ọdịda ọkwa provider kwesịrị ịkpasu provider breaker:

```ts
(408, 500, 502, 503, 504);
```

Adakwasịla breaker nke provider niile maka mmejọ akaụntụ/igodo/model nkịtị dị ka ọtụtụ
ọnọdụ `401`, `403`, ma ọ bụ `429`. Ndị ahụ na-abụkarị nke connection cooldown ma ọ bụ model
lockout. `403` nke provider API-key n'ozuzu kwesịrị ịzọlite belụsọ na a kọwapụtaghị ya
dị ka mmejọ provider/akaụntụ njedebe.

Breaker ahụ na-eji mweghachi lazy, ọ bụghị timer na-arụ ọrụ n'azụ. Mgbe `OPEN` gachara, ọgụgụ dị ka `getStatus()`, `canExecute()`, na `getRetryAfterMs()` na-emelite steeti ahụ ka ọ bụrụ `HALF_OPEN`, ka dashboards na ndị na-ewu ndị ga-eso n'otu (combo candidates) ghara ịga n'ihu na-ewepụ provider gachara ruo mgbe ebighi ebi.

### Oge Iju Anya Njikọ

**Oke**: otu njikọ/akaụntụ/igodo nke provider.

**Ebumnuche**: ịwụfe otu igodo/akaụntụ na-adịghị mma n'obere oge ka njikọ ndị ọzọ maka otu provider ahụ gaa n'ihu na-eje ozi arịrị.

**Mmejuputa**:

- Ụzọ ide/ihe mmelite: `src/sse/services/auth.ts::markAccountUnavailable()`
- Nhọrọ/inyocha akaụntụ: `src/sse/services/auth.ts::getProviderCredentials...`
- Ịgbakọ oge iju anya: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ntọala: `src/lib/resilience/settings.ts`

Ubi dị mkpa na njikọ provider:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

N'oge a na-ahọrọ akaụntụ, a na-awụfe njikọ mgbe:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Oge iju anya bụkwa nke lazy: mgbe `rateLimitedUntil` gafere n'oge gara aga, njikọ ahụ na-alaghachi inwe ike a họrọ ọzọ. Mgbe ejiri ya nke ọma, `clearAccountError()` na-ehichapụ `testStatus`, `rateLimitedUntil`, ubi njehie, na `backoffLevel`.

Omume oge iju anya njikọ ndabara:

- Oge iju anya ntọala OAuth: `5s`.
- Oge iju anya ntọala igodo API: `3s`.
- `429` nke igodo API kwesịrị ịhọrọ ntụaka ịgbanwaghari nke upstream (`Retry-After`, isi reset, ma ọ bụ ederede reset a nwere ike ịkọwapụta) mgbe ha dị.
- Ndịda ugboro ugboro nke a nwere ike ịlọghachi na-eji backoff exponential:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Nchebe megide thundering-herd na-egbochi ndịda na-emekọ n'otu oge na otu njikọ ịghara ịgbatị oge iju anya ugboro ugboro ma ọ bụ ịgụkwasị `backoffLevel` ugboro abụọ.

Steeti ikpeazụ abụghị oge iju anya. `banned`, `expired` (nke na-aghọ ikpeazụ naanị mgbe ịgbanwaghari nwere oke N gachara site na `EXPIRED_RETRY_MAX`), na `credits_exhausted` bu n'echiche ka ha nọrọ na-enweghị ike iji ruo mgbe akwụkwọ njirimara/ntọala gbanwere ma ọ bụ onye ọrụ tọgharịa ha. Emula idegharị steeti ikpeazụ n'elu steeti oge iju anya nke obere oge.

### Mgbachi Ụdị

**Oke**: provider + njikọ + ụdị.

**Ebumnuche**: izere ịgbanyụsị njikọ dum mgbe naanị otu ụdị na-adịghị ma ọ bụ nwere oke quota maka njikọ ahụ.

Ihe atụ:

- Ndị na-enye quota kwa ụdị na-alọghachi `429`.
- Ndị na-enye nke mpaghara na-alọghachi `404` maka otu ụdị na-efu.
- Ndịda ikike ọnọdụ/ụdị kpọmkwem nke provider dị ka ọnọdụ Grok a họpụtara.

Mgbachi ụdị nọ na `open-sse/services/accountFallback.ts` ma na-ekwe ka otu njikọ ahụ gaa n'ihu na-eje ozi ụdị ndị ọzọ.

### Ntụziaka Ịchọpụta Njehie

- Ọ bụrụ na a wụsịrị igodo niile nke provider, lelee ma steeti breaker nke provider na `rateLimitedUntil`/`testStatus` nke njikọ ọ bụla.
- Ọ bụrụ na a pụtara na wepụla provider ruo mgbe ebighi ebi mgbe windo reset gachara, chọpụta ma koodu na-agụ `state` gburugburu kama iji `getStatus()`/`canExecute()`.
- Ọ bụrụ na otu igodo provider daa ma ndị ọzọ kwesịrị ịrụ ọrụ, họrọ oge iju anya njikọ karia breaker nke provider.
- Ọ bụrụ na naanị otu ụdị daa, họrọ mgbachi ụdị karia oge iju anya njikọ.
- Ọ bụrụ na steeti kwesịrị ịmewe onwe ya, ọ kwesịrị ịnwe timestamp nke ọdịnihu/oge reset agwụla yana ụzọ ọgụgụ na-emelite steeti gachara. Ọnọdụ ebighi ebi chọrọ mgbanwe aka n'akwụkwọ njirimara ma ọ bụ nhazi.

---

## Ihe Nbipụta Aka TLS & Nzuzo

Akapọrọ nzuzo pụrụ iche nke provider (JA3/JA4, CCH, obfuscation) n'ụzọ dị iche — lee `docs/security/STEALTH_GUIDE.md` (git; anaghị etinye ya n'ime `/docs`).

---

## Nnwale resilience (Phase 8 · Block C)

Ezughị nnwale unit maka lọjịk resilience, nnwale atọ na-ahụ runtime n'okpuru ọnọdụ stress/ọdịda n'ezie (ha niile bụ integration/nightly — ọ dịghị n'ime ha na-egbochi PR):

| Nnwale      | Ihe                                                                                                                                                                                               | Mmege                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Nodụ fake-upstream na-etinye latency/reset/timeout/503 n'ezie; na-achọpụta na circuit breaker na-emeghe/na-alaghachi ma `checkFallbackError` na-akọwa 503 dị ka fallback a nwere ike iweghachite. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | Ihe dị ka stream 500 kwa `createSSEStream` n'okpuru `--expose-gc`; ọ dara ma ọ bụrụ na heap eto gafee oke (OOM guard #3069).                                                                      | `npm run test:heap`                      |
| k6 soak     | Ibu na-adịgide megide `/api/monitoring/health`; oke p95/njehie.                                                                                                                                   | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` na-ahazi ya (cron + dispatch). Na `test:integration` ndabara, chaos na heap na-agafe onwe ha (na-enweghị `RUN_CHAOS_INT`/`--expose-gc`).

---

## Hụkwa

- [Ntuziaka Architecture](./ARCHITECTURE.md) — Architecture sistemu na ihe ndị dị n'ime ya
- [Ntuziaka Onye Ọrụ](../guides/USER_GUIDE.md) — Ndị na-enye, combo, njikọ CLI
- [Injin Auto-Combo](../routing/AUTO-COMBO.md) — Ntụle ihe 16, ngwugwu mode
