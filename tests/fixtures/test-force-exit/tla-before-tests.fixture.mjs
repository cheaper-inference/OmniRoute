// Fixture for tests/unit/test-force-exit-report-flush.test.ts: the supported shape for a
// file that needs a top-level await. The await comes before the first test(), so all three
// tests are registered before any of them can finish, and --test-force-exit runs all 3.
import test from "node:test";
import assert from "node:assert/strict";

const value = await new Promise((resolve) => setTimeout(() => resolve(42), 200));

test("first", () => assert.equal(value, 42));
test("second", () => assert.equal(value, 42));
test("third", () => assert.equal(value, 42));
