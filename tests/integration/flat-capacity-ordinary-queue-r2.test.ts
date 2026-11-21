import test from "node:test";
import assert from "node:assert/strict";
import type { ComboLike } from "../../open-sse/services/combo/types.ts";
import { createComboRoutingHarness } from "./_comboRoutingHarness.ts";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const h = await createComboRoutingHarness("flat-ordinary-queue-r2");
const sem = await import("../../open-sse/services/accountSemaphore.ts");
const aux = await import("../../open-sse/services/rateLimitSemaphore.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { resolveComboTargets } = await import("../../open-sse/services/combo/comboStructure.ts");
let sequence = 0;
const config = {
  maxRetries: 0,
  maxSetRetries: 0,
  comboTimeoutMs: 2000,
  targetTimeoutMs: 0,
  queueTimeoutMs: 600,
  queueDepth: 1,
  concurrencyPerModel: 1,
  comboCooldownWaitEnabled: false,
};
async function fixture(nested: boolean) {
  const id = String(
    (
      await providers.createProviderConnection({
        provider: "openai",
        authType: "apikey",
        apiKey: "synthetic-native-r2-" + ++sequence,
        isActive: true,
        maxConcurrent: 1,
        rateLimitOverrides: { maxWaitMs: 60 },
      })
    ).id
  );
  const childName = "ordinary-rr-" + sequence;
  const row = await h.combosDb.createCombo({
    name: childName,
    strategy: "round-robin",
    config,
    models: [{ kind: "model", provider: "openai", model: "gpt-4o-mini", connectionId: id }],
  });
  let name = childName;
  if (nested) {
    name = "outer-" + childName;
    await h.combosDb.createCombo({
      name,
      strategy: "priority",
      config: { ...config, nestedComboMode: "execute" },
      models: [{ kind: "combo-ref", comboName: childName }],
    });
  }
  const target = resolveComboTargets(row as unknown as ComboLike, [row as unknown as ComboLike])[0];
  const request = () =>
    h.handleChat(
      h.buildRequest({
        body: {
          model: name,
          stream: false,
          messages: [{ role: "user", content: "ordinary local queue expiry" }],
        },
      })
    );
  return { id, key: "combo:" + childName + ":" + target.executionKey, request };
}
test.beforeEach(async () => {
  await h.resetStorage();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await h.settingsDb.updateSettings({
    resilienceSettings: { requestQueue: { maxWaitMs: 60 }, providerCooldown: { enabled: false } },
  });
  h.installRecordingFetch();
});
test.afterEach(async () => {
  sem.resetAll();
  aux.resetAll();
  await h.resetStorage();
});
test.after(h.cleanup);
for (const nested of [false, true]) {
  test(
    "F3 actual ordinary RR queue budget returns a Response: " +
      (nested ? "legacy nested" : "standalone"),
    async () => {
      const f = await fixture(nested);
      assert.equal((await f.request()).status, 200);
      h.installRecordingFetch();
      const held = await aux.acquire(f.key, { maxConcurrency: 1 });
      try {
        const outcome = await f.request().then(
          (response) => ({ response }),
          (error: unknown) => ({ error })
        );
        assert.ok(
          "response" in outcome,
          "ordinary auxiliary budget exhaustion must resolve to a local Response"
        );
        if ("response" in outcome) {
          assert.equal(outcome.response.status, 503);
          await outcome.response.text();
        }
        assert.deepEqual(h.calls, [], "an expired local queue cannot send upstream");
        assert.equal(
          (await providers.getProviderConnectionById(f.id))?.rateLimitedUntil ?? null,
          null
        );
        assert.equal(aux.getStats()[f.key]?.queued, 0);
        assert.equal(sem.getStats()["openai:" + f.id]?.running ?? 0, 0);
      } finally {
        held();
      }
    }
  );
}
test("F3 real logical owner retains private capacity expiry", async () => {
  const f = await fixture(false);
  assert.equal((await f.request()).status, 200);
  h.installRecordingFetch();
  const held = await aux.acquire(f.key, { maxConcurrency: 1 });
  const owner = sem.createAccountCapacityWait({ deadline: Date.now() + 1000 });
  await owner.wait([{ key: "openai:" + f.id, maxConcurrency: 1 }]);
  try {
    await assert.rejects(
      owner.run(() => sem.runWithAccountCapacityAdmission(f.request)),
      sem.isAccountCapacityContextError
    );
    assert.deepEqual(h.calls, []);
  } finally {
    held();
    owner.close();
  }
});
