// Phase C — CodeBuddy International `/v3/config` model catalog.
//
// The gateway exposes the authoritative model list with capabilities. The
// curated registry had drifted from it (8 missing, 5 stale), so the parser must
// be tolerant of shape changes and must never drop a model it does not
// understand.
import test from "node:test";
import assert from "node:assert/strict";

import {
  parseCodeBuddyConfig,
  mergeCatalogWithCurated,
} from "../../open-sse/executors/codebuddy-intl/catalog.ts";

const configFixture = {
  code: 0,
  data: {
    models: [
      {
        id: "kimi-k3.1-pro",
        name: "Kimi K3.1 Pro",
        capabilities: { reasoning: true, vision: false, toolCall: true, maxTokens: 32000 },
      },
      {
        id: "glm-5.2",
        name: "GLM 5.2",
        capabilities: { reasoning: true, vision: true, toolCall: true },
      },
      {
        model: "grok-4.7",
        displayName: "Grok 4.7",
        supportsVision: true,
      },
    ],
  },
};

test("parses the models array into catalog entries", () => {
  const models = parseCodeBuddyConfig(configFixture);
  assert.equal(models.length, 3);
  assert.equal(models[0].id, "kimi-k3.1-pro");
  assert.equal(models[0].name, "Kimi K3.1 Pro");
  assert.equal(models[0].reasoning, true);
  assert.equal(models[0].vision, false);
  assert.equal(models[0].toolCall, true);
  assert.equal(models[0].maxTokens, 32000);
});

test("accepts the alternate field spellings the gateway uses", () => {
  const models = parseCodeBuddyConfig(configFixture);
  const grok = models.find((model) => model.id === "grok-4.7");
  assert.ok(grok);
  assert.equal(grok.name, "Grok 4.7");
  assert.equal(grok.vision, true);
});

test("an empty or malformed payload yields an empty catalog, never a throw", () => {
  for (const payload of [null, undefined, {}, { data: null }, { data: {} }, [], "nope"]) {
    assert.deepEqual(parseCodeBuddyConfig(payload), []);
  }
});

test("entries without a usable id are skipped", () => {
  const models = parseCodeBuddyConfig({
    data: { models: [{ name: "no id" }, { id: "" }, { id: 42 }, { id: "ok-model" }] },
  });
  assert.deepEqual(
    models.map((model) => model.id),
    ["ok-model"]
  );
});

test("duplicate ids are collapsed, first occurrence wins", () => {
  const models = parseCodeBuddyConfig({
    data: {
      models: [
        { id: "m", name: "first" },
        { id: "m", name: "second" },
      ],
    },
  });
  assert.equal(models.length, 1);
  assert.equal(models[0].name, "first");
});

test("capabilities are read from a nested object when present", () => {
  const models = parseCodeBuddyConfig({
    data: {
      models: [
        {
          id: "nested",
          capabilities: { reasoning: true, vision: true, toolCall: false, contextWindow: 200000 },
        },
      ],
    },
  });
  assert.equal(models[0].reasoning, true);
  assert.equal(models[0].vision, true);
  assert.equal(models[0].toolCall, false);
  assert.equal(models[0].contextWindow, 200000);
});

test("merging adds missing models and keeps curated metadata", () => {
  const curated = [
    { id: "kimi-k3.1-pro", name: "Kimi (curated)", vision: false },
    { id: "glm-5.1", name: "GLM 5.1 (stale)" },
  ];
  const parsed = parseCodeBuddyConfig(configFixture);

  const merged = mergeCatalogWithCurated(parsed, curated);

  const kimi = merged.models.find((model) => model.id === "kimi-k3.1-pro");
  assert.equal(kimi?.name, "Kimi (curated)", "curated metadata wins for shared ids");
  assert.equal(kimi?.reasoning, true, "gateway capabilities still fill in");

  assert.equal(
    merged.models.some((model) => model.id === "grok-4.7"),
    true,
    "gateway-only models are added"
  );
  assert.equal(
    merged.models.some((model) => model.id === "glm-5.1"),
    true,
    "curated models the gateway omits are NOT dropped"
  );
});

test("merging reports which curated entries the gateway no longer lists", () => {
  const merged = mergeCatalogWithCurated(parseCodeBuddyConfig(configFixture), [
    { id: "glm-5.1", name: "GLM 5.1" },
    { id: "kimi-k2.6", name: "Kimi K2.6" },
  ]);

  assert.deepEqual(merged.stale.sort(), ["glm-5.1", "kimi-k2.6"]);
  assert.deepEqual(merged.added.sort(), ["glm-5.2", "grok-4.7", "kimi-k3.1-pro"]);
});

test("merging with an empty gateway catalog preserves the curated list", () => {
  const curated = [
    { id: "a", name: "A" },
    { id: "b", name: "B" },
  ];
  const merged = mergeCatalogWithCurated([], curated);

  assert.deepEqual(
    merged.models.map((model) => model.id),
    ["a", "b"]
  );
  assert.deepEqual(merged.added, []);
});
