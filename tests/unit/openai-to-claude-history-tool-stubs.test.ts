import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest, CLAUDE_OAUTH_TOOL_PREFIX } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");

// Anthropic answers 400 "Requests which include `tool_use` or `tool_result` blocks must
// define tools" when the history has tool blocks and the request declares no tools.
const history = [
  { role: "user", content: "find it" },
  {
    role: "assistant",
    content: null,
    tool_calls: [
      { id: "call_1", type: "function", function: { name: "tool_search", arguments: "{}" } },
      { id: "call_2", type: "function", function: { name: "read_file", arguments: "{}" } },
    ],
  },
  { role: "tool", tool_call_id: "call_1", content: "found" },
  { role: "tool", tool_call_id: "call_2", content: "text" },
  { role: "user", content: "go on" },
];

test("history tool calls with no declared tools get non-callable stub tools", () => {
  const out = openaiToClaudeRequest("claude-sonnet-4-5", { messages: history }, false) as {
    tools?: Array<{ name: string; input_schema: Record<string, unknown> }>;
    tool_choice?: { type: string };
  };
  assert.deepEqual(
    out.tools?.map((tool) => tool.name),
    [`${CLAUDE_OAUTH_TOOL_PREFIX}tool_search`, `${CLAUDE_OAUTH_TOOL_PREFIX}read_file`]
  );
  assert.equal(out.tools?.[0].input_schema.type, "object");
  assert.deepEqual(out.tool_choice, { type: "none" });
});

test("an empty tools array gets the same stubs", () => {
  const out = openaiToClaudeRequest("claude-sonnet-4-5", { messages: history, tools: [] }, false);
  assert.equal((out.tools as unknown[]).length, 2);
});

test("a request with declared tools keeps its tools and tool_choice", () => {
  const out = openaiToClaudeRequest(
    "claude-sonnet-4-5",
    {
      messages: history,
      tools: [{ type: "function", function: { name: "other", parameters: { type: "object" } } }],
    },
    false
  );
  assert.deepEqual(
    (out.tools as Array<{ name: string }>).map((tool) => tool.name),
    [`${CLAUDE_OAUTH_TOOL_PREFIX}other`]
  );
  assert.equal(out.tool_choice, undefined);
});

test("a request with no tool history gets no tools", () => {
  const out = openaiToClaudeRequest(
    "claude-sonnet-4-5",
    { messages: [{ role: "user", content: "hi" }] },
    false
  );
  assert.equal(out.tools, undefined);
  assert.equal(out.tool_choice, undefined);
});

test("a history tool name Anthropic would reject is not stubbed", () => {
  const out = openaiToClaudeRequest(
    "claude-sonnet-4-5",
    {
      messages: [
        { role: "user", content: "x" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "c1", type: "function", function: { name: "bad name!", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "c1", content: "r" },
      ],
    },
    false
  );
  assert.equal(out.tools, undefined);
});
