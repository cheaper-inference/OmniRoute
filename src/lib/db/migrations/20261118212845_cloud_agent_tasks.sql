-- Migration: cloud_agent_tasks
-- Version:   20261118212845 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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

-- cloud_agent_tasks used to exist only where createCloudAgentTaskTable()
-- (src/lib/cloudAgent/db.ts) had run, and nothing runs it at boot: only the
-- /api/v1/agents/tasks routes call it (src/lib/cloudAgent/index.ts also calls it on import,
-- but no module imports that barrel). A clean install and an upgraded install then differed
-- by whether someone had opened the Cloud Agents feature, which is the divergence
-- check:install-upgrade fails on (see 20261118120853_compression_run_telemetry.sql). Same DDL
-- and indexes as the lazy CREATE, so databases that already have the table keep it as is;
-- the lazy CREATE stays as the self-heal path.
CREATE TABLE IF NOT EXISTS cloud_agent_tasks (
  id TEXT PRIMARY KEY,
  provider_id TEXT NOT NULL,
  external_id TEXT,
  status TEXT NOT NULL DEFAULT 'queued',
  prompt TEXT NOT NULL,
  source TEXT NOT NULL,
  options TEXT DEFAULT '{}',
  result TEXT,
  activities TEXT DEFAULT '[]',
  error TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_provider ON cloud_agent_tasks(provider_id);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_status ON cloud_agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_created ON cloud_agent_tasks(created_at DESC);
