import assert from "node:assert/strict";
import test from "node:test";

import {
  buildPassthroughPickerModels,
  providerShowsSyncedInPassthroughPicker,
} from "../../src/shared/components/modelSelectModalHelpers.ts";
import { fetchPassthroughSyncedModels } from "../../src/shared/components/modelSelectDiscovery.ts";

const visible = () => false;

test("jzstoken passthrough picker lists synced models when aliases and custom rows are absent", () => {
  assert.equal(providerShowsSyncedInPassthroughPicker("jzstoken"), true);
  assert.equal(providerShowsSyncedInPassthroughPicker("openrouter"), false);

  const models = buildPassthroughPickerModels({
    providerId: "jzstoken",
    alias: "jzstoken",
    modelAliases: {},
    customModels: [],
    syncedModels: [
      { id: "gpt-5.6-terra", name: "GPT 5.6 Terra" },
      { id: "jzs-max-3.0", name: "JZS Max 3.0" },
      { id: "text-embedding-3-large", supportedEndpoints: ["embeddings"] },
    ],
    isHidden: visible,
  });

  assert.deepEqual(
    models.map((model) => model.value),
    ["jzstoken/gpt-5.6-terra", "jzstoken/jzs-max-3.0"]
  );
  assert.equal(models[0]?.source, "imported");
  assert.equal(models[0]?.name, "GPT 5.6 Terra");
});

test("jzstoken passthrough picker keeps alias and custom rows ahead of a synced duplicate", () => {
  const models = buildPassthroughPickerModels({
    providerId: "jzstoken",
    alias: "jzstoken",
    modelAliases: { terra: "jzstoken/gpt-5.6-terra" },
    customModels: [{ id: "custom-only", name: "Custom", source: "manual" }],
    syncedModels: [
      { id: "gpt-5.6-terra", name: "synced name" },
      { id: "jzs-max-3.0", name: "JZS Max 3.0" },
      { id: "hidden-model", name: "Hidden" },
    ],
    isHidden: (modelId) => modelId === "hidden-model",
  });

  assert.deepEqual(
    models.map((model) => ({ id: model.id, source: model.source, value: model.value })),
    [
      { id: "gpt-5.6-terra", source: "alias", value: "jzstoken/gpt-5.6-terra" },
      { id: "custom-only", source: "custom", value: "jzstoken/custom-only" },
      { id: "jzs-max-3.0", source: "imported", value: "jzstoken/jzs-max-3.0" },
    ]
  );
});

test("other passthrough providers stay alias-only in the legacy picker", () => {
  const models = buildPassthroughPickerModels({
    providerId: "openrouter",
    alias: "openrouter",
    modelAliases: {},
    customModels: [],
    syncedModels: [{ id: "openai/gpt-4.1", name: "GPT-4.1" }],
    isHidden: visible,
  });

  assert.deepEqual(models, []);
});

test("passthrough synced fetch reads the stored catalog and skips other providers", async () => {
  const calls: string[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    calls.push(url);
    assert.match(url, /\/api\/synced-available-models\?provider=jzstoken$/);
    return new Response(JSON.stringify({ models: [{ id: "jzs-max-3.0", name: "JZS Max 3.0" }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  try {
    const synced = await fetchPassthroughSyncedModels(["openrouter", "jzstoken", "jzstoken"]);
    assert.deepEqual(calls, ["/api/synced-available-models?provider=jzstoken"]);
    assert.equal(synced.jzstoken?.[0] && (synced.jzstoken[0] as { id: string }).id, "jzs-max-3.0");
    assert.equal(synced.openrouter, undefined);
  } finally {
    globalThis.fetch = original;
  }
});
