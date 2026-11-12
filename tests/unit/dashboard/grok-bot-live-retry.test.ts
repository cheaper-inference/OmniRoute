import assert from "node:assert/strict";
import { test } from "node:test";
import { liveRetry } from "../../../src/app/(dashboard)/dashboard/grok-bot/transcript";

test("a live stream that fails keeps its cursor", () => {
  assert.deepEqual(liveRetry("40", 0), { phase: "live", after: "40", wait: 500 });
});

test("the wait grows and stays capped", () => {
  assert.equal(liveRetry("40", 1).wait, 1000);
  assert.equal(liveRetry("40", 20).wait, 30000);
});
