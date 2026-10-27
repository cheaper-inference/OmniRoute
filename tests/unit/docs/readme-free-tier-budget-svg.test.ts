import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderReadmeFreeTierBudget,
  buildFreeTierBudgetCopy,
  fmtTokens,
  fmtWords,
} from "../../../scripts/docs/gen-readme-free-tier-budget.mjs";
import { buildChecks } from "../../../scripts/check/check-docs-counts-sync.mjs";

// The committed free-tier budget card must be exactly what the generator produces from the live
// catalog, carry the UI kit fonts inline, draw every string it subsets, keep the counts gate's
// numbers readable as text and declare both palettes with no literal color escaping the theme.
// Same staleness contract as tests/unit/docs/readme-hero-svg.test.ts.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

test("the committed free-tier-budget diagram is exactly what the generator produces", async () => {
  const generated = await renderReadmeFreeTierBudget();
  const committed = readFileSync("docs/diagrams/free-tier-budget.svg", "utf8");
  assert.equal(
    committed,
    generated,
    "docs/diagrams/free-tier-budget.svg is stale — regenerate with `node --import tsx/esm scripts/docs/gen-readme-free-tier-budget.mjs`"
  );
});

test("the diagram embeds the four kit faces and nothing external", async () => {
  const svg = await renderReadmeFreeTierBudget();
  // display (the headline figure) + ui + uiBold + mono.
  assert.equal((svg.match(/@font-face/g) || []).length, 4);
  for (const fam of ["CI Serif", "CI Sans", "CI Mono"]) {
    assert.ok(svg.includes(`font-family:"${fam}"`), fam);
  }
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 842" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every drawn string is part of the subset input (no missing glyphs)", async () => {
  const svg = await renderReadmeFreeTierBudget();
  for (const s of Object.values(buildFreeTierBudgetCopy()).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("the counts gate's own readers of this file accept the generated content (live code)", async () => {
  const svg = await renderReadmeFreeTierBudget();
  const checks = buildChecks().filter(
    (c) => Array.isArray(c.files) && c.files.includes("docs/diagrams/free-tier-budget.svg")
  );
  assert.ok(checks.length > 0, "the counts gate no longer reads free-tier-budget.svg");
  for (const c of checks) {
    const r = c.validate(svg);
    assert.equal(r.ok, true, `${c.label}: ${r.detail}`);
  }
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderReadmeFreeTierBudget();
  assert.match(svg, /:root\{[^}]*--bg:#fbfbf8/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#040d10/);
  const body = svg.slice(svg.indexOf("</style>"));
  assert.doesNotMatch(body, /#[0-9a-fA-F]{3,8}(?![\w-])/);
});

test("fmtTokens keeps one decimal below 10M and rolls a value up to the next unit", () => {
  assert.equal(fmtTokens(7_200_000), "7.2M");
  assert.equal(fmtTokens(6_000_000), "6M");
  assert.equal(fmtTokens(30_000_000), "30M");
  assert.equal(fmtTokens(999_999), "1M");
  assert.equal(fmtTokens(999_600_000), "1.00B");
  assert.equal(fmtTokens(1_000_000_000), "1.00B");
  assert.equal(fmtTokens(25_000), "25K");
  assert.equal(fmtWords(1_000_000_000), "1 billion");
  assert.equal(fmtWords(1_623_225_000), "1.62 billion");
  assert.equal(fmtWords(999_999), "1 million");
});
