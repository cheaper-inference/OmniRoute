-- Non-token tariffs (OCR pages) need a persisted catalogue estimate. Keep it
-- separate from exact provider-reported charges, which always take precedence.
-- NULL is unknown, not free. Existing token-priced rows remain unchanged.
ALTER TABLE usage_history ADD COLUMN calculated_cost_usd REAL CHECK(calculated_cost_usd >= 0);
ALTER TABLE usage_history ADD COLUMN billing_unit TEXT;
ALTER TABLE usage_history ADD COLUMN billing_quantity REAL CHECK(billing_quantity >= 0);
ALTER TABLE usage_history ADD COLUMN billing_unit_price_usd REAL CHECK(billing_unit_price_usd >= 0);
