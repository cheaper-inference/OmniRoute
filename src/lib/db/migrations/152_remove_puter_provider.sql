-- 152_remove_puter_provider.sql
-- The Puter provider was removed from OmniRoute at the request of Puter's
-- owner (Nariman Jelveh). Clean up any locally stored configuration for it.
-- Historical request and usage records are intentionally preserved under the
-- provider identity that existed when they were written (same principle as
-- 151_windsurf_to_devin_desktop.sql).

DELETE FROM provider_connections
WHERE provider = 'puter';

DELETE FROM registered_keys
WHERE provider = 'puter';

DELETE FROM provider_key_limits
WHERE provider = 'puter';

DELETE FROM discovery_results
WHERE provider_id = 'puter';

DELETE FROM key_value
WHERE namespace = 'customModels'
  AND key = 'puter';
