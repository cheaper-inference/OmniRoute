-- Migration: agentic_conversations_fingerprint_last_seen_index
-- Version:   20261117112335 (UTC YYYYMMDDHHMMSS; creation order, not merge order)
--
-- The conversation tracker reads a fingerprint bucket's most recently seen
-- conversations on every tracked request:
--   findAgenticConversationsByFingerprint   ... WHERE fingerprint_hash = ? ORDER BY last_seen_at DESC LIMIT 20
--   contentCandidatesSql (bucket subquery)   ... WHERE fingerprint_hash = ? ORDER BY last_seen_at DESC LIMIT ?
-- With only idx_agentic_conversations_fingerprint (migration 155) SQLite reads
-- every row of the bucket and sorts it in a temp B-tree before applying LIMIT.
-- A client that sends many single-turn requests with one API key, one model and
-- no tools keeps a single bucket: one bucket of ~770k rows made each lookup take
-- ~1.8 s on an idle process, synchronously on the event loop, on every request.
-- (fingerprint_hash, last_seen_at) lets both queries read the newest rows
-- straight from the index and stop at LIMIT.
CREATE INDEX IF NOT EXISTS idx_agentic_conversations_fingerprint_last_seen
  ON agentic_conversations(fingerprint_hash, last_seen_at);

-- The new index's leading column covers every fingerprint_hash = ? lookup the
-- single-column index served, so drop it instead of maintaining both on writes.
DROP INDEX IF EXISTS idx_agentic_conversations_fingerprint;
