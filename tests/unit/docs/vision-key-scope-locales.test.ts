import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { announceMirrorPlan, planMirrorAssertions } from "../../_helpers/mirrorFreshness.ts";

const root = resolve(import.meta.dirname, "../../..");
const sourcePath = "docs/security/GUARDRAILS.md";
const hash = (text: string) => createHash("sha256").update(text).digest("hex");
const state = JSON.parse(readFileSync(resolve(root, ".i18n-state.json"), "utf8")) as {
  sources: Record<
    string,
    { source_hash: string; locales: Record<string, { source_hash: string; target_hash: string }> }
  >;
};

// Source freshness (does the English doc still match .i18n-state.json) is the i18n drift gate's call —
// check-translation-drift.mjs, PR-scoped since 2026-10-20. This test pins what no gate re-checks: the
// translated section is present in every locale and each mirror still holds the bytes its record describes.
// Content of the translated mirrors: every locale in release mode; in PR mode only the mirrors whose
// anchored English section is unchanged since their translation (tests/_helpers/mirrorFreshness.ts).
// A PR that rewrites the English contract leaves its mirrors to the translation wave. The target
// hash (provenance) is still checked for every locale in both modes.
test("vision bridge key scope is translated without certifying stale locale content", (t) => {
  const entry = state.sources[sourcePath];
  assert.equal(Object.keys(entry.locales).length, 66);
  const plan = planMirrorAssertions({
    root,
    source: sourcePath,
    state,
    anchors: ["visionBridgeKeyScope.ts", "When the caller's API key restricts"],
  });
  announceMirrorPlan(t, plan);
  const asserted = new Set(plan.assert);
  for (const [locale, info] of Object.entries(entry.locales)) {
    const text = readFileSync(resolve(root, "docs/i18n", locale, sourcePath), "utf8");
    assert.equal(info.target_hash, hash(text), `stale target hash: ${locale}`);
    if (!asserted.has(locale)) continue;
    const start = text.indexOf("visionBridgeKeyScope.ts");
    const end = text.indexOf("`modalityBridgeVisionTaskAware`", start);
    assert(start > 0 && end > start, `missing scope section: ${locale}`);
    const section = text.slice(start, end);
    for (const literal of [
      "allowedConnections",
      "allowedQuotas",
      "allowedModels",
      "blockedModels",
      'modelAccessMode: "restricted"',
      "disableNonPublicModels",
      "x-omniroute-self-loop-key-id",
      "enforceApiKeyPolicy()",
      "no_permitted_vision_model",
    ]) {
      assert(section.includes(literal), `missing ${literal}: ${locale}`);
    }
    assert(!section.includes("When the caller's API key restricts"), `English fallback: ${locale}`);
  }
});
