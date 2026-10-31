-- Support bounded expiry pruning and live-row counts with an index range scan.
CREATE INDEX IF NOT EXISTS idx_semantic_cache_expires_at ON semantic_cache(expires_at);
