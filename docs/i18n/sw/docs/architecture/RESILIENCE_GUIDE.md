# Resilience Guide (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ina njia tatu tofauti lakini zinazohusiana za ustahimilivu. Kila moja ina upeo tofauti na kusudi. Ziweke tofauti wakati wa kurekebisha tabia ya uelekezaji.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Chanzo: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-dashibodi utangulizi kwa ajili ya kugeuza uthabiti.** Ustahimilivu wa kuchagua kuingia hugeuza mbegu kutoka kwa mazingira — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — hutoa tu _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). boolean iliendelea katika `resilienceSettings` (Dashibodi →** Mipangilio Ustahimilivu →** / `PATCH /api/resilience`, iliyohifadhiwa katika `key_value`) inashinda thamani ya env: kuhalalisha (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) huweka boolean iliyohifadhiwa wakati wowote inapokuwepo. Kuweka env var kama `true` kwenye upelekaji ambapo dashibodi tayari imehifadhiwa `false` kwa hivyo haibadilishi chochote — geuza kibadilishaji ndani** Mipangilio Ustahimilivu →** (au futa sehemu iliyohifadhiwa) badala yake.

## 1. Mvunja Mzunguko wa Mtoa Huduma (Provider Circuit Breaker)

**Wigo:** mtoa huduma mzima (k.m., `glm`, `openai`, `anthropic`).

**Kusudi:** kuacha kutuma trafiki kwa mtoa huduma anayeshindwa mara kwa mara katika kiwango cha upstream/huduma.

**Utekelezaji:**

- Darasa kuu: `src/shared/utils/circuitBreaker.ts`
- Muunganisho: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API ya hali: `GET /api/monitoring/health`
- API ya kuweka upya: `POST /api/resilience/reset`
- Vifunikaji (wrappers): `open-sse/services/accountFallback.ts`
- Jedwali la DB: `domain_circuit_breakers`

**Hali:**

- `CLOSED` — trafiki ya kawaida inaruhusiwa
- `DEGRADED` — trafiki bado inaruhusiwa, lakini kushindwa kwa mtoa huduma kwa kiwango cha juu kunafuatiliwa; hurejea `CLOSED` baada ya mafanikio ya kutosha, baada ya jaribio halali la muunganisho, au baada ya kushikilia `OPEN` kwa muda mrefu zaidi kwa aina ya kushindwa ya mwisho (thamani yake ya `cooldownByKind`, vinginevyo `resetTimeout`, × `maxBackoffMultiplier`, angalau muda mmoja wa kupoa) bila kushindwa kupya
- `OPEN` — mtoa hudume amezuiliwa kwa muda; uelekezaji wa combo humuruka
- `HALF_OPEN` — muda wa kuweka upya umeisha; ombi la uchunguzi (probe) linaruhusiwa

**Chaguo-msingi zinazoweza kusanidiwa (`open-sse/config/constants.ts`, zimefichuliwa katika Dashboard → Settings → Resilience):**

| Darasa  | Hudidimia baada ya | Hufunguka baada ya | Muda wa kuweka upya |
| ------- | ------------------ | ------------------ | ------------------- |
| OAuth   | kushindwa 5        | kushindwa 8        | 60s                 |
| API-key | kushindwa 7        | kushindwa 12       | 30s                 |
| Local   | inayotokana        | kushindwa 2        | 15s                 |

`degradationThreshold` hudhibiti lini mtoa huduma anaingia `DEGRADED`; `failureThreshold` hudhibiti lini anafunguka na kurukwa. Wasifu wa watoa huduma wa Local bado haujafichuliwa kwenye ukurasa wa mipangilio ya Resilience.

**Misimbo ya kukatiza:** hali za kiwango cha mtoa huduma tu `[408, 500, 502, 503, 504]`. USIKATIZE kwa makosa ya kiwango cha akaunti (mengi ya 401/403/429 — hayo ni ya muda wa kupoa (cooldown) au kufungwa (lockout)).

**Urejeshaji wa kuchelewa (lazy recovery):** wakati `OPEN` inapoisha muda wake, `getStatus()`, `canExecute()`, `getRetryAfterMs()` husasisha hali hadi `HALF_OPEN`. Usoaji huo huo (na kushindwa kunakofuata) hupunguza `DEGRADED` iliyopitwa na wakati kurudi `CLOSED`. Hakuna kipima muda cha usuli kinachohitajika.

---

### Muda wa Kupoa kwa Mtoa Huduma wa Kimataifa wa Kujiunga (Opt-in global Provider Cooldown) — geto la dirisha (window gate)

Tabaka la nne, la **kujiunga kwa hiari** (`PROVIDER_COOLDOWN_ENABLED`, chaguo-msingi **kimezimwa**) huhifadhi kumbukumbu ya watoa huduma wanaoshindwa kati ya maombi katika
`open-sse/services/providerCooldownTracker.ts`, inayotazamwa na utatuzi wa malengo ya combo ili maombi mfululizo ya combo yaache kutembelea tena mtoa huduma aliyeshindwa hivi karibuni. Vipengee vya kiwango cha mtoa huduma hutii geto la dirisha la `PROVIDER_PROFILES`:

| Wasifu  | hutikia baada ya (`providerFailureThreshold`) | ndani ya (`providerFailureWindowMs`) | hupoa kwa (`providerCooldownMs`) |
| ------- | --------------------------------------------: | -----------------------------------: | -------------------------------: |
| OAuth   |                                          `10` |                              `15min` |                           `5min` |
| API key |                                          `15` |                              `30min` |                          `10min` |

Chini ya kizingiti mtoa huduma **hana**kubaliwa kuwa anapoa; mafanikio hufuta dirisha. Vipengee vya kiwango cha muunganisho (`provider:connectionId`) hubaki na kupungua kasi (backoff) wa kielezo `minRetryCooldownMs → maxRetryCooldownMs` badala yake. Kubatilisha:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Ulinzi dhidi ya kurudi nyuma: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Muda wa Kusubiri wa Muunganisho

**Wigo:** muunganisho/akaunti/ufunguo mmoja wa mtoa huduma.

**Madhumuni:** kuruka ufunguo mmoja wenye hitilafu huku miunganisho mingine ya mtoa huduma huyo ikiendelea kuhudumia maombi.

**Utekelezaji:**

- Kuweka kuwa haupatikani: `src/sse/services/auth.ts::markAccountUnavailable()`
- Uteuzi: `getProviderCredentials*` katika faili hilo hilo
- Ukokotoaji wa muda wa kusubiri: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Mipangilio: `src/lib/resilience/settings.ts`

**Sehemu kwa kila muunganisho:**

- `rateLimitedUntil` — muhuri wa muda ambao muda wa kusubiri unaisha
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — kihesabu cha exponential backoff

**Muda chaguo-msingi wa kusubiri:**

- Msingi wa OAuth: 5s
- Msingi wa ufunguo wa API: 3s
- 429 ya ufunguo wa API: hupendelea vichwa vya `Retry-After`/reset kutoka kwa upstream/maandishi ya reset yanayoweza kuchanganuliwa
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Kuchelewesha majaribio kwa kila mtoa huduma.** Ukurasa wa maelezo ya mtoa huduma una kiteuzi cha **Kuchelewesha majaribio** (Auto,
15s hadi 1h). Huhifadhi `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, kupitia `PATCH /api/resilience`). Hitilafu ya kiwango cha maombi isapokuwa na
kidokezo cha upstream cha kujaribu tena, thamani hiyo hubadilisha backoff iliyopimwa kwa mtoa huduma
na kuweka upya `backoffLevel` kuwa 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Kipaumbele
cha hitilafu yenye kikomo cha kiwango cha maombi, kuanzia cha juu zaidi: kidokezo cha kujaribu tena
kutoka upstream, kisha `providerSpecificData.rotationOverrides.rateLimitResetSeconds` ya kila muunganisho,
kisha ucheleweshaji wa kujaribu tena wa kila mtoa huduma, kisha
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` ya mazingira, halafu backoff iliyopimwa. Auto huondoa
uga huo. Hii huathiri tu sababu ya kikomo cha kiwango cha maombi, wala si hali za mwisho.

**Kinga dhidi ya kundi la maombi linalosababisha msongamano:** huzuia hitilafu za wakati mmoja
kuongeza muda wa kusubiri kupita kiasi au kuongeza `backoffLevel` mara mbili.

**429 za kikomo cha wakati mmoja hazipandishi ngazi ya backoff.** `429` ambayo mwili wake unaripoti
kikomo cha wakati mmoja ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) inamaanisha akaunti iko salama lakini ina shughuli nyingi.
`checkFallbackError()` hurudisha sababu `concurrency_limited`: badilisha kwenda kwenye muunganisho
unaofuata sasa, poza huu kwa `CONCURRENCY_LIMIT_COOLDOWN_MS` isiyobadilika (1s) au kidokezo cha
kujaribu tena kutoka upstream, acha `backoffLevel` bila kubadilika, na weka `skipProviderBreaker`.
Mwili wa wazi wa quota bado huwa na kipaumbele, kwa hiyo mwili unaolingana pia na muundo wa quota
hubaki kuwa uamuzi wa quota. Utambuzi: `looksLikeConcurrencyLimit()` katika
`src/shared/utils/classify429.ts`; uamuzi: `open-sse/services/accountFallback/concurrencyLimit429.ts`.
`classify429()` (`FailureKind` ya breaker) haijabadilika na bado husoma `rate_limit` kwa miili hii.

**Kusimama kwa maudhui ya mtiririko hakupozi akaunti.** Kifuatiliaji cha kusimama kwa maudhui
(`open-sse/utils/streamHandler.ts`) kinapoacha kutekeleza mtiririko ambao haukutuma matokeo ya modeli
kwa wakati, `markAccountUnavailable()` hurekodi hitilafu kwenye muunganisho lakini hakiweki muda wa
kusubiri: kusimama huko ni kwa ombi hilo, mara nyingi kutokana na zamu ndefu ya reasoning ambayo
bado haijatoa matokeo. Waendeshaji wanaweza kuwasha hiari hii tena kwa
`resilienceSettings.streamStallCooldown.enabled` (chaguo-msingi `false`).

**Ishara ya hiari ya ucheleweshaji kwa uteuzi wa akaunti wa `p2c`.** Kila jaribio linalotumwa
hurekodi muda hadi baiti ya kwanza na matokeo kwa kila muunganisho (na kwa kila muunganisho + modeli)
katika dirisha la kumbukumbu linalozunguka: sampuli 20 za mwisho ndani ya dakika 15
(`open-sse/services/connectionLatencyTracker.ts`, zinazorekodiwa kutoka `safeLogEvents()` katika
`src/sse/handlers/chatHelpers.ts`). Wakati `resilienceSettings.p2cLatency.weight` iko juu ya
`0` (masafa 0-20, chaguo-msingi `0` = imezimwa), `compareP2CConnections()` katika
`src/sse/services/auth.ts` huongeza hadi pointi `weight` kwa kila mgombea wa jozi hiyo. Nusu ya
pointi hizo hutokana na ucheleweshaji kama uwiano dhidi ya mgombea wa haraka zaidi (kuwa polepole
mara mbili huchukua nusu hiyo yote), na nusu nyingine hutokana na kiwango cha hitilafu kinachozunguka.
Kipengele hiki hutumika tu wakati wagombea wote wana angalau sampuli 3, kwa hiyo akaunti mpya
hazipewi adhabu, na ukomo wake hubaki chini ya adhabu za kuzuiwa kwa quota na quota kuisha.
Hakiongezi mzunguko wake wa kukatiza: akaunti zinazoshindwa bado hushughulikiwa na tabaka za
muda wa kusubiri, kufungia na breaker. Kiweke kwa
`PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Fremu za reasoning huanzisha upya bajeti ya kusimama kwa maudhui.** Modeli ya reasoning inaweza
kufikiri kwa dakika kadhaa kabla ya tokeni yake ya kwanza inayoonekana: Claude hutiririsha fremu za
`thinking_delta` ambazo maandishi ya thinking yanaweza kuwa tupu, na Responses API hutiririsha kipengee
kimoja cha reasoning baada ya kingine. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`)
hutambua fremu hizi, na kifuatiliaji huanzisha upya bajeti yake kwa kila fremu badala ya kughairi
zamu. Bado si matokeo ya modeli, kwa hiyo zamu inayoishia kwenye reasoning pekee bado huripotiwa
kuwa tupu, na zamu inayositisha reasoning na kutuma tu mapigo ya moyo bado huanzisha kifuatiliaji.

Fremu za binary `reasoningContentEvent` za Kiro zenye sahihi isiyo tupu huhifadhi shughuli hii ya
reasoning kupitia executor kama delta tupu ya `reasoning_content`. Sahihi hiyo haitumwi mbele.
Metadata, fremu zisizokamilika na sahihi tupu hazianzishi upya bajeti ya maudhui; muda huru wa
kuisha wa mtiririko unaotumika na kughairi kwa mteja bado hutumika
(`open-sse/executors/kiro/reasoning.ts`).

**Hali za mwisho (SI muda wa kusubiri):**

- `banned` — huwekwa na utambuzi wa neno lililopigwa marufuku / kupigwa marufuku kwa akaunti (tazama [BAN_DETECTION](../security/BAN_DETECTION.md)). Ukataaji wa ombi kutoka upstream kwa kila ombi (`request_rejected`, kwa mfano OAuth 403 ya Anthropic "Request not allowed") hauiweki hali hiyo: huhesabiwa kwa kila muunganisho na modeli na huiondoa modeli hiyo kwenye mzunguko kwa muda wa kusubiri unaoongezeka, wenye ukomo wa `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), au hupooza muunganisho wakati hakuna modeli inayojulikana — `open-sse/services/requestRejectedStreak.ts`
- `expired` (hubadilika kuwa hali ya mwisho baada ya majaribio yaliyowekewa ukomo — `EXPIRED_RETRY_MAX = 3` yenye exponential backoff — ili hitilafu za muda za OAuth ziweze kujirekebisha kabla akaunti kuzimwa kabisa)
- `credits_exhausted`

Hizi hubaki hadi kitambulisho cha kuingia kibadilishwe au mwendeshaji azirejeshe upya. Usibadilishe hali za mwisho kwa hali ya muda ya kusubiri.

**Urejeshaji wa uvivu:** `rateLimitedUntil` inapopita, muunganisho huwa tayari tena. Baada ya matumizi yaliyofanikiwa, `clearAccountError()` huondoa sehemu zote za hitilafu.

### Kizuizi cha matumizi ya Claude OAuth: njia yenye kipaumbele cha chini + uwekaji upya wa kikomo cha kipindi

**Wigo:** muunganisho mmoja wa usajili wa Claude (OAuth). Vipengele vyote viwili ni vya **kuwezesha kwa hiari kwa kila
muunganisho** (Hariri muunganisho → sehemu ya Claude → `lowPriorityMode` / `autoLimitReset` katika
`providerSpecificData`, vyote vimezimwa kwa chaguomsingi) na vinaakisi amri za Claude Code `/low-priority` na `/limit-reset` (mkataba wa mawasiliano uliorekodiwa kutoka Claude Code 2.1.263).

**Utekelezaji:**

- Mashine ya hali + uainishaji wa majibu: `open-sse/services/claudeLowPriority.ts`
- Mteja wa hali/ombi la kuweka upya: `open-sse/services/claudeLimitReset.ts`
- Hook ya kitekelezaji (uingizaji wa kichwa + jaribio tena la akaunti hiyo hiyo): `open-sse/executors/base.ts::execute()`
- Uhifadhi wa kuwezesha kwa hiari: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Kichochezi:** kizuizi cha matumizi cha saa 5 — `429` ambayo vichwa vyake vina
`anthropic-ratelimit-unified-status: rejected` na, wakati akaunti inastahiki,
`anthropic-ratelimit-unified-slow-offer: treatment`. Hakuna kinachotumwa kabla ya `429` ya kwanza ya kizuizi hicho; `429` ya ghafla bila vichwa vya unified hupitia njia ya kawaida ya kusubiri.

**Njia yenye kipaumbele cha chini** (`lowPriorityMode`):

- Kwenye `429` ya kizuizi, kitekelezaji kinakubali ofa na kujaribu tena mara moja akaunti **ile ile**
  kwa `anthropic-usage-limit: slow`; njia hubaki hai hadi `anthropic-ratelimit-unified-reset` iliyotangazwa (+ sekunde 60 za muda wa ziada), na kila ombi katika dirisha hilo hubeba kichwa hicho. `429` iliyonaswa haifiki `handleChatCore`, kwa hiyo muunganisho **hauwekwi** katika kusubiri na hauhamishwi kwenda mwingine.
- `anthropic-ratelimit-unified-slow-status` kwenye majibu ya baadaye: `active` / `not_needed`
  huendeleza njia; `slot_busy` (429) au `529` husubiri muda wa
  `anthropic-ratelimit-unified-slow-retry-after` wa seva (chaguo-msingi sekunde 20, punguza hadi 5–600s, jitter ya ±30%)
  na kujaribu tena, ikiwa imewekewa kikomo na `anthropic-ratelimit-unified-slow-max-wait` (chaguo-msingi dakika 20, punguza hadi
  dakika 1–saa 6) — muda huo ukipita njia inaisha na kipindi cha kupoa cha dakika 10 huzuia kukubali tena. Muda wa kusubiri pia huwekewa kikomo na muda uliosalia wa timeout ya ombi yenyewe ya kuanzisha muunganisho wa upstream
  (`resolveFetchStartTimeout`, dakika 10 kwa chaguomsingi) ukitoa ukingo wa sekunde 5: bila kikomo hicho, muda wa juu wa kusubiri wa dakika 20 wa chaguomsingi ungeendelea zaidi ya ombi na usingizi ungekatizwa katikati, na kuonyesha `TimeoutError` badala ya mwisho mzuri wa `max_wait` + kipindi cha kupoa.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, kuzunguka upya kwa dirisha la saa 5, au
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ambayo huimaliza kama
  `extra_usage` kwenye hali yoyote, kwa kuwa matumizi ya ziada yanayolipiwa sasa yanashughulikia kizuizi hicho) huimaliza njia; kisha jibu hupitia njia ya kawaida ya kusubiri. `budget_exhausted` hukumbukwa hadi uwekaji upya wa bajeti uliotangazwa (siku ≤ 8).
- Ukaguzi wa kizuizi huendeshwa baada ya majaribio ya kitekelezaji yenyewe yanayoendeshwa na `400` ndani ya jaribio (uhariri wa muktadha, vigezo vya thinking/effort, kujifunza kiotomatiki kwa vigezo), kwa hiyo `429` ya kizuizi inayoonekana tu kwenye mojawapo ya majaribio hayo bado inanaswa badala ya kufikia njia ya kusubiri.
- Hali huhifadhiwa kwenye kumbukumbu kwa kila muunganisho (kuanzisha upya hugharimu `429` moja ya ziada ya kizuizi ili kukubali tena).

**Kuweka upya kikomo cha kipindi** (`autoLimitReset`, hujaribiwa kabla ya njia hiyo ikiwa vyote vimewashwa):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → kizuizi cha
  `juniper_tide`; wakati `arm: "reset"` na `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` kwa
  `{ "program": "juniper_tide" }` (UUID ya shirika kutoka `providerSpecificData.organizationUUID`, kwa kutumia njia mbadala ya bootstrap).
- `result: reset|not_limited` → ombi linajaribiwa tena kwa kasi kamili (bila kichwa cha slow).
  `already_used` / `not_offered` huweka kumbukumbu ya `next_available_at` (chaguo-msingi wiki moja); hitilafu yoyote huongeza kusubiri kwa dakika 15. Uwekaji upya hufanyika mara moja kwa wiki na bado huhesabiwa katika kikomo cha wiki.

Vilinda urejeshaji: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Uhusiano wa kipindi (#7274)

**Wigo:** kipindi kimoja cha mteja (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) hubandikwa kwenye muunganisho mmoja, kwa **mtoa huduma yeyote**.

**Madhumuni:** kumweka wakala wa zamu nyingi (Claude Code, aider, mawakala maalum) kwenye akaunti hiyo hiyo katika maombi yote, kupunguza upotevu wa muktadha kati ya akaunti na `429` za kuanza upya mara kwa mara kwa watoa huduma walio na hali ya kipindi kwa kila akaunti.

**Utekelezaji:**

- Utatuzi wa TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Uteuzi/uundaji wa pini: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Uchotaji wa kichwa (wa jumla, kwa mtoa huduma yeyote): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Jedwali la pini linalohifadhiwa: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Mpangilio: `sessionAffinityTtlMs` (TTL ya jumla katika ms, `0` huzima) — `src/lib/db/settings.ts`. Ulibadilishwa jina kutoka `codexSessionAffinityTtlMs` ya Codex pekee na uhamishaji `124_generic_session_affinity_ttl.sql`, ambao huhamisha TTL yoyote ya Codex iliyosanidiwa awali kuwa chaguo-msingi kipya.

Kabla ya #7274, `resolveSessionAffinityTtlMs()` ilisimamisha utekelezaji mapema kwa `0` kwa kila mtoa huduma isipokuwa `codex`, kwa hiyo mpangilio wa TTL (na vichwa vya kipindi) haukuwa na athari popote pengine ingawa utaratibu wa kubandika na uchotaji wa vichwa tayari haukutegemea mtoa huduma. Marekebisho hayo yaliondoa urejeshaji huo wa mapema; sasa TTL inatumika kwa usawa kwa kila mtoa huduma mara tu inapowekwa kimataifa kuwa zaidi ya `0`.

Vichwa vitatu vya uhusiano wa kipindi haviwahi kutumwa kwa upstream — vitekelezaji huunda vichwa vyao vya upstream kutoka mwanzo badala ya kupitisha vichwa vya mteja, kwa hiyo hii hubaki kuwa kitambulisho cha ndani tu cha uhusishaji.

### Ukodishaji wa kipekee wa muunganisho wa kipindi kinachosimamiwa

**Upeo:** mteja/kikao kimoja cha HTTP kinachosimamiwa kinamiliki muunganisho mmoja wa OmniRoute unaostahili.

**Madhumuni:** kutoa umiliki wa kipekee na unaodumu wa muunganisho kwa wateja wanaohitaji kizuizi thabiti cha uelekezaji katika maombi yote. Hii ni tofauti na session affinity, ambayo ni mapendeleo laini ya mwendelezo:
lease ya kipekee hudumisha hali ya mzunguko wa maisha katika SQLite, hutekeleza upekee wa kimataifa wa mmiliki amilifu na muunganisho amilifu, na hukataa kizazi kilichopitwa na wakati kabla ya utumaji kwa mtoa huduma.

Kipengele hiki huwashwa kwa hiari kwa kila ufunguo wa API. Ufunguo unaosimamiwa lazima uwe na scope ya `lease:exclusive` na orodha ya `allowedConnections` iliyoainishwa wazi na isiyo tupu. Mteja yeyote wa HTTP anaweza kutumia endpoint ya mzunguko wa maisha; hakuna jina la mteja, user-agent, mtoa huduma, mbinu ya OAuth, au modeli inayohitajika. Lease inamiliki muunganisho, si modeli, hivyo mabadiliko ya modeli hudumisha uhusishaji huo mradi muunganisho uendelee kustahili kwa kawaida. Sheria za kawaida za modeli, mgao, afya, muda wa kusubiri, na orodha ya wanaoruhusiwa zinaendelea kuwa na mamlaka na zinaweza kuhamisha kizazi hicho hicho hadi kwenye muunganisho mwingine huru unaostahili.

Mzunguko wa maisha ni `POST /api/v1/session-leases` wenye vitendo vya JSON vya `acquire`, `renew`, na `release`. Maombi ya uelekezaji yanayosimamiwa huwasilisha thamani isiyo wazi ya `X-OmniRoute-Lease-Owner` na `X-OmniRoute-Lease-Generation` halisi. Mmiliki hutumia `vlo_` ikifuatiwa na vibambo 43 vya base64url; ni heshi yake ya SHA-256 pekee huhifadhiwa. Kila kizuizi cha mwisho cha utumaji pia hufunga kitambulisho cha ufunguo wa API uliothibitishwa na kitambulisho cha muunganisho amilifu. Vichwa vya udhibiti wa lease huondolewa kwenye kumbukumbu, picha za maombi zilizohifadhiwa, na vichwa vya kitekelezaji wa upande wa juu.

Ikiwa uelekezaji wa kawaida una watahiniwa wanaosimamiwa wanaostahili lakini kila mtahiniwa huru amekaliwa na lease amilifu ya kigeni, OmniRoute hurudisha HTTP `429`, msimbo wa `lease-capacity-unavailable`, hali ya `waiting-for-capacity`, na `Retry-After` yenye kikomo inayotokana na muda wa mapema zaidi wa kuisha unaohusika. Kutostahili kwa kawaida kwa watahiniwa si ushindani wa lease na hudumisha semantiki zake za awali za hitilafu za uelekezaji.

Mbinu zinazohusiana hubaki tofauti:

- Umiliki wa kikao cha OAuth ni usambazaji laini wa ndani ya mchakato kwa akaunti za OAuth.
- Semaphores za akaunti hutoa vibali vya upatanishi wa maombi na huisha ombi linapokamilika.
- Lease za kipekee za vikao vinavyosimamiwa ni umiliki wa mzunguko wa maisha unaodumu wenye kizuizi cha kizazi.

## 3. Kufungwa kwa Modeli (Model Lockout)

**Wigo:** seti ya tatu ya provider + connection + model.

**Wigo wa ufunguo kulingana na hali:** hali iliyoshindwa ndiyo inayoamua ufunguo gani kufungwa kunaandikwa (`resolveLockoutScope()` katika `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — ishara ya quota au haki ya matumizi — funga **familia ya quota**:
  kwa codex wigo mzima wa `codex` / `spark` (kila modeli ya `gpt-5*` ya
  connection), kwa provider nyingine `getQuotaScopedModelForProvider()`.
- `404` hufunga modeli yenyewe pekee (`getModelLockKey()` hupunguza wigo wa `not_found`).
- Hali nyingine yoyote — kushindwa kwa usafirishaji/seva wa `5xx` na `502`
  iliyotengenezwa na OmniRoute yenyewe kutoka kwa uthibitishaji wa ubora — hufunga
  tuple **halisi** ya provider/connection/model pekee. Mtiririko (stream) mbaya kwenye
  modeli moja si ushahidi kuhusu quota ya akaunti; kabla ya kanuni hii, jibu moja
  tupu kwenye `codex/gpt-5.6-luna` liliondoa kila modeli ya `gpt-5*` ya connection
  hiyo kutoka kwa routing kwa dakika 2–30 (ikiongezeka hatua kwa hatua) ilhali quota
  yake haikuguswa.
- Chaguo la `scope` lililotajwa waziwazi na mwitaji hushinda kila mara (Antigravity hupitisha `"exact"`).

**Lengo:** kuepuka kuzima connection nzima wakati ni modeli moja tu isiyopatikana au iliyozuiwa na quota.

**Mifano:**

- Provider zenye quota kwa kila modeli zinazorejesha 429
- Provider za ndani zinazorejesha 404 kwa modeli moja inayokosekana
- Kushindwa kwa ruhusa za mode/model mahususi kwa provider (mf., modes za Grok)

**Utekelezaji:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashibodi ya Model Cooldowns (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Huorodhesha lockouts zinazotumika zenye: provider, connection, model, reason, expiresAt. Waendeshaji wanaweza kuwasha tena modeli kwa mkono kutoka kwenye kadi.

**REST API:**

- `GET /api/resilience/model-cooldowns` — orodhesha lockouts zinazotumika
- `DELETE /api/resilience/model-cooldowns` — kuwasha tena kwa mkono. Mwili: `{provider, connection, model}`. Uthibitishaji: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Ukurasa mmoja kwa kila connection iliyo nje ya routing kwa sababu ya muda (transient), badala ya
kufungua ukurasa wa kila provider. Huorodhesha cooldowns za connection, lockouts za modeli na hali
za mwisho (terminal), huziondoa kwa kila connection, kwa uteuzi, au kwa connections zote za provider,
na hurekebisha kanuni za cooldown zinazoboreshwa mara nyingi zaidi: `streamStallCooldown.enabled` na
cooldown ya msingi ya `connectionCooldown` ya OAuth / API-key pamoja na hatua za juu za backoff
(huhifadhiwa kupitia `PATCH /api/resilience`). Hali za mwisho (`banned`, `expired`, `credits_exhausted`)
huorodheshwa lakini haziondolewi hapa kamwe.

**REST API** (`src/lib/resilience/cooldownManager.ts`, uthibitishaji: management):

- `GET /api/resilience/cooldowns[?provider=]` — connections zenye hali, cooldown iliyobaki,
  kiwango cha backoff, aina ya kosa la mwisho na lockouts za modeli (bila credentials)
- `POST /api/resilience/cooldowns` — mwili `{connectionIds: string[]}` au
  `{all: true, provider?}`; hurejesha `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI ya mipangilio ya Lockout + uponyaji wa success-decay (v3.8.23)

Kufungwa kwa modeli kulibadilika kutoka tabia ya kudumu iliyopachikwa moja kwa moja (hardcoded)
na kuwa kipengele kinachosanidiwa kikamilifu, cha hiari (opt-in), chenye kadi yake ya mipangilio
na njia ya kupona inayojitibu yenyewe.

**Kadi ya mipangilio:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Hii ni **tofauti** na `ModelCooldownsCard` ya kusoma tu hapo juu (ambayo _huorodhesha_ tu
lockouts zinazotumika) — kadi mpya _husanidi vigezo_. Chaguomsingi zipo katika
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Mpangilio               | Chaguomsingi                     | Maana                                                                          |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Swichi kuu — kufungwa kwa modeli **kumezimwa kwa chaguomsingi**.               |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Hali za upstream zinazohesabiwa kama kushindwa kwa wigo wa modeli.             |
| `baseCooldownMs`        | `120_000` (s 120)                | Muda wa awali wa kufungwa kwa kushindwa kwa kwanza.                            |
| `maxCooldownMs`         | `1_800_000` (dakika 30)          | Kikomo cha juu cha cooldown iliyopandishwa hatua.                              |
| `maxBackoffSteps`       | `10`                             | Idadi ya juu ya hatua za kupandishwa za exponential backoff.                   |
| `useExponentialBackoff` | `true`                           | Iwapo kushindwa kunakarudiwa kunapandisha cooldown kwa kiwango cha kipeongezi. |

Mipangilio huhifadhiwa kupitia hifadhi ya kawaida ya mipangilio na kuthibitishwa kupitia
schema ya mipangilio ya resilience; kadi hupunguza (clamp) `baseCooldownMs`/`maxCooldownMs`
(kwa `maxCooldownMs ≥ baseCooldownMs`) na `maxBackoffSteps`.

**Uponyaji wa success-decay:** kupona **si** kumalizika kwa kipima muda pekee. Jibu
lililo sawa hupunguza idadi ya kushindwa kwa modeli hatua kwa hatua, hivyo modeli iliyopona
katikati ya dirisha huacha kupandishwa hatua (na kufunguliwa) kabla ya kipima muda chake
kumalizika. Kwa lengo la combo lililofanikiwa, `open-sse/services/combo.ts` huita
`decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), ambayo **hugawanya kwa nusu** `failureCount`
iliyohifadhiwa (`Math.floor(failureCount / 2)`); inapofikia `0` ingizo la lockout
hufutwa kabisa. Kinzake `recordModelLockoutFailure()`
huongeza idadi (na kupandisha cooldown hatua) kwa kushindwa ndani ya
dirisha la kupandishwa. Hii success-decay ni nyongeza ya kumalizika kwa kawaida kwa kipima
muda — njia yoyote kati ya hizi mbili inaweza kuwasha tena modeli.

**Hali:** lockouts huhifadhiwa **katika kumbukumbu (in-memory)** (`Map`s za kila mchakato
za `ModelLockoutEntry` zenye ufunguo wa `provider:connectionId:model`, lockouts za wigo
halisi kwa `provider:connectionId:exact:model`), hazihifadhiwi kwenye
DB — hupotea inapowashwa upya. _Mipangilio_ huhifadhiwa; _hali_ ya lockout
zinazotumika ni ya muda tu (ephemeral).

---

## 4. Udhibiti wa Sambamba wa Quota-Share (v3.8.36)

Akaunti za usajili (GLM, MiniMax, n.k.) mara nyingi hukubali takribani maombi 1–3
kwa wakati mmoja pekee; kuzidi kiwango hicho husababisha 429 na vipindi vya
kupoa. Hali hii ni mbaya zaidi chini ya michanganyiko ya
**quota-share** (`qtSd/…`), ambapo funguo kadhaa za API hushiriki akaunti moja ya
juu. Tabaka tatu huzuia akaunti inayoshirikiwa isijazwe kupita kiasi.

### Kikomo cha maombi sambamba kwa kila muunganisho (`max_concurrent`)

Kila muunganisho wa mtoa huduma unaweza kutangaza kiwango cha juu cha
`max_concurrent`
(`provider_connections.max_concurrent`, kinachowekwa kwenye kidirisha cha muunganisho / API / DB).
Acha sehemu hiyo wazi ili kutoweka kikomo. Hiki ndicho kipengele kimoja kinachoendesha
tabaka la uratibu lililo hapa chini — kiweke kulingana na kiwango halisi cha
sambamba cha akaunti (kwa mfano GLM ~1, MiniMax ~2).

### Vizuizi vya sambamba kwa kila modeli (`modelConcurrency`)

Muunganisho unaweza pia kutangaza viwango kamili vya juu vya sambamba kwa kila modeli
ndani ya ramani yake ya `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Kiweke kwenye kidirisha cha muunganisho (**Rate limit overrides → Per-model
concurrency caps**, `model=cap` moja kwa kila mstari) au kupitia
`PATCH /api/providers/[id]` kwa muundo huohuo wa JSON. Maana muhimu za funguo:

- **Kiwango cha muunganisho dhidi ya kiwango mahususi cha modeli:** `maxConcurrent` hubaki
  kuwa kiwango cha juu kinachoshirikiwa na muunganisho mzima. Vyote vinapotumika,
  vizuizi vyote viwili hupatikana kwa pamoja katika kizuizi cha mchanganyiko kilekile
  (`global → provider → account → model`); tabia inayotokea ni ile ya kikomo
  kikali zaidi kinachotumika.
- **Ulinganifu kamili wa ufunguo wa modeli:** ufunguo ni mfuatano wa modeli unaopitishwa kwa
  kitekelezaji baada ya utatuzi wa uelekezaji — kwa kawaida ni kitambulisho tupu cha
  modeli ya juu (`glm-5`), si jina la pakiti la upande wa mteja la `provider/model`
  (`zai/glm-5` hailingani na `glm-5`). Thamani ni viwango chanya vya nambari kamili
  vya juu vya maombi sambamba.
- **Kupanga foleni ndani ya mfumo, bila ugunduzi:** maombi ya ziada hupangwa kwenye foleni
  ndani ya mfumo kwa kutumia semantiki zilizopo za foleni/muda wa kuisha (makosa ya
  uandikishaji yaliyoainishwa `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute haigundui wala kukisia sera ya juu — inatekeleza
  viwango halisi vilivyowekwa na mwendeshaji. Kizuizi cha modeli kilichojaa hakimzuii
  mtoa huduma kamwe na hakitengenezi kufungiwa kwa modeli kwa kudumu; tabia ya 429 /
  kupoa / kurejea kwa mtoa huduma ya juu hubaki kuwa kinga ya mwisho dhidi ya makosa.
- **Upeo wa kila muunganisho na kila mchakato:** vizuizi ni vya kila muunganisho wa
  hifadhidata na vinatunzwa kwenye kumbukumbu, kwa hivyo miunganisho miwili inayotumia
  tena ufunguo uleule wa API wa juu haishirikiani kuratibu.
- **Kutowekwa usanidi kunamaanisha kutobadilika:** kuacha ramani hiyo (au kuacha
  sehemu ya dashibodi wazi) hakuongezi kizuizi cha modeli. Mfano wa usanidi bila
  kudai kikomo chochote cha jumla kwa mtoa huduma:

```text
glm-5=1
glm-4.7=3
```

### Usawazishaji wa maombi ya quota-share

Usambazaji wa quota-share unapolenga muunganisho unaotangaza
`max_concurrent` chanya, maombi sambamba kwa **akaunti** hiyo hupangwa kupitia
semaphore ya kila muunganisho (ufunguo `qsconn:<connectionId>`): maombi ya ziada
**husubiri kwenye foleni** badala ya kuijaza akaunti. Ni **fail-open** — foleni
iliyojaa au muda wa kusubiri kuisha huendelea bila nafasi badala ya kamwe kukataa
ombi linaloweza kusambazwa. Washa au zima kwenye **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, imewashwa
kwa chaguo-msingi). Bila kikomo cha `max_concurrent`, tabia hubaki bila mabadiliko.

> Kizuizi cha uelekezaji wa quota-share (`selectQuotaShareTarget`, DRR + P2C) chenyewe
> ni fail-open na hupunguza tu _kipaumbele_ cha muunganisho kilichofikia kikomo —
> kikiwa na kundi la muunganisho mmoja hakiwezi kuweka kikomo kikali, kwa hivyo
> semaphore hii ndiyo inayozuia msongamano huo kwa kweli.

### Jaribio tena linalozingatia kipindi cha kupoa cha combo

Kwa kila mkakati wa combo (unapowashwa), ombi ambalo lingeleta 429
kwa kipindi kifupi cha muda cha kupoa husubiri kipindi hicho kiishe na kutumwa
tena badala ya kurudisha 429 — hii inahusu madirisha ya TPM/RPM ya aina ya Gemini
(~60s retry-after) kwenye michanganyiko ya modeli nyingi, kwa mfano malengo yote
mawili ya combo ya modeli 2 yanapofikia kikomo cha kiwango cha maombi kwa kila modeli.
Hii inadhibitiwa na `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) katika **Settings → Resilience**. Kamwe haisubiri kwenye
`quota_exhausted` (iliyofungwa hadi usiku wa manane) au sababu za uthibitishaji/
kutopatikana.

Combo inaweza kujiondoa kwa `config.comboCooldownWaitEnabled: false`. Ni `false`
halisi pekee inayozima usubiri huu wa pamoja wa combo (usubiri wa kupoa baada ya
usambazaji na usubiri wa mzunguko ulio wazi wa kabla ya usambazaji/kufungwa kwa
modeli) pamoja na uongezaji wa kikomo cha chini cha muda wa kusubiri. Kukosekana
kwa thamani au `true` huhifadhi sera ya jumla; `true` haiwezi kuwasha usubiri
uliowezwa kwa jumla. `targetTimeoutMs` iliyowekwa wazi bado hutangulia. Kujiondoa
huku hakubadilishi usubiri tofauti wa kabla ya usambazaji wa native-Codex
turn-pin.

Kizuizi hicho hicho hushughulikia hali ya kabla ya usambazaji (#16319): kila lengo
la combo linaporukwa kabla ya jaribio lolote kufanywa kwa sababu modeli yake iko
kwenye kufungiwa kwa muda mfupi na wa mpito, njia ya majaribio sifuri husubiri
kufungiwa huko chini ya viwango vilevile na kusambaza tena, badala ya kujibu
`503 ALL_TARGETS_SKIPPED` isiyo na kidokezo. Wakati hakuna usubiri unaoruhusiwa
(kikomo, jaribio au bajeti imekwisha, au kipengele kimezimwa), jibu la mwisho
huboreshwa kuwa `429 rate_limit_error` likiwa na `retry_after` / `reset_at` kutoka
kwenye muda wa mapema zaidi wa kuisha wa kufungiwa kwa mpito; kufungiwa kwa quota,
uthibitishaji na kutopatikana huendelea kutoa 503 isiyo na kidokezo.

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

## 5. Udhibiti wa Upokeaji kwa Mkusanyiko wa Maombi (v3.8.49 · issue #6593)

**Eneo**: mkusanyiko wa kiwango cha mzunguko kwa kila mtoa huduma+muunganisho (`open-sse/services/rateLimitManager.ts`, iliyosaidiwa na Bottleneck), safu moja chini ya mifumo mitatu iliyo juu.

**`maxWaitMs` inaweka mipaka ya kusubiri kwenye msafini; `executionMaxWaitMs` inaweka mipaka ya utekelezaji.**  
Mbili hao vimetenganywa kwa makusudi, wala hakuna inayochangia moja kwa moja nyingine.

`resilienceSettings.requestQueue.maxWaitMs` ni **hazina ya muda wa kusubiri msafini**: inahusisha kusubiri nafasi ya mtoa huduma na kisha kukaa katika `QUEUED`, na kipima muda chake hufutwa mara tu kazi inapohama kutoka `QUEUED` na kuanza kutekelezwa (`rateLimitManager.ts`, `wrappedFn`). Ombi linalozidi haya halifiki upande wa juu. Chaguo la kawaida ni 30000ms, lililotolewa kupitia `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` katika `src/lib/resilience/settings.ts` na kulazimishwa katika `tests/unit/ratelimit-admission-control-6593.test.ts`, hivyo mabadiliko yake yanafanya mtihani huo kuwa mwekundu badala ya kuacha aya hii ikikaa bila umakini.

`resilienceSettings.requestQueue.executionMaxWaitMs` ni kile ambacho Bottleneck hupokea kama `expiration` ya kazi, ambapo kipima muda kinaanza tu baada ya kusafirishwa. Ni kinga kwa watekelezaji wasio na muda wa kugawa kutoka kwa mfumo wa juu, na huongezwa hadi kufikia muda wa kuanza fetch wa mtendaji pale ikiwa ni mrefu zaidi, hivyo haiwezi kukatakata jibu lenye afya linaloendelea. Chaguo la kawaida ni 600000ms (dakika 10).

Kuingiza bajeti ya msafini ndani ya `expiration` ndio ilivyokuwa husababisha kuangamiza milango isiyoongeza hatua katikati ya safari — wanakimbia kwa dakika kabla ya byte ya kwanza — na ndio sababu expiration inatolewa kama `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) huku bajeti ya msafini ikibeba msimbo wa muda wa msafini. Badilisha mojawapo kupitia `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) au kupitia dashibodi (**Settings → Resilience**). Zote zimewekewa mipaka ya 1ms–24h wakati zimefanyiwa utaratibu.

**Upendeleo, kwa wote wawili:** env var inatoa tu _chaguo la msingi_. Thamani iliyohifadhiwa katika `resilienceSettings.requestQueue` (dashibodi / API patch, imehifadhiwa katika `key_value`) inashinda juu yake, na kwa kila muunganisho `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` inashinda hayo. Kuweka env var kwenye usambazaji ambao tayari una thamani iliyohifadhiwa, kwa hiyo haibadilishi chochote — fafanua au sasisha mpangilio uliohifadhiwa badala yake.

Uwepo kwenye msafini unawekewa mipaka na `maxWaitMs`; `maxQueueDepth` hapa chini inaweka mipaka ya idadi ya waombaji wanaoweza kusubiri kwa wakati mmoja.

**Majaribio yaliyotajwa kwenye mwili: kupanga upya dhidi ya kuzuiliwa.**  
Mwili wa 429 unaweza kutaja muda wake wa kusubiri (Gemini `RetryInfo.retryDelay`, maandishi "retry after Ns"), ambayo `updateFromResponseBody` husoma. Muda wa kusubiri unaofaa na `maxWaitMs` ya muunganisho ni kupanga: kipunguza huachia hazina yake tupu kwa muda huo na miito iliyopangwa huwasilishwa tunapojazwa tena. Muda wa kusubiri unaozidi `maxWaitMs` si kitu ambacho msafini kinaweza kustahimili — Gemini inajibu kiwango kilichotumika kabisa cha kila siku kwa `retryDelay: "86399s"`. `Retry-After` iliyotumwa kwenye 429 iliyojengwa upya (#16528) tayari husababisha injini mbadala kuifunga modeli hiyo kwa kipindi hicho, lakini kusitisha kipunguza nayo pia kungechangia kusimamishwa kwa wito wowote unaofikia ufunguo mapema (mfano, baada ya usanidi upya wa resilience) kwa kipindi kizima cha `maxWaitMs`.  
Wakati msubiri kama huo unatokana na undani uliotajwa wa Google `RetryInfo` (chanzo cha `google_rpc_retry_info`) na kipunguza cha ufunguo kimekwisha kuwekwa kwa modeli (angalia `getLimiterKey`), 429 inakuwa kufungiwa kwa modeli kwenye muunganisho huo badala yake (`lockModelForLongBodyRetry` katika `open-sse/services/rateLimitManager/bodyRetryPause.ts`, kimewekewa kikomo cha 24h), na kipunguza hukubaki kisisitishwa. Uchaguzi wa akaunti hufukuzwa kwenye ufunuo huo kupitia `isModelLocked()`, vivyo hivyo na lango la kabla ya kusafirisha kwa malengo yaliyobandikwa kwenye muunganisho.  
Katika antigravity, ambako kipunguza kinahusishwa na kila familia ya mikopo, ufunuo uko kwenye modeli hiyo hasa, kama ufunuo mwingine wa mikopo. Jina ambalo mteja aliomba linafungwa pia wakati anwani mbadala ilipolitatua kwamba ni kwa modeli hiyo, kwa sababu ukaguzi huo unatumia jina lilioulizwa; linafungwa kabisa (`lockExactModel`), hivyo anwani mbadala inayovuka familia ya mikopo ya antigravity au upana wa codex haifungi yake. Kidokezo cha maneno, `retryDelay` isiyotajwa aina, au kipunguza kinachoshirikiwa na muunganisho mzima, hukumbaa kusitishwa.  
Wakati kipunguza katika njia ya 429 kilichojengwa upya kimesitishwa, mteja ambaye muda uliobaki wa msafini unamalizika kabla ya kusitishwa hukataliwa mara moja na msimbo wa muda wa msafini (`checkLimiterPause`) badala ya kusubiri muda huo kumalizika; mwisho uliorekodiwa umefungwa kabla ya kipunguza kujengwa, mahali ambapo Bottleneck huanzisha saa yake ya upya, na mabadiliko yoyote baadaye kwenye hazina husahau hilo. Imefunikwa na `tests/unit/rate-limit-long-body-retry-lockout.test.ts` na `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — kikomo kipya cha upokeaji kwa kujisajili.**  
`resilienceSettings.requestQueue.maxQueueDepth` inaweka mipaka ya idadi ya maombi yanayoweza kukaa kwenye msafini (ambayo hayajasafirishwa bado) kwa mtoa huduma+muunganisho mmoja kwa wakati mmoja. Wakati msafini tayari umekuwa na maombi ya thamani ya `maxQueueDepth`, ombi jipya linakandamishwa haraka kwa kosa lililoandikwa `code: "RATE_LIMIT_QUEUE_FULL"` **kabla** halifikii `limiter.schedule()` — hivyo kukataliwa kunakuwa rahisi na kufanyika kabla ya kazi yoyote ya kusindika/utafsiri inayofuata kwa ombi hilo. Chaguo la kawaida ni `0` = limezimwa, likihifadhi tabia ya msafi usio na mipaka uliopo; mipaka inaweza kuwekwa 0–100000. Badilisha kupitia `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) au `resilienceSettings.requestQueue.maxQueueDepth` (dashibodi/API patch).

Uhakiki wa upokeaji wenyewe ni kazi safi (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) kwa hiyo inaweza kupimika kwa vitengo bila kuwa na kipunguza halisi cha Bottleneck.

> RFC iliyofungua #6593 pia ilipendekeza bendera ya
> `bypassCompressionOnRateLimit`. Mchakato wa `open-sse/services/compression/`
> katika hazina hii ni ukandamizaji wa prompt/context kwenye ombi la LLM
> linalotoka (`chatCore.ts`, karibu na kizuizi cha
> `resolveCompressionSettings`/`selectCompressionStrategy`), si ukandamizaji
> wa majibu ya HTTP kwenye miili ya 429 iliyotungwa — hakuna njia ya msimbo
> inayolingana kwa bendera halisi ya kuepuka. Hatua hiyo ya ukandamizaji wa
> prompt pia kwa sasa huendeshwa _kabla_ ya `withRateLimit()` katika mchakato
> wa ombi, kwa hivyo kupanga upya ili kuiruka wakati wa kukataliwa kwa foleni
> iliyojaa ni mabadiliko tofauti, makubwa zaidi kuliko wigo wa suala hili;
> kimakusudi **haikutekelezwa** hapa na imeachwa kama kazi ya kufuatilia
> ikiwa faida ya kuokoa CPU inastahili hatari ya kupanga upya.

### Kinga ya Usalama ya Kuwasha Kiotomatiki Kikomo cha Kiwango na Ulinzi wa Muunganisho (`rateLimitProtection`)

**Kinga ya usalama ya kuwasha kiotomatiki** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, chaguo-msingi `true`):
Kwa chaguo-msingi, OmniRoute huwasha kiotomatiki ulinzi wa foleni ya kikomo cha kiwango kwa miunganisho yote inayofanya kazi ya watoa huduma wenye ufunguo wa API (`getProviderCategory(provider) === "apikey"`). Hii huhakikisha kwamba maombi yanayoingia yanayokwenda kwa funguo za API za upstream zilizo nyeti kwa kiwango huwekwa foleni na kudhibitiwa kupitia Bottleneck badala ya kulipuka na kusababisha makosa ya 429 kutoka upstream. Kinga ya usalama inaweza kubatilishwa kupitia kigeugeu cha mazingira `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` huzima, `true`/`1`/`on` hulazimisha kuwasha), ambayo ina kipaumbele juu ya mpangilio wa dashibodi uliohifadhiwa (**Mipangilio → Ustahimilivu** / `PATCH /api/resilience`).

**Semantiki za `rateLimitProtection` ya kila muunganisho:**
Ulinzi wa kikomo cha kiwango wa kila muunganisho hufuatiliwa kupitia uga wa boolean `rateLimitProtection` kwenye miunganisho ya watoa huduma (unaohifadhiwa kama `rate_limit_protection` katika SQLite):

- **Imewashwa waziwazi (`rateLimitProtection === true`)**: Ulinzi wa kikomo cha kiwango umewashwa waziwazi kwa muunganisho huu, bila kujali kategoria ya mtoa huduma au kama kinga ya usalama ya kuwasha kiotomatiki imewashwa.
- **Imezimwa waziwazi (`rateLimitProtection === false`)**: Huzima ulinzi wa wazi, lakini **haitoi** muunganisho unayofanya kazi wa ufunguo wa API nje ya kinga ya usalama ya kimataifa ya kuwasha kiotomatiki. Katika `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` na `undefined` ni sawa: ni `rateLimitProtection === true` pekee inayochukuliwa kama kubatilisha kwa wazi. Ikiwa `rateLimitProtection` ni `false` (au haijawekwa), muunganisho unayofanya kazi wa ufunguo wa API bado unalingana na sharti la kuwasha kiotomatiki na unabaki chini ya ulinzi wa kikomo cha kiwango.
- **Hakuna kujiondoa kwa muunganisho mmojammoja**: Kwa sasa mwendeshaji hawezi kueleza "muunganisho huu mmoja unayofanya kazi wa ufunguo wa API lazima uendeshwe bila ulinzi wa foleni ya kikomo cha kiwango" huku kuwasha kiotomatiki kukiwa kimewashwa kwa wengine. Ili kuendesha miunganisho ya funguo za API kabisa bila foleni za kikomo cha kiwango, kinga ya usalama lazima izimwe kimataifa (`RATE_LIMIT_AUTO_ENABLE=false` au `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Njia za kuandika zinazotumika:**

- **`POST /api/rate-limits`**: Njia ya kuandika ya usimamizi inayotumika kubadilisha hali ya `rateLimitProtection` kwa muunganisho (`{ connectionId: string, enabled: boolean }`). Kuiita kwa `enabled: true` huwasha ulinzi wa wazi; kuiita kwa `enabled: false` huondoa ulinzi wa wazi (ingawa miunganisho inayofanya kazi ya funguo za API hubaki imefunikwa chini ya kinga ya usalama ya kimataifa ikiwa kuwasha kiotomatiki kunawashwa).
- **`PUT /api/providers/[id]`**: Kwa makusudi **haikubali** wala kubadilisha `rateLimitProtection` (#11278). Kusasisha metadata ya muunganisho wa mtoa huduma kupitia `PUT /api/providers/[id]` kamwe hakutabadilisha hali iliyohifadhiwa ya ulinzi wa kikomo cha kiwango.

---

## 6. Kidhibiti cha upitishaji wa mtiririko wa polepole (#9709)

Kilinzi cha hiari `resilienceSettings.streamRecovery.throughputWatchdog` hutambua mkondo wa juu ambao bado unatuma vipande lakini ukitoa pato la msaidizi chini ya kiwango cha pato la manufaa kilichowekwa. Ni tofauti kimakusudi na muda wa kuisha bila kufanya kitu: mapigo ya moyo na metadata huweka upya kipima saa na hazihesabiki kama maendeleo. Pia ni tofauti na tarehe ya mwisho ya jaribio gumu (#9153), ambayo inasalia kuwa dari kamili ya usalama bila kujali ubora wa pato.

Mlinzi anahitaji kipindi cha joto na kufuatiwa na dirisha kamili kabla ya kutoa mimba. Huhesabu delta za maandishi kutoka kwa Kamilisho na Majibu ya matukio ya API (proksi kihafidhina UTF-8 byte), hupuuza matukio ya matumizi tu na tupu, na kusimamisha hukumu wakati simu za zana au matukio ya hoja ziko mbioni. Imezimwa kwa chaguo-msingi na inaweza kuwashwa kwa `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (kwamba env thamani mbegu pekee — chaguo-msingi ya `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean iliyohifadhiwa; angalia kidokezo cha utangulizi cha env-vs-dashibodi juu ya mwongozo huu); dirisha, joto-up, kiwango cha chini zaidi, na pato la chini linaloweza kupimika hupakana na safu ya urekebishaji ya kawaida ya ustahimilivu.

Inapowashwa, kidhibiti cha mlinzi kinatumika tu kwa jaribio amilifu la mkondo wa juu. Kabla ya baiti zozote za mteja zinazoonekana, njia iliyopo ya urejeshaji wa mapema ya akaunti moja inaweza kufungua tena jaribio. Baada ya kujitolea, mkondo haurudiwi tena kwa upofu; mkataba uliopo wa muendelezo wa mkondo salama wa kati pekee ndio unaweza kuunganisha kiambishi tamati. Ukamilishaji unasalia kuwa wa moja kwa moja, kwa hivyo uhasibu wa matumizi na utoaji wa semaphore haurudiwi.

---

## 7. Uwekaji Upya wa Hali ya Upstream (hitilafu za kikomo zilizowasilishwa vibaya)

**Upeo:** lango moja la upstream ambalo huripoti kuisha kwa muda kwa kikomo kwa kutumia hali isiyo sahihi ya HTTP.

**Madhumuni:** kusahihisha hali inayopotosha KABLA ya uainishaji, ili watumiaji wa downstream (injini ya fallback, ujumlishaji wa combo, jibu linalowasilishwa kwa mteja) waone hali halisi ya hitilafu inayoweza kujaribiwa tena.

Baadhi ya malango huashiria kuisha kwa MUDA kwa kikomo kwa kutumia hali ya HTTP
isiyoweza kujaribiwa tena. `agentrouter.org` hurejesha `403` (wakati mwingine `400`) ikiwa na mwili wa Kichina
(`用户额度不足` / `额度不足`) badala ya `429` ya kawaida. Wateja kama Claude
Code huchukulia `403` kuwa ya kudumu na husitisha kipindi, na bila marekebisho
injini ya fallback ingeainisha hali hiyo kama `AUTH_ERROR` badala ya tukio la
kikomo.

**Utekelezaji:**

- Sajili + kilinganishi: `open-sse/config/upstreamStatusRestatement.ts` — orodha
  ya sheria kwa kila mtoa huduma (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), inayolinganishwa kupitia `applyStatusRestatement()`.
- Mahali pa kuitwa: sehemu ya `providerFailure:` katika `open-sse/handlers/chatCore.ts`
  (karibu na mstari wa 3654), mara tu baada ya `parseUpstreamError()` kuchanganua jibu la upstream
  lenye hali ya hitilafu ya HTTP (`!providerResponse.ok`), na kabla ya
  uainishaji wowote kutekelezwa, ili kila mtumiaji wa downstream aone
  hali iliyosahihishwa. Hitilafu zilizopachikwa ndani ya mtiririko wa SSE wa `200` hufuata njia tofauti,
  ya baadaye ya uchanganuzi wa mtiririko na **hazishughulikiwi** na hook hii kwa sasa — hili ni
  kizuizi kinachojulikana, ambacho bado hakijahitajika kwa hali isiyo sahihi ya agentrouter (ambayo
  hujitokeza kama hali ya hitilafu ya HTTP).
- Ustahiki wa kujaribu tena: `429` imo katika `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), kwa hivyo hitilafu iliyowekewa hali upya
  huwa na muda halisi wa kusubiri kabla ya kujaribu tena badala ya kuonekana kama `403` isiyoweza kutumika.
- `60s` ya kubuniwa ya `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  ni kile tu ambacho jibu lililowekewa hali upya humwambia **mteja**; yenyewe si
  muda wa ndani wa cooldown/lockout wa muunganisho — huo unasimamiwa
  kando na utaratibu wowote unaoshughulikia hitilafu iliyowekewa hali upya
  (backoff inayoongezeka ya Connection Cooldown, §2, yenye msingi wa `3s` kwa watoa huduma
  wa API-key; au Model Lockout, §3, kwa watoa huduma wenye kikomo cha kila modeli kama
  agentrouter). Router inaweza kustahiki kujaribu tena kwa ndani mapema
  kuliko muda wa 60s unaoutangaza kwa mteja — hii ni nafasi ya ziada iliyokusudiwa,
  si hitilafu.

Hitilafu za kudumu (`无权访问模型` ya agentrouter — hakuna ruhusa ya kufikia modeli hii)
HAZIWEKEWI kamwe hali upya: `excludeMarkers` huzuia sheria hata wakati `textMarkers` zinalingana,
kwa hivyo hitilafu huhifadhi hali yake ya awali na hakuna kitu kinachoendelea kuijaribu tena milele. Sheria
inayolingana ya uainishaji wa mtoa huduma
(`agentrouter-model-access-denied` katika `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown ya msingi iliyotangazwa ya `6h`) hutumiwa
na `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_kabla ya_ urejeshaji wa mapema wa `FORBIDDEN` wa kategoria ya apikey, ukiwa umewekewa sharti la
`honorsRuleLockScope(provider)` (#10334 — kwa sasa ni wa agentrouter pekee kupitia
orodha ruhusa ya `HONORS_RULE_LOCK_SCOPE_PROVIDERS` katika
`providerErrorRules.ts`). Cooldown ya 6h iliyotangazwa na sheria hupitishwa kama
`fallbackResult.baseCooldownMs`, lakini bado huingia katika njia iliyokuwepo awali
ya lockout ya kikomo kwa kila modeli (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ambayo haikubadilishwa na #10334 isipokuwa chanzo cha cooldown):
hupunguzwa hadi `mlSettings.maxCooldownMs` ya mwendeshaji
(chaguo-msingi `1_800_000ms` / 30min), kama lockout nyingine zote za modeli, na
_sababu ya lockout iliyohifadhiwa_ hubaki kuwa `"forbidden"` iliyowekwa moja kwa moja hapo awali,
si `"auth_error"` ya sheria — ni muda wa cooldown pekee unaoheshimiwa
kutoka mwanzo hadi mwisho, si mfuatano wa herufi wa sababu. Muunganisho wenyewe hubaki hai;
modeli nyingine kwenye muunganisho huo haziathiriwi.

Hitilafu za kikomo zilizowekewa hali upya (`额度不足`) hufikia sheria ya mtoa huduma katika uzalishaji
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bila cooldown yake mwenyewe iliyotangazwa — chaguo-msingi la backoff iliyopimwa la safu ya
uhifadhi hutumika). Tangu #10334, `scope` kwenye
`ProviderErrorRuleMatch` HUTUMIWA kutoka mwanzo hadi mwisho, lakini **tu** kwa watoa huduma walio katika
orodha ruhusa ya `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
leo ni `"agentrouter"` pekee, ikiwa imewekewa sharti kupitia `honorsRuleLockScope()`). Kwa kila
mtoa huduma mwingine, `scope` hubaki kuwa taarifa tu, sawa kabisa na ilivyokuwa kabla ya #10334.
`checkFallbackError` huwasilisha scope ya sheria iliyolingana kama
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ni ulinzi unaoshirikiwa unaothibitisha kwamba
`ruleScope` ni salama kweli kuheshimiwa kama ishara ya kiwango cha muunganisho inayoweza kujirekebisha
(scope `"connection"`, sababu `quota_exhausted`, kamwe si `permanent`,
kamwe si `creditsExhausted` — kinga dhidi ya sheria ya baadaye inayounganisha scope
`"connection"` na hali ya kudumu ya akaunti). Watumiaji wawili huiita:

- **Udumishaji** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  badala ya kuingia kwenye tawi la kufungia **kwa kila modeli** la mtoa huduma
  wa upitishaji (agentrouter ina `passthroughModels: true` → `hasPerModelQuota()`
  hurejesha `true`), hutumia **kipindi cha muda cha kusitisha muunganisho** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, kamwe si hali ya mwisho
  (`credits_exhausted`/`banned`/`expired`) — ili muunganisho ujirejeshe wenyewe
  baada ya kipindi hicho kuisha badala ya kuhitaji uwekaji upya wa kitambulisho
  kwa mkono. Hii hurukwa kwa miunganisho yenye `disableCooling: true` (#2997):
  chaguo hilo la kujiondoa huangukia kwenye ufungiaji wa kila modeli badala yake
  (ni mbadilishano uliorekodiwa — tazama maoni ya msimbo juu ya tawi hilo).
- **Uelekezaji wa combo ndani ya ombi lilelile** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): kizuizi hicho hicho huweka
  muunganisho kwenye seti ya kumbukumbu `exhaustedConnections`, kwa ufunguo
  `${provider}:${connectionId}`. Hii huruka tu lengo lililosalia la OMBI-LILELILE
  ambalo _lenyewe tayari lina `connectionId` hiyo hiyo_ kwenye object yake ya
  lengo (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` kabla ya utafutaji kwenye `exhaustedConnections`) — combo ya
  kawaida ya orodha ya modeli, ambapo malengo sambamba hayana `connectionId`
  zao zilizobainishwa na moja hutatuliwa tu kwa kila utumaji kutoka kwenye
  header ya `X-OmniRoute-Selected-Connection-Id` ya response, kamwe hailingani
  na ufunguo huo. Kwa hali hiyo ya kawaida, ulinzi halisi dhidi ya hatua
  iliyosalia kutumia tena akaunti iliyomaliza kiwango chake SI Set hii — ni
  safu ya udumishaji iliyo hapo juu (`rateLimitedUntil` ya muunganisho sasa iko
  katika wakati ujao) pamoja na kizuizi hiki hiki kinachozuia
  `transientRateLimitedProviders` kwa hitilafu hiyo (tazama "Muundo wa hatua
  mbili" na maoni ya msimbo kwenye tawi la
  `isAgentrouterConnectionQuotaScope` katika `targetExhaustion.ts`): Set hiyo
  ikiachwa bila kuwekewa alama, ruhusa ya lazima ya
  `allowRateLimitedConnection` ya `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) HAITUMIKI kwa hatua
  zilizosalia za mtoa huduma, kwa hiyo kichujio cha `rateLimitedUntil` cha
  uteuzi wa vitambulisho (`src/sse/services/auth.ts:1238`) huheshimiwa kama
  kawaida na hatua iliyosalia ama huchagua muunganisho mwingine wa agentrouter
  ambao bado unastahiki au hushindwa kwa sababu hakuna vitambulisho
  vinavyopatikana — hailazimishi kurudi kwenye muunganisho ambao tawi hili
  limeusitisha hivi punde.

### Muundo wa hatua mbili: urekebishaji wa hali, kisha uainishaji

Urekebishaji wa hali (`upstreamStatusRestatement.ts`) na kanuni za uainishaji
wa mtoa huduma (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ni rejista tofauti ambazo zote hutumia kitambulisho cha
mtoa huduma na viashiria vya maandishi kama funguo, lakini hutekelezwa katika
sehemu tofauti na kutimiza madhumuni tofauti: urekebishaji huandika upya hali
ya HTTP mapema katika `chatCore.ts`; kanuni za uainishaji huchagua `reason` ya
fallback na `scope` ya kufunga (`model` / `provider` / `connection`) ndani ya
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Kanuni za uainishaji huona tu **maandishi** kamili ya hitilafu (yanayohitajika
ili kulinganisha viashiria vya body kama `额度不足`) kwa watoa huduma
walioorodheshwa katika orodha ruhusu ya `FULL_TEXT_RULE_PROVIDERS` ndani ya
`providerErrorRules.ts` — kwa sasa ni `"agentrouter"` pekee. Kwa kila mtoa
huduma mwingine wa **katalogi iliyojengewa ndani**, `checkFallbackError`
huipa `getProviderErrorRuleMatch` hitilafu yenye muundo pekee (`{code, type}`),
ambayo inatosha kwa kanuni zinazotegemea header/hali/code lakini haiwezi kuona
viashiria vya maandishi ya body. Kisaidizi cha `resolveRuleMatchBody()`
hufanya uteuzi huu: maandishi kamili ya hitilafu kwa watoa huduma walio kwenye
orodha ruhusu, na hitilafu yenye muundo kwa wengine. Kuongeza mtoa huduma
**aliyejengewa ndani** kwenye `FULL_TEXT_RULE_PROVIDERS` ni kujiunga kwa hiari
na kwa uwazi kwa kila mtoa huduma — ipo ili njia chaguomsingi ya kila mtoa
huduma ambaye hayuko kwenye orodha ibaki bila kubadilika hata kwa byte moja.

`scope` ya kanuni (`model` / `provider` / `connection`) ni chaguo tofauti la
kujiunga kwa hiari na `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError`
huiwasilisha tu kama `fallbackResult.ruleScope`, na watumiaji wa hatua za chini
huiheshimu kama kitu kingine zaidi ya lebo ya taarifa kwa watoa huduma walio
katika orodha ruhusu ya `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ndani ya faili hiyo
hiyo (ikidhibitiwa kupitia `honorsRuleLockScope()` — leo ni `"agentrouter"`
pekee). Tazama "Hitilafu za kiwango zilizorekebishwa" hapo juu ili kuelewa
ulinganishaji wa `scope: "connection"` hufanya nini hasa baada ya mtoa huduma
kuwekwa kwenye orodha hiyo ruhusu.

**#11104 — kanuni zilizotangazwa na mwendeshaji hupita orodha zote mbili
ruhusu.** Mwendeshaji anaweza kutangaza kanuni ya kila mtoa huduma wakati wa
utekelezaji kupitia `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
bila kuhariri faili hii. Kuweka kanuni ya mwendeshaji nyuma ya
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — orodha ruhusu
zinazolenga kulinda tabia **chaguomsingi** ya kanuni za katalogi iliyojengewa
ndani — kungefanya utaratibu wa mipangilio usiwe na kazi kwa kila mtoa huduma
isipokuwa wale ambao tayari wameorodheshwa humo, kwa kuwa kutangaza kanuni
tayari ni kujiunga kwa hiari na kwa uwazi kwa mwendeshaji.
`resolveRuleMatchBody()` na `honorsRuleLockScope()` zote hukagua
`hasOperatorRuleForProvider()` kwanza: mtoa huduma mwenye kanuni ya mwendeshaji
hupata maandishi ghafi ya hitilafu na `scope` aliyotangaza huheshimiwa, bila
kujali kama pia anaonekana katika mojawapo ya orodha ruhusu.

**Pengo linalojulikana — `providerRuleRegistry` haitumiki kamwe kwa HTTP 400.**
Tawi la `BAD_REQUEST` la `checkFallbackError` huainisha hali 400 kikamilifu
kupitia arrays zake za patterns (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, n.k. katika `accountFallback.ts`) na hurejesha
matokeo kabla ya kufikia tawi la `configuredRule`/`getProviderErrorRuleMatch`
lililo juu yake. Kanuni ya katalogi iliyojengewa ndani (au kanuni ya
mwendeshaji) yenye `status: 400` ni sahihi kisintaksia lakini haitawahi
kutekelezwa. Hakuna kanuni iliyopo inayolenga 400 leo, kwa hiyo hakuna chochote
katika mazingira ya uzalishaji kinachoathirika — lakini kanuni ya 400 ya
baadaye inahitaji tawi hili libadilishwe kwanza, jambo ambalo ni badiliko kubwa
kuliko kuongeza kanuni (linaainisha upya 400 kwa kila mtoa huduma ambaye tayari
anategemea tabia ya pattern-array) na liko nje ya mawanda ya kuongeza kanuni
kwa mtoa huduma mmoja.

### Kuongeza mlango mpya unaoripoti vibaya hali ya quota

1. Sajili safu moja ya sheria katika `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Weka `textMarkers`
   ziwe mahususi kwa mtoa huduma; kamwe usitumie tena vifungu vya
   Kiingereza vya jumla vinavyokinzana na
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Kwa hiari, sajili sheria za uainishaji katika
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ili
   kuchagua wigo sahihi wa kufunga (`connection` kwa quota ya akaunti
   nzima, `model` kwa makosa ya kila modeli). Hatua hii huingia kutumika
   katika uzalishaji tu kwa watoa huduma ambao sheria zao zinahitaji
   maandishi kamili ya kosa (viashiria vya mwili): ongeza kitambulisho cha
   mtoa huduma kwenye `FULL_TEXT_RULE_PROVIDERS` katika faili hiyohiyo —
   vinginevyo `checkFallbackError` hukabidhi sheria kosa lililopangiliwa
   `{code, type}` tu, na sheria ya maandishi ya mwili haitawahi kulingana
   na trafiki hai. Sheria zinazolingana tu kwa `status`/`headers` (kama
   za Opencode au Minimax) hazihitaji kujiunga kwa hiari huku. Kando na
   hilo, ikiwa sheria inatangaza `scope: "connection"` na lengo ni
   kupooza kweli kwa muunganisho mzima pamoja na kuruka combo ya ombi
   lilelile (siyo lebo ya habari tu), ongeza kitambulisho cha mtoa huduma
   kwenye `HONORS_RULE_LOCK_SCOPE_PROVIDERS` katika faili hiyohiyo — hii
   ndiyo inayodhibiti matumizi ya mtindo wa
   `isAgentrouterConnectionQuotaScope()` katika `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) na `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bila hilo, `scope`
   bado hupitia kupitia `fallbackResult.ruleScope` lakini hakuna
   kinachochukua hatua juu yake.
3. Ongeza majaribio ya vitengo (unit tests) yanayolingana na
   `tests/unit/upstream-status-restatement.test.ts` na
   `tests/unit/agentrouter-error-rules.test.ts` (ikiwemo vikingo vya
   not-permanent / not-creditsExhausted, na — ikiwa mtoa huduma anahitaji
   orodha ya kuruhusiwa — jaribio linalothibitisha kwamba
   `resolveRuleMatchBody()` hurudisha maandishi kamili kwa mtoa huduma
   huyo tu).

Hakuna mabadiliko yanayohitajika kwa `chatCore.ts`, `classifyError`, au
combo.

#### Kufunga kwa makundi (bucket) ya egress (#10880)

Watoa huduma katika `EGRESS_BUCKETED_LOCK_PROVIDERS` (familia ya opencode)
huchukuliwa kama upstream wenye makundi kwa IP (kiwango cha bure cha
opencode kimegawiwa makundi kwa IP, siyo kwa akaunti — tazama #9611):
kosa la status-429 lililoainishwa kama `quota_exhausted` **au**
`rate_limit_exceeded` hupooza kila muunganisho wa familia
iliyoorodheshwa ambao IP yake ya egress ya mwisho inayojulikana
inalingana na ya muunganisho unaoshindwa, kabla mzunguko haujawajaribu
— hivyo kuepuka miito N-1 ya upstream inayohakikishiwa kushindwa (umbo
lilelile kama #10460/#10525). `rate_limit_exceeded` imejumuishwa kwa
makusudi: katika njia ya `markAccountUnavailable` sheria mahususi za
opencode hazilingani kamwe (hakuna headers/body zinazokabidhiwa
`checkFallbackError`, opencode haiko katika `FULL_TEXT_RULE_PROVIDERS`),
kwa hiyo 429 ambayo mwili wake hubeba maandishi ya quota ya usajili
("monthly usage limit reached") huainishwa kama `quota_exhausted` na
fallback ya maandishi ya quota (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; kupooza kwa saa 1) kabla sheria ya `status_429`
haijafikiwa — ilhali 429 isiyo na maandishi ya quota (rate limiting ya
kawaida) huainishwa kupitia sheria ya `status_429` kama
`rate_limit_exceeded` na bado hupooza familia ya IP. Kwa mtoa huduma
aliyeorodheshwa, kikomo cha kiwango kilichogawiwa makundi kwa IP ni
ishara ileile na quota iliyokwisha. Vikwazo halisi:

- **Juuhudi bora**: kifungo hutatua `egress_ip` ya mwisho inayojulikana ya muunganisho kutoka `proxy_logs` (dirisha la saa 24, synchronous, bila cache). Cache baridi (IP ya egress haijawahi kuchunguzwa) au hakuna safu → muunganisho unaoshindwa bado hupoezwa na tawi (kurekodiwa kama ilivyo leo), ni kwamba tu hakuna ndugu anayefungwa.
- **Si ya mwisho kamwe**: kupoezeshwa ni dirisha la kiasi linalofanywa upya (`testStatus: "unavailable"`); hali ya kudumu kamwe haitokani na ishara ya kiwango cha IP. Miunganisho ya `disableCooling` huruka tawi kabisa.
- **Kiwango cha undani cha kifungo kinabadilika kwa familia iliyoorodheshwa**: huu ni mabadiliko ya wigo, si uboreshaji wa ndugu pekee. opencode ni mtoaji wa `passthroughModels`, kwa hivyo kabla ya tawi hili 429 ilitoa kufungiwa kwa kila MODELI; sasa hutoa kupoezeshwa kwa muunganisho — ikiwa ni pamoja na mwendeshaji anayeendesha muunganisho mmoja bila ndugu kabisa. Hicho ndicho kiwango cha undani ambacho jedwali la sheria la opencode tayari linatangaza kuwa sahihi (`scope: "connection"`, `providerErrorRules.ts`), ambacho hakijawahi kuheshimiwa hadi sasa kwa sababu opencode haipo katika `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Tawi huandika lenyewe kupoezeshwa kwa muunganisho unaoshindwa + `backoffLevel`, huku likiiga tawi la agentrouter lenye wigo wa muunganisho, na kurudi — kizuizi cha kila modeli na njia ya jumla iliyo chini kamwe hazifikwi.
- **Combo imejumuishwa**: kama tawi la agentrouter, wigo kwa makusudi hupuuza kushusha kwa `persistUnavailableState`/`isCombo` ambacho mwitaji wa combo hukitumia kwa 429. Kufungiwa kwa kila modeli si aina dhaifu ya wigo huu, ni kipimo kisicho sahihi: hakisemi chochote kuhusu IP iliyochoka, kwa hivyo mzunguko wa combo ungeendelea kuchoma simu moja inayohakikishiwa kushindwa kwa kila ndugu.
- **Usalama wa ndugu**: ndugu ambaye tayari yuko kwenye hali ya mwisho (banned/credits_exhausted) au tayari yuko kwenye kupoezeshwa kwa muda mrefu zaidi kamwe haandikwi upya.
- **Orodha ya ruhusa ya kipekee**: kupanua `EGRESS_BUCKETED_LOCK_PROVIDERS` ni uamuzi wa wazi wa mmiliki; hakuna uunganishaji wa jumla (mfano #10334/#10419). Swali la ndugu hufunga orodha hiyo hiyo ya ruhusa badala ya kuirudia kama literal ya SQL, kwa hivyo kuipanua hubaki kuwa mabadiliko ya mstari mmoja.
- **Mzunguko wa IP ya egress, pande zote mbili**: dirisha la utafutaji (saa 24) ni pana zaidi kuliko TTL ya cache ya IP ya egress (dakika 5), kwa hivyo "IP ya mwisho inayojulikana" ni historia, si hali ya sasa. Ikiwa proxy ya muunganisho ilizunguka ndani ya dirisha, kifungo kinaweza **kukosa** IP inayoshirikiwa kwa kweli (IP iliyorekodiwa ni ile mpya, isiyochoka) — na kwa usawa kinaweza **kumpoeza ndugu ambaye tangu hapo amezunguka na kuiondoka** IP iliyochoka. Kesi ya pili humgharimu ndugu huyo dirisha moja la kupoezeshwa; zote mbili ni mipaka iliyokubaliwa ya juuhudi bora ya utafutaji unaotegemea historia.
- **Gharama**: uchanganuzi mbili zenye mipaka wa `proxy_logs` (zimechujwa kwa dirisha kupitia `idx_pl_timestamp`), tu kwa kiwango cha 429. Hakuna faharasa mpya (migration 134 YAGNI). Imepimwa kwenye nakala ya DB ya trafiki halisi ya ukubwa wa wastani; instance yenye pato la juu huhifadhi safu nyingi zaidi kwa uwiano katika dirisha hilo hilo.

---

## Vipengele Vingine vya Ustahimilivu

- **Mikakati 20 ya uelekezaji** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — angalia [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Uelekezaji unaozingatia kuweka-upya** (v3.8.0) — unapa kipaumbele miunganisho kulingana na wakati wa kuweka upya kiasi (quota).
- **Upunguzaji wa hali ya mandharinyuma** — Responses API `background: true` hupunguzwa hadi hali ya synchronous pamoja na onyo.
- **Ugunduzi wa kikomo cha zana unaobadilika** — huzuia watoa huduma kwa muda (backs off) vikomo vya idadi ya zana vinapofikiwa.
- **Njia mbadala ya dharura** — inadhibitiwa na `OMNIROUTE_EMERGENCY_FALLBACK`; waendeshaji wanaweza kuibatilisha kutoka ukurasa wa Feature Flags bila kuanzisha upya.

---

## Utatuzi wa Hitilafu

- Combo ya weighted hujibu `503 all_targets_cooling_down` (`Retry-After` imewekwa, `diagnostics.excluded` inataja kila lengo kwa `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → kundi (pool) limewekwa mipangilio na limeunganishwa, kila lengo limetengwa tu na kipima-muda cha ustahimilivu; onyo `[COMBO] Weighted selection: every target excluded before dispatch — …` linataja sababu na sekunde zilizobaki. `404 no_executable_targets` kutoka combo hiyohiyo inamaanisha hakuna kipima-muda cha ustahimilivu kilichohusika (hakuna cha kuendesha, au kila akaunti imeshindwa uchunguzi wa upatikanaji). Imejengwa katika `open-sse/services/combo/pinRecovery.ts` kutoka kwa vitengwa vilivyokusanywa katika `targetResolution.ts`.
- Funguo zote za mtoa huduma zimerukwa → angalia hali ya circuit breaker NA pia `rateLimitedUntil`/`testStatus` ya kila muunganisho.
- Mtoa huduma ametengwa kabisa baada ya dirisha la kuweka upya → msimbo unasoma `state` ghafi badala ya `getStatus()`/`canExecute()`.
- Ufunguo mmoja unashindwa, wengine wanapaswa kufanya kazi → pendelea connection cooldown kuliko circuit breaker.
- Modeli moja tu inashindwa → pendelea model lockout kuliko connection cooldown.
- Hali inapaswa kujiponia yenyewe lakini haifanyi hivyo → angalia timestamp ya siku zijazo + njia ya kusoma inayosasisha (refresh) hali iliyopitwa na wakati. Hali za kudumu zinahitaji mabadiliko ya mwongozo (manual).

---

## Hali ya wakati wa utekelezaji — rejea ya haraka ya ajenti

> Imehamishiwa kama ilivyo (verbatim) kutoka `AGENTS.md` → "Resilience Runtime State" (PR #12743) ili
> mwongozo wa ajenti ubaki chini ya bajeti ya muktadha ya 40k. Huu ni mtazamo uliofupishwa unaolenga
> ajenti wa sehemu zilizo hapo juu; sehemu zenye namba zinabaki kuwa marejeleo kamili.

OmniRoute ina mbinu tatu zinazohusiana lakini tofauti za kushughulikia kushindwa kwa muda. Weka
wigo wao tofauti unapotatua tabia ya uelekezaji. Angalia
[mchoro wa tabaka 3 za ustahimilivu](../diagrams/exported/resilience-3layers.svg)
(chimbuko: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
kwa ramani ya mwonekano wa haraka.

### Kivunja-Mzunguko cha Mtoa Huduma (Provider Circuit Breaker)

**Wigo**: mtoa huduma mzima, k.m. `glm`, `openai`, `anthropic`.

**Lengo**: kuacha kutuma trafiki kwa mtoa huduma anayeshindwa mara kwa mara katika kiwango cha
upstream/huduma, ili mtoa huduma mmoja asiye na afya asipunguze kasi ya kila ombi.

**Utekelezaji**:

- Darasa kuu: `src/shared/utils/circuitBreaker.ts`
- Uunganishaji wa lango la chat/utekelezaji: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API ya hali ya wakati wa utekelezaji: `src/app/api/monitoring/health/route.ts`
- Vifuniko vya pamoja: `open-sse/services/accountFallback.ts`
- Jedwali la hali linalohifadhiwa: `domain_circuit_breakers`

**Hali** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: trafiki ya kawaida inaruhusiwa.
- `DEGRADED`: kanda ya onyo la mapema — kushindwa kumevuka kizingiti cha kupungua lakini bado
  hakijafikia kizingiti cha kivunja-mzunguko; trafiki bado inaendelea, dashibodi zinaonyesha onyo.
  Jaribio halali la muunganisho au dirisha tulivu bila kushindwa kupya huirudisha hadi `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` ina dirisha hilo).
- `OPEN`: mtoa huduma amezuiwa kwa muda; witoaji hupokea jibu la provider-circuit-open
  au uelekezaji wa combo huruka hadi lengo lingine.
- `HALF_OPEN`: muda wa kuweka upya (reset timeout) umeisha; ruhusu ombi la uchunguzi (probe).
  Mafanikio hufunga kivunja-mzunguko, kushindwa hukifungua tena.

**Chaguomsingi** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, zinazotumika kupitia
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` katika `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` katika `src/sse/handlers/chatHelpers.ts`). Kivunja-mzunguko cha
mtoa huduma mzima kinaendeshwa kwa `circuitBreakerThreshold` / `circuitBreakerReset`:

| Wasifu         |  hupungua kwa | hufunguka kwa (`circuitBreakerThreshold`) | kuweka upya (`circuitBreakerReset`) |
| -------------- | ------------: | ----------------------------------------: | ----------------------------------: |
| OAuth          |           `5` |                                       `8` |                               `60s` |
| Ufunguo wa API |           `7` |                                      `12` |                               `30s` |
| Ya ndani       | (inayotokana) |                                       `2` |                               `15s` |

`PROVIDER_PROFILES` pia hufafanua `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (dakika 15/30/5) na `providerCooldownMs` (dakika 5/10/1): hizi huchochea
**lango la dirisha la Provider Cooldown ya kimataifa ya hiari (opt-in)** (`PROVIDER_COOLDOWN_ENABLED`,
chaguomsingi imezimwa) — ingizo la kiwango cha mtoa huduma katika
`open-sse/services/providerCooldownTracker.ts` huhesabiwa kama linalopooza tu baada ya kushindwa
kwa idadi ya `providerFailureThreshold` ndani ya `providerFailureWindowMs`, kisha hupooza kwa
`providerCooldownMs`. Hizi SI vizingiti vya kivunja-mzunguko kilicho hai — usizirekebishe
ukitarajia tabia ya kivunja-mzunguko. Kila chaguomsingi inaweza kubatilishwa kupitia
vigezo vya mazingira `OMNIROUTE_PROVIDER_BREAKER_*` na `OMNIROUTE_CIRCUIT_BREAKER_*`;
jedwali la rejea sahihi la wakati wa utekelezaji liko katika `docs/architecture/RESILIENCE_GUIDE.md`.

Hali za kushindwa za kiwango cha mtoa huduma pekee ndizo zinazopaswa kuuwasha kivunja-mzunguko cha mtoa huduma:

```ts
(408, 500, 502, 503, 504);
```

Usiuwashe kivunja-mzunguko cha mtoa huduma mzima kwa makosa ya kawaida ya akaunti/ufunguo/modeli
kama visa vingi vya `401`, `403`, au `429`. Hivyo mara nyingi ni vya connection cooldown au model
lockout. `403` ya mtoa huduma wa kawaida wa ufunguo wa API inapaswa kuwa inayoweza kupona
isipokuwa ikigawanywa kama kosa la mwisho la mtoa huduma/akaunti.

Mvunjaji hutumia urejeshaji wa uvivu, si kipima muda cha usuli. `OPEN` inapokwisha muda wake, kusoma kama vile `getStatus()`, `canExecute()`, na `getRetryAfterMs()` hufanya upya hali kuwa `HALF_OPEN`, hivyo dashibodi na wajenzi wa wagombea wa combo hawaendelei kumtenga mtoa huduma aliyekwisha muda wake milele.

### Muda wa Kupooza kwa Muunganisho

**Wigo**: muunganisho/akaunti/ufunguo mmoja wa mtoa huduma.

**Kusudi**: kuruka kwa muda ufunguo/akaunti moja mbaya huku ukiruhusu miunganisho mingine ya mtoa huduma yuleyule kuendelea kutumikia maombi.

**Utekelezaji**:

- Njia ya kuandika/kusasisha: `src/sse/services/auth.ts::markAccountUnavailable()`
- Uchaguzi/uchujaji wa akaunti: `src/sse/services/auth.ts::getProviderCredentials...`
- Hesabu ya muda wa kupooza: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Mipangilio: `src/lib/resilience/settings.ts`

Sehemu muhimu kwenye miunganisho ya watoa huduma:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Wakati wa uchaguzi wa akaunti, muunganisho hurukwa huku:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Muda wa kupooza pia ni wa uvivu: `rateLimitedUntil` ikishapita, muunganisho hupata sifa tena. Baada ya matumizi yenye mafanikio, `clearAccountError()` hufuta `testStatus`, `rateLimitedUntil`, sehemu za makosa, na `backoffLevel`.

Tabia chaguo-msingi ya muda wa kupooza kwa muunganisho:

- Muda wa msingi wa kupooza wa OAuth: `5s`.
- Muda wa msingi wa kupooza wa ufunguo wa API: `3s`.
- Kwa ufunguo wa API, `429` inapaswa kupendelea vidokezo vya kujaribu tena vya mkondo wa juu (`Retry-After`, vichwa vya kurejesha, au maandishi ya kurejesha yanayoweza kuchanganuliwa) yanapopatikana.
- Kushindwa kwa kurudiarudia kunakoweza kurejeshwa hutumia backoff ya kipeuo:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Ulinzi wa anti-thundering-herd huzuia kushindwa kwa sambamba kwenye muunganisho huo huo kuongeza muda wa kupooza kwa kurudiarudia au kuongeza `backoffLevel` mara mbili.

Hali za mwisho si muda wa kupooza. `banned`, `expired` (ambayo inakuwa ya mwisho tu baada ya majaribio N yaliyowekewa kikomo kupitia `EXPIRED_RETRY_MAX`), na `credits_exhausted` zimekusudiwa kubaki hazipatikani hadi sifa za uthibitishaji/mipangilio zibadilike au mwendeshaji azirejeshe upya. Usiandike juu ya hali za mwisho kwa hali ya mpito ya muda wa kupooza.

### Kufungwa kwa Modeli

**Wigo**: mtoa huduma + muunganisho + modeli.

**Kusudi**: epuka kulemaza muunganisho mzima wakati modeli moja tu haipatikani au imezuiwa na mgawo kwa muunganisho huo.

Mifano:

- Watoa huduma wenye mgawo kwa kila modeli wanaorejesha `429`.
- Watoa huduma wa ndani wanaorejesha `404` kwa modeli moja inayokosekana.
- Kushindwa kwa ruhusa za hali/modeli mahususi kwa mtoa huduma kama hali zilizochaguliwa za Grok.

Kufungwa kwa modeli kunapatikana kwenye `open-sse/services/accountFallback.ts` na huruhusu muunganisho huo huo kuendelea kutumikia modeli nyingine.

### Mwongozo wa Utatuzi

- Ikiwa funguo zote za mtoa huduma zimerukwa, kagua hali ya mvunjaji wa mtoa huduma pamoja na `rateLimitedUntil`/`testStatus` ya kila muunganisho.
- Ikiwa mtoa huduma anaonekana ametengwa kabisa baada ya dirisha la kurejesha, angalia kama msimbo unasoma `state` ghafi badala ya kutumia `getStatus()`/`canExecute()`.
- Ikiwa ufunguo mmoja wa mtoa huduma unashindwa lakini wengine wangepaswa kufanya kazi, pendelea muda wa kupooza kwa muunganisho badala ya mvunjaji wa mtoa huduma.
- Ikiwa modeli moja tu inashindwa, pendelea kufungwa kwa modeli badala ya muda wa kupooza kwa muunganisho.
- Ikiwa hali inapaswa kujiponya yenyewe, inapaswa kuwa na alama ya muda ya siku zijazo/muda wa kukwisha wa kurejesha na njia ya kusoma inayofanya upya hali iliyokwisha. Hali za kudumu zinahitaji mabadiliko ya mwongozo ya sifa za uthibitishaji au usanidi.

---

## Kuchukua Alama za Vidole vya TLS na Ufichaji

Ufichaji mahususi wa mtoa huduma (JA3/JA4, CCH, kuficha) umehatiwa kando — angalia `docs/security/STEALTH_GUIDE.md` (git; haijajengwa ndani ya `/docs`).

---

## Upimaji wa ustahimilivu (Awamu 8 · Kipengele C)

Zaidi ya majaribio ya vitengo ya mantiki ya ustahimilivu, majaribio matatu huitahini runtime chini ya hali halisi za msongo/kushindwa (yote ni ya ujumuishaji/kila usiku — hakuna linalozuia PR):

| Jaribio        | Kinachofanywa                                                                                                                                                                                                          | Kuendesha                                   |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Chaos          | Node bandia ya upstream huingiza ucheleweshaji/uwekaji upya/ukomo wa muda/503 halisi; inathibitisha kwamba kivunja mzunguko hufunguka/hupona na `checkFallbackError` huainisha 503 kama njia mbadala inayoweza kupona. | `RUN_CHAOS_INT=1 npm run test:chaos`        |
| Ukuaji wa heap | Mito ~500 kwa kila `createSSEStream` chini ya `--expose-gc`; hushindwa ikiwa heap inakua zaidi ya kikomo cha juu (ulinzi wa OOM #3069).                                                                                | `npm run test:heap`                         |
| k6 soak        | Mzigo endelevu dhidi ya `/api/monitoring/health`; vizingiti vya p95/hitilafu.                                                                                                                                          | `k6 run tests/load/k6-soak.js` (kila usiku) |

Inaratibiwa na `.github/workflows/nightly-resilience.yml` (cron + dispatch). Katika
`test:integration` chaguo-msingi, chaos na heap hujiruka kiotomatiki (bila `RUN_CHAOS_INT`/`--expose-gc`).

---

## Angalia Pia

- [Muongozo wa Usanifu](./ARCHITECTURE.md) — Usanifu wa mfumo na utendakazi wa ndani
- [Muongozo wa Mtumiaji](../guides/USER_GUIDE.md) — Watoa huduma, michanganyiko, ujumuishaji wa CLI
- [Injini ya Auto-Combo](../routing/AUTO-COMBO.md) — Upigaji alama wa vigezo 16, pakiti za hali
