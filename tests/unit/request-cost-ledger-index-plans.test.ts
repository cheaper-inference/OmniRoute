// The request_cost_ledger reads that run synchronously before a request (the
// monthly USD quota SUM, the web-search spend SUM) and the by-run cost lookup
// must be answered from the indexes migration 226 adds: the covering
// (api_key_id, timestamp, success, service_tier, amount_usd) index and the
// request_id index. Each test captures the SQL the application actually runs,
// with its parameters, and checks that statement's EXPLAIN QUERY PLAN.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ledger-index-plans-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "ledger-index-plans-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const costLedger = await import("../../src/lib/db/costLedger.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const keyQuotaDb = await import("../../src/lib/db/keyQuota.ts");
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");

rateLimiter.setRateLimiterTestMode(true);

type Captured = { sql: string; params: unknown[] };

/** Run `fn` and return every statement it executed against request_cost_ledger, with its parameters. */
async function captureLedgerReads<T>(fn: () => T | Promise<T>) {
  const db = core.getDbInstance() as SqliteAdapter;
  const original = db.prepare;
  const captured: Captured[] = [];
  db.prepare = function (sql: string) {
    const stmt = original.call(this, sql);
    if (!sql.includes("request_cost_ledger")) return stmt;
    const record =
      (method: "get" | "all" | "run") =>
      (...params: unknown[]) => {
        captured.push({ sql, params });
        return (stmt[method] as (...args: unknown[]) => unknown)(...params);
      };
    return { run: record("run"), get: record("get"), all: record("all") } as typeof stmt;
  };
  try {
    const result = await fn();
    return { result, captured };
  } finally {
    db.prepare = original;
  }
}

// The read must seek the covering index on both key columns, not just name it.
function assertCoverSearch(plan: string[]) {
  assert.ok(
    plan.some((detail) =>
      /^SEARCH .*USING COVERING INDEX idx_rcl_api_key_ts_cover \(api_key_id=\? AND timestamp[<>]/.test(
        detail
      )
    ),
    `expected a covering-index seek on (api_key_id, timestamp), got: ${JSON.stringify(plan)}`
  );
}

function planOf(read: Captured): string[] {
  const db = core.getDbInstance() as SqliteAdapter;
  return (
    db.prepare(`EXPLAIN QUERY PLAN ${read.sql}`).all(...read.params) as Array<{ detail: string }>
  ).map((row) => row.detail);
}

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function seedLedger(apiKeyId: string, rows: number, amountUsd: number, timestamp: string) {
  costLedger.recordLedgerEntries(
    Array.from({ length: rows }, (_, i) => ({
      apiKeyId,
      provider: "openai",
      model: "gpt-4o",
      amountUsd,
      success: i % 7 !== 0,
      serviceTier: i % 3 === 0 ? costLedger.SEARCH_LEDGER_SERVICE_TIER : "standard",
      timestamp,
      requestId: `${apiKeyId}-req-${i}`,
    }))
  );
}

async function loadPolicy(label: string) {
  const modulePath = path.join(process.cwd(), "src/shared/utils/apiKeyPolicy.ts");
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

function chatRequest(apiKey: string) {
  return new Request("http://localhost/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
}

test("the monthly quota gate in enforceApiKeyPolicy reads the ledger from the covering index", async () => {
  const created = await apiKeysDb.createApiKey("Monthly cap", "machine-226");
  keyQuotaDb.upsertKeyQuotaLimits(created.id, { monthlyAmountUsd: 100 });
  const now = new Date().toISOString();
  seedLedger(created.id, 70, 1, now);
  seedLedger("other-key", 70, 1, now);
  const policy = await loadPolicy("monthly-cover");

  const under = await captureLedgerReads(() =>
    policy.enforceApiKeyPolicy(chatRequest(created.key), "openai/gpt-4o")
  );
  assert.equal(under.result.rejection, null, "60 successful dollars stay under a $100 cap");
  const monthly = under.captured.filter((read) => read.sql.includes("SUM(amount_usd)"));
  assert.equal(monthly.length, 1, `one ledger SUM per request: ${JSON.stringify(under.captured)}`);
  const plan = planOf(monthly[0]);
  assertCoverSearch(plan);

  keyQuotaDb.upsertKeyQuotaLimits(created.id, { monthlyAmountUsd: 60 });
  const over = await captureLedgerReads(() =>
    policy.enforceApiKeyPolicy(chatRequest(created.key), "openai/gpt-4o")
  );
  assert.equal(over.result.rejection?.status, 429, "the cap still blocks at $60 of $60");
});

test("the search-spend read is answered from the covering index", async () => {
  const now = new Date();
  seedLedger("key-search", 30, 0.5, now.toISOString());
  const since = new Date(now.getTime() - 86_400_000).toISOString();
  const { result, captured } = await captureLedgerReads(() =>
    costLedger.sumSearchLedgerSpendSince("key-search", since)
  );
  assert.equal(result, 5, "10 search rows x $0.50, failed ones included");
  const plan = planOf(captured[0]);
  assertCoverSearch(plan);
});

test("by-run cost lookup probes the ledger by request_id instead of scanning it", async () => {
  const db = core.getDbInstance() as SqliteAdapter;
  seedLedger("key-run", 50, 0.1, "2026-09-14T00:00:00.000Z");
  const insertLog = db.prepare(
    "INSERT INTO call_logs (id, timestamp, provider, model, correlation_id, session_tag) VALUES (?, ?, 'openai', 'gpt-4o', ?, ?)"
  );
  for (let i = 0; i < 50; i++) {
    insertLog.run(
      `log-${i}`,
      "2026-09-14T00:00:00.000Z",
      `key-run-req-${i}`,
      i < 3 ? "run-a" : "run-b"
    );
  }
  const { result, captured } = await captureLedgerReads(() =>
    costLedger.getCostBySessionTag("run-a")
  );
  assert.deepEqual(result.map((row) => row.requestId).sort(), [
    "key-run-req-0",
    "key-run-req-1",
    "key-run-req-2",
  ]);
  const plan = planOf(captured[0]);
  assert.ok(
    plan.some((detail) => detail.includes("USING INDEX idx_rcl_request_id")),
    `expected a request_id probe, got: ${JSON.stringify(plan)}`
  );
  assert.ok(
    !plan.some((detail) => /^SCAN r\b/.test(detail)),
    `the ledger must not be scanned: ${JSON.stringify(plan)}`
  );
});

test("observed ledger totals and evidence come from one SQLite snapshot", async () => {
  costLedger.recordLedgerEntry({
    apiKeyId: "snapshot-fixture",
    provider: "synthetic",
    model: "fixture",
    amountUsd: 0.25,
    timestamp: "2026-01-01T00:00:00Z",
    usageEvidence: {
      input: { source: "reported" },
      output: { source: "estimated", method: "characters" },
      cacheRead: { source: "unknown" },
      cacheCreation: { source: "unknown" },
    },
  });
  const { result, captured } = await captureLedgerReads(() =>
    costLedger.aggregateLedger("snapshot-fixture", "2025-01-01")
  );
  assert.equal(
    captured.length,
    1,
    "totals and provenance must not observe different concurrent snapshots"
  );
  assert.match(captured[0].sql, /SUM\(amount_usd\)/);
  assert.match(captured[0].sql, /estimated_count/);
  assert.equal(result.amountUsd, 0.25);
  assert.equal(result.requestCount, 1);
  assert.equal(result.costEstimated, true);
});
