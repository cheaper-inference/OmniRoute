import test from "node:test";
import assert from "node:assert/strict";

const { translateNonStreamingClientResponse } =
  await import("../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { clearGeminiThoughtSignatureMemoryForTests, scopeGeminiThoughtSignatureNamespace } =
  await import("../../open-sse/services/geminiThoughtSignatureStore.ts");

type Part = { functionCall?: { name: string }; thoughtSignature?: string };
type Content = { parts?: Part[] };
type ToolCall = { id: string; function: { name: string } };
type ChatResponse = { choices: { message: { tool_calls: ToolCall[] } }[] };
type Translated = { contents: Content[] };

const CONNECTION_ID = "conn-17912-wiring";
const MODEL = "gemini-4-argon";
const SIGNATURE = "SIG_17912_WIRING_" + "B".repeat(80);

test.beforeEach(() => clearGeminiThoughtSignatureMemoryForTests());

const geminiBody = () => ({
  candidates: [
    {
      content: {
        role: "model",
        parts: [{ functionCall: { name: "get_time", args: {} }, thoughtSignature: SIGNATURE }],
      },
      finishReason: "STOP",
    },
  ],
  usageMetadata: { promptTokenCount: 5, candidatesTokenCount: 3, totalTokenCount: 8 },
});

function clientTranslate(signatureNamespace?: string | null) {
  const result = translateNonStreamingClientResponse({
    responseBody: geminiBody(),
    responsePayloadFormat: FORMATS.GEMINI,
    clientResponseFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.OPENAI,
    provider: "gemini",
    model: MODEL,
    requestBody: {},
    clientRequestBody: {},
    responseToolNameMap: null,
    reasoningCacheScope: null,
    videoTranscriptSensitive: false,
    signatureNamespace,
  } as unknown as Parameters<typeof translateNonStreamingClientResponse>[0]) as unknown as Record<
    string,
    unknown
  >;
  return (result.translatedResponse ?? result.response ?? result) as ChatResponse;
}

function followUp(toolCall: ToolCall, namespace: string | null) {
  const body = {
    model: MODEL,
    messages: [
      { role: "user", content: "Call get_time." },
      { role: "assistant", content: null, tool_calls: [toolCall] },
      { role: "tool", tool_call_id: toolCall.id, content: "12:34" },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "get_time",
          description: "Get the time",
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
    namespace ? { signatureNamespace: namespace } : undefined
  ) as Translated;
  return translated.contents
    .flatMap((c: Content) => c.parts ?? [])
    .find((p: Part) => p.functionCall);
}

test("#17912: translateNonStreamingClientResponse stores the signature under the scoped namespace", () => {
  const ns = scopeGeminiThoughtSignatureNamespace(CONNECTION_ID, MODEL) as string;
  const response = clientTranslate(ns);
  const toolCall = response.choices[0].message.tool_calls[0];
  const fc = followUp(toolCall, CONNECTION_ID);
  assert.ok(fc, "functionCall must survive in history");
  assert.equal(fc.thoughtSignature, SIGNATURE);
});

test("#17912 control: with no namespace on either side the signature still round-trips", () => {
  const response = clientTranslate(null);
  const toolCall = response.choices[0].message.tool_calls[0];
  const fc = followUp(toolCall, null);
  assert.ok(fc);
  assert.equal(fc.thoughtSignature, SIGNATURE);
});
