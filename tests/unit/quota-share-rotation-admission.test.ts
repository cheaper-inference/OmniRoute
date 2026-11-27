// A key whose Quota Share cap is used up must not be served by a pool account that the
// provider pipeline rotates to after the first account fails.
import assert from "node:assert/strict";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("quota-share-rotation-admission");
const providersDb = await import("../../src/lib/db/providers.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const modelCapsDb = await import("../../src/lib/db/quotaModelCaps.ts");
const { getQuotaStore, resetQuotaStoreSingleton } =
  await import("../../src/lib/quota/QuotaStore.ts");
const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");

const MODEL = "gpt-5.6-luna";
const CAP = 5;
const TOKENS = { first: "fixture-token-first-a", pooled: "fixture-token-pooled-b" } as const;
let upstreamTokens: string[] = [];

function completedSse(text: string): Response {
  const delta = { type: "response.output_text.delta", item_id: "msg_fixture", delta: text };
  const completed = {
    type: "response.completed",
    response: {
      id: "resp_fixture",
      object: "response",
      status: "completed",
      model: MODEL,
      output: [
        {
          id: "msg_fixture",
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text, annotations: [] }],
        },
      ],
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  };
  return new Response(
    `data: ${JSON.stringify(delta)}\n\ndata: ${JSON.stringify(completed)}\n\ndata: [DONE]\n\n`,
    { headers: { "Content-Type": "text/event-stream" } }
  );
}

async function codexAccount(name: string, accessToken: string, priority: number) {
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name,
    accessToken,
    refreshToken: `${accessToken}-refresh`,
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    isActive: true,
    testStatus: "active",
    priority,
    providerSpecificData: {},
  });
  return String(connection.id);
}

// Pool holds only the second account; the key's cap on MODEL is `consumed` of CAP.
async function seedPoolForKey(poolConnectionId: string, apiKeyId: string, consumed: number) {
  const pool = poolsDb.createPool({
    connectionId: poolConnectionId,
    name: "rotation-pool",
    allocations: [{ apiKeyId, weight: 100, policy: "hard" }],
  });
  modelCapsDb.setModelCap({
    poolId: pool.id,
    apiKeyId,
    model: MODEL,
    capValue: CAP,
    capUnit: "requests",
  });
  if (consumed > 0) {
    const store = await getQuotaStore();
    await store.consume(
      apiKeyId,
      { poolId: `${pool.id}:model:${MODEL}`, unit: "requests", window: "hourly" },
      consumed
    );
  }
}

test.beforeEach(async () => {
  await h.resetStorage();
  resetQuotaStoreSingleton();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await h.settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
  upstreamTokens = [];
  globalThis.fetch = async (input, init: RequestInit = {}) => {
    const url = String(input instanceof Request ? input.url : input);
    if (!/chatgpt\.com\/backend-api\/codex\/responses/.test(url)) {
      return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
    }
    const token = (new Headers(init.headers).get("authorization") || "").replace(/^Bearer\s+/i, "");
    upstreamTokens.push(token);
    if (token === TOKENS.first) {
      return new Response(
        JSON.stringify({ error: { type: "usage_limit_reached", message: "limit reached" } }),
        { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "60" } }
      );
    }
    return completedSse("from pooled account");
  };
});

test.afterEach(async () => {
  flushProxyLogsSync();
  h.BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  await h.resetStorage();
});

test.after(() => {
  flushProxyLogsSync();
  return h.cleanup();
});

async function send(authKey: string, stream: boolean) {
  const response = await h.handleChat(
    h.buildRequest({
      authKey,
      body: {
        model: `codex/${MODEL}`,
        stream,
        messages: [{ role: "user", content: `Reply ok ${crypto.randomUUID()}` }],
      },
    })
  );
  return { status: response.status, text: await response.text() };
}

for (const stream of [false, true]) {
  const mode = stream ? "streaming" : "non-streaming";

  test(`${mode}: a capped key is not rotated onto the pooled account`, async () => {
    await codexAccount("codex-first", TOKENS.first, 1);
    const pooled = await codexAccount("codex-pooled", TOKENS.pooled, 2);
    const key = await h.seedApiKey();
    await seedPoolForKey(pooled, key.id, CAP);

    const result = await send(key.key, stream);

    assert.ok(
      !upstreamTokens.includes(TOKENS.pooled),
      "the pooled account must not be called for a key over its cap"
    );
    assert.deepEqual(upstreamTokens, [TOKENS.first]);
    // The pipeline keeps the first account's 429; the handler's account fallback then reaches
    // the pooled account through the regular pre-hook, which refuses it before any upstream call.
    assert.equal(result.status, 429, result.text);
    assert.equal(JSON.parse(result.text)?.error?.code, "quota_share_blocked", result.text);
  });

  test(`control: ${mode} a key under its cap still rotates onto the pooled account`, async () => {
    await codexAccount("codex-first", TOKENS.first, 1);
    const pooled = await codexAccount("codex-pooled", TOKENS.pooled, 2);
    const key = await h.seedApiKey();
    await seedPoolForKey(pooled, key.id, 0);

    const result = await send(key.key, stream);

    assert.equal(result.status, 200, result.text);
    assert.deepEqual(upstreamTokens, [TOKENS.first, TOKENS.pooled]);
  });

  test(`control: ${mode} a key with no pool still rotates onto the second account`, async () => {
    await codexAccount("codex-first", TOKENS.first, 1);
    await codexAccount("codex-second", TOKENS.pooled, 2);
    const key = await h.seedApiKey();

    const result = await send(key.key, stream);

    assert.equal(result.status, 200, result.text);
    assert.deepEqual(upstreamTokens, [TOKENS.first, TOKENS.pooled]);
  });
}
