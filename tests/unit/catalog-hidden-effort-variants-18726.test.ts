import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// #18726: an effort variant hidden on its own (hide `<base>-low`, keep `<base>`)
// must stay out of /v1/models. The variants are synthesized after the per-row
// hidden/exposure filters ran on the base rows, so they need their own check.

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-hidden-effort-18726-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
process.env.NODE_ENV = "test";
process.env.API_KEY_SECRET = "synthetic-catalog-hidden-effort-18726";
// This tests catalog contents, not the cold-build latency budget of the shared host.
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createProviderConnection, createProviderNode } =
  await import("../../src/lib/db/providers.ts");
const { replaceSyncedAvailableModelsForConnection, setModelIsHidden } =
  await import("../../src/lib/db/models.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { invalidateModelCatalogCache } = await import("../../src/lib/db/readCache.ts");
const modelsRoute = await import("../../src/app/api/v1/models/route.ts");
const { applyCatalogPostFilters } = await import("../../src/app/api/v1/models/catalogResponse.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function catalogIds(): Promise<string[]> {
  invalidateModelCatalogCache();
  const response = await modelsRoute.GET(new Request("http://localhost/v1/models"));
  assert.equal(response.status, 200, await response.clone().text());
  const body: { data: { id: string }[] } = await response.json();
  return body.data.map((model) => model.id);
}

test("post-filter drops hidden Claude and synced effort variants, keeps base and siblings", async () => {
  const hidden = new Set(["cmd/claude-opus-4-7-low", "myp/my-model-high"]);
  const out = await applyCatalogPostFilters(
    new Request("http://localhost/v1/models"),
    [
      { id: "cmd/claude-opus-4-7", owned_by: "command-code", type: "chat" },
      {
        id: "myp/my-model",
        owned_by: "myp",
        type: "chat",
        capabilities: { effort_tiers: ["low", "high"] },
      },
    ],
    {
      connections: [],
      prefixMode: "dual",
      aliasToProviderId: {},
      hideNoThinkVariants: true,
      isSyntheticVariantHidden: (model) => hidden.has(model.id),
    }
  );
  const ids = out.map((m) => m.id);
  assert.ok(ids.includes("cmd/claude-opus-4-7"));
  assert.ok(ids.includes("cmd/claude-opus-4-7-medium"));
  assert.ok(ids.includes("cmd/claude-opus-4-7-high"));
  assert.equal(ids.includes("cmd/claude-opus-4-7-low"), false);
  assert.ok(ids.includes("myp/my-model"));
  assert.ok(ids.includes("myp/my-model-low"));
  assert.equal(ids.includes("myp/my-model-high"), false);
});

test("post-filter without a hidden predicate still lists every variant", async () => {
  const out = await applyCatalogPostFilters(
    new Request("http://localhost/v1/models"),
    [{ id: "cmd/claude-opus-4-7", owned_by: "command-code", type: "chat" }],
    { connections: [], prefixMode: "dual", aliasToProviderId: {}, hideNoThinkVariants: true }
  );
  assert.ok(out.some((m) => m.id === "cmd/claude-opus-4-7-low"));
});

test("/v1/models honors a hidden effort variant and a denylisted variant glob", async () => {
  const connection = await createProviderConnection({
    provider: "command-code",
    authType: "apikey",
    name: "catalog fixture",
    apiKey: "synthetic-command-code",
    isActive: true,
    testStatus: "active",
  });
  await replaceSyncedAvailableModelsForConnection("command-code", connection.id, [
    {
      id: "claude-opus-4-7",
      name: "Claude Opus fixture",
      source: "imported",
      supportedThinkingEfforts: ["low", "medium", "high"],
    },
  ]);

  const before = await catalogIds();
  const variant = before.find((id) => id.endsWith("/claude-opus-4-7-low"));
  assert.ok(variant, "baseline must advertise the -low variant; do not skip this assertion");
  const prefix = variant.slice(0, variant.indexOf("/"));

  assert.ok(
    before.some((id) => id.startsWith("no-think/") && id.endsWith("/claude-opus-4-7-low")),
    "baseline must advertise the no-thinking alias of the -low variant"
  );

  setModelIsHidden("command-code", "claude-opus-4-7-low", true);
  const afterHide = await catalogIds();
  // Covers both `<prefix>/claude-opus-4-7-low` and its `no-think/<prefix>/...` alias.
  assert.deepEqual(
    afterHide.filter((id) => id.endsWith("/claude-opus-4-7-low")),
    [],
    "a hidden effort variant must not be re-synthesized from its visible base"
  );
  assert.ok(afterHide.includes(`${prefix}/claude-opus-4-7`), "the base stays visible");
  assert.ok(afterHide.includes(`${prefix}/claude-opus-4-7-high`), "sibling tiers stay visible");

  await updateSettings({ modelVisibilityDenylist: ["*claude-opus-4-7-medium"] });
  const afterDeny = await catalogIds();
  assert.equal(
    afterDeny.some((id) => id.endsWith("/claude-opus-4-7-medium")),
    false,
    "a denylist glob must reach synthesized variants too"
  );
  assert.ok(afterDeny.includes(`${prefix}/claude-opus-4-7`));
  assert.ok(afterDeny.includes(`${prefix}/claude-opus-4-7-high`));

  // A variant inherits its base's allowlist match: allowlisting only the base
  // must keep advertising the variants that are not hidden or denied.
  await updateSettings({ modelVisibilityAllowlist: ["claude-opus-4-7"] });
  const afterAllow = await catalogIds();
  assert.ok(afterAllow.includes(`${prefix}/claude-opus-4-7`));
  assert.ok(
    afterAllow.includes(`${prefix}/claude-opus-4-7-high`),
    "allowlisting the base must not drop its variants"
  );
  assert.equal(
    afterAllow.some((id) => id.endsWith("/claude-opus-4-7-low")),
    false,
    "a hidden variant stays hidden under an allowlist"
  );
  await updateSettings({ modelVisibilityAllowlist: [], modelVisibilityDenylist: [] });
});

test("/v1/models checks a compatible node's effort variants under the node id", async () => {
  const nodeId = "openai-compatible-chat-effort-variants-18726";
  await createProviderNode({
    id: nodeId,
    type: "openai-compatible",
    name: nodeId,
    prefix: "effortnode",
    baseUrl: "https://fixture.invalid/v1",
  });
  const connection = await createProviderConnection({
    provider: nodeId,
    authType: "apikey",
    name: nodeId,
    apiKey: "sk-catalog-fixture",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { baseUrl: "https://fixture.invalid/v1" },
  });
  await replaceSyncedAvailableModelsForConnection(nodeId, String(connection.id), [
    {
      id: "my-model",
      name: "Node model",
      source: "imported",
      supportedEndpoints: ["chat"],
      supportedThinkingEfforts: ["low", "medium", "high"],
    },
  ]);

  const before = await catalogIds();
  for (const tier of ["low", "medium", "high"]) {
    assert.ok(
      before.includes(`effortnode/my-model-${tier}`),
      `baseline must advertise effortnode/my-model-${tier}; do not skip this assertion`
    );
  }

  // The dashboard keys the hidden row by the node id, not the public prefix.
  setModelIsHidden(nodeId, "my-model-high", true);
  await updateSettings({ modelVisibilityDenylist: [`${nodeId}/my-model-low`] });
  const after = await catalogIds();
  assert.equal(after.includes("effortnode/my-model-high"), false, "node-id hidden row applies");
  assert.equal(after.includes("effortnode/my-model-low"), false, "node-id deny entry applies");
  assert.ok(after.includes("effortnode/my-model"));
  assert.ok(after.includes("effortnode/my-model-medium"));
  await updateSettings({ modelVisibilityDenylist: [] });
});
