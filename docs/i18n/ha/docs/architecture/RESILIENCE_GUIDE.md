# Resilience Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute tana da hanyoyi daban-daban amma suna da alaƙa. Kowannensu yana da iyaka da manufa daban. Kiyaye su daban lokacin da za'a gyara halayen saɓo.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Source: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Gabatar da Env-vs-dashboard don juriyar juriya.** Juriyar barin shiga yana jujjuya iri daga muhallin — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — kawai yana ba da _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Boolean ya ci gaba a cikin `resilienceSettings` (Dashboard →** Saituna → Resilience** / `PATCH /api/resilience`, adana a cikin `key_value`) yayi nasara akan darajar env: daidaitawa (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) yana adana boolean da aka adana a duk lokacin da akwai. Saita irin wannan env var zuwa `true` akan turawa inda dashboard ya rigaya ya ajiye `false` saboda haka babu abin da ya canza — ya juya zuwa** Saituna → Resilience** (ko share filin da aka adana) maimakon.

## 1. Circuit Breaker na Mai Ba da Sabis

**Fanni:** dukkan mai ba da sabis (misali, `glm`, `openai`, `anthropic`).

**Manufa:** dakatar da aika zirga-zirga zuwa ga mai ba da sabis da yake gazawa akai-akai a matakin upstream/sabis.

**Aiwatarwa:**

- Babban class: `src/shared/utils/circuitBreaker.ts`
- Haɗi (wiring): `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API na matsayi: `GET /api/monitoring/health`
- API na sake saita: `POST /api/resilience/reset`
- Masu rufi (wrappers): `open-sse/services/accountFallback.ts`
- Teburin DB: `domain_circuit_breakers`

**Matsayoyi:**

- `CLOSED` — ana ƙyale zirga-zirga ta al'ada
- `DEGRADED` — har yanzu ana ƙyale zirga-zirga, amma ana bin diddigin gazawar mai ba da sabis da ta ƙaru; yana komawa `CLOSED` idan nasarori sun isa, ko bayan gwajin haɗi mai inganci, ko bayan mafi tsawon riƙon `OPEN` na irin gazawar ƙarshe (ƙimar `cooldownByKind` nasa, in ba haka ba `resetTimeout`, × `maxBackoffMultiplier`, aƙalla sanyaya ɗaya) ba tare da sabuwar gazawa ba
- `OPEN` — an toshe mai ba da sabis na ɗan lokaci; tsara hanyar combo na ƙetare shi
- `HALF_OPEN` — lokacin sake saita ya ƙare; ana ƙyale buƙatar bincike (probe)

**Tsaftacewar asali mai iya daidaitawa (`open-sse/config/constants.ts`, an fallasa su a Dashboard → Settings → Resilience):**

| Aji     | Ya lalace a | Ya buɗe a | Lokacin sake saita |
| ------- | ----------- | --------- | ------------------ |
| OAuth   | gazawa 5    | gazawa 8  | 60s                |
| API-key | gazawa 7    | gazawa 12 | 30s                |
| Na gida | an samar    | gazawa 2  | 15s                |

`degradationThreshold` na sarrafa lokacin da mai ba da sabis zai shiga `DEGRADED`; `failureThreshold` na sarrafa lokacin da zai buɗe kuma a ƙetare shi. Har yanzu ba a fallasa bayanan martaba (profiles) na masu ba da sabis na gida a shafin saitunan Resilience ba tukuna.

**Lambobin kunna (trip codes):** matsayoyi na matakin mai ba da sabis kawai `[408, 500, 502, 503, 504]`. KADA a kunna saboda kurakuran matakin asusu (mafi yawancin 401/403/429 — waɗancan na cooldown ko kullewa (lockout) ne).

**Farfaɗowa mai jinkiri (lazy recovery):** lokacin da `OPEN` ya ƙare, `getStatus()`, `canExecute()`, `getRetryAfterMs()` suna sabunta matsayi zuwa `HALF_OPEN`. Irin waɗannan karatun (da kuma gazawar ta gaba) suna raguzza `DEGRADED` da ya shafe lokacinsa zuwa `CLOSED`. Ba a buƙatar mai ƙidayar lokaci na bayan gida (background timer).

---

### Cooldown na Mai Ba da Sabis na Duniya, ta Zaɓi (ƙofar taga)

Wani mataki na huɗu, mai **zaɓi** (`PROVIDER_COOLDOWN_ENABLED`, asali a **kashe**), yana riƙe ƙwaƙwalwar ajiya ta masu ba da sabis masu gazawa tsakanin buƙatu a cikin `open-sse/services/providerCooldownTracker.ts`, wanda ƙudurin manufar combo yana tuntuba domin buƙatun combo da ke jere su daina sake tafiyarwa mai ba da sabis da ya yi gazawa kwanan nan. Shigarwar matakin mai ba da sabis suna mutunta ƙofar tagar `PROVIDER_PROFILES`:

| Bayani  | Kunna bayan (`providerFailureThreshold`) | A cikin (`providerFailureWindowMs`) | Sanyaya na (`providerCooldownMs`) |
| ------- | ---------------------------------------: | ----------------------------------: | --------------------------------: |
| OAuth   |                                     `10` |                             `15min` |                            `5min` |
| API key |                                     `15` |                             `30min` |                           `10min` |

A ƙasan wannan ƙofa, **ba** a ɗaukar mai ba da sabis a sanyaya (cooling); nasara ɗaya tana share tagar. Shigarwar matakin haɗi (`provider:connectionId`) kuma suna ci gaba da amfani da jinkirin ƙaruwa (exponential backoff) na `minRetryCooldownMs → maxRetryCooldownMs` maimakon haka. Abubuwan maye gurbi (overrides): `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Mai kare koma baya (regression guard): `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Lokacin Dakatar da Haɗi

**Fage:** haɗin provider/account/key guda ɗaya.

**Manufa:** tsallake maɓalli guda mai matsala yayin da sauran haɗe-haɗe na provider ɗin suke ci gaba da bayar da sabis.

**Aiwatarwa:**

- Alamar rashin samuwa: `src/sse/services/auth.ts::markAccountUnavailable()`
- Zaɓe: `getProviderCredentials*` a cikin fayil ɗin
- Lissafin lokacin dakatarwa: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Saituna: `src/lib/resilience/settings.ts`

**Filayen kowanne haɗi:**

- `rateLimitedUntil` — timestamp ɗin da lokacin dakatarwa zai ƙare
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ma'aunin ƙidayar exponential backoff

**Tsoffin lokutan dakatarwa:**

- Tushen OAuth: 5s
- Tushen API-key: 3s
- API-key 429: ya fi son `Retry-After`/reset headers/saƙon reset da za a iya fassarawa daga upstream
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Jinkirin sake gwadawa na kowane provider.** Shafin bayanan provider yana da zaɓin **Jinkirin sake gwadawa** (Auto,
15s har zuwa 1h). Yana adana `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, ta `PATCH /api/resilience`). Lokacin da kuskuren rate-limit bai ƙunshi
wani bayani daga upstream kan lokacin sake gwadawa ba, wannan ƙimar tana maye gurbin scaled backoff na provider ɗin kuma tana mayar da
`backoffLevel` zuwa 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Tsarin fifiko ga kuskuren rate-limited, daga mafi girma zuwa ƙasa, shi ne: bayanin sake gwadawa daga upstream, sannan `providerSpecificData.rotationOverrides.rateLimitResetSeconds` na kowane haɗi, sannan jinkirin sake gwadawa na kowane provider, sannan `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` na muhalli, sannan scaled backoff. Auto yana cire filin. Yana shafar dalilin rate-limit ne kawai, ba terminal states ba.

**Kariya daga taruwar buƙatu lokaci guda:** tana hana gazawar lokaci guda ƙara tsawaita lokacin dakatarwa fiye da kima ko ƙara `backoffLevel` sau biyu.

**429 na iyakar concurrency ba sa hawa matakan backoff.** `429` wanda jikinsa ke nuna
iyakar concurrency ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) yana nufin account ɗin yana cikin koshin lafiya amma yana aiki sosai.
`checkFallbackError()` yana mayar da dalilin `concurrency_limited`: a koma zuwa haɗi na gaba
nan take, a dakatar da wannan na tsayayyen `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ko bayanin sake gwadawa daga upstream, a bar `backoffLevel` yadda yake, sannan a sa `skipProviderBreaker`.
Bayyanannen jikin quota yana da fifiko, don haka jikin da ya kuma dace da tsarin quota zai ci gaba da zama hukuncin quota. Ganowa: `looksLikeConcurrencyLimit()` a cikin `src/shared/utils/classify429.ts`;
hukunci: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` na breaker) bai canza ba kuma har yanzu yana karanta `rate_limit` ga waɗannan jikunan.

**Tsayawar abubuwan stream ba sa dakatar da account.** Lokacin da watchdog na tsayawar abun ciki
(`open-sse/utils/streamHandler.ts`) ya daina jira wani stream da bai aika fitarwar model ba cikin lokaci,
`markAccountUnavailable()` yana rubuta kuskuren a kan haɗin amma ba ya sa lokacin dakatarwa: tsayawar ta shafi wannan request ne, galibi dogon juyin tunani ne ba tare da fitarwa ba tukuna. Masu aiki za su iya kunna wannan da kansu ta `resilienceSettings.streamStallCooldown.enabled`
(tsoho `false`).

**Siginar latency na zaɓin account na `p2c` wadda ake kunna da son rai.** Kowanne yunƙurin da aka aika yana rubuta lokacin zuwa byte na farko da sakamakonsa ga kowane haɗi (da kuma ga kowane haɗi + model) a cikin taga mai juyawa a ƙwaƙwalwa: samfurori 20 na ƙarshe cikin mintuna 15
(`open-sse/services/connectionLatencyTracker.ts`, ana rubutawa daga `safeLogEvents()` a
`src/sse/handlers/chatHelpers.ts`). Lokacin da `resilienceSettings.p2cLatency.weight` ya fi
`0` (iyaka 0-20, tsoho `0` = a kashe), `compareP2CConnections()` a cikin `src/sse/services/auth.ts` yana ƙara maki har zuwa `weight` ga kowane ɗan takara na biyun. Rabin maki yana zuwa daga latency a matsayin rabo ga ɗan takarar da ya fi sauri (idan ya ninka jinkiri sau biyu yana samun cikakken rabin), rabin kuma daga ƙimar kuskure mai juyawa.
Ana amfani da wannan kalma ne kawai idan duka 'yan takarar suna da aƙalla samfurori 3, don kada a hukunta sabbin accounts, kuma iyakarta tana kasancewa ƙasa da hukuncin quota-blocked da quota-exhausted. Ba ta ƙara wani circuit na kanta: cooldown, lockout da breaker layers ne har yanzu suke kula da accounts masu gazawa. Saita ta da `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Firam ɗin reasoning suna sake fara kasafin tsayawar abun ciki.** Model na reasoning na iya yin tunani na
mintuna kafin alamar farko da za a gani: Claude yana stream ɗin firam ɗin `thinking_delta` waɗanda rubutun tunaninsu zai iya zama babu komai, API na Responses kuma yana stream ɗin reasoning item ɗaya bayan ɗaya. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) yana gane waɗannan firam ɗin, kuma watchdog yana sake fara kasafinsa a kowane ɗaya maimakon soke juyin. Har yanzu ba fitarwar model ba ne, don haka juyin da ya ƙare da reasoning kawai har yanzu ana bayar da rahotonsa a matsayin babu komai, kuma juyin da ya daina reasoning sannan ya aika heartbeats kawai har yanzu zai kunna watchdog.

Firam ɗin binary na Kiro `reasoningContentEvent` mai sa hannu mara komai yana kiyaye wannan
aikin reasoning ta executor a matsayin delta na `reasoning_content` mara komai. Ba a tura sa hannun gaba. Metadata, firam ɗin da bai cika ba da sa hannu marar komai ba sa sake fara kasafin abun ciki; timeout na active-stream mai zaman kansa da soke ta client har yanzu suna aiki (`open-sse/executors/kiro/reasoning.ts`).

**Terminal states (BA lokutan dakatarwa ba):**

- `banned` — ana saita shi ta gano banned-keyword / account-ban (duba [BAN_DETECTION](../security/BAN_DETECTION.md)). Ƙin amincewa na upstream ga kowane request (`request_rejected`, misali Anthropic OAuth 403 "Request not allowed") ba ya saita shi: ana ƙirga su bisa haɗi da model, kuma ana cire wannan model daga rotation tare da lokacin dakatarwa mai ƙaruwa wanda ya tsaya a `REQUEST_REJECTED_MAX_COOLDOWN_MS` (awa 1), ko kuma a dakatar da haɗin lokacin da ba a san model ba — `open-sse/services/requestRejectedStreak.ts`
- `expired` (yana komawa terminal bayan iyakantattun sake gwadawa — `EXPIRED_RETRY_MAX = 3` tare da exponential backoff — domin kurakuran OAuth na wucin gadi su iya gyara kansu kafin a kashe account ɗin har abada)
- `credits_exhausted`

Waɗannan suna ci gaba har sai takardun shaidar shiga sun canza ko ma’aikaci ya sake saita su. Kada a maye gurbin yanayin ƙarshe da yanayin dakatarwa na wucin gadi.

**Farfadowa ta jinkiri:** idan `rateLimitedUntil` ya wuce, haɗin zai sake cancanta. Bayan an yi amfani da shi cikin nasara, `clearAccountError()` yana share duk filayen kuskure.

### Katangar amfani da Claude OAuth: layin fifiko mafi ƙasa + sake saitin iyakar zaman

**Faɗin aiki:** haɗin biyan kuɗin Claude guda ɗaya (OAuth). Duk fasalolin biyu **ana kunna su bisa zaɓi ga kowane
haɗi** (Edit connection → sashen Claude → `lowPriorityMode` / `autoLimitReset` a cikin
`providerSpecificData`, dukansu a kashe suke ta tsohuwa) kuma suna kwaikwayon umarnin Claude Code na `/low-priority` da `/limit-reset` (an tabbatar da yarjejeniyar sadarwa daga Claude Code 2.1.263).

**Aiwatarwa:**

- Injin yanayi + rarrabewar amsa: `open-sse/services/claudeLowPriority.ts`
- Abokin ciniki na matsayin/sallamar sake saiti: `open-sse/services/claudeLimitReset.ts`
- Ƙugiya ta mai aiwatarwa (allurar header + sake gwadawa da asusun ɗaya): `open-sse/executors/base.ts::execute()`
- Dorewar kunna fasalin: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Abin da ke jawo aiki:** katangar amfani ta sa’o’i 5 — `429` wanda headers ɗinsa ke ɗauke da
`anthropic-ratelimit-unified-status: rejected` da, idan asusun ya cancanta,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ba a aika komai kafin `429` na farko na wannan katangar ba; `429` na gaugawa ba tare da unified headers ba yana bin hanyar dakatarwa ta yau da kullum.

**Layin fifiko mafi ƙasa** (`lowPriorityMode`):

- A kan `429` na katangar, mai aiwatarwa yana karɓar tayin kuma nan take ya sake gwada **asusun
  ɗaya** da `anthropic-usage-limit: slow`; layin yana ci gaba da aiki har zuwa lokacin
  `anthropic-ratelimit-unified-reset` da aka sanar (+ daƙiƙa 60 na kari), kuma kowace buƙata a cikin wannan tazara tana ɗauke da header ɗin. `429` da aka kama ba ya isa `handleChatCore`, saboda haka ba a sanya haɗin cikin dakatarwa kuma ba a sauya shi zuwa wani.
- `anthropic-ratelimit-unified-slow-status` a amsoshi na gaba: `active` / `not_needed` suna ci gaba da riƙe layin; `slot_busy` (429) ko `529` suna jira lokacin `anthropic-ratelimit-unified-slow-retry-after` na uwar garke (tsoho daƙiƙa 20, iyaka daƙiƙa 5–600, karkatarwa ±30%) sannan su sake gwadawa, tare da iyaka ta `anthropic-ratelimit-unified-slow-max-wait` (tsoho mintuna 20, iyaka minti 1–awa 6) — bayan wannan layin yana ƙarewa kuma dakatarwa na mintuna 10 yana hana sake karɓa. Hakanan ana takaita lokacin jira da abin da ya rage daga lokacin ƙarshe na fara buƙatar upstream (`resolveFetchStartTimeout`, mintuna 10 ta tsohuwa) ban da tazarar daƙiƙa 5: ba tare da wannan takaitawar ba, tsohon max-wait na mintuna 20 zai wuce rayuwar buƙatar, kuma za a katse barcin a tsakiyar jira, lamarin da zai fito da `TimeoutError` maimakon ƙarshen `max_wait` cikin tsari da dakatarwa.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, juyawar taga ta sa’o’i 5, ko
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (wanda ke ƙare shi a matsayin
  `extra_usage` a kowace irin alama, domin ƙarin biyan kuɗi yanzu yana rufe katangar) suna ƙare layin; daga nan amsar tana bin hanyar dakatarwa ta yau da kullum. Ana riƙe `budget_exhausted` har zuwa lokacin sake saitin kasafin da aka sanar (≤ kwanaki 8).
- Ana gudanar da binciken katangar bayan sake gwadawar cikin yunƙurin da mai aiwatarwa kansa ke yi sakamakon 400 (gyaran mahallin, takaita thinking/effort, koyon sigogi ta atomatik), don haka `429` na katangar da ya bayyana ne kawai a ɗaya daga cikin waɗannan sake gwadawar har yanzu ana kamawa maimakon ya isa hanyar dakatarwa.
- Ana riƙe yanayin a ƙwaƙwalwa bisa kowane haɗi (sake farawa yana haifar da ƙarin `429` guda ɗaya na katangar kafin a sake karɓa).

**Sake saitin iyakar zaman** (`autoLimitReset`, ana gwadawa kafin layin idan dukansu suna kunne):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → toshe `juniper_tide`; idan `arm: "reset"` kuma `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` tare da
  `{ "program": "juniper_tide" }` (UUID ɗin ƙungiya daga `providerSpecificData.organizationUUID`, tare da madadin bootstrap).
- `result: reset|not_limited` → ana sake gwada buƙatar da cikakken sauri (ba tare da slow header ba).
  `already_used` / `not_offered` suna adana `next_available_at` a ƙwaƙwalwa (tsoho mako ɗaya); duk wani gazawa yana dakatar da sake gwadawa na mintuna 15. Ana yin sake saitin sau ɗaya a mako kuma har yanzu yana ƙidaya cikin iyakar mako-mako.

Masu tsaron koma-baya: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Aiwatar da sake saitin banki ta atomatik

**Iyakar:** Haɗin haɗin Codex da Claude (OAuth).**Ficewa** : Saitin `bankedResetAutoApply` yana kashe kuma a yanayin `dry-run` ta tsohuwa (Saitunan → AI → Saitunan sake saitin banki ta atomatik).

**Manufar:** kashe sake saitin banki da kansu lokacin da asusu ya bugi bangon amfani, maimakon jiran ma'aikaci ya danna "Ciki" akan shafin Iyakan Masu bayarwa.

| Nau'in Kiredit (`creditTypes`) | Abin da aka fanshi                             | Inda yake gudu                                                     |
| ------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------ |
| `codexCredits`                 | Codex sake saitin ƙididdiga                    | baya aiki, kowane 60 s                                             |
| `claudeCredits`                | Tallafin banki na Claude (Kiredit `GRANT` )    | baya aiki, kowane 60 s                                             |
| `claudeSessionReset`           | Sake saitin iyaka na mako-mako Claude (a sama) | hanyar neman, ta hanyar manufa iri ɗaya da jujjuyawar kowane asusu |

**Aiwatarwa:**

- Tsabtataccen yanke shawara (ka'ida ɗaya da aka saita don hanyoyi biyu): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Aikin bango: `src/lib/services/bankedResetAutoApply.ts` (wanda aka fara a `src/instrumentation-node.ts`)
- Ƙofar buƙatun Claude : `src/lib/usage/claudeSessionResetPolicy.ts`, rajista ta hanyar `setClaudeLimitResetPolicy()` a cikin `open-sse/services/claudeLimitReset.ts`
- Tarihi, iyakoki da ƙugiya: `src/lib/usage/bankedResetAudit.ts`
- Tarihi API: `GET /api/settings/banked-reset-auto/history?limit=50` (Auth Gudanarwa)

**Odar yanke shawara** (ka'idar rashin nasara ta farko ita ce dalilin da aka rubuta):

1. An kashe fasalin, nau'in kiredit, ko asusu mara iyaka (`accountScope` `all` / `selected` da taswirar `connections` kowane-asusu).
2. A waje da jadawalin UTC na zaɓi (`startHourUtc` > `endHourUtc` ya haye tsakiyar dare).
3. Matsakaicin sa'o'i 24 na ƙarshe: `maxPerAccountPerDay` (1), `maxPerDay` (3), da `minSpacingMinutes` (30) tsakanin kowane fanni biyu.
4. Trigger: taga `session` ko `weekly` mai bango (karanta daga `getQuotaWindowStatus().reachedThreshold`, ba `isAccountQuotaExhausted()`, wanda ke ba da rahoton asusu tare da kowane taga da aka kashe kawai), ko kiredit ɗin da ke ƙarewa a cikin `expiringCreditHours` (24) akan asusun da ya yi amfani da aƙalla `expiringCreditMinUsedPercent` (50).
5. Tsaron sake saitin dabi'a: tsallake lokacin da taga mai bangon sa'o'i 5 ta sake saitawa a cikin `sessionResetGuardMinutes` (90), ko tagar mako-mako tsakanin `weeklyResetGuardHours` (12).
6. Kasa na mako-mako: tsallake sake saitin sa'o'i 5 lokacin da saura sati ya kasa `weeklyFloorPercent` (10).
7. Yanayin `last-resort` : tsallake yayin da wani asusu mai iyaka na mai samarwa yana da aƙalla `poolHeadroomPercent` (10) hagu a duka windows biyu. Ƙarshe-ƙiredit yana jawo ketare wannan.
8. `dry-run` yana rikodin jere kuma bai fanshi komai ba; `last-resort` da `eager` sun fanshi.

Rasa bayanan keɓaɓɓun bayanai baya buɗe fansa: lokacin sake saitin da ba a san shi ba ko tsallakewar amfani na mako-mako.

**Sake saitin zaman Claude :** tare da fasalin a kashe, ko `claudeSessionReset` a kashe, kowane asusu `autoLimitReset` toggle yana yanke hukunci daidai kamar da. Tare da duka biyun, fasalin yana maye gurbin kowane-asusu na toggles: asusun da ke cikin iyaka yana iya da'awar kawai lokacin da manufofin ke ba da izini, kuma a cikin yanayin `dry-run` ba a yi da'awar ba.

**Tsaro:** aikin yana fanshi a mafi yawan kiredit ɗaya a kowane kaska, yana yanke hukunci kafin lissafin ƙididdigewa (asusun da ba a taɓa jera shi ba), yana amfani da maɓallan idempotency `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`, kuma yana adana asusu don 1 h bayan gazawar jeri ko fansa. Kowane fansa, gazawar da bushe-gudu yanke shawara an rubuta zuwa `audit_log` (`action: "bankedReset.redeem"`, babu alamun ko ID ID); Ana kirga iyakoki daga waɗancan layuka, don haka suna tsira da sake farawa. Nasarar fansa kuma tana ƙone gidan yanar gizon `provider.reset_redeemed`.

Masu gadin koma baya: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Dangantakar zaman (#7274)

**Faɗin aiki:** zaman abokin ciniki guda ɗaya (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) ana kulle shi ga haɗi guda ɗaya, ga **kowane** mai bayarwa.

**Manufa:** kiyaye wakili mai zagayowar tattaunawa da yawa (Claude Code, aider, wakilai na musamman) a kan asusun ɗaya a duk buƙatu, don rage asarar mahallin tsakanin asusu da maimaituwar `429` na farawar sanyi a kan masu bayarwa masu yanayin zaman na kowane asusu.

**Aiwatarwa:**

- Warware TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Zaɓe/ƙirƙirar kullewa: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Ciro header (na gama-gari, kowane mai bayarwa): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Teburin kullewar da ake dorewa: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Saiti: `sessionAffinityTtlMs` (TTL na duniya a ms, `0` yana kashe shi) — `src/lib/db/settings.ts`. An sake masa suna daga `codexSessionAffinityTtlMs` na Codex kaɗai ta hanyar ƙaura `124_generic_session_affinity_ttl.sql`, wadda ke ɗauko duk wani TTL na Codex da aka riga aka saita ta mai da shi sabon tsohon ƙima.

Kafin #7274, `resolveSessionAffinityTtlMs()` yana dakatar da aiki da wuri zuwa `0` ga kowane mai bayarwa ban da `codex`, saboda haka saitin TTL (da session headers) ba su da wani tasiri a wani wuri dabam duk da cewa tsarin kullewa da ciro header sun riga sun kasance masu zaman kansu daga mai bayarwa. Gyaran ya cire wannan dawowar da wuri; yanzu TTL yana aiki iri ɗaya ga kowane mai bayarwa da zarar an saita shi a duniya sama da `0`.

Ba a taɓa tura headers uku na dangantakar zaman zuwa upstream — masu aiwatarwa suna gina nasu upstream headers daga tushe maimakon su wuce headers na abokin ciniki, don haka wannan yana kasancewa lambar haɗin kai ta cikin gida kawai.

### Hayar haɗin zaman da ake sarrafawa ta musamman

**Iyakar aiki:** abokin ciniki/sesshin HTTP guda ɗaya da ake sarrafawa yana mallakar haɗin OmniRoute guda ɗaya da ya cancanta.

**Manufa:** samar da ɗorewar mallakar haɗi ta keɓance ga abokan cinikin da ke buƙatar tsayayyen shingen turawa a tsakanin buƙatu. Wannan ya bambanta da manne wa sesshin, wanda fifiko ne mai sassauci na ci gaba da haɗuwa:
hayar keɓancewa tana adana yanayin tsarin rayuwa a cikin SQLite, tana tilasta keɓantuwar mai
mallaka mai aiki da haɗin mai aiki a duk tsarin, kuma tana ƙin ƙarni da ya tsufa kafin a
tura wa mai bayarwa.

Ana kunna wannan fasali bisa kowane maɓallin API. Dole ne maɓallin da ake sarrafawa ya kasance yana
da `lease:exclusive` scope da jerin `allowedConnections` bayyananne wanda ba fanko ba. Duk wani
abokin cinikin HTTP na iya amfani da ƙarshen tsarin rayuwa; ba a buƙatar sunan abokin ciniki,
wakilin mai amfani, mai bayarwa, hanyar OAuth, ko samfurin. Hayar tana mallakar haɗi ne,
ba samfurin ba, don haka canjin samfurin yana riƙe da ɗaurin muddin haɗin yana ci gaba da
cika ƙa’idodin cancanta na yau da kullum. Ƙa’idodin samfurin, ƙididdigar amfani, lafiya,
lokacin dakatawa, da jerin izini na yau da kullum su ne masu iko, kuma za su iya sauya wannan
ƙarni zuwa wani haɗin da ya cancanta kuma yake kyauta.

Tsarin rayuwar shi ne `POST /api/v1/session-leases` tare da ayyukan JSON `acquire`, `renew`, da `release`.
Buƙatun ƙaddamar da aiki da ake sarrafawa suna gabatar da ƙimar `X-OmniRoute-Lease-Owner` marar bayyanawa da
`X-OmniRoute-Lease-Generation` daidai. Mai mallaka yana amfani da `vlo_` da ke biye da haruffa 43 na base64url;
ana adana hash ɗinsa na SHA-256 ne kawai. Kowane shingen ƙaddamarwa na ƙarshe yana kuma ɗaure da ID na
maɓallin API da aka tantance da ID na haɗin da ke aiki. Ana cire taken sarrafa hayar daga rajistoci,
hotunan buƙatu da aka riƙe, da taken masu aiwatarwa na sama.

Idan turawa ta yau da kullum tana da masu neman haɗin da ake sarrafawa waɗanda suka cancanta amma
kowane mai nema da yake kyauta yana hannun hayar wani baƙon mai aiki, OmniRoute yana mayar da HTTP
`429`, lambar `lease-capacity-unavailable`, yanayin jiran samuwar damar, da `Retry-After` mai iyaka
wanda aka samo daga ƙarewar da ta fi kusa kuma ta dace.
Rashin cancantar komai na yau da kullum ba takaddamar hayar ba ce, kuma yana ci gaba da amfani da
ma’anonin kuskuren turawarsa na da.

Hanyoyin da ke da alaƙa suna ci gaba da kasancewa dabam:

- Mamaye sesshin OAuth rarrabawa ce mai laushi, ta cikin tsarin aiki, ga asusun OAuth.
- Semaforin asusu suna bayar da izinin yawan buƙatun da ke gudana a lokaci guda, kuma suna ƙarewa idan buƙata ta kammala.
- Hayoyin sesshin da ake sarrafawa kuma keɓantattu mallakar tsarin rayuwa ne mai ɗorewa tare da shingen ƙarni.

## 3. Kulle Samfurin

**Iyaka:** ukun mai samarwa + haɗi + samfurin.

**Iya ta maɓalli bisa ga matsayi:** matsayin da ya gaza ne ke yanke shawarar maɓallin da kullewa za ta rubuta zuwa gare shi
(`resolveLockoutScope()` a cikin `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — siginar ƙayyadadden amfani ko cancanta — a kulle **rukunin ƙayyadadden amfani**:
  ga codex, a kulle dukkan iyakar `codex` / `spark` (duk samfurin `gpt-5*` na haɗin), ga sauran masu samarwa kuma a yi amfani da `getQuotaScopedModelForProvider()`.
- `404` yana kulle samfurin tsirara (`getModelLockKey()` yana taƙaita `not_found`).
- Duk wani matsayi — kurakuran sufuri/uwar garke na `5xx` da kuma `502` da OmniRoute ya samar saboda ingancin amsawa — yana kulle **ainihin** ukun mai samarwa/haɗi/samfurin kawai. Mummunan rafi a kan samfurin guda ba shaida ba ce game da ƙayyadadden amfani na asusun; kafin wannan ƙa’ida, amsa mara komai guda ɗaya a kan
  `codex/gpt-5.6-luna` tana cire duk samfurin `gpt-5*` na wannan haɗin daga hanyar zaɓe na tsawon mintuna 2–30 (yana ƙaruwa), alhali ƙayyadadden amfaninsa bai canza ba.
- Zaɓin `scope` da mai kira ya bayar a sarari yana da fifiko koyaushe (Antigravity yana aika `"exact"`).

**Manufa:** guje wa kashe haɗi gaba ɗaya yayin da samfurin guda ɗaya kawai ba ya samuwa ko kuma yana da iyakar amfani.

**Misalai:**

- Masu samarwa masu ƙayyadadden amfani ga kowane samfurin da ke mayar da 429
- Masu samarwa na gida da ke mayar da 404 saboda samfurin guda ɗaya da ya ɓace
- Rashin izinin yanayi/samfurin na musamman ga mai samarwa (misali, yanayin Grok)

**Aiwatarwa:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard na Dakatarwar Samfura (v3.8.0)

UI: Saituna → Dakatarwar Samfura (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Yana jera kulle-kullen da ke aiki tare da: mai samarwa, haɗi, samfurin, dalili, expiresAt. Masu aiki za su iya sake kunna samfurin da hannu daga katin.

**REST API:**

- `GET /api/resilience/model-cooldowns` — jera kulle-kullen da ke aiki
- `DELETE /api/resilience/model-cooldowns` — sake kunnawa da hannu. Jiki: `{provider, connection, model}`. Tantancewa: management.

### Mai Sarrafa Dakatarwa

UI: Sa ido → Mai Sarrafa Dakatarwa (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Shafi guda ɗaya don kowanne haɗi da ya fita daga hanyar zaɓe saboda wani dalili na wucin gadi, maimakon buɗe shafin kowane mai samarwa. Yana jera dakatarwar haɗi, kulle-kullen samfurai da matsayi na ƙarshe, yana share su ta kowanne haɗi, don zaɓi, ko don dukkan haɗin mai samarwa, sannan yana gyara ƙa’idojin dakatarwa da aka fi daidaitawa: `streamStallCooldown.enabled` da kuma tushen dakatarwar `connectionCooldown` da matakan matsakaicin komawa baya na OAuth / API-key (ana adanawa ta `PATCH /api/resilience`). Ana jera matsayi na ƙarshe (`banned`, `expired`, `credits_exhausted`) amma ba a taɓa share su a nan ba.

Katin **ƙa’idojin dakatarwa saboda kuskure** da ke wannan shafi yana gyara ƙa’idojin kuskuren mai aiki (`settings.providerErrorRules`) da kuma tsoffin ƙa’idojin kama-duka na kowane mai samarwa (`settings.providerErrorDefaults`) ta `PATCH /api/settings` — duba “Operator-declared
rules” ƙarƙashin §7 don yadda suke daidaituwa. Tsawon lokaci su ne Default (ba a bayyana dakatarwa ba), mintuna 30, awa 1, awanni 5, awanni 24, ko na musamman daga minti 1 zuwa 43,200 (kwanaki 30).

**REST API** (`src/lib/resilience/cooldownManager.ts`, tantancewa: management):

- `GET /api/resilience/cooldowns[?provider=]` — haɗe-haɗe tare da matsayi, ragowar dakatarwa,
  matakin komawa baya, nau’in kuskure na ƙarshe da kulle-kullen samfurai (ba tare da bayanan sirri ba)
- `POST /api/resilience/cooldowns` — jiki `{connectionIds: string[]}` ko
  `{all: true, provider?}`; yana mayar da `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI na saitunan kulle samfurin + murmurewa ta raguwar nasara (v3.8.23)

Kulle samfurin ya sauya daga ɗabi’ar da aka tilasta koyaushe kuma aka rubuta kai tsaye zuwa fasali mai cikakken daidaitawa, na zaɓi, mai katin saitunansa da hanyar murmurewa mai gyara kanta.

**Katin saituna:** Saituna → Kulle Samfurin
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Wannan **ya bambanta** da `ModelCooldownsCard` mai karantawa-kawai da ke sama (wanda kawai
_yake jera_ kulle-kullen da ke aiki) — sabon katin yana _daidaita sigogin_. Tsoffin ƙimomi suna cikin `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Saiti                   | Tsoho                            | Ma’ana                                                                   |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Babban maɓalli — kulle samfurin **a kashe yake ta tsohuwa**.             |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Matsayin daga sama da ake ƙirga a matsayin gazawar da ta shafi samfurin. |
| `baseCooldownMs`        | `120_000` (120 s)                | Tsawon kulle na farko bayan gazawa ta farko.                             |
| `maxCooldownMs`         | `1_800_000` (minti 30)           | Iyakar dakatarwar da aka ƙara.                                           |
| `maxBackoffSteps`       | `10`                             | Matsakaicin matakan ƙarin komawa baya na ninkawa.                        |
| `useExponentialBackoff` | `true`                           | Ko maimaita gazawa za ta ƙara dakatarwar ta hanyar ninkawa.              |

Ana adana saituna ta wurin adana saituna na yau da kullum kuma ana tantance su ta tsarin saitunan juriya; katin yana taƙaita `baseCooldownMs`/`maxCooldownMs`
(tare da `maxCooldownMs ≥ baseCooldownMs`) da `maxBackoffSteps`.

**Murmurewa ta raguwar nasara:** murmurewa **ba** ta dogara da ƙarewar lokaci kawai ba. Amsa mai lafiya tana rage adadin gazawar samfurin a hankali, ta yadda samfurin da ya murmure a tsakiyar taga zai daina ƙara tsananta (kuma ya share) kafin lokacin dakatarwarsa ya ƙare. Bayan nasarar haɗin da ake nufi, `open-sse/services/combo.ts` yana kiran `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), wanda ke **raba** adadin `failureCount` da biyu
(`Math.floor(failureCount / 2)`); idan ya kai `0`, ana share shigar kulle gaba ɗaya. Abokin aikin `recordModelLockoutFailure()` yana ƙara adadin (kuma yana ƙara dakatarwar) idan gazawa ta faru cikin tagar ƙarin tsanantawa. Wannan raguwar nasara ƙari ce ga ƙarewar lokaci ta yau da kullum —
kowace hanya daga cikinsu na iya sake kunna samfurin.

**Matsayi:** ana riƙe **kullewa a cikin ƙwaƙwalwa** (per-process `Map`s na
`ModelLockoutEntry` waɗanda aka jera da `provider:connectionId:model`, makullin
takamaiman iyaka kuma ana jera su da
`provider:connectionId:exact:model`), ba a adana su a
DB ba — suna ɓacewa idan an sake farawa. Ana adana _saitunan_; _yanayin kullewa_
mai aiki na ɗan lokaci ne.

## 4. Ƙididdigar Rarraba Sarrafa Sabis (v3.8.36)

Asusun biyan kuɗi (GLM, MiniMax, da sauransu) sau da yawa suna karɓar buƙatun ~ 1-3 kawai; wuce abin da ke haifar da 429s da cooldowns. Wannan shi ne m karkashin **rabo-share** (`qtSd/…`) combos, inda maɓallan API da yawa ke raba asusun sama ɗaya. Yadudduka uku suna kiyaye asusun da aka raba daga ambaliya.

### Haɗin haɗin kai ɗaya (`max_concurrent`)

Kowane haɗin mai ba da sabis na iya bayyana rufin `max_concurrent` (`provider_connections.max_concurrent`, saita a cikin yanayin haɗin / API / DB). Bar shi fanko ba iyaka. Wannan ita ce ƙulli ɗaya wanda ke tafiyar da serialization Layer a ƙasa — saita shi zuwa ainihin daidaitaccen asusun (misali GLM ~ 1, MiniMax ~ 2).

### Matsakaicin madaidaicin samfuri (`modelConcurrency`)

Haɗin kai kuma na iya bayyana ainihin silin-dalilin kowane samfuri a cikin taswirar ta `rateLimitOverrides` :

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Saita shi a cikin tsarin haɗin kai (**Ƙimar ƙididdige ƙididdigewa ya wuce → Per-model madaidaicin iyakoki** , `model=cap` ɗaya a kowane layi) ko ta hanyar `PATCH /api/providers/[id]` mai siffar JSON iri ɗaya. Mahimman bayanai:

- **Haɗin kai-fadi vs takamaiman samfuri:** `maxConcurrent` ya kasance babban rufin haɗin gwiwa mai faɗi. Lokacin da aka yi amfani da duka biyun, ana samun duka kofofin biyu ta atomatik a cikin kofa guda ɗaya (`global → provider → account → model`); ingantacciyar ɗabi'a ita ce mafi tsananin iyaka.
- **Daidaitaccen maɓalli na ƙirar ƙira:** mabuɗin shine kirtani samfurin da aka wuce zuwa ga mai aiwatarwa bayan ƙaddamar da ƙudurin — kullum dandali samfurin id na sama (`glm-5`), ba sunan abokin ciniki `provider/model` ba (`zai/glm-5` bai dace da `glm-5` ba). Ma'auni sune rufin buƙatun ƙididdiga masu inganci.
- **Layin gida, babu ganowa:** wuce haddi na buƙatun layi a cikin gida tare da ilimin tarukan queue/timeout na yanzu (kurakurai shigar `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ). OmniRoute baya gano ko ba da bayanin manufofin sama — yana aiwatar da ainihin rufin da mai aiki ya daidaita. Cikakken Ƙofar ƙira ba zai taɓa kashe mai badawa ba kuma baya haifar da kulle samfurin dindindin; Halayen 429/cooldown/fallback na sama ya kasance kuskuren baya.
- **Haɗin kai-tsaye, iyakar-tsari:** iyakoki suna ta kowace hanyar haɗin bayanai kuma ana riƙe su a cikin ƙwaƙwalwar ajiya, don haka haɗin haɗin gwiwa biyu masu sake amfani da maɓallin API ɗaya na sama ba sa daidaitawa da juna.
- **Ba a daidaita shi yana nufin mara canzawa:** ƙetare taswirar (ko barin filin dashboard babu komai) baya ƙara kofa samfurin. Tsarin misali ba tare da tabbatar da kowane iyaka na mai bada sabis na duniya ba:

```text
glm-5=1
glm-4.7=3
```

### Serialization buƙatun rabon ƙima

Lokacin da aika rabon rabon rabon ya yi niyya ga haɗin gwiwa wanda ke bayyana ingantaccen `max_concurrent`, buƙatun lokaci guda zuwa wancan.**asusu** ana jera su ta hanyar semaphore mai haɗin kai (key `qsconn:<connectionId>`): buƙatun wuce gona da iri **jira a cikin jerin gwano** maimakon ambaliya asusu. Yana da **kasa-bude** — cikakken jerin gwano ko ƙarewar lokaci yana ci gaba ba tare da ramuwa ba maimakon taɓa ƙin yarda da buƙatun da za a iya aikawa. Shiga ciki **Saitunan → Resilience → Quota-share na haɗin haɗin kai** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, tsoho a kunne). Ba tare da hular `max_concurrent` ba yanayin ba ya canzawa.

> Ƙofar hanyar da za a raba rabo (`selectQuotaShareTarget`, DRR + P2C) ita kanta ta kasa buɗewa kuma kawai _deprioritizes_ haɗin haɗin gwiwa — tare da tafkin haɗin kai guda ɗaya ba zai iya iyakancewa ba, don haka wannan semaphore shine ainihin abin da ya ƙunshi ambaliya.

### Combo cooldown-sanke sake gwadawa

Ga kowane dabarun haɗin gwiwa (lokacin da aka kunna), buƙatun da zai ƙirƙira 429 don sanyi na wucin gadi SHORT yana jira shi kuma ya sake aikawa maimakon dawo da 429 — wannan ya rufe Gemini-class TPM/RPM windows (~ 60s sake gwadawa-bayan) akan combos-samfuri da yawa, misali duka maƙasudin 2-mo. An yi iyaka da `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) a cikin **Saituna → Resilience** . Ba ya jira a kan `quota_exhausted` (kulle har zuwa tsakar dare) ko dalilan auth/not-found. Tare da saitin `comboTimeoutMs`, jiran da ba zai iya gamawa ba kafin wannan wa'adin ba zai fara ba (#18998): haɗin haɗin yana amsawa lokaci ɗaya tare da amsawar ƙarshensa maimakon `COMBO_TIMEOUT` 504.

Haɗin kai zai iya ficewa tare da `config.comboCooldownWaitEnabled: false`. `false` na zahiri ne kawai ke hana waɗannan jiragerun haɗin gwiwa (bayan aika sanyi da aika circuit-open/model-lock kafin a aika) da tsawaita bene na lokacin-kasafin kuɗi. Bace ko `true` yana kiyaye manufofin duniya; `true` ba zai iya kunna jiran naƙasasshen duniya ba. `targetTimeoutMs` bayyananne har yanzu yana nasara. Wannan ficewar ba zai canza keɓantaccen ɗan-bakin-bakin-bakin juya-filin jiran aika jira.

Ƙofar guda ɗaya tana rufe akwati da aka riga aka aika (#16319): lokacin da aka tsallake duk wani abin da aka haɗa da haɗuwa kafin a yi wani ƙoƙari saboda samfurinsa yana zaune a cikin gajeren kullewa na wucin gadi, hanyar sifirin ƙoƙari na jiran kullewa a ƙarƙashin rufi guda ɗaya kuma a sake aikawa, maimakon amsa `503 ALL_TARGETS_SKIPPED` maras kyau. Lokacin da ba a ba da izinin jira ba (rufi, ƙoƙari ko ƙarancin kasafin kuɗi, ko fasalin a kashe), haɓaka martanin tasha zuwa `429 rate_limit_error` ɗauke da `retry_after` / `reset_at` daga farkon ƙarshen kullewa na wucin gadi; ƙididdiga, auth da makullin da ba a samo su ba suna kiyaye alamar-kasa 503.

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

## 5. Sarrafa Karɓar Jerin Jiran Buƙatu (v3.8.49 · issue #6593)

**Fanni**: jerin jiran takaita yawan kira na gida ga kowace mai samarwa+haɗi (`open-sse/services/rateLimitManager.ts`, wanda aka gina shi bisa Bottleneck), mataki ɗaya ƙarƙashin hanyoyin uku da ke sama.

**`maxWaitMs` yana sa iyaka kan jiran jerin gwiwa; `executionMaxWaitMs` yana sa iyaka kan aiwatarwa.**
An raba su biyun gangan, kuma ɗayan ba ya ciyar da ɗayan.

`resilienceSettings.requestQueue.maxWaitMs` shine **kasafin jiran jerin gwiwa**: ya ƙunshi jiran samun wuri a wajen mai samarwa sannan zama a cikin QUEUED, kuma ana share mai ƙidaya lokutansa da zarar aikin ya bar QUEUED ya fara aiwatarwa (`rateLimitManager.ts`, `wrappedFn`). Buƙata da ta wuce shi ba ta taba isa ga upstream. Tsohuwar dabi'a 30000ms, wadda `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` ke samarwa a `src/lib/resilience/settings.ts` kuma `tests/unit/ratelimit-admission-control-6593.test.ts` ya kulle ta, don haka canja ta zai jayar da wannan gwajin maimakon barin wannan sakin layin ya zama tsoho a shiru.

`resilienceSettings.requestQueue.executionMaxWaitMs` shine abin da Bottleneck ke karɓa a matsayin `expiration` na aikin, wanda mai ƙidaya lokutansa yana farawa ne kawai bayan tura aiki. Shi tsaron baya ne ga masu aiwatarwa waɗanda ba su da ƙarewar lokacin upstream nasu, kuma ana ɗaga shi zuwa ƙarewar lokacin fara-fetch na mai aiwatarwar idan wancan ya fi tsawo, don haka ba zai iya yanke amsa mai lafiya da ke kan hanya ba. Tsohuwar dabi'a 600000ms (minti 10).

Ciyar da kasafin jerin gwiwa cikin `expiration` shi ne ke kashe ƙofofin da ba su da ci gaba (non-incremental) a tsakiyar aiki a da — suna gudana na mintuna bisa doka gabanin farkon bytes — kuma shi ne dalilin da yasa expiration ke bayyana a matsayin `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) yayin da kasafin jerin gwiwa ke ɗauke da lambar ƙarewar lokacin jerin gwiwa. Za a iya maye gurbin ɗayan ta `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ko dashboard (**Settings → Resilience**). Ana matsa dukansu zuwa 1ms–24h lokacin daidaitawa.

**Fifiko, ga dukansu:** canjin muhalli (env var) yana samar da _tsohuwar dabi'a_ kawai. Ƙimar da aka adana a `resilienceSettings.requestQueue` (dashboard / API patch, an adana ta a `key_value`) tana rinɗaya shi, kuma `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` na kowane haɗi yana rinɗaya wancan. Don haka saita canjin muhalli a kan tura (deployment) wanda ya riga ya da ƙima da aka adana ba ya canza komai — a maimakon haka, a share ko a sabunta saitin da aka adana.

Ana iyakance zama a jerin gwiwa da `maxWaitMs`; `maxQueueDepth` da ke ƙasa yana iyakance yawan masu kira da za a iya sanya a jerin gwiwa a lokaci guda.

**Maimaitawa da jikin amsa ya bayyana: saita bugawa vs kullewa.** Jikin 429 na iya ambaton jiransa kansa (Gemini `RetryInfo.retryDelay`, rubutun "retry after Ns"), wanda `updateFromResponseBody` ke karantawa. Jira da ta dace da `maxWaitMs` na haɗin ita ce saita bugawa: mai takaitawa yana fasa tafkinsa na tsawon wannan lokaci kuma ana tura kiran da ke jerin gwiwa idan ya sake cika. Jira da ta fi `maxWaitMs` ba abu ce da jerin gwiwa zai iya jimrewa ba — Gemini yana amsa kuota ta yau da kullum da ta ƙare da `retryDelay: "86399s"`. `Retry-After` da aka watsa a kan 429 ɗin da aka sake gina (#16528) ya riga ya sa injin fallback ya kulle samfurin na wannan taga lokaci, amma dakatar da mai takaitawa saboda shi ma zai har yanzu dakatar da duk wata kira da ta kai wa maɓallin da wuri (bayan sake saita resilience, misali) na dukan `maxWaitMs`. Idan irin wannan jira ta zo daga cikakken bayanin Google `RetryInfo` mai nau'i (asalin `google_rpc_retry_info`) kuma an riga an ƙuntata mai takaita maɓallin zuwa samfurin (duba `getLimiterKey`), 429 ɗin ya zama kullewar samfuri a kan wannan haɗin a maimakon haka (`lockModelForLongBodyRetry` a `open-sse/services/rateLimitManager/bodyRetryPause.ts`, an sanya mata iyakar awa 24), kuma ana barin mai takaitawa ba a dakatar da shi ba. Zaɓin asusu yana tsallakewa saboda wannan kullewar ta `isModelLocked()`, haka ma ƙofar combo kafin tura aiki take yi ga manufofin da aka ɗaura wa haɗin. A antigravity, wanda mai takaitawarsa ke ne ga kowane iyalin kuota, kullewar tana kan ainihin samfurin, kamar sauran kullewar kuotarsa. Ana kulle sunan da abokin ciniki ya nema ma idan laƙabi (alias) ya warware shi zuwa wannan samfurin, domin waɗancan binciken suna amfani da sunan da aka nema; ana kulle shi daidai (`lockExactModel`), don haka laƙabin da ya ƙetare iyalin kuota na antigravity ko fannin codex ba ya taba kulle nasa. Alama a rubuce kawai, `retryDelay` mara nau'i, ko mai takaitawa da dukan haɗin ke raba tare suna kiyaye dakatarwar. Idan mai takaitawa da hanyar 429 ta sake gina kawai ya dakatar, ana mayar da mai kira wanda sauran lokacinsa na jerin gwiwa ke ƙarewa kafin dakatarwar nan take da lambar ƙarewar lokacin jerin gwiwa (`checkLimiterPause`) maimakon jiran wannan lokaci ya ƙare; an tabbatar da ƙarewar da aka rubuta kafin a gina mai takaitawa, inda Bottleneck ke fara agogon wartsakewarsa, kuma duk wani canji na gaba ga tafkin yana mantawa da ita. `tests/unit/rate-limit-long-body-retry-lockout.test.ts` da `tests/unit/rate-limit-body-retry-pause.test.ts` ne ke rufe wannan.

**`maxQueueDepth` — iyakar karɓa ta zaɓi (sabuwa).** `resilienceSettings.requestQueue.maxQueueDepth`
yana iyakance yawan buƙatun da za su iya zama a jerin gwiwa (ba a tura su ba tukuna) ga mai samarwa+haɗi ɗaya a lokaci guda. Idan jerin gwiwa ya riga ya ɗauke da buƙatu `maxQueueDepth`, ana ƙin sabuwar buƙata cikin sauri da kuskure mai nau'i
`code: "RATE_LIMIT_QUEUE_FULL"` **kafin** ta taɓa isa `limiter.schedule()`
— don haka ƙin karɓar tana da rahusa kuma tana faruwa gabanin duk wani aikin matsa prompt / fassara na gaba don wannan buƙata. Tsohuwar dabi'a `0` =
an kashe, wanda ke kiyaye halin jerin gwiwa mara iyaka na yanzu; iyaka 0–100000.
A maye gurbinsa ta `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ko
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Binciken karɓar kanta aiki ne mai tsafta (pure function)
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) don
haka ana iya gwada shi ta unit test ba tare da ainihin mai takaitawa na Bottleneck ba.

> RFC da ya buɗe #6593 ya kuma gabatar da tutar `bypassCompressionOnRateLimit`.
> Pipeline na `open-sse/services/compression/` na wannan repo shi ne matse
> prompt/context akan buƙatar LLM mai fita (`chatCore.ts`, kusa da toshewar
> `resolveCompressionSettings`/`selectCompressionStrategy`), ba matse amsar
> HTTP akan jikin 429 da aka gina ba — babu hanyar code da ta dace da tutar
> bypass ta zahiri. Wannan matakin matse-prompt kuma a yanzu yana gudana
> _kafin_ `withRateLimit()` a cikin pipeline na buƙata, don haka sake tsarawa
> don tsallake shi a lokacin ƙin buƙata saboda layi ya cika canji ne dabam,
> mafi girma fiye da fagen wannan batu; an yi da gangan **kada** a aiwatar da
> shi a nan kuma an bar shi azaman aikin da za a bi (follow-up) idan fa'idar
> rage amfani da CPU ta cancanci haɗarin sake tsarawa.

### Kariyar Tsaro ta Kai-Aiwatar (Auto-Enable) ta Rate-Limit & Kariyar Haɗi (`rateLimitProtection`)

**Kariyar tsaro ta kai-aiwatar** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, tsohuwa `true`):
A matsayin tsohuwa, OmniRoute yana aiwatar da kariyar layi na rate-limit kai tsaye ga duk haɗin masu samar da API-key masu aiki (`getProviderCategory(provider) === "apikey"`). Wannan yana tabbatar da cewa buƙatun da ke shiga ga maɓallan API na upstream masu sensitiwa ga rate ana sanya su a layi kuma ana takaita su ta Bottleneck maimakon su fashe zuwa kurakuran 429 na upstream. Ana iya yiwa kariyar tsaron watsi (override) ta hanyar canjin muhalli `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` yana kashewa, `true`/`1`/`on` yana tilasta kunna), wanda yana fi karfin saitin dashboard da aka ajiye (**Saituna → Juriya** / `PATCH /api/resilience`).

**Ma'anar `rateLimitProtection` na kowane haɗi:**
Ana bin diddigar kariyar rate-limit na kowane haɗi ta hanyar filin boolean `rateLimitProtection` akan haɗin masu samarwa (ana ajiye shi azaman `rate_limit_protection` a cikin SQLite):

- **Kunna sarari (`rateLimitProtection === true`)**: An kunna kariyar rate-limit sarari ga wannan haɗin, ba tare da la'akari da nau'in mai samarwa ba ko ko an kunna kariyar tsaro ta kai-aiwatar.
- **Kashe sarari (`rateLimitProtection === false`)**: Yana kashe kariyar sarari, amma **ba** ya fitar da haɗin API-key mai aiki daga kariyar tsaro ta kai-aiwatar ta duniya. A cikin `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` da `undefined` suna daidai: kawai ana ɗaukar `rateLimitProtection === true` azaman override na sarari. Idan `rateLimitProtection` `false` ne (ko ba a saita shi ba), haɗin API-key mai aiki har yanzu yana dacewa da shararren kai-aiwatar kuma yana ci gaba da kasancewa a ƙarƙashin kariyar rate-limit.
- **Babu ficewa ta kowane haɗi**: Mai aiki ba zai iya nuna a yanzu ba cewa "wannan guda ɗaya haɗin API-key mai aiki dole ya gudana ba tare da kariyar layi na rate-limit" yayin da yake riƙe da kai-aiwatar aiki ga wasu. Don gudanar da haɗin API-key gaba ɗaya ba tare da layin rate-limit ba, dole ne a kashe kariyar tsaron gaba ɗaya (`RATE_LIMIT_AUTO_ENABLE=false` ko `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Hanyoyin rubutu da ake goyon baya:**

- **`POST /api/rate-limits`**: Hanyar rubutu ta gudanarwa da ake goyon baya don canza `rateLimitProtection` na haɗi (`{ connectionId: string, enabled: boolean }`). Kiran wannan da `enabled: true` yana kunna kariyar sarari; kiran wannan da `enabled: false` yana cire kariyar sarari (ko da yake haɗin API-key masu aiki suna ci gaba da kasancewa a ƙarƙashin kariyar tsaro ta duniya idan kai-aiwatar yana kunne).
- **`PUT /api/providers/[id]`**: Da gangan **ba** ya karɓa ko juya `rateLimitProtection` (#11278). Sabunta metadata na haɗin mai samarwa ta `PUT /api/providers/[id]` ba zai taba canza yanayin kariyar rate-limit da aka ajiye ba.

---

## 6. Slow-stream watchdog kayan aiki (#9709)

Zaɓaɓɓen gadin `resilienceSettings.streamRecovery.throughputWatchdog` yana gano wani sama wanda har yanzu yana aika gungu amma yana samar da fitarwar mataimaka a ƙasa da daidaita ƙimar fitarwa mai amfani. Ya bambanta da gangan daga lokacin aiki mara amfani: bugun zuciya da sake saita metadata ba mai ƙidayar lokaci ba kuma ba a ƙidaya matsayin ci gaba. Hakanan ya bambanta da ƙayyadaddun ƙayyadaddun yunƙurin ƙarshe (#9153), wanda ya kasance cikakken rufin aminci ba tare da la'akari da ingancin fitarwa ba.

Mai sa ido yana buƙatar lokacin dumi tare da cikakkiyar taga mai jujjuyawa kafin ta iya zubar da ciki. Yana ƙidaya deltas na rubutu daga Cikakkun Taɗi da Amsoshi abubuwan fitarwa API (wakilin UTF-8 byte mai ra'ayin mazan jiya), yayi watsi da amfani-kawai da abubuwan da ba komai ba, kuma yana dakatar da hukunci yayin kiran kayan aiki ko abubuwan tunani suna cikin jirgi. An kashe shi ta tsohuwa kuma ana iya kunna shi tare da `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (wannan darajar env kawai tsaba tsoho — da aka ajiye `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean yayi nasara; duba bayanin gaban env-vs-dashboard a saman wannan jagorar); taga, dumama, mafi ƙarancin ƙima, da mafi ƙarancin abin da za a iya aunawa ana ɗaure su ta hanyar daidaita saiti na al'ada.

Lokacin da aka kunna, ana amfani da zubar da ciki kawai ga ƙoƙarin sama mai aiki. Kafin kowane bayyani-abokin ciniki, hanyar dawo da wuri ɗaya na iya sake buɗe ƙoƙarin. Bayan aikatawa, ba a sake kunna rafi a makance; kwangilar ci gaba na tsakiyar rafi mai aminci ne kawai zai iya dinka kari. Ƙarshe ya kasance harbi ɗaya, don haka lissafin amfani da sakin semaphore ba a kwafin su ba.

---

## 7. Sake Bayyana Matsayin Upstream (kurakuran quota da aka bayyana ba daidai ba)

**Iyakar aiki:** gateway ɗin upstream guda ɗaya wanda ke bayar da rahoton ƙarancin quota na ɗan lokaci da matsayin HTTP da ba daidai ba.

**Manufa:** gyara matsayin da ke ruɗarwa KAFIN rarrabawa, domin masu amfani na gaba (injinin fallback, tattara combo, da amsar da ke fuskantar abokin ciniki) su ga ainihin yanayin gazawar da za a iya sake gwadawa.

Wasu gateways suna nuna ƙarancin quota na ɗan lokaci da matsayin HTTP
wanda ba za a sake gwadawa ba. `agentrouter.org` yana mayar da `403` (wani
lokaci `400`) tare da jikin saƙo na Sinanci
(`用户额度不足` / `额度不足`) maimakon daidaitaccen `429`. Abokan ciniki kamar Claude
Code suna ɗaukar `403` a matsayin na dindindin su katse zaman, kuma ba tare da
gyara ba injinin fallback zai rarraba shi a matsayin `AUTH_ERROR` maimakon
aukar shi a matsayin lamarin quota.

**Aiwatarwa:**

- Rajista da matcher: `open-sse/config/upstreamStatusRestatement.ts` — jerin
  dokoki na kowane provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), waɗanda ake daidaita su ta
  `applyStatusRestatement()`.
- Wurin kira: toshe `providerFailure:` a cikin `open-sse/handlers/chatCore.ts`
  (kusa da layi na 3654), nan take bayan `parseUpstreamError()` ya fassara
  amsar upstream mai matsayin HTTP na kuskure (`!providerResponse.ok`), kuma
  kafin a fara kowane rarrabawa, domin duk masu amfani na gaba su ga matsayin
  da aka gyara. Kurakuran da aka saka cikin rafin SSE na `200` suna bin wata
  hanya dabam ta fassarar rafi daga baya kuma **ba** wannan hook ɗin ke rufe su
  a yau ba — sanannen iyakancewa ne, ba a buƙace shi ba tukuna don misstatus na
  agentrouter (wanda ke bayyana a matsayin matsayin HTTP na kuskure).
- Cancantar sake gwadawa: `429` yana cikin `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), saboda haka kuskuren da
  aka sake bayyana yana ɗauke da ainihin lokacin jira maimakon ya bayyana a
  matsayin `403` matacce.
- `60s` na ƙirƙira na `defaultRetryAfterMs`
  (`upstreamStatusRestatement.ts`) shi ne kawai abin da amsar da aka sake
  bayyana ke gaya wa **abokin ciniki**; ba shi ne tsawon lokacin sanyaya/kullewa
  na cikin gida na haɗin ba — wannan ana sarrafa shi daban ta hanyar tsarin da
  yake kula da kuskuren da aka sake bayyana (Connection Cooldown mai ƙara
  koma-baya, §2, tare da tushen `3s` ga providers masu API-key; ko Model
  Lockout, §3, ga providers masu quota na kowane samfurin kamar agentrouter).
  Router na iya zama cikin yanayin sake gwadawa a cikin gida kafin taga ta
  `60s` da yake sanar da abokin ciniki — wannan gibi ne da aka tsara, ba kuskure ba.

Ba a taɓa sake bayyana kurakuran dindindin ba
(`无权访问模型` — ba a ba da damar shiga wannan samfurin ba) : `excludeMarkers`
yana soke dokar ko da `textMarkers` sun dace, saboda haka kuskuren yana riƙe
da matsayinsa na asali kuma babu abin da zai sake gwada shi har abada. Dokar
rarrabawar provider da ta dace
(`agentrouter-model-access-denied` a cikin `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, tare da ayyana tushen sanyaya na
`6h`) `checkFallbackError` (`open-sse/services/accountFallback.ts`)
yana duba ta _kafin_ dawowar wuri na farko na rukunin apikey na
`FORBIDDEN`, bisa sharadin `honorsRuleLockScope(provider)` (#10334 — a halin
yanzu agentrouter kaɗai ne ke amfani da ita ta hanyar jerin izini na
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` a
`providerErrorRules.ts`). Sanyayar `6h` da dokar ta ayyana tana wucewa a matsayin
`fallbackResult.baseCooldownMs`, amma har yanzu tana shiga tsohuwar hanyar
kullewa ta kowane samfurin quota
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, wadda #10334 bai canza ba sai tushen lokacin
sanyaya): ana rage ta zuwa iyakar `mlSettings.maxCooldownMs` na mai gudanarwa
(tsoho `1_800_000ms` / mintuna 30), kamar kowace irin kullewar samfurin,
kuma _dalilin kullewar da aka adana_ yana nan a matsayin `"forbidden"` da aka
rubuta kai tsaye a da, ba `"auth_error"` na dokar ba — tsawon lokacin sanyaya
kawai ake girmamawa daga farko zuwa ƙarshe, ba kalmar dalili ba. Haɗin kansa
yana ci gaba da aiki; samfurai ’yan’uwa da ke kan wannan haɗin ba su shafa ba.

Kurakuran quota da aka sake bayyana (`额度不足`) suna isa ga dokar provider a
yanayin samarwa
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ba ta da ayyanannen lokacin sanyaya nata — tsohon koma-baya da
aka auna na layin ajiyar bayanai ne yake aiki). Tun daga #10334, `scope` a kan
`ProviderErrorRuleMatch` ANA amfani da shi daga farko zuwa ƙarshe, amma **kawai**
ga providers da ke cikin jerin izini na `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — a yau `"agentrouter"` kaɗai ne, ta hanyar
`honorsRuleLockScope()` ake sharɗanta shi). Ga kowane provider, `scope` yana
ci gaba da zama bayanin ƙarin bayani, daidai kamar yadda yake kafin #10334.
`checkFallbackError` yana fito da scope na dokar da aka dace a matsayin
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) shi ne tsaron haɗin gwiwa da ke tabbatar da cewa
`ruleScope` ya dace da amfani da shi a matsayin sigina mai aiki a faɗin haɗi
kuma mai iya farfaɗowa da kansa (scope `"connection"`, reason
`quota_exhausted`, ba `permanent` ba, ba `creditsExhausted` ba — kariya ce
daga yiwuwar nan gaba a haɗa scope `"connection"` da yanayin asusu na
dindindin). Masu amfani biyu ne ke kiran sa:

- **Dawwamar bayanai** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  maimakon ya shiga reshen kullewar **kowane samfurin** na mai bada passthrough
  (`agentrouter` yana da `passthroughModels: true` → `hasPerModelQuota()`
  yana mayar da `true`), yana amfani da **dakatarwar haɗi ta ɗan lokaci** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ba wani matsayi na ƙarshe ba
  (`credits_exhausted`/`banned`/`expired`) — ta yadda haɗin zai dawo da kansa
  da zarar lokacin dakatarwar ya ƙare, maimakon a buƙaci sake saita bayanan
  tantancewa da hannu.
  Ana tsallake wannan ga haɗin da ke da `disableCooling: true` (#2997):
  wannan zaɓin ya koma kai tsaye zuwa kullewar kowane samfurin maimakon haka
  (wannan yarjejeniyar ciniki ce da aka rubuta — duba sharhin lambar da ke
  sama da reshen).
- **Hanyar haɗa manufa a cikin buƙata ɗaya** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): wannan kariyar tana sanya
  haɗin cikin saitin ƙwaƙwalwar wucin gadi na `exhaustedConnections`, wanda aka
  tsara da maɓallin `${provider}:${connectionId}`. Wannan yana tsallake sauran
  manufar SAME-REQUEST ne kawai idan ita kanta tana ɗauke da ainihin
  `connectionId` ɗin nan a kan nata abin manufa
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` kafin binciken `exhaustedConnections`) — haɗin jerin samfurai
  na yau da kullum, inda manufofin ’yan’uwa ba su ɗauke da `connectionId` da
  aka kafe na kansu ba kuma ana warware ɗaya ne kawai a kowane dispatch daga
  kan taken `X-OmniRoute-Selected-Connection-Id` na amsar, ba ya taɓa wannan
  daidaitawar maɓalli. A wannan yanayi na gama-gari, ainihin kariyar da ke hana
  sauran ɓangare sake amfani da asusun da aka gama ƙarfinsa yanzu ba wannan
  Set ba ne — ita ce matakin dawwamar bayanai da ke sama (inda `rateLimitedUntil`
  na haɗin yake a gaba a lokaci) tare da wannan kariyar tana hana ƙara
  `transientRateLimitedProviders` cikin gazawar (duba "Tsarin matakai biyu" da
  sharhin lambar da ke kan reshen
  `isAgentrouterConnectionQuotaScope` a `targetExhaustion.ts`): saboda ba a
  yi wa Set alama ba, tilastaccen izinin `allowRateLimitedConnection` na
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ba ya
  kunna wa sauran sassan mai badawar, don haka ana mutunta matatar
  `rateLimitedUntil` ta zaɓin bayanan tantancewa (`src/sse/services/auth.ts:1238`)
  kamar yadda aka saba, kuma sauran ɓangaren ko dai ya zaɓi wani haɗin
  `agentrouter` da har yanzu ya cancanta ko kuma ya gaza saboda babu bayanan
  tantancewa — ba ya tilasta komawa kan haɗin da wannan reshe ya dakatar yanzu.

### Tsarin matakai biyu: sake bayyana matsayi, sannan rarrabawa

Sake bayyana matsayi (`upstreamStatusRestatement.ts`) da ƙa’idojin rarraba mai
badawa (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) rajista ne daban-daban waɗanda dukkansu ke amfani da
ID na mai badawa da alamomin rubutu a matsayin maɓalli, amma suna aiki a wurare
daban kuma suna da manufofi daban: sake bayyana matsayi yana sake rubuta
matsayin HTTP da wuri a cikin `chatCore.ts`; ƙa’idojin rarrabawa kuma suna
zaɓar `reason` na fallback da kuma kulle `scope`
(`model` / `provider` / `connection`) a cikin `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Ƙa’idojin rarrabawa suna ganin cikakken **rubutun** kuskure ne kawai (wanda ake
buƙata domin daidaita alamomin jiki kamar `额度不足`) ga masu bada da aka jera
a cikin jerin izinin `FULL_TEXT_RULE_PROVIDERS` a
`providerErrorRules.ts` — a yanzu `"agentrouter"` kaɗai ne. Ga kowane sauran
mai bada da ke cikin **kundin ginannun masu bada**, `checkFallbackError` yana
miƙa wa `getProviderErrorRuleMatch` tsarin kuskuren ne kawai
(`{code, type}`), wanda ya isa ga ƙa’idojin da suka dogara da taken HTTP/matsayi/
lambar, amma ba ya ganin alamomin rubutun jikin amsa.
Mai taimako `resolveRuleMatchBody()` ne ke yin wannan zaɓin: cikakken rubutun
kuskure ga masu bada da aka ba su izini, tsarin kuskuren kuwa ga sauran.
Ƙara mai bada **ginanne** zuwa `FULL_TEXT_RULE_PROVIDERS` wani zaɓi ne bayyananne
na kowane mai bada — an samar da shi ne domin hanyar tsoho ga kowane mai bada
da ba ya cikin jerin ta kasance ba tare da wani canjin byte-ba-byte ba.

`scope` na ƙa’ida (`model` / `provider` / `connection`) wani zaɓi ne dabam da
`FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` yana fallasa shi ne kawai a
matsayin `fallbackResult.ruleScope`, kuma masu amfani na ƙasa suna mutunta shi
a matsayin wani abu da ya wuce lakabin bayani ne kawai ga masu bada da ke cikin
jerin izinin `HONORS_RULE_LOCK_SCOPE_PROVIDERS` a wannan fayil ɗin (ta hanyar
`honorsRuleLockScope()` — a yau `"agentrouter"` kaɗai ne). Duba "Kurakuran
quota da aka sake bayyana" a sama domin ganin abin da daidaitawar
`scope: "connection"` ke yi a zahiri da zarar mai bada yana cikin wannan jerin
izinin.

**#11104 — ƙa’idojin da mai aiki ya ayyana suna tsallake jerin izini biyu.** Mai
aiki na iya ayyana ƙa’ida ta mai bada guda a lokacin aiki ta
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) ba tare
da gyara wannan fayil ɗin ba. Kulle ƙa’idar mai aiki a bayan
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — jerin izini da
aka tsara domin kare halayen **tsoffin** ƙa’idojin kundin ginannun masu bada —
zai sa tsarin saitunan ya zama mara amfani ga kowane mai bada sai waɗanda aka
riga aka jera a can, domin ayyana ƙa’idar da kanta zaɓin mai aiki ne bayyananne.
`resolveRuleMatchBody()` da `honorsRuleLockScope()` dukansu suna fara dubawa
`hasOperatorRuleForProvider()`: mai bada da ke da ƙa’idar mai aiki yana samun
danyen rubutun kuskure kuma ana mutunta `scope` ɗin da ya ayyana, ba tare da
la’akari da ko yana cikin ɗaya daga cikin jerin izinin ba.

**Ƙa’idojin da mai aiki ya ayyana** (`OperatorProviderErrorRule`): kowace ƙa’ida
tana da `status` na zaɓi da `match` na zaɓi (ƙaramin ɓangaren rubutu ne da ba
ya kula da manya da ƙananan haruffa a cikin rubutun kuskure, ba RegExp ba, don
haka ba zai iya jawo ReDoS ba), kuma dole ne ta sa aƙalla ɗaya daga cikinsu.
Idan an sa duka biyun, ana haɗa su da AND; filin da aka bari babu komai yana
dacewa da komai, don haka `{match: "insufficient_quota"}` zai dace da kowane
matsayi da ke ɗauke da wannan lambar. Ƙa’idar farko da ta dace ce ake amfani
da ita. `cooldownMs` yana karɓar har zuwa kwanaki 30; jimillar ƙa’idoji ba ta
wuce 50 ba.

**Tsoffin saitunan da ke rufe dukkan lamura** (`settings.providerErrorDefaults`, ana kunna shi da zaɓi, ana saita shi ta
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
inda `cooldownMs` yake daga minti 1 zuwa kwanaki 30. Tsoho yana aiki ne kawai idan babu ƙa’idar operator kuma babu ƙa’idar kundin da aka gina a ciki da ta dace, kuma kawai ga kurakuran 402, 403, 408,
429 da 5xx. Kurakuran tsarin buƙata (400, 404, 409, 413, 422) da kuma
401 marasa ƙarin bayani suna ci gaba da amfani da nasu tsarin sarrafawa. Idan babu bayyanannen
`reason`, ana samo dalilin daga matsayin, kamar yadda `classifyError` ke yi. Bayyana tsoho yana ƙirga a matsayin
ƙa’idar operator ga `hasOperatorRuleForProvider()`, saboda haka ana mutunta `scope` ɗinsa (tsoho
`"connection"`). Lokacin jiran aiki na ainihi na tsoho shi ne mafi tsawo tsakanin
`cooldownMs` ɗinsa da alamar sake gwadawa ta mai samarwa (`Retry-After`,
`x-ratelimit-reset` ko alamar sake saiti a cikin jiki, wato irin alamar da engine
ke mutuntawa idan an kunna saitin connection-cooldown mai suna "use upstream retry hints"),
saboda haka tsoho na iya tsawaita gajeriyar alamar mai samarwa amma ba zai taɓa
rage ainihin lokacin sake saiti ba. Bayyananniyar ƙa’idar operator tana riƙe da ainihin
`cooldownMs` ɗinta. Babu ƙa’ida ko tsoho da zai tsallake
masu kariyar connection-cooldown a `markAccountUnavailable`: ba a taɓa rage
lokacin jiran aiki mai aiki wanda ya fi tsawo ba, kuma ba a taɓa sauya matsayi na ƙarshe ba. Masu gano
rubutu na cikin tsarin da ke gudana tun da wuri a `checkFallbackError` (credits sun ƙare,
iyakar yau da kullum, an kashe account) har yanzu suna da fifiko ga jimlolinsu na musamman.

**Sanannen gibi — `providerRuleRegistry` ba a taɓa tuntuba don HTTP 400 ba.**
Reshen `BAD_REQUEST` na `checkFallbackError` yana rarraba matsayin 400 gaba ɗaya
ta amfani da jerin tsarin nasa (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, da sauransu a `accountFallback.ts`) kuma yana dawowa kafin a kai ga
reshen `configuredRule`/`getProviderErrorRuleMatch` da ke sama.
Ƙa’idar kundin da aka gina a ciki (ko ƙa’idar operator) mai
`status: 400` tana da ingantaccen tsarin rubutu amma ba za ta taɓa aiki ba. Babu wata ƙa’ida da ke nufin 400 a yau,
don haka babu abin da ya shafi samarwa — amma ƙa’idar 400 ta gaba tana buƙatar a fara taɓa wannan
reshe, wanda ya fi girman canji fiye da ƙara ƙa’ida kawai (zai
sake rarraba 400 ga kowane provider da ya riga ya dogara da halayen jerin tsarin)
kuma baya cikin iyakar ƙara ƙa’ida ga provider guda.

### Ƙara sabuwar ƙofar sadarwa da ke bayyana ƙimar quota ba daidai ba

1. Yi rijistar tsararrun ƙa’ida guda ɗaya a
   `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Ka kiyaye `textMarkers`
   na musamman ga provider; kada a taɓa sake amfani da jimlolin Turanci na gama-gari waɗanda ke cin karo da
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Idan ana so, yi rijistar ƙa’idojin rarrabawa a
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) don zaɓar
   madaidaicin iyakar kullewa (`connection` ga quota na duk account, `model` ga kurakuran
   da suka shafi model guda). Wannan matakin yana aiki ne kawai a samarwa ga
   providers waɗanda ƙa’idojinsu ke buƙatar cikakken rubutun kuskure (alamomin jiki): ƙara
   id ɗin provider zuwa `FULL_TEXT_RULE_PROVIDERS` a fayil ɗin nan — in ba haka ba
   `checkFallbackError` yana miƙa wa ƙa’idar kuskuren tsari kawai
   `{code, type}` kuma ƙa’idar rubutun jiki ba za ta taɓa dacewa da zirga-zirgar gaske ba.
   Ƙa’idojin da ke dacewa ne kawai ta `status`/`headers` (kamar na Opencode ko
   Minimax) ba sa buƙatar wannan izini. A wani ɓangaren kuma, idan ƙa’idar ta ayyana
   `scope: "connection"` kuma manufar ita ce ainihin lokacin jiran aiki na duk connection
   tare da tsallake haɗin buƙata ɗaya (ba lakabin bayani kawai ba), ƙara id ɗin provider zuwa
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` a fayil ɗin nan — wannan ne ke sarrafa
   amfani irin na `isAgentrouterConnectionQuotaScope()` a `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) da
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); idan ba a yi hakan ba, `scope`
   har yanzu yana gudana ta `fallbackResult.ruleScope` amma babu abin da ke aiki da shi.
3. Ƙara gwaje-gwajen unit da suka yi kama da
   `tests/unit/upstream-status-restatement.test.ts`
   da `tests/unit/agentrouter-error-rules.test.ts` (ciki har da masu tabbatar da cewa ba na dindindin ba ne / ba `creditsExhausted` ba ne, kuma — idan provider ɗin yana buƙatar jerin izini — gwajin da ke tabbatar da cewa `resolveRuleMatchBody()` yana dawo da cikakken rubutu ne kawai ga wannan provider).

Ba a buƙatar wani canji a `chatCore.ts`, `classifyError`, ko combo.

#### Kulle da aka rarraba bisa egress (#10880)

Ana ɗaukar providers da ke cikin `EGRESS_BUCKETED_LOCK_PROVIDERS` (dangin opencode)
a matsayin upstream da aka rarraba bisa IP (matakin kyauta na opencode ana rarraba shi bisa IP ne, ba
bisa account ba — duba #9611): status-429 da aka rarraba a matsayin
`quota_exhausted`
**ko** `rate_limit_exceeded` yana sanyaya duk connection na dangin da aka ba da izini
wanda sanannen egress IP ɗinsa na ƙarshe ya yi daidai da na connection ɗin da ya gaza, kafin
juyawa ta gwada su
— hakan yana guje wa kiran upstream N-1 da aka riga aka tabbatar za su gaza (tsari iri ɗaya da #10460/#10525).
An haɗa `rate_limit_exceeded` da gangan: a hanyar `markAccountUnavailable`
ƙa’idojin musamman na opencode ba sa dacewa (ba a miƙa headers/body zuwa
`checkFallbackError` ba, kuma opencode ba ya cikin `FULL_TEXT_RULE_PROVIDERS`), saboda haka 429
wanda jikinsa ke ɗauke da rubutun quota na subscription ("monthly usage limit
reached") fallback ɗin rubutun quota ne ke rarraba shi a matsayin
`quota_exhausted`
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; lokacin jiran aiki awa 1)
kafin a kai ga ƙa’idar `status_429` — yayin da 429 marar rubutun quota (iyakar
rate kawai) ƙa’idar `status_429` ke rarraba shi a matsayin `rate_limit_exceeded`
kuma har yanzu yana sanyaya dangin IP ɗin. Ga provider da aka ba da izini, iyakar IP
ta rate alama ɗaya ce da quota da ta ƙare. Iyakokin gaskiya:

- **Mafi kyawun ƙoƙari**: lock ɗin yana warware sanannen `egress_ip` na ƙarshe na connection daga `proxy_logs` (tazarar 24h, a aiki nan take, ba tare da cache ba). Idan cache ɗin sanyi ne (ba a taɓa gwada
  IP ɗin fitarwa ba) ko babu row → har yanzu reshen yana sanyaya connection ɗin da ya gaza (ana rikodin kamar yadda yake a yau), kawai ba a kulle wani connection ɗin ɗan’uwa ba.
- **Ba ya zama na dindindin**: sanyayarwa taga ce ta quota mai sabunta kanta
  (`testStatus: "unavailable"`); ba a taɓa samo wani yanayi na dindindin daga siginar matakin IP ba. Connections masu `disableCooling` suna tsallake reshen gaba ɗaya.
- **An canja faɗin lock ga dangin da aka saka cikin jerin izini**: wannan canjin scope ne, ba inganta sibling kawai ba. opencode mai bayarwa ne na `passthroughModels`, saboda haka kafin wannan reshe, 429 yana haifar da kullewa ta kowane MODEL; yanzu yana haifar da sanyayar connection — har da ma’aikacin da ke tafiyar da connection guda ɗaya ba tare da wani sibling ba. Wannan shi ne faɗin da teburin dokokin opencode ya riga ya ayyana a matsayin daidai (`scope: "connection"`,
  `providerErrorRules.ts`), amma ba a taɓa girmama shi ba saboda opencode ba ya cikin `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Reshen yana rubuta sanyayar connection ɗin da ya gaza da `backoffLevel` da kansa, yana kwaikwayon reshen agentrouter mai scope na connection, sannan ya dawo — ba a taɓa isa ga toshewar kowane model da hanyar gama-gari da ke ƙasa ba.
- **An haɗa Combo**: kamar reshen agentrouter, scope ɗin da gangan yana watsi da ragin `persistUnavailableState`/`isCombo` da mai kiran combo ke yi wa 429. Kullewa ta kowane model ba wani salo mai rauni na wannan scope ba ne; ainihin rukunin da bai dace ba ne: ba ya faɗin komai game da IP ɗin da ya ƙare, saboda haka juyawar combo za ta ci gaba da ƙona kira guda ɗaya tabbatacce zai gaza ga kowane sibling.
- **Tsaron sibling**: ba a taɓa sauya sibling da ya riga ya kasance na ƙarshe (banned/credits_exhausted) ko wanda ya riga ya kasance cikin sanyaya mafi tsawo ba.
- **Jerin izini na musamman**: faɗaɗa `EGRESS_BUCKETED_LOCK_PROVIDERS` shawara ce bayyananna ta mai wannan ɓangaren; babu haɗaɗɗen wiring (pattern #10334/#10419). Query ɗin sibling yana ɗaure da wannan jerin izini ɗin maimakon maimaita shi a matsayin SQL literal, don haka faɗaɗa shi zai ci gaba da kasancewa canjin layi ɗaya.
- **Juyawar IP ɗin fitarwa, a dukkan kwatance**: tagar bincike (24h) ta fi TTL na cache na IP ɗin fitarwa (5 min) faɗi sosai, don haka “IP na ƙarshe da aka sani” tarihi ne, ba halin yanzu ba. Idan proxy na connection ya juya a cikin tagar, lock ɗin na iya **rasa** IP ɗin da aka raba da gaske (IP ɗin da aka rikodin shi ne sabon, wanda bai ƙare ba) — haka kuma yana iya **sanyaya sibling da ya riga ya juya daga** IP ɗin da ya ƙare. Halin na biyu yana jawo wa sibling ɗin tagar sanyaya guda ɗaya; an amince da duka biyun a matsayin iyakokin ƙoƙari mafi kyau na binciken da ya dogara da tarihi.
- **Kuɗi**: bincike guda biyu masu iyaka na `proxy_logs` (ana tace su ta taga ta hanyar `idx_pl_timestamp`), kuma ana yin su ne kawai a yawan faruwar 429. Babu sabon index (migration 134 YAGNI). An auna wannan a kan kwafin DB mai zirga-zirga ta gaske mai matsakaicin girma; instance mai yawan zirga-zirga yana riƙe da adadin rows mafi yawa daidai gwargwado a cikin wannan tagar.

## Sauran Fasalolin Juriya

- **Dabarun tsara hanya 20** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — duba [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Tsara hanya mai lura da reset** (v3.8.0) — tana fifita haɗi bisa lokacin sake saitan quota.
- **Raguwar yanayin background** — an rage `background: true` na Responses API zuwa sync tare da gargaɗi.
- **Gano iyakar kayan aiki ta ƙarfi** — yana janye providers idan an kai wa iyakokin adadin kayan aiki.
- **Madadin gaggawa** — `OMNIROUTE_EMERGENCY_FALLBACK` ne ke sarrafa shi; masu gudanarwa na iya tilasta shi daga shafin Feature Flags ba tare da sake kunna ba.

---

## Warware Kurakurai

- Combo mai nauyi (weighted) tana amsa da `503 all_targets_cooling_down` (an saita `Retry-After`, `diagnostics.excluded` yana lissafa kowace target tare da `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → an saita pool kuma an haɗa ta, kawai an keɓe kowace target saboda mai ƙidayar lokacin juriya; gargaɗin `[COMBO] Weighted selection: every target excluded before dispatch — …` yana ambaton dalilai da sakan da suka rage. `404 no_executable_targets` daga wannan combo yana nufin babu mai ƙidayar lokacin juriya da ya shiga (babu abin aiki, ko kowace account ta kasa binciken samuwa). An gina shi a `open-sse/services/combo/pinRecovery.ts` daga keɓewar da aka tattara a `targetResolution.ts`.
- An tsallake duk maɓallan provider ɗaya → duba duka yanayin mai yanke da'ira KUMA `rateLimitedUntil`/`testStatus` na kowace haɗi.
- An keɓe provider har abada bayan tagar reset → lamba tana karanta `state` kai tsaye maimakon `getStatus()`/`canExecute()`.
- Maɓalli ɗaya ya kasa, sauran ya kamata su yi aiki → fi amfani da cooldown na haɗi maimakon mai yanke da'ira.
- Model ɗaya kawai ya kasa → fi amfani da lockout na model maimakon cooldown na haɗi.
- Yanayin ya kamata ya warke da kansa amma bai yi ba → duba ko akwai timestamp na nan gaba + hanyar karantawa da ke sabunta yanayin da ya ƙare. Yanayin dindindin yana buƙatar canji da hannu.

---

## Yanayin runtime — taƙaitaccen bayani ga agent

> An motsa shi kamar yadda yake daga `AGENTS.md` → "Resilience Runtime State" (PR #12743) domin jagorar agent
> ta kasance ƙasa da kasafin context na 40k. Wannan shi ne ra'ayin da aka taƙaita wa agent na
> sassan da ke sama; sassan da aka lamba su ne cikakken bayani.

OmniRoute yana da hanyoyi uku masu alaƙa amma daban-daban na magance gazawar wucin gadi. Riƙe
fagen kowanne a daban lokacin warware halin tsara hanya. Duba
[zane-zanen juriya na matakai 3](../diagrams/exported/resilience-3layers.svg)
(tushe: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
don taswira da za a fahimta da wuri.

### Mai Yanke Da'ira na Provider (Provider Circuit Breaker)

**Fage**: dukan provider, misali `glm`, `openai`, `anthropic`.

**Manufa**: dakatar da aika zirga-zirga zuwa provider da ke ci gaba da gazawa a matakin
upstream/sabis, domin provider ɗaya mara lafiya kada ya jinkirtar da kowace buƙata.

**Aiwatarwa**:

- Babban class: `src/shared/utils/circuitBreaker.ts`
- Haɗin ƙofa/aiwatarwa na chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API na yanayin runtime: `src/app/api/monitoring/health/route.ts`
- Abubuwan rufewa da ake amfani da su tare: `open-sse/services/accountFallback.ts`
- Teburin yanayin da aka adana: `domain_circuit_breakers`

**Yanayi** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: ana ƙyale zirga-zirga na yau da kullum.
- `DEGRADED`: yankin gargaɗi na farko — gazawu sun wuce matakin raguwa amma ba su kai
  matakin mai yanke da'ira ba tukuna; zirga-zirga na ci gaba da gudana, dashboards na nuna
  gargaɗin. Gwajin haɗi da ya yi nasara ko tagar shiru ba tare da sabuwar gazawa ba zai
  mayar da shi `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` yana da tagar).
- `OPEN`: an toshe provider na wucin gadi; masu kira na samun amsar provider-circuit-open
  ko kuma tsara hanyar combo tana tsallakawa zuwa wani target.
- `HALF_OPEN`: lokacin jira na reset ya wuce; ƙyale buƙatar bincike. Nasara tana rufe
  mai yanke da'ira, gazawa tana buɗe shi kuma.

**Asali** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, ana amfani da shi ta
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` a `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` a `src/sse/handlers/chatHelpers.ts`). Mai yanke da'irar
dukan provider yana aiki bisa `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profile      | yana raguwa a | yana buɗewa a (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------------ | ------------: | ----------------------------------------: | ----------------------------: |
| OAuth        |           `5` |                                       `8` |                         `60s` |
| Maɓallin API |           `7` |                                      `12` |                         `30s` |
| Na gida      |    (an fitar) |                                       `2` |                         `15s` |

`PROVIDER_PROFILES` kuma yana ayyana `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (minti 15/30/5) da `providerCooldownMs` (minti 5/10/1): waɗannan su ne ke
tafiyar da **ƙofar tagar Provider Cooldown ta duniya wadda ake zaɓi (opt-in)** (`PROVIDER_COOLDOWN_ENABLED`, a asali
a kashe) — ana ƙidaya shigar matakin provider a `open-sse/services/providerCooldownTracker.ts` a matsayin
tana sanyaya ne kawai bayan gazawu `providerFailureThreshold` a cikin `providerFailureWindowMs`, sannan
tana sanyaya har na `providerCooldownMs`. Waɗannan BA ƙimomin mai yanke da'ira mai rai ba
ne — kada ka daidaita su kana sa ran halin mai yanke da'ira. Ana iya tilasta kowane asali ta
masu canjin muhalli `OMNIROUTE_PROVIDER_BREAKER_*` da `OMNIROUTE_CIRCUIT_BREAKER_*`;
teburin bayanin da ya dace da runtime yana cikin `docs/architecture/RESILIENCE_GUIDE.md`.

Yanayin gazawa na matakin provider kawai ya kamata ya kunna mai yanke da'irar provider:

```ts
(408, 500, 502, 503, 504);
```

Kada a kunna mai yanke da'irar dukan provider saboda kurakuran account/maɓalli/model na yau da kullum kamar yawancin
lokutan `401`, `403`, ko `429`. Waɗancan yawanci na cooldown na haɗi ko lockout na model
ne. `403` na provider na maɓallin API na gaba ɗaya ya kamata ya iya dawowa sai dai idan an rarraba
shi a matsayin kuskuren provider/account na ƙarshe.

Mai katsewa yana amfani da murmurewar banɗakewa, ba mai ƙidayar lokaci na bango ba. Idan `OPEN` ya ƙare, karatun kamar `getStatus()`, `canExecute()`, da `getRetryAfterMs()` suna sabunta matsayin zuwa `HALF_OPEN`, don haka dashboards da masu gina zaɓaɓɓun haɗe-haɗen combo ba za su ci gaba da fitar da mai samarwa da ya ƙare har abada ba.

### Lokacin Hutawar Haɗin Gwiwa

**Yanki**: haɗin gwiwa/asusu/maƙallin mai samarwa guda ɗaya.

**Dalili**: tsallake maƙalli/asusu mara kyau ɗaya na wucin gadi yayin da ake barin sauran haɗin gwiwa na wannan mai samarwa su ci gaba da bauta wa buƙatun.

**Aiwatarwa**:

- Hanyar rubutawa/sabuntawa: `src/sse/services/auth.ts::markAccountUnavailable()`
- Zaɓen asusu/tacewa: `src/sse/services/auth.ts::getProviderCredentials...`
- Lissafin hutawa: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Saitunan: `src/lib/resilience/settings.ts`

Manyan filayen a kan haɗin gwiwar masu samarwa:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Lokacin zaɓen asusu, ana tsallake haɗin gwiwa yayin:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Hutawa ma na banɗakewa ne: idan `rateLimitedUntil` ya wuce, haɗin gwiwa yana sake samun cancanta. Bayan amfani mai nasara, `clearAccountError()` yana share `testStatus`, `rateLimitedUntil`, filayen kuskure, da `backoffLevel`.

Halin hutawar haɗin gwiwa na tsoho:

- Hutawar tushe ta OAuth: `5s`.
- Hutawar tushe ta API-key: `3s`.
- API-key `429` ya kamata ya fi amfani da alamun sake gwadawa daga sama (`Retry-After`, kanun bayanai na sake saitawa, ko rubutun sake saitawa da za a iya karanta shi) idan suna akwai.
- Maimaitawar gazawuwar da za a iya murmurewa tana amfani da jinkiri mai ƙaruwa ta nuni (exponential backoff):

```ts
baseCooldownMs * 2 ** failureIndex;
```

Kariyar anti-thundering-herd tana hana gazawuwar lokaci guda a kan wannan haɗin gwiwa daga maimaita tsawaita hutawa ko ƙara `backoffLevel` har sau biyu.

Matsayoyin ƙarshe ba hutawa ba ne. `banned`, `expired` (wanda ke zama na ƙarshe ne kawai bayan sake gwadawa N da aka iyakance ta `EXPIRED_RETRY_MAX`), da `credits_exhausted` ana shirin su kasance ba a samun su ba sai an canza bayanan shiga/saitunan ko mai gudanarwa ya sake saita su. Kada a rubuta matsayoyin ƙarshe da matsayin hutawa na wucin gadi.

### Kullewar Samfuri

**Yanki**: mai samarwa + haɗin gwiwa + samfuri.

**Dalili**: guji kashe duka haɗin gwiwa lokacin da samfuri guda ɗaya ne kawai ba a samu ko aka iyakance masa rabo a wannan haɗin gwiwa.

Misalai:

- Masu samar da rabo na kowane-samfuri da ke mayar da `429`.
- Masu samarwa na gida da ke mayar da `404` domin samfuri ɗaya da ba a samu ba.
- Gazawar izinin yanayi/samfuri na wani takamaiman mai samarwa kamar zaɓaɓɓun yanayin Grok.

Kullewar samfuri tana cikin `open-sse/services/accountFallback.ts` kuma tana barin wannan haɗin gwiwa ya ci gaba da bauta wa sauran samfuran.

### Jagorar Gano Kura-kurai

- Idan an tsallake duk maƙallan wani mai samarwa, duba duka matsayin mai katsewar mai samarwa da `rateLimitedUntil`/`testStatus` na kowane haɗin gwiwa.
- Idan wani mai samarwa ya bayyana an fitar da shi har abada bayan tagar sake saitawa, duba ko lambar tana karanta `state` kai tsaye maimakon amfani da `getStatus()`/`canExecute()`.
- Idan maƙallin mai samarwa ɗaya ya gaza amma sauran ya kamata su yi aiki, fi son hutawar haɗin gwiwa a kan mai katsewar mai samarwa.
- Idan samfuri ɗaya ne kawai ya gaza, fi son kullewar samfuri a kan hutawar haɗin gwiwa.
- Idan wani matsayi ya kamata ya murmure da kansa, ya kamata ya kasance da tambarin lokaci na gaba/lokacin sake saitawa da hanyar karantawa da ke sabunta matsayin da ya ƙare. Matsayoyin dindindin suna buƙatar canje-canjen bayanan shiga ko saituna da hannu.

---

## Gane Yatsun TLS & Boye-boye

An rubuta boye-boyen musamman na kowace mai samarwa (JA3/JA4, CCH, ɓoyewa) a daban — duba `docs/security/STEALTH_GUIDE.md` (git; ba a haɗa shi cikin `/docs` ba).

---

## Gwajin juriya (Phase 8 · Block C)

Bayan gwaje-gwajen gida na manufofin juriya, gwaje-gwaje uku suna gwada lokacin gudanarwa a ƙarƙashin ainihin yanayin matsin lamba/gazawa (duka haɗin kai/dare — babu ɗaya da ke toshe PRs):

| Gwaji       | Abin da yake yi                                                                                                                                                                                                                  | Gudu                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Chaos       | Node na fake-upstream yana shigar da ainihin jinkiri/sake saiti/cikar lokaci/503; yana tabbatar da cewa mai yanke zagaye yana buɗewa/murmurewa kuma `checkFallbackError` yana rarraba 503 a matsayin fallback mai iya murmurewa. | `RUN_CHAOS_INT=1 npm run test:chaos`  |
| Heap-growth | Streams kusan 500 ga kowane `createSSEStream` a ƙarƙashin `--expose-gc`; yana gaza idan heap ya girma bisa iyakar (kariyar OOM #3069).                                                                                           | `npm run test:heap`                   |
| k6 soak     | Nauyi mai ɗorewa a kan `/api/monitoring/health`; ƙimar ƙarshe na p95/kuskure.                                                                                                                                                    | `k6 run tests/load/k6-soak.js` (dare) |

Wanda `.github/workflows/nightly-resilience.yml` ke tsarawa (cron + dispatch). A cikin tsohon `test:integration`, chaos da heap suna tsallake kansu (ba tare da `RUN_CHAOS_INT`/`--expose-gc` ba).

---

## Duba Ma

- [Jagorar Gine-gine](./ARCHITECTURE.md) — Tsarin gine-ginen tsari da na ciki
- [Jagorar Mai Amfani](../guides/USER_GUIDE.md) — Masu samarwa, haɗe-haɗe, haɗin CLI
- [Injin Auto-Combo](../routing/AUTO-COMBO.md) — Ƙimar abubuwa 16, fakitin yanayi
