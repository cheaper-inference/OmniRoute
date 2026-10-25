// Context rollover (append-preserving-ccr) through handleChatCore: with the feature on, old
// history is archived into ordered CCR markers past the trigger, and a request whose retained
// tail alone still exceeds the input budget is NOT left unhandled — the last-resort compaction
// pass still runs, so the request succeeds instead of being rejected or sent oversized.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-context-rollover-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { updateCompressionSettings } = await import("../../src/lib/db/compression.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { DEFAULT_CONTEXT_ROLLOVER_CONFIG } =
  await import("../../open-sse/services/compression/types.ts");

const TEST_PROVIDER = "test-rollover-prov";
const TEST_MODEL = "test-rollover-model";
const ENV_CONTEXT_LIMIT = "CONTEXT_LENGTH_TEST_ROLLOVER_PROV";

const originalFetch = globalThis.fetch;
const originalEnvContext = process.env[ENV_CONTEXT_LIMIT];
let upstreamPayload: { messages?: Array<{ role?: string; content?: unknown }> } | null = null;

test.before(async () => {
  core.resetDbInstance();
  globalThis.fetch = async (url: RequestInfo | URL, init: RequestInit = {}) => {
    if (String(url instanceof Request ? url.url : url).includes("/__omniroute_event")) {
      return new Response(null, { status: 204 });
    }
    upstreamPayload = init.body ? JSON.parse(String(init.body)) : null;
    return new Response(
      JSON.stringify({
        id: "chatcmpl-rollover",
        object: "chat.completion",
        created: Date.now(),
        model: TEST_MODEL,
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 100, completion_tokens: 1, total_tokens: 101 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  if (originalEnvContext === undefined) delete process.env[ENV_CONTEXT_LIMIT];
  else process.env[ENV_CONTEXT_LIMIT] = originalEnvContext;
  await new Promise((r) => setTimeout(r, 200));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function buildHistory(turns: number) {
  const messages: Array<{ role: string; content: string }> = [];
  for (let i = 0; i < turns; i++) {
    messages.push({ role: "user", content: `Turn ${i} user request: ` + "word ".repeat(250) });
    messages.push({
      role: "assistant",
      content: `Turn ${i} assistant reply: ` + "answer ".repeat(250),
    });
  }
  messages.push({ role: "user", content: "What did we decide in turn 0?" });
  return messages;
}

// Archived turns are only recoverable through omniroute_ccr_retrieve, so the rollover only
// takes over for callers that advertise it (the OmniRoute MCP tool).
const RETRIEVE_TOOL = { type: "function", function: { name: "omniroute_ccr_retrieve" } };

function run(
  messages: Array<{ role: string; content: string }>,
  { withRetrieveTool = true }: { withRetrieveTool?: boolean } = {}
) {
  const body = {
    model: TEST_MODEL,
    messages,
    stream: false,
    ...(withRetrieveTool ? { tools: [RETRIEVE_TOOL] } : {}),
  };
  return handleChatCore({
    body,
    modelInfo: { provider: TEST_PROVIDER, model: TEST_MODEL, extendedContext: false },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://test-rollover.example.test" },
    },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body,
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    isCombo: false,
    log: { debug() {}, info() {}, warn() {}, error() {} },
  });
}

function upstreamText() {
  return JSON.stringify(upstreamPayload?.messages ?? []);
}

test("past the trigger, old history is archived into ordered CCR markers upstream", async () => {
  process.env[ENV_CONTEXT_LIMIT] = "10000";
  await updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
    contextRollover: { ...DEFAULT_CONTEXT_ROLLOVER_CONFIG, enabled: true },
  });
  upstreamPayload = null;
  const messages = buildHistory(15);

  const result = await run(messages);

  assert.equal(result.success, true, String((result as { error?: string }).error));
  assert.ok(upstreamPayload, "expected an upstream dispatch");
  assert.match(upstreamText(), /\[CCR retrieve hash=[0-9a-f]{24} chars=\d+\]/);
  assert.match(upstreamText(), /\[CCR context rollover\]/);
  assert.equal(
    upstreamPayload.messages?.at(-1)?.content,
    "What did we decide in turn 0?",
    "the newest prompt stays direct"
  );
});

test("a request whose retained tail exceeds the window is still compacted, not rejected", async () => {
  process.env[ENV_CONTEXT_LIMIT] = "4000";
  // minRetainedMessages=100 keeps every message direct, so the rollover cannot archive
  // anything and the body stays above the 4000-token window.
  await updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
    contextRollover: {
      ...DEFAULT_CONTEXT_ROLLOVER_CONFIG,
      enabled: true,
      minRetainedMessages: 100,
    },
  });
  upstreamPayload = null;
  const messages = buildHistory(10);

  const result = await run(messages);

  assert.equal(
    result.success,
    true,
    `expected last-resort compaction to rescue the request, got: ${
      (result as { error?: string }).error
    }`
  );
  assert.ok(upstreamPayload, "expected an upstream dispatch");
  assert.ok(
    (upstreamPayload.messages?.length ?? 0) < messages.length,
    "the oversized history must be compacted before dispatch"
  );
});

test("an excluded model keeps the normal pipeline (no CCR archive markers)", async () => {
  process.env[ENV_CONTEXT_LIMIT] = "10000";
  await updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
    contextRollover: {
      ...DEFAULT_CONTEXT_ROLLOVER_CONFIG,
      enabled: true,
      excludedModelKeys: [`${TEST_PROVIDER}/${TEST_MODEL}`],
    },
  });
  upstreamPayload = null;

  const result = await run(buildHistory(15));

  assert.equal(result.success, true, String((result as { error?: string }).error));
  assert.doesNotMatch(upstreamText(), /\[CCR context rollover\]/);
});

test("a caller without the CCR retrieve tool keeps the normal pipeline", async () => {
  process.env[ENV_CONTEXT_LIMIT] = "10000";
  await updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
    contextRollover: { ...DEFAULT_CONTEXT_ROLLOVER_CONFIG, enabled: true },
  });
  upstreamPayload = null;

  const result = await run(buildHistory(15), { withRetrieveTool: false });

  assert.equal(result.success, true, String((result as { error?: string }).error));
  assert.doesNotMatch(upstreamText(), /\[CCR context rollover\]/);
});
