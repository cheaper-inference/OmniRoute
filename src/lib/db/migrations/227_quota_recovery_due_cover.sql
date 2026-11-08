-- 227_quota_recovery_due_cover.sql
-- Each scheduler tick runs two reads over the due tickets. Each row can carry
-- about 1 MiB of encrypted request, and expires_at sits after both ciphertext
-- columns.
--
-- 1. listDueQuotaRecoveryTickets() ranks every due row per key and has to skip
--    expired ones. With the (state, next_attempt_at) index from 217 that means
--    walking the overflow pages of every due payload on each tick.
-- 2. expireQuotaRecoveryTickets() reads expires_at the same way for every
--    active row.
--
-- With expires_at and api_key_id in the index both reads, and the per-key
-- count in enqueueQuotaRecoveryTicket(), are answered from the index alone. A
-- row is only read once it wins a batch slot or has really expired.
--
-- The name stays because enqueueQuotaRecoveryTicket() pins it with INDEXED BY.
-- 217 is the only place that creates it. The old index is dropped before the
-- new one is built so the build reuses its pages. The runner applies this file
-- in one transaction, so readers never see the table without the index.
--
-- Cost: the build reads expires_at past each stored payload once, on upgrade.
-- Finished tickets have no payload. Every statement is idempotent.

DROP INDEX IF EXISTS idx_quota_recovery_due;
CREATE INDEX IF NOT EXISTS idx_quota_recovery_due
  ON quota_recovery_tickets (state, next_attempt_at, expires_at, api_key_id);
