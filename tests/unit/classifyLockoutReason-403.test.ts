import test from "node:test";
import assert from "node:assert/strict";
import { classifyLockoutReason } from "../../open-sse/services/accountFallback.ts";

test("classifyLockoutReason: 403 without errorText returns auth_error", () => {
  assert.equal(classifyLockoutReason(403), "auth_error");
});

test("classifyLockoutReason: 403 with quota signal returns quota_exhausted", () => {
  assert.equal(classifyLockoutReason(403, "You exceeded your daily quota"), "quota_exhausted");
});

test("classifyLockoutReason: 403 with auth signal returns auth_error", () => {
  assert.equal(classifyLockoutReason(403, "Invalid API key"), "auth_error");
  assert.equal(classifyLockoutReason(403, "Model not found"), "auth_error");
});

test("classifyLockoutReason: 429 unchanged returns rate_limit", () => {
  assert.equal(classifyLockoutReason(429), "rate_limit");
  assert.equal(classifyLockoutReason(429, "anything"), "rate_limit");
});

test("classifyLockoutReason: other status unchanged returns unknown", () => {
  assert.equal(classifyLockoutReason(404), "unknown");
  assert.equal(classifyLockoutReason(500), "unknown");
  assert.equal(classifyLockoutReason(401), "unknown");
  assert.equal(classifyLockoutReason(200), "unknown");
});

test("classifyLockoutReason: 403 with empty errorText returns auth_error", () => {
  assert.equal(classifyLockoutReason(403, ""), "auth_error");
});

test("classifyLockoutReason: 403 with null errorText returns auth_error", () => {
  // @ts-expect-error testing null
  assert.equal(classifyLockoutReason(403, null), "auth_error");
});
