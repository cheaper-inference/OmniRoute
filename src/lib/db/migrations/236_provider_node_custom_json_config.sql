-- Add custom_json_config_json column to provider_nodes
-- Custom JSON API nodes (OpenAI-compatible node with api_type = 'custom-json') store their
-- request template, response path, HTTP method and auth mode here as a JSON object.
-- NULL for every other node type (backward compatible).
-- Column uses _json suffix so rowToCamel auto-parses it (exposed as `customJsonConfig`).
ALTER TABLE provider_nodes ADD COLUMN custom_json_config_json TEXT;
