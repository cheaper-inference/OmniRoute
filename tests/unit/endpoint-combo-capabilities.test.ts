import assert from "node:assert/strict";
import test from "node:test";
import {
  projectComboForEndpoint,
  targetSupportsEndpoint,
} from "../../open-sse/services/combo/endpointCapabilities.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";

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
  assert.equal(targetSupportsEndpoint("elevenlabs/music_v1", "music"), true);
  assert.equal(targetSupportsEndpoint("elevenlabs/music_v1", "chat"), false);
  assert.equal(targetSupportsEndpoint("elevenlabs/not-a-music-model", "music"), false);
  assert.equal(targetSupportsEndpoint("vertex/gemini-2.5-flash", "chat"), true);
  assert.equal(targetSupportsEndpoint("vertex/gemini-2.5-pro", "chat"), true);
  assert.equal(targetSupportsEndpoint("codex/gpt-5.6-sol", "chat"), true);
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

test("a capability route overrides the legacy chat plan without mutating the combo", () => {
  const combo = {
    name: "multi-surface",
    strategy: "priority",
    models: ["openai/gpt-4o"],
    config: { maxRetries: 1 },
    routes: {
      music: {
        strategy: "round-robin",
        models: ["elevenlabs/music_v1", "suno/chirp-v4"],
        config: { maxRetries: 0 },
      },
    },
  };
  const snapshot = JSON.stringify(combo);

  const chat = projectComboForEndpoint(combo, [combo], "chat");
  const music = projectComboForEndpoint(combo, [combo], "music");

  assert.equal(chat.combo.strategy, "priority");
  assert.deepEqual(
    chat.combo.models.map((step) => step.model),
    ["openai/gpt-4o"]
  );
  assert.equal(music.combo.strategy, "round-robin");
  assert.deepEqual(
    music.combo.models.map((step) => step.model),
    ["elevenlabs/music_v1", "suno/chirp-v4"]
  );
  assert.deepEqual(music.combo.config, { maxRetries: 0 });
  assert.equal(JSON.stringify(combo), snapshot);
});

test("the top-level Chat plan stays authoritative over a stale routes.chat mirror", () => {
  const combo = {
    name: "chat-sync",
    strategy: "priority",
    models: ["openai/gpt-4o-mini"],
    config: { maxRetries: 1 },
    routes: {
      chat: {
        strategy: "round-robin",
        models: ["openai/removed-model"],
        config: { maxRetries: 9 },
      },
    },
  };

  const projected = projectComboForEndpoint(combo, [combo], "chat");
  assert.equal(projected.combo.strategy, "priority");
  assert.deepEqual(
    projected.combo.models.map((step) => step.model),
    ["openai/gpt-4o-mini"]
  );
  assert.deepEqual(projected.combo.config, { maxRetries: 1 });
});

test("nested combos select their own route for the requested capability", () => {
  const child = {
    name: "child",
    models: ["openai/gpt-4o"],
    routes: {
      search: {
        strategy: "priority",
        models: ["tavily-search/web"],
      },
    },
  };
  const root = {
    name: "root",
    models: ["openai/gpt-4o-mini"],
    routes: {
      search: {
        strategy: "fill-first",
        models: [{ kind: "combo-ref", comboName: "child" }],
      },
    },
  };

  const projected = projectComboForEndpoint(root, [root, child], "search");
  assert.equal(projected.combo.strategy, "fill-first");
  assert.equal(projected.combo.models[0].kind, "combo-ref");
  const projectedChild = projected.allCombos.find((combo) => combo.name === "child")!;
  assert.deepEqual(
    projectedChild.models.map((step) => step.model),
    ["tavily-search/web"]
  );
});

test("no chat-capable registry model is treated as non-chat", () => {
  const blocked: string[] = [];
  for (const [providerId, entry] of Object.entries(REGISTRY)) {
    const alias = entry.alias || providerId;
    for (const model of entry.models || []) {
      const endpoints = (model as { supportedEndpoints?: string[] }).supportedEndpoints;
      if (endpoints?.length && !endpoints.includes("chat")) continue;
      if (!targetSupportsEndpoint(`${alias}/${model.id}`, "chat", providerId)) {
        blocked.push(`${alias}/${model.id}`);
      }
    }
  }
  assert.deepEqual(blocked, []);
});

test("projection walks only the requested combo's DAG, not every saved combo", () => {
  const child = { name: "child", models: ["openai/gpt-4o", "tavily-search/web"] };
  const root = { name: "root", models: ["child", "openai/gpt-4o-mini"] };
  const unrelated = { name: "unrelated", models: ["openai/gpt-4o", "serper-search/web"] };
  const projected = projectComboForEndpoint(root, [root, child, unrelated], "chat");

  assert.deepEqual(
    projected.allCombos
      .find((c) => c.name === "child")!
      .models.map((m) => (m as { model?: string }).model),
    ["openai/gpt-4o"],
    "a referenced child is still projected"
  );
  assert.equal(
    projected.allCombos.find((c) => c.name === "unrelated")!.models,
    unrelated.models,
    "an unreachable combo keeps its stored steps untouched"
  );
});
