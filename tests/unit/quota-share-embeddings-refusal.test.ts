/**
 * A quota-share refusal on the embeddings path carries the sentence with the clear-by instant
 * in its message and no Retry-After header. Only the chat path sends the header.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embed-quota-share-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const providerPlans = await import("../../src/lib/db/providerPlans.ts");
const quotaPools = await import("../../src/lib/db/quotaPools.ts");
const { recordConsumption } = await import("../../src/lib/quota/enforce.ts");
const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PROVIDER = "localembed";
const CONNECTION = "embed-share-conn";

const localProvider = {
  id: PROVIDER,
  baseUrl: "http://localhost:8080/embeddings",
  authType: "none" as const,
  authHeader: "none" as const,
  models: [],
};

test("an embeddings share refusal has the clear-by sentence and no Retry-After", async () => {
  providerPlans.upsertPlan(
    CONNECTION,
    PROVIDER,
    [{ unit: "tokens", window: "hourly", limit: 1000 }],
    "manual"
  );
  quotaPools.createPool({
    connectionId: CONNECTION,
    name: CONNECTION,
    borrowMode: "consent",
    allocations: [
      { apiKeyId: "embed-a", weight: 50, policy: "hard" },
      { apiKeyId: "embed-b", weight: 50, policy: "hard" },
    ],
  });
  await recordConsumption({
    apiKeyId: "embed-a",
    connectionId: CONNECTION,
    provider: PROVIDER,
    cost: { tokens: 500, usd: 0, requests: 1 },
  });

  const originalFetch = globalThis.fetch;
  let dispatched = 0;
  globalThis.fetch = async () => {
    dispatched += 1;
    return new Response("{}", { status: 500 });
  };
  try {
    const result = await handleEmbedding({
      body: { model: `${PROVIDER}/bge-m3`, input: "test" },
      credentials: null,
      resolvedProvider: localProvider,
      resolvedModel: "bge-m3",
      apiKeyId: "embed-a",
      connectionId: CONNECTION,
      log: null,
    });
    assert.equal(result.success, false);
    if (result.success) return;
    assert.equal(result.status, 429);
    assert.match(
      result.error,
      /^Quota share limit reached for your API key on localembed\. Enough hourly usage is expected to clear by \d{4}-\d\d-\d\dT[\d:.]+Z\.$/
    );
    assert.equal(result.headers?.get("Retry-After") ?? null, null);
    assert.equal(dispatched, 0, "a refused key never reaches the upstream");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
