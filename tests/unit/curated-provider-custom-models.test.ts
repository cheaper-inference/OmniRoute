/**
 * Curated-model providers (CodeBuddy CN/intl, Kimi Web, Z.ai Web, ChatGPT Web)
 * publish no upstream model-catalog endpoint, so `providerUsesCuratedModelsOnly`
 * hides "Import Models" and skips every synced-catalog loop. That flag leaked into
 * the *custom* model paths as well, which is a different question: a row the
 * operator typed into "Add Custom Model" is a local decision, and dropping it made
 * the model impossible to route — saved in the dashboard, absent from the listing
 * and from `/v1/models`.
 *
 * These tests pin the split: curated providers keep their curated/synced behaviour
 * (no discovery), while operator-defined custom rows survive in the provider
 * listing merge and in `/v1/models`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-curated-custom-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Each catalog build is cold in this suite; the default 8s bound trips on a loaded
// box before the row shaping under test is reached (same reason #12058 pins it).
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

// `codebuddy-intl` is the provider from the report: alias `cbai`, curated-only.
const CURATED_PROVIDER = "codebuddy-intl";
const CURATED_ALIAS = "cbai";
const CUSTOM_MODEL_ID = "deepseek-v4.1-flash-1017";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedCuratedConnection() {
  await providersDb.createProviderConnection({
    provider: CURATED_PROVIDER,
    authType: "oauth",
    name: `${CURATED_PROVIDER}-curated-custom`,
    apiKey: null,
    accessToken: `${CURATED_PROVIDER}-access-token`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
  await seedCuratedConnection();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("/v1/models advertises an operator-defined custom model on a curated-only provider", async () => {
  await modelsDb.addCustomModel(CURATED_PROVIDER, CUSTOM_MODEL_ID, "DeepSeek V4.1 Flash");

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);

  const body = (await response.json()) as { data: Array<{ id: string }> };
  const ids = body.data.map((row) => row.id);

  assert.ok(
    ids.includes(`${CURATED_ALIAS}/${CUSTOM_MODEL_ID}`),
    `expected "${CURATED_ALIAS}/${CUSTOM_MODEL_ID}" in /v1/models, got ${JSON.stringify(
      ids.filter((id) => id.startsWith(`${CURATED_ALIAS}/`))
    )}`
  );
});

test("the curated catalog still ships when no custom model was added", async () => {
  // Anti-vacuity for the test above: the curated registry rows come from the static
  // loop and must not depend on the custom-model path.
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);

  const body = (await response.json()) as { data: Array<{ id: string }> };
  const curatedIds = body.data
    .map((row) => row.id)
    .filter((id) => id.startsWith(`${CURATED_ALIAS}/`));

  assert.ok(curatedIds.length >= 5, `expected the curated lineup, got ${curatedIds.length}`);
  assert.equal(
    curatedIds.includes(`${CURATED_ALIAS}/${CUSTOM_MODEL_ID}`),
    false,
    "nothing was added, so nothing custom may appear"
  );
});
