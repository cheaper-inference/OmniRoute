// Host wake recovery: after a laptop sleeps, pooled upstream sockets are dead but still in the
// dispatcher cache, so the first requests after resume fail. A heartbeat timer sees the
// wall-clock gap (a sleeping host does not run timers) and flushes the dispatcher cache once.
// Opt-in: OMNIROUTE_WAKE_RECOVERY=1.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const wake = await import("../../src/lib/wakeRecovery.ts");

function harness() {
  let clock = 1_000_000;
  let flushes = 0;
  const watcher = wake.createWakeWatcher({
    now: () => clock,
    onWake: () => {
      flushes += 1;
    },
    heartbeatMs: 5_000,
    driftThresholdMs: 30_000,
  });
  return {
    tick: (advanceMs: number) => {
      clock += advanceMs;
      return watcher.tick();
    },
    flushes: () => flushes,
  };
}

test("normal heartbeats never fire recovery", () => {
  const h = harness();
  for (let i = 0; i < 20; i++) h.tick(5_000);
  assert.equal(h.flushes(), 0);
});

test("a gap above the threshold fires recovery once", () => {
  const h = harness();
  h.tick(5_000);
  assert.equal(h.tick(120_000), true);
  assert.equal(h.flushes(), 1);
  h.tick(5_000);
  assert.equal(h.flushes(), 1);
});

test("each separate gap fires once", () => {
  const h = harness();
  h.tick(60_000);
  h.tick(5_000);
  h.tick(90_000);
  assert.equal(h.flushes(), 2);
});

test("drift is the gap beyond one heartbeat: exactly 30 s does not fire, 30 s + 1 ms does", () => {
  const h = harness();
  h.tick(35_000);
  assert.equal(h.flushes(), 0);
  h.tick(35_001);
  assert.equal(h.flushes(), 1);
});

test("a failing recovery callback does not break the watcher", () => {
  let clock = 0;
  const watcher = wake.createWakeWatcher({
    now: () => clock,
    onWake: () => {
      throw new Error("flush failed");
    },
    heartbeatMs: 5_000,
    driftThresholdMs: 30_000,
  });
  clock += 60_000;
  assert.doesNotThrow(() => watcher.tick());
  clock += 5_000;
  assert.doesNotThrow(() => watcher.tick());
});

test("startWakeRecovery is off unless the env flag is set", () => {
  assert.equal(wake.startWakeRecovery({ env: {} }), null);
  assert.equal(wake.startWakeRecovery({ env: { OMNIROUTE_WAKE_RECOVERY: "0" } }), null);
});

test("startWakeRecovery returns an unref-ed timer that can be stopped", () => {
  const timer = wake.startWakeRecovery({
    env: { OMNIROUTE_WAKE_RECOVERY: "1" },
    onWake: () => {},
  });
  assert.ok(timer);
  assert.equal(timer.hasRef(), false, "the heartbeat must not keep the process alive");
  clearInterval(timer);
});

test("boot wiring: the optional table starts wake recovery, and it is self-gated", () => {
  const source = fs.readFileSync("src/instrumentation-node.ts", "utf8");
  const table = source.slice(
    source.indexOf("export const OPTIONAL_BOOT_SUBSYSTEMS"),
    source.indexOf("export async function startOptionalBootSubsystems")
  );
  assert.match(table, /name: "wake-recovery"[\s\S]*import\("@\/lib\/wakeRecovery"\)/);
});
