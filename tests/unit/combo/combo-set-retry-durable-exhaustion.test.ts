import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-set-retry-durable-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { clearAllModelLockouts } = await import("../../../open-sse/services/accountFallback.ts");
const { resetAllCircuitBreakers } = await import("../../../src/shared/utils/circuitBreaker.ts");
const { resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { dispatchWithCooldownRetry } =
  await import("../../../open-sse/services/combo/comboAttemptLoop.ts");
import type {
  AttemptLoopDeps,
  AttemptLoopState,
  GateDecision,
} from "../../../open-sse/services/combo/attemptLoopTypes.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

test.afterEach(() => {
  clearAllModelLockouts();
  resetAllCircuitBreakers();
});

test.after(() => {
  resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function log() {
  return { info() {}, warn() {}, debug() {}, error() {} };
}

function failure(status: number, message: string) {
  return Response.json({ error: { message } }, { status });
}

function ok(model: string) {
  return Response.json({ model });
}

function comboTarget(modelStr: string): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: "s1",
    executionKey: `ek-${modelStr}`,
    modelStr,
    provider: modelStr.split("/")[0],
    providerId: null,
    weight: 1,
    label: null,
  } as ResolvedComboTarget;
}

function comboConfig(models: string[], maxSetRetries: number) {
  return {
    name: `set-retry-durable-${Math.random()}`,
    strategy: "priority",
    models: models.map((modelStr) => ({
      kind: "model" as const,
      model: modelStr,
      providerId: modelStr.split("/")[0],
    })),
    config: { maxRetries: 0, retryDelayMs: 0, maxSetRetries, setRetryDelayMs: 0 },
  };
}

test("durable exhaustion is skipped on the next set while transient is retried", async () => {
  const calls: string[] = [];
  const combo = comboConfig(["openai/durable", "anthropic/transient"], 1);
  await handleComboChat({
    body: {},
    combo,
    allCombos: [combo],
    settings: null,
    log: log(),
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === "openai/durable")
        return failure(402, "Payment required: credits exhausted").clone();
      return failure(500, "internal server error").clone();
    },
  });
  assert.deepEqual(calls, ["openai/durable", "anthropic/transient", "anthropic/transient"]);
});

test("without set retry every target is attempted once", async () => {
  const calls: string[] = [];
  const combo = comboConfig(["openai/durable", "anthropic/transient"], 0);
  const result = await handleComboChat({
    body: {},
    combo,
    allCombos: [combo],
    settings: null,
    log: log(),
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === "openai/durable")
        return failure(402, "Payment required: credits exhausted").clone();
      return failure(500, "internal server error").clone();
    },
  });
  assert.deepEqual(calls, ["openai/durable", "anthropic/transient"]);
  assert.equal(result.ok, false);
});

test("a transient-only failure is retried on the next set", async () => {
  const calls: string[] = [];
  const combo = comboConfig(["openai/solo"], 1);
  const result = await handleComboChat({
    body: {},
    combo,
    allCombos: [combo],
    settings: null,
    log: log(),
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (calls.length === 1) return failure(500, "internal server error").clone();
      return ok(modelStr);
    },
  });
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/solo", "openai/solo"]);
});

test("set boundary copies the durable set and drops the transient mark", async () => {
  const target = comboTarget("openai/solo");
  const state: AttemptLoopState = {
    orderedTargets: [target],
    fallbackCount: 0,
    recordedAttempts: 0,
    comboErrors: [],
    lastError: null,
    lastStatus: null,
    earliestRetryAfter: null,
    comboExpired: false,
    exhaustedProviders: new Set<string>(),
    exhaustedConnections: new Set<string>(),
    transientRateLimitedProviders: new Set<string>(),
    abortControllers: new Map(),
    dispatchedTargets: new Set<string>(),
    targetFailureTrust: new Map(),
    comboAttemptOrder: [],
    skippedForCircuitOpen: false,
    earliestCircuitOpenRetryMs: 0,
    globalAttempts: 0,
    observedFailure: false,
    allObservedFailuresQuota: true,
    requestScopedRejectedModelKeys: new Set<string>(),
    observeFailure() {},
  };
  const deps: AttemptLoopDeps = {
    strategy: "priority",
    combo: { name: "boundary-copy", models: [] },
    config: {},
    log: log(),
    settings: null,
    resilienceSettings: {
      providerCooldown: { enabled: false },
    } as AttemptLoopDeps["resilienceSettings"],
    sticky: { targets: [], messageHash: null, stuck: false },
    effectiveSessionId: null,
    preScreenMap: new Map(),
    quotaCutoffResetWindowConfig: {} as AttemptLoopDeps["quotaCutoffResetWindowConfig"],
    maxRetries: 0,
    traceInvocationId: `inv-boundary-${Date.now()}`,
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async () => {
      throw new Error("boundary test never dispatches upstream");
    },
    body: { messages: [{ role: "user", content: "hi" }] },
    startTime: Date.now(),
    releaseStickyPinOnFailure() {},
    clearStaleLKGP() {},
  };
  let attempts = 0;
  await dispatchWithCooldownRetry({
    state,
    deps,
    extra: {
      maxSetRetries: 1,
      setRetryDelayMs: 0,
      comboTimeoutMs: 0,
      comboStartTime: Date.now(),
      comboCooldownWaitEnabled: false,
      comboCooldownAttempt: { current: 0 },
      comboCooldownBudgetLeftMs: { current: 0 },
      evaluateGates: async (opts: {
        index: number;
        state: AttemptLoopState;
      }): Promise<GateDecision> => ({
        kind: "proceed",
        targetForAttempt: opts.state.orderedTargets[opts.index],
        profile: null,
        protectedPriorityTarget: false,
      }),
      executeAttempt: async (opts: { state: AttemptLoopState }) => {
        attempts += 1;
        if (attempts === 1) {
          opts.state.durableExhaustedProviders?.add("openai");
          opts.state.exhaustedProviders.add("openai");
          opts.state.exhaustedProviders.add("anthropic");
        }
        return { ok: false };
      },
      compatRejectedTargets: [],
    },
  });
  assert.equal(attempts, 2);
  assert.equal(state.exhaustedProviders.has("openai"), true);
  assert.equal(state.exhaustedProviders.has("anthropic"), false);
  assert.equal(state.durableExhaustedProviders?.has("anthropic") ?? false, false);
  assert.equal(state.durableExhaustedConnections?.has("anthropic") ?? false, false);
});
