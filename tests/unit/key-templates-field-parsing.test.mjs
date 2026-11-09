import test from "node:test";
import assert from "node:assert/strict";
import {
  parseField,
  strictList,
  toFiniteNumber,
} from "../../src/lib/db/keyTemplates/fieldParsing.ts";

const parse = (kind, raw, row = {}, values, fallback) =>
  parseField({ column: "unused", field: "allowedModels", kind, values, fallback }, raw, row);

test("legacy allow-lists preserve explicit deny-all and restrictive model access", () => {
  assert.deepEqual(parse("combos", null), { ok: true, value: ["combo/*"] });
  assert.deepEqual(parse("combos", "[]"), { ok: true, value: [] });
  assert.deepEqual(parse("modelAccessMode", "all", { allowed_models: '["m"]' }), {
    ok: true,
    value: "restricted",
  });
  assert.deepEqual(parse("modelAccessMode", "restricted", { allowed_models: "invalid" }), {
    ok: true,
    value: "restricted",
  });
  assert.deepEqual(strictList('["m",2]', []), { ok: false });
});

test("schedule and rate limits reject unreadable shapes without coercing values", () => {
  const schedule = { enabled: true, from: "00:00", until: "23:59", tz: "UTC", days: [0, 6] };
  assert.deepEqual(parse("schedule", JSON.stringify(schedule)), { ok: true, value: schedule });
  assert.deepEqual(parse("schedule", JSON.stringify({ ...schedule, days: [7] })), { ok: false });
  assert.deepEqual(parse("schedule", "null"), { ok: false });
  assert.deepEqual(parse("rateLimits", '[{"limit":1.5,"window":60}]'), {
    ok: true,
    value: [{ limit: 1.5, window: 60 }],
  });
  assert.deepEqual(parse("rateLimits", '[{"limit":"1","window":60}]'), { ok: false });
  assert.deepEqual(parse("rateLimits", ""), { ok: true, value: null });
});

test("number, null, boolean and enum parsing retains legacy precision and defaults", () => {
  assert.deepEqual(parse("nullableInt", "1.75"), { ok: true, value: 1.75 });
  assert.deepEqual(parse("nullableInt", 9n), { ok: true, value: 9 });
  assert.deepEqual(parse("nullableInt", "NaN"), { ok: false });
  assert.deepEqual(parse("int0", -3), { ok: true, value: 0 });
  assert.deepEqual(parse("nullablePositive", 0), { ok: true, value: null });
  assert.deepEqual(parse("nullablePositive", 0.25), { ok: true, value: 0.25 });
  assert.deepEqual(parse("nullableString", "  x  "), { ok: true, value: "x" });
  assert.deepEqual(parse("boolFalse", 1n), { ok: true, value: true });
  assert.deepEqual(parse("boolTrue", 0n), { ok: true, value: false });
  assert.deepEqual(parse("enum", "unknown", {}, ["known"], "known"), { ok: true, value: "known" });
  assert.equal(toFiniteNumber(7n), 7);
});
