-- Team reports read one agent session's requests in time order: the session detail pages and
-- timeline, and the active-time window function (PARTITION BY agent_session_id ORDER BY
-- timestamp). This index serves those reads without a sort. It also serves every lookup the
-- single-column idx_uh_agent_session (235) served, which is only a prefix of it, so that index
-- is dropped to spare the usage_history insert path one index write per request.
CREATE INDEX IF NOT EXISTS idx_uh_agent_session_timestamp
  ON usage_history(agent_session_id, timestamp);
DROP INDEX IF EXISTS idx_uh_agent_session;
