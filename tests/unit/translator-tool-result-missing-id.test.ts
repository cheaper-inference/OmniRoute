import assert from "node:assert/strict";
import test from "node:test";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import {
  ensureToolCallIds,
  fixMissingToolResponses,
} from "../../open-sse/translator/helpers/toolCallHelper.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(() => resetDbInstance());

function assistantCalls(...ids: Array<string | undefined>) {
  return {
    role: "assistant" as const,
    content: null,
    tool_calls: ids.map((id) => ({
      id,
      type: "function",
      function: { name: "read_file", arguments: "{}" },
    })),
  };
}

type ToolResult = { role: "tool"; tool_call_id?: string; content: string };

test("parallel results without IDs answer the calls left by explicit results", () => {
  const body: { messages: Array<ReturnType<typeof assistantCalls> | ToolResult> } = {
    messages: [
      assistantCalls("call_a", "call_b"),
      { role: "tool", tool_call_id: "call_b", content: "output B" },
      { role: "tool", content: "output A" },
      assistantCalls("call_a", "call_b"),
      { role: "tool", content: "output A again" },
      { role: "tool", tool_call_id: "call_b", content: "output B again" },
    ],
  };

  const result = fixMissingToolResponses(ensureToolCallIds(body));

  assert.deepEqual(
    result.messages.filter((m) => m.role === "tool").map((m) => [m.tool_call_id, m.content]),
    [
      ["call_b", "output B"],
      ["call_a", "output A"],
      ["call_a", "output A again"],
      ["call_b", "output B again"],
    ]
  );
});

test("a later explicit result keeps its call when an ID-less result arrives first", () => {
  const assistant = assistantCalls("call_first", undefined);
  const missing: ToolResult = { role: "tool", content: "generated call output" };
  const explicit: ToolResult = {
    role: "tool",
    tool_call_id: "call_first",
    content: "explicit call output",
  };

  ensureToolCallIds({ messages: [assistant, missing, explicit] }, { use9CharId: true });

  const [first, second] = assistant.tool_calls;
  assert.match(first.id, /^[a-zA-Z0-9]{9}$/);
  assert.match(second.id, /^[a-zA-Z0-9]{9}$/);
  assert.notEqual(first.id, second.id);
  assert.equal(missing.tool_call_id, second.id);
  assert.equal(explicit.tool_call_id, first.id);
});

test("Claude passthrough preserves a result when both sides of the tool exchange lack IDs", () => {
  const call = { type: "tool_use", name: "read_file", input: {} };
  const result = { type: "tool_result", content: "file contents" };
  const body = {
    messages: [
      { role: "user", content: "Read it" },
      { role: "assistant", content: [call] },
      { role: "user", content: [result] },
    ],
  };

  const translated = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.CLAUDE,
    "claude-sonnet-4",
    body,
    false,
    null,
    "claude"
  );
  const blocks = translated.messages.flatMap((message) => message.content);
  const toolUse = blocks.find((block) => block.type === "tool_use");
  const results = blocks.filter((block) => block.type === "tool_result");

  assert.equal(results.length, 1);
  assert.match(toolUse.id, /^[a-zA-Z0-9_-]+$/);
  assert.equal(results[0].tool_use_id, toolUse.id);
  assert.equal(results[0].content, "file contents");
  assert.equal("id" in call, false);
  assert.equal("tool_use_id" in result, false);
});
