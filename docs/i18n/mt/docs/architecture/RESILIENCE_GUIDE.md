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

## 2. Tkessiħ tal-Konnessjoni

**Skop:** single provider connection/account/key.

**Għan:** aqbeż ċavetta waħda ħażina filwaqt li konnessjonijiet oħra għall-istess fornitur jibqgħu jservu.

**Implimentazzjoni:**

- Mark mhux disponibbli: `src/sse/services/auth.ts::markAccountUnavailable()`
- Għażla: `getProviderCredentials*` fl-istess file
- Cooldown calc: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Settings: `src/lib/resilience/settings.ts`

**Oqsma għal kull konnessjoni:**

- `rateLimitedUntil` — timestamp sakemm jiskadi t-tkessiħ
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — esponenzjali backoff counter

**Tkessiħ default:**

- OAuth bażi: 5s
- Bażi API-key: 3s
- API-key 429: jippreferi upstream `Retry-After`/reset headers/parseable reset test
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Dewmien mill-ġdid għal kull fornitur.** Il-paġna tad-dettalji tal-fornitur għandha a** Erġa' pprova dewmien** agħżel (Auto, 15s sa 1h). Issejvja `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, permezz ta `PATCH /api/resilience`). Meta żball fil-limitu tar-rata ma jkollu l-ebda ħjiel upstream retry, dak il-valur jissostitwixxi l-backoff skalat għall-fornitur u reset `backoffLevel` għal 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Preċedenza għal żball limitat bir-rata, l-ogħla l-ewwel: ħjiel upstream retry, imbagħad għal kull konnessjoni `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, imbagħad id-dewmien mill-ġdid għal kull fornitur, imbagħad env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, imbagħad il-backoff skalat. Auto tneħħi l-qasam. Taffettwa biss ir-raġuni tal-limitu tar-rata, qatt stati terminali.

**Gwardja kontra r-ragħad tal-merħla:** jipprevjeni fallimenti konkorrenti milli jestendu żżejjed cooldown jew inkrement doppju `backoffLevel`.

**429s tal-limitu tal-konkorrenza ma jitilgħux is-sellum ta' wara.** `429` li l-korp tiegħu jirrapporta limitu ta' konkorrenza ("wisq talbiet konkorrenti", "limitu ta' konkors", "limitu ta' rikjesta parallela", GLM `并发数过高`) tfisser li l-kont huwa b'saħħtu iżda okkupat. `checkFallbackError()` jirritorna raġuni `concurrency_limited`: ifalli għall-konnessjoni li jmiss issa, kessaħ din għal `CONCURRENCY_LIMIT_COOLDOWN_MS` fiss (1s) jew il-ħjiel upstream retry, żomm `backoffLevel` mhux mibdul, u ssettja `skipProviderBreaker`. Korp ta' kwota espliċita xorta jirbaħ, għalhekk korp li jaqbel ukoll ma' mudell ta' kwota jibqa' verdett tal-kwota. Sejbien: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`; verdett: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (il-breaker's `FailureKind`) ma nbidlux u għadu jaqra `rate_limit` għal dawn il-korpi.

**Tilari tal-kontenut tal-flussi ma jkessħux il-kont.** Meta l-watchdog tal-kontenut-stall (`open-sse/utils/streamHandler.ts`) iċedi fuq nixxiegħa li ma bagħat l-ebda output tal-mudell fil-ħin, `markAccountUnavailable()` jirreġistra l-iżball fuq il-konnessjoni iżda ma jistabbilixxi l-ebda cooldown: il-stall jappartjeni għal dik it-talba, ħafna drabi dawra twila ta 'raġunament mingħajr l-ebda output s'issa. L-operaturi jistgħu jagħżlu lura `resilienceSettings.streamStallCooldown.enabled` (default `false`).

**Sinjal ta' latenza ta' opt-in għall-għażla tal-kont `p2c`.** Kull tentattiv mibgħut jirreġistra l-ħin tiegħu għall-ewwel byte u r-riżultat għal kull konnessjoni (u għal kull mudell + ta 'konnessjoni) f'tieqa rolling fil-memorja: l-aħħar 20 kampjun fi żmien 15-il minuta (`open-sse/services/connectionLatencyTracker.ts`, irreġistrat minn `safeLogEvents()` `src/sse/handlers/chatHelpers.ts`). Meta `resilienceSettings.p2cLatency.weight` huwa 'l fuq minn `0` (medda 0-20, default `0` = off), `compareP2CConnections()` `src/sse/services/auth.ts` iżid sa `weight` punti għal kull kandidat tal-par. Nofs dak jiġi minn latency bħala proporzjon għall-kandidat aktar mgħaġġel (doppju bil-mod jieħu n-nofs sħiħ) u nofs mir-rata ta 'żball rolling. It-terminu japplika biss meta ż-żewġ kandidati jkollhom mill-inqas 3 kampjuni, għalhekk kontijiet ġodda ma jiġux penalizzati, u l-limitu massimu tiegħu jibqa' taħt il-penali mblukkati bil-kwota u eżawriti mill-kwota. Hija ma żżid l-ebda ċirkwit tagħha stess: il-kontijiet li qed ifallu għadhom jiġu ttrattati mill-cooldown, lockout u breaker saffi. Issettjaha ma `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Il-frejms tar-raġunament jerġgħu jibdew il-baġit tal-istalla tal-kontenut.** Mudell ta 'raġunament jista' jaħseb għal minuti qabel l-ewwel token viżibbli tiegħu: Claude streams `thinking_delta` frames li t-test tal-ħsieb tagħhom jista 'jkun vojt, u r-Respons API streams oġġett ta' raġunament wieħed wara l-ieħor. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) jirrikonoxxi dawn il-frejms, u l-għassies jerġa' jibda l-baġit tiegħu fuq kull wieħed minflok jikkanċella d-dawran. Għadhom mhumiex output tal-mudell, għalhekk dawra li tispiċċa b'raġunament biss għadha rrapportata bħala vojta, u dawra li twaqqaf ir-raġunament u tibgħat biss taħbit tal-qalb xorta tbattal lill-għassies.

Il-frejms Kiro binarji ta' `reasoningContentEvent` b'firma mhux vojta jippreservaw din l-attività ta' raġunament permezz tal-eżekutur bħala delta `reasoning_content` vojta. Il-firma ma tintbagħatx. Metadata, frames mhux kompluti u firem vojta ma jerġgħux jibdew il-baġit tal-kontenut; il-timeout indipendenti attiva-stream u l-kanċellazzjoni tal-klijent għadhom japplikaw (`open-sse/executors/kiro/reasoning.ts`).

**Stati terminali ( cooldowns NOT ):**

- `banned` — stabbilit permezz ta' detezzjoni ta' banned-keyword / account-ban (ara [BAN_DETECTION](../security/BAN_DETECTION.md) ), u bi tliet rifjuti konsekuttivi upstream għal kull talba (`request_rejected`, eż. Anthropic OAuth 403 "Talba mhux permessa" — `open-sse/services/requestRejectedStreak.ts`); rifjut wieħed biss jiksaħ il-konnessjoni
- `expired` (tranżizzjonijiet għat-terminal wara bounded retry — `EXPIRED_RETRY_MAX = 3` b'backoff esponenzjali — sabiex żbalji OAuth temporanji jkunu jistgħu jfejqu lilhom infushom qabel ma l-kont jiġi diżattivat b'mod permanenti)
- `credits_exhausted`

Dawn jippersistu sakemm il-kredenzjali jinbidlu jew operatur jissettjahom mill-ġdid. Tiktibx fuq l-istati terminali bi stat ta' cooldown temporanju.

**Irkupru għażżien:** meta `rateLimitedUntil` tkun passata, il-konnessjoni terga ssir eligibbli. Meta jintuża b'suċċess, `clearAccountError()` ineħħi l-oqsma kollha ta' żball.

### Ħajt tal-użu Claude OAuth : korsija bi prijorità aktar baxxa + reset-limitu tas-sessjoni

**Skop:** one Claude subscription (OAuth) connection. Iż-żewġ karatteristiċi huma** opt-in għal kull konnessjoni** (Editja konnessjoni → Claude sezzjoni → `lowPriorityMode` / `autoLimitReset` `providerSpecificData`, it-tnejn default off) u mera l-kmandi `/low-priority` u `/limit-reset` tal-Kodiċi Claude (kuntratt tal-wajer maqbud minn Kodiċi Claude 2.1.263).

**Implimentazzjoni:**

- Klassifikazzjoni tar-rispons + tal-magna tal-Istat: `open-sse/services/claudeLowPriority.ts`
- Irrisettja status/claim client: `open-sse/services/claudeLimitReset.ts`
- Ganċ tal-eżekutur (injezzjoni tal-header + mill-ġdid tal-istess kont): `open-sse/executors/base.ts::execute()`
- Opt-in persistenza: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** il-ħajt ta' użu ta' 5 sigħat — a `429` li l-headers tiegħu jġorru `anthropic-ratelimit-unified-status: rejected` u, meta l-kont ikun eliġibbli, `anthropic-ratelimit-unified-slow-offer: treatment`. Xejn ma jintbagħat qabel dak l-ewwel ħajt 429; fqigħ 429 mingħajr headers unifikati jgħaddi mill-mogħdija ta 'tkessiħ normali.

**Korsija ta' prijorità aktar baxxa** (`lowPriorityMode`):

- Fuq il-ħajt 429 l-eżekutur jaċċetta l-offerta u immedjatament jerġa’ jipprova l-** l-istess** kont ma `anthropic-usage-limit: slow`; il-karreġġjata tibqa’ attiva sal- `anthropic-ratelimit-unified-reset` imħabbra (+ 60s grace) u kull talba f’dik it-tieqa ġġorr l-header. L-429 interċettat qatt ma jilħaq `handleChatCore`, għalhekk il-konnessjoni hija** le** jitqiegħed fil cooldown u mhux imdawwar bogħod.
- `anthropic-ratelimit-unified-slow-status` fuq risposti aktar tard: `active` / `not_needed` iżommu l-korsija; `slot_busy` (429) jew a `529` stenna `anthropic-ratelimit-unified-slow-retry-after` tas-server (default 20s, clamp 5–600s, ± 30% jitter) u erġa pprova, delimitat minn `anthropic-ratelimit-unified-slow-max-wait` (default 20 min, clamp 1 min–6 h) — passat li l-korsija tispiċċa u aċċetta mill-ġdid a-10-minuta blokk. L-istennija hija wkoll limitata minn dak li fadal mit-timeout tal-bidu upstream tar-rikjesta stess (`resolveFetchStartTimeout`, 10 min awtomatikament) nieqes marġni ta' 5 s: mingħajr dak il-limitu l-max-wait default ta' 20 minuta tibqa' tul it-talba u l-irqad jiġi abortit f'nofs stennija, b'wiċċ `TimeoutError` minflok it-tmiem gracefulzqm + `max_wait`.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-window rollover, jew `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (li jispiċċa bħala `extra_usage` fuq kwalunkwe status, peress li l-eċċess imħallas issa jkopri l-ħajt) jispiċċa l-korsija; ir-rispons imbagħad jiċċirkola lejn il-mogħdija ta 'tkessiħ normali. `budget_exhausted` jiġi mfakkar sakemm ir-reset tal-baġit imħabbra (≤ 8 ijiem).
- Il-kontroll tal-ħajt imur wara li l-eżekutur stess 400-driven intra-attempt (editjar tal-kuntest, thinking/effort clamps, param auto-learn), għalhekk ħajt 429 li jissupera biss fuq wieħed minn dawk retry għadu interċettat minflok jilħaq il-passaġġ ta 'cooldown.
- L-istat huwa fil-memorja għal kull konnessjoni (startjar mill-ġdid jiswa ħajt ieħor 429 biex jerġa 'jaċċetta).

**Reset tal-limitu tas-sessjoni** (`autoLimitReset`, ippruvat qabel il-karreġġjata meta t-tnejn ikunu mixgħula):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` blokk; meta `arm: "reset"` u `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ma `{ "program": "juniper_tide" }` (organizzazzjoni UUID minn `providerSpecificData.organizationUUID`, bootstrap fallback).
- `result: reset|not_limited` → it-talba terġa' tiġi ppruvata b'veloċità sħiħa (l-ebda header bil-mod). `already_used` / `not_offered` memoise `next_available_at` (default ġimgħa); kwalunkwe falliment imur lura 15-il minuta. Ir-reset huwa darba fil-ġimgħa u għadu jgħodd għal-limitu ta' kull ġimgħa.

Gwardji tar-rigressjoni: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinità tas-sessjoni (#7274)

**Skop:** sessjoni waħda tal-klijent ( header `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ) ippinjat ma' konnessjoni waħda, għal** kwalunkwe** fornitur.

**Għan:** żomm aġent multi-turn (Claude Code, aider, aġenti tad-dwana) fuq l-istess kont bejn it-talbiet, tnaqqas it-telf tal-kuntest bejn il-kontijiet u 429s ripetuti ta 'bidu kiesaħ fuq fornituri bi stat ta' sessjoni għal kull kont.

**Implimentazzjoni:**

- TTL riżoluzzjoni: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Estrazzjoni ta' header (ġeneriku, kwalunkwe fornitur): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabella tal-pin persistenti: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` ( TTL globali f'ms, `0` disables) — `src/lib/db/settings.ts`. Ismu mill-ġdid mill-Codex- `codexSessionAffinityTtlMs` biss mill-migrazzjoni `124_generic_session_affinity_ttl.sql`, li jġorr fuq kwalunkwe Codex TTL konfigurat qabel bħala l-inadempjenza l-ġdida.

Qabel #7274, `resolveSessionAffinityTtlMs()` hard-bailed għal `0` għal kull fornitur ħlief `codex`, għalhekk l-issettjar TTL (u l-headers tas-sessjoni) ma kellu l-ebda effett imkien ieħor minkejja li l-mekkaniżmu tal-pinning u l-estrazzjoni tal-header kienu diġà agnostiċi għall-fornitur. It-tiswija neħħa dak ir-ritorn kmieni; iż TTL issa tapplika b'mod uniformi għal kull fornitur darba stabbilit globalment 'il fuq minn `0`.

It-tliet headers tal-affinità tas-sessjoni qatt ma jintbagħtu upstream — executors jibnu l-headers upstream tagħhom stess mill-bidu aktar milli jgħaddu headers tal-klijenti, għalhekk dan jibqa' id ta' korrelazzjoni interna biss.

### Kirjiet esklussivi ta' konnessjoni ta' sessjoni ġestiti

**Skop:** HTTP client/session wieħed attiv amministrat għandu konnessjoni waħda OmniRoute eliġibbli.

**Għan:** jipprovdu sjieda ta 'konnessjoni esklussiva dejjiema għal klijenti li jeħtieġu ċint ta' rotta iebes fuq talbiet. Din hija differenti mill-affinità tas-sessjoni, li hija preferenza ta' kontinwità artab: kirja esklussiva tippersisti stat taċ-ċiklu tal-ħajja SQLite, tinforza l-uniċità globali tas-sid attiv u tal-konnessjoni attiva, u tirrifjuta ġenerazzjoni skaduta qabel id-dispaċċ tal-fornitur.

Il-karatteristika hija opt-in għal kull ċavetta API. Ċavetta ġestita għandu jkollha l-ambitu `lease:exclusive` u lista `allowedConnections` espliċita mhux vojta. Kwalunkwe klijent HTTP jista' juża l-endpoint taċ-ċiklu tal-ħajja; l-ebda isem tal-klijent, utent-aġent, fornitur, metodu OAuth, jew mudell mhu meħtieġ. Il-kirja għandha konnessjoni, mhux mudell, għalhekk bidla fil-mudell iżomm l-irbit filwaqt li l-konnessjoni tibqa' ordinarjament eliġibbli. Il-mudell normali, il-kwota, is-saħħa, it-tkessiħ u r-regoli tal-lista ta' permessi jibqgħu awtorevoli u jistgħu jagħmlu tranżizzjoni tal-istess ġenerazzjoni għal konnessjoni oħra eliġibbli b'xejn.

Iċ-ċiklu tal-ħajja huwa `POST /api/v1/session-leases` b'azzjonijiet JSON `acquire`, `renew`, u `release`. It-talbiet ta' inferenza ġestiti jippreżentaw il-valur `X-OmniRoute-Lease-Owner` opak u `X-OmniRoute-Lease-Generation` eżatt. Is-sid juża `vlo_` segwit minn 43 karattru base64url; biss il-hash SHA-256 tiegħu huwa maħżun. Kull ċint tad-dispaċċ finali jorbot ukoll iċ-ċavetta API awtentikata ID u l-konnessjoni attiva ID. L-intestaturi tal-kontroll tal-kiri jitneħħew minn zkuk, snapshots tat-talbiet miżmuma, u headers tal-eżekutur upstream.

Jekk ir-rotot ordinarju għandu kandidati amministrati eliġibbli iżda kull kandidat ħieles huwa okkupat minn kirja attiva barranija, OmniRoute jirritorna HTTP `429`, kodiċi ta' kapaċità ta' kera mhux disponibbli, stat ta' stennija għall-kapaċità, u `Retry-After` ilimitat derivat mill-iskadenza rilevanti l-aktar kmieni. L-eliġibilità vojta ordinarja mhijiex kontestazzjoni tal-kera u żżomm is-semantika eżistenti tal-iżball tar-routing tagħha.

Mekkaniżmi relatati jibqgħu separati:

- L-okkupanza tas-sessjoni OAuth hija distribuzzjoni artab lokali tal-proċess għall-kontijiet OAuth.
- Is-semafori tal-kontijiet jagħtu permessi ta' rikjesta-konkorrenza u jispiċċaw meta talba titlesta.
- Kirjiet ta' sessjoni ġestiti esklussivi huma sjieda dejjiema taċ-ċiklu tal-ħajja b'ċint ta' ġenerazzjoni.

---

## 3. Lockout tal-Mudell

**Ambitu:** it-tripla fornitur + konnessjoni + mudell.

**Ambitu taċ-ċavetta skond l-istatus:** l-istatus li falla jiddeċiedi f'liema ċavetta jikteb lockout (`resolveLockoutScope()` f'`open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — sinjal ta' kwota jew ta' dritt — issakkar il-**familja tal-kwota**: għal codex l-ambitu kollu `codex` / `spark` (kull mudell `gpt-5*` tal-konnessjoni), għal fornituri oħra `getQuotaScopedModelForProvider()`.
- `404` jissakkar il-mudell biss (`getModelLockKey()` jispeċifika `not_found`).
- Kwalunkwe status ieħor — fallimenti ta' trasport/server `5xx` u l-`502` sintetizzat minn OmniRoute nnifsu mill-validazzjoni tal-kwalità — jissakkar biss it-tuple **eżatta** fornitur/konnessjoni/mudell. Stream ħażina fuq mudell wieħed mhijiex prova dwar il-kwota tal-kont; qabel din ir-regola, risposta waħda vojta fuq `codex/gpt-5.6-luna` kienet tneħħi kull mudell `gpt-5*` ta' dik il-konnessjoni mill-rottar għal 2–30 min (b'eskalazzjoni) filwaqt li l-kwota tagħha ma kinitx immissa.
- L-għażla `scope` espliċita ta' min jagħmel is-sejħa dejjem tirbaħ (Antigravity jgħaddi `"exact"`).

**Skop:** tevita li tiġi diżattivata konnessjoni sħiħa meta mudell wieħed biss ma jkunx disponibbli jew ikun limitat mill-kwota.

**Eżempji:**

- Fornituri b'kwota għal kull mudell li jirritornaw 429
- Fornituri lokali li jirritornaw 404 għal mudell wieħed nieqes
- Fallimenti ta' permessi ta' mod/mudell speċifiċi għal fornitur (eż., il-modi ta' Grok)

**Implimentazzjoni:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard tal-Cooldowns tal-Mudell (v3.8.0)

UI: Settings → Cooldowns tal-Mudell (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Telenka l-lockouts attivi ma': provider, connection, model, reason, expiresAt. L-operaturi jistgħu jerġgħu jattivaw mudell manwalment mill-karta.

**REST API:**

- `GET /api/resilience/model-cooldowns` — jelenka l-lockouts attivi
- `DELETE /api/resilience/model-cooldowns` — riattivazzjoni manwali. Korpu: `{provider, connection, model}`. Awtentikazzjoni: management.

### Maniġer tal-Cooldowns

UI: Monitoraġġ → Maniġer tal-Cooldowns (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Paġna waħda għal kull konnessjoni li tkun barra mill-rottar għal raġuni temporanja, minflok ma tiftaħ il-paġna ta' kull fornitur. Telenka l-cooldowns tal-konnessjonijiet, il-lockouts tal-mudelli u l-istati terminali, tnaddafhom skond il-konnessjoni, għal għażla magħżula, jew għall-konnessjonijiet kollha ta' fornitur, u teditja r-regoli tal-cooldown l-aktar aġġustati: `streamStallCooldown.enabled` u l-cooldown bażi u l-passi massimi ta' backoff ta' `connectionCooldown` għal OAuth / API-key (insejvjati permezz ta' `PATCH /api/resilience`). L-istati terminali (`banned`, `expired`, `credits_exhausted`) jiġu elenkati iżda qatt ma jitnaddfu hawn.

**REST API** (`src/lib/resilience/cooldownManager.ts`, awtentikazzjoni: management):

- `GET /api/resilience/cooldowns[?provider=]` — konnessjonijiet bl-istatus, il-cooldown li jifdal, il-livell ta' backoff, it-tip tal-aħħar żball u l-lockouts tal-mudelli (mingħajr kredenzjali)
- `POST /api/resilience/cooldowns` — korpu `{connectionIds: string[]}` jew `{all: true, provider?}`; jirritorna `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI tal-issettjar tal-lockout + rkupru b'tnaqqis bis-suċċess (v3.8.23)

Il-lockout tal-mudell mar min imġieba hardcoded dejjem mixgħula għal karatteristika kompletament konfigurabbli u opt-in, bil-karta tal-issettjar tagħha stess u mogħdija ta' rkupru li tfejjaq lilha nnifisha.

**Karta tal-issettjar:** Settings → Lockout tal-Mudell (`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Din hija **distinta** mill-`ModelCooldownsCard` għal qari biss hawn fuq (li biss _telenka_ l-lockouts attivi) — il-karta l-ġdida _tikkonfigura l-parametri_. Il-defaults jinsabu f'`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Issettjar               | Default                          | Tifsira                                                                   |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Swiċċ prinċipali — il-lockout tal-mudell huwa **mitfi b'mod default**.    |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusijiet upstream li jiġu meqjusa bħala falliment b'ambitu tal-mudell. |
| `baseCooldownMs`        | `120_000` (120 s)                | It-tul inizjali tal-lockout għall-ewwel falliment.                        |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limitu massimu fuq il-cooldown eskalat.                                   |
| `maxBackoffSteps`       | `10`                             | Passi massimi ta' eskalazzjoni ta' backoff esponenzjali.                  |
| `useExponentialBackoff` | `true`                           | Jekk fallimenti ripetuti jeskalawx il-cooldown b'mod esponenzjali.        |

L-issettjar jippersisti permezz tal-ħażna normali tal-issettjar u jiġi vvalidat permezz tal-iskema tal-issettjar tar-resilience; il-karta tillimita `baseCooldownMs`/`maxCooldownMs` (bi `maxCooldownMs ≥ baseCooldownMs`) u `maxBackoffSteps`.

**Rkupru b'tnaqqis bis-suċċess:** irkupru **mhux** biss skadenza tat-timer. Risposta b'saħħitha tnazżel il-għadd ta' fallimenti tal-mudell lura 'l isfel, sabiex mudell li rkupra f'nofs it-tieqa jieqaf jeskala (u jitnaddaf) qabel ma jiskadi t-timer tiegħu. Fuq mira ta' combo b'suċċess, `open-sse/services/combo.ts` issejjaħ `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), li **tnaqqas bin-nofs** il-`failureCount` maħżun (`Math.floor(failureCount / 2)`); meta jasal għal `0` l-entratura tal-lockout titħassar għal kollox. Il-kontroparti `recordModelLockoutFailure()` iżżid il-għadd (u teskalah il-cooldown) f'każ ta' fallimenti fi ħdan it-tieqa tal-eskalazzjoni. Dan it-tnaqqis bis-suċċess huwa żjade fuq l-iskadenza sempliċi tat-timer — kull mogħdija tista' terġa' tattiva mudell.

**Stat:** il-lockouts jinżammu **fil-memorja** (`Map`s għal kull proċess ta' `ModelLockoutEntry` biċ-ċavetta `provider:connectionId:model`, il-locks b'ambitu eżatt bi `provider:connectionId:exact:model`), mhux ippersistjati fid-DB — jintilfu fuq restart. L-_issettjar_ huwa ppersistjat; l-_istat_ attiv tal-lockout huwa efiimeru.

---

## 4. Kontroll tal-Konkurrenza Quota-Share (v3.8.36)

Kontijiet ta' abbonament (GLM, MiniMax, eċċ.) spiss jaċċettaw biss madwar 1–3 talbiet konkurrenti; li tgħaddi minn dan jiskatta żbalji 429 u cooldowns. Dan huwa akut taħt combos **quota-share** (`qtSd/…`), fejn diversi API keys jaqsmu kont upstream wieħed. Tliet saffi jipprevjenu li kont kondiviż jiġi mgħerraq.

### Limitu tal-konkurrenza għal kull konnessjoni (`max_concurrent`)

Kull konnessjoni ta' provider tista' tiddikjara limitu massimu `max_concurrent`
(`provider_connections.max_concurrent`, issettjat fil-modal tal-konnessjoni / API / DB).
Ħallih vojt biex ma jkunx hemm limitu. Dan huwa l-uniku kontroll li jmexxi s-saff
tas-serjalizzazzjoni hawn taħt — issettjah skont il-konkurrenza reali tal-kont
(eż. GLM ~1, MiniMax ~2).

### Limiti tal-konkurrenza għal kull mudell (`modelConcurrency`)

Konnessjoni tista' wkoll tiddikjara limiti eżatti tal-konkurrenza għal kull mudell
ġol-mappa `rateLimitOverrides` tagħha:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Issettjah fil-modal tal-konnessjoni (**Rate limit overrides → Limiti tal-konkurrenza
għal kull mudell**, `model=cap` wieħed f'kull linja) jew permezz ta'
`PATCH /api/providers/[id]` bl-istess struttura JSON. Semantika tal-keys:

- **Fuq il-konnessjoni kollha vs speċifiku għal mudell:** `maxConcurrent` jibqa'
  l-limitu kondiviż fuq il-konnessjoni kollha. Meta jitkabbel it-tnejn, iż-żewġ
  gates jinkisbu b'mod atomiku fl-istess gate kompost
  (`global → provider → account → model`); l-imġieba effettiva hija l-limitu
  l-aktar strett applikabbli.
- **Korrispondenza eżatta tal-key tal-mudell:** il-key hija s-string tal-mudell
  li tgħaddi lill-executor wara r-riżoluzzjoni tar-rotta — normalment l-id
  sempliċi tal-mudell upstream (`glm-5`), mhux alias `provider/model` min-naħa
  tal-klijent (`zai/glm-5` ma jaqbilx ma' `glm-5`). Il-valuri huma limiti ta'
  talbiet konkurrenti espressi b'numri sħaħ pożittivi.
- **Kjuwi lokali, ebda discovery:** it-talbiet żejjed jidħlu fil-kju lokalment
  bis-semantika eżistenti tal-kju/timeout (żbalji ta' ammissjoni tat-tip
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute ma jiskopri u lanqas
  jiddeżduċi l-politika upstream — jinfurza l-limiti eżatti li l-operatur ikun
  ikkonfigura. Gate ta' mudell saturat qatt ma jiddiżattiva l-provider u qatt ma
  joħloq lockout permanenti tal-mudell; l-imġieba upstream ta'
  429/cooldown/fallback tibqa' l-aħħar difiża għall-iżbalji.
- **Ambitu għal kull konnessjoni u għal kull proċess:** il-limiti huma għal kull
  konnessjoni fid-database u jinżammu fil-memorja, għalhekk żewġ konnessjonijiet
  li jużaw mill-ġdid l-istess API key upstream ma jikkoordinawx ma' xulxin.
- **Mhux ikkonfigurat ifisser l-ebda bidla:** li tiġi moħlika l-mappa (jew li
  l-kamp tad-dashboard jitħalla vojt) ma żżid l-ebda gate tal-mudell.
  Konfigurazzjoni ta' eżempju mingħajr ma tiġi asserita ebda limitu universali
  tal-provider:

```text
glm-5=1
glm-4.7=3
```

### Serjalizzazzjoni tat-talbiet quota-share

Meta dispatch quota-share jimmira lejn konnessjoni li tiddikjara `max_concurrent`
pożittiv, it-talbiet konkurrenti lejn dak il-**kont** jiġu serjalizzati permezz
ta' semaphore għal kull konnessjoni (key `qsconn:<connectionId>`): it-talbiet
żejjed **jistennnew fil-kju** minflok jegħrqu l-kont. Huwa **fail-open** — kju
saturat jew timeout jipproċedi mingħajr slot minflok li qatt jirrifjuta talba li
tista' tintbagħat. Ixgħel jew itfi minn **Settings → Resilience → Konkurrenza
quota-share għal kull konnessjoni** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`,
mixgħul b'mod default). Mingħajr limitu `max_concurrent`, l-imġieba ma tinbidelx.

> Il-gate tar-rotta quota-share (`selectQuotaShareTarget`, DRR + P2C) huwa nnifsu
> fail-open u biss _jbaxxi l-prijorità_ ta' konnessjoni li waslet fil-limitu
> tagħha — b'pool ta' konnessjoni waħda ma jistax jimponi limitu assolut,
> għalhekk dan is-semaphore huwa li fil-fatt jikkontieni l-għargħar.

### Retry konxju tal-cooldown għal combos

Għal kull strateġija combo (meta tkun attivata), talba li kienet se tikkristalizza
429 minħabba cooldown tranżitorju QASIR tistennieh jgħaddi u terġa' tibgħat
minflok tirritorna l-429 — dan jkopri twieqi TPM/RPM ta' klassi Gemini (~60s
retry-after) fuq combos ta' diversi mudelli, eż. meta ż-żewġ targets ta' combo
ta' 2 mudelli jitolbu limitu tar-rata għal kull mudell. Limitat minn
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) fi
**Settings → Resilience**. Qatt ma jistenna fuq `quota_exhausted` (imblukkat
sal-lejl) jew raġunijiet ta' awtentikazzjoni/mhux misjub.

L-istess gate jkopri l-każ ta' qabel id-dispatch (#16319): meta kull target ta'
combo jiġi mqabeż qabel ma jsir ebda tentattiv minħabba li l-mudell tiegħu jinsab
f'lockout tranżitorju qasir, il-mogħdija ta' żero tentattivi tistenna li jgħaddi
l-lockout taħt l-istess limiti u terġa' tibgħat, minflok twieġeb
`503 ALL_TARGETS_SKIPPED` mingħajr ebda ħjiel. Meta ma tkunx permessa ebda
stennija (limitu massimu, tentattivi jew baġit eżawriti, jew il-funzjonalità
mitfija), ir-risposta terminali tittejjeb għal `429 rate_limit_error` li ġġib
magħha `retry_after` / `reset_at` mill-eqdem skadenza ta' lock tranżitorju;
il-locks tal-kwota, awtentikazzjoni u mhux-misjub iżommu l-503 mingħajr ħjiel.

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

## 7. Riformulazzjoni tal-Istatus Upstream (żbalji ta' kwota b'status ħażin)

**Ambitu:** gateway upstream wieħed li jirrapporta eżawriment temporanju tal-kwota bl-istatus HTTP ħażin.

**Għan:** ikkoreġi status qarrieqi QABEL il-klassifikazzjoni, sabiex il-konsumaturi downstream (il-magna tal-fallback, l-agreġazzjoni tal-combo, ir-risposta rivolta lejn il-klijent) jaraw in-natura verament riprovabbli tal-falliment.

Ċerti gateways jindikaw eżawriment TEMPORANJU tal-kwota b'status HTTP
mhux riprovabbli. `agentrouter.org` jirritorna `403` (xi drabi `400`) b'korp
bil-Ċiniż (`用户额度不足` / `额度不足`) minflok l-istandard `429`. Klijenti bħal
Claude Code jittrattaw `403` bħala permanenti u jieqfu s-sessjoni, u mingħajr
korrezzjoni l-magna tal-fallback tikklassifikah bħala `AUTH_ERROR` minflok
avveniment ta' kwota.

**Implimentazzjoni:**

- Reġistru + matcher: `open-sse/config/upstreamStatusRestatement.ts` — lista
  ta' regoli għal kull fornitur (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), imqabbla permezz ta'
  `applyStatusRestatement()`.
- Punt tal-ġajta: il-blokk `providerFailure:` f'`open-sse/handlers/chatCore.ts`
  (madwar il-linja 3654), eżatt wara li `parseUpstreamError()` janalizza
  risposta upstream b'status HTTP ta' żball (`!providerResponse.ok`), u qabel
  ma taħdem xi klassifikazzjoni, sabiex kull konsumatur downstream jara
  l-istatus ikkoreġut. Żbalji inkorporati ġewwa stream SSE `200` isegwu
  mogħdija separata u iktar tard ta' parsing tal-stream u **mhumiex** koperti
  minn dan il-hook illum — limitazzjoni magħrufa, għadha mhux meħtieġa għall-
  istatus żbaljat ta' agentrouter (li joħroġ bħala status HTTP ta' żball).
- Eliġibilità għal retry: `429` qiegħed f'`RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), allura żball riformulat
  iġorr tieqa reali ta' retry minflok ma joħroġ bħala `403` mejjet.
- Il-`60s` `defaultRetryAfterMs` sintetiku (`upstreamStatusRestatement.ts`)
  huwa biss dak li r-risposta riformulata tgħid lill-**klijent**; mhuwiex
  innifsu t-tul intern ta' cooldown/lockout tal-konnessjoni — dak huwa
  rregolat separatament minn kwalunkwe mekkaniżmu li fil-fatt jimmaniġġja
  l-iżball riformulat (il-backoff li jiżdied tal-Connection Cooldown, §2,
  bazi `3s` għal fornituri b'API-key; jew il-Model Lockout, §3, għal
  fornituri b'kwota għal kull mudell bħal agentrouter). Ir-router jista' jsir
  eliġibbli għal retry internament qabel mit-tieqa ta' 60s li jħabbar lill-
  klijent — marġni intenzjonali, mhux bug.

Żbalji permanenti (`无权访问模型` ta' agentrouter — l-ebda aċċess għal dan il-
mudell) QATT ma jiġu riformulati: `excludeMarkers` jagħti veto lir-regola anki
meta `textMarkers` jaqbtu, allura l-iżball iżomm l-istatus oriġinali tiegħu u
xejn ma jerġa' jipprovah għal dejjem. Ir-regola ta' klassifikazzjoni tal-
fornitur li taqbel (`agentrouter-model-access-denied` f'
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`,
`scope: "model"`, cooldown bażi ddikjarat ta' `6h`) tiġi kkonsultata minn
`checkFallbackError` (`open-sse/services/accountFallback.ts`) _qabel_ l-
early-return ġeneriku `FORBIDDEN` tal-kategorija apikey, ikkontrollat minn
`honorsRuleLockScope(provider)` (#10334 — bħalissa esklussiv għal agentrouter
permezz tal-allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` f'
`providerErrorRules.ts`). Il-cooldown ddikjarat ta' 6h tar-regola jgħaddi
bħala `fallbackResult.baseCooldownMs`, iżda xorta jibqa' jdaħħal fil-mogħdija
pre-eżistenti tal-lockout tal-kwota għal kull mudell
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, mhux mibdula
minn #10334 ħlief għas-sors tal-cooldown): jiġi mrazzan għall-
`mlSettings.maxCooldownMs` tal-operatur (default `1_800_000ms` / 30min), bħal
kull lockout ieħor ta' mudell, u r-_raġuni tal-lockout persistenti_ tibqa' l-
`"forbidden"` hardkodjat pre-eżistenti, mhux l-`"auth_error"` tar-regola —
biss it-tul tal-cooldown jiġi rispettat end-to-end, mhux il-string tar-raġuni.
Il-konnessjoni nnifisha tibqa' attiva; il-mudelli oħra fuq l-istess konnessjoni
ma jiġux affettwati.

Żbalji ta' kwota riformulati (`额度不足`) jilħqu regola tal-fornitur fil-
produzzjoni (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, mingħajr cooldown ddikjarat tagħha stess — japplika d-
default tal-backoff skalat tas-saff tal-persistenza). Minn #10334, `scope`
fuq `ProviderErrorRuleMatch` JIĠI kkonsmat end-to-end, iżda **biss** għal
fornituri fl-allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — illum biss `"agentrouter"`, ikkontrollat permezz ta'
`honorsRuleLockScope()`). Għal kull fornitur ieħor `scope` jibqa' informattiv,
eżattament bħal qabel #10334. `checkFallbackError` joħroġ l-ambitu tar-regola
mqabbla bħala `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) huwa l-gwardjan kondiviż li jikkonferma li
`ruleScope` huwa verament sigur biex jiġi rispettat bħala sinjal li jkopri l-
konnessjoni kollha u li jirkupra waħdu (scope `"connection"`, raġuni
`quota_exhausted`, qatt `permanent`, qatt `creditsExhausted` — difiża kontra
regola futura li tgħaqqad scope `"connection"` ma' stat permanenti tal-kont).
Żewġ konsumaturi jsejħulu:

- **Persistenza** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  minflok taqa’ fil-fergħa tal-imblukkar **għal kull mudell** tal-fornitur
  passthrough (agentrouter huwa `passthroughModels: true` → `hasPerModelQuota()`
  jirritorna `true`), tapplika **perjodu temporanju ta’ stennija għall-konnessjoni** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, u qatt status terminali
  (`credits_exhausted`/`banned`/`expired`) — sabiex il-konnessjoni tirkupra
  waħedha ladarba jintemm il-perjodu ta’ stennija, minflok ma teħtieġ
  reset manwali tal-kredenzjali. Dan jinqabeż għal konnessjonijiet bi
  `disableCooling: true` (#2997): minflok, dik l-għażla ta’ esklużjoni
  tgħaddi għall-imblukkar għal kull mudell (kompromess dokumentat —
  ara l-kumment fil-kodiċi fuq il-fergħa).
- **Routing ikkombinat fl-istess talba** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): l-istess guard jimmarka
  l-konnessjoni fis-set fil-memorja `exhaustedConnections`, keyed b’
  `${provider}:${connectionId}`. Dan jaqbeż biss target li jkun għad fadal
  fl-ISTESS TALBA u li _hu stess diġà jġorr eżattament dak il-`connectionId`_
  fl-oġġett target tiegħu stess (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` qabel il-lookup ta’ `exhaustedConnections`) — combo sempliċi
  ta’ lista ta’ mudelli, fejn it-targets aħwa ma jġorru ebda `connectionId`
  fiss tagħhom stess u wieħed jiġi riżolt biss għal kull dispatch mill-header
  `X-OmniRoute-Selected-Connection-Id` tar-rispons, qatt ma jaqbel ma’ dik
  il-key. Għal dak il-każ komuni, il-protezzjoni reali kontra leg li jkun
  għad fadal u jerġa’ juża l-kont li għadu kemm ġie eżawrit MHIX dan is-Set —
  hija s-saff tal-persistenza ta’ hawn fuq (il-`rateLimitedUntil`
  tal-konnessjoni issa jinsab fil-futur) flimkien mal-istess guard li
  jissopprimi `transientRateLimitedProviders` għall-falliment (ara
  "Disinn f’żewġ stadji" u l-kumment fil-kodiċi dwar il-fergħa
  `isAgentrouterConnectionQuotaScope` f’`targetExhaustion.ts`): meta dak
  is-Set jitħalla mhux immarkat, il-force-allow ta’
  `allowRateLimitedConnection` f’`combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) MA jidħolx fis-seħħ
  għal-legs li jkun għad fadal tal-fornitur, għalhekk il-filtru
  `rateLimitedUntil` tal-għażla tal-kredenzjali
  (`src/sse/services/auth.ts:1238`) jiġi rispettat b’mod normali u leg li
  jkun għad fadal jew jagħżel konnessjoni agentrouter differenti li tkun
  għadha eliġibbli, jew ifalli għax ma jkun hemm ebda kredenzjali disponibbli
  — ma jisfurzax ruħu lura fuq il-konnessjoni li din il-fergħa tkun għadha
  kemm poġġietilha perjodu ta’ stennija.

### Disinn f’żewġ stadji: dikjarazzjoni mill-ġdid tal-istatus, imbagħad klassifikazzjoni

Id-dikjarazzjoni mill-ġdid tal-istatus (`upstreamStatusRestatement.ts`) u
r-regoli tal-klassifikazzjoni tal-fornitur
(`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`) huma
reġistri separati li t-tnejn jużaw l-id tal-fornitur u markers tat-test
bħala keys, iżda jaħdmu f’postijiet differenti u jaqdu skopijiet differenti:
id-dikjarazzjoni mill-ġdid tikteb mill-ġdid l-istatus HTTP kmieni
f’`chatCore.ts`; ir-regoli tal-klassifikazzjoni jagħżlu r-`reason` ta’
fallback u l-`scope` tal-lock (`model` / `provider` / `connection`) ġewwa
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Ir-regoli tal-klassifikazzjoni jaraw biss it-**test** sħiħ tal-iżball
(meħtieġ biex jaqblu ma’ markers fil-body bħal `额度不足`) għal fornituri
elenkati fl-allowlist `FULL_TEXT_RULE_PROVIDERS`
f’`providerErrorRules.ts` — bħalissa `"agentrouter"` biss. Għal kull fornitur
ieħor tal-**katalgu integrat**, `checkFallbackError` jgħaddi lil
`getProviderErrorRuleMatch` l-iżball strutturat biss (`{code, type}`), li
huwa biżżejjed għal regoli bbażati fuq headers/status/kodiċi iżda ma jarax
markers fit-test tal-body. Il-helper `resolveRuleMatchBody()` jagħmel din
l-għażla: it-test sħiħ tal-iżball għall-fornituri fl-allowlist, u l-iżball
strutturat għall-oħrajn. Iż-żieda ta’ fornitur **integrat** ma’
`FULL_TEXT_RULE_PROVIDERS` hija opt-in espliċitu għal kull fornitur — dan
jeżisti sabiex il-fluss default għal kull fornitur li mhuwiex fil-lista
jibqa’ identiku byte b’byte.

L-`scope` ta’ regola (`model` / `provider` / `connection`) huwa opt-in
separat minn `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` jesponih biss
bħala `fallbackResult.ruleScope`, u l-konsumaturi downstream jirrispettawh
bħala xi ħaġa oħra għajr tikketta informattiva biss għal fornituri
fl-allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` fl-istess fajl (ikkontrollat
permezz ta’ `honorsRuleLockScope()` — illum `"agentrouter"` biss). Ara
"Żbalji tal-kwota ddikjarati mill-ġdid" hawn fuq għal dak li effettivament
tagħmel taqbila `scope: "connection"` ladarba fornitur ikun f’dik
l-allowlist.

**#11104 — ir-regoli ddikjarati mill-operatur jaqbżu ż-żewġ allowlists.**
Operatur jista’ jiddikjara regola għal kull fornitur waqt ir-runtime permezz
ta’ `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
mingħajr ma jeditja dan il-fajl. Li regola tal-operatur titqiegħed wara
l-gating ta’ `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` —
allowlists maħsuba biex jipproteġu l-imġiba **default** tar-regoli tal-katalgu
integrat — jagħmel il-mekkaniżmu tas-settings inattiv għal kull fornitur ħlief
dawk li diġà huma elenkati hemmhekk, peress li d-dikjarazzjoni tar-regola
hija diġà l-opt-in espliċitu tal-operatur. Kemm `resolveRuleMatchBody()` kif
ukoll `honorsRuleLockScope()` l-ewwel jiċċekkjaw
`hasOperatorRuleForProvider()`: fornitur b’regola tal-operatur jirċievi
t-test mhux ipproċessat tal-iżball u l-`scope` iddikjarat tiegħu jiġi
rispettat, irrispettivament minn jekk jidhirx ukoll f’xi waħda miż-żewġ
allowlists.

**Lakuna magħrufa — `providerRuleRegistry` qatt ma jiġi kkonsultat għal HTTP 400.**
Il-fergħa `BAD_REQUEST` ta’ `checkFallbackError` tikklassifika status 400
kompletament permezz tal-arrays tal-patterns tagħha stess
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, eċċ.
f’`accountFallback.ts`) u tirritorna qabel ma tintlaħaq il-fergħa
`configuredRule`/`getProviderErrorRuleMatch` ta’ fuqha. Regola tal-katalgu
integrat (jew regola tal-operatur) bi `status: 400` hija sintattikament valida
iżda qatt mhi se tiġi attivata. Illum, ebda regola eżistenti ma timmira 400,
għalhekk xejn fil-produzzjoni mhu affettwat — iżda regola futura għal 400
teħtieġ li l-ewwel tiġi modifikata din il-fergħa, li hija bidla akbar
milli sempliċement tiżdied regola (tikklassifika mill-ġdid 400 għal kull
fornitur li diġà jiddependi fuq l-imġiba tal-array tal-patterns) u hija barra
mill-ambitu ta’ żieda ta’ regola għal fornitur wieħed.

### Żieda ta' gateway ġdid li jirrapporta ħażin il-kwota

1. Irreġistra array waħda ta' regoli f'`statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Żomm il-`textMarkers`
   speċifiċi għall-provider; qatt tuża mill-ġdid frażijiet ġeneriċi bl-Ingliż
   li jikkonfliggu ma' `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. B'mod opzjonali, irreġistra regoli ta' klassifikazzjoni f'
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) biex
   tagħżel l-ambitu t-tajjeb tal-lock (`connection` għal kwota fuq il-kont
   kollu, `model` għal żbalji għal kull mudell). Dan il-pass jieħu effett
   fil-produzzjoni biss għal providers li r-regoli tagħhom jeħtieġu t-test
   sħiħ tal-iżball (markers tal-body): żid l-id tal-provider f'
   `FULL_TEXT_RULE_PROVIDERS` fl-istess fajl — inkella `checkFallbackError`
   dejjem jagħti r-regola biss l-iżball strutturat `{code, type}` u regola
   bbażata fuq it-test tal-body qatt ma taqbel mat-traffiku live. Regoli li
   jaqblu biss fuq `status`/`headers` (bħal dawk ta' Opencode jew Minimax)
   m'għandhomx bżonn dan l-opt-in. Separatament, jekk ir-regola tiddikjara
   `scope: "connection"` u l-intenzjoni hija cooldown veru fuq il-konnessjoni
   kollha flimkien ma' combo skip fl-istess talba (mhux biss tikketta
   informattiva), żid l-id tal-provider f'`HONORS_RULE_LOCK_SCOPE_PROVIDERS`
   fl-istess fajl — dan huwa li jikkontrolla l-konsum ta' stil
   `isAgentrouterConnectionQuotaScope()` f'`markAccountUnavailable()`
   (`src/sse/services/auth.ts`) u `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); mingħajru, `scope` xorta
   jgħaddi minn `fallbackResult.ruleScope` imma xejn ma jaġixxi fuqu.
3. Żid unit tests li jirriflettu
   `tests/unit/upstream-status-restatement.test.ts` u
   `tests/unit/agentrouter-error-rules.test.ts` (inkluż il-guards
   not-permanent / not-creditsExhausted, u — jekk il-provider jeħtieġ
   l-allowlist — test li jivverifika li `resolveRuleMatchBody()` jirritorna
   t-test sħiħ biss għal dak il-provider).

M'hemmx bżonn ta' bidliet f'`chatCore.ts`, `classifyError`, jew combo.

#### Lock b'buckets tal-egress (#10880)

Il-providers f'`EGRESS_BUCKETED_LOCK_PROVIDERS` (il-familja opencode)
jittrattaw bħala upstream maqsum f'buckets skont l-IP (il-free tier ta'
opencode huwa maqsum f'buckets skont l-IP, mhux skont il-kont — ara #9611):
status-429 ikkklassifikat `quota_exhausted` **jew** `rate_limit_exceeded`
jagħmel cooldown lil kull konnessjoni tal-familja allowlisted li l-aħħar
egress IP magħruf tagħha jaqbel ma' dak tal-konnessjoni li falliet, qabel
ir-rotazzjoni tkun tista' tipprovahom
— u b'hekk jiġu evitati N-1 sejħiet upstream garantiti li jfallu (l-istess
forma ta' #10460/#10525). `rate_limit_exceeded` huwa inkluż apposta:
fil-mogħdija ta' `markAccountUnavailable` ir-regoli speċifiċi għal opencode
qatt ma jaqblu (l-ebda headers/body ma jintwasslu lil `checkFallbackError`,
opencode mhuwiex f'`FULL_TEXT_RULE_PROVIDERS`), għalhekk 429 li l-body tiegħu
jġorr it-test tal-kwota tas-sottoskrizzjoni ("monthly usage limit reached")
jikklassifika `quota_exhausted` permezz tal-fallback tat-test tal-kwota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown ta' siegħa)
qabel ma tintlaħaq qatt ir-regola `status_429` — filwaqt li 429 mingħajr test
tal-kwota (rate limiting sempliċi) jikklassifika permezz tar-regola
`status_429` bħala `rate_limit_exceeded` u xorta jagħmel cooldown
lill-familja tal-IP. Għal provider allowlisted, rate limit maqsum f'buckets
skont l-IP huwa l-istess sinjal bħal kwota eżawrita. Limiti onesti:

- **L-isforz l-aħjar**: il-lock jirrisolvi l-aħħar `egress_ip` magħruf
  tal-konnessjoni minn `proxy_logs` (tieqa ta' 24h, sinkronika, mingħajr
  cache). Cache kiesha (l-IP tal-egress qatt ma ġie sondat) jew l-ebda
  ringiela → il-konnessjoni li falliet xorta titpoġġa f'cooldown
  mill-fergħa (rrekordjata bħal-lum), biss l-ebda sibling ma jiġi ilokkajt.
- **Qatt terminali**: il-cooldown huwa tieqa ta' kwota li tiġġedded
  (`testStatus: "unavailable"`); stat permanenti qatt ma jkun derivat minn
  sinjal fil-livell tal-IP. Konnessjonijiet b'`disableCooling` jaqbeżu
  l-fergħa għal kollox.
- **Il-granularità tal-lock tinbidel għall-familja fil-allowlist**: din hija
  bidla fl-ambitu, mhux biss ottimizzazzjoni għas-siblings. opencode huwa
  provider `passthroughModels`, u għalhekk qabel din il-fergħa 429 kien
  jipproduċi lockout għal kull MUDELL; issa jipproduċi cooldown
  tal-konnessjoni — inkluż għal operatur li jħaddem konnessjoni waħda
  mingħajr ebda sibling. Dik hija l-granularità li t-tabella tar-regoli ta'
  opencode diġà tiddikjara bħala korretta (`scope: "connection"`,
  `providerErrorRules.ts`), qatt ma ġiet onorata s'issa għax opencode
  mhuwiex f'`HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Il-fergħa tikteb hija
  nnifisha l-cooldown + `backoffLevel` tal-konnessjoni li falliet, bħall-
  fergħa ta' agentrouter li għandha l-ambitu tal-konnessjoni, u tirritorna —
  il-blokk għal kull mudell u l-mogħdija ġenerika hawn taħt qatt ma
  jintlaħqu.
- **Combo inkluża**: bħall-fergħa ta' agentrouter, l-ambitu deliberatament
  jinjora d-downgrade `persistUnavailableState`/`isCombo` li caller combo
  japplika fuq 429. Lockout għal kull mudell mhuwiex forma aktar dgħajfa ta'
  dan l-ambitu, huwa l-unità ħażina: ma jgħid xejn dwar l-IP eżawrit, u
  għalhekk ir-rotazzjoni tal-combo tkompli tħarreq sejħa waħda garantita li
  tfall għal kull sibling.
- **Sigurtà tas-sibling**: sibling li diġà huwa terminali
  (banned/credits_exhausted) jew diġà f'cooldown itwal qatt ma jiġi miktub
  fuqu.
- **Allowlist esklussiva**: il-ftuħ ta' `EGRESS_BUCKETED_LOCK_PROVIDERS`
  huwa deċiżjoni esplicita tas-sid; l-ebda wiring ġeneriku (mudell
  #10334/#10419). Il-mistoqsija tas-siblings torbot dik l-istess allowlist
  minflok ma tirrepetiha bħala litteral SQL, sabiex il-ftuħ tagħha jibqa'
  bidla ta' ringiela waħda.
- **Rotazzjoni tal-IP tal-egress, fiż-żewġ direzzjonijiet**: it-tieqa
  tal-lookup (24h) hija ferm iktar wiesgħa mit-TTL tal-cache tal-IP
  tal-egress (5 min), u għalhekk "l-aħħar IP magħruf" huwa storja, mhux stat
  kurrenti. Jekk il-proxy ta' konnessjoni irrotat fi ħdan it-tieqa, il-lock
  jista' **jitlef** IP verament kondiviż (l-IP rrekordjat huwa dak il-ġdid,
  li mhuwiex eżawrit) — u b'mod simetriku jista' **jpoġġi f'cooldown sibling
  li minn dak iż-żmien irrotat 'l bogħod** mill-IP eżawrit. It-tieni każ
  jiswa lil dak is-sibling tieqa waħda ta' cooldown; it-tnejn huma limiti
  aċċettati tal-isforz l-aħjar ta' lookup bbażat fuq l-istorja.
- **Spiża**: żewġ scans limitati ta' `proxy_logs` (ffiltrati skont it-tieqa
  permezz ta' `idx_pl_timestamp`), biss bil-frekwenza ta' 429. L-ebda indiċi
  ġdid (migrazzjoni 134 YAGNI). Imkejjel fuq kopja ta' DB b'traffiku reali
  ta' daqs moderat; istanza b'throughput għoli żżomm proporzjonalment aktar
  ringieli fl-istess tieqa.

---

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
