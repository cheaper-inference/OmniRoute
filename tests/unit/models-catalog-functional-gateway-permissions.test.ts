import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-model-catalog-gateway-permissions-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-gateway-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const featureFlagsDb = await import("../../src/lib/db/featureFlags.ts");
const functionalGatewayDb = await import("../../src/lib/db/functionalGatewayMirrors.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedConnection(
  provider: string,
  overrides: {
    authType?: string;
    apiKey?: string | null;
    accessToken?: string;
  } = {}
) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: `${provider}-catalog-permissions`,
    apiKey: overrides.apiKey === undefined ? "sk-test" : overrides.apiKey,
    accessToken: overrides.accessToken,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

function catalogIds(body: unknown): Set<string> {
  if (!body || typeof body !== "object" || !("data" in body) || !Array.isArray(body.data)) {
    return new Set();
  }
  return new Set(
    body.data.flatMap((item) =>
      item && typeof item === "object" && "id" in item && typeof item.id === "string"
        ? [item.id]
        : []
    )
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("v1 models catalog requires independent permission for functional gateway mirrors", async () => {
  await seedConnection("kimi-coding", {
    authType: "oauth",
    apiKey: null,
    accessToken: "kimi-access",
  });
  await seedConnection("agentrouter");
  featureFlagsDb.setFeatureFlagOverride("EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS", "true");
  functionalGatewayDb.setFunctionalGatewayProviderSetting("agentrouter", "on");

  const restrictedKey = await apiKeysDb.createApiKey(
    "catalog-functional-mirror",
    "machine-functional"
  );
  await apiKeysDb.updateApiKeyPermissions(restrictedKey.id, {
    allowedModels: ["kimi-coding/*"],
  });

  const restrictedResponse = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { Authorization: `Bearer ${restrictedKey.key}` },
    })
  );
  const restrictedIds = catalogIds(await restrictedResponse.json());

  assert.equal(restrictedResponse.status, 200);
  assert.equal(restrictedIds.has("kmc/k3"), true);
  assert.equal(restrictedIds.has("agentrouter/kmc/k3"), false);

  const gatewayKey = await apiKeysDb.createApiKey(
    "catalog-functional-mirror-allowed",
    "machine-functional-allowed"
  );
  await apiKeysDb.updateApiKeyPermissions(gatewayKey.id, {
    allowedModels: ["kimi-coding/*", "agentrouter/*"],
  });

  const gatewayResponse = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { Authorization: `Bearer ${gatewayKey.key}` },
    })
  );
  const gatewayIds = catalogIds(await gatewayResponse.json());

  assert.equal(gatewayResponse.status, 200);
  assert.equal(gatewayIds.has("kmc/k3"), true);
  assert.equal(gatewayIds.has("agentrouter/kmc/k3"), true);
});

// ── CATALOG_MIRROR_REFINEMENTS_ENABLED ─────────────────────────────────────────
// Each case runs flag off (historical catalog, unchanged) and flag on (refined).

const REFINEMENTS_FLAG = "CATALOG_MIRROR_REFINEMENTS_ENABLED";

async function gatewayCatalogIds(refined: boolean): Promise<Set<string>> {
  if (refined) featureFlagsDb.setFeatureFlagOverride(REFINEMENTS_FLAG, "true");
  else featureFlagsDb.removeFeatureFlagOverride(REFINEMENTS_FLAG);
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  return catalogIds(await response.json());
}

async function enableAgentrouterMirrors() {
  const gateway = (await seedConnection("agentrouter")) as { id: string };
  featureFlagsDb.setFeatureFlagOverride("EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS", "true");
  functionalGatewayDb.setFunctionalGatewayProviderSetting("agentrouter", "on");
  return gateway;
}

test("refinements: a model whose owner is connected under an alias prefix is not mirrored", async () => {
  // `kmc/` is kimi-coding's alias. The historical owner check compares the alias
  // prefix against connection provider ids, never matches, and advertises
  // `agentrouter/kmc/k3` even though kimi-coding itself is connected.
  await seedConnection("kimi-coding", {
    authType: "oauth",
    apiKey: null,
    accessToken: "kimi-access",
  });
  await enableAgentrouterMirrors();

  const off = await gatewayCatalogIds(false);
  assert.equal(off.has("kmc/k3"), true);
  assert.equal(off.has("agentrouter/kmc/k3"), true, "flag off keeps the historical mirror");

  const on = await gatewayCatalogIds(true);
  assert.equal(on.has("kmc/k3"), true);
  assert.equal(on.has("agentrouter/kmc/k3"), false);
});

/**
 * Two unowned models the refined catalog mirrors through agentrouter, picked from
 * the live registry instead of hard-coding an id the provider catalogs may drop.
 * Returns the ORIGINAL ids (without the `agentrouter/` prefix).
 */
async function pickUnownedMirroredIds(): Promise<[string, string]> {
  const ids = await gatewayCatalogIds(true);
  const originals = [...ids]
    .filter((id) => id.startsWith("agentrouter/"))
    .map((id) => id.slice("agentrouter/".length))
    // exactly `<prefix>/<model>`: keeps the `<prefix>/*` permission glob unambiguous
    .filter((id) => id.split("/").length === 2 && !id.startsWith("auto/") && ids.has(id));
  assert.ok(originals.length >= 2, "registry must expose at least two unowned mirrored models");
  return [originals[0], originals[1]];
}

test("refinements: an unowned model is still mirrored and still needs its own permission", async () => {
  await enableAgentrouterMirrors();
  const [unowned] = await pickUnownedMirroredIds();
  const ownerPrefix = unowned.slice(0, unowned.indexOf("/"));
  featureFlagsDb.setFeatureFlagOverride(REFINEMENTS_FLAG, "true");

  const listFor = async (allowedModels: string[], name: string) => {
    const key = await apiKeysDb.createApiKey(name, `machine-${name}`);
    await apiKeysDb.updateApiKeyPermissions(key.id, { allowedModels });
    v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
    const response = await v1ModelsCatalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models", {
        headers: { Authorization: `Bearer ${key.key}` },
      })
    );
    assert.equal(response.status, 200);
    return catalogIds(await response.json());
  };

  const restricted = await listFor([`${ownerPrefix}/*`], "refined-restricted");
  assert.equal(restricted.has(unowned), true);
  assert.equal(restricted.has(`agentrouter/${unowned}`), false);

  const allowed = await listFor([`${ownerPrefix}/*`, "agentrouter/*"], "refined-allowed");
  assert.equal(allowed.has(unowned), true);
  assert.equal(allowed.has(`agentrouter/${unowned}`), true);
});

test("refinements: combos never get a gateway mirror", async () => {
  await enableAgentrouterMirrors();
  const off = await gatewayCatalogIds(false);
  assert.equal(
    off.has("agentrouter/auto/best-coding"),
    true,
    "flag off keeps the historical mirror"
  );
  const on = await gatewayCatalogIds(true);
  assert.equal(
    [...on].some((id) => id.startsWith("agentrouter/auto/")),
    false
  );
});

test("refinements: gateway mirrors outside the gateway's authoritative live catalog are skipped", async () => {
  const gateway = await enableAgentrouterMirrors();
  const [served, notServed] = await pickUnownedMirroredIds();
  // A fresh, authoritative live catalog for the gateway that serves exactly one of the
  // two models. The request path rejects everything else ("not available in the
  // active live catalog"), so only that model may be mirrored.
  await modelsDb.replaceSyncedAvailableModelsForConnection("agentrouter", gateway.id, [
    { id: served, name: "Served" },
  ]);

  const off = await gatewayCatalogIds(false);
  assert.equal(off.has(`agentrouter/${notServed}`), true, "flag off ignores the live catalog");

  const on = await gatewayCatalogIds(true);
  assert.equal(on.has(`agentrouter/${served}`), true);
  assert.equal(on.has(`agentrouter/${notServed}`), false);
});

test("refinements: a prefix-stripped live-catalog match does not count for a gateway mirror", async () => {
  // The gateway is sent the full `<prefix>/<model>`; listing only `<model>` must not
  // count (dispatch matches the full id and rejects it).
  const gateway = await enableAgentrouterMirrors();
  const [unowned] = await pickUnownedMirroredIds();
  const stripped = unowned.slice(unowned.indexOf("/") + 1);
  await modelsDb.replaceSyncedAvailableModelsForConnection("agentrouter", gateway.id, [
    { id: stripped, name: "Stripped" },
  ]);
  assert.equal((await gatewayCatalogIds(true)).has(`agentrouter/${unowned}`), false);
});

test("refinements: no mirrors through a gateway disabled in blockedProviders", async () => {
  // A blocked gateway keeps its connection row but has no usable credential at request
  // time, so its mirrors would all be advertised-but-dead.
  await enableAgentrouterMirrors();
  const [unowned] = await pickUnownedMirroredIds();
  await settingsDb.updateSettings({ blockedProviders: ["agentrouter"] });

  const off = await gatewayCatalogIds(false);
  assert.equal(
    off.has(`agentrouter/${unowned}`),
    true,
    "flag off keeps the historical (blocked-gateway) mirrors"
  );
  const on = await gatewayCatalogIds(true);
  assert.equal(
    [...on].some((id) => id.startsWith("agentrouter/")),
    false
  );
});
