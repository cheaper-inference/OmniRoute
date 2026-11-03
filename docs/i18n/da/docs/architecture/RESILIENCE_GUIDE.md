# Resilience Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute har tre forskellige, men relaterede modstandsmekanismer. Hver har et forskelligt omfang og formål. Hold dem adskilt, når du fejlfinder routingadfærd.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Kilde: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-dashboard forrang for modstandsdygtighed.** Opt-in modstandskraften skifter seeded fra miljøet — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — leverer kun _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). En boolesk varede i `resilienceSettings` (Dashboard →** Indstillinger → Resilience** / `PATCH /api/resilience`, gemt i `key_value`) vinder over env-værdien: normalisering (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) beholder den lagrede boolean, når der findes en. Indstilling af en sådan env var til `true` på en implementering, hvor dashboardet allerede har gemt `false` ændrer derfor intet — vend skiften ind** Indstillinger → Resilience** (eller ryd det gemte felt) i stedet for.

## 1. Udbyder-circuitbreaker

**Omfang:** hele udbyderen (f.eks. `glm`, `openai`, `anthropic`).

**Formål:** stoppe med at sende trafik til en udbyder, der gentagne gange fejler på upstream-/serviceniveau.

**Implementering:**

- Kerneklasse: `src/shared/utils/circuitBreaker.ts`
- Tilkobling: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- Nulstillings-API: `POST /api/resilience/reset`
- Wrappere: `open-sse/services/accountFallback.ts`
- DB-tabel: `domain_circuit_breakers`

**Tilstande:**

- `CLOSED` — normal trafik tilladt
- `DEGRADED` — trafik er stadig tilladt, men forhøjede udbyderfejl spores; vender tilbage til `CLOSED` ved tilstrækkeligt mange succeser, ved en gyldig forbindelsestest eller efter den længste `OPEN`-holdetid for den seneste fejltype (dens `cooldownByKind`-værdi, ellers `resetTimeout`, × `maxBackoffMultiplier`, mindst én cooldown) uden en ny fejl
- `OPEN` — udbyderen er midlertidigt blokeret; combo-routing springer den over
- `HALF_OPEN` — nulstillings-timeout er udløbet; testforespørgsel tilladt

**Konfigurerbare standardværdier (`open-sse/config/constants.ts`, vist under Dashboard → Settings → Resilience):**

| Klasse    | Degraderes ved | Åbner ved | Nulstillings-timeout |
| --------- | -------------- | --------- | -------------------- |
| OAuth     | 5 fejl         | 8 fejl    | 60s                  |
| API-nøgle | 7 fejl         | 12 fejl   | 30s                  |
| Lokal     | afledt         | 2 fejl    | 15s                  |

`degradationThreshold` styrer, hvornår en udbyder går ind i `DEGRADED`; `failureThreshold` styrer, hvornår den åbner og springes over. Lokale udbyderprofiler vises endnu ikke på indstillingssiden Resilience.

**Udløsningskoder:** kun statuskoder på udbyderniveau `[408, 500, 502, 503, 504]`. Udløs IKKE for fejl på kontoniveau (de fleste 401/403/429 — de hører til cooldown eller lockout).

**Doven genopretning:** når `OPEN` udløber, opdaterer `getStatus()`, `canExecute()` og `getRetryAfterMs()` tilstanden til `HALF_OPEN`. De samme læsninger (og den næste fejl) lader en forældet `DEGRADED` aftage tilbage til `CLOSED`. Ingen baggrundstimer nødvendig.

---

### Valgfri global udbyder-cooldown (vindues-gate)

Et fjerde, **valgfrit** lag (`PROVIDER_COOLDOWN_ENABLED`, som standard **slået fra**) fører en hukommelse på tværs af forespørgsler over fejlende udbydere i
`open-sse/services/providerCooldownTracker.ts`, som combo-målopløsningen rådfører sig med, så fortløbende combo-forespørgsler holder op med at prøve en udbyder igen, der lige er fejlet. Poster på udbyderniveau overholder `PROVIDER_PROFILES`-vinduesgaten:

| Profil    | udløser efter (`providerFailureThreshold`) | inden for (`providerFailureWindowMs`) | køler ned i (`providerCooldownMs`) |
| --------- | -----------------------------------------: | ------------------------------------: | ---------------------------------: |
| OAuth     |                                       `10` |                               `15min` |                             `5min` |
| API-nøgle |                                       `15` |                               `30min` |                            `10min` |

Under tærsklen anses udbyderen **ikke** for at være i nedkøling; en succes rydder vinduet. Poster på forbindelsesniveau (`provider:connectionId`) beholder i stedet den eksponentielle `minRetryCooldownMs → maxRetryCooldownMs`-backoff. Overstyringer:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressionssikring: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Forbindelse Nedkøling

**Omfang:** enkelt udbyder connection/account/key.

**Formål:** spring en dårlig nøgle over, mens andre forbindelser for den samme udbyder bliver ved med at betjene.

**Implementering:**

- Markér utilgængelig: `src/sse/services/auth.ts::markAccountUnavailable()`
- Valg: `getProviderCredentials*` i samme fil
- Nedkølingsberegning: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Indstillinger: `src/lib/resilience/settings.ts`

**Felter pr. forbindelse:**

- `rateLimitedUntil` — tidsstempel indtil nedkøling udløber
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponentiel backoff-tæller

**Standard nedkøling:**

- OAuth base: 5s
- API-nøglebase: 3s
- API-nøgle 429: foretrækker upstream `Retry-After`/reset headers/parseable reset tekst
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Forsinkelse pr. udbyder igen.** Udbyderens detaljeside har en** Forsøg igen** vælg (Auto, 15s op til 1t). Det sparer `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, til og med `PATCH /api/resilience`). Når en hastighedsgrænsefejl ikke har noget upstream-genforsøgs-tip, erstatter denne værdi den skalerede backoff for udbyderen og nulstiller `backoffLevel` til 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Forrang for en hastighedsbegrænset fejl, højest først: opstrøms genforsøgs-tip, derefter pr-forbindelse `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, derefter pr. udbyders genforsøgsforsinkelse, derefter env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, derefter den skalerede backoff. Auto fjerner feltet. Det påvirker kun årsagen til hastighedsgrænsen, aldrig terminaltilstande.

**Anti-torden-flok vagt:** forhindrer samtidige fejl i at over-udvide nedkøling eller dobbelt-inkrementering af `backoffLevel`.

**Concurrency-limit 429'ere klatrer ikke op ad backoff-stigen.** En `429`, hvis krop rapporterer en samtidighedsgrænse ("for mange samtidige anmodninger", "samtidighedsgrænse", "parallel anmodningsgrænse", GLM `并发数过高`) betyder, at kontoen er sund, men optaget. `checkFallbackError()` returnerer årsagen `concurrency_limited`: mislykkes over til den næste forbindelse nu, køl denne til en fast `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) eller upstream-tip igen, behold `backoffLevel` uændret, og indstil `skipProviderBreaker`. Et eksplicit kvoteorgan vinder stadig, så et organ, der også matcher et kvotemønster, forbliver en kvotedom. Detektion: `looksLikeConcurrencyLimit()` i `src/shared/utils/classify429.ts`; dom: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (afbryderens `FailureKind`) er uændret og læser stadig `rate_limit` for disse kroppe.

**Stream-indholdsboder køler ikke kontoen.** Når indholdsstall-vagthunden (`open-sse/utils/streamHandler.ts`) giver op på en stream, der ikke sendte noget modeloutput i tide, registrerer `markAccountUnavailable()` fejlen på forbindelsen, men sætter ingen nedkøling: stallen tilhører den anmodning, oftest en lang ræsonnement-tur uden output endnu. Operatører kan tilmelde sig igen med `resilienceSettings.streamStallCooldown.enabled` (standard `false`).

**Opt-in latency signal for `p2c` kontovalg.** Hvert afsendt forsøg registrerer sin tid til første byte og resultat pr. forbindelse (og pr. forbindelse + -model) i et rullende vindue i hukommelsen: de sidste 20 samples inden for 15 minutter (`open-sse/services/connectionLatencyTracker.ts`, optaget fra `safeLogEvents()` i `src/sse/handlers/chatHelpers.ts`). Når `resilienceSettings.p2cLatency.weight` er over `0` (interval 0-20, standard `0` = fra), tilføjer `compareP2CConnections()` i `src/sse/services/auth.ts` op til `weight` point til hver kandidat i parret. Halvdelen af det kommer fra latens som et forhold til den hurtigere kandidat (dobbelt så langsom tager hele halvdelen) og halvdelen fra den rullende fejlrate. Udtrykket gælder kun, når begge kandidater har mindst 3 prøver, så nye konti straffes ikke, og dets loft forbliver under de kvoteblokerede og kvoteopbrugte sanktioner. Det tilføjer ikke noget eget kredsløb: fejlagtige konti håndteres stadig af nedkøling, lockout og breaker-lag. Indstil den med `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Begrundelsesrammer genstarter indholds-stall-budgettet.** En ræsonnementmodel kan tænke i minutter før dens første synlige token: Claude streamer `thinking_delta` -rammer, hvis tænkende tekst kan være tom, og Responses API streamer det ene ræsonnement efter det andet. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) genkender disse rammer, og vagthunden genstarter sit budget på hver enkelt i stedet for at annullere turen. De er stadig ikke model-output, så en drejning, der ender med kun ræsonnement, rapporteres stadig som tom, og en drejning, der stopper med at ræsonnere og kun sender hjerteslag, tripper stadig vagthunden.

Kiro binære `reasoningContentEvent` rammer med en ikke-tom signatur bevarer denne ræsonnementaktivitet gennem eksekveren som et tomt `reasoning_content` delta. Signaturen videresendes ikke. Metadata, ufuldstændige rammer og tomme signaturer genstarter ikke indholdsbudgettet; den uafhængige timeout for aktiv stream og klientannullering gælder stadig (`open-sse/executors/kiro/reasoning.ts`).

**Terminaltilstande (NOT -afkøling):**

- `banned` — indstillet af forbudt-søgeord/konto-forbuddetektion (se [BAN_DETECTION](../security/BAN_DETECTION.md) ), og af tre på hinanden følgende upstream-afvisninger pr. anmodning (`request_rejected`, f.eks. Anthropic OAuth 403 "Anmodning ikke tilladt" — `open-sse/services/requestRejectedStreak.ts`); et enkelt afslag køler kun forbindelsen ned
- `expired` (overgange til terminal efter afgrænsede genforsøg — `EXPIRED_RETRY_MAX = 3` med eksponentiel backoff —, så forbigående OAuth fejl kan selvhelbrede sig, før kontoen deaktiveres permanent)
- `credits_exhausted`

Disse fortsætter, indtil legitimationsoplysningerne ændres, eller en operatør nulstiller dem. Overskriv ikke terminaltilstande med transient nedkølingstilstand.

**Doven bedring:** når `rateLimitedUntil` er forbi, bliver forbindelsen kvalificeret igen. Ved vellykket brug rydder `clearAccountError()` alle fejlfelter.

### Claude OAuth -brugsvæg: nulstillet bane med lavere prioritet + -sessionsgrænse

**Omfang:** én Claude -abonnement (OAuth) forbindelse. Begge funktioner er** opt-in pr forbindelse** (Rediger forbindelse → Claude sektion → `lowPriorityMode` / `autoLimitReset` i `providerSpecificData`, begge standard fra) og spejl Claude Codes `/low-priority` og `/limit-reset` -kommandoer (trådkontrakt hentet fra Claude -kode 2.1.263).

**Implementering:**

- State machine + respons klassifikation: `open-sse/services/claudeLowPriority.ts`
- Nulstil status/claim klient: `open-sse/services/claudeLimitReset.ts`
- Executor hook (header-indsprøjtning + samme konto genforsøg): `open-sse/executors/base.ts::execute()`
- Opt-in persistens: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Udløser:** 5-timers brugsvæggen — a `429`, hvis overskrifter bærer `anthropic-ratelimit-unified-status: rejected` og, når kontoen er kvalificeret, `anthropic-ratelimit-unified-slow-offer: treatment`. Intet sendes før den første væg 429; en burst 429 uden unified headers går gennem den normale nedkølingssti.

**Lavere prioritet vognbane** (`lowPriorityMode`):

- På væggen 429 accepterer bobestyreren tilbuddet og forsøger straks igen** samme** konto med `anthropic-usage-limit: slow`; banen forbliver aktiv indtil den annoncerede `anthropic-ratelimit-unified-reset` (+ 60s grace), og hver anmodning i det vindue bærer overskriften. Den opsnappede 429 når aldrig `handleChatCore`, så forbindelsen er** ikke** sat i cooldown og er ikke roteret væk.
- `anthropic-ratelimit-unified-slow-status` på senere svar: `active` / `not_needed` hold banen; `slot_busy` (429) eller en `529` vent serverens `anthropic-ratelimit-unified-slow-retry-after` (standard 20s, clamp 5–600s, ± 30% jitter) og prøv igen, afgrænset af `anthropic-ratelimit-unified-slow-max-wait` (standard 20 min, clamp 1 min–6 h) — forbi, at banen slutter og en 10-minutters afkølings-reaccept-blokering. Ventetiden er desuden begrænset af, hvad der er tilbage af anmodningens egen upstream-start timeout (`resolveFetchStartTimeout`, 10 min som standard) minus en 5 s margin: Uden det loft ville standard max-wait på 20 minutter overleve anmodningen, og søvnen ville blive afbrudt midt i ventetiden, og få en `TimeoutError` i stedet for den yndefulde `max_wait` +.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, en 5h-window rollover eller `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (som ender det som `extra_usage` på en hvilken som helst status, da betalt overskud nu dækker væggen) afslutter banen; svaret flyder derefter til den normale nedkølingsvej. `budget_exhausted` huskes indtil den annoncerede budgetnulstilling (≤ 8 dage).
- Vægtjekket kører efter eksekverens egne 400-drevne intra-forsøg-genforsøg (kontekstredigering, thinking/effort klemmer, param auto-learn), så en væg 429, der kun overflader på et af disse genforsøg, bliver stadig opsnappet i stedet for at nå nedkølingsstien.
- Tilstanden er i hukommelsen pr. forbindelse (en genstart koster en ekstra væg 429 at genacceptere).

**Session-grænse nulstillet** (`autoLimitReset`, prøvet før banen, når begge er på):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` blok; når `arm: "reset"` og `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` med `{ "program": "juniper_tide" }` (organisation UUID fra `providerSpecificData.organizationUUID`, bootstrap fallback).
- `result: reset|not_limited` → anmodningen prøves igen med fuld hastighed (ingen langsom header). `already_used` / `not_offered` memoise `next_available_at` (standard en uge); enhver fejl forsvinder i 15 minutter. Nulstillingen er én gang om ugen og tæller stadig med i den ugentlige grænse.

Regressionsvagter: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sessionstilhørsforhold (#7274)

**Omfang:** én klientsession (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) fastgjort til én forbindelse, for** enhver** udbyder.

**Formål:** holde en multi-turn-agent (Claude -kode, aider, brugerdefinerede agenter) på den samme konto på tværs af anmodninger, hvilket reducerer konteksttab på tværs af konti og gentagne koldstarts-429'er på udbydere med sessionstilstand pr. konto.

**Implementering:**

- TTL opløsning: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Overskriftsudtrækning (generisk, enhver udbyder): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Vedvarende pin-tabel: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Indstilling: `sessionAffinityTtlMs` (global TTL i ms, `0` deaktiverer) — `src/lib/db/settings.ts`. Omdøbt fra Codex-only `codexSessionAffinityTtlMs` ved migration `124_generic_session_affinity_ttl.sql`, som overfører enhver tidligere konfigureret Codex TTL som den nye standard.

Før #7274 blev `resolveSessionAffinityTtlMs()` hard-bailed til `0` for alle udbydere undtagen `codex`, så TTL indstillingen (og sessionsoverskrifterne) havde ingen effekt andre steder, selvom fastgørelsesmekanismen og headerudtrækningen allerede var udbyder-agnostisk. Rettelsen fjernede den tidlige tilbagevenden; TTL gælder nu ensartet for hver udbyder, når den er sat globalt over `0`.

De tre session-affinitets-headere videresendes aldrig opstrøms. — eksekutorer bygger deres egne upstream-headere fra bunden i stedet for at sende klient-headers igennem, så dette forbliver kun et internt korrelations-id.

### Eksklusive leasingkontrakter for administreret sessionsforbindelse

**Omfang:** én aktiv administreret HTTP client/session ejer én kvalificeret OmniRoute forbindelse.

**Formål:** give varigt eksklusivt forbindelsesejerskab til kunder, der har brug for et hårdt routinghegn på tværs af anmodninger. Dette adskiller sig fra sessionsaffinitet, som er en blød kontinuitetspræference: en eksklusiv leasingaftale bevarer livscyklustilstanden i SQLite, håndhæver global aktiv ejer og aktiv forbindelses unikhed og afviser en forældet generation før udbyderens afsendelse.

Funktionen er opt-in per API nøgle. En administreret nøgle skal have `lease:exclusive` omfanget og en eksplicit ikke-tom `allowedConnections` liste. Enhver HTTP klient kan bruge livscyklusslutpunktet; intet klientnavn, brugeragent, udbyder, OAuth metode eller model er påkrævet. Lejemålet ejer en forbindelse, ikke en model, så en modelændring bevarer bindingen, mens forbindelsen forbliver almindeligt berettiget. Regler for normal model, kvote, sundhed, nedkøling og tilladelsesliste forbliver autoritative og kan overføre den samme generation til en anden gratis kvalificeret forbindelse.

Livscyklussen er `POST /api/v1/session-leases` med JSON -handlingerne `acquire`, `renew` og `release`. Administrerede slutningsanmodninger præsenterer den uigennemsigtige `X-OmniRoute-Lease-Owner` værdi og nøjagtige `X-OmniRoute-Lease-Generation`. Ejeren bruger `vlo_` efterfulgt af 43 base64url-tegn; kun dens SHA-256 -hash gemmes. Hvert sidste afsendelseshegn binder også den autentificerede API -nøgle ID og den aktive forbindelse ID. Leasingkontrol-headere fjernes fra logfiler, bevarede anmodningssnapshots og upstream-executor-headere.

Hvis almindelig routing har kvalificerede administrerede kandidater, men hver ledig kandidat er optaget af en udenlandsk aktiv leasingkontrakt, returnerer OmniRoute HTTP `429`, lease-capacity-unavailable-kode, en venter-på-kapacitet-tilstand og en begrænset `Retry-After` afledt fra det tidligste relevante udløb. Almindelig tom berettigelse er ikke leasingstrid og beholder sin eksisterende routingfejlsemantik.

Relaterede mekanismer forbliver adskilte:

- OAuth session occupancy er proceslokal blød distribution for OAuth konti.
- Kontosemaforer giver anmodnings-samtidighedstilladelser og slutter, når en anmodning er fuldført.
- Eksklusive administrerede sessionslejekontrakter er varigt livscyklusejerskab med et generationshegn.

---

## 3. Model Lockout

**Omfang:** udbyder + forbindelse + model-triple.

**Nøgleomfang efter status:** den fejlende status bestemmer, hvilken nøgle en lockout skriver til (`resolveLockoutScope()` i `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — et kvote- eller rettighedssignal — låser **kvotefamilien**:
  for codex hele `codex` / `spark`-omfanget (hver `gpt-5*`-model på
  forbindelsen), for andre udbydere `getQuotaScopedModelForProvider()`.
- `404` låser den blotte model (`getModelLockKey()` indsnævrer `not_found`).
- Enhver anden status — `5xx` transport-/serverfejl og OmniRoutes egen
  syntetiserede `502` fra kvalitetsvalidering — låser kun den **eksakte**
  udbyder/forbindelse/model-tuple. En dårlig stream på én model er ikke bevis
  for kontoens kvote; før denne regel fjernede ét tomt svar på
  `codex/gpt-5.6-luna` hver `gpt-5*`-model på den forbindelse fra
  routing i 2–30 min (eskalerende), mens dens kvote var urørt.
- En kalders eksplicitte `scope`-indstilling vinder altid (Antigravity sender `"exact"`).

**Formål:** at undgå at deaktivere en hel forbindelse, når kun én model er utilgængelig eller kvotebegrænset.

**Eksempler:**

- Per-model-kvoteudbydere, der returnerer 429
- Lokale udbydere, der returnerer 404 for én manglende model
- Udbyderspecifikke mode-/model-tilladelsesfejl (f.eks. Grok-modes)

**Implementering:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Cooldowns Dashboard (v3.8.0)

UI: Indstillinger → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Lister aktive lockouts med: udbyder, forbindelse, model, årsag, expiresAt. Operatører kan manuelt genaktivere en model fra kortet.

**REST API:**

- `GET /api/resilience/model-cooldowns` — list aktive lockouts
- `DELETE /api/resilience/model-cooldowns` — manuel genaktivering. Body: `{provider, connection, model}`. Auth: management.

### Cooldown Manager

UI: Overvågning → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Én side for hver forbindelse, der er ude af routing af en midlertidig årsag, i stedet for
at åbne hver udbyderside. Den lister forbindelses-cooldowns, model-lockouts og terminaltilstande,
rydder dem per forbindelse, for en valgt gruppe eller for alle forbindelser hos en udbyder,
og redigerer de mest justerede cooldown-regler: `streamStallCooldown.enabled` og OAuth-/API-nøgle-
`connectionCooldown`-basis-cooldown og maksimale backoff-trin (gemt via
`PATCH /api/resilience`). Terminaltilstande (`banned`, `expired`, `credits_exhausted`) listes,
men ryddes aldrig her.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — forbindelser med status, resterende cooldown,
  backoff-niveau, sidste fejltype og model-lockouts (ingen legitimationsoplysninger)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` eller
  `{all: true, provider?}`; returnerer `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Lockout-indstillinger UI + success-decay-gendannelse (v3.8.23)

Model-lockout gik fra altid-til-hårdkodet adfærd til en fuldt konfigurerbar,
opt-in-funktion med sit eget indstillingskort og en selvhelende gendannelsesvej.

**Indstillingskort:** Indstillinger → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Dette er **adskilt** fra det skrivebeskyttede `ModelCooldownsCard` ovenfor (som kun
_lister_ aktive lockouts) — det nye kort _konfigurerer parametrene_. Standardværdier
findes i `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Indstilling             | Standard                         | Betydning                                                   |
| ----------------------- | -------------------------------- | ----------------------------------------------------------- |
| `enabled`               | `false`                          | Hovedkontakt — model-lockout er **slået fra som standard**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Opstrøms statusser, der tæller som en modelspecifik fejl.   |
| `baseCooldownMs`        | `120_000` (120 s)                | Indledende lockout-varighed for den første fejl.            |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Loft over den eskalerede cooldown.                          |
| `maxBackoffSteps`       | `10`                             | Maksimale eksponentielle backoff-eskaleringstrin.           |
| `useExponentialBackoff` | `true`                           | Om gentagne fejl eskalerer cooldown eksponentielt.          |

Indstillinger bevares via det normale indstillingslager og valideres via
resilience-indstillingsskemaet; kortet begrænser `baseCooldownMs`/`maxCooldownMs`
(med `maxCooldownMs ≥ baseCooldownMs`) og `maxBackoffSteps`.

**Success-decay-gendannelse:** gendannelse er **ikke** udelukkende timer-udløb. Et sundt
svar nedtrapper modellens fejltælling, så en model, der er kommet sig
midt i vinduet, stopper eskaleringen (og ryddes), før dens timer ville. På et vellykket
combo-mål kalder `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), som **halverer** den lagrede
`failureCount` (`Math.floor(failureCount / 2)`); når den når `0`, slettes lockout-
posten helt. Modstykket `recordModelLockoutFailure()`
øger tællingen (og eskalerer cooldown) ved fejl inden for
eskaleringsvinduet. Denne success-decay er et supplement til almindeligt timer-udløb —
begge veje kan genaktivere en model.

**Tilstand:** lockouts holdes **i hukommelsen** (per-proces `Map`-er af
`ModelLockoutEntry` med nøgle `provider:connectionId:model`, exact-scope-låse med
`provider:connectionId:exact:model`), ikke gemt i
databasen — de mistes ved genstart. _Indstillingerne_ bevares; den aktive
lockout-_tilstand_ er flygtig.

---

## 4. Samtidig kontrol med kvoteandele (v3.8.36)

Abonnementskonti (GLM, MiniMax, osv.) accepterer ofte kun ~ 1-3 samtidige anmodninger; overskridelse udløser 429s og nedkøling. Dette er akut under** kvote-andel** (`qtSd/…`) combos, hvor flere API nøgler deler én upstream-konto. Tre lag forhindrer en delt konto i at blive oversvømmet.

### Per-forbindelse samtidighedsloft (`max_concurrent`)

Hver udbyderforbindelse kan erklære et `max_concurrent` loft (`provider_connections.max_concurrent`, indstillet i forbindelsesmodal / API / DB). Lad det stå tomt uden begrænsning. Dette er den enkelte knap, der driver serialiseringslaget under — sæt det til kontoens reelle samtidighed (f.eks. GLM ~ 1, MiniMax ~ 2).

### Samtidighedsgrænser pr. model (`modelConcurrency`)

En forbindelse kan desuden erklære nøjagtige per-model samtidighedslofter inde i sit `rateLimitOverrides` kort:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Indstil den i forbindelsesmodal (** Rate limit tilsidesætter → Per-model concurrency caps** , en `model=cap` pr. linje) eller via `PATCH /api/providers/[id]` med samme JSON form. Nøgle semantik:

- **Forbindelsesdækkende vs modelspecifik:** `maxConcurrent` forbliver det delte loft over hele forbindelsen. Når begge gælder, erhverves begge porte atomisk i den samme sammensatte port (`global → provider → account → model`); den effektive adfærd er den strengere gældende grænse.
- **Præcis model-nøgle match:** nøglen er modelstrengen, der sendes til eksekveren efter routingopløsning — normalt det blotte opstrøms model-id (`glm-5`), ikke et `provider/model` alias på klientsiden (`zai/glm-5` matcher ikke `glm-5`). Værdier er positive-heltals samtidige anmodningslofter.
- **Lokal kø, ingen opdagelse:** overskydende anmodninger står i kø lokalt med den eksisterende queue/timeout semantik (indtastede `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` -adgangsfejl). OmniRoute opdager eller udleder ikke upstream-politik — den håndhæver de nøjagtige lofter, som operatøren har konfigureret. En mættet modelport deaktiverer aldrig udbyderen og skaber aldrig en permanent modellockout; opstrøms 429/cooldown/fallback adfærd forbliver fejlens bagstopper.
- **Per-forbindelse, pr-proces omfang:** caps er pr. databaseforbindelse og holdes i hukommelsen, så to forbindelser, der genbruger den samme upstream API nøgle, koordinerer ikke med hinanden.
- **Ukonfigureret betyder uændret:** udeladelse af kortet (eller lade dashboardfeltet stå tomt) tilføjer ingen modelport. Eksempel på konfiguration uden at hævde nogen universel udbydergrænse:

```text
glm-5=1
glm-4.7=3
```

### Serialisering af anmodning om kvotedeling

Når en kvotedelingsudsendelse er målrettet mod en forbindelse, der erklærer en positiv `max_concurrent`, samtidige anmodninger til den** konto** serialiseres gennem en per-forbindelse semafor (nøgle `qsconn:<connectionId>`): overskydende anmodninger** vente i køen** i stedet for at oversvømme kontoen. Det er det** fejl-åbn** — en mættet kø eller timeout fortsætter uden et slot i stedet for nogensinde at afvise en afsendelsesanmodning. Slå ind** Indstillinger → Resilience → Quota-share per-forbindelse samtidighed** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standard slået til). Uden en `max_concurrent` cap er adfærden uændret.

> Quota-share routing gate (`selectQuotaShareTarget`, DRR + P2C) er i sig selv fejlåben og _deprioriterer_ kun en at-cap-forbindelse — med en single-connection pool, den kan ikke hårdt begrænse, så denne semafor er det, der faktisk indeholder oversvømmelsen.

### Genforsøg med combo-afkølingsbevidst

For hver kombinationsstrategi (når den er aktiveret), venter en anmodning, der ville krystallisere en 429 for en SHORT -transient cooldown, den ud og afsendes igen i stedet for at returnere de 429 — Dette dækker Gemini-klassen TPM/RPM vinduer (~ 60s genforsøg efter) på kombinationer med flere modeller, f.eks. rammer begge mål for en model. Afgrænset af `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) i** Indstillinger → Resilience** . Den venter aldrig på `quota_exhausted` (låst indtil midnat) eller auth/not-found årsager.

En combo kan fravælge med `config.comboCooldownWaitEnabled: false`. Kun bogstavelig `false` deaktiverer disse delte kombinationsventer (afkøling efter afsendelse og ventetider før afsendelse af circuit-open/model-lock ) og deres vente-budget timeout-gulvudvidelse. Mangler eller `true` bevarer den globale politik; `true` kan ikke aktivere globalt deaktiveret ventetid. En eksplicit `targetTimeoutMs` vinder stadig. Dette fravalg ændrer ikke den separate native-Codex turn-pin før afsendelse.

Den samme gate dækker sagen før afsendelse (#16319): når hvert mål i en kombination springes over, før der gøres forsøg, fordi dens model sidder i en kort forbigående lockout, venter nul-forsøgsvejen låsningen ude under de samme lofter og sender igen, i stedet for at besvare en `503 ALL_TARGETS_SKIPPED` uden hints. Når ingen ventetid er tilladt (loft, forsøg eller budget opbrugt, eller funktionen er slået fra), opgraderes terminalsvaret til `429 rate_limit_error`, der bærer `retry_after` / `reset_at` fra det tidligste forbigående låseudløb; kvote-, godkendelses- og ikke-fundne låse holder den antydningsfrie 503.

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

## 5. Adgangskontrol for anmodningskø (v3.8.49 · issue #6593)

**Omfang**: den lokale rate-limit-kø pr. udbyder+forbindelse (`open-sse/services/rateLimitManager.ts`, drevet af Bottleneck), ét lag under de tre mekanismer ovenfor.

**`maxWaitMs` afgrænser køens ventetid; `executionMaxWaitMs` afgrænser eksekveringen.**
De to er bevidst adskilte, og ingen af dem forsyner den anden.

`resilienceSettings.requestQueue.maxWaitMs` er **køventetidsbudgettet**: det dækker både at vente på en udbyderplads og derefter at stå QUEUED, og dets timer ryddes i det øjeblik, jobbet forlader QUEUED og begynder at eksekvere (`rateLimitManager.ts`, `wrappedFn`). En anmodning, der overskrider det, når aldrig frem til upstream'en. Standard 30000ms, leveret af `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` i `src/lib/resilience/settings.ts` og fastlåst af `tests/unit/ratelimit-admission-control-6593.test.ts`, så en ændring af den får testen til at blive rød i stedet for at lade dette afsnit forældes stille og roligt.

`resilienceSettings.requestQueue.executionMaxWaitMs` er det, Bottleneck modtager som jobbets `expiration`, hvis timer først starter efter dispatch. Det er et sikkerhedsnet for eksekverere uden deres egen upstream-timeout, og det hæves til eksekvererens egen fetch-start-timeout, når denne er længere, så det ikke kan afbryde et sundt igangværende svar. Standard 600000ms (10 min).

At føre købudgettet ind i `expiration` er det, der tidligere dræbte ikke-inkrementelle gateways midt undervejs — de kører legitimt i minutter, før de første bytes ankommer — og det er grunden til, at en expiration vises som `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), mens købudgettet bærer kø-timeout-koden. Begge kan tilsidesættes via `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (miljøvariabel) eller dashboardet (**Indstillinger → Resilience**). Begge afklemmes til 1ms–24t ved normalisering.

**Forrang, for begge:** miljøvariablen leverer kun _standarden_. En værdi, der er gemt i `resilienceSettings.requestQueue` (dashboard / API-patch, lagret i `key_value`), vinder over den, og en `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` pr. forbindelse vinder over den igen. At sætte miljøvariablen på en deployment, der allerede har en gemt værdi, ændrer derfor intet — ryd eller opdatér i stedet den gemte indstilling.

Opholdet i køen afgrænses af `maxWaitMs`; `maxQueueDepth` nedenfor afgrænser, hvor mange kaldere der må stå i kø samtidig.

**Body-angivne gentagelser: pacing vs. lockout.** En 429-body kan angive sin egen ventetid (Gemini `RetryInfo.retryDelay`, teksten "retry after Ns"), som `updateFromResponseBody` læser. En ventetid, der passer inden for forbindelsens `maxWaitMs`, er pacing: limiteren tømmer sit reservoir i så lang tid, og kald i kø dispatches, når det fyldes op igen. En ventetid længere end `maxWaitMs` kan køen ikke vente ud — Gemini svarer på en opbrugt daglig kvote med `retryDelay: "86399s"`. Den videresendte `Retry-After` på den genopbyggede 429 (#16528) får allerede fallback-motoren til at låse modellen i det tidsvindue, men også at pause limiteren for den ville stadig standse ethvert kald, der når nøglen tidligt (f.eks. efter en resilience-nulstilling), i hele `maxWaitMs`. Når en sådan ventetid kommer fra en typet Google `RetryInfo`-detalje (proveniensen `google_rpc_retry_info`), og nøglens limiter allerede er afgrænset til modellen (se `getLimiterKey`), bliver 429'en i stedet en model-lockout på den forbindelse (`lockModelForLongBodyRetry` i `open-sse/services/rateLimitManager/bodyRetryPause.ts`, begrænset til 24t), og limiteren efterlades upauset. Kontovalget springer over på baggrund af den lås via `isModelLocked()`, og det samme gør combo-gaten før dispatch for mål, der er fastgjort til forbindelsen. På antigravity, hvis limiter er pr. kvotefamilie, gælder låsen den præcise model, ligesom dens øvrige kvotelåse. Navnet, som klienten bad om, låses også, når et alias opløste det til den model, fordi disse tjek bruger det anmodede navn; det låses præcist (`lockExactModel`), så et alias, der krydser en antigravity-kvotefamilie eller et codex-scope, aldrig låser sit eget. Et prose-hint, en utypet `retryDelay` eller en limiter, der deles af hele forbindelsen, bevarer pausen. Når den limiter, som 429-stien lige har genopbygget, rent faktisk pauser, afvises en kalder, hvis resterende køtid slutter, før pausen gør, straks med kø-timeout-koden (`checkLimiterPause`) i stedet for at vente den tid ud; den registrerede slutning forankres, før limiteren bygges, hvor Bottleneck starter sit genopfyldningsur, og enhver senere ændring af reservoiret glemmer den. Dækket af `tests/unit/rate-limit-long-body-retry-lockout.test.ts` og `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opt-in-adgangsgrænse (ny).** `resilienceSettings.requestQueue.maxQueueDepth` afgrænser, hvor mange anmodninger der må stå i kø (endnu ikke dispatched) for én udbyder+forbindelse ad gangen. Når køen allerede rummer `maxQueueDepth` anmodninger, hurtigafvises en ny anmodning med en typet `code: "RATE_LIMIT_QUEUE_FULL"`-fejl **før** den overhovedet når `limiter.schedule()` — så afvisningen er billig og sker forud for alt nedstrøms arbejde med prompt-komprimering / oversættelse for den anmodning. Standard `0` = deaktiveret, hvilket bevarer den eksisterende adfærd med ubegrænset kø; afgrænset 0–100000. Tilsidesæt via `RATE_LIMIT_MAX_QUEUE_DEPTH` (miljøvariabel) eller `resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API-patch).

Selve adgangstjekket er en ren funktion (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), så det kan enhedstestes uden en rigtig Bottleneck-limiter.

> Den RFC, der åbnede #6593, foreslog også et `bypassCompressionOnRateLimit`-flag. Dette repos `open-sse/services/compression/`-pipeline er prompt-/kontekstkomprimering af den udgående LLM-forespørgsel (`chatCore.ts`, omkring blokken `resolveCompressionSettings`/`selectCompressionStrategy`), ikke HTTP-svarskomprimering af syntetiserede 429-bodies — der findes ingen tilsvarende kodevej for et bogstaveligt bypass-flag. Dette promptkomprimeringstrin kører desuden i øjeblikket _før_ `withRateLimit()` i forespørgselspipelinen, så en omrokering for at springe det over ved en afvisning på grund af fuld kø er en separat og større ændring end dette issues omfang; det blev bevidst **ikke** implementeret her og er efterladt som en opfølgning, hvis gevinsten i CPU-besparelse er omroperingsrisikoen værd.

### Sikkerhedsnet for auto-aktivering af rate-limit og forbindelsesbeskyttelse (`rateLimitProtection`)

**Sikkerhedsnet for auto-aktivering** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, standard `true`):
Som standard aktiverer OmniRoute automatisk rate-limit-købeskyttelse for alle aktive API-nøgle-udbyderforbindelser (`getProviderCategory(provider) === "apikey"`). Dette sikrer, at indgående forespørgsler til hastighedsfølsomme upstream-API-nøgler sættes i kø og begrænses gennem Bottleneck i stedet for at eksplodere i upstream-429-fejl. Sikkerhedsnettet kan tilsidesættes via miljøvariablen `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` deaktiverer, `true`/`1`/`on` tvinger til), som har forrang frem for den gemte dashboard-indstilling (**Indstillinger → Robusthed** / `PATCH /api/resilience`).

**Semantik for `rateLimitProtection` pr. forbindelse:**
Rate-limit-beskyttelse pr. forbindelse spores via det boolske felt `rateLimitProtection` på udbyderforbindelser (gemt som `rate_limit_protection` i SQLite):

- **Eksplicit til (`rateLimitProtection === true`)**: Rate-limit-beskyttelse er eksplicit aktiveret for denne forbindelse, uanset udbyderkategori eller om sikkerhedsnettet for auto-aktivering er slået til.
- **Eksplicit fra (`rateLimitProtection === false`)**: Deaktiverer eksplicit beskyttelse, men fravælger **ikke** en aktiv API-nøgleforbindelse fra det globale sikkerhedsnet for auto-aktivering. I `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) er `false` og `undefined` ækvivalente: kun `rateLimitProtection === true` behandles som en eksplicit tilsidesættelse. Hvis `rateLimitProtection` er `false` (eller ikke sat), matcher en aktiv API-nøgleforbindelse stadig betingelsen for auto-aktivering og forbliver rate-limit-beskyttet.
- **Ingen fravalg pr. forbindelse**: En operator kan i øjeblikket ikke udtrykke "denne ene aktive API-nøgleforbindelse skal køre uden rate-limit-købeskyttelse", mens auto-aktivering holdes aktiv for de øvrige. For at køre API-nøgleforbindelser helt uden rate-limit-køer skal sikkerhedsnettet slås fra globalt (`RATE_LIMIT_AUTO_ENABLE=false` eller `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Understøttede skriveveje:**

- **`POST /api/rate-limits`**: Den understøttede skrivevej til administration for at slå `rateLimitProtection` til/fra for en forbindelse (`{ connectionId: string, enabled: boolean }`). Kaldes denne med `enabled: true`, slås eksplicit beskyttelse til; kaldes denne med `enabled: false`, fjernes eksplicit beskyttelse (dog forbliver aktive API-nøgleforbindelser dækket under det globale sikkerhedsnet, hvis auto-aktivering er slået til).
- **`PUT /api/providers/[id]`**: Accepterer eller ændrer bevidst **ikke** `rateLimitProtection` (#11278). Opdatering af metadata for udbyderforbindelser via `PUT /api/providers/[id]` vil aldrig ændre den gemte rate-limit-beskyttelsestilstand.

---

## 6. Slow-stream throughput watchdog (#9709)

Den valgfri `resilienceSettings.streamRecovery.throughputWatchdog` vagt registrerer en upstream, der stadig sender bidder, men som producerer assistent-output under den konfigurerede nyttig-outputhastighed. Den adskiller sig bevidst fra den inaktive timeout: hjerteslag og metadata nulstiller ingen af timerne og tæller ikke som fremskridt. Det adskiller sig også fra den hårde forsøgsfrist (#9153), som forbliver et absolut sikkerhedsloft uanset outputkvalitet.

Vagthunden kræver en opvarmningsperiode efterfulgt af et komplet rullende vindue, før den kan afbryde. Den tæller tekstdeltaer fra chatafslutninger og -svar API -outputhændelser (en konservativ UTF-8 byte-proxy), ignorerer kun brug og tomme hændelser og suspenderer bedømmelse, mens værktøjsopkald eller ræsonnementsbegivenheder er i gang. Den er deaktiveret som standard og kan aktiveres med `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (den env-værdi danner kun standard — a saved `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean wins; se env-vs-dashboard-prioritetsnoten øverst i denne vejledning); vinduet, opvarmning, minimumshastighed og minimum målbart output er afgrænset af normaliseringslaget for spændingsindstilling.

Når det er aktiveret, anvendes en vagthund kun til det aktive opstrømsforsøg. Før nogen klient-synlige bytes, kan den eksisterende samme-konto tidlig gendannelsessti genåbne forsøget. Efter commit afspilles streamen aldrig blindt; kun den eksisterende sikre midstream-fortsættelseskontrakt kan sy et suffiks. Finaliseringen forbliver enkeltstående, så brugsregnskab og semaforfrigivelse duplikeres ikke.

---

## 7. Omformulering af upstream-status (fejlraporterede kvotefejl)

**Omfang:** én upstream-gateway, der rapporterer midlertidig kvoteudtømning med den forkerte HTTP-status.

**Formål:** at korrigere en vildledende status FØR klassificering, så downstream-forbrugere (fallback-motoren, combo-aggregeringen, det klientvendte svar) ser fejlens sande genforsøgbare karakter.

Nogle gateways signalerer MIDLERTIDIG kvoteudtømning med en HTTP-status, der
ikke kan genforsøges. `agentrouter.org` returnerer `403` (nogle gange `400`)
med en kinesisk body (`用户额度不足` / `额度不足`) i stedet for standardstatussen
`429`. Klienter som Claude Code behandler `403` som permanent og afbryder
sessionen, og uden korrektion ville fallback-motoren klassificere den som
`AUTH_ERROR` i stedet for en kvotehændelse.

**Implementering:**

- Registrering + matcher: `open-sse/config/upstreamStatusRestatement.ts` — en
  liste af regler pr. udbyder (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), matchet via `applyStatusRestatement()`.
- Kaldsted: `providerFailure:`-blokken i `open-sse/handlers/chatCore.ts`
  (omkring linje 3654), lige efter at `parseUpstreamError()` har parset et
  upstream-svar med en HTTP-fejlstatus (`!providerResponse.ok`), og før nogen
  klassificering kører, så hver eneste downstream-forbruger ser den
  korrigerede status. Fejl indlejret i en `200` SSE-strøm følger en separat,
  senere strømparsing-sti og er **ikke** dækket af denne hook i dag — en
  kendt begrænsning, der endnu ikke er nødvendig for agentrouters fejlstatus
  (som viser sig som en HTTP-fejlstatus).
- Genforsøgsberettigelse: `429` findes i `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), så en omformuleret
  fejl medfører et reelt genforsøgsvindue i stedet for at dukke op som en
  død `403`.
- Den syntetiske `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  er kun det, som det omformulerede svar fortæller **klienten**; det er ikke
  i sig selv forbindelsens interne cooldown-/lockout-varighed — den styres
  separat af den mekanisme, der faktisk håndterer den omformulerede fejl
  (Connection Cooldowns eskalerende backoff, §2, basis `3s` for
  API-nøgle-udbydere; eller Model Lockout, §3, for udbydere med kvote pr.
  model som agentrouter). Routeren kan blive berettiget til at genforsøge
  internt tidligere end det 60s-vindue, den annoncerer over for klienten —
  bevidst spillerum, ikke en fejl.

Permanente fejl (agentrouters `无权访问模型` — ingen adgang til denne model)
omformuleres ALDRIG: `excludeMarkers` nedlægger veto mod reglen, selv når
`textMarkers` rammer, så fejlen beholder sin oprindelige status, og intet
genforsøger den i det uendelige. Den matchende udbyder-klassificeringsregel
(`agentrouter-model-access-denied` i `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, en erklæret basiscooldown på `6h`)
konsulteres af `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_før_ den generiske `FORBIDDEN`-early-return i apikey-kategorien, gate'et på
`honorsRuleLockScope(provider)` (#10334 — i øjeblikket eksklusivt for
agentrouter via `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-tilladelseslisten i
`providerErrorRules.ts`). Reglens erklærede 6h-cooldown flyder videre som
`fallbackResult.baseCooldownMs`, men den føder stadig den eksisterende
lockout-sti for kvote pr. model (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, uændret af #10334 bortset fra
cooldown-kilden): den nedklemmes til operatørens `mlSettings.maxCooldownMs`
(standard `1_800_000ms` / 30 min), som enhver anden model-lockout, og den
_persistente lockout-årsag_ forbliver den eksisterende hardkodede
`"forbidden"`, ikke reglens `"auth_error"` — kun cooldown-varigheden
honoreres end-to-end, ikke årsagsstrengen. Selve forbindelsen forbliver
aktiv; søskendemodeller på samme forbindelse påvirkes ikke.

Omformulerede kvotefejl (`额度不足`) når frem til en udbyderregel i produktion
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ingen egen erklæret cooldown — persistenslagets skalerede
backoff-standard gælder). Siden #10334 FORBRUGES `scope` på
`ProviderErrorRuleMatch` end-to-end, men **kun** for udbydere på
`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-tilladelseslisten (`providerErrorRules.ts`
— i dag kun `"agentrouter"`, gate'et via `honorsRuleLockScope()`). For enhver
anden udbyder forbliver `scope` informativ, præcis som før #10334.
`checkFallbackError` eksponerer den matchede regels scope som
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) er den fælles guard, der bekræfter, at en
`ruleScope` reelt er sikker at honorere som et forbindelsesdækkende,
selvreparerende signal (scope `"connection"`, årsag `quota_exhausted`, aldrig
`permanent`, aldrig `creditsExhausted` — et forsvar mod en fremtidig regel,
der parrer scope `"connection"` med en permanent kontotilstand). To
forbrugere kalder den:

- **Persistens** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  i stedet for at falde ind i passthrough-udbyderens **per-model** lockout-gren
  (agentrouter har `passthroughModels: true` → `hasPerModelQuota()`
  returnerer `true`), anvender den en **midlertidig forbindelses-afkøling** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, aldrig en terminal status
  (`credits_exhausted`/`banned`/`expired`) — så forbindelsen genopretter sig selv,
  når afkølingsperioden udløber, i stedet for at kræve en manuel
  credential-nulstilling. Springes over for forbindelser med `disableCooling:
true` (#2997): den opt-out falder i stedet igennem til per-model lockout
  (en dokumenteret afvejning — se kodekommentaren ovenover grenen).

- **Samme-anmodnings combo-routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): den samme beskyttelse markerer
  forbindelsen i det in-memory `exhaustedConnections`-sæt, nøglet
  `${provider}:${connectionId}`. Dette springer kun et resterende
  SAMME-ANMODNINGS-mål over, der _selv allerede bærer det præcise
  `connectionId`_ på sit eget målobjekt (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` før `exhaustedConnections`-opslaget) — en almindelig
  model-liste-combo, hvor sideløbende mål ikke har et fastlåst `connectionId`
  i sig selv, og hvor ét først opløses per afsendelse fra svarets
  `X-OmniRoute-Selected-Connection-Id`-header, rammer aldrig den
  nøgleoverensstemmelse. For det almindelige tilfælde er den egentlige
  beskyttelse mod, at et resterende ben genbruger den lige-udtømte konto,
  IKKE dette Set — det er persistenslaget ovenfor (forbindelsens
  `rateLimitedUntil` ligger nu i fremtiden) kombineret med, at den samme
  beskyttelse undertrykker `transientRateLimitedProviders` for fejlen (se
  "To-trins design" og kodekommentaren på `isAgentrouterConnectionQuotaScope`-grenen
  i `targetExhaustion.ts`): når det Set efterlades umarkeret, træder
  `combo.ts`'s `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) IKKE i kraft for
  udbyderens resterende ben, så `credential`-valgets `rateLimitedUntil`-filter
  (`src/sse/services/auth.ts:1238`) respekteres normalt, og et resterende ben
  enten vælger en anden, stadig kvalificeret agentrouter-forbindelse eller
  fejler med ingen tilgængelige credentials — det tvinger sig ikke tilbage på
  den forbindelse, som denne gren lige har kølet ned.

### To-trins design: status-omskrivning, derefter klassificering

Status-omskrivning (`upstreamStatusRestatement.ts`) og
udbyder-klassifikationsregler (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) er separate registre, som begge nøgler på udbyder-id
og tekstmarkører, men de kører forskellige steder og tjener forskellige
formål: omskrivningen omskriver HTTP-statussen tidligt i `chatCore.ts`;
klassifikationsreglerne vælger fallback-`reason` og låser `scope`
(`model` / `provider` / `connection`) inde i `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klassifikationsreglerne ser kun fuld fejl**tekst** (nødvendigt for at matche
body-markører som `额度不足`) for udbydere, der er opført på allowlisten
`FULL_TEXT_RULE_PROVIDERS` i `providerErrorRules.ts` — i øjeblikket kun
`"agentrouter"`. For enhver anden **indbygget katalog**-udbyder giver
`checkFallbackError` kun `getProviderErrorRuleMatch` den strukturerede fejl
(`{code, type}`), hvilket er nok til header-/status-/kodebaserede regler, men
blindt over for body-tekstmarkører. Hjælpefunktionen `resolveRuleMatchBody()`
foretager denne udvælgelse: fuld fejltekst for allowlisted udbydere, den
strukturerede fejl ellers. At tilføje en **indbygget** udbyder til
`FULL_TEXT_RULE_PROVIDERS` er et eksplicit per-udbyder opt-in — den findes,
så standardstien for enhver udbyder, der ikke er på listen, forbliver
byte-for-byte uændret.

En regels `scope` (`model` / `provider` / `connection`) er en separat opt-in
fra `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` bringer den kun til
overfladen som `fallbackResult.ruleScope`, og downstream-forbrugere respekterer
den kun som andet end en informativ etiket for udbydere på allowlisten
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samme fil (styret via
`honorsRuleLockScope()` — i dag kun `"agentrouter"`). Se "Omskrevne
kvota-fejl" ovenfor for, hvad et `scope: "connection"`-match reelt gør, når en
udbyder er på den allowlist.

**#11104 — operatør-erklærede regler omgår begge allowlister.** En operatør
kan erklære en per-udbyder-regel på køretidspunktet via
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) uden
at redigere denne fil. At lade en operatørregel være betinget af
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlister
beregnet til at beskytte **standard**adfærden for indbyggede katalogregler —
ville gøre indstillingsmekanismen inert for enhver udbyder undtagen dem, der
allerede er opført der, da erklæringen af reglen allerede er operatørens
eksplicitte opt-in. `resolveRuleMatchBody()` og `honorsRuleLockScope()` tjekker
begge `hasOperatorRuleForProvider()` først: en udbyder med en operatørregel
får den rå fejltekst og får sit erklærede `scope` respekteret, uanset om
vedkommende også er opført i den ene eller anden allowlist.

**Kendt hul — `providerRuleRegistry` konsulteres aldrig for HTTP 400.**
`checkFallbackError`'s `BAD_REQUEST`-gren klassificerer status 400 udelukkende
gennem sine egne mønsterarrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, osv. i `accountFallback.ts`) og returnerer, før
grenen `configuredRule`/`getProviderErrorRuleMatch` ovenover den nås. En
indbygget katalogregel (eller en operatørregel) med `status: 400` er
syntaktisk gyldig, men vil aldrig aktiveres. Ingen eksisterende regel sigter
mod 400 i dag, så intet i produktion berøres — men en fremtidig 400-regel skal
have denne gren ændret først, hvilket er en større ændring end at tilføje en
regel (den reklassificerer 400 for enhver udbyder, der allerede er afhængig af
mønsterarray-adfærden), og ligger uden for omfanget af en
enkelt-udbyder-regeltilføjelse.

### Tilføjelse af en ny gateway med fejlagtig kvoteangivelse

1. Registrér ét regelarray i `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Hold `textMarkers`
   udbyderspecifikke; genbrug aldrig generiske engelske fraser, der kolliderer med
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Registrér eventuelt klassifikationsregler i
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) for at vælge
   det rigtige låseomfang (`connection` for kontodækkende kvote, `model` for
   fejl pr. model). Dette trin får kun effekt i produktion for udbydere, hvis
   regler har brug for hele fejlteksten (body-markører): tilføj udbyder-id'et til
   `FULL_TEXT_RULE_PROVIDERS` i samme fil — ellers giver `checkFallbackError`
   altid kun reglen den strukturerede `{code, type}`-fejl, og en
   body-tekstregel vil aldrig matche live-trafik. Regler, der udelukkende
   matcher på `status`/`headers` (som Opencodes eller Minimaxs), har ikke brug
   for denne opt-in. Hvis reglen derudover erklærer `scope: "connection"`, og
   hensigten er en faktisk forbindelsesdækkende nedkøling plus at springe
   comboen over i samme request (ikke blot en informativ etiket), så tilføj
   udbyder-id'et til `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samme fil — det er
   dette, der styrer forbrug i stil med `isAgentrouterConnectionQuotaScope()` i
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) og
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); uden det flyder `scope`
   stadig gennem `fallbackResult.ruleScope`, men intet handler på det.
3. Tilføj enhedstests, der spejler `tests/unit/upstream-status-restatement.test.ts`
   og `tests/unit/agentrouter-error-rules.test.ts` (inklusive vagterne for
   ikke-permanent / ikke-creditsExhausted, og — hvis udbyderen har brug for
   tilladelseslisten — en test, der verificerer, at `resolveRuleMatchBody()`
   kun returnerer hele teksten for den pågældende udbyder).

Ingen ændringer i `chatCore.ts`, `classifyError` eller combo er nødvendige.

#### Egress-bucket-baseret lås (#10880)

Udbydere i `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode-familien) behandles som
IP-bucket-baseret upstream (opencodes gratisniveau er IP-bucket-baseret, ikke
konto-bucket-baseret — se #9611): en status-429, der er klassificeret som
`quota_exhausted` **eller** `rate_limit_exceeded`, nedkøler enhver forbindelse
i familien på tilladelseslisten, hvis sidst kendte egress-IP matcher den
fejlende forbindelses, før rotationen når at prøve dem
— hvilket undgår N-1 garanteret fejlende upstream-kald (samme mønster som #10460/#10525).
`rate_limit_exceeded` er inkluderet bevidst: på `markAccountUnavailable`-stien
matcher de opencode-specifikke regler aldrig (ingen headers/body gives til
`checkFallbackError`, opencode er ikke i `FULL_TEXT_RULE_PROVIDERS`), så en 429,
hvis body bærer abonnementskvoteteksten ("monthly usage limit
reached"), klassificeres som `quota_exhausted` af kvotetekst-fallbacken
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 times nedkøling), før
`status_429`-reglen overhovedet nås — mens en 429 uden kvotetekst (ren
rate limiting) klassificeres via `status_429`-reglen som `rate_limit_exceeded`
og stadig nedkøler IP-familien. For en udbyder på tilladelseslisten er en
IP-bucket-baseret ratebegrænsning det samme signal som en opbrugt kvote. Ærlige
begrænsninger:

- **Best-effort**: låsen slår forbindelsens sidst kendte `egress_ip` op
  fra `proxy_logs` (24-timers vindue, synkront, ingen cache). Kold cache
  (egress-IP aldrig sonderet) eller ingen række → den fejlende forbindelse
  nedkøles stadig af grenen (registreret som i dag); der låses blot ingen
  søskendeforbindelse.
- **Aldrig terminal**: nedkølingen er et fornyende kvotevindue
  (`testStatus: "unavailable"`); en permanent tilstand udledes aldrig af et
  signal på IP-niveau. `disableCooling`-forbindelser springer grenen helt
  over.
- **Låsegranulariteten ændres for den allowlistede familie**: dette er en
  scope-ændring, ikke kun en søskendeoptimering. opencode er en
  `passthroughModels`-udbyder, så før denne gren gav en 429 en
  pr.-MODEL-udelukkelse; nu giver den en forbindelsesnedkøling — også for en
  operatør, der kører en enkelt forbindelse helt uden nogen
  søskendeforbindelse. Det er den granularitet, som opencodes regeltabel
  allerede erklærer korrekt (`scope: "connection"`,
  `providerErrorRules.ts`), men som aldrig er blevet overholdt hidtil, fordi
  opencode ikke er i `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grenen skriver selv
  den fejlende forbindelses nedkøling + `backoffLevel`, i lighed med den
  forbindelses-scopede agentrouter-gren, og returnerer —
  pr.-model-blokeringen og den generiske sti nedenfor nås aldrig.
- **Combo inkluderet**: ligesom agentrouter-grenen ignorerer scopet bevidst
  den nedgradering via `persistUnavailableState`/`isCombo`, som en
  combo-kalder anvender på en 429. En pr.-model-udelukkelse er ikke en
  svagere form af dette scope, den er den forkerte enhed: den siger intet om
  den udtømte IP, så combo-rotationen ville blive ved med at brænde ét
  garanteret mislykket kald pr. søskendeforbindelse.
- **Sikkerhed for søskendeforbindelser**: en søskendeforbindelse, der
  allerede er terminal (banned/credits_exhausted) eller allerede befinder
  sig i en længere nedkøling, overskrives aldrig.
- **Eksklusiv allowlist**: at udvide `EGRESS_BUCKETED_LOCK_PROVIDERS` er en
  eksplicit ejerbeslutning; ingen generisk wiring (pattern #10334/#10419).
  Søskendeforespørgslen binder samme allowlist i stedet for at gentage den
  som en SQL-literal, så en udvidelse forbliver en ændring på én linje.
- **Egress-IP-rotation, begge retninger**: opslagsvinduet (24 timer) er
  langt bredere end egress-IP-cache-TTL'en (5 min), så "sidst kendte IP" er
  historik, ikke aktuel tilstand. Hvis en forbindelses proxy roterede inden
  for vinduet, kan låsen **overse** en reelt delt IP (den registrerede IP er
  den nye, ikke-udtømte) — og symmetrisk kan den **nedkøle en
  søskendeforbindelse, der siden er roteret væk** fra den udtømte IP. Det
  andet tilfælde koster den pågældende søskendeforbindelse ét
  nedkølingsvindue; begge dele er accepterede best-effort-begrænsninger ved
  et historikbaseret opslag.
- **Omkostning**: to afgrænsede scanninger af `proxy_logs`
  (vinduesfiltreret via `idx_pl_timestamp`), kun ved 429-frekvens. Intet nyt
  indeks (migrering 134 YAGNI). Målt på en databasekopi med reel trafik af
  moderat størrelse; en instans med høj gennemstrømning har forholdsmæssigt
  flere rækker i samme vindue.

---

## Andre robusthedsfunktioner

- **20 routingstrategier** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — se [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-bevidst routing** (v3.8.0) — prioriterer forbindelser efter tidspunktet for kvote-nulstilling.
- **Degradering af baggrundstilstand** — Responses API `background: true` degraderes til synkron med advarsel.
- **Dynamisk registrering af værktøjsgrænser** — sætter udbydere i backoff, når grænsen for antal værktøjer nås.
- **Nød-fallback** — styres af `OMNIROUTE_EMERGENCY_FALLBACK`; operatører kan tilsidesætte den fra siden Feature Flags uden genstart.

---

## Fejlsøgning

- Weighted combo svarer `503 all_targets_cooling_down` (`Retry-After` sat, `diagnostics.excluded` viser hvert mål med `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → puljen er konfigureret og forbundet, hvert mål er blot udelukket af en robustheds-timer; advarslen `[COMBO] Weighted selection: every target excluded before dispatch — …` angiver årsagerne og de resterende sekunder. En `404 no_executable_targets` fra samme combo betyder, at ingen robustheds-timer var involveret (intet at køre, eller alle konti dumpede tilgængelighedstesten). Implementeret i `open-sse/services/combo/pinRecovery.ts` ud fra udelukkelserne indsamlet i `targetResolution.ts`.
- Alle nøgler for en udbyder sprunget over → kontrollér både circuit breaker-tilstand OG hver forbindelses `rateLimitedUntil`/`testStatus`.
- Udbyder permanent udelukket efter reset-vinduet → kode læser rå `state` i stedet for `getStatus()`/`canExecute()`.
- Én nøgle fejler, de øvrige burde virke → foretræk connection cooldown frem for circuit breaker.
- Kun én model fejler → foretræk model lockout frem for connection cooldown.
- Tilstand burde genoprette sig selv, men gør det ikke → tjek for fremtidigt tidsstempel + en læsesti, der opfrisker udløbet tilstand. Permanente statusser kræver manuelle ændringer.

---

## Kørselstidstilstand — hurtig reference til agenter

> Flyttet ordret fra `AGENTS.md` → "Resilience Runtime State" (PR #12743), så agent-
> guiden forbliver under kontekstbudgettet på 40k. Det er den komprimerede, agentvendte
> visning af afsnittene ovenfor; de nummererede afsnit forbliver den fulde reference.

OmniRoute har tre relaterede, men forskellige mekanismer til midlertidige fejl. Hold
deres anvendelsesområde adskilt, når du fejlsøger routing-adfærd. Se
[3-lags robusthedsdiagrammet](../diagrams/exported/resilience-3layers.svg)
(kilde: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
for et hurtigt overblik.

### Circuit breaker for udbyder

**Omfang**: hele udbyderen, f.eks. `glm`, `openai`, `anthropic`.

**Formål**: stoppe med at sende trafik til en udbyder, der gentagne gange fejler på
upstream-/serviceniveau, så én usund udbyder ikke bremser hver eneste forespørgsel.

**Implementering**:

- Kerneklasse: `src/shared/utils/circuitBreaker.ts`
- Tilkobling af chat-gate/eksekvering: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API til kørselstidsstatus: `src/app/api/monitoring/health/route.ts`
- Delte wrappers: `open-sse/services/accountFallback.ts`
- Tabel med persisteret tilstand: `domain_circuit_breakers`

**Tilstande** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normal trafik er tilladt.
- `DEGRADED`: tidlig advarselszone — fejl har krydset degraderingstærsklen, men endnu
  ikke breaker-tærsklen; trafikken flyder stadig, dashboards viser advarslen. En gyldig
  forbindelsestest eller et roligt vindue uden nye fejl returnerer den til `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` beskriver vinduet).
- `OPEN`: udbyderen er midlertidigt blokeret; kaldere får et provider-circuit-open-svar,
  eller combo-routing springer videre til et andet mål.
- `HALF_OPEN`: reset-timeout er udløbet; tillad en test-forespørgsel. Succes lukker
  breaker'en, fejl åbner den igen.

**Standardværdier** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, anvendt via
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` i `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` i `src/sse/handlers/chatHelpers.ts`). Breaker'en for hele
udbyderen kører på `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil    | degraderes ved | åbner ved (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| --------- | -------------: | ------------------------------------: | ----------------------------: |
| OAuth     |            `5` |                                   `8` |                         `60s` |
| API-nøgle |            `7` |                                  `12` |                         `30s` |
| Lokal     |       (afledt) |                                   `2` |                         `15s` |

`PROVIDER_PROFILES` definerer også `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) og `providerCooldownMs` (5/10/1 min): disse driver
**vindues-gaten for den tilvalgte globale Provider Cooldown** (`PROVIDER_COOLDOWN_ENABLED`,
slået fra som standard) — en post på udbyderniveau i `open-sse/services/providerCooldownTracker.ts`
tæller først som nedkølende efter `providerFailureThreshold` fejl inden for
`providerFailureWindowMs`, og køler derefter ned i `providerCooldownMs`. De er IKKE den aktive
breakers tærskler — justér dem ikke i forventning om breaker-adfærd. Hver standardværdi kan
tilsidesættes via miljøvariablerne `OMNIROUTE_PROVIDER_BREAKER_*` og
`OMNIROUTE_CIRCUIT_BREAKER_*`; den kørselstidskorrekte referencetabel findes i
`docs/architecture/RESILIENCE_GUIDE.md`.

Kun fejlstatusser på udbyderniveau bør udløse udbyder-breakeren:

```ts
(408, 500, 502, 503, 504);
```

Udløs ikke breaker'en for hele udbyderen ved normale konto-/nøgle-/modelfejl som de fleste
`401`-, `403`- eller `429`-tilfælde. De hører normalt hjemme under connection cooldown eller
model lockout. En generisk API-nøgle-udbyders `403` bør kunne genoprettes, medmindre den
klassificeres som en terminal udbyder-/kontofejl.

Breakeren anvender lazy-genoprettelse i stedet for en baggrundstimer. Når `OPEN`
udløber, opfrisker læsninger som `getStatus()`, `canExecute()` og `getRetryAfterMs()`
tilstanden til `HALF_OPEN`, så dashboards og combo-kandidatbyggere ikke bliver ved med
at udelukke en udløbet provider for evigt.

### Forbindelses-cooldown

**Omfang**: én provider-forbindelse/konto/nøgle.

**Formål**: midlertidigt springe én dårlig nøgle/konto over, mens andre forbindelser for
den samme provider fortsat kan betjene forespørgsler.

**Implementering**:

- Skrive-/opdateringssti: `src/sse/services/auth.ts::markAccountUnavailable()`
- Kontoudvælgelse/filtrering: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown-beregning: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Indstillinger: `src/lib/resilience/settings.ts`

Vigtige felter på provider-forbindelser:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Under kontoudvælgelse springes en forbindelse over, mens:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowns er også lazy: Når `rateLimitedUntil` ligger i fortiden, bliver forbindelsen
kvalificeret igen. Ved vellykket brug rydder `clearAccountError()` `testStatus`,
`rateLimitedUntil`, fejlfelterne og `backoffLevel`.

Standardadfærd for forbindelses-cooldown:

- OAuth-basis-cooldown: `5s`.
- API-nøgle-basis-cooldown: `3s`.
- API-nøgle-`429` bør foretrække retry-tips fra upstream (`Retry-After`, reset-headers
  eller parserbar reset-tekst), når de er tilgængelige.
- Gentagne genoprettelige fejl bruger eksponentiel backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd-beskyttelsen forhindrer, at samtidige fejl på den samme forbindelse
gentagne gange forlænger cooldown'en eller dobbelt-inkrementerer `backoffLevel`.

Terminale tilstande er ikke cooldowns. `banned`, `expired` (som først bliver terminal
efter N afgrænsede genforsøg via `EXPIRED_RETRY_MAX`) og `credits_exhausted` er beregnet
til at forblive utilgængelige, indtil legitimationsoplysninger/indstillinger ændres,
eller en operatør nulstiller dem. Overskriv ikke terminale tilstande med forbigående
cooldown-tilstand.

### Model-lockout

**Omfang**: provider + forbindelse + model.

**Formål**: undgå at deaktivere en hel forbindelse, når kun én model er utilgængelig
eller kvotebegrænset for den pågældende forbindelse.

Eksempler:

- Providere med kvote pr. model, der returnerer `429`.
- Lokale providere, der returnerer `404` for én manglende model.
- Providerspecifikke tilladelsesfejl for tilstand/model, f.eks. udvalgte Grok-tilstande.

Model-lockout findes i `open-sse/services/accountFallback.ts` og lader den samme
forbindelse fortsætte med at betjene andre modeller.

### Fejlfindingsvejledning

- Hvis alle nøgler for en provider springes over, skal du undersøge både
  provider-breakerens tilstand og hver forbindelses `rateLimitedUntil`/`testStatus`.
- Hvis en provider ser ud til at være permanent udelukket efter nulstillingsvinduet,
  skal du kontrollere, om koden læser den rå `state` i stedet for at bruge
  `getStatus()`/`canExecute()`.
- Hvis én provider-nøgle fejler, men andre burde virke, skal du foretrække
  forbindelses-cooldown frem for provider-breaker.
- Hvis kun én model fejler, skal du foretrække model-lockout frem for
  forbindelses-cooldown.
- Hvis en tilstand skal kunne genoprette sig selv, bør den have et fremtidigt
  tidsstempel/en nulstillings-timeout og en læsesti, der opfrisker udløbet tilstand.
  Permanente statusser kræver manuelle ændringer af legitimationsoplysninger eller
  konfiguration.

---

## TLS-fingeraftryk og stealth

Udbyderspecifik stealth (JA3/JA4, CCH, obfuskering) er dokumenteret separat — se `docs/security/STEALTH_GUIDE.md` (git; ikke kompileret ind i `/docs`).

---

## Resiliensstest (Fase 8 · Blok C)

Ud over enhedstests for resilienslogik tester tre tests runtime under reelle stress-/fejlforhold (alle integration/nightly — ingen blokerer PR'er):

| Test       | Hvad                                                                                                                                                                                          | Kør                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos      | Falsk upstream-node injicerer reel latenstid/reset/timeout/503; validerer, at circuit breakeren åbner/gendannes, og at `checkFallbackError` klassificerer 503 som et genopretteligt fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-vækst | ~500 streams pr. `createSSEStream` under `--expose-gc`; fejler, hvis heapen vokser ud over loftet (OOM-værn #3069).                                                                           | `npm run test:heap`                      |
| k6-soak    | Vedvarende belastning mod `/api/monitoring/health`; p95-/fejlgrænser.                                                                                                                         | `k6 run tests/load/k6-soak.js` (nightly) |

Orkestreret af `.github/workflows/nightly-resilience.yml` (cron + dispatch). I standardkørslen `test:integration` springer chaos og heap sig selv over (uden `RUN_CHAOS_INT`/`--expose-gc`).

---

## Se også

- [Arkitekturvejledning](./ARCHITECTURE.md) — Systemarkitektur og internals
- [Brugervejledning](../guides/USER_GUIDE.md) — Udbydere, kombinationer, CLI-integration
- [Auto-Combo-motor](../routing/AUTO-COMBO.md) — 16-faktor-scoring, mode-pakker
