import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "../../..");
const sourcePath = "docs/security/ROUTE_GUARD_TIERS.md";
const hash = (text: string) => createHash("sha256").update(text).digest("hex");
const sourceHash = hash(readFileSync(resolve(root, sourcePath), "utf8"));
const state = JSON.parse(readFileSync(resolve(root, ".i18n-state.json"), "utf8")) as {
  sources: Record<
    string,
    {
      source_hash: string;
      locales: Record<string, { source_hash: string; target_hash: string }>;
    }
  >;
};
const entry = state.sources[sourcePath];

test("route-guard import and snapshot protection is translated in every mirror", () => {
  assert.equal(Object.keys(entry.locales).length, 66);
  assert.equal(entry.source_hash, sourceHash);
  for (const [locale, info] of Object.entries(entry.locales)) {
    const text = readFileSync(resolve(root, "docs/i18n", locale, sourcePath), "utf8");
    // The policy paragraph runs from the Kiro auto-import deny-list entry (#16691) to the
    // regex companion constant; the deny-list test reference sits inside it, not after it.
    const start = text.indexOf("`/api/oauth/kiro/auto-import`");
    const end = text.indexOf("`SPAWN_CAPABLE_PATTERN_ANCESTORS`", start);
    assert(start > 0 && end > start, `missing localized policy proof: ${locale}`);
    const section = text.slice(start, end);
    assert(section.includes("`/api/settings/import-json`"), `missing import policy: ${locale}`);
    assert(section.includes("`LOCAL_ONLY_API_PREFIXES`"), `missing membership policy: ${locale}`);
    assert(
      section.includes("tests/unit/authz/local-only-bypass-spawn-denylist.test.ts"),
      `missing deny-list proof: ${locale}`
    );
    assert(!section.includes("The runtime snapshot loader"), `English fallback: ${locale}`);
    assert.equal(info.source_hash, sourceHash, `stale source hash: ${locale}`);
    assert.equal(info.target_hash, hash(text), `stale target hash: ${locale}`);
  }
});
