import assert from "node:assert/strict";
import { test } from "node:test";
import { sendOnce } from "../../../src/app/(dashboard)/dashboard/grok-bot/transcript";

test("a failed send is not tried again", async () => {
  const calls: string[] = [];
  const result = await sendOnce("hello", async () => {
    calls.push("sent");
    return "failed";
  });
  assert.deepEqual(calls, ["sent"]);
  assert.equal(result, "unknown");
});

test("a send that lands stays recorded", async () => {
  assert.equal(
    await sendOnce("hello", async () => "ok"),
    "recorded"
  );
});
