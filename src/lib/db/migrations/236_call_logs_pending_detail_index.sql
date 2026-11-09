-- 236_call_logs_pending_detail_index.sql
-- expirePendingCallLogDetails() runs about once a minute during traffic and before
-- each log export. Its predicate (detail_state = 'pending' AND detail_pending_until
-- IS NULL OR <= now) has no index, so every run scans the whole call_logs table.
-- This partial index holds only pending rows, which are few. Legacy pending rows
-- with a NULL deadline stay indexed, so they are still recovered. Additive only.

CREATE INDEX IF NOT EXISTS idx_cl_detail_pending
  ON call_logs(detail_pending_until)
  WHERE detail_state = 'pending';
