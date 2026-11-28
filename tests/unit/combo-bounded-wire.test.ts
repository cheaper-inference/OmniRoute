import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

/**
 * End to end through the chat handler, credential selection and executor: a combo
 * whose only account is cached-quota exhausted makes exactly one upstream fetch and
 * returns that first upstream response (success or failure) unchanged in status.
 */

const h = await createChatPipelineHarness("bounded-wire");
const quota = await import("../../src/domain/quotaCache.ts");
const originalFetch = globalThis.fetch;

test.after(async () => {
  globalThis.fetch = originalFetch;
  await h.cleanup();
});

for (const status of [200, 503, 429]) {
  test(`cached exhaustion with upstream ${status} is bounded to one fetch`, async () => {
    await h.resetStorage();
    const connection = await h.seedConnection("openai");
    quota.setQuotaCache(connection.id, "openai", {
      total: {
        remainingPercentage: 0,
        resetAt: new Date(Date.now() + 3_600_000).toISOString(),
      },
    });
    await h.combosDb.createCombo({
      name: "bounded-wire",
      strategy: "priority",
      models: ["openai/gpt-4o-mini"],
      config: { maxRetries: 3, maxSetRetries: 2, retryDelayMs: 0 },
    });
    let calls = 0;
    globalThis.fetch = (async () => {
      calls++;
      return status === 200
        ? h.buildOpenAIResponse("A complete useful answer.")
        : new Response(JSON.stringify({ error: { message: "upstream unavailable" } }), {
            status,
            headers: { "Content-Type": "application/json", "Retry-After": "60" },
          });
    }) as typeof fetch;
    const response = await h.handleChat(
      h.buildRequest({
        body: {
          model: "bounded-wire",
          stream: false,
          messages: [{ role: "user", content: "hello" }],
        },
      })
    );
    const text = await response.text();
    assert.equal(response.status, status, text);
    assert.equal(calls, 1);
  });
}
