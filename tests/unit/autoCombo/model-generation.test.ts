/**
 * Pure generation/tier parsing + slot-preserving promotion.
 *
 * Covers the `auto-newest-generation-routing` spec requirement "Tier-scoped
 * generation comparison and unknown-generation preservation":
 *   - numeric tuples (`6.10 > 6.2`) and GA-over-preview ordering,
 *   - GPT tier isolation (`gpt-sol` never compares against `gpt-astra`/`gpt-terra`),
 *   - `claude-fable` isolation from opus/sonnet/haiku,
 *   - unrecognized models keeping their existing score order,
 *   - parameter counts (`70b`, `27b`) not being read as generation numbers.
 *
 * Nothing here touches the DB, the registry or the clock: `modelGeneration.ts` is
 * deliberately dependency-free so these assertions pin the parser itself.
 */
import { describe, expect, it } from "vitest";

import {
  DEFAULT_NEWEST_PRICE_MULTIPLIER,
  GEMINI_TIER_KEYWORDS,
  GPT_TIER_KEYWORDS,
  compareGenerationVersions,
  parseModelGeneration,
  promoteNewestGenerationsInOrder,
  resolveNewestPriceMultiplier,
  type NewestGenerationCandidate,
} from "@omniroute/open-sse/services/autoCombo/modelGeneration.ts";

interface Item {
  id: string;
  bucket: string;
  rawCost: number | null;
}

function describeItem(item: Item): NewestGenerationCandidate | null {
  const generation = parseModelGeneration(item.id);
  if (!generation) return null;
  return {
    bucket: item.bucket,
    tierFamilyKey: generation.tierFamilyKey,
    version: generation.version,
    stabilityRank: generation.stabilityRank,
    rawCost: item.rawCost,
  };
}

/** Promotion with every candidate in the same bucket and the same price. */
function promote(
  ids: string[],
  options: { bucket?: string; rawCost?: number | null; maxPriceMultiplier?: number | null } = {}
) {
  const items: Item[] = ids.map((id) => ({
    id,
    bucket: options.bucket ?? "default|healthy",
    rawCost: options.rawCost ?? 0,
  }));
  return promoteNewestGenerationsInOrder(items, describeItem, {
    maxPriceMultiplier: options.maxPriceMultiplier,
  }).map((item) => item.id);
}

describe("parseModelGeneration", () => {
  it("parses numeric version tuples, stability and tier-scoped family keys", () => {
    expect(parseModelGeneration("gpt-6.2-sol")).toMatchObject({
      tierFamilyKey: "gpt-sol",
      version: [6, 2],
      stability: "ga",
    });
    expect(parseModelGeneration("openai/gpt-6.10-sol-preview")).toMatchObject({
      tierFamilyKey: "gpt-sol",
      version: [6, 10],
      stability: "preview",
    });
    expect(parseModelGeneration("claude-haiku-4-5-20251001")).toMatchObject({
      tierFamilyKey: "claude-haiku",
      version: [4, 5],
      stability: "snapshot",
    });
  });

  it("resolves compound GPT capability tiers to the most specific key", () => {
    expect(parseModelGeneration("gpt-5.6-codex-mini")?.tierFamilyKey).toBe("gpt-codex-mini");
    expect(parseModelGeneration("gpt-5.6-codex")?.tierFamilyKey).toBe("gpt-codex");
    expect(parseModelGeneration("gpt-6.2-sol")?.tierFamilyKey).toBe("gpt-sol");
    expect(parseModelGeneration("gpt-6-astra")?.tierFamilyKey).toBe("gpt-astra");
    expect(parseModelGeneration("gpt-6-terra")?.tierFamilyKey).toBe("gpt-terra");
    expect(parseModelGeneration("gpt-6-luna")?.tierFamilyKey).toBe("gpt-luna");
    expect(parseModelGeneration("gpt-4o")?.tierFamilyKey).toBe("gpt");
  });

  it("keeps claude-fable separate from opus, sonnet and haiku", () => {
    expect(parseModelGeneration("claude-fable-5-2")?.tierFamilyKey).toBe("claude-fable");
    expect(parseModelGeneration("claude-opus-5-5")?.tierFamilyKey).toBe("claude-opus");
    expect(parseModelGeneration("claude-sonnet-5")?.tierFamilyKey).toBe("claude-sonnet");
    expect(parseModelGeneration("claude-haiku-4-5")?.tierFamilyKey).toBe("claude-haiku");
  });

  it("does not read a parameter/context/expert count as a generation number", () => {
    expect(parseModelGeneration("gemma-3-27b")?.version).toEqual([3]);
    expect(parseModelGeneration("llama-3.3-70b")?.version).toEqual([3, 3]);
    expect(parseModelGeneration("llama-4-maverick-17b-128e")?.version).toEqual([4]);
    expect(parseModelGeneration("llama-4-scout-17b-16e-1m")?.version).toEqual([4]);
  });

  it("isolates deepseek-r1 from deepseek-v3 and ignores Bedrock :0 / -v1 revisions", () => {
    expect(parseModelGeneration("deepseek-r1")?.tierFamilyKey).toBe("deepseek-r");
    expect(parseModelGeneration("deepseek-v3")?.tierFamilyKey).toBe("deepseek");
    expect(parseModelGeneration("us.anthropic.claude-sonnet-4-v1:0")).toMatchObject({
      tierFamilyKey: "claude-sonnet",
      version: [4],
    });
  });

  it("orders specific tier keywords ahead of prefixes and isolates Gemini flash-lite from flash", () => {
    const gptIdx = (k: string) => GPT_TIER_KEYWORDS.findIndex((entry) => entry.keyword === k);
    expect(gptIdx("codex-mini")).toBeLessThan(gptIdx("codex"));
    const gemIdx = (k: string) => GEMINI_TIER_KEYWORDS.findIndex((entry) => entry.keyword === k);
    expect(gemIdx("flash-lite")).toBeLessThan(gemIdx("flash"));
    expect(parseModelGeneration("gemini-2.5-flash-lite")?.tierFamilyKey).toBe("gemini-flash-lite");
    expect(parseModelGeneration("gemini-2.5-flash")?.tierFamilyKey).toBe("gemini-flash");
  });

  it("treats legacy snapshot/revision suffixes (0613, 1106-preview, 20241022, 002) as snapshot", () => {
    expect(parseModelGeneration("gpt-4-0613")).toMatchObject({
      tierFamilyKey: "gpt",
      version: [4],
      stability: "snapshot",
    });
    expect(parseModelGeneration("gpt-4-1106-preview")).toMatchObject({
      tierFamilyKey: "gpt",
      version: [4],
      stability: "snapshot",
    });
    expect(parseModelGeneration("claude-3-5-sonnet-20241022")).toMatchObject({
      tierFamilyKey: "claude-sonnet",
      version: [3, 5],
      stability: "snapshot",
    });
    expect(parseModelGeneration("gemini-1.5-pro-002")).toMatchObject({
      tierFamilyKey: "gemini-pro",
      version: [1, 5],
      stability: "snapshot",
    });
  });

  it("treats hyphenated YYYY-MM-DD and 4-digit MMDD snapshot tags as snapshot, not version", () => {
    expect(parseModelGeneration("gpt-4o-2024-08-06")).toMatchObject({
      tierFamilyKey: "gpt",
      version: [4],
      stability: "snapshot",
    });
    expect(parseModelGeneration("deepseek-v4-flash-1017")).toMatchObject({
      tierFamilyKey: "deepseek",
      version: [4],
      stability: "snapshot",
    });
    expect(
      compareGenerationVersions(
        parseModelGeneration("deepseek-v4.1-flash-1017")!,
        parseModelGeneration("deepseek-v4-flash-1017")!
      )
    ).toBeGreaterThan(0);
    expect(
      compareGenerationVersions(
        parseModelGeneration("gpt-4.5-preview")!,
        parseModelGeneration("gpt-4o-2024-08-06")!
      )
    ).toBeGreaterThan(0);
  });

  it("returns null for unrecognized models so they keep score order", () => {
    for (const id of ["aion-3.0", "unrelated-model", "", "gpt-latest"]) {
      expect(parseModelGeneration(id)).toBeNull();
    }
    expect(parseModelGeneration(null)).toBeNull();
  });
});

describe("compareGenerationVersions", () => {
  const parse = (id: string) => parseModelGeneration(id)!;

  it("compares element-wise, so 6.10 is newer than 6.2", () => {
    expect(compareGenerationVersions(parse("gpt-6.10-sol"), parse("gpt-6.2-sol"))).toBeGreaterThan(
      0
    );
    expect(compareGenerationVersions(parse("gpt-6.2-sol"), parse("gpt-6.10-sol"))).toBeLessThan(0);
    expect(compareGenerationVersions(parse("gpt-6.2-sol"), parse("gpt-6.2-sol"))).toBe(0);
  });

  it("reads a missing component as 0, so 6.2 is newer than 6", () => {
    expect(compareGenerationVersions(parse("gpt-6.2-sol"), parse("gpt-6-sol"))).toBeGreaterThan(0);
  });

  it("ranks GA ahead of a pre-release at the same base version", () => {
    expect(
      compareGenerationVersions(parse("gpt-6.10-sol"), parse("gpt-6.10-sol-preview"))
    ).toBeGreaterThan(0);
    expect(
      compareGenerationVersions(parse("gpt-6.10-sol-beta"), parse("gpt-6.10-sol-preview"))
    ).toBeGreaterThan(0);
    // A dated snapshot is the weakest channel: GA of the same version still wins.
    expect(
      compareGenerationVersions(parse("claude-haiku-4-5"), parse("claude-haiku-4-5-20251001"))
    ).toBeGreaterThan(0);
  });
});

describe("promoteNewestGenerationsInOrder", () => {
  it("promotes the newest generation ahead of an older one", () => {
    expect(promote(["gpt-6-sol", "gpt-6.2-sol"])).toEqual(["gpt-6.2-sol", "gpt-6-sol"]);
  });

  it("orders 6.10 GA, then 6.10 preview, then 6.2", () => {
    expect(promote(["gpt-6.2-sol", "gpt-6.10-sol-preview", "gpt-6.10-sol"])).toEqual([
      "gpt-6.10-sol",
      "gpt-6.10-sol-preview",
      "gpt-6.2-sol",
    ]);
  });

  it("never cross-ranks distinct capability tiers", () => {
    // Sol only compares against Sol: Terra and Astra keep their own positions.
    expect(promote(["gpt-6.2-sol", "gpt-6-terra"])).toEqual(["gpt-6.2-sol", "gpt-6-terra"]);
    expect(promote(["gpt-6.2-astra", "gpt-6.2-sol"])).toEqual(["gpt-6.2-astra", "gpt-6.2-sol"]);
    expect(promote(["claude-fable-5-2", "claude-opus-5-5"])).toEqual([
      "claude-fable-5-2",
      "claude-opus-5-5",
    ]);
  });

  it("leaves unrecognized candidates exactly where they were", () => {
    expect(promote(["aion-3.0", "gpt-6-sol", "gpt-6.2-sol"])).toEqual([
      "aion-3.0",
      "gpt-6.2-sol",
      "gpt-6-sol",
    ]);
  });

  it("reorders only the promoted family's slots", () => {
    expect(promote(["gpt-6-sol", "glm-5.2", "gpt-6.2-sol", "qwen3-max"])).toEqual([
      "gpt-6.2-sol",
      "glm-5.2",
      "gpt-6-sol",
      "qwen3-max",
    ]);
  });

  it("never promotes across a bucket boundary (rung or health group)", () => {
    const items: Item[] = [
      { id: "gpt-6.1-sol", bucket: "subscription|healthy", rawCost: 0 },
      { id: "gpt-6.2-sol", bucket: "premium|healthy", rawCost: 0 },
    ];
    const promoted = promoteNewestGenerationsInOrder(items, describeItem, {
      maxPriceMultiplier: 10,
    });
    expect(promoted.map((item) => item.id)).toEqual(["gpt-6.1-sol", "gpt-6.2-sol"]);
  });

  it("blocks a promotion that exceeds the price-jump multiplier", () => {
    const items: Item[] = [
      { id: "gpt-6-sol", bucket: "b", rawCost: 2 },
      { id: "gpt-6.2-sol", bucket: "b", rawCost: 5 },
    ];
    expect(
      promoteNewestGenerationsInOrder(items, describeItem, {
        maxPriceMultiplier: 1.5,
      }).map((item) => item.id)
    ).toEqual(["gpt-6-sol", "gpt-6.2-sol"]);

    const withinJump: Item[] = [
      { id: "gpt-6-sol", bucket: "b", rawCost: 2 },
      { id: "gpt-6.2-sol", bucket: "b", rawCost: 3 },
    ];
    expect(
      promoteNewestGenerationsInOrder(withinJump, describeItem, {
        maxPriceMultiplier: 1.5,
      }).map((item) => item.id)
    ).toEqual(["gpt-6.2-sol", "gpt-6-sol"]);
  });

  it("applies the fail-safe 1.0 multiplier when none is configured", () => {
    expect(DEFAULT_NEWEST_PRICE_MULTIPLIER).toBe(1);
    expect(promote(["gpt-6-sol", "gpt-6.2-sol"], { rawCost: 0 })).toEqual([
      "gpt-6.2-sol",
      "gpt-6-sol",
    ]);
    // $0 older → paid newer is not "equal or cheaper", so it is held back.
    const paid: Item[] = [
      { id: "gpt-6-sol", bucket: "b", rawCost: 0 },
      { id: "gpt-6.2-sol", bucket: "b", rawCost: 4 },
    ];
    expect(promoteNewestGenerationsInOrder(paid, describeItem).map((item) => item.id)).toEqual([
      "gpt-6-sol",
      "gpt-6.2-sol",
    ]);
  });

  it("fails closed when either raw cost is unknown", () => {
    const unpricedNewer: Item[] = [
      { id: "gpt-6-sol", bucket: "b", rawCost: 2 },
      { id: "gpt-6.2-sol", bucket: "b", rawCost: null },
    ];
    expect(
      promoteNewestGenerationsInOrder(unpricedNewer, describeItem, {
        maxPriceMultiplier: 100,
      }).map((item) => item.id)
    ).toEqual(["gpt-6-sol", "gpt-6.2-sol"]);

    const unpricedBaseline: Item[] = [
      { id: "gpt-6-sol", bucket: "b", rawCost: null },
      { id: "gpt-6.2-sol", bucket: "b", rawCost: 0 },
    ];
    expect(
      promoteNewestGenerationsInOrder(unpricedBaseline, describeItem, {
        maxPriceMultiplier: 100,
      }).map((item) => item.id)
    ).toEqual(["gpt-6-sol", "gpt-6.2-sol"]);
  });

  it("guards every mid-bucket displacement, not only slot 0", () => {
    // 6.2 ($2) can jump 6 ($2) and 6.1 ($10), but 6.1 ($10) must NOT jump 6 ($2).
    const midExpensive: Item[] = [
      { id: "gpt-6-sol", bucket: "b", rawCost: 2 },
      { id: "gpt-6.1-sol", bucket: "b", rawCost: 10 },
      { id: "gpt-6.2-sol", bucket: "b", rawCost: 2 },
    ];
    expect(
      promoteNewestGenerationsInOrder(midExpensive, describeItem, {
        maxPriceMultiplier: 1,
      }).map((item) => item.id)
    ).toEqual(["gpt-6.2-sol", "gpt-6-sol", "gpt-6.1-sol"]);

    // When 6.2 ($10) fails the guard, 6.1 ($2) still promotes over 6 ($2).
    const newestExpensive: Item[] = [
      { id: "gpt-6-sol", bucket: "b", rawCost: 2 },
      { id: "gpt-6.1-sol", bucket: "b", rawCost: 2 },
      { id: "gpt-6.2-sol", bucket: "b", rawCost: 10 },
    ];
    const blockedEvents: string[] = [];
    expect(
      promoteNewestGenerationsInOrder(newestExpensive, describeItem, {
        maxPriceMultiplier: 1,
        onBlocked: (info) => blockedEvents.push(`${info.blocked.id}:${info.reason}`),
      }).map((item) => item.id)
    ).toEqual(["gpt-6.1-sol", "gpt-6-sol", "gpt-6.2-sol"]);
    expect(blockedEvents).toEqual(["gpt-6.2-sol:multiplier"]);
  });

  it("returns the input order untouched when nothing can be promoted", () => {
    expect(promote(["glm-5.2"])).toEqual(["glm-5.2"]);
    expect(promote(["glm-5.2", "qwen3-max"])).toEqual(["glm-5.2", "qwen3-max"]);
    expect(promote(["claude-sonnet-4", "claude-haiku-4.5"])).toEqual([
      "claude-sonnet-4",
      "claude-haiku-4.5",
    ]);
  });
});

describe("resolveNewestPriceMultiplier", () => {
  it("defaults to the fail-safe 1.0 for unset, non-numeric and non-positive values", () => {
    for (const value of [undefined, null, 0, -3, Number.NaN, "abc"]) {
      expect(resolveNewestPriceMultiplier(value)).toBe(1);
    }
    expect(resolveNewestPriceMultiplier(2.5)).toBe(2.5);
  });

  it("clamps to <= 1.0 on a rung-ordered (:thrifty) pool", () => {
    expect(resolveNewestPriceMultiplier(3, { clampToOne: true })).toBe(1);
    expect(resolveNewestPriceMultiplier(0.5, { clampToOne: true })).toBe(0.5);
  });
});
