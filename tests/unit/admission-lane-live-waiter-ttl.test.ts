// A virtual lane that still holds a live waiter must survive the idle TTL, so the
// queued request fails only at its own deadline (or is admitted when capacity frees).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  AdaptiveAdmissionController,
  type AdaptiveAdmissionConfig,
} from "../../open-sse/services/admission/index.ts";

class FakeClock {
  nowMs = 0;
  private nextId = 1;
  private timers = new Map<number, { due: number; fn: () => void }>();
  now = () => this.nowMs;
  setTimer = (fn: () => void, delayMs: number): number => {
    const id = this.nextId++;
    this.timers.set(id, { due: this.nowMs + Math.max(0, delayMs), fn });
    return id;
  };
  clearTimer = (id: number): void => {
    this.timers.delete(id);
  };
  advance(ms: number): void {
    const target = this.nowMs + ms;
    while (true) {
      let nextId: number | undefined;
      let nextDue = Number.POSITIVE_INFINITY;
      for (const [id, t] of this.timers) {
        if (t.due <= target && t.due < nextDue) {
          nextDue = t.due;
          nextId = id;
        }
      }
      if (nextId === undefined) {
        this.nowMs = target;
        return;
      }
      const timer = this.timers.get(nextId)!;
      this.timers.delete(nextId);
      this.nowMs = timer.due;
      timer.fn();
    }
  }
}

function setup() {
  const clock = new FakeClock();
  const config: AdaptiveAdmissionConfig = {
    mode: "enforce",
    minLimit: 10,
    maxLimit: 100,
    initialLimit: 10,
    maxQueueCount: 2,
    maxQueueCost: 20,
    defaultMaxWaitMs: 1000,
    windowMs: 1_000_000,
    shortLatencyAlpha: 0.5,
    longLatencyAlpha: 0.1,
    increaseStep: 2,
    decreaseFactor: 0.8,
    criticalDecreaseFactor: 0.5,
    highUtilizationThreshold: 0.7,
    lowUtilizationThreshold: 0.3,
    latencyGradientThreshold: 0.25,
    maxIncreasePerWindow: 4,
    virtualLanes: true,
  };
  const c = new AdaptiveAdmissionController(config, {
    now: clock.now,
    setTimer: clock.setTimer,
    clearTimer: clock.clearTimer,
  });
  return { c, clock };
}

describe("virtual lane idle TTL vs live waiters", () => {
  it("keeps a lane with a live waiter past the idle TTL and fails it at its own deadline", async () => {
    const { c, clock } = setup();
    const held = await c.acquire({ cost: 10, tenantKey: "_default" });
    assert.equal(held.status, "admitted");

    const q = await c.acquire({ cost: 5, tenantKey: "a", maxWaitMs: 120_000 });
    assert.equal(q.status, "queued");
    if (q.status !== "queued") return;
    let outcome: string | undefined;
    q.promise.then(
      () => (outcome = "admitted"),
      (err: { code?: string }) => (outcome = err.code)
    );

    clock.advance(60_001); // past the 60 s idle TTL, far before the 120 s deadline
    await Promise.resolve();
    assert.equal(outcome, undefined, `waiter must stay queued, got ${outcome}`);
    assert.equal(c.snapshot().laneCount, 1);

    clock.advance(60_000); // now past the waiter's own deadline
    await Promise.resolve();
    assert.equal(outcome, "ADMISSION_DEADLINE");
    assert.equal(c.snapshot().laneCount, 0);

    if (held.status === "admitted") held.lease.release("success");
    c.shutdown();
  });

  it("admits a waiter in a lane that outlived the idle TTL when capacity frees", async () => {
    const { c, clock } = setup();
    const held = await c.acquire({ cost: 10, tenantKey: "_default" });
    assert.equal(held.status, "admitted");

    const q = await c.acquire({ cost: 5, tenantKey: "a", maxWaitMs: 120_000 });
    assert.equal(q.status, "queued");
    if (q.status !== "queued" || held.status !== "admitted") return;

    clock.advance(61_000);
    held.lease.release("success");
    const admitted = await q.promise;
    assert.ok(admitted.lease);
    admitted.lease.release("success");
    c.shutdown();
  });
});
