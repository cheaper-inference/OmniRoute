/**
 * modelCompatOverrides.supportsVision must resolve for a custom openai-compatible
 * node no matter which of the node's two identities addresses the target.
 *
 * #15086 taught the canonical resolver (and therefore the combo vision filter and
 * /v1/models) to read `modelCompatOverrides.supportsVision`. That lookup is keyed by
 * the provider id `PUT /api/provider-models` was given — normally the node's internal
 * id (`openai-compatible-responses-<uuid>`). The catalog and prefix-addressed requests
 * address the same node by its user-defined prefix (`nr/<model>`, see catalog.ts's
 * `alias = prefix || providerIdToAlias[providerId] || providerId`), so the flag was
 * still invisible on that path: an image request to a prefix-addressed combo target
 * was rejected as vision-incapable even though the operator had flagged the model.
 *
 * Regression guard: the node-id form, the prefix form, and the catalog-shaped string
 * form must all agree, and an unrelated provider must not inherit the override.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-node-prefix-vision-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "node-prefix-vision-test-secret";

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const nodesDb = await import("../../src/lib/db/providers/nodes.ts");
const nodePrefix = await import("../../src/lib/db/providers/nodePrefix.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
const { filterTargetsByRequestCompatibility } = await import("../../open-sse/services/combo.ts");

const NODE_ID = "openai-compatible-responses-8ab99c2a-77e7-483d-84d6-d0277115607e";
const PREFIX = "nr";
const VISION_MODEL = "deepseek/deepseek-v4.1-flash";
const BLIND_MODEL = "deepseek/deepseek-v4.1-blind";
const UNSET_MODEL = "deepseek/deepseek-v4.1-unset";

function imageRequestBody() {
  return {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "which colors?" },
          { type: "image_url", image_url: { url: "data:image/png;base64,AAAA" } },
        ],
      },
    ],
  };
}

function comboTarget(providerId: string | null, provider: string, modelStr: string) {
  return {
    kind: "model",
    stepId: "step-1",
    executionKey: "exec-1",
    modelStr,
    provider,
    providerId,
    connectionId: null,
    weight: 1,
    label: null,
  } as never;
}

const log = { info: () => {}, warn: () => {}, debug: () => {}, error: () => {} };

test.before(async () => {
  await nodesDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "NordRouter",
    prefix: PREFIX,
    baseUrl: "https://example.invalid/v1",
    apiType: "responses",
  });
  // The live write path: PUT /api/provider-models { provider: <node id>, modelId, supportsVision }
  modelsDb.mergeModelCompatOverride(NODE_ID, VISION_MODEL, { supportsVision: true });
  modelsDb.mergeModelCompatOverride(NODE_ID, BLIND_MODEL, { supportsVision: false });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("node prefix maps back to its internal node id", () => {
  assert.equal(nodePrefix.getProviderNodeIdByPrefixSync(PREFIX), NODE_ID);
  assert.equal(nodePrefix.getProviderNodeIdByPrefixSync(PREFIX.toUpperCase()), NODE_ID);
  assert.equal(nodePrefix.getProviderNodeIdByPrefixSync("no-such-node-prefix"), null);
  assert.equal(nodePrefix.getProviderNodePrefixSync(NODE_ID), PREFIX);
});

test("compat vision override resolves for the node id and for its prefix alike", () => {
  const cases = [
    { provider: NODE_ID, model: VISION_MODEL },
    { provider: PREFIX, model: VISION_MODEL },
    { provider: NODE_ID, model: `${PREFIX}/${VISION_MODEL}` },
    { provider: PREFIX, model: `${PREFIX}/${VISION_MODEL}` },
    `${NODE_ID}/${VISION_MODEL}`,
    `${PREFIX}/${VISION_MODEL}`,
  ] as const;

  for (const input of cases) {
    assert.equal(
      modelCapabilities.getResolvedModelCapabilities(input).supportsVision,
      true,
      JSON.stringify(input)
    );
  }
});

test("an explicit supportsVision:false on the node reaches the prefix form too", () => {
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({ provider: NODE_ID, model: BLIND_MODEL })
      .supportsVision,
    false
  );
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({ provider: PREFIX, model: BLIND_MODEL })
      .supportsVision,
    false
  );
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({ provider: PREFIX, model: UNSET_MODEL })
      .supportsVision,
    null,
    "a model with no override on this node must stay unknown"
  );
});

test("prefix-addressed combo target survives the vision filter for an image request", () => {
  const body = imageRequestBody();
  const variants = [
    ["node id + bare model", comboTarget(NODE_ID, PREFIX, VISION_MODEL)],
    ["node id + prefix/model", comboTarget(NODE_ID, PREFIX, `${PREFIX}/${VISION_MODEL}`)],
    ["prefix + bare model", comboTarget(PREFIX, PREFIX, VISION_MODEL)],
    ["prefix only, catalog-shaped model", comboTarget(null, PREFIX, `${PREFIX}/${VISION_MODEL}`)],
  ] as const;

  for (const [label, target] of variants) {
    assert.equal(
      filterTargetsByRequestCompatibility([target], body, log).length,
      1,
      `image request must keep the vision-capable target (${label})`
    );
  }

  assert.equal(
    filterTargetsByRequestCompatibility([comboTarget(PREFIX, PREFIX, BLIND_MODEL)], body, log)
      .length,
    0,
    "an explicitly vision-disabled node model must still be dropped"
  );
});

test("no cross-provider leak: an unrelated provider keeps its own verdict", () => {
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({
      provider: "zz-unrelated-provider",
      model: VISION_MODEL,
    }).supportsVision,
    null
  );
  // Static / models.dev catalog targets are untouched by the node mapping.
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({ provider: "openai", model: "gpt-4o" })
      .supportsVision,
    true
  );
});
