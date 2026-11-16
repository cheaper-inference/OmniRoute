import test from "node:test";
import assert from "node:assert/strict";
import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers/web-cookie.ts";
import { chatplaygroundProvider } from "../../open-sse/config/providers/registry/chatplayground/index.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import {
  ChatPlaygroundExecutor,
  chatplaygroundExecutor,
  stripChatId,
  stripCitationsLine,
  buildChatPlaygroundPayload,
  buildChatPlaygroundEndpointPayload,
  resolveChatPlaygroundUpstreamModel,
  createChatPlaygroundSseStream,
  createPerplexityOpenAiResponse,
  toOpenAiCompletionEnvelope,
  countChatPlaygroundMessageChars,
  findOversizedChatPlaygroundMessage,
  renderChatPlaygroundMessageText,
} from "../../open-sse/executors/chatplayground.ts";
import {
  CHATPLAYGROUND_MAX_MESSAGE_CHARS,
  buildUnifiedChatPayload,
  ChatPlaygroundAiSdkParser,
  chatPlaygroundJsonToResponse,
  toOpenAiUsage,
} from "../../open-sse/executors/chatplayground-stream.ts";
import {
  decodeJwtPayload,
  extractSidFromSessionJwt,
  extractExpFromJwt,
  parseCookieString,
  parseChatPlaygroundAccount,
  resolveChatPlaygroundAuth,
  clearChatPlaygroundJwtCache,
  CLERK_MINT_QUERY,
} from "../../open-sse/services/chatplaygroundAuth.ts";
import {
  stripChatPlaygroundPrefix,
  resolveChatPlaygroundEndpoint,
  resolveChatPlaygroundModel,
  buildChatPlaygroundRow,
  parseChatPlaygroundDiscoveryModels,
  resolveChatPlaygroundAccount,
  buildChatPlaygroundUsageQuotas,
  fetchChatPlaygroundModels,
  clearChatPlaygroundCatalogCache,
  expireChatPlaygroundCatalogForTest,
  CHATPLAYGROUND_CHAT_URL,
  CHATPLAYGROUND_FALLBACK_MODELS,
  type ChatPlaygroundModel,
} from "../../open-sse/services/chatplaygroundModels.ts";
import { getChatPlaygroundUsage } from "../../open-sse/services/usage/chatplayground.ts";

// Helper to create a dummy unsigned JWT with a JSON payload
function createMockJwt(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.mock_signature`;
}

// Live-captured unified /api/chat reply for modelSlug "gemini-3.5-flash-lite"
// with message {text:"hello"} (captured 2026-11-16): the exact wire shape the
// executor parses.
const LIVE_GEMINI_STREAM = [
  'data: {"type":"start","messageId":"01a1e4dd-ed3f-7e58-96b6-c2607f182b12","messageMetadata":{"responseId":"01a1e4dd-ed3f-7e58-96b6-c2607f182b12","modelSlug":"gemini-3.5-flash-lite","servedVia":"primary","submissionId":"a367180f-3df6-47f5-a91e-ce3d60662e6f","charge":{"bucket":"pro","amount":4},"conversationId":"01a1e4dd-ed48-7815-84a8-b7c7f5704832","turnId":"01a1e4dd-ed4b-7922-96d3-2ca6807e7cf8"}}',
  "",
  'data: {"type":"start-step"}',
  "",
  'data: {"type":"text-start","id":"0"}',
  "",
  'data: {"type":"text-delta","id":"0","delta":"Hello!"}',
  "",
  'data: {"type":"text-delta","id":"0","delta":" How can I help you today?"}',
  "",
  'data: {"type":"text-delta","id":"0","delta":"","providerMetadata":{"google":{"thoughtSignature":"EmAKXgFpFH0T0iN7zlB5sp3IJjG2FbC3/cwa4qbC6Y2aKhrfnJ40dNtUD6ryiiG3Yyom5oOtldX74f9TNY013+3g/1QkpVa7zifULSTVUDg7etxojLazVi1semuPa1m/MVQ="}}}',
  "",
  'data: {"type":"text-end","id":"0"}',
  "",
  'data: {"type":"finish-step"}',
  "",
  'data: {"type":"finish","finishReason":"stop","messageMetadata":{"status":"complete","usage":{"inputTokens":2,"outputTokens":9,"reasoningTokens":0},"ttftMs":638,"latencyMs":681,"costMicroUsd":24,"servedVia":"primary","providerUsed":"google"}}',
  "",
  "data: [DONE]",
  "",
].join("\n");

// Live-captured unified /api/me payload (user_37AjZIOeVWLXnLuNyJLA9ZlK2jQ).
const LIVE_ME = {
  user: {
    id: "019b42d5-288f-70dc-aaa5-08d72e54169d",
    email: "user@example.com",
    name: "Test User",
    isAdmin: false,
  },
  preferences: {
    pinnedModelSlugs: ["gpt-6-luna", "claude-haiku-5-5", "deepseek-v4.1-flash"],
    saveChats: false,
    theme: "system",
  },
  entitlement: {
    planKey: "lifetime-pool",
    planName: "unlimited",
    fullName: "lifetime",
    quotaModel: "legacy",
    status: "active",
    unlimitedQueries: true,
    dailyQueryCap: 350,
  },
  plan: {
    key: "lifetime-pool",
    displayName: "Lifetime",
    status: "active",
    periodEnd: "2145-12-28T23:38:27.645Z",
    dailyResetAt: "2026-11-17T00:00:00.000Z",
  },
  usage: {
    pro: { used: 43, limit: "unlimited", periodEnd: "2026-11-21T21:33:44.463Z", period: "month" },
    dailyQueries: {
      used: 43,
      limit: 350,
      periodEnd: "2026-11-17T00:00:00.000Z",
      period: "day",
    },
  },
};

const LIVE_MODELS = [
  {
    slug: "gpt-6-luna",
    displayName: "ChatGPT-6 Luna",
    provider: "openai",
    group: "chat",
    tier: "basic",
    capabilities: { vision: true, fileInput: false, reasoning: false, imageGen: false },
    premiumOnly: false,
  },
  {
    slug: "deepseek-v4.1-flash",
    displayName: "DeepSeek V4.1 Flash",
    provider: "deepseek",
    group: "chat",
    tier: "basic",
    capabilities: { vision: false, fileInput: false, reasoning: true, imageGen: false },
    premiumOnly: false,
  },
  {
    slug: "gpt-image-2.6-sunburst",
    displayName: "GPT Image 2.6 Sunburst",
    provider: "openai",
    group: "image",
    tier: "advanced",
    capabilities: { vision: false, fileInput: false, reasoning: false, imageGen: true },
    premiumOnly: false,
  },
];

function stubFetch(routes: Record<string, { body: string; status?: number }>) {
  const original = globalThis.fetch;
  const calls: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const urlStr = String(input);
    calls.push(urlStr);
    for (const [pattern, res] of Object.entries(routes)) {
      if (urlStr.includes(pattern)) {
        return new Response(res.body, {
          status: res.status ?? 200,
          headers: { "content-type": "application/json" },
        });
      }
    }
    return new Response("Not found", { status: 404 });
  }) as typeof fetch;
  return {
    calls,
    restore: () => {
      globalThis.fetch = original;
    },
  };
}

test("ChatPlayground — provider registration & constants", () => {
  const cookieEntry = WEB_COOKIE_PROVIDERS.chatplayground;
  assert.ok(cookieEntry, "chatplayground should be registered in WEB_COOKIE_PROVIDERS");
  assert.equal(cookieEntry.id, "chatplayground");
  assert.equal(cookieEntry.alias, "cpl");
  assert.equal(cookieEntry.website, "https://web.chatplayground.ai");
  assert.equal(cookieEntry.subscriptionRisk, true);

  assert.equal(chatplaygroundProvider.id, "chatplayground");
  assert.equal(chatplaygroundProvider.alias, "cpl");
  assert.equal(chatplaygroundProvider.executor, "chatplayground");
  assert.equal(chatplaygroundProvider.format, "openai");
  // Unified API surface (verified live 2026-11-16): app.chatplayground.ai 522s.
  assert.equal(chatplaygroundProvider.baseUrl, "https://web.chatplayground.ai/api/chat");
  assert.equal(chatplaygroundProvider.modelsUrl, "https://web.chatplayground.ai/api/models");
  assert.equal(
    chatplaygroundProvider.models.length,
    0,
    "should not provide fallback models (uses dynamic import)"
  );

  assert.ok(hasSpecializedExecutor("chatplayground"), "executor should be registered");
  assert.ok(hasSpecializedExecutor("cpl"), "cpl executor alias should be registered");
});

test("ChatPlayground — executor instantiation & getExecutor dispatch", async () => {
  const exec1 = await getExecutor("chatplayground");
  assert.ok(exec1 instanceof ChatPlaygroundExecutor);
  const exec2 = await getExecutor("cpl");
  assert.ok(exec2 instanceof ChatPlaygroundExecutor);
  assert.ok(chatplaygroundExecutor instanceof ChatPlaygroundExecutor);
});

test("ChatPlayground — JWT claims decoding & cookie parsing", () => {
  const mockJwt = createMockJwt({ sid: "sess_1234567890", exp: 1800000000, sub: "user_abc" });

  const payload = decodeJwtPayload(mockJwt);
  assert.ok(payload);
  assert.equal(payload.sid, "sess_1234567890");
  assert.equal(payload.exp, 1800000000);

  assert.equal(extractSidFromSessionJwt(mockJwt), "sess_1234567890");
  assert.equal(extractExpFromJwt(mockJwt), 1800000000);
  assert.equal(extractSidFromSessionJwt("invalid.token"), "");
  assert.equal(extractExpFromJwt("invalid.token"), 0);

  const cookieHeader = `__client=client_token_xyz; __session=${mockJwt}; other=foo`;
  const parsedCookies = parseCookieString(cookieHeader);
  assert.equal(parsedCookies.__client, "client_token_xyz");
  assert.equal(parsedCookies.__session, mockJwt);
  assert.equal(parsedCookies.sid, "sess_1234567890");
});

test("ChatPlayground — account parsing (native connection formats)", () => {
  const mockJwt = createMockJwt({ sid: "sess_one", exp: 1900000000 });

  const acct1 = parseChatPlaygroundAccount(mockJwt);
  assert.ok(acct1);
  assert.equal(acct1.type, "jwt");
  assert.equal(acct1.jwt, mockJwt);

  const rawCookie = `__client=client_abc; __session=${mockJwt}`;
  const acct2 = parseChatPlaygroundAccount(rawCookie);
  assert.ok(acct2);
  assert.equal(acct2.type, "cookie");
  assert.equal(acct2.client, "client_abc");
  assert.equal(acct2.sid, "sess_one");

  assert.equal(parseChatPlaygroundAccount("user_mock_test_123"), null);
  assert.equal(parseChatPlaygroundAccount(""), null);
});

test("ChatPlayground — auth resolution with cached & minted tokens", async () => {
  clearChatPlaygroundJwtCache();

  const testJwt = createMockJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
  const auth1 = await resolveChatPlaygroundAuth({ apiKey: testJwt });
  assert.equal(auth1.headers.authorization, `Bearer ${testJwt}`);
  assert.equal(auth1.headers.origin, "https://web.chatplayground.ai");

  const sid = "sess_mock_test";
  const client = "client_mock_test";
  const mintedToken = createMockJwt({ sid, exp: Math.floor(Date.now() / 1000) + 120 });

  const originalFetch = globalThis.fetch;
  const mintUrls: string[] = [];
  const mintBodies: unknown[] = [];
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const urlStr = url.toString();
    if (urlStr.includes("clerk.chatplayground.ai/v1/client/sessions")) {
      mintUrls.push(urlStr);
      mintBodies.push(init?.body);
      return new Response(JSON.stringify({ jwt: mintedToken }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return originalFetch(url, init);
  }) as typeof fetch;

  try {
    const auth2 = await resolveChatPlaygroundAuth({ cookie: `__client=${client}; sid=${sid}` });
    assert.equal(mintUrls.length, 1, "mint endpoint should have been called");
    assert.equal(auth2.headers.authorization, `Bearer ${mintedToken}`);
    // Current Clerk mint params (verified live 2026-11-16) + the web client's
    // `tab_state` body field.
    assert.match(mintUrls[0], /__clerk_api_version=2026-08-20/);
    assert.match(mintUrls[0], /_clerk_js_version=6\.43\.0/);
    assert.equal(mintBodies[0], "organization_id=&tab_state=visible&token=");
    assert.equal(CLERK_MINT_QUERY, "?__clerk_api_version=2026-08-20&_clerk_js_version=6.43.0");

    mintUrls.length = 0;
    const auth3 = await resolveChatPlaygroundAuth({ cookie: `__client=${client}; sid=${sid}` });
    assert.equal(mintUrls.length, 0, "second call should hit cache");
    assert.equal(auth3.headers.authorization, `Bearer ${mintedToken}`);
  } finally {
    globalThis.fetch = originalFetch;
    clearChatPlaygroundJwtCache();
  }
});

test("ChatPlayground — model resolution (live catalog rows + legacy)", () => {
  assert.equal(stripChatPlaygroundPrefix("chatplayground/gpt-6-luna"), "gpt-6-luna");
  assert.equal(stripChatPlaygroundPrefix("cpl/deepseek-v4.1-flash"), "deepseek-v4.1-flash");
  assert.equal(stripChatPlaygroundPrefix("cpl.gpt-6-luna"), "gpt-6-luna");
  assert.equal(stripChatPlaygroundPrefix("cp:cpl/gpt-6-luna"), "gpt-6-luna");
  assert.equal(stripChatPlaygroundPrefix("cpl/chatplayground/gpt-6-luna"), "gpt-6-luna");

  // Unified rows resolve by slug; the legacy id/modelName fields mirror the slug.
  const row = buildChatPlaygroundRow(LIVE_MODELS[0]);
  assert.ok(row);
  assert.equal(row.slug, "gpt-6-luna");
  assert.equal(row.id, "gpt-6-luna");
  assert.equal(row.modelName, "gpt-6-luna");
  assert.equal(row.endpoint, "chat");
  assert.equal(row.group, "chat");
  assert.equal(row.tier, "basic");
  assert.equal(row.contextLength, 1_000_000); // vision-capable row
  assert.equal(row.creditWeight, undefined);

  // Legacy rows keep their botId/modelName/endpoint pairing.
  const legacy = buildChatPlaygroundRow({
    botId: "kimi-k2.6",
    displayName: "Kimi K",
    modelName: "kimi-k2.6",
    provider: "kimi",
    group: "chat",
    endpoint: "azure",
    active: true,
    creditWeight: 1,
  });
  assert.ok(legacy);
  assert.equal(legacy.slug, "kimi-k2.6");
  assert.equal(legacy.modelName, "kimi-k2.6");
  assert.equal(legacy.endpoint, "azure");
  assert.equal(legacy.creditWeight, 1);

  // Image-group rows are not routable through /api/chat (live MODEL_NOT_FOUND).
  const imageRow = buildChatPlaygroundRow(LIVE_MODELS[2]);
  assert.ok(imageRow);
  assert.equal(imageRow.group, "image");
  assert.equal(imageRow.tier, "advanced");
  assert.equal(imageRow.contextLength, 65_536);
  assert.equal(
    resolveChatPlaygroundModel("gpt-image-2.6-sunburst", CHATPLAYGROUND_FALLBACK_MODELS),
    null,
    "image models are excluded from the chat catalog"
  );

  // The bundled fallback catalog mirrors the live roster capture (2026-11-16).
  const gpt = resolveChatPlaygroundModel("cpl/gpt-6-luna");
  assert.ok(gpt);
  assert.equal(gpt.slug, "gpt-6-luna");
  assert.equal(gpt.provider, "openai");
  assert.equal(gpt.tier, "basic");
  const deepseek = resolveChatPlaygroundModel("deepseek-v4.1-flash");
  assert.ok(deepseek);
  assert.equal(deepseek.capabilities.reasoning, true);
  assert.equal("reasoning" in deepseek, false);
  assert.equal(resolveChatPlaygroundModel("non-existent-model"), null);
  assert.equal(resolveChatPlaygroundModel(""), null);
  // Vendor-prefixed client ids resolve via the suffix rule
  const prefixed = resolveChatPlaygroundModel("openai/gpt-6-luna");
  assert.ok(prefixed);
  assert.equal(prefixed.slug, "gpt-6-luna");

  // @deprecated endpoint helper: unified rows answer "chat", legacy rows answer
  // their recorded endpoint.
  assert.equal(resolveChatPlaygroundEndpoint({ botId: "x", endpoint: "azure" }), "azure");
  assert.equal(resolveChatPlaygroundEndpoint({ botId: "x", endpoint: "lmsys" }), "lmsys");
  assert.equal(resolveChatPlaygroundEndpoint({ botId: "x", endpoint: "perplexity" }), "perplexity");
  assert.equal(resolveChatPlaygroundEndpoint({ botId: "x", endpoint: "nonsense" }), "chat");
  assert.equal(resolveChatPlaygroundEndpoint("gpt-6-luna"), "chat");
  assert.equal(resolveChatPlaygroundEndpoint({ botId: "kimi-k2.6", endpoint: "azure" }), "azure");
});

test("ChatPlayground — unified payload construction", () => {
  const model = resolveChatPlaygroundModel("gpt-6-luna")!;
  const payload = buildChatPlaygroundPayload(
    {
      messages: [{ role: "user", content: "Hi" }],
      temperature: 0.7,
      max_tokens: 256,
      stream: true,
    },
    model
  );
  assert.equal(payload.modelSlug, "gpt-6-luna");
  assert.match(
    String(payload.submissionId),
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  );
  assert.deepEqual(payload.message, { text: "Hi" });
  // The unified schema rejects any other top-level key (live Zod error).
  assert.equal("temperature" in payload, false);
  assert.equal("max_tokens" in payload, false);
  assert.equal("stream" in payload, false);
  assert.equal("messages" in payload, false);
  assert.equal("chatId" in payload, false);
  assert.equal("noSave" in payload, false);
  assert.equal("botId" in payload, false);
  assert.equal("model" in payload, false);

  // multipart content flattens
  const multi = buildUnifiedChatPayload(
    {
      messages: [
        { role: "user", content: [{ type: "text", text: "A" }, { type: "text", text: "B" }] },
      ],
    },
    "gpt-6-luna"
  );
  assert.deepEqual(multi.message, { text: "A\nB" });

  // multi-turn history serializes into one message.text transcript
  const history = buildUnifiedChatPayload(
    {
      messages: [
        { role: "system", content: "Be terse." },
        { role: "user", content: "1+1?" },
        { role: "assistant", content: "2" },
        { role: "user", content: "and 2+2?" },
      ],
    },
    "gpt-6-luna"
  );
  assert.deepEqual(
    history.message,
    {
      text: "Conversation history:\nsystem: Be terse.\nuser: 1+1?\nassistant: 2\n\nReply to the last message.\nand 2+2?",
    }
  );
  assert.equal(renderChatPlaygroundMessageText([]), "");
  assert.equal(renderChatPlaygroundMessageText([{ role: "user", content: "solo" }]), "solo");

  // conversationId/chatId forwarded only when a UUID (live Zod "Invalid UUID")
  const withConv = buildUnifiedChatPayload(
    {
      messages: [{ role: "user", content: "Hi" }],
      conversationId: "01a1e4dd-ed48-7815-84a8-b7c7f5704832",
    },
    "gpt-6-luna"
  );
  assert.equal(withConv.conversationId, "01a1e4dd-ed48-7815-84a8-b7c7f5704832");
  const badConv = buildUnifiedChatPayload(
    { messages: [{ role: "user", content: "Hi" }], chatId: "not-a-uuid" },
    "gpt-6-luna"
  );
  assert.equal("conversationId" in badConv, false);

  // attachments carry only fileId items from the last message
  const withAtt = buildUnifiedChatPayload(
    {
      messages: [
        { role: "user", content: "first" },
        {
          role: "user",
          content: "second",
          attachments: [{ fileId: "file-1" }, { bogus: 1 }, "str"],
        },
      ],
    },
    "gpt-6-luna"
  );
  assert.deepEqual((withAtt.message as { attachments: unknown }).attachments, [
    { fileId: "file-1" },
  ]);

  // noSave opt-in via env (matches the web client's saveChats:false preference)
  const prevEnv = process.env.CHATPLAYGROUND_NO_SAVE;
  process.env.CHATPLAYGROUND_NO_SAVE = "true";
  try {
    const noSave = buildUnifiedChatPayload(
      { messages: [{ role: "user", content: "Hi" }] },
      "gpt-6-luna"
    );
    assert.equal(noSave.noSave, true);
  } finally {
    if (prevEnv === undefined) delete process.env.CHATPLAYGROUND_NO_SAVE;
    else process.env.CHATPLAYGROUND_NO_SAVE = prevEnv;
  }

  // @deprecated endpoint payload builder now returns the unified body
  const legacyPayload = buildChatPlaygroundEndpointPayload(
    { messages: [{ role: "user", content: "Hi" }] },
    model
  );
  assert.equal(legacyPayload.modelSlug, "gpt-6-luna");
  assert.equal("messages" in legacyPayload, false);

  // @deprecated upstream model resolver: slug instead of vendor prefix
  assert.equal(resolveChatPlaygroundUpstreamModel(model), "gpt-6-luna");
});

test("ChatPlaygroundExecutor — execution flow: non-streaming & streaming", async () => {
  const executor = new ChatPlaygroundExecutor();
  const mockJwt = createMockJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });

  // 1. Non-streaming: the captured wire body parses to content + usage.
  const stub1 = stubFetch({ "/api/chat": { body: LIVE_GEMINI_STREAM } });
  try {
    const result = await executor.execute({
      model: "gemini-3.5-flash-lite",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: mockJwt },
    });
    assert.ok(result instanceof Response);
    assert.equal(result.status, 200);
    const data = await result.json();
    assert.equal(data.object, "chat.completion");
    assert.equal(data.model, "gemini-3.5-flash-lite");
    assert.equal(data.choices[0].message.content, "Hello! How can I help you today?");
    assert.equal(data.choices[0].finish_reason, "stop");
    assert.deepEqual(data.usage, {
      prompt_tokens: 2,
      completion_tokens: 9,
      total_tokens: 11,
      completion_tokens_details: { reasoning_tokens: 0 },
    });
  } finally {
    stub1.restore();
  }

  // 2. Streaming: chunk boundaries split JSON lines mid-object; content must
  //    reassemble and terminate with data: [DONE].
  const bytes = new TextEncoder().encode(LIVE_GEMINI_STREAM);
  const chunks: Uint8Array[] = [];
  for (let i = 0; i < bytes.length; i += 37) {
    chunks.push(bytes.slice(i, i + 37));
  }
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const urlStr = String(input);
    if (urlStr.includes("/api/models")) {
      return new Response(JSON.stringify(LIVE_MODELS), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    const upstream = new ReadableStream<Uint8Array>({
      start(controller) {
        for (const c of chunks) controller.enqueue(c);
        controller.close();
      },
    });
    return new Response(upstream, {
      status: 200,
      headers: { "content-type": "text/event-stream" },
    });
  }) as typeof fetch;
  try {
    const streamResult = await executor.execute({
      model: "gemini-3.5-flash-lite",
      body: { messages: [{ role: "user", content: "hello" }], stream: true },
      stream: true,
      credentials: { apiKey: mockJwt },
    });
    assert.ok(streamResult instanceof Response);
    assert.equal(streamResult.headers.get("content-type"), "text/event-stream");
    const reader = streamResult.body!.getReader();
    const decoder = new TextDecoder();
    let accumulated = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      accumulated += decoder.decode(value, { stream: true });
    }
    assert.ok(accumulated.includes("data: [DONE]"));
    const dataLines = accumulated
      .split("\n")
      .filter((l) => l.startsWith("data: ") && !l.includes("[DONE]"))
      .map((l) => JSON.parse(l.slice(6)));
    const content = dataLines.map((d) => d.choices?.[0]?.delta?.content ?? "").join("");
    assert.equal(content, "Hello! How can I help you today?");
    const finish = dataLines.find((d) => d.choices?.[0]?.finish_reason);
    assert.ok(finish, "stream should contain a finish_reason chunk");
    const usageFrame = dataLines.find((d) => d.usage);
    assert.ok(usageFrame, "stream should carry a usage frame");
    assert.deepEqual(usageFrame.usage, {
      prompt_tokens: 2,
      completion_tokens: 9,
      total_tokens: 11,
      completion_tokens_details: { reasoning_tokens: 0 },
    });
  } finally {
    globalThis.fetch = original;
  }

  // 3. Upstream error passthrough keeps the status + message.
  const stub3 = stubFetch({
    "/api/chat": {
      body: JSON.stringify({
        error: { code: "MODEL_NOT_FOUND", message: "Model not supported." },
      }),
      status: 400,
    },
  });
  try {
    const errResult = await executor.execute({
      model: "gpt-6-luna",
      body: { messages: [{ role: "user", content: "Hello" }] },
      credentials: { apiKey: mockJwt },
    });
    assert.ok("response" in errResult);
    assert.equal(errResult.response.status, 400);
    const errJson = await errResult.response.json();
    assert.ok(errJson.error.message.includes("400"));
  } finally {
    stub3.restore();
  }

  // 4. 429 rate limit keeps status.
  const stub4 = stubFetch({
    "/api/chat": { body: "Rate limit exceeded on upstream", status: 429 },
  });
  try {
    const rate = await executor.execute({
      model: "gpt-6-luna",
      body: { messages: [{ role: "user", content: "Hello" }] },
      credentials: { apiKey: mockJwt },
    });
    assert.ok("response" in rate);
    assert.equal((rate as { response: Response }).response.status, 429);
  } finally {
    stub4.restore();
  }
});

test("ChatPlaygroundExecutor — model validation & message size limits", async () => {
  const executor = new ChatPlaygroundExecutor();
  const mockJwt = createMockJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });

  // Unknown models are rejected before any network call.
  const stub = stubFetch({});
  try {
    const empty = await executor.execute({
      model: "",
      body: { messages: [{ role: "user", content: "hello" }] },
      credentials: { apiKey: mockJwt },
    });
    assert.ok("response" in empty);
    assert.equal((empty as { response: Response }).response.status, 400);
    const emptyBody = await (empty as { response: Response }).response.json();
    assert.ok(emptyBody.error.message.includes("model not found or invalid"));

    const invalid = await executor.execute({
      model: "completely-invalid-model-name",
      body: { messages: [{ role: "user", content: "hello" }] },
      credentials: { apiKey: mockJwt },
    });
    assert.ok("response" in invalid);
    assert.equal((invalid as { response: Response }).response.status, 400);
  } finally {
    stub.restore();
  }

  // 15,000-char per-message limit (live MESSAGE_TOO_LONG) — single message.
  const oversized = await executor.execute({
    model: "gpt-6-luna",
    body: { messages: [{ role: "user", content: "A".repeat(15_001) }] },
    credentials: { apiKey: mockJwt },
  });
  assert.ok("response" in oversized);
  assert.equal((oversized as { response: Response }).response.status, 400);
  const body1 = await (oversized as { response: Response }).response.json();
  assert.ok(
    body1.error.message.includes("15,000-character limit") ||
      body1.error.message.includes("15000"),
    `unexpected message: ${body1.error.message}`
  );
  assert.ok(body1.error.message.includes("15001 characters"));

  // Multipart content counts summed.
  const multipart = await executor.execute({
    model: "gpt-6-luna",
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "A".repeat(10_000) },
            { type: "text", text: "B".repeat(5_001) },
          ],
        },
      ],
    },
    credentials: { apiKey: mockJwt },
  });
  assert.ok("response" in multipart);
  assert.equal((multipart as { response: Response }).response.status, 400);

  // Valid per-message sizes but the serialized transcript exceeds the cap.
  const many = [
    { role: "user", content: "A".repeat(12_000) },
    { role: "assistant", content: "B".repeat(12_000) },
    { role: "user", content: "short" },
  ];
  assert.equal(findOversizedChatPlaygroundMessage(many), null);
  const serialized = await executor.execute({
    model: "gpt-6-luna",
    body: { messages: many },
    credentials: { apiKey: mockJwt },
  });
  assert.ok("response" in serialized);
  assert.equal((serialized as { response: Response }).response.status, 400);
  const serBody = await (serialized as { response: Response }).response.json();
  assert.ok(
    serBody.error.message.includes("Serialized conversation"),
    `unexpected message: ${serBody.error.message}`
  );

  // Auth failure path: credentials missing entirely -> 401.
  const noAuth = await executor.execute({
    model: "gpt-6-luna",
    body: { messages: [{ role: "user", content: "hi" }] },
    credentials: {},
  });
  assert.ok("response" in noAuth);
  assert.equal((noAuth as { response: Response }).response.status, 401);
});

test("ChatPlayground — AI-SDK stream parser", async () => {
  const parser = new ChatPlaygroundAiSdkParser();
  const usage = parser.pushWholeBody(LIVE_GEMINI_STREAM);
  assert.ok(usage);
  assert.equal(parser.text, "Hello! How can I help you today?");
  assert.equal(parser.finishReason, "stop");
  assert.deepEqual(parser.usage, { inputTokens: 2, outputTokens: 9, reasoningTokens: 0 });
  assert.equal(parser.done, true);
  assert.equal(toOpenAiUsage(parser.usage!).completion_tokens, 9);
  assert.equal(toOpenAiUsage(parser.usage!).total_tokens, 11);

  // providerMetadata-only deltas (empty text) emit nothing and do not corrupt text.
  const p2 = new ChatPlaygroundAiSdkParser();
  const out2 = p2.push(
    'data: {"type":"text-delta","id":"0","delta":"","providerMetadata":{"google":{"thoughtSignature":"abc"}}}\n'
  );
  assert.deepEqual(out2, []);

  // [DONE] terminates and further input is ignored.
  const p3 = new ChatPlaygroundAiSdkParser();
  p3.push('data: {"type":"text-delta","id":"0","delta":"x"}\ndata: [DONE]\n');
  assert.equal(p3.done, true);
  assert.equal(p3.push('data: {"type":"text-delta","id":"0","delta":"y"}\n').length, 0);
  assert.equal(p3.text, "x");

  // doubled identical SSE lines (replay artifact) parse once.
  const p4 = new ChatPlaygroundAiSdkParser();
  const line = 'data: {"type":"text-delta","id":"0","delta":"dup"}\n';
  p4.push(line + line);
  assert.equal(p4.text, "dup");

  // in-band error frame
  const p5 = new ChatPlaygroundAiSdkParser();
  const errEvents = p5.push('data: {"type":"error","message":"upstream exploded"}\n');
  assert.equal(errEvents.length, 1);
  assert.equal(errEvents[0].kind, "error");
  assert.equal(p5.errored, "upstream exploded");

  // reasoning models: reasoning-delta accumulates separately (live deepseek shape)
  const p6 = new ChatPlaygroundAiSdkParser();
  p6.push(
    'data: {"type":"start","messageId":"m1"}\n' +
      'data: {"type":"reasoning-start","id":"0"}\n' +
      'data: {"type":"reasoning-delta","id":"0","delta":"thinking..."}\n' +
      'data: {"type":"reasoning-end","id":"0"}\n' +
      'data: {"type":"text-delta","id":"0","delta":"42"}\n' +
      'data: {"type":"finish","finishReason":"stop","messageMetadata":{"usage":{"inputTokens":5,"outputTokens":7,"reasoningTokens":3}}}\n'
  );
  assert.equal(p6.reasoningText, "thinking...");
  assert.equal(p6.text, "42");
  assert.deepEqual(p6.usage, { inputTokens: 5, outputTokens: 7, reasoningTokens: 3 });
  const json = chatPlaygroundJsonToResponse("deepseek-v4.1-flash", p6, p6.usage);
  const body = await json.json();
  assert.deepEqual(body.choices[0].message, {
    role: "assistant",
    content: "42",
    reasoning_content: "thinking...",
  });

  // truncated upstream (no finish event) closes cleanly with finish_reason stop
  const p7 = new ChatPlaygroundAiSdkParser();
  p7.pushText(
    'data: {"type":"start","messageId":"m2"}\ndata: {"type":"text-delta","id":"0","delta":"par'
  );
  p7.finishTruncated();
  assert.equal(p7.finishReason, "stop");
  assert.equal(p7.text, ""); // partial line never flushed stays out of text
});

test("ChatPlayground — legacy response helpers stay compatible", async () => {
  // toOpenAiCompletionEnvelope keeps the pre-unified zero-usage envelope.
  const env = toOpenAiCompletionEnvelope("gpt-6-luna", "hi");
  const body = await env.json();
  assert.equal(body.object, "chat.completion");
  assert.deepEqual(body.usage, { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 });
  assert.equal(body.choices[0].message.content, "hi");

  // @deprecated perplexity helper strips CHAT_ID + CITATIONS from the legacy body.
  const legacy = createPerplexityOpenAiResponse(
    "perplexity-sonar",
    'CHAT_ID:sess_1 The capital is Canberra. CITATIONS:["https://x"]',
    false
  );
  const legacyBody = await legacy.json();
  assert.equal(legacyBody.choices[0].message.content, "The capital is Canberra.");

  // streaming variant emits the cleaned content in one chunk then [DONE].
  const legacyStream = await new Response(
    createPerplexityOpenAiResponse(
      "perplexity-sonar",
      'CHAT_ID:sess_1 Answer. CITATIONS:["https://x"]',
      true
    ).body
  ).text();
  assert.ok(legacyStream.includes("data: [DONE]"));
  assert.ok(legacyStream.includes("Answer."));
  assert.ok(!legacyStream.includes("CITATIONS"));
  assert.ok(!legacyStream.includes("CHAT_ID"));

  // @deprecated stream wrapper over the captured unified body.
  const upstream = new ReadableStream<Uint8Array>({
    start(c) {
      c.enqueue(new TextEncoder().encode(LIVE_GEMINI_STREAM));
      c.close();
    },
  });
  const wrapped = createChatPlaygroundSseStream(upstream, "gemini-3.5-flash-lite");
  const text = await new Response(wrapped).text();
  assert.ok(text.includes("data: [DONE]"));
  assert.ok(text.includes("Hello!"));
});

test("ChatPlayground — usage from unified /api/me", async () => {
  const mockJwt = createMockJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
  const account = resolveChatPlaygroundAccount(LIVE_ME);
  assert.equal(account.plan, "Lifetime");
  assert.equal(account.user.email, "user@example.com");
  const quotas = buildChatPlaygroundUsageQuotas(LIVE_ME);
  assert.equal(quotas.dailyQueries.total, 350);
  assert.equal(quotas.dailyQueries.used, 43);
  assert.equal(quotas.dailyQueries.remaining, 307);
  assert.equal(quotas.pro.unlimited, true);
  assert.equal(quotas.pro.used, 43);

  const stub = stubFetch({ "/api/me": { body: JSON.stringify(LIVE_ME) } });
  try {
    const usage = await getChatPlaygroundUsage(mockJwt);
    assert.equal(usage.plan, "Lifetime");
    assert.equal(usage.quotas?.dailyQueries.total, 350);
    assert.equal(usage.quotas?.dailyQueries.used, 43);
    assert.equal(stub.calls.length, 1, "no legacy probe when /api/me answers");
    assert.ok(stub.calls[0].includes("/api/me"));
  } finally {
    stub.restore();
  }
});

test("ChatPlayground — usage falls back to the legacy user route", async () => {
  const mockJwt = createMockJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
  const legacyUser = {
    user: {
      name: "Test User",
      email: "test@example.com",
      dailyQueriesCount: 25,
      subscription: { name: "unlimited", fullName: "lifetime" },
    },
  };
  const stub = stubFetch({
    "/api/me": { body: "Not found", status: 404 },
    "/api/user": { body: JSON.stringify(legacyUser) },
  });
  try {
    const usage = await getChatPlaygroundUsage(mockJwt);
    assert.equal(stub.calls.length, 2, "legacy route probed after /api/me 404s");
    assert.equal(usage.plan, "Lifetime Unlimited");
    assert.equal(usage.quotas?.daily.total, 300);
    assert.equal(usage.quotas?.daily.used, 25);
    assert.equal(usage.quotas?.daily.remaining, 275);
  } finally {
    stub.restore();
  }
});

test("ChatPlayground — StackSocial Lifetime Pro quota parsing (legacy shape)", async () => {
  const mockJwt = createMockJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
  const stub = stubFetch({
    "/api/me": { body: "Not found", status: 404 },
    "/api/user": {
      body: JSON.stringify({
        user: {
          name: "Pro User",
          proQueriesCount: 150,
          appsumoLicenseTier: "pro",
          subscription: { name: "pro", fullName: "lifetime pro", proMaxQueries: 2000 },
        },
      }),
    },
  });
  try {
    const proUsage = await getChatPlaygroundUsage(mockJwt);
    assert.equal(proUsage.plan, "Lifetime Pro");
    assert.equal(proUsage.quotas?.monthly.total, 2000);
    assert.equal(proUsage.quotas?.monthly.used, 150);
    assert.equal(proUsage.quotas?.monthly.remaining, 1850);
    assert.ok(proUsage.quotas?.daily);
  } finally {
    stub.restore();
  }
});

test("ChatPlayground — discovery models parser (unified + legacy rows)", () => {
  const parsed = parseChatPlaygroundDiscoveryModels([
    {
      botId: "gpt-6.1-sol",
      displayName: "ChatGPT-6.1 Sol",
      modelName: "gpt-6.1-sol",
      group: "chat",
    },
    { botId: "whisper-v3", displayName: "Whisper V3", group: "audio" },
    {
      slug: "gpt-6-luna",
      displayName: "ChatGPT-6 Luna",
      provider: "openai",
      group: "chat",
      tier: "basic",
    },
    {
      slug: "gpt-image-2.6-sunburst",
      displayName: "GPT Image 2.6 Sunburst",
      provider: "openai",
      group: "image",
    },
  ]);
  assert.deepEqual(parsed.map((m) => m.id), ["gpt-6.1-sol", "gpt-6-luna"]);
  assert.equal(parsed[0].name, "ChatGPT-6.1 Sol");
  assert.equal(parsed[0].owned_by, "chatplayground");
  assert.equal(parsed[1].provider, "openai");
});

test("ChatPlayground — dynamic catalog: live fetch, parse, cache", async () => {
  clearChatPlaygroundCatalogCache();
  const stub = stubFetch({ "/api/models": { body: JSON.stringify(LIVE_MODELS) } });
  try {
    const models = await fetchChatPlaygroundModels();
    assert.equal(stub.calls.length, 1);
    assert.equal(models.length, 2, "image rows excluded from chat routing");
    const luna = models.find((m: ChatPlaygroundModel) => m.slug === "gpt-6-luna")!;
    assert.equal(luna.provider, "openai");
    assert.equal(luna.endpoint, "chat");
    assert.equal(luna.contextLength, 1_000_000);
    const again = await fetchChatPlaygroundModels();
    assert.equal(stub.calls.length, 1, "second call within TTL uses the cache");
    assert.equal(again.length, 2);
  } finally {
    stub.restore();
    clearChatPlaygroundCatalogCache();
  }
});

test("ChatPlayground — dynamic catalog: legacy rows and outage fallback", async () => {
  clearChatPlaygroundCatalogCache();
  const original = globalThis.fetch;
  globalThis.fetch = (async () => {
    throw new Error("network down");
  }) as typeof fetch;
  try {
    const models = await fetchChatPlaygroundModels();
    assert.equal(models, CHATPLAYGROUND_FALLBACK_MODELS);

    // legacy-schema live roster still parses (botId/modelName/endpoint/contextWindow)
    globalThis.fetch = (async () =>
      new Response(
        JSON.stringify([
          {
            botId: "grok-4.7",
            displayName: "Grok 4.7",
            modelName: "grok-4.7",
            provider: "xAI",
            group: "chat",
            endpoint: "azure",
            active: true,
            creditWeight: 2,
            premiumOnly: false,
            contextWindow: 256000,
          },
          { botId: "gpt-image-2.5-flare", displayName: "GPT Image 2.5 Flare", group: "image" },
        ]),
        { status: 200, headers: { "content-type": "application/json" } }
      )) as typeof fetch;
    const live = await fetchChatPlaygroundModels();
    assert.equal(live.length, 1);
    assert.equal(live[0].slug, "grok-4.7");
    assert.equal(live[0].endpoint, "azure");
    assert.equal(live[0].creditWeight, 2);
    assert.equal(live[0].contextLength, 256000);

    expireChatPlaygroundCatalogForTest();
    globalThis.fetch = (async () => {
      throw new Error("network down");
    }) as typeof fetch;
    const stale = await fetchChatPlaygroundModels();
    assert.equal(stale.length, 1);
    assert.equal(stale[0].slug, "grok-4.7");
  } finally {
    globalThis.fetch = original;
    clearChatPlaygroundCatalogCache();
  }
});

test("ChatPlayground — constants & legacy text helpers", () => {
  assert.equal(CHATPLAYGROUND_MAX_MESSAGE_CHARS, 15_000);
  assert.equal(countChatPlaygroundMessageChars("hello"), 5);
  assert.equal(countChatPlaygroundMessageChars([{ text: "abc" }, "de"]), 5);
  assert.equal(countChatPlaygroundMessageChars(null), 0);
  assert.ok(CHATPLAYGROUND_CHAT_URL.startsWith("https://web.chatplayground.ai"));
  assert.equal(stripChatId("Hello world CHAT_ID:abc-123_xyz"), "Hello world");
  assert.equal(stripChatId("CHAT_ID:prefix_123 Hello world"), "Hello world");
  assert.equal(stripChatId("Hello CHAT_ID:mid_456 world"), "Hello  world");
  assert.equal(stripCitationsLine("no citations here"), "no citations here");
  assert.equal(
    stripCitationsLine('Answer text\nCITATIONS:[{"url":"https://a"}]'),
    "Answer text"
  );
  assert.equal(
    stripCitationsLine('The capital is **Canberra**.[1]CITATIONS:["https://a","https://b"]'),
    "The capital is **Canberra**.[1]"
  );
});
