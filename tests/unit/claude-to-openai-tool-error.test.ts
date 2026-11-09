/**
 * Claude → OpenAI: a failed tool run (`tool_result.is_error: true`) must stay
 * visible to the model. The OpenAI `tool` role has no is_error field (and strict
 * upstreams reject unknown message fields), so the translator prefixes the
 * content with a `[tool_error: true]` marker instead of silently dropping it.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");

function toolMessages(isError: unknown, content: unknown) {
  const block: Record<string, unknown> = {
    type: "tool_result",
    tool_use_id: "toolu_1",
    content,
  };
  if (isError !== undefined) block.is_error = isError;
  const result = claudeToOpenAIRequest(
    "gpt-4.1",
    {
      max_tokens: 256,
      messages: [
        { role: "user", content: "run it" },
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "toolu_1", name: "Bash", input: { command: "x" } }],
        },
        { role: "user", content: [block] },
      ],
    },
    false
  ) as { messages: Array<Record<string, unknown>> };
  return result.messages.filter((m) => m.role === "tool");
}

test("is_error:true string content is prefixed with the tool_error marker", () => {
  const [tool] = toolMessages(true, "command not found: x");
  assert.equal(tool.tool_call_id, "toolu_1");
  assert.equal(tool.content, "[tool_error: true]\ncommand not found: x");
  assert.equal("is_error" in tool, false, "no non-standard field on the OpenAI message");
});

test("is_error:true block-array content is prefixed too", () => {
  const [tool] = toolMessages(true, [{ type: "text", text: "exit code 1" }]);
  assert.equal(tool.content, "[tool_error: true]\nexit code 1");
});

test("is_error:true with empty content still carries the marker", () => {
  const [tool] = toolMessages(true, "");
  assert.equal(tool.content, "[tool_error: true]");
});

test("successful tool results are untouched (regression guard)", () => {
  assert.equal(toolMessages(false, "ok")[0].content, "ok");
  assert.equal(toolMessages(undefined, "ok")[0].content, "ok");
});
