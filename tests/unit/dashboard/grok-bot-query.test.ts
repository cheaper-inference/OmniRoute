import test from "node:test";
import assert from "node:assert/strict";

const { grokBotReadQuery } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/query.ts");

test("roster query lists agents and nothing else", () => {
  assert.deepEqual(grokBotReadQuery({}), {
    method: "ListGrokBotAgents",
    payload: {},
  });
});

test("detail query lists skills and routines for one bot", () => {
  assert.deepEqual(grokBotReadQuery({ agentId: "bot-1" }), {
    method: "ListGrokBotAgentSkills",
    payload: { agentId: "bot-1" },
    follow: {
      method: "ListGrokBotAgentAutomations",
      payload: { agentId: "bot-1", timeZone: "UTC" },
    },
  });
});
