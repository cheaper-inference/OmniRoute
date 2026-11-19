import type { SqliteAdapter } from "./adapters/types";

/** Cloud bootstrap has no filesystem migrations. Never backfill old evidence. */
export function ensureUsageEvidenceSchema(db: SqliteAdapter): void {
  db.exec(`CREATE TABLE IF NOT EXISTS request_cost_ledger (
    id INTEGER PRIMARY KEY AUTOINCREMENT, api_key_id TEXT NOT NULL,
    provider TEXT NOT NULL, model TEXT NOT NULL,
    tokens_input INTEGER NOT NULL DEFAULT 0, tokens_output INTEGER NOT NULL DEFAULT 0,
    tokens_cache_read INTEGER NOT NULL DEFAULT 0, tokens_cache_creation INTEGER NOT NULL DEFAULT 0,
    tokens_reasoning INTEGER NOT NULL DEFAULT 0,
    unit_price_input REAL NOT NULL DEFAULT 0, unit_price_output REAL NOT NULL DEFAULT 0,
    amount_usd REAL NOT NULL DEFAULT 0, service_tier TEXT NOT NULL DEFAULT 'standard',
    success INTEGER NOT NULL DEFAULT 1, timestamp TEXT NOT NULL, request_id TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_rcl_api_key_timestamp ON request_cost_ledger(api_key_id, timestamp);
  CREATE INDEX IF NOT EXISTS idx_rcl_timestamp ON request_cost_ledger(timestamp);
  CREATE TABLE IF NOT EXISTS daily_usage_summary (
    id INTEGER PRIMARY KEY AUTOINCREMENT, provider TEXT NOT NULL, model TEXT NOT NULL,
    date TEXT NOT NULL, total_requests INTEGER NOT NULL DEFAULT 0,
    total_input_tokens INTEGER NOT NULL DEFAULT 0, total_output_tokens INTEGER NOT NULL DEFAULT 0,
    total_cost REAL NOT NULL DEFAULT 0.0, created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE UNIQUE INDEX IF NOT EXISTS idx_daily_usage_provider_model_date_unique
    ON daily_usage_summary(provider, model, date);`);
  const additions = {
    call_logs: { usage_evidence: "TEXT" },
    usage_history: { usage_evidence: "TEXT", usage_provenance: "TEXT" },
    request_cost_ledger: { usage_evidence: "TEXT" },
    daily_usage_summary: {
      total_cache_read_tokens: "INTEGER",
      estimated_requests: "INTEGER",
      unknown_evidence_requests: "INTEGER",
      cached_input_unknown_requests: "INTEGER",
    },
  };
  for (const [table, columns] of Object.entries(additions)) {
    const present = new Set(
      db
        .prepare<{ name: string }>(`PRAGMA table_info(${table})`)
        .all()
        .map((row) => row.name)
    );
    for (const [column, type] of Object.entries(columns)) {
      if (!present.has(column)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
    }
  }
}
