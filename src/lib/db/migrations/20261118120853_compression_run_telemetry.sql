-- Migration: compression_run_telemetry
-- Version:   20261118120853 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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

-- compression_run_telemetry used to exist only where ensureCompressionRunTelemetryTable()
-- (src/lib/db/compressionRunTelemetry.ts) had run: the cleanup timer and the output-style
-- telemetry path create it lazily after boot. A clean install and an upgraded install then
-- diverged by timing, and check:install-upgrade stopped the 3.8.54 npm publish on it (run
-- 44254498706: 151 tables clean, 152 upgraded). Same DDL as the lazy CREATE, so databases that
-- already have the table keep it as is; the lazy CREATE stays as the self-heal path.
CREATE TABLE IF NOT EXISTS compression_run_telemetry (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp INTEGER NOT NULL,
  request_id TEXT,
  model TEXT,
  provider TEXT,
  source TEXT,
  tokens_before INTEGER NOT NULL,
  tokens_after INTEGER NOT NULL,
  ratio REAL,
  cost_delta REAL,
  output_styles TEXT,
  output_style_bypass TEXT,
  output_tokens INTEGER
);
