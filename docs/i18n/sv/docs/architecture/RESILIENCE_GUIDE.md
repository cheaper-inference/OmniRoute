# Resilience Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute har tre distinkta men relaterade motståndsmekanismer. Var och en har olika omfattning och syfte. Håll dem åtskilda när du felsöker routingbeteende.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Källa: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-dashboard-företräde för resilience-växlingar.** Opt-in resilience växlar seeded från miljön — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — tillhandahåller endast _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). En boolean kvarstod i `resilienceSettings` (Dashboard →** Inställningar → Resilience** / `PATCH /api/resilience`, lagrad i `key_value`) vinner över env-värdet: normalisering (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) behåller den lagrade boolean när en sådan existerar. Att ställa in en sådan env var till `true` på en distribution där instrumentpanelen redan har sparat `false` ändrar därför ingenting — vänd reglaget in** Inställningar → Resilience** (eller rensa det lagrade fältet) istället.

## 1. Kretsbrytare för provider

**Omfattning:** hela providern (t.ex. `glm`, `openai`, `anthropic`).

**Syfte:** sluta skicka trafik till en provider som upprepade gånger misslyckas på uppströms-/tjänstenivå.

**Implementering:**

- Kärnklass: `src/shared/utils/circuitBreaker.ts`
- Koppling: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- Återställnings-API: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- DB-tabell: `domain_circuit_breakers`

**Tillstånd:**

- `CLOSED` — normal trafik tillåts
- `DEGRADED` — trafik tillåts fortfarande, men förhöjda providerfel spåras; återgår till `CLOSED` efter tillräckligt många lyckade anrop, vid ett giltigt anslutningstest, eller efter den längsta `OPEN`-hålltiden för den senaste feltypen (dess `cooldownByKind`-värde, annars `resetTimeout`, × `maxBackoffMultiplier`, minst en cooldown) utan ett nytt fel
- `OPEN` — providern blockeras tillfälligt; combo-routning hoppar över den
- `HALF_OPEN` — återställningstiden har löpt ut; en sonderingsförfrågan tillåts

**Konfigurerbara standardvärden (`open-sse/config/constants.ts`, visas i Dashboard → Settings → Resilience):**

| Klass   | Degraderas vid | Öppnas vid | Återställningstid |
| ------- | -------------- | ---------- | ----------------- |
| OAuth   | 5 fel          | 8 fel      | 60s               |
| API-key | 7 fel          | 12 fel     | 30s               |
| Local   | härledd        | 2 fel      | 15s               |

`degradationThreshold` styr när en provider går in i `DEGRADED`; `failureThreshold` styr när den öppnas och hoppas över. Lokala providerprofiler exponeras ännu inte på inställningssidan Resilience.

**Utlösningskoder:** endast statuskoder på providernivå `[408, 500, 502, 503, 504]`. Utlös INTE för fel på kontonivå (de flesta 401/403/429 — de hör till cooldown eller lockout).

**Lat återhämtning:** när `OPEN` löper ut uppdaterar `getStatus()`, `canExecute()`, `getRetryAfterMs()` tillståndet till `HALF_OPEN`. Samma avläsningar (och nästa fel) får ett föråldrat `DEGRADED` att avta tillbaka till `CLOSED`. Ingen bakgrundstimer behövs.

---

### Valfri global Provider Cooldown (fönsterspärr)

Ett fjärde, **valfritt** lager (`PROVIDER_COOLDOWN_ENABLED`, standard **av**)
behåller ett förfrågningsövergripande minne av misslyckade providers i
`open-sse/services/providerCooldownTracker.ts`, som combo-målupplösningen
rådfrågar så att på varandra följande combo-förfrågningar slutar gå igenom en
provider som precis misslyckats. Poster på providernivå följer
`PROVIDER_PROFILES`-fönsterspärren:

| Profil  | utlöses efter (`providerFailureThreshold`) | inom (`providerFailureWindowMs`) | kyler ned i (`providerCooldownMs`) |
| ------- | -----------------------------------------: | -------------------------------: | ---------------------------------: |
| OAuth   |                                       `10` |                          `15min` |                             `5min` |
| API key |                                       `15` |                          `30min` |                            `10min` |

Under tröskelvärdet anses providern **inte** kyla ned; en lyckad förfrågan
rensar fönstret. Poster på anslutningsnivå (`provider:connectionId`) behåller i
stället den exponentiella `minRetryCooldownMs → maxRetryCooldownMs`-backoffen.
Åsidosättningar:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressionsskydd: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Anslutningskarantän

**Omfattning:** en enskild leverantörsanslutning/ett enskilt konto/en enskild nyckel.

**Syfte:** hoppa över en felaktig nyckel medan andra anslutningar för samma leverantör fortsätter att betjäna begäranden.

**Implementering:**

- Markera som otillgänglig: `src/sse/services/auth.ts::markAccountUnavailable()`
- Urval: `getProviderCredentials*` i samma fil
- Beräkning av karantän: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Inställningar: `src/lib/resilience/settings.ts`

**Fält per anslutning:**

- `rateLimitedUntil` — tidsstämpel tills karantänen upphör
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — exponentiell räknare för backoff

**Standardkarantäner:**

- OAuth-bas: 5 s
- API-nyckelbas: 3 s
- API-nyckel 429: föredrar upstream-headers för `Retry-After`/återställning/parsbar återställningstext
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Fördröjning för nya försök per leverantör.** Leverantörens detaljsida har ett **Retry delay**-val (Auto,
15 s upp till 1 h). Det sparar `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, via `PATCH /api/resilience`). När ett hastighetsbegränsningsfel inte innehåller någon upstream-ledtråd för nytt försök,
ersätter det värdet den skalade backoff-tiden för leverantören och återställer `backoffLevel` till 0
(`open-sse/services/rotationConfig.ts::overrideFor`). Prioritet för ett hastighetsbegränsat fel, högst först: upstream-ledtråd för nytt försök, därefter `providerSpecificData.rotationOverrides.rateLimitResetSeconds` per anslutning,
därefter fördröjningen för nya försök per leverantör, därefter
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` från miljön, och slutligen
den skalade backoff-tiden. Auto tar bort fältet. Det påverkar endast orsaken för hastighetsbegränsning, aldrig terminala tillstånd.

**Skydd mot överbelastning vid samtidiga fel:** förhindrar att samtidiga fel förlänger karantänen för mycket eller ökar `backoffLevel` två gånger.

**429-fel på grund av samtidighetsbegränsning klättrar inte i backoff-stegen.** En `429` vars brödtext rapporterar en
samtidighetsbegränsning ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) innebär att kontot är friskt men upptaget.
`checkFallbackError()` returnerar orsaken `concurrency_limited`: växla över till nästa
anslutning omedelbart, placera denna i karantän under en fast `CONCURRENCY_LIMIT_COOLDOWN_MS`
(1 s) eller enligt upstream-ledtråden för nytt försök, behåll `backoffLevel` oförändrad och ange
`skipProviderBreaker`.
En uttrycklig kvottext har fortfarande företräde, så en brödtext som även matchar ett kvotmönster förblir ett kvotbeslut. Detektering: `looksLikeConcurrencyLimit()` i `src/shared/utils/classify429.ts`;
beslut: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (brytarens `FailureKind`)
är oförändrad och läser fortfarande `rate_limit` för dessa brödtexter.

**Stopp i ströminnehåll placerar inte kontot i karantän.** När övervakaren för innehållsstopp
(`open-sse/utils/streamHandler.ts`) ger upp på en ström som inte skickade någon modellutdata i tid,
registrerar `markAccountUnavailable()` felet på anslutningen men anger ingen karantän: stoppet hör till den begäran, oftast en lång resonemangsomgång utan utdata ännu. Operatörer kan aktivera detta igen med `resilienceSettings.streamStallCooldown.enabled`
(standard `false`).

**Valfri latenssignal för kontourval med `p2c`.** Varje distribuerat försök registrerar sin tid till första byte och sitt resultat per anslutning (och per anslutning + modell) i ett rullande minnesfönster: de senaste 20 mätvärdena inom 15 minuter
(`open-sse/services/connectionLatencyTracker.ts`, registrerade från
`safeLogEvents()` i `src/sse/handlers/chatHelpers.ts`). När `resilienceSettings.p2cLatency.weight` är större än
`0` (intervall 0–20, standard `0` = av), lägger `compareP2CConnections()` i `src/sse/services/auth.ts` till
upp till `weight` poäng för varje kandidat i paret. Hälften kommer från latens som ett förhållande till den snabbare kandidaten (dubbelt så långsam ger hela halvan) och hälften från den rullande felfrekvensen.
Termen används endast när båda kandidaterna har minst 3 mätvärden, så nya konton missgynnas inte, och dess tak förblir under straffen för kvotblockerade och kvotuttömda anslutningar.
Den lägger inte till någon egen krets: konton som misslyckas hanteras fortfarande av lagren för karantän, låsning och brytare. Ange den med `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Resonemangsramar startar om budgeten för innehållsstopp.** En resonemangsmodell kan tänka i
flera minuter före sin första synliga token: Claude strömmar `thinking_delta`-ramar vars
resonemangstext kan vara tom, och Responses API strömmar ett resonemangsobjekt efter ett annat.
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) känner igen dessa ramar,
och övervakaren startar om sin budget för varje sådan ram i stället för att avbryta omgången.
De är fortfarande inte modellutdata, så en omgång som slutar med endast resonemang fortfarande rapporteras som tom, och en omgång som slutar resonera och endast skickar heartbeat-signaler fortfarande utlöser övervakaren.

Kiros binära `reasoningContentEvent`-ramar med en icke-tom signatur bevarar denna
resonemangsaktivitet genom exekveraren som en tom `reasoning_content`-delta. Signaturen
vidarebefordras inte. Metadata, ofullständiga ramar och tomma signaturer startar inte om
innehållsbudgeten; den oberoende tidsgränsen för aktiva strömmar och klientens avbrytning gäller fortfarande (`open-sse/executors/kiro/reasoning.ts`).

**Terminala tillstånd (INTE karantäner):**

- `banned` — anges av detektering av förbjudna nyckelord/kontoförbud (se [BAN_DETECTION](../security/BAN_DETECTION.md)). Upstream-avvisningar per begäran (`request_rejected`, t.ex. Anthropic OAuth 403 "Request not allowed") anger det aldrig: de räknas per anslutning och modell och tar bort modellen från rotationen med en växande karantän som begränsas till `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), eller placerar anslutningen i karantän när ingen modell är känd — `open-sse/services/requestRejectedStreak.ts`
- `expired` (övergår till terminalt efter begränsade försök — `EXPIRED_RETRY_MAX = 3` med exponentiell backoff — så att tillfälliga OAuth-fel kan återhämta sig automatiskt innan kontot permanent avaktiveras)
- `credits_exhausted`

Dessa kvarstår tills autentiseringsuppgifterna ändras eller en operatör återställer dem. Skriv inte över terminaltillstånd med tillfälligt cooldown-tillstånd.

**Långsam återställning:** när `rateLimitedUntil` har passerats blir anslutningen åter behörig. Vid lyckad användning rensar `clearAccountError()` alla fält för fel.

### Claude OAuth-användningsgräns: lågprioriterad kö + återställning av sessionsgräns

**Omfattning:** en Claude-prenumerationsanslutning (OAuth). Båda funktionerna är **valfria per
anslutning** (Redigera anslutning → Claude-avsnittet → `lowPriorityMode` / `autoLimitReset` i
`providerSpecificData`, båda är avstängda som standard) och motsvarar Claude Codes kommandon
`/low-priority` och `/limit-reset` (wire-kontraktet har fastställts från Claude Code 2.1.263).

**Implementering:**

- Tillståndsmaskin + klassificering av svar: `open-sse/services/claudeLowPriority.ts`
- Klient för återställningsstatus/-anspråk: `open-sse/services/claudeLimitReset.ts`
- Executor-hook (headerinjektering + nytt försök för samma konto): `open-sse/executors/base.ts::execute()`
- Lagring av opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Utlösare:** 5-timmarsgränsen — en `429` vars headers innehåller
`anthropic-ratelimit-unified-status: rejected` och, när kontot är behörigt,
`anthropic-ratelimit-unified-slow-offer: treatment`. Inget skickas före den första
429:an från gränsen; en burst-429 utan unified-headers går genom den normala cooldown-sökvägen.

**Lågprioriterad kö** (`lowPriorityMode`):

- Vid 429:an från gränsen accepterar executorn erbjudandet och försöker omedelbart igen med
  **samma** konto och `anthropic-usage-limit: slow`; kön förblir aktiv fram till den meddelade
  `anthropic-ratelimit-unified-reset` (+60 sekunders marginal), och varje begäran under det
  tidsfönstret innehåller headern. Den avlyssnade 429:an når aldrig `handleChatCore`, så anslutningen
  försätts **inte** i cooldown och roteras inte bort.
- `anthropic-ratelimit-unified-slow-status` i senare svar: `active` / `not_needed`
  behåller kön; `slot_busy` (429) eller en `529` väntar den tid servern anger i
  `anthropic-ratelimit-unified-slow-retry-after` (standard 20 sekunder, begränsat till 5–600 sekunder, ±30 % jitter)
  och försöker sedan igen, med en övre gräns enligt `anthropic-ratelimit-unified-slow-max-wait` (standard 20 minuter, begränsat till
  1 minut–6 timmar) — därefter avslutas kön och en 10 minuter lång cooldown blockerar nytt accepterande. Väntetiden
  begränsas dessutom av den återstående tiden för begärans eget upstream-start-timeout
  (`resolveFetchStartTimeout`, 10 minuter som standard) minus en marginal på 5 sekunder: utan den begränsningen skulle
  standardvärdet på 20 minuter för max-wait överskrida begärans livslängd och väntan skulle avbrytas mitt i,
  vilket skulle exponera ett `TimeoutError` i stället för det kontrollerade slutet `max_wait` + cooldown.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, en rullning av 5-timmarsfönstret eller
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (vilket avslutar den som
  `extra_usage` vid alla statusar, eftersom betald överanvändning nu täcker gränsen) avslutar kön;
  svaret går därefter genom den normala cooldown-sökvägen. `budget_exhausted` sparas tills den meddelade
  budgetåterställningen (högst 8 dagar).
- Gränskontrollen körs efter executorns egna nya försök inom samma försök, som utlöses av 400-svar
  (kontextredigering, begränsningar av tänkande/insats, automatisk inlärning av parametrar), så en 429 från gränsen
  som bara uppstår vid ett av dessa nya försök ändå avlyssnas i stället för att nå cooldown-sökvägen.
- Tillståndet finns i minnet per anslutning (en omstart kostar en extra 429 från gränsen innan erbjudandet accepteras igen).

**Återställning av sessionsgräns** (`autoLimitReset`, försöks före kön när båda är aktiverade):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blocket
  `juniper_tide`; när `arm: "reset"` och `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` med
  `{ "program": "juniper_tide" }` (organisationens UUID från `providerSpecificData.organizationUUID`, med
  bootstrap som reserv).
- `result: reset|not_limited` → begäran försöks igen med full hastighet (utan slow-header).
  `already_used` / `not_offered` sparar `next_available_at` (en vecka som standard); alla fel leder till
  15 minuters backoff. Återställningen kan göras en gång i veckan och räknas fortfarande mot veckogränsen.

Regressionsskydd: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sessionsaffinitet (#7274)

**Omfattning:** en klientsession (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`-header) binds till en anslutning, för **valfri** provider.

**Syfte:** hålla en agent med flera turer (Claude Code, aider, anpassade agenter) på samma konto mellan begäranden, vilket minskar förlust av kontext mellan konton och upprepade 429-svar vid kallstart hos providers med sessionsstatus per konto.

**Implementering:**

- TTL-upplösning: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Val/skapande av bindning: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extrahering av header (generisk, alla providers): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabell för sparade bindningar: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Inställning: `sessionAffinityTtlMs` (global TTL i ms, `0` inaktiverar) — `src/lib/db/settings.ts`. Omdöpt från den Codex-specifika `codexSessionAffinityTtlMs` genom migreringen `124_generic_session_affinity_ttl.sql`, som överför alla tidigare konfigurerade Codex-TTL-värden som det nya standardvärdet.

Före #7274 avbröt `resolveSessionAffinityTtlMs()` omedelbart med `0` för alla providers utom
`codex`, så TTL-inställningen (och sessionsheaderarna) hade ingen effekt någon annanstans, trots att bindningsmekanismen och headerextraheringen redan var provideroberoende. Korrigeringen tog bort den tidiga retureringen; TTL gäller nu enhetligt för alla providers när den globala inställningen har satts till över `0`.

De tre sessionsaffinitetsheaderarna vidarebefordras aldrig uppströms — executors bygger sina egna uppströmsheaders från grunden i stället för att vidarebefordra klientheaders, så detta förblir endast ett internt korrelations-ID.

### Exklusiva leases för hanterade sessionsanslutningar

**Omfattning:** en aktiv hanterad HTTP-klient/-session äger en berättigad OmniRoute-anslutning.

**Syfte:** tillhandahålla varaktigt exklusivt anslutningsägande för klienter som behöver en hård routningsgräns över flera förfrågningar. Detta skiljer sig från sessionsaffinitet, som är en mjuk preferens för kontinuitet:
en exklusiv lease bevarar livscykeltillstånd i SQLite, framtvingar global unikhet för aktiva ägare och
aktiva anslutningar och avvisar en inaktuell generation innan leverantörsdispatch.

Funktionen aktiveras separat för varje API-nyckel. En hanterad nyckel måste ha scopet `lease:exclusive` och en
uttryckligen angiven lista över `allowedConnections` som inte får vara tom. Alla HTTP-klienter kan använda livscykelslutpunkten; inget
klientnamn, någon user-agent, leverantör, OAuth-metod eller modell krävs. Leasen äger en anslutning,
inte en modell, så ett modellbyte behåller bindningen så länge anslutningen fortfarande är normalt berättigad. Vanliga regler för modell, kvot, hälsa, nedkylning och tillåtelselista förblir auktoritativa och kan
överföra samma generation till en annan ledig, berättigad anslutning.

Livscykeln är `POST /api/v1/session-leases` med JSON-åtgärderna `acquire`, `renew` och `release`.
Hanterade inferensförfrågningar skickar det opaka värdet för `X-OmniRoute-Lease-Owner` och exakt
`X-OmniRoute-Lease-Generation`. Ägaren använder `vlo_` följt av 43 base64url-tecken; endast dess
SHA-256-hash lagras. Varje slutlig dispatch-spärr binder även det autentiserade API-nyckel-ID:t och
det aktiva anslutnings-ID:t. Lease-styrningsheaders tas bort från loggar, sparade ögonblicksbilder av förfrågningar och
headers till uppströms-exekveraren.

Om vanlig routing har berättigade hanterade kandidater men varje ledig kandidat är upptagen av en annan aktiv lease,
returnerar OmniRoute HTTP `429`, koden lease-capacity-unavailable, tillståndet waiting-for-capacity och en begränsad
`Retry-After` som härleds från det tidigaste relevanta utgångsdatumet.
Vanlig avsaknad av berättigade kandidater är inte leasekonkurrens och behåller sin befintliga routningsfelsemantik.

Relaterade mekanismer förblir separata:

- OAuth-sessionsbeläggning är en processlokal mjuk fördelning för OAuth-konton.
- Kontosemaforer beviljar tillstånd för samtidig förfrågningshantering och upphör när en förfrågan slutförs.
- Exklusiva hanterade sessionsleaser är varaktigt livscykelägande med en generationsspärr.

## 3. Modellblockering

**Omfattning:** kombinationen leverantör + anslutning + modell.

**Omfattning per status:** den status som orsakar felet avgör vilken nyckel en blockering skriver till
(`resolveLockoutScope()` i `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — en kvot- eller behörighetssignal — låser **kvotfamiljen**:
  för codex hela omfånget `codex` / `spark` (alla `gpt-5*`-modeller för
  anslutningen), för andra leverantörer `getQuotaScopedModelForProvider()`.
- `404` låser den nakna modellen (`getModelLockKey()` begränsar `not_found`).
- Alla andra statusar — `5xx`-transport-/serverfel och OmniRoutes egen
  syntetiserade `502` från kvalitetsvalidering — låser endast den **exakta**
  kombinationen leverantör/anslutning/modell. En felaktig ström från en modell är
  inte bevis på något om kontots kvot; före denna regel tog ett tomt svar på
  `codex/gpt-5.6-luna` bort alla `gpt-5*`-modeller för anslutningen från
  routningen i 2–30 minuter (med eskalering), medan kvoten förblev orörd.
- En explicit `scope`-parameter från anroparen har alltid företräde (Antigravity skickar `"exact"`).

**Syfte:** undvika att inaktivera en hel anslutning när endast en modell är otillgänglig eller kvotbegränsad.

**Exempel:**

- Kvotbaserade leverantörer som returnerar 429
- Lokala leverantörer som returnerar 404 för en modell som saknas
- Leverantörsspecifika fel för läges-/modellbehörighet (t.ex. Grok-lägen)

**Implementering:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Instrumentpanel för modellfördröjningar (v3.8.0)

Gränssnitt: Inställningar → Modellfördröjningar (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Visar aktiva blockeringar med: leverantör, anslutning, modell, orsak, expiresAt. Operatörer kan manuellt återaktivera en modell från kortet.

**REST API:**

- `GET /api/resilience/model-cooldowns` — lista aktiva blockeringar
- `DELETE /api/resilience/model-cooldowns` — manuell återaktivering. Body: `{provider, connection, model}`. Auth: management.

### Hantering av fördröjningar

Gränssnitt: Övervakning → Hantering av fördröjningar (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

En sida för varje anslutning som är utesluten från routningen av en tillfällig anledning, i stället för
att öppna varje leverantörssida. Den listar anslutningsfördröjningar, modellblockeringar och terminala
tillstånd, rensar dem per anslutning, för ett urval eller för alla anslutningar hos en leverantör,
och redigerar de mest justerade fördröjningsreglerna: `streamStallCooldown.enabled` och OAuth-/API-nyckelns
basfördröjning för `connectionCooldown` samt maximalt antal backoff-steg (sparas via
`PATCH /api/resilience`). Terminala tillstånd (`banned`, `expired`, `credits_exhausted`) listas
men rensas aldrig här.

Kortet **Regler för felrelaterade fördröjningar** på samma sida redigerar operatörens felregler
(`settings.providerErrorRules`) och standardvärdena för varje leverantörs catch-all
(`settings.providerErrorDefaults`) via `PATCH /api/settings` — se ”Regler deklarerade av
operatören” under §7 för hur de matchas. Varaktigheter är Standard (ingen explicit fördröjning), 30 min,
1 h, 5 h, 24 h eller ett anpassat värde från 1 till 43 200 minuter (30 dagar).

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — anslutningar med status, återstående fördröjning,
  backoff-nivå, senaste feltyp och modellblockeringar (inga autentiseringsuppgifter)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` eller
  `{all: true, provider?}`; returnerar `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Gränssnitt för blockeringsinställningar + återställning genom lyckade anrop (v3.8.23)

Modellblockering gick från ett alltid aktiverat hårdkodat beteende till en fullt konfigurerbar,
opt-in-funktion med ett eget inställningskort och en självläkande återställningsväg.

**Inställningskort:** Inställningar → Modellblockering
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Detta är **separat** från det skrivskyddade `ModelCooldownsCard` ovan (som endast
_visar_ aktiva blockeringar) — det nya kortet _konfigurerar parametrarna_. Standardvärdena
finns i `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Inställning             | Standardvärde                    | Betydelse                                                      |
| ----------------------- | -------------------------------- | -------------------------------------------------------------- |
| `enabled`               | `false`                          | Huvudväxel — modellblockering är **av som standard**.          |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusar från upstream som räknas som ett modellspecifikt fel. |
| `baseCooldownMs`        | `120_000` (120 s)                | Inledande blockeringsvaraktighet för det första felet.         |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Tak för den eskalerade fördröjningen.                          |
| `maxBackoffSteps`       | `10`                             | Maximalt antal steg för exponentiell backoff-eskalering.       |
| `useExponentialBackoff` | `true`                           | Om upprepade fel ska eskalera fördröjningen exponentiellt.     |

Inställningarna sparas via det normala inställningslagret och valideras genom
schemat för resiliensinställningar; kortet begränsar `baseCooldownMs`/`maxCooldownMs`
(med `maxCooldownMs ≥ baseCooldownMs`) och `maxBackoffSteps`.

**Återställning genom lyckade anrop:** återställningen beror **inte** enbart på att timern löper ut. Ett felfritt
svar minskar modellens felräknare, så att en modell som återhämtat sig
under tidsfönstret slutar eskalera (och avblockeras) innan timern skulle ha gjort det. Vid ett lyckat kombinationsmål anropar
`open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), vilket **halverar** det lagrade
`failureCount` (`Math.floor(failureCount / 2)`); när värdet når `0` tas blockeringsposten bort helt. Motsvarigheten
`recordModelLockoutFailure()` ökar räknaren (och eskalerar fördröjningen) vid fel inom eskaleringsfönstret. Denna återställning genom lyckade anrop sker utöver vanlig timerutgång —
vilken väg som helst kan återaktivera en modell.

**Tillstånd:** lockouts hålls **i minnet** (`Map`s per process med
`ModelLockoutEntry`-poster som är nycklade efter `provider:connectionId:model`, lås med exakt omfång efter
`provider:connectionId:exact:model`), och sparas inte i
databasen — de går förlorade vid omstart. _Inställningarna_ sparas; det aktiva _lockout-tillståndet_ är temporärt.

---

## 4. Samtidighetskontroll med kvotdelning (v3.8.36)

Prenumerationskonton (GLM, MiniMax osv.) accepterar ofta endast ~1–3 samtidiga
förfrågningar; om detta överskrids utlöses 429-fel och nedkylningsperioder. Detta är
särskilt problematiskt för **quota-share**-kombinationer (`qtSd/…`), där flera API-nycklar
delar på samma uppströmskonto. Tre lager förhindrar att ett delat konto överbelastas.

### Tak för samtidighet per anslutning (`max_concurrent`)

Varje leverantörsanslutning kan ange ett tak för `max_concurrent`
(`provider_connections.max_concurrent`, angivet i anslutningsdialogrutan / API:t / databasen).
Lämna fältet tomt om ingen gräns ska gälla. Detta är den enda inställningen som styr
serialiseringslagret nedan — ange kontots faktiska samtidighet (t.ex. GLM ~1, MiniMax ~2).

### Tak för samtidighet per modell (`modelConcurrency`)

En anslutning kan dessutom ange exakta samtidighetstak per modell i sin
`rateLimitOverrides`-mappning:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Ange detta i anslutningsdialogrutan (**Åsidosättningar för hastighetsbegränsning →
Samtidighetstak per modell**, en `model=cap` per rad) eller via
`PATCH /api/providers/[id]` med samma JSON-struktur. Viktiga egenskaper:

- **Anslutningsövergripande kontra modellspecifikt:** `maxConcurrent` förblir taket
  för hela anslutningen. När båda gäller hämtas båda låsen atomiskt i samma sammansatta
  lås (`global → provider → account → model`); den faktiska effekten styrs av den
  striktare tillämpliga gränsen.
- **Exakt matchning av modellnyckel:** nyckeln är modellsträngen som skickas till
  exekveraren efter routningslösningen — normalt det rena uppströmsmodell-id:t
  (`glm-5`), inte ett klientalias i formen `provider/model` (`zai/glm-5` matchar inte
  `glm-5`). Värdena är positiva heltal som anger taket för samtidiga förfrågningar.
- **Lokal köhantering, ingen identifiering:** överflödiga förfrågningar placeras i
  kö lokalt med den befintliga kö- och timeoutsemantiken (typade
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`-fel vid tilldelning). OmniRoute
  identifierar eller härleder inte uppströmsregler — det tillämpar de exakta tak
  som operatören har konfigurerat. Ett mättat modellås inaktiverar aldrig leverantören
  och skapar aldrig en permanent modellblockering; uppströms-429-/nedkylnings-/
  reservbeteendet kvarstår som felhantering i sista hand.
- **Omfattning per anslutning och process:** taken gäller per databasanslutning och
  hålls i minnet, så två anslutningar som återanvänder samma uppströms-API-nyckel
  samordnar inte med varandra.
- **Ej konfigurerat innebär oförändrat beteende:** om mappningen utelämnas (eller
  instrumentfältet i kontrollpanelen lämnas tomt) läggs inget modellås till. Exempel
  på konfiguration utan att ange någon universell leverantörsgräns:

```text
glm-5=1
glm-4.7=3
```

### Serialisering av quota-share-förfrågningar

När en quota-share-dispatch riktas mot en anslutning som anger ett positivt
`max_concurrent`, serialiseras samtidiga förfrågningar till det **kontot** genom
en semafor per anslutning (nyckel `qsconn:<connectionId>`): överflödiga förfrågningar
**väntar i kön** i stället för att överbelasta kontot. Den är **fail-open** — en
mättad kö eller timeout fortsätter utan en plats i stället för att någonsin avvisa
en förfrågan som kan dispatchas. Aktivera eller inaktivera i **Inställningar →
Robusthet → Quota-share-samtidighet per anslutning**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standard är på). Utan ett
`max_concurrent`-tak är beteendet oförändrat.

> Routningslåset för quota-share (`selectQuotaShareTarget`, DRR + P2C) är självt
> fail-open och **nedprioriterar** endast en anslutning som nått sitt tak — med en
> pool som innehåller en enda anslutning kan det inte sätta en hård gräns, så denna
> semafor är det som faktiskt begränsar överbelastningen.

### Försök igen för kombinationer med hänsyn till nedkylningsperioder

För varje kombinationsstrategi (när den är aktiverad) väntar en förfrågan som skulle
resultera i ett 429-fel under en KORT tillfällig nedkylningsperiod ut perioden och
distribueras på nytt i stället för att returnera 429-felet — detta omfattar
TPM-/RPM-fönster i Gemini-klassen (~60 sekunders `retry-after`) för kombinationer
med flera modeller, exempelvis när båda målen i en kombination med två modeller
träffar en hastighetsgräns per modell. Beteendet begränsas av `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) i **Inställningar → Robusthet**.
Det väntar aldrig vid `quota_exhausted` (låst till midnatt) eller vid orsaker som
gäller autentisering eller att resursen inte hittades.

En kombination kan välja bort detta med `config.comboCooldownWaitEnabled: false`.
Endast det bokstavliga värdet `false` inaktiverar dessa gemensamma väntetider
(nedkylningsperiod efter dispatch samt väntetider före dispatch när kretsen är öppen
eller modellen är låst) och deras förlängning av timeoutens nedre gräns med
väntetidsbudgeten. Om värdet saknas eller är `true` gäller den globala policyn;
`true` kan inte aktivera väntan om den är globalt inaktiverad. Ett explicit
`targetTimeoutMs` har fortfarande företräde. Detta val bort påverkar inte den
separata väntan före dispatch för inbyggd Codex-omgångslåsning.

Samma lås omfattar fallet före dispatch (#16319): när alla mål i en kombination
hoppas över innan något försök görs eftersom deras modeller befinner sig i en
kortvarig låsning, väntar sökvägen med noll försök ut låsningen enligt samma tak
och distribuerar sedan på nytt, i stället för att svara med ett
`503 ALL_TARGETS_SKIPPED` utan ledtråd. När ingen väntan är tillåten (taket,
försöksgränsen eller budgeten är förbrukad, eller funktionen är avstängd) uppgraderas
det slutliga svaret till `429 rate_limit_error` med `retry_after` / `reset_at` från
den tidigaste tillfälliga låsningens utgångstid; kvot-, autentiserings- och
”hittades inte”-lås behåller 503-svaret utan ledtråd.

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

## 5. Antagningskontroll för begärandekö (v3.8.49 · issue #6593)

**Omfattning**: den lokala hastighetsbegränsningskön per leverantör + anslutning (`open-sse/services/rateLimitManager.ts`,
med Bottleneck som grund), ett lager under de tre mekanismerna ovan.

**`maxWaitMs` begränsar väntetiden i kön; `executionMaxWaitMs` begränsar körningen.**
De två är avsiktligt separata, och ingen av dem påverkar den andra.

`resilienceSettings.requestQueue.maxWaitMs` är **budgeten för väntetid i kön**: den
omfattar väntan på en plats hos leverantören och därefter tiden i QUEUED, och dess timer
rensas så fort jobbet lämnar QUEUED och börjar köras
(`rateLimitManager.ts`, `wrappedFn`). En begäran som överskrider den når aldrig upstream. Standardvärdet är 30000ms, anges av
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
i `src/lib/resilience/settings.ts` och fastställs av
`tests/unit/ratelimit-admission-control-6593.test.ts`, så en ändring av det
gör att testet blir rött i stället för att detta stycke i tysthet blir inaktuellt.

`resilienceSettings.requestQueue.executionMaxWaitMs` är det värde som Bottleneck
tar emot som jobbets `expiration`, vars timer startar först efter dispatch. Det är
en reserv för exekverare som saknar en egen upstream-timeout, och höjs till exekverarens egen timeout för start av hämtning när den är längre, så att den inte kan avbryta ett friskt svar som redan pågår. Standardvärdet är 600000ms (10 min).

Att mata in köbudgeten i `expiration` brukade avsluta icke-inkrementella gateways mitt under körningen — de kör legitimt i flera minuter innan de första bytena kommer —
och det är därför en expiration exponeras som `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), medan köbudgeten medför koden för timeout i kön. Åsidosätt något av dem via `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) eller instrumentpanelen
(**Settings → Resilience**). Båda begränsas till 1ms–24h vid normalisering.

**Prioritet, för båda:** env-variabeln anger endast _standardvärdet_. Ett värde
som sparats i `resilienceSettings.requestQueue` (instrumentpanelen / API-patch, lagrat
i `key_value`) har företräde framför det, och en anslutningsspecifik
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` har företräde framför det. Om env-variabeln anges i en driftsättning som redan har ett sparat värde
ändras därför ingenting — rensa eller uppdatera den sparade inställningen i stället.

Tiden i kön begränsas av `maxWaitMs`; `maxQueueDepth` nedan begränsar hur
många anropare som får vara köade samtidigt.

**Försök enligt svarstexten: pacing kontra blockering.** En 429-text kan ange sin egen väntetid
(Gemini `RetryInfo.retryDelay`, texten "retry after Ns"), som
`updateFromResponseBody` läser. En väntetid som ryms inom anslutningens
`maxWaitMs` är pacing: begränsaren tömmer sin reservoir under den tiden och köade anrop
skickas iväg när den fylls på igen. En väntetid som är längre än `maxWaitMs` är inget som
kön kan vänta ut — Gemini svarar på en uttömd dagskvot med
`retryDelay: "86399s"`. Den vidarebefordrade `Retry-After` i den återskapade 429:an (#16528)
gör redan att reservmotorn låser modellen under det tidsintervallet, men att pausa begränsaren
under samma tid skulle fortfarande stoppa alla anrop som når nyckeln tidigt
(efter en återställning av resiliensen, till exempel) under hela `maxWaitMs`. När en sådan väntetid kommer från en typad Google-`RetryInfo`
detalj (ursprunget `google_rpc_retry_info`) och nyckelns begränsare
redan är begränsad till modellen (se `getLimiterKey`), blir 429:an i stället en
modellblockering på den anslutningen (`lockModelForLongBodyRetry` i
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, begränsad till 24h), och
begränsaren lämnas opausad. Kontoval hoppar över vid den blockeringen via
`isModelLocked()`, liksom kombinationsgrinden före dispatch för mål som är bundna till anslutningen. På antigravity, vars begränsare är per kvotfamilj,
gäller blockeringen exakt modellen, precis som för dess andra kvotblockeringar. Namnet som klienten angav blockeras också när ett alias löste det till den modellen, eftersom dessa kontroller använder det begärda namnet; det blockeras exakt (`lockExactModel`), så ett alias som korsar en antigravity-kvotfamilj eller ett codex-scope blockerar aldrig sitt eget. Ett tips i löptext, en otypad `retryDelay` eller en
begränsare som delas av hela anslutningen behåller pausen. När den begränsare som 429-sökvägen just återskapade faktiskt pausas, avvisas en anropare vars återstående kötid tar slut innan pausen gör det omedelbart med timeoutkoden för kön
(`checkLimiterPause`) i stället för att vänta tills den tiden löper ut; det registrerade slutet förankras innan begränsaren byggs, där Bottleneck startar sin uppdateringsklocka, och varje senare ändring av reservoaren glömmer det. Detta täcks av
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` och
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — valfri antagningsgräns (ny).** `resilienceSettings.requestQueue.maxQueueDepth`
begränsar hur många begäranden som får vara köade (ännu inte skickade)
för en leverantör + anslutning åt gången. När kön redan innehåller
`maxQueueDepth` begäranden avvisas en ny begäran snabbt med ett typat
`code: "RATE_LIMIT_QUEUE_FULL"`-fel **innan** den någonsin når `limiter.schedule()`
— avvisningen är alltså billig och sker före allt efterföljande arbete med
promptkomprimering / översättning för den begäran. Standardvärdet `0` =
inaktiverad, vilket bevarar det befintliga beteendet med en obegränsad kö; begränsat till 0–100000.
Åsidosätt via `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) eller
`resilienceSettings.requestQueue.maxQueueDepth` (instrumentpanel/API-patch).

Själva antagningskontrollen är en ren funktion
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), så
den kan enhetstestas utan en riktig Bottleneck-begränsare.

> RFC:n som öppnade #6593 föreslog också en `bypassCompressionOnRateLimit`-flagga.
> Detta repos pipeline `open-sse/services/compression/` är
> prompt-/kontextkomprimering på den utgående LLM-förfrågan (`chatCore.ts`,
> runt blocket `resolveCompressionSettings`/`selectCompressionStrategy`),
> inte HTTP-svarskomprimering på syntetiserade 429-kroppar — det finns ingen
> matchande kodväg för en bokstavlig bypass-flagga. Detta promptkomprimeringssteg
> körs dessutom för närvarande _före_ `withRateLimit()` i förfrågningspipelinen, så
> att ordna om för att hoppa över det vid en avvisning på grund av full kö är en separat, större
> ändring än detta ärendes omfattning; det implementerades avsiktligt **inte**
> här och lämnas som en uppföljning om CPU-besparingsvinsten är värd
> omordningsrisken.

### Säkerhetsnät för automatisk aktivering av hastighetsbegränsning samt anslutningsskydd (`rateLimitProtection`)

**Säkerhetsnät för automatisk aktivering** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, standard `true`):
Som standard aktiverar OmniRoute automatiskt köskydd för hastighetsbegränsning för alla aktiva API-nyckel-leverantörsanslutningar (`getProviderCategory(provider) === "apikey"`). Detta säkerställer att inkommande förfrågningar till hastighetskänsliga uppströms-API-nycklar köas och stryps via Bottleneck istället för att skickas i skurar som resulterar i uppströms 429-fel. Säkerhetsnätet kan åsidosättas via miljövariabeln `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` inaktiverar, `true`/`1`/`on` tvingar på), vilken har företräde framför den sparade instrumentpanelsinställningen (**Inställningar → Resiliens** / `PATCH /api/resilience`).

**Semantik för `rateLimitProtection` per anslutning:**
Hastighetsbegränsningsskydd per anslutning spåras via det booleska fältet `rateLimitProtection` på leverantörsanslutningar (sparat som `rate_limit_protection` i SQLite):

- **Explicit på (`rateLimitProtection === true`)**: Hastighetsbegränsningsskydd är explicit aktiverat för denna anslutning, oavsett leverantörskategori eller om säkerhetsnätet för automatisk aktivering är påslaget.
- **Explicit av (`rateLimitProtection === false`)**: Inaktiverar explicit skydd, men undantar **inte** en aktiv API-nyckelanslutning från det globala säkerhetsnätet för automatisk aktivering. I `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) är `false` och `undefined` likvärdiga: endast `rateLimitProtection === true` behandlas som en explicit åsidosättning. Om `rateLimitProtection` är `false` (eller inte satt) matchar en aktiv API-nyckelanslutning fortfarande villkoret för automatisk aktivering och förblir hastighetsbegränsningsskyddad.
- **Inget undantag per anslutning**: En operatör kan för närvarande inte uttrycka "denna enskilda aktiva API-nyckelanslutning måste köras utan köskydd för hastighetsbegränsning" samtidigt som automatisk aktivering förblir aktiv för andra. För att helt köra API-nyckelanslutningar utan hastighetsbegränsningsköer måste säkerhetsnätet stängas av globalt (`RATE_LIMIT_AUTO_ENABLE=false` eller `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Skrivvägar som stöds:**

- **`POST /api/rate-limits`**: Den skrivväg för hantering som stöds för att växla `rateLimitProtection` för en anslutning (`{ connectionId: string, enabled: boolean }`). Ett anrop med `enabled: true` slår på explicit skydd; ett anrop med `enabled: false` tar bort explicit skydd (även om aktiva API-nyckelanslutningar förblir täckta av det globala säkerhetsnätet om automatisk aktivering är på).
- **`PUT /api/providers/[id]`**: Accepterar eller växlar avsiktligt **inte** `rateLimitProtection` (#11278). Att uppdatera metadata för en leverantörsanslutning via `PUT /api/providers/[id]` ändrar aldrig det sparade tillståndet för hastighetsbegränsningsskyddet.

---

## 6. Slow-stream throughput watchdog (#9709)

Den valfria `resilienceSettings.streamRecovery.throughputWatchdog` vakten upptäcker en uppströms som fortfarande skickar bitar men som producerar assistentutdata under den konfigurerade användbarhetshastigheten. Den är medvetet skild från den inaktiva timeouten: hjärtslag och metadata återställer ingen av timern och räknas inte som framsteg. Det skiljer sig också från den hårda försökstiden (#9153), som förblir ett absolut säkerhetstak oavsett utskriftskvalitet.

Vakthunden kräver en uppvärmningsperiod följt av ett helt rullande fönster innan den kan avbryta. Den räknar textdelta från chattavslut och svar API -utdatahändelser (en konservativ UTF-8 byte-proxy), ignorerar endast användnings- och tomma händelser och avbryter bedömningen medan verktygsanrop eller resonemangshändelser pågår. Det är inaktiverat som standard och kan aktiveras med `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (det env-värdet startar endast standardvärdet — a saved `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean wins; se env-vs-dashboard-anmärkningen högst upp i den här guiden); fönstret, uppvärmningen, minimihastigheten och minsta mätbara uteffekten begränsas av normaliseringsskiktet för normala elasticitetsinställningar.

När det är aktiverat tillämpas en övervakningsavbrytning endast på det aktiva uppströmsförsöket. Innan några klientsynliga bytes kan den befintliga sökvägen för tidig återställning av samma konto öppna försöket igen. Efter commit spelas streamen aldrig blint upp igen; endast det befintliga säkra midstream-fortsättningskontraktet kan sy ett suffix. Slutförandet förblir enstaka tillfällen, så användningsredovisning och semaforfrigivning dupliceras inte.

---

## 7. Omformulering av upstream-status (felaktiga kvotfel)

**Omfattning:** en upstream-gateway som rapporterar tillfällig kvotbrist med fel HTTP-status.

**Syfte:** korrigera en missvisande status FÖRE klassificeringen, så att nedströmskonsumenter (fallback-motorn, kombinationsaggregeringen och det klientsynliga svaret) ser felets verkliga återförsökbara natur.

Vissa gateways signalerar TILLFÄLLIG kvotbrist med en HTTP-status som inte kan försökas igen. `agentrouter.org` returnerar `403` (ibland `400`) med en kinesisk body
(`用户额度不足` / `额度不足`) i stället för standardvärdet `429`. Klienter som Claude
Code betraktar `403` som permanent och avbryter sessionen, och utan korrigering
skulle fallback-motorn klassificera det som `AUTH_ERROR` i stället för som en kvothändelse.

**Implementering:**

- Register + matchare: `open-sse/config/upstreamStatusRestatement.ts` — en
  lista med regler per provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), som matchas via `applyStatusRestatement()`.
- Anropsställe: blocket `providerFailure:` i `open-sse/handlers/chatCore.ts`
  (kring rad 3654), direkt efter att `parseUpstreamError()` har tolkat ett upstream-svar med en felaktig HTTP-status (`!providerResponse.ok`) och innan någon klassificering körs, så att alla nedströmskonsumenter ser den korrigerade statusen. Fel som bäddas in i en `200` SSE-ström följer en separat, senare sökväg för strömtolkning och omfattas **inte** av denna hook i dag — en känd begränsning som ännu inte behövs för agentrouters felaktiga status (den visas som en HTTP-felstatus).
- Återförsöksberättigande: `429` finns i `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), så ett omformulerat fel innehåller ett faktiskt återförsöksfönster i stället för att visas som ett dött `403`.
- Den syntetiska `60s`-tiden i `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) är endast det som det omformulerade svaret anger för **klienten**; den är inte i sig anslutningens interna cooldown-/blockeringstid — den styrs separat av den mekanism som faktiskt hanterar det omformulerade felet (Connection Cooldowns eskalerande backoff, §2, med basvärdet `3s` för API-nyckelproviders; eller Model Lockout, §3, för providers med kvot per modell, som agentrouter). Routern kan internt bli berättigad till ett nytt försök tidigare än det 60-sekundersfönster som den annonserar till klienten — detta är avsiktligt spelrum, inte ett fel.

Permanenta fel (agentrouters `无权访问模型` — ingen åtkomst till denna modell) omformuleras ALDRIG: `excludeMarkers` stoppar regeln även när `textMarkers` matchar, så felet behåller sin ursprungliga status och inget försöker för evigt igen. Den matchande providerklassificeringsregeln
(`agentrouter-model-access-denied` i `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, en deklarerad baskylning på `6h`) används av `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_före_ den generiska tidiga retureringen för apikey-kategorin `FORBIDDEN`, och aktiveras endast när `honorsRuleLockScope(provider)` (#10334 — för närvarande exklusivt för agentrouter via allowlisten `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i
`providerErrorRules.ts`). Regelns deklarerade cooldown på 6 timmar förs vidare som `fallbackResult.baseCooldownMs`, men den matar fortfarande den befintliga sökvägen för låsning per modellkvot (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, oförändrad av #10334 förutom källan för cooldown): den begränsas till operatorns `mlSettings.maxCooldownMs`
(standardvärde `1_800_000ms` / 30 minuter), precis som alla andra modellåsningar, och det _beständiga låsningsskälet_ förblir det befintliga hårdkodade `"forbidden"`, inte regelns `"auth_error"` — endast cooldownens varaktighet respekteras från början till slut, inte orsakssträngen. Själva anslutningen förblir aktiv; syskonmodeller på samma anslutning påverkas inte.

Omformulerade kvotfel (`额度不足`) når en providerregel i produktion
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ingen egen deklarerad cooldown — persistence-lagrets skalade backoff-standard används). Sedan #10334 konsumeras `scope` i
`ProviderErrorRuleMatch` från början till slut, men **endast** för providers i allowlisten `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` — i dag endast `"agentrouter"`, aktiverat via `honorsRuleLockScope()`). För alla andra providers förblir `scope` informativt, precis som före #10334.
`checkFallbackError` exponerar den matchade regelns scope som
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) är den gemensamma kontrollen som bekräftar att ett
`ruleScope` verkligen är säkert att respektera som en anslutningsomfattande,
självåterhämtande signal (scope `"connection"`, reason `quota_exhausted`, aldrig
`permanent`, aldrig `creditsExhausted` — ett skydd mot en framtida regelkombination där scope `"connection"` paras ihop med ett permanent kontotillstånd). Två konsumenter anropar den:

- **Persistens** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  i stället för att hamna i grenen för låsning **per modell** för
  passthrough-providern (agentrouter har `passthroughModels: true` → `hasPerModelQuota()`
  returnerar `true`) tillämpas en **tillfällig anslutningspaus** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, aldrig en slutgiltig status
  (`credits_exhausted`/`banned`/`expired`) — så att anslutningen återhämtar sig
  automatiskt när pausen löper ut, i stället för att kräva en manuell
  återställning av autentiseringsuppgifterna.
  Hoppar över anslutningar med `disableCooling: true` (#2997): detta opt-out
  faller i stället igenom till låsningen per modell (en dokumenterad avvägning —
  se kodkommentaren ovanför grenen).
- **Kombinationsdirigering i samma begäran** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): samma guard markerar
  anslutningen i den minnesbaserade uppsättningen `exhaustedConnections`, med nyckeln
  `${provider}:${connectionId}`. Detta hoppar bara över ett återstående mål i SAMMA
  BEGÄRAN som _självt redan innehåller exakt det `connectionId`_ i sitt eget
  målobjekt (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` före uppslagningen i `exhaustedConnections`) — en vanlig
  kombination med modellista, där syskonmålen inte har något eget fast angivet
  `connectionId` och ett sådant endast löses per dispatch från svarets
  `X-OmniRoute-Selected-Connection-Id`-header, träffar aldrig den
  nyckelmatchningen. I detta vanliga fall är det verkliga skyddet mot att en
  återstående del återanvänder det konto som nyss förbrukade sin kvot INTE denna
  uppsättning — det är persistenslagret ovan (`rateLimitedUntil` för anslutningen
  ligger nu i framtiden) kombinerat med att samma guard undertrycker
  `transientRateLimitedProviders` för felet (se "Tvåstegsdesign" och
  kodkommentaren för grenen
  `isAgentrouterConnectionQuotaScope` i `targetExhaustion.ts`): när uppsättningen
  lämnas omarkerad aktiveras INTE `combo.ts`'s
  `allowRateLimitedConnection`-forcerade tillåtelse
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) för providerns
  återstående delar, så autentiseringsuppgifternas filter för `rateLimitedUntil`
  (`src/sse/services/auth.ts:1238`) följs normalt och en återstående del väljer
  antingen en annan, fortfarande tillgänglig agentrouter-anslutning eller
  misslyckas med att hitta tillgängliga autentiseringsuppgifter — den tvingar sig
  inte tillbaka till anslutningen som den här grenen just satte i paus.

### Tvåstegsdesign: statusomformulering, sedan klassificering

Statusomformulering (`upstreamStatusRestatement.ts`) och reglerna för
providerklassificering (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) är separata register som båda använder provider-id och
textmarkörer som nycklar, men de körs på olika platser och har olika syften:
omformuleringen skriver om HTTP-statusen tidigt i `chatCore.ts`;
klassificeringsreglerna väljer reservvärdet `reason` och låsnings-`scope`
(`model` / `provider` / `connection`) i `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klassificeringsregler ser endast fullständig feltext (vilket behövs för att
matcha markörer i brödtexten, som `额度不足`) för providers som listas i
allowlistan `FULL_TEXT_RULE_PROVIDERS` i `providerErrorRules.ts` — för
närvarande endast `"agentrouter"`. För alla andra **inbyggda katalogproviders**
överlämnar `checkFallbackError` endast det strukturerade felet
(`{code, type}`) till `getProviderErrorRuleMatch`, vilket räcker för regler
baserade på header/status/code men inte kan se markörer i brödtexten.
Hjälpfunktionen `resolveRuleMatchBody()` utför detta val: fullständig feltext
för allowlistade providers, det strukturerade felet annars. Att lägga till en
**inbyggd** provider i `FULL_TEXT_RULE_PROVIDERS` är ett uttryckligt opt-in
per provider — det finns för att standardvägen för varje provider som inte
finns i listan ska förbli oförändrad byte för byte.

En regels `scope` (`model` / `provider` / `connection`) är ett separat opt-in
från `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` exponerar den endast som
`fallbackResult.ruleScope`, och efterföljande konsumenter respekterar den som
något annat än en informativ etikett endast för providers i allowlistan
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samma fil (styrt via
`honorsRuleLockScope()` — i dag endast `"agentrouter"`). Se "Omformulerade
kvotfel" ovan för vad en matchning med `scope: "connection"` faktiskt gör när
en provider finns i den allowlistan.

**#11104 — regler som deklarerats av operatören kringgår båda allowlistorna.**
En operatör kan deklarera en regel per provider vid körning via
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
utan att redigera den här filen. Att lägga en operatörsregel bakom
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlistor
som är avsedda att skydda **standardbeteendet** för regler i den inbyggda
katalogen — skulle göra inställningsmekanismen verkningslös för alla providers
utom de som redan finns listade där, eftersom deklarationen av regeln redan
är operatörens uttryckliga opt-in. `resolveRuleMatchBody()` och
`honorsRuleLockScope()` kontrollerar båda `hasOperatorRuleForProvider()` först:
en provider med en operatörsregel får den råa feltexten och får sin deklarerade
`scope` respekterad, oavsett om den också förekommer i någon av allowlistorna.

**Regler som deklarerats av operatören** (`OperatorProviderErrorRule`): varje
regel har en valfri `status` och en valfri `match` (en enkel,
skiftlägesokänslig delsträng av feltexten, aldrig ett RegExp, så att den inte
kan orsaka ReDoS), och måste ange minst ett av de två. När båda anges
kombineras de med AND; ett utelämnat fält matchar vad som helst, så
`{match: "insufficient_quota"}` matchar alla statusar som innehåller den
koden. Den första matchande regeln vinner. `cooldownMs` accepterar upp till
30 dagar; högst 50 regler totalt.

**Övergripande standardvärden** (`settings.providerErrorDefaults`, opt-in, anges via
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
med `cooldownMs` från 1 minut till 30 dagar. Ett standardvärde tillämpas endast när
ingen operatörsregel och ingen inbyggd katalogregel matchade, och endast för 402, 403,
408, 429 och 5xx-fel. Fel i begärans struktur (400, 404, 409, 413, 422) och ensamma
401-fel behåller sin egen hantering. Utan ett explicit `reason` hämtas orsaken från
statusen, på samma sätt som `classifyError` gör. Att deklarera ett standardvärde räknas
som en operatörsregel för `hasOperatorRuleForProvider()`, så dess `scope` (standardvärde
`"connection"`) respekteras. Den effektiva nedkylningsperioden för ett standardvärde är
den längre av dess `cooldownMs` och leverantörens eget återförsöksvärde (`Retry-After`,
`x-ratelimit-reset` eller en återställningsindikering i brödtexten, samma indikering som
motorn respekterar när inställningen "use upstream retry hints" för anslutningsnedkylning
är aktiverad), så ett standardvärde kan förlänga en kort uppströmsindikering men aldrig
korta en faktisk återställning. En explicit operatörsregel behåller sitt exakta
`cooldownMs`. Varken en regel eller ett standardvärde kringgår skydden för
anslutningsnedkylning i `markAccountUnavailable`: en aktiv, längre nedkylningsperiod
förkortas aldrig och en terminal status skrivs aldrig över. De inbyggda textdetektorerna
som körs tidigare i `checkFallbackError` (slut på krediter, daglig kvot, konto
avaktiverat) har fortfarande företräde för sina egna fraser.

**Känd begränsning — `providerRuleRegistry` konsulteras aldrig för HTTP 400.**
Grenen `BAD_REQUEST` i `checkFallbackError` klassificerar status 400 helt genom sina
egna mönsterarrayer (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` osv. i `accountFallback.ts`) och returnerar innan grenen
för `configuredRule`/`getProviderErrorRuleMatch` ovanför nås. En inbyggd katalogregel
(eller en operatörsregel) med `status: 400` är syntaktiskt giltig men kommer aldrig att
utlösas. Ingen befintlig regel riktar sig mot 400 i dag, så inget i produktion påverkas
— men en framtida 400-regel kräver att denna gren ändras först, vilket är en större
ändring än att lägga till en regel (den omklassificerar 400 för varje leverantör som
redan förlitar sig på beteendet med mönsterarrayer) och ligger utanför omfattningen för
att lägga till en regel för en enda leverantör.

### Lägga till en ny kvotfelrapporterande gateway

1. Registrera en regelarray i `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Håll `textMarkers`
   leverantörsspecifika; återanvänd aldrig generiska engelska fraser som kolliderar med
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Registrera valfritt klassificeringsregler i
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) för att välja rätt
   låsningsomfattning (`connection` för kvoter som gäller hela kontot, `model` för fel
   som gäller en enskild modell). Detta steg får endast effekt i produktion för
   leverantörer vars regler behöver hela feltexten (markörer i brödtexten): lägg till
   leverantörens id i `FULL_TEXT_RULE_PROVIDERS` i samma fil — annars skickar
   `checkFallbackError` endast det strukturerade felet `{code, type}` till regeln och en
   regel som matchar brödtext kommer aldrig att matcha verklig trafik.
   Regler som enbart matchar på `status`/`headers` (som Opencode-reglerna eller
   Minimax-reglerna) behöver inte detta opt-in. Separat gäller att om regeln deklarerar
   `scope: "connection"` och avsikten är en faktisk anslutningsomfattande nedkylning
   plus överhoppning av kombinationer för samma begäran (inte bara en informativ etikett),
   ska leverantörens id läggas till i `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samma fil —
   detta styr vad som får använda konsumtion i stil med
   `isAgentrouterConnectionQuotaScope()` i `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) och
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); utan detta fortsätter `scope`
   att föras vidare via `fallbackResult.ruleScope`, men inget agerar på det.
3. Lägg till enhetstester som följer
   `tests/unit/upstream-status-restatement.test.ts` och
   `tests/unit/agentrouter-error-rules.test.ts` (inklusive skydden
   not-permanent / not-creditsExhausted samt — om leverantören behöver
   tillåtelselistan — ett test som säkerställer att `resolveRuleMatchBody()` endast
   returnerar hela texten för den leverantören).

Inga ändringar i `chatCore.ts`, `classifyError` eller combo behövs.

#### Egress-baserad låsning (#10880)

Leverantörer i `EGRESS_BUCKETED_LOCK_PROVIDERS` (Opencode-familjen) behandlas som
uppströmsleverantörer med IP-baserade bucketar (Opencodes kostnadsfria nivå är
IP-baserad, inte kontobaserad — se #9611): en status-429 som klassificeras som
`quota_exhausted` **eller** `rate_limit_exceeded` kyler ned varje anslutning i den
tillåtna familjen vars senast kända egress-IP matchar den felande anslutningens, innan
rotationen kan försöka med dem
— vilket undviker N-1 garanterat misslyckade anrop till uppströmsleverantören (samma
form som #10460/#10525). `rate_limit_exceeded` inkluderas avsiktligt: på sökvägen via
`markAccountUnavailable` matchar de Opencode-specifika reglerna aldrig (inga
headers/brödtext lämnas över till `checkFallbackError`, och Opencode finns inte i
`FULL_TEXT_RULE_PROVIDERS`), så en 429 vars brödtext innehåller texten om
abonnemangskvoten ("monthly usage limit reached") klassificeras som `quota_exhausted`
av reservfallet för kvottext (`buildSubscriptionQuotaFallback`, `accountFallback.ts`;
1 timmes nedkylning) innan regeln `status_429` nås — medan en 429 utan kvottext
klassificeras via regeln `status_429` som `rate_limit_exceeded` och fortfarande kyler
ned IP-familjen. För en leverantör i tillåtelselistan är en IP-baserad hastighetsgräns
samma signal som en uttömd kvot. Rimliga begränsningar:

- **Bästa möjliga insats**: låsningen löser anslutningens senast kända `egress_ip`
  från `proxy_logs` (24-timmarsfönster, synkront, utan cache). Kall cache
  (egress-IP har aldrig undersökts) eller ingen rad → den felande anslutningen
  kyls fortfarande ned av grenen (registreras som i dag), endast ingen
  syskonanslutning låses.
- **Aldrig terminal**: nedkylningen är ett förnyande kvotfönster
  (`testStatus: "unavailable"`); ett permanent tillstånd härleds aldrig från
  en signal på IP-nivå. Anslutningar med `disableCooling` hoppar över grenen
  helt.
- **Låsningsgranulariteten ändras för den tillåtna familjen**: detta är en
  omfångsändring, inte bara en optimering av syskonanslutningar. opencode är en
  `passthroughModels`-leverantör, så före denna gren gav en 429 en låsning per
  MODEL; nu ger den en nedkylning av anslutningen — även för en operatör som kör
  en enda anslutning utan något syskon alls. Det är den granularitet som
  opencodes regel­tabell redan deklarerar som korrekt (`scope: "connection"`,
  `providerErrorRules.ts`), men som hittills aldrig har respekterats eftersom
  opencode inte finns i `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grenen skriver den
  felande anslutningens nedkylning + `backoffLevel` själv, i likhet med den
  anslutningsomfattande agentrouter-grenen, och returnerar — blockeringen per
  modell och den generiska sökvägen nedan nås aldrig.
- **Kombination inkluderad**: liksom agentrouter-grenen ignorerar omfånget
  avsiktligt nedgraderingen `persistUnavailableState`/`isCombo` som en
  kombinationsanropare tillämpar på en 429. En låsning per modell är inte en
  svagare form av detta omfång, utan fel enhet: den säger ingenting om det
  uttömda IP:t, så kombinationsrotationen skulle fortsätta förbruka ett
  garanterat misslyckat anrop per syskon.
- **Syskonsäkerhet**: ett syskon som redan är terminalt (bannlyst/
  credits_exhausted) eller redan befinner sig i en längre nedkylning skrivs
  aldrig över.
- **Exklusiv tillåtelselista**: att utöka `EGRESS_BUCKETED_LOCK_PROVIDERS` är
  ett uttryckligt ägarbeslut; ingen generell inkoppling (mönster
  #10334/#10419). Syskonfrågan binder samma tillåtelselista i stället för att
  upprepa den som en SQL-literal, så att en utökning förblir en ändring på en
  rad.
- **Rotation av egress-IP, i båda riktningarna**: uppslagsfönstret (24 timmar)
  är mycket bredare än TTL för egress-IP-cachen (5 min), så ”senast kända IP”
  är historik, inte aktuellt tillstånd. Om en anslutnings proxy roterade inom
  fönstret kan låsningen **missa** ett genuint delat IP (det registrerade IP:t
  är det nya, outtömda) — och symmetriskt kan den **kyla ned ett syskon som
  sedan dess har roterat bort** från det uttömda IP:t. Det andra fallet kostar
  syskonanslutningen ett nedkylningsfönster; båda accepteras som bästa möjliga
  begränsningar hos en historikbaserad uppslagning.
- **Kostnad**: två begränsade genomsökningar av `proxy_logs` (fönsterfiltrerade
  via `idx_pl_timestamp`), endast med 429-frekvens. Inget nytt index
  (migrering 134, YAGNI). Mätt på en DB-kopia med verklig trafik av måttlig
  storlek; en instans med hög genomströmning innehåller proportionellt fler
  rader i samma fönster.

## Andra resiliensfunktioner

- **20 routningsstrategier** (prioritet, viktad, round-robin, kontextrelä, fyll-först, p2c, slumpmässig, minst använd, kostnadsoptimerad, återställningsmedveten, återställningsfönster, kapacitetsmarginal, kvotviktad, strikt slumpmässig, automatisk, lkgp, kontextoptimerad, cacheoptimerad, fusion, pipeline) — se [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Återställningsmedveten routning** (v3.8.0) — prioriterar anslutningar efter tidpunkten för kvotåterställning.
- **Nedgradering av bakgrundsläge** — Responses API `background: true` nedgraderas till synkront läge med en varning.
- **Dynamisk identifiering av verktygsgränser** — backar från leverantörer när gränser för antalet verktyg nås.
- **Nödreserv** — styrs av `OMNIROUTE_EMERGENCY_FALLBACK`; operatörer kan åsidosätta den från sidan Feature Flags utan omstart.

---

## Felsökning

- En viktad kombination svarar med `503 all_targets_cooling_down` (`Retry-After` är angivet, `diagnostics.excluded` listar varje mål med `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → poolen är konfigurerad och ansluten, men varje mål är exkluderat av en resiliens-timer; varningen `[COMBO] Weighted selection: every target excluded before dispatch — …` anger orsakerna och återstående antal sekunder. Ett `404 no_executable_targets` från samma kombination innebär att ingen resiliens-timer var inblandad (inget kunde köras eller så misslyckades tillgänglighetskontrollen för varje konto). Inbyggt i `open-sse/services/combo/pinRecovery.ts` från exkluderingarna som samlas in i `targetResolution.ts`.
- Alla nycklar för en leverantör hoppas över → kontrollera både kretsbrytarens tillstånd OCH varje anslutnings `rateLimitedUntil`/`testStatus`.
- Leverantören är permanent exkluderad efter återställningsfönstret → kod läser rått `state` i stället för `getStatus()`/`canExecute()`.
- En nyckel misslyckas, andra bör fungera → föredra nedkylning av anslutningen framför kretsbrytaren.
- Endast en modell misslyckas → föredra modellspärr framför nedkylning av anslutningen.
- Tillståndet bör återställas automatiskt men gör inte det → kontrollera om det finns en framtida tidsstämpel och en lässökväg som uppdaterar ett utgånget tillstånd. Permanenta statusar kräver manuella ändringar.

---

## Körtidstillstånd — snabbreferens för agenter

> Flyttat ordagrant från `AGENTS.md` → "Resilience Runtime State" (PR #12743) så att agent-
> guiden håller sig inom kontextbudgeten på 40k. Detta är den komprimerade, agentinriktade översikten över
> avsnitten ovan; de numrerade avsnitten är fortfarande den fullständiga referensen.

OmniRoute har tre relaterade men åtskilda mekanismer för tillfälliga fel. Håll deras
omfattning åtskild när du felsöker routningsbeteendet. Se
[resiliensdiagrammet med tre lager](../diagrams/exported/resilience-3layers.svg)
(källa: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
för en snabb överblick.

### Leverantörens kretsbrytare

**Omfattning**: hela leverantören, t.ex. `glm`, `openai`, `anthropic`.

**Syfte**: sluta skicka trafik till en leverantör som upprepade gånger fallerar på
uppströms-/tjänstenivå, så att en enda bristfällig leverantör inte gör varje begäran långsammare.

**Implementering**:

- Kärnklass: `src/shared/utils/circuitBreaker.ts`
- Koppling för chattgrind/körning: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API för körtidsstatus: `src/app/api/monitoring/health/route.ts`
- Delade omslutningar: `open-sse/services/accountFallback.ts`
- Tabell för beständigt tillstånd: `domain_circuit_breakers`

**Tillstånd** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normal trafik tillåts.
- `DEGRADED`: tidig varningsnivå — antalet fel har passerat nedgraderingströskeln men ännu inte
  brytartröskeln; trafiken fortsätter att flöda och instrumentpanelerna visar varningen. Ett giltigt anslutnings-
  test eller ett lugnt fönster utan nya fel återställer tillståndet till `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` beskriver fönstret).
- `OPEN`: leverantören är tillfälligt blockerad; anropare får ett svar som anger att leverantörens krets är öppen
  eller så går kombinationsroutningen vidare till ett annat mål.
- `HALF_OPEN`: tidsgränsen för återställning har löpt ut; tillåt en testbegäran. Vid lyckat resultat stängs
  brytaren, och vid fel öppnas den igen.

**Standardvärden** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, används via
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` i `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` i `src/sse/handlers/chatHelpers.ts`). Brytaren för hela leverantören
körs utifrån `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil     | nedgraderas vid | öppnas vid (`circuitBreakerThreshold`) | återställning (`circuitBreakerReset`) |
| ---------- | --------------: | -------------------------------------: | ------------------------------------: |
| OAuth      |             `5` |                                    `8` |                                 `60s` |
| API-nyckel |             `7` |                                   `12` |                                 `30s` |
| Lokal      |       (härledd) |                                    `2` |                                 `15s` |

`PROVIDER_PROFILES` definierar även `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) och `providerCooldownMs` (5/10/1 min): dessa driver
**fönstergrinden för den valfria globala leverantörsnedkylningen** (`PROVIDER_COOLDOWN_ENABLED`, inaktiverad
som standard) — en post på leverantörsnivå i `open-sse/services/providerCooldownTracker.ts` räknas endast som
under nedkylning efter `providerFailureThreshold` fel inom `providerFailureWindowMs`, och kyls därefter
ned i `providerCooldownMs`. De är INTE tröskelvärdena för den aktiva brytaren — justera dem inte
i förväntan om att påverka brytarens beteende. Varje standardvärde kan åsidosättas via
miljövariablerna `OMNIROUTE_PROVIDER_BREAKER_*` och `OMNIROUTE_CIRCUIT_BREAKER_*`; den
körtidskorrekta referenstabellen finns i `docs/architecture/RESILIENCE_GUIDE.md`.

Endast felstatusar på leverantörsnivå bör utlösa leverantörens kretsbrytare:

```ts
(408, 500, 502, 503, 504);
```

Utlös inte kretsbrytaren för hela leverantören vid normala konto-/nyckel-/modellfel som de flesta
fall av `401`, `403` eller `429`. Dessa hör vanligtvis till nedkylning av anslutningen eller
modellspärr. Ett allmänt `403` från en API-nyckelleverantör bör kunna återställas om det inte klassificeras
som ett permanent leverantörs-/kontofel.

Brytaren använder lat återhämtning, inte en bakgrundstimer. När `OPEN` löper ut uppdaterar läsningar som `getStatus()`, `canExecute()` och `getRetryAfterMs()` tillståndet till `HALF_OPEN`, så att instrumentpaneler och byggare av kombinationskandidater inte fortsätter att utesluta en utgången provider för alltid.

### Nedkylning av anslutning

**Omfattning**: en provideranslutning/ett konto/en nyckel.

**Syfte**: tillfälligt hoppa över en dålig nyckel/ett dåligt konto samtidigt som andra anslutningar för samma provider kan fortsätta betjäna förfrågningar.

**Implementering**:

- Skriv-/uppdateringsväg: `src/sse/services/auth.ts::markAccountUnavailable()`
- Kontoval/filtrering: `src/sse/services/auth.ts::getProviderCredentials...`
- Nedkylningsberäkning: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Inställningar: `src/lib/resilience/settings.ts`

Viktiga fält på provideranslutningar:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Under kontoval hoppas en anslutning över medan:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Nedkylningar är också lata: när `rateLimitedUntil` ligger i det förflutna blir anslutningen valbar igen. Vid lyckad användning rensar `clearAccountError()` `testStatus`, `rateLimitedUntil`, felfälten och `backoffLevel`.

Standardbeteende för anslutningsnedkylning:

- OAuth-grundnedkylning: `5s`.
- Grundnedkylning för API-nyckel: `3s`.
- API-nyckel `429` bör föredra återförsöksledtrådar uppströms (`Retry-After`, återställningsheaders eller tolkbar återställningstext) när sådana finns.
- Upprepade återställbara fel använder exponentiell backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Thundering-herd-skyddet förhindrar att samtidiga fel på samma anslutning upprepade gånger förlänger nedkylningen eller räknar upp `backoffLevel` dubbelt.

Terminala tillstånd är inte nedkylningar. `banned`, `expired` (som blir terminalt först efter N begränsade återförsök via `EXPIRED_RETRY_MAX`) och `credits_exhausted` är avsedda att förbli otillgängliga tills inloggningsuppgifter/inställningar ändras eller en operatör återställer dem. Skriv inte över terminala tillstånd med transient nedkylningstillstånd.

### Modellutelåsning

**Omfattning**: provider + anslutning + modell.

**Syfte**: undvika att inaktivera en hel anslutning när bara en modell är otillgänglig eller kvotbegränsad för den anslutningen.

Exempel:

- Providers med kvot per modell som returnerar `429`.
- Lokala providers som returnerar `404` för en saknad modell.
- Providerspecifika behörighetsfel för läge/modell, såsom valda Grok-lägen.

Modellutelåsning finns i `open-sse/services/accountFallback.ts` och låter samma anslutning fortsätta betjäna andra modeller.

### Felsökningsvägledning

- Om alla nycklar för en provider hoppas över, inspektera både providerns brytartillstånd och varje anslutnings `rateLimitedUntil`/`testStatus`.
- Om en provider verkar permanent utesluten efter återställningsfönstret, kontrollera om koden läser rått `state` istället för att använda `getStatus()`/`canExecute()`.
- Om en providernyckel misslyckas men andra borde fungera, föredra anslutningsnedkylning framför providerbrytare.
- Om bara en modell misslyckas, föredra modellutelåsning framför anslutningsnedkylning.
- Om ett tillstånd ska återhämta sig självt bör det ha en framtida tidsstämpel/återställningstimeout och en läsväg som uppdaterar utgånget tillstånd. Permanenta statusar kräver manuella ändringar av inloggningsuppgifter eller konfiguration.

---

## TLS-fingeravtryck och stealth

Providerspecifik stealth (JA3/JA4, CCH, obfuskering) dokumenteras separat — se `docs/security/STEALTH_GUIDE.md` (git; kompileras inte in i `/docs`).

---

## Resilienstestning (Fas 8 · Block C)

Utöver enhetstester för resilienslogiken utsätter tre tester körtidsmiljön för
verkliga belastnings-/felförhållanden (alla integration/nightly — ingen blockerar PR:er):

| Test        | Vad                                                                                                                                                                                          | Kör                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Fake-upstream-nod injicerar verklig latens/reset/timeout/503; validerar att circuit breakern öppnas/återhämtar sig och att `checkFallbackError` klassificerar 503 som återställbar fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 strömmar per `createSSEStream` under `--expose-gc`; misslyckas om heapen växer bortom taket (OOM-skydd #3069).                                                                          | `npm run test:heap`                      |
| k6 soak     | Långvarig belastning mot `/api/monitoring/health`; tröskelvärden för p95/fel.                                                                                                                | `k6 run tests/load/k6-soak.js` (nightly) |

Orkestreras av `.github/workflows/nightly-resilience.yml` (cron + dispatch). I
standard-`test:integration` hoppar chaos och heap automatiskt över sig själva (utan `RUN_CHAOS_INT`/`--expose-gc`).

---

## Se även

- [Arkitekturguide](./ARCHITECTURE.md) — Systemarkitektur och interna detaljer
- [Användarguide](../guides/USER_GUIDE.md) — Providers, kombos, CLI-integration
- [Auto-Combo-motorn](../routing/AUTO-COMBO.md) — 16-faktorspoängsättning, lägespaket
