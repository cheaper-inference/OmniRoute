-- Keep the latest ban context together with the access decision. Older bans have no recorded reason or date.
ALTER TABLE api_keys ADD COLUMN ban_reason TEXT CHECK (ban_reason IN ('prompt_injection', 'compromised_key', 'policy_violation'));
ALTER TABLE api_keys ADD COLUMN banned_at TEXT;
