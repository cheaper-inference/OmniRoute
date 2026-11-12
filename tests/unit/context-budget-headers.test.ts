// @ts-nocheck
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-context-headers-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { getTokenLimit } = await import("../../open-sse/services/contextManager.ts");
const { buildOmniRouteResponseMetaHeaders } =
  await import("../../src/domain/omnirouteResponseMeta.ts");
const { buildNonStreamingResponseHeaders } =
  await import("../../open-sse/handlers/chatCore/nonStreamingResponseHeaders.ts");

const WINDOW = "X-OmniRoute-Context-Window";
const REMAINING = "X-OmniRoute-Context-Remaining";
const FLAG = "OMNIROUTE_CONTEXT_HEADERS";
const originalFetch = globalThis.fetch;
const originalFlag = process.env[FLAG];

function restoreFlag() {
  if (originalFlag === undefined) delete process.env[FLAG];
  else process.env[FLAG] = originalFlag;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  restoreFlag();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

async function callChat() {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        id: "chatcmpl-1",
        object: "chat.completion",
        created: 1,
        model: "gpt-4o-mini",
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 120, completion_tokens: 3, total_tokens: 123 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  const body = {
    model: "gpt-4o-mini",
    stream: false,
    messages: [{ role: "user", content: "context budget" }],
  };
  return handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "test-openai-key", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ "content-type": "application/json" }),
    },
    userAgent: "test",
  });
}

test("meta builder emits window and remaining only when a window is given", () => {
  const without = buildOmniRouteResponseMetaHeaders({ usage: { prompt_tokens: 10 } });
  assert.equal(without[WINDOW], undefined);
  const withWindow = buildOmniRouteResponseMetaHeaders({
    usage: { prompt_tokens: 120 },
    contextWindow: 1000,
  });
  assert.equal(withWindow[WINDOW], "1000");
  assert.equal(withWindow[REMAINING], "880");
  const over = buildOmniRouteResponseMetaHeaders({
    usage: { prompt_tokens: 5000 },
    contextWindow: 1000,
  });
  assert.equal(over[REMAINING], "0");
});

test("non-streaming header builder adds the context headers only with the env flag", () => {
  const args = {
    provider: "openai",
    model: "gpt-4o-mini",
    startTime: 0,
    responseUsage: { prompt_tokens: 120 },
    estimatedCost: 0,
    requestId: "req-1",
    contextWindow: 1000,
  };
  delete process.env[FLAG];
  assert.equal(buildNonStreamingResponseHeaders(args)[WINDOW], undefined);
  process.env[FLAG] = "1";
  const on = buildNonStreamingResponseHeaders(args);
  assert.equal(on[WINDOW], "1000");
  assert.equal(on[REMAINING], "880");
});

test("chatCore leaves the context headers off by default", async () => {
  delete process.env[FLAG];
  const result = await callChat();
  assert.equal(result.success, true);
  assert.equal(result.response.headers.get(WINDOW), null);
  assert.equal(result.response.headers.get(REMAINING), null);
});

test("chatCore reports the resolved context window and the remaining input budget when enabled", async () => {
  process.env[FLAG] = "1";
  const result = await callChat();
  assert.equal(result.success, true);
  const window = getTokenLimit("openai", "gpt-4o-mini");
  assert.ok(window > 120, "the known window must exceed the 120 prompt tokens");
  assert.equal(result.response.headers.get(WINDOW), String(window));
  assert.equal(result.response.headers.get(REMAINING), String(window - 120));
});
