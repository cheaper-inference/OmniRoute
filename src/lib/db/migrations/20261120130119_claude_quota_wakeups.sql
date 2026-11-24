-- Migration: claude_quota_wakeups
-- Version:   20261120130119 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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

-- Keep existing scheduled tasks and history assigned to Codex.
ALTER TABLE codex_wakeup_tasks ADD COLUMN provider TEXT NOT NULL DEFAULT 'codex'
  CHECK (provider IN ('codex', 'claude'));
ALTER TABLE codex_wakeup_runs ADD COLUMN provider TEXT NOT NULL DEFAULT 'codex'
  CHECK (provider IN ('codex', 'claude'));

-- Account-level claim shared by automatic and scheduled Claude wakeups.
CREATE TABLE IF NOT EXISTS claude_wakeup_claims (
  connection_id TEXT PRIMARY KEY REFERENCES provider_connections(id) ON DELETE CASCADE,
  retry_at INTEGER NOT NULL
);
