// A forced-streaming upstream answering a non-streaming client can return one complete JSON
// response document (chat.completion, Responses `response`, Claude `message`, or a structured
// error) labelled `Content-Type: text/event-stream`, sometimes with a `data: [DONE]` glued to
// the closing brace. No line starts with `data:`, so the buffered-SSE parsers found nothing and
// the client got a 502 `invalid_sse` (and a combo skipped a target that had answered). The body
// must be read as the non-stream response it is; genuinely corrupt SSE keeps the 502.
import { test } from "node:test";
import assert from "node:assert/strict";

import { parseNonStreamingResponseBody } from "../../open-sse/handlers/chatCore/nonStreamingResponseParse.ts";
import { runNonStreamingProviderLeg } from "../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts";
import { baseInput } from "./_helpers/nonStreamingProviderLegFixtures.ts";

const GENERIC_INVALID_SSE = "Invalid SSE response for non-streaming request";

const CHAT_DOC = {
  id: "chatcmpl-doc",
  object: "chat.completion",
  created: 1700000000,
  model: "deepseek-v4.1-flash",
  choices: [
    {
      index: 0,
      finish_reason: "stop",
      message: { role: "assistant", content: "ok", reasoning_content: "" },
    },
  ],
  usage: { prompt_tokens: 404, completion_tokens: 2, total_tokens: 406 },
};

function eventStream(body: string): Response {
  return new Response(body, { headers: { "content-type": "text/event-stream" } });
}

function chunkedEventStream(parts: string[]): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const part of parts) controller.enqueue(encoder.encode(part));
      controller.close();
    },
  });
  return new Response(stream, { headers: { "content-type": "text/event-stream" } });
}

function parse(providerResponse: Response, targetFormat = "openai", upstreamStream = false) {
  return parseNonStreamingResponseBody({
    providerResponse,
    upstreamStream,
    providerHeaders: null,
    finalBody: null,
    targetFormat,
    model: "fallback-model",
  });
}

for (const [label, body] of [
  ["bare document", JSON.stringify(CHAT_DOC)],
  ["document with a glued data: [DONE]", `${JSON.stringify(CHAT_DOC)}data: [DONE]\n\n`],
  ["document followed by a data: [DONE] frame", `${JSON.stringify(CHAT_DOC)}\n\ndata: [DONE]\n\n`],
  ["pretty-printed document", `\n${JSON.stringify(CHAT_DOC, null, 2)}\n`],
] as const) {
  test(`chat.completion ${label} behind text/event-stream -> ok non-stream body`, async () => {
    const res = await parse(eventStream(body));
    assert.equal(res.kind, "ok");
    if (res.kind !== "ok") return;
    assert.equal(res.responsePayloadFormat, "openai");
    assert.equal(res.looksLikeSSE, true);
    assert.deepEqual(res.responseBody, CHAT_DOC);
  });
}

test("chat.completion drained from a chunked forced-stream upstream -> ok", async () => {
  const body = `${JSON.stringify(CHAT_DOC)}data: [DONE]\n\n`;
  const res = await parse(
    chunkedEventStream([body.slice(0, 40), body.slice(40, 120), body.slice(120)]),
    "openai",
    true
  );
  assert.equal(res.kind, "ok");
  if (res.kind !== "ok") return;
  assert.equal(
    (res.responseBody.choices as Array<{ message: { content: string } }>)[0].message.content,
    "ok"
  );
});

test("Responses document behind text/event-stream -> ok, labelled openai-responses", async () => {
  const doc = {
    id: "resp_doc",
    object: "response",
    status: "completed",
    output: [
      { type: "message", role: "assistant", content: [{ type: "output_text", text: "ok" }] },
    ],
  };
  const res = await parse(eventStream(JSON.stringify(doc)), "openai");
  assert.equal(res.kind, "ok");
  if (res.kind !== "ok") return;
  assert.equal(res.responsePayloadFormat, "openai-responses");
  assert.deepEqual(res.responseBody, doc);
});

test("Claude message document behind text/event-stream -> ok, labelled claude", async () => {
  const doc = {
    id: "msg_doc",
    type: "message",
    role: "assistant",
    model: "claude-x",
    content: [{ type: "text", text: "ok" }],
    stop_reason: "end_turn",
    usage: { input_tokens: 3, output_tokens: 1 },
  };
  const res = await parse(eventStream(JSON.stringify(doc)), "claude");
  assert.equal(res.kind, "ok");
  if (res.kind !== "ok") return;
  assert.equal(res.responsePayloadFormat, "claude");
  assert.deepEqual(res.responseBody, doc);
});

test("structured error document behind text/event-stream -> handled as a non-stream body", async () => {
  const doc = { error: { message: "Rate limit reached", type: "rate_limit_error" } };
  const res = await parse(eventStream(JSON.stringify(doc)), "openai");
  // Same outcome as the identical body served as application/json: the error envelope reaches
  // the caller intact instead of being replaced by the generic invalid-SSE 502.
  assert.equal(res.kind, "ok");
  if (res.kind !== "ok") return;
  assert.equal(res.responsePayloadFormat, "openai");
  assert.deepEqual(res.responseBody, doc);
});

for (const [label, body] of [
  ["truncated JSON document", JSON.stringify(CHAT_DOC).slice(0, 60)],
  ["JSON object that is not a response", '{"foo":"bar"}'],
  ["bare chunk without data: framing", '{"choices":[{"index":0,"delta":{"content":"hi"}}]}'],
  ["JSON document followed by garbage", `${JSON.stringify(CHAT_DOC)}\ngarbage`],
  ["unparseable data: frame", "data: not-json-at-all\n\n"],
] as const) {
  test(`corrupt SSE (${label}) still fails as invalid_sse`, async () => {
    const res = await parse(eventStream(body));
    assert.equal(res.kind, "invalid_sse");
    if (res.kind !== "invalid_sse") return;
    assert.equal(res.message, GENERIC_INVALID_SSE);
  });
}

function legWith(body: string) {
  return baseInput({
    executeProviderRequest: async () => ({
      response: {
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers({ "content-type": "text/event-stream" }),
        text: async () => body,
        body: null,
      } as unknown as Response,
      url: "https://api.example.com/v1/chat/completions",
      headers: {},
      transformedBody: null,
    }),
  });
}

test("provider leg: chat.completion behind text/event-stream returns ok, not 502", async () => {
  const result = await runNonStreamingProviderLeg(
    legWith(`${JSON.stringify(CHAT_DOC)}data: [DONE]\n\n`)
  );
  assert.equal(result.kind, "ok");
  if (result.kind !== "ok") return;
  assert.equal(result.response.choices[0].message.content, "ok");
  assert.equal(result.receipt.httpStatus, 200);
  assert.equal(result.usage?.prompt_tokens, 404);
});

test("provider leg: corrupt event-stream body keeps the 502 invalid_sse_payload", async () => {
  const result = await runNonStreamingProviderLeg(legWith(JSON.stringify(CHAT_DOC).slice(0, 60)));
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 502);
  assert.equal(result.result.errorCode, "invalid_sse_payload");
});
