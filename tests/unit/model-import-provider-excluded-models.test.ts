import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// An explicit import stores the models the chat filter drops when they declare
// only non-chat endpoints. A model the provider policy excludes outright
// (OpenRouter's Batch-API-only `:batch` variants) is not one of them, whatever
// endpoints its listing declares.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-import-provider-excluded-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { importManagedModels } = await import("../../src/lib/providerModels/managedModelImport.ts");
const { isProviderExcludedModel } = await import("../../open-sse/services/modelEndpointPolicy.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the provider-policy exclusion names :batch variants, not media models", () => {
  assert.equal(isProviderExcludedModel("openrouter", { id: "vendor/model:batch" }), true);
  assert.equal(
    isProviderExcludedModel("openrouter", {
      id: "vendor/model:batch",
      supportedEndpoints: ["embeddings"],
    }),
    true
  );
  assert.equal(isProviderExcludedModel("openrouter", { id: "vendor/model:free" }), false);
  // OpenAI's image, video and embedding models are provider-policy media decisions.
  assert.equal(isProviderExcludedModel("openai", { id: "gpt-image-1" }), false);
  assert.equal(isProviderExcludedModel("openai", { id: "text-embedding-3-small" }), false);
});

test("an explicit import stores a non-chat model but never an excluded :batch variant", async () => {
  const connection = (await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "openrouter-fixture",
    apiKey: "openrouter-fixture-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  })) as { id: string };

  await importManagedModels({
    providerId: "openrouter",
    connectionId: connection.id,
    mode: "merge",
    fetchedModels: [
      { id: "vendor/embedder", name: "Embedder", supportedEndpoints: ["embeddings"] },
      { id: "vendor/embedder:batch", name: "Embedder (batch)", supportedEndpoints: ["embeddings"] },
    ],
  });

  const ids = ((await modelsDb.getCustomModels("openrouter")) as Array<{ id: string }>).map(
    (row) => row.id
  );
  assert.ok(ids.includes("vendor/embedder"), "the embedding model is stored as an imported row");
  assert.equal(ids.includes("vendor/embedder:batch"), false, "the :batch variant is not imported");
});
