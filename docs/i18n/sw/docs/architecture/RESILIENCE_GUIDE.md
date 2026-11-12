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

### Omba otomatiki uwekaji upya wa benki

**Upeo:** Viunganisho vya usajili wa Codex na Claude (OAuth).**Jijumuishe** : mpangilio wa `bankedResetAutoApply` umezimwa na uko katika hali ya `dry-run` kwa chaguo-msingi (Mipangilio → AI → Tumia uwekaji upya wa benki kiotomatiki).

**Kusudi:** kutumia uwekaji upya uliowekwa kwenye benki peke yao wakati akaunti inapogonga ukuta wa matumizi, badala ya kungoja opereta abonyeze "Komboa" kwenye ukurasa wa Mipaka ya Watoa Huduma.

| Aina ya mkopo (`creditTypes`) | Ni nini kilichokombolewa                                       | Ambapo inaendesha                                               |
| ----------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- |
| `codexCredits`                | Codex weka upya mikopo                                         | kazi ya nyuma, kila 60 s                                        |
| `claudeCredits`               | Ruzuku za benki za Claude ( mikopo `GRANT` )                   | kazi ya nyuma, kila 60 s                                        |
| `claudeSessionReset`          | Kuweka upya kikomo cha kipindi cha kila wiki Claude (hapo juu) | njia ya ombi, kupitia sera sawa na ubadilishaji wa kila akaunti |

**Utekelezaji:**

- Uamuzi safi (sheria moja iliyowekwa kwa njia zote mbili): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Kazi ya usuli: `src/lib/services/bankedResetAutoApply.ts` (ilianza `src/instrumentation-node.ts`)
- Lango la njia ya ombi la Claude : `src/lib/usage/claudeSessionResetPolicy.ts`, limesajiliwa kupitia `setClaudeLimitResetPolicy()` katika `open-sse/services/claudeLimitReset.ts`
- Historia, kofia na mtandao: `src/lib/usage/bankedResetAudit.ts`
- Historia API: `GET /api/settings/banked-reset-auto/history?limit=50` (hati ya usimamizi)

**Agizo la uamuzi** (kanuni ya kwanza iliyoshindwa ni sababu iliyorekodiwa):

1. Kipengele kimezimwa, aina ya mkopo imezimwa, au akaunti nje ya upeo (`accountScope` `all` / `selected` pamoja na ramani `connections` ya kila akaunti).
2. Nje ya ratiba ya hiari ya UTC (`startHourUtc` > `endHourUtc` inavuka usiku wa manane).
3. Caps zaidi ya saa 24 zilizopita: `maxPerAccountPerDay` (1), `maxPerDay` (3), na `minSpacingMinutes` (30) kati ya ukombozi wowote mbili.
4. Anzisha: dirisha la `session` au `weekly` lenye ukuta (lisomwa kutoka `getQuotaWindowStatus().reachedThreshold`, si `isAccountQuotaExhausted()`, ambalo huripoti tu akaunti yenye kila dirisha lililotumika), au muda wa mkopo unaoisha ndani ya `expiringCreditHours` (24) kwenye akaunti ambayo imetumia angalau `expiringCreditMinUsedPercent` (50).
5. Kilinzi kilichowekwa upya: ruka dirisha la ukuta la saa 5 likiwekwa upya ndani ya `sessionResetGuardMinutes` (90), au dirisha la kila wiki lenye ukuta ndani ya `weeklyResetGuardHours` (12).
6. Sakafu ya kila wiki: ruka uwekaji upya wa saa 5 wakati iliyosalia kwa wiki iko chini ya `weeklyFloorPercent` (10).
7. Hali ya `last-resort` : ruka wakati akaunti nyingine ya ndani ya mtoa huduma sawa ina angalau `poolHeadroomPercent` (10) iliyosalia katika madirisha yote mawili. Vichochezi vya mkopo unaokwisha hupita hii.
8. `dry-run` hurekodi safu na haikomboi chochote; `last-resort` na `eager` zinakomboa.

Data ya mgao inayokosekana haifungui kamwe ukombozi: muda usiojulikana wa kuweka upya au kuruka kwa matumizi ya kila wiki.

**Kuweka upya kipindi cha Claude :** kipengele kikiwa kimezimwa, au `claudeSessionReset` imezimwa, kigeuzi cha `autoLimitReset` kwa kila akaunti huamua kama hapo awali. Kwa kuwasha zote mbili, kipengele hiki kinachukua nafasi ya vigeuza kwa kila akaunti: akaunti ya ndani inaweza kudai tu wakati sera inaruhusu, na katika hali ya `dry-run` hakuna dai linalofanywa.

**Usalama:** kazi itakomboa zaidi ya salio moja kwa kila tiki, huamua kabla ya kuorodhesha salio (akaunti iliyorukwa haijaorodheshwa), hutumia vitufe vya kutambua uwezo `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`, na kuzima akaunti kwa saa 1 baada ya kushindwa kuorodheshwa au kukomboa. Kila uamuzi wa ukombozi, kushindwa na kukauka huandikwa kwa `audit_log` (`action: "bankedReset.redeem"`, hakuna ishara au vitambulisho vya mkopo); kofia huhesabiwa kutoka kwa safu hizo, ili ziweze kuishi kuanza tena. Ukombozi uliofaulu pia huzima mtandao `provider.reset_redeemed`.

Walinzi wa kurudi nyuma: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

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

## 3. Kufungia Modeli

**Wigo:** mchanganyiko wa provider + connection + model.

**Wigo wa key kulingana na hali:** hali ya hitilafu ndiyo huamua ni key ipi ambayo lockout huandikia
(`resolveLockoutScope()` katika `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — ishara ya quota au entitlement — hufunga **familia ya quota**:
  kwa codex wigo mzima wa `codex` / `spark` (kila modeli ya `gpt-5*` ya
  connection), na kwa providers wengine `getQuotaScopedModelForProvider()`.
- `404` hufunga modeli tupu (`getModelLockKey()` hupunguza wigo wa `not_found`).
- Hali nyingine yoyote — hitilafu za usafirishaji/server za `5xx` na `502` iliyoundwa
  na OmniRoute yenyewe kutokana na uthibitishaji wa ubora — hufunga tuple **kamili**
  ya provider/connection/model pekee. Stream yenye hitilafu kwenye modeli moja si ushahidi
  kuhusu quota ya account; kabla ya sheria hii, jibu moja tupu kwenye
  `codex/gpt-5.6-luna` liliondoa kila modeli ya `gpt-5*` ya connection hiyo kwenye
  routing kwa dakika 2–30 (zikiwa zinaongezeka), huku quota yake ikiwa haijaguswa.
- Chaguo la wazi la `scope` la caller huwa na kipaumbele (Antigravity hupitisha `"exact"`).

**Madhumuni:** kuepuka kuzima connection nzima wakati modeli moja tu haipatikani au ina kikomo cha quota.

**Mifano:**

- Providers za quota kwa kila modeli zinazorejesha 429
- Providers za ndani zinazorejesha 404 kwa modeli moja inayokosekana
- Hitilafu za ruhusa za mode/model mahususi kwa provider (kwa mfano, modes za Grok)

**Utekelezaji:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashibodi ya Model Cooldowns (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Huorodhesha lockout zinazotumika pamoja na: provider, connection, model, sababu, expiresAt. Waendeshaji wanaweza kuwezesha tena modeli kwa mikono kutoka kwenye kadi.

**REST API:**

- `GET /api/resilience/model-cooldowns` — orodha ya lockout zinazotumika
- `DELETE /api/resilience/model-cooldowns` — kuwezesha tena kwa mikono. Body: `{provider, connection, model}`. Auth: management.

### Kidhibiti cha Cooldown

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Ukurasa mmoja kwa kila connection ambayo imetolewa kwenye routing kwa sababu ya muda
mfupi, badala ya kufungua ukurasa wa kila provider. Huorodhesha cooldown za connection,
lockout za modeli na hali za mwisho, huziondoa kwa kila connection, kwa uteuzi fulani, au
kwa connections zote za provider, na huhariri sheria za cooldown zinazotumiwa zaidi:
`streamStallCooldown.enabled` na cooldown ya msingi ya `connectionCooldown` ya OAuth /
API-key pamoja na hatua za juu za backoff (huhifadhiwa kupitia
`PATCH /api/resilience`). Hali za mwisho (`banned`, `expired`, `credits_exhausted`) zinaorodheshwa
lakini haziondolewi hapa.

Kadi ya **Error cooldown rules** kwenye ukurasa huo huo huhariri sheria za hitilafu za operator
(`settings.providerErrorRules`) na chaguo-msingi za jumla kwa kila provider
(`settings.providerErrorDefaults`) kupitia `PATCH /api/settings` — tazama "Operator-declared
rules" chini ya §7 kwa jinsi zinavyolingana. Muda ni Default (hakuna cooldown iliyoainishwa wazi),
dakika 30, saa 1, saa 5, saa 24, au dakika maalum 1 hadi 43,200 (siku 30).

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — connections zenye hali, cooldown iliyosalia,
  kiwango cha backoff, aina ya mwisho ya hitilafu na lockout za modeli (hakuna credentials)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` au
  `{all: true, provider?}`; hurejesha `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI ya mipangilio ya lockout + urejeshaji wa success-decay (v3.8.23)

Lockout ya modeli ilibadilika kutoka kwenye tabia iliyowashwa kila wakati na kuwekwa
moja kwa moja kwenye msimbo hadi kuwa kipengele kinachoweza kusanidiwa kikamilifu,
cha kuwashwa kwa hiari, chenye kadi yake ya mipangilio na njia ya kujirekebisha.

**Kadi ya mipangilio:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Hii ni **tofauti** na `ModelCooldownsCard` ya kusoma pekee iliyo hapo juu (ambayo
hu_**orodha**_ tu lockout zinazotumika) — kadi mpya _**hus**_anidi vigezo_. Chaguo-msingi
zinaishi kwenye `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Mipangilio              | Chaguo-msingi                    | Maana                                                             |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `enabled`               | `false`                          | Kigeuza kikuu — lockout ya modeli **imezimwa kwa chaguo-msingi**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Hali za juu zinazohesabiwa kama hitilafu yenye wigo wa modeli.    |
| `baseCooldownMs`        | `120_000` (120 s)                | Muda wa awali wa lockout kwa hitilafu ya kwanza.                  |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Kikomo cha cooldown iliyoongezwa.                                 |
| `maxBackoffSteps`       | `10`                             | Idadi ya juu ya hatua za kuongeza kwa exponential-backoff.        |
| `useExponentialBackoff` | `true`                           | Ikiwa hitilafu zinazorudiwa ziongeze cooldown kwa eksponensheli.  |

Mipangilio huhifadhiwa kupitia store ya kawaida ya mipangilio na kuthibitishwa kupitia
schema ya mipangilio ya resilience; kadi hupunguza `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs`) pamoja na `maxBackoffSteps` hadi viwango vinavyoruhusiwa.

**Urejeshaji wa success-decay:** urejeshaji **hautokani tu na kuisha kwa timer**. Jibu lenye afya
hupunguza idadi ya hitilafu ya modeli hatua kwa hatua ili modeli iliyopona
katikati ya muda wa lockout iache kuongeza lockout (na kuifuta) kabla timer yake haijaisha.
Kwenye target ya combo iliyofanikiwa, `open-sse/services/combo.ts` huita `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), ambayo **hugawanya kwa nusu** iliyohifadhiwa
`failureCount` (`Math.floor(failureCount / 2)`); inapofikia `0`, ingizo la lockout hufutwa
kabisa. Kinyume chake, `recordModelLockoutFailure()` huongeza idadi (na kuongeza cooldown)
kwenye hitilafu zinazotokea ndani ya dirisha la kuongeza. Urejeshaji huu wa success-decay
unaongezwa juu ya kuisha kwa timer ya kawaida — njia yoyote kati ya hizo inaweza kuwezesha tena modeli.

**Hali:** vizuizi vinashikiliwa **katika kumbukumbu** (kwa kila mchakato, `Map`s za
`ModelLockoutEntry` zenye funguo za `provider:connectionId:model`, na kufuli za upeo kamili zenye
`provider:connectionId:exact:model`), havihifadhiwi kwenye
DB — hupotea programu inapowashwa upya. _Mipangilio_ huhifadhiwa; _hali_ ya kizuizi inayotumika ni ya muda.

---

## 4. Udhibiti wa Kiasi wa Kushiriki Fedha (v3.8.36)

Akaunti za usajili (GLM, MiniMax, nk.) mara nyingi hukubali maombi ya wakati mmoja ~ 1–3 pekee; kuzidi hiyo husababisha 429s na baridi. Hii ni papo hapo chini **sehemu ya upendeleo** (`qtSd/…`) mchanganyiko, ambapo funguo kadhaa za API hushiriki akaunti moja ya juu. Tabaka tatu huzuia akaunti iliyoshirikiwa isijaribiwe.

### Kikomo cha sarafu ya kila muunganisho (`max_concurrent`)

Kila uunganisho wa mtoa huduma unaweza kutangaza dari ya `max_concurrent` (`provider_connections.max_concurrent`, iliyowekwa katika modal ya uunganisho / API / DB). Iache tupu bila kikomo. Hiki ni kifundo kimoja ambacho huendesha safu ya ufuataji chini ya — kuiweka kwa upatanifu halisi wa akaunti (km GLM ~ 1, MiniMax ~ 2).

### Kofia za upatanishi za kila mfano (`modelConcurrency`)

Muunganisho unaweza pia kutangaza dari halisi za upatanisho wa kila mfano ndani ya ramani yake `rateLimitOverrides` :

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Iweke katika moduli ya unganisho (**Kiwango cha juu cha ada kinabatilisha vikomo vya sarafu → Per-model** , `model=cap` moja kwa kila mstari) au kupitia `PATCH /api/providers/[id]` yenye umbo sawa JSON. Semantiki muhimu:

- **Muunganisho mpana dhidi ya muundo mahususi:** `maxConcurrent` inabaki kuwa dari iliyoshirikiwa ya unganisho-pana. Wakati zote mbili zinatumika, milango yote miwili hupatikana kwa atomi katika lango moja la mchanganyiko (`global → provider → account → model`); tabia ya ufanisi ni kikomo kinachotumika zaidi.
- **Ulinganisho kamili wa ufunguo wa mfano:** ufunguo ni mfuatano wa mfuatano unaopitishwa kwa mtekelezaji baada ya azimio la kuelekeza — kwa kawaida kitambulisho cha mfano wa juu wa mto (`glm-5`), si lakabu la `provider/model` la upande wa mteja (`zai/glm-5` hailingani na `glm-5`). Thamani ni dari chanya-jumla-ya ombi kwa wakati mmoja.
- **Kupanga foleni ndani, hakuna ugunduzi:** ombi la ziada hupanga foleni ndani ya nchi na semantiki zilizopo queue/timeout (hitilafu za uandikishaji `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` zilizoandikwa). OmniRoute haigundui au kukisia sera ya juu ya mkondo — inatekeleza viwango kamili ambavyo mwendeshaji aliweka. Lango la modeli iliyojaa kamwe halizima mtoa huduma na kamwe haliundi mtindo wa kufuli wa kudumu; tabia ya juu 429/cooldown/fallback inasalia kuwa kizuizi cha makosa.
- **Kwa muunganisho, wigo wa kila mchakato:** kofia ni kwa muunganisho wa hifadhidata na huhifadhiwa kwenye kumbukumbu, kwa hivyo miunganisho miwili inayotumia tena ufunguo sawa API wa juu haushirikiani.
- **Haijasanidiwa inamaanisha kuwa haijabadilishwa:** kuacha ramani (au kuacha uga wa dashibodi wazi) hakuongezi lango la mfano. Usanidi wa mfano bila kusisitiza kikomo chochote cha mtoaji:

```text
glm-5=1
glm-4.7=3
```

### Urekebishaji wa ombi la kushiriki kiasi

Wakati utumaji wa sehemu ya upendeleo unalenga muunganisho unaotangaza `max_concurrent` chanya, maombi ya wakati mmoja kwa hiyo.**akaunti** husasishwa kupitia semaphore ya kila muunganisho ( `qsconn:<connectionId>` muhimu ): maombi ya ziada **subiri kwenye foleni** badala ya kujaza akaunti. Ni **kushindwa-wazi** — foleni iliyojaa au muda wa kuisha huendelea bila nafasi badala ya kukataa ombi linaloweza kutumwa. Washa **Mipangilio Uthabiti wa → → Kiasi cha kushiriki kwa kila muunganisho wa sarafu** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, chaguomsingi imewashwa). Bila kofia ya `max_concurrent` tabia haibadilika.

> Lango la uelekezaji wa sehemu ya upendeleo (`selectQuotaShareTarget`, DRR + P2C) lenyewe halijafunguliwa na _inanyima kipaumbele tu muunganisho wa kiwango cha juu — na bwawa la muunganisho mmoja hauwezi kuweka kikomo, kwa hivyo semaphore hii ndiyo hasa inayo mafuriko.

### Combo cooldown-aware jaribu tena

Kwa kila mkakati wa mseto (ikiwashwa), ombi ambalo linaweza kung'arisha 429 kwa ubaridishaji wa muda mfupi SHORT huingoja na kutuma tena badala ya kurudisha 429 — hii inashughulikia madirisha TPM/RPM ya daraja la Gemini (~ 60s jaribu tena baada ya) kwenye michanganyiko ya miundo mingi, kwa mfano kuweka viwango vya modeli 2 za kikomo cha modeli. Imepakana na `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) katika **Mipangilio Ustahimilivu →** . Haisubiri kamwe kwa `quota_exhausted` (imefungwa hadi usiku wa manane) au sababu za auth/not-found. `comboTimeoutMs` ikiwa imewekwa, kungoja ambayo haiwezi kumaliza kabla ya tarehe ya mwisho haijaanza (#18998): mchanganyiko hujibu mara moja na majibu yake ya mwisho badala ya `COMBO_TIMEOUT` 504.

Mchanganyiko unaweza kuchagua kutoka kwa `config.comboCooldownWaitEnabled: false`. `false` halisi pekee ndiyo huzima kusubiri kwa michanganyiko hii iliyoshirikiwa (kupunguza sauti baada ya kutuma na kusubiri kutuma kabla ya circuit-open/model-lock ) na upanuzi wa sakafu ya muda wa kuisha kwa bajeti. Inakosekana au `true` inahifadhi sera ya kimataifa; `true` haiwezi kuwezesha kusubiri kwa walemavu duniani kote. `targetTimeoutMs` ya wazi bado inashinda. Chaguo hili la kutoka halibadilishi tofauti ya kusubiri ya kutuma kabla ya kutuma ya asili-Codex.

Lango lile lile linashughulikia kesi ya kutuma kabla (#16319): wakati kila lengo la mseto linarukwa kabla ya jaribio lolote kufanywa kwa sababu kielelezo chake kinakaa katika kufungia nje kwa muda mfupi, njia ya kujaribu sifuri inasubiri kufuli chini ya dari zile zile na kutuma tena, badala ya kujibu `503 ALL_TARGETS_SKIPPED` isiyo na dokezo. Wakati hakuna kusubiri kunaruhusiwa (dari, jaribio au bajeti imekamilika, au kipengele kimezimwa), majibu ya mwisho yanaboresha hadi `429 rate_limit_error` kubeba `retry_after` / `reset_at` kutoka kwa kuisha kwa kufuli kwa muda mfupi; kiasi, auth na kufuli zisizopatikana huweka dokezo-chini ya 503.

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

## 7. Urudiaji wa Hali ya Upstream (makosa ya quota yaliyoonyeshwa vibaya)

**Wigo:** gateway moja ya upstream inayoripoti kuishiwa kwa quota kwa muda kwa kutumia hali isiyo sahihi ya HTTP.

**Madhumuni:** kusahihisha hali inayopotosha KABLA ya uainishaji, ili watumiaji wa chini (injini ya fallback, ujumlishaji wa combo, jibu linaloelekezwa kwa mteja) waone hali halisi ya hitilafu inayoweza kujaribiwa tena.

Baadhi ya gateway huashiria kuishiwa kwa quota kwa MUDA kwa kutumia hali ya HTTP
isiyoweza kujaribiwa tena. `agentrouter.org` hurudisha `403` (wakati mwingine `400`) pamoja na mwili wa Kichina
(`用户额度不足` / `额度不足`) badala ya `429` ya kawaida. Wateja kama Claude
Code huchukulia `403` kuwa ya kudumu na hukatisha session, na bila marekebisho
injini ya fallback ingeainisha hali hiyo kama `AUTH_ERROR` badala ya tukio la quota.

**Utekelezaji:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — orodha ya sheria kwa kila provider (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`), inayolinganishwa kupitia `applyStatusRestatement()`.
- Mahali pa kuita: sehemu ya `providerFailure:` katika `open-sse/handlers/chatCore.ts`
  (karibu na mstari wa 3654), mara tu baada ya `parseUpstreamError()` kuchanganua
  jibu la upstream lenye hali ya HTTP ya hitilafu (`!providerResponse.ok`), na kabla ya
  uainishaji wowote kuanza, ili kila mtumiaji wa chini aone hali iliyosahihishwa. Hitilafu
  zilizopachikwa ndani ya stream ya SSE ya `200` hufuata njia tofauti ya baadaye ya
  uchanganuzi wa stream na **hazijumuishwi** na hook hii kwa sasa — ni kizuizi kinachojulikana,
  ambacho bado hakihitajiki kwa misstatus ya agentrouter (ambayo hujitokeza kama hali ya HTTP
  ya hitilafu).
- Ustahiki wa kujaribiwa tena: `429` iko katika `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), kwa hiyo hitilafu iliyorudiwa hali
  hubeba muda halisi wa kujaribiwa tena badala ya kujitokeza kama `403` iliyokufa.
- `defaultRetryAfterMs` ya kubuniwa ya `60s` (`upstreamStatusRestatement.ts`)
  ndiyo tu ambayo jibu lililowekewa hali mpya humwambia **mteja**; si muda wa ndani wa
  kupoa/kufungia muunganisho wenyewe — muda huo unasimamiwa tofauti na utaratibu wowote
  unaoshughulikia hitilafu iliyowekewa hali mpya (Connection Cooldown yenye backoff
  inayoongezeka, §2, msingi wa `3s` kwa provider za API-key; au Model Lockout, §3, kwa
  provider za quota kwa kila modeli kama agentrouter). Router inaweza kustahiki kujaribu tena
  ndani mapema kuliko dirisha la sekunde 60 inalojitangaza kwa mteja — ni nafasi ya makusudi,
  si hitilafu.

Hitilafu za kudumu (agentrouter's `无权访问模型` — hakuna ruhusa ya kufikia modeli hii)
HAZIWEKEWI KAMWE hali mpya: `excludeMarkers` hubatilisha sheria hata wakati `textMarkers`
zimepatikana, kwa hiyo hitilafu huhifadhi hali yake ya awali na hakuna kitakachoi­jaribu
tena milele. Sheria ya uainishaji wa provider inayolingana
(`agentrouter-model-access-denied` katika `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown ya msingi iliyotangazwa ya `6h`) hutumiwa
na `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_kabla_ ya kurudi mapema kwa `FORBIDDEN` ya jumla ya kategoria ya apikey, ikiwa
`honorsRuleLockScope(provider)` (#10334 — kwa sasa ni ya agentrouter pekee kupitia allowlist ya
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` katika
`providerErrorRules.ts`). Cooldown ya 6h iliyotangazwa na sheria hupita kama
`fallbackResult.baseCooldownMs`, lakini bado huingizwa katika njia iliyokuwepo ya kufunga
modeli kwa kila quota ya modeli (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ambayo haikubadilishwa na #10334 isipokuwa chanzo cha cooldown):
hupunguzwa hadi `mlSettings.maxCooldownMs` ya operator
(default `1_800_000ms` / 30min), kama ilivyo kwa kila kufungwa kwingine kwa modeli, na
_sababu ya kufungwa iliyohifadhiwa_ hubaki kuwa `"forbidden"` iliyowekwa kwa msimbo,
si `"auth_error"` ya sheria — ni muda wa cooldown pekee unaoheshimiwa kutoka mwanzo hadi mwisho,
si mfuatano wa sababu. Muunganisho wenyewe hubaki hai;
modeli rika kwenye muunganisho huo haziathiriki.

Hitilafu za quota zilizowekewa hali mpya (`额度不足`) hufikia sheria ya provider katika mazingira ya uzalishaji
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bila cooldown yake iliyotangazwa — backoff chaguo-msingi iliyopimwa ya
tabaka la persistence hutumika). Tangu #10334, `scope` katika
`ProviderErrorRuleMatch` INATUMIKA kutoka mwanzo hadi mwisho, lakini **tu** kwa provider
zilizo katika allowlist ya `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
leo ni `"agentrouter"` pekee, ikidhibitiwa kupitia `honorsRuleLockScope()`). Kwa kila
provider mwingine `scope` hubaki ya kutoa taarifa, kama ilivyokuwa kabla ya #10334.
`checkFallbackError` huwasilisha scope ya sheria iliyolingana kama
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ndiyo guard ya pamoja inayothibitisha kuwa
`ruleScope` ni salama kwa kweli kuheshimiwa kama ishara ya kiwango cha muunganisho
inayojirekebisha, (scope `"connection"`, reason `quota_exhausted`, kamwe si
`permanent`, kamwe si `creditsExhausted` — kinga dhidi ya sheria ya baadaye
inayooanisha scope `"connection"` na hali ya kudumu ya akaunti). Watumiaji wawili huiita:

- **Uendelezaji wa hali** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  badala ya kuingia kwenye tawi la kufungia nje la mtoa huduma wa passthrough **kwa kila modeli** (agentrouter ni `passthroughModels: true` → `hasPerModelQuota()` hurudisha `true`), inaweka **kipindi cha muda cha kupooza muunganisho** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, kamwe si hali ya mwisho
  (`credits_exhausted`/`banned`/`expired`) — hivyo muunganisho hujirejesha baada ya kipindi cha kupoa kuisha badala ya kuhitaji uwekaji upya wa kitambulisho kwa mkono.
  Hairuhusiwi kwa miunganisho yenye `disableCooling: true` (#2997): kujiondoa huko
  huangukia kwenye kufungia nje kwa kila modeli badala yake (ni maelewano yaliyoandikwa —
  tazama maoni ya msimbo yaliyo juu ya tawi hilo).
- **Uelekezaji wa mchanganyiko ndani ya ombi lilelile** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ulinzi huo huo huweka
  muunganisho kwenye seti ya kumbukumbu ya muda `exhaustedConnections`, yenye ufunguo
  `${provider}:${connectionId}`. Hii huruka tu lengwa lililosalia la SAME-REQUEST ambalo _lenyewe tayari lina `connectionId` hiyo halisi_ kwenye kitu chake cha target
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` kabla ya utafutaji wa `exhaustedConnections`) — mchanganyiko wa kawaida wa orodha ya modeli, ambapo malengwa ndugu hayana `connectionId` iliyobandikwa kwenye kitu chao cha target na moja hutatuliwa tu kwa kila dispatch kutoka kwenye kichwa cha jibu cha `X-OmniRoute-Selected-Connection-Id`, kamwe haufikii ulinganifu huo wa ufunguo. Kwa hali hiyo ya kawaida, ulinzi halisi dhidi ya hatua iliyosalia kutumia tena akaunti iliyomalizika muda huo SI hii Set — ni safu ya uendelezaji wa hali iliyo hapo juu (yaani `rateLimitedUntil` ya muunganisho sasa iko wakati ujao) pamoja na ulinzi huu huo kukandamiza `transientRateLimitedProviders` kwa hitilafu hiyo (tazama "Muundo wa hatua mbili" na maoni ya msimbo kwenye tawi la
  `isAgentrouterConnectionQuotaScope` katika `targetExhaustion.ts`): Set hiyo ikiwa haijawekwa alama, `allowRateLimitedConnection` ya kulazimisha kuruhusu katika `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) HAITAANZA kufanya kazi kwa malengwa yaliyosalia ya mtoa huduma, hivyo kichujio cha uteuzi wa kitambulisho cha kuingia cha `rateLimitedUntil`
  (`src/sse/services/auth.ts:1238`) hutekelezwa kawaida na hatua iliyosalia huchagua ama muunganisho mwingine wa agentrouter ambao bado unastahiki au hushindwa kwa kutopatikana kwa vitambulisho — hailazimishi njia yake kurudi kwenye muunganisho ambao tawi hili limeupooza hivi punde.

### Muundo wa hatua mbili: kurudia hali, kisha kuainisha

Kurudia hali (`upstreamStatusRestatement.ts`) na kanuni za uainishaji wa mtoa huduma (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ni sajili tofauti ambazo zote hutumia kitambulisho cha mtoa huduma na alama za maandishi kama funguo, lakini huendeshwa katika maeneo tofauti na hutumikia madhumuni tofauti: kurudia hali huandika upya hali ya HTTP mapema katika `chatCore.ts`;
kanuni za uainishaji huchagua `reason` ya akiba na kufunga `scope`
(`model` / `provider` / `connection`) ndani ya `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Kanuni za uainishaji huona tu **maandishi** kamili ya hitilafu (yanayohitajika kulinganisha alama za mwili kama `额度不足`) kwa watoa huduma walioorodheshwa kwenye orodha ya kuruhusu `FULL_TEXT_RULE_PROVIDERS` katika `providerErrorRules.ts` — kwa sasa ni `"agentrouter"` pekee. Kwa kila mtoa huduma mwingine wa **katalogi iliyojengwa ndani**, `checkFallbackError` hupitisha kwa `getProviderErrorRuleMatch` tu hitilafu iliyoundwa (`{code, type}`), ambayo inatosha kwa kanuni zinazotegemea kichwa/hali/msimbo lakini haiwezi kuona alama za maandishi ya mwili. Kisaidizi `resolveRuleMatchBody()` hufanya uteuzi huu: maandishi kamili ya hitilafu kwa watoa huduma walio kwenye orodha ya kuruhusu, na hitilafu iliyoundwa vinginevyo. Kuongeza mtoa huduma **aliyejengwa ndani** kwenye `FULL_TEXT_RULE_PROVIDERS` ni kujijumuisha kwa makusudi kwa kila mtoa huduma — ipo ili njia chaguomsingi kwa kila mtoa huduma ambaye hayuko kwenye orodha ibaki bila mabadiliko hata kidogo.

`scope` ya kanuni (`model` / `provider` / `connection`) ni kujijumuisha tofauti na `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` huionyesha tu kama `fallbackResult.ruleScope`, na watumiaji wa chini huiheshimu kama kitu kingine zaidi ya lebo ya taarifa kwa watoa huduma walio kwenye orodha ya kuruhusu `HONORS_RULE_LOCK_SCOPE_PROVIDERS` katika faili hilo hilo (ikidhibitiwa kupitia `honorsRuleLockScope()` — leo ni `"agentrouter"` pekee). Tazama "Hitilafu za mgawo zilizorudiwa" hapo juu kwa maelezo ya kile ambacho ulinganifu wa `scope: "connection"` hufanya baada ya mtoa huduma kuwekwa kwenye orodha hiyo ya kuruhusu.

**#11104 — kanuni zilizotangazwa na mwendeshaji hupita orodha zote mbili za kuruhusu.** Mwendeshaji anaweza kutangaza kanuni ya kila mtoa huduma wakati wa utekelezaji kupitia `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
bila kuhariri faili hili. Kuweka kanuni ya mwendeshaji chini ya `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — orodha zilizokusudiwa kulinda tabia **chaguomsingi** ya kanuni za katalogi iliyojengwa ndani — kungefanya utaratibu wa mipangilio usifanye kazi kwa kila mtoa huduma isipokuwa wale ambao tayari wameorodheshwa humo, kwa kuwa kutangaza kanuni tayari ni kujijumuisha kwa makusudi kwa mwendeshaji. `resolveRuleMatchBody()` na `honorsRuleLockScope()` zote hukagua `hasOperatorRuleForProvider()` kwanza: mtoa huduma aliye na kanuni ya mwendeshaji hupata maandishi ghafi ya hitilafu na `scope` yake iliyotangazwa huheshimiwa, bila kujali kama pia anaonekana kwenye orodha yoyote kati ya hizo mbili za kuruhusu.

**Kanuni zilizotangazwa na mwendeshaji** (`OperatorProviderErrorRule`): kila kanuni ina `status` ya hiari na `match` ya hiari (sehemu ndogo ya maandishi ya hitilafu inayolinganishwa bila kujali herufi kubwa au ndogo, kamwe si RegExp, hivyo haiwezi kusababisha ReDoS), na lazima iweke angalau kimoja kati ya hivyo viwili. Vyote viwili vikiwekwa, vinaunganishwa kwa AND; sehemu iliyoachwa haipo hulingana na chochote, hivyo `{match: "insufficient_quota"}` hulingana na hali yoyote iliyo na msimbo huo. Kanuni ya kwanza inayolingana ndiyo hushinda. `cooldownMs` inakubali hadi siku 30; jumla ya kanuni zisizozidi 50.

**Chaguo-msingi za kukamata-yote** (`settings.providerErrorDefaults`, huwashwa kwa hiari, huwekwa kupitia
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
pamoja na `cooldownMs` kutoka dakika 1 hadi siku 30. Chaguo-msingi hutumika tu
wakati hakuna kanuni ya operator wala kanuni ya katalogi iliyojengwa ndani inayolingana, na
hutumika tu kwa hitilafu za 402, 403, 408, 429 na 5xx. Hitilafu za muundo wa ombi
(400, 404, 409, 413, 422) na 401 zisizo na maelezo ya ziada huendelea kutumia
ushughulikiaji wao wenyewe. Bila `reason` iliyoainishwa, sababu hutokana na
hali hiyo, kwa njia ileile ambayo `classifyError` hufanya. Kutangaza chaguo-msingi
huhesabiwa kama kanuni ya operator kwa `hasOperatorRuleForProvider()`, hivyo
`scope` yake (chaguo-msingi ni `"connection"`) inazingatiwa. Muda halisi wa kusubiri
wa chaguo-msingi ni mrefu zaidi kati ya `cooldownMs` yake na kidokezo cha mtoa huduma
cha kujaribu tena (`Retry-After`, `x-ratelimit-reset` au kidokezo cha kuweka upya
ndani ya mwili, kidokezo kilekile ambacho injini huzingatia wakati mpangilio wa
connection-cooldown "use upstream retry hints" umewashwa), kwa hiyo chaguo-msingi
kinaweza kurefusha kidokezo kifupi cha upstream lakini hakiwezi kufupisha uwekaji upya
halisi. Kanuni ya operator iliyo wazi huhifadhi `cooldownMs` yake kamili. Si kanuni
wala chaguo-msingi kinachokiuka walinzi wa connection-cooldown katika
`markAccountUnavailable`: cooldown inayotumika na iliyo ndefu zaidi haifupishwi
kamwe, na hali ya mwisho haiandikwi juu yake kamwe. Vigunduzi vya maandishi
vilivyojengwa ndani vinavyoendeshwa mapema katika `checkFallbackError` (credits
zimekwisha, quota ya kila siku, akaunti imezimwa) bado hutangulizwa kwa vifungu
vyao husika.

**Pengo linalojulikana — `providerRuleRegistry` haishauriwi kamwe kwa HTTP 400.**
Tawi la `BAD_REQUEST` la `checkFallbackError` huainisha hali 400 kikamilifu
kupitia safu zake za mifumo (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, n.k. katika `accountFallback.ts`) na hurudi kabla
ya kufikiwa kwa tawi la `configuredRule`/`getProviderErrorRuleMatch` lililo juu
yake. Kanuni ya katalogi iliyojengwa ndani (au kanuni ya operator) yenye
`status: 400` ni halali kisintaksia lakini haitawahi kutumika. Hakuna kanuni
iliyopo inayolenga 400 kwa sasa, kwa hiyo hakuna kinachoathiriwa katika uzalishaji
— lakini kanuni ya baadaye ya 400 itahitaji tawi hili kuguswa kwanza, jambo ambalo
ni mabadiliko makubwa kuliko kuongeza kanuni (hubadilisha uainishaji wa 400 kwa
kila mtoa huduma ambaye tayari anategemea tabia ya safu za mifumo) na liko nje ya
wigo wa kuongeza kanuni ya mtoa huduma mmoja.

### Kuongeza gateway mpya inayowasilisha quota visivyo

1. Sajili safu moja ya kanuni katika `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Weka `textMarkers`
   mahususi kwa mtoa huduma; usitumie tena vifungu vya jumla vya Kiingereza
   vinavyogongana na `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Kwa hiari sajili kanuni za uainishaji katika
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ili kuchagua
   wigo sahihi wa kufunga (`connection` kwa quota ya akaunti nzima, `model` kwa
   hitilafu za kila modeli). Hatua hii huanza kutumika katika uzalishaji tu kwa
   watoa huduma ambao kanuni zao zinahitaji maandishi kamili ya hitilafu
   (alama za mwili): ongeza kitambulisho cha mtoa huduma katika
   `FULL_TEXT_RULE_PROVIDERS` katika faili hilohilo — vinginevyo
   `checkFallbackError` huipa kanuni tu hitilafu iliyoundwa ya
   `{code, type}` na kanuni ya maandishi ya mwili haitalingana kamwe na trafiki
   halisi. Kanuni zinazolingana kwa `status`/`headers` pekee (kama za Opencode au
   Minimax) hazihitaji kuwashwa huku. Tofauti na hilo, ikiwa kanuni inaainisha
   `scope: "connection"` na lengo ni cooldown halisi ya connection nzima pamoja na
   kuruka mchanganyiko wa ombi hilo hilo (si lebo ya taarifa tu), ongeza kitambulisho
   cha mtoa huduma katika `HONORS_RULE_LOCK_SCOPE_PROVIDERS` katika faili hilohilo —
   hiki ndicho kinachodhibiti matumizi ya mtindo wa
   `isAgentrouterConnectionQuotaScope()` katika `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) na `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bila hicho, `scope`
   bado hupitishwa kupitia `fallbackResult.ruleScope` lakini hakuna kinachoitumia.
3. Ongeza majaribio ya unit yanayoiga
   `tests/unit/upstream-status-restatement.test.ts`
   na `tests/unit/agentrouter-error-rules.test.ts` (yakiwemo walinzi wa
   not-permanent / not-creditsExhausted, na — ikiwa mtoa huduma anahitaji
   orodha ya kuruhusu — jaribio linalothibitisha kuwa
   `resolveRuleMatchBody()` hurudisha maandishi kamili kwa mtoa huduma huyo pekee).

Hakuna mabadiliko yanayohitajika katika `chatCore.ts`, `classifyError`, au combo.

#### Kufunga kwa makundi ya egress (#10880)

Watoa huduma walio katika `EGRESS_BUCKETED_LOCK_PROVIDERS` (familia ya
opencode) huchukuliwa kuwa upstream iliyopangwa kwa makundi ya IP (ngazi ya
opencode ya bure imepangwa kwa IP, si kwa akaunti — angalia #9611): hali ya 429
iliyoainishwa kama `quota_exhausted` **au** `rate_limit_exceeded` huweka cooldown
kwa kila connection ya familia iliyoruhusiwa ambayo IP yake ya mwisho inayojulikana
ya egress inalingana na ile ya connection iliyoshindwa, kabla ya mzunguko kujaribu
hizo
— hivyo kuepuka miito ya upstream N-1 ambayo imehakikishwa kushindwa (muundo sawa
na #10460/#10525). `rate_limit_exceeded` imejumuishwa kimakusudi: katika njia ya
`markAccountUnavailable`, kanuni mahususi za opencode hazilingani kamwe (hakuna
headers/body inayokabidhiwa kwa `checkFallbackError`, opencode haipo katika
`FULL_TEXT_RULE_PROVIDERS`), kwa hiyo 429 ambayo mwili wake una maandishi ya quota
ya usajili ("monthly usage limit reached") huainishwa kama `quota_exhausted` na
fallback ya maandishi ya quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown ya saa 1) kabla
ya kufikiwa kwa kanuni ya `status_429` — ilhali 429 isiyo na maandishi ya quota
(kupunguza kasi kwa kawaida) huainishwa kupitia kanuni ya `status_429` kama
`rate_limit_exceeded` na bado huweka cooldown kwa familia ya IP. Kwa mtoa huduma
aliyeruhusiwa, kikomo cha kasi kilichopangwa kwa IP ni ishara sawa na quota
iliyoisha. Vizuizi vya kweli:

- **Jitihada bora**: lock hutatua `egress_ip` ya mwisho inayojulikana ya connection
  kutoka `proxy_logs` (dirisha la 24h, kwa usawazishaji, bila kashe). Kashe ikiwa tupu
  (`egress_ip` haijawahi kuchunguzwa) au hakuna safu → connection inayoshindikana bado
  hupozwa na branch (hurekodiwa kama leo), ni kwamba sibling pekee ndiye hafungiwi.
- **Kamwe si ya kudumu**: cooldown ni dirisha la quota linalohuishwa upya
  (`testStatus: "unavailable"`); hali ya kudumu haitolewi kamwe kutokana na ishara ya kiwango cha IP. Connections za `disableCooling`
  huruka branch kabisa.
- **Kiwango cha lock hubadilika kwa familia iliyo kwenye allowlist**: huu ni mabadiliko ya scope, si uboreshaji wa sibling pekee. opencode ni provider wa `passthroughModels`, kwa hiyo kabla ya branch hii 429 ilisababisha kufungwa kwa kiwango cha MODEL; sasa husababisha cooldown ya connection — ikiwemo kwa operator anayeendesha connection moja bila sibling kabisa. Hiki ndicho kiwango ambacho jedwali la sheria la opencode tayari linatangaza kuwa sahihi (`scope: "connection"`,
  `providerErrorRules.ts`), lakini hakijawahi kuheshimiwa kwa sababu opencode haipo kwenye `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Branch huandika yenyewe cooldown ya connection inayoshindikana pamoja na `backoffLevel`, ikiiga branch ya agentrouter yenye scope ya connection, kisha hurudi — block ya kila model na njia ya jumla iliyo hapa chini hazifikiwi kamwe.
- **Combo imejumuishwa**: kama branch ya agentrouter, scope inapuuza kwa makusudi kushushwa kwa `persistUnavailableState`/`isCombo` ambako caller wa combo hutumia kwa 429. Kufungwa kwa kila model si aina dhaifu ya scope hii; ni kipimo kisicho sahihi: hakisemi chochote kuhusu IP iliyokwisha quota, kwa hiyo mzunguko wa combo ungeendelea kutumia call moja iliyohakikishwa kushindikana kwa kila sibling.
- **Usalama wa sibling**: sibling ambayo tayari iko katika hali ya kudumu (banned/credits_exhausted) au tayari iko kwenye cooldown ndefu zaidi haibadilishwi kamwe.
- **Allowlist ya kipekee**: kupanua `EGRESS_BUCKETED_LOCK_PROVIDERS` ni uamuzi wa wazi wa owner; hakuna wiring ya jumla (pattern #10334/#10419). Query ya sibling hufunga allowlist hiyo hiyo badala ya kuirudia kama SQL literal, kwa hiyo kuipanua hubaki mabadiliko ya mstari mmoja.
- **Mzunguko wa Egress IP, pande zote mbili**: dirisha la lookup (24h) ni pana zaidi kuliko TTL ya kashe ya egress-IP (dakika 5), kwa hiyo “IP ya mwisho inayojulikana” ni historia, si hali ya sasa. Ikiwa proxy ya connection ilizunguka ndani ya dirisha hilo, lock inaweza **kukosa** IP iliyoshirikiwa kwa kweli (IP iliyorekodiwa ni mpya na haijaisha quota) — na kwa ulinganifu inaweza **kupooza sibling ambayo tangu wakati huo imezunguka na kuondoka** kwenye IP iliyoisha quota. Hali ya pili hugharimu sibling hiyo dirisha moja la cooldown; zote mbili zinakubalika kama mipaka ya jitihada bora ya lookup inayotegemea historia.
- **Gharama**: scans mbili zenye mipaka za `proxy_logs` (zilizochujwa kwa dirisha kupitia `idx_pl_timestamp`), tu wakati wa 429. Hakuna index mpya (migration 134
  YAGNI). Imepimwa kwenye nakala ya DB yenye trafiki halisi ya ukubwa wa wastani; instance yenye throughput kubwa huhifadhi kwa uwiano rows nyingi zaidi katika dirisha hilohilo.

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
