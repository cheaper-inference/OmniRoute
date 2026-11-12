/**
 * Crash-storm breaker: per-provider × normalized-signature sliding-window
 * gate for self-inflicted failure storms. The provider/connection breakers
 * deliberately ignore local execution errors and client aborts (reputation
 * protection), which leaves a crash-looping request path with no backpressure
 * anywhere — this breaker fills that gap without writing any cooldown/lock.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-crash-storm-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const FLAG = "CRASH_STORM_BREAKER_ENABLED";
delete process.env[FLAG];

const breaker = await import("../../open-sse/services/crashStormBreaker.ts");
const trace = await import("../../open-sse/services/combo/decisionTrace.ts");
const { evaluateExecuteTargetGates } =
  await import("../../open-sse/services/combo/executeTargetGates.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const eventBus = await import("../../src/lib/events/eventBus.ts");

function setFlag(enabled: boolean | null) {
  if (enabled === null) delete process.env[FLAG];
  else process.env[FLAG] = enabled ? "true" : "false";
}

test.afterEach(() => setFlag(null));

test.after(async () => {
  const core = await import("../../src/lib/db/core.ts");
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function freshEnv(threshold?: string, windowMs?: string) {
  delete process.env.OMNIROUTE_CRASH_STORM_THRESHOLD;
  delete process.env.OMNIROUTE_CRASH_STORM_WINDOW_MS;
  if (threshold !== undefined) process.env.OMNIROUTE_CRASH_STORM_THRESHOLD = threshold;
  if (windowMs !== undefined) process.env.OMNIROUTE_CRASH_STORM_WINDOW_MS = windowMs;
}

test("1. signature normalization folds hex ids and digit runs into #", () => {
  const a = breaker.normalizeCrashSignature(
    "Cannot read properties of undefined (reading 'bind') on anthropic-compatible-3f2b8c1d-92aa-4e77 request 880211"
  );
  const b = breaker.normalizeCrashSignature(
    "Cannot read properties of undefined (reading 'bind') on anthropic-compatible-7c91d0e2-15bc-4d33 request 991742"
  );
  assert.equal(a, b, "same fault with different ids lands in one signature");
  assert.ok(breaker.normalizeCrashSignature("").length === 0);
  assert.equal(breaker.normalizeCrashSignature(undefined), "");
});

test("2. storm trips at threshold, per provider, 5xx only", () => {
  freshEnv("3");
  breaker.resetCrashStormBreaker();
  assert.equal(breaker.isCrashStorming("prov-a"), false);
  breaker.recordCrashFailure("prov-a", "boom alpha", 500);
  breaker.recordCrashFailure("prov-a", "boom alpha", 502);
  assert.equal(breaker.isCrashStorming("prov-a"), false, "two samples < threshold 3");
  breaker.recordCrashFailure("prov-a", "boom alpha", 500);
  assert.equal(breaker.isCrashStorming("prov-a"), true);
  // Other providers unaffected.
  assert.equal(breaker.isCrashStorming("prov-b"), false);
  // 4xx and 429 never feed the storm.
  breaker.recordCrashFailure("prov-c", "boom gamma", 429);
  breaker.recordCrashFailure("prov-c", "boom gamma", 400);
  breaker.recordCrashFailure("prov-c", "boom gamma", 401);
  assert.equal(breaker.isCrashStorming("prov-c"), false);
});

test("3. window decay self-heals; threshold 0 disables entirely", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
  freshEnv("2", "50");
  breaker.resetCrashStormBreaker();
  breaker.recordCrashFailure("prov-d", "boom delta", 500);
  breaker.recordCrashFailure("prov-d", "boom delta", 500);
  assert.equal(breaker.isCrashStorming("prov-d"), true);
  t.mock.timers.tick(51);
  assert.equal(breaker.isCrashStorming("prov-d"), false, "samples aged out of the window");

  freshEnv("0");
  breaker.resetCrashStormBreaker();
  breaker.recordCrashFailure("prov-e", "boom", 500);
  breaker.recordCrashFailure("prov-e", "boom", 500);
  assert.equal(breaker.isCrashStorming("prov-e"), false, "0 disables the breaker");
});

test("4. bounded maps: signature families are capped, diagnostics report actives", () => {
  freshEnv();
  breaker.resetCrashStormBreaker();
  for (let i = 0; i < 300; i++) {
    breaker.recordCrashFailure("prov-f", `distinct failure number ${i}`, 500);
  }
  const status = breaker.crashStormStatus();
  assert.ok(status.length <= 256, "tracked signature families stay bounded");
  for (const entry of status) {
    assert.equal(entry.provider, "prov-f");
    assert.ok(entry.count >= 2);
    assert.ok(entry.signature.length > 0);
  }
});

test("4b. eviction drops the least recently seen signature, not the storming one", () => {
  freshEnv("2");
  breaker.resetCrashStormBreaker();
  breaker.recordCrashFailure("prov-g", "hot signature", 500);
  for (let i = 0; i < 255; i++) {
    breaker.recordCrashFailure(
      "prov-h",
      `filler signature ${String.fromCharCode(97 + (i % 26))}${i}`,
      500
    );
  }
  breaker.recordCrashFailure("prov-g", "hot signature", 500);
  breaker.recordCrashFailure("prov-h", "one more signature", 500);
  assert.equal(breaker.isCrashStorming("prov-g"), true);
});

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const LOCAL_CRASH = { error: { message: "spawn codex-cli ENOENT" } };
const UPSTREAM_500 = { error: { message: "Internal server error" } };
const OK_BODY = {
  choices: [{ message: { role: "assistant", content: "served" }, finish_reason: "stop" }],
};

/** Runs one real priority combo: `failing` answers `failure`, every other target answers 200. */
async function runCombo(models: string[], failing: string, failure: unknown, maxRetries = 0) {
  const calls: string[] = [];
  const response = await handleComboChat({
    body: { model: models[0] },
    combo: {
      name: `crash-storm-${Math.random().toString(16).slice(2)}`,
      strategy: "priority",
      models,
      config: { maxRetries, maxSetRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return modelStr === failing ? jsonResponse(500, failure) : jsonResponse(200, OK_BODY);
    },
    isModelAvailable: async () => true,
    log: { info() {}, warn() {}, debug() {}, error() {} } as never,
    settings: {},
    allCombos: null,
  });
  await response.body?.cancel();
  return { status: response.status, calls };
}

function uniqueModels(tag: string) {
  const provider = `csb${tag}${Math.random().toString(16).slice(2, 8)}`;
  return { provider, failing: `${provider}/model-a`, healthy: "openai/gpt-storm-healthy" };
}

function gateDeps(traceInvocationId: string) {
  return {
    strategy: "priority",
    combo: { name: "t", models: [] },
    config: {},
    log: { info() {}, warn() {}, debug() {}, error() {} },
    settings: null,
    resilienceSettings: { providerCooldown: { enabled: false } },
    sticky: { targets: [], messageHash: null, stuck: false },
    effectiveSessionId: null,
    preScreenMap: new Map(),
    quotaCutoffResetWindowConfig: {},
    maxRetries: 0,
    traceInvocationId,
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async () => {
      throw new Error("gates never dispatch");
    },
    body: { messages: [{ role: "user", content: "hi" }] },
    startTime: Date.now(),
    releaseStickyPinOnFailure() {},
    clearStaleLKGP() {},
  } as never;
}

function gateState(target: Record<string, unknown>) {
  return {
    orderedTargets: [target],
    fallbackCount: 0,
    recordedAttempts: 0,
    comboErrors: [],
    lastError: null,
    lastStatus: null,
    earliestRetryAfter: null,
    comboExpired: false,
    exhaustedProviders: new Set(),
    exhaustedConnections: new Set(),
    transientRateLimitedProviders: new Set(),
    abortControllers: new Map([[0, new AbortController()]]),
    dispatchedTargets: new Set(),
    targetFailureTrust: new Map(),
    comboAttemptOrder: [],
    skippedForCircuitOpen: false,
    earliestCircuitOpenRetryMs: 0,
    globalAttempts: 0,
    observedFailure: false,
    allObservedFailuresQuota: true,
    observeFailure() {},
  } as never;
}

function gateTarget(provider: string, extra: Record<string, unknown> = {}) {
  return {
    kind: "model",
    stepId: "s1",
    executionKey: `ek-${provider}`,
    modelStr: `${provider}/model-a`,
    provider,
    providerId: null,
    connectionId: "c1",
    weight: 1,
    label: null,
    ...extra,
  };
}

test("5. flag off (default): a storm records nothing and skips nothing", async () => {
  freshEnv("2");
  setFlag(null);
  breaker.resetCrashStormBreaker();
  const { provider, failing, healthy } = uniqueModels("off");
  for (let i = 0; i < 4; i++) {
    const { status, calls } = await runCombo([failing, healthy], failing, LOCAL_CRASH);
    assert.equal(status, 200);
    assert.deepEqual(calls, [failing, healthy], "the failing target is still dispatched");
  }
  assert.equal(breaker.isCrashStorming(provider), false);
  assert.deepEqual(breaker.crashStormStatus(), []);

  // Even with samples already in the store, the gate reads the flag first.
  breaker.recordCrashFailure(provider, "boom", 500);
  breaker.recordCrashFailure(provider, "boom", 500);
  assert.equal(breaker.isCrashStorming(provider), true);
  const target = gateTarget(provider);
  const decision = await evaluateExecuteTargetGates({
    index: 0,
    state: gateState(target),
    deps: gateDeps("inv-off"),
  });
  assert.equal(decision.kind, "proceed");
});

test("6. flag on: self-inflicted failures trip the gate and the next request skips the target", async () => {
  freshEnv("2");
  setFlag(true);
  breaker.resetCrashStormBreaker();
  const { provider, failing, healthy } = uniqueModels("on");
  await runCombo([failing, healthy], failing, LOCAL_CRASH);
  assert.equal(breaker.isCrashStorming(provider), false, "one sample is below the threshold");
  await runCombo([failing, healthy], failing, LOCAL_CRASH);
  assert.equal(breaker.isCrashStorming(provider), true);
  const { status, calls } = await runCombo([failing, healthy], failing, LOCAL_CRASH);
  assert.equal(status, 200);
  assert.deepEqual(
    calls,
    [healthy],
    "the storming target is skipped exactly once, never dispatched"
  );
});

test("7. flag on: a genuine upstream 5xx never feeds the breaker", async () => {
  freshEnv("2");
  setFlag(true);
  breaker.resetCrashStormBreaker();
  const { provider, failing, healthy } = uniqueModels("up");
  for (let i = 0; i < 4; i++) {
    const { calls } = await runCombo([failing, healthy], failing, UPSTREAM_500);
    assert.deepEqual(calls, [failing, healthy]);
  }
  assert.equal(breaker.isCrashStorming(provider), false);
  assert.deepEqual(breaker.crashStormStatus(), []);
});

test("8. flag on: same-target retries add one sample per target, not per attempt", async () => {
  freshEnv("2");
  setFlag(true);
  breaker.resetCrashStormBreaker();
  const { provider, failing, healthy } = uniqueModels("re");
  const { calls } = await runCombo([failing, healthy], failing, LOCAL_CRASH, 3);
  assert.ok(calls.filter((c) => c === failing).length > 1, "the target really was retried");
  assert.equal(breaker.isCrashStorming(provider), false);
});

test("9. gate: a storming provider skips with trace reason crash_storm, a healthy one proceeds", async () => {
  freshEnv("2");
  setFlag(true);
  breaker.resetCrashStormBreaker();
  const stormy = `gate-stormy-${Date.now()}`;
  const healthy = `gate-healthy-${Date.now()}`;
  breaker.recordCrashFailure(stormy, "spawn x ENOENT", 500);
  breaker.recordCrashFailure(stormy, "spawn x ENOENT", 500);

  const invocationId = trace.createInvocationId();
  trace.startComboTrace(invocationId, { comboName: "t", strategy: "priority" });
  const target = gateTarget(stormy);
  const state = gateState(target) as unknown as { fallbackCount: number };
  const skipped = await evaluateExecuteTargetGates({
    index: 0,
    state: state as never,
    deps: gateDeps(invocationId),
  });
  assert.equal(skipped.kind, "skip");
  assert.equal(state.fallbackCount, 1);
  const finished = trace.finalizeComboTrace(invocationId, []);
  const entry = finished?.decisions.find((d) => d.target === target.modelStr);
  assert.equal(entry?.reason, "crash_storm");
  assert.equal(entry?.decision, "skipped_before_dispatch");
  assert.ok(trace.COMBO_SKIP_REASONS.includes("crash_storm"));

  const proceeded = await evaluateExecuteTargetGates({
    index: 0,
    state: gateState(gateTarget(healthy)),
    deps: gateDeps("inv-healthy"),
  });
  assert.equal(proceeded.kind, "proceed");
});

test("10. gate: a protected priority target stops with the safe 503", async () => {
  freshEnv("2");
  setFlag(true);
  breaker.resetCrashStormBreaker();
  const stormy = `gate-protected-${Date.now()}`;
  breaker.recordCrashFailure(stormy, "spawn x ENOENT", 500);
  breaker.recordCrashFailure(stormy, "spawn x ENOENT", 500);
  const decision = await evaluateExecuteTargetGates({
    index: 0,
    state: gateState(gateTarget(stormy, { fallbackOnlyOnQuotaExhaustion: true })),
    deps: gateDeps("inv-protected"),
  });
  assert.equal(decision.kind, "skip");
  const result = (decision as unknown as { result: { response: Response } }).result;
  assert.equal(result.response.status, 503);
  await result.response.body?.cancel();
});

test("11. composition: a skipped target emits no attempt and a 429 never feeds the breaker", async () => {
  freshEnv("2");
  setFlag(true);
  breaker.resetCrashStormBreaker();
  const { provider, failing, healthy } = uniqueModels("co");
  breaker.recordCrashFailure(provider, "spawn x ENOENT", 500);
  breaker.recordCrashFailure(provider, "spawn x ENOENT", 500);
  const attempts: string[] = [];
  const off = eventBus.on("combo.target.attempt", (payload: { model: string }) => {
    attempts.push(payload.model);
  });
  try {
    const { status, calls } = await runCombo([failing, healthy], failing, LOCAL_CRASH);
    assert.equal(status, 200);
    assert.deepEqual(calls, [healthy]);
    assert.deepEqual(attempts, [healthy], "the skip happens before any attempt is announced");
  } finally {
    off();
  }

  // A full account semaphore is a 429: local, but not a crash, and it keeps its own retries.
  breaker.resetCrashStormBreaker();
  const other = uniqueModels("sm");
  breaker.recordCrashFailure(other.provider, "spawn codex ENOENT", 429);
  assert.deepEqual(breaker.crashStormStatus(), []);
});
