import assert from "node:assert/strict";
import { test } from "node:test";
import { grokBotComputers } from "../../../src/app/(dashboard)/dashboard/grok-bot/computers";

test("a computer list keeps the machine id", () => {
  assert.deepEqual(
    grokBotComputers({ computers: [{ machineId: "m-1", hello: "desk", lastSeenAtMs: "5" }] }),
    [{ machineId: "m-1", label: "" }]
  );
});

test("an entry without a machine id is dropped", () => {
  assert.deepEqual(grokBotComputers({ computers: [{ hello: "desk" }, { machineId: "m-2" }] }), [
    { machineId: "m-2", label: "" },
  ]);
});

test("an empty machine id is dropped", () => {
  assert.deepEqual(grokBotComputers({ computers: [{ machineId: "" }, { machineId: "m-3" }] }), [
    { machineId: "m-3", label: "" },
  ]);
});

test("a response that is not a list is empty", () => {
  assert.deepEqual(grokBotComputers({}), []);
});

test("the machine label the client shows is kept", () => {
  assert.deepEqual(
    grokBotComputers({
      computers: [
        { machineId: "0d533c1e-4c2c-45e4-a7b3-42bb0d2b640b", hello: { label: "houminxi" } },
      ],
    }),
    [{ machineId: "0d533c1e-4c2c-45e4-a7b3-42bb0d2b640b", label: "houminxi" }]
  );
});
