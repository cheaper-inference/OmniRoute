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

## 2. Forbindelsesafkøling

**Omfang:** enkelt udbyderforbindelse/-konto/-nøgle.

**Formål:** springe én ugyldig nøgle over, mens andre forbindelser for samme udbyder fortsat leverer.

**Implementering:**

- Markér som utilgængelig: `src/sse/services/auth.ts::markAccountUnavailable()`
- Valg: `getProviderCredentials*` i samme fil
- Beregning af afkøling: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Indstillinger: `src/lib/resilience/settings.ts`

**Felter pr. forbindelse:**

- `rateLimitedUntil` — tidsstempel for, hvornår afkølingen udløber
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponentiel backoff-tæller

**Standardafkølinger:**

- OAuth-basistid: 5s
- API-nøgle-basistid: 3s
- API-nøgle-429: foretrækker upstream `Retry-After`-/reset-headere/fortolkbar reset-tekst
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Forsinkelse pr. udbyder ved nyt forsøg.** Udbyderdetaljesiden har en **Forsinkelse ved nyt forsøg**-vælger (Automatisk,
15s op til 1h). Den gemmer `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600 via `PATCH /api/resilience`). Når en ratebegrænsningsfejl ikke indeholder et upstream-tip om nyt forsøg,
erstatter denne værdi den skalerede backoff for udbyderen og nulstiller `backoffLevel` til 0
(`open-sse/services/rotationConfig.ts::overrideFor`). Prioritet for en ratebegrænset fejl, højest først: upstream-tip om nyt forsøg, derefter `providerSpecificData.rotationOverrides.rateLimitResetSeconds` pr. forbindelse,
derefter forsinkelsen pr. udbyder ved nyt forsøg, derefter
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` fra miljøet, derefter
den skalerede backoff. Automatisk fjerner feltet. Det påvirker kun årsagen ratebegrænsning, aldrig terminaltilstande.

**Beskyttelse mod flokdannelse:** forhindrer samtidige fejl i at forlænge afkølingen for meget eller øge `backoffLevel` dobbelt.

**429-fejl på grund af samtidighedsbegrænsning øger ikke backoff-trinnet.** En `429`, hvis brødtekst rapporterer en
samtidighedsbegrænsning ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`), betyder, at kontoen er sund, men optaget.
`checkFallbackError()` returnerer årsagen `concurrency_limited`: skift til den næste
forbindelse med det samme, afkøl denne i en fast `CONCURRENCY_LIMIT_COOLDOWN_MS`
(1s) eller efter upstream-tippet om nyt forsøg, behold `backoffLevel` uændret, og angiv
`skipProviderBreaker`. En eksplicit kvotetekst vinder stadig, så en brødtekst, der også matcher et kvotemønster, forbliver en kvoteafgørelse. Detektering: `looksLikeConcurrencyLimit()` i `src/shared/utils/classify429.ts`;
afgørelse: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (breakerens
`FailureKind`) er uændret og læser stadig `rate_limit` for disse brødtekster.

**Standsninger i streamindhold afkøler ikke kontoen.** Når overvågningen af indholdsstandsning
(`open-sse/utils/streamHandler.ts`) opgiver en stream, der ikke har sendt modeloutput inden for den
tilladte tid, registrerer `markAccountUnavailable()` fejlen på forbindelsen, men angiver ingen
afkøling: standsningen hører til den pågældende forespørgsel, oftest en lang ræsonneringsrunde uden
output endnu. Operatører kan aktivere funktionen igen med `resilienceSettings.streamStallCooldown.enabled`
(standard `false`).

**Valgfrit latenstidsignal til valg af `p2c`-konto.** Hvert afsendt forsøg registrerer sin tid til første byte
og sit resultat pr. forbindelse (og pr. forbindelse + model) i et rullende vindue i hukommelsen: de seneste 20
målinger inden for 15 minutter
(`open-sse/services/connectionLatencyTracker.ts`, registreret fra
`safeLogEvents()` i `src/sse/handlers/chatHelpers.ts`). Når `resilienceSettings.p2cLatency.weight` er større end
`0` (interval 0-20, standard `0` = deaktiveret), tilføjer `compareP2CConnections()` i `src/sse/services/auth.ts`
op til `weight` point til hver kandidat i parret. Halvdelen kommer fra latenstid som et forhold til
den hurtigere kandidat (dobbelt så langsom giver hele halvdelen), og halvdelen fra den rullende fejlrate.
Leddet anvendes kun, når begge kandidater har mindst 3 målinger, så nye konti ikke straffes, og
dets loft forbliver under straffene for blokeret og opbrugt kvote. Det tilføjer ikke noget eget kredsløb:
fejlende konti håndteres stadig af lagene for afkøling, låsning og breaker. Indstil det med
`PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Ræsonneringsrammer genstarter budgettet for indholdsstandsning.** En ræsonneringsmodel kan tænke i
minutter før sit første synlige token: Claude streamer `thinking_delta`-rammer, hvis
tænkningstekst kan være tom, og Responses API streamer ét ræsonneringselement efter et andet.
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) genkender disse rammer, og overvågningen
genstarter sit budget ved hver af dem i stedet for at annullere runden. De er stadig ikke modeloutput,
så en runde, der kun slutter med ræsonnering, rapporteres stadig som tom, og en runde, der stopper
ræsonneringen og kun sender hjerteslag, udløser stadig overvågningen.

Kiros binære `reasoningContentEvent`-rammer med en ikke-tom signatur bevarer denne
ræsonneringsaktivitet gennem eksekveringen som en tom `reasoning_content`-delta. Signaturen
videresendes ikke. Metadata, ufuldstændige rammer og tomme signaturer genstarter ikke
indholdsbudgettet; den uafhængige timeout for aktive streams og klientannullering gælder stadig
(`open-sse/executors/kiro/reasoning.ts`).

**Terminaltilstande (IKKE afkølinger):**

- `banned` — angives af detektering af forbudte nøgleord / kontoforbud (se [BAN_DETECTION](../security/BAN_DETECTION.md)). Upstream-afvisninger pr. forespørgsel (`request_rejected`, f.eks. Anthropic OAuth 403 "Request not allowed") angiver det aldrig: de tælles pr. forbindelse og model og fjerner den pågældende model fra rotation med en voksende afkøling, der er begrænset til `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), eller afkøler forbindelsen, når ingen model er kendt — `open-sse/services/requestRejectedStreak.ts`
- `expired` (overgår til terminal efter et begrænset antal forsøg — `EXPIRED_RETRY_MAX = 3` med eksponentiel backoff — så midlertidige OAuth-fejl kan løse sig selv, før kontoen deaktiveres permanent)
- `credits_exhausted`

Disse varer, indtil legitimationsoplysningerne ændres, eller en operatør nulstiller dem. Overskriv ikke terminaltilstande med midlertidig nedkølingstilstand.

**Doven gendannelse:** Når `rateLimitedUntil` er udløbet, bliver forbindelsen kvalificeret igen. Ved vellykket brug rydder `clearAccountError()` alle fejlfelter.

### Claude OAuth-forbrugsgrænse: bane med lavere prioritet + nulstilling af sessionsgrænse

**Omfang:** én Claude-abonnementsforbindelse (OAuth). Begge funktioner er **valgfri pr.
forbindelse** (Rediger forbindelse → Claude-sektion → `lowPriorityMode` / `autoLimitReset` i
`providerSpecificData`, begge deaktiveret som standard) og afspejler Claude Codes kommandoer `/low-priority` og `/limit-reset` (wire-kontrakten er fastlagt ud fra Claude Code 2.1.263).

**Implementering:**

- Tilstandsmaskine + klassificering af svar: `open-sse/services/claudeLowPriority.ts`
- Klient til nulstillingsstatus/-krav: `open-sse/services/claudeLimitReset.ts`
- Executor-hook (indsættelse af header + genforsøg for samme konto): `open-sse/executors/base.ts::execute()`
- Vedvarende lagring af tilvalg: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Udløser:** forbrugsgrænsen på 5 timer — en `429`, hvis headers indeholder
`anthropic-ratelimit-unified-status: rejected` og, når kontoen er kvalificeret,
`anthropic-ratelimit-unified-slow-offer: treatment`. Der sendes intet før den første
429 ved grænsen; en burst-429 uden unified-headers følger den normale nedkølingssti.

**Bane med lavere prioritet** (`lowPriorityMode`):

- Ved 429 ved grænsen accepterer executor tilbuddet og forsøger straks igen med den **samme**
  konto med `anthropic-usage-limit: slow`; banen forbliver aktiv indtil den annoncerede
  `anthropic-ratelimit-unified-reset` (+60 sekunders nådetid), og alle forespørgsler i dette
  tidsrum medfører headeren. Den opfangede 429 når aldrig `handleChatCore`, så forbindelsen
  sættes **ikke** i nedkøling og roteres ikke væk.
- `anthropic-ratelimit-unified-slow-status` i senere svar: `active` / `not_needed`
  holder banen aktiv; `slot_busy` (429) eller en `529` venter på serverens
  `anthropic-ratelimit-unified-slow-retry-after` (standard 20 sekunder, begrænsning 5–600 sekunder, ±30 % tilfældig variation)
  og forsøger igen, begrænset af `anthropic-ratelimit-unified-slow-max-wait` (standard 20 minutter, begrænsning
  1 minut–6 timer) — derefter afsluttes banen, og en nedkøling på 10 minutter blokerer for
  ny accept. Ventetiden begrænses desuden af den resterende tid for forespørgslens egen upstream-start-timeout
  (`resolveFetchStartTimeout`, 10 minutter som standard) minus en margin på 5 sekunder: uden denne begrænsning ville
  standardværdien på 20 minutter for max-wait overskride forespørgslen, og ventningen ville blive afbrudt midtvejs,
  hvilket ville vise en `TimeoutError` i stedet for en kontrolleret `max_wait`-afslutning + nedkøling.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, et skift i 5-timersvinduet eller
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (som afslutter den som
  `extra_usage` ved enhver status, eftersom betalt merforbrug nu dækker grænsen) afslutter banen;
  svaret fortsætter derefter til den normale nedkølingssti. `budget_exhausted` huskes indtil den
  annoncerede budgetnulstilling (højst 8 dage).
- Grænsekontrollen køres efter executorens egne 400-drevne genforsøg inden for forsøget
  (kontekstredigering, begrænsninger for tænkning/indsats, automatisk indlæring af parametre), så en 429 ved
  grænsen, der først opstår ved et af disse genforsøg, stadig opfanges i stedet for at nå nedkølingsstien.
- Tilstanden ligger i hukommelsen pr. forbindelse (en genstart koster én ekstra 429 ved grænsen for at acceptere igen).

**Nulstilling af sessionsgrænse** (`autoLimitReset`, forsøges før banen, når begge er aktiveret):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blokken `juniper_tide`;
  når `arm: "reset"` og `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` med
  `{ "program": "juniper_tide" }` (organisations-UUID fra `providerSpecificData.organizationUUID`, med
  bootstrap som fallback).
- `result: reset|not_limited` → forespørgslen forsøges igen ved fuld hastighed (uden slow-header).
  `already_used` / `not_offered` gemmer `next_available_at` i hukommelsen (standard én uge); enhver
  fejl medfører en tilbageholdelsesperiode på 15 minutter. Nulstillingen kan foretages én gang om ugen og
  tæller stadig med i den ugentlige grænse.

Regressionssikringer: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Anvend automatisk bankede nulstillinger

**Omfang:** Codex og Claude -abonnementsforbindelser (OAuth).**Tilmeld dig** : `bankedResetAutoApply` indstillingen er slået fra og i `dry-run` tilstand som standard (Indstillinger → AI → Anvend automatisk banknulstilling).

**Formål:** bruge bankede nulstillinger på egen hånd, når en konto rammer en brugsvæg, i stedet for at vente på, at en operatør trykker på "Indløs" på siden Udbydergrænser.

| Kredittype (`creditTypes`) | Hvad er forløst                                   | Hvor den kører                                                    |
| -------------------------- | ------------------------------------------------- | ----------------------------------------------------------------- |
| `codexCredits`             | Codex nulstil kreditter                           | baggrundsjob, hver 60. s                                          |
| `claudeCredits`            | Claude -banktilskud (`GRANT` -kreditter)          | baggrundsjob, hver 60. s                                          |
| `claudeSessionReset`       | Claude ugentlig session-grænse nulstilling (over) | anmodningssti via den samme politik som til/fra-knappen pr. konto |

**Implementering:**

- Ren beslutning (én regelsæt for begge veje): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Baggrundsjob: `src/lib/services/bankedResetAutoApply.ts` (startet i `src/instrumentation-node.ts`)
- Claude request-path gate: `src/lib/usage/claudeSessionResetPolicy.ts`, registreret gennem `setClaudeLimitResetPolicy()` i `open-sse/services/claudeLimitReset.ts`
- Historie, caps og webhook: `src/lib/usage/bankedResetAudit.ts`
- Historie API: `GET /api/settings/banked-reset-auto/history?limit=50` (administrationsgodkendelse)

**Beslutningsrækkefølge** (den første fejlregel er den registrerede årsag):

1. Funktion fra, kredittype fra eller konto uden for rækkevidde (`accountScope` `all` / `selected` plus `connections` -kortet pr. konto).
2. Uden for den valgfrie UTC tidsplan (`startHourUtc` > `endHourUtc` krydser midnat).
3. Caps over de sidste 24 timer: `maxPerAccountPerDay` (1), `maxPerDay` (3) og `minSpacingMinutes` (30) mellem to vilkårlige indløsninger.
4. Udløser: et vægbelagt `session` eller `weekly` vindue (læst fra `getQuotaWindowStatus().reachedThreshold`, ikke `isAccountQuotaExhausted()`, som kun rapporterer en konto med hvert brugt vindue), eller en kredit, der udløber inden for `expiringCreditHours` (24) på en konto, der har brugt mindst `expiringCreditMinUsedPercent` (50).
5. Naturlig nulstillingsbeskyttelse: Spring over, når det vægbeklædte 5-timers vindue nulstilles inden for `sessionResetGuardMinutes` (90), eller det væggede ugentlige vindue inden for `weeklyResetGuardHours` (12).
6. Ugentlig bund: Spring over en 5-timers nulstilling, når den resterende uge er under `weeklyFloorPercent` (10).
7. `last-resort` tilstand: spring over, mens en anden konto inden for rammerne af samme udbyder har mindst `poolHeadroomPercent` (10) tilbage i begge vinduer. Udløbende kredittriggere omgår dette.
8. `dry-run` optager en række og indløser intet; `last-resort` og `eager` indløses.

Manglende kvotedata låser aldrig op for en indløsning: et ukendt nulstillingstidspunkt eller ugentlig brug springer over.

**Claude session nulstilling:** med funktionen slået fra, eller `claudeSessionReset` slået fra, bestemmer `autoLimitReset` -knappen pr. konto nøjagtigt som før. Når begge er slået til, erstatter funktionen per-konto-skiftene: en konto inden for rammerne kan kun gøre krav, når politikken tillader det, og i `dry-run` tilstand fremsættes intet krav.

**Sikkerhed:** jobbet indløser højst én kredit pr. kryds, beslutter sig inden notering af kreditter (en spranget konto er aldrig opført), bruger idempotensnøgler `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` og bakker en konto tilbage i 1 time efter en mislykket notering eller indløsning. Hver indløsning, fiasko og tør-run-beslutning skrives til `audit_log` (`action: "bankedReset.redeem"`, ingen tokens eller kredit-id'er); hætterne tælles fra disse rækker, så de overlever genstarter. Vellykkede indløsninger affyrer også `provider.reset_redeemed` webhook.

Regressionsvagter: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Sessionsaffinitet (#7274)

**Omfang:** én klientsession (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`-header) fastlåst til én forbindelse, for **enhver** udbyder.

**Formål:** Bevar en flertrinsagent (Claude Code, aider, brugerdefinerede agenter) på den samme konto på tværs af forespørgsler, så tab af kontekst på tværs af konti og gentagne 429-fejl ved koldstart på udbydere med sessionsstatus pr. konto reduceres.

**Implementering:**

- Opløsning af TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Valg/oprettelse af fastlåsning: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Udtrækning af header (generisk, enhver udbyder): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabel med vedvarende fastlåsninger: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Indstilling: `sessionAffinityTtlMs` (global TTL i ms, `0` deaktiverer) — `src/lib/db/settings.ts`. Omdøbt fra den Codex-specifikke `codexSessionAffinityTtlMs` af migreringen `124_generic_session_affinity_ttl.sql`, som viderefører en eventuelt tidligere konfigureret Codex-TTL som den nye standard.

Før #7274 afbrød `resolveSessionAffinityTtlMs()` straks med `0` for alle udbydere bortset fra `codex`, så TTL-indstillingen (og sessionsheaderne) ingen effekt havde andre steder, selv om fastlåsingsmekanismen og headerudtrækningen allerede var udbyderuafhængige. Rettelsen fjernede denne tidlige returnering; TTL gælder nu ensartet for alle udbydere, når den globale værdi er sat til over `0`.

De tre sessionsaffinitetsheaders videresendes aldrig til upstream — executors opbygger deres egne upstream-headers fra bunden i stedet for at videresende klientheaders, så dette forbliver udelukkende et internt korrelations-id.

### Eksklusive forbindelseslejemål til administrerede sessioner

**Omfang:** én aktiv administreret HTTP-klient/-session ejer én kvalificeret OmniRoute-forbindelse.

**Formål:** at levere vedvarende eksklusivt forbindelsesejerskab for klienter, der har brug for en hård routingafgrænsning på tværs af requests. Dette adskiller sig fra sessionsaffinitet, som er en blød præference for kontinuitet:
en eksklusiv lease bevarer livscyklustilstand i SQLite, håndhæver global entydighed for aktive ejere og aktive forbindelser
og afviser en forældet generation før provider-dispatch.

Funktionen er opt-in pr. API-nøgle. En administreret nøgle skal have scopet `lease:exclusive` og en
eksplicit liste over `allowedConnections`, der ikke må være tom. Enhver HTTP-klient kan bruge livscyklus-endpointet; intet
klientnavn, user-agent, provider, OAuth-metode eller model er påkrævet. Leasen ejer en forbindelse,
ikke en model, så et modelskift bevarer bindingen, så længe forbindelsen fortsat normalt er kvalificeret. De normale regler for
model, kvote, tilstand, cooldown og allowlist er fortsat bestemmende og kan flytte den samme generation til en anden ledig kvalificeret forbindelse.

Livscyklussen er `POST /api/v1/session-leases` med JSON-handlingerne `acquire`, `renew` og `release`.
Administrerede inference-requests angiver den uigennemsigtige værdi `X-OmniRoute-Lease-Owner` og den nøjagtige
`X-OmniRoute-Lease-Generation`. Ejeren bruger `vlo_` efterfulgt af 43 base64url-tegn; kun dens SHA-256-hash gemmes. Hvert endeligt dispatch-hegn binder også den godkendte API-nøgle-ID og det aktive forbindelses-ID. Lease-kontrolheadere fjernes fra logs, gemte request-snapshots og upstream-executor-headere.

Hvis almindelig routing har kvalificerede administrerede kandidater, men alle ledige kandidater er optaget af en fremmed aktiv lease, returnerer OmniRoute HTTP `429`, koden lease-capacity-unavailable, tilstanden waiting-for-capacity og en begrænset `Retry-After`, der beregnes ud fra den tidligste relevante udløbstid.
Almindelig tom kvalificering er ikke lease-kapacitetskonflikt og bevarer sin eksisterende routing-fejlsemantik.

Relaterede mekanismer forbliver adskilte:

- OAuth-sessionsoptagelse er proceslokal blød fordeling for OAuth-konti.
- Kontosemaforer tildeler tilladelser til samtidig behandling af requests og afsluttes, når en request er færdig.
- Eksklusive administrerede sessionsleases er vedvarende livscyklusejerskab med et generationshegn.

## 3. Modellåsning

**Omfang:** kombinationen af udbyder + forbindelse + model.

**Omfang efter status:** Den fejlende status bestemmer, hvilken nøgle en låsning skriver
til (`resolveLockoutScope()` i `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — et kvote- eller berettigelsessignal — låser **kvotefamilien**:
  for codex hele `codex` / `spark`-omfanget (alle `gpt-5*`-modeller for
  forbindelsen), for andre udbydere `getQuotaScopedModelForProvider()`.
- `404` låser den grundlæggende model (`getModelLockKey()` indsnævrer `not_found`).
- Enhver anden status — `5xx`-transport-/serverfejl og OmniRoutes egen
  syntetiserede `502` fra kvalitetsvalidering — låser kun den **præcise**
  kombination af udbyder/forbindelse/model. En dårlig stream på én model er ikke
  et bevis på noget om kontoens kvote; før denne regel fjernede ét tomt svar på
  `codex/gpt-5.6-luna` alle `gpt-5*`-modeller for den forbindelse fra routing i 2–30 min.
  (med eskalering), mens kvoten forblev uberørt.
- En callers eksplicitte `scope`-indstilling vinder altid (Antigravity sender `"exact"`).

**Formål:** undgå at deaktivere en hel forbindelse, når kun én model er utilgængelig eller kvotebegrænset.

**Eksempler:**

- Kvoteudbydere pr. model, der returnerer 429
- Lokale udbydere, der returnerer 404 for én manglende model
- Udbyderspecifikke fejl for tilstande-/modeltilladelser (f.eks. Grok-tilstande)

**Implementering:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard for modelnedkøling (v3.8.0)

UI: Indstillinger → Modelnedkøling (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Viser aktive låsninger med: udbyder, forbindelse, model, årsag, expiresAt. Operatører kan manuelt genaktivere en model fra kortet.

**REST API:**

- `GET /api/resilience/model-cooldowns` — vis aktive låsninger
- `DELETE /api/resilience/model-cooldowns` — manuel genaktivering. Body: `{provider, connection, model}`. Auth: management.

### Nedkølingsstyring

UI: Overvågning → Nedkølingsstyring (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Én side for hver forbindelse, der er ude af routing af en midlertidig årsag, i stedet for
at åbne hver udbyderside. Den viser forbindelsesnedkølinger, modellåsninger og terminale
tilstande, rydder dem pr. forbindelse, for et udvalg eller for alle forbindelser hos en udbyder
og redigerer de mest anvendte nedkølingsregler: `streamStallCooldown.enabled` og
basisnedkølingen for OAuth-/API-nøgle-`connectionCooldown` samt det maksimale antal
backoff-trin (gemmes via `PATCH /api/resilience`). Terminale tilstande (`banned`, `expired`, `credits_exhausted`) vises,
men ryddes aldrig her.

Kortet **Regler for fejlnedkøling** på samme side redigerer operatørens fejlregler
(`settings.providerErrorRules`) og standardindstillingerne for hver udbyders catch-all
(`settings.providerErrorDefaults`) via `PATCH /api/settings` — se "Operatørdefinerede
regler" under §7 for, hvordan de matches. Varigheder er Standard (ingen eksplicit nedkøling), 30 min.,
1 t., 5 t., 24 t. eller en brugerdefineret værdi fra 1 til 43.200 minutter (30 dage).

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — forbindelser med status, resterende nedkøling,
  backoff-niveau, seneste fejltype og modellåsninger (ingen legitimationsoplysninger)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` eller
  `{all: true, provider?}`; returnerer `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI til indstillinger for låsning + gendannelse via succeshenfald (v3.8.23)

Modellåsning gik fra altid aktiveret, hardkodet adfærd til en fuldt konfigurerbar,
frivillig funktion med sit eget indstillingskort og en selvhelende gendannelsessti.

**Indstillingskort:** Indstillinger → Modellåsning
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Dette er **adskilt** fra det skrivebeskyttede `ModelCooldownsCard` ovenfor (som kun
_viser_ aktive låsninger) — det nye kort _konfigurerer parametrene_. Standardværdierne
findes i `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Indstilling             | Standardværdi                    | Betydning                                                    |
| ----------------------- | -------------------------------- | ------------------------------------------------------------ |
| `enabled`               | `false`                          | Hovedkontakt — modellåsning er **deaktiveret som standard**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Opstrømsstatusser, der tæller som en modelafgrænset fejl.    |
| `baseCooldownMs`        | `120_000` (120 s)                | Indledende låsningsvarighed for den første fejl.             |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Grænse for den eskalerede nedkøling.                         |
| `maxBackoffSteps`       | `10`                             | Maks. antal eskaleringstrin med eksponentiel backoff.        |
| `useExponentialBackoff` | `true`                           | Om gentagne fejl eskalerer nedkølingen eksponentielt.        |

Indstillingerne gemmes via det normale indstillingslager og valideres via
skemaet for robusthedsindstillinger; kortet begrænser `baseCooldownMs`/`maxCooldownMs`
(med `maxCooldownMs ≥ baseCooldownMs`) samt `maxBackoffSteps`.

**Gendannelse via succeshenfald:** gendannelse sker **ikke** udelukkende ved udløb af timeren. Et sundt
svar reducerer modellens fejltælling, så en model, der er kommet sig
midt i vinduet, holder op med at eskalere (og låsningen ryddes) før dens timer
ville være udløbet. Ved et vellykket kombinationsmål kalder `open-sse/services/combo.ts`
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), som **halverer**
den gemte `failureCount` (`Math.floor(failureCount / 2)`); når den når `0`, slettes
låsningen helt. Modstykket `recordModelLockoutFailure()` øger tællingen (og eskalerer nedkølingen)
ved fejl inden for eskaleringsvinduet. Dette succeshenfald kommer ud over almindeligt timerudløb —
begge veje kan genaktivere en model.

**Tilstand:** lockouts holdes **i hukommelsen** (procesvise `Map`s med
`ModelLockoutEntry`, hvis nøgler er `provider:connectionId:model`, låse med
eksakt scope har nøglerne `provider:connectionId:exact:model`), og gemmes ikke
i DB'en — de går tabt ved genstart. _Indstillingerne_ gemmes; den aktive
_lockout-tilstand_ er midlertidig.

---

## 4. Samtidig kontrol med kvoteandele (v3.8.36)

Abonnementskonti (GLM, MiniMax osv.) accepterer ofte kun ~ 1-3 samtidige anmodninger; overskridelse udløser 429s og nedkøling. Dette er akut under **kvote-andel** (`qtSd/…`) kombinationer, hvor flere API nøgler deler én upstream-konto. Tre lag forhindrer en delt konto i at blive oversvømmet.

### Per-forbindelse samtidighedsloft (`max_concurrent`)

Hver udbyderforbindelse kan erklære et `max_concurrent` loft (`provider_connections.max_concurrent`, indstillet i forbindelsesmodal / API / DB). Lad det stå tomt uden begrænsning. Dette er den enkelte knap, der driver serialiseringslaget under — sæt det til kontoens reelle samtidighed (f.eks. GLM ~ 1, MiniMax ~ 2).

### Per-model concurrency caps (`modelConcurrency`)

En forbindelse kan desuden erklære nøjagtige samtidighedslofter pr. model på sit `rateLimitOverrides` kort:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Indstil den i forbindelsesmodal (**Rate limit tilsidesætter → Per-model concurrency caps** , en `model=cap` pr. linje) eller via `PATCH /api/providers/[id]` med samme JSON form. Nøgle semantik:

- **Forbindelsesdækkende vs modelspecifik:** `maxConcurrent` forbliver det delte loft over hele forbindelsen. Når begge gælder, erhverves begge porte atomisk i den samme sammensatte port (`global → provider → account → model`); den effektive adfærd er den strengere gældende grænse.
- **Præcis model-nøgle match:** nøglen er modelstrengen, der sendes til eksekveren efter routing-opløsning — normalt det blotte opstrøms model-id (`glm-5`), ikke et `provider/model` alias på klientsiden (`zai/glm-5` matcher ikke `glm-5`). Værdier er positive-heltals samtidige anmodningslofter.
- **Lokal kø, ingen opdagelse:** overskydende anmodninger står i kø lokalt med den eksisterende queue/timeout semantik (indtastede `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` -adgangsfejl). OmniRoute opdager eller udleder ikke upstream-politik — den håndhæver de nøjagtige lofter, som operatøren har konfigureret. En mættet modelport deaktiverer aldrig udbyderen og skaber aldrig en permanent modellockout; opstrøms 429/cooldown/fallback adfærd forbliver fejlbagstopperen.
- **Per-forbindelse, pr-proces omfang:** caps er pr. databaseforbindelse og holdes i hukommelsen, så to forbindelser, der genbruger den samme upstream API nøgle, koordinerer ikke med hinanden.
- **Ukonfigureret betyder uændret:** udeladelse af kortet (eller lade dashboardfeltet stå tomt) tilføjer ingen modelport. Eksempel på konfiguration uden at hævde nogen universel udbydergrænse:

```text
glm-5=1
glm-4.7=3
```

### Serialisering af anmodning om kvotedeling

Når en kvotedelingsudsendelse er målrettet mod en forbindelse, der erklærer en positiv `max_concurrent`, samtidige anmodninger til den **konto** serialiseres gennem en per-forbindelse semafor (nøgle `qsconn:<connectionId>`): overskydende anmodninger **vente i køen** i stedet for at oversvømme kontoen. Det er det **fejl-åbn** — en mættet kø eller timeout fortsætter uden en slot i stedet for nogensinde at afvise en afsendelsesanmodning. Slå ind **Indstillinger → Resilience → Kvota-andel pr-forbindelse samtidighed** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standard slået til). Uden en `max_concurrent` cap er adfærden uændret.

> Kvotedelings routing-gate (`selectQuotaShareTarget`, DRR + P2C) er i sig selv fejlåben og _deprioriterer_ kun en at-cap-forbindelse — med en enkeltforbindelsespulje, den kan ikke hårdt begrænse, så denne semafor er det, der faktisk indeholder oversvømmelsen.

### Genforsøg med combo-afkølingsbevidst

For hver kombinationsstrategi (når den er aktiveret), venter en anmodning, der ville krystallisere en 429 for en SHORT forbigående nedkøling, den ud og afsendes igen i stedet for at returnere de 429 — dette dækker Gemini-klasse TPM/RPM vinduer (~ 60'er genforsøg efter) på kombinationer med flere modeller, f.eks. rammer begge mål for en model-model. Afgrænset af `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) i **Indstillinger → Resilience** . Det venter aldrig på `quota_exhausted` (låst indtil midnat) eller auth/not-found årsager. Med `comboTimeoutMs` indstillet starter en ventetid, der ikke kan afsluttes før den deadline, ikke (#18998): kombinationen svarer med det samme med sit terminale svar i stedet for en `COMBO_TIMEOUT` 504.

En kombination kan fravælge med `config.comboCooldownWaitEnabled: false`. Kun bogstavelig `false` deaktiverer disse delte kombinationsventer (afkøling efter afsendelse og circuit-open/model-lock -venter før afsendelse) og deres vente-budget timeout-gulvforlængelse. Manglende eller `true` bevarer den globale politik; `true` kan ikke aktivere globalt deaktiveret ventetid. En eksplicit `targetTimeoutMs` vinder stadig. Dette fravalg ændrer ikke den separate native-Codex turn-pin før afsendelse ventetid.

Den samme gate dækker pre-dispatch-tilfældet (#16319): når hvert mål i en combo springes over, før der gøres ethvert forsøg, fordi dens model sidder i en kort forbigående lockout, venter nul-forsøgsvejen låsningen ude under de samme lofter og genudsender, i stedet for at besvare en `503 ALL_TARGETS_SKIPPED` uden hints. Når ingen ventetid er tilladt (loft, forsøg eller budget opbrugt, eller funktionen er slået fra), opgraderes terminalsvaret til `429 rate_limit_error`, der bærer `retry_after` / `reset_at` fra det tidligste forbigående låseudløb; kvote-, godkendelses- og ikke-fundne låse holder den antydningsfrie 503.

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

## 7. Omskrivning af upstream-status (forkerte kvotafejl)

**Omfang:** én upstream-gateway, der rapporterer midlertidig kvoteudtømning med den forkerte HTTP-status.

**Formål:** korrigér en vildledende status FØR klassificering, så downstream-forbrugere (fallback-motoren, combo-aggregeringen og det klientsynlige svar) ser fejlens reelle mulighed for genforsøg.

Nogle gateways signalerer MIDLERTIDIG kvoteudtømning med en HTTP-status,
der ikke kan forsøges igen. `agentrouter.org` returnerer `403` (undertiden
`400`) med en kinesisk body (`用户额度不足` / `额度不足`) i stedet for standardstatussen
`429`. Klienter som Claude Code behandler `403` som permanent og afbryder
sessionen, og uden korrektion ville fallback-motoren klassificere den som
`AUTH_ERROR` i stedet for en kvotehændelse.

**Implementering:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — en
  liste med regler pr. udbyder (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), der matches via `applyStatusRestatement()`.
- Kaldested: `providerFailure:`-blokken i `open-sse/handlers/chatCore.ts`
  omkring linje 3654, umiddelbart efter at `parseUpstreamError()` fortolker et
  upstream-svar med en fejl-HTTP-status (`!providerResponse.ok`), og før nogen
  klassificering køres, så alle downstream-forbrugere ser den korrigerede
  status. Fejl, der er indlejret i en `200` SSE-stream, følger en separat,
  senere stream-fortolkningssti og er **ikke** dækket af dette hook i dag — en
  kendt begrænsning, som endnu ikke er nødvendig for agentrouters fejlstatus
  (der vises som en fejl-HTTP-status).
- Genforsøgsberettigelse: `429` findes i `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), så en omskrevet fejl
  medfører et reelt genforsøgsvindue i stedet for at blive vist som en
  ubrugelig `403`.
- Den syntetiske `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  er kun det, som det omskrevne svar fortæller **klienten**; det er ikke i sig
  selv forbindelsens interne nedkølings-/blokeringstid — den styres separat af
  den mekanisme, der faktisk håndterer den omskrevne fejl
  (Connection Cooldowns eskalerende backoff, §2, med en basis på `3s` for
  API-key-udbydere; eller Model Lockout, §3, for udbydere med kvote pr. model
  som agentrouter). Routeren kan internt blive berettiget til at forsøge igen
  tidligere end det 60-sekunders vindue, den annoncerer til klienten — tilsigtet
  ekstra spillerum, ikke en fejl.

Permanente fejl (agentrouters `无权访问模型` — ingen adgang til denne model)
omskrives ALDRIG: `excludeMarkers` nedlægger veto mod reglen, selv når
`textMarkers` matcher, så fejlen beholder sin oprindelige status, og intet
forsøger at genkøre den for evigt. Den matchende udbyderklassificeringsregel
(`agentrouter-model-access-denied` i `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, en deklareret basisnedkøling på
`6h`) konsulteres af `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_før_ den generiske tidlige returnering for apikey-kategorien `FORBIDDEN`,
betinget af `honorsRuleLockScope(provider)` (#10334 — i øjeblikket eksklusiv
for agentrouter via allowlisten `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i
`providerErrorRules.ts`). Reglens deklarerede nedkøling på 6 timer føres videre
som `fallbackResult.baseCooldownMs`, men den går stadig gennem den eksisterende
lockout-sti for kvote pr. model (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ikke ændret af #10334 bortset fra kilden til
nedkølingen): den begrænses til operatørens `mlSettings.maxCooldownMs`
(standard `1_800_000ms` / 30 min), ligesom alle andre modellockouts, og den
_persisterede lockout-årsag_ forbliver den eksisterende hardkodede `"forbidden"`,
ikke reglens `"auth_error"` — kun nedkølingens varighed respekteres hele vejen,
ikke årsagsstrengen. Selve forbindelsen forbliver aktiv; søstermodeller på den
samme forbindelse påvirkes ikke.

Omskrevne kvotafejl (`额度不足`) når frem til en udbyderregel i produktion
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, uden egen deklareret nedkøling — persistenslagets skalerede
standard-backoff anvendes). Siden #10334 bliver `scope` på
`ProviderErrorRuleMatch` forbrugt hele vejen, men **kun** for udbydere på
allowlisten `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
i dag kun `"agentrouter"`, styret via `honorsRuleLockScope()`). For alle andre
udbydere forbliver `scope` informativ, præcis som før #10334.
`checkFallbackError` eksponerer den matchede regels scope som
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) er den fælles vagt, der bekræfter, at et
`ruleScope` reelt er sikkert at respektere som et forbindelsesdækkende,
selvgenoprettende signal (scope `"connection"`, reason `quota_exhausted`,
aldrig `permanent`, aldrig `creditsExhausted` — et forsvar mod en fremtidig
regelkombination af scope `"connection"` med en permanent kontotilstand). To
forbrugere kalder den:

- **Persistens** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  i stedet for at falde ind i passthrough-udbyderens **pr. model**-lockoutgren
  (`agentrouter` er `passthroughModels: true` → `hasPerModelQuota()`
  returnerer `true`), anvendes en **midlertidig forbindelsescooldown** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, aldrig en terminal status
  (`credits_exhausted`/`banned`/`expired`) — så forbindelsen automatisk
  genoprettes, når cooldown-perioden udløber, i stedet for at kræve en manuel
  nulstilling af legitimationsoplysningerne.
  Springes over for forbindelser med `disableCooling: true` (#2997): dette
  fravalg falder i stedet gennem til lockout pr. model (et dokumenteret
  kompromis — se kodekommentaren ovenfor grenen).
- **Combo-routing i samme forespørgsel** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): den samme guard markerer
  forbindelsen i det in-memory-baserede `exhaustedConnections`-sæt, med nøglen
  `${provider}:${connectionId}`. Dette springer kun et resterende mål i SAMME
  FORESPØRGSEL over, hvis målet _selv allerede indeholder netop dette
  `connectionId`_ i sit eget målobjekt (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` før opslaget i `exhaustedConnections`) — en almindelig
  combo med en modelliste, hvor søstermålene ikke har et fastgjort
  `connectionId` på deres eget målobjekt, og hvor ét mål først opløses pr.
  dispatch fra svarheaderen `X-OmniRoute-Selected-Connection-Id`, rammer aldrig
  dette nøgletjek. I dette almindelige tilfælde er den faktiske beskyttelse
  mod, at en resterende del genbruger den netop udtømte konto, IKKE dette Set —
  det er persistenslaget ovenfor (forbindelsens `rateLimitedUntil` ligger nu i
  fremtiden) kombineret med, at denne samme guard undertrykker
  `transientRateLimitedProviders` for fejlen (se "To-trinsdesign" og
  kodekommentaren ved grenen
  `isAgentrouterConnectionQuotaScope` i `targetExhaustion.ts`): Når dette Set
  forbliver umarkeret, aktiveres `combo.ts`'s `allowRateLimitedConnection`
  force-allow (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) IKKE for
  udbyderens resterende dele, så legitimationsoplysningernes valgfilter for
  `rateLimitedUntil` (`src/sse/services/auth.ts:1238`) respekteres normalt, og
  en resterende del vælger enten en anden, stadig kvalificeret
  agentrouter-forbindelse eller mislykkes med, at der ikke er nogen
  tilgængelige legitimationsoplysninger — den tvinger sig ikke tilbage på den
  forbindelse, som denne gren netop satte på cooldown.

### To-trinsdesign: statusomformulering, derefter klassifikation

Statusomformulering (`upstreamStatusRestatement.ts`) og regler for
udbyderklassifikation (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) er separate registre, der begge bruger udbyder-id og
tekstmarkører som nøgle, men de kører forskellige steder og tjener forskellige
formål: omformulering omskriver HTTP-statussen tidligt i `chatCore.ts`;
klassifikationsregler vælger fallback-`reason` og låser `scope`
(`model` / `provider` / `connection`) i `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klassifikationsregler ser kun den fulde fejl-**tekst** (nødvendig for at matche
brødtekstmarkører som `额度不足`) for udbydere, der er angivet på
allowlisten `FULL_TEXT_RULE_PROVIDERS` i `providerErrorRules.ts` — aktuelt kun
`"agentrouter"`. For alle andre **indbyggede** udbydere giver
`checkFallbackError` kun `getProviderErrorRuleMatch` den strukturerede fejl
(`{code, type}`), hvilket er tilstrækkeligt til regler baseret på
header/status/kode, men ikke kan se markører i brødteksten.
Hjælpefunktionen `resolveRuleMatchBody()` udfører dette valg: den fulde
fejltekst for udbydere på allowlisten, ellers den strukturerede fejl. Det er et
eksplicit tilvalg pr. udbyder at føje en **indbygget** udbyder til
`FULL_TEXT_RULE_PROVIDERS` — det findes, så standardstien for alle udbydere,
der ikke står på listen, forbliver byte-for-byte uændret.

En regels `scope` (`model` / `provider` / `connection`) er et separat tilvalg
fra `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` eksponerer den kun som
`fallbackResult.ruleScope`, og downstream-forbrugere respekterer den kun som
andet end en informativ etiket for udbydere på allowlisten
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samme fil (styret via
`honorsRuleLockScope()` — i dag kun `"agentrouter"`). Se "Omformulerede
kvotefejl" ovenfor for, hvad et match med `scope: "connection"` faktisk gør,
når en udbyder står på denne allowliste.

**#11104 — operatørerklærede regler omgår begge allowlister.** En operatør kan
erklære en regel pr. udbyder under kørsel via `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) uden
at redigere denne fil. Hvis en operatørregel blev begrænset af
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlister,
der skal beskytte standardadfærden for regler for indbyggede katalogudbydere —
ville indstillingsmekanismen være uden effekt for alle udbydere bortset fra dem,
der allerede står på listerne, eftersom erklæringen af reglen allerede er
operatørens eksplicitte tilvalg. `resolveRuleMatchBody()` og
`honorsRuleLockScope()` kontrollerer begge `hasOperatorRuleForProvider()` først:
En udbyder med en operatørregel får den rå fejltekst og får sin erklærede
`scope` respekteret, uanset om den også findes på en af allowlisterne.

**Operatørerklærede regler** (`OperatorProviderErrorRule`): hver regel har en
valgfri `status` og et valgfrit `match` (en almindelig,
uafhængig af store/små bogstaver understreng i fejlteksten, aldrig en RegExp,
så den kan ikke forårsage ReDoS), og skal angive mindst ét af de to. Når begge
er angivet, kombineres de med AND; et udeladt felt matcher alt, så
`{match: "insufficient_quota"}` matcher enhver status, der indeholder denne
kode. Den første matchende regel vinder. `cooldownMs` accepterer op til
30 dage; højst 50 regler i alt.

**Samle-degradationer** (`settings.providerErrorDefaults`, opt-in, angives gennem
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
med `cooldownMs` fra 1 minut til 30 dage. En standard anvendes kun, når ingen
operatorregel og ingen indbygget katalogregel matchede, og kun for 402, 403, 408,
429 og 5xx-fejl. Fejl i request-formatet (400, 404, 409, 413, 422) og bare
401-fejl beholder deres egen håndtering. Uden en eksplicit `reason` kommer årsagen
fra statuskoden på samme måde som i `classifyError`. En deklareret standard tæller
som en operatorregel for `hasOperatorRuleForProvider()`, så dens `scope` (standard
`"connection"`) respekteres. Den effektive cooldown for en standard er den længste
af dens `cooldownMs` og providerens eget retry-hint (`Retry-After`,
`x-ratelimit-reset` eller et reset-hint i body’en, det samme hint som motoren
respekterer, når indstillingen "use upstream retry hints" for connection-cooldown
er slået til), så en standard kan forlænge et kort upstream-hint, men aldrig
forkorte et reelt reset. En eksplicit operatorregel beholder sin nøjagtige
`cooldownMs`. Hverken en regel eller en standard tilsidesætter
connection-cooldown-vagterne i `markAccountUnavailable`: En aktiv, længere
cooldown forkortes aldrig, og en terminal status overskrives aldrig. De indbyggede
tekstdetektorer, der kører tidligere i `checkFallbackError` (credits exhausted,
daily quota, account deactivated), har stadig forrang for deres egne formuleringer.

**Kendt mangel — `providerRuleRegistry` konsulteres aldrig for HTTP 400.**
`checkFallbackError`'s `BAD_REQUEST`-gren klassificerer status 400 udelukkende
gennem sine egne mønstermatricer (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` osv. i `accountFallback.ts`) og returnerer, før
grenen med `configuredRule`/`getProviderErrorRuleMatch` ovenfor nås.
En indbygget katalogregel (eller en operatorregel) med `status: 400` er
syntaktisk gyldig, men vil aldrig blive aktiveret. Ingen eksisterende regel
rammer 400 i dag, så intet i produktionen påvirkes — men en fremtidig 400-regel
kræver, at denne gren ændres først, hvilket er en større ændring end at tilføje
en regel (den omklassificerer 400 for alle providere, der allerede er afhængige
af adfærden i mønstermatricerne), og ligger uden for omfanget af en enkelt
providerregeltillføjelse.

### Tilføjelse af en ny gateway, der fejlangiver quota

1. Registrér ét regelarray i `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Hold `textMarkers`
   provider-specifikke; genbrug aldrig generiske engelske formuleringer, der
   kolliderer med `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Registrér eventuelt klassifikationsregler i
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) for at vælge
   det rigtige låseomfang (`connection` for quota, der gælder hele kontoen,
   `model` for fejl pr. model). Dette trin får kun effekt i produktionen for
   providere, hvis regler kræver hele fejlteksten (body-markører): Tilføj
   provider-id’et til `FULL_TEXT_RULE_PROVIDERS` i den samme fil — ellers giver
   `checkFallbackError` kun reglen den strukturerede fejl
   `{code, type}`, og en body-tekstregel vil aldrig matche live-trafik.
   Regler, der udelukkende matcher på `status`/`headers` (som Opencode-reglerne
   eller Minimax-reglerne), kræver ikke dette opt-in. Hvis reglen separat
   erklærer `scope: "connection"` og hensigten er en faktisk connection-wide
   cooldown plus skip af kombinationer for den samme request (ikke blot en
   informativ etiket), skal provider-id’et tilføjes til
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i den samme fil — det er denne liste, der
   styrer forbruget i stil med `isAgentrouterConnectionQuotaScope()` i
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) og
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); uden den flyder `scope`
   stadig gennem `fallbackResult.ruleScope`, men intet reagerer på det.
3. Tilføj unit-tests, der spejler
   `tests/unit/upstream-status-restatement.test.ts`
   og `tests/unit/agentrouter-error-rules.test.ts` (inklusive vagterne
   not-permanent / not-creditsExhausted og — hvis provideren kræver
   allowlisten — en test, der bekræfter, at `resolveRuleMatchBody()` kun
   returnerer hele teksten for den pågældende provider).

Der er ikke behov for ændringer i `chatCore.ts`, `classifyError` eller combo.

#### Egress-bucket-baseret lås (#10880)

Providere i `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode-familien) behandles
som upstream med IP-buckets (opencode free tier er IP-bucket-baseret, ikke
konto-bucket-baseret — se #9611): En status-429, der klassificeres som
`quota_exhausted` **eller** `rate_limit_exceeded`, køler alle forbindelser i
den allowlistede familie ned, hvis senest kendte egress-IP matcher den
fejlramte forbindelses, før rotationen kan forsøge dem
— og undgår dermed N-1 upstream-kald, der med sikkerhed ville fejle (samme form
som #10460/#10525). `rate_limit_exceeded` er medtaget med vilje: På
`markAccountUnavailable`-stien matcher de opencode-specifikke regler aldrig
(ingen headers/body gives videre til `checkFallbackError`, og opencode er ikke
i `FULL_TEXT_RULE_PROVIDERS`), så en 429, hvis body indeholder teksten om
subscription-quota ("monthly usage limit reached"), klassificeres som
`quota_exhausted` af quota-tekst-fallbacken
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 times cooldown),
før reglen `status_429` nogensinde nås — mens en quota-tekstfri 429 (almindelig
ratebegrænsning) klassificeres via reglen `status_429` som
`rate_limit_exceeded` og stadig køler IP-familien ned. For en allowlistet
provider er en IP-baseret ratebegrænsning det samme signal som en opbrugt quota.
Ærlige begrænsninger:

- **Bedst mulig indsats**: låsen slår forbindelsens senest kendte `egress_ip`
  op fra `proxy_logs` (24 timers vindue, synkront, ingen cache). Kold cache
  (`egress_ip` er aldrig blevet undersøgt) eller ingen række → den fejlslagne
  forbindelse køles stadig ned af grenen (registreres som i dag), men ingen
  søskendeforbindelse låses.
- **Aldrig terminal**: nedkølingen er et fornyende kvotevindue
  (`testStatus: "unavailable"`); en permanent tilstand udledes aldrig fra et
  signal på IP-niveau. Forbindelser med `disableCooling` springer grenen helt over.
- **Låsegranulariteten ændres for den allowlistede familie**: dette er en
  scopeændring, ikke kun en optimering af søskendeforbindelser. opencode er en
  `passthroughModels`-udbyder, så en 429 før denne gren medførte en låsning pr.
  MODEL; nu medfører den en nedkøling af forbindelsen — også for en operatør,
  der kun kører en enkelt forbindelse uden nogen søskendeforbindelse overhovedet.
  Det er den granularitet, som opencodes regel­tabel allerede erklærer korrekt
  (`scope: "connection"`, `providerErrorRules.ts`), men som hidtil aldrig er
  blevet respekteret, fordi opencode ikke findes i
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grenen skriver selv den fejlslagne
  forbindelses nedkøling + `backoffLevel`, efter samme mønster som den
  forbindelsesafgrænsede agentrouter-gren, og returnerer — blokeringen pr. model
  og den generiske sti nedenfor nås aldrig.
- **Kombination inkluderet**: ligesom agentrouter-grenen ignorerer scopet
  bevidst den nedgradering af `persistUnavailableState`/`isCombo`, som en
  kombinationskalder anvender på en 429. En låsning pr. model er ikke en svagere
  form af dette scope, men den forkerte enhed: den siger intet om den udtømte
  IP, så kombinationsrotationen ville fortsætte med at brænde ét garanteret
  fejlslagent kald af pr. søskendeforbindelse.
- **Søskendesikkerhed**: en søskendeforbindelse, der allerede er terminal
  (banned/credits_exhausted), eller som allerede er i en længere nedkøling,
  overskrives aldrig.
- **Eksklusiv allowlist**: en udvidelse af `EGRESS_BUCKETED_LOCK_PROVIDERS` er
  en eksplicit ejerbeslutning; ingen generisk kobling (mønster #10334/#10419).
  Søskendeforbindelsesforespørgslen binder til den samme allowlist i stedet for
  at gentage den som en SQL-literal, så en udvidelse fortsat er en ændring på
  én linje.
- **Rotation af egress-IP i begge retninger**: opslagets vindue (24 timer) er
  langt bredere end cachen for egress-IP'ens TTL (5 minutter), så "senest kendte
  IP" er historik, ikke den aktuelle tilstand. Hvis en forbindelses proxy
  roterede inden for vinduet, kan låsen **ramme ved siden af** en reelt delt IP
  (den registrerede IP er den nye, ikke-udtømte) — og tilsvarende kan den
  **køle en søskendeforbindelse ned, som siden har roteret væk** fra den udtømte
  IP. Det andet tilfælde koster søskendeforbindelsen ét nedkølingsvindue; begge
  dele accepteres som begrænsninger ved bedst mulig indsats for et
  historikbaseret opslag.
- **Omkostning**: to afgrænsede scanninger af `proxy_logs` (vinduesfiltreret via
  `idx_pl_timestamp`), kun ved 429-frekvens. Intet nyt indeks (migrering 134
  YAGNI). Målt på en databasekopi med reel trafik og moderat størrelse; en
  instans med høj gennemstrømning indeholder forholdsmæssigt flere rækker i det
  samme vindue.

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
