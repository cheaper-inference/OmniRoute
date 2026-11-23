# Resilience Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute har tre separata men relaterade resiliensmekanismer. Var och en har ett eget omfång och syfte. Håll dem åtskilda vid felsökning av routningsbeteende.

![Resiliensmodell med tre lager](../diagrams/exported/resilience-3layers.svg)

> Källa: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Kretsbrytare för leverantörer

**Omfång:** hela leverantören (t.ex. `glm`, `openai`, `anthropic`).

**Syfte:** sluta skicka trafik till en leverantör som upprepade gånger misslyckas på uppströms- eller tjänstenivå.

**Implementering:**

- Kärnklass: `src/shared/utils/circuitBreaker.ts`
- Inkoppling: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- Återställnings-API: `POST /api/resilience/reset`
- Omslag: `open-sse/services/accountFallback.ts`
- Databastabell: `domain_circuit_breakers`

**Tillstånd:**

- `CLOSED` — normal trafik tillåts
- `DEGRADED` — trafik tillåts fortfarande, men förhöjda leverantörsfel spåras
- `OPEN` — leverantören är tillfälligt blockerad; kombinationsroutning hoppar över den
- `HALF_OPEN` — tidsgränsen för återställning har löpt ut; en testbegäran tillåts

**Konfigurerbara standardvärden (`open-sse/config/constants.ts`, tillgängliga i Kontrollpanel → Inställningar → Resiliens):**

| Klass      | Degraderad vid | Öppnas vid | Tidsgräns för återställning |
| ---------- | -------------- | ---------- | --------------------------- |
| OAuth      | 5 fel          | 8 fel      | 60s                         |
| API-nyckel | 7 fel          | 12 fel     | 30s                         |
| Lokal      | härledd        | 2 fel      | 15s                         |

`degradationThreshold` styr när en leverantör övergår till `DEGRADED`; `failureThreshold` styr när den öppnas och hoppas över. Profiler för lokala leverantörer visas ännu inte på inställningssidan för Resiliens.

**Utlösningskoder:** endast statuskoder på leverantörsnivå `[408, 500, 502, 503, 504]`. Utlös INTE för fel på kontonivå (de flesta 401/403/429 — de hör till nedkylning eller spärrning).

**Lat återhämtning:** när `OPEN` löper ut uppdaterar `getStatus()`, `canExecute()`, `getRetryAfterMs()` tillståndet till `HALF_OPEN`. Ingen bakgrundstimer behövs.

---

### Valfri global leverantörsnedkylning (fönsterspärr)

Ett fjärde, **valfritt** lager (`PROVIDER_COOLDOWN_ENABLED`, som standard **av**) behåller ett
minne över misslyckade leverantörer mellan begäranden i
`open-sse/services/providerCooldownTracker.ts`, vilket används vid lösning av kombinationsmål
så att efterföljande kombinationsbegäranden inte fortsätter att gå igenom en leverantör som nyss
misslyckades. Poster på leverantörsnivå följer fönsterspärren `PROVIDER_PROFILES`:

| Profil     | utlöses efter (`providerFailureThreshold`) | inom (`providerFailureWindowMs`) | kyls ned i (`providerCooldownMs`) |
| ---------- | -----------------------------------------: | -------------------------------: | --------------------------------: |
| OAuth      |                                       `10` |                          `15min` |                            `5min` |
| API-nyckel |                                       `15` |                          `30min` |                           `10min` |

Under tröskelvärdet anses leverantören **inte** vara under nedkylning; ett lyckat
anrop rensar fönstret. Poster på anslutningsnivå (`provider:connectionId`) behåller
i stället den exponentiella backoffen `minRetryCooldownMs → maxRetryCooldownMs`. Åsidosättningar:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressionsskydd: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Anslutningskarens

**Omfattning:** en enskild leverantörsanslutning/ett enskilt konto/en enskild nyckel.

**Syfte:** hoppa över en felaktig nyckel medan andra anslutningar för samma leverantör fortsätter betjäna förfrågningar.

**Implementering:**

- Markera som otillgänglig: `src/sse/services/auth.ts::markAccountUnavailable()`
- Val: `getProviderCredentials*` i samma fil
- Beräkning av karenstid: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Inställningar: `src/lib/resilience/settings.ts`

**Fält per anslutning:**

- `rateLimitedUntil` — tidsstämpel för när karenstiden löper ut
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — räknare för exponentiell backoff

**Standardvärden för karenstid:**

- OAuth-bas: 5 s
- API-nyckelbas: 3 s
- API-nyckel, 429: föredrar uppströms `Retry-After`-/återställningshuvuden eller tolkningsbar återställningstext
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Skydd mot anhopningseffekt:** förhindrar att samtidiga fel förlänger karenstiden för mycket eller ökar `backoffLevel` dubbelt.

**429-svar för samtidighetsgränser klättrar inte uppför backoff-stegen.** Ett `429` vars brödtext rapporterar en
samtidighetsgräns ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) innebär att kontot fungerar men är upptaget.
`checkFallbackError()` returnerar orsaken `concurrency_limited`: växla över till nästa
anslutning nu, sätt denna i karens under ett fast `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) eller enligt
uppströmsförsökstipset, lämna `backoffLevel` oförändrat och ange `skipProviderBreaker`.
En uttrycklig kvotbrödtext har fortfarande företräde, så en brödtext som även matchar ett kvotmönster behåller bedömningen
kvot. Identifiering: `looksLikeConcurrencyLimit()` i `src/shared/utils/classify429.ts`;
bedömning: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (kretsbrytarens
`FailureKind`) är oförändrad och ger fortfarande `rate_limit` för dessa brödtexter.

**Stopp i ströminnehållet sätter inte kontot i karens.** När vakthunden för stopp i innehåll
(`open-sse/utils/streamHandler.ts`) ger upp på en ström som inte skickade några modellutdata i
tid registrerar `markAccountUnavailable()` felet för anslutningen men anger ingen
karenstid: stoppet hör till den aktuella förfrågan och beror oftast på en lång resonemangsomgång utan
utdata ännu. Operatörer kan återaktivera detta med `resilienceSettings.streamStallCooldown.enabled`
(standardvärde `false`).

**Resonemangsramar startar om budgeten för innehållsstopp.** En resonemangsmodell kan tänka i
flera minuter före sin första synliga token: Claude strömmar `thinking_delta`-ramar vars
resonemangstext kan vara tom, och Responses API strömmar det ena resonemangsobjektet efter
det andra. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) identifierar
dessa ramar, och vakthunden startar om sin budget för varje sådan i stället för att avbryta
omgången. De är fortfarande inte modellutdata, så en omgång som avslutas med enbart resonemang rapporteras fortfarande
som tom, och en omgång som slutar resonera och bara skickar livstecken utlöser fortfarande
vakthunden.

Kiros binära `reasoningContentEvent`-ramar med en icke-tom signatur bevarar denna
resonemangsaktivitet genom exekveraren som en tom `reasoning_content`-delta. Signaturen
vidarebefordras inte. Metadata, ofullständiga ramar och tomma signaturer startar inte om
innehållsbudgeten; den oberoende tidsgränsen för aktiva strömmar och klientavbrott gäller fortfarande
(`open-sse/executors/kiro/reasoning.ts`).

**Terminaltillstånd (INTE karenstider):**

- `banned` — anges vid identifiering av förbjudna nyckelord/kontospärrar (se [BAN_DETECTION](../security/BAN_DETECTION.md)) och efter tre på varandra följande uppströmsavslag per förfrågan (`request_rejected`, t.ex. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); ett enstaka avslag sätter endast anslutningen i karens
- `expired` (övergår till terminalt tillstånd efter ett begränsat antal omförsök — `EXPIRED_RETRY_MAX = 3` med exponentiell backoff — så att tillfälliga OAuth-fel kan åtgärdas automatiskt innan kontot inaktiveras permanent)
- `credits_exhausted`

Dessa kvarstår tills autentiseringsuppgifterna ändras eller en operatör återställer dem. Skriv inte över terminaltillstånd med tillfälliga karenstillstånd.

**Lat återhämtning:** när `rateLimitedUntil` har passerats blir anslutningen tillgänglig igen. Efter lyckad användning rensar `clearAccountError()` alla felfält.

### Claudes OAuth-användningsgräns: fil med lägre prioritet + återställning av sessionsgräns

**Omfattning:** en Claude-prenumerationsanslutning (OAuth). Båda funktionerna är **frivilliga per
anslutning** (Redigera anslutning → Claude-sektionen → `lowPriorityMode`/`autoLimitReset` i
`providerSpecificData`, båda inaktiverade som standard) och motsvarar Claude Codes kommandon `/low-priority` och
`/limit-reset` (protokollkontrakt hämtat från Claude Code 2.1.263).

**Implementering:**

- Tillståndsmaskin + svarsklassificering: `open-sse/services/claudeLowPriority.ts`
- Klient för återställningsstatus/anspråk: `open-sse/services/claudeLimitReset.ts`
- Exekverarkrok (huvudinjektion + nytt försök med samma konto): `open-sse/executors/base.ts::execute()`
- Beständig lagring av aktivering: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Utlösare:** användningsgränsen på 5 timmar — ett `429` vars huvuden innehåller
`anthropic-ratelimit-unified-status: rejected` och, när kontot är berättigat,
`anthropic-ratelimit-unified-slow-offer: treatment`. Inget skickas före detta första
429-svar för gränsen; ett plötsligt 429-svar utan enhetliga huvuden går via den normala karensvägen.

**Fil med lägre prioritet** (`lowPriorityMode`):

- Vid väggens 429 accepterar exekveraren erbjudandet och försöker omedelbart igen med **samma**
  konto med `anthropic-usage-limit: slow`; körfältet förblir aktivt till det annonserade
  `anthropic-ratelimit-unified-reset` (+60 s respit), och varje begäran inom det fönstret innehåller
  headern. Den uppfångade 429 når aldrig `handleChatCore`, så anslutningen förs
  **inte** in i nedkylning och roteras inte bort.
- `anthropic-ratelimit-unified-slow-status` i senare svar: `active` / `not_needed`
  behåller körfältet; `slot_busy` (429) eller en `529` väntar enligt serverns
  `anthropic-ratelimit-unified-slow-retry-after` (standard 20 s, begränsat till 5–600 s, ±30 % jitter)
  och försöker igen, begränsat av `anthropic-ratelimit-unified-slow-max-wait` (standard 20 min, begränsat
  till 1 min–6 h) — därefter avslutas körfältet och en 10 minuter lång avsvalningsperiod blockerar nytt godkännande. Väntetiden
  begränsas dessutom av den tid som återstår av begärans egen tidsgräns för uppströmsstart
  (`resolveFetchStartTimeout`, 10 min som standard) minus en marginal på 5 s: utan den begränsningen skulle
  den maximala standardväntetiden på 20 minuter överleva begäran, och vänteläget skulle avbrytas
  mitt under väntan, vilket skulle exponera ett `TimeoutError` i stället för det kontrollerade avslutet `max_wait` + avsvalning.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, en övergång till ett nytt 5-timmarsfönster eller
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (vilket avslutar det som
  `extra_usage` oavsett status, eftersom betald överförbrukning nu täcker väggen) avslutar körfältet;
  svaret går sedan vidare till den normala nedkylningsvägen. `budget_exhausted` sparas till
  den annonserade budgetåterställningen (≤ 8 dagar).
- Väggkontrollen körs efter exekverarens egna 400-utlösta försök inom samma körning (kontextredigering,
  begränsningar av tänkande/ansträngning, automatisk parameterinlärning), så en vägg-429 som bara visas vid
  ett av dessa nya försök fångas fortfarande upp i stället för att nå nedkylningsvägen.
- Tillståndet lagras i minnet per anslutning (en omstart kostar en extra vägg-429 för att acceptera igen).

**Återställning av sessionsgräns** (`autoLimitReset`, provas före körfältet när båda är aktiverade):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`-
  block; när `arm: "reset"` och `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` med
  `{ "program": "juniper_tide" }` (organisationens UUID från
  `providerSpecificData.organizationUUID`, bootstrap som reserv).
- `result: reset|not_limited` → begäran provas igen med full hastighet (ingen slow-header).
  `already_used` / `not_offered` memorerar `next_available_at` (standard en vecka); alla
  fel medför en backoff på 15 minuter. Återställningen kan göras en gång i veckan och räknas fortfarande mot
  veckogränsen.

Regressionsskydd: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sessionsaffinitet (#7274)

**Omfattning:** en klientsession (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`-header) fästs vid en anslutning, för **vilken** leverantör som helst.

**Syfte:** hålla en agent med flera turer (Claude Code, aider, anpassade agenter) på samma konto mellan begäranden, vilket minskar kontextförlust mellan konton och upprepade 429 vid kallstart hos leverantörer med sessionsstatus per konto.

**Implementering:**

- TTL-upplösning: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Val/skapande av fästning: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extrahering av header (generisk, valfri leverantör): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Beständig fästningstabell: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Inställning: `sessionAffinityTtlMs` (global TTL i ms, `0` inaktiverar) — `src/lib/db/settings.ts`. Namnet ändrades från den Codex-specifika `codexSessionAffinityTtlMs` genom migreringen `124_generic_session_affinity_ttl.sql`, som överför en eventuell tidigare konfigurerad Codex-TTL som det nya standardvärdet.

Före #7274 avslutades `resolveSessionAffinityTtlMs()` omedelbart med `0` för alla leverantörer utom `codex`, så TTL-inställningen (och sessionsheaderna) hade ingen effekt någon annanstans, trots att fästningsmekanismen och headerextraheringen redan var leverantörsoberoende. Korrigeringen tog bort denna tidiga retur; TTL gäller nu enhetligt för alla leverantörer när den globala inställningen har satts till ett värde över `0`.

De tre headerna för sessionsaffinitet vidarebefordras aldrig uppströms — exekverarna bygger sina egna uppströmsheader från grunden i stället för att vidarebefordra klientheader, så detta förblir endast ett internt korrelations-id.

### Exklusiva anslutningslån för hanterade sessioner

**Omfattning:** en aktiv hanterad HTTP-klient/session äger en behörig OmniRoute-anslutning.

**Syfte:** tillhandahålla varaktigt, exklusivt ägarskap över anslutningar för klienter som behöver en strikt
routningsbarriär mellan begäranden. Detta skiljer sig från sessionsaffinitet, som är en mjuk kontinuitetspreferens:
ett exklusivt lån bevarar livscykeltillståndet i SQLite, upprätthåller global unikhet för aktiva ägare och
aktiva anslutningar samt avvisar en inaktuell generation före leverantörsdispatch.

Funktionen aktiveras per API-nyckel. En hanterad nyckel måste ha omfånget `lease:exclusive` och en
explicit lista `allowedConnections` som inte är tom. Alla HTTP-klienter kan använda livscykelslutpunkten; inget
klientnamn, ingen user-agent, leverantör, OAuth-metod eller modell krävs. Lånet äger en anslutning,
inte en modell, så ett modellbyte behåller bindningen så länge anslutningen förblir normalt
behörig. Normala regler för modell, kvot, hälsa, nedkylning och tillåtelselista förblir styrande och kan
flytta samma generation till en annan ledig, behörig anslutning.

Livscykeln är `POST /api/v1/session-leases` med JSON-åtgärderna `acquire`, `renew` och `release`.
Hanterade inferensförfrågningar innehåller det ogenomskinliga värdet `X-OmniRoute-Lease-Owner` och exakt
`X-OmniRoute-Lease-Generation`. Ägarvärdet består av `vlo_` följt av 43 base64url-tecken; endast
dess SHA-256-hash lagras. Varje slutlig dispatch-spärr binder även det autentiserade API-nyckel-ID:t och
det aktiva anslutnings-ID:t. Styrhuvuden för leasingen tas bort från loggar, sparade ögonblicksbilder av förfrågningar och
huvuden till exekverare uppströms.

Om den ordinarie routningen har kvalificerade hanterade kandidater men varje ledig kandidat är upptagen av en
främmande aktiv lease returnerar OmniRoute HTTP `429`, koden lease-capacity-unavailable, tillståndet
waiting-for-capacity och ett begränsat `Retry-After` som härleds från den tidigaste relevanta utgångstiden.
Att inga kandidater kvalificerar sig vid ordinarie routning beror inte på lease-konkurrens och behåller den befintliga routningens felsemantik.

Relaterade mekanismer förblir separata:

- OAuth-sessionsbeläggning är processlokal, mjuk distribution för OAuth-konton.
- Kontosemaforer beviljar samtidighetstillstånd för förfrågningar och upphör när en förfrågan slutförs.
- Exklusiva hanterade sessionsleasar är beständigt livscykelägarskap med en generationsspärr.

---

## 3. Modellspärr

**Omfattning:** kombinationen leverantör + anslutning + modell.

**Nyckelomfattning efter status:** statusen för felet avgör vilken nyckel en spärr skrivs
till (`resolveLockoutScope()` i `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — en kvot- eller behörighetssignal — spärrar **kvotfamiljen**:
  för codex hela omfattningen `codex` / `spark` (alla `gpt-5*`-modeller för
  anslutningen), för andra leverantörer `getQuotaScopedModelForProvider()`.
- `404` spärrar den rena modellen (`getModelLockKey()` begränsar `not_found`).
- Alla andra statuskoder — transport-/serverfel av typen `5xx` och OmniRoutes egen
  syntetiserade `502` från kvalitetsvalideringen — spärrar endast den **exakta**
  kombinationen av leverantör/anslutning/modell. En felaktig ström för en modell är inte belägg
  för något om kontots kvot. Före denna regel gjorde ett tomt svar från
  `codex/gpt-5.6-luna` att alla `gpt-5*`-modeller för den anslutningen togs bort från
  routningen i 2–30 min (med eskalering), trots att dess kvot var opåverkad.
- Ett uttryckligt `scope`-alternativ från anroparen har alltid företräde (Antigravity skickar `"exact"`).

**Syfte:** undvika att inaktivera en hel anslutning när endast en modell är otillgänglig eller kvotbegränsad.

**Exempel:**

- Leverantörer med kvot per modell som returnerar 429
- Lokala leverantörer som returnerar 404 för en saknad modell
- Leverantörsspecifika behörighetsfel för lägen/modeller (t.ex. Grok-lägen)

**Implementering:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Kontrollpanel för modellvänteperioder (v3.8.0)

Gränssnitt: Inställningar → Modellvänteperioder (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Visar aktiva spärrar med: leverantör, anslutning, modell, orsak, expiresAt. Operatörer kan manuellt återaktivera en modell från kortet.

**REST-API:**

- `GET /api/resilience/model-cooldowns` — visa aktiva spärrar
- `DELETE /api/resilience/model-cooldowns` — manuell återaktivering. Brödtext: `{provider, connection, model}`. Autentisering: hantering.

### Hanterare för vänteperioder

Gränssnitt: Övervakning → Hanterare för vänteperioder (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

En sida för varje anslutning som har tagits ur routningen av en tillfällig orsak, i stället för
att öppna varje leverantörssida. Den visar anslutningars vänteperioder, modellspärrar och terminala
tillstånd, rensar dem per anslutning, för ett urval eller för alla anslutningar hos en leverantör,
och redigerar de mest finjusterade reglerna för vänteperioder: `streamStallCooldown.enabled` samt basvänteperioden och det maximala antalet backoff-steg för OAuth-/API-nycklars
`connectionCooldown` (sparas via
`PATCH /api/resilience`). Terminala tillstånd (`banned`, `expired`, `credits_exhausted`) visas
men rensas aldrig här.

**REST-API** (`src/lib/resilience/cooldownManager.ts`, autentisering: hantering):

- `GET /api/resilience/cooldowns[?provider=]` — anslutningar med status, återstående vänteperiod,
  backoff-nivå, senaste feltyp och modellspärrar (inga autentiseringsuppgifter)
- `POST /api/resilience/cooldowns` — brödtext `{connectionIds: string[]}` eller
  `{all: true, provider?}`; returnerar `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Gränssnitt för spärrinställningar + återhämtning genom nedtrappning vid framgång (v3.8.23)

Modellspärren gick från ett alltid aktiverat, hårdkodat beteende till en helt konfigurerbar
funktion som måste aktiveras uttryckligen, med ett eget inställningskort och en självläkande återhämtningsväg.

**Inställningskort:** Inställningar → Modellspärr
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Detta är **skilt** från det skrivskyddade `ModelCooldownsCard` ovan (som endast
_visar_ aktiva spärrar) — det nya kortet _konfigurerar parametrarna_. Standardvärden
finns i `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Inställning             | Standardvärde                    | Betydelse                                                  |
| ----------------------- | -------------------------------- | ---------------------------------------------------------- |
| `enabled`               | `false`                          | Huvudreglage — modellspärren är **av som standard**.       |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Uppströmsstatusar som räknas som ett modellspecifikt fel.  |
| `baseCooldownMs`        | `120_000` (120 s)                | Inledande spärrtid för det första felet.                   |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Övre gräns för den eskalerade vänteperioden.               |
| `maxBackoffSteps`       | `10`                             | Maximalt antal eskaleringssteg för exponentiell backoff.   |
| `useExponentialBackoff` | `true`                           | Om upprepade fel ska eskalera vänteperioden exponentiellt. |

Inställningarna sparas via det vanliga inställningslagret och valideras genom
schemat för motståndskraftsinställningar. Kortet begränsar `baseCooldownMs`/`maxCooldownMs`
(med `maxCooldownMs ≥ baseCooldownMs`) och `maxBackoffSteps`.

**Återhämtning genom nedtrappning vid framgång:** återhämtning sker **inte** enbart när timern löper ut. Ett felfritt
svar minskar modellens felantal så att en modell som återhämtar sig
mitt i tidsfönstret slutar eskalera (och rensas) innan dess timer annars skulle ha gjort det. När ett kombinationsmål
lyckas anropar `open-sse/services/combo.ts` funktionen `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), som **halverar** det lagrade
`failureCount` (`Math.floor(failureCount / 2)`). När det når `0` tas spärrposten
bort helt. Motsvarande `recordModelLockoutFailure()`
ökar antalet (och eskalerar vänteperioden) vid fel inom
eskaleringsfönstret. Denna nedtrappning vid framgång kompletterar vanligt timerutlopp —
båda vägarna kan återaktivera en modell.

**Tillstånd:** spärrar lagras **i minnet** (`Map`-objekt per process med
`ModelLockoutEntry`, nycklade efter `provider:connectionId:model`, spärrar med exakt omfattning efter
`provider:connectionId:exact:model`) och sparas inte i
databasen — de försvinner vid omstart. _Inställningarna_ sparas; det aktiva
_spärrtillståndet_ är tillfälligt.

---

## 4. Samtidighetskontroll för quota-share (v3.8.36)

Prenumerationskonton (GLM, MiniMax osv.) accepterar ofta endast ~1–3 samtidiga
förfrågningar; om detta överskrids utlöses 429-fel och spärrtider. Detta är särskilt påtagligt för
**quota-share**-kombinationer (`qtSd/…`), där flera API-nycklar delar på ett
överordnat konto. Tre lager förhindrar att ett delat konto överbelastas.

### Samtidighetstak per anslutning (`max_concurrent`)

Varje leverantörsanslutning kan ange ett `max_concurrent`-tak
(`provider_connections.max_concurrent`, som ställs in i anslutningsdialogen/API:t/databasen).
Lämna det tomt för obegränsad samtidighet. Detta är den enda inställning som styr serialiseringslagret
nedan — ställ in det på kontots faktiska samtidighet (t.ex. GLM ~1, MiniMax ~2).

### Samtidighetstak per modell (`modelConcurrency`)

En anslutning kan dessutom ange exakta samtidighetstak per modell
i sin `rateLimitOverrides`-mappning:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Ställ in detta i anslutningsdialogen (**Rate limit overrides → Samtidighetstak
per modell**, ett `model=cap` per rad) eller via
`PATCH /api/providers/[id]` med samma JSON-struktur. Nyckelsemantik:

- **Anslutningsomfattande kontra modellspecifikt:** `maxConcurrent` förblir det delade,
  anslutningsomfattande taket. När båda gäller förvärvas båda spärrarna
  atomärt i samma sammansatta spärr
  (`global → provider → account → model`); det faktiska beteendet styrs av den
  striktare tillämpliga gränsen.
- **Exakt matchning av modellnyckeln:** nyckeln är modellsträngen som skickas till
  exekveraren efter att routningen har lösts — normalt det rena överordnade modell-id:t
  (`glm-5`), inte ett alias på klientsidan i formatet `provider/model` (`zai/glm-5` matchar
  inte `glm-5`). Värdena är positiva heltalstak för samtidiga förfrågningar.
- **Lokal köhantering, ingen identifiering:** överskjutande förfrågningar köas lokalt med den
  befintliga kö-/timeoutsemantiken (typade antagningsfel av typen `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute identifierar eller härleder inte den överordnade
  policyn — det tillämpar exakt de tak som operatören har konfigurerat. En mättad
  modellspärr inaktiverar aldrig leverantören och skapar aldrig en permanent modellblockering;
  det överordnade beteendet för 429-fel, spärrtid och reservväxling kvarstår som sista
  felhanteringsmekanism.
- **Omfattning per anslutning och process:** taken gäller per databasanslutning
  och lagras i minnet, så två anslutningar som återanvänder samma överordnade API-nyckel
  samordnas inte med varandra.
- **Okonfigurerat innebär oförändrat:** att utelämna mappningen (eller lämna
  fältet i kontrollpanelen tomt) lägger inte till någon modellspärr. Exempelkonfiguration utan
  att ange någon universell leverantörsgräns:

```text
glm-5=1
glm-4.7=3
```

### Serialisering av quota-share-förfrågningar

När en quota-share-dispatch riktas mot en anslutning som anger ett positivt
`max_concurrent`, serialiseras samtidiga förfrågningar till det **kontot** genom en
semafor per anslutning (nyckel `qsconn:<connectionId>`): överskjutande förfrågningar **väntar i
kön** i stället för att överbelasta kontot. Den är **fail-open** — en mättad
kö eller timeout fortsätter utan en plats i stället för att någonsin avvisa en
förfrågan som kan dispatchas. Växla detta i **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, aktiverat som
standard). Utan ett `max_concurrent`-tak är beteendet oförändrat.

> Routningsspärren för quota-share (`selectQuotaShareTarget`, DRR + P2C) är i sig
> fail-open och _nedprioriterar_ endast en anslutning som har nått sitt tak — med en
> pool med en enda anslutning kan den inte införa en hård gräns, så det är denna semafor som faktiskt
> begränsar överbelastningen.

### Spärrtidsmedvetna återförsök för kombinationer

För varje kombinationsstrategi (när funktionen är aktiverad) väntar en förfrågan, som annars skulle
resultera i ett 429-fel på grund av en KORT tillfällig spärrtid, tills spärrtiden löpt ut och
dispatchas på nytt i stället för att returnera 429-felet — detta omfattar TPM-/RPM-fönster
av Gemini-typ (~60s retry-after) för kombinationer med flera modeller, t.ex. när båda målen
i en kombination med två modeller träffar en hastighetsgräns per modell. Begränsas av
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) i **Settings → Resilience**. Den väntar aldrig vid `quota_exhausted`
(låst till midnatt) eller vid orsaker relaterade till autentisering eller att resursen inte hittades.

Samma spärr omfattar fallet före dispatch (#16319): när varje mål i en
kombination hoppas över innan något försök har gjorts eftersom dess modell befinner sig i en kort,
tillfällig blockering, väntar sökvägen med noll försök tills blockeringen upphör inom samma
gränser och dispatchar på nytt, i stället för att svara med ett tipslöst
`503 ALL_TARGETS_SKIPPED`. När ingen väntan tillåts (taket, antalet försök eller budgeten
är förbrukad, eller funktionen är avstängd) uppgraderas slutsvaret till
`429 rate_limit_error` med `retry_after` / `reset_at` från den tidigaste
tillfälliga blockeringens utgångstid; blockeringar på grund av kvot, autentisering eller att resursen
inte hittades behåller det tipslösa 503-svaret.

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

## 5. Inträdeskontroll för begärandekön (v3.8.49 · ärende #6593)

**Omfattning**: den lokala hastighetsbegränsningskön per leverantör+anslutning (`open-sse/services/rateLimitManager.ts`,
med Bottleneck som grund), ett lager under de tre mekanismerna ovan.

**`maxWaitMs` begränsar kötiden; `executionMaxWaitMs` begränsar körningen.**
De två är avsiktligt separata, och ingen av dem påverkar den andra.

`resilienceSettings.requestQueue.maxWaitMs` är **budgetgränsen för väntan i kön**: den
omfattar väntan på en leverantörsplats och tiden därefter i tillståndet QUEUED, och dess timer
nollställs i samma ögonblick som jobbet lämnar QUEUED och börjar köras
(`rateLimitManager.ts`, `wrappedFn`). En begäran som överskrider gränsen når
aldrig uppströmsservern. Standardvärdet är 30000ms, tillhandahållet av `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
i `src/lib/resilience/settings.ts` och verifierat av
`tests/unit/ratelimit-admission-control-6593.test.ts`, så att en ändring gör
testet rött i stället för att detta stycke obemärkt blir inaktuellt.

`resilienceSettings.requestQueue.executionMaxWaitMs` är det som Bottleneck
tar emot som jobbets `expiration`, vars timer startar först efter att jobbet har skickats. Det fungerar
som ett skydd för exekverare som saknar en egen timeout uppströms, och det
höjs till exekverarens egen timeout för start av hämtning när den är längre, så att det
inte kan avbryta ett felfritt pågående svar. Standardvärdet är 600000ms (10 min).

Att mata in köbudgeten i `expiration` var det som tidigare avbröt icke-inkrementella
gatewayer mitt under körningen — de kör legitimt i flera minuter innan de första bytevärdena anländer —
och det är därför en förfallotid exponeras som `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), medan köbudgeten använder
kötidsgränskoden. Åsidosätt någon av dem via `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (miljövariabel) eller instrumentpanelen
(**Inställningar → Motståndskraft**). Båda begränsas till 1ms–24h vid normalisering.

**Prioritetsordning, för båda:** miljövariabeln anger endast _standardvärdet_. Ett värde
som sparats i `resilienceSettings.requestQueue` (instrumentpanel/API-patch, lagrat
i `key_value`) har företräde, och ett anslutningsspecifikt
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` har företräde framför det. Att ange
miljövariabeln i en distribution som redan har ett sparat värde
ändrar därför ingenting — rensa eller uppdatera den sparade inställningen i stället.

Tiden i kön begränsas av `maxWaitMs`; `maxQueueDepth` nedan begränsar hur
många anropare som får stå i kö samtidigt.

**`maxQueueDepth` — valfritt inträdestak (nytt).** `resilienceSettings.requestQueue.maxQueueDepth`
begränsar hur många begäranden som samtidigt får stå i kö (ännu inte skickade) för en
leverantör+anslutning. När kön redan innehåller `maxQueueDepth`
begäranden snabbavvisas en ny begäran med ett typat
`code: "RATE_LIMIT_QUEUE_FULL"`-fel **innan** den någonsin når `limiter.schedule()`
— avvisningen är därför billig och sker före eventuellt efterföljande arbete med
promptkomprimering/översättning för den begäran. Standardvärdet `0` =
inaktiverat, vilket bevarar det befintliga beteendet med en obegränsad kö; begränsat till 0–100000.
Åsidosätt via `RATE_LIMIT_MAX_QUEUE_DEPTH` (miljövariabel) eller
`resilienceSettings.requestQueue.maxQueueDepth` (instrumentpanel/API-patch).

Själva inträdeskontrollen är en ren funktion
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) så att
den kan enhetstestas utan en verklig Bottleneck-begränsare.

> RFC:n som öppnade #6593 föreslog även en `bypassCompressionOnRateLimit`-
> flagga. Pipelinesystemet i detta repos `open-sse/services/compression/` är
> prompt-/kontextkomprimering för den utgående LLM-begäran (`chatCore.ts`,
> omkring blocket `resolveCompressionSettings`/`selectCompressionStrategy`),
> inte HTTP-svarskomprimering av syntetiserade 429-svar — det finns ingen
> motsvarande kodväg för en bokstavlig förbikopplingsflagga. Det steget för promptkomprimering
> körs dessutom för närvarande _före_ `withRateLimit()` i begärandepipelinen, så
> en omordning för att hoppa över det vid ett avvisande på grund av full kö är en separat och större
> ändring än vad som omfattas av detta ärende; den implementerades avsiktligt **inte**
> här och lämnas som en uppföljning om CPU-besparingen är värd
> risken med omordningen.

---

## 6. Övervakning av dataflöde för långsamma strömmar (#9709)

Det valfria skyddet `resilienceSettings.streamRecovery.throughputWatchdog` identifierar
en uppströmskälla som fortfarande skickar datablock men producerar assistentutdata under
den konfigurerade takten för användbara utdata. Det skiljer sig avsiktligt från tidsgränsen för inaktivitet:
hjärtslag och metadata återställer ingen av tidsmätarna och räknas inte som framsteg. Det
skiljer sig även från den fasta tidsgränsen för försök (#9153), som förblir en absolut
säkerhetsgräns oavsett utdatakvalitet.

Övervakningen kräver en uppvärmningsperiod följd av ett fullständigt rullande fönster innan
den kan avbryta. Den räknar textdeltan från utdatahändelser i Chat Completions- och Responses-API:erna
(en konservativ proxy för UTF-8-byte), ignorerar händelser som endast innehåller användningsdata samt tomma händelser och
pausar bedömningen medan verktygsanrops- eller resonemangshändelser pågår. Den är inaktiverad
som standard och kan aktiveras med `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
fönstret, uppvärmningen, minimitakten och minsta mätbara utdata begränsas av det
ordinarie normaliseringslagret för resiliensinställningar.

När funktionen är aktiverad tillämpas ett avbrott från övervakningen endast på det aktiva uppströmsförsöket. Innan
några byte har blivit synliga för klienten kan den befintliga vägen för tidig återställning inom samma konto öppna
försöket på nytt. Efter bekräftelse spelas strömmen aldrig blint upp igen; endast det befintliga
säkra kontraktet för fortsättning mitt i strömmen kan sammanfoga ett suffix. Slutförandet förblir
en engångsåtgärd, så användningsredovisning och frigöring av semaforen dupliceras inte.

---

## 7. Omformulering av uppströmsstatus (felaktigt angivna kvotfel)

**Omfattning:** en uppströmsgateway som rapporterar tillfällig kvotförbrukning med fel HTTP-status.

**Syfte:** korrigera en missvisande status FÖRE klassificering, så att efterföljande konsumenter (reservmotorn, kombinationsaggregeringen och det klientriktade svaret) ser felets verkliga, omprövningsbara karaktär.

Vissa gatewayar signalerar TILLFÄLLIG kvotförbrukning med en HTTP-status
som inte kan prövas på nytt. `agentrouter.org` returnerar `403` (ibland `400`) med en kinesisk brödtext
(`用户额度不足` / `额度不足`) i stället för standardvärdet `429`. Klienter som Claude
Code behandlar `403` som permanent och avbryter sessionen, och utan korrigering
skulle reservmotorn klassificera det som `AUTH_ERROR` i stället för en
kvothändelse.

**Implementering:**

- Register + matchare: `open-sse/config/upstreamStatusRestatement.ts` — en
  lista med regler per leverantör (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), matchade via `applyStatusRestatement()`.
- Anropsplats: blocket `providerFailure:` i `open-sse/handlers/chatCore.ts`
  (omkring rad 3654), direkt efter att `parseUpstreamError()` tolkar ett uppströmssvar
  med en HTTP-felstatus (`!providerResponse.ok`) och innan någon
  klassificering körs, så att varje efterföljande konsument ser den korrigerade
  statusen. Fel som är inbäddade i en `200`-SSE-ström följer en separat,
  senare sökväg för strömtolkning och omfattas **inte** av denna hook i nuläget — en
  känd begränsning som ännu inte behövs för agentrouters felaktiga status (som
  visas som en HTTP-felstatus).
- Behörighet för nytt försök: `429` finns i `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), så ett omformulerat fel
  medför ett verkligt fönster för nytt försök i stället för att visas som ett inaktivt `403`.
- Det syntetiska `60s`-värdet för `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  är endast vad det omformulerade svaret anger för **klienten**; det är inte i sig
  anslutningens interna varaktighet för nedkylning/spärrning — den styrs
  separat av den mekanism som faktiskt hanterar det omformulerade felet
  (Connection Cooldowns eskalerande backoff, §2, basvärdet `3s` för leverantörer
  som använder API-nycklar; eller Model Lockout, §3, för leverantörer med
  modellbaserade kvoter, som agentrouter). Routern kan bli behörig att försöka igen internt
  tidigare än det 60-sekundersfönster som den annonserar för klienten — avsiktlig marginal,
  inte ett fel.

Permanenta fel (agentrouters `无权访问模型` — ingen åtkomst till den här modellen)
omformuleras ALDRIG: `excludeMarkers` åsidosätter regeln även när `textMarkers` matchar,
så felet behåller sin ursprungliga status och inget försöker upprepa det i all oändlighet. Den
matchande klassificeringsregeln för leverantören
(`agentrouter-model-access-denied` i `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, en deklarerad grundläggande nedkylning på `6h`)
används av `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_före_ den generiska tidiga returen `FORBIDDEN` för API-nyckelkategorin, villkorat av
`honorsRuleLockScope(provider)` (#10334 — för närvarande exklusivt för agentrouter via
tillåtelselistan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i
`providerErrorRules.ts`). Regelns deklarerade nedkylning på 6 timmar förs vidare som
`fallbackResult.baseCooldownMs`, men den matas fortfarande in i den befintliga
spärrvägen för modellbaserade kvoter (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, oförändrad av #10334 förutom nedkylningskällan):
den begränsas nedåt till operatörens `mlSettings.maxCooldownMs`
(standardvärdet `1_800_000ms` / 30 min), precis som alla andra modellspärrar, och den
_beständigt lagrade spärrorsaken_ förblir det befintliga hårdkodade värdet `"forbidden"`,
inte regelns `"auth_error"` — endast nedkylningens varaktighet respekteras
hela vägen, inte orsakssträngen. Själva anslutningen förblir aktiv;
andra modeller på samma anslutning påverkas inte.

Omformulerade kvotfel (`额度不足`) träffar en leverantörsregel i produktion
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ingen egen deklarerad nedkylningstid — persistenslagrets
standardvärde för skalad backoff används). Sedan #10334 används `scope` i
`ProviderErrorRuleMatch` hela vägen, men **endast** för leverantörer i
tillåtelselistan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
i dag endast `"agentrouter"`, begränsat via `honorsRuleLockScope()`). För alla
andra leverantörer förblir `scope` informativt, precis som före #10334.
`checkFallbackError` exponerar den matchade regelns omfång som
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) är den gemensamma kontrollen som bekräftar att ett
`ruleScope` verkligen är säkert att behandla som en anslutningsövergripande,
självåterställande signal (omfång `"connection"`, orsak `quota_exhausted`,
aldrig `permanent`, aldrig `creditsExhausted` — ett skydd mot en framtida regel
som parar ihop omfånget `"connection"` med ett permanent kontotillstånd). Två
konsumenter anropar den:

- **Persistens** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  i stället för att hamna i passthrough-leverantörens **modellspecifika**
  spärrgren (agentrouter har `passthroughModels: true` →
  `hasPerModelQuota()` returnerar `true`) tillämpas en **tillfällig
  nedkylningstid för anslutningen** — `testStatus: "unavailable"` +
  `rateLimitedUntil`, aldrig en terminal status
  (`credits_exhausted`/`banned`/`expired`) — så att anslutningen återställs
  automatiskt när nedkylningstiden löper ut i stället för att kräva en manuell
  återställning av autentiseringsuppgifterna. Detta hoppas över för anslutningar
  med `disableCooling: true` (#2997): detta undantag faller i stället vidare
  till den modellspecifika spärren (en dokumenterad kompromiss — se
  kodkommentaren ovanför grenen).
- **Kombinationsroutning inom samma begäran** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): samma kontroll markerar
  anslutningen i mängden `exhaustedConnections` i minnet, med nyckeln
  `${provider}:${connectionId}`. Detta hoppar endast över ett återstående mål
  i SAMMA BEGÄRAN som _självt redan innehåller exakt detta `connectionId`_ i
  sitt eget målobjekt (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` före uppslagningen i `exhaustedConnections`) — en vanlig
  modellistekombination, där syskonmål inte har något eget låst `connectionId`
  och ett sådant endast löses per dispatch från svarets
  `X-OmniRoute-Selected-Connection-Id`-header, matchar aldrig den nyckeln. I
  detta vanliga fall är det INTE denna Set som utgör det verkliga skyddet mot
  att en återstående del återanvänder det nyss uttömda kontot — det är
  persistenslagret ovan (anslutningens `rateLimitedUntil` ligger nu i
  framtiden) i kombination med att samma kontroll undertrycker
  `transientRateLimitedProviders` för felet (se ”Tvåstegsdesign” och
  kodkommentaren för grenen `isAgentrouterConnectionQuotaScope` i
  `targetExhaustion.ts`): eftersom denna Set lämnas omarkerad aktiveras INTE
  tvångstillåtelsen `allowRateLimitedConnection` i `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) för leverantörens
  återstående delar, så autentiseringsvalets filter för `rateLimitedUntil`
  (`src/sse/services/auth.ts:1238`) respekteras som vanligt och en återstående
  del väljer antingen en annan, fortfarande kvalificerad agentrouter-anslutning
  eller misslyckas eftersom inga autentiseringsuppgifter är tillgängliga — den
  tvingar sig inte tillbaka till anslutningen som denna gren just lade under
  nedkylning.

### Tvåstegsdesign: statusomformulering, sedan klassificering

Statusomformulering (`upstreamStatusRestatement.ts`) och leverantörens
klassificeringsregler (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) är separata register som båda använder leverantörs-id
och textmarkörer som nycklar, men de körs på olika ställen och fyller olika
syften: omformuleringen skriver om HTTP-statusen tidigt i `chatCore.ts`;
klassificeringsreglerna väljer reservorsaken `reason` och spärrens `scope`
(`model` / `provider` / `connection`) inuti `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klassificeringsregler ser endast den fullständiga fel**texten** (vilket krävs
för att matcha markörer i brödtexten, exempelvis `额度不足`) för leverantörer
som finns i tillåtelselistan `FULL_TEXT_RULE_PROVIDERS` i
`providerErrorRules.ts` — för närvarande endast `"agentrouter"`. För alla andra
leverantörer i den **inbyggda katalogen** skickar `checkFallbackError` endast
det strukturerade felet (`{code, type}`) till `getProviderErrorRuleMatch`,
vilket räcker för regler baserade på header/status/kod men inte kan se
textmarkörer i brödtexten. Hjälpfunktionen `resolveRuleMatchBody()` gör detta
val: fullständig feltext för tillåtna leverantörer, annars det strukturerade
felet. Att lägga till en **inbyggd** leverantör i `FULL_TEXT_RULE_PROVIDERS` är
ett uttryckligt val per leverantör — det finns för att standardsökvägen för
varje leverantör som inte finns i listan ska förbli byte-för-byte oförändrad.

En regels `scope` (`model` / `provider` / `connection`) är ett separat
aktivt val från `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` exponerar det
endast som `fallbackResult.ruleScope`, och nedströmskonsumenter behandlar det
bara som något annat än en informativ etikett för leverantörer i
tillåtelselistan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samma fil (`begränsat via
honorsRuleLockScope()` — i dag endast `"agentrouter"`). Se ”Omformulerade
kvotfel” ovan för vad en matchning med `scope: "connection"` faktiskt gör när
en leverantör väl finns i den tillåtelselistan.

**#11104 — regler som deklareras av operatören kringgår båda tillåtelselistorna.** En operatör kan
deklarera en regel per leverantör vid körning via `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
utan att redigera den här filen. Att villkora en operatörsregel med
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — tillåtelselistor
avsedda att skydda **standardbeteendet** för inbyggda katalogregler — skulle
göra inställningsmekanismen verkningslös för alla leverantörer utom dem som redan
finns med där, eftersom deklarationen av regeln redan är operatörens uttryckliga
godkännande. `resolveRuleMatchBody()` och `honorsRuleLockScope()` kontrollerar båda
`hasOperatorRuleForProvider()` först: en leverantör med en operatörsregel får
den råa feltexten och dess deklarerade `scope` respekteras, oavsett om
leverantören även förekommer i någon av tillåtelselistorna.

**Känd brist — `providerRuleRegistry` konsulteras aldrig för HTTP 400.**
`BAD_REQUEST`-grenen i `checkFallbackError` klassificerar status 400 helt
genom sina egna mönsterarrayer (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` osv. i `accountFallback.ts`) och returnerar innan
grenen `configuredRule`/`getProviderErrorRuleMatch` ovanför nås.
En inbyggd katalogregel (eller en operatörsregel) med `status: 400` är
syntaktiskt giltig men kommer aldrig att aktiveras. Ingen befintlig regel gäller 400 i dag,
så inget i produktion påverkas — men en framtida 400-regel kräver att den här
grenen ändras först, vilket är en större ändring än att lägga till en regel (den
klassificerar om 400 för varje leverantör som redan förlitar sig på beteendet
med mönsterarrayer) och ligger utanför omfattningen för tillägg av en regel för en enskild leverantör.

### Lägga till en ny gateway som felaktigt anger kvotstatus

1. Registrera en regelarray i `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Håll `textMarkers`
   leverantörsspecifika; återanvänd aldrig generiska engelska fraser som kolliderar med
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Registrera vid behov klassificeringsregler i
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) för att välja
   rätt låsomfattning (`connection` för kontoomfattande kvot, `model` för
   fel per modell). Det här steget får endast effekt i produktion för
   leverantörer vars regler behöver den fullständiga feltexten (markörer i brödtexten): lägg till
   leverantörs-ID:t i `FULL_TEXT_RULE_PROVIDERS` i samma fil — annars
   skickar `checkFallbackError` bara det strukturerade felet
   `{code, type}` till regeln, och en regel för brödtext kommer aldrig att matcha livetrafik.
   Regler som enbart matchar `status`/`headers` (som Opencodes eller
   Minimaxs) behöver inte detta uttryckliga godkännande. Om regeln dessutom deklarerar
   `scope: "connection"` och avsikten är en faktisk nedkylningsperiod för hela anslutningen
   samt att kombinationen hoppas över inom samma begäran (inte bara en informativ etikett), lägg till
   leverantörs-ID:t i `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samma fil — det
   är detta som styr användning i stil med `isAgentrouterConnectionQuotaScope()` i
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) och
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); utan detta flödar `scope`
   fortfarande genom `fallbackResult.ruleScope`, men inget agerar på det.
3. Lägg till enhetstester som motsvarar `tests/unit/upstream-status-restatement.test.ts`
   och `tests/unit/agentrouter-error-rules.test.ts` (inklusive skydden
   not-permanent / not-creditsExhausted och — om leverantören behöver
   tillåtelselistan — ett test som verifierar att `resolveRuleMatchBody()` endast returnerar
   den fullständiga texten för den leverantören).

Inga ändringar av `chatCore.ts`, `classifyError` eller kombinationslogiken behövs.

#### Utgående trafik-baserat lås (#10880)

Leverantörer i `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode-familjen) behandlas
som IP-grupperade uppströmsleverantörer (opencodes kostnadsfria nivå är IP-grupperad, inte
kontogrupperad — se #9611): en status 429 som klassificeras som `quota_exhausted`
**eller** `rate_limit_exceeded` kyler ned varje anslutning i den tillåtna familjen
vars senast kända utgående IP-adress matchar den felande anslutningens, innan
rotationen kan prova dem
— vilket undviker N-1 uppströmsanrop som garanterat misslyckas (samma upplägg som #10460/#10525).
`rate_limit_exceeded` inkluderas avsiktligt: på sökvägen `markAccountUnavailable`
matchar de opencode-specifika reglerna aldrig (inga headers/brödtext skickas till
`checkFallbackError`, opencode finns inte i `FULL_TEXT_RULE_PROVIDERS`), så en 429
vars brödtext innehåller texten om prenumerationskvoten ("monthly usage limit
reached") klassificeras som `quota_exhausted` av reservlogiken för kvottext
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 timmes nedkylning) innan
regeln `status_429` någonsin nås — medan en 429 utan kvottext (vanlig
hastighetsbegränsning) klassificeras via regeln `status_429` som `rate_limit_exceeded`
och fortfarande kyler ned IP-familjen. För en leverantör i tillåtelselistan är en IP-grupperad
hastighetsbegränsning samma signal som en uttömd kvot. Faktiska begränsningar:

- **Efter bästa förmåga**: låset hämtar anslutningens senast kända `egress_ip`
  från `proxy_logs` (24-timmarsfönster, synkront, ingen cache). Kall cache
  (utgående IP har aldrig sonderats) eller ingen rad → den felande anslutningen
  försätts fortfarande i nedkylning av grenen (registreras som i dag), men inget
  syskon låses.
- **Aldrig terminalt**: nedkylningen är ett förnybart kvotfönster
  (`testStatus: "unavailable"`); ett permanent tillstånd härleds aldrig från en
  signal på IP-nivå. Anslutningar med `disableCooling` hoppar över grenen helt.
- **Låsgranulariteten ändras för den tillåtelselistebaserade familjen**: detta
  är en ändring av omfattningen, inte bara en syskonoptimering. opencode är en
  `passthroughModels`-leverantör, så före den här grenen ledde ett 429-svar till
  en låsning per MODELL; nu leder det till nedkylning av anslutningen — även för
  en operatör som kör en enda anslutning utan något syskon alls. Det är den
  granularitet som regeltabellen för opencode redan anger som korrekt
  (`scope: "connection"`, `providerErrorRules.ts`), men som hittills aldrig har
  följts eftersom opencode inte finns i `HONORS_RULE_LOCK_SCOPE_PROVIDERS`.
  Grenen skriver själv den felande anslutningens nedkylning +
  `backoffLevel`, i linje med den anslutningsomfattande agentrouter-grenen, och
  returnerar — blocket per modell och den generiska sökvägen nedan nås aldrig.
- **Kombinationer ingår**: precis som agentrouter-grenen ignorerar omfattningen
  avsiktligt den nedgradering via `persistUnavailableState`/`isCombo` som en
  kombinationsanropare tillämpar på ett 429-svar. En låsning per modell är inte
  en svagare form av den här omfattningen, utan fel enhet: den säger ingenting
  om den förbrukade IP-adressen, så kombinationsrotationen skulle fortsätta
  förbruka ett garanterat misslyckat anrop per syskon.
- **Syskonsäkerhet**: ett syskon som redan är terminalt
  (banned/credits_exhausted) eller redan befinner sig i en längre nedkylning
  skrivs aldrig över.
- **Exklusiv tillåtelselista**: att utöka `EGRESS_BUCKETED_LOCK_PROVIDERS` är
  ett uttryckligt ägarbeslut; ingen generisk inkoppling (mönster
  #10334/#10419). Syskonfrågan binder samma tillåtelselista i stället för att
  upprepa den som en SQL-literal, så en utökning av den förblir en ändring på
  en enda rad.
- **Rotation av utgående IP, i båda riktningarna**: uppslagsfönstret (24h) är
  mycket bredare än TTL-värdet för cachen för utgående IP (5 min), så
  ”senast kända IP” är historik, inte aktuellt tillstånd. Om en anslutnings
  proxy roterades inom fönstret kan låset **missa** en verkligt delad IP (den
  registrerade IP-adressen är den nya, icke förbrukade) — och symmetriskt kan
  det **kyla ned ett syskon som sedan dess har roterat bort** från den
  förbrukade IP-adressen. Det andra fallet kostar syskonet ett
  nedkylningsfönster; båda accepteras som begränsningar i en historikbaserad
  uppslagning efter bästa förmåga.
- **Kostnad**: två begränsade genomsökningar av `proxy_logs` (fönsterfiltrerade
  via `idx_pl_timestamp`), endast vid 429-frekvens. Inget nytt index (migrering
  134 YAGNI). Uppmätt på en kopia av en databas med verklig trafik av måttlig
  storlek; en instans med högt dataflöde innehåller proportionellt fler rader
  inom samma fönster.

---

## Andra resiliensfunktioner

- **19 routningsstrategier** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — se [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Återställningsmedveten routning** (v3.8.0) — prioriterar anslutningar efter tidpunkten för kvotåterställning.
- **Nedgradering av bakgrundsläge** — Responses API med `background: true` nedgraderas till synkront läge med en varning.
- **Dynamisk identifiering av verktygsgränser** — backar från leverantörer när gränsen för antalet verktyg nås.
- **Nödreserv** — styrs av `OMNIROUTE_EMERGENCY_FALLBACK`; operatörer kan åsidosätta den på sidan Feature Flags utan omstart.

---

## Felsökning

- En viktad kombination returnerar `503 all_targets_cooling_down` (`Retry-After` är angivet och `diagnostics.excluded` listar varje mål med `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → poolen är konfigurerad och ansluten, men varje mål exkluderas av en resiliens-timer; varningen `[COMBO] Weighted selection: every target excluded before dispatch — …` anger orsakerna och antalet återstående sekunder. Ett `404 no_executable_targets` från samma kombination innebär att ingen resiliens-timer var inblandad (det finns inget att köra, eller så misslyckades tillgänglighetskontrollen för varje konto). Implementerat i `open-sse/services/combo/pinRecovery.ts` utifrån exkluderingarna som samlas in i `targetResolution.ts`.
- Alla nycklar för en leverantör hoppas över → kontrollera både kretsbrytarens tillstånd OCH varje anslutnings `rateLimitedUntil`/`testStatus`.
- Leverantören exkluderas permanent efter återställningsfönstret → koden läser råvärdet `state` i stället för `getStatus()`/`canExecute()`.
- En nyckel misslyckas, men de andra bör fungera → föredra nedkylning av anslutningen framför kretsbrytaren.
- Endast en modell misslyckas → föredra modellspärr framför nedkylning av anslutningen.
- Tillståndet bör återställas automatiskt men gör det inte → kontrollera om det finns en framtida tidsstämpel samt en lässökväg som uppdaterar utgånget tillstånd. Permanenta statusar kräver manuella ändringar.

---

## TLS-fingeravtryck och smygläge

Leverantörsspecifikt smygläge (JA3/JA4, CCH, obfuskering) dokumenteras separat — se `docs/security/STEALTH_GUIDE.md` (git; kompileras inte till `/docs`).

---

## Resilienstestning (fas 8 · block C)

Utöver enhetstester för resilienslogiken testar tre tester körningen under
verkliga belastnings-/feltillstånd (samtliga är integrations-/nattliga tester — inget av dem blockerar PR:er):

| Test                | Vad                                                                                                                                                                                                                | Körning                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| Kaos                | En simulerad uppströmsnod injicerar verklig latens/återställning/tidsgräns/503; validerar att kretsbrytaren öppnas/återställs och att `checkFallbackError` klassificerar 503 som ett återställningsbart reservfel. | `RUN_CHAOS_INT=1 npm run test:chaos`       |
| Heap-tillväxt       | ~500 strömmar per `createSSEStream` under `--expose-gc`; misslyckas om heapen växer över gränsvärdet (OOM-skydd #3069).                                                                                            | `npm run test:heap`                        |
| k6-uthållighetstest | Ihållande belastning mot `/api/monitoring/health`; tröskelvärden för p95/felfrekvens.                                                                                                                              | `k6 run tests/load/k6-soak.js` (nattligen) |

Orkestreras av `.github/workflows/nightly-resilience.yml` (cron + dispatch). I standardkörningen
`test:integration` hoppar kaos- och heap-testerna över sig själva (utan `RUN_CHAOS_INT`/`--expose-gc`).

---

## Se även

- [Arkitekturguide](./ARCHITECTURE.md) — Systemarkitektur och interna funktioner
- [Användarguide](../guides/USER_GUIDE.md) — Leverantörer, kombinationer, CLI-integration
- [Automatisk kombinationsmotor](../routing/AUTO-COMBO.md) — Poängsättning med 16 faktorer, lägespaket
