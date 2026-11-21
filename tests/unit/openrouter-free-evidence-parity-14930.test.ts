import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const dataDir = process.env.DATA_DIR;
assert.ok(dataDir, "the canonical isolated DATA_DIR setup must run first");

const { normalizeDiscoveredModels } =
  await import("../../src/lib/providerModels/modelDiscovery.ts");
const { selectModelsForImport } = await import("../../src/shared/utils/freeModels.ts");
const { hasPayloadFreeEvidence } = await import("../../src/shared/utils/payloadFreeEvidence.ts");
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const settings = await import("../../src/lib/db/settings.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const route = await import("../../src/app/api/v1/models/route.ts");

const cases = [
  {
    model: {
      id: "audit/suffix-priced:free",
      pricing: { prompt: "0", completion: "0", request: "0.1" },
    },
    free: false,
  },
  {
    model: {
      id: "audit/flag-priced",
      isFree: true,
      pricing: { prompt: "0", completion: "0", request: "0.1" },
    },
    free: false,
  },
  {
    model: {
      id: "audit/conflicting:free",
      isFree: true,
      free: false,
      pricing: { prompt: "0", completion: "0" },
    },
    free: false,
  },
  {
    model: {
      id: "audit/nested-conflict",
      isFree: true,
      pricing: { free: false, input: "0", output: "0" },
    },
    free: false,
  },
  {
    model: { id: "audit/zero", pricing: { prompt: "0", completion: "0", discount: 0.5 } },
    free: true,
  },
  { model: { id: "audit/ordinary:free" }, free: true },
  { model: { id: "audit/explicit", isFree: true }, free: true },
  { model: { id: "audit/unknown" }, free: false },
  {
    model: {
      id: "audit/malformed",
      pricing: { prompt: "", completion: "not-a-price" },
      isFree: "true",
    },
    free: false,
  },
] as const;

test.after(() => core.resetDbInstance());

for (const { model, free } of cases) {
  test(`#14930 ${model.id}: payload, discovery, and import agree`, () => {
    assert.equal(hasPayloadFreeEvidence(model), free, `${model.id}: payload`);
    const [discovered] = normalizeDiscoveredModels([model], "openrouter");
    assert.ok(discovered, `${model.id}: discovery retains model`);
    assert.equal(discovered.isFree === true, free, `${model.id}: discovery`);
    assert.equal(
      selectModelsForImport("openrouter", [model], true).models.length === 1,
      free,
      `${model.id}: import`
    );
  });
}

test("#14930 GET /v1/models hide-paid uses the same evidence as discovery and import", async () => {
  const cacheDir = path.join(dataDir, "cache");
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(
    path.join(cacheDir, "openrouter-catalog.json"),
    JSON.stringify({ fetchedAt: new Date().toISOString(), data: cases.map(({ model }) => model) })
  );
  await providers.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "offline parity fixture",
    apiKey: "fixture-only",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await settings.updateSettings({ hidePaidModels: true });
  catalog.__resetCatalogBuilderRunsForTest();
  const response = await route.GET(new Request("http://localhost/v1/models"));
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<{ id: string; free?: boolean }> };
  for (const { model, free } of cases) {
    const row = body.data.find((entry) => entry.id === `openrouter/${model.id}`);
    assert.equal(Boolean(row), free, `${model.id}: hide-paid listing`);
    if (row) assert.equal(row.free, true, `${model.id}: free marker`);
  }
});
