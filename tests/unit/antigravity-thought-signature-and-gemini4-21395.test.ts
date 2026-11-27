/**
 * Regression tests for #21395:
 *   1. Antigravity non-streaming SSE collection (`collectStreamToResponse` /
 *      `processAntigravitySSEPayload`) must capture and persist `thoughtSignature`
 *      for native `functionCall` parts scoped by `(accountId, model)`.
 *   2. `openaiToAntigravityRequest` / `openaiToCloudCodeGeminiRequest` must treat
 *      `gemini-4-*` as thinking Gemini, respect `signaturelessToolCallMode: "context"`
 *      instead of unconditionally injecting `skip_thought_signature_validator`, and
 *      emit unsigned parallel sibling `functionCall` parts natively (without the
 *      sentinel) when an earlier `functionCall` in the same turn has a real signature.
 *   3. `isGeminiTrailingModelTurnRejectingModel` must cover `gemini-4-*` (excluding
 *      image models) so trailing assistant/model turns are stripped before upstream.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-21395-agy-sig-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { AntigravityExecutor, processAntigravitySSEPayload } =
  await import("../../open-sse/executors/antigravity.ts");
const { openaiToAntigravityRequest, openaiToCloudCodeGeminiRequest, openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { isGeminiTrailingModelTurnRejectingModel } =
  await import("../../open-sse/translator/helpers/geminiTrailingModelTurn.ts");
const {
  buildGeminiThoughtSignatureKey,
  clearGeminiThoughtSignatures,
  getGeminiThoughtSignature,
  scopeGeminiThoughtSignatureNamespace,
  storeGeminiThoughtSignature,
} = await import("../../open-sse/services/geminiThoughtSignatureStore.ts");

import type { AntigravityCollectedStream } from "../../open-sse/executors/antigravity/sseCollect.ts";

type GeminiPart = {
  text?: string;
  thoughtSignature?: string;
  functionCall?: { id?: string; name?: string; args?: Record<string, unknown> };
  functionResponse?: { id?: string; name?: string; response?: { result?: unknown } };
};
type GeminiContent = { role: string; parts: GeminiPart[] };
type AntigravityEnvelope = { request: { contents: GeminiContent[] } };

const WEATHER_TOOL = {
  type: "function",
  function: {
    name: "get_weather",
    description: "Get weather",
    parameters: {
      type: "object",
      properties: { city: { type: "string" } },
      required: ["city"],
    },
  },
};

function makeCollected(signatureNamespace?: string | null): AntigravityCollectedStream {
  return {
    textContent: "",
    finishReason: "",
    toolCalls: [],
    usage: null,
    remainingCredits: null,
    ...(signatureNamespace !== undefined ? { signatureNamespace } : {}),
  };
}

function makeSseResponse(events: unknown[]): Response {
  const bodyText =
    events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join("") + "data: [DONE]\n\n";
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(bodyText));
      controller.close();
    },
  });
  return new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

test.beforeEach(() => {
  clearGeminiThoughtSignatures();
});

test.after(() => {
  clearGeminiThoughtSignatures();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("processAntigravitySSEPayload persists thoughtSignature on functionCall and clears it before parallel sibling", () => {
  const ns = scopeGeminiThoughtSignatureNamespace("conn-21395-a", "gemini-4-hydrogen-medium");
  const collected = makeCollected(ns);

  processAntigravitySSEPayload(
    JSON.stringify({
      response: {
        candidates: [
          {
            content: {
              parts: [
                {
                  thoughtSignature: "SIG_PARALLEL_FIRST",
                  functionCall: { id: "call_p1", name: "get_weather", args: { city: "Tokyo" } },
                },
                {
                  functionCall: { id: "call_p2", name: "get_weather", args: { city: "Paris" } },
                },
              ],
            },
            finishReason: "STOP",
          },
        ],
      },
    }),
    collected
  );

  assert.equal(collected.toolCalls.length, 2);
  assert.equal(
    getGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, "call_p1")),
    "SIG_PARALLEL_FIRST",
    "first functionCall must persist its real thoughtSignature"
  );
  assert.equal(
    getGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, "call_p2")),
    null,
    "parallel sibling without its own signature must not inherit a stale pending signature"
  );
});

test("processAntigravitySSEPayload binds preceding thought/standalone thought_signature to the next functionCall", () => {
  const ns = scopeGeminiThoughtSignatureNamespace("conn-21395-b", "gemini-3.8-flash-high");
  const collected = makeCollected(ns);

  processAntigravitySSEPayload(
    JSON.stringify({
      response: {
        candidates: [
          {
            content: {
              parts: [
                { thought: true, text: "thinking...", thought_signature: "SIG_FROM_THOUGHT" },
              ],
            },
          },
        ],
      },
    }),
    collected
  );

  processAntigravitySSEPayload(
    JSON.stringify({
      response: {
        candidates: [
          {
            content: {
              parts: [
                {
                  functionCall: {
                    id: "call_after_thought",
                    name: "get_weather",
                    args: { city: "NYC" },
                  },
                },
              ],
            },
            finishReason: "STOP",
          },
        ],
      },
    }),
    collected
  );

  assert.equal(
    getGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, "call_after_thought")),
    "SIG_FROM_THOUGHT"
  );
});

test("non-streaming collectStreamToResponse persists thoughtSignature and Turn 2 replays it natively with parallel sibling", async () => {
  const accountId = "conn-21395-roundtrip";
  const model = "gemini-4-hydrogen-medium";
  const executor = new AntigravityExecutor();

  const upstreamSse = makeSseResponse([
    {
      response: {
        candidates: [
          {
            content: {
              parts: [
                { thought: true, text: "Need both cities" },
                {
                  thoughtSignature: "REAL_TURN1_SIG",
                  functionCall: { id: "call_rt_1", name: "get_weather", args: { city: "Tokyo" } },
                },
                {
                  functionCall: { id: "call_rt_2", name: "get_weather", args: { city: "Osaka" } },
                },
              ],
            },
            finishReason: "STOP",
          },
        ],
      },
    },
  ]);

  const collectedResult = await executor.collectStreamToResponse(
    upstreamSse,
    model,
    "https://cloudcode-pa.googleapis.com/v1internal:streamGenerateContent?alt=sse",
    {},
    {},
    null,
    null,
    accountId
  );

  const completion = (await collectedResult.response.json()) as {
    choices: Array<{ message: { tool_calls: Array<{ id: string }> } }>;
  };
  assert.deepEqual(
    completion.choices[0].message.tool_calls.map((tc) => tc.id),
    ["call_rt_1", "call_rt_2"]
  );

  const scopedNs = scopeGeminiThoughtSignatureNamespace(accountId, model);
  assert.equal(
    getGeminiThoughtSignature(buildGeminiThoughtSignatureKey(scopedNs, "call_rt_1")),
    "REAL_TURN1_SIG",
    "collectStreamToResponse must persist thoughtSignature under scoped (accountId, model) namespace"
  );

  // Turn 2: replay both parallel tool calls + their tool responses on the same connection.
  const turn2 = openaiToAntigravityRequest(
    model,
    {
      messages: [
        { role: "user", content: "Compare Tokyo and Osaka weather" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_rt_1",
              type: "function",
              function: { name: "get_weather", arguments: '{"city":"Tokyo"}' },
            },
            {
              id: "call_rt_2",
              type: "function",
              function: { name: "get_weather", arguments: '{"city":"Osaka"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_rt_1", content: '{"temp":20}' },
        { role: "tool", tool_call_id: "call_rt_2", content: '{"temp":22}' },
      ],
      tools: [WEATHER_TOOL],
    },
    false,
    { projectId: "proj-21395", _signatureNamespace: scopedNs } as never
  ) as AntigravityEnvelope;

  const modelTurn = turn2.request.contents.find(
    (c) => c.role === "model" && c.parts.some((p) => p.functionCall)
  );
  assert.ok(modelTurn, "Turn 2 must emit a native model turn");
  const fcParts = modelTurn.parts.filter((p) => p.functionCall);
  assert.equal(fcParts.length, 2, "both parallel functionCalls must be emitted natively");
  assert.equal(fcParts[0].thoughtSignature, "REAL_TURN1_SIG");
  assert.equal(
    fcParts[1].thoughtSignature,
    undefined,
    "parallel sibling must not receive skip_thought_signature_validator sentinel"
  );

  const frParts = turn2.request.contents
    .filter((c) => c.role === "user")
    .flatMap((c) => c.parts)
    .filter((p) => p.functionResponse);
  assert.equal(frParts.length, 2, "both parallel functionResponses must be emitted natively");
  assert.equal(
    JSON.stringify(turn2.request.contents).includes("skip_thought_signature_validator"),
    false
  );
  assert.equal(
    JSON.stringify(turn2.request.contents).includes("previous_tool_result_context"),
    false
  );
});

test("openaiToAntigravityRequest uses context fallback (no sentinel) for signatureless gemini-4 and gemini-3.8-flash turns", () => {
  for (const model of ["gemini-4-hydrogen-medium", "gemini-3.8-flash-high"]) {
    const envelope = openaiToAntigravityRequest(
      model,
      {
        messages: [
          { role: "user", content: "Check weather" },
          {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: `call_unsigned_${model}`,
                type: "function",
                function: { name: "get_weather", arguments: '{"city":"Berlin"}' },
              },
            ],
          },
          { role: "tool", tool_call_id: `call_unsigned_${model}`, content: '{"temp":14}' },
        ],
        tools: [WEATHER_TOOL],
      },
      false,
      { projectId: "proj-21395", _signatureNamespace: "conn-uncached:gemini" } as never
    ) as AntigravityEnvelope;

    const serialized = JSON.stringify(envelope.request.contents);
    assert.equal(
      serialized.includes("skip_thought_signature_validator"),
      false,
      `${model} must not inject skip_thought_signature_validator when signature is missing`
    );
    assert.equal(
      envelope.request.contents.some((c) => c.parts.some((p) => p.functionCall)),
      false,
      `${model} must omit signatureless native functionCall`
    );
    assert.equal(
      serialized.includes("previous_tool_result_context"),
      true,
      `${model} must represent signatureless tool output as <previous_tool_result_context>`
    );
  }
});

test("openaiToCloudCodeGeminiRequest respects signaturelessToolCallMode: context by disabling bypass unless overridden", () => {
  const req = openaiToCloudCodeGeminiRequest(
    "gemini-4-hydrogen-medium",
    {
      messages: [
        { role: "user", content: "Check weather" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_ctx_only",
              type: "function",
              function: { name: "get_weather", arguments: '{"city":"Rome"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_ctx_only", content: '{"temp":25}' },
      ],
      tools: [WEATHER_TOOL],
    },
    false,
    { signaturelessToolCallMode: "context" }
  ) as { contents: GeminiContent[] };

  const serialized = JSON.stringify(req.contents);
  assert.equal(serialized.includes("skip_thought_signature_validator"), false);
  assert.equal(serialized.includes("previous_tool_result_context"), true);
});

test("gemini-4-* models strip trailing model turns while keeping gemini-4 image models untouched", () => {
  assert.equal(isGeminiTrailingModelTurnRejectingModel("gemini-4-hydrogen-medium"), true);
  assert.equal(isGeminiTrailingModelTurnRejectingModel("gemini-4-argon-high"), true);
  assert.equal(isGeminiTrailingModelTurnRejectingModel("gemini-4.0-pro"), true);
  assert.equal(isGeminiTrailingModelTurnRejectingModel("agy/gemini-4-hydrogen-medium"), true);
  assert.equal(isGeminiTrailingModelTurnRejectingModel("gemini-4-pro-image"), false);

  const prefillBody = {
    messages: [
      { role: "user", content: "Say hello" },
      { role: "assistant", content: "Sure, here is" },
    ],
  };

  const agy = openaiToAntigravityRequest("gemini-4-hydrogen-medium", prefillBody, false, {
    projectId: "proj-21395",
  } as never) as AntigravityEnvelope;
  assert.equal(agy.request.contents[agy.request.contents.length - 1]?.role, "user");

  const direct = openaiToGeminiRequest("gemini-4-hydrogen-medium", prefillBody, false) as {
    contents: GeminiContent[];
  };
  assert.equal(direct.contents[direct.contents.length - 1]?.role, "user");
});

test("ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS=1 explicitly re-enables sentinel for unsigned turns but still skips it for signed parallel siblings", () => {
  const prev = process.env.ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS;
  process.env.ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS = "1";
  try {
    const ns = "conn-21395-bypass:gemini";
    storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, "call_b1"), "REAL_SIG_B1");

    const signedParallel = openaiToAntigravityRequest(
      "gemini-4-hydrogen-medium",
      {
        messages: [
          { role: "user", content: "Two cities" },
          {
            role: "assistant",
            tool_calls: [
              {
                id: "call_b1",
                type: "function",
                function: { name: "get_weather", arguments: "{}" },
              },
              {
                id: "call_b2",
                type: "function",
                function: { name: "get_weather", arguments: "{}" },
              },
            ],
          },
          { role: "tool", tool_call_id: "call_b1", content: "20C" },
          { role: "tool", tool_call_id: "call_b2", content: "21C" },
        ],
        tools: [WEATHER_TOOL],
      },
      false,
      { projectId: "proj-21395", _signatureNamespace: ns } as never
    ) as AntigravityEnvelope;

    const fcParts = signedParallel.request.contents
      .filter((c) => c.role === "model")
      .flatMap((c) => c.parts)
      .filter((p) => p.functionCall);
    assert.equal(fcParts.length, 2);
    assert.equal(fcParts[0].thoughtSignature, "REAL_SIG_B1");
    assert.equal(fcParts[1].thoughtSignature, undefined);
  } finally {
    if (prev === undefined) delete process.env.ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS;
    else process.env.ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS = prev;
  }
});

test("processAntigravitySSEPayload generates distinct fallback IDs for ID-less calls so stored signatures do not collide", () => {
  const ns = scopeGeminiThoughtSignatureNamespace("conn-21395-uniq", "gemini-4-hydrogen-medium");
  const c1 = makeCollected(ns);
  const c2 = makeCollected(ns);

  const makePayload = (sig: string) =>
    JSON.stringify({
      response: {
        candidates: [
          {
            content: {
              parts: [
                {
                  thoughtSignature: sig,
                  functionCall: { name: "get_weather", args: { city: "Tokyo" } },
                },
              ],
            },
            finishReason: "STOP",
          },
        ],
      },
    });

  processAntigravitySSEPayload(makePayload("SIG_COLLISION_1"), c1);
  processAntigravitySSEPayload(makePayload("SIG_COLLISION_2"), c2);

  const id1 = c1.toolCalls[0].id;
  const id2 = c2.toolCalls[0].id;
  assert.notEqual(id1, id2, "generated tool-call IDs must be unique across concurrent collections");
  assert.equal(
    getGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, id1)),
    "SIG_COLLISION_1"
  );
  assert.equal(
    getGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, id2)),
    "SIG_COLLISION_2"
  );
});

test("mixed unsigned-then-signed assistant turn places context text before native functionResponse in user turn", () => {
  const ns = "conn-21395-mixed:gemini";
  storeGeminiThoughtSignature(
    buildGeminiThoughtSignatureKey(ns, "call_signed_second"),
    "SIG_MIXED_2"
  );

  const envelope = openaiToAntigravityRequest(
    "gemini-4-hydrogen-medium",
    {
      messages: [
        { role: "user", content: "Run both tools" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_unsigned_first",
              type: "function",
              function: { name: "get_weather", arguments: '{"city":"Paris"}' },
            },
            {
              id: "call_signed_second",
              type: "function",
              function: { name: "get_weather", arguments: '{"city":"Tokyo"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_unsigned_first", content: "Paris 18C" },
        { role: "tool", tool_call_id: "call_signed_second", content: "Tokyo 22C" },
      ],
      tools: [WEATHER_TOOL],
    },
    false,
    { projectId: "proj-21395", _signatureNamespace: ns } as never
  ) as AntigravityEnvelope;

  const userTurnWithResp = envelope.request.contents.find(
    (c) => c.role === "user" && c.parts.some((p) => p.functionResponse)
  );
  assert.ok(userTurnWithResp, "expected a user turn containing the signed functionResponse");
  const contextIdx = userTurnWithResp.parts.findIndex(
    (p) => typeof p.text === "string" && p.text.includes("previous_tool_result_context")
  );
  const frIdx = userTurnWithResp.parts.findIndex((p) => Boolean(p.functionResponse));
  assert.ok(contextIdx >= 0, "unsigned tool result must be preserved as context text");
  assert.ok(frIdx >= 0, "signed tool result must remain a native functionResponse");
  assert.ok(
    contextIdx < frIdx,
    "non-functionResponse context text must precede native functionResponse parts"
  );
});

test("unsigned tool result with image media preserves inlineData alongside context text", () => {
  const pngBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  const envelope = openaiToAntigravityRequest(
    "gemini-4-hydrogen-medium",
    {
      messages: [
        { role: "user", content: "Take a screenshot" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_unsigned_img",
              type: "function",
              function: { name: "screenshot", arguments: "{}" },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_unsigned_img",
          content: [
            { type: "text", text: "Captured screen" },
            { type: "image_url", image_url: { url: `data:image/png;base64,${pngBase64}` } },
          ],
        },
      ],
      tools: [
        {
          type: "function",
          function: { name: "screenshot", parameters: { type: "object", properties: {} } },
        },
      ],
    },
    false,
    { projectId: "proj-21395", _signatureNamespace: "conn-21395-img:gemini" } as never
  ) as AntigravityEnvelope;

  assert.equal(
    envelope.request.contents.some((c) => c.parts.some((p) => p.functionCall)),
    false,
    "unsigned functionCall must remain omitted"
  );
  const allUserParts = envelope.request.contents
    .filter((c) => c.role === "user")
    .flatMap((c) => c.parts as Array<Record<string, unknown>>);
  const inlineImg = allUserParts.find(
    (p) =>
      p.inlineData &&
      typeof p.inlineData === "object" &&
      (p.inlineData as { mimeType?: string; data?: string }).mimeType === "image/png" &&
      (p.inlineData as { data?: string }).data === pngBase64
  );
  assert.ok(inlineImg, "inlineData image media must be preserved for unsigned tool result");
  assert.ok(
    allUserParts.some(
      (p) =>
        typeof p.text === "string" &&
        p.text.includes("previous_tool_result_context") &&
        p.text.includes("Captured screen")
    ),
    "escaped context text must accompany the preserved media part"
  );
});
