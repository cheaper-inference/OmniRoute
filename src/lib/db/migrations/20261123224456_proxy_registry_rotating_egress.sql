-- Migration: proxy_registry_rotating_egress
-- Version:   20261123224456 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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

-- Per-proxy mark for a rotating endpoint (a gateway that hands out a new exit address per
-- connection). A marked member is never set aside for a per-IP quota refusal and never
-- counts as sharing an observed exit address with a neighbor. 0 keeps today's behavior.
ALTER TABLE proxy_registry ADD COLUMN rotating_egress INTEGER NOT NULL DEFAULT 0;
