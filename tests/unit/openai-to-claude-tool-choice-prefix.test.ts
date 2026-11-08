// A forced tool_choice must name a tool that `tools` declares. When the OAuth tool prefix
// is on (every Claude-format provider except first-party "claude"), the declared tools
// are `proxy_<name>`, so the forced choice must carry the same prefix; otherwise
// Anthropic rejects the request because tool_choice names an undeclared tool.
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest, openaiToClaudeRequestForAntigravity } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");

type ClaudeOut = { tool_choice?: { type: string; name?: string }; tools: Array<{ name: string }> };

function tool(name: string) {
  return { type: "function", function: { name, parameters: { type: "object", properties: {} } } };
}

function toClaude(body: Record<string, unknown>): ClaudeOut {
  return openaiToClaudeRequest(
    "claude-sonnet-4-5",
    { messages: [{ role: "user", content: "q" }], ...body },
    false
  ) as unknown as ClaudeOut;
}

test("forced function tool_choice names the prefixed declared tool", () => {
  const out = toClaude({
    tools: [tool("get_weather")],
    tool_choice: { type: "function", function: { name: "get_weather" } },
  });
  assert.deepEqual(out.tool_choice, { type: "tool", name: "proxy_get_weather" });
  assert.ok(out.tools.some((t) => t.name === out.tool_choice?.name));
});

test("allowed_tools required with one tool names the prefixed declared tool", () => {
  const out = toClaude({
    tools: [tool("a"), tool("b")],
    tool_choice: {
      type: "allowed_tools",
      allowed_tools: { mode: "required", tools: [{ type: "function", function: { name: "a" } }] },
    },
  });
  assert.deepEqual(out.tool_choice, { type: "tool", name: "proxy_a" });
  assert.deepEqual(
    out.tools.map((t) => t.name),
    ["proxy_a"]
  );
});

test("Claude-native {type:tool} choice is prefixed like the tools", () => {
  const out = toClaude({ tools: [tool("a")], tool_choice: { type: "tool", name: "a" } });
  assert.deepEqual(out.tool_choice, { type: "tool", name: "proxy_a" });
});

test("prefix disabled: forced tool_choice keeps the original name", () => {
  const out = toClaude({
    tools: [tool("get_weather")],
    tool_choice: { type: "function", function: { name: "get_weather" } },
    _disableToolPrefix: true,
  });
  assert.deepEqual(out.tool_choice, { type: "tool", name: "get_weather" });
  assert.deepEqual(
    out.tools.map((t) => t.name),
    ["get_weather"]
  );
});

test("Antigravity strips the prefix from the forced tool_choice like the tools", () => {
  const out = openaiToClaudeRequestForAntigravity(
    "claude-sonnet-4-5",
    {
      messages: [{ role: "user", content: "q" }],
      tools: [tool("get_weather")],
      tool_choice: { type: "function", function: { name: "get_weather" } },
    },
    false
  ) as unknown as ClaudeOut;
  assert.deepEqual(out.tool_choice, { type: "tool", name: "get_weather" });
  assert.deepEqual(
    out.tools.map((t) => t.name),
    ["get_weather"]
  );
});
