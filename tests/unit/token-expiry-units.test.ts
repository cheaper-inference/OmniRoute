import test from "node:test";
import assert from "node:assert/strict";

import { isTokenExpiringSoon } from "../../open-sse/handlers/chatCore/tokenExpiry.ts";

const HOUR_MS = 60 * 60 * 1000;

test("an epoch in seconds an hour ahead is not expiring soon", () => {
  assert.equal(isTokenExpiringSoon(Math.floor((Date.now() + HOUR_MS) / 1000)), false);
});

test("an epoch in seconds one minute ahead is expiring soon", () => {
  assert.equal(isTokenExpiringSoon(Math.floor((Date.now() + 60_000) / 1000)), true);
});

test("a numeric string in milliseconds is read as a time, not as an invalid date", () => {
  assert.equal(isTokenExpiringSoon(String(Date.now() - 1000)), true);
  assert.equal(isTokenExpiringSoon(String(Date.now() + HOUR_MS)), false);
});

test("a numeric string in seconds is read like a number in seconds", () => {
  assert.equal(isTokenExpiringSoon(String(Math.floor((Date.now() + HOUR_MS) / 1000))), false);
});

test("ISO strings, Date objects and milliseconds keep working", () => {
  assert.equal(isTokenExpiringSoon(new Date(Date.now() + HOUR_MS).toISOString()), false);
  assert.equal(isTokenExpiringSoon(new Date(Date.now() + 60_000)), true);
  assert.equal(isTokenExpiringSoon(Date.now() + HOUR_MS), false);
  assert.equal(isTokenExpiringSoon(Date.now() + 60_000), true);
});

test("a missing or unreadable value is never reported as expiring", () => {
  assert.equal(isTokenExpiringSoon(null), false);
  assert.equal(isTokenExpiringSoon(undefined), false);
  assert.equal(isTokenExpiringSoon("not a date"), false);
});
