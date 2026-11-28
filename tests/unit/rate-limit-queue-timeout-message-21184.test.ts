/**
 * #21184 — the local queue-budget 503 must say what happened and what to change.
 *
 * Under concurrent load a request that waits past `requestQueue.maxWaitMs` fails
 * with RATE_LIMIT_QUEUE_TIMEOUT before it ever reaches the provider. The old
 * message ("Request exceeded queue budget maxWaitMs=…") read like an upstream
 * outage: it did not say the request stayed local, how busy the connection's
 * queue was, or which setting to change. The code, status and error identity
 * stay the same; only the message gains that context.
 */
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { setImmediate as nextTurn } from "node:timers/promises";
import Bottleneck from "bottleneck";

import * as rateLimitManager from "../../open-sse/services/rateLimitManager.ts";
import {
  formatQueueTimeoutMessage,
  getClientSafeLocalRateLimitError,
  getTrustedLocalRateLimitError,
  LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE,
} from "../../open-sse/services/rateLimitManager/errors.ts";
import { __setProviderDefaultRateLimitsForTests } from "../../open-sse/services/providerDefaultRateLimit.ts";
import { formatProviderError } from "../../open-sse/utils/error.ts";
import { sanitizeErrorMessage } from "../../open-sse/utils/errorSanitization.ts";

describe("#21184 queue-budget timeout message", () => {
  it("formatQueueTimeoutMessage names the local queue, the setting, the load and the fix", () => {
    const message = formatQueueTimeoutMessage({
      target: "openai-compatible-chat-fa0dc13b/gpt-6.1-sol",
      maxWaitMs: 30000,
      queueWaitMs: 30000,
      queuedAhead: 4,
      runningAhead: 2,
      executionMaxWaitMs: 600000,
    });

    assert.match(message, /waited 30000ms in OmniRoute's local request queue/);
    assert.match(message, /never reached the provider/);
    assert.match(message, /\(requestQueue\.maxWaitMs=30000ms\)/);
    assert.match(message, /openai-compatible-chat-fa0dc13b\/gpt-6\.1-sol/);
    assert.match(message, /4 request\(s\) queued and 2 running ahead of it in the same queue/);
    assert.match(message, /not an upstream outage/);
    assert.match(message, /lower client concurrency or raise requestQueue\.maxWaitMs/);
    assert.match(message, /does not bound execution \(executionMaxWaitMs=600000ms\)/);
  });

  describe("withRateLimit", () => {
    beforeEach(async () => {
      await rateLimitManager.__resetRateLimitManagerForTests();
      __setProviderDefaultRateLimitsForTests(null);
    });

    afterEach(async () => {
      await rateLimitManager.__resetRateLimitManagerForTests();
      __setProviderDefaultRateLimitsForTests(null);
    });

    it("a queued request that outwaits its budget gets the contextual 503", async (t) => {
      const conn = "queue-message-conn";
      const { promise: heldSlot, resolve: releaseSlot } = Promise.withResolvers<string>();
      let limiter: Bottleneck | undefined;
      let firstStarted = false;
      let firstSettled = false;
      let secondSettled = false;
      let p1: Promise<unknown> | undefined;

      // Real Bottleneck, virtual clock: runner load must not consume the 30ms budget.
      t.mock.timers.enable({ apis: ["Date", "setTimeout", "setInterval"], now: Date.now() });

      /**
       * Advance the virtual clock 1ms at a time until `condition` holds.
       * @param condition - Predicate polled after each tick.
       * @param message - Assertion message when the condition never holds.
       * @returns Resolves once the condition holds.
       */
      const advanceUntil = async (condition: () => boolean, message: string): Promise<void> => {
        for (let elapsed = 0; !condition() && elapsed < 1000; elapsed++) {
          t.mock.timers.tick(1);
          await nextTurn();
        }
        assert.ok(condition(), message);
      };

      rateLimitManager.__setLimiterFactoryForTests((options) => {
        limiter = new Bottleneck(options);
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
          () => (firstSettled = true),
          () => (firstSettled = true)
        );
        await advanceUntil(() => firstStarted || firstSettled, "first request did not start");
        assert.equal(firstStarted, true, "first request must occupy the only slot");

        const p2 = rateLimitManager.withRateLimit(
          "openai",
          conn,
          "gpt-4",
          () => Promise.resolve("second"),
          null,
          30
        );
        void p2.then(
          () => (secondSettled = true),
          () => (secondSettled = true)
        );
        await advanceUntil(() => secondSettled, "queued request never timed out");

        await assert.rejects(p2, (err: unknown) => {
          const trusted = getTrustedLocalRateLimitError(err);
          assert.equal(trusted?.code, LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE);
          assert.equal(trusted?.status, 503);

          const message = (err as Error).message;
          assert.match(message, /never reached the provider/);
          // The request's own 30ms budget bounded its wait (the provider-default
          // slot gate can spend one virtual tick of it first); the connection's
          // effective setting is still the 30 s default.
          assert.match(message, /waited (29|30)ms in OmniRoute's local request queue/);
          assert.match(message, /\(requestQueue\.maxWaitMs=30000ms\)/);
          assert.match(message, /for openai\/gpt-4/);
          assert.match(
            message,
            /0 request\(s\) queued and 1 running ahead of it in the same queue/
          );
          assert.match(message, /lower client concurrency or raise requestQueue\.maxWaitMs/);

          // The client-facing body is built from the same message.
          const safe = getClientSafeLocalRateLimitError(err);
          assert.ok(safe);
          const clientMessage = sanitizeErrorMessage(
            formatProviderError(safe, "openai", "gpt-4", safe.status)
          );
          assert.match(clientMessage, /^\[503\]: /);
          assert.match(clientMessage, /never reached the provider/);
          assert.match(clientMessage, /lower client concurrency or raise requestQueue\.maxWaitMs/);
          return true;
        });
        assert.equal(firstSettled, false, "the held slot is still running");
      } finally {
        // Drain real Bottleneck work before the mocked timers are reset, which
        // would discard pending ticks.
        releaseSlot("ok");
        try {
          if (p1) await advanceUntil(() => firstSettled, "first request did not drain");
          if (limiter) {
            let stopped = false;
            void limiter.stop({ dropWaitingJobs: true }).finally(() => (stopped = true));
            await advanceUntil(() => stopped, "fixture limiter did not stop");
          }
          let reset = false;
          void rateLimitManager.__resetRateLimitManagerForTests().finally(() => (reset = true));
          await advanceUntil(() => reset, "fixture manager did not reset");
        } finally {
          t.mock.timers.reset();
        }
      }
    });
  });
});
