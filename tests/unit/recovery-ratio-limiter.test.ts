import test from "node:test";
import assert from "node:assert/strict";
import { createRecoveryRatioLimiter } from "../../open-sse/services/recoveryRatioLimiter.ts";

test("recovery sends are capped at 0.2 of initial sends, with a floor of 3", () => {
  let now = 1_000;
  const limiter = createRecoveryRatioLimiter({ now: () => now });
  const admitted = () => {
    let n = 0;
    while (limiter.tryRecovery()) n += 1;
    return n;
  };
  assert.equal(admitted(), 3, "no initial send yet: only the floor");

  for (let i = 0; i < 100; i += 1) limiter.noteInitial();
  assert.equal(admitted(), 17, "0.2 x 100 = 20 in the window, 3 already used");
  assert.equal(limiter.tryRecovery(), false);
});

test("a refused recovery is not counted, and initial sends are never refused", () => {
  const limiter = createRecoveryRatioLimiter({ now: () => 1_000 });
  for (let i = 0; i < 3; i += 1) assert.equal(limiter.tryRecovery(), true);
  for (let i = 0; i < 50; i += 1) assert.equal(limiter.tryRecovery(), false);
  for (let i = 0; i < 10; i += 1) limiter.noteInitial();
  assert.equal(limiter.tryRecovery(), false, "3 used, 0.2 x 10 = 2 < floor: still refused");
  for (let i = 0; i < 10; i += 1) limiter.noteInitial();
  assert.equal(limiter.tryRecovery(), true, "0.2 x 20 = 4: one more fits");
  assert.equal(limiter.tryRecovery(), false);
});

test("the window slides: counts older than the window stop counting", () => {
  let now = 5_000;
  const limiter = createRecoveryRatioLimiter({ now: () => now, windowMs: 10_000, buckets: 10 });
  for (let i = 0; i < 3; i += 1) assert.equal(limiter.tryRecovery(), true);
  assert.equal(limiter.tryRecovery(), false);
  now += 5_000;
  assert.equal(limiter.tryRecovery(), false, "half a window later the three are still in it");
  now += 5_000;
  assert.equal(limiter.tryRecovery(), true, "a full window later they are gone");
});
