import test from "node:test";
import assert from "node:assert/strict";
import {
  shouldFetchLiveModels,
  hasUsableLiveModels,
  buildLiveModelEntries,
} from "../../src/shared/components/modelSelectLiveProviders.ts";

// The combo model picker only fetched the live `/models` catalog for custom
// (openai-/anthropic-compatible) nodes. Providers whose registry catalog is
// intentionally empty and discovered live (zed-hosted: `models: []` +
// `modelsUrl`) fell into the static branch and rendered no group at all.

test("shouldFetchLiveModels: zed-hosted (empty static catalog + modelsUrl) is fetched live", () => {
  assert.equal(shouldFetchLiveModels("zed-hosted"), true);
});

test("shouldFetchLiveModels: providers with a static catalog are not fetched", () => {
  assert.equal(shouldFetchLiveModels("openai"), false);
  assert.equal(shouldFetchLiveModels("claude"), false);
});

test("shouldFetchLiveModels: providers the picker treats as passthrough are not fetched", () => {
  // requesty: registry `models: []` + `modelsUrl`, but the dashboard entry is
  // passthrough, so the picker renders its alias/custom rows instead.
  assert.equal(shouldFetchLiveModels("requesty"), false);
});

test("shouldFetchLiveModels: custom compatible nodes keep fetching live", () => {
  assert.equal(shouldFetchLiveModels("openai-compatible-chat-x"), true);
  assert.equal(shouldFetchLiveModels("anthropic-compatible-x"), true);
});

test("shouldFetchLiveModels: unknown / empty ids are not fetched", () => {
  assert.equal(shouldFetchLiveModels("not-a-provider"), false);
  assert.equal(shouldFetchLiveModels(""), false);
});

test("hasUsableLiveModels: a live-only provider accepts a single model", () => {
  assert.equal(hasUsableLiveModels("zed-hosted", [{ id: "gpt-6-sol" }]), true);
  assert.equal(hasUsableLiveModels("zed-hosted", []), false);
  assert.equal(hasUsableLiveModels("zed-hosted", null), false);
});

test("hasUsableLiveModels: custom nodes keep the more-than-one heuristic", () => {
  assert.equal(hasUsableLiveModels("openai-compatible-chat-x", [{ id: "a" }]), false);
  assert.equal(hasUsableLiveModels("openai-compatible-chat-x", [{ id: "a" }, { id: "b" }]), true);
});

test("buildLiveModelEntries: maps live models to auto-sourced rows under the provider prefix", () => {
  const entries = buildLiveModelEntries({
    liveModels: [
      { id: "claude-sonnet-5-5", name: "Claude Sonnet 5.5" },
      { id: "gpt-6-sol", name: "GPT-6 Sol" },
    ],
    prefix: "zed-hosted",
    existingIds: [],
    isHidden: () => false,
  });

  assert.deepEqual(entries, [
    {
      id: "claude-sonnet-5-5",
      name: "Claude Sonnet 5.5",
      value: "zed-hosted/claude-sonnet-5-5",
      isFetched: true,
      source: "auto",
    },
    {
      id: "gpt-6-sol",
      name: "GPT-6 Sol",
      value: "zed-hosted/gpt-6-sol",
      isFetched: true,
      source: "auto",
    },
  ]);
});

test("buildLiveModelEntries: existing (system/custom) rows win and hidden ids are dropped", () => {
  const entries = buildLiveModelEntries({
    liveModels: [{ id: "claude-sonnet-5-5" }, { id: "gpt-6-sol" }, { id: "grok-5" }],
    prefix: "zed-hosted",
    existingIds: ["claude-sonnet-5-5"],
    isHidden: (id) => id === "grok-5",
  });

  assert.deepEqual(
    entries.map((entry) => entry.value),
    ["zed-hosted/gpt-6-sol"]
  );
});

test("buildLiveModelEntries: falls back across id fields and dedups repeated ids", () => {
  const entries = buildLiveModelEntries({
    liveModels: [
      { slug: "slug-model", displayName: "Slug Model" },
      { model: "model-field" },
      { id: "dup" },
      { id: "dup", name: "Duplicate" },
      {},
      null,
    ],
    prefix: "node",
    existingIds: [],
    isHidden: () => false,
  });

  assert.deepEqual(
    entries.map((entry) => [entry.id, entry.name, entry.value]),
    [
      ["slug-model", "Slug Model", "node/slug-model"],
      ["model-field", "model-field", "node/model-field"],
      ["dup", "dup", "node/dup"],
    ]
  );
});
