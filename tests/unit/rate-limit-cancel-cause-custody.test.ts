import assert from "node:assert/strict";
import test from "node:test";
import Bottleneck from "bottleneck";
import * as rates from "../../open-sse/services/rateLimitManager.ts";
import { DEFAULT_RESILIENCE_SETTINGS } from "../../src/lib/resilience/settings.ts";

type Lock = { schedule: <T>(fn: () => Promise<T>) => Promise<T> };
test.afterEach(async () => {
  await rates.__resetRateLimitManagerForTests();
});
test.after(async () => {
  (await import("../../src/lib/db/core.ts")).resetDbInstance();
});
for (const kind of ["abort", "timeout"] as const) {
  test(
    `${kind} cause wins over an immediate internal drop of a RECEIVED job`,
    { timeout: 10000 },
    async () => {
      const received = Promise.withResolvers<void>();
      const hold = Promise.withResolvers<void>();
      let limiter: Bottleneck | undefined;
      let blocked: Promise<void> | undefined;
      let calls = 0;
      rates.__setLimiterFactoryForTests((options) => {
        limiter = new Bottleneck(options);
        blocked = (limiter as unknown as { _submitLock: Lock })._submitLock.schedule(
          () => hold.promise
        );
        limiter.on("received", () => {
          received.resolve();
        });
        return limiter;
      });
      await rates.applyRequestQueueSettings({
        ...DEFAULT_RESILIENCE_SETTINGS.requestQueue,
        requestsPerMinute: 1000,
        minTimeBetweenRequestsMs: 0,
        maxWaitMs: 10000,
        autoEnableApiKeyProviders: false,
      });
      const id = `received-cause-${kind}`;
      rates.enableRateLimitProtection(id);
      const controller = new AbortController();
      const reason = new DOMException("original caller cancellation", "AbortError");
      const work = rates.withRateLimit(
        "openai",
        id,
        "fixture",
        async () => ++calls,
        controller.signal,
        kind === "timeout" ? 50 : undefined
      );
      const observed = work.then(
        (value) => ({ value, error: undefined }),
        (error: unknown) => ({ value: undefined, error })
      );
      try {
        await received.promise;
        assert.ok(limiter);
        assert.equal(limiter.counts().RECEIVED, 1);
        if (kind === "abort") controller.abort(reason);
        const outcome = await observed;
        if (kind === "abort")
          assert.equal(
            outcome.error,
            reason,
            "native AbortError identity must survive immediate queue cleanup"
          );
        else {
          assert.ok(outcome.error instanceof Error);
          assert.equal(
            (outcome.error as Error & { code?: string }).code,
            "RATE_LIMIT_QUEUE_TIMEOUT"
          );
        }
        assert.equal(calls, 0);
        assert.equal(limiter.counts().RECEIVED, 0);
        assert.equal(limiter.queued(), 0);
      } finally {
        controller.abort();
        hold.resolve();
        await blocked;
        await observed;
      }
    }
  );
}
