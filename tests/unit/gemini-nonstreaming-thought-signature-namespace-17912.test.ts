import test from "node:test";
import assert from "node:assert/strict";

const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { clearGeminiThoughtSignatureMemoryForTests } =
  await import("../../open-sse/services/geminiThoughtSignatureStore.ts");

type Part = { functionCall?: { name: string }; thoughtSignature?: string };
type Content = { parts?: Part[] };
type ToolCall = { id: string; function: { name: string } };
type ChatResponse = { choices: { message: { tool_calls: ToolCall[] } }[] };
type Translated = { contents: Content[] };

const CONNECTION_ID = "conn-17912";
const MODEL = "gemini-4-argon";
const SIGNATURE = "SIG_17912_ARGON_" + "A".repeat(80);

test.beforeEach(() => clearGeminiThoughtSignatureMemoryForTests());

// Gemini/Vertex answer to step 1: functionCall part carrying a thoughtSignature.
const geminiStep1 = () => ({
  candidates: [
    {
      content: {
        role: "model",
        parts: [
          {
            functionCall: { name: "get_time", args: {} },
            thoughtSignature: SIGNATURE,
          },
        ],
      },
      finishReason: "STOP",
    },
  ],
  usageMetadata: { promptTokenCount: 5, candidatesTokenCount: 3, totalTokenCount: 8 },
});

test("#17912: non-streaming Gemini tool_call signature is replayed on the follow-up request", () => {
  // Step 1 (non-streaming): provider body -> OpenAI body shown to the client.
  const openaiResponse = translateNonStreamingResponse(
    geminiStep1(),
    FORMATS.GEMINI,
    FORMATS.OPENAI,
    null,
    null,
    undefined,
    undefined,
    // fix API: connection+family scoped namespace, same as the request side uses
    { signatureNamespace: `${CONNECTION_ID}:gemini` }
  ) as ChatResponse;
  const toolCall = openaiResponse.choices[0].message.tool_calls[0];
  assert.equal(toolCall.function.name, "get_time");

  // Step 2: client echoes assistant turn + tool result; chatCore passes signatureNamespace=connectionId.
  const body = {
    model: MODEL,
    messages: [
      { role: "user", content: "Call get_time, then tell me the time." },
      { role: "assistant", content: null, tool_calls: [toolCall] },
      { role: "tool", tool_call_id: toolCall.id, content: "12:34" },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "get_time",
          description: "Get the current time",
          parameters: { type: "object", properties: {}, required: [] },
        },
      },
    ],
  };
  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.GEMINI,
    MODEL,
    body,
    false,
    null,
    "gemini",
    null,
    { signatureNamespace: CONNECTION_ID }
  ) as Translated;

  const parts = translated.contents.flatMap((c: Content) => c.parts ?? []);
  const fc = parts.find((p: Part) => p.functionCall);
  assert.ok(
    fc,
    "functionCall part must be kept in history (not replaced by inert context text): " +
      JSON.stringify(translated.contents)
  );
  assert.equal(fc.thoughtSignature, SIGNATURE);
});
