---
title: "Database Schema & Operations Guide"
version: 3.8.50
lastUpdated: 2026-08-23
---

# Database Schema & Operations Guide

> **TL;DR**: OmniRoute uses **SQLite with WAL journaling** as its primary store, with **AES-256-GCM** encryption at rest for sensitive fields. This guide covers the schema, migrations, backup/recovery, and operational runbooks.

**Sources:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 base tables)
- `src/lib/db/migrationRunner.ts` — versioned migrations
- `src/lib/db/migrations/` — 167 versioned SQL files
- `src/lib/db/encryption.ts` — encryption helpers
- `src/lib/db/backup.ts` — backup export/import
- `src/lib/db/healthCheck.ts` — health diagnostics

---

## Why SQLite?

OmniRoute chose SQLite over PostgreSQL/MySQL for several reasons:

| Factor          | SQLite                            | PostgreSQL                        |
| --------------- | --------------------------------- | --------------------------------- |
| **Deployment**  | Embedded — no separate server     | Requires server setup             |
| **Encryption**  | Application-layer (AES-256-GCM)   | Built-in TDE                      |
| **Performance** | Faster for small/medium workloads | Better for huge concurrent writes |
| **Concurrency** | WAL mode allows concurrent reads  | Full MVCC                         |
| **Backup**      | Single-file copy                  | `pg_dump` or filesystem snapshot  |
| **Use case**    | Per-user install, embedded        | Multi-tenant SaaS                 |

For **single-user, single-instance** deployments (the primary OmniRoute use case), SQLite is simpler and faster.

### WAL Journaling

`core.ts` opens the database with **WAL (Write-Ahead Logging) mode**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL allows **concurrent reads** during writes — important for the dashboard, which queries while requests are being recorded.

The default cache size is **65,536 KiB (64 MiB)**. SQLite interprets a negative
`cache_size` as an approximate upper bound in KiB and allocates pages on demand.
**Settings > System & Storage > Cache Size** accepts integer values from **1 to
1,000,000 KiB**; saving the setting applies it to the live database connection,
and OmniRoute restores the persisted value at startup.

---

## Database Location

The SQLite file is stored at:

| OS      | Path                                                     |
| ------- | -------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                            |
| macOS   | `~/.omniroute/storage.sqlite`                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker  | `/app/data/storage.sqlite` (configurable via `DATA_DIR`) |

Companion files:

- `storage.sqlite-wal` — write-ahead log
- `storage.sqlite-shm` — shared memory file
- `call_logs/` — request payload artifacts (if enabled)

**Override the location:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domain Module Architecture

OmniRoute's database has **110 top-level TypeScript modules** in `src/lib/db/`. Each domain module:

- Owns one or more specific tables
- Exports typed CRUD functions
- Never touches another module's tables
- Uses `getDbInstance()` from `core.ts` to access the DB

### The 110 Top-Level DB Modules

OmniRoute has **110 top-level TypeScript files** in `src/lib/db/`. Below is a sampling of core modules; see the directory listing for the complete list:

| Module                  | Tables                                                         | Responsibility                                                            |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API key provider registration and credentials                       |
| `models.ts`             | `key_value` (model data)                                       | Model definitions, capabilities, pricing                                  |
| `combos.ts`             | `combos`                                                       | Combo routing configs and ordering                                        |
| `apiKeys.ts`            | `api_keys`                                                     | API key lifecycle, scopes, quota tracking                                 |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | System configuration and shared KV store                                  |
| `backup.ts`             | —                                                              | Backup export/import operations                                           |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxy configs and routing rules                                           |
| `prompts.ts`            | `prompt_templates`                                             | Reusable prompt templates, versioning                                     |
| `webhooks.ts`           | `webhooks`                                                     | Event-driven webhook subscriptions and logs                               |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Per-request audit logging (optional, high volume)                         |
| `domainState.ts`        | `domain_*` (5 tables)                                          | Domain budgets, circuit breakers, lockouts, fallback chains, cost history |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Whitelisted API keys for MCP/A2A                                          |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historical quota usage                                                    |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Map models to combo defaults                                              |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-specific persistent state                                             |
| `encryption.ts`         | —                                                              | Helpers for encrypting/decrypting fields                                  |
| `readCache.ts`          | —                                                              | In-memory cache for read-heavy ops                                        |
| `secrets.ts`            | `key_value` (encrypted entries)                                | Encrypted secret storage                                                  |
| `stateReset.ts`         | —                                                              | Wipe/reset DB state for testing                                           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Session context for agent handoff                                         |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Usage tracking                                                            |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Compression config                                                        |

### Module Boundaries

A core architectural rule: **modules don't access each other's tables directly**. To work with another module's data, import the function from that module.

```ts
// ❌ WRONG: direct SQL from another module
db.prepare("SELECT * FROM provider_connections").all();

// ✅ RIGHT: use the providers module function
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

This rule is enforced by code review — there's no static check, but violations are flagged.

---

## Base Schema (17 tables)

`core.ts` defines the 17 base tables in `SCHEMA_SQL`. These are created by migration `001_initial_schema.sql` and form the core schema.

### Core Tables (created in initial migration)

| Table                      | Purpose                          | Key columns                                                             |
| -------------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Provider credentials (encrypted) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Provider node routing info       | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | General KV store                 | `namespace`, `key`, `value`                                             |
| `combos`                   | Routing combo definitions        | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API keys for the gateway         | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Database metadata                | `key`, `value`                                                          |
| `usage_history`            | Request usage records            | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Request payloads & responses     | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Proxy request logs               | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Model-to-provider chains         | `model`, `chain`                                                        |
| `domain_budgets`           | Per-domain spend budgets         | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Budget reset history             | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Per-domain cost tracking         | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domain rate-limit state          | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Circuit breaker state per domain | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM response cache               | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historical quota snapshots       | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Additional Tables (added by later migrations)

Subsequent migrations add tables such as:

- `cli_tool_state` (migration 011) — CLI tool state
- `mcp_*` tables — MCP server audit
- `a2a_*` tables — A2A task state
- `usage_*` tables — usage tracking
- `plugin_*` tables — plugin system
- `skill_executions` — skill execution history
- `memory_*` tables — memory system
- `compression_*` tables — compression system
- `webhook_*` tables — webhook delivery log
- `acp_*` tables — Agent Client Protocol
- `oneproxy_*` tables — 1proxy marketplace
- `proxy_assignments` — proxy scope bindings
- `detailed_call_artifacts` — call log artifacts metadata
- `quota_alert_history` — quota alert audit
- `command_code_auth_sessions` — Command Code OAuth sessions

The full list of ~30+ tables is in `src/lib/db/migrations/`.

---

## Migrations

OmniRoute uses **versioned, idempotent migrations** in `src/lib/db/migrations/`. Each migration is a single SQL file. Two naming formats coexist; the version recorded in `_omniroute_migrations` is the numeric prefix.

### Migration Naming

| Format                                            | Example                                  | Used for                                                                                |
| ------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------- |
| `NNN_description.sql` (exactly 3 digits)          | `239_call_logs_pending_detail_index.sql` | The old series `001`–`239`. Frozen on 2026-11-13: no new file gets a sequential number. |
| `YYYYMMDDHHMMSS_description.sql` (14 digits, UTC) | `20261113120000_add_usage_index.sql`     | Every migration created from 2026-11-13 on.                                             |

Why the change: with sequential numbers, parallel PRs picked the same next number and all but one had to renumber before merging. A UTC timestamp gives each PR its own version.

Rules for the timestamp format (enforced by `npm run check:migration-numbering`, shared with the generator in `scripts/check/lib/migrationNaming.mjs`):

- The timestamp is a real UTC date and time, not earlier than `20261113000000` and not more than 10 minutes in the future.
- The description is lowercase `snake_case` starting with a letter (`a-z`, `0-9`, single `_` between words), at most 80 characters.
- Two files with the same timestamp are a duplicate.
- The no-gap rule applies only to the old series: every number from `001` to `239` must exist, except the known gaps `026`, `055` and `121`. Deleting `239` (or any old file) fails the gate. `001` and `239` can never be added to the `KNOWN_GAPS` allowlist. Timestamped files never create a gap.
- Every entry in `src/lib/db/migrations/` must be a regular file with a valid lowercase `.sql` name. A directory, a symlink, a `.SQL` or `.sql.bak` file, a hidden file or a name with a space fails the gate, because the runner would skip it silently or crash at boot.

**Apply order.** The runner sorts by the numeric value of the prefix, not by text: the old `001`–`239` files first, then the timestamped files in timestamp order, then any namespaced directories registered with `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (versions such as `ee-001`). A pending migration is any file whose version is not in `_omniroute_migrations`, so a migration from an older branch that merges after a newer one still applies on existing databases.

**The timestamp is creation order, not merge order.** If your migration depends on a table or column created by a migration with a **newer** timestamp (for example, one from another PR that merged first), a fresh database would run yours first and fail. While your PR is still open, regenerate the file name with `npm run db:new-migration` so it gets a newer timestamp, or make it independent. `npm run test:migrations:fresh` applies every migration to an empty database and catches this.

### A Merged Migration Is Never Deleted or Renamed

Once a migration file is on a release branch or `main`, it has already run on homolog and developer databases, on VPS installs and in the Enterprise sync. From then on:

- **Never delete it.** Fresh installs would lose its schema while upgraded databases keep it.
- **Never rename it.** The version in `_omniroute_migrations` would no longer match a file, so every database that already applied it would run it again. Non-idempotent SQL then duplicates data or stops the boot.
- **Need a different schema?** Create a new migration with `npm run db:new-migration`.

Renaming is safe only for a file that is not merged yet, which is the case the gate's hints refer to. A release tag changes nothing here: every push to a `release/v*` branch publishes the Docker `:next` image and runs on homolog, VPS installs and the Enterprise sync, so a merged migration has run on real databases before any `vX.Y.Z` tag exists. The gate fails every removal of a base file, tagged or not.

- **Reverting a merged migration.** A `git revert` that deletes the file fails the gate. Keep the file and undo its schema in a new migration: `npm run db:new-migration -- <description>`, with `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` and so on. Upgraded and fresh databases then end with the same schema.
- **The one accepted rename: a compatibility entry and identical content.** If a merged file must move (for example, two merged files share a timestamp and the runner stops with a version collision), rename the later one without touching its SQL and add `{ fromVersion, fromName, toVersion, toName }` to `RENAMED_MIGRATION_COMPATIBILITY` in `src/lib/db/migrationRunner/constants.ts`. Databases that applied the old version get their `_omniroute_migrations` row moved instead of running the file again. The gate warns about such a rename and always runs the commutation check on it, whatever the new timestamp: fresh installs apply the file at its new position, upgraded databases do not, so pick a new timestamp near the old one. The gate fails the rename if the content changed (a schema change still goes in a new migration), or if the entry's target file is not on disk.
- **Never rename within the same timestamp.** A rename that keeps the timestamp and changes only the description fails the gate, with or without an entry. With an entry whose `toVersion` equals its `fromVersion`, the runner deletes the old `_omniroute_migrations` row and applies the file again on every database that already ran it. Without an entry, the runner tracks only the version: it skips the file on those databases (new content never runs there) and logs a renumbering error on every boot. Use another timestamp plus a compatibility entry, or keep the name.
- **The gate checks that the renamed file does not run again.** For each covered rename, the gate passes the new file name to the commutation check with `--must-not-apply`. The check boots the upgraded database with the real runner, and if the runner applies that file again (for example, because the entry has a wrong version or name, or because the gate's text parser read `constants.ts` differently from TypeScript), the gate fails with `migration renomeada rodaria de novo` and asks you to check the entry's old and new versions and names.

### What the Gate Checks Against the Base

On pull request and merge-queue runs, `npm run check:migration-numbering` compares `src/lib/db/migrations/` on disk with the same directory on the base branch. The base is, in this order: `--base-latest-tag`, `--base <ref>`, the `MIGRATION_BASE_REF` variable, or, when `GITHUB_EVENT_NAME` is `pull_request`, `pull_request_target` or `merge_group`, the first parent of the merge commit, the `merge_group.base_sha` of the event payload, or `git merge-base HEAD origin/$GITHUB_BASE_REF`. In a pull request or merge-queue run with no resolvable base the gate fails. Outside CI without `--base` it prints `comparação com a base: pulada (sem --base)` and skips these rules.

`--base-latest-tag` compares with the newest release tag (`vX.Y.Z` in semver order; suffixed tags such as nightlies do not count) that is in the history of `HEAD`, with the same rules as `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) runs the gate this way, because push and scheduled runs have no pull request base and a merge can land without a fresh CI run. With no release tag in the history the gate fails; run `git fetch --tags` (in CI, `actions/checkout` with `fetch-depth: 0` brings the tags).

| Change on the pull request                                                                            | Result                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A file that exists on the base is renamed, with a `RENAMED_MIGRATION_COMPATIBILITY` entry             | **Warning** if the content is identical, and the commutation check runs whatever the new timestamp; it fails if the new position changes the final schema (undo the rename, or pick another new timestamp where it commutes) or if the runner would apply the renamed file again on an upgraded database. **Fails** if the content changed. |
| A file that exists on the base is renamed keeping its timestamp (only the description changes)        | **Fails**, with or without an entry: the runner would apply it again (with the entry) or skip it by version (without one). Use another timestamp plus a compatibility entry, or keep the name.                                                                                                                                              |
| A file that exists on the base is deleted, or renamed without an entry                                | **Fails**, whether or not the file is in a release tag. To undo it, restore the file with `git checkout <base> -- src/lib/db/migrations/<file>`; to revert its schema, add a new migration with `DROP ... IF EXISTS`.                                                                                                                       |
| A file that exists on the base has different content                                                  | **Warning** (a `::warning` annotation in GitHub Actions), and the commutation check runs. It fails if the edit changes the final schema, because upgraded databases do not apply the edited file again: put the change in a new migration. A harmless edit (a comment, `IF NOT EXISTS`) only warns.                                         |
| A timestamped file is added with a timestamp not newer than the base's newest                         | Runs the commutation check, described below.                                                                                                                                                                                                                                                                                                |
| An old-format `NNN_` file is added with a number below the base's newest old-format file              | **Fails**, even if `KNOWN_GAPS` is edited in the same pull request: the old series is frozen, create the migration with `npm run db:new-migration`. Old-format files above the base's newest one (a `release/v*` to `main` pull request) are accepted.                                                                                      |
| An out-of-order, edited or renamed file contains `INSERT`, `UPDATE`, `DELETE` or `REPLACE` statements | **Warning**: the commutation check does not compare data, so review whether the order in which upgraded and fresh databases apply it changes the result.                                                                                                                                                                                    |

One run of the commutation check covers the out-of-order, the edited and the renamed files together.

The commutation check (`scripts/check/migration-commutation.ts`) builds two temporary databases with the real install path: an **upgraded** one (boot with the base migrations, then boot again on the same file with the pull request's migrations) and a **fresh** one (one boot with the pull request's migrations). It compares the resulting schemas: tables and columns (ignoring column order), UNIQUE / PRIMARY KEY and FOREIGN KEY constraints, the normalized `CREATE TABLE` text of each table (which covers CHECK constraints, collations, generated columns and table options), indexes, triggers and views. Row data is not compared. If they match, the gate prints that the file is out of order but commutes, and passes. If they differ, the gate fails with the difference and a hint for the case: for an out-of-order file, regenerate its name with `npm run db:new-migration`, which is safe because the file is not merged yet; for an edited base file, restore the base content and put the change in a new migration; for a renamed file, undo the rename or pick another new timestamp where it commutes, never the same timestamp with another name. If the check itself cannot run, the gate fails in CI and only warns locally. For an edited base file, the upgraded database is built with the base's content of that file, and the second boot skips it because its version is already recorded. For a renamed file, the upgraded database is built with the file under its old name, and the second boot moves its `_omniroute_migrations` row through the compatibility entry instead of running it again; the gate passes the new name with `--must-not-apply`, so the check fails if the second boot applies it. If a pull request migration fails to apply on the upgraded path, that is, after every base migration (whether or not it also fails on a fresh install), the gate reports `migration do PR não aplica` and asks you to fix the SQL against the base's current schema; if the file depends on another pull request migration with a later timestamp, regenerate its name with `npm run db:new-migration`.

To run the same comparison locally, pass the base explicitly, for example `npm run check:migration-numbering -- --base origin/<base-branch>`, or `npm run check:migration-numbering -- --base-latest-tag` to compare with the latest release.

### Converting an Open PR's `NNN` Migration

A pull request opened before the switch may still carry a sequential file such as `240_add_widgets.sql`. Old numbers above `239` are rejected, so convert it before merging:

1. **Rename the file with the generator, keeping the description.** Run `npm run db:new-migration -- <same description>` to get the new name, move the SQL into it, and delete the old `NNN_` file. The description must stay identical: the compatibility entry below matches on it.
2. **Add a compatibility entry if a persistent database ran the old number.** If any database that is kept (homolog, a VPS, a contributor's own install) ran a build of the PR with the `NNN_` file, add `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` to `RENAMED_MIGRATION_COMPATIBILITY` in `src/lib/db/migrationRunner/constants.ts`. This is **required for `237`, `238` and `239`**: those slots now hold the canonical `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql` and `239_call_logs_pending_detail_index.sql`, and without the entry such a database skips the canonical migration forever and runs the converted one again. It also works for a slot that stays empty, such as `240`, when the destination is a timestamp. When in doubt, add the entry. Where you add it in the array does not matter: when an entry's target slot still holds a row that another entry moves away (for example `237` holding a PR row while an older `usage_history_calculated_cost` row waits to move into `237`), the runner lets that entry wait until the slot is free. Only a real conflict, such as a slot held by a row no entry moves, or two entries that swap slots, stops the boot with `Cannot reconcile ...`.
3. **Keep the SQL idempotent** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), because the converted migration may meet a database where its schema already exists.
4. **Move version-keyed special cases.** If the PR added a case for its old number in `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) or in `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), change the key to the new timestamp.

`tests/unit/db/codex-fence-migration-rename.test.ts` is a working example of a test for a renamed migration.

### Backports to Branches Before the Switch

Never cherry-pick or backport a `YYYYMMDDHHMMSS_` file to a branch that predates the switch (for example an older `release/v*` branch). The runner there sorts file names as text, so a timestamped file would run between `201_` and `202_` on a fresh database, and the old gate there does not understand 14-digit prefixes. On such a branch, write the change as that branch's own next `NNN_` file, idempotent, so it is a no-op when the timestamped version arrives later.

### How Migrations Run

At startup, `migrationRunner.ts`:

1. Creates `_omniroute_migrations` table if not exists
2. Queries for already-applied migrations
3. Applies any new migrations in order, each in a transaction
4. Records each applied migration with timestamp

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

### Idempotency

Migrations must be **idempotent** — running them twice should be a no-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Use `IF NOT EXISTS`, `IF EXISTS`, and `OR IGNORE` / `OR REPLACE` clauses liberally.

### Adding a New Migration

1. **Create the file with the generator**: `npm run db:new-migration -- <description>` (for example `npm run db:new-migration -- add combo priority`). It writes `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` with the current UTC time and a comment header, moves forward one second if that timestamp is taken, and never overwrites a file. Do not pick a number by hand.
2. **Use safe DDL**: `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Backfill data carefully**: use `UPDATE ... WHERE ...` to handle existing rows
4. **Check order and naming**: `npm run test:migrations:fresh` (all migrations on an empty database) and `npm run check:migration-numbering`
5. **Test on a copy**: never run untested migrations on production

Example:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Backwards-incompatible changes** (e.g., dropping columns) are tricky. OmniRoute does NOT support downgrade — once a migration is applied, the schema change is permanent. Plan accordingly.

---

## Encryption at Rest

Sensitive fields (API keys, OAuth tokens, connection strings) are encrypted at rest using **AES-256-GCM**.

### How It Works

```ts
// src/lib/db/encryption.ts (simplified)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Where It's Used

- `provider_connections.api_key` — encrypted at application level
- `provider_connections.access_token`, `refresh_token`, `id_token` — encrypted at application level
- `key_value` entries with `namespace = "secrets"` — encrypted at application level
- `proxy_registry.auth` — encrypted at application level (if present)

### Encryption Key

The encryption key is derived from a **passphrase** (set via `STORAGE_ENCRYPTION_KEY` env var) and a **salt** (stored in the DB). Both are required to decrypt data.

```bash
# Generate a secure passphrase
openssl rand -hex 32

# Set in .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Critical**: Losing the encryption key means losing access to all encrypted data. **Back up the key separately from the database**.

### What's NOT Encrypted

For performance reasons, the following are stored in plaintext:

- Provider display names
- Model definitions (already public)
- Routing rules
- Usage records (no PII)

---

## Encryption Caveats (v3.8.16+)

OmniRoute uses **`migrateLegacyEncryptedString()`** to handle two encryption schemes transparently:

- **Legacy** (pre-v3.5.0): XOR-based "encryption" (not real crypto)
- **Current**: AES-256-GCM with proper IV and auth tag

The migration helper detects the legacy format and re-encrypts with the new scheme on first read. This means you can upgrade an old database without losing credentials.

---

## Read Cache

For frequently-read data (models, providers, settings), `readCache.ts` provides an **in-memory cache**:

```ts
// Cached at startup, invalidated on write
const providers = await getCachedProviders(); // Fast, in-memory
const fresh = await listProviders(); // Slow, hits DB
```

| Cached entity          | Cache key      | TTL         |
| ---------------------- | -------------- | ----------- |
| `models`               | `models:v1`    | Until write |
| `provider_connections` | `providers:v1` | Until write |
| `settings`             | `settings:v1`  | Until write |
| `combos`               | `combos:v1`    | Until write |

Cache is invalidated on every write to the corresponding table.

---

## Backup and Recovery

### Manual Backup

```bash
# Use the CLI to create a local backup
omniroute backup create --name pre-migration

# Or via the API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

The backup file includes:

- All DB tables (serialized to JSON)
- Call log artifacts (base64-encoded, optional)
- Settings + secrets (encrypted)
- Plugin configuration

### Restore

```bash
# Via CLI
omniroute restore pre-migration

# Via API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Warning**: Restore overwrites the entire DB. Stop all clients first.

### Automated Backups

```bash
# Enable automated daily backups via CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

The schedule is executed server-side by a background job that ticks every 30 seconds
(default) and evaluates the cron expression against local server time.

| Variable                                    | Default | Description                                                                                                   |
| ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | Tick interval in ms (min `5000`). Must be shorter than 60 s to reliably land inside the matching cron minute. |

### SQLite Hot Backup

For zero-downtime backup of a live DB:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

This uses SQLite's online backup API — safe to run while OmniRoute is running.

---

## Performance Tuning

### WAL Mode

WAL is enabled by default. For high-write workloads, consider:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute does not set `journal_size_limit`. A checkpoint moves WAL frames into the main file, but the WAL file keeps its
largest allocated size. The `OMNIROUTE_WAL_GUARD_MAX_MB` guard only warns and runs `wal_checkpoint(RESTART)`; it is not a disk-size cap.

### Indexes

Key indexes for performance (auto-created by migrations):

- `idx_models_provider` — model lookups by provider
- `idx_combo_targets_combo_id` — combo target expansion
- `idx_usage_history_api_key_timestamp` — usage analytics
- `idx_quota_snapshots_api_key_window` — quota tracking
- `idx_call_logs_timestamp` — call log queries

To add a new index, create a migration:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memory-Mapped I/O

For very large databases (>10GB), memory mapping can be adjusted via SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compaction

Long-running OmniRoute instances benefit from occasional `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Run monthly during low-traffic windows. (WAL mode reduces the need, but doesn't eliminate it.)

---

## Health Check

`src/lib/db/healthCheck.ts` provides **DB-level health diagnostics**:

Both verbs require authentication (`401` otherwise). `GET` diagnoses only; `POST` runs the
same check with `autoRepair` enabled.

```bash
GET  /api/db/health   # diagnose
POST /api/db/health   # diagnose + repair
```

The response is the `DbHealthCheckResult` produced by `runDbHealthCheck()`
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

| Field             | Meaning                                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` when `issues` is empty. `driver` never influences it.                                                                                   |
| `issues[].type`   | One of `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                        |
| `repairedCount`   | Rows repaired during this run; always `0` when `autoRepair` is false.                                                                          |
| `backupCreated`   | Whether a backup was taken before repairing.                                                                                                   |
| `checkedAt`       | ISO timestamp shared by the run and by any repair note it writes.                                                                              |
| `driver.name`     | SQLite driver serving the checked database.                                                                                                    |
| `driver.degraded` | `true` when writes are not durably backed by the database file — the `sql.js` WASM fallback (whole-file persistence) or an in-memory database. |

The same payload is returned by the `omniroute_db_health_check` MCP tool.

Run `PRAGMA integrity_check` to detect corruption:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Should print: ok
```

If it returns anything other than `ok`, **stop using the database immediately** and restore from backup.

---

## Disaster Recovery

### Scenario 1: WAL File Lost

The `-wal` file is missing but `-shm` and main DB are intact:

```bash
# Recovers automatically on next open
omniroute
```

If SQLite can't auto-recover:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenario 2: Main DB File Corrupted

Restore from backup:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` only downloads a full `.tar.gz` archive from a running server
(`GET /api/db-backups/exportAll`, operator credential required); it does not restore anything.

### Scenario 3: Encryption Key Lost

**No recovery possible** without the key. The encrypted fields are unreadable. Re-add all providers manually with new credentials.

> **Mitigation**: Always back up the encryption key separately, ideally in a password manager or KMS.

### Scenario 4: Disk Full

SQLite will return `SQLITE_FULL` errors. Free disk space, then:

```bash
# Checkpoint WAL to free up space
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Common Operations

### Inspect a Table

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Count Rows in All Tables

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Reset (Wipe) All Data

```bash
# Stop OmniRoute first
omniroute stop

# Delete the DB file
rm ~/.omniroute/storage.sqlite*

# Restart (will recreate empty DB)
omniroute
```

For a **selective** reset (keep providers, wipe usage):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Export Single Table

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Troubleshooting

### "Database is locked"

Another process is holding a write lock. Either:

- Wait for the other process to finish (check `lsof | grep storage.sqlite`)
- Kill the other process
- If persistent, restart OmniRoute

### "Foreign key constraint failed"

A domain module is violating referential integrity. Check:

- Orphaned rows in dependent tables
- Cascading deletes that didn't propagate
- Recent migration that changed a foreign key

Run `PRAGMA foreign_key_check;` to find violations.

### "Out of memory"

SQLite's memory-mapped I/O is exceeding the OS limit. Reduce via SQLite pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB instead of 256MB
```

Or disable:

```sql
PRAGMA mmap_size = 0;
```

### "Migration failed mid-way"

The migration ran in a transaction, so it should have rolled back. If not:

1. **Stop OmniRoute** (prevent further attempts)
2. **Check the DB state** with `sqlite3`
3. **Manually fix** the partial migration
4. **Re-run** OmniRoute (the migration will be retried)

To prevent this, always test migrations on a copy first.

---

## See Also

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — usage tables
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — health monitoring
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — release flow
- Source: `src/lib/db/` (80+ files, ~25K LOC)
