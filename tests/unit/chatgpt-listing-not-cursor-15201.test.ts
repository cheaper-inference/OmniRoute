/**
 * #15201 — ChatGPT joins the exclusive-synced-listing providers, but the Cursor-only
 * behavior (`owned_by: "cursor"` + synthetic `auto*` router rows) must stay scoped to
 * Cursor. Guards both emit sites: mergeProviderModelListing and the /v1/models catalog.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15201-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Cold catalog builds are bounded by CATALOG_BUILD_TIMEOUT_MS (#12627); keep it out of the way
// so a loaded host answers the real catalog instead of the 503 build-timeout fallback.
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { providerIsCursor, providerUsesExclusiveSyncedListing } =
  await import("../../src/lib/providers/modelListingCapability.ts");
const { mergeProviderModelListing } =
  await import("../../src/lib/providers/mergeProviderModelListing.ts");

const AUTO_IDS = ["auto", "auto-cost", "auto-balance", "auto-intelligence"];

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("providerIsCursor matches only cursor ids; chatgpt stays exclusive but not cursor", () => {
  assert.equal(providerIsCursor("cursor"), true);
  assert.equal(providerIsCursor("cu"), true);
  assert.equal(providerIsCursor(" Cursor "), true);
  assert.equal(providerIsCursor("chatgpt"), false);
  assert.equal(providerIsCursor("codex"), false);
  assert.equal(providerIsCursor(""), false);
  assert.equal(providerUsesExclusiveSyncedListing("chatgpt"), true);
});

test("mergeProviderModelListing: chatgpt keeps its own owner and gets no Cursor auto* rows", () => {
  const models = mergeProviderModelListing({
    providerId: "chatgpt",
    registryModels: [],
    syncedModels: [{ id: "gpt-5.5", name: "GPT 5.5" }],
    customModels: [],
    usesCuratedModelsOnly: false,
  });
  assert.deepEqual(
    models.map((m) => m.id),
    ["gpt-5.5"]
  );
  assert.equal(models[0].owned_by, "chatgpt");
});

test("mergeProviderModelListing: cursor still gets owned_by cursor + auto* rows", () => {
  const models = mergeProviderModelListing({
    providerId: "cursor",
    registryModels: [],
    syncedModels: [{ id: "composer-2.5", name: "Composer 2.5" }],
    customModels: [],
    usesCuratedModelsOnly: false,
  });
  const ids = models.map((m) => m.id);
  for (const id of AUTO_IDS) assert.ok(ids.includes(id), `cursor must list ${id}`);
  assert.ok(models.every((m) => m.owned_by === "cursor"));
});

test("/v1/models: chatgpt synced inventory is listed without Cursor auto* rows or cursor owner", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "chatgpt",
    authType: "oauth",
    name: "chatgpt-15201",
    email: "siwc@example.com",
    isActive: true,
    accessToken: "fixture-token",
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    testStatus: "active",
    providerSpecificData: {
      issuer: "https://auth.openai.com",
      subject: "fixture-subject",
      clientId: "oaiapp_fixture",
      scopes: ["chatgpt.tokens.use.direct"],
    },
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "chatgpt",
    (connection as { id: string }).id,
    [{ id: "gpt-5.5", name: "GPT 5.5", source: "imported", supportedEndpoints: ["chat"] }]
  );

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  assert.equal(response.status, 200);

  const chatgptRows = body.data.filter((m) => String(m.id).startsWith("chatgpt/"));
  assert.ok(
    chatgptRows.some((m) => m.id === "chatgpt/gpt-5.5"),
    `expected chatgpt/gpt-5.5 in ${JSON.stringify(body.data.map((m) => m.id))}`
  );
  for (const id of AUTO_IDS) {
    assert.equal(
      chatgptRows.some((m) => m.id === `chatgpt/${id}`),
      false,
      `chatgpt must not inherit the Cursor ${id} alias`
    );
  }
  assert.equal(
    chatgptRows.some((m) => m.owned_by === "cursor"),
    false,
    "no chatgpt row may be owned_by cursor"
  );
});
