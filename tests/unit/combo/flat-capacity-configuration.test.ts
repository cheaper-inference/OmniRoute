import type { ComboLike } from "../../../open-sse/services/combo/types.ts";
import test from "node:test";
import assert from "node:assert/strict";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { cleanup } = createTempDataDir("capacity-f1-model-mixed-");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { createProviderConnection, updateProviderConnection } =
  await import("../../../src/lib/db/providers.ts");
const limiter = await import("../../../open-sse/services/rateLimitManager.ts");
const sem = await import("../../../open-sse/services/accountSemaphore.ts");
const { PUT } = await import("../../../src/app/api/providers/[id]/route.ts");
const { updateSettings } = await import("../../../src/lib/db/settings.ts");
const { getCachedProviderConnectionById } = await import("../../../src/lib/db/readCache.ts");
test.after(async () => {
  const { dispatchEvent } = await import("../../../src/lib/webhookDispatcher.ts");
  await dispatchEvent("request.failed", {});
  await cleanup();
});
test.afterEach(() => sem.resetAll());

const pause = () => new Promise((resolve) => setTimeout(resolve, 5));
let sequence = 0;
async function account(extra = {}) {
  return String(
    (
      await createProviderConnection({
        provider: "openai",
        authType: "apikey",
        apiKey: "review-synthetic-" + ++sequence,
        maxConcurrent: 1,
        isActive: true,
        ...extra,
      })
    ).id
  );
}
function model(id: string, name: string) {
  return { kind: "model", provider: "openai", model: name, connectionId: id };
}
const config = {
  maxRetries: 0,
  maxSetRetries: 0,
  comboTimeoutMs: 1500,
  nestedComboMode: "execute",
};
const log = { info() {}, warn() {}, debug() {}, error() {} };
async function until(check: () => boolean) {
  for (let i = 0; i < 100 && !check(); i++) await pause();
  assert.equal(check(), true, "expected capacity lifecycle state");
}
const answer = () =>
  Response.json({ choices: [{ message: { role: "assistant", content: "served" } }] });

for (const clear of [false, true]) {
  test(
    "provider PUT execution override " +
      (clear ? "clear" : "increase") +
      " wakes parked combo before old holder releases",
    async () => {
      await updateSettings({ requireLogin: false });
      const id = await account({
        maxConcurrent: 2,
        rateLimitProtection: true,
        rateLimitOverrides: { maxConcurrent: 1, maxWaitMs: 1000 },
      });
      limiter.refreshConnectionRateLimits(id, { maxConcurrent: 1, maxWaitMs: 1000 });
      limiter.enableRateLimitProtection(id);
      // Match the actual executor's configured cap and protected override source.
      const held = await sem.acquireMany([
        {
          key: "openai:" + id,
          maxConcurrency: 1,
          followConnectionCapacity: false,
          connectionId: id,
          connectionCapacity: 2,
        },
      ]);
      assert.equal((await getCachedProviderConnectionById(id))?.maxConcurrent, 2);
      const combo: ComboLike = {
        name: "updated-override-" + sequence,
        strategy: "priority",
        config,
        models: [model(id, "gpt-4o")],
      };
      let dispatches = 0;
      const response = handleComboChat({
        body: { stream: false, messages: [{ role: "user", content: "override mutation" }] },
        combo,
        log,
        handleSingleModel: async () => {
          const fresh = await getCachedProviderConnectionById(id);
          const cap = Number(
            (fresh?.rateLimitOverrides as { maxConcurrent?: number })?.maxConcurrent ??
              fresh?.maxConcurrent
          );
          const release = await sem.acquireMany([
            {
              key: "openai:" + id,
              maxConcurrency: cap,
              followConnectionCapacity: false,
              connectionId: id,
              connectionCapacity: 2,
            },
          ]);
          sem.markAccountCapacityExecutionStarted();
          dispatches++;
          release();
          return answer();
        },
      });
      try {
        await until(() => sem.getStats()["openai:" + id]?.queued === 1);
        const updated = await PUT(
          new Request("http://localhost/api/providers/" + id, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              rateLimitOverrides: clear ? null : { maxConcurrent: 2, maxWaitMs: 1000 },
            }),
          }),
          { params: Promise.resolve({ id }) }
        );
        assert.equal(updated.status, 200);
        assert.equal(
          (
            (await getCachedProviderConnectionById(id))?.rateLimitOverrides as {
              maxConcurrent?: number;
            } | null
          )?.maxConcurrent,
          clear ? undefined : 2
        );
        const served = await Promise.race([
          response,
          new Promise<null>((r) => setTimeout(() => r(null), 100)),
        ]);
        assert.ok(
          served,
          "persisted effective cap increase must wake without a new request or release"
        );
        assert.equal(served.status, 200);
        assert.equal(dispatches, 1);
        assert.equal(sem.getStats()["openai:" + id].running, 1, "original holder is still active");
      } finally {
        held();
        await response;
        limiter.disableRateLimitProtection(id);
        limiter.refreshConnectionRateLimits(id, null);
      }
    }
  );
}

for (const updatedCap of [2, 0]) {
  test(
    "persisted cap " +
      updatedCap +
      " update between busy read and park registration cannot strand stale candidate cap",
    async () => {
      const id = await account();
      const held = await sem.acquire("openai:" + id, { maxConcurrency: 1 });
      let notified: Promise<unknown> | undefined,
        updatedBeforeRegistration = false;
      let dispatches = 0;
      const response = handleComboChat({
        body: { stream: false, messages: [{ role: "user", content: "registration race" }] },
        combo: {
          name: "registration-" + sequence,
          strategy: "priority",
          config,
          models: [model(id, "gpt-4o")],
        },
        log: {
          ...log,
          info(_tag, message) {
            if (!notified && String(message).includes("is at max concurrency cap")) {
              queueMicrotask(() => {
                notified = updateProviderConnection(id, { maxConcurrent: updatedCap });
                updatedBeforeRegistration = (sem.getStats()["openai:" + id]?.queued ?? 0) === 0;
              });
            }
          },
        },
        handleSingleModel: async () => {
          const fresh = await getCachedProviderConnectionById(id);
          const release = await sem.acquire("openai:" + id, {
            maxConcurrency: Number(fresh?.maxConcurrent),
          });
          sem.markAccountCapacityExecutionStarted();
          dispatches++;
          release();
          return answer();
        },
      });
      try {
        const served = await Promise.race([
          response,
          new Promise<null>((r) => setTimeout(() => r(null), 200)),
        ]);
        assert.ok(notified, "test must traverse actual persisted cap-update notification");
        await notified;
        assert.equal(updatedBeforeRegistration, true);
        assert.ok(
          served,
          "post-commit capacity must be rechecked even when notification preceded registration"
        );
        assert.equal(served.status, 200);
        assert.equal(dispatches, 1);
        assert.equal(sem.getStats()["openai:" + id].running, 1);
      } finally {
        held();
        await response;
      }
    }
  );
}

test("disabled protection refresh uses DB capacity and re-enabling restores the override", async () => {
  const id = await account({ maxConcurrent: 2 });
  const held = await sem.acquireMany([
    {
      key: "openai:" + id,
      maxConcurrency: 1,
      followConnectionCapacity: false,
      connectionId: id,
      connectionCapacity: 2,
    },
  ]);
  limiter.refreshConnectionRateLimits(id, { maxConcurrent: 1 });
  limiter.enableRateLimitProtection(id);
  assert.equal(sem.getStats()["openai:" + id].maxConcurrency, 1);
  limiter.disableRateLimitProtection(id);
  assert.equal(sem.getStats()["openai:" + id].maxConcurrency, 2);
  limiter.refreshConnectionRateLimits(id, { maxConcurrent: 3 });
  assert.equal(
    sem.getStats()["openai:" + id].maxConcurrency,
    2,
    "disabled protection must not enforce its override"
  );
  limiter.enableRateLimitProtection(id);
  assert.equal(sem.getStats()["openai:" + id].maxConcurrency, 3);
  limiter.refreshConnectionRateLimits(id, null);
  assert.equal(sem.getStats()["openai:" + id].maxConcurrency, 2);
  limiter.disableRateLimitProtection(id);
  held();
});

for (const mutation of [
  "configured-increase",
  "configured-removal",
  "override-increase",
  "override-clear",
  "disable",
  "enable",
  "disabled-refresh",
] as const) {
  test(
    "centralized M365 ceiling survives operator mutation with a queued second account turn: " +
      mutation,
    async () => {
      const { buildConnectionConcurrencyFields } =
        await import("../../../src/sse/services/connectionConcurrencyFields.ts");
      const { toProviderConnection } =
        await import("../../../src/lib/db/providers/lazyConnectionView.ts");
      const helpers = await import("../../../open-sse/handlers/chatCore/executorHelpers.ts");
      const protectedAtStart = mutation.startsWith("override") || mutation === "disable";
      const initialConfigured = mutation.startsWith("configured") ? 1 : 2;
      const initialOverride = mutation === "enable" ? 2 : 1;
      const id = await account({
        provider: "copilot-m365-web",
        maxConcurrent: initialConfigured,
        rateLimitProtection: protectedAtStart,
        rateLimitOverrides: { maxConcurrent: initialOverride },
      });
      limiter.refreshConnectionRateLimits(id, { maxConcurrent: initialOverride });
      if (protectedAtStart) limiter.enableRateLimitProtection(id);
      else limiter.disableRateLimitProtection(id);
      const fields = buildConnectionConcurrencyFields(
        toProviderConnection(await getCachedProviderConnectionById(id))
      );
      assert.equal(fields.maxConcurrent, 1);
      assert.equal(fields.rateLimitMaxConcurrent, 1);
      const key = "copilot-m365-web:" + id;
      const requirement = {
        key,
        maxConcurrency: helpers.resolveAccountSemaphoreMaxConcurrency(fields, protectedAtStart),
        followConnectionCapacity: !helpers.isAccountSemaphoreConcurrencyOverridden(
          fields,
          protectedAtStart
        ),
        connectionId: id,
        connectionCapacity: fields.maxConcurrent,
        concurrencyCeiling: fields.maxConcurrent,
      };
      const held = await sem.acquireMany([requirement]);
      if (mutation === "override-clear" || mutation === "disable")
        await updateProviderConnection(id, { maxConcurrent: 2 });
      let secondAdmitted = false,
        maxRunning = 0;
      const waiting = sem.acquireMany([requirement]).then((release) => {
        secondAdmitted = true;
        maxRunning = sem.getStats()[key].running;
        release();
      });
      assert.equal(sem.getStats()[key].queued, 1);
      try {
        if (mutation.startsWith("configured")) {
          await updateProviderConnection(id, {
            maxConcurrent: mutation === "configured-removal" ? 0 : 2,
          });
        } else if (mutation === "disable") limiter.disableRateLimitProtection(id);
        else if (mutation === "enable") limiter.enableRateLimitProtection(id);
        else {
          await updateSettings({ requireLogin: false });
          const updated = await PUT(
            new Request("http://localhost/api/providers/" + id, {
              method: "PUT",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                rateLimitOverrides:
                  mutation === "override-clear"
                    ? null
                    : { maxConcurrent: mutation === "disabled-refresh" ? 3 : 2 },
              }),
            }),
            { params: Promise.resolve({ id }) }
          );
          assert.equal(updated.status, 200);
        }
        await new Promise((resolve) => setTimeout(resolve, 10));
        assert.equal(
          secondAdmitted,
          false,
          "operator settings must not bypass the provider's serial turn policy"
        );
        assert.equal(sem.getStats()[key].maxConcurrency, 1);
        held();
        await waiting;
        assert.equal(secondAdmitted, true);
        assert.equal(maxRunning, 1);
      } finally {
        held();
        await waiting;
        limiter.disableRateLimitProtection(id);
        limiter.refreshConnectionRateLimits(id, null);
      }
    }
  );
}

test("centralized M365 ceiling clamps fresh and reused execution gate enrollment", async () => {
  const { buildConnectionConcurrencyFields } =
    await import("../../../src/sse/services/connectionConcurrencyFields.ts");
  const { toProviderConnection } =
    await import("../../../src/lib/db/providers/lazyConnectionView.ts");
  const id = await account({
    provider: "copilot-m365-web",
    maxConcurrent: 4,
    rateLimitOverrides: { maxConcurrent: 4 },
  });
  const fields = buildConnectionConcurrencyFields(
    toProviderConnection(await getCachedProviderConnectionById(id))
  );
  const key = "copilot-m365-web:" + id;
  const held = await sem.acquireMany([
    {
      key,
      maxConcurrency: 4,
      connectionId: id,
      connectionCapacity: fields.maxConcurrent,
      concurrencyCeiling: fields.maxConcurrent,
      followConnectionCapacity: false,
    },
  ]);
  let waiting: Promise<void> | undefined,
    admitted = false;
  try {
    assert.equal(
      sem.getStats()[key].maxConcurrency,
      1,
      "fresh gate respects its centralized numeric ceiling"
    );
    waiting = sem.acquire(key, { maxConcurrency: 9 }).then((release) => {
      admitted = true;
      release();
    });
    assert.equal(
      sem.getStats()[key].maxConcurrency,
      1,
      "ensure/reuse cannot erase the serial ceiling"
    );
    assert.equal(sem.getStats()[key].queued, 1);
    assert.equal(admitted, false);
    held();
    await waiting;
    assert.equal(admitted, true);
  } finally {
    held();
    await waiting;
  }
});
