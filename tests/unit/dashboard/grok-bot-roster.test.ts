import test from "node:test";
import assert from "node:assert/strict";

const { grokBotRoster, rosterEntries } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/roster.ts");

test("roster keeps named bots and puts a chief of staff first", () => {
  const roster = grokBotRoster({
    agents: [
      { agentId: "b", name: "writer" },
      { agentId: "a", name: "Chief of Staff" },
      { name: "no id" },
      null,
    ],
  });

  assert.deepEqual(
    roster.map((bot) => bot.agentId),
    ["a", "b"]
  );
  assert.equal(roster[0].chiefOfStaff, true);
  assert.equal(roster[1].chiefOfStaff, false);
});

test("roster entries drop a bot that has no name", () => {
  assert.deepEqual(
    rosterEntries([{ agentId: "a", name: "one", chiefOfStaff: true }, { agentId: "b" }]),
    [{ agentId: "a", name: "one", chiefOfStaff: true }]
  );
});
