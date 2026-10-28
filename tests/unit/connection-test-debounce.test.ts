/**
 * Hit-stable debounce window for provider connection tests.
 *
 * A dashboard tab left open fires the batch test endpoint every ~300s around
 * the clock (thousands of call_logs rows/day, and each real probe re-anchors
 * upstream 5h quota windows). The window deliberately does NOT refresh on a
 * hit: the observed tab cadence is exactly 300s, so a classic fixed TTL of the
 * same length would resonate with it and lapse periodically. Failed results
 * age out at half the window.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { createConnectionTestDebounce, resolveConnectionTestDebounceMs } = await import(
  "../../src/lib/connectionTestDebounce.ts"
);

test("1. returns the cached result inside the window and does not slide it forward", () => {
  let now = 1_000_000;
  const d = createConnectionTestDebounce({ now: () => now, windowMs: 300_000 });
  const first = d.lookup("conn-a");
  assert.equal(first, undefined, "first call is a miss");
  d.record("conn-a", { valid: true, latencyMs: 42 }, false);
  // 200s later: hit, and the hit must not extend the window (sliding-free).
  now += 200_000;
  const hit = d.lookup("conn-a");
  assert.ok(hit && (hit.result as { valid: boolean }).valid === true);
  assert.equal(hit.debounced, true);
  // 150s after THAT (350s from record): outside the window despite the hit.
  now += 150_000;
  assert.equal(d.lookup("conn-a"), undefined, "hit must not refresh the window");
});

test("2. expiry is strictly greater-than: elapsed == window still hits (resonance guard)", () => {
  // A poll cadence exactly equal to the window must not land on an expired
  // entry every time — that is the fixed-TTL resonance failure mode.
  let now = 0;
  const d = createConnectionTestDebounce({ now: () => now, windowMs: 300_000 });
  d.record("conn-r", { valid: true }, false);
  now += 300_000;
  assert.ok(d.lookup("conn-r"), "elapsed == window is still inside (strictly greater expiries)");
  now += 1;
  assert.equal(d.lookup("conn-r"), undefined, "elapsed > window expires");
});

test("3. failed results age out at half the window", () => {
  let now = 0;
  const d = createConnectionTestDebounce({ now: () => now, windowMs: 300_000 });
  d.record("conn-b", { valid: false }, true);
  now += 160_000;
  assert.equal(d.lookup("conn-b"), undefined, "failure older than half-window expires");
});

test("4. connections are independent; forceRefresh bypasses", () => {
  const d = createConnectionTestDebounce({ now: () => 0, windowMs: 300_000 });
  d.record("c1", { valid: true }, false);
  assert.equal(d.lookup("c2"), undefined);
  assert.equal(d.lookup("c1", { forceRefresh: true }), undefined);
});

test("5. windowMs=0 disables the debounce entirely", () => {
  const d = createConnectionTestDebounce({ now: () => 0, windowMs: 0 });
  d.record("c3", { valid: true }, false);
  assert.equal(d.lookup("c3"), undefined);
});

test("6. resolveConnectionTestDebounceMs: default 360s, 0 stays off, garbage falls back", () => {
  assert.equal(resolveConnectionTestDebounceMs({} as NodeJS.ProcessEnv), 360_000);
  assert.equal(
    resolveConnectionTestDebounceMs({ OMNIROUTE_TEST_DEBOUNCE_MS: "0" } as NodeJS.ProcessEnv),
    0
  );
  assert.equal(
    resolveConnectionTestDebounceMs({
      OMNIROUTE_TEST_DEBOUNCE_MS: "banana",
    } as NodeJS.ProcessEnv),
    360_000
  );
  assert.equal(
    resolveConnectionTestDebounceMs({
      OMNIROUTE_TEST_DEBOUNCE_MS: "600000",
    } as NodeJS.ProcessEnv),
    600_000
  );
});
