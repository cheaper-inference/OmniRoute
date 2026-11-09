# Resilience Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute għandha tliet mekkaniżmi ta’ reżiljenza distinti iżda relatati. Kull wieħed għandu skop u skop differenti. Żommhom separati meta tiddibaggja l-imġieba tar-rotot.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Sors: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Preċedenza Env-vs-dashboard għal toggles ta' reżiljenza.** Ir-reżiljenza opt-in toggles miżrugħa mill-ambjent — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — jipprovdu biss il-_default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Boolean jippersisti `resilienceSettings` (Dashboard →** Settings → Reżiljenza** / `PATCH /api/resilience`, maħżun `key_value`) jirbaħ fuq il-valur env: normalizzazzjoni (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) iżżomm il-boolean maħżun kull meta jeżisti wieħed. L-issettjar ta' tali env var għal `true` fuq skjerament fejn id-dashboard diġà ssejvjat `false` għalhekk ma jbiddel xejn — flip the toggle in** Settings → Reżiljenza** (jew neħħi l-qasam maħżun) minflok.

## 1. Circuit Breaker tal-Provider

**Ambitu:** il-provider kollu (eż., `glm`, `openai`, `anthropic`).

**Għan:** jieqaf jibgħat traffiku lil provider li qed ifalli ripetutament fil-livell upstream/tas-servizz.

**Implimentazzjoni:**

- Klassi ewlenija: `src/shared/utils/circuitBreaker.ts`
- Konnessjonijiet: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API tal-istatus: `GET /api/monitoring/health`
- API tar-reset: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Tabella tad-DB: `domain_circuit_breakers`

**Stati:**

- `CLOSED` — traffiku normali permess
- `DEGRADED` — it-traffiku għadu permess, iżda fallimenti elevati tal-provider qed jiġu ntraċċati; jirritorna għal `CLOSED` wara biżżejjed suċċessi, wara test tal-konnessjoni validu, jew wara l-itwal perjodu ta' żamma `OPEN` għall-aħħar tip ta' falliment (il-valur `cooldownByKind` tiegħu, inkella `resetTimeout`, × `maxBackoffMultiplier`, mill-inqas cooldown wieħed) mingħajr falliment ġdid
- `OPEN` — il-provider imblukkat temporanjament; il-combo routing jaqbeżu
- `HALF_OPEN` — il-reset timeout għadda; talba probe permessa

**Valuri default konfigurabbli (`open-sse/config/constants.ts`, esposti fi Dashboard → Settings → Resilience):**

| Klassi  | Jiddegrada wara | Jinfetaħ wara | Reset timeout |
| ------- | --------------- | ------------- | ------------- |
| OAuth   | 5 fallimenti    | 8 fallimenti  | 60s           |
| API-key | 7 fallimenti    | 12 fallimenti | 30s           |
| Lokali  | derivat         | 2 fallimenti  | 15s           |

`degradationThreshold` jikkontrolla meta provider jidħol fi `DEGRADED`; `failureThreshold` jikkontrolla meta jinfetaħ u jiġi mjaqbez. Il-profili tal-providers lokali għadhom ma humiex esposti fil-paġna tas-Settings tar-Resilience.

**Kodiċi ta' attivazzjoni (trip):** biss statusi fil-livell tal-provider `[408, 500, 502, 503, 504]`. MA jqajmux għal żbalji fil-livell tal-kont (il-biċċa l-kbira 401/403/429 — dawk jappartjenu għall-cooldown jew għall-lockout).

**Irkupru lazy:** meta `OPEN` jiskadi, `getStatus()`, `canExecute()`, `getRetryAfterMs()` jaġġornaw l-istat għal `HALF_OPEN`. L-istess qari (u l-falliment li jmiss) jġibu `DEGRADED` li jkun stale lura għal `CLOSED` b'mod gradwali. Mhu meħtieġ ebda timer fl-isfond.

---

### Provider Cooldown globali opt-in (window gate)

Saff raba', **opt-in** (`PROVIDER_COOLDOWN_ENABLED`, default **mitfi**), iżomm memorja bejn it-talbiet (cross-request) tal-providers li qed ifallu f'`open-sse/services/providerCooldownTracker.ts`, kkonsultata mir-riżoluzzjoni tal-miri tal-combo sabiex talbiet konsekuttivi tal-combo jieqfu jergħu jgħaddu minn provider li għadu kif falla. L-entrati fil-livell tal-provider jirrispettaw il-window gate ta' `PROVIDER_PROFILES`:

| Profil  | jattiva wara (`providerFailureThreshold`) | fi ħdan (`providerFailureWindowMs`) | jkessaħ għal (`providerCooldownMs`) |
| ------- | ----------------------------------------: | ----------------------------------: | ----------------------------------: |
| OAuth   |                                      `10` |                             `15min` |                              `5min` |
| API key |                                      `15` |                             `30min` |                             `10min` |

Taħt il-limitu, il-provider **mhux** ikkunsidrat li qed jkessaħ; suċċess iħassar it-tieqa. L-entrati fil-livell tal-konnessjoni (`provider:connectionId`) iżommu minflok il-backoff esponenzjali `minRetryCooldownMs → maxRetryCooldownMs`. Sostituzzjonijiet: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Gwardja kontra r-regressjoni: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown tal-Konnessjoni

**Ambitu:** konnessjoni/kont/ċavetta ta' fornitur wieħed.

**Għan:** taqbeż ċavetta waħda problematika waqt li konnessjonijiet oħra għall-istess fornitur ikomplu jaqdu t-talbiet.

**Implimentazzjoni:**

- Immarkar bħala mhux disponibbli: `src/sse/services/auth.ts::markAccountUnavailable()`
- Għażla: `getProviderCredentials*` fl-istess fajl
- Kalkolu tal-cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Settings: `src/lib/resilience/settings.ts`

**Oqsma għal kull konnessjoni:**

- `rateLimitedUntil` — timestamp sa meta jiskadi l-cooldown
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — counter esponenzjali tal-backoff

**Cooldowns awtomatiċi:**

- Bażi OAuth: 5s
- Bażi taċ-ċavetta API: 3s
- API-key 429: jippreferi l-headers upstream `Retry-After`/reset/test ta' reset li jista' jiġi analizzat
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Dewmien tal-irtentat għal kull fornitur.** Il-paġna tad-dettalji tal-fornitur għandha selettur **Retry delay** (Auto,
15s sa 1h). Dan isalva `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, permezz ta' `PATCH /api/resilience`). Meta żball ta' limitu tar-rata ma jkollux ħjiel ta' ritransmissjoni
upstream, dak il-valur jieħu post il-backoff skalat għall-fornitur u jirrisettja `backoffLevel` għal 0
(`open-sse/services/rotationConfig.ts::overrideFor`). Il-preċedenza għal żball b'limitu tar-rata, mill-ogħla
għall-inqas, hija: ħjiel ta' ritransmissjoni upstream, imbagħad `providerSpecificData.rotationOverrides.rateLimitResetSeconds`
għal kull konnessjoni, imbagħad id-dewmien tal-irtentat għal kull fornitur, imbagħad
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` mill-ambjent, u fl-aħħar il-backoff skalat. Auto jneħħi l-qasam.
Dan jaffettwa biss ir-raġuni tal-limitu tar-rata, qatt l-istati terminali.

**Protezzjoni kontra l-effett ta' merħla:** tipprevjeni li fallimenti konkorrenti jestendu żżejjed il-cooldown jew iżidu darbtejn `backoffLevel`.

**429s tal-limitu tal-konkorrenza ma jgħollux is-sellum tal-backoff.** `429` li l-korp tiegħu jirrapporta
limitu ta' konkorrenza ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) ifisser li l-kont huwa b'saħħtu iżda okkupat.
`checkFallbackError()` jirritorna r-raġuni `concurrency_limited`: jaqleb għall-konnessjoni li jmiss
immedjatament, iqiegħed din il-konnessjoni f'cooldown fiss ta' `CONCURRENCY_LIMIT_COOLDOWN_MS`
(1s) jew juża l-ħjiel ta' ritransmissjoni upstream, iżomm `backoffLevel` kif inhu, u jistabbilixxi
`skipProviderBreaker`.
Korp espliċitu tal-kwota xorta għandu prijorità, għalhekk korp li jaqbel ukoll ma' mudell ta' kwota jibqa' verdett ta' kwota.
Sejbien: `looksLikeConcurrencyLimit()` f'`src/shared/utils/classify429.ts`;
verdett: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (il-`FailureKind` tal-breaker)
ma jinbidilx u xorta jaqra `rate_limit` għal dawn il-korpi.

**Stalli fil-kontenut tal-fluss ma jpoġġux il-kont f'cooldown.** Meta l-watchdog tal-istaġnar tal-kontenut
(`open-sse/utils/streamHandler.ts`) jieqaf jipprova fuq fluss li ma bagħat l-ebda output tal-mudell fil-ħin,
`markAccountUnavailable()` jirreġistra l-iżball fuq il-konnessjoni iżda ma jistabbilixxix cooldown: l-istaġnar
jappartjeni għal dik it-talba, l-aktar spiss dawra twila ta' raġunament li għadha ma ħarġet l-ebda output.
L-operaturi jistgħu jagħżlu li jattivawh permezz ta' `resilienceSettings.streamStallCooldown.enabled`
(default `false`).

**Sinjal ta' latenza fakultattiv għall-għażla tal-kont `p2c`.** Kull tentattiv mibgħut jirreġistra l-ħin sal-ewwel byte
u r-riżultat għal kull konnessjoni (u għal kull konnessjoni + mudell) f'tieqa rolling fil-memorja: l-aħħar 20 kampjun
fi żmien 15-il minuta (`open-sse/services/connectionLatencyTracker.ts`, irreġistrati minn
`safeLogEvents()` f'`src/sse/handlers/chatHelpers.ts`). Meta `resilienceSettings.p2cLatency.weight` ikun ogħla minn
`0` (firxa 0-20, default `0` = mitfi), `compareP2CConnections()` f'`src/sse/services/auth.ts` iżid sa
`weight` punti ma' kull kandidat tal-par. Nofs dan ġej mil-latenza bħala proporzjon għall-kandidat l-aktar mgħaġġel
(darbtejn aktar bil-mod jieħu n-nofs kollu) u n-nofs l-ieħor mir-rata ta' żbalji rolling.
It-terminu japplika biss meta ż-żewġ kandidati jkollhom mill-inqas 3 kampjuni, sabiex kontijiet ġodda ma jiġux penalizzati,
u l-limitu tiegħu jibqa' taħt il-penali ta' kwota mblukkata u kwota eżawrita.
Ma jżid l-ebda circuit breaker tiegħu stess: il-kontijiet li jfallu xorta jiġu ttrattati mis-saffi tal-cooldown, lockout u breaker.
Issettjah b'`PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Il-frames tar-raġunament jerġgħu jibdew il-baġit tal-istaġnar tal-kontenut.** Mudell ta' raġunament jista' jaħseb għal
minuti qabel l-ewwel token viżibbli tiegħu: Claude jistrimja frames `thinking_delta` li t-test tal-ħsieb tagħhom jista'
jkun vojt, u r-Responses API tistrimja oġġett ta' raġunament wara l-ieħor. `isReasoningProgressFrame()`
(`open-sse/utils/streamReadiness.ts`) jagħraf dawn il-frames, u l-watchdog jerġa' jibda l-baġit tiegħu ma' kull wieħed
minflok jikkanċella d-dawra. Dawn xorta mhumiex output tal-mudell, għalhekk dawra li tispiċċa b'raġunament biss xorta
tiġi rrappurtata bħala vojta, u dawra li tieqaf tirraġuna u tibgħat biss heartbeats xorta tattiva l-watchdog.

Il-frames binarji `reasoningContentEvent` ta' Kiro b'firma mhux vojta jżommu din l-attività ta' raġunament permezz tal-eżekutur
bħala delta vojta `reasoning_content`. Il-firma ma tintbagħatx. Il-metadata, frames mhux kompluti u firem vojta ma jerġgħux
jibdew il-baġit tal-kontenut; it-timeout indipendenti tal-fluss attiv u l-kanċellazzjoni mill-klijent xorta japplikaw
(`open-sse/executors/kiro/reasoning.ts`).

**Stati terminali (MHUX cooldowns):**

- `banned` — stabbilit mis-sejbien ta' keyword ipprojbit / kont ipprojbit (ara [BAN_DETECTION](../security/BAN_DETECTION.md)). Rifjuti upstream għal kull talba (`request_rejected`, eż. Anthropic OAuth 403 "Request not allowed") qatt ma jistabbilixxuh: jingħaddu għal kull konnessjoni u mudell u jneħħu dak il-mudell mir-rotazzjoni b'cooldown li jikber u huwa limitat għal `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), jew ipoġġu l-konnessjoni f'cooldown meta ma jkun magħruf l-ebda mudell — `open-sse/services/requestRejectedStreak.ts`
- `expired` (jgħaddi għal terminal wara għadd limitat ta' tentattivi — `EXPIRED_RETRY_MAX = 3` b'backoff esponenzjali — sabiex żbalji OAuth temporanji jkunu jistgħu jirkupraw waħedhom qabel ma l-kont jiġi diżattivat b'mod permanenti)
- `credits_exhausted`

Dawn jibqgħu sakemm jinbidlu l-kredenzjali jew operatur jirrisettjahom. Tiktibx fuq stati terminali bi stat temporanju ta’ cooldown.

**Irkupru għażżien:** meta `rateLimitedUntil` ikun għadda, il-konnessjoni terġa’ ssir eliġibbli. Wara użu b’suċċess, `clearAccountError()` ineħħi l-oqsma kollha tal-iżbalji.

### Ħajt tal-użu ta’ Claude OAuth: linja ta’ prijorità aktar baxxa + reset tal-limitu tas-sessjoni

**Ambitu:** konnessjoni waħda ta’ abbonament Claude (OAuth). Iż-żewġ karatteristiċi huma **opt-in għal kull konnessjoni** (Edit connection → sezzjoni Claude → `lowPriorityMode` / `autoLimitReset` f’`providerSpecificData`, it-tnejn mitfija b’mod awtomatiku) u jirriflettu l-kmandi `/low-priority` u `/limit-reset` ta’ Claude Code (il-kuntratt tal-komunikazzjoni ġie dokumentat minn Claude Code 2.1.263).

**Implimentazzjoni:**

- Magna tal-istati + klassifikazzjoni tar-rispons: `open-sse/services/claudeLowPriority.ts`
- Klijent tal-istatus/talba tar-reset: `open-sse/services/claudeLimitReset.ts`
- Hook tal-eżekutur (injezzjoni tal-header + retry bl-istess kont): `open-sse/executors/base.ts::execute()`
- Persistenza tal-opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** il-ħajt tal-użu ta’ 5 sigħat — `429` li l-headers tiegħu jġorru
`anthropic-ratelimit-unified-status: rejected` u, meta l-kont ikun eliġibbli,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ma jintbagħat xejn qabel dak l-ewwel ħajt
`429`; `429` ta’ burst mingħajr headers unifikati jgħaddi mill-passaġġ normali tal-cooldown.

**Linja ta’ prijorità aktar baxxa** (`lowPriorityMode`):

- Mal-ħajt `429`, l-eżekutur jaċċetta l-offerta u jerġa’ jipprova immedjatament bl-istess
  kont b’`anthropic-usage-limit: slow`; il-linja tibqa’ attiva sal-ħin imħabbar ta’
  `anthropic-ratelimit-unified-reset` (+ grazzja ta’ 60 sekonda), u kull talba f’dik it-tieqa
  ġġorr il-header. Il-`429` interċettat qatt ma jasal għand `handleChatCore`, għalhekk il-konnessjoni
  **ma titpoġġiex f’cooldown u ma tinbidilx għal oħra**.
- `anthropic-ratelimit-unified-slow-status` fuq risponsi sussegwenti: `active` / `not_needed`
  iżommu l-linja; `slot_busy` (429) jew `529` jistennew il-valur tas-server ta’
  `anthropic-ratelimit-unified-slow-retry-after` (default 20s, limitu 5–600s, jitter ta’ ±30%)
  u jerġgħu jippruvaw, b’limitu impost minn `anthropic-ratelimit-unified-slow-max-wait` (default 20 min, limitu
  1 min–6 sigħat) — wara dan il-linja tintemm u cooldown ta’ 10 minuti jimblokka
  aċċettazzjoni mill-ġdid. L-istennija tkun limitata wkoll minn dak li jkun fadal mill-timeout
  proprju tat-talba għall-bidu upstream (`resolveFetchStartTimeout`, 10 min b’mod awtomatiku)
  nieqes marġni ta’ 5 sekondi: mingħajr dan il-limitu, il-max-wait default ta’ 20 minuta
  ikun itwal mit-talba u l-irqad jinqata’ f’nofsu, u joħroġ `TimeoutError` minflok it-tmiem
  grazzjuż ta’ `max_wait` + cooldown.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, rollover tat-tieqa ta’ 5 sigħat, jew
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (li jtemmha bħala
  `extra_usage` fuq kwalunkwe status, peress li l-overage imħallas issa jkopri l-ħajt) itemmu l-linja;
  ir-rispons imbagħad jgħaddi mill-passaġġ normali tal-cooldown. `budget_exhausted` jinżamm
  fil-memorja sal-reset tal-baġit imħabbar (massimu ta’ 8 ijiem).
- Il-verifika tal-ħajt issir wara r-retries intra-attempts tal-eżekutur stess ikkawżati minn 400
  (editjar tal-kuntest, limiti ta’ thinking/effort, tagħlim awtomatiku tal-parametri), għalhekk ħajt `429`
  li jidher biss f’waħda minn dawk ir-retries xorta jiġi interċettat minflok ma jasal fil-passaġġ tal-cooldown.
- L-istat jinżamm fil-memorja għal kull konnessjoni (restart jiswa ħajt `429` addizzjonali biex jerġa’ jiġi aċċettat).

**Reset tal-limitu tas-sessjoni** (`autoLimitReset`, ippruvat qabel il-linja meta t-tnejn ikunu mixgħula):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blokk
  `juniper_tide`; meta `arm: "reset"` u `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` b’
  `{ "program": "juniper_tide" }` (UUID tal-organizzazzjoni minn `providerSpecificData.organizationUUID`, b’fallback ta’ bootstrap).
- `result: reset|not_limited` → it-talba terġa’ tiġi ppruvata b’veloċità sħiħa (mingħajr header slow).
  `already_used` / `not_offered` jimmemorizzaw `next_available_at` (default ġimgħa); kwalunkwe
  falliment iwassal għal backoff ta’ 15-il minuta. Ir-reset isir darba fil-ġimgħa u xorta jgħodd
  kontra l-limitu ta’ kull ġimgħa.

Gwardji ta’ regressjoni: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinità tas-sessjoni (#7274)

**Ambitu:** sessjoni waħda tal-klijent (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) marbuta ma’ konnessjoni waħda, għal **kwalunkwe** provider.

**Għan:** iżżomm aġent b’diversi turns (Claude Code, aider, aġenti personalizzati) fuq l-istess kont bejn it-talbiet, u b’hekk tnaqqas it-telf tal-kuntest bejn il-kontijiet u `429` ripetuti ta’ cold-start fuq providers bi stat tas-sessjoni għal kull kont.

**Implimentazzjoni:**

- Riżoluzzjoni tat-TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Għażla/ħolqien tal-pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Estrazzjoni tal-header (ġenerika, għal kwalunkwe provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabella persistenti tal-pins: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (TTL globali f’ms, `0` jiddiżattiva) — `src/lib/db/settings.ts`. Imsejjaħ mill-ġdid mill-`codexSessionAffinityTtlMs` li kien esklussiv għal Codex permezz tal-migrazzjoni `124_generic_session_affinity_ttl.sql`, li ġġorr kwalunkwe TTL ta’ Codex ikkonfigurat qabel bħala d-default il-ġdid.

Qabel #7274, `resolveSessionAffinityTtlMs()` kien jieqaf immedjatament b’`0` għal kull provider minbarra
`codex`, għalhekk is-setting tat-TTL (u l-session headers) ma kellhom l-ebda effett imkien ieħor, minkejja li l-mekkaniżmu tal-pinning u l-estrazzjoni tal-header kienu diġà agnostiċi għall-provider. It-tiswija neħħiet dak ir-ritorn bikri; it-TTL issa japplika b’mod uniformi għal kull provider ladarba jiġi ssettjat globalment għal aktar minn `0`.

It-tliet session-affinity headers qatt ma jiġu forwardjati upstream — l-eżekuturi jibnu l-headers upstream tagħhom mill-bidu minflok jgħaddu l-headers tal-klijent, għalhekk dan jibqa’ biss ID intern ta’ korrelazzjoni.

### Leases esklussivi ta’ konnessjonijiet għal sessjonijiet ġestiti

**Ambitu:** klijent HTTP/session wieħed immaniġġjat attiv jippossjedi konnessjoni OmniRoute waħda eliġibbli.

**Għan:** jipprovdi sjieda esklużiva dejjiema tal-konnessjoni għall-klijenti li jeħtieġu
fruntiera ta’ routing stretta bejn it-talbiet. Dan huwa differenti mill-affinità tas-session, li hija preferenza
ta’ kontinwità ratba: lease esklużiv jippersisti l-istat taċ-ċiklu tal-ħajja f’SQLite, jinforza l-uniċità
globali tas-sid attiv u tal-konnessjoni attiva, u jirrifjuta ġenerazzjoni skaduta qabel id-dispaċċ lill-provider.

Il-karatteristika hija opt-in għal kull ċavetta API. Ċavetta mmaniġġjata għandu jkollha l-ambitu `lease:exclusive` u lista
`allowedConnections` espliċita u mhux vojta. Kull klijent HTTP jista’ juża l-endpoint taċ-ċiklu tal-ħajja; l-ebda
isem tal-klijent, user-agent, provider, metodu OAuth, jew mudell mhu meħtieġ. Il-lease jippossjedi konnessjoni,
mhux mudell, għalhekk bidla fil-mudell iżżomm l-irbit waqt li l-konnessjoni tibqa’ eliġibbli b’mod ordinarju. Ir-regoli
normali tal-mudell, tal-kwota, tas-saħħa, tal-perjodu ta’ cooldown, u tal-lista ta’ permessi jibqgħu awtorevoli u jistgħu
jittrasferixxu l-istess ġenerazzjoni għal konnessjoni eliġibbli oħra ħielsa.

Iċ-ċiklu tal-ħajja huwa `POST /api/v1/session-leases` b’azzjonijiet JSON `acquire`, `renew`, u `release`.
It-talbiet ta’ inferenza mmaniġġjati jippreżentaw il-valur opak ta’ `X-OmniRoute-Lease-Owner` u
`X-OmniRoute-Lease-Generation` eżatt. Is-sid juża `vlo_` segwit minn 43 karattru base64url; tinħażen biss
il-hash SHA-256 tiegħu. Kull fruntiera ta’ dispaċċ finali torbot ukoll l-ID taċ-ċavetta API awtentikata u l-ID
tal-konnessjoni attiva. L-intestaturi ta’ kontroll tal-lease jitneħħew mil-logs, mill-istampi miżmuma tat-talbiet,
u mill-intestaturi tal-eżekutur upstream.

Jekk ir-routing ordinarju jkollu kandidati mmaniġġjati eliġibbli iżda kull kandidat ħieles ikun okkupat minn lease
attiv barrani, OmniRoute jirritorna HTTP `429`, il-kodiċi `lease-capacity-unavailable`, stat ta’ stennija
għall-kapaċità, u `Retry-After` limitat derivat mill-aktar skadenza rilevanti bikrija.
L-eliġibbiltà vojta ordinarja mhijiex kontestazzjoni ta’ lease u żżomm is-semantika eżistenti tal-iżbalji tar-routing.

Il-mekkaniżmi relatati jibqgħu separati:

- L-okkupazzjoni tas-session OAuth hija distribuzzjoni ratba lokali għall-proċess għall-kontijiet OAuth.
- Is-semaphores tal-kont jagħtu permessi għall-konkorrenza tat-talbiet u jintemmu meta titlesta talba.
- Il-leases esklużivi tas-sessions immaniġġjati huma sjieda dejjiema taċ-ċiklu tal-ħajja b’fruntiera tal-ġenerazzjoni.

## 3. Illokkjar tal-Mudell

**Ambitu:** it-triple tal-fornitur + konnessjoni + mudell.

**Ambitu skont l-istatus:** l-istatus li qed ifalli jiddetermina liema ċavetta juża l-illokkjar biex jikteb
fiha (`resolveLockoutScope()` f’`open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — sinjal ta’ kwota jew intitolament — illokkja l-**familja tal-kwota**:
  għal codex l-ambitu kollu `codex` / `spark` (kull mudell `gpt-5*` tal-
  konnessjoni), għal fornituri oħra `getQuotaScopedModelForProvider()`.
- `404` jillokkja l-mudell bażiku (`getModelLockKey()` inaqqas l-ambitu għal `not_found`).
- Kwalunkwe status ieħor — fallimenti tat-trasport/server `5xx` u l-`502` sintetizzat minn OmniRoute
  stess mill-validazzjoni tal-kwalità — jillokkja biss it-triple
  **eżatt** tal-fornitur/konnessjoni/mudell. Stream ħażin fuq mudell wieħed mhuwiex evidenza dwar il-kwota
  tal-kont; qabel din ir-regola, tweġiba vojta waħda fuq
  `codex/gpt-5.6-luna` kienet tneħħi kull mudell `gpt-5*` ta’ dik il-konnessjoni mir-routing għal
  2–30 minuta (biż-żieda gradwali), filwaqt li l-kwota tagħha ma kinitx tintmess.
- L-għażla esplicita `scope` ta’ min iċempel dejjem tirbaħ (Antigravity jgħaddi `"exact"`).

**Għan:** tevita li tiddiżattiva konnessjoni sħiħa meta jkun mudell wieħed biss li ma jkunx disponibbli jew li jkollu limitazzjoni tal-kwota.

**Eżempji:**

- Fornituri bi kwota għal kull mudell li jirritornaw 429
- Fornituri lokali li jirritornaw 404 għal mudell wieħed nieqes
- Fallimenti ta’ permess speċifiċi għall-fornitur tal-modalità/mudell (eż. il-modalitajiet ta’ Grok)

**Implimentazzjoni:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard tal-Perjodi ta’ Stennija tal-Mudelli (v3.8.0)

UI: Settings → Perjodi ta’ Stennija tal-Mudelli (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Jelenka l-illokkjamenti attivi b’dan li ġej: fornitur, konnessjoni, mudell, raġuni, expiresAt. L-operaturi jistgħu jerġgħu jippermettu mudell manwalment mill-karta.

**REST API:**

- `GET /api/resilience/model-cooldowns` — jelenka l-illokkjamenti attivi
- `DELETE /api/resilience/model-cooldowns` — jerġa’ jippermetti manwalment. Body: `{provider, connection, model}`. Auth: management.

### Maniġer tal-Perjodi ta’ Stennija

UI: Monitoring → Maniġer tal-Perjodi ta’ Stennija (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Paġna waħda għal kull konnessjoni li tkun barra mir-routing għal raġuni temporanja, minflok ma
tinfetaħ il-paġna ta’ kull fornitur. Telenka l-perjodi ta’ stennija tal-konnessjonijiet, l-illokkjamenti
tal-mudelli u l-istati terminali, tneħħihom għal kull konnessjoni, għal għażla, jew għall-konnessjonijiet kollha ta’ fornitur,
u teditja r-regoli tal-perjodi ta’ stennija li jintużaw l-aktar: `streamStallCooldown.enabled` u l-`connectionCooldown`
tal-OAuth / API-key, inkluż il-perjodu bażi ta’ stennija u l-passi massimi ta’ backoff (issejvjati permezz ta’
`PATCH /api/resilience`). L-istati terminali (`banned`, `expired`, `credits_exhausted`) huma
elenkati iżda qatt ma jitneħħew minn hawn.

Il-karta **Regoli tal-perjodu ta’ stennija għall-iżbalji** fuq l-istess paġna teditja r-regoli tal-iżbalji tal-operatur
(`settings.providerErrorRules`) u d-defaults ġenerali għal kull fornitur
(`settings.providerErrorDefaults`) permezz ta’ `PATCH /api/settings` — ara “Regoli ddikjarati mill-operatur”
taħt §7 għal kif jaqblu. It-tulijiet huma Default (l-ebda perjodu ta’ stennija espliċitu), 30 minuta,
1 siegħa, 5 sigħat, 24 siegħa, jew valur personalizzat minn 1 sa 43,200 minuta (30 jum).

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — konnessjonijiet bl-istatus, il-perjodu ta’ stennija li fadal,
  il-livell tal-backoff, l-aħħar tip ta’ żball u l-illokkjamenti tal-mudelli (mingħajr kredenzjali)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` jew
  `{all: true, provider?}`; jirritorna `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI tas-settings tal-illokkjar tal-mudelli + irkupru bit-tnaqqis wara suċċess (v3.8.23)

L-illokkjar tal-mudelli għadda minn imġiba dejjem attiva u kkodifikata b’mod fiss għal karatteristika kompletament konfigurabbli,
attivata b’mod fakultattiv, bil-karta tas-settings tagħha stess u mogħdija ta’ rkupru li tfejjaq lilha nnifisha.

**Karta tas-settings:** Settings → Illokkjar tal-Mudelli
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Din hija **differenti** minn `ModelCooldownsCard` li tinqara biss hawn fuq (li sempliċement
_elenka_ l-illokkjamenti attivi) — il-karta l-ġdida _tikkonfigura l-parametri_. Id-defaults jinsabu f’`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Setting                 | Default                          | Meaning                                                                     |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Swiċċ prinċipali — l-illokkjar tal-mudelli huwa **mitfi b’mod awtomatiku**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | L-istatus upstream li jgħoddu bħala falliment immirat lejn mudell.          |
| `baseCooldownMs`        | `120_000` (120 s)                | It-tul inizjali tal-illokkjar għall-ewwel falliment.                        |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Il-limitu fuq il-perjodu ta’ stennija miżjud gradwalment.                   |
| `maxBackoffSteps`       | `10`                             | In-numru massimu ta’ passi ta’ eskalazzjoni tal-exponential backoff.        |
| `useExponentialBackoff` | `true`                           | Jekk fallimenti ripetuti jżidux il-perjodu ta’ stennija b’mod esponenzjali. |

Is-settings jinħażnu permezz tal-maħżen normali tas-settings u jiġu vvalidati permezz tal-iskema tas-settings tar-reżiljenza; il-karta tillimita
`baseCooldownMs`/`maxCooldownMs` (b’`maxCooldownMs ≥ baseCooldownMs`) u `maxBackoffSteps`.

**Irkupru bit-tnaqqis wara suċċess:** l-irkupru **mhuwiex** sempliċement l-iskadenza tat-tajmer. Tweġiba b’saħħitha
tnaqqas gradwalment l-għadd ta’ fallimenti tal-mudell sabiex mudell li rkupra
f’nofs it-tieqa ma jibqax iżid l-eskalazzjoni (u jitnaddaf) qabel ma jiskadi t-tajmer tiegħu. Fuq mira combo ta’ suċċess,
`open-sse/services/combo.ts` issejjaħ `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), li **tnaqqas bin-nofs** il-
`failureCount` maħżun (`Math.floor(failureCount / 2)`); meta jilħaq `0` l-entrata tal-illokkjar titħassar kompletament. Il-kontroparti
`recordModelLockoutFailure()` iżżid l-għadd (u żżid il-perjodu ta’ stennija) fuq fallimenti fit-tieqa tal-eskalazzjoni. Dan it-tnaqqis wara suċċess huwa addizzjonali għall-iskadenza sempliċi tat-tajmer —
kwalunkwe waħda miż-żewġ mogħdijiet tista’ terġa’ tippermetti mudell.

**Stat:** l-imblukkar jinżamm **fil-memorja** (`Map`s għal kull proċess ta'
`ModelLockoutEntry` indiċjati bi `provider:connectionId:model`, filwaqt li s-serraturi
ta' skop eżatt huma indiċjati bi `provider:connectionId:exact:model`), u ma jinżammx
fid-DB — jintilef wara r-riboot. Is-_settings_ jinżammu; l-_istat_ attiv tal-imblukkar
huwa temporanju.

---

## 4. Kontroll tal-Konkorrenza tal-Quota-Share (v3.8.36)

Il-kontijiet ta’ abbonament (GLM, MiniMax, eċċ.) spiss jaċċettaw biss madwar 1–3
talbiet konkorrenti; jekk jinqabeż dan il-limitu, jiġu attivati 429s u perjodi ta’
tkessiħ. Dan huwa partikolarment problematiku taħt kombinazzjonijiet
**quota-share** (`qtSd/…`), fejn diversi ċwievet API jaqsmu l-istess kont upstream.
Tliet saffi jipprevjenu li kont kondiviż jiġi mgħarraq.

### Limitu tal-konkorrenza għal kull konnessjoni (`max_concurrent`)

Kull konnessjoni tal-fornitur tista’ tiddikjara limitu massimu ta’
`max_concurrent`
(`provider_connections.max_concurrent`, issettjat fil-modal tal-konnessjoni / API / DB).
Ħallih vojt jekk ma tridx limitu. Dan huwa l-uniku kontroll li jmexxi s-saff ta’
serializzazzjoni hawn taħt — issettjah għall-konkorrenza reali tal-kont (eż. GLM ~1,
MiniMax ~2).

### Limiti tal-konkorrenza għal kull mudell (`modelConcurrency`)

Konnessjoni tista’ tiddikjara wkoll limiti eżatti tal-konkorrenza għal kull mudell
fil-mappa `rateLimitOverrides` tagħha:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Issettjaha fil-modal tal-konnessjoni (**Rate limit overrides → Per-model
concurrency caps**, `model=cap` waħda għal kull linja) jew permezz ta’
`PATCH /api/providers/[id]` bl-istess struttura JSON. Is-sinjifikat taċ-ċwievet:

- **Konnessjoni kollha kemm hi vs speċifiku għall-mudell:** `maxConcurrent` jibqa’
  l-limitu kondiviż għall-konnessjoni kollha. Meta japplikaw it-tnejn, iż-żewġ
  gates jinkisbu atomikament fl-istess gate kompost
  (`global → provider → account → model`); l-imġiba effettiva tkun dik tal-limitu
  applikabbli l-aktar strett.
- **Qbil eżatt maċ-ċavetta tal-mudell:** iċ-ċavetta hija s-sekwenza tal-mudell
  mgħoddija lill-eżekutur wara r-riżoluzzjoni tar-routing — normalment l-ID mhux
  modifikat tal-mudell upstream (`glm-5`), mhux alias `provider/model`
  min-naħa tal-klijent (`zai/glm-5` ma jaqbilx ma’ `glm-5`). Il-valuri huma limiti
  pożittivi, interi, għan-numru ta’ talbiet konkorrenti.
- **Kju lokali, mingħajr skoperta:** it-talbiet żejda jidħlu fil-kju lokalment
  bis-semantika eżistenti tal-kju/time-out (żbalji ta’ ammissjoni ttajpjati
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute ma jiskoprix u lanqas
  ma jiddeduċix il-politika upstream — jinforza l-limiti eżatti kkonfigurati
  mill-operatur. Gate tal-mudell saturat qatt ma jiddiżattiva l-fornitur u qatt
  ma joħloqx imblukkar permanenti tal-mudell; l-imġiba tal-429/cooldown/fallback
  upstream tibqa’ l-mekkaniżmu ta’ riżerva għall-iżbalji.
- **Ambitu għal kull konnessjoni u għal kull proċess:** il-limiti huma għal kull
  konnessjoni fid-database u jinżammu fil-memorja, għalhekk żewġ konnessjonijiet
  li jerġgħu jużaw l-istess ċavetta API upstream ma jikkoordinawx bejniethom.
- **Mhux ikkonfigurat ifisser l-ebda bidla:** jekk ma tinkludix il-mappa (jew
  tħalli l-qasam tad-dashboard vojt), ma jiżdied l-ebda gate tal-mudell.
  Eżempju ta’ konfigurazzjoni mingħajr ma jiġi ddikjarat limitu universali
  għall-fornitur:

```text
glm-5=1
glm-4.7=3
```

### Serializzazzjoni tat-talbiet ta’ Quota-Share

Meta dispatch ta’ quota-share jimmira lejn konnessjoni li tiddikjara
`max_concurrent` pożittiv, it-talbiet konkorrenti għal dak il-**kont** jiġu
serializzati permezz ta’ semaphore għal kull konnessjoni (ċavetta
`qsconn:<connectionId>`): it-talbiet żejda **jistennew fil-kju** minflok jgħarrqu
l-kont. Dan huwa **fail-open** — kju saturat jew time-out ikompli mingħajr slot,
minflok qatt ma jirrifjuta talba li tista’ tiġi dispatchjata. Ixgħel jew itfi dan
f’**Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, mixgħul
awtomatikament). Mingħajr limitu `max_concurrent`, l-imġiba ma tinbidilx.

> Il-gate tar-routing tal-quota-share (`selectQuotaShareTarget`, DRR + P2C) huwa
> wkoll fail-open u sempliċement _jagħti prijorità aktar baxxa_ lil konnessjoni
> li tkun fil-limitu — b’pool ta’ konnessjoni waħda ma jistax jimponi limitu iebes,
> għalhekk dan is-semaphore huwa dak li fil-fatt jikkontrolla l-għargħar.

### Retry tal-combo konxju mill-cooldown

Għal kull strateġija ta’ combo (meta tkun attivata), talba li kienet tikkristallizza
429 minħabba cooldown tranżitorju QASIR tistenna li jgħaddi u terġa’ tiġi
dispatchjata minflok tirritorna l-429 — dan ikopri twieqi TPM/RPM tal-klassi Gemini
(~60s retry-after) fuq combos b’diversi mudelli, pereżempju meta ż-żewġ miri ta’
combo b’2 mudelli jolqtu limitu tar-rata għal kull mudell. Dan huwa limitat minn
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) f’**Settings → Resilience**. Qatt ma jistenna fuq
`quota_exhausted` (imsakkar sa nofsillejl) jew fuq raġunijiet ta’ awtentikazzjoni/
not-found.

Combo jista’ jagħżel li ma jipparteċipax billi juża
`config.comboCooldownWaitEnabled: false`. `false` litterali biss jiddiżattiva
dawn l-istennijiet kondiviżi tal-combo (cooldown wara d-dispatch u stennijiet
qabel id-dispatch meta ċ-ċirkwit ikun miftuħ/mudell ikun imsakkar) u l-estensjoni
tal-floor tat-time-out tal-baġit tal-istennija tagħhom. Jekk ma jkunx hemm il-valur
jew ikun `true`, il-politika globali tibqa’ fis-seħħ; `true` ma jistax jattiva
stennija li hija diżattivata globalment. `targetTimeoutMs` esplicitu jibqa’
jirbaħ. Din l-għażla ma tbiddilx l-istennija separata qabel id-dispatch tal-native-
Codex turn-pin.

L-istess gate ikopri l-każ ta’ qabel id-dispatch (#16319): meta kull mira ta’ combo
tinqabeż qabel ma jsir kwalunkwe tentattiv minħabba li l-mudell tagħha jkun fi
stat ta’ mblukkar tranżitorju qasir, il-passaġġ b’żero tentattivi jistenna li
jispiċċa l-imblukkar taħt l-istess limiti u jerġa’ jagħmel id-dispatch, minflok
jirrispondi b’`503 ALL_TARGETS_SKIPPED` mingħajr ħjiel. Meta ma tkun permessa l-ebda
stennija (il-limitu, it-tentattivi jew il-baġit ikunu eżawriti, jew il-karatteristika
tkun mitfija), ir-rispons terminali jinbidel għal
`429 rate_limit_error` li jġorr `retry_after` / `reset_at` mill-aktar skadenza
bikrija tal-imblukkar tranżitorju; l-imblukkar tal-kwota, tal-awtentikazzjoni u
tal-not-found jibqa’ `503` mingħajr ħjiel.

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

## 5. Kontroll tal-Ammissjoni tal-Kju tat-Talbiet (v3.8.49 · issue #6593)

**Skop**: il-kju lokali tal-limitu tar-rata għal kull provider+konnessjoni (`open-sse/services/rateLimitManager.ts`, mibbni fuq Bottleneck), saff wieħed taħt it-tliet mekkaniżmi ta' hawn fuq.

**`maxWaitMs` jillimita l-istennija fil-kju; `executionMaxWaitMs` jillimita l-eżekuzzjoni.**
It-tnejn huma deliberatament separati, u l-ebda wieħed minnhom ma jitma' lill-ieħor.

`resilienceSettings.requestQueue.maxWaitMs` huwa l-**baġit tal-istennija fil-kju**: jkopri l-istennija għal slot tal-provider u mbagħad il-qagħda QUEUED, u t-tajmer tiegħu jitneħħa fil-mument li x-xogħol joħroġ minn QUEUED u jibda jiġi eżegwit (`rateLimitManager.ts`, `wrappedFn`). Talba li taqbeżu qatt ma tasal fl-upstream. Default 30000ms, fornut minn `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` f'`src/lib/resilience/settings.ts` u ffissat minn `tests/unit/ratelimit-admission-control-6593.test.ts`, għalhekk bidla fih tagħmel dak it-test aħmar minflok ma tħalli dan il-paragrafu jiskadi bil-moda.

`resilienceSettings.requestQueue.executionMaxWaitMs` huwa dak li Bottleneck jirċievi bħala l-`expiration` tax-xogħol, li t-tajmer tiegħu jibda biss wara d-dispatch. Huwa salvagwardja għal eżekuturi mingħajr timeout tal-upstream tagħhom stess, u jitgħolla sat-timeout tal-bidu tal-fetch tal-eżekutur innifsu meta dak jkun itwal, sabiex ma jistax jaqta' rispons b'saħħtu li diġà għaddej. Default 600000ms (10 min).

Li ddahħal il-baġit tal-kju fl-`expiration` huwa dak li kien joqtol il-gateways mhux inkrementali f'nofs it-titjira — huma leġittimament jaħdmu għal minuti qabel l-ewwel bytes — u hu għalhekk li expiration titfaċċa bħala `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) filwaqt li l-baġit tal-kju jġorr il-kodiċi tat-timeout tal-kju. Jista' jiġi overridden kull wieħed minnhom permezz ta' `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) jew id-dashboard (**Settings → Resilience**). It-tnejn jiġu kklemjati għal 1ms–24h meta jiġu normalizzati.

**Preċedenza, għal it-tnejn:** il-varjabbli env tipprovdi biss id-_default_. Valur persistit f'`resilienceSettings.requestQueue` (dashboard / API patch, maħżun f'`key_value`) jirbaħ fuqu, u `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` għal kull konnessjoni jirbaħ fuq dak. L-issettjar tal-varjabbli env fuq deployment li diġà għandu valur persistit għalhekk ma jibdel xejn — neħħi jew aġġorna s-setting persistit minflok.

Il-żmien li talba tgħaddi fil-kju huwa limitat minn `maxWaitMs`; `maxQueueDepth` hawn taħt jillimita kemm sejħiet jistgħu jkunu kkewwati f'daqqa.

**Erġa' pprova ddikjarat fil-body: pacing vs lockout.** Body ta' 429 jista' jissemma l-istennija tiegħu stess (Gemini `RetryInfo.retryDelay`, test "retry after Ns"), li `updateFromResponseBody` jaqra. Stennija li taqbel fil-`maxWaitMs` tal-konnessjoni hija pacing: il-limiter joħtolli r-riżerva tiegħu għal dak iż-żmien u s-sejħiet kkewwati jitbagħtu meta terġa' timtle. Stennija itwal minn `maxWaitMs` mhijiex xi ħaġa li l-kju jista' jistenna sal-aħħar — Gemini tweġiba għal kwota ta' kuljum eżawrita bi `retryDelay: "86399s"`. Il-`Retry-After` trasmess fuq il-429 mibni mill-ġdid (#16528) diġà jagħmel lill-magna tal-fallback tagħlaq il-mudell għal dik it-tieqa, iżda li l-limiter jiġi ppawzat għaliha wkoll xorta jwaqqaf kwalunkwe sejħa li tasal għall-key bikri (wara reset tar-reżiljenza, per eżempju) għall-`maxWaitMs` kollu. Meta stennija bħal din tiġi minn dettal Google `RetryInfo` ttajpjat (il-provenjenza `google_rpc_retry_info`) u l-limiter tal-key diġà huwa skopjat għall-mudell (ara `getLimiterKey`), il-429 minflok isir lockout tal-mudell fuq dik il-konnessjoni (`lockModelForLongBodyRetry` f'`open-sse/services/rateLimitManager/bodyRetryPause.ts`, limitat għal 24h), u l-limiter jitħalla mhux ppawzat. L-għażla tal-kont taqbeż fuq dak il-lock permezz ta' `isModelLocked()`, u hekk tagħmel ukoll il-gate tal-qabel id-dispatch tal-combo għal targets mwaħħlin mal-konnessjoni. Fuq antigravity, li l-limiter tiegħu huwa għal kull familja ta' kwota, il-lock huwa fuq il-mudell eżatt, bħall-locks l-oħra tal-kwota tiegħu. L-isem li l-klijent talab jiġi mblukkat ukoll meta alias jirriżolvih għal dak il-mudell, għax dawk il-kontrolli jużaw l-isem mitlub; jiġi mblukkat eżattament (`lockExactModel`), għalhekk alias li jaqbeż familja ta' kwota ta' antigravity jew skop ta' codex qatt ma jimblukka tiegħu stess. Ħjiel fit-test, `retryDelay` mhux ttajpjat, jew limiter maqsum mill-konnessjoni kollha iżommu l-pawza. Meta l-limiter li l-mogħdija tal-429 għadu kif bena tippawza, caller li l-ħin li fadal lu fil-kju jintemm qabel ma tispiċċa l-pawza jiġi mrefuġat minnufih bil-kodiċi tat-timeout tal-kju (`checkLimiterPause`) minflok ma jistenna dak iż-żmien sal-aħħar; it-tmiem irreġistrat huwa ankrat qabel ma jinbena l-limiter, fejn Bottleneck jibda l-arloġġ tar-refresh tiegħu, u kwalunkwe bidla aktar tard fir-riżerva tinsieh. Kopert minn `tests/unit/rate-limit-long-body-retry-lockout.test.ts` u `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — limitu tal-ammissjoni opt-in (ġdid).** `resilienceSettings.requestQueue.maxQueueDepth` jillimita kemm talbiet jistgħu jibqgħu kkewwati (għadhom ma ġewx dispatched) għal provider+konnessjoni waħda f'daqqa. Meta l-kju diġà jkun fih `maxQueueDepth` talbiet, talba ġdida tiġi mrifużata malajr b'żball ttajpjat `code: "RATE_LIMIT_QUEUE_FULL"` **qabel** qatt ma tasal f'`limiter.schedule()` — allura r-rifjut huwa rħis u jiġri qabel kwalunkwe xogħol ta' kompressjoni tal-prompt / traduzzjoni downstream għal dik it-talba. Default `0` = diżabilitat, u b'hekk jippreżerva l-imġiba eżistenti ta' kju bla limitu; limitat 0–100000. Override permezz ta' `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) jew `resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Il-kontroll tal-ammissjoni innifsu huwa funzjoni pura (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) sabiex ikun jista' jiġi ttestjat b'unit tests mingħajr limiter Bottleneck reali.

> L-RFC li fetaħ #6593 ppropona wkoll flag `bypassCompressionOnRateLimit`. Il-pipeline `open-sse/services/compression/` ta' dan ir-repo hija kompressjoni tal-prompt/kuntest fuq it-talba LLM li toħroġ (`chatCore.ts`, madwar il-blokka `resolveCompressionSettings`/`selectCompressionStrategy`), mhux kompressjoni ta' rispons HTTP fuq korpi 429 sinterizzati — m'hemm l-ebda mogħdija ta' kodiċi li tikkorrispondi ma' flag bypass letterali. Dak il-pass tal-kompressjoni tal-prompt bħalissa jaħdem wkoll _qabel_ `withRateLimit()` fil-pipeline tat-talba, għalhekk ir-riordnar biex jiġi msaħħab f'każ ta' rifjut minħabba kju mimli hija bidla separata u akbar mill-ambitu ta' din l-issue; apposta **ma** ġietx implimentata hawn u ġiet ħallata bħala follow-up jekk il-qligħ fl-iffrankar tal-CPU jiswa r-riskju tar-riordnar.

### Xibka ta' Sigurtà għall-Attivazzjoni Awtomatika tar-Rate-Limit u Protezzjoni tal-Konnessjoni (`rateLimitProtection`)

**Xibka ta' sigurtà għall-attivazzjoni awtomatika** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, default `true`):
B'mod default, OmniRoute jattiva awtomatikament il-protezzjoni tal-kju tar-rate-limit għall-konnessjonijiet kollha attivi tal-fornituri b'ċavetta API (`getProviderCategory(provider) === "apikey"`). Dan jiżgura li t-talbiet li jaslu lejn ċwievet API upstream sensittivi għar-rata jitqiegħdu f'kju u jiġu mrażżna permezz ta' Bottleneck minflok ma jisplodu fi żbalji 429 upstream. Ix-xibka ta' sigurtà tista' tiġi mbażżla permezz tal-varjabbli tal-ambjent `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` jiddiżattiva, `true`/`1`/`on` jisfurzaha mixgħula), li għandu preċedenza fuq l-issettjar persistenti fid-dashboard (**Settings → Resilienza** / `PATCH /api/resilience`).

**Semantika ta' `rateLimitProtection` għal kull konnessjoni:**
Il-protezzjoni tar-rate-limit għal kull konnessjoni tiġi rrakkjata permezz tal-kamp boolean `rateLimitProtection` fuq il-konnessjonijiet tal-fornituri (persistenti bħala `rate_limit_protection` f'SQLite):

- **Mixgħul esplicitament (`rateLimitProtection === true`)**: Il-protezzjoni tar-rate-limit hija attivata b'mod esplicitu għal din il-konnessjoni, irrispettivament mill-kategorija tal-fornitur jew jekk ix-xibka ta' sigurtà għall-attivazzjoni awtomatika hix mixgħula.
- **Mitfi esplicitament (`rateLimitProtection === false`)**: Jiddiżattiva l-protezzjoni esplicita, iżda **ma** joħroġx konnessjoni attiva b'ċavetta API minn taħt ix-xibka ta' sigurtà globali għall-attivazzjoni awtomatika. F'`reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` u `undefined` huma ekwivalenti: biss `rateLimitProtection === true` jiġi ttrattat bħala override esplicitu. Jekk `rateLimitProtection` ikun `false` (jew mhux issettjat), konnessjoni attiva b'ċavetta API xorta waħda tissodisfa l-kundizzjoni tal-attivazzjoni awtomatika u tibqa' protetta mir-rate-limit.
- **L-ebda opt-out għal konnessjoni waħedha**: Operatur bħalissa ma jistax jesprimi "din il-konnessjoni waħedha attiva b'ċavetta API għandha taħdem mingħajr protezzjoni tal-kju tar-rate-limit" filwaqt li jżomm l-attivazzjoni awtomatika attiva għall-oħrajn. Biex il-konnessjonijiet b'ċavetta API jimxu kompletament mingħajr kjus tar-rate-limit, ix-xibka ta' sigurtà trid tintefa' globalment (`RATE_LIMIT_AUTO_ENABLE=false` jew `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Mogħdijiet ta' kitba appoġġjati:**

- **`POST /api/rate-limits`**: Il-mogħdija appoġġjata ta' kitba għall-ġestjoni biex tbiddel `rateLimitProtection` għal konnessjoni (`{ connectionId: string, enabled: boolean }`). Meta tiġi msejħa b'`enabled: true`, tixgħel il-protezzjoni esplicita; meta tiġi msejħa b'`enabled: false`, tneħħi l-protezzjoni esplicita (għalkemm il-konnessjonijiet attivi b'ċavetta API jibqgħu koperti tax-xibka ta' sigurtà globali jekk l-attivazzjoni awtomatika tkun mixgħula).
- **`PUT /api/providers/[id]`**: Apposta **ma** jaċċettax u lanqas jibdel `rateLimitProtection` (#11278). L-aġġornament tal-metadata tal-konnessjoni tal-fornitur permezz ta' `PUT /api/providers/[id]` qatt ma jibdel l-istat persistenti tal-protezzjoni tar-rate-limit.

---

## 6. Watchdog tal-fluss bil-mod (#9709)

Il-gwardja `resilienceSettings.streamRecovery.throughputWatchdog` fakultattiva tiskopri upstream li għadu jibgħat biċċiet iżda jipproduċi output ta 'assistent taħt ir-rata ta' output utli konfigurata. Huwa deliberatament distint mill-timeout idle: it-taħbit tal-qalb u l-metadejta reset la timer u ma jgħoddux bħala progress. Hija wkoll distinta mill-iskadenza tal-attentat iebsa (#9153), li tibqa 'limitu ta' sikurezza assolut irrispettivament mill-kwalità tal-produzzjoni.

Il-kelb tal-għassies jeħtieġ perjodu ta' tisħin segwit minn tieqa sħiħa tal-irrumblar qabel ma tkun tista' tabortixxi. Jgħodd deltas tat-test mill-avvenimenti tal-output ta' Tlestija u Rispons ta' Chat API (proxy UTF-8 byte konservattiv), jinjora avvenimenti ta' użu biss u avvenimenti vojta, u jissospendi l-ġudizzju waqt li l-avvenimenti tas-sejħa tal-għodda jew tar-raġunament ikunu għaddejjin. Hija diżattivata b'mod awtomatiku u tista 'tiġi attivata `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (dak il-valur env żerriegħa biss il-default — a `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean salvata jirbaħ; ara n-nota ta' preċedenza env-vs-dashboard fil-quċċata ta 'din il-gwida); it-tieqa, it-tisħin, ir-rata minima, u l-output minimu li jista 'jitkejjel huma konfinati mis-saff normali ta' normalizzazzjoni ta 'reżiljenza-settings.

Meta jkun attivat, abort ta' għassies jiġi applikat biss għat-tentattiv upstream attiv. Qabel kwalunkwe bytes viżibbli mill-klijent, il-mogħdija ta' rkupru bikri eżistenti tal-istess kont tista' terġa' tiftaħ it-tentattiv. Wara li tikkommetti, in-nixxiegħa qatt ma tintlagħab mill-ġdid bl-addoċċ; biss il-kuntratt ta 'kontinwazzjoni tan-nofs tan-nixxiegħa sikur eżistenti biss jista' joħloq suffiss. Il-finalizzazzjoni tibqa 'shot wieħed, għalhekk il-kontabilità tal-użu u r-rilaxx tas-semafori mhumiex duplikati.

---

## 7. Dikjarazzjoni mill-ġdid tal-Istatus Upstream (żbalji ta’ kwota rrappurtati ħażin)

**Ambitu:** gateway upstream wieħed li jirrapporta eżawriment temporanju tal-kwota bl-istatus HTTP ħażin.

**Għan:** jikkoreġi status qarrieqi QABEL il-klassifikazzjoni, sabiex il-konsumaturi downstream (il-magna tal-fallback, l-aggregazzjoni tal-combo, u r-rispons li jasal għand il-klijent) jaraw in-natura vera tal-falliment, li tista’ terġa’ tipprova.

Xi gateways jindikaw eżawriment TEMPORANJU tal-kwota bi status HTTP li ma jistax jerġa’ jipprova. `agentrouter.org` jirritorna `403` (xi kultant `400`) b’korp Ċiniż
(`用户额度不足` / `额度不足`) minflok l-istandard `429`. Klijenti bħal Claude
Code jqisu `403` bħala permanenti u jwaqqfu s-sessjoni, u mingħajr korrezzjoni
il-magna tal-fallback tikklassifikah bħala `AUTH_ERROR` minflok bħala avveniment
ta’ kwota.

**Implimentazzjoni:**

- Reġistru + matcher: `open-sse/config/upstreamStatusRestatement.ts` — lista
  għal kull provider ta’ regoli (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), imqabbla permezz ta’
  `applyStatusRestatement()`.
- Punt tas-sejħa: il-blokka `providerFailure:` f’`open-sse/handlers/chatCore.ts`
  (madwar il-linja 3654), eżatt wara li `parseUpstreamError()` jinterpreta
  rispons upstream bi status HTTP ta’ żball (`!providerResponse.ok`), u qabel ma
  tibda kwalunkwe klassifikazzjoni, sabiex kull konsumatur downstream jara
  l-istatus ikkoreġut. Żbalji inkorporati fi stream SSE `200` isegwu mogħdija
  separata u aktar tard għall-interpretazzjoni tal-istream, u **mhumiex** koperti
  minn dan il-hook illum — limitazzjoni magħrufa, li għadha mhix meħtieġa
  għall-misstatus ta’ agentrouter (li jidher bħala status HTTP ta’ żball).
- Eliġibbiltà għar-retry: `429` jinsab f’`RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), għalhekk żball li l-istatus
  tiegħu jkun ġie ddikjarat mill-ġdid iġorr tieqa reali għar-retry minflok ma
  jidher bħala `403` mejjet.
- Il-`60s` sintetiku ta’ `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  huwa biss dak li r-rispons iddikjarat mill-ġdid jgħid lill-**klijent**; mhuwiex
  fih innifsu t-tul intern tal-cooldown/lockout tal-konnessjoni — dan jiġi
  rregolat separatament minn kwalunkwe mekkaniżmu li fil-fatt jieħu ħsieb
  l-iżball iddikjarat mill-ġdid (Connection Cooldown bil-backoff li jiżdied, §2,
  bażi ta’ `3s` għall-providers taċ-ċwievet API; jew Model Lockout, §3, għall-
  providers bi kwota għal kull mudell bħal agentrouter). Ir-router jista’ jsir
  eliġibbli biex jerġa’ jipprova internament aktar kmieni mit-tieqa ta’ 60s li
  jirreklama lill-klijent — spazju intenzjonat, mhux bug.

L-iżbalji permanenti (`无权访问模型` ta’ agentrouter — l-ebda aċċess għal dan il-mudell) QATT ma jiġu ddikjarati mill-ġdid: `excludeMarkers` jivvota kontra r-regola anki meta `textMarkers` jaqblu, għalhekk l-iżball iżomm l-istatus oriġinali tiegħu u xejn ma jerġa’ jipprova għal dejjem. Ir-regola ta’ klassifikazzjoni tal-provider li taqbel
(`agentrouter-model-access-denied` f’`open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown bażi ddikjarat ta’ `6h`) tiġi
kkonsultata minn `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_qabel_ ir-ritorn bikri ġeneriku tal-kategorija apikey `FORBIDDEN`, ikkontrollat minn
`honorsRuleLockScope(provider)` (#10334 — bħalissa esklussivament għal
agentrouter permezz tal-allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` f’
`providerErrorRules.ts`). Il-cooldown ta’ 6h iddikjarat mir-regola jgħaddi bħala
`fallbackResult.baseCooldownMs`, iżda xorta jgħaddi mill-mogħdija eżistenti
tal-lockout għal kull mudell (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, mhux mibdula minn #10334 ħlief għas-sors tal-
cooldown): jiġi limitat ’l isfel għal `mlSettings.maxCooldownMs` tal-operatur
(default `1_800_000ms` / 30min), bħal kull lockout ieħor tal-mudell, u r-_
raġuni tal-lockout persistita_ tibqa’ l-hardcoded `"forbidden"` eżistenti minn
qabel, mhux ir-`"auth_error"` tar-regola — it-tul tal-cooldown biss jiġi
onorat minn tarf sa tarf, mhux is-sekwenza tar-raġuni. Il-konnessjoni nnifisha
tibqa’ attiva; il-mudelli aħwa fuq l-istess konnessjoni ma jiġux affettwati.

L-iżbalji tal-kwota ddikjarati mill-ġdid (`额度不足`) jaslu għal regola tal-provider fil-produzzjoni
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, mingħajr cooldown iddikjarat għalih innifsu — japplika l-backoff
skalat default tas-saff tal-persistenza). Minn #10334, `scope` fuq
`ProviderErrorRuleMatch` JIĠI kkunsmat minn tarf sa tarf, iżda **biss** għal
providers fl-allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — illum biss `"agentrouter"`, ikkontrollat permezz ta’
`honorsRuleLockScope()`). Għal kull provider ieħor, `scope` jibqa’ informattiv,
eżatt bħal qabel #10334. `checkFallbackError` jesponi l-ambitu tar-regola
mqabbla bħala `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) huwa l-gwardja kondiviża li tikkonferma li
`ruleScope` huwa verament sigur biex jiġi onorat bħala sinjal mifrux mal-
konnessjoni u li jirkupra waħdu (scope `"connection"`, reason
`quota_exhausted`, qatt `permanent`, qatt `creditsExhausted` — difiża kontra
tqabbil futur ta’ scope `"connection"` ma’ stat permanenti tal-kont). Żewġ
konsumaturi jsejħulu:

- **Persistenza** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  minflok taqa’ fil-fergħa tal-imblukkar **għal kull mudell** tal-passthrough-provider (agentrouter għandu `passthroughModels: true` → `hasPerModelQuota()` jirritorna `true`), tapplika **perjodu temporanju ta’ tkessiħ tal-konnessjoni** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, qatt status terminali
  (`credits_exhausted`/`banned`/`expired`) — sabiex il-konnessjoni tirkupra waħedha
  meta jintemm il-perjodu ta’ tkessiħ, minflok ma jkun meħtieġ reset manwali tal-kredenzjali.
  Tinqabeż għall-konnessjonijiet b’`disableCooling: true` (#2997): din l-għażla
  ta’ esklużjoni tgħaddi minflok għall-imblukkar għal kull mudell (kompromess dokumentat —
  ara l-kumment tal-kodiċi ’l fuq mill-fergħa).
- **Rotot combo fl-istess talba** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): l-istess guard jimmarka
  il-konnessjoni fis-sett fil-memorja `exhaustedConnections`, b’ċavetta
  `${provider}:${connectionId}`. Dan jaqbeż biss target li jifdal tal-ISTESS TALBA li _huwa stess diġà jġorr dak l-istess `connectionId`_ fuq l-oġġett target tiegħu stess (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` qabel it-tfittxija f’`exhaustedConnections`) — combo sempliċi ta’ lista ta’ mudelli, fejn it-targets aħwa ma jġorru l-ebda `connectionId` pinnjat tagħhom u wieħed jiġi solvut biss għal kull dispatch mill-header `X-OmniRoute-Selected-Connection-Id` tar-rispons, qatt ma jilħaq dan it-tqabbil taċ-ċavetta. Għal dan il-każ komuni, il-protezzjoni reali kontra li leg li jifdal jerġa’ juża l-kont li għadu kif ġie eżawrit MHUX dan is-Set — hija s-saff tal-persistenza ta’ hawn fuq (il-`rateLimitedUntil` tal-konnessjoni issa jinsab fil-futur) flimkien ma’ dan il-guard li jrażżan `transientRateLimitedProviders` għall-falliment (ara “Disinn f’żewġ stadji” u l-kumment tal-kodiċi fuq il-fergħa `isAgentrouterConnectionQuotaScope` f’`targetExhaustion.ts`): billi dak is-Set jitħalla mhux immarkat, il-`allowRateLimitedConnection` force-allow ta’ `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) MA jidħolx fis-seħħ għal-legs li jifdal tal-provider, għalhekk il-filtru `rateLimitedUntil` tal-għażla tal-kredenzjali (`src/sse/services/auth.ts:1238`) jiġi rispettat normalment u leg li jifdal jew jagħżel konnessjoni oħra ta’ agentrouter li għadha eliġibbli jew ifalli mingħajr kredenzjali disponibbli — ma jisforzax ruħu lura fuq il-konnessjoni li din il-fergħa għadha kif poġġiet f’perjodu ta’ tkessiħ.

### Disinn f’żewġ stadji: l-ewwel dikjarazzjoni mill-ġdid tal-istatus, imbagħad il-klassifikazzjoni

Id-dikjarazzjoni mill-ġdid tal-istatus (`upstreamStatusRestatement.ts`) u
r-regoli tal-klassifikazzjoni tal-provider (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) huma reġistri separati li t-tnejn jużaw l-id tal-provider
u markers tat-test bħala ċwievet, iżda jaħdmu f’postijiet differenti u jaqdu
għanijiet differenti: id-dikjarazzjoni mill-ġdid tikteb mill-ġdid l-istatus HTTP kmieni
f’`chatCore.ts`; ir-regoli tal-klassifikazzjoni jagħżlu r-`reason` ta’ fallback u jissakkru
l-`scope` (`model` / `provider` / `connection`) ġewwa `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Ir-regoli tal-klassifikazzjoni jaraw biss **test sħiħ** tal-iżball (meħtieġ biex
jitqabblu markers fil-body bħal `额度不足`) għall-providers elenkati fil-lista permessa
`FULL_TEXT_RULE_PROVIDERS` f’`providerErrorRules.ts` — bħalissa `"agentrouter"` biss.
Għal kull provider ieħor tal-**katalgu inkorporat**, `checkFallbackError` jgħaddi lil
`getProviderErrorRuleMatch` biss l-iżball strutturat (`{code, type}`), li huwa biżżejjed
għar-regoli bbażati fuq headers/status/code iżda ma jistax jara markers fit-test tal-body.
L-helper `resolveRuleMatchBody()` jagħmel din l-għażla: it-test sħiħ tal-iżball
għall-providers fil-lista permessa, u l-iżball strutturat inkella. Iż-żieda ta’
provider **inkorporat** ma’ `FULL_TEXT_RULE_PROVIDERS` hija għażla espliċita
għal kull provider — teżisti sabiex il-mogħdija awtomatika għal kull provider li
mhuwiex fil-lista tibqa’ eżattament l-istess byte għal byte.

L-`scope` ta’ regola (`model` / `provider` / `connection`) huwa għażla separata
minn `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` jesponih biss bħala
`fallbackResult.ruleScope`, u l-konsumaturi downstream jirrispettawh bħala xi ħaġa
aktar minn tikketta informattiva biss għall-providers fil-lista permessa
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` fl-istess fajl (ikkontrollata permezz ta’
`honorsRuleLockScope()` — illum `"agentrouter"` biss). Ara “Żbalji ta’ kwota
ddikjarati mill-ġdid” hawn fuq għal x’jagħmel eżatt match b’`scope: "connection"`
ladarba provider ikun f’dik il-lista permessa.

**#11104 — ir-regoli ddikjarati mill-operatur jevitaw iż-żewġ listi permessi.** Operatur jista’
jiddikjara regola għal kull provider waqt ir-runtime permezz ta’
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
mingħajr ma jeditja dan il-fajl. Li regola tal-operatur tiġi soġġetta għal
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — listi permessi
maħsuba biex jipproteġu l-imġiba **awtomatika** tar-regoli tal-katalgu inkorporat —
jagħmel il-mekkaniżmu tas-settings inattiv għal kull provider ħlief għal dawk li
diġà jinsabu fihom, peress li d-dikjarazzjoni tar-regola hija diġà l-għażla espliċita
tal-operatur. Kemm `resolveRuleMatchBody()` kif ukoll `honorsRuleLockScope()` l-ewwel
jiċċekkjaw `hasOperatorRuleForProvider()`: provider b’regola tal-operatur jirċievi
t-test mhux ipproċessat tal-iżball u l-`scope` iddikjarat tiegħu jiġi rispettat,
irrispettivament minn jekk jidhirx ukoll f’xi waħda miż-żewġ listi permessi.

**Regoli ddikjarati mill-operatur** (`OperatorProviderErrorRule`): kull regola għandha
`status` mhux obbligatorju u `match` mhux obbligatorju (substring sempliċi,
mhux sensittiv għall-ittri kbar u żgħar, tat-test tal-iżball, qatt RegExp, għalhekk
ma tistax tikkawża ReDoS), u trid tissettja tal-inqas waħda mit-tnejn. Meta t-tnejn
ikunu ssettjati, jiġu kkombinati b’AND; qasam li jitħalla barra jaqbel ma’ kull ħaġa,
għalhekk `{match: "insufficient_quota"}` jaqbel ma’ kwalunkwe status li jġorr dak il-code.
Tirbaħ l-ewwel regola li taqbel. `cooldownMs` jaċċetta sa 30 jum; massimu ta’ 50 regola
b’kollox.

**Defaults ġenerali** (`settings.providerErrorDefaults`, opt-in, stabbilit permezz ta'
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
b'`cooldownMs` minn minuta sa 30 jum. Default japplika biss meta l-ebda regola
tal-operatur u l-ebda regola tal-katalgu inkorporat ma tkun qabblet, u biss għal
żbalji 402, 403, 408, 429 u 5xx. Żbalji tal-forma tat-talba (400, 404, 409,
413, 422) u 401 waħedhom iżommu l-immaniġġjar tagħhom. Mingħajr `reason`
espliċitu, ir-raġuni tiġi mill-istatus, bl-istess mod kif tagħmel
`classifyError`. Id-dikjarazzjoni ta' default tgħodd bħala regola tal-operatur
għal `hasOperatorRuleForProvider()`, għalhekk l-`scope` tagħha (default
`"connection"`) jiġi rrispettat. Il-perjodu effettiv ta' tkessiħ ta' default huwa
l-itwal minn `cooldownMs` tiegħu u l-indikazzjoni ta' retry tal-provider stess
(`Retry-After`, `x-ratelimit-reset` jew indikazzjoni ta' reset fil-body, l-istess
indikazzjoni li l-engine jirrispetta meta s-setting tal-perjodu ta' tkessiħ tal-konnessjoni
"uża l-indikazzjonijiet ta' retry upstream" ikun attivat), għalhekk default jista'
jtawwal indikazzjoni upstream qasira iżda qatt ma jqassar reset reali. Regola
espliċita tal-operatur iżżomm `cooldownMs` eżatt tagħha. La regola u lanqas
default ma jevita l-protezzjonijiet tal-perjodu ta' tkessiħ tal-konnessjoni f'
`markAccountUnavailable`: perjodu ta' tkessiħ attiv u itwal qatt ma jitqassar u
status terminali qatt ma jinkiteb fuqu. Id-ditekters tat-test inkorporati li
jitħaddmu aktar kmieni f'`checkFallbackError` (krediti eżawriti, kwota ta'
kuljum, kont diżattivat) xorta jieħdu preċedenza għall-frażijiet tagħhom stess.

**Vojt magħruf — `providerRuleRegistry` qatt ma jiġi kkonsultat għal HTTP 400.**
Il-fergħa `BAD_REQUEST` ta' `checkFallbackError` tikklassifika l-istatus 400
kompletament permezz tal-arrays tal-mudelli tagħha stess
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, eċċ. f'
`accountFallback.ts`) u tirritorna qabel ma tintlaħaq il-fergħa
`configuredRule`/`getProviderErrorRuleMatch` hawn fuq. Regola tal-katalgu
inkorporat (jew regola tal-operatur) bi `status: 400` hija sintattikament valida
iżda qatt ma se taħdem. Bħalissa l-ebda regola eżistenti ma timmira lejn 400,
għalhekk xejn fil-produzzjoni ma jiġi affettwat — iżda regola futura għal 400
teħtieġ li din il-fergħa tiġi indirizzata l-ewwel, li hija bidla akbar milli
sempliċement tiżdied regola (tikklassifika mill-ġdid 400 għal kull provider li
diġà jiddependi fuq l-imġiba tal-array tal-mudelli) u tinsab barra mill-ambitu
ta' żieda ta' regola għal provider wieħed.

### Żieda ta' gateway ġdid li jiddikjara l-kwota b'mod żbaljat

1. Irreġistra array waħda ta' regoli f'`statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Żomm `textMarkers`
   speċifiċi għall-provider; qatt terġa' tuża frażijiet Ingliżi ġeneriċi li
   jaħbtu ma' `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. B'għażla, irreġistra regoli ta' klassifikazzjoni f'
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) biex tagħżel
   l-ambitu korrett tal-lock (`connection` għal kwota mifruxa fuq il-kont kollu,
   `model` għal żbalji għal kull mudell). Dan il-pass jidħol fis-seħħ fil-produzzjoni
   biss għal providers li r-regoli tagħhom jeħtieġu t-test sħiħ tal-iżball
   (markaturi fil-body): żid l-id tal-provider ma'
   `FULL_TEXT_RULE_PROVIDERS` fl-istess fajl — inkella
   `checkFallbackError` jibgħat lir-regola biss l-iżball strutturat
   `{code, type}` u regola b'test fil-body qatt ma taqbel mat-traffiku reali.
   Regoli li jaqblu purament fuq `status`/`headers` (bħal dawk ta' Opencode jew
   Minimax) ma jeħtiġux dan l-opt-in. Separatament, jekk ir-regola tiddikjara
   `scope: "connection"` u l-intenzjoni hija perjodu ta' tkessiħ attwali mifrux
   fuq il-konnessjoni flimkien ma' skip tal-kombinazzjoni tal-istess talba (mhux
   sempliċement tikketta informattiva), żid l-id tal-provider ma'
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` fl-istess fajl — dan huwa dak li jikkontrolla
   l-użu ta' stil `isAgentrouterConnectionQuotaScope()` f'
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) u
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); mingħajru, `scope`
   xorta jgħaddi minn `fallbackResult.ruleScope` iżda xejn ma jaġixxi fuqu.
3. Żid testijiet tal-unità li jirriflettu
   `tests/unit/upstream-status-restatement.test.ts`
   u `tests/unit/agentrouter-error-rules.test.ts` (inklużi l-kontrolli
   not-permanent / not-creditsExhausted, u — jekk il-provider jeħtieġ il-lista
   permessa — test li jafferma li `resolveRuleMatchBody()` jirritorna t-test
   sħiħ biss għal dak il-provider).

M'hemmx bżonn ta' bidliet f'`chatCore.ts`, `classifyError`, jew combo.

#### Lock ibbażat fuq il-barmil tal-egress (#10880)

Providers f'`EGRESS_BUCKETED_LOCK_PROVIDERS` (il-familja opencode) jiġu ttrattati
bħala upstream ibbażat fuq il-barmil tal-IP (il-livell b'xejn ta' opencode huwa
bbażat fuq l-IP, mhux fuq il-kont — ara #9611): status-429 ikklassifikat bħala
`quota_exhausted` **jew** `rate_limit_exceeded` iqiegħed f'perjodu ta' tkessiħ
kull konnessjoni tal-familja permessa li l-aħħar IP tal-egress magħruf tagħha
jaqbel ma' dak tal-konnessjoni li falliet, qabel ma r-rotazzjoni tkun tista'
tipprova bihom
— u b'hekk jiġu evitati sejħiet upstream garantiti li jfallu N-1 (l-istess forma
bħal #10460/#10525). `rate_limit_exceeded` huwa inkluż apposta: fil-mogħdija ta'
`markAccountUnavailable`, ir-regoli speċifiċi ta' opencode qatt ma jaqblu (l-ebda
headers/body ma jingħata lil `checkFallbackError`, u opencode mhuwiex f'
`FULL_TEXT_RULE_PROVIDERS`), għalhekk 429 li l-body tiegħu jġorr it-test tal-kwota
tal-abbonament ("monthly usage limit reached") jiġi kklassifikat bħala
`quota_exhausted` mill-fallback tat-test tal-kwota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; perjodu ta' tkessiħ ta'
siegħa) qabel ma tintlaħaq ir-regola `status_429` — filwaqt li 429 mingħajr test
tal-kwota (rate limiting sempliċi) jiġi kklassifikat permezz tar-regola
`status_429` bħala `rate_limit_exceeded` u xorta jqiegħed il-familja tal-IP kollha
f'perjodu ta' tkessiħ. Limiti realistiċi:

- **L-aħjar sforz**: il-lock isolvi l-`egress_ip` magħruf l-aħħar tal-konnessjoni minn `proxy_logs` (tieqa ta' 24h, sinkronika, mingħajr cache). Cache kiesħa (l-IP tal-egress qatt ma ġie ttestjat) jew l-ebda ringiela → il-konnessjoni li qed tfalli xorta titpoġġa f'cooldown mill-fergħa (irreġistrata kif isir illum), biss l-ebda konnessjoni oħt ma tiġi msakkra.
- **Qatt terminali**: il-cooldown huwa tieqa ta' kwota li tiġġedded
  (`testStatus: "unavailable"`); stat permanenti qatt ma jiġi derivat minn sinjal fil-livell tal-IP. Il-konnessjonijiet `disableCooling` jaqbżu l-fergħa kompletament.
- **Il-granularità tal-lock tinbidel għall-familja fil-lista permessa**: din hija bidla fl-ambitu, mhux biss ottimizzazzjoni tal-konnessjonijiet oħt. opencode huwa provider ta' `passthroughModels`, għalhekk qabel din il-fergħa 429 kienet tipproduċi lockout għal kull MODEL; issa tipproduċi cooldown tal-konnessjoni — inkluż għal operatur li jmexxi konnessjoni waħda biss mingħajr ebda konnessjoni oħt. Din hija l-granularità li t-tabella tar-regoli ta' opencode diġà tiddikjara bħala korretta (`scope: "connection"`, `providerErrorRules.ts`), iżda s'issa qatt ma ġiet osservata għaliex opencode mhuwiex f'`HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Il-fergħa tikteb hi stess il-cooldown tal-konnessjoni li qed tfalli flimkien ma' `backoffLevel`, b'mod li jirrifletti l-fergħa connection-scoped ta' agentrouter, u tirritorna — il-blokk għal kull mudell u l-mogħdija ġenerika hawn taħt qatt ma jintlaħqu.
- **Il-combo inkluż**: bħall-fergħa ta' agentrouter, l-ambitu deliberatament jinjora d-degradazzjoni ta' `persistUnavailableState`/`isCombo` li applikant combo japplika għal 429. Lockout għal kull mudell mhuwiex forma aktar dgħajfa ta' dan l-ambitu, iżda l-unità żbaljata: ma jgħid xejn dwar l-IP eżawrit, għalhekk ir-rotazzjoni tal-combo tkompli tikkonsma sejħa waħda garantita li tfalli għal kull konnessjoni oħt.
- **Is-sikurezza tal-konnessjonijiet oħt**: konnessjoni oħt li diġà hija terminali (banned/credits_exhausted) jew li diġà tinsab f'cooldown itwal qatt ma tiġi miktuba fuqha.
- **Lista permessa esklużiva**: it-twessigħ ta' `EGRESS_BUCKETED_LOCK_PROVIDERS` huwa deċiżjoni espliċita tas-sid; l-ebda wiring ġeneriku (pattern #10334/#10419). It-talba għall-konnessjonijiet oħt torbot dik l-istess lista permessa minflok tirrepetiha bħala SQL literal, għalhekk it-twessigħ tagħha jibqa' bidla ta' linja waħda.
- **Rotazzjoni tal-IP tal-egress, fiż-żewġ direzzjonijiet**: it-tieqa tat-tfittxija (24h) hija ħafna usa' mit-TTL tal-cache tal-IP tal-egress (5 min), għalhekk l-"IP magħruf l-aħħar" huwa storja, mhux stat kurrenti. Jekk il-proxy ta' konnessjoni ddur fi ħdan it-tieqa, il-lock jista' **ma jsibx** IP li fil-fatt huwa kondiviż (l-IP irreġistrat huwa l-ġdid, li għadu mhux eżawrit) — u b'mod simetriku jista' **jpoġġi f'cooldown konnessjoni oħt li minn dak iż-żmien tkun driet 'il bogħod** mill-IP eżawrit. It-tieni każ jiswa lil dik il-konnessjoni oħt tieqa waħda ta' cooldown; it-tnejn huma limiti aċċettati tal-aħjar sforz ta' tfittxija bbażata fuq l-istorja.
- **Spiża**: żewġ skans limitati ta' `proxy_logs` (iffiltrati skont it-tieqa permezz ta' `idx_pl_timestamp`), biss fil-frekwenza ta' 429. L-ebda indiċi ġdid (migrazzjoni 134 YAGNI). Imkejla fuq kopja ta' database bi traffiku reali ta' daqs moderat; istanza b'rendiment għoli żżomm proporzjonalment aktar ringieli fl-istess tieqa.

## Karatteristiċi oħra tar-reżiljenza

- **20-il strateġija ta' routing** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — ara [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routing konxju tar-reset** (v3.8.0) — jagħti prijorità lill-konnessjonijiet skont il-ħin tar-reset tal-kwota.
- **Degradazzjoni tal-modalità background** — il-`background: true` tar-Responses API jiġi degradat għal sync b'twissija.
- **Sejbien dinamiku tal-limitu tal-għodod** — jagħmel backoff lill-providers meta jintlaħqu l-limiti tal-għadd ta' għodod.
- **Fallback ta' emerġenza** — ikkontrollat minn `OMNIROUTE_EMERGENCY_FALLBACK`; l-operaturi jistgħu jissopperġuh mill-paġna tal-Feature Flags mingħajr restart.

---

## Debugging

- Il-combo weighted jirrispondi `503 all_targets_cooling_down` (`Retry-After` issettjat, `diagnostics.excluded` jelenka kull target b'`model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → il-pool huwa kkonfigurat u konness, kull target huwa sempliċiment eskluż minn timer tar-reżiljenza; it-twissija `[COMBO] Weighted selection: every target excluded before dispatch — …` tissemma r-raġunijiet u s-sekondi li jifdal. `404 no_executable_targets` mill-istess combo tfisser li ma kien hemm l-ebda timer tar-reżiljenza involut (xejn x'inħaddem, jew kull kont falla l-probe tal-availabbiltà). Mibni f'`open-sse/services/combo/pinRecovery.ts` mill-esklużjonijiet miġburin f'`targetResolution.ts`.
- Il-keys kollha ta' provider jiġu skipjati → iċċekkja kemm l-istat tal-circuit breaker U kemm il-`rateLimitedUntil`/`testStatus` ta' kull konnessjoni.
- Provider eskluż b'mod permanenti wara t-tieqa tar-reset → kodiċi li jaqra l-`state` mhux ipproċessat minflok `getStatus()`/`canExecute()`.
- Key wieħed ifalli, l-oħrajn għandhom jaħdmu → ippreferi l-cooldown tal-konnessjoni fuq il-circuit breaker.
- Mudell wieħed biss ifalli → ippreferi l-lockout tal-mudell fuq il-cooldown tal-konnessjoni.
- L-istat għandu jirkupra waħdu iżda ma jagħmilx hekk → iċċekkja għal timestamp fil-futur + read path li jirrifreska stat skadut. L-istatusijiet permanenti jeħtieġu bidliet manwali.

---

## Stat tar-runtime — referenza mgħaġġla għall-aġent

> Imċaqlab kelma b'kelma minn `AGENTS.md` → "Resilience Runtime State" (PR #12743) sabiex il-gwida
> tal-aġent tibqa' taħt il-budget tal-kontest ta' 40k. Hija l-veduta kondensata, rivolta lejn
> l-aġent, tas-sezzjonijiet ta' hawn fuq; is-sezzjonijiet numerrati jibqgħu r-referenza sħiħa.

OmniRoute għandu tliet mekkaniżmi relatati iżda distinti ta' falliment temporanju. Żomm
l-ambitu tagħhom separat meta tkun qed tagħmel debugging tal-imġiba tar-routing. Ara d-
[diagramma tar-reżiljenza b'3 saffi](../diagrams/exported/resilience-3layers.svg)
(sors: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
għal mappa ta' ħarsa malajr.

### Circuit Breaker tal-Provider

**Ambitu**: il-provider kollu, eż. `glm`, `openai`, `anthropic`.

**Għan**: twaqqaf il-ħruġ ta' traffiku lejn provider li qed ifalli ripetutament fil-livell
upstream/servizz, sabiex provider wieħed mhux b'saħħtu ma jrattalx kull talba.

**Implimentazzjoni**:

- Klassi prinċipali: `src/shared/utils/circuitBreaker.ts`
- Wiring tal-gate/eżekuzzjoni tal-chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API tal-istat tar-runtime: `src/app/api/monitoring/health/route.ts`
- Wrappers kondiviżi: `open-sse/services/accountFallback.ts`
- Tabella tal-istat persistenti: `domain_circuit_breakers`

**Stati** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: it-traffiku normali huwa permess.
- `DEGRADED`: firxa ta' twissija bikrija — il-fallimenti qabżu l-limitu tad-degradazzjoni iżda
  għadhom ma qabżux il-limitu tal-breaker; it-traffiku jibqa' jgħaddi, id-dashboards juru
  t-twissija. Test validu tal-konnessjoni jew tieqa kwieta mingħajr falliment ġdid jirritornaha
  lura għal `CLOSED` (`docs/architecture/RESILIENCE_GUIDE.md` fih it-tieqa).
- `OPEN`: il-provider huwa mblukkat temporanjament; il-callers jirċievu tweġiba
  provider-circuit-open jew il-combo routing jaqbeż għal target ieħor.
- `HALF_OPEN`: il-timeout tar-reset għadda; tippermetti probe request. Suċċess jagħlaq
  il-breaker, falliment jiftħu mill-ġdid.

**Valuri predefiniti** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, ikkunsmati permezz ta'
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` f'`src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` f'`src/sse/handlers/chatHelpers.ts`). Il-breaker tal-provider
kollu jopera fuq `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil  | jiddegrada f' | jiftaħ f' (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | ------------: | ------------------------------------: | ----------------------------: |
| OAuth   |           `5` |                                   `8` |                         `60s` |
| API key |           `7` |                                  `12` |                         `30s` |
| Local   |     (derivat) |                                   `2` |                         `15s` |

`PROVIDER_PROFILES` jiddefinixxi wkoll `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) u `providerCooldownMs` (5/10/1 min): dawn iħaddmu
il-**gate tat-tieqa tal-Provider Cooldown globali opt-in** (`PROVIDER_COOLDOWN_ENABLED`,
awtomatikament mitfi) — entrata fil-livell tal-provider f'`open-sse/services/providerCooldownTracker.ts`
tqis biss bħala f'cooldown wara `providerFailureThreshold` fallimenti ġewwa
`providerFailureWindowMs`, u mbagħad tibqa' f'cooldown għal `providerCooldownMs`. DAWN mhumiex
il-limiti tal-breaker attiv — taġġustahomx jekk tistenna imġiba tal-breaker. Kull valur predefinit
jista' jiġi mbejjel permezz tal-env vars `OMNIROUTE_PROVIDER_BREAKER_*` u
`OMNIROUTE_CIRCUIT_BREAKER_*`; it-tabella tar-referenza preċiża għar-runtime tinsab f'
`docs/architecture/RESILIENCE_GUIDE.md`.

Biss statusijiet ta' falliment fil-livell tal-provider għandhom jiskattaw il-breaker tal-provider:

```ts
(408, 500, 502, 503, 504);
```

Tiskattax il-breaker tal-provider kollu għal żbalji normali ta' kont/key/mudell bħal ħafna
każijiet `401`, `403`, jew `429`. Dawn normalment jappartjenu għall-cooldown tal-konnessjoni
jew għall-lockout tal-mudell. `403` minn provider b'ċavetta API ġenerika għandu jkun
irkuprabbi sakemm ma jkunx ikklassifikat bħala żball terminali tal-provider/kont.

Il-breaker juża rkupru għażżien (lazy), mhux timer fl-isfond. Meta `OPEN` jiskadi,
qrijejt bħal `getStatus()`, `canExecute()`, u `getRetryAfterMs()` jerġgħu jġeddedu
l-istat għal `HALF_OPEN`, sabiex id-dashboards u l-bennejja tal-kandidati tal-combo
ma jibqgħux jeskludu għal dejjem fornitur li skada.

### Cooldown tal-Konnessjoni

**Ambitu**: konnessjoni/kont/ċavetta waħda tal-fornitur.

**Għan**: jaqbeż temporanjament ċavetta/kont wieħed difettuż filwaqt li jippermetti lil
konnessjonijiet oħra tal-istess fornitur jibqgħu jservu t-talbijiet.

**Implimentazzjoni**:

- Mogħdija tal-kitba/aġġornament: `src/sse/services/auth.ts::markAccountUnavailable()`
- Għażla/filtrazzjoni tal-kont: `src/sse/services/auth.ts::getProviderCredentials...`
- Kalkolu tal-cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Is-settings: `src/lib/resilience/settings.ts`

Oqsma importanti fuq il-konnessjonijiet tal-fornitur:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Waqt l-għażla tal-kont, konnessjoni tiġi mraqba sakemm:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Il-cooldowns huma wkoll għażżiena: meta `rateLimitedUntil` ikun fil-passat, il-konnessjoni
ssir eliġibbli mill-ġdid. F'użu b'suċċess, `clearAccountError()` tnaddaf `testStatus`,
`rateLimitedUntil`, l-oqsma tal-iżball, u `backoffLevel`.

Imġiba default tal-cooldown tal-konnessjoni:

- Cooldown bażiku ta' OAuth: `5s`.
- Cooldown bażiku tal-ċavetta API: `3s`.
- `429` tal-ċavetta API għandu jippreferi ħjiel ta' retry upstream (`Retry-After`, headers
  ta' reset, jew test ta' reset li jista' jiġi pparżjat) meta disponibbli.
- Fallimenti rkuprabbli ripetuti jużaw backoff esponenzjali:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Il-gwardja anti-thundering-herd tiprevjeni fallimenti konkurrenti fuq l-istess konnessjoni
milli jestendu ripetutament il-cooldown jew iżidu `backoffLevel` darbtejn.

L-istati terminali mhumiex cooldowns. `banned`, `expired` (li jsir terminali biss wara N
tentattivi limitati permezz ta' `EXPIRED_RETRY_MAX`), u `credits_exhausted` huma
maħsuba biex jibqgħu mhux disponibbli sakemm il-kredenzjali/is-settings jinbidlu jew
operatur jerġa' jissettjahom. Tiktibx fuq l-istati terminali b'istat ta' cooldown
transitorju.

### Lockout tal-Mudell

**Ambitu**: fornitur + konnessjoni + mudell.

**Għan**: tevita li titfi konnessjoni sħiħa meta mudell wieħed biss ikun mhux disponibbli
jew limitat mill-kwota għal dik il-konnessjoni.

Eżempji:

- Fornituri b'kwota għal kull mudell li jirritornaw `429`.
- Fornituri lokali li jirritornaw `404` għal mudell wieħed nieqes.
- Fallimenti ta' permessi ta' modalità/mudell speċifiċi għall-fornitur, bħal modalitajiet
  magħżula ta' Grok.

Il-lockout tal-mudell jinsab f'`open-sse/services/accountFallback.ts` u jħalli l-istess
konnessjoni tkompli sservi mudelli oħra.

### Gwida għad-Debugging

- Jekk il-ċwievet kollha ta' fornitur jiġu mraqba, spezzjona kemm l-istat tal-breaker
  tal-fornitur kif ukoll `rateLimitedUntil`/`testStatus` ta' kull konnessjoni.
- Jekk fornitur jidher eskluż b'mod permanenti wara l-tieqa tar-reset, iċċekkja jekk
  il-kodiċi qed jaqrawx `state` grezz minflok jużaw `getStatus()`/`canExecute()`.
- Jekk ċavetta waħda ta' fornitur tfalli iżda oħrajn għandhom jaħdmu, ippreferi l-cooldown
  tal-konnessjoni fuq il-breaker tal-fornitur.
- Jekk mudell wieħed biss ifalli, ippreferi l-lockout tal-mudell fuq il-cooldown
  tal-konnessjoni.
- Jekk stat għandu jirkupra waħdu, għandu jkollu timestamp futur/timeout ta' reset u
  mogħdija ta' qari li taġġorna stat skadut. L-istatusi permanenti jeħtieġu bidliet
  manwali fil-kredenzjali jew fil-konfigurazzjoni.

---

## TLS Fingerprinting u Stealth

L-istealth speċifiku għall-provider (JA3/JA4, CCH, obfuskazzjoni) huwa dokumentat separatament — ara `docs/security/STEALTH_GUIDE.md` (git; mhux ikkompilat f'`/docs`).

---

## Ittestjar tar-reżiljenza (Fażi 8 · Blokk C)

Minbarra t-testijiet tal-unità għall-loġika tar-reżiljenza, tlieta testijiet jeżerċitaw ir-runtime taħt kundizzjonijiet reali ta' stress/falliment (kollha ta' integrazzjoni/nightly — l-ebda wieħed minnhom ma jimblokka l-PRs):

| Test             | X'inhu                                                                                                                                                                                 | Eżekuzzjoni                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos            | Nodu fake-upstream jinjetta latency/reset/timeout/503 reali; jivvalida li l-circuit breaker jiftaħ/jirkupra u li `checkFallbackError` jikklassifika l-503 bħala fallback rikuperabbli. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Tkabbir tal-heap | ~500 stream għal kull `createSSEStream` taħt `--expose-gc`; ifalli jekk il-heap jikber lil hinn mil-limitu massimu (protezzjoni OOM #3069).                                            | `npm run test:heap`                      |
| k6 soak          | Tagħbija sostnuta kontra `/api/monitoring/health`; limiti ta' p95/iżbalji.                                                                                                             | `k6 run tests/load/k6-soak.js` (nightly) |

Orrkestrat minn `.github/workflows/nightly-resilience.yml` (cron + dispatch). Fil-`test:integration` default, it-testijiet chaos u heap jinqabżu awtomatikament (mingħajr `RUN_CHAOS_INT`/`--expose-gc`).

---

## Ara wkoll

- [Gwida tal-Arkitettura](./ARCHITECTURE.md) — Arkitettura tas-sistema u dettalji interni
- [Gwida tal-Utent](../guides/USER_GUIDE.md) — Providers, combos, integrazzjoni tal-CLI
- [Magna Auto-Combo](../routing/AUTO-COMBO.md) — Skorjar b'16-il fattur, pakketti tal-modi
