import { after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "token-ledger-indexes-218-"));
// Static imports would evaluate src/lib/db/core.ts before DATA_DIR points at the temp dir,
// binding the singleton to the developer's real database.
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const { getBalance, getHistory, transferTokens } = await import("../../src/lib/db/gamification.ts");

const db = core.getDbInstance();

type PlanRow = { detail: string };

function planRows(sql: string, ...params: unknown[]): string {
  return (db.prepare(`EXPLAIN QUERY PLAN ${sql}`).all(...params) as PlanRow[])
    .map((row) => row.detail)
    .join(" | ");
}

beforeEach(() => {
  db.exec("DELETE FROM token_ledger");
});

after(() => {
  core.closeDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("migration 218 created one index per direction", () => {
  const names = (db.prepare("PRAGMA index_list(token_ledger)").all() as Array<{ name: string }>)
    .map((row) => row.name)
    .filter((name) => name.startsWith("idx_token_ledger_"))
    .sort();
  assert.deepEqual(names, ["idx_token_ledger_from_created", "idx_token_ledger_to_created"]);
});

test("credit and debit lookups use their indexes instead of a table scan", () => {
  const received = planRows(
    "SELECT COALESCE(SUM(amount), 0) FROM token_ledger WHERE to_api_key_id = ?",
    "key-a"
  );
  assert.match(received, /idx_token_ledger_to_created/);
  assert.doesNotMatch(received, /SCAN token_ledger/);

  const sent = planRows(
    "SELECT COALESCE(SUM(amount), 0) FROM token_ledger WHERE from_api_key_id = ?",
    "key-a"
  );
  assert.match(sent, /idx_token_ledger_from_created/);
  assert.doesNotMatch(sent, /SCAN token_ledger/);
});

test("history read resolves the OR through both indexes instead of a table scan", () => {
  const history = planRows(
    `SELECT * FROM token_ledger
     WHERE from_api_key_id = ? OR to_api_key_id = ?
     ORDER BY created_at DESC, id DESC LIMIT ?`,
    "key-a",
    "key-a",
    10
  );
  assert.match(history, /MULTI-INDEX OR/);
  assert.match(history, /idx_token_ledger_from_created/);
  assert.match(history, /idx_token_ledger_to_created/);
  assert.doesNotMatch(history, /SCAN token_ledger/);
});

test("getBalance nets credited against debited and getHistory orders newest first", () => {
  db.prepare(
    "INSERT INTO token_ledger (from_api_key_id, to_api_key_id, amount, reason, idempotency_key, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run("key-a", "key-b", 30, "gift", "idem-1", "2026-10-22 10:00:00");
  db.prepare(
    "INSERT INTO token_ledger (from_api_key_id, to_api_key_id, amount, reason, idempotency_key, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run("key-c", "key-a", 80, "gift", "idem-2", "2026-10-22 11:00:00");

  assert.equal(getBalance("key-a"), 50);
  assert.deepEqual(
    getHistory("key-a", 10).map((row) => row.idempotencyKey),
    ["idem-2", "idem-1"]
  );
});

test("transferTokens still rejects an overdraft on the indexed balance read", () => {
  db.prepare(
    "INSERT INTO token_ledger (from_api_key_id, to_api_key_id, amount, reason, idempotency_key, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run("key-c", "key-a", 10, "gift", "seed", "2020-01-01 00:00:00");

  const rejected = transferTokens("key-a", "key-b", 11, "overdraft", "idem-overdraft");
  assert.deepEqual(rejected, { success: false, error: "insufficient_balance" });
  assert.equal(getBalance("key-a"), 10);
  assert.equal(getHistory("key-a", 10).length, 1);

  const accepted = transferTokens("key-a", "key-b", 10, "settle", "idem-settle");
  assert.deepEqual(accepted, { success: true });
  assert.equal(getBalance("key-a"), 0);
  assert.equal(getBalance("key-b"), 10);
  assert.deepEqual(
    getHistory("key-a", 10).map((row) => row.idempotencyKey),
    ["idem-settle", "seed"]
  );
});
