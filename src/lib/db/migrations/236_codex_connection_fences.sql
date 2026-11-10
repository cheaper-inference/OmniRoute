-- Durable operation versions. Contains no tokens, token hashes or account identifiers.
CREATE TABLE IF NOT EXISTS codex_connection_fences (
  connection_id TEXT PRIMARY KEY,
  owner_epoch TEXT NOT NULL DEFAULT (lower(hex(randomblob(16)))),
  credential_revision INTEGER NOT NULL DEFAULT 0,
  owner_revision INTEGER NOT NULL DEFAULT 0,
  failure_revision INTEGER NOT NULL DEFAULT 0
);
INSERT OR IGNORE INTO codex_connection_fences (connection_id)
  SELECT id FROM provider_connections WHERE provider = 'codex';

-- Cache keys identify reusable slots, not owners. Keep historical snapshots; their
-- interpreted metadata is epoch-tagged by the domain writer and filtered at read time.
CREATE TRIGGER IF NOT EXISTS codex_connection_owner_changed
AFTER UPDATE OF owner_epoch ON codex_connection_fences WHEN OLD.owner_epoch <> NEW.owner_epoch
BEGIN
  UPDATE codex_connection_fences SET owner_revision = OLD.owner_revision + 1 WHERE connection_id = NEW.connection_id;
  DELETE FROM key_value WHERE namespace = 'providerLimitsCache' AND key = NEW.connection_id;
  DELETE FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = 'codex:' || NEW.connection_id;
  UPDATE provider_connections SET synced_models_at = NULL,
    provider_specific_data = CASE WHEN json_valid(provider_specific_data)
      THEN json_remove(provider_specific_data, '$.codexScopeRateLimitedUntil', '$.codexScopeRateLimitSource',
        '$.codexQuotaState', '$.codexQuotaStateByScope', '$.codexExhaustedWindow', '$.codexExhaustedWindowByScope')
      ELSE provider_specific_data END
    WHERE id = NEW.connection_id;
END;
CREATE TRIGGER IF NOT EXISTS codex_connection_fence_insert
AFTER INSERT ON provider_connections WHEN NEW.provider = 'codex'
BEGIN
  INSERT INTO codex_connection_fences (connection_id) VALUES (NEW.id)
    ON CONFLICT(connection_id) DO UPDATE SET
      owner_epoch = lower(hex(randomblob(16))), credential_revision = credential_revision + 1;
END;
CREATE TRIGGER IF NOT EXISTS codex_connection_fence_delete
AFTER DELETE ON provider_connections WHEN OLD.provider = 'codex'
BEGIN
  -- Opaque tombstone prevents reuse of untagged historical snapshots after id reuse.
  UPDATE codex_connection_fences SET owner_epoch = lower(hex(randomblob(16))),
    credential_revision = credential_revision + 1 WHERE connection_id = OLD.id;
END;
CREATE TRIGGER IF NOT EXISTS codex_connection_fence_update
AFTER UPDATE ON provider_connections WHEN OLD.provider = 'codex' OR NEW.provider = 'codex'
BEGIN
  INSERT INTO codex_connection_fences (connection_id, owner_revision)
    SELECT NEW.id, 1 WHERE NOT EXISTS (
      SELECT 1 FROM codex_connection_fences WHERE connection_id = NEW.id
    );
  UPDATE codex_connection_fences SET
    owner_epoch = CASE WHEN
      OLD.provider IS NOT NEW.provider OR OLD.auth_type IS NOT NEW.auth_type OR
      OLD.email IS NOT NEW.email OR OLD.project_id IS NOT NEW.project_id OR
      json_extract(CASE WHEN json_valid(OLD.provider_specific_data) THEN OLD.provider_specific_data ELSE '{}' END, '$.workspaceId') IS NOT json_extract(CASE WHEN json_valid(NEW.provider_specific_data) THEN NEW.provider_specific_data ELSE '{}' END, '$.workspaceId') OR
      json_extract(CASE WHEN json_valid(OLD.provider_specific_data) THEN OLD.provider_specific_data ELSE '{}' END, '$.chatgptUserId') IS NOT json_extract(CASE WHEN json_valid(NEW.provider_specific_data) THEN NEW.provider_specific_data ELSE '{}' END, '$.chatgptUserId')
      THEN lower(hex(randomblob(16))) ELSE owner_epoch END,
    credential_revision = credential_revision + CASE WHEN
      OLD.provider IS NOT NEW.provider OR OLD.auth_type IS NOT NEW.auth_type OR
      OLD.email IS NOT NEW.email OR OLD.project_id IS NOT NEW.project_id OR
      OLD.access_token IS NOT NEW.access_token OR OLD.refresh_token IS NOT NEW.refresh_token OR
      OLD.is_active IS NOT NEW.is_active OR OLD.proxy_enabled IS NOT NEW.proxy_enabled OR
      OLD.per_key_proxy_enabled IS NOT NEW.per_key_proxy_enabled OR
      json_extract(CASE WHEN json_valid(OLD.provider_specific_data) THEN OLD.provider_specific_data ELSE '{}' END, '$.workspaceId') IS NOT json_extract(CASE WHEN json_valid(NEW.provider_specific_data) THEN NEW.provider_specific_data ELSE '{}' END, '$.workspaceId') OR
      json_extract(CASE WHEN json_valid(OLD.provider_specific_data) THEN OLD.provider_specific_data ELSE '{}' END, '$.chatgptUserId') IS NOT json_extract(CASE WHEN json_valid(NEW.provider_specific_data) THEN NEW.provider_specific_data ELSE '{}' END, '$.chatgptUserId')
      THEN 1 ELSE 0 END,
    failure_revision = failure_revision + CASE WHEN
      (NEW.last_error_at IS NOT NULL AND OLD.last_error_at IS NOT NEW.last_error_at) OR
      (NEW.last_error IS NOT NULL AND OLD.last_error IS NOT NEW.last_error) OR
      (NEW.test_status IN ('banned', 'expired', 'deactivated', 'credits_exhausted', 'unavailable') AND OLD.test_status IS NOT NEW.test_status) OR
      (NEW.rate_limited_until IS NOT NULL AND OLD.rate_limited_until IS NOT NEW.rate_limited_until) OR
      (json_extract(CASE WHEN json_valid(NEW.provider_specific_data) THEN NEW.provider_specific_data ELSE '{}' END, '$.codexScopeRateLimitedUntil.codex') IS NOT NULL AND
       json_extract(CASE WHEN json_valid(OLD.provider_specific_data) THEN OLD.provider_specific_data ELSE '{}' END, '$.codexScopeRateLimitedUntil.codex') IS NOT json_extract(CASE WHEN json_valid(NEW.provider_specific_data) THEN NEW.provider_specific_data ELSE '{}' END, '$.codexScopeRateLimitedUntil.codex')) OR
      (json_extract(CASE WHEN json_valid(NEW.provider_specific_data) THEN NEW.provider_specific_data ELSE '{}' END, '$.codexScopeRateLimitedUntil.spark') IS NOT NULL AND
       json_extract(CASE WHEN json_valid(OLD.provider_specific_data) THEN OLD.provider_specific_data ELSE '{}' END, '$.codexScopeRateLimitedUntil.spark') IS NOT json_extract(CASE WHEN json_valid(NEW.provider_specific_data) THEN NEW.provider_specific_data ELSE '{}' END, '$.codexScopeRateLimitedUntil.spark'))
      THEN 1 ELSE 0 END
    WHERE connection_id = NEW.id;
  DELETE FROM codex_connection_fences WHERE connection_id = NEW.id AND NEW.provider <> 'codex';
END;
