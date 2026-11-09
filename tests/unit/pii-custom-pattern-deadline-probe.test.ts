import test from "node:test";
import assert from "node:assert/strict";

const { compilePiiCustomPattern, compilePiiCustomRules, previewPiiCustomPattern } =
  await import("../../src/shared/utils/piiCustomPatterns.ts");

// Assembled at runtime so the deliberately slow patterns are test data, not regex literals in
// source. `safe-regex` (a static star-height check) accepts every one of them.
const ALTERNATION_OVERLAP = ["(a|a", "a)", "+$"].join("");
const NON_ASCII_OVERLAP = ["(\u00e9|\u00e9", "\u00e9)", "+$"].join("");
const DIGIT_OVERLAP = ["(\\d|\\d", "\\d)", "+$"].join("");

for (const [label, pattern] of [
  ["overlapping alternation", ALTERNATION_OVERLAP],
  ["overlapping non-ASCII alternation", NON_ASCII_OVERLAP],
  ["overlapping digit class", DIGIT_OVERLAP],
] as const) {
  test(`the gate rejects a slow pattern that safe-regex accepts: ${label}`, () => {
    const started = Date.now();
    assert.deepEqual(compilePiiCustomPattern({ type: "regex", pattern }), {
      ok: false,
      reason: "unsafe",
    });
    assert.ok(Date.now() - started < 1500, "the probe must stop at its deadline");
  });
}

test("a stored slow pattern is skipped at runtime and the preview refuses it", () => {
  const stored = { id: "s", name: "slow", type: "regex" as const, pattern: ALTERNATION_OVERLAP };
  assert.equal(compilePiiCustomRules([{ ...stored, enabled: true }]).length, 0);
  assert.deepEqual(
    previewPiiCustomPattern({ type: "regex", pattern: ALTERNATION_OVERLAP, sampleText: "aaaa" }),
    { valid: false, reason: "unsafe" }
  );
});

test("ordinary operator patterns still compile", () => {
  for (const pattern of [
    "ACME-\\d{6}",
    "[A-Z]{2}\\d{6}",
    "\\b[\\w.+-]+@corp\\.local\\b",
    "\\s+$",
    "(foo|bar)-\\d+",
  ]) {
    const result = compilePiiCustomPattern({ type: "regex", pattern });
    assert.equal(result.ok, true, pattern);
  }
  assert.equal(compilePiiCustomPattern({ type: "wildcard", pattern: "*@corp.local" }).ok, true);
});
