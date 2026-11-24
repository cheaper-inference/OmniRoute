/**
 * Non-streaming /v1/messages behind an idle-read proxy (Cloudflare 524).
 *
 * A non-streaming request sent no bytes until the whole answer was ready, so a
 * reverse proxy with a ~100-120 s read timeout (Cloudflare) cut slow answers with
 * a 524 — Claude Code's non-streaming retry after a failed stream hit this on
 * slow Opus turns. withEarlyJsonKeepalive commits to a 200 after a threshold and
 * writes JSON-insignificant whitespace until the real body arrives.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";
import {
  withEarlyJsonKeepalive,
  resolveJsonKeepaliveThresholdMs,
  DEFAULT_JSON_KEEPALIVE_THRESHOLD_MS,
} from "../../open-sse/utils/earlyJsonKeepalive.ts";

const harness = await createChatPipelineHarness("messages-nonstream-keepalive");
const { POST } = await import("../../src/app/api/v1/messages/route.ts");
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
const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

test("fast handler: the response is returned verbatim, status included", async () => {
  const original = jsonResponse({ type: "error", error: { type: "api_error" } }, 503);
  const response = await withEarlyJsonKeepalive(Promise.resolve(original), { thresholdMs: 200 });
  assert.equal(response, original);
  assert.equal(response.status, 503);
});

test("slow handler: 200 opens early, whitespace keeps it alive, body is the real JSON", async () => {
  const message = { type: "message", content: [{ type: "text", text: "ok" }] };
  const handler = delay(700).then(() => jsonResponse(message));
  const response = await withEarlyJsonKeepalive(handler, { thresholdMs: 10, intervalMs: 250 });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /^application\/json/);
  assert.match(response.headers.get("cache-control") || "", /no-transform/);
  assert.equal(response.headers.get("x-accel-buffering"), "no");
  const wire = await response.text();
  const padding = wire.length - wire.trimStart().length;
  assert.ok(
    padding >= 2,
    `expected the first byte plus at least one interval byte, got ${padding}`
  );
  assert.deepEqual(JSON.parse(wire), message);
});

test("slow handler error: the error JSON is delivered under the committed 200", async () => {
  const error = { type: "error", error: { type: "api_error", message: "all targets failed" } };
  const handler = delay(60).then(() => jsonResponse(error, 504));
  const response = await withEarlyJsonKeepalive(handler, { thresholdMs: 10 });
  assert.equal(response.status, 200);
  assert.deepEqual(JSON.parse(await response.text()), error);
});

test("slow handler rejection: a generic error body, never a stack trace", async () => {
  const handler = delay(60).then(() => {
    throw new Error("secret at /opt/omniroute/internal.ts:42");
  });
  const response = await withEarlyJsonKeepalive(handler, { thresholdMs: 10 });
  const wire = await response.text();
  const body = JSON.parse(wire);
  assert.equal(body.type, "error");
  assert.equal(body.error.type, "api_error");
  assert.ok(!wire.includes("at /") && !wire.includes("secret"), wire);
});

test("thresholdMs 0 disables the keepalive", async () => {
  const original = jsonResponse({ ok: true }, 504);
  const response = await withEarlyJsonKeepalive(
    delay(60).then(() => original),
    { thresholdMs: 0 }
  );
  assert.equal(response, original);
});

test("threshold env: 60 s default, 0 disables, invalid falls back", () => {
  assert.equal(DEFAULT_JSON_KEEPALIVE_THRESHOLD_MS, 60_000);
  assert.equal(resolveJsonKeepaliveThresholdMs({}), 60_000);
  assert.equal(resolveJsonKeepaliveThresholdMs({ OMNIROUTE_NONSTREAM_KEEPALIVE_MS: "0" }), 0);
  assert.equal(
    resolveJsonKeepaliveThresholdMs({ OMNIROUTE_NONSTREAM_KEEPALIVE_MS: "45000" }),
    45_000
  );
  assert.equal(resolveJsonKeepaliveThresholdMs({ OMNIROUTE_NONSTREAM_KEEPALIVE_MS: "-5" }), 60_000);
  assert.equal(
    resolveJsonKeepaliveThresholdMs({ OMNIROUTE_NONSTREAM_KEEPALIVE_MS: "soon" }),
    60_000
  );
});

test("/v1/messages non-streaming: a slow upstream gets keepalive bytes, then the message", async () => {
  process.env.OMNIROUTE_NONSTREAM_KEEPALIVE_MS = "50";
  globalThis.fetch = async () => {
    await delay(400);
    return harness.buildOpenAIResponse("OK", "gpt-4.1");
  };
  const response = await POST(
    harness.buildRequest({
      url: "http://localhost/v1/messages",
      headers: { "X-Correlation-Id": "slow-json-123" },
      body: {
        model: "openai/gpt-4.1",
        max_tokens: 16,
        messages: [{ role: "user", content: "hi" }],
        stream: false,
      },
    })
  );
  const wire = await response.text();
  assert.equal(response.status, 200, wire);
  assert.ok(wire.startsWith(" "), "the keepalive path must run before the body");
  const message = JSON.parse(wire);
  assert.equal(message.type, "message");
  assert.equal(message.content?.[0]?.text, "OK");
  assert.equal(response.headers.get("x-correlation-id"), "slow-json-123");
});

test("/v1/messages non-streaming: the keepalive also covers a slow Bifrost attempt before the native fallback", async () => {
  process.env.OMNIROUTE_NONSTREAM_KEEPALIVE_MS = "50";
  const bifrostEnv = [
    "BIFROST_BASE_URL",
    "OMNIROUTE_RELAY_BACKEND",
    "BIFROST_ENABLED",
    "BIFROST_TIMEOUT_MS",
  ];
  const savedEnv = Object.fromEntries(bifrostEnv.map((name) => [name, process.env[name]]));
  Object.assign(process.env, {
    BIFROST_BASE_URL: "http://127.0.0.1:8080",
    OMNIROUTE_RELAY_BACKEND: "bifrost",
    BIFROST_ENABLED: "1",
    BIFROST_TIMEOUT_MS: "5000",
  });
  try {
    globalThis.fetch = async (url) => {
      if (String(url).startsWith("http://127.0.0.1:8080")) {
        await delay(300);
        return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
      }
      return harness.buildOpenAIResponse("OK", "gpt-4.1");
    };
    const response = await POST(
      harness.buildRequest({
        url: "http://localhost/v1/messages",
        body: {
          model: "openai/gpt-4.1",
          max_tokens: 16,
          messages: [{ role: "user", content: "hi" }],
          stream: false,
        },
      })
    );
    const wire = await response.text();
    assert.equal(response.status, 200, wire);
    assert.ok(wire.startsWith(" "), "keepalive bytes must flow during the slow Bifrost attempt");
    assert.equal(JSON.parse(wire).content?.[0]?.text, "OK");
  } finally {
    for (const name of bifrostEnv) {
      if (savedEnv[name] === undefined) delete process.env[name];
      else process.env[name] = savedEnv[name];
    }
  }
});
