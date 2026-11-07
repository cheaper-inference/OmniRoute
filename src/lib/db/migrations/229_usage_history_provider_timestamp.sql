-- The quota cost breakdown filters LOWER(provider) over a time window.
-- A plain index on provider does not match an expression, so the
-- indexed expression is written exactly as the query writes it.

CREATE INDEX IF NOT EXISTS idx_uh_provider_timestamp
  ON usage_history(LOWER(provider), timestamp);
