-- Migration: quota_consent_lending
-- Version:   20261121004221 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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
--
-- Consented lending for Quota Share pools.
--   * quota_allocations.lending_percent: share of the key's idle capacity it lends (0 to 100).
--   * quota_allocations.lending_until: epoch ms when the consent ends, or NULL for no deadline.
--   * quota_pools.borrow_mode: 'saturation' (default, current behavior) or 'consent'.
-- Only ADD COLUMN statements, one per line, so the runner can skip a column that already
-- exists. No backfill: every pool starts in saturation mode.
ALTER TABLE quota_allocations ADD COLUMN lending_percent INTEGER NOT NULL DEFAULT 0;
ALTER TABLE quota_allocations ADD COLUMN lending_until INTEGER;
ALTER TABLE quota_pools ADD COLUMN borrow_mode TEXT NOT NULL DEFAULT 'saturation';
