# Database Schema & Operations Guide (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Na nkenke**: OmniRoute na-eji **SQLite nwere ndekọ WAL** dịka ebe nchekwa mbụ ya, tinyere nzuzo **AES-256-GCM** maka data ndị dị mkpa mgbe echekwara ha. Nduzi a na-akọwa schema, migrations, ndabere/mweghachi, na akwụkwọ ntuziaka arụmọrụ.

**Isi mmalite:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (tebụl ntọala 17)
- `src/lib/db/migrationRunner.ts` — migrations nwere ụdị mbipụta
- `src/lib/db/migrations/` — faịlụ SQL 167 nwere ụdị mbipụta
- `src/lib/db/encryption.ts` — ngwa enyemaka nzuzo
- `src/lib/db/backup.ts` — mbupụ/mbubata ndabere
- `src/lib/db/healthCheck.ts` — nyocha ọnọdụ sistemụ

---

## Gịnị mere SQLite?

OmniRoute họọrọ SQLite kama PostgreSQL/MySQL n'ihi ọtụtụ ihe:

| Ihe               | SQLite                                        | PostgreSQL                                |
| ----------------- | --------------------------------------------- | ----------------------------------------- |
| **Mbugharị**      | Etinyere n'ime ya — sava ọzọ adịghị mkpa      | Ọ chọrọ nhazi sava                        |
| **Nzuzo**         | N'ogo ngwa (AES-256-GCM)                      | TDE arụnyere n'ime ya                     |
| **Ọsọ ọrụ**       | Ọsọ karịa maka ibu ọrụ nta/ọkara              | Ka mma maka nnukwu odide na-eme n'otu oge |
| **Ọrụ n'otu oge** | Ọnọdụ WAL na-enye ohere ọgụgụ n'otu oge       | MVCC zuru oke                             |
| **Ndabere**       | Nṅomi otu faịlụ                               | `pg_dump` ma ọ bụ snapshot sistemụ faịlụ  |
| **Ojiji**         | Nrụnye nke onye ọrụ ọ bụla, etinyere n'ime ya | SaaS nwere ọtụtụ ndị ahịa                 |

Maka mbugharị **nke otu onye ọrụ, otu instance** (ojiji bụ isi nke OmniRoute), SQLite dị mfe ma dịkwa ngwa karịa.

### Ndekọ WAL

`core.ts` na-emepe ọdụ data site na **ọnọdụ WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL na-enye ohere **ọgụgụ na-eme n'otu oge** mgbe a na-ede ihe — nke a dị mkpa maka dashboard, nke na-eme ajụjụ mgbe a na-edekọ arịrịọ.

Nha cache ndabara bụ **65,536 KiB (64 MiB)**. SQLite na-ewere
`cache_size` na-adịghị mma dịka oke elu a tụlere na KiB ma na-ekenye peeji dịka mkpa si dị.
**Settings > System & Storage > Cache Size** na-anabata ọnụọgụ integer sitere na **1 ruo
1,000,000 KiB**; ichekwa ntọala ahụ na-etinye ya ozugbo na njikọ ọdụ data dị ndụ,
OmniRoute na-eweghachikwa uru echekwara mgbe ọ na-amalite.

---

## Ebe Ọdụ Data Dị

A na-echekwa faịlụ SQLite na:

| OS      | Ụzọ                                                                 |
| ------- | ------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                       |
| macOS   | `~/.omniroute/storage.sqlite`                                       |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                           |
| Docker  | `/app/data/storage.sqlite` (enwere ike ịhazi ya site na `DATA_DIR`) |

Faịlụ ndị na-eso ya:

- `storage.sqlite-wal` — ndekọ write-ahead
- `storage.sqlite-shm` — faịlụ ebe nchekwa a na-ekekọrịta
- `call_logs/` — ihe ndị metụtara payload arịrịọ (ọ bụrụ na agbanyere ya)

**Gbanwee ebe ahụ:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Nhazi Modul Domen

Ebe nchekwa data OmniRoute nwere **modul TypeScript 110 dị n'ọkwa kachasị elu** n'ime `src/lib/db/`. Modul domen ọ bụla:

- Na-ahụ maka otu tebụl ma ọ bụ karịa akọwapụtara nke ọma
- Na-ebupụ ọrụ CRUD nwere ụdị
- Anaghị emetụ tebụl modul ọzọ aka
- Na-eji `getDbInstance()` sitere na `core.ts` iji nweta DB

### Modul DB 110 Dị n'Ọkwa Kachasị Elu

OmniRoute nwere **faịlụ TypeScript 110 dị n'ọkwa kachasị elu** n'ime `src/lib/db/`. N'okpuru bụ ụfọdụ modul ndị bụ isi; lee ndepụta ndekọ ahụ maka ndepụta zuru ezu:

| Modul                   | Tebụl                                                          | Ọrụ                                                                      |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Ndebanye onye na-eweta OAuth/API key na nzere                            |
| `models.ts`             | `key_value` (data model)                                       | Nkọwa model, ikike, na ọnụahịa                                           |
| `combos.ts`             | `combos`                                                       | Nhazi na usoro nhazi ụzọ combo                                           |
| `apiKeys.ts`            | `api_keys`                                                     | Usoro ndụ API key, oke ikike, na nsuso oke ojiji                         |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Nhazi sistemụ na ebe nchekwa KV a na-ekekọrịta                           |
| `backup.ts`             | —                                                              | Ọrụ mbupụ/mbubata ndabere                                                |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Nhazi proxy na iwu nhazi ụzọ                                             |
| `prompts.ts`            | `prompt_templates`                                             | Template prompt ndị enwere ike iji ọzọ na njikwa ụdị                     |
| `webhooks.ts`           | `webhooks`                                                     | Ndenye aha webhook ndị ihe omume na-akpalite na ndekọ ha                 |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Ndekọ nyocha maka arịrịọ ọ bụla (nhọrọ, nnukwu olu)                      |
| `domainState.ts`        | `domain_*` (tebụl 5)                                           | Mmefu domen, circuit breakers, mkpọchi, agbụ fallback, na akụkọ ọnụ ahịa |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API key enyere ikike maka MCP/A2A                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Ojiji oke e dekọrọ n'akụkọ ihe mere eme                                  |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Jikọta model na ndabara combo                                            |
| `cliToolState.ts`       | `cli_tool_state`                                               | Ọnọdụ na-adịgide adịgide akọwapụtara maka CLI                            |
| `encryption.ts`         | —                                                              | Ngwa enyemaka maka izo na ikpughe mpaghara                               |
| `readCache.ts`          | —                                                              | Cache dị na ebe nchekwa maka ọrụ ndị na-agụ data nke ukwuu               |
| `secrets.ts`            | `key_value` (ndekọ ezoro ezo)                                  | Nchekwa ihe nzuzo ezoro ezo                                              |
| `stateReset.ts`         | —                                                              | Hichapụ/weghachite ọnọdụ DB maka nnwale                                  |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Ọnọdụ session maka inyefe ọrụ agent                                      |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Nsuso ojiji                                                              |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Nhazi compression                                                        |

### Oke Modul

Otu iwu nhazi bụ isi: **modul anaghị enweta tebụl ibe ha ozugbo**. Iji rụọ ọrụ na data modul ọzọ, bubata ọrụ ahụ site na modul ahụ.

```ts
// ❌ EZIGHỊ EZI: SQL kpọmkwem sitere na modul ọzọ
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ZIRI EZI: jiri ọrụ modul providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

A na-amanye iwu a site na nyocha koodu — enweghị nyocha static, mana a na-akọ mmebi iwu.

---

## Skima Ndabere (tebụl 17)

`core.ts` na-akọwa tebụl ndabere 17 dị na `SCHEMA_SQL`. Mbugharị `001_initial_schema.sql` na-emepụta ha, ha na-abụkwa skima bụ isi.

### Tebụl Ndị Bụ Isi (emepụtara na mbugharị mbụ)

| Tebụl                      | Ebumnuche                                 | Kọlụm ndị dị mkpa                                                       |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Nzere njirimara ndị na-eweta (ezoro ezo)  | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Ozi ntụgharị ọnụ ndị na-eweta             | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Ebe nchekwa KV izugbe                     | `namespace`, `key`, `value`                                             |
| `combos`                   | Nkọwa ngwakọta ntụgharị                   | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Igodo API maka ọnụ ụzọ                    | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata nke nchekwa data                 | `key`, `value`                                                          |
| `usage_history`            | Ndekọ ojiji arịrịọ                        | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payload arịrịọ na nzaghachi               | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Ndekọ arịrịọ proxy                        | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Agbụ njikọ ụdịdị-na-onye-na-eweta         | `model`, `chain`                                                        |
| `domain_budgets`           | Mmefu ego maka ngalaba ọ bụla             | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Akụkọ nrụgharị mmefu ego                  | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Nsochi ọnụ ahịa maka ngalaba ọ bụla       | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Ọnọdụ oke-ọnụọgụ arịrịọ nke ngalaba       | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Ọnọdụ circuit breaker maka ngalaba ọ bụla | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache nzaghachi LLM                       | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Snapshot oke eji eme ihe n’oge gara aga   | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tebụl Ndị Ọzọ (ndị mbugharị mechara tinye)

Mbugharị ndị sochirinụ na-agbakwunye tebụl dịka:

- `cli_tool_state` (mbugharị 011) — ọnọdụ ngwa CLI
- Tebụl `mcp_*` — nyocha sava MCP
- Tebụl `a2a_*` — ọnọdụ ọrụ A2A
- Tebụl `usage_*` — nsochi ojiji
- Tebụl `plugin_*` — sistemụ plugin
- `skill_executions` — akụkọ mmezu nka
- Tebụl `memory_*` — sistemụ ebe nchekwa
- Tebụl `compression_*` — sistemụ mkpakọ
- Tebụl `webhook_*` — ndekọ nnyefe webhook
- Tebụl `acp_*` — Agent Client Protocol
- Tebụl `oneproxy_*` — ebe ahịa 1proxy
- `proxy_assignments` — njikọ oke proxy
- `detailed_call_artifacts` — metadata nke artifact ndekọ oku
- `quota_alert_history` — nyocha ọkwa oke eji eme ihe
- `command_code_auth_sessions` — nnọkọ OAuth nke Command Code

Ndepụta zuru ezu nke tebụl ihe dịka 30+ dị na `src/lib/db/migrations/`.

---

## Mbugharị

OmniRoute na-eji** versioned, idempotent migrations** na `src/lib/db/migrations/`. Mbugharị ọ bụla bụ otu faịlụ SQL. Ụdị aha abụọ na-ebikọ ọnụ; ụdị e dekọrọ na `_omniroute_migrations` bụ prefix ọnụọgụgụ.

### Mbugharị aha

| Usoro                                                     | Ọmụmaatụ                             | Eji maka                                                                                                                                     |
| --------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (kpọmkwem ọnụọgụ 3)                 | `241_seen_models.sql`                | Usoro ochie `001`-`241`. Oyiyi mgbe usoro timestamp rutere (`240` na `241` jikọtara ya tupu ya): ọ nweghị faịlụ ọhụrụ na-enweta nọmba usoro. |
| `YYYYMMDDHHMMSS_description.sql` (ọnụọgụ iri na anọ, UTC) | `20261113120000_add_usage_index.sql` | Mbugharị ọ bụla emepụtara site na 2026-11-13 na.                                                                                             |

Ihe kpatara mgbanwe a: na ọnụọgụ usoro, PRs yiri ya ahọrọla otu nọmba na-esote ma ihe niile ma otu ga-enwerịrị nọmba tupu ijikọta. Ihe stampụ UTC na-enye PR nke ọ bụla ụdị nke ya.

Iwu maka usoro stampụ oge (nke `npm run check:migration-numbering` manyere ya, nke a na-ekekọrịta ya na onye nrụpụta na `scripts/check/lib/migrationNaming.mjs`):

- Oge stampụ bụ ezigbo ụbọchị na oge UTC, ọ bụghị tupu `20261113000000` na ọ bụghị ihe karịrị nkeji iri n'ọdịnihu.
- Nkọwa bụ obere obere `snake_case` malite na mkpụrụedemede (`a-z`, `0-9`, otu `_` n'etiti okwu), na kacha 80 mkpụrụedemede.
- Faịlụ abụọ nwere otu akara oge bụ oyiri.
- Iwu enweghị oghere na-emetụta naanị usoro ochie: ọnụọgụ ọ bụla sitere na `001` ruo `241` ga-adị, ma ewezuga oghere ndị ama ama `026`, `055` na `121`. Ihichapụ `241` (ma ọ bụ faịlụ ochie ọ bụla) dara ọnụ ụzọ ámá. `001` na `241` enweghị ike ịgbakwunye na ndepụta ikike `KNOWN_GAPS`. Faịlụ akara oge anaghị emepụta oghere.
- Ntinye ọ bụla na `src/lib/db/migrations/` ga-abụrịrị faịlụ oge niile nwere aha `.sql` obere obere. Akwụkwọ ndekọ aha, symlink, faịlụ `.SQL` ma ọ bụ `.sql.bak`, faịlụ zoro ezo ma ọ bụ aha nwere oghere na-adaba n'ọnụ ụzọ ámá ahụ, n'ihi na onye na-agba ọsọ ga-amali ya na nzuzo ma ọ bụ daa na buut.

**Tinye iwu.** Onye na-agba ọsọ na-eji uru ọnụọgụ nke prefix, ọ bụghị site na ederede: faịlụ `001` ochie -`241` nke mbụ, mgbe ahụ faịlụ ndị nwere akara n'usoro timestamp, mgbe ahụ akwụkwọ ndekọ aha ọ bụla edebanyere aha na `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (ụdị dị ka `ee-001`). Mbugharị na-echere bụ faịlụ ọ bụla nke ụdị ya na-adịghị na `_omniroute_migrations`, ya mere mwegharị sitere na alaka ochie nke na-ejikọta mgbe nke ọhụrụ gasịrị ka na-emetụta na ọdụ data dị.

**Ihe akara oge bụ usoro okike, ọ bụghị usoro njikọta.** Ọ bụrụ na njem gị dabere na tebụl ma ọ bụ kọlụm nke mbugharị nwere a** nke ọhụrụ** timestamp (dịka ọmụmaatụ, otu sitere na PR ọzọ jikọtara na mbụ), nchekwa data ọhụrụ ga-ebu ụzọ mee nke gị wee daa. Mgbe PR gị ka na-emeghe, megharịa aha faịlụ na `npm run db:new-migration` ka ọ nweta akara ngosi ọhụrụ, ma ọ bụ mee ka ọ nọrọ onwe ya. `npm run test:migrations:fresh` na-etinye njem ọ bụla na nchekwa data efu wee jide nke a.

### Agaghị ehichapụ ma ọ bụ nyegharịa aha Mbugharị jikọrọ ọnụ

Ozugbo faịlụ mbugharị dị na ngalaba ntọhapụ ma ọ bụ `main`, ọ na-agba ọsọ na homolog na ọdụ data onye nrụpụta, na nrụnye VPS yana na mmekọrịta Enterprise. Site na mgbe ahụ gawa:

- **Adịla mgbe ihichapụ ya.** Nrụnye ọhụrụ ga-atụfu atụmatụ ya ebe nchekwa data emelitere na-edobe ya.
- **Agbanwela aha ya.** Ụdị dị na `_omniroute_migrations` agakwaghị adaba na faịlụ, yabụ nchekwa data ọ bụla etinyegoro ya ga-agbakwa ya ọzọ. SQL na-enweghị ike imezigharị data ma ọ bụ kwụsị buut.
- **Achọrọ atụmatụ dị iche?** Jiri `npm run db:new-migration` mepụta njem ọhụrụ.

Ịgbanwe aha dị mma naanị maka faịlụ na-ejikọtabeghị, nke bụ ihe nrịbama ọnụ ụzọ ámá na-ezo aka. Mkpado ntọhapụ adịghị agbanwe ihe ọ bụla ebe a: ntinye ọ bụla na ngalaba `release/v*` na-ebipụta foto Docker `:next` wee na-agba ọsọ na homolog, VPS installs na Enterprise sync, ya mere, ntugharị jikọtara na-agba ọsọ na ezigbo ọdụ data tupu mkpado `vX.Y.Z` ọ bụla adị. Ọnụ ụzọ ámá na-ada nkwụsị ọ bụla nke faịlụ ntọala, akara ma ọ bụ na ọ bụghị.

- **Na-atụgharị mbugharị ejikọtara ọnụ.** A `git revert` nke na-ehichapụ faịlụ na-ada n'ọnụ ụzọ ámá. Debe faịlụ ma megharịa atụmatụ ya na mbugharị ọhụrụ: `npm run db:new-migration -- <description>`, ya na `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` na ndị ọzọ. Ebe nchekwa data emelitere na nke ọhụrụ wee jiri otu atụmatụ kwụsị.
- **Nke anabatara nyegharị aha: ntinye ndakọrịta yana ọdịnaya yiri ya.** Ọ bụrụ na faịlụ merged ga-ebugharị (dịka ọmụmaatụ, faịlụ abụọ jikọtara ọnụ na-ekekọrịta stampụ oge ma onye na-agba ọsọ na-akwụsị na ndakọrịta ụdị), nyegharịa aha nke ọzọ na-emetụghị SQL ya ma tinye `{ fromVersion, fromName, toVersion, toName }` na `RENAMED_MIGRATION_COMPATIBILITY` na `src/lib/db/migrationRunner/constants.ts`. Ebe nchekwa data etinyere ụdị ochie ahụ na-emegharị ahịrị `_omniroute_migrations` ha kama ịmegharị faịlụ ahụ ọzọ. Ọnụ ụzọ ámá na-adọ aka ná ntị banyere ụdị aha a ma na-agba ọsọ nlele mgbe niile na ya, ihe ọ bụla ọhụrụ timestamp: ọhụrụ installs na-etinye faịlụ n'ọkwa ọhụrụ ya, nchekwa data kwalite adịghị, ya mere, họrọ a timestamp ọhụrụ nso nke ochie. Ọnụ ụzọ ámá na-adaba aha ma ọ bụrụ na ọdịnaya gbanwere (mgbanwe atụmatụ ka na-aga na njem ọhụrụ), ma ọ bụ ọ bụrụ na faịlụ ebumnobi nke ntinye adịghị na diski.
- **Ewegharịala aha n'ime otu timestamp.** Mgbanwe aha na-edobe stampụ oge ma gbanwee naanị nkọwa na-adaba ọnụ ụzọ ámá, yana ma ọ bụ na-enweghị ntinye. Site na ntinye nke `toVersion` nhata `fromVersion` ya, onye na-agba ọsọ na-ehichapụ ahịrị `_omniroute_migrations` ochie wee tinye faịlụ ahụ ọzọ na nchekwa data ọ bụla agbagoro ya. Na-enweghị ntinye, onye na-agba ọsọ na-egwu naanị ụdị: ọ na-awụpụ faịlụ ahụ na ọdụ data ndị ahụ (ọdịnaya ọhụrụ anaghị agba ọsọ ebe ahụ) wee dekọọ njehie renumbering na akpụkpọ ụkwụ ọ bụla. Jiri stampụ oge ọzọ gbakwunyere ntinye ndakọrịta, ma ọ bụ debe aha ahụ.
- **Ọnụ ụzọ ámá na-enyocha na faịlụ akpọgharịrị aha anaghị agba ọsọ ọzọ.** Maka aha ọ bụla ekpuchiri ekpuchi, ọnụ ụzọ ámá na-enyefe aha faịlụ ọhụrụ na nlele mbugharị na `--must-not-apply`. Ihe nlele ahụ na-ebulite nchekwa data kwalite ya na onye na-agba ọsọ n'ezie, ma ọ bụrụ na onye na-agba ọsọ na-etinye faịlụ ahụ ọzọ (dịka ọmụmaatụ, n'ihi na ntinye ahụ nwere nsụgharị ma ọ bụ aha na-ezighị ezi, ma ọ bụ n'ihi na ntinye ederede nke ọnụ ụzọ agụ `constants.ts` dị iche na TypeScript), ọnụ ụzọ ámá na-ada na `migration renomeada rodaria de novo` ma rịọ gị ka ịlele ntinye ochie na nsụgharị ọhụrụ na aha.

### Ihe Ọnụ Ụzọ Ámá Na-enyocha Megide Isi

Na arịrịọ ịdọrọ na njikọ kwụ n'ahịrị na-agba ọsọ, `npm run check:migration-numbering` na-atụnyere `src/lib/db/migrations/` na diski na otu akwụkwọ ndekọ aha na ngalaba ntọala. Ihe ndabere bụ, n'usoro a: `--base-latest-tag`, `--base <ref>`, mgbanwe `MIGRATION_BASE_REF`, ma ọ bụ, mgbe `GITHUB_EVENT_NAME` bụ `pull_request`, `pull_request_target` ma ọ bụ `merge_group`, nne na nna mbụ nke njikọta, `merge_group.base_sha` nke ihe omume ugwo, ma ọ bụ `git merge-base HEAD origin/$GITHUB_BASE_REF`. N'ime arịrịọ ịdọrọ ma ọ bụ njikọ kwụ n'ahịrị na-agba ọsọ na-enweghị ntọala enwere ike idozi ọnụ ụzọ ámá ahụ ada ada. N'èzí CI na-enweghị `--base` ọ na-ebipụta `comparação com a base: pulada (sem --base)` ma na-amafe iwu ndị a.

`--base-latest-tag` tụnyere mkpado ntọhapụ Kacha ọhụrụ (`vX.Y.Z` n'usoro semver; mkpado suffixed dị ka abalị anaghị agụta) nke dị na akụkọ ihe mere eme nke `HEAD`, nwere otu iwu dị ka `--base`. Ntọhapụ-Green (`scripts/quality/validate-release-green.mjs`) na-agba ọnụ ụzọ ahụ n'ụzọ dị otú a, n'ihi na ntinye na agba ọsọ na-agba ọsọ enweghị ntọala arịrịọ ịdọrọ na njikọ nwere ike ịdaba na-enweghị ọsọ CI ọhụrụ. Na-enweghị mkpado ntọhapụ na akụkọ ihe mere eme ọnụ ụzọ ahụ ada ada; na-agba `git fetch --tags` (na CI, `actions/checkout` na `fetch-depth: 0` na-eweta mkpado).

| Gbanwee na arịrịọ ịdọrọ                                                                                           | Nsonaazụ                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A na-akpọgharị faịlụ nke dị na ntọala, yana ntinye `RENAMED_MIGRATION_COMPATIBILITY`                              | **Ịdọ aka ná ntị** ma ọ bụrụ na ọdịnaya bụ otu, na commutation nlele na-agba ọsọ ọ bụla ọhụrụ timestamp; ọ na-ada ma ọ bụrụ na ọnọdụ ọhụrụ ahụ gbanwere atụmatụ ikpeazụ (megharịa aha ahụ, ma ọ bụ họrọ timestamp ọhụrụ ọzọ ebe ọ na-aga) ma ọ bụ ọ bụrụ na onye na-agba ọsọ ga-etinye faịlụ aha ọzọ na nchekwa data emelitere.** Ọ daa** ọ bụrụ na ọdịnaya gbanwere. |
| A na-akpọgharị faịlụ nke dị na ntọala na-edobe stampụ oge ya (naanị nkọwa na-agbanwe)                             | **Ọ daa** , na ma ọ bụ na-enweghị ntinye: onye na-agba ọsọ ga-etinye ya ọzọ (na ntinye) ma ọ bụ gbanye ya site na nsụgharị (na-enweghị otu). Jiri stampụ oge ọzọ gbakwunyere ntinye ndakọrịta, ma ọ bụ debe aha ahụ.                                                                                                                                                  |
| A na-ehichapụ faịlụ dị na ntọala, ma ọ bụ tinyegharịa aha na-enweghị ntinye                                       | **Ọ daa** , ma faịlụ ahụ ọ nọ na mkpado ntọhapụ ma ọ bụ na ọ nọghị. Iji megharịa ya, weghachite faịlụ na `git checkout <base> -- src/lib/db/migrations/<file>`; ka iweghachite atụmatụ ya, jiri `DROP ... IF EXISTS` tinye njem ọhụrụ.                                                                                                                                |
| Otu faịlụ dị na ntọala nwere ọdịnaya dị iche iche                                                                 | **Ịdọ aka ná ntị** (nkọwa `::warning` na GitHub Actions), na nlele mbugharị na-agba ọsọ. Ọ na-ada ma ọ bụrụ na ndezi gbanwere atụmatụ ikpeazụ, n'ihi na ọdụ data emelitere anaghị etinye faịlụ edeziri ọzọ: tinye mgbanwe ahụ na njem ọhụrụ. Ihe ndezi adịghị emerụ ahụ (okwu, `IF NOT EXISTS`) na-adọ aka ná ntị.                                                    |
| A na-agbakwunye faịlụ akara oge yana akara timestamp na-abụghị nke ọhụrụ karịa nke kacha ọhụrụ nke ntọala         | Na-eme nlele ntugharị, akọwara n'okpuru.                                                                                                                                                                                                                                                                                                                              |
| A na-agbakwunye faịlụ `NNN_` nke ochie yana nọmba dị n'okpuru faịlụ usoro ochie kachasị ọhụrụ nke ntọala ahụ      | **Ọ daa** , ọ bụrụgodị na a na-edezi `KNOWN_GAPS` n'otu arịrịọ ahụ ịdọrọ: usoro ochie a jụrụ oyi, mepụta njem na `npm run db:new-migration`. A na-anabata faịlụ ndị ochie nke dị n'elu nke kachasị ọhụrụ (arịrịọ `release/v*` ruo `main` ).                                                                                                                           |
| Faịlụ anaghị akwụ ụgwọ, dezie ma ọ bụ degharịrị aha nwere nkwupụta `INSERT`, `UPDATE`, `DELETE` ma ọ bụ `REPLACE` | **Ịdọ aka ná ntị** : nlele mbugharị anaghị atụnyere data, yabụ nyochaa ma usoro nchekwa data emelitere na nke ọhụrụ etinye ya na-agbanwe nsonaazụ ya.                                                                                                                                                                                                                 |

Otu ọsọ nke nlele mbugharị na-ekpuchi faịlụ ndị na-adịghị, ndị deziri na ndị degharịrị aha ha ọnụ.

Nlele ntugharị (`scripts/check/migration-commutation.ts`) na-ewulite ọdụ data abụọ nwa oge na ezigbo ụzọ wụnye: an** kwalitere** otu (bọọt na mbugharị isi, wee bugharịa ọzọ n'otu faịlụ ahụ yana mbugharị arịrịọ ndọta) na a** ọhụrụ** otu (otu buut nwere mbugharị arịrịọ ahụ). Ọ na-atụnyere atụmatụ ndị a ga-esi na ya pụta: tebụl na ogidi (na-eleghara usoro kọlụm), UNIQUE / PRIMARY KEY na FOREIGN KEY mgbochi, ederede `CREATE TABLE` nke tebụl ọ bụla (nke na-ekpuchi ihe mgbochi CHECK, nchịkọta, ogidi ndị emepụtara na nhọrọ tebụl), indexes, akpali na echiche. A naghị atụnyere data ahịrị. Ọ bụrụ na ha dakọtara, ọnụ ụzọ ámá na-ebipụta na faịlụ anọghị n'usoro mana ọ na-aga, wee gafee. Ọ bụrụ na ha dị iche, ọnụ ụzọ ámá ahụ na-adaba na ọdịiche dị iche iche na ihe ngosi maka ikpe ahụ: maka faịlụ na-adịghị na ya, megharịa aha ya na `npm run db:new-migration`, nke dị mma n'ihi na faịlụ ahụ ejikọtaghị ya; maka faịlụ isi edeziri, weghachite ọdịnaya nke isi ma tinye mgbanwe na njem ọhụrụ; maka faịlụ akpọgharịrị aha, megharịa aha ma ọ bụ họrọ akara ngosi timestamp ọhụrụ ọzọ ebe ọ na-aga, agaghị enwe otu timestamp nwere aha ọzọ. Ọ bụrụ na ego n'onwe ya enweghị ike ịgba ọsọ, ọnụ ụzọ ámá na-ada na CI na-adọ aka ná ntị na mpaghara. Maka faịlụ ntọala edezigharịrị, a na-eji ọdịnaya ntọala nke faịlụ ahụ wulite nchekwa data ahụ, na buut nke abụọ na-amafe ya n'ihi na edekọlarị ụdị ya. Maka faịlụ akpọgharịrị aha, a na-eji faịlụ ahụ wulite nchekwa data n'okpuru aha ochie ya, na akpụkpọ ụkwụ nke abụọ na-ebugharị ahịrị `_omniroute_migrations` ya site na ntinye ndakọrịta kama ịmegharị ya ọzọ; ọnụ ụzọ ámá na-agafe aha ọhụrụ na `--must-not-apply`, ya mere nlele ahụ ada ada ma ọ bụrụ na buut nke abụọ na-etinye ya. Ọ bụrụ na mwepu arịrịọ adọtaghị itinye n'ọrụ n'ụzọ kwalitere, ya bụ, mgbe ọ bụla isi mbugharị (ma ọ ga-adakwa na ntinye ọhụrụ), ọnụ ụzọ ámá na-akọ `migration do PR não aplica` ma rịọ gị ka ị dozie SQL megide atụmatụ nke isi ugbu a; Ọ bụrụ na faịlụ ahụ dabere na mbugharị arịrịọ ndọta ọzọ nwere akara timestamp ọzọ, megharịa aha ya na `npm run db:new-migration`.

Iji mee otu ntụnyere ahụ na mpaghara, gafere ntọala ahụ nke ọma, dịka ọmụmaatụ `npm run check:migration-numbering -- --base origin/<base-branch>`, ma ọ bụ `npm run check:migration-numbering -- --base-latest-tag` iji tụnyere ntọhapụ ọhụrụ.

### Na-atụgharị Mbugharị PR's `NNN` mepere emepe

Arịrịọ ịdọrọ meghere tupu mgba ọkụ ahụ ka nwere ike iburu faịlụ usoro dịka `242_add_widgets.sql`. Ajụrụ nọmba ochie n'elu `241`, yabụ tụgharịa ya tupu ijikọ:

1. **Nyegharịa faịlụ ahụ na generator, na-edobe nkọwa ahụ.** Gbaa `npm run db:new-migration -- <same description>` ka ị nweta aha ọhụrụ, bugharịa SQL n'ime ya, ma hichapụ faịlụ `NNN_` ochie. Nkọwa ga-adịrịrị otu: ntinye ndakọrịta n'okpuru dakọtara na ya.
2. **Tinye ntinye ndakọrịta ma ọ bụrụ na nchekwa data na-adịgide adịgide nwere nọmba ochie.** Ọ bụrụ na nchekwa data ọ bụla echekwara (homolog, a VPS, onye ntinye aka n'onwe ya) ji faịlụ `NNN_` jiri wuo PR, tinye `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` na `RENAMED_MIGRATION_COMPATIBILITY` na `src/lib/db/migrationRunner/constants.ts`. Nke a bụ** achọrọ maka `237` ka `241`** : oghere ndị ahụ ugbu a na-ejide canonical `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` na `241_seen_models.sql`, na na-enweghị ntinye data dị otú ahụ na-amafe njem njem canonical ruo mgbe ebighị ebi ma na-agbagharị onye gbanwere ọzọ. Ọ na-arụkwa ọrụ maka oghere nke na-anọ efu, dị ka `242`, mgbe ebe a na-aga bụ akara oge. Mgbe obi abụọ adịghị ya, tinye ntinye. Ebe ị na-agbakwunye ya na nhazi ahụ adịghị mkpa: mgbe oghere ntinye ntinye ka na-ejide ahịrị na ntinye ọzọ na-apụ (dịka ọmụmaatụ `237` na-ejide ahịrị PR mgbe ahịrị `usage_history_calculated_cost` nke okenye na-echere ịkwaga n'ime `237`), onye na-agba ọsọ na-ahapụ ntinye ahụ chere ruo mgbe oghere ahụ nweere onwe ya. Naanị ezigbo esemokwu, dị ka oghere ejiri n'ahịrị enweghị mmegharị, ma ọ bụ ntinye abụọ na-agbanwe oghere, na-akwụsị buut na `Cannot reconcile ...`.
3. **Debe SQL idem ike** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), n'ihi na mgbanwe mgbanwe nwere ike izute nchekwa data ebe atụmatụ ya dịlarị.
4. **Bugharịa ikpe pụrụ iche nwere igodo ụdị.** Ọ bụrụ na PR gbakwunyere ikpe maka nọmba ochie ya na `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) ma ọ bụ na `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), gbanwee igodo na akara ngosi oge ọhụrụ.

`tests/unit/db/codex-fence-migration-rename.test.ts` bụ ihe atụ na-arụ ọrụ nke ule maka mbugharị akpọgharịrị aha.

### Ndaghachi na alaka tupu mgbanwe

Ya adịla mgbe cherry-kpọọ ma ọ bụ bughachi faịlụ `YYYYMMDDHHMMSS_` n'alaka na-ebu ụzọ gbanwee (dịka ọmụmaatụ alaka `release/v*` ochie). Onye na-agba ọsọ ebe ahụ na-ahazi aha faịlụ dị ka ederede, yabụ faịlụ nwere akara oge ga-aga n'etiti `201_` na `202_` na nchekwa data ọhụrụ, ọnụ ụzọ ochie ebe ahụ aghọtaghị prefixes ọnụọgụ iri na anọ. Na ngalaba dị otú ahụ, dee mgbanwe dịka faịlụ `NNN_` nke alaka ahụ na-esote, idempotent, ya mere ọ bụ enweghị-op mgbe ụdị timestamped rutere ma emechaa.

### Ka Mbugharị na-agba ọsọ

Na mmalite, `migrationRunner.ts`:

1. Na-emepụta tebụl `_omniroute_migrations` ma ọ bụrụ na ọ dịghị
2. Ajuju maka mbugharị etinyegoro
3. Na-etinye mbugharị ọhụrụ ọ bụla n'usoro, nke ọ bụla na azụmahịa
4. Na-edekọ mkpagharị ọ bụla etinyere n'ọrụ yana timestamp

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

### Enweghị ike

Mbugharị ga-abụ** ike** — na-agba ha ugboro abụọ kwesịrị ịbụ enweghị-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Jiri nkeji okwu `IF NOT EXISTS`, `IF EXISTS`, na `OR IGNORE` / `OR REPLACE` mee ihe.

### Na-agbakwụnye Mbugharị Ọhụrụ

1. **Mepụta faịlụ na generator** : `npm run db:new-migration -- <description>` (dịka ọmụmaatụ `npm run db:new-migration -- add combo priority`). Ọ na-eji oge UTC dị ugbu a na isi okwu na-ede `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql`, na-aga n'ihu otu nkeji ma ọ bụrụ na ewere akara oge ahụ, ọ dịghịkwa edegharị faịlụ. Ejila aka ghota nọmba.
2. **Jiri nchekwa DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Mejupụta data nke ọma** : jiri `UPDATE ... WHERE ...` jikwaa ahịrị ndị dị adị
4. **Lelee usoro na ịkpọ aha** : `npm run test:migrations:fresh` (mbugharị niile na nchekwa data efu) na `npm run check:migration-numbering`
5. **Nwalee na otu** : ọ dịghị mgbe ọ bụla na-agba ọsọ na-anwaleghị migrations na mmepụta

Ọmụmaatụ:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Mgbanwe na-adaghachi azụ-anaghị ekwekọ** (dịka ọmụmaatụ, idobe kọlụm) dị aghụghọ. OmniRoute na-akwado NOT wedata — ozugbo etinyere mbugharị, mgbanwe atụmatụ ahụ na-adịgide adịgide. Mee atụmatụ ya.

---

## Izobe Ozi Mgbe Echekwara Ya

A na-ezobe mpaghara nwere ozi nzuzo (igodo API, token OAuth, eriri njikọ) mgbe echekwara ha site na iji **AES-256-GCM**.

### Otu O Si Arụ Ọrụ

```ts
// src/lib/db/encryption.ts (nke e mere ka ọ dị mfe)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Ebe A Na-eji Ya

- `provider_connections.api_key` — ezobere ya n’ogo ngwa
- `provider_connections.access_token`, `refresh_token`, `id_token` — ezobere ha n’ogo ngwa
- Ndenye `key_value` nwere `namespace = "secrets"` — ezobere ha n’ogo ngwa
- `proxy_registry.auth` — ezobere ya n’ogo ngwa (ma ọ bụrụ na ọ dị)

### Igodo Nzobe Ozi

A na-emepụta igodo nzobe ozi site na **passphrase** (nke edobere site na env var `STORAGE_ENCRYPTION_KEY`) na **salt** (nke echekwara na DB). Ha abụọ dị mkpa iji kpughee data ahụ.

```bash
# Mepụta passphrase siri ike
openssl rand -hex 32

# Tọọ ya na .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Ihe dị oke mkpa**: Itufu igodo nzobe ozi pụtara na ị gaghịzi enweta data niile ezobere. **Chekwaa oyiri igodo ahụ iche na nchekwa data**.

### Ihe Ndị A Na-adịghị Ezobe

Maka ịrụ ọrụ ngwa ngwa, a na-echekwa ihe ndị a dị ka ederede nkịtị:

- Aha ngosi ndị na-eweta ọrụ
- Nkọwa model (ha adịlarị n’ihu ọha)
- Iwu nhazi ụzọ
- Ndekọ ojiji (enweghị PII)

---

## Ihe Ị Kwesịrị Ịma Banyere Izo Ozi (v3.8.16+)

OmniRoute na-eji **`migrateLegacyEncryptedString()`** ejikwa usoro izo ozi abụọ n'ụzọ na-enweghị onye ọrụ ịhụ mgbanwe:

- **Nke ochie** (tupu v3.5.0): “izo ozi” dabere na XOR (ọ bụghị ezigbo kriptografi)
- **Nke ugbu a**: AES-256-GCM nwere IV kwesịrị ekwesị na mkpado nkwado izi ezi

Ngwa enyemaka mbugharị ahụ na-achọpụta usoro ochie ahụ ma jiri usoro ọhụrụ zochie data ahụ ọzọ mgbe mbụ a gụrụ ya. Nke a pụtara na ị nwere ike imelite ọdụ data ochie n’efughị ozi nzere.

---

## Ebe Nchekwa Ọgụgụ

Maka data a na-agụ ugboro ugboro (ụdị, ndị na-eweta ọrụ, ntọala), `readCache.ts` na-enye **ebe nchekwa dị n'ime memori**:

```ts
// A na-echekwa ya mgbe usoro malitere, a na-akagbu ya mgbe e dere ihe
const providers = await getCachedProviders(); // Ọsọ, dị n'ime memori
const fresh = await listProviders(); // Nwayọ, na-agakwuru DB
```

| Ihe e debere na cache  | Igodo cache    | TTL                 |
| ---------------------- | -------------- | ------------------- |
| `models`               | `models:v1`    | Ruo mgbe e dere ihe |
| `provider_connections` | `providers:v1` | Ruo mgbe e dere ihe |
| `settings`             | `settings:v1`  | Ruo mgbe e dere ihe |
| `combos`               | `combos:v1`    | Ruo mgbe e dere ihe |

A na-akagbu cache mgbe ọ bụla e dere ihe na tebụl kwekọrọ na ya.

---

## Ndabere na Mweghachi

### Iji Aka Mepụta Ndabere

```bash
# Jiri CLI mepụta ndabere mpaghara
omniroute backup create --name pre-migration

# Ma ọ bụ site na API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Faịlụ ndabere ahụ gụnyere:

- Tebụl DB niile (a haziri ha ka ha bụrụ JSON)
- Ihe ndekọ oku (e tinyere koodu base64, ma ọ bụrụ na achọrọ)
- Ntọala + ihe nzuzo (e zoro ezo)
- Nhazi plugin

### Mweghachi

```bash
# Site na CLI
omniroute restore pre-migration

# Site na API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Ịdọ aka ná ntị**: Mweghachi na-edegharị DB niile. Buru ụzọ kwụsị ndị ahịa niile.

### Ndabere Akpaaka

```bash
# Jiri CLI mee ka ndabere kwa ụbọchị na-arụ ọrụ na-akpaghị aka
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Ọrụ ndabere na sava na-eme nhazi oge a; ọrụ ahụ na-arụ ọrụ kwa sekọnd 30
(nke ndabara) ma na-enyocha okwu cron ahụ megide oge mpaghara sava.

| Mgbanwe                                     | Nke ndabara | Nkọwa                                                                                                                               |
| ------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`     | Etiti oge ọrụ na ms (opekata mpe `5000`). Ọ ga-adị mkpụmkpụ karịa 60 s iji daba n’ime nkeji cron kwekọrọ n’ụzọ a pụrụ ịtụkwasị obi. |

### Ndabere SQLite Mgbe Ọ Na-arụ Ọrụ

Maka ime ndabere DB na-arụ ọrụ n’akwụsịghị ọrụ ya:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Nke a na-eji API ndabere SQLite nke ịntanetị — ọ dị nchebe ịrụ ya mgbe OmniRoute na-arụ ọrụ.

---

## Ntugharị arụmọrụ

### WAL Mode

agbanyere WAL na ndabara. Maka ibu ọrụ ederede dị elu, tụlee:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute anaghị edobe `journal_size_limit`. Ebe nleba anya na-ebuga okpokolo agba WAL n'ime faịlụ bụ isi, mana faịlụ WAL na-edobe nha ya kacha ukwuu. Onye nche `OMNIROUTE_WAL_GUARD_MAX_MB` na-adọ aka na ntị na-agba `wal_checkpoint(RESTART)`; ọ bụghị okpu nke nha disk.

### Index

Ndekọ mkpịsị ugodi maka arụmọrụ (nke mbugharị mebere na akpaghị aka):

- `idx_models_provider` — ihe nleba anya ihe nlere anya site n'aka onye na-eweta ya
- `idx_combo_targets_combo_id` — ngwakọta ebumnuche mgbasa
- `idx_usage_history_api_key_timestamp` — ojiji nyocha
- `idx_quota_snapshots_api_key_window` — nsochi oke
- `idx_call_logs_timestamp` — ajụjụ ndekọ oku

Ka ịgbakwunye ndeksi ọhụrụ, mepụta mbugharị:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Ebe nchekwa-Mapped I/O

Maka nnukwu ọdụ data (> 10GB), enwere ike ịhazi maapụ ebe nchekwa site na SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Mgbakọ

Ihe atụ OmniRoute na-eme ogologo oge na-erite uru site na `VACUUM` mgbe ụfọdụ:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Na-agba ọsọ kwa ọnwa n'oge windo ndị nwere obere okporo ụzọ. (ụdị WAL na-ebelata mkpa ahụ, mana ọ naghị ewepụ ya.)

---

## Nnyocha Ahụike

`src/lib/db/healthCheck.ts` na-enye **nyocha nsogbu ahụike n’ogo DB**:

Verb abụọ ahụ chọrọ authentication (`401` ma ọ bụghị ya). `GET` na-enyocha naanị; `POST` na-eme otu
nnyocha ahụ ebe agbanyere `autoRepair`.

```bash
GET  /api/db/health   # nyochaa nsogbu
POST /api/db/health   # nyochaa nsogbu + rụzie
```

Nzaghachi ahụ bụ `DbHealthCheckResult` nke `runDbHealthCheck()` mepụtara
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Mmefu ego domain rụtụrụ aka na API key ndị na-adịkwaghị.",
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

| Field             | Ihe ọ pụtara                                                                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Ọ bụ `true` mgbe `issues` tọgbọ chakoo. `driver` anaghị emetụta ya ma ọlị.                                                                                 |
| `issues[].type`   | Otu n’ime `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                 |
| `repairedCount`   | Ahịrị ndị e rụziri n’oge run a; ọ na-abụ `0` mgbe `autoRepair` bụ false.                                                                                   |
| `backupCreated`   | Ma e mere backup tupu nrụzi.                                                                                                                               |
| `checkedAt`       | Timestamp ISO nke run ahụ na repair note ọ bụla o dere jikọrọ ọnụ.                                                                                         |
| `driver.name`     | Driver SQLite na-enye database a nyochara ọrụ.                                                                                                             |
| `driver.degraded` | Ọ bụ `true` mgbe database file anaghị akwado ndebanye n’ụzọ na-adịgide adịgide — fallback WASM `sql.js` (nchekwa faịlụ dum) ma ọ bụ database dị na memory. |

Ngwaọrụ MCP `omniroute_db_health_check` na-eweghachikwa otu payload ahụ.

Gbaa `PRAGMA integrity_check` iji chọpụta mmebi:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# O kwesịrị ibipụta: ok
```

Ọ bụrụ na ọ weghachite ihe ọ bụla na-abụghị `ok`, **kwụsị iji database ahụ ozugbo** ma weghachite ya site na backup.

---

## Mweghachi Mgbe Ọdachi Mere

### Ọnọdụ 1: Faịlụ WAL Furu Efu

Faịlụ `-wal` adịghị, mana `-shm` na DB bụ isi ka dị mma:

```bash
# Ọ ga-eweghachi onwe ya ozugbo e meghere ya ọzọ
omniroute
```

Ọ bụrụ na SQLite enweghị ike iweghachi onwe ya na-akpaghị aka:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Ọnọdụ 2: Faịlụ DB Bụ Isi Mebiri Emebi

Weghachite ya site na nkwado ndabere:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` na-ebudata naanị ebe nchekwa `.tar.gz` zuru ezu site na sava na-arụ ọrụ
(`GET /api/db-backups/exportAll`, a chọrọ nzere onye njikwa); ọ naghị eweghachi ihe ọ bụla.

### Ọnọdụ 3: Igodo Izo Ezo Furu Efu

**Enweghị ike iweghachi ya** ma ọ bụrụ na igodo ahụ adịghị. Enweghị ike ịgụ oghere ndị ezoro ezo. Jiri aka tinye ndị na-eweta ọrụ niile ọzọ site na iji nzere ọhụrụ.

> **Mbelata Ihe Ize Ndụ**: Na-edobe nkwado ndabere nke igodo izo ezo iche mgbe niile, ọ kachasị mma n'ime njikwa okwuntughe ma ọ bụ KMS.

### Ọnọdụ 4: Diski Jupụtara

SQLite ga-eweghachi njehie `SQLITE_FULL`. Hapụ ohere na diski, wee mee nke a:

```bash
# Mee checkpoint WAL iji hapụ ohere
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Ọrụ Ndị A Na-Ejikarị Eme Ihe

### Nyochaa Tebụl

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Gụọ Ahịrị Ndị Dị na Tebụl Niile

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Tọgharịa (Hichapụ) Data Niile

```bash
# Buru ụzọ kwụsị OmniRoute
omniroute stop

# Hichapụ faịlụ DB
rm ~/.omniroute/storage.sqlite*

# Malitegharịa (ọ ga-emepụta DB efu ọzọ)
omniroute
```

Maka nrụgharị **ahọpụtara** (dowe ndị na-eweta ọrụ, hichapụ ojiji):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Bupụ Otu Tebụl

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Nchọpụta na Ndozi Nsogbu

### "Akpọchiela nchekwa data"

Usoro ọzọ jidere mkpọchi ide ihe. Mee otu n'ime ndị a:

- Chere ka usoro nke ọzọ rụchaa (lelee `lsof | grep storage.sqlite`)
- Kwụsị usoro nke ọzọ
- Ọ bụrụ na ọ na-adịgide, malitegharịa OmniRoute

### "Mmachi igodo mba ọzọ dara"

Modul ngalaba na-emebi iguzosi ike n'ezi ihe nke njikọ. Lelee:

- Ahịrị ndị na-enweghị njikọ n'ime tebụl ndị dabere na ha
- Nhichapụ na-agbaso ibe ha nke na-agbasaghị
- Mbugharị e mere n'oge na-adịbeghị anya nke gbanwere igodo mba ọzọ

Mee `PRAGMA foreign_key_check;` iji chọta mmebi ndị ahụ.

### "Nchekwa ebe nchekwa agwụla"

I/O SQLite e kenyere na ebe nchekwa agafela oke OS. Belata ya site na pragma SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB kama 256MB
```

Ma ọ bụ gbanyụọ ya:

```sql
PRAGMA mmap_size = 0;
```

### "Mbugharị dara mgbe ọ ruru ọkara"

Mbugharị ahụ gara n'ime azụmahịa, ya mere o kwesịrị ịlaghachi n'ọnọdụ mbụ. Ọ bụrụ na ọ laghachighị:

1. **Kwụsị OmniRoute** (gbochie mbọ ndị ọzọ)
2. **Lelee ọnọdụ DB** site na iji `sqlite3`
3. **Jiri aka dozie** mbugharị ahụ na-ezughị ezu
4. **Malitegharịa** OmniRoute (a ga-anwa mbugharị ahụ ọzọ)

Iji gbochie nke a, buru ụzọ nwalee mbugharị mgbe niile na otu oyiri.

---

## Hụkwa

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tebụl ojiji
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — nlekota ọnọdụ ọrụ
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — usoro mwepụta
- Ebe mmalite: `src/lib/db/` (faịlụ 80+, ihe dịka ahịrị koodu 25K)
