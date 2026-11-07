import test from "node:test";
import assert from "node:assert/strict";

const { permissionAnswer, permissionSummary } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/permission.ts");

test("the four answers become the integer enum the service accepts", () => {
  // Measured: the service answers 400 to both "ALLOW_ONCE" and "allow_once" and
  // 200 {dispatched:true} only to the number.
  assert.equal(
    permissionAnswer({ agentId: "a", entryId: "e", requestId: "r", resolution: "allow_once" })
      ?.resolution,
    1
  );
  assert.equal(
    permissionAnswer({ agentId: "a", entryId: "e", requestId: "r", resolution: "always" })
      ?.resolution,
    3
  );
  assert.equal(
    permissionAnswer({ agentId: "a", entryId: "e", requestId: "r", resolution: "never" })
      ?.resolution,
    4
  );
  assert.equal(
    permissionAnswer({ agentId: "a", entryId: "e", requestId: "r", resolution: "deny" })
      ?.resolution,
    2
  );
});

test("an unknown answer or a missing identifier is refused here, not upstream", () => {
  assert.equal(
    permissionAnswer({ agentId: "a", entryId: "e", requestId: "r", resolution: "yes" }),
    null
  );
  assert.equal(
    permissionAnswer({ agentId: "a", entryId: "e", requestId: "r", resolution: "" }),
    null
  );
  assert.equal(
    permissionAnswer({ agentId: "", entryId: "e", requestId: "r", resolution: "deny" }),
    null
  );
  assert.equal(
    permissionAnswer({ agentId: "a", entryId: "e", requestId: "", resolution: "deny" }),
    null
  );
});

test("the card shows what the bot wants to touch, verbatim", () => {
  assert.equal(
    permissionSummary({
      action: "run-command",
      target: "/home/houminxi/Downloads",
      machineId: "0d533c1e-4c2c-45e4-a7b3-42bb0d2b640b",
      machineLabel: "houminxi",
    }),
    "run-command /home/houminxi/Downloads houminxi"
  );
  assert.equal(
    permissionSummary({ action: "run-command", target: "", machineId: "" }),
    "run-command"
  );
});

test("connector and widget replies use the fields their service methods declare", async () => {
  const { connectorGrant, widgetReply } =
    await import("../../../src/app/(dashboard)/dashboard/grok-bot/cards.ts");
  assert.deepEqual(
    connectorGrant({ agentId: "a", entryId: "e", requestId: "r", resolution: "allowed" }),
    {
      agentId: "a",
      entryId: "e",
      requestId: "r",
      resolution: 1,
      sessionId: "",
    }
  );
  assert.equal(
    connectorGrant({ agentId: "a", entryId: "e", requestId: "r", resolution: "yes" }),
    null
  );
  assert.deepEqual(widgetReply({ agentId: "a", entryId: "e", value: "A" }), {
    agentId: "a",
    entryId: "e",
    value: "A",
    sessionId: "",
  });
  assert.equal(widgetReply({ agentId: "", entryId: "e", value: "A" }), null);
});
