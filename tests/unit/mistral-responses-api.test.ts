// @ts-nocheck
/**
 * Mistral serves the OpenAI Responses format natively at POST /v1/responses
 * (public preview, stateless: https://docs.mistral.ai/studio/conversations/responses).
 * The built-in `mistral` provider dispatches there instead of /v1/chat/completions:
 * Responses clients pass through, Chat Completions clients are translated, and the
 * call-log pipeline keeps the exact wire body.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { CALL_LOG_SETTLE_TIMEOUT_MS } from "../helpers/callLogSettle.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mistral-responses-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Operator config for complete request logs: a 10 MB artifact budget, no per-string
// or per-object cap inside it.
process.env.CALL_LOG_PIPELINE_MAX_SIZE_KB = "10240";
process.env.CHAT_LOG_TEXT_LIMIT = String(8 * 1024 * 1024);
process.env.CHAT_LOG_MAX_OBJECT_KEYS = "0";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const artifacts = await import("../../src/lib/usage/callLogArtifacts.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const MISTRAL_RESPONSES_URL = "https://api.mistral.ai/v1/responses";
const MISTRAL_MODELS_URL = "https://api.mistral.ai/v1/models";
const MODEL = "labs-leanstral-1-5-1";

const originalFetch = globalThis.fetch;

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

async function flushAsyncSideEffects() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

function responsesJson(text: string) {
  return {
    id: "resp_mistral_1",
    object: "response",
    created_at: 1_793_000_000,
    status: "completed",
    model: MODEL,
    output: [
      {
        id: "msg_mistral_1",
        type: "message",
        role: "assistant",
        status: "completed",
        content: [{ type: "output_text", text, annotations: [] }],
      },
    ],
    usage: { input_tokens: 7, output_tokens: 1, total_tokens: 8 },
  };
}

function responsesSse(text: string) {
  const response = responsesJson(text);
  const events = [
    { type: "response.created", response: { ...response, status: "in_progress", output: [] } },
    {
      type: "response.output_item.added",
      output_index: 0,
      item: { id: "msg_mistral_1", type: "message", role: "assistant", content: [] },
    },
    {
      type: "response.output_text.delta",
      item_id: "msg_mistral_1",
      output_index: 0,
      content_index: 0,
      delta: text,
    },
    {
      type: "response.output_text.done",
      item_id: "msg_mistral_1",
      output_index: 0,
      content_index: 0,
      text,
    },
    { type: "response.output_item.done", output_index: 0, item: response.output[0] },
    { type: "response.completed", response },
  ];
  return events.map((e) => `event: ${e.type}\ndata: ${JSON.stringify(e)}\n\n`).join("");
}

type Captured = { url: string; headers: Headers; body: Record<string, unknown> };

function installUpstream(captured: Captured[]) {
  globalThis.fetch = async (url, init = {}) => {
    const body = JSON.parse(String(init.body || "{}"));
    captured.push({ url: String(url), headers: new Headers(init.headers), body });
    if (String(url) !== MISTRAL_RESPONSES_URL || !("input" in body) || "messages" in body) {
      return new Response(JSON.stringify({ detail: "wrong endpoint or body shape" }), {
        status: 422,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (body.stream === true) {
      return new Response(responsesSse("OK"), {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response(JSON.stringify(responsesJson("OK")), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
}

async function readStream(response: Response) {
  return response.body ? await new Response(response.body).text() : "";
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await flushAsyncSideEffects();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("mistral registry entry dispatches to the native Responses endpoint", () => {
  const entry = REGISTRY.mistral;
  assert.equal(entry.format, "openai-responses");
  assert.equal(entry.baseUrl, MISTRAL_RESPONSES_URL);
  // Key validation and model discovery must keep using /v1/models — they cannot
  // be derived from a /responses base URL.
  assert.equal(entry.modelsUrl, MISTRAL_MODELS_URL);
  assert.equal(entry.testKeyModelsUrl, MISTRAL_MODELS_URL);
});

test("DefaultExecutor builds the Mistral Responses URL for streaming and non-streaming", () => {
  const executor = new DefaultExecutor("mistral");
  assert.equal(executor.buildUrl(MODEL, true, 0, { apiKey: "k" }), MISTRAL_RESPONSES_URL);
  assert.equal(executor.buildUrl(MODEL, false, 0, { apiKey: "k" }), MISTRAL_RESPONSES_URL);
});

test("a Responses client streams through to Mistral /v1/responses", async () => {
  const captured: Captured[] = [];
  installUpstream(captured);
  const body = {
    model: `mistral/${MODEL}`,
    instructions: "You are Ping.",
    input: [{ role: "user", content: [{ type: "input_text", text: "Reply with exactly OK" }] }],
    stream: true,
  };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "mistral", model: MODEL, extendedContext: false },
    credentials: { apiKey: "test-mistral-key", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/responses",
      body: structuredClone(body),
      headers: new Headers({ accept: "text/event-stream" }),
    },
  });

  assert.equal(captured.length, 1, JSON.stringify(captured, null, 2));
  const [wire] = captured;
  assert.equal(wire.url, MISTRAL_RESPONSES_URL);
  assert.equal(wire.headers.get("authorization"), "Bearer test-mistral-key");
  assert.equal(wire.body.model, MODEL);
  assert.equal(wire.body.stream, true);
  assert.equal("messages" in wire.body, false);
  assert.ok(Array.isArray(wire.body.input));
  assert.equal(result.success, true);
  const text = await readStream(result.response);
  assert.match(text, /response\.output_text\.delta/);
  assert.match(text, /response\.completed/);
});

test("a Chat Completions client is translated to Mistral /v1/responses", async () => {
  const captured: Captured[] = [];
  installUpstream(captured);
  const body = {
    model: `mistral/${MODEL}`,
    messages: [
      { role: "system", content: "You are Ping." },
      { role: "user", content: "Reply with exactly OK" },
    ],
    max_tokens: 64,
    stream: false,
  };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "mistral", model: MODEL, extendedContext: false },
    credentials: { apiKey: "test-mistral-key", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json" }),
    },
  });

  assert.equal(captured.length, 1, JSON.stringify(captured, null, 2));
  const [wire] = captured;
  assert.equal(wire.url, MISTRAL_RESPONSES_URL);
  assert.equal(wire.body.model, MODEL);
  assert.equal("messages" in wire.body, false);
  assert.ok(Array.isArray(wire.body.input), JSON.stringify(wire.body));
  assert.equal(wire.body.max_output_tokens, 64);
  assert.equal(result.success, true);
  const json = await result.response.json();
  assert.equal(json.object, "chat.completion");
  assert.equal(json.choices[0].message.content, "OK");
});

test("the call log keeps the full Mistral Responses wire payload", async () => {
  await settingsDb.updateSettings({ call_log_pipeline_enabled: true });
  const captured: Captured[] = [];
  installUpstream(captured);
  // ~400 KB of history (inside the model's context window): the artifact holds several
  // copies of it, far above the 512 KB non-pipeline cap — the size of a long agent turn.
  const bigText = "x".repeat(400 * 1024);
  const body = {
    model: `mistral/${MODEL}`,
    input: [
      { role: "user", content: [{ type: "input_text", text: bigText }] },
      { role: "user", content: [{ type: "input_text", text: "Reply with exactly OK" }] },
    ],
    // A real agent tool schema with more than 80 properties (the old hardcoded key cap).
    tools: [
      {
        type: "function",
        name: "configure",
        description: "Change settings.",
        parameters: {
          type: "object",
          properties: Object.fromEntries(
            Array.from({ length: 88 }, (_, i) => [`setting_${i}`, { type: "string" }])
          ),
        },
      },
    ],
    stream: false,
  };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "mistral", model: MODEL, extendedContext: false },
    credentials: {
      apiKey: "test-mistral-key",
      providerSpecificData: {},
      connectionId: "mistral-log",
    },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/responses",
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json" }),
    },
  });
  assert.equal(
    result.success,
    true,
    `${result.status} ${result.error} upstream=${captured.length}`
  );
  await result.response.text();
  assert.equal(await callLogs.waitForCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS), true);

  const row = core
    .getDbInstance()
    .prepare(
      "SELECT id, artifact_relpath FROM call_logs WHERE provider = 'mistral' ORDER BY timestamp DESC LIMIT 1"
    )
    .get() as { id: string; artifact_relpath: string | null };
  assert.ok(row?.artifact_relpath, "a call log artifact must be written");
  const { artifact } = artifacts.readCallArtifact(row.artifact_relpath);
  const serialized = JSON.stringify(artifact);
  assert.equal(
    serialized.includes("_omniroute_truncated"),
    false,
    "artifact must not be truncated"
  );

  const [wire] = captured;
  const providerRequest = artifact.pipeline.providerRequest;
  assert.equal(providerRequest.url, MISTRAL_RESPONSES_URL);
  assert.equal(providerRequest.body.input[0].content[0].text.length, bigText.length);
  assert.deepEqual(providerRequest.body, wire.body);
  assert.equal(providerRequest.headers.Authorization, "[REDACTED]");
  assert.equal(artifact.pipeline.providerResponse.body.output[0].content[0].text, "OK");
});
