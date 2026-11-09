/**
 * Pure guards used by the Live WS heartbeat re-check. A07/A08 survivors in the
 * cross-review: without these, an in-flight re-check could close a replaced
 * client, or overlapping heartbeats could stack authorizeConnection calls.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { beginClientRevalidation, shouldCloseClientAfterRevalidation } =
  await import("../../src/server/ws/liveServer.ts");

test("beginClientRevalidation refuses a second in-flight check", () => {
  const client = { revalidating: false };
  assert.equal(beginClientRevalidation(client), true);
  assert.equal(client.revalidating, true);
  assert.equal(beginClientRevalidation(client), false);
  assert.equal(client.revalidating, true);
  client.revalidating = false;
  assert.equal(beginClientRevalidation(client), true);
});

test("shouldCloseClientAfterRevalidation skips authorized and replaced clients", () => {
  const client = { id: "old" };
  const replacement = { id: "new" };
  const map = new Map<string, object>([["c1", client]]);

  assert.equal(shouldCloseClientAfterRevalidation(true, "c1", client, map), false);
  assert.equal(shouldCloseClientAfterRevalidation(false, "c1", client, map), true);

  map.delete("c1");
  assert.equal(
    shouldCloseClientAfterRevalidation(false, "c1", client, map),
    false,
    "deleted while in flight must not close"
  );

  map.set("c1", replacement);
  assert.equal(
    shouldCloseClientAfterRevalidation(false, "c1", client, map),
    false,
    "replaced while in flight must not close the old socket"
  );
  assert.equal(shouldCloseClientAfterRevalidation(false, "c1", replacement, map), true);
});
