/**
 * #11777 — scheduled model health check.
 *
 * Covers the ownership rule (restore only what the scheduler hid, never a model the
 * user hid), the failure classification shared with Test-all, rate-limit stops, and
 * the per-connection opt-in.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-11777-health-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");
const marks = await import("../../src/lib/db/modelHealthAutoHidden.ts");
const scheduler = await import("../../src/shared/services/modelHealthCheckScheduler.ts");
const classification = await import("../../src/lib/api/modelHealthClassification.ts");

type ProbeOutcome = import("../../src/lib/api/modelHealthClassification.ts").ProbeOutcome;
type HealthCheckDeps =
  import("../../src/shared/services/modelHealthCheckScheduler.ts").HealthCheckDeps;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

/** In-memory visibility store + scripted probe outcomes. */
function makeDeps(
  outcomes: Record<string, ProbeOutcome>,
  hidden: Set<string> = new Set(),
  models: string[] = Object.keys(outcomes)
): HealthCheckDeps & { hidden: Set<string>; probed: string[]; setCalls: string[] } {
  const probed: string[] = [];
  const setCalls: string[] = [];
  return {
    hidden,
    probed,
    setCalls,
    listModelIds: async () => models,
    probe: async (_provider, modelId) => {
      probed.push(modelId);
      return outcomes[modelId] ?? { status: "ok" };
    },
    isHidden: (_provider, modelId) => hidden.has(modelId),
    setHidden: (_provider, modelId, value) => {
      setCalls.push(`${modelId}:${value}`);
      if (value) hidden.add(modelId);
      else hidden.delete(modelId);
    },
    sleep: async () => {},
    log: () => {},
  };
}

const conn = (provider: string) => ({ id: `conn-${provider}`, provider });

test("hides a model on a non-transient failure and marks it as scheduler-hidden", async () => {
  const deps = makeDeps({ "broken-model": { status: "error", statusCode: 404, error: "nope" } });
  const result = await scheduler.runHealthCheckForConnection(conn("prov-hide"), deps);

  assert.deepEqual(result.hidden, ["broken-model"]);
  assert.equal(deps.hidden.has("broken-model"), true);
  assert.equal(marks.isHiddenByHealthCheck("prov-hide", "broken-model"), true);
});

test("restores a scheduler-hidden model once it passes again", async () => {
  marks.markHiddenByHealthCheck("prov-restore", "flaky-model");
  const deps = makeDeps({ "flaky-model": { status: "ok" } }, new Set(["flaky-model"]));
  const result = await scheduler.runHealthCheckForConnection(conn("prov-restore"), deps);

  assert.deepEqual(result.restored, ["flaky-model"]);
  assert.equal(deps.hidden.has("flaky-model"), false);
  assert.equal(marks.isHiddenByHealthCheck("prov-restore", "flaky-model"), false);
});

test("a slow but successful probe also restores a scheduler-hidden model", async () => {
  marks.markHiddenByHealthCheck("prov-slow", "slow-model");
  const deps = makeDeps({ "slow-model": { status: "slow" } }, new Set(["slow-model"]));
  const result = await scheduler.runHealthCheckForConnection(conn("prov-slow"), deps);
  assert.deepEqual(result.restored, ["slow-model"]);
});

test("NEVER restores a model the user hid, even when it passes", async () => {
  const deps = makeDeps({ "user-hidden": { status: "ok" } }, new Set(["user-hidden"]));
  const result = await scheduler.runHealthCheckForConnection(conn("prov-user"), deps);

  assert.deepEqual(result.restored, []);
  assert.equal(deps.hidden.has("user-hidden"), true);
  assert.deepEqual(deps.setCalls, []);
});

test("a manual hide/unhide clears the scheduler mark, so the user takes ownership", async () => {
  marks.markHiddenByHealthCheck("prov-takeover", "model-a");
  // The provider-models PATCH path calls this for every id it writes.
  marks.clearHealthCheckHiddenMarks("prov-takeover", ["model-a"]);

  const deps = makeDeps({ "model-a": { status: "ok" } }, new Set(["model-a"]));
  const result = await scheduler.runHealthCheckForConnection(conn("prov-takeover"), deps);
  assert.deepEqual(result.restored, []);
  assert.equal(deps.hidden.has("model-a"), true);
});

test("failing a model the user already hid does not claim ownership of it", async () => {
  const deps = makeDeps(
    { "user-hidden-broken": { status: "error", statusCode: 400 } },
    new Set(["user-hidden-broken"])
  );
  await scheduler.runHealthCheckForConnection(conn("prov-user-broken"), deps);
  assert.equal(marks.isHiddenByHealthCheck("prov-user-broken", "user-hidden-broken"), false);
  assert.deepEqual(deps.setCalls, []);
});

test("skips transient, timeout, quota, rate-limited and skipped probes", async () => {
  const deps = makeDeps({
    transient: { status: "error", statusCode: 503, isTransient: true },
    timeout: { status: "error", isTimeout: true },
    quota: { status: "error", statusCode: 403, isQuota: true },
    limited: { status: "error", statusCode: 429, rateLimited: true },
    skipped: { status: "error", skipped: true },
  });
  const result = await scheduler.runHealthCheckForConnection(conn("prov-transient"), deps);

  assert.deepEqual(result.hidden, []);
  assert.deepEqual(deps.setCalls, []);
  assert.equal(marks.getHealthCheckHiddenModelIds("prov-transient").size, 0);
});

test("a transient failure does not un-hide or re-hide a scheduler-hidden model", async () => {
  marks.markHiddenByHealthCheck("prov-keep", "m");
  const deps = makeDeps({ m: { status: "error", isTransient: true } }, new Set(["m"]));
  await scheduler.runHealthCheckForConnection(conn("prov-keep"), deps);
  assert.equal(deps.hidden.has("m"), true);
  assert.equal(marks.isHiddenByHealthCheck("prov-keep", "m"), true);
});

test("an exception thrown by the probe is treated as transient", async () => {
  const deps = makeDeps({});
  deps.listModelIds = async () => ["boom"];
  deps.probe = async () => {
    throw new Error("runner exploded");
  };
  const result = await scheduler.runHealthCheckForConnection(conn("prov-throw"), deps);
  assert.deepEqual(result.hidden, []);
  assert.equal(deps.hidden.has("boom"), false);
});

test("stops a connection's pass after consecutive rate limits", async () => {
  const limited: ProbeOutcome = { status: "error", statusCode: 429, rateLimited: true };
  const deps = makeDeps({ a: limited, b: limited, c: limited, d: { status: "ok" } });
  const result = await scheduler.runHealthCheckForConnection(conn("prov-429"), deps);

  assert.equal(result.stoppedEarly, "consecutive_rate_limits");
  assert.equal(result.tested, classification.CONSECUTIVE_RATE_LIMIT_STOP_THRESHOLD);
  assert.equal(deps.probed.includes("d"), false);
});

test("slow-probe providers pause between models and stop on bot blocks", async () => {
  const blocked: ProbeOutcome = { status: "error", statusCode: 403, error: "Just a moment" };
  const deps = makeDeps({ a: blocked, b: blocked, c: { status: "ok" } });
  const sleeps: number[] = [];
  deps.sleep = async (ms) => {
    sleeps.push(ms);
  };
  const result = await scheduler.runHealthCheckForConnection(conn("lmarena"), deps);

  assert.equal(result.stoppedEarly, "consecutive_bot_blocks");
  assert.deepEqual(sleeps, [classification.SLOW_PROBE_DELAY_MS]);
  assert.equal(deps.probed.includes("c"), false);
});

test("only opted-in connections are checked; others are untouched", async () => {
  assert.equal(scheduler.isHealthCheckEnabled({ autoHealthCheck: true }), true);
  assert.equal(scheduler.isHealthCheckEnabled({ autoHealthCheck: "true" }), false);
  assert.equal(scheduler.isHealthCheckEnabled({ autoSync: true }), false);
  assert.equal(scheduler.isHealthCheckEnabled({}), false);
  assert.equal(scheduler.isHealthCheckEnabled(null), false);

  const providers = await import("../../src/lib/db/providers.ts");
  const optedIn = await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "opted-in",
    apiKey: "sk-test-a",
    providerSpecificData: { autoHealthCheck: true },
  });
  const notOptedIn = await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "not-opted-in",
    apiKey: "sk-test-b",
    providerSpecificData: { autoSync: true },
  });

  const selected = await scheduler.getHealthCheckConnections();
  const ids = selected.map((c) => c.id);
  assert.ok(ids.includes(optedIn.id as string));
  assert.equal(ids.includes(notOptedIn.id as string), false);

  // End-to-end through the cycle: only the opted-in connection is probed.
  const probedConnections: string[] = [];
  await scheduler.runHealthCheckCycle({
    listModelIds: async () => ["gpt-x"],
    probe: async (_provider, _modelId, connectionId) => {
      probedConnections.push(connectionId);
      return { status: "ok" };
    },
    isHidden: () => false,
    setHidden: () => {},
    sleep: async () => {},
    log: () => {},
  });
  assert.deepEqual(probedConnections, [optedIn.id]);
});

test("shared classifier matches Test-all's hide criteria", () => {
  assert.equal(classification.isHideWorthyFailure({ status: "error", statusCode: 400 }), true);
  assert.equal(classification.isHideWorthyFailure({ status: "ok" }), false);
  assert.equal(
    classification.isHideWorthyFailure({ status: "error", isQuota: true, statusCode: 403 }),
    false
  );
  assert.equal(
    classification.isBotBlockedOutcome({ status: "error", isQuota: true, statusCode: 403 }),
    false
  );
});

test("interval override via MODEL_HEALTH_CHECK_INTERVAL_HOURS", () => {
  assert.equal(
    scheduler.resolveHealthCheckIntervalMs({ MODEL_HEALTH_CHECK_INTERVAL_HOURS: "3" }),
    3 * 60 * 60 * 1000
  );
  assert.equal(
    scheduler.resolveHealthCheckIntervalMs({ MODEL_HEALTH_CHECK_INTERVAL_HOURS: "nope" }),
    scheduler.MODEL_HEALTH_CHECK_DEFAULT_INTERVAL_MS
  );
});

test("a local exclusive-lease 409 rejection is a skipped probe, never a hide", async () => {
  const outcome = scheduler.mapSingleModelTestResult({
    modelId: "prov-lease/leased-model",
    status: "error",
    latencyMs: 0,
    httpStatus: 409,
    error: "Model tests are unavailable for managed lease connections",
  });
  assert.equal(outcome.skipped, true);
  assert.equal(classification.isHideWorthyFailure(outcome), false);

  const deps = makeDeps({ "leased-model": outcome });
  const result = await scheduler.runHealthCheckForConnection(conn("prov-lease"), deps);
  assert.deepEqual(result.hidden, []);
  assert.equal(deps.hidden.has("leased-model"), false);

  // A genuine upstream 409 (it carries an upstream statusCode) is still a hard failure.
  const upstream = scheduler.mapSingleModelTestResult({
    modelId: "prov-lease/real",
    status: "error",
    latencyMs: 10,
    httpStatus: 409,
    statusCode: 409,
    error: "conflict",
  });
  assert.equal(upstream.skipped, undefined);
});

test("ownership is read live: a manual takeover mid-pass is not overwritten", async () => {
  marks.markHiddenByHealthCheck("prov-live", "model-a");
  marks.markHiddenByHealthCheck("prov-live", "model-b");
  const deps = makeDeps(
    { "model-a": { status: "ok" }, "model-b": { status: "ok" } },
    new Set(["model-a", "model-b"])
  );
  // The user takes over model-b while the pass is probing model-a.
  const probe = deps.probe;
  deps.probe = async (provider, modelId, connectionId) => {
    const outcome = await probe(provider, modelId, connectionId);
    if (modelId === "model-a") marks.clearHealthCheckHiddenMarks("prov-live", ["model-b"]);
    return outcome;
  };
  const result = await scheduler.runHealthCheckForConnection(conn("prov-live"), deps);
  assert.deepEqual(result.restored, ["model-a"]);
  assert.equal(deps.hidden.has("model-b"), true);
});

test("catalogs above the per-connection cap are walked across successive cycles", async () => {
  const cap = scheduler.MODEL_HEALTH_CHECK_MAX_MODELS_PER_CONNECTION;
  const models = Array.from({ length: cap + 50 }, (_, i) => `m${i}`);
  const first = makeDeps({}, new Set(), models);
  await scheduler.runHealthCheckForConnection(conn("prov-big"), first);
  const second = makeDeps({}, new Set(), models);
  await scheduler.runHealthCheckForConnection(conn("prov-big"), second);

  assert.equal(first.probed.length, cap);
  assert.equal(first.probed[0], "m0");
  assert.equal(second.probed.length, cap);
  assert.equal(second.probed[0], `m${cap}`);
  assert.equal(new Set([...first.probed, ...second.probed]).size, models.length);
});

test("start/stop scheduler arms and clears its timers", () => {
  scheduler.startModelHealthCheckScheduler(60_000);
  scheduler.stopModelHealthCheckScheduler();
  // A second stop is a harmless no-op.
  scheduler.stopModelHealthCheckScheduler();
});

// --- #21062 review: unattended hiding must not follow connection-level failures ---

type RunnerResult = Parameters<typeof scheduler.mapSingleModelTestResult>[0];

/** The exact shape the runner's generic upstream-error branch returns (no isTransient). */
function runnerHttpError(statusCode: number, error: string): RunnerResult {
  return {
    modelId: "prov/m",
    status: "error",
    latencyMs: 12,
    statusCode,
    httpStatus: statusCode,
    error,
  };
}

const applyDeps = () => {
  const hidden = new Set<string>();
  return {
    hidden,
    isHidden: (_p: string, m: string) => hidden.has(m),
    setHidden: (_p: string, m: string, v: boolean) => {
      if (v) hidden.add(m);
      else hidden.delete(m);
    },
  };
};

for (const [code, message] of [
  [503, "upstream unavailable"],
  [502, "bad gateway"],
  [500, "internal error"],
  [401, "invalid api key"],
  [402, "payment required"],
  [403, "forbidden"],
] as const) {
  test(`runner-shaped ${code} outcome never hides a model`, () => {
    const outcome = scheduler.mapSingleModelTestResult(runnerHttpError(code, message));
    const deps = applyDeps();
    const action = scheduler.applyHealthCheckOutcome(
      `prov-mapped-${code}`,
      "m",
      outcome,
      deps,
      "conn-a"
    );
    assert.equal(action, "skipped");
    assert.equal(deps.hidden.has("m"), false);
    assert.equal(marks.isHiddenByHealthCheck(`prov-mapped-${code}`, "m"), false);
  });
}

test("a thrown runner error (no upstream status, httpStatus 500) never hides a model", () => {
  const outcome = scheduler.mapSingleModelTestResult({
    modelId: "prov/m",
    status: "error",
    latencyMs: 3,
    httpStatus: 500,
    error: "fetch failed",
  });
  const deps = applyDeps();
  assert.equal(
    scheduler.applyHealthCheckOutcome("prov-thrown", "m", outcome, deps, "c"),
    "skipped"
  );
  assert.equal(deps.hidden.size, 0);
});

test("runner-shaped model-level failures (404 / 400) still hide", () => {
  for (const code of [404, 400]) {
    const outcome = scheduler.mapSingleModelTestResult(runnerHttpError(code, "model not found"));
    const deps = applyDeps();
    const provider = `prov-model-level-${code}`;
    assert.equal(scheduler.applyHealthCheckOutcome(provider, "m", outcome, deps, "c"), "hidden");
    assert.equal(deps.hidden.has("m"), true);
  }
});

test("a provider outage (every probe 503) hides nothing and stops the pass early", async () => {
  const down = scheduler.mapSingleModelTestResult(runnerHttpError(503, "upstream unavailable"));
  const models = ["a", "b", "c", "d", "e"];
  const deps = makeDeps({ a: down, b: down, c: down, d: down, e: down }, new Set(), models);
  const result = await scheduler.runHealthCheckForConnection(conn("prov-outage"), deps);

  assert.deepEqual(result.hidden, []);
  assert.deepEqual(deps.setCalls, []);
  assert.equal(result.stoppedEarly, "connection_level_failures");
  assert.equal(result.tested, classification.CONSECUTIVE_CONNECTION_FAILURE_STOP_THRESHOLD);
  assert.equal(marks.getHealthCheckHiddenModelIds("prov-outage").size, 0);
});

test("an expired key (every probe 401) hides nothing and stops the pass early", async () => {
  const unauthorized = scheduler.mapSingleModelTestResult(runnerHttpError(401, "invalid api key"));
  const deps = makeDeps({ a: unauthorized, b: unauthorized, c: unauthorized, d: { status: "ok" } });
  const result = await scheduler.runHealthCheckForConnection(conn("prov-expired"), deps);

  assert.equal(result.stoppedEarly, "connection_level_failures");
  assert.deepEqual(result.hidden, []);
  assert.equal(deps.probed.includes("d"), false);
});

test("mixed-class or interrupted connection-level failures do not stop the pass", async () => {
  const s503: ProbeOutcome = { status: "error", statusCode: 503 };
  const s401: ProbeOutcome = { status: "error", statusCode: 401 };
  const deps = makeDeps({
    a: s503,
    b: s401,
    c: s503,
    d: { status: "ok" },
    e: s503,
    f: s503,
    g: { status: "ok" },
  });
  const result = await scheduler.runHealthCheckForConnection(conn("prov-mixed"), deps);
  assert.equal(result.stoppedEarly, undefined);
  assert.equal(result.tested, 7);
});

test("a genuine model-level failure still hides next to connection-level ones", async () => {
  const deps = makeDeps({
    gone: { status: "error", statusCode: 404, error: "model not found" },
    flaky: { status: "error", statusCode: 503 },
  });
  const result = await scheduler.runHealthCheckForConnection(conn("prov-both"), deps);
  assert.deepEqual(result.hidden, ["gone"]);
  assert.equal(deps.hidden.has("flaky"), false);
});

// --- ownership is per connection ---

test("a connection restores only what its own probe hid", async () => {
  const provider = "prov-multi";
  const bad: ProbeOutcome = { status: "error", statusCode: 404, error: "no access" };
  const shared = new Set<string>();

  const hideByA = makeDeps({ m: bad }, shared);
  const a = { id: "conn-A", provider };
  const b = { id: "conn-B", provider };
  await scheduler.runHealthCheckForConnection(a, hideByA);
  assert.equal(shared.has("m"), true);
  assert.equal(marks.isHiddenByHealthCheck(provider, "m", "conn-A"), true);
  assert.equal(marks.isHiddenByHealthCheck(provider, "m", "conn-B"), false);

  // The healthy connection B passes the same model: it must NOT flip A's hide.
  const passByB = makeDeps({ m: { status: "ok" } }, shared);
  const resultB = await scheduler.runHealthCheckForConnection(b, passByB);
  assert.deepEqual(resultB.restored, []);
  assert.deepEqual(passByB.setCalls, []);
  assert.equal(shared.has("m"), true);
  assert.equal(marks.isHiddenByHealthCheck(provider, "m", "conn-A"), true);

  // A itself recovering restores it.
  const passByA = makeDeps({ m: { status: "ok" } }, shared);
  const resultA = await scheduler.runHealthCheckForConnection(a, passByA);
  assert.deepEqual(resultA.restored, ["m"]);
  assert.equal(shared.has("m"), false);
  assert.equal(marks.isHiddenByHealthCheck(provider, "m"), false);
});

test("a second connection failing an already-hidden model does not steal ownership", async () => {
  const provider = "prov-no-steal";
  const bad: ProbeOutcome = { status: "error", statusCode: 404 };
  const shared = new Set<string>();
  await scheduler.runHealthCheckForConnection(
    { id: "conn-A", provider },
    makeDeps({ m: bad }, shared)
  );
  await scheduler.runHealthCheckForConnection(
    { id: "conn-B", provider },
    makeDeps({ m: bad }, shared)
  );
  assert.equal(marks.isHiddenByHealthCheck(provider, "m", "conn-A"), true);
  assert.equal(marks.isHiddenByHealthCheck(provider, "m", "conn-B"), false);
});

test("legacy unowned marks (bare id array) are still restorable by any connection", async () => {
  const provider = "prov-legacy";
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("modelHealthAutoHidden", provider, JSON.stringify(["old-model"]));
  assert.equal(marks.isHiddenByHealthCheck(provider, "old-model"), true);
  assert.equal(marks.isHiddenByHealthCheck(provider, "old-model", "any-conn"), true);

  const deps = makeDeps({ "old-model": { status: "ok" } }, new Set(["old-model"]));
  const result = await scheduler.runHealthCheckForConnection({ id: "any-conn", provider }, deps);
  assert.deepEqual(result.restored, ["old-model"]);
  assert.equal(marks.getHealthCheckHiddenModelIds(provider).size, 0);
});
