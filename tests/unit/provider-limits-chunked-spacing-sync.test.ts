/**
 * Unit tests for the pure `syncInChunksWithSpacing` helper (#6916).
 *
 * Proves the chunking/spacing contract in isolation — no DB, no network —
 * before it is wired into `syncAllProviderLimits()`'s OAuth and non-OAuth
 * paths.
 */
import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { setImmediate as nextTurn } from "node:timers/promises";

import { syncInChunksWithSpacing } from "../../src/lib/usage/providerLimits/chunkedSpacingSync.ts";

function controlSpacingClock(context: TestContext) {
  const nativeDate = globalThis.Date;
  const nativeTimeout = globalThis.setTimeout;
  context.mock.timers.enable({ apis: ["Date", "setTimeout"], now: 1_800_000_000_000 });
  const timeout = context.mock.method(globalThis, "setTimeout");
  let settled = true;

  context.after(async () => {
    try {
      // At most three chunks: drain a failed assertion's held waits before restoring globals.
      for (let remaining = 3; !settled && remaining > 0; remaining--) {
        context.mock.timers.runAll();
        await nextTurn();
      }
      assert.equal(settled, true, "the controlled sync must settle before restoring globals");
    } finally {
      // Restore the spy before the clock, and remove both from the context's tracker.
      context.mock.reset();
      assert.equal(globalThis.Date, nativeDate);
      assert.equal(globalThis.setTimeout, nativeTimeout);
    }
  });

  return {
    timeout,
    track<T>(pending: Promise<T>): Promise<T> {
      settled = false;
      void pending.then(
        () => {
          settled = true;
        },
        () => {
          settled = true;
        }
      );
      return pending;
    },
  };
}

test("waits between chunks but not after the last chunk when spacingMs > 0", async (t) => {
  const { timeout, track } = controlSpacingClock(t);
  const items = [1, 2, 3, 4];
  const chunkStarts: number[] = [];
  const start = Date.now();

  const pending = track(
    syncInChunksWithSpacing(
      items,
      2,
      40,
      async (item) => {
        chunkStarts.push(Date.now() - start);
        return item;
      },
      () => {}
    )
  );
  await nextTurn();
  assert.deepEqual(chunkStarts, [0, 0], "only the first chunk may start before the wait");
  assert.deepEqual(
    timeout.mock.calls.map((call) => call.arguments[1]),
    [40]
  );

  t.mock.timers.tick(39);
  await nextTurn();
  assert.deepEqual(chunkStarts, [0, 0], "the second chunk must not start before 40ms");
  t.mock.timers.tick(1);
  await nextTurn();
  assert.deepEqual(chunkStarts, [0, 0, 40, 40]);
  assert.equal(timeout.mock.callCount(), 1, "there must be no wait after the last chunk");
  await pending;
});

test("never waits when spacingMs === 0 (opt-out, preserves fast path)", async (t) => {
  const { timeout, track } = controlSpacingClock(t);
  const items = [1, 2, 3, 4];
  const chunks: number[][] = [];
  const start = Date.now();

  const pending = track(
    syncInChunksWithSpacing(
      items,
      2,
      0,
      async (item) => item,
      (chunk) => {
        chunks.push([...chunk]);
        // Elapsed work between chunks is not a request for a spacing timer.
        if (chunks.length === 1) t.mock.timers.setTime(Date.now() + 48);
      }
    )
  );
  await nextTurn();
  assert.equal(timeout.mock.callCount(), 0, "spacingMs=0 must not schedule a spacing timer");
  assert.deepEqual(
    chunks,
    [
      [1, 2],
      [3, 4],
    ],
    "both chunks must finish without ticking timers"
  );
  await pending;
  assert.equal(Date.now() - start, 48, "elapsed work does not change the zero-wait contract");
});

test("chunkSize=1 processes items strictly one at a time (reproduces OAuth semantics)", async () => {
  const items = ["a", "b", "c"];
  const chunks: string[][] = [];

  await syncInChunksWithSpacing(
    items,
    1,
    0,
    async (item) => item,
    (chunk) => chunks.push([...chunk])
  );

  assert.deepEqual(chunks, [["a"], ["b"], ["c"]]);
});

test("preserves in-chunk concurrency — all items in a chunk start before any resolves", async () => {
  const items = [1, 2, 3];
  let inFlight = 0;
  let maxInFlight = 0;

  await syncInChunksWithSpacing(
    items,
    3,
    0,
    async (item) => {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise((resolve) => setTimeout(resolve, 20));
      inFlight--;
      return item;
    },
    () => {}
  );

  assert.equal(maxInFlight, 3, "all 3 items in the single chunk should overlap");
});

test("delivers chunk + results to onChunkResults, including rejections", async () => {
  const items = [1, 2, 3];
  const seen: Array<{ chunk: number[]; statuses: string[] }> = [];

  await syncInChunksWithSpacing(
    items,
    2,
    0,
    async (item) => {
      if (item === 2) throw new Error("boom");
      return item * 10;
    },
    (chunk, results) => {
      seen.push({ chunk: [...chunk], statuses: results.map((r) => r.status) });
    }
  );

  assert.equal(seen.length, 2);
  assert.deepEqual(seen[0].chunk, [1, 2]);
  assert.deepEqual(seen[0].statuses, ["fulfilled", "rejected"]);
  assert.deepEqual(seen[1].chunk, [3]);
  assert.deepEqual(seen[1].statuses, ["fulfilled"]);
});
