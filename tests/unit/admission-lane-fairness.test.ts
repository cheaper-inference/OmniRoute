// Virtual-lane fairness: a freed slot rotates across lanes, and a newer request does not
// jump the older request queued in its own tenant lane.
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  AdaptiveAdmissionController,
  type AdaptiveAdmissionConfig,
  type AdmissionAcquireResult,
  type AdmissionLease,
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
}

function config(overrides: Partial<AdaptiveAdmissionConfig> = {}): AdaptiveAdmissionConfig {
  return {
    mode: "enforce",
    minLimit: 10,
    maxLimit: 100,
    initialLimit: 10,
    maxQueueCount: 20,
    maxQueueCost: 200,
    defaultMaxWaitMs: 60_000,
    windowMs: 100,
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
    ...overrides,
  };
}

const flush = () => new Promise<void>((resolve) => setImmediate(resolve));

describe("virtual lane fairness", () => {
  let clock: FakeClock;
  let controller: AdaptiveAdmissionController;

  beforeEach(() => {
    clock = new FakeClock();
    controller = new AdaptiveAdmissionController(config(), {
      now: clock.now,
      setTimer: clock.setTimer,
      clearTimer: clock.clearTimer,
    });
  });
  afterEach(() => controller.shutdown());

  async function admitNow(cost: number, tenantKey = "_default"): Promise<AdmissionLease> {
    const result = await controller.acquire({ cost, tenantKey });
    assert.equal(result.status, "admitted");
    if (result.status !== "admitted") throw new Error("expected admitted");
    return result.lease;
  }

  /** Records the order in which queued requests get their slot. */
  function track(order: string[], label: string, result: AdmissionAcquireResult): void {
    assert.equal(result.status, "queued", `${label} must queue`);
    // Requests still queued when the test ends are rejected by shutdown(); that is expected.
    if (result.status === "queued")
      result.promise.then(
        () => order.push(label),
        () => {}
      );
  }

  it("a freed slot rotates across lanes instead of always serving the first lane", async () => {
    const held: AdmissionLease[] = [];
    for (let i = 0; i < 10; i++) held.push(await admitNow(1));

    const order: string[] = [];
    for (let i = 0; i < 4; i++)
      track(order, "A", await controller.acquire({ cost: 1, tenantKey: "tenant-a" }));
    track(order, "B", await controller.acquire({ cost: 1, tenantKey: "tenant-b" }));

    for (let i = 0; i < 5; i++) {
      held[i].release("success");
      await flush();
    }

    assert.equal(order.length, 5);
    assert.ok(
      order.indexOf("B") <= 1,
      `tenant B waited behind tenant A's backlog; admission order=${order.join("")}`
    );
  });

  it("a lane whose head does not fit does not stall the next lane", async () => {
    const held: AdmissionLease[] = [];
    for (let i = 0; i < 10; i++) held.push(await admitNow(1));

    const order: string[] = [];
    track(order, "A", await controller.acquire({ cost: 3, tenantKey: "tenant-a" }));
    track(order, "B", await controller.acquire({ cost: 1, tenantKey: "tenant-b" }));

    held[0].release("success");
    await flush();
    assert.deepEqual(order, ["B"]);
  });

  it("a newer request does not jump the older request queued in its own lane", async () => {
    const held = await admitNow(5);

    const order: string[] = [];
    track(order, "older", await controller.acquire({ cost: 8, tenantKey: "tenant-a" }));
    const newer = await controller.acquire({ cost: 1, tenantKey: "tenant-a" });

    assert.equal(
      newer.status,
      "queued",
      "the newer same-tenant request fits now but must wait behind the older queued head"
    );
    if (newer.status === "queued")
      newer.promise.then(
        () => order.push("newer"),
        () => {}
      );

    held.release("success");
    await flush();
    assert.equal(order[0], "older", "the older request is served first");
  });

  it("spare capacity left after the head is admitted also admits the queued newer request", async () => {
    const held = await admitNow(5);

    const order: string[] = [];
    track(order, "older", await controller.acquire({ cost: 8, tenantKey: "tenant-a" }));
    track(order, "newer", await controller.acquire({ cost: 1, tenantKey: "tenant-a" }));

    held.release("success");
    await flush();
    assert.deepEqual(order, ["older", "newer"], "the newer request fits the spare 2 units now");
  });

  it("another tenant still bypasses a lane head that does not fit", async () => {
    await admitNow(5);
    await controller.acquire({ cost: 8, tenantKey: "tenant-a" }).then((r) => {
      assert.equal(r.status, "queued");
      if (r.status === "queued") r.promise.catch(() => {});
    });

    const other = await controller.acquire({ cost: 1, tenantKey: "tenant-b" });
    assert.equal(other.status, "admitted");
  });
});
