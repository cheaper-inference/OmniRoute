import test from "node:test";
import assert from "node:assert/strict";

import {
  formatPercentChange,
  percentChange,
  previousWindow,
} from "../../src/app/(dashboard)/home/usageTrend.ts";

const NOW = new Date("2026-11-14T12:00:00.000Z");
const NONE = { start: "", end: "" };

test("previousWindow: fixed ranges end where the current range starts and have the same length", () => {
  for (const [range, days] of [
    ["1d", 1],
    ["7d", 7],
    ["30d", 30],
    ["90d", 90],
  ] as const) {
    const window = previousWindow(range, NONE, NOW);
    assert.ok(window, range);
    const start = new Date(window.startDate).getTime();
    const end = new Date(window.endDate).getTime();
    const currentStart = new Date(NOW);
    currentStart.setDate(currentStart.getDate() - days);
    assert.equal(end, currentStart.getTime(), `${range} end = current start`);
    assert.equal(end - start, NOW.getTime() - currentStart.getTime(), `${range} length`);
  }
});

test("previousWindow: all has no previous window", () => {
  assert.equal(previousWindow("all", NONE, NOW), null);
});

test("previousWindow: custom uses the span right before the chosen one", () => {
  const window = previousWindow(
    "custom",
    { start: "2026-11-05T00:00:00.000Z", end: "2026-11-10T00:00:00.000Z" },
    NOW
  );
  assert.deepEqual(window, {
    startDate: "2026-10-31T00:00:00.000Z",
    endDate: "2026-11-05T00:00:00.000Z",
  });
});

test("previousWindow: empty, invalid or reversed custom ranges have no window", () => {
  assert.equal(previousWindow("custom", NONE, NOW), null);
  assert.equal(previousWindow("custom", { start: "nope", end: "2026-11-10" }, NOW), null);
  assert.equal(
    previousWindow("custom", { start: "2026-11-10T00:00:00Z", end: "2026-11-05T00:00:00Z" }, NOW),
    null
  );
  assert.equal(
    previousWindow("custom", { start: "2026-11-10T00:00:00Z", end: "2026-11-10T00:00:00Z" }, NOW),
    null
  );
});

test("previousWindow: ytd compares against an equally long span before January 1st", () => {
  const window = previousWindow("ytd", NONE, NOW);
  assert.ok(window);
  const length = new Date(window.endDate).getTime() - new Date(window.startDate).getTime();
  const jan1 = new Date(NOW);
  jan1.setMonth(0, 1);
  jan1.setHours(0, 0, 0, 0);
  assert.equal(window.endDate, jan1.toISOString());
  assert.equal(length, NOW.getTime() - jan1.getTime());
});

test("percentChange: boundaries around a zero or missing baseline", () => {
  assert.equal(percentChange(10, 0), null);
  assert.equal(percentChange(10, -5), null);
  assert.equal(percentChange(0, 0), null);
  assert.equal(percentChange(Number.NaN, 5), null);
  assert.equal(percentChange(5, Number.POSITIVE_INFINITY), null);
  assert.equal(percentChange(110, 100), 10);
  assert.equal(percentChange(50, 100), -50);
  assert.equal(percentChange(100, 100), 0);
  assert.equal(percentChange(0, 100), -100);
});

test("formatPercentChange: sign, precision and the 0% case", () => {
  assert.equal(formatPercentChange(12.4), "+12%");
  assert.equal(formatPercentChange(-12.6), "-13%");
  assert.equal(formatPercentChange(9.99), "+10.0%");
  assert.equal(formatPercentChange(3.14), "+3.1%");
  assert.equal(formatPercentChange(-0.54), "-0.5%");
  assert.equal(formatPercentChange(0), "0%");
  assert.equal(formatPercentChange(0.04), "0%");
  assert.equal(formatPercentChange(-0.04), "0%");
  assert.equal(formatPercentChange(250), "+250%");
});

test("previousWindow: fixed ranges follow calendar days across a daylight saving change", () => {
  const original = process.env.TZ;
  process.env.TZ = "Europe/Madrid";
  try {
    const now = new Date("2026-03-29T12:00:00+02:00");
    const window = previousWindow("1d", NONE, now);
    assert.ok(window);
    const currentStart = new Date(now);
    currentStart.setDate(currentStart.getDate() - 1);
    assert.equal(window.endDate, currentStart.toISOString());
  } finally {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  }
});
