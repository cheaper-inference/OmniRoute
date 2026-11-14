/**
 * #18999 — OMNIROUTE_FORCE_CLIENT_STREAMING through the real route handlers:
 * the opt-in turns an explicit stream=false into SSE on /v1/chat/completions
 * only, and leaves every other ingress and every JSON-only caller alone.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-force-client-stream-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-force-client-streaming-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const messagesRoute = await import("../../src/app/api/v1/messages/route.ts");
const responsesRoute = await import("../../src/app/api/v1/responses/route.ts");

const FLAG = "OMNIROUTE_FORCE_CLIENT_STREAMING";
const originalFetch = globalThis.fetch;
const upstreamStreamFlags: unknown[] = [];

function mockUpstream() {
  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    const sent = JSON.parse(String(init?.body ?? "{}"));
    upstreamStreamFlags.push(sent.stream);
    if (sent.stream === true) {
      const chunk = {
        id: "chatcmpl-force",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1",
        choices: [{ index: 0, delta: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
      };
      return new Response(`data: ${JSON.stringify(chunk)}\n\ndata: [DONE]\n\n`, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return Response.json({
      id: "chatcmpl-force",
      object: "chat.completion",
      created: 1,
      model: "gpt-4.1",
      choices: [{ index: 0, message: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    });
  }) as typeof fetch;
}

function chatRequest(headers: Record<string, string>, extraBody: Record<string, unknown> = {}) {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({
      model: "openai/gpt-4.1",
      stream: false,
      messages: [{ role: "user", content: "hi" }],
      ...extraBody,
    }),
  });
}

async function flush() {
  await new Promise((resolve) => setTimeout(resolve, 20));
  await new Promise((resolve) => setImmediate(resolve));
}

async function assertJson(response: Response) {
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /application\/json/);
  await response.text();
}

async function assertSse(response: Response) {
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /text\/event-stream/);
  const text = await response.text();
  assert.match(text, /data: /);
  return text;
}

test.beforeEach(async () => {
  upstreamStreamFlags.length = 0;
  delete process.env[FLAG];
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-force-client-stream",
    apiKey: "sk-force-client-stream",
    isActive: true,
    testStatus: "active",
  });
  mockUpstream();
});

test.afterEach(async () => {
  await flush();
  globalThis.fetch = originalFetch;
  delete process.env[FLAG];
});

test.after(async () => {
  await flush();
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("flag off: stream=false stays a JSON response", async () => {
  await assertJson(await chatRoute.POST(chatRequest({ Accept: "*/*" })));
  assert.deepEqual(upstreamStreamFlags, [false]);
});

test("flag on: stream=false with Accept */* becomes SSE", async () => {
  process.env[FLAG] = "1";
  const text = await assertSse(await chatRoute.POST(chatRequest({ Accept: "*/*" })));
  assert.match(text, /OK/);
  assert.deepEqual(upstreamStreamFlags, [true]);
});

test("flag on: a client that lists application/json keeps JSON", async () => {
  process.env[FLAG] = "1";
  await assertJson(await chatRoute.POST(chatRequest({ Accept: "application/json" })));
});

test("flag on: an in-process dispatcher (no Accept header) keeps JSON", async () => {
  process.env[FLAG] = "1";
  await assertJson(await chatRoute.POST(chatRequest({})));
});

test("flag on: a request with an idempotency key keeps JSON", async () => {
  process.env[FLAG] = "1";
  await assertJson(
    await chatRoute.POST(chatRequest({ Accept: "*/*", "Idempotency-Key": "force-stream-1" }))
  );
});

test("flag on: an API key in JSON stream-default mode keeps JSON", async () => {
  process.env[FLAG] = "1";
  const created = await apiKeysDb.createApiKey("json-mode-key", "machine-force-stream");
  await apiKeysDb.updateApiKeyPermissions(created.id, { streamDefaultMode: "json" });
  await assertJson(
    await chatRoute.POST(chatRequest({ Accept: "*/*", Authorization: `Bearer ${created.key}` }))
  );
});

test("flag on: /v1/messages stays JSON for stream=false", async () => {
  process.env[FLAG] = "1";
  const response = await messagesRoute.POST(
    new Request("http://localhost/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "*/*" },
      body: JSON.stringify({
        model: "openai/gpt-4.1",
        stream: false,
        max_tokens: 8,
        messages: [{ role: "user", content: "hi" }],
      }),
    })
  );
  await assertJson(response);
});

test("flag on: /v1/responses stays JSON for stream=false", async () => {
  process.env[FLAG] = "1";
  const response = await responsesRoute.POST(
    new Request("http://localhost/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "*/*" },
      body: JSON.stringify({ model: "openai/gpt-4.1", stream: false, input: "hi" }),
    })
  );
  await assertJson(response);
});
