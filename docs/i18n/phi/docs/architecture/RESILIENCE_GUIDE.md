# Resilience Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ay may tatlong natatanging ngunit magkakaugnay na mekanismo ng resilience. Ang bawat isa ay may iba't ibang saklaw at layunin. Panatilihing hiwalay ang mga ito kapag nagde-debug ng gawi sa pagruruta.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Pinagmulan: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-dashboard precedence para sa resilience toggles.** Ang opt-in resilience ay nag-toggle ng seeded mula sa kapaligiran — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — ang nagbibigay lang ng _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Nagpatuloy ang isang boolean sa `resilienceSettings` (Dashboard →** Mga Setting → Resilience** / `PATCH /api/resilience`, na nakaimbak sa `key_value`) ay nanalo sa halaga ng env: pinapanatili ng normalisasyon (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) ang nakaimbak na boolean sa tuwing mayroon. Ang pagtatakda ng naturang env var sa `true` sa isang deployment kung saan na-save na ng dashboard `false` samakatuwid ay walang binabago — i-flip ang toggle in** Mga Setting → Resilience** (o i-clear ang nakaimbak na field) sa halip.

## 1. Circuit Breaker ng Provider

**Saklaw:** buong provider (hal., `glm`, `openai`, `anthropic`).

**Layunin:** ihinto ang pagpapadala ng traffic sa isang provider na paulit-ulit na nabibigo sa antas ng upstream/serbisyo.

**Implementasyon:**

- Pangunahing klase: `src/shared/utils/circuitBreaker.ts`
- Wiring: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status API: `GET /api/monitoring/health`
- Reset API: `POST /api/resilience/reset`
- Mga wrapper: `open-sse/services/accountFallback.ts`
- Talahanayan sa DB: `domain_circuit_breakers`

**Mga estado:**

- `CLOSED` — pinapayagan ang normal na traffic
- `DEGRADED` — pinapayagan pa rin ang traffic, ngunit sinusubaybayan ang mga tumataas na kabiguan ng provider; bumabalik sa `CLOSED` kapag may sapat na tagumpay, sa isang wastong connection test, o matapos ang pinakamahabang pagka-`OPEN` para sa huling uri ng kabiguan (ang halagang `cooldownByKind` nito, kung wala ay `resetTimeout`, × `maxBackoffMultiplier`, hindi bababa sa isang cooldown) nang walang bagong kabiguan
- `OPEN` — pansamantalang naka-block ang provider; nilalaktawan ito ng combo routing
- `HALF_OPEN` — lumipas na ang reset timeout; pinapayagan ang kahilingang probe

**Mga nako-configure na default (`open-sse/config/constants.ts`, nakalantad sa Dashboard → Settings → Resilience):**

| Klase   | Nag-degrade sa | Nagbubukas sa | Reset timeout |
| ------- | -------------- | ------------- | ------------- |
| OAuth   | 5 kabiguan     | 8 kabiguan    | 60s           |
| API-key | 7 kabiguan     | 12 kabiguan   | 30s           |
| Lokal   | hinango        | 2 kabiguan    | 15s           |

Kinokontrol ng `degradationThreshold` kung kailan pumapasok ang isang provider sa `DEGRADED`; kinokontrol ng `failureThreshold` kung kailan ito nagbubukas at nilalaktawan. Ang mga profile ng lokal na provider ay hindi pa nakalantad sa pahina ng Resilience settings.

**Mga trip code:** mga status sa antas-provider lamang na `[408, 500, 502, 503, 504]`. HINDI magti-trip para sa mga error sa antas-account (karamihan ng 401/403/429 — ang mga iyon ay kabilang sa cooldown o lockout).

**Lazy recovery:** kapag nag-expire ang `OPEN`, ang `getStatus()`, `canExecute()`, `getRetryAfterMs()` ay nagre-refresh ng estado patungong `HALF_OPEN`. Ang mga parehong pagbasa (at ang susunod na kabiguan) ay nagbabalik ng lipas nang `DEGRADED` pabalik sa `CLOSED`. Hindi kailangan ng background timer.

---

### Opt-in na global na Provider Cooldown (window gate)

Ang ikaapat, **opt-in** na layer (`PROVIDER_COOLDOWN_ENABLED`, default na **off**) ay nagpapanatili ng memorya sa pagitan ng mga request ng mga nabibigong provider sa
`open-sse/services/providerCooldownTracker.ts`, na kinokonsulta ng combo target
resolution upang ang magkakasunod na combo request ay huminto na sa muling pagdaan sa isang provider na kabibigo lamang. Ang mga entry sa antas-provider ay sumusunod sa window gate ng `PROVIDER_PROFILES`:

| Profile | nagti-trip pagkatapos ng (`providerFailureThreshold`) | sa loob ng (`providerFailureWindowMs`) | nagko-cooldown nang (`providerCooldownMs`) |
| ------- | ----------------------------------------------------: | -------------------------------------: | -----------------------------------------: |
| OAuth   |                                                  `10` |                                `15min` |                                     `5min` |
| API key |                                                  `15` |                                `30min` |                                    `10min` |

Sa ibaba ng threshold, ang provider ay **hindi** itinuturing na nagko-cooldown; ang isang tagumpay ay nag-aalis ng window. Ang mga entry sa antas-connection (`provider:connectionId`) ay nagpapanatili ng exponential na `minRetryCooldownMs → maxRetryCooldownMs` backoff sa halip. Mga override:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Pananggalang sa regression: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown ng Koneksyon

**Saklaw:** nag-iisang provider connection/account/key.

**Layunin:** laktawan ang isang masamang key habang ang ibang mga koneksyon para sa parehong provider ay patuloy na nagsisilbi.

**Pagpapatupad:**

- Markahang hindi magagamit: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pinili: `getProviderCredentials*` sa parehong file
- Cooldown calc: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Mga Setting: `src/lib/resilience/settings.ts`

**Mga field sa bawat koneksyon:**

- `rateLimitedUntil` — timestamp hanggang sa mag-expire ang cooldown
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — exponential backoff counter

**Mga default na cooldown:**

- OAuth base: 5s
- API-key base: 3s
- API-key 429: mas pinipili ang upstream `Retry-After`/reset headers/parseable reset text
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Pagkaantala sa muling pagsubok ng bawat provider.** Ang pahina ng detalye ng provider ay may a** Subukan muli ang pagkaantala** piliin (Auto, 15s hanggang 1h). Nakakatipid ito `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, hanggang `PATCH /api/resilience`). Kapag ang error sa rate-limit ay hindi nagdadala ng upstream retry hint, pinapalitan ng value na iyon ang scaled backoff para sa provider at ni-reset `backoffLevel` sa 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Pangunahin para sa isang error na limitado sa rate, una ang pinakamataas: pahiwatig sa upstream na muling subukan, pagkatapos ay `providerSpecificData.rotationOverrides.rateLimitResetSeconds` sa bawat koneksyon, pagkatapos ay ang pagkaantala sa muling pagsubok ng bawat provider, pagkatapos ay env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, pagkatapos ay ang naka-scale na backoff. Awtomatikong inaalis ang field. Naaapektuhan lamang nito ang dahilan ng limitasyon sa rate, hindi kailanman ang mga estado ng terminal.

**Anti-kulog-herd guard:** pinipigilan ang mga kasabay na pagkabigo mula sa labis na pagpapahaba ng cooldown o dobleng pagtaas `backoffLevel`.

**Concurrency-limit 429s ay hindi umakyat sa backoff ladder.** Ang isang `429` na ang katawan ay nag-uulat ng isang concurrency limit ("masyadong maraming kasabay na mga kahilingan", "concurrency limit", "parallel request limit", GLM `并发数过高`) ay nangangahulugan na ang account ay malusog ngunit abala. ibinabalik ng `checkFallbackError()` ang dahilan `concurrency_limited`: mabigo sa susunod na koneksyon ngayon, palamig ang isang ito para sa isang nakapirming `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) o ang upstream na muling subukang pahiwatig, panatilihing hindi nagbabago `backoffLevel`, at itakda `skipProviderBreaker`. Panalo pa rin ang isang tahasang katawan ng quota, kaya ang katawan na tumutugma din sa pattern ng quota ay mananatiling hatol sa quota. Detection: `looksLikeConcurrencyLimit()` sa `src/shared/utils/classify429.ts`; hatol: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` ( `FailureKind` ng breaker ) ay hindi nagbabago at nagbabasa pa rin `rate_limit` para sa mga katawan na ito.

**Hindi pinapalamig ng mga stall ng content ng stream ang account.** Kapag sumuko ang content-stall watchdog (`open-sse/utils/streamHandler.ts`) sa isang stream na hindi nagpadala ng modelong output sa oras, itinatala `markAccountUnavailable()` ang error sa koneksyon ngunit hindi nagtatakda ng cooldown: ang stall ay kabilang sa kahilingang iyon, kadalasan ay isang mahabang pagliko ng pangangatwiran na wala pang output. Maaaring mag-opt in muli ang mga operator gamit ang `resilienceSettings.streamStallCooldown.enabled` (default `false`).

**Opt-in latency signal para sa pagpili ng `p2c` account.** Itinatala ng bawat ipinadalang pagsubok ang oras-sa-unang-byte at kinalabasan nito sa bawat koneksyon (at bawat koneksyon + model) sa isang in-memory na rolling window: ang huling 20 sample sa loob ng 15 minuto (`open-sse/services/connectionLatencyTracker.ts`, naitala mula `safeLogEvents()` sa `src/sse/handlers/chatHelpers.ts`). Kapag `resilienceSettings.p2cLatency.weight` ay nasa itaas ng `0` (saklaw na 0-20, naka-off ang default `0` = ), `compareP2CConnections()` sa `src/sse/services/auth.ts` ay nagdaragdag ng hanggang `weight` na puntos sa bawat kandidato ng pares. Kalahati nito ay nagmumula sa latency bilang ratio sa mas mabilis na kandidato (dalawang beses nang mabagal ang buong kalahati) at kalahati mula sa rolling error rate. Ang termino ay nalalapat lamang kapag ang parehong kandidato ay may hindi bababa sa 3 sample, kaya ang mga bagong account ay hindi mapaparusahan, at ang kisame nito ay mananatiling mas mababa sa quota-block at quota-exhausted na mga parusa. Ito ay hindi nagdaragdag ng sarili nitong circuit: ang mga nabigong account ay pinangangasiwaan pa rin ng mga layer ng cooldown, lockout at breaker. Itakda ito ng `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**I-restart ng mga reasoning frame ang content-stall na badyet.** Ang isang modelo ng pangangatwiran ay maaaring mag-isip ng ilang minuto bago ang unang nakikitang token nito: Claude ay nag-stream ng mga `thinking_delta` na frame na ang text ng pag-iisip ay maaaring walang laman, at ang Mga Tugon API ay nag-stream ng sunod-sunod na item sa pangangatwiran. Kinikilala ng `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ang mga frame na ito, at i-restart ng watchdog ang badyet nito sa bawat isa sa halip na kanselahin ang pagliko. Hindi pa rin ang mga ito ay output ng modelo, kaya ang isang pagliko na nagtatapos sa pangangatwiran lamang ay iniulat pa rin bilang walang laman, at ang isang pagliko na humihinto sa pangangatwiran at nagpapadala lamang ng mga tibok ng puso ay nagtutulak pa rin sa nagbabantay.

Ang mga binary `reasoningContentEvent` frame ng Kiro na may walang laman na lagda ay nagpapanatili sa aktibidad ng pangangatwiran na ito sa pamamagitan ng tagapagpatupad bilang isang walang laman `reasoning_content` delta. Hindi naipapasa ang lagda. Ang metadata, mga hindi kumpletong frame at mga walang laman na lagda ay hindi nagre-restart ng badyet ng nilalaman; nalalapat pa rin ang independent active-stream timeout at pagkansela ng kliyente (`open-sse/executors/kiro/reasoning.ts`).

**Mga estado ng terminal (NOT cooldowns):**

- `banned` — na itinakda ng banned-keyword / account-ban detection (tingnan ang [BAN_DETECTION](../security/BAN_DETECTION.md) ), at ng tatlong magkakasunod na upstream na pagtanggi sa bawat kahilingan (`request_rejected`, hal Anthropic OAuth 403 "Hindi pinapayagan ang kahilingan" — `open-sse/services/requestRejectedStreak.ts`); ang isang solong pagtanggi ay nagpapalamig lamang sa koneksyon
- `expired` (mga paglipat sa terminal pagkatapos ng bounded na muling subukan — `EXPIRED_RETRY_MAX = 3` na may exponential backoff — para makapag-self-heal ang mga transient OAuth error bago tuluyang ma-deactivate ang account)
- `credits_exhausted`

Magpapatuloy ang mga ito hanggang sa magbago ang mga kredensyal o i-reset ng operator ang mga ito. Huwag i-overwrite ang mga terminal state na may transient cooldown state.

**Tamad na pagbawi:** kapag lumipas na `rateLimitedUntil`, magiging kwalipikadong muli ang koneksyon. Sa matagumpay na paggamit, ki-clear ng `clearAccountError()` ang lahat ng field ng error.

### Claude OAuth wall sa paggamit: lower-priority lane + session-limit reset

**Saklaw:** isang Claude subscription (OAuth) na koneksyon. Ang parehong mga tampok ay** mag-opt-in sa bawat koneksyon** (I-edit ang seksyong → Claude → `lowPriorityMode` / `autoLimitReset` sa `providerSpecificData`, parehong naka-off ang default) at i-mirror `/low-priority` at `/limit-reset` command ng Claude Code (nakuha ang kontrata ng wire mula sa Claude Code 2.1.263).

**Pagpapatupad:**

- Pag-uuri ng tugon ng + ng makina ng estado: `open-sse/services/claudeLowPriority.ts`
- I-reset status/claim client: `open-sse/services/claudeLimitReset.ts`
- Executor hook (header injection + same-account retry): `open-sse/executors/base.ts::execute()`
- Pagtitiyaga sa pag-opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** ang 5 oras na paggamit ng wall — a `429` na ang mga header ay may `anthropic-ratelimit-unified-status: rejected` at, kapag ang account ay karapat-dapat, `anthropic-ratelimit-unified-slow-offer: treatment`. Walang ipinadala bago ang unang pader na 429; isang burst 429 na walang pinag-isang header ay dumadaan sa normal na cooldown path.

**Lower-priority lane** (`lowPriorityMode`):

- Sa dingding 429 tinatanggap ng tagapagpatupad ang alok at agad na muling sinubukan ang** pareho** account sa `anthropic-usage-limit: slow`; mananatiling aktibo ang lane hanggang sa inihayag na `anthropic-ratelimit-unified-reset` (+ 60s grace) at bawat kahilingan sa window na iyon ay nagdadala ng header. Ang naharang na 429 ay hindi umabot `handleChatCore`, kaya ang koneksyon ay** hindi** ilagay sa cooldown at hindi iniikot palayo.
- `anthropic-ratelimit-unified-slow-status` sa mga susunod na tugon: `active` / `not_needed` panatilihin ang lane; `slot_busy` (429) o isang `529` wait ang `anthropic-ratelimit-unified-slow-retry-after` ng server (default na 20s, clamp 5–600s, ± 30% jitter) at subukang muli, na nililimitahan ng `anthropic-ratelimit-unified-slow-max-wait` (default 20 min, clamp 1 min–6 h) — lampas sa dulo ng lane at isang 10 minutong re-cool-accept block. Ang paghihintay ay nililimitahan din ng kung ano ang natitira sa sariling upstream-start timeout ng kahilingan (`resolveFetchStartTimeout`, 10 min bilang default) minus 5 s margin: kung wala ang cap na iyon, ang 20-minutong default na max-wait ay matatapos sa kahilingan at ang tulog ay maa-abort sa kalagitnaan ng paghihintay, na lalabas ng `TimeoutError` sa halip na ang magandang `max_wait` na pagtatapos +.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, isang 5h-window rollover, o `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (na nagtatapos dito bilang `extra_usage` sa anumang status, dahil sumasakop na ngayon sa dingding ang bayad na overage) tapusin ang lane; ang tugon ay dumadaloy sa normal na cooldown path. `budget_exhausted` ay naaalala hanggang sa inihayag na pag-reset ng badyet (≤ 8 araw).
- Gumagana ang wall check pagkatapos ng sariling 400-driven na intra-attempt retries ng executor (pag-edit ng konteksto, thinking/effort clamp, param auto-learn), kaya ang isang wall 429 na lumalabas lamang sa isa sa mga muling pagsubok na iyon ay naharang pa rin sa halip na maabot ang cooldown path.
- Nasa memorya ang estado sa bawat koneksyon (ang pag-restart ay nagkakahalaga ng isang karagdagang pader 429 upang muling tanggapin).

**Pag-reset ng limitasyon sa session** (`autoLimitReset`, sinubukan bago ang lane kapag pareho silang nasa):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` block; kapag `arm: "reset"` at `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` na may `{ "program": "juniper_tide" }` (organisasyon UUID mula sa `providerSpecificData.organizationUUID`, bootstrap fallback).
- `result: reset|not_limited` → ang kahilingan ay muling sinubukan sa buong bilis (walang mabagal na header). `already_used` / `not_offered` memoise `next_available_at` (default isang linggo); anumang pagkabigo ay aatras ng 15 minuto. Ang pag-reset ay isang beses sa isang linggo at binibilang pa rin sa lingguhang limitasyon.

Mga bantay ng regression: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinity ng session (#7274)

**Saklaw:** isang session ng kliyente (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) na naka-pin sa isang koneksyon, para sa** anuman** provider.

**Layunin:** panatilihin ang isang multi-turn agent (Claude Code, aider, custom agents) sa parehong account sa lahat ng kahilingan, na binabawasan ang cross-account context loss at paulit-ulit na cold-start 429s sa mga provider na may katayuan sa bawat account na session.

**Pagpapatupad:**

- TTL resolution: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Pagkuha ng header (generic, anumang provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persisted pin table: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (global TTL sa ms, hindi pinapagana `0` ) — `src/lib/db/settings.ts`. Pinalitan ang pangalan mula sa Codex-only `codexSessionAffinityTtlMs` sa pamamagitan ng migration `124_generic_session_affinity_ttl.sql`, na nagdadala sa anumang dating na-configure Codex TTL bilang bagong default.

Bago ang #7274, nag-hard-bailed `resolveSessionAffinityTtlMs()` sa `0` para sa bawat provider maliban `codex`, kaya walang epekto ang setting TTL (at ang mga header ng session) kahit saan pa kahit na provider-agnostic na ang mekanismo ng pag-pin at pagkuha ng header. Inalis ng pag-aayos ang maagang pagbabalik na iyon; pantay na nalalapat na ngayon ang TTL sa bawat provider kapag naitakda sa buong mundo sa itaas ng `0`.

Ang tatlong session-affinity header ay hindi kailanman ipinapasa upstream — executors bumuo ng kanilang sariling upstream header mula sa simula sa halip na ipasa ang mga header ng kliyente, kaya ito ay mananatiling internal correlation id lamang.

### Mga pagpapaupa ng eksklusibong pinamamahalaang koneksyon sa session

**Saklaw:** ang isang aktibong pinamamahalaang HTTP client/session ay nagmamay-ari ng isang karapat-dapat na koneksyon OmniRoute.

**Layunin:** magbigay ng matibay na eksklusibong pagmamay-ari ng koneksyon para sa mga kliyenteng nangangailangan ng mahigpit na bakod sa pagruruta sa mga kahilingan. Naiiba ito sa session affinity, na isang mahinang continuity preference: ang isang eksklusibong lease ay nagpapatuloy sa lifecycle state sa SQLite, nagpapatupad ng pandaigdigang pagiging aktibong may-ari at aktibong koneksyon, at tinatanggihan ang isang luma na henerasyon bago ang pagpapadala ng provider.

Ang feature ay opt-in sa bawat API key. Ang isang pinamamahalaang key ay dapat na may `lease:exclusive` scope at isang tahasang walang laman na listahan `allowedConnections`. Maaaring gamitin ng sinumang HTTP client ang lifecycle endpoint; walang pangalan ng kliyente, user-agent, provider, OAuth method, o modelo ang kailangan. Ang pag-upa ay nagmamay-ari ng isang koneksyon, hindi isang modelo, kaya ang isang pagbabago ng modelo ay nagpapanatili ng pagbubuklod habang ang koneksyon ay nananatiling karaniwang karapat-dapat. Ang normal na modelo, quota, kalusugan, cooldown, at mga panuntunan sa allowlist ay nananatiling may awtoridad at maaaring ilipat ang parehong henerasyon sa isa pang libreng karapat-dapat na koneksyon.

Ang lifecycle ay `POST /api/v1/session-leases` na may mga JSON action na `acquire`, `renew`, at `release`. Ang mga kahilingan sa pinamamahalaang hinuha ay nagpapakita ng opaque `X-OmniRoute-Lease-Owner` na halaga at eksaktong `X-OmniRoute-Lease-Generation`. Gumagamit ang may-ari `vlo_` na sinusundan ng 43 base64url character; tanging ang SHA-256 hash nito ang nakaimbak. Ang bawat huling dispatch fence ay nagbubuklod din sa napatotohanang API key ID at aktibong koneksyon na ID. Ang mga lease control header ay inaalis mula sa mga log, napanatili na mga snapshot ng kahilingan, at upstream na mga executor header.

Kung ang ordinaryong pagruruta ay may mga karapat-dapat na pinamamahalaang kandidato ngunit ang bawat libreng kandidato ay inookupahan ng isang dayuhang aktibong lease, ibinabalik ng OmniRoute HTTP `429`, lease-capacity-unavailable na code, isang waiting-for-capacity state, at isang bounded `Retry-After` na nagmula sa pinakamaagang nauugnay na expiry. Ang karaniwang walang laman na pagiging karapat-dapat ay hindi pagtatalo sa pag-arkila at pinapanatili ang umiiral na mga semantika ng error sa pagruruta.

Ang mga kaugnay na mekanismo ay nananatiling hiwalay:

- OAuth session occupancy ay proseso-lokal na soft distribution para sa mga OAuth account.
- Ang mga account semaphore ay nagbibigay ng mga permit sa kahilingan-kasabay at nagtatapos kapag nakumpleto ang isang kahilingan.
- Ang mga eksklusibong pinamamahalaang pag-upa ng session ay matibay na pagmamay-ari ng lifecycle na may henerasyong bakod.

---

## 3. Model Lockout

**Saklaw:** tatluhang provider + connection + model.

**Saklaw ng key ayon sa status:** ang status na nag-fail ang nagpapasya kung aling key ang isusulat ng isang lockout (`resolveLockoutScope()` sa `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — isang signal ng quota o entitlement — i-lock ang **pamilya ng quota**:
  para sa codex ang buong saklaw na `codex` / `spark` (bawat modelong `gpt-5*` ng
  connection), para sa ibang mga provider ang `getQuotaScopedModelForProvider()`.
- Ang `404` ay nagla-lock ng bare na modelo (pinaliliit ng `getModelLockKey()` ang `not_found`).
- Anumang ibang status — mga `5xx` transport/server failure at ang sariling synthesized
  `502` ng OmniRoute mula sa validation ng kalidad — nagla-lock lamang sa **eksaktong**
  tuple ng provider/connection/model. Ang isang sirang stream sa isang modelo ay hindi
  ebidensya tungkol sa quota ng account; bago ang panuntunang ito, isang walang-lamang
  response sa `codex/gpt-5.6-luna` ang nag-aalis ng bawat modelong `gpt-5*` ng connection
  na iyon mula sa routing nang 2–30 min (pa-escalate) habang hindi ginalaw ang quota nito.
- Ang explicit na opsyon na `scope` ng caller ang laging nananaig (ang Antigravity ay nagpapasa ng `"exact"`).

**Layunin:** iwasang i-disable ang buong connection kapag isang modelo lang ang hindi available o limitado sa quota.

**Mga halimbawa:**

- Mga per-model quota provider na nagbabalik ng 429
- Mga lokal na provider na nagbabalik ng 404 para sa isang nawawalang modelo
- Mga provider-specific na mode/model permission failure (hal., mga mode ng Grok)

**Implementasyon:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Cooldowns Dashboard (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Inililista ang mga aktibong lockout kasama ang: provider, connection, model, reason, expiresAt. Maaaring manu-manong i-enable muli ng mga operator ang isang modelo mula sa card.

**REST API:**

- `GET /api/resilience/model-cooldowns` — ilista ang mga aktibong lockout
- `DELETE /api/resilience/model-cooldowns` — manu-manong muling pag-enable. Body: `{provider, connection, model}`. Auth: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Isang pahina para sa bawat connection na wala sa routing dahil sa pansamantalang dahilan, sa halip na
buksan ang bawat pahina ng provider. Inililista nito ang mga connection cooldown, model lockout, at mga
terminal na estado, tinatanggal ang mga ito kada connection, para sa isang seleksyon, o para sa lahat
ng connection ng isang provider, at ine-edit ang pinakamadalas i-tune na mga panuntunan ng cooldown:
`streamStallCooldown.enabled` at ang OAuth / API-key `connectionCooldown` na base cooldown at mga maximum
na backoff step (naka-save sa pamamagitan ng `PATCH /api/resilience`). Ang mga terminal na estado
(`banned`, `expired`, `credits_exhausted`) ay nakalista ngunit hindi kailanman tinatanggal dito.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — mga connection na may status, natitirang cooldown,
  backoff level, uri ng huling error, at mga model lockout (walang mga kredensyal)
- `POST /api/resilience/cooldowns` — body na `{connectionIds: string[]}` o
  `{all: true, provider?}`; nagbabalik ng `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI ng mga setting ng Lockout + recovery na success-decay (v3.8.23)

Ang model lockout ay nagmula sa laging-naka-on na hardcoded na behavior patungo sa isang ganap na
nako-configure, opt-in na feature na may sariling settings card at self-healing na daan ng recovery.

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ito ay **naiiba** sa read-only na `ModelCooldownsCard` sa itaas (na naglilista
_lamang_ ng mga aktibong lockout) — ang bagong card ang nagko-_configure ng mga
parameter_. Ang mga default ay nasa `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Setting                 | Default                          | Kahulugan                                                                           |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Master toggle — ang model lockout ay **naka-off bilang default**.                   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Mga upstream status na binibilang bilang model-scoped na failure.                   |
| `baseCooldownMs`        | `120_000` (120 s)                | Panimulang tagal ng lockout para sa unang failure.                                  |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Cap sa na-escalate na cooldown.                                                     |
| `maxBackoffSteps`       | `10`                             | Maximum na mga hakbang ng exponential-backoff escalation.                           |
| `useExponentialBackoff` | `true`                           | Kung ang mga paulit-ulit na failure ay nag-e-escalate ng cooldown nang exponential. |

Ang mga setting ay nagpe-persist sa pamamagitan ng normal na settings store at bina-validate
sa pamamagitan ng resilience settings schema; kinu-clamp ng card ang
`baseCooldownMs`/`maxCooldownMs` (na may `maxCooldownMs ≥ baseCooldownMs`) at ang
`maxBackoffSteps`.

**Recovery na success-decay:** ang recovery ay **hindi** purong pag-expire ng timer. Ang isang
malusog na response ay nagpapababa muli sa failure count ng modelo kaya ang isang modelong
nag-recover sa gitna ng window ay humihinto sa pag-escalate (at nagki-clear) bago pa man
mag-expire ang timer nito. Sa isang matagumpay na combo target, tinatawag ng
`open-sse/services/combo.ts` ang `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), na **nagpapahati** sa nakaimbak na
`failureCount` (`Math.floor(failureCount / 2)`); kapag umabot ito sa `0`, ang lockout
entry ay ganap nang tinatanggal. Ang katambal na `recordModelLockoutFailure()`
ay nag-i-increment ng count (at nag-e-escalate ng cooldown) sa mga failure sa loob ng
escalation window. Ang success-decay na ito ay dagdag sa simpleng pag-expire ng timer —
alinmang daan ay maaaring mag-enable muli ng isang modelo.

**Estado:** ang mga lockout ay nakahawak **in-memory** (mga per-process na `Map` ng
`ModelLockoutEntry` na naka-key sa `provider:connectionId:model`, ang mga exact-scope lock ay
sa `provider:connectionId:exact:model`), hindi naka-persist sa
DB — nawawala ang mga ito sa restart. Ang mga _setting_ ay naka-persist; ang aktibong
_estado_ ng lockout ay ephemeral.

---

## 4. Kontrol sa Concurrent na Quota-Share (v3.8.36)

Ang mga subscription account (GLM, MiniMax, atbp.) ay kadalasang tumatanggap lamang ng humigit-kumulang 1–3 sabay-sabay na request; ang paglampas dito ay nagti-trigger ng mga 429 at cooldown. Lalo itong kritikal sa ilalim ng mga **quota-share** (`qtSd/…`) combo, kung saan ilang API key ang gumagamit ng iisang upstream account. Tatlong layer ang pumipigil na ma-overload ang isang shared account.

### Limitasyon ng concurrency bawat koneksyon (`max_concurrent`)

Maaaring magdeklara ang bawat provider connection ng ceiling na `max_concurrent`
(`provider_connections.max_concurrent`, itinatakda sa connection modal / API / DB).
Iwan itong walang laman para walang limitasyon. Ito ang nag-iisang knob na
nagpapatakbo sa serialization layer sa ibaba — itakda ito sa aktuwal na
concurrency ng account (hal. GLM ~1, MiniMax ~2).

### Mga limitasyon ng concurrency bawat modelo (`modelConcurrency`)

Maaari ring magdeklara ang isang koneksyon ng eksaktong mga ceiling ng concurrency bawat modelo
sa loob ng `rateLimitOverrides` map nito:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Itakda ito sa connection modal (**Rate limit overrides → Per-model
concurrency caps**, isang `model=cap` bawat linya) o gamit ang
`PATCH /api/providers/[id]` na may parehong JSON shape. Mga pangunahing kahulugan:

- **Pangkonek­siyon kumpara sa partikular sa modelo:** Ang `maxConcurrent` ay nananatiling shared
  ceiling para sa buong koneksyon. Kapag parehong naaangkop, parehong gate ang
  kinukuha nang atomiko sa iisang composite gate
  (`global → provider → account → model`); ang aktuwal na gawi ay sumusunod sa
  mas mahigpit na naaangkop na limitasyon.
- **Eksaktong pagtutugma ng model key:** Ang key ay ang model string na ipinapasa sa
  executor matapos ang routing resolution — karaniwan ang bare upstream model id
  (`glm-5`), hindi ang client-side na `provider/model` alias (`zai/glm-5` ay
  hindi tumutugma sa `glm-5`). Ang mga value ay positive-integer na ceiling para
  sa mga sabay-sabay na request.
- **Lokal na pag-queue, walang discovery:** Ang mga sobrang request ay lokal na pumipila ayon sa
  kasalukuyang queue/timeout semantics (mga naka-type na `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` admission error). Hindi nagdi-discover o nanghuhula ang
  OmniRoute ng upstream policy — ipinapatupad nito ang eksaktong mga ceiling na
  kino-configure ng operator. Ang model gate na puno na ay hindi kailanman nagdi-disable
  sa provider at hindi lumilikha ng permanenteng model lockout; nananatiling
  backstop ng error ang upstream 429/cooldown/fallback behavior.
- **Saklaw bawat koneksyon, bawat proseso:** Ang mga cap ay nakabatay sa bawat database connection
  at hinahawakan sa memorya, kaya hindi nagko-coordinate ang dalawang koneksiyong
  gumagamit muli ng parehong upstream API key.
- **Ang hindi pag-configure ay nangangahulugang walang pagbabago:** Ang pag-omit sa map (o pag-iwan
  sa dashboard field na walang laman) ay hindi nagdaragdag ng model gate. Halimbawa
  ng configuration na walang ipinipilit na anumang pangkalahatang limitasyon ng provider:

```text
glm-5=1
glm-4.7=3
```

### Serialization ng request na quota-share

Kapag ang isang quota-share dispatch ay tumutukoy sa koneksiyong nagdeklara ng positibong
`max_concurrent`, ang sabay-sabay na request sa **account** na iyon ay sina-serialize sa pamamagitan ng
per-connection semaphore (key `qsconn:<connectionId>`): ang mga sobrang request ay **naghihintay
sa queue** sa halip na bumaha sa account. Ito ay **fail-open** — ang punô na
queue o timeout ay nagpapatuloy nang walang slot sa halip na kailanman ay tanggihan
ang isang dispatchable request. I-toggle ito sa **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, default
on). Kung walang `max_concurrent` cap, hindi nagbabago ang gawi.

> Ang quota-share routing gate (`selectQuotaShareTarget`, DRR + P2C) mismo ay
> fail-open at nagbabawas lamang ng prayoridad ng isang koneksiyong nasa cap — kapag
> iisa lang ang koneksyon sa pool, hindi ito makakapagpatupad ng hard limit, kaya ang
> semaphore na ito ang aktuwal na kumokontrol sa pagdagsa.

### Retry na isinasaalang-alang ang cooldown ng combo

Para sa bawat combo strategy (kapag naka-enable), ang request na magreresulta sana sa 429
dahil sa isang MAIKLING transient cooldown ay hinihintay muna ito at muling
ipinapadala sa halip na ibalik ang 429 — saklaw nito ang mga TPM/RPM window na
pang-Gemini (~60s retry-after) sa mga multi-model combo, hal. kapag parehong target
ng 2-model combo ang tumama sa per-model rate limit. Nililimitahan ito ng
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) sa **Settings → Resilience**. Hindi ito kailanman naghihintay sa
`quota_exhausted` (naka-lock hanggang hatinggabi) o sa mga dahilan na auth/not-found.

Maaaring mag-opt out ang isang combo gamit ang `config.comboCooldownWaitEnabled: false`. Literal na `false` lamang ang nagdi-disable sa mga shared combo wait na ito (post-dispatch cooldown at pre-dispatch circuit-open/model-lock waits) at sa kanilang wait-budget timeout-floor extension. Ang nawawala o `true` ay nagpapanatili sa global policy; hindi maaaring i-enable ng `true` ang waiting na globally disabled. Ang tahasang `targetTimeoutMs` ay nananatiling mas mataas ang prayoridad. Hindi binabago ng opt-out na ito ang hiwalay na native-Codex turn-pin pre-dispatch wait.

Sinasaklaw din ng parehong gate ang pre-dispatch case (#16319): kapag nilaktawan ang bawat target ng combo bago gumawa ng anumang pagtatangka dahil nasa maikling transient lockout ang modelo nito, naghihintay ang zero-attempt path na matapos ang lock sa ilalim ng parehong mga ceiling at muling nagdi-dispatch, sa halip na magbalik ng hint-less na
`503 ALL_TARGETS_SKIPPED`. Kapag walang pinapahintulutang paghihintay (naabot ang ceiling,
naubos ang attempt o budget, o naka-off ang feature), ang terminal response ay nag-a-upgrade sa
`429 rate_limit_error` na naglalaman ng `retry_after` / `reset_at` mula sa pinakamaagang
transient lock expiry; ang quota, auth at not-found lock ay nananatiling hint-less na 503.

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

## 5. Admission Control ng Request Queue (v3.8.49 · isyu #6593)

**Saklaw**: ang lokal na rate-limit queue na bawat provider+koneksyon (`open-sse/services/rateLimitManager.ts`, na nakabatay sa Bottleneck), isang layer sa ibaba ng tatlong mekanismo sa itaas.

**Ang `maxWaitMs` ang nagtatakda ng hangganan sa paghihintay sa queue; ang `executionMaxWaitMs` ang nagtatakda ng hangganan sa pagpapatupad.** Sinadyang hiwalay ang dalawa, at walang nagpapakain sa isa't isa.

Ang `resilienceSettings.requestQueue.maxWaitMs` ang **badyet sa paghihintay sa queue**: saklaw nito ang paghihintay para sa isang slot ng provider at pagkatapos ay ang pananatiling naka-QUEUE, at nalilinis ang timer nito sa mismong sandaling umalis ang job sa QUEUED at magsimulang magpatakbo (`rateLimitManager.ts`, `wrappedFn`). Ang isang request na lumampas dito ay hindi na aabot sa upstream. Default na 30000ms, mula sa `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` sa `src/lib/resilience/settings.ts` at nakapin ng `tests/unit/ratelimit-admission-control-6593.test.ts`, kaya ang pagbabago dito ay magpapapula sa test na iyon sa halip na pabayaang tahimik na maluma ang talatang ito.

Ang `resilienceSettings.requestQueue.executionMaxWaitMs` ang tinatanggap ng Bottleneck bilang `expiration` ng job, na nagsisimula lang ang timer nito matapos ang dispatch. Ito ay isang backstop para sa mga executor na walang sariling upstream timeout, at itinataas ito sa sariling fetch-start timeout ng executor kapag mas mahaba iyon, kaya hindi nito mapuputol ang isang malusog na in-flight na tugon. Default na 600000ms (10 min).

Ang pagpapasa ng badyet ng queue sa `expiration` ang dating pumapatay sa mga non-incremental na gateway habang nasa gitna ng paglipad — ayon sa disenyo, tumatakbo ang mga ito nang ilang minuto bago ang unang mga byte — at ito ang dahilan kung bakit ang isang expiration ay lumilitaw bilang `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) habang ang badyet ng queue ang may dalang queue-timeout na code. I-override ang alinman sa pamamagitan ng `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) o ng dashboard (**Mga Setting → Resilience**). Parehong naka-clamp sa 1ms–24h kapag na-normalize.

**Precedence, para sa dalawa:** ang env var ay nagbibigay lamang ng _default_. Ang isang halagang naka-persist sa `resilienceSettings.requestQueue` (dashboard / API patch, naka-imbak sa `key_value`) ang nananaig dito, at ang bawat-koneksyong `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ang nananaig roon. Kaya ang pag-set ng env var sa isang deployment na may naka-persist nang halaga ay walang binabago — i-clear o i-update na lang ang naka-persist na setting.

Ang pananatili sa queue ay may hangganang itinakda ng `maxWaitMs`; ang `maxQueueDepth` sa ibaba naman ang nagtatakda ng hangganan kung ilang caller ang maaaring naka-queue nang sabay-sabay.

**Mga retry na nakasaad sa body: pacing kontra lockout.** Ang isang 429 na body ay maaaring magbanggit ng sarili nitong paghihintay (Gemini `RetryInfo.retryDelay`, tekstong "retry after Ns"), na binabasa ng `updateFromResponseBody`. Ang paghihintay na umaayon sa `maxWaitMs` ng koneksyon ay pacing: inuubos ng limiter ang reservoir nito nang ganoon katagal at ang mga naka-queue na tawag ay nagdi-dispatch kapag ito ay napuno muli. Ang paghihintay na mas mahaba sa `maxWaitMs` ay hindi kayang pagtiisan ng queue — sumasagot ang Gemini sa isang naubos na pang-araw-araw na quota gamit ang `retryDelay: "86399s"`. Ang na-relay na `Retry-After` sa muling binuong 429 (#16528) ay nagpapalock na sa fallback engine ng model sa loob ng window na iyon, ngunit ang pag-pause rin sa limiter para dito ay magpapahinto pa rin sa anumang tawag na umaabot sa key nang maaga (halimbawa, matapos ang isang resilience reset) sa buong `maxWaitMs`. Kapag ang ganitong paghihintay ay nagmula sa isang typed na detalye ng Google `RetryInfo` (ang provenance na `google_rpc_retry_info`) at ang limiter ng key ay naka-scope na sa model (tingnan ang `getLimiterKey`), ang 429 ay nagiging model lockout na lang sa koneksyong iyon (`lockModelForLongBodyRetry` sa `open-sse/services/rateLimitManager/bodyRetryPause.ts`, may hangganang 24h), at ang limiter ay hinahayaang hindi naka-pause. Ang pagpili ng account ay lumalaktaw dahil sa lock na iyon sa pamamagitan ng `isModelLocked()`, at ganoon din ang combo pre-dispatch gate para sa mga target na nakapin sa koneksyon. Sa antigravity, na kung saan ang limiter ay bawat quota family, ang lock ay nasa eksaktong model, tulad ng iba nitong quota lock. Ang pangalang hiniling ng client ay nala-lock din kapag ang isang alias ay nag-resolve nito sa model na iyon, dahil ginagamit ng mga pagsusuring iyon ang hiniling na pangalan; ito ay naka-lock nang eksakto (`lockExactModel`), kaya ang isang alias na tumatawid sa isang antigravity quota family o isang codex scope ay hindi kailanman nagla-lock ng sarili nito. Ang isang pahiwatig na nasa prose, isang untyped na `retryDelay`, o isang limiter na pinagsasaluhan ng buong koneksyon ay nagpapanatili ng pause. Kapag ang limiter na kakabuo pa lang ng 429 path ay talagang nag-pause, ang isang caller na ang natitirang oras sa queue ay matatapos bago matapos ang pause ay agad na tinataboy gamit ang queue-timeout na code (`checkLimiterPause`) sa halip na hintaying lumipas ang oras na iyon; ang naitalang katapusan ay naka-angkla bago pa mabuo ang limiter, kung saan sinisimulan ng Bottleneck ang refresh clock nito, at anumang susunod na pagbabago sa reservoir ay nakakalimot dito. Sakop ng `tests/unit/rate-limit-long-body-retry-lockout.test.ts` at `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opt-in na admission cap (bago).** Ang `resilienceSettings.requestQueue.maxQueueDepth` ang nagtatakda ng hangganan kung ilang request ang maaaring naka-queue (hindi pa na-di-dispatch) para sa isang provider+koneksyon nang sabay. Kapag ang queue ay mayroon nang `maxQueueDepth` na request, ang isang bagong request ay agad na tinatanggihan (fast-reject) gamit ang isang typed na error na `code: "RATE_LIMIT_QUEUE_FULL"` **bago** pa man ito umabot sa `limiter.schedule()` — kaya mura ang pagtanggi at nangyayari ito bago ang anumang downstream na gawain sa prompt-compression / translation para sa request na iyon. Default na `0` = naka-disable, na pinapanatili ang kasalukuyang pag-uugali ng walang-hangganang queue; may hangganang 0–100000. I-override sa pamamagitan ng `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) o `resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Ang admission check mismo ay isang purong function (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) kaya maaari itong i-unit-test nang walang tunay na Bottleneck limiter.

> Ang RFC na nagbukas ng #6593 ay nagpanukala rin ng flag na `bypassCompressionOnRateLimit`. Ang pipeline na `open-sse/services/compression/` ng repo na ito ay prompt/context compression sa papalabas na LLM request (`chatCore.ts`, sa paligid ng block na `resolveCompressionSettings`/`selectCompressionStrategy`), hindi HTTP response compression sa mga synthesized na 429 body — walang tumutugmang code path para sa isang literal na bypass flag. Ang prompt-compression step na iyon ay kasalukuyang tumatakbo _bago_ ang `withRateLimit()` sa request pipeline, kaya ang muling pag-aayos ng pagkakasunud-sunod upang laktawan ito sa isang queue-full rejection ay hiwalay at mas malaking pagbabago kaysa sa saklaw ng isyung ito; sinadyang **hindi** ito ipinatupad dito at iniiwan bilang follow-up kung sulit ang natitipid sa CPU laban sa panganib ng muling pag-aayos ng pagkakasunud-sunod.

### Auto-Enable Safety Net ng Rate-Limit at Proteksyon ng Koneksyon (`rateLimitProtection`)

**Safety net ng auto-enable** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, default na `true`):
Sa default, awtomatikong pinagagana ng OmniRoute ang proteksyon ng rate-limit queue para sa lahat ng aktibong API-key provider connection (`getProviderCategory(provider) === "apikey"`). Tinitiyak nito na ang mga papasok na request sa mga rate-sensitive na upstream API key ay nakapila at na-throttle sa pamamagitan ng Bottleneck sa halip na mag-burst patungo sa mga upstream 429 error. Maaaring i-override ang safety net sa pamamagitan ng environment variable na `RATE_LIMIT_AUTO_ENABLE` (ang `false`/`0`/`off` ay nagdi-disable, ang `true`/`1`/`on` ay nagpipilit na i-on), na may prayoridad kaysa sa naka-persist na setting ng dashboard (**Settings → Resilience** / `PATCH /api/resilience`).

**Semantika ng per-connection na `rateLimitProtection`:**
Ang per-connection na proteksyon ng rate-limit ay sinusubaybayan sa pamamagitan ng boolean field na `rateLimitProtection` sa mga provider connection (naka-persist bilang `rate_limit_protection` sa SQLite):

- **Explicit na naka-on (`rateLimitProtection === true`)**: Ang proteksyon ng rate-limit ay tahasang pinagana para sa koneksyong ito, anuman ang kategorya ng provider o kung naka-on man ang auto-enable safety net.
- **Explicit na naka-off (`rateLimitProtection === false`)**: Nagdi-disable ng explicit na proteksyon, ngunit **hindi** nag-a-opt-out ng isang aktibong API-key connection mula sa pandaigdigang auto-enable safety net. Sa `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), ang `false` at `undefined` ay magkatumbas: tanging ang `rateLimitProtection === true` ang itinuturing na explicit na override. Kung ang `rateLimitProtection` ay `false` (o hindi nakatakda), ang isang aktibong API-key connection ay tumutugma pa rin sa kondisyon ng auto-enable at nananatiling protektado ng rate-limit.
- **Walang per-connection na opt-out**: Kasalukuyang hindi maipapahayag ng operator na "ang iisang aktibong API-key connection na ito ay dapat tumakbo nang walang proteksyon ng rate-limit queue" habang pinananatiling aktibo ang auto-enable para sa iba. Upang ganap na patakbuhin ang mga API-key connection nang walang mga rate-limit queue, dapat i-off ang safety net nang pandaigdigan (`RATE_LIMIT_AUTO_ENABLE=false` o `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Mga sinusuportahang write path:**

- **`POST /api/rate-limits`**: Ang sinusuportahang management write path upang i-toggle ang `rateLimitProtection` para sa isang koneksyon (`{ connectionId: string, enabled: boolean }`). Ang pagtawag dito na may `enabled: true` ay nagpapagana ng explicit na proteksyon; ang pagtawag dito na may `enabled: false` ay nag-aalis ng explicit na proteksyon (bagaman ang mga aktibong API-key connection ay nananatiling saklaw ng pandaigdigang safety net kung naka-on ang auto-enable).
- **`PUT /api/providers/[id]`**: Sadyang **hindi** tumatanggap o nagpa-flip ng `rateLimitProtection` (#11278). Ang pag-update ng metadata ng provider connection sa pamamagitan ng `PUT /api/providers/[id]` ay hindi kailanman magbabago sa naka-persist na estado ng proteksyon ng rate-limit.

---

## 6. Slow-stream throughput watchdog (#9709)

Nakikita ng opsyonal `resilienceSettings.streamRecovery.throughputWatchdog` guard ang isang upstream na nagpapadala pa rin ng mga chunks ngunit gumagawa ng katulong na output na mas mababa sa naka-configure na rate ng useful-output. Ito ay sadyang naiiba sa idle timeout: ang mga tibok ng puso at metadata ay hindi nire-reset ang alinman sa timer at hindi binibilang bilang pag-unlad. Naiiba din ito sa deadline ng hard attempt (#9153), na nananatiling ganap na safety ceiling anuman ang kalidad ng output.

Ang asong tagapagbantay ay nangangailangan ng panahon ng pag-init na sinusundan ng isang kumpletong rolling window bago ito ma-abort. Binibilang nito ang mga text delta mula sa Mga Pagkumpleto ng Chat at Mga Tugon API na mga kaganapan sa output (isang konserbatibong UTF-8 byte na proxy), binabalewala ang paggamit-lamang at walang laman na mga kaganapan, at sinuspinde ang paghuhusga habang lumilipad ang mga kaganapan sa tool-call o pangangatwiran. Ito ay hindi pinagana bilang default at maaaring paganahin sa `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (na ang halaga ng env ay nagbubunga lamang ng default — na panalo ang isang naka-save `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean; tingnan ang env-vs-dashboard precedence note sa tuktok ng gabay na ito); ang window, warm-up, minimum rate, at minimum na masusukat na output ay nililimitahan ng normal na layer ng normalization ng mga setting ng resilience.

Kapag pinagana, ang isang watchdog abort ay ilalapat lamang sa aktibong upstream na pagtatangka. Bago ang anumang mga byte na nakikita ng kliyente, maaaring muling buksan ng kasalukuyang parehong-account na daanan sa pagbawi ang pagsubok. Pagkatapos gumawa, ang stream ay hindi kailanman bulag na replay; tanging ang kasalukuyang ligtas na mid-stream continuation contract lang ang makakapagtahi ng suffix. Ang finalization ay nananatiling single-shot, kaya ang paggamit ng accounting at semaphore release ay hindi nadoble.

---

## 7. Pagpapahayag Muli ng Status ng Upstream (maling naipahayag na mga error sa quota)

**Saklaw:** isang upstream gateway na nag-uulat ng pansamantalang pagkaubos ng quota na may maling HTTP status.

**Layunin:** iwasto ang nakakalinlang na status BAGO ang classification, upang makita ng mga downstream consumer (fallback engine, combo aggregation, ang response na nakaharap sa client) ang tunay na retryable na katangian ng kabiguan.

Ang ilang gateway ay nagbibigay ng senyas ng PANSAMANTALANG pagkaubos ng quota na may non-retryable na HTTP status. Ang `agentrouter.org` ay nagbabalik ng `403` (minsan `400`) na may Chinese na body (`用户额度不足` / `额度不足`) sa halip na ang standard na `429`. Ang mga client tulad ng Claude Code ay itinuturing ang `403` bilang permanente at ina-abort ang session, at kung walang pagwawasto, ikaklasipika ito ng fallback engine bilang `AUTH_ERROR` sa halip na isang quota event.

**Implementasyon:**

- Rehistro + matcher: `open-sse/config/upstreamStatusRestatement.ts` — isang per-provider na listahan ng mga tuntunin (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), na tinutugmaan sa pamamagitan ng `applyStatusRestatement()`.
- Lugar ng tawag: ang `providerFailure:` block sa `open-sse/handlers/chatCore.ts` (humigit-kumulang sa linya 3654), kaagad pagkatapos na i-parse ng `parseUpstreamError()` ang isang upstream response na may error na HTTP status (`!providerResponse.ok`), at bago tumakbo ang anumang classification, upang makita ng bawat downstream consumer ang nawastong status. Ang mga error na nakapaloob sa loob ng isang `200` SSE stream ay sumusunod sa hiwalay, mas huling stream-parsing path at **hindi** sakop ng hook na ito sa ngayon — isang kilalang limitasyon, hindi pa kailangan para sa maling status ng agentrouter (na lumilitaw bilang isang error na HTTP status).
- Pagiging karapat-dapat sa retry: Ang `429` ay nasa `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), kaya ang isang restated na error ay may dalang tunay na retry window sa halip na lumitaw bilang isang patay na `403`.
- Ang synthetic na `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) ay tanging kung ano ang sinasabi ng restated response sa **client**; ito mismo ay hindi ang panloob na tagal ng cooldown/lockout ng koneksyon — iyon ay pinamamahalaan nang hiwalay ng alinmang mekanismo na aktuwal na humahawak sa restated na error (escalating backoff ng Connection Cooldown, §2, base na `3s` para sa mga API-key provider; o Model Lockout, §3, para sa mga per-model-quota provider tulad ng agentrouter). Maaaring maging eligible ang router na mag-retry nang panloob nang mas maaga kaysa sa 60s na window na ina-advertise nito sa client — sinadyang headroom, hindi isang bug.

Ang mga permanenteng error (ang `无权访问模型` ng agentrouter — walang access sa modelong ito) ay HINDI KAILANMAN ni-rerestate: bini-veto ng `excludeMarkers` ang tuntunin kahit tumama ang `textMarkers`, kaya pinananatili ng error ang orihinal nitong status at walang mag-re-retry dito magpakailanman. Ang katugmang provider classification rule
(`agentrouter-model-access-denied` sa `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, isang `6h` na deklaradong base cooldown) ay kinokonsulta ng `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_bago_ ang generic na apikey-category na `FORBIDDEN` early-return, na naka-gate sa
`honorsRuleLockScope(provider)` (#10334 — kasalukuyang eksklusibo sa agentrouter sa pamamagitan ng `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist sa
`providerErrorRules.ts`). Ang deklaradong 6h na cooldown ng tuntunin ay dumadaloy bilang
`fallbackResult.baseCooldownMs`, ngunit pinapasok pa rin nito ang paunang-umiiral na
per-model-quota lockout path (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, hindi binago ng #10334 maliban sa pinagmulan ng
cooldown): ito ay naka-clamp pababa sa `mlSettings.maxCooldownMs` ng operator
(default na `1_800_000ms` / 30min), tulad ng bawat iba pang model lockout, at ang
_persisted lockout reason_ ay nananatiling paunang-umiiral na hardcoded na `"forbidden"`,
hindi ang `"auth_error"` ng tuntunin — tanging ang tagal ng cooldown ang iginagalang
nang end-to-end, hindi ang reason string. Ang koneksyon mismo ay nananatiling aktibo;
ang mga kapatid na modelo sa parehong koneksyon ay hindi apektado.

Ang mga restated na error sa quota (`额度不足`) ay umabot sa isang provider rule sa production
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, walang sariling deklaradong cooldown — ang scaled backoff default ng persistence layer ang nag-aaplay). Mula noong #10334, ang `scope` sa
`ProviderErrorRuleMatch` AY kinokonsumo nang end-to-end, ngunit **lamang** para sa mga provider na nasa
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist (`providerErrorRules.ts` —
ngayon ay tanging `"agentrouter"`, naka-gate sa pamamagitan ng `honorsRuleLockScope()`). Para sa bawat
iba pang provider, ang `scope` ay nananatiling pang-impormasyon lamang, eksaktong tulad ng dati bago ang #10334.
Ipinapakita ng `checkFallbackError` ang scope ng tumugmang tuntunin bilang
`fallbackResult.ruleScope`; ang `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ang shared guard na nagkukumpirma na ang isang
`ruleScope` ay tunay na ligtas na igalang bilang isang connection-wide, self-recovering
na senyas (scope `"connection"`, reason `quota_exhausted`, hindi kailanman `permanent`,
hindi kailanman `creditsExhausted` — isang depensa laban sa isang hinaharap na tuntunin na nagpapares ng scope
`"connection"` sa isang permanenteng estado ng account). Dalawang consumer ang tumatawag dito:

- **Pagpapanatili** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  sa halip na mahulog sa **per-model** lockout branch ng passthrough-provider
  (ang agentrouter ay `passthroughModels: true` → nagbabalik ang
  `hasPerModelQuota()` ng `true`), naglalapat ito ng **pansamantalang
  connection cooldown** — `testStatus: "unavailable"` + `rateLimitedUntil`,
  hindi kailanman isang terminal status
  (`credits_exhausted`/`banned`/`expired`) — kaya kusang bumabawi ang
  koneksyon kapag lumipas ang cooldown sa halip na mangailangan ng
  manu-manong pag-reset ng kredensyal. Nilalaktawan para sa mga koneksyong
  may `disableCooling: true` (#2997): ang opt-out na iyon ay bumabagsak sa
  halip sa per-model lockout (isang nakadokumentong trade-off — tingnan ang
  komento sa code sa itaas ng branch).
- **Pagruruta ng combo sa parehong kahilingan** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): minamarkahan ng parehong
  guard ang koneksyon papasok sa in-memory na `exhaustedConnections` set, na
  naka-key sa `${provider}:${connectionId}`. Nilalaktawan lamang nito ang
  isang natitirang target SA PAREHONG KAHILINGAN na _s mismo ay may dala nang
  eksaktong `connectionId` na iyon_ sa sarili nitong target object
  (`getExhaustedTargetSkipReason()`, `open-sse/services/combo/comboPredicates.ts`,
  `if (provider &&
connectionId)` bago ang `exhaustedConnections` lookup) — ang isang payak na
  model-list combo, kung saan ang mga kapatid na target ay walang dinadalang
  naka-pin na `connectionId` nila at isa lamang ang nire-resolve per-dispatch
  mula sa `X-OmniRoute-Selected-Connection-Id` header ng tugon, ay hindi
  kailanman tumatama sa key match na iyon. Para sa karaniwang kasong iyon,
  ang tunay na proteksyon laban sa muling paggamit ng isang natitirang leg sa
  account na kaka-exhaust lamang ay HINDI ang Set na ito — kundi ang layer ng
  pagpapanatili sa itaas (ang `rateLimitedUntil` ng koneksyon ay nasa
  hinaharap na ngayon) na pinagsama sa parehong guard na ito na nagpipigil sa
  `transientRateLimitedProviders` para sa kabiguan (tingnan ang "Disenyong
  may dalawang yugto" at ang komento sa code sa
  `isAgentrouterConnectionQuotaScope` branch sa `targetExhaustion.ts`): sa
  Set na iyon na hindi minarkahan, ang `allowRateLimitedConnection`
  force-allow ng `combo.ts` (`open-sse/services/combo.ts:1005-1013`,
  `:2734-2738`) ay HINDI gumagana para sa mga natitirang leg ng provider,
  kaya iginagalang nang normal ang `rateLimitedUntil` filter ng credential
  selection (`src/sse/services/auth.ts:1238`) at ang isang natitirang leg ay
  pipili ng ibang, karapat-dapat pa ring agentrouter na koneksyon o mabibigo
  nang walang available na kredensyal — hindi nito ipipilit ang sarili nitong
  bumalik sa koneksyong kaka-cooldown lamang ng branch na ito.

### Disenyong may dalawang yugto: muling pagpapahayag ng status, pagkatapos ay klasipikasyon

Ang status restatement (`upstreamStatusRestatement.ts`) at ang mga
panuntunan ng klasipikasyon ng provider
(`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`) ay
magkahiwalay na registry na parehong naka-key sa provider id at mga text
marker, ngunit tumatakbo ang mga ito sa magkaibang lugar at may magkaibang
layunin: muling isinusulat ng restatement ang HTTP status nang maaga sa
`chatCore.ts`; pinipili ng mga panuntunan ng klasipikasyon ang fallback
`reason` at ni-lock ang `scope` (`model` / `provider` / `connection`) sa
loob ng `checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Nakikita lamang ng mga panuntunan ng klasipikasyon ang buong error **text**
(kailangan para tumugma sa mga body marker tulad ng `额度不足`) para sa mga
provider na nakalista sa `FULL_TEXT_RULE_PROVIDERS` allowlist sa
`providerErrorRules.ts` — sa kasalukuyan ay `"agentrouter"` lamang. Para sa
bawat ibang provider sa **built-in catalog**, ibinibigay ng
`checkFallbackError` sa `getProviderErrorRuleMatch` ang structured error
lamang (`{code, type}`), na sapat para sa mga panuntunang batay sa
header/status/code ngunit bulag sa mga body-text marker. Ang helper na
`resolveRuleMatchBody()` ang nagsasagawa ng pagpiling ito: buong error text
para sa mga allowlisted provider, at ang structured error kung hindi. Ang
pagdaragdag ng isang **built-in** provider sa `FULL_TEXT_RULE_PROVIDERS` ay
isang tahasang per-provider opt-in — umiiral ito upang manatiling hindi
nagbabago byte-for-byte ang default na path para sa bawat provider na wala sa
listahan.

Ang `scope` ng isang panuntunan (`model` / `provider` / `connection`) ay
hiwalay na opt-in mula sa `FULL_TEXT_RULE_PROVIDERS`: ibinabalik lamang ito
ng `checkFallbackError` bilang `fallbackResult.ruleScope`, at iginagalang
lamang ito ng mga downstream consumer bilang higit pa sa isang informational
label, para sa mga provider na nasa `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
allowlist sa parehong file (na naka-gate sa pamamagitan ng
`honorsRuleLockScope()` — ngayon ay `"agentrouter"` lamang). Tingnan ang "Mga
ni-restate na quota error" sa itaas para sa kung ano ang aktuwal na ginagawa
ng isang `scope: "connection"` match kapag nasa allowlist na iyon ang isang
provider.

**#11104 — nilalaktawan ng mga panuntunang idineklara ng operator ang
parehong allowlist.** Maaaring magdeklara ang isang operator ng per-provider
na panuntunan sa runtime sa pamamagitan ng `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
nang hindi ina-edit ang file na ito. Ang paglalagay ng isang operator rule sa
likod ng `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — mga
allowlist na naglalayong protektahan ang **default** na pag-uugali ng mga
built-in catalog rule — ay gagawing walang bisa ang mekanismo ng settings
para sa bawat provider maliban sa mga nakalista na roon, dahil ang pagdeklara
pa lamang ng panuntunan ay siya nang tahasang opt-in ng operator. Parehong
sinusuri muna ng `resolveRuleMatchBody()` at `honorsRuleLockScope()` ang
`hasOperatorRuleForProvider()`: ang isang provider na may operator rule ay
nakakakuha ng raw na error text at iginagalang ang idineklara nitong `scope`,
maging lumitaw man ito sa alinmang allowlist o hindi.

**Kilalang gap — hindi kailanman kinokonsulta ang `providerRuleRegistry`
para sa HTTP 400.** Ang `BAD_REQUEST` branch ng `checkFallbackError` ay
nag-uuri ng status 400 nang buo sa pamamagitan ng sarili nitong mga pattern
array (`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, atbp. sa
`accountFallback.ts`) at bumabalik bago pa maabot ang
`configuredRule`/`getProviderErrorRuleMatch` branch sa itaas nito. Ang isang
built-in catalog rule (o isang operator rule) na may `status: 400` ay may
wastong syntax ngunit hindi kailanman paputukin. Walang umiiral na panuntunan
na nagta-target ng 400 ngayon, kaya walang apektado sa production — ngunit
ang isang hinaharap na 400 rule ay nangangailangang galawin muna ang branch
na ito, na isang mas malaking pagbabago kaysa sa pagdaragdag ng isang
panuntunan (muling inuuri nito ang 400 para sa bawat provider na nakasandig
na sa pattern-array na pag-uugali) at wala sa saklaw para sa pagdaragdag ng
panuntunan ng iisang provider.

### Pagdaragdag ng bagong gateway na mali ang pag-uulat ng quota

1. Magrehistro ng isang rule array sa `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Panatilihing partikular
   sa provider ang `textMarkers`; huwag kailanmang gamitin muli ang mga
   pangkalahatang pariralang Ingles na maaaring magtugma sa
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opsyonal na magrehistro ng mga panuntunan sa pag-uuri sa
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) upang
   mapili ang tamang saklaw ng lock (`connection` para sa quota na saklaw ang
   buong account, `model` para sa mga error na bawat-modelo). Ang hakbang na
   ito ay may bisa lamang sa production para sa mga provider na ang mga
   panuntunan ay nangangailangan ng buong teksto ng error (mga marker ng
   body): idagdag ang provider id sa `FULL_TEXT_RULE_PROVIDERS` sa parehong
   file — kung hindi, ibinibigay lamang ng `checkFallbackError` sa
   panuntunan ang istrukturadong `{code, type}` error at ang panuntunang
   nakabatay sa body-text ay hindi kailanman magtutugma sa live na trapiko.
   Ang mga panuntunang tumutugma nang puro sa `status`/`headers` (tulad ng
   sa Opencode o Minimax) ay hindi nangangailangan ng opt-in na ito. Bukod
   dito, kung idineklara ng panuntunan ang `scope: "connection"` at ang
   layunin ay aktwal na cooldown na saklaw ang buong koneksyon kasama ang
   pag-skip ng combo sa parehong kahilingan (hindi lamang isang label na
   pang-impormasyon), idagdag ang provider id sa
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` sa parehong file — ito ang
   nagkokontrol sa paggamit na istilo ng
   `isAgentrouterConnectionQuotaScope()` sa `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) at `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); kung wala ito,
   dumadaloy pa rin ang `scope` sa pamamagitan ng `fallbackResult.ruleScope`
   ngunit walang kumikilos dito.
3. Magdagdag ng mga unit test na katulad ng
   `tests/unit/upstream-status-restatement.test.ts` at
   `tests/unit/agentrouter-error-rules.test.ts` (kabilang ang mga guard na
   not-permanent / not-creditsExhausted, at — kung kailangan ng provider ang
   allowlist — isang test na nagpapatunay na nagbabalik ang
   `resolveRuleMatchBody()` ng buong teksto lamang para sa provider na iyon).

Walang kinakailangang pagbabago sa `chatCore.ts`, `classifyError`, o combo.

#### Lock na nakabucket ayon sa egress (#10880)

Ang mga provider sa `EGRESS_BUCKETED_LOCK_PROVIDERS` (pamilya ng opencode)
ay itinuturing na IP-bucketed na upstream (ang opencode free tier ay
IP-bucketed, hindi account-bucketed — tingnan ang #9611): ang isang
status-429 na inuri bilang `quota_exhausted` **o** `rate_limit_exceeded` ay
nag-aapply ng cooldown sa bawat koneksyon ng allowlisted family na ang
huling kilalang egress IP ay tumutugma sa egress IP ng nag-fail na
koneksyon, bago pa man sila masubukan ng rotation
— iniiwasan ang N-1 na mga tawag sa upstream na tiyak na mabibigo
(parehong anyo ng #10460/#10525). Sadyang isinama ang
`rate_limit_exceeded`: sa path ng `markAccountUnavailable`, ang mga
panuntunang partikular sa opencode ay hindi kailanman tumutugma (walang
headers/body na ibinibigay sa `checkFallbackError`, at ang opencode ay wala
sa `FULL_TEXT_RULE_PROVIDERS`), kaya ang isang 429 na ang body ay naglalaman
ng teksto ng subscription-quota ("monthly usage limit reached") ay inuuri
bilang `quota_exhausted` ng quota-text fallback
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h na cooldown)
bago pa man maabot ang panuntunang `status_429` — samantalang ang isang
429 na walang quota-text (payak na rate limiting) ay inuuri sa pamamagitan
ng panuntunang `status_429` bilang `rate_limit_exceeded` at nag-aapply pa
rin ng cooldown sa IP family. Para sa isang allowlisted na provider, ang
isang IP-bucketed na rate limit ay kaparehong signal ng isang naubos na
quota. Mga tapat na limitasyon:

- **Best-effort**: nireresolba ng lock ang huling kilalang `egress_ip` ng
  koneksyon mula sa `proxy_logs` (24h na window, synchronous, walang cache).
  Kapag cold ang cache (hindi pa nai-probe ang egress IP) o walang row → ang
  nabigong koneksyon ay pinapailalim pa rin ng branch sa cooldown (naitatala
  tulad ng dati), walang sibling lamang ang nai-lock.
- **Hindi kailanman terminal**: ang cooldown ay isang nababagong quota window
  (`testStatus: "unavailable"`); hindi kailanman hinihango ang permanenteng
  estado mula sa signal na antas-IP. Ang mga koneksyong `disableCooling` ay
  lumalaktaw nang buo sa branch.
- **Nagbabago ang granularity ng lock para sa naka-allowlist na pamilya**: ito
  ay pagbabago ng scope, hindi lamang sibling optimization. Ang opencode ay
  isang `passthroughModels` provider, kaya bago ang branch na ito, ang isang
  429 ay nagdudulot ng per-MODEL na lockout; ngayon ito ay nagdudulot ng
  cooldown ng koneksyon — kabilang para sa isang operator na nagpapatakbo ng
  iisang koneksyon na walang anumang sibling. Iyan ang granularity na
  idineklara nang tama ng opencode rule table (`scope: "connection"`,
  `providerErrorRules.ts`), na hanggang ngayon ay hindi pa sinusunod dahil
  wala ang opencode sa `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Mismong isinusulat
  ng branch ang cooldown + `backoffLevel` ng nabigong koneksyon, sinasalamin
  ang connection-scoped na agentrouter branch, at nagbabalik — hindi na
  kailanman naaabot ang per-model na bloke at ang generic path sa ibaba.
- **Kasama ang combo**: tulad ng agentrouter branch, sadyang binabalewala ng
  scope ang downgrade na `persistUnavailableState`/`isCombo` na inilalapat ng
  combo caller sa isang 429. Ang per-model na lockout ay hindi isang mas
  mahinang anyo ng scope na ito, ito ay maling yunit: wala itong sinasabi
  tungkol sa naubos na IP, kaya patuloy na magsasayang ang combo rotation ng
  isang tiyak na mabibigong tawag bawat sibling.
- **Kaligtasan ng sibling**: ang sibling na terminal na
  (banned/credits_exhausted) o nasa mas mahabang cooldown na ay hindi
  kailanman mapapatungan.
- **Eksklusibong allowlist**: ang pagpapalawak ng
  `EGRESS_BUCKETED_LOCK_PROVIDERS` ay tahasang desisyon ng may-ari; walang
  generic na wiring (pattern #10334/#10419). Ibini-bind ng sibling query ang
  parehong allowlist sa halip na ulitin ito bilang SQL literal, kaya ang
  pagpapalawak nito ay nananatiling isang-linyang pagbabago.
- **Pag-ikot ng egress IP, sa magkabilaang direksyon**: ang lookup window
  (24h) ay mas malawak nang malayo kaysa sa TTL ng egress-IP cache (5 min),
  kaya ang "huling kilalang IP" ay kasaysayan, hindi kasalukuyang estado. Kung
  umikot ang proxy ng isang koneksyon sa loob ng window, maaaring
  **makaligtaan** ng lock ang isang tunay na ibinahaging IP (ang naitalang IP
  ay ang bago, hindi pa nauubos) — at simetriko nito, maaari nitong **ilagay
  sa cooldown ang isang sibling na nakalipat na** mula sa naubos na IP. Ang
  pangalawang kaso ay nagkakahalaga sa sibling na iyon ng isang cooldown
  window; parehong tinatanggap bilang mga best-effort na limitasyon ng lookup
  na batay sa kasaysayan.
- **Gastos**: dalawang bounded na scan ng `proxy_logs` (na-filter ayon sa
  window gamit ang `idx_pl_timestamp`), sa dalas lamang ng 429. Walang bagong
  index (migration 134 YAGNI). Nasukat sa isang kopya ng DB na may real
  traffic at katamtamang laki; ang isang high-throughput na instance ay
  naglalaman ng naaangkop na mas maraming row sa parehong window.

---

## Iba pang mga Tampok ng Resilience

- **20 estratehiya sa pagruruta** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — tingnan ang [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-aware na pagruruta** (v3.8.0) — iniuuna ang mga koneksyon batay sa oras ng pag-reset ng quota.
- **Pagbaba ng antas ng background mode** — ang `background: true` ng Responses API ay ibinababa sa sync na may babala.
- **Dynamic na pagtukoy ng limitasyon ng tool** — nagba-back off sa mga provider kapag naabot ang mga limitasyon sa bilang ng tool.
- **Emergency fallback** — kinokontrol ng `OMNIROUTE_EMERGENCY_FALLBACK`; maaari itong i-override ng mga operator mula sa pahina ng Feature Flags nang hindi nagre-restart.

---

## Pag-debug

- Ang weighted combo ay sumasagot ng `503 all_targets_cooling_down` (nakatakda ang `Retry-After`, inililista ng `diagnostics.excluded` ang bawat target na may `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → naka-configure at nakakonekta ang pool, ang bawat target ay na-exclude lamang ng isang resilience timer; ang babalang `[COMBO] Weighted selection: every target excluded before dispatch — …` ang nagpapangalan ng mga dahilan at natitirang segundo. Ang `404 no_executable_targets` mula sa parehong combo ay nangangahulugang walang resilience timer na kasangkot (walang mapapatakbo, o bawat account ay nabigo sa availability probe). Ginawa sa `open-sse/services/combo/pinRecovery.ts` mula sa mga exclusion na nakolekta sa `targetResolution.ts`.
- Ang lahat ng key para sa isang provider ay na-skip → suriin kapwa ang estado ng circuit breaker AT ang `rateLimitedUntil`/`testStatus` ng bawat koneksyon.
- Ang provider ay permanenteng na-exclude pagkatapos ng reset window → may code na nagbabasa ng raw `state` sa halip na `getStatus()`/`canExecute()`.
- Isang key ang nabigo, dapat gumagana ang iba → mas piliin ang connection cooldown kaysa circuit breaker.
- Isang model lang ang nabigo → mas piliin ang model lockout kaysa connection cooldown.
- Ang estado ay dapat kusang bumabawi ngunit hindi → suriin kung may future timestamp + read path na nagre-refresh ng nag-expire na estado. Ang mga permanenteng estado ay nangangailangan ng manu-manong pagbabago.

---

## Runtime state — mabilisang sanggunian ng agent

> Inilipat nang verbatim mula sa `AGENTS.md` → "Resilience Runtime State" (PR #12743) upang
> manatili ang gabay ng agent sa ilalim ng 40k context budget. Ito ang pinaikli, nakaharap-sa-agent
> na view ng mga seksyon sa itaas; ang mga naka-numero na seksyon ang nananatiling buong sanggunian.

May tatlong magkakaugnay ngunit magkakaibang mekanismo ng pansamantalang kabiguan ang OmniRoute.
Panatilihing hiwalay ang kanilang saklaw kapag nagde-debug ng pag-uugali ng pagruruta. Tingnan ang
[3-layer resilience diagram](../diagrams/exported/resilience-3layers.svg)
(pinagmulan: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
para sa map na madaling tingnan sa isang sulyap.

### Provider Circuit Breaker

**Saklaw**: buong provider, hal. `glm`, `openai`, `anthropic`.

**Layunin**: ihinto ang pagpapadala ng traffic sa isang provider na paulit-ulit na bumabagsak sa
antas ng upstream/serbisyo, upang ang isang hindi malusog na provider ay hindi magpapabagal sa bawat
kahilingan.

**Implementasyon**:

- Pangunahing klase: `src/shared/utils/circuitBreaker.ts`
- Pagkakakonekta ng chat gate/execution: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime status API: `src/app/api/monitoring/health/route.ts`
- Mga shared wrapper: `open-sse/services/accountFallback.ts`
- Naka-persist na talahanayan ng estado: `domain_circuit_breakers`

**Mga estado** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: pinapayagan ang normal na traffic.
- `DEGRADED`: bandang maagang-babala — lumampas ang mga kabiguan sa degradation threshold ngunit
  hindi pa umaabot sa breaker threshold; umaagos pa rin ang traffic, ipinapakita ng mga dashboard ang
  babala. Ang isang balidong connection test o isang tahimik na window na walang bagong kabiguan ay
  nagbabalik dito sa `CLOSED`
  (nasa `docs/architecture/RESILIENCE_GUIDE.md` ang window).
- `OPEN`: pansamantalang naka-block ang provider; ang mga caller ay nakakatanggap ng
  provider-circuit-open na tugon o nilalaktawan ng combo routing patungo sa ibang target.
- `HALF_OPEN`: lumipas na ang reset timeout; payagan ang isang probe request. Isinasara ng tagumpay
  ang breaker, binubuksan muli ito ng kabiguan.

**Mga default** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, ginagamit sa pamamagitan ng
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` sa `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` sa `src/sse/handlers/chatHelpers.ts`). Ang buong-provider na
breaker ay tumatakbo sa `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profile | nagde-degrade sa | nagbubukas sa (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | ---------------: | ----------------------------------------: | ----------------------------: |
| OAuth   |              `5` |                                       `8` |                         `60s` |
| API key |              `7` |                                      `12` |                         `30s` |
| Local   |        (hinango) |                                       `2` |                         `15s` |

Tinutukoy din ng `PROVIDER_PROFILES` ang `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) at `providerCooldownMs` (5/10/1 min): ang mga ito ang
nagpapatakbo sa **window gate ng opt-in na pandaigdigang Provider Cooldown**
(`PROVIDER_COOLDOWN_ENABLED`, naka-off bilang default) — ang isang provider-level na entry sa
`open-sse/services/providerCooldownTracker.ts` ay mabibilang lamang na nagko-cooldown matapos ang
`providerFailureThreshold` na mga kabiguan sa loob ng `providerFailureWindowMs`, at pagkatapos ay
nagko-cooldown nang `providerCooldownMs`. Ang mga ito ay HINDI ang mga threshold ng live na breaker —
huwag itong i-tune na inaasahan ang pag-uugali ng breaker. Ang bawat default ay maaaring i-override sa
pamamagitan ng mga env var na `OMNIROUTE_PROVIDER_BREAKER_*` at `OMNIROUTE_CIRCUIT_BREAKER_*`; ang
runtime-accurate na reference table ay nasa `docs/architecture/RESILIENCE_GUIDE.md`.

Tanging mga provider-level na failure status ang dapat mag-trip sa provider breaker:

```ts
(408, 500, 502, 503, 504);
```

Huwag i-trip ang buong-provider na breaker para sa mga normal na error ng account/key/model tulad ng
karamihan ng mga kaso ng `401`, `403`, o `429`. Ang mga iyon ay karaniwang kabilang sa connection
cooldown o model lockout. Ang isang generic na API-key provider `403` ay dapat na mababawi maliban
kung ito ay ikinaklasipika bilang isang terminal na error ng provider/account.

Gumagamit ang breaker ng lazy recovery, hindi ng background timer. Kapag nag-expire ang `OPEN`, ang mga read tulad ng `getStatus()`, `canExecute()`, at `getRetryAfterMs()` ay nagre-refresh ng state papunta sa `HALF_OPEN`, kaya ang mga dashboard at combo candidate builder ay hindi magpakailanmang patuloy na nag-e-exclude ng expired na provider.

### Cooldown ng Koneksyon

**Saklaw**: isang provider connection/account/key.

**Layunin**: pansamantalang laktawan ang isang sirang key/account habang pinapayagan ang iba pang koneksyon para sa parehong provider na magpatuloy sa pag-serve ng mga request.

**Implementasyon**:

- Path ng pag-write/update: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pagpili/pag-filter ng account: `src/sse/services/auth.ts::getProviderCredentials...`
- Kalkulasyon ng cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Mga setting: `src/lib/resilience/settings.ts`

Mga mahalagang field sa mga koneksyon ng provider:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Habang nagse-select ng account, nilalaktawan ang isang koneksyon kapag:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Lazy din ang mga cooldown: kapag ang `rateLimitedUntil` ay nasa nakaraan na, nagiging eligible muli ang koneksyon. Sa matagumpay na paggamit, nililinis ng `clearAccountError()` ang `testStatus`, `rateLimitedUntil`, mga error field, at `backoffLevel`.

Default na behavior ng connection cooldown:

- Base cooldown ng OAuth: `5s`.
- Base cooldown ng API-key: `3s`.
- Ang API-key `429` ay dapat unahin ang mga upstream retry hint (`Retry-After`, mga reset header, o parseable na reset text) kapag available.
- Ang mga paulit-ulit na recoverable failure ay gumagamit ng exponential backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Ang anti-thundering-herd guard ay pumipigil sa mga sabay-sabay na failure sa parehong koneksyon mula sa paulit-ulit na pagpapahaba ng cooldown o dobleng pag-increment ng `backoffLevel`.

Ang mga terminal state ay hindi mga cooldown. Ang `banned`, `expired` (na nagiging terminal lamang pagkatapos ng N bounded retries gamit ang `EXPIRED_RETRY_MAX`), at `credits_exhausted` ay inilaan na manatiling unavailable hanggang sa magbago ang mga kredensyal/setting o i-reset ng isang operator ang mga ito. Huwag i-overwrite ang mga terminal state ng transient cooldown state.

### Lockout ng Modelo

**Saklaw**: provider + koneksyon + modelo.

**Layunin**: iwasang i-disable ang buong koneksyon kapag isang modelo lang ang unavailable o quota-limited para sa koneksyong iyon.

Mga halimbawa:

- Mga provider ng per-model quota na nagbabalik ng `429`.
- Mga lokal na provider na nagbabalik ng `404` para sa isang nawawalang modelo.
- Mga provider-specific na mode/model permission failure tulad ng mga napiling Grok mode.

Ang model lockout ay matatagpuan sa `open-sse/services/accountFallback.ts` at hinahayaan ang parehong koneksyon na magpatuloy sa pag-serve ng ibang mga modelo.

### Gabay sa Pag-debug

- Kung lahat ng key para sa isang provider ay nilalaktawan, suriin ang parehong provider breaker state at ang `rateLimitedUntil`/`testStatus` ng bawat koneksyon.
- Kung ang isang provider ay tila permanenteng naka-exclude pagkatapos ng reset window, tingnan kung ang code ay nagbabasa ng raw na `state` sa halip na gumamit ng `getStatus()`/`canExecute()`.
- Kung ang isang provider key ay nag-fail ngunit dapat gumagana ang iba, mas piliin ang connection cooldown kaysa sa provider breaker.
- Kung isang modelo lang ang nag-fail, mas piliin ang model lockout kaysa sa connection cooldown.
- Kung ang isang state ay dapat mag-self-recover, dapat itong magkaroon ng future timestamp/reset timeout at isang read path na nagre-refresh ng expired na state. Ang mga permanenteng status ay nangangailangan ng manu-manong pagbabago sa kredensyal o config.

---

## TLS Fingerprinting at Stealth

Ang stealth na partikular sa provider (JA3/JA4, CCH, obfuscation) ay hiwalay na nakadokumento — tingnan ang `docs/security/STEALTH_GUIDE.md` (git; hindi nakakompila sa `/docs`).

---

## Pagsubok sa resilience (Phase 8 · Block C)

Bukod sa mga unit test para sa resilience logic, tatlong pagsubok ang sumusubok sa runtime sa ilalim ng totoong mga kondisyon ng stress/pagkabigo (lahat ay integration/nightly — walang nagha-hold ng mga PR):

| Pagsubok    | Ano                                                                                                                                                                                                                     | Patakbuhin                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Ang fake-upstream na node ay nag-i-inject ng totoong latency/reset/timeout/503; bini-validate na ang circuit breaker ay nagbubukas/nagre-recover at inuuri ng `checkFallbackError` ang 503 bilang recoverable fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 stream bawat `createSSEStream` sa ilalim ng `--expose-gc`; nabibigo kapag ang heap ay lumalampas sa kisame (OOM guard #3069).                                                                                      | `npm run test:heap`                      |
| k6 soak     | Tuloy-tuloy na load laban sa `/api/monitoring/health`; mga threshold ng p95/error.                                                                                                                                      | `k6 run tests/load/k6-soak.js` (nightly) |

Ino-orchestrate ng `.github/workflows/nightly-resilience.yml` (cron + dispatch). Sa default na `test:integration`, awtomatikong nag-si-skip ang chaos at heap (kapag walang `RUN_CHAOS_INT`/`--expose-gc`).

---

## Tingnan Din

- [Gabay sa Arkitektura](./ARCHITECTURE.md) — Arkitektura ng sistema at mga panloob na detalye
- [Gabay ng User](../guides/USER_GUIDE.md) — Mga provider, combo, integrasyon ng CLI
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) — Scoring na may 16 na salik, mga mode pack
