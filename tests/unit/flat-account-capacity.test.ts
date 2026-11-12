import test from "node:test";
import { AsyncLocalStorage } from "node:async_hooks";
import { getEventListeners } from "node:events";
import assert from "node:assert/strict";
import {
  acquire,
  acquireMany,
  createAccountCapacityWait,
  getStats,
  isComboAccountCapacityUnavailable,
  markBlocked,
  markAccountCapacityExecutionStarted,
  runWithAccountCapacityAdmission,
  remainingAccountCapacityBudgetMs,
  reset,
  resetAll,
} from "../../open-sse/services/accountSemaphore.ts";

const key = (id: string) => `fixture:${id}`;
const requirement = (id: string) => ({ key: key(id), maxConcurrency: 1 });
const pause = (ms = 5) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const turn = (timeout = 500, maxQueueSize = 20, signal?: AbortSignal) =>
  createAccountCapacityWait({ deadline: Date.now() + timeout, maxQueueSize, signal });

let keepAlive: ReturnType<typeof setInterval>;
test.before(() => {
  keepAlive = setInterval(() => {}, 1000);
});
test.after(() => clearInterval(keepAlive));
test.afterEach(() => resetAll());

test("capacity turn wakes on release without holding any permits", async () => {
  const release = await acquire(key("a"), { maxConcurrency: 1 });
  const waiter = turn();
  let ready = false;
  const waiting = waiter.wait([requirement("a")]).then(() => {
    ready = true;
  });
  await pause();
  assert.equal(ready, false);
  assert.equal(getStats()[key("a")].running, 1);
  release();
  await waiting;
  assert.equal(getStats()[key("a")]?.running ?? 0, 0);
  const admitted = await waiter.run(() => acquire(key("a"), { maxConcurrency: 1 }));
  admitted();
  waiter.close();
});

test("registration after release cannot lose a wakeup", async () => {
  const release = await acquire(key("a"), { maxConcurrency: 1 });
  release();
  const waiter = turn();
  await waiter.wait([requirement("a")]);
  waiter.close();
});

test("older combo turn precedes sustained direct newcomers", async () => {
  const release = await acquire(key("a"), { maxConcurrency: 1 });
  const waiter = turn();
  const waiting = waiter.wait([requirement("a")]);
  const order: string[] = [];
  const newcomers = Array.from({ length: 6 }, (_, i) =>
    acquire(key("a"), { maxConcurrency: 1 }).then((done) => {
      order.push(`direct-${i}`);
      done();
    })
  );
  release();
  await waiting;
  await pause();
  assert.equal(order.length, 0);
  const done = await waiter.run(() => acquire(key("a"), { maxConcurrency: 1 }));
  order.push("combo");
  done();
  waiter.close();
  await Promise.all(newcomers);
  assert.deepEqual(order, ["combo", ...Array.from({ length: 6 }, (_, i) => `direct-${i}`)]);
});

test("older execution waiter precedes a newer combo turn", async () => {
  const release = await acquire(key("a"), { maxConcurrency: 1 });
  const older = acquire(key("a"), { maxConcurrency: 1 });
  const waiter = turn();
  let ready = false;
  const waiting = waiter.wait([requirement("a")]).then(() => {
    ready = true;
  });
  release();
  const olderRelease = await older;
  await pause();
  assert.equal(ready, false);
  olderRelease();
  await waiting;
  waiter.close();
});

test("partially overlapping alternatives and disjoint pools progress", async () => {
  const releases = await Promise.all(
    ["a", "b", "c"].map((id) => acquire(key(id), { maxConcurrency: 1 }))
  );
  const first = turn();
  const second = turn();
  let firstReady = false;
  const waitingFirst = first.wait([requirement("a"), requirement("b")]).then(() => {
    firstReady = true;
  });
  const waitingSecond = second.wait([requirement("b"), requirement("c")]);
  releases[2]();
  await waitingSecond;
  assert.equal(firstReady, false);
  assert.equal(
    second.run(() => isComboAccountCapacityUnavailable("fixture", "b", 1)),
    true
  );
  const c = await second.run(() => acquire(key("c"), { maxConcurrency: 1 }));
  c();
  second.close();
  const disjoint = await acquire(key("d"), { maxConcurrency: 1 });
  disjoint();
  releases[1]();
  await waitingFirst;
  first.close();
  releases[0]();
});

test("multi-gate handoff keeps age and holds no account while parent is full", async () => {
  const parent = await acquire("global", { maxConcurrency: 1 });
  const initial = await acquire(key("a"), { maxConcurrency: 1 });
  const waiter = turn();
  const waiting = waiter.wait([requirement("a")]);
  const direct = acquireMany([{ key: "global", maxConcurrency: 1 }, requirement("a")]);
  initial();
  await waiting;
  const combo = waiter.run(() =>
    acquireMany([{ key: "global", maxConcurrency: 1 }, requirement("a")])
  );
  assert.equal(getStats()[key("a")].running, 0);
  assert.equal(getStats().global.running, 1);
  parent();
  const comboRelease = await combo;
  assert.equal(getStats()[key("a")].running, 1);
  comboRelease();
  waiter.close();
  (await direct)();
});

test("queue depth one counts turn reservation and rejects newer direct enrollment", async () => {
  const release = await acquire(key("a"), { maxConcurrency: 1 });
  const waiter = turn(500, 1);
  const waiting = waiter.wait([requirement("a")]);
  await assert.rejects(acquire(key("a"), { maxConcurrency: 1, maxQueueSize: 1 }), {
    code: "SEMAPHORE_QUEUE_FULL",
  });
  release();
  await waiting;
  (await waiter.run(() => acquire(key("a"), { maxConcurrency: 1, maxQueueSize: 1 })))();
  waiter.close();
});

test("mixed queue limits transfer an existing reservation ahead of younger waiters", async () => {
  const release = await acquire(key("a"), { maxConcurrency: 1 });
  const parent = await acquire("global", { maxConcurrency: 1 });
  const waiter = turn(500, 1);
  const waiting = waiter.wait([requirement("a")]);
  const direct = acquire(key("a"), { maxConcurrency: 1, maxQueueSize: 10 });
  release();
  await waiting;
  const combo = waiter.run(() =>
    acquireMany([{ key: "global", maxConcurrency: 1 }, requirement("a")], { maxQueueSize: 1 })
  );
  parent();
  (await combo)();
  waiter.close();
  (await direct)();
});

test("requeue preserves age synchronously while changed alternatives remain busy", async () => {
  const a = await acquire(key("a"), { maxConcurrency: 1 });
  const b = await acquire(key("b"), { maxConcurrency: 1 });
  const waiter = turn();
  const waiting = waiter.wait([requirement("a")]);
  a();
  await waiting;
  const requeued = waiter.wait([requirement("b")]);
  const direct = acquire(key("b"), { maxConcurrency: 1 });
  b();
  await requeued;
  (await waiter.run(() => acquire(key("b"), { maxConcurrency: 1 })))();
  waiter.close();
  (await direct)();
});

for (const outcome of ["close", "success", "abort", "timeout"] as const) {
  test(`replacing alternatives cleans the abandoned gate after ${outcome}`, async (t) => {
    t.mock.timers.enable({ apis: ["Date", "setTimeout"], now: 1000 });
    const a = await acquire(key("a"), { maxConcurrency: 1 });
    const b = await acquire(key("b"), { maxConcurrency: 1 });
    const controller = new AbortController();
    const waiter = turn(100, 20, controller.signal);
    const waiting = waiter.wait([requirement("a"), requirement("b")]);
    a();
    await waiting;
    // Consume the original cleanup while the granted turn still claims A.
    t.mock.timers.tick(1);
    assert.equal(getStats()[key("a")].running, 0);
    assert.equal(getStats()[key("a")].queued, 1);

    let granted = false;
    const requeued = waiter.wait([requirement("b")]).then(() => {
      granted = true;
    });
    assert.equal(getStats()[key("b")].running, 1);
    const error =
      outcome === "abort"
        ? { name: "AbortError" }
        : { code: outcome === "timeout" ? "COMBO_CAPACITY_TIMEOUT" : "SEMAPHORE_RESET" };
    if (outcome === "success") {
      b();
      await requeued;
      const done = await waiter.run(() => acquire(key("b"), { maxConcurrency: 1 }));
      assert.equal(waiter.admitted, true);
      done();
    } else {
      const rejected = assert.rejects(requeued, error);
      if (outcome === "close") waiter.close();
      else if (outcome === "abort") controller.abort();
      else t.mock.timers.tick(100);
      await rejected;
      assert.throws(() => waiter.run(() => acquire(key("b"), { maxConcurrency: 1 })), error);
      await assert.rejects(waiter.wait([requirement("a")]), error);
      b();
    }
    waiter.close();
    t.mock.timers.tick(1);
    assert.deepEqual(getStats(), {});
    t.mock.timers.tick(200);
    assert.equal(granted, outcome === "success");
    assert.deepEqual(getStats(), {});
  });
}

test("replacing alternatives preserves another live claim on the abandoned gate", async (t) => {
  t.mock.timers.enable({ apis: ["Date", "setTimeout"], now: 1000 });
  const a = await acquire(key("a"), { maxConcurrency: 1 });
  const b = await acquire(key("b"), { maxConcurrency: 1 });
  const waiter = turn();
  const waiting = waiter.wait([requirement("a"), requirement("b")]);
  a();
  await waiting;
  t.mock.timers.tick(1);
  const other = turn();
  const otherWaiting = other.wait([requirement("a")]);
  const requeued = waiter.wait([requirement("b")]);
  await otherWaiting;
  t.mock.timers.tick(1);
  assert.deepEqual(getStats()[key("a")], {
    running: 0,
    queued: 1,
    maxConcurrency: 1,
    blockedUntil: null,
  });
  other.close();
  t.mock.timers.tick(1);
  assert.equal(getStats()[key("a")], undefined);
  b();
  await requeued;
  (await waiter.run(() => acquire(key("b"), { maxConcurrency: 1 })))();
  waiter.close();
  t.mock.timers.tick(1);
  assert.deepEqual(getStats(), {});
});

test("abort while parked removes ordering claim and tombstones late callback", async () => {
  const initial = await acquire(key("a"), { maxConcurrency: 1 });
  const controller = new AbortController();
  const waiter = turn(500, 20, controller.signal);
  const waiting = waiter.wait([requirement("a")]);
  controller.abort();
  await assert.rejects(waiting, { name: "AbortError" });
  initial();
  assert.throws(() => waiter.run(() => acquire(key("a"), { maxConcurrency: 1 })), {
    name: "AbortError",
  });
  (await acquire(key("a"), { maxConcurrency: 1 }))();
  waiter.close();
});

test("canceling a granted async rescan prevents later bypass or immediate acquisition", async () => {
  const controller = new AbortController();
  const waiter = turn(500, 20, controller.signal);
  await waiter.wait([requirement("a")]);
  const late = waiter.run(async () => {
    await pause();
    await acquireMany([]);
  });
  controller.abort();
  await assert.rejects(late, { name: "AbortError" });
  waiter.close();
});

test("deadline covers asynchronous eligibility and bypass acquisition", async () => {
  const deadline = Date.now() + 200;
  const waiter = createAccountCapacityWait({ deadline });
  try {
    await waiter.wait([requirement("a")]);
    const late = waiter.run(async () => {
      assert.ok(Date.now() < deadline, "eligibility callback enters before the original bound");
      await pause(Math.max(0, deadline - Date.now() + 20));
      return acquireMany([]);
    });
    await assert.rejects(late, { code: "COMBO_CAPACITY_TIMEOUT" });
  } finally {
    waiter.close();
  }
});

test("consuming a turn retains deadline for parent queue and rate-limit budget", async () => {
  const parent = await acquire("global", { maxConcurrency: 1 });
  const deadline = Date.now() + 200;
  const waiter = createAccountCapacityWait({ deadline });
  try {
    await waiter.wait([requirement("a")]);
    await waiter.run(async () => {
      await pause(10);
      const beforeBudgetRead = Date.now();
      const remaining = remainingAccountCapacityBudgetMs(1000);
      assert.ok(remaining > 0, "callback enters before the original absolute deadline");
      assert.ok(remaining <= deadline - beforeBudgetRead, "consumption cannot restart the budget");
      const queued = acquireMany([{ key: "global", maxConcurrency: 1 }, requirement("a")], {
        timeoutMs: 1000,
      });
      assert.equal(getStats()[key("a")].running, 0);
      await assert.rejects(queued, { code: "SEMAPHORE_TIMEOUT" });
      assert.throws(() => remainingAccountCapacityBudgetMs(1000), {
        code: "COMBO_CAPACITY_TIMEOUT",
      });
    });
  } finally {
    waiter.close();
    parent();
  }
});

test("blocked-until expiry wakes without polling or another release", async () => {
  markBlocked(key("a"), 20);
  const waiter = turn();
  await waiter.wait([requirement("a")]);
  (await waiter.run(() => acquire(key("a"), { maxConcurrency: 1 })))();
  waiter.close();
});

test("a new direct execution cap still respects the older candidate cap", async () => {
  const initial = await acquire(key("a"), { maxConcurrency: 1 });
  const waiter = turn();
  let granted = false;
  const waiting = waiter.wait([requirement("a")]).then(() => {
    granted = true;
  });
  const direct = acquire(key("a"), { maxConcurrency: 2 });
  await pause();
  assert.equal(granted, false, "candidate cap remains binding despite the newer execution cap");
  initial();
  await waiting;
  const admitted = await waiter.run(() => acquire(key("a"), { maxConcurrency: 2 }));
  assert.equal(getStats()[key("a")].running, 2);
  admitted();
  waiter.close();
  (await direct)();
  initial();
});

test("disabling a cap consumes the logical claim even when all execution gates bypass", async () => {
  const { updateAccountSemaphoreCapacity } =
    await import("../../open-sse/services/accountSemaphore.ts");
  const initial = await acquire(key("a"), { maxConcurrency: 1 });
  const waiter = turn();
  const waiting = waiter.wait([requirement("a")]);
  updateAccountSemaphoreCapacity(key("a"), 0);
  await waiting;
  (await waiter.run(() => acquire(key("a"), { maxConcurrency: null })))();
  assert.equal(waiter.admitted, true);
  waiter.close();
  initial();
});

test("concurrent targets have independent admission and active execution phases", async () => {
  const { runWithAccountCapacityAdmission, markAccountCapacityExecutionStarted } =
    await import("../../open-sse/services/accountSemaphore.ts");
  const deadline = Date.now() + 200;
  const waiter = createAccountCapacityWait({ deadline });
  await waiter.wait([requirement("phase-active"), requirement("phase-waiting")]);
  let lateCalls = 0;
  const lateFinished = Promise.withResolvers<void>();
  const active = waiter.run(() =>
    runWithAccountCapacityAdmission(async () => {
      assert.ok(Date.now() < deadline, "active callback enters before the original bound");
      const done = await acquire(key("phase-active"), { maxConcurrency: 1 });
      markAccountCapacityExecutionStarted();
      await pause(Math.max(0, deadline - Date.now() + 40));
      done();
      return "completed";
    })
  );
  const waiting = waiter.run(() =>
    runWithAccountCapacityAdmission(async () => {
      try {
        assert.ok(Date.now() < deadline, "waiting callback enters before the original bound");
        await pause(Math.max(0, deadline - Date.now() + 60));
        const done = await acquire(key("phase-waiting"), { maxConcurrency: 1 });
        lateCalls++;
        done();
        return "late";
      } finally {
        lateFinished.resolve();
      }
    })
  );
  try {
    await assert.rejects(waiting, { code: "COMBO_CAPACITY_TIMEOUT" });
    assert.equal(await active, "completed");
    await lateFinished.promise;
    assert.equal(lateCalls, 0);
  } finally {
    waiter.close();
  }
});

test("a canceled target scope fences late acquisition without canceling unrelated turns", async () => {
  const { runWithAccountCapacityAdmission } =
    await import("../../open-sse/services/accountSemaphore.ts");
  const waiter = turn();
  await waiter.wait([requirement("scope-cancel")]);
  const controller = new AbortController();
  let called = false;
  const late = waiter.run(() =>
    runWithAccountCapacityAdmission(async () => {
      await pause(60);
      const done = await acquire(key("scope-cancel"), { maxConcurrency: 1 });
      called = true;
      done();
    }, controller.signal)
  );
  controller.abort();
  await assert.rejects(late, { name: "AbortError" });
  waiter.close();
  const independent = turn();
  await independent.wait([requirement("scope-other")]);
  (await independent.run(() => acquire(key("scope-other"), { maxConcurrency: 1 })))();
  independent.close();
  await pause(80);
  assert.equal(called, false);
});

test("canceling a target phase synchronously removes its composite queue enrollment", async () => {
  const { runWithAccountCapacityAdmission } =
    await import("../../open-sse/services/accountSemaphore.ts");
  const parent = await acquire("global", { maxConcurrency: 1 });
  const waiter = turn();
  await waiter.wait([requirement("phase-queue")]);
  const controller = new AbortController();
  const pending = waiter.run(() =>
    runWithAccountCapacityAdmission(
      () => acquireMany([{ key: "global", maxConcurrency: 1 }, requirement("phase-queue")]),
      controller.signal
    )
  );
  await pause();
  assert.equal(getStats().global.queued, 1);
  const rejected = assert.rejects(pending, { name: "AbortError" });
  controller.abort();
  assert.equal(getStats().global.queued, 0);
  await rejected;
  waiter.close();
  parent();
  await pause();
  assert.deepEqual(getStats(), {});
});

test("cap notifications preserve an independent execution override while refreshing candidate caps", async () => {
  const { updateAccountSemaphoreCapacity } =
    await import("../../open-sse/services/accountSemaphore.ts");
  const initial = await acquireMany([
    { ...requirement("override"), followConnectionCapacity: false },
  ]);
  const waiter = turn();
  let granted = false;
  const waiting = waiter.wait([requirement("override")]).then(() => {
    granted = true;
  });
  updateAccountSemaphoreCapacity(key("override"), 2);
  await pause();
  assert.equal(granted, false);
  assert.equal(getStats()[key("override")].maxConcurrency, 1);
  initial();
  await waiting;
  (
    await waiter.run(() =>
      acquireMany([{ ...requirement("override"), followConnectionCapacity: false }])
    )
  )();
  waiter.close();
});

test("new account inherits a granted age once at atomic complete enqueue and releases old claim", async () => {
  const heldA = await acquire(key("old"), { maxConcurrency: 1 });
  const heldB = await acquire(key("new"), { maxConcurrency: 1 });
  const owner = turn();
  const parked = owner.wait([requirement("old")]);
  const order: string[] = [];
  const younger = acquire(key("new"), { maxConcurrency: 1 }).then((release) => {
    order.push("younger");
    release();
  });
  heldA();
  await parked;
  const inherited = owner.run(() =>
    acquireMany([requirement("new"), { key: key("global"), maxConcurrency: 1 }], {
      maxQueueSize: 5,
    })
  );
  assert.equal(owner.admitted, true);
  const directOld = await acquire(key("old"), { maxConcurrency: 1, failFast: true });
  directOld();
  heldB();
  const release = await inherited;
  order.push("inherited");
  const retry = owner
    .run(() => acquire(key("new"), { maxConcurrency: 1 }))
    .then((done) => {
      order.push("retry");
      done();
    });
  release();
  await Promise.all([younger, retry]);
  owner.close();
  assert.deepEqual(order, ["inherited", "younger", "retry"]);
});

test("a newly reached account receives no reserved-depth exemption", async () => {
  const heldA = await acquire(key("old"), { maxConcurrency: 1 });
  const heldB = await acquire(key("new"), { maxConcurrency: 1 });
  const owner = turn();
  const parked = owner.wait([requirement("old")]);
  const queued = acquire(key("new"), { maxConcurrency: 1 }).then((release) => release());
  heldA();
  await parked;
  await assert.rejects(
    owner.run(() => acquireMany([requirement("new")], { maxQueueSize: 1 })),
    { code: "SEMAPHORE_QUEUE_FULL" }
  );
  assert.equal(owner.admitted, false, "failed complete enrollment cannot consume the turn");
  owner.close();
  heldB();
  await queued;
});

test("consumed short-account admission retains true lifetime without reviving its expired phase", async () => {
  const origin = Date.now();
  const shortDeadline = origin + 200;
  const owner = createAccountCapacityWait({
    deadline: shortDeadline,
    lifetimeDeadline: origin + 700,
  });
  try {
    await owner.wait([{ ...requirement("short"), deadline: shortDeadline }]);
    let late!: () => Promise<() => void>;
    await owner.run(() =>
      runWithAccountCapacityAdmission(
        async () => {
          assert.ok(
            Date.now() < shortDeadline,
            "short account phase enters before its original bound"
          );
          late = AsyncLocalStorage.bind(() => acquire(key("short"), { maxConcurrency: 1 }));
          const release = await acquire(key("short"), { maxConcurrency: 1 });
          markAccountCapacityExecutionStarted();
          await pause(Math.max(0, shortDeadline - Date.now() + 30));
          release();
        },
        null,
        { deadline: shortDeadline }
      )
    );
    await assert.rejects(late, { code: "COMBO_CAPACITY_TIMEOUT" });
    const release = await owner.run(() =>
      runWithAccountCapacityAdmission(() => acquire(key("later"), { maxConcurrency: 1 }), null, {
        deadline: origin + 500,
      })
    );
    release();
  } finally {
    owner.close();
  }
});

test("reset retires a granted gateless turn and preserves unrelated logical claims", async () => {
  const owner = turn();
  const other = turn();
  await owner.wait([requirement("reset-no-gate")]);
  await other.wait([requirement("reset-other")]);
  assert.equal(getStats()[key("reset-no-gate")], undefined);
  try {
    reset(key("reset-no-gate"));
    assert.throws(() => owner.run(() => true), { code: "SEMAPHORE_RESET" });
    const release = await acquire(key("reset-no-gate"), { maxConcurrency: 1, failFast: true });
    release();
    await assert.rejects(acquire(key("reset-other"), { maxConcurrency: 1, failFast: true }), {
      code: "SEMAPHORE_QUEUE_FULL",
    });
    const otherRelease = await other.run(() =>
      acquire(key("reset-other"), { maxConcurrency: 1, failFast: true })
    );
    otherRelease();
  } finally {
    owner.close();
    other.close();
  }
});

for (const state of ["idle", "consumed", "budget-only"] as const) {
  test("live context resetAll fences future admission after " + state, async () => {
    const owner = turn(2000);
    try {
      if (state === "consumed") {
        await owner.wait([requirement("live-consumed")]);
        (await owner.run(() => acquire(key("live-consumed"), { maxConcurrency: 1 })))();
      } else if (state === "budget-only") {
        owner.run(() => markAccountCapacityExecutionStarted());
      }
      if (state !== "idle") assert.equal(owner.admitted, true);
      resetAll();
      assert.throws(() => owner.run(() => true), { code: "SEMAPHORE_RESET" });
      const release = await acquire(key("fresh-after-reset"), {
        maxConcurrency: 1,
        failFast: true,
      });
      release();
    } finally {
      owner.close();
    }
  });
}

test("live consumed context is invalidated by its selected account reset", async () => {
  const owner = turn(2000);
  await owner.wait([requirement("selected-consumed")]);
  (await owner.run(() => acquire(key("selected-consumed"), { maxConcurrency: 1 })))();
  try {
    reset(key("selected-consumed"));
    assert.throws(() => owner.run(() => true), { code: "SEMAPHORE_RESET" });
  } finally {
    owner.close();
  }
});

test("live context follows a newly selected complete admission key for reset", async () => {
  const owner = turn(2000);
  await owner.wait([requirement("old-logical")]);
  const held = await acquire(key("new-selected"), { maxConcurrency: 1 });
  const pending = owner.run(() =>
    runWithAccountCapacityAdmission(() => acquireMany([requirement("new-selected")]))
  );
  try {
    for (let i = 0; i < 100 && getStats()[key("new-selected")]?.queued !== 1; i++) await pause();
    assert.equal(getStats()[key("new-selected")]?.queued, 1);
    assert.equal(owner.admitted, true, "complete enqueue consumes age before dispatch");
    reset(key("new-selected"));
    await assert.rejects(pending, { code: "SEMAPHORE_RESET" });
    assert.throws(() => owner.run(() => true), { code: "SEMAPHORE_RESET" });
  } finally {
    held();
    owner.close();
    await pending.catch(() => {});
  }
});

test("keyed context reset preserves a separate consumed context", async () => {
  const first = turn(2000),
    other = turn(2000);
  try {
    await first.wait([requirement("key-first")]);
    (await first.run(() => acquire(key("key-first"), { maxConcurrency: 1 })))();
    await other.wait([requirement("key-other")]);
    (await other.run(() => acquire(key("key-other"), { maxConcurrency: 1 })))();
    reset(key("key-first"));
    const release = await other.run(() =>
      acquire(key("key-other"), { maxConcurrency: 1, failFast: true })
    );
    release();
  } finally {
    first.close();
    other.close();
  }
});

test("keyed context reset ignores a retired unselected alternative", async () => {
  const owner = turn(2000);
  try {
    await owner.wait([requirement("unselected"), requirement("winner-key")]);
    (await owner.run(() => acquire(key("winner-key"), { maxConcurrency: 1 })))();
    reset(key("unselected"));
    const release = await owner.run(() =>
      acquire(key("winner-key"), { maxConcurrency: 1, failFast: true })
    );
    release();
    const independent = await acquire(key("unselected"), { maxConcurrency: 1, failFast: true });
    independent();
  } finally {
    owner.close();
  }
});

test("idle live context resetAll removes its timer and abort listener immediately", (t) => {
  const nativeSetTimeout = globalThis.setTimeout,
    nativeClearTimeout = globalThis.clearTimeout;
  const timers = new Set<number | ReturnType<typeof setTimeout>>();
  t.mock.method(
    globalThis,
    "setTimeout",
    (callback: () => void, ms: number, ...args: unknown[]) => {
      const timer = nativeSetTimeout(callback, ms, ...args);
      if (ms >= 9000 && ms <= 9876) timers.add(timer);
      return timer;
    }
  );
  t.mock.method(
    globalThis,
    "clearTimeout",
    (timer: number | ReturnType<typeof setTimeout> | undefined) => {
      if (timer) timers.delete(timer);
      nativeClearTimeout(timer);
    }
  );
  const controller = new AbortController();
  const owner = createAccountCapacityWait({
    deadline: Date.now() + 9876,
    signal: controller.signal,
  });
  try {
    assert.equal(timers.size, 1);
    assert.equal(getEventListeners(controller.signal, "abort").length, 1);
    resetAll();
    assert.equal(timers.size, 0, "idle lifetime timer must not survive reset");
    assert.equal(getEventListeners(controller.signal, "abort").length, 0);
    assert.throws(() => owner.run(() => true), { code: "SEMAPHORE_RESET" });
  } finally {
    owner.close();
    t.mock.restoreAll();
  }
});

test("consumed live context resetAll cancels a retry timer and phase listeners", async (t) => {
  const { waitForAccountCapacityAdmission } =
    await import("../../open-sse/services/accountSemaphore.ts");
  const nativeSetTimeout = globalThis.setTimeout,
    nativeClearTimeout = globalThis.clearTimeout;
  const timers = new Set<number | ReturnType<typeof setTimeout>>();
  t.mock.method(
    globalThis,
    "setTimeout",
    (callback: () => void, ms: number, ...args: unknown[]) => {
      const timer = nativeSetTimeout(callback, ms, ...args);
      if (ms > 700 && ms <= 777) timers.add(timer);
      return timer;
    }
  );
  t.mock.method(
    globalThis,
    "clearTimeout",
    (timer: number | ReturnType<typeof setTimeout> | undefined) => {
      if (timer) timers.delete(timer);
      nativeClearTimeout(timer);
    }
  );
  const controller = new AbortController();
  const owner = createAccountCapacityWait({
    deadline: Date.now() + 5000,
    signal: controller.signal,
  });
  await owner.wait([requirement("live-delay")]);
  (await owner.run(() => acquire(key("live-delay"), { maxConcurrency: 1 })))();
  const entered = Promise.withResolvers<void>();
  const pending = owner.run(() =>
    runWithAccountCapacityAdmission(async () => {
      entered.resolve();
      await waitForAccountCapacityAdmission(777, controller.signal);
    }, controller.signal)
  );
  const result = pending.then(
    () => ({ complete: true }),
    (error: unknown) => ({ error })
  );
  try {
    await entered.promise;
    assert.equal(timers.size, 1);
    resetAll();
    const outcome = await Promise.race([result, pause(30).then(() => ({ pending: true }))]);
    assert.ok("error" in outcome, "reset must settle the original delay without waiting777ms");
    if ("error" in outcome)
      assert.equal((outcome.error as { code?: string }).code, "SEMAPHORE_RESET");
    assert.equal(timers.size, 0);
    assert.equal(getEventListeners(controller.signal, "abort").length, 0);
  } finally {
    owner.close();
    await result;
    t.mock.restoreAll();
  }
});

for (const resetMode of ["all", "keyed", "close"] as const) {
  test("live reset preserves active execution finalization: " + resetMode, async () => {
    const { accountCapacityAdmissionSignal } =
      await import("../../open-sse/services/accountSemaphore.ts");
    const controller = new AbortController();
    const owner = createAccountCapacityWait({
      deadline: Date.now() + 2000,
      signal: controller.signal,
    });
    await owner.wait([requirement("live-active")]);
    const entered = Promise.withResolvers<void>(),
      finish = Promise.withResolvers<void>();
    let finalized = 0,
      executionSignal: AbortSignal | null = null;
    const active = owner.run(() =>
      runWithAccountCapacityAdmission(async () => {
        const release = await acquire(key("live-active"), { maxConcurrency: 1 });
        markAccountCapacityExecutionStarted();
        executionSignal = accountCapacityAdmissionSignal(controller.signal);
        entered.resolve();
        await finish.promise;
        finalized++;
        release();
        return "completed";
      }, controller.signal)
    );
    try {
      await entered.promise;
      if (resetMode === "all") resetAll();
      else if (resetMode === "keyed") reset(key("live-active"));
      else owner.close();
      assert.throws(() => owner.run(() => true), { code: "SEMAPHORE_RESET" });
      assert.equal(
        executionSignal?.aborted,
        false,
        "reset does not abort admitted upstream execution"
      );
      assert.equal(finalized, 0, "active lease waits for its normal finalizer");
      finish.resolve();
      assert.equal(await active, "completed");
      assert.equal(finalized, 1);
      assert.equal(getEventListeners(controller.signal, "abort").length, 0);
    } finally {
      finish.resolve();
      await active.catch(() => {});
      owner.close();
    }
  });
}

for (const continuation of ["direct", "bound"] as const) {
  test("live consumed close fences future continuation: " + continuation, async () => {
    const owner = turn(2000);
    await owner.wait([requirement("close-consumed")]);
    (await owner.run(() => acquire(key("close-consumed"), { maxConcurrency: 1 })))();
    const late = owner.run(() =>
      AsyncLocalStorage.bind(() => acquire(key("close-bound-next"), { maxConcurrency: 1 }))
    );
    let bound: Promise<() => void> | undefined;
    try {
      owner.close();
      assert.equal(owner.admitted, true, "terminal close preserves the consumed-age flag");
      if (continuation === "direct")
        assert.throws(() => owner.run(() => true), { code: "SEMAPHORE_RESET" });
      else {
        bound = late();
        await assert.rejects(bound, { code: "SEMAPHORE_RESET" });
      }
      const release = await acquire(key("close-consumed"), { maxConcurrency: 1, failFast: true });
      release();
    } finally {
      (await bound?.catch(() => undefined))?.();
      owner.close();
    }
  });
}

for (const action of ["reset-all", "reset-key", "close"] as const) {
  test("phase-free consumed delay observes terminal context: " + action, async (t) => {
    const { waitForAccountCapacityAdmission, isAccountCapacityContextError } =
      await import("../../open-sse/services/accountSemaphore.ts");
    const signal = new AbortController();
    const owner = turn(5000, 20, signal.signal);
    await owner.wait([requirement("phase-free")]);
    (await owner.run(() => acquire(key("phase-free"), { maxConcurrency: 1 })))();
    const timers = new Set<number | ReturnType<typeof setTimeout>>();
    const callbacks = new Set<() => void>();
    const nativeSetTimeout = globalThis.setTimeout;
    const nativeClearTimeout = globalThis.clearTimeout;
    t.mock.method(
      globalThis,
      "setTimeout",
      (callback: () => void, ms: number, ...args: unknown[]) => {
        const timer = nativeSetTimeout(callback, ms, ...args);
        if (ms > 700 && ms <= 777) {
          timers.add(timer);
          callbacks.add(callback);
        }
        return timer;
      }
    );
    t.mock.method(
      globalThis,
      "clearTimeout",
      (timer: number | ReturnType<typeof setTimeout> | undefined) => {
        if (timer) timers.delete(timer);
        nativeClearTimeout(timer);
      }
    );
    const delay = owner.run(() => waitForAccountCapacityAdmission(777, signal.signal));
    const outcome = delay.then(
      () => ({ complete: true }),
      (error: unknown) => ({ error })
    );
    try {
      assert.equal(timers.size, 1, "phase-free delay has actually armed its timer");
      if (action === "reset-all") resetAll();
      else if (action === "reset-key") reset(key("phase-free"));
      else owner.close();
      const result = await Promise.race([outcome, pause(30).then(() => ({ pending: true }))]);
      assert.ok("error" in result, "phase-free reset/close rejects before the777ms delay");
      if ("error" in result) {
        assert.equal((result.error as { code?: string }).code, "SEMAPHORE_RESET");
        assert.equal(isAccountCapacityContextError(result.error), true);
      }
      assert.equal(timers.size, 0);
      assert.equal(
        signal.signal.aborted,
        false,
        "context retirement never mutates the caller signal"
      );
      assert.equal(getEventListeners(signal.signal, "abort").length, 0);
      for (const callback of callbacks) callback();
      assert.equal(timers.size, 0, "settled callback cannot rearm a retired delay");
    } finally {
      signal.abort();
      owner.close();
      await outcome;
      t.mock.restoreAll();
    }
  });
}

for (const deadline of [false, true]) {
  test("phase-free delay preserves normal deadline policy: " + deadline, async () => {
    const { waitForAccountCapacityAdmission } =
      await import("../../open-sse/services/accountSemaphore.ts");
    const signal = new AbortController();
    const owner = turn(deadline ? 90 : 1000, 20, signal.signal);
    await owner.wait([requirement("phase-free-control")]);
    (await owner.run(() => acquire(key("phase-free-control"), { maxConcurrency: 1 })))();
    try {
      const delayed = owner.run(() =>
        waitForAccountCapacityAdmission(deadline ? 777 : 15, signal.signal)
      );
      if (deadline) {
        await assert.rejects(delayed, { code: "COMBO_CAPACITY_TIMEOUT" });
        await assert.rejects(owner.expiration, { code: "COMBO_CAPACITY_TIMEOUT" });
      } else await delayed;
      assert.equal(signal.signal.aborted, false);
      assert.equal(getEventListeners(signal.signal, "abort").length, deadline ? 0 : 1);
    } finally {
      owner.close();
    }
  });
}

test("phase-free no-context abort preserves resolve-then-check499", async () => {
  const { waitForAccountCapacityAdmission } =
    await import("../../open-sse/services/accountSemaphore.ts");
  const signal = new AbortController();
  const delayed = waitForAccountCapacityAdmission(777, signal.signal);
  signal.abort();
  await delayed;
  assert.equal(getEventListeners(signal.signal, "abort").length, 0);
});

test("keyed reset detaches all composite waiters before context retirement drains", async () => {
  const { isAccountCapacityContextError } =
    await import("../../open-sse/services/accountSemaphore.ts");
  const a = key("reset-reentrant-a"),
    m = key("reset-reentrant-m"),
    n = key("reset-reentrant-n");
  const u = key("reset-unrelated");
  const heldM = await acquire(m, { maxConcurrency: 1 });
  const heldU = await acquire(u, { maxConcurrency: 1 });
  const unrelated = acquire(u, { maxConcurrency: 1 });
  const owner = turn(2000);
  await owner.wait([{ key: a, maxConcurrency: 2 }]);
  const controller = new AbortController();
  const older = owner
    .run(() =>
      runWithAccountCapacityAdmission(
        () =>
          acquireMany([
            { key: a, maxConcurrency: 2 },
            { key: m, maxConcurrency: 1 },
          ]),
        controller.signal
      )
    )
    .then(
      (release) => ({ release }),
      (error: unknown) => ({ error })
    );
  let youngRelease: (() => void) | undefined,
    grants = 0;
  const younger = acquireMany([
    { key: a, maxConcurrency: 2 },
    { key: n, maxConcurrency: 1 },
  ]).then(
    (release) => {
      youngRelease = release;
      grants++;
      return { granted: true };
    },
    (error: unknown) => ({ error })
  );
  try {
    for (let i = 0; i < 30 && (getStats()[a]?.queued !== 2 || getStats()[m]?.queued !== 1); i++)
      await pause();
    assert.equal(getStats()[a]?.queued, 2, "both composite requests enrolled before reset");
    assert.equal(getStats()[m]?.queued, 1);
    reset(a);
    const [first, second] = await Promise.all([older, younger]);
    assert.ok("error" in first, "resumed composite rejects");
    assert.ok("error" in second, "younger composite cannot be granted by reset reentrancy");
    if ("error" in first) {
      assert.equal((first.error as { code?: string }).code, "SEMAPHORE_RESET");
      assert.equal(isAccountCapacityContextError(first.error), true);
    }
    if ("error" in second)
      assert.equal((second.error as { code?: string }).code, "SEMAPHORE_RESET");
    assert.equal(grants, 0);
    assert.equal(getStats()[m]?.running, 1, "existing active finalizer remains live");
    assert.equal(getStats()[m]?.queued ?? 0, 0);
    assert.equal(getStats()[n]?.running ?? 0, 0);
    heldU();
    (await unrelated)();
    const fresh = await acquire(a, { maxConcurrency: 2, failFast: true });
    fresh();
  } finally {
    controller.abort();
    owner.close();
    youngRelease?.();
    heldM();
    heldU();
    (await unrelated)();
    const oldResult = await older;
    if ("release" in oldResult) oldResult.release();
    await younger;
  }
});
