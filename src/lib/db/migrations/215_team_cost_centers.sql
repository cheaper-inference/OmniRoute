-- Migration 197: lightweight Team / billing cost-center layer (#10409)
--
-- Key groups remain many-to-many authorization ACLs. Billing ownership is a
-- separate temporal relation with one active Team per API key. Usage rows carry
-- an immutable Team snapshot so later reassignment cannot rewrite history.
--
-- NOTE: usage_history.billing_team_id and team_rollup_processed_at are added by
-- ensureUsageHistoryColumns before migrations run (matching the migration-127
-- account-identity pattern). This file creates the relational and rollup schema.

CREATE TABLE IF NOT EXISTS teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL COLLATE NOCASE UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  max_budget_usd REAL,
  budget_duration TEXT CHECK (budget_duration IS NULL OR budget_duration IN ('1d', '7d', '30d')),
  budget_reset_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT,
  CHECK (max_budget_usd IS NULL OR max_budget_usd > 0),
  CHECK (
    (max_budget_usd IS NULL AND budget_duration IS NULL AND budget_reset_at IS NULL)
    OR (max_budget_usd IS NOT NULL AND budget_duration IS NOT NULL AND budget_reset_at IS NOT NULL)
  )
);
CREATE INDEX IF NOT EXISTS idx_teams_status ON teams(status);

CREATE TABLE IF NOT EXISTS api_key_billing_team_history (
  id TEXT PRIMARY KEY,
  api_key_id TEXT NOT NULL,
  team_id TEXT NOT NULL,
  valid_from TEXT NOT NULL,
  valid_to TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (api_key_id) REFERENCES api_keys(id) ON DELETE CASCADE,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE RESTRICT,
  CHECK (valid_to IS NULL OR valid_to > valid_from)
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_api_key_one_active_billing_team
  ON api_key_billing_team_history(api_key_id)
  WHERE valid_to IS NULL;
CREATE INDEX IF NOT EXISTS idx_billing_team_active_members
  ON api_key_billing_team_history(team_id, api_key_id)
  WHERE valid_to IS NULL;
CREATE INDEX IF NOT EXISTS idx_billing_team_history_lookup
  ON api_key_billing_team_history(api_key_id, valid_from, valid_to);

CREATE TABLE IF NOT EXISTS daily_team_usage_summary (
  team_id TEXT NOT NULL,
  api_key_id TEXT NOT NULL,
  api_key_name TEXT,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  service_tier TEXT NOT NULL DEFAULT 'standard',
  date TEXT NOT NULL,
  total_requests INTEGER NOT NULL DEFAULT 0,
  successful_requests INTEGER NOT NULL DEFAULT 0,
  total_input_tokens INTEGER NOT NULL DEFAULT 0,
  total_output_tokens INTEGER NOT NULL DEFAULT 0,
  total_cache_read_tokens INTEGER NOT NULL DEFAULT 0,
  total_cache_creation_tokens INTEGER NOT NULL DEFAULT 0,
  total_reasoning_tokens INTEGER NOT NULL DEFAULT 0,
  successful_input_tokens INTEGER NOT NULL DEFAULT 0,
  successful_output_tokens INTEGER NOT NULL DEFAULT 0,
  successful_cache_read_tokens INTEGER NOT NULL DEFAULT 0,
  successful_cache_creation_tokens INTEGER NOT NULL DEFAULT 0,
  successful_reasoning_tokens INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (team_id, api_key_id, provider, model, service_tier, date),
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS idx_daily_team_usage_date
  ON daily_team_usage_summary(team_id, date);
CREATE INDEX IF NOT EXISTS idx_daily_team_key_usage_date
  ON daily_team_usage_summary(team_id, api_key_id, date);

CREATE INDEX IF NOT EXISTS idx_usage_history_billing_team_time
  ON usage_history(billing_team_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_usage_history_team_rollup_pending
  ON usage_history(team_rollup_processed_at, timestamp)
  WHERE billing_team_id IS NOT NULL AND team_rollup_processed_at IS NULL;
