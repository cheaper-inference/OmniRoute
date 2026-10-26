// @ts-nocheck
/**
 * Wiring test for ensurePassthroughCacheBreakpoints (#chat-passthrough-cache).
 *
 * The helper's unit tests (claude-passthrough-cache-rescue.test.ts) prove the
 * function's contract; this test proves the chatCore passthrough branch
 * actually CALLS it. A marker-less Anthropic-format request forwarded through
 * pure claude→claude passthrough must reach the upstream with injected cache
 * breakpoints (system tail 1h, second-to-last user + last assistant ephemeral)
 * — otherwise marker-less clients (e.g. Cursor) re-bill the full prefix
 * every turn. A client-managed marker anywhere must pass through untouched.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-passthrough-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return {
    debug() {},
    info() {},
    warn() {},
    error() {},
  };
}

function createSseResponse(events) {
  return new Response(`${events.join("\n\n")}\n\n`, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function markerlessClaudeBody() {
  return {
    model: "claude/claude-sonnet-5",
    max_tokens: 64,
    stream: true,
    system: [
      { type: "text", text: "You are a helpful assistant." },
      { type: "text", text: "Project context." },
    ],
    messages: [
      { role: "user", content: [{ type: "text", text: "u1" }] },
      { role: "assistant", content: [{ type: "text", text: "a1" }] },
      { role: "user", content: [{ type: "text", text: "u2" }] },
      { role: "assistant", content: [{ type: "text", text: "a2" }] },
      { role: "user", content: [{ type: "text", text: "u3" }] },
    ],
  };
}

async function flushAsyncSideEffects() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await flushAsyncSideEffects();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function countCacheControls(body) {
  let count = 0;
  if (Array.isArray(body.system)) {
    for (const block of body.system) if (block?.cache_control) count++;
  }
  if (Array.isArray(body.messages)) {
    for (const message of body.messages) {
      if (Array.isArray(message.content)) {
        for (const block of message.content) if (block?.cache_control) count++;
      }
    }
  }
  return count;
}

test("claude→claude passthrough injects cache breakpoints into a marker-less body", async () => {
  let upstreamBody = null;

  globalThis.fetch = async (_url, init = {}) => {
    upstreamBody = JSON.parse(String(init.body || "{}"));
    return createSseResponse([
      `event: message_start\ndata: {"type":"message_start","message":{"id":"msg_x","model":"claude-sonnet-5"}}`,
      `event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}`,
      `event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"ok"}}`,
      `event: content_block_stop\ndata: {"type":"content_block_stop","index":0}`,
      `event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn"}}`,
      `event: message_stop\ndata: {"type":"message_stop"}`,
    ]);
  };

  const body = markerlessClaudeBody();
  const result = await handleChatCore({
    body,
    modelInfo: { provider: "claude", model: "claude-sonnet-5", extendedContext: false },
    credentials: { apiKey: "test-key", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: structuredClone(body),
      headers: new Headers({ "content-type": "application/json" }),
    },
    userAgent: "cursor/1.0",
  });

  assert.ok(result, "handleChatCore returned a response");
  assert.ok(upstreamBody, "upstream fetch captured the passthrough body");

  // The rescue must have fired: the upstream body now carries breakpoints.
  const marked = countCacheControls(upstreamBody);
  assert.ok(marked >= 2, `expected injected cache_control markers, got ${marked}`);

  const system = upstreamBody.system;
  assert.deepEqual(system[system.length - 1].cache_control, { type: "ephemeral", ttl: "1h" });
});

test("claude→claude passthrough leaves client-managed markers untouched", async () => {
  let upstreamBody = null;

  globalThis.fetch = async (_url, init = {}) => {
    upstreamBody = JSON.parse(String(init.body || "{}"));
    return createSseResponse([
      `event: message_start\ndata: {"type":"message_start","message":{"id":"msg_x","model":"claude-sonnet-5"}}`,
      `event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}`,
      `event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"ok"}}`,
      `event: content_block_stop\ndata: {"type":"content_block_stop","index":0}`,
      `event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn"}}`,
      `event: message_stop\ndata: {"type":"message_stop"}`,
    ]);
  };

  const body = markerlessClaudeBody();
  // A client that manages its own breakpoints must pass through the plain
  // passthrough branch byte-untouched. NOTE: the userAgent must NOT look like
  // Claude Code — "claude-code"/"claude-cli"/x-app:cli route the request into
  // the CC semantic-passthrough branch, whose
  // ensureCacheControlOnLastUserMessage adds its own marker by contract.
  body.system[1].cache_control = { type: "ephemeral", ttl: "5m" };

  await handleChatCore({
    body,
    modelInfo: { provider: "claude", model: "claude-sonnet-5", extendedContext: false },
    credentials: { apiKey: "test-key", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: structuredClone(body),
      headers: new Headers({ "content-type": "application/json" }),
    },
    userAgent: "cursor/1.0",
  });

  assert.ok(upstreamBody, "upstream fetch captured the passthrough body");
  assert.equal(
    countCacheControls(upstreamBody),
    1,
    "client-managed marker must pass through with zero injection"
  );
  const system = upstreamBody.system;
  assert.deepEqual(system[system.length - 1].cache_control, { type: "ephemeral", ttl: "5m" });
});
