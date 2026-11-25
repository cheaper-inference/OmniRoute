import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { collectCatalog } from "../src/catalog.js";
import { isFlatVariantOf } from "../src/catalog-freshness.js";
import type { OmniRouteRawModelEntry } from "../src/shared/models-map.js";

const NOW = Date.parse("2026-11-17T12:00:00.000Z");
const dated = (d: number) => new Date(NOW - d * 86400000).toISOString();

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
  enrichment: false as const,
};

async function run(raw: OmniRouteRawModelEntry[]) {
  const realNow = Date.now;
  Date.now = () => NOW;
  try {
    return await collectCatalog(baseOpts, {
      fetcher: async () => raw,
      combosFetcher: async () => [],
      usageFetcher: async () => [],
    });
  } finally {
    Date.now = realNow;
  }
}

const row = (id: string, owner: string): OmniRouteRawModelEntry =>
  ({
    id,
    owned_by: owner,
    context_length: 1048576,
    release_date: dated(5),
  }) as OmniRouteRawModelEntry;

describe("#20401 product ids ending in an effort word are hidden", () => {
  it("publishes opencode-go/qwen3.8-max when no base qwen3.8 exists", async () => {
    const c = await run([row("opencode-go/qwen3.8-max", "opencode-go")]);
    assert.ok(c.entries.has("omniroute/opencode-go/qwen3.8-max"), "qwen3.8-max must be published");
  });

  it("publishes antigravity gemini-3.8-flash-low/medium/high when no base exists", async () => {
    const c = await run(
      ["low", "medium", "high"].map((t) => row(`antigravity/gemini-3.8-flash-${t}`, "antigravity"))
    );
    for (const t of ["low", "medium", "high"]) {
      assert.ok(
        c.entries.has(`omniroute/antigravity/gemini-3.8-flash-${t}`),
        `-${t} must be published`
      );
    }
  });

  it("control: a real variant still hides when its base is present", async () => {
    const c = await run([row("o/m", "o"), row("o/m-high", "o")]);
    assert.ok(c.entries.has("omniroute/o/m"));
    assert.ok(!c.entries.has("omniroute/o/m-high"));
  });

  it("isFlatVariantOf: base lookup is case-insensitive and legacy without a set", () => {
    assert.equal(isFlatVariantOf("o/M-high", new Set(["o/m"])), true);
    assert.equal(isFlatVariantOf("o/m-high", new Set()), false);
    assert.equal(isFlatVariantOf("o/m-high"), true);
    assert.equal(isFlatVariantOf("o/m"), false);
  });
});
