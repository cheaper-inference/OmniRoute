import assert from "node:assert/strict";
import test from "node:test";

import {
  buildAliasMaps,
  getComboTargetModelId,
} from "../../src/app/api/v1/models/catalogProviderMaps.ts";

test("catalog target resolution does not scan every provider alias for each model", () => {
  const maps = buildAliasMaps();
  let scans = 0;
  maps.aliasToProviderId = new Proxy(maps.aliasToProviderId, {
    ownKeys(target) {
      scans++;
      return Reflect.ownKeys(target);
    },
  });
  for (let i = 0; i < 100; i++) {
    for (const modelStr of ["gpt-5.6-sol", "cx/gpt-5.6-sol", "codex/gpt-5.6-sol"]) {
      assert.deepEqual(getComboTargetModelId(maps, { providerId: "codex", modelStr }), {
        providerId: "codex",
        modelId: "gpt-5.6-sol",
      });
    }
  }
  assert.equal(scans, 0, "300 targets must not trigger 300 whole-registry scans");
});

test("catalog target resolution preserves a vendor namespace and unrelated provider prefix", () => {
  const maps = buildAliasMaps();
  for (const modelStr of ["Qwen/Qwen3-8B", "nvidia/Qwen/Qwen3-8B"]) {
    assert.deepEqual(getComboTargetModelId(maps, { providerId: "openrouter", modelStr }), {
      providerId: "openrouter",
      modelId: modelStr,
    });
  }
});

test("catalog target resolution preserves canonical aliases and selected provider-node prefixes", () => {
  const maps = buildAliasMaps();
  assert.deepEqual(
    getComboTargetModelId(maps, {
      providerId: "opencode",
      modelStr: "opencode/nemotron-3-ultra-free",
    }),
    { providerId: "opencode-zen", modelId: "nemotron-3-ultra-free" }
  );
  assert.deepEqual(
    getComboTargetModelId(
      maps,
      { providerId: "openai-compatible-probe", modelStr: "friendly/model-a" },
      { friendly: "openai-compatible-probe" }
    ),
    { providerId: "openai-compatible-probe", modelId: "model-a" }
  );
});

test("a mapped prefix must still route to the selected provider", () => {
  const maps = buildAliasMaps();
  maps.aliasToProviderId.nvidia = "openrouter";
  assert.deepEqual(
    getComboTargetModelId(maps, {
      providerId: "openrouter",
      modelStr: "nvidia/model-a",
    }),
    { providerId: "openrouter", modelId: "nvidia/model-a" }
  );
});

test("overlapping slash-containing aliases retain their existing insertion precedence", () => {
  const maps = {
    aliasToProviderId: { "cx/nested": "codex", cx: "codex", codex: "codex" },
    providerIdToAlias: {},
  };
  assert.deepEqual(
    getComboTargetModelId(maps, {
      providerId: "codex",
      modelStr: "cx/nested/gpt-5.6-sol",
    }),
    { providerId: "codex", modelId: "gpt-5.6-sol" }
  );
});
