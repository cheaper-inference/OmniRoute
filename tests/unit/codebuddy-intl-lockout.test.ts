// Phase E — dated 429 lockout.
//
// Requirement: a 429 carrying an unlock date must be recognized as an
// authoritative freeze instant, and a 429 without a date must never masquerade
// as one. The FREEZE is applied by the shared resilience path (see
// codebuddy-intl-429-cooldown.test.ts); this module only classifies the response.
import test from "node:test";
import assert from "node:assert/strict";

import { parseCodeBuddyRateLimit } from "../../open-sse/executors/codebuddy-intl/lockout.ts";

const NOW = Date.UTC(2026, 9, 25, 12, 0, 0);
const inMinutes = (m: number) => NOW + m * 60_000;

test("reads an absolute reset date from the provider envelope", () => {
  const resetAt = new Date(inMinutes(30)).toISOString();
  const parsed = parseCodeBuddyRateLimit({
    status: 429,
    body: JSON.stringify({ code: 11129, msg: "rate limited", data: { resetTime: resetAt } }),
    now: NOW,
  });

  assert.equal(parsed.scope, "account");
  assert.equal(parsed.resetAtMs, Date.parse(resetAt));
  assert.equal(parsed.source, "body-date");
  assert.equal(parsed.authoritative, true);
});

test("reads Retry-After seconds and HTTP dates", () => {
  const seconds = parseCodeBuddyRateLimit({
    status: 429,
    headers: { "retry-after": "90" },
    now: NOW,
  });
  assert.equal(seconds.resetAtMs, inMinutes(1.5));
  assert.equal(seconds.source, "retry-after");

  const date = parseCodeBuddyRateLimit({
    status: 429,
    headers: { "retry-after": new Date(inMinutes(10)).toUTCString() },
    now: NOW,
  });
  assert.equal(date.resetAtMs, inMinutes(10));
});

test("an already-expired date is not a freeze", () => {
  const parsed = parseCodeBuddyRateLimit({
    status: 429,
    body: JSON.stringify({ data: { resetTime: new Date(inMinutes(-5)).toISOString() } }),
    now: NOW,
  });
  assert.equal(parsed.authoritative, false);
});

test("a 429 without any date falls back to the non-authoritative path", () => {
  const parsed = parseCodeBuddyRateLimit({
    status: 429,
    body: JSON.stringify({ code: 429, msg: "too many requests" }),
    now: NOW,
  });

  assert.equal(parsed.authoritative, false);
  assert.equal(parsed.resetAtMs, null);
});

test("malformed dates never become a freeze", () => {
  for (const resetTime of ["not-a-date", "", 0, null, {}, []]) {
    const parsed = parseCodeBuddyRateLimit({
      status: 429,
      body: JSON.stringify({ data: { resetTime } }),
      now: NOW,
    });
    assert.equal(parsed.authoritative, false, JSON.stringify(resetTime));
  }
});
