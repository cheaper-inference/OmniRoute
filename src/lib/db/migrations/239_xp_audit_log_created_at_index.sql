-- 239_xp_audit_log_created_at_index.sql
-- validateScoreChange() groups the last hour of xp_audit_log by key to get the global mean
-- and variance. The only existing index starts with api_key_id, so without sqlite_stat1
-- SQLite scans every retained audit row. This index starts with created_at and carries
-- api_key_id and xp_earned, so the hourly range is a covering index search that never
-- reads the table. Additive only: no change for callers.

CREATE INDEX IF NOT EXISTS idx_xp_audit_log_created_cover
  ON xp_audit_log(created_at, api_key_id, xp_earned);
