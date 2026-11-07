-- The usage rollup and the quota rollup both used to write daily_usage_summary.
-- Their conflict keys differ: usage needs service_tier, quota does not. One
-- table cannot satisfy both, so usage gets its own table.

CREATE TABLE IF NOT EXISTS usage_daily_summary (
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  service_tier TEXT NOT NULL,
  date TEXT NOT NULL,
  total_requests INTEGER NOT NULL DEFAULT 0,
  total_input_tokens INTEGER NOT NULL DEFAULT 0,
  total_output_tokens INTEGER NOT NULL DEFAULT 0,
  total_cache_read_tokens INTEGER NOT NULL DEFAULT 0,
  total_cache_creation_tokens INTEGER NOT NULL DEFAULT 0,
  total_reasoning_tokens INTEGER NOT NULL DEFAULT 0,
  total_cost REAL NOT NULL DEFAULT 0.0,
  UNIQUE (provider, model, service_tier, date)
);

CREATE TABLE IF NOT EXISTS rollup_state (
  tier TEXT PRIMARY KEY,
  last_completed_date TEXT
);

CREATE TABLE IF NOT EXISTS rollup_dirty_day (
  date TEXT PRIMARY KEY,
  revision INTEGER NOT NULL,
  marked_at TEXT NOT NULL
);

-- History retention already rolled up lives only in daily_usage_summary, and the readers
-- now use this table. Carry it over so an upgrade does not lose it. Only days before the
-- first raw row are carried: at or after it, usage_history stays the source, and moving
-- the pointer there would hide raw rows. The quota backfill script writes the same table;
-- the readers on older versions counted those rows as usage too, so they are kept.
INSERT INTO usage_daily_summary (
  provider, model, service_tier, date, total_requests, total_input_tokens,
  total_output_tokens, total_cache_read_tokens, total_cache_creation_tokens,
  total_reasoning_tokens, total_cost
)
SELECT provider, model, 'standard', date, total_requests, total_input_tokens,
  total_output_tokens, 0, 0, 0, total_cost
FROM daily_usage_summary
WHERE date < COALESCE((SELECT MIN(DATE(timestamp)) FROM usage_history), '9999-12-31')
ON CONFLICT (provider, model, service_tier, date) DO NOTHING;

-- The readers only look at summary days at or before this pointer.
INSERT INTO rollup_state (tier, last_completed_date)
SELECT 'daily', MAX(date) FROM usage_daily_summary
WHERE 1
GROUP BY 1
HAVING MAX(date) IS NOT NULL
ON CONFLICT (tier) DO NOTHING;
