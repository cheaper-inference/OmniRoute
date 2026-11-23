# Database Schema & Operations Guide (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute እንደ ዋና ማከማቻው **SQLite ከWAL journaling ጋር** ይጠቀማል፤ ለሚስጥራዊ መስኮች ደግሞ በማከማቻ ላይ **AES-256-GCM** ምስጠራን ይጠቀማል። ይህ መመሪያ schema፣ migrations፣ backup/recovery እና የክወና runbooksን ይሸፍናል።

**ምንጮች፦**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 መሠረታዊ ሰንጠረዦች)
- `src/lib/db/migrationRunner.ts` — ስሪት ያላቸው migrations
- `src/lib/db/migrations/` — 167 ስሪት ያላቸው SQL ፋይሎች
- `src/lib/db/encryption.ts` — የምስጠራ አጋዥ ተግባራት
- `src/lib/db/backup.ts` — የbackup export/import
- `src/lib/db/healthCheck.ts` — የጤና ምርመራዎች

---

## SQLite ለምን?

OmniRoute በPostgreSQL/MySQL ፈንታ SQLiteን የመረጠው በበርካታ ምክንያቶች ነው፦

| መለኪያ               | SQLite                       | PostgreSQL                         |
| ------------------ | ---------------------------- | ---------------------------------- |
| **ማሰማራት**          | የተካተተ — የተለየ server አያስፈልግም  | የserver ቅንብር ያስፈልገዋል               |
| **ምስጠራ**           | በመተግበሪያ ደረጃ (AES-256-GCM)    | አብሮገነብ TDE                         |
| **አፈጻጸም**          | ለአነስተኛ/መካከለኛ የሥራ ጫናዎች ፈጣን    | ለእጅግ ብዙ በአንድ ጊዜ ለሚከናወኑ ጽሑፎች የተሻለ   |
| **ተመሳሳይ ጊዜ አጠቃቀም** | WAL mode በአንድ ጊዜ ማንበብን ይፈቅዳል | ሙሉ MVCC                            |
| **Backup**         | የአንድ ፋይል ቅጂ                  | `pg_dump` ወይም የfilesystem snapshot |
| **የአጠቃቀም ሁኔታ**     | ለእያንዳንዱ ተጠቃሚ የሚጫን፣ የተካተተ     | ባለብዙ ተከራይ SaaS                     |

ለ**አንድ ተጠቃሚ፣ አንድ instance** deployments (የOmniRoute ዋና የአጠቃቀም ሁኔታ)፣ SQLite ቀላልና ፈጣን ነው።

### WAL Journaling

`core.ts` databaseን በ**WAL (Write-Ahead Logging) mode** ይከፍታል፦

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL በጽሑፍ ሥራዎች ወቅት **በአንድ ጊዜ ማንበብን** ይፈቅዳል — ጥያቄዎች እየተመዘገቡ ሳለ query ለሚያደርገው dashboard ይህ አስፈላጊ ነው።

ነባሪው የcache መጠን **65,536 KiB (64 MiB)** ነው። SQLite አሉታዊ
`cache_size`ን በKiB እንደ ግምታዊ ከፍተኛ ገደብ ይተረጉማል እና ገጾችን እንደ አስፈላጊነቱ ይመድባል።
**Settings > System & Storage > Cache Size** ከ**1 እስከ
1,000,000 KiB** ያሉ ኢንቲጀር እሴቶችን ይቀበላል፤ ቅንብሩን ማስቀመጥ በቀጥታ በሚሠራው database connection ላይ ይተገብረዋል፣
እና OmniRoute ሲጀመር የተቀመጠውን እሴት መልሶ ይጭናል።

---

## የDatabase አካባቢ

የSQLite ፋይሉ የሚቀመጠው በ፦

| OS      | ዱካ                                                 |
| ------- | -------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                      |
| macOS   | `~/.omniroute/storage.sqlite`                      |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`          |
| Docker  | `/app/data/storage.sqlite` (በ`DATA_DIR` ሊዋቀር ይችላል) |

ተጓዳኝ ፋይሎች፦

- `storage.sqlite-wal` — write-ahead log
- `storage.sqlite-shm` — የጋራ memory ፋይል
- `call_logs/` — የጥያቄ payload artifacts (ከነቃ)

**አካባቢውን መቀየር፦**

```bash
DATA_DIR=/custom/path omniroute
```

---

## የጎራ ሞጁል አርክቴክቸር

የOmniRoute የውሂብ ጎታ በ`src/lib/db/` ውስጥ **110 ከፍተኛ-ደረጃ TypeScript ሞጁሎች** አሉት። እያንዳንዱ የጎራ ሞጁል፦

- አንድ ወይም ከዚያ በላይ የተወሰኑ ሰንጠረዦችን ይቆጣጠራል
- ዓይነት-የተወሰነላቸው CRUD ተግባራትን ወደ ውጭ ይልካል
- የሌላ ሞጁል ሰንጠረዦችን ፈጽሞ አይነካም
- DBን ለመድረስ ከ`core.ts` የሚገኘውን `getDbInstance()` ይጠቀማል

### 110ዎቹ ከፍተኛ-ደረጃ DB ሞጁሎች

OmniRoute በ`src/lib/db/` ውስጥ **110 ከፍተኛ-ደረጃ TypeScript ፋይሎች** አሉት። ከዚህ በታች የዋና ሞጁሎች ናሙና ቀርቧል፤ ሙሉውን ዝርዝር ለማየት የማውጫውን ዝርዝር ይመልከቱ፦

| ሞጁል                     | ሰንጠረዦች                                                         | ኃላፊነት                                                  |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | የOAuth/API ቁልፍ አቅራቢ ምዝገባ እና የማረጋገጫ መረጃ                 |
| `models.ts`             | `key_value` (የሞዴል ውሂብ)                                         | የሞዴል ትርጓሜዎች፣ ችሎታዎች እና ዋጋ አወጣጥ                          |
| `combos.ts`             | `combos`                                                       | የጥምር ማዘዋወሪያ ውቅሮች እና ቅደም ተከተል                           |
| `apiKeys.ts`            | `api_keys`                                                     | የAPI ቁልፍ የሕይወት ዑደት፣ ወሰኖች እና የኮታ ክትትል                   |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | የስርዓት ውቅር እና የጋራ KV ማከማቻ                               |
| `backup.ts`             | —                                                              | የምትኬ ወደ ውጭ መላክ/ከውጭ ማስገባት ክወናዎች                         |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | የፕሮክሲ ውቅሮች እና የማዘዋወሪያ ደንቦች                             |
| `prompts.ts`            | `prompt_templates`                                             | እንደገና ጥቅም ላይ የሚውሉ የጥያቄ አብነቶች እና ስሪት አስተዳደር             |
| `webhooks.ts`           | `webhooks`                                                     | በክስተት የሚነሱ የwebhook ምዝገባዎች እና ምዝግቦች                    |
| `detailedLogs.ts`       | `request_detail_logs`                                          | ለእያንዳንዱ ጥያቄ የኦዲት ምዝገባ (አማራጭ፣ ከፍተኛ መጠን ያለው)             |
| `domainState.ts`        | `domain_*` (5 ሰንጠረዦች)                                          | የጎራ በጀቶች፣ የወረዳ መቋረጫዎች፣ መቆለፊያዎች፣ ተተኪ ሰንሰለቶች እና የወጪ ታሪክ  |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | ለMCP/A2A በተፈቀደ ዝርዝር ውስጥ የገቡ API ቁልፎች                   |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ታሪካዊ የኮታ አጠቃቀም                                         |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | ሞዴሎችን ከነባሪ ጥምሮች ጋር ማዛመድ                                |
| `cliToolState.ts`       | `cli_tool_state`                                               | ለCLI የተወሰነ ዘላቂ ሁኔታ                                     |
| `encryption.ts`         | —                                                              | መስኮችን ለማመስጠር/ምስጠራቸውን ለመፍታት የሚረዱ መሳሪያዎች                 |
| `readCache.ts`          | —                                                              | ብዙ የንባብ ክወናዎች ባሏቸው ሂደቶች የሚያገለግል በማህደረ ትውስታ ውስጥ ያለ መሸጎጫ |
| `secrets.ts`            | `key_value` (የተመሰጠሩ ግቤቶች)                                      | የተመሰጠረ ሚስጥራዊ መረጃ ማከማቻ                                  |
| `stateReset.ts`         | —                                                              | ለሙከራ የDB ሁኔታን ማጽዳት/ዳግም ማስጀመር                           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | ለወኪል ርክክብ የክፍለ ጊዜ አውድ                                  |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | የአጠቃቀም ክትትል                                            |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | የመጭመቂያ ውቅር                                             |

### የሞጁል ወሰኖች

አንድ ዋና የአርክቴክቸር ደንብ፦ **ሞጁሎች የእርስ በርሳቸውን ሰንጠረዦች በቀጥታ አይደርሱም**። ከሌላ ሞጁል ውሂብ ጋር ለመስራት፣ ተግባሩን ከዚያ ሞጁል ያስመጡ።

```ts
// ❌ ስህተት፦ ከሌላ ሞጁል ቀጥተኛ SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ትክክል፦ የproviders ሞጁሉን ተግባር ይጠቀሙ
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

ይህ ደንብ በኮድ ግምገማ ይተገበራል — የማይለዋወጥ ራስ-ሰር ማረጋገጫ የለም፣ ነገር ግን ጥሰቶች ምልክት ይደረግባቸዋል።

---

## መሠረታዊ ስኪማ (17 ሰንጠረዦች)

`core.ts` በ`SCHEMA_SQL` ውስጥ ያሉትን 17 መሠረታዊ ሰንጠረዦች ይገልጻል። እነዚህ በ`001_initial_schema.sql` ማይግሬሽን የሚፈጠሩ ሲሆን ዋናውን ስኪማ ይመሠርታሉ።

### ዋና ሰንጠረዦች (በመጀመሪያው ማይግሬሽን የተፈጠሩ)

| ሰንጠረዥ                      | ዓላማ                        | ቁልፍ ዓምዶች                                                                |
| -------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | የአቅራቢ ማረጋገጫ መረጃዎች (የተመሰጠሩ) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | የአቅራቢ ኖድ ማስተላለፊያ መረጃ       | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | አጠቃላይ የKV ማከማቻ             | `namespace`, `key`, `value`                                             |
| `combos`                   | የማስተላለፊያ ጥምረት ትርጓሜዎች       | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | ለጌትዌዩ የሚያገለግሉ API ቁልፎች     | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | የውሂብ ጎታ ሜታዳታ               | `key`, `value`                                                          |
| `usage_history`            | የጥያቄ አጠቃቀም መዝገቦች           | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | የጥያቄ ይዘቶች እና ምላሾች          | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | የፕሮክሲ ጥያቄ ምዝግቦች            | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | ከሞዴል ወደ አቅራቢ የሚወስዱ ሰንሰለቶች  | `model`, `chain`                                                        |
| `domain_budgets`           | ለእያንዳንዱ ጎራ የወጪ በጀቶች        | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | የበጀት ዳግም ማስጀመር ታሪክ         | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | የእያንዳንዱ ጎራ ወጪ ክትትል         | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | የጎራ ፍጥነት ገደብ ሁኔታ           | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | የእያንዳንዱ ጎራ ሰርኪት መቆራረጫ ሁኔታ  | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | የLLM ምላሽ መሸጎጫ              | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ታሪካዊ የኮታ ቅጽበተ-ምስሎች         | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### ተጨማሪ ሰንጠረዦች (በኋለኞቹ ማይግሬሽኖች የታከሉ)

ቀጣይ ማይግሬሽኖች እንደሚከተሉት ያሉ ሰንጠረዦችን ይጨምራሉ፦

- `cli_tool_state` (ማይግሬሽን 011) — የCLI መሣሪያ ሁኔታ
- `mcp_*` ሰንጠረዦች — የMCP አገልጋይ ኦዲት
- `a2a_*` ሰንጠረዦች — የA2A ተግባር ሁኔታ
- `usage_*` ሰንጠረዦች — የአጠቃቀም ክትትል
- `plugin_*` ሰንጠረዦች — የፕለጊን ሥርዓት
- `skill_executions` — የክህሎት አፈጻጸም ታሪክ
- `memory_*` ሰንጠረዦች — የማህደረ ትውስታ ሥርዓት
- `compression_*` ሰንጠረዦች — የማመቅ ሥርዓት
- `webhook_*` ሰንጠረዦች — የwebhook ማድረሻ ምዝግብ
- `acp_*` ሰንጠረዦች — የወኪል ደንበኛ ፕሮቶኮል
- `oneproxy_*` ሰንጠረዦች — የ1proxy የገበያ ቦታ
- `proxy_assignments` — የፕሮክሲ ወሰን ትስስሮች
- `detailed_call_artifacts` — የጥሪ ምዝግብ አርቲፋክቶች ሜታዳታ
- `quota_alert_history` — የኮታ ማንቂያ ኦዲት
- `command_code_auth_sessions` — የCommand Code OAuth ክፍለ-ጊዜዎች

የ~30+ ሰንጠረዦች ሙሉ ዝርዝር በ`src/lib/db/migrations/` ውስጥ ይገኛል።

---

## ፍልሰት

OmniRoute ይጠቀማል** የተሻሻለ፣ ኃይለኛ ፍልሰት** በ `src/lib/db/migrations/`. እያንዳንዱ ፍልሰት ነጠላ SQL ፋይል ነው። ሁለት የስም ቅርጸቶች አብረው ይኖራሉ; በ `_omniroute_migrations` ውስጥ የተመዘገበው እትም የቁጥር ቅድመ ቅጥያ ነው።

### የስደት ስያሜ

| ቅርጸት                                            | ለምሳሌ                                 | ጥቅም ላይ የዋለው ለ                                                                                                 |
| ----------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (በትክክል 3 አሃዞች)            | `241_seen_models.sql`                | የድሮው ተከታታይ `001`-`241`. የጊዜ ማህተም ቅርጸቱ ሲያርፍ የቀዘቀዘ (`240` እና `241` ከሱ በፊት ተዋህደዋል)፡ ምንም አዲስ ፋይል ተከታታይ ቁጥር አያገኝም። |
| `YYYYMMDDHHMMSS_description.sql` (14 አሃዞች፣ UTC) | `20261113120000_add_usage_index.sql` | ከ2026-11-13 የተፈጠረ እያንዳንዱ ፍልሰት።                                                                                |

ለምን ተለወጠ፡ በተከታታይ ቁጥሮች፣ ትይዩ PRs ተመሳሳይ ቀጣዩን ቁጥር መርጧል እና ከአንዱ በስተቀር ሁሉም ከመቀላቀል በፊት እንደገና መቁጠር ነበረበት። የ UTC የጊዜ ማህተም ለእያንዳንዱ PR የራሱን ስሪት ይሰጣል።

የጊዜ ማህተም ቅርጸት ደንቦች (በ `npm run check:migration-numbering` ተፈጻሚ፣ በ `scripts/check/lib/migrationNaming.mjs` ውስጥ ከጄነሬተር ጋር የተጋራ)

- የጊዜ ማህተሙ ትክክለኛ UTC ቀን እና ሰዓት ነው፣ ከ `20261113000000` ያልበለጠ እና ወደፊት ከ10 ደቂቃ ያልበለጠ።
- መግለጫው በደብዳቤ (`a-z`, `0-9`, በቃላት መካከል ነጠላ `_` ) የሚጀምር ትንሽ `snake_case` ነው, ቢበዛ 80 ቁምፊዎች.
- ተመሳሳይ የጊዜ ማህተም ያላቸው ሁለት ፋይሎች የተባዙ ናቸው።
- ክፍተት የሌለበት ህግ የሚተገበረው በአሮጌው ተከታታይ ላይ ብቻ ነው፡ እያንዳንዱ ቁጥር ከ `001` እስከ `241` መኖር አለበት፣ ከሚታወቁት ክፍተቶች `026`፣ `055` እና `121` በስተቀር። `241` (ወይም ማንኛውም የድሮ ፋይል) መሰረዝ በሩ አልተሳካም። `001` እና `241` በፍጹም ወደ `KNOWN_GAPS` የፈቃድ ዝርዝር ሊታከሉ አይችሉም። በጊዜ የታተሙ ፋይሎች በጭራሽ ክፍተት አይፈጥሩም።
- በ `src/lib/db/migrations/` ውስጥ ያለው እያንዳንዱ ግቤት ትክክለኛ የሆነ ትንሽ `.sql` ስም ያለው መደበኛ ፋይል መሆን አለበት። ማውጫ፣ ሲምሊንክ፣ `.SQL` ወይም `.sql.bak` ፋይል፣ የተደበቀ ፋይል ወይም ቦታ ያለው ስም በሩ ላይ ወድቋል፣ ምክንያቱም ሯጩ በፀጥታ ይዘለለው ወይም በሚነሳበት ጊዜ ይሰናከላል።

**ትእዛዝ ተግብር።** ሯጩ በጽሑፍ ሳይሆን በቅድመ-ቅጥያው የቁጥር እሴት ነው የሚለየው፡ የድሮ `001`–`241` ፋይሎች መጀመሪያ፣ ከዚያም በጊዜ ማህተም የታተሙትን ፋይሎች፣ ከዚያም በ `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (እንደ `ee-001` ያሉ ስሪቶች) የተመዘገቡ ማንኛውንም የስም ዝርዝር ማውጫዎች። በመጠባበቅ ላይ ያለ ፍልሰት ስሪቱ በ `_omniroute_migrations` ውስጥ የሌለ ማንኛውም ፋይል ነው፣ ስለዚህ ከአሮጌው ቅርንጫፍ የመጣ ፍልሰት ከአዲስ በኋላ የተዋሃደ አሁንም በነባር የውሂብ ጎታዎች ላይ ይተገበራል።

**የጊዜ ማህተሙ የፍጥረት ቅደም ተከተል እንጂ ቅደም ተከተል ውህደት አይደለም።** የእርስዎ ፍልሰት ከ ሀ ጋር በተፈጠረ ሠንጠረዥ ወይም አምድ ላይ የሚመረኮዝ ከሆነ** አዲስ** timestamp (ለምሳሌ፣ አንዱ ከሌላ PR መጀመሪያ የተዋሃደ)፣ ትኩስ ዳታቤዝ መጀመሪያ የእራስዎን ይሰራል እና አይሳካም። የእርስዎ PR ገና ክፍት ሆኖ ሳለ፣ የፋይሉን ስም በ `npm run db:new-migration` ያድሱ ስለዚህ አዲስ የጊዜ ማህተም እንዲያገኝ ወይም ራሱን የቻለ ያድርጉት። `npm run test:migrations:fresh` እያንዳንዱን ፍልሰት ወደ ባዶ ዳታቤዝ ይተገብራል እና ይህንን ይይዛል።

### የተዋሃደ ስደት በጭራሽ አይሰረዝም ወይም አልተሰየመም።

አንዴ የፍልሰት ፋይል በሚለቀቅበት ቅርንጫፍ ወይም `main` ላይ ካለ፣ ቀድሞውንም በሆሞሎግ እና በገንቢ ዳታቤዝ፣ በ VPS ጭነቶች እና በድርጅት ማመሳሰል ላይ ሰርቷል። ከዚያን ጊዜ ጀምሮ፡-

- **በጭራሽ አይሰርዙት።** የተሻሻሉ የውሂብ ጎታዎች ሲይዙት ትኩስ ጭነቶች ንድፉን ያጣሉ.
- **ዳግም አይሰይሙት።** በ `_omniroute_migrations` ውስጥ ያለው እትም ከአሁን በኋላ ከፋይል ጋር አይዛመድም፣ ስለዚህ ሁሉም አስቀድሞ የተገበረው ዳታቤዝ እንደገና ይሰራል። አቅም የሌለው SQL ከዚያ ዳታውን ያባዛል ወይም ማስነሳቱን ያቆማል።
- **የተለየ ንድፍ ይፈልጋሉ?** በ `npm run db:new-migration` አዲስ ፍልሰት ይፍጠሩ።

ዳግም መሰየም ደህንነቱ የተጠበቀው ገና ላልተዋሃደ ፋይል ብቻ ነው፣ ይህም የበሩን ፍንጭ የሚያመለክት ነው። የመልቀቂያ መለያ እዚህ ምንም አይለውጥም፡ እያንዳንዱ ወደ `release/v*` ቅርንጫፍ የሚገፋው የ Docker `:next` ምስል ያትማል እና በሆሞሎግ፣ VPS ጭነቶች እና በኢንተርፕራይዝ ማመሳሰል ላይ ይሰራል፣ ስለዚህ ማንኛውም `vX.Y.Z` መለያ ከመኖሩ በፊት የተዋሃደ ፍልሰት በእውነተኛ ዳታቤዝ ላይ ይሰራል። በሩ የመሠረት ፋይልን ሁሉ ማስወገድ፣ መለያ የተደረገበትም ይሁን አልተሰጠም።

- **የተዋሃደ ፍልሰትን በመመለስ ላይ።** ፋይሉን የሚሰርዝ `git revert` በሩን ወድቋል። ፋይሉን አቆይ እና ንድፉን በአዲስ ፍልሰት ቀልብስ `npm run db:new-migration -- <description>`, `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` እና የመሳሰሉት። የተሻሻሉ እና ትኩስ የውሂብ ጎታዎች ከዚያም በተመሳሳይ ንድፍ ያበቃል.
- **ተቀባይነት ያለው ዳግም ስም፡ የተኳኋኝነት ግቤት እና ተመሳሳይ ይዘት።** የተዋሃደ ፋይል መንቀሳቀስ ካለበት (ለምሳሌ፣ ሁለት የተዋሃዱ ፋይሎች የጊዜ ማህተም ይጋራሉ እና ሯጩ በስሪት ግጭት ያቆማል) SQL ን ሳይነኩ የኋለኛውን ይሰይሙ እና `{ fromVersion, fromName, toVersion, toName }` ወደ `RENAMED_MIGRATION_COMPATIBILITY` በ `src/lib/db/migrationRunner/constants.ts` ይጨምሩ። የድሮውን ስሪት የተገበሩ የውሂብ ጎታዎች ፋይሉን እንደገና ከማሄድ ይልቅ `_omniroute_migrations` ረድፋቸውን ይንቀሳቀሳሉ። በሩ ስለ እንደዚህ ዓይነት ስም መቀየር ያስጠነቅቃል እና ሁልጊዜ የዝውውር ፍተሻውን በእሱ ላይ ያካሂዳል, አዲሱ የጊዜ ማህተም ምንም ይሁን ምን: ትኩስ ጭነቶች ፋይሉን በአዲሱ ቦታ ይተገብራሉ, የተሻሻሉ የውሂብ ጎታዎች አያደርጉም, ስለዚህ ከአሮጌው አጠገብ አዲስ የጊዜ ማህተም ይምረጡ. ይዘቱ ከተቀየረ (የመርሃግብሩ ለውጥ አሁንም በአዲስ ፍልሰት ውስጥ ከሄደ) ወይም የመግቢያው ዒላማ ፋይል በዲስክ ላይ ካልሆነ በሩ ዳግም መሰየሙን ይወድቃል።
- **በተመሳሳዩ የጊዜ ማህተም ውስጥ በጭራሽ አትሰይሙ።** የጊዜ ማህተሙን የሚይዝ እና መግለጫውን ብቻ የሚቀይር ዳግም መሰየም በመግቢያም ሆነ ያለ መግቢያ በሩ ላይ ወድቋል። ዝቃው `fromVersion` `toVersion` እኩል በሆነ ግቤት፣ ሯጩ የድሮውን `_omniroute_migrations` ረድፎችን ይሰርዛል እና ፋይሉን ቀድሞውኑ ባሰራው እያንዳንዱ ዳታቤዝ ላይ እንደገና ይተገበራል። ያለ መግቢያ፣ ሯጩ ስሪቱን ብቻ ይከታተላል፡ በእነዚያ የውሂብ ጎታዎች ላይ ያለውን ፋይል ይዘላል (አዲስ ይዘት በጭራሽ አይሄድም) እና በእያንዳንዱ ቡት ላይ የቁጥር ስህተትን ይመዘግባል። ሌላ የጊዜ ማህተም እና የተኳኋኝነት ግቤት ይጠቀሙ ወይም ስሙን ያስቀምጡ።
- **በሩ እንደገና የተሰየመው ፋይል እንደገና እንደማይሰራ ይፈትሻል።** ለእያንዳንዱ የተከደነ ዳግም ስም፣ በሩ አዲሱን የፋይል ስም ወደ መጓጓዣ ቼክ በ `--must-not-apply` ያስተላልፋል። ቼኩ የተሻሻለውን ዳታቤዝ ከእውነተኛው ሯጭ ጋር ያስጀምረዋል፣ እና ሯጩ ያንን ፋይል እንደገና ካመለከተ (ለምሳሌ ፣ መግቢያው የተሳሳተ ስሪት ወይም ስም ስላለው ፣ ወይም የበሩ ጽሑፍ ተንታኝ `constants.ts` ከ TypeScript በተለየ መልኩ ስላነበበ) ፣ በሩ በ `migration renomeada rodaria de novo` አልተሳካም እና የመግቢያውን የድሮ እና አዲስ ስሪቶች እና ስሞች እንዲመለከቱ ይጠይቅዎታል።

### በሩ ከመሠረቱ ምን እንደሚፈትሽ

በመጎተት ጥያቄ እና በማዋሃድ-ወረፋ ሩጫዎች ላይ፣ `npm run check:migration-numbering` `src/lib/db/migrations/` በዲስክ ላይ በመሠረት ቅርንጫፍ ላይ ካለው ተመሳሳይ ማውጫ ጋር ያወዳድራል። መሰረቱ በዚህ ቅደም ተከተል ነው `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` ተለዋዋጭ , ወይም `GITHUB_EVENT_NAME` `pull_request` ሲሆን `pull_request_target` ወይም `merge_group`, የውህደቱ የመጀመሪያ ወላጅ, የክስተቱ ጭነት `merge_group.base_sha` ወይም `git merge-base HEAD origin/$GITHUB_BASE_REF` ነው. ምንም ሊፈታ የሚችል መሠረት በሌለው የመሳብ ጥያቄ ወይም የውህደት ሩጫ በሩ አልተሳካም። ከ CI ውጪ ያለ `--base` `comparação com a base: pulada (sem --base)` ያትማል እና እነዚህን ደንቦች ይዘለላል።

`--base-latest-tag` ከአዲሱ የተለቀቀው መለያ (`vX.Y.Z` በሴምቨር ቅደም ተከተል፣ እንደ የምሽት ምሽት ያሉ ቅጥያ ስሞች አይቆጠሩም) በ `HEAD` ታሪክ ውስጥ ካለው፣ ከ `--base` ጋር ተመሳሳይ ህጎችን ያወዳድራል። መልቀቂያ-አረንጓዴ (`scripts/quality/validate-release-green.mjs`) በሩን በዚህ መንገድ ያስኬዳል፣ ምክንያቱም የግፊት እና የታቀዱ ሩጫዎች ምንም የመጎተቻ ጥያቄ መሰረት ስለሌላቸው እና ውህደት ያለ ትኩስ CI ሩጫ ሊያርፍ ይችላል። በታሪክ ውስጥ ምንም የመልቀቂያ መለያ ከሌለ በሩ አይሳካም; `git fetch --tags` አሂድ (በ CI፣ `actions/checkout` ከ `fetch-depth: 0` ጋር መለያዎቹን ያመጣል)።

| በመጎተት ጥያቄ ላይ ለውጥ                                                                              | ውጤት                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| በመሠረቱ ላይ ያለው ፋይል `RENAMED_MIGRATION_COMPATIBILITY` ግቤት ተሰይሟል                                  | **ማስጠንቀቂያ** ይዘቱ ተመሳሳይ ከሆነ እና የመጓጓዣ ቼክ አዲሱን የጊዜ ማህተም የሚያሄድ ከሆነ; አዲሱ ቦታ የመጨረሻውን መርሃ ግብር ከቀየረ (ስሙን ቢቀልብሰው ወይም ሌላ አዲስ የጊዜ ማህተም ከፈለገ) ወይም ሯጩ እንደገና የተሰየመውን ፋይል በተሻሻለ ዳታቤዝ ላይ ቢተገበር አይሳካም።** አልተሳካም።** ይዘቱ ከተቀየረ.                                   |
| በመሠረቱ ላይ ያለው ፋይል የጊዜ ማህተሙን ጠብቆ ይሰየማል (መግለጫው ብቻ ነው የሚለወጠው)                                     | **አልተሳካም።** , ከመግቢያ ጋር ወይም ያለ: ሯጩ እንደገና (ከመግቢያው ጋር) ይተገብራል ወይም በስሪት (ያለ አንድ) ይዝለለው. ሌላ የጊዜ ማህተም እና የተኳኋኝነት ግቤት ይጠቀሙ ወይም ስሙን ያስቀምጡ።                                                                                                            |
| በመሠረት ላይ ያለ ፋይል ይሰረዛል ወይም ያለ ግቤት እንደገና ይሰየማል                                                  | **አልተሳካም።** , ፋይሉ በመልቀቂያ መለያ ውስጥ ይሁን አይሁን. እሱን ለመቀልበስ ፋይሉን በ `git checkout <base> -- src/lib/db/migrations/<file>` ወደነበረበት ይመልሱ; እቅዱን ለመመለስ፣ በ `DROP ... IF EXISTS` አዲስ ፍልሰት ያክሉ።                                                             |
| በመሠረቱ ላይ ያለው ፋይል የተለያየ ይዘት አለው                                                                | **ማስጠንቀቂያ** (በ GitHub ድርጊቶች ውስጥ `::warning` ማብራሪያ)፣ እና የመጓጓዣ ፍተሻው ይሰራል። አርትዖቱ የመጨረሻውን እቅድ ቢቀይር አይሳካም, ምክንያቱም የተሻሻሉ የውሂብ ጎታዎች የተስተካከለውን ፋይል እንደገና አይተገበሩም: ለውጡን በአዲስ ፍልሰት ውስጥ ያስቀምጡት. ምንም ጉዳት የሌለው አርትዖት (አስተያየት, `IF NOT EXISTS`) ብቻ ያስጠነቅቃል. |
| በጊዜ ማህተም የተደረገ ፋይል በጊዜ ማህተም ይታከላል።                                                            | ከዚህ በታች የተገለጸውን የመጓጓዣ ፍተሻ ያካሂዳል።                                                                                                                                                                                                              |
| የድሮ ቅርፀት `NNN_` ፋይል ከመሠረቱ አዲሱ የድሮ ቅርጸት ፋይል በታች ካለው ቁጥር ጋር ታክሏል።                               | **አልተሳካም።** ምንም እንኳን `KNOWN_GAPS` በተመሳሳይ የመጎተት ጥያቄ ቢስተካከልም: የድሮው ተከታታዮች በረዶ ናቸው, ፍልሰትን በ `npm run db:new-migration` ይፍጠሩ. ከመሠረቱ አዲሱ በላይ የቆዩ ቅርጸቶች (ከ `release/v*` እስከ `main` ጎትት ጥያቄ) ተቀባይነት አላቸው።                                            |
| ከትዕዛዝ ውጪ፣ የተስተካከለ ወይም እንደገና የተሰየመ ፋይል `INSERT`፣ `UPDATE`፣ `DELETE` ወይም `REPLACE` መግለጫዎችን ይዟል። | **ማስጠንቀቂያ** የመቀየሪያ ቼክ መረጃን አያወዳድርም፣ ስለዚህ የተሻሻሉ እና ትኩስ የውሂብ ጎታዎች የሚተገበሩበት ቅደም ተከተል ውጤቱን ይቀይረው እንደሆነ ይገምግሙ።                                                                                                                                     |

የመጓጓዣ ቼክ አንድ አሂድ ከትዕዛዝ ውጪ፣ የተስተካከሉ እና የተሰየሙትን ፋይሎች በአንድ ላይ ይሸፍናል።

የመጓጓዣ ቼክ (`scripts/check/migration-commutation.ts`) ከእውነተኛው የመጫኛ መንገድ ጋር ሁለት ጊዜያዊ የውሂብ ጎታዎችን ይገነባል።** ተሻሽሏል።** አንድ (በመሰረታዊ ፍልሰቶች ቡት፣ከዚያም በተመሳሳይ ፋይል ላይ ከተጎትት ጥያቄ ፍልሰት ጋር እንደገና አስነሳ) እና ሀ** ትኩስ** አንድ (ከጎትት ጥያቄ ፍልሰት ጋር አንድ ቡት)። የተገኙትን ንድፎች ያወዳድራል፡ ሰንጠረዦች እና ዓምዶች (የአምድ ቅደም ተከተልን ችላ በማለት)፣ UNIQUE / PRIMARY KEY እና FOREIGN KEY ገደቦች፣ የእያንዳንዱ ሠንጠረዥ መደበኛ `CREATE TABLE` ጽሑፍ ( CHECK ገደቦችን፣ ስብስቦችን፣ የተፈጠሩ አምዶችን እና የሠንጠረዥ አማራጮችን የሚሸፍን)፣ ኢንዴክሶች፣ ቀስቅሴዎች እና እይታዎች። የረድፍ ውሂብ አይነጻጸርም። የሚዛመዱ ከሆነ በሩ ፋይሉ ከትዕዛዝ ውጪ መሆኑን ያትማል ነገር ግን ይጓዛል እና ያልፋል። ከተለያዩ, በሩ ከልዩነቱ እና ከጉዳዩ ፍንጭ ጋር አይሳካም: ከትዕዛዝ ውጪ ለሆነ ፋይል, ስሙን በ `npm run db:new-migration` ያድሱ, ይህም ፋይሉ ገና ስላልተዋሃደ ነው; ለተስተካከለው የመሠረት ፋይል, የመሠረቱን ይዘት ወደነበረበት ይመልሱ እና ለውጡን በአዲስ ፍልሰት ውስጥ ያስቀምጡት; ለተሰየመ ፋይል ፣ ስሙን ይቀልብሱ ወይም ሌላ አዲስ የጊዜ ማህተም ይምረጡ ፣ በሌላ ስም ተመሳሳይ ጊዜ ማህተም በጭራሽ። ቼኩ ራሱ መሮጥ ካልቻለ በሩ በ CI ውስጥ ይወድቃል እና በአካባቢው ብቻ ያስጠነቅቃል። ለአርትዖት ቤዝ ፋይል፣ የተሻሻለው ዳታቤዝ የተገነባው ከመሠረቱ የፋይሉ ይዘት ጋር ነው፣ እና ሁለተኛው ማስነሻ ስሪቱ አስቀድሞ ስለተመዘገበ ነው። ለተሰየመ ፋይል፣ የተሻሻለው ዳታቤዝ ከፋይሉ ጋር በአሮጌው ስሙ የተሰራ ነው፣ እና ሁለተኛው ቡት እንደገና ከማሄድ ይልቅ `_omniroute_migrations` ረድፉን በተኳሃኝነት ግቤት ውስጥ ያንቀሳቅሳል። በሩ አዲሱን ስም በ `--must-not-apply` ያልፋል, ስለዚህ ሁለተኛው ቡት ከተተገበረ ቼኩ አይሳካም. የመጎተት ጥያቄ ፍልሰት በተሻሻለው መንገድ ላይ መተግበር ካልቻለ፣ ማለትም፣ ከእያንዳንዱ የመሠረት ፍልሰት በኋላ (እንደ አዲስ መጫንም ባይሳካም)፣ በሩ `migration do PR não aplica` ሪፖርት ያደርጋል እና SQL ውን አሁን ካለው መሰረታዊ እቅድ ጋር እንዲያስተካክሉ ይጠይቅዎታል። ፋይሉ በሌላ የፍላጎት ጥያቄ ፍልሰት ላይ የሚመረኮዝ ከሆነ ከጊዜ ማህተም ጋር ስሙን በ `npm run db:new-migration` ያድሱ።

ተመሳሳዩን ንፅፅር በአገር ውስጥ ለማሄድ፣ መሰረቱን በግልፅ ያሳልፉ፣ ለምሳሌ `npm run check:migration-numbering -- --base origin/<base-branch>` ወይም `npm run check:migration-numbering -- --base-latest-tag` ከቅርቡ ልቀት ጋር ለማነፃፀር።

### ክፍት PR's `NNN` ስደትን በመቀየር ላይ

ከመቀየሪያው በፊት የተከፈተ የመሳብ ጥያቄ አሁንም እንደ `242_add_widgets.sql` ያለ ተከታታይ ፋይል ሊይዝ ይችላል። ከ `241` በላይ ያሉ የቆዩ ቁጥሮች ውድቅ ናቸው፣ ስለዚህ ከመዋሃድዎ በፊት ይለውጡት፡-

1. **መግለጫውን በመያዝ ፋይሉን በጄነሬተር ይሰይሙ።** አዲሱን ስም ለማግኘት `npm run db:new-migration -- <same description>` ያሂዱ፣ SQL ወደ እሱ ይውሰዱ እና የድሮውን `NNN_` ፋይል ይሰርዙ። መግለጫው አንድ አይነት መሆን አለበት፡ ከዚህ በታች ያለው የተኳኋኝነት ግቤት በእሱ ላይ ይዛመዳል።
2. **የማያቋርጥ የውሂብ ጎታ የድሮውን ቁጥር የሚያሄድ ከሆነ የተኳኋኝነት ግቤት ያክሉ።** ማንኛውም የውሂብ ጎታ የተቀመጠው (homolog, a VPS, የራሱ አስተዋጽዖ አበርካች መጫን) የ PR ግንባታን በ `NNN_` ፋይል ካካሄደ `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` ወደ `RENAMED_MIGRATION_COMPATIBILITY` በ `src/lib/db/migrationRunner/constants.ts` ይጨምሩ። ይህ ነው** ለ `237` እስከ `241` ያስፈልጋል** እነዚያ ክፍተቶች አሁን ቀኖናዊ `237_usage_history_calculated_cost.sql`፣ `238_codex_connection_fences.sql`፣ `239_call_logs_pending_detail_index.sql`፣ `240_provider_node_custom_json_config.sql` እና `241_seen_models.sql` ይይዛሉ ፣ እና ያለ መግቢያ እንደዚህ ያለ የመረጃ ቋት ቀኖናዊውን ፍልሰት ለዘለዓለም ይዘለላል እና የተለወጠውን እንደገና ያስኬዳል። እንዲሁም መድረሻው የጊዜ ማህተም በሚሆንበት ጊዜ እንደ `242` ላሉ ባዶ ለሚቆይ ማስገቢያ ይሰራል። በሚጠራጠሩበት ጊዜ መግቢያውን ያክሉ። በድርድር ውስጥ የጨመሩበት ቦታ ምንም ለውጥ አያመጣም፡ የመግቢያ ዒላማ ማስገቢያው አሁንም ረድፉን ሲይዝ ሌላ ግቤት ይርቃል (ለምሳሌ `237` የ PR ረድፍ ሲይዝ አንድ የቆየ `usage_history_calculated_cost` ረድፍ ወደ `237` ለመግባት ሲጠብቅ) ሯጩ ማስገቢያው ነፃ እስኪሆን ድረስ እንዲቆይ ያስችለዋል። እውነተኛ ግጭት ብቻ ነው፣ ለምሳሌ በመደዳ የተያዘ ማስገቢያ ምንም እንቅስቃሴ የለም፣ ወይም ሁለት ግቤቶች ቦታዎችን የሚለዋወጡ፣ ማስነሻውን በ `Cannot reconcile ...` ያቆመዋል።
3. **SQL አቅም ያቆዩት።** (`CREATE TABLE IF NOT EXISTS`፣ `CREATE INDEX IF NOT EXISTS`፣ `INSERT OR IGNORE`)፣ ምክንያቱም የተለወጠው ፍልሰት አስቀድሞ ዕቅዱ ካለበት ዳታቤዝ ጋር ሊገናኝ ይችላል።
4. **በስሪት የተከፈቱ ልዩ ጉዳዮችን አንቀሳቅስ።** PR ለቀድሞ ቁጥሩ በ `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) ወይም በ `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`) ውስጥ መያዣ ካከለ ቁልፉን ወደ አዲሱ የጊዜ ማህተም ይቀይሩት።

`tests/unit/db/codex-fence-migration-rename.test.ts` ለተለወጠው ፍልሰት የሙከራ ሥራ ምሳሌ ነው።

### ከመቀየሪያው በፊት ወደ ቅርንጫፎች ይመለሳሉ

`YYYYMMDDHHMMSS_` ፋይልን ከመቀየሪያው በፊት ወደነበረው ቅርንጫፍ (ለምሳሌ የቆየ `release/v*` ቅርንጫፍ) ቼሪ አይምረጡ ወይም ወደ ኋላ አይመልሱ። እዚያ ያለው ሯጭ የፋይል ስሞችን እንደ ጽሑፍ ይመድባል፣ ስለዚህ በጊዜ ማህተም የተደረገ ፋይል በአዲስ ዳታቤዝ ላይ በ `201_` እና `202_` መካከል ይሰራል፣ እና በዚያ ያለው የድሮ በር ባለ 14-አሃዝ ቅድመ ቅጥያዎችን አይረዳም። በእንደዚህ አይነት ቅርንጫፍ ላይ ለውጡን የዛ ቅርንጫፍ የራሱ ቀጣይ `NNN_` ፋይል፣ idempotent ብለው ይፃፉ፣ ስለዚህ በጊዜ ማህተም የተደረገው እትም በኋላ ሲመጣ ምንም-op ነው የሚሆነው።

### ስደት እንዴት እንደሚሮጥ

ሲጀመር `migrationRunner.ts`:

1. ከሌለ `_omniroute_migrations` ሰንጠረዥ ይፈጥራል
2. አስቀድመው ለተተገበሩ ፍልሰት ጥያቄዎች
3. ማንኛውም አዲስ ፍልሰት በቅደም ተከተል ይተገበራል፣ እያንዳንዱ በግብይት
4. እያንዳንዱን የተተገበረ ፍልሰት በጊዜ ማህተም ይመዘግባል

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

### አለመቻል

ስደት መሆን አለበት።** ኃይለኛ** — እነሱን ሁለት ጊዜ ማስኬድ ምንም-op መሆን የለበትም።

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, እና `OR IGNORE` / `OR REPLACE` አንቀጾችን በብዛት ይጠቀሙ።

### አዲስ ስደት መጨመር

1. **ፋይሉን በጄነሬተር ይፍጠሩ** `npm run db:new-migration -- <description>` (ለምሳሌ `npm run db:new-migration -- add combo priority`)። አሁን ባለው UTC ጊዜ እና የአስተያየት ራስጌ `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` ይጽፋል፣ ያ የጊዜ ማህተም ከተወሰደ አንድ ሰከንድ ወደፊት ይንቀሳቀሳል እና መቼም ፋይል አይጽፍም። ቁጥር በእጅ አይምረጡ።
2. **ደህንነቱ የተጠበቀ DDL ይጠቀሙ** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **ውሂብ በጥንቃቄ ይሙሉ** ነባር ረድፎችን ለማስተናገድ `UPDATE ... WHERE ...` ይጠቀሙ
4. **ትዕዛዙን እና ስያሜውን ያረጋግጡ** `npm run test:migrations:fresh` (በባዶ ዳታቤዝ ላይ ያሉ ሁሉም ፍልሰቶች) እና `npm run check:migration-numbering`
5. **በአንድ ቅጂ ላይ ይሞክሩት** - በምርት ላይ ያልተሞከሩ ፍልሰትን በጭራሽ አያካሂዱ
6. **ከኮድ የተፈጠረ ሠንጠረዥ እንዲሁ ፍልሰት ያስፈልገዋል** : ሞጁል እንዲሁ በሰንጠረዡ ላይ ያለውን ጠረጴዛ ከፈጠረው (`CREATE TABLE IF NOT EXISTS`, እንደ እራስ-ፈውስ መንገድ ተይዟል), ፍልሰት በተመሳሳይ DDL መፍጠር አለበት. ያለበለዚያ ንጹህ ጫኝ እና የተሻሻለ ጫኝ በተለያዩ መርሃግብሮች ያበቃል፣ ይህም የኮድ ዱካ እየሰራ እንደሆነ ይወሰናል። `tests/unit/db/lazy-table-migration-guard.test.ts` `src/` እና `open-sse/` ይቃኛል እና ያለ ስደት (#20557) በሰነፍ `CREATE` ላይ ይወድቃል። ምሳሌ `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

ለምሳሌ፥

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **ወደ ኋላ-ተኳሃኝ ያልሆኑ ለውጦች** (ለምሳሌ፣ አምዶች መጣል) አስቸጋሪ ናቸው። OmniRoute አንድ ጊዜ ፍልሰት ከተተገበረ NOT — ን ዝቅ ለማድረግ ይደግፋል፣ የመርሃግብሩ ለውጥ ዘላቂ ነው። በዚህ መሠረት ያቅዱ.

---

## በማከማቻ ውስጥ ምስጠራ

ሚስጥራዊ fields (API keys፣ OAuth tokens፣ connection strings) **AES-256-GCM**ን በመጠቀም በማከማቻ ውስጥ ይመሰጠራሉ።

### እንዴት እንደሚሠራ

```ts
// src/lib/db/encryption.ts (ቀለል ያለ)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### የት እንደሚጠቀም

- `provider_connections.api_key` — በapplication ደረጃ የተመሰጠረ
- `provider_connections.access_token`, `refresh_token`, `id_token` — በapplication ደረጃ የተመሰጠሩ
- `namespace = "secrets"` ያላቸው `key_value` entries — በapplication ደረጃ የተመሰጠሩ
- `proxy_registry.auth` — ካለ በapplication ደረጃ የተመሰጠረ

### የምስጠራ ቁልፍ

የምስጠራ ቁልፉ ከ**passphrase** (በ`STORAGE_ENCRYPTION_KEY` env var በኩል ከሚዘጋጅ) እና ከ**salt** (በDB ውስጥ ከሚከማች) ይመነጫል። ውሂብን ለመፍታት ሁለቱም ያስፈልጋሉ።

```bash
# ደህንነቱ የተጠበቀ passphrase ይፍጠሩ
openssl rand -hex 32

# በ.env ውስጥ ያዘጋጁ
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **ወሳኝ**፦ የምስጠራ ቁልፉን ማጣት ሁሉንም የተመሰጠረ ውሂብ የመድረስ ችሎታን ማጣት ማለት ነው። **ቁልፉን ከdatabaseው ተለይቶ ምትኬ ይያዙ**።

### የማይመሰጠሩ ነገሮች

ለአፈጻጸም ሲባል፣ የሚከተሉት በplaintext ይከማቻሉ፦

- የProvider ማሳያ ስሞች
- የModel ትርጓሜዎች (ከወዲሁ ይፋዊ ናቸው)
- የRouting ደንቦች
- የUsage መዝገቦች (PII የለም)

---

## የምስጠራ ጥንቃቄዎች (v3.8.16+)

OmniRoute ሁለት የምስጠራ ዘዴዎችን በግልጽነት ለማስተናገድ **`migrateLegacyEncryptedString()`**ን ይጠቀማል፦

- **የቀድሞ** (ከ-v3.5.0 በፊት)፦ በXOR ላይ የተመሠረተ "ምስጠራ" (እውነተኛ ክሪፕቶግራፊ አይደለም)
- **የአሁኑ**፦ AES-256-GCM ከትክክለኛ IV እና የማረጋገጫ መለያ ጋር

የፍልሰት አጋዡ የቀድሞውን ቅርጸት በመለየት በመጀመሪያው ንባብ በአዲሱ ዘዴ እንደገና ያመሰጥረዋል። ይህም ማረጋገጫ መረጃዎችን ሳያጡ የቆየ የውሂብ ጎታን ማሻሻል እንዲችሉ ያደርጋል።

---

## የንባብ መሸጎጫ

በተደጋጋሚ ለሚነበብ ውሂብ (ሞዴሎች፣ አቅራቢዎች፣ ቅንብሮች)፣ `readCache.ts` **በማህደረ ትውስታ ውስጥ የሚገኝ መሸጎጫ** ያቀርባል፦

```ts
// ሲጀመር ይሸጎጣል፣ ሲጻፍ ዋጋ አልባ ይሆናል
const providers = await getCachedProviders(); // ፈጣን፣ በማህደረ ትውስታ ውስጥ
const fresh = await listProviders(); // ዘገምተኛ፣ DBን ይደርሳል
```

| የተሸጎጠ አካል              | የመሸጎጫ ቁልፍ      | TTL        |
| ---------------------- | -------------- | ---------- |
| `models`               | `models:v1`    | እስከሚጻፍ ድረስ |
| `provider_connections` | `providers:v1` | እስከሚጻፍ ድረስ |
| `settings`             | `settings:v1`  | እስከሚጻፍ ድረስ |
| `combos`               | `combos:v1`    | እስከሚጻፍ ድረስ |

በተዛማጁ ሰንጠረዥ ላይ በሚደረግ እያንዳንዱ ጽሑፍ መሸጎጫው ዋጋ አልባ ይደረጋል።

---

## ምትኬ እና መልሶ ማግኘት

### በእጅ የሚደረግ ምትኬ

```bash
# አካባቢያዊ ምትኬ ለመፍጠር CLIን ይጠቀሙ
omniroute backup create --name pre-migration

# ወይም በAPI በኩል
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

የምትኬ ፋይሉ የሚከተሉትን ያካትታል፦

- ሁሉንም የDB ሰንጠረዦች (ወደ JSON የተከታተሉ)
- የጥሪ ምዝግብ ቅርሶች (በbase64 የተመሰጠሩ፣ አማራጭ)
- ቅንብሮች + ሚስጥሮች (የተመሰጠሩ)
- የተሰኪ ውቅር

### መልሶ ማግኘት

```bash
# በCLI በኩል
omniroute restore pre-migration

# በAPI በኩል
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **ማስጠንቀቂያ**፦ መልሶ ማግኘት መላውን DB ይተካል። በመጀመሪያ ሁሉንም ደንበኞች ያቁሙ።

### ራስ-ሰር ምትኬዎች

```bash
# በCLI በኩል ራስ-ሰር ዕለታዊ ምትኬዎችን ያንቁ
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

መርሐግብሩ በየ30 ሰከንዱ በሚሠራ የበስተጀርባ ሥራ
(ነባሪ) በአገልጋዩ በኩል ይከናወናል፣ እንዲሁም የcron አገላለጹን ከአካባቢያዊ የአገልጋይ ሰዓት አንጻር ይገመግማል።

| ተለዋዋጭ                                       | ነባሪ     | መግለጫ                                                                                     |
| ------------------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | የምልክት ክፍተት በms (ዝቅተኛው `5000`)። በተዛማጁ የcron ደቂቃ ውስጥ በአስተማማኝ ሁኔታ ለመግባት ከ60 s ያነሰ መሆን አለበት። |

### SQLite ትኩስ ምትኬ

የቀጥታ DBን ያለ የአገልግሎት መቋረጥ ለመጠባበቅ፦

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

ይህ የSQLiteን የመስመር ላይ ምትኬ API ይጠቀማል — OmniRoute እየሠራ ሳለ ማስኬዱ ደህንነቱ የተጠበቀ ነው።

---

## የአፈጻጸም ማስተካከያ

### WAL ሁነታ

WAL በነባሪነት ነቅቷል። ለከፍተኛ-ጽሑፍ የሥራ ጫናዎች፣ አስቡበት፡-

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute `journal_size_limit` አያቀናብርም . የፍተሻ ነጥብ WAL ፍሬሞችን ወደ ዋናው ፋይል ያንቀሳቅሳል፣ ነገር ግን የ WAL ፋይል የተመደበውን ትልቅ መጠን ይይዛል። የ `OMNIROUTE_WAL_GUARD_MAX_MB` ጠባቂ `wal_checkpoint(RESTART)` ብቻ ያስጠነቅቃል እና ያስኬዳል; የዲስክ መጠን ካፕ አይደለም።

### ኢንዴክሶች

የአፈጻጸም ቁልፍ ኢንዴክሶች (በስደት በራስ-የተፈጠረ)

- `idx_models_provider` — ሞዴል ፍለጋዎች በአቅራቢ
- `idx_combo_targets_combo_id` — ጥምር ኢላማ መስፋፋት።
- `idx_usage_history_api_key_timestamp` — የአጠቃቀም ትንተና
- `idx_quota_snapshots_api_key_window` — ኮታ መከታተል
- `idx_call_logs_timestamp` — የጥሪ ማስታወሻ መጠይቆች

አዲስ መረጃ ጠቋሚ ለመጨመር ፍልሰት ይፍጠሩ፡

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### ትውስታ-ካርታ I/O

በጣም ትልቅ ለሆኑ የውሂብ ጎታዎች (> 10GB)፣ የማህደረ ትውስታ ካርታ በ SQLite pragma በኩል ማስተካከል ይቻላል

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### መጨናነቅ

የረጅም ጊዜ OmniRoute አጋጣሚዎች አልፎ አልፎ `VACUUM` ይጠቀማሉ፡-

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

በዝቅተኛ ትራፊክ መስኮቶች ውስጥ በየወሩ ያሂዱ። (WAL ሁነታ ፍላጎቱን ይቀንሳል, ግን አያስወግደውም.)

---

## የጤና ምርመራ

`src/lib/db/healthCheck.ts` **በDB ደረጃ የጤና ምርመራዎችን** ያቀርባል፦

ሁለቱም ግሶች ማረጋገጫ ይፈልጋሉ (ካልሆነ `401`)። `GET` ምርመራ ብቻ ያደርጋል፤ `POST` ደግሞ
`autoRepair` ነቅቶ ተመሳሳዩን ምርመራ ያስኬዳል።

```bash
GET  /api/db/health   # ምርመራ
POST /api/db/health   # ምርመራ + ጥገና
```

ምላሹ በ`runDbHealthCheck()` የሚፈጠረው `DbHealthCheckResult` ነው
(`src/lib/db/healthCheck.ts`)፦

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "የጎራ በጀቶች ከአሁን በኋላ የሌሉ API ቁልፎችን ዋቢ አድርገዋል።",
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

| መስክ               | ትርጉም                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` ባዶ ሲሆን `true` ነው። `driver` በምንም ጊዜ ተጽዕኖ አያሳድርበትም።                                                           |
| `issues[].type`   | ከ`integrity_check_failed`፣ `broken_reference`፣ `stale_snapshot`፣ `invalid_state` አንዱ።                                |
| `repairedCount`   | በዚህ ማስኬጃ ወቅት የተጠገኑ ረድፎች፤ `autoRepair` false ሲሆን ሁልጊዜ `0` ነው።                                                         |
| `backupCreated`   | ከጥገናው በፊት ምትኬ ተወስዶ እንደሆነ።                                                                                            |
| `checkedAt`       | ማስኬጃው እና የሚጽፈው ማንኛውም የጥገና ማስታወሻ የሚጋሩት ISO የጊዜ ማኅተም።                                                                  |
| `driver.name`     | የተመረመረውን የውሂብ ጎታ የሚያገለግለው SQLite driver።                                                                             |
| `driver.degraded` | ጽሑፎች በውሂብ ጎታው ፋይል በዘላቂነት የማይደገፉ ሲሆን `true` ነው — የ`sql.js` WASM አማራጭ (የሙሉ ፋይል ቋሚ ማከማቻ) ወይም በማህደረ ትውስታ ውስጥ ያለ የውሂብ ጎታ። |

ተመሳሳዩ ይዘት በ`omniroute_db_health_check` MCP መሣሪያም ይመለሳል።

ብልሽትን ለመለየት `PRAGMA integrity_check`ን ያስኪዱ፦

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# ይህን ማተም አለበት፦ ok
```

ከ`ok` ውጭ ማንኛውንም ነገር ከመለሰ፣ **የውሂብ ጎታውን መጠቀም ወዲያውኑ ያቁሙ** እና ከምትኬ ይመልሱት።

---

## ከአደጋ መልሶ ማግኛ

### ሁኔታ 1፦ የWAL ፋይል ጠፍቷል

የ`-wal` ፋይል ጠፍቷል፣ ነገር ግን `-shm` እና ዋናው DB ሳይበላሹ አሉ፦

```bash
# በሚቀጥለው መክፈት ጊዜ በራስ-ሰር ይመለሳል
omniroute
```

SQLite በራስ-ሰር መልሶ ማግኘት ካልቻለ፦

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### ሁኔታ 2፦ ዋናው የDB ፋይል ተበላሽቷል

ከመጠባበቂያ ቅጂ ይመልሱ፦

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` ሙሉ የ`.tar.gz` ማህደርን ከሚሰራ አገልጋይ ብቻ ያወርዳል
(`GET /api/db-backups/exportAll`፣ የኦፕሬተር ማረጋገጫ ያስፈልጋል)፤ ምንም ነገር መልሶ አያገኝም።

### ሁኔታ 3፦ የምስጠራ ቁልፉ ጠፍቷል

ቁልፉ ከሌለ **መልሶ ማግኘት አይቻልም**። የተመሰጠሩት መስኮች ሊነበቡ አይችሉም። ሁሉንም አቅራቢዎች በአዲስ የመግቢያ ማረጋገጫዎች በእጅ እንደገና ያክሉ።

> **መከላከያ**፦ ሁልጊዜ የምስጠራ ቁልፉን ለብቻው ምትኬ ያስቀምጡ፤ በተሻለ ሁኔታ በይለፍ ቃል አስተዳዳሪ ወይም KMS ውስጥ።

### ሁኔታ 4፦ ዲስኩ ሞልቷል

SQLite የ`SQLITE_FULL` ስህተቶችን ይመልሳል። የዲስክ ቦታ ነጻ ያድርጉ፣ ከዚያ፦

```bash
# ቦታ ነጻ ለማድረግ WALን የፍተሻ ነጥብ ያከናውኑ
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## የተለመዱ ክዋኔዎች

### ሰንጠረዥን መመርመር

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### በሁሉም ሰንጠረዦች ውስጥ ያሉ ረድፎችን መቁጠር

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### ሁሉንም ውሂብ ዳግም ማስጀመር (ማጥፋት)

```bash
# መጀመሪያ OmniRouteን ያቁሙ
omniroute stop

# የDB ፋይሉን ይሰርዙ
rm ~/.omniroute/storage.sqlite*

# እንደገና ያስጀምሩ (ባዶ DB እንደገና ይፈጥራል)
omniroute
```

ለ**ተመራጭ** ዳግም ማስጀመር (አቅራቢዎችን አቆይቶ የአጠቃቀም ውሂብን ለማጥፋት)፦

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### አንድ ሰንጠረዥ ወደ ውጭ መላክ

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## ችግር ፍቺ

### "የውሂብ ጎታው ተቆልፏል"

ሌላ ሂደት የመጻፍ መቆለፊያ ይዟል። ከሚከተሉት አንዱን ያድርጉ፦

- ሌላው ሂደት እስኪጠናቀቅ ይጠብቁ (`lsof | grep storage.sqlite`ን ይፈትሹ)
- ሌላውን ሂደት ያቋርጡ
- ችግሩ ከቀጠለ OmniRouteን እንደገና ያስጀምሩ

### "የውጭ ቁልፍ ገደብ አልተሳካም"

አንድ የጎራ ሞጁል የማጣቀሻ ታማኝነትን እየጣሰ ነው። የሚከተሉትን ይፈትሹ፦

- በጥገኛ ሰንጠረዦች ውስጥ ያሉ ወላጅ-አልባ ረድፎች
- ያልተሰራጩ ተከታታይ ስረዛዎች
- የውጭ ቁልፍን የቀየረ የቅርብ ጊዜ ፍልሰት

ጥሰቶችን ለማግኘት `PRAGMA foreign_key_check;`ን ያስኪዱ።

### "የማህደረ ትውስታ እጥረት"

የSQLite በማህደረ ትውስታ ላይ የተመሠረተ I/O የOS ገደቡን እያለፈ ነው። በSQLite pragma በኩል ይቀንሱት፦

```sql
PRAGMA mmap_size = 134217728;  -- ከ256MB ይልቅ 128MB
```

ወይም ያሰናክሉት፦

```sql
PRAGMA mmap_size = 0;
```

### "ፍልሰቱ በመካከል አልተሳካም"

ፍልሰቱ በግብይት ውስጥ የተከናወነ ስለሆነ ወደ ነበረበት መመለስ ነበረበት። ካልተመለሰ፦

1. **OmniRouteን ያቁሙ** (ተጨማሪ ሙከራዎችን ለመከላከል)
2. **የDBውን ሁኔታ ይፈትሹ** `sqlite3`ን በመጠቀም
3. **በእጅ ያስተካክሉ** ከፊል ፍልሰቱን
4. **እንደገና ያስኪዱ** OmniRouteን (ፍልሰቱ እንደገና ይሞከራል)

ይህን ለመከላከል ሁልጊዜ ፍልሰቶችን መጀመሪያ በቅጂ ላይ ይፈትሹ።

---

## በተጨማሪ ይመልከቱ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — የአጠቃቀም ሰንጠረዦች
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — የጤንነት ክትትል
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — የልቀት ፍሰት
- ምንጭ፦ `src/lib/db/` (80+ ፋይሎች፣ ~25K LOC)
