/**
 * #18517: the "Expose in Claude Code" toggle on a provider's dashboard page saves
 * `provider:<[id]>` / `model:<[id]>/<model>` under the page's route id, which for an
 * OpenAI-compatible provider is the node UUID. The catalog predicate looked the
 * setting up by the entry's public prefix (`local/...`), so a toggle saved from the
 * dashboard never matched and no `claude/<prefix>/<model>` mirror was listed.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cc-alias-18517-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.EXPOSE_CC_DISCOVERY_ALIASES;

const core = await import("../../src/lib/db/core.ts");
const ccAliases = await import("../../src/lib/db/ccDiscoveryAliases.ts");
const { buildCcAliasPredicate } = await import("../../src/app/api/v1/models/ccAliasPredicate.ts");
const { applyCatalogPostFilters } = await import("../../src/app/api/v1/models/catalogResponse.ts");
const { resolveCcDiscoveryAliasStrip, resolveCcDiscoveryAliasStripWith } =
  await import("../../src/lib/ccDiscoveryAliasResolve.ts");
const { createProviderNode, deleteProviderNode } = await import("../../src/lib/db/providers.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");

const NODE_ID = "openai-compatible-chat-3f2a9c1e-0000-4000-8000-000000000001";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("provider toggle saved under a compatible node id matches the node's prefix", () => {
  const predicate = buildCcAliasPredicate({
    global: false,
    providers: new Map([[NODE_ID, "on"]]),
    models: new Map(),
    providerNodeIdsByPrefix: { local: NODE_ID },
  });
  assert.equal(predicate({ id: "local/qwen/qwen3.8-27b", owned_by: "local" }), true);
  assert.equal(predicate({ id: "openai/gpt-5.6", owned_by: "openai" }), false);
});

test("model toggle saved under a compatible node id matches the node's prefix", () => {
  const predicate = buildCcAliasPredicate({
    global: true,
    providers: new Map(),
    models: new Map([[`${NODE_ID}/qwen/qwen3.8-27b`, "off"]]),
    providerNodeIdsByPrefix: { local: NODE_ID },
  });
  assert.equal(predicate({ id: "local/qwen/qwen3.8-27b", owned_by: "local" }), false);
  assert.equal(predicate({ id: "local/qwen/qwen3.8-9b", owned_by: "local" }), true);
});

test("a setting keyed by the public prefix still wins over the resolved id", () => {
  const predicate = buildCcAliasPredicate({
    global: false,
    providers: new Map([
      ["local", "off"],
      [NODE_ID, "on"],
    ]),
    models: new Map(),
    providerNodeIdsByPrefix: { local: NODE_ID },
  });
  assert.equal(predicate({ id: "local/qwen/qwen3.8-27b", owned_by: "local" }), false);
});

test("model-level setting under any key wins over a provider setting under any key", () => {
  const predicate = buildCcAliasPredicate({
    global: false,
    providers: new Map([["local", "on"]]),
    models: new Map([[`${NODE_ID}/qwen/qwen3.8-27b`, "off"]]),
    providerNodeIdsByPrefix: { local: NODE_ID },
  });
  assert.equal(predicate({ id: "local/qwen/qwen3.8-27b", owned_by: "local" }), false);
});

test("catalog post-filter lists claude/<prefix>/ mirrors for a toggle saved by node id", async () => {
  ccAliases.setCcAliasProviderSetting(NODE_ID, "on");
  const rows = [
    { id: "local/qwen/qwen3.8-27b", object: "model", owned_by: "local", root: "qwen/qwen3.8-27b" },
  ];
  const out = await applyCatalogPostFilters(new Request("http://localhost/v1/models"), rows, {
    connections: [],
    prefixMode: "dual",
    aliasToProviderId: {},
    pricing: { providerNodeIdsByPrefix: { local: NODE_ID }, resolveComboTarget: () => null },
  });
  assert.ok(
    out.some((m) => m.id === "claude/local/qwen/qwen3.8-27b"),
    `expected a claude/ mirror, got ${JSON.stringify(out.map((m) => m.id))}`
  );
});

const MIRROR_ID = "claude/local/qwen/qwen3.8-27b";
const REAL_ID = "local/qwen/qwen3.8-27b";

/** Injected lookups over plain maps: no DB, so only the gate's key choice is under test. */
function resolverDeps(
  settings: {
    global?: boolean;
    providers?: Record<string, "on" | "off">;
    models?: Record<string, "on" | "off">;
  },
  nodeIds: Array<[string, string]> = [["local", NODE_ID]]
) {
  return {
    claudeModelIds: new Set<string>(),
    isRegistryProvider: () => false,
    customProviderPrefixes: new Set(["local", "constructor"]),
    providerNodeIdsByPrefix: new Map(nodeIds),
    getCombo: async () => null,
    gateGlobal: () => settings.global ?? false,
    gateProvider: (providerId: string) => settings.providers?.[providerId] ?? null,
    gateModel: (providerId: string, modelId: string) =>
      settings.models?.[`${providerId}/${modelId}`] ?? null,
  };
}

test("resolver strips a mirror when the provider toggle is saved under the node id", async () => {
  const result = await resolveCcDiscoveryAliasStripWith(
    MIRROR_ID,
    resolverDeps({ providers: { [NODE_ID]: "on" } })
  );
  assert.deepEqual(result, { model: REAL_ID, stripped: true });
});

test("resolver honors a provider 'off' saved under the node id over the global flag", async () => {
  const result = await resolveCcDiscoveryAliasStripWith(
    MIRROR_ID,
    resolverDeps({ global: true, providers: { [NODE_ID]: "off" } })
  );
  assert.equal(result.stripped, false);
});

test("resolver honors a model toggle saved under the node id", async () => {
  const on = await resolveCcDiscoveryAliasStripWith(
    MIRROR_ID,
    resolverDeps({ models: { [`${NODE_ID}/qwen/qwen3.8-27b`]: "on" } })
  );
  assert.deepEqual(on, { model: REAL_ID, stripped: true });

  const off = await resolveCcDiscoveryAliasStripWith(
    MIRROR_ID,
    resolverDeps({ global: true, models: { [`${NODE_ID}/qwen/qwen3.8-27b`]: "off" } })
  );
  assert.equal(off.stripped, false);
});

test("resolver keeps the catalog's precedence: prefix before node id, model before provider", async () => {
  const prefixWins = await resolveCcDiscoveryAliasStripWith(
    MIRROR_ID,
    resolverDeps({ providers: { local: "off", [NODE_ID]: "on" } })
  );
  assert.equal(prefixWins.stripped, false);

  const modelWins = await resolveCcDiscoveryAliasStripWith(
    MIRROR_ID,
    resolverDeps({
      providers: { local: "on" },
      models: { [`${NODE_ID}/qwen/qwen3.8-27b`]: "off" },
    })
  );
  assert.equal(modelWins.stripped, false);
});

test("resolver falls back to the prefix alone without a node map or for an unmapped prefix", async () => {
  const { providerNodeIdsByPrefix: _omitted, ...withoutMap } = resolverDeps({
    providers: { [NODE_ID]: "on" },
  });
  const noMap = await resolveCcDiscoveryAliasStripWith(MIRROR_ID, withoutMap);
  assert.equal(noMap.stripped, false);

  // A client-supplied prefix naming an Object.prototype member must not reach the gate as a key.
  const asked: string[] = [];
  const deps = resolverDeps({});
  await resolveCcDiscoveryAliasStripWith("claude/constructor/x", {
    ...deps,
    gateProvider: (providerId: string) => {
      asked.push(providerId);
      return null;
    },
  });
  assert.deepEqual(asked, ["constructor"]);
});

test("catalog and request path agree for a toggle saved under a real node's id", async () => {
  const node = await createProviderNode({
    type: "openai-compatible",
    name: "Local",
    prefix: "local",
    baseUrl: "http://localhost:9999/v1",
    apiType: "chat",
  });
  invalidateDbCache();
  try {
    ccAliases.setCcAliasProviderSetting(NODE_ID, null);
    assert.equal((await resolveCcDiscoveryAliasStrip(MIRROR_ID)).stripped, false);

    ccAliases.setCcAliasProviderSetting(node.id, "on");
    assert.deepEqual(await resolveCcDiscoveryAliasStrip(MIRROR_ID), {
      model: REAL_ID,
      stripped: true,
    });

    ccAliases.setCcAliasProviderSetting(node.id, "off");
    assert.equal((await resolveCcDiscoveryAliasStrip(MIRROR_ID)).stripped, false);
  } finally {
    ccAliases.setCcAliasProviderSetting(node.id, null);
    await deleteProviderNode(node.id);
    invalidateDbCache();
  }
});
