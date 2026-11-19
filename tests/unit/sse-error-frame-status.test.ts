/**
 * An upstream that answers 200 `text/event-stream` with only an error frame
 * (`data: {"error":{"message":"slow down","status":429}}`) used to become a flat 502. The
 * frame's own 4xx/5xx status must survive so combo fallback and client retry treat a 429 as a
 * rate limit. A frame with no usable status keeps the 502 default.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { parseNonStreamingResponseBody } from "../../open-sse/handlers/chatCore/nonStreamingResponseParse.ts";
import { runNonStreamingProviderLeg } from "../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts";
import { baseInput } from "./_helpers/nonStreamingProviderLegFixtures.ts";

const frame = (error: unknown) => `data: ${JSON.stringify({ error })}\n\ndata: [DONE]\n\n`;

function eventStream(body: string): Response {
  return new Response(body, { headers: { "content-type": "text/event-stream" } });
}

function parse(body: string) {
  return parseNonStreamingResponseBody({
    providerResponse: eventStream(body),
    upstreamStream: false,
    providerHeaders: null,
    finalBody: null,
    targetFormat: "openai",
    model: "m",
  });
}

async function runLeg(body: string) {
  return runNonStreamingProviderLeg(
    baseInput({
      executeProviderRequest: async () => ({
        response: eventStream(body),
        url: "https://api.example.com/v1/chat/completions",
        headers: {},
        transformedBody: null,
      }),
    })
  );
}

test("parser carries the status of an SSE error frame", async () => {
  const parsed = await parse(frame({ message: "slow down", status: 429 }));
  assert.equal(parsed.kind, "invalid_sse");
  if (parsed.kind !== "invalid_sse") return;
  assert.equal(parsed.message, "slow down");
  assert.equal(parsed.status, 429);
});

test("a numeric error.code in 400-599 is the status when error.status is absent", async () => {
  const parsed = await parse(frame({ message: "bad", code: 400 }));
  assert.equal(parsed.kind, "invalid_sse");
  if (parsed.kind !== "invalid_sse") return;
  assert.equal(parsed.status, 400);
});

test("a status outside 400-599 or a non-numeric one is ignored", async () => {
  for (const error of [
    { message: "x", status: 200 },
    { message: "x", status: 700 },
    { message: "x", status: "429" },
    { message: "x", code: "rate_limited" },
    "plain string error",
  ]) {
    const parsed = await parse(frame(error));
    assert.equal(parsed.kind, "invalid_sse", JSON.stringify(error));
    if (parsed.kind !== "invalid_sse") return;
    assert.equal(parsed.status, undefined, JSON.stringify(error));
  }
});

test("leg answers with the frame status, receipt included", async () => {
  const result = await runLeg(frame({ message: "slow down", status: 429 }));
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 429);
  assert.equal(result.receipt.httpStatus, 429);
  assert.equal(result.result.errorCode, "invalid_sse_payload");
});

test("leg keeps 502 when the frame has no status", async () => {
  const result = await runLeg(frame({ message: "Devin CLI not found" }));
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 502);
  assert.equal(result.receipt.httpStatus, 502);
});

test("the frame message is still sanitized", async () => {
  const parsed = await parse(
    frame({ message: "boom at /home/dev/app/server.ts:10:5", status: 503 })
  );
  assert.equal(parsed.kind, "invalid_sse");
  if (parsed.kind !== "invalid_sse") return;
  assert.equal(parsed.status, 503);
  assert.doesNotMatch(parsed.message, /server\.ts/);
});

test("the empty-content fallback leg also keeps the frame status", async () => {
  let calls = 0;
  const result = await runNonStreamingProviderLeg(
    baseInput({
      clientHeaders: { "x-omniroute-allow-cross-version-fallback": "true" },
      allowModelFallback: true,
      provider: "gemini",
      model: "gemini-3-pro",
      executeProviderRequest: async () => {
        calls++;
        if (calls === 1) {
          return {
            response: new Response(
              JSON.stringify({
                id: "c1",
                choices: [{ message: { role: "assistant", content: "" }, finish_reason: "stop" }],
                usage: { prompt_tokens: 1, completion_tokens: 0, total_tokens: 1 },
              }),
              { headers: { "content-type": "application/json" } }
            ),
            url: "https://api.example.com/v1/chat/completions",
            headers: {},
            transformedBody: null,
          };
        }
        return {
          response: eventStream(frame({ message: "slow down", status: 429 })),
          url: "https://api.example.com/v1/chat/completions",
          headers: {},
          transformedBody: null,
        };
      },
    })
  );
  assert.ok(calls >= 2, "the fallback model must be tried");
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 429);
  assert.equal(result.receipt.httpStatus, 429);
});
