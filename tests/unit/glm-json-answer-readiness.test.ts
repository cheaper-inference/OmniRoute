/**
 * The glm executor's stream-readiness gate must only judge responses that are
 * actually SSE. An OpenAI-compatible upstream that ignores the `stream` flag
 * and answers a complete JSON body used to be read to EOF by the SSE
 * readiness scan ("no non-ping SSE event" → 502 STREAM_EARLY_EOF) even though
 * the generation succeeded. JSON answers now pass through; a silent
 * event-stream response still gets the full readiness verdict.
 */
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { Socket } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, afterEach, mock, test } from "node:test";
import { MockAgent, getGlobalDispatcher, setGlobalDispatcher } from "undici";

const testRoot = mkdtempSync(join(tmpdir(), "omniroute-glm-json-readiness-"));
const originalEnv = { ...process.env };
const isolatedPaths = {
  HOME: "home",
  DATA_DIR: "data",
  OMNIROUTE_PLUGINS_DIR: "plugins",
  XDG_CONFIG_HOME: "config",
  XDG_CACHE_HOME: "cache",
  XDG_DATA_HOME: "xdg-data",
};
for (const [key, directory] of Object.entries(isolatedPaths)) {
  process.env[key] = join(testRoot, directory);
  mkdirSync(process.env[key]!, { recursive: true });
}
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.STREAM_READINESS_TIMEOUT_MS = "150";

const socketGuard = mock.method(Socket.prototype, "connect", () => {
  throw new Error("Unexpected network access in glm JSON readiness test");
});
const originalDispatcher = getGlobalDispatcher();
const mockAgent = new MockAgent();
mockAgent.disableNetConnect();
setGlobalDispatcher(mockAgent);

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { GlmExecutor } = await import("../../open-sse/executors/glm.ts");

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});
after(async () => {
  resetDbInstance();
  await mockAgent.close();
  setGlobalDispatcher(originalDispatcher);
  socketGuard.mock.restore();
  for (const key of [
    ...Object.keys(isolatedPaths),
    "NODE_ENV",
    "DISABLE_SQLITE_AUTO_BACKUP",
    "STREAM_READINESS_TIMEOUT_MS",
  ]) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
  rmSync(testRoot, { recursive: true, force: true });
});

const credentials = {
  apiKey: "synthetic-glm-key",
  providerSpecificData: { primaryTransport: "openai" },
};

function jsonCompletion() {
  return new Response(
    JSON.stringify({
      id: "chatcmpl_json",
      object: "chat.completion",
      choices: [
        { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
      ],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}

function stalledEventStream() {
  const encoder = new TextEncoder();
  return new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(": ping\n\n"));
        // Never enqueues content and never closes — the readiness deadline
        // owns the verdict.
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } },
  );
}

test("a JSON answer to a stream request passes through unharmed", async () => {
  globalThis.fetch = async () => jsonCompletion();
  const result = await new GlmExecutor().execute({
    model: "glm-4.6",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials,
  });
  assert.equal(result.response.status, 200, await result.response.clone().text());
  const body = await result.response.clone().json();
  assert.equal(body.choices[0].message.content, "ok");
});

test("a silent event-stream response still hits the readiness verdict", async () => {
  globalThis.fetch = async () => stalledEventStream();
  const result = await new GlmExecutor().execute({
    model: "glm-4.6",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials,
  });
  assert.notEqual(result.response.status, 200);
  const wire = await result.response.clone().text();
  assert.match(wire, /STREAM_READINESS_TIMEOUT|non-ping SSE/);
});
