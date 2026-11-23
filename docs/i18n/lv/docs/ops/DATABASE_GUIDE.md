# Database Schema & Operations Guide (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Īsumā**: OmniRoute kā primāro datu glabātuvi izmanto **SQLite ar WAL žurnalēšanu**, un sensitīvie lauki glabāšanas laikā tiek šifrēti ar **AES-256-GCM**. Šajā rokasgrāmatā ir aplūkota shēma, migrācijas, dublēšana/atkopšana un ekspluatācijas instrukcijas.

**Avoti:**

- `src/lib/db/core.ts` — vieninstance + SCHEMA_SQL (17 pamata tabulas)
- `src/lib/db/migrationRunner.ts` — versiju migrācijas
- `src/lib/db/migrations/` — 167 versiju SQL faili
- `src/lib/db/encryption.ts` — šifrēšanas palīgfunkcijas
- `src/lib/db/backup.ts` — dublējumu eksportēšana/importēšana
- `src/lib/db/healthCheck.ts` — darbspējas diagnostika

---

## Kāpēc SQLite?

OmniRoute izvēlējās SQLite, nevis PostgreSQL/MySQL, vairāku iemeslu dēļ:

| Faktors         | SQLite                                        | PostgreSQL                                      |
| --------------- | --------------------------------------------- | ----------------------------------------------- |
| **Izvietošana** | Iegulta — nav nepieciešams atsevišķs serveris | Nepieciešama servera iestatīšana                |
| **Šifrēšana**   | Lietojumprogrammas līmenī (AES-256-GCM)       | Iebūvēta TDE                                    |
| **Veiktspēja**  | Ātrāka mazām/vidējām darba slodzēm            | Labāka ļoti lielam vienlaicīgu ierakstu skaitam |
| **Vienlaicība** | WAL režīms ļauj veikt vienlaicīgu lasīšanu    | Pilnvērtīga MVCC                                |
| **Dublēšana**   | Viena faila kopēšana                          | `pg_dump` vai failu sistēmas momentuzņēmums     |
| **Lietojums**   | Instalācija katram lietotājam, iegulta        | Vairāku nomnieku SaaS                           |

**Viena lietotāja un vienas instances** izvietojumiem (OmniRoute primārajam lietojuma scenārijam) SQLite ir vienkāršāka un ātrāka.

### WAL žurnalēšana

`core.ts` atver datubāzi **WAL (priekšrakstīšanas žurnāla) režīmā**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL ļauj veikt **vienlaicīgu lasīšanu** rakstīšanas laikā — tas ir svarīgi informācijas panelim, kas izpilda vaicājumus, kamēr tiek reģistrēti pieprasījumi.

Noklusējuma kešatmiņas lielums ir **65,536 KiB (64 MiB)**. SQLite negatīvu
`cache_size` vērtību interpretē kā aptuvenu augšējo robežu KiB vienībās un piešķir lapas pēc nepieciešamības.
Iestatījumā **Iestatījumi > Sistēma un krātuve > Kešatmiņas lielums** var ievadīt veselus skaitļus no **1 līdz
1,000,000 KiB**; iestatījuma saglabāšana to piemēro aktīvajam datubāzes savienojumam,
un OmniRoute startēšanas laikā atjauno saglabāto vērtību.

---

## Datubāzes atrašanās vieta

SQLite fails tiek glabāts šeit:

| OS      | Ceļš                                                              |
| ------- | ----------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                     |
| macOS   | `~/.omniroute/storage.sqlite`                                     |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                         |
| Docker  | `/app/data/storage.sqlite` (konfigurējams, izmantojot `DATA_DIR`) |

Saistītie faili:

- `storage.sqlite-wal` — priekšrakstīšanas žurnāls
- `storage.sqlite-shm` — koplietojamās atmiņas fails
- `call_logs/` — pieprasījumu lietderīgās slodzes artefakti (ja iespējots)

**Atrašanās vietas pārrakstīšana:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domēna moduļu arhitektūra

OmniRoute datubāzē ir **110 augstākā līmeņa TypeScript moduļi** direktorijā `src/lib/db/`. Katrs domēna modulis:

- Pārvalda vienu vai vairākas konkrētas tabulas
- Eksportē tipizētas CRUD funkcijas
- Nekad nepiekļūst cita moduļa tabulām
- Izmanto `getDbInstance()` no `core.ts`, lai piekļūtu datubāzei

### 110 augstākā līmeņa datubāzes moduļi

OmniRoute ir **110 augstākā līmeņa TypeScript faili** direktorijā `src/lib/db/`. Tālāk ir sniegts galveno moduļu piemēru saraksts; pilnu sarakstu skatiet direktorija saturā:

| Modulis                 | Tabulas                                                        | Atbildība                                                                         |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API atslēgu nodrošinātāju reģistrācija un akreditācijas dati                |
| `models.ts`             | `key_value` (modeļu dati)                                      | Modeļu definīcijas, iespējas un cenas                                             |
| `combos.ts`             | `combos`                                                       | Kombināciju maršrutēšanas konfigurācijas un secība                                |
| `apiKeys.ts`            | `api_keys`                                                     | API atslēgu dzīves cikls, tvērumi un kvotu uzskaite                               |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Sistēmas konfigurācija un koplietojama atslēgu–vērtību krātuve                    |
| `backup.ts`             | —                                                              | Dublējumkopiju eksportēšanas/importēšanas darbības                                |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Starpniekserveru konfigurācijas un maršrutēšanas kārtulas                         |
| `prompts.ts`            | `prompt_templates`                                             | Atkārtoti izmantojamas uzvedņu veidnes un versiju pārvaldība                      |
| `webhooks.ts`           | `webhooks`                                                     | Notikumu vadīti tīmekļa aizķeru abonementi un žurnāli                             |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Katra pieprasījuma audita reģistrēšana (neobligāta, liels datu apjoms)            |
| `domainState.ts`        | `domain_*` (5 tabulas)                                         | Domēnu budžeti, ķēdes pārtraucēji, bloķēšana, atkāpšanās ķēdes un izmaksu vēsture |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A atļauto API atslēgu saraksts                                              |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Vēsturiskais kvotu lietojums                                                      |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modeļu kartēšana uz noklusējuma kombinācijām                                      |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI specifisks pastāvīgais stāvoklis                                              |
| `encryption.ts`         | —                                                              | Palīgfunkcijas lauku šifrēšanai/atšifrēšanai                                      |
| `readCache.ts`          | —                                                              | Atmiņas kešatmiņa intensīvām lasīšanas darbībām                                   |
| `secrets.ts`            | `key_value` (šifrēti ieraksti)                                 | Šifrēta noslēpumu glabāšana                                                       |
| `stateReset.ts`         | —                                                              | Datubāzes stāvokļa notīrīšana/atiestatīšana testēšanai                            |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Sesijas konteksts aģenta nodošanai                                                |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Lietojuma uzskaite                                                                |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Saspiešanas konfigurācija                                                         |

### Moduļu robežas

Galvenais arhitektūras noteikums: **moduļi tieši nepiekļūst citu moduļu tabulām**. Lai strādātu ar cita moduļa datiem, importējiet funkciju no attiecīgā moduļa.

```ts
// ❌ NEPAREIZI: tiešs SQL vaicājums cita moduļa tabulai
db.prepare("SELECT * FROM provider_connections").all();

// ✅ PAREIZI: izmantojiet providers moduļa funkciju
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Šī noteikuma ievērošana tiek pārbaudīta koda pārskatīšanas laikā — statiskas pārbaudes nav, taču pārkāpumi tiek atzīmēti.

---

## Pamata shēma (17 tabulas)

`core.ts` definē 17 pamata tabulas konstantē `SCHEMA_SQL`. Tās izveido migrācija `001_initial_schema.sql`, un tās veido shēmas kodolu.

### Pamata tabulas (izveidotas sākotnējā migrācijā)

| Tabula                     | Mērķis                                                 | Galvenās kolonnas                                                       |
| -------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------- |
| `provider_connections`     | Pakalpojumu sniedzēju akreditācijas dati (šifrēti)     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Pakalpojumu sniedzēju mezglu maršrutēšanas informācija | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Vispārīga KV krātuve                                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Maršrutēšanas kombināciju definīcijas                  | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Vārtejas API atslēgas                                  | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Datubāzes metadati                                     | `key`, `value`                                                          |
| `usage_history`            | Pieprasījumu lietojuma ieraksti                        | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Pieprasījumu dati un atbildes                          | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Starpniekservera pieprasījumu žurnāli                  | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modeļu un pakalpojumu sniedzēju ķēdes                  | `model`, `chain`                                                        |
| `domain_budgets`           | Katra domēna izdevumu budžeti                          | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Budžeta atiestatīšanas vēsture                         | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Katra domēna izmaksu uzskaite                          | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domēna ātruma ierobežojuma stāvoklis                   | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Katra domēna ķēdes pārtraucēja stāvoklis               | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM atbilžu kešatmiņa                                  | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Vēsturiskie kvotu momentuzņēmumi                       | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Papildu tabulas (pievienotas vēlākās migrācijās)

Turpmākajās migrācijās tiek pievienotas tādas tabulas kā:

- `cli_tool_state` (migrācija 011) — CLI rīka stāvoklis
- `mcp_*` tabulas — MCP servera audits
- `a2a_*` tabulas — A2A uzdevumu stāvoklis
- `usage_*` tabulas — lietojuma uzskaite
- `plugin_*` tabulas — spraudņu sistēma
- `skill_executions` — prasmju izpildes vēsture
- `memory_*` tabulas — atmiņas sistēma
- `compression_*` tabulas — saspiešanas sistēma
- `webhook_*` tabulas — tīmekļa aizķeru piegādes žurnāls
- `acp_*` tabulas — aģenta klienta protokols
- `oneproxy_*` tabulas — 1proxy tirgus
- `proxy_assignments` — starpniekserveru tvēruma piesaistes
- `detailed_call_artifacts` — izsaukumu žurnāla artefaktu metadati
- `quota_alert_history` — kvotu brīdinājumu audits
- `command_code_auth_sessions` — Command Code OAuth sesijas

Pilns saraksts ar vairāk nekā 30 tabulām atrodas `src/lib/db/migrations/`.

---

## Migrācijas

OmniRoute izmanto** versijas, idempotentas migrācijas** `src/lib/db/migrations/`. Katra migrācija ir viens SQL fails. Līdzās pastāv divi nosaukšanas formāti; `_omniroute_migrations` ierakstītā versija ir ciparu prefikss.

### Migrācijas nosaukumu piešķiršana

| Formāts                                           | Piemērs                              | Lietots priekš                                                                                                                                                           |
| ------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NNN_description.sql` (tieši 3 cipari)            | `241_seen_models.sql`                | Vecā sērija `001`–`241`. Iesaldēts, kad tika izveidots laikspiedola formāts (`240` un `241` tika sapludināti tieši pirms tā): neviens jauns fails nesaņem kārtas numuru. |
| `YYYYMMDDHHMMSS_description.sql` (14 cipari, UTC) | `20261113120000_add_usage_index.sql` | Katra migrācija, kas izveidota no 2026. gada 11. gada 13. gada 13. gada.                                                                                                 |

Kāpēc izmaiņas: izmantojot secīgus skaitļus, paralēlais PRs izvēlējās to pašu nākamo numuru, un visi, izņemot vienu, bija jāpārnumurē pirms apvienošanas. UTC laikspiedols katram PR piešķir savu versiju.

Noteikumi par laikspiedola formātu (nodrošina `npm run check:migration-numbering`, tiek kopīgoti ar ģeneratoru `scripts/check/lib/migrationNaming.mjs`):

- Laika zīmogs ir īsts UTC datums un laiks, ne agrāk kā `20261113000000` un ne vairāk kā 10 minūtes nākotnē.
- Aprakstā ir mazie burti `snake_case` kas sākas ar burtu (`a-z`, `0-9`, viens `_` starp vārdiem), ne vairāk kā 80 rakstzīmes.
- Divi faili ar vienādu laikspiedolu ir dublikāti.
- Noteikums bez atstarpes attiecas tikai uz vecajām sērijām: ir jābūt katram skaitlim no `001` līdz `241`, izņemot zināmās atstarpes `026`, `055` un `121`. Dzēšot `241` (vai jebkuru vecu failu), vārti neizdodas. `001` un `241` nekad nevar pievienot `KNOWN_GAPS` atļaušanas sarakstam. Faili ar laikspiedolu nekad nerada atstarpes.
- Katram `src/lib/db/migrations/` ierakstam ir jābūt parastam failam ar derīgu mazo burtu `.sql` nosaukumu. Katalogs, simboliskā saite, `.SQL` vai `.sql.bak` fails, slēpts fails vai nosaukums ar atstarpi neiztur vārtus, jo skrējējs to izlaidīs klusi vai avarētu sāknēšanas laikā.

**Piesakiet pasūtījumu.** Darbinātājs kārto pēc prefiksa skaitliskās vērtības, nevis pēc teksta: vispirms vecie `001`–`241` faili, pēc tam laikspiedoga faili laikspiedolu secībā, pēc tam visi ar `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` reģistrētie direktoriji ar nosaukumiem (piemēram, `ee-001`). Gaidāma migrācija ir jebkurš fails, kura versija nav `_omniroute_migrations`, tāpēc migrācija no vecākas filiāles, kas tiek apvienota pēc jaunākas, joprojām attiecas uz esošajām datu bāzēm.

**Laikspiedols ir izveides secība, nevis sapludināšanas secība.** Ja jūsu migrācija ir atkarīga no tabulas vai kolonnas, kas izveidota, veicot migrāciju ar a** jaunāks** laikspiedols (piemēram, viens no cita PR, kas vispirms tika sapludināts), jauna datu bāze vispirms palaistu jūsu datu bāzi un neizdosies. Kamēr jūsu PR joprojām ir atvērts, atjaunojiet faila nosaukumu ar `npm run db:new-migration`, lai tas iegūtu jaunāku laikspiedolu, vai padariet to neatkarīgu. `npm run test:migrations:fresh` katru migrāciju piemēro tukšai datu bāzei un uztver to.

### Apvienotā migrācija nekad netiek dzēsta vai pārdēvēta

Kad migrācijas fails atrodas izlaiduma atzarā vai `main`, tas jau ir palaists homologu un izstrādātāju datu bāzēs, VPS instalācijās un uzņēmuma sinhronizācijā. No šī brīža:

- **Nekad neizdzēsiet to.** Jaunās instalēšanas shēma zaudētu savu shēmu, savukārt jauninātās datu bāzes to saglabās.
- **Nekad nepārdēvējiet to.** `_omniroute_migrations` versija vairs neatbilst failam, tāpēc katra datu bāze, kurā tā jau tika lietota, to palaistu vēlreiz. Pēc tam neidempotents SQL dublē datus vai aptur sāknēšanu.
- **Nepieciešama cita shēma?** Izveidojiet jaunu migrāciju, izmantojot `npm run db:new-migration`.

Pārdēvēšana ir droša tikai failam, kas vēl nav sapludināts, un tas ir gadījumā, ja vārti norāda uz to. Izlaiduma tags šeit neko nemaina: katrs `release/v*` filiāles nosūtījums publicē Docker `:next` attēlu un darbojas ar homologu, VPS instalēšanu un uzņēmuma sinhronizāciju, tāpēc sapludinātā migrācija ir palaista reālās datu bāzēs, pirms pastāv `vX.Y.Z` tags. Vārti neizdodas ikreiz, kad tiek noņemts bāzes fails neatkarīgi no tā, vai tas ir atzīmēts vai nav.

- **Apvienotās migrācijas atgriešana.** `git revert`, kas izdzēš failu, neizdodas izmantot vārtus. Saglabājiet failu un atsauciet tā shēmu jaunā migrācijā: `npm run db:new-migration -- <description>`, ar `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` un tā tālāk. Jauninātās un svaigās datu bāzes beidzas ar to pašu shēmu.
- **Viens pieņemtais pārdēvējums: saderības ieraksts un identisks saturs.** Ja sapludinātajam failam ir jāpārvietojas (piemēram, diviem sapludinātiem failiem ir kopīgs laikspiedols un palaidējs apstājas ar versijas sadursmi), pārdēvējiet vēlāko failu, nepieskaroties tā SQL, un pievienojiet `{ fromVersion, fromName, toVersion, toName }` `RENAMED_MIGRATION_COMPATIBILITY` `src/lib/db/migrationRunner/constants.ts`. Datu bāzēm, kurās tika lietota vecā versija, `_omniroute_migrations` rinda tiek pārvietota, nevis tiek palaists fails vēlreiz. Vārti brīdina par šādu pārdēvēšanu un vienmēr veic komutācijas pārbaudi neatkarīgi no jaunais laikspiedols: jaunas instalēšanas gadījumā fails tiek lietots tā jaunajā pozīcijā, jauninātajās datu bāzēs tas netiek lietots, tāpēc izvēlieties jaunu laikspiedolu tuvu vecajam. Vārtiem neizdodas pārdēvēt, ja saturs ir mainīts (shēmas izmaiņas joprojām tiek veiktas jaunā migrācijā) vai ja ieraksta mērķa fails nav diskā.
- **Nekad nepārdēvējiet tajā pašā laikspiedogā.** Pārdēvēšana, kas saglabā laika zīmogu un maina tikai aprakstu, neiztur vārtus ar vai bez ieraksta. Izmantojot ierakstu, kura `toVersion` ir vienāds ar `fromVersion`, izpildītājs izdzēš veco `_omniroute_migrations` rindu un vēlreiz lieto failu katrā datu bāzē, kurā tas jau ir palaists. Bez ieraksta skrējējs izseko tikai versiju: tas izlaiž failu šajās datu bāzēs (jauns saturs tajās nekad nepalaiž) un katrā sāknēšanas reizē reģistrē pārnumerācijas kļūdu. Izmantojiet citu laikspiedolu un saderības ierakstu vai saglabājiet nosaukumu.
- **Vārti pārbauda, vai pārdēvētais fails vairs netiek palaists.** Katram aptvertajam pārdēvējumam vārti nodod jauno faila nosaukumu komutācijas pārbaudei ar `--must-not-apply`. Pārbaude palaiž jaunināto datu bāzi ar īsto palaidēju, un, ja palaidējs vēlreiz lieto šo failu (piemēram, tāpēc, ka ierakstam ir nepareiza versija vai nosaukums, vai tāpēc, ka vārtu teksta parsētājs nolasa `constants.ts` atšķirīgi no TypeScript), vārti neizdodas ar `migration renomeada rodaria de novo` un lūdz pārbaudīt ieraksta vecās un jaunās versijas un nosaukumus.

### Ko vārti pārbauda pret bāzi

Izvilkšanas pieprasījuma un sapludināšanas rindas izpildes laikā `npm run check:migration-numbering` salīdzina diskā esošo `src/lib/db/migrations/` ar to pašu direktoriju pamata filiālē. Bāze ir šādā secībā: `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` mainīgais vai, ja `GITHUB_EVENT_NAME` ir `pull_request`, `pull_request_target` vai `merge_group`, sapludināšanas izpildes pirmais vecākais, notikuma lietderīgās slodzes `merge_group.base_sha` vai `git merge-base HEAD origin/$GITHUB_BASE_REF`. Izvilkšanas pieprasījuma vai sapludināšanas rindas izpildē bez atrisināmas bāzes vārti neizdodas. Ārpus CI bez `--base` tas drukā `comparação com a base: pulada (sem --base)` un izlaiž šos noteikumus.

`--base-latest-tag` tiek salīdzināts ar jaunāko laidiena tagu (`vX.Y.Z` semver secībā; sufiksēti tagi, piemēram, naktskrekli, netiek skaitīti), kas ir `HEAD` vēsturē, ar tādiem pašiem noteikumiem kā `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) palaiž vārtus šādā veidā, jo push un ieplānotajām izpildēm nav pull pieprasījumu bāzes un sapludināšana var tikt veikta bez jaunas CI izpildes. Ja vēsturē nav izlaiduma atzīmes, vārti neizdodas; palaist `git fetch --tags` (in CI, `actions/checkout` ar `fetch-depth: 0` ienes tagus).

| Izmaiņas vilkšanas pieprasījumā                                                                          | Rezultāts                                                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pamatnē esošais fails tiek pārdēvēts ar `RENAMED_MIGRATION_COMPATIBILITY` ierakstu                       | **Brīdinājums** ja saturs ir identisks un komutācijas pārbaude tiek veikta neatkarīgi no jaunā laikspiedola; tas neizdodas, ja jaunā pozīcija maina galīgo shēmu (atsauc pārdēvēšanu vai izvēlieties citu jaunu laika zīmogu, kur tas pārvietojas) vai ja skrējējs atkārtoti lietotu pārdēvēto failu jauninātā datu bāzē.** Neizdevās** ja mainās saturs. |
| Pamatā esošais fails tiek pārdēvēts, saglabājot tā laikspiedolu (mainās tikai apraksts)                  | **Neizdevās** , ar vai bez ieraksta: skrējējs to lietotu vēlreiz (ar ierakstu) vai izlaistu to pēc versijas (bez viena). Izmantojiet citu laikspiedolu un saderības ierakstu vai saglabājiet nosaukumu.                                                                                                                                                   |
| Pamatā esošais fails tiek izdzēsts vai pārdēvēts bez ieraksta                                            | **Neizdevās** , neatkarīgi no tā, vai fails ir vai nav laidiena tagā. Lai to atsauktu, atjaunojiet failu ar `git checkout <base> -- src/lib/db/migrations/<file>`; lai atgrieztu tās shēmu, pievienojiet jaunu migrāciju ar `DROP ... IF EXISTS`.                                                                                                         |
| Pamatā esošajam failam ir atšķirīgs saturs                                                               | **Brīdinājums** ( `::warning` anotācija sadaļā GitHub Actions), un tiek veikta komutācijas pārbaude. Tas neizdodas, ja rediģēšana maina galīgo shēmu, jo jauninātās datu bāzes vairs nepiemēro rediģēto failu: ievietojiet izmaiņas jaunā migrācijā. Nekaitīgs labojums (komentārs, `IF NOT EXISTS`) tikai brīdina.                                       |
| Fails ar laikspiedolu tiek pievienots ar laika zīmogu, kas nav jaunāks par bāzes jaunāko                 | Palaiž komutācijas pārbaudi, kas aprakstīta tālāk.                                                                                                                                                                                                                                                                                                        |
| Vecā formāta `NNN_` fails tiek pievienots ar numuru zem bāzes jaunākā vecā formāta faila                 | **Neizdevās** , pat ja `KNOWN_GAPS` ir rediģēts tajā pašā izvilkšanas pieprasījumā: vecā sērija ir iesaldēta, izveidojiet migrāciju ar `npm run db:new-migration`. Vecā formāta faili, kas pārsniedz bāzes jaunāko (no `release/v*` uz `main` pull pieprasījumu), tiek pieņemti.                                                                          |
| Nesakārtots, rediģēts vai pārdēvēts fails satur `INSERT`, `UPDATE`, `DELETE` vai `REPLACE` priekšrakstus | **Brīdinājums** : komutācijas pārbaude nesalīdzina datus, tāpēc pārbaudiet, vai secība, kādā jauninātās un jaunākās datubāzes to lieto, maina rezultātu.                                                                                                                                                                                                  |

Vienā komutācijas pārbaudes gājienā kopā tiek iekļauti ārpus kārtas, rediģētie un pārdēvētie faili.

Komutācijas pārbaude (`scripts/check/migration-commutation.ts`) izveido divas pagaidu datu bāzes ar reālo instalēšanas ceļu: an** jaunināts** viens (sāknēšana ar pamata migrāciju, pēc tam atkal sāknēšana tajā pašā failā ar vilkšanas pieprasījuma migrāciju) un** svaigs** viens (viena sāknēšana ar vilkšanas pieprasījuma migrāciju). Tas salīdzina iegūtās shēmas: tabulas un kolonnas (ignorējot kolonnu secību), UNIQUE / PRIMARY KEY un FOREIGN KEY ierobežojumus, katras tabulas normalizēto `CREATE TABLE` tekstu (kas aptver CHECK ierobežojumus, salīdzinājumus, ģenerētās kolonnas un tabulas opcijas), indeksus, trigerus un skatus. Rindas dati netiek salīdzināti. Ja tie sakrīt, vārti izdrukā, ka fails nav kārtībā, bet pārvietojas uz darbu un mājām, un iet garām. Ja tie atšķiras, vārti neizdodas ar atšķirību un mājienu gadījumam: failam, kas nav kārtībā, reģenerējiet tā nosaukumu ar `npm run db:new-migration`, kas ir droši, jo fails vēl nav sapludināts; rediģētam bāzes failam atjauno bāzes saturu un ievietojiet izmaiņas jaunā migrācijā; pārdēvētam failam atsauciet pārdēvēšanu vai izvēlieties citu jaunu laikspiedolu vietā, kur tas pārvietojas, nekad neizmantojiet to pašu laikspiedolu ar citu nosaukumu. Ja pati pārbaude nevar palaist, vārti neizdodas CI un brīdina tikai lokāli. Rediģētam bāzes failam jauninātā datu bāze tiek veidota ar šī faila bāzes saturu, un otrā sāknēšana to izlaiž, jo tā versija jau ir ierakstīta. Pārdēvētam failam jauninātā datu bāze tiek veidota ar failu ar tā veco nosaukumu, un otrā sāknēšana pārvieto savu `_omniroute_migrations` rindu caur saderības ierakstu, nevis palaiž to vēlreiz; vārti nodod jauno nosaukumu ar `--must-not-apply`, tāpēc pārbaude neizdodas, ja otrā sāknēšana to piemēro. Ja izvilkšanas pieprasījuma migrāciju neizdodas lietot jauninātajā ceļā, tas ir, pēc katras bāzes migrācijas (neatkarīgi no tā, vai tā neizdodas arī jaunas instalēšanas gadījumā), vārti ziņo `migration do PR não aplica` un lūdz labot SQL atbilstoši bāzes pašreizējai shēmai; ja fails ir atkarīgs no citas vilkšanas pieprasījuma migrācijas ar vēlāku laikspiedolu, atjaunojiet tā nosaukumu ar `npm run db:new-migration`.

Lai veiktu to pašu salīdzinājumu lokāli, precīzi nododiet bāzi, piemēram, `npm run check:migration-numbering -- --base origin/<base-branch>` vai `npm run check:migration-numbering -- --base-latest-tag` lai salīdzinātu ar jaunāko laidienu.

### Atvērtā PR `NNN` migrācijas konvertēšana

Izvilkšanas pieprasījums, kas atvērts pirms slēdža, joprojām var saturēt secīgu failu, piemēram, `242_add_widgets.sql`. Vecie skaitļi virs `241` tiek noraidīti, tāpēc pirms apvienošanas konvertējiet tos:

1. **Pārdēvējiet failu ar ģeneratoru, saglabājot aprakstu.** Palaidiet `npm run db:new-migration -- <same description>`, lai iegūtu jauno nosaukumu, pārvietojiet tajā SQL un izdzēsiet veco `NNN_` failu. Aprakstam ir jāpaliek identiskam: zemāk esošais saderības ieraksts atbilst tam.
2. **Pievienojiet saderības ierakstu, ja pastāvīgā datu bāzē tika palaists vecais numurs.** Ja kāda saglabātā datu bāze (homologs, VPS, paša līdzstrādnieka instalācija) palaida PR būvējumu ar `NNN_` failu, pievienojiet `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` `RENAMED_MIGRATION_COMPATIBILITY` failā `src/lib/db/migrationRunner/constants.ts`. Tas ir** nepieciešams no `237` uz `241`** : tagad šajos slotos ir kanoniskais `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` un `241_seen_models.sql`, un bez ieraksta šāda datu bāze uz visiem laikiem izlaiž kanonisko migrāciju un atkal palaiž konvertēto. Tas darbojas arī slotā, kas paliek tukšs, piemēram, `242`, ja galamērķis ir laikspiedols. Ja rodas šaubas, pievienojiet ierakstu. Kur to pievienojat masīvā, nav nozīmes: ja ieraksta mērķa slotā joprojām ir rinda, no kuras cits ieraksts attālinās (piemēram, `237` tur PR rindu, bet vecāka `usage_history_calculated_cost` rinda gaida, lai pārvietotos uz `237`), skrējējs ļauj šim ierakstam gaidīt, līdz slots ir brīvs. Tikai reāls konflikts, piemēram, slots, kas atrodas rindā, kurā neviens ieraksts nepārvietojas, vai divi ieraksti, kas apmaina slotus, aptur sāknēšanu ar `Cannot reconcile ...`.
3. **Saglabājiet SQL idempotentu** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), jo konvertētā migrācija var saskarties ar datu bāzi, kurā jau pastāv tās shēma.
4. **Pārvietojiet īpašos gadījumus, kuriem ir noteikta versija.** Ja PR pievienoja burtu savam vecajam numuram `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) vai `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), nomainiet atslēgu uz jauno laikspiedolu.

`tests/unit/db/codex-fence-migration-rename.test.ts` ir pārdēvētas migrācijas pārbaudes darba piemērs.

### Atpakaļportēšana uz filiālēm pirms pārslēgšanas

Nekad nepārvietojiet `YYYYMMDDHHMMSS_` failu uz filiāli, kas ir pirms slēdža (piemēram, vecāku `release/v*` zaru). Tur skrējējs failu nosaukumus kārto kā tekstu, tāpēc fails ar laikspiedolu darbotos starp `201_` un `202_` jaunā datu bāzē, un vecie vārti tur nesaprot 14 ciparu prefiksus. Šādā zarā ierakstiet izmaiņas kā šīs filiāles nākamo `NNN_` failu idempotent, tāpēc tas ir no-op, ja versija ar laikspiedolu tiek saņemta vēlāk.

### Kā notiek migrācijas

Startēšanas laikā `migrationRunner.ts`:

1. Izveido `_omniroute_migrations` tabulu, ja tā neeksistē
2. Vaicājumi par jau lietotajām migrācijām
3. Lietojiet visas jaunās migrācijas secībā, katra darījumā
4. Ieraksta katru piemēroto migrāciju ar laikspiedolu

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

### Idempotence

Migrācijām jābūt** idempotents** — izpildot tos divreiz, ir bezdarbība:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Izmantojiet `IF NOT EXISTS`, `IF EXISTS` un `OR IGNORE` / `OR REPLACE` klauzulas brīvi.

### Jaunas migrācijas pievienošana

1. **Izveidojiet failu ar ģeneratoru** : `npm run db:new-migration -- <description>` (piemēram `npm run db:new-migration -- add combo priority`). Tas ieraksta `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` ar pašreizējo UTC laiku un komentāra galveni, pārvietojas vienu sekundi uz priekšu, ja tiek ņemts šis laikspiedols, un nekad nepārraksta failu. Neizvēlieties numuru ar roku.
2. **Izmantojiet drošu DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Rūpīgi aizpildiet datus** : izmantojiet `UPDATE ... WHERE ...`, lai apstrādātu esošās rindas
4. **Pārbaudiet pasūtījumu un nosaukumu** : `npm run test:migrations:fresh` (visas migrācijas tukšā datu bāzē) un `npm run check:migration-numbering`
5. **Tests uz kopijas** : nekad nepalaidiet nepārbaudītu migrāciju ražošanā
6. **Tabulai, kas izveidota no koda, ir nepieciešama arī migrācija** : ja modulis arī laiski izveido tabulu (`CREATE TABLE IF NOT EXISTS`, tiek saglabāts kā pašārstniecības ceļš), migrācijai tā ir jāizveido ar to pašu DDL. Pretējā gadījumā tīrai instalēšanai un jauninātajai instalēšanai tiek izmantotas dažādas shēmas atkarībā no tā, vai šis koda ceļš tika palaists. `tests/unit/db/lazy-table-migration-guard.test.ts` skenē `src/` un `open-sse/` un neizdodas slinkā `CREATE` bez migrācijas (#20557). Piemērs: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Piemērs:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Atpakaļ nesaderīgas izmaiņas** (piem., kolonnu nomešana) ir sarežģītas. OmniRoute vai NOT atbalsta — pazemināšanu, tiklīdz tiek lietota migrācija, shēmas izmaiņas ir neatgriezeniskas. Plānojiet atbilstoši.

---

## Glabāto datu šifrēšana

Sensitīvi lauki (API atslēgas, OAuth pilnvaras, savienojumu virknes) glabāšanas laikā tiek šifrēti, izmantojot **AES-256-GCM**.

### Darbības princips

```ts
// src/lib/db/encryption.ts (vienkāršots)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Kur šifrēšana tiek izmantota

- `provider_connections.api_key` — šifrēts lietojumprogrammas līmenī
- `provider_connections.access_token`, `refresh_token`, `id_token` — šifrēti lietojumprogrammas līmenī
- `key_value` ieraksti ar `namespace = "secrets"` — šifrēti lietojumprogrammas līmenī
- `proxy_registry.auth` — šifrēts lietojumprogrammas līmenī (ja norādīts)

### Šifrēšanas atslēga

Šifrēšanas atslēga tiek atvasināta no **paroles frāzes** (iestatīta, izmantojot vides mainīgo `STORAGE_ENCRYPTION_KEY`) un **sāls** (glabāta datubāzē). Datu atšifrēšanai ir nepieciešamas abas vērtības.

```bash
# Ģenerējiet drošu paroles frāzi
openssl rand -hex 32

# Iestatiet failā .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritiski svarīgi**: šifrēšanas atslēgas pazaudēšana nozīmē piekļuves zaudēšanu visiem šifrētajiem datiem. **Glabājiet atslēgas rezerves kopiju atsevišķi no datubāzes**.

### Kas NETIEK šifrēts

Veiktspējas apsvērumu dēļ tālāk norādītā informācija tiek glabāta kā nešifrēts teksts:

- Pakalpojumu sniedzēju attēlojamie nosaukumi
- Modeļu definīcijas (jau ir publiskas)
- Maršrutēšanas kārtulas
- Lietojuma ieraksti (nesatur personu identificējošu informāciju)

---

## Šifrēšanas ierobežojumi (v3.8.16+)

OmniRoute izmanto **`migrateLegacyEncryptedString()`**, lai pārredzami apstrādātu divas šifrēšanas shēmas:

- **Mantotā** (pirms v3.5.0): uz XOR balstīta „šifrēšana” (nav īsta kriptogrāfija)
- **Pašreizējā**: AES-256-GCM ar atbilstošu IV un autentifikācijas tagu

Migrācijas palīgfunkcija nosaka mantoto formātu un pirmajā nolasīšanas reizē atkārtoti šifrē datus, izmantojot jauno shēmu. Tas nozīmē, ka varat jaunināt vecu datubāzi, nezaudējot akreditācijas datus.

---

## Lasīšanas kešatmiņa

Bieži lasītiem datiem (modeļiem, pakalpojumu sniedzējiem, iestatījumiem) `readCache.ts` nodrošina **atmiņā glabātu kešatmiņu**:

```ts
// Kešots palaišanas laikā, invalidēts rakstīšanas laikā
const providers = await getCachedProviders(); // Ātrs, atmiņā
const fresh = await listProviders(); // Lēns, piekļūst DB
```

| Kešotā entītija        | Kešatmiņas atslēga | TTL              |
| ---------------------- | ------------------ | ---------------- |
| `models`               | `models:v1`        | Līdz rakstīšanai |
| `provider_connections` | `providers:v1`     | Līdz rakstīšanai |
| `settings`             | `settings:v1`      | Līdz rakstīšanai |
| `combos`               | `combos:v1`        | Līdz rakstīšanai |

Kešatmiņa tiek invalidēta pēc katras rakstīšanas attiecīgajā tabulā.

---

## Dublēšana un atkopšana

### Manuāla dublēšana

```bash
# Izmantojiet CLI, lai izveidotu lokālu dublējumu
omniroute backup create --name pre-migration

# Vai izmantojot API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Dublējuma failā ir iekļauts:

- Visas DB tabulas (serializētas JSON formātā)
- Izsaukumu žurnāla artefakti (kodēti ar base64, neobligāti)
- Iestatījumi un noslēpumi (šifrēti)
- Spraudņu konfigurācija

### Atjaunošana

```bash
# Izmantojot CLI
omniroute restore pre-migration

# Izmantojot API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Brīdinājums**: Atjaunošana pārraksta visu DB. Vispirms apturiet visus klientus.

### Automatizēta dublēšana

```bash
# Iespējojiet automatizētu ikdienas dublēšanu, izmantojot CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Grafiku servera pusē izpilda fona uzdevums, kas tiek aktivizēts ik pēc 30 sekundēm
(pēc noklusējuma) un izvērtē cron izteiksmi atbilstoši servera vietējam laikam.

| Mainīgais                                   | Noklusējums | Apraksts                                                                                                                      |
| ------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`     | Aktivizēšanas intervāls ms (min. `5000`). Tam jābūt īsākam par 60 s, lai droši iekļautos cron izteiksmei atbilstošajā minūtē. |

### SQLite aktīvās datubāzes dublēšana

Lai bez dīkstāves dublētu aktīvu DB:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Tiek izmantota SQLite tiešsaistes dublēšanas API — to var droši izpildīt, kamēr darbojas OmniRoute.

---

## Veiktspējas regulēšana

### WAL režīms

WAL ir iespējots pēc noklusējuma. Ja ir liela rakstīšanas slodze, apsveriet:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute neiestata `journal_size_limit`. Kontrolpunkts pārvieto WAL kadrus galvenajā failā, bet WAL fails saglabā lielāko piešķirto izmēru. `OMNIROUTE_WAL_GUARD_MAX_MB` aizsargs tikai brīdina un palaiž `wal_checkpoint(RESTART)`; tas nav diska izmēra vāciņš.

### Indeksi

Galvenie veiktspējas indeksi (automātiski izveidoti, migrējot):

- `idx_models_provider` — modeļu meklēšana pēc pakalpojumu sniedzēja
- `idx_combo_targets_combo_id` — kombinētā mērķa paplašināšana
- `idx_usage_history_api_key_timestamp` — lietojuma analītika
- `idx_quota_snapshots_api_key_window` — kvotu izsekošana
- `idx_call_logs_timestamp` — zvanu žurnāla vaicājumi

Lai pievienotu jaunu indeksu, izveidojiet migrāciju:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O ar atmiņas kartēšanu

Ļoti lielām datu bāzēm (> 10GB) atmiņas kartēšanu var pielāgot, izmantojot SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Blīvēšana

Ilgstoši OmniRoute gadījumi gūst labumu no neregulārām `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Palaist katru mēnesi zemas satiksmes logos. (WAL režīms samazina nepieciešamību, bet nenovērš to.)

---

## Darbspējas pārbaude

`src/lib/db/healthCheck.ts` nodrošina **datubāzes līmeņa darbspējas diagnostiku**:

Abām metodēm ir nepieciešama autentifikācija (pretējā gadījumā `401`). `GET` tikai veic diagnostiku; `POST` izpilda
to pašu pārbaudi ar iespējotu `autoRepair`.

```bash
GET  /api/db/health   # diagnosticēt
POST /api/db/health   # diagnosticēt un labot
```

Atbilde ir `DbHealthCheckResult`, ko ģenerē `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domain budgets referenced API keys that no longer exist.",
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

| Lauks             | Nozīme                                                                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, ja `issues` ir tukšs. `driver` to nekad neietekmē.                                                                                                 |
| `issues[].type`   | Viena no vērtībām: `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                        |
| `repairedCount`   | Šīs izpildes laikā salaboto rindu skaits; vienmēr `0`, ja `autoRepair` ir false.                                                                           |
| `backupCreated`   | Norāda, vai pirms labošanas tika izveidota dublējumkopija.                                                                                                 |
| `checkedAt`       | ISO laikspiedols, kas ir kopīgs izpildei un jebkurai tās ierakstītajai labošanas piezīmei.                                                                 |
| `driver.name`     | SQLite draiveris, kas apkalpo pārbaudīto datubāzi.                                                                                                         |
| `driver.degraded` | `true`, ja rakstīšanas darbības netiek noturīgi saglabātas datubāzes failā — `sql.js` WASM rezerves variants (visa faila saglabāšana) vai datubāze atmiņā. |

Tādu pašu datu kopu atgriež MCP rīks `omniroute_db_health_check`.

Izpildiet `PRAGMA integrity_check`, lai konstatētu bojājumus:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Jāizvada: ok
```

Ja tiek atgriezts jebkas cits, nevis `ok`, **nekavējoties pārtrauciet datubāzes lietošanu** un atjaunojiet to no dublējumkopijas.

---

## Avārijas atkopšana

### 1. scenārijs: WAL fails ir pazaudēts

`-wal` faila nav, bet `-shm` fails un galvenā datubāze nav bojāti:

```bash
# Automātiski tiek atkopts nākamajā atvēršanas reizē
omniroute
```

Ja SQLite nevar veikt automātisku atkopšanu:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 2. scenārijs: galvenais datubāzes fails ir bojāts

Atjaunojiet no dublējuma:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` tikai lejupielādē pilnu `.tar.gz` arhīvu no servera, kas darbojas
(`GET /api/db-backups/exportAll`, nepieciešami operatora akreditācijas dati); šī komanda neko neatjauno.

### 3. scenārijs: šifrēšanas atslēga ir pazaudēta

Bez atslēgas **atkopšana nav iespējama**. Šifrētie lauki nav nolasāmi. Manuāli atkārtoti pievienojiet visus pakalpojumu sniedzējus, izmantojot jaunus akreditācijas datus.

> **Riska mazināšana**: vienmēr atsevišķi dublējiet šifrēšanas atslēgu, vēlams paroļu pārvaldniekā vai KMS.

### 4. scenārijs: disks ir pilns

SQLite atgriezīs `SQLITE_FULL` kļūdas. Atbrīvojiet vietu diskā un pēc tam izpildiet:

```bash
# Izveidojiet WAL kontrolpunktu, lai atbrīvotu vietu
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Bieži veicamās darbības

### Tabulas pārbaude

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Rindu skaita noteikšana visās tabulās

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Visu datu atiestatīšana (dzēšana)

```bash
# Vispirms apturiet OmniRoute
omniroute stop

# Dzēsiet datubāzes failu
rm ~/.omniroute/storage.sqlite*

# Restartējiet (tiks atkārtoti izveidota tukša datubāze)
omniroute
```

Lai veiktu **selektīvu** atiestatīšanu (saglabājot pakalpojumu sniedzējus un dzēšot lietojuma datus):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Atsevišķas tabulas eksportēšana

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Problēmu novēršana

### "Datubāze ir bloķēta"

Cits process tur rakstīšanas bloķējumu. Varat:

- Gaidīt, līdz otrs process pabeidz darbu (pārbaudiet ar `lsof | grep storage.sqlite`)
- Apturēt otru procesu piespiedu kārtā
- Ja problēma saglabājas, restartēt OmniRoute

### "Ārējās atslēgas ierobežojuma pārkāpums"

Domēna modulis pārkāpj referenciālo integritāti. Pārbaudiet:

- Bāreņierakstus atkarīgajās tabulās
- Kaskādes dzēšanas, kas netika izplatītas
- Nesen veiktu migrāciju, kas mainīja ārējo atslēgu

Izpildiet `PRAGMA foreign_key_check;`, lai atrastu pārkāpumus.

### "Nepietiek atmiņas"

SQLite atmiņā kartētā ievade/izvade pārsniedz operētājsistēmas ierobežojumu. Samaziniet to, izmantojot SQLite pragmu:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB, nevis 256MB
```

Vai atspējojiet:

```sql
PRAGMA mmap_size = 0;
```

### "Migrācija neizdevās procesa vidū"

Migrācija tika veikta transakcijā, tāpēc izmaiņām vajadzēja tikt atsauktām. Ja tas nenotika:

1. **Apturiet OmniRoute** (lai novērstu turpmākus mēģinājumus)
2. **Pārbaudiet datubāzes stāvokli**, izmantojot `sqlite3`
3. **Manuāli izlabojiet** daļēji veikto migrāciju
4. **Atkārtoti palaidiet** OmniRoute (migrācija tiks mēģināta vēlreiz)

Lai to novērstu, vienmēr vispirms pārbaudiet migrācijas datubāzes kopijā.

---

## Skatiet arī

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — lietojuma tabulas
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — darbspējas pārraudzība
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — laidiena process
- Avots: `src/lib/db/` (vairāk nekā 80 failu, ~25 tūkst. koda rindu)
