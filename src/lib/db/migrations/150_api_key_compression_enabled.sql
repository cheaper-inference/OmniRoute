-- Per-API-key prompt compression policy (#2101).
-- Existing and newly-created keys preserve the historical enabled behavior.
ALTER TABLE api_keys ADD COLUMN compression_enabled INTEGER NOT NULL DEFAULT 1;
