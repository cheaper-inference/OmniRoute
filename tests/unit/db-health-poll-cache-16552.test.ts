import assert from "node:assert/strict";
import test from "node:test";
import { createDbHealthCoordinator } from "../../src/lib/db/healthCheckRunner.ts";
import type { DbHealthCheckResult } from "../../src/lib/db/healthCheck.ts";

const result = (): DbHealthCheckResult => ({
  isHealthy: true,
  issues: [],
  repairedCount: 0,
  backupCreated: false,
  autoRepair: false,
  checkedAt: "2026-10-15T00:00:00Z",
  driver: { name: "better-sqlite3", degraded: false },
});

test("#16552 consecutive skip-integrity polls share a short-lived diagnosis", async () => {
  let calls = 0;
  const coordinator = createDbHealthCoordinator(
    async () => {
      calls++;
      return result();
    },
    { now: () => 0, cacheMs: 60_000 }
  );
  const first = await coordinator.run(false, true);
  assert.equal(await coordinator.run(false, true), first);
  assert.equal(calls, 1);
});

test("#16552 light snapshots never satisfy full scans; full snapshots may satisfy light polls", async () => {
  const modes: boolean[] = [];
  const coordinator = createDbHealthCoordinator(async (_repair, skip) => {
    modes.push(skip);
    return result();
  });
  await coordinator.run(false, true);
  const full = await coordinator.run(false, false);
  assert.equal(await coordinator.run(false, true), full);
  assert.deepEqual(modes, [true, false]);
});

test("#16552 light cache expires and repair invalidates both diagnosis slots", async () => {
  let now = 0;
  let calls = 0;
  const coordinator = createDbHealthCoordinator(
    async () => {
      calls++;
      return result();
    },
    { now: () => now, cacheMs: 60 }
  );
  await coordinator.run(false, true);
  now = 59;
  await coordinator.run(false, true);
  assert.equal(calls, 1);
  now = 60;
  await coordinator.run(false, true);
  assert.equal(calls, 2);
  await coordinator.run(true);
  await coordinator.run(false, true);
  assert.equal(calls, 4);
  coordinator.invalidate();
  await coordinator.run(false, true);
  assert.equal(calls, 5);
});

for (const skip of [false, true]) {
  test(`#16552 invalidation prevents ${skip ? "light" : "full"} cache repopulation`, async () => {
    let finish!: (value: DbHealthCheckResult) => void;
    let calls = 0;
    const coordinator = createDbHealthCoordinator(() => {
      calls++;
      return new Promise<DbHealthCheckResult>((resolve) => {
        finish = resolve;
      });
    });
    const first = coordinator.run(false, skip);
    coordinator.invalidate();
    finish(result());
    await first;
    const second = coordinator.run(false, skip);
    assert.equal(calls, 2);
    finish(result());
    await second;
  });
}

test("#16552 full and light in-flight requests only share in the safe direction", async () => {
  let finish!: (value: DbHealthCheckResult) => void;
  const coordinator = createDbHealthCoordinator(
    () =>
      new Promise<DbHealthCheckResult>((resolve) => {
        finish = resolve;
      })
  );
  const light = coordinator.run(false, true);
  await assert.rejects(coordinator.run(false, false), /in progress/);
  finish(result());
  await light;
  const full = coordinator.run(false, false);
  assert.equal(coordinator.run(false, true), full);
  finish(result());
  await full;
});
