-- Team reports read one agent session's requests in time order: the session detail pages and
-- timeline, and the active-time window function (PARTITION BY agent_session_id ORDER BY
-- timestamp). This index serves those reads without a sort. It also covers every lookup the
-- single-column idx_uh_agent_session (235) serves; that index is kept for now.
CREATE INDEX IF NOT EXISTS idx_uh_agent_session_timestamp
  ON usage_history(agent_session_id, timestamp);
