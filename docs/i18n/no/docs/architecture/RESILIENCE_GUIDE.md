# Resilience Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute har tre distinkte, men relaterte motstandsmekanismer. Hver har et annet omfang og formål. Hold dem atskilt når du feilsøker rutingatferd.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Kilde: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-dashboard-prioritet for spenstvekslinger.** Den opt-in-resiliens veksler fra omgivelsene `QUOTA_PREFLIGHT_CUTOFF_ENABLED` — `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — leverer kun _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). En boolsk vedvarte i `resilienceSettings` (Dashboard →** Innstillinger → Resilience** / `PATCH /api/resilience`, lagret i `key_value`) vinner over env-verdien: normalisering (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) beholder den lagrede boolske verdien når en eksisterer. Å sette en slik env var til `true` på en distribusjon der dashbordet allerede har lagret `false` endrer derfor ingenting — snu bryteren inn** Innstillinger → Resilience** (eller tøm det lagrede feltet) i stedet.

## 1. Leverandør-circuit breaker

**Omfang:** hele leverandøren (f.eks. `glm`, `openai`, `anthropic`).

**Formål:** slutte å sende trafikk til en leverandør som gjentatte ganger feiler på upstream-/tjenestenivå.

**Implementasjon:**

- Kjerneklasse: `src/shared/utils/circuitBreaker.ts`
- Tilkobling: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- Tilbakestillings-API: `POST /api/resilience/reset`
- Wrappere: `open-sse/services/accountFallback.ts`
- DB-tabell: `domain_circuit_breakers`

**Tilstander:**

- `CLOSED` — normal trafikk tillatt
- `DEGRADED` — trafikk er fortsatt tillatt, men forhøyede leverandørfeil spores; går tilbake til `CLOSED` ved tilstrekkelig mange vellykkede forespørsler, ved en gyldig tilkoblingstest, eller etter det lengste `OPEN`-holdet for siste feiltype (dens `cooldownByKind`-verdi, ellers `resetTimeout`, × `maxBackoffMultiplier`, minst én nedkjølingsperiode) uten en ny feil
- `OPEN` — leverandøren er midlertidig blokkert; combo-ruting hopper over den
- `HALF_OPEN` — tilbakestillingstidsavbruddet er utløpt; en prøveforespørsel tillates

**Konfigurerbare standardverdier (`open-sse/config/constants.ts`, eksponert i Dashboard → Innstillinger → Resiliens):**

| Klasse     | Degradert ved | Åpnes ved | Tilbakestillingstidsavbrudd |
| ---------- | ------------- | --------- | --------------------------- |
| OAuth      | 5 feil        | 8 feil    | 60s                         |
| API-nøkkel | 7 feil        | 12 feil   | 30s                         |
| Lokal      | avledet       | 2 feil    | 15s                         |

`degradationThreshold` styrer når en leverandør går inn i `DEGRADED`; `failureThreshold` styrer når den åpnes og hoppes over. Lokale leverandørprofiler eksponeres ikke på innstillingssiden for resiliens ennå.

**Utløserkoder:** kun statuskoder på leverandørnivå `[408, 500, 502, 503, 504]`. Skal IKKE utløses for feil på kontonivå (de fleste 401/403/429 — disse tilhører nedkjøling eller utestenging).

**Lat gjenoppretting:** når `OPEN` utløper, oppdaterer `getStatus()`, `canExecute()`, `getRetryAfterMs()` tilstanden til `HALF_OPEN`. De samme avlesningene (og neste feil) fører en foreldet `DEGRADED` tilbake til `CLOSED`. Ingen bakgrunnstimer er nødvendig.

---

### Valgfri global leverandør-nedkjøling (vindusport)

Et fjerde, **valgfritt** lag (`PROVIDER_COOLDOWN_ENABLED`, standard **av**) holder
et minne på tvers av forespørsler om leverandører som feiler, i
`open-sse/services/providerCooldownTracker.ts`. Dette konsulteres av combo-måloppløsningen,
slik at påfølgende combo-forespørsler slutter å prøve på nytt en leverandør som nettopp
feilet. Oppføringer på leverandørnivå følger `PROVIDER_PROFILES`-vindusporten:

| Profil     | utløses etter (`providerFailureThreshold`) | innenfor (`providerFailureWindowMs`) | kjøles ned i (`providerCooldownMs`) |
| ---------- | -----------------------------------------: | -----------------------------------: | ----------------------------------: |
| OAuth      |                                       `10` |                              `15min` |                              `5min` |
| API-nøkkel |                                       `15` |                              `30min` |                             `10min` |

Under terskelen anses leverandøren **ikke** for å være i nedkjøling; et vellykket
resultat nullstiller vinduet. Oppføringer på tilkoblingsnivå (`provider:connectionId`)
beholder i stedet den eksponentielle `minRetryCooldownMs → maxRetryCooldownMs`-backoffen.
Overstyringer:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regresjonsvakt: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Tilkobling Nedkjøling

**Omfang:** enkelt leverandør connection/account/key.

**Hensikt:** hoppe over én dårlig nøkkel mens andre tilkoblinger for samme leverandør fortsetter å betjene.

**Implementering:**

- Merk som utilgjengelig: `src/sse/services/auth.ts::markAccountUnavailable()`
- Utvalg: `getProviderCredentials*` i samme fil
- Nedkjølingsberegning: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Innstillinger: `src/lib/resilience/settings.ts`

**Felt per tilkobling:**

- `rateLimitedUntil` — tidsstempel til nedkjøling utløper
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponentiell backoff-teller

**Standard nedkjøling:**

- OAuth base: 5s
- API-nøkkelbase: 3s
- API-nøkkel 429: foretrekker oppstrøms `Retry-After`/reset headers/parseable reset-tekst
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Forsinkelse på nytt forsøk per leverandør.** Leverandørens detaljside har en** Forsinkelse på nytt** velg (Auto, 15s opptil 1t). Den sparer `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, til og med `PATCH /api/resilience`). Når en hastighetsgrensefeil ikke har noe oppstrøms-forsøks-hint, erstatter den verdien den skalerte backoffen for leverandøren og tilbakestiller `backoffLevel` til 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Forrang for en hastighetsbegrenset feil, høyest først: oppstrøms tips om nytt forsøk, deretter per tilkobling `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, deretter forsinkelsen per leverandør på nytt, deretter env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, deretter den skalerte backoff. Fjerner feltet automatisk. Det påvirker bare årsaken til satsgrensen, aldri terminaltilstander.

**Anti-torden-flokkvakt:** forhindrer samtidige feil fra å forlenge nedkjøling eller dobbel inkrementering `backoffLevel`.

**Concurrency-limit 429s klatrer ikke opp på backoff-stigen.** En `429` hvis kropp rapporterer en samtidighetsgrense ("for mange samtidige forespørsler", "samtidsgrense", "parallell anmodningsgrense", GLM `并发数过高`) betyr at kontoen er sunn, men opptatt. `checkFallbackError()` returnerer grunn `concurrency_limited`: mislykkes over til neste tilkobling nå, avkjøl denne for en fast `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) eller oppstrøms-forsøkstipset, behold `backoffLevel` uendret, og sett `skipProviderBreaker`. Et eksplisitt kvoteorgan vinner fortsatt, så et organ som også matcher et kvotemønster forblir en kvotedom. Deteksjon: `looksLikeConcurrencyLimit()` i `src/shared/utils/classify429.ts`; dom: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (bryterens `FailureKind`) er uendret og viser fortsatt `rate_limit` for disse kroppene.

**Streaming-innholdsboder avkjøler ikke kontoen.** Når innholdsstall-vakthunden (`open-sse/utils/streamHandler.ts`) gir opp på en strøm som ikke sendte noen modellutdata i tide, registrerer `markAccountUnavailable()` feilen på tilkoblingen, men setter ingen nedkjøling: stallen tilhører den forespørselen, oftest en lang resonneringsvending uten utgang ennå. Operatører kan melde seg på igjen med `resilienceSettings.streamStallCooldown.enabled` (standard `false`).

**Meld på latenssignal for `p2c` kontovalg.** Hvert utsendte forsøk registrerer tid-til-første-byte og utfall per tilkobling (og per tilkobling + -modell) i et rullende vindu i minnet: de siste 20 prøvene innen 15 minutter (`open-sse/services/connectionLatencyTracker.ts`, registrert fra `safeLogEvents()` i `src/sse/handlers/chatHelpers.ts`). Når `resilienceSettings.p2cLatency.weight` er over `0` (område 0-20, standard `0` = av), summerer `compareP2CConnections()` i `src/sse/services/auth.ts` opp til `weight` poeng til hver kandidat i paret. Halvparten av dette kommer fra latens som et forhold til den raskere kandidaten (dobbelt så sakte tar hele halvparten) og halvparten fra rullende feilrate. Begrepet gjelder bare når begge kandidatene har minst 3 prøver, så nye kontoer blir ikke straffet, og taket forblir under straffene for kvoteblokkering og kvoteoppbrukt. Den legger ikke til noen egen krets: sviktende kontoer håndteres fortsatt av nedkjøling, lockout og bryterlag. Sett den med `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Resonnementrammer starter innholdsstallbudsjettet på nytt.** En resonneringsmodell kan tenke i minutter før sin første synlige token: Claude streamer `thinking_delta` -rammer hvis tenketekst kan være tom, og Responses API streamer det ene resonnementet etter det andre. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) gjenkjenner disse rammene, og vakthunden starter budsjettet på nytt på hver enkelt i stedet for å avbryte turn. De er fortsatt ikke modellutgang, så en sving som ender med bare resonnement rapporteres fortsatt som tom, og en sving som stopper resonnement og bare sender hjerteslag, tripper fortsatt vaktbikkje.

Kiro binære `reasoningContentEvent` rammer med en ikke-tom signatur bevarer denne resonnementaktiviteten gjennom eksekveren som et tomt `reasoning_content` delta. Signaturen videresendes ikke. Metadata, ufullstendige rammer og tomme signaturer starter ikke innholdsbudsjettet på nytt; den uavhengige timeouten for aktiv strøm og klientkansellering gjelder fortsatt (`open-sse/executors/kiro/reasoning.ts`).

**Terminaltilstander (NOT nedkjøling):**

- `banned` — satt av deteksjon av forbudt-søkeord / kontoforbud (se [BAN_DETECTION](../security/BAN_DETECTION.md) ). Oppstrøms avslag per forespørsel (`request_rejected`, f.eks. Anthropic OAuth 403 "Forespørsel ikke tillatt") setter den aldri: de telles per tilkobling og modell og tar den modellen ut av rotasjon med en økende nedkjøling begrenset til `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 t), eller avkjøl tilkoblingen når ingen modell er kjent — `open-sse/services/requestRejectedStreak.ts`
- `expired` (overganger til terminal etter avgrensede forsøk — `EXPIRED_RETRY_MAX = 3` med eksponentiell backoff — slik at forbigående OAuth feil kan helbrede seg selv før kontoen er permanent deaktivert)
- `credits_exhausted`

Disse vedvarer til legitimasjonen endres eller en operatør tilbakestiller dem. Ikke overskriv terminaltilstander med transient nedkjølingstilstand.

**Lat bedring:** når `rateLimitedUntil` er forbi, blir tilkoblingen kvalifisert igjen. Ved vellykket bruk sletter `clearAccountError()` alle feilfelt.

### Claude OAuth -bruksvegg: tilbakestilling av lavere prioritet kjørefelt + øktgrense

**Omfang:** ett Claude -abonnement (OAuth) tilkobling. Begge funksjonene er** opt-in per tilkobling** (Rediger tilkoblingen → Claude seksjonen → `lowPriorityMode` / `autoLimitReset` i `providerSpecificData`, begge standard av) og speil Claude -kodens `/low-priority` og `/limit-reset` -kommandoer (trådkontrakt hentet fra Claude kode 2.1.263).

**Implementering:**

- State machine + respons klassifisering: `open-sse/services/claudeLowPriority.ts`
- Tilbakestill status/claim klienten: `open-sse/services/claudeLimitReset.ts`
- Executor hook (header injection + same-account repetit): `open-sse/executors/base.ts::execute()`
- Oppt-in persistens: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Avtrekker:** 5-timers bruksveggen — a `429` hvis overskrifter har `anthropic-ratelimit-unified-status: rejected` og, når kontoen er kvalifisert, `anthropic-ratelimit-unified-slow-offer: treatment`. Ingenting sendes før den første veggen 429; en burst 429 uten enhetlige overskrifter går gjennom den normale nedkjølingsbanen.

**Lavere prioritert kjørefelt** (`lowPriorityMode`):

- På veggen 429 aksepterer bobestyreren tilbudet og prøver umiddelbart på nytt** samme** konto med `anthropic-usage-limit: slow`; banen forblir aktiv til den annonserte `anthropic-ratelimit-unified-reset` (+ 60s grace) og hver forespørsel i det vinduet bærer overskriften. Den avlyttede 429 når aldri `handleChatCore`, så forbindelsen er det** ikke** settes i cooldown og roteres ikke bort.
- `anthropic-ratelimit-unified-slow-status` på senere svar: `active` / `not_needed` hold banen; `slot_busy` (429) eller en `529` vent serverens `anthropic-ratelimit-unified-slow-retry-after` (standard 20s, clamp 5–600s, ± 30% jitter) og prøv på nytt, avgrenset av `anthropic-ratelimit-unified-slow-max-wait` (standard 20 min, clamp 1 min–6 h) — forbi at banen slutter og en 10-minutters avkjølingsblokkering. Ventetiden er i tillegg begrenset av det som er igjen av forespørselens egen oppstrøms-starttidsavbrudd (`resolveFetchStartTimeout`, 10 min som standard) minus en 5 s margin: uten den grensen ville 20-minutters standard max-wait overlevd forespørselen og søvnen ville bli avbrutt midt i ventetiden, og dukket opp en `TimeoutError` i stedet for den grasiøse `max_wait` + avkjølingsenden.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, en 5h-vindusrulling, eller `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (som ender det som `extra_usage` på en hvilken som helst status, siden betalt overskudd nå dekker veggen) avslutter banen; responsen flyter deretter til den normale nedkjølingsbanen. `budget_exhausted` huskes til den annonserte budsjetttilbakestillingen (≤ 8 dager).
- Veggsjekken kjører etter eksekverens egne 400-drevne intra-forsøk-forsøk (kontekstredigering, thinking/effort klemmer, param auto-learn), så en vegg 429 som bare overflater på ett av disse forsøkene blir fortsatt fanget opp i stedet for å nå nedkjølingsbanen.
- Tilstanden er i minnet per tilkobling (en omstart koster en ekstra vegg 429 for å akseptere på nytt).

**Tilbakestilling av øktgrense** (`autoLimitReset`, prøvd før banen når begge er på):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` blokk; når `arm: "reset"` og `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` med `{ "program": "juniper_tide" }` (organisasjon UUID fra `providerSpecificData.organizationUUID`, bootstrap fallback).
- `result: reset|not_limited` → forespørselen prøves på nytt i full hastighet (ingen treg overskrift). `already_used` / `not_offered` memoise `next_available_at` (standard én uke); enhver feil går tilbake etter 15 minutter. Tilbakestillingen er en gang i uken og teller fortsatt mot den ukentlige grensen.

Regresjonsvakter: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Bruk banktilbakestillinger automatisk

**Omfang:** Codex og Claude -abonnementstilkoblinger (OAuth).** Meld deg på** : `bankedResetAutoApply` innstillingen er av og i `dry-run` modus som standard (Innstillinger → AI → Auto-apply banked resets).

**Hensikt:** bruke tilbakestillinger på egen hånd når en konto treffer en bruksvegg, i stedet for å vente på at en operatør skal trykke "Løs inn" på leverandørgrenser-siden.

| Kreditttype (`creditTypes`) | Hva er forløst                                    | Hvor det går                                                        |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------------------------- |
| `codexCredits`              | Codex tilbakestill kreditter                      | bakgrunnsjobb, hvert 60                                             |
| `claudeCredits`             | Claude banked grants (`GRANT` credits)            | bakgrunnsjobb, hvert 60                                             |
| `claudeSessionReset`        | Claude ukentlig økt-grense tilbakestilling (over) | forespørselsbane, gjennom den samme policyen som bryteren per konto |

**Implementering:**

- Ren avgjørelse (ett regelsett for begge stier): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Bakgrunnsjobb: `src/lib/services/bankedResetAutoApply.ts` (startet i `src/instrumentation-node.ts`)
- Claude request-path gate: `src/lib/usage/claudeSessionResetPolicy.ts`, registrert gjennom `setClaudeLimitResetPolicy()` i `open-sse/services/claudeLimitReset.ts`
- Historie, caps og webhook: `src/lib/usage/bankedResetAudit.ts`
- Historikk API: `GET /api/settings/banked-reset-auto/history?limit=50` (administrasjonsaut.)

**Beslutningsrekkefølge** (den første sviktende regelen er den registrerte årsaken):

1. Funksjon av, kreditttype av, eller konto utenfor rekkevidde (`accountScope` `all` / `selected` pluss `connections` -kartet per konto).
2. Utenfor den valgfrie UTC -planen (`startHourUtc` > `endHourUtc` krysser midnatt).
3. Caps over de siste 24 timene: `maxPerAccountPerDay` (1), `maxPerDay` (3) og `minSpacingMinutes` (30) mellom hvilke som helst to innløsninger.
4. Trigger: et `session` eller `weekly` vindu med vegger (lest fra `getQuotaWindowStatus().reachedThreshold`, ikke `isAccountQuotaExhausted()`, som bare rapporterer en konto med hvert vindu brukt), eller en kreditt som utløper innen `expiringCreditHours` (24) på en konto som har brukt minst `expiringCreditMinUsedPercent` (50).
5. Naturlig tilbakestillingsbeskyttelse: hopp over når det veggede 5-timersvinduet tilbakestilles innenfor `sessionResetGuardMinutes` (90), eller det veggede ukevinduet innenfor `weeklyResetGuardHours` (12).
6. Ukentlig gulv: hopp over en 5-timers tilbakestilling når ukentlig gjenværende er under `weeklyFloorPercent` (10).
7. `last-resort` modus: hopp over mens en annen konto innenfor rammen av samme leverandør har minst `poolHeadroomPercent` (10) igjen i begge vinduene. Utløpende kredittutløsere omgår dette.
8. `dry-run` tar opp en rad og løser inn ingenting; `last-resort` og `eager` løser inn.

Manglende kvotedata låser aldri opp en innløsning: en ukjent tilbakestillingstid eller ukentlig bruk hopper over.

**Claude økt tilbakestilling:** med funksjonen av, eller `claudeSessionReset` av, bestemmer `autoLimitReset` vekslingen per konto nøyaktig som før. Med begge på, erstatter funksjonen vekslingene per konto: en konto innenfor rammen kan bare gjøre krav når policyen tillater det, og i `dry-run` modus fremsettes ingen krav.

**Sikkerhet:** jobben løser inn maksimalt én kreditt per hake, bestemmer seg før du noterer kreditter (en konto som er hoppet over blir aldri oppført), bruker idempotensnøkler `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`, og sikkerhetskopierer en konto i 1 time etter en mislykket oppføring eller innløsning. Hver innløsning, feil og tørrkjøringsavgjørelse skrives til `audit_log` (`action: "bankedReset.redeem"`, ingen tokens eller kreditt-IDer); kappene telles fra disse radene, så de overlever omstarter. Vellykkede innløsninger avfyrer også `provider.reset_redeemed` webhook.

Regresjonsvakter: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Økttilhørighet (#7274)

**Omfang:** én klientøkt (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) festet til én tilkobling, for** noen** leverandør.

**Hensikt:** hold en multi-turn agent (Claude Code, aider, custom agents) på samme konto på tvers av forespørsler, reduserer konteksttap på tvers av kontoer og gjentatte kaldstart 429s på leverandører med sesjonsstatus per konto.

**Implementering:**

- TTL oppløsning: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Overskriftsutvinning (generisk, hvilken som helst leverandør): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Vedvarende pin-tabell: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Innstilling: `sessionAffinityTtlMs` (global TTL i ms, `0` deaktiverer) — `src/lib/db/settings.ts`. Omdøpt fra Codex-only `codexSessionAffinityTtlMs` ved migrering `124_generic_session_affinity_ttl.sql`, som overfører alle tidligere konfigurerte Codex TTL som ny standard.

Før #7274 ble `resolveSessionAffinityTtlMs()` hard-bailed til `0` for hver leverandør bortsett fra `codex`, så TTL innstillingen (og økthodene) hadde ingen effekt noe annet sted, selv om festemekanismen og header-ekstraksjonen allerede var leverandøragnostisk. Reparasjonen fjernet den tidlige returen; TTL gjelder nå ensartet for hver leverandør en gang satt globalt over `0`.

De tre sesjonstilhørighetshodene videresendes aldri oppstrøms. — utførere bygger sine egne oppstrømshoder fra bunnen av i stedet for å sende klienthoder gjennom, så dette forblir kun en intern korrelasjons-ID.

### Eksklusive leieavtaler for administrerte økter

**Omfang:** én aktiv administrert HTTP client/session eier én kvalifisert OmniRoute tilkobling.

**Hensikt:** gi varig eksklusivt tilkoblingseierskap for kunder som trenger et hardt rutinggjerde på tvers av forespørsler. Dette skiller seg fra sesjonstilhørighet, som er en myk kontinuitetspreferanse: en eksklusiv leieavtale vedvarer livssyklusstatus i SQLite, fremtvinger global unikhet med aktiv eier og aktiv tilkobling, og avviser en gammel generasjon før leverandørutsendelse.

Funksjonen er opt-in per API nøkkel. En administrert nøkkel må ha `lease:exclusive` omfanget og en eksplisitt ikke-tom `allowedConnections` liste. Enhver HTTP klient kan bruke livssyklusendepunktet; ingen klientnavn, brukeragent, leverandør, OAuth metode eller modell kreves. Leieavtalen eier en tilkobling, ikke en modell, så en modellendring beholder bindingen mens tilkoblingen forblir ordinært kvalifisert. Regler for normal modell, kvote, helse, nedkjøling og godkjenningsliste forblir autoritative og kan overføre samme generasjon til en annen gratis kvalifisert tilkobling.

Livssyklusen er `POST /api/v1/session-leases` med JSON handlingene `acquire`, `renew` og `release`. Administrerte slutningsforespørsler presenterer den ugjennomsiktige `X-OmniRoute-Lease-Owner` verdien og nøyaktige `X-OmniRoute-Lease-Generation`. Eieren bruker `vlo_` etterfulgt av 43 base64url-tegn; bare dens SHA-256 hash er lagret. Hvert siste utsendelsesgjerde binder også den autentiserte API nøkkelen ID og den aktive tilkoblingen ID. Leiekontrollhoder fjernes fra logger, beholdte øyeblikksbilder av forespørsel og oppstrøms eksekveringshoder.

Hvis ordinær ruting har kvalifiserte administrerte kandidater, men hver ledige kandidat er okkupert av en utenlandsk aktiv leieavtale, returnerer OmniRoute HTTP `429`, lease-kapasitet-utilgjengelig kode, en venter-på-kapasitet-tilstand og en begrenset `Retry-After` avledet fra det tidligste relevante utløpet. Vanlig tom kvalifisering er ikke leasingstrid og beholder sin eksisterende rutingfeilsemantikk.

Relaterte mekanismer forblir separate:

- OAuth session occupancy er prosesslokal myk distribusjon for OAuth kontoer.
- Kontosemaforer gir tillatelse til forespørsel-samtidighet og avsluttes når en forespørsel fullføres.
- Eksklusive administrerte økter er varig livssykluseierskap med et generasjonsgjerde.

---

## 3. Modellutestenging

**Omfang:** leverandør + tilkobling + modell-trippel.

**Omfang etter status:** statusen som feiler avgjør hvilken nøkkel en utestenging skriver
til (`resolveLockoutScope()` i `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — et kvote- eller tilgangssignal — låser **kvotefamilien**:
  for codex hele `codex` / `spark`-omfanget (alle `gpt-5*`-modeller for
  tilkoblingen), for andre leverandører `getQuotaScopedModelForProvider()`.
- `404` låser den bare modellen (`getModelLockKey()` avgrenser `not_found`).
- Alle andre statuser — `5xx`-transport-/serverfeil og OmniRoutes egen
  syntetiserte `502` fra kvalitetsvalidering — låser kun den **eksakte**
  leverandør-/tilkoblings-/modell-tuppelen. En dårlig strøm fra én modell er ikke
  bevis på noe om kontoens kvote; før denne regelen fjernet ett tomt svar på
  `codex/gpt-5.6-luna` alle `gpt-5*`-modeller for denne tilkoblingen fra
  rutingen i 2–30 minutter (med eskalering), mens kvoten forble urørt.
- En eksplisitt `scope`-innstilling fra en kallende part vinner alltid (Antigravity sender `"exact"`).

**Formål:** unngå å deaktivere en hel tilkobling når bare én modell er utilgjengelig eller kvotebegrenset.

**Eksempler:**

- Leverandører med modellspesifikke kvoter som returnerer 429
- Lokale leverandører som returnerer 404 for én manglende modell
- Leverandørspesifikke feil for modus-/modelltillatelser (f.eks. Grok-moduser)

**Implementasjon:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Kontrollpanel for modellnedkjøling (v3.8.0)

UI: Innstillinger → Modellnedkjølinger (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Viser aktive utestenginger med: leverandør, tilkobling, modell, årsak, expiresAt. Operatører kan aktivere en modell manuelt på nytt fra kortet.

**REST API:**

- `GET /api/resilience/model-cooldowns` — vis aktive utestenginger
- `DELETE /api/resilience/model-cooldowns` — aktiver manuelt på nytt. Body: `{provider, connection, model}`. Auth: management.

### Nedkjølingsbehandler

UI: Overvåking → Nedkjølingsbehandler (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Én side for hver tilkobling som er ute av rutingen av en forbigående årsak, i stedet for
å åpne hver leverandørside. Den viser tilkoblingsnedkjølinger, modellutestenginger og terminaltilstander, opphever dem per tilkobling, for et utvalg eller for alle tilkoblinger hos en leverandør, og redigerer de mest brukte nedkjølingsreglene: `streamStallCooldown.enabled` og
grunnnedkjølingen for OAuth-/API-nøkkelens `connectionCooldown` samt maksimalt antall
backoff-trinn (lagres via `PATCH /api/resilience`). Terminaltilstander (`banned`, `expired`, `credits_exhausted`) vises, men oppheves aldri her.

Kortet **Regler for feilnedkjøling** på samme side redigerer operatørens feilregler
(`settings.providerErrorRules`) og standardverdiene for hver leverandørs
catch-all-regler (`settings.providerErrorDefaults`) via `PATCH /api/settings` — se «Regler
deklarert av operatøren» under §7 for hvordan de samsvarer. Varigheter er Standard (ingen eksplisitt nedkjøling), 30 min,
1 t, 5 t, 24 t eller en egendefinert verdi fra 1 til 43 200 minutter (30 dager).

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — tilkoblinger med status, gjenværende nedkjøling,
  backoff-nivå, siste feiltype og modellutestenginger (ingen legitimasjon)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` eller
  `{all: true, provider?}`; returnerer `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI for utestengingsinnstillinger + gjenoppretting med suksessforfall (v3.8.23)

Modellutestenging gikk fra alltid aktivert, hardkodet atferd til en fullstendig konfigurerbar,
valgfri funksjon med eget innstillingskort og en selvreparerende gjenopprettingsbane.

**Innstillingskort:** Innstillinger → Modellutestenging
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Dette er **atskilt** fra det skrivebeskyttede `ModelCooldownsCard` ovenfor (som bare
_lister_ aktive utestenginger) — det nye kortet _konfigurerer parametrene_. Standardverdiene
ligger i `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Innstilling             | Standardverdi                    | Betydning                                                    |
| ----------------------- | -------------------------------- | ------------------------------------------------------------ |
| `enabled`               | `false`                          | Hovedbryter — modellutestenging er **av som standard**.      |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Oppstrømsstatuser som teller som en modellavgrenset feil.    |
| `baseCooldownMs`        | `120_000` (120 s)                | Opprinnelig utestengingsvarighet ved første feil.            |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Maksimum for den eskalerte nedkjølingen.                     |
| `maxBackoffSteps`       | `10`                             | Maksimalt antall eskaleringstrinn med eksponentiell backoff. |
| `useExponentialBackoff` | `true`                           | Om gjentatte feil skal eskalere nedkjølingen eksponentielt.  |

Innstillingene lagres gjennom det normale innstillingslageret og valideres via
skjemaet for robusthetsinnstillinger; kortet begrenser `baseCooldownMs`/`maxCooldownMs`
(med `maxCooldownMs ≥ baseCooldownMs`) og `maxBackoffSteps`.

**Gjenoppretting med suksessforfall:** gjenoppretting skjer **ikke** bare ved at tidsuret utløper. Et friskt
svar reduserer modellens feilantall, slik at en modell som kom seg
midt i tidsvinduet, slutter å eskalere (og oppheves) før tidsuret ville ha gjort det. Ved en vellykket kombinasjonsmålmodell kaller `open-sse/services/combo.ts`
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), som **halverer** det lagrede
`failureCount` (`Math.floor(failureCount / 2)`); når det når `0`, slettes utestengingsoppføringen
helt. Motstykket `recordModelLockoutFailure()` øker antallet (og eskalerer nedkjølingen)
ved feil innenfor eskaleringsvinduet. Dette suksessforfallet kommer i tillegg til vanlig tidsurutløp —
begge banene kan aktivere en modell på nytt.

**Tilstand:** blokkeringer holdes **i minnet** (per-prosess-`Map`-er av
`ModelLockoutEntry`, med nøkler etter `provider:connectionId:model`, og låser
med eksakt omfang etter `provider:connectionId:exact:model`), og lagres ikke i
DB-en — de går tapt ved omstart. _Innstillingene_ lagres; den aktive
_låsingstilstanden_ er midlertidig.

---

## 4. Samtidighetskontroll for kvoteandel (v3.8.36)

Abonnementskontoer (GLM, MiniMax, etc.) aksepterer ofte bare ~ 1–3 samtidige forespørsler; overskridelse utløser 429s og nedkjøling. Dette er akutt under** kvote-andel** (`qtSd/…`) kombinasjoner, der flere API nøkler deler én oppstrømskonto. Tre lag forhindrer at en delt konto blir oversvømmet.

### Samtidighetstak per tilkobling (`max_concurrent`)

Hver leverandørtilkobling kan deklarere et `max_concurrent` -tak (`provider_connections.max_concurrent`, satt i tilkoblingsmodal / API / DB). La det stå tomt uten grenser. Dette er den enkle knotten som driver serialiseringslaget under — sett det til kontoens reelle samtidighet (f.eks. GLM ~ 1, MiniMax ~ 2).

### Samtidighetstak per modell (`modelConcurrency`)

En tilkobling kan i tillegg deklarere nøyaktige samtidighetstak per modell i `rateLimitOverrides` kartet:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Sett den i tilkoblingsmodalen (** Rate limit overstyrer → Per-modell samtidighetstak** , en `model=cap` per linje) eller via `PATCH /api/providers/[id]` med samme JSON form. Nøkkelsemantikk:

- **Tilkoblingsomfattende kontra modellspesifikk:** `maxConcurrent` forblir det delte taket for hele tilkoblingen. Når begge gjelder, innhentes begge portene atomært i samme sammensatte port (`global → provider → account → model`); den effektive oppførselen er den strengere gjeldende grensen.
- **Nøyaktig modell-nøkkelmatch:** nøkkelen er modellstrengen som sendes til eksekveren etter rutingsoppløsning — normalt den bare oppstrøms modell-ID (`glm-5`), ikke et `provider/model` alias på klientsiden (`zai/glm-5` samsvarer ikke med `glm-5`). Verdier er positive-heltalls samtidige forespørsel-tak.
- **Lokal kø, ingen oppdagelse:** overskytende forespørsler står i kø lokalt med den eksisterende queue/timeout semantikken (skrivet `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` -innrømmelsesfeil). OmniRoute oppdager eller utleder ikke oppstrømspolicy — den håndhever de nøyaktige taket operatøren konfigurerte. En mettet modellport deaktiverer aldri leverandøren og skaper aldri en permanent modellsperre; oppstrøms 429/cooldown/fallback atferd forblir tilbakestopperen for feilen.
- **Per tilkobling, per prosess omfang:** caps er per databasetilkobling og holdes i minnet, så to tilkoblinger som gjenbruker den samme oppstrøms API nøkkelen koordinerer ikke med hverandre.
- **Ukonfigurert betyr uendret:** utelate kartet (eller la dashbordfeltet stå tomt) legger ikke til noen modellport. Eksempel på konfigurasjon uten å hevde noen universell leverandørgrense:

```text
glm-5=1
glm-4.7=3
```

### Serialisering av kvotedelingsforespørsel

Når en kvotedeling retter seg mot en tilkobling som erklærer en positiv `max_concurrent`, samtidige forespørsler til den** konto** serialiseres gjennom en semafor per tilkobling (nøkkel `qsconn:<connectionId>`): overflødige forespørsler** vente i køen** i stedet for å oversvømme kontoen. Det er det** fail-open** — en mettet kø eller tidsavbrudd fortsetter uten et spor i stedet for noen gang å avvise en forespørsel som kan sendes. Slå inn** Innstillinger → Resilience → Kvota-andel per tilkobling samtidighet** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standard på). Uten en `max_concurrent` cap er oppførselen uendret.

> Rutingporten for kvotedeling (`selectQuotaShareTarget`, DRR + P2C) er i seg selv feilåpen og _deprioriterer_ bare en at-cap-forbindelse — med en enkelt-tilkoblingspool den kan ikke hardt begrense, så denne semaforen er det som faktisk inneholder flommen.

### Prøv på nytt med kombinasjonsavkjøling

For hver kombinasjonsstrategi (når den er aktivert), venter en forespørsel som vil krystallisere en 429 for en SHORT forbigående nedkjøling og sendes ut på nytt i stedet for å returnere 429 — Dette dekker Gemini-klasse TPM/RPM vinduer (~ 60s gjenforsøk etter) på kombinasjoner av flere modeller, f.eks. Avgrenset av `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) i** Innstillinger → Resilience** . Den venter aldri på `quota_exhausted` (låst til midnatt) eller auth/not-found grunner. Med `comboTimeoutMs` satt, starter ikke en venting som ikke kan fullføres før denne fristen (#18998): kombinasjonen svarer umiddelbart med terminalsvaret i stedet for en `COMBO_TIMEOUT` 504.

En kombinasjon kan velges bort med `config.comboCooldownWaitEnabled: false`. Bare bokstavelig `false` deaktiverer disse delte kombinasjonsventene (nedkjøling etter utsendelse og circuit-open/model-lock -venter før utsendelse) og deres forlengelse av vente-budsjett-timeout-gulvet. Mangler eller `true` bevarer den globale politikken; `true` kan ikke aktivere globalt deaktivert venting. En eksplisitt `targetTimeoutMs` vinner fortsatt. Denne frameldingen endrer ikke den separate native-Codex turn-pin pre-dispatch ventetiden.

Den samme porten dekker pre-dispatch-saken (#16319): når hvert mål i en kombinasjon blir hoppet over før ethvert forsøk gjøres fordi modellen sitter i en kort forbigående lockout, venter null-forsøksbanen på låsen under de samme tak og sender ut på nytt, i stedet for å svare på en `503 ALL_TARGETS_SKIPPED` uten hint. Når ingen venting er tillatt (tak, forsøk eller budsjett oppbrukt, eller funksjonen av), oppgraderes terminalresponsen til `429 rate_limit_error` som bærer `retry_after` / `reset_at` fra den tidligste forbigående låsen utløper; kvote-, autentiserings- og ikke-funnet-låser holder hint-mindre 503.

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

## 5. Adgangskontroll for forespørselskø (v3.8.49 · issue #6593)

**Omfang**: den lokale rate-limit-køen per leverandør+tilkobling (`open-sse/services/rateLimitManager.ts`,
bygget på Bottleneck), ett lag under de tre mekanismene ovenfor.

**`maxWaitMs` begrenser køventing; `executionMaxWaitMs` begrenser kjøring.**
De to er bevisst adskilt, og ingen av dem mates inn i den andre.

`resilienceSettings.requestQueue.maxWaitMs` er **budsjettet for køventing**: det
dekker venting på en leverandørplass og deretter å stå i QUEUED, og timeren
nullstilles i det øyeblikket jobben forlater QUEUED og begynner å kjøre
(`rateLimitManager.ts`, `wrappedFn`). En forespørsel som overskrider det, når aldri
frem til oppstrøms. Standard 30000 ms, levert av `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
i `src/lib/resilience/settings.ts` og festet av
`tests/unit/ratelimit-admission-control-6593.test.ts`, slik at en endring av den gjør
den testen rød i stedet for å la dette avsnittet stille bli utdatert.

`resilienceSettings.requestQueue.executionMaxWaitMs` er det Bottleneck
mottar som jobbens `expiration`, der timeren starter først etter utsendelse. Det er
et sikkerhetsnett for utførere uten et eget oppstrøms-tidsavbrudd, og det
heves til utførerens eget tidsavbrudd for hentestart når det er lengre, slik at det
ikke kan kutte av et sunt svar underveis. Standard 600000 ms (10 min).

Å mate købudsjettet inn i `expiration` er det som tidligere drepte ikke-inkrementelle
gatewayer midt i flyten — de kjører legitimt i minutter før de første bytene —
og det er derfor en expiration vises som `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), mens købudsjettet bærer
koden for kø-tidsavbrudd. Overstyr en av dem via `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (miljøvariabel) eller dashbordet
(**Settings → Resilience**). Begge avgrenses til 1 ms–24 t ved normalisering.

**Prioritet, for begge:** miljøvariabelen leverer bare _standardverdien_. En verdi
lagret i `resilienceSettings.requestQueue` (dashbord / API-patch, lagret
i `key_value`) vinner over den, og en per-tilkobling-
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` vinner over den igjen. Å sette
miljøvariabelen på en distribusjon som allerede har en lagret verdi, endrer
derfor ingenting — tøm eller oppdater den lagrede innstillingen i stedet.

Oppholdstiden i køen er begrenset av `maxWaitMs`; `maxQueueDepth` nedenfor begrenser hvor
mange kallere som kan stå i kø samtidig.

**Gjentakelser angitt i svarkroppen: pacing kontra utestenging.** En 429-kropp kan angi sin egen ventetid
(Gemini `RetryInfo.retryDelay`, tekst av typen "retry after Ns"), som
`updateFromResponseBody` leser. En ventetid som passer innenfor tilkoblingens `maxWaitMs`
er pacing: begrenseren tømmer reservoaret sitt i så lang tid, og kølagte kall
sendes ut når det fylles opp igjen. En ventetid lenger enn `maxWaitMs` er ikke noe
køen kan sitte ut — Gemini svarer på en oppbrukt dagskvote med
`retryDelay: "86399s"`. Den videresendte `Retry-After` på den gjenoppbygde 429-en (#16528)
får allerede fallback-motoren til å låse modellen i det tidsvinduet, men å pause
begrenseren for det i tillegg ville likevel stanse ethvert kall som når nøkkelen tidlig
(etter en tilbakestilling av robusthetsinnstillingene, for eksempel) i hele `maxWaitMs`. Når en slik ventetid kommer fra en typet Google `RetryInfo`-detalj
(proveniens `google_rpc_retry_info`) og nøkkelens begrenser
allerede er avgrenset til modellen (se `getLimiterKey`), blir 429-en i stedet en
modellutestenging på den tilkoblingen (`lockModelForLongBodyRetry` i
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, maks 24 t), og
begrenseren forblir upauset. Kontoutvelgelse hopper over modeller med den låsen via
`isModelLocked()`, og det samme gjør comboens kontrollport før utsendelse for mål som er festet
til tilkoblingen. På antigravity, der begrenseren er per kvotefamilie, er låsen
på den nøyaktige modellen, slik som de andre kvotelåsene. Navnet klienten ba om,
låses også når et alias løste det til den modellen, fordi disse kontrollene bruker
det forespurte navnet; det låses nøyaktig (`lockExactModel`), slik at et alias som
krysser en antigravity-kvotefamilie eller et codex-scope, aldri låser sitt eget. Et
hint i fri tekst, en utypet `retryDelay` eller en
begrenser delt av hele tilkoblingen, beholder pausen. Når begrenseren som
429-stien nettopp bygde om, faktisk pauser, avvises en kaller hvis gjenværende køtid
slutter før pausen gjør det, umiddelbart med koden for kø-tidsavbrudd
(`checkLimiterPause`) i stedet for å vente den tiden ut; den registrerte slutten er
forankret før begrenseren bygges, der Bottleneck starter påfyllingsklokken
sin, og enhver senere endring av reservoaret glemmer den. Dekket av
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` og
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — valgfritt tak for køadgang (nytt).** `resilienceSettings.requestQueue.maxQueueDepth`
begrenser hvor mange forespørsler som kan stå i kø (ennå ikke sendt ut) for én
leverandør+tilkobling samtidig. Når køen allerede holder `maxQueueDepth`
forespørsler, avvises en ny forespørsel umiddelbart med en typet
`code: "RATE_LIMIT_QUEUE_FULL"`-feil **før** den overhodet når `limiter.schedule()`
— slik at avvisningen er billig og skjer før eventuelt nedstrøms
arbeid med prompt-komprimering / oversettelse for den forespørselen. Standard `0` =
deaktivert, som bevarer den eksisterende atferden med ubegrenset kø; avgrenset til 0–100000.
Overstyr via `RATE_LIMIT_MAX_QUEUE_DEPTH` (miljøvariabel) eller
`resilienceSettings.requestQueue.maxQueueDepth` (dashbord/API-patch).

Selve adgangskontrollen er en ren funksjon
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), slik
at den kan enhetstestes uten en ekte Bottleneck-begrenser.

> RFC-en som åpnet #6593 foreslo også et
> `bypassCompressionOnRateLimit`-flagg. Denne kodebasens
> `open-sse/services/compression/`-pipeline er prompt-/kontekstkomprimering på
> den utgående LLM-forespørselen (`chatCore.ts`, rundt
> `resolveCompressionSettings`/`selectCompressionStrategy`-blokken), ikke
> HTTP-responskomprimering på syntetiserte 429-kropper — det finnes ingen
> tilsvarende kodebane for et bokstavelig bypass-flagg. Dette
> prompt-komprimeringstrinnet kjører dessuten for øyeblikket _før_
> `withRateLimit()` i forespørselspipelinen, så en omorganisering for å hoppe
> over det ved en avvisning på grunn av full kø er en egen, større endring enn
> omfanget av dette issuet; det ble bevisst **ikke** implementert her og er
> overlatt til en oppfølging dersom CPU-besparelsen er verdt
> omorganiseringsrisikoen.

### Sikkerhetsnett for automatisk aktivering av ratebegrensning og tilkoblingsbeskyttelse (`rateLimitProtection`)

**Sikkerhetsnett for automatisk aktivering** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, standard `true`):
Som standard aktiverer OmniRoute automatisk købeskyttelse mot ratebegrensning for alle aktive API-nøkkel-leverandørtilkoblinger (`getProviderCategory(provider) === "apikey"`). Dette sikrer at innkommende forespørsler til rate-sensitive API-nøkler oppstrøms legges i kø og strupes gjennom Bottleneck i stedet for å sendes i utbrudd som utløser 429-feil oppstrøms. Sikkerhetsnettet kan overstyres via miljøvariabelen `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` deaktiverer, `true`/`1`/`on` tvinger på), som har forrang over den persisterte dashbordinnstillingen (**Innstillinger → Robusthet** / `PATCH /api/resilience`).

**Semantikken for `rateLimitProtection` per tilkobling:**
Ratebegrensningsbeskyttelse per tilkobling spores via det boolske feltet `rateLimitProtection` på leverandørtilkoblinger (persistert som `rate_limit_protection` i SQLite):

- **Eksplisitt på (`rateLimitProtection === true`)**: Ratebegrensningsbeskyttelse er eksplisitt aktivert for denne tilkoblingen, uavhengig av leverandørkategori eller om sikkerhetsnettet for automatisk aktivering er slått på.
- **Eksplisitt av (`rateLimitProtection === false`)**: Deaktiverer eksplisitt beskyttelse, men melder **ikke** en aktiv API-nøkkel-tilkobling ut av det globale sikkerhetsnettet for automatisk aktivering. I `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) er `false` og `undefined` likeverdige: bare `rateLimitProtection === true` behandles som en eksplisitt overstyring. Hvis `rateLimitProtection` er `false` (eller ikke satt), vil en aktiv API-nøkkel-tilkobling fortsatt oppfylle betingelsen for automatisk aktivering og forbli beskyttet mot ratebegrensning.
- **Ingen fravalg per tilkobling**: En operatør kan for øyeblikket ikke uttrykke «denne ene aktive API-nøkkel-tilkoblingen må kjøre uten købeskyttelse mot ratebegrensning» mens automatisk aktivering holdes aktiv for andre. For å kjøre API-nøkkel-tilkoblinger helt uten ratebegrensningskøer må sikkerhetsnettet slås av globalt (`RATE_LIMIT_AUTO_ENABLE=false` eller `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Støttede skriveveier:**

- **`POST /api/rate-limits`**: Den støttede skriveveien for administrasjon for å veksle `rateLimitProtection` for en tilkobling (`{ connectionId: string, enabled: boolean }`). Kaller du denne med `enabled: true`, slås eksplisitt beskyttelse på; kaller du denne med `enabled: false`, fjernes eksplisitt beskyttelse (selv om aktive API-nøkkel-tilkoblinger fortsatt er dekket under det globale sikkerhetsnettet hvis automatisk aktivering er på).
- **`PUT /api/providers/[id]`**: Aksepterer eller vender bevisst **ikke** `rateLimitProtection` (#11278). Oppdatering av metadata for leverandørtilkoblinger via `PUT /api/providers/[id]` vil aldri endre den persisterte tilstanden for ratebegrensningsbeskyttelse.

---

## 6. Slow-stream throughput watchdog (#9709)

Den valgfrie `resilienceSettings.streamRecovery.throughputWatchdog` vakten oppdager en oppstrøms som fortsatt sender biter, men som produserer assistentutgang under den konfigurerte raten for nyttig utgang. Den er bevisst forskjellig fra inaktiv timeout: hjerteslag og metadata tilbakestiller ingen av tidtakerne og teller ikke som fremgang. Det er også forskjellig fra den harde forsøksfristen (#9153), som fortsatt er et absolutt sikkerhetstak uavhengig av utskriftskvalitet.

Vakthunden krever en oppvarmingsperiode etterfulgt av et fullstendig rullende vindu før den kan avbryte. Den teller tekstdeltaer fra chatfullføringer og -svar API -utdatahendelser (en konservativ UTF-8 byte-proxy), ignorerer kun bruk og tomme hendelser, og suspenderer dommen mens verktøy-anrop eller resonneringshendelser pågår. Den er deaktivert som standard og kan aktiveres med `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (den env-verdien setter bare standard — a saved `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean wins; se env-vs-dashboard-prioriteringsnotatet øverst i denne veiledningen); vinduet, oppvarming, minimumshastighet og minimum målbar utgang er avgrenset av normaliseringslaget for normal spenstinnstillinger.

Når den er aktivert, blir en vakthundavbrudd bare brukt på det aktive oppstrømsforsøket. Før noen klientsynlige byte kan den eksisterende banen for tidlig gjenoppretting av samme konto åpne forsøket på nytt. Etter commit spilles strømmen aldri blindt på nytt; bare den eksisterende sikre mid-stream fortsettelseskontrakten kan sy et suffiks. Fullføringen forblir enkeltstående, så bruksregnskap og semaforutgivelse dupliseres ikke.

---

## 7. Omformulering av oppstrømsstatus (feilaktige kvotefeil)

**Omfang:** én oppstrøms gateway som rapporterer midlertidig kvoteuttømming med feil HTTP-status.

**Formål:** korrigere en misvisende status FØR klassifisering, slik at nedstrømsforbrukere (fallback-motoren, kombinasjonsaggregeringen og det klientsynlige svaret) ser feilens reelle egenskap som en feil det kan prøves på nytt for.

Noen gatewayer signaliserer MIDLERTIDIG kvoteuttømming med en HTTP-status som ikke kan prøves på nytt. `agentrouter.org` returnerer `403` (av og til `400`) med en kinesisk meldingstekst
(`用户额度不足` / `额度不足`) i stedet for standardverdien `429`. Klienter som Claude
Code tolker `403` som permanent og avbryter økten, og uten korrigering ville
fallback-motoren klassifisert den som `AUTH_ERROR` i stedet for en kvotehendelse.

**Implementering:**

- Register + matcher: `open-sse/config/upstreamStatusRestatement.ts` — en
  leverandørspesifikk liste med regler (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), matchet via `applyStatusRestatement()`.
- Kallsted: `providerFailure:`-blokken i `open-sse/handlers/chatCore.ts`
  (rundt linje 3654), rett etter at `parseUpstreamError()` analyserer et
  oppstrøms svar med en feil-HTTP-status (`!providerResponse.ok`), og før
  noen klassifisering kjøres, slik at alle nedstrømsforbrukere ser den korrigerte
  statusen. Feil som er innebygd i en `200` SSE-strøm, følger en separat,
  senere strømanalysebane og dekkes **ikke** av denne koblingen i dag — en kjent
  begrensning som ennå ikke er nødvendig for agentrouters feilstatus (som
  vises som en feil-HTTP-status).
- Berettigelse for nytt forsøk: `429` finnes i `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), så en omformulert feil
  får et reelt nytt forsøksvindu i stedet for å vises som en ubrukelig `403`.
- Den syntetiske `60s`-verdien for `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  er bare det det omformulerte svaret forteller **klienten**; den er ikke selve
  tilkoblingens interne nedkjølings-/utelukkingsvarighet — dette styres separat
  av mekanismen som faktisk håndterer den omformulerte feilen
  (Connection Cooldowns eskalerende backoff, §2, med en basisverdi på `3s` for API-nøkkelleverandører;
  eller Model Lockout, §3, for leverandører med kvote per modell, som
  agentrouter). Ruteren kan bli internt berettiget til å prøve på nytt tidligere
  enn vinduet på 60 sekunder som annonseres til klienten — tilsiktet margin,
  ikke en feil.

Permanente feil (agentrouters `无权访问模型` — ingen tilgang til denne modellen) blir
ALDRI omformulert: `excludeMarkers` overstyrer regelen selv når `textMarkers` treffer,
slik at feilen beholder sin opprinnelige status og ingenting prøver den på nytt
for alltid. Den samsvarende klassifiseringsregelen for leverandøren
(`agentrouter-model-access-denied` i `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, en deklarert basiskjøling på `6h`) konsulteres av
`checkFallbackError` (`open-sse/services/accountFallback.ts`)
_før_ den generiske tidlige returen for apikey-kategorien `FORBIDDEN`, styrt av
`honorsRuleLockScope(provider)` (#10334 — for øyeblikket eksklusiv for agentrouter via
allowlisten `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i
`providerErrorRules.ts`). Regelens deklarerte kjøling på 6 timer går videre som
`fallbackResult.baseCooldownMs`, men mates fortsatt inn i den eksisterende
utelukkelsesbanen per modell for kvoter (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, uendret av #10334 bortsett fra kilden til kjølingen):
den begrenses til operatørens `mlSettings.maxCooldownMs`
(standard `1_800_000ms` / 30 min), som alle andre modellutelukkelser, og den
_persisterte årsaken til utelukkelsen_ forblir den eksisterende hardkodede
`"forbidden"`, ikke regelens `"auth_error"` — bare kjølingsvarigheten
respekteres fra start til slutt, ikke årsaksstrengen. Selve tilkoblingen forblir
aktiv; søsknende modeller på samme tilkobling påvirkes ikke.

Omformulerte kvotefeil (`额度不足`) når frem til en leverandørregel i produksjon
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, uten egen deklarert kjøling — persistenslagets skalerte standardverdi
for backoff gjelder). Siden #10334 blir `scope` på
`ProviderErrorRuleMatch` brukt fra start til slutt, men **bare** for leverandører i
allowlisten `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
i dag bare `"agentrouter"`, styrt via `honorsRuleLockScope()`). For alle andre
leverandører forblir `scope` informativ, nøyaktig som før #10334.
`checkFallbackError` eksponerer den samsvarende regelens scope som
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) er den delte kontrollen som bekrefter at en
`ruleScope` faktisk er trygg å respektere som et tilkoblingsomfattende,
selvgjenopprettende signal (scope `"connection"`, reason `quota_exhausted`, aldri
`permanent`, aldri `creditsExhausted` — et vern mot en fremtidig regelkobling
av scope `"connection"` med en permanent kontotilstand). To forbrukere kaller den:

- **Persistens** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  i stedet for å havne i grenen for låsing **per modell** for passthrough-leverandøren
  (agentrouter har `passthroughModels: true` → `hasPerModelQuota()`
  returnerer `true`), aktiverer den en **midlertidig tilkoblingsnedkjøling** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, aldri en terminalstatus
  (`credits_exhausted`/`banned`/`expired`) — slik at tilkoblingen gjenopprettes
  automatisk når nedkjølingsperioden utløper, i stedet for å kreve en manuell
  tilbakestilling av legitimasjonen.
  Hoppes over for tilkoblinger med `disableCooling: true` (#2997): dette
  fravalget faller i stedet gjennom til låsing per modell (et dokumentert
  kompromiss — se kodekommentaren over grenen).
- **Komboruting i samme forespørsel** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): den samme vakten markerer
  tilkoblingen i det minnebaserte `exhaustedConnections`-settet, med nøkkelen
  `${provider}:${connectionId}`. Dette hopper bare over et gjenværende mål for
  SAMME FORESPØRSEL som _selv allerede har den nøyaktige `connectionId`_ på sitt
  eget målobjekt (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` før oppslaget i `exhaustedConnections`) — en vanlig kombinasjon
  med modelliste, der søstermålene ikke har en fastsatt `connectionId` på
  egen hånd, og ett mål bare løses per distribusjon fra responsens
  `X-OmniRoute-Selected-Connection-Id`-hode, treffer aldri denne
  nøkkelmatchingen. For dette vanlige tilfellet er den faktiske beskyttelsen mot
  at en gjenværende del bruker den nettopp utløpte kontoen på nytt, IKKE dette
  Set-et — det er persistenslaget ovenfor (tilkoblingens `rateLimitedUntil` er
  nå i fremtiden), kombinert med at den samme vakten undertrykker
  `transientRateLimitedProviders` for feilen (se «To-trinnsdesign» og
  kodekommentaren ved grenen
  `isAgentrouterConnectionQuotaScope` i `targetExhaustion.ts`): Når dette Set-et
  ikke markeres, aktiveres IKKE `combo.ts` sin `allowRateLimitedConnection`-
  tvangstillatelse (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) for
  leverandørens gjenværende deler. Dermed respekteres
  `rateLimitedUntil`-filteret for legitimasjonsvalg (`src/sse/services/auth.ts:1238`)
  normalt, og en gjenværende del velger enten en annen, fortsatt kvalifisert
  agentrouter-tilkobling eller mislykkes med at ingen legitimasjon er
  tilgjengelig — den tvinger seg ikke tilbake på tilkoblingen som denne grenen
  nettopp kjølte ned.

### To-trinnsdesign: statusrekonstruksjon, deretter klassifisering

Statusrekonstruksjon (`upstreamStatusRestatement.ts`) og regler for
leverandørklassifisering (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) er separate registre som begge bruker leverandør-ID og
tekstmarkører som nøkkel, men de kjøres på forskjellige steder og har ulike
formål: rekonstruksjon skriver om HTTP-statusen tidlig i `chatCore.ts`;
klassifiseringsregler velger reserveverdien `reason` og låseomfanget `scope`
(`model` / `provider` / `connection`) i `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klassifiseringsregler ser bare fullstendig feil **tekst** (nødvendig for å
matche markører i innholdet, som `额度不足`) for leverandører som er oppført i
hvitelisten `FULL_TEXT_RULE_PROVIDERS` i `providerErrorRules.ts` — for øyeblikket
bare `"agentrouter"`. For alle andre **innebygde katalogleverandører** gir
`checkFallbackError` `getProviderErrorRuleMatch` bare den strukturerte feilen
(`{code, type}`), noe som er tilstrekkelig for regler basert på hode/status/kode,
men som ikke ser tekstmarkører i innholdet. Hjelpefunksjonen
`resolveRuleMatchBody()` utfører dette valget: full feiltekst for leverandører
på hvitelisten, ellers den strukturerte feilen. Å legge til en **innebygd**
leverandør i `FULL_TEXT_RULE_PROVIDERS` er et eksplisitt samtykke per
leverandør — dette finnes for at standardbanen for alle leverandører som ikke
står på listen, skal forbli byte-for-byte uendret.

En regels `scope` (`model` / `provider` / `connection`) er et separat
samtykke fra `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` eksponerer den
bare som `fallbackResult.ruleScope`, og nedstrøms forbrukere respekterer den
bare som noe annet enn en informasjonsetikett for leverandører i hvitelisten
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samme fil (styrt via
`honorsRuleLockScope()` — i dag bare `"agentrouter"`). Se «Kvotefeil etter
rekonstruksjon» ovenfor for hva et treff med `scope: "connection"` faktisk
gjør når en leverandør står på denne hvitelisten.

**#11104 — operatørerklærte regler omgår begge hvitelistene.** En operatør kan
erklære en regel per leverandør under kjøring via
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
uten å redigere denne filen. Å legge en operatørregel bak
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — hvitelister som
skal beskytte **standard**oppførselen til innebygde katalogregler — ville gjort
innstillingsmekanismen uvirksom for alle leverandører bortsett fra dem som
allerede står oppført der, siden det å erklære regelen allerede er operatørens
eksplisitte samtykke. `resolveRuleMatchBody()` og `honorsRuleLockScope()` sjekker
begge `hasOperatorRuleForProvider()` først: En leverandør med en operatørregel
får den rå feilteksten, og den erklærte `scope`-verdien respekteres, uavhengig
av om leverandøren også finnes i en av hvitelistene.

**Operatørerklærte regler** (`OperatorProviderErrorRule`): Hver regel har en
valgfri `status` og en valgfri `match` (en enkel, uavhengig av store og små
bokstaver, delstreng i feilteksten, aldri en RegExp, slik at den ikke kan føre
til ReDoS), og må angi minst én av de to. Når begge er angitt, kombineres de
med AND; et utelatt felt matcher alt, slik at `{match: "insufficient_quota"}`
matcher enhver status som inneholder denne koden. Den første regelen som
matcher, vinner. `cooldownMs` kan settes til opptil 30 dager; totalt maksimalt
50 regler.

**Standardverdier for alt** (`settings.providerErrorDefaults`, valgfritt, angis gjennom
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
med `cooldownMs` fra 1 minutt til 30 dager. En standardverdi gjelder bare når ingen
operatørregel og ingen innebygd katalogregel samsvarte, og bare for 402, 403, 408,
429 og 5xx-feil. Feil i forespørselsformatet (400, 404, 409, 413, 422) og frittstående
401-feil beholder sin egen håndtering. Uten en eksplisitt `reason` hentes årsaken fra
statusen, på samme måte som `classifyError` gjør det. Å deklarere en standardverdi
teller som en operatørregel for `hasOperatorRuleForProvider()`, slik at dens `scope`
(standardverdi `"connection"`) respekteres. Den effektive nedkjølingstiden for en
standardverdi er den lengste av `cooldownMs` og leverandørens eget retry-hint
(`Retry-After`, `x-ratelimit-reset` eller et reset-hint i brødteksten, det samme
hintet motoren respekterer når innstillingen «use upstream retry hints» for
connection-cooldown er aktivert), slik at en standardverdi kan forlenge et kort
upstream-hint, men aldri forkorte en reell reset. En eksplisitt operatørregel beholder
sin nøyaktige `cooldownMs`. Verken en regel eller en standardverdi omgår
connection-cooldown-vaktene i `markAccountUnavailable`: En aktiv, lengre
nedkjøling forkortes aldri, og en terminal status overskrives aldri. De innebygde
tekst-detektorene som kjører tidligere i `checkFallbackError` (oppbrukte kreditter,
daglig kvote, deaktivert konto) har fortsatt forrang for sine egne fraser.

**Kjent mangel — `providerRuleRegistry` konsulteres aldri for HTTP 400.**
`checkFallbackError`-grenen `BAD_REQUEST` klassifiserer status 400 utelukkende
gjennom sine egne mønstermatriser (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` osv. i `accountFallback.ts`) og returnerer før grenen
med `configuredRule`/`getProviderErrorRuleMatch` ovenfor nås. En innebygd
katalogregel (eller en operatørregel) med `status: 400` er syntaktisk gyldig, men
vil aldri utløses. Ingen eksisterende regel retter seg mot 400 i dag, så ingenting
i produksjon påvirkes — men en fremtidig 400-regel krever at denne grenen endres
først. Det er en større endring enn å legge til en regel (den omklassifiserer 400
for alle leverandører som allerede er avhengige av atferden i mønstermatrisen) og
ligger utenfor omfanget av å legge til en regel for én leverandør.

### Legge til en ny gateway som feilaktig angir kvoten

1. Registrer én regelmatrise i `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Hold `textMarkers`
   leverandørspesifikke; gjenbruk aldri generiske engelske fraser som kolliderer med
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Registrer eventuelt klassifiseringsregler i
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) for å velge
   riktig låseomfang (`connection` for kvoter som gjelder hele kontoen, `model` for
   feil som gjelder én modell). Dette trer bare i kraft i produksjon for
   leverandører der reglene trenger hele feilteksten (markører i brødteksten): Legg
   leverandør-ID-en til `FULL_TEXT_RULE_PROVIDERS` i samme fil — ellers gir
   `checkFallbackError` regelen bare den strukturerte feilen
   `{code, type}`, og en regel basert på brødtekst vil aldri samsvare med trafikk i
   produksjon. Regler som utelukkende samsvarer på `status`/`headers` (som
   Opencode-reglene eller Minimax-reglene) trenger ikke dette valget. Separat: Hvis
   regelen erklærer `scope: "connection"` og hensikten er en faktisk nedkjøling som
   gjelder hele forbindelsen, pluss hopp over kombinasjonen for samme forespørsel
   (ikke bare en informativ etikett), må leverandør-ID-en legges til
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samme fil — dette styrer
   `isAgentrouterConnectionQuotaScope()`-lignende bruk i
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) og
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); uten dette går `scope` fortsatt
   gjennom `fallbackResult.ruleScope`, men ingenting bruker den.
3. Legg til enhetstester som speiler
   `tests/unit/upstream-status-restatement.test.ts` og
   `tests/unit/agentrouter-error-rules.test.ts` (inkludert vaktene
   not-permanent / not-creditsExhausted, og — hvis leverandøren trenger
   tillatelseslisten — en test som bekrefter at `resolveRuleMatchBody()` bare
   returnerer hele teksten for denne leverandøren).

Ingen endringer i `chatCore.ts`, `classifyError` eller combo er nødvendige.

#### Egress-bøttebasert lås (#10880)

Leverandører i `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode-familien) behandles som
upstream med IP-bøtte (opencode-gratisnivået er IP-basert, ikke kontobasert — se
#9611): En status-429 som klassifiseres som `quota_exhausted`
**eller** `rate_limit_exceeded` kjøler ned alle forbindelser i den tillatte
familien der sist kjente egress-IP samsvarer med den feilede forbindelsens, før
rotasjonen kan prøve dem
— og unngår dermed N-1 garantert mislykkede upstream-kall (samme form som
#10460/#10525). `rate_limit_exceeded` er tatt med med hensikt: På
`markAccountUnavailable`-banen samsvarer de opencode-spesifikke reglene aldri
(ingen headere/brødtekst sendes til `checkFallbackError`, og opencode er ikke i
`FULL_TEXT_RULE_PROVIDERS`), så en 429 med kvotetekst for abonnement
("monthly usage limit reached") klassifiseres som `quota_exhausted` av
reservefallet for kvotetekst (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1 times nedkjøling) før `status_429`-regelen nås — mens en
429 uten kvotetekst (vanlig hastighetsbegrensning) klassifiseres via
`status_429`-regelen som `rate_limit_exceeded` og fortsatt kjøler ned IP-familien.
For en leverandør som står på tillatelseslisten er en IP-basert
hastighetsbegrensning det samme signalet som en oppbrukt kvote. Reelle
begrensninger:

- **Beste innsats**: låsen slår opp tilkoblingens sist kjente `egress_ip`
  fra `proxy_logs` (24-timersvindu, synkront, uten hurtigbuffer). Tom hurtigbuffer
  (egress-IP-en har aldri blitt undersøkt) eller ingen rad → den feilende
  tilkoblingen kjøles fortsatt ned av grenen (registreres som i dag), men ingen
  søstertilkobling låses.
- **Aldri terminal**: nedkjølingen er et fornyende kvotevindu
  (`testStatus: "unavailable"`); en permanent tilstand utledes aldri fra et
  IP-nivåsignal. Tilkoblinger med `disableCooling` hopper over grenen fullstendig.
- **Låsegranulariteten endres for den tillatelseslistede familien**: dette er en
  omfangsendring, ikke bare en optimalisering av søstertilkoblinger. opencode er
  en `passthroughModels`-leverandør, så før denne grenen førte en 429 til en
  låsing per MODELL; nå fører den til nedkjøling av en tilkobling — også for en
  operatør som kjører bare én tilkobling uten noen søstertilkobling. Dette er
  granulariteten som opencodes regelstabell allerede erklærer som korrekt
  (`scope: "connection"`,
  `providerErrorRules.ts`), men som aldri har blitt håndhevet fordi opencode ikke
  finnes i `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grenen skriver selv den feilende
  tilkoblingens nedkjøling + `backoffLevel`, i tråd med den
  tilkoblingsomfattende agentrouter-grenen, og returnerer — blokkeringen per modell
  og den generiske banen nedenfor nås aldri.
- **Kombinasjon inkludert**: i likhet med agentrouter-grenen ignorerer omfanget
  med hensikt nedgraderingen av `persistUnavailableState`/`isCombo` som en
  kombinasjonskaller bruker på en 429. En låsing per modell er ikke en svakere
  form av dette omfanget, den er feil enhet: den sier ingenting om den oppbrukte
  IP-en, så kombinasjonsrotasjonen ville fortsette å bruke én garantert
  mislykket forespørsel per søstertilkobling.
- **Søstertilkoblingssikkerhet**: en søstertilkobling som allerede er terminal
  (banned/credits_exhausted) eller allerede er i en lengre nedkjøling,
  overskrives aldri.
- **Eksklusiv tillatelsesliste**: utvidelse av
  `EGRESS_BUCKETED_LOCK_PROVIDERS` er en eksplisitt beslutning fra eieren; ingen
  generisk kobling (mønster #10334/#10419). Spørringen etter søstertilkoblinger
  binder den samme tillatelseslisten i stedet for å gjenta den som en SQL-literal,
  slik at en utvidelse fortsatt er en endring på én linje.
- **Rotasjon av egress-IP, begge retninger**: oppslagsvinduet (24 timer) er
  langt bredere enn TTL-en for hurtigbufferen til egress-IP-en (5 min), så
  «sist kjente IP» er historikk, ikke gjeldende tilstand. Hvis en tilkoblings
  proxy roterte innenfor vinduet, kan låsen **gå glipp av** en genuint delt IP
  (den registrerte IP-en er den nye, ikke-oppbrukte) — og tilsvarende kan den
  **kjøle ned en søstertilkobling som siden har rotert bort** fra den oppbrukte
  IP-en. Det andre tilfellet koster den søstertilkoblingen ett
  nedkjølingsvindu; begge er aksepterte begrensninger ved et
  historikkbasert oppslag.
- **Kostnad**: to avgrensede skanninger av `proxy_logs` (vinduet filtreres via
  `idx_pl_timestamp`), bare ved 429-frekvens. Ingen ny indeks (migrering 134
  YAGNI). Målt på en databasekopi med reell trafikk av moderat størrelse; en
  instans med høy gjennomstrømning har proporsjonalt flere rader i det samme
  vinduet.

## Andre motstandsdyktighetsfunksjoner

- **22 rutingstrategier** (prioritet, vektet, round-robin, kontekst-relé, fyll-først, p2c, tilfeldig, — brukt, kostnadsoptimalisert, reset-aware, reset-window, expiry-first, headroom [AUTO-COMBO.md](../routing/AUTO-COMBO.md) quota-weighted, strict-random, auto, lkgp, kontekstoptimalisert, cache-optimalisert, zbqa, zvqfusion)
- **Tilbakestillingsbevisst ruting** (v3.8.0) — prioriterer tilkoblinger etter kvote tilbakestillingstid.
- **Forringelse av bakgrunnsmodus** — Responses API `background: true` degradert til synkronisering med advarsel.
- **Dynamisk verktøygrensedeteksjon** — støtter leverandører når grensene for antall verktøy når.
- **Nødfall** — kontrollert av `OMNIROUTE_EMERGENCY_FALLBACK`; operatører kan overstyre det fra funksjonsflagg-siden uten omstart.

---

## Feilsøking

- Vektet kombo svarer `503 all_targets_cooling_down` (`Retry-After` satt, `diagnostics.excluded` lister hvert mål med `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → poolen er konfigurert og tilkoblet, hvert mål er bare utelukket av en feiltoleranse-timer; advarselen `[COMBO] Weighted selection: every target excluded before dispatch — …` oppgir årsakene og gjenværende sekunder. En `404 no_executable_targets` fra samme kombo betyr at ingen feiltoleranse-timer var involvert (ingenting å kjøre, eller hver konto feilet tilgjengelighetssonden). Bygget i `open-sse/services/combo/pinRecovery.ts` fra utelukkelsene samlet i `targetResolution.ts`.
- Alle nøkler for en tilbyder hoppes over → sjekk både circuit breaker-tilstand OG hver tilkoblings `rateLimitedUntil`/`testStatus`.
- Tilbyder permanent utelukket etter tilbakestillingsvinduet → kode leser rå `state` i stedet for `getStatus()`/`canExecute()`.
- Én nøkkel feiler, de andre burde fungere → foretrekk tilkoblingsnedkjøling fremfor circuit breaker.
- Bare én modell feiler → foretrekk modellutelåsing fremfor tilkoblingsnedkjøling.
- Tilstand burde gjenopprette seg selv, men gjør det ikke → se etter fremtidig tidsstempel + lesvei som fornyer utløpt tilstand. Permanente statuser krever manuelle endringer.

---

## Kjøretidstilstand — hurtigreferanse for agent

> Flyttet ordrett fra `AGENTS.md` → "Resilience Runtime State" (PR #12743) slik at
> agentveiledningen holder seg under kontekstbudsjettet på 40k. Det er den kondenserte,
> agentrettede visningen av seksjonene ovenfor; de nummererte seksjonene forblir den
> fullstendige referansen.

OmniRoute har tre beslektede, men distinkte mekanismer for midlertidige feil. Hold
omfanget deres adskilt ved feilsøking av rutingsatferd. Se
[diagram over 3-lags feiltoleranse](../diagrams/exported/resilience-3layers.svg)
(kilde: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
for et oversiktskart.

### Circuit breaker for tilbyder

**Omfang**: hele tilbyderen, f.eks. `glm`, `openai`, `anthropic`.

**Formål**: slutte å sende trafikk til en tilbyder som gjentatte ganger feiler på
oppstrøms-/tjenestenivå, slik at én usunn tilbyder ikke bremser hver forespørsel.

**Implementasjon**:

- Kjerneklasse: `src/shared/utils/circuitBreaker.ts`
- Kabling av chat-gate/kjøring: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API for kjøretidsstatus: `src/app/api/monitoring/health/route.ts`
- Delte wrappere: `open-sse/services/accountFallback.ts`
- Persistert tilstandstabell: `domain_circuit_breakers`

**Tilstander** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normal trafikk tillates.
- `DEGRADED`: tidligvarslingsbånd — feilene krysset degraderingsterskelen, men ikke
  breaker-terskelen ennå; trafikken flyter fortsatt, dashbord viser advarselen. En gyldig
  tilkoblingstest eller et rolig vindu uten nye feil returnerer den til `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` har vinduet).
- `OPEN`: tilbyderen er midlertidig blokkert; kallere får et provider-circuit-open-svar,
  eller komboruting hopper til et annet mål.
- `HALF_OPEN`: tilbakestillingens tidsavbrudd er utløpt; tillat en prøveforespørsel.
  Vellykket lukker breakeren, feil åpner den igjen.

**Standardverdier** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, forbrukt via
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` i `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` i `src/sse/handlers/chatHelpers.ts`). Breakeren for hele
tilbyderen kjører på `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil     | degraderes ved | åpner ved (`circuitBreakerThreshold`) | tilbakestilling (`circuitBreakerReset`) |
| ---------- | -------------: | ------------------------------------: | --------------------------------------: |
| OAuth      |            `5` |                                   `8` |                                   `60s` |
| API-nøkkel |            `7` |                                  `12` |                                   `30s` |
| Lokal      |      (utledet) |                                   `2` |                                   `15s` |

`PROVIDER_PROFILES` definerer også `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) og `providerCooldownMs` (5/10/1 min): disse driver
**vindusporten til den globale tilbydernedkjølingen som må slås på** (`PROVIDER_COOLDOWN_ENABLED`, av
som standard) — en oppføring på tilbydernivå i `open-sse/services/providerCooldownTracker.ts` regnes
bare som nedkjølende etter `providerFailureThreshold` feil innenfor `providerFailureWindowMs`, og
kjøles deretter ned i `providerCooldownMs`. De er IKKE tersklene til den aktive breakeren — ikke
still dem inn i forventning om breaker-atferd. Hver standardverdi kan overstyres via
miljøvariablene `OMNIROUTE_PROVIDER_BREAKER_*` og `OMNIROUTE_CIRCUIT_BREAKER_*`;
referansetabellen som er nøyaktig for kjøretiden ligger i `docs/architecture/RESILIENCE_GUIDE.md`.

Bare feilstatuser på tilbydernivå skal utløse tilbyderbreakeren:

```ts
(408, 500, 502, 503, 504);
```

Ikke utløs breakeren for hele tilbyderen ved normale konto-/nøkkel-/modellfeil som de fleste
tilfeller av `401`, `403` eller `429`. Disse hører vanligvis til tilkoblingsnedkjøling eller
modellutelåsing. En generisk `403` fra en API-nøkkel-tilbyder skal være gjenopprettbar med mindre
den klassifiseres som en endelig tilbyder-/kontofeil.

Bryteren bruker lat gjenoppretting, ikke en bakgrunnstimer. Når `OPEN` utløper,
oppdaterer lesinger som `getStatus()`, `canExecute()` og `getRetryAfterMs()`
tilstanden til `HALF_OPEN`, slik at dashbord og kombinasjonskandidatbyggere ikke
fortsetter å ekskludere en utløpt leverandør for alltid.

### Nedkjøling av tilkobling

**Omfang**: én leverandørtilkobling/konto/nøkkel.

**Formål**: midlertidig hoppe over én dårlig nøkkel/konto mens andre tilkoblinger for
samme leverandør kan fortsette å betjene forespørsler.

**Implementasjon**:

- Skrive-/oppdateringssti: `src/sse/services/auth.ts::markAccountUnavailable()`
- Kontovalg/filtrering: `src/sse/services/auth.ts::getProviderCredentials...`
- Nedkjølingsberegning: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Innstillinger: `src/lib/resilience/settings.ts`

Viktige felt på leverandørtilkoblinger:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Under kontovalg hoppes en tilkobling over mens:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Nedkjølinger er også late: når `rateLimitedUntil` er i fortiden, blir tilkoblingen
kvalifisert igjen. Ved vellykket bruk tømmer `clearAccountError()` `testStatus`,
`rateLimitedUntil`, feilfeltene og `backoffLevel`.

Standard oppførsel for tilkoblingsnedkjøling:

- OAuth-grunnnedkjøling: `5s`.
- Grunnnedkjøling for API-nøkkel: `3s`.
- API-nøkkel `429` bør foretrekke oppstrøms hint om nye forsøk (`Retry-After`,
  reset-headere eller parserbar reset-tekst) når de er tilgjengelige.
- Gjentatte gjenopprettbare feil bruker eksponentiell backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Beskyttelsen mot «thundering herd» forhindrer at samtidige feil på samme tilkobling
gjentatte ganger forlenger nedkjølingen eller dobbeltinkrementerer `backoffLevel`.

Terminale tilstander er ikke nedkjølinger. `banned`, `expired` (som bare blir terminal
etter N begrensede nye forsøk via `EXPIRED_RETRY_MAX`) og `credits_exhausted` er
ment å forbli utilgjengelige inntil legitimasjon/innstillinger endres eller en
operator tilbakestiller dem. Ikke overskriv terminale tilstander med forbigående
nedkjølingstilstand.

### Modellutestenging

**Omfang**: leverandør + tilkobling + modell.

**Formål**: unngå å deaktivere en hel tilkobling når bare én modell er utilgjengelig
eller kvotebegrenset for den tilkoblingen.

Eksempler:

- Leverandører med kvote per modell som returnerer `429`.
- Lokale leverandører som returnerer `404` for én manglende modell.
- Leverandørspesifikke modus-/modelltillatelsesfeil, som utvalgte Grok-moduser.

Modellutestenging ligger i `open-sse/services/accountFallback.ts` og lar samme
tilkobling fortsette å betjene andre modeller.

### Veiledning for feilsøking

- Hvis alle nøkler for en leverandør hoppes over, undersøk både leverandørens
  brytertilstand og hver tilkoblings `rateLimitedUntil`/`testStatus`.
- Hvis en leverandør ser ut til å være permanent ekskludert etter
  tilbakestillingsvinduet, sjekk om koden leser rå `state` i stedet for å bruke
  `getStatus()`/`canExecute()`.
- Hvis én leverandørnøkkel feiler, men andre skulle fungert, foretrekk
  tilkoblingsnedkjøling fremfor leverandørbryter.
- Hvis bare én modell feiler, foretrekk modellutestenging fremfor
  tilkoblingsnedkjøling.
- Hvis en tilstand skal gjenopprette seg selv, bør den ha et fremtidig
  tidsstempel/tidsavbrudd for tilbakestilling og en lesesti som oppdaterer utløpt
  tilstand. Permanente statuser krever manuelle endringer av legitimasjon eller
  konfigurasjon.

---

## TLS-fingeravtrykk og stealth

Leverandørspesifikk stealth (JA3/JA4, CCH, obfuskering) er dokumentert separat — se `docs/security/STEALTH_GUIDE.md` (git; ikke kompilert inn i `/docs`).

---

## Robusthetstesting (fase 8 · blokk C)

Utover enhetstester for robusthetslogikken, utsetter tre tester kjøretidsmiljøet for
reelle stress-/feilforhold (alle integrasjon/nattlig — ingen blokkerer PR-er):

| Test       | Hva                                                                                                                                                                                        | Kjør                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Kaos       | Falsk upstream-node injiserer reell latens/reset/timeout/503; validerer at kretsbryteren åpner seg/gjenoppretter og at `checkFallbackError` klassifiserer 503 som gjenopprettbar fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-vekst | ~500 strømmer per `createSSEStream` under `--expose-gc`; feiler hvis heapen vokser utover taket (OOM-beskyttelse #3069).                                                                   | `npm run test:heap`                      |
| k6 soak    | Vedvarende belastning mot `/api/monitoring/health`; p95-/feilterskler.                                                                                                                     | `k6 run tests/load/k6-soak.js` (nattlig) |

Orkestrert av `.github/workflows/nightly-resilience.yml` (cron + dispatch). I
standard `test:integration` hopper kaos- og heap-testene automatisk over seg selv (uten `RUN_CHAOS_INT`/`--expose-gc`).

---

## Se også

- [Arkitekturveiledning](./ARCHITECTURE.md) — Systemarkitektur og interne detaljer
- [Brukerveiledning](../guides/USER_GUIDE.md) — Leverandører, kombinasjoner, CLI-integrasjon
- [Auto-Combo-motoren](../routing/AUTO-COMBO.md) — 16-faktor poengberegning, moduspakker
