import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-usage-actual-model-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../../src/lib/db/core.ts");
const usageHistory = await import("../../../src/lib/usage/usageHistory.ts");
const callLogs = await import("../../../src/lib/usage/callLogs.ts");

function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(reset);
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("usage_history stores both requested_model and actual_model", async () => {
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini", // fallback/actual model
    requestedModel: "gpt-4o",
    actualModel: "gpt-4o-mini",
    tokens: { input: 100, output: 50 },
    success: true,
    latencyMs: 150,
  });

  const db = core.getDbInstance();
  const row = db
    .prepare("SELECT model, requested_model, actual_model FROM usage_history LIMIT 1")
    .get() as {
    model: string;
    requested_model: string | null;
    actual_model: string | null;
  };

  assert.ok(row);
  assert.equal(row.requested_model, "gpt-4o");
  assert.equal(row.actual_model, "gpt-4o-mini");
});

test("call_logs stores both requested_model and actual_model", async () => {
  await callLogs.saveCallLog({
    id: "test-call-log-1",
    provider: "anthropic",
    model: "claude-3-5-haiku",
    requestedModel: "claude-3-7-sonnet",
    actualModel: "claude-3-5-haiku",
    status: 200,
    tokens: { input: 50, output: 25 },
  });

  const db = core.getDbInstance();
  const row = db
    .prepare(
      "SELECT model, requested_model, actual_model FROM call_logs WHERE id = 'test-call-log-1'"
    )
    .get() as {
    model: string;
    requested_model: string | null;
    actual_model: string | null;
  };

  assert.ok(row);
  assert.equal(row.requested_model, "claude-3-7-sonnet");
  assert.equal(row.actual_model, "claude-3-5-haiku");
});

test("a fresh install ends up with the actual/requested model indexes", () => {
  const db = core.getDbInstance();
  const indexes = (table: string) =>
    (db.prepare(`PRAGMA index_list(${table})`).all() as { name: string }[]).map((row) => row.name);
  assert.ok(indexes("usage_history").includes("idx_uh_actual_model"));
  assert.ok(indexes("usage_history").includes("idx_uh_requested_model"));
  assert.ok(indexes("call_logs").includes("idx_cl_actual_model"));
  const applied = db
    .prepare("SELECT version FROM _omniroute_migrations WHERE name IN (?, ?) ORDER BY version")
    .all("connection_notes_model_map", "usage_actual_model") as { version: string }[];
  assert.deepEqual(
    applied.map((row) => row.version),
    ["237", "238"]
  );
});
