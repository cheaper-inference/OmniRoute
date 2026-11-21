// F-C2-06: the semantic-cache write key must equal the read key. sanitizeChatRequestBody edits the
// body in place after the cache read, and `bodyForCacheWrite` was only a second name for that
// object, so a temperature-0 request whose body sanitize changes could never hit its own entry.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-snapshot-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const PROVIDER = "cachesnap-prov";
const MODEL = "cachesnap-model";
const originalFetch = globalThis.fetch;
let upstreamCalls = 0;

function request() {
  // `max_output_tokens` on a Chat target is renamed to `max_tokens` by sanitize, after the read.
  const body = {
    model: MODEL,
    messages: [{ role: "user", content: "What is the capital of France?" }],
    temperature: 0,
    max_output_tokens: 50,
    stream: false,
  };
  return {
    body,
    modelInfo: { provider: PROVIDER, model: MODEL, extendedContext: false },
    credentials: {
      apiKey: ["cache", "snap", "key"].join("-"),
      providerSpecificData: { baseUrl: "https://cachesnap.example.test" },
    },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    log: { debug() {}, info() {}, warn() {}, error() {} },
  };
}

test.before(() => {
  globalThis.fetch = async () => {
    upstreamCalls++;
    return new Response(
      JSON.stringify({
        choices: [{ message: { content: "Paris" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 12, completion_tokens: 2 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a temperature-0 request whose body is sanitized still hits its own cache entry", async () => {
  const first = await handleChatCore(request());
  assert.equal(first.success, true);
  assert.equal(upstreamCalls, 1);
  // The write is fire-and-forget; give it a tick to land.
  await new Promise((resolve) => setTimeout(resolve, 100));
  const second = await handleChatCore(request());
  assert.equal(second.success, true);
  assert.equal(upstreamCalls, 1, "the repeat must be served from the cache, not the upstream");
});
