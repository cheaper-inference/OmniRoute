-- Migration 206: codex_wakeup_tasks + codex_wakeup_runs
--
-- Scheduled Codex account wakeups (Settings → AI → Codex Quota Auto-Ping → Scheduled
-- wakeups). A task pings 1–20 Codex OAuth accounts so their quota window starts at a
-- time the operator picks, either daily (HH:mm in an IANA timezone on chosen weekdays)
-- or every N minutes. Every run spends real quota, so the feature is opt-in: no rows
-- exist until the operator creates a task.
--
-- connection_ids is a JSON array of provider_connections ids; schedule is a JSON object
-- ({"kind":"interval","minutes":N} or {"kind":"daily","time":"HH:mm","timezone":"…",
-- "days":[0..6]}). next_run_at is NULL while the task is disabled.
--
-- codex_wakeup_runs doubles as the cross-process lease: a run is claimed inside a
-- transaction only when no other run of the same task is 'running' with a live
-- lease_expires_at (epoch ms). A run whose lease expires while still 'running' (process
-- died mid-run) is recovered as 'interrupted'. results is a JSON array of
-- {connectionId,status,reason,durationMs}. History is pruned to the newest 100 runs.
--
-- Idempotent: safe to run more than once.

CREATE TABLE IF NOT EXISTS codex_wakeup_tasks (
  id              TEXT    PRIMARY KEY,
  name            TEXT    NOT NULL,
  connection_ids  TEXT    NOT NULL,
  schedule        TEXT    NOT NULL,
  enabled         INTEGER NOT NULL DEFAULT 0 CHECK (enabled IN (0,1)),
  next_run_at     TEXT,
  created_at      TEXT    NOT NULL,
  updated_at      TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS codex_wakeup_runs (
  id                TEXT    PRIMARY KEY,
  task_id           TEXT    NOT NULL,
  task_name         TEXT    NOT NULL,
  trigger_kind      TEXT    NOT NULL CHECK (trigger_kind IN ('scheduled','manual')),
  status            TEXT    NOT NULL
                    CHECK (status IN ('running','succeeded','failed','skipped','partial','interrupted')),
  results           TEXT    NOT NULL DEFAULT '[]',
  started_at        TEXT    NOT NULL,
  finished_at       TEXT,
  lease_expires_at  INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_codex_wakeup_runs_task_status
  ON codex_wakeup_runs(task_id, status);

CREATE INDEX IF NOT EXISTS idx_codex_wakeup_runs_started
  ON codex_wakeup_runs(started_at DESC);
