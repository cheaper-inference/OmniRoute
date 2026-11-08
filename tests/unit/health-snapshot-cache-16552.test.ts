import assert from "node:assert/strict";
import test from "node:test";
import { createHealthSnapshotCache } from "../../src/lib/monitoring/healthSnapshotCache.ts";

test("#16552 coalesces cold loads, serves stale stats and refreshes once in background", async () => {
  let now = 0;
  let calls = 0;
  const queue: Array<() => void> = [];
  const cache = createHealthSnapshotCache<number>({
    now: () => now,
    ttlMs: 30,
    staleMs: 60,
    defer: (run) => {
      queue.push(run);
    },
    onError: () => {},
  });
  const load = () => ++calls;
  const first = cache.get("24h", load);
  const second = cache.get("24h", load);
  assert.equal(first, second);
  assert.equal(queue.length, 1);
  queue.shift()!();
  assert.equal(await first, 1);
  now = 29;
  assert.equal(await cache.get("24h", load), 1);
  assert.equal(calls, 1);
  now = 30;
  assert.equal(await cache.get("24h", load), 1);
  assert.equal(await cache.get("24h", load), 1);
  assert.equal(queue.length, 1);
  queue.shift()!();
  await new Promise<void>((resolve) => setImmediate(resolve));
  assert.equal(await cache.get("24h", load), 2);
  const otherRange = cache.get("7d", load);
  queue.shift()!();
  assert.equal(await otherRange, 3);
});

test("#16552 clears pending generations and retries failures without publishing stale results", async () => {
  const queue: Array<() => void> = [];
  let calls = 0;
  let errors = 0;
  const cache = createHealthSnapshotCache<number>({
    defer: (run) => {
      queue.push(run);
    },
    onError: () => {
      errors++;
    },
  });
  const old = cache.get("24h", () => ++calls);
  cache.clear();
  queue.shift()!();
  await assert.rejects(old, /invalidated/);
  assert.equal(calls, 0);
  const broken = cache.get("24h", () => {
    throw new Error("synthetic failure");
  });
  queue.shift()!();
  await assert.rejects(broken, /synthetic failure/);
  const fresh = cache.get("24h", () => ++calls);
  queue.shift()!();
  assert.equal(await fresh, 1);
  assert.equal(errors, 2);
});

test("#16552 refuses indefinitely stale values when background refresh keeps failing", async () => {
  let now = 0;
  const cache = createHealthSnapshotCache<number>({
    now: () => now,
    ttlMs: 30,
    staleMs: 60,
    onError: () => {},
  });
  assert.equal(await cache.get("24h", () => 1), 1);
  now = 31;
  assert.equal(
    await cache.get("24h", () => {
      throw new Error("offline");
    }),
    1
  );
  await new Promise<void>((resolve) => setImmediate(resolve));
  now = 90;
  await assert.rejects(
    cache.get("24h", () => {
      throw new Error("offline");
    }),
    /offline/
  );
});

test("#16552 reset during a computation cannot publish into the new cache generation", async () => {
  let calls = 0;
  const cache = createHealthSnapshotCache<number>({ onError: () => {} });
  assert.equal(
    await cache.get("24h", () => {
      cache.clear();
      return ++calls;
    }),
    1
  );
  assert.equal(await cache.get("24h", () => ++calls), 2);
});
