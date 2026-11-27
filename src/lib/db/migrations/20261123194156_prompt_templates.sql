-- Migration: prompt_templates
-- Version:   20261123194156 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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

-- prompt_templates used to exist only where ensureSchema() in src/lib/db/prompts.ts had run,
-- and nothing imported that module, so the table was dormant. The opt-in template:// expansion
-- (src/lib/promptTemplateExpand.ts, behind OMNIROUTE_PROMPT_TEMPLATES) now imports it from the
-- chat handler (src/sse/handlers/chat.ts), so the table appears the first time a template is
-- looked up. A clean install and an upgraded install would then differ by whether the feature
-- had been used, the divergence check:install-upgrade fails on (see
-- 20261118212845_cloud_agent_tasks.sql). Same DDL and indexes as the lazy CREATE, so databases
-- that already have the table keep it as is; the lazy CREATE stays as the self-heal path.
CREATE TABLE IF NOT EXISTS prompt_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  content TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  variables TEXT,
  description TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(slug, version)
);

CREATE INDEX IF NOT EXISTS idx_pt_slug ON prompt_templates(slug);
CREATE INDEX IF NOT EXISTS idx_pt_active ON prompt_templates(slug, is_active);
CREATE INDEX IF NOT EXISTS idx_pt_hash ON prompt_templates(content_hash);
