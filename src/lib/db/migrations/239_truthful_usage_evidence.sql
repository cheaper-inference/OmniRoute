-- Additive only: historical zeros remain ambiguous, with no invented evidence.
ALTER TABLE call_logs ADD COLUMN usage_evidence TEXT;
ALTER TABLE usage_history ADD COLUMN usage_evidence TEXT;
ALTER TABLE usage_history ADD COLUMN usage_provenance TEXT;
ALTER TABLE request_cost_ledger ADD COLUMN usage_evidence TEXT;
