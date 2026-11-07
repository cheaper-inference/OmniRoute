import { test } from "node:test";
import assert from "node:assert/strict";

import { parseNonStreamingResponseBody } from "@omniroute/open-sse/handlers/chatCore/nonStreamingResponseParse.ts";

// Minimal Response stub: only the surface parseNonStreamingResponseBody touches
// (headers.get + text()). upstreamStream is passed false so readNonStreamingResponseBody
// always takes the buffered response.text() path.
function makeResponse(body: string, contentType: string): Response {
  return {
    headers: {
      get: (name: string) => (name.toLowerCase() === "content-type" ? contentType : null),
    },
    text: async () => body,
    body: null,
  } as unknown as Response;
}

const baseOpts = {
  upstreamStream: false,
  providerHeaders: null,
  finalBody: null,
  targetFormat: "openai",
  model: "gpt-4o-mini",
};

test("valid JSON body → ok with parsed object and targetFormat", async () => {
  const payload = { id: "x", choices: [{ message: { content: "hi" } }] };
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse(JSON.stringify(payload), "application/json"),
  });
  assert.equal(res.kind, "ok");
  if (res.kind !== "ok") return;
  assert.deepEqual(res.responseBody, payload);
  assert.equal(res.responsePayloadFormat, "openai");
  assert.equal(res.looksLikeSSE, false);
});

test("empty body (non-SSE) → ok with empty object", async () => {
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse("", "application/json"),
  });
  assert.equal(res.kind, "ok");
  if (res.kind !== "ok") return;
  assert.deepEqual(res.responseBody, {});
  assert.equal(res.looksLikeSSE, false);
});

test("invalid JSON → invalid_json with short message + detailed error", async () => {
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse("{not json", "application/json"),
  });
  assert.equal(res.kind, "invalid_json");
  if (res.kind !== "invalid_json") return;
  assert.equal(res.message, "Invalid JSON response from provider");
  assert.match(res.detailedError, /^Invalid JSON response from provider \(error: /);
  assert.match(res.detailedError, /\{not json/);
  assert.equal(res.looksLikeSSE, false);
});

test("valid JSON with a non-object root → invalid_json", async () => {
  for (const body of ["null", '"text"', "[]"]) {
    const res = await parseNonStreamingResponseBody({
      ...baseOpts,
      providerResponse: makeResponse(body, "application/json"),
    });
    assert.equal(res.kind, "invalid_json");
    if (res.kind !== "invalid_json") continue;
    assert.match(res.detailedError, /expected an object payload/);
  }
});

test("valid SSE payload (by content-type) → ok with SSE-derived format", async () => {
  const sse =
    'data: {"id":"c1","object":"chat.completion.chunk","choices":[{"delta":{"content":"hello"},"index":0,"finish_reason":null}]}\n\n' +
    'data: {"id":"c1","object":"chat.completion.chunk","choices":[{"delta":{},"index":0,"finish_reason":"stop"}]}\n\n' +
    "data: [DONE]\n\n";
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse(sse, "text/event-stream"),
  });
  assert.equal(res.kind, "ok");
  if (res.kind !== "ok") return;
  assert.equal(res.looksLikeSSE, true);
  assert.ok(res.responseBody && typeof res.responseBody === "object");
  assert.equal(typeof res.responsePayloadFormat, "string");
});

test("SSE detected by body heuristic even with non-stream content-type", async () => {
  const sse =
    'data: {"id":"c1","object":"chat.completion.chunk","choices":[{"delta":{"content":"hi"},"index":0,"finish_reason":"stop"}]}\n\n' +
    "data: [DONE]\n\n";
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse(sse, "text/plain"),
  });
  assert.equal(res.looksLikeSSE, true);
});

test("error-only SSE (no choices) → invalid_sse surfacing the upstream error (#3324)", async () => {
  const sse = 'data: {"error":{"message":"Devin CLI not found in PATH"}}\n\n';
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse(sse, "text/event-stream"),
  });
  assert.equal(res.kind, "invalid_sse");
  if (res.kind !== "invalid_sse") return;
  assert.equal(res.message, "Devin CLI not found in PATH");
  assert.equal(res.looksLikeSSE, true);
});

test("buffered Responses tool and image output survive cross-format detection", async () => {
  const output = [
    { type: "function_call", id: "fc_test", call_id: "call_test", name: "lookup", arguments: "{}" },
    { type: "image_generation_call", id: "img_test", status: "completed", result: "fixture-image" },
  ];
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse(
      `data: ${JSON.stringify({
        type: "response.completed",
        response: { id: "resp_test", object: "response", status: "completed", output },
      })}\n\n`,
      "text/event-stream"
    ),
  });
  assert.equal(res.kind, "ok");
  if (res.kind !== "ok") return;
  assert.equal(res.responsePayloadFormat, "openai-responses");
  assert.deepEqual(res.responseBody.output, [output[0], { ...output[1], call_id: undefined }]);
});

for (const frames of [
  [{ type: "error", error: { message: "Responses failed" } }],
  [
    { type: "response.created", response: { id: "resp_failed", object: "response", output: [] } },
    { error: { message: "Responses failed" } },
  ],
]) {
  test(`identified Responses failure retains its error (${frames.length} frames)`, async () => {
    const res = await parseNonStreamingResponseBody({
      ...baseOpts,
      providerResponse: makeResponse(
        frames.map((frame) => `data: ${JSON.stringify(frame)}\n\n`).join(""),
        "text/event-stream"
      ),
    });
    assert.equal(res.kind, "ok");
    if (res.kind !== "ok") return;
    assert.equal(res.responsePayloadFormat, "openai-responses");
    assert.equal(res.responseBody.status, "failed");
    assert.deepEqual(res.responseBody.error, { message: "Responses failed" });
  });
}

test("error-only SSE message is sanitized before returning the failure", async () => {
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse(
      `data: ${JSON.stringify({ error: { message: "Failure\n    at run (/app/private/server.js:1:2)" } })}\n\n`,
      "text/event-stream"
    ),
  });
  assert.equal(res.kind, "invalid_sse");
  if (res.kind !== "invalid_sse") return;
  assert.ok(!res.message.includes("/app/private/server.js"));
  assert.ok(!res.message.includes("at run"));
});

test("unparseable SSE with no embedded error → generic invalid_sse message", async () => {
  const sse = "data: not-json-at-all\n\n";
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse(sse, "text/event-stream"),
  });
  assert.equal(res.kind, "invalid_sse");
  if (res.kind !== "invalid_sse") return;
  assert.equal(res.message, "Invalid SSE response for non-streaming request");
});

test("normalizedProviderPayload is present on every branch", async () => {
  const ok = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse('{"a":1}', "application/json"),
  });
  assert.ok("normalizedProviderPayload" in ok);
  const bad = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse("{bad", "application/json"),
  });
  assert.ok("normalizedProviderPayload" in bad);
});

test("buffering log fires debug when stream was expected, warn otherwise", async () => {
  const sse =
    'data: {"id":"c1","object":"chat.completion.chunk","choices":[{"delta":{"content":"hi"},"index":0,"finish_reason":"stop"}]}\n\n' +
    "data: [DONE]\n\n";
  const debugCalls: string[] = [];
  const warnCalls: string[] = [];
  const log = {
    debug: (_tag: string, msg: string) => debugCalls.push(msg),
    warn: (_tag: string, msg: string) => warnCalls.push(msg),
  };

  // upstreamStream=true → expected → debug path
  await parseNonStreamingResponseBody({
    ...baseOpts,
    upstreamStream: true,
    providerResponse: makeResponse(sse, "text/event-stream"),
    log,
  });
  assert.equal(debugCalls.length, 1);
  assert.equal(warnCalls.length, 0);

  // upstreamStream=false + no accept/stream hints → unexpected → warn path
  await parseNonStreamingResponseBody({
    ...baseOpts,
    upstreamStream: false,
    providerResponse: makeResponse(sse, "text/event-stream"),
    log,
  });
  assert.equal(warnCalls.length, 1);
});

for (const wrapped of [false, true]) {
  test(`buffered ${wrapped ? "wrapped" : "native"} Gemini SSE reaches the non-streaming response caller`, async () => {
    const payload = {
      candidates: [{ content: { parts: [{ text: "hello Gemini" }] }, finishReason: "STOP" }],
      usageMetadata: { promptTokenCount: 3, candidatesTokenCount: 2, totalTokenCount: 5 },
    };
    const response = new Response(
      `data: ${JSON.stringify(wrapped ? { response: payload } : payload)}\n\n`,
      {
        headers: { "content-type": "text/event-stream" },
      }
    );
    const result = await parseNonStreamingResponseBody({
      ...baseOpts,
      targetFormat: "gemini",
      providerResponse: response,
    });
    assert.equal(result.kind, "ok");
    if (result.kind !== "ok") return;
    assert.equal(result.looksLikeSSE, true);
    assert.equal(result.responseBody.choices[0].message.content, "hello Gemini");
    assert.deepEqual(result.responseBody.usage, {
      prompt_tokens: 3,
      completion_tokens: 2,
      total_tokens: 5,
    });
  });
}
