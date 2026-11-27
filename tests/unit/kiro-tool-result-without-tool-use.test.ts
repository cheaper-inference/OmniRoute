import test from "node:test";
import assert from "node:assert/strict";

const { buildKiroPayload } = await import("../../open-sse/translator/request/openai-to-kiro.ts");

const CREDENTIALS = {
  accessToken: "test-token",
  profileArn: "arn:aws:codewhisperer:us-east-1:000000000000:profile/TEST",
  region: "us-east-1",
};

const TOOLS = [
  {
    type: "function",
    function: {
      name: "f",
      description: "d",
      parameters: { type: "object", properties: {} },
    },
  },
];

const call = (id: string) => ({
  id,
  type: "function",
  function: { name: "f", arguments: "{}" },
});

function build(messages: unknown[]) {
  return buildKiroPayload(
    "claude-sonnet-4.5",
    { model: "claude-sonnet-4.5", messages, tools: TOOLS },
    false,
    CREDENTIALS
  ) as {
    conversationState: {
      history?: Array<{
        assistantResponseMessage?: { toolUses?: Array<{ toolUseId: string }> };
        userInputMessage?: {
          userInputMessageContext?: { toolResults?: Array<{ toolUseId: string }> };
        };
      }>;
      currentMessage: {
        userInputMessage: {
          content: string;
          userInputMessageContext?: { toolResults?: Array<{ toolUseId: string }> };
        };
      };
    };
  };
}

/** Every toolResult id, with the toolUse ids of the assistant turn right before it. */
function pairs(payload: ReturnType<typeof build>) {
  const out: Array<{ resultIds: string[]; useIds: string[] }> = [];
  const history = payload.conversationState.history ?? [];
  const current = payload.conversationState.currentMessage.userInputMessage;
  const turns = [...history.map((h) => h.userInputMessage ?? null), current] as Array<{
    userInputMessageContext?: { toolResults?: Array<{ toolUseId: string }> };
  } | null>;
  turns.forEach((turn, index) => {
    const results = turn?.userInputMessageContext?.toolResults;
    if (!results?.length) return;
    const previous = history[index - 1]?.assistantResponseMessage;
    out.push({
      resultIds: results.map((r) => r.toolUseId),
      useIds: (previous?.toolUses ?? []).map((u) => u.toolUseId),
    });
  });
  return out;
}

test("a tool result whose id the previous assistant turn did not call is not sent as a toolResult", () => {
  const payload = build([
    { role: "user", content: "go" },
    { role: "assistant", content: null, tool_calls: [call("Z")] },
    { role: "tool", tool_call_id: "Z", content: "first Z" },
    { role: "assistant", content: null, tool_calls: [call("A")] },
    { role: "tool", tool_call_id: "A", content: "res A" },
    { role: "tool", tool_call_id: "Z", content: "second Z" },
    { role: "user", content: "next" },
  ]);
  for (const { resultIds, useIds } of pairs(payload)) {
    for (const id of resultIds) {
      assert.ok(useIds.includes(id), `toolResult ${id} has no toolUse in the turn before it`);
    }
  }
});

test("an unknown tool result inside a history turn is not sent as a toolResult", () => {
  const payload = build([
    { role: "user", content: "go" },
    { role: "assistant", content: null, tool_calls: [call("A")] },
    { role: "tool", tool_call_id: "A", content: "res A" },
    { role: "tool", tool_call_id: "Z", content: "result for nothing" },
    { role: "assistant", content: "done" },
    { role: "user", content: "next" },
  ]);
  const checked = pairs(payload);
  assert.ok(checked.length > 0, "the matching result must still be sent");
  for (const { resultIds, useIds } of checked) {
    for (const id of resultIds) {
      assert.ok(useIds.includes(id), `toolResult ${id} has no toolUse in the turn before it`);
    }
  }
});

test("the text of a result that is not sent as a toolResult stays in the message", () => {
  const payload = build([
    { role: "user", content: "go" },
    { role: "assistant", content: null, tool_calls: [call("A")] },
    { role: "tool", tool_call_id: "A", content: "res A" },
    { role: "tool", tool_call_id: "Z", content: "result for nothing" },
    { role: "user", content: "next" },
  ]);
  assert.match(
    payload.conversationState.currentMessage.userInputMessage.content,
    /result for nothing/
  );
});

test("a result that matches the previous assistant turn stays a toolResult", () => {
  const payload = build([
    { role: "user", content: "go" },
    { role: "assistant", content: null, tool_calls: [call("A")] },
    { role: "tool", tool_call_id: "A", content: "res A" },
    { role: "user", content: "next" },
  ]);
  assert.deepEqual(pairs(payload), [{ resultIds: ["A"], useIds: ["A"] }]);
});
