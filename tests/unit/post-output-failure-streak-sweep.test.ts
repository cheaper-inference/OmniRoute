import test from "node:test";
import assert from "node:assert/strict";

const streak = await import("../../open-sse/services/accountFallback/postOutputFailureStreak.ts");

const WINDOW = streak.POST_OUTPUT_FAILURE_STREAK_WINDOW_MS;

test("idle streak entries are swept after the streak window without any new failure", (t) => {
  t.mock.timers.enable({ apis: ["setInterval", "Date"], now: 1_000_000 });
  t.after(() => streak.resetPostOutputFailureStreaks());
  streak.resetPostOutputFailureStreaks();

  // Two mid-stream failures on connections that are never used again.
  assert.equal(streak.postOutputFailureReachesLockout("p", "dead-1", "m"), false);
  assert.equal(streak.postOutputFailureReachesLockout("p", "dead-2", "m"), false);
  assert.equal(streak.getPostOutputFailureStreakCount(), 2);

  t.mock.timers.tick(2 * WINDOW);

  assert.equal(streak.getPostOutputFailureStreakCount(), 0);
});

test("the sweep keeps an entry whose last failure is inside the window", (t) => {
  t.mock.timers.enable({ apis: ["setInterval", "Date"], now: 1_000_000 });
  t.after(() => streak.resetPostOutputFailureStreaks());
  streak.resetPostOutputFailureStreaks();

  assert.equal(streak.postOutputFailureReachesLockout("p", "live", "m"), false);
  t.mock.timers.tick(WINDOW - 120_000);
  assert.equal(streak.postOutputFailureReachesLockout("p", "live", "m"), false); // count 2
  t.mock.timers.tick(WINDOW - 120_000); // first failure is now older than the window
  assert.equal(streak.getPostOutputFailureStreakCount(), 1);
  // The third failure still completes the streak: the sweep did not drop the live entry.
  assert.equal(streak.postOutputFailureReachesLockout("p", "live", "m"), true);
});
