/**
 * In an operator-ordered combo (priority / fill-first) the context-cache pin must not keep a
 * session on a fallback target for good. Before this fix, one rate-limited turn on the primary
 * pinned the session to the fallback for its lifetime (for example a paid API-key fallback
 * behind a subscription primary). The pin still wins while its prompt cache is warm; once the
 * cache has expired and the higher-priority target is ready, the combo order applies again.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pin-ordered-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "pin-ordered-test-secret";

const {
  tryPinnedModelDispatch,
  connectionsReadyNow,
  pinCacheExpired,
  pinFallbackDwellExceeded,
  PIN_FALLBACK_MAX_DWELL_MS,
} = await import("../../open-sse/services/combo/dispatchPrelude.ts");
const { resolveComboSetupConfig } = await import("../../open-sse/services/comboConfig.ts");
const { createProviderConnection, updateProviderConnection } =
  await import("../../src/lib/db/providers.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { recordSessionModelUsage, getLastSessionModelUsage } =
  await import("../../src/lib/db/contextHandoffs.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
});

function testLog() {
  const records: string[] = [];
  return {
    records,
    log: {
      info: (_s: string, m: string) => records.push(m),
      warn: (_s: string, m: string) => records.push(m),
      debug: () => {},
      error: () => {},
    },
  };
}

const ok = () =>
  new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content: "ok" } }] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

async function setup(prefix: string, strategy: string) {
  const primary = await createProviderConnection({
    provider: `${prefix}-sub`,
    authType: "api-key",
    name: "primary",
    isActive: true,
    apiKey: "sk-test-primary",
  });
  await createProviderConnection({
    provider: `${prefix}-api`,
    authType: "api-key",
    name: "fallback",
    isActive: true,
    apiKey: "sk-test-fallback",
  });
  invalidateDbCache();
  const combo = {
    name: `${prefix}-combo`,
    strategy,
    models: [
      { id: "s1", model: `${prefix}-sub/sol` },
      { id: "s2", model: `${prefix}-api/sol` },
    ],
    config: {},
  };
  return { combo, primary, fallbackModel: `${prefix}-api/sol` };
}

const MINUTE = 60_000;

async function dispatch(
  combo: Record<string, unknown>,
  pinnedModel: string,
  pinnedModelUsedAtMs: number | null = Date.now() - 30 * MINUTE,
  extraBody: Record<string, unknown> = {},
  pinnedModelSinceMs: number | null = null
) {
  const { log, records } = testLog();
  const calls: string[] = [];
  const res = await tryPinnedModelDispatch({
    body: { messages: [{ role: "user", content: "hi" }], ...extraBody },
    combo,
    pinnedModel,
    pinnedModelUsedAtMs,
    pinnedModelSinceMs,
    allCombos: [combo],
    config: resolveComboSetupConfig(combo, {}),
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async (_body, model) => {
      calls.push(model as string);
      return ok();
    },
    log,
  });
  return { res, calls, records };
}

test("fill-first: a fallback pin whose cache expired is released when the primary is ready", async () => {
  const { combo, fallbackModel } = await setup("pinord-a", "fill-first");
  const { res, calls, records } = await dispatch(combo, fallbackModel);
  assert.equal(res, null, "must fall through to the combo order");
  assert.deepEqual(calls, [], "must not dispatch to the pinned fallback");
  assert.ok(records.some((m) => m.includes("prompt cache has expired")));
});

test("fill-first: a fallback pin with a warm cache stands even when the primary is ready", async () => {
  const { combo, fallbackModel } = await setup("pinord-e", "fill-first");
  const { res, calls } = await dispatch(combo, fallbackModel, Date.now() - 2 * MINUTE);
  assert.ok(res, "the pin must be served to keep the cache");
  assert.deepEqual(calls, [fallbackModel]);
});

test("fill-first: #20829 repro - a busy session (fresh pin) goes back to a ready primary after the 30 minute ceiling", async () => {
  const { combo, fallbackModel } = await setup("pinord-h", "fill-first");
  // Last turn 2 s ago (cache warm, session active), but on the fallback for 31 minutes.
  const { res, calls, records } = await dispatch(
    combo,
    fallbackModel,
    Date.now() - 2_000,
    {},
    Date.now() - 31 * MINUTE
  );
  assert.equal(res, null, "must fall through to the combo order");
  assert.deepEqual(calls, []);
  assert.ok(records.some((m) => m.includes("dwell ceiling")));
});

test("fill-first: a busy session under the 30 minute ceiling keeps the warm fallback pin", async () => {
  const { combo, fallbackModel } = await setup("pinord-i", "fill-first");
  const { res, calls } = await dispatch(
    combo,
    fallbackModel,
    Date.now() - 2_000,
    {},
    Date.now() - 25 * MINUTE
  );
  assert.ok(res);
  assert.deepEqual(calls, [fallbackModel]);
});

test("fill-first: the 30 minute ceiling also beats 24h prompt_cache_retention", async () => {
  const { combo, fallbackModel } = await setup("pinord-j", "fill-first");
  const { res, calls } = await dispatch(
    combo,
    fallbackModel,
    Date.now() - 2_000,
    { prompt_cache_retention: "24h" },
    Date.now() - 31 * MINUTE
  );
  assert.equal(res, null);
  assert.deepEqual(calls, []);
});

test("fill-first: past the ceiling the fallback pin stands while the primary is rate limited", async () => {
  const { combo, primary, fallbackModel } = await setup("pinord-k", "fill-first");
  await updateProviderConnection(primary.id, {
    rateLimitedUntil: new Date(Date.now() + 10 * 60_000).toISOString(),
  });
  invalidateDbCache();
  const { res, calls } = await dispatch(
    combo,
    fallbackModel,
    Date.now() - 2_000,
    {},
    Date.now() - 31 * MINUTE
  );
  assert.ok(res, "no ready primary, so the pin must be served");
  assert.deepEqual(calls, [fallbackModel]);
});

test("fill-first: a fallback pin with an unknown last use stands", async () => {
  const { combo, fallbackModel } = await setup("pinord-f", "fill-first");
  const { res, calls } = await dispatch(combo, fallbackModel, null);
  assert.ok(res);
  assert.deepEqual(calls, [fallbackModel]);
});

test("fill-first: 24h prompt_cache_retention keeps the fallback pin after the default window", async () => {
  const { combo, fallbackModel } = await setup("pinord-g", "fill-first");
  const { res, calls } = await dispatch(combo, fallbackModel, Date.now() - 30 * MINUTE, {
    prompt_cache_retention: "24h",
  });
  assert.ok(res);
  assert.deepEqual(calls, [fallbackModel]);
});

test("fill-first: the fallback pin stands while the primary is rate limited", async () => {
  const { combo, primary, fallbackModel } = await setup("pinord-b", "fill-first");
  await updateProviderConnection(primary.id, {
    rateLimitedUntil: new Date(Date.now() + 10 * 60_000).toISOString(),
  });
  invalidateDbCache();
  const { res, calls } = await dispatch(combo, fallbackModel);
  assert.ok(res, "the pin must be served");
  assert.deepEqual(calls, [fallbackModel]);
});

test("fill-first: a pin on the primary is honored", async () => {
  const { combo } = await setup("pinord-c", "fill-first");
  const { res, calls } = await dispatch(combo, "pinord-c-sub/sol");
  assert.ok(res);
  assert.deepEqual(calls, ["pinord-c-sub/sol"]);
});

test("weighted: the pin is honored regardless of order", async () => {
  const { combo, fallbackModel } = await setup("pinord-d", "weighted");
  const { res, calls } = await dispatch(combo, fallbackModel);
  assert.ok(res);
  assert.deepEqual(calls, [fallbackModel]);
});

test("connectionsReadyNow: any cooldown, backoff, terminal status or open circuit is not ready", () => {
  const now = Date.now();
  const future = new Date(now + 60_000).toISOString();
  const past = new Date(now - 60_000).toISOString();
  assert.equal(connectionsReadyNow(undefined, [{}], now), true);
  assert.equal(connectionsReadyNow(undefined, [{ rateLimitedUntil: past }], now), true);
  assert.equal(connectionsReadyNow(undefined, [{ rateLimitedUntil: future }], now), false);
  assert.equal(connectionsReadyNow(undefined, [{ backoffLevel: 1 }], now), false);
  assert.equal(connectionsReadyNow(undefined, [{ testStatus: "credits_exhausted" }], now), false);
  assert.equal(connectionsReadyNow("OPEN", [{}], now), false);
  assert.equal(connectionsReadyNow(undefined, [], now), false);
});

test("pinCacheExpired: default 10-minute idle window, 24h opt-in, unknown counts as warm", () => {
  const now = Date.now();
  assert.equal(pinCacheExpired({}, now - 9 * MINUTE, now), false);
  assert.equal(pinCacheExpired({}, now - 11 * MINUTE, now), true);
  assert.equal(pinCacheExpired({ prompt_cache_retention: "24h" }, now - 11 * MINUTE, now), false);
  assert.equal(
    pinCacheExpired({ prompt_cache_retention: "24h" }, now - 25 * 60 * MINUTE, now),
    true
  );
  assert.equal(pinCacheExpired({}, null, now), false);
  assert.equal(pinCacheExpired(undefined, undefined, now), false);
});

test("pinFallbackDwellExceeded: 30 minute ceiling, unknown start counts as within it", () => {
  const now = Date.now();
  assert.equal(PIN_FALLBACK_MAX_DWELL_MS, 30 * MINUTE);
  assert.equal(pinFallbackDwellExceeded(now - 29 * MINUTE, now), false);
  assert.equal(pinFallbackDwellExceeded(now - 31 * MINUTE, now), true);
  assert.equal(pinFallbackDwellExceeded(null, now), false);
  assert.equal(pinFallbackDwellExceeded(undefined, now), false);
});

test("getLastSessionModelUsage sinceMs is the start of the current unbroken run on the model", () => {
  const db = core.getDbInstance();
  const ins = db.prepare(
    "INSERT INTO session_model_history (session_id, combo_name, model_str, provider, used_at) VALUES (?, ?, ?, ?, ?)"
  );
  ins.run("pinord-run", "pinord-run-combo", "b/sol", "b", "2026-01-01 09:00:00");
  ins.run("pinord-run", "pinord-run-combo", "a/sol", "a", "2026-01-01 10:00:00");
  ins.run("pinord-run", "pinord-run-combo", "b/sol", "b", "2026-01-01 10:05:00");
  ins.run("pinord-run", "pinord-run-combo", "b/sol", "b", "2026-01-01 10:10:00");
  ins.run("pinord-run", "pinord-run-combo", "b/sol", "b", "2026-01-01 10:40:00");
  const usage = getLastSessionModelUsage("pinord-run", "pinord-run-combo");
  assert.equal(usage?.modelStr, "b/sol");
  assert.equal(usage?.usedAtMs, Date.parse("2026-01-01T10:40:00Z"));
  assert.equal(
    usage?.sinceMs,
    Date.parse("2026-01-01T10:05:00Z"),
    "run began after the a/sol turn"
  );
  ins.run("pinord-solo", "pinord-run-combo", "c/sol", "c", "2026-01-01 08:00:00");
  ins.run("pinord-solo", "pinord-run-combo", "c/sol", "c", "2026-01-01 08:30:00");
  assert.equal(
    getLastSessionModelUsage("pinord-solo", "pinord-run-combo")?.sinceMs,
    Date.parse("2026-01-01T08:00:00Z")
  );
});

test("getLastSessionModelUsage returns the latest pin with its SQLite UTC timestamp", () => {
  const before = Date.now();
  recordSessionModelUsage("pinord-sess", "pinord-usage", "a/sol", "a");
  recordSessionModelUsage("pinord-sess", "pinord-usage", "b/sol", "b");
  const usage = getLastSessionModelUsage("pinord-sess", "pinord-usage");
  assert.equal(usage?.modelStr, "b/sol");
  assert.ok(typeof usage?.usedAtMs === "number");
  assert.ok(Math.abs((usage?.usedAtMs as number) - before) < 5_000, "used_at must parse as UTC");
  assert.equal(getLastSessionModelUsage("pinord-none", "pinord-usage"), null);
});
