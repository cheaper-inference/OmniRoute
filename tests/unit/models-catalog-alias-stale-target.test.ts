import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { installOfflineCatalogNetwork } from "../_helpers/offlineCatalogNetwork.ts";

const network = installOfflineCatalogNetwork();

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-alias-stale-target-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const aliasesDb = await import("../../src/lib/db/models/aliases.ts");
const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const modelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const modelsRoute = await import("../../src/app/api/v1/models/route.ts");

network.activate();

const PROVIDER = "openai";
const LIVE_MODEL = "gpt-4o";
const RETIRED_MODEL = "gpt-retired-9";

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  modelsCatalog.__resetCatalogBuilderRunsForTest();
  await settingsDb.updateSettings({ hideAutoCombos: true });
}

async function seedConnection(syncedModelIds: string[] | null): Promise<string> {
  const connection = (await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "openai-primary",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
  })) as { id: string };
  if (syncedModelIds) {
    await modelsDb.replaceSyncedAvailableModelsForConnection(
      PROVIDER,
      connection.id,
      syncedModelIds.map((id) => ({ id, source: "imported", supportedEndpoints: ["chat"] }))
    );
  }
  await aliasesDb.setModelAlias("live-alias", `openai/${LIVE_MODEL}`);
  await aliasesDb.setModelAlias("retired-alias", `openai/${RETIRED_MODEL}`);
  return connection.id;
}

async function getCatalogIds(): Promise<string[]> {
  modelsCatalog.__resetCatalogBuilderRunsForTest();
  const response = await modelsRoute.GET(new Request("http://localhost/api/v1/models?prefix=dual"));
  const body = (await response.json()) as { data: Array<{ id: string }> };
  assert.equal(response.status, 200, JSON.stringify(body));
  return body.data.map((model) => model.id);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  try {
    await modelsCatalog.__flushCatalogBackgroundRefreshForTest();
    assert.deepEqual(network.unexpectedRequests, [], "catalog contracts must stay offline");
  } finally {
    try {
      core.resetDbInstance();
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } finally {
      await network.restore();
    }
  }
});

test("omits alias-backed ids whose target is missing from a fresh synced catalog", async () => {
  await seedConnection([LIVE_MODEL]);
  const ids = await getCatalogIds();
  assert.ok(
    ids.some((id) => id.endsWith(`/${LIVE_MODEL}`)),
    "live synced model stays listed"
  );
  assert.equal(
    ids.some((id) => id.endsWith(`/${RETIRED_MODEL}`)),
    false,
    `retired alias target must not be advertised: ${JSON.stringify(ids.filter((id) => id.includes("3.6")))}`
  );
});

test("keeps alias-backed ids when the provider has no synced catalog", async () => {
  await seedConnection(null);
  const ids = await getCatalogIds();
  assert.ok(
    ids.some((id) => id.endsWith(`/${RETIRED_MODEL}`)),
    "without a synced catalog the alias target stays listed (fail-open)"
  );
});

test("keeps alias-backed ids when the synced catalog is stale", async () => {
  const connectionId = await seedConnection([LIVE_MODEL]);
  const db = core.getDbInstance();
  db.prepare("UPDATE provider_connections SET synced_models_at = ? WHERE id = ?").run(
    new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    connectionId
  );
  const ids = await getCatalogIds();
  assert.ok(
    ids.some((id) => id.endsWith(`/${RETIRED_MODEL}`)),
    "a stale synced catalog must not hide alias targets (fail-open)"
  );
});
