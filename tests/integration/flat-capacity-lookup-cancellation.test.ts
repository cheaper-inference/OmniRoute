import test from "node:test";
import assert from "node:assert/strict";
import { setImmediate } from "node:timers/promises";
import { createComboRoutingHarness } from "./_comboRoutingHarness.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const h = await createComboRoutingHarness("capacity-lookup-cancellation");
const sem = await import("../../open-sse/services/accountSemaphore.ts");
const aux = await import("../../open-sse/services/rateLimitSemaphore.ts");
const { refreshConnectionRateLimits } = await import("../../open-sse/services/rateLimitManager.ts");
const { resolveRequestQueueMaxWaitMs } =
  await import("../../open-sse/services/rateLimitManager/queueSettings.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { getCachedProviderConnectionById } = await import("../../src/lib/db/readCache.ts");
const { withAuxiliaryAdmission, releaseAuxiliaryAdmissionOwner } =
  await import("../../open-sse/services/combo/auxiliaryAdmission.ts");
let sequence = 0;
const configuredConnections = new Set<string>();

test.beforeEach(async () => {
  await h.resetStorage();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
  h.installRecordingFetch();
});
test.afterEach(() => {
  for (const id of configuredConnections) refreshConnectionRateLimits(id, null);
  configuredConnections.clear();
  sem.resetAll();
  aux.resetAll();
});
test.after(h.cleanup);

for (const context of ["local", "capacity"] as const) {
  for (const stop of ["abort", "budget", "owner"] as const) {
    for (const late of ["positive", "null", "reject"] as const) {
      test(`real executor releases composite during ${context} lookup ${stop}, late ${late}`, async () => {
        const id = String(
          (
            await createProviderConnection({
              provider: "openai",
              authType: "apikey",
              apiKey: "synthetic-lookup-cancel-" + ++sequence,
              isActive: true,
              maxConcurrent: 1,
              rateLimitOverrides: {
                maxWaitMs: stop === "budget" && context === "local" ? 150 : 5000,
              },
            })
          ).id
        );
        await h.settingsDb.updateSettings({
          resilienceSettings: {
            requestQueue: {
              globalConcurrentRequests: 1,
              maxWaitMs: stop === "budget" && context === "local" ? 150 : 5000,
            },
            providerQuotaOverrides: { openai: { providerConcurrency: 1 } },
            providerCooldown: { enabled: false },
          },
        });
        const queueBudgetMs = stop === "budget" && context === "local" ? 150 : 5000;
        refreshConnectionRateLimits(id, { maxWaitMs: queueBudgetMs });
        configuredConnections.add(id);
        assert.equal(resolveRequestQueueMaxWaitMs("openai", undefined, id), queueBudgetMs);
        const comboName = "lookup-qs-" + sequence;
        await h.combosDb.createCombo({
          name: comboName,
          strategy: "quota-share",
          models: [{ kind: "model", provider: "openai", model: "gpt-4o-mini", connectionId: id }],
          config: { maxRetries: 0, maxSetRetries: 0, comboTimeoutMs: 3000 },
        });
        const controller = new AbortController();
        let requestNumber = 0;
        const makeRequest = () =>
          h.handleChat(
            new Request(
              h.buildRequest({
                body: {
                  model: comboName,
                  stream: false,
                  messages: [
                    {
                      role: "user",
                      content: "lookup cancellation " + sequence + "/" + ++requestNumber,
                    },
                  ],
                },
              }),
              { signal: controller.signal }
            )
          );
        const warm = await makeRequest();
        assert.equal(warm.status, 200);
        await warm.text();
        h.installRecordingFetch();
        const snapshot = await getCachedProviderConnectionById(id);
        assert.ok(snapshot);
        const entered = Promise.withResolvers<void>();
        const resume = Promise.withResolvers<void>();
        let lookupFinished = false;
        let lookupEntered = false;
        Object.defineProperty(snapshot, "then", {
          configurable: true,
          get() {
            if ((sem.getStats()["openai:" + id]?.running ?? 0) === 0) return undefined;
            return (
              resolve: (value: Record<string, unknown>) => void,
              reject: (error: unknown) => void
            ) => {
              delete snapshot.then;
              lookupEntered = true;
              entered.resolve();
              void resume.promise.then(
                () => {
                  lookupFinished = true;
                  if (late === "null") snapshot.maxConcurrent = null;
                  resolve(snapshot);
                },
                (error: unknown) => {
                  lookupFinished = true;
                  reject(error);
                }
              );
            };
          },
        });
        const auxiliaryOwner = {};
        const owner =
          context === "capacity"
            ? sem.createAccountCapacityWait({
                deadline: Date.now() + (stop === "budget" ? 500 : 5000),
                signal: controller.signal,
              })
            : null;
        let inner: Promise<unknown> | undefined;
        const send = () => {
          const request = withAuxiliaryAdmission(
            { owner: auxiliaryOwner, kind: "quota-share", timeoutMs: 5000, maxQueueSize: 2 },
            makeRequest
          );
          inner = request.then(
            (response) => response.body?.cancel(),
            () => {}
          );
          return request;
        };
        const pending = (
          owner
            ? owner.run(() => sem.runWithAccountCapacityAdmission(send, controller.signal))
            : send()
        ).then(
          (response) => {
            return { response };
          },
          (error: unknown) => {
            return { error };
          }
        );
        try {
          assert.ok(
            await h.waitFor(() => lookupEntered, 2000),
            "the actual auxiliary cap lookup must be held"
          );
          assert.equal(sem.getStats().global?.running, 1);
          await entered.promise;
          assert.equal(sem.getStats()["openai:" + id]?.running, 1);
          assert.equal(sem.getStats()["provider:openai"]?.running, 1);
          assert.deepEqual(h.calls, []);
          if (stop === "abort") controller.abort(new Error("fixture caller cancellation"));
          if (stop === "owner") releaseAuxiliaryAdmissionOwner(auxiliaryOwner);
          assert.ok(
            await h.waitFor(
              () => Object.values(sem.getStats()).every((gate) => gate.running === 0),
              stop === "budget" ? 1000 : 300
            ),
            "the executor must release composite permits before the lookup resolves"
          );
          assert.equal(lookupFinished, false);
          assert.deepEqual(aux.getStats(), {});
          assert.deepEqual(h.calls, []);
          if (late === "reject") resume.reject(new Error("fixture late read failure"));
          else resume.resolve();
          await inner;
          await setImmediate();
          assert.equal(lookupFinished, true);
          assert.deepEqual(h.calls, [], "late lookup completion cannot dispatch upstream");
          assert.deepEqual(aux.getStats(), {}, "late lookup completion cannot enroll an auxiliary");
          assert.ok(Object.values(sem.getStats()).every((gate) => gate.running === 0));
        } finally {
          delete snapshot.then;
          resume.resolve();
          controller.abort();
          releaseAuxiliaryAdmissionOwner(auxiliaryOwner);
          owner?.close();
          await inner;
          const outcome = await pending;
          if ("response" in outcome) await outcome.response.body?.cancel();
        }
      });
    }
  }
}
