# Database Schema & Operations Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: Ginagamit ng OmniRoute ang **SQLite na may WAL journaling** bilang pangunahing imbakan nito, na may **AES-256-GCM** encryption at rest para sa mga sensitibong field. Tinatalakay ng gabay na ito ang schema, mga migration, backup/recovery, at mga operational runbook.

**Mga Source:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 batayang table)
- `src/lib/db/migrationRunner.ts` — mga migration na may bersyon
- `src/lib/db/migrations/` — 167 SQL file na may bersyon
- `src/lib/db/encryption.ts` — mga helper sa encryption
- `src/lib/db/backup.ts` — pag-export/pag-import ng backup
- `src/lib/db/healthCheck.ts` — mga diagnostic sa kalagayan

---

## Bakit SQLite?

Pinili ng OmniRoute ang SQLite sa halip na PostgreSQL/MySQL dahil sa ilang dahilan:

| Salik           | SQLite                                       | PostgreSQL                                           |
| --------------- | -------------------------------------------- | ---------------------------------------------------- |
| **Deployment**  | Naka-embed — walang hiwalay na server        | Nangangailangan ng pag-set up ng server              |
| **Encryption**  | Application-layer (AES-256-GCM)              | Built-in na TDE                                      |
| **Performance** | Mas mabilis para sa maliit/katamtamang load  | Mas mahusay para sa napakaraming sabayang pagsusulat |
| **Concurrency** | Pinapayagan ng WAL mode ang sabayang pagbasa | Buong MVCC                                           |
| **Backup**      | Pagkopya ng iisang file                      | `pg_dump` o filesystem snapshot                      |
| **Use case**    | Per-user na pag-install, naka-embed          | Multi-tenant na SaaS                                 |

Para sa mga **single-user, single-instance** na deployment (ang pangunahing use case ng OmniRoute), mas simple at mas mabilis ang SQLite.

### WAL Journaling

Binubuksan ng `core.ts` ang database gamit ang **WAL (Write-Ahead Logging) mode**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

Pinapayagan ng WAL ang **sabayang pagbasa** habang nagsusulat — mahalaga ito para sa dashboard, na nagsasagawa ng mga query habang itinatala ang mga request.

Ang default na laki ng cache ay **65,536 KiB (64 MiB)**. Binibigyang-kahulugan ng SQLite ang negatibong
`cache_size` bilang tinatayang pinakamataas na limitasyon sa KiB at naglalaan ng mga page kapag kinakailangan.
Tumatanggap ang **Settings > System & Storage > Cache Size** ng mga integer value mula **1 hanggang
1,000,000 KiB**; kapag sine-save ang setting, inilalapat ito sa aktibong koneksyon sa database,
at ibinabalik ng OmniRoute ang naka-save na value sa startup.

---

## Lokasyon ng Database

Nakaimbak ang SQLite file sa:

| OS      | Path                                                                           |
| ------- | ------------------------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                                  |
| macOS   | `~/.omniroute/storage.sqlite`                                                  |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                                      |
| Docker  | `/app/data/storage.sqlite` (maaaring i-configure sa pamamagitan ng `DATA_DIR`) |

Mga kasamang file:

- `storage.sqlite-wal` — write-ahead log
- `storage.sqlite-shm` — shared memory file
- `call_logs/` — mga artifact ng request payload (kung naka-enable)

**Palitan ang lokasyon:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arkitektura ng Domain Module

Ang database ng OmniRoute ay may **110 top-level na TypeScript module** sa `src/lib/db/`. Ang bawat domain module ay:

- Namamahala sa isa o higit pang partikular na table
- Nag-e-export ng mga typed CRUD function
- Hindi kailanman direktang ginagamit ang mga table ng ibang module
- Gumagamit ng `getDbInstance()` mula sa `core.ts` upang ma-access ang DB

### Ang 110 Top-Level na DB Module

Ang OmniRoute ay may **110 top-level na TypeScript file** sa `src/lib/db/`. Nasa ibaba ang isang halimbawa ng mga pangunahing module; tingnan ang directory listing para sa kumpletong listahan:

| Module                  | Mga Table                                                      | Responsibilidad                                                              |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Pagpaparehistro at mga credential ng provider gamit ang OAuth/API key        |
| `models.ts`             | `key_value` (data ng model)                                    | Mga depinisyon, kakayahan, at pagpepresyo ng model                           |
| `combos.ts`             | `combos`                                                       | Mga config at pagkakasunod-sunod ng combo routing                            |
| `apiKeys.ts`            | `api_keys`                                                     | Lifecycle, mga scope, at pagsubaybay sa quota ng API key                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configuration ng system at shared KV store                                   |
| `backup.ts`             | —                                                              | Mga operasyon sa pag-export/pag-import ng backup                             |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Mga config ng proxy at routing rule                                          |
| `prompts.ts`            | `prompt_templates`                                             | Mga reusable na prompt template at versioning                                |
| `webhooks.ts`           | `webhooks`                                                     | Mga event-driven na webhook subscription at log                              |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Audit logging kada request (opsyonal, mataas ang volume)                     |
| `domainState.ts`        | `domain_*` (5 table)                                           | Mga domain budget, circuit breaker, lockout, fallback chain, at cost history |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Mga naka-whitelist na API key para sa MCP/A2A                                |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Makasaysayang paggamit ng quota                                              |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Pagmamapa ng mga model sa mga default ng combo                               |
| `cliToolState.ts`       | `cli_tool_state`                                               | Persistent state na partikular sa CLI                                        |
| `encryption.ts`         | —                                                              | Mga helper para sa pag-encrypt/pag-decrypt ng mga field                      |
| `readCache.ts`          | —                                                              | In-memory cache para sa mga operasyong madalas magbasa                       |
| `secrets.ts`            | `key_value` (mga naka-encrypt na entry)                        | Naka-encrypt na imbakan ng secret                                            |
| `stateReset.ts`         | —                                                              | Pagbura/pag-reset ng DB state para sa testing                                |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Session context para sa agent handoff                                        |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Pagsubaybay sa paggamit                                                      |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configuration ng compression                                                 |

### Mga Hangganan ng Module

Isang pangunahing tuntunin sa arkitektura: **hindi direktang ina-access ng mga module ang mga table ng isa't isa**. Upang magamit ang data ng ibang module, i-import ang function mula sa module na iyon.

```ts
// ❌ MALI: direktang SQL mula sa ibang module
db.prepare("SELECT * FROM provider_connections").all();

// ✅ TAMA: gamitin ang function ng providers module
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Ipinapatupad ang tuntuning ito sa pamamagitan ng code review — walang static check, ngunit minamarkahan ang mga paglabag.

---

## Batayang Schema (17 talahanayan)

Tinutukoy ng `core.ts` ang 17 batayang talahanayan sa `SCHEMA_SQL`. Ginagawa ang mga ito ng migration na `001_initial_schema.sql` at bumubuo sa pangunahing schema.

### Mga Pangunahing Talahanayan (ginawa sa paunang migration)

| Talahanayan                | Layunin                                   | Mga pangunahing column                                                  |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Mga kredensyal ng provider (naka-encrypt) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Impormasyon sa pagruruta ng provider node | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Pangkalahatang KV store                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Mga depinisyon ng routing combo           | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Mga API key para sa gateway               | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata ng database                      | `key`, `value`                                                          |
| `usage_history`            | Mga talaan ng paggamit ng request         | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Mga payload at tugon ng request           | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Mga log ng proxy request                  | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Mga chain ng modelo patungo sa provider   | `model`, `chain`                                                        |
| `domain_budgets`           | Mga badyet sa paggastos kada domain       | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Kasaysayan ng pag-reset ng badyet         | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Pagsubaybay sa gastos kada domain         | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Kalagayan ng rate limit ng domain         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Kalagayan ng circuit breaker kada domain  | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache ng tugon ng LLM                     | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Mga makasaysayang snapshot ng quota       | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Mga Karagdagang Talahanayan (idinagdag ng mga sumunod na migration)

Nagdaragdag ang mga sumunod na migration ng mga talahanayang gaya ng:

- `cli_tool_state` (migration 011) — kalagayan ng CLI tool
- Mga talahanayang `mcp_*` — pag-audit ng MCP server
- Mga talahanayang `a2a_*` — kalagayan ng A2A task
- Mga talahanayang `usage_*` — pagsubaybay sa paggamit
- Mga talahanayang `plugin_*` — sistema ng plugin
- `skill_executions` — kasaysayan ng pagpapatupad ng skill
- Mga talahanayang `memory_*` — sistema ng memory
- Mga talahanayang `compression_*` — sistema ng compression
- Mga talahanayang `webhook_*` — log ng paghahatid ng webhook
- Mga talahanayang `acp_*` — Agent Client Protocol
- Mga talahanayang `oneproxy_*` — marketplace ng 1proxy
- `proxy_assignments` — mga binding ng saklaw ng proxy
- `detailed_call_artifacts` — metadata ng mga artifact ng call log
- `quota_alert_history` — pag-audit ng alerto sa quota
- `command_code_auth_sessions` — mga OAuth session ng Command Code

Ang buong listahan ng humigit-kumulang 30+ talahanayan ay nasa `src/lib/db/migrations/`.

---

## Migrasyon

ginagamit OmniRoute** bersyon, idempotent migration** sa `src/lib/db/migrations/`. Ang bawat paglipat ay isang solong SQL file. Dalawang format ng pagpapangalan ang magkakasamang umiiral; ang bersyon na naitala sa `_omniroute_migrations` ay ang numeric prefix.

### Pagpapangalan ng Migration

| Format                                              | Halimbawa                            | Ginagamit para sa                                                                                                                                                            |
| --------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (eksaktong 3 digit)           | `241_seen_models.sql`                | Ang lumang serye `001`–`241`. Na-freeze nang lumapag ang format ng timestamp (`240` at `241` ay pinagsama bago ito): walang bagong file ang nakakakuha ng sequential number. |
| `YYYYMMDDHHMMSS_description.sql` (14 na digit, UTC) | `20261113120000_add_usage_index.sql` | Bawat paglilipat na ginawa mula 2026-11-13 sa.                                                                                                                               |

Bakit ang pagbabago: na may mga sunud-sunod na numero, ang parallel PRs ay pumili ng parehong susunod na numero at lahat maliban sa isa ay kailangang muling magnumero bago pagsamahin. Ang isang UTC timestamp ay nagbibigay sa bawat PR ng sarili nitong bersyon.

Mga panuntunan para sa format ng timestamp (ipinatupad ng `npm run check:migration-numbering`, ibinahagi sa generator sa `scripts/check/lib/migrationNaming.mjs`):

- Ang timestamp ay isang tunay na petsa at oras UTC, hindi mas maaga kaysa sa `20261113000000` at hindi hihigit sa 10 minuto sa hinaharap.
- Ang paglalarawan ay maliliit na `snake_case` na nagsisimula sa isang titik (`a-z`, `0-9`, solong `_` sa pagitan ng mga salita), hindi hihigit sa 80 character.
- Dalawang file na may parehong timestamp ay isang duplicate.
- Nalalapat lang ang panuntunang walang gap sa lumang serye: dapat umiral ang bawat numero mula `001` hanggang `241`, maliban sa mga kilalang gaps `026`, `055` at `121`. Ang pagtanggal ng `241` (o anumang lumang file) ay nabigo sa gate. `001` at `241` ay hindi kailanman maidaragdag sa `KNOWN_GAPS` allowlist. Ang mga timestamped na file ay hindi kailanman gumagawa ng gap.
- Ang bawat entry sa `src/lib/db/migrations/` ay dapat na isang regular na file na may wastong lowercase `.sql` na pangalan. Ang isang direktoryo, isang symlink, isang `.SQL` o `.sql.bak` file, isang nakatagong file o isang pangalan na may puwang ay nabigo sa gate, dahil ang runner ay lalaktawan ito nang tahimik o mag-crash sa boot.

**Mag-apply ng order.** Ang runner ay nag-uuri ayon sa numeric na halaga ng prefix, hindi sa pamamagitan ng text: ang lumang `001`–`241` file muna, pagkatapos ay ang timestamped file sa timestamp order, pagkatapos ay anumang namespaced na mga direktoryo na nakarehistro sa `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (mga bersyon tulad ng `ee-001`). Ang nakabinbing paglipat ay anumang file na ang bersyon ay wala sa `_omniroute_migrations`, kaya ang paglipat mula sa isang mas lumang sangay na nagsasama pagkatapos ng mas bago ay nalalapat pa rin sa mga kasalukuyang database.

**Ang timestamp ay pagkakasunud-sunod ng paggawa, hindi pagkakasunud-sunod ng pagsasanib.** Kung ang iyong paglipat ay nakasalalay sa isang talahanayan o column na ginawa ng isang paglipat na may a** mas bago** timestamp (halimbawa, isa mula sa isa pang PR na unang pinagsama), isang bagong database ang unang tatakbo sa iyo at mabibigo. Habang bukas pa ang iyong PR, muling buuin ang pangalan ng file gamit ang `npm run db:new-migration` para makakuha ito ng mas bagong timestamp, o gawin itong independyente. Inilalapat `npm run test:migrations:fresh` ang bawat paglipat sa isang walang laman na database at nahuhuli ito.

### Ang Pinagsamang Migration ay Hindi Tinatanggal o Pinalitan ng Pangalan

Kapag ang isang migration file ay nasa isang release branch o `main`, ito ay tumatakbo na sa homolog at developer database, sa VPS install at sa Enterprise sync. Mula noon:

- **Huwag kailanman tanggalin ito.** Mawawala ang schema ng mga bagong pag-install habang pinapanatili ito ng mga na-upgrade na database.
- **Huwag kailanman palitan ang pangalan nito.** Ang bersyon sa `_omniroute_migrations` ay hindi na tutugma sa isang file, kaya bawat database na nakalapat na nito ay tatakbo muli nito. Hindi-idempotent SQL pagkatapos ay duplicate ang data o ihihinto ang boot.
- **Kailangan ng ibang schema?** Gumawa ng bagong paglipat gamit ang `npm run db:new-migration`.

Ang pagpapalit ng pangalan ay ligtas lamang para sa isang file na hindi pa pinagsama, na kung saan ay tinutukoy ng mga pahiwatig ng gate. Walang binago ang isang release tag dito: ang bawat push sa isang `release/v*` branch ay nagpa-publish ng Docker `:next` na imahe at tumatakbo sa homolog, VPS na pag-install at ang Enterprise sync, kaya ang isang pinagsamang migration ay tumakbo sa mga totoong database bago magkaroon ng anumang `vX.Y.Z` tag. Ang gate ay nabigo sa bawat pag-alis ng isang base file, na-tag o hindi.

- **Pagbabalik ng pinagsamang paglipat.** Ang isang `git revert` na nagtatanggal ng file ay nabigo sa gate. Panatilihin ang file at i-undo ang schema nito sa isang bagong paglipat: `npm run db:new-migration -- <description>`, na may `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` at iba pa. Ang mga na-upgrade at bagong database ay nagtatapos sa parehong schema.
- **Ang tinanggap na palitan ang pangalan: isang compatibility entry at magkaparehong content.** Kung ang isang pinagsamang file ay dapat ilipat (halimbawa, dalawang pinagsamang file ay nagbabahagi ng timestamp at ang runner ay huminto sa isang bersyon ng banggaan), palitan ang pangalan ng isa nang hindi hinahawakan SQL nito at idagdag `{ fromVersion, fromName, toVersion, toName }` sa `RENAMED_MIGRATION_COMPATIBILITY` sa `src/lib/db/migrationRunner/constants.ts`. Naililipat ng mga database na naglapat ng lumang bersyon ang kanilang `_omniroute_migrations` row sa halip na patakbuhin muli ang file. Nagbabala ang gate tungkol sa naturang pagpapalit ng pangalan at palaging nagpapatakbo ng commutation check dito, anuman ang bagong timestamp: inilalapat ng mga bagong pag-install ang file sa bagong posisyon nito, hindi ginagawa ng mga na-upgrade na database, kaya pumili ng bagong timestamp malapit sa luma. Ang gate ay nabigo sa pagpapalit ng pangalan kung ang nilalaman ay nagbago (isang pagbabago ng schema ay napupunta pa rin sa isang bagong paglipat), o kung ang target na file ng entry ay wala sa disk.
- **Huwag kailanman palitan ang pangalan sa loob ng parehong timestamp.** Ang pagpapalit ng pangalan na nagpapanatili sa timestamp at nagpapalit lamang ng paglalarawan ay hindi pumapasok sa gate, mayroon man o walang entry. Sa isang entry na ang `toVersion` ay katumbas ng `fromVersion` nito, tatanggalin ng runner ang lumang row `_omniroute_migrations` at ilalapat muli ang file sa bawat database na nagpatakbo na nito. Kung walang entry, sinusubaybayan lang ng runner ang bersyon: nilalaktawan nito ang file sa mga database na iyon (hindi kailanman tatakbo ang bagong content doon) at nag-log ng error sa muling pagnumber sa bawat boot. Gumamit ng isa pang timestamp kasama ang isang compatibility entry, o panatilihin ang pangalan.
- **Sinusuri ng gate na ang pinalitan ng pangalan na file ay hindi tatakbo muli.** Para sa bawat sakop na pagpapalit ng pangalan, ipinapasa ng gate ang bagong pangalan ng file sa commutation check gamit ang `--must-not-apply`. Bino-boot ng check ang na-upgrade na database gamit ang tunay na runner, at kung ilalapat muli ng runner ang file na iyon (halimbawa, dahil ang entry ay may maling bersyon o pangalan, o dahil ang text parser ng gate ay nagbabasa `constants.ts` na iba sa TypeScript), ang gate ay nabigo sa `migration renomeada rodaria de novo` at hinihiling sa iyong suriin ang luma at bagong mga bersyon at pangalan ng entry.

### Ano ang Sinusuri ng Gate Laban sa Base

Sa pull request at merge-queue runs, ikinukumpara ng `npm run check:migration-numbering` `src/lib/db/migrations/` sa disk na may parehong direktoryo sa base branch. Ang base ay, sa ganitong pagkakasunud-sunod: `--base-latest-tag`, `--base <ref>`, ang `MIGRATION_BASE_REF` variable, o, kapag `GITHUB_EVENT_NAME` ay `pull_request`, `pull_request_target` o `merge_group`, ang unang magulang ng merge commit, ang `merge_group.base_sha` ng event payload, o `git merge-base HEAD origin/$GITHUB_BASE_REF`. Sa isang pull request o merge-queue run na walang resolvable base nabigo ang gate. Sa labas CI nang walang `--base` nagpi-print ito `comparação com a base: pulada (sem --base)` at nilalaktawan ang mga panuntunang ito.

`--base-latest-tag` ay nagkukumpara sa pinakabagong release tag (`vX.Y.Z` sa semver order; suffixed tags gaya ng nightlies ay hindi binibilang) na nasa kasaysayan ng `HEAD`, na may parehong mga panuntunan tulad ng `--base`. Ang Release-Green (`scripts/quality/validate-release-green.mjs`) ay nagpapatakbo ng gate sa ganitong paraan, dahil ang push at mga naka-iskedyul na pagtakbo ay walang pull request base at ang isang merge ay maaaring dumaong nang walang bagong CI run. Nang walang release tag sa kasaysayan, nabigo ang gate; patakbuhin `git fetch --tags` (sa CI, `actions/checkout` na may `fetch-depth: 0` ay nagdadala ng mga tag).

| Baguhin ang kahilingan sa paghila                                                                                                        | Resulta                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ang isang file na umiiral sa base ay pinalitan ng pangalan, na may `RENAMED_MIGRATION_COMPATIBILITY` entry                               | **Babala** kung ang nilalaman ay magkapareho, at ang commutation check ay tumatakbo anuman ang bagong timestamp; mabibigo ito kung babaguhin ng bagong posisyon ang panghuling schema (i-undo ang pagpapalit ng pangalan, o pumili ng isa pang bagong timestamp kung saan ito magko-commute) o kung ilalapat muli ng runner ang pinalitan ng pangalan na file sa isang na-upgrade na database.** Nabigo** kung nagbago ang nilalaman. |
| Ang isang file na umiiral sa base ay pinalitan ng pangalan nang pinapanatili ang timestamp nito (ang paglalarawan lang ang nagbabago)    | **Nabigo** , may entry o walang entry: ilalapat ito muli ng runner (kasama ang entry) o laktawan ito ayon sa bersyon (walang isa). Gumamit ng isa pang timestamp kasama ang isang compatibility entry, o panatilihin ang pangalan.                                                                                                                                                                                                    |
| Ang isang file na umiiral sa base ay tinanggal, o pinapalitan ang pangalan nang walang entry                                             | **Nabigo** , nasa release tag man o wala ang file. Upang i-undo ito, ibalik ang file gamit ang `git checkout <base> -- src/lib/db/migrations/<file>`; upang ibalik ang schema nito, magdagdag ng bagong paglipat gamit ang `DROP ... IF EXISTS`.                                                                                                                                                                                      |
| Ang isang file na umiiral sa base ay may iba't ibang nilalaman                                                                           | **Babala** (isang `::warning` annotation sa GitHub Actions), at tumatakbo ang commutation check. Mabibigo ito kung babaguhin ng pag-edit ang panghuling schema, dahil ang mga na-upgrade na database ay hindi muling inilalapat ang na-edit na file: ilagay ang pagbabago sa isang bagong paglipat. Ang isang hindi nakakapinsalang pag-edit (isang komento, `IF NOT EXISTS`) ay nagbabala lamang.                                    |
| Ang isang timestamp na file ay idinagdag na may timestamp na hindi mas bago kaysa sa pinakabago ng base                                  | Pinapatakbo ang commutation check, na inilarawan sa ibaba.                                                                                                                                                                                                                                                                                                                                                                            |
| Ang isang lumang-format `NNN_` file ay idinagdag na may isang numero sa ibaba ng pinakabagong lumang-format na file ng base              | **Nabigo** , kahit na na-edit ang `KNOWN_GAPS` sa parehong kahilingan sa paghila: ang lumang serye ay nagyelo, gawin ang paglipat gamit ang `npm run db:new-migration`. Ang mga lumang format na file sa itaas ng pinakabago ng base (isang `release/v*` hanggang `main` pull request) ay tinatanggap.                                                                                                                                |
| Ang isang out-of-order, na-edit o pinalitan ng pangalan na file ay naglalaman ng mga pahayag na `INSERT`, `UPDATE`, `DELETE` o `REPLACE` | **Babala** : ang commutation check ay hindi naghahambing ng data, kaya suriin kung ang pagkakasunud-sunod kung saan inilapat ang mga na-upgrade at bagong database ay nagbabago sa resulta.                                                                                                                                                                                                                                           |

Sinasaklaw ng isang run ng commutation check ang out-of-order, ang na-edit at ang pinalitan ng pangalan na mga file nang magkasama.

Ang commutation check (`scripts/check/migration-commutation.ts`) ay bumubuo ng dalawang pansamantalang database na may totoong landas sa pag-install: an** na-upgrade** isa (mag-boot gamit ang mga base migration, pagkatapos ay mag-boot muli sa parehong file na may mga pull request ng paglilipat) at isang** sariwa** isa (isang boot na may mga paglipat ng pull request). Inihahambing nito ang mga nagresultang schema: mga talahanayan at column (hindi pinapansin ang pagkakasunud-sunod ng column), UNIQUE / PRIMARY KEY at FOREIGN KEY na mga hadlang, ang normalized na `CREATE TABLE` na teksto ng bawat talahanayan (na sumasaklaw sa mga hadlang CHECK, collation, nabuong mga column at mga opsyon sa talahanayan), mga index, trigger at view. Hindi inihambing ang data ng row. Kung magkatugma ang mga ito, ipi-print ng gate na wala sa ayos ang file ngunit nagko-commute, at pumasa. Kung magkaiba ang mga ito, nabigo ang gate na may pagkakaiba at isang pahiwatig para sa kaso: para sa isang out-of-order na file, muling buuin ang pangalan nito gamit ang `npm run db:new-migration`, na ligtas dahil hindi pa naka-merge ang file; para sa isang na-edit na base file, ibalik ang batayang nilalaman at ilagay ang pagbabago sa isang bagong paglipat; para sa isang pinalitan ng pangalan na file, i-undo ang pagpapalit ng pangalan o pumili ng isa pang bagong timestamp kung saan ito nagko-commute, hindi kailanman ang parehong timestamp na may ibang pangalan. Kung ang tseke mismo ay hindi maaaring tumakbo, ang gate ay nabigo sa CI at nagbabala lamang sa lokal. Para sa isang na-edit na base file, ang na-upgrade na database ay binuo gamit ang nilalaman ng base ng file na iyon, at nilalaktawan ito ng pangalawang boot dahil naitala na ang bersyon nito. Para sa pinalitan ng pangalan na file, ang na-upgrade na database ay binuo gamit ang file sa ilalim ng lumang pangalan nito, at ang pangalawang boot ay naglilipat ng `_omniroute_migrations` row nito sa compatibility entry sa halip na patakbuhin itong muli; ipinapasa ng gate ang bagong pangalan na may `--must-not-apply`, kaya nabigo ang tseke kung ilalapat ito ng pangalawang boot. Kung ang isang pull request migration ay hindi mailapat sa na-upgrade na landas, iyon ay, pagkatapos ng bawat base migration (mabigo man ito o hindi sa isang bagong pag-install), ang gate ay nag-uulat `migration do PR não aplica` at humihiling sa iyo na ayusin ang SQL laban sa kasalukuyang schema ng base; kung ang file ay nakasalalay sa isa pang pull request migration na may mas huling timestamp, muling buuin ang pangalan nito gamit ang `npm run db:new-migration`.

Upang patakbuhin ang parehong paghahambing nang lokal, tahasang ipasa ang base, halimbawa `npm run check:migration-numbering -- --base origin/<base-branch>`, o `npm run check:migration-numbering -- --base-latest-tag` upang ihambing sa pinakabagong release.

### Pag-convert ng isang Open PR's `NNN` Migration

Ang isang pull request na binuksan bago ang switch ay maaari pa ring magdala ng sequential file gaya ng `242_add_widgets.sql`. Ang mga lumang numero sa itaas ng `241` ay tinanggihan, kaya i-convert ito bago pagsamahin:

1. **Palitan ang pangalan ng file gamit ang generator, pinapanatili ang paglalarawan.** Patakbuhin ang `npm run db:new-migration -- <same description>` upang makuha ang bagong pangalan, ilipat ang SQL dito, at tanggalin ang lumang `NNN_` file. Ang paglalarawan ay dapat manatiling magkapareho: ang compatibility entry sa ibaba ay tumutugma dito.
2. **Magdagdag ng compatibility entry kung ang isang persistent database ay nagpatakbo ng lumang numero.** Kung ang anumang database na pinapanatili (homolog, isang VPS, sariling pag-install ng isang contributor) ay nagpatakbo ng isang build ng PR gamit ang `NNN_` file, idagdag `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` sa `RENAMED_MIGRATION_COMPATIBILITY` sa `src/lib/db/migrationRunner/constants.ts`. Ito ay** kinakailangan para sa `237` hanggang `241`** : hawak na ngayon ng mga puwang na iyon ang canonical `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` at `241_seen_models.sql`, at kung wala ang entry ay nilalaktawan ng naturang database ang canonical migration magpakailanman at pinapatakbo muli ang na-convert. Gumagana rin ito para sa isang slot na nananatiling walang laman, gaya ng `242`, kapag ang destinasyon ay isang timestamp. Kapag may pagdududa, idagdag ang entry. Kung saan mo ito idaragdag sa array ay hindi mahalaga: kapag may hawak pa ring row ang target na slot ng entry na inilalayo ng isa pang entry (halimbawa `237` na may hawak na PR row habang naghihintay ang isang mas lumang `usage_history_calculated_cost` row na lumipat sa `237`), hinahayaan ng runner ang entry na iyon na maghintay hanggang sa libre ang slot. Tanging isang tunay na salungatan, tulad ng isang slot na hawak ng isang row na walang entry na gumagalaw, o dalawang entry na nagpapalitan ng mga slot, ang humihinto sa boot gamit ang `Cannot reconcile ...`.
3. **Panatilihin ang SQL idempotent** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), dahil maaaring matugunan ng na-convert na paglipat ang isang database kung saan umiiral na ang schema nito.
4. **Ilipat ang mga espesyal na case na naka-key sa bersyon.** Kung nagdagdag ang PR ng case para sa lumang numero nito sa `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) o sa `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), baguhin ang key sa bagong timestamp.

`tests/unit/db/codex-fence-migration-rename.test.ts` ay isang gumaganang halimbawa ng isang pagsubok para sa isang muling pinangalanang paglipat.

### Mga Backport sa Mga Sangay Bago ang Paglipat

Huwag kailanman mag-cherry-pick o mag-backport ng `YYYYMMDDHHMMSS_` file sa isang branch na nauna sa switch (halimbawa, isang mas lumang `release/v*` branch). Ang runner doon ay nag-uuri ng mga pangalan ng file bilang teksto, kaya ang isang timestamped na file ay tatakbo sa pagitan ng `201_` at `202_` sa isang bagong database, at ang lumang gate doon ay hindi nakakaintindi ng 14-digit na prefix. Sa naturang sangay, isulat ang pagbabago bilang sariling susunod na `NNN_` file ng sangay na iyon, idempotent, kaya ito ay isang no-op kapag dumating ang timestamped na bersyon sa ibang pagkakataon.

### Paano Tumatakbo ang Migrations

Sa pagsisimula, `migrationRunner.ts`:

1. Lumilikha ng `_omniroute_migrations` table kung wala
2. Mga query para sa na-apply na migration
3. Inilalapat ang anumang mga bagong paglipat sa pagkakasunud-sunod, bawat isa sa isang transaksyon
4. Itinatala ang bawat inilapat na paglipat gamit ang timestamp

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

### Idepotency

Ang mga migrasyon ay dapat** idempotent** — na nagpapatakbo sa kanila ng dalawang beses ay dapat na isang no-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Gumamit `IF NOT EXISTS`, `IF EXISTS`, at `OR IGNORE` / `OR REPLACE` clause nang malaya.

### Pagdaragdag ng Bagong Migration

1. **Lumikha ng file gamit ang generator** : `npm run db:new-migration -- <description>` (halimbawa `npm run db:new-migration -- add combo priority`). Nagsusulat ito ng `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` kasama ang kasalukuyang oras UTC at isang header ng komento, sumusulong ng isang segundo kung kinuha ang timestamp na iyon, at hindi kailanman na-overwrite ang isang file. Huwag pumili ng numero sa pamamagitan ng kamay.
2. **Gumamit ng ligtas DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Maingat na i-backfill ang data** : gumamit `UPDATE ... WHERE ...` para pangasiwaan ang mga umiiral nang row
4. **Suriin ang pagkakasunud-sunod at pagpapangalan** : `npm run test:migrations:fresh` (lahat ng paglilipat sa isang walang laman na database) at `npm run check:migration-numbering`
5. **Subukan sa isang kopya** : hindi kailanman magpatakbo ng mga hindi pa nasusubukang paglilipat sa produksyon
6. **Ang isang talahanayan na ginawa mula sa code ay nangangailangan din ng paglipat** : kung ang isang module ay lumilikha din ng talahanayan nang tamad (`CREATE TABLE IF NOT EXISTS`, pinananatili bilang isang self-heal path), dapat itong gawin ng isang migration na may parehong DDL. Kung hindi, ang isang malinis na pag-install at isang na-upgrade na pag-install ay magtatapos sa iba't ibang mga schema, depende sa kung tumakbo ang path ng code na iyon. Ini-scan ng `tests/unit/db/lazy-table-migration-guard.test.ts` `src/` at `open-sse/` at nabigo sa isang tamad `CREATE` nang walang paglipat (#20557). Halimbawa: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Halimbawa:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Paatras-hindi tugmang mga pagbabago** (hal., pag-drop ng mga column) ay nakakalito. Sinusuportahan ba NOT OmniRoute ang pag-downgrade — kapag nailapat ang paglipat, permanente ang pagbabago ng schema. Magplano nang naaayon.

---

## Encryption ng Nakaimbak na Data

Ang mga sensitibong field (mga API key, OAuth token, at connection string) ay ine-encrypt habang nakaimbak gamit ang **AES-256-GCM**.

### Paano Ito Gumagana

```ts
// src/lib/db/encryption.ts (pinasimple)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Saan Ito Ginagamit

- `provider_connections.api_key` — ine-encrypt sa antas ng application
- `provider_connections.access_token`, `refresh_token`, `id_token` — ine-encrypt sa antas ng application
- Mga entry ng `key_value` na may `namespace = "secrets"` — ine-encrypt sa antas ng application
- `proxy_registry.auth` — ine-encrypt sa antas ng application (kung mayroon)

### Encryption Key

Ang encryption key ay kinukuha mula sa isang **passphrase** (itinakda sa pamamagitan ng `STORAGE_ENCRYPTION_KEY` env var) at isang **salt** (nakaimbak sa DB). Kinakailangan ang dalawang ito upang ma-decrypt ang data.

```bash
# Bumuo ng ligtas na passphrase
openssl rand -hex 32

# Itakda sa .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritikal**: Kapag nawala ang encryption key, mawawala rin ang access sa lahat ng naka-encrypt na data. **I-back up ang key nang hiwalay sa database**.

### Ano ang HINDI Naka-encrypt

Para sa performance, ang mga sumusunod ay iniimbak bilang plaintext:

- Mga display name ng provider
- Mga depinisyon ng model (pampubliko na)
- Mga routing rule
- Mga tala ng paggamit (walang PII)

---

## Mga Paalala sa Encryption (v3.8.16+)

Ginagamit ng OmniRoute ang **`migrateLegacyEncryptedString()`** upang malinaw na pangasiwaan ang dalawang encryption scheme:

- **Legacy** (bago ang v3.5.0): "encryption" na nakabatay sa XOR (hindi tunay na cryptography)
- **Kasalukuyan**: AES-256-GCM na may wastong IV at authentication tag

Tinutukoy ng migration helper ang legacy na format at muli itong ine-encrypt gamit ang bagong scheme sa unang pagbasa. Nangangahulugan itong maaari kang mag-upgrade ng lumang database nang hindi nawawala ang mga kredensyal.

---

## Cache sa Pagbasa

Para sa data na madalas basahin (mga model, provider, at setting), nagbibigay ang `readCache.ts` ng **in-memory cache**:

```ts
// Naka-cache sa pagsisimula, pinapawalang-bisa kapag nagsusulat
const providers = await getCachedProviders(); // Mabilis, nasa memory
const fresh = await listProviders(); // Mabagal, kumokonekta sa DB
```

| Naka-cache na entity   | Cache key      | TTL                  |
| ---------------------- | -------------- | -------------------- |
| `models`               | `models:v1`    | Hanggang sa pagsulat |
| `provider_connections` | `providers:v1` | Hanggang sa pagsulat |
| `settings`             | `settings:v1`  | Hanggang sa pagsulat |
| `combos`               | `combos:v1`    | Hanggang sa pagsulat |

Pinapawalang-bisa ang cache sa bawat pagsulat sa kaukulang table.

---

## Pag-backup at Pag-recover

### Manu-manong Backup

```bash
# Gamitin ang CLI upang gumawa ng lokal na backup
omniroute backup create --name pre-migration

# O sa pamamagitan ng API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Kabilang sa backup file ang:

- Lahat ng DB table (na-serialize sa JSON)
- Mga artifact ng call log (naka-base64 encode, opsyonal)
- Mga setting + lihim (naka-encrypt)
- Configuration ng plugin

### Pag-restore

```bash
# Sa pamamagitan ng CLI
omniroute restore pre-migration

# Sa pamamagitan ng API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Babala**: Io-overwrite ng pag-restore ang buong DB. Ihinto muna ang lahat ng client.

### Mga Awtomatikong Backup

```bash
# Paganahin ang mga awtomatikong pang-araw-araw na backup sa pamamagitan ng CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Isinasagawa ang iskedyul sa panig ng server ng isang background job na tumatakbo kada 30 segundo
(default) at sinusuri ang cron expression batay sa lokal na oras ng server.

| Variable                                    | Default | Paglalarawan                                                                                                                 |
| ------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | Interval ng pagtakbo sa ms (min `5000`). Dapat mas maikli sa 60 s upang mapagkakatiwalaang tumapat sa katugmang cron minute. |

### Hot Backup ng SQLite

Para sa backup ng aktibong DB nang walang downtime:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Ginagamit nito ang online backup API ng SQLite — ligtas itong patakbuhin habang tumatakbo ang OmniRoute.

---

## Pag-tune ng Pagganap

### WAL Mode

WAL ay pinagana bilang default. Para sa mga high-write workload, isaalang-alang ang:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

hindi itinatakda OmniRoute `journal_size_limit`. Ang isang checkpoint ay naglilipat ng mga WAL frame sa pangunahing file, ngunit pinapanatili ng WAL file ang pinakamalaking inilaan na laki nito. Ang `OMNIROUTE_WAL_GUARD_MAX_MB` guard ay nagbabala lamang at nagpapatakbo `wal_checkpoint(RESTART)`; hindi ito isang takip sa laki ng disk.

### Mga index

Mga pangunahing index para sa pagganap (awtomatikong ginawa ng mga paglilipat):

- `idx_models_provider` — model lookup ng provider
- `idx_combo_targets_combo_id` — combo na pagpapalawak ng target
- pagsusuri ng paggamit `idx_usage_history_api_key_timestamp` —
- `idx_quota_snapshots_api_key_window` — pagsubaybay sa quota
- `idx_call_logs_timestamp` — na mga query sa log ng tawag

Para magdagdag ng bagong index, gumawa ng migration:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memory-Mapped I/O

Para sa napakalaking database (> 10GB), ang memory mapping ay maaaring isaayos sa pamamagitan ng SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compaction

Nakikinabang ang mga matagal nang OmniRoute instance mula sa paminsan-minsang `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Patakbuhin buwan-buwan sa mga window na mababa ang trapiko. ( Binabawasan WAL mode ang pangangailangan, ngunit hindi ito inaalis.)

---

## Pagsusuri sa Kalusugan

Nagbibigay ang `src/lib/db/healthCheck.ts` ng **mga diagnostic sa kalusugan sa antas ng DB**:

Nangangailangan ng authentication ang parehong verb (`401` kung wala). Diagnosis lamang ang ginagawa ng `GET`; pinapatakbo ng `POST` ang
parehong pagsusuri nang naka-enable ang `autoRepair`.

```bash
GET  /api/db/health   # mag-diagnose
POST /api/db/health   # mag-diagnose + magkumpuni
```

Ang response ay ang `DbHealthCheckResult` na ginawa ng `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Tumukoy ang mga badyet ng domain sa mga API key na hindi na umiiral.",
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

| Field             | Kahulugan                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `true` kapag walang laman ang `issues`. Hindi ito kailanman naiimpluwensiyahan ng `driver`.                                                                        |
| `issues[].type`   | Isa sa `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                            |
| `repairedCount`   | Mga row na kinumpuni sa pagpapatakbong ito; palaging `0` kapag false ang `autoRepair`.                                                                             |
| `backupCreated`   | Kung gumawa ng backup bago magkumpuni.                                                                                                                             |
| `checkedAt`       | ISO timestamp na magkaparehong ginagamit ng pagpapatakbo at ng anumang repair note na isinusulat nito.                                                             |
| `driver.name`     | SQLite driver na nagsisilbi sa sinuring database.                                                                                                                  |
| `driver.degraded` | `true` kapag ang mga pagsusulat ay walang durable na suporta ng database file — ang `sql.js` WASM fallback (whole-file persistence) o isang in-memory na database. |

Ang parehong payload ay ibinabalik ng `omniroute_db_health_check` MCP tool.

Patakbuhin ang `PRAGMA integrity_check` upang matukoy ang corruption:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Dapat i-print: ok
```

Kung magbalik ito ng anuman maliban sa `ok`, **itigil kaagad ang paggamit sa database** at mag-restore mula sa backup.

---

## Pagbawi Mula sa Sakuna

### Sitwasyon 1: Nawalang WAL File

Nawawala ang `-wal` file ngunit buo pa ang `-shm` at pangunahing DB:

```bash
# Awtomatikong bumabawi sa susunod na pagbukas
omniroute
```

Kung hindi awtomatikong makabawi ang SQLite:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Sitwasyon 2: Sirang Pangunahing DB File

Ibalik mula sa backup:

```bash
omniroute backup restore <backup-id>
```

Ang `omniroute sync pull [outPath]` ay nagda-download lamang ng buong `.tar.gz` archive mula sa isang tumatakbong server
(`GET /api/db-backups/exportAll`, kinakailangan ang kredensyal ng operator); wala itong nire-restore.

### Sitwasyon 3: Nawalang Encryption Key

**Walang posibleng pagbawi** kung wala ang key. Hindi mababasa ang mga naka-encrypt na field. Muling idagdag nang manu-mano ang lahat ng provider gamit ang mga bagong kredensyal.

> **Pag-iwas**: Palaging i-back up nang hiwalay ang encryption key, pinakamainam sa isang password manager o KMS.

### Sitwasyon 4: Puno ang Disk

Magbabalik ang SQLite ng mga error na `SQLITE_FULL`. Magbakante ng espasyo sa disk, pagkatapos ay:

```bash
# I-checkpoint ang WAL upang magbakante ng espasyo
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Mga Karaniwang Operasyon

### Suriin ang Isang Table

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Bilangin ang mga Row sa Lahat ng Table

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### I-reset (Burahin) ang Lahat ng Data

```bash
# Ihinto muna ang OmniRoute
omniroute stop

# Burahin ang DB file
rm ~/.omniroute/storage.sqlite*

# I-restart (muling gagawa ng walang-lamang DB)
omniroute
```

Para sa **piling** pag-reset (panatilihin ang mga provider, burahin ang usage):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### I-export ang Isang Table

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Pag-troubleshoot

### "Naka-lock ang database"

May ibang process na may hawak ng write lock. Gawin ang alinman sa mga sumusunod:

- Hintaying matapos ang ibang process (suriin ang `lsof | grep storage.sqlite`)
- Patayin ang ibang process
- Kung nagpapatuloy ang problema, i-restart ang OmniRoute

### "Nabigo ang foreign key constraint"

May domain module na lumalabag sa referential integrity. Suriin ang:

- Mga orphaned row sa mga dependent table
- Mga cascading delete na hindi naipasa
- Kamakailang migration na nagbago ng foreign key

Patakbuhin ang `PRAGMA foreign_key_check;` upang mahanap ang mga paglabag.

### "Ubos na ang memory"

Lumalagpas sa limitasyon ng OS ang memory-mapped I/O ng SQLite. Bawasan ito sa pamamagitan ng SQLite pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB sa halip na 256MB
```

O i-disable ito:

```sql
PRAGMA mmap_size = 0;
```

### "Nabigo ang migration sa kalagitnaan"

Tumakbo ang migration sa loob ng isang transaction, kaya dapat ay nag-roll back ito. Kung hindi:

1. **Ihinto ang OmniRoute** (pigilan ang mga susunod pang pagtatangka)
2. **Suriin ang kalagayan ng DB** gamit ang `sqlite3`
3. **Manu-manong ayusin** ang bahagyang nakumpletong migration
4. **Muling patakbuhin** ang OmniRoute (muling susubukan ang migration)

Upang maiwasan ito, palaging subukan muna ang mga migration sa isang kopya.

---

## Tingnan Din

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — mga usage table
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — pagsubaybay sa kalagayan
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — daloy ng release
- Source: `src/lib/db/` (80+ file, ~25K LOC)
