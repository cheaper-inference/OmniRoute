/**
 * homelab#297 — end-to-end through handleChatCore: the stacked session-dedup + lite pipeline must
 * not rewrite messages a prompt-cache provider has (or will) cache.
 *
 * Incident: lite truncated an old 19,000-char tool_result at or before the cache breakpoint on one
 * request but not the next, so the cached prefix differed between turns and every turn paid a full
 * cache write instead of a cheap read.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import zlib from "node:zlib";
import { createTempDataDir } from "../_setup/tempDataDir.ts";

const { dir: TEST_DATA_DIR, cleanup } = createTempDataDir("omniroute-cache-prefix-297-");
process.env.REQUIRE_API_KEY = "false";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-cache-prefix-297-secret";

const core = await import("../../src/lib/db/core.ts");
const readCacheDb = await import("../../src/lib/db/readCache.ts");
const compressionDb = await import("../../src/lib/db/compression.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { waitForCallLogSaves, closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

type Json = Record<string, unknown>;

const originalFetch = globalThis.fetch;
const EPHEMERAL = { type: "ephemeral" };
const LONG = "important tool output line\n".repeat(730); // 19,710 chars, well over lite's 2,000

function toolUse(id: string): Json {
  return { role: "assistant", content: [{ type: "tool_use", id, name: "Read", input: {} }] };
}

function toolResult(id: string, content: string, marker = false): Json {
  return {
    role: "user",
    content: [
      {
        type: "tool_result",
        tool_use_id: id,
        content,
        ...(marker ? { cache_control: EPHEMERAL } : {}),
      },
    ],
  };
}

/** Provider messages minus the cache_control markers OmniRoute's Claude translator injects. */
function withoutMarkers(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(withoutMarkers);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Json)
        .filter(([key]) => key !== "cache_control")
        .map(([key, entry]) => [key, withoutMarkers(entry)])
    );
  }
  return value;
}

function firstToolResultText(message: unknown): string {
  const blocks = (message as { content: Json[] }).content;
  const block = blocks.find((candidate) => candidate.type === "tool_result");
  assert.ok(block, "expected a tool_result block");
  return String(block.content);
}

async function resetStorage() {
  globalThis.fetch = originalFetch;
  resetAllCircuitBreakers();
  readCacheDb.invalidateDbCache();
  assert.ok(await waitForCallLogSaves(30_000), "the previous test's call-log saves should finish");
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // Legacy stacked settings: the seeded default combo swaps in session-dedup + lite.
  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "stacked",
    autoTriggerTokens: 0,
    cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
    languageConfig: {
      enabled: false,
      defaultLanguage: "en",
      autoDetect: true,
      enabledPacks: ["en"],
    },
  });
}

test.beforeEach(resetStorage);

test.after(async () => {
  globalThis.fetch = originalFetch;
  assert.ok(await waitForCallLogSaves(30_000), "the last test's call-log save should finish");
  await closeCallLogSaves(2_000);
  await cleanup();
});

/** Send a Claude-format request through chatCore and return the body the provider received. */
async function sendToClaude(
  messages: Json[],
  extra: Json = {},
  endpoint = "/v1/messages"
): Promise<Json> {
  let captured: Json | null = null;
  globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
    if (String(url).includes("/v1/messages") && init?.body) {
      // The Claude executor may gzip the request body; decode it before parsing.
      const raw = init.body as string | Uint8Array;
      const text = typeof raw === "string" ? raw : zlib.gunzipSync(Buffer.from(raw)).toString();
      captured = JSON.parse(text) as Json;
    }
    return Response.json({
      id: "msg_test",
      type: "message",
      role: "assistant",
      model: "claude-opus-5",
      content: [{ type: "text", text: "OK" }],
      usage: { input_tokens: 4, output_tokens: 1 },
    });
  };
  const body = { model: "claude-opus-5", max_tokens: 64, stream: false, messages, ...extra };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "claude", model: "claude-opus-5", extendedContext: false },
    credentials: { apiKey: "test-claude-key", providerSpecificData: {} },
    log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
    clientRawRequest: {
      endpoint,
      body: structuredClone(body),
      // Opt into lossy compression (lite tool-result truncation), as the incident operator had.
      headers: new Headers({
        "content-type": "application/json",
        "x-omniroute-compression": "allow-lossy",
      }),
    },
    connectionId: null,
    onCredentialsRefreshed: () => {},
    onRequestSuccess: () => {},
    onStreamFailure: () => {},
    onDisconnect: () => {},
    userAgent: "test-agent",
    comboName: null,
  });
  assert.ok(result.success, `request should succeed: ${JSON.stringify(result).slice(0, 600)}`);
  assert.ok(captured, "the provider request should be captured");
  return captured as Json;
}

test("an old tool result at or before the last breakpoint reaches Claude byte-identical (#297)", async () => {
  const messages = [
    { role: "user", content: "start" },
    toolUse("t1"),
    toolResult("t1", LONG),
    toolUse("t2"),
    toolResult("t2", "short result", true),
    { role: "assistant", content: [{ type: "text", text: "thinking" }] },
    { role: "user", content: "current question" },
  ];

  const sent = (await sendToClaude(structuredClone(messages))).messages as Json[];

  assert.equal(firstToolResultText(sent[2]), LONG, "the cached tool result must not be truncated");
  assert.deepEqual(withoutMarkers(sent.slice(0, 5)), withoutMarkers(messages.slice(0, 5)));
});

test("tool results after the last breakpoint are still truncated by lite", async () => {
  const messages = [
    { role: "user", content: "start" },
    toolUse("t1"),
    toolResult("t1", "short result", true),
    toolUse("t2"),
    toolResult("t2", LONG),
    { role: "assistant", content: [{ type: "text", text: "thinking" }] },
    { role: "user", content: "current question" },
  ];

  const sent = (await sendToClaude(structuredClone(messages))).messages as Json[];

  assert.deepEqual(withoutMarkers(sent.slice(0, 3)), withoutMarkers(messages.slice(0, 3)));
  assert.ok(
    firstToolResultText(sent[4]).length < LONG.length,
    "an uncached, non-current-turn tool result keeps being compressed"
  );
});

test("a top-level cache_control protects every message", async () => {
  const messages = [
    { role: "user", content: "start" },
    toolUse("t1"),
    toolResult("t1", LONG),
    { role: "assistant", content: [{ type: "text", text: "thinking" }] },
    { role: "user", content: "current question" },
  ];

  const sent = (await sendToClaude(structuredClone(messages), { cache_control: EPHEMERAL }))
    .messages as Json[];

  assert.equal(firstToolResultText(sent[2]), LONG);
});

test("two consecutive turns send an identical provider-side prefix", async () => {
  const turn1 = [{ role: "user", content: "start" }, toolUse("t1"), toolResult("t1", LONG, true)];
  const turn2 = [
    { role: "user", content: "start" },
    toolUse("t1"),
    toolResult("t1", LONG),
    { role: "assistant", content: [{ type: "text", text: "ok, next" }] },
    toolResult("t2", LONG, true),
  ];

  const sent1 = (await sendToClaude(structuredClone(turn1))).messages as Json[];
  const sent2 = (await sendToClaude(structuredClone(turn2))).messages as Json[];

  assert.equal(firstToolResultText(sent1[2]), LONG, "the current-turn result is sent whole");
  assert.deepEqual(
    JSON.stringify(withoutMarkers(sent2.slice(0, sent1.length))),
    JSON.stringify(withoutMarkers(sent1)),
    "request N's provider messages must be an exact prefix of request N+1's"
  );
});

test("a Claude request with no markers still protects history before the current turn", async () => {
  const messages = [
    { role: "user", content: "start" },
    toolUse("t1"),
    toolResult("t1", LONG),
    { role: "assistant", content: [{ type: "text", text: "thinking" }] },
    { role: "user", content: "current question" },
  ];

  const sent = (await sendToClaude(structuredClone(messages))).messages as Json[];

  assert.equal(firstToolResultText(sent[2]), LONG);
});

test("an OpenAI-format client routed to Claude keeps its old tool message verbatim", async () => {
  const messages = [
    { role: "user", content: "start" },
    {
      role: "assistant",
      content: null,
      tool_calls: [{ id: "call_1", type: "function", function: { name: "Read", arguments: "{}" } }],
    },
    { role: "tool", tool_call_id: "call_1", content: LONG },
    { role: "assistant", content: "thinking" },
    { role: "user", content: "current question" },
  ];

  const sent = (await sendToClaude(structuredClone(messages), {}, "/v1/chat/completions"))
    .messages as Json[];

  const result = sent
    .flatMap((message) => (Array.isArray(message.content) ? (message.content as Json[]) : []))
    .find((block) => block.type === "tool_result");
  assert.ok(result, "the tool message reaches Claude as a tool_result block");
  assert.equal(String(result.content), LONG);
});
