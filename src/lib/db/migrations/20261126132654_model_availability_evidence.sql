-- The migration runner skips the ADD COLUMN when replaying an existing schema.
ALTER TABLE provider_connections ADD COLUMN model_availability_revision TEXT;
-- Stamp only connections in the rollout. Updating an unrelated connection, even
-- just its revision, would also execute that provider's existing UPDATE triggers.
UPDATE provider_connections SET model_availability_revision = lower(hex(randomblob(16)))
WHERE model_availability_revision IS NULL AND auth_type = 'apikey'
  AND (provider = 'openai' OR provider GLOB 'openai-compatible-*');

CREATE TRIGGER IF NOT EXISTS model_availability_connection_insert
AFTER INSERT ON provider_connections
WHEN NEW.auth_type = 'apikey'
  AND (NEW.provider = 'openai' OR NEW.provider GLOB 'openai-compatible-*')
BEGIN
  UPDATE provider_connections SET model_availability_revision = lower(hex(randomblob(16)))
  WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS model_availability_connection_update
AFTER UPDATE OF provider, auth_type, api_key, access_token, refresh_token, id_token, project_id,
  default_model, provider_specific_data ON provider_connections
WHEN NEW.auth_type = 'apikey'
  AND (NEW.provider = 'openai' OR NEW.provider GLOB 'openai-compatible-*')
  AND (
    OLD.provider IS NOT NEW.provider
    OR OLD.auth_type IS NOT NEW.auth_type
    OR OLD.api_key IS NOT NEW.api_key
    OR OLD.access_token IS NOT NEW.access_token
    OR OLD.refresh_token IS NOT NEW.refresh_token
    OR OLD.id_token IS NOT NEW.id_token
    OR OLD.project_id IS NOT NEW.project_id
    OR OLD.default_model IS NOT NEW.default_model
    OR CASE
      WHEN json_valid(OLD.provider_specific_data) AND json_valid(NEW.provider_specific_data)
        THEN json_remove(OLD.provider_specific_data, '$.apiKeyHealth', '$.extraApiKeyCursor')
          <> json_remove(NEW.provider_specific_data, '$.apiKeyHealth', '$.extraApiKeyCursor')
      WHEN OLD.provider_specific_data IS NULL AND json_valid(NEW.provider_specific_data)
        THEN json_remove(NEW.provider_specific_data, '$.apiKeyHealth', '$.extraApiKeyCursor') <> '{}'
      ELSE OLD.provider_specific_data IS NOT NEW.provider_specific_data
    END
  )
BEGIN
  UPDATE provider_connections SET model_availability_revision = lower(hex(randomblob(16)))
  WHERE id = NEW.id;
END;

CREATE TABLE IF NOT EXISTS model_availability_evidence (
  provider_id TEXT NOT NULL,
  connection_id TEXT NOT NULL,
  connection_revision TEXT NOT NULL,
  endpoint_kind TEXT NOT NULL CHECK (endpoint_kind IN ('chat_completions', 'responses')),
  model_id TEXT NOT NULL,
  reason TEXT CHECK (reason = 'explicit_model_not_found'),
  first_at_ms INTEGER,
  confirmed_at_ms INTEGER,
  success_at_ms INTEGER,
  expires_at_ms INTEGER NOT NULL,
  PRIMARY KEY (provider_id, connection_id, connection_revision, endpoint_kind, model_id)
);

CREATE INDEX IF NOT EXISTS idx_model_availability_evidence_expiry
ON model_availability_evidence (expires_at_ms);

CREATE TABLE IF NOT EXISTS model_availability_requests (
  provider_id TEXT NOT NULL,
  connection_id TEXT NOT NULL,
  connection_revision TEXT NOT NULL,
  endpoint_kind TEXT NOT NULL,
  model_id TEXT NOT NULL,
  request_id TEXT NOT NULL,
  expires_at_ms INTEGER NOT NULL,
  PRIMARY KEY (provider_id, connection_id, connection_revision, endpoint_kind, model_id, request_id)
);

CREATE INDEX IF NOT EXISTS idx_model_availability_requests_expiry
ON model_availability_requests (expires_at_ms);
