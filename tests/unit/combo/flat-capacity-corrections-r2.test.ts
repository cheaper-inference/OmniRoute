import test from "node:test";
import assert from "node:assert/strict";
import { AsyncLocalStorage } from "node:async_hooks";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { cleanup } = createTempDataDir("flat-capacity-r2-");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const providers = await import("../../../src/lib/db/providers.ts");
const sem = await import("../../../open-sse/services/accountSemaphore.ts");
const aux = await import("../../../open-sse/services/rateLimitSemaphore.ts");
const limiter = await import("../../../open-sse/services/rateLimitManager.ts");
const { acquireAuxiliaryAdmissions } =
  await import("../../../open-sse/services/combo/auxiliaryAdmission.ts");
const budget = await import("../../../open-sse/services/combo/capacityBudgetContext.ts");
const handoff = await import("../../../src/lib/db/contextHandoffs.ts");
const { scopeHandoffSessionId } =
  await import("../../../open-sse/services/combo/handoffSessionScope.ts");
const { lockModel, clearModelLock } = await import("../../../open-sse/services/accountFallback.ts");
const log = { info() {}, warn() {}, debug() {}, error() {} };
const pause = (ms = 5) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const answer = (text = "served") =>
  Response.json({ choices: [{ message: { role: "assistant", content: text } }] });
let sequence = 0;
const config = {
  maxRetries: 0,
  maxSetRetries: 0,
  comboTimeoutMs: 2000,
  targetTimeoutMs: 0,
  comboCooldownWaitEnabled: false,
};
async function account(extra = {}) {
  const row = await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "synthetic-r2-" + ++sequence,
    isActive: true,
    maxConcurrent: 1,
    ...extra,
  });
  return String(row.id);
}
function model(id: string, name = "gpt-4o-mini", provider = "openai") {
  return { kind: "model", provider, model: name, connectionId: id };
}
async function until(check: () => boolean) {
  for (let i = 0; i < 200 && !check(); i++) await pause();
  assert.ok(check(), "actual prerequisite reached");
}
function options(id: string) {
  const combo = { name: "r2-" + ++sequence, strategy: "priority", config, models: [model(id)] };
  return {
    combo,
    body: { stream: false, messages: [{ role: "user", content: "capacity correction" }] },
    settings: { resilienceSettings: { providerCooldown: { enabled: false } } },
    log,
    isModelAvailable: async () => true,
    handleSingleModel: async () => answer(),
  };
}
test.afterEach(() => {
  sem.resetAll();
  aux.resetAll();
});
test.after(async () => {
  const { dispatchEvent } = await import("../../../src/lib/webhookDispatcher.ts");
  await dispatchEvent("request.failed", {});
  await cleanup();
});

test("F1 mixed authorized retry starts no capacity clock before actual parking", async () => {
  const a = await account(),
    b = await account();
  const opts = options(a);
  await handleComboChat(opts);
  const held = await sem.acquire("openai:" + a, { maxConcurrency: 1 });
  lockModel("openai", b, "gpt-4o", "rate_limit", 150);
  const messages: string[] = [],
    calls: string[] = [];
  try {
    const response = await handleComboChat({
      ...opts,
      combo: {
        ...opts.combo,
        config: { ...config, maxSetRetries: 1, setRetryDelayMs: 200 },
        models: [model(a), model(b, "gpt-4o")],
      },
      settings: {
        resilienceSettings: {
          requestQueue: { maxWaitMs: 100 },
          providerCooldown: { enabled: false },
        },
      },
      log: {
        ...log,
        info(_tag, text) {
          messages.push(String(text));
        },
      },
      handleSingleModel: async (_body, name) => {
        calls.push(name);
        return answer();
      },
    });
    assert.ok(
      messages.some((m) => m.includes("gpt-4o") && m.includes("model locked")),
      "B was initially excluded by cooldown"
    );
    assert.equal(
      response.status,
      200,
      "a queue clock that never parked cannot cut off the existing retry"
    );
    assert.deepEqual(calls, ["openai/gpt-4o"]);
    assert.equal(sem.getStats()["openai:" + a]?.running, 1, "A remains held");
    assert.equal(messages.filter((m) => m.includes("retrying set")).length, 1);
  } finally {
    held();
    clearModelLock("openai", b, "gpt-4o");
  }
});

for (const strategy of ["priority", "quota-share"]) {
  test("F2 actual deferred summary detaches retired parent admission: " + strategy, async () => {
    const id = await account();
    const opts = options(id);
    const combo = { ...opts.combo, strategy };
    await handleComboChat(opts);
    const sessionId = "summary-" + ++sequence;
    const scoped = scopeHandoffSessionId(sessionId, undefined)!;
    handoff.recordSessionModelUsage(scoped, combo.name, "openai/gpt-4o", "openai", id);
    const trace = new AsyncLocalStorage<string>();
    const entered = Promise.withResolvers<void>(),
      dispatch = Promise.withResolvers<void>(),
      finished = Promise.withResolvers<void>();
    const failures: unknown[] = [];
    let scheduled = 0,
      sent = 0;
    const held =
      strategy === "priority" ? await sem.acquire("openai:" + id, { maxConcurrency: 1 }) : null;
    const response = trace.run("keep-auth-and-trace", () =>
      handleComboChat({
        ...opts,
        combo,
        settings: {
          resilienceSettings: {
            quotaShareConcurrencyLimit: { enabled: true },
            providerCooldown: { enabled: false },
          },
        },
        relayOptions: {
          sessionId,
          universalHandoffConfig: { enabled: true, handoffModel: "openai/gpt-4o-mini" },
        },
        handleSingleModel: async (body) => {
          const summary = body._omnirouteInternalRequest === "universal-handoff";
          if (summary) {
            scheduled++;
            entered.resolve();
            await dispatch.promise;
          }
          let release: (() => void) | undefined, releaseAux: (() => void) | undefined;
          try {
            if (summary) {
              assert.equal(trace.getStore(), "keep-auth-and-trace");
              assert.equal(budget.capacityRequestDeadline("openai:" + id, 1000), Infinity);
              assert.equal(sem.captureAccountCapacityExecution(), null);
            }
            release = await sem.acquire("openai:" + id, { maxConcurrency: 1 });
            releaseAux = await acquireAuxiliaryAdmissions(id, new AbortController().signal, 1000);
            sem.markAccountCapacityExecutionStarted();
            if (summary) sent++;
            return answer(
              summary
                ? '{"summary":"independent work","keyDecisions":[],"taskProgress":[],"activeEntities":[]}'
                : "main body"
            );
          } catch (error) {
            if (summary) failures.push(error);
            throw error;
          } finally {
            releaseAux?.();
            release?.();
            if (summary) finished.resolve();
          }
        },
      })
    );
    try {
      if (held) {
        await until(() => sem.getStats()["openai:" + id]?.queued === 1);
        held();
      }
      const selected = await response;
      assert.equal(selected.status, 200);
      await selected.text();
      await Promise.race([entered.promise, pause(1000)]);
      assert.equal(scheduled, 1, "the actual deferred scheduler scheduled an eligible summary");
      assert.deepEqual(aux.getStats(), {}, "parent auxiliary owner has handed off");
      dispatch.resolve();
      await finished.promise;
      assert.deepEqual(failures, [], "retired parent contexts cannot fence an independent summary");
      assert.equal(sent, 1);
      await until(() => Boolean(handoff.getHandoff(scoped, combo.name)?.summary));
      assert.equal(sem.getStats()["openai:" + id]?.running ?? 0, 0);
      assert.deepEqual(aux.getStats(), {});
    } finally {
      held?.();
      dispatch.resolve();
      await response;
      if (scheduled) await finished.promise;
    }
  });
}

for (const kind of ["override", "ceiling"]) {
  test("F4 root uses a free alternative for execution-only cap: " + kind, async () => {
    const provider = kind === "ceiling" ? "copilot-m365-web" : "openai";
    const a = await account({
      provider,
      maxConcurrent: null,
      ...(kind === "override"
        ? { rateLimitProtection: true, rateLimitOverrides: { maxConcurrent: 1 } }
        : {}),
    });
    const b = await account();
    if (kind === "override") {
      limiter.refreshConnectionRateLimits(a, { maxConcurrent: 1 });
      limiter.enableRateLimitProtection(a);
    }
    const opts = options(a);
    await handleComboChat({
      ...opts,
      combo: { ...opts.combo, models: [model(a, "gpt-4o-mini", provider)] },
    });
    const held = await sem.acquireMany([
      {
        key: provider + ":" + a,
        maxConcurrency: 1,
        connectionId: a,
        connectionCapacity: kind === "ceiling" ? 1 : null,
        followConnectionCapacity: kind !== "override",
        ...(kind === "ceiling" ? { concurrencyCeiling: 1 } : {}),
      },
    ]);
    const calls: string[] = [];
    const pending = handleComboChat({
      ...opts,
      combo: { ...opts.combo, models: [model(a, "gpt-4o-mini", provider), model(b, "gpt-4o")] },
      handleSingleModel: async (_body, _name, target) => {
        assert.ok(target && "connectionId" in target);
        calls.push(String(target.connectionId));
        const release = await sem.acquire(
          (target.connectionId === a ? provider : "openai") + ":" + target.connectionId,
          { maxConcurrency: 1 }
        );
        release();
        return answer();
      },
    });
    try {
      const response = await Promise.race([pending, pause(100).then(() => null)]);
      assert.ok(response, "busy execution-only A must not block free B");
      assert.equal(response.status, 200);
      assert.deepEqual(calls, [b]);
    } finally {
      held();
      await pending;
      limiter.disableRateLimitProtection(a);
      limiter.refreshConnectionRateLimits(a, null);
    }
  });
}

test("F5 unread cached body surrenders its logical FIFO claim immediately", async () => {
  const id = await account();
  const opts = options(id);
  await handleComboChat(opts);
  const held = await sem.acquire("openai:" + id, { maxConcurrency: 1 });
  let executions = 0;
  const pending = handleComboChat({
    ...opts,
    handleSingleModel: async () => {
      executions++;
      return answer("cached");
    },
  });
  let selected: Response | undefined;
  let direct: Promise<void> | undefined;
  try {
    await until(() => sem.getStats()["openai:" + id]?.queued === 1);
    held();
    selected = await pending;
    assert.equal(selected.status, 200);
    assert.equal(executions, 1);
    let acquired = false;
    direct = sem.acquire("openai:" + id, { maxConcurrency: 1 }).then((release) => {
      acquired = true;
      release();
    });
    await pause(25);
    assert.equal(selected.bodyUsed, false);
    assert.equal(acquired, true, "unread cached body must not reserve a physical account");
  } finally {
    held();
    await selected?.text();
    await pending;
    await direct;
  }
});

for (const kind of ["override", "ceiling"]) {
  test("F4 execution-only all-busy pool parks without invoking an executor: " + kind, async () => {
    const provider = kind === "ceiling" ? "copilot-m365-web" : "openai";
    const a = await account({
      provider,
      maxConcurrent: null,
      ...(kind === "override" ? { rateLimitOverrides: { maxConcurrent: 1 } } : {}),
    });
    const b = await account();
    if (kind === "override") {
      limiter.refreshConnectionRateLimits(a, { maxConcurrent: 1 });
      limiter.enableRateLimitProtection(a);
    }
    const opts = options(a);
    await handleComboChat(opts);
    const heldA = await sem.acquireMany([
      {
        key: provider + ":" + a,
        maxConcurrency: 1,
        connectionId: a,
        connectionCapacity: kind === "ceiling" ? 1 : null,
        followConnectionCapacity: kind !== "override",
        ...(kind === "ceiling" ? { concurrencyCeiling: 1 } : {}),
      },
    ]);
    const heldB = await sem.acquire("openai:" + b, { maxConcurrency: 1 });
    const calls: string[] = [];
    const pending = handleComboChat({
      ...opts,
      combo: { ...opts.combo, models: [model(a, "gpt-4o-mini", provider), model(b, "gpt-4o")] },
      handleSingleModel: async (_body, _name, target) => {
        assert.ok(target && "connectionId" in target);
        calls.push(String(target.connectionId));
        const release = await sem.acquire(
          (target.connectionId === a ? provider : "openai") + ":" + target.connectionId,
          { maxConcurrency: 1 }
        );
        sem.markAccountCapacityExecutionStarted();
        release();
        return answer();
      },
    });
    try {
      await until(
        () =>
          sem.getStats()[provider + ":" + a]?.queued === 1 &&
          sem.getStats()["openai:" + b]?.queued === 1
      );
      assert.deepEqual(calls, []);
      heldB();
      const selected = await pending;
      assert.equal(selected.status, 200);
      await selected.text();
      assert.deepEqual(calls, [b]);
      assert.equal(sem.getStats()[provider + ":" + a]?.running, 1);
    } finally {
      heldA();
      heldB();
      await pending;
      limiter.disableRateLimitProtection(a);
      limiter.refreshConnectionRateLimits(a, null);
    }
  });
}

test("F4 disabled override stays disabled and live effective-cap refresh wakes its existing claim", async () => {
  const id = await account({ maxConcurrent: null, rateLimitOverrides: { maxConcurrent: 1 } });
  limiter.refreshConnectionRateLimits(id, { maxConcurrent: 1 });
  limiter.enableRateLimitProtection(id);
  const opts = options(id);
  await handleComboChat(opts);
  const held = await sem.acquireMany([
    {
      key: "openai:" + id,
      maxConcurrency: 1,
      connectionId: id,
      connectionCapacity: null,
      followConnectionCapacity: false,
    },
  ]);
  let sends = 0;
  const pending = handleComboChat({
    ...opts,
    handleSingleModel: async () => {
      sends++;
      const release = await sem.acquire("openai:" + id, { maxConcurrency: 2 });
      sem.markAccountCapacityExecutionStarted();
      release();
      return answer();
    },
  });
  try {
    await until(() => sem.getStats()["openai:" + id]?.queued === 1);
    assert.equal(sends, 0);
    await providers.updateProviderConnection(id, { rateLimitOverrides: { maxConcurrent: 2 } });
    limiter.refreshConnectionRateLimits(id, { maxConcurrent: 2 });
    const selected = await pending;
    assert.equal(selected.status, 200);
    await selected.text();
    assert.equal(sends, 1);
    assert.equal(sem.getStats()["openai:" + id]?.running, 1);
    limiter.disableRateLimitProtection(id);
    const disabled = await handleComboChat({
      ...opts,
      handleSingleModel: async () => {
        const release = await sem.acquire("openai:" + id, { maxConcurrency: null });
        release();
        return answer("disabled override");
      },
    });
    assert.equal(disabled.status, 200);
    await disabled.text();
    assert.equal(sem.getStats()["openai:" + id]?.running, 1);
  } finally {
    held();
    await pending;
    limiter.disableRateLimitProtection(id);
    limiter.refreshConnectionRateLimits(id, null);
  }
});

test("F5 cache surrender retains original recovery bound and gives later admission fresh FIFO age", async () => {
  const { handoffCapacityResponse } =
    await import("../../../open-sse/services/combo/commonCapacity.ts");
  const key = "fixture:cache-recovery-age";
  const originalBound = Date.now() + 140;
  const owner = sem.createAccountCapacityWait({
    deadline: originalBound,
    lifetimeDeadline: Date.now() + 1500,
  });
  await owner.wait([{ key, maxConcurrency: 1 }]);
  let probe!: () => number, recover!: () => Promise<() => void>, execution!: () => boolean;
  const response = await owner.run(() =>
    sem.runWithAccountCapacityAdmission(async () => {
      probe = AsyncLocalStorage.bind(() => sem.remainingAccountCapacityBudgetMs(Infinity));
      recover = AsyncLocalStorage.bind(() => sem.acquire(key, { maxConcurrency: 1 }));
      execution = sem.captureAccountCapacityExecution()!;
      return answer("cached with recovery");
    })
  );
  const selected = handoffCapacityResponse(response, owner);
  let held: (() => void) | undefined;
  try {
    assert.equal(owner.admitted, true);
    assert.equal(execution(), false, "surrender is not upstream execution");
    assert.ok(probe() > 0 && probe() <= 140, "the live context keeps its original allowance");
    held = await sem.acquire(key, { maxConcurrency: 1 });
    const order: string[] = [];
    const older = sem.acquire(key, { maxConcurrency: 1 }).then((release) => {
      order.push("direct");
      release();
    });
    const later = recover().then((release) => {
      order.push("recovery");
      release();
    });
    held();
    await older;
    await later;
    assert.deepEqual(
      order,
      ["direct", "recovery"],
      "a cached winner cannot reuse surrendered FIFO age"
    );
    await pause(Math.max(0, originalBound - Date.now() + 10));
    assert.throws(probe, { code: "COMBO_CAPACITY_TIMEOUT" });
    await selected.text();
    assert.throws(() => owner.run(() => {}), { code: "SEMAPHORE_RESET" });
  } finally {
    held?.();
    await selected.body?.cancel().catch(() => {});
    owner.close();
  }
});

test("F4 candidate cap remains binding when an existing execution gate is wider", async () => {
  const id = await account({ maxConcurrent: null, rateLimitOverrides: { maxConcurrent: 1 } });
  limiter.refreshConnectionRateLimits(id, { maxConcurrent: 1 });
  limiter.enableRateLimitProtection(id);
  const opts = options(id);
  await handleComboChat(opts);
  const held = await sem.acquireMany([
    {
      key: "openai:" + id,
      maxConcurrency: 2,
      connectionId: id,
      connectionCapacity: null,
      followConnectionCapacity: false,
    },
  ]);
  let scans = 0,
    settled = false,
    calls = 0;
  const pending = handleComboChat({
    ...opts,
    log: {
      ...log,
      info(_tag, text) {
        if (String(text).includes("is at max concurrency cap") && ++scans > 8)
          throw new Error("fixture guard: repeated capacity grants without readiness");
      },
    },
    handleSingleModel: async () => {
      calls++;
      return answer();
    },
  }).then((response) => {
    settled = true;
    return response;
  });
  try {
    await pause(30);
    assert.equal(settled, false, "a wider physical gate must not cause repeated logical grants");
    assert.equal(calls, 0);
    assert.ok(scans <= 2);
    held();
    const selected = await pending;
    assert.equal(selected.status, 200);
    await selected.text();
  } finally {
    held();
    await pending;
    limiter.disableRateLimitProtection(id);
    limiter.refreshConnectionRateLimits(id, null);
  }
});
