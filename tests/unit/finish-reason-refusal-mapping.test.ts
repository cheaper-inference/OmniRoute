import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIResponse } =
  await import("../../open-sse/translator/response/claude-to-openai.ts");
const { BedrockExecutor } = await import("../../open-sse/executors/bedrock.ts");

function claudeFinishReason(stopReason: string): string | null {
  const state = {
    toolCalls: new Map(),
    toolNameMap: new Map(),
    messageId: "msg_test",
    model: "claude-sonnet-4-5",
    toolCallIndex: 0,
  };
  claudeToOpenAIResponse({ type: "message_start", message: { id: "msg_test" } }, state);
  const out = claudeToOpenAIResponse(
    { type: "message_delta", delta: { stop_reason: stopReason }, usage: { output_tokens: 1 } },
    state
  );
  return out?.find((chunk) => chunk.choices?.[0]?.finish_reason)?.choices[0].finish_reason ?? null;
}

test("Claude stream: refusal maps to content_filter instead of a clean stop", () => {
  assert.equal(claudeFinishReason("refusal"), "content_filter");
});

test("Claude stream: model_context_window_exceeded maps to length", () => {
  assert.equal(claudeFinishReason("model_context_window_exceeded"), "length");
});

test("Claude stream: existing stop reason mappings are unchanged", () => {
  assert.equal(claudeFinishReason("end_turn"), "stop");
  assert.equal(claudeFinishReason("stop_sequence"), "stop");
  assert.equal(claudeFinishReason("max_tokens"), "length");
  assert.equal(claudeFinishReason("tool_use"), "tool_calls");
  assert.equal(claudeFinishReason("pause_turn"), "stop");
});

async function bedrockFinishReason(stopReason: string, stream: boolean): Promise<string> {
  const executor = new BedrockExecutor(() => ({
    send: async () =>
      stream
        ? {
            stream: (async function* () {
              yield { contentBlockDelta: { contentBlockIndex: 0, delta: { text: "x" } } };
              yield { messageStop: { stopReason } };
            })(),
          }
        : {
            output: { message: { content: [{ text: "x" }] } },
            stopReason,
            usage: { inputTokens: 1, outputTokens: 1, totalTokens: 2 },
          },
  }));
  const result = await executor.execute({
    model: "anthropic.claude-sonnet-4-6",
    body: { messages: [{ role: "user", content: "Hi" }], stream },
    stream,
    credentials: { apiKey: "bedrock-key", providerSpecificData: { region: "eu-west-2" } },
  });
  if (!stream) return (await result.response.json()).choices[0].finish_reason;
  const chunks = (await result.response.text())
    .split("\n")
    .filter((line) => line.startsWith("data:") && !line.includes("[DONE]"))
    .map((line) => JSON.parse(line.slice(5)));
  return chunks
    .map((chunk) => chunk.choices?.[0]?.finish_reason)
    .filter(Boolean)
    .pop();
}

for (const stream of [false, true]) {
  const mode = stream ? "streaming" : "non-streaming";

  test(`Bedrock ${mode}: content_filtered and guardrail_intervened map to content_filter`, async () => {
    assert.equal(await bedrockFinishReason("content_filtered", stream), "content_filter");
    assert.equal(await bedrockFinishReason("guardrail_intervened", stream), "content_filter");
  });

  test(`Bedrock ${mode}: model_context_window_exceeded maps to length`, async () => {
    assert.equal(await bedrockFinishReason("model_context_window_exceeded", stream), "length");
  });

  test(`Bedrock ${mode}: existing stop reason mappings are unchanged`, async () => {
    assert.equal(await bedrockFinishReason("end_turn", stream), "stop");
    assert.equal(await bedrockFinishReason("max_tokens", stream), "length");
    assert.equal(await bedrockFinishReason("tool_use", stream), "tool_calls");
  });
}
