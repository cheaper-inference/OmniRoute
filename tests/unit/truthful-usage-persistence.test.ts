import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "truthful-usage-"));
process.env.DATA_DIR = dir;
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { attemptWrite } = await import("../../src/lib/usage/usageWriteRetry.ts");
const { saveCallLog, getCallLogById } = await import("../../src/lib/usage/callLogs.ts");
const { mapUsageHistoryRow } = await import("../../src/lib/usage/usageHistory/helpers.ts");
const { getCallLogsForExport } = await import("../../src/lib/usage/callLogExportSource.ts");
test.after(() => {
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});
const evidence = {
  input: { source: "reported" },
  output: { source: "estimated", method: "characters" },
  cacheRead: { source: "unknown" },
  cacheCreation: { source: "reported" },
};
const tokens = {
  prompt_tokens: 12,
  completion_tokens: 3,
  cache_creation_input_tokens: 0,
  estimated: true,
  usage_evidence: evidence,
};
test("real usage writes preserve mixed evidence, NULL cache and one accounting row", () => {
  const entry = {
    provider: "synthetic",
    model: "fixture",
    tokens,
    timestamp: "2026-01-01T00:00:00.000Z",
  };
  attemptWrite(entry);
  attemptWrite(entry);
  const rows = getDbInstance().prepare("SELECT * FROM usage_history").all() as Record<
    string,
    unknown
  >[];
  assert.equal(rows.length, 1);
  assert.equal(rows[0].tokens_cache_read, null);
  assert.equal(rows[0].tokens_cache_creation, 0);
  assert.deepEqual(JSON.parse(String(rows[0].usage_evidence)), evidence);
  const mapped = mapUsageHistoryRow(rows[0]);
  assert.deepEqual(mapped.usageEvidence, evidence);
  assert.equal(mapped.tokens.cacheRead, null);
  assert.equal(mapped.estimated, true);
  assert.equal(mapped.costEstimated, true);
});
test("call reader and export retain evidence without inventing cache misses", async () => {
  await saveCallLog({
    id: "truthful-fixture",
    provider: "synthetic",
    model: "fixture",
    status: 200,
    tokens,
  });
  const row = await getCallLogById("truthful-fixture");
  assert.deepEqual(row?.usageEvidence, evidence);
  assert.equal(row?.tokens.cacheRead, null);
  const exported = getCallLogsForExport(0, 10)[0].record;
  assert.deepEqual(exported.usageEvidence, evidence);
  assert.equal(exported.tokensCacheRead, null);
});
test("historical rows do not acquire invented evidence", () => {
  const row = mapUsageHistoryRow({ tokens_cache_read: 0, tokens_cache_creation: 0 });
  assert.equal(row.usageEvidence, null);
  assert.equal(row.tokens.cacheRead, 0);
});
test("upgrade preserves legacy zeros and nullable aggregates", async () => {
  const { default: Database } = await import("better-sqlite3");
  const db = new Database(":memory:");
  try {
    db.exec(
      "CREATE TABLE call_logs(id TEXT, tokens_cache_read INTEGER); CREATE TABLE usage_history(id TEXT, tokens_cache_read INTEGER); CREATE TABLE request_cost_ledger(id TEXT);"
    );
    db.exec(
      "INSERT INTO usage_history VALUES ('legacy', 0); INSERT INTO call_logs VALUES ('legacy', 0);"
    );
    db.exec(
      fs.readFileSync(
        new URL("../../src/lib/db/migrations/238_truthful_usage_evidence.sql", import.meta.url),
        "utf8"
      )
    );
    assert.deepEqual(db.prepare("SELECT * FROM usage_history").get(), {
      id: "legacy",
      tokens_cache_read: 0,
      usage_evidence: null,
      usage_provenance: null,
    });
    db.exec("INSERT INTO usage_history(id, tokens_cache_read) VALUES ('unknown', NULL)");
    assert.deepEqual(
      db
        .prepare(
          "SELECT SUM(tokens_cache_read) AS total, COUNT(tokens_cache_read) AS known FROM usage_history WHERE id = 'unknown'"
        )
        .get(),
      { total: null, known: 0 }
    );
    assert.deepEqual(
      db
        .prepare(
          "SELECT SUM(tokens_cache_read) AS total, COUNT(tokens_cache_read) AS known FROM usage_history"
        )
        .get(),
      { total: 0, known: 1 }
    );
  } finally {
    db.close();
  }
});
test("cost ledger preserves evidence while quota amounts remain conservative", async () => {
  const { recordLedgerEntry, recordLedgerEntries, listLedgerEntries, aggregateLedger } =
    await import("../../src/lib/db/costLedger.ts");
  const e = {
    apiKeyId: "synthetic-key",
    provider: "synthetic",
    model: "fixture",
    amountUsd: 0.01,
    usageEvidence: tokens.usage_evidence as Parameters<
      typeof recordLedgerEntry
    >[0]["usageEvidence"],
  };
  recordLedgerEntry(e);
  recordLedgerEntries([e]);
  const rows = listLedgerEntries(e.apiKeyId);
  assert.equal(rows.length, 2);
  for (const row of rows) {
    assert.deepEqual(row.usageEvidence, evidence);
    assert.equal(row.costEstimated, true);
  }
  assert.equal(aggregateLedger(e.apiKeyId, "2020-01-01").amountUsd, 0.02);
  assert.equal(aggregateLedger(e.apiKeyId, "2020-01-01").costEstimated, true);
});

test("failed history keeps success-only aggregate provenance null", () => {
  attemptWrite({
    provider: "failed-fixture",
    model: "fixture",
    success: false,
    tokens,
    timestamp: "2026-01-02T00:00:00Z",
  });
  const row = getDbInstance()
    .prepare(
      "SELECT success, usage_provenance, usage_evidence FROM usage_history WHERE provider = 'failed-fixture'"
    )
    .get() as Record<string, unknown>;
  assert.equal(row.success, 0);
  assert.equal(row.usage_provenance, null);
  assert.deepEqual(JSON.parse(String(row.usage_evidence)), evidence);
});
test("nullable cache readers keep supported numeric strings and reject invalid values", async () => {
  const { getPromptCacheReadTokensOrNull: read, getPromptCacheCreationTokensOrNull: write } =
    await import("../../src/lib/usage/tokenAccounting.ts");
  for (const value of ["9", "0", 9, 0]) {
    assert.equal(write({ cache_creation_input_tokens: value }), Number(value));
    assert.equal(read({ cache_read_input_tokens: value }), Number(value));
  }
  for (const value of ["", " ", "bad", "-1", "Infinity", -1, Infinity, null]) {
    assert.equal(write({ cache_creation_input_tokens: value }), null);
    assert.equal(read({ cache_read_input_tokens: value }), null);
  }
});
