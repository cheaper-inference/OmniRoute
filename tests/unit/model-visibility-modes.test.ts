/**
 * Three-state model visibility (`visible` | `combos_only` | `hidden`).
 *
 * Covers the shared precedence rule and the DB write/read paths it feeds:
 *  - an explicit model override always wins, then `hidden`, then `combos_only`, then an
 *    explicit `visible` (the positive exception over a combos-only provider), then the
 *    provider default, then visible;
 *  - the legacy `isHidden` / `hiddenModalities` flags keep resolving exactly as before, so
 *    no pre-three-state row changes meaning;
 *  - `hidden` is mirrored into the legacy flags on write, while `combos_only` is not (a combo
 *    must keep reaching it), and `getHiddenModelsByProvider` never reports it.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-visibility-modes-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const visibility = await import("../../src/shared/utils/modelVisibility.ts");
const providerCombosOnly = await import("../../src/shared/utils/providerCombosOnly.ts");
const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const compat = await import("../../src/lib/db/models/compat.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const {
  resolveExplicitVisibility,
  resolveEffectiveVisibility,
  isHiddenForModality,
  isBlockedFromDirectUse,
  normalizeVisibilityMode,
} = visibility;

test("normalizeVisibilityMode accepts only the three modes", () => {
  assert.equal(normalizeVisibilityMode("visible"), "visible");
  assert.equal(normalizeVisibilityMode("combos_only"), "combos_only");
  assert.equal(normalizeVisibilityMode("hidden"), "hidden");
  assert.equal(normalizeVisibilityMode("HIDDEN"), null);
  assert.equal(normalizeVisibilityMode(undefined), null);
  assert.equal(normalizeVisibilityMode(true), null);
});

test("legacy flags keep their exact pre-three-state meaning", () => {
  // No visibility fields at all → no explicit statement.
  assert.equal(resolveExplicitVisibility({}, "chat"), null);
  assert.equal(resolveExplicitVisibility(null, "chat"), null);
  // Legacy hide is explicit hidden.
  assert.equal(resolveExplicitVisibility({ isHidden: true }, "chat"), "hidden");
  // Legacy isHidden:false is an explicit visible (it beats a combos-only provider).
  assert.equal(resolveExplicitVisibility({ isHidden: false }, "chat"), "visible");
  // A modality-scoped flag wins over the global one.
  assert.equal(
    resolveExplicitVisibility({ isHidden: true, hiddenModalities: { chat: false } }, "chat"),
    "visible"
  );
  assert.equal(resolveExplicitVisibility({ hiddenModalities: { images: true } }, "chat"), null);
  assert.equal(
    resolveExplicitVisibility({ hiddenModalities: { images: true } }, "images"),
    "hidden"
  );
});

test("new visibility fields win over the legacy flags", () => {
  assert.equal(
    resolveExplicitVisibility({ visibilityMode: "combos_only", isHidden: true }, "chat"),
    "combos_only"
  );
  assert.equal(
    resolveExplicitVisibility(
      { visibilityModalities: { chat: "visible" }, visibilityMode: "hidden" },
      "chat"
    ),
    "visible"
  );
  assert.equal(
    resolveExplicitVisibility({ visibilityModalities: { images: "combos_only" } }, "chat"),
    null
  );
});

test("effective visibility applies the provider default only without an explicit override", () => {
  assert.deepEqual(resolveEffectiveVisibility(null, "chat", { providerCombosOnly: true }), {
    mode: "combos_only",
    source: "provider",
  });
  assert.deepEqual(
    resolveEffectiveVisibility({ visibilityMode: "visible" }, "chat", { providerCombosOnly: true }),
    { mode: "visible", source: "model" }
  );
  assert.deepEqual(
    resolveEffectiveVisibility({ visibilityMode: "hidden" }, "chat", { providerCombosOnly: true }),
    { mode: "hidden", source: "model" }
  );
  assert.deepEqual(resolveEffectiveVisibility({}, "chat"), { mode: "visible", source: "default" });
});

test("isHiddenForModality ignores combos_only, and isBlockedFromDirectUse covers both", () => {
  assert.equal(isHiddenForModality({ visibilityMode: "combos_only" }, "chat"), false);
  assert.equal(isHiddenForModality({ visibilityMode: "hidden" }, "chat"), true);
  assert.equal(isBlockedFromDirectUse("combos_only"), true);
  assert.equal(isBlockedFromDirectUse("hidden"), true);
  assert.equal(isBlockedFromDirectUse("visible"), false);
  assert.equal(isBlockedFromDirectUse(null), false);
  assert.equal(isBlockedFromDirectUse(undefined), false);
});

test("provider combos-only matching accepts id, alias and node keys", () => {
  assert.equal(providerCombosOnly.isProviderCombosOnly([], ["openai"]), false);
  assert.equal(providerCombosOnly.isProviderCombosOnly(["openai"], ["openai"]), true);
  assert.equal(providerCombosOnly.isProviderCombosOnly(["oa"], ["openai", "oa"]), true);
  assert.equal(
    providerCombosOnly.isProviderCombosOnly(new Set(["node-1"]), ["node-1", "prefix"]),
    true
  );
  assert.equal(providerCombosOnly.isProviderCombosOnly(["openai"], [null, ""]), false);
  assert.deepEqual(
    [...providerCombosOnly.normalizeCombosOnlyProviderSet(["openai", "", null, "anthropic"])],
    ["openai", "anthropic"]
  );
  assert.equal(providerCombosOnly.resolveVisibilityWithProviderDefault(null, true), "combos_only");
  assert.equal(providerCombosOnly.resolveVisibilityWithProviderDefault("visible", true), "visible");
  assert.equal(providerCombosOnly.resolveVisibilityWithProviderDefault("hidden", false), "hidden");
});

test("writing combos_only keeps the model reachable and off the hidden map", () => {
  const providerId = "openai";
  compat.mergeModelCompatOverride(providerId, "gpt-combos-only", {
    visibilityMode: "combos_only",
    modality: "chat",
  });

  const stored = compat
    .getModelCompatOverrides(providerId)
    .find((entry) => entry.id === "gpt-combos-only");
  assert.equal(stored?.visibilityModalities?.chat, "combos_only");
  // The legacy scope is CLEARED (deleted), not written as `false`: an explicit legacy `false`
  // would be an extra "visible" statement that outlives a later `visibilityMode: null`.
  assert.equal(stored?.isHidden, undefined);
  assert.equal(stored?.hiddenModalities?.chat, undefined);

  const map = modelsDb.getModelVisibilityMap("chat");
  assert.deepEqual([...(map.combosOnly.get(providerId) || [])], ["gpt-combos-only"]);
  assert.equal(map.hidden.get(providerId)?.has("gpt-combos-only") ?? false, false);
  assert.equal(
    modelsDb.getHiddenModelsByProvider("chat").get(providerId)?.has("gpt-combos-only") ?? false,
    false
  );
  assert.equal(modelsDb.getModelIsHidden(providerId, "gpt-combos-only", "chat"), false);
  assert.equal(modelsDb.isModelCombosOnly(providerId, "gpt-combos-only", "chat"), true);
});

test("writing hidden still mirrors the legacy flag so old readers agree", () => {
  const providerId = "anthropic";
  compat.mergeModelCompatOverride(providerId, "claude-hidden", {
    visibilityMode: "hidden",
    modality: "chat",
  });
  const stored = compat
    .getModelCompatOverrides(providerId)
    .find((entry) => entry.id === "claude-hidden");
  assert.equal(stored?.visibilityModalities?.chat, "hidden");
  assert.equal(stored?.hiddenModalities?.chat, true);
  assert.equal(modelsDb.getModelIsHidden(providerId, "claude-hidden", "chat"), true);
  assert.equal(
    modelsDb.getModelVisibilityMap("chat").hidden.get(providerId)?.has("claude-hidden"),
    true
  );
});

test("an explicit visible override clears a previous combos_only and outranks the provider default", () => {
  const providerId = "google";
  compat.mergeModelCompatOverride(providerId, "gemini-x", {
    visibilityMode: "combos_only",
    modality: "chat",
  });
  compat.mergeModelCompatOverride(providerId, "gemini-x", {
    visibilityMode: "visible",
    modality: "chat",
  });
  const stored = compat.getModelCompatOverrides(providerId).find((e) => e.id === "gemini-x");
  assert.equal(stored?.visibilityModalities?.chat, "visible");

  const map = modelsDb.getModelVisibilityMap("chat");
  assert.equal(map.combosOnly.get(providerId)?.has("gemini-x") ?? false, false);
  assert.equal(map.explicitVisible.get(providerId)?.has("gemini-x"), true);
});

test("visibilityMode null clears the override back to the provider default", () => {
  const providerId = "meta";
  compat.mergeModelCompatOverride(providerId, "llama-x", {
    visibilityMode: "combos_only",
    modality: "chat",
  });
  compat.mergeModelCompatOverride(providerId, "llama-x", {
    visibilityMode: null,
    modality: "chat",
  });
  const stored = compat.getModelCompatOverrides(providerId).find((e) => e.id === "llama-x");
  assert.equal(stored, undefined);
  assert.equal(
    modelsDb.getModelVisibilityMap("chat").combosOnly.get(providerId) ?? undefined,
    undefined
  );
});

test("modalities stay independent: hiding images leaves chat untouched", () => {
  const providerId = "stability";
  compat.mergeModelCompatOverride(providerId, "sd-x", {
    visibilityMode: "hidden",
    modality: "images",
  });
  const images = modelsDb.getModelVisibilityMap("images");
  const chat = modelsDb.getModelVisibilityMap("chat");
  assert.equal(images.hidden.get(providerId)?.has("sd-x"), true);
  assert.equal(chat.hidden.get(providerId)?.has("sd-x") ?? false, false);
});
