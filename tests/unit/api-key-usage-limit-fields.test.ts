// Usage-limit fields of an API key row: the flag accepts true, 1 and "1" only, the USD limits are
// positive finite numbers or null, a row reads snake_case first and camelCase second, and an update
// appends SQL assignments only for the fields it carries.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  appendUsageLimitUpdates,
  hasUsageLimitUpdate,
  parseApiKeyUsageLimitFields,
  parseNullablePositiveNumber,
  parseUsageLimitEnabled,
} from "../../src/lib/db/apiKeyUsageLimitFields.ts";

test("the usage limit is enabled only by true, 1 or the string 1", () => {
  for (const value of [true, 1, "1"])
    assert.equal(parseUsageLimitEnabled(value), true, String(value));
  for (const value of [false, 0, "0", "true", "", null, undefined, 2]) {
    assert.equal(parseUsageLimitEnabled(value), false, String(value));
  }
});

test("a positive finite number, or a numeric string, is kept", () => {
  assert.equal(parseNullablePositiveNumber(5), 5);
  assert.equal(parseNullablePositiveNumber(0.25), 0.25);
  assert.equal(parseNullablePositiveNumber("12.5"), 12.5);
  assert.equal(parseNullablePositiveNumber(" 3 "), 3);
});

test("zero, negatives, NaN, Infinity, blanks and non-numbers become null", () => {
  for (const value of [0, -1, Number.NaN, Number.POSITIVE_INFINITY, "", "  ", "abc", "-4", "0"]) {
    assert.equal(parseNullablePositiveNumber(value), null, String(value));
  }
  for (const value of [null, undefined, true, {}, []]) {
    assert.equal(parseNullablePositiveNumber(value), null, String(value));
  }
});

test("a row is read from snake_case columns, falling back to the camelCase alias", () => {
  assert.deepEqual(
    parseApiKeyUsageLimitFields({
      usage_limit_enabled: 1,
      daily_usage_limit_usd: "10",
      weekly_usage_limit_usd: 70,
    }),
    { usageLimitEnabled: true, dailyUsageLimitUsd: 10, weeklyUsageLimitUsd: 70 }
  );
  assert.deepEqual(
    parseApiKeyUsageLimitFields({
      usageLimitEnabled: true,
      dailyUsageLimitUsd: 2,
      weeklyUsageLimitUsd: null,
    }),
    { usageLimitEnabled: true, dailyUsageLimitUsd: 2, weeklyUsageLimitUsd: null }
  );
});

test("an update carries a usage-limit change when any of the three fields is defined", () => {
  assert.equal(hasUsageLimitUpdate({}), false);
  assert.equal(hasUsageLimitUpdate({ name: "key" }), false);
  assert.equal(hasUsageLimitUpdate({ usageLimitEnabled: false }), true);
  assert.equal(hasUsageLimitUpdate({ dailyUsageLimitUsd: null }), true);
  assert.equal(hasUsageLimitUpdate({ weeklyUsageLimitUsd: 0 }), true);
});

test("an update appends one assignment and one parameter per field it carries", () => {
  const updates: string[] = [];
  const params: {
    usageLimitEnabled?: number;
    dailyUsageLimitUsd?: number | null;
    weeklyUsageLimitUsd?: number | null;
  } = {};
  appendUsageLimitUpdates(
    { usageLimitEnabled: true, dailyUsageLimitUsd: "7.5", weeklyUsageLimitUsd: -3 },
    updates,
    params
  );
  assert.deepEqual(updates, [
    "usage_limit_enabled = @usageLimitEnabled",
    "daily_usage_limit_usd = @dailyUsageLimitUsd",
    "weekly_usage_limit_usd = @weeklyUsageLimitUsd",
  ]);
  assert.deepEqual(params, {
    usageLimitEnabled: 1,
    dailyUsageLimitUsd: 7.5,
    weeklyUsageLimitUsd: null,
  });
  appendUsageLimitUpdates({ usageLimitEnabled: 1 }, [], params);
  assert.equal(params.usageLimitEnabled, 0, "only the boolean true enables the limit");
});
