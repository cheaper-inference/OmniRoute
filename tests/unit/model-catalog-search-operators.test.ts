import test from "node:test";
import assert from "node:assert/strict";

import { matchesModelCatalogQuery } from "../../src/shared/utils/modelCatalogSearch.ts";

const sonnet = { modelId: "anthropic/claude-sonnet-4-6", modelName: "Claude Sonnet 4.6" };
const haiku = { modelId: "anthropic/claude-haiku-5-5", modelName: "Claude Haiku 5.5" };
const gpt = { modelId: "openai/gpt-6.1-sol", modelName: "GPT 6.1 Sol" };

test("a !term token excludes models that contain the term", () => {
  assert.equal(matchesModelCatalogQuery("claude !haiku", sonnet), true);
  assert.equal(matchesModelCatalogQuery("claude !haiku", haiku), false);
  assert.equal(matchesModelCatalogQuery("claude !haiku", gpt), false);
});

test("a query that is only !term keeps every model without the term", () => {
  assert.equal(matchesModelCatalogQuery("!haiku", sonnet), true);
  assert.equal(matchesModelCatalogQuery("!haiku", haiku), false);
});

test("a /pattern/ query is a case-insensitive regular expression", () => {
  assert.equal(matchesModelCatalogQuery("/gpt-\\d+\\.\\d/", gpt), true);
  assert.equal(matchesModelCatalogQuery("/gpt-\\d+\\.\\d/", sonnet), false);
  assert.equal(matchesModelCatalogQuery("/^anthropic\\/.*(sonnet|haiku)/", haiku), true);
  assert.equal(matchesModelCatalogQuery("/CLAUDE/i", sonnet), true);
});

test("an invalid regular expression falls back to plain text and does not throw", () => {
  assert.equal(matchesModelCatalogQuery("/claude(/", sonnet), false);
  assert.equal(matchesModelCatalogQuery("/(/", { modelId: "a/(/b" }), true);
});

test("queries without an operator keep the old behaviour", () => {
  assert.equal(matchesModelCatalogQuery("claude sonnet", sonnet), true);
  assert.equal(matchesModelCatalogQuery("sonnet claude", sonnet), false);
  // `-pro` stays a plain substring (not a negation): it must still find ids that contain "-pro".
  assert.equal(matchesModelCatalogQuery("-pro", { modelId: "x/a-pro" }), true);
  assert.equal(matchesModelCatalogQuery("-pro", { modelId: "x/a-flash" }), false);
  assert.equal(matchesModelCatalogQuery("!", { modelId: "x/a!b" }), true);
});
