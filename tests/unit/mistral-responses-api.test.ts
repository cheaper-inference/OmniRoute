// @ts-nocheck
/**
 * Mistral serves the OpenAI Responses format natively at POST /v1/responses
 * (public preview, stateless: https://docs.mistral.ai/studio/conversations/responses).
 * That endpoint is opt-in per model: a model tagged in the registry, or a custom model
 * configured for Responses, dispatches there; every other Mistral model stays on
 * /v1/chat/completions. On the Responses path, Responses clients pass through, Chat
 * Completions clients are translated, and the call-log pipeline keeps the exact wire body.
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
const MISTRAL_CHAT_URL = "https://api.mistral.ai/v1/chat/completions";
const MODEL = "labs-leanstral-1-5-1";
const CHAT_MODEL = "mistral-large-4";

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

function chatJson(text: string) {
  return {
    id: "chatcmpl_mistral_1",
    object: "chat.completion",
    created: 1_793_000_000,
    model: CHAT_MODEL,
    choices: [{ index: 0, finish_reason: "stop", message: { role: "assistant", content: text } }],
    usage: { prompt_tokens: 7, completion_tokens: 1, total_tokens: 8 },
  };
}

function installChatUpstream(captured: Captured[]) {
  globalThis.fetch = async (url, init = {}) => {
    const body = JSON.parse(String(init.body || "{}"));
    captured.push({ url: String(url), headers: new Headers(init.headers), body });
    if (String(url) !== MISTRAL_CHAT_URL || !("messages" in body) || "input" in body) {
      return new Response(JSON.stringify({ detail: "wrong endpoint or body shape" }), {
        status: 422,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(chatJson("OK")), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
}

function callChatCore(body, endpoint: string, modelInfo: Record<string, unknown> = {}) {
  return handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "mistral", model: MODEL, extendedContext: false, ...modelInfo },
    credentials: { apiKey: "test-mistral-key", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint,
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json" }),
    },
  });
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

test("the mistral provider stays on Chat Completions; only tagged models opt in", () => {
  const entry = REGISTRY.mistral;
  assert.equal(entry.format, "openai");
  assert.equal(entry.baseUrl, MISTRAL_CHAT_URL);
  const tagged = entry.models.filter((model) => model.targetFormat === "openai-responses");
  assert.deepEqual(
    tagged.map((model) => model.id),
    [MODEL]
  );
});

test("DefaultExecutor builds the Mistral URL from the model's opt-in", () => {
  const executor = new DefaultExecutor("mistral");
  for (const stream of [true, false]) {
    assert.equal(executor.buildUrl(MODEL, stream, 0, { apiKey: "k" }), MISTRAL_RESPONSES_URL);
    assert.equal(executor.buildUrl(CHAT_MODEL, stream, 0, { apiKey: "k" }), MISTRAL_CHAT_URL);
  }
  const configured = {
    apiKey: "k",
    providerSpecificData: { _omnirouteForceResponsesUpstream: true },
  };
  assert.equal(executor.buildUrl(CHAT_MODEL, true, 0, configured), MISTRAL_RESPONSES_URL);
});

test("a connection's base URL override applies to both Mistral endpoints", () => {
  const executor = new DefaultExecutor("mistral");
  for (const baseUrl of ["https://gw.example/v1", "https://gw.example/v1/chat/completions"]) {
    const credentials = { apiKey: "k", providerSpecificData: { baseUrl } };
    assert.equal(executor.buildUrl(MODEL, true, 0, credentials), "https://gw.example/v1/responses");
    assert.equal(
      executor.buildUrl(CHAT_MODEL, true, 0, credentials),
      "https://gw.example/v1/chat/completions"
    );
  }
});

test("an untagged Mistral model keeps Chat Completions for Chat and Responses clients", async () => {
  const chatBody = {
    model: `mistral/${CHAT_MODEL}`,
    messages: [{ role: "user", content: "Reply with exactly OK" }],
    stream: false,
  };
  const responsesBody = {
    model: `mistral/${CHAT_MODEL}`,
    input: [{ role: "user", content: [{ type: "input_text", text: "Reply with exactly OK" }] }],
    stream: false,
  };
  for (const [body, endpoint] of [
    [chatBody, "/v1/chat/completions"],
    [responsesBody, "/v1/responses"],
  ]) {
    const captured: Captured[] = [];
    installChatUpstream(captured);
    const result = await callChatCore(body, endpoint, { model: CHAT_MODEL });
    assert.equal(captured.length, 1, JSON.stringify(captured, null, 2));
    assert.equal(captured[0].url, MISTRAL_CHAT_URL);
    assert.ok(Array.isArray(captured[0].body.messages), JSON.stringify(captured[0].body));
    assert.equal("input" in captured[0].body, false);
    assert.equal(result.success, true);
  }
});

for (const [label, configured] of [
  ["targetFormat", { targetFormat: "openai-responses" }],
  ["apiFormat", { apiFormat: "responses" }],
]) {
  test(`a Mistral model configured through ${label} dispatches to /v1/responses`, async () => {
    const captured: Captured[] = [];
    installUpstream(captured);
    const body = {
      model: `mistral/${CHAT_MODEL}`,
      messages: [{ role: "user", content: "Reply with exactly OK" }],
      stream: false,
    };
    const result = await callChatCore(body, "/v1/chat/completions", {
      model: CHAT_MODEL,
      ...configured,
    });
    assert.equal(captured.length, 1, JSON.stringify(captured, null, 2));
    assert.equal(captured[0].url, MISTRAL_RESPONSES_URL);
    assert.ok(Array.isArray(captured[0].body.input), JSON.stringify(captured[0].body));
    assert.equal("messages" in captured[0].body, false);
    assert.equal(result.success, true);
  });
}

test("a Responses body drops a trailing assistant turn before Mistral /v1/responses", async () => {
  const captured: Captured[] = [];
  installUpstream(captured);
  const body = {
    model: `mistral/${MODEL}`,
    input: [
      { role: "user", content: [{ type: "input_text", text: "Reply with exactly OK" }] },
      { role: "assistant", content: [{ type: "output_text", text: "Prefilled" }] },
    ],
    stream: false,
  };
  const result = await callChatCore(body, "/v1/responses");
  assert.equal(captured.length, 1, JSON.stringify(captured, null, 2));
  assert.deepEqual(
    captured[0].body.input.map((item) => item.role),
    ["user"]
  );
  assert.equal(result.success, true);
});

test("reasoning_effort reaches Mistral /v1/responses effort-only", async () => {
  const captured: Captured[] = [];
  installUpstream(captured);
  const body = {
    model: `mistral/${MODEL}`,
    messages: [{ role: "user", content: "Reply with exactly OK" }],
    reasoning_effort: "high",
    stream: false,
  };
  const result = await callChatCore(body, "/v1/chat/completions");
  assert.equal(captured.length, 1, JSON.stringify(captured, null, 2));
  assert.deepEqual(captured[0].body.reasoning, { effort: "high" });
  assert.equal("include" in captured[0].body, false);
  assert.equal(result.success, true);
});

test("a Responses client's explicit reasoning summary reaches Mistral unchanged", async () => {
  const captured: Captured[] = [];
  installUpstream(captured);
  const body = {
    model: `mistral/${MODEL}`,
    input: [{ role: "user", content: [{ type: "input_text", text: "Reply with exactly OK" }] }],
    reasoning: { effort: "high", summary: "detailed" },
    stream: false,
  };
  const result = await callChatCore(body, "/v1/responses");
  assert.equal(captured.length, 1, JSON.stringify(captured, null, 2));
  assert.deepEqual(captured[0].body.reasoning, { effort: "high", summary: "detailed" });
  assert.equal(result.success, true);
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
  assert.equal("stream_options" in wire.body, false);
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
