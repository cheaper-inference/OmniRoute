-- 238_call_logs_artifact_overflow_order_index.sql
-- selectOverflowArtifactPaths() lists artifact rows newest first (timestamp DESC, id DESC)
-- and skips the newest maxEntries. idx_cl_artifact_relpath is ordered by path, so SQLite
-- either scans idx_cl_timestamp and sorts ties in a temp B-tree, or, once ANALYZE has run,
-- picks the path index and sorts every artifact row. This partial index is ordered the way
-- the query reads, so the plan is a plain index scan with no sort. It holds only rows that
-- reference an artifact. Additive only: no change for callers.

CREATE INDEX IF NOT EXISTS idx_cl_artifact_overflow_order
  ON call_logs(timestamp DESC, id DESC)
  WHERE artifact_relpath IS NOT NULL;
