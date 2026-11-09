import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-abandoned-body-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
const { executeProviderRequest } =
  await import("../../open-sse/handlers/chatCore/executeProviderRequest.ts");
const semaphore = await import("../../open-sse/services/accountSemaphore.ts");
const core = await import("../../src/lib/db/core.ts");

const UNREAD_ENV = "PROVIDER_BODY_UNREAD_TIMEOUT_MS";
const IDLE_ENV = "PROVIDER_BODY_INACTIVITY_TIMEOUT_MS";
const encoder = new TextEncoder();
let sequence = 0;

test.beforeEach(() => {
  process.env[UNREAD_ENV] = "40";
  process.env[IDLE_ENV] = "80";
  semaphore.resetAll();
});
test.after(() => {
  delete process.env[UNREAD_ENV];
  delete process.env[IDLE_ENV];
  semaphore.resetAll();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function sseBody(chunks: Array<{ delayMs: number; text: string }>): ReadableStream<Uint8Array> {
  let index = 0;
  return new ReadableStream<Uint8Array>(
    {
      async pull(controller) {
        const next = chunks[index++];
        if (!next) return controller.close();
        if (next.delayMs) await new Promise((resolve) => setTimeout(resolve, next.delayMs));
        controller.enqueue(encoder.encode(next.text));
      },
    },
    { highWaterMark: 0 }
  );
}

/** Real executeProviderRequest, stubbed executor, one-slot account gate. Returns the live client body. */
async function openStream(connectionId: string, body: ReadableStream<Uint8Array>) {
  const controller = new AbortController();
  const credentials = {
    connectionId,
    apiKey: ["k", String(++sequence)].join("-"),
    maxConcurrent: 1,
  };
  const model = "gpt-5-mini";
  const payload = { model, messages: [{ role: "user", content: "hi" }] };
  const result = await executeProviderRequest(
    {
      agentGoalPolicy: {
        detected: false,
        readinessMaxTimeoutMs: 600_000,
        streamRecoveryEnabled: false,
      },
      assertManagedLeaseFence: () => {},
      buildUpstreamHeadersForExecute: () => ({}),
      clientRawRequest: { headers: new Headers(), signal: controller.signal },
      clientResponseFormat: "chat.completions",
      connectionId: null,
      correlationId: null,
      credentials: null,
      dedupEnabled: false,
      dedupHash: null,
      effectiveModel: model,
      executor: {
        execute: async () =>
          new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } }),
      },
      extendedContext: false,
      getExecutionCredentials: () => credentials,
      getExecutorClientHeaders: () => ({}),
      isModelScope: () => false,
      isOpencodeClient: false,
      log: null,
      model,
      onCredentialsRefreshed: null,
      pendingScope: { id: null, model, provider: "openai", connectionId: null },
      provider: "openai",
      providerRequestCapture: { capture: () => {}, body: (fallback: unknown) => fallback },
      rawBody: payload,
      recordKeyHealthStatus: () => {},
      requestedModel: model,
      resilienceSettings: resolveResilienceSettings(null),
      settings: null,
      skipUpstreamRetry: false,
      stream: true,
      streamController: { signal: controller.signal },
      targetFormat: "openai",
      trace: () => {},
      traceId: "abandoned-body",
      translatedBody: payload,
      trustedEffortContext: {},
      upstreamStream: true,
      userAgent: "abandoned-body-test",
    } as never,
    model
  );
  return result.response.body as ReadableStream<Uint8Array>;
}

function running(connectionId: string): number {
  const stats = semaphore.getStats();
  const key = Object.keys(stats).find((name) => name.includes(connectionId));
  return key ? stats[key].running : 0;
}

async function waitUntil(check: () => boolean, ms = 3000): Promise<boolean> {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    if (check()) return true;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  return check();
}

test("a response body nobody reads gives its provider slot back", async () => {
  const connectionId = `unread-${Date.now()}`;
  const body = await openStream(connectionId, sseBody([{ delayMs: 0, text: "data: 1\n\n" }]));
  assert.equal(running(connectionId), 1, "the slot is held while the body is open");

  assert.equal(await waitUntil(() => running(connectionId) === 0), true, "slot must be released");
  await assert.rejects(body.getReader().read(), /unread|abandoned|expired/i);
});

test("a body that stops being pulled gives its provider slot back", async () => {
  const connectionId = `idle-${Date.now()}`;
  const body = await openStream(
    connectionId,
    sseBody([
      { delayMs: 0, text: "data: 1\n\n" },
      { delayMs: 0, text: "data: 2\n\n" },
    ])
  );
  const reader = body.getReader();
  assert.equal((await reader.read()).done, false);

  assert.equal(await waitUntil(() => running(connectionId) === 0), true, "slot must be released");
  await assert.rejects(reader.read(), /inactiv|abandoned|expired/i);
});

test("a slow upstream with a read pending is not cut and releases at the end", async () => {
  const connectionId = `slow-${Date.now()}`;
  const body = await openStream(
    connectionId,
    sseBody([
      { delayMs: 0, text: "data: 1\n\n" },
      { delayMs: 250, text: "data: 2\n\n" }, // silence far above both limits, read pending
    ])
  );
  const reader = body.getReader();
  const seen: string[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    seen.push(new TextDecoder().decode(value));
    assert.equal(running(connectionId), 1, "slot stays held while the stream is live");
  }
  assert.deepEqual(seen, ["data: 1\n\n", "data: 2\n\n"]);
  assert.equal(running(connectionId), 0, "slot released at EOF");
});

test("cancelling the body releases the slot at once", async () => {
  const connectionId = `cancel-${Date.now()}`;
  const body = await openStream(connectionId, sseBody([{ delayMs: 0, text: "data: 1\n\n" }]));
  await body.cancel("client gone");
  assert.equal(running(connectionId), 0);
});

test("a limit of 0 turns the backstop off", async () => {
  process.env[UNREAD_ENV] = "0";
  process.env[IDLE_ENV] = "0";
  const connectionId = `off-${Date.now()}`;
  const body = await openStream(connectionId, sseBody([{ delayMs: 0, text: "data: 1\n\n" }]));
  await new Promise((resolve) => setTimeout(resolve, 200));
  assert.equal(running(connectionId), 1, "no backstop: the slot stays with the open body");
  await body.cancel("test cleanup");
});
