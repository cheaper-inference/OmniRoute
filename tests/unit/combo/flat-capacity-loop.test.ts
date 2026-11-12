import test from "node:test";
import assert from "node:assert/strict";
import { getEventListeners } from "node:events";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";
import type {
  AttemptLoopDeps,
  AttemptLoopState,
} from "../../../open-sse/services/combo/attemptLoopTypes.ts";
import type { DispatchWithCooldownRetryExtra } from "../../../open-sse/services/combo/comboAttemptLoop.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { cleanup } = createTempDataDir("omr-combo-capacity-");
const { runCapacityRequest } =
  await import("../../../open-sse/services/combo/capacityBudgetContext.ts");
const { dispatchWithCooldownRetry } =
  await import("../../../open-sse/services/combo/comboAttemptLoop.ts");
const { resolveResilienceSettings } = await import("../../../src/lib/resilience/settings.ts");
const {
  acquire,
  isComboAccountCapacityUnavailable,
  buildAccountSemaphoreKey,
  resetAll,
  getStats,
  markAccountCapacityExecutionStarted,
} = await import("../../../open-sse/services/accountSemaphore.ts");
const pause = (ms = 5) => new Promise<void>((resolve) => setTimeout(resolve, ms));
let keepAlive: ReturnType<typeof setInterval>;
test.before(() => {
  keepAlive = setInterval(() => {}, 1000);
});
test.after(async () => {
  clearInterval(keepAlive);
  // Drain test notifications before closing and deleting their temporary database.
  const { dispatchEvent } = await import("../../../src/lib/webhookDispatcher.ts");
  await dispatchEvent("request.failed", {});
  await cleanup();
});
test.afterEach(() => resetAll());

function fixture(ids = ["a"], signal?: AbortSignal, maxWaitMs = 500, provider = "fixture") {
  const targets: ResolvedComboTarget[] = ids.map((id) => ({
    kind: "model",
    stepId: id,
    executionKey: id,
    modelStr: `${provider}/model-${id}`,
    provider,
    providerId: null,
    connectionId: id,
    weight: 1,
    label: null,
  }));
  const state: AttemptLoopState = {
    orderedTargets: targets,
    fallbackCount: 0,
    deadlineFailures: 0,
    recordedAttempts: 0,
    comboErrors: [],
    lastError: null,
    lastStatus: null,
    earliestRetryAfter: null,
    comboExpired: false,
    exhaustedProviders: new Set(),
    exhaustedConnections: new Set(),
    transientRateLimitedProviders: new Set(),
    abortControllers: new Map(),
    dispatchedTargets: new Set(),
    targetFailureTrust: new Map(),
    comboAttemptOrder: [],
    skippedForCircuitOpen: false,
    earliestCircuitOpenRetryMs: 0,
    globalAttempts: 0,
    observedFailure: false,
    requestScopedFailureSeen: false,
    allObservedFailuresQuota: true,
    observeFailure() {},
  };
  const deps: AttemptLoopDeps = {
    capacityAdmissionEnabled: true,
    strategy: "priority",
    combo: { name: "capacity-fixture", models: [] },
    config: {},
    log: { info() {}, warn() {}, debug() {}, error() {} },
    settings: null,
    resilienceSettings: resolveResilienceSettings({ resilience: { requestQueue: { maxWaitMs } } }),
    sticky: { targets: [], messageHash: null, stuck: false },
    effectiveSessionId: null,
    preScreenMap: new Map(),
    quotaCutoffResetWindowConfig: {} as AttemptLoopDeps["quotaCutoffResetWindowConfig"],
    maxRetries: 0,
    traceInvocationId: "capacity-fixture",
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async () => new Response("unused"),
    signal,
    body: { messages: [{ role: "user", content: "fixture" }] },
    startTime: Date.now(),
    releaseStickyPinOnFailure() {},
    clearStaleLKGP() {},
  };
  deps.resilienceSettings.requestQueue.maxWaitMs = maxWaitMs;
  const dispatched: string[] = [];
  const excluded = new Set<string>();
  let beforeGate: ((id: string) => Promise<void>) | null = null;
  const extra: DispatchWithCooldownRetryExtra = {
    maxSetRetries: 0,
    setRetryDelayMs: 30_000,
    comboTimeoutMs: 2000,
    comboStartTime: Date.now(),
    comboCooldownWaitEnabled: false,
    compatRejectedTargets: [],
    comboCooldownAttempt: { current: 0 },
    comboCooldownBudgetLeftMs: { current: 0 },
    evaluateGates: async ({ index }: { index: number }) => {
      const target = targets[index];
      await beforeGate?.(target.connectionId!);
      if (excluded.has(target.connectionId!)) return { kind: "skip" as const, result: null };
      if (isComboAccountCapacityUnavailable(provider, target.connectionId!, 1)) {
        return {
          kind: "skip" as const,
          result: null,
          capacity: {
            key: buildAccountSemaphoreKey({ provider, accountKey: target.connectionId! }),
            maxConcurrency: 1,
          },
          protectedPriorityTarget: target.fallbackOnlyOnQuotaExhaustion === true,
        };
      }
      return {
        kind: "proceed" as const,
        targetForAttempt: target,
        profile: {},
        protectedPriorityTarget: false,
      };
    },
    executeAttempt: async ({ index }: { index: number }) => {
      const id = targets[index].connectionId!;
      const done = await acquire(`${provider}:${id}`, { maxConcurrency: 1 });
      state.recordedAttempts++;
      state.globalAttempts++;
      dispatched.push(id);
      done();
      return { ok: true, response: new Response(id) };
    },
  };
  return {
    state,
    deps,
    extra,
    dispatched,
    excluded,
    setBeforeGate: (hook: typeof beforeGate) => {
      beforeGate = hook;
    },
    start: () => runCapacityRequest(() => dispatchWithCooldownRetry({ state, deps, extra })),
  };
}

test("all busy with zero set retries waits and dispatches promptly on release", async () => {
  const busy = await acquire("fixture:a", { maxConcurrency: 1 });
  const f = fixture();
  let settled = false;
  const response = f.start().then((result) => {
    settled = true;
    return result;
  });
  await pause(15);
  assert.equal(settled, false);
  assert.equal(f.state.globalAttempts, 0);
  const releasedAt = Date.now();
  busy();
  assert.equal(await (await response).text(), "a");
  assert.ok(Date.now() - releasedAt < 200);
  assert.deepEqual(f.dispatched, ["a"]);
});

test("free fallback is used without waiting for a busy preferred account", async () => {
  const busy = await acquire("fixture:a", { maxConcurrency: 1 });
  const f = fixture(["a", "b"]);
  assert.equal(await (await f.start()).text(), "b");
  busy();
});

test("alternative release selects available candidate while preserving ordered preference", async () => {
  const a = await acquire("fixture:a", { maxConcurrency: 1 });
  const b = await acquire("fixture:b", { maxConcurrency: 1 });
  const f = fixture(["a", "b"]);
  const response = f.start();
  await pause();
  b();
  assert.equal(await (await response).text(), "b");
  a();
});

test("client cancellation terminates parked wait and releases its place", async () => {
  const busy = await acquire("fixture:a", { maxConcurrency: 1 });
  const controller = new AbortController();
  const f = fixture(["a"], controller.signal);
  const response = f.start();
  await pause();
  controller.abort();
  assert.equal((await response).status, 499);
  busy();
  (await acquire("fixture:a", { maxConcurrency: 1 }))();
  assert.deepEqual(f.dispatched, []);
});

test("capacity deadline is retryable and does not burn dispatch attempts", async () => {
  const busy = await acquire("fixture:a", { maxConcurrency: 1 });
  const f = fixture(["a"], undefined, 25);
  const response = await f.start();
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("retry-after"), "1");
  const timeoutBody = await response.json();
  assert.equal(timeoutBody.error.code, "service_unavailable");
  assert.equal(timeoutBody.diagnostics.terminalReason, "capacity_wait");
  assert.match(timeoutBody.error.message, /capacity.*(expired|full)/i);
  assert.equal(f.state.globalAttempts, 0);
  busy();
});

test("changed permissions or cooldown after wake prevent dispatch and allow later fallback", async () => {
  const a = await acquire("fixture:a", { maxConcurrency: 1 });
  const b = await acquire("fixture:b", { maxConcurrency: 1 });
  const f = fixture(["a", "b"]);
  const response = f.start();
  await pause();
  f.excluded.add("a");
  a();
  await pause();
  assert.deepEqual(f.dispatched, []);
  b();
  assert.equal(await (await response).text(), "b");
});

test("protected busy barrier becoming quota-ineligible resumes unvisited nested fallback", async () => {
  const busy = await acquire("fixture:a", { maxConcurrency: 1 });
  const f = fixture(["a", "nested-b", "nested-c"]);
  f.state.orderedTargets[0].fallbackOnlyOnQuotaExhaustion = true;
  const response = f.start();
  await pause();
  assert.deepEqual(f.dispatched, []);
  f.excluded.add("a");
  busy();
  assert.equal(await (await response).text(), "nested-b");
});

test("expiration during async recheck cannot dispatch after the client received an error", async () => {
  const busy = await acquire("fixture:a", { maxConcurrency: 1 });
  const f = fixture(["a"], undefined, 25);
  const response = f.start();
  await pause();
  f.setBeforeGate(async () => {
    await pause(60);
  });
  busy();
  assert.equal((await response).status, 503);
  await pause(70);
  assert.deepEqual(f.dispatched, []);
});

test("upstream failure before busy fallback is not replayed during capacity rescan", async () => {
  const busy = await acquire("fixture:b", { maxConcurrency: 1 });
  const f = fixture(["a", "b"]);
  const execute = f.extra.executeAttempt;
  const attempts: string[] = [];
  f.extra.executeAttempt = async (options) => {
    const { index } = options;
    attempts.push(f.state.orderedTargets[index].connectionId!);
    if (index === 0) {
      f.state.recordedAttempts++;
      return { ok: false, response: undefined };
    }
    return execute(options);
  };
  const response = f.start();
  await pause();
  busy();
  assert.equal(await (await response).text(), "b");
  assert.deepEqual(attempts, ["a", "b"]);
});

for (const exclusion of ["permissions", "cooldown", "breaker", "quota"] as const) {
  test(`real gates recheck ${exclusion} after capacity wake without retaining a slot`, async () => {
    const { createProviderConnection, updateProviderConnection } =
      await import("../../../src/lib/db/providers.ts");
    const { evaluateExecuteTargetGates } =
      await import("../../../open-sse/services/combo/executeTargetGates.ts");
    const { getCircuitBreaker } = await import("../../../src/shared/utils/circuitBreaker.ts");
    const { connectionCircuitBreakerName } =
      await import("../../../open-sse/services/connectionCircuitBreaker.ts");
    const { lockModel } = await import("../../../open-sse/services/accountFallback.ts");
    const provider = `fixture-${exclusion}`;
    const account = await createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: "fixture-key",
      name: `gate-${exclusion}`,
      isActive: true,
      maxConcurrent: 1,
    });
    const id = String(account.id);
    const busy = await acquire(`${provider}:${id}`, { maxConcurrency: 1 });
    const f = fixture([id], undefined, 500, provider);
    let checks = 0;
    let allowed = true;
    f.deps.isModelAvailable = async () => {
      checks++;
      return allowed;
    };
    f.extra.evaluateGates = evaluateExecuteTargetGates;
    const response = f.start();
    for (let tries = 0; checks === 0 && tries < 100; tries++) await pause();
    assert.ok(checks > 0, "initial availability gate must run");
    await pause();
    if (exclusion === "cooldown") {
      await updateProviderConnection(id, {
        rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
      });
    } else if (exclusion === "breaker") {
      getCircuitBreaker(connectionCircuitBreakerName(provider, id), {
        failureThreshold: 1,
        resetTimeout: 60_000,
      })._onFailure("transient");
    } else if (exclusion === "quota") {
      lockModel(provider, id, `model-${id}`, "quota_exhausted", 60_000);
    } else {
      // isModelAvailable is the existing request-policy/session/lease contract.
      allowed = false;
    }
    busy();
    assert.equal((await response).ok, false);
    assert.deepEqual(f.dispatched, []);
    (await acquire(`${provider}:${id}`, { maxConcurrency: 1 }))();
    if (exclusion === "permissions") assert.ok(checks >= 2);
  });
}

test("capacity queue depth overflow is explicit and retryable", async () => {
  const busy = await acquire("fixture:a", { maxConcurrency: 1 });
  const firstController = new AbortController();
  const first = fixture(["a"], firstController.signal);
  first.deps.resilienceSettings.requestQueue.maxQueueDepth = 1;
  const firstResponse = first.start();
  await pause();
  const second = fixture();
  second.deps.resilienceSettings.requestQueue.maxQueueDepth = 1;
  const response = await second.start();
  assert.equal(response.status, 503);
  assert.equal((await response.json()).error.code, "service_unavailable");
  firstController.abort();
  assert.equal((await firstResponse).status, 499);
  busy();
});

test("the combo deadline bounds a longer capacity queue budget", async () => {
  const busy = await acquire("fixture:a", { maxConcurrency: 1 });
  const f = fixture();
  f.extra.comboTimeoutMs = 25;
  const response = await f.start();
  assert.equal(response.status, 504);
  assert.equal((await response.json()).error.code, "COMBO_TIMEOUT");
  assert.deepEqual(f.dispatched, []);
  busy();
});

test("admission deadline leaves an admitted long upstream execution running normally", async () => {
  const busy = await acquire("fixture:long", { maxConcurrency: 1 });
  const f = fixture(["long"], undefined, 40);
  let finished = false;
  f.extra.executeAttempt = async () => {
    const done = await acquire("fixture:long", { maxConcurrency: 1 });
    markAccountCapacityExecutionStarted();
    await pause(80);
    finished = true;
    done();
    return { ok: true, response: new Response("long-completion") };
  };
  const response = f.start();
  await pause();
  busy();
  assert.equal(await (await response).text(), "long-completion");
  assert.equal(finished, true);
});

test("eligibility loss releases the logical claim before ordinary set retry delay", async () => {
  const busy = await acquire("fixture:eligibility", { maxConcurrency: 1 });
  const f = fixture(["eligibility"]);
  f.extra.maxSetRetries = 1;
  f.extra.setRetryDelayMs = 80;
  const response = f.start();
  await pause();
  f.excluded.add("eligibility");
  busy();
  await pause(15);
  let directAdmitted = false;
  const direct = acquire("fixture:eligibility", { maxConcurrency: 1 }).then((done) => {
    directAdmitted = true;
    done();
  });
  await pause(10);
  assert.equal(directAdmitted, true);
  f.excluded.clear();
  assert.equal(await (await response).text(), "eligibility");
  await direct;
});

test("ordinary retry delay is bounded by the remaining capacity deadline", async () => {
  const { getComboMetrics, resetComboMetrics } =
    await import("../../../open-sse/services/comboMetrics.ts");
  const busy = await acquire("fixture:retry-delay", { maxConcurrency: 1 });
  const f = fixture(["retry-delay"], undefined, 40);
  f.deps.combo.name = "capacity-retry-delay-metrics";
  resetComboMetrics(f.deps.combo.name);
  f.extra.maxSetRetries = 1;
  f.extra.setRetryDelayMs = 500;
  const startedAt = Date.now();
  const response = f.start();
  await pause();
  f.excluded.add("retry-delay");
  busy();
  assert.equal((await response).status, 503);
  assert.equal(
    getComboMetrics(f.deps.combo.name)?.totalRequests,
    1,
    "one zero-attempt set is counted once"
  );
  assert.ok(Date.now() - startedAt < 200, "retry delay cannot extend the admission deadline");
});

for (const cap of [2, 0]) {
  test(`persisted cap change to ${cap} wakes a parked combo without a release`, async () => {
    const { createProviderConnection, updateProviderConnection } =
      await import("../../../src/lib/db/providers.ts");
    const { evaluateExecuteTargetGates } =
      await import("../../../open-sse/services/combo/executeTargetGates.ts");
    const account = await createProviderConnection({
      provider: "fixture",
      authType: "apikey",
      name: `cap-${cap}`,
      apiKey: `fixture-${cap}`,
      isActive: true,
      maxConcurrent: 1,
    });
    const id = String(account.id);
    const busy = await acquire(`fixture:${id}`, { maxConcurrency: 1 });
    const f = fixture([id]);
    f.extra.evaluateGates = evaluateExecuteTargetGates;
    f.extra.executeAttempt = async () => {
      const done = await acquire(`fixture:${id}`, { maxConcurrency: cap });
      done();
      return { ok: true, response: new Response("updated-cap") };
    };
    const response = f.start();
    await pause(15);
    await updateProviderConnection(id, { maxConcurrent: cap });
    assert.equal(await (await response).text(), "updated-cap");
    busy();
  });
}

test("capacity timeout records metrics and terminal trace exactly once after a late gate callback", async () => {
  const { getComboMetrics, resetComboMetrics } =
    await import("../../../open-sse/services/comboMetrics.ts");
  const { startComboTrace, getComboTrace } =
    await import("../../../open-sse/services/combo/decisionTrace.ts");
  const busy = await acquire("fixture:metrics", { maxConcurrency: 1 });
  const f = fixture(["metrics"], undefined, 25);
  f.deps.combo.name = "capacity-metrics";
  f.deps.traceInvocationId = "capacity-metrics-trace";
  resetComboMetrics(f.deps.combo.name);
  startComboTrace(f.deps.traceInvocationId, { strategy: "priority", comboName: f.deps.combo.name });
  const response = f.start();
  await pause();
  f.setBeforeGate(async () => {
    await pause(60);
  });
  busy();
  assert.equal((await response).status, 503);
  await pause(70);
  assert.equal(getComboMetrics(f.deps.combo.name)?.totalRequests, 1);
  assert.equal(getComboMetrics(f.deps.combo.name)?.totalSuccesses, 0);
  assert.equal(getComboTrace(f.deps.traceInvocationId)?.terminal?.status, 503);
  assert.deepEqual(f.dispatched, []);
});

test("capacity, semaphore, and the real rate limiter share one queue budget", async () => {
  const sem = await import("../../../open-sse/services/accountSemaphore.ts");
  const limiter = await import("../../../open-sse/services/rateLimitManager.ts");
  const { remainingQueueBudgetMs } =
    await import("../../../open-sse/handlers/chatCore/queueBudget.ts");
  const { getTrustedLocalRateLimitError } =
    await import("../../../open-sse/services/rateLimitManager/errors.ts");
  await limiter.__resetRateLimitManagerForTests();
  const conn = "capacity-rate-budget";
  limiter.enableRateLimitProtection(conn);
  limiter.refreshConnectionRateLimits(conn, { maxConcurrent: 1 });
  let entered!: () => void;
  let releaseFirst!: () => void;
  const started = new Promise<void>((resolve) => {
    entered = resolve;
  });
  const held = new Promise<void>((resolve) => {
    releaseFirst = resolve;
  });
  const first = limiter.withRateLimit(
    "openai",
    conn,
    "model",
    async () => {
      entered();
      await held;
    },
    null,
    1000
  );
  await started;
  const initial = await sem.acquire("fixture:rate-budget", { maxConcurrency: 1 });
  const waiter = sem.createAccountCapacityWait({ deadline: Date.now() + 120 });
  const waiting = waiter.wait([{ key: "fixture:rate-budget", maxConcurrency: 1 }]);
  await pause(30);
  initial();
  await waiting;
  let called = false;
  try {
    await waiter.run(async () => {
      const maxWait = sem.remainingAccountCapacityBudgetMs(1000);
      assert.ok(maxWait < 110, "capacity waiting already consumed part of the budget");
      const gateStartedAt = Date.now();
      const release = await sem.acquire("fixture:rate-budget", {
        maxConcurrency: 1,
        timeoutMs: maxWait,
      });
      try {
        await assert.rejects(
          limiter.withRateLimit(
            "openai",
            conn,
            "model",
            async () => {
              called = true;
            },
            null,
            remainingQueueBudgetMs(maxWait, gateStartedAt)
          ),
          (error: unknown) => getTrustedLocalRateLimitError(error)?.status === 503
        );
      } finally {
        release();
      }
    });
  } finally {
    waiter.close();
    releaseFirst();
    await first;
  }
  await pause(30);
  assert.equal(called, false, "expired rate-limit work cannot run after capacity returns");
  await limiter.__resetRateLimitManagerForTests();
});

test("new fallback does not retain abandoned account claims during active execution", async () => {
  const busy = await acquire("fixture:abandoned", { maxConcurrency: 1 });
  const f = fixture(["abandoned", "new-fallback"]);
  f.state.orderedTargets[0].fallbackOnlyOnQuotaExhaustion = true;
  let entered!: () => void;
  let releaseExecution!: () => void;
  const started = new Promise<void>((resolve) => {
    entered = resolve;
  });
  const held = new Promise<void>((resolve) => {
    releaseExecution = resolve;
  });
  f.extra.executeAttempt = async () => {
    const done = await acquire("fixture:new-fallback", { maxConcurrency: 1 });
    markAccountCapacityExecutionStarted();
    entered();
    await held;
    done();
    return { ok: true, response: new Response("new-fallback") };
  };
  const response = f.start();
  await pause();
  f.excluded.add("abandoned");
  busy();
  await started;
  let directAdmitted = false;
  const direct = acquire("fixture:abandoned", { maxConcurrency: 1 }).then((done) => {
    directAdmitted = true;
    done();
  });
  try {
    await pause(15);
    assert.equal(directAdmitted, true, "unrelated fallback execution keeps no old ordering claim");
  } finally {
    releaseExecution();
  }
  assert.equal(await (await response).text(), "new-fallback");
  await direct;
});

test("post-wake circuit cooldown recursion remains within the capacity deadline", async () => {
  const { createProviderConnection } = await import("../../../src/lib/db/providers.ts");
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");
  const { getCircuitBreaker } = await import("../../../src/shared/utils/circuitBreaker.ts");
  const { connectionCircuitBreakerName } =
    await import("../../../open-sse/services/connectionCircuitBreaker.ts");
  const provider = "fixture-cooldown-budget";
  const account = await createProviderConnection({
    provider,
    authType: "apikey",
    name: "cooldown-budget",
    apiKey: "fixture-key",
    isActive: true,
    maxConcurrent: 1,
  });
  const id = String(account.id);
  const busy = await acquire(`${provider}:${id}`, { maxConcurrency: 1 });
  const f = fixture([id], undefined, 80, provider);
  f.extra.evaluateGates = evaluateExecuteTargetGates;
  f.extra.comboCooldownWaitEnabled = true;
  f.extra.comboCooldownBudgetLeftMs.current = 1000;
  f.deps.resilienceSettings.comboCooldownWait = {
    enabled: true,
    maxWaitMs: 1000,
    maxAttempts: 2,
    budgetMs: 1000,
  };
  let checked = false;
  f.deps.isModelAvailable = () => {
    checked = true;
    return true;
  };
  const startedAt = Date.now();
  const response = f.start();
  for (let tries = 0; !checked && tries < 100; tries++) await pause();
  assert.equal(checked, true);
  getCircuitBreaker(connectionCircuitBreakerName(provider, id), {
    failureThreshold: 1,
    resetTimeout: 500,
  })._onFailure("transient");
  busy();
  const result = await response;
  assert.equal(result.status, 503);
  assert.equal((await result.json()).error.code, "service_unavailable");
  assert.ok(
    Date.now() - startedAt < 250,
    "cooldown wait is cut off by existing admission deadline"
  );
  assert.deepEqual(f.dispatched, []);
});

test("protected saturated priority expires retryably without dispatching a free lower target", async () => {
  const busy = await acquire("fixture:protected-high", { maxConcurrency: 1 });
  const f = fixture(["protected-high", "nested-low"], undefined, 25);
  f.state.orderedTargets[0].fallbackOnlyOnQuotaExhaustion = true;
  const response = await f.start();
  assert.equal(response.status, 503);
  assert.equal((await response.json()).error.code, "service_unavailable");
  assert.deepEqual(f.dispatched, []);
  busy();
});

test("late pre-acquire handoff is bounded and cannot dispatch after timeout", async () => {
  const busy = await acquire("fixture:late-handoff", { maxConcurrency: 1 });
  const f = fixture(["late-handoff"], undefined, 40);
  let calls = 0;
  f.extra.executeAttempt = async () => {
    await pause(180);
    const done = await acquire("fixture:late-handoff", { maxConcurrency: 1 });
    calls++;
    done();
    return { ok: true, response: new Response("too-late") };
  };
  const started = Date.now();
  const response = f.start();
  await pause();
  busy();
  assert.equal((await response).status, 503);
  assert.ok(Date.now() - started < 140, "handoff cannot extend a40ms admission budget to180ms");
  assert.equal(f.state.abortControllers.get(0)?.signal.aborted, true);
  await pause(190);
  assert.equal(calls, 0);
  const { getStats } = await import("../../../open-sse/services/accountSemaphore.ts");
  assert.equal(getStats()["fixture:late-handoff"]?.running ?? 0, 0);
});

for (const mode of ["retry", "fallback"] as const) {
  test(`real executeTargetAttempt ${mode} delay stays within the capacity deadline`, async () => {
    const { executeTargetAttempt } =
      await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
    const id = `real-${mode}-delay`;
    const busy = await acquire(`fixture:${id}`, { maxConcurrency: 1 });
    const f = fixture([id], undefined, 50);
    f.extra.executeAttempt = executeTargetAttempt;
    f.deps.maxRetries = mode === "retry" ? 1 : 0;
    f.deps.config.retryDelayMs = 250;
    f.deps.config.fallbackDelayMs = 250;
    let calls = 0;
    f.deps.handleSingleModelWithTimeout = async () => {
      const done = await acquire(`fixture:${id}`, { maxConcurrency: 1 });
      markAccountCapacityExecutionStarted();
      calls++;
      done();
      return Response.json(
        { error: { message: "Temporary server error" } },
        { status: mode === "retry" ? 500 : 502 }
      );
    };
    const started = Date.now();
    const response = f.start();
    await pause();
    busy();
    const result = await response;
    assert.equal(result.status, 503);
    assert.equal((await result.json()).error.code, "service_unavailable");
    assert.ok(Date.now() - started < 170, "a250ms target delay cannot extend a50ms budget");
    await pause(270);
    assert.equal(calls, 1, "no late retry/fallback dispatch");
    const { getStats } = await import("../../../open-sse/services/accountSemaphore.ts");
    assert.equal(getStats()[`fixture:${id}`]?.running ?? 0, 0);
  });
}

test("late pre-execution cached response cannot record success after admission timeout", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const { getComboMetrics, resetComboMetrics } =
    await import("../../../open-sse/services/comboMetrics.ts");
  const busy = await acquire("fixture:late-cache", { maxConcurrency: 1 });
  const f = fixture(["late-cache"], undefined, 200);
  f.deps.combo.name = "capacity-late-cache";
  resetComboMetrics(f.deps.combo.name);
  f.extra.executeAttempt = executeTargetAttempt;
  const entered = Promise.withResolvers<void>();
  const releaseCache = Promise.withResolvers<void>();
  const finished = Promise.withResolvers<void>();
  let canceled = 0;
  f.deps.handleSingleModelWithTimeout = async () => {
    assert.ok(
      Date.now() < f.state.capacityWaitDeadline!,
      "cache lookup enters within the original bound"
    );
    entered.resolve();
    try {
      await releaseCache.promise;
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(
              new TextEncoder().encode(
                JSON.stringify({
                  choices: [{ message: { content: "cached" }, finish_reason: "stop" }],
                })
              )
            );
          },
          cancel() {
            canceled++;
          },
        }),
        { headers: { "content-type": "application/json" } }
      );
    } finally {
      finished.resolve();
    }
  };
  const response = f.start();
  try {
    const until = Date.now() + 1000;
    while (getStats()["fixture:late-cache"]?.queued !== 1 && Date.now() < until) await pause();
    assert.equal(
      getStats()["fixture:late-cache"]?.queued,
      1,
      "actual parked enrollment is required"
    );
    busy();
    assert.ok(await Promise.race([entered.promise.then(() => true), pause(500).then(() => false)]));
    assert.equal((await response).status, 503);
    assert.equal(f.state.globalAttempts, 0, "an expired cache admission does not charge upstream");
    releaseCache.resolve();
    await finished.promise;
    await pause();
    assert.equal(canceled, 1, "late cached response is owned and canceled exactly once");
    assert.equal(getComboMetrics(f.deps.combo.name)?.totalRequests, 1);
    assert.equal(getComboMetrics(f.deps.combo.name)?.totalSuccesses, 0);
  } finally {
    busy();
    releaseCache.resolve();
    await response;
  }
});

for (const mode of ["retry", "fallback"] as const) {
  test(`no-capacity executeTargetAttempt ${mode} cancellation preserves499`, async () => {
    const { executeTargetAttempt } =
      await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
    const controller = new AbortController();
    const f = fixture([`no-capacity-${mode}`]);
    f.deps.signal = controller.signal;
    f.deps.maxRetries = mode === "retry" ? 1 : 0;
    f.deps.config.retryDelayMs = 250;
    f.deps.config.fallbackDelayMs = 250;
    let calls = 0;
    f.deps.handleSingleModelWithTimeout = async () => {
      calls++;
      setTimeout(() => controller.abort(), 10);
      return Response.json(
        { error: { message: "Temporary server error" } },
        { status: mode === "retry" ? 500 : 502 }
      );
    };
    const result = await executeTargetAttempt({
      index: 0,
      state: f.state,
      deps: f.deps,
      targetForAttempt: f.state.orderedTargets[0],
      profile: {},
      protectedPriorityTarget: false,
    });
    assert.ok(result);
    assert.equal(result.response?.status, 499);
    assert.equal(calls, 1);
  });
}

for (const outcome of ["success", "fatal", "drained"] as const) {
  test(`expired admission hedge preserves active sibling until ${outcome}`, async () => {
    const { getStats } = await import("../../../open-sse/services/accountSemaphore.ts");
    const { getComboMetrics, resetComboMetrics } =
      await import("../../../open-sse/services/comboMetrics.ts");
    const { startComboTrace, getComboTrace } =
      await import("../../../open-sse/services/combo/decisionTrace.ts");
    const ids = [`hedge-active-${outcome}`, `hedge-wait-${outcome}`];
    const held = await Promise.all(
      ids.map((id) => acquire(`fixture:${id}`, { maxConcurrency: 1 }))
    );
    const f = fixture(ids, undefined, 60);
    f.deps.config.zeroLatencyOptimizationsEnabled = true;
    f.deps.config.hedging = true;
    f.deps.config.hedgeDelayMs = 5;
    f.deps.combo.name = `capacity-hedge-${outcome}`;
    f.deps.traceInvocationId = `capacity-hedge-trace-${outcome}`;
    resetComboMetrics(f.deps.combo.name);
    startComboTrace(f.deps.traceInvocationId, {
      strategy: "priority",
      comboName: f.deps.combo.name,
    });
    let activeStarted = false;
    let activeAborted = false;
    let lateDispatches = 0;
    f.extra.executeAttempt = async ({ index }) => {
      if (index === 1) {
        await pause(200);
        const done = await acquire(`fixture:${ids[1]}`, { maxConcurrency: 1 });
        lateDispatches++;
        done();
        return { ok: true, response: new Response("late-hedge") };
      }
      const done = await acquire(`fixture:${ids[0]}`, { maxConcurrency: 1 });
      try {
        markAccountCapacityExecutionStarted();
        activeStarted = true;
        await pause(120);
        activeAborted = f.state.abortControllers.get(0)?.signal.aborted === true;
        if (outcome === "drained") return { ok: false };
        return {
          ok: outcome === "success",
          response: new Response("active-result", { status: outcome === "success" ? 200 : 500 }),
        };
      } finally {
        done();
      }
    };
    const started = Date.now();
    const pending = f.start();
    await pause(10);
    held.forEach((release) => release());
    const result = await pending;
    assert.equal(activeStarted, true);
    assert.equal(activeAborted, false, "admission expiry cannot abort active upstream");
    const expectedStatus = outcome === "success" ? 200 : outcome === "fatal" ? 500 : 503;
    assert.equal(result.status, expectedStatus);
    assert.ok(Date.now() - started >= 120, "active sibling finishes under execution timeout");
    assert.equal(f.state.abortControllers.get(1)?.signal.aborted, true);
    assert.equal(getComboTrace(f.deps.traceInvocationId)?.terminal?.status, expectedStatus);
    const expectedFailures = outcome === "drained" ? 1 : 0;
    assert.equal(getComboMetrics(f.deps.combo.name)?.totalRequests ?? 0, expectedFailures);
    await pause(220);
    assert.equal(lateDispatches, 0, "retired admission cannot dispatch late");
    assert.equal(getComboTrace(f.deps.traceInvocationId)?.terminal?.status, expectedStatus);
    assert.equal(getComboMetrics(f.deps.combo.name)?.totalRequests ?? 0, expectedFailures);
    for (const id of ids) assert.equal(getStats()[`fixture:${id}`]?.running ?? 0, 0);
  });
}

test("shared budget refusal does not charge an undispatched attempt", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const f = fixture(["budget-refusal"]);
  f.state.globalAttempts = 1;
  f.deps.config.maxGlobalAttempts = 1;
  let calls = 0;
  f.deps.handleSingleModelWithTimeout = async () => {
    calls++;
    return new Response("unexpected");
  };
  const result = await executeTargetAttempt({
    index: 0,
    state: f.state,
    deps: f.deps,
    targetForAttempt: f.state.orderedTargets[0],
    profile: {},
    protectedPriorityTarget: false,
  });
  assert.equal(result?.response?.status, 503);
  assert.equal(calls, 0);
  assert.equal(f.state.globalAttempts, 1);
});

for (const deadlineKind of ["capacity", "combo", "abort"] as const) {
  test(`clipped set retry cannot open another set on an early timer (${deadlineKind})`, async () => {
    const { getComboMetrics, resetComboMetrics } =
      await import("../../../open-sse/services/comboMetrics.ts");
    const key = `fixture:clipped-early-${deadlineKind}`;
    const busy = await acquire(key, { maxConcurrency: 1 });
    const controller = new AbortController();
    const f = fixture(
      [`clipped-early-${deadlineKind}`],
      controller.signal,
      deadlineKind === "combo" ? 1000 : 500
    );
    f.deps.combo.name = `capacity-clipped-early-${deadlineKind}`;
    resetComboMetrics(f.deps.combo.name);
    f.extra.maxSetRetries = 1;
    f.extra.setRetryDelayMs = 5000;
    if (deadlineKind === "combo") f.extra.comboTimeoutMs = 500;
    const originalSetTimeout = globalThis.setTimeout;
    let earlyTimer = false;
    let intercepted = 0;
    f.deps.log.info = (_tag, message) => {
      if (typeof message === "string" && message.startsWith("All targets failed — retrying set"))
        earlyTimer = true;
    };
    globalThis.setTimeout = ((
      callback: (...args: unknown[]) => void,
      delay?: number,
      ...args: unknown[]
    ) => {
      if (earlyTimer) {
        earlyTimer = false;
        intercepted++;
        return originalSetTimeout(() => {
          callback(...args);
          if (deadlineKind === "abort") queueMicrotask(() => controller.abort());
        }, 0);
      }
      return originalSetTimeout(callback, delay, ...args);
    }) as typeof setTimeout;
    try {
      const pending = f.start();
      await pause();
      f.excluded.add(`clipped-early-${deadlineKind}`);
      busy();
      const response = await pending;
      assert.equal(intercepted, 1, "the clipped retry timer fired before the deadline");
      assert.equal(
        response.status,
        deadlineKind === "abort" ? 499 : deadlineKind === "combo" ? 504 : 503
      );
      assert.equal(getEventListeners(controller.signal, "abort").length, 0);
      assert.equal(getComboMetrics(f.deps.combo.name)?.totalRequests, 1);
      assert.equal(f.state.globalAttempts, 0);
      assert.deepEqual(f.dispatched, []);
      const body = await response.json();
      if (deadlineKind !== "abort")
        assert.equal(
          body.error.code,
          deadlineKind === "combo" ? "COMBO_TIMEOUT" : "service_unavailable"
        );
    } finally {
      globalThis.setTimeout = originalSetTimeout;
      busy();
    }
  });
}

test("mixed connection queue bounds drop an expired alternative and keep waiting for the survivor", async () => {
  const limiter = await import("../../../open-sse/services/rateLimitManager.ts");
  limiter.refreshConnectionRateLimits("short", { maxWaitMs: 25 });
  limiter.refreshConnectionRateLimits("long", { maxWaitMs: 250 });
  const short = await acquire("fixture:short", { maxConcurrency: 1 });
  const long = await acquire("fixture:long", { maxConcurrency: 1 });
  const f = fixture(["short", "long"], undefined, 500);
  const result = f.start();
  await pause(60);
  assert.deepEqual(f.dispatched, []);
  long();
  assert.equal(await (await result).text(), "long");
  assert.equal(f.state.globalAttempts, 1);
  short();
  limiter.refreshConnectionRateLimits("short", null);
  limiter.refreshConnectionRateLimits("long", null);
});

test("fast hedged winner clears the pending long hedge timer", async (t) => {
  const nativeSetTimeout = globalThis.setTimeout,
    nativeClearTimeout = globalThis.clearTimeout;
  const pending = new Set<number | ReturnType<typeof setTimeout>>();
  let scheduled = 0;
  t.mock.method(
    globalThis,
    "setTimeout",
    (callback: () => void, ms: number, ...args: unknown[]) => {
      const timer = nativeSetTimeout(callback, ms, ...args);
      if (ms === 9876) {
        scheduled++;
        pending.add(timer);
      }
      return timer;
    }
  );
  t.mock.method(
    globalThis,
    "clearTimeout",
    (timer: number | ReturnType<typeof setTimeout> | undefined) => {
      if (timer) pending.delete(timer);
      nativeClearTimeout(timer);
    }
  );
  const f = fixture(["timer-fast", "timer-sibling"]);
  f.deps.config.zeroLatencyOptimizationsEnabled = true;
  f.deps.config.hedging = true;
  f.deps.config.hedgeDelayMs = 9876;
  try {
    assert.equal((await f.start()).status, 200);
    assert.equal(scheduled, 1);
    assert.equal(pending.size, 0, "fast completion must remove its still-scheduled hedge");
    assert.equal(f.dispatched.length, 1);
  } finally {
    for (const timer of pending) nativeClearTimeout(timer);
    t.mock.restoreAll();
  }
});

test("retry charge expires before its diagnostic entry and leaves B's real attempt budget", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const limiter = await import("../../../open-sse/services/rateLimitManager.ts");
  const { capacityRequestDeadline, runCapacityRequest } =
    await import("../../../open-sse/services/combo/capacityBudgetContext.ts");
  const a = "early-charge-a",
    b = "early-charge-b";
  limiter.refreshConnectionRateLimits(a, { maxWaitMs: 100 });
  limiter.refreshConnectionRateLimits(b, { maxWaitMs: 400 });
  const heldA = await acquire("fixture:" + a, { maxConcurrency: 1 });
  const heldB = await acquire("fixture:" + b, { maxConcurrency: 1 });
  const f = fixture([a, b], undefined, 400);
  f.extra.executeAttempt = executeTargetAttempt;
  f.deps.maxRetries = 1;
  f.deps.config.retryDelayMs = 200;
  f.deps.config.maxGlobalAttempts = 2;
  const calls: string[] = [];
  let bTimer: ReturnType<typeof setTimeout> | undefined;
  f.deps.handleSingleModelWithTimeout = async (_body, _model, target) => {
    assert.ok(target && "connectionId" in target);
    const id = target.connectionId!;
    const release = await acquire("fixture:" + id, { maxConcurrency: 1 });
    markAccountCapacityExecutionStarted();
    calls.push(id);
    release();
    if (id === a) {
      const bound = capacityRequestDeadline("fixture:" + a, 100);
      assert.ok(Date.now() < bound, "A's real attempt starts before its original bound");
      bTimer = setTimeout(heldB, Math.max(0, bound - Date.now() + 50));
      return Response.json({ error: { message: "temporary upstream failure" } }, { status: 500 });
    }
    return Response.json({
      choices: [{ message: { content: "B served" }, finish_reason: "stop" }],
    });
  };
  const response = runCapacityRequest(() => f.start());
  try {
    const until = Date.now() + 1000;
    while (
      (getStats()["fixture:" + a]?.queued !== 1 || getStats()["fixture:" + b]?.queued !== 1) &&
      Date.now() < until
    )
      await pause();
    assert.equal(getStats()["fixture:" + a]?.queued, 1);
    assert.equal(getStats()["fixture:" + b]?.queued, 1);
    heldA();
    const result = await response;
    assert.equal(result.status, 200);
    assert.match(await result.text(), /B served/);
    assert.deepEqual(
      calls,
      [a, b],
      "first A is real work; its undispatched retry cannot consume B's remaining budget"
    );
    assert.equal(f.state.globalAttempts, 2);
    assert.equal(
      f.state.recordedAttempts,
      1,
      "B records one terminal outcome; both real sends remain charged above"
    );
    assert.deepEqual(
      f.state.comboAttemptOrder.map((value) => value.model),
      ["fixture/model-" + a, "fixture/model-" + b]
    );
  } finally {
    if (bTimer) clearTimeout(bTimer);
    heldA();
    heldB();
    await response;
    limiter.refreshConnectionRateLimits(a, null);
    limiter.refreshConnectionRateLimits(b, null);
  }
});

for (const mode of ["started", "unstarted", "genuine"] as const) {
  test("ordinary no-context attempt preserves its existing charge: " + mode, async () => {
    const { executeTargetAttempt } =
      await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
    const { buildTargetTimeoutRunner } =
      await import("../../../open-sse/services/combo/targetTimeoutRunner.ts");
    const { COMBO_HEDGE_CANCELLED_REASON } =
      await import("../../../open-sse/services/combo/comboAbortReasons.ts");
    const f = fixture(["outside-charge-" + mode]);
    const controller = new AbortController();
    f.state.abortControllers.set(0, controller);
    let actual = 0;
    const reason = new Error(COMBO_HEDGE_CANCELLED_REASON);
    f.deps.handleSingleModelWithTimeout = buildTargetTimeoutRunner({
      comboTargetTimeoutMs: 0,
      log: f.deps.log,
      handleSingleModel: async () => {
        if (mode !== "unstarted") actual++;
        if (mode === "genuine") throw new Error("ordinary genuine provider exception");
        controller.abort(reason);
        throw reason;
      },
    });
    const targetForAttempt = { ...f.state.orderedTargets[0], modelAbortSignal: controller.signal };
    const result = executeTargetAttempt({
      index: 0,
      state: f.state,
      deps: f.deps,
      targetForAttempt,
      profile: {},
      protectedPriorityTarget: false,
    });
    if (mode === "genuine") {
      await result;
      assert.equal(f.state.lastStatus, 502);
      assert.equal(f.state.recordedAttempts, 1);
    } else await assert.rejects(result, (error) => error === reason);
    assert.equal(
      f.state.globalAttempts,
      1,
      "absence of capacity tracking never proves an unused charge"
    );
    assert.equal(actual, mode === "unstarted" ? 0 : 1);
  });
}
