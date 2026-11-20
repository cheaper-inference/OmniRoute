import test from "node:test";
import assert from "node:assert/strict";
// @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
import { reportStaleEntries, assertNoStale } from "../../../scripts/check/lib/allowlist.mjs";

test("reportStaleEntries: allowlist entry no longer violated => stale", () => {
  const stale = reportStaleEntries(["/api/dead", "/api/live"], ["/api/live"], "fetch-targets");
  assert.deepEqual(stale, ["/api/dead"]);
});

test("reportStaleEntries: all entries still violated => empty", () => {
  assert.deepEqual(reportStaleEntries(["a", "b"], ["a", "b"], "x"), []);
});

test("reportStaleEntries: Set as liveViolations works the same as array", () => {
  const live = new Set(["/api/live"]);
  const stale = reportStaleEntries(["/api/dead", "/api/live"], live, "fetch-targets");
  assert.deepEqual(stale, ["/api/dead"]);
});

test("reportStaleEntries: empty allowlist => always empty", () => {
  assert.deepEqual(reportStaleEntries([], ["/api/anything"], "x"), []);
});

test("assertNoStale: sets process.exitCode=1 when there are stale entries", () => {
  const original = process.exitCode;
  process.exitCode = 0;
  const stale = assertNoStale(["/api/dead", "/api/live"], ["/api/live"], "fetch-targets");
  assert.equal(process.exitCode, 1);
  assert.deepEqual(stale, ["/api/dead"]);
  process.exitCode = original;
});

test("assertNoStale: DOES NOT set process.exitCode when there is no stale", () => {
  const original = process.exitCode;
  process.exitCode = 0;
  const stale = assertNoStale(["a", "b"], ["a", "b"], "x");
  assert.equal(process.exitCode, 0);
  assert.deepEqual(stale, []);
  process.exitCode = original;
});
