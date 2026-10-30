-- 223: Add notes and model_map to provider_connections
-- notes: free-form operator text for connection details, billing notes, or account metadata.
-- model_map: JSON-encoded dictionary { [requestedModel: string]: string } mapping requested model to actual upstream model.

ALTER TABLE provider_connections ADD COLUMN notes TEXT DEFAULT NULL;
ALTER TABLE provider_connections ADD COLUMN model_map TEXT DEFAULT NULL;
