// Wiring: both Claude response paths pass the client schema, so an unregistered tool with
// array/object parameters is repaired (helper: tool-call-shim-schema-repair.test.ts).
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");
const { translateNonStreamingClientResponse } =
  await import("../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts");

const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
  },
};

// Wiring: both Claude response paths pass the client schema, so an unregistered tool is repaired.
const stringified = JSON.stringify({ title: "t", tags: '["a","b"]' });

test("streaming OpenAI -> Claude repairs a stringified array for an unregistered tool", () => {
  const state = {
    messageStartSent: false,
    nextBlockIndex: 0,
    toolCalls: new Map(),
    thinkingBlockStarted: false,
    textBlockStarted: false,
    textBlockClosed: false,
    toolSchemas: new Map([["create_task", schema]]),
  };
  const chunks = [
    {
      id: "x",
      choices: [
        {
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                function: { name: "create_task", arguments: stringified },
              },
            ],
          },
        },
      ],
    },
    { choices: [{ delta: {}, finish_reason: "tool_calls" }] },
    null,
  ];
  const events = chunks.flatMap((chunk) => openaiToClaudeResponse(chunk, state) ?? []);
  const json = events
    .filter((e) => e.type === "content_block_delta" && e.delta?.type === "input_json_delta")
    .map((e) => e.delta.partial_json)
    .join("");
  assert.deepEqual(JSON.parse(json), { title: "t", tags: ["a", "b"] });
});

test("JSON OpenAI -> Claude repairs a stringified array for an unregistered tool", () => {
  const result = translateNonStreamingClientResponse({
    responseBody: {
      id: "x",
      object: "chat.completion",
      choices: [
        {
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: { name: "create_task", arguments: stringified },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
    responsePayloadFormat: "openai",
    clientResponseFormat: "claude",
    sourceFormat: "claude",
    provider: "openai",
    model: "test-model",
    requestBody: {
      tools: [{ type: "function", function: { name: "x", parameters: {} } }],
    },
    clientRequestBody: {
      tools: [{ name: "create_task", input_schema: schema }],
    },
    responseToolNameMap: null,
    requestToolIdentityMap: null,
    reasoningCacheScope: null,
    clientHeaders: null,
    isClaudeCodeCompatible: false,
    phase: "intermediate",
  });
  const blocks = result.response.content as Array<Record<string, unknown>>;
  assert.deepEqual(blocks.find((b) => b.type === "tool_use")?.input, {
    title: "t",
    tags: ["a", "b"],
  });
});
