-- 223: queue wait on call-log rows — ms from the serving execution's start to
-- the first executor invocation (scheduling, translation, account selection,
-- parking). Complements added_wait_ms (deliberate pacing/park wait only).
-- It does not include setup inside the executor or measure the first byte
-- on the network. NULL for rows written before this migration and for
-- requests that never invoked an executor.

ALTER TABLE call_logs ADD COLUMN queue_wait_ms INTEGER DEFAULT NULL;
