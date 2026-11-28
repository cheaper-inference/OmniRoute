import assert from "node:assert/strict";
import dns from "node:dns";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-digitalocean-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_SEMANTIC_CACHE_ENABLED = "false";

const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { extractUsageFromResponse } = await import("../../open-sse/handlers/usageExtractor.ts");
const { createPassthroughStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createProviderConnection, getProviderConnectionById } =
  await import("../../src/lib/db/providers.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
const { GET: discoverModels } = await import("../../src/app/api/providers/[id]/models/route.ts");
const {
  enableRateLimitProtection,
  disableRateLimitProtection,
  getLearnedLimits,
  updateFromHeaders,
} = await import("../../open-sse/services/rateLimitManager.ts");

test.after(async () => {
  await waitForCallLogSaves(10_000);
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

const baseUrl = "https://inference.do-ai.run/v1";
const provider = "digitalocean";
const chatModel = "openai-gpt-5.6-sol";
const credentials = { apiKey: "test-do-key" };
const log = { debug() {}, info() {}, warn() {}, error() {} };
const prompt = [{ role: "user", content: "Check the weather." }];
const tool = {
  type: "function",
  function: {
    name: "weather",
    description: "Look up the weather",
    parameters: { type: "object", properties: {}, additionalProperties: true },
  },
};
const usage = {
  prompt_tokens: 110,
  completion_tokens: 7,
  total_tokens: 117,
  cache_created_input_tokens: 20,
  cache_read_input_tokens: 60,
  prompt_tokens_details: { cached_tokens: 60 },
};

function chatPayload(model = chatModel, responseUsage: object = usage) {
  return {
    id: "chatcmpl-do",
    object: "chat.completion",
    created: 1,
    model,
    choices: [{ index: 0, message: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
    usage: responseUsage,
  };
}

function observeFetch(t: TestContext, respond: (call: FetchCall) => Response) {
  const calls: FetchCall[] = [];
  t.mock.method(globalThis, "fetch", async (url: string | URL | Request, init?: RequestInit) => {
    const call = {
      url: String(url),
      method: init?.method ?? "GET",
      headers: new Headers(init?.headers),
      body: typeof init?.body === "string" ? JSON.parse(init.body) : null,
    };
    calls.push(call);
    return respond(call);
  });
  return calls;
}

type TestContext = import("node:test").TestContext;
type FetchCall = {
  url: string;
  method: string;
  headers: Headers;
  body: Record<string, unknown> | null;
};

function requestChat(
  model: string,
  fields: Record<string, unknown> = {},
  endpoint = "/v1/chat/completions"
) {
  const body = { model: `${provider}/${model}`, messages: prompt, stream: false, ...fields };
  return handleChatCore({
    body,
    modelInfo: { provider, model, extendedContext: false },
    credentials,
    log,
    skipUpstreamRetry: true,
    clientRawRequest: {
      endpoint,
      headers: new Headers({ accept: "application/json" }),
      body: structuredClone(body),
    },
  } as Parameters<typeof handleChatCore>[0]);
}

test("live model discovery reads the DigitalOcean OpenAI list using bearer auth", async (t) => {
  const models = [{ id: chatModel, object: "model", owned_by: "openai", created: 1 }];
  const calls = observeFetch(t, () => Response.json({ object: "list", data: models }));
  t.mock.method(dns.promises, "lookup", async () => [{ address: "203.0.113.1", family: 4 }]);
  const connection = await createProviderConnection({
    provider,
    name: "live catalog",
    authType: "apikey",
    apiKey: credentials.apiKey,
  });
  const response = await discoverModels(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.source, "api");
  assert.deepEqual(
    payload.models.map((model: { id: string }) => model.id),
    [chatModel]
  );
  assert.equal(calls.length, 1);
  assert.equal(calls[0].method, "GET");
  assert.equal(calls[0].url, `${baseUrl}/models`);
  assert.equal(calls[0].headers.get("authorization"), "Bearer test-do-key");
});

const responseModels = [
  "openai-gpt-5.5",
  "openai-gpt-5.4",
  "openai-gpt-5.4-mini",
  "openai-gpt-5.4-nano",
  "openai-gpt-5.4-pro",
  "openai-gpt-6-astra",
  "openai-gpt-6-1-sol",
  "openai-gpt-6.1-terra",
  "openai-gpt-6-sol",
];

test("live Responses model IDs send Responses input and function tools to /v1/responses", async (t) => {
  const calls = observeFetch(t, (call) =>
    Response.json({
      id: "resp_do",
      object: "response",
      created: 1,
      status: "completed",
      model: call.body?.model,
      output: [
        { type: "message", role: "assistant", content: [{ type: "output_text", text: "OK" }] },
      ],
      usage: { input_tokens: 4, output_tokens: 1, total_tokens: 5 },
    })
  );
  for (const model of responseModels) {
    const result = await requestChat(model, { tools: [tool] });
    await result.response?.text();
  }
  assert.deepEqual(
    calls.map(({ url, body }) => [url, body?.model]),
    responseModels.map((model) => [`${baseUrl}/responses`, model])
  );
  for (const { body } of calls) {
    assert.ok(Array.isArray(body?.input));
    assert.equal(body?.messages, undefined);
    const tools = body?.tools as Array<Record<string, unknown>>;
    assert.equal(tools.length, 1);
    assert.equal(tools[0].type, "function");
    assert.equal(tools[0].name, "weather");
    assert.deepEqual(tools[0].parameters, tool.function.parameters);
  }
});

test("chat-only model IDs keep Chat Completions even for Responses clients", async (t) => {
  const calls = observeFetch(t, (call) => Response.json(chatPayload(String(call.body?.model))));
  const chatModels = [
    chatModel,
    "openai-gpt-5.6-terra",
    "openai-gpt-5.6-luna",
    "kimi-k3",
    "kimi-k3.1-pro",
    "live-chat-id",
  ];
  for (const model of chatModels) {
    const result = await requestChat(
      model,
      { messages: undefined, input: prompt },
      "/v1/responses"
    );
    await result.response?.text();
  }
  assert.equal(calls.length, chatModels.length);
  for (const call of calls) {
    assert.equal(call.url, `${baseUrl}/chat/completions`);
    assert.ok(Array.isArray(call.body?.messages));
    assert.equal(call.body?.input, undefined);
  }
});

test("streaming Chat Completions requests usage, preserves function calls and accounts for the final usage chunk", async (t) => {
  const chunk = {
    id: "chatcmpl-do",
    model: chatModel,
    object: "chat.completion.chunk",
    created: 1,
  };
  const toolCalls = [
    {
      index: 0,
      id: "call_weather",
      type: "function",
      function: { name: "weather", arguments: "{}" },
    },
  ];
  const events = [
    {
      ...chunk,
      choices: [
        { index: 0, delta: { role: "assistant", tool_calls: toolCalls }, finish_reason: null },
      ],
    },
    { ...chunk, choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }] },
    { ...chunk, choices: [], usage },
  ];
  const sse =
    events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("") + "data: [DONE]\n\n";
  const calls = observeFetch(
    t,
    () => new Response(sse, { headers: { "Content-Type": "text/event-stream" } })
  );
  const result = await requestChat(chatModel, { stream: true, tools: [tool] });
  assert.equal(result.response?.status, 200);
  const wire = await result.response!.text();
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `${baseUrl}/chat/completions`);
  assert.deepEqual(calls[0].body?.stream_options, { include_usage: true });
  assert.deepEqual(calls[0].body?.tools, [tool]);
  assert.match(wire, /"tool_calls":\[/);
  assert.match(wire, /"choices":\[\],"usage":/);
  assert.match(wire, /data: \[DONE\]/);

  let accounted: unknown;
  const stream = createPassthroughStreamWithLogger(
    provider,
    null,
    null,
    chatModel,
    null,
    { messages: prompt, tools: [tool] },
    ({ usage: tokenUsage }) => {
      accounted = tokenUsage;
    }
  );
  await new Response(new Response(sse).body!.pipeThrough(stream)).text();
  assert.ok(accounted);
  const accounting = accounted as Record<string, unknown>;
  assert.equal(accounting.prompt_tokens, 110);
  assert.equal(accounting.completion_tokens, 7);
  assert.equal(accounting.cached_tokens, 60);
  assert.equal(accounting.cache_creation_input_tokens, 20);
});

test("non-streaming Chat Completions account for cache reads and writes without increasing input totals", async (t) => {
  observeFetch(t, () => Response.json(chatPayload()));
  const result = await requestChat(chatModel);
  const payload = await result.response!.json();
  const tokens = extractUsageFromResponse(payload, provider);
  assert.equal(tokens.prompt_tokens, 110);
  assert.equal(tokens.completion_tokens, 7);
  assert.equal(tokens.cached_tokens, 60);
  assert.equal(tokens.cache_creation_input_tokens, 20);
});

test("embeddings forwards the documented fields and returns base64 vectors", async (t) => {
  const model = "qwen3-embedding-0.6b";
  const calls = observeFetch(t, () =>
    Response.json({
      model,
      object: "list",
      data: [{ embedding: "AACAPw==", index: 0, object: "embedding" }],
      usage: { prompt_tokens: 2, total_tokens: 2 },
    })
  );
  const result = await handleEmbedding({
    body: {
      model: `${provider}/${model}`,
      input: ["text"],
      encoding_format: "base64",
      user: "user-1",
      dimensions: 256,
      extra: "omit",
    },
    credentials,
  });
  assert.equal(result.success, true, JSON.stringify(result));
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `${baseUrl}/embeddings`);
  assert.equal(calls[0].method, "POST");
  assert.equal(calls[0].headers.get("authorization"), "Bearer test-do-key");
  assert.deepEqual(calls[0].body, {
    model,
    input: ["text"],
    encoding_format: "base64",
    user: "user-1",
  });
  assert.equal(result.data?.data[0].embedding, "AACAPw==");
});

test("image generation sends documented options and accepts a b64_json-only payload", async (t) => {
  const calls = observeFetch(t, () =>
    Response.json({
      created: 1,
      data: [{ b64_json: "aW1hZ2U=", revised_prompt: "A lighthouse" }],
    })
  );
  const model = "openai-gpt-image-2";
  const options = {
    n: 1,
    size: "1536x1024",
    quality: "high",
    background: "auto",
    moderation: "low",
    user: "user-1",
  };
  const result = await handleImageGeneration({
    body: {
      model: `${provider}/${model}`,
      prompt: "A lighthouse",
      ...options,
      response_format: "b64_json",
      style: "vivid",
    },
    credentials,
    log: null,
  } as Parameters<typeof handleImageGeneration>[0]);
  assert.equal(result.success, true, JSON.stringify(result));
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `${baseUrl}/images/generations`);
  assert.equal(calls[0].method, "POST");
  assert.equal(calls[0].headers.get("authorization"), "Bearer test-do-key");
  assert.deepEqual(calls[0].body, { model, prompt: "A lighthouse", ...options });
  assert.deepEqual(result.data?.data, [{ b64_json: "aW1hZ2U=", revised_prompt: "A lighthouse" }]);
});

test("401 surfaces the DigitalOcean error and preserves the upstream status", async (t) => {
  observeFetch(t, () =>
    Response.json({ id: "unauthorized", message: "The key is invalid" }, { status: 401 })
  );
  for (const stream of [false, true]) {
    const result = await requestChat(chatModel, { stream });
    assert.equal(result.response?.status, 401);
    const payload = await result.response!.json();
    assert.match(payload.error.message, /The key is invalid/);
    assert.equal(payload.error.code, "unauthorized");
  }
});

test("403 for a paused key cools only the failing connection, across models", async (t) => {
  const message = "This resource has been blocked";
  observeFetch(t, () => Response.json({ id: "forbidden", message }, { status: 403 }));
  const failed = await createProviderConnection({
    provider,
    name: "paused",
    authType: "apikey",
    apiKey: "paused",
  });
  const healthy = await createProviderConnection({
    provider,
    name: "healthy",
    authType: "apikey",
    apiKey: "healthy",
  });
  const result = await requestChat(chatModel);
  assert.equal(result.response?.status, 403);
  const payload = await result.response!.json();
  assert.match(payload.error.message, new RegExp(message));
  await markAccountUnavailable(failed.id, 403, message, provider, chatModel);
  assert.ok(
    Date.parse(String((await getProviderConnectionById(failed.id))?.rateLimitedUntil)) > Date.now()
  );
  assert.equal((await getProviderConnectionById(healthy.id))?.rateLimitedUntil ?? null, null);
});

test("429 uses the DigitalOcean Unix reset for the connection cooldown", async (t) => {
  const reset = Math.floor(Date.now() / 1000) + 120;
  const limitHeaders = {
    "ratelimit-limit": "250",
    "ratelimit-remaining": "0",
    "ratelimit-reset": String(reset),
  };
  observeFetch(t, () =>
    Response.json(
      { id: "too_many_requests", message: "Too many requests" },
      { status: 429, headers: limitHeaders }
    )
  );
  const connection = await createProviderConnection({
    provider,
    name: "limited",
    authType: "apikey",
    apiKey: "limited",
  });
  for (const stream of [false, true]) {
    const result = await requestChat(chatModel, { stream });
    assert.equal(result.response?.status, 429);
    const retry = Number(result.response?.headers.get("retry-after"));
    assert.ok(retry > 0, `retry-after: ${retry}`);
    assert.ok(Math.abs(Date.now() + retry * 1000 - reset * 1000) < 2_000);
    await result.response?.text();
  }

  await markAccountUnavailable(connection.id, 429, "Too many requests", provider, chatModel, null, {
    headers: new Headers(limitHeaders),
    persistUnavailableState: false,
    isCombo: true,
  });
  const until = Date.parse(
    String((await getProviderConnectionById(connection.id))?.rateLimitedUntil)
  );
  assert.ok(Math.abs(until - reset * 1000) < 100, `connection cooldown: ${until}`);
});

test("successful responses teach the limiter DigitalOcean's limit and remaining count", (t) => {
  const connectionId = "do-learned-limit";
  enableRateLimitProtection(connectionId);
  t.after(() => disableRateLimitProtection(connectionId));
  updateFromHeaders(
    provider,
    connectionId,
    new Headers({
      "ratelimit-limit": "250",
      "ratelimit-remaining": "17",
      "ratelimit-reset": String(Math.floor(Date.now() / 1000) + 40),
    }),
    200
  );
  const learned = getLearnedLimits()[`${provider}:${connectionId}`];
  assert.equal(learned?.limit, 250);
  assert.equal(learned?.remaining, 17);
});

test("424 is a transient server failure and advances a priority combo", async (t) => {
  const first = "kimi-k3";
  const next = "openai-gpt-5.6-terra";
  const calls = observeFetch(t, (call) =>
    call.body?.model === first
      ? Response.json(
          { id: "failed_dependency", message: "Upstream provider failure" },
          { status: 424 }
        )
      : Response.json(chatPayload(next))
  );
  let reason: string | undefined;
  const response = await handleComboChat({
    body: { messages: prompt, stream: false },
    combo: {
      name: "do-fallback",
      strategy: "priority",
      models: [`${provider}/${first}`, `${provider}/${next}`],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body, target) => {
      const model = target.slice(provider.length + 1);
      const result = await requestChat(model);
      if (model === first) {
        assert.equal(result.response?.status, 424);
        const payload = await result.response!.clone().json();
        reason = checkFallbackError(424, payload.error.message, 0, model, provider).reason;
      }
      return result.response!;
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  });
  assert.equal(response.status, 200);
  await response.text();
  assert.deepEqual(
    calls.map((call) => call.body?.model),
    [first, next]
  );
  assert.equal(reason, "server_error");
  assert.notEqual(
    checkFallbackError(424, "Upstream provider failure", 0, next, "openai").reason,
    reason
  );
});

test("embedding errors use the upstream reset to cool the DigitalOcean connection", async (t) => {
  const reset = Math.floor(Date.now() / 1000) + 120;
  observeFetch(t, () =>
    Response.json(
      { id: "too_many_requests", message: "Too many requests" },
      { status: 429, headers: { "ratelimit-reset": String(reset) } }
    )
  );
  const connection = await createProviderConnection({
    provider,
    name: "limited embeddings",
    authType: "apikey",
    apiKey: "limited-embeddings",
  });
  const result = await handleEmbedding({
    body: { model: `${provider}/qwen3-embedding-0.6b`, input: "text" },
    credentials,
    connectionId: connection.id,
  });
  assert.equal(result.status, 429);
  const until = Date.parse(
    String((await getProviderConnectionById(connection.id))?.rateLimitedUntil)
  );
  assert.ok(Math.abs(until - reset * 1000) < 1_500, `connection cooldown: ${until}`);
});

test("image errors classify a paused DigitalOcean key as retryable on a different connection", async (t) => {
  observeFetch(t, () =>
    Response.json({ id: "forbidden", message: "This resource has been blocked" }, { status: 403 })
  );
  const connection = await createProviderConnection({
    provider,
    name: "paused image key",
    authType: "apikey",
    apiKey: "paused-image-key",
  });
  const result = await handleImageGeneration({
    body: { model: `${provider}/openai-gpt-image-1.5`, prompt: "A lighthouse" },
    credentials: { ...credentials, connectionId: connection.id },
    log: null,
  } as Parameters<typeof handleImageGeneration>[0]);
  assert.equal(result.status, 403);
  assert.equal("retryable" in result && result.retryable, true);
  assert.ok(
    Date.parse(String((await getProviderConnectionById(connection.id))?.rateLimitedUntil)) >
      Date.now()
  );
});
