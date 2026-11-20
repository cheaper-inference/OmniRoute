# Database Schema & Operations Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute använder **SQLite med WAL-journalföring** som sitt primära datalager, med **AES-256-GCM**-kryptering av känsliga fält i vila. Den här guiden beskriver schemat, migreringar, säkerhetskopiering/återställning och operativa körinstruktioner.

**Källor:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 bastabeller)
- `src/lib/db/migrationRunner.ts` — versionshanterade migreringar
- `src/lib/db/migrations/` — 167 versionshanterade SQL-filer
- `src/lib/db/encryption.ts` — hjälpfunktioner för kryptering
- `src/lib/db/backup.ts` — export/import av säkerhetskopior
- `src/lib/db/healthCheck.ts` — hälsodiagnostik

---

## Varför SQLite?

OmniRoute valde SQLite framför PostgreSQL/MySQL av flera skäl:

| Faktor                 | SQLite                                         | PostgreSQL                                      |
| ---------------------- | ---------------------------------------------- | ----------------------------------------------- |
| **Driftsättning**      | Inbäddad — ingen separat server                | Kräver serverkonfiguration                      |
| **Kryptering**         | Applikationslager (AES-256-GCM)                | Inbyggd TDE                                     |
| **Prestanda**          | Snabbare för små/medelstora arbetsbelastningar | Bättre för enorma mängder samtidiga skrivningar |
| **Samtidighet**        | WAL-läge tillåter samtidiga läsningar          | Fullständig MVCC                                |
| **Säkerhetskopiering** | Kopiering av en enda fil                       | `pg_dump` eller ögonblicksbild av filsystemet   |
| **Användningsfall**    | Installation per användare, inbäddad           | SaaS med flera klientorganisationer             |

För driftsättningar med **en användare och en instans** (det primära användningsfallet för OmniRoute) är SQLite enklare och snabbare.

### WAL-journalföring

`core.ts` öppnar databasen i **WAL-läge (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL möjliggör **samtidiga läsningar** under skrivningar — viktigt för instrumentpanelen, som kör frågor medan förfrågningar registreras.

Standardstorleken för cachen är **65 536 KiB (64 MiB)**. SQLite tolkar ett negativt
`cache_size` som en ungefärlig övre gräns i KiB och allokerar sidor efter behov.
**Inställningar > System och lagring > Cachestorlek** accepterar heltalsvärden från **1 till
1 000 000 KiB**. När inställningen sparas tillämpas den på den aktiva databasanslutningen,
och OmniRoute återställer det sparade värdet vid start.

---

## Databasens plats

SQLite-filen lagras på:

| OS      | Sökväg                                                       |
| ------- | ------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                |
| macOS   | `~/.omniroute/storage.sqlite`                                |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                    |
| Docker  | `/app/data/storage.sqlite` (kan konfigureras via `DATA_DIR`) |

Tillhörande filer:

- `storage.sqlite-wal` — write-ahead-logg
- `storage.sqlite-shm` — fil för delat minne
- `call_logs/` — artefakter för förfrågningars nyttolaster (om aktiverat)

**Åsidosätt platsen:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domänmodularkitektur

OmniRoutes databas har **110 TypeScript-moduler på toppnivå** i `src/lib/db/`. Varje domänmodul:

- Ansvarar för en eller flera specifika tabeller
- Exporterar typade CRUD-funktioner
- Ändrar aldrig tabeller som tillhör en annan modul
- Använder `getDbInstance()` från `core.ts` för att komma åt databasen

### De 110 databasmodulerna på toppnivå

OmniRoute har **110 TypeScript-filer på toppnivå** i `src/lib/db/`. Nedan visas ett urval av centrala moduler; se kataloglistningen för den fullständiga listan:

| Modul                   | Tabeller                                                       | Ansvarsområde                                                                   |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registrering och autentiseringsuppgifter för leverantörer via OAuth/API-nycklar |
| `models.ts`             | `key_value` (modelldata)                                       | Modelldefinitioner, funktioner, prissättning                                    |
| `combos.ts`             | `combos`                                                       | Konfiguration och ordning för kombinationsroutning                              |
| `apiKeys.ts`            | `api_keys`                                                     | API-nycklars livscykel, behörighetsområden och kvotspårning                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Systemkonfiguration och delat KV-lager                                          |
| `backup.ts`             | —                                                              | Åtgärder för export/import av säkerhetskopior                                   |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxykonfigurationer och routningsregler                                        |
| `prompts.ts`            | `prompt_templates`                                             | Återanvändbara promptmallar och versionshantering                               |
| `webhooks.ts`           | `webhooks`                                                     | Händelsedrivna webhookprenumerationer och loggar                                |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Granskningsloggning per begäran (valfritt, stor volym)                          |
| `domainState.ts`        | `domain_*` (5 tabeller)                                        | Domänbudgetar, kretsbrytare, låsningar, reservkedjor och kostnadshistorik       |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Vitlistade API-nycklar för MCP/A2A                                              |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historisk kvotanvändning                                                        |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Kopplar modeller till standardkombinationer                                     |
| `cliToolState.ts`       | `cli_tool_state`                                               | Beständigt tillstånd specifikt för CLI                                          |
| `encryption.ts`         | —                                                              | Hjälpfunktioner för kryptering/dekryptering av fält                             |
| `readCache.ts`          | —                                                              | Minnesbaserad cache för läsintensiva åtgärder                                   |
| `secrets.ts`            | `key_value` (krypterade poster)                                | Krypterad lagring av hemligheter                                                |
| `stateReset.ts`         | —                                                              | Rensning/återställning av databastillstånd för testning                         |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Sessionskontext för agentöverlämning                                            |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Användningsspårning                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Komprimeringskonfiguration                                                      |

### Modulgränser

En central arkitekturregel är: **moduler kommer inte åt varandras tabeller direkt**. För att arbeta med data från en annan modul ska funktionen från den modulen importeras.

```ts
// ❌ FEL: direkt SQL från en annan modul
db.prepare("SELECT * FROM provider_connections").all();

// ✅ RÄTT: använd funktionen från providers-modulen
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Den här regeln upprätthålls genom kodgranskning — det finns ingen statisk kontroll, men överträdelser flaggas.

---

## Basschema (17 tabeller)

`core.ts` definierar de 17 bastabellerna i `SCHEMA_SQL`. Dessa skapas av migreringen `001_initial_schema.sql` och utgör kärnschemat.

### Kärntabeller (skapade i den inledande migreringen)

| Tabell                     | Syfte                                   | Nyckelkolumner                                                          |
| -------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Leverantörsuppgifter (krypterade)       | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Routningsinformation för leverantörsnod | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Allmänt nyckel-värde-lager              | `namespace`, `key`, `value`                                             |
| `combos`                   | Definitioner av routningskombinationer  | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API-nycklar för gatewayen               | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Databasmetadata                         | `key`, `value`                                                          |
| `usage_history`            | Poster över användning per begäran      | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Begärans nyttolaster och svar           | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Loggar över proxybegäranden             | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Kedjor från modell till leverantör      | `model`, `chain`                                                        |
| `domain_budgets`           | Utgiftsbudgetar per domän               | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historik över budgetåterställningar     | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Kostnadsspårning per domän              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domänens tillstånd för frekvensgränser  | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Kretsbrytartillstånd per domän          | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache för LLM-svar                      | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historiska ögonblicksbilder av kvoter   | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Ytterligare tabeller (tillagda av senare migreringar)

Efterföljande migreringar lägger till tabeller som:

- `cli_tool_state` (migrering 011) — CLI-verktygets tillstånd
- `mcp_*`-tabeller — granskning av MCP-servrar
- `a2a_*`-tabeller — tillstånd för A2A-uppgifter
- `usage_*`-tabeller — användningsspårning
- `plugin_*`-tabeller — insticksmodulsystem
- `skill_executions` — historik över färdighetskörningar
- `memory_*`-tabeller — minnessystem
- `compression_*`-tabeller — komprimeringssystem
- `webhook_*`-tabeller — logg över webhook-leveranser
- `acp_*`-tabeller — Agent Client Protocol
- `oneproxy_*`-tabeller — 1proxy-marknadsplats
- `proxy_assignments` — bindningar för proxyomfattning
- `detailed_call_artifacts` — metadata för artefakter i anropsloggar
- `quota_alert_history` — granskning av kvotvarningar
- `command_code_auth_sessions` — OAuth-sessioner för Command Code

Den fullständiga listan med cirka 30+ tabeller finns i `src/lib/db/migrations/`.

---

## Migrationer

OmniRoute använder** versionerade, idempotenta migrationer** i `src/lib/db/migrations/`. Varje migrering är en enda SQL fil. Två namngivningsformat samexisterar; versionen registrerad i `_omniroute_migrations` är det numeriska prefixet.

### Migration Namngivning

| Formatera                                          | Exempel                              | Används för                                                                                                                                                  |
| -------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NNN_description.sql` (exakt 3 siffror)            | `241_seen_models.sql`                | Den gamla serien `001`–`241`. Fryst när tidsstämpelformatet landade (`240` och `241` slogs ihop precis innan det): ingen ny fil får ett sekventiellt nummer. |
| `YYYYMMDDHHMMSS_description.sql` (14 siffror, UTC) | `20261113120000_add_usage_index.sql` | Varje migrering skapad från 2026-11-13 och framåt.                                                                                                           |

Varför ändringen: med sekventiella nummer valde parallell PRs samma nästa nummer och alla utom en var tvungna att numrera om innan de slogs samman. En UTC tidsstämpel ger varje PR sin egen version.

Regler för tidsstämpelformatet (tillämpas av `npm run check:migration-numbering`, delas med generatorn i `scripts/check/lib/migrationNaming.mjs`):

- Tidsstämpeln är ett riktigt UTC datum och -tid, inte tidigare än `20261113000000` och inte mer än 10 minuter i framtiden.
- Beskrivningen är gemen `snake_case` som börjar med en bokstav (`a-z`, `0-9`, enkel `_` mellan ord), högst 80 tecken.
- Två filer med samma tidsstämpel är en dubblett.
- No-gap-regeln gäller bara för den gamla serien: varje tal från `001` till `241` måste finnas, förutom de kända luckorna `026`, `055` och `121`. Att ta bort `241` (eller någon gammal fil) misslyckas med porten. `001` och `241` kan aldrig läggas till i `KNOWN_GAPS` -godkännandelistan. Tidsstämplade filer skapar aldrig en lucka.
- Varje post i `src/lib/db/migrations/` måste vara en vanlig fil med ett giltigt `.sql` namn med små bokstäver. En katalog, en symbollänk, en `.SQL` eller `.sql.bak` -fil, en dold fil eller ett namn med ett mellanslag misslyckas med grinden, eftersom löparen skulle hoppa över den tyst eller krascha vid start.

**Tillämpa beställning.** Löparen sorterar efter det numeriska värdet för prefixet, inte efter text: de gamla `001`–`241` filerna först, sedan de tidsstämplade filerna i tidsstämpelordning, sedan eventuella namnavgränsade kataloger registrerade med `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (versioner som `ee-001`). En pågående migrering är vilken fil som helst vars version inte är i `_omniroute_migrations`, så en migrering från en äldre gren som slås samman efter en nyare gäller fortfarande på befintliga databaser.

**Tidsstämpeln är skapande ordning, inte sammanslagningsordning.** Om din migrering beror på en tabell eller kolumn skapad av en migrering med en** nyare** tidsstämpel (till exempel en från en annan PR som slogs samman först), skulle en ny databas köra din först och misslyckas. Medan din PR fortfarande är öppen, generera om filnamnet med `npm run db:new-migration` så att den får en nyare tidsstämpel, eller gör den oberoende. `npm run test:migrations:fresh` tillämpar varje migrering till en tom databas och fångar upp detta.

### En sammanslagen migrering tas aldrig bort eller byter namn

När en migreringsfil väl finns på en releasegren eller `main`, har den redan körts på homolog- och utvecklardatabaser, på VPS installationer och i Enterprise-sync. Från och med då:

- **Ta aldrig bort det.** Nyinstallationer skulle förlora sitt schema medan uppgraderade databaser behåller det.
- **Byt aldrig namn på den.** Versionen i `_omniroute_migrations` skulle inte längre matcha en fil, så varje databas som redan använde den skulle köra den igen. Icke-idempotent SQL duplicerar sedan data eller stoppar uppstarten.
- **Behöver du ett annat schema?** Skapa en ny migrering med `npm run db:new-migration`.

Att byta namn är säkert endast för en fil som inte är sammanfogad ännu, vilket är fallet som portens tips hänvisar till. En release-tagg ändrar ingenting här: varje push till en `release/v*` -gren publicerar Docker `:next` avbildningen och körs på homolog, VPS installationer och Enterprise sync, så en sammanslagen migrering har körts på riktiga databaser innan någon `vX.Y.Z` tagg existerar. Gaten misslyckas varje borttagning av en basfil, taggad eller inte.

- **Återställer en sammanslagen migrering.** En `git revert` som tar bort filen misslyckas med porten. Behåll filen och ångra dess schema i en ny migrering: `npm run db:new-migration -- <description>`, med `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` och så vidare. Uppgraderade och färska databaser slutar sedan med samma schema.
- **Den accepterade byta namn: en kompatibilitetspost och identiskt innehåll.** Om en sammanslagen fil måste flyttas (till exempel två sammanslagna filer delar en tidsstämpel och löparen slutar med en versionskollision), byt namn på den senare utan att röra dess SQL och lägg till `{ fromVersion, fromName, toVersion, toName }` till `RENAMED_MIGRATION_COMPATIBILITY` i `src/lib/db/migrationRunner/constants.ts`. Databaser som tillämpade den gamla versionen får sin `_omniroute_migrations` rad flyttad istället för att köra filen igen. Porten varnar för ett sådant byte av namn och kör alltid kommuteringskontrollen på den, oavsett den nya tidsstämpeln: nya installationer tillämpar filen på sin nya position, uppgraderade databaser gör det inte, så välj en ny tidsstämpel nära den gamla. Gaten misslyckas med att byta namn om innehållet ändras (en schemaändring går fortfarande i en ny migrering), eller om postens målfil inte finns på disken.
- **Byt aldrig namn inom samma tidsstämpel.** Ett bytenamn som behåller tidsstämpeln och endast ändrar beskrivningen misslyckas med porten, med eller utan en post. Med en post vars `toVersion` är lika med dess `fromVersion`, tar löparen bort den gamla `_omniroute_migrations` raden och tillämpar filen igen på varje databas som redan körde den. Utan en post spårar löparen endast versionen: den hoppar över filen på dessa databaser (nytt innehåll körs aldrig där) och loggar ett omnumreringsfel vid varje start. Använd en annan tidsstämpel plus en kompatibilitetspost, eller behåll namnet.
- **Gaten kontrollerar att den omdöpta filen inte körs igen.** För varje täckt byte namn skickar grinden det nya filnamnet till kommuteringskontrollen med `--must-not-apply`. Kontrollen startar upp den uppgraderade databasen med den riktiga löparen, och om löparen applicerar den filen igen (till exempel för att posten har fel version eller namn, eller för att grindens textparser läste `constants.ts` annorlunda än TypeScript), misslyckas grinden med `migration renomeada rodaria de novo` och ber dig kontrollera postens gamla och nya versioner och namn.

### Vad grinden kontrollerar mot basen

Vid pull-begäran och sammanslagningskökörningar jämför `npm run check:migration-numbering` `src/lib/db/migrations/` på disk med samma katalog i basgrenen. Basen är, i denna ordning: `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` variabeln, eller, när `GITHUB_EVENT_NAME` är `pull_request`, `pull_request_target` eller `merge_group`, den första föräldern för sammanslagningscommiten, `merge_group.base_sha` för händelsens nyttolast, eller `git merge-base HEAD origin/$GITHUB_BASE_REF`. I en pull-begäran eller en sammanslagningskökörning utan någon lösbar bas misslyckas grinden. Utanför CI utan `--base` skriver den ut `comparação com a base: pulada (sem --base)` och hoppar över dessa regler.

`--base-latest-tag` jämförs med den senaste release-taggen (`vX.Y.Z` i semver-ordning; taggar med tillägg som nightlies räknas inte) som finns i historien om `HEAD`, med samma regler som `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) kör porten på det här sättet, eftersom push och schemalagda körningar inte har någon pull-begäranbas och en sammanslagning kan landa utan en ny CI körning. Utan någon release-tagg i historien misslyckas porten; kör `git fetch --tags` (i CI `actions/checkout` med `fetch-depth: 0` taggarna).

| Ändra på pull-begäran                                                                                               | Resultat                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| En fil som finns på basen döps om, med en `RENAMED_MIGRATION_COMPATIBILITY` post                                    | **Varning** om innehållet är identiskt och kommuteringskontrollen körs oavsett den nya tidsstämpeln; den misslyckas om den nya positionen ändrar det slutliga schemat (ångra namnbytet, eller välj en annan ny tidsstämpel där den pendlar) eller om löparen skulle tillämpa den omdöpta filen igen på en uppgraderad databas.** Misslyckas** om innehållet ändrats. |
| En fil som finns på basen döps om med sin tidsstämpel (endast beskrivningen ändras)                                 | **Misslyckas** , med eller utan en post: löparen skulle tillämpa den igen (med posten) eller hoppa över den efter version (utan en). Använd en annan tidsstämpel plus en kompatibilitetspost, eller behåll namnet.                                                                                                                                                   |
| En fil som finns på basen raderas eller byter namn utan en post                                                     | **Misslyckas** , oavsett om filen är i en release-tagg eller inte. För att ångra det, återställ filen med `git checkout <base> -- src/lib/db/migrations/<file>`; för att återställa dess schema, lägg till en ny migrering med `DROP ... IF EXISTS`.                                                                                                                 |
| En fil som finns på basen har ett annat innehåll                                                                    | **Varning** (en `::warning` -anteckning i GitHub Actions), och kommuteringskontrollen körs. Det misslyckas om redigeringen ändrar det slutliga schemat, eftersom uppgraderade databaser inte tillämpar den redigerade filen igen: lägg ändringen i en ny migrering. En ofarlig redigering (en kommentar, `IF NOT EXISTS`) varnar bara.                               |
| En tidsstämplad fil läggs till med en tidsstämpel som inte är nyare än basens senaste                               | Kör kommuteringskontrollen, som beskrivs nedan.                                                                                                                                                                                                                                                                                                                      |
| En `NNN_` fil i gammalt format läggs till med ett nummer under basens senaste fil i gammalt format                  | **Misslyckas** , även om `KNOWN_GAPS` redigeras i samma pull-begäran: den gamla serien är frusen, skapa migreringen med `npm run db:new-migration`. Filer i gammalt format ovanför basens senaste (en `release/v*` till `main` pull begäran) accepteras.                                                                                                             |
| En fil som inte fungerar, redigerad eller bytt namn innehåller `INSERT`, `UPDATE`, `DELETE` eller `REPLACE` -satser | **Varning** : kommuteringskontrollen jämför inte data, så kontrollera om ordningen i vilken uppgraderade och färska databaser tillämpar den ändrar resultatet.                                                                                                                                                                                                       |

En körning av kommuteringskontrollen täcker de out-of-order, de redigerade och de omdöpta filerna tillsammans.

Kommuteringskontrollen (`scripts/check/migration-commutation.ts`) bygger två temporära databaser med den verkliga installationssökvägen: an** uppgraderas** en (starta med basmigreringarna, starta sedan igen på samma fil med pull-begärans migrering) och en** färsk** en (en start med pull-begärans migrering). Den jämför de resulterande schemana: tabeller och kolumner (ignorerar kolumnordning), UNIQUE / PRIMARY KEY och FOREIGN KEY -begränsningar, den normaliserade `CREATE TABLE` texten för varje tabell (som täcker CHECK begränsningar, sammanställningar, genererade kolumner och tabellalternativ), index, utlösare och vyer. Raddata jämförs inte. Om de matchar, skriver porten ut att filen är ur funktion men pendlar och passerar. Om de skiljer sig, misslyckas porten med skillnaden och en ledtråd för fallet: för en fil som inte fungerar, återskapa dess namn med `npm run db:new-migration`, vilket är säkert eftersom filen inte är sammanfogad ännu; för en redigerad basfil, återställ basinnehållet och lägg ändringen i en ny migrering; för en omdöpt fil, ångra bytet namn eller välj en annan ny tidsstämpel där den pendlar, aldrig samma tidsstämpel med ett annat namn. Om själva kontrollen inte kan köras, misslyckas grinden i CI och varnar endast lokalt. För en redigerad basfil byggs den uppgraderade databasen med basens innehåll i den filen, och den andra uppstarten hoppar över den eftersom dess version redan är inspelad. För en omdöpt fil byggs den uppgraderade databasen med filen under sitt gamla namn, och den andra uppstarten flyttar sin `_omniroute_migrations` rad genom kompatibilitetsposten istället för att köra den igen; grinden skickar det nya namnet med `--must-not-apply`, så kontrollen misslyckas om den andra uppstarten tillämpar den. Om en migrering av pull-begäran inte kan tillämpas på den uppgraderade sökvägen, det vill säga efter varje basmigrering (oavsett om den också misslyckas vid en ny installation eller inte), rapporterar porten `migration do PR não aplica` och ber dig fixa SQL mot basens nuvarande schema; om filen är beroende av en annan migrering av pull-begäran med en senare tidsstämpel, återskapa dess namn med `npm run db:new-migration`.

För att köra samma jämförelse lokalt, skicka basen explicit, till exempel `npm run check:migration-numbering -- --base origin/<base-branch>`, eller `npm run check:migration-numbering -- --base-latest-tag` för att jämföra med den senaste versionen.

### Konvertera en öppen PR `NNN` -migrering

En pull-begäran som öppnas innan switchen kan fortfarande innehålla en sekventiell fil som `242_add_widgets.sql`. Gamla tal över `241` avvisas, så konvertera det innan du slår samman:

1. **Byt namn på filen med generatorn, behåll beskrivningen.** Kör `npm run db:new-migration -- <same description>` för att få det nya namnet, flytta SQL till den och ta bort den gamla `NNN_` filen. Beskrivningen måste förbli identisk: kompatibilitetsposten nedan matchar den.
2. **Lägg till en kompatibilitetspost om en beständig databas körde det gamla numret.** Om någon databas som hålls (homolog, en VPS, en bidragsgivares egen installation) körde en build av PR med `NNN_` filen, lägg till `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` till `RENAMED_MIGRATION_COMPATIBILITY` i `src/lib/db/migrationRunner/constants.ts`. Detta är** krävs för `237` till `241`** : dessa platser innehåller nu de kanoniska `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` och `241_seen_models.sql`, och utan posten hoppar en sådan databas över den kanoniska migreringen för alltid och kör den konverterade igen. Det fungerar också för en plats som förblir tom, till exempel `242`, när destinationen är en tidsstämpel. Om du är osäker, lägg till posten. Var du lägger till det i arrayen spelar ingen roll: när en posts målplats fortfarande innehåller en rad som en annan post flyttas bort (till exempel `237` som håller en PR rad medan en äldre `usage_history_calculated_cost` rad väntar på att flytta in i `237`), låter löparen den posten vänta tills luckan är ledig. Endast en verklig konflikt, såsom en lucka som hålls av en rad no entry flyttar, eller två poster som byter luckor, stoppar uppstarten med `Cannot reconcile ...`.
3. **Håll SQL idempotent** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), eftersom den konverterade migreringen kan möta en databas där dess schema redan finns.
4. **Flytta versionsnycklade specialfall.** Om PR lagt till ett skiftläge för sitt gamla nummer i `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) eller i `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), ändra nyckeln till den nya tidsstämpeln.

`tests/unit/db/codex-fence-migration-rename.test.ts` är ett fungerande exempel på ett test för en omdöpt migrering.

### Backportar till grenar före bytet

Välj eller backportera aldrig en `YYYYMMDDHHMMSS_` fil till en gren som föregår växlingen (till exempel en äldre `release/v*` -gren). Löparen där sorterar filnamn som text, så en tidsstämplad fil skulle köras mellan `201_` och `202_` på en ny databas, och den gamla porten där förstår inte 14-siffriga prefix. På en sådan gren, skriv ändringen som den grenens egen nästa `NNN_` fil, idempotent, så det är en no-op när den tidsstämplade versionen kommer senare.

### Hur migrationer går

Vid start, `migrationRunner.ts`:

1. Skapar `_omniroute_migrations` tabell om den inte finns
2. Frågor om redan tillämpade migreringar
3. Tillämpar alla nya migreringar i ordning, var och en i en transaktion
4. Registrerar varje tillämpad migrering med tidsstämpel

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

Migrationer måste vara** idempotent** — att köra dem två gånger borde vara en no-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Använd satserna `IF NOT EXISTS`, `IF EXISTS` och `OR IGNORE` / `OR REPLACE` rikligt.

### Lägger till en ny migrering

1. **Skapa filen med generatorn** : `npm run db:new-migration -- <description>` (till exempel `npm run db:new-migration -- add combo priority`). Den skriver `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` med den aktuella UTC tiden och en kommentarshuvud, går framåt en sekund om den tidsstämpeln tas och skriver aldrig över en fil. Välj inte ett nummer för hand.
2. **Använd säker DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Fyll i data noggrant** : använd `UPDATE ... WHERE ...` för att hantera befintliga rader
4. **Kontrollera ordning och namn** : `npm run test:migrations:fresh` (alla migreringar på en tom databas) och `npm run check:migration-numbering`
5. **Testa på en kopia** : kör aldrig oprövade migreringar på produktion
6. **En tabell skapad från kod behöver också en migrering** : om en modul också skapar tabellen lätt (`CREATE TABLE IF NOT EXISTS`, hålls som en självläkningsväg), måste en migrering skapa den med samma DDL. Annars slutar en ren installation och en uppgraderad installation med olika scheman, beroende på om den kodsökvägen gick. `tests/unit/db/lazy-table-migration-guard.test.ts` skannar `src/` och `open-sse/` och misslyckas på en lat `CREATE` utan migrering (#20557). Exempel: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Exempel:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Bakåt-inkompatibla ändringar** (t.ex. att ta bort kolumner) är knepigt. OmniRoute stöder NOT nedgradering av — när en migrering väl har tillämpats är schemaändringen permanent. Planera därefter.

---

## Kryptering av lagrade data

Känsliga fält (API-nycklar, OAuth-token och anslutningssträngar) krypteras vid lagring med **AES-256-GCM**.

### Så fungerar det

```ts
// src/lib/db/encryption.ts (förenklad)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Var det används

- `provider_connections.api_key` — krypteras på applikationsnivå
- `provider_connections.access_token`, `refresh_token`, `id_token` — krypteras på applikationsnivå
- `key_value`-poster med `namespace = "secrets"` — krypteras på applikationsnivå
- `proxy_registry.auth` — krypteras på applikationsnivå (om det finns)

### Krypteringsnyckel

Krypteringsnyckeln härleds från en **lösenfras** (anges via miljövariabeln `STORAGE_ENCRYPTION_KEY`) och ett **salt** (lagras i databasen). Båda krävs för att dekryptera data.

```bash
# Generera en säker lösenfras
openssl rand -hex 32

# Ange i .env
STORAGE_ENCRYPTION_KEY=<din-nyckel>
```

> **Kritiskt**: Om krypteringsnyckeln går förlorad förlorar du åtkomsten till alla krypterade data. **Säkerhetskopiera nyckeln separat från databasen**.

### Det här krypteras INTE

Av prestandaskäl lagras följande i klartext:

- Leverantörernas visningsnamn
- Modelldefinitioner (redan offentliga)
- Routningsregler
- Användningsposter (inga personuppgifter)

---

## Förbehåll för kryptering (v3.8.16+)

OmniRoute använder **`migrateLegacyEncryptedString()`** för att hantera två krypteringsmetoder transparent:

- **Äldre** (före v3.5.0): XOR-baserad ”kryptering” (inte riktig kryptografi)
- **Nuvarande**: AES-256-GCM med korrekt IV och autentiseringstagg

Migreringshjälparen identifierar det äldre formatet och krypterar om det med den nya metoden vid den första läsningen. Det innebär att du kan uppgradera en gammal databas utan att förlora autentiseringsuppgifter.

---

## Läscache

För data som läses ofta (modeller, leverantörer, inställningar) tillhandahåller `readCache.ts` en **minnesbaserad cache**:

```ts
// Cachad vid start, ogiltigförklaras vid skrivning
const providers = await getCachedProviders(); // Snabb, minnesbaserad
const fresh = await listProviders(); // Långsam, läser från databasen
```

| Cachad entitet         | Cachenyckel    | TTL                  |
| ---------------------- | -------------- | -------------------- |
| `models`               | `models:v1`    | Till nästa skrivning |
| `provider_connections` | `providers:v1` | Till nästa skrivning |
| `settings`             | `settings:v1`  | Till nästa skrivning |
| `combos`               | `combos:v1`    | Till nästa skrivning |

Cachen ogiltigförklaras vid varje skrivning till motsvarande tabell.

---

## Säkerhetskopiering och återställning

### Manuell säkerhetskopiering

```bash
# Använd CLI:t för att skapa en lokal säkerhetskopia
omniroute backup create --name pre-migration

# Eller via API:t
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Säkerhetskopian innehåller:

- Alla databastabeller (serialiserade till JSON)
- Artefakter från anropsloggen (base64-kodade, valfritt)
- Inställningar + hemligheter (krypterade)
- Plugin-konfiguration

### Återställning

```bash
# Via CLI:t
omniroute restore pre-migration

# Via API:t
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Varning**: En återställning skriver över hela databasen. Stoppa först alla klienter.

### Automatiska säkerhetskopieringar

```bash
# Aktivera automatiska dagliga säkerhetskopieringar via CLI:t
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Schemat körs på serversidan av ett bakgrundsjobb som aktiveras var 30:e sekund
(standard) och utvärderar cron-uttrycket mot serverns lokala tid.

| Variabel                                    | Standardvärde | Beskrivning                                                                                                                  |
| ------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`       | Aktiveringsintervall i ms (minst `5000`). Måste vara kortare än 60 s för att tillförlitligt hamna inom matchande cron-minut. |

### Aktiv SQLite-säkerhetskopiering

För säkerhetskopiering av en aktiv databas utan driftstopp:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Detta använder SQLite:s API för säkerhetskopiering online – säkert att köra medan OmniRoute är igång.

---

## Performance Tuning

### WAL läge

WAL är aktiverat som standard. För högskrivande arbetsbelastningar, överväg:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute ställer inte in `journal_size_limit`. En kontrollpunkt flyttar WAL ramar till huvudfilen, men WAL filen behåller sin största allokerade storlek. `OMNIROUTE_WAL_GUARD_MAX_MB` vakten varnar bara och kör `wal_checkpoint(RESTART)`; det är inte ett lock i diskstorlek.

### Index

Nyckelindex för prestanda (som skapas automatiskt av migrering):

- `idx_models_provider` — -modellsökningar efter leverantör
- `idx_combo_targets_combo_id` — combo målexpansion
- `idx_usage_history_api_key_timestamp` — användningsanalys
- `idx_quota_snapshots_api_key_window` — kvotspårning
- `idx_call_logs_timestamp` — samtalsloggfrågor

För att lägga till ett nytt index, skapa en migrering:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Minnesmappad I/O

För mycket stora databaser (> 10GB) kan minnesmapping justeras via SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Packning

Långvariga OmniRoute instanser drar nytta av enstaka `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Kör varje månad under fönster med låg trafik. (WAL läget minskar behovet, men eliminerar det inte.)

---

## Hälsokontroll

`src/lib/db/healthCheck.ts` tillhandahåller **hälsodiagnostik på databasnivå**:

Båda metoderna kräver autentisering (`401` annars). `GET` utför endast diagnostik; `POST` kör samma kontroll med `autoRepair` aktiverat.

```bash
GET  /api/db/health   # diagnostisera
POST /api/db/health   # diagnostisera + reparera
```

Svaret är det `DbHealthCheckResult` som genereras av `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domänbudgetar refererade till API-nycklar som inte längre finns.",
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

| Fält              | Betydelse                                                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` när `issues` är tom. `driver` påverkar aldrig värdet.                                                                                                    |
| `issues[].type`   | Ett av `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                         |
| `repairedCount`   | Rader som reparerades under denna körning; alltid `0` när `autoRepair` är false.                                                                                |
| `backupCreated`   | Anger om en säkerhetskopia skapades före reparationen.                                                                                                          |
| `checkedAt`       | ISO-tidsstämpel som delas av körningen och eventuell reparationsanteckning som skrivs.                                                                          |
| `driver.name`     | SQLite-drivrutinen som hanterar den kontrollerade databasen.                                                                                                    |
| `driver.degraded` | `true` när skrivningar inte lagras beständigt i databasfilen — WASM-reservlösningen `sql.js` (beständig lagring av hela filen) eller en databas i arbetsminnet. |

Samma nyttolast returneras av MCP-verktyget `omniroute_db_health_check`.

Kör `PRAGMA integrity_check` för att upptäcka skador:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Bör skriva ut: ok
```

Om något annat än `ok` returneras ska du **omedelbart sluta använda databasen** och återställa från en säkerhetskopia.

---

## Katastrofåterställning

### Scenario 1: WAL-filen har gått förlorad

Filen `-wal` saknas, men `-shm` och huvuddatabasen är intakta:

```bash
# Återställs automatiskt nästa gång den öppnas
omniroute
```

Om SQLite inte kan återställa automatiskt:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenario 2: Huvuddatabasfilen är skadad

Återställ från säkerhetskopia:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` hämtar endast ett fullständigt `.tar.gz`-arkiv från en server som körs
(`GET /api/db-backups/exportAll`, operatörsuppgifter krävs); kommandot återställer ingenting.

### Scenario 3: Krypteringsnyckeln har gått förlorad

**Ingen återställning är möjlig** utan nyckeln. De krypterade fälten är oläsbara. Lägg till alla leverantörer manuellt igen med nya autentiseringsuppgifter.

> **Riskreducering**: Säkerhetskopiera alltid krypteringsnyckeln separat, helst i en lösenordshanterare eller KMS.

### Scenario 4: Disken är full

SQLite returnerar `SQLITE_FULL`-fel. Frigör diskutrymme och kör sedan:

```bash
# Skapa en kontrollpunkt för WAL för att frigöra utrymme
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Vanliga åtgärder

### Inspektera en tabell

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Räkna rader i alla tabeller

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Återställ (radera) alla data

```bash
# Stoppa OmniRoute först
omniroute stop

# Ta bort databasfilen
rm ~/.omniroute/storage.sqlite*

# Starta om (en tom databas skapas på nytt)
omniroute
```

För en **selektiv** återställning (behåll leverantörer, radera användningsdata):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Exportera en enskild tabell

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Felsökning

### "Databasen är låst"

En annan process håller ett skrivlås. Gör något av följande:

- Vänta tills den andra processen är klar (kontrollera med `lsof | grep storage.sqlite`)
- Avsluta den andra processen
- Starta om OmniRoute om problemet kvarstår

### "Begränsning för främmande nyckel misslyckades"

En domänmodul bryter mot referensintegriteten. Kontrollera:

- Föräldralösa rader i beroende tabeller
- Kaskaderande borttagningar som inte har spridits
- En nyligen genomförd migrering som ändrade en främmande nyckel

Kör `PRAGMA foreign_key_check;` för att hitta överträdelser.

### "Slut på minne"

SQLite:s minnesmappade I/O överskrider operativsystemets gräns. Minska värdet via ett SQLite-pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128 MB i stället för 256 MB
```

Eller inaktivera det:

```sql
PRAGMA mmap_size = 0;
```

### "Migreringen misslyckades halvvägs"

Migreringen kördes i en transaktion och bör därför ha återställts. Om inte:

1. **Stoppa OmniRoute** (förhindra ytterligare försök)
2. **Kontrollera databasens tillstånd** med `sqlite3`
3. **Korrigera manuellt** den ofullständiga migreringen
4. **Kör OmniRoute igen** (migreringen försöks på nytt)

För att förhindra detta bör du alltid testa migreringar på en kopia först.

---

## Se även

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — användningstabeller
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — hälsoövervakning
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — utgivningsflöde
- Källa: `src/lib/db/` (över 80 filer, cirka 25 000 kodrader)
