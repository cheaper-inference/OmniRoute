import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

function translate(body: Record<string, unknown>): Record<string, unknown> {
  return openaiResponsesToOpenAIRequest("gpt-5", body, false, null) as Record<string, unknown>;
}

type Message = { role: string; content?: unknown };

test("Responses-only context_management and prompt do not reach a Chat Completions upstream", () => {
  const result = translate({
    input: "hi",
    context_management: [{ type: "compaction", compact_threshold: 1000 }],
    prompt: { id: "pmpt_1", version: "2" },
  });
  assert.equal("context_management" in result, false);
  assert.equal("prompt" in result, false);
});

test("allowed_tools that names a custom tool is accepted and keeps that tool", () => {
  const result = translate({
    input: "patch",
    tools: [
      { type: "custom", name: "apply_patch", description: "Apply a patch" },
      { type: "function", name: "other", parameters: { type: "object" } },
    ],
    tool_choice: {
      type: "allowed_tools",
      mode: "auto",
      tools: [{ type: "custom", name: "apply_patch" }],
    },
  });
  assert.equal(result.tool_choice, "auto");
  assert.deepEqual(
    (result.tools as Array<{ function: { name: string } }>).map((tool) => tool.function.name),
    ["apply_patch"]
  );
});

test("allowed_tools still rejects a built-in tool descriptor", () => {
  assert.throws(
    () =>
      translate({
        input: "x",
        tools: [{ type: "function", name: "available", parameters: { type: "object" } }],
        tool_choice: {
          type: "allowed_tools",
          mode: "required",
          tools: [{ type: "web_search", name: "available" }],
        },
      }),
    (error: unknown) =>
      (error as Error & { errorType?: string }).errorType === "unsupported_feature"
  );
});

test("an input_file part in a tool output becomes a short note, not inlined base64", () => {
  const base64 = "QUJD".repeat(1250);
  const result = translate({
    input: [
      { type: "function_call", call_id: "call_1", name: "read", arguments: "{}" },
      {
        type: "function_call_output",
        call_id: "call_1",
        output: [
          { type: "input_text", text: "done" },
          { type: "input_file", filename: "report.pdf", file_data: base64 },
        ],
      },
    ],
  });
  const tool = (result.messages as Message[]).find((message) => message.role === "tool");
  const content = String(tool?.content);
  assert.equal(content.includes(base64), false);
  assert.match(content, /done/);
  assert.match(content, /report\.pdf/);
});
