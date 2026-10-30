import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { applyEnrichment } from "../src/shared/enrich.js";
import { buildModelDisplayName } from "../src/shared/naming.js";
import { collectCatalog } from "../src/catalog.js";
import { defaultOmniRouteModelsFetcher } from "../src/shared/models-map.js";
import type { OmniRouteRawModelEntry } from "../src/shared/models-map.js";
import type { LegacyModel as ModelV2 } from "../src/legacy-model.js";
import { parsePluginOptions } from "../src/options.js";

function model(id: string, name = id): ModelV2 {
  return {
    id,
    name,
    cost: { input: 0, output: 0, cache: { read: 0, write: 0 } },
  } as unknown as ModelV2;
}

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
  visibleModels: ["*"],
  enrichment: false as const,
};

const servers: http.Server[] = [];
afterEach(async () => {
  while (servers.length > 0) {
    const server = servers.pop();
    if (server) await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

async function entriesThroughReader(
  data: Array<Record<string, unknown>>
): Promise<OmniRouteRawModelEntry[]> {
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ object: "list", data }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  servers.push(server);
  const port = (server.address() as AddressInfo).port;
  return defaultOmniRouteModelsFetcher(`http://127.0.0.1:${port}`, "k", 2000);
}

describe("compact model names", () => {
  it("renders a free model with a short suffix marker and its budget", () => {
    const m = applyEnrichment(model("opencode-go/beam-free", "opencode-go/beam-free"), {
      name: "beam",
      providerAlias: "opencode-go",
      providerDisplayName: "Opencode-go",
      freeType: "recurring-monthly" as const,
      monthlyTokens: 1_000_000,
    });
    assert.equal(m.name, "🆓 Opencode-go - beam · 1M tokens/month");
  });

  it("renders a free model without a budget as a bare name plus marker", () => {
    const name = buildModelDisplayName({
      rawId: "opencode-go/beam-free",
      enrichmentName: "beam",
      isFree: true,
    });
    assert.equal(name, "🆓 opencode-go - beam");
  });

  it("keeps colliding entries distinct with a route suffix", async () => {
    const raw = await entriesThroughReader([
      { id: "opencode-go/claude-haiku-5-5", owned_by: "opencode-go", context_length: 1000 },
      {
        id: "no-think/opencode-go/claude-haiku-5-5",
        owned_by: "no-think",
        context_length: 1000,
      },
    ]);
    const enrichment = new Map([
      ["opencode-go/claude-haiku-5-5", { name: "Claude Haiku 5.5" }],
      ["no-think/opencode-go/claude-haiku-5-5", { name: "Claude Haiku 5.5" }],
    ]);
    const collected = await collectCatalog(
      { ...baseOpts, enrichment },
      { fetcher: async () => raw, combosFetcher: async () => [] }
    );
    assert.equal(
      collected.entries.get("omniroute/opencode-go/claude-haiku-5-5")?.name,
      "opencode-go - Claude Haiku 5.5"
    );
    assert.equal(
      collected.entries.get("omniroute/no-think/opencode-go/claude-haiku-5-5")?.name,
      "no-think - Claude Haiku 5.5"
    );
  });

  it("names a routing strategy by its slug, not the resolved model", async () => {
    const raw = await entriesThroughReader([
      { id: "auto/fast", owned_by: "auto", context_length: 1000 },
    ]);
    const enrichment = new Map([
      [
        "fast",
        {
          name: "Grok 4.20",
          providerAlias: "pol",
          providerCanonical: "pol",
          providerDisplayName: "Pollinations",
        },
      ],
    ]);
    const collected = await collectCatalog(
      { ...baseOpts, enrichment },
      { fetcher: async () => raw, combosFetcher: async () => [] }
    );
    assert.equal(collected.entries.get("omniroute/auto/fast")?.name, "auto/fast");
  });

  it("normalises a native free suffix to the short marker", () => {
    const m = applyEnrichment(model("nvidia/nemotron-3-ultra", "nvidia/nemotron-3-ultra"), {
      name: "Nemotron 3 Ultra Free",
      providerAlias: "nvidia",
      providerDisplayName: "Nvidia",
    });
    assert.equal(m.name, "🆓 Nvidia - Nemotron 3 Ultra");
  });

  it("uses a suffix marker for free entries and none otherwise", () => {
    const free = buildModelDisplayName({
      rawId: "opencode-go/beam-free",
      enrichmentName: "beam",
      isFree: true,
      freeType: "recurring-monthly" as const,
      monthlyTokens: 1_000_000,
    });
    assert.ok(free.startsWith("🆓"));
    assert.ok(!free.includes("[Free]"));
    const plain = buildModelDisplayName({
      rawId: "opencode-go/beam",
      enrichmentName: "beam",
    });
    assert.ok(!plain.includes("[Free]"));
    assert.ok(!plain.includes("[F]"));
  });

  it("shows the bare model name by default and the routed provider only on opt-in", () => {
    const bare = applyEnrichment(model("cc/sonnet", "cc/sonnet"), {
      name: "Claude Sonnet 4.6",
      providerAlias: "cc",
      providerDisplayName: "Claude",
    });
    assert.equal(bare.name, "Claude - Claude Sonnet 4.6");
    const tagged = applyEnrichment(model("cc/sonnet", "cc/sonnet"), {
      name: "Claude Sonnet 4.6",
      providerAlias: "cc",
      providerDisplayName: "Claude",
    });
    assert.equal(tagged.name, "Claude - Claude Sonnet 4.6");
  });

  it("keeps the useful name at the head of the published label", () => {
    const m = applyEnrichment(model("opencode-go/claude-haiku-5-5", "x"), {
      name: "Claude Haiku 5.5",
      providerAlias: "opencode-go",
      providerDisplayName: "Opencode-go",
    });
    assert.ok(m.name.startsWith("Opencode-go - Claude Haiku 5.5"));
    assert.ok(m.name.slice(0, 120).startsWith("Opencode-go - Claude Haiku 5.5"));
  });

  it("keeps an already marked name unchanged", () => {
    const name = buildModelDisplayName({
      rawId: "opencode-go/beam-free",
      enrichmentName: "beam [F]",
      isFree: true,
    });
    assert.equal(name, "🆓 opencode-go - beam");
  });

  it("keeps a combo name and routes the same-named model around it", async () => {
    const raw = await entriesThroughReader([
      { id: "opencode-go/dupe-combo", owned_by: "opencode-go", context_length: 1000 },
    ]);
    const enrichment = new Map([["opencode-go/dupe-combo", { name: "Dupe Combo" }]]);
    const collected = await collectCatalog(
      { ...baseOpts, enrichment },
      {
        fetcher: async () => raw,
        combosFetcher: async () => [
          {
            id: "combo-dupe",
            name: "Dupe Combo",
            models: [{ kind: "model", model: "opencode-go/dupe-combo" }],
          },
        ],
      }
    );
    const combo = collected.entries.get("omniroute/Dupe Combo");
    const entry = collected.entries.get("omniroute/opencode-go/dupe-combo");
    assert.ok(combo);
    assert.ok(entry);
    assert.equal(combo?.name, "combo - Dupe Combo");
    assert.notEqual(entry?.name, combo?.name);
  });

  it("drops an editor that only differs in case from the provider", () => {
    const name = buildModelDisplayName({
      rawId: "nvidia/nvidia/nemotron-3.5-super-vl-120b-a12b",
      enrichmentName: "Nvidia: Nemotron 3.5 Super VL",
    });
    assert.equal(name, "nvidia - Nemotron 3.5 Super VL");
  });

  it("drops the editor parenthesis when providerTag is false", () => {
    const name = buildModelDisplayName({
      rawId: "nvidia/nvidia/nemotron-3.5-super-vl-120b-a12b",
      enrichmentName: "Nvidia: Nemotron 3.5 Super VL",
      providerTag: false,
    });
    assert.equal(name, "nvidia - Nemotron 3.5 Super VL");
  });
});

describe("names are never cut by an editor guess", () => {
  for (const [enrichmentName, providerDisplayName, expected] of [
    ["Deepseek chat", "Openrouter", "Openrouter - Deepseek chat"],
    ["Mistral large", "Openrouter", "Openrouter - Mistral large"],
    ["Gemini flash", "Google", "Google - Gemini flash"],
    ["Qwen3 coder", "Qwen", "Qwen - Qwen3 coder"],
  ] as const) {
    it(`keeps "${enrichmentName}" whole`, () => {
      const m = applyEnrichment(model("x/y", "x/y"), { name: enrichmentName, providerDisplayName });
      assert.equal(m.name, expected);
    });
  }

  it("still moves the explicit `Editor: Model` form to the parenthesis", () => {
    const m = applyEnrichment(model("openrouter/moonshotai/kimi", "x"), {
      name: "MoonshotAI: Kimi 3.1 Pro",
      providerDisplayName: "Openrouter",
    });
    assert.equal(m.name, "Openrouter - Kimi 3.1 Pro (MoonshotAI)");
  });

  it("does not read a tag colon inside a raw id as an editor", () => {
    const name = buildModelDisplayName({ rawId: "qwen3:8b", providerDisplayName: "omniroute" });
    assert.equal(name, "omniroute - qwen3:8b");
  });
});

describe("free budget stays in the name", () => {
  it("appends the budget after the model and the editor", () => {
    const m = applyEnrichment(model("openrouter/moonshotai/kimi", "x"), {
      name: "MoonshotAI: Kimi 3.1 Pro",
      providerDisplayName: "Openrouter",
      freeType: "recurring-daily" as const,
      monthlyTokens: 25_000_000,
    });
    assert.equal(m.name, "🆓 Openrouter - Kimi 3.1 Pro (MoonshotAI) · 25M tokens/day");
  });

  it("never puts a budget on a combo", () => {
    const m = applyEnrichment(
      model("combo-fast", "Combo Fast"),
      { name: "Combo Fast", freeType: "recurring-monthly" as const, monthlyTokens: 1_000_000 },
      { isCombo: true }
    );
    assert.equal(m.name, "combo - Combo Fast");
  });
});

describe("a slash-less id never repeats itself as its provider", () => {
  it("renders a bare id with no provider label as the bare id", () => {
    assert.equal(buildModelDisplayName({ rawId: "gpt-4o" }), "gpt-4o");
  });

  it("renders an enrichment name for a bare id without a provider prefix", () => {
    const m = applyEnrichment(
      model("claude-sonnet-4-6", "claude-sonnet-4-6"),
      { name: "Claude Sonnet 4.6" },
      { rawModelId: "claude-sonnet-4-6" }
    );
    assert.equal(m.name, "Claude Sonnet 4.6");
  });
});
