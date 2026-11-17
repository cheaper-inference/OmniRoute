/**
 * Round-robin calls markRateLimited() while the failing request still holds its slot,
 * then releases the slot. The last release used to delete the idle gate together with
 * its rateLimitedUntil, so the next acquire got a fresh gate and hit the cooled target.
 */
import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  acquire,
  getStats,
  markRateLimited,
  resetAll,
} from "../../open-sse/services/rateLimitSemaphore.ts";

const NOW = Date.parse("2030-01-01T00:00:00Z");
const MODEL = "combo:rr:glm/glm-4.6";

afterEach(() => {
  resetAll();
});

describe("rateLimitSemaphore keeps a cooldown after the last slot is released", () => {
  beforeEach((context) => context.mock.timers.enable({ apis: ["Date", "setTimeout"], now: NOW }));

  it("blocks the next acquire until the cooldown ends", async (t) => {
    const release = await acquire(MODEL, { maxConcurrency: 1 });
    markRateLimited(MODEL, 10000);
    release();

    assert.equal(getStats()[MODEL]?.rateLimitedUntil, new Date(NOW + 10000).toISOString());
    await assert.rejects(acquire(MODEL, { maxConcurrency: 1, maxQueueSize: 0 }), {
      code: "SEMAPHORE_QUEUE_FULL",
    });
    assert.notEqual(getStats()[MODEL]?.rateLimitedUntil, undefined, "queue-full keeps the gate");

    t.mock.timers.tick(10050);

    assert.equal(getStats()[MODEL], undefined, "idle gate is dropped at expiry");
    const again = await acquire(MODEL, { maxConcurrency: 1, maxQueueSize: 0 });
    again();
  });

  it("serves the next acquire right after expiry without the timer", async (t) => {
    const release = await acquire(MODEL, { maxConcurrency: 1 });
    markRateLimited(MODEL, 1000);
    release();

    t.mock.timers.tick(1000);

    const again = await acquire(MODEL, { maxConcurrency: 1, maxQueueSize: 0 });
    again();
    assert.equal(getStats()[MODEL], undefined);
  });
});
