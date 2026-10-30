import assert from "node:assert/strict";
import { test } from "node:test";
import { singleFlight } from "../../../src/app/(dashboard)/dashboard/grok-bot/auth";

test("two refreshes for one connection share one call", async () => {
  const gate = singleFlight();
  let calls = 0;
  const refresh = () =>
    gate.run("conn-1", async () => {
      calls += 1;
      return "token";
    });
  const [first, second] = await Promise.all([refresh(), refresh()]);
  assert.equal(calls, 1);
  assert.deepEqual([first, second], ["token", "token"]);
});

test("a different connection refreshes on its own", async () => {
  const gate = singleFlight();
  let calls = 0;
  const refresh = (id: string) =>
    gate.run(id, async () => {
      calls += 1;
      return id;
    });
  await Promise.all([refresh("conn-1"), refresh("conn-2")]);
  assert.equal(calls, 2);
});

test("a finished refresh is not replayed", async () => {
  const gate = singleFlight();
  let calls = 0;
  const run = () => gate.run("conn-1", async () => { calls += 1; return calls; });
  await run();
  await run();
  assert.equal(calls, 2);
});
