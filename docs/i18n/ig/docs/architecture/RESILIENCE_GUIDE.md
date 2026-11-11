# Resilience Guide (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute nwere usoro nkwụghachi azụ atọ dị iche iche. Nke ọ bụla nwere oke na ebumnuche dị iche. Debe ha iche mgbe ị na-emezigharị omume ntụgharị.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Isi mmalite: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-dashboard ụzọ maka mgbanwe ngbanwe.** Mwepu nnabata na-atụgharị mkpụrụ sitere na gburugburu — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — na-enye naanị _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Otu boolean nọgidere na `resilienceSettings` (Dashboard →** Ntọala → Resilience** / `PATCH /api/resilience`, echekwara na `key_value`) meriri uru env: normalization (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) na-edobe boolean echekwara mgbe ọ bụla ọ dị. Ịtọlite ụdị env var ka `true` na mbugharị ebe dashboard echekwara `false` ya mere ọ dịghị agbanwe ihe ọ bụla — tụgharịa ngbanwe ahụ.** Ntọala → Resilience** (ma ọ bụ kpochapụ ubi echekwara) kama.

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

## 2. Oge Ijụ Njikọ

**Oke:** njikọ/akaụntụ/igodo nke onye na-eweta ọrụ otu.

**Ebumnuche:** ịwụfe otu igodo na-adịghị arụ ọrụ ka njikọ ndị ọzọ nke otu onye na-eweta ọrụ nwee ike ịga n’ihu na-eje ozi.

**Mmejuputa:**

- Ịka ya dị ka adịghị arụ ọrụ: `src/sse/services/auth.ts::markAccountUnavailable()`
- Nhọrọ: `getProviderCredentials*` n’otu faịlụ ahụ
- Ngụkọta oge igbu oge: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ntọala: `src/lib/resilience/settings.ts`

**Ogige maka njikọ ọ bụla:**

- `rateLimitedUntil` — akara oge ruo mgbe oge igbu oge ga-agwụ
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ọnụọgụgụ na-abawanye n’ụzọ exponential maka nlọghachi azụ

**Oge igbu oge ndabara:**

- OAuth base: 5s
- API-key base: 3s
- API-key 429: na-ahọrọ isiokwu `Retry-After`/reset sitere n’aka onye na-eweta ọrụ elu ma ọ bụ ederede reset enwere ike ịkọwa
- Nlọghachi azụ: `baseCooldownMs * 2 ** failureIndex`

**Oge igbu oge nlọghachi kwa onye na-eweta ọrụ.** Peeji nkọwa onye na-eweta ọrụ nwere nhọrọ **Oge igbu oge nlọghachi** (Akpaaka,
15s ruo 1h). Ọ na-echekwa `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, site na `PATCH /api/resilience`). Mgbe njehie mgbochi ọnụego enweghị
ihe ngosi nlọghachi sitere n’aka onye na-eweta ọrụ elu, uru ahụ na-anọchi nlọghachi azụ a tụrụ
maka onye na-eweta ọrụ ahụ ma tọgharịa `backoffLevel` ka ọ bụrụ 0
(`open-sse/services/rotationConfig.ts::overrideFor`). Usoro mkpa maka njehie mgbochi ọnụego, site n’ọkwa kachasị elu gaa na nke dị ala, bụ: ihe ngosi nlọghachi sitere n’aka onye na-eweta ọrụ elu, emesịa `providerSpecificData.rotationOverrides.rateLimitResetSeconds` nke njikọ ahụ, emesịa oge igbu oge nlọghachi kwa onye na-eweta ọrụ, emesịa env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, emesịa nlọghachi azụ a tụrụ. Akpaaka na-ewepụ ubi ahụ. Ọ na-emetụta naanị ihe kpatara mgbochi ọnụego, ọ dịghị emetụta steeti njedebe.

**Ihe mgbochi ìgwè mmadụ na-awakpo otu oge:** na-egbochi ọdịda na-eme n’otu oge ime ka oge igbu oge too karịa ókè ma ọ bụ ime ka `backoffLevel` bawanye ugboro abụọ.

**429 ndị oke njikọ kpatara anaghị arịgo n’usoro nlọghachi azụ.** `429` nke ahụ ya na-akọ oke njikọ ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) pụtara na akaụntụ ahụ dị mma mana ọ juru ọrụ.
`checkFallbackError()` na-eweghachi ihe kpatara ya `concurrency_limited`: daa n’ọdụ gaa na njikọ ọzọ ozugbo, mee ka njikọ a jụọ oyi ruo oge a kapịrị ọnụ `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ma ọ bụ ihe ngosi nlọghachi sitere n’aka onye na-eweta ọrụ elu, hapụ `backoffLevel` otú ọ dị, ma tọọ `skipProviderBreaker`.
Ahụ quota doro anya ka na-enwe mkpa, yabụ ahụ nke dabara na ụkpụrụ quota ka na-anọgide na mkpebi quota. Nchọpụta: `looksLikeConcurrencyLimit()` dị na `src/shared/utils/classify429.ts`;
mkpebi: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (bụ `FailureKind` nke breaker) agbanwebeghị ma ka na-agụ `rate_limit` maka ahụ ndị a.

**Ọdịda ọdịnaya nke stream anaghị eme ka akaụntụ jụọ oyi.** Mgbe onye na-enyocha ọdịda ọdịnaya
(`open-sse/utils/streamHandler.ts`) kwụsịrị ịgbalị maka stream nke zitereghị mmepụta model n’oge,
`markAccountUnavailable()` na-edekọ njehie ahụ na njikọ ahụ mana ọ naghị etinye oge igbu oge: ọdịda ahụ bụ nke arịrịọ ahụ, ọtụtụ mgbe ọ bụ ntụgharị echiche dị ogologo nke na-emepụtabeghị mmepụta.
Ndị na-arụ ọrụ nwere ike iji `resilienceSettings.streamStallCooldown.enabled` họrọ ịgbalite ya ọzọ
(ndabara `false`).

**Ihe mgbaàmà latency a na-agbanyere site na nhọrọ akaụntụ `p2c`.** Mgbalị ọ bụla ezitere na-edekọ oge ruo byte mbụ ya na nsonaazụ ya maka njikọ ọ bụla (yana njikọ ọ bụla + model) n’ime windo na-atụgharị echekwara na ebe nchekwa: ihe atụ 20 ikpeazụ n’ime nkeji 15
(`open-sse/services/connectionLatencyTracker.ts`, nke a na-edekọ site na
`safeLogEvents()` dị na `src/sse/handlers/chatHelpers.ts`). Mgbe `resilienceSettings.p2cLatency.weight` karịrị
`0` (oke 0-20, ndabara `0` = agbanyụrụ), `compareP2CConnections()` dị na `src/sse/services/auth.ts` na-agbakwunye ihe ruru `weight` n’akụkụ onye ọ bụla ga-asọ mpi n’ime ụzọ abụọ ahụ. Ọkara nke nke ahụ sitere na latency dị ka oke ya na onye na-asọmpi kacha ngwa (ịdị nwayọ okpukpu abụọ na-ewere ọkara ahụ niile), ọkara nke ọzọ sitere na ọnụego njehie na-atụgharị.
Okwu ahụ na-arụ ọrụ naanị mgbe ndị asọmpi abụọ ahụ nwere opekata mpe ihe atụ 3, yabụ anaghị ata akaụntụ ọhụrụ ahụhụ, ọnụ elu ya na-anọkwa n’okpuru ntaramahụhụ quota-blocked na quota-exhausted.
Ọ naghị etinye circuit nke ya: oyi, lockout na breaker ka na-ejikwa akaụntụ ndị na-ada ada.
Tọọ ya site na `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Frames echiche na-amalitegharị mmefu oge ọdịnaya.** Model echiche nwere ike iche echiche ruo
nkeji ole na ole tupu token mbụ a na-ahụ anya: Claude na-ezipụ frames `thinking_delta` nke ederede echiche ha nwere ike ịdị oghere, API Responses na-ezipụ otu reasoning item mgbe ibe ya gasịrị. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) na-amata frames ndị a, onye na-enyochakwa na-amalite mmefu oge ya ọzọ n’ime nke ọ bụla kama ịkagbu ntụgharị ahụ. Ha ka abụghị mmepụta model, yabụ ntụgharị nke jedebere naanị na echiche ka na-akọ na ọ bụ oghere, ntụgharị nke kwụsịrị iche echiche ma na-ezipụ naanị heartbeats ka na-akpalite onye na-enyocha ya.

Frames binary `reasoningContentEvent` nke Kiro nwere signature na-adịghị oghere na-echekwa ọrụ echiche a site n’aka executor dị ka delta `reasoning_content` oghere. A naghị eziga signature ahụ n’ihu. Metadata, frames ezughị oke na signatures oghere anaghị amalitegharị mmefu oge ọdịnaya; oge ngafe stream nọ n’ọrụ nke nọọrọ onwe ya na ịkagbu nke onye ahịa ka na-arụ ọrụ (`open-sse/executors/kiro/reasoning.ts`).

**Steeti njedebe (ABỤGHỊ oge igbu oge):**

- `banned` — nchọpụta okwu amachibidoro / mmachibido akaụntụ na-etinye ya (lee [BAN_DETECTION](../security/BAN_DETECTION.md)). Ọjụjụ sitere n’aka onye na-eweta ọrụ kwa-arịrịọ (`request_rejected`, dịka Anthropic OAuth 403 "Request not allowed") anaghị etinye ya: a na-agụta ha kwa njikọ na model, a na-ewepụkwa model ahụ n’usoro ntụgharị site na oge igbu oge na-eto eto nke nwere oke `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), ma ọ bụ mee ka njikọ ahụ jụọ oyi mgbe amaghị model — `open-sse/services/requestRejectedStreak.ts`
- `expired` (na-agbanwe gaa na njedebe mgbe nlọghachi nwere oke — `EXPIRED_RETRY_MAX = 3` yana nlọghachi azụ exponential — ka njehie OAuth nwa oge nwee ike ịgwọ onwe ya tupu e mechie akaụntụ ahụ kpamkpam)
- `credits_exhausted`

Ndị a na-adịgide ruo mgbe nzere nnabata gbanwere ma ọ bụ onye ọrụ tọgharịa ha. Ewepụla ọnọdụ njedebe site n’iji ọnọdụ cooldown na-adịru nwa oge dochie ha.

**Mweghachi na-adịghị egbu oge:** mgbe `rateLimitedUntil` gafere, njikọ ahụ na-erughị eru ọzọ. Mgbe ejiri ya nke ọma, `clearAccountError()` na-ekpochapụ mpaghara njehie niile.

### Mgbidi ojiji Claude OAuth: ahịrị ụzọ nwere obere mkpa + nrụpụta oke nnọkọ

**Oke:** otu njikọ ndenye aha Claude (OAuth). Atụmatụ abụọ a bụ **nhọrọ onye ọrụ na-eme kwa njikọ** (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` na `providerSpecificData`, ha abụọ na-adị **off** na mbụ) ma na-egosipụta iwu Claude Code `/low-priority` na `/limit-reset` (nkwekọrịta wire sitere na Claude Code 2.1.263).

**Mmejuputa:**

- Igwe ọnọdụ + nhazi azịza: `open-sse/services/claudeLowPriority.ts`
- Onye ahịa ọnọdụ/claim nrụpụta: `open-sse/services/claudeLimitReset.ts`
- Nko executor (ntinye header + nnwale ọzọ nke otu akaụntụ): `open-sse/executors/base.ts::execute()`
- Nchekwa nhọrọ onye ọrụ: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Ihe na-akpalite:** mgbidi ojiji awa 5 — `429` nke headers ya nwere
`anthropic-ratelimit-unified-status: rejected` yana, mgbe akaụntụ ahụ ruru eru,
`anthropic-ratelimit-unified-slow-offer: treatment`. A naghị ezipu ihe ọ bụla tupu mgbidi `429` mbụ ahụ; `429` mberede na-enweghị unified headers na-aga n’ụzọ cooldown nkịtị.

**Ahịrị ụzọ nwere obere mkpa** (`lowPriorityMode`):

- Mgbe mgbidi `429` mere, executor na-anabata onyinye ahụ ma nwaa ọzọ ozugbo n’otu akaụntụ ahụ na `anthropic-usage-limit: slow`; ahịrị ahụ na-adị n’ọrụ ruo mgbe `anthropic-ratelimit-unified-reset` a mara ọkwa gafere (+ grace nke sekọnd 60), request ọ bụla n’ime windo ahụ na-ebu header ahụ. `429` e jidere anaghị eru `handleChatCore`, ya mere a naghị etinye njikọ ahụ na cooldown, a naghị atụgharịkwa ya gaa n’ebe ọzọ.
- `anthropic-ratelimit-unified-slow-status` na azịza ndị ọzọ: `active` / `not_needed` na-eme ka ahịrị ahụ dịgide; `slot_busy` (429) ma ọ bụ `529` na-eche `anthropic-ratelimit-unified-slow-retry-after` nke sava zitere (ndabara sekọnd 20, kpachie n’etiti sekọnd 5–600, jitter ±30%) wee nwaa ọzọ, nke `anthropic-ratelimit-unified-slow-max-wait` na-ekpebi oke ya (ndabara nkeji 20, kpachie n’etiti nkeji 1–awa 6) — mgbe nke ahụ gafere, ahịrị ahụ na-akwụsị, cooldown nke nkeji 10 na-egbochikwa nnabata ọzọ. A na-amachikwa oge ichere ọzọ site n’oge fọdụrụ n’ime timeout mmalite upstream nke request ahụ (`resolveFetchStartTimeout`, ndabara nkeji 10) wepụrụ oke sekọnd 5: na-enweghị oke a, max-wait nkeji 20 nke ndabara ga-adị ogologo karịa request ahụ, a ga-akwụsịkwa ụra ahụ n’etiti ichere, nke ga-ebute `TimeoutError` kama njedebe `max_wait` dị nro na cooldown.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, ngafe windo awa 5, ma ọ bụ `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (nke na-akwụsị ya dị ka `extra_usage` n’agbanyeghị status ọ bụla, ebe overage akwụgoro ugbu a na-ekpuchi mgbidi ahụ) na-akwụsị ahịrị ahụ; azịza ahụ na-agazi n’ụzọ cooldown nkịtị. A na-echeta `budget_exhausted` ruo mgbe nrụpụta mmefu ego a mara ọkwa mere (≤ ụbọchị 8).
- Nyocha mgbidi ahụ na-eme mgbe executor gụchara nnwale ọzọ nke ya n’ime otu mbọ nke `400` kpatara (ndezi context, clamps thinking/effort, param auto-learn), ya mere mgbidi `429` nke pụtara naanị n’otu n’ime nnwale ndị ahụ ka a ka na-ejide kama iziga ya n’ụzọ cooldown.
- Ọnọdụ ahụ dị na ebe nchekwa kwa njikọ (ịmalitegharị na-efu otu mgbidi `429` ọzọ tupu anabata ya ọzọ).

**Nrụpụta oke nnọkọ** (`autoLimitReset`, a na-anwale ya tupu ahịrị ahụ mgbe ha abụọ na-arụ ọrụ):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → ngọngọ `juniper_tide`; mgbe `arm: "reset"` na `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` na
  `{ "program": "juniper_tide" }` (UUID nzukọ sitere na `providerSpecificData.organizationUUID`, yana bootstrap fallback).
- `result: reset|not_limited` → a na-anwale request ahụ ọzọ n’ọsọ zuru ezu (enweghị slow header). `already_used` / `not_offered` na-echeta `next_available_at` (ndabara otu izu); ọdịda ọ bụla na-eweghachi azụ nkeji 15. Nrụpụta ahụ na-eme otu ugboro n’izu, a ka na-agụkwa ya n’ime oke kwa izu.

Nchedo regression: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`,
`tests/unit/claude-low-priority-executor.test.ts`.

### Tinyegharịa ntọala ụlọ akụ na-akpaghị aka

**Oke:** Njikọ Codex na Claude (OAuth) njikọ.**Ịbanye** : agbanyụrụ ntọala `bankedResetAutoApply` yana na ọnọdụ `dry-run` na ndabara (Ntọala → AI → Auto-tinye ụlọ akụ).

**Ebumnuche:** na-emefu resets bank n'onwe ha mgbe akaụntụ dara mgbidi ojiji, kama ichere onye ọrụ ka ọ pịa "Napụta" na ibe oke ndị na-enye.

| Ụdị kredit (`creditTypes`) | Ihe agbapụtara                            | Ebe ọ na-agba ọsọ                                           |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| `codexCredits`             | Codex tọgharịa kredit                     | ọrụ ndabere, ọ bụla 60 s                                    |
| `claudeCredits`            | Enyemaka ụlọ akụ Claude (kredit `GRANT` ) | ọrụ ndabere, ọ bụla 60 s                                    |
| `claudeSessionReset`       | Ntọgharị oke nnọkọ izu izu Claude (n'elu) | ụzọ arịrịọ, site n'otu amụma ahụ ka ntụgharị akaụntụ ọ bụla |

**Mmejuputa:**

- Mkpebi dị ọcha (otu iwu edobere maka ụzọ abụọ): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Ọrụ ndabere: `src/lib/services/bankedResetAutoApply.ts` (malitere na `src/instrumentation-node.ts`)
- Ọnụ ụzọ arịrịọ Claude : `src/lib/usage/claudeSessionResetPolicy.ts`, edebanye aha site na `setClaudeLimitResetPolicy()` na `open-sse/services/claudeLimitReset.ts`
- Akụkọ ihe mere eme, okpu na webhook: `src/lib/usage/bankedResetAudit.ts`
- Akụkọ ihe mere eme API: `GET /api/settings/banked-reset-auto/history?limit=50` (auth njikwa)

**Usoro mkpebi** (Iwu nke mbụ na-ada ada bụ ihe e dekọrọ):

1. Agbanyụọ, ụdị kredit, ma ọ bụ akaụntụ agbasaghị (`accountScope` `all` / `selected` gbakwunyere maapụ `connections` otu akaụntụ).
2. N'èzí usoro UTC nhọrọ (`startHourUtc` > `endHourUtc` gafere etiti abalị).
3. Okpu n'ime awa 24 gara aga: `maxPerAccountPerDay` (1), `maxPerDay` (3), na `minSpacingMinutes` (30) n'etiti mgbapụta abụọ ọ bụla.
4. Mkpali: windo `session` ma ọ bụ `weekly` nwere mgbidi (gụọ site na `getQuotaWindowStatus().reachedThreshold`, ọ bụghị `isAccountQuotaExhausted()`, nke na-akọ naanị akaụntụ na windo ọ bụla ejiri), ma ọ bụ kredit na-agwụ n'ime `expiringCreditHours` (24) na akaụntụ ejirila `expiringCreditMinUsedPercent` (50).
5. Nchedo nrụpụta eke: gaa n'ihu mgbe windo elekere ise nwere mgbidi na-emegharị n'ime `sessionResetGuardMinutes` (90), ma ọ bụ windo nwere mgbidi kwa izu n'ime `weeklyResetGuardHours` (12).
6. Ala kwa izu: kwugharịa nrụpụta elekere 5 mgbe izu ụka fọdụrụ dị n'okpuru `weeklyFloorPercent` (10).
7. Ụdị `last-resort` : kwupụ ebe akaụntụ ọzọ dị n'okirikiri nke otu onye na-eweta nwere opekata mpe `poolHeadroomPercent` (10) hapụrụ na windo abụọ ahụ. kredit na-agwụ ike na-akpalite nke a.
8. `dry-run` na-edekọ ahịrị wee gbapụta ihe ọ bụla; `last-resort` na `eager` gbapụta.

Data oke na-efu efu anaghị emeghe mgbapụta: oge ntọgharị amabeghị ma ọ bụ mwụda ojiji kwa izu.

**Tọgharia nnọkọ Claude :** na njirimara kwụsịrị, ma ọ bụ `claudeSessionReset` kwụsịrị, ntụgharị `autoLimitReset` nke ọ bụla na-ekpebi kpọmkwem dịka ọ dị na mbụ. Na ha abụọ na-aga n'ihu, njirimara ahụ na-edochi mkpagharị akaụntụ ọ bụla: akaụntụ dị n'ime ya nwere ike ịza naanị mgbe iwu na-enye ya ohere, na na ọnọdụ `dry-run` enweghị nkwupụta ọ bụla.

**Nchekwa:** ọrụ ahụ na-agbapụta n'ọtụtụ otu kredit kwa akara, kpebie tupu edepụta kredit (a naghị edepụta akaụntụ awụpụ), na-eji igodo idempotency `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`, wee kwado akaụntụ maka 1 h mgbe ndepụta dara ada ma ọ bụ mgbapụta. A na-edere mkpebi mgbapụta ọ bụla, ọdịda na akọrọ akọrọ na `audit_log` (`action: "bankedReset.redeem"`, enweghị akara ngosi ma ọ bụ kredit ids); A na-agụ okpu ndị ahụ site na ahịrị ndị ahụ, ya mere ha na-adị ndụ malitegharịa. Mgbapụta ndị na-aga nke ọma na-agbakwa webhook `provider.reset_redeemed` ọkụ.

Ndị nche mgbagha: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Mmasị nnọkọ (#7274)

**Oke:** otu nnọkọ client (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) a kpọgidere n’otu njikọ, maka **provider ọ bụla**.

**Ebumnuche:** ime ka agent na-enwe ọtụtụ ntụgharị (Claude Code, aider, custom agents) nọgide n’otu akaụntụ ahụ n’ofe requests, na-ebelata mfu context n’ofe akaụntụ na `429` oyi-mmalite na-eme ugboro ugboro n’ebe ndị provider nwere ọnọdụ nnọkọ kwa akaụntụ.

**Mmejuputa:**

- Mkpebi TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Nhọrọ/ịmepụta pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Mwepụta header (zuru ụwa, provider ọ bụla): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tebụl pin echekwara: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ntọala: `sessionAffinityTtlMs` (TTL zuru ụwa ọnụ na ms, `0` na-ewepụ ya) — `src/lib/db/settings.ts`. A gbanwere aha ya site na `codexSessionAffinityTtlMs` nke Codex naanị site na migration `124_generic_session_affinity_ttl.sql`, nke na-ebufe TTL Codex a haziri mbụ dị ka ndabara ọhụrụ.

Tupu #7274, `resolveSessionAffinityTtlMs()` na-akwụsị ozugbo na `0` maka provider ọ bụla na-abụghị `codex`, ya mere ntọala TTL (na session headers) enweghị mmetụta ebe ọ bụla ọzọ n’agbanyeghị na usoro pinning na mwepụta header adịlarị nke na-adịghị ejedebe na provider. Ndozi ahụ wepụrụ nloghachi mbụ ahụ; TTL ahụ na-arụkwa ọrụ n’otu ụzọ maka provider ọ bụla ozugbo e debere ya n’ụwa niile karịa `0`.

A naghị ebufe headers atọ nke mmasị nnọkọ ndị a gaa upstream — executors na-ewughachi headers upstream nke ha site na mmalite kama ịbufe client headers, ya mere nke a na-anọ naanị dị ka id njikọ dị n’ime.

### Leases njikọ nnọkọ ejikwa pụrụ iche

**Oke:** Otu onye ahịa HTTP/session ejikwara nke ọma na-arụ ọrụ na otu njikọ OmniRoute tozuru etozu.

**Ebumnuche:** inye ndị ahịa chọrọ mgbidi nhazi siri ike gafee arịrịọ dị iche iche ikike nwe njikọ pụrụ iche na-adịgide adịgide. Nke a dị iche na session affinity, nke bụ mmasị nkwụsi ike dị nro: lease pụrụ iche na-echekwa ọnọdụ ndụ ya na SQLite, na-amanye ịdị iche nke onye nwe na-arụ ọrụ na njikọ na-arụ ọrụ n'ụwa niile, ma jụ generation ochie tupu e ziga ya n'aka onye na-eweta ọrụ.

Atụmatụ a bụ nhọrọ maka API key ọ bụla. Igodo a na-ejikwa ga-enwerịrị scope `lease:exclusive` na ndepụta `allowedConnections` doro anya nke na-abụghị efu. Onye ahịa HTTP ọ bụla nwere ike iji lifecycle endpoint; a chọghị aha onye ahịa, user-agent, onye na-eweta ọrụ, usoro OAuth, ma ọ bụ model. Lease na-achịkwa njikọ, ọ bụghị model, ya mere mgbanwe model na-echekwa njikọ ahụ ka njikọ ahụ ka na-eru eru dịka iwu nkịtị si dị. Iwu nkịtị gbasara model, oke ojiji, ahụike, cooldown, na allowlist ka bụ ndị na-achịkwa ma nwee ike ịgbanwe otu generation ahụ gaa na njikọ ọzọ tozuru etozu nke nweere onwe ya.

Lifecycle bụ `POST /api/v1/session-leases` nwere omume JSON `acquire`, `renew`, na `release`. Arịrịọ inference ejikwara nke ọma na-ebufe uru `X-OmniRoute-Lease-Owner` nke na-enweghị ihe pụtara n'èzí yana `X-OmniRoute-Lease-Generation` ziri ezi. Onye nwe ya na-eji `vlo_` sochiri mkpụrụedemede base64url 43; naanị hash SHA-256 ya ka a na-echekwa. Mgbidi dispatch ikpeazụ ọ bụla na-ejikọta ID API key akwadoro na ID njikọ na-arụ ọrụ. A na-ewepụ isi njikwa lease na ndekọ, snapshots arịrịọ echekwara, na isi executor nke onye na-eweta ọrụ.

Ọ bụrụ na nhazi nkịtị nwere ndị ga-ezu eru ejikwara nke ọma mana lease ndị mba ọzọ na-arụ ọrụ ejirila ndị niile nweere onwe ha, OmniRoute na-eweghachi HTTP `429`, koodu lease-capacity-unavailable, ọnọdụ waiting-for-capacity, na `Retry-After` nwere oke nke e wepụtara site na oge mmebi kacha nso dị mkpa. Enweghị eligibility nkịtị abụghị esemokwu lease, ya mere ọ na-ejigide ihe ọ pụtara na njehie nhazi ya dịbu.

Usoro ndị metụtara ya ka dị iche:

- OAuth session occupancy bụ nkesa dị nro nke dị naanị n'ime process maka akaụntụ OAuth.
- Account semaphores na-enye ikike concurrency nke arịrịọ ma kwụsị mgbe arịrịọ mechara.
- Exclusive managed session leases bụ ikike nwe lifecycle na-adịgide adịgide nwere mgbidi generation.

## 3. Mkpọchi Model

**Oke:** njikọ provider + connection + model.

**Oke isi dabere na status:** status dara ada na-ekpebi igodo nke lockout ga-ede
na (`resolveLockoutScope()` dị na `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — mgbaàmà quota ma ọ bụ ikike — kpọchie **ezinụlọ quota**:
  maka codex, oke `codex` / `spark` niile (model `gpt-5*` niile nke
  connection ahụ), maka providers ndị ọzọ `getQuotaScopedModelForProvider()`.
- `404` na-akpọchie model efu (`getModelLockKey()` na-eme ka ọ bụrụ `not_found`).
- Status ọ bụla ọzọ — ọdịda njem/server nke `5xx` na `502` nke OmniRoute
  mepụtara n'onwe ya site na nkwenye ịdị mma — na-akpọchie naanị tuple
  provider/connection/model **kpọmkwem**. Stream ọjọọ n'otu model abụghị ihe akaebe
  gbasara quota account; tupu iwu a, otu nzaghachi efu na
  `codex/gpt-5.6-luna` na-ewepụ model `gpt-5*` niile nke connection ahụ na routing
  ruo nkeji 2–30 (na-arịwanye elu), ebe quota ya anaghị emetụta.
- Nhọrọ `scope` nke caller nyere n'ụzọ doro anya na-emeri mgbe niile (Antigravity na-enye `"exact"`).

**Ebumnuche:** zere ịkwụsị connection dum mgbe naanị otu model adịghị ma ọ bụ quota ya nwere oke.

**Ihe atụ:**

- Providers nwere quota kwa-model na-alọghachi na 429
- Local providers na-alọghachi na 404 maka model na-adịghị
- Ọdịda ikike kpọmkwem nke provider maka mode/model (dịka, modes Grok)

**Mmejuputa:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard Cooldown Model (v3.8.0)

UI: Ntọala → Cooldown Model (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Ọ na-edepụta lockout ndị na-arụ ọrụ yana: provider, connection, model, ihe kpatara ya, expiresAt. Ndị na-ahụ maka ọrụ nwere ike iji kaadị ahụ mee ka model rụọ ọrụ ọzọ n'aka.

**REST API:**

- `GET /api/resilience/model-cooldowns` — depụta lockout ndị na-arụ ọrụ
- `DELETE /api/resilience/model-cooldowns` — mee ka ọ rụọ ọrụ ọzọ n'aka. Ahụ: `{provider, connection, model}`. Nyocha ikike: management.

### Onye Njikwa Cooldown

UI: Nlekota → Onye Njikwa Cooldown (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Otu peeji maka connection ọ bụla na-adịghịzi na routing n'ihi ihe nwa oge, kama
imeghe peeji provider ọ bụla n'otu n'otu. Ọ na-edepụta cooldown connection, lockout
model na ọnọdụ ikpeazụ, na-ekpochapụ ha kwa connection, maka nhọrọ, ma ọ bụ maka
connections niile nke provider, ma dezie iwu cooldown ndị a na-ejikarị eme mgbanwe:
`streamStallCooldown.enabled` na cooldown isi `connectionCooldown` maka OAuth / API-key
yana usoro backoff kacha elu (a na-echekwa ha site na
`PATCH /api/resilience`). A na-edepụta ọnọdụ ikpeazụ (`banned`, `expired`, `credits_exhausted`)
mana ọ dịghị mgbe a na-ekpochapụ ha ebe a.

Kaadị **Iwu cooldown njehie** dị n'otu peeji ahụ na-edezi iwu njehie onye ọrụ
(`settings.providerErrorRules`) na ndabara catch-all kwa-provider
(`settings.providerErrorDefaults`) site na `PATCH /api/settings` — lee "Iwu ndị onye ọrụ
kwupụtara" n'okpuru §7 maka otu ha si dakọrịta. Ogologo oge bụ Default (enweghị cooldown
doro anya), nkeji 30, awa 1, awa 5, awa 24, ma ọ bụ nke omenala site na nkeji 1 ruo
43,200 (ụbọchị 30).

**REST API** (`src/lib/resilience/cooldownManager.ts`, nyocha ikike: management):

- `GET /api/resilience/cooldowns[?provider=]` — connections nwere status, cooldown fọdụrụ,
  ọkwa backoff, ụdị njehie ikpeazụ na lockout model (enweghị nzere)
- `POST /api/resilience/cooldowns` — ahụ `{connectionIds: string[]}` ma ọ bụ
  `{all: true, provider?}`; na-alọghachi `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI ntọala Lockout model + mgbake success-decay (v3.8.23)

Lockout model si n'omume hardcoded na-arụ ọrụ mgbe niile gaa n'ihe a pụrụ ịhazi
kpamkpam, nke a na-agbanye naanị mgbe achọrọ ya, yana kaadị ntọala nke ya na ụzọ
mgbake na-edozi onwe ya.

**Kaadị ntọala:** Ntọala → Lockout Model
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Nke a **dị iche** na `ModelCooldownsCard` dị naanị maka ịgụ nke dị n'elu (nke naanị
_na-edepụta_ lockout ndị na-arụ ọrụ) — kaadị ọhụrụ a _na-ahazi paramita_. Ndabara dị na
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Nchịkọta                | Ndabara                          | Ihe ọ pụtara                                                                |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Mgbanwe isi — lockout model **agbanyụrụ na ndabara**.                       |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Status upstream ndị a na-agụ dịka ọdịda metụtara model.                     |
| `baseCooldownMs`        | `120_000` (120 s)                | Ogologo oge lockout mbụ maka ọdịda mbụ.                                     |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Oke cooldown a na-abawanye ruo.                                             |
| `maxBackoffSteps`       | `10`                             | Ọnụọgụ kachasị nke usoro mmụba exponential-backoff.                         |
| `useExponentialBackoff` | `true`                           | Ma ọdịda ugboro ugboro hà ga-eme ka cooldown na-abawanye n'ụzọ exponential. |

A na-echekwa ntọala site na store ntọala nkịtị ma na-akwado ha site na schema ntọala
resilience; kaadị ahụ na-egbochi `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs`) na `maxBackoffSteps` ka ha ghara ịgafe oke.

**Mgbake success-decay:** mgbake abụghị naanị ka timer gwụ. Nzaghachi dị mma
na-ebelata ọnụ ọgụgụ ọdịda model ka model nke gbakere n'etiti oge ahụ kwụsị
ịbawanye lockout (ma kpochapụ ya) tupu timer ya agwụ. Mgbe combo target gara nke ọma,
`open-sse/services/combo.ts` na-akpọ `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), nke na-ekewa `failureCount` echekwara
n'ọkara (`Math.floor(failureCount / 2)`); mgbe ọ ruru `0`, a na-ehichapụ entry
lockout ahụ kpamkpam. Onye ibe ya `recordModelLockoutFailure()` na-abawanye ọnụ ọgụgụ
(ma na-abawanye cooldown) mgbe ọdịda mere n'ime windo mmụba. Success-decay a na-abịa
na mgbakwunye na expiry timer nkịtị — ụzọ ọ bụla n'ime ha nwere ike ime ka model
rụọ ọrụ ọzọ.

**Ọnọdụ:** a na-ejide lockout **n'ime ebe nchekwa** (ọ bụ `Map`s nke
`ModelLockoutEntry` nke usoro ọ bụla nwere, nke ejiri
`provider:connectionId:model` kpọrọ aha, ebe a na-eji
`provider:connectionId:exact:model` akpọ aha lock ndị nwere oke kpọmkwem), a naghị echekwa ha
na DB — ha na-efunahụ mgbe a malitegharịrị usoro ahụ. A na-echekwa _ntọala_; _ọnọdụ_ lockout na-arụ ọrụ bụ nke na-adịru nwa oge.

---

## 4. Njikwa nkwekọrịta nke oke oke (v3.8.36)

Akaụntụ ndenye aha (GLM, MiniMax, wdg) na-anabatakarị naanị ~ 1-3 arịrịọ otu oge; gafere nke na-akpalite 429s na cooldowns. Nke a bụ nnukwu n'okpuru **oke-oke** (`qtSd/…`) combos, ebe ọtụtụ igodo API na-ekekọrịta otu akaụntụ elu. N'ígwé atọ na-eme ka idei mmiri ghara ikpuchi akaụntụ nkekọrịta.

### Okpu nkwekọrịta nke njikọ otu-otu (`max_concurrent`)

Onye ọ bụla na-enye njikọ nwere ike ikwupụta a `max_concurrent` uko ụlọ (`provider_connections.max_concurrent`, setịpụrụ na njikọ modal / API / DB). Hapụ ya tọgbọrọ chakoo. Nke a bụ otu igodo na-ebugharị oyi akwa serialization dị n'okpuru — debere ya na ezigbo concurrency nke akaụntụ ahụ (dịka GLM ~ 1, MiniMax ~ 2).

### Okpu concurrency n'otu ụdị (`modelConcurrency`)

Njikọ nwekwara ike kwupụta kpọmkwem uko ụlọ concurrency nke ọ bụla n'ime maapụ `rateLimitOverrides` ya:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Tọọ ya na usoro njikọ (**Oke ọnụego gabigara okpu concurrency nke otu ụdị →** , otu `model=cap` kwa ahịrị) ma ọ bụ site na `PATCH /api/providers/[id]` nwere otu ụdị JSON. Nkọwapụta isi:

- **Njikọ-obosara vs ụdị-kpọmkwem:** `maxConcurrent` na-anọgide na-ekekọrịta njikọ-obosara uko ụlọ. Mgbe ha abụọ etinyere, a na-enweta ọnụ ụzọ abụọ atomically n'otu ọnụ ụzọ ámá mejupụtara (`global → provider → account → model`); omume dị irè bụ oke ọdabara.
- **Kpọmkwem egwuregwu igodo nlereanya:** isi ihe bụ eriri ihe nlereanya agafere n'aka onye nrụpụta mgbe emechara mkpebi — na-abụkarị id upstream model (`glm-5`), ọ bụghị onye ahịa-n'akụkụ `provider/model` utu aha (`zai/glm-5` adabaghị `glm-5`). Uru bụ uko ụlọ a na-arịọ ọnụ ọgụgụ dị mma-integer.
- **Ahịrị n'ahịrị mpaghara, enweghị nchọpụta:** Arịrịọ ngafe kwụ n'ahịrị na mpaghara yana usoro mmụta queue/timeout dị ugbu a (mmehie nnabata `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ). OmniRoute anaghị achọpụta ma ọ bụ na-akọwapụta amụma elu — ọ na-amanye kpọmkwem uko ụlọ onye ọrụ ahazi. Ọnụ ụzọ ihe atụ juru eju adịghị eme ka onye na-eweta ya kwụsị ma ọ dịghị emepụta mkpọchi ihe nlereanya na-adịgide adịgide; Omume 429/cooldown/fallback dị elu ka bụ njehie azụ azụ.
- **Njikọ n'otu oge, oke usoro:** Okpu bụ maka njikọ nchekwa data ma debe ya na ebe nchekwa, yabụ njikọ abụọ na-eji otu igodo API dị elu anaghị ejikọta ibe ha.
- **Enweghị nhazi pụtara agbanweghị:** ịhapụ map ahụ (ma ọ bụ hapụ oghere dashboard ahụ efu) anaghị agbakwunye ọ nweghị ọnụ ụzọ ihe atụ. Nhazi ihe atụ na-ekwupụtaghị oke ndị na-eweta ihe ọ bụla:

```text
glm-5=1
glm-4.7=3
```

### Arịrịọ nkekọrịta oke nsonazụ

Mgbe izipu oke oke na-achọ njikọ nke na-ekwupụta `max_concurrent` dị mma, a na-arịọ arịrịọ ahụ n'otu oge.**akaụntụ** A na-edobe ya site na semaphore njikọ ọ bụla (igodo `qsconn:<connectionId>`): arịrịọ ngafe **chere na kwụ n'ahịrị** kama ikpuchi akaụntụ ahụ. Ọ bụ **ada-emeghe** — kwụ n'ahịrị ma ọ bụ nkwụsị oge na-aga na-enweghị oghere karịa ịjụ arịrịọ enwere ike izipu. Banye **Ntọala → Resilience → Quota-oke n'otu njikọ njikọ** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ndabara na). Enweghị okpu `max_concurrent` omume adịghị agbanwe agbanwe.

> Ọnụ ụzọ ụzọ ụzọ nke oke oke (`selectQuotaShareTarget`, DRR + P2C) bụ n'onwe ya na-emeghe ma ọ bụ naanị _deprioritizes_ njikọ na okpu — nwere ọdọ mmiri nwere otu njikọ enweghị ike ịgbachi nkịtị, yabụ semaphore a bụ ihe nwere iju mmiri ahụ n'ezie.

### Ngwakọta cooldown-marakwa ọzọ nwaa

Maka atụmatụ ọ bụla combo (mgbe enyere ya aka), arịrịọ nke ga-eme ka 429 dị jụụ maka SHORT na-adịru nwa oge na-echere ya ma zighachi ya kama ịlaghachi 429 — nke a na-ekpuchi Gemini-class TPM/RPM windows (~ 60s retry- after) na multi-mode combos, eg ma njedebe nke ọnụ ọgụgụ 2-mo. `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) gbara ya n'ime **Ntọala → Resilience** . Ọ dịghị mgbe ọ na-echere `quota_exhausted` (kpọchiri ruo etiti abalị) ma ọ bụ ihe kpatara auth/not-found. Site na ntọala `comboTimeoutMs`, nchere nke na-enweghị ike imecha tupu oge ngwụcha ahụ amaliteghị (#18998): ngwakọta na-aza ozugbo na nzaghachi ọnụ ya kama ịbụ `COMBO_TIMEOUT` 504.

Ngwakọta nwere ike ịpụ na `config.comboCooldownWaitEnabled: false`. Naanị `false` nkịtị na-eme ka echere combo ndị a na-ekekọrịta (ntụgharị nzipu ozi na-echere tupu izipu circuit-open/model-lock na-echere) yana ndọtị oge ezumike nke mmefu ego ha. Na-efu ma ọ bụ `true` na-echekwa amụma zuru ụwa ọnụ; `true` enweghị ike ime ka nchere nwere nkwarụ zuru ụwa ọnụ. `targetTimeoutMs` doro anya ka na-emeri. Nbupu a anaghị agbanwe iche iche-Codex turn-pin tupu izipu echere.

Otu ọnụ ụzọ ámá ahụ na-ekpuchi ikpe tupu izipu (#16319): mgbe a na-agbapụ ihe ọ bụla ezubere iche nke combo tupu e mee mgbalị ọ bụla n'ihi na ihe nlereanya ya na-anọdụ ala na obere oge nkwụsịtụ oge, ụzọ efu efu na-echere mkpọchi n'okpuru otu ụlọ elu ma na-ezigaghachi, kama ịza `503 ALL_TARGETS_SKIPPED` na-enweghị atụ. Mgbe anabataghị echere (elu ụlọ, mbọ ma ọ bụ mmefu ego agwụla, ma ọ bụ njirimara ahụ kwụsịrị), nzaghachi njedebe na-ebuli `429 rate_limit_error` na-ebu `retry_after` / `reset_at` site na njedebe mkpọchi oge mbụ; oke, auth na mkpọchi a na-ahụbeghị na-edobe ihe ngosi-503.

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

## 6. Onye na-ahụ maka ihe na-eme ngwa ngwa (#9709)

Onye nche `resilienceSettings.streamRecovery.throughputWatchdog` nhọrọ na-achọpụta mgbago elu nke ka na-eziga chunks mana na-emepụta ihe enyemaka n'okpuru ọnụego mmepụta bara uru ahaziri. Ọ bụ ụma dị iche na oge nkwụsị na-abaghị uru: obi mgbawa na metadata ntọgharị abụghị ngụ oge na anaghị agụta dị ka ọganihu. Ọ dịkwa iche na njedebe mgbalị siri ike (#9153), nke na-anọgide na-echekwa nchekwa zuru oke n'agbanyeghị àgwà mmepụta.

Ndị nche na-achọ oge ikpo ọkụ ga-esochi windo na-agbagharị agbagharị zuru oke tupu ya enwee ike ibipụ. Ọ na-agụta deltas ederede site na mmecha nkata na nzaghachi API mmemme mmepụta (proxy UTF-8 byte conservative), na-eleghara mmemme naanị ojiji na efu, ma kwụsịtụ ikpe mgbe oku ngwaọrụ ma ọ bụ ihe ntụgharị uche na-agba ọsọ. Ọ nwere nkwarụ site na ndabara ma nwee ike iji `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` mee ya (ọnụ ahịa env ahụ bụ naanị mkpụrụ nke ndabara — a zọpụtara `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean na-enweta mmeri; lee akwụkwọ mbu env-vs-dashboard dị n'elu ntuziaka a); mpio, ikpo ọkụ, opekempe ọnụego, na kacha nta mmepụta na-ejichi nkịtị resilience-ntọala normalization oyi akwa.

Mgbe enyere ya aka, a na-etinye ihe nleba anya ime naanị maka mbọ mgbago elu na-arụ ọrụ. Tupu bytes ọ bụla a na-ahụ anya nke ndị ahịa, ụzọ mgbake mbụ nke otu akaụntụ dị nwere nwere ike imepegharị mbọ ahụ. Mgbe emechara, a naghị emegharị iyi ahụ na-enweghị isi; naanị nkwekọrịta na-aga n'ihu n'etiti mmiri dị mma nwere ike ịdụnye suffix. Mmecha na-anọgide na-otu-mgba, ya mere azaghị ojiji na ntọhapụ semaphore abụghị oyiri.

---

## 7. Nkwughachi Ọnọdụ Upstream (njehie oke ọnụọgụ e kọrọ n'ụzọ na-ezighị ezi)

**Oke ọrụ:** otu upstream gateway nke na-akọ na oke ọnụọgụ agwụla nwa oge site na HTTP status na-ezighị ezi.

**Ebumnuche:** imezi status na-eduhie BEFORE nhazi, ka ndị na-eri nsonaazụ n’ala ala (fallback engine, nchịkọta combo, nzaghachi na-aga n’aka onye ahịa) wee hụ ọdịdị ọdịda a nke a pụrụ ịnwale ọzọ n’ezie.

Ụfọdụ gateway na-egosi na oke ọnụọgụ agwụla nwa oge site na HTTP
status nke a na-apụghị ịnwale ọzọ. `agentrouter.org` na-eweghachite `403`
(mgbe ụfọdụ `400`) na body Chinese
(`用户额度不足` / `额度不足`) kama ọkọlọtọ `429`. Ndị ahịa dị ka Claude
Code na-ewere `403` dị ka nke na-adịgide adịgide ma kwụsị session ahụ, ma ọ bụrụ na
emezighị ya, fallback engine ga-ahazi ya dị ka `AUTH_ERROR` kama ịbụ
ihe omume oke ọnụọgụ.

**Mmejuputa:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — ndepụta
  iwu kwa-provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), nke a na-achọta site na `applyStatusRestatement()`.
- Ebe a na-akpọ ya: ngọngọ `providerFailure:` dị na
  `open-sse/handlers/chatCore.ts` (ihe dị ka ahịrị 3654), ozugbo
  `parseUpstreamError()` nyochachara nzaghachi upstream nwere HTTP status njehie
  (`!providerResponse.ok`), tupu nhazi ọ bụla amalite, ka onye ọ bụla na-eri nsonaazụ n’ala ala wee hụ
  status e meziri. Njehie ndị zoro n’ime stream SSE `200` na-eso ụzọ ọzọ,
  nke na-abịa mgbe e mesịrị n’ịgụ stream, ma **hook** a anaghị ekpuchi ha taa — nke a bụ
  njedebe a maara, ma ọ dịbeghị mkpa maka misstatus nke agentrouter
  (nke na-apụta dị ka HTTP status njehie).
- Ikike ịnwale ọzọ: `429` dị na
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), ya mere njehie e
  kwughachiri status ya na-eburu windo nnwale ọzọ n’ezie kama ịpụta dị ka `403` nwụrụ anwụ.
- Synthetic `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  bụ naanị ihe nzaghachi e meziri na-agwa **onye ahịa**; ọ bụghị n’onwe ya oge
  njikọ ahụ ga-eji jụ ma ọ bụ kwụsị ọrụ n’ime — usoro ọ bụla na-ejikwa njehie ahụ
  e meziri status na-achịkwa ya iche
  (Connection Cooldown nwere escalating backoff, §2, base `3s` maka ndị
  provider API-key; ma ọ bụ Model Lockout, §3, maka ndị provider nwere quota kwa-model dị ka
  agentrouter). Router nwere ike iru eru ịnwale ọzọ n’ime ya tupu windo 60s
  ọ na-ekwupụta nye onye ahịa — nke a bụ ohere e kpachapụrụ anya, ọ bụghị njehie.

Njehie na-adịgide adịgide (`无权访问模型` nke agentrouter — enweghị ikike ịnweta
model a) anaghị mgbe ọ bụla enweta nkwughachi status: `excludeMarkers` na-ajụ iwu ahụ ọbụna mgbe
`textMarkers` dakọtara, ya mere njehie ahụ na-edobe status mbụ ya, ọ dịghịkwa ihe ga-anwale ya ọzọ ruo mgbe ebighị ebi. Iwu nhazi
provider kwekọrọ
(`agentrouter-model-access-denied` dị na `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, base cooldown ekwuputara nke `6h`) ka
`checkFallbackError` (`open-sse/services/accountFallback.ts`)
na-enyocha _tupu_ nloghachi ngwa ngwa `FORBIDDEN` nke ngalaba apikey, ma a na-achịkwa ya site na
`honorsRuleLockScope(provider)` (#10334 — ugbu a ọ bụ naanị agentrouter site na
ndepụta ikike `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dị na
`providerErrorRules.ts`). Cooldown `6h` nke iwu ahụ kwupụtara na-aga n’ihu dị ka
`fallbackResult.baseCooldownMs`, ma ọ ka na-abanye n’ụzọ lockout quota kwa-model nke dịbu adị
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, nke #10334 agbanwebeghị ma e wezụga ebe cooldown si abịa):
a na-egbutu ya ruo `mlSettings.maxCooldownMs` nke onye ọrụ setịpụrụ
(default `1_800_000ms` / 30min), dịka lockout model ọ bụla ọzọ, ma
_ebumnuche lockout echekwara_ ka bụ `"forbidden"` nke e debere n’ike,
ọ bụghị `"auth_error"` nke iwu ahụ — naanị oge cooldown ka a na-asọpụrụ site na mmalite ruo ọgwụgwụ, ọ bụghị eriri ihe kpatara ya. Njikọ ahụ n’onwe ya ka na-arụ ọrụ;
model nwanne ndị dị n’otu njikọ ahụ anaghị emetụta.

Njehie quota e kwughachiri (`额度不足`) na-erute iwu provider n’ime nrụpụta n’ezie
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, enweghị cooldown nke ya ekwuputara — ndabere backoff nke persistence
layer ka na-arụ ọrụ). Kemgbe #10334, `scope` dị na
`ProviderErrorRuleMatch` na-eji ya site na mmalite ruo ọgwụgwụ, mana **naanị** maka providers dị na
ndepụta ikike `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
taa naanị `"agentrouter"`, nke a na-achịkwa site na `honorsRuleLockScope()`). Maka provider
ọ bụla ọzọ `scope` ka bụ naanị ihe ọmụma, kpọmkwem dịka ọ dị tupu #10334.
`checkFallbackError` na-ebupụta scope nke iwu dakọtara dị ka
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) bụ nchedo nkekọrịta nke na-akwado na
`ruleScope` dị mma n’ezie ịsọpụrụ dị ka akara na-emetụta njikọ niile ma na-agbake n’onwe ya
(scope `"connection"`, reason `quota_exhausted`, ọ bụghị mgbe ọ bụla `permanent`,
ọ bụghị mgbe ọ bụla `creditsExhausted` — nchekwa megide iwu n’ọdịnihu nke jikọtara scope
`"connection"` na ọnọdụ akaụntụ na-adịgide adịgide). Ndị na-azụ nsonaazụ abụọ na-akpọ ya:

- **Nchekwa** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  kama ịdaba na alaka mkpọchi **kwa-model** nke passthrough-provider
  (`agentrouter` bụ `passthroughModels: true` → `hasPerModelQuota()`
  na-eweghachi `true`), ọ na-etinye **oge jụrụ njikọ nwa oge** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ọ bụghị status ikpeazụ
  (`credits_exhausted`/`banned`/`expired`) — ka njikọ ahụ wee weghachite onwe ya
  mgbe oge jụrụ ahụ gafere kama ịchọ nrụpụta nzere aka. A na-awụpụ nke a maka
  njikọ nwere `disableCooling: true` (#2997): nhọrọ ịjụ nke a na-aga na mkpọchi
  kwa-model kama (trade-off e dere n'akwụkwọ — lee nkọwa koodu dị n'elu alaka ahụ).
- **Ntugharị combo n'ime otu arịrịọ** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): otu nchedo ahụ na-akanye
  njikọ ahụ n'ime set `exhaustedConnections` nke dị na ebe nchekwa, jiri igodo
  `${provider}:${connectionId}`. Nke a na-awụpụ naanị target SAME-REQUEST fọdụrụ
  nke _ya onwe ya nwere otu `connectionId` ahụ kpọmkwem_ n'ihe target nke ya
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` tupu nyocha `exhaustedConnections`) — combo ndepụta-model nkịtị,
  ebe target ndị ibe ya enweghị `connectionId` e tinyere n'onwe ha ma a na-achọpụta
  naanị otu n'ime ha kwa-dispatch site na isi `X-OmniRoute-Selected-Connection-Id`
  nke nzaghachi, agaghị akụnye igodo ahụ. Maka ọnọdụ a na-adịkarị, ezigbo nchedo
  megide leg fọdụrụ iji akaụntụ ahụ ka ewepụrụ abụghị Set a — ọ bụ oyi akwa
  persistence dị n'elu (`rateLimitedUntil` nke njikọ ahụ dị n'ọdịnihu ugbu a)
  tinyere otu nchedo a na-egbochi itinye `transientRateLimitedProviders` n'ime
  ọdịda (lee "Nhazi ogbo abụọ" na nkọwa koodu dị na alaka
  `isAgentrouterConnectionQuotaScope` na `targetExhaustion.ts`): ebe a hapụrụ Set
  ahụ n'enweghị akara pụtara na `combo.ts`'s `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) agaghị arụ ọrụ maka legs
  fọdụrụ nke provider ahụ, ya mere a na-asọpụrụ nzacha `rateLimitedUntil` nke nhọrọ
  nzere (`src/sse/services/auth.ts:1238`) dịka ọ na-adị, leg fọdụrụ ga-ahọrọ
  njikọ agentrouter ọzọ ka dị irè ma ọ bụ daa n'ihi na nzere adịghị — ọ gaghị eji
  ike laghachi na njikọ alaka a ka jụrụ oyi ugbu a.

### Nhazi ogbo abụọ: nkwughachi status, wee nhazi ụdị

Nkwughachi status (`upstreamStatusRestatement.ts`) na iwu nhazi ụdị nke provider
(`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) bụ ndekọ abụọ dị iche iche nke na-eji id provider na
akara ederede dị ka igodo, mana ha na-arụ ọrụ n'ebe dị iche iche ma nwee ebumnuche
dị iche: nkwughachi na-edegharị status HTTP n'oge mbụ na `chatCore.ts`;
iwu nhazi ụdị na-ahọrọ `reason` ndabere ma kpọchie `scope`
(`model` / `provider` / `connection`) n'ime `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Iwu nhazi ụdị na-ahụ naanị **ederede** njehie zuru ezu (nke dị mkpa iji dakọta
akara dị n'ime ahụ dị ka `额度不足`) maka provider ndị e depụtara na allowlist
`FULL_TEXT_RULE_PROVIDERS` dị na `providerErrorRules.ts` — ugbu a ọ bụ naanị
`"agentrouter"`. Maka provider **built-in catalog** ndị ọzọ niile,
`checkFallbackError` na-enyefe `getProviderErrorRuleMatch` naanị njehie ahaziri
(`{code, type}`), nke zuru ezu maka iwu dabere na header/status/code mana ọ naghị
ahụ akara ederede dị n'ime ahụ. Onye inyeaka `resolveRuleMatchBody()` na-eme
nhọrọ a: ederede njehie zuru ezu maka provider ndị nọ na allowlist, njehie
ahaziri maka ndị ọzọ. Ịtinye provider **built-in** na
`FULL_TEXT_RULE_PROVIDERS` bụ nhọrọ doro anya kwa-provider — ọ dị ka nke a ka
ụzọ ndabere maka provider ọ bụla na-adịghị na ndepụta ahụ wee nọgide otu byte
site na byte.

`scope` nke iwu (`model` / `provider` / `connection`) bụ nhọrọ dị iche na
`FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` na-egosi ya naanị dị ka
`fallbackResult.ruleScope`, ndị na-eri ya n'okpuru na-asọpụrụ ya naanị dị ka ihe
karịrị akara ọmụma maka provider ndị nọ na allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` dị n'otu faịlụ ahụ (a na-achịkwa site na
`honorsRuleLockScope()` — taa ọ bụ naanị `"agentrouter"`). Lee "Njehie quota
e kwughachiri" n'elu maka ihe dakọtara `scope: "connection"` na-eme n'ezie mgbe
provider nọ na allowlist ahụ.

**#11104 — iwu onye ọrụ kwupụtara na-agafe allowlist abụọ ahụ.** Onye na-ahụ maka
ọrụ nwere ike ikwupụta iwu kwa-provider n'oge ọsọ site na
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
na-enweghị edezi faịlụ a. Ịkpọchi iwu onye ọrụ n'azụ
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlist ndị e
mere iji chekwaa omume **ndabere** nke iwu built-in catalog — ga-eme ka usoro
settings ahụ ghara ịrụ ọrụ maka provider ọ bụla e wezụga ndị edepụtara ebe ahụ,
n'ihi na ikwupụta iwu ahụ bụworị nhọrọ doro anya nke onye ọrụ. Ma
`resolveRuleMatchBody()` ma `honorsRuleLockScope()` na-elele
`hasOperatorRuleForProvider()` nke mbụ: provider nwere iwu onye ọrụ na-enweta
ederede njehie raw ma a na-asọpụrụ `scope` o kwupụtara, n'agbanyeghị ma ọ dịkwa
na allowlist ọ bụla.

**Iwu onye ọrụ kwupụtara** (`OperatorProviderErrorRule`): iwu ọ bụla nwere
`status` nhọrọ na `match` nhọrọ (substring dị mfe, nke na-adịghị elebara
mkpụrụedemede ukwu/nta anya, nke ederede njehie, ọ bụghị RegExp, ya mere ọ
gaghị akpata ReDoS), ma ọ ga-ederịrị opekata mpe otu n'ime ha. Mgbe edobere ha
abụọ, a na-ejikọta ha site na AND; ubi a hapụrụ na-adakọta ihe ọ bụla, ya mere
`{match: "insufficient_quota"}` na-adakọta status ọ bụla nwere code ahụ. Iwu
mbụ dakọtara na-emeri. `cooldownMs` na-anabata ruo ụbọchị 30; iwu niile agaghị
akarị 50.

**Ndabara ndị na-ejide ihe niile** (`settings.providerErrorDefaults`, opt-in, a na-edobe ya site na
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
na `cooldownMs` sitere na nkeji 1 ruo ụbọchị 30. Ndabara na-arụ ọrụ naanị mgbe enweghị iwu onye ọrụ na enweghị iwu katalọgụ arụnyere dakọtara, nakwa naanị maka njehie 402, 403, 408, 429 na 5xx. Njehie ụdị arịrịọ (400, 404, 409, 413, 422) na 401 ndị na-enweghị nkọwa ka na-eji njikwa nke ha. Ọ bụrụ na enweghị `reason` akọwapụtara, ihe kpatara ya na-abịa site na ọnọdụ ahụ, otu `classifyError` si eme ya. Ịkpọsa ndabara na-agụta dị ka iwu onye ọrụ maka `hasOperatorRuleForProvider()`, ya mere a na-asọpụrụ `scope` ya (ndabara bụ `"connection"`). `cooldown` dị irè nke ndabara bụ nke dị ogologo n’etiti `cooldownMs` ya na ntụaka retry nke onye na-enye ọrụ n’onwe ya (`Retry-After`,
`x-ratelimit-reset` ma ọ bụ ntụaka reset dị n’ime body, otu ntụaka ahụ engine na-asọpụrụ mgbe “use upstream retry hints” nke nj 설정 connection-cooldown dị), ya mere ndabara nwere ike ịgbatị ntụaka upstream dị mkpirikpi mana ọ dịghị mgbe ọ ga-eme ka reset dị adị dị mkpụmkpụ. Iwu onye ọrụ doro anya na-edobe `cooldownMs` ya kpọmkwem. Ma iwu ma ndabara adịghị agafe ndị nche connection-cooldown dị na `markAccountUnavailable`: cooldown na-arụ ọrụ nke dị ogologo karịa anaghị adị mkpụmkpụ, a naghị edochikwa ọnọdụ terminal. Ndị na-achọpụta ederede arụnyere nke na-agba ọsọ tupu mgbe ahụ na `checkFallbackError` (credits agwụla, oke ụbọchị, akaụntụ kwụsịrị ọrụ) ka na-ebute ụzọ maka ahịrịokwu nke ha.

**Oghere amaara — `providerRuleRegistry` anaghị elele HTTP 400.**
Alaka `BAD_REQUEST` nke `checkFallbackError` na-ekewa ọnọdụ 400 kpamkpam site na nhazi pattern nke ya (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, wdg. dị na `accountFallback.ts`) ma laghachi tupu alaka `configuredRule`/`getProviderErrorRuleMatch` dị n’elu erute ya.
Iwu katalọgụ arụnyere (ma ọ bụ iwu onye ọrụ) nwere `status: 400` bụ nke ziri ezi n’usoro ederede mana ọ gaghị agba ọsọ. Enweghị iwu dị ugbu a na-elekwasị anya na 400, ya mere ọ nweghị ihe mmepụta na-emetụta — mana iwu 400 n’ọdịnihu ga-achọ ka e buru ụzọ metụta alaka a, nke bụ mgbanwe ka ukwuu karịa ịgbakwunye iwu (ọ na-ekewa 400 ọzọ maka onye na-enye ọrụ ọ bụla na-adabere na omume pattern-array ahụ) ma ọ dịghị n’ókè nke mgbakwunye iwu maka otu onye na-enye ọrụ.

### Ịgbakwunye gateway ọhụrụ na-akọwa oke n’ụzọ na-ezighi ezi

1. Debanye otu nhazi iwu na `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mee ka `textMarkers`
   bụrụ nke onye na-enye ọrụ ahụ kpọmkwem; ejila ahịrịokwu Bekee izugbe ndị na-adaba na
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) ọzọ.
2. Nhọrọ ọzọ bụ ịdebanye iwu nhazi ọkwa na
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) iji họrọ
   oke mkpọchi ziri ezi (`connection` maka oke metụtara akaụntụ niile,
   `model` maka njehie metụtara model nke ọ bụla). Nzọụkwụ a na-arụ ọrụ naanị na mmepụta maka ndị na-enye ọrụ iwu ha chọrọ ederede njehie zuru ezu (body markers): tinye id onye na-enye ọrụ ahụ na `FULL_TEXT_RULE_PROVIDERS` n’otu faịlụ ahụ — ma ọ bụghị ya, `checkFallbackError` na-enyefe iwu ahụ naanị njehie ahaziri
   `{code, type}` ma iwu body-text agaghị adaba na okporo ụzọ dị ndụ.
   Iwu ndị na-adaba naanị na `status`/`headers` (dị ka nke Opencode ma ọ bụ nke
   Minimax) achọghị opt-in a. N’iche ọzọ, ọ bụrụ na iwu ahụ kwupụtara
   `scope: "connection"` ma ebumnuche ya bụ cooldown metụtara connection niile
   yana ịwụpụ combo nke otu arịrịọ ahụ (ọ bụghị naanị aha na-akọwa ya), tinye id
   onye na-enye ọrụ ahụ na `HONORS_RULE_LOCK_SCOPE_PROVIDERS` n’otu faịlụ ahụ — nke a bụ ihe na-achịkwa ojiji ụdị `isAgentrouterConnectionQuotaScope()` na
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) na
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); na-enweghị ya, `scope`
   ka na-agafe na `fallbackResult.ruleScope` mana ọ nweghị ihe na-eme ya.
3. Tinye ule unit ndị yiri
   `tests/unit/upstream-status-restatement.test.ts`
   na `tests/unit/agentrouter-error-rules.test.ts` (gụnyere ndị nche
   not-permanent / not-creditsExhausted, yana — ọ bụrụ na onye na-enye ọrụ ahụ chọrọ
   allowlist — ule na-akwado na `resolveRuleMatchBody()` na-eweghachite ederede zuru ezu naanị maka onye na-enye ọrụ ahụ).

Ọ dịghị mgbanwe achọrọ na `chatCore.ts`, `classifyError`, ma ọ bụ combo.

#### Mkpọchi e kewara site na egress (#10880)

A na-emeso ndị na-enye ọrụ nọ na `EGRESS_BUCKETED_LOCK_PROVIDERS` (ezinụlọ opencode) dị ka upstream nke e kewara site na IP (free tier opencode bụ nke IP na-ekewa, ọ bụghị nke akaụntụ na-ekewa — lee #9611): status-429 nke e kewara dị ka
`quota_exhausted` **ma ọ bụ** `rate_limit_exceeded` na-eme ka connection ezinụlọ allowlisted ọ bụla nke IP egress ikpeazụ a maara ya dabara na nke connection dara daa jụụ, tupu rotation enwee ike ịnwale ha
— na-ezere oku upstream N-1 a maara na ha ga-ada (ụdị ahụ ka #10460/#10525).
A gụnyere `rate_limit_exceeded` n’ebumnuche: n’ụzọ `markAccountUnavailable`,
iwu pụrụ iche opencode anaghị adaba (n’ihi na `checkFallbackError` anaghị enweta headers/body, opencode adịghịkwa na `FULL_TEXT_RULE_PROVIDERS`), ya mere 429 nke body ya nwere ederede subscription-quota ("monthly usage limit reached") na-ekewa dị ka `quota_exhausted` site na quota-text fallback
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown nke awa 1) tupu erute iwu
`status_429` — ebe 429 na-enweghị quota-text (rate limiting nkịtị) na-ekewa site na iwu
`status_429` dị ka `rate_limit_exceeded` ma ka na-eme ka ezinụlọ IP ahụ daa jụụ. Maka onye na-enye ọrụ nọ na allowlist, rate limit nke IP na-ekewa bụ otu mgbaàmà ahụ na quota agwụla. Oke ndị ezi uche dị na ha:

- **Mgbalị kacha mma**: mkpọchi ahụ na-edozi `egress_ip` ikpeazụ a maara nke njikọ ahụ
  site na `proxy_logs` (oge awa 24, n'otu oge, enweghị cache). Cache oyi (`egress
IP` a nyochabeghị mbụ) ma ọ bụ enweghị ahịrị → a ka na-eme ka njikọ na-ada ada
  jụọ site na ngalaba ahụ (a na-edekọ ya dịka taa), naanị na a naghị akpọchi nwanne ọ bụla.
- **Ọ bụghị nke na-agwụ agwụ**: cooldown bụ windo oke na-emegharị onwe ya
  (`testStatus: "unavailable"`); a naghị esi na mgbaàmà IP-level nweta steeti na-adịgide adịgide.
  Njikọ `disableCooling` na-ahapụ ngalaba ahụ kpamkpam.
- **Nkọwa ogo mkpọchi na-agbanwe maka ezinụlọ dị na allowlist**: nke a bụ mgbanwe scope,
  ọ bụghị naanị nkwalite maka nwanne. opencode bụ onye na-enye `passthroughModels`,
  yabụ tupu ngalaba a, 429 na-emepụta mkpọchi kwa-MODEL; ugbu a ọ na-emepụta cooldown
  njikọ — gụnyere maka onye ọrụ na-agba naanị otu njikọ na-enweghị nwanne ọ bụla.
  Nke ahụ bụ ogo nke tebụl iwu opencode kwupụtalarị na ọ ziri ezi (`scope: "connection"`,
  `providerErrorRules.ts`), mana a kwadobeghị ya ruo ugbu a n'ihi na opencode adịghị na
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Ngalaba ahụ n'onwe ya na-ede cooldown njikọ na-ada ada
  yana `backoffLevel`, na-eṅomi ngalaba agentrouter nke nwere scope njikọ, ma laghachi —
  a naghị eru na mgbochi kwa-model na ụzọ izugbe dị n'okpuru.
- **Combo gụnyere**: dịka ngalaba agentrouter, scope ahụ na-eleghara mbelata
  `persistUnavailableState`/`isCombo` nke onye na-akpọ combo na-etinye na 429 anya.
  Mkpọchi kwa-model abụghị ụdị dị nro nke scope a, ọ bụ unit na-ezighi ezi: ọ naghị ekwu
  ihe ọ bụla gbasara IP agwụla ike, yabụ ntụgharị combo ga-anọgide na-eme otu oku
  a ga-ada ada n'ezie n’aka nwanne ọ bụla.
- **Nchekwa nwanne**: a naghị edegharị nwanne nke nọlarị na steeti na-agwụ agwụ
  (banned/credits_exhausted) ma ọ bụ nke nọlarị na cooldown dị ogologo karịa.
- **Allowlist pụrụ iche**: ịgbasa `EGRESS_BUCKETED_LOCK_PROVIDERS` bụ mkpebi doro anya nke onye nwe ya;
  enweghị njikọ izugbe (pattern #10334/#10419). Ajụjụ nwanne ahụ na-ejikọta otu allowlist ahụ
  kama ịmegharị ya dịka SQL literal, yabụ ịgbasa ya na-anọgide bụrụ mgbanwe otu ahịrị.
- **Ntughari Egress IP, n'akụkụ abụọ**: windo nchọta (awa 24) sara mbara nke ukwuu karịa
  TTL cache egress-IP (nkeji 5), yabụ “IP ikpeazụ a maara” bụ akụkọ ihe mere eme,
  ọ bụghị steeti dị ugbu a. Ọ bụrụ na proxy njikọ tụgharịrị n'ime windo ahụ, mkpọchi ahụ nwere ike
  **ịhapụ** IP a na-ekekọrịta n'ezie (IP e dekọrọ bụ nke ọhụrụ, nke agwụbeghị) — n'otu aka ahụ,
  ọ nwere ike **ime ka nwanne nke tụgharịrị pụọ** n’IP agwụla ike jụọ. Ọnọdụ nke abụọ na-efu
  nwanne ahụ otu windo cooldown; a nabatara ha abụọ dịka oke mgbalị kacha mma nke nchọta dabere n'akụkọ ihe mere eme.
- **Ọnụ ahịa**: nyocha abụọ nwere oke nke `proxy_logs` (a na-enyocha windo site na
  `idx_pl_timestamp`), naanị mgbe ugboro 429 dị. Enweghị index ọhụrụ (migration 134
  YAGNI). A tụrụ ya n'otu oyiri DB nwere okporo ụzọ n'ezie nke nha etiti; instance
  nwere throughput dị elu na-ejide ahịrị ndị ọzọ n'otu windo ahụ n'ụzọ kwekọrọ.

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
