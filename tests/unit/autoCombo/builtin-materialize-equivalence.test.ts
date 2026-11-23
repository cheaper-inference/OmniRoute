/**
 * Equivalence guard for the collapsed `createBuiltinAutoCombo` materialization.
 *
 * `createBuiltinAutoCombo` used to pick the virtual-factory arguments through a
 * four-branch chain (category spec → defined variant → template id without a
 * variant → `<category>[:<tier>]` parse → model family → throw). It now delegates
 * to the pure `resolveBuiltinAutoMaterialization`. `tipMaterialization` below is a
 * verbatim transcription of that historical chain (only `materialize(...)` replaced
 * by returning its arguments) — the oracle has to be the old code itself, since the
 * point is to prove the new code returns the same `(variant, spec)` or rejects the
 * same ids, for matching AND mismatched `(modelStr, suffix)` pairs (the request path
 * in chatHelpers.ts / autoComboCandidates.ts passes them separately).
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const factory = vi.hoisted(() => ({
  createVirtualAutoCombo: vi.fn(async () => ({ models: [] })),
  createVirtualAutoComboFromPrepared: vi.fn(async () => ({ models: [] })),
}));
vi.mock("../../../open-sse/services/autoCombo/virtualFactory", () => factory);

import {
  AUTO_FAMILY_IDS,
  AUTO_SUFFIX_VARIANTS,
  AUTO_TEMPLATE_VARIANTS,
  FLAT_TIER_OVERLAY_IDS,
  createBuiltinAutoCombo,
  resolveBuiltinAutoMaterialization,
  resolveBuiltinAutoSpec,
} from "../../../open-sse/services/autoCombo/builtinCatalog";
import { VALID_VARIANTS } from "../../../open-sse/services/autoCombo/autoPrefix";
import {
  isValidModelFamily,
  MODEL_FAMILIES,
} from "../../../open-sse/services/autoCombo/modelFamily";
import {
  AUTO_CATEGORIES,
  AUTO_TIERS,
  parseAutoSuffix,
} from "../../../open-sse/services/autoCombo/suffixComposition";

type Args = { variant: unknown; spec: unknown } | null;

// Verbatim transcription of the pre-refactor branch chain (release/v3.8.52).
function tipMaterialization(modelStr: string, suffix: string): Args {
  const materialize = (variant: unknown, spec?: unknown) => ({ variant, spec });
  const spec = resolveBuiltinAutoSpec(modelStr, suffix);

  if ("category" in spec) {
    return materialize(undefined, {
      category: spec.category,
      ...(spec.tier ? { tier: spec.tier } : {}),
    });
  }
  if ("variant" in spec && spec.variant !== undefined) {
    const overlayTier = FLAT_TIER_OVERLAY_IDS[modelStr];
    return materialize(spec.variant, { ...(overlayTier ? { tier: overlayTier } : {}) });
  }
  if (Object.prototype.hasOwnProperty.call(AUTO_TEMPLATE_VARIANTS, modelStr)) {
    const overlayTier = FLAT_TIER_OVERLAY_IDS[modelStr];
    return materialize(undefined, overlayTier ? { tier: overlayTier } : undefined);
  }
  const parsed = parseAutoSuffix(suffix);
  if (parsed.valid) {
    return materialize(undefined, { category: parsed.category, tier: parsed.tier });
  }
  if (isValidModelFamily(suffix)) {
    return materialize(undefined, { family: suffix });
  }
  return null;
}

const ids = [
  ...new Set([
    ...Object.keys(AUTO_TEMPLATE_VARIANTS),
    ...AUTO_SUFFIX_VARIANTS,
    ...AUTO_FAMILY_IDS,
    ...VALID_VARIANTS.map((variant) => `auto/${variant}`),
    ...AUTO_CATEGORIES.flatMap((category) => [
      `auto/${category}`,
      ...AUTO_TIERS.map((tier) => `auto/${category}:${tier}`),
    ]),
    "auto",
    "auto/",
    "auto/pro:pro",
    "auto/nonsense",
    "auto/coding:bogus",
    "auto/coding:fast:extra",
    "auto/coding:",
    "auto/:fast",
    "auto/Coding",
    "auto//fast",
    "auto/toString",
    "auto/__proto__",
    "other/fast",
  ]),
];
const suffixOf = (id: string) => id.replace(/^auto\/?/, "");
// Matching pairs plus every id against a spread of foreign suffixes (mismatched pairs).
const foreignSuffixes = ["fast", "coding", "coding:pro", "vision", "glm", "chat", "", "nonsense"];
const pairs: Array<[string, string]> = [
  ...ids.map((id): [string, string] => [id, suffixOf(id)]),
  ...ids.flatMap((id) => foreignSuffixes.map((suffix): [string, string] => [id, suffix])),
];

beforeEach(() => vi.clearAllMocks());

describe("collapsed built-in auto materialization ≡ historical four-branch chain", () => {
  it("covers a non-trivial table (matching and mismatched id/suffix pairs)", () => {
    expect(pairs.length).toBeGreaterThan(400);
    const outcomes = new Set(pairs.map(([id, s]) => (tipMaterialization(id, s) ? "ok" : "throw")));
    expect(outcomes).toEqual(new Set(["ok", "throw"]));
  });

  it("returns the same (variant, spec) — or rejects — for every pair", () => {
    for (const [modelStr, suffix] of pairs) {
      expect(
        resolveBuiltinAutoMaterialization(modelStr, suffix),
        `${modelStr} / ${JSON.stringify(suffix)}`
      ).toEqual(tipMaterialization(modelStr, suffix));
    }
  });

  it("createBuiltinAutoCombo hands the factory exactly those arguments (with and without prepared)", async () => {
    const prepared = {} as Parameters<typeof createBuiltinAutoCombo>[2];
    for (const [modelStr, suffix] of pairs) {
      vi.clearAllMocks();
      const expected = tipMaterialization(modelStr, suffix);
      if (!expected) {
        await expect(createBuiltinAutoCombo(modelStr, suffix)).rejects.toThrow(
          `Unknown built-in auto combo: ${modelStr}`
        );
        expect(factory.createVirtualAutoCombo).not.toHaveBeenCalled();
        continue;
      }
      const combo = await createBuiltinAutoCombo(modelStr, suffix);
      expect(factory.createVirtualAutoCombo).toHaveBeenCalledWith(expected.variant, expected.spec);
      expect(combo).toMatchObject({ id: modelStr, name: modelStr });
      await createBuiltinAutoCombo(modelStr, suffix, prepared);
      expect(factory.createVirtualAutoComboFromPrepared).toHaveBeenCalledWith(
        prepared,
        expected.variant,
        expected.spec
      );
    }
  });

  it("family/category precedence: today no suffix is both, so the order cannot diverge silently", () => {
    // The historical chain checks the `<category>[:<tier>]` parse BEFORE the family;
    // resolveBuiltinAutoSpec checks the family first. The collapsed code keeps the
    // historical order explicitly; this pins that the two sets are disjoint today.
    for (const family of MODEL_FAMILIES) {
      expect(parseAutoSuffix(family).valid, family).toBe(false);
    }
  });
});
