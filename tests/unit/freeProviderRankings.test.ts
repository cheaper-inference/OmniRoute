/**
 * Unit tests for src/lib/freeProviderRankings.ts
 *
 * Tests exported pure functions (stripVersionSuffix, findMatchingIntelligence)
 * that don't require DB or module mocking.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

const {
  stripVersionSuffix,
  candidateIntelligenceKeys,
  findMatchingIntelligence,
  mergeProviderModels,
} = await import("../../src/lib/freeProviderRankings.ts");

type IntelEntry = {
  score: number;
  eloRaw: number | null;
  confidence: string | null;
  category: string;
};

function e(
  score: number,
  category = "default",
  eloRaw: number | null = null,
  confidence: string | null = "high"
): IntelEntry {
  return { score, eloRaw, confidence, category };
}

function buildMap(entries: Record<string, IntelEntry[]>): Map<string, IntelEntry[]> {
  const map = new Map<string, IntelEntry[]>();
  for (const [key, vals] of Object.entries(entries)) {
    map.set(key, vals);
  }
  return map;
}

describe("stripVersionSuffix", () => {
  it("strips trailing .N from kimi-k2.6", () => {
    assert.equal(stripVersionSuffix("kimi-k2.6"), "kimi-k2");
  });

  it("strips trailing .N from gpt-5.5", () => {
    assert.equal(stripVersionSuffix("gpt-5.5"), "gpt-5");
  });

  it("strips multi-segment .N.N from model-1.2.3", () => {
    assert.equal(stripVersionSuffix("model-1.2.3"), "model-1");
  });

  it("does not strip dash-separated names like claude-sonnet-4-5", () => {
    assert.equal(stripVersionSuffix("claude-sonnet-4-5"), "claude-sonnet-4-5");
  });

  it("returns unchanged for short names", () => {
    assert.equal(stripVersionSuffix("gpt"), "gpt");
  });
});

describe("findMatchingIntelligence", () => {
  it("exact match returns highest score entry", () => {
    const map = buildMap({ "gpt-5": [e(0.8), e(0.95)] });
    const result = findMatchingIntelligence("gpt-5", map);
    assert.ok(result);
    assert.equal(result.score, 0.95);
  });

  it("exact match is case-insensitive", () => {
    const map = buildMap({ "gpt-5": [e(0.9)] });
    const result = findMatchingIntelligence("GPT-5", map);
    assert.ok(result);
    assert.equal(result.score, 0.9);
  });

  it("version suffix fuzzy: kimi-k2.6 matches kimi-k2", () => {
    const map = buildMap({ "kimi-k2": [e(0.88)] });
    const result = findMatchingIntelligence("kimi-k2.6", map);
    assert.ok(result);
    assert.equal(result.score, 0.88);
  });

  it("version suffix fuzzy: gpt-5.5 matches gpt-5", () => {
    const map = buildMap({ "gpt-5": [e(0.92)] });
    const result = findMatchingIntelligence("gpt-5.5", map);
    assert.ok(result);
    assert.equal(result.score, 0.92);
  });

  it("prefix match: claude-sonnet-4-5 matches claude-sonnet-4", () => {
    const map = buildMap({ "claude-sonnet-4": [e(0.85)] });
    const result = findMatchingIntelligence("claude-sonnet-4-5", map);
    assert.ok(result);
    assert.equal(result.score, 0.85);
  });

  it("returns null when no match", () => {
    const map = buildMap({ "gpt-5": [e(0.9)] });
    assert.equal(findMatchingIntelligence("unknown-model", map), null);
  });

  it("returns null for empty map", () => {
    assert.equal(findMatchingIntelligence("gpt-5", new Map()), null);
  });

  it("prefers exact match over prefix match", () => {
    const map = buildMap({
      "claude-sonnet-4-5": [e(0.95)],
      "claude-sonnet-4": [e(0.7)],
    });
    const result = findMatchingIntelligence("claude-sonnet-4-5", map);
    assert.ok(result);
    assert.equal(result.score, 0.95);
  });

  it("version match wins over prefix match", () => {
    const map = buildMap({
      "kimi-k2": [e(0.9)],
      kimi: [e(0.5)],
    });
    const result = findMatchingIntelligence("kimi-k2.6", map);
    assert.ok(result);
    assert.equal(result.score, 0.9);
  });

  it("preserves category, eloRaw, confidence from matched entry", () => {
    const map = buildMap({ "gpt-5": [e(0.9, "coding", 1400, "high")] });
    const result = findMatchingIntelligence("gpt-5", map);
    assert.ok(result);
    assert.equal(result.category, "coding");
    assert.equal(result.eloRaw, 1400);
    assert.equal(result.confidence, "high");
  });

  it("prefix match picks highest-scoring candidate", () => {
    const map = buildMap({
      gpt: [e(0.6)],
      "gpt-4": [e(0.8)],
    });
    const result = findMatchingIntelligence("gpt-4.1", map);
    assert.ok(result);
    assert.equal(result.score, 0.8);
  });

  it("matches model with author/vendor prefix (e.g. google/gemma-4-31b-it)", () => {
    const map = buildMap({
      "gemma-4-31b-it": [e(0.52)],
    });
    const result = findMatchingIntelligence("google/gemma-4-31b-it", map);
    assert.ok(result);
    assert.equal(result.score, 0.52);
  });

  it("matches model with :free suffix (e.g. minimax/minimax-m3.1-flash:free)", () => {
    const map = buildMap({
      "minimax-m3": [e(0.67)],
    });
    const result = findMatchingIntelligence("minimax/minimax-m3.1-flash:free", map);
    assert.ok(result);
    assert.equal(result.score, 0.67);
  });

  it("matches provider prefix like gemini/gemini-3.8-flash", () => {
    const map = buildMap({
      "gemini-3.8-flash": [e(0.8)],
    });
    const result = findMatchingIntelligence("gemini/gemini-3.8-flash", map);
    assert.ok(result);
    assert.equal(result.score, 0.8);
  });

  it("exact -preview matches exact benchmark when present", () => {
    const map = buildMap({
      "gemini-3.1-pro-preview": [e(0.91)],
      "gemini-3.1-pro": [e(0.85)],
    });
    const result = findMatchingIntelligence("gemini-3.1-pro-preview", map);
    assert.ok(result);
    assert.equal(result.score, 0.91);
  });

  it("provider -preview falls back to base model when benchmark lacks -preview", () => {
    const map = buildMap({
      "gemini-3.1-pro": [e(0.85)],
    });
    const result = findMatchingIntelligence("gemini-3.1-pro-preview", map);
    assert.ok(result);
    assert.equal(result.score, 0.85);
  });

  it("provider base model matches benchmark with -preview", () => {
    const map = buildMap({
      "gemini-3.1-pro-preview": [e(0.89)],
    });
    const result = findMatchingIntelligence("gemini-3.1-pro", map);
    assert.ok(result);
    assert.equal(result.score, 0.89);
  });

  it("matches claude-opus-5-5 to claude-opus-5.5 instead of claude-opus-5", () => {
    const map = buildMap({
      "claude-opus-5": [e(0.85, { permaslug: "anthropic/claude-opus-5-20260723" })],
      "claude-opus-5.5": [e(0.95, { permaslug: "anthropic/claude-opus-5.5-20260921" })],
    });
    const result = findMatchingIntelligence("claude-opus-5-5", map);
    assert.ok(result);
    assert.equal(result.score, 0.95);
    assert.equal(result.permaslug, "anthropic/claude-opus-5.5-20260921");
  });
});

describe("candidateIntelligenceKeys", () => {
  it("generates candidates for vendor-prefixed and :free model IDs", () => {
    const keys = candidateIntelligenceKeys("google/gemma-4-31b-it:free");
    assert.deepEqual(keys, [
      "google/gemma-4-31b-it:free",
      "google/gemma-4-31b-it",
      "gemma-4-31b-it:free",
      "gemma-4-31b-it",
    ]);
  });

  it("generates candidates for plain model ID and dot-hyphen variants", () => {
    const keys = candidateIntelligenceKeys("claude-opus-5-5");
    assert.ok(keys.includes("claude-opus-5-5"));
    assert.ok(keys.includes("claude-opus-5.5"));
  });

  it("generates preview-stripped and date-stripped candidates in priority order", () => {
    const keys = candidateIntelligenceKeys("google/gemini-3.1-flash-lite-preview-20260303:free");
    assert.ok(keys.includes("gemini-3.1-flash-lite-preview-20260303"));
    assert.ok(keys.includes("gemini-3.1-flash-lite-preview"));
    assert.ok(keys.includes("gemini-3.1-flash-lite"));
    // Exact forms should precede stripped forms
    const previewIdx = keys.indexOf("gemini-3.1-flash-lite-preview");
    const strippedIdx = keys.indexOf("gemini-3.1-flash-lite");
    assert.ok(previewIdx < strippedIdx);
  });
});

describe("mergeProviderModels with custom precedence and synced models", () => {
  it("custom model metadata takes precedence over static registry model", () => {
    const registry = [
      { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash" },
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
    ];
    const custom = [{ id: "gemini-3.8-flash", name: "gemini-3.8-flash", isFree: true }];
    const merged = mergeProviderModels(registry, custom);
    assert.equal(merged.length, 2);
    const target = merged.find((m) => m.id === "gemini-3.8-flash");
    assert.ok(target);
    assert.equal(target.isFree, true);
    assert.equal(target.name, "gemini-3.8-flash");
  });

  it("folds in live synced models and preserves custom models", () => {
    const registry = [{ id: "auto", name: "Auto" }];
    const synced = [
      { id: "minimax/minimax-m3.1-flash:free", name: "MiniMax Flash", isFree: true },
      { id: "auto", name: "Auto from sync" },
    ];
    const custom = [{ id: "custom-extra", name: "Custom Extra", isFree: true }];
    const merged = mergeProviderModels(registry, custom, synced);
    assert.equal(merged.length, 3);
    assert.ok(merged.some((m) => m.id === "auto"));
    assert.ok(merged.some((m) => m.id === "minimax/minimax-m3.1-flash:free" && m.isFree === true));
    assert.ok(merged.some((m) => m.id === "custom-extra" && m.isFree === true));
  });
});
