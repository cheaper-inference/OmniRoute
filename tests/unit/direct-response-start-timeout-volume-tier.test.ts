// Regression guard for large-context requests cut by the flat direct
// response-start window.
//
// Root cause: resolveFlatDirectHeadersFloorMs resolves the response-start
// budget with awareness of reasoning effort and local/LAN targets, but NOT of
// request payload size. Prefill scales with input size: a multi-hundred-KB
// context legitimately sits silent well past the 30s default before the first
// byte, with no reasoning selector in the body for the existing ceiling to
// key on. The fetch-layer guard then cut healthy slow-prefill upstreams at
// exactly the floor and surfaced 504s the stream-readiness layer would have
// permitted.
//
// The fix: raise the flat floor by payload tier — ≤512KB unchanged (a small
// body overrunning the probe still smells like a dead connection), >512KB ×2,
// >2MB ×3, capped at 180s and never lowering an already-higher floor
// (operator override or local/LAN). OMNIROUTE_DIRECT_HEADERS_VOLUME_ADAPTIVE=0
// pins the old flat behavior.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  directHeadersTimeoutResolver,
  resolveDirectHeadersTimeoutMs,
} from "../../open-sse/utils/directResponseStartTimeout.ts";

const TIER1_BYTES = 512 * 1024;
const TIER2_BYTES = 2 * 1024 * 1024;

function bodyOf(approxBytes: number): string {
  return "x".repeat(approxBytes);
}

const NO_OVERRIDES: Record<string, string | undefined> = {};

test("1. small bodies keep the flat 30s floor (dead-connection detection intact)", () => {
  assert.equal(resolveDirectHeadersTimeoutMs(NO_OVERRIDES, bodyOf(64 * 1024)), 30_000);
  assert.equal(resolveDirectHeadersTimeoutMs(NO_OVERRIDES, bodyOf(TIER1_BYTES)), 30_000);
});

test("2. >512KB doubles the floor", () => {
  assert.equal(resolveDirectHeadersTimeoutMs(NO_OVERRIDES, bodyOf(TIER1_BYTES + 1)), 60_000);
});

test("3. >2MB triples the floor", () => {
  assert.equal(resolveDirectHeadersTimeoutMs(NO_OVERRIDES, bodyOf(TIER2_BYTES + 1)), 90_000);
});

test("4. tier raise is capped at the 180s volume ceiling", () => {
  const env = { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "90000" };
  // 90s floor × 3 = 270s, but the ceiling clamps to 180s (which is still a raise).
  assert.equal(resolveDirectHeadersTimeoutMs(env, bodyOf(TIER2_BYTES + 1)), 180_000);
});

test("5. the tier never lowers an already-higher floor (raise-only semantics)", () => {
  const env = { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "240000" };
  // 240s override × 3 would clamp to 180s — the override must win.
  assert.equal(resolveDirectHeadersTimeoutMs(env, bodyOf(TIER2_BYTES + 1)), 240_000);
});

test("6. OMNIROUTE_DIRECT_HEADERS_VOLUME_ADAPTIVE=0 pins the flat behavior", () => {
  const env = { OMNIROUTE_DIRECT_HEADERS_VOLUME_ADAPTIVE: "0" };
  assert.equal(resolveDirectHeadersTimeoutMs(env, bodyOf(TIER2_BYTES + 1)), 30_000);
  const envOff = { OMNIROUTE_DIRECT_HEADERS_VOLUME_ADAPTIVE: "off" };
  assert.equal(resolveDirectHeadersTimeoutMs(envOff, bodyOf(TIER2_BYTES + 1)), 30_000);
});

test("7. resolver binds the body once per request (attempt 0 window follows the tier)", () => {
  const resolve = directHeadersTimeoutResolver({ body: bodyOf(TIER1_BYTES + 1) });
  assert.equal(resolve(0), 60_000);
});
