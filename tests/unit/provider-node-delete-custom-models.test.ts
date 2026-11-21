// A compatible node's custom models live in key_value under
// namespace 'customModels' keyed by the node id. Deleting the node left that
// row behind, so the node's model list survived its own deletion. Port of
// 9router a8f63f4d (nodesRepo deletes the node's customModels rows).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-node-custom-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5 });
});

test("deleting a provider node also deletes its customModels row", async () => {
  const node = await providersDb.createProviderNode({
    type: "custom",
    name: "Custom Gateway",
    prefix: "cg-",
    baseUrl: "https://custom.example.com",
  });
  await modelsDb.addCustomModel((node as { id: string }).id, "gateway-mini");
  assert.equal((await modelsDb.getCustomModels((node as { id: string }).id)).length, 1);

  const deleted = await providersDb.deleteProviderNode((node as { id: string }).id);
  assert.ok(deleted, "node is deleted");

  assert.deepEqual(await modelsDb.getCustomModels((node as { id: string }).id), []);
});

test("deleting a node keeps other providers' customModels rows", async () => {
  await modelsDb.addCustomModel("openai", "gpt-custom-lab");
  const node = await providersDb.createProviderNode({
    type: "custom",
    name: "Other Gateway",
    prefix: "og-",
    baseUrl: "https://other.example.com",
  });
  await modelsDb.addCustomModel((node as { id: string }).id, "other-mini");

  await providersDb.deleteProviderNode((node as { id: string }).id);

  const remaining = await modelsDb.getCustomModels("openai");
  assert.equal(remaining.length, 1);
});
