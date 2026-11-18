-- Historical archives have unknown provenance; do not infer it from old numeric zeros.
ALTER TABLE daily_usage_summary ADD COLUMN estimated_requests INTEGER;
ALTER TABLE daily_usage_summary ADD COLUMN unknown_evidence_requests INTEGER;
ALTER TABLE daily_usage_summary ADD COLUMN cached_input_unknown_requests INTEGER;
