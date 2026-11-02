/**
 * #13616's connection-declared `quotaEndpoint` also applies to `anthropic-compatible-*`
 * connections: an Anthropic-format gateway (e.g. LiteLLM `/v1/messages`) can expose the
 * same budget endpoint as its OpenAI-format sibling.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { getUsageForProvider } = await import("../../open-sse/services/usage.ts");
const { supportsProviderQuota } = await import("../../src/shared/utils/providerQuotaVisibility.ts");

const ID = "anthropic-compatible-chat-gateway";
const ENDPOINT = {
  url: "https://gateway.example.com/key/info",
  auth: "bearer" as const,
  quotas: {
    budget: { used: "$.info.spend", total: "$.info.max_budget", currency: "USD" },
  },
};

test("an anthropic-compatible connection with a quotaEndpoint supports quota", () => {
  assert.equal(
    supportsProviderQuota(ID, { provider: ID, providerSpecificData: { quotaEndpoint: ENDPOINT } }),
    true
  );
  assert.equal(supportsProviderQuota(ID, { provider: ID, providerSpecificData: {} }), false);
});

test("an anthropic-compatible connection's quota is fetched from its quotaEndpoint", async () => {
  const original = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = (async (url: string) => {
    urls.push(String(url));
    return new Response(JSON.stringify({ info: { spend: 25, max_budget: 100 } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  try {
    const usage = (await getUsageForProvider({
      id: "conn-1",
      provider: ID,
      apiKey: "sk-test",
      providerSpecificData: { quotaEndpoint: ENDPOINT },
    } as never)) as { quotas?: Record<string, { used: number; total: number }> };
    assert.deepEqual(urls, [ENDPOINT.url]);
    assert.equal(usage.quotas?.budget?.used, 25);
    assert.equal(usage.quotas?.budget?.total, 100);
  } finally {
    globalThis.fetch = original;
  }
});
