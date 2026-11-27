-- Migration: xp_audit_log_created_at_index
-- Version:   20261115153452 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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
-- validateScoreChange() groups the last hour of xp_audit_log by key to get the global mean
-- and variance. The only existing index starts with api_key_id, so without sqlite_stat1
-- SQLite scans every retained audit row. This index starts with created_at and carries
-- api_key_id and xp_earned, so the hourly range is a covering index search that never
-- reads the table. Additive only: no change for callers.

CREATE INDEX IF NOT EXISTS idx_xp_audit_log_created_cover
  ON xp_audit_log(created_at, api_key_id, xp_earned);
