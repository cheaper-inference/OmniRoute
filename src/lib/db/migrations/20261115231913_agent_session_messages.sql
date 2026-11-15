-- Migration: agent_session_messages
-- Version:   20261115231913 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
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

-- Simplified conversation turns for agent sessions (opt-in via AGENT_SESSION_MESSAGES_ENABLED).
-- Stores the latest user prompt and assistant text/tools per turn, capped at 4k chars.

CREATE TABLE IF NOT EXISTS agent_session_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  api_key_id TEXT,
  timestamp TEXT NOT NULL,
  provider TEXT,
  model TEXT,
  success INTEGER NOT NULL DEFAULT 1,
  user_text TEXT,
  assistant_text TEXT,
  tool_names TEXT,
  truncated INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_asm_session_id ON agent_session_messages(session_id, id);
CREATE INDEX IF NOT EXISTS idx_asm_timestamp ON agent_session_messages(timestamp);
