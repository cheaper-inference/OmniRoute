-- 214: the client's own session id on call-log rows (opencode x-opencode-session, Claude Code
-- x-claude-code-session-id / metadata.user_id.session_id, Codex session_id). session_tag holds
-- OmniRoute's conversation id (or an explicit X-OmniRoute-Session-Id); this column keeps the id
-- the client itself reports, so rows can be joined to the agent session that sent them.
-- NULL for rows written before this migration and for clients that send no session id.

ALTER TABLE call_logs ADD COLUMN client_session_id TEXT DEFAULT NULL;
CREATE INDEX IF NOT EXISTS idx_cl_client_session_id ON call_logs(client_session_id);
