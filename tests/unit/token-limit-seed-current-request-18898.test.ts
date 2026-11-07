import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-18898-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const tokenLimits = await import("../../src/lib/db/tokenLimits.ts");
const counter = await import("../../open-sse/services/tokenLimitCounter.ts");
const { recordNonStreamingUsageStats } =
  await import("../../open-sse/handlers/chatCore/nonStreamingUsageStats.ts");
const { recordStreamingUsageStats } =
  await import("../../open-sse/handlers/chatCore/streamingUsageStats.ts");

const flush = async () => {
  for (let i = 0; i < 5; i++) await new Promise((r) => setImmediate(r));
};

// Daily windows start at 00:00 UTC. A fixed mid-window clock keeps every timestamp below
// in one window, whatever time the suite runs at.
const MID_WINDOW = Date.UTC(2026, 5, 15, 12, 0, 0);

test.beforeEach(() => {
  mock.timers.enable({ apis: ["Date"], now: MID_WINDOW });
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  counter.clearTokenLimitCache();
});

test.afterEach(() => {
  mock.timers.reset();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function dailyModelLimit(apiKeyId: string) {
  return tokenLimits.upsertTokenLimit({
    apiKeyId,
    scopeType: "model",
    scopeValue: "gpt-4o",
    tokenLimit: 1_000_000,
    resetInterval: "daily",
  });
}

const usage = { prompt_tokens: 70, completion_tokens: 30, total_tokens: 100 };

test("#18898 first non-streaming request of a cold window is counted once", async () => {
  const limit = dailyModelLimit("k-ns");
  // Pre-request enforcement read on an empty window (what chatCore does).
  assert.equal(counter.checkTokenLimits("k-ns", "openai", "gpt-4o"), null);

  recordNonStreamingUsageStats(usage, {
    traceEnabled: false,
    provider: "openai",
    connectionId: null,
    model: "gpt-4o",
    startTime: Date.now() - 50,
    apiKeyInfo: { id: "k-ns", name: "k-ns" },
    effectiveServiceTier: "default" as never,
    isCombo: false,
    comboStrategy: null,
  });
  await flush();

  assert.equal(counter.seedWindowUsageFromHistory(limit), 100, "usage_history holds the request");
  assert.equal(tokenLimits.getWindowUsage(limit, Date.now()), 100);

  // A second request keeps accumulating once per request.
  recordNonStreamingUsageStats(usage, {
    traceEnabled: false,
    provider: "openai",
    connectionId: null,
    model: "gpt-4o",
    startTime: Date.now() - 50,
    apiKeyInfo: { id: "k-ns", name: "k-ns" },
    effectiveServiceTier: "default" as never,
    isCombo: false,
    comboStrategy: null,
  });
  await flush();
  assert.equal(tokenLimits.getWindowUsage(limit, Date.now()), 200);
});

test("#18898 first streaming request of a cold window is counted once", async () => {
  const limit = dailyModelLimit("k-st");
  assert.equal(counter.checkTokenLimits("k-st", "openai", "gpt-4o"), null);

  recordStreamingUsageStats(usage, {
    provider: "openai",
    model: "gpt-4o",
    streamStatus: 200,
    startTime: Date.now() - 50,
    ttft: 10,
    connectionId: null,
    apiKeyInfo: { id: "k-st", name: "k-st" },
    effectiveServiceTier: "default" as never,
    isCombo: false,
    comboStrategy: null,
  } as never);
  await flush();

  assert.equal(counter.seedWindowUsageFromHistory(limit), 100);
  assert.equal(tokenLimits.getWindowUsage(limit, Date.now()), 100);
});

test("#18898 usage recorded before the request started is still seeded", async () => {
  const limit = dailyModelLimit("k-prior");
  // Usage from before the limit had a counter row (e.g. limit created mid-window).
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO usage_history (provider, model, api_key_id, tokens_input, tokens_output, success, timestamp)
       VALUES ('openai', 'gpt-4o', 'k-prior', 400, 100, 1, ?)`
    )
    .run(new Date(Date.now() - 60_000).toISOString());

  recordNonStreamingUsageStats(usage, {
    traceEnabled: false,
    provider: "openai",
    connectionId: null,
    model: "gpt-4o",
    startTime: Date.now() - 50,
    apiKeyInfo: { id: "k-prior", name: "k-prior" },
    effectiveServiceTier: "default" as never,
    isCombo: false,
    comboStrategy: null,
  });
  await flush();

  assert.equal(tokenLimits.getWindowUsage(limit, Date.now()), 600);
});
