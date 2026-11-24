-- Migration: call_logs_artifact_overflow_order_index
-- Version:   20261115151606 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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
-- selectOverflowArtifactPaths() lists artifact rows newest first (timestamp DESC, id DESC)
-- and skips the newest maxEntries. idx_cl_artifact_relpath is ordered by path, so SQLite
-- either scans idx_cl_timestamp and sorts ties in a temp B-tree, or, once ANALYZE has run,
-- picks the path index and sorts every artifact row. This partial index is ordered the way
-- the query reads, so the plan is a plain index scan with no sort. It holds only rows that
-- reference an artifact. Additive only: no change for callers.

CREATE INDEX IF NOT EXISTS idx_cl_artifact_overflow_order
  ON call_logs(timestamp DESC, id DESC)
  WHERE artifact_relpath IS NOT NULL;
