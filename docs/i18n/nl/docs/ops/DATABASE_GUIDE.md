# Database Schema & Operations Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Kort samengevat**: OmniRoute gebruikt **SQLite met WAL-journaling** als primaire opslag, met **AES-256-GCM**-versleuteling van gevoelige velden wanneer deze zijn opgeslagen. Deze handleiding behandelt het schema, migraties, back-ups/herstel en operationele draaiboeken.

**Bronnen:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 basistabellen)
- `src/lib/db/migrationRunner.ts` — geversioneerde migraties
- `src/lib/db/migrations/` — 167 geversioneerde SQL-bestanden
- `src/lib/db/encryption.ts` — hulpfuncties voor versleuteling
- `src/lib/db/backup.ts` — export/import van back-ups
- `src/lib/db/healthCheck.ts` — gezondheidsdiagnostiek

---

## Waarom SQLite?

OmniRoute heeft om verschillende redenen voor SQLite gekozen in plaats van PostgreSQL/MySQL:

| Factor               | SQLite                                      | PostgreSQL                                        |
| -------------------- | ------------------------------------------- | ------------------------------------------------- |
| **Implementatie**    | Ingebed — geen afzonderlijke server nodig   | Vereist serverconfiguratie                        |
| **Versleuteling**    | Applicatielaag (AES-256-GCM)                | Ingebouwde TDE                                    |
| **Prestaties**       | Sneller voor kleine/middelgrote workloads   | Beter voor zeer veel gelijktijdige schrijfacties  |
| **Gelijktijdigheid** | WAL-modus maakt gelijktijdig lezen mogelijk | Volledige MVCC                                    |
| **Back-up**          | Kopie van één bestand                       | `pg_dump` of momentopname van het bestandssysteem |
| **Gebruiksscenario** | Installatie per gebruiker, ingebed          | SaaS met meerdere tenants                         |

Voor implementaties met **één gebruiker en één instantie** (het primaire gebruiksscenario van OmniRoute) is SQLite eenvoudiger en sneller.

### WAL-journaling

`core.ts` opent de database in de **WAL-modus (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL maakt **gelijktijdige leesacties** tijdens schrijfacties mogelijk — belangrijk voor het dashboard, dat query's uitvoert terwijl verzoeken worden vastgelegd.

De standaard cachegrootte is **65.536 KiB (64 MiB)**. SQLite interpreteert een negatieve
`cache_size` als een benaderde bovengrens in KiB en wijst pagina's naar behoefte toe.
**Instellingen > Systeem en opslag > Cachegrootte** accepteert gehele waarden van **1 tot
1.000.000 KiB**; wanneer de instelling wordt opgeslagen, wordt deze toegepast op de actieve databaseverbinding
en OmniRoute herstelt de opgeslagen waarde bij het opstarten.

---

## Databaselocatie

Het SQLite-bestand wordt opgeslagen op:

| Besturingssysteem | Pad                                                         |
| ----------------- | ----------------------------------------------------------- |
| Linux             | `~/.omniroute/storage.sqlite`                               |
| macOS             | `~/.omniroute/storage.sqlite`                               |
| Windows           | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker            | `/app/data/storage.sqlite` (configureerbaar via `DATA_DIR`) |

Bijbehorende bestanden:

- `storage.sqlite-wal` — write-ahead-logboek
- `storage.sqlite-shm` — bestand voor gedeeld geheugen
- `call_logs/` — artefacten van verzoekpayloads (indien ingeschakeld)

**De locatie overschrijven:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architectuur van domeinmodules

De database van OmniRoute bevat **110 TypeScript-modules op het hoogste niveau** in `src/lib/db/`. Elke domeinmodule:

- Beheert één of meer specifieke tabellen
- Exporteert getypeerde CRUD-functies
- Benadert nooit de tabellen van een andere module
- Gebruikt `getDbInstance()` uit `core.ts` om toegang te krijgen tot de database

### De 110 DB-modules op het hoogste niveau

OmniRoute heeft **110 TypeScript-bestanden op het hoogste niveau** in `src/lib/db/`. Hieronder staat een selectie van kernmodules; raadpleeg de directorylijst voor de volledige lijst:

| Module                  | Tabellen                                                       | Verantwoordelijkheid                                                              |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registratie en referenties van providers via OAuth/API-sleutels                   |
| `models.ts`             | `key_value` (modelgegevens)                                    | Modeldefinities, mogelijkheden en prijzen                                         |
| `combos.ts`             | `combos`                                                       | Configuraties en volgorde voor combinatieroutering                                |
| `apiKeys.ts`            | `api_keys`                                                     | Levenscyclus van API-sleutels, scopes en quotumregistratie                        |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Systeemconfiguratie en gedeelde KV-opslag                                         |
| `backup.ts`             | —                                                              | Bewerkingen voor het exporteren/importeren van back-ups                           |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxyconfiguraties en routeringsregels                                            |
| `prompts.ts`            | `prompt_templates`                                             | Herbruikbare promptsjablonen en versiebeheer                                      |
| `webhooks.ts`           | `webhooks`                                                     | Gebeurtenisgestuurde webhookabonnementen en logboeken                             |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Auditregistratie per aanvraag (optioneel, groot volume)                           |
| `domainState.ts`        | `domain_*` (5 tabellen)                                        | Domeinbudgetten, circuitbreakers, blokkeringen, fallback-ketens en kostenhistorie |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API-sleutels op de toelatingslijst voor MCP/A2A                                   |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historisch quotumgebruik                                                          |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modellen aan standaardcombinaties koppelen                                        |
| `cliToolState.ts`       | `cli_tool_state`                                               | Persistente CLI-specifieke status                                                 |
| `encryption.ts`         | —                                                              | Hulpfuncties voor het versleutelen/ontsleutelen van velden                        |
| `readCache.ts`          | —                                                              | Cache in het geheugen voor leesintensieve bewerkingen                             |
| `secrets.ts`            | `key_value` (versleutelde vermeldingen)                        | Versleutelde opslag van geheimen                                                  |
| `stateReset.ts`         | —                                                              | Databasestatus wissen/herstellen voor tests                                       |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Sessiecontext voor overdracht tussen agents                                       |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Gebruiksregistratie                                                               |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Compressieconfiguratie                                                            |

### Modulegrenzen

Een belangrijke architectuurregel: **modules benaderen elkaars tabellen niet rechtstreeks**. Importeer de functie uit de betreffende module om met de gegevens van een andere module te werken.

```ts
// ❌ FOUT: rechtstreekse SQL-query vanuit een andere module
db.prepare("SELECT * FROM provider_connections").all();

// ✅ GOED: gebruik de functie uit de providers-module
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Deze regel wordt afgedwongen via codebeoordelingen — er is geen statische controle, maar overtredingen worden gemarkeerd.

---

## Basisschema (17 tabellen)

`core.ts` definieert de 17 basistabellen in `SCHEMA_SQL`. Deze worden aangemaakt door migratie `001_initial_schema.sql` en vormen het kernschema.

### Kerntabellen (aangemaakt tijdens de initiële migratie)

| Tabel                      | Doel                                    | Belangrijkste kolommen                                                  |
| -------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Providerreferenties (versleuteld)       | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Routeringsinformatie voor providernodes | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Algemene KV-opslag                      | `namespace`, `key`, `value`                                             |
| `combos`                   | Definities van routeringscombinaties    | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API-sleutels voor de gateway            | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Databasemetadata                        | `key`, `value`                                                          |
| `usage_history`            | Gebruiksgegevens van aanvragen          | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Aanvraagpayloads en antwoorden          | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logboeken van proxyverzoeken            | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Koppelingen van modellen aan providers  | `model`, `chain`                                                        |
| `domain_budgets`           | Uitgavenbudgetten per domein            | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Geschiedenis van budgetresets           | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Kostenregistratie per domein            | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Status van domeinspecifieke limieten    | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Circuitbreakerstatus per domein         | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache voor LLM-antwoorden               | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historische momentopnamen van quota     | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Aanvullende tabellen (toegevoegd door latere migraties)

Latere migraties voegen onder andere de volgende tabellen toe:

- `cli_tool_state` (migratie 011) — status van het CLI-hulpprogramma
- `mcp_*`-tabellen — audit van MCP-servers
- `a2a_*`-tabellen — A2A-taakstatus
- `usage_*`-tabellen — gebruiksregistratie
- `plugin_*`-tabellen — pluginsysteem
- `skill_executions` — geschiedenis van vaardigheidsuitvoeringen
- `memory_*`-tabellen — geheugensysteem
- `compression_*`-tabellen — compressiesysteem
- `webhook_*`-tabellen — logboek van webhookleveringen
- `acp_*`-tabellen — Agent Client Protocol
- `oneproxy_*`-tabellen — 1proxy-marktplaats
- `proxy_assignments` — koppelingen van proxybereiken
- `detailed_call_artifacts` — metadata van aanroeplogboekartefacten
- `quota_alert_history` — audit van quotawaarschuwingen
- `command_code_auth_sessions` — OAuth-sessies van Command Code

De volledige lijst met circa 30+ tabellen staat in `src/lib/db/migrations/`.

---

## Migraties

OmniRoute gebruikt** versiebeheerde, idempotente migraties** in `src/lib/db/migrations/`. Elke migratie is één SQL bestand. Er bestaan twee naamgevingsformaten naast elkaar; de versie vastgelegd in `_omniroute_migrations` is het numerieke voorvoegsel.

### Naamgeving van migratie

| Formaat                                            | Voorbeeld                            | Gebruikt voor                                                                                                                                                              |
| -------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (precies 3 cijfers)          | `241_seen_models.sql`                | De oude serie `001`–`241`. Bevroren toen het tijdstempelformaat landde (`240` en `241` werden vlak daarvoor samengevoegd): geen enkel nieuw bestand krijgt een volgnummer. |
| `YYYYMMDDHHMMSS_description.sql` (14 cijfers, UTC) | `20261113120000_add_usage_index.sql` | Elke migratie die vanaf 13-11-2026 is gemaakt.                                                                                                                             |

Waarom de verandering: met opeenvolgende nummers koos parallelle PRs hetzelfde volgende nummer en op één na moesten ze allemaal opnieuw nummeren voordat ze konden worden samengevoegd. Een UTC tijdstempel geeft elke PR een eigen versie.

Regels voor het tijdstempelformaat (afgedwongen door `npm run check:migration-numbering`, gedeeld met de generator in `scripts/check/lib/migrationNaming.mjs`):

- De tijdstempel is een echte UTC datum en -tijd, niet eerder dan `20261113000000` en niet meer dan 10 minuten in de toekomst.
- De beschrijving bestaat uit kleine letters `snake_case` beginnend met een letter (`a-z`, `0-9`, enkele `_` tussen woorden), met een maximum van 80 tekens.
- Twee bestanden met dezelfde tijdstempel zijn een duplicaat.
- De no-gap-regel geldt alleen voor de oude reeksen: elk getal van `001` tot `241` moet bestaan, behalve de bekende gaten `026`, `055` en `121`. Het verwijderen van `241` (of een ander oud bestand) mislukt de poort. `001` en `241` kunnen nooit worden toegevoegd aan de `KNOWN_GAPS` toelatingslijst. Bestanden met tijdstempel creëren nooit een gat.
- Elke invoer in `src/lib/db/migrations/` moet een normaal bestand zijn met een geldige `.sql` -naam in kleine letters. Een directory, een symlink, een `.SQL` of `.sql.bak` bestand, een verborgen bestand of een naam met een spatie faalt door de poort, omdat de runner deze stilletjes overslaat of crasht bij het opstarten.

**Orde toepassen.** De runner sorteert op de numerieke waarde van het voorvoegsel, niet op tekst: eerst de oude `001`–`241` bestanden, daarna de bestanden met tijdstempel in tijdstempelvolgorde, en vervolgens alle mappen met naamruimte die zijn geregistreerd bij `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (versies zoals `ee-001`). Een lopende migratie is elk bestand waarvan de versie niet in `_omniroute_migrations` staat, dus een migratie van een oudere branch die samenvoegt na een nieuwere branch is nog steeds van toepassing op bestaande databases.

**De tijdstempel is de aanmaakvolgorde, niet de samenvoegvolgorde.** Als uw migratie afhankelijk is van een tabel of kolom die is gemaakt door een migratie met a** nieuwer** tijdstempel (bijvoorbeeld een van een andere PR die als eerste is samengevoegd), zou een nieuwe database de jouwe eerst uitvoeren en mislukken. Terwijl uw PR nog open is, genereert u de bestandsnaam opnieuw met `npm run db:new-migration` zodat deze een nieuwere tijdstempel krijgt, of maakt u deze onafhankelijk. `npm run test:migrations:fresh` past elke migratie toe op een lege database en vangt deze op.

### Een samengevoegde migratie wordt nooit verwijderd of hernoemd

Zodra een migratiebestand zich op een release branch of `main` bevindt, is het al uitgevoerd in homolog- en ontwikkelaarsdatabases, op VPS installaties en in de Enterprise-synchronisatie. Vanaf dat moment:

- **Verwijder het nooit.** Nieuwe installaties zouden hun schema verliezen, terwijl geüpgradede databases dit behouden.
- **Hernoem het nooit.** De versie in `_omniroute_migrations` zou niet langer overeenkomen met een bestand, dus elke database die het al had toegepast, zou het opnieuw uitvoeren. Niet-idempotente SQL dupliceert vervolgens gegevens of stopt het opstarten.
- **Een ander schema nodig?** Maak een nieuwe migratie met `npm run db:new-migration`.

Het hernoemen is alleen veilig voor een bestand dat nog niet is samengevoegd, wat het geval is waarnaar de hints van de poort verwijzen. Een releasetag verandert hier niets: elke push naar een `release/v*` branch publiceert de Docker `:next` image en draait op homoloog, VPS installaties en de Enterprise-synchronisatie, dus een samengevoegde migratie is op echte databases uitgevoerd voordat er een `vX.Y.Z` tag bestond. De poort mislukt elke verwijdering van een basisbestand, al dan niet getagd.

- **Een samengevoegde migratie ongedaan maken.** Een `git revert` die het bestand verwijdert, mislukt door de poort. Behoud het bestand en maak het schema ongedaan in een nieuwe migratie: `npm run db:new-migration -- <description>`, met `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` enzovoort. Geüpgradede en nieuwe databases eindigen dan met hetzelfde schema.
- **De enige geaccepteerde hernoeming: een compatibiliteitsinvoer en identieke inhoud.** Als een samengevoegd bestand moet worden verplaatst (twee samengevoegde bestanden delen bijvoorbeeld een tijdstempel en de runner stopt met een versiebotsing), hernoem het laatste bestand zonder de SQL aan te raken en voeg `{ fromVersion, fromName, toVersion, toName }` toe aan `RENAMED_MIGRATION_COMPATIBILITY` in `src/lib/db/migrationRunner/constants.ts`. Databases die de oude versie hebben toegepast, krijgen hun `_omniroute_migrations` rij verplaatst in plaats van het bestand opnieuw uit te voeren. De poort waarschuwt voor een dergelijke hernoeming en voert altijd de commutatiecontrole uit, ongeacht de nieuwe tijdstempel: nieuwe installaties passen het bestand op de nieuwe positie toe, geüpgradede databases niet, dus kies een nieuwe tijdstempel in de buurt van de oude. De poort mislukt de hernoeming als de inhoud is gewijzigd (een schemawijziging gaat nog steeds door bij een nieuwe migratie) of als het doelbestand van het item niet op schijf staat.
- **Hernoem nooit binnen hetzelfde tijdstempel.** Een hernoeming die de tijdstempel behoudt en alleen de beschrijving verandert, mislukt de poort, met of zonder invoer. Met een item waarvan `toVersion` gelijk is aan zijn `fromVersion`, verwijdert de runner de oude `_omniroute_migrations` rij en past het bestand opnieuw toe op elke database die het al draaide. Zonder invoer houdt de runner alleen de versie bij: hij slaat het bestand in die databases over (nieuwe inhoud wordt daar nooit uitgevoerd) en registreert bij elke opstart een hernummeringsfout. Gebruik een andere tijdstempel plus een compatibiliteitsvermelding, of behoud de naam.
- **De poort controleert of het hernoemde bestand niet opnieuw wordt uitgevoerd.** Voor elke afgedekte hernoeming geeft de poort de nieuwe bestandsnaam door aan de commutatiecontrole met `--must-not-apply`. De controle start de geüpgradede database op met de echte runner, en als de runner dat bestand opnieuw toepast (bijvoorbeeld omdat het item een verkeerde versie of naam heeft, of omdat de tekstparser van de gate `constants.ts` anders leest dan TypeScript), mislukt de gate met `migration renomeada rodaria de novo` en vraagt je om de oude en nieuwe versies en namen van het item te controleren.

### Wat de poort vergelijkt met de basis

Bij het uitvoeren van pull-aanvragen en merge-queues vergelijkt `npm run check:migration-numbering` `src/lib/db/migrations/` op schijf met dezelfde map op de basisvertakking. De basis is, in deze volgorde: `--base-latest-tag`, `--base <ref>`, de `MIGRATION_BASE_REF` variabele, of, wanneer `GITHUB_EVENT_NAME` `pull_request`, `pull_request_target` of `merge_group` is, de eerste ouder van de merge commit, de `merge_group.base_sha` van de payload van de gebeurtenis, of `git merge-base HEAD origin/$GITHUB_BASE_REF`. Bij een pull-request of merge-queue run zonder oplosbare basis faalt de poort. Buiten CI zonder `--base` wordt `comparação com a base: pulada (sem --base)` afgedrukt en worden deze regels overgeslagen.

`--base-latest-tag` is te vergelijken met de nieuwste releasetag (`vX.Y.Z` in semver-volgorde; tags met achtervoegsels zoals nightlies tellen niet mee) die zich in de geschiedenis van `HEAD` bevindt, met dezelfde regels als `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) voert de poort op deze manier uit, omdat push- en geplande runs geen pull-verzoekbasis hebben en een samenvoeging kan landen zonder een nieuwe CI run. Zonder vrijgavetag in de geschiedenis faalt de poort; voer `git fetch --tags` uit (in CI brengt `actions/checkout` met `fetch-depth: 0` de tags).

| Wijziging van de pull-aanvraag                                                                                                                              | Resultaat                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Een bestand dat op de basis bestaat, krijgt een nieuwe naam, met een `RENAMED_MIGRATION_COMPATIBILITY` -invoer                                              | **Waarschuwing** als de inhoud identiek is en de commutatiecontrole ongeacht de nieuwe tijdstempel wordt uitgevoerd; het mislukt als de nieuwe positie het uiteindelijke schema verandert (de hernoeming ongedaan maakt of een andere nieuwe tijdstempel kiest waar deze naartoe pendelt) of als de hardloper het hernoemde bestand opnieuw zou toepassen op een geüpgradede database.** Mislukt** als de inhoud verandert. |
| Een bestand dat op de basis bestaat, krijgt een nieuwe naam, waarbij de tijdstempel behouden blijft (alleen de beschrijving verandert)                      | **Mislukt** , met of zonder inzending: de loper zou het opnieuw toepassen (met de inzending) of het per versie overslaan (zonder). Gebruik een andere tijdstempel plus een compatibiliteitsvermelding, of behoud de naam.                                                                                                                                                                                                   |
| Een bestand dat op de basis bestaat, wordt verwijderd of hernoemd zonder invoer                                                                             | **Mislukt** , ongeacht of het bestand zich in een releasetag bevindt. Om het ongedaan te maken, herstelt u het bestand met `git checkout <base> -- src/lib/db/migrations/<file>`; Om het schema terug te zetten, voeg je een nieuwe migratie toe met `DROP ... IF EXISTS`.                                                                                                                                                  |
| Een bestand dat op de basis bestaat, heeft een andere inhoud                                                                                                | **Waarschuwing** (een `::warning` -annotatie in GitHub Actions) en de commutatiecontrole wordt uitgevoerd. Het mislukt als de bewerking het uiteindelijke schema verandert, omdat geüpgradede databases het bewerkte bestand niet opnieuw toepassen: plaats de wijziging in een nieuwe migratie. Een onschuldige bewerking (een opmerking, `IF NOT EXISTS`) waarschuwt alleen.                                              |
| Er wordt een tijdstempelbestand toegevoegd met een tijdstempel die niet nieuwer is dan de nieuwste van de basis                                             | Voert de commutatiecontrole uit, die hieronder wordt beschreven.                                                                                                                                                                                                                                                                                                                                                            |
| Er wordt een `NNN_` bestand in oud formaat toegevoegd met een nummer onder het nieuwste bestand in oud formaat van de basis                                 | **Mislukt** , zelfs als `KNOWN_GAPS` in hetzelfde pull-verzoek wordt bewerkt: de oude serie is bevroren, maak de migratie aan met `npm run db:new-migration`. Bestanden in een oud formaat boven de nieuwste van de basis (een `release/v*` naar `main` pull-verzoek) worden geaccepteerd.                                                                                                                                  |
| Een bestand dat niet in de juiste volgorde staat, is bewerkt of een andere naam heeft gekregen, bevat `INSERT`, `UPDATE`, `DELETE` of `REPLACE` instructies | **Waarschuwing** : de commutatiecontrole vergelijkt geen gegevens, dus controleer of de volgorde waarin geüpgradede en nieuwe databases deze toepassen het resultaat verandert.                                                                                                                                                                                                                                             |

Eén uitvoering van de commutatiecontrole omvat de bestanden die niet in orde zijn, de bewerkte bestanden en de hernoemde bestanden samen.

De commutatiecontrole (`scripts/check/migration-commutation.ts`) bouwt twee tijdelijke databases op met het echte installatiepad: an** geüpgraded** één (opstarten met de basismigraties, en dan opnieuw opstarten met hetzelfde bestand met de migraties van het pull-verzoek) en a** vers** één (één opstart met de migraties van het pull-verzoek). Het vergelijkt de resulterende schema's: tabellen en kolommen (waarbij de kolomvolgorde wordt genegeerd), UNIQUE / PRIMARY KEY en FOREIGN KEY -beperkingen, de genormaliseerde `CREATE TABLE` tekst van elke tabel (die CHECK beperkingen, sorteringen, gegenereerde kolommen en tabelopties omvat), indexen, triggers en weergaven. Rijgegevens worden niet vergeleken. Als ze overeenkomen, geeft de poort aan dat het bestand niet in orde is, maar pendelt en passeert. Als ze verschillen, faalt de poort met het verschil en een hint voor het geval: voor een bestand dat niet in de juiste volgorde staat, regenereert u de naam ervan met `npm run db:new-migration`, wat veilig is omdat het bestand nog niet is samengevoegd; voor een bewerkt basisbestand: herstel de basisinhoud en plaats de wijziging in een nieuwe migratie; voor een hernoemd bestand maakt u de hernoeming ongedaan of kiest u een andere nieuwe tijdstempel waar het naartoe pendelt, nooit dezelfde tijdstempel met een andere naam. Als de controle zelf niet kan worden uitgevoerd, faalt de poort in CI en waarschuwt alleen lokaal. Voor een bewerkt basisbestand wordt de geüpgradede database gebouwd met de basisinhoud van dat bestand, en bij de tweede keer opstarten wordt dit overgeslagen omdat de versie ervan al is vastgelegd. Voor een hernoemd bestand wordt de geüpgradede database gebouwd met het bestand onder de oude naam, en bij de tweede keer opstarten wordt de `_omniroute_migrations` -rij door de compatibiliteitsinvoer verplaatst in plaats van deze opnieuw uit te voeren; de poort geeft de nieuwe naam door met `--must-not-apply`, dus de controle mislukt als de tweede keer opstarten deze toepast. Als een pull request-migratie niet kan worden toegepast op het geüpgradede pad, dat wil zeggen na elke basismigratie (ongeacht of deze ook mislukt bij een nieuwe installatie), rapporteert de poort `migration do PR não aplica` en vraagt u om de SQL te repareren tegen het huidige basisschema; als het bestand afhankelijk is van een andere pull-request-migratie met een latere tijdstempel, genereer de naam dan opnieuw met `npm run db:new-migration`.

Als u dezelfde vergelijking lokaal wilt uitvoeren, geeft u de basis expliciet door, bijvoorbeeld `npm run check:migration-numbering -- --base origin/<base-branch>` of `npm run check:migration-numbering -- --base-latest-tag` om te vergelijken met de nieuwste release.

### Een open PR- `NNN` -migratie converteren

Een pull-verzoek dat vóór de switch is geopend, kan nog steeds een sequentieel bestand bevatten, zoals `242_add_widgets.sql`. Oude getallen boven `241` worden afgewezen, dus converteer deze voordat u deze samenvoegt:

1. **Hernoem het bestand met de generator en behoud de beschrijving.** Voer `npm run db:new-migration -- <same description>` uit om de nieuwe naam te krijgen, verplaats de SQL ernaar en verwijder het oude `NNN_` bestand. De beschrijving moet identiek blijven: de onderstaande compatibiliteitsvermelding komt erop overeen.
2. **Voeg een compatibiliteitsvermelding toe als een persistente database het oude nummer gebruikte.** Als een database die wordt bijgehouden (homoloog, een VPS, de eigen installatie van een bijdrager) een build van de PR met het `NNN_` bestand heeft uitgevoerd, voeg dan `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` toe aan `RENAMED_MIGRATION_COMPATIBILITY` in `src/lib/db/migrationRunner/constants.ts`. Dit is** vereist voor `237` tot `241`** : die slots bevatten nu de canonieke `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` en `241_seen_models.sql`, en zonder de invoer slaat zo'n database de canonieke migratie voor altijd over en voert de geconverteerde versie opnieuw uit. Het werkt ook voor een slot dat leeg blijft, zoals `242`, wanneer de bestemming een tijdstempel is. Voeg bij twijfel de vermelding toe. Waar je het in de array toevoegt, doet er niet toe: wanneer het doelslot van een item nog steeds een rij bevat waar een ander item vandaan beweegt (bijvoorbeeld `237` die een PR rij vasthoudt terwijl een oudere `usage_history_calculated_cost` rij wacht om naar `237` te gaan), laat de runner dat item wachten totdat het slot vrij is. Alleen een echt conflict, zoals een slot dat wordt vastgehouden door een rij zonder invoerbewegingen, of twee invoeren die van slot wisselen, stopt het opstarten met `Cannot reconcile ...`.
3. **Houd de SQL idempotent** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), omdat de geconverteerde migratie mogelijk een database tegenkomt waarvan het schema al bestaat.
4. **Speciale gevallen met versiesleutel verplaatsen.** Als de PR een naamval heeft toegevoegd voor zijn oude nummer in `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) of in `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), wijzig dan de sleutel naar de nieuwe tijdstempel.

`tests/unit/db/codex-fence-migration-rename.test.ts` is een werkend voorbeeld van een test voor een hernoemde migratie.

### Backports naar vestigingen vóór de overstap

Kies nooit een `YYYYMMDDHHMMSS_` bestand uit en backport het niet naar een branch die dateert van vóór de switch (bijvoorbeeld een oudere `release/v*` branch). De runner daar sorteert bestandsnamen als tekst, zodat een bestand met tijdstempel zou draaien tussen `201_` en `202_` op een nieuwe database, en de oude poort daar begrijpt geen 14-cijferige voorvoegsels. Op zo'n branch schrijf je de wijziging als het eigen volgende `NNN_` bestand van die branch, idempotent, dus het is een no-op als de versie met tijdstempel later arriveert.

### Hoe migraties verlopen

Bij het opstarten, `migrationRunner.ts`:

1. Creëert `_omniroute_migrations` tabel als deze niet bestaat
2. Query's voor reeds toegepaste migraties
3. Past eventuele nieuwe migraties op volgorde toe, elk in een transactie
4. Registreert elke toegepaste migratie met tijdstempel

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

### Idempotentie

Migraties moeten dat zijn** idempotent** — om ze twee keer uit te voeren zou een no-op moeten zijn:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Gebruik royaal `IF NOT EXISTS`, `IF EXISTS` en `OR IGNORE` / `OR REPLACE` -clausules.

### Een nieuwe migratie toevoegen

1. **Maak het bestand met de generator** : `npm run db:new-migration -- <description>` (bijvoorbeeld `npm run db:new-migration -- add combo priority`). Het schrijft `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` met de huidige UTC tijd en een commentaarkop, gaat een seconde vooruit als dat tijdstempel wordt gebruikt, en overschrijft nooit een bestand. Kies een nummer niet met de hand.
2. **Gebruik veilige DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Vul de gegevens zorgvuldig in** : gebruik `UPDATE ... WHERE ...` om bestaande rijen te verwerken
4. **Controleer volgorde en naamgeving** : `npm run test:migrations:fresh` (alle migraties op een lege database) en `npm run check:migration-numbering`
5. **Test op een kopie** : voer nooit ongeteste migraties uit op productie
6. **Een tabel die op basis van code is gemaakt, heeft ook een migratie nodig** : als een module de tabel ook lui aanmaakt (`CREATE TABLE IF NOT EXISTS`, bewaard als een zelfherstelpad), moet een migratie deze maken met dezelfde DDL. Anders krijgen een schone installatie en een geüpgradede installatie verschillende schema's, afhankelijk van of dat codepad is uitgevoerd. `tests/unit/db/lazy-table-migration-guard.test.ts` scant `src/` en `open-sse/` en faalt op een luie `CREATE` zonder migratie (#20557). Voorbeeld: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Voorbeeld:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Achterwaarts incompatibele wijzigingen** (bijvoorbeeld kolommen laten vallen) zijn lastig. OmniRoute ondersteunt NOT het downgraden — zodra een migratie is toegepast, is de schemawijziging permanent. Plan dienovereenkomstig.

---

## Versleuteling van opgeslagen gegevens

Gevoelige velden (API-sleutels, OAuth-tokens, verbindingsreeksen) worden bij opslag versleuteld met **AES-256-GCM**.

### Hoe het werkt

```ts
// src/lib/db/encryption.ts (vereenvoudigd)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Waar het wordt gebruikt

- `provider_connections.api_key` — versleuteld op applicatieniveau
- `provider_connections.access_token`, `refresh_token`, `id_token` — versleuteld op applicatieniveau
- `key_value`-items met `namespace = "secrets"` — versleuteld op applicatieniveau
- `proxy_registry.auth` — versleuteld op applicatieniveau (indien aanwezig)

### Versleutelingssleutel

De versleutelingssleutel wordt afgeleid van een **wachtwoordzin** (ingesteld via de omgevingsvariabele `STORAGE_ENCRYPTION_KEY`) en een **salt** (opgeslagen in de database). Beide zijn vereist om gegevens te ontsleutelen.

```bash
# Genereer een veilige wachtwoordzin
openssl rand -hex 32

# Stel deze in .env in
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritiek**: Als de versleutelingssleutel verloren gaat, gaat ook de toegang tot alle versleutelde gegevens verloren. **Maak een back-up van de sleutel, afzonderlijk van de database**.

### Wat NIET wordt versleuteld

Om prestatieredenen worden de volgende gegevens als platte tekst opgeslagen:

- Weergavenamen van providers
- Modeldefinities (reeds openbaar)
- Routeringsregels
- Gebruiksregistraties (geen persoonsgegevens)

---

## Aandachtspunten voor versleuteling (v3.8.16+)

OmniRoute gebruikt **`migrateLegacyEncryptedString()`** om twee versleutelingsmethoden transparant af te handelen:

- **Verouderd** (vóór v3.5.0): op XOR gebaseerde 'versleuteling' (geen echte cryptografie)
- **Huidig**: AES-256-GCM met een correcte IV en authenticatietag

De migratiehelper detecteert het verouderde formaat en versleutelt het bij de eerste uitlezing opnieuw met de nieuwe methode. Dit betekent dat u een oude database kunt upgraden zonder inloggegevens te verliezen.

---

## Uitleescache

Voor gegevens die vaak worden uitgelezen (modellen, providers, instellingen) biedt `readCache.ts` een **cache in het geheugen**:

```ts
// Bij het opstarten in de cache geplaatst, ongeldig gemaakt bij schrijven
const providers = await getCachedProviders(); // Snel, in het geheugen
const fresh = await listProviders(); // Traag, leest uit de database
```

| Entiteit in de cache   | Cachesleutel   | TTL                              |
| ---------------------- | -------------- | -------------------------------- |
| `models`               | `models:v1`    | Tot de volgende schrijfbewerking |
| `provider_connections` | `providers:v1` | Tot de volgende schrijfbewerking |
| `settings`             | `settings:v1`  | Tot de volgende schrijfbewerking |
| `combos`               | `combos:v1`    | Tot de volgende schrijfbewerking |

De cache wordt ongeldig gemaakt bij elke schrijfbewerking naar de bijbehorende tabel.

---

## Back-up en herstel

### Handmatige back-up

```bash
# Gebruik de CLI om een lokale back-up te maken
omniroute backup create --name pre-migration

# Of via de API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Het back-upbestand bevat:

- Alle databasetabellen (geserialiseerd naar JSON)
- Artefacten van oproeplogboeken (base64-gecodeerd, optioneel)
- Instellingen en geheimen (versleuteld)
- Pluginconfiguratie

### Herstellen

```bash
# Via de CLI
omniroute restore pre-migration

# Via de API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Waarschuwing**: Herstellen overschrijft de volledige database. Stop eerst alle clients.

### Geautomatiseerde back-ups

```bash
# Schakel geautomatiseerde dagelijkse back-ups in via de CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

De planning wordt aan de serverzijde uitgevoerd door een achtergrondtaak die elke 30 seconden
(standaard) wordt geactiveerd en de cron-expressie vergelijkt met de lokale servertijd.

| Variabele                                   | Standaard | Beschrijving                                                                                                                      |
| ------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`   | Activeringsinterval in ms (min. `5000`). Moet korter zijn dan 60 s om betrouwbaar binnen de overeenkomende cron-minuut te vallen. |

### SQLite-hotback-up

Voor een back-up zonder downtime van een actieve database:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Dit gebruikt de online back-up-API van SQLite — veilig om uit te voeren terwijl OmniRoute actief is.

---

## Prestatieafstemming

### WAL -modus

WAL is standaard ingeschakeld. Voor hoge schrijfbelastingen kunt u het volgende overwegen:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute stelt `journal_size_limit` niet in. Een controlepunt verplaatst WAL frames naar het hoofdbestand, maar het WAL bestand behoudt de grootste toegewezen grootte. De `OMNIROUTE_WAL_GUARD_MAX_MB` bewaker waarschuwt alleen en voert `wal_checkpoint(RESTART)` uit; het is geen limiet voor schijfgrootte.

### Indexen

Belangrijkste indexen voor prestaties (automatisch gemaakt door migraties):

- `idx_models_provider` — -model opzoeken per provider
- `idx_combo_targets_combo_id` — combo doeluitbreiding
- `idx_usage_history_api_key_timestamp` — gebruiksanalyse
- `idx_quota_snapshots_api_key_window` — quota volgen
- `idx_call_logs_timestamp` — oproeplogboekquery's

Maak een migratie om een nieuwe index toe te voegen:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Geheugen-toegewezen I/O

Voor zeer grote databases (> 10GB) kan de geheugentoewijzing worden aangepast via SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Verdichting

Langdurige OmniRoute instanties profiteren van incidentele `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Wordt maandelijks uitgevoerd tijdens periodes met weinig verkeer. (WAL modus vermindert de behoefte, maar elimineert deze niet.)

---

## Statuscontrole

`src/lib/db/healthCheck.ts` biedt **statusdiagnostiek op databaseniveau**:

Beide werkwoorden vereisen authenticatie (anders `401`). `GET` voert alleen diagnostiek uit; `POST` voert
dezelfde controle uit met `autoRepair` ingeschakeld.

```bash
GET  /api/db/health   # diagnose uitvoeren
POST /api/db/health   # diagnose uitvoeren + herstellen
```

Het antwoord is het door `runDbHealthCheck()` geproduceerde `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domeinbudgetten verwezen naar API-sleutels die niet meer bestaan.",
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

| Veld              | Betekenis                                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` wanneer `issues` leeg is. `driver` heeft hier nooit invloed op.                                                                                                                            |
| `issues[].type`   | Een van `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                                          |
| `repairedCount`   | Rijen die tijdens deze uitvoering zijn hersteld; altijd `0` wanneer `autoRepair` false is.                                                                                                        |
| `backupCreated`   | Of er vóór het herstel een back-up is gemaakt.                                                                                                                                                    |
| `checkedAt`       | ISO-tijdstempel die wordt gedeeld door de uitvoering en elke herstelnotitie die daarbij wordt geschreven.                                                                                         |
| `driver.name`     | SQLite-stuurprogramma dat de gecontroleerde database bedient.                                                                                                                                     |
| `driver.degraded` | `true` wanneer schrijfbewerkingen niet duurzaam door het databasebestand worden ondersteund — de `sql.js` WASM-fallback (persistentie van het volledige bestand) of een database in het geheugen. |

Dezelfde payload wordt geretourneerd door de MCP-tool `omniroute_db_health_check`.

Voer `PRAGMA integrity_check` uit om beschadiging te detecteren:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Moet afdrukken: ok
```

Als dit iets anders dan `ok` retourneert, **stop dan onmiddellijk met het gebruik van de database** en herstel deze vanuit een back-up.

---

## Herstel na calamiteiten

### Scenario 1: WAL-bestand verloren

Het `-wal`-bestand ontbreekt, maar `-shm` en de hoofddatabase zijn intact:

```bash
# Wordt automatisch hersteld bij de volgende opening
omniroute
```

Als SQLite niet automatisch kan herstellen:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenario 2: Hoofddatabasebestand beschadigd

Herstel vanuit een back-up:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` downloadt alleen een volledig `.tar.gz`-archief van een actieve server
(`GET /api/db-backups/exportAll`, operatorreferenties vereist); er wordt niets hersteld.

### Scenario 3: Encryptiesleutel verloren

**Herstel is niet mogelijk** zonder de sleutel. De versleutelde velden zijn onleesbaar. Voeg alle providers handmatig opnieuw toe met nieuwe referenties.

> **Beperkende maatregel**: Maak altijd afzonderlijk een back-up van de encryptiesleutel, bij voorkeur in een wachtwoordbeheerder of KMS.

### Scenario 4: Schijf vol

SQLite retourneert `SQLITE_FULL`-fouten. Maak schijfruimte vrij en voer vervolgens het volgende uit:

```bash
# Voer een checkpoint uit op de WAL om ruimte vrij te maken
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Veelvoorkomende bewerkingen

### Een tabel inspecteren

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Rijen in alle tabellen tellen

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Alle gegevens opnieuw instellen (wissen)

```bash
# Stop OmniRoute eerst
omniroute stop

# Verwijder het databasebestand
rm ~/.omniroute/storage.sqlite*

# Start opnieuw (hierdoor wordt een lege database aangemaakt)
omniroute
```

Voor een **selectieve** reset (providers behouden, gebruiksgegevens wissen):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Eén tabel exporteren

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Probleemoplossing

### "Database is vergrendeld"

Een ander proces houdt een schrijfvergrendeling vast. U kunt:

- Wachten tot het andere proces klaar is (controleer met `lsof | grep storage.sqlite`)
- Het andere proces beëindigen
- OmniRoute opnieuw starten als het probleem aanhoudt

### "Beperking voor externe sleutel mislukt"

Een domeinmodule schendt de referentiële integriteit. Controleer op:

- Verweesde rijen in afhankelijke tabellen
- Trapsgewijze verwijderingen die niet zijn doorgevoerd
- Een recente migratie waarbij een externe sleutel is gewijzigd

Voer `PRAGMA foreign_key_check;` uit om schendingen te vinden.

### "Onvoldoende geheugen"

De geheugen-toegewezen I/O van SQLite overschrijdt de limiet van het besturingssysteem. Verlaag deze via een SQLite-pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB in plaats van 256MB
```

Of schakel deze uit:

```sql
PRAGMA mmap_size = 0;
```

### "Migratie halverwege mislukt"

De migratie is in een transactie uitgevoerd en zou dus moeten zijn teruggedraaid. Als dat niet is gebeurd:

1. **Stop OmniRoute** (voorkom verdere pogingen)
2. **Controleer de databasestatus** met `sqlite3`
3. **Herstel handmatig** de gedeeltelijke migratie
4. **Start OmniRoute opnieuw** (de migratie wordt opnieuw geprobeerd)

Test migraties altijd eerst op een kopie om dit te voorkomen.

---

## Zie ook

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — gebruikstabellen
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — statusbewaking
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — releaseproces
- Bron: `src/lib/db/` (meer dan 80 bestanden, circa 25K regels code)
