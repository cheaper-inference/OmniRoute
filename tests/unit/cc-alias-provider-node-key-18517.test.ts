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
