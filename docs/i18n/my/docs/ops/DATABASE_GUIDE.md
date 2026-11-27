# Database Schema & Operations Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute သည် ၎င်း၏ အဓိကဒေတာသိုလှောင်မှုအဖြစ် **WAL journaling ပါဝင်သော SQLite** ကို အသုံးပြုပြီး အရေးကြီးသော field များကို သိမ်းဆည်းထားစဉ် **AES-256-GCM** ဖြင့် encryption ပြုလုပ်ထားသည်။ ဤလမ်းညွှန်တွင် schema၊ migration များ၊ backup/recovery နှင့် လုပ်ငန်းလည်ပတ်မှုဆိုင်ရာ runbook များကို ဖော်ပြထားသည်။

**ရင်းမြစ်များ:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (အခြေခံ table 17 ခု)
- `src/lib/db/migrationRunner.ts` — version အလိုက် migration များ
- `src/lib/db/migrations/` — version အလိုက် SQL file 167 ခု
- `src/lib/db/encryption.ts` — encryption အကူ function များ
- `src/lib/db/backup.ts` — backup export/import
- `src/lib/db/healthCheck.ts` — စနစ်အခြေအနေ စစ်ဆေးရှာဖွေခြင်း

---

## SQLite ကို ဘာကြောင့် အသုံးပြုသနည်း?

OmniRoute သည် အောက်ပါအကြောင်းရင်းများကြောင့် PostgreSQL/MySQL အစား SQLite ကို ရွေးချယ်ထားသည်-

| အချက်                        | SQLite                                                       | PostgreSQL                                                             |
| ---------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **Deployment**               | တစ်ပါတည်းထည့်သွင်းထားသည် — သီးခြား server မလိုအပ်ပါ          | Server တည်ဆောက်သတ်မှတ်ရန် လိုအပ်သည်                                    |
| **Encryption**               | Application အလွှာ (AES-256-GCM)                              | ထည့်သွင်းပါရှိသော TDE                                                  |
| **စွမ်းဆောင်ရည်**            | အသေးစား/အလတ်စား workload များအတွက် ပိုမြန်သည်                | အလွန်များပြားသော တစ်ပြိုင်နက် write လုပ်ဆောင်မှုများအတွက် ပိုကောင်းသည် |
| **တစ်ပြိုင်နက်လုပ်ဆောင်မှု** | WAL mode က တစ်ပြိုင်နက် read လုပ်ဆောင်မှုများကို ခွင့်ပြုသည် | MVCC အပြည့်အစုံ                                                        |
| **Backup**                   | File တစ်ခုတည်းကို ကူးယူနိုင်သည်                              | `pg_dump` သို့မဟုတ် filesystem snapshot                                |
| **အသုံးပြုမှုအခြေအနေ**       | အသုံးပြုသူတစ်ဦးချင်းစီ၏ install၊ embedded                    | Multi-tenant SaaS                                                      |

**အသုံးပြုသူတစ်ဦး၊ instance တစ်ခုတည်း** ဖြင့် deployment လုပ်ခြင်းများ (OmniRoute ၏ အဓိကအသုံးပြုမှုအခြေအနေ) အတွက် SQLite သည် ပိုမိုရိုးရှင်းပြီး မြန်ဆန်သည်။

### WAL Journaling

`core.ts` သည် database ကို **WAL (Write-Ahead Logging) mode** ဖြင့် ဖွင့်သည်-

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL သည် write လုပ်နေစဉ်အတွင်း **တစ်ပြိုင်နက် read လုပ်ဆောင်မှုများ** ကို ခွင့်ပြုသည် — request များကို မှတ်တမ်းတင်နေစဉ် query ပြုလုပ်သည့် dashboard အတွက် ဤအချက်သည် အရေးကြီးသည်။

မူလ cache အရွယ်အစားမှာ **65,536 KiB (64 MiB)** ဖြစ်သည်။ SQLite သည် အနုတ်တန်ဖိုးရှိသော
`cache_size` ကို KiB ဖြင့် သတ်မှတ်ထားသည့် ခန့်မှန်းအများဆုံးကန့်သတ်ချက်အဖြစ် သတ်မှတ်ပြီး လိုအပ်သလို page များကို နေရာချပေးသည်။
**Settings > System & Storage > Cache Size** တွင် **1 မှ
1,000,000 KiB** အထိ ကိန်းပြည့်တန်ဖိုးများကို လက်ခံသည်။ setting ကို သိမ်းဆည်းလိုက်ပါက လက်ရှိ database connection တွင် ချက်ချင်းသက်ရောက်ပြီး
OmniRoute စတင်ချိန်တွင် သိမ်းဆည်းထားသောတန်ဖိုးကို ပြန်လည်အသုံးပြုသည်။

---

## Database တည်နေရာ

SQLite file ကို အောက်ပါနေရာတွင် သိမ်းဆည်းထားသည်-

| OS      | လမ်းကြောင်း                                                              |
| ------- | ------------------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                            |
| macOS   | `~/.omniroute/storage.sqlite`                                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                                |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` မှတစ်ဆင့် ပြင်ဆင်သတ်မှတ်နိုင်သည်) |

ဆက်စပ် file များ-

- `storage.sqlite-wal` — write-ahead log
- `storage.sqlite-shm` — shared memory file
- `call_logs/` — request payload artifact များ (ဖွင့်ထားပါက)

**တည်နေရာကို အစားထိုးသတ်မှတ်ရန်:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domain Module တည်ဆောက်ပုံ

OmniRoute ၏ database တွင် `src/lib/db/` အတွင်း၌ **ထိပ်တန်းအဆင့် TypeScript module 110 ခု** ရှိသည်။ Domain module တစ်ခုစီသည်-

- သတ်မှတ်ထားသော table တစ်ခု သို့မဟုတ် တစ်ခုထက်ပို၍ ပိုင်ဆိုင်သည်
- Type ပါဝင်သော CRUD function များကို export လုပ်သည်
- အခြား module ၏ table များကို မည်သည့်အခါမျှ တိုက်ရိုက်မကိုင်တွယ်ပါ
- DB ကို အသုံးပြုရန် `core.ts` မှ `getDbInstance()` ကို အသုံးပြုသည်

### ထိပ်တန်းအဆင့် DB Module 110 ခု

OmniRoute တွင် `src/lib/db/` အတွင်း၌ **ထိပ်တန်းအဆင့် TypeScript file 110 ခု** ရှိသည်။ အောက်တွင် အဓိက module အချို့ကို နမူနာအဖြစ် ဖော်ပြထားသည်။ စာရင်းအပြည့်အစုံအတွက် directory စာရင်းကို ကြည့်ပါ-

| Module                  | Table များ                                                     | တာဝန်                                                                                                |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API key provider မှတ်ပုံတင်ခြင်းနှင့် အထောက်အထားများ                                           |
| `models.ts`             | `key_value` (model data)                                       | Model သတ်မှတ်ချက်များ၊ စွမ်းဆောင်ရည်များနှင့် ဈေးနှုန်းသတ်မှတ်ခြင်း                                  |
| `combos.ts`             | `combos`                                                       | Combo routing config များနှင့် အစီအစဉ်သတ်မှတ်ခြင်း                                                   |
| `apiKeys.ts`            | `api_keys`                                                     | API key သက်တမ်းစက်ဝန်း၊ scope များနှင့် quota ခြေရာခံခြင်း                                           |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | System configuration နှင့် မျှဝေထားသော KV store                                                      |
| `backup.ts`             | —                                                              | Backup export/import လုပ်ဆောင်ချက်များ                                                               |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxy config များနှင့် routing rule များ                                                             |
| `prompts.ts`            | `prompt_templates`                                             | ပြန်လည်အသုံးပြုနိုင်သော prompt template များနှင့် version ထိန်းချုပ်ခြင်း                            |
| `webhooks.ts`           | `webhooks`                                                     | Event-driven webhook subscription များနှင့် log များ                                                 |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Request တစ်ခုချင်းစီအလိုက် audit logging ပြုလုပ်ခြင်း (ရွေးချယ်နိုင်ပြီး ပမာဏများနိုင်သည်)           |
| `domainState.ts`        | `domain_*` (table 5 ခု)                                        | Domain budget များ၊ circuit breaker များ၊ lockout များ၊ fallback chain များနှင့် ကုန်ကျစရိတ်မှတ်တမ်း |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A အတွက် ခွင့်ပြုစာရင်းသွင်းထားသော API key များ                                                 |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ယခင် quota အသုံးပြုမှုမှတ်တမ်း                                                                       |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Model များကို မူလ combo များနှင့် mapping လုပ်ခြင်း                                                  |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI အတွက် သီးသန့် သိမ်းဆည်းထားသော အခြေအနေ                                                            |
| `encryption.ts`         | —                                                              | Field များကို encrypt/decrypt လုပ်ရန် helper များ                                                    |
| `readCache.ts`          | —                                                              | Read operation များသော လုပ်ဆောင်ချက်များအတွက် in-memory cache                                        |
| `secrets.ts`            | `key_value` (encrypted entries)                                | Encrypt လုပ်ထားသော secret များကို သိမ်းဆည်းခြင်း                                                     |
| `stateReset.ts`         | —                                                              | စမ်းသပ်မှုအတွက် DB state ကို ရှင်းလင်းခြင်း/reset လုပ်ခြင်း                                          |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Agent handoff အတွက် session context                                                                  |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | အသုံးပြုမှု ခြေရာခံခြင်း                                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Compression config                                                                                   |

### Module နယ်နိမိတ်များ

အဓိက တည်ဆောက်ပုံဆိုင်ရာ စည်းမျဉ်းတစ်ခုမှာ- **module များသည် အခြား module များ၏ table များကို တိုက်ရိုက် အသုံးမပြုရပါ**။ အခြား module တစ်ခု၏ data နှင့် အလုပ်လုပ်ရန် ထို module မှ function ကို import လုပ်ပါ။

```ts
// ❌ မှားသည်- အခြား module မှ SQL ကို တိုက်ရိုက်အသုံးပြုခြင်း
db.prepare("SELECT * FROM provider_connections").all();

// ✅ မှန်သည်- providers module ၏ function ကို အသုံးပြုခြင်း
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

ဤစည်းမျဉ်းကို code review ဖြင့် လိုက်နာစေသည်—static check မရှိသော်လည်း ချိုးဖောက်မှုများကို မှတ်သားသတိပေးမည်ဖြစ်သည်။

---

## အခြေခံ Schema (ဇယား 17 ခု)

`core.ts` သည် `SCHEMA_SQL` ထဲရှိ အခြေခံဇယား 17 ခုကို သတ်မှတ်ပေးသည်။ ၎င်းတို့ကို migration `001_initial_schema.sql` က ဖန်တီးပြီး ပင်မ schema ကို ဖွဲ့စည်းထားသည်။

### ပင်မဇယားများ (ကနဦး migration တွင် ဖန်တီးထားသည်)

| ဇယား                       | ရည်ရွယ်ချက်                                      | အဓိက column များ                                                        |
| -------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| `provider_connections`     | Provider အထောက်အထားများ (ကုဒ်ဝှက်ထားသည်)         | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Provider node လမ်းကြောင်းဆိုင်ရာ အချက်အလက်       | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | ယေဘုယျ KV သိမ်းဆည်းရာ                            | `namespace`, `key`, `value`                                             |
| `combos`                   | လမ်းကြောင်း combo သတ်မှတ်ချက်များ                | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Gateway အတွက် API key များ                       | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | ဒေတာဘေ့စ် metadata                               | `key`, `value`                                                          |
| `usage_history`            | တောင်းဆိုမှု အသုံးပြုမှုမှတ်တမ်းများ             | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | တောင်းဆိုမှု payload များနှင့် တုံ့ပြန်ချက်များ  | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Proxy တောင်းဆိုမှု မှတ်တမ်းများ                  | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Model မှ provider သို့ chain များ                | `model`, `chain`                                                        |
| `domain_budgets`           | Domain တစ်ခုချင်းအလိုက် သုံးစွဲငွေ ဘတ်ဂျက်များ   | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | ဘတ်ဂျက် ပြန်လည်သတ်မှတ်မှု မှတ်တမ်း               | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Domain တစ်ခုချင်းအလိုက် ကုန်ကျစရိတ် ခြေရာခံခြင်း | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domain rate-limit အခြေအနေ                        | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Domain တစ်ခုချင်းအလိုက် circuit breaker အခြေအနေ  | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM တုံ့ပြန်ချက် cache                           | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ယခင် quota snapshot များ                         | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### ထပ်ဆောင်းဇယားများ (နောက်ပိုင်း migration များမှ ထည့်သွင်းထားသည်)

နောက်ဆက်တွဲ migration များက အောက်ပါဇယားများကို ထည့်သွင်းပေးသည်-

- `cli_tool_state` (migration 011) — CLI tool အခြေအနေ
- `mcp_*` ဇယားများ — MCP server စစ်ဆေးမှုမှတ်တမ်း
- `a2a_*` ဇယားများ — A2A လုပ်ငန်းဆောင်တာ အခြေအနေ
- `usage_*` ဇယားများ — အသုံးပြုမှု ခြေရာခံခြင်း
- `plugin_*` ဇယားများ — plugin စနစ်
- `skill_executions` — skill လုပ်ဆောင်မှုမှတ်တမ်း
- `memory_*` ဇယားများ — memory စနစ်
- `compression_*` ဇယားများ — compression စနစ်
- `webhook_*` ဇယားများ — webhook ပေးပို့မှုမှတ်တမ်း
- `acp_*` ဇယားများ — Agent Client Protocol
- `oneproxy_*` ဇယားများ — 1proxy marketplace
- `proxy_assignments` — proxy scope ချိတ်ဆက်မှုများ
- `detailed_call_artifacts` — call log artifact metadata
- `quota_alert_history` — quota သတိပေးချက် စစ်ဆေးမှုမှတ်တမ်း
- `command_code_auth_sessions` — Command Code OAuth session များ

ဇယား ~30+ ခု၏ စာရင်းအပြည့်အစုံကို `src/lib/db/migrations/` တွင် တွေ့နိုင်သည်။

---

## Migrations

OmniRoute သည် `src/lib/db/migrations/` အတွင်းရှိ **ဗားရှင်းသတ်မှတ်ထားသော၊ idempotent ဖြစ်သော migration များ**ကို အသုံးပြုသည်။ Migration တစ်ခုစီသည် SQL ဖိုင်တစ်ဖိုင်စီ ဖြစ်သည်။ အမည်ပေးပုံစံ နှစ်မျိုးကို အတူတကွ အသုံးပြုနေပြီး၊ `_omniroute_migrations` တွင် မှတ်တမ်းတင်ထားသော ဗားရှင်းသည် ဂဏန်းရှေ့ဆက်ဖြစ်သည်။

### Migration အမည်ပေးခြင်း

| ပုံစံ                                            | ဥပမာ                                 | အသုံးပြုသည့်နေရာ                                                                                                                                                                                      |
| ------------------------------------------------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (ဂဏန်း ၃ လုံး အတိအကျ)      | `241_seen_models.sql`                | အဟောင်းစီးရီး `001`–`241` အတွက်။ Timestamp ပုံစံ စတင်အသုံးပြုချိန်တွင် ရပ်ဆိုင်းခဲ့သည် (`240` နှင့် `241` ကို ထိုမတိုင်မီတွင် merge လုပ်ခဲ့သည်)။ ထို့ကြောင့် အစဉ်လိုက်နံပါတ်အသစ်ဖြင့် ဖိုင်အသစ် မရပါ။ |
| `YYYYMMDDHHMMSS_description.sql` (ဂဏန်း ၁၄ လုံး) | `20261113120000_add_usage_index.sql` | 2026-11-13 မှစ၍ ဖန်တီးသော migration အားလုံးအတွက်။                                                                                                                                                     |

ပြောင်းလဲရသည့်အကြောင်းရင်းမှာ အစဉ်လိုက်နံပါတ်များကို အသုံးပြုသောအခါ parallel PR များက နောက်နံပါတ်တစ်ခုတည်းကို ရွေးချယ်မိကြပြီး merge မလုပ်မီ တစ်ခုမှလွဲ၍ အားလုံးသည် နံပါတ်ပြန်ပြောင်းရသောကြောင့် ဖြစ်သည်။ UTC timestamp သည် PR တစ်ခုစီအတွက် ကိုယ်ပိုင်ဗားရှင်းကို ပေးသည်။

Timestamp ပုံစံအတွက် စည်းမျဉ်းများ (`npm run check:migration-numbering` က စစ်ဆေးပေးပြီး `scripts/check/lib/migrationNaming.mjs` ရှိ generator နှင့်လည်း မျှဝေထားသည်) မှာ-

- Timestamp သည် အမှန်တကယ်ရှိသော UTC ရက်စွဲနှင့် အချိန် ဖြစ်ရမည်။ `20261113000000` ထက် စောမနေရ၊ လက်ရှိအချိန်ထက် ၁၀ မိနစ်ထက်ပို၍ အနာဂတ်သို့ မရောက်ရ။
- ဖော်ပြချက်သည် lowercase `snake_case` ဖြစ်ရမည်။ အက္ခရာ (`a-z`) သို့မဟုတ် ဂဏန်း (`0-9`) ဖြင့် စတင်ရမည်။ စကားလုံးများအကြား `_` တစ်လုံးသာ ရှိရမည်။ အရှည်သည် စာလုံး ၈၀ ထက် မပိုရ။
- Timestamp တူညီသော ဖိုင်နှစ်ဖိုင်ရှိပါက duplicate ဖြစ်သည်။
- Gap မရှိရစည်းမျဉ်းသည် အဟောင်းစီးရီးအတွက်သာ သက်ရောက်သည်။ `001` မှ `241` အထိ နံပါတ်တိုင်း ရှိရမည်။ သိရှိထားသော gap များဖြစ်သည့် `026`၊ `055` နှင့် `121` တို့ကိုသာ ချန်လှပ်နိုင်သည်။ `241` (သို့မဟုတ် အဟောင်းဖိုင်တစ်ခုခု) ကို ဖျက်လျှင် gate စစ်ဆေးမှု မအောင်မြင်ပါ။ `001` နှင့် `241` ကို `KNOWN_GAPS` allowlist ထဲသို့ မည်သည့်အခါမျှ ထည့်သွင်းနိုင်မည်မဟုတ်ပါ။ Timestamp ပါသော ဖိုင်များသည် gap မဖန်တီးပါ။
- `src/lib/db/migrations/` အတွင်းရှိ entry တိုင်းသည် lowercase `.sql` အမည်မှန်ကန်သော regular file ဖြစ်ရမည်။ Directory၊ symlink၊ `.SQL` သို့မဟုတ် `.sql.bak` ဖိုင်၊ hidden file သို့မဟုတ် space ပါသောအမည်ရှိပါက gate စစ်ဆေးမှု မအောင်မြင်ပါ။ အကြောင်းမှာ runner က ၎င်းကို တိတ်တဆိတ် ကျော်သွားနိုင်ခြင်း သို့မဟုတ် boot အချိန်တွင် ပျက်စီးနိုင်ခြင်းကြောင့် ဖြစ်သည်။

**အသုံးချမည့်အစီအစဉ်။** Runner သည် စာသားအရမဟုတ်ဘဲ prefix ၏ ဂဏန်းတန်ဖိုးအလိုက် စီစဉ်သည်။ အရင်ဆုံး အဟောင်း `001`–`241` ဖိုင်များ၊ ထို့နောက် timestamp အစဉ်အတိုင်း timestamp ပါသော ဖိုင်များ၊ နောက်ဆုံးတွင် `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` ဖြင့် မှတ်ပုံတင်ထားသော namespace ပါသည့် directory များ (`ee-001` ကဲ့သို့သော ဗားရှင်းများ) ဖြစ်သည်။ Pending migration ဆိုသည်မှာ ၎င်း၏ဗားရှင်းသည် `_omniroute_migrations` ထဲတွင် မရှိသေးသော ဖိုင်ဖြစ်သည်။ ထို့ကြောင့် branch အဟောင်းမှ migration တစ်ခုသည် အသစ်သော migration ပြီးနောက် merge ဝင်လာသော်လည်း ရှိပြီးသား database များတွင် ၎င်းကို အသုံးချမည်ဖြစ်သည်။

**Timestamp သည် ဖန်တီးသည့်အစီအစဉ်ကို ဆိုလိုပြီး merge အစီအစဉ်ကို မဆိုလိုပါ။** သင့် migration သည် **ပိုသစ်သော timestamp** ရှိသည့် migration (ဥပမာ အခြား PR မှ migration တစ်ခုက အရင် merge ဝင်လာခြင်း) က ဖန်တီးထားသော table သို့မဟုတ် column တစ်ခုအပေါ် မူတည်နေပါက database အသစ်တွင် သင့် migration ကို အရင် run မိပြီး ပျက်စီးနိုင်သည်။ သင့် PR မပိတ်သေးစဉ် ဖိုင်အမည်ကို `npm run db:new-migration` ဖြင့် ပြန်လည်ဖန်တီးကာ timestamp ပိုသစ်လာစေရန် ပြုလုပ်ပါ၊ သို့မဟုတ် dependency မရှိအောင် ပြင်ဆင်ပါ။ `npm run test:migrations:fresh` သည် migration အားလုံးကို database အလွတ်တစ်ခုတွင် အသုံးချပြီး ဤပြဿနာကို ဖမ်းဆီးပေးသည်။

### Merged Migration တစ်ခုကို မည်သည့်အခါမျှ ဖျက်ခြင်း သို့မဟုတ် အမည်ပြောင်းခြင်း မပြုရ

Migration ဖိုင်တစ်ခုသည် release branch သို့မဟုတ် `main` ပေါ်သို့ ရောက်ရှိသွားသည်နှင့် ၎င်းကို homolog နှင့် developer database များ၊ VPS ထည့်သွင်းမှုများနှင့် Enterprise sync တို့တွင် run ပြီးဖြစ်သည်။ ထိုအချိန်မှစ၍-

- **မည်သည့်အခါမျှ မဖျက်ပါနှင့်။** Database အသစ်များတွင် ၎င်း၏ schema ပျောက်ဆုံးသွားမည်ဖြစ်သော်လည်း upgrade ပြုလုပ်ထားသော database များတွင် ဆက်လက်ရှိနေမည်ဖြစ်သည်။
- **မည်သည့်အခါမျှ အမည်မပြောင်းပါနှင့်။** `_omniroute_migrations` ထဲရှိ ဗားရှင်းသည် ဖိုင်တစ်ခုနှင့် ထပ်မကိုက်ညီတော့သဖြင့် ၎င်းကို အသုံးချပြီးသား database တိုင်းတွင် ထပ်မံ run မည်ဖြစ်သည်။ ထိုအခါ idempotent မဟုတ်သော SQL သည် data များကို ထပ်ပွားစေခြင်း သို့မဟုတ် boot ကို ရပ်တန့်စေခြင်း ဖြစ်နိုင်သည်။
- **Schema အခြားပုံစံတစ်ခု လိုအပ်ပါသလား။** `npm run db:new-migration` ဖြင့် migration အသစ်တစ်ခု ဖန်တီးပါ။

Merge မလုပ်ရသေးသော ဖိုင်တစ်ခုအတွက်သာ အမည်ပြောင်းခြင်းသည် ဘေးကင်းသည်။ Gate ၏ အကြံပြုချက်များက ရည်ညွှန်းသည့်အခြေအနေမှာ ထိုအခြေအနေဖြစ်သည်။ Release tag တစ်ခုက ဤစည်းမျဉ်းကို မပြောင်းလဲစေပါ။ `release/v*` branch သို့ push တိုင်းသည် Docker `:next` image ကို ထုတ်ဝေပြီး homolog၊ VPS ထည့်သွင်းမှုများနှင့် Enterprise sync တွင် run သောကြောင့် `vX.Y.Z` tag မရှိမီကတည်းက merged migration တစ်ခုသည် အမှန်တကယ် database များတွင် run ပြီးဖြစ်သည်။ Gate သည် tag ရှိသည်ဖြစ်စေ မရှိသည်ဖြစ်စေ base ဖိုင်တစ်ခုကို ဖယ်ရှားမှုတိုင်းကို မအောင်မြင်စေသည်။

- **ပေါင်းစည်းပြီးသား migration ကို ပြန်လည်ဖျက်သိမ်းခြင်း။** ဖိုင်ကိုဖျက်သည့် `git revert` သည် gate စစ်ဆေးမှု မအောင်မြင်ပါ။ ဖိုင်ကို ထားရှိပြီး schema ကို migration အသစ်တစ်ခုဖြင့် ပြန်လည်ဖျက်သိမ်းပါ။ `npm run db:new-migration -- <description>` ကို အသုံးပြုပြီး `DROP TABLE IF EXISTS`၊ `DROP INDEX IF EXISTS` စသည်တို့ ထည့်သွင်းပါ။ အဆင့်မြှင့်ထားသော database များနှင့် အသစ်ဖန်တီးထားသော database များသည် နောက်ဆုံးတွင် schema တူညီသွားမည်ဖြစ်သည်။
- **လက်ခံထားသော တစ်ခုတည်းသော rename: compatibility entry နှင့် တူညီသောအကြောင်းအရာ။** ပေါင်းစည်းပြီးသားဖိုင်ကို ရွှေ့ရန်လိုအပ်ပါက (ဥပမာ၊ ပေါင်းစည်းပြီးသားဖိုင်နှစ်ခုတွင် timestamp တူညီသဖြင့် runner က version collision ဖြင့် ရပ်တန့်သည့်အခါ) နောက်ပိုင်းဖိုင်ကို SQL မပြင်ဘဲ rename လုပ်ပြီး `src/lib/db/migrationRunner/constants.ts` ရှိ `RENAMED_MIGRATION_COMPATIBILITY` ထဲသို့ `{ fromVersion, fromName, toVersion, toName }` ထည့်ပါ။ ယခင် version ကို အသုံးပြုပြီးသား database များတွင် ဖိုင်ကို ထပ်မံ run မည့်အစား ၎င်းတို့၏ `_omniroute_migrations` row ကို ရွှေ့ပေးမည်ဖြစ်သည်။ Gate သည် ထိုကဲ့သို့သော rename ကို သတိပေးပြီး timestamp အသစ် မည်သို့ဖြစ်စေ commutation check ကို အမြဲလုပ်ဆောင်မည်ဖြစ်သည်။ အသစ်တပ်ဆင်မှုများတွင် ဖိုင်ကို ၎င်း၏နေရာအသစ်၌ အသုံးချမည်ဖြစ်ပြီး အဆင့်မြှင့်ထားသော database များတွင် အသုံးမချသည့်အတွက် timestamp အသစ်ကို အဟောင်းနှင့် နီးစပ်အောင် ရွေးချယ်ပါ။ အကြောင်းအရာပြောင်းလဲထားပါက (schema ပြောင်းလဲမှုကို migration အသစ်တွင် ထည့်ရမည်) သို့မဟုတ် entry ၏ target ဖိုင်သည် disk ပေါ်တွင် မရှိပါက gate သည် rename ကို မအောင်မြင်စေမည်ဖြစ်သည်။
- **တူညီသော timestamp အတွင်းတွင် မည်သည့်အခါမျှ rename မလုပ်ပါနှင့်။** timestamp ကို မပြောင်းဘဲ description ကိုသာ ပြောင်းသည့် rename သည် entry ပါသည်ဖြစ်စေ မပါသည်ဖြစ်စေ gate စစ်ဆေးမှု မအောင်မြင်ပါ။ `toVersion` သည် `fromVersion` နှင့် တူညီသော entry ပါရှိပါက runner သည် ထိုဖိုင်ကို ယခင်က run ပြီးသား database တိုင်းတွင် အဟောင်း `_omniroute_migrations` row ကို ဖျက်ပြီး ဖိုင်ကို ထပ်မံအသုံးချမည်ဖြစ်သည်။ Entry မပါရှိပါက runner သည် version ကိုသာ မှတ်တမ်းတင်ထားသဖြင့် ထို database များတွင် ဖိုင်ကို ကျော်သွားမည် (အကြောင်းအရာအသစ်သည် ထိုနေရာတွင် မ run သွားပါ) နှင့် boot တိုင်းတွင် renumbering error ကို log မှတ်တမ်းတင်မည်ဖြစ်သည်။ အခြား timestamp တစ်ခုကို compatibility entry နှင့်အတူ အသုံးပြုပါ၊ သို့မဟုတ် အမည်ကို မပြောင်းပါနှင့်။
- **Rename ပြုလုပ်ထားသောဖိုင်ကို ထပ်မံ run မည်မဟုတ်ကြောင်း gate က စစ်ဆေးသည်။** အကျုံးဝင်သော rename တစ်ခုစီအတွက် gate သည် ဖိုင်အမည်အသစ်ကို `--must-not-apply` ဖြင့် commutation check ထံ ပေးပို့သည်။ ထို check သည် အမှန်တကယ် runner ဖြင့် အဆင့်မြှင့်ထားသော database ကို boot လုပ်ပြီး runner က ထိုဖိုင်ကို ထပ်မံအသုံးချပါက (ဥပမာ entry တွင် version သို့မဟုတ် name မှားယွင်းနေခြင်း၊ သို့မဟုတ် gate ၏ text parser က `constants.ts` ကို TypeScript နှင့် မတူညီစွာ ဖတ်ရှုခြင်းကြောင့်) gate သည် `migration renomeada rodaria de novo` ဖြင့် မအောင်မြင်ဘဲ entry ၏ အဟောင်းနှင့် အသစ် versions၊ names များကို စစ်ဆေးရန် တောင်းဆိုမည်ဖြစ်သည်။

### Gate က Base နှင့် မည်သည်တို့ကို စစ်ဆေးသနည်း

Pull request နှင့် merge-queue run များတွင် `npm run check:migration-numbering` သည် disk ပေါ်ရှိ `src/lib/db/migrations/` ကို base branch ရှိ အလားတူ directory နှင့် နှိုင်းယှဉ်သည်။ Base ကို အောက်ပါအစီအစဉ်အတိုင်း သတ်မှတ်သည်: `--base-latest-tag`၊ `--base <ref>`၊ `MIGRATION_BASE_REF` variable သို့မဟုတ် `GITHUB_EVENT_NAME` သည် `pull_request`၊ `pull_request_target` သို့မဟုတ် `merge_group` ဖြစ်သည့်အခါ merge commit ၏ ပထမ parent၊ event payload ၏ `merge_group.base_sha` သို့မဟုတ် `git merge-base HEAD origin/$GITHUB_BASE_REF` ဖြစ်သည်။ Pull request သို့မဟုတ် merge-queue run တွင် ဖြေရှင်းနိုင်သော base မရှိပါက gate မအောင်မြင်ပါ။ CI ပြင်ပတွင် `--base` မပါဘဲ run လုပ်ပါက `comparação com a base: pulada (sem --base)` ကို ပြသပြီး ဤစည်းမျဉ်းများကို ကျော်သွားမည်ဖြစ်သည်။

`--base-latest-tag` သည် `HEAD` ၏ history ထဲတွင် ပါဝင်သော release tag အသစ်ဆုံး (`vX.Y.Z` ကို semver အစီအစဉ်ဖြင့် သတ်မှတ်သည်၊ nightlies ကဲ့သို့ suffix ပါသော tag များကို ထည့်သွင်းမတွက်ပါ) နှင့် နှိုင်းယှဉ်ပြီး `--base` နှင့် တူညီသော စည်းမျဉ်းများကို အသုံးပြုသည်။ Release-Green (`scripts/quality/validate-release-green.mjs`) သည် ဤနည်းလမ်းဖြင့် gate ကို run လုပ်သည်၊ အကြောင်းမှာ push နှင့် scheduled run များတွင် pull request base မရှိသည့်အပြင် merge တစ်ခုသည် CI run အသစ်မရှိဘဲ ရောက်ရှိသွားနိုင်သောကြောင့် ဖြစ်သည်။ History ထဲတွင် release tag မရှိပါက gate မအောင်မြင်ပါ။ `git fetch --tags` ကို run လုပ်ပါ (CI တွင် `fetch-depth: 0` ဖြင့် `actions/checkout` ကို အသုံးပြုပါက tag များကို ရရှိမည်ဖြစ်သည်)။

| Pull request တွင် ပြောင်းလဲမှု                                                                                                                 | ရလဒ်                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| base တွင် ရှိပြီးသားဖိုင်ကို `RENAMED_MIGRATION_COMPATIBILITY` entry ဖြင့် အမည်ပြောင်းထားခြင်း                                                 | အကြောင်းအရာတူညီပါက **သတိပေးချက်** ပြမည်ဖြစ်ပြီး၊ timestamp အသစ်မည်သို့ပင်ဖြစ်စေ commutation check ကို လုပ်ဆောင်မည်။ အနေအထားအသစ်ကြောင့် နောက်ဆုံး schema ပြောင်းလဲသွားပါက (အမည်ပြောင်းထားမှုကို ပြန်ဖျက်ပါ၊ သို့မဟုတ် commutation ဖြစ်နိုင်သည့် အခြား timestamp အသစ်တစ်ခုကို ရွေးပါ) သို့မဟုတ် အဆင့်မြှင့်ထားသော database တွင် runner က အမည်ပြောင်းထားသောဖိုင်ကို ထပ်မံအသုံးချမည်ဆိုပါက စစ်ဆေးမှုမအောင်မြင်ပါ။ အကြောင်းအရာပြောင်းလဲထားပါက **မအောင်မြင်ပါ**။ |
| base တွင် ရှိပြီးသားဖိုင်ကို timestamp မပြောင်းဘဲ အမည်ပြောင်းထားခြင်း (ဖော်ပြချက်သာ ပြောင်းလဲခြင်း)                                            | entry ပါသည်ဖြစ်စေ မပါသည်ဖြစ်စေ **မအောင်မြင်ပါ**။ entry ပါပါက runner က ၎င်းကို ထပ်မံအသုံးချမည်ဖြစ်ပြီး၊ entry မပါပါက version အရ ကျော်သွားမည်ဖြစ်သည်။ အခြား timestamp တစ်ခုနှင့် compatibility entry ကို အသုံးပြုပါ၊ သို့မဟုတ် အမည်ကို မပြောင်းပါနှင့်။                                                                                                                                                                                                      |
| base တွင် ရှိပြီးသားဖိုင်ကို ဖျက်ထားခြင်း၊ သို့မဟုတ် entry မပါဘဲ အမည်ပြောင်းထားခြင်း                                                           | ဖိုင်သည် release tag ထဲတွင် ရှိသည်ဖြစ်စေ မရှိသည်ဖြစ်စေ **မအောင်မြင်ပါ**။ ၎င်းကို ပြန်ဖျက်ရန် `git checkout <base> -- src/lib/db/migrations/<file>` ဖြင့် ဖိုင်ကို ပြန်လည်ထားရှိပါ။ ၎င်း၏ schema ကို ပြန်လည်ပြောင်းရန် `DROP ... IF EXISTS` ပါဝင်သည့် migration အသစ်တစ်ခု ထည့်ပါ။                                                                                                                                                                           |
| base တွင် ရှိပြီးသားဖိုင်၏ အကြောင်းအရာ မတူညီတော့ခြင်း                                                                                          | **သတိပေးချက်** (`::warning` annotation in GitHub Actions) ပြမည်ဖြစ်ပြီး commutation check ကို လုပ်ဆောင်မည်။ ပြင်ဆင်မှုကြောင့် နောက်ဆုံး schema ပြောင်းလဲသွားပါက အဆင့်မြှင့်ထားသော database များတွင် ပြင်ဆင်ထားသောဖိုင်ကို ထပ်မံအသုံးချမည်မဟုတ်သောကြောင့် စစ်ဆေးမှုမအောင်မြင်ပါ။ ပြောင်းလဲမှုကို migration အသစ်တစ်ခုတွင် ထည့်ပါ။ အန္တရာယ်မရှိသော ပြင်ဆင်မှု (comment တစ်ခု၊ `IF NOT EXISTS`) ဖြစ်ပါက သတိပေးချက်သာ ပြမည်။                                    |
| timestamp ပါသောဖိုင်ကို base ၏ နောက်ဆုံး timestamp ထက် မအသစ်သော timestamp ဖြင့် ထည့်ထားခြင်း                                                   | အောက်တွင် ဖော်ပြထားသည့် commutation check ကို လုပ်ဆောင်မည်။                                                                                                                                                                                                                                                                                                                                                                                                |
| အဟောင်းဖော်မတ် `NNN_` ဖိုင်ကို base ၏ နောက်ဆုံး အဟောင်းဖော်မတ်ဖိုင်ထက် နံပါတ်နိမ့်သော နံပါတ်ဖြင့် ထည့်ထားခြင်း                                 | `KNOWN_GAPS` ကို pull request တစ်ခုတည်းတွင် ပြင်ဆင်ထားသော်လည်း **မအောင်မြင်ပါ**။ အဟောင်းစီးရီးကို ရပ်တန့်ထားပြီး migration ကို `npm run db:new-migration` ဖြင့် ဖန်တီးပါ။ base ၏ နောက်ဆုံးဖိုင်ထက် နံပါတ်မြင့်သော အဟောင်းဖော်မတ်ဖိုင်များ (`release/v*` မှ `main` သို့ pull request) ကို လက်ခံမည်။                                                                                                                                                         |
| အစီအစဉ်မဟုတ်သော၊ ပြင်ဆင်ထားသော သို့မဟုတ် အမည်ပြောင်းထားသောဖိုင်တွင် `INSERT`, `UPDATE`, `DELETE` သို့မဟုတ် `REPLACE` statement များ ပါဝင်ခြင်း | **သတိပေးချက်**: commutation check သည် data ကို နှိုင်းယှဉ်ခြင်းမပြုသောကြောင့် အဆင့်မြှင့်ထားသော database နှင့် အသစ်တည်ဆောက်ထားသော database တို့တွင် ၎င်းကို အသုံးချသည့် အစီအစဉ်က ရလဒ်ကို ပြောင်းလဲစေခြင်း ရှိ၊ မရှိ စစ်ဆေးပါ။                                                                                                                                                                                                                              |

Commutation check တစ်ကြိမ်လုပ်ဆောင်ခြင်းသည် အစီအစဉ်မဟုတ်သော၊ ပြင်ဆင်ထားသောနှင့် အမည်ပြောင်းထားသောဖိုင်များကို တစ်ပြိုင်နက် အကျုံးဝင်သည်။

Commutation စစ်ဆေးမှု (`scripts/check/migration-commutation.ts`) သည် အမှန်တကယ် install လမ်းကြောင်းကို အသုံးပြု၍ ယာယီ database နှစ်ခုကို တည်ဆောက်သည်။ တစ်ခုမှာ **အဆင့်မြှင့်ထားသော** database ဖြစ်ပြီး (base migrations များဖြင့် ပထမအကြိမ် boot လုပ်ပြီး၊ ထို့နောက် pull request ၏ migrations များဖြင့် ဖိုင်တစ်ခုတည်းပေါ်တွင် ထပ်မံ boot လုပ်ခြင်း)၊ အခြားတစ်ခုမှာ **အသစ်စက်စက်** database ဖြစ်သည် (pull request ၏ migrations များဖြင့် တစ်ကြိမ်တည်း boot လုပ်ခြင်း)။ ထို့နောက် ရရှိလာသော schema များကို နှိုင်းယှဉ်သည်။ နှိုင်းယှဉ်သည့်အရာများမှာ tables နှင့် columns (column အစီအစဉ်ကို လျစ်လျူရှုသည်)၊ UNIQUE / PRIMARY KEY နှင့် FOREIGN KEY constraints များ၊ table တစ်ခုချင်းစီ၏ normalized `CREATE TABLE` စာသား (CHECK constraints၊ collations၊ generated columns နှင့် table options များကိုပါ အကျုံးဝင်သည်)၊ indexes၊ triggers နှင့် views များ ဖြစ်သည်။ Row data ကို မနှိုင်းယှဉ်ပါ။ ကိုက်ညီပါက gate သည် ဖိုင်သည် အစီအစဉ်မမှန်သော်လည်း commutes ဖြစ်ကြောင်း ပြသပြီး အောင်မြင်သည်။ မကိုက်ညီပါက gate သည် ကွာခြားချက်နှင့် သက်ဆိုင်ရာအခြေအနေအတွက် အကြံပြုချက်ဖြင့် မအောင်မြင်စေသည်။ အစီအစဉ်မမှန်သော ဖိုင်ဖြစ်ပါက `npm run db:new-migration` ဖြင့် ၎င်း၏အမည်ကို ပြန်လည်ထုတ်လုပ်ပါ။ ဖိုင်သည် မပေါင်းစည်းရသေးသောကြောင့် ဤလုပ်ဆောင်ချက်သည် လုံခြုံသည်။ ပြင်ဆင်ထားသော base ဖိုင်ဖြစ်ပါက base အကြောင်းအရာကို ပြန်လည်ထားရှိပြီး ပြောင်းလဲမှုကို migration အသစ်တစ်ခုထဲတွင် ထည့်ပါ။ အမည်ပြောင်းထားသော ဖိုင်ဖြစ်ပါက အမည်ပြောင်းခြင်းကို ပြန်ဖျက်ပါ သို့မဟုတ် commutes ဖြစ်သည့် အခြား timestamp အသစ်တစ်ခုကို ရွေးပါ။ အမည်တစ်ခုတည်းဖြင့် timestamp တူညီမှုကို မည်သည့်အခါမျှ မသုံးပါနှင့်။ စစ်ဆေးမှုကိုယ်တိုင် မလုပ်ဆောင်နိုင်ပါက CI တွင် gate သည် မအောင်မြင်စေပြီး local တွင်သာ သတိပေးသည်။ ပြင်ဆင်ထားသော base ဖိုင်အတွက် upgraded database ကို ထိုဖိုင်၏ base အကြောင်းအရာဖြင့် တည်ဆောက်ပြီး ဒုတိယ boot တွင် ၎င်း၏ version ကို မှတ်တမ်းတင်ပြီးသားဖြစ်သောကြောင့် ကျော်သွားသည်။ အမည်ပြောင်းထားသော ဖိုင်အတွက် upgraded database ကို ဖိုင်၏အဟောင်းအမည်ဖြင့် တည်ဆောက်ပြီး ဒုတိယ boot တွင် ၎င်း၏ `_omniroute_migrations` row ကို compatibility entry မှတစ်ဆင့် ရွှေ့ပေးသောကြောင့် ထပ်မံမလုပ်ဆောင်တော့ပါ။ Gate သည် `--must-not-apply` ဖြင့် အမည်အသစ်ကို စစ်ဆေးသောကြောင့် ဒုတိယ boot က ၎င်းကို apply လုပ်ပါက စစ်ဆေးမှု မအောင်မြင်ပါ။ Pull request migration သည် upgraded လမ်းကြောင်းတွင် apply မဖြစ်ပါက၊ ဆိုလိုသည်မှာ base migration အားလုံးပြီးနောက် (fresh install တွင်လည်း မအောင်မြင်သည်ဖြစ်စေ မအောင်မြင်သည်ဖြစ်စေ) gate သည် `migration do PR não aplica` ဟု ဖော်ပြပြီး base ၏ လက်ရှိ schema နှင့် ကိုက်ညီအောင် SQL ကို ပြင်ဆင်ရန် တောင်းဆိုသည်။ ဖိုင်သည် နောက်ကျသော timestamp ရှိသည့် အခြား pull request migration တစ်ခုအပေါ် မူတည်နေပါက `npm run db:new-migration` ဖြင့် ၎င်း၏အမည်ကို ပြန်လည်ထုတ်လုပ်ပါ။

တူညီသော နှိုင်းယှဉ်မှုကို local တွင် လုပ်ဆောင်ရန် base ကို အတိအလင်း ပေးပါ။ ဥပမာ `npm run check:migration-numbering -- --base origin/<base-branch>` သို့မဟုတ် နောက်ဆုံး release နှင့် နှိုင်းယှဉ်ရန် `npm run check:migration-numbering -- --base-latest-tag` ကို အသုံးပြုပါ။

### Open PR တစ်ခု၏ `NNN` Migration ကို ပြောင်းလဲခြင်း

ပြောင်းလဲမှုမစတင်မီ ဖွင့်ထားသော pull request တစ်ခုတွင် `242_add_widgets.sql` ကဲ့သို့ sequential ဖိုင်တစ်ခု ရှိနေနိုင်သေးသည်။ `241` ထက်ကြီးသော နံပါတ်ဟောင်းများကို ပယ်ချသောကြောင့် merge မလုပ်မီ ၎င်းကို ပြောင်းလဲပါ။

1. **ဖော်ပြချက်ကို မပြောင်းလဲဘဲ generator ဖြင့် ဖိုင်အမည်ပြောင်းပါ။** `npm run db:new-migration -- <same description>` ကို run လုပ်၍ အမည်အသစ်ရယူပါ၊ SQL ကို ထိုဖိုင်ထဲသို့ ရွှေ့ပါ၊ ထို့နောက် အဟောင်း `NNN_` ဖိုင်ကို ဖျက်ပါ။ ဖော်ပြချက်သည် တိတိကျကျ တူညီနေရမည်။ အောက်ပါ compatibility entry သည် ၎င်းကို ဖော်ပြချက်အပေါ် မူတည်၍ ကိုက်ညီစေသည်။
2. **Persistent database တစ်ခုက အဟောင်းနံပါတ်ကို run ခဲ့ပါက compatibility entry ထည့်ပါ။** ထိန်းသိမ်းထားသော database တစ်ခုခု (homolog၊ VPS၊ contributor ၏ ကိုယ်ပိုင် install) တွင် `NNN_` ဖိုင်ပါသော PR build ကို run ခဲ့ပါက `src/lib/db/migrationRunner/constants.ts` ရှိ `RENAMED_MIGRATION_COMPATIBILITY` ထဲသို့ `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` ကို ထည့်ပါ။ ဤအရာသည် **`237` မှ `241` အထိအတွက် မဖြစ်မနေလိုအပ်သည်**။ ထို slot များတွင် ယခု canonical `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` နှင့် `241_seen_models.sql` တို့ ရှိနေပြီး entry မရှိပါက ထို database သည် canonical migration ကို အမြဲတမ်းကျော်သွားကာ ပြောင်းလဲထားသော migration ကို ထပ်မံ run လုပ်မည်ဖြစ်သည်။ Destination သည် timestamp ဖြစ်သည့်အခါ `242` ကဲ့သို့ အလွတ်ကျန်နေသော slot အတွက်လည်း အလုပ်လုပ်သည်။ မသေချာပါက entry ကို ထည့်ပါ။ Array ထဲတွင် ထည့်သည့်နေရာသည် အရေးမကြီးပါ။ Entry တစ်ခု၏ target slot တွင် အခြား entry တစ်ခုက ရွှေ့ထုတ်မည့် row ရှိနေသေးပါက (ဥပမာ `237` တွင် PR row ရှိနေပြီး အဟောင်း `usage_history_calculated_cost` row က `237` သို့ ရွှေ့ရန် စောင့်နေသည့်အခါ) runner သည် slot လွတ်သည်အထိ ထို entry ကို စောင့်စေသည်။ တကယ့် conflict တစ်ခုဖြစ်သည့် မည်သည့် entry ကမျှ မရွှေ့ပေးသည့် row က slot ကို သိမ်းထားခြင်း သို့မဟုတ် entry နှစ်ခုက slot များကို အပြန်အလှန်လဲလှယ်ခြင်းတို့သာ boot ကို `Cannot reconcile ...` ဖြင့် ရပ်တန့်စေသည်။
3. **SQL ကို idempotent ဖြစ်အောင် ထားပါ** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`)။ ပြောင်းလဲထားသော migration သည် schema ရှိပြီးသား database တစ်ခုနှင့် တွေ့ဆုံနိုင်သောကြောင့် ဖြစ်သည်။
4. **Version-keyed special cases များကို ရွှေ့ပါ။** PR က `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) သို့မဟုတ် `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`) ထဲတွင် ၎င်း၏အဟောင်းနံပါတ်အတွက် case တစ်ခု ထည့်ခဲ့ပါက key ကို timestamp အသစ်သို့ ပြောင်းပါ။

`tests/unit/db/codex-fence-migration-rename.test.ts` သည် အမည်ပြောင်းထားသော migration အတွက် test တစ်ခု၏ အလုပ်လုပ်နေသော ဥပမာဖြစ်သည်။

### ပြောင်းလဲမှုမစတင်မီ Branch များသို့ Backport ပြုလုပ်ခြင်း

`YYYYMMDDHHMMSS_` ဖိုင်ကို ပြောင်းလဲမှုမစတင်မီရှိသော branch တစ်ခု (ဥပမာ အဟောင်း `release/v*` branch) သို့ cherry-pick သို့မဟုတ် backport မလုပ်ပါနှင့်။ ထိုနေရာရှိ runner သည် ဖိုင်အမည်များကို စာသားအဖြစ် စီစဉ်သောကြောင့် timestamp ပါသော ဖိုင်သည် fresh database တွင် `201_` နှင့် `202_` ကြား၌ run သွားမည်ဖြစ်ပြီး ထိုနေရာရှိ gate အဟောင်းသည် ဂဏန်း ၁၄ လုံးပါ prefix များကို နားမလည်ပါ။ ထိုသို့သော branch တွင် ပြောင်းလဲမှုကို ထို branch ၏ နောက်ထပ် `NNN_` ဖိုင်အဖြစ် ရေးသားပြီး idempotent ဖြစ်အောင် ပြုလုပ်ပါ။ ထို့နောက် timestamp ပါသော version ရောက်လာသည့်အခါ no-op ဖြစ်စေရန် ဖြစ်သည်။

### Migrations များ မည်သို့ Run လုပ်သနည်း

Startup အချိန်တွင် `migrationRunner.ts` သည် -

1. `_omniroute_migrations` table မရှိပါက ဖန်တီးသည်
2. အရင်က apply လုပ်ပြီးသား migrations များကို query လုပ်သည်
3. Migration အသစ်များကို အစီအစဉ်အတိုင်း တစ်ခုချင်းစီ transaction တစ်ခုအတွင်း apply လုပ်သည်
4. Apply လုပ်ပြီး migration တစ်ခုချင်းစီကို timestamp ဖြင့် မှတ်တမ်းတင်သည်

```ts
// src/lib/db/migrationRunner.ts (အကျဉ်းချုပ်)
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

### Idempotency

မိုင်ဂရေးရှင်းများသည် **idempotent** ဖြစ်ရမည် — ၎င်းတို့ကို နှစ်ကြိမ် run လုပ်ပါက မည်သည့်ပြောင်းလဲမှုမျှ မဖြစ်သင့်ပါ:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`၊ `IF EXISTS` နှင့် `OR IGNORE` / `OR REPLACE` clause များကို လိုအပ်သလို ကျယ်ကျယ်ပြန့်ပြန့် အသုံးပြုပါ။

### မိုင်ဂရေးရှင်းအသစ် ထည့်ခြင်း

1. **Generator ဖြင့် ဖိုင်ဖန်တီးပါ**: `npm run db:new-migration -- <description>` (ဥပမာ `npm run db:new-migration -- add combo priority`)။ ၎င်းသည် လက်ရှိ UTC အချိန်နှင့် comment header ပါဝင်သော `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` ကို ရေးသားပေးမည်ဖြစ်ပြီး၊ ထို timestamp ကို အသုံးပြုပြီးသားဖြစ်ပါက တစ်စက္ကန့် ရှေ့တိုးပေးမည်ဖြစ်ကာ ဖိုင်တစ်ခုကို မည်သည့်အခါမျှ overwrite လုပ်မည်မဟုတ်ပါ။ နံပါတ်ကို ကိုယ်တိုင် မရွေးချယ်ပါနှင့်။
2. **လုံခြုံသော DDL ကို အသုံးပြုပါ**: `CREATE TABLE IF NOT EXISTS`၊ `CREATE INDEX IF NOT EXISTS`၊ `ALTER TABLE ... ADD COLUMN`
3. **ဒေတာကို ဂရုတစိုက် backfill လုပ်ပါ**: ရှိပြီးသား row များကို ကိုင်တွယ်ရန် `UPDATE ... WHERE ...` ကို အသုံးပြုပါ
4. **အစီအစဉ်နှင့် အမည်ပေးခြင်းကို စစ်ဆေးပါ**: `npm run test:migrations:fresh` (ဗလာ database တစ်ခုတွင် မိုင်ဂရေးရှင်းအားလုံးကို လုပ်ဆောင်ခြင်း) နှင့် `npm run check:migration-numbering`
5. **မိတ္တူတစ်ခုတွင် စမ်းသပ်ပါ**: မစမ်းသပ်ရသေးသော မိုင်ဂရေးရှင်းများကို production တွင် မည်သည့်အခါမျှ မလုပ်ဆောင်ပါနှင့်
6. **ကုဒ်မှ ဖန်တီးထားသော ဇယားတစ်ခုသည် ရွှေ့ပြောင်းခြင်းလည်း လိုအပ်ပါသည်။** : အကယ်၍ module တစ်ခုသည် ပျင်းရိစွာ ဇယားကို ဖန်တီးသည်ဆိုပါက (`CREATE TABLE IF NOT EXISTS`၊ self-heal လမ်းကြောင်းအဖြစ် သိမ်းဆည်းထားပါက ) ရွှေ့ပြောင်းခြင်းသည် ၎င်းကို DDL တစ်ခုတည်းဖြင့် ဖန်တီးရပါမည်။ မဟုတ်ပါက clean install နှင့် upgraded install သည် ထိုကုဒ်လမ်းကြောင်းကို လည်ပတ်ခြင်းရှိမရှိအပေါ် မူတည်၍ မတူညီသော schemas များဖြင့် အဆုံးသတ်သွားပါမည်။ `tests/unit/db/lazy-table-migration-guard.test.ts` `src/` နှင့် `open-sse/` ကို စကင်န်ဖတ်ပြီး ရွှေ့ပြောင်းခြင်းမရှိဘဲ (#20557) ပျင်းရိ `CREATE` တွင် မအောင်မြင်ပါ။ ဥပမာ- `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`

ဥပမာ:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **နောက်ပြန်သဟဇာတမဖြစ်သော ပြောင်းလဲမှုများ** (ဥပမာ၊ column များကို ဖျက်ခြင်း) သည် ရှုပ်ထွေးနိုင်ပါသည်။ OmniRoute သည် downgrade ကို မပံ့ပိုးပါ — မိုင်ဂရေးရှင်းတစ်ခုကို အသုံးချပြီးသည်နှင့် schema ပြောင်းလဲမှုသည် အမြဲတမ်းတည်ရှိမည်ဖြစ်သည်။ ထို့ကြောင့် သင့်အစီအစဉ်ကို သင့်လျော်စွာ ချမှတ်ပါ။

---

## သိမ်းဆည်းထားစဉ် ကုဒ်ဝှက်ခြင်း

အရေးကြီးသော field များ (API key များ၊ OAuth token များ၊ connection string များ) ကို သိမ်းဆည်းထားစဉ် **AES-256-GCM** ဖြင့် ကုဒ်ဝှက်ထားသည်။

### အလုပ်လုပ်ပုံ

```ts
// src/lib/db/encryption.ts (ရိုးရှင်းအောင် ပြထားသည်)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### အသုံးပြုထားသည့်နေရာများ

- `provider_connections.api_key` — application အဆင့်တွင် ကုဒ်ဝှက်ထားသည်
- `provider_connections.access_token`, `refresh_token`, `id_token` — application အဆင့်တွင် ကုဒ်ဝှက်ထားသည်
- `namespace = "secrets"` ပါရှိသော `key_value` entry များ — application အဆင့်တွင် ကုဒ်ဝှက်ထားသည်
- `proxy_registry.auth` — ရှိပါက application အဆင့်တွင် ကုဒ်ဝှက်ထားသည်

### ကုဒ်ဝှက်ခြင်း Key

ကုဒ်ဝှက်ခြင်း key ကို **passphrase** (`STORAGE_ENCRYPTION_KEY` env var မှတစ်ဆင့် သတ်မှတ်သည်) နှင့် **salt** (DB ထဲတွင် သိမ်းဆည်းထားသည်) တို့မှ ထုတ်ယူသည်။ ဒေတာကို ကုဒ်ပြန်ဖြည်ရန် နှစ်ခုစလုံး လိုအပ်သည်။

```bash
# လုံခြုံသော passphrase တစ်ခု ထုတ်လုပ်ရန်
openssl rand -hex 32

# .env တွင် သတ်မှတ်ရန်
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **အလွန်အရေးကြီးသည်**- ကုဒ်ဝှက်ခြင်း key ပျောက်ဆုံးသွားပါက ကုဒ်ဝှက်ထားသော ဒေတာအားလုံးကို အသုံးပြုခွင့် ဆုံးရှုံးမည်ဖြစ်သည်။ **Key ကို database နှင့် သီးခြားစီ အရန်သိမ်းဆည်းပါ**။

### ကုဒ်ဝှက်မထားသည့်အရာများ

စွမ်းဆောင်ရည်ဆိုင်ရာ အကြောင်းပြချက်များကြောင့် အောက်ပါတို့ကို plaintext ဖြင့် သိမ်းဆည်းထားသည်-

- Provider ပြသမှုအမည်များ
- Model သတ်မှတ်ချက်များ (မူလကတည်းက အများသိနိုင်သော အချက်အလက်များဖြစ်သည်)
- Routing စည်းမျဉ်းများ
- အသုံးပြုမှုမှတ်တမ်းများ (PII မပါဝင်ပါ)

---

## ကုဒ်ဝှက်ခြင်းဆိုင်ရာ သတိပြုရန်အချက်များ (v3.8.16+)

OmniRoute သည် ကုဒ်ဝှက်ခြင်းနည်းလမ်းနှစ်မျိုးကို အသုံးပြုသူအတွက် ခွဲခြားသိရန်မလိုဘဲ ကိုင်တွယ်ရန် **`migrateLegacyEncryptedString()`** ကို အသုံးပြုသည်-

- **အဟောင်း** (v3.5.0 မတိုင်မီ)- XOR အခြေခံ "ကုဒ်ဝှက်ခြင်း" (စစ်မှန်သော cryptography မဟုတ်ပါ)
- **လက်ရှိ**- သင့်လျော်သော IV နှင့် auth tag ပါဝင်သည့် AES-256-GCM

ရွှေ့ပြောင်းခြင်း အကူလုပ်ဆောင်ချက်သည် အဟောင်း format ကို စစ်ဆေးသိရှိပြီး ပထမဆုံးဖတ်သည့်အချိန်တွင် နည်းလမ်းအသစ်ဖြင့် ပြန်လည်ကုဒ်ဝှက်သည်။ ထို့ကြောင့် အထောက်အထားများ မဆုံးရှုံးဘဲ database အဟောင်းတစ်ခုကို အဆင့်မြှင့်နိုင်သည်။

---

## ဖတ်ရှုမှု Cache

မကြာခဏဖတ်ရှုရသည့် ဒေတာများ (models၊ providers၊ settings) အတွက် `readCache.ts` က **memory အတွင်းရှိ cache** တစ်ခုကို ပံ့ပိုးပေးသည်-

```ts
// စတင်ချိန်တွင် cache ပြုလုပ်ပြီး ရေးသားသည့်အခါ invalid ဖြစ်စေသည်
const providers = await getCachedProviders(); // မြန်ဆန်ပြီး memory အတွင်းမှ ရယူသည်
const fresh = await listProviders(); // နှေးကွေးပြီး DB ကို တိုက်ရိုက်အသုံးပြုသည်
```

| Cache လုပ်ထားသော entity | Cache key      | TTL                 |
| ----------------------- | -------------- | ------------------- |
| `models`                | `models:v1`    | ရေးသားသည့်အချိန်အထိ |
| `provider_connections`  | `providers:v1` | ရေးသားသည့်အချိန်အထိ |
| `settings`              | `settings:v1`  | ရေးသားသည့်အချိန်အထိ |
| `combos`                | `combos:v1`    | ရေးသားသည့်အချိန်အထိ |

သက်ဆိုင်ရာ table သို့ ရေးသားမှုတိုင်းတွင် cache ကို invalid ဖြစ်စေသည်။

---

## အရန်သိမ်းခြင်းနှင့် ပြန်လည်ရယူခြင်း

### ကိုယ်တိုင် အရန်သိမ်းခြင်း

```bash
# စက်တွင်း အရန်သိမ်းမှုတစ်ခု ဖန်တီးရန် CLI ကို အသုံးပြုပါ
omniroute backup create --name pre-migration

# သို့မဟုတ် API မှတစ်ဆင့်
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

အရန်သိမ်းထားသော file တွင် အောက်ပါတို့ ပါဝင်သည်-

- DB table များအားလုံး (JSON အဖြစ် serialize လုပ်ထားသည်)
- ခေါ်ဆိုမှုမှတ်တမ်း artifact များ (base64 ဖြင့် encode လုပ်ထားပြီး ထည့်သွင်းရန် မဖြစ်မနေမဟုတ်ပါ)
- Settings + secrets (ကုဒ်ဝှက်ထားသည်)
- Plugin configuration

### ပြန်လည်ရယူခြင်း

```bash
# CLI မှတစ်ဆင့်
omniroute restore pre-migration

# API မှတစ်ဆင့်
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **သတိပေးချက်**: ပြန်လည်ရယူခြင်းသည် DB တစ်ခုလုံးကို ထပ်ရေးမည်ဖြစ်သည်။ Client များအားလုံးကို ဦးစွာ ရပ်တန့်ပါ။

### အလိုအလျောက် အရန်သိမ်းခြင်း

```bash
# CLI မှတစ်ဆင့် နေ့စဉ် အလိုအလျောက်အရန်သိမ်းမှုများကို ဖွင့်ပါ
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

အချိန်ဇယားကို စက္ကန့် 30 တိုင်း (ပုံသေ) အလုပ်လုပ်သည့် နောက်ခံ job တစ်ခုက server ဘက်တွင် လုပ်ဆောင်ပြီး cron expression ကို server ၏ ဒေသစံတော်ချိန်နှင့် တိုက်ဆိုင်စစ်ဆေးသည်။

| Variable                                    | ပုံသေ   | ဖော်ပြချက်                                                                                                                                 |
| ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | Tick interval ကို ms ဖြင့် သတ်မှတ်သည် (အနည်းဆုံး `5000`)။ ကိုက်ညီသော cron မိနစ်အတွင်း ယုံကြည်စိတ်ချစွာ အလုပ်လုပ်နိုင်ရန် 60 s ထက် တိုရမည်။ |

### SQLite Hot Backup

အလုပ်လုပ်နေသော DB တစ်ခုကို ရပ်နားချိန်မရှိဘဲ အရန်သိမ်းရန်-

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

၎င်းသည် SQLite ၏ online backup API ကို အသုံးပြုသည် — OmniRoute အလုပ်လုပ်နေစဉ်အတွင်း အသုံးပြုရန် ဘေးကင်းသည်။

---

## စွမ်းဆောင်ရည် ချိန်ညှိခြင်း

### WAL မုဒ်

WAL ကို ပုံမှန်အားဖြင့် ဖွင့်ထားသည်။ ရေးသားမှုများပြားသော workload များအတွက် အောက်ပါအတိုင်း စဉ်းစားသတ်မှတ်နိုင်သည်-

```sql
PRAGMA wal_autocheckpoint = 1000;  -- စာမျက်နှာ ၁,၀၀၀ တိုင်း Checkpoint လုပ်ရန်
```

OmniRoute သည် `journal_size_limit` ကို သတ်မှတ်မထားပါ။ Checkpoint သည် WAL frame များကို အဓိကဖိုင်ထဲသို့ ရွှေ့ပေးသော်လည်း WAL ဖိုင်သည် ၎င်း၏ အကြီးဆုံး ခွဲဝေသတ်မှတ်ထားသော အရွယ်အစားကို ဆက်လက်ထိန်းသိမ်းထားသည်။ `OMNIROUTE_WAL_GUARD_MAX_MB` guard သည် သတိပေးချက်တစ်ခုသာ ပြသပြီး `wal_checkpoint(RESTART)` ကို လုပ်ဆောင်သည်။ ၎င်းသည် disk အရွယ်အစား ကန့်သတ်ချက် မဟုတ်ပါ။

### Index များ

စွမ်းဆောင်ရည်အတွက် အရေးကြီးသော index များ (migration များက အလိုအလျောက် ဖန်တီးပေးသည်)-

- `idx_models_provider` — provider အလိုက် model ရှာဖွေမှုများ
- `idx_combo_targets_combo_id` — combo target များ ချဲ့ထွင်ခြင်း
- `idx_usage_history_api_key_timestamp` — အသုံးပြုမှု ခွဲခြမ်းစိတ်ဖြာခြင်း
- `idx_quota_snapshots_api_key_window` — quota ခြေရာခံခြင်း
- `idx_call_logs_timestamp` — call log မေးမြန်းမှုများ

Index အသစ်တစ်ခု ထည့်ရန် migration တစ်ခု ဖန်တီးပါ-

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memory-Mapped I/O

အလွန်ကြီးမားသော database များ (>10GB) အတွက် memory mapping ကို SQLite pragma မှတစ်ဆင့် ချိန်ညှိနိုင်သည်-

```sql
-- SQLite pragma မှတစ်ဆင့် သတ်မှတ်ပါ (core.ts သို့မဟုတ် runtime တွင် ချိန်ညှိပါ)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compaction

အချိန်ကြာမြင့်စွာ လည်ပတ်နေသော OmniRoute instance များသည် အခါအားလျော်စွာ `VACUUM` လုပ်ဆောင်ခြင်းမှ အကျိုးရှိသည်-

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

အသွားအလာနည်းသော အချိန်ကာလများအတွင်း လစဉ် လုပ်ဆောင်ပါ။ (WAL မုဒ်ကြောင့် လိုအပ်မှု လျော့နည်းသော်လည်း လုံးဝပျောက်ကွယ်သွားခြင်း မရှိပါ။)

---

## ကျန်းမာရေး စစ်ဆေးမှု

`src/lib/db/healthCheck.ts` သည် **DB အဆင့် ကျန်းမာရေး ရောဂါရှာဖွေစစ်ဆေးမှုများ** ကို ပံ့ပိုးပေးသည်-

HTTP verb နှစ်ခုစလုံးသည် authentication လိုအပ်သည် (မရှိပါက `401`)။ `GET` သည် ရောဂါရှာဖွေစစ်ဆေးမှုသာ လုပ်ဆောင်ပြီး၊ `POST` သည်
`autoRepair` ကို ဖွင့်ထားကာ အလားတူစစ်ဆေးမှုကို လုပ်ဆောင်သည်။

```bash
GET  /api/db/health   # ရောဂါရှာဖွေစစ်ဆေးရန်
POST /api/db/health   # ရောဂါရှာဖွေစစ်ဆေးရန် + ပြုပြင်ရန်
```

တုံ့ပြန်ချက်သည် `runDbHealthCheck()` မှ ထုတ်ပေးသော `DbHealthCheckResult` ဖြစ်သည်
(`src/lib/db/healthCheck.ts`)-

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domain budget များက မရှိတော့သော API key များကို ရည်ညွှန်းထားသည်။",
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

| Field             | အဓိပ္ပာယ်                                                                                                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` သည် ဗလာဖြစ်သည့်အခါ `true` ဖြစ်သည်။ `driver` သည် ၎င်းအပေါ် မည်သည့်အခါမျှ သက်ရောက်မှုမရှိပါ။                                                                                |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` တို့အနက် တစ်ခုဖြစ်သည်။                                                                             |
| `repairedCount`   | ယခုလုပ်ဆောင်မှုအတွင်း ပြုပြင်ခဲ့သော row အရေအတွက်ဖြစ်ပြီး၊ `autoRepair` သည် false ဖြစ်သည့်အခါ အမြဲတမ်း `0` ဖြစ်သည်။                                                                 |
| `backupCreated`   | မပြုပြင်မီ backup ပြုလုပ်ခဲ့ခြင်း ရှိ၊ မရှိ။                                                                                                                                       |
| `checkedAt`       | လုပ်ဆောင်မှုနှင့် ၎င်းက ရေးသားသော repair note တို့တွင် တူညီစွာ အသုံးပြုထားသော ISO timestamp။                                                                                       |
| `driver.name`     | စစ်ဆေးထားသော database ကို ဝန်ဆောင်မှုပေးနေသည့် SQLite driver။                                                                                                                      |
| `driver.degraded` | ရေးသားမှုများကို database file က တာရှည်ခံစွာ သိမ်းဆည်းမထားနိုင်သည့်အခါ `true` ဖြစ်သည် — `sql.js` WASM fallback (file တစ်ခုလုံး သိမ်းဆည်းမှု) သို့မဟုတ် in-memory database ဖြစ်သည်။ |

အလားတူ payload ကို `omniroute_db_health_check` MCP tool ကလည်း ပြန်ပေးသည်။

ပျက်စီးမှုကို ရှာဖွေရန် `PRAGMA integrity_check` ကို လုပ်ဆောင်ပါ-

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# အောက်ပါတို့ကို ပရင့်ထုတ်သင့်သည်- ok
```

`ok` မှလွဲ၍ အခြားတစ်ခုခုကို ပြန်ပေးပါက **database ကို ချက်ချင်း အသုံးပြုခြင်း ရပ်တန့်ပါ**၊ ထို့နောက် backup မှ ပြန်လည်ရယူပါ။

---

## ဘေးအန္တရာယ်မှ ပြန်လည်ထူထောင်ခြင်း

### အခြေအနေ 1: WAL ဖိုင် ပျောက်ဆုံးခြင်း

`-wal` ဖိုင် ပျောက်ဆုံးနေသော်လည်း `-shm` နှင့် ပင်မ DB သည် မပျက်မစီး ရှိနေသည်-

```bash
# နောက်တစ်ကြိမ် ဖွင့်သည့်အခါ အလိုအလျောက် ပြန်လည်ရယူသည်
omniroute
```

SQLite က အလိုအလျောက် ပြန်လည်ရယူ၍ မရပါက-

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### အခြေအနေ 2: ပင်မ DB ဖိုင် ပျက်စီးခြင်း

အရန်သိမ်းဆည်းမှုမှ ပြန်လည်ရယူပါ-

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` သည် လည်ပတ်နေသော ဆာဗာမှ `.tar.gz` archive အပြည့်အစုံကိုသာ ဒေါင်းလုဒ်လုပ်သည်
(`GET /api/db-backups/exportAll`၊ operator အထောက်အထား လိုအပ်သည်)။ မည်သည့်အရာကိုမျှ ပြန်လည်ရယူပေးခြင်း မရှိပါ။

### အခြေအနေ 3: Encryption Key ပျောက်ဆုံးခြင်း

Key မရှိပါက **ပြန်လည်ရယူရန် မဖြစ်နိုင်ပါ**။ Encrypt လုပ်ထားသော field များကို ဖတ်၍မရပါ။ Provider အားလုံးကို credential အသစ်များဖြင့် ကိုယ်တိုင် ပြန်လည်ထည့်သွင်းပါ။

> **ကြိုတင်ကာကွယ်မှု**: Encryption key ကို သီးခြား အမြဲအရန်သိမ်းဆည်းထားပါ။ ဖြစ်နိုင်ပါက password manager သို့မဟုတ် KMS တွင် သိမ်းဆည်းပါ။

### အခြေအနေ 4: Disk ပြည့်သွားခြင်း

SQLite သည် `SQLITE_FULL` error များကို ပြန်ပေးပါမည်။ Disk နေရာလွတ်ကို ရှင်းလင်းပြီးနောက် အောက်ပါအတိုင်း လုပ်ဆောင်ပါ-

```bash
# နေရာလွတ် ရရှိစေရန် WAL ကို checkpoint လုပ်ပါ
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## အသုံးများသော လုပ်ဆောင်ချက်များ

### ဇယားတစ်ခုကို စစ်ဆေးခြင်း

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### ဇယားအားလုံးရှိ အတန်းအရေအတွက်ကို ရေတွက်ခြင်း

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### ဒေတာအားလုံးကို ပြန်လည်သတ်မှတ်ခြင်း (ဖျက်ရှင်းခြင်း)

```bash
# OmniRoute ကို ဦးစွာ ရပ်တန့်ပါ
omniroute stop

# DB ဖိုင်ကို ဖျက်ပါ
rm ~/.omniroute/storage.sqlite*

# ပြန်လည်စတင်ပါ (DB အလွတ်ကို ပြန်လည်ဖန်တီးမည်)
omniroute
```

**ရွေးချယ်ထားသော အချက်အလက်များသာ** ပြန်လည်သတ်မှတ်ရန် (ဝန်ဆောင်မှုပေးသူများကို ထိန်းသိမ်းပြီး အသုံးပြုမှုဒေတာကို ဖျက်ရန်)-

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### ဇယားတစ်ခုတည်းကို ထုတ်ယူခြင်း

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## ပြဿနာဖြေရှင်းခြင်း

### "ဒေတာဘေ့စ်ကို လော့ခ်ချထားသည်"

အခြား process တစ်ခုက ရေးသားမှုလော့ခ်ကို ထိန်းထားသည်။ အောက်ပါတစ်ခုခုကို လုပ်ဆောင်ပါ-

- အခြား process ပြီးဆုံးသည်အထိ စောင့်ပါ (`lsof | grep storage.sqlite` ဖြင့် စစ်ဆေးပါ)
- အခြား process ကို ရပ်တန့်ပါ
- ပြဿနာ ဆက်လက်ဖြစ်ပေါ်နေပါက OmniRoute ကို ပြန်လည်စတင်ပါ

### "Foreign key ကန့်သတ်ချက် မအောင်မြင်ပါ"

Domain module တစ်ခုက ရည်ညွှန်းဆက်စပ်မှု၏ မှန်ကန်ပြည့်စုံမှုကို ချိုးဖောက်နေသည်။ အောက်ပါတို့ကို စစ်ဆေးပါ-

- မှီခိုနေသော ဇယားများရှိ မိဘမဲ့အတန်းများ
- ဆက်တိုက်ဖျက်ခြင်းများ မပြန့်ပွားခဲ့ခြင်း
- Foreign key တစ်ခုကို ပြောင်းလဲထားသော လတ်တလော migration

ချိုးဖောက်မှုများကို ရှာဖွေရန် `PRAGMA foreign_key_check;` ကို လုပ်ဆောင်ပါ။

### "မှတ်ဉာဏ် မလုံလောက်ပါ"

SQLite ၏ memory-mapped I/O သည် OS ကန့်သတ်ချက်ကို ကျော်လွန်နေသည်။ SQLite pragma မှတစ်ဆင့် လျှော့ချပါ-

```sql
PRAGMA mmap_size = 134217728;  -- 256MB အစား 128MB
```

သို့မဟုတ် ပိတ်ပါ-

```sql
PRAGMA mmap_size = 0;
```

### "Migration လုပ်ဆောင်နေစဉ် အလယ်တွင် မအောင်မြင်ပါ"

Migration ကို transaction တစ်ခုအတွင်း လုပ်ဆောင်ခဲ့သောကြောင့် rollback ပြန်လုပ်ပြီး ဖြစ်သင့်သည်။ ထိုသို့ မဖြစ်ပါက-

1. **OmniRoute ကို ရပ်တန့်ပါ** (ထပ်မံကြိုးပမ်းမှုများကို တားဆီးရန်)
2. `sqlite3` ဖြင့် **DB အခြေအနေကို စစ်ဆေးပါ**
3. တစ်စိတ်တစ်ပိုင်းသာ ပြီးစီးထားသော migration ကို **ကိုယ်တိုင် ပြင်ဆင်ပါ**
4. OmniRoute ကို **ပြန်လည်လုပ်ဆောင်ပါ** (migration ကို ထပ်မံကြိုးပမ်းမည်)

ယင်းကို ကာကွယ်ရန် migration များကို မိတ္တူတစ်ခုပေါ်တွင် အမြဲ ဦးစွာ စမ်းသပ်ပါ။

---

## ဆက်လက်ကြည့်ရှုရန်

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — အသုံးပြုမှုဇယားများ
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — စနစ်အခြေအနေ စောင့်ကြည့်ခြင်း
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — ဖြန့်ချိမှုလုပ်ငန်းစဉ်
- ရင်းမြစ်- `src/lib/db/` (ဖိုင် 80 ကျော်၊ LOC ~25K)
