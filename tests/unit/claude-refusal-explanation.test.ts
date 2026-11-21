import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIResponse } =
  await import("../../open-sse/translator/response/claude-to-openai.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const FLAG = "CLAUDE_REFUSAL_EXPLANATION_ENABLED";

function refusalChunks(explanation: string | undefined) {
  const state = {
    toolCalls: new Map(),
    toolNameMap: new Map(),
    messageId: "msg_test",
    model: "claude-sonnet-4-5",
    toolCallIndex: 0,
  };
  claudeToOpenAIResponse({ type: "message_start", message: { id: "msg_test" } }, state);
  const delta: Record<string, unknown> = { stop_reason: "refusal" };
  if (explanation !== undefined) {
    delta.stop_details = { type: "refusal", category: "cyber", explanation };
  }
  return (
    claudeToOpenAIResponse({ type: "message_delta", delta, usage: { output_tokens: 1 } }, state) ??
    []
  );
}

function refusalMessage(): Record<string, unknown> {
  return {
    id: "msg_test",
    model: "claude-sonnet-4-5",
    type: "message",
    role: "assistant",
    content: [],
    stop_reason: "refusal",
    stop_details: { type: "refusal", category: "cyber", explanation: "Refused for policy." },
    usage: { input_tokens: 1, output_tokens: 1 },
  };
}

function withFlag(value: string | undefined, run: () => void) {
  const previous = process.env[FLAG];
  if (value === undefined) delete process.env[FLAG];
  else process.env[FLAG] = value;
  try {
    run();
  } finally {
    if (previous === undefined) delete process.env[FLAG];
    else process.env[FLAG] = previous;
  }
}

test("refusal explanation: flag on emits one content chunk before the content_filter finish", () => {
  withFlag("true", () => {
    const out = refusalChunks("I cannot help with that request.");
    const contentIndex = out.findIndex((c) => c.choices?.[0]?.delta?.content);
    const finishIndex = out.findIndex((c) => c.choices?.[0]?.finish_reason);
    assert.notEqual(contentIndex, -1, "an explanation content chunk must be emitted");
    assert.equal(out[contentIndex].choices[0].delta.content, "I cannot help with that request.");
    assert.ok(contentIndex < finishIndex, "the explanation must come before the finish chunk");
    assert.equal(out[finishIndex].choices[0].finish_reason, "content_filter");
  });
});

test("refusal explanation: flag off keeps today's output with no explanation content", () => {
  withFlag(undefined, () => {
    const out = refusalChunks("I cannot help with that request.");
    assert.equal(
      out.some((c) => c.choices?.[0]?.delta?.content),
      false,
      "flag off must not add assistant text"
    );
    const finish = out.find((c) => c.choices?.[0]?.finish_reason);
    assert.equal(finish?.choices[0].finish_reason, "content_filter");
  });
});

test("refusal explanation: non-stream flag on puts the explanation in message content", () => {
  withFlag("true", () => {
    const result = translateNonStreamingResponse(
      refusalMessage(),
      FORMATS.CLAUDE,
      FORMATS.OPENAI
    ) as { choices: Array<{ message: { content: string }; finish_reason: string }> };
    assert.equal(result.choices[0].message.content, "Refused for policy.");
    assert.equal(result.choices[0].finish_reason, "content_filter");
  });
});

test("refusal explanation: non-stream flag off keeps empty content", () => {
  withFlag(undefined, () => {
    const result = translateNonStreamingResponse(
      refusalMessage(),
      FORMATS.CLAUDE,
      FORMATS.OPENAI
    ) as { choices: Array<{ message: { content: string }; finish_reason: string }> };
    assert.equal(result.choices[0].message.content, "");
    assert.equal(result.choices[0].finish_reason, "content_filter");
  });
});
