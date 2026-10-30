-- 224: Add actual_model and requested_model to usage_history, and actual_model to call_logs
-- Supports dual model accounting and cost tracking (requested_model vs actual_model)

ALTER TABLE usage_history ADD COLUMN requested_model TEXT DEFAULT NULL;
ALTER TABLE usage_history ADD COLUMN actual_model TEXT DEFAULT NULL;
CREATE INDEX IF NOT EXISTS idx_uh_actual_model ON usage_history(actual_model);
CREATE INDEX IF NOT EXISTS idx_uh_requested_model ON usage_history(requested_model);

ALTER TABLE call_logs ADD COLUMN actual_model TEXT DEFAULT NULL;
CREATE INDEX IF NOT EXISTS idx_cl_actual_model ON call_logs(actual_model);
