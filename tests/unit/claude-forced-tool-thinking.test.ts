import test from "node:test";
import assert from "node:assert/strict";
const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");

for (const toolChoice of ["required", { type: "function", function: { name: "inspect" } }]) {
  test(`forced tools disable incompatible Claude thinking: ${JSON.stringify(toolChoice)}`, () => {
    const result = openaiToClaudeRequest(
      "claude-haiku-4-5",
      {
        messages: [{ role: "user", content: "inspect" }],
        tools: [
          {
            type: "function",
            function: { name: "inspect", parameters: { type: "object", properties: {} } },
          },
        ],
        reasoning_effort: "low",
        tool_choice: toolChoice,
      },
      false
    );
    assert.equal(result.thinking, undefined);
  });
}

test("auto tool choice retains Claude thinking", () => {
  const result = openaiToClaudeRequest(
    "claude-haiku-4-5",
    {
      messages: [{ role: "user", content: "inspect" }],
      reasoning_effort: "low",
      tool_choice: "auto",
    },
    false
  );
  assert.equal(result.thinking?.type, "enabled");
});
