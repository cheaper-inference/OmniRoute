// KEA-9522: the request log (Usage > Requests) and the proxy log showed only HH:MM:SS, so rows
// from different days looked identical over a 90-day range. formatLogTimestamp keeps the bare
// time for today and adds the date (and the year when it differs) for older rows.
import test from "node:test";
import assert from "node:assert/strict";

// Pin the time zone so "same calendar day" does not depend on the machine. New York is not UTC,
// which lets the tests prove the comparison uses the local day, not the UTC day.
process.env.TZ = "America/New_York";

const { formatLogTimestamp, formatLogTimestampTitle, formatTime } =
  await import("../../src/shared/utils/formatting.ts");

// 2026-11-24 10:00:00 local (15:00Z).
const NOW = new Date(2026, 10, 24, 10, 0, 0);

test("same local day keeps the bare 24-hour time", () => {
  const value = new Date(2026, 10, 24, 7, 43, 42).toISOString();
  assert.equal(formatLogTimestamp(value, NOW), "07:43:42");
  assert.equal(formatLogTimestamp(value, NOW), formatTime(value));
});

test("just after local midnight is still today", () => {
  const value = new Date(2026, 10, 24, 0, 30, 5).toISOString();
  assert.equal(formatLogTimestamp(value, NOW), "00:30:05");
});

test("yesterday late evening shows the date even though the UTC date matches today", () => {
  // 23:30 local on Nov 23 is 04:30Z on Nov 24, the same UTC date as NOW.
  const value = new Date(2026, 10, 23, 23, 30, 0).toISOString();
  assert.equal(value.slice(0, 10), "2026-11-24");
  assert.equal(formatLogTimestamp(value, NOW), "Nov 23, 23:30:00");
});

test("another day of the same year shows month, day and time", () => {
  const value = new Date(2026, 10, 21, 7, 43, 42).toISOString();
  const out = formatLogTimestamp(value, NOW);
  assert.equal(out, "Nov 21, 07:43:42");
  assert.doesNotMatch(out, /2026/);
});

test("another year also shows the year", () => {
  const value = new Date(2025, 10, 21, 7, 43, 42).toISOString();
  assert.equal(formatLogTimestamp(value, NOW), "Nov 21, 2025, 07:43:42");
});

test("accepts epoch milliseconds and Date values", () => {
  const date = new Date(2026, 10, 21, 7, 43, 42);
  assert.equal(formatLogTimestamp(date.getTime(), NOW), "Nov 21, 07:43:42");
  assert.equal(formatLogTimestamp(date, NOW), "Nov 21, 07:43:42");
});

test("uses the given dashboard locale", () => {
  const value = new Date(2026, 10, 21, 7, 43, 42).toISOString();
  const out = formatLogTimestamp(value, NOW, "pt-BR");
  assert.notEqual(out, "Nov 21, 07:43:42");
  assert.match(out, /21/);
  assert.match(out, /nov/i);
  assert.match(out, /07:43:42/);
});

test("an unusable locale falls back to en-US", () => {
  const value = new Date(2026, 10, 21, 7, 43, 42).toISOString();
  assert.equal(formatLogTimestamp(value, NOW, "not a locale!!"), "Nov 21, 07:43:42");
});

test("invalid input keeps the formatTime behaviour", () => {
  for (const value of [null, undefined, ""]) {
    assert.equal(formatLogTimestamp(value, NOW), "-");
  }
  assert.equal(formatLogTimestamp("not-a-date", NOW), formatTime("not-a-date"));
});

test("formatTime itself stays time-only for its other callers", () => {
  const value = new Date(2025, 10, 21, 7, 43, 42).toISOString();
  assert.equal(formatTime(value), "07:43:42");
});

test("the hover title carries the full date, time and year", () => {
  const value = new Date(2026, 10, 24, 7, 43, 42).toISOString();
  const title = formatLogTimestampTitle(value);
  assert.ok(title);
  assert.match(title, /Nov/);
  assert.match(title, /24/);
  assert.match(title, /2026/);
  assert.match(title, /07:43:42/);
  assert.equal(formatLogTimestampTitle(null), undefined);
  assert.equal(formatLogTimestampTitle("not-a-date"), undefined);
});
