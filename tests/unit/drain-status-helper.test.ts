/**
 * open-sse/utils/drainStatus.ts reads the drain flag that src/lib/gracefulShutdown.ts
 * owns without importing it (the engine must not gain open-sse -> src edges). These
 * tests pin the status rule and keep the two readers of the shared state in sync.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { drainAwareFailureStatus, isInstanceDraining } =
  await import("../../open-sse/utils/drainStatus.ts");
const { isDraining } = await import("../../src/lib/gracefulShutdown.ts");

function setDraining(shuttingDown: boolean) {
  globalThis.__omnirouteShutdown = { init: false, shuttingDown, activeRequests: 0 };
}

test.afterEach(() => {
  delete globalThis.__omnirouteShutdown;
});

test("a 5xx becomes 499 only while draining; a 4xx keeps its status", () => {
  setDraining(false);
  assert.equal(drainAwareFailureStatus(502), 502);
  assert.equal(drainAwareFailureStatus(500), 500);
  assert.equal(drainAwareFailureStatus(429), 429);

  setDraining(true);
  assert.equal(drainAwareFailureStatus(502), 499);
  assert.equal(drainAwareFailureStatus(503), 499);
  assert.equal(drainAwareFailureStatus(400), 400);
  assert.equal(drainAwareFailureStatus(429), 429);
});

test("the engine-side reader agrees with gracefulShutdown.isDraining()", () => {
  delete globalThis.__omnirouteShutdown;
  assert.equal(isInstanceDraining(), false, "no shutdown state yet means not draining");

  setDraining(false);
  assert.equal(isInstanceDraining(), isDraining());
  assert.equal(isInstanceDraining(), false);

  setDraining(true);
  assert.equal(isInstanceDraining(), isDraining());
  assert.equal(isInstanceDraining(), true);
});
