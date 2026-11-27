import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, mock, test } from "node:test";

const testDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kea-9624-"));
process.env.HOME = testDir;
process.env.DATA_DIR = testDir;
process.env.OMNIROUTE_SEMANTIC_CACHE_ENABLED = "false";

const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { resetSemanticCacheManager, SemanticCacheManager } =
  await import("../../open-sse/services/cache/semanticCacheManager.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { clearCache, clearMemoryCache } = await import("../../src/lib/semanticCache.ts");

after(async () => {
  mock.restoreAll();
  resetSemanticCacheManager();
  await waitForCallLogSaves(10_000);
  resetDbInstance();
  fs.rmSync(testDir, { recursive: true, force: true });
});

const provider = "cheaperinference";
const pricing = { input: 2, cached: 0.2, cache_creation: 2.5, output: 10, reasoning: 20 };
const cases = [
  { endpoint: "/v1/messages", model: "claude-haiku-4.5", format: "message" },
  { endpoint: "/v1/responses", model: "gpt-5.4-nano", format: "response" },
  { endpoint: "/v1/chat/completions", model: "claude-haiku-4.5", format: "chat.completion" },
];

for (const { endpoint, model, format } of cases) {
  test(`KEA-9624 ${endpoint} reports the original upstream cost on a cache hit`, async (t) => {
    clearCache();
    const useManager = format === "response";
    const reportedCost = useManager ? 0.00042 : undefined;
    if (!useManager) await updatePricing({ [provider]: { [model]: pricing } });
    if (useManager) {
      // The mock gateway reports a USD cost for a model with no local price.
      t.after(() => resetSemanticCacheManager());
      resetSemanticCacheManager(
        new SemanticCacheManager({ enabled: true, backend: "memory" }, undefined, async () => null)
      );
    }
    const upstream = t.mock.method(globalThis, "fetch", async (url: string | URL | Request) => {
      assert.equal(String(url), "https://api.cheaperinference.com/v1/chat/completions");
      return Response.json({
        id: "chatcmpl-kea-9624",
        object: "chat.completion",
        created: 1,
        model,
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: "The cache probe succeeded." },
            finish_reason: "stop",
          },
        ],
        usage: {
          cost: reportedCost,
          prompt_tokens: 100,
          completion_tokens: 20,
          total_tokens: 120,
          prompt_tokens_details: { cached_tokens: 50, cache_creation_tokens: 20 },
          completion_tokens_details: { reasoning_tokens: 10 },
        },
      });
    });

    const messages = [{ role: "user", content: `Cache-cost probe for ${endpoint}.` }];
    const requestBody = {
      model: `cinf/${model}`,
      stream: false,
      temperature: 0,
      ...(format === "response" ? { input: messages } : { messages }),
      ...(format === "message" ? { max_tokens: 100 } : {}),
    };
    async function request() {
      const result = await handleChatCore({
        body: structuredClone(requestBody),
        modelInfo: { provider, model, extendedContext: false },
        credentials: { apiKey: "test-key" },
        log: null,
        clientRawRequest: {
          body: structuredClone(requestBody),
          endpoint,
          headers: new Headers({ accept: "application/json" }),
        },
        connectionId: null,
      } as Parameters<typeof handleChatCore>[0]);
      assert.equal(result.response.status, 200, "the request should succeed");
      return result.response;
    }

    const original = await request();
    const originalBody = await original.json();
    assert.equal(originalBody.type ?? originalBody.object, format);
    assert.equal(original.headers.get("x-omniroute-cache"), "MISS");
    const originalCost = original.headers.get("x-omniroute-response-cost");
    assert.equal(originalCost, "0.0004200000");

    // Force each storage path independently of the other cache layers.
    if (useManager) {
      assert.equal(clearCache(), 1, "discard the legacy copy before the manager lookup");
    } else {
      clearMemoryCache();
    }
    const hit = await request();
    assert.deepEqual(await hit.json(), originalBody);
    assert.equal(hit.headers.get("x-omniroute-cache"), "HIT");
    assert.equal(hit.headers.get("x-omniroute-response-cost"), "0.0000000000");
    assert.equal(upstream.mock.callCount(), 1, "the hit must not call the upstream");
    assert.equal(hit.headers.get("x-omniroute-cost-saved"), originalCost);
  });
}
