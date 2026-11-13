// Scheduled retention of proxy_logs, quota_snapshots, compression_analytics,
// compression_engine_breakdown and domain_cost_history must not delete a whole backlog
// in one statement: one DELETE holds the event loop and the SQLite write lock for its
// full duration. call_logs and usage_history are covered in db-retention-batched-delete.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-retention-other-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const { getUserDatabaseSettings } = await import("../../src/lib/db/databaseSettings.ts");

const BATCH = 10_000;
const DAY_MS = 86_400_000;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function db() {
  return core.getDbInstance() as SqliteAdapter;
}

function count(table: string) {
  return (db().prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number }).n;
}

// Record how many rows each DELETE statement against `table` removed.
async function observeDeletes(table: string, fn: () => Promise<unknown>) {
  const adapter = db();
  const original = adapter.prepare;
  const perStatement: number[] = [];
  adapter.prepare = function (sql: string) {
    const stmt = original.call(this, sql);
    if (!/^\s*DELETE FROM/i.test(sql) || !sql.includes(table)) return stmt;
    return {
      ...stmt,
      get: stmt.get.bind(stmt),
      all: stmt.all.bind(stmt),
      run: (...params: unknown[]) => {
        if (perStatement.length >= 20) throw new Error(`more than 20 DELETEs on ${table}`);
        const result = (stmt.run as (...args: unknown[]) => { changes: number })(...params);
        perStatement.push(Number(result.changes));
        return result;
      },
    } as typeof stmt;
  };
  try {
    const result = await fn();
    return { result, perStatement };
  } finally {
    adapter.prepare = original;
  }
}

function seed(sql: string, rows: Array<unknown[]>) {
  const insert = db().prepare(sql);
  db().exec("BEGIN");
  for (const row of rows) insert.run(...row);
  db().exec("COMMIT");
}

function many(n: number, make: (i: number) => unknown[]) {
  return Array.from({ length: n }, (_, i) => make(i));
}

const iso = (days: number) => new Date(Date.now() - days * DAY_MS).toISOString();

const retention = getUserDatabaseSettings().retention;

const CASES = [
  {
    table: "proxy_logs",
    run: () => cleanup.cleanupProxyLogs(),
    seed: (days: number, n: number, tag: string) =>
      seed(
        "INSERT INTO proxy_logs (id, timestamp) VALUES (?, ?)",
        many(n, (i) => [`${tag}-${i}`, iso(days)])
      ),
    old: retention.callLogs + 5,
  },
  {
    table: "quota_snapshots",
    run: () => cleanup.cleanupQuotaSnapshots(),
    seed: (days: number, n: number) =>
      seed(
        "INSERT INTO quota_snapshots (provider, connection_id, window_key, created_at) VALUES ('p', 'c', 'w', ?)",
        many(n, () => [iso(days)])
      ),
    old: retention.quotaSnapshots + 5,
  },
  {
    table: "compression_analytics",
    run: () => cleanup.cleanupCompressionAnalytics(),
    seed: (days: number, n: number) =>
      seed(
        "INSERT INTO compression_analytics (timestamp, mode, original_tokens, compressed_tokens, tokens_saved) VALUES (?, 'm', 1, 1, 0)",
        many(n, () => [iso(days)])
      ),
    old: retention.compressionAnalytics + 5,
  },
  {
    table: "compression_engine_breakdown",
    run: () => cleanup.cleanupCompressionEngineBreakdown(),
    seed: (days: number, n: number) => {
      db().exec(`CREATE TABLE IF NOT EXISTS compression_engine_breakdown (
        id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp TEXT NOT NULL, request_id TEXT,
        engine TEXT NOT NULL, original_tokens INTEGER NOT NULL DEFAULT 0,
        compressed_tokens INTEGER NOT NULL DEFAULT 0, tokens_saved INTEGER NOT NULL DEFAULT 0,
        duration_ms INTEGER)`);
      seed(
        "INSERT INTO compression_engine_breakdown (timestamp, engine) VALUES (?, 'rtk')",
        many(n, () => [iso(days)])
      );
    },
    old: retention.compressionAnalytics + 5,
  },
  {
    table: "domain_cost_history",
    run: () => cleanup.cleanupDomainCostHistory(),
    seed: (days: number, n: number) =>
      seed(
        "INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES ('k', 1, ?)",
        many(n, () => [Date.now() - days * DAY_MS])
      ),
    old: retention.domainCostHistory + 5,
  },
];

for (const c of CASES) {
  test(`${c.table} retention deletes a backlog in batches of at most 10,000 rows`, async () => {
    c.seed(c.old, 25_000, "old");
    c.seed(0, 50, "new");

    const { result, perStatement } = await observeDeletes(c.table, c.run);

    assert.deepEqual(result, { deleted: 25_000, errors: 0 });
    assert.equal(count(c.table), 50, "rows inside the retention window stay");
    assert.deepEqual(perStatement, [BATCH, BATCH, 5_000]);
  });
}
