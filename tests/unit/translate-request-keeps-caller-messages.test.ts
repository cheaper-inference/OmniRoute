import { test } from "node:test";
import assert from "node:assert/strict";
import { translateRequest } from "../../open-sse/translator/index.ts";

// A combo copies the request body per target with a shallow copy (#7847, see
// combo-attempt-body-isolation-7847.test.ts), so the message objects are SHARED between targets.
// translateRequest must therefore leave the message objects it is given as they were: a target that
// strips or normalizes a field in place would change what the next target receives. This locks the
// result (the caller's messages are unchanged), not the copy strategy.
function body() {
  return {
    model: "m",
    stream: false,
    messages: [
      { role: "user", content: "u" },
      {
        role: "assistant",
        content: "a",
        reasoning_content: "KEEP-ME",
        reasoning: "KEEP-ME",
        refusal: "keep",
        annotations: [{ type: "kept" }],
        tool_calls: [{ id: "", function: { name: "f", arguments: "" } }],
      },
      { role: "tool", content: "tool output" },
      { role: "user", content: "next" },
    ],
  };
}

for (const [label, targetFormat, provider, model] of [
  ["Chat -> Chat, non-reasoner target", "openai", "openai", "gpt-4o"],
  ["Chat -> Chat, reasoner target", "openai", "deepseek", "deepseek-v4-pro"],
  ["Chat -> Claude", "claude", "anthropic", "claude-sonnet-4"],
  ["Chat -> Gemini", "gemini", "gemini", "gemini-2.5-pro"],
  ["Chat -> Responses", "openai-responses", "openai", "gpt-5"],
] as const) {
  test(`${label}: the caller's message objects are not changed`, () => {
    const input = body();
    const before = JSON.stringify(input);
    translateRequest("openai", targetFormat, model, input, false, null, provider);
    assert.equal(JSON.stringify(input), before);
  });
}

test("a displaced tool result is moved in the output, not in the caller's message array", () => {
  const input = {
    model: "m",
    messages: [
      { role: "user", content: "u" },
      {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "call_1", type: "function", function: { name: "f", arguments: "{}" } }],
      },
      { role: "user", content: "interleaved" },
      { role: "tool", tool_call_id: "call_1", content: "late result" },
    ],
  };
  const order = input.messages.map((m) => m.role).join(",");
  const out = translateRequest("openai", "openai", "gpt-4o", input, false, null, "openai") as {
    messages: Array<{ role: string }>;
  };
  assert.equal(input.messages.map((m) => m.role).join(","), order, "caller array order unchanged");
  assert.equal(
    out.messages.map((m) => m.role).join(","),
    "user,assistant,tool,user",
    "the output still has the result next to its call"
  );
});

test("the translated request still carries the normalized values", () => {
  const out = translateRequest("openai", "openai", "gpt-4o", body(), false, null, "openai") as {
    messages: Array<{
      reasoning_content?: string;
      tool_calls?: Array<{ id: string; function: { arguments: string } }>;
    }>;
  };
  const call = out.messages[1].tool_calls?.[0];
  assert.equal(typeof call?.id, "string", "a missing tool call id is filled in the output");
  assert.match(call.id, /\S/, "the filled tool call id is not blank");
  assert.equal(call?.function.arguments, "{}", "empty arguments become {}");
  assert.equal(out.messages[1].reasoning_content, undefined, "echo fields are still stripped");
});

test("a later combo target still sees the client reasoning after an earlier target stripped it", () => {
  // Two targets share the message objects (shallow body copy). Target 1 is a non-reasoner Chat
  // model: it strips the echo fields. Target 2 is a replay model that needs reasoning_content.
  const shared = {
    model: "m",
    messages: [
      { role: "user", content: "u" },
      { role: "assistant", content: "a", reasoning_content: "KEEP-ME", reasoning: "KEEP-ME" },
      { role: "user", content: "u2" },
    ],
  };
  translateRequest("openai", "openai", "gpt-4o-mini", { ...shared }, false, null, "openai");
  assert.equal(shared.messages[1].reasoning_content, "KEEP-ME", "target 1 left the shared message");
  const second = translateRequest(
    "openai",
    "openai",
    "deepseek-v4-pro",
    { ...shared },
    false,
    null,
    "deepseek"
  ) as { messages: Array<{ reasoning_content?: string }> };
  assert.equal(second.messages[1].reasoning_content, "KEEP-ME");
});

test("Claude -> Claude: tool ids are sanitized in the output, not in the caller's content blocks", () => {
  // Pass 1.4 of prepareClaudeRequest rewrites ids an Anthropic upstream rejects ("call:1").
  // The caller's tool_use / tool_result blocks are shared with later combo targets. (The
  // cache_control marker on a Claude content block is a separate, documented case.)
  const input = {
    model: "m",
    max_tokens: 64,
    messages: [
      { role: "user", content: [{ type: "text", text: "u" }] },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "call:1", name: "f", input: {} }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "call:1", content: "r" }],
      },
    ],
  };
  const callerToolUse = input.messages[1].content[0] as { id?: string };
  const callerToolResult = input.messages[2].content[0] as { tool_use_id?: string };
  const out = translateRequest(
    "claude",
    "claude",
    "claude-sonnet-4",
    input,
    false,
    null,
    "anthropic"
  ) as { messages: Array<{ content: Array<{ id?: string; tool_use_id?: string }> }> };
  assert.equal(callerToolUse.id, "call:1", "the caller's tool_use id is unchanged");
  assert.equal(callerToolResult.tool_use_id, "call:1", "the caller's tool_result id is unchanged");
  assert.equal(out.messages[1].content[0].id, "call_1", "the output id is sanitized");
  assert.equal(out.messages[2].content[0].tool_use_id, "call_1", "the pair stays matched");
});
