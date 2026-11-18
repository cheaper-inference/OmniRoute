/**
 * A custom OpenAI-compatible embeddings node must be judged as a compatible provider
 * when an upstream error marks its connection. The embeddings service passed the model
 * prefix (the node's `prefix`, e.g. "tpm429embed") to markAccountUnavailable instead of
 * the connection's provider id, so compatible-provider rules never applied.
 *
 * Alibaba Model Studio (DashScope) answers a per-minute RPM/TPM throttle like this:
 * `429 {"error":{"message":"Allocated quota exceeded ... error-code#token-limit",
 * "type":"insufficient_quota","code":"insufficient_quota"}}` after a burst from one caller.
 * The wallet is fine; the next minute succeeds.
 *
 * Parking that connection as `credits_exhausted` takes a single-connection model offline
 * (every request then gets a local `402 All 1 connection(s) credits exhausted`) until an
 * operator re-tests it. Chat requests through the same node id already get a model-scoped
 * lockout (#12242); embeddings now match.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-429-quota-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "429-quota-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { createProviderNode } = await import("../../src/lib/db/providers/nodes.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");
const { getModelLockoutInfo } = await import("../../open-sse/services/accountFallback.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const DASHSCOPE_TPM_429 = JSON.stringify({
  error: {
    message:
      "Allocated quota exceeded, please increase your quota limit. For details, see: https://www.alibabacloud.com/help/en/model-studio/error-code#token-limit",
    type: "insufficient_quota",
    code: "insufficient_quota",
  },
});

async function settle() {
  for (let i = 0; i < 5; i++) await new Promise((r) => setImmediate(r));
}

async function seedEmbeddingsNode(prefix: string) {
  // Same id shape the dashboard route gives an embeddings node (`openai-compatible-<apiType>-<id>`).
  const node = await createProviderNode({
    id: `openai-compatible-embeddings-${prefix}-node`,
    type: "openai-compatible",
    name: `${prefix} node`,
    prefix,
    apiType: "embeddings",
    baseUrl: "https://dashscope.example.test/compatible-mode/v1",
  });
  const conn = await providersDb.createProviderConnection({
    provider: node.id,
    authType: "apikey",
    name: `${prefix} key`,
    apiKey: "sk-test-embeddings",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { prefix, baseUrl: "https://dashscope.example.test/compatible-mode/v1" },
  });
  return { connId: (conn as { id: string }).id, nodeId: node.id as string };
}

const EMBED_OK = JSON.stringify({
  data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
  usage: { prompt_tokens: 1, total_tokens: 1 },
});

async function embedWithUpstream(model: string, status: number, body: string) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(body, {
      status,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
  try {
    return await createEmbeddingResponse({ model, input: "hello" });
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("custom embeddings node: a DashScope TPM 429 does not park the only connection", async () => {
  const { connId } = await seedEmbeddingsNode("tpm429embed");

  const res = await embedWithUpstream("tpm429embed/text-embedding-v4", 429, DASHSCOPE_TPM_429);
  assert.equal(res.status, 429, "the caller still sees the upstream 429");
  await settle();

  const conn = (await providersDb.getProviderConnectionById(connId)) as { testStatus?: string };
  assert.notEqual(
    conn.testStatus,
    "credits_exhausted",
    "a per-minute 429 must not park the connection until an operator re-tests it"
  );

  const next = await embedWithUpstream("tpm429embed/text-embedding-v4", 200, EMBED_OK);
  assert.equal(next.status, 200, "the next request must reach the upstream again");
});

test("custom embeddings node: an upstream 402 is model-scoped like chat on the same node", async () => {
  const { connId, nodeId } = await seedEmbeddingsNode("tpm402embed");

  const res = await embedWithUpstream("tpm402embed/text-embedding-v4", 402, DASHSCOPE_TPM_429);
  assert.equal(res.status, 402);
  await settle();

  const conn = (await providersDb.getProviderConnectionById(connId)) as { testStatus?: string };
  assert.notEqual(conn.testStatus, "credits_exhausted");
  assert.ok(
    getModelLockoutInfo(nodeId, connId, "text-embedding-v4"),
    "the failure must still be recorded, as a lockout on the failing model"
  );
});
