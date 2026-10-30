import assert from "node:assert/strict";
import { test } from "node:test";
import { toggleFanout, fanoutTargets } from "../../../src/app/(dashboard)/dashboard/grok-bot/fanout";

test("the bot with the same name is addressed on every account", () => {
  const targets = fanoutTargets(
    [
      { account: "a", bots: [{ agentId: "a-1", name: "Chief of Staff" }, { agentId: "a-2", name: "Researcher" }] },
      { account: "b", bots: [{ agentId: "b-1", name: "Researcher" }, { agentId: "b-2", name: "Chief of Staff" }] },
    ],
    "Chief of Staff"
  );
  assert.deepEqual(targets, [
    { account: "a", agentId: "a-1" },
    { account: "b", agentId: "b-2" },
  ]);
});

test("an account without that bot is left out rather than retargeted", () => {
  const targets = fanoutTargets(
    [{ account: "a", bots: [{ agentId: "a-1", name: "Researcher" }] }],
    "Chief of Staff"
  );
  assert.deepEqual(targets, []);
});

test("an account with no bots is left out", () => {
  const targets = fanoutTargets([{ account: "a", bots: [] }], "Chief of Staff");
  assert.deepEqual(targets, []);
});

test("with no bot named on screen nothing is addressed at all", () => {
  // Picking bots[0] here would hand a private message to whichever agent sorts
  // first, which is systematically the chief of staff.
  const targets = fanoutTargets(
    [{ account: "a", bots: [{ agentId: "a-1", name: "Researcher" }, { agentId: "a-2", name: "Writer" }] }],
    ""
  );
  assert.deepEqual(targets, []);
});

test("the protected mailbox cannot be ticked and eight is the ceiling", () => {
  const eight = ["1", "2", "3", "4", "5", "6", "7", "8"];
  assert.deepEqual(toggleFanout(eight, "9", true), eight);
  assert.deepEqual(toggleFanout([], "connection-id", true, "MichaelNoble5072@outlook.com"), []);
  assert.deepEqual(toggleFanout([], "connection-id", true, ""), []);
  assert.deepEqual(toggleFanout([], "connection-id", true, "   "), []);
  assert.deepEqual(toggleFanout([], "connection-id", true, "Michael\u200bNoble5072"), []);
  assert.deepEqual(toggleFanout([], "connection-id", true, "Michael.Noble5072@outlook.com"), []);
  assert.deepEqual(toggleFanout([], "connection-id", true, "\uff4dichael.noble5072@outlook.com"), []);
  assert.deepEqual(toggleFanout(["1", "2"], "2", false), ["1"]);
});

test("a bot without an id is not addressed", () => {
  const targets = fanoutTargets([{ account: "a", bots: [{ agentId: "", name: "Researcher" }] }], "");
  assert.deepEqual(targets, []);
});
