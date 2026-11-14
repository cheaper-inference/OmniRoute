import test from "node:test";
import assert from "node:assert/strict";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { cleanup } = createTempDataDir("flat-capacity-r3-");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const providers = await import("../../../src/lib/db/providers.ts");
const cache = await import("../../../src/lib/db/readCache.ts");
const sem = await import("../../../open-sse/services/accountSemaphore.ts");
const pause = (ms = 5) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const log = { info() {}, warn() {}, debug() {}, error() {} };
const answer = () =>
  Response.json({ choices: [{ message: { role: "assistant", content: "capacity increased" } }] });
test.after(async () => {
  const { dispatchEvent } = await import("../../../src/lib/webhookDispatcher.ts");
  await dispatchEvent("request.failed", {});
  await cleanup();
});
test.afterEach(() => sem.resetAll());

test("F7 root pairs a held old connection snapshot with its pre-read revision", async () => {
  const id = String(
    (
      await providers.createProviderConnection({
        provider: "openai",
        authType: "apikey",
        apiKey: "synthetic-r3",
        maxConcurrent: 1,
        isActive: true,
      })
    ).id
  );
  const key = "openai:" + id;
  const combo = {
    name: "revision-r3",
    strategy: "priority",
    config: {
      maxRetries: 0,
      maxSetRetries: 0,
      targetTimeoutMs: 0,
      comboTimeoutMs: 3000,
      comboCooldownWaitEnabled: false,
    },
    models: [{ kind: "model", provider: "openai", model: "gpt-4o-mini", connectionId: id }],
  };
  const options = {
    combo,
    body: { stream: false, messages: [{ role: "user", content: "held cap snapshot" }] },
    settings: {},
    log,
    isModelAvailable: async () => true,
    handleSingleModel: async () => answer(),
  };
  assert.equal((await handleComboChat(options)).status, 200);
  const held = await sem.acquireMany([
    {
      key,
      maxConcurrency: 1,
      connectionId: id,
      connectionCapacity: 1,
      followConnectionCapacity: true,
    },
  ]);
  const entered = Promise.withResolvers<void>(),
    resume = Promise.withResolvers<void>(),
    dispatched = Promise.withResolvers<void>();
  let snapshot: Record<string, unknown> | null = null,
    armed = false,
    heldLookup = false,
    calls = 0;
  let restoreSnapshot: (() => void) | undefined;
  const previousRevision = sem.accountSemaphoreCapacityRevision(key);
  const pending = handleComboChat({
    ...options,
    isModelAvailable: async (_name, target) => {
      if (!armed && target && "modelAbortSignal" in target && target.modelAbortSignal) {
        armed = true;
        const old = await cache.getCachedProviderConnectionById(id);
        assert.ok(old);
        snapshot = old;
        const data = old.providerSpecificData;
        const descriptor = Object.getOwnPropertyDescriptor(old, "providerSpecificData");
        let capReadArmed = false;
        // Management health reads these fields first; hold the following cap snapshot return.
        Object.defineProperty(old, "providerSpecificData", {
          configurable: true,
          get() {
            if (!capReadArmed) {
              capReadArmed = true;
              Object.defineProperty(old, "then", {
                configurable: true,
                value(resolve: (value: Record<string, unknown>) => void) {
                  delete old.then;
                  heldLookup = true;
                  entered.resolve();
                  void resume.promise.then(() => resolve(old));
                },
              });
            }
            return data;
          },
        });
        restoreSnapshot = () => {
          if (descriptor) Object.defineProperty(old, "providerSpecificData", descriptor);
          delete old.then;
        };
      }
      return true;
    },
    handleSingleModel: async () => {
      calls++;
      const release = await sem.acquireMany([
        {
          key,
          maxConcurrency: 2,
          connectionId: id,
          connectionCapacity: 2,
          followConnectionCapacity: true,
        },
      ]);
      sem.markAccountCapacityExecutionStarted();
      dispatched.resolve();
      release();
      return answer();
    },
  });
  try {
    await Promise.race([entered.promise, pause(1000)]);
    assert.equal(armed, true);
    assert.equal(heldLookup, true, "actual cap lookup return is held");
    assert.ok(snapshot);
    assert.equal(snapshot.maxConcurrent, 1);
    await providers.updateProviderConnection(id, { maxConcurrent: 2 });
    assert.equal(snapshot.maxConcurrent, 1, "held snapshot remains the old row");
    assert.equal(
      sem.getStats()[key]?.maxConcurrency,
      2,
      "actual committed notification updated the gate"
    );
    assert.ok(sem.accountSemaphoreCapacityRevision(key) > previousRevision);
    resume.resolve();
    await Promise.race([dispatched.promise, pause(400)]);
    assert.equal(calls, 1, "updated capacity must dispatch before the original holder releases");
    const selected = await pending;
    assert.equal(selected.status, 200);
    await selected.text();
    assert.equal(sem.getStats()[key]?.running, 1, "original holder is still active");
  } finally {
    resume.resolve();
    held();
    restoreSnapshot?.();
    await pending;
  }
});

for (const state of ["idle", "queued", "closed", "expired", "consumed"] as const) {
  test("F6 surrender is release-only for a non-granted owner: " + state, async () => {
    const key = "fixture:surrender-" + state;
    const owner = sem.createAccountCapacityWait({
      deadline: Date.now() + (state === "expired" ? 20 : 1000),
    });
    let held: (() => void) | undefined, waiting: Promise<void> | undefined;
    try {
      if (state === "queued") {
        held = await sem.acquire(key, { maxConcurrency: 1 });
        waiting = owner.wait([{ key, maxConcurrency: 1 }]);
      } else if (state === "consumed") {
        await owner.wait([{ key, maxConcurrency: 1 }]);
        (await owner.run(() => sem.acquire(key, { maxConcurrency: 1 })))();
        owner.close();
      } else if (state === "closed") owner.close();
      else if (state === "expired") await pause(30);
      assert.doesNotThrow(() => {
        owner.surrender();
        owner.surrender();
      });
      assert.equal(owner.admitted, state === "consumed");
      if (state === "closed" || state === "consumed")
        assert.throws(() => owner.run(() => {}), { code: "SEMAPHORE_RESET" });
      if (state === "expired")
        assert.throws(() => owner.run(() => {}), { code: "COMBO_CAPACITY_TIMEOUT" });
      if (state === "queued") assert.equal(sem.getStats()[key]?.queued, 1);
    } finally {
      owner.close();
      held?.();
      await waiting?.catch(() => {});
    }
  });
}
