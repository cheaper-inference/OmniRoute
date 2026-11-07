-- Observability only. NULL on old rows means the provider tier was not retained.
-- The migration runner skips existing columns, including partially applied schemas.
ALTER TABLE call_logs ADD COLUMN tokens_cache_creation_5m REAL CHECK(tokens_cache_creation_5m >= 0);
ALTER TABLE call_logs ADD COLUMN tokens_cache_creation_1h REAL CHECK(tokens_cache_creation_1h >= 0);
ALTER TABLE call_logs ADD COLUMN cache_creation_tier_status TEXT;
ALTER TABLE call_logs ADD COLUMN cache_write_cost_usd REAL CHECK(cache_write_cost_usd >= 0);
ALTER TABLE call_logs ADD COLUMN cache_write_priced_tokens REAL CHECK(cache_write_priced_tokens >= 0);
