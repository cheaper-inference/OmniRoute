import assert from "node:assert/strict";
import { test } from "node:test";
import { waitForCooldownAwareRetry } from "../../src/sse/services/cooldownAwareRetry.ts";

test("an early timer keeps waiting for the provider cooldown deadline", async (t) => {
  let now = Date.UTC(2026, 10, 20);
  t.mock.method(Date, "now", () => now);
  t.mock.timers.enable({ apis: ["setTimeout"] });

  const retryAfter = new Date(now + 100).toISOString();
  let settled = false;
  const pending = waitForCooldownAwareRetry(100, null, retryAfter).then((result) => {
    settled = true;
    return result;
  });

  now += 99;
  t.mock.timers.tick(100);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(settled, false, "the one remaining millisecond must not consume a retry");

  now += 1;
  t.mock.timers.tick(1);
  assert.equal(await pending, true);
});

test("an early cooldown timer keeps the remaining wait abortable", async (t) => {
  let now = Date.UTC(2026, 10, 20);
  t.mock.method(Date, "now", () => now);
  t.mock.timers.enable({ apis: ["setTimeout"] });

  const client = new AbortController();
  const retryAfter = new Date(now + 100).toISOString();
  const pending = waitForCooldownAwareRetry(100, client.signal, retryAfter);

  now += 99;
  t.mock.timers.tick(100);
  client.abort();
  assert.equal(await pending, false);
});

test("relative retry waits need no provider cooldown deadline", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const pending = waitForCooldownAwareRetry(100);
  t.mock.timers.tick(100);
  assert.equal(await pending, true);
});
