import test, { describe } from "node:test";
import assert from "node:assert/strict";

import { describeExpiry } from "../../src/app/quota/[provider]/lib/quotaFormat.ts";

const NOW = "2026-05-27T15:30:00.000Z";
const H = 60 * 60_000;
const D = 24 * H;
const at = (ms: number) => new Date(Date.parse(NOW) + ms).toISOString();

describe("describeExpiry", () => {
  test("a missing or unreadable expiry means the key does not expire", () => {
    assert.deepEqual(describeExpiry(null, NOW), { kind: "none" });
    assert.deepEqual(describeExpiry("garbage", NOW), { kind: "none" });
  });

  test("less than an hour left, or already past, reads as soon", () => {
    assert.deepEqual(describeExpiry(at(30 * 60_000), NOW), { kind: "soon" });
    assert.deepEqual(describeExpiry(at(-5 * 60_000), NOW), { kind: "soon" });
  });

  test("under a day counts whole hours", () => {
    assert.deepEqual(describeExpiry(at(90 * 60_000), NOW), { kind: "hours", hours: 1 });
    assert.deepEqual(describeExpiry(at(24 * H - 1), NOW), { kind: "hours", hours: 23 });
  });

  test("a day or more counts whole days with a tone by urgency", () => {
    assert.deepEqual(describeExpiry(at(24 * H), NOW), { kind: "days", days: 1, tone: "error" });
    assert.deepEqual(describeExpiry(at(3 * D + 23 * H), NOW), {
      kind: "days",
      days: 3,
      tone: "error",
    });
    assert.deepEqual(describeExpiry(at(4 * D), NOW), { kind: "days", days: 4, tone: "warning" });
    assert.deepEqual(describeExpiry(at(14 * D), NOW), { kind: "days", days: 14, tone: "warning" });
    assert.deepEqual(describeExpiry(at(15 * D), NOW), { kind: "days", days: 15, tone: "success" });
  });

  test("the reference clock is the given instant, not the browser clock", () => {
    const later = new Date(Date.parse(NOW) + 10 * D).toISOString();
    assert.deepEqual(describeExpiry(at(11 * D), later), { kind: "days", days: 1, tone: "error" });
  });
});
