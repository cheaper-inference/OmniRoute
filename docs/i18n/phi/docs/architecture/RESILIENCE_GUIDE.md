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

**Saklaw:** iisang koneksyon/account/key ng provider.

**Layunin:** laktawan ang isang sirang key habang patuloy na nagsisilbi ang iba pang koneksyon para sa parehong provider.

**Implementasyon:**

- Markahang hindi available: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pagpili: `getProviderCredentials*` sa parehong file
- Pagkalkula ng cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Mga setting: `src/lib/resilience/settings.ts`

**Mga field para sa bawat koneksyon:**

- `rateLimitedUntil` — timestamp kung kailan matatapos ang cooldown
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — counter para sa exponential backoff

**Mga default na cooldown:**

- Base para sa OAuth: 5s
- Base para sa API key: 3s
- API-key 429: inuuna ang upstream na `Retry-After`/reset headers/na-parse na reset text
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Delay ng retry ayon sa provider.** May select na **Retry delay** ang pahina ng detalye ng provider (Auto,
15s hanggang 1h). Sine-save nito ang `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, sa pamamagitan ng `PATCH /api/resilience`). Kapag walang upstream retry
hint ang isang rate-limit error, pinapalitan ng halagang iyon ang scaled backoff para sa provider at nire-reset ang
`backoffLevel` sa 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Ang pagkakasunud-sunod ng precedence para sa isang rate-limited error, mula sa
pinakamataas, ay: upstream retry hint, pagkatapos ay `providerSpecificData.rotationOverrides.rateLimitResetSeconds` para sa bawat koneksyon,
pagkatapos ay ang retry delay ayon sa provider, pagkatapos ay `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` mula sa env, at panghuli ang
scaled backoff. Inaalis ng Auto ang field. Ang epekto nito ay para lamang sa dahilan na rate-limit, hindi sa mga terminal state.

**Anti-thundering-herd guard:** pinipigilan ang sabay-sabay na mga failure na labis na magpalawig ng cooldown o mag-double-increment ng `backoffLevel`.

**Hindi nagpapataas sa backoff ladder ang mga 429 na dulot ng concurrency limit.** Ang isang `429` na ang body ay nag-uulat ng
concurrency limit ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) ay nangangahulugang maayos ang account ngunit abala.
Ibinabalik ng `checkFallbackError()` ang reason na `concurrency_limited`: agad na mag-fail over sa susunod na
koneksyon, i-cool ang kasalukuyang koneksyon sa nakapirming `CONCURRENCY_LIMIT_COOLDOWN_MS`
(1s) o sa upstream retry hint, panatilihing hindi nagbabago ang `backoffLevel`, at itakda ang `skipProviderBreaker`.
Nananatiling nangingibabaw ang tahasang quota body, kaya ang body na tumutugma rin sa isang quota pattern ay mananatiling quota verdict. Detection: `looksLikeConcurrencyLimit()` sa `src/shared/utils/classify429.ts`;
verdict: `open-sse/services/accountFallback/concurrencyLimit429.ts`. Hindi nagbabago ang `classify429()` (ang `FailureKind` ng breaker) at binabasa pa rin nito ang
`rate_limit` para sa mga body na ito.

**Hindi kino-cool ang account ng mga pagkaantala sa stream content.** Kapag sumuko ang content-stall watchdog
(`open-sse/utils/streamHandler.ts`) sa isang stream na walang naipadalang model output sa itinakdang oras,
itatala ng `markAccountUnavailable()` ang error sa koneksyon ngunit hindi magtatakda ng cooldown: ang stall ay kabilang sa kahilingang iyon, at kadalasang dulot ng mahabang reasoning turn na wala pang output. Maaaring piliing i-enable muli ito ng mga operator gamit ang `resilienceSettings.streamStallCooldown.enabled`
(default na `false`).

**Opt-in na latency signal para sa pagpili ng account ng `p2c`.** Itinatala ng bawat ipinadalang pagtatangka ang time-to-first-byte at resulta nito ayon sa koneksyon
(at ayon sa koneksyon + model) sa isang in-memory rolling window: ang huling 20 sample sa loob ng 15 minuto
(`open-sse/services/connectionLatencyTracker.ts`, itinatala mula sa `safeLogEvents()` sa
`src/sse/handlers/chatHelpers.ts`). Kapag ang `resilienceSettings.p2cLatency.weight` ay higit sa
`0`
(saklaw na 0-20, default na `0` = naka-off), nagdaragdag ang `compareP2CConnections()` sa `src/sse/services/auth.ts` ng hanggang `weight` puntos sa bawat candidate ng pares. Kalahati nito ay mula sa latency bilang ratio kumpara sa mas mabilis na candidate (ang dalawang beses na mas mabagal ay nakakakuha ng buong kalahati) at kalahati ay mula sa rolling error rate.
Nalalapat lamang ang termino kapag ang parehong candidate ay may hindi bababa sa 3 sample, kaya hindi napaparusahan ang mga bagong account, at nananatiling mas mababa ang ceiling nito kaysa sa mga penalty na quota-blocked at quota-exhausted. Wala itong sariling circuit: ang mga failing account ay pinamamahalaan pa rin ng mga layer ng cooldown, lockout at breaker. Itakda ito gamit ang `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Nire-restart ng reasoning frames ang content-stall budget.** Maaaring mag-isip nang ilang minuto ang isang reasoning model bago nito ipadala ang unang nakikitang token: nag-i-stream si Claude ng mga `thinking_delta` frame na maaaring walang lamang thinking text, at nag-i-stream ang Responses API ng sunod-sunod na reasoning item. Kinikilala ng `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ang mga frame na ito, at nire-restart ng watchdog ang budget nito sa bawat isa sa halip na kanselahin ang turn. Hindi pa rin itinuturing ang mga ito na model output, kaya ang turn na nagtatapos sa reasoning lamang ay iuulat pa rin bilang empty, at ang turn na tumitigil sa reasoning at nagpapadala lamang ng heartbeats ay magti-trigger pa rin sa watchdog.

Pinananatili ng mga binary na `reasoningContentEvent` frame ni Kiro na may hindi walang-lamang signature ang reasoning activity na ito sa pamamagitan ng executor bilang isang empty `reasoning_content` delta. Hindi ipinapasa ang signature. Hindi nire-restart ng metadata, incomplete frame at empty signature ang content budget; nalalapat pa rin ang hiwalay na active-stream timeout at client cancellation (`open-sse/executors/kiro/reasoning.ts`).

**Mga terminal state (HINDI mga cooldown):**

- `banned` — itinatakda ng detection ng banned-keyword / account-ban (tingnan ang [BAN_DETECTION](../security/BAN_DETECTION.md)). Hindi ito itinatakda ng upstream per-request refusals (`request_rejected`, halimbawa, Anthropic OAuth 403 na "Request not allowed"): binibilang ang mga ito ayon sa koneksyon at model at inaalis ang model na iyon sa rotation na may lumalaking cooldown na may cap na `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), o kino-cool ang koneksyon kapag walang nalalamang model — `open-sse/services/requestRejectedStreak.ts`
- `expired` (nagta-transition sa terminal pagkatapos ng bounded retries — `EXPIRED_RETRY_MAX = 3` na may exponential backoff — upang makapag-self-heal ang mga pansamantalang OAuth error bago permanenteng ma-deactivate ang account)
- `credits_exhausted`

Nananatili ang mga ito hanggang sa magbago ang mga credential o i-reset ng operator. Huwag i-overwrite ang mga terminal state gamit ang transient na cooldown state.

**Lazy recovery:** kapag lumampas na ang `rateLimitedUntil`, magiging eligible muli ang connection. Sa matagumpay na paggamit, nililinis ng `clearAccountError()` ang lahat ng error field.

### Claude OAuth usage wall: lower-priority lane + pag-reset ng session limit

**Saklaw:** isang Claude subscription (OAuth) connection. Parehong **opt-in bawat
connection** (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` sa
`providerSpecificData`, parehong default na naka-off) at ginagaya ang mga command na
`/low-priority` at `/limit-reset` ng Claude Code (wire contract na nakuha mula sa Claude Code 2.1.263).

**Implementation:**

- State machine + response classification: `open-sse/services/claudeLowPriority.ts`
- Reset status/claim client: `open-sse/services/claudeLimitReset.ts`
- Executor hook (header injection + retry sa parehong account): `open-sse/executors/base.ts::execute()`
- Opt-in persistence: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** ang 5-oras na usage wall — isang `429` na ang mga header ay may
`anthropic-ratelimit-unified-status: rejected` at, kapag eligible ang account,
`anthropic-ratelimit-unified-slow-offer: treatment`. Walang ipinapadala bago ang unang wall
429 na iyon; ang burst 429 na walang unified header ay dumadaan sa normal na cooldown path.

**Lower-priority lane** (`lowPriorityMode`):

- Sa wall 429, tinatanggap ng executor ang offer at agad na nire-retry ang **parehong**
  account gamit ang `anthropic-usage-limit: slow`; mananatiling aktibo ang lane hanggang sa inanunsyong
  `anthropic-ratelimit-unified-reset` (+60s grace) at bawat request sa window na iyon ay may header. Ang naharang na 429 ay hindi kailanman nakararating sa `handleChatCore`, kaya ang connection ay
  **hindi** inilalagay sa cooldown at hindi inililipat sa ibang connection.
- Ang `anthropic-ratelimit-unified-slow-status` sa mga susunod na response: pinananatili ng
  `active` / `not_needed` ang lane; kapag `slot_busy` (429) o `529`, hinihintay ang server's
  `anthropic-ratelimit-unified-slow-retry-after` (default 20s, clamp 5–600s, ±30% jitter)
  at nire-retry, na nililimitahan ng `anthropic-ratelimit-unified-slow-max-wait` (default 20 min, clamp
  1 min–6 h) — kapag lumampas dito, magwawakas ang lane at hahadlangan ng 10-minutong cool-off ang muling pagtanggap. Ang paghihintay ay nililimitahan din ng natitirang oras ng sariling upstream-start timeout ng request
  (`resolveFetchStartTimeout`, 10 min bilang default) na binawasan ng 5 s na margin: kung wala ang cap na ito, lalampas ang default na 20-minutong max-wait sa request at maa-abort ang sleep sa kalagitnaan ng paghihintay, na maglalabas ng `TimeoutError` sa halip na maayos na `max_wait` end + cool-off.
- Ang `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, isang 5h-window rollover, o
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (na nagwawakas dito bilang
  `extra_usage` sa anumang status, dahil saklaw na ngayon ng paid overage ang wall) ay nagwawakas sa lane; pagkatapos ay dumadaloy ang response sa normal na cooldown path. Naaalala ang `budget_exhausted` hanggang sa inanunsyong budget reset (≤ 8 araw).
- Tumatakbo ang wall check pagkatapos ng sariling 400-driven intra-attempt retries ng executor (context
  editing, thinking/effort clamps, param auto-learn), kaya ang wall 429 na lumitaw lamang sa isa sa mga retry na iyon ay nahaharang pa rin sa halip na makarating sa cooldown path.
- Nasa memory ang state bawat connection (ang restart ay nangangailangan ng isang dagdag na wall 429 bago muling tanggapin).

**Pag-reset ng session limit** (`autoLimitReset`, sinusubukan bago ang lane kapag parehong naka-on):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → block na `juniper_tide`; kapag `arm: "reset"` at `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` gamit ang
  `{ "program": "juniper_tide" }` (organization UUID mula sa
  `providerSpecificData.organizationUUID`, bootstrap fallback).
- Ang `result: reset|not_limited` → ire-retry ang request sa full speed (walang slow header).
  Ang `already_used` / `not_offered` ay nagme-memoise ng `next_available_at` (default isang linggo); anumang failure ay magba-back off nang 15 minuto. Isinasagawa ang reset isang beses bawat linggo at kasama pa rin ito sa weekly limit.

Mga regression guard: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Awtomatikong ilapat ang mga banked reset

**Saklaw:** Codex at Claude subscription (OAuth) na koneksyon.**Mag-opt-in** : ang setting ng `bankedResetAutoApply` ay naka-off at nasa `dry-run` mode bilang default (Mga Setting → AI → Auto-apply banked resets).

**Layunin:** gumastos ng mga naka-banked na pag-reset nang mag-isa kapag ang isang account ay tumama sa isang pader ng paggamit, sa halip na maghintay para sa isang operator na pindutin ang "Redeem" sa pahina ng Mga Limitasyon ng Provider.

| Uri ng kredito (`creditTypes`) | Ano ang natubos                                  | Kung saan ito tumatakbo                                                                 |
| ------------------------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `codexCredits`                 | Codex reset credits                              | trabaho sa background, tuwing 60 s                                                      |
| `claudeCredits`                | Claude banked grants (`GRANT` credits)           | trabaho sa background, tuwing 60 s                                                      |
| `claudeSessionReset`           | Claude lingguhang session-limit reset (sa itaas) | path ng kahilingan, sa pamamagitan ng parehong patakaran bilang toggle sa bawat account |

**Pagpapatupad:**

- Purong desisyon (isang panuntunang itinakda para sa parehong landas): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Trabaho sa background: `src/lib/services/bankedResetAutoApply.ts` (nagsimula sa `src/instrumentation-node.ts`)
- Claude request-path gate: `src/lib/usage/claudeSessionResetPolicy.ts`, nakarehistro sa pamamagitan ng `setClaudeLimitResetPolicy()` sa `open-sse/services/claudeLimitReset.ts`
- History, caps at webhook: `src/lib/usage/bankedResetAudit.ts`
- Kasaysayan API: `GET /api/settings/banked-reset-auto/history?limit=50` (pamamahala ng auth)

**Order ng desisyon** (ang unang bagsak na panuntunan ay ang naitala na dahilan):

1. I-feature off, credit type off, o account out of scope (`accountScope` `all` / `selected` kasama ang per-account `connections` na mapa).
2. Sa labas ng opsyonal na iskedyul UTC (`startHourUtc` > `endHourUtc` tumatawid ng hatinggabi).
3. Mga cap sa nakalipas na 24 na oras: `maxPerAccountPerDay` (1), `maxPerDay` (3), at `minSpacingMinutes` (30) sa pagitan ng alinmang dalawang redemption.
4. Trigger: isang naka-walled na `session` o `weekly` window (basahin mula sa `getQuotaWindowStatus().reachedThreshold`, hindi `isAccountQuotaExhausted()`, na nag-uulat lamang ng account sa bawat window na ginastos), o isang credit na mag-e-expire sa loob ng `expiringCreditHours` (24) sa isang account na gumamit ng hindi bababa sa `expiringCreditMinUsedPercent` (50).
5. Natural-reset guard: laktawan kapag ang naka-wall na 5-oras na window ay nag-reset sa loob ng `sessionResetGuardMinutes` (90), o ang naka-wall na lingguhang window sa loob ng `weeklyResetGuardHours` (12).
6. Lingguhang palapag: laktawan ang 5 oras na pag-reset kapag ang lingguhang natitira ay mas mababa sa `weeklyFloorPercent` (10).
7. `last-resort` mode: laktawan habang ang isa pang in-scope na account ng parehong provider ay may hindi bababa sa `poolHeadroomPercent` (10) na natitira sa parehong mga window. Na-bypass ito ng mga nag-trigger ng expiring-credit.
8. Nagre-record `dry-run` ng isang row at walang tinubos; I-redeem `last-resort` at `eager`.

Ang nawawalang data ng quota ay hindi kailanman nag-a-unlock ng isang redemption: isang hindi kilalang oras ng pag-reset o lingguhang paggamit ay lumalaktaw.

**Pag-reset ng session Claude :** kapag naka-off ang feature, o naka-off ang `claudeSessionReset`, ang per-account `autoLimitReset` toggle ay nagpapasya nang eksakto tulad ng dati. Sa parehong naka-on, pinapalitan ng feature ang mga toggle sa bawat account: ang isang nasa saklaw na account ay maaari lang mag-claim kapag pinayagan ito ng patakaran, at sa `dry-run` mode walang ginawang claim.

**Kaligtasan:** ang trabaho ay nagre-redeem ng hindi hihigit sa isang credit sa bawat tik, nagpasya bago maglista ng mga credit (ang isang nilaktawan na account ay hindi kailanman nakalista), gumagamit ng mga idempotency key `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`, at nag-back off ng isang account sa loob ng 1 h pagkatapos ng isang nabigong listahan o pagkuha. Ang bawat redemption, failure at dry-run na desisyon ay isinulat sa `audit_log` (`action: "bankedReset.redeem"`, walang mga token o credit id); ang mga takip ay binibilang mula sa mga row na iyon, kaya nakaligtas ang mga ito sa pag-restart. Pinapatakbo din ng mga matagumpay na pagkuha ang `provider.reset_redeemed` webhook.

Mga bantay ng regression: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Session affinity (#7274)

**Saklaw:** isang client session (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) na naka-pin sa isang connection, para sa **anumang** provider.

**Layunin:** panatilihin ang isang multi-turn agent (Claude Code, aider, custom agents) sa parehong account sa mga request, upang mabawasan ang pagkawala ng context sa pagitan ng account at ang paulit-ulit na cold-start 429 sa mga provider na may per-account session state.

**Implementation:**

- TTL resolution: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pagpili/paggawa ng pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Pagkuha ng header (generic, anumang provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persisted pin table: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (global TTL sa ms, `0` ay nagdi-disable) — `src/lib/db/settings.ts`. Pinalitan ang Codex-only na `codexSessionAffinityTtlMs` ng migration na `124_generic_session_affinity_ttl.sql`, na naglilipat ng anumang dating na-configure na Codex TTL bilang bagong default.

Bago ang #7274, ang `resolveSessionAffinityTtlMs()` ay agad na nagre-return ng `0` para sa bawat provider maliban sa `codex`, kaya walang epekto saanman ang TTL setting (at ang session header) kahit provider-agnostic na ang pinning mechanism at header extraction. Inalis ng fix ang maagang return na iyon; pantay nang nalalapat ang TTL sa bawat provider kapag global itong na-set nang higit sa `0`.

Ang tatlong session-affinity header ay hindi kailanman ipinapasa upstream — bumubuo ang mga executor ng sarili nilang upstream header mula sa simula sa halip na ipasa ang client header, kaya nananatili lamang itong internal correlation id.

### Mga exclusive managed session connection lease

**Saklaw:** isang aktibong managed HTTP client/session ang nagmamay-ari ng isang kwalipikadong koneksyon ng OmniRoute.

**Layunin:** magbigay ng matibay na eksklusibong pagmamay-ari ng koneksyon para sa mga client na nangangailangan ng mahigpit na routing
fence sa magkakasunod na request. Naiiba ito sa session affinity, na isang maluwag na kagustuhan para sa pagpapatuloy:
ang isang exclusive lease ay nagpapatuloy ng lifecycle state sa SQLite, nagpapatupad ng global na pagiging natatangi ng aktibong may-ari at
aktibong koneksyon, at tumatanggi sa lumang generation bago ang provider dispatch.

Opt-in ang feature na ito para sa bawat API key. Kailangang may `lease:exclusive` scope at tahasang hindi walang-lamang
`allowedConnections` list ang isang managed key. Maaaring gamitin ng anumang HTTP client ang lifecycle endpoint; hindi kinakailangan ang
pangalan ng client, user-agent, provider, OAuth method, o model. Koneksyon ang pagmamay-ari ng lease, hindi model, kaya ang pagpapalit
ng model ay nagpapanatili ng binding habang nananatiling karaniwang kwalipikado ang koneksyon. Mananatiling awtoritatibo ang mga
karaniwang panuntunan para sa model, quota, health, cooldown, at allowlist, at maaari nitong ilipat ang parehong generation sa isa pang
malaya at kwalipikadong koneksyon.

Ang lifecycle ay `POST /api/v1/session-leases` na may mga JSON action na `acquire`, `renew`, at `release`.
Inilalagay ng mga managed inference request ang opaque na `X-OmniRoute-Lease-Owner` value at eksaktong
`X-OmniRoute-Lease-Generation`. Gumagamit ang owner ng `vlo_` na sinusundan ng 43 base64url character; SHA-256 hash lamang nito ang
sine-save. Ang bawat final dispatch fence ay nagbibi-bind din sa authenticated API key ID at aktibong connection ID. Inaalis ang mga
lease control header mula sa mga log, retained request snapshot, at upstream executor header.

Kung may mga kwalipikadong managed candidate ang ordinary routing ngunit lahat ng malalayang candidate ay ginagamit ng isang foreign
active lease, nagbabalik ang OmniRoute ng HTTP `429`, lease-capacity-unavailable code, waiting-for-capacity state, at may hangganang
`Retry-After` na hinango mula sa pinakamalapit na nauugnay na expiry. Ang ordinaryong kawalan ng kwalipikasyon ay hindi lease contention
at pinananatili nito ang dati nitong routing error semantics.

Nananatiling magkahiwalay ang mga kaugnay na mekanismo:

- Ang OAuth session occupancy ay process-local na maluwag na distribution para sa mga OAuth account.
- Ang mga account semaphore ay nagbibigay ng mga permit para sa request concurrency at nagtatapos kapag nakumpleto ang isang request.
- Ang mga exclusive managed session lease ay matibay na lifecycle ownership na may generation fence.

## 3. Pagka-lockout ng Model

**Saklaw:** triple na provider + koneksyon + model.

**Saklaw ayon sa status:** tinutukoy ng status na nagdulot ng pagkabigo kung aling key ang susulatan ng lockout
sa (`resolveLockoutScope()` sa `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signal ng quota o entitlement — ila-lock ang **pamilya ng quota**:
  para sa codex, ang buong saklaw na `codex` / `spark` (lahat ng model na
  `gpt-5*` ng koneksyon), at para sa ibang provider, `getQuotaScopedModelForProvider()`.
- Ila-lock ng `404` ang payak na model (`getModelLockKey()` ang nagpapaliit sa `not_found`).
- Anumang ibang status — mga pagkabigo sa transport/server na `5xx` at sariling
  synthesized na `502` ng OmniRoute mula sa quality validation — ang nagla-lock sa
  **eksaktong** tuple na provider/koneksyon/model lamang. Ang sirang stream sa isang
  model ay hindi ebidensiya tungkol sa quota ng account; bago ang panuntunang ito, isang
  walang-laman na response sa `codex/gpt-5.6-luna` ay nag-aalis sa bawat model na `gpt-5*`
  ng koneksyong iyon sa routing sa loob ng 2–30 minuto (lumalala sa bawat pag-ulit)
  habang hindi nagagalaw ang quota nito.
- Palaging mananaig ang tahasang opsyong `scope` ng tumatawag (ipinapasa ng Antigravity ang `"exact"`).

**Layunin:** maiwasang i-disable ang buong koneksyon kapag isang model lamang ang hindi available o limitado ang quota.

**Mga halimbawa:**

- Mga provider na may quota bawat model na nagbabalik ng 429
- Mga lokal na provider na nagbabalik ng 404 para sa isang nawawalang model
- Mga pagkabigo sa pahintulot na partikular sa provider para sa mode/model (hal., mga mode ng Grok)

**Implementasyon:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard ng mga Cooldown ng Model (v3.8.0)

UI: Mga Setting → Mga Cooldown ng Model (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Naglilista ng mga aktibong lockout kasama ang: provider, koneksyon, model, dahilan, expiresAt. Maaaring manu-manong muling paganahin ng mga operator ang isang model mula sa card.

**REST API:**

- `GET /api/resilience/model-cooldowns` — ilista ang mga aktibong lockout
- `DELETE /api/resilience/model-cooldowns` — manu-manong muling paganahin. Body: `{provider, connection, model}`. Auth: management.

### Tagapamahala ng Cooldown

UI: Monitoring → Tagapamahala ng Cooldown (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Isang page para sa bawat koneksyong wala sa routing dahil sa pansamantalang dahilan, sa halip na
buksan ang page ng bawat provider. Inililista nito ang mga cooldown ng koneksyon, mga lockout ng model at mga terminal
state, nililinis ang mga ito ayon sa koneksyon, para sa isang pinili, o para sa lahat ng koneksyon ng isang provider,
at ine-edit ang mga panuntunan ng cooldown na pinakadalas baguhin: `streamStallCooldown.enabled` at ang
base cooldown at maximum na bilang ng backoff step ng OAuth / API-key na `connectionCooldown` (sine-save sa pamamagitan ng
`PATCH /api/resilience`). Inililista ang mga terminal state (`banned`, `expired`, `credits_exhausted`) ngunit hindi kailanman
nililinis dito.

Ang card na **Mga panuntunan sa cooldown ng error** sa parehong page ang nag-e-edit sa mga panuntunan ng operator sa error
(`settings.providerErrorRules`) at sa mga default na catch-all ng bawat provider
(`settings.providerErrorDefaults`) sa pamamagitan ng `PATCH /api/settings` — tingnan ang "Mga panuntunang
idineklara ng operator" sa ilalim ng §7 para sa paraan ng pagtutugma ng mga ito. Ang mga tagal ay Default (walang tahasang cooldown), 30 minuto,
1 oras, 5 oras, 24 oras, o custom na 1 hanggang 43,200 minuto (30 araw).

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — mga koneksyong may status, natitirang cooldown,
  antas ng backoff, huling uri ng error at mga lockout ng model (walang kredensyal)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` o
  `{all: true, provider?}`; nagbabalik ng `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI ng mga setting ng lockout + recovery sa pamamagitan ng paghina sa tagumpay (v3.8.23)

Ang lockout ng model ay mula sa laging naka-on at hardcoded na asal tungo sa isang ganap na nako-configure,
opt-in na feature na may sarili nitong card ng mga setting at self-healing na recovery path.

**Card ng mga setting:** Mga Setting → Lockout ng Model
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ito ay **hiwalay** sa read-only na `ModelCooldownsCard` sa itaas (na nag-
_naglilista_ lamang ng mga aktibong lockout) — ang bagong card ang _nagko-configure ng mga parameter_. Nasa
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) ang mga default:

| Setting                 | Default                          | Kahulugan                                                                             |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Master toggle — **naka-off bilang default ang lockout ng model**.                     |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Mga upstream status na itinuturing na pagkabigong saklaw ng model.                    |
| `baseCooldownMs`        | `120_000` (120 s)                | Paunang tagal ng lockout para sa unang pagkabigo.                                     |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Pinakamataas na tagal ng lumalalang cooldown.                                         |
| `maxBackoffSteps`       | `10`                             | Pinakamataas na bilang ng hakbang ng exponential-backoff escalation.                  |
| `useExponentialBackoff` | `true`                           | Kung dapat bang palalain nang exponentially ang cooldown sa paulit-ulit na pagkabigo. |

Nananatili ang mga setting sa pamamagitan ng normal na settings store at bino-validate gamit ang
resilience settings schema; nililimitahan ng card ang `baseCooldownMs`/`maxCooldownMs`
(kung saan `maxCooldownMs ≥ baseCooldownMs`) at `maxBackoffSteps`.

**Recovery sa pamamagitan ng paghina sa tagumpay:** ang recovery ay **hindi** puro pag-expire ng timer. Ibinababa ng
malusog na response ang bilang ng pagkabigo ng model upang ang isang model na gumaling
sa kalagitnaan ng window ay tumigil sa paglala (at ma-clear) bago pa ang itinakdang timer. Sa matagumpay na combo target,
tinatawag ng `open-sse/services/combo.ts` ang `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), na **hinahati sa kalahati** ang nakaimbak na
`failureCount` (`Math.floor(failureCount / 2)`); kapag umabot ito sa `0`, tuluyang binubura ang entry ng lockout. Ang katapat na
`recordModelLockoutFailure()` ay nagdaragdag sa bilang (at nagpapalala sa cooldown) kapag may mga pagkabigong naganap sa loob ng
window ng escalation. Dagdag ang success-decay na ito sa karaniwang pag-expire ng timer —
alinman sa dalawang path ay maaaring muling mag-enable ng model.

**Estado:** ang mga lockout ay pinapanatili **sa memory** (mga `Map` na
nakahiwalay sa bawat proseso para sa `ModelLockoutEntry`, na naka-key ayon sa
`provider:connectionId:model`; ang mga lock na may eksaktong saklaw ay naka-key ayon sa
`provider:connectionId:exact:model`), at hindi sine-save sa
DB — nawawala ang mga ito kapag nag-restart. Ang _mga setting_ ay sine-save; ang aktibong
_ estado ng lockout_ ay pansamantala.

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

## 7. Muling Pagpapahayag ng Status ng Upstream (maling quota errors)

**Saklaw:** isang upstream gateway na nag-uulat ng pansamantalang pagkaubos ng quota gamit ang maling HTTP status.

**Layunin:** itama ang mapanlinlang na status BAGO ang classification, upang makita ng mga downstream consumer (fallback engine, combo aggregation, at response na ipinapadala sa client) ang tunay na retryable na katangian ng failure.

May ilang gateway na nagsesenyas ng PANSAMANTALANG pagkaubos ng quota gamit ang HTTP
status na hindi maaaring i-retry. Nagbabalik ang `agentrouter.org` ng `403` (kung minsan ay `400`) na may Chinese body
(`用户额度不足` / `额度不足`) sa halip na karaniwang `429`. Itinuturing ng mga client gaya ng Claude
Code na permanente ang `403` at ina-abort ang session, at kung walang correction,
uuriin ito ng fallback engine bilang `AUTH_ERROR` sa halip na isang quota
event.

**Implementation:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — isang
  listahan ng mga rule bawat provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), na tina-match sa pamamagitan ng `applyStatusRestatement()`.
- Call site: ang `providerFailure:` block sa `open-sse/handlers/chatCore.ts`
  (bandang line 3654), kaagad matapos i-parse ng `parseUpstreamError()` ang isang upstream
  response na may error HTTP status (`!providerResponse.ok`), at bago tumakbo ang anumang
  classification, upang makita ng bawat downstream consumer ang itinamang status. Ang mga error
  na naka-embed sa loob ng `200` SSE stream ay dumadaan sa hiwalay at
  mas huling stream-parsing path at **hindi** saklaw ng hook na ito sa kasalukuyan —
  isang kilalang limitasyon na hindi pa kailangan para sa misstatus ng agentrouter
  (na lumilitaw bilang error HTTP status).
- Retry eligibility: kabilang ang `429` sa `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), kaya ang isang restated error
  ay may tunay na retry window sa halip na lumitaw bilang patay na `403`.
- Ang synthetic na `60s` na `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  ay ang sinasabi lamang ng restated response sa **client**; hindi ito mismo
  ang internal cooldown/lockout duration ng connection — hiwalay itong pinamamahalaan
  ng mekanismong aktuwal na humahawak sa restated error
  (Connection Cooldown na may lumalaking backoff, §2, base na `3s` para sa mga API-key
  provider; o Model Lockout, §3, para sa mga provider na may per-model-quota gaya ng
  agentrouter). Maaaring maging eligible ang router na mag-retry sa loob nang mas maaga
  kaysa sa 60s window na ipinapaalam nito sa client — sinadya itong karagdagang palugit,
  hindi bug.

Ang mga permanent error (ang `无权访问模型` ng agentrouter — walang access sa modelong ito) ay
HINDI KAILANMAN nire-restate: bina-veto ng `excludeMarkers` ang rule kahit tumama ang
`textMarkers`, kaya nananatili ang orihinal na status ng error at walang anumang
magre-retry rito nang walang hanggan. Ang tumutugmang provider classification rule
(`agentrouter-model-access-denied` sa `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, at may idineklarang `6h` na base cooldown) ay
sinusuri ng `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_bago_ ang generic na apikey-category na `FORBIDDEN` early-return, na may gate na
`honorsRuleLockScope(provider)` (#10334 — kasalukuyang eksklusibo sa agentrouter sa pamamagitan ng
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist sa
`providerErrorRules.ts`). Dumadaloy ang idineklarang 6h cooldown ng rule bilang
`fallbackResult.baseCooldownMs`, ngunit ipinapasok pa rin ito sa dati nang
per-model-quota lockout path (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, na hindi binago ng #10334 maliban sa pinagmumulan ng
cooldown): ibinababa ito hanggang sa `mlSettings.maxCooldownMs` ng operator
(default na `1_800_000ms` / 30min), gaya ng lahat ng iba pang model lockout, at ang
_naka-persist na lockout reason_ ay nananatiling dati nang hardcoded na `"forbidden"`,
hindi ang `"auth_error"` ng rule — ang tagal lamang ng cooldown ang pinararangalan
end-to-end, hindi ang reason string. Nananatiling aktibo ang connection mismo;
hindi naaapektuhan ang mga sibling model sa parehong connection.

Ang mga restated quota error (`额度不足`) ay umaabot sa isang provider rule sa production
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, walang sariling idineklarang cooldown — ginagamit ang scaled backoff default ng persistence layer).
Mula #10334, ang `scope` sa `ProviderErrorRuleMatch` AY ginagamit end-to-end, ngunit
para lamang sa mga provider na nasa `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist
(`providerErrorRules.ts` — sa kasalukuyan ay `"agentrouter"` lamang, na may gate sa pamamagitan ng
`honorsRuleLockScope()`). Para sa lahat ng iba pang provider, nananatiling
impormasyonal ang `scope`, eksakto gaya noong bago ang #10334.
Inilalabas ng `checkFallbackError` ang scope ng tumugmang rule bilang
`fallbackResult.ruleScope`; ang `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ang shared guard na kumukumpirmang tunay na ligtas
gamitin ang `ruleScope` bilang signal na sumasaklaw sa buong connection at
kusang makakabawi (scope na `"connection"`, reason na `quota_exhausted`, hindi kailanman
`permanent`, at hindi kailanman `creditsExhausted` — depensa laban sa posibleng
future rule na magtutugma ng scope na `"connection"` sa permanent account state). Dalawang consumer ang tumatawag dito:

- **Pagpapatuloy** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  sa halip na mapunta sa **per-model** lockout branch ng passthrough-provider
  (ang agentrouter ay `passthroughModels: true` → nagbabalik ng `true` ang
  `hasPerModelQuota()`), naglalapat ito ng **pansamantalang cooldown ng koneksyon** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, at hindi kailanman isang terminal status
  (`credits_exhausted`/`banned`/`expired`) — upang awtomatikong makarekober ang koneksyon
  kapag lumipas na ang cooldown sa halip na mangailangan ng manu-manong pag-reset ng credential.
  Nilalaktawan ito para sa mga koneksyong may `disableCooling: true` (#2997): ang opt-out na iyon
  ay nagpapatuloy sa per-model lockout sa halip (isang trade-off na nakadokumento —
  tingnan ang komento sa code sa itaas ng branch).
- **Pag-route ng combo sa parehong request** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): minamarkahan din ng parehong guard
  ang koneksyon sa in-memory na `exhaustedConnections` set, na may key na
  `${provider}:${connectionId}`. Nilalaktawan lamang nito ang natitirang SAME-REQUEST
  target na _may dala na mismo ng eksaktong `connectionId` na iyon_ sa sarili nitong target object
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` bago ang lookup sa `exhaustedConnections`) — ang isang payak na
  model-list combo, kung saan walang sariling naka-pin na `connectionId` ang mga sibling target
  at isa lamang ang nireresolba sa bawat dispatch mula sa `X-OmniRoute-Selected-Connection-Id`
  header ng response, ay hindi kailanman tumatama sa key match na iyon. Para sa karaniwang
  kasong ito, ang aktuwal na proteksiyon laban sa muling paggamit ng natitirang leg sa
  katatapos lamang maubos na account ay HINDI ang Set na ito — ang persistence layer sa itaas
  (nasa hinaharap na ngayon ang `rateLimitedUntil` ng koneksyon) na sinamahan ng parehong guard
  na pumipigil sa `transientRateLimitedProviders` para sa failure (tingnan ang "Disenyong
  may dalawang yugto" at ang komento sa code sa `isAgentrouterConnectionQuotaScope` branch sa
  `targetExhaustion.ts`): kapag hindi minarkahan ang Set na iyon, ang force-allow ng
  `allowRateLimitedConnection` sa `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ay HINDI maa-activate para sa
  mga natitirang leg ng provider, kaya normal na igagalang ang filter na `rateLimitedUntil`
  ng pagpili ng credential (`src/sse/services/auth.ts:1238`) at ang natitirang leg ay maaaring
  pumili ng ibang agentrouter connection na kwalipikado pa, o mabigo nang walang available na
  credential — hindi nito pipilitin ang sarili nitong bumalik sa koneksyong katatapos lamang
  palamigin ng branch na ito.

### Disenyong may dalawang yugto: muling pagsasaad ng status, pagkatapos ay klasipikasyon

Ang muling pagsasaad ng status (`upstreamStatusRestatement.ts`) at ang mga panuntunan sa
klasipikasyon ng provider (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ay magkahiwalay na registry na parehong gumagamit ng provider id
at mga text marker bilang key, ngunit tumatakbo sa magkakaibang lugar at may magkakaibang
layunin: nire-rewrite ng restatement ang HTTP status nang maaga sa `chatCore.ts`;
pinipili naman ng mga classification rule ang fallback na `reason` at inaayos ang `scope`
(`model` / `provider` / `connection`) sa loob ng `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Nakikita lamang ng mga classification rule ang buong **text** ng error (kinakailangan upang
tumugma sa mga body marker tulad ng `额度不足`) para sa mga provider na nakalista sa
`FULL_TEXT_RULE_PROVIDERS` allowlist sa `providerErrorRules.ts` — sa kasalukuyan,
`"agentrouter"` lamang. Para sa bawat iba pang **built-in catalog** provider, ipinapasa ng
`checkFallbackError` sa `getProviderErrorRuleMatch` ang structured error lamang
(`{code, type}`), na sapat para sa mga panuntunang batay sa header/status/code ngunit hindi
nakakakita ng mga marker mula sa body text. Ang helper na `resolveRuleMatchBody()` ang
nagsasagawa ng pagpiling ito: buong text ng error para sa mga provider na nasa allowlist,
at structured error para sa iba pa. Ang pagdaragdag ng isang **built-in** provider sa
`FULL_TEXT_RULE_PROVIDERS` ay isang tahasang per-provider opt-in — umiiral ito upang manatiling
eksaktong pareho sa byte level ang default path para sa bawat provider na wala sa listahan.

Ang `scope` ng isang rule (`model` / `provider` / `connection`) ay hiwalay na opt-in mula sa
`FULL_TEXT_RULE_PROVIDERS`: inilalantad lamang ito ng `checkFallbackError` bilang
`fallbackResult.ruleScope`, at iginagalang lamang ito ng mga downstream consumer bilang
higit pa sa isang label na nagbibigay-impormasyon, para sa mga provider na nasa
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist sa parehong file (kinokontrol sa pamamagitan ng
`honorsRuleLockScope()` — sa kasalukuyan, `"agentrouter"` lamang). Tingnan ang "Mga error sa
quota na muling isininaad" sa itaas para sa aktuwal na ginagawa ng isang `scope: "connection"`
match kapag nasa allowlist na iyon ang isang provider.

**#11104 — nilalampasan ng mga panuntunang idineklara ng operator ang parehong allowlist.**
Maaaring magdeklara ang isang operator ng per-provider rule sa runtime sa pamamagitan ng
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) nang hindi
ine-edit ang file na ito. Ang pag-gate sa isang operator rule sa likod ng
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — mga allowlist na nilalayong
protektahan ang **default** na gawi ng mga built-in catalog rule — ay gagawing walang epekto
ang settings mechanism para sa bawat provider maliban sa mga nakalista na roon, dahil ang
pagdeklara ng rule ay tahasan nang opt-in ng operator. Parehong sinusuri muna ng
`resolveRuleMatchBody()` at `honorsRuleLockScope()` ang `hasOperatorRuleForProvider()`:
ang provider na may operator rule ay nakakakuha ng raw error text at iginagalang ang
idineklarang `scope`, kahit lumitaw man ito sa alinman sa dalawang allowlist.

**Mga panuntunang idineklara ng operator** (`OperatorProviderErrorRule`): bawat rule ay may
opsyonal na `status` at opsyonal na `match` (isang payak, case-insensitive na substring ng
error text, hindi kailanman isang RegExp, kaya hindi ito maaaring magdulot ng ReDoS), at dapat
magtakda ng kahit isa sa dalawa. Kapag parehong itinakda, AND ang kondisyon ng mga ito;
ang iniwang field ay tumutugma sa anuman, kaya ang `{match: "insufficient_quota"}` ay
tumutugma sa anumang status na may dalang code na iyon. Nauuna ang unang tumutugmang rule.
Tumatanggap ang `cooldownMs` ng hanggang 30 araw; hanggang 50 rule lamang sa kabuuan.

**Mga default na sumasaklaw sa lahat** (`settings.providerErrorDefaults`, opt-in, itinatakda sa pamamagitan ng
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
kung saan ang `cooldownMs` ay mula 1 minuto hanggang 30 araw. Nalalapat ang isang default
lamang kapag walang tumugmang operator rule at walang tumugmang built-in catalog rule, at
para lamang sa mga error na 402, 403, 408, 429 at 5xx. Ang mga error na may hugis ng
request (400, 404, 409, 413, 422) at ang mga simpleng 401 ay nananatili sa sarili nilang
handling. Kapag walang tahasang `reason`, kinukuha ang reason mula sa status, gaya ng
ginagawa ng `classifyError`. Ang pagdeklara ng default ay itinuturing na operator rule para sa
`hasOperatorRuleForProvider()`, kaya iginagalang ang `scope` nito (default na
`"connection"`). Ang epektibong cooldown ng isang default ay ang mas matagal sa
`cooldownMs` nito at sa sariling retry hint ng provider (`Retry-After`,
`x-ratelimit-reset` o reset hint sa body, ang parehong hint na iginagalang ng engine kapag
naka-on ang setting na "use upstream retry hints" ng connection-cooldown),
kaya maaaring pahabain ng default ang maikling upstream hint ngunit hindi nito kailanman
paiikliin ang isang aktuwal na reset. Pinananatili ng tahasang operator rule ang eksaktong
`cooldownMs` nito. Hindi nilalampasan ng rule o default ang mga guard ng
connection-cooldown sa `markAccountUnavailable`: hindi kailanman paiikliin ang aktibo at
mas mahabang cooldown, at hindi kailanman mapapalitan ang terminal status. Ang mga built-in
text detector na nauunang tumakbo sa `checkFallbackError` (naubos na credits, daily quota,
na-deactivate na account) ay nananatiling may priyoridad para sa sarili nilang mga parirala.

**Nabatid na puwang — hindi kailanman kinokonsulta ang `providerRuleRegistry` para sa HTTP 400.**
Ang sangay na `BAD_REQUEST` ng `checkFallbackError` ay ganap na nag-uuri sa status 400
gamit ang sarili nitong mga pattern array (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, at iba pa sa `accountFallback.ts`) at nagbabalik bago
maabot ang sangay na `configuredRule`/`getProviderErrorRuleMatch` sa itaas.
Ang isang built-in catalog rule (o operator rule) na may `status: 400` ay wastong
syntactically valid ngunit hindi kailanman gagana. Walang kasalukuyang rule na nagta-target
sa 400, kaya walang naaapektuhan sa production — ngunit kailangang baguhin muna ang
sangay na ito para sa isang 400 rule sa hinaharap. Mas malaking pagbabago ito kaysa sa
pagdaragdag ng rule (muli nitong inuuri ang 400 para sa bawat provider na umaasa na sa
gawi ng pattern-array) at wala ito sa saklaw ng pagdaragdag ng rule para sa isang provider
lamang.

### Pagdaragdag ng bagong gateway na nagkakamali sa quota

1. Magrehistro ng isang rule array sa `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Panatilihing partikular sa provider ang
   `textMarkers`; huwag kailanman gumamit muli ng mga generic na pariralang Ingles na
   sumasalungat sa `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opsyonal na magrehistro ng mga classification rule sa
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) upang piliin ang tamang
   saklaw ng lock (`connection` para sa quota ng buong account, `model` para sa mga error
   na partikular sa modelo). Nagkakabisa lamang ang hakbang na ito sa production para sa
   mga provider na nangangailangan ng buong error text ng kanilang mga rule (mga body
   marker): idagdag ang provider id sa `FULL_TEXT_RULE_PROVIDERS` sa parehong file —
   kung hindi, ang `checkFallbackError` ay magpapasa lamang sa rule ng structured
   `{code, type}` na error at hindi kailanman tutugma ang isang body-text rule sa live
   traffic. Ang mga rule na tumutugma lamang sa `status`/`headers` (gaya ng mga rule ng
   Opencode o Minimax) ay hindi nangangailangan ng opt-in na ito. Hiwalay dito, kung
   nagdedeklara ang rule ng `scope: "connection"` at ang layunin ay isang aktuwal na
   connection-wide cooldown kasama ang same-request combo skip (hindi lamang isang
   impormasyonal na label), idagdag ang provider id sa
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` sa parehong file — ito ang kumokontrol sa
   paggamit na gaya ng `isAgentrouterConnectionQuotaScope()` sa `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) at `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); kung wala ito, dumadaloy pa rin ang
   `scope` sa `fallbackResult.ruleScope` ngunit walang kikilos dito.
3. Magdagdag ng mga unit test na tumutulad sa
   `tests/unit/upstream-status-restatement.test.ts`
   at `tests/unit/agentrouter-error-rules.test.ts` (kabilang ang mga guard na
   not-permanent / not-creditsExhausted, at — kung kailangan ng provider ang allowlist —
   isang test na nagpapatunay na ang `resolveRuleMatchBody()` ay nagbabalik ng buong text
   para lamang sa provider na iyon).

Walang kinakailangang pagbabago sa `chatCore.ts`, `classifyError`, o combo.

#### Egress-bucketed lock (#10880)

Ang mga provider sa `EGRESS_BUCKETED_LOCK_PROVIDERS` (pamilyang opencode) ay itinuturing
na upstream na naka-bucket ayon sa IP (ang libreng tier ng opencode ay naka-bucket ayon sa
IP, hindi ayon sa account — tingnan ang #9611): ang status-429 na nauuri bilang
`quota_exhausted` **o** `rate_limit_exceeded` ay nagpapalamig sa bawat connection ng
allowlisted family na ang huling alam na egress IP ay tumutugma sa IP ng nabigong
connection, bago ito subukang i-rotate
— upang maiwasan ang N-1 na upstream call na tiyak na mabibigo (kapareho ng hugis ng
#10460/#10525). Sinasadyang isama ang `rate_limit_exceeded`: sa path ng
`markAccountUnavailable`, hindi kailanman tumutugma ang mga partikular na rule ng opencode
(dahil walang headers/body na ipinapasa sa `checkFallbackError`, at wala ang opencode sa
`FULL_TEXT_RULE_PROVIDERS`), kaya ang isang 429 na ang body ay may text tungkol sa quota ng
subscription ("monthly usage limit reached") ay inuuri bilang `quota_exhausted` ng
quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown)
bago pa maabot ang `status_429` rule — samantalang ang 429 na walang quota text (payak na
rate limiting) ay inuuri sa pamamagitan ng `status_429` rule bilang
`rate_limit_exceeded` at pinapalamig pa rin ang IP family. Para sa isang allowlisted
provider, ang rate limit na naka-bucket ayon sa IP ay kaparehong signal ng naubos na quota.
Mga tapat na limitasyon:

- **Pinakamahusay na pagsisikap**: nireresolba ng lock ang huling nalalamang `egress_ip` ng connection mula sa `proxy_logs` (24 na oras na window, synchronous, walang cache). Kapag cold ang cache (hindi pa kailanman na-probe ang egress IP) o walang row → pinalalamig pa rin ng branch ang failing connection (naitatala tulad ng dati), ngunit walang sibling na nilo-lock.
- **Hindi kailanman terminal**: ang cooldown ay isang nare-renew na quota window
  (`testStatus: "unavailable"`); hindi kailanman hinahango ang permanenteng state mula sa signal sa antas ng IP. Lubusang nilalaktawan ng mga connection na may `disableCooling` ang branch.
- **Nagbabago ang granularity ng lock para sa allowlisted family**: pagbabago ito ng scope, hindi lamang pag-optimize sa sibling. Ang opencode ay isang `passthroughModels` provider, kaya bago ang branch na ito, ang 429 ay nagdudulot ng per-MODEL lockout; ngayon ay nagdudulot ito ng cooldown ng connection — kabilang ang operator na nagpapatakbo ng iisang connection na walang sibling. Ito ang granularity na idinedeklara nang tama ng opencode rule table (`scope: "connection"`,
  `providerErrorRules.ts`), ngunit hindi pa kailanman iginalang dahil wala ang opencode sa `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Ang branch mismo ang nagsusulat ng cooldown ng failing connection at ng `backoffLevel`, na ginagaya ang connection-scoped agentrouter branch, at pagkatapos ay nagbabalik — hindi kailanman naaabot ang per-model block at ang generic path sa ibaba.
- **Kasama ang combo**: tulad ng agentrouter branch, sadyang binabalewala ng scope ang downgrade na `persistUnavailableState`/`isCombo` na ina-apply ng combo caller sa isang 429. Ang per-model lockout ay hindi mas mahinang anyo ng scope na ito; maling unit ito: wala itong sinasabi tungkol sa naubos na IP, kaya patuloy na magsusunog ang combo rotation ng isang garantisadong mabigong tawag sa bawat sibling.
- **Kaligtasan ng sibling**: hindi kailanman ino-overwrite ang sibling na terminal na (banned/credits_exhausted) o nasa mas mahabang cooldown na.
- **Eksklusibong allowlist**: ang pagpapalawak ng `EGRESS_BUCKETED_LOCK_PROVIDERS` ay hayagang desisyon ng owner; walang generic na wiring (pattern #10334/#10419). Ibinabind ng sibling query ang parehong allowlist sa halip na ulitin ito bilang SQL literal, kaya ang pagpapalawak dito ay nananatiling one-line change.
- **Pag-ikot ng egress IP, sa parehong direksiyon**: mas malawak nang husto ang lookup window (24 na oras) kaysa sa TTL ng cache ng egress-IP (5 minuto), kaya ang “huling nalalamang IP” ay kasaysayan, hindi kasalukuyang state. Kung umikot ang proxy ng isang connection sa loob ng window, maaaring **hindi makita** ng lock ang tunay na shared IP (ang naitalang IP ay ang bago at hindi pa nauubos) — at sa simetrikong paraan, maaari nitong **palamigin ang isang sibling na mula noon ay umikot na palayo** sa naubos na IP. Ang ikalawang kaso ay nagkakahalaga sa sibling na iyon ng isang cooldown window; parehong tinatanggap ang mga ito bilang best-effort na limitasyon ng lookup na nakabatay sa kasaysayan.
- **Gastos**: dalawang bounded scan ng `proxy_logs` (na sinasala ayon sa window sa pamamagitan ng `idx_pl_timestamp`), at ginagawa lamang sa dalas ng 429. Walang bagong index (migration 134 YAGNI). Sinukat sa isang DB copy na may totoong traffic at katamtamang laki; ang instance na mataas ang throughput ay may proporsyonal na mas maraming row sa parehong window.

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
