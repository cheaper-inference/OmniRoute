-- Add lifetime token credit while preserving existing limits, counters and reset logs.
-- Child rows are backed up because DROP TABLE cascades under foreign_keys=ON.

DROP TABLE IF EXISTS temp.aktl218_counters;
DROP TABLE IF EXISTS temp.aktl218_reset_logs;
CREATE TEMP TABLE aktl218_counters AS SELECT * FROM api_key_token_counters;
CREATE TEMP TABLE aktl218_reset_logs AS SELECT * FROM api_key_token_limit_reset_logs;

CREATE TABLE IF NOT EXISTS api_key_token_limits_new (
  id              TEXT PRIMARY KEY,
  api_key_id      TEXT NOT NULL,
  scope_type      TEXT NOT NULL CHECK (scope_type IN ('model', 'provider', 'global')),
  scope_value     TEXT NOT NULL DEFAULT '',
  token_limit     INTEGER NOT NULL CHECK (token_limit > 0),
  reset_interval  TEXT NOT NULL DEFAULT 'monthly' CHECK (reset_interval IN ('daily', 'weekly', 'monthly', 'never')),
  reset_time      TEXT,
  enabled         INTEGER NOT NULL DEFAULT 1,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (api_key_id, scope_type, scope_value, reset_interval)
);

INSERT OR IGNORE INTO api_key_token_limits_new
  (id, api_key_id, scope_type, scope_value, token_limit, reset_interval, reset_time,
   enabled, created_at, updated_at)
SELECT id, api_key_id, scope_type, scope_value, token_limit, reset_interval, reset_time,
       enabled, created_at, updated_at
FROM api_key_token_limits;

DROP TABLE api_key_token_limits;

ALTER TABLE api_key_token_limits_new RENAME TO api_key_token_limits;

CREATE INDEX IF NOT EXISTS idx_aktl_api_key_id ON api_key_token_limits (api_key_id);

INSERT OR IGNORE INTO api_key_token_counters (limit_id, window_start, tokens_used, updated_at)
SELECT limit_id, window_start, tokens_used, updated_at FROM temp.aktl218_counters;

INSERT OR IGNORE INTO api_key_token_limit_reset_logs (id, limit_id, reset_at, prev_tokens, window_start)
SELECT id, limit_id, reset_at, prev_tokens, window_start FROM temp.aktl218_reset_logs;

DROP TABLE temp.aktl218_counters;
DROP TABLE temp.aktl218_reset_logs;
