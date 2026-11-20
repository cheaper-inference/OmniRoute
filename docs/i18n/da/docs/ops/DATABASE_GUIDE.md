# Database Schema & Operations Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Kort fortalt**: OmniRoute bruger **SQLite med WAL-journalføring** som sit primære datalager med **AES-256-GCM**-kryptering af følsomme felter i hvile. Denne vejledning dækker skemaet, migreringer, sikkerhedskopiering/gendannelse og driftsprocedurer.

**Kilder:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 basistabeller)
- `src/lib/db/migrationRunner.ts` — versionsstyrede migreringer
- `src/lib/db/migrations/` — 167 versionsstyrede SQL-filer
- `src/lib/db/encryption.ts` — hjælpefunktioner til kryptering
- `src/lib/db/backup.ts` — eksport/import af sikkerhedskopier
- `src/lib/db/healthCheck.ts` — tilstandsdiagnostik

---

## Hvorfor SQLite?

OmniRoute valgte SQLite frem for PostgreSQL/MySQL af flere årsager:

| Faktor                  | SQLite                                            | PostgreSQL                                     |
| ----------------------- | ------------------------------------------------- | ---------------------------------------------- |
| **Udrulning**           | Integreret — ingen separat server                 | Kræver serveropsætning                         |
| **Kryptering**          | Applikationslag (AES-256-GCM)                     | Indbygget TDE                                  |
| **Ydeevne**             | Hurtigere til små/mellemstore arbejdsbelastninger | Bedre til enorme mængder samtidige skrivninger |
| **Samtidighed**         | WAL-tilstand tillader samtidige læsninger         | Fuld MVCC                                      |
| **Sikkerhedskopiering** | Kopiering af én enkelt fil                        | `pg_dump` eller snapshot af filsystemet        |
| **Anvendelse**          | Installation pr. bruger, integreret               | SaaS med flere lejere                          |

Til udrulninger med **én bruger og én instans** (det primære anvendelsesscenarie for OmniRoute) er SQLite enklere og hurtigere.

### WAL-journalføring

`core.ts` åbner databasen i **WAL-tilstand (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL tillader **samtidige læsninger** under skrivninger — hvilket er vigtigt for kontrolpanelet, der udfører forespørgsler, mens anmodninger registreres.

Standardstørrelsen for cachen er **65.536 KiB (64 MiB)**. SQLite fortolker en negativ
`cache_size` som en omtrentlig øvre grænse i KiB og allokerer sider efter behov.
**Indstillinger > System og lager > Cachestørrelse** accepterer heltalsværdier fra **1 til
1.000.000 KiB**. Når indstillingen gemmes, anvendes den på den aktive databaseforbindelse,
og OmniRoute gendanner den gemte værdi ved opstart.

---

## Databaseplacering

SQLite-filen gemmes på:

| Operativsystem | Sti                                                          |
| -------------- | ------------------------------------------------------------ |
| Linux          | `~/.omniroute/storage.sqlite`                                |
| macOS          | `~/.omniroute/storage.sqlite`                                |
| Windows        | `%USERPROFILE%\.omniroute\storage.sqlite`                    |
| Docker         | `/app/data/storage.sqlite` (kan konfigureres via `DATA_DIR`) |

Tilhørende filer:

- `storage.sqlite-wal` — write-ahead-log
- `storage.sqlite-shm` — delt hukommelsesfil
- `call_logs/` — artefakter for anmodningsdata (hvis aktiveret)

**Tilsidesæt placeringen:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domænemodularkitektur

OmniRoutes database har **110 TypeScript-moduler på topniveau** i `src/lib/db/`. Hvert domænemodul:

- Ejer en eller flere specifikke tabeller
- Eksporterer typede CRUD-funktioner
- Tilgår aldrig et andet moduls tabeller
- Bruger `getDbInstance()` fra `core.ts` til at tilgå databasen

### De 110 databasemoduler på topniveau

OmniRoute har **110 TypeScript-filer på topniveau** i `src/lib/db/`. Nedenfor ses et udvalg af kernemodulerne; se mappeoversigten for den komplette liste:

| Modul                   | Tabeller                                                       | Ansvar                                                                      |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registrering af udbydere og legitimationsoplysninger via OAuth/API-nøgle    |
| `models.ts`             | `key_value` (modeldata)                                        | Modeldefinitioner, funktioner og priser                                     |
| `combos.ts`             | `combos`                                                       | Konfiguration og rækkefølge for combo-routing                               |
| `apiKeys.ts`            | `api_keys`                                                     | API-nøglers livscyklus, scopes og kvotesporing                              |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Systemkonfiguration og delt KV-lager                                        |
| `backup.ts`             | —                                                              | Eksport- og importhandlinger for sikkerhedskopier                           |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxykonfigurationer og routingregler                                       |
| `prompts.ts`            | `prompt_templates`                                             | Genanvendelige promptskabeloner og versionering                             |
| `webhooks.ts`           | `webhooks`                                                     | Hændelsesdrevne webhookabonnementer og logfiler                             |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Revisionslogning pr. anmodning (valgfrit, stor datamængde)                  |
| `domainState.ts`        | `domain_*` (5 tabeller)                                        | Domænebudgetter, circuit breakers, spærringer, fallback-kæder, prishistorik |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Godkendte API-nøgler til MCP/A2A                                            |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historisk kvoteforbrug                                                      |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Knyt modeller til standard-combos                                           |
| `cliToolState.ts`       | `cli_tool_state`                                               | Vedvarende CLI-specifik tilstand                                            |
| `encryption.ts`         | —                                                              | Hjælpefunktioner til kryptering/dekryptering af felter                      |
| `readCache.ts`          | —                                                              | Cache i hukommelsen til læseintensive handlinger                            |
| `secrets.ts`            | `key_value` (krypterede poster)                                | Krypteret lagring af hemmeligheder                                          |
| `stateReset.ts`         | —                                                              | Ryd/nulstil databasetilstanden til test                                     |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Sessionskontekst til overdragelse mellem agenter                            |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Forbrugssporing                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Komprimeringskonfiguration                                                  |

### Modulgrænser

En central arkitekturregel er: **Moduler tilgår ikke hinandens tabeller direkte**. For at arbejde med data fra et andet modul skal funktionen importeres fra det pågældende modul.

```ts
// ❌ FORKERT: direkte SQL fra et andet modul
db.prepare("SELECT * FROM provider_connections").all();

// ✅ RIGTIGT: brug funktionen fra providers-modulet
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Denne regel håndhæves gennem kodegennemgang — der er ingen statisk kontrol, men overtrædelser markeres.

---

## Basisskema (17 tabeller)

`core.ts` definerer de 17 basistabeller i `SCHEMA_SQL`. Disse oprettes af migreringen `001_initial_schema.sql` og udgør kerneskemaet.

### Kernetabeller (oprettet i den indledende migrering)

| Tabel                      | Formål                                        | Nøglekolonner                                                           |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Udbyderlegitimationsoplysninger (krypterede)  | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Oplysninger om routing af udbydernoder        | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Generelt KV-lager                             | `namespace`, `key`, `value`                                             |
| `combos`                   | Definitioner af routingkombinationer          | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API-nøgler til gatewayen                      | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Databasemetadata                              | `key`, `value`                                                          |
| `usage_history`            | Registreringer af anmodningsforbrug           | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Anmodningsdata og svar                        | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logfiler for proxyanmodninger                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Model-til-udbyder-kæder                       | `model`, `chain`                                                        |
| `domain_budgets`           | Forbrugsbudgetter pr. domæne                  | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historik over budgetnulstillinger             | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Omkostningssporing pr. domæne                 | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Tilstand for hastighedsbegrænsning pr. domæne | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Circuit breaker-tilstand pr. domæne           | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache til LLM-svar                            | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historiske kvoteøjebliksbilleder              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Yderligere tabeller (tilføjet af senere migreringer)

Efterfølgende migreringer tilføjer tabeller såsom:

- `cli_tool_state` (migrering 011) — tilstand for CLI-værktøj
- `mcp_*`-tabeller — revision af MCP-server
- `a2a_*`-tabeller — A2A-opgavetilstand
- `usage_*`-tabeller — forbrugssporing
- `plugin_*`-tabeller — pluginsystem
- `skill_executions` — historik over færdighedskørsler
- `memory_*`-tabeller — hukommelsessystem
- `compression_*`-tabeller — komprimeringssystem
- `webhook_*`-tabeller — log over webhook-leveringer
- `acp_*`-tabeller — Agent Client Protocol
- `oneproxy_*`-tabeller — 1proxy-markedsplads
- `proxy_assignments` — bindinger af proxyomfang
- `detailed_call_artifacts` — metadata for kaldslogartefakter
- `quota_alert_history` — revision af kvoteadvarsler
- `command_code_auth_sessions` — Command Code OAuth-sessioner

Den fulde liste med ca. 30+ tabeller findes i `src/lib/db/migrations/`.

---

## Migrationer

OmniRoute bruger** versionerede, idempotente migrationer** i `src/lib/db/migrations/`. Hver migrering er en enkelt SQL fil. To navngivningsformater eksisterer side om side; versionen registreret i `_omniroute_migrations` er det numeriske præfiks.

### Navngivning af migration

| Format                                           | Eksempel                             | Bruges til                                                                                                                                                    |
| ------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (præcis 3 cifre)           | `241_seen_models.sql`                | Den gamle serie `001`–`241`. Frosset, da tidsstempelformatet landede (`240` og `241` blev slået sammen lige før det): ingen ny fil får et sekventielt nummer. |
| `YYYYMMDDHHMMSS_description.sql` (14 cifre, UTC) | `20261113120000_add_usage_index.sql` | Hver migrering oprettet fra 2026-11-13 og frem.                                                                                                               |

Hvorfor ændringen: med sekventielle tal valgte parallel PRs det samme næste tal, og alle undtagen én skulle omnummerere før de blev flettet. Et UTC -tidsstempel giver hver PR sin egen version.

Regler for tidsstempelformatet (håndhævet af `npm run check:migration-numbering`, delt med generatoren i `scripts/check/lib/migrationNaming.mjs`):

- Tidsstemplet er en rigtig UTC dato og -tid, ikke tidligere end `20261113000000` og ikke mere end 10 minutter i fremtiden.
- Beskrivelsen er små `snake_case` begyndende med et bogstav (`a-z`, `0-9`, enkelt `_` mellem ord), højst 80 tegn.
- To filer med samme tidsstempel er en dublet.
- No-gap-reglen gælder kun for den gamle serie: hvert tal fra `001` til `241` skal eksistere, undtagen de kendte mellemrum `026`, `055` og `121`. Sletning af `241` (eller en hvilken som helst gammel fil) fejler porten. `001` og `241` kan aldrig føjes til `KNOWN_GAPS` tilladelseslisten. Tidsstemplede filer skaber aldrig et hul.
- Hver post i `src/lib/db/migrations/` skal være en almindelig fil med et gyldigt `.sql` navn med små bogstaver. En mappe, et symbollink, en `.SQL` eller `.sql.bak` -fil, en skjult fil eller et navn med et mellemrum svigter porten, fordi løberen ville springe den over lydløst eller crashe ved opstart.

**Anvend ordre.** Løberen sorterer efter den numeriske værdi af præfikset, ikke efter tekst: de gamle `001`–`241` filer først, derefter de tidsstemplede filer i tidsstempelrækkefølge, derefter eventuelle navneinddelte mapper, der er registreret med `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (versioner såsom `ee-001`). En afventende migrering er enhver fil, hvis version ikke er i `_omniroute_migrations`, så en migrering fra en ældre gren, der flettes efter en nyere, gælder stadig på eksisterende databaser.

**Tidsstemplet er oprettelsesrækkefølge, ikke fusionsrækkefølge.** Hvis din migrering afhænger af en tabel eller kolonne oprettet af en migrering med en** nyere** tidsstempel (for eksempel en fra en anden PR, der fusionerede først), ville en frisk database køre din først og mislykkes. Mens din PR stadig er åben, gendan filnavnet med `npm run db:new-migration` så det får et nyere tidsstempel, eller gør det uafhængigt. `npm run test:migrations:fresh` anvender hver migrering til en tom database og fanger dette.

### En flettet migrering bliver aldrig slettet eller omdøbt

Når en migreringsfil er på en udgivelsesgren eller `main`, har den allerede kørt på homolog- og udviklerdatabaser, på VPS installationer og i Enterprise-synkroniseringen. Fra da af:

- **Slet det aldrig.** Friske installationer ville miste sit skema, mens opgraderede databaser beholder det.
- **Omdøb det aldrig.** Versionen i `_omniroute_migrations` ville ikke længere matche en fil, så hver database, der allerede har anvendt den, ville køre den igen. Ikke-idempotent SQL dublerer derefter data eller stopper opstarten.
- **Har du brug for et andet skema?** Opret en ny migrering med `npm run db:new-migration`.

Omdøbning er kun sikkert for en fil, der ikke er flettet endnu, hvilket er tilfældet, som portens tip henviser til. Et frigivelsesmærke ændrer intet her: hvert tryk til en `release/v*` -gren udgiver Docker `:next` billedet og kører på homolog, VPS installationer og Enterprise-synkroniseringen, så en fusioneret migrering er kørt på rigtige databaser, før der eksisterer nogen `vX.Y.Z` tag. Gaten fejler hver fjernelse af en basisfil, tagget eller ej.

- **Tilbageførsel af en flettet migrering.** En `git revert`, der sletter filen, svigter porten. Behold filen og fortryd dens skema i en ny migrering: `npm run db:new-migration -- <description>`, med `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` og så videre. Opgraderede og friske databaser slutter derefter med det samme skema.
- **Den ene accepterede omdøbning: en kompatibilitetsindgang og identisk indhold.** Hvis en flettet fil skal flyttes (f.eks. deler to flettede filer et tidsstempel, og løberen stopper med en versionskollision), omdøb den senere uden at røre dens SQL og føj `{ fromVersion, fromName, toVersion, toName }` til `RENAMED_MIGRATION_COMPATIBILITY` i `src/lib/db/migrationRunner/constants.ts`. Databaser, der anvendte den gamle version, får deres `_omniroute_migrations` række flyttet i stedet for at køre filen igen. Porten advarer om et sådant omdøbning og kører altid kommuteringstjekket på det, uanset det nye tidsstempel: friske installationer anvender filen på dens nye position, opgraderede databaser gør det ikke, så vælg et nyt tidsstempel nær det gamle. Gaten mislykkes i omdøbningen, hvis indholdet ændres (en skemaændring fortsætter i en ny migrering), eller hvis indgangens målfil ikke er på disken.
- **Omdøb aldrig inden for samme tidsstempel.** Et omdøbning, der beholder tidsstemplet og kun ændrer beskrivelsen, svigter porten, med eller uden en indgang. Med en post, hvis `toVersion` er lig med dens `fromVersion`, sletter løberen den gamle `_omniroute_migrations` række og anvender filen igen på hver database, der allerede har kørt den. Uden en indtastning sporer løberen kun versionen: den springer filen over i disse databaser (nyt indhold kører aldrig der) og logger en omnummereringsfejl ved hver opstart. Brug et andet tidsstempel plus en kompatibilitetspost, eller behold navnet.
- **Gaten kontrollerer, at den omdøbte fil ikke kører igen.** For hvert dækket omdøb sender porten det nye filnavn til kommuteringskontrollen med `--must-not-apply`. Checken starter den opgraderede database med den rigtige runner, og hvis runneren anvender den fil igen (for eksempel fordi posten har en forkert version eller navn, eller fordi portens tekstparser læser `constants.ts` anderledes end TypeScript), fejler porten med `migration renomeada rodaria de novo` og beder dig kontrollere postens gamle og nye versioner og navne.

### Hvad porten tjekker mod basen

Ved pull request og merge-queue-kørsler sammenligner `npm run check:migration-numbering` `src/lib/db/migrations/` på disken med den samme mappe på basisgrenen. Basen er i denne rækkefølge: `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` -variablen, eller, når `GITHUB_EVENT_NAME` er `pull_request`, `pull_request_target` eller `merge_group`, den første forælder af flette-commit, `merge_group.base_sha` for begivenhedens nyttelast eller `git merge-base HEAD origin/$GITHUB_BASE_REF`. I en pull-anmodning eller en merge-queue-kørsel uden nogen løselig base fejler porten. Uden for CI uden `--base` udskriver den `comparação com a base: pulada (sem --base)` og springer disse regler over.

`--base-latest-tag` sammenligner med den nyeste udgivelses-tag (`vX.Y.Z` i semver-rækkefølge; tags med suffikser såsom nightlies tæller ikke), der er i historien om `HEAD`, med de samme regler som `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) kører porten på denne måde, fordi push og planlagte kørsler ikke har nogen pull-anmodningsbase, og en merge kan lande uden en ny CI kørsel. Uden et frigivelsesmærke i historien svigter porten; kør `git fetch --tags` (i CI bringer `actions/checkout` med `fetch-depth: 0` tags).

| Ændre på pull-anmodningen                                                                                               | Resultat                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| En fil, der findes på basen, omdøbes med en `RENAMED_MIGRATION_COMPATIBILITY` indgang                                   | **Advarsel** hvis indholdet er identisk, og kommuteringskontrollen kører uanset det nye tidsstempel; det mislykkes, hvis den nye position ændrer det endelige skema (fortryd omdøbningen, eller vælg et andet nyt tidsstempel, hvor det pendler), eller hvis løberen ville anvende den omdøbte fil igen på en opgraderet database.** Mislykkes** hvis indholdet ændrede sig. |
| En fil, der eksisterer på basen, omdøbes, mens dens tidsstempel bevares (kun beskrivelsen ændres)                       | **Mislykkes** , med eller uden en post: løberen ville anvende den igen (med posten) eller springe den over efter version (uden en). Brug et andet tidsstempel plus en kompatibilitetspost, eller behold navnet.                                                                                                                                                              |
| En fil, der findes på basen, slettes eller omdøbes uden en indtastning                                                  | **Mislykkes** , uanset om filen er i et frigivelsesmærke eller ej. For at fortryde det, gendan filen med `git checkout <base> -- src/lib/db/migrations/<file>`; for at vende dets skema tilbage, tilføj en ny migrering med `DROP ... IF EXISTS`.                                                                                                                            |
| En fil, der findes på basen, har forskelligt indhold                                                                    | **Advarsel** (en `::warning` -annotation i GitHub Actions), og kommuteringskontrollen kører. Det mislykkes, hvis redigeringen ændrer det endelige skema, fordi opgraderede databaser ikke anvender den redigerede fil igen: indsæt ændringen i en ny migrering. En harmløs redigering (en kommentar, `IF NOT EXISTS`) advarer kun.                                           |
| En tidsstemplet fil tilføjes med et tidsstempel, der ikke er nyere end basens nyeste                                    | Kører kommuteringstjekket, beskrevet nedenfor.                                                                                                                                                                                                                                                                                                                               |
| En `NNN_` fil i gammelt format tilføjes med et nummer under basens nyeste fil i gammelt format                          | **Mislykkes** , selvom `KNOWN_GAPS` er redigeret i den samme pull-anmodning: den gamle serie er frosset, skal du oprette migreringen med `npm run db:new-migration`. Gammelt format filer over basens nyeste (en `release/v*` til `main` pull anmodning) accepteres.                                                                                                         |
| En fil, der ikke er i orden, redigeret eller omdøbt, indeholder `INSERT`, `UPDATE`, `DELETE` eller `REPLACE` -sætninger | **Advarsel** : kommuteringskontrollen sammenligner ikke data, så tjek om den rækkefølge, som opgraderede og friske databaser anvender dem i, ændrer resultatet.                                                                                                                                                                                                              |

En kørsel af kommuteringskontrollen dækker de ude af rækkefølge, de redigerede og de omdøbte filer sammen.

Kommuteringskontrollen (`scripts/check/migration-commutation.ts`) bygger to midlertidige databaser med den rigtige installationssti: en** opgraderet** en (start med basismigreringerne, og start derefter igen på den samme fil med pull-anmodningens migreringer) og en** frisk** én (én boot med pull-anmodningens migreringer). Den sammenligner de resulterende skemaer: tabeller og kolonner (ignorerer kolonnerækkefølge), UNIQUE / PRIMARY KEY og FOREIGN KEY -begrænsninger, den normaliserede `CREATE TABLE` tekst i hver tabel (som dækker CHECK begrænsninger, sammenstillinger, genererede kolonner og tabelindstillinger), indekser, udløsere og visninger. Rækkedata sammenlignes ikke. Hvis de matcher, udskriver porten, at filen er ude af drift, men pendler, og passerer. Hvis de er forskellige, svigter porten med forskellen og et hint til sagen: for en fil, der ikke er i orden, gendan dens navn med `npm run db:new-migration`, hvilket er sikkert, fordi filen ikke er flettet endnu; for en redigeret basisfil, gendan basisindholdet og indsæt ændringen i en ny migrering; for en omdøbt fil, fortryd omdøbningen eller vælg et andet nyt tidsstempel, hvor den pendler, aldrig det samme tidsstempel med et andet navn. Hvis selve kontrollen ikke kan køre, fejler porten i CI og advarer kun lokalt. For en redigeret basisfil er den opgraderede database bygget med basens indhold af den fil, og den anden boot springer den over, fordi dens version allerede er registreret. For en omdøbt fil er den opgraderede database bygget med filen under dets gamle navn, og den anden boot flytter sin `_omniroute_migrations` række gennem kompatibilitetsindgangen i stedet for at køre den igen; porten sender det nye navn med `--must-not-apply`, så kontrollen mislykkes, hvis den anden boot anvender den. Hvis en pull-anmodningsmigrering ikke kan anvendes på den opgraderede sti, det vil sige efter hver basismigrering (uanset om den også mislykkes på en ny installation eller ej), rapporterer porten `migration do PR não aplica` og beder dig rette SQL mod basens aktuelle skema; hvis filen afhænger af en anden pull-anmodningsmigrering med et senere tidsstempel, gendan dens navn med `npm run db:new-migration`.

For at køre den samme sammenligning lokalt, videregive basen eksplicit, for eksempel `npm run check:migration-numbering -- --base origin/<base-branch>` eller `npm run check:migration-numbering -- --base-latest-tag` for at sammenligne med den seneste udgivelse.

### Konvertering af en åben PR's `NNN` -migrering

En pull-anmodning, der blev åbnet før kontakten, kan stadig indeholde en sekventiel fil såsom `242_add_widgets.sql`. Gamle tal over `241` afvises, så konverter det før sammenlægning:

1. **Omdøb filen med generatoren, behold beskrivelsen.** Kør `npm run db:new-migration -- <same description>` for at få det nye navn, flyt SQL ind i den, og slet den gamle `NNN_` -fil. Beskrivelsen skal forblive identisk: kompatibilitetsposten nedenfor matcher den.
2. **Tilføj en kompatibilitetspost, hvis en vedvarende database kørte det gamle nummer.** Hvis en database, der opbevares (homolog, en VPS, en bidragyders egen installation) kørte en build af PR med `NNN_` filen, skal du tilføje `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` til `RENAMED_MIGRATION_COMPATIBILITY` i `src/lib/db/migrationRunner/constants.ts`. Dette er** kræves for `237` til `241`** : disse slots indeholder nu de kanoniske `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` og `241_seen_models.sql`, og uden indtastningen springer en sådan database over den kanoniske migrering for altid og kører den konverterede igen. Det fungerer også for en plads, der forbliver tom, såsom `242`, når destinationen er et tidsstempel. Hvis du er i tvivl, så tilføj posten. Hvor du tilføjer det i arrayet er ligegyldigt: når en posts målplads stadig har en række, som en anden post flytter væk (for eksempel `237` der holder en PR række, mens en ældre `usage_history_calculated_cost` række venter på at flytte ind i `237`), lader løberen denne post vente, indtil pladsen er fri. Kun en reel konflikt, såsom en plads, der holdes af en række ingen indgang flytter, eller to indgange, der bytter plads, stopper opstarten med `Cannot reconcile ...`.
3. **Hold SQL idempotent** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), fordi den konverterede migrering kan møde en database, hvor dens skema allerede eksisterer.
4. **Flyt versionsnøglede specialtilfælde.** Hvis PR tilføjede et stort og små bogstav for sit gamle tal i `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) eller i `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), skal du ændre nøglen til det nye tidsstempel.

`tests/unit/db/codex-fence-migration-rename.test.ts` er et fungerende eksempel på en test til en omdøbt migration.

### Backporter til filialer før skiftet

Aldrig cherry-pick eller backport en `YYYYMMDDHHMMSS_` fil til en gren, der går forud for skiftet (for eksempel en ældre `release/v*` -gren). Løberen der sorterer filnavne som tekst, så en tidsstemplet fil ville køre mellem `201_` og `202_` på en ny database, og den gamle gate der forstår ikke 14-cifrede præfikser. På sådan en gren skal du skrive ændringen som den pågældende grens egen næste `NNN_` fil, idempotent, så det er en no-op, når den tidsstemplede version kommer senere.

### Sådan kører migrationer

Ved opstart, `migrationRunner.ts`:

1. Opretter `_omniroute_migrations` tabel, hvis den ikke eksisterer
2. Forespørgsler til allerede anvendte migreringer
3. Anvender alle nye migreringer i rækkefølge, hver i en transaktion
4. Registrerer hver anvendt migrering med tidsstempel

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotens

Migrationer skal være** idempotent** — at køre dem to gange burde være en no-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Brug `IF NOT EXISTS`, `IF EXISTS` og `OR IGNORE` / `OR REPLACE` klausuler rigeligt.

### Tilføjelse af en ny migrering

1. **Opret filen med generatoren** : `npm run db:new-migration -- <description>` (for eksempel `npm run db:new-migration -- add combo priority`). Den skriver `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` med den aktuelle UTC tid og en kommentarhoved, bevæger sig et sekund frem, hvis tidsstemplet tages, og overskriver aldrig en fil. Vælg ikke et nummer i hånden.
2. **Brug sikker DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Tilbagefyld data omhyggeligt** : brug `UPDATE ... WHERE ...` til at håndtere eksisterende rækker
4. **Tjek rækkefølge og navngivning** : `npm run test:migrations:fresh` (alle migreringer på en tom database) og `npm run check:migration-numbering`
5. **Test på en kopi** : Kør aldrig utestede migreringer på produktion
6. **En tabel oprettet ud fra kode skal også migreres** : hvis et modul også opretter tabellen dovent (`CREATE TABLE IF NOT EXISTS`, holdt som en selvhelbredende sti), skal en migrering oprette den med den samme DDL. Ellers ender en ren installation og en opgraderet installation med forskellige skemaer, afhængigt af om kodestien kørte. `tests/unit/db/lazy-table-migration-guard.test.ts` scanner `src/` og `open-sse/` og fejler på en doven `CREATE` uden migrering (#20557). Eksempel: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Eksempel:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Bagud-inkompatible ændringer** (f.eks. at slippe kolonner) er vanskelige. OmniRoute understøtter NOT nedgradering af — når en migrering er anvendt, er skemaændringen permanent. Planlæg derefter.

---

## Kryptering af lagrede data

Følsomme felter (API-nøgler, OAuth-tokens og forbindelsesstrenge) krypteres ved lagring med **AES-256-GCM**.

### Sådan fungerer det

```ts
// src/lib/db/encryption.ts (forenklet)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Hvor det bruges

- `provider_connections.api_key` — krypteret på applikationsniveau
- `provider_connections.access_token`, `refresh_token`, `id_token` — krypteret på applikationsniveau
- `key_value`-poster med `namespace = "secrets"` — krypteret på applikationsniveau
- `proxy_registry.auth` — krypteret på applikationsniveau (hvis til stede)

### Krypteringsnøgle

Krypteringsnøglen afledes af en **adgangssætning** (angivet via miljøvariablen `STORAGE_ENCRYPTION_KEY`) og et **salt** (gemt i databasen). Begge er nødvendige for at dekryptere data.

```bash
# Generér en sikker adgangssætning
openssl rand -hex 32

# Angiv den i .env
STORAGE_ENCRYPTION_KEY=<din-nøgle>
```

> **Kritisk**: Hvis krypteringsnøglen mistes, mister du adgangen til alle krypterede data. **Sikkerhedskopiér nøglen separat fra databasen**.

### Hvad der IKKE krypteres

Af hensyn til ydeevnen gemmes følgende i klartekst:

- Udbyderes visningsnavne
- Modeldefinitioner (allerede offentlige)
- Routingregler
- Brugsregistreringer (ingen personhenførbare oplysninger)

---

## Forbehold ved kryptering (v3.8.16+)

OmniRoute bruger **`migrateLegacyEncryptedString()`** til transparent at håndtere to krypteringsmetoder:

- **Ældre** (før v3.5.0): XOR-baseret "kryptering" (ikke rigtig kryptografi)
- **Nuværende**: AES-256-GCM med korrekt IV og autentificeringstag

Migreringshjælperen registrerer det ældre format og genkrypterer med den nye metode ved første læsning. Det betyder, at du kan opgradere en gammel database uden at miste legitimationsoplysninger.

---

## Læsecache

For data, der læses ofte (modeller, udbydere, indstillinger), tilbyder `readCache.ts` en **cache i hukommelsen**:

```ts
// Cachelagres ved opstart og ugyldiggøres ved skrivning
const providers = await getCachedProviders(); // Hurtig, i hukommelsen
const fresh = await listProviders(); // Langsom, tilgår databasen
```

| Cachelagret entitet    | Cachenøgle     | TTL              |
| ---------------------- | -------------- | ---------------- |
| `models`               | `models:v1`    | Indtil skrivning |
| `provider_connections` | `providers:v1` | Indtil skrivning |
| `settings`             | `settings:v1`  | Indtil skrivning |
| `combos`               | `combos:v1`    | Indtil skrivning |

Cachen ugyldiggøres ved hver skrivning til den tilsvarende tabel.

---

## Sikkerhedskopiering og gendannelse

### Manuel sikkerhedskopiering

```bash
# Brug CLI'en til at oprette en lokal sikkerhedskopi
omniroute backup create --name pre-migration

# Eller via API'et
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Sikkerhedskopifilen indeholder:

- Alle databasetabeller (serialiseret til JSON)
- Kaldslogartefakter (base64-kodet, valgfrit)
- Indstillinger + hemmeligheder (krypteret)
- Plugin-konfiguration

### Gendannelse

```bash
# Via CLI
omniroute restore pre-migration

# Via API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Advarsel**: Gendannelse overskriver hele databasen. Stop først alle klienter.

### Automatiske sikkerhedskopier

```bash
# Aktivér automatiske daglige sikkerhedskopier via CLI'en
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Tidsplanen udføres på serversiden af et baggrundsjob, der kører hvert 30. sekund
(standard) og evaluerer cron-udtrykket i forhold til serverens lokale tid.

| Variabel                                    | Standard | Beskrivelse                                                                                                                  |
| ------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | Kørselsinterval i ms (min. `5000`). Skal være kortere end 60 s for pålideligt at ramme det matchende minut i cron-udtrykket. |

### Aktiv SQLite-sikkerhedskopiering

Sådan sikkerhedskopieres en aktiv database uden nedetid:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Dette bruger SQLite's API til online-sikkerhedskopiering — det er sikkert at køre, mens OmniRoute kører.

---

## Performance Tuning

### WAL tilstand

WAL er aktiveret som standard. For høj-skrive-arbejdsbelastninger skal du overveje:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute indstiller ikke `journal_size_limit`. Et kontrolpunkt flytter WAL rammer ind i hovedfilen, men WAL filen beholder sin største tildelte størrelse. `OMNIROUTE_WAL_GUARD_MAX_MB` vagten advarer kun og kører `wal_checkpoint(RESTART)`; det er ikke en disk-størrelse cap.

### Indekser

Nøgleindekser for ydeevne (automatisk oprettet ved migreringer):

- `idx_models_provider` — modelopslag efter udbyder
- `idx_combo_targets_combo_id` — combo måludvidelse
- `idx_usage_history_api_key_timestamp` — brugsanalyse
- `idx_quota_snapshots_api_key_window` — kvotesporing
- `idx_call_logs_timestamp` — opkaldslog forespørgsler

For at tilføje et nyt indeks skal du oprette en migrering:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Hukommelseskortlagt I/O

For meget store databaser (> 10GB) kan memory mapping justeres via SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Komprimering

Langvarige OmniRoute forekomster drager fordel af lejlighedsvise `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Løb månedligt under vinduer med lav trafik. (WAL tilstand reducerer behovet, men eliminerer det ikke.)

---

## Sundhedskontrol

`src/lib/db/healthCheck.ts` leverer **sundhedsdiagnostik på databaseniveau**:

Begge verber kræver godkendelse (ellers `401`). `GET` foretager kun diagnosticering; `POST` kører den
samme kontrol med `autoRepair` aktiveret.

```bash
GET  /api/db/health   # diagnosticer
POST /api/db/health   # diagnosticer + reparer
```

Svaret er det `DbHealthCheckResult`, som produceres af `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domænebudgetter refererede til API-nøgler, som ikke længere findes.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Felt              | Betydning                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, når `issues` er tom. `driver` påvirker den aldrig.                                                                                           |
| `issues[].type`   | En af `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                               |
| `repairedCount`   | Rækker repareret under denne kørsel; altid `0`, når `autoRepair` er false.                                                                           |
| `backupCreated`   | Om der blev oprettet en sikkerhedskopi før reparationen.                                                                                             |
| `checkedAt`       | ISO-tidsstempel, der deles af kørslen og eventuelle reparationsnoter, som den skriver.                                                               |
| `driver.name`     | SQLite-driveren, der betjener den kontrollerede database.                                                                                            |
| `driver.degraded` | `true`, når skrivninger ikke gemmes varigt i databasefilen — `sql.js` WASM-reserveløsningen (lagring af hele filen) eller en database i hukommelsen. |

Den samme nyttelast returneres af MCP-værktøjet `omniroute_db_health_check`.

Kør `PRAGMA integrity_check` for at registrere beskadigelse:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Bør udskrive: ok
```

Hvis den returnerer andet end `ok`, skal du **øjeblikkeligt stoppe med at bruge databasen** og gendanne den fra en sikkerhedskopi.

---

## Katastrofegendannelse

### Scenarie 1: WAL-fil mistet

Filen `-wal` mangler, men `-shm` og hoveddatabasen er intakte:

```bash
# Gendannes automatisk ved næste åbning
omniroute
```

Hvis SQLite ikke kan gendanne automatisk:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenarie 2: Hoveddatabasefilen er beskadiget

Gendan fra sikkerhedskopi:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` downloader kun et komplet `.tar.gz`-arkiv fra en kørende server
(`GET /api/db-backups/exportAll`, operatørlegitimationsoplysninger påkrævet); den gendanner ikke noget.

### Scenarie 3: Krypteringsnøgle mistet

**Gendannelse er ikke mulig** uden nøglen. De krypterede felter kan ikke læses. Tilføj alle udbydere manuelt igen med nye legitimationsoplysninger.

> **Afhjælpning**: Sikkerhedskopiér altid krypteringsnøglen separat, helst i en adgangskodeadministrator eller KMS.

### Scenarie 4: Disken er fuld

SQLite returnerer `SQLITE_FULL`-fejl. Frigør diskplads, og kør derefter:

```bash
# Opret et checkpoint for WAL for at frigøre plads
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Almindelige handlinger

### Undersøg en tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Tæl rækker i alle tabeller

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Nulstil (slet) alle data

```bash
# Stop OmniRoute først
omniroute stop

# Slet databasefilen
rm ~/.omniroute/storage.sqlite*

# Genstart (opretter en ny, tom database)
omniroute
```

For en **selektiv** nulstilling (behold udbydere, slet brugsdata):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Eksportér en enkelt tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Fejlfinding

### "Databasen er låst"

En anden proces holder en skrivelås. Du kan enten:

- Vente på, at den anden proces bliver færdig (kontrollér `lsof | grep storage.sqlite`)
- Afslutte den anden proces
- Genstarte OmniRoute, hvis problemet fortsætter

### "Begrænsning for fremmednøgle mislykkedes"

Et domænemodul overtræder den referentielle integritet. Kontrollér:

- Forældreløse rækker i afhængige tabeller
- Kaskadesletninger, som ikke blev videreført
- En nylig migrering, der ændrede en fremmednøgle

Kør `PRAGMA foreign_key_check;` for at finde overtrædelser.

### "Ikke nok hukommelse"

SQLite's hukommelseskortlagte I/O overskrider operativsystemets grænse. Reducer det via et SQLite-pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128 MB i stedet for 256 MB
```

Eller deaktiver det:

```sql
PRAGMA mmap_size = 0;
```

### "Migreringen mislykkedes undervejs"

Migreringen blev kørt i en transaktion, så den burde være blevet rullet tilbage. Hvis ikke:

1. **Stop OmniRoute** (forhindr yderligere forsøg)
2. **Kontrollér databasens tilstand** med `sqlite3`
3. **Ret den delvise migrering manuelt**
4. **Kør OmniRoute igen** (migreringen forsøges igen)

For at undgå dette skal migreringer altid testes på en kopi først.

---

## Se også

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — brugstabeller
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — tilstandsovervågning
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — udgivelsesforløb
- Kilde: `src/lib/db/` (80+ filer, ~25.000 kodelinjer)
