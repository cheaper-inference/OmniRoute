-- One row per `omnirouter launch` session. The token handed to the tool is
-- `olx_<id>_<secret>`; only a fingerprint of it is stored (secret_hash), wiped on revoke. The
-- session resolves to its parent API key's permissions (parent_key_id NULL = anonymous loopback
-- posture) and can only narrow them: view_json shapes the /v1/models list it sees. Usage is not
-- counted here: requests aggregate into the agent_sessions row (agent_session_id) under the
-- parent key, keyed by this id as the client session id.
CREATE TABLE IF NOT EXISTS launch_sessions (
  id TEXT PRIMARY KEY,
  secret_hash TEXT,
  parent_key_id TEXT,
  -- Fingerprint of the parent credential at mint: regenerating the parent key (or changing the
  -- env key) kills every session minted from the old secret.
  parent_credential_hash TEXT,
  tool_id TEXT NOT NULL,
  session_tag TEXT NOT NULL,
  agent_session_id TEXT,
  view_json TEXT,
  spec_json TEXT,
  policy_json TEXT,
  attribution_json TEXT,
  preset TEXT,
  ttl_seconds INTEGER NOT NULL DEFAULT 900,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  revoked_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_launch_sessions_parent_created
  ON launch_sessions(parent_key_id, created_at);
CREATE INDEX IF NOT EXISTS idx_launch_sessions_expires
  ON launch_sessions(expires_at);
