-- Provider-reported charge in micro-dollars; absent or invalid values remain NULL.
ALTER TABLE call_logs ADD COLUMN buyer_cost_micro INTEGER DEFAULT NULL;
