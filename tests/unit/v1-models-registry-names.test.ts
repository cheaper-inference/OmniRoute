/**
 * /v1/models publishes a human-readable `name` for built-in registry rows and
 * synced rows. A registry name always wins, a synced row's own name is used when
 * the registry has none, and only rows with neither get a name derived from the
 * id (instead of echoing the raw id back). The change is additive: no other
 * field of any row moves, and MODEL_CATALOG_INCLUDE_NAMES=false still strips
 * `name` everywhere.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-v1-models-names-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-names-test-secret";
process.env.CATALOG_BUILD_TIMEOUT_MS = process.env.CATALOG_BUILD_TIMEOUT_MS || "120000";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const featureFlagsDb = await import("../../src/lib/db/featureFlags.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { withCatalogDisplayName } = await import("../../src/app/api/v1/models/catalogHelpers.ts");

type CatalogRow = Record<string, unknown> & { id: string };

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedConnection(provider: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function seedCatalog() {
  await seedConnection("glm");
  await seedConnection("ai21");
  const goConnection = await seedConnection("opencode-go");
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "opencode-go",
    (goConnection as { id: string }).id,
    [
      // Registry entry exists with name "GLM-5.1": the registry name stays.
      { id: "glm-5.1", name: "GLM 5.1", source: "imported", supportedEndpoints: ["chat"] },
      // No registry entry, provider published a name: that name is used.
      {
        id: "space-bunny-free",
        name: "Space Bunny (Free Tier)",
        source: "imported",
        supportedEndpoints: ["chat"],
      },
      // No registry entry and no published name: derived from the id.
      { id: "orbit-v2-mini", name: "", source: "imported", supportedEndpoints: ["chat"] },
    ]
  );
}

async function fetchCatalog(): Promise<CatalogRow[]> {
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: CatalogRow[] };
  return body.data;
}

function rowById(rows: CatalogRow[], id: string): CatalogRow {
  const row = rows.find((item) => item.id === id);
  assert.ok(row, `${id} must be listed`);
  return row;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("built-in registry rows carry the registry name", async () => {
  await seedCatalog();
  const rows = await fetchCatalog();
  // "GLM 5.3 Flash" is listed by several providers, so the catalog qualifies it
  // with the provider prefix (disambiguateCatalogModelNames); the base name is
  // the registry's.
  assert.match(String(rowById(rows, "glm/glm-5.3-flash").name), /(^|\/)GLM 5\.3 Flash$/);
});

test("built-in registry rows without a registry name get a readable name, not the raw id", async () => {
  await seedCatalog();
  const rows = await fetchCatalog();
  const row = rowById(rows, "ai21/jamba-large-1.7");
  assert.equal(row.name, "Jamba Large 1.7");
  assert.equal(row.root, "jamba-large-1.7");
});

test("synced rows use the registry name first, then their own name, then a derived one", async () => {
  await seedCatalog();
  const rows = await fetchCatalog();
  assert.equal(rowById(rows, "opencode-go/glm-5.1").name, "GLM-5.1");
  assert.equal(rowById(rows, "opencode-go/space-bunny-free").name, "Space Bunny (Free Tier)");
  assert.equal(rowById(rows, "opencode-go/orbit-v2-mini").name, "Orbit V2 Mini");
});

test("MODEL_CATALOG_INCLUDE_NAMES=false still strips name and leaves every other field identical", async () => {
  await seedCatalog();
  const withNames = await fetchCatalog();
  featureFlagsDb.setFeatureFlagOverride("MODEL_CATALOG_INCLUDE_NAMES", "false");
  let withoutNames: CatalogRow[];
  try {
    withoutNames = await fetchCatalog();
  } finally {
    featureFlagsDb.removeFeatureFlagOverride("MODEL_CATALOG_INCLUDE_NAMES");
  }

  assert.equal(
    withoutNames.some((row) => "name" in row),
    false,
    "no row may carry name when the flag is off"
  );
  // `created` is the build timestamp, so two builds may straddle a second.
  const strip = (row: CatalogRow) => {
    const { name: _name, created: _created, ...rest } = row;
    void _name;
    void _created;
    return rest;
  };
  assert.deepEqual(withNames.map(strip), withoutNames.map(strip));
  assert.deepEqual(
    withNames.map((row) => row.id),
    withoutNames.map((row) => row.id)
  );
});

test("withCatalogDisplayName only ever touches the name field", () => {
  const base = {
    id: "ai21/jamba-large-1.7",
    object: "model",
    created: 1,
    owned_by: "ai21",
    root: "jamba-large-1.7",
    parent: null,
    context_length: 256000,
  };

  const rawId = withCatalogDisplayName({ ...base, name: "jamba-large-1.7" });
  assert.equal(rawId.name, "Jamba Large 1.7");
  const { name: _derived, ...rawIdRest } = rawId;
  void _derived;
  assert.deepEqual(rawIdRest, base);

  const missing = withCatalogDisplayName({ ...base });
  assert.equal(missing.name, "Jamba Large 1.7");

  const fullIdName = withCatalogDisplayName({ ...base, name: "ai21/jamba-large-1.7" });
  assert.equal(fullIdName.name, "Jamba Large 1.7");

  const published = { ...base, name: "Jamba Large (Operator Label)" };
  assert.equal(withCatalogDisplayName(published), published);
});
