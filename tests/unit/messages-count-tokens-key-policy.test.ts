/**
 * /v1/messages/count_tokens must honor the caller API key's routing policy.
 *
 * The provider-side count is a real upstream call carrying the whole
 * conversation, so it has to respect the same per-key scope the chat path
 * enforces: `allowedConnections` (only those connections may serve the key)
 * and the model allow/deny lists. When the key does not permit any upstream
 * for the resolved model, the route answers with the local estimate instead
 * of borrowing another connection's credential.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-count-tokens-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "count-tokens-policy-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const modelAliasResolver = await import("../../src/lib/modelAliasResolver.ts");
const { POST } = await import("../../src/app/api/v1/messages/count_tokens/route.ts");

type CountTokensResponse = { input_tokens: number; source: string; provider?: string };

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.clearApiKeyCaches();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, apiKey: string, priority: number) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${apiKey}`,
    apiKey,
    isActive: true,
    testStatus: "active",
    priority,
    providerSpecificData: {},
  });
}

async function seedKey(permissions: Record<string, unknown>) {
  const key = await apiKeysDb.createApiKey(`count-policy-${Date.now()}`, "machine-count-policy");
  if (Object.keys(permissions).length > 0) {
    await apiKeysDb.updateApiKeyPermissions(key.id, permissions);
  }
  return key.key as string;
}

/** Records the upstream credential each provider-side count was sent with. */
function captureUpstream() {
  const usedKeys: string[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_url, init: RequestInit = {}) => {
    const headers = (init.headers || {}) as Record<string, string>;
    usedKeys.push(headers["x-api-key"]);
    return new Response(JSON.stringify({ input_tokens: 77 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  return { usedKeys, restore: () => (globalThis.fetch = originalFetch) };
}

function countRequest(apiKey: string | null, model = "anthropic/claude-opus-4.6") {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  return new Request("http://localhost/api/v1/messages/count_tokens", {
    method: "POST",
    headers,
    body: JSON.stringify({ model, messages: [{ role: "user", content: "Count these tokens" }] }),
  });
}

test.beforeEach(async () => {
  await resetStorage();
  modelAliasResolver.invalidateAliasCache();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("count_tokens without an API key keeps using the preferred connection (unchanged)", async () => {
  await seedConnection("anthropic", "sk-ant-B", 1);
  await seedConnection("anthropic", "sk-ant-A", 2);
  const upstream = captureUpstream();
  try {
    const response = await POST(countRequest(null));
    const body = (await response.json()) as CountTokensResponse;
    assert.equal(body.source, "provider");
    assert.deepEqual(upstream.usedKeys, ["sk-ant-B"]);
  } finally {
    upstream.restore();
  }
});

test("count_tokens only uses connections the key's allowedConnections permits", async () => {
  await seedConnection("anthropic", "sk-ant-B", 1);
  const allowed = await seedConnection("anthropic", "sk-ant-A", 2);
  const key = await seedKey({ allowedConnections: [allowed.id] });
  const upstream = captureUpstream();
  try {
    for (let i = 0; i < 5; i++) {
      const response = await POST(countRequest(key));
      const body = (await response.json()) as CountTokensResponse;
      assert.equal(body.source, "provider");
    }
    assert.deepEqual(upstream.usedKeys, Array(5).fill("sk-ant-A"));
  } finally {
    upstream.restore();
  }
});

test("count_tokens estimates locally when the key allows no connection of the provider", async () => {
  await seedConnection("anthropic", "sk-ant-B", 1);
  const other = await seedConnection("openai", "sk-openai-only", 1);
  const key = await seedKey({ allowedConnections: [other.id] });
  const upstream = captureUpstream();
  try {
    const response = await POST(countRequest(key));
    assert.equal(response.status, 200);
    const body = (await response.json()) as CountTokensResponse;
    assert.equal(body.source, "local");
    assert.equal(upstream.usedKeys.length, 0, "no upstream call may borrow a foreign connection");
  } finally {
    upstream.restore();
  }
});

test("count_tokens estimates locally when the key's model policy denies the model", async () => {
  await seedConnection("anthropic", "sk-ant-B", 1);
  const key = await seedKey({ allowedModels: ["openai/gpt-4o"] });
  const upstream = captureUpstream();
  try {
    const response = await POST(countRequest(key));
    assert.equal(response.status, 200);
    const body = (await response.json()) as CountTokensResponse;
    assert.equal(body.source, "local");
    assert.equal(upstream.usedKeys.length, 0);
  } finally {
    upstream.restore();
  }
});

test("count_tokens estimates locally when the key blocks the model", async () => {
  await seedConnection("anthropic", "sk-ant-B", 1);
  const key = await seedKey({ blockedModels: ["anthropic/*"] });
  const upstream = captureUpstream();
  try {
    const body = (await (await POST(countRequest(key))).json()) as CountTokensResponse;
    assert.equal(body.source, "local");
    assert.equal(upstream.usedKeys.length, 0);
  } finally {
    upstream.restore();
  }
});

test("count_tokens with an unrestricted key keeps the provider count (unchanged)", async () => {
  await seedConnection("anthropic", "sk-ant-B", 1);
  const key = await seedKey({});
  const upstream = captureUpstream();
  try {
    const body = (await (await POST(countRequest(key))).json()) as CountTokensResponse;
    assert.equal(body.source, "provider");
    assert.deepEqual(upstream.usedKeys, ["sk-ant-B"]);
  } finally {
    upstream.restore();
  }
});
