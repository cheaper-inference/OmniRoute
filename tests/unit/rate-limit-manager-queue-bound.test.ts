import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { setImmediate as nextTurn } from "node:timers/promises";
import Bottleneck from "bottleneck";

import * as rateLimitManager from "../../open-sse/services/rateLimitManager.ts";
import {
  getTrustedLocalRateLimitError,
  LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE,
} from "../../open-sse/services/rateLimitManager/errors.ts";
import { __setProviderDefaultRateLimitsForTests } from "../../open-sse/services/providerDefaultRateLimit.ts";

describe("queue wait bound - anti-orphan", () => {
  beforeEach(async () => {
    await rateLimitManager.__resetRateLimitManagerForTests();
    __setProviderDefaultRateLimitsForTests(null);
  });

  afterEach(async () => {
    await rateLimitManager.__resetRateLimitManagerForTests();
    __setProviderDefaultRateLimitsForTests(null);
  });

  it("queue wait bound - timeout before dispatch at the 30ms budget", async (t) => {
    const conn = "queue-bound-conn";
    const { promise: heldSlot, resolve: releaseSlot } = Promise.withResolvers<string>();
    let limiter: Bottleneck | undefined;
    let firstStarted = false;
    let firstSettled = false;
    let secondSettled = false;
    let idle = false;
    let fnCalled = false;
    let p1: Promise<unknown> | undefined;
    let p2: Promise<unknown> | undefined;

    // Keep Bottleneck and both production queue paths real. Only the clock is
    // controlled: runner scheduling delays must not consume the 30ms budget.
    t.mock.timers.enable({ apis: ["Date", "setTimeout", "setInterval"], now: Date.now() });
    const nextTick = async () => {
      t.mock.timers.tick(1);
      await nextTurn();
    };
    const advanceUntil = async (condition: () => boolean, message: string) => {
      for (let elapsed = 0; !condition() && elapsed < 1000; elapsed++) await nextTick();
      assert.ok(condition(), message);
    };
    const settleUnderClock = async <T>(promise: Promise<T>, message: string): Promise<T> => {
      let settled = false;
      void promise.then(
        () => {
          settled = true;
        },
        () => {
          settled = true;
        }
      );
      await advanceUntil(() => settled, message);
      return promise;
    };

    rateLimitManager.__setLimiterFactoryForTests((options) => {
      // Observe the real instance; do not replace scheduling or cancellation.
      limiter = new Bottleneck(options);
      limiter.on("idle", () => {
        idle = true;
      });
      return limiter;
    });

    try {
      rateLimitManager.enableRateLimitProtection(conn);
      rateLimitManager.refreshConnectionRateLimits(conn, { maxConcurrent: 1 });
      p1 = rateLimitManager.withRateLimit(
        "openai",
        conn,
        "gpt-4",
        () => {
          firstStarted = true;
          return heldSlot;
        },
        null,
        1000
      );
      void p1.then(
        () => {
          firstSettled = true;
        },
        () => {
          firstSettled = true;
        }
      );
      // The executing callback is the barrier; no sleep guesses when p1 starts.
      await advanceUntil(() => firstStarted || firstSettled, "first request did not start");
      assert.equal(firstStarted, true, "first request must occupy the only slot");
      assert.equal(firstSettled, false);
      assert.equal(limiter?.counts().EXECUTING, 1);

      const start = Date.now();
      p2 = rateLimitManager.withRateLimit(
        "openai",
        conn,
        "gpt-4",
        () => {
          fnCalled = true;
          return Promise.resolve("second");
        },
        null,
        30
      );
      // Observe settlement immediately so an unexpected early rejection cannot
      // become unhandled while the test drives the logical clock.
      void p2.then(
        () => {
          secondSettled = true;
        },
        () => {
          secondSettled = true;
        }
      );
      await nextTurn(); // install the queue deadline without advancing Date
      for (let elapsed = 0; elapsed < 29; elapsed++) await nextTick();
      assert.equal(secondSettled, false, "queue timeout must not precede its budget");
      assert.equal(firstSettled, false, "the occupied slot is still held");
      assert.equal(limiter?.counts().QUEUED, 1, "the second request really queued");
      assert.equal(fnCalled, false);

      await nextTick();
      assert.equal(Date.now() - start, 30, "the unchanged queue budget is exactly 30ms");
      assert.equal(secondSettled, true, "the deadline must reject before the slot is freed");
      await assert.rejects(p2, (err: unknown) => {
        const trusted = getTrustedLocalRateLimitError(err);
        assert.equal(trusted?.code, LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE);
        assert.equal(trusted?.status, 503);
        return true;
      });
      assert.equal(firstSettled, false, "timeout cannot wait for the first request");
      assert.equal(fnCalled, false, "queued function must not run after timeout");

      releaseSlot("ok");
      await advanceUntil(() => firstSettled && idle, "real limiter did not drain");
      assert.equal(await p1, "ok");
      const stateAfter = rateLimitManager.getRateLimitStatus("openai", conn);
      assert.equal(stateAfter.active, true, "the observed limiter must exist");
      assert.equal(stateAfter.queued, 0, "no orphan QUEUED after queue timeout");
      assert.equal(stateAfter.running, 0);
      assert.equal(stateAfter.executing, 0);
      assert.equal(fnCalled, false, "timed-out work must not execute when the slot frees");
    } finally {
      // Failure paths must also release the held slot and drain real Bottleneck
      // work before resetting mocked timers, which would discard pending ticks.
      releaseSlot("ok");
      try {
        if (limiter) {
          await settleUnderClock(
            limiter.stop({ dropWaitingJobs: true }),
            "fixture limiter did not stop during cleanup"
          );
        }
        await settleUnderClock(
          Promise.allSettled([p1, p2].filter((p): p is Promise<unknown> => p !== undefined)),
          "fixture requests did not settle during cleanup"
        );
      } finally {
        try {
          await settleUnderClock(
            rateLimitManager.__resetRateLimitManagerForTests(),
            "fixture manager did not reset during cleanup"
          );
        } finally {
          t.mock.timers.reset();
        }
      }
    }
  });

  it("remaining budget zero does not schedule work", async () => {
    const conn = "queue-remaining-zero";
    rateLimitManager.enableRateLimitProtection(conn);

    let fnCalled = false;
    await assert.rejects(
      () =>
        rateLimitManager.withRateLimit(
          "openai",
          conn,
          "gpt-4",
          async () => {
            fnCalled = true;
            return "ok";
          },
          null,
          0
        ),
      (err: unknown) => {
        const trusted = getTrustedLocalRateLimitError(err);
        return trusted?.code === LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE && trusted?.status === 503;
      }
    );
    assert.equal(fnCalled, false, "function must not be called when remaining is 0");
    const state = await rateLimitManager.__getLimiterStateForTests("openai", conn, "gpt-4");
    if (state) assert.equal(state.queued, 0);
  });

  it("abort and queue timeout are distinguished", async () => {
    const conn = "queue-abort-distinct";
    rateLimitManager.enableRateLimitProtection(conn);
    rateLimitManager.refreshConnectionRateLimits(conn, { maxConcurrent: 1 });

    // Occupy the slot so the abort-tracked request actually queues.
    const p1 = rateLimitManager.withRateLimit(
      "openai",
      conn,
      "gpt-4",
      () => new Promise<string>((r) => setTimeout(() => r("hold"), 300)),
      null,
      1000
    );
    await new Promise((r) => setTimeout(r, 10));

    const ac = new AbortController();
    setTimeout(() => ac.abort(), 15);

    await assert.rejects(
      () =>
        rateLimitManager.withRateLimit(
          "openai",
          conn,
          "gpt-4",
          () => new Promise(() => {}),
          ac.signal,
          1000
        ),
      (err: unknown) => {
        assert.equal((err as Error).name, "AbortError");
        // Abort must not be branded as a local queue timeout.
        const trusted = getTrustedLocalRateLimitError(err);
        assert.equal(trusted, null, "AbortError must not be branded as queue timeout");
        return true;
      }
    );

    await p1.catch(() => {});
  });

  it("negative remaining budget is rejected without enqueuing", async () => {
    const conn = "queue-negative-remaining";
    rateLimitManager.enableRateLimitProtection(conn);

    let fnCalled = false;
    await assert.rejects(
      () =>
        rateLimitManager.withRateLimit(
          "openai",
          conn,
          "gpt-4",
          async () => {
            fnCalled = true;
            return 1;
          },
          null,
          -5
        ),
      (err: unknown) =>
        getTrustedLocalRateLimitError(err)?.code === LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE
    );
    assert.equal(fnCalled, false);
  });
});
