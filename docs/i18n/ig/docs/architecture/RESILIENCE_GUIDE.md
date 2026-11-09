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

## 4. Njikwa Njikọta Quota-Share (v3.8.36)

Akaụntụ ndebanye aha (GLM, MiniMax, wdg.) na-anabatakarị naanị arịrịọ jikọtara ọnụ ~1–3; ịgafe ọnụ ọgụgụ ahụ na-ebute 429s na oge jụrụ oyi. Nke a na-akawanye njọ n'okpuru ngwakọta **quota-share** (`qtSd/…`), ebe igodo API dị iche iche na-ekerịta otu akaụntụ upstream. Usoro atọ na-egbochi ideju akaụntụ a.

### Oke njikọta kwa njikọ (`max_concurrent`)

Njikọ onye na-eweta ọrụ ọ bụla nwere ike ikwupụta oke `max_concurrent`
(`provider_connections.max_concurrent`, nke a na-edobe na modal njikọ / API / DB).
Hapụ ya oghere ma ọ bụrụ na ịchọghị oke. Nke a bụ naanị bọtịnụ na-achịkwa
usoro serialization dị n'okpuru — debe ya ka ọ hà nhata njikọta akaụntụ ahụ
(n'ịmaatụ, GLM ~1, MiniMax ~2).

### Oke njikọta kwa ụdị (`modelConcurrency`)

Njikọ nwere ike ikwupụtakwa oke njikọta kpọmkwem maka ụdị ọ bụla
n'ime map `rateLimitOverrides` ya:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Debe ya na modal njikọ (**Rate limit overrides → Per-model
concurrency caps**, otu `model=cap` n'ahịrị ọ bụla) ma ọ bụ jiri
`PATCH /api/providers/[id]` nwere otu ọdịdị JSON ahụ. Ihe igodo ya pụtara bụ:

- **Oke njikọ dum na nke ụdị kpọmkwem:** `maxConcurrent` ka bụ oke njikọta
  nke njikọ ahụ dum. Mgbe ha abụọ metụtara, a na-enweta gates abụọ ahụ
  n'otu oge n'ime composite gate
  (`global → provider → account → model`); omume dị irè bụ oke siri ike
  karị n'ime oke ndị metụtara.
- **Nkwekọrịta igodo ụdị kpọmkwem:** igodo ahụ bụ eriri ụdị a gafere executor
  mgbe emechara routing resolution — na-adịkarị ka bare upstream model id
  (`glm-5`), ọ bụghị alias `provider/model` nke akụkụ client
  (`zai/glm-5` adabaghị na `glm-5`). Ụkpụrụ ndị ahụ bụ oke arịrịọ jikọtara ọnụ
  nke integer dị mma.
- **Queue mpaghara, enweghị nchọpụta:** arịrịọ gafere oke na-abanye n'ahịrị
  n'ime mpaghara, na-eji semantics queue/timeout dị ugbu a (njehie nnabata
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` nke nwere ụdị). OmniRoute anaghị
  achọpụta ma ọ bụ tụọ iwu upstream — ọ na-amanye naanị oke ndị onye ọrụ
  haziri kpọmkwem. Gate ụdị jupụtara anaghị agbanyụọ onye na-eweta ọrụ ma ọ bụ
  mepụta mgbochi ụdị na-adịgide adịgide; omume njehie backstop nke upstream
  429/cooldown/fallback ka dị.
- **Oke kwa njikọ, kwa process:** oke ndị a bụ kwa njikọ nchekwa data ma na-adị
  n'ime ebe nchekwa, ya mere njikọ abụọ na-ejikwa otu igodo API upstream
  anaghị ahazi onwe ha.
- **Ihe a hazighị pụtara na ọ dịghị mgbanwe:** ịhapụ map ahụ (ma ọ bụ ịhapụ
  ubi dashboard ahụ oghere) anaghị etinye gate ụdị ọ bụla. Nhazi atụ na-enweghị
  ikwupụta oke universal nke onye na-eweta ọrụ ọ bụla:

```text
glm-5=1
glm-4.7=3
```

### Serializashọn arịrịọ Quota-share

Mgbe dispatch quota-share na-ezube njikọ nke kwupụtara `max_concurrent` dị mma,
a na-esi na semaphore kwa njikọ (igodo `qsconn:<connectionId>`) hazie arịrịọ
ndị na-aga n'otu **akaụntụ** ahụ: arịrịọ gafere oke **na-eche n'ahịrị** kama
ideju akaụntụ ahụ. Ọ bụ **fail-open** — queue jupụtara ma ọ bụ timeout na-aga
n'ihu na-enweghị slot kama ịjụ arịrịọ enwere ike dispatch mgbe ọ bụla. Gbanwee
ya na **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, nke
ndabara ya bụ on). Ọ bụrụ na enweghị oke `max_concurrent`, omume ahụ anaghị
agbanwe.

> Gate routing quota-share (`selectQuotaShareTarget`, DRR + P2C) n'onwe ya
> bụ fail-open ma na-ebelata naanị ọkwa njikọ nke ruru oke — na pool nwere
> naanị otu njikọ, ọ nweghị ike itinye oke siri ike, ya mere semaphore a bụ
> ihe na-egbochi ideju ahụ n'ezie.

### Retry na-amata cooldown nke combo

Maka atụmatụ combo ọ bụla (mgbe agbanyere ya), arịrịọ nke ga-eme ka 429
kwụsie ike maka cooldown dị mkpirikpi nke na-adịru nwa oge na-eche ka ọ gafee
ma zighachi ya kama iweghachite 429 — nke a gụnyere windo TPM/RPM nke ụdị
Gemini (~60s retry-after) na combo nwere ọtụtụ ụdị, dịka targets abụọ nke combo
ụdị abụọ na-erute oke ọnụego kwa ụdị. `comboCooldownWait` na-ekpebi oke ya
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) na **Settings → Resilience**.
Ọ naghị eche mgbe ọ bụ `quota_exhausted` (akpọchiri ruo etiti abalị) ma ọ bụ
maka ihe kpatara auth/not-found.

Combo nwere ike ịpụ na ya site na `config.comboCooldownWaitEnabled: false`.
Naanị `false` nke bụ literal na-agbanyụ waits combo ndị a na-ekekọrịta
(cooldown mgbe dispatch gasịrị na waits circuit-open/model-lock tupu dispatch)
yana ndọtị wait-budget timeout-floor ha. Ọ bụrụ na ọ na-efu ma ọ bụ bụrụ `true`,
amụma zuru ụwa ọnụ ka na-arụ ọrụ; `true` enweghị ike ịgbanye waiting nke ụwa
dum agbanyụrụ. `targetTimeoutMs` akọwapụtara n'ụzọ doro anya ka na-enwe
mmeri. Nhọrọ ịpụ a anaghị agbanwe pre-dispatch wait nke native-Codex
turn-pin dị iche.

Otu gate ahụ na-ekpuchikwa ọnọdụ pre-dispatch (#16319): mgbe a na-amapụ
target combo niile tupu emee mbọ ọ bụla n'ihi na ụdị ha nọ n'ime mkpọchi
dị mkpirikpi nke na-adịru nwa oge, ụzọ zero-attempt na-eche ka mkpọchi ahụ
gwụ n'okpuru oke ndị ahụ ma zighachi ya, kama ịza
`503 ALL_TARGETS_SKIPPED` na-enweghị hint. Mgbe enweghị ikike ichere (oke,
mbọ ma ọ bụ budget agwụla, ma ọ bụ feature agbanyụrụ), nzaghachi ikpeazụ na-
aghọ `429 rate_limit_error` nke nwere `retry_after` / `reset_at` sitere na
oge mkpọchi nwa oge kacha nso ga-agwụ; mkpọchi quota, auth na not-found ka
na-edobe 503 na-enweghị hint.

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
