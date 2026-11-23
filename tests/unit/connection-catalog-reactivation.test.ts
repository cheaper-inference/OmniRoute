import test from "node:test";
import assert from "node:assert/strict";
import {
  restoreActivatedConnectionCatalog,
  prepareConnectionModelTest,
} from "../../src/lib/providerModels/prepareConnectionModelTest.ts";

test("activation restores a missing catalog before returning, without an inference request", async () => {
  let models: { id: string }[] = [];
  let syncs = 0;
  const deps = {
    load: async () => models,
    sync: async () => {
      syncs++;
      models = [{ id: "gpt-6-astra" }];
      return true;
    },
  };
  await restoreActivatedConnectionCatalog("codex", "missing", true, deps);
  assert.equal(syncs, 1);
  assert.equal(await prepareConnectionModelTest("codex", "missing", "gpt-6-astra", deps), null);
  assert.equal(syncs, 1);
});

test("existing catalogs, disabling, unrelated updates and other providers do not sync", async () => {
  let syncs = 0;
  const deps = {
    load: async () => [{ id: "model" }],
    sync: async () => {
      syncs++;
      return true;
    },
  };
  await restoreActivatedConnectionCatalog("codex", "known", true, deps);
  for (const active of [false, undefined])
    await restoreActivatedConnectionCatalog("codex", "known", active, deps);
  await restoreActivatedConnectionCatalog("openai", "known", true, deps);
  assert.equal(syncs, 0);
});

test("failed or empty discovery is not reported as a ready catalog and can be retried", async () => {
  let succeed = false;
  let models: { id: string }[] = [];
  const deps = { load: async () => models, sync: async () => succeed };
  await assert.rejects(restoreActivatedConnectionCatalog("codex", "retry", true, deps));
  succeed = true;
  await assert.rejects(restoreActivatedConnectionCatalog("codex", "retry", true, deps));
  models = [{ id: "model" }];
  await restoreActivatedConnectionCatalog("codex", "retry", true, deps);
});

test("concurrent activation and connection test share one discovery", async () => {
  let models: { id: string }[] = [];
  let syncs = 0;
  const deps = {
    load: async () => models,
    sync: async () => {
      syncs++;
      await new Promise((resolve) => setTimeout(resolve, 10));
      models = [{ id: "model" }];
      return true;
    },
  };
  const [, result] = await Promise.all([
    restoreActivatedConnectionCatalog("codex", "concurrent", true, deps),
    prepareConnectionModelTest("codex", "concurrent", "model", deps),
  ]);
  assert.equal(result, null);
  assert.equal(syncs, 1);
});
