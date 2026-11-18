-- Migration: connection_notes_model_map
-- Version:   20261115225415 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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

-- Add notes and model_map to provider_connections.
-- notes: free-form operator text for connection details, billing notes, or account metadata.
-- model_map: JSON-encoded dictionary { [requestedModel: string]: string } mapping requested model to actual upstream model.

ALTER TABLE provider_connections ADD COLUMN notes TEXT DEFAULT NULL;
ALTER TABLE provider_connections ADD COLUMN model_map TEXT DEFAULT NULL;
