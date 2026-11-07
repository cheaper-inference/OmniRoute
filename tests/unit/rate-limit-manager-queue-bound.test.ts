import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

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

  it(
    "queue wait bound - timeout before the occupied slot is released",
    { timeout: 3000 },
    async () => {
      const conn = "queue-bound-conn";
      rateLimitManager.enableRateLimitProtection(conn);
      rateLimitManager.refreshConnectionRateLimits(conn, { maxConcurrent: 1 });

      const started = Promise.withResolvers<void>();
      const occupied = Promise.withResolvers<string>();
      const p1 = rateLimitManager.withRateLimit(
        "openai",
        conn,
        "gpt-4",
        () => {
          started.resolve();
          return occupied.promise;
        },
        null,
        1000
      );
      let fnCalled = false;
      try {
        await started.promise;
        // Keep the slot occupied until rejection: execution expiration cannot satisfy this check.
        await assert.rejects(
          rateLimitManager.withRateLimit(
            "openai",
            conn,
            "gpt-4",
            () => {
              fnCalled = true;
              return Promise.resolve("second");
            },
            null,
            30
          ),
          (err: unknown) => {
            const trusted = getTrustedLocalRateLimitError(err);
            assert.equal(trusted?.code, LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE);
            assert.equal(trusted?.status, 503);
            return true;
          }
        );
        assert.equal(fnCalled, false, "queued function must not run after timeout");
      } finally {
        occupied.resolve("ok");
        await p1;
      }

      // Bottleneck removes an abandoned queued job asynchronously after capacity is released.
      let stateAfter = await rateLimitManager.__getLimiterStateForTests("openai", conn, "gpt-4");
      const deadline = Date.now() + 1000;
      while (stateAfter?.queued && Date.now() < deadline) {
        await new Promise<void>((resolve) => setImmediate(resolve));
        stateAfter = await rateLimitManager.__getLimiterStateForTests("openai", conn, "gpt-4");
      }
      assert.ok(stateAfter, "the fixture limiter must still exist");
      assert.equal(stateAfter.queued, 0, "no orphan QUEUED after queue timeout");
      assert.equal(fnCalled, false, "abandoned work must not dispatch after capacity is released");
    }
  );

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
