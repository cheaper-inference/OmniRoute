import test from "node:test";
import assert from "node:assert/strict";
import { getEventListeners } from "node:events";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { cleanup } = createTempDataDir("capacity-aux-");
const { createProviderConnection } = await import("../../../src/lib/db/providers.ts");
const sem = await import("../../../open-sse/services/accountSemaphore.ts");
const aux = await import("../../../open-sse/services/rateLimitSemaphore.ts");
const {
  withAuxiliaryAdmission,
  acquireAuxiliaryAdmissions,
  AuxiliaryAdmissionRejected,
  releaseAuxiliaryAdmissionOwner,
} = await import("../../../open-sse/services/combo/auxiliaryAdmission.ts");
const { runCapacityRequest } =
  await import("../../../open-sse/services/combo/capacityBudgetContext.ts");
const { capacityCandidate } = await import("../../../open-sse/services/combo/commonCapacity.ts");
const pause = (ms = 10) => new Promise<void>((resolve) => setTimeout(resolve, ms));
test.after(async () => {
  const { dispatchEvent } = await import("../../../src/lib/webhookDispatcher.ts");
  await dispatchEvent("request.failed", {});
  await cleanup();
});
test.afterEach(() => {
  sem.resetAll();
  aux.resetAll();
});

test("auxiliary abort removes queue depth and listeners before the holder releases", async () => {
  const held = await aux.acquire("abort", { maxConcurrency: 1 });
  const controller = new AbortController();
  const waiting = aux.acquire("abort", {
    maxConcurrency: 1,
    maxQueueSize: 1,
    signal: controller.signal,
  });
  assert.equal(aux.getStats().abort.queued, 1);
  const rejected = assert.rejects(waiting, { name: "AbortError" });
  controller.abort();
  assert.equal(aux.getStats().abort.queued, 0);
  assert.equal(getEventListeners(controller.signal, "abort").length, 0);
  const next = aux.acquire("abort", { maxConcurrency: 1, maxQueueSize: 1 });
  assert.equal(aux.getStats().abort.queued, 1);
  held();
  (await next)();
  await rejected;
  assert.deepEqual(aux.getStats(), {});
});

test("auxiliary queue size zero still fails fast", async () => {
  const held = await aux.acquire("zero", { maxConcurrency: 1 });
  await assert.rejects(aux.acquire("zero", { maxConcurrency: 1, maxQueueSize: 0 }), {
    code: "SEMAPHORE_QUEUE_FULL",
  });
  held();
});

test("nested duplicate auxiliary specifications acquire once in canonical key order", async () => {
  const seen: string[] = [];
  const spec = (key: string) => ({
    owner: {},
    kind: "round-robin" as const,
    key,
    maxConcurrency: 1,
    timeoutMs: 500,
    maxQueueSize: 2,
    onAdmitted: () => {
      seen.push(key);
    },
  });
  const release = await withAuxiliaryAdmission(spec("b"), () =>
    withAuxiliaryAdmission(spec("a"), () =>
      withAuxiliaryAdmission(spec("b"), () =>
        acquireAuxiliaryAdmissions("fixture", new AbortController().signal, 500)
      )
    )
  );
  assert.deepEqual(seen, ["a", "b"]);
  assert.equal(aux.getStats().b.running, 1);
  release();
  assert.deepEqual(aux.getStats(), {});
});

test("partial auxiliary acquisition cancellation rolls back earlier keys", async () => {
  const held = await aux.acquire("b", { maxConcurrency: 1 });
  const controller = new AbortController();
  const spec = (key: string) => ({
    owner: {},
    kind: "round-robin" as const,
    key,
    maxConcurrency: 1,
    timeoutMs: 500,
    maxQueueSize: 1,
  });
  const pending = withAuxiliaryAdmission(spec("b"), () =>
    withAuxiliaryAdmission(spec("a"), () =>
      acquireAuxiliaryAdmissions("fixture", controller.signal, 500)
    )
  );
  const rejected = assert.rejects(pending, { name: "AbortError" });
  await pause();
  assert.equal(aux.getStats().a.running, 1);
  assert.equal(aux.getStats().b.queued, 1);
  controller.abort();
  await rejected;
  assert.equal(aux.getStats().a, undefined);
  assert.equal(aux.getStats().b.queued, 0);
  held();
});

test("RR auxiliary rejection retains its private owner and does not leak a permit", async () => {
  const held = await aux.acquire("rr", { maxConcurrency: 1 });
  const owner = {};
  const pending = withAuxiliaryAdmission(
    {
      owner,
      kind: "round-robin",
      key: "rr",
      maxConcurrency: 1,
      timeoutMs: 20,
      maxQueueSize: 0,
    },
    () => acquireAuxiliaryAdmissions("fixture", new AbortController().signal, 500)
  );
  await assert.rejects(
    pending,
    (error: unknown) =>
      error instanceof AuxiliaryAdmissionRejected &&
      error.owner === owner &&
      error.code === "SEMAPHORE_QUEUE_FULL"
  );
  assert.equal(aux.getStats().rr.running, 1);
  held();
});

test("old auxiliary lease cleanup cannot release a later attempt's lease", async () => {
  const spec = {
    owner: {},
    kind: "round-robin" as const,
    key: "lease",
    maxConcurrency: 1,
    timeoutMs: 100,
    maxQueueSize: 1,
  };
  const first = await withAuxiliaryAdmission(spec, () =>
    acquireAuxiliaryAdmissions("fixture", new AbortController().signal, 100)
  );
  first();
  const second = await withAuxiliaryAdmission(spec, () =>
    acquireAuxiliaryAdmissions("fixture", new AbortController().signal, 100)
  );
  first();
  assert.equal(aux.getStats().lease.running, 1);
  second();
  assert.deepEqual(aux.getStats(), {});
});

for (const [candidateCap, executionCap] of [
  [1, 2],
  [2, 1],
]) {
  test(`readiness respects candidate ${candidateCap} and execution ${executionCap} caps without spinning`, async () => {
    const held = await sem.acquire("fixture:cap", { maxConcurrency: executionCap });
    const waiter = sem.createAccountCapacityWait({ deadline: Date.now() + 500 });
    let grants = 0;
    const waiting = waiter.wait([{ key: "fixture:cap", maxConcurrency: candidateCap }]).then(() => {
      grants++;
    });
    await pause(30);
    assert.equal(grants, 0);
    assert.equal(sem.getStats()["fixture:cap"].queued, 1);
    held();
    await waiting;
    assert.equal(grants, 1);
    waiter.close();
    await pause();
    assert.deepEqual(sem.getStats(), {});
  });
}

test("alias and canonical provider names share an account gate", async () => {
  assert.equal(
    sem.buildAccountSemaphoreKey({ provider: "  gc ", accountKey: "a" }),
    sem.buildAccountSemaphoreKey({ provider: "grok-cli", accountKey: "a" })
  );
});

test("late surfaced candidates retain the original first-park origin", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1000 });
  runCapacityRequest(() => {
    assert.equal(
      capacityCandidate({ key: "fixture:a", maxConcurrency: 1 }, "fixture", "a", 100, 2000)
        .deadline,
      1100
    );
    t.mock.timers.tick(60);
    assert.equal(
      capacityCandidate({ key: "fixture:b", maxConcurrency: 1 }, "fixture", "b", 100, 2000)
        .deadline,
      1100
    );
    assert.equal(
      capacityCandidate({ key: "fixture:c", maxConcurrency: 1 }, "fixture", "c", 0, 1250).deadline,
      1250
    );
  });
});

test("quota-share fails open only on its own auxiliary queue rejection, never cancellation", async () => {
  const account = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "qs-synthetic",
    maxConcurrent: 1,
  });
  const id = String(account.id);
  const held = await aux.acquire("qsconn:" + id, { maxConcurrency: 1 });
  let failOpen = 0;
  const spec = {
    owner: {},
    kind: "quota-share" as const,
    timeoutMs: 500,
    maxQueueSize: 0,
    onFailOpen: () => {
      failOpen++;
    },
  };
  const release = await withAuxiliaryAdmission(spec, () =>
    acquireAuxiliaryAdmissions(id, new AbortController().signal, 1000)
  );
  assert.equal(failOpen, 1);
  release();
  const controller = new AbortController();
  const pending = withAuxiliaryAdmission({ ...spec, maxQueueSize: 1 }, () =>
    acquireAuxiliaryAdmissions(id, controller.signal, 1000)
  );
  const rejected = assert.rejects(pending, { name: "AbortError" });
  await pause();
  assert.equal(aux.getStats()["qsconn:" + id].queued, 1);
  controller.abort();
  await rejected;
  assert.equal(failOpen, 1);
  assert.equal(aux.getStats()["qsconn:" + id].queued, 0);
  held();
});

test("deduplicated auxiliary remains until every owner hands off and old cleanup cannot touch a new owner", async () => {
  const firstOwner = {},
    secondOwner = {},
    nextOwner = {};
  const spec = (owner: object) => ({
    owner,
    kind: "round-robin" as const,
    key: "shared-handoff",
    maxConcurrency: 1,
    timeoutMs: 100,
    maxQueueSize: 2,
  });
  const oldCleanup = await withAuxiliaryAdmission(spec(firstOwner), () =>
    withAuxiliaryAdmission(spec(secondOwner), () =>
      acquireAuxiliaryAdmissions("fixture", new AbortController().signal, 100)
    )
  );
  releaseAuxiliaryAdmissionOwner(secondOwner);
  assert.equal(aux.getStats()["shared-handoff"].running, 1);
  releaseAuxiliaryAdmissionOwner(firstOwner);
  assert.deepEqual(aux.getStats(), {});
  const nextCleanup = await withAuxiliaryAdmission(spec(nextOwner), () =>
    acquireAuxiliaryAdmissions("fixture", new AbortController().signal, 100)
  );
  oldCleanup();
  releaseAuxiliaryAdmissionOwner(firstOwner);
  assert.equal(aux.getStats()["shared-handoff"].running, 1);
  releaseAuxiliaryAdmissionOwner(nextOwner);
  nextCleanup();
  assert.deepEqual(aux.getStats(), {});
});

test("owner handoff cancels its queued auxiliary before the existing holder releases", async () => {
  const held = await aux.acquire("owner-queued", { maxConcurrency: 1 });
  const owner = {};
  const waiting = withAuxiliaryAdmission(
    {
      owner,
      kind: "round-robin",
      key: "owner-queued",
      maxConcurrency: 1,
      timeoutMs: 1000,
      maxQueueSize: 1,
    },
    () => acquireAuxiliaryAdmissions("fixture", new AbortController().signal, 1000)
  );
  const rejected = assert.rejects(
    waiting,
    (error: unknown) => error instanceof AuxiliaryAdmissionRejected && error.owner === owner
  );
  assert.equal(aux.getStats()["owner-queued"].queued, 1);
  releaseAuxiliaryAdmissionOwner(owner);
  await rejected;
  assert.equal(aux.getStats()["owner-queued"].queued, 0);
  held();
  assert.deepEqual(aux.getStats(), {});
});

for (const kind of ["composite", "auxiliary", "retry"] as const) {
  test("tightened actual phase cancels and cleans the existing " + kind + " waiter", async (t) => {
    const signal = new AbortController();
    const key = "fixture:tight-" + kind;
    const held =
      kind === "composite"
        ? await sem.acquire(key, { maxConcurrency: 1 })
        : kind === "auxiliary"
          ? await aux.acquire(key, { maxConcurrency: 1 })
          : () => {};
    const origin = Date.now();
    const owner = sem.createAccountCapacityWait({ deadline: origin + 1000, signal: signal.signal });
    const nativeSet = globalThis.setTimeout,
      nativeClear = globalThis.clearTimeout;
    const timers = new Set<number | ReturnType<typeof setTimeout>>();
    let scheduled = 0,
      settled = false,
      code = "";
    let observed: Promise<unknown> | undefined;
    t.mock.method(
      globalThis,
      "setTimeout",
      (callback: () => void, ms: number, ...args: unknown[]) => {
        const timer = nativeSet(callback, ms, ...args);
        if (ms >= 700 && ms <= 800) {
          scheduled++;
          timers.add(timer);
        }
        return timer;
      }
    );
    t.mock.method(
      globalThis,
      "clearTimeout",
      (timer: number | ReturnType<typeof setTimeout> | undefined) => {
        if (timer) timers.delete(timer);
        nativeClear(timer);
      }
    );
    try {
      const result = owner.run(() =>
        sem.runWithAccountCapacityAdmission(
          async () => {
            const pending =
              kind === "composite"
                ? sem
                    .acquire(key, { maxConcurrency: 1, timeoutMs: 777 })
                    .then((release) => release())
                : kind === "auxiliary"
                  ? withAuxiliaryAdmission(
                      {
                        owner: {},
                        kind: "round-robin",
                        key,
                        maxConcurrency: 1,
                        timeoutMs: 777,
                        maxQueueSize: 2,
                      },
                      () => acquireAuxiliaryAdmissions("fixture", signal.signal, 1000)
                    ).then((release) => release())
                  : sem.waitForAccountCapacityAdmission(777, signal.signal);
            const tracked = pending
              .catch((error: { code?: string }) => {
                code = error.code ?? "";
                throw error;
              })
              .finally(() => {
                settled = true;
              });
            observed = tracked.catch(() => {});
            await pause(15);
            sem.tightenAccountCapacityAdmissionDeadline(origin + 80);
            await tracked;
          },
          signal.signal,
          { deadline: origin + 1000 }
        )
      );
      await assert.rejects(result, { code: "COMBO_CAPACITY_TIMEOUT" });
      await pause(0);
      assert.equal(settled, true, "underlying waiter must settle, not just the outer phase race");
      assert.equal(code, "COMBO_CAPACITY_TIMEOUT");
      assert.ok(scheduled > 0);
      assert.equal(timers.size, 0, "old long queue/retry timer must be cleared immediately");
      assert.equal(
        signal.signal.aborted,
        false,
        "internal admission cancellation must not mutate caller signal"
      );
      if (kind === "composite") {
        assert.equal(sem.getStats()[key].queued, 0);
        assert.equal(sem.getStats()[key].running, 1);
      } else if (kind === "auxiliary") {
        assert.equal(aux.getStats()[key].queued, 0);
        assert.equal(aux.getStats()[key].running, 1);
      }
      owner.close();
      assert.equal(getEventListeners(signal.signal, "abort").length, 0);
    } finally {
      signal.abort();
      await observed;
      held();
      owner.close();
      for (const timer of timers) nativeClear(timer);
      t.mock.restoreAll();
    }
  });
}

test("tightening retains original signal identity and one active execution phase", async () => {
  const signal = new AbortController(),
    origin = Date.now();
  const owner = sem.createAccountCapacityWait({ deadline: origin + 1000, signal: signal.signal });
  try {
    const response = await owner.run(() =>
      sem.runWithAccountCapacityAdmission(
        async () => {
          sem.tightenAccountCapacityAdmissionDeadline(origin + 40);
          return sem.runWithAccountCapacityAdmission(
            async () => {
              sem.markAccountCapacityExecutionStarted();
              await pause(80);
              return "active completed";
            },
            signal.signal,
            { reuseExistingPhase: true }
          );
        },
        signal.signal,
        { deadline: origin + 1000 }
      )
    );
    assert.equal(response, "active completed");
    assert.equal(signal.signal.aborted, false);
  } finally {
    owner.close();
  }
});

for (const kind of ["true", "false", "absent-quota", "absent-provider"] as const) {
  test("selected body preserves private response metadata: " + kind, async () => {
    const { handoffCapacityResponse } =
      await import("../../../open-sse/services/combo/commonCapacity.ts");
    const { recordQuotaExhaustionClassification, isQuotaExhaustionResponse } =
      await import("../../../open-sse/services/combo/quotaExhaustion.ts");
    const { createTransportReplayObserver, hasObservedTransportReplayVeto } =
      await import("../../../open-sse/services/combo/preContentTransportFailure.ts");
    const { markProviderProbeResponse, isProviderProbeResponse } =
      await import("../../../src/shared/utils/providerProbeResult.ts");
    const quotaBody = kind === "false" || kind === "absent-quota";
    const source = Response.json(
      {
        error: {
          message: quotaBody ? "quota exhausted" : "genuine upstream error",
          code: quotaBody ? "quota_exhausted" : "other",
        },
      },
      { status: quotaBody ? 429 : 500, headers: { "x-wrapper-fixture": "preserved" } }
    );
    if (kind === "true" || kind === "false")
      recordQuotaExhaustionClassification(source, kind === "true");
    const observe = createTransportReplayObserver(source);
    if (kind === "true") markProviderProbeResponse(source);
    const owner = sem.createAccountCapacityWait({ deadline: Date.now() + 2000 });
    const wrapped = handoffCapacityResponse(source, owner);
    assert.equal(wrapped.status, source.status);
    assert.equal(wrapped.headers.get("x-wrapper-fixture"), "preserved");
    assert.equal(hasObservedTransportReplayVeto(wrapped), false);
    observe();
    assert.equal(
      hasObservedTransportReplayVeto(wrapped),
      true,
      "the false replay state stays shared and live"
    );
    assert.equal(isProviderProbeResponse(wrapped), kind === "true");
    assert.equal(
      await isQuotaExhaustionResponse(wrapped, "openai", "gpt-4o"),
      kind === "true" || kind === "absent-quota",
      "false and absent quota facts retain different classification behavior"
    );
    await wrapped.text();
    assert.throws(
      () => owner.run(() => {}),
      { code: "SEMAPHORE_RESET" },
      "selected body finalization closes its owner"
    );
  });
}

test("failed selected-body construction still closes its admission owner", async () => {
  const { handoffCapacityResponse } =
    await import("../../../open-sse/services/combo/commonCapacity.ts");
  const owner = sem.createAccountCapacityWait({ deadline: Date.now() + 2000 });
  const source = new Response("locked");
  const reader = source.body!.getReader();
  try {
    assert.throws(() => handoffCapacityResponse(source, owner), TypeError);
    assert.throws(() => owner.run(() => {}), { code: "SEMAPHORE_RESET" });
  } finally {
    await reader.cancel();
    owner.close();
  }
});

test("generic admission disposer owns a structured result across final promise settlement", async () => {
  const controller = new AbortController();
  const reason = new Error("hedge-cancelled");
  const owner = sem.createAccountCapacityWait({ deadline: Date.now() + 2000 });
  const canceled = Promise.withResolvers<void>();
  let calls = 0;
  const pending = owner.run(() =>
    sem.runWithAccountCapacityAdmission(
      async () => {
        const release = await sem.acquire("fixture:structured-gap", { maxConcurrency: 1 });
        sem.markAccountCapacityExecutionStarted();
        const response = new Response(
          new ReadableStream({
            cancel() {
              calls++;
              release();
              canceled.resolve();
            },
          })
        );
        queueMicrotask(() => controller.abort(reason));
        return { ok: true, response };
      },
      controller.signal,
      {
        discard: (result) => {
          void result.response.body?.cancel().catch(() => {});
        },
      }
    )
  );
  try {
    await assert.rejects(pending, (error) => error === reason);
    assert.ok(
      await Promise.race([canceled.promise.then(() => true), pause(200).then(() => false)])
    );
    assert.equal(calls, 1);
    assert.equal(sem.getStats()["fixture:structured-gap"]?.running ?? 0, 0);
  } finally {
    owner.close();
  }
});

for (const recovery of [false, true]) {
  for (const cancellation of ["both", "peek-only"] as const) {
    test(`quality replay cancellation preserves branch ownership: ${recovery}/${cancellation}`, async () => {
      const { validateResponseQuality, releaseQualityClone } =
        await import("../../../open-sse/services/combo/validateQuality.ts");
      const encoder = new TextEncoder();
      const canceled = Promise.withResolvers<void>();
      let source!: ReadableStreamDefaultController<Uint8Array>;
      let cancels = 0;
      const original = new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            source = controller;
            controller.enqueue(
              encoder.encode('data: {"choices":[{"delta":{"content":"readable-prefix"}}]}\n\n')
            );
          },
          cancel() {
            cancels++;
            canceled.resolve();
          },
        }),
        { headers: { "content-type": "text/event-stream" } }
      );
      const clone = original.clone();
      const quality = await validateResponseQuality(
        clone,
        true,
        {},
        undefined,
        undefined,
        false,
        recovery
      );
      assert.equal(quality.valid, true);
      assert.ok(quality.clonedResponse, "quality validation owns the replay branch");
      if (cancellation === "both") {
        const originalCanceled = original.body!.cancel("discard-original");
        releaseQualityClone(clone, original, quality);
        assert.ok(
          await Promise.race([canceled.promise.then(() => true), pause(500).then(() => false)]),
          "canceling both branches reaches the source"
        );
        await originalCanceled;
        assert.equal(cancels, 1);
      } else {
        releaseQualityClone(clone, original, quality);
        source.enqueue(encoder.encode("data: [DONE]\n\n"));
        source.close();
        const text = await original.text();
        assert.match(text, /readable-prefix/);
        assert.match(text, /\[DONE\]/);
        assert.equal(cancels, 0, "canceling only the peek keeps the original readable");
      }
    });
  }
}

test("queued auxiliary cancellation crosses timeout wrapper without a provider failure", async () => {
  const { buildTargetTimeoutRunner } =
    await import("../../../open-sse/services/combo/targetTimeoutRunner.ts");
  const signal = new AbortController();
  const reason = new Error("fixture client cancellation");
  const held = await aux.acquire("cancel-wrapper", { maxConcurrency: 1 });
  const owner = {};
  const runner = buildTargetTimeoutRunner({
    comboTargetTimeoutMs: 1000,
    log: { info() {}, warn() {}, debug() {}, error() {} },
    handleSingleModel: async (_body, _model, target) => {
      const release = await acquireAuxiliaryAdmissions("fixture", target!.modelAbortSignal!, 1000);
      release();
      return new Response("unexpected");
    },
  });
  const pending = withAuxiliaryAdmission(
    {
      owner,
      kind: "round-robin",
      key: "cancel-wrapper",
      maxConcurrency: 1,
      timeoutMs: 1000,
      maxQueueSize: 1,
    },
    () => runner({}, "openai/gpt-4o-mini", { modelAbortSignal: signal.signal })
  );
  try {
    for (let i = 0; i < 100 && aux.getStats()["cancel-wrapper"]?.queued !== 1; i++) await pause(2);
    assert.equal(aux.getStats()["cancel-wrapper"]?.queued, 1);
    signal.abort(reason);
    await assert.rejects(pending, (error) => error === reason);
    assert.equal(aux.getStats()["cancel-wrapper"]?.queued, 0);
  } finally {
    signal.abort(reason);
    held();
    releaseAuxiliaryAdmissionOwner(owner);
    await pending.catch(() => {});
  }
});

test("RR auxiliary helper propagates another owner's local rejection", async () => {
  const { runRoundRobinAttempt } =
    await import("../../../open-sse/services/combo/roundRobinAdmission.ts");
  const ancestor = {},
    child = {};
  const held = await aux.acquire("a-owner", { maxConcurrency: 1 });
  try {
    await assert.rejects(
      withAuxiliaryAdmission(
        {
          owner: ancestor,
          kind: "round-robin",
          key: "a-owner",
          maxConcurrency: 1,
          timeoutMs: 100,
          maxQueueSize: 0,
        },
        () =>
          runRoundRobinAttempt(
            {
              owner: child,
              key: "z-child",
              maxConcurrency: 1,
              timeoutMs: 100,
              maxQueueSize: 0,
            },
            async () => {
              const release = await acquireAuxiliaryAdmissions(
                "fixture",
                new AbortController().signal,
                100
              );
              release();
              return new Response("unexpected");
            },
            () => assert.fail("unexecuted auxiliary rejection cannot record an RR attempt")
          )
      ),
      (error) => error instanceof AuxiliaryAdmissionRejected && error.owner === ancestor
    );
  } finally {
    held();
    releaseAuxiliaryAdmissionOwner(ancestor);
    releaseAuxiliaryAdmissionOwner(child);
  }
});
