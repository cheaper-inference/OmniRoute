import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #18609 characterization: an operator-set combo `context_length` is a ceiling for the
// advertised `max_input_tokens`, never a raise above a member's own confirmed cap. A
// member that only resolves to its provider's registry default (codex 400K) still bounds
// the combo; an exact per-model capability override on that member is honoured.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-18609-combo-ceiling-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "combo-ceiling-18609-secret";
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const capabilityOverrides = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const { GPT_5_6_CODEX_CAPABILITIES } = await import("../../open-sse/config/providers/shared.ts");
const { REGISTRY } = await import("../../open-sse/config/providers/index.ts");

type Row = Record<string, unknown>;

// Mirrors PATCH /api/model-capability-overrides: context_length lands in the context-override
// table (source "manual"), max_input_tokens in the capability-override table.
function setOverrides(model: string) {
  assert.equal(contextOverrides.setModelContextOverride("codex", model, 1000000, "manual"), true);
  assert.equal(
    capabilityOverrides.setModelCapabilityOverride(`codex/${model}`, "max_input_tokens", 1000000),
    true
  );
}

function clearOverrides(model: string) {
  contextOverrides.removeModelContextOverride("codex", model);
  capabilityOverrides.removeModelCapabilityOverride(`codex/${model}`, "max_input_tokens");
}

async function fetchCombo(id: string): Promise<Row> {
  catalog.__resetCatalogBuilderRunsForTest();
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Row[] };
  const combo = body.data.find((item) => item.id === id);
  assert.ok(combo, `${id} should be published in /v1/models`);
  return combo;
}

test.before(async () => {
  for (const provider of ["claude", "glm", "codex"]) {
    await providersDb.createProviderConnection({
      provider,
      authType: provider === "codex" ? "oauth" : "apikey",
      name: `${provider}-18609`,
      ...(provider === "codex" ? { accessToken: "codex-test-token" } : { apiKey: "test-key" }),
      isActive: true,
      testStatus: "active",
      providerSpecificData: {},
    });
  }
  await combosDb.createCombo({
    name: "combo-18609",
    strategy: "priority",
    context_length: 1000000,
    models: [
      "claude/claude-opus-4-7",
      "glm/glm-5.2",
      "codex/gpt-6.1-sol-xhigh",
      "codex/gpt-6.1-terra-xhigh",
    ],
  });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#18609: fixture matches the issue (sol 872K in catalog, terra uncataloged, codex default 400K)", () => {
  assert.equal(GPT_5_6_CODEX_CAPABILITIES.maxInputTokens, 872000);
  assert.equal(REGISTRY.codex?.defaultContextLength, 400000);
  const ids = new Set((REGISTRY.codex?.models ?? []).map((m: { id: string }) => m.id));
  assert.ok(ids.has("gpt-6.1-sol-xhigh"), "sol-xhigh is a confirmed catalog member");
  assert.equal(ids.has("gpt-6.1-terra-xhigh"), false, "terra-xhigh has no catalog entry");
});

test("#18609: explicit 1M context_length is a ceiling; an uncataloged member with no limit evidence is dropped from min() (combo bounded by sol 872K)", async () => {
  const combo = await fetchCombo("combo-18609");
  assert.equal(combo.context_length, 1000000, "explicit combo window is advertised as-is");
  assert.equal(
    combo.max_input_tokens,
    872000,
    "sol-xhigh's confirmed 872K catalog cap bounds the combo; terra (no evidence) must not pull min() to the 400K codex default"
  );
});

test("#18609: the same combo once the codex connection has a synced model list (production shape) must not fall to the 400K provider default", async () => {
  const codex = (await providersDb.getProviderConnections()).find((c) => c.provider === "codex");
  assert.ok(codex, "codex connection exists");
  const codexId = codex.id as string;
  // The OAuth /codex/models sync lists the model but carries no limits — like the reporter's terra row.
  await modelsDb.replaceSyncedAvailableModelsForConnection("codex", codexId, [
    { id: "gpt-6.1-sol-xhigh", name: "GPT 6.1 Sol (xHigh)", source: "imported" },
    { id: "gpt-6.1-terra-xhigh", name: "GPT 6.1 Terra (xHigh)", source: "imported" },
  ]);
  try {
    const combo = await fetchCombo("combo-18609");
    assert.equal(combo.context_length, 1000000);
    assert.equal(
      combo.max_input_tokens,
      872000,
      "a synced listing proves the model exists, not its window; the codex defaultContextLength (400K) is not member evidence"
    );
  } finally {
    await modelsDb.deleteSyncedAvailableModelsForConnection("codex", codexId);
  }
});

test("#18609: an exact override on the uncataloged member lifts the combo only to the next confirmed cap (sol 872K)", async () => {
  setOverrides("gpt-6.1-terra-xhigh");
  try {
    const combo = await fetchCombo("combo-18609");
    assert.equal(combo.context_length, 1000000);
    assert.equal(
      combo.max_input_tokens,
      872000,
      "sol-xhigh's confirmed 872K catalog cap must still bound the combo; the explicit 1M does not raise it"
    );
  } finally {
    clearOverrides("gpt-6.1-terra-xhigh");
  }
});

test("#18609: overriding both codex members to 1M advertises 1M (the reporter's deployed workaround)", async () => {
  for (const model of ["gpt-6.1-terra-xhigh", "gpt-6.1-sol-xhigh"]) setOverrides(model);
  try {
    const combo = await fetchCombo("combo-18609");
    assert.equal(combo.context_length, 1000000);
    assert.equal(combo.max_input_tokens, 1000000);
  } finally {
    for (const model of ["gpt-6.1-terra-xhigh", "gpt-6.1-sol-xhigh"]) clearOverrides(model);
  }
});
