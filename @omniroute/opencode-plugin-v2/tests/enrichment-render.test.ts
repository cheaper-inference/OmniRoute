import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { applyEnrichment } from "../src/shared/enrich.js";
import type { LegacyModel as ModelV2 } from "../src/legacy-model.js";

function model(id: string, name = id): ModelV2 {
  return {
    id,
    name,
    cost: { input: 0, output: 0, cache: { read: 0, write: 0 } },
  } as unknown as ModelV2;
}

describe("the enrichment overlay reaches the picker", () => {
  it("renders the upstream provider a model routes to", () => {
    const m = applyEnrichment(model("cc/sonnet"), {
      name: "Claude Sonnet 4.6",
      providerDisplayName: "Claude",
      providerAlias: "cc",
    });
    assert.equal(m.name, "Claude - Claude Sonnet 4.6");
    assert.match(m.name, /Claude/);
  });

  it("marks a free model and states the budget the user actually gets", () => {
    const m = applyEnrichment(model("pol/grok"), {
      name: "Grok 4 Fast",
      providerDisplayName: "Pollinations",
      freeType: "recurring-monthly" as const,
      monthlyTokens: 1_000_000,
    });
    assert.match(m.name, /^🆓 /);
    assert.match(m.name, /Grok 4 Fast/);
    assert.match(m.name, /Pollinations/);
    assert.match(
      m.name,
      /tokens\/month/,
      "the budget the gateway reports is stated, not just the fact it is free"
    );
    assert.equal(m.name, "🆓 Pollinations - Grok 4 Fast · 1M tokens/month");
  });

  it("never tags a combo: it routes across providers, not to one", () => {
    const m = applyEnrichment(
      model("combo-fast", "Combo Fast"),
      { name: "Combo Fast", providerDisplayName: "Claude" },
      { isCombo: true }
    );
    assert.equal(m.name, "combo - Combo Fast");
  });

  it("keeps a combo's name when its overlay entry carries no name (CodeRabbit R2)", () => {
    const m = applyEnrichment(
      model("Duo", "combo - Duo"),
      { pricing: { input: 1, output: 2 }, freeType: "recurring-monthly" as const },
      { isCombo: true }
    );
    assert.equal(m.name, "combo - Duo");
    assert.equal(m.cost.input, 1);
  });

  it("still overlays pricing", () => {
    const m = applyEnrichment(model("x"), { pricing: { input: 3, output: 15 } });
    assert.equal(m.cost.input, 3);
    assert.equal(m.cost.output, 15);
  });
});

describe("free budget under alias and without cap", () => {
  it("renders the budget of an alias-served model", () => {
    const m = applyEnrichment(model("cf/@cf/meta/llama-3.3-70b-instruct-fp8-fast"), {
      name: "Llama 3.3 70B",
      providerDisplayName: "Cloudflare",
      providerAlias: "cf",
      freeType: "recurring-monthly" as const,
      monthlyTokens: 1_000_000,
    });
    assert.equal(m.name, "🆓 Cloudflare - Llama 3.3 70B · 1M tokens/month");
  });

  it("renders the uncapped label with no counters", () => {
    const m = applyEnrichment(model("cf/open-m"), {
      name: "Open Model",
      providerDisplayName: "Cloudflare",
      providerAlias: "cf",
      freeType: "recurring-uncapped" as const,
    });
    assert.equal(m.name, "🆓 Cloudflare - Open Model · (uncapped)");
  });

  it("renders nothing extra when the budget is unknown", () => {
    const m = applyEnrichment(model("cf/open-m"), { name: "Open Model" });
    assert.ok(!m.name.includes("·"));
  });
});

describe("provider-prefix omission without a full enrichment entry", () => {
  it("drops the route prefix when the option is on and enrichment is absent", () => {
    const m = applyEnrichment(model("cc/sonnet", "cc - sonnet"), undefined, {
      rawModelId: "cc/sonnet",
      omitProvider: true,
    });
    assert.equal(m.name, "sonnet");
  });

  it("drops the route prefix from a pricing-only label when the option is on", () => {
    const m = applyEnrichment(
      model("cc/sonnet", "cc/sonnet"),
      {
        pricing: { input: 1, output: 2 },
      },
      { rawModelId: "cc/sonnet", omitProvider: true }
    );
    assert.equal(m.name, "sonnet");
    assert.equal(m.cost.input, 1);
  });

  it("keeps the mapper label when enrichment is absent and the option is off", () => {
    const m = applyEnrichment(model("cc/sonnet", "cc - sonnet"), undefined, {
      rawModelId: "cc/sonnet",
    });
    assert.equal(m.name, "cc - sonnet");
  });
});
