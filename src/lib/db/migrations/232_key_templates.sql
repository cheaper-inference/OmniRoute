-- Reusable secret-free key policy snapshots.
CREATE TABLE IF NOT EXISTS key_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  revision INTEGER NOT NULL DEFAULT 1 CHECK (revision > 0),
  schema_version INTEGER NOT NULL DEFAULT 1,
  policy TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_key_templates_name ON key_templates(name COLLATE NOCASE);
