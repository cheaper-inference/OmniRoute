-- Migration: compression_engine_breakdown
-- Version:   20261118212858 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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

-- compression_engine_breakdown used to exist only where ensureCompressionEngineBreakdownTable()
-- (src/lib/db/compressionAnalytics.ts) had run, and nothing runs it at boot: it is called when
-- a compressed request writes its per-engine rows (insertCompressionEngineBreakdown, from
-- open-sse/handlers/chatCore/compressionAnalyticsWrite.ts) or when the per-engine analytics
-- are read (getPerEngineAnalytics). A clean install and an upgraded install then differed by
-- whether compression had run, which is the divergence check:install-upgrade fails on (see
-- 20261118120853_compression_run_telemetry.sql). Same DDL and indexes as the lazy CREATE, so
-- databases that already have the table keep it as is; the lazy CREATE stays as the self-heal
-- path.
CREATE TABLE IF NOT EXISTS compression_engine_breakdown (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL,
  request_id TEXT,
  engine TEXT NOT NULL,
  original_tokens INTEGER NOT NULL DEFAULT 0,
  compressed_tokens INTEGER NOT NULL DEFAULT 0,
  tokens_saved INTEGER NOT NULL DEFAULT 0,
  duration_ms INTEGER
);

CREATE INDEX IF NOT EXISTS idx_ceb_engine_ts ON compression_engine_breakdown(engine, timestamp);
CREATE INDEX IF NOT EXISTS idx_ceb_request ON compression_engine_breakdown(request_id);
