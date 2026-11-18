import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildChecks } from "../../scripts/check/check-docs-counts-sync.mjs";
import { loadFactsSnapshot } from "../../scripts/release/facts.mjs";

type Check = {
  label?: string;
  docKey?: string;
  actual?: unknown;
  strict?: boolean;
  files?: string[];
  validate?: (content: string, claim?: string) => { ok: boolean; detail: string };
};

// Built once from the committed facts snapshot (docs/reference/derived-facts.json). The entries
// asserted here are content invariants that do not depend on any fact value, and the snapshot
// keeps the test off the tsx subprocess that collecting live facts starts on every call. That
// live collection is exercised once, by "the release refresh closes the cycle" in
// check-docs-counts-sync.test.ts.
const facts = loadFactsSnapshot();
assert.ok(
  facts,
  "docs/reference/derived-facts.json is missing — run npm run release:refresh-derived"
);
const checks = buildChecks({ facts }) as Check[];

describe("quality neutral prose", () => {
  it("AUTO-COMBO.md prose carries quality neutral 0.5", () => {
    const doc = readFileSync("docs/routing/AUTO-COMBO.md", "utf8");
    assert.match(doc, /quality.*neutral.*0\.5/i);
    assert.match(doc, /quality.*0\.5/);
  });

  it("buildChecks exposes a soft entry for quality neutral prose", () => {
    const entry = checks.find(
      (c) =>
        String(c.docKey ?? "").includes("quality neutral") ||
        String(c.label ?? "")
          .toLowerCase()
          .includes("quality neutral")
    );
    assert.ok(entry, "quality neutral entry missing from buildChecks");
    assert.equal(entry.strict, false, "quality neutral entry must be soft");
    assert.ok(
      (entry.files ?? []).includes("docs/routing/AUTO-COMBO.md"),
      "must gate docs/routing/AUTO-COMBO.md"
    );
    const doc = readFileSync("docs/routing/AUTO-COMBO.md", "utf8");
    const res = entry.validate!(doc);
    assert.equal(res.ok, true, `expected soft gate to pass on current doc: ${res.detail}`);
    const silent = "no mention of quality at all";
    const r2 = entry.validate!(silent);
    assert.equal(r2.ok, false, "reworded-away prose must fail");
  });
});
