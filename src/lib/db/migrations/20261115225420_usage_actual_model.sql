-- Migration: usage_actual_model
-- Version:   20261115225420 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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

-- Add actual_model and requested_model to usage_history, and actual_model to call_logs.
-- Supports dual model accounting and cost tracking (requested_model vs actual_model)

ALTER TABLE usage_history ADD COLUMN requested_model TEXT DEFAULT NULL;
ALTER TABLE usage_history ADD COLUMN actual_model TEXT DEFAULT NULL;
CREATE INDEX IF NOT EXISTS idx_uh_actual_model ON usage_history(actual_model);
CREATE INDEX IF NOT EXISTS idx_uh_requested_model ON usage_history(requested_model);

ALTER TABLE call_logs ADD COLUMN actual_model TEXT DEFAULT NULL;
CREATE INDEX IF NOT EXISTS idx_cl_actual_model ON call_logs(actual_model);
