-- NULL preserves the distinction between old archives and measured zero cache reads.
ALTER TABLE daily_usage_summary ADD COLUMN total_cache_read_tokens INTEGER DEFAULT NULL;
