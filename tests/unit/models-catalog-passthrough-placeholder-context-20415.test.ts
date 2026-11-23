import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(process.env.DATA_DIR || "/tmp", "catalog-passthrough-placeholder-20415-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "catalog-passthrough-placeholder-20415-secret";
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#20415: uncataloged passthrough model must not advertise provider default as context_length", async () => {
  await settingsDb.updateSettings({ requireLogin: false, requireAuthForModels: false });
  const conn = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "repro-or",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "openrouter",
    (conn as { id: string }).id,
    [{ id: "acme/brand-new-model-1017", name: "Brand New", source: "imported" }]
  );
  catalog.__resetCatalogBuilderRunsForTest();
  const res = await catalog.getUnifiedModelsResponse(new Request("http://localhost/api/v1/models"));
  const body = (await res.json()) as { data: Array<{ id: string; context_length?: number }> };
  const m = body.data.find((x) => x.id === "openrouter/acme/brand-new-model-1017");
  assert.ok(m, "model listed");
  assert.notEqual(
    m.context_length,
    REGISTRY.openrouter.defaultContextLength,
    "advertised context_length is the provider-wide placeholder"
  );
});
