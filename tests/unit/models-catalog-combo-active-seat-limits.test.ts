import { describe, it, after, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A combo's advertised context/output limits are the minimum over its targets. A target whose
// provider has no active connection is never routed to, so it must not drag that minimum down
// (a disabled 128k seat would otherwise cap a combo that in practice only serves a 1M model).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-active-seats-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "combo-active-seat-limits-secret";
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");

const SMALL = "openai/gpt-4o";
const LARGE = "gemini/gemini-2.5-flash";

type CatalogRow = Record<string, unknown>;

async function fetchCatalog(): Promise<CatalogRow[]> {
  catalog.__resetCatalogBuilderRunsForTest();
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: CatalogRow[] };
  return body.data;
}

async function setConnectionActive(id: string, isActive: boolean) {
  await providersDb.updateProviderConnection(id, { isActive });
}

const comboModels = [
  { model: SMALL, providerId: "openai" },
  { model: LARGE, providerId: "gemini" },
];

describe("combo catalog limits ignore seats without an active connection", () => {
  let openaiId = "";
  let geminiId = "";
  let smallOnly: CatalogRow | undefined;
  let largeOnly: CatalogRow | undefined;

  before(async () => {
    const openai = await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "openai-seat",
      apiKey: "sk-openai-seat",
      isActive: true,
      testStatus: "active",
      providerSpecificData: {},
    });
    const gemini = await providersDb.createProviderConnection({
      provider: "gemini",
      authType: "apikey",
      name: "gemini-seat",
      apiKey: "gemini-seat-key",
      isActive: true,
      testStatus: "active",
      providerSpecificData: {},
    });
    openaiId = String(openai.id);
    geminiId = String(gemini.id);

    await combosDb.createCombo({
      name: "seat-small-only",
      strategy: "priority",
      models: [comboModels[0]],
    });
    await combosDb.createCombo({
      name: "seat-large-only",
      strategy: "priority",
      models: [comboModels[1]],
    });
    await combosDb.createCombo({ name: "seat-mixed", strategy: "priority", models: comboModels });
    await combosDb.createCombo({
      name: "seat-mixed-explicit",
      strategy: "priority",
      context_length: 64000,
      models: comboModels,
    });

    const rows = await fetchCatalog();
    smallOnly = rows.find((row) => row.id === "seat-small-only");
    largeOnly = rows.find((row) => row.id === "seat-large-only");
  });

  after(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("fixture targets publish distinct context windows", () => {
    assert.ok(smallOnly && largeOnly, "single-seat combos must be listed");
    assert.equal(typeof smallOnly.context_length, "number");
    assert.equal(typeof largeOnly.context_length, "number");
    assert.ok(
      (largeOnly.context_length as number) > (smallOnly.context_length as number),
      `expected ${LARGE} window > ${SMALL} window`
    );
  });

  it("keeps the minimum across seats when every provider is active", async () => {
    const mixed = (await fetchCatalog()).find((row) => row.id === "seat-mixed");
    assert.ok(mixed);
    assert.equal(mixed.context_length, smallOnly?.context_length);
    assert.equal(mixed.max_input_tokens, smallOnly?.max_input_tokens);
  });

  it("drops the inactive provider's seat from the limit calculation", async () => {
    await setConnectionActive(openaiId, false);
    try {
      const rows = await fetchCatalog();
      const mixed = rows.find((row) => row.id === "seat-mixed");
      assert.ok(mixed, "combo stays listed while one seat is inactive");
      assert.equal(mixed.context_length, largeOnly?.context_length);
      assert.equal(mixed.max_input_tokens, largeOnly?.max_input_tokens);
      assert.equal(mixed.max_output_tokens, largeOnly?.max_output_tokens);

      // An operator-set combo context_length still wins over target limits.
      const explicit = rows.find((row) => row.id === "seat-mixed-explicit");
      assert.ok(explicit);
      assert.equal(explicit.context_length, 64000);
      assert.equal(explicit.max_input_tokens, 64000);
    } finally {
      await setConnectionActive(openaiId, true);
    }
  });

  it("falls back to every seat when no provider has an active connection", async () => {
    await setConnectionActive(openaiId, false);
    await setConnectionActive(geminiId, false);
    try {
      const mixed = (await fetchCatalog()).find((row) => row.id === "seat-mixed");
      assert.ok(mixed, "combo stays listed with every seat inactive");
      assert.equal(mixed.context_length, smallOnly?.context_length);
      assert.equal(mixed.max_input_tokens, smallOnly?.max_input_tokens);
    } finally {
      await setConnectionActive(openaiId, true);
      await setConnectionActive(geminiId, true);
    }
  });

  it("treats a seat pinned to an inactive connection as inactive", async () => {
    const spare = await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "openai-spare",
      apiKey: "sk-openai-spare",
      isActive: true,
      testStatus: "active",
      providerSpecificData: {},
    });
    await combosDb.createCombo({
      name: "seat-pinned",
      strategy: "priority",
      models: [{ ...comboModels[0], connectionId: openaiId }, comboModels[1]],
    });
    await setConnectionActive(openaiId, false);
    try {
      const pinned = (await fetchCatalog()).find((row) => row.id === "seat-pinned");
      assert.ok(pinned);
      assert.equal(pinned.context_length, largeOnly?.context_length);
    } finally {
      await setConnectionActive(openaiId, true);
      await setConnectionActive(String(spare.id), false);
    }
  });

  it("keeps a noAuth seat (no connection rows) in the limit calculation", async () => {
    const noAuthSeat = { model: "auggie/sonnet4.6", providerId: "auggie" };
    await combosDb.createCombo({
      name: "seat-noauth-only",
      strategy: "priority",
      models: [noAuthSeat],
    });
    await combosDb.createCombo({
      name: "seat-noauth-mixed",
      strategy: "priority",
      models: [comboModels[1], noAuthSeat],
    });
    const rows = await fetchCatalog();
    const noAuthOnly = rows.find((row) => row.id === "seat-noauth-only");
    const mixed = rows.find((row) => row.id === "seat-noauth-mixed");
    assert.ok(noAuthOnly && mixed);
    assert.equal(typeof noAuthOnly.context_length, "number");
    assert.ok((noAuthOnly.context_length as number) < (largeOnly?.context_length as number));
    assert.equal(mixed.context_length, noAuthOnly.context_length);
  });
});
