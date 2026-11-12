import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import {
  checkWebdavRateLimit,
  recordWebdavAuthFailure,
  resetWebdavAuthFailures,
  clearWebdavRateLimits,
  normalizeWebdavClientIp,
  getWebdavClientIp,
  WEBDAV_AUTH_MAX_FAILURES,
  WEBDAV_AUTH_WINDOW_MS,
  WEBDAV_AUTH_LOCKOUT_MS,
} from "../../scripts/dev/webdav-handler.mjs";

test.beforeEach(() => {
  clearWebdavRateLimits();
});

test.after(() => {
  clearWebdavRateLimits();
});

test("normalizeWebdavClientIp strips IPv4-mapped IPv6 prefix and trims whitespace", () => {
  assert.equal(normalizeWebdavClientIp("::ffff:192.168.1.10"), "192.168.1.10");
  assert.equal(normalizeWebdavClientIp("  10.0.0.1  "), "10.0.0.1");
  assert.equal(normalizeWebdavClientIp(null), "unknown");
  assert.equal(normalizeWebdavClientIp(""), "unknown");
});

test("getWebdavClientIp extracts IP from x-forwarded-for, x-real-ip or socket", () => {
  const reqXff = {
    headers: { "x-forwarded-for": "203.0.113.195, 70.41.3.18" },
    socket: { remoteAddress: "127.0.0.1" },
  } as unknown as http.IncomingMessage;
  assert.equal(getWebdavClientIp(reqXff), "203.0.113.195");

  const reqXRealIp = {
    headers: { "x-real-ip": "198.51.100.42" },
    socket: { remoteAddress: "127.0.0.1" },
  } as unknown as http.IncomingMessage;
  assert.equal(getWebdavClientIp(reqXRealIp), "198.51.100.42");

  const reqSocket = {
    headers: {},
    socket: { remoteAddress: "::ffff:192.168.1.50" },
  } as unknown as http.IncomingMessage;
  assert.equal(getWebdavClientIp(reqSocket), "192.168.1.50");
});

test("recordWebdavAuthFailure tracks attempts and triggers lockout at threshold", () => {
  const ip = "192.168.1.100";
  const t0 = 1_000_000;

  // First 9 failures are allowed
  for (let i = 1; i < WEBDAV_AUTH_MAX_FAILURES; i++) {
    const res = recordWebdavAuthFailure(ip, t0 + i * 100);
    assert.equal(res.allowed, true, `attempt ${i} should be allowed`);
    assert.equal(checkWebdavRateLimit(ip, t0 + i * 100).allowed, true);
  }

  // 10th failure triggers lockout
  const tenth = recordWebdavAuthFailure(ip, t0 + 1000);
  assert.equal(tenth.allowed, false, "10th failure must trigger lockout");
  assert.equal(tenth.retryAfter, Math.ceil(WEBDAV_AUTH_LOCKOUT_MS / 1000));

  // Subsequent check is locked
  const lockedCheck = checkWebdavRateLimit(ip, t0 + 2000);
  assert.equal(lockedCheck.allowed, false);
  assert.ok(lockedCheck.retryAfter && lockedCheck.retryAfter > 0);

  // After lockout duration expires, access is restored
  const postLockout = checkWebdavRateLimit(ip, t0 + 1000 + WEBDAV_AUTH_LOCKOUT_MS + 10);
  assert.equal(postLockout.allowed, true, "after lockout expires, requests should be allowed");
});

test("resetWebdavAuthFailures clears tracked failures on successful authentication", () => {
  const ip = "192.168.1.101";
  const t0 = 2_000_000;

  // 5 failures
  for (let i = 0; i < 5; i++) {
    recordWebdavAuthFailure(ip, t0 + i * 100);
  }

  // Reset
  resetWebdavAuthFailures(ip);

  // Now an attempt starts fresh (attempt 1 again, not 6)
  const fresh = recordWebdavAuthFailure(ip, t0 + 1000);
  assert.equal(fresh.allowed, true);
});

test("window expiration resets count if lockout threshold was not reached", () => {
  const ip = "192.168.1.102";
  const t0 = 3_000_000;

  // 5 failures at t0
  for (let i = 0; i < 5; i++) {
    recordWebdavAuthFailure(ip, t0);
  }

  // Advance time past the sliding window
  const pastWindow = t0 + WEBDAV_AUTH_WINDOW_MS + 1000;
  assert.equal(checkWebdavRateLimit(ip, pastWindow).allowed, true);

  // A new failure starts count at 1 instead of reaching 6
  const next = recordWebdavAuthFailure(ip, pastWindow);
  assert.equal(next.allowed, true);
});
