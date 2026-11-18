-- 226_request_cost_ledger_read_indexes.sql
-- Two request_cost_ledger reads run synchronously on the event loop.
--
-- 1. checkKeyQuota() -> aggregateLedgerThisMonth() runs before every request
--    of a key with a monthly USD quota, and sumSearchLedgerSpendSince() runs
--    before every request of a key with daily/weekly usage limits. Both
--    filter on (api_key_id, timestamp) and read success, service_tier and
--    amount_usd. With the (api_key_id, timestamp) index from 182 every
--    month-to-date row costs a table lookup. The covering index answers both
--    from the index alone. Its prefix is the old index, so that one is
--    dropped (182 is the only place that creates it).
-- 2. getCostBySessionTag() (GET /api/usage/by-run) joins
--    call_logs.correlation_id to request_cost_ledger.request_id. With no index
--    on request_id SQLite walks the whole ledger, with or without
--    sqlite_stat1.
--
-- The old index is dropped before the covering index is built so the build
-- reuses its pages instead of growing the file and leaving them on the
-- freelist. The runner applies this file in one transaction, so readers never
-- see the table without an index.
--
-- Cost: the covering index is wider than the one it replaces and request_id
-- is new, so the file grows (about 29 MB on a 500k-row ledger with UUID key
-- and request ids). Building them is a one-time write on upgrade. Every
-- statement is idempotent.

DROP INDEX IF EXISTS idx_rcl_api_key_timestamp;
CREATE INDEX IF NOT EXISTS idx_rcl_api_key_ts_cover
  ON request_cost_ledger(api_key_id, timestamp, success, service_tier, amount_usd);
CREATE INDEX IF NOT EXISTS idx_rcl_request_id ON request_cost_ledger(request_id);
