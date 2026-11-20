-- Migration: quota_percent_ledger
-- Version:   20261120092003 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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

-- Percent attribution book for quota-share pools on percent plans with a plan-window reading
-- (Claude through an OAuth connection, and Codex).
--
-- quota_percent_ledger holds one book per (pool, connection, plan window): the last applied
-- account reading, the reading when the book opened or the provider window last turned
-- (baseline), and each API key's token counter at that moment (keys_json, a map of
-- { startTokens }). Each key's part is computed when the book is read. The whole state lives in
-- one row so a write is one compare-and-set statement on `rev`. `quota_window` because WINDOW is
-- a reserved word.
--
-- quota_percent_ledger_tokens holds one cumulative token counter per (pool, connection, key),
-- apart from the book row so the per-request write never contends with the state write.
--
-- Times are epoch ms. Both tables keep a rowid and an updated_at index: the scheduled quota
-- cleanup deletes rows idle for two monthly windows by rowid batches. The manual usage-history
-- reset clears them too.

CREATE TABLE IF NOT EXISTS quota_percent_ledger (
  pool_id TEXT NOT NULL,
  connection_id TEXT NOT NULL,
  quota_window TEXT NOT NULL,
  rev INTEGER NOT NULL,
  last_used REAL NOT NULL,
  baseline REAL NOT NULL,
  reset_at INTEGER,
  read_at INTEGER NOT NULL,
  keys_json TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (pool_id, connection_id, quota_window)
);

CREATE TABLE IF NOT EXISTS quota_percent_ledger_tokens (
  pool_id TEXT NOT NULL,
  connection_id TEXT NOT NULL,
  api_key_id TEXT NOT NULL,
  tokens REAL NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (pool_id, connection_id, api_key_id)
);

CREATE INDEX IF NOT EXISTS idx_quota_percent_ledger_updated_at
  ON quota_percent_ledger(updated_at);

CREATE INDEX IF NOT EXISTS idx_quota_percent_ledger_tokens_updated_at
  ON quota_percent_ledger_tokens(updated_at);
