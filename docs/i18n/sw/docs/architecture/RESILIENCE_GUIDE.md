# Resilience Guide (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ina mbinu tatu tofauti lakini zinazohusiana za ustahimilivu. Kila moja ina upeo na madhumuni tofauti. Zitenganishe wakati wa kutatua hitilafu za tabia ya uelekezaji.

![Muundo wa ustahimilivu wa tabaka 3](../diagrams/exported/resilience-3layers.svg)

> Chanzo: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Kikatiza Mzunguko cha Mtoa Huduma

**Upeo:** mtoa huduma mzima (k.m., `glm`, `openai`, `anthropic`).

**Madhumuni:** kuacha kutuma trafiki kwa mtoa huduma ambaye anashindwa mara kwa mara katika kiwango cha mfumo wa juu/huduma.

**Utekelezaji:**

- Darasa kuu: `src/shared/utils/circuitBreaker.ts`
- Muunganisho: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API ya hali: `GET /api/monitoring/health`
- API ya kuweka upya: `POST /api/resilience/reset`
- Vifungashio: `open-sse/services/accountFallback.ts`
- Jedwali la DB: `domain_circuit_breakers`

**Hali:**

- `CLOSED` — trafiki ya kawaida inaruhusiwa
- `DEGRADED` — trafiki bado inaruhusiwa, lakini ongezeko la hitilafu za mtoa huduma linafuatiliwa
- `OPEN` — mtoa huduma amezuiwa kwa muda; uelekezaji wa mchanganyiko unamruka
- `HALF_OPEN` — muda wa kusubiri kabla ya kuweka upya umekwisha; ombi la majaribio linaruhusiwa

**Chaguo-msingi zinazoweza kusanidiwa (`open-sse/config/constants.ts`, zinaonyeshwa katika Dashibodi → Mipangilio → Ustahimilivu):**

| Darasa         | Hushuka hadhi baada ya | Hufunguka baada ya | Muda wa kusubiri wa kuweka upya |
| -------------- | ---------------------- | ------------------ | ------------------------------- |
| OAuth          | hitilafu 5             | hitilafu 8         | 60s                             |
| Ufunguo wa API | hitilafu 7             | hitilafu 12        | 30s                             |
| Ya ndani       | huhesabiwa             | hitilafu 2         | 15s                             |

`degradationThreshold` hudhibiti wakati mtoa huduma anaingia katika hali ya `DEGRADED`; `failureThreshold` hudhibiti wakati anafunguka na kurukwa. Wasifu wa watoa huduma wa ndani bado hauonyeshwi kwenye ukurasa wa mipangilio ya Ustahimilivu.

**Misimbo ya kuamsha:** hali za kiwango cha mtoa huduma `[408, 500, 502, 503, 504]` pekee. USIAMSHI kwa hitilafu za kiwango cha akaunti (nyingi za 401/403/429 — hizo hushughulikiwa na kipindi cha kusubiri au kufungiwa).

**Urejeshaji wa wakati unapohitajika:** muda wa `OPEN` unapoisha, `getStatus()`, `canExecute()`, `getRetryAfterMs()` husasisha hali kuwa `HALF_OPEN`. Kipima muda cha chinichini hakihitajiki.

---

### Kipindi cha Kusubiri cha Mtoa Huduma cha kimataifa kinachowashwa kwa hiari (kizuizi cha dirisha)

Tabaka la nne, **linalowashwa kwa hiari** (`PROVIDER_COOLDOWN_ENABLED`, chaguo-msingi ni **kuzima**) huhifadhi
kumbukumbu inayovuka maombi ya watoa huduma wanaoshindwa katika
`open-sse/services/providerCooldownTracker.ts`, ambayo hutumiwa wakati wa kubaini walengwa wa mchanganyiko
ili maombi ya mchanganyiko yanayofuatana yaache kumpitia tena mtoa huduma ambaye ametoka
kushindwa. Maingizo ya kiwango cha mtoa huduma hutii kizuizi cha dirisha cha `PROVIDER_PROFILES`:

| Wasifu         | huwashwa baada ya (`providerFailureThreshold`) | ndani ya (`providerFailureWindowMs`) | hupoa kwa (`providerCooldownMs`) |
| -------------- | ---------------------------------------------: | -----------------------------------: | -------------------------------: |
| OAuth          |                                           `10` |                              `15min` |                           `5min` |
| Ufunguo wa API |                                           `15` |                              `30min` |                          `10min` |

Chini ya kiwango hicho, mtoa huduma **hatachukuliwi** kuwa katika kipindi cha kusubiri; mafanikio huondoa
dirisha. Badala yake, maingizo ya kiwango cha muunganisho (`provider:connectionId`) huhifadhi
ucheleweshaji unaoongezeka wa `minRetryCooldownMs → maxRetryCooldownMs`. Mabadiliko maalum:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Kinga dhidi ya kurudi kwa hitilafu: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Kipindi cha Kusubiri cha Muunganisho

**Upeo:** muunganisho/akaunti/ufunguo mmoja wa mtoa huduma.

**Madhumuni:** kuruka ufunguo mmoja wenye hitilafu huku miunganisho mingine ya mtoa huduma huyo ikiendelea kuhudumia.

**Utekelezaji:**

- Weka kama usiopatikana: `src/sse/services/auth.ts::markAccountUnavailable()`
- Uteuzi: `getProviderCredentials*` katika faili hiyo hiyo
- Ukokotoaji wa kipindi cha kusubiri: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Mipangilio: `src/lib/resilience/settings.ts`

**Sehemu kwa kila muunganisho:**

- `rateLimitedUntil` — muhuri wa muda hadi kipindi cha kusubiri kiishe
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — kihesabu cha ucheleweshaji unaoongezeka kwa kiwango cha kipeo

**Vipindi chaguo-msingi vya kusubiri:**

- Msingi wa OAuth: sekunde 5
- Msingi wa ufunguo wa API: sekunde 3
- 429 ya ufunguo wa API: hupendelea vichwa vya mfumo wa juu vya `Retry-After`/kuweka upya/maandishi ya kuweka upya yanayoweza kuchanganuliwa
- Ucheleweshaji: `baseCooldownMs * 2 ** failureIndex`

**Kinga dhidi ya ombi-nyingi-kwa-wakati-mmoja:** huzuia hitilafu zinazotokea kwa wakati mmoja kuongeza kupita kiasi kipindi cha kusubiri au kuongeza `backoffLevel` mara mbili.

**Hitilafu za 429 za kikomo cha urudufu hazipandi ngazi ya ucheleweshaji.** `429` ambayo mwili wake unaripoti kikomo cha urudufu ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) humaanisha kuwa akaunti ni salama lakini ina shughuli nyingi.
`checkFallbackError()` hurejesha sababu `concurrency_limited`: hamia kwenye muunganisho unaofuata
sasa, weka huu katika kipindi cha kusubiri cha kudumu cha `CONCURRENCY_LIMIT_COOLDOWN_MS` (sekunde 1) au kulingana na
dokezo la kujaribu tena la mfumo wa juu, acha `backoffLevel` bila kubadilika, na uweke `skipProviderBreaker`.
Mwili unaobainisha wazi kikomo cha mgao bado unapewa kipaumbele, kwa hivyo mwili ambao pia unalingana na ruwaza ya kikomo cha mgao hubaki na uamuzi wa kikomo cha mgao.
Ugunduzi: `looksLikeConcurrencyLimit()` katika `src/shared/utils/classify429.ts`;
uamuzi: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` ya
kikatiza) haibadilishwi na bado husoma `rate_limit` kwa miili hii.

**Kukwama kwa maudhui ya mtiririko hakuweki akaunti katika kipindi cha kusubiri.** Wakati kifuatiliaji cha kukwama kwa maudhui
(`open-sse/utils/streamHandler.ts`) kinakata tamaa kuhusu mtiririko ambao haukutuma matokeo yoyote ya modeli kwa
wakati, `markAccountUnavailable()` hurekodi hitilafu kwenye muunganisho lakini haiweki
kipindi cha kusubiri: kukwama huko kunahusu ombi hilo, mara nyingi zamu ndefu ya kutoa hoja ambayo bado haina
matokeo. Waendeshaji wanaweza kuwasha tena kipengele hiki kupitia `resilienceSettings.streamStallCooldown.enabled`
(chaguo-msingi ni `false`).

**Fremu za kutoa hoja huanzisha upya muda uliotengwa kwa kukwama kwa maudhui.** Modeli ya kutoa hoja inaweza kufikiri kwa
dakika kadhaa kabla ya tokeni yake ya kwanza inayoonekana: Claude hutiririsha fremu za `thinking_delta` ambazo
maandishi yake ya kufikiri yanaweza kuwa tupu, na Responses API hutiririsha kipengee kimoja cha kutoa hoja baada ya
kingine. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) hutambua
fremu hizi, na kifuatiliaji huanzisha upya muda wake uliotengwa kwa kila fremu badala ya kughairi
zamu. Bado si matokeo ya modeli, kwa hivyo zamu inayomalizika ikiwa na utoaji wa hoja pekee bado
huripotiwa kuwa tupu, na zamu inayositisha utoaji wa hoja na kutuma tu ishara za kuwepo bado husababisha
kifuatiliaji kuingilia kati.

Fremu za jozi za Kiro za `reasoningContentEvent` zenye sahihi isiyo tupu huhifadhi shughuli hii ya
utoaji wa hoja kupitia kitekelezaji kama delta tupu ya `reasoning_content`. Sahihi hiyo
haisambazwi. Metadata, fremu zisizokamilika na sahihi tupu hazianzishi upya
muda uliotengwa kwa maudhui; muda huru wa kuisha kwa mtiririko amilifu na kughairi kwa mteja bado
hutumika (`open-sse/executors/kiro/reasoning.ts`).

**Hali za mwisho (SI vipindi vya kusubiri):**

- `banned` — huwekwa na ugunduzi wa neno lililopigwa marufuku / kupigwa marufuku kwa akaunti (angalia [BAN_DETECTION](../security/BAN_DETECTION.md)), na na kukataliwa mara tatu mfululizo kwa kila ombi na mfumo wa juu (`request_rejected`, kwa mfano Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); kukataliwa mara moja huweka tu muunganisho katika kipindi cha kusubiri
- `expired` (hubadilika kuwa hali ya mwisho baada ya majaribio yenye kikomo — `EXPIRED_RETRY_MAX = 3` pamoja na ucheleweshaji unaoongezeka kwa kiwango cha kipeo — ili hitilafu za muda za OAuth ziweze kujirekebisha kabla akaunti haijazimwa kabisa)
- `credits_exhausted`

Hizi hudumu hadi vitambulisho vibadilike au mwendeshaji aviweke upya. Usibadilishe hali za mwisho kwa hali ya muda ya kipindi cha kusubiri.

**Urejeshaji wa polepole:** wakati `rateLimitedUntil` umepita, muunganisho unastahiki kutumika tena. Baada ya matumizi yenye mafanikio, `clearAccountError()` huondoa sehemu zote za hitilafu.

### Kizuizi cha matumizi cha Claude OAuth: njia ya kipaumbele cha chini + kuweka upya kikomo cha kipindi

**Upeo:** muunganisho mmoja wa usajili wa Claude (OAuth). Vipengele vyote viwili ni vya **kuwashwa kwa hiari kwa kila
muunganisho** (Hariri muunganisho → sehemu ya Claude → `lowPriorityMode` / `autoLimitReset` katika
`providerSpecificData`, vyote vikiwa vimezimwa kwa chaguo-msingi) na huakisi amri za Claude Code za `/low-priority` na
`/limit-reset` (mkataba wa mawasiliano ulionakiliwa kutoka Claude Code 2.1.263).

**Utekelezaji:**

- Mashine ya hali + uainishaji wa jibu: `open-sse/services/claudeLowPriority.ts`
- Kiteja cha hali/dai la kuweka upya: `open-sse/services/claudeLimitReset.ts`
- Kiunganishi cha kitekelezaji (uingizaji wa kichwa + kujaribu tena kwa akaunti hiyo hiyo): `open-sse/executors/base.ts::execute()`
- Uhifadhi wa kuwasha kwa hiari: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Kichochezi:** kizuizi cha matumizi cha saa 5 — `429` ambayo vichwa vyake vina
`anthropic-ratelimit-unified-status: rejected` na, akaunti inapostahiki,
`anthropic-ratelimit-unified-slow-offer: treatment`. Hakuna kinachotumwa kabla ya 429 hiyo ya kwanza ya
kizuizi; 429 ya ongezeko la ghafla isiyo na vichwa vilivyounganishwa hupitia njia ya kawaida ya kipindi cha kusubiri.

**Njia ya kipaumbele cha chini** (`lowPriorityMode`):

- Kwenye ukomo wa 429, kitekelezaji kinakubali ofa na kujaribu mara moja tena akaunti **ileile**
  kwa `anthropic-usage-limit: slow`; njia husalia amilifu hadi
  `anthropic-ratelimit-unified-reset` iliyotangazwa (+sekunde 60 za nyongeza), na kila ombi katika
  kipindi hicho huwa na kichwa hicho. 429 iliyonaswa haifikii kamwe `handleChatCore`, kwa hivyo
  muunganisho **hauwekwi** katika kipindi cha kusubiri na haubadilishwi.
- `anthropic-ratelimit-unified-slow-status` kwenye majibu ya baadaye: `active` / `not_needed`
  hudumisha njia; `slot_busy` (429) au `529` husubiri muda wa seva wa
  `anthropic-ratelimit-unified-slow-retry-after` (chaguomsingi sekunde 20, kikomo sekunde 5–600, mtikisiko wa ±30%)
  na kujaribu tena, huku ikidhibitiwa na `anthropic-ratelimit-unified-slow-max-wait` (chaguomsingi dakika 20, kikomo
  dakika 1–saa 6) — baada ya hapo njia huisha na kipindi cha kupoa cha dakika 10 huzuia kukubaliwa tena.
  Zaidi ya hayo, muda wa kusubiri hupunguzwa kulingana na muda uliosalia wa kikomo cha muda cha kuanza kwa upstream
  cha ombi lenyewe (`resolveFetchStartTimeout`, chaguomsingi dakika 10), ukiondoa pengo la sekunde 5: bila kikomo hicho,
  muda wa juu wa kusubiri wa chaguomsingi wa dakika 20 ungezidi maisha ya ombi na usingizi ungekatishwa
  katikati ya kusubiri, na kuibua `TimeoutError` badala ya mwisho laini wa `max_wait` + kipindi cha kupoa.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, kuanza upya kwa kipindi cha saa 5, au
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ambayo huimaliza kama
  `extra_usage` kwa hali yoyote, kwa kuwa ziada inayolipiwa sasa hufidia ukomo) humaliza njia;
  kisha jibu hupitia njia ya kawaida ya kipindi cha kusubiri. `budget_exhausted` hukumbukwa hadi
  uwekaji upya wa bajeti uliotangazwa (≤ siku 8).
- Ukaguzi wa ukomo huendeshwa baada ya majaribio ya ndani ya jaribio yanayosababishwa na 400 ya kitekelezaji chenyewe
  (uhariri wa muktadha, udhibiti wa mipaka ya kufikiri/juhudi, kujifunza kiotomatiki kwa vigezo), kwa hivyo 429 ya ukomo inayojitokeza tu
  kwenye mojawapo ya majaribio hayo bado hunaswa badala ya kufikia njia ya kipindi cha kusubiri.
- Hali huhifadhiwa kwenye kumbukumbu kwa kila muunganisho (kuanzisha upya hugharimu 429 moja ya ziada ya ukomo ili kukubali tena).

**Uwekaji upya wa kikomo cha kipindi** (`autoLimitReset`, hujaribiwa kabla ya njia wakati vyote vimewashwa):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → kizuizi cha `juniper_tide`;
  wakati `arm: "reset"` na `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` pamoja na
  `{ "program": "juniper_tide" }` (UUID ya shirika kutoka
  `providerSpecificData.organizationUUID`, na njia mbadala ya bootstrap).
- `result: reset|not_limited` → ombi hujaribiwa tena kwa kasi kamili (bila kichwa cha hali ya polepole).
  `already_used` / `not_offered` huhifadhi `next_available_at` (chaguomsingi wiki moja);
  hitilafu yoyote husubiri dakika 15 kabla ya kujaribu tena. Uwekaji upya ni mara moja kwa wiki na bado
  huhesabiwa kwenye kikomo cha kila wiki.

Vizuizi vya uregresheni: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Uhusiano wa kipindi (#7274)

**Mawanda:** kipindi kimoja cha mteja (kichwa cha `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) kilichobandikwa kwenye muunganisho mmoja, kwa mtoa huduma **yeyote**.

**Madhumuni:** kumweka wakala wa zamu nyingi (Claude Code, aider, mawakala maalum) kwenye akaunti ileile katika maombi yote, kupunguza upotevu wa muktadha kati ya akaunti na 429 za kuanza upya bila akiba zinazojirudia kwa watoa huduma wenye hali ya kipindi kwa kila akaunti.

**Utekelezaji:**

- Utatuzi wa TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Uteuzi/uundaji wa kibandiko: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Utoaji wa kichwa (wa jumla, mtoa huduma yeyote): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Jedwali la vibandiko linalohifadhiwa: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Mpangilio: `sessionAffinityTtlMs` (TTL ya jumla katika ms, `0` huzima) — `src/lib/db/settings.ts`. Ulibadilishwa jina kutoka `codexSessionAffinityTtlMs` ya Codex pekee kupitia uhamishaji `124_generic_session_affinity_ttl.sql`, ambao huhamisha TTL yoyote ya Codex iliyosanidiwa awali kuwa chaguomsingi jipya.

Kabla ya #7274, `resolveSessionAffinityTtlMs()` ilisitisha moja kwa moja kwa kurejesha `0` kwa kila mtoa huduma isipokuwa `codex`, kwa hivyo mpangilio wa TTL (na vichwa vya kipindi) haukuwa na athari mahali pengine popote ingawa utaratibu wa kubandika na utoaji wa vichwa tayari haukutegemea mtoa huduma. Marekebisho yaliondoa urejeshaji huo wa mapema; sasa TTL hutumika sawasawa kwa kila mtoa huduma baada ya kuwekwa kwa jumla kuwa zaidi ya `0`.

Vichwa vitatu vya uhusiano wa kipindi havitumwi kamwe upstream — vitekelezaji huunda vichwa vyao vya upstream kutoka mwanzo badala ya kupitisha vichwa vya mteja, kwa hivyo hiki hubaki kitambulisho cha ndani cha ulinganishaji pekee.

### Ukodishaji wa kipekee wa miunganisho ya vipindi vinavyodhibitiwa

**Mawanda:** mteja/k kipindi kimoja amilifu cha HTTP kinachodhibitiwa humiliki muunganisho mmoja unaostahiki wa OmniRoute.

**Madhumuni:** kutoa umiliki wa kudumu na wa kipekee wa muunganisho kwa wateja wanaohitaji mpaka thabiti wa uelekezaji
katika maombi yote. Hii ni tofauti na uhusiano wa kipindi, ambao ni upendeleo laini wa mwendelezo:
ukodishaji wa kipekee huhifadhi hali ya mzunguko wa maisha katika SQLite, hulazimisha upekee wa kimataifa wa mmiliki amilifu na
muunganisho amilifu, na hukataa kizazi kilichopitwa na wakati kabla ya kupeleka kwa mtoa huduma.

Kipengele hiki huwashwa kwa hiari kwa kila ufunguo wa API. Ufunguo unaodhibitiwa lazima uwe na wigo wa `lease:exclusive` na
orodha ya wazi isiyo tupu ya `allowedConnections`. Mteja yeyote wa HTTP anaweza kutumia endpoint ya mzunguko wa maisha; hakuna
jina la mteja, user-agent, mtoa huduma, mbinu ya OAuth, wala modeli inayohitajika. Ukodishaji humiliki muunganisho,
si modeli, kwa hivyo badiliko la modeli hudumisha uhusiano huo mradi muunganisho uendelee kustahiki
kwa kawaida. Kanuni za kawaida za modeli, mgao, afya, kipindi cha kusubiri na orodha ya ruhusa huendelea kuwa na mamlaka na zinaweza
kuhamisha kizazi kilekile kwenda kwenye muunganisho mwingine huru unaostahiki.

Mzunguko wa maisha ni `POST /api/v1/session-leases` wenye vitendo vya JSON `acquire`, `renew`, na `release`.
Maombi ya inferensi yanayodhibitiwa huwasilisha thamani fiche ya `X-OmniRoute-Lease-Owner` na
`X-OmniRoute-Lease-Generation` halisi. Mmiliki hutumia `vlo_` ikifuatiwa na herufi 43 za base64url; ni
hashi yake ya SHA-256 pekee inayohifadhiwa. Kizuizi cha mwisho cha utumaji pia hufungamanisha kitambulisho cha ufunguo wa API kilichothibitishwa na
kitambulisho cha muunganisho unaotumika. Vichwa vya udhibiti wa ukodishaji huondolewa kwenye kumbukumbu, vijipicha vya maombi vilivyohifadhiwa, na
vichwa vya vitekelezaji vya upande wa juu.

Ikiwa uelekezaji wa kawaida una wagombea wanaodhibitiwa wanaostahiki lakini kila mgombea aliye huru anashikiliwa na
ukodishaji amilifu wa mwingine, OmniRoute hurejesha HTTP `429`, msimbo wa lease-capacity-unavailable, hali ya
kusubiri nafasi, na `Retry-After` yenye kikomo inayotokana na muda wa mapema zaidi wa kuisha unaohusika.
Kutokuwepo kwa ustahiki kwa kawaida si ushindani wa ukodishaji na huhifadhi semantiki zake zilizopo za hitilafu za uelekezaji.

Mbinu zinazohusiana hubaki tofauti:

- Ushikiliaji wa kipindi cha OAuth ni usambazaji laini wa ndani ya mchakato kwa akaunti za OAuth.
- Semaphore za akaunti hutoa vibali vya maombi yanayotekelezwa kwa wakati mmoja na huisha ombi linapokamilika.
- Ukodishaji wa kipekee wa vipindi vinavyodhibitiwa ni umiliki wa kudumu wa mzunguko wa maisha wenye kizuizi cha kizazi.

---

## 3. Kufungiwa kwa Modeli

**Upeo:** mtoa huduma + muunganisho + modeli.

**Upeo wa ufunguo kulingana na hali:** hali inayoshindwa huamua ni ufunguo upi unaoandikiwa ufungiaji
(`resolveLockoutScope()` katika `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — ishara ya kikomo au haki ya matumizi — hufunga **familia ya kikomo**:
  kwa codex, upeo mzima wa `codex` / `spark` (kila modeli ya `gpt-5*` ya
  muunganisho), na kwa watoa huduma wengine `getQuotaScopedModelForProvider()`.
- `404` hufunga modeli yenyewe (`getModelLockKey()` hupunguza upeo wa `not_found`).
- Hali nyingine yoyote — hitilafu za usafirishaji/seva za `5xx` na `502`
  iliyozalishwa na OmniRoute yenyewe kutokana na uthibitishaji wa ubora — hufunga tu
  muunganiko **mahususi** wa mtoa huduma/muunganisho/modeli. Mtiririko mbovu kwenye modeli moja
  si ushahidi kuhusu kikomo cha akaunti; kabla ya kanuni hii, jibu moja tupu kwenye
  `codex/gpt-5.6-luna` liliondoa kila modeli ya `gpt-5*` ya muunganisho huo kutoka
  kwenye uelekezaji kwa dakika 2–30 (zikiongezeka hatua kwa hatua), ilhali kikomo chake hakikuwa kimeguswa.
- Chaguo la wazi la `scope` kutoka kwa mwitaji huwa na kipaumbele kila wakati (Antigravity hupitisha `"exact"`).

**Madhumuni:** kuepuka kuzima muunganisho mzima wakati modeli moja tu haipatikani au imewekewa kikomo cha matumizi.

**Mifano:**

- Watoa huduma wenye kikomo kwa kila modeli wanaorejesha 429
- Watoa huduma wa ndani wanaorejesha 404 kwa modeli moja inayokosekana
- Hitilafu za ruhusa za modi/modeli zinazomhusu mtoa huduma mahususi (k.m., modi za Grok)

**Utekelezaji:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashibodi ya Vipindi vya Kusubiri vya Modeli (v3.8.0)

UI: Mipangilio → Vipindi vya Kusubiri vya Modeli (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Huorodhesha ufungiaji unaotumika pamoja na: mtoa huduma, muunganisho, modeli, sababu, expiresAt. Waendeshaji wanaweza kuwezesha tena modeli kwa mikono kutoka kwenye kadi.

**REST API:**

- `GET /api/resilience/model-cooldowns` — orodhesha ufungiaji unaotumika
- `DELETE /api/resilience/model-cooldowns` — wezesha tena kwa mikono. Mwili: `{provider, connection, model}`. Uthibitishaji: usimamizi.

### Kidhibiti cha Vipindi vya Kusubiri

UI: Ufuatiliaji → Kidhibiti cha Vipindi vya Kusubiri (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Ukurasa mmoja kwa kila muunganisho ulioondolewa kwenye uelekezaji kwa sababu ya muda mfupi, badala ya
kufungua ukurasa wa kila mtoa huduma. Huorodhesha vipindi vya kusubiri vya miunganisho, ufungiaji wa modeli na hali
za mwisho, huvisafisha kwa kila muunganisho, kwa chaguo fulani, au kwa miunganisho yote ya mtoa huduma,
na huhariri kanuni za vipindi vya kusubiri zilizosanidiwa zaidi: `streamStallCooldown.enabled` na kipindi msingi cha kusubiri cha OAuth / ufunguo wa API
cha `connectionCooldown` pamoja na idadi ya juu ya hatua za kuongeza muda (huhifadhiwa kupitia
`PATCH /api/resilience`). Hali za mwisho (`banned`, `expired`, `credits_exhausted`)
huorodheshwa lakini kamwe hazisafishwi hapa.

**REST API** (`src/lib/resilience/cooldownManager.ts`, uthibitishaji: usimamizi):

- `GET /api/resilience/cooldowns[?provider=]` — miunganisho pamoja na hali, muda wa kusubiri uliosalia,
  kiwango cha kuongeza muda, aina ya hitilafu ya mwisho na ufungiaji wa modeli (bila vitambulisho)
- `POST /api/resilience/cooldowns` — mwili `{connectionIds: string[]}` au
  `{all: true, provider?}`; hurejesha `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI ya mipangilio ya ufungiaji + urejeshaji kwa upunguzaji baada ya mafanikio (v3.8.23)

Ufungiaji wa modeli ulibadilishwa kutoka tabia iliyowekwa moja kwa moja na inayowashwa kila wakati hadi kuwa
kipengele kinachoweza kusanidiwa kikamilifu, kinachohitaji kuwashwa kwa hiari, chenye kadi yake ya mipangilio na njia ya urejeshaji inayojirekebisha.

**Kadi ya mipangilio:** Mipangilio → Ufungiaji wa Modeli
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Hii ni **tofauti** na `ModelCooldownsCard` ya kusoma pekee iliyo hapo juu (ambayo
_huorodhesha_ tu ufungiaji unaotumika) — kadi mpya _husanidi vigezo_. Chaguomsingi
yanapatikana katika `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Mpangilio               | Chaguomsingi                     | Maana                                                                              |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Swichi kuu — ufungiaji wa modeli **umezimwa kwa chaguomsingi**.                    |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Hali za mfumo wa juu zinazohesabiwa kama hitilafu ya upeo wa modeli.               |
| `baseCooldownMs`        | `120_000` (sekunde 120)          | Muda wa kwanza wa ufungiaji kwa hitilafu ya kwanza.                                |
| `maxCooldownMs`         | `1_800_000` (dakika 30)          | Kikomo cha juu cha kipindi cha kusubiri kilichoongezwa.                            |
| `maxBackoffSteps`       | `10`                             | Idadi ya juu ya hatua za ongezeko la muda la kielelezo.                            |
| `useExponentialBackoff` | `true`                           | Ikiwa hitilafu zinazojirudia huongeza kipindi cha kusubiri kwa namna ya kielelezo. |

Mipangilio huhifadhiwa kupitia hifadhi ya kawaida ya mipangilio na kuthibitishwa kupitia
skima ya mipangilio ya ustahimilivu; kadi huweka mipaka ya `baseCooldownMs`/`maxCooldownMs`
(huku `maxCooldownMs ≥ baseCooldownMs`) na `maxBackoffSteps`.

**Urejeshaji kwa upunguzaji baada ya mafanikio:** urejeshaji **hautegemei** tu kuisha kwa kipima muda. Jibu
salama hupunguza hatua kwa hatua idadi ya hitilafu za modeli ili modeli iliyorejea katika hali nzuri
katikati ya kipindi iache kuongezeka (na isafishwe) kabla kipima muda chake hakijaisha. Lengo la mchanganyiko linapofanikiwa,
`open-sse/services/combo.ts` huita `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), ambayo **hupunguza kwa nusu** `failureCount`
iliyohifadhiwa (`Math.floor(failureCount / 2)`); inapofikia `0`, ingizo la ufungiaji
hufutwa kabisa. Kitendakazi sambamba `recordModelLockoutFailure()`
huongeza idadi (na huongeza kipindi cha kusubiri) kunapotokea hitilafu ndani ya
kipindi cha ongezeko. Upunguzaji huu baada ya mafanikio huongezea utaratibu wa kawaida wa kuisha kwa kipima muda —
njia yoyote inaweza kuwezesha modeli tena.

**Hali:** ufungiaji huhifadhiwa **kwenye kumbukumbu** (`Map` za kila mchakato za
`ModelLockoutEntry` zikiwa na funguo za `provider:connectionId:model`, na ufungiaji wa upeo mahususi ukiwa na
`provider:connectionId:exact:model`), hauhifadhiwi kwenye
DB — hupotea mfumo unapoanzishwa upya. _Mipangilio_ huhifadhiwa; _hali_ ya ufungiaji unaotumika ni ya muda mfupi.

---

## 4. Udhibiti wa Utekelezaji Sambamba wa Quota-Share (v3.8.36)

Akaunti za usajili (GLM, MiniMax, n.k.) mara nyingi hukubali takribani maombi 1–3
tu kwa wakati mmoja; kuzidisha kiwango hicho husababisha hitilafu za 429 na vipindi vya kusubiri. Hali hii ni mbaya zaidi chini ya
michanganyiko ya **quota-share** (`qtSd/…`), ambapo funguo kadhaa za API hushiriki akaunti moja ya
upstream. Tabaka tatu huzuia akaunti inayoshirikiwa isijazwe na maombi mengi kupita kiasi.

### Kikomo cha utekelezaji sambamba kwa kila muunganisho (`max_concurrent`)

Kila muunganisho wa mtoa huduma unaweza kutangaza kikomo cha `max_concurrent`
(`provider_connections.max_concurrent`, kinachowekwa katika kidirisha cha muunganisho / API / DB).
Kiache tupu ili kutokuwa na kikomo. Hiki ndicho kidhibiti pekee kinachoendesha tabaka la upangaji wa maombi
lililo hapa chini — kiweke kulingana na uwezo halisi wa akaunti wa kushughulikia maombi kwa wakati mmoja (k.m. GLM ~1, MiniMax ~2).

### Vikomo vya utekelezaji sambamba kwa kila modeli (`modelConcurrency`)

Muunganisho unaweza pia kutangaza vikomo kamili vya utekelezaji sambamba kwa kila modeli
ndani ya ramani yake ya `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Kiweke katika kidirisha cha muunganisho (**Ubatilishaji wa vikomo vya kiwango → Vikomo vya
utekelezaji sambamba kwa kila modeli**, `model=cap` moja kwa kila mstari) au kupitia
`PATCH /api/providers/[id]` kwa kutumia muundo huohuo wa JSON. Maana za funguo:

- **Muunganisho mzima dhidi ya modeli mahususi:** `maxConcurrent` hubaki kuwa kikomo cha pamoja
  katika muunganisho mzima. Wakati vyote viwili vinatumika, vizuizi vyote hupatikana
  kwa namna ya atomiki katika kizuizi kilekile cha mchanganyiko
  (`global → provider → account → model`); tabia inayotumika ni ile ya
  kikomo kikali zaidi kinachohusika.
- **Ulinganifu kamili wa ufunguo wa modeli:** ufunguo ni mfuatano wa modeli unaopitishwa kwa
  kitekelezaji baada ya utatuzi wa uelekezaji — kwa kawaida kitambulisho halisi cha modeli ya upstream
  (`glm-5`), wala si jina mbadala la upande wa mteja la `provider/model` (`zai/glm-5`
  halilingani na `glm-5`). Thamani ni vikomo vya maombi yanayotekelezwa kwa wakati mmoja vilivyo nambari kamili chanya.
- **Upangaji wa ndani kwenye foleni, bila ugunduzi:** maombi yanayozidi kiwango husubiri kwenye foleni ya ndani kwa kutumia
  utaratibu uliopo wa foleni/muda wa kuisha (hitilafu za udahili zenye aina ya `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute haigundui wala
  kukisia sera ya upstream — inatekeleza vikomo halisi ambavyo mwendeshaji
  amesanidi. Kizuizi cha modeli kilichofikia uwezo wake hakilemazi mtoa huduma kamwe wala
  kuunda hali ya kudumu ya kufungiwa kwa modeli; tabia ya upstream ya 429/kusubiri/fallback
  hubaki kuwa kinga ya mwisho dhidi ya hitilafu.
- **Upeo wa kila muunganisho, kwa kila mchakato:** vikomo ni vya kila muunganisho wa hifadhidata
  na huhifadhiwa kwenye kumbukumbu, kwa hivyo miunganisho miwili inayotumia tena ufunguo uleule wa API wa upstream
  hairatibiani.
- **Kutokuwa na usanidi kunamaanisha hakuna mabadiliko:** kuacha ramani hiyo (au kuacha sehemu ya
  dashibodi tupu) hakuongezi kizuizi cha modeli. Mfano wa usanidi bila
  kudai kikomo chochote cha jumla cha mtoa huduma:

```text
glm-5=1
glm-4.7=3
```

### Upangaji wa maombi ya quota-share kwa mfuatano

Wakati utumaji wa quota-share unalenga muunganisho unaotangaza thamani chanya ya
`max_concurrent`, maombi yanayofanywa kwa wakati mmoja kwa **akaunti** hiyo hupangwa kwa mfuatano kupitia
semaphore ya kila muunganisho (ufunguo `qsconn:<connectionId>`): maombi ya ziada **husubiri kwenye
foleni** badala ya kuijaza akaunti kwa maombi mengi kupita kiasi. Hii ni **fail-open** — foleni iliyojaa
au muda wa kusubiri kuisha huruhusu ombi kuendelea bila nafasi badala ya kukataa ombi
linaloweza kutumwa. Washa au zima katika **Mipangilio → Ustahimilivu → Utekelezaji sambamba
wa kila muunganisho wa quota-share** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, huwashwa
kwa chaguo-msingi). Bila kikomo cha `max_concurrent`, tabia haibadiliki.

> Kizuizi cha uelekezaji wa quota-share (`selectQuotaShareTarget`, DRR + P2C) chenyewe ni
> fail-open na _hupunguza kipaumbele_ tu cha muunganisho uliofikia kikomo — ikiwa kuna
> muunganisho mmoja pekee katika kundi, hakiwezi kuweka kikomo kisichoweza kuvukwa, kwa hivyo semaphore hii ndiyo inayodhibiti
> wingi wa maombi kwa kweli.

### Jaribio upya linalozingatia kipindi cha kusubiri cha combo

Kwa kila mkakati wa combo (unapowashwa), ombi ambalo lingesababisha 429
kwa kipindi KIFUPI cha kusubiri cha muda husubiri hadi kipindi hicho kiishe na kutumwa tena badala ya
kurudisha 429 — hii inashughulikia vipindi vya TPM/RPM vya aina ya Gemini (~60s retry-after)
kwenye combo zenye modeli nyingi, k.m. shabaha zote mbili za combo ya modeli 2 zinapofikia kikomo cha kiwango
cha kila modeli. Hudhibitiwa na `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) katika **Mipangilio → Ustahimilivu**. Haisubiri kamwe kwa sababu ya `quota_exhausted`
(imefungwa hadi usiku wa manane) au sababu za uthibitishaji/kutopatikana.

Kizuizi hicho pia hushughulikia hali ya kabla ya kutuma (#16319): wakati kila shabaha ya
combo inarukwa kabla ya jaribio lolote kufanywa kwa sababu modeli yake iko katika
hali fupi ya kufungiwa kwa muda, njia ya majaribio sifuri husubiri hali hiyo ya kufungiwa iishe chini ya
vikomo vivyo hivyo na kutuma upya, badala ya kujibu kwa
`503 ALL_TARGETS_SKIPPED` isiyo na kidokezo. Wakati kusubiri hakuruhusiwi (kikomo kimefikiwa, idadi ya majaribio au bajeti
imeisha, au kipengele kimezimwa), jibu la mwisho hubadilishwa kuwa
`429 rate_limit_error` likiwa na `retry_after` / `reset_at` kutoka kwenye muda wa mapema zaidi
wa kuisha kwa hali ya muda ya kufungiwa; hali za kufungiwa zinazohusiana na kiasi, uthibitishaji na kutopatikana huendelea kutoa 503 isiyo na kidokezo.

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

## 5. Udhibiti wa Kukubali Maombi Kwenye Foleni (v3.8.49 · suala #6593)

**Upeo**: foleni ya ndani ya kikomo cha kasi kwa kila mtoa huduma+muunganisho (`open-sse/services/rateLimitManager.ts`,
inayotegemezwa na Bottleneck), safu moja chini ya mbinu tatu zilizo hapo juu.

**`maxWaitMs` huwekea mipaka muda wa kusubiri kwenye foleni; `executionMaxWaitMs` huwekea mipaka utekelezaji.**
Hizi mbili zimetenganishwa kimakusudi, na hakuna inayotegemea nyingine.

`resilienceSettings.requestQueue.maxWaitMs` ni **bajeti ya kusubiri kwenye foleni**:
inajumuisha kusubiri nafasi ya mtoa huduma na kisha kukaa katika hali ya QUEUED, na kipima muda chake
hufutwa mara tu kazi inapoondoka katika hali ya QUEUED na kuanza kutekelezwa
(`rateLimitManager.ts`, `wrappedFn`). Ombi linaloizidi kamwe halifiki
kwa huduma ya juu. Chaguo-msingi ni 30000ms, linalotolewa na `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
katika `src/lib/resilience/settings.ts` na kuthibitishwa na
`tests/unit/ratelimit-admission-control-6593.test.ts`, kwa hivyo kulibadilisha
hufanya jaribio hilo lishindwe badala ya kuacha aya hii ipitwa na wakati bila kutambulika.

`resilienceSettings.requestQueue.executionMaxWaitMs` ndiyo thamani ambayo Bottleneck
hupokea kama `expiration` ya kazi, ambayo kipima muda chake huanza tu baada ya kutumwa. Ni
ulinzi wa mwisho kwa vitekelezaji visivyo na muda wao wenyewe wa kuisha wa huduma ya juu, na
huongezwa hadi muda wa kuisha wa kuanza kwa fetch wa kitekelezaji pale ambapo huo ni mrefu zaidi, ili
isiweze kukatiza jibu linaloendelea vizuri. Chaguo-msingi ni 600000ms (dakika 10).

Kuingiza bajeti ya foleni katika `expiration` ndiko kulikokuwa kukikatiza malango yasiyo ya ongezeko
yakiwa katikati ya utekelezaji — kihalali huendelea kwa dakika kadhaa kabla ya baiti za kwanza —
na ndiyo sababu kuisha kwa muda huwasilishwa kama `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), huku bajeti ya foleni ikibeba
msimbo wa kuisha kwa muda wa foleni. Batilisha mojawapo kupitia `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) au dashibodi
(**Mipangilio → Ustahimilivu**). Zote huwekewa mipaka ya 1ms–24h zinaporekebishwa.

**Mpangilio wa kipaumbele, kwa zote mbili:** env var hutoa tu thamani ya _chaguo-msingi_. Thamani
iliyohifadhiwa katika `resilienceSettings.requestQueue` (dashibodi / kiraka cha API, iliyohifadhiwa
katika `key_value`) hupewa kipaumbele kuliko hiyo, na
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ya kila muunganisho hupewa kipaumbele kuliko hiyo. Kwa hivyo, kuweka
env var katika usambazaji ambao tayari una thamani iliyohifadhiwa
hakubadilishi chochote — badala yake futa au sasisha mpangilio uliohifadhiwa.

Muda wa kukaa kwenye foleni huwekewa kikomo na `maxWaitMs`; `maxQueueDepth` iliyo hapa chini huwekea kikomo idadi ya
waitaji wanaoweza kuwekwa kwenye foleni kwa wakati mmoja.

**`maxQueueDepth` — kikomo kipya cha kukubali kinachowashwa kwa hiari.** `resilienceSettings.requestQueue.maxQueueDepth`
huwekea kikomo idadi ya maombi yanayoweza kukaa kwenye foleni (ambayo bado hayajatumwa) kwa
mtoa huduma+muunganisho mmoja kwa wakati mmoja. Wakati foleni tayari ina maombi `maxQueueDepth`,
ombi jipya hukataliwa mara moja kwa hitilafu yenye aina maalumu ya
`code: "RATE_LIMIT_QUEUE_FULL"` **kabla** halijafika kwenye `limiter.schedule()`
— kwa hivyo ukataaji huo ni wa gharama ndogo na hutokea kabla ya kazi yoyote ya baadaye ya
ufinyazaji / utafsiri wa kidokezo kwa ombi hilo. Chaguo-msingi `0` =
imezimwa, hali inayohifadhi tabia iliyopo ya foleni isiyo na kikomo; huwekewa mipaka ya 0–100000.
Batilisha kupitia `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) au
`resilienceSettings.requestQueue.maxQueueDepth` (dashibodi/kiraka cha API).

Ukaguzi wenyewe wa kukubali ni kitendakazi halisi kisicho na athari za nje
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) ili
uweze kujaribiwa kwa jaribio la kitengo bila kikomo halisi cha Bottleneck.

> RFC iliyoanzisha #6593 pia ilipendekeza alama ya `bypassCompressionOnRateLimit`.
> Mchakato wa repo hii wa `open-sse/services/compression/` ni
> ufinyazaji wa kidokezo/muktadha kwenye ombi la LLM linalotoka (`chatCore.ts`,
> karibu na sehemu ya `resolveCompressionSettings`/`selectCompressionStrategy`),
> si ufinyazaji wa jibu la HTTP kwenye miili ya 429 inayoundwa — hakuna
> njia ya msimbo inayolingana na alama halisi ya kupita bila ufinyazaji. Hatua hiyo ya ufinyazaji wa kidokezo
> pia kwa sasa huendeshwa _kabla_ ya `withRateLimit()` katika mchakato wa ombi, kwa hivyo
> kupanga upya ili kuiruka wakati wa ukataaji wa foleni iliyojaa ni badiliko tofauti na kubwa zaidi
> kuliko upeo wa suala hili; kwa makusudi **haikutekelezwa**
> hapa na imeachwa kama kazi ya ufuatiliaji ikiwa faida ya kuokoa CPU inastahili
> hatari ya kupanga upya.

---

## 6. Kifuatiliaji cha uwezo wa kupitisha data wa mtiririko wa polepole (#9709)

Kizuizi cha hiari cha `resilienceSettings.streamRecovery.throughputWatchdog` hutambua
chanzo cha juu ambacho bado kinatuma vipande vya data lakini kinazalisha matokeo ya msaidizi chini ya
kiwango kilichosanidiwa cha matokeo yenye manufaa. Kimetenganishwa kimakusudi na muda wa kuisha kwa kutokuwa na shughuli:
mapigo ya uhai na metadata haviweki upya kipima muda chochote wala havihesabiwi kama maendeleo. Pia
kimetenganishwa na kikomo thabiti cha muda wa jaribio (#9153), ambacho hubaki kuwa kiwango cha juu kabisa cha usalama
bila kujali ubora wa matokeo.

Kifuatiliaji kinahitaji kipindi cha kuanza kufanya kazi kinachofuatwa na dirisha kamili linalosogea kabla
hakijaweza kusitisha. Huhesabu tofauti za maandishi kutoka kwenye matukio ya matokeo ya Chat Completions na Responses API
(kadirio la kihafidhina la baiti za UTF-8), hupuuza matukio ya matumizi pekee na matukio matupu, na
husitisha tathmini wakati matukio ya mwito wa zana au ya kutoa hoja yanaendelea. Kimezimwa
kwa chaguomsingi na kinaweza kuwashwa kwa `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
dirisha, kipindi cha kuanza kufanya kazi, kiwango cha chini, na kiwango cha chini cha matokeo yanayoweza kupimwa huwekewa mipaka na
safu ya kawaida ya urekebishaji wa mipangilio ya ustahimilivu.

Kikiwashwa, usitishaji wa kifuatiliaji hutumika tu kwa jaribio linalotumika la chanzo cha juu. Kabla ya
baiti zozote zinazoonekana kwa mteja, njia iliyopo ya urejeshaji wa mapema wa akaunti hiyohiyo inaweza kufungua upya
jaribio hilo. Baada ya uthibitishaji, mtiririko haurudiwi kamwe bila ukaguzi; ni mkataba uliopo pekee
wa uendelezaji salama katikati ya mtiririko unaoweza kuunganisha kiambishi. Ukamilishaji hubaki
wa mara moja tu, kwa hivyo uhasibu wa matumizi na uachiliaji wa semaphore haurudiwi.

---

## 7. Urekebishaji wa Hali ya Chanzo cha Juu (hitilafu za mgao zilizoelezwa vibaya)

**Upeo:** lango moja la chanzo cha juu ambalo huripoti kuisha kwa muda kwa mgao likitumia hali isiyo sahihi ya HTTP.

**Madhumuni:** kurekebisha hali inayopotosha KABLA ya uainishaji, ili watumiaji wa chini ya mkondo (injini ya mbadala, ujumlishaji wa combo, jibu linaloonyeshwa kwa mteja) waone hali halisi ya hitilafu inayoweza kujaribiwa tena.

Baadhi ya malango huashiria kuisha kwa MUDA kwa mgao kwa kutumia hali ya HTTP
isiyoweza kujaribiwa tena. `agentrouter.org` hurudisha `403` (wakati mwingine `400`) ikiwa na mwili wa Kichina
(`用户额度不足` / `额度不足`) badala ya `429` ya kawaida. Wateja kama Claude
Code huchukulia `403` kuwa ya kudumu na husitisha kipindi, na bila marekebisho
injini ya mbadala ingeiainisha kama `AUTH_ERROR` badala ya tukio la
mgao.

**Utekelezaji:**

- Sajili + kilinganishi: `open-sse/config/upstreamStatusRestatement.ts` — orodha
  ya kanuni kwa kila mtoa huduma (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), zinazolinganishwa kupitia `applyStatusRestatement()`.
- Mahali pa mwito: kizuizi cha `providerFailure:` katika `open-sse/handlers/chatCore.ts`
  (karibu na mstari wa 3654), mara tu baada ya `parseUpstreamError()` kuchanganua jibu la chanzo cha juu
  lenye hali ya hitilafu ya HTTP (`!providerResponse.ok`), na kabla ya
  uainishaji wowote kuendeshwa, ili kila mtumiaji wa chini ya mkondo aone hali
  iliyorekebishwa. Hitilafu zilizopachikwa ndani ya mtiririko wa SSE wa `200` hufuata njia tofauti,
  ya baadaye ya uchanganuzi wa mtiririko na **hazijumuishwi** na kiunganishi hiki kwa sasa — hili ni
  zuio linalojulikana, ambalo bado halihitajiki kwa hali iliyowasilishwa vibaya na agentrouter (ambayo
  hujitokeza kama hali ya hitilafu ya HTTP).
- Ustahiki wa kujaribu tena: `429` imo katika `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), kwa hivyo hitilafu iliyorekebishwa
  hubeba dirisha halisi la kujaribu tena badala ya kuonekana kama `403` isiyoweza kuendelea.
- `60s` bandia ya `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  ni kile tu ambacho jibu lililorekebishwa humwambia **mteja**; si yenyewe
  muda wa ndani wa kusubiri/kufungiwa wa muunganisho — huo unasimamiwa
  kando na utaratibu wowote unaoshughulikia hitilafu iliyorekebishwa
  (ucheleweshaji unaoongezeka wa Connection Cooldown, §2, wenye msingi wa `3s` kwa watoa huduma
  wa API-key; au Model Lockout, §3, kwa watoa huduma wenye mgao wa kila modeli kama
  agentrouter). Ruta inaweza kustahiki kujaribu tena ndani ya mfumo mapema
  kuliko dirisha la 60s inalotangaza kwa mteja — nafasi hiyo imekusudiwa,
  si hitilafu.

Hitilafu za kudumu (`无权访问模型` ya agentrouter — hakuna ruhusa ya kufikia modeli hii)
HAZIREKEBISHWI KAMWE: `excludeMarkers` huzuia kanuni hata `textMarkers` zinapolingana,
kwa hivyo hitilafu huhifadhi hali yake ya awali na hakuna chochote kinachoijaribu tena milele. Kanuni
inayolingana ya uainishaji wa mtoa huduma
(`agentrouter-model-access-denied` katika `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, muda wa msingi wa kusubiri uliotangazwa wa `6h`) hutumiwa
na `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_kabla_ ya kurudi mapema kwa `FORBIDDEN` ya kategoria ya kawaida ya apikey, kwa sharti la
`honorsRuleLockScope(provider)` (#10334 — kwa sasa ni ya agentrouter pekee kupitia
orodha ya ruhusa ya `HONORS_RULE_LOCK_SCOPE_PROVIDERS` katika
`providerErrorRules.ts`). Muda wa kusubiri wa 6h uliotangazwa na kanuni hupitishwa kama
`fallbackResult.baseCooldownMs`, lakini bado hulisha njia iliyokuwepo tayari
ya kufungia mgao wa kila modeli (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ambayo haijabadilishwa na #10334 isipokuwa chanzo cha muda wa kusubiri):
hupunguzwa hadi `mlSettings.maxCooldownMs` ya mwendeshaji
(chaguomsingi `1_800_000ms` / 30min), kama ilivyo kwa kila ufungiaji mwingine wa modeli, na
_sababu ya ufungiaji iliyohifadhiwa_ hubaki `"forbidden"` iliyowekwa moja kwa moja hapo awali,
si `"auth_error"` ya kanuni — ni muda wa kusubiri pekee unaozingatiwa
mwisho hadi mwisho, si mfuatano wa sababu. Muunganisho wenyewe hubaki hai;
modeli nyingine kwenye muunganisho huohuo haziathiriwi.

Hitilafu za mgao zilizowasilishwa upya (`额度不足`) hufikia kanuni ya mtoa huduma katika uzalishaji
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bila muda wake wenyewe wa kusubiri uliotangazwa — chaguo-msingi
la kusubiri kwa muda unaoongezeka la safu ya uhifadhi linatumika). Tangu #10334, `scope` kwenye
`ProviderErrorRuleMatch` INATUMIWA kuanzia mwanzo hadi mwisho, lakini **tu** kwa watoa huduma walio katika
orodha ruhusu ya `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
kwa sasa ni `"agentrouter"` pekee, ikidhibitiwa kupitia `honorsRuleLockScope()`). Kwa kila
mtoa huduma mwingine, `scope` hubaki kuwa ya taarifa tu, kama ilivyokuwa kabla ya #10334.
`checkFallbackError` huwasilisha upeo wa kanuni iliyolingana kama
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ndicho kihalalishi cha pamoja kinachothibitisha kuwa
`ruleScope` ni salama kweli kuheshimiwa kama ishara ya muunganisho mzima inayoweza kujirekebisha
(scope `"connection"`, reason `quota_exhausted`, kamwe si `permanent`,
kamwe si `creditsExhausted` — kinga dhidi ya kanuni ya baadaye inayooanisha scope
`"connection"` na hali ya kudumu ya akaunti). Watumiaji wawili huiita:

- **Uhifadhi** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  badala ya kuingia kwenye tawi la kufungia **kwa kila modeli** la mtoa huduma wa kupitisha moja kwa moja
  (agentrouter ni `passthroughModels: true` → `hasPerModelQuota()`
  hurudisha `true`), huweka **muda wa kusubiri wa muda mfupi wa muunganisho** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, kamwe si hali ya mwisho
  (`credits_exhausted`/`banned`/`expired`) — ili muunganisho ujirekebishe wenyewe
  mara muda wa kusubiri unapoisha badala ya kuhitaji uwekaji upya wa kitambulisho kwa mikono.
  Hupitwa kwa miunganisho yenye `disableCooling: true` (#2997): kujiondoa huko
  huendelea hadi kwenye kufungia kwa kila modeli badala yake (kubadilishana faida kulikorekodiwa —
  tazama maoni ya msimbo juu ya tawi hilo).
- **Uelekezaji wa mchanganyiko ndani ya ombi lilelile** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): kihalalishi hichohicho huweka
  muunganisho katika seti ya kumbukumbu `exhaustedConnections`, ikiwa na ufunguo
  `${provider}:${connectionId}`. Hii hupita tu lengo lililosalia la OMBI LILELILE
  ambalo _lenyewe tayari lina `connectionId` hiyo kamili_ kwenye kipengee chake chenyewe
  cha lengo (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` kabla ya utafutaji wa `exhaustedConnections`) — mchanganyiko wa kawaida
  wa orodha ya modeli, ambapo malengo mengine hayana `connectionId` iliyobandikwa
  kwao wenyewe na moja hutatuliwa tu kwa kila utumaji kutoka kwenye kichwa cha jibu cha
  `X-OmniRoute-Selected-Connection-Id`, haufikii kamwe ulinganifu huo wa ufunguo. Kwa
  hali hiyo ya kawaida, ulinzi halisi dhidi ya sehemu iliyosalia kutumia tena
  akaunti ambayo mgao wake umeisha si Set hii — ni safu ya uhifadhi iliyo hapo juu
  (`rateLimitedUntil` ya muunganisho sasa iko katika wakati ujao) ikiunganishwa na
  kihalalishi hiki hiki kinachozuia `transientRateLimitedProviders` kwa
  hitilafu hiyo (tazama "Muundo wa hatua mbili" na maoni ya msimbo kwenye tawi la
  `isAgentrouterConnectionQuotaScope` katika `targetExhaustion.ts`): Set hiyo
  ikiachwa bila kuwekwa alama, ruhusa ya lazima ya `allowRateLimitedConnection` ya
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) HAITUMIKI kwa
  sehemu zilizosalia za mtoa huduma, kwa hivyo kichujio cha `rateLimitedUntil` cha
  uteuzi wa vitambulisho (`src/sse/services/auth.ts:1238`) huheshimiwa kama kawaida na
  sehemu iliyosalia huchagua muunganisho tofauti wa agentrouter ambao bado unastahiki
  au hushindwa kwa sababu hakuna vitambulisho vinavyopatikana — hailazimishi njia yake
  kurudi kwenye muunganisho ambao tawi hili limetoka kuuwekea muda wa kusubiri.

### Muundo wa hatua mbili: uwasilishaji upya wa hali, kisha uainishaji

Uwasilishaji upya wa hali (`upstreamStatusRestatement.ts`) na kanuni za uainishaji
wa mtoa huduma (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ni sajili tofauti ambazo zote hutumia kitambulisho cha mtoa huduma
na viashiria vya maandishi kama funguo, lakini huendeshwa katika sehemu tofauti na kutimiza
madhumuni tofauti: uwasilishaji upya huandika upya hali ya HTTP mapema katika `chatCore.ts`;
kanuni za uainishaji huchagua `reason` ya urejeaji na `scope` ya kufungia
(`model` / `provider` / `connection`) ndani ya `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Kanuni za uainishaji huona tu **maandishi** kamili ya hitilafu (yanayohitajika ili kulinganisha
viashiria vya sehemu kuu kama `额度不足`) kwa watoa huduma walioorodheshwa katika orodha ruhusu ya
`FULL_TEXT_RULE_PROVIDERS` katika `providerErrorRules.ts` — kwa sasa ni
`"agentrouter"` pekee. Kwa kila mtoa huduma mwingine wa **katalogi iliyojengewa ndani**,
`checkFallbackError` huipa `getProviderErrorRuleMatch` hitilafu iliyopangwa pekee
(`{code, type}`), ambayo inatosha kwa kanuni zinazotegemea kichwa/hali/msimbo lakini
haiwezi kuona viashiria vya maandishi ya sehemu kuu. Kisaidizi `resolveRuleMatchBody()`
hufanya uteuzi huu: maandishi kamili ya hitilafu kwa watoa huduma walio kwenye orodha ruhusu,
na hitilafu iliyopangwa kwa wengine. Kuongeza mtoa huduma **aliyejengewa ndani** kwenye
`FULL_TEXT_RULE_PROVIDERS` ni uamuzi wa wazi wa kujumuishwa kwa kila mtoa huduma —
hii ipo ili njia chaguo-msingi kwa kila mtoa huduma ambaye hayupo kwenye orodha
ibaki bila kubadilika hata kwa baiti moja.

`scope` ya kanuni (`model` / `provider` / `connection`) ni uamuzi tofauti wa kujumuishwa
na `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` huiwasilisha tu kama
`fallbackResult.ruleScope`, na watumiaji wa chini huiheshimu kama kitu kingine
zaidi ya lebo ya taarifa, kwa watoa huduma walio katika orodha ruhusu ya
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` katika faili hiyo hiyo (`ikidhibitiwa kupitia
honorsRuleLockScope()` — kwa sasa ni `"agentrouter"` pekee). Tazama "Hitilafu za mgao
zilizowasilishwa upya" hapo juu ili kuelewa kile ambacho ulinganifu wa `scope: "connection"`
hufanya kwa hakika mara mtoa huduma anapokuwa katika orodha hiyo ruhusu.

**#11104 — kanuni zilizotangazwa na opereta hupita orodha zote mbili za ruhusa.** Opereta anaweza
kutangaza kanuni ya kila mtoa huduma wakati wa utekelezaji kupitia `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
bila kuhariri faili hii. Kuweka kanuni ya opereta nyuma ya
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — orodha za ruhusa
zinazokusudiwa kulinda tabia **chaguomsingi** ya kanuni zilizojengewa ndani za katalogi —
kungefanya utaratibu wa mipangilio kutofanya kazi kwa kila mtoa huduma isipokuwa wale ambao tayari
wameorodheshwa hapo, kwa kuwa kutangaza kanuni tayari ni idhini ya wazi ya
opereta. `resolveRuleMatchBody()` na `honorsRuleLockScope()` zote hukagua
`hasOperatorRuleForProvider()` kwanza: mtoa huduma mwenye kanuni ya opereta hupata
maandishi ghafi ya hitilafu na `scope` yake iliyotangazwa huheshimiwa, bila kujali
kama pia anaonekana katika mojawapo ya orodha hizo za ruhusa.

**Pengo linalojulikana — `providerRuleRegistry` haishauriwi kamwe kwa HTTP 400.**
Tawi la `BAD_REQUEST` la `checkFallbackError` huainisha hali ya 400 kikamilifu
kupitia safu zake lenyewe za ruwaza (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, n.k. katika `accountFallback.ts`) na hurudisha matokeo kabla
tawi la `configuredRule`/`getProviderErrorRuleMatch` lililo juu yake kufikiwa.
Kanuni ya katalogi iliyojengewa ndani (au kanuni ya opereta) yenye `status: 400` ni
halali kisintaksia lakini haitawahi kutekelezwa. Hakuna kanuni iliyopo inayolenga 400 kwa sasa,
kwa hiyo hakuna chochote katika uzalishaji kinachoathiriwa — lakini kanuni ya 400 ya baadaye inahitaji
tawi hili libadilishwe kwanza, jambo ambalo ni badiliko kubwa zaidi kuliko kuongeza kanuni (linaainisha
upya 400 kwa kila mtoa huduma ambaye tayari anategemea tabia ya safu za ruwaza)
na liko nje ya wigo wa kuongeza kanuni ya mtoa huduma mmoja.

### Kuongeza lango jipya linalowasilisha vibaya kiasi kinachoruhusiwa

1. Sajili safu moja ya kanuni katika `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Hakikisha `textMarkers`
   ni mahususi kwa mtoa huduma; usiwahi kutumia tena vifungu vya jumla vya Kiingereza vinavyogongana na
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Kwa hiari, sajili kanuni za uainishaji katika
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ili kuchagua
   wigo sahihi wa kufunga (`connection` kwa kiasi kinachoruhusiwa cha akaunti nzima, `model` kwa
   hitilafu za kila modeli). Hatua hii huanza kufanya kazi katika uzalishaji tu kwa
   watoa huduma ambao kanuni zao zinahitaji maandishi kamili ya hitilafu (viashiria vya mwili): ongeza
   kitambulisho cha mtoa huduma kwenye `FULL_TEXT_RULE_PROVIDERS` katika faili hiyo hiyo — vinginevyo
   `checkFallbackError` huipa kanuni hitilafu iliyoundwa ya
   `{code, type}` pekee na kanuni ya maandishi ya mwili haitawahi kulingana na trafiki halisi.
   Kanuni zinazolingana kwa kutumia `status`/`headers` pekee (kama za Opencode au
   Minimax) hazihitaji idhini hii. Kando na hayo, ikiwa kanuni inatangaza
   `scope: "connection"` na lengo ni kipindi halisi cha kusubiri kinachohusu muunganisho mzima
   pamoja na kuruka mchanganyiko ndani ya ombi lilelile (si lebo ya taarifa tu), ongeza
   kitambulisho cha mtoa huduma kwenye `HONORS_RULE_LOCK_SCOPE_PROVIDERS` katika faili hiyo hiyo — hiki
   ndicho kinachodhibiti matumizi ya aina ya `isAgentrouterConnectionQuotaScope()` katika
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) na
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bila hicho, `scope`
   bado hupitishwa kupitia `fallbackResult.ruleScope` lakini hakuna kinachoifanyia kazi.
3. Ongeza majaribio ya vitengo yanayoakisi `tests/unit/upstream-status-restatement.test.ts`
   na `tests/unit/agentrouter-error-rules.test.ts` (yakijumuisha
   vilinzi vya not-permanent / not-creditsExhausted, na — ikiwa mtoa huduma anahitaji
   orodha ya ruhusa — jaribio linalothibitisha kwamba `resolveRuleMatchBody()` hurudisha
   maandishi kamili kwa mtoa huduma huyo pekee).

Hakuna mabadiliko yanayohitajika kwenye `chatCore.ts`, `classifyError`, au combo.

#### Kufunga kwa makundi ya egress (#10880)

Watoa huduma katika `EGRESS_BUCKETED_LOCK_PROVIDERS` (familia ya opencode) huchukuliwa
kama upstream iliyowekwa katika makundi kwa IP (kiwango cha bure cha opencode huwekwa katika makundi kwa IP, si
kwa akaunti — angalia #9611): status-429 iliyoainishwa kama `quota_exhausted`
**au** `rate_limit_exceeded` huweka katika kipindi cha kusubiri kila muunganisho wa familia iliyoruhusiwa
ambao IP yake ya mwisho inayojulikana ya egress inalingana na ya muunganisho ulioshindwa, kabla
mzunguko haujajaribu miunganisho hiyo
— hivyo kuepuka miito N-1 ya upstream ambayo imehakikishwa kushindwa (muundo sawa na #10460/#10525).
`rate_limit_exceeded` imejumuishwa kwa makusudi: kwenye njia ya `markAccountUnavailable`,
kanuni mahususi za opencode hazilingani kamwe (hakuna headers/body zinazokabidhiwa kwa
`checkFallbackError`, opencode haipo katika `FULL_TEXT_RULE_PROVIDERS`), kwa hiyo 429
ambayo mwili wake una maandishi ya kiasi kinachoruhusiwa cha usajili ("monthly usage limit
reached") huainishwa kama `quota_exhausted` na fallback ya maandishi ya kiasi kinachoruhusiwa
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; kipindi cha kusubiri cha saa 1) kabla
kanuni ya `status_429` kufikiwa — ilhali 429 isiyo na maandishi ya kiasi kinachoruhusiwa (ukomo wa kawaida
wa kasi) huainishwa kupitia kanuni ya `status_429` kama `rate_limit_exceeded`
na bado huiweka familia ya IP katika kipindi cha kusubiri. Kwa mtoa huduma aliye katika orodha ya ruhusa, ukomo wa kasi
uliowekwa katika makundi kwa IP ni ishara sawa na kiasi kilichoisha. Mipaka ya wazi:

- **Juhudi kadiri iwezekanavyo**: kufuli hutafuta `egress_ip` ya mwisho inayojulikana ya muunganisho
  kutoka `proxy_logs` (dirisha la saa 24, kwa ulandanishi, bila kache). Kache ikiwa tupu (`egress`
  IP haijawahi kuchunguzwa) au hakuna safu → muunganisho unaoshindwa bado unawekwa katika kipindi cha kusubiri na
  tawi (hurekodiwa kama ilivyo leo), ila hakuna muunganisho mwingine unaofungwa.
- **Kamwe si hali ya mwisho**: kipindi cha kusubiri ni dirisha la kiasi kinachosasishwa
  (`testStatus: "unavailable"`); hali ya kudumu kamwe haitolewi kutokana na
  ishara ya kiwango cha IP. Miunganisho ya `disableCooling` huruka tawi hili kabisa.
- **Kiwango cha kufuli hubadilika kwa familia iliyo kwenye orodha ya kuruhusiwa**: haya ni mabadiliko ya wigo,
  si uboreshaji wa miunganisho mingine pekee. opencode ni mtoa huduma wa `passthroughModels`,
  kwa hiyo kabla ya tawi hili, 429 ilisababisha kufungiwa kwa kila MODEL; sasa
  husababisha kipindi cha kusubiri cha muunganisho — ikijumuisha opereta anayetumia muunganisho mmoja
  bila muunganisho mwingine wowote. Hiki ndicho kiwango ambacho jedwali la sheria la opencode
  tayari linatangaza kuwa sahihi (`scope: "connection"`,
  `providerErrorRules.ts`), lakini hakijawahi kuheshimiwa hadi sasa kwa sababu opencode haipo katika
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Tawi huandika kipindi cha kusubiri cha muunganisho
  unaoshindwa pamoja na `backoffLevel` lenyewe, likiakisi tawi la agentrouter
  lenye wigo wa muunganisho, kisha hurudi — kizuizi cha kila modeli na
  njia ya jumla iliyo hapa chini hazifikiwi kamwe.
- **Combo imejumuishwa**: kama tawi la agentrouter, wigo huu kwa makusudi
  hupuuza upunguzaji wa `persistUnavailableState`/`isCombo` ambao mwitaji wa combo
  hutumia kwa 429. Kufungiwa kwa kila modeli si aina dhaifu zaidi ya wigo huu,
  bali ni kipimo kisicho sahihi: hakisemi chochote kuhusu IP iliyomaliza kiasi chake, kwa hiyo mzunguko wa
  combo ungeendelea kupoteza ombi moja ambalo limehakikishwa kushindwa kwa kila muunganisho mwingine.
- **Usalama wa miunganisho mingine**: muunganisho mwingine ambao tayari uko katika hali ya mwisho (banned/credits_exhausted)
  au tayari uko katika kipindi kirefu zaidi cha kusubiri hauandikwi upya kamwe.
- **Orodha ya kipekee ya kuruhusiwa**: kupanua `EGRESS_BUCKETED_LOCK_PROVIDERS` ni
  uamuzi wa wazi wa mmiliki; hakuna uunganishaji wa jumla (muundo #10334/#10419). Hoja ya
  miunganisho mingine hufungamanisha orodha hiyo hiyo ya kuruhusiwa badala ya kuirudia kama thamani halisi ya SQL,
  kwa hiyo kuipanua hubaki kuwa badiliko la mstari mmoja.
- **Mzunguko wa IP ya egress, katika pande zote mbili**: dirisha la utafutaji (saa 24) ni pana
  zaidi sana kuliko TTL ya kache ya IP ya egress (dakika 5), kwa hiyo "IP ya mwisho inayojulikana" ni historia,
  si hali ya sasa. Ikiwa proksi ya muunganisho ilizunguka ndani ya dirisha hilo,
  kufuli kunaweza **kukosa** IP inayotumiwa kwa pamoja kwa kweli (IP iliyorekodiwa ni ile mpya,
  ambayo kiasi chake hakijaisha) — na kwa namna sawia kunaweza **kuweka katika kipindi cha kusubiri muunganisho mwingine ambao tangu
  wakati huo umehama** kutoka IP iliyomaliza kiasi chake. Hali ya pili hugharimu muunganisho huo mwingine
  dirisha moja la kipindi cha kusubiri; zote mbili zinakubaliwa kama vikomo vya juhudi kadiri iwezekanavyo vya utafutaji
  unaotegemea historia.
- **Gharama**: uchanganuzi mbili wenye mipaka wa `proxy_logs` (uliochujwa kwa dirisha kupitia
  `idx_pl_timestamp`), katika marudio ya 429 pekee. Hakuna faharasa mpya (uhamishaji 134
  YAGNI). Ilipimwa kwenye nakala ya DB ya trafiki halisi yenye ukubwa wa wastani;
  mfumo wenye kiwango kikubwa cha maombi huhifadhi kwa uwiano safu nyingi zaidi ndani ya dirisha lilelile.

---

## Vipengele Vingine vya Ustahimilivu

- **Mikakati 19 ya uelekezaji** (kipaumbele, uzani, mzunguko, upeanaji wa muktadha, kujaza kwanza, p2c, nasibu, iliyotumika kwa uchache zaidi, iliyoboreshwa kwa gharama, inayozingatia uwekaji upya, dirisha la uwekaji upya, nafasi ya ziada, nasibu madhubuti, otomatiki, lkgp, iliyoboreshwa kwa muktadha, iliyoboreshwa kwa akiba, muunganisho, mfululizo) — angalia [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Uelekezaji unaozingatia uwekaji upya** (v3.8.0) — huweka miunganisho katika kipaumbele kulingana na muda wa kuweka upya mgao.
- **Upunguzaji wa hali ya chinichini** — Responses API `background: true` hubadilishwa kuwa usawazishaji huku onyo likitolewa.
- **Ugunduzi badilifu wa kikomo cha zana** — hupunguza matumizi ya watoa huduma vikomo vya idadi ya zana vinapofikiwa.
- **Njia mbadala ya dharura** — inadhibitiwa na `OMNIROUTE_EMERGENCY_FALLBACK`; waendeshaji wanaweza kuibatilisha kutoka kwenye ukurasa wa Feature Flags bila kuanzisha upya.

---

## Utatuzi

- Majibu ya mchanganyiko wenye uzani ni `503 all_targets_cooling_down` (`Retry-After` imewekwa, na `diagnostics.excluded` huorodhesha kila lengo lenye `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → mkusanyiko umesanidiwa na kuunganishwa, lakini kila lengo limetengwa na kipima muda cha ustahimilivu; onyo la `[COMBO] Weighted selection: every target excluded before dispatch — …` hutaja sababu na sekunde zilizosalia. `404 no_executable_targets` kutoka kwenye mchanganyiko huohuo humaanisha kuwa hakuna kipima muda cha ustahimilivu kilichohusika (hakuna cha kuendesha, au kila akaunti ilishindwa katika ukaguzi wa upatikanaji). Imeundwa katika `open-sse/services/combo/pinRecovery.ts` kutokana na vizuizi vilivyokusanywa katika `targetResolution.ts`.
- Funguo zote za mtoa huduma zimerukwa → angalia hali ya kizuia hitilafu NA `rateLimitedUntil`/`testStatus` ya kila muunganisho.
- Mtoa huduma ametengwa kabisa baada ya dirisha la kuweka upya → msimbo unasoma `state` ghafi badala ya `getStatus()`/`canExecute()`.
- Ufunguo mmoja unashindwa, mingine inapaswa kufanya kazi → pendelea muda wa kusubiri wa muunganisho kuliko kizuia hitilafu.
- Muundo mmoja pekee unashindwa → pendelea kufungiwa kwa muundo kuliko muda wa kusubiri wa muunganisho.
- Hali inapaswa kujirekebisha lakini haifanyi hivyo → angalia muhuri wa muda wa baadaye + njia ya usomaji inayosasisha hali iliyokwisha muda. Hali za kudumu zinahitaji mabadiliko ya mikono.

---

## Alama za Kipekee za TLS na Ufichaji

Ufichaji mahususi kwa kila mtoa huduma (JA3/JA4, CCH, ufichaji) umeandikwa kando — angalia `docs/security/STEALTH_GUIDE.md` (git; haijakusanywa ndani ya `/docs`).

---

## Majaribio ya ustahimilivu (Awamu ya 8 · Kizuizi C)

Zaidi ya majaribio ya vitengo kwa mantiki ya ustahimilivu, majaribio matatu hujaribu mazingira ya utekelezaji chini ya
hali halisi za shinikizo/kushindwa (yote ni ya ujumuishaji/usiku — hakuna linalozuia PR):

| Jaribio                | Kinachofanywa                                                                                                                                                                                                                     | Uendeshaji                                  |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Chaos                  | Nodi bandia ya upande wa juu huingiza ucheleweshaji halisi/uwekaji upya/kuisha kwa muda/503; huthibitisha kwamba kivunja mzunguko hufunguka/hurejea na `checkFallbackError` huainisha 503 kama njia mbadala inayoweza kurejeshwa. | `RUN_CHAOS_INT=1 npm run test:chaos`        |
| Ukuaji wa heap         | Takriban mitiririko 500 kwa kila `createSSEStream` chini ya `--expose-gc`; hushindwa ikiwa heap inakua zaidi ya kiwango cha juu (kinga ya OOM #3069).                                                                             | `npm run test:heap`                         |
| Jaribio endelevu la k6 | Mzigo endelevu dhidi ya `/api/monitoring/health`; vizingiti vya p95/hitilafu.                                                                                                                                                     | `k6 run tests/load/k6-soak.js` (kila usiku) |

Huratibiwa na `.github/workflows/nightly-resilience.yml` (cron + dispatch). Katika
`test:integration` chaguomsingi, majaribio ya chaos na heap hujiruka yenyewe (bila `RUN_CHAOS_INT`/`--expose-gc`).

---

## Tazama Pia

- [Mwongozo wa Usanifu](./ARCHITECTURE.md) — Usanifu wa mfumo na vipengele vya ndani
- [Mwongozo wa Mtumiaji](../guides/USER_GUIDE.md) — Watoa huduma, michanganyiko, ujumuishaji wa CLI
- [Injini ya Michanganyiko Otomatiki](../routing/AUTO-COMBO.md) — Uwekaji alama wa vipengele 16, vifurushi vya hali
