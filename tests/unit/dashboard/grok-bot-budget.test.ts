import assert from "node:assert/strict";
import { test } from "node:test";
import { snapshotBudget } from "../../../src/app/(dashboard)/dashboard/grok-bot/transcript";

const LIMIT = { bytes: 1000, millis: 5000 };

test("a snapshot past the byte limit is too large", () => {
  assert.equal(snapshotBudget({ bytes: 1001, elapsed: 10 }, LIMIT), "too_large");
});

test("a snapshot past the time limit timed out", () => {
  assert.equal(snapshotBudget({ bytes: 10, elapsed: 5001 }, LIMIT), "timeout");
});

test("a snapshot inside both limits continues", () => {
  assert.equal(snapshotBudget({ bytes: 1000, elapsed: 5000 }, LIMIT), "ok");
});
