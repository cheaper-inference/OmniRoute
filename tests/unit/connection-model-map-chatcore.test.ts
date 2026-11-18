// Connection model map through the real handleChatCore: dispatch, cache hit logging and billing.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-connection-model-map-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(TEST_DATA_DIR, "plugins");

const core = await import("../../src/lib/db/core.ts");
const { clearCache } = await import("../../src/lib/semanticCache.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { clearPendingRequests } = await import("../../src/lib/usage/usageHistory.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { calculateCostDetailed } = await import("../../src/lib/usage/costCalculator.ts");
const { getCostSummary } = await import("../../src/domain/costRules.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const originalFetch = globalThis.fetch;

const USAGE = { prompt_tokens: 1000, completion_tokens: 500, total_tokens: 1500 };
const log = { debug() {}, info() {}, warn() {}, error() {} };

function completion(stream: boolean, model: string) {
  const chunk = {
    id: "chatcmpl-model-map",
    object: stream ? "chat.completion.chunk" : "chat.completion",
    model,
    choices: [
      {
        index: 0,
        ...(stream
          ? { delta: { role: "assistant", content: "ok" } }
          : { message: { role: "assistant", content: "ok" } }),
        finish_reason: "stop",
      },
    ],
    usage: USAGE,
  };
  return new Response(
    stream ? `data: ${JSON.stringify(chunk)}\n\ndata: [DONE]\n\n` : JSON.stringify(chunk),
    { headers: { "Content-Type": stream ? "text/event-stream" : "application/json" } }
  );
}

type Dispatch = { url: string; model: unknown };

async function invoke({
  model = "gpt-4o",
  provider = "openai",
  stream = false,
  modelMap,
  apiKeyId = "model-map-key",
  respond = (m: string) => completion(stream, m),
}: {
  model?: string;
  provider?: string;
  stream?: boolean;
  modelMap?: Record<string, string> | null;
  apiKeyId?: string;
  respond?: (model: string, attempt: number) => Response;
}) {
  const dispatches: Dispatch[] = [];
  globalThis.fetch = async (url, init) => {
    const sent = JSON.parse(String(init?.body ?? "{}")) as { model?: string };
    dispatches.push({ url: String(url), model: sent.model });
    return respond(String(sent.model), dispatches.length);
  };
  const body = {
    model,
    stream,
    temperature: 0,
    messages: [{ role: "user", content: `offline model map ${model} ${stream}` }],
  };
  const caller = structuredClone(body);
  const result = await handleChatCore({
    body: caller,
    modelInfo: { provider, model },
    credentials: { apiKey: "sk-test", providerSpecificData: {}, modelMap },
    apiKeyInfo: { id: apiKeyId, cacheDefaultMode: "legacy" },
    log,
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: stream ? "text/event-stream" : "application/json" }),
    },
  } as Parameters<typeof handleChatCore>[0]);
  return { result, dispatches, caller };
}

async function settle() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
  await waitForCallLogSaves(5000);
}

function latestUsage() {
  return core
    .getDbInstance()
    .prepare("SELECT model, requested_model, actual_model FROM usage_history ORDER BY id DESC")
    .get() as { model: string; requested_model: string; actual_model: string } | undefined;
}

function latestCallLog() {
  return core
    .getDbInstance()
    .prepare("SELECT model, requested_model, actual_model FROM call_logs ORDER BY timestamp DESC")
    .get() as { model: string; requested_model: string; actual_model: string } | undefined;
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await waitForCallLogSaves(5000);
  clearPendingRequests();
  clearInflight();
  clearCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await waitForCallLogSaves(5000);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const stream of [false, true]) {
  const mode = stream ? "streaming" : "non-streaming";

  test(`a map hit dispatches the target and records both models (${mode})`, async () => {
    const { result, dispatches, caller } = await invoke({
      stream,
      modelMap: { "gpt-4o": "gpt-4o-mini" },
    });
    assert.equal(result.success, true);
    await result.response.text();
    await settle();
    assert.deepEqual(
      dispatches.map((d) => d.model),
      ["gpt-4o-mini"]
    );
    assert.equal(caller.model, "gpt-4o", "the caller's object survives for an account fallback");
    assert.deepEqual(latestUsage(), {
      model: "gpt-4o",
      requested_model: "gpt-4o",
      actual_model: "gpt-4o-mini",
    });
    assert.equal(latestCallLog()?.actual_model, "gpt-4o-mini");
  });

  test(`a connection without a map dispatches and logs the model untouched (${mode})`, async () => {
    const { result, dispatches } = await invoke({ stream, modelMap: null });
    assert.equal(result.success, true);
    await result.response.text();
    await settle();
    assert.deepEqual(
      dispatches.map((d) => d.model),
      ["gpt-4o"]
    );
    assert.deepEqual(latestUsage(), {
      model: "gpt-4o",
      requested_model: "gpt-4o",
      actual_model: "gpt-4o",
    });
  });
}

test("a cache hit logs before dispatch without a TDZ and records the actual model", async () => {
  const modelMap = { "gpt-4o": "gpt-4o-mini" };
  const first = await invoke({ modelMap });
  assert.equal(first.result.success, true);
  await first.result.response.text();
  await settle();

  const hit = await invoke({ modelMap });
  assert.equal(hit.result.success, true);
  await hit.result.response.text();
  await settle();
  assert.equal(hit.dispatches.length, 0, "the second identical request must be a cache hit");
  assert.equal(latestCallLog()?.actual_model, "gpt-4o-mini");
});

test("billing follows the mapped model only when the map rewrote it", async () => {
  const usage = { prompt_tokens: 1000, completion_tokens: 500 };
  const mapped = await calculateCostDetailed("openai", "gpt-4o-mini", usage);
  const routed = await calculateCostDetailed("openai", "gpt-4o", usage);
  assert.notEqual(mapped.costUsd, routed.costUsd, "the fixture must tell the two prices apart");

  const hit = await invoke({ apiKeyId: "billed-map", modelMap: { "gpt-4o": "gpt-4o-mini" } });
  await hit.result.response.text();
  await settle();
  assert.equal(getCostSummary("billed-map").dailyTotal, mapped.costUsd);

  const miss = await invoke({ apiKeyId: "billed-miss", modelMap: { other: "gpt-4o-mini" } });
  await miss.result.response.text();
  await settle();
  assert.equal(getCostSummary("billed-miss").dailyTotal, routed.costUsd);
});

function claudeResponse(stream: boolean, model: string) {
  const usage = { input_tokens: 1000, output_tokens: 500 };
  if (!stream) {
    return Response.json({
      id: "msg_fallback",
      type: "message",
      role: "assistant",
      model,
      content: [{ type: "text", text: "ok" }],
      stop_reason: "end_turn",
      usage,
    });
  }
  const events: [string, unknown][] = [
    [
      "message_start",
      {
        type: "message_start",
        message: {
          id: "msg_fallback",
          type: "message",
          role: "assistant",
          model,
          content: [],
          usage: { input_tokens: 1000, output_tokens: 0 },
        },
      },
    ],
    [
      "content_block_start",
      { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
    ],
    [
      "content_block_delta",
      { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "ok" } },
    ],
    ["content_block_stop", { type: "content_block_stop", index: 0 }],
    [
      "message_delta",
      {
        type: "message_delta",
        delta: { stop_reason: "end_turn" },
        usage: { output_tokens: 500 },
      },
    ],
    ["message_stop", { type: "message_stop" }],
  ];
  return new Response(
    events.map(([e, d]) => `event: ${e}\ndata: ${JSON.stringify(d)}\n\n`).join(""),
    { headers: { "Content-Type": "text/event-stream" } }
  );
}

for (const stream of [false, true]) {
  // Effort variants are the common case of a served id that differs from the routed `model`. How
  // they are priced is a separate billing policy: this feature must not move it for unmapped traffic.
  test(`without a map an effort variant keeps its routed billing, stream=${stream}`, async () => {
    // #18754 prices an effort variant like its base model, so a user override on the routed id is
    // what tells the two prices apart here.
    await updatePricing({ anthropic: { "claude-opus-5-5-high": { input: 40, output: 200 } } });
    const usage = { prompt_tokens: 1000, completion_tokens: 500 };
    const routed = await calculateCostDetailed("anthropic", "claude-opus-5-5-high", usage);
    const served = await calculateCostDetailed("anthropic", "claude-opus-5-5", usage);
    assert.notEqual(routed.costUsd, served.costUsd, "the fixture must tell the two prices apart");

    const apiKeyId = `billed-variant-${stream}`;
    const { result, dispatches } = await invoke({
      apiKeyId,
      stream,
      provider: "anthropic",
      model: "claude-opus-5-5-high",
      modelMap: null,
      respond: (model) => claudeResponse(stream, model),
    });
    assert.equal(result.success, true);
    await result.response.text();
    await settle();
    assert.deepEqual(
      dispatches.map((d) => d.model),
      ["claude-opus-5-5"]
    );
    assert.equal(getCostSummary(apiKeyId).dailyTotal, routed.costUsd);
  });
}
