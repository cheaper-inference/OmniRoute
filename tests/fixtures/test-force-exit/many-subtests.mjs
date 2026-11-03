// Shared body for the report-flush fixtures used by
// tests/unit/test-force-exit-report-flush.test.ts. One top-level test with 400 awaited
// subtests, so each test file child writes a large report: 401 tests per file.
import test from "node:test";
import assert from "node:assert/strict";

test("parent with many awaited subtests", async (t) => {
  for (let i = 0; i < 400; i++) {
    await t.test(`subtest ${i} ${"x".repeat(200)}`, () => {
      assert.ok(true, "y".repeat(500));
    });
  }
});
