# Database Schema & Operations Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Kort fortalt**: OmniRoute bruker **SQLite med WAL-journalføring** som sitt primære datalager, med **AES-256-GCM**-kryptering av sensitive felt ved lagring. Denne veiledningen dekker skjemaet, migreringer, sikkerhetskopiering/gjenoppretting og driftsprosedyrer.

**Kilder:**

- `src/lib/db/core.ts` — singleton-instans + SCHEMA_SQL (17 basistabeller)
- `src/lib/db/migrationRunner.ts` — versjonerte migreringer
- `src/lib/db/migrations/` — 167 versjonerte SQL-filer
- `src/lib/db/encryption.ts` — hjelpefunksjoner for kryptering
- `src/lib/db/backup.ts` — eksport/import av sikkerhetskopier
- `src/lib/db/healthCheck.ts` — helsediagnostikk

---

## Hvorfor SQLite?

OmniRoute valgte SQLite fremfor PostgreSQL/MySQL av flere grunner:

| Faktor                  | SQLite                                     | PostgreSQL                                    |
| ----------------------- | ------------------------------------------ | --------------------------------------------- |
| **Distribusjon**        | Innebygd — ingen separat server            | Krever serveroppsett                          |
| **Kryptering**          | Applikasjonslag (AES-256-GCM)              | Innebygd TDE                                  |
| **Ytelse**              | Raskere for små/mellomstore arbeidsmengder | Bedre for svært mange samtidige skrivinger    |
| **Samtidighet**         | WAL-modus tillater samtidige lesinger      | Full MVCC                                     |
| **Sikkerhetskopiering** | Kopiering av én enkelt fil                 | `pg_dump` eller øyeblikksbilde av filsystemet |
| **Bruksområde**         | Installasjon per bruker, innebygd          | SaaS med flere leietakere                     |

For distribusjoner med **én bruker og én instans** (det primære bruksområdet for OmniRoute) er SQLite enklere og raskere.

### WAL-journalføring

`core.ts` åpner databasen i **WAL-modus (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL tillater **samtidige lesinger** under skriving — noe som er viktig for kontrollpanelet, som utfører spørringer mens forespørsler registreres.

Standard bufferstørrelse er **65 536 KiB (64 MiB)**. SQLite tolker en negativ
`cache_size` som en omtrentlig øvre grense i KiB og tildeler sider etter behov.
**Innstillinger > System og lagring > Bufferstørrelse** godtar heltallsverdier fra **1 til
1 000 000 KiB**. Når innstillingen lagres, brukes den på den aktive databasetilkoblingen,
og OmniRoute gjenoppretter den lagrede verdien ved oppstart.

---

## Databaseplassering

SQLite-filen lagres på:

| Operativsystem | Bane                                                         |
| -------------- | ------------------------------------------------------------ |
| Linux          | `~/.omniroute/storage.sqlite`                                |
| macOS          | `~/.omniroute/storage.sqlite`                                |
| Windows        | `%USERPROFILE%\.omniroute\storage.sqlite`                    |
| Docker         | `/app/data/storage.sqlite` (kan konfigureres via `DATA_DIR`) |

Tilhørende filer:

- `storage.sqlite-wal` — logg for forhåndsskriving
- `storage.sqlite-shm` — delt minnefil
- `call_logs/` — artefakter for forespørselsnyttelaster (hvis aktivert)

**Overstyr plasseringen:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arkitektur for domenemoduler

OmniRoutes database har **110 TypeScript-moduler på toppnivå** i `src/lib/db/`. Hver domenemodul:

- Eier én eller flere bestemte tabeller
- Eksporterer typede CRUD-funksjoner
- Bruker aldri tabellene til en annen modul
- Bruker `getDbInstance()` fra `core.ts` for å få tilgang til databasen

### De 110 databasemodulene på toppnivå

OmniRoute har **110 TypeScript-filer på toppnivå** i `src/lib/db/`. Nedenfor vises et utvalg av kjernemodulene. Se katalogoppføringen for hele listen:

| Modul                   | Tabeller                                                       | Ansvar                                                                         |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Registrering og legitimasjon for leverandører via OAuth/API-nøkkel             |
| `models.ts`             | `key_value` (modelldata)                                       | Modelldefinisjoner, funksjonalitet og prising                                  |
| `combos.ts`             | `combos`                                                       | Konfigurasjon og rekkefølge for kombinasjonsruting                             |
| `apiKeys.ts`            | `api_keys`                                                     | Livssyklus for API-nøkler, omfang og kvotesporing                              |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Systemkonfigurasjon og delt nøkkel/verdi-lager                                 |
| `backup.ts`             | —                                                              | Operasjoner for eksport og import av sikkerhetskopier                          |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxy-konfigurasjoner og rutingsregler                                         |
| `prompts.ts`            | `prompt_templates`                                             | Gjenbrukbare ledetekstmaler og versjonering                                    |
| `webhooks.ts`           | `webhooks`                                                     | Hendelsesdrevne webhook-abonnementer og logger                                 |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Revisjonslogging per forespørsel (valgfritt, stort volum)                      |
| `domainState.ts`        | `domain_*` (5 tabeller)                                        | Domenebudsjetter, kretsbrytere, sperringer, reservekjeder og kostnadshistorikk |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Hvitelistede API-nøkler for MCP/A2A                                            |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historisk kvotebruk                                                            |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Tilordning av modeller til standardkombinasjoner                               |
| `cliToolState.ts`       | `cli_tool_state`                                               | Vedvarende CLI-spesifikk tilstand                                              |
| `encryption.ts`         | —                                                              | Hjelpefunksjoner for kryptering/dekryptering av felt                           |
| `readCache.ts`          | —                                                              | Hurtigbuffer i minnet for leseintensive operasjoner                            |
| `secrets.ts`            | `key_value` (krypterte oppføringer)                            | Kryptert lagring av hemmeligheter                                              |
| `stateReset.ts`         | —                                                              | Sletting/tilbakestilling av databasetilstand for testing                       |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Øktkontekst for overlevering mellom agenter                                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Brukssporing                                                                   |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Komprimeringskonfigurasjon                                                     |

### Modulgrenser

En grunnleggende arkitekturregel er: **Moduler får ikke direkte tilgang til hverandres tabeller**. For å arbeide med data fra en annen modul må du importere funksjonen fra den aktuelle modulen.

```ts
// ❌ FEIL: direkte SQL fra en annen modul
db.prepare("SELECT * FROM provider_connections").all();

// ✅ RIKTIG: bruk funksjonen fra providers-modulen
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Denne regelen håndheves gjennom kodegjennomgang — det finnes ingen statisk kontroll, men brudd blir påpekt.

---

## Grunnskjema (17 tabeller)

`core.ts` definerer de 17 grunntabellene i `SCHEMA_SQL`. Disse opprettes av migreringen `001_initial_schema.sql` og utgjør kjerneskjemaet.

### Kjernetabeller (opprettet i den innledende migreringen)

| Tabell                     | Formål                                        | Nøkkelkolonner                                                          |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Leverandørlegitimasjon (kryptert)             | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Rutinginformasjon for leverandørnoder         | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Generelt nøkkel-verdi-lager                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Definisjoner av rutingskombinasjoner          | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API-nøkler for gatewayen                      | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Databasemetadata                              | `key`, `value`                                                          |
| `usage_history`            | Oppføringer over forespørselsbruk             | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Forespørselsnyttelaster og svar               | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logger for proxyforespørsler                  | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Kjeder fra modell til leverandør              | `model`, `chain`                                                        |
| `domain_budgets`           | Forbruksbudsjetter per domene                 | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historikk over tilbakestilling av budsjett    | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Kostnadssporing per domene                    | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Tilstand for hastighetsbegrensning per domene | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Kretsbrytertilstand per domene                | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Hurtigbuffer for LLM-svar                     | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historiske kvoteøyeblikksbilder               | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Ytterligere tabeller (lagt til av senere migreringer)

Senere migreringer legger til tabeller som:

- `cli_tool_state` (migrering 011) — tilstand for CLI-verktøy
- `mcp_*`-tabeller — revisjon av MCP-server
- `a2a_*`-tabeller — A2A-oppgavetilstand
- `usage_*`-tabeller — brukssporing
- `plugin_*`-tabeller — system for programtillegg
- `skill_executions` — historikk over ferdighetskjøringer
- `memory_*`-tabeller — minnesystem
- `compression_*`-tabeller — komprimeringssystem
- `webhook_*`-tabeller — leveringslogg for webhooks
- `acp_*`-tabeller — Agent Client Protocol
- `oneproxy_*`-tabeller — 1proxy-markedsplass
- `proxy_assignments` — proxytilordninger til virkeområder
- `detailed_call_artifacts` — metadata for kalloggartefakter
- `quota_alert_history` — revisjonshistorikk for kvotevarsler
- `command_code_auth_sessions` — OAuth-økter for Command Code

Den fullstendige listen over rundt 30+ tabeller finnes i `src/lib/db/migrations/`.

---

## Migrasjoner

OmniRoute bruker** versjonerte, idempotente migrasjoner** i `src/lib/db/migrations/`. Hver migrering er en enkelt SQL fil. To navneformater eksisterer side om side; versjonen registrert i `_omniroute_migrations` er det numeriske prefikset.

### Navngivning av migrasjon

| Format                                           | Eksempel                             | Brukes til                                                                                                                                                 |
| ------------------------------------------------ | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (nøyaktig 3 sifre)         | `241_seen_models.sql`                | Den gamle serien `001`–`241`. Frost når tidsstempelformatet landet (`240` og `241` ble slått sammen like før det): ingen ny fil får et sekvensielt nummer. |
| `YYYYMMDDHHMMSS_description.sql` (14 sifre, UTC) | `20261113120000_add_usage_index.sql` | Hver migrasjon opprettet fra 2026-11-13 og videre.                                                                                                         |

Hvorfor endringen: med sekvensielle tall valgte parallelle PRs det samme neste tallet, og alle unntatt én måtte omnummerere før sammenslåing. Et UTC -tidsstempel gir hver PR sin egen versjon.

Regler for tidsstempelformatet (håndhevet av `npm run check:migration-numbering`, delt med generatoren i `scripts/check/lib/migrationNaming.mjs`):

- Tidsstemplet er en ekte UTC dato og -klokkeslett, ikke tidligere enn `20261113000000` og ikke mer enn 10 minutter i fremtiden.
- Beskrivelsen er liten `snake_case` som starter med en bokstav (`a-z`, `0-9`, enkelt `_` mellom ord), maksimalt 80 tegn.
- To filer med samme tidsstempel er et duplikat.
- No-gap-regelen gjelder bare for den gamle serien: hvert tall fra `001` til `241` må eksistere, bortsett fra de kjente gapene `026`, `055` og `121`. Sletting av `241` (eller en hvilken som helst gammel fil) mislykkes i porten. `001` og `241` kan aldri legges til `KNOWN_GAPS` godkjenningslisten. Tidsstemplede filer skaper aldri et gap.
- Hver oppføring i `src/lib/db/migrations/` må være en vanlig fil med et gyldig `.sql` navn med små bokstaver. En katalog, en symbolkobling, en `.SQL` eller `.sql.bak` -fil, en skjult fil eller et navn med et mellomrom svikter porten, fordi løperen ville hoppe over den stille eller krasje ved oppstart.

**Bruk ordre.** Løperen sorterer etter den numeriske verdien til prefikset, ikke etter tekst: de gamle `001`–`241` -filene først, deretter de tidsstemplede filene i tidsstempelrekkefølge, deretter eventuelle navneavstandskataloger registrert med `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (versjoner som `ee-001`). En ventende migrering er enhver fil hvis versjon ikke er i `_omniroute_migrations`, så en migrering fra en eldre gren som slår seg sammen etter en nyere, gjelder fortsatt på eksisterende databaser.

**Tidsstemplet er opprettelsesrekkefølge, ikke sammenslåingsrekkefølge.** Hvis migreringen avhenger av en tabell eller kolonne opprettet av en migrering med en** nyere** tidsstempel (for eksempel en fra en annen PR som slo seg sammen først), ville en fersk database kjøre din først og mislykkes. Mens PR fortsatt er åpen, regenerer filnavnet med `npm run db:new-migration` slik at det får et nyere tidsstempel, eller gjør det uavhengig. `npm run test:migrations:fresh` bruker hver migrering til en tom database og fanger opp dette.

### En sammenslått migrering blir aldri slettet eller omdøpt

Når en migreringsfil er på en utgivelsesgren eller `main`, har den allerede kjørt på homolog- og utviklerdatabaser, på VPS installasjoner og i Enterprise-synkroniseringen. Fra da av:

- **Slett den aldri.** Nye installasjoner ville miste skjemaet mens oppgraderte databaser beholder det.
- **Gi den aldri nytt navn.** Versjonen i `_omniroute_migrations` ville ikke lenger samsvare med en fil, så hver database som allerede brukte den ville kjøre den på nytt. Ikke-idempotent SQL dupliserer deretter data eller stopper oppstarten.
- **Trenger du et annet skjema?** Opprett en ny migrering med `npm run db:new-migration`.

Gi nytt navn er trygt bare for en fil som ikke er slått sammen ennå, noe som er tilfellet portens hint refererer til. En utgivelseskode endrer ingenting her: hvert trykk til en `release/v*` gren publiserer Docker `:next` bildet og kjører på homolog, VPS installasjoner og Enterprise-synkronisering, så en sammenslått migrering har kjørt på ekte databaser før noen `vX.Y.Z` tag eksisterer. Porten mislykkes hver fjerning av en basisfil, merket eller ikke.

- **Tilbakestiller en sammenslått migrering.** En `git revert` som sletter filen svikter porten. Behold filen og angre skjemaet i en ny migrering: `npm run db:new-migration -- <description>`, med `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` og så videre. Oppgraderte og ferske databaser ender deretter med det samme skjemaet.
- **Den ene aksepterte endre navn: en kompatibilitetsoppføring og identisk innhold.** Hvis en sammenslått fil må flyttes (for eksempel to sammenslåtte filer deler et tidsstempel og løperen stopper med en versjonskollisjon), gi nytt navn til den senere uten å berøre dens SQL og legg til `{ fromVersion, fromName, toVersion, toName }` til `RENAMED_MIGRATION_COMPATIBILITY` i `src/lib/db/migrationRunner/constants.ts`. Databaser som brukte den gamle versjonen får flyttet `_omniroute_migrations` raden i stedet for å kjøre filen på nytt. Porten advarer om et slikt omnavn og kjører alltid kommutasjonssjekken på den, uansett det nye tidsstempelet: ferske installasjoner bruker filen på den nye posisjonen, oppgraderte databaser gjør det ikke, så velg et nytt tidsstempel i nærheten av det gamle. Porten mislykkes med å endre navn hvis innholdet endres (en skjemaendring fortsetter i en ny migrering), eller hvis oppføringens målfil ikke er på disken.
- **Gi aldri nytt navn innen samme tidsstempel.** Et nytt navn som beholder tidsstemplet og endrer kun beskrivelsen, svikter porten, med eller uten en oppføring. Med en oppføring hvis `toVersion` tilsvarer dens `fromVersion`, sletter løperen den gamle `_omniroute_migrations` raden og bruker filen igjen på hver database som allerede har kjørt den. Uten en oppføring sporer løperen bare versjonen: den hopper over filen på disse databasene (nytt innhold kjører aldri der) og logger en omnummereringsfeil ved hver oppstart. Bruk et annet tidsstempel pluss en kompatibilitetsoppføring, eller behold navnet.
- **Porten sjekker at den omdøpte filen ikke kjører igjen.** For hvert dekket nytt navn sender porten det nye filnavnet til kommuteringssjekken med `--must-not-apply`. Kontrollen starter opp den oppgraderte databasen med den virkelige løperen, og hvis løperen bruker den filen på nytt (for eksempel fordi oppføringen har feil versjon eller navn, eller fordi portens tekstparser leser `constants.ts` annerledes enn TypeScript), svikter porten med `migration renomeada rodaria de novo` og ber deg sjekke oppføringens gamle og nye versjoner og navn.

### Hva porten sjekker mot basen

Ved pull request og merge-queue-kjøringer, sammenligner `npm run check:migration-numbering` `src/lib/db/migrations/` på disk med samme katalog på basisgrenen. Basen er, i denne rekkefølgen: `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` variabelen, eller, når `GITHUB_EVENT_NAME` er `pull_request`, `pull_request_target` eller `merge_group`, den første overordnede for merge-commit, `merge_group.base_sha` for hendelsesnyttelasten, eller `git merge-base HEAD origin/$GITHUB_BASE_REF`. I en pull-forespørsel eller sammenslåingskøkjøring uten løsbar base svikter porten. Utenfor CI uten `--base` skriver den ut `comparação com a base: pulada (sem --base)` og hopper over disse reglene.

`--base-latest-tag` sammenligner med den nyeste utgivelses-taggen (`vX.Y.Z` i semver-rekkefølge; suffiksede koder som nightlies teller ikke) som er i historien til `HEAD`, med de samme reglene som `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) kjører porten på denne måten, fordi push og planlagte kjøringer ikke har noen base for pull-forespørsel, og en sammenslåing kan lande uten en ny CI kjøring. Uten utgivelsesmerke i historien svikter porten; kjør `git fetch --tags` (i CI bringer `actions/checkout` med `fetch-depth: 0` taggene).

| Endre på pull-forespørselen                                                                                           | Resultat                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| En fil som finnes på basen får nytt navn, med en `RENAMED_MIGRATION_COMPATIBILITY` -oppføring                         | **Advarsel** hvis innholdet er identisk, og kommuteringskontrollen kjører uansett det nye tidsstemplet; den mislykkes hvis den nye posisjonen endrer det endelige skjemaet (angre det nye navnet, eller velg et nytt nytt tidsstempel der den pendler) eller hvis løperen vil bruke den omdøpte filen igjen på en oppgradert database.** Mislykkes** hvis innholdet endret seg. |
| En fil som eksisterer på basen får nytt navn og beholder tidsstempelet (bare beskrivelsen endres)                     | **Mislykkes** , med eller uten en oppføring: løperen ville bruke den på nytt (med oppføringen) eller hoppe over den etter versjon (uten en). Bruk et annet tidsstempel pluss en kompatibilitetsoppføring, eller behold navnet.                                                                                                                                                  |
| En fil som finnes på basen blir slettet, eller omdøpt uten en oppføring                                               | **Mislykkes** , om filen er i en utgivelseskode eller ikke. For å angre det, gjenopprett filen med `git checkout <base> -- src/lib/db/migrations/<file>`; for å tilbakestille skjemaet, legg til en ny migrering med `DROP ... IF EXISTS`.                                                                                                                                      |
| En fil som finnes på basen har et annet innhold                                                                       | **Advarsel** (en `::warning` -merknad i GitHub Actions), og kommuteringskontrollen kjører. Det mislykkes hvis redigeringen endrer det endelige skjemaet, fordi oppgraderte databaser ikke bruker den redigerte filen igjen: legg endringen i en ny migrering. En harmløs redigering (en kommentar, `IF NOT EXISTS`) advarer bare.                                               |
| En tidsstemplet fil legges til med et tidsstempel som ikke er nyere enn basens nyeste                                 | Kjører kommuteringssjekken, beskrevet nedenfor.                                                                                                                                                                                                                                                                                                                                 |
| En `NNN_` fil i gammelt format legges til med et nummer under basens nyeste fil i gammelt format                      | **Mislykkes** , selv om `KNOWN_GAPS` er redigert i samme pull-forespørsel: den gamle serien er frosset, lag migreringen med `npm run db:new-migration`. Gammelt format filer over basens nyeste (en `release/v*` til `main` pull-forespørsel) godtas.                                                                                                                           |
| En fil som ikke er i orden, redigert eller omdøpt, inneholder `INSERT`, `UPDATE`, `DELETE` eller `REPLACE` -setninger | **Advarsel** : kommuteringssjekken sammenligner ikke data, så se om rekkefølgen som oppgraderte og ferske databaser bruker dem endrer resultatet.                                                                                                                                                                                                                               |

En kjøring av kommuteringskontrollen dekker de uordnede, de redigerte og de omdøpte filene sammen.

Kommuteringskontrollen (`scripts/check/migration-commutation.ts`) bygger to midlertidige databaser med den virkelige installasjonsbanen: an** oppgradert** en (start opp med basismigreringene, og start deretter opp igjen på samme fil med pull-forespørselens migreringer) og en** fersk** én (én oppstart med migreringene til pull-forespørselen). Den sammenligner de resulterende skjemaene: tabeller og kolonner (ignorerer kolonnerekkefølge), UNIQUE / PRIMARY KEY og FOREIGN KEY begrensninger, den normaliserte `CREATE TABLE` teksten til hver tabell (som dekker CHECK begrensninger, sammenstillinger, genererte kolonner og tabellalternativer), indekser, utløsere og visninger. Raddata sammenlignes ikke. Hvis de samsvarer, skriver porten ut at filen er ute av drift, men pendler, og passerer. Hvis de er forskjellige, svikter porten med forskjellen og et hint for saken: for en fil som ikke er i orden, regenerer navnet med `npm run db:new-migration`, som er trygt fordi filen ikke er slått sammen ennå; for en redigert basisfil, gjenopprett grunninnholdet og legg endringen inn i en ny migrering; for en omdøpt fil, angre omdøpet eller velg et nytt nytt tidsstempel der den pendler, aldri det samme tidsstempelet med et annet navn. Hvis selve sjekken ikke kan kjøre, svikter porten i CI og advarer kun lokalt. For en redigert basisfil bygges den oppgraderte databasen med basens innhold i den filen, og den andre oppstarten hopper over den fordi versjonen allerede er registrert. For en omdøpt fil bygges den oppgraderte databasen med filen under det gamle navnet, og den andre oppstarten flytter `_omniroute_migrations` raden gjennom kompatibilitetsoppføringen i stedet for å kjøre den igjen; porten sender det nye navnet med `--must-not-apply`, så kontrollen mislykkes hvis den andre oppstarten bruker den. Hvis en migrering av pull-forespørsel ikke fungerer på den oppgraderte banen, det vil si etter hver basismigrering (enten den også mislykkes på en ny installasjon eller ikke), rapporterer porten `migration do PR não aplica` og ber deg fikse SQL mot basens gjeldende skjema; hvis filen er avhengig av en annen migrering av pull-forespørsel med et senere tidsstempel, regenerer navnet med `npm run db:new-migration`.

For å kjøre den samme sammenligningen lokalt, send basen eksplisitt, for eksempel `npm run check:migration-numbering -- --base origin/<base-branch>`, eller `npm run check:migration-numbering -- --base-latest-tag` for å sammenligne med den siste utgivelsen.

### Konvertering av en åpen PR's `NNN` -migrering

En pull-forespørsel åpnet før bryteren kan fortsatt inneholde en sekvensiell fil som `242_add_widgets.sql`. Gamle tall over `241` blir avvist, så konverter det før du slår sammen:

1. **Gi nytt navn til filen med generatoren, behold beskrivelsen.** Kjør `npm run db:new-migration -- <same description>` for å få det nye navnet, flytt SQL inn i den og slett den gamle `NNN_` filen. Beskrivelsen må forbli identisk: kompatibilitetsoppføringen nedenfor samsvarer med den.
2. **Legg til en kompatibilitetsoppføring hvis en vedvarende database kjørte det gamle nummeret.** Hvis en database som holdes (homolog, en VPS, en bidragsyters egen installasjon) kjørte en build av PR med `NNN_` filen, legg til `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` til `RENAMED_MIGRATION_COMPATIBILITY` i `src/lib/db/migrationRunner/constants.ts`. Dette er** kreves for `237` til `241`** : disse sporene har nå de kanoniske `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` og `241_seen_models.sql`, og uten oppføringen hopper en slik database over den kanoniske migreringen for alltid og kjører den konverterte igjen. Det fungerer også for et spor som forblir tomt, for eksempel `242`, når destinasjonen er et tidsstempel. Når du er i tvil, legg til oppføringen. Hvor du legger det til i matrisen spiller ingen rolle: når en oppførings målspor fortsatt har en rad som en annen oppføring beveger seg unna (for eksempel `237` holder en PR rad mens en eldre `usage_history_calculated_cost` rad venter på å flytte inn i `237`), lar løperen denne oppføringen vente til sporet er ledig. Bare en reell konflikt, for eksempel et spor som holdes av en rad ingen oppføring flyttes, eller to oppføringer som bytter spor, stopper oppstarten med `Cannot reconcile ...`.
3. **Hold SQL idempotent** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), fordi den konverterte migreringen kan møte en database der skjemaet allerede eksisterer.
4. **Flytt versjonstastede spesialtilfeller.** Hvis PR la til en kasus for det gamle nummeret i `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) eller i `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), endre nøkkelen til det nye tidsstemplet.

`tests/unit/db/codex-fence-migration-rename.test.ts` er et fungerende eksempel på en test for en omdøpt migrering.

### Tilbakeporter til grener før byttet

Aldri cherry-pick eller backport en `YYYYMMDDHHMMSS_` fil til en gren som er før svitsjen (for eksempel en eldre `release/v*` -gren). Løperen der sorterer filnavn som tekst, så en tidsstemplet fil vil kjøre mellom `201_` og `202_` på en fersk database, og den gamle porten der forstår ikke 14-sifrede prefikser. På en slik gren, skriv endringen som den grenens egen neste `NNN_` fil, idempotent, så det er en no-op når den tidsstemplede versjonen kommer senere.

### Hvordan migreringer kjører

Ved oppstart, `migrationRunner.ts`:

1. Oppretter `_omniroute_migrations` tabell hvis den ikke eksisterer
2. Forespørsler for allerede brukte migreringer
3. Bruker alle nye migreringer i rekkefølge, hver i en transaksjon
4. Registrerer hver påført migrering med tidsstempel

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

Migrasjoner må være** idempotent** — å kjøre dem to ganger bør være en no-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Bruk `IF NOT EXISTS`, `IF EXISTS` og `OR IGNORE` / `OR REPLACE` klausuler rikelig.

### Legger til en ny migrering

1. **Lag filen med generatoren** : `npm run db:new-migration -- <description>` (for eksempel `npm run db:new-migration -- add combo priority`). Den skriver `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` med gjeldende UTC tid og en kommentartopp, går ett sekund fremover hvis tidsstemplet tas, og overskriver aldri en fil. Ikke velg et tall for hånd.
2. **Bruk sikker DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Fyll ut data nøye** : bruk `UPDATE ... WHERE ...` for å håndtere eksisterende rader
4. **Sjekk rekkefølge og navn** : `npm run test:migrations:fresh` (alle migreringer på en tom database) og `npm run check:migration-numbering`
5. **Test på en kopi** : Kjør aldri utestede migreringer på produksjon

Eksempel:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Bakover-inkompatible endringer** (f.eks. slippe kolonner) er vanskelig. OmniRoute støtter NOT nedgradering av — når en migrering er tatt i bruk, er skjemaendringen permanent. Planlegg deretter.

---

## Kryptering av lagrede data

Sensitive felt (API-nøkler, OAuth-tokener, tilkoblingsstrenger) krypteres ved lagring med **AES-256-GCM**.

### Slik fungerer det

```ts
// src/lib/db/encryption.ts (forenklet)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Hvor det brukes

- `provider_connections.api_key` — kryptert på applikasjonsnivå
- `provider_connections.access_token`, `refresh_token`, `id_token` — kryptert på applikasjonsnivå
- `key_value`-oppføringer med `namespace = "secrets"` — kryptert på applikasjonsnivå
- `proxy_registry.auth` — kryptert på applikasjonsnivå (hvis angitt)

### Krypteringsnøkkel

Krypteringsnøkkelen utledes fra en **passfrase** (angitt via miljøvariabelen `STORAGE_ENCRYPTION_KEY`) og et **salt** (lagret i databasen). Begge kreves for å dekryptere data.

```bash
# Generer en sikker passfrase
openssl rand -hex 32

# Angi i .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritisk**: Hvis krypteringsnøkkelen går tapt, mister du tilgangen til alle krypterte data. **Sikkerhetskopier nøkkelen separat fra databasen**.

### Dette krypteres IKKE

Av ytelseshensyn lagres følgende i klartekst:

- Visningsnavn for leverandører
- Modelldefinisjoner (allerede offentlige)
- Rutingsregler
- Bruksoppføringer (ingen PII)

---

## Forbehold ved kryptering (v3.8.16+)

OmniRoute bruker **`migrateLegacyEncryptedString()`** for å håndtere to krypteringsmetoder sømløst:

- **Eldre** (før v3.5.0): XOR-basert «kryptering» (ikke ekte kryptografi)
- **Gjeldende**: AES-256-GCM med korrekt IV og autentiseringstagg

Migreringshjelperen oppdager det eldre formatet og krypterer på nytt med den nye metoden ved første lesing. Dette betyr at du kan oppgradere en gammel database uten å miste påloggingsopplysninger.

---

## Lesebuffer

For data som leses ofte (modeller, leverandører, innstillinger), tilbyr `readCache.ts` en **buffer i minnet**:

```ts
// Bufres ved oppstart, ugyldiggjøres ved skriving
const providers = await getCachedProviders(); // Raskt, i minnet
const fresh = await listProviders(); // Tregt, leser fra databasen
```

| Bufret entitet         | Buffernøkkel   | TTL               |
| ---------------------- | -------------- | ----------------- |
| `models`               | `models:v1`    | Frem til skriving |
| `provider_connections` | `providers:v1` | Frem til skriving |
| `settings`             | `settings:v1`  | Frem til skriving |
| `combos`               | `combos:v1`    | Frem til skriving |

Bufferen ugyldiggjøres ved hver skriving til den tilsvarende tabellen.

---

## Sikkerhetskopiering og gjenoppretting

### Manuell sikkerhetskopiering

```bash
# Bruk CLI-verktøyet til å opprette en lokal sikkerhetskopi
omniroute backup create --name pre-migration

# Eller via API-et
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Sikkerhetskopifilen inneholder:

- Alle databasetabeller (serialisert til JSON)
- Artefakter fra kallloggen (base64-kodet, valgfritt)
- Innstillinger + hemmeligheter (kryptert)
- Programtilleggskonfigurasjon

### Gjenoppretting

```bash
# Via CLI
omniroute restore pre-migration

# Via API-et
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Advarsel**: Gjenoppretting overskriver hele databasen. Stopp alle klienter først.

### Automatiserte sikkerhetskopier

```bash
# Aktiver automatiske daglige sikkerhetskopier via CLI-verktøyet
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Tidsplanen kjøres på serversiden av en bakgrunnsjobb som kjører hvert 30. sekund
(standard) og evaluerer cron-uttrykket mot serverens lokale tid.

| Variabel                                    | Standardverdi | Beskrivelse                                                                                                             |
| ------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`       | Intervall i ms (min. `5000`). Må være kortere enn 60 s for å treffe det samsvarende cron-minuttet på en pålitelig måte. |

### Aktiv SQLite-sikkerhetskopiering

For sikkerhetskopiering uten nedetid av en database som er i bruk:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Dette bruker SQLite sitt API for sikkerhetskopiering på nett — trygt å kjøre mens OmniRoute kjører.

---

## Ytelsesjustering

### WAL -modus

WAL er aktivert som standard. For høyskrivende arbeidsbelastninger bør du vurdere:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute setter ikke `journal_size_limit`. Et sjekkpunkt flytter WAL rammer inn i hovedfilen, men WAL filen beholder sin største tildelte størrelse. `OMNIROUTE_WAL_GUARD_MAX_MB` vakten varsler og kjører kun `wal_checkpoint(RESTART)`; det er ikke en hette på diskstørrelse.

### Indekser

Nøkkelindekser for ytelse (automatisk opprettet av migreringer):

- `idx_models_provider` — modelloppslag etter leverandør
- `idx_combo_targets_combo_id` — combo mål utvidelse
- `idx_usage_history_api_key_timestamp` — bruksanalyse
- `idx_quota_snapshots_api_key_window` — kvotesporing
- `idx_call_logs_timestamp` — anropsloggspørringer

For å legge til en ny indeks, opprett en migrering:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Minnetilordnet I/O

For veldig store databaser (> 10GB), kan minnekartlegging justeres via SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Komprimering

Langvarige OmniRoute forekomster drar nytte av sporadiske `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Kjør månedlig under lite trafikkerte vinduer. (WAL modus reduserer behovet, men eliminerer det ikke.)

---

## Tilstandskontroll

`src/lib/db/healthCheck.ts` tilbyr **tilstandsdiagnostikk på databasenivå**:

Begge verbene krever autentisering (`401` ellers). `GET` utfører bare diagnostikk; `POST` kjører den
samme kontrollen med `autoRepair` aktivert.

```bash
GET  /api/db/health   # utfør diagnostikk
POST /api/db/health   # utfør diagnostikk + reparasjon
```

Responsen er `DbHealthCheckResult` som produseres av `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domenebudsjetter refererte til API-nøkler som ikke lenger finnes.",
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

| Felt              | Betydning                                                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` når `issues` er tom. `driver` påvirker aldri denne verdien.                                                                                               |
| `issues[].type`   | Én av `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                           |
| `repairedCount`   | Rader som ble reparert under denne kjøringen; alltid `0` når `autoRepair` er false.                                                                              |
| `backupCreated`   | Om det ble tatt en sikkerhetskopi før reparasjonen.                                                                                                              |
| `checkedAt`       | ISO-tidsstempel som deles av kjøringen og eventuelle reparasjonsmerknader den skriver.                                                                           |
| `driver.name`     | SQLite-driveren som betjener databasen som kontrolleres.                                                                                                         |
| `driver.degraded` | `true` når skriveoperasjoner ikke sikkerhetskopieres varig av databasefilen — `sql.js`-WASM-reserveløsningen (lagring av hele filen) eller en database i minnet. |

Den samme nyttelasten returneres av MCP-verktøyet `omniroute_db_health_check`.

Kjør `PRAGMA integrity_check` for å oppdage korrupsjon:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Skal skrive ut: ok
```

Hvis den returnerer noe annet enn `ok`, må du **umiddelbart slutte å bruke databasen** og gjenopprette fra en sikkerhetskopi.

---

## Katastrofegjenoppretting

### Scenario 1: WAL-filen er tapt

`-wal`-filen mangler, men `-shm` og hoveddatabasen er intakte:

```bash
# Gjenopprettes automatisk ved neste åpning
omniroute
```

Hvis SQLite ikke kan gjenopprette automatisk:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenario 2: Hoveddatabasefilen er skadet

Gjenopprett fra sikkerhetskopi:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` laster bare ned et fullstendig `.tar.gz`-arkiv fra en kjørende server
(`GET /api/db-backups/exportAll`, operatørlegitimasjon kreves); den gjenoppretter ikke noe.

### Scenario 3: Krypteringsnøkkelen er tapt

**Ingen gjenoppretting er mulig** uten nøkkelen. De krypterte feltene er uleselige. Legg til alle leverandører på nytt manuelt med ny legitimasjon.

> **Risikoreduserende tiltak**: Sikkerhetskopier alltid krypteringsnøkkelen separat, helst i en passordbehandler eller KMS.

### Scenario 4: Disken er full

SQLite returnerer `SQLITE_FULL`-feil. Frigjør diskplass, og kjør deretter:

```bash
# Opprett et kontrollpunkt for WAL for å frigjøre plass
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Vanlige operasjoner

### Inspiser en tabell

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Tell rader i alle tabeller

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Tilbakestill (slett) alle data

```bash
# Stopp OmniRoute først
omniroute stop

# Slett databasefilen
rm ~/.omniroute/storage.sqlite*

# Start på nytt (oppretter en tom database på nytt)
omniroute
```

For en **selektiv** tilbakestilling (behold leverandører, slett bruksdata):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Eksporter én tabell

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Feilsøking

### "Databasen er låst"

En annen prosess holder en skrivelås. Du kan enten:

- Vente til den andre prosessen er ferdig (sjekk `lsof | grep storage.sqlite`)
- Avslutte den andre prosessen
- Starte OmniRoute på nytt hvis problemet vedvarer

### "Fremmednøkkelbegrensning mislyktes"

En domenemodul bryter referanseintegriteten. Sjekk:

- Foreldreløse rader i avhengige tabeller
- Kaskadeslettinger som ikke ble videreført
- Nylig migrering som endret en fremmednøkkel

Kjør `PRAGMA foreign_key_check;` for å finne brudd.

### "Ikke nok minne"

SQLites minnetilordnede I/O overskrider operativsystemets grense. Reduser den via et SQLite-pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128 MB i stedet for 256 MB
```

Eller deaktiver den:

```sql
PRAGMA mmap_size = 0;
```

### "Migreringen mislyktes underveis"

Migreringen kjørte i en transaksjon, så den skal ha blitt rullet tilbake. Hvis ikke:

1. **Stopp OmniRoute** (forhindre flere forsøk)
2. **Kontroller databasens tilstand** med `sqlite3`
3. **Rett opp den delvise migreringen manuelt**
4. **Kjør OmniRoute på nytt** (migreringen forsøkes på nytt)

For å forhindre dette bør du alltid teste migreringer på en kopi først.

---

## Se også

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — brukstabeller
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — tilstandsovervåking
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — utgivelsesflyt
- Kilde: `src/lib/db/` (80+ filer, ~25K kodelinjer)
