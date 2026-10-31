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
