// A non-streaming reply has no first-token moment: the whole body arrives at once. Its usage row must
// not carry a time-to-first-token (the old code wrote the total latency there), and the TTFT average
// must skip the row instead of counting it as 0 or as the latency.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import Database from "better-sqlite3";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-nonstream-no-ttft-"));
process.env.DATA_DIR = testDataDir;

process.env.APP_LOG_TO_FILE = "false";

const flag = "NONSTREAM_USAGE_NULL_TTFT_ENABLED";
const coreDb = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { recordNonStreamingUsageStats } =
  await import("../../open-sse/handlers/chatCore/nonStreamingUsageStats.ts");

type TtftRow = { ttft_ms: number | null; latency_ms: number };

function ctx(provider: string, model: string) {
  return {
    traceEnabled: false,
    provider,
    connectionId: "conn-no-ttft",
    model,
    // A fixed 2 s offset makes latency large; no assertion depends on the exact elapsed time.
    startTime: Date.now() - 2000,
    apiKeyInfo: null,
    effectiveServiceTier: "standard",
    isCombo: false,
    comboStrategy: null,
  } as Parameters<typeof recordNonStreamingUsageStats>[1];
}

async function waitForRow(provider: string): Promise<TtftRow> {
  const db = coreDb.getDbInstance();
  for (let i = 0; i < 2000; i++) {
    const row = db
      .prepare("SELECT ttft_ms, latency_ms FROM usage_history WHERE provider = ?")
      .get(provider) as TtftRow | undefined;
    if (row) return row;
    await new Promise((resolve) => setImmediate(resolve));
  }
  throw new Error(`no usage row for ${provider}`);
}

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("flag on: non-streaming success stores NULL TTFT", async (t) => {
  t.after(() => {
    delete process.env[flag];
  });
  process.env[flag] = "true";
  recordNonStreamingUsageStats({ prompt_tokens: 10, completion_tokens: 5 }, ctx("nt-row", "m"));
  const row = await waitForRow("nt-row");
  assert.ok(row.latency_ms >= 2000, "latency is still recorded");
  assert.equal(row.ttft_ms, null);
});

test("flag on: the TTFT average skips new non-streaming rows", async (t) => {
  t.after(() => {
    delete process.env[flag];
  });
  process.env[flag] = "true";
  // One streaming row with a measured TTFT of 100 ms, one non-streaming row.
  await usageHistory.saveRequestUsage({
    provider: "nt-avg",
    model: "m",
    success: true,
    latencyMs: 1000,
    timeToFirstTokenMs: 100,
    tokens: { output: 50 },
  });
  recordNonStreamingUsageStats({ prompt_tokens: 10, completion_tokens: 50 }, ctx("nt-avg", "m"));
  const db = coreDb.getDbInstance();
  for (let i = 0; i < 2000; i++) {
    const n = (
      db.prepare("SELECT COUNT(*) AS n FROM usage_history WHERE provider = ?").get("nt-avg") as {
        n: number;
      }
    ).n;
    if (n >= 2) break;
    await new Promise((resolve) => setImmediate(resolve));
  }
  const stats = await usageHistory.getModelLatencyStats({ windowHours: 1 });
  const entry = stats["nt-avg/m"];
  assert.ok(entry, "latency stats entry exists");
  assert.equal(entry.totalRequests, 2);
  assert.equal(entry.avgTtftMs, 100);
});

test("the connection speed summary skips a NULL TTFT instead of averaging it as 0", async () => {
  const { summarizeConnectionSpeed } = await import("../../src/lib/usage/usageHistory/helpers.ts");
  const stats = summarizeConnectionSpeed([
    { model: "m", latency_ms: 2000, ttft_ms: null, tokens_output: 50, tokens_reasoning: 0 },
    { model: "m", latency_ms: 2000, ttft_ms: 400, tokens_output: 50, tokens_reasoning: 0 },
  ] as Parameters<typeof summarizeConnectionSpeed>[0]);
  assert.equal(stats?.samples, 2);
  assert.equal(stats?.avgTtftMs, 400);
});

test("a writer that passes no TTFT keeps the old latency fallback", async () => {
  await usageHistory.saveRequestUsage({
    provider: "nt-other",
    model: "m",
    success: true,
    latencyMs: 777,
    tokens: { output: 1 },
  });
  const row = await waitForRow("nt-other");
  assert.equal(row.ttft_ms, 777);
});

test("flag off: non-streaming success keeps total latency as TTFT", async (t) => {
  t.after(() => {
    delete process.env[flag];
  });
  process.env[flag] = "false";
  recordNonStreamingUsageStats({ prompt_tokens: 10, completion_tokens: 5 }, ctx("nt-off", "m"));
  const row = await waitForRow("nt-off");
  assert.ok(row.latency_ms >= 2000);
  assert.ok(row.ttft_ms != null && row.ttft_ms >= row.latency_ms);
});

test("an explicit zero TTFT is still saved as zero", async () => {
  await usageHistory.saveRequestUsage({
    provider: "nt-zero",
    model: "m",
    success: false,
    latencyMs: 777,
    timeToFirstTokenMs: 0,
    tokens: { output: 1 },
  });
  assert.equal((await waitForRow("nt-zero")).ttft_ms, 0);
});

test("flag on: the retry preserves the original NULL even if the flag changes", async (t) => {
  t.after(() => {
    delete process.env[flag];
  });
  process.env[flag] = "true";
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const provider = "nt-retry";
  const db = coreDb.getDbInstance();
  const query = db.prepare("SELECT ttft_ms, latency_ms FROM usage_history WHERE provider = ?");
  const locker = new Database(path.join(testDataDir, "storage.sqlite"));
  try {
    locker.exec("BEGIN IMMEDIATE");
    recordNonStreamingUsageStats({ prompt_tokens: 10, completion_tokens: 5 }, ctx(provider, "m"));
    assert.equal(query.get(provider), undefined, "the immediate write met the SQLite lock");
    locker.exec("ROLLBACK");
    process.env[flag] = "false";
    t.mock.timers.tick(1000);
    const row = query.get(provider) as TtftRow | undefined;
    assert.ok(row, "the deferred write persisted the usage row");
    assert.ok(row.latency_ms >= 2000);
    assert.equal(row.ttft_ms, null);
  } finally {
    locker.close();
  }
});
