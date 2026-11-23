# Resilience Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute għandu tliet mekkaniżmi distinti iżda relatati ta’ reżiljenza. Kull wieħed għandu ambitu u skop differenti. Żommhom separati meta tkun qed tiddibaggja l-imġiba tar-routing.

![Mudell ta’ reżiljenza bi 3 saffi](../diagrams/exported/resilience-3layers.svg)

> Sors: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker tal-Fornitur

**Ambitu:** il-fornitur kollu (eż., `glm`, `openai`, `anthropic`).

**Skop:** iwaqqaf it-traffiku milli jintbagħat lil fornitur li qed ifalli ripetutament fil-livell upstream/tas-servizz.

**Implimentazzjoni:**

- Klassi ewlenija: `src/shared/utils/circuitBreaker.ts`
- Konnessjoni: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API tal-istatus: `GET /api/monitoring/health`
- API tar-reset: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Tabella tad-DB: `domain_circuit_breakers`

**Stati:**

- `CLOSED` — traffiku normali permess
- `DEGRADED` — it-traffiku għadu permess, iżda qed jiġu ssorveljati aktar fallimenti tal-fornitur
- `OPEN` — il-fornitur huwa temporanjament imblukkat; il-combo routing jaqbżu
- `HALF_OPEN` — għadda l-ħin ta’ stennija tar-reset; talba ta’ prova hija permessa

**Valuri predefiniti konfigurabbli (`open-sse/config/constants.ts`, esposti f’Dashboard → Settings → Resilience):**

| Klassi      | Degradat wara | Jinfetaħ wara   | Ħin ta’ stennija tar-reset |
| ----------- | ------------- | --------------- | -------------------------- |
| OAuth       | 5 fallimenti  | 8 fallimenti    | 60s                        |
| Ċavetta API | 7 fallimenti  | 12-il falliment | 30s                        |
| Lokali      | derivat       | 2 fallimenti    | 15s                        |

`degradationThreshold` jikkontrolla meta fornitur jidħol fl-istat `DEGRADED`; `failureThreshold` jikkontrolla meta jinfetaħ u jinqabeż. Il-profili tal-fornituri lokali għadhom mhumiex esposti fil-paġna tas-settings tar-Reżiljenza.

**Kodiċijiet li jattivawh:** l-istatuses fil-livell tal-fornitur `[408, 500, 502, 503, 504]` biss. Tattivahx għal żbalji fil-livell tal-kont (il-biċċa l-kbira tal-401/403/429 — dawn jappartjenu għall-cooldown jew il-lockout).

**Irkupru għażżien:** meta jiskadi `OPEN`, `getStatus()`, `canExecute()`, `getRetryAfterMs()` jaġġornaw l-istat għal `HALF_OPEN`. Mhu meħtieġ ebda tajmer fl-isfond.

---

### Cooldown globali fakultattiv tal-Fornitur (kontroll tat-tieqa)

Ir-raba’ saff, **fakultattiv** (`PROVIDER_COOLDOWN_ENABLED`, **mitfi** b’mod predefinit), iżomm
memorja bejn it-talbiet tal-fornituri li qed ifallu fi
`open-sse/services/providerCooldownTracker.ts`, li tiġi kkonsultata mir-riżoluzzjoni tal-miri
combo sabiex talbiet combo konsekuttivi jieqfu jerġgħu jgħaddu minn fornitur li jkun għadu
kemm falla. L-entrati fil-livell tal-fornitur jirrispettaw il-kontroll tat-tieqa `PROVIDER_PROFILES`:

| Profil      | jattiva wara (`providerFailureThreshold`) | fi żmien (`providerFailureWindowMs`) | jibqa’ f’cooldown għal (`providerCooldownMs`) |
| ----------- | ----------------------------------------: | -----------------------------------: | --------------------------------------------: |
| OAuth       |                                      `10` |                              `15min` |                                        `5min` |
| Ċavetta API |                                      `15` |                              `30min` |                                       `10min` |

Taħt il-limitu, il-fornitur **ma jitqiesx** li jinsab f’cooldown; suċċess ineħħi
t-tieqa. L-entrati fil-livell tal-konnessjoni (`provider:connectionId`) minflok iżommu
l-backoff esponenzjali `minRetryCooldownMs → maxRetryCooldownMs`. Sovrastrutturi:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Kontroll kontra rigressjonijiet: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Perjodu ta' Stennija tal-Konnessjoni

**Ambitu:** konnessjoni/kont/ċavetta waħda ta' fornitur.

**Għan:** taqbeż ċavetta ħażina waħda filwaqt li konnessjonijiet oħra għall-istess fornitur ikomplu jaqdu t-talbiet.

**Implimentazzjoni:**

- Immarkar bħala mhux disponibbli: `src/sse/services/auth.ts::markAccountUnavailable()`
- Għażla: `getProviderCredentials*` fl-istess fajl
- Kalkolu tal-perjodu ta' stennija: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Settings: `src/lib/resilience/settings.ts`

**Oqsma għal kull konnessjoni:**

- `rateLimitedUntil` — timestamp sa meta jiskadi l-perjodu ta' stennija
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — kontatur ta' backoff esponenzjali

**Perjodi ta' stennija predefiniti:**

- Bażi għal OAuth: 5s
- Bażi għal ċavetta tal-API: 3s
- 429 għal ċavetta tal-API: jippreferi `Retry-After` mill-upstream/intestaturi ta' reset/test ta' reset li jista' jiġi pproċessat
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Protezzjoni kontra t-thundering herd:** tipprevjeni milli fallimenti konkorrenti jestendu żżejjed il-perjodu ta' stennija jew iżidu `backoffLevel` darbtejn.

**L-iżbalji 429 tal-limitu tal-konkorrenza ma javvanzawx fuq is-sellum tal-backoff.** `429` li l-body tiegħu jirrapporta
limitu tal-konkorrenza ("wisq talbiet konkorrenti", "limitu tal-konkorrenza", "limitu ta'
talbiet paralleli", GLM `并发数过高`) ifisser li l-kont huwa tajjeb iżda okkupat.
`checkFallbackError()` jirritorna r-raġuni `concurrency_limited`: aqleb għall-konnessjoni
li jmiss issa, poġġi lil din f'perjodu ta' stennija fiss ta' `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) jew skont
l-indikazzjoni tal-upstream dwar meta terġa' tipprova, żomm `backoffLevel` mhux mibdul, u ssettja `skipProviderBreaker`.
Body espliċitu dwar il-kwota xorta jieħu preċedenza, għalhekk body li jaqbel ukoll ma' mudell ta' kwota jibqa' verdett
ta' kwota. Sejbien: `looksLikeConcurrencyLimit()` f'`src/shared/utils/classify429.ts`;
verdett: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (il-
`FailureKind` tal-breaker) ma jinbidilx u xorta jaqra `rate_limit` għal dawn il-bodies.

**Waqfiet fil-kontenut tal-stream ma jpoġġux il-kont f'perjodu ta' stennija.** Meta l-watchdog tal-waqfien tal-kontenut
(`open-sse/utils/streamHandler.ts`) jieqaf jipprova fuq stream li ma bagħat ebda output tal-mudell
fil-ħin, `markAccountUnavailable()` jirreġistra l-iżball fuq il-konnessjoni iżda ma jissettja ebda
perjodu ta' stennija: il-waqfien jappartjeni għal dik it-talba, u ħafna drabi jkun pass twil ta' raġunament li għadu ma ta
ebda output. L-operaturi jistgħu jerġgħu jattivaw dan b'`resilienceSettings.streamStallCooldown.enabled`
(il-valur predefinit huwa `false`).

**Il-frames tar-raġunament jerġgħu jibdew il-baġit tal-waqfien tal-kontenut.** Mudell ta' raġunament jista' jaħseb għal
minuti qabel l-ewwel token viżibbli tiegħu: Claude jibgħat bħala stream frames `thinking_delta` li t-test
tal-ħsieb tagħhom jista' jkun vojt, u l-Responses API tibgħat bħala stream element ta' raġunament wara
ieħor. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) jagħraf
dawn il-frames, u l-watchdog jerġa' jibda l-baġit tiegħu ma' kull wieħed minnhom minflok jikkanċella l-
pass. Xorta mhumiex output tal-mudell, għalhekk pass li jintemm b'raġunament biss xorta jiġi
rrapportat bħala vojt, u pass li jieqaf jirraġuna u jibgħat biss heartbeats xorta jattiva
l-watchdog.

Il-frames binarji `reasoningContentEvent` ta' Kiro b'firma mhux vojta jippreservaw din
l-attività ta' raġunament permezz tal-executor bħala delta `reasoning_content` vojta. Il-firma ma
tintbagħatx. Metadata, frames mhux kompluti u firem vojta ma jerġgħux jibdew il-
baġit tal-kontenut; it-timeout indipendenti tal-stream attiv u l-kanċellazzjoni mill-klijent xorta
japplikaw (`open-sse/executors/kiro/reasoning.ts`).

**Stati terminali (MHUX perjodi ta' stennija):**

- `banned` — issettjat mis-sejbien ta' kelma pprojbita / projbizzjoni tal-kont (ara [BAN_DETECTION](../security/BAN_DETECTION.md)), u minn tliet rifjuti konsekuttivi għal kull talba mill-upstream (`request_rejected`, eż. Anthropic OAuth 403 "Talba mhux permessa" — `open-sse/services/requestRejectedStreak.ts`); rifjut wieħed ipoġġi biss il-konnessjoni f'perjodu ta' stennija
- `expired` (jgħaddi għal stat terminali wara għadd limitat ta' tentattivi mill-ġdid — `EXPIRED_RETRY_MAX = 3` b'backoff esponenzjali — sabiex żbalji temporanji ta' OAuth ikunu jistgħu jirkupraw waħedhom qabel ma l-kont jiġi diżattivat b'mod permanenti)
- `credits_exhausted`

Dawn jippersistu sakemm jinbidlu l-kredenzjali jew operatur jirrisettjahom. Tiktibx fuq stati terminali bi stat temporanju ta' perjodu ta' stennija.

**Irkupru għażżien:** meta `rateLimitedUntil` ikun għadda, il-konnessjoni terġa' ssir eliġibbli. Wara użu b'suċċess, `clearAccountError()` ineħħi l-oqsma kollha tal-iżball.

### Limitu tal-użu ta' Claude OAuth: korsija bi prijorità aktar baxxa + reset tal-limitu tas-sessjoni

**Ambitu:** konnessjoni waħda ta' abbonament Claude (OAuth). Iż-żewġ funzjonalitajiet huma **attivati b'għażla għal kull
konnessjoni** (Editja l-konnessjoni → sezzjoni Claude → `lowPriorityMode` / `autoLimitReset` f'
`providerSpecificData`, it-tnejn diżattivati b'mod predefinit) u jirriflettu l-kmandi `/low-priority` u
`/limit-reset` ta' Claude Code (il-kuntratt tal-wire inqabad minn Claude Code 2.1.263).

**Implimentazzjoni:**

- Magna tal-istati + klassifikazzjoni tar-rispons: `open-sse/services/claudeLowPriority.ts`
- Klijent tal-istatus/talba għar-reset: `open-sse/services/claudeLimitReset.ts`
- Hook tal-executor (injezzjoni tal-header + tentattiv mill-ġdid bl-istess kont): `open-sse/executors/base.ts::execute()`
- Persistenza tal-attivazzjoni b'għażla: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Attivatur:** il-limitu ta' użu ta' 5 sigħat — `429` li l-headers tiegħu jinkludu
`anthropic-ratelimit-unified-status: rejected` u, meta l-kont ikun eliġibbli,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ma jintbagħat xejn qabel dak l-ewwel 429 tal-limitu;
429 f'daqqa mingħajr headers unifikati jgħaddi mill-fluss normali tal-perjodu ta' stennija.

**Korsija bi prijorità aktar baxxa** (`lowPriorityMode`):

- Mal-429 tal-limitu, l-eżekutur jaċċetta l-offerta u immedjatament jerġa’ jipprova l-**istess**
  kont b’`anthropic-usage-limit: slow`; il-korsija tibqa’ attiva sal-ħin imħabbar minn
  `anthropic-ratelimit-unified-reset` (+60s ta’ marġni) u kull talba f’dak il-perjodu jkollha
  l-header. Il-429 interċettat qatt ma jasal għand `handleChatCore`, għalhekk il-konnessjoni
  **ma** titqegħidx fi stat ta’ cooldown u ma tinbidilx ma’ oħra.
- `anthropic-ratelimit-unified-slow-status` fuq tweġibiet sussegwenti: `active` / `not_needed`
  jżommu l-korsija; `slot_busy` (429) jew `529` jistennew għal
  `anthropic-ratelimit-unified-slow-retry-after` tas-server (20s b’mod awtomatiku, limitat għal
  5–600s, b’jitter ta’ ±30%) u jerġgħu jippruvaw, sal-limitu ta’
  `anthropic-ratelimit-unified-slow-max-wait` (20 minuta b’mod awtomatiku, limitat għal
  minuta–6 sigħat) — wara dan il-korsija tintemm u perjodu ta’ waqfien ta’ 10 minuti jimblokka
  aċċettazzjoni mill-ġdid. Barra minn hekk, l-istennija hija limitata għal kemm ikun fadal
  mit-timeout tal-istess talba għall-bidu upstream (`resolveFetchStartTimeout`, 10 minuti
  b’mod awtomatiku) nieqes marġni ta’ 5 s: mingħajr dak il-limitu, il-ħin massimu ta’ stennija
  awtomatiku ta’ 20 minuta jdum aktar mit-talba u l-istennija tiġi abortita f’nofsha,
  u b’hekk jidher `TimeoutError` minflok tmiem ikkontrollat b’`max_wait` + perjodu ta’ waqfien.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, qlib ta’ tieqa ta’ 5h, jew
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (li jtemmha bħala
  `extra_usage` bi kwalunkwe status, peress li l-użu żejjed imħallas issa jkopri l-limitu)
  itemmu l-korsija; it-tweġiba mbagħad tgħaddi għall-fluss normali tal-cooldown.
  `budget_exhausted` jinżamm fil-memorja sal-ħin imħabbar għar-reset tal-baġit (≤ 8 ijiem).
- Il-kontroll tal-limitu jitħaddem wara t-tentattivi mill-ġdid interni tal-eżekutur fl-istess
  tentattiv, skattati minn 400 (editjar tal-kuntest, limiti fuq thinking/effort, tagħlim
  awtomatiku tal-parametri), għalhekk 429 tal-limitu li jidher biss waqt wieħed minn dawk
  it-tentattivi mill-ġdid xorta jiġi interċettat minflok ma jasal sal-fluss tal-cooldown.
- L-istat jinżamm fil-memorja għal kull konnessjoni (restart jiswa 429 tal-limitu addizzjonali
  wieħed biex jerġa’ jiġi aċċettat).

**Reset tal-limitu tas-sessjoni** (`autoLimitReset`, ippruvat qabel il-korsija meta t-tnejn ikunu attivi):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blokka `juniper_tide`;
  meta `arm: "reset"` u `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` b’
  `{ "program": "juniper_tide" }` (UUID tal-organizzazzjoni minn
  `providerSpecificData.organizationUUID`, b’bootstrap bħala riżerva).
- `result: reset|not_limited` → it-talba terġa’ tiġi ppruvata b’veloċità sħiħa (mingħajr
  slow header). `already_used` / `not_offered` iżommu fil-memorja `next_available_at`
  (ġimgħa b’mod awtomatiku); kwalunkwe falliment japplika backoff ta’ 15-il minuta.
  Ir-reset isir darba fil-ġimgħa u xorta jgħodd mal-limitu ta’ kull ġimgħa.

Kontrolli kontra rigressjonijiet: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinità tas-sessjoni (#7274)

**Ambitu:** sessjoni waħda tal-klijent (header `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) marbuta ma’ konnessjoni waħda, għal **kwalunkwe** fornitur.

**Għan:** iżżomm aġent b’diversi dawriet (Claude Code, aider, aġenti personalizzati) fuq l-istess kont bejn it-talbiet, biex tnaqqas it-telf ta’ kuntest bejn il-kontijiet u 429s ripetuti ta’ cold start fuq fornituri bi stat tas-sessjoni għal kull kont.

**Implimentazzjoni:**

- Riżoluzzjoni tat-TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Għażla/ħolqien tal-irbit: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Estrazzjoni tal-header (ġenerika, għal kwalunkwe fornitur): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabella persistenti tal-irbit: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Issettjar: `sessionAffinityTtlMs` (TTL globali f’ms, `0` jiddiżattivah) — `src/lib/db/settings.ts`. Ingħata isem ġdid minn `codexSessionAffinityTtlMs`, li kien biss għal Codex, permezz tal-migrazzjoni `124_generic_session_affinity_ttl.sql`, li tittrasferixxi kwalunkwe TTL ta’ Codex ikkonfigurat qabel bħala l-valur awtomatiku l-ġdid.

Qabel #7274, `resolveSessionAffinityTtlMs()` kien immedjatament jirritorna `0` għal kull fornitur ħlief `codex`, għalhekk l-issettjar tat-TTL (u l-headers tas-sessjoni) ma kellhom ebda effett imkien ieħor, minkejja li l-mekkaniżmu tal-irbit u l-estrazzjoni tal-header kienu diġà indipendenti mill-fornitur. It-tiswija neħħiet dak ir-ritorn bikri; it-TTL issa japplika b’mod uniformi għal kull fornitur ladarba jiġi ssettjat globalment għal aktar minn `0`.

It-tliet headers tal-affinità tas-sessjoni qatt ma jintbagħtu upstream — l-eżekuturi jibnu l-headers upstream tagħhom mill-bidu minflok jgħaddu l-headers tal-klijent, għalhekk dan jibqa’ biss ID intern għall-korrelazzjoni.

### Leases esklużivi tal-konnessjoni għal sessjonijiet immaniġġjati

**Ambitu:** klijent/sessjoni HTTP immaniġġjata u attiva waħda tkun is-sid ta’ konnessjoni OmniRoute eliġibbli waħda.

**Għan:** jipprovdi sjieda esklużiva u dejjiema tal-konnessjoni għal klijenti li jeħtieġu
separazzjoni stretta tar-routing bejn it-talbiet. Dan huwa differenti mill-affinità tas-sessjoni,
li hija preferenza ratba għall-kontinwità: lease esklużiv jippersisti l-istat taċ-ċiklu tal-ħajja
f’SQLite, jinforza l-uniċità globali tas-sid attiv u tal-konnessjoni attiva, u jirrifjuta
ġenerazzjoni skaduta qabel id-dispaċċ lill-fornitur.

Il-karatteristika trid tiġi attivata espliċitament għal kull API key. Key immaniġġjata jrid
ikollha l-ambitu `lease:exclusive` u lista espliċita u mhux vojta `allowedConnections`.
Kwalunkwe klijent HTTP jista’ juża l-endpoint taċ-ċiklu tal-ħajja; ma huma meħtieġa ebda
isem tal-klijent, user-agent, fornitur, metodu OAuth jew mudell. Il-lease jkun sid ta’
konnessjoni, mhux ta’ mudell, għalhekk bidla fil-mudell iżżomm l-irbit sakemm il-konnessjoni
tibqa’ eliġibbli b’mod normali. Ir-regoli normali tal-mudell, tal-kwota, tas-saħħa,
tal-cooldown u tal-allowlist jibqgħu awtorevoli u jistgħu jgħaddu l-istess ġenerazzjoni għal
konnessjoni eliġibbli u ħielsa oħra.

Iċ-ċiklu tal-ħajja huwa `POST /api/v1/session-leases` b’azzjonijiet JSON `acquire`, `renew`, u `release`.
It-talbiet ta’ inferenza mmaniġġjata jippreżentaw il-valur opak `X-OmniRoute-Lease-Owner` u l-valur eżatt
`X-OmniRoute-Lease-Generation`. Is-sid juża `vlo_` segwit minn 43 karattru base64url; jinħażen biss
il-hash SHA-256 tiegħu. Kull ċint finali tad-dispaċċ jorbot ukoll l-ID taċ-ċavetta API awtentikata u
l-ID tal-konnessjoni attiva. L-headers tal-kontroll tal-kiri jitneħħew mil-logs, mill-istampi miżmuma tat-talbiet, u
mill-headers tal-eżekutur upstream.

Jekk ir-routing ordinarju jkollu kandidati mmaniġġjati eliġibbli iżda kull kandidat disponibbli jkun okkupat minn
kirja attiva barranija, OmniRoute jirritorna HTTP `429`, il-kodiċi lease-capacity-unavailable, stat
waiting-for-capacity, u `Retry-After` limitat derivat mill-aktar skadenza rilevanti bikrija.
L-eliġibbiltà vojta ordinarja mhijiex kunflitt ta’ kiri u żżomm is-semantika eżistenti tagħha tal-iżbalji tar-routing.

Il-mekkaniżmi relatati jibqgħu separati:

- L-okkupazzjoni tas-sessjoni OAuth hija distribuzzjoni mhux stretta u lokali għall-proċess għall-kontijiet OAuth.
- Is-semafori tal-kont jagħtu permessi għall-konkorrenza tat-talbiet u jintemmu meta talba titlesta.
- Il-kirjiet esklużivi ta’ sessjonijiet immaniġġjati huma sjieda durabbli taċ-ċiklu tal-ħajja b’ċint tal-ġenerazzjoni.

---

## 3. Imblukkar tal-Mudell

**Ambitu:** it-tripla fornitur + konnessjoni + mudell.

**Ambitu taċ-ċavetta skont l-istatus:** l-istatus li jfalli jiddeċiedi f’liema ċavetta jinkiteb imblukkar
(`resolveLockoutScope()` f’`open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — sinjal ta’ kwota jew intitolament — jimblukkaw il-**familja tal-kwota**:
  għal codex, l-ambitu kollu `codex` / `spark` (kull mudell `gpt-5*` tal-
  konnessjoni), u għal fornituri oħra `getQuotaScopedModelForProvider()`.
- `404` jimblokka l-mudell bażiku (`getModelLockKey()` jirrestrinġi `not_found`).
- Kwalunkwe status ieħor — fallimenti tat-trasport/server `5xx` u l-
  `502` sintetizzat minn OmniRoute stess mill-validazzjoni tal-kwalità — jimblokka biss it-tliet elementi
  eżatti fornitur/konnessjoni/mudell. Stream ħażin fuq mudell wieħed mhuwiex evidenza
  dwar il-kwota tal-kont; qabel din ir-regola, rispons vojt wieħed fuq
  `codex/gpt-5.6-luna` kien ineħħi kull mudell `gpt-5*` ta’ dik il-konnessjoni mir-
  routing għal 2–30 minuta (b’eskalazzjoni), filwaqt li l-kwota tagħha kienet tibqa’ mhux mittiefsa.
- L-għażla espliċita `scope` ta’ min jagħmel is-sejħa dejjem tieħu preċedenza (Antigravity jgħaddi `"exact"`).

**Għan:** jiġi evitat li konnessjoni sħiħa tiġi diżattivata meta mudell wieħed biss ma jkunx disponibbli jew ikun limitat mill-kwota.

**Eżempji:**

- Fornituri bi kwota għal kull mudell li jirritornaw 429
- Fornituri lokali li jirritornaw 404 għal mudell nieqes wieħed
- Fallimenti ta’ permessi speċifiċi għall-fornitur għall-modalità/mudell (eż., modalitajiet Grok)

**Implimentazzjoni:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard tal-Perjodi ta’ Stennija tal-Mudelli (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Jelenka l-imblukkar attiv flimkien ma’: fornitur, konnessjoni, mudell, raġuni, expiresAt. L-operaturi jistgħu jerġgħu jattivaw mudell manwalment mill-kard.

**API REST:**

- `GET /api/resilience/model-cooldowns` — jelenka l-imblukkar attiv
- `DELETE /api/resilience/model-cooldowns` — riattivazzjoni manwali. Korp: `{provider, connection, model}`. Awtorizzazzjoni: management.

### Maniġer tal-Perjodi ta’ Stennija

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Paġna waħda għal kull konnessjoni li tkun barra mir-routing għal raġuni temporanja, minflok
ma tinfetaħ il-paġna ta’ kull fornitur. Din telenka l-perjodi ta’ stennija tal-konnessjonijiet, l-imblukkar tal-mudelli u l-
istati terminali, tneħħihom għal kull konnessjoni, għal għażla, jew għall-konnessjonijiet kollha ta’ fornitur,
u teditja r-regoli tal-perjodi ta’ stennija li jiġu rfinati l-aktar: `streamStallCooldown.enabled` u l-
perjodu ta’ stennija bażi `connectionCooldown` għal OAuth / API-key u l-għadd massimu ta’ passi ta’ backoff (issejvjati permezz ta’
`PATCH /api/resilience`). L-istati terminali (`banned`, `expired`, `credits_exhausted`) huma
elenkati iżda qatt ma jitneħħew minn hawn.

**API REST** (`src/lib/resilience/cooldownManager.ts`, awtorizzazzjoni: management):

- `GET /api/resilience/cooldowns[?provider=]` — konnessjonijiet bl-istatus, il-perjodu ta’ stennija li jifdal,
  il-livell ta’ backoff, l-aħħar tip ta’ żball u l-imblukkar tal-mudelli (mingħajr kredenzjali)
- `POST /api/resilience/cooldowns` — korp `{connectionIds: string[]}` jew
  `{all: true, provider?}`; jirritorna `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI tas-settings tal-imblukkar + irkupru bi tnaqqis wara suċċess (v3.8.23)

L-imblukkar tal-mudelli nbidel minn imġiba hardcoded dejjem attiva għal karatteristika kompletament konfigurabbli,
li trid tiġi attivata b’mod espliċitu, bil-kard tas-settings tagħha stess u b’mekkaniżmu ta’ rkupru awtokorrettiv.

**Kard tas-settings:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Din hija **distinta** mill-`ModelCooldownsCard` li tinqara biss imsemmija hawn fuq (li
_telenka_ biss l-imblukkar attiv) — il-kard il-ġdida _tikkonfigura l-parametri_. Il-valuri
predefiniti jinsabu f’`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Setting                 | Valur predefinit                 | Tifsira                                                                        |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Swiċċ ewlieni — l-imblukkar tal-mudelli huwa **mitfi b’mod predefinit**.       |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Status upstream li jgħoddu bħala falliment fl-ambitu tal-mudell.               |
| `baseCooldownMs`        | `120_000` (120 s)                | Tul inizjali tal-imblukkar għall-ewwel falliment.                              |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limitu massimu għall-perjodu ta’ stennija eskalat.                             |
| `maxBackoffSteps`       | `10`                             | Għadd massimu ta’ passi ta’ eskalazzjoni ta’ backoff esponenzjali.             |
| `useExponentialBackoff` | `true`                           | Jekk fallimenti ripetuti jeskalawx il-perjodu ta’ stennija b’mod esponenzjali. |

Is-settings jippersistu permezz tal-ħażna normali tas-settings u jiġu vvalidati permezz tal-
iskema tas-settings tar-reżiljenza; il-kard tillimita `baseCooldownMs`/`maxCooldownMs`
(b’`maxCooldownMs ≥ baseCooldownMs`) u `maxBackoffSteps`.

**Irkupru bi tnaqqis wara suċċess:** l-irkupru **mhuwiex** ibbażat biss fuq l-iskadenza tat-tajmer. Rispons
tajjeb inaqqas progressivament l-għadd ta’ fallimenti tal-mudell sabiex mudell li jkun irkupra
f’nofs il-perjodu jieqaf jeskala (u jitneħħielu l-imblukkar) qabel ma jintemm it-tajmer tiegħu. Meta destinazzjoni
combo tirnexxi, `open-sse/services/combo.ts` issejjaħ `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), li **jnaqqas bin-nofs** il-
`failureCount` maħżun (`Math.floor(failureCount / 2)`); meta jilħaq `0`, l-entrata tal-imblukkar
titħassar kompletament. Il-funzjoni korrispondenti `recordModelLockoutFailure()`
iżżid l-għadd (u teskala l-perjodu ta’ stennija) għal fallimenti fil-perjodu
ta’ eskalazzjoni. Dan it-tnaqqis wara suċċess jiżdied mal-iskadenza normali tat-tajmer —
kwalunkwe wieħed miż-żewġ mekkaniżmi jista’ jerġa’ jattiva mudell.

**Stat:** l-imblukkar jinżamm **fil-memorja** (`Map`s għal kull proċess ta’
`ModelLockoutEntry` indikati minn `provider:connectionId:model`, u imblukkar b’ambitu eżatt minn
`provider:connectionId:exact:model`), u ma jippersistix fid-
DB — jintilef meta jerġa’ jinbeda l-proċess. Is-_settings_ jippersistu; l-_istat_ tal-imblukkar attiv huwa temporanju.

---

## 4. Kontroll tal-Konkorrentiżmu għall-Quota-Share (v3.8.36)

Il-kontijiet b’abbonament (GLM, MiniMax, eċċ.) spiss jaċċettaw biss ~1–3 talbiet
konkorrenti; jekk jinqabeż dan il-limitu, jiġu attivati żbalji 429 u perjodi ta’ stennija. Dan huwa partikolarment serju taħt
kombinazzjonijiet **quota-share** (`qtSd/…`), fejn diversi kjavi tal-API jaqsmu kont upstream
wieħed. Tliet saffi jipprevjenu li kont kondiviż jiġi mgħarraq bit-talbiet.

### Limitu tal-konkorrentiżmu għal kull konnessjoni (`max_concurrent`)

Kull konnessjoni ta’ fornitur tista’ tiddikjara limitu massimu `max_concurrent`
(`provider_connections.max_concurrent`, issettjat fil-modal tal-konnessjoni / API / DB).
Ħallih vojt biex ma jkun hemm ebda limitu. Dan huwa l-kontroll ewlieni li jmexxi s-saff tas-serjalizzazzjoni
hawn taħt — issettjah għall-konkorrentiżmu reali tal-kont (eż. GLM ~1, MiniMax ~2).

### Limiti tal-konkorrentiżmu għal kull mudell (`modelConcurrency`)

Konnessjoni tista’ wkoll tiddikjara limiti massimi eżatti tal-konkorrentiżmu għal kull mudell
fil-mappa `rateLimitOverrides` tagħha:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Issettjah fil-modal tal-konnessjoni (**Sovrastrutturi tal-limiti tar-rata → Limiti tal-konkorrentiżmu
għal kull mudell**, `model=cap` wieħed għal kull linja) jew permezz ta’
`PATCH /api/providers/[id]` bl-istess struttura JSON. Semantika tal-kjavi:

- **Għall-konnessjoni kollha kontra speċifiku għall-mudell:** `maxConcurrent` jibqa’ l-limitu massimu kondiviż
  għall-konnessjoni kollha. Meta japplikaw it-tnejn, iż-żewġ gradi jinkisbu
  atomikament fl-istess grad kompost
  (`global → provider → account → model`); l-imġiba effettiva tkun dik tal-
  limitu applikabbli l-aktar strett.
- **Taqbil eżatt tal-kjavi tal-mudell:** il-kjavi hija s-sekwenza tal-mudell mgħoddija lill-
  eżekutur wara r-riżoluzzjoni tar-routing — normalment l-id tal-mudell upstream mingħajr prefiss
  (`glm-5`), mhux alias `provider/model` min-naħa tal-klijent (`zai/glm-5` ma
  jaqbilx ma’ `glm-5`). Il-valuri huma limiti ta’ talbiet konkorrenti espressi bħala numri sħaħ pożittivi.
- **Kju lokali, ebda skoperta:** it-talbiet żejda jistennew lokalment fil-kju bis-
  semantika eżistenti tal-kju/skadenza (żbalji ta’ ammissjoni ttajpjati `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute ma jiskoprix u ma
  jiddeduċix il-politika upstream — jinforza eżattament il-limiti massimi li kkonfigura l-operatur.
  Grad ta’ mudell saturat qatt ma jiddiżattiva lill-fornitur u qatt ma
  joħloq imblukkar permanenti tal-mudell; l-imġiba upstream ta’ 429/perjodu ta’ stennija/fallback
  tibqa’ l-mekkaniżmu ta’ riżerva għall-iżbalji.
- **Ambitu għal kull konnessjoni u għal kull proċess:** il-limiti japplikaw għal kull konnessjoni tad-database
  u jinżammu fil-memorja, għalhekk żewġ konnessjonijiet li jerġgħu jużaw l-istess kjavi tal-API upstream
  ma jikkoordinawx ma’ xulxin.
- **Mhux ikkonfigurat ifisser mingħajr tibdil:** jekk il-mappa titħalla barra (jew il-
  kamp fid-dashboard jitħalla vojt), ma jiżdied ebda grad tal-mudell. Eżempju ta’ konfigurazzjoni mingħajr
  ma jiġi affermat xi limitu universali tal-fornitur:

```text
glm-5=1
glm-4.7=3
```

### Serjalizzazzjoni tat-talbiet quota-share

Meta dispatch quota-share jimmira lejn konnessjoni li tiddikjara
`max_concurrent` pożittiv, it-talbiet konkorrenti lejn dak il-**kont** jiġu sserjalizzati permezz ta’
semaforu għal kull konnessjoni (kjavi `qsconn:<connectionId>`): it-talbiet żejda **jistennew fil-
kju** minflok jgħarrqu l-kont. Dan huwa **fail-open** — kju saturat
jew skadenza jkomplu mingħajr slot minflok qatt ma jirrifjutaw talba li tista’
tiġi mibgħuta. Attivah jew iddiżattivah f’**Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, attiv
b’mod awtomatiku). Mingħajr limitu massimu `max_concurrent`, l-imġiba ma tinbidilx.

> Il-grad tar-routing quota-share (`selectQuotaShareTarget`, DRR + P2C) huwa nnifsu
> fail-open u biss _inaqqas il-prijorità_ ta’ konnessjoni li laħqet il-limitu — b’
> pool b’konnessjoni waħda ma jistax jinforza limitu strett, għalhekk huwa dan is-semaforu li fil-fatt
> jikkontrolla l-għargħar.

### Tentattiv mill-ġdid sensittiv għall-perjodu ta’ stennija tal-kombinazzjoni

Għal kull strateġija ta’ kombinazzjoni (meta tkun attivata), talba li kieku tistabbilixxi 429
għal perjodu QASIR u tranżitorju ta’ stennija tistenna li jintemm u terġa’ tintbagħat minflok
ma tirritorna l-429 — dan ikopri twieqi TPM/RPM tal-klassi Gemini (~60s retry-after)
fuq kombinazzjonijiet b’diversi mudelli, eż. meta ż-żewġ miri ta’ kombinazzjoni ta’ 2 mudelli
jolqtu limitu tar-rata għal kull mudell. Dan huwa ristrett minn `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) f’**Settings → Resilience**. Qatt ma jistenna għal `quota_exhausted`
(imblukkat sa nofsillejl) jew għal raġunijiet ta’ awtentikazzjoni/ma nstabx.

L-istess grad ikopri l-każ ta’ qabel id-dispatch (#16319): meta kull mira ta’
kombinazzjoni tinqabeż qabel ma jsir kwalunkwe tentattiv minħabba li l-mudell tagħha jkun fi
stat ta’ mblukkar tranżitorju qasir, il-mogħdija b’ebda tentattiv tistenna li jintemm l-imblukkar taħt l-istess
limiti massimi u terġa’ tibgħat it-talba, minflok ma twieġeb b’
`503 ALL_TARGETS_SKIPPED` mingħajr indikazzjoni. Meta ebda stennija ma tkun permessa (il-limitu massimu, in-numru ta’ tentattivi jew il-baġit
ikun eżawrit, jew il-funzjonalità tkun diżattivata), ir-risposta finali tiġi aġġornata għal
`429 rate_limit_error` li tinkludi `retry_after` / `reset_at` mill-aktar
skadenza bikrija tal-imblukkar tranżitorju; l-imblukkar minħabba quota, awtentikazzjoni u ma nstabx jibqa’ jirritorna l-503 mingħajr indikazzjoni.

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

## 5. Kontroll tad-Dħul fil-Kju tat-Talbiet (v3.8.49 · ħarġa #6593)

**Ambitu**: il-kju lokali tar-rata massima għal kull fornitur+konnessjoni (`open-sse/services/rateLimitManager.ts`,
ibbażat fuq Bottleneck), saff wieħed taħt it-tliet mekkaniżmi ta’ hawn fuq.

**`maxWaitMs` jillimita l-istennija fil-kju; `executionMaxWaitMs` jillimita l-eżekuzzjoni.**
It-tnejn huma separati apposta, u l-ebda wieħed minnhom ma jaffettwa lill-ieħor.

`resilienceSettings.requestQueue.maxWaitMs` huwa l-**baġit tal-istennija fil-kju**:
ikopri l-istennija għal post għand il-fornitur u mbagħad iż-żmien mgħoddi fi stat QUEUED, u t-tajmer tiegħu
jitneħħa fil-mument li l-kompitu joħroġ minn QUEUED u jibda jiġi eżegwit
(`rateLimitManager.ts`, `wrappedFn`). Talba li taqbeż dan il-limitu qatt ma tasal
għand is-servizz upstream. Il-valur predefinit huwa 30000ms, ipprovdut minn `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
f’`src/lib/resilience/settings.ts` u ffissat minn
`tests/unit/ratelimit-admission-control-6593.test.ts`, sabiex bidla fih tagħmel
dak it-test aħmar minflok ma tħalli dan il-paragrafu jsir skadut mingħajr avviż.

`resilienceSettings.requestQueue.executionMaxWaitMs` huwa dak li Bottleneck
jirċievi bħala l-`expiration` tal-kompitu, li t-tajmer tiegħu jibda biss wara d-dispaċċ. Dan huwa
mekkaniżmu ta’ protezzjoni għal eżekuturi li m’għandhomx timeout upstream tagħhom stess, u
jiżdied sal-timeout tal-bidu tal-fetch tal-eżekutur meta dak ikun itwal, sabiex
ma jkunx jista’ jwaqqaf rispons b’saħħtu li jkun għadu għaddej. Il-valur predefinit huwa 600000ms (10 minuti).

L-għoti tal-baġit tal-kju lil `expiration` kien dak li qabel kien iwaqqaf gateways mhux inkrementali
f’nofs l-eżekuzzjoni — dawn leġittimament idumu għaddejjin għal minuti qabel jaslu l-ewwel bytes —
u għalhekk skadenza tintwera bħala `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), filwaqt li l-baġit tal-kju juża l-kodiċi
tat-timeout tal-kju. Ibdel kwalunkwe wieħed minnhom permezz ta’ `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) jew mid-dashboard
(**Settings → Resilience**). It-tnejn jiġu limitati għal 1ms–24h waqt in-normalizzazzjoni.

**Preċedenza, għat-tnejn:** il-varjabbli env tipprovdi biss il-valur _predefinit_. Valur
ippersistit f’`resilienceSettings.requestQueue` (dashboard / patch tal-API, maħżun
f’`key_value`) jieħu preċedenza fuqu, u
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` għal kull konnessjoni jieħu preċedenza fuq dak. Għalhekk,
l-issettjar tal-varjabbli env fuq deployment li diġà għandu valur ippersistit
ma jibdel xejn — minflok, neħħi jew aġġorna l-issettjar ippersistit.

Iż-żmien fil-kju huwa limitat minn `maxWaitMs`; `maxQueueDepth` hawn taħt jillimita kemm
utenti li jagħmlu talbiet jistgħu jkunu fil-kju fl-istess ħin.

**`maxQueueDepth` — limitu tad-dħul fakultattiv (ġdid).** `resilienceSettings.requestQueue.maxQueueDepth`
jillimita kemm-il talba tista’ tibqa’ fil-kju (għadha ma ġietx iddispaċċjata) għal
fornitur+konnessjoni waħda fl-istess ħin. Meta l-kju diġà jkun fih `maxQueueDepth`
talbiet, talba ġdida tiġi rrifjutata immedjatament bi żball ittajpjat
`code: "RATE_LIMIT_QUEUE_FULL"` **qabel** ma tasal qatt għand `limiter.schedule()`
— għalhekk ir-rifjut huwa rħis u jseħħ qabel kwalunkwe xogħol downstream
ta’ kompressjoni / traduzzjoni tal-prompt għal dik it-talba. Il-valur predefinit `0` =
diżattivat, u jippreserva l-imġiba eżistenti ta’ kju mingħajr limitu; limitat għal 0–100000.
Ibdel dan permezz ta’ `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) jew
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/patch tal-API).

Il-verifika tad-dħul innifisha hija funzjoni pura
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), sabiex
tkun tista’ tiġi ttestjata b’testijiet unitarji mingħajr limiter Bottleneck reali.

> L-RFC li fetaħ #6593 ippropona wkoll flag `bypassCompressionOnRateLimit`.
> Il-pipeline `open-sse/services/compression/` ta’ dan ir-repo huwa
> kompressjoni tal-prompt/kuntest fuq it-talba LLM ħierġa (`chatCore.ts`,
> madwar il-blokka `resolveCompressionSettings`/`selectCompressionStrategy`),
> mhux kompressjoni tar-rispons HTTP fuq bodies 429 iġġenerati — ma hemm l-ebda
> mogħdija tal-kodiċi korrispondenti għal flag letterali ta’ bypass. Dak il-pass tal-kompressjoni tal-prompt
> bħalissa jitħaddem ukoll _qabel_ `withRateLimit()` fil-pipeline tat-talba, għalhekk
> il-bidla fl-ordni biex dan jinqabeż meta talba tiġi rrifjutata minħabba kju mimli hija bidla separata u akbar
> mill-ambitu ta’ din il-ħarġa; intenzjonalment **ma ġietx** implimentata
> hawn u tħalliet għal xogħol sussegwenti jekk il-benefiċċju tal-iffrankar tas-CPU jkun jiswa
> r-riskju tal-bidla fl-ordni.

---

## 6. Monitoraġġ tal-fluss ta’ data għal flussi bil-mod (#9709)

Il-mekkaniżmu protettiv fakultattiv `resilienceSettings.streamRecovery.throughputWatchdog` jidentifika
sors upstream li għadu qed jibgħat biċċiet tad-data iżda qed jipproduċi output tal-assistent taħt
ir-rata kkonfigurata ta’ output utli. Dan huwa deliberatament distint mit-timeout tal-inattività:
il-heartbeats u l-metadata la jirrisettjaw xi wieħed mit-tajmers u lanqas ma jgħoddu bħala progress. Huwa wkoll
distint mill-iskadenza assoluta tal-attentat (#9153), li tibqa’ limitu assolut ta’
sikurezza irrispettivament mill-kwalità tal-output.

Il-monitoraġġ jeħtieġ perjodu ta’ tisħin segwit minn tieqa kontinwa sħiħa qabel
ma jkun jista’ jwaqqaf l-operazzjoni. Huwa jgħodd id-deltas tat-test mill-avvenimenti tal-output ta’ Chat Completions u Responses API
(prokura konservattiva għall-bytes UTF-8), jinjora avvenimenti li jkun fihom biss informazzjoni dwar l-użu jew li jkunu vojta, u
jissospendi l-valutazzjoni waqt li jkunu għaddejjin avvenimenti ta’ sejħiet tal-għodod jew ta’ raġunament. Huwa diżattivat
b’mod awtomatiku u jista’ jiġi attivat permezz ta’ `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; it-
tieqa, il-perjodu ta’ tisħin, ir-rata minima, u l-output minimu li jista’ jitkejjel huma limitati mis-
saff normali ta’ normalizzazzjoni tas-settings tar-reżiljenza.

Meta jkun attivat, waqfien mill-monitoraġġ jiġi applikat biss għall-attentat upstream attiv. Qabel
ma xi bytes ikunu viżibbli għall-klijent, il-mogħdija eżistenti ta’ rkupru bikri fl-istess kont tista’ terġa’ tiftaħ
l-attentat. Wara l-commit, il-fluss qatt ma jerġa’ jintlagħab bl-addoċċ; huwa biss il-kuntratt eżistenti
ta’ kontinwazzjoni sikura f’nofs il-fluss li jista’ jgħaqqad suffiss. Il-finalizzazzjoni tibqa’
sseħħ darba biss, għalhekk il-kontabbiltà tal-użu u r-rilaxx tas-semaforu ma jiġux duplikati.

---

## 7. Dikjarazzjoni mill-ġdid tal-Istatus Upstream (żbalji tal-kwota bi status ħażin)

**Ambitu:** gateway upstream wieħed li jirrapporta eżawriment temporanju tal-kwota bl-istatus HTTP żbaljat.

**Għan:** jiġi kkoreġut status qarrieqi QABEL il-klassifikazzjoni, sabiex il-konsumaturi downstream (il-magna tal-fallback, l-aggregazzjoni combo, ir-rispons li jintwera lill-klijent) jaraw in-natura reali tal-falliment li jista’ jerġa’ jiġi ppruvat.

Xi gateways jindikaw eżawriment TEMPORANJU tal-kwota bi status HTTP
li ma jistax jerġa’ jiġi ppruvat. `agentrouter.org` jirritorna `403` (xi drabi `400`) b’korp biċ-Ċiniż
(`用户额度不足` / `额度不足`) minflok l-istandard `429`. Klijenti bħal Claude
Code jittrattaw `403` bħala permanenti u jwaqqfu s-sessjoni, u mingħajr korrezzjoni
l-magna tal-fallback tikklassifikah bħala `AUTH_ERROR` minflok bħala avveniment
tal-kwota.

**Implimentazzjoni:**

- Reġistru + matcher: `open-sse/config/upstreamStatusRestatement.ts` — lista
  ta’ regoli għal kull fornitur (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), imqabbla permezz ta’ `applyStatusRestatement()`.
- Post tas-sejħa: il-blokk `providerFailure:` f’`open-sse/handlers/chatCore.ts`
  (madwar il-linja 3654), eżatt wara li `parseUpstreamError()` janalizza rispons
  upstream bi status HTTP ta’ żball (`!providerResponse.ok`), u qabel ma titwettaq
  kwalunkwe klassifikazzjoni, sabiex kull konsumatur downstream jara l-
  istatus ikkoreġut. Żbalji inkorporati fi fluss SSE `200` isegwu mogħdija separata
  u sussegwenti ta’ analiżi tal-fluss u **mhumiex** koperti minn dan il-hook bħalissa — din hija
  limitazzjoni magħrufa, li għadha mhix meħtieġa għall-istatus ħażin ta’ agentrouter (li
  jidher bħala status HTTP ta’ żball).
- Eliġibbiltà għal prova mill-ġdid: `429` jinsab f’`RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), għalhekk żball bi status iddikjarat mill-ġdid
  iġorr tieqa reali għal prova mill-ġdid minflok ma jidher bħala `403` mejjet.
- Il-valur sintetiku `60s` ta’ `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  huwa biss dak li r-rispons bid-dikjarazzjoni mill-ġdid jgħid lill-**klijent**; mhuwiex fih innifsu
  t-tul intern tal-cooldown/lockout tal-konnessjoni — dan huwa rregolat
  separatament minn kwalunkwe mekkaniżmu li fil-fatt jittratta l-iżball bid-dikjarazzjoni mill-ġdid
  (il-backoff eskalanti ta’ Connection Cooldown, §2, b’bażi ta’ `3s` għal fornituri
  b’API key; jew Model Lockout, §3, għal fornituri bi kwota għal kull mudell bħal
  agentrouter). Ir-router jista’ jerġa’ jsir eliġibbli biex jipprova internament qabel
  it-tieqa ta’ 60s li jirreklama lill-klijent — marġni intenzjonat,
  mhux bug.

Żbalji permanenti (`无权访问模型` ta’ agentrouter — l-ebda aċċess għal dan il-mudell) QATT ma
jiġu ddikjarati mill-ġdid: `excludeMarkers` jimblokka r-regola anki meta `textMarkers` jaqbel,
għalhekk l-iżball iżomm l-istatus oriġinali tiegħu u xejn ma jibqa’ jipprovah għal dejjem. Ir-
regola korrispondenti ta’ klassifikazzjoni tal-fornitur
(`agentrouter-model-access-denied` f’`open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown bażi ddikjarat ta’ `6h`) tiġi
kkonsultata minn `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_qabel_ ir-ritorn bikri ġeneriku `FORBIDDEN` tal-kategorija apikey, soġġetta għal
`honorsRuleLockScope(provider)` (#10334 — bħalissa esklussiv għal agentrouter permezz
tal-allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` f’
`providerErrorRules.ts`). Il-cooldown iddikjarat ta’ 6h tar-regola jgħaddi bħala
`fallbackResult.baseCooldownMs`, iżda xorta jidħol fil-mogħdija eżistenti minn qabel
tal-lockout tal-kwota għal kull mudell (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, mhux mibdula minn #10334 ħlief għas-sors tal-cooldown):
dan jitnaqqas sal-limitu massimu tal-operatur `mlSettings.maxCooldownMs`
(default `1_800_000ms` / 30min), bħal kull lockout ieħor ta’ mudell, u r-
_raġuni tal-lockout ippersistita_ tibqa’ l-valur eżistenti kkodifikat direttament `"forbidden"`,
mhux il-valur `"auth_error"` tar-regola — huwa biss it-tul tal-cooldown li jiġi rispettat
minn tarf sa tarf, mhux l-istring tar-raġuni. Il-konnessjoni nnifisha tibqa’ attiva;
mudelli oħra fuq l-istess konnessjoni ma jiġux affettwati.

Żbalji ta' kwota mfissra mill-ġdid (`额度不足`) jilħqu regola tal-fornitur fil-produzzjoni
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, mingħajr perjodu ta' stennija ddikjarat għalihom stess — japplika l-valur
predefinit tal-backoff skalat tas-saff tal-persistenza). Minn #10334, `scope` fuq
`ProviderErrorRuleMatch` JIĠI kkunsmat minn tarf sa tarf, iżda **biss** għall-fornituri fil-
lista ta' permessi `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
illum `"agentrouter"` biss, ikkontrollat permezz ta' `honorsRuleLockScope()`). Għal kull
fornitur ieħor, `scope` jibqa' informattiv, eżattament bħal qabel #10334.
`checkFallbackError` jesponi l-ambitu tar-regola li tqabblet bħala
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) huwa l-kontroll kondiviż li jikkonferma li
`ruleScope` huwa ġenwinament sikur biex jiġi rrispettat bħala sinjal għall-konnessjoni
kollha li jirkupra waħdu (ambitu `"connection"`, raġuni `quota_exhausted`, qatt
`permanent`, qatt `creditsExhausted` — difiża kontra regola futura li tgħaqqad l-ambitu
`"connection"` ma' stat permanenti tal-kont). Żewġ konsumaturi jsejħulu:

- **Persistenza** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  minflok ma jaqa' fil-fergħa ta' mblukkar **għal kull mudell** tal-fornitur passthrough
  (agentrouter għandu `passthroughModels: true` → `hasPerModelQuota()`
  jirritorna `true`), japplika **perjodu ta' stennija temporanju għall-konnessjoni** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, qatt stat terminali
  (`credits_exhausted`/`banned`/`expired`) — sabiex il-konnessjoni tirkupra
  waħedha ladarba jintemm il-perjodu ta' stennija minflok ma tkun meħtieġa
  reimpostazzjoni manwali tal-kredenzjali. Dan jinqabeż għal konnessjonijiet b'
  `disableCooling: true` (#2997): dik l-għażla ta' esklużjoni minflok tgħaddi
  għall-imblukkar għal kull mudell (kompromess iddokumentat —
  ara l-kumment fil-kodiċi fuq il-fergħa).
- **Rotot kombinati fl-istess talba** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): l-istess kontroll jimmarka l-
  konnessjoni fis-set fil-memorja `exhaustedConnections`, b'ċavetta
  `${provider}:${connectionId}`. Dan jaqbeż biss mira li jkun fadal FL-ISTESS TALBA
  li _hija stess diġà ġġorr eżattament dak il-`connectionId`_ fuq l-oġġett tal-mira
  tagħha stess (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` qabel it-tiftixa f'`exhaustedConnections`) — kombinazzjoni sempliċi
  ta' lista ta' mudelli, fejn il-miri relatati ma jġorru ebda `connectionId` ippinjat
  tagħhom stess u wieħed jiġi riżolt biss għal kull dispaċċ mill-header
  `X-OmniRoute-Selected-Connection-Id` tar-rispons, qatt ma tilħaq dak it-tqabbil
  taċ-ċavetta. Għal dak il-każ komuni, il-protezzjoni reali kontra li parti li jkun
  fadal terġa' tuża l-kont li għadu kemm ġie eżawrit MHIX dan is-Set — hija s-saff
  tal-persistenza ta' hawn fuq (il-`rateLimitedUntil` tal-konnessjoni issa jinsab
  fil-futur) flimkien ma' dan l-istess kontroll li jrażżan
  `transientRateLimitedProviders` għall-falliment (ara "Disinn f'żewġ stadji" u
  l-kumment fil-kodiċi dwar il-fergħa `isAgentrouterConnectionQuotaScope`
  f'`targetExhaustion.ts`): jekk dak is-Set jibqa' mhux immarkat, l-awtorizzazzjoni
  sfurzata `allowRateLimitedConnection` ta' `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) MA tidħolx fis-seħħ
  għall-partijiet li jkun fadal tal-fornitur, għalhekk il-filtru `rateLimitedUntil`
  tal-għażla tal-kredenzjali (`src/sse/services/auth.ts:1238`) jiġi rrispettat
  b'mod normali u parti li jkun fadal jew tagħżel konnessjoni agentrouter differenti
  li għadha eliġibbli, jew tfalli għax ma jkunx hemm kredenzjali disponibbli — ma
  tisforzax triqitha lura lejn il-konnessjoni li din il-fergħa għadha kemm poġġiet
  f'perjodu ta' stennija.

### Disinn f'żewġ stadji: tifsir mill-ġdid tal-istatus, imbagħad klassifikazzjoni

It-tifsir mill-ġdid tal-istatus (`upstreamStatusRestatement.ts`) u r-regoli ta'
klassifikazzjoni tal-fornitur (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) huma reġistri separati li t-tnejn jużaw bħala ċavetta l-id
tal-fornitur u markaturi tat-test, iżda jaħdmu f'postijiet differenti u jaqdu
skopijiet differenti: it-tifsir mill-ġdid jerġa' jikteb l-istatus HTTP kmieni
f'`chatCore.ts`; ir-regoli ta' klassifikazzjoni jagħżlu r-`reason` ta' fallback
u l-`scope` tal-illokkjar (`model` / `provider` / `connection`) ġewwa
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Ir-regoli ta' klassifikazzjoni jaraw it-**test** sħiħ tal-iżball biss (meħtieġ
biex iqabblu markaturi fil-body bħal `额度不足`) għall-fornituri elenkati fil-lista
ta' permessi `FULL_TEXT_RULE_PROVIDERS` f'`providerErrorRules.ts` — bħalissa
`"agentrouter"` biss. Għal kull fornitur ieħor tal-**katalogu integrat**,
`checkFallbackError` jgħaddi lil `getProviderErrorRuleMatch` biss l-iżball
strutturat (`{code, type}`), li huwa biżżejjed għal regoli bbażati fuq
header/status/code iżda ma jistax jara markaturi fit-test tal-body.
Il-helper `resolveRuleMatchBody()` iwettaq din l-għażla: it-test sħiħ tal-iżball
għall-fornituri fil-lista ta' permessi, u l-iżball strutturat għall-oħrajn.
Iż-żieda ta' fornitur **integrat** ma' `FULL_TEXT_RULE_PROVIDERS` hija għażla
espliċita għal kull fornitur — teżisti sabiex il-fluss predefinit għal kull
fornitur li mhuwiex fil-lista jibqa' mhux mibdul byte b'byte.

L-`scope` ta' regola (`model` / `provider` / `connection`) huwa għażla separata
minn `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` jesponih biss bħala
`fallbackResult.ruleScope`, u l-konsumaturi downstream jirrispettawh bħala xi
ħaġa oħra għajr tikketta informattiva biss għall-fornituri fil-lista ta'
permessi `HONORS_RULE_LOCK_SCOPE_PROVIDERS` fl-istess fajl (`ikkontrollat permezz
ta' honorsRuleLockScope()` — illum `"agentrouter"` biss). Ara "Żbalji ta' kwota
mfissra mill-ġdid" hawn fuq għal dak li tqabbil ma' `scope: "connection"`
effettivament jagħmel ladarba fornitur ikun f'dik il-lista ta' permessi.

**#11104 — ir-regoli ddikjarati mill-operatur jaqbżu ż-żewġ listi ta’ permessi.** Operatur jista’
jiddikjara regola għal kull fornitur waqt l-eżekuzzjoni permezz ta’ `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
mingħajr ma jeditja dan il-fajl. Jekk regola tal-operatur titqiegħed wara
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — listi ta’
permessi maħsuba biex jipproteġu l-imġiba **predefinita** tar-regoli tal-katalgu
inkorporati — il-mekkaniżmu tas-settings isir inattiv għal kull fornitur ħlief
dawk diġà elenkati hemmhekk, peress li d-dikjarazzjoni tar-regola hija fiha
nnifisha l-aċċettazzjoni espliċita tal-operatur. `resolveRuleMatchBody()` u
`honorsRuleLockScope()` it-tnejn l-ewwel jiċċekkjaw
`hasOperatorRuleForProvider()`: fornitur b’regola tal-operatur jirċievi
t-test mhux ipproċessat tal-iżball u l-`scope` iddikjarat tiegħu jiġi rispettat,
irrispettivament minn jekk jidhirx ukoll f’xi waħda mil-listi ta’ permessi.

**Lakuna magħrufa — `providerRuleRegistry` qatt ma jiġi kkonsultat għal HTTP 400.**
Il-fergħa `BAD_REQUEST` ta’ `checkFallbackError` tikklassifika l-istatus 400
kompletament permezz tal-arrays tal-patterns tagħha stess
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, eċċ.
f’`accountFallback.ts`) u tirritorna qabel ma tintlaħaq il-fergħa
`configuredRule`/`getProviderErrorRuleMatch` ta’ fuqha. Regola tal-katalgu
inkorporata (jew regola tal-operatur) b’`status: 400` hija sintattikament valida,
iżda qatt mhi se tiġi attivata. Illum l-ebda regola eżistenti ma timmira 400,
għalhekk xejn fil-produzzjoni mhu affettwat — iżda regola futura għal 400 teħtieġ
li din il-fergħa tinbidel l-ewwel, bidla akbar milli sempliċement iżżid regola
(din tikklassifika mill-ġdid 400 għal kull fornitur li diġà jiddependi fuq
l-imġiba tal-array tal-patterns) u tinsab barra mill-ambitu ta’ żieda ta’ regola
għal fornitur wieħed.

### Żieda ta’ gateway ġdid li jirrapporta ħażin il-kwota

1. Irreġistra array wieħed ta’ regoli f’`statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Żomm `textMarkers`
   speċifiċi għall-fornitur; qatt terġa’ tuża frażijiet ġeneriċi bl-Ingliż li
   jaħbtu ma’ `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. B’mod fakultattiv, irreġistra regoli ta’ klassifikazzjoni f’
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) biex tagħżel
   l-ambitu korrett tal-lock (`connection` għal kwota tal-kont kollu, `model`
   għal żbalji għal kull mudell). Dan il-pass jidħol fis-seħħ fil-produzzjoni
   biss għal fornituri li r-regoli tagħhom jeħtieġu t-test sħiħ tal-iżball
   (markers fil-body): żid l-id tal-fornitur ma’
   `FULL_TEXT_RULE_PROVIDERS` fl-istess fajl — inkella `checkFallbackError`
   dejjem jgħaddi lir-regola biss l-iżball strutturat `{code, type}` u regola
   ibbażata fuq it-test tal-body qatt ma taqbel mat-traffiku reali.
   Regoli li jaqblu purament fuq `status`/`headers` (bħal dawk ta’ Opencode jew
   Minimax) ma jeħtiġux din l-aċċettazzjoni. Separatament, jekk ir-regola
   tiddikjara `scope: "connection"` u l-intenzjoni hija perjodu ta’ stennija
   reali għall-konnessjoni kollha flimkien ma’ qbiż tal-combo fl-istess talba
   (mhux sempliċement tikketta informattiva), żid l-id tal-fornitur ma’
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` fl-istess fajl — dan huwa dak li
   jikkontrolla l-konsum tat-tip `isAgentrouterConnectionQuotaScope()` f’
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) u
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); mingħajru, `scope`
   xorta jgħaddi minn `fallbackResult.ruleScope`, iżda xejn ma jaġixxi fuqu.
3. Żid testijiet tal-unità li jirriflettu
   `tests/unit/upstream-status-restatement.test.ts` u
   `tests/unit/agentrouter-error-rules.test.ts` (inklużi l-kontrolli
   not-permanent / not-creditsExhausted, u — jekk il-fornitur jeħtieġ il-lista
   ta’ permessi — test li jasserixxi li `resolveRuleMatchBody()` jirritorna
   t-test sħiħ għal dak il-fornitur biss).

Ma huma meħtieġa ebda bidliet f’`chatCore.ts`, `classifyError`, jew combo.

#### Lock maqsum skont l-egress (#10880)

Il-fornituri f’`EGRESS_BUCKETED_LOCK_PROVIDERS` (il-familja opencode) jiġu
ttrattati bħala upstream maqsum f’buckets skont l-IP (il-livell bla ħlas ta’
opencode huwa maqsum skont l-IP, mhux skont il-kont — ara #9611): status-429
ikklassifikat bħala `quota_exhausted` **jew** `rate_limit_exceeded` ipoġġi
f’perjodu ta’ stennija kull konnessjoni fil-familja permessa li l-aħħar IP
tal-egress magħruf tagħha jaqbel ma’ dak tal-konnessjoni li falliet, qabel ma
r-rotazzjoni tkun tista’ tipprovahom
— biex jiġu evitati N-1 sejħiet upstream li żgur ifallu (l-istess struttura bħal
#10460/#10525). `rate_limit_exceeded` huwa inkluż apposta: fil-perkors
`markAccountUnavailable`, ir-regoli speċifiċi għal opencode qatt ma jaqblu
(l-ebda headers/body ma jingħata lil `checkFallbackError`, u opencode mhuwiex
f’`FULL_TEXT_RULE_PROVIDERS`), għalhekk 429 li l-body tiegħu jkun fih it-test
tal-kwota tal-abbonament ("monthly usage limit reached") jiġi kklassifikat
bħala `quota_exhausted` mill-fallback tat-test tal-kwota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; perjodu ta’ stennija
ta’ siegħa) qabel ma qatt tintlaħaq ir-regola `status_429` — filwaqt li 429
mingħajr test tal-kwota (sempliċement limitazzjoni tar-rata) jiġi kklassifikat
permezz tar-regola `status_429` bħala `rate_limit_exceeded` u xorta jqiegħed
lill-familja tal-IP f’perjodu ta’ stennija. Għal fornitur fil-lista ta’
permessi, limitu tar-rata maqsum skont l-IP huwa l-istess sinjal bħal kwota
eżawrita. Limiti realistiċi:

- **Bl-aħjar sforz possibbli**: l-imblukkar isib l-aħħar `egress_ip` magħruf tal-konnessjoni
  minn `proxy_logs` (tieqa ta' 24 siegħa, sinkronu, mingħajr cache). Cache kiesħa (l-IP
  tal-ħruġ qatt ma ġie ttestjat) jew ebda ringiela → il-konnessjoni li qed tfalli xorta titqiegħed
  f'perjodu ta' stennija mill-fergħa (irreġistrat bħal-lum), iżda ma tiġi mblukkata ebda konnessjoni oħt.
- **Qatt terminali**: il-perjodu ta' stennija huwa tieqa ta' kwota li tiġġedded
  (`testStatus: "unavailable"`); stat permanenti qatt ma jiġi derivat minn
  sinjal fil-livell tal-IP. Il-konnessjonijiet `disableCooling` jaqbżu l-fergħa għalkollox.
- **Il-granularità tal-imblukkar tinbidel għall-familja fil-lista permessa**: din hija bidla
  fl-ambitu, mhux biss ottimizzazzjoni tal-konnessjonijiet oħt. opencode huwa fornitur
  `passthroughModels`, għalhekk qabel din il-fergħa 429 kien jipproduċi mblukkar għal kull MUDELL; issa
  jipproduċi perjodu ta' stennija għall-konnessjoni — inkluż għal operatur li jkun qed juża konnessjoni
  waħda mingħajr ebda konnessjoni oħt. Dik hija l-granularità li t-tabella tar-regoli ta' opencode
  diġà tiddikjara bħala korretta (`scope: "connection"`,
  `providerErrorRules.ts`), iżda li s'issa qatt ma ġiet irrispettata għax opencode mhuwiex f'
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Il-fergħa tikteb hija stess il-perjodu ta' stennija
  tal-konnessjoni li qed tfalli + `backoffLevel`, b'mod li jirrifletti l-fergħa ta'
  agentrouter b'ambitu ta' konnessjoni, u tirritorna — il-blokka għal kull mudell u
  l-fluss ġeneriku ta' hawn taħt qatt ma jintlaħqu.
- **Combo inkluż**: bħall-fergħa ta' agentrouter, l-ambitu deliberatament
  jinjora t-tnaqqis fil-grad `persistUnavailableState`/`isCombo` li min iċempel bħala combo
  japplika għal 429. Imblukkar għal kull mudell mhuwiex forma aktar dgħajfa ta' dan l-ambitu, iżda
  huwa l-unità żbaljata: ma jgħid xejn dwar l-IP eżawrit, għalhekk ir-rotazzjoni tal-combo
  tibqa' taħli sejħa waħda garantita li tfalli għal kull konnessjoni oħt.
- **Sikurezza tal-konnessjonijiet oħt**: konnessjoni oħt li diġà tinsab fi stat terminali (banned/credits_exhausted)
  jew li diġà tinsab f'perjodu ta' stennija itwal qatt ma tinkiteb fuqha.
- **Lista permessa esklussiva**: it-twessigħ ta' `EGRESS_BUCKETED_LOCK_PROVIDERS` huwa
  deċiżjoni espliċita tas-sid; ebda konnessjoni ġenerika (mudell #10334/#10419). Il-
  mistoqsija għall-konnessjonijiet oħt torbot dik l-istess lista permessa minflok tirrepetiha bħala litteral
  SQL, għalhekk it-twessigħ tagħha jibqa' bidla ta' linja waħda.
- **Rotazzjoni tal-IP tal-ħruġ, fiż-żewġ direzzjonijiet**: it-tieqa tat-tiftix (24 siegħa) hija ferm
  usa' mit-TTL tal-cache tal-IP tal-ħruġ (5 min), għalhekk "l-aħħar IP magħruf" huwa storja,
  mhux l-istat attwali. Jekk il-proxy ta' konnessjoni jkun inbidel fit-tieqa, l-
  imblukkar jista' **ma jaqbadx** IP ġenwinament kondiviż (l-IP irreġistrat ikun il-ġdid,
  mhux eżawrit) — u b'mod simetriku jista' **jqiegħed f'perjodu ta' stennija konnessjoni oħt li minn dak iż-żmien
  inbidlet** mill-IP eżawrit. It-tieni każ jiswa lil dik il-konnessjoni oħt tieqa waħda ta'
  stennija; it-tnejn huma limiti aċċettati tal-aħjar sforz possibbli għal tiftix ibbażat fuq
  l-istorja.
- **Kost**: żewġ skans limitati ta' `proxy_logs` (iffiltrati skont it-tieqa permezz ta'
  `idx_pl_timestamp`), biss bil-frekwenza ta' 429. Ebda indiċi ġdid (migrazzjoni 134
  YAGNI). Imkejjel fuq kopja ta' DB bi traffiku reali ta' daqs moderat; istanza
  bi fluss għoli żżomm proporzjonalment aktar ringieli fl-istess tieqa.

---

## Karatteristiċi Oħra ta’ Reżiljenza

- **19-il strateġija ta’ routing** (prijorità, ponderat, round-robin, context-relay, fill-first, p2c, każwali, l-inqas użat, ottimizzat għall-ispiża, konxju mir-reset, tieqa tar-reset, marġni disponibbli, każwali strett, awtomatiku, lkgp, ottimizzat għall-kuntest, ottimizzat għall-cache, fużjoni, pipeline) — ara [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routing konxju mir-reset** (v3.8.0) — jagħti prijorità lill-konnessjonijiet skont il-ħin tar-reset tal-kwota.
- **Degradazzjoni tal-modalità fl-isfond** — Responses API `background: true` tiġi degradata għal sync bi twissija.
- **Sejbien dinamiku tal-limitu tal-għodod** — inaqqas l-użu tal-fornituri meta jintlaħqu l-limiti tal-għadd tal-għodod.
- **Fallback ta’ emerġenza** — ikkontrollat minn `OMNIROUTE_EMERGENCY_FALLBACK`; l-operaturi jistgħu jissovrascrivuh mill-paġna Feature Flags mingħajr ma jerġgħu jibdew is-sistema.

---

## Debugging

- Combo ppeżat jirrispondi b’`503 all_targets_cooling_down` (`Retry-After` issettjat, u `diagnostics.excluded` jelenka kull mira b’`model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → il-pool huwa kkonfigurat u konness, iżda kull mira hija eskluża minn timer ta’ reżiljenza; it-twissija `[COMBO] Weighted selection: every target excluded before dispatch — …` tindika r-raġunijiet u s-sekondi li fadal. `404 no_executable_targets` mill-istess combo jfisser li ma kien involut l-ebda timer ta’ reżiljenza (m’hemm xejn x’jitħaddem, jew kull kont falla fit-test tad-disponibbiltà). Dan huwa inkorporat f’`open-sse/services/combo/pinRecovery.ts` mill-esklużjonijiet miġbura f’`targetResolution.ts`.
- Iċ-ċwievet kollha għal fornitur inqabżu → iċċekkja kemm l-istat tal-interruttur taċ-ċirkwit KIF UKOLL il-`rateLimitedUntil`/`testStatus` ta’ kull konnessjoni.
- Fornitur eskluż b’mod permanenti wara t-tieqa tar-risettjar → il-kodiċi qed jaqra direttament `state` minflok `getStatus()`/`canExecute()`.
- Ċavetta waħda tfalli, iżda l-oħrajn għandhom jaħdmu → ippreferi l-perjodu ta’ stennija tal-konnessjoni fuq l-interruttur taċ-ċirkwit.
- Mudell wieħed biss ifalli → ippreferi l-imblukkar tal-mudell fuq il-perjodu ta’ stennija tal-konnessjoni.
- L-istat għandu jirkupra waħdu iżda ma jagħmilx hekk → iċċekkja għal timestamp futur flimkien ma’ mogħdija tal-qari li taġġorna l-istat skadut. L-istatus permanenti jeħtieġu bidliet manwali.

---

## Fingerprinting u Stealth tat-TLS

L-istealth speċifiku għall-fornitur (JA3/JA4, CCH, obfuscation) huwa ddokumentat separatament — ara `docs/security/STEALTH_GUIDE.md` (git; mhux ikkompilat f’`/docs`).

---

## Ittestjar tar-reżiljenza (Fażi 8 · Blokka C)

Lil hinn mit-testijiet tal-unità għal-loġika tar-reżiljenza, tliet testijiet jeżerċitaw ir-runtime taħt
kundizzjonijiet reali ta’ stress/falliment (kollha ta’ integrazzjoni/ta’ billejl — l-ebda wieħed ma jimblokka l-PRs):

| Test             | X’jagħmel                                                                                                                                                                                        | Eżekuzzjoni                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| Chaos            | Node upstream falz jinjetta latenza/reset/timeout/503 reali; jivvalida li s-circuit breaker jinfetaħ/jirkupra u li `checkFallbackError` jikklassifika 503 bħala fallback li jista’ jiġi rkuprat. | `RUN_CHAOS_INT=1 npm run test:chaos`         |
| Tkabbir tal-heap | ~500 stream għal kull `createSSEStream` taħt `--expose-gc`; ifalli jekk il-heap jikber lil hinn mil-limitu massimu (protezzjoni kontra OOM #3069).                                               | `npm run test:heap`                          |
| Soak ta’ k6      | Tagħbija sostnuta kontra `/api/monitoring/health`; limiti ta’ p95/żbalji.                                                                                                                        | `k6 run tests/load/k6-soak.js` (ta’ billejl) |

Orkestrat minn `.github/workflows/nightly-resilience.yml` (cron + dispatch). Fil-
`test:integration` predefinit, it-testijiet chaos u heap jaqbżu lilhom infushom (mingħajr `RUN_CHAOS_INT`/`--expose-gc`).

---

## Ara Wkoll

- [Gwida tal-Arkitettura](./ARCHITECTURE.md) — Arkitettura tas-sistema u l-mekkaniżmi interni
- [Gwida għall-Utent](../guides/USER_GUIDE.md) — Fornituri, kombinazzjonijiet, integrazzjoni mas-CLI
- [Magna tal-Kombinazzjonijiet Awtomatiċi](../routing/AUTO-COMBO.md) — Punteġġ ibbażat fuq 16-il fattur, pakketti tal-modalità
