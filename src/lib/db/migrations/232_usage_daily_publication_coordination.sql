-- Fenced, expiring ownership allows a crashed daily publisher to be retried.
ALTER TABLE rollup_state ADD COLUMN reading_token TEXT;
ALTER TABLE rollup_state ADD COLUMN reading_expires_at INTEGER;

-- Keep allocation and reset fencing independent of individual dirty-day rows.
CREATE TABLE IF NOT EXISTS rollup_revision_counter (
  singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
  revision INTEGER NOT NULL,
  reset_generation INTEGER NOT NULL DEFAULT 0
);
INSERT OR IGNORE INTO rollup_revision_counter (singleton, revision)
SELECT 1, COALESCE(MAX(revision), 0) FROM rollup_dirty_day;

-- Keep per-day versions after publication: deleting them would allow null ABA.
ALTER TABLE rollup_dirty_day ADD COLUMN published_revision INTEGER NOT NULL DEFAULT 0;
