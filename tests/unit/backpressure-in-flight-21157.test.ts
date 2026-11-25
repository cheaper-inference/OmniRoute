import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// OMNI_MAX_CONCURRENT_CONNECTIONS caps requests that are in flight (#21157).
//
// The cap used to read the sticky-routing session count, and a session outlives its
// request by OMNIROUTE_SESSION_TTL_MIN (15 minutes by default). A few finished requests
// then filled the cap and the next one got 429 "Server busy" with no stream open.
//
// These cases drive handleChat() directly, as chat-stream-early-eof-failover.test.ts
// does: the route's early keepalive would answer 200 before the handler does.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backpressure-in-flight-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = `test-backpressure-in-flight-${Date.now()}`;
}

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { clearSessions } = await import("../../open-sse/services/sessionManager.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

const CAP_ENV = "OMNI_MAX_CONCURRENT_CONNECTIONS";
const CAP = 2;
const ORIGINAL_CAP = process.env[CAP_ENV];
const originalFetch = globalThis.fetch;
const encoder = new TextEncoder();

async function flushBackgroundWork() {
  await new Promise((resolve) => setTimeout(resolve, 50));
  await new Promise((resolve) => setImmediate(resolve));
}

function chunkFrame(delta: Record<string, unknown>, finishReason: string | null): string {
  return `data: ${JSON.stringify({
    id: "chatcmpl-backpressure-in-flight",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  })}\n\n`;
}

const FIRST_FRAME = chunkFrame({ role: "assistant", content: "OK" }, null);
const LAST_FRAMES = `${chunkFrame({}, "stop")}data: [DONE]\n\n`;

function sseResponse(body: BodyInit): Response {
  return new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

/** An upstream stream that sends its first frame and then stays open until finish(). */
function openUpstream(): { response: Response; finish: () => void } {
  let controller!: ReadableStreamDefaultController<Uint8Array>;
  const body = new ReadableStream<Uint8Array>({
    start(streamController) {
      controller = streamController;
      controller.enqueue(encoder.encode(FIRST_FRAME));
    },
  });
  return {
    response: sseResponse(body),
    finish: () => {
      controller.enqueue(encoder.encode(LAST_FRAMES));
      controller.close();
    },
  };
}

function chatRequest(stream: boolean): Request {
  // A new first user message per request: a new sticky session, no cache or dedup hit.
  const nonce = `backpressure-in-flight-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: stream ? "text/event-stream" : "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-4.1",
      messages: [{ role: "user", content: `Reply with OK only. ${nonce}` }],
      max_tokens: 16,
      stream,
      temperature: 0,
    }),
  });
}

async function readFirstChunk(response: Response) {
  const reader = response.body!.getReader();
  const first = await reader.read();
  assert.equal(first.done, false, "the stream must deliver its first frame");
  return reader;
}

async function drain(reader: ReadableStreamDefaultReader<Uint8Array>) {
  while (!(await reader.read()).done) {
    // read to the end
  }
}

async function busyMessage(response: Response): Promise<string> {
  assert.equal(response.status, 429, "a request over the cap must get 429");
  return ((await response.json()) as { error: { message: string } }).error.message;
}

test.beforeEach(async () => {
  clearInflight();
  clearSessions();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  resetAllCircuitBreakers();
  initTranslators();
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-backpressure-in-flight",
    apiKey: "sk-backpressure-in-flight",
    isActive: true,
    testStatus: "active",
  });
  process.env[CAP_ENV] = String(CAP);
});

test.afterEach(async () => {
  await flushBackgroundWork();
  globalThis.fetch = originalFetch;
  if (ORIGINAL_CAP === undefined) delete process.env[CAP_ENV];
  else process.env[CAP_ENV] = ORIGINAL_CAP;
});

test.after(async () => {
  await flushBackgroundWork();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("finished streams do not use up the connection cap", async () => {
  globalThis.fetch = (async () => sseResponse(`${FIRST_FRAME}${LAST_FRAMES}`)) as typeof fetch;

  for (let sent = 1; sent <= CAP + 2; sent++) {
    const response = await handleChat(chatRequest(true));
    const text = await response.text();
    assert.equal(response.status, 200, `request ${sent} of ${CAP + 2}: ${text}`);
  }
});

test("finished non-streaming requests do not use up the connection cap", async () => {
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        id: "chatcmpl-backpressure-in-flight",
        object: "chat.completion",
        choices: [
          { index: 0, message: { role: "assistant", content: "OK" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )) as typeof fetch;

  for (let sent = 1; sent <= CAP + 2; sent++) {
    const response = await handleChat(chatRequest(false));
    const text = await response.text();
    assert.equal(response.status, 200, `request ${sent} of ${CAP + 2}: ${text}`);
  }
});

test("an open stream holds its slot until the client has read it to the end", async () => {
  const upstreams: Array<ReturnType<typeof openUpstream>> = [];
  globalThis.fetch = (async () => {
    const upstream = openUpstream();
    upstreams.push(upstream);
    return upstream.response;
  }) as typeof fetch;

  const first = await readFirstChunk(await handleChat(chatRequest(true)));
  const second = await readFirstChunk(await handleChat(chatRequest(true)));

  const refused = await handleChat(chatRequest(true));
  assert.match(await busyMessage(refused), /2 active connections \(limit 2\)/);
  assert.equal(upstreams.length, CAP, "a refused request must not reach the provider");

  upstreams[0].finish();
  await drain(first);

  const admitted = await readFirstChunk(await handleChat(chatRequest(true)));
  assert.equal(upstreams.length, CAP + 1, "the freed slot admits the next request");

  upstreams[1].finish();
  upstreams[2].finish();
  await drain(second);
  await drain(admitted);
});

test("a client that cancels its stream frees its slot", async () => {
  globalThis.fetch = (async () => openUpstream().response) as typeof fetch;

  const first = await readFirstChunk(await handleChat(chatRequest(true)));
  const second = await readFirstChunk(await handleChat(chatRequest(true)));
  await busyMessage(await handleChat(chatRequest(true)));

  await first.cancel();

  const admitted = await handleChat(chatRequest(true));
  assert.equal(admitted.status, 200, "the cancelled stream's slot is free again");
  await (await readFirstChunk(admitted)).cancel();
  await second.cancel();
});

test("a request aborted while its body is still being read frees its slot", async () => {
  process.env[CAP_ENV] = "1";
  globalThis.fetch = (async () => sseResponse(`${FIRST_FRAME}${LAST_FRAMES}`)) as typeof fetch;

  // The first request's body never finishes arriving, so handleChat waits on it.
  let bodyController!: ReadableStreamDefaultController<Uint8Array>;
  const pendingBody = new ReadableStream<Uint8Array>({
    start(controller) {
      bodyController = controller;
    },
  });
  const slow = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    body: pendingBody,
    duplex: "half",
  } as RequestInit);
  const lifecycle = new AbortController();
  const slowResponse = handleChat(slow, null, null, undefined, lifecycle.signal);
  await flushBackgroundWork();

  lifecycle.abort();
  const next = await handleChat(chatRequest(true));
  const text = await next.text();
  assert.equal(next.status, 200, `the aborted request still held the only slot: ${text}`);

  bodyController.enqueue(encoder.encode("{}"));
  bodyController.close();
  await (await slowResponse).text();
});
