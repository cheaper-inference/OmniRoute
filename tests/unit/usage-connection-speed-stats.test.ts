import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Per-connection decode speed on the quota cards: recent successful usage_history
// rows of ONE connection, grouped by model, with the same generation-time TPS math
// as the request logger (src/shared/utils/logTps.ts).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-conn-speed-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "conn-speed-test-secret";

const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const speedStats = await import("../../src/lib/usage/connectionSpeedStats.ts");
const { summarizeConnectionSpeed } = await import("../../src/lib/usage/usageHistory/helpers.ts");
const { buildSpeedLines } =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/formatters.ts");
const usageDb = await import("../../src/lib/usageDb.ts");

const originalFetch = globalThis.fetch;

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  usageHistory.clearPendingRequests();
}

test.beforeEach(() => {
  resetStorage();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type SeedRow = {
  connectionId: string;
  model: string;
  minutesAgo: number;
  latencyMs: number;
  ttftMs: number;
  output: number;
  reasoning?: number;
  success?: boolean;
};

async function seed(rows: SeedRow[]) {
  const now = Date.now();
  for (const row of rows) {
    await usageHistory.saveRequestUsage({
      provider: "speed-provider",
      model: row.model,
      connectionId: row.connectionId,
      success: row.success ?? true,
      latencyMs: row.latencyMs,
      timeToFirstTokenMs: row.ttftMs,
      tokens: { input: 10, output: row.output, reasoning: row.reasoning ?? 0 },
      timestamp: new Date(now - row.minutesAgo * 60_000).toISOString(),
    });
  }
}

const CONN_A_ROWS: SeedRow[] = [
  // failed row (newest) -> skipped
  {
    connectionId: "conn-a",
    model: "model-x",
    minutesAgo: 0.2,
    latencyMs: 2000,
    ttftMs: 0,
    output: 900,
    success: false,
  },
  // 350 - 100 = 250 ms generation window (< 300 ms floor) -> skipped
  {
    connectionId: "conn-a",
    model: "model-x",
    minutesAgo: 0.5,
    latencyMs: 350,
    ttftMs: 100,
    output: 40,
  },
  // 300 tok / 1.5 s = 200 tok/s
  {
    connectionId: "conn-a",
    model: "model-x",
    minutesAgo: 1,
    latencyMs: 2000,
    ttftMs: 500,
    output: 300,
  },
  // reasoning-aware numerator: max(50, 200) / 1.0 s = 200 tok/s
  {
    connectionId: "conn-a",
    model: "model-y",
    minutesAgo: 2,
    latencyMs: 1200,
    ttftMs: 200,
    output: 50,
    reasoning: 200,
  },
  // 100 tok / 1.0 s = 100 tok/s
  {
    connectionId: "conn-a",
    model: "model-x",
    minutesAgo: 3,
    latencyMs: 1100,
    ttftMs: 100,
    output: 100,
  },
  // no TTFT (non-streaming): full duration 3 s -> 50 tok/s, TTFT not averaged
  {
    connectionId: "conn-a",
    model: "model-x",
    minutesAgo: 4,
    latencyMs: 3000,
    ttftMs: 0,
    output: 150,
  },
  // zero output -> skipped
  {
    connectionId: "conn-a",
    model: "model-x",
    minutesAgo: 5,
    latencyMs: 3000,
    ttftMs: 100,
    output: 0,
  },
];

const CONN_B_ROWS: SeedRow[] = [
  {
    connectionId: "conn-b",
    model: "model-x",
    minutesAgo: 0.1,
    latencyMs: 1100,
    ttftMs: 100,
    output: 9000,
  },
];

test("getConnectionSpeedStats aggregates only the target connection's successful rows, by model", async () => {
  await seed([...CONN_A_ROWS, ...CONN_B_ROWS]);

  const stats = speedStats.getConnectionSpeedStats("conn-a");
  assert.ok(stats, "expected speed stats for conn-a");
  assert.equal(stats.samples, 4);
  assert.equal(stats.lastTps, 200);
  assert.equal(stats.avgTps, 137.5);
  // sorted [50, 100, 200, 200] -> (100 + 200) / 2
  assert.equal(stats.medianTps, 150);
  // TTFT averaged only where it was recorded: (500 + 200 + 100) / 3
  assert.equal(stats.avgTtftMs, 267);

  assert.deepEqual(
    stats.byModel.map((m) => m.model),
    ["model-x", "model-y"]
  );
  const [x, y] = stats.byModel;
  assert.equal(x.samples, 3);
  assert.equal(x.avgTps, 116.67);
  assert.equal(x.lastTps, 200);
  assert.equal(x.medianTps, 100);
  assert.equal(x.avgTtftMs, 300);
  assert.equal(y.samples, 1);
  assert.equal(y.avgTps, 200);
  assert.equal(y.avgTtftMs, 200);

  const other = speedStats.getConnectionSpeedStats("conn-b");
  assert.ok(other);
  assert.equal(other.samples, 1);
  assert.equal(other.lastTps, 9000);
});

test("getConnectionSpeedStats honours the row limit (newest first) and returns null without samples", async () => {
  await seed(CONN_A_ROWS);

  // Failed rows never count toward the limit; the 3 newest successful rows are
  // sub-300 ms (skipped) / model-x 200 tok/s / model-y 200 tok/s.
  const limited = speedStats.getConnectionSpeedStats("conn-a", { limit: 3 });
  assert.ok(limited);
  assert.equal(limited.samples, 2);
  assert.equal(limited.lastTps, 200);
  assert.deepEqual(
    limited.byModel.map((m) => m.model),
    ["model-x", "model-y"]
  );

  assert.equal(speedStats.getConnectionSpeedStats("conn-missing"), null);
  assert.equal(speedStats.getConnectionSpeedStats(""), null);
  // Only the sub-300 ms row fits -> no usable sample.
  assert.equal(speedStats.getConnectionSpeedStats("conn-a", { limit: 1 }), null);
});

test("connection_id lookups are served by an index, not a table scan", () => {
  const db = core.getDbInstance();
  const plan = db
    .prepare(
      `EXPLAIN QUERY PLAN SELECT model FROM usage_history
       WHERE connection_id = ? AND success = 1 ORDER BY timestamp DESC LIMIT 20`
    )
    .all("conn-a") as Array<{ detail: string }>;
  const details = plan.map((row) => row.detail).join(" | ");
  assert.match(details, /idx_uh_connection_timestamp/);
  assert.doesNotMatch(details, /USE TEMP B-TREE FOR ORDER BY/);
});

test("summarizeConnectionSpeed is a pure reducer over newest-first rows", () => {
  assert.equal(summarizeConnectionSpeed([]), null);
  const stats = summarizeConnectionSpeed([
    { model: null, latency_ms: 1100, ttft_ms: 100, tokens_output: 50, tokens_reasoning: 0 },
    { model: "m", latency_ms: 2100, ttft_ms: 100, tokens_output: 200, tokens_reasoning: null },
  ]);
  assert.ok(stats);
  assert.equal(stats.lastTps, 50);
  assert.equal(stats.medianTps, 75);
  assert.deepEqual(
    stats.byModel.map((m) => m.model),
    ["unknown", "m"]
  );
});

test("attachConnectionSpeedStats decorates cache entries and fails open", () => {
  const caches = {
    a: { plan: "pro", fetchedAt: "2099-01-01T00:00:00.000Z" },
    b: { plan: "free" },
  };
  const fakeStats = summarizeConnectionSpeed([
    { model: "m", latency_ms: 1100, ttft_ms: 100, tokens_output: 50, tokens_reasoning: 0 },
  ]);
  const decorated = speedStats.attachConnectionSpeedStats(caches, (id) =>
    id === "a" ? fakeStats : null
  );
  assert.deepEqual(decorated.a, { ...caches.a, speed: fakeStats });
  assert.deepEqual(decorated.b, caches.b);
  assert.equal("speed" in caches.a, false, "input caches must not be mutated");

  const failOpen = speedStats.attachConnectionSpeedStats(caches, () => {
    throw new Error("db locked");
  });
  assert.deepEqual(failOpen, caches);

  assert.deepEqual(
    speedStats.withConnectionSpeedStats("a", { quotas: {} }, () => fakeStats),
    { quotas: {}, speed: fakeStats }
  );
  assert.deepEqual(
    speedStats.withConnectionSpeedStats("a", { quotas: {} }, () => {
      throw new Error("db locked");
    }),
    { quotas: {} }
  );
  assert.equal(typeof usageDb.getConnectionSpeedStats, "function");
});

test("buildSpeedLines formats at most 3 model lines with rounded tok/s and TTFT seconds", () => {
  const stats = summarizeConnectionSpeed([
    { model: "a", latency_ms: 1100, ttft_ms: 100, tokens_output: 1234, tokens_reasoning: 0 },
    { model: "b", latency_ms: 2000, ttft_ms: 0, tokens_output: 100, tokens_reasoning: 0 },
    { model: "c", latency_ms: 1100, ttft_ms: 100, tokens_output: 10, tokens_reasoning: 0 },
    { model: "d", latency_ms: 1100, ttft_ms: 100, tokens_output: 10, tokens_reasoning: 0 },
  ]);
  const lines = buildSpeedLines(stats);
  assert.equal(lines.length, 3);
  assert.deepEqual(lines[0], { model: "a", avg: 1234, last: 1234, ttft: "0.1", samples: 1 });
  assert.equal(lines[1].ttft, null, "no TTFT recorded -> null, never the full duration");
  assert.deepEqual(buildSpeedLines(null), []);
  assert.deepEqual(buildSpeedLines({ byModel: "nope" }), []);
});

test("GET /api/usage/[connectionId] and GET /api/usage/provider-limits expose speed without persisting it", async () => {
  const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
  const { getProviderLimitsCache } = await import("../../src/lib/db/providerLimits.ts");
  const { _resetClaudeUsagePollingState } = await import("../../open-sse/services/usage/claude.ts");
  const usageRoute = await import("../../src/app/api/usage/[connectionId]/route.ts");
  const limitsRoute = await import("../../src/app/api/usage/provider-limits/route.ts");

  const connection = await createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "Speed card",
    email: "speed@example.test",
    accessToken: "speed-token",
    isActive: true,
    expiresAt: "2099-01-01T00:00:00Z",
  });
  const id = connection.id as string;
  await seed([
    {
      connectionId: id,
      model: "claude-x",
      minutesAgo: 1,
      latencyMs: 2000,
      ttftMs: 500,
      output: 300,
    },
  ]);

  _resetClaudeUsagePollingState();
  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/api/oauth/usage")) {
      return Response.json({
        five_hour: { utilization: 12, resets_at: "2099-09-10T14:00:00Z" },
        seven_day: { utilization: 34, resets_at: "2099-09-16T13:00:00Z" },
      });
    }
    return new Response(null, { status: 503 });
  };

  const response = await usageRoute.GET(new Request("http://localhost/api/usage/x"), {
    params: Promise.resolve({ connectionId: id }),
  });
  assert.equal(response.status, 200);
  const usage = await response.json();
  assert.equal(usage.speed?.samples, 1);
  assert.equal(usage.speed?.lastTps, 200);
  assert.equal(usage.speed?.byModel?.[0]?.model, "claude-x");
  assert.equal(
    "speed" in (getProviderLimitsCache(id) ?? {}),
    false,
    "speed is computed at read time, never written into the provider-limits cache"
  );

  const limits = await limitsRoute.GET();
  assert.equal(limits.status, 200);
  const body = await limits.json();
  assert.equal(body.caches?.[id]?.speed?.lastTps, 200);
});
