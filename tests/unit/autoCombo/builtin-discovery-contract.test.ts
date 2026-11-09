import { beforeEach, describe, expect, it, vi } from "vitest";

const factory = vi.hoisted(() => ({
  createVirtualAutoCombo: vi.fn(async () => ({ models: [] })),
  createVirtualAutoComboFromPrepared: vi.fn(() => ({ models: [] })),
}));
vi.mock("../../../open-sse/services/autoCombo/virtualFactory", () => factory);

import {
  AUTO_FAMILY_IDS,
  AUTO_SUFFIX_VARIANTS,
  AUTO_TEMPLATE_VARIANTS,
  createBuiltinAutoCombo,
  isResolvableBuiltinAutoId,
} from "../../../open-sse/services/autoCombo/builtinCatalog";
import { VALID_VARIANTS } from "../../../open-sse/services/autoCombo/autoPrefix";
import {
  AUTO_CATEGORIES,
  AUTO_TIERS,
} from "../../../open-sse/services/autoCombo/suffixComposition";
import { appendCcDiscoveryAliases } from "../../../open-sse/utils/ccDiscoveryAliases";

const accepted = [
  ...new Set([
    ...Object.keys(AUTO_TEMPLATE_VARIANTS),
    ...AUTO_SUFFIX_VARIANTS,
    ...AUTO_FAMILY_IDS,
    ...VALID_VARIANTS.map((variant) => `auto/${variant}`),
    ...AUTO_CATEGORIES.flatMap((category) => [
      `auto/${category}`,
      ...AUTO_TIERS.map((tier) => `auto/${category}:${tier}`),
    ]),
  ]),
];
const rejected = [
  "auto",
  "auto/",
  "auto/pro:pro",
  "auto/nonsense",
  "auto/coding:bogus",
  "auto/coding:fast:extra",
  "auto//fast",
  "auto/toString",
  "auto/__proto__",
];

// The catalog only filters `auto/*` mirrors in the opt-in refined mode
// (CATALOG_MIRROR_REFINEMENTS_ENABLED), with the resolver injected by catalogResponse.ts.
const REFINED = { refined: true, isResolvableAutoId: isResolvableBuiltinAutoId };

beforeEach(() => vi.clearAllMocks());

describe("built-in discovery and materialization share one acceptance contract", () => {
  it.each(accepted)("advertises and materializes %s", async (id) => {
    expect(isResolvableBuiltinAutoId(id)).toBe(true);
    const models = [{ id, owned_by: "combo" }];
    expect(appendCcDiscoveryAliases(models, () => true, REFINED).map((model) => model.id)).toEqual([
      id,
      `claude/combo/${id}`,
    ]);
    const combo = await createBuiltinAutoCombo(id, id.slice("auto/".length));
    expect(combo).toMatchObject({ id, name: id });
    expect(factory.createVirtualAutoCombo).toHaveBeenCalledTimes(1);
  });

  it.each(rejected)("neither advertises nor materializes %s", async (id) => {
    expect(isResolvableBuiltinAutoId(id)).toBe(false);
    const models = [{ id, owned_by: "combo" }];
    expect(appendCcDiscoveryAliases(models, () => true, REFINED)).toBe(models);
    await expect(createBuiltinAutoCombo(id, id.slice("auto/".length))).rejects.toThrow(
      "Unknown built-in auto combo"
    );
    expect(factory.createVirtualAutoCombo).not.toHaveBeenCalled();
  });

  it.each([
    ["other/fast", "fast", "fast"],
    ["auto/nonsense", "fast", "fast"],
    ["auto/fast", "coding", "fast"],
  ])(
    "request path keeps the lenient (modelStr, suffix) contract: %s / %s still materializes",
    async (id, suffix, variant) => {
      // chatHelpers.ts passes the raw model and the parsed suffix separately; the
      // exact `auto/<suffix>` guard is catalog-only (isResolvableBuiltinAutoId).
      expect(isResolvableBuiltinAutoId(id)).toBe(id === "auto/fast");
      const combo = await createBuiltinAutoCombo(id, suffix);
      expect(combo).toMatchObject({ id, name: id });
      expect(factory.createVirtualAutoCombo).toHaveBeenCalledWith(variant, {});
    }
  );

  it.each([
    ["auto/chat", undefined, undefined],
    ["auto/subscription", undefined, { tier: "subscription" }],
    ["auto/thrifty", "cheap", { tier: "thrifty" }],
    ["auto/best-free", "cheap", { tier: "free" }],
    ["auto/best-vision", undefined, { category: "vision" }],
    ["auto/pro-vision", undefined, { category: "vision", tier: "pro" }],
    ["auto/coding:reliable", undefined, { category: "coding", tier: "reliable" }],
    ["auto/claude-opus", undefined, { family: "claude-opus" }],
  ])(
    "preserves materialization arguments for %s with and without prepared inputs",
    async (id, variant, spec) => {
      await createBuiltinAutoCombo(id, id.slice("auto/".length));
      expect(factory.createVirtualAutoCombo).toHaveBeenCalledWith(variant, spec);
      const prepared = {} as Parameters<typeof createBuiltinAutoCombo>[2];
      const combo = await createBuiltinAutoCombo(id, id.slice("auto/".length), prepared);
      expect(factory.createVirtualAutoComboFromPrepared).toHaveBeenCalledWith(
        prepared,
        variant,
        spec
      );
      expect(combo).toMatchObject({ id, name: id });
    }
  );
});
