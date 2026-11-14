# Resilience Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute heeft drie verschillende, maar gerelateerde veerkrachtmechanismen. Elk heeft een ander bereik en doel. Houd ze gescheiden bij het opsporen van fouten in het routeringsgedrag.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Bron: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-dashboard-prioriteit voor veerkrachtschakelaars.** De opt-in veerkrachtschakelaars die uit de omgeving — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — komen, leveren alleen de _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Er bleef een Booleaanse waarde bestaan in `resilienceSettings` (Dashboard →** Instellingen → Veerkracht** / `PATCH /api/resilience`, opgeslagen in `key_value`) wint de env-waarde: normalisatie (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) behoudt de opgeslagen boolean wanneer deze bestaat. Het instellen van een dergelijke env var op `true` in een implementatie waarbij het dashboard `false` al heeft opgeslagen, verandert daarom niets — zet de schakelaar naar binnen** Instellingen → Veerkracht** (of wis het opgeslagen veld).

## 1. Provider Circuit Breaker

**Bereik:** volledige provider (bijv. `glm`, `openai`, `anthropic`).

**Doel:** stop het verzenden van verkeer naar een provider die herhaaldelijk faalt op upstream-/serviceniveau.

**Implementatie:**

- Kernklasse: `src/shared/utils/circuitBreaker.ts`
- Koppeling: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- Reset-API: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- DB-tabel: `domain_circuit_breakers`

**Toestanden:**

- `CLOSED` — normaal verkeer toegestaan
- `DEGRADED` — verkeer nog steeds toegestaan, maar een verhoogd aantal providerfouten wordt bijgehouden; keert terug naar `CLOSED` bij voldoende successen, bij een geldige verbindingstest, of na de langste `OPEN`-periode voor het laatste fouttype (diens `cooldownByKind`-waarde, anders `resetTimeout`, × `maxBackoffMultiplier`, minimaal één cooldown) zonder een nieuwe fout
- `OPEN` — provider tijdelijk geblokkeerd; comborouting slaat deze over
- `HALF_OPEN` — reset-time-out verstreken; testverzoek toegestaan

**Configureerbare standaardwaarden (`open-sse/config/constants.ts`, beschikbaar via Dashboard → Settings → Resilience):**

| Klasse      | Gedegradeerd bij | Opent bij | Reset-time-out |
| ----------- | ---------------- | --------- | -------------- |
| OAuth       | 5 fouten         | 8 fouten  | 60s            |
| API-sleutel | 7 fouten         | 12 fouten | 30s            |
| Lokaal      | afgeleid         | 2 fouten  | 15s            |

`degradationThreshold` bepaalt wanneer een provider in `DEGRADED` terechtkomt; `failureThreshold` bepaalt wanneer deze opent en wordt overgeslagen. Lokale providerprofielen worden nog niet weergegeven op de Resilience-instellingenpagina.

**Tripcodes:** alleen statussen op providerniveau `[408, 500, 502, 503, 504]`. NIET trippen bij fouten op accountniveau (de meeste 401/403/429 — die horen bij cooldown of lockout).

**Lazy recovery:** wanneer `OPEN` verloopt, verversen `getStatus()`, `canExecute()` en `getRetryAfterMs()` de toestand naar `HALF_OPEN`. Dezelfde leesbewerkingen (en de volgende fout) laten een verouderde `DEGRADED` terugvallen naar `CLOSED`. Geen achtergrondtimer nodig.

---

### Opt-in globale Provider Cooldown (window gate)

Een vierde, **opt-in**-laag (`PROVIDER_COOLDOWN_ENABLED`, standaard **uit**) houdt een requestoverschrijdend geheugen van falende providers bij in `open-sse/services/providerCooldownTracker.ts`, dat wordt geraadpleegd door de combo-doelbepaling, zodat opeenvolgende combo-requests niet opnieuw een provider doorlopen die zojuist is mislukt. Entries op providerniveau respecteren de `PROVIDER_PROFILES` window gate:

| Profiel     | tript na (`providerFailureThreshold`) | binnen (`providerFailureWindowMs`) | koelt af gedurende (`providerCooldownMs`) |
| ----------- | ------------------------------------: | ---------------------------------: | ----------------------------------------: |
| OAuth       |                                  `10` |                            `15min` |                                    `5min` |
| API-sleutel |                                  `15` |                            `30min` |                                   `10min` |

Onder de drempel wordt de provider **niet** als afkoelend beschouwd; een succes wist het venster. Entries op verbindingsniveau (`provider:connectionId`) behouden in plaats daarvan de exponentiële `minRetryCooldownMs → maxRetryCooldownMs`-backoff. Overschrijvingen: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Regressiebewaking: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Afkoelperiode van verbinding

**Domein:** enkele aanbieder connection/account/key.

**Doel:** sla één slechte sleutel over terwijl andere verbindingen voor dezelfde provider blijven werken.

**Uitvoering:**

- Markeer niet beschikbaar: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selectie: `getProviderCredentials*` in hetzelfde bestand
- Cooldown-berekening: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Instellingen: `src/lib/resilience/settings.ts`

**Velden per verbinding:**

- `rateLimitedUntil` — tijdstempel totdat de cooldown verloopt
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — exponentiële uitstelteller

**Standaard cooldowns:**

- OAuth basis: 5s
- API-sleutelbasis: 3s
- API-sleutel 429: geeft de voorkeur aan upstream `Retry-After`/reset headers/parseable reset-tekst
- Terugtrekking: `baseCooldownMs * 2 ** failureIndex`

**Vertraging bij nieuwe pogingen per provider.** De providerdetailpagina bevat een** Vertraging opnieuw proberen** selecteer (Auto, 15s tot 1u). Het bespaart `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, via `PATCH /api/resilience`). Wanneer een snelheidslimietfout geen hint voor opnieuw proberen bevat, vervangt die waarde de geschaalde back-off voor de provider en wordt `backoffLevel` opnieuw ingesteld op 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Prioriteit voor een fout met beperkte frequentie, de hoogste eerst: hint voor opnieuw proberen upstream, vervolgens `providerSpecificData.rotationOverrides.rateLimitResetSeconds` per verbinding, vervolgens de vertraging voor nieuwe pogingen per provider, vervolgens env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` en vervolgens de geschaalde uitstel. Automatisch verwijdert het veld. Het heeft alleen invloed op de reden van de snelheidslimiet, nooit op de eindtoestand.

**Bewaker tegen donderende kudde:** voorkomt dat gelijktijdige fouten de cooldown te lang verlengen of `backoffLevel` dubbel verhogen.

**Concurrency-limit 429's beklimmen de backoff-ladder niet.** Een `429` waarvan de hoofdtekst een gelijktijdigheidslimiet rapporteert ("te veel gelijktijdige verzoeken", "gelijktijdigheidslimiet", "parallelle verzoeklimiet", GLM `并发数过高`) betekent dat het account in orde is maar druk is. `checkFallbackError()` retourneert reden `concurrency_limited`: ga nu over naar de volgende verbinding, koel deze af voor een vaste `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) of de upstream-hint voor opnieuw proberen, houd `backoffLevel` ongewijzigd en stel `skipProviderBreaker` in. Een expliciete quota-instantie wint nog steeds, dus een instantie die ook aan een quotapatroon voldoet, blijft een quota-oordeel. Detectie: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`; oordeel: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (de `FailureKind` van de breker) is ongewijzigd en leest nog steeds `rate_limit` voor deze instanties.

**Streaminhoudkraampjes koelen het account niet af.** Wanneer de content-stall watchdog (`open-sse/utils/streamHandler.ts`) een stream opgeeft die geen modeluitvoer op tijd heeft verzonden, registreert `markAccountUnavailable()` de fout op de verbinding, maar stelt geen cooldown in: de stall behoort tot dat verzoek, meestal een lange redeneerbeurt zonder nog uitvoer. Operators kunnen zich weer aanmelden met `resilienceSettings.streamStallCooldown.enabled` (standaard `false`).

**Opt-in latentiesignaal voor `p2c` -accountselectie.** Elke verzonden poging registreert de tijd tot de eerste byte en het resultaat per verbinding (en per + -model voor verbinding) in een in-memory rolling-venster: de laatste 20 monsters binnen 15 minuten (`open-sse/services/connectionLatencyTracker.ts`, opgenomen van `safeLogEvents()` in `src/sse/handlers/chatHelpers.ts`). Wanneer `resilienceSettings.p2cLatency.weight` hoger is dan `0` (bereik 0-20, standaard `0` = uit), telt `compareP2CConnections()` in `src/sse/services/auth.ts` op tot `weight` punten voor elke kandidaat van het paar. De helft daarvan komt van de latentie als verhouding tot de snellere kandidaat (twee keer zo langzaam is de volledige helft) en de helft van het voortschrijdende foutenpercentage. De termijn is alleen van toepassing als beide kandidaten ten minste drie monsters hebben. Nieuwe accounts worden dus niet bestraft en het plafond blijft onder de sancties voor quotumblokkering en quotumuitputting. Het voegt geen eigen circuit toe: falende accounts worden nog steeds afgehandeld door de cooldown-, lockout- en breaker-lagen. Stel het in met `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Redeneringsframes herstarten het budget voor de inhoudsstalling.** Een redeneermodel kan minutenlang nadenken voordat het zijn eerste zichtbare teken krijgt: Claude streamt `thinking_delta` frames waarvan de denktekst mogelijk leeg is, en de Reacties API streamt het ene redeneringsitem na het andere. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) herkent deze frames, en de waakhond herstart zijn budget voor elk frame in plaats van de beurt te annuleren. Ze zijn nog steeds geen modeluitvoer, dus een beurt die eindigt met alleen redeneren wordt nog steeds als leeg gerapporteerd, en een beurt die stopt met redeneren en alleen hartslagen verzendt, laat de waakhond nog steeds struikelen.

Kiro's binaire `reasoningContentEvent` frames met een niet-lege handtekening behouden deze redeneeractiviteit via de uitvoerder als een lege `reasoning_content` delta. De handtekening wordt niet doorgestuurd. Metadata, onvolledige frames en lege handtekeningen herstarten het contentbudget niet; de onafhankelijke active-stream time-out en clientannulering zijn nog steeds van toepassing (`open-sse/executors/kiro/reasoning.ts`).

**Terminalstatussen (NOT cooldowns):**

- `banned` — ingesteld door detectie van verboden trefwoord / accountverbod (zie [BAN_DETECTION](../security/BAN_DETECTION.md) ). Stroomopwaartse weigeringen per verzoek (`request_rejected`, bijv. Anthropic OAuth 403 "Verzoek niet toegestaan") stellen dit nooit in: ze worden geteld per verbinding en model en halen dat model uit de rotatie met een groeiende afkoeling beperkt tot `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 uur), of koelen de verbinding af als er geen model bekend is — `open-sse/services/requestRejectedStreak.ts`
- `expired` (overgangen naar terminal na begrensde nieuwe pogingen — `EXPIRED_RETRY_MAX = 3` met exponentiële uitstel — zodat tijdelijke OAuth fouten zichzelf kunnen herstellen voordat het account permanent wordt gedeactiveerd)
- `credits_exhausted`

Deze blijven bestaan totdat de inloggegevens veranderen of een operator ze opnieuw instelt. Overschrijf terminalstatussen niet met een tijdelijke afkoelstatus.

**Lui herstel:** als `rateLimitedUntil` voorbij is, komt verbinding weer in aanmerking. Bij succesvol gebruik wist `clearAccountError()` alle foutvelden.

### Claude OAuth gebruiksmuur: + -sessielimiet met lagere prioriteit voor rijstrook

**Domein:** één Claude -abonnement (OAuth)-verbinding. Beide kenmerken zijn** opt-in per verbinding** (Bewerk verbinding → Claude sectie → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`, beide standaard uitgeschakeld) en spiegel `/low-priority` en `/limit-reset` -opdrachten van Claude Code (draadcontract vastgelegd uit Claude Code 2.1.263).

**Uitvoering:**

- State machine + -antwoordclassificatie: `open-sse/services/claudeLowPriority.ts`
- status/claim client opnieuw instellen: `open-sse/services/claudeLimitReset.ts`
- Executor hook (headerinjectie + opnieuw proberen met hetzelfde account): `open-sse/executors/base.ts::execute()`
- Opt-in persistentie: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trekker:** de 5-uurs gebruiksmuur — a `429` waarvan de headers `anthropic-ratelimit-unified-status: rejected` bevatten en, wanneer het account in aanmerking komt, `anthropic-ratelimit-unified-slow-offer: treatment`. Er wordt niets vóór die eerste muur 429 verzonden; een burst 429 zonder verenigde headers gaat via het normale afkoelpad.

**Rijstrook met lagere prioriteit** (`lowPriorityMode`):

- Op muur 429 accepteert de executeur het aanbod en probeert het onmiddellijk opnieuw** dezelfde** rekening bij `anthropic-usage-limit: slow`; de baan blijft actief tot de aangekondigde `anthropic-ratelimit-unified-reset` (+ 60s grace) en elk verzoek in dat venster draagt de header. De onderschepte 429 bereikt `handleChatCore` nooit, dus de verbinding is er** niet** in cooldown gezet en wordt niet weggedraaid.
- `anthropic-ratelimit-unified-slow-status` op latere reacties: `active` / `not_needed` baan aanhouden; `slot_busy` (429) of een `529` wacht op de `anthropic-ratelimit-unified-slow-retry-after` van de server (standaard 20s, klem 5–600s, ± 30% jitter) en probeer het opnieuw, begrensd door `anthropic-ratelimit-unified-slow-max-wait` (standaard 20 min, klem 1 min–6 uur) — voorbij dat de baan eindigt en een afkoeling van 10 minuten blokkeert heracceptatie. Het wachten wordt bovendien begrensd door wat er overblijft van de eigen upstream-starttime-out van het verzoek (`resolveFetchStartTimeout`, standaard 10 min) minus een marge van 5 s: zonder die limiet zou de standaard maximale wachttijd van 20 minuten langer duren dan het verzoek en zou de slaap halverwege het wachten worden afgebroken, waardoor een `TimeoutError` naar voren komt in plaats van de sierlijke `max_wait` eind- + -afkoeling.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, een 5h-window rollover, of `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (die eindigt als `extra_usage` op welke status dan ook, aangezien betaald overschot nu de muur bedekt) beëindigt de baan; het antwoord stroomt dan naar het normale afkoelpad. `budget_exhausted` wordt onthouden tot de aangekondigde budgetreset (≤ 8 dagen).
- De muurcontrole wordt uitgevoerd na de eigen 400 aangestuurde intra-pogingpogingen van de uitvoerder (contextbewerking, thinking/effort klemmen, param auto-learn), dus een muur 429 die alleen bij één van die nieuwe pogingen opduikt, wordt nog steeds onderschept in plaats van het afkoelpad te bereiken.
- De status is per verbinding in het geheugen (een herstart kost één extra muur 429 om opnieuw te accepteren).

**Sessielimiet opnieuw instellen** (`autoLimitReset`, geprobeerd vóór de baan als beide aan zijn):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` blok; wanneer `arm: "reset"` en `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` met `{ "program": "juniper_tide" }` (organisatie UUID uit `providerSpecificData.organizationUUID`, bootstrap fallback).
- `result: reset|not_limited` → het verzoek wordt opnieuw op volle snelheid geprobeerd (geen langzame header). `already_used` / `not_offered` memoise `next_available_at` (standaard één week); elke storing duurt 15 minuten. De reset vindt eenmaal per week plaats en telt nog steeds mee voor de wekelijkse limiet.

Regressiewachters: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Bankresets automatisch toepassen

**Domein:** Codex en Claude -abonnementsverbindingen (OAuth).** Aanmelden** : de `bankedResetAutoApply` instelling is standaard uitgeschakeld en in `dry-run` -modus (Instellingen → AI → Banked resets automatisch toepassen).

**Doel:** voer zelf bankresets uit wanneer een account een gebruikslimiet bereikt, in plaats van te wachten tot een operator op "Inwisselen" drukt op de pagina Providerlimieten.

| Krediettype (`creditTypes`) | Wat wordt verzilverd                                     | Waar het draait                                                |
| --------------------------- | -------------------------------------------------------- | -------------------------------------------------------------- |
| `codexCredits`              | Codex resetten                                           | achtergrondtaak, elke 60 s                                     |
| `claudeCredits`             | Claude -banksubsidies (`GRANT` -kredieten)               | achtergrondtaak, elke 60 s                                     |
| `claudeSessionReset`        | Claude wekelijkse sessielimiet opnieuw instellen (boven) | verzoekpad, via hetzelfde beleid als de schakelaar per account |

**Uitvoering:**

- Zuivere beslissing (één regelset voor beide paden): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Achtergrondtaak: `src/lib/services/bankedResetAutoApply.ts` (gestart in `src/instrumentation-node.ts`)
- Claude verzoekpadpoort: `src/lib/usage/claudeSessionResetPolicy.ts`, geregistreerd via `setClaudeLimitResetPolicy()` in `open-sse/services/claudeLimitReset.ts`
- Geschiedenis, hoofdletters en webhook: `src/lib/usage/bankedResetAudit.ts`
- Geschiedenis API: `GET /api/settings/banked-reset-auto/history?limit=50` (managementauthenticatie)

**Beslissingsvolgorde** (de eerste falende regel is de geregistreerde reden):

1. Functie uitgeschakeld, krediettype uitgeschakeld of account buiten bereik (`accountScope` `all` / `selected` plus de `connections` -kaart per account).
2. Buiten het optionele UTC schema (`startHourUtc` > `endHourUtc` overschrijdt middernacht).
3. Maximaal aantal over de afgelopen 24 uur: `maxPerAccountPerDay` (1), `maxPerDay` (3) en `minSpacingMinutes` (30) tussen twee willekeurige aflossingen.
4. Trigger: een ommuurd `session` of `weekly` venster (lees van `getQuotaWindowStatus().reachedThreshold`, niet `isAccountQuotaExhausted()`, dat alleen een account rapporteert bij elk uitgegeven venster), of een tegoed dat binnen `expiringCreditHours` (24) vervalt op een account dat ten minste `expiringCreditMinUsedPercent` (50) heeft gebruikt.
5. Bewaking met natuurlijke reset: overslaan wanneer het ommuurde 5-uursvenster binnen `sessionResetGuardMinutes` (90) wordt gereset, of het ommuurde wekelijkse venster binnen `weeklyResetGuardHours` (12).
6. Wekelijkse bodem: sla een reset van 5 uur over als de resterende week lager is dan `weeklyFloorPercent` (10).
7. `last-resort` modus: overslaan terwijl een ander binnen het bereik vallend account van dezelfde provider in beide vensters ten minste `poolHeadroomPercent` (10) over heeft. Triggers voor aflopende kredieten omzeilen dit.
8. `dry-run` registreert een rij en verzilvert niets; `last-resort` en `eager` verzilveren.

Ontbrekende quotagegevens ontgrendelen nooit een inwisseling: een onbekende resettijd of wekelijks gebruik wordt overgeslagen.

**Claude sessie opnieuw instellen:** als de functie is uitgeschakeld, of `claudeSessionReset` is uitgeschakeld, beslist de `autoLimitReset` schakelaar per account precies zoals voorheen. Als beide zijn ingeschakeld, vervangt de functie de schakelaars per account: een account binnen het bereik kan alleen claimen als het beleid dit toestaat, en in `dry-run` modus wordt er geen claim gemaakt.

**Veiligheid:** de baan wisselt maximaal één credit per tick in, beslist voordat credits worden aangeboden (een overgeslagen account wordt nooit vermeld), gebruikt idempotentiesleutels `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` en zet een account gedurende 1 uur terug na een mislukte aanbieding of inwisseling. Elke inwisselings-, mislukkings- en proefbeslissing wordt naar `audit_log` geschreven (`action: "bankedReset.redeem"`, geen tokens of krediet-ID's); de caps worden vanaf die rijen geteld, zodat ze een herstart overleven. Succesvolle inwisselingen activeren ook de `provider.reset_redeemed` webhook.

Regressiewachters: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Sessieaffiniteit (#7274)

**Domein:** één clientsessie (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) vastgemaakt aan één verbinding, voor** elk** aanbieder.

**Doel:** een multi-turn agent (Claude Code, aider, aangepaste agenten) op hetzelfde account houden voor alle verzoeken, waardoor contextverlies tussen accounts en herhaalde koude start 429's bij providers met een sessiestatus per account worden verminderd.

**Uitvoering:**

- TTL -resolutie: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Headerextractie (algemeen, elke provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Aanhoudende pintabel: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Instelling: `sessionAffinityTtlMs` (algemene TTL in ms, `0` wordt uitgeschakeld) — `src/lib/db/settings.ts`. Hernoemd van de alleen-Codex `codexSessionAffinityTtlMs` door migratie `124_generic_session_affinity_ttl.sql`, die alle eerder geconfigureerde Codex TTL overneemt als de nieuwe standaard.

Vóór #7274 `resolveSessionAffinityTtlMs()` voor elke provider behalve `codex` een harde borgtocht naar `0`, dus de TTL instelling (en de sessieheaders) had nergens anders effect, ook al waren het vastzetmechanisme en de header-extractie al provider-agnostisch. De oplossing maakte een einde aan die vervroegde terugkeer; de TTL is nu uniform van toepassing op elke aanbieder die eenmaal globaal boven `0` is ingesteld.

De drie sessie-affiniteitsheaders worden nooit stroomopwaarts doorgestuurd. — uitvoerders bouwen hun eigen upstream-headers helemaal opnieuw, in plaats van clientheaders door te geven, dus dit blijft alleen een interne correlatie-ID.

### Exclusieve beheerde sessieverbindingsleases

**Domein:** één actief beheerde HTTP client/session is eigenaar van één in aanmerking komende OmniRoute verbinding.

**Doel:** Bied duurzaam exclusief verbindingseigendom voor klanten die behoefte hebben aan een harde routering tussen verzoeken. Dit verschilt van sessieaffiniteit, wat een zachte continuïteitsvoorkeur is: een exclusieve lease houdt de levenscyclusstatus in SQLite aan, dwingt de globale uniciteit van de actieve eigenaar en de actieve verbinding af, en wijst een verouderde generatie af voordat de provider wordt verzonden.

De functie is opt-in per API sleutel. Een beheerde sleutel moet het `lease:exclusive` bereik en een expliciete, niet-lege `allowedConnections` lijst hebben. Elke HTTP client kan het levenscycluseindpunt gebruiken; er is geen clientnaam, user-agent, provider, OAuth methode of model vereist. De leaseovereenkomst is eigenaar van een verbinding, niet van een model, dus bij een modelwijziging blijft de binding behouden terwijl de verbinding normaal gesproken in aanmerking blijft komen. De normale model-, quota-, status-, cooldown- en toelatingslijstregels blijven gezaghebbend en kunnen dezelfde generatie overzetten naar een andere gratis in aanmerking komende verbinding.

De levenscyclus is `POST /api/v1/session-leases` met JSON acties `acquire`, `renew` en `release`. Beheerde inferentieverzoeken presenteren de ondoorzichtige `X-OmniRoute-Lease-Owner` waarde en exacte `X-OmniRoute-Lease-Generation`. De eigenaar gebruikt `vlo_` gevolgd door 43 base64url-tekens; alleen de SHA-256 hash wordt opgeslagen. Elke definitieve verzendafrastering bindt ook de geauthenticeerde API sleutel ID en actieve verbinding ID. Leasecontroleheaders worden verwijderd uit logboeken, bewaarde momentopnamen van verzoeken en upstream-executorheaders.

Als gewone routering in aanmerking komende beheerde kandidaten heeft, maar elke vrije kandidaat wordt bezet door een buitenlandse actieve lease, retourneert OmniRoute HTTP `429`, code voor leasecapaciteit niet beschikbaar, een status voor wachten op capaciteit en een begrensde `Retry-After` afgeleid van de vroegste relevante vervaldatum. Gewone lege geschiktheid is geen leaseconflict en behoudt de bestaande semantiek van routeringsfouten.

Gerelateerde mechanismen blijven gescheiden:

- OAuth -sessiebezetting is proces-lokale zachte distributie voor OAuth accounts.
- Accountsemaforen verlenen gelijktijdigheidsvergunningen voor verzoeken en eindigen wanneer een verzoek is voltooid.
- Exclusieve beheerde sessieleases zijn duurzaam levenscycluseigendom met een generatiehek.

---

## 3. Model-lockout

**Bereik:** provider + verbinding + model-drietal.

**Bereik per status:** de status die de fout veroorzaakt, bepaalt naar welke sleutel een lockout wordt geschreven
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — een quota- of entitlement-signaal — vergrendel de **quota-familie**:
  voor codex het volledige bereik `codex` / `spark` (elk `gpt-5*`-model van de
  verbinding), voor andere providers `getQuotaScopedModelForProvider()`.
- `404` vergrendelt het kale model (`getModelLockKey()` vernauwt dit tot `not_found`).
- Elke andere status — `5xx`-transport-/serverfouten en OmniRoute's eigen
  gesynthetiseerde `502` uit kwaliteitsvalidatie — vergrendelt alleen het **exacte**
  provider-/verbinding-/model-tupel. Een slechte stream op één model is geen bewijs
  over het quota van het account; vóór deze regel verwijderde één lege respons op
  `codex/gpt-5.6-luna` elk `gpt-5*`-model van die verbinding gedurende 2–30 min (oplopend)
  uit de routering, terwijl het quota onaangeroerd bleef.
- De expliciete optie `scope` van een aanroeper heeft altijd voorrang (Antigravity geeft `"exact"` door).

**Doel:** voorkomen dat een volledige verbinding wordt uitgeschakeld wanneer slechts één model niet beschikbaar is of door quota wordt beperkt.

**Voorbeelden:**

- Providers met quota per model die 429 retourneren
- Lokale providers die 404 retourneren voor één ontbrekend model
- Provider-specifieke fouten met betrekking tot modus-/modelrechten (bijv. Grok-modi)

**Implementatie:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard voor model-cooldowns (v3.8.0)

UI: Instellingen → Model-cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Toont actieve lockouts met: provider, verbinding, model, reden, expiresAt. Operators kunnen een model handmatig opnieuw inschakelen vanuit de kaart.

**REST API:**

- `GET /api/resilience/model-cooldowns` — actieve lockouts weergeven
- `DELETE /api/resilience/model-cooldowns` — handmatig opnieuw inschakelen. Body: `{provider, connection, model}`. Auth: beheer.

### Cooldownbeheer

UI: Monitoring → Cooldownbeheer (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Eén pagina voor elke verbinding die om een tijdelijke reden niet wordt gerouteerd, in plaats van
elke providerpagina afzonderlijk te openen. De pagina toont cooldowns voor verbindingen, modellockouts en terminale
statussen, wist deze per verbinding, voor een selectie of voor alle verbindingen van een provider,
en bewerkt de meest gebruikte cooldownregels: `streamStallCooldown.enabled` en de
basis-cooldown en het maximale aantal backoffstappen van `connectionCooldown` voor OAuth- en API-sleutels (opgeslagen via
`PATCH /api/resilience`). Terminale statussen (`banned`, `expired`, `credits_exhausted`) worden
wel weergegeven, maar hier nooit gewist.

De kaart **Fout-cooldownregels** op dezelfde pagina bewerkt de operatorfoutregels
(`settings.providerErrorRules`) en de provider-specifieke standaardinstellingen voor alle overige gevallen
(`settings.providerErrorDefaults`) via `PATCH /api/settings` — zie "Door operators gedeclareerde
regels" onder §7 voor de manier waarop ze overeenkomen. Duurinstellingen zijn Standaard (geen expliciete cooldown), 30 min,
1 uur, 5 uur, 24 uur of een aangepaste waarde van 1 tot 43.200 minuten (30 dagen).

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: beheer):

- `GET /api/resilience/cooldowns[?provider=]` — verbindingen met status, resterende cooldown,
  backoffniveau, type van de laatste fout en modellockouts (geen inloggegevens)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` of
  `{all: true, provider?}`; retourneert `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI voor lockoutinstellingen + herstel door succesafbouw (v3.8.23)

Modellockout ging van altijd ingeschakeld, hardcoded gedrag naar een volledig configureerbare,
opt-in functie met een eigen instellingenkaart en een zelfherstellend herstelpad.

**Instellingenkaart:** Instellingen → Modellockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Dit is **onderscheiden** van de alleen-lezen `ModelCooldownsCard` hierboven (die alleen
actieve lockouts _opsomt_) — de nieuwe kaart _configureert de parameters_. Standaardwaarden
staan in `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Instelling              | Standaardwaarde                  | Betekenis                                                      |
| ----------------------- | -------------------------------- | -------------------------------------------------------------- |
| `enabled`               | `false`                          | Hoofdschakelaar — modellockout is **standaard uitgeschakeld**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream-statussen die tellen als een modelgebonden fout.      |
| `baseCooldownMs`        | `120_000` (120 s)                | Initiële lockoutduur voor de eerste fout.                      |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limiet voor de opgeschaalde cooldown.                          |
| `maxBackoffSteps`       | `10`                             | Maximaal aantal escalatiestappen met exponentiële backoff.     |
| `useExponentialBackoff` | `true`                           | Of herhaalde fouten de cooldown exponentieel opschalen.        |

Instellingen worden bewaard via de normale instellingenstore en gevalideerd via het
schema voor resilience-instellingen; de kaart begrenst `baseCooldownMs`/`maxCooldownMs`
(met `maxCooldownMs ≥ baseCooldownMs`) en `maxBackoffSteps`.

**Herstel door succesafbouw:** herstel is **niet** uitsluitend het verlopen van een timer. Een gezonde
respons verlaagt de foutenteller van het model stapsgewijs, zodat een model dat
halverwege het venster is hersteld, niet verder blijft escaleren (en de lockout wist)
voordat de timer zou verlopen. Bij een geslaagd combo-doel roept `open-sse/services/combo.ts` `decayModelFailureCount()`
aan (`open-sse/services/accountFallback.ts`), die de opgeslagen
`failureCount` **halveert** (`Math.floor(failureCount / 2)`); wanneer deze `0` bereikt, wordt de lockoutvermelding volledig verwijderd. De tegenhanger `recordModelLockoutFailure()` verhoogt de teller (en schaalt de cooldown op) bij fouten binnen het escalatievenster. Deze succesafbouw komt boven op het gewone verlopen van de timer —
via beide paden kan een model opnieuw worden ingeschakeld.

**Status:** lockouts worden **in het geheugen** bijgehouden (`Map`s per proces van
`ModelLockoutEntry`, gesleuteld op `provider:connectionId:model`; vergrendelingen met
een exact bereik op `provider:connectionId:exact:model`), en niet opgeslagen in de
database — ze gaan verloren bij een herstart. De _instellingen_ worden opgeslagen; de
actieve _lockoutstatus_ is vluchtig.

---

## 4. Gelijktijdigheidscontrole van quota-aandelen (v3.8.36)

Abonnementsaccounts (GLM, MiniMax, etc.) accepteren vaak alleen ~ 1–3 gelijktijdige verzoeken; als je dat overschrijdt, worden 429's en cooldowns geactiveerd. Dit is acuut onder** quota-aandeel** (`qtSd/…`) combo's, waarbij verschillende API sleutels één upstream-account delen. Drie lagen zorgen ervoor dat een gedeeld account niet overstroomt.

### Gelijktijdigheidslimiet per verbinding (`max_concurrent`)

Elke provideraansluiting kan een `max_concurrent` plafond declareren (`provider_connections.max_concurrent`, ingesteld in de aansluiting modal / API / DB). Laat het onbeperkt leeg. Dit is de enige knop die de serialisatielaag onder — aanstuurt en deze instelt op de echte gelijktijdigheid van het account (bijvoorbeeld GLM ~ 1, MiniMax ~ 2).

### Gelijktijdigheidslimieten per model (`modelConcurrency`)

Een verbinding kan bovendien exacte gelijktijdigheidsplafonds per model declareren in de `rateLimitOverrides` -kaart:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Stel het in het verbindingsmodal (** Tarieflimiet overschrijft → Gelijktijdigheidslimieten per model** , één `model=cap` per regel) of via `PATCH /api/providers/[id]` met dezelfde JSON vorm. Belangrijkste semantiek:

- **Verbindingsbreed versus modelspecifiek:** `maxConcurrent` blijft het gedeelde verbindingsbrede plafond. Wanneer beide van toepassing zijn, worden beide poorten atomair verkregen in dezelfde samengestelde poort (`global → provider → account → model`); het effectieve gedrag is de strengste geldende grens.
- **Exacte overeenkomst tussen model en sleutel:** de sleutel is de modelstring die wordt doorgegeven aan de uitvoerder na routeringsresolutie — normaal gesproken de kale upstream-model-ID (`glm-5`), niet een `provider/model` alias aan de clientzijde (`zai/glm-5` komt niet overeen met `glm-5`). Waarden zijn plafonds voor gelijktijdige aanvragen met positieve gehele getallen.
- **Lokale wachtrij, geen ontdekking:** overtollige verzoeken worden lokaal in de wachtrij geplaatst met de bestaande queue/timeout semantiek (getypte `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` -toegangsfouten). OmniRoute ontdekt of leidt geen upstream-beleid af. — dwingt de exacte plafonds af die de operator heeft geconfigureerd. Een verzadigde modelpoort schakelt de provider nooit uit en creëert nooit een permanente modeluitsluiting; stroomopwaarts 429/cooldown/fallback -gedrag blijft de foutbackstop.
- **Per verbinding, per procesbereik:** caps zijn per databaseverbinding en worden in het geheugen bewaard, dus twee verbindingen die dezelfde upstream API sleutel hergebruiken, coördineren niet met elkaar.
- **Niet-geconfigureerd betekent ongewijzigd:** het weglaten van de kaart (of het leeg laten van het dashboardveld) voegt geen modelpoort toe. Voorbeeldconfiguratie zonder enige universele providerlimiet op te leggen:

```text
glm-5=1
glm-4.7=3
```

### Serialisatie van aanvragen voor het delen van quota

Wanneer een quota-share-verzending zich richt op een verbinding die een positieve `max_concurrent` declareert, worden daar gelijktijdige aanvragen voor ingediend** rekening** worden geserialiseerd via een semafoor per verbinding (sleutel `qsconn:<connectionId>`): overtollige verzoeken** wacht in de rij** in plaats van de rekening te laten overstromen. Het is** fail-open** — een verzadigde wachtrij of time-out verloopt zonder een slot in plaats van ooit een verzendbaar verzoek af te wijzen. Schakel in** Instellingen → Veerkracht → Gelijktijdigheid van quotumaandeel per verbinding** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standaard ingeschakeld). Zonder een `max_concurrent` limiet blijft het gedrag ongewijzigd.

> De quota-share routing gate (`selectQuotaShareTarget`, DRR + P2C) is zelf fail-open en _deprioritiseert_ alleen een at-cap-verbinding — met een pool met één verbinding die niet hard kan worden beperkt, dus deze semafoor is wat feitelijk de flood bevat.

### Combo cooldown-bewuste nieuwe poging

Voor elke combo-strategie (indien ingeschakeld) wacht een verzoek dat een 429 voor een tijdelijke SHORT cooldown zou kristalliseren, op het wachten en verzendt het opnieuw in plaats van de 429 — terug te sturen. Dit heeft betrekking op TPM/RPM -vensters van de Gemini-klasse (~ 60s retry-after) op combo's met meerdere modellen, bijvoorbeeld beide doelen van een combo met 2 modellen die een snelheidslimiet per model bereiken. Gegrenst door `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) in** Instellingen → Veerkracht** . Het wacht nooit op `quota_exhausted` (vergrendeld tot middernacht) of auth/not-found redenen. Als `comboTimeoutMs` is ingesteld, begint een wachttijd die niet vóór die deadline kan eindigen niet (#18998): de combo antwoordt onmiddellijk met zijn terminalantwoord in plaats van een `COMBO_TIMEOUT` 504.

Een combo kan zich afmelden met `config.comboCooldownWaitEnabled: false`. Alleen letterlijke `false` schakelt deze gedeelde combo-wachttijden uit (afkoelperiode na verzending en circuit-open/model-lock wachttijden vóór verzending) en hun verlenging van de time-out-minimum voor het wachtbudget. Ontbrekend of `true` handhaaft het mondiale beleid; `true` kan wachten voor globaal uitgeschakeld niet inschakelen. Een expliciete `targetTimeoutMs` wint nog steeds. Deze opt-out verandert niets aan de afzonderlijke wachttijd vóór verzending van de native Codex-turn-pin.

Dezelfde poort dekt de pre-dispatch-zaak (#16319): wanneer elk doelwit van een combo wordt overgeslagen voordat er een poging wordt gedaan, omdat het model zich in een korte voorbijgaande lock-out bevindt, wacht het nul-poging-pad op de lock-out onder dezelfde plafonds en verzendt het opnieuw, in plaats van een hintloze `503 ALL_TARGETS_SKIPPED` te beantwoorden. Als er niet gewacht mag worden (plafond, poging of budget opgebruikt, of de functie uitgeschakeld), wordt de terminalrespons geüpgraded naar `429 rate_limit_error` met `retry_after` / `reset_at` vanaf de vroegste tijdelijke vergrendelingsverloop; quota, auth en not-found sloten behouden de hintloze 503.

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

## 5. Toelatingscontrole voor de requestwachtrij (v3.8.49 · issue #6593)

**Scope**: de lokale wachtrij voor rate-limiting per provider+verbinding (`open-sse/services/rateLimitManager.ts`,
ondersteund door Bottleneck), één laag onder de drie mechanismen hierboven.

**`maxWaitMs` begrenst het wachten in de wachtrij; `executionMaxWaitMs` begrenst de uitvoering.**
De twee zijn bewust gescheiden en geen van beiden voedt de ander.

`resilienceSettings.requestQueue.maxWaitMs` is het **budget voor wachten in de wachtrij**: het
dekt het wachten op een providerslot en vervolgens het in QUEUED-status staan, en de timer ervan
wordt geannuleerd op het moment dat de job QUEUED verlaat en begint met uitvoeren
(`rateLimitManager.ts`, `wrappedFn`). Een request die dit budget overschrijdt, bereikt de
upstream nooit. Standaard 30000ms, geleverd door `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
in `src/lib/resilience/settings.ts` en vastgezet door
`tests/unit/ratelimit-admission-control-6593.test.ts`, zodat een wijziging daaraan
die test op rood zet in plaats van deze alinea stilletjes verouderd te laten.

`resilienceSettings.requestQueue.executionMaxWaitMs` is wat Bottleneck
ontvangt als de job-`expiration`, waarvan de timer pas na dispatch start. Het is
een vangnet voor executors zonder eigen upstream-timeout, en het wordt verhoogd
naar de eigen fetch-start-timeout van de executor wanneer die langer is, zodat het
een gezonde, lopende response niet kan afkappen. Standaard 600000ms (10 min).

Het invoeren van het wachtrijbudget in `expiration` is wat vroeger niet-incrementele
gateways midden in de vlucht afbrak — die lopen legitiem minutenlang vóór de eerste
bytes — en het is waarom een expiration zichtbaar wordt als `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) terwijl het wachtrijbudget de
wachtrij-timeoutcode draagt. Overschrijf beide via `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) of het dashboard
(**Instellingen → Resilience**). Beide worden bij normalisatie begrensd tot 1ms–24u.

**Prioriteit, voor beide:** de env-var levert alleen de _standaardwaarde_. Een waarde
die is opgeslagen in `resilienceSettings.requestQueue` (dashboard / API-patch, opgeslagen
in `key_value`) gaat daarboven, en een `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` per verbinding gaat daar weer boven. Het instellen van
de env-var op een deployment die al een opgeslagen waarde heeft, verandert
dus niets — wis of werk in plaats daarvan de opgeslagen instelling bij.

Het verblijf in de wachtrij wordt begrensd door `maxWaitMs`; `maxQueueDepth` hieronder begrenst hoeveel
aanroepers tegelijk in de wachtrij mogen staan.

**Retries uit de body: pacing versus lockout.** Een 429-body kan een eigen wachttijd
noemen (Gemini `RetryInfo.retryDelay`, "retry after Ns"-tekst), die
`updateFromResponseBody` uitleest. Een wachttijd die binnen de `maxWaitMs`
van de verbinding past, is pacing: de limiter leegt zijn reservoir voor die duur en
requests in de wachtrij worden verzonden zodra het weer is bijgevuld. Een wachttijd
langer dan `maxWaitMs` is niet iets dat de wachtrij kan uitzitten — Gemini
beantwoordt een uitgeput dagquotum met `retryDelay: "86399s"`. De doorgestuurde
`Retry-After` op de herbouwde 429 (#16528) zorgt er al voor dat de
fallback-engine het model voor dat venster vergrendelt, maar de limiter er ook voor
pauzeren zou nog steeds elke aanroep die de sleutel te vroeg bereikt
(bijvoorbeeld na een resilience-reset) de volledige `maxWaitMs` laten wachten. Wanneer
zo'n wachttijd afkomstig is van een getypeerd Google `RetryInfo`-detail
(de `google_rpc_retry_info`-herkomst) en de limiter van de sleutel
al op het model is toegespitst (zie `getLimiterKey`), wordt de 429 in plaats daarvan
een model-lockout op die verbinding (`lockModelForLongBodyRetry` in
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, begrensd tot 24u), en
blijft de limiter ongepauzeerd. De accountselectie slaat over op dat slot via
`isModelLocked()`, en datzelfde geldt voor de pre-dispatch-poort van de combo voor targets
die aan de verbinding zijn vastgezet. Op antigravity, waarvan de limiter per quotumfamilie
is, geldt het slot voor het exacte model, net als de andere quotumsloten. De naam die de client
aanvroeg, wordt ook vergrendeld wanneer een alias die naar dat model heeft omgezet,
omdat die controles de aangevraagde naam gebruiken; het wordt exact vergrendeld
(`lockExactModel`), zodat een alias die een antigravity-quotumfamilie of een
codex-scope kruist nooit zijn eigen naam vergrendelt. Een
hint in gewone tekst, een ongetypeerde `retryDelay`, of een
limiter die door de hele verbinding wordt gedeeld, behoudt de pauze. Wanneer de limiter die
het 429-pad zojuist heeft herbouwd wél pauzeert, wordt een aanroeper wiens resterende
wachtrijtijd vóór het einde van de pauze afloopt, onmiddellijk afgewezen met de
wachtrij-timeoutcode (`checkLimiterPause`) in plaats van die tijd af te wachten;
het geregistreerde einde is verankerd vóór het bouwen van de limiter, waar
Bottleneck zijn refreshklok start, en elke latere wijziging aan het reservoir vergeet het.
Gedekt door `tests/unit/rate-limit-long-body-retry-lockout.test.ts` en
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opt-in toelatingslimiet (nieuw).** `resilienceSettings.requestQueue.maxQueueDepth`
begrenst hoeveel requests tegelijk in de wachtrij mogen staan (nog niet
verzonden) voor één provider+verbinding. Wanneer de wachtrij al `maxQueueDepth`
requests bevat, wordt een nieuw request direct afgewezen met een getypeerde
`code: "RATE_LIMIT_QUEUE_FULL"`-fout **voordat** het ooit `limiter.schedule()` bereikt
— de afwijzing is dus goedkoop en vindt plaats vóór eventueel downstream
prompt-compressie- / vertaalwerk voor dat request. Standaard `0` =
uitgeschakeld, waarmee het bestaande gedrag van een onbegrensde wachtrij behouden blijft;
begrensd 0–100000. Overschrijven via `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) of
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API-patch).

De toelatingscontrole zelf is een pure functie
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), zodat
deze unit-testbaar is zonder een echte Bottleneck-limiter.

> De RFC die #6593 opende stelde ook een `bypassCompressionOnRateLimit`-vlag
> voor. De `open-sse/services/compression/`-pipeline van deze repo is
> prompt/context-compressie op het uitgaande LLM-verzoek (`chatCore.ts`,
> rond het `resolveCompressionSettings`/`selectCompressionStrategy`-blok),
> geen HTTP-responsecompressie op gesynthetiseerde 429-bodies — er is geen
> overeenkomstig codepad voor een letterlijke bypass-vlag. Die
> prompt-compressiestap draait momenteel ook _vóór_ `withRateLimit()` in de
> request-pipeline, dus het herordenen om deze stap over te slaan bij een
> wachtrij-vol-afwijzing is een aparte, grotere wijziging dan de scope van
> dit issue; dit werd hier bewust **niet** geïmplementeerd en is
> achtergelaten als vervolgstap voor het geval de CPU-besparing het
> herordeningsrisico waard is.

### Vangnet voor automatisch inschakelen van rate-limits & verbindingsbescherming (`rateLimitProtection`)

**Vangnet voor automatisch inschakelen** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, standaard `true`):
OmniRoute schakelt standaard automatisch rate-limit-wachtrijbescherming in voor alle actieve API-key-providerverbindingen (`getProviderCategory(provider) === "apikey"`). Dit zorgt ervoor dat inkomende verzoeken naar rate-gevoelige upstream API-keys in een wachtrij worden geplaatst en via Bottleneck worden afgeremd in plaats van uit te lopen op upstream 429-fouten. Het vangnet kan worden overschreven via de omgevingsvariabele `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` schakelt uit, `true`/`1`/`on` forceert aan), die voorrang heeft op de opgeslagen dashboardinstelling (**Settings → Resilience** / `PATCH /api/resilience`).

**Semantiek van per-verbinding `rateLimitProtection`:**
Per-verbinding rate-limit-bescherming wordt bijgehouden via het booleaanse veld `rateLimitProtection` op providerverbindingen (opgeslagen als `rate_limit_protection` in SQLite):

- **Expliciet aan (`rateLimitProtection === true`)**: Rate-limit-bescherming is expliciet ingeschakeld voor deze verbinding, ongeacht de providercategorie en ongeacht of het vangnet voor automatisch inschakelen is ingeschakeld.
- **Expliciet uit (`rateLimitProtection === false`)**: Schakelt expliciete bescherming uit, maar sluit een actieve API-key-verbinding **niet** uit van het globale vangnet voor automatisch inschakelen. In `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) zijn `false` en `undefined` equivalent: alleen `rateLimitProtection === true` wordt behandeld als een expliciete overschrijving. Als `rateLimitProtection` `false` is (of niet ingesteld), voldoet een actieve API-key-verbinding nog steeds aan de auto-enable-voorwaarde en blijft deze rate-limit-beschermd.
- **Geen per-verbinding opt-out**: Een operator kan momenteel niet uitdrukken "deze ene actieve API-key-verbinding moet zonder rate-limit-wachtrijbescherming draaien" terwijl auto-enable voor anderen actief blijft. Om API-key-verbindingen volledig zonder rate-limit-wachtrijen te laten draaien, moet het vangnet globaal worden uitgeschakeld (`RATE_LIMIT_AUTO_ENABLE=false` of `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Ondersteunde schrijfpaden:**

- **`POST /api/rate-limits`**: Het ondersteunde beheer-schrijfpad om `rateLimitProtection` voor een verbinding om te zetten (`{ connectionId: string, enabled: boolean }`). Aanroepen met `enabled: true` schakelt expliciete bescherming in; aanroepen met `enabled: false` verwijdert expliciete bescherming (hoewel actieve API-key-verbindingen gedekt blijven onder het globale vangnet als auto-enable aan staat).
- **`PUT /api/providers/[id]`**: Accepteert of wijzigt `rateLimitProtection` bewust **niet** (#11278). Het bijwerken van metadata van providerverbindingen via `PUT /api/providers/[id]` zal nooit de opgeslagen rate-limit-beschermingsstatus wijzigen.

---

## 6. Watchdog voor langzame doorvoer (#9709)

De optionele `resilienceSettings.streamRecovery.throughputWatchdog` guard detecteert een stroomopwaartse stroom die nog steeds chunks verzendt, maar assistent-uitvoer produceert onder de geconfigureerde bruikbare uitvoersnelheid. Het onderscheidt zich bewust van de time-out bij inactiviteit: hartslagen en metagegevens resetten geen van beide timers en tellen niet mee als voortgang. Het onderscheidt zich ook van de deadline voor harde pogingen (#9153), die een absoluut veiligheidsplafond blijft, ongeacht de uitvoerkwaliteit.

De waakhond heeft een opwarmperiode nodig, gevolgd door een volledig rollend venster voordat hij kan afbreken. Het telt tekstdelta's van API uitvoergebeurtenissen voor chatvoltooiingen en reacties (een conservatieve UTF-8 byteproxy), negeert alleen-gebruiks- en lege gebeurtenissen en schort het oordeel op terwijl tool-call- of redeneringsgebeurtenissen aan de gang zijn. Het is standaard uitgeschakeld en kan worden ingeschakeld met `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (die env-waarde zaait alleen de standaard — een opgeslagen `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean wint; zie de prioriteitsopmerking env-vs-dashboard bovenaan deze handleiding); het venster, de opwarming, de minimumsnelheid en de minimaal meetbare output worden begrensd door de normale normalisatielaag met veerkrachtinstellingen.

Indien ingeschakeld, wordt een watchdog-afbreking alleen toegepast op de actieve stroomopwaartse poging. Voordat er bytes zichtbaar zijn voor de client, kan het bestaande pad voor vroegtijdig herstel van hetzelfde account de poging opnieuw openen. Na commit wordt de stream nooit blindelings opnieuw afgespeeld; alleen het bestaande veilige midstream-voortzettingscontract kan een achtervoegsel hechten. De voltooiing blijft in één keer plaatsvinden, dus de gebruiksboekhouding en de vrijgave van de semafoor worden niet gedupliceerd.

---

## 7. Herformulering van upstream-status (onjuist weergegeven quota-fouten)

**Scope:** één upstream-gateway die tijdelijke quota-uitputting meldt met de verkeerde HTTP-status.

**Doel:** een misleidende status corrigeren VOORDAT classificatie plaatsvindt, zodat downstream-consumenten (fallback-engine, combo-aggregatie en het clientgerichte antwoord) de werkelijk opnieuw probeerbare aard van de fout zien.

Sommige gateways signaleren TIJDELIJKE quota-uitputting met een niet-opnieuw-probeerbare HTTP-status. `agentrouter.org` retourneert `403` (soms `400`) met een Chinese body
(`用户额度不足` / `额度不足`) in plaats van de standaardwaarde `429`. Clients zoals Claude
Code beschouwen `403` als permanent en breken de sessie af. Zonder correctie zou de fallback-engine de fout classificeren als `AUTH_ERROR` in plaats van als een quota-event.

**Implementatie:**

- Register + matcher: `open-sse/config/upstreamStatusRestatement.ts` — een
  lijst met regels per provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), gematcht via `applyStatusRestatement()`.
- Aanroeppunt: het blok `providerFailure:` in `open-sse/handlers/chatCore.ts`
  (rond regel 3654), direct nadat `parseUpstreamError()` een upstream-antwoord
  met een foutieve HTTP-status heeft geparseerd (`!providerResponse.ok`), en
  voordat enige classificatie wordt uitgevoerd, zodat elke downstream-consument
  de gecorrigeerde status ziet. Fouten die zijn ingebed in een `200` SSE-stream
  volgen een afzonderlijk, later pad voor stream-parsing en vallen vandaag **niet**
  onder deze hook — een bekende beperking, die voor de misstatus van agentrouter
  nog niet nodig is (deze verschijnt als een foutieve HTTP-status).
- Geschiktheid voor opnieuw proberen: `429` staat in
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), zodat een herformuleerde
  fout een echte retry-periode bevat in plaats van als een dode `403` naar buiten
  te komen.
- De synthetische `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  is alleen wat het geherformuleerde antwoord aan de **client** vertelt; dit is
  niet zelf de interne cooldown-/lockoutduur van de verbinding — die wordt
  afzonderlijk bepaald door het mechanisme dat de geherformuleerde fout
  daadwerkelijk afhandelt (Connection Cooldown met oplopende backoff, §2,
  basiswaarde `3s` voor API-key-providers; of Model Lockout, §3, voor providers
  met quota per model zoals agentrouter). De router kan intern eerder opnieuw
  mogen proberen dan het venster van 60s dat aan de client wordt geadverteerd —
  opzettelijke marge, geen bug.

Permanente fouten (`无权访问模型` van agentrouter — geen toegang tot dit model)
worden NOOIT geherformuleerd: `excludeMarkers` blokkeert de regel zelfs wanneer
`textMarkers` overeenkomen, zodat de fout zijn oorspronkelijke status behoudt en
er nooit opnieuw voor wordt geprobeerd. De bijbehorende classificatieregel voor
providers (`agentrouter-model-access-denied` in `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, een gedeclareerde basis-cooldown van
`6h`) wordt geraadpleegd door `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_vóór_ de generieke vroege return voor de apikey-categorie `FORBIDDEN`, waarbij
dit wordt aangestuurd door `honorsRuleLockScope(provider)` (#10334 — momenteel
exclusief voor agentrouter via de allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in
`providerErrorRules.ts`). De gedeclareerde cooldown van 6 uur van de regel stroomt
door als `fallbackResult.baseCooldownMs`, maar wordt nog steeds verwerkt via het
bestaande lockout-pad per modelquota (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ongewijzigd door #10334 met uitzondering van de
bron van de cooldown): deze wordt begrensd tot `mlSettings.maxCooldownMs` van de
operator (standaard `1_800_000ms` / 30 min), net als elke andere model-lockout,
en de _opgeslagen lockoutreden_ blijft de bestaande hardgecodeerde `"forbidden"`,
niet de `"auth_error"` van de regel — alleen de cooldownduur wordt end-to-end
gehonoreerd, niet de redenstring. De verbinding zelf blijft actief;
zustermodellen op dezelfde verbinding worden niet beïnvloed.

Geherformuleerde quotafouten (`额度不足`) bereiken in productie een providerregel
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, zonder eigen gedeclareerde cooldown — de geschaalde standaard-
backoff van de persistentielaag is van toepassing). Sinds #10334 wordt `scope` op
`ProviderErrorRuleMatch` end-to-end gebruikt, maar **alleen** voor providers in
de allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
vandaag alleen `"agentrouter"`, aangestuurd via `honorsRuleLockScope()`). Voor elke
andere provider blijft `scope` informatief, precies zoals vóór #10334.
`checkFallbackError` geeft de scope van de gematchte regel door als
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) is de gedeelde guard die bevestigt dat een
`ruleScope` daadwerkelijk veilig kan worden gehonoreerd als een signaal voor de
hele verbinding dat zichzelf herstelt (scope `"connection"`, reden
`quota_exhausted`, nooit `permanent`, nooit `creditsExhausted` — een bescherming
tegen een toekomstige combinatie van scope `"connection"` met een permanente
accountstatus). Twee consumenten roepen deze aan:

- **Persistentie** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  in plaats van terecht te komen in de **per-model**-vergrendelingsvertakking
  van de passthrough-provider (agentrouter is `passthroughModels: true` →
  `hasPerModelQuota()` retourneert `true`), past dit een **tijdelijke
  verbindingsafkoelperiode** toe — `testStatus: "unavailable"` + `rateLimitedUntil`,
  nooit een terminale status (`credits_exhausted`/`banned`/`expired`) — zodat de
  verbinding zichzelf herstelt zodra de afkoelperiode verstrijkt, zonder dat
  handmatig opnieuw instellen van de credentials nodig is.
  Overgeslagen voor verbindingen met `disableCooling: true` (#2997): die opt-out
  valt in plaats daarvan terug op de vergrendeling per model (een gedocumenteerde
  afweging — zie de codecommentaar boven de vertakking).
- **Comboroutering binnen hetzelfde verzoek** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): dezelfde guard markeert de
  verbinding in de in-memory `exhaustedConnections`-set, met als sleutel
  `${provider}:${connectionId}`. Dit slaat alleen een resterend doel binnen
  HETZELFDE VERZOEK over dat _zelf al die exacte `connectionId`_ op zijn eigen
  doelobject bevat (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` vóór de lookup in `exhaustedConnections`) — een gewone
  combinatie met een modellijst, waarin sibling-doelen zelf geen vastgezette
  `connectionId` bevatten en er per dispatch slechts één wordt opgelost aan de
  hand van de `X-OmniRoute-Selected-Connection-Id`-header van de response,
  bereikt die sleutelovereenkomst nooit. In dat veelvoorkomende geval is de
  daadwerkelijke bescherming tegen het opnieuw gebruiken van het zojuist
  uitgeputte account door een resterende stap NIET deze Set — het is de
  persistentielaag hierboven (de `rateLimitedUntil` van de verbinding ligt nu
  in de toekomst), gecombineerd met deze guard die
  `transientRateLimitedProviders` voor de fout onderdrukt (zie "Ontwerp in twee
  fasen" en de codecommentaar bij de
  `isAgentrouterConnectionQuotaScope`-vertakking in `targetExhaustion.ts`): omdat
  deze Set ongemarkeerd blijft, wordt `combo.ts`'s force-allow
  `allowRateLimitedConnection` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`)
  NIET geactiveerd voor de resterende stappen van de provider, waardoor het
  `rateLimitedUntil`-filter van de credentialselectie (`src/sse/services/auth.ts:1238`)
  normaal wordt gerespecteerd en een resterende stap óf een andere, nog steeds
  in aanmerking komende agentrouter-verbinding kiest óf mislukt omdat er geen
  credentials beschikbaar zijn — hij forceert zichzelf niet terug naar de
  verbinding die deze vertakking zojuist heeft afgekoeld.

### Ontwerp in twee fasen: statusherformulering, daarna classificatie

Statusherformulering (`upstreamStatusRestatement.ts`) en
providerclassificatieregels (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) zijn afzonderlijke registers die beide op provider-id
en tekstmarkeringen indexeren, maar ze worden op verschillende plaatsen
uitgevoerd en hebben verschillende doelen: de herformulering herschrijft de
HTTP-status vroeg in `chatCore.ts`; classificatieregels kiezen de
fallback-`reason` en vergrendelings-`scope`
(`model` / `provider` / `connection`) binnen `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Classificatieregels zien alleen de volledige **fouttekst** (nodig om
tekstmarkeringen in de body, zoals `额度不足`, te vinden) voor providers die
vermeld staan in de `FULL_TEXT_RULE_PROVIDERS`-allowlist in
`providerErrorRules.ts` — momenteel alleen `"agentrouter"`. Voor elke andere
**ingebouwde catalogusprovider** geeft `checkFallbackError`
`getProviderErrorRuleMatch` alleen de gestructureerde fout door
(`{code, type}`), wat voldoende is voor regels op basis van
headers/status/code, maar blind is voor tekstmarkeringen in de body.
De helper `resolveRuleMatchBody()` voert deze selectie uit: volledige fouttekst
voor providers op de allowlist, anders de gestructureerde fout. Een
**ingebouwde** provider toevoegen aan `FULL_TEXT_RULE_PROVIDERS` is een
expliciete opt-in per provider — deze bestaat zodat het standaardpad voor elke
provider die niet op de lijst staat byte voor byte ongewijzigd blijft.

De `scope` van een regel (`model` / `provider` / `connection`) is een
afzonderlijke opt-in ten opzichte van `FULL_TEXT_RULE_PROVIDERS`:
`checkFallbackError` stelt deze alleen beschikbaar als
`fallbackResult.ruleScope`, en downstream-consumenten respecteren deze alleen
als iets anders dan een informatief label voor providers in de
`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-allowlist in hetzelfde bestand (aangestuurd
via `honorsRuleLockScope()` — momenteel alleen `"agentrouter"`). Zie
"Geherformuleerde quotafouten" hierboven voor wat een match met
`scope: "connection"` daadwerkelijk doet zodra een provider op die allowlist
staat.

**#11104 — door de operator gedeclareerde regels omzeilen beide allowlists.**
Een operator kan tijdens runtime een regel per provider declareren via
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
zonder dit bestand te bewerken. Een operatorregel afhankelijk maken van
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlists
die bedoeld zijn om het **standaardgedrag** van ingebouwde catalogusregels te
beschermen — zou het instellingenmechanisme voor elke provider behalve de
providers die er al op staan inert maken, aangezien het declareren van de
regel al de expliciete opt-in van de operator is. Zowel
`resolveRuleMatchBody()` als `honorsRuleLockScope()` controleert eerst
`hasOperatorRuleForProvider()`: een provider met een operatorregel krijgt de
ruwe fouttekst en de gedeclareerde `scope` wordt gerespecteerd, ongeacht of
de provider ook in een van beide allowlists voorkomt.

**Door de operator gedeclareerde regels** (`OperatorProviderErrorRule`): elke
regel heeft een optionele `status` en een optionele `match` (een gewone,
hoofdletterongevoelige substring van de fouttekst, nooit een RegExp, zodat
deze geen ReDoS kan veroorzaken), en moet ten minste een van beide instellen.
Wanneer beide zijn ingesteld, worden ze met AND gecombineerd; een weggelaten
veld matcht alles, dus `{match: "insufficient_quota"}` matcht elke status die
die code bevat. De eerste overeenkomende regel wint. `cooldownMs` accepteert
maximaal 30 dagen; in totaal zijn maximaal 50 regels toegestaan.

**Allesomvattende standaardwaarden** (`settings.providerErrorDefaults`, opt-in, ingesteld via
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
met `cooldownMs` van 1 minuut tot 30 dagen. Een standaardwaarde wordt alleen toegepast
wanneer geen operatorregel en geen ingebouwde catalogusregel overeenkwam, en alleen voor
402-, 403-, 408-, 429- en 5xx-fouten. Fouten in de aanvraagvorm (400, 404, 409, 413, 422)
en kale 401-fouten behouden hun eigen afhandeling. Zonder expliciete `reason` komt de reden
uit de status, op dezelfde manier als `classifyError` dat doet. Het declareren van een
standaardwaarde telt als een operatorregel voor `hasOperatorRuleForProvider()`, waardoor de
`scope` (standaard `"connection"`) wordt gerespecteerd. De effectieve afkoelduur van een
standaardwaarde is de langste van zijn `cooldownMs` en de eigen retry-hint van de provider
(`Retry-After`, `x-ratelimit-reset` of een reset-hint in de body, dezelfde hint die de engine
respecteert wanneer de instelling "upstream retry hints gebruiken" voor connection-cooldown
is ingeschakeld), zodat een standaardwaarde een korte upstream-hint kan verlengen maar een
echte reset nooit voortijdig kan afkappen. Een expliciete operatorregel behoudt zijn exacte
`cooldownMs`. Noch een regel, noch een standaardwaarde omzeilt de
connection-cooldown-beveiligingen in `markAccountUnavailable`: een actieve, langere
afkoelperiode wordt nooit verkort en een terminale status wordt nooit overschreven. De
ingebouwde tekstdetectoren die eerder in `checkFallbackError` worden uitgevoerd (credits
op, dagquotum, account gedeactiveerd) hebben nog steeds voorrang voor hun eigen zinnen.

**Bekende beperking — `providerRuleRegistry` wordt nooit geraadpleegd voor HTTP 400.**
De `BAD_REQUEST`-tak van `checkFallbackError` classificeert status 400 volledig via zijn
eigen patroonarrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, enz. in `accountFallback.ts`) en retourneert voordat de
`configuredRule`/`getProviderErrorRuleMatch`-tak erboven wordt bereikt.
Een ingebouwde catalogusregel (of een operatorregel) met `status: 400` is syntactisch geldig,
maar wordt nooit uitgevoerd. Momenteel richt geen bestaande regel zich op 400, dus in
productie wordt niets beïnvloed — maar voor een toekomstige 400-regel moet eerst deze tak
worden aangepast. Dat is een grotere wijziging dan het toevoegen van een regel (het
herclassificeert 400 voor elke provider die al afhankelijk is van het gedrag van de
patroonarray) en valt buiten de scope van het toevoegen van één providerregel.

### Een nieuwe gateway die quota verkeerd aanduidt toevoegen

1. Registreer één regelarray in `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Houd `textMarkers`
   providerspecifiek; hergebruik nooit generieke Engelse zinnen die botsen met
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Registreer optioneel classificatieregels in
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) om de juiste
   vergrendelingsscope te kiezen (`connection` voor accountbrede quota, `model` voor fouten
   per model). Deze stap heeft in productie alleen effect voor providers waarvan de regels de
   volledige fouttekst nodig hebben (body-markeringen): voeg de provider-id toe aan
   `FULL_TEXT_RULE_PROVIDERS` in hetzelfde bestand — anders geeft `checkFallbackError` de
   regel alleen de gestructureerde fout `{code, type}` en zal een bodytekstregel nooit
   live verkeer matchen.
   Regels die uitsluitend matchen op `status`/`headers` (zoals die van Opencode of Minimax)
   hebben deze opt-in niet nodig. Als de regel afzonderlijk `scope: "connection"` declareert
   en het de bedoeling is om een daadwerkelijke connection-brede afkoelperiode plus het
   overslaan van de combinatie voor dezelfde aanvraag te activeren (niet alleen een
   informatief label), voeg dan de provider-id toe aan
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in hetzelfde bestand — hiermee wordt het gebruik in
   de stijl van `isAgentrouterConnectionQuotaScope()` aangestuurd in
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) en
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); zonder deze toevoeging stroomt
   `scope` nog steeds door `fallbackResult.ruleScope`, maar doet niets er daadwerkelijk
   iets mee.
3. Voeg unittests toe die `tests/unit/upstream-status-restatement.test.ts`
   en `tests/unit/agentrouter-error-rules.test.ts` weerspiegelen (inclusief de
   `not-permanent`-/`not-creditsExhausted`-controles en — als de provider de allowlist
   nodig heeft — een test die bevestigt dat `resolveRuleMatchBody()` alleen voor die
   provider de volledige tekst retourneert).

Er zijn geen wijzigingen in `chatCore.ts`, `classifyError` of combo nodig.

#### Op egress-buckets gebaseerde vergrendeling (#10880)

Providers in `EGRESS_BUCKETED_LOCK_PROVIDERS` (de opencode-familie) worden behandeld
als upstream met IP-buckets (de gratis opencode-laag gebruikt IP-buckets, geen
account-buckets — zie #9611): een status-429 die als `quota_exhausted`
**of** `rate_limit_exceeded` is geclassificeerd, koelt elke verbinding uit de allowlisted
familie af waarvan het laatst bekende egress-IP overeenkomt met dat van de falende
verbinding, voordat de rotatie deze kan proberen
— waarmee N-1 gegarandeerd mislukte upstream-aanroepen worden voorkomen (dezelfde vorm als #10460/#10525).
`rate_limit_exceeded` is bewust opgenomen: op het `markAccountUnavailable`-pad matchen de
opencode-specifieke regels nooit (er worden geen headers/body doorgegeven aan
`checkFallbackError`, opencode staat niet in `FULL_TEXT_RULE_PROVIDERS`), dus een 429
waarvan de body de tekst over het abonnementsquota bevat ("monthly usage limit
reached") wordt door de quota-tekst-fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`;
afkoelduur van 1 uur) als `quota_exhausted` geclassificeerd voordat de
`status_429`-regel ooit wordt bereikt — terwijl een 429 zonder quota-tekst (eenvoudige
rate limiting) via de `status_429`-regel als `rate_limit_exceeded` wordt geclassificeerd
en de IP-familie nog steeds afkoelt. Voor een allowlisted provider is een IP-gebaseerde
rate limit hetzelfde signaal als een uitgeput quota. Eerlijke limieten:

- **Best-effort**: de lock haalt de laatst bekende `egress_ip` van de verbinding
  op uit `proxy_logs` (venster van 24 uur, synchroon, zonder cache). Een koude
  cache (`egress_ip` is nooit geprobed) of geen rij → de falende verbinding
  wordt nog steeds door de branch gekoeld (zoals vandaag vastgelegd), alleen
  wordt er geen sibling gelockt.
- **Nooit terminaal**: de cooldown is een vernieuwend quotavenster
  (`testStatus: "unavailable"`); een permanente status wordt nooit afgeleid van
  een signaal op IP-niveau. Verbindingen met `disableCooling` slaan de branch
  volledig over.
- **De lockgranulariteit verandert voor de allowlisted family**: dit is een
  scopewijziging, niet alleen een optimalisatie voor siblings. opencode is een
  `passthroughModels`-provider, dus vóór deze branch veroorzaakte een 429 een
  lockout per MODEL; nu veroorzaakt die een cooldown voor de verbinding — ook
  voor een operator die slechts één verbinding gebruikt en helemaal geen sibling
  heeft. Dat is de granulariteit die de opencode-regeltabel al als correct
  verklaart (`scope: "connection"`,
  `providerErrorRules.ts`), maar die tot nu toe nooit werd gerespecteerd omdat
  opencode niet in `HONORS_RULE_LOCK_SCOPE_PROVIDERS` staat. De branch schrijft
  zelf de cooldown van de falende verbinding + `backoffLevel`, naar analogie van
  de connection-scoped agentrouter-branch, en retourneert — het blok per model
  en het generieke pad hieronder worden nooit bereikt.
- **Combo inbegrepen**: net als de agentrouter-branch negeert de scope bewust de
  `persistUnavailableState`/`isCombo`-downgrade die een combo-caller toepast op
  een 429. Een lockout per model is geen zwakkere vorm van deze scope, maar de
  verkeerde eenheid: die zegt niets over het uitgeputte IP, waardoor de
  combo-rotatie per sibling één gegarandeerd mislukte call zou blijven
  verbruiken.
- **Sibling-veiligheid**: een sibling die al terminaal is (banned/credits_exhausted)
  of al een langere cooldown heeft, wordt nooit overschreven.
- **Exclusieve allowlist**: het uitbreiden van `EGRESS_BUCKETED_LOCK_PROVIDERS` is een
  expliciete beslissing van de eigenaar; er is geen generieke wiring (pattern #10334/#10419).
  De sibling-query bindt aan diezelfde allowlist in plaats van deze als een
  SQL-literal te herhalen, zodat het uitbreiden ervan een wijziging van één
  regel blijft.
- **Rotatie van het egress-IP, beide richtingen**: het opzoekvenster (24 uur) is
  veel ruimer dan de TTL van de egress-IP-cache (5 min), dus "laatst bekende IP"
  is geschiedenis, niet de huidige status. Als de proxy van een verbinding
  binnen het venster is geroteerd, kan de lock een werkelijk gedeeld IP
  **missen** (het vastgelegde IP is het nieuwe, niet-uitgeputte IP) — en
  symmetrisch kan de lock een sibling afkoelen die inmiddels is
  **weggeroteerd** van het uitgeputte IP. In het tweede geval kost dit die
  sibling één cooldownvenster; beide gevallen zijn aanvaarde best-effortbeperkingen
  van een op geschiedenis gebaseerde lookup.
- **Kosten**: twee begrensde scans van `proxy_logs` (gefilterd op venster via
  `idx_pl_timestamp`), alleen bij een frequentie van 429. Geen nieuwe index (migration 134
  YAGNI). Gemeten op een DB-kopie met echt verkeer van gemiddelde omvang; een
  instance met hoge throughput bevat verhoudingsgewijs meer rijen in hetzelfde
  venster.

## Andere veerkrachtfuncties

- **22 routeringsstrategieën** (prioriteit, gewogen, round-robin, context-relay, eerst vullen, p2c, willekeurig, minst gebruikt, kostengeoptimaliseerd, reset-bewust, reset-venster, vervaldatum eerst, vrije ruimte, quota-gewogen, strikt willekeurig, auto, lkgp, context-geoptimaliseerd, cache-geoptimaliseerd, fusie, pijplijn, jev) — zie [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-bewuste routering** (v3.8.0) — geeft prioriteit aan verbindingen op basis van de resettijd van de quota.
- **Verslechtering van de achtergrondmodus** — Reacties API `background: true` gedegradeerd om te synchroniseren met waarschuwing.
- **Dynamische gereedschapslimietdetectie** — trekt zich terug als de limieten voor het aantal gereedschappen worden bereikt.
- **Noodterugval** — gecontroleerd door `OMNIROUTE_EMERGENCY_FALLBACK`; operators kunnen dit overschrijven vanaf de pagina Functievlaggen zonder opnieuw op te starten.

---

## Foutopsporing

- Weighted-combo antwoordt `503 all_targets_cooling_down` (`Retry-After` ingesteld, `diagnostics.excluded` toont elk doel met `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → de pool is geconfigureerd en verbonden, elk doel is simpelweg uitgesloten door een resilientie-timer; de waarschuwing `[COMBO] Weighted selection: every target excluded before dispatch — …` noemt de redenen en de resterende seconden. Een `404 no_executable_targets` van dezelfde combo betekent dat er geen resilientie-timer in het spel was (niets om uit te voeren, of elk account faalde de beschikbaarheidstest). Gebouwd in `open-sse/services/combo/pinRecovery.ts` op basis van de uitsluitingen die in `targetResolution.ts` worden verzameld.
- Alle sleutels voor een provider overgeslagen → controleer zowel de circuitbreaker-status ALS de `rateLimitedUntil`/`testStatus` van elke verbinding.
- Provider permanent uitgesloten na het resetvenster → code die de ruwe `state` leest in plaats van `getStatus()`/`canExecute()`.
- Eén sleutel faalt, anderen zouden moeten werken → geef de voorkeur aan connection-cooldown boven de circuitbreaker.
- Slechts één model faalt → geef de voorkeur aan model-lockout boven connection-cooldown.
- Status zou zichzelf moeten herstellen maar doet dat niet → controleer op een toekomstige timestamp plus een leespad dat verlopen status ververst. Permanente statussen vereisen handmatige wijzigingen.

---

## Runtime-status — snelreferentie voor de agent

> Letterlijk overgenomen uit `AGENTS.md` → "Resilience Runtime State" (PR #12743), zodat de
> agentgids onder het contextbudget van 40k blijft. Het is de gecondenseerde, op de agent
> gerichte weergave van de bovenstaande secties; de genummerde secties blijven de volledige referentie.

OmniRoute heeft drie verwante maar distincte mechanismen voor tijdelijke fouten. Houd hun
scope gescheiden bij het debuggen van routeringsgedrag. Zie het
[3-lagen-resilientiediagram](../diagrams/exported/resilience-3layers.svg)
(bron: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
voor een overzicht in één oogopslag.

### Provider-circuitbreaker

**Scope**: de hele provider, bijv. `glm`, `openai`, `anthropic`.

**Doel**: stop met het versturen van verkeer naar een provider die herhaaldelijk faalt op
upstream-/serviceniveau, zodat één ongezonde provider niet elk verzoek vertraagt.

**Implementatie**:

- Kernklasse: `src/shared/utils/circuitBreaker.ts`
- Koppeling van chat-gate/uitvoering: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime-status-API: `src/app/api/monitoring/health/route.ts`
- Gedeelde wrappers: `open-sse/services/accountFallback.ts`
- Tabel met gepersisteerde status: `domain_circuit_breakers`

**Statussen** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normaal verkeer is toegestaan.
- `DEGRADED`: vroege-waarschuwingszone — fouten overschreden de degradatiedrempel maar nog niet
  de breaker-drempel; verkeer stroomt nog steeds, dashboards tonen de waarschuwing. Een geldige
  verbindingstest of een rustig venster zonder nieuwe fout zet de status terug op `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` bevat het venster).
- `OPEN`: de provider is tijdelijk geblokkeerd; aanroepers krijgen een provider-circuit-open-antwoord
  of de comboroutering schakelt over naar een ander doel.
- `HALF_OPEN`: de reset-timeout is verstreken; sta een testverzoek toe. Bij succes sluit de
  breaker, bij falen opent hij opnieuw.

**Standaardwaarden** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, geconsumeerd via
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` in `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` in `src/sse/handlers/chatHelpers.ts`). De breaker voor de hele
provider draait op `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profiel     | degradeert bij | opent bij (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ----------- | -------------: | ------------------------------------: | ----------------------------: |
| OAuth       |            `5` |                                   `8` |                         `60s` |
| API-sleutel |            `7` |                                  `12` |                         `30s` |
| Lokaal      |     (afgeleid) |                                   `2` |                         `15s` |

`PROVIDER_PROFILES` definieert ook `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) en `providerCooldownMs` (5/10/1 min): deze drijven de
**venstergate van de opt-in globale Provider Cooldown** aan (`PROVIDER_COOLDOWN_ENABLED`, standaard
uit) — een vermelding op providerniveau in `open-sse/services/providerCooldownTracker.ts` telt pas
als coolend na `providerFailureThreshold` fouten binnen `providerFailureWindowMs`, en koelt dan
gedurende `providerCooldownMs`. Het zijn NIET de drempels van de actieve breaker — stem ze niet af
in de verwachting dat ze het breakergedrag beïnvloeden. Elke standaardwaarde kan worden overschreven
via de env-variabelen `OMNIROUTE_PROVIDER_BREAKER_*` en `OMNIROUTE_CIRCUIT_BREAKER_*`; de
runtime-nauwkeurige referentietabel staat in `docs/architecture/RESILIENCE_GUIDE.md`.

Alleen foutstatussen op providerniveau mogen de provider-breaker activeren:

```ts
(408, 500, 502, 503, 504);
```

Activeer de breaker voor de hele provider niet bij normale account-/sleutel-/modelfouten zoals de
meeste `401`-, `403`- of `429`-gevallen. Die horen meestal bij connection-cooldown of
model-lockout. Een generieke `403` van een API-sleutelprovider moet herstelbaar zijn, tenzij deze
is geclassificeerd als een terminale provider-/accountfout.

De breaker gebruikt lazy recovery, geen achtergrondtimer. Wanneer `OPEN` verloopt, verversen leesbewerkingen zoals `getStatus()`, `canExecute()` en `getRetryAfterMs()` de status naar `HALF_OPEN`, zodat dashboards en bouwers van combinatiekandidaten een verlopen provider niet voor altijd blijven uitsluiten.

### Verbindingscooldown

**Scope**: één providerverbinding/account/sleutel.

**Doel**: tijdelijk één slechte sleutel/account overslaan terwijl andere verbindingen voor dezelfde provider verzoeken kunnen blijven afhandelen.

**Implementatie**:

- Schrijf-/updatepad: `src/sse/services/auth.ts::markAccountUnavailable()`
- Accountselectie/-filtering: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldownberekening: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Instellingen: `src/lib/resilience/settings.ts`

Belangrijke velden op providerverbindingen:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Tijdens accountselectie wordt een verbinding overgeslagen zolang:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowns zijn ook lazy: wanneer `rateLimitedUntil` in het verleden ligt, komt de verbinding weer in aanmerking. Bij succesvol gebruik wist `clearAccountError()` de velden `testStatus`, `rateLimitedUntil`, de foutvelden en `backoffLevel`.

Standaardgedrag van verbindingscooldown:

- OAuth-basiscooldown: `5s`.
- API-sleutel-basiscooldown: `3s`.
- Een API-sleutel-`429` moet de voorkeur geven aan retry-hints van upstream (`Retry-After`, reset-headers of parseerbare reset-tekst) wanneer deze beschikbaar zijn.
- Herhaalde herstelbare fouten gebruiken exponentiële backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

De anti-thundering-herd-beveiliging voorkomt dat gelijktijdige fouten op dezelfde verbinding de cooldown herhaaldelijk verlengen of `backoffLevel` dubbel verhogen.

Terminale statussen zijn geen cooldowns. `banned`, `expired` (die pas terminaal wordt na N begrensde pogingen via `EXPIRED_RETRY_MAX`) en `credits_exhausted` zijn bedoeld om onbeschikbaar te blijven totdat credentials/instellingen wijzigen of een operator ze reset. Overschrijf terminale statussen niet met tijdelijke cooldown-status.

### Model-lockout

**Scope**: provider + verbinding + model.

**Doel**: voorkomen dat een hele verbinding wordt uitgeschakeld wanneer slechts één model onbeschikbaar is of een quotumlimiet heeft voor die verbinding.

Voorbeelden:

- Providers met quota per model die `429` retourneren.
- Lokale providers die `404` retourneren voor één ontbrekend model.
- Providerspecifieke machtigingsfouten voor modus/model, zoals geselecteerde Grok-modi.

Model-lockout bevindt zich in `open-sse/services/accountFallback.ts` en laat dezelfde verbinding andere modellen blijven bedienen.

### Richtlijnen voor debugging

- Als alle sleutels voor een provider worden overgeslagen, inspecteer dan zowel de breaker-status van de provider als de `rateLimitedUntil`/`testStatus` van elke verbinding.
- Als een provider na het resetvenster permanent uitgesloten lijkt, controleer dan of de code de ruwe `state` leest in plaats van `getStatus()`/`canExecute()` te gebruiken.
- Als één providersleutel faalt maar andere zouden moeten werken, geef dan de voorkeur aan verbindingscooldown boven de provider-breaker.
- Als slechts één model faalt, geef dan de voorkeur aan model-lockout boven verbindingscooldown.
- Als een status zichzelf moet herstellen, moet deze een toekomstige timestamp/reset-timeout hebben en een leespad dat verlopen status ververst. Permanente statussen vereisen handmatige wijzigingen van credentials of configuratie.

---

## TLS-fingerprinting & stealth

Providerspecifieke stealth (JA3/JA4, CCH, obfuscatie) is apart gedocumenteerd — zie `docs/security/STEALTH_GUIDE.md` (git; niet meegecompileerd in `/docs`).

---

## Veerkrachttests (fase 8 · blok C)

Naast unittesten voor de veerkrachtlogica oefenen drie tests de runtime onder
echte stress- en faalomstandigheden (allemaal integratie/nightly — geen ervan blokkeert PR's):

| Test        | Wat                                                                                                                                                                                    | Uitvoeren                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Fake-upstream-node injecteert echte latency/reset/timeout/503; valideert dat de circuit breaker opent/herstelt en dat `checkFallbackError` 503 classificeert als herstelbare fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streams per `createSSEStream` onder `--expose-gc`; faalt als de heap de bovengrens overschrijdt (OOM-beveiliging #3069).                                                          | `npm run test:heap`                      |
| k6 soak     | Aanhoudende belasting op `/api/monitoring/health`; p95-/foutdrempels.                                                                                                                  | `k6 run tests/load/k6-soak.js` (nightly) |

Georkestreerd door `.github/workflows/nightly-resilience.yml` (cron + dispatch). In de
standaard `test:integration` slaan chaos en heap zichzelf over (zonder `RUN_CHAOS_INT`/`--expose-gc`).

---

## Zie ook

- [Architectuurhandleiding](./ARCHITECTURE.md) — Systeemarchitectuur en interne werking
- [Gebruikershandleiding](../guides/USER_GUIDE.md) — Providers, combo's, CLI-integratie
- [Auto-Combo-engine](../routing/AUTO-COMBO.md) — 16-factor-scoring, moduspakketten
