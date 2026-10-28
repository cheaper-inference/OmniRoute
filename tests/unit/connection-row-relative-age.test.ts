/**
 * Unit coverage for the relative age helper shared by the connection row.
 *
 * The row already renders the age of the last catalog sync as a relative time
 * ("2 hours ago"). The discovery state label reuses the same wording, so the
 * helper must produce exactly the same strings — the sync age is the reference
 * output, not a second implementation.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { formatRelativeAge } from "../../src/app/(dashboard)/dashboard/providers/[id]/components/connectionRowHelpers.ts";

const NOW = Date.parse("2026-03-10T12:00:00.000Z");
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

test("a few minutes old reads as minutes", () => {
  assert.equal(formatRelativeAge(NOW - 5 * MINUTE, NOW, "en"), "5 minutes ago");
  assert.equal(formatRelativeAge(NOW - 30 * MINUTE, NOW, "en"), "30 minutes ago");
});

test("a few hours old reads as hours", () => {
  assert.equal(formatRelativeAge(NOW - 2 * HOUR, NOW, "en"), "2 hours ago");
  assert.equal(formatRelativeAge(NOW - 59 * MINUTE, NOW, "en"), "59 minutes ago");
  assert.equal(formatRelativeAge(NOW - 60 * MINUTE, NOW, "en"), "1 hour ago");
});

test("more than a day old reads as days", () => {
  assert.equal(formatRelativeAge(NOW - 3 * DAY, NOW, "en"), "3 days ago");
  assert.equal(formatRelativeAge(NOW - 23 * HOUR, NOW, "en"), "23 hours ago");
  assert.equal(formatRelativeAge(NOW - 24 * HOUR, NOW, "en"), "yesterday");
});

test("the wording follows the locale", () => {
  assert.equal(formatRelativeAge(NOW - 2 * HOUR, NOW, "fr"), "il y a 2 heures");
  assert.equal(formatRelativeAge(NOW - 3 * DAY, NOW, "fr"), "il y a 3 jours");
  assert.equal(formatRelativeAge(NOW - 5 * MINUTE, NOW, "fr"), "il y a 5 minutes");
});

test("a timestamp in the future reads as the current minute, never negative", () => {
  assert.equal(formatRelativeAge(NOW + 10 * MINUTE, NOW, "en"), "this minute");
});

test("an unreadable timestamp or clock reads as unknown", () => {
  assert.equal(formatRelativeAge(Number.NaN, NOW, "en"), null);
  assert.equal(formatRelativeAge(0, NOW, "en"), null);
  assert.equal(formatRelativeAge(NOW - HOUR, Number.NaN, "en"), null);
});
