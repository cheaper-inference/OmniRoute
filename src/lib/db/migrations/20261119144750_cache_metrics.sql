-- Migration: cache_metrics
-- Version:   20261119144750 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
-- Created by `npm run db:new-migration`. Guide: docs/ops/DATABASE_GUIDE.md
--
-- Rules:
--   * Idempotent DDL: CREATE TABLE IF NOT EXISTS, CREATE INDEX IF NOT EXISTS,
--     DROP ... IF EXISTS, INSERT OR IGNORE. The runner wraps the file in a transaction.
--   * Do not depend on a migration with a NEWER timestamp: files apply in timestamp
--     order (old 001-241 first, then date-named ones, then ee- ones), so a
--     dependency on a newer file breaks fresh databases.
--   * Regenerate the name only while the migration is not merged. Once merged,
--     never rename or delete it (databases that applied it would run it again):
--     create a new migration instead.
--   * Before opening the PR run: npm run test:migrations:fresh
--     and npm run check:migration-numbering

-- cache_metrics used to exist only where ensureCacheMetricsTable() (src/lib/semanticCache.ts)
-- had run, i.e. where the semantic cache built its in-memory tier. A clean install and an
-- upgraded install then diverged by whether the cache had been used: the 3.8.48 -> 3.8.49
-- upgrade on VPS .16 had it and a clean install did not, so it sat in
-- config/quality/install-upgrade-allowlist.json. That entry only covers the upgrade side; a
-- clean install that got it first would stop the npm publish the way compression_run_telemetry
-- stopped 3.8.54 (#20511). Same DDL and seed rows as the lazy path, so databases that already
-- have the table keep it and its counters; the lazy CREATE stays as the self-heal path.
CREATE TABLE IF NOT EXISTS cache_metrics (
  key TEXT PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO cache_metrics (key, value) VALUES ('hits', 0), ('misses', 0), ('tokens_saved', 0);
