import assert from "node:assert/strict";
import test from "node:test";
import {
  projectComboForEndpoint,
  targetSupportsEndpoint,
} from "../../src/lib/combos/endpointCapabilities.ts";

test("a mixed combo exposes only candidates for the requested endpoint", () => {
  const combo = {
    name: "mixed-free",
    strategy: "priority",
    models: ["openai/gpt-4o", "serper-search/web", "tavily-search/web", "jina-reader/fetch"],
  };
  const snapshot = JSON.stringify(combo);
  const chat = projectComboForEndpoint(combo, [combo], "chat");
  const search = projectComboForEndpoint(combo, [combo], "search");
  const fetch = projectComboForEndpoint(combo, [combo], "web-fetch");
  assert.deepEqual(
    chat.combo.models.map((m) => m.kind === "model" && m.providerId),
    ["openai"]
  );
  assert.deepEqual(
    search.combo.models.map((m) => m.kind === "model" && m.providerId),
    ["serper-search", "tavily-search"]
  );
  assert.deepEqual(
    fetch.combo.models.map((m) => m.kind === "model" && m.providerId),
    ["tavily-search", "jina-reader"]
  );
  assert.equal(
    JSON.stringify(combo),
    snapshot,
    "filtering one request must not mutate stored combos"
  );
});

test("capability matching uses registries rather than a model name containing search", () => {
  assert.equal(targetSupportsEndpoint("openai/search-looking-model", "search"), false);
  assert.equal(targetSupportsEndpoint("tavily-search/anything", "search"), true);
  assert.equal(targetSupportsEndpoint("serper-search/web", "web-fetch"), false);
  assert.equal(targetSupportsEndpoint("jina-reader/fetch", "chat"), false);
  assert.equal(targetSupportsEndpoint("unknown-compatible/custom", "chat"), true);
  assert.equal(targetSupportsEndpoint("toString/web", "search"), false);
});

test("nested combo projection preserves step identity, account pins and priority", () => {
  const child = {
    name: "child",
    models: [
      { id: "llm", providerId: "openai", model: "gpt-4o" },
      { id: "search-a", providerId: "tavily-search", model: "web", connectionId: "account-a" },
      { id: "search-b", providerId: "tavily-search", model: "web", connectionId: "account-b" },
    ],
  };
  const root = {
    name: "root",
    models: [
      { id: "nested", kind: "combo-ref", comboName: "child" },
      { id: "last", providerId: "serper-search", model: "web", weight: 2 },
    ],
  };
  const projected = projectComboForEndpoint(root, [root, child], "search");
  assert.equal(projected.combo.models[0].id, "nested");
  const nested = projected.allCombos.find((c) => c.name === "child")!;
  assert.deepEqual(
    nested.models.map((m) => m.id),
    ["search-a", "search-b"]
  );
  assert.deepEqual(
    nested.models.map((m) => m.kind === "model" && m.connectionId),
    ["account-a", "account-b"]
  );
  assert.equal(root.models.length, 2);
});

test("empty nested capability branches are pruned without hiding invalid cycles", () => {
  const chat = { name: "chat", models: ["openai/gpt-4o"] };
  const root = { name: "root", models: ["chat"] };
  assert.deepEqual(projectComboForEndpoint(root, [root, chat], "search").combo.models, []);
  const cycle = { name: "cycle", models: ["cycle"] };
  assert.equal(projectComboForEndpoint(cycle, [cycle], "search").combo.models.length, 1);
});
