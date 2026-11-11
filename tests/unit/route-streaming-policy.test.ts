/**
 * Per-route streaming policy (OMNIROUTE_STREAMING_POLICY, default unset = off).
 * Format: `<path-prefix>=<allow|deny|always>` entries separated by commas; the longest
 * matching prefix wins. `deny` + a client that asked to stream -> HTTP 400;
 * `always` forces a stream; `allow` and no match change nothing.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { applyStreamingPolicy } = await import("../../open-sse/utils/streamingPolicy.ts");
const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;
const originalPolicy = process.env.OMNIROUTE_STREAMING_POLICY;
const noopLog = () => ({ debug() {}, info() {}, warn() {}, error() {} });

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalPolicy === undefined) delete process.env.OMNIROUTE_STREAMING_POLICY;
  else process.env.OMNIROUTE_STREAMING_POLICY = originalPolicy;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const env = (value?: string) => ({ OMNIROUTE_STREAMING_POLICY: value });

test("unset or blank policy changes nothing", () => {
  assert.deepEqual(applyStreamingPolicy("/v1/chat/completions", true, env()), { stream: true });
  assert.deepEqual(applyStreamingPolicy("/v1/chat/completions", false, env("  ")), {
    stream: false,
  });
});

test("always forces a stream", () => {
  const out = applyStreamingPolicy("/v1/chat/completions", false, env("/v1/chat=always"));
  assert.deepEqual(out, { stream: true });
});

test("deny rejects a client that asked to stream and leaves JSON requests alone", () => {
  const denied = applyStreamingPolicy("/v1/chat/completions", true, env("/v1/chat=deny"));
  assert.equal(denied.error?.status, 400);
  assert.match(denied.error?.message ?? "", /streaming is not enabled/i);
  assert.deepEqual(applyStreamingPolicy("/v1/chat/completions", false, env("/v1/chat=deny")), {
    stream: false,
  });
});

test("allow and a non-matching prefix change nothing", () => {
  assert.deepEqual(applyStreamingPolicy("/v1/chat/completions", true, env("/v1/chat=allow")), {
    stream: true,
  });
  assert.deepEqual(applyStreamingPolicy("/v1/responses", true, env("/v1/chat=deny")), {
    stream: true,
  });
});

test("the longest matching prefix wins", () => {
  const policy = env("/v1=deny,/v1/chat=always");
  assert.deepEqual(applyStreamingPolicy("/v1/chat/completions", false, policy), { stream: true });
  assert.equal(applyStreamingPolicy("/v1/responses", true, policy).error?.status, 400);
});

test("invalid entries are ignored and never loosen a valid one", () => {
  const policy = env("garbage,/v1/chat=sometimes,=deny,/v1/chat=deny");
  assert.equal(applyStreamingPolicy("/v1/chat/completions", true, policy).error?.status, 400);
});

function chatJson() {
  return new Response(
    JSON.stringify({
      id: "c2",
      object: "chat.completion",
      created: 1,
      model: "gpt-4o-mini",
      choices: [{ index: 0, message: { role: "assistant", content: "hi" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 5, completion_tokens: 1, total_tokens: 6 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

async function callChat(stream: boolean) {
  let upstreamCalls = 0;
  globalThis.fetch = (async () => {
    upstreamCalls += 1;
    return chatJson();
  }) as typeof fetch;
  const body = { model: "gpt-4o-mini", stream, messages: [{ role: "user", content: "hi" }] };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: ["s", "k", "test"].join("-"), providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: stream ? "text/event-stream" : "application/json" }),
    },
    connectionId: "openai-conn",
  });
  return { result, upstreamCalls };
}

test("chatCore: deny turns a streaming request into a 400 before any upstream call", async () => {
  process.env.OMNIROUTE_STREAMING_POLICY = "/v1/chat=deny";
  const { result, upstreamCalls } = await callChat(true);
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(upstreamCalls, 0);
});

test("chatCore: with no policy a streaming request is served as before", async () => {
  delete process.env.OMNIROUTE_STREAMING_POLICY;
  const { result } = await callChat(true);
  assert.equal(result.success, true);
});
