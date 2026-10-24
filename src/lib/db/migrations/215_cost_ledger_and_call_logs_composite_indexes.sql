CREATE INDEX IF NOT EXISTS idx_rcl_request_id ON request_cost_ledger(request_id);
CREATE INDEX IF NOT EXISTS idx_cl_conn_model_state_time ON call_logs(connection_id, model, detail_state, timestamp DESC) WHERE artifact_relpath IS NOT NULL;
