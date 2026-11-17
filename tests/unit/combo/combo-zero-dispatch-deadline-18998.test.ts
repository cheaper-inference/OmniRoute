/**
 * #18998: when every combo target is walled, the combo loop dispatches nothing,
 * yet it sleeps through cooldown waits that ignore comboTimeoutMs. With a 240s
 * timeout and the default 90s wait ceiling (300s budget), re-entered passes reach
 * the deadline and the client gets a silent 504:
 * "Combo global timeout (240000ms) reached after 1/13 targets (0 attempted)".
 * A wait that cannot finish before the deadline must not start, so the combo
 * answers at once with its normal terminal response and Retry-After.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-zero-dispatch-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { dispatchWithCooldownRetry } =
  await import("../../../open-sse/services/combo/comboAttemptLoop.ts");
const { clearAllModelLockouts, recordModelLockoutFailure } =
  await import("../../../open-sse/services/accountFallback.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../../src/shared/utils/circuitBreaker.ts");
const { resetAllComboMetrics } = await import("../../../open-sse/services/comboMetrics.ts");
const { resetDbInstance } = await import("../../../src/lib/db/core.ts");
import type {
  AttemptLoopDeps,
  AttemptLoopState,
  GateDecision,
} from "../../../open-sse/services/combo/attemptLoopTypes.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

const MODELS = ["openai/alpha", "claude/beta"];

type LogLine = { level: "info" | "warn"; message: string };

function capturingLog(lines: LogLine[] = []) {
  return {
    info: (_tag: string, message: string) => lines.push({ level: "info", message }),
    warn: (_tag: string, message: string) => lines.push({ level: "warn", message }),
    error() {},
    debug() {},
  };
}

function modelTarget(modelStr: string): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: `step-${modelStr}`,
    executionKey: `key-${modelStr}`,
    modelStr,
    provider: modelStr.split("/")[0],
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

function lockModel(modelStr: string, cooldownMs: number) {
  const [provider, model] = modelStr.split("/");
  recordModelLockoutFailure(provider, "", model, "rate_limit", 429, 0, null, {
    exactCooldownMs: cooldownMs,
  });
}

function okResponse() {
  return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

/** Runs the real attempt loop with a pool whose every gate answers "skip". */
async function dispatchSkippedPool(opts: {
  comboTimeoutMs: number;
  onGate: (modelStr: string) => GateDecision | null;
  compatRejectedTargets?: ResolvedComboTarget[];
  handleSingleModel?: AttemptLoopDeps["handleSingleModelWithTimeout"];
  logLines?: LogLine[];
}) {
  const state: AttemptLoopState = {
    orderedTargets: MODELS.map(modelTarget),
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
    combo: { name: "zero-dispatch", models: [] },
    config: {},
    log: capturingLog(opts.logLines),
    settings: null,
    resilienceSettings: {
      providerCooldown: { enabled: false },
      comboCooldownWait: { enabled: true, maxWaitMs: 90_000, maxAttempts: 5, budgetMs: 300_000 },
    } as AttemptLoopDeps["resilienceSettings"],
    sticky: { targets: [], messageHash: null, stuck: false },
    effectiveSessionId: null,
    preScreenMap: new Map(),
    quotaCutoffResetWindowConfig: {} as AttemptLoopDeps["quotaCutoffResetWindowConfig"],
    maxRetries: 0,
    traceInvocationId: `inv-zero-dispatch-${Date.now()}`,
    clientRequestedStream: false,
    handleSingleModelWithTimeout:
      opts.handleSingleModel ??
      (async () => {
        throw new Error("a skipped pool never dispatches upstream");
      }),
    isModelAvailable: async () => true,
    body: { messages: [{ role: "user", content: "hi" }] },
    startTime: Date.now(),
    releaseStickyPinOnFailure() {},
    clearStaleLKGP() {},
  };
  const gateCalls: string[] = [];
  const response = await dispatchWithCooldownRetry({
    state,
    deps,
    extra: {
      maxSetRetries: 0,
      setRetryDelayMs: 0,
      comboTimeoutMs: opts.comboTimeoutMs,
      comboStartTime: Date.now(),
      comboCooldownWaitEnabled: true,
      comboCooldownAttempt: { current: 0 },
      comboCooldownBudgetLeftMs: { current: 300_000 },
      evaluateGates: async (gate: {
        index: number;
        state: AttemptLoopState;
      }): Promise<GateDecision> => {
        const { modelStr } = gate.state.orderedTargets[gate.index];
        gateCalls.push(modelStr);
        return opts.onGate(modelStr) ?? { kind: "skip", result: null };
      },
      executeAttempt: async () => ({ ok: true, response: okResponse() }),
      compatRejectedTargets: opts.compatRejectedTargets ?? [],
    },
  });
  return { response, gateCalls };
}

async function errorOf(response: Response) {
  const body = (await response.json()) as {
    error?: { code?: string; type?: string; retry_after?: number; message?: string };
  };
  return body.error ?? {};
}

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  clearAllModelLockouts();
});

test.after(() => {
  clearAllModelLockouts();
  resetAllCircuitBreakers();
  try {
    resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

test("a pool that stays walled answers ALL_TARGETS_SKIPPED, not the 0-attempted 504", async () => {
  // Concurrent traffic keeps every lock fresh, so each wait ends on the same wall.
  const lines: LogLine[] = [];
  const { response, gateCalls } = await dispatchSkippedPool({
    comboTimeoutMs: 1000,
    logLines: lines,
    onGate: (modelStr) => {
      lockModel(modelStr, 600);
      return null;
    },
  });

  const error = await errorOf(response);
  assert.equal(response.status, 429, `got ${response.status} ${error.message}`);
  assert.equal(error.code, "ALL_TARGETS_SKIPPED");
  assert.equal(error.type, "rate_limit_error");
  assert.ok((error.retry_after ?? 0) >= 1, `expected a retry hint, got ${error.retry_after}`);
  assert.equal(
    gateCalls.length,
    MODELS.length * 2,
    "one wait fits the deadline, the next does not"
  );
  assert.ok(!lines.some((line) => line.message.includes("Combo global timeout")));
});

test("a lock longer than the time left fails fast instead of sleeping past the deadline", async () => {
  for (const modelStr of MODELS) lockModel(modelStr, 1500);

  const { response, gateCalls } = await dispatchSkippedPool({
    comboTimeoutMs: 300,
    onGate: () => null,
  });

  assert.equal(response.status, 429);
  assert.equal((await errorOf(response)).code, "ALL_TARGETS_SKIPPED");
  assert.deepEqual(gateCalls, MODELS, "no wait means no second pass over the targets");
});

test("a short lock that fits the deadline is still waited out (#16319)", async () => {
  for (const modelStr of MODELS) lockModel(modelStr, 150);
  let pass = 0;

  const { response, gateCalls } = await dispatchSkippedPool({
    comboTimeoutMs: 10_000,
    onGate: () => {
      pass += 1;
      if (pass <= MODELS.length) return null;
      return {
        kind: "proceed",
        targetForAttempt: modelTarget(MODELS[0]),
        profile: null,
        protectedPriorityTarget: false,
      };
    },
  });

  assert.equal(response.status, 200);
  assert.equal(gateCalls.length, MODELS.length + 1);
});

test("the compat fallback tier still runs when no wait fits the deadline (#6238)", async () => {
  for (const modelStr of MODELS) lockModel(modelStr, 1500);
  const served: string[] = [];

  const { response } = await dispatchSkippedPool({
    comboTimeoutMs: 300,
    onGate: () => null,
    compatRejectedTargets: [modelTarget("mistral/compat")],
    handleSingleModel: async (_body, modelStr) => {
      served.push(modelStr);
      return okResponse();
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(served, ["mistral/compat"]);
});

test("a global timeout with zero attempts is logged as a warning", async () => {
  const lines: LogLine[] = [];
  const { response } = await dispatchSkippedPool({
    comboTimeoutMs: 1,
    logLines: lines,
    onGate: () => {
      const start = Date.now();
      while (Date.now() - start < 5);
      return null;
    },
  });

  assert.equal(response.status, 504);
  assert.equal((await errorOf(response)).code, "COMBO_TIMEOUT");
  const line = lines.find((entry) => entry.message.includes("(0 attempted)"));
  assert.equal(line?.level, "warn");
});

test("an open breaker past the deadline answers at once with its own terminal", async () => {
  for (const provider of ["openai", "claude"]) {
    const breaker = getCircuitBreaker(provider, { failureThreshold: 1, resetTimeout: 1500 });
    await breaker
      .execute(async () => {
        throw new Error("simulated failure");
      })
      .catch(() => {});
    assert.equal(breaker.getStatus().state, "OPEN");
  }
  const calls: string[] = [];

  const response = await handleComboChat({
    body: {},
    combo: {
      name: "zero-dispatch-breaker",
      strategy: "priority",
      models: MODELS,
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, comboTimeoutMs: 300 },
    },
    handleSingleModel: async (_body: Record<string, unknown>, modelStr: string) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: capturingLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(response.status, 503);
  assert.deepEqual(
    calls,
    [],
    "the breaker reset is past the deadline, so nothing is re-dispatched"
  );
  assert.equal(
    response.headers.get("x-omniroute-combo-terminal-reason"),
    "all_targets_cooling_down"
  );
  assert.ok(Number(response.headers.get("Retry-After")) > 0);
});

test("a 429 whose cooldown outlasts the deadline is returned, not slept through", async () => {
  const calls: string[] = [];

  const response = await handleComboChat({
    body: {},
    combo: {
      name: "zero-dispatch-post-attempt",
      strategy: "priority",
      models: ["openai/alpha"],
      config: {
        maxRetries: 0,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
        maxSetRetries: 0,
        comboTimeoutMs: 300,
      },
    },
    handleSingleModel: async (_body: Record<string, unknown>, modelStr: string) => {
      calls.push(modelStr);
      if (calls.length > 1) return okResponse();
      lockModel(modelStr, 1500);
      return new Response(
        JSON.stringify({
          error: { message: "rate limited" },
          retryAfter: new Date(Date.now() + 1500).toISOString(),
        }),
        { status: 429, headers: { "content-type": "application/json" } }
      );
    },
    isModelAvailable: async () => true,
    log: capturingLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(response.status, 429);
  assert.equal(calls.length, 1, "the cooldown outlasts the deadline, so no second dispatch");
});
