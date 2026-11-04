/**
 *  — selection-loop escape for zero-dispatch stalls.
 *
 * Production evidence: 20× 504 "Combo global timeout 240000ms (0 attempted)"
 * when all pool candidates were walled/cooling simultaneously. User 陶刚
 * waited 240s×17 times. The fix bails after 3 consecutive zero-dispatch
 * set-tries with a fast 503 instead of burning the global budget.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  createZeroDispatchState, shouldEscapeZeroDispatch, buildZeroDispatchResponse,
} = await import("../../open-sse/services/combo/comboSkipEscape.ts");

test(" consecutive zero-dispatch set-tries trigger escape", () => {
  const s = createZeroDispatchState();
  assert.equal(shouldEscapeZeroDispatch(s, 0), false, "try 1: not yet");
  assert.equal(shouldEscapeZeroDispatch(s, 0), false, "try 2: not yet");
  assert.equal(shouldEscapeZeroDispatch(s, 0), true,  "try 3: escape!");
});

test(" a successful dispatch resets the counter", () => {
  const s = createZeroDispatchState();
  shouldEscapeZeroDispatch(s, 0); // 1st zero
  shouldEscapeZeroDispatch(s, 0); // 2nd zero
  shouldEscapeZeroDispatch(s, 1); // dispatched! reset
  assert.equal(shouldEscapeZeroDispatch(s, 0), false, "back to 1st zero after reset");
  assert.equal(shouldEscapeZeroDispatch(s, 0), false, "2nd zero");
  assert.equal(shouldEscapeZeroDispatch(s, 0), true,  "3rd zero: escape");
});

test(" response includes combo name, skip reasons, and reset hint", () => {
  const r = buildZeroDispatchResponse("max", ["quota_exhausted", "cooldown", "saturated"], Date.now() + 300_000);
  assert.equal(r.status, 503);
  assert.equal(r.code, "POOL_ALL_SKIPPED");
  assert.ok(r.body.includes("max"), "combo name");
  assert.ok(r.body.includes("quota_exhausted"), "skip reason");
  assert.ok(r.body.includes("Pool earliest recovery"), "reset hint");
});

test(" response handles empty skip reasons and no reset time", () => {
  const r = buildZeroDispatchResponse("pro", [], null);
  assert.ok(r.body.includes("All candidates skipped"));
  assert.ok(!r.body.includes("earliest recovery"), "no reset hint when null");
});
