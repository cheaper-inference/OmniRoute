-- Migration: semantic_cache_original_cost_usd
-- Version:   20261126161248 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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

-- Existing entries retain a NULL cost and can still be replayed.
ALTER TABLE semantic_cache ADD COLUMN original_cost_usd REAL DEFAULT NULL;
