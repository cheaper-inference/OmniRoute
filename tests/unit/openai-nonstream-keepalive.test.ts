/**
 * Non-streaming /v1/responses and /v1/chat/completions behind an idle-read proxy.
 *
 * Both routes sent no bytes until the whole answer was ready, so Cloudflare cut slow
 * answers with a 524 at ~120 s (a reasoning model producing 5-10k reasoning tokens took
 * 125-255 s). /v1/messages already wrapped its JSON answer in withEarlyJsonKeepalive;
 * these two routes now do the same whenever the client will receive JSON.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";
import { resolveClientStreamFlag } from "../../open-sse/utils/aiSdkCompat.ts";

const harness = await createChatPipelineHarness("openai-nonstream-keepalive");
const { POST: responsesPOST } = await import("../../src/app/api/v1/responses/route.ts");
const { POST: chatPOST } = await import("../../src/app/api/v1/chat/completions/route.ts");
const ORIGINAL_FETCH = globalThis.fetch;
const ORIGINAL_THRESHOLD = process.env.OMNIROUTE_NONSTREAM_KEEPALIVE_MS;

test.beforeEach(async () => {
  await harness.resetStorage();
  await harness.seedConnection("openai");
});
test.afterEach(() => {
  globalThis.fetch = ORIGINAL_FETCH;
  if (ORIGINAL_THRESHOLD === undefined) delete process.env.OMNIROUTE_NONSTREAM_KEEPALIVE_MS;
  else process.env.OMNIROUTE_NONSTREAM_KEEPALIVE_MS = ORIGINAL_THRESHOLD;
});
test.after(async () => await harness.cleanup());

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function slowUpstream(ms: number) {
  globalThis.fetch = async () => {
    await delay(ms);
    return harness.buildOpenAIResponse("OK", "gpt-4.1");
  };
}

test("/v1/responses non-streaming: a slow upstream gets keepalive bytes, then the response", async () => {
  process.env.OMNIROUTE_NONSTREAM_KEEPALIVE_MS = "50";
  slowUpstream(400);
  const response = await responsesPOST(
    harness.buildRequest({
      url: "http://localhost/v1/responses",
      headers: { "X-Correlation-Id": "slow-responses-123" },
      body: { model: "openai/gpt-4.1", input: "hi", stream: false },
    })
  );
  const wire = await response.text();
  assert.equal(response.status, 200, wire);
  assert.ok(wire.startsWith(" "), "the keepalive path must run before the body");
  const body = JSON.parse(wire);
  assert.equal(body.object, "response", wire);
  assert.match(JSON.stringify(body.output), /OK/);
  assert.equal(response.headers.get("x-correlation-id"), "slow-responses-123");
});

test("/v1/chat/completions non-streaming (stream omitted): keepalive bytes, then the completion", async () => {
  process.env.OMNIROUTE_NONSTREAM_KEEPALIVE_MS = "50";
  slowUpstream(400);
  const response = await chatPOST(
    harness.buildRequest({
      url: "http://localhost/v1/chat/completions",
      headers: { "X-Correlation-Id": "slow-chat-123" },
      body: { model: "openai/gpt-4.1", messages: [{ role: "user", content: "hi" }] },
    })
  );
  const wire = await response.text();
  assert.equal(response.status, 200, wire);
  assert.ok(wire.startsWith(" "), "the keepalive path must run before the body");
  const body = JSON.parse(wire);
  assert.equal(body.object, "chat.completion", wire);
  assert.equal(body.choices?.[0]?.message?.content, "OK");
  assert.equal(response.headers.get("x-correlation-id"), "slow-chat-123");
});

test("/v1/chat/completions non-streaming: a fast upstream is returned without padding", async () => {
  process.env.OMNIROUTE_NONSTREAM_KEEPALIVE_MS = "5000";
  slowUpstream(0);
  const response = await chatPOST(
    harness.buildRequest({
      url: "http://localhost/v1/chat/completions",
      body: {
        model: "openai/gpt-4.1",
        messages: [{ role: "user", content: "hi" }],
        stream: false,
      },
    })
  );
  const wire = await response.text();
  assert.equal(response.status, 200, wire);
  assert.ok(!wire.startsWith(" "), "a fast answer must not be padded");
  assert.equal(JSON.parse(wire).choices?.[0]?.message?.content, "OK");
});

test("resolveClientStreamFlag mirrors chatCore: aliases, Accept defaults, JSON-only clients", () => {
  const sse = "text/event-stream";
  // Explicit body flag wins.
  assert.equal(resolveClientStreamFlag({ stream: false }, sse, "openai"), false);
  assert.equal(resolveClientStreamFlag({ stream: true }, "*/*", "openai-responses"), true);
  // Non-standard aliases are applied before the flag, as chatCore does.
  assert.equal(resolveClientStreamFlag({ streaming: true }, "*/*", "openai"), true);
  assert.equal(resolveClientStreamFlag({ stream: true, non_stream: true }, "*/*", "openai"), false);
  // Omitted flag: OpenAI and Responses default to JSON unless SSE is the only Accept.
  assert.equal(resolveClientStreamFlag({}, "*/*", "openai"), false);
  assert.equal(resolveClientStreamFlag({}, sse, "openai"), true);
  assert.equal(resolveClientStreamFlag({}, "application/json, text/event-stream", "openai"), false);
  assert.equal(resolveClientStreamFlag({}, sse, "openai-responses"), true);
  // Known JSON-only client UA beats a streaming default (here the non-OpenAI fallback).
  assert.equal(resolveClientStreamFlag({}, "*/*", "gemini"), true);
  assert.equal(
    resolveClientStreamFlag({}, "*/*", "gemini", "Nextcloud OpenAI/LocalAI integration"),
    false
  );
  // Non-object bodies fall back to the Accept header.
  assert.equal(resolveClientStreamFlag(null, sse, "openai"), true);
  assert.equal(resolveClientStreamFlag("text", "*/*", "openai"), false);
});
