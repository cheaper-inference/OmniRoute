-- 215: queue wait on call-log rows — ms from the serving execution's start to
-- the first upstream dispatch (scheduling, translation, account selection,
-- parking). Complements added_wait_ms (deliberate pacing/park wait only):
-- queue_wait_ms is the total pre-dispatch wait, so rows show both what the
-- proxy deliberately imposed and what the pipeline as a whole cost before the
-- first byte left for the provider. NULL for rows written before this
-- migration and for rows rejected before any egress.

ALTER TABLE call_logs ADD COLUMN queue_wait_ms INTEGER DEFAULT NULL;
