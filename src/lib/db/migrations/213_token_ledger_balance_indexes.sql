-- 213_token_ledger_balance_indexes.sql
-- token_ledger was created in 060 with no index at all. Both balance reads and
-- the history read filter on one of two columns and sort by created_at, so every
-- call full-scanned the table and then sorted. The table is append-only, so the
-- scan cost grows without bound, and transferTokens() calls getBalance() inside
-- its own write transaction - the scan became write-lock hold time.
--
-- One index per direction: SQLite cannot serve an OR across two columns from a
-- single index, and the trailing created_at DESC keeps getHistory's ORDER BY
-- out of a temp B-tree.
CREATE INDEX IF NOT EXISTS idx_token_ledger_to_created
  ON token_ledger (to_api_key_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_token_ledger_from_created
  ON token_ledger (from_api_key_id, created_at DESC);
