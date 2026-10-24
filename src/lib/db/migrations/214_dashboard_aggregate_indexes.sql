CREATE INDEX IF NOT EXISTS idx_uh_date
  ON usage_history(DATE(timestamp));

CREATE INDEX IF NOT EXISTS idx_uh_date_provider_model_tier
  ON usage_history(DATE(timestamp), LOWER(provider), LOWER(model), service_tier);

CREATE INDEX IF NOT EXISTS idx_uh_endpoint_provider_model
  ON usage_history(endpoint, LOWER(COALESCE(provider, 'unknown')), LOWER(COALESCE(model, 'unknown')));
