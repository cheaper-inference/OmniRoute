// The request-count-by-provider-date table sorts its rows with a pure helper: string columns compare
// with localeCompare, numeric columns compare as numbers, both ascending or descending, and the input
// array is never reordered in place.
import { test } from "node:test";
import assert from "node:assert/strict";

import { sortProviderDailyUsageRows } from "../../src/shared/components/analytics/requestCountSort.ts";

const rows = [
  { provider: "openai", date: "2026-10-02", requests: 20 },
  { provider: "anthropic", date: "2026-10-03", requests: 5 },
  { provider: "gemini", date: "2026-10-01", requests: 100 },
] as never[];
const names = (list: unknown[]) => (list as Array<{ provider: string }>).map((row) => row.provider);

test("a string column sorts with localeCompare, ascending and descending", () => {
  assert.deepEqual(names(sortProviderDailyUsageRows(rows, "provider" as never, "asc")), [
    "anthropic",
    "gemini",
    "openai",
  ]);
  assert.deepEqual(names(sortProviderDailyUsageRows(rows, "provider" as never, "desc")), [
    "openai",
    "gemini",
    "anthropic",
  ]);
});

test("a date column sorts as text", () => {
  assert.deepEqual(names(sortProviderDailyUsageRows(rows, "date" as never, "asc")), [
    "gemini",
    "openai",
    "anthropic",
  ]);
});

test("a numeric column sorts as numbers, so 100 comes after 20", () => {
  assert.deepEqual(names(sortProviderDailyUsageRows(rows, "requests" as never, "asc")), [
    "anthropic",
    "openai",
    "gemini",
  ]);
  assert.deepEqual(names(sortProviderDailyUsageRows(rows, "requests" as never, "desc")), [
    "gemini",
    "openai",
    "anthropic",
  ]);
});

test("the input array keeps its order and a new array is returned", () => {
  const before = names(rows);
  const sorted = sortProviderDailyUsageRows(rows, "requests" as never, "asc");
  assert.notEqual(sorted, rows);
  assert.deepEqual(names(rows), before);
});

test("an empty list stays empty", () => {
  assert.deepEqual(sortProviderDailyUsageRows([], "requests" as never, "asc"), []);
});
