-- Resumable repricing job for request_cost_ledger (OMNIROUTE_USAGE_REPRICE_JOB_ENABLED, default off).
-- One row holds the keyset cursor (timestamp, id) and the running totals. The job moves the cursor in
-- the same transaction as the rows it reprices, so a restart resumes without skipping or repeating rows.
CREATE TABLE IF NOT EXISTS cost_reprice_cursor (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  last_timestamp TEXT NOT NULL DEFAULT '',
  last_id INTEGER NOT NULL DEFAULT 0,
  scanned_total INTEGER NOT NULL DEFAULT 0,
  repriced_total INTEGER NOT NULL DEFAULT 0,
  refused_total INTEGER NOT NULL DEFAULT 0,
  unpriced_total INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT
);
INSERT OR IGNORE INTO cost_reprice_cursor (id) VALUES (1);
