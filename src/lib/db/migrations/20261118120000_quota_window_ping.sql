-- Migration 20261118120000: quota_ping_targets + quota_ping_runs
--
-- Quota window ping targets: per connection + quota window, an optional schedule
-- that warms a provider quota window only when telemetry says it is safe and not
-- already pinged for the current reset. Every ping spends real quota, so targets
-- are opt-in: the global kill switch `settings.quotaWindowPing.enabled` defaults
-- to false (src/lib/db/settings.ts) and every target stores enabled = 0 until the
-- operator turns it on.
--
-- `schedule` is a JSON object ({"kind":"interval","minutes":N} or
-- {"kind":"daily","time":"HH:mm","timezone":"...","days":[0..6]}), NULL when the
-- target has no schedule. next_run_at is NULL while the target is disabled.
--
-- quota_ping_runs is one audit row per evaluation and doubles as the per-target
-- lease: a run row is claimed inside a transaction only when no other run of the
-- same target is 'running' with a live lease_expires_at (epoch ms). A run whose
-- lease expires while still 'running' (process died mid-run) is recovered as
-- 'skipped' with detail 'interrupted'. History is pruned to the newest 200
-- non-running rows after each finish.
--
-- Idempotent: safe to run more than once.

CREATE TABLE IF NOT EXISTS quota_ping_targets (
  id                            TEXT    PRIMARY KEY,
  connection_id                 TEXT    NOT NULL,
  provider                      TEXT    NOT NULL,
  model                         TEXT,
  descriptor_id                 TEXT    NOT NULL,
  window_id                     TEXT    NOT NULL,
  enabled                       INTEGER NOT NULL DEFAULT 0 CHECK (enabled IN (0,1)),
  schedule                      TEXT,
  min_longer_window_remaining_pct REAL  NOT NULL DEFAULT 0,
  dry_run                       INTEGER NOT NULL DEFAULT 0 CHECK (dry_run IN (0,1)),
  claude_billable_confirmed     INTEGER NOT NULL DEFAULT 0 CHECK (claude_billable_confirmed IN (0,1)),
  last_pinged_fingerprint       TEXT,
  last_ping_at                  TEXT,
  failure_at                    TEXT,
  next_run_at                   TEXT,
  created_at                    TEXT    NOT NULL,
  updated_at                    TEXT    NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_quota_ping_targets_unique
  ON quota_ping_targets(connection_id, descriptor_id);
CREATE INDEX IF NOT EXISTS idx_quota_ping_targets_enabled
  ON quota_ping_targets(enabled, next_run_at);

CREATE TABLE IF NOT EXISTS quota_ping_runs (
  id                TEXT    PRIMARY KEY,
  target_id         TEXT    NOT NULL,
  connection_id     TEXT    NOT NULL,
  descriptor_id     TEXT    NOT NULL,
  window_id         TEXT    NOT NULL,
  trigger_kind      TEXT    NOT NULL CHECK (trigger_kind IN ('scheduled','manual')),
  status            TEXT    NOT NULL CHECK (status IN ('running','succeeded','failed','skipped')),
  reason            TEXT,
  fingerprint       TEXT,
  dry_run           INTEGER NOT NULL DEFAULT 0 CHECK (dry_run IN (0,1)),
  detail            TEXT,
  started_at        TEXT    NOT NULL,
  finished_at       TEXT,
  lease_expires_at  INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_quota_ping_runs_target_status
  ON quota_ping_runs(target_id, status);
CREATE INDEX IF NOT EXISTS idx_quota_ping_runs_started
  ON quota_ping_runs(started_at DESC);