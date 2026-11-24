process.env.TZ = "America/New_York"; // a fixed zone with DST; set before any Date is created
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const {
  KEY_EXPIRY_PRESET_DAYS,
  wholeDaysFromTtlSeconds,
  endOfLocalDayAfterDays,
  alignTtlSecondsToEndOfLocalDay,
} = await import("../../src/shared/utils/keyExpiry.ts");

const local = (y: number, m: number, d: number, h = 0, min = 0, s = 0) =>
  new Date(y, m - 1, d, h, min, s);
const parts = (d: Date) => [
  d.getFullYear(),
  d.getMonth() + 1,
  d.getDate(),
  d.getHours(),
  d.getMinutes(),
  d.getSeconds(),
];
const DAY = 86400;

test("presets are 7, 15 and 30 days", () =>
  assert.deepEqual([...KEY_EXPIRY_PRESET_DAYS], [7, 15, 30]));

test("endOfLocalDayAfterDays: 23:59:00 local on the target day, month rollover included", () => {
  assert.deepEqual(
    parts(endOfLocalDayAfterDays(7, local(2026, 11, 19, 15, 30))),
    [2026, 11, 26, 23, 59, 0]
  );
  assert.deepEqual(
    parts(endOfLocalDayAfterDays(30, local(2026, 1, 31, 9))),
    [2026, 3, 2, 23, 59, 0]
  );
  assert.deepEqual(
    parts(endOfLocalDayAfterDays(0, local(2026, 11, 19))),
    [2026, 11, 19, 23, 59, 0]
  );
});

test("a DST change in between keeps the wall-clock time", () => {
  const now = local(2026, 10, 28, 10); // New York leaves DST on 2026-11-01: 7 calendar days = 7×24h + 1h
  assert.deepEqual(parts(endOfLocalDayAfterDays(7, now)), [2026, 11, 4, 23, 59, 0]);
  assert.equal(alignTtlSecondsToEndOfLocalDay(7 * DAY, now), 658740);
});

test("wholeDaysFromTtlSeconds: only positive whole days", () => {
  const inputs = [DAY, 7 * DAY, 1.5 * DAY, 3600, 0, -DAY, null, undefined, Number.NaN];
  assert.deepEqual(inputs.map(wholeDaysFromTtlSeconds), [
    1,
    7,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
});

test("alignTtlSecondsToEndOfLocalDay: whole days reach 23:59 local; anything else is untouched", () => {
  const now = local(2026, 11, 19, 15, 30, 20);
  assert.equal(alignTtlSecondsToEndOfLocalDay(DAY, now), 116920); // 1 day + 8h28m40s
  assert.equal(alignTtlSecondsToEndOfLocalDay(1800, now), 1800);
  assert.equal(alignTtlSecondsToEndOfLocalDay(36 * 3600, now), 36 * 3600);
  assert.equal(alignTtlSecondsToEndOfLocalDay(DAY, local(2026, 11, 19, 23, 59, 30)), 86370);
  assert.equal(alignTtlSecondsToEndOfLocalDay(3650 * DAY, now), 3650 * DAY); // aligned value would pass the server maximum
  assert.equal(alignTtlSecondsToEndOfLocalDay(DAY * 1e9, now), DAY * 1e9); // aligned value is not a finite number
});

test("alignTtlSecondsToEndOfLocalDay rounds up: a sub-second clock never lands before 23:59:00", () => {
  const now = new Date(local(2026, 11, 19, 15, 30, 20).getTime() + 400);
  const end = endOfLocalDayAfterDays(7, now).getTime();
  const expiresAt = now.getTime() + alignTtlSecondsToEndOfLocalDay(7 * DAY, now) * 1000;
  assert.ok(expiresAt >= end, `expiry ${expiresAt - end} ms from 23:59:00`);
  assert.ok(expiresAt < end + 1000, `expiry ${expiresAt - end} ms from 23:59:00`);
});

test("the validity strings exist in the English catalog", () => {
  const { apiManager } = JSON.parse(
    readFileSync(new URL("../../src/i18n/messages/en.json", import.meta.url), "utf8")
  );
  const keys = [
    "keyExpiryPresetPlusDays",
    "keyExpiryPresetsHint",
    "keyValidity",
    "keyValidityDesc",
    "keyExpiryPresetDays",
    "keyExpiryEndOfDay",
    "keyExpiryEndOfDayDesc",
  ];
  for (const key of keys) assert.equal(typeof apiManager[key], "string", key);
});
