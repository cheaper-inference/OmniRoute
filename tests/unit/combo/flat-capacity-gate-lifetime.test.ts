import test from "node:test";
import assert from "node:assert/strict";
import { setImmediate } from "node:timers/promises";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";
import type {
  AttemptLoopDeps,
  AttemptLoopState,
} from "../../../open-sse/services/combo/attemptLoopTypes.ts";
import type { DispatchWithCooldownRetryExtra } from "../../../open-sse/services/combo/comboAttemptLoop.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { cleanup } = createTempDataDir("flat-gate-lifetime-");
const { dispatchWithCooldownRetry } =
  await import("../../../open-sse/services/combo/comboAttemptLoop.ts");
const { runCapacityRequest } =
  await import("../../../open-sse/services/combo/capacityBudgetContext.ts");
const { resolveResilienceSettings } = await import("../../../src/lib/resilience/settings.ts");
const sem = await import("../../../open-sse/services/accountSemaphore.ts");
let sequence = 0;
let keepAlive: ReturnType<typeof setInterval>;
test.before(() => {
  keepAlive = setInterval(() => {}, 1000);
});
test.afterEach(() => sem.resetAll());
test.after(async () => {
  clearInterval(keepAlive);
  const { dispatchEvent } = await import("../../../src/lib/webhookDispatcher.ts");
  await dispatchEvent("request.failed", {});
  await cleanup();
});

for (const stop of ["abort", "global-deadline", "candidate-deadline"] as const) {
  for (const gateResult of ["skip", "protected-stop", "proceed", "held-protected-stop"] as const) {
    const candidateExpiry = stop === "candidate-deadline";
    if (candidateExpiry && gateResult !== "held-protected-stop") continue;
    test(
      candidateExpiry
        ? "eligible protected gate cancels its late body after candidate expiry"
        : `durable gate await honors ${stop} before ${gateResult}`,
      async (t) => {
        const heldGate = gateResult === "held-protected-stop";
        const protectedGate = gateResult === "protected-stop" || heldGate;
        t.mock.timers.enable({ apis: heldGate ? ["Date", "setTimeout"] : ["Date"], now: 1000 });
        const id = "gate-" + ++sequence;
        const key = "fixture:" + id;
        const controller = new AbortController();
        const target: ResolvedComboTarget = {
          kind: "model",
          stepId: id,
          executionKey: id,
          provider: "fixture",
          providerId: null,
          modelStr: "fixture/model-" + id,
          connectionId: id,
          weight: 1,
          label: null,
          fallbackOnlyOnQuotaExhaustion: protectedGate,
        };
        const state: AttemptLoopState = {
          orderedTargets: [target],
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
          allObservedFailuresQuota: true,
          requestScopedFailureSeen: false,
          observeFailure(quotaExhausted, executionKey) {
            this.observedFailure = true;
            this.allObservedFailuresQuota &&= quotaExhausted;
            if (executionKey)
              this.targetFailureTrust.set(executionKey, {
                observedFailure: true,
                allObservedFailuresQuota: quotaExhausted,
              });
          },
        };
        let retryDelayEntered = false;
        const deps: AttemptLoopDeps = {
          capacityAdmissionEnabled: true,
          strategy: "priority",
          combo: { name: id, models: [] },
          config: {},
          log: {
            info(_tag, message) {
              if (String(message).includes("retrying set")) retryDelayEntered = true;
            },
            warn() {},
            debug() {},
            error() {},
          },
          settings: null,
          resilienceSettings: resolveResilienceSettings({
            resilienceSettings: {
              requestQueue: { maxWaitMs: 200 },
            },
          }),
          sticky: { targets: [], messageHash: null, stuck: false },
          effectiveSessionId: null,
          preScreenMap: new Map(),
          quotaCutoffResetWindowConfig: {} as AttemptLoopDeps["quotaCutoffResetWindowConfig"],
          maxRetries: 0,
          traceInvocationId: id,
          clientRequestedStream: false,
          handleSingleModelWithTimeout: async () => new Response("unused"),
          signal: controller.signal,
          body: { messages: [{ role: "user", content: id }] },
          startTime: Date.now(),
          releaseStickyPinOnFailure() {},
          clearStaleLKGP() {},
        };
        const entered = Promise.withResolvers<void>();
        const resume = Promise.withResolvers<void>();
        let sends = 0;
        let cancelled = 0;
        const extra: DispatchWithCooldownRetryExtra = {
          maxSetRetries: 1,
          setRetryDelayMs: 25,
          comboTimeoutMs: 2000,
          comboStartTime: Date.now(),
          comboCooldownWaitEnabled: false,
          compatRejectedTargets: [],
          comboCooldownAttempt: { current: 0 },
          comboCooldownBudgetLeftMs: { current: 0 },
          evaluateGates: async () => {
            if (
              candidateExpiry
                ? !sem.isComboAccountCapacityUnavailable("fixture", id, 1)
                : state.durableExhaustedProviders?.has("fixture")
            ) {
              entered.resolve();
              await resume.promise;
              if (gateResult === "skip") return { kind: "skip", result: null };
              if (protectedGate)
                return {
                  kind: "skip",
                  result: {
                    ok: false,
                    response: new Response(
                      new ReadableStream({
                        cancel() {
                          cancelled++;
                        },
                      }),
                      { status: 503 }
                    ),
                  },
                };
            } else if (sem.isComboAccountCapacityUnavailable("fixture", id, 1)) {
              return {
                kind: "skip",
                result: null,
                capacity: { key, maxConcurrency: 1 },
                protectedPriorityTarget: target.fallbackOnlyOnQuotaExhaustion === true,
              };
            }
            return {
              kind: "proceed",
              targetForAttempt: target,
              profile: {},
              protectedPriorityTarget: false,
            };
          },
          executeAttempt: async () => {
            sends++;
            if (sends > 1) return { ok: true, response: new Response("late dispatch") };
            const release = await sem.acquire(key, { maxConcurrency: 1 });
            sem.markAccountCapacityExecutionStarted();
            release();
            state.recordedAttempts++;
            state.globalAttempts++;
            state.lastStatus = 429;
            state.lastError = "fixture quota exhausted";
            state.observeFailure(true, target.executionKey);
            state.exhaustedProviders.add("fixture");
            (state.durableExhaustedProviders ??= new Set()).add("fixture");
            return { ok: false };
          },
        };
        const held = await sem.acquire(key, { maxConcurrency: 1 });
        let settled = false;
        const pending = runCapacityRequest(() =>
          dispatchWithCooldownRetry({ state, deps, extra })
        ).then((response) => {
          settled = true;
          return response;
        });
        let response: Response | undefined;
        try {
          for (let i = 0; i < 200 && sem.getStats()[key]?.queued !== 1; i++) await setImmediate();
          assert.equal(sem.getStats()[key]?.queued, 1, "the request must first park for capacity");
          held();
          if (heldGate && !candidateExpiry) {
            for (let i = 0; i < 200 && !retryDelayEntered; i++) await setImmediate();
            assert.equal(retryDelayEntered, true);
            t.mock.timers.tick(25);
          }
          await entered.promise;
          assert.equal(
            state.capacityWaitDeadline,
            candidateExpiry ? 1200 : undefined,
            candidateExpiry
              ? "the eligible target retains its original candidate bound"
              : "durable exhaustion cleared the capacity bound"
          );
          if (stop === "abort") controller.abort(new Error("fixture caller abort during gate"));
          else t.mock.timers.tick(candidateExpiry ? 201 : 2100);
          if (heldGate) {
            await setImmediate();
            assert.equal(
              settled,
              true,
              "the request must settle before its gate read is unblocked"
            );
            response = await pending;
            assert.equal(cancelled, 0, "the held gate has not created its response yet");
            assert.equal(sends, candidateExpiry ? 0 : 1);
            assert.ok(Object.values(sem.getStats()).every((gate) => gate.running === 0));
            if (candidateExpiry)
              assert.ok(Date.now() < deps.comboDeadline!, "global lifetime remains live");
          }
          resume.resolve();
          response ??= await pending;
          assert.equal(response.status, stop === "abort" ? 499 : candidateExpiry ? 503 : 504);
          assert.equal(sends, candidateExpiry ? 0 : 1, "an expired gate cannot authorize dispatch");
          if (stop === "global-deadline")
            assert.equal((await response.clone().json()).error.code, "COMBO_TIMEOUT");
          await setImmediate();
          assert.equal(
            cancelled,
            protectedGate ? 1 : 0,
            "an overridden terminal gate response must be cancelled"
          );
        } finally {
          resume.resolve();
          held();
          controller.abort();
          response ??= await pending;
          await response.body?.cancel();
        }
      }
    );
  }
}
