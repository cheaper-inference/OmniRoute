// A 200 stream that is cut after output ("terminated") is a transport event, not an account
// refusal. The direct path (executeChatWithBreaker -> onStreamFailure) must not put the
// connection on cooldown for it; a real upstream refusal keeps cooling.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-direct-terminated-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { executeChatWithBreaker } = await import("../../src/sse/handlers/chatHelpers.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");

const encoder = new TextEncoder();

function cutStreamResponse(error: Error) {
  const chunk =
    'data: {"id":"c1","object":"chat.completion.chunk","created":0,"model":"gpt-4o-mini",' +
    '"choices":[{"index":0,"delta":{"role":"assistant","content":"hello"},"finish_reason":null}]}\n\n';
  let sent = false;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (!sent) {
        sent = true;
        controller.enqueue(encoder.encode(chunk));
        return;
      }
      controller.error(error);
    },
  });
  return new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } });
}

async function runCutStream(error: Error) {
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: `openai-cut-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: "sk-test-direct-cut",
    isActive: true,
    testStatus: "active",
  });
  const credentials = {
    connectionId: conn.id,
    apiKey: "sk-test-direct-cut",
    providerSpecificData: {},
  };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => cutStreamResponse(error);
  try {
    const execution = await executeChatWithBreaker({
      bypassCircuitBreaker: false,
      breaker: getCircuitBreaker("openai"),
      body: {
        model: "openai/gpt-4o-mini",
        stream: true,
        messages: [{ role: "user", content: "hi" }],
      },
      provider: "openai",
      model: "gpt-4o-mini",
      refreshedCredentials: credentials,
      proxyInfo: null,
      log: console,
      clientRawRequest: { endpoint: "/v1/chat/completions", headers: {}, body: {} },
      credentials,
      apiKeyInfo: null,
      userAgent: "",
      comboName: null,
      comboStrategy: null,
      isCombo: false,
      extendedContext: false,
      comboStepId: null,
      comboExecutionKey: null,
    });
    if (!("result" in execution)) assert.fail("expected a provider result");
    const response = execution.result.response as Response;
    assert.ok(response?.body, "the call must return a stream");
    const reader = response.body.getReader();
    for (let i = 0; i < 20; i++) {
      const step = await reader.read().catch(() => ({ done: true }));
      if (step.done) break;
    }
    // onStreamFailure -> markAccountUnavailable runs async after the read loop ends.
    await new Promise((resolve) => setTimeout(resolve, 200));
  } finally {
    globalThis.fetch = originalFetch;
  }
  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.ok(after, "connection must still exist");
  return after as { rateLimitedUntil?: string | null; testStatus?: string };
}

test.beforeEach(() => {
  resetAllCircuitBreakers();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("direct path: a cut 200 stream (terminated) does not cool the connection", async () => {
  const after = await runCutStream(new TypeError("terminated"));
  assert.ok(!after.rateLimitedUntil, `rateLimitedUntil set: ${after.rateLimitedUntil}`);
  assert.equal(after.testStatus, "active");
});

test("direct path: another stream failure (not terminated) still cools the connection", async () => {
  const after = await runCutStream(new Error("upstream pipeline exploded"));
  assert.ok(after.rateLimitedUntil, "a non-terminated stream failure keeps the cooldown");
});
