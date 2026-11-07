-- Migration: per-API-key USD budget over a rolling 5-hour window
ALTER TABLE api_keys ADD COLUMN five_hour_usage_limit_usd REAL;
