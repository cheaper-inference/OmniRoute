import assert from "node:assert/strict";
import { test } from "node:test";
import { bufferPressure } from "../../../src/app/(dashboard)/dashboard/grok-bot/pressure";

test("a buffer over the high mark pauses the upstream read", () => {
  assert.equal(bufferPressure(1001, { high: 1000, stall: 5000 }, 0), "pause");
});

test("a buffer that stays high past the stall limit aborts", () => {
  assert.equal(bufferPressure(1001, { high: 1000, stall: 5000 }, 5001), "abort");
});

test("a buffer under the high mark keeps reading", () => {
  assert.equal(bufferPressure(1000, { high: 1000, stall: 5000 }, 9000), "read");
});
