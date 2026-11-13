// A non-streaming reply has no first-token moment: the whole body arrives at once. Its usage row must
// not carry a time-to-first-token (the old code wrote the total latency there), and the TTFT average
// must skip the row instead of counting it as 0 or as the latency.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-nonstream-no-ttft-"));
process.env.DATA_DIR = testDataDir;

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

test("a non-streaming usage row stores no TTFT (NULL, not the latency, not 0)", async () => {
  recordNonStreamingUsageStats({ prompt_tokens: 10, completion_tokens: 5 }, ctx("nt-row", "m"));
  const row = await waitForRow("nt-row");
  assert.ok(row.latency_ms >= 2000, "latency is still recorded");
  assert.equal(row.ttft_ms, null);
});

test("the TTFT average skips a non-streaming row", async () => {
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
