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

## 2. Anslutning Nedkylning

**Omfattning:** enda leverantör connection/account/key.

**Ändamål:** hoppa över en dålig nyckel medan andra anslutningar för samma leverantör fortsätter att fungera.

**Genomförande:**

- Markera otillgängligt: `src/sse/services/auth.ts::markAccountUnavailable()`
- Urval: `getProviderCredentials*` i samma fil
- Nedkylningsberäkn.: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Inställningar: `src/lib/resilience/settings.ts`

**Fält per anslutning:**

- `rateLimitedUntil` — tidsstämpel tills nedkylningen löper ut
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — exponentiell backoff-räknare

**Standardnedkylningar:**

- OAuth bas: 5s
- API-nyckelbas: 3s
- API-nyckel 429: föredrar uppströms `Retry-After`/reset headers/parseable återställningstext
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Fördröjning för ett nytt försök per leverantör.** Leverantörens detaljsida har en** Försök fördröjning igen** välj (Auto, 15s upp till 1h). Den sparar `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, genom `PATCH /api/resilience`). När ett hastighetsgränsfel inte ger någon uppströms-försökstips, ersätter det värdet den skalade backoffen för leverantören och återställer `backoffLevel` till 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Företräde för ett hastighetsbegränsat fel, högst först: uppströms återförsökstips, sedan per anslutning `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, sedan fördröjningen för återförsök per leverantör, sedan env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, sedan den skalade backoffen. Auto tar bort fältet. Det påverkar bara skälet till gränsen, aldrig terminaltillstånd.

**Anti-dundrande flockvakt:** förhindrar samtidiga fel från att förlänga nedkylningen eller dubbelinkrementera `backoffLevel`.

**Concurrency-limit 429:or klättrar inte uppför backoff-stegen.** En `429` vars kropp rapporterar en samtidighetsgräns ("för många samtidiga förfrågningar", "samtidsgräns", "gräns för parallell begäran", GLM `并发数过高`) betyder att kontot är friskt men upptaget. `checkFallbackError()` returnerar anledning `concurrency_limited`: misslyckas över till nästa anslutning nu, kyl den här för en fast `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) eller uppströms-försökstipset, håll `backoffLevel` oförändrad och ställ in `skipProviderBreaker`. Ett uttryckligt kvotorgan vinner fortfarande, så ett organ som också matchar ett kvotmönster förblir en kvotdom. Detektion: `looksLikeConcurrencyLimit()` i `src/shared/utils/classify429.ts`; dom: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (brytarens `FailureKind`) är oförändrad och läser fortfarande `rate_limit` för dessa kroppar.

**Streama innehållsstånd kyler inte kontot.** När content-stall watchdog (`open-sse/utils/streamHandler.ts`) ger upp på en stream som inte skickade någon modellutdata i tid, registrerar `markAccountUnavailable()` felet på anslutningen men ställer ingen nedkylning: stallen tillhör den begäran, oftast en lång resonemangsväng utan utdata ännu. Operatörer kan välja att delta igen med `resilienceSettings.streamStallCooldown.enabled` (standard `false`).

**Opt-in latenssignal för val av `p2c` konto.** Varje skickat försök registrerar dess tid-till-första-byte och resultat per anslutning (och per anslutning + -modell) i ett rullande fönster i minnet: de senaste 20 proven inom 15 minuter (`open-sse/services/connectionLatencyTracker.ts`, inspelad från `safeLogEvents()` i `src/sse/handlers/chatHelpers.ts`). När `resilienceSettings.p2cLatency.weight` är över `0` (intervall 0-20, standard `0` = av), summerar `compareP2CConnections()` i `src/sse/services/auth.ts` till `weight` poäng för varje kandidat i paret. Hälften av det kommer från latens som ett förhållande till den snabbare kandidaten (dubbelt så långsam tar hela hälften) och hälften från rullande felfrekvens. Termen gäller endast när båda kandidaterna har minst 3 prover, så nya konton straffas inte, och dess tak förblir under de kvotblockerade och kvoterade påföljderna. Den lägger inte till någon egen krets: misslyckade konton hanteras fortfarande av nedkylnings-, lockout- och breaker-lagren. Ställ in den med `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Resoneringsramar startar om innehållsstallbudgeten.** En resonemangsmodell kan tänka i minuter innan dess första synliga token: Claude strömmar `thinking_delta` ramar vars tanketext kan vara tom, och Responses API strömmar det ena resonemangsobjektet efter det andra. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) känner igen dessa ramar och vakthunden startar om sin budget på var och en istället för att avbryta tur. De är fortfarande inte modellutgångar, så en sväng som slutar med enbart resonemang rapporteras fortfarande som tom, och en sväng som stoppar resonemang och bara skickar hjärtslag snubblar fortfarande vakthunden.

Kiro binära `reasoningContentEvent` ramar med en icke-tom signatur bevarar denna resonemangsaktivitet genom executorn som ett tomt `reasoning_content` delta. Signaturen vidarebefordras inte. Metadata, ofullständiga ramar och tomma signaturer startar inte om innehållsbudgeten; den oberoende timeouten för aktiv ström och klientavstängning gäller fortfarande (`open-sse/executors/kiro/reasoning.ts`).

**Terminaltillstånd (NOT nedkylningar):**

- `banned` — ställts in av banned-keyword / account-ban-detektering (se [BAN_DETECTION](../security/BAN_DETECTION.md) ), och av tre på varandra följande avslag uppströms per begäran (`request_rejected`, t.ex. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); ett enda avslag kyler bara ner anslutningen
- `expired` (övergår till terminal efter begränsade försök — `EXPIRED_RETRY_MAX = 3` med exponentiell backoff — så att övergående OAuth fel kan självläka innan kontot avaktiveras permanent)
- `credits_exhausted`

Dessa kvarstår tills autentiseringsuppgifterna ändras eller en operatör återställer dem. Skriv inte över terminaltillstånd med transient nedkylningstillstånd.

**Lat återhämtning:** när `rateLimitedUntil` är förbi blir anslutningen berättigad igen. Vid framgångsrik användning rensar `clearAccountError()` alla felfält.

### Claude OAuth användningsvägg: körfält med lägre prioritet + -återställning av sessionsgräns

**Omfattning:** en anslutning för Claude -abonnemang (OAuth). Båda funktionerna är** opt-in per anslutning** (Redigera anslutning → Claude avsnitt → `lowPriorityMode` / `autoLimitReset` i `providerSpecificData`, båda standard av) och spegla Claude Codes `/low-priority` och `/limit-reset` kommandon (trådkontrakt hämtat från Claude Code 2.1.263).

**Genomförande:**

- Tillståndsmaskin + svarsklassificering: `open-sse/services/claudeLowPriority.ts`
- Återställ status/claim klienten: `open-sse/services/claudeLimitReset.ts`
- Executor hook (header injection + samma konto igen): `open-sse/executors/base.ts::execute()`
- Opt-in persistens: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Utlösare:** 5-timmars användningsväggen — a `429` vars rubriker bär `anthropic-ratelimit-unified-status: rejected` och, när kontot är kvalificerat, `anthropic-ratelimit-unified-slow-offer: treatment`. Ingenting skickas före den första väggen 429; en skur 429 utan enhetliga rubriker går genom den normala nedkylningsvägen.

**Lägre prioritet körfält** (`lowPriorityMode`):

- På väggen 429 accepterar testamentsexekutor erbjudandet och omedelbart försöker igen** samma** konto med `anthropic-usage-limit: slow`; banan förblir aktiv tills den aviserade `anthropic-ratelimit-unified-reset` (+ 60s grace) och varje begäran i det fönstret bär rubriken. Den avlyssnade 429:an når aldrig `handleChatCore`, så anslutningen är det** inte** sätts i cooldown och roteras inte bort.
- `anthropic-ratelimit-unified-slow-status` på senare svar: `active` / `not_needed` behåll körfältet; `slot_busy` (429) eller en `529` vänta serverns `anthropic-ratelimit-unified-slow-retry-after` (standard 20s, clamp 5–600s, ± 30% jitter) och försök igen, begränsat av `anthropic-ratelimit-unified-slow-max-wait` (standard 20 min, clamp 1 min–6 h) — förbi att banan slutar och en 10-minuters avkylningsblockering. Väntetiden begränsas dessutom av vad som är kvar av begärans egen uppströms-start timeout (`resolveFetchStartTimeout`, 10 min som standard) minus en 5 s marginal: utan det taket skulle 20-minuters standard max-wait överleva begäran och sömnen skulle avbrytas mitt i väntan, och få en `TimeoutError` i stället för den graciösa `max_wait` - +.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, en 5h-window rollover, eller `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (som slutar det som `extra_usage` på valfri status, eftersom betald överskott nu täcker väggen) avslutar banan; svaret går sedan till den normala nedkylningsvägen. `budget_exhausted` kommer ihåg tills den aviserade budgetåterställningen (≤ 8 dagar).
- Väggkontrollen körs efter exekutorns egna 400-drivna intra-försök-försök (sammanhangsredigering, thinking/effort klämmor, param auto-learn), så en vägg 429 som bara ytor på ett av dessa försök fortfarande fångas upp istället för att nå nedkylningsvägen.
- Tillståndet är i minnet per anslutning (en omstart kostar en extra vägg 429 att återacceptera).

**Återställning av sessionsgräns** (`autoLimitReset`, försökt före körfältet när båda är på):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` block; när `arm: "reset"` och `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` med `{ "program": "juniper_tide" }` (organisation UUID från `providerSpecificData.organizationUUID`, bootstrap fallback).
- `result: reset|not_limited` → begäran görs om i full hastighet (ingen långsam rubrik). `already_used` / `not_offered` memoise `next_available_at` (standard en vecka); alla fel backar efter 15 minuter. Återställningen sker en gång i veckan och räknas fortfarande mot veckogränsen.

Regressionsskydd: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sessionsaffinitet (#7274)

**Omfattning:** en klientsession (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) fäst till en anslutning, för** några** leverantör.

**Ändamål:** ha en multi-turn agent (Claude Code, aider, anpassade agenter) på samma konto över förfrågningar, vilket minskar kontextförluster över flera konton och upprepade kallstarts 429s på leverantörer med sessionstillstånd per konto.

**Genomförande:**

- TTL upplösning: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Rubrikextraktion (generisk, valfri leverantör): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Beständig pin-tabell: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Inställning: `sessionAffinityTtlMs` (global TTL i ms, `0` inaktiverar) — `src/lib/db/settings.ts`. Omdöpt från Codex-only `codexSessionAffinityTtlMs` genom migration `124_generic_session_affinity_ttl.sql`, som överför alla tidigare konfigurerade Codex TTL som ny standard.

Före #7274 satte `resolveSessionAffinityTtlMs()` hårt till `0` för alla leverantörer utom `codex`, så TTL inställningen (och sessionshuvudena) hade ingen effekt någon annanstans även om pinningsmekanismen och headerextraktionen redan var leverantörs-agnostisk. Korrigeringen tog bort den tidiga återkomsten; TTL gäller nu enhetligt för alla leverantörer som en gång satt globalt över `0`.

De tre sessionsaffinitetshuvudena vidarebefordras aldrig uppströms. — exekutorer bygger sina egna uppströmshuvuden från början snarare än att passera klienthuvuden, så detta förblir endast ett internt korrelations-id.

### Exklusiva leasingavtal för anslutning av hanterade sessioner

**Omfattning:** en aktiv hanterad HTTP client/session äger en kvalificerad OmniRoute anslutning.

**Ändamål:** tillhandahålla varaktigt exklusivt anslutningsägande för kunder som behöver ett hårt routingstängsel över förfrågningar. Detta skiljer sig från sessionsaffinitet, som är en mjuk kontinuitetspreferens: ett exklusivt hyresavtal kvarstår i livscykeltillståndet i SQLite, upprätthåller globala unika aktiva ägare och aktiva anslutningar och avvisar en inaktuell generation innan leverantören skickas.

Funktionen är opt-in per API nyckel. En hanterad nyckel måste ha `lease:exclusive` omfattningen och en explicit icke-tom `allowedConnections` lista. Alla HTTP klienter kan använda livscykelslutpunkten; inget klientnamn, användaragent, leverantör, OAuth -metod eller modell krävs. Hyresavtalet äger en anslutning, inte en modell, så en modelländring behåller bindningen medan anslutningen förblir normalt kvalificerad. Regler för normal modell, kvot, hälsa, nedkylning och godkännandelista förblir auktoritativa och kan överföra samma generation till en annan gratis kvalificerad anslutning.

Livscykeln är `POST /api/v1/session-leases` med JSON -åtgärderna `acquire`, `renew` och `release`. Hanterade slutledningsbegäranden presenterar det opaka `X-OmniRoute-Lease-Owner` värdet och exakta `X-OmniRoute-Lease-Generation`. Ägaren använder `vlo_` följt av 43 base64url-tecken; endast dess SHA-256 hash lagras. Varje sista sändningsstängsel binder också den autentiserade API nyckeln ID och aktiv anslutning ID. Hyreskontrollrubriker tas bort från loggar, kvarhållna ögonblicksbilder av begäran och uppströms executor-rubriker.

Om ordinarie routing har kvalificerade hanterade kandidater men varje ledig kandidat är upptagen av ett utländskt aktivt hyresavtal, returnerar OmniRoute HTTP `429`, lease-capacity-unavailable-kod, en väntande-på-kapacitet-tillstånd och en begränsad `Retry-After` härledd från det tidigaste relevanta utgången. Vanlig tom kvalificering är inte leasingstrid och behåller sin befintliga routingfelsemantik.

Relaterade mekanismer förblir separata:

- OAuth sessionsbeläggning är processlokal mjuk distribution för OAuth konton.
- Kontosemaforer beviljar tillstånd för begäran om samtidighet och avslutas när en begäran slutförs.
- Exklusiva leasingavtal för hanterade sessioner är hållbart livscykelägande med ett generationsstängsel.

---

## 3. Modellockout

**Omfattning:** trippeln provider + connection + model.

**Nyckelns scope per status:** den misslyckade statusen avgör vilken nyckel en lockout skriver till (`resolveLockoutScope()` i `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — en kvot- eller behörighetssignal — låser **kvotfamiljen**: för codex hela `codex` / `spark`-scopet (alla `gpt-5*`-modeller för anslutningen), för andra providers `getQuotaScopedModelForProvider()`.
- `404` låser själva modellen (`getModelLockKey()` begränsar `not_found`).
- Alla övriga statusar — `5xx`-transport-/serverfel och OmniRoutes egen syntetiserade `502` från kvalitetsvalideringen — låser endast den **exakta** provider/connection/model-tupeln. En dålig ström på en modell säger inget om kontots kvot; före den här regeln kunde ett enda tomt svar på `codex/gpt-5.6-luna` ta bort alla `gpt-5*`-modeller för den anslutningen från routing i 2–30 min (eskalerande), medan kvoten var orörd.
- En anropares explicita `scope`-option vinner alltid (Antigravity skickar `"exact"`).

**Syfte:** att undvika att inaktivera en hel anslutning när bara en modell är otillgänglig eller kvotbegränsad.

**Exempel:**

- Providers med kvot per modell som returnerar 429
- Lokala providers som returnerar 404 för en modell som saknas
- Providerspecifika behörighetsfel för läge/modell (t.ex. Grok-lägen)

**Implementering:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Instrumentpanelen Model Cooldowns (v3.8.0)

Gränssnitt: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Listar aktiva lockouts med: provider, connection, model, reason, expiresAt. Operatörer kan återaktivera en modell manuellt från kortet.

**REST API:**

- `GET /api/resilience/model-cooldowns` — lista aktiva lockouts
- `DELETE /api/resilience/model-cooldowns` — manuell återaktivering. Body: `{provider, connection, model}`. Autentisering: management.

### Cooldown Manager

Gränssnitt: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

En sida för varje anslutning som står utanför routing av en tillfällig orsak, i stället för att öppna varje providers egen sida. Den listar anslutnings-cooldowns, modellockouts och terminala tillstånd, rensar dem per anslutning, för ett urval eller för alla anslutningar hos en provider, och används för att redigera de mest justerade cooldown-reglerna: `streamStallCooldown.enabled` samt bas-cooldown och maximala backoff-steg för OAuth- och API-nyckel-`connectionCooldown` (sparas via `PATCH /api/resilience`). Terminala tillstånd (`banned`, `expired`, `credits_exhausted`) listas men rensas aldrig här.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentisering: management):

- `GET /api/resilience/cooldowns[?provider=]` — anslutningar med status, återstående cooldown, backoff-nivå, senaste feltyp samt modellockouts (inga autentiseringsuppgifter)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` eller `{all: true, provider?}`; returnerar `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Inställningsgränssnitt för lockout + återhämtning via success-decay (v3.8.23)

Modellockout gick från ett alltid aktiverat, hårdkodat beteende till en fullt konfigurerbar opt-in-funktion med eget inställningskort och en självläkande återhämtningsväg.

**Inställningskort:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Detta är **åtskilt** från det skrivskyddade `ModelCooldownsCard` ovan (som bara
_listar_ aktiva lockouts) — det nya kortet _konfigurerar parametrarna_. Standardvärdena
finns i `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Inställning             | Standard                         | Betydelse                                                 |
| ----------------------- | -------------------------------- | --------------------------------------------------------- |
| `enabled`               | `false`                          | Huvudbrytare — modellockout är **avstängt som standard**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream-statusar som räknas som ett modell-scopat fel.   |
| `baseCooldownMs`        | `120_000` (120 s)                | Lockout-längd vid det första felet.                       |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Tak för den eskalerade cooldownen.                        |
| `maxBackoffSteps`       | `10`                             | Max antal eskalationssteg för exponentiell backoff.       |
| `useExponentialBackoff` | `true`                           | Om upprepade fel ska eskalera cooldownen exponentiellt.   |

Inställningarna sparas via den vanliga inställningslagringen och valideras mot
schemat för resilience-inställningar; kortet begränsar `baseCooldownMs`/`maxCooldownMs`
(med `maxCooldownMs ≥ baseCooldownMs`) och `maxBackoffSteps`.

**Återhämtning via success-decay:** återhämtningen är **inte** enbart att timern
går ut. Ett lyckat svar räknar ner modellens felräknare, så att en modell som
återhämtat sig mitt i ett fönster slutar eskalera (och rensas) innan timern skulle
ha gjort det. Vid ett lyckat combo-mål anropar `open-sse/services/combo.ts`
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), som **halverar**
den lagrade `failureCount` (`Math.floor(failureCount / 2)`); när den når `0` tas
lockout-posten bort helt. Motsvarigheten `recordModelLockoutFailure()`
ökar räknaren (och eskalerar cooldownen) vid fel inom
eskaleringsfönstret. Denna success-decay gäller utöver vanlig timerutgång —
båda vägarna kan återaktivera en modell.

**Tillstånd:** lockouts hålls **i minnet** (`Map`-objekt per process med
`ModelLockoutEntry` nycklade efter `provider:connectionId:model`, lås med exakt scope
efter `provider:connectionId:exact:model`) och sparas inte i
databasen — de försvinner vid omstart. _Inställningarna_ sparas; det aktiva
lockout-_tillståndet_ är flyktigt.

---

## 4. Samtidighetsstyrning för kvotdelning (v3.8.36)

Prenumerationskonton (GLM, MiniMax osv.) accepterar ofta bara ~1–3 samtidiga
förfrågningar; att överskrida det utlöser 429-svar och nedkylningar. Detta är
särskilt akut vid **kvotdelningskombos** (`qtSd/…`), där flera API-nycklar delar
ett uppströmskonto. Tre lager hindrar att ett delat konto översvämmas.

### Samtidighetstak per anslutning (`max_concurrent`)

Varje leverantörsanslutning kan deklarera ett `max_concurrent`-tak
(`provider_connections.max_concurrent`, anges i anslutningsmodalen / API:t /
databasen). Lämna det tomt för ingen gräns. Detta är det enda reglage som styr
serialiseringslagret nedan – ställ in det på kontots verkliga samtidighet
(t.ex. GLM ~1, MiniMax ~2).

### Samtidighetstak per modell (`modelConcurrency`)

En anslutning kan dessutom deklarera exakta samtidighetstak per modell i sin
`rateLimitOverrides`-mappning:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Ange det i anslutningsmodalen (**Åsidosättanden av hastighetsgränser →
Samtidighetstak per modell**, en `model=cap` per rad) eller via
`PATCH /api/providers/[id]` med samma JSON-struktur. Viktig semantik:

- **Anslutningsövergripande kontra modellspecifik:** `maxConcurrent` förblir
  det delade anslutningsövergripande taket. När båda gäller förvärvas båda
  grindarna atomärt i samma sammansatta grind
  (`global → provider → account → model`); det effektiva beteendet är den
  striktare tillämpliga gränsen.
- **Exakt modellnyckelmatchning:** nyckeln är modellsträngen som skickas till
  exekveraren efter routingupplösning – normalt det rena uppströmsmodell-ID:t
  (`glm-5`), inte ett `provider/model`-alias på klientsidan (`zai/glm-5`
  matchar inte `glm-5`). Värdena är tak för samtidiga förfrågningar uttryckta
  som positiva heltal.
- **Lokal köbildning, ingen upptäckt:** överskjutande förfrågningar köar lokalt
  med befintlig kö-/timeout-semantik (typade `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`-tillträdesfel). OmniRoute upptäcker eller härleder
  inte uppströmspolicy – den upprätthåller exakt de tak som operatören
  konfigurerat. En mättad modellgrind inaktiverar aldrig leverantören och
  skapar aldrig en permanent modellutelåsning; uppströms
  429-/nedkylnings-/fallback-beteende förblir felhanteringens sista skyddsnät.
- **Omfattning per anslutning, per process:** taken gäller per databasanslutning
  och hålls i minnet, så två anslutningar som återanvänder samma
  uppströms-API-nyckel koordinerar inte med varandra.
- **Okonfigurerat betyder oförändrat:** att utelämna mappningen (eller lämna
  instrumentpanelfältet tomt) lägger inte till någon modellgrind.
  Exempelkonfiguration utan att hävda någon universell leverantörsgräns:

```text
glm-5=1
glm-4.7=3
```

### Serialisering av kvotdelningsförfrågningar

När en kvotdelningsdispatch riktar sig mot en anslutning som deklarerar ett
positivt `max_concurrent` serialiseras samtidiga förfrågningar till det
**kontot** genom en semafor per anslutning (nyckel `qsconn:<connectionId>`):
överskjutande förfrågningar **väntar i kön** istället för att översvämma
kontot. Den är **fail-open** – en mättad kö eller timeout fortsätter utan en
plats istället för att någonsin avvisa en dispatchbar förfrågan. Växla i
**Inställningar → Återhämtning → Samtidighet per anslutning för kvotdelning**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, på som standard).
Utan ett `max_concurrent`-tak är beteendet oförändrat.

> Kvotdelningens routinggrind (`selectQuotaShareTarget`, DRR + P2C) är i sig
> fail-open och _nedprioriterar_ bara en anslutning som nått taket – med en
> pool med en enda anslutning kan den inte hårdbegränsa, så det är denna
> semafor som faktiskt håller tillbaka flödet.

### Nedkylningsmedveten omprövning för kombos

För varje kombostrategi (när den är aktiverad) väntar en förfrågan som skulle
kristallisera en 429 för en KORT övergående nedkylning ut den och dispatchar om
istället för att returnera 429:an – detta täcker Gemini-klassens TPM/RPM-fönster
(~60 s retry-after) på flermodellskombos, t.ex. när båda målen i en
2-modellskombo träffar en hastighetsgräns per modell. Begränsas av
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) i
**Inställningar → Återhämtning**. Den väntar aldrig på `quota_exhausted`
(låst till midnatt) eller autentiserings-/hittades-inte-orsaker.

Samma grind täcker fallet före dispatch (#16319): när varje mål i en kombo
hoppas över innan något försök gjorts eftersom dess modell befinner sig i en
kort övergående utelåsning, väntar nollförsöksvägen ut låset under samma tak
och dispatchar om, istället för att svara med en `503 ALL_TARGETS_SKIPPED`
utan ledtråd. När ingen väntan är tillåten (tak, försök eller budget
förbrukade, eller funktionen av) uppgraderas det slutgiltiga svaret till
`429 rate_limit_error` med `retry_after` / `reset_at` från den tidigaste
övergående låsets utgång; kvot-, autentiserings- och hittades-inte-lås
behåller 503:an utan ledtråd.

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

## 7. Omtolkning av uppströmsstatus (felangivna kvotfel)

**Omfattning:** en uppströmsgateway som rapporterar tillfällig kvotuttömning med fel HTTP-status.

**Syfte:** korrigera en missvisande status INNAN klassificering, så att nedströmskonsumenter (fallbackmotorn, combo-aggregeringen, det klientvända svaret) ser felets verkliga omförsöksbara natur.

Vissa gateways signalerar TILLFÄLLIG kvotuttömning med en icke-omförsöksbar
HTTP-status. `agentrouter.org` returnerar `403` (ibland `400`) med en kinesisk
brödtext (`用户额度不足` / `额度不足`) istället för standardstatusen `429`. Klienter
som Claude Code behandlar `403` som permanent och avbryter sessionen, och utan
korrigering skulle fallbackmotorn klassificera det som `AUTH_ERROR` istället för
en kvothändelse.

**Implementering:**

- Register + matchare: `open-sse/config/upstreamStatusRestatement.ts` — en
  lista med regler per leverantör (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), som matchas via `applyStatusRestatement()`.
- Anropsplats: blocket `providerFailure:` i `open-sse/handlers/chatCore.ts`
  (runt rad 3654), direkt efter att `parseUpstreamError()` har parsat ett
  uppströmssvar med en HTTP-felstatus (`!providerResponse.ok`), och innan
  någon klassificering körs, så att varje nedströmskonsument ser den
  korrigerade statusen. Fel som är inbäddade i en `200`-SSE-ström följer en
  separat, senare strömparsningsväg och täcks **inte** av denna hook idag — en
  känd begränsning, som ännu inte behövts för agentrouters felstatus (som
  visar sig som en HTTP-felstatus).
- Behörighet för omförsök: `429` finns i `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), så ett omtolkat fel får
  ett riktigt omförsöksfönster istället för att dyka upp som en död `403`.
- Den syntetiska `60s`-`defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  är bara vad det omtolkade svaret talar om för **klienten**; det är inte i
  sig anslutningens interna cooldown-/lockout-längd — den styrs separat av
  den mekanism som faktiskt hanterar det omtolkade felet (Connection
  Cooldowns eskalerande backoff, §2, bas `3s` för API-nyckelleverantörer;
  eller Model Lockout, §3, för leverantörer med per-modell-kvot som
  agentrouter). Routern kan internt bli berättigad till omförsök tidigare än
  det 60s-fönster den annonserar till klienten — avsiktlig marginal, inte en
  bugg.

Permanenta fel (agentrouters `无权访问模型` — ingen åtkomst till den här modellen)
omtolkas ALDRIG: `excludeMarkers` lägger in sitt veto mot regeln även när
`textMarkers` träffar, så felet behåller sin ursprungliga status och ingenting
försöker igen det i evighet. Den matchande leverantörsklassificeringsregeln
(`agentrouter-model-access-denied` i `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, en deklarerad `6h`-bascooldown)
konsulteras av `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_före_ den generiska apikey-kategorins förtida `FORBIDDEN`-retur, styrd av
`honorsRuleLockScope(provider)` (#10334 — för närvarande exklusivt för
agentrouter via tillåtelselistan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i
`providerErrorRules.ts`). Regelns deklarerade 6h-cooldown flödar vidare som
`fallbackResult.baseCooldownMs`, men den matar fortfarande in i den befintliga
lockout-vägen för per-modell-kvot (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, oförändrad av #10334 förutom cooldown-källan):
den begränsas nedåt till operatörens `mlSettings.maxCooldownMs` (standard
`1_800_000ms` / 30 min), precis som alla andra modell-lockouts, och det
_lagrade lockout-skälet_ förblir det tidigare hårdkodade `"forbidden"`, inte
regelns `"auth_error"` — endast cooldown-längden respekteras från ände till
ände, inte orsakssträngen. Anslutningen i sig förblir aktiv; syskonmodeller på
samma anslutning påverkas inte.

Omtolkade kvotfel (`额度不足`) når en leverantörsregel i produktion
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ingen egen deklarerad cooldown — persistenslagrets skalade
backoff-standard gäller). Sedan #10334 konsumeras `scope` på
`ProviderErrorRuleMatch` FAKTISKT från ände till ände, men **endast** för
leverantörer i tillåtelselistan `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — idag bara `"agentrouter"`, styrt via
`honorsRuleLockScope()`). För alla andra leverantörer förblir `scope`
informativt, exakt som före #10334. `checkFallbackError` exponerar den
matchade regelns scope som `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) är den
delade guard som bekräftar att ett `ruleScope` verkligen är säkert att
respektera som en anslutningsomfattande, självläkande signal (scope
`"connection"`, reason `quota_exhausted`, aldrig `permanent`, aldrig
`creditsExhausted` — ett försvar mot att en framtida regel kopplar scope
`"connection"` till ett permanent kontotillstånd). Två konsumenter anropar
den:

- **Beständighet** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  istället för att hamna i passthrough-leverantörens gren för **per-modell**-spärr
  (agentrouter är `passthroughModels: true` → `hasPerModelQuota()`
  returnerar `true`) tillämpas en **tillfällig anslutningsnedkylning** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, aldrig en terminal status
  (`credits_exhausted`/`banned`/`expired`) — så att anslutningen återställer
  sig själv när nedkylningen löper ut istället för att kräva en manuell
  återställning av autentiseringsuppgifterna. Hoppas över för anslutningar
  med `disableCooling: true` (#2997): det undantaget faller i stället vidare
  till per-modell-spärren (en dokumenterad avvägning — se kodkommentaren
  ovanför grenen).
- **Komboroutning inom samma begäran** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): samma spärr markerar
  anslutningen i den minnesresidenta mängden `exhaustedConnections`, nycklad
  `${provider}:${connectionId}`. Detta hoppar bara över ett återstående mål
  i SAMMA BEGÄRAN som _självt redan bär exakt det `connectionId`_ på sitt
  eget målobjekt (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` före uppslaget i `exhaustedConnections`) — en vanlig
  modellistkombo, där systermål inte bär något eget fastställt `connectionId`
  och ett sådant bara resolves per dispatch från svarets header
  `X-OmniRoute-Selected-Connection-Id`, träffar aldrig den nyckelmatchningen.
  För det vanliga fallet är det verkliga skyddet mot att en återstående
  etapp återanvänder det just uttömda kontot INTE denna Set — det är
  beständighetslagret ovan (anslutningens `rateLimitedUntil` ligger nu i
  framtiden) kombinerat med att samma spärr undertrycker
  `transientRateLimitedProviders` för felet (se "Tvåstegsdesign" och
  kodkommentaren på grenen `isAgentrouterConnectionQuotaScope` i
  `targetExhaustion.ts`): med den Set omarkerad slår `combo.ts`:s
  force-allow `allowRateLimitedConnection`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) INTE in för
  leverantörens återstående etapper, så att filtret `rateLimitedUntil` i
  valet av autentiseringsuppgifter (`src/sse/services/auth.ts:1238`)
  respekteras som vanligt och en återstående etapp antingen väljer en annan,
  fortfarande giltig agentrouter-anslutning eller misslyckas med att inga
  autentiseringsuppgifter finns tillgängliga — den tvingar sig inte tillbaka
  in på anslutningen som denna gren just kyldes ned.

### Tvåstegsdesign: statusomskrivning, sedan klassificering

Statusomskrivning (`upstreamStatusRestatement.ts`) och leverantörens
klassificeringsregler (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) är separata register som båda nycklar på
leverantörs-id och textmarkörer, men de körs på olika ställen och tjänar
olika syften: omskrivningen skriver om HTTP-statusen tidigt i `chatCore.ts`;
klassificeringsreglerna väljer reserv-`reason` och låser `scope`
(`model` / `provider` / `connection`) inne i `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klassificeringsreglerna ser bara den fullständiga fel**texten** (behövs för
att matcha brödtextsmarkörer som `额度不足`) för leverantörer som listas i
tillåtelselistan `FULL_TEXT_RULE_PROVIDERS` i `providerErrorRules.ts` —
för närvarande bara `"agentrouter"`. För varje annan **inbyggd
katalog**leverantör ger `checkFallbackError` `getProviderErrorRuleMatch`
bara det strukturerade felet (`{code, type}`), vilket räcker för regler
baserade på headers/status/koder men är blint för brödtextsmarkörer.
Hjälpfunktionen `resolveRuleMatchBody()` utför detta val: fullständig feltext
för tillåtlistade leverantörer, annars det strukturerade felet. Att lägga
till en **inbyggd** leverantör i `FULL_TEXT_RULE_PROVIDERS` är en uttrycklig
opt-in per leverantör — den finns så att standardvägen för varje leverantör
som inte finns på listan förblir byte för byte oförändrad.

En regels `scope` (`model` / `provider` / `connection`) är en separat opt-in
från `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` exponerar det bara som
`fallbackResult.ruleScope`, och nedströmskonsumenter respekterar det bara
som något annat än en informationsetikett för leverantörer i
tillåtelselistan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samma fil (grindad via
`honorsRuleLockScope()` — idag bara `"agentrouter"`). Se "Omskrivna
kvotfel" ovan för vad en matchning med `scope: "connection"` faktiskt gör när
en leverantör väl finns på den tillåtelselistan.

**#11104 — operatörsdeklarerade regler kringgår båda tillåtelselistorna.**
En operatör kan deklarera en regel per leverantör vid körning via
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
utan att redigera denna fil. Att grinda en operatörsregel bakom
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — tillåtelselistor
som är avsedda att skydda **standard**beteendet för inbyggda katalogregler —
skulle göra inställningsmekanismen verkningslös för varje leverantör utom de
som redan listas där, eftersom själva deklarationen av regeln redan är
operatörens uttryckliga opt-in. `resolveRuleMatchBody()` och
`honorsRuleLockScope()` kontrollerar båda `hasOperatorRuleForProvider()`
först: en leverantör med en operatörsregel får den råa feltexten och får sitt
deklarerade `scope` respekterat, oavsett om den också förekommer i någon av
tillåtelselistorna.

**Känd brist — `providerRuleRegistry` konsulteras aldrig för HTTP 400.**
`checkFallbackError`:s gren `BAD_REQUEST` klassificerar status 400 helt via
sina egna mönstermatriser (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` osv. i `accountFallback.ts`) och returnerar innan
grenen `configuredRule`/`getProviderErrorRuleMatch` ovanför nås. En inbyggd
katalogregel (eller en operatörsregel) med `status: 400` är syntaktiskt giltig
men kommer aldrig att utlösas. Ingen befintlig regel riktar sig mot 400 idag,
så inget i produktion påverkas — men en framtida 400-regel kräver att denna
gren rörs först, vilket är en större ändring än att lägga till en regel (den
omklassificerar 400 för varje leverantör som redan förlitar sig på
mönstermatrisbeteendet) och ligger utanför ramen för ett tillägg av en regel
för en enskild leverantör.

### Lägga till en ny gateway som felaktigt uppger kvot

1. Registrera en regelarray i `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Håll `textMarkers`
   providerspecifika; återanvänd aldrig generiska engelska fraser som kolliderar med
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Registrera vid behov klassificeringsregler i
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) för att välja
   rätt låsomfattning (`connection` för kontoomfattande kvot, `model` för
   fel per modell). Detta steg får endast effekt i produktion för
   providers vars regler behöver hela feltexten (body-markörer): lägg till
   provider-id:t i `FULL_TEXT_RULE_PROVIDERS` i samma fil — annars
   lämnar `checkFallbackError` alltid bara det strukturerade felet
   `{code, type}` till regeln och en body-textregel kommer aldrig att matcha
   livetrafik. Regler som matchar enbart på `status`/`headers` (som Opencodes eller
   Minimaxs) behöver inte denna opt-in. Separat gäller: om regeln deklarerar
   `scope: "connection"` och avsikten är en faktisk anslutningsomfattande nedkylning
   plus combo-hoppning i samma begäran (inte bara en informativ etikett), lägg till
   provider-id:t i `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samma fil — det
   är detta som styr konsumtion i stil med `isAgentrouterConnectionQuotaScope()` i
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) och
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); utan det flödar `scope`
   fortfarande genom `fallbackResult.ruleScope` men inget agerar på det.
3. Lägg till enhetstester som speglar `tests/unit/upstream-status-restatement.test.ts`
   och `tests/unit/agentrouter-error-rules.test.ts` (inklusive
   skydden not-permanent / not-creditsExhausted, och — om providern behöver
   tillåtelselistan — ett test som bekräftar att `resolveRuleMatchBody()` returnerar
   hela texten endast för den providern).

Inga ändringar i `chatCore.ts`, `classifyError` eller combo behövs.

#### Egress-bucketat lås (#10880)

Providers i `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode-familjen) behandlas
som IP-bucketade uppströms (opencodes free tier är IP-bucketad, inte
kontobucketad — se #9611): en status-429 klassificerad som `quota_exhausted`
**eller** `rate_limit_exceeded` kyler ner varje anslutning i familjen på
tillåtelselistan vars senast kända egress-IP matchar den misslyckade
anslutningens, innan rotationen hinner prova dem
— vilket undviker N-1 garanterat misslyckade uppströmsanrop (samma form som #10460/#10525).
`rate_limit_exceeded` inkluderas avsiktligt: på `markAccountUnavailable`-sökvägen
matchar de opencode-specifika reglerna aldrig (inga headers/body lämnas till
`checkFallbackError`, opencode finns inte i `FULL_TEXT_RULE_PROVIDERS`), så en 429
vars body bär prenumerationskvotstexten ("monthly usage limit
reached") klassificeras som `quota_exhausted` av kvot-text-fallbacken
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h nedkylning) innan
regeln `status_429` någonsin nås — medan en 429 utan kvottext (vanlig
rate limiting) klassificeras via regeln `status_429` som `rate_limit_exceeded`
och fortfarande kyler ner IP-familjen. För en provider på tillåtelselistan är en
IP-bucketad rate limit samma signal som en uttömd kvot. Ärliga begränsningar:

- **Efter bästa förmåga**: låset slår upp anslutningens senast kända `egress_ip`
  från `proxy_logs` (24-timmarsfönster, synkront, ingen cache). Kall cache
  (egress-IP aldrig sonderad) eller ingen rad → den misslyckade anslutningen
  kyls fortfarande av grenen (registreras som i dag), det är bara inget syskon
  som låses.
- **Aldrig slutgiltig**: nedkylningen är ett förnyande kvotfönster
  (`testStatus: "unavailable"`); ett permanent tillstånd härleds aldrig från en
  signal på IP-nivå. Anslutningar med `disableCooling` hoppar helt över grenen.
- **Låsgranulariteten ändras för den tillåtlistade familjen**: detta är en
  ändring av omfattningen, inte bara en syskonoptimering. opencode är en
  `passthroughModels`-leverantör, så före den här grenen gav en 429 en
  utelåsning per MODELL; nu ger den en nedkylning av anslutningen — även för en
  operatör som kör en enda anslutning utan något syskon alls. Det är den
  granularitet som opencodes regeltabell redan deklarerar som korrekt
  (`scope: "connection"`, `providerErrorRules.ts`), men som hittills aldrig har
  respekterats eftersom opencode inte finns i
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grenen skriver själv den misslyckade
  anslutningens nedkylning + `backoffLevel`, i linje med agentrouter-grenen med
  anslutningsomfattning, och returnerar — per-modell-blocket och den generiska
  vägen nedanför nås aldrig.
- **Kombo inkluderat**: precis som agentrouter-grenen ignorerar omfattningen
  avsiktligt den nedgradering via `persistUnavailableState`/`isCombo` som en
  komboanropare tillämpar på en 429. En utelåsning per modell är inte en
  svagare form av denna omfattning, det är fel enhet: den säger inget om den
  uttömda IP-adressen, så komborotationen skulle fortsätta bränna ett garanterat
  misslyckat anrop per syskon.
- **Syskonsäkerhet**: ett syskon som redan är slutgiltigt
  (banned/credits_exhausted) eller redan befinner sig i en längre nedkylning
  skrivs aldrig över.
- **Exklusiv tillåtelselista**: att bredda `EGRESS_BUCKETED_LOCK_PROVIDERS` är
  ett explicit ägarbeslut; ingen generisk koppling (mönster #10334/#10419).
  Syskonfrågan binder samma tillåtelselista i stället för att upprepa den som
  en SQL-literal, så att bredda den förblir en enradsändring.
- **Rotation av egress-IP, i båda riktningarna**: uppslagsfönstret (24 h) är
  mycket bredare än egress-IP-cachets TTL (5 min), så "senast kända IP" är
  historik, inte aktuellt tillstånd. Om en anslutnings proxy roterade inom
  fönstret kan låset **missa** en genuint delad IP (den registrerade IP:n är
  den nya, icke-uttömda) — och symmetriskt kan det **kyla ned ett syskon som
  sedan dess har roterat bort** från den uttömda IP:n. Det andra fallet kostar
  det syskonet ett nedkylningsfönster; båda är accepterade begränsningar hos en
  historikbaserad uppslagning efter bästa förmåga.
- **Kostnad**: två avgränsade skanningar av `proxy_logs` (fönsterfiltrerade via
  `idx_pl_timestamp`), endast med 429-frekvens. Inget nytt index (migrering 134
  YAGNI). Mätt på en databaskopia med verklig trafik av måttlig storlek; en
  instans med hög genomströmning håller proportionellt fler rader inom samma
  fönster.

---

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
