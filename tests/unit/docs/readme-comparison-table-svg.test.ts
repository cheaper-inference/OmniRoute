import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderComparisonTable,
  COMPARISON_TABLE_COPY,
} from "../../../scripts/docs/gen-readme-comparison-table.mjs";
import { buildChecks } from "../../../scripts/check/check-docs-counts-sync.mjs";

// The committed comparison table must be exactly what the generator produces, carry the UI kit
// fonts inline, draw every string it subsets, keep the counts gate's numbers readable as text
// and declare both palettes. Same staleness contract as tests/unit/docs/readme-hero-svg.test.ts.

const FILE = "docs/diagrams/comparison-table.svg";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

test("the committed comparison table is exactly what the generator produces", async () => {
  const generated = await renderComparisonTable();
  const committed = readFileSync(FILE, "utf8");
  assert.equal(
    committed,
    generated,
    `${FILE} is stale — regenerate with \`node scripts/docs/gen-readme-comparison-table.mjs\``
  );
});

test("the table embeds the kit faces it uses (ui, uiBold, mono) and nothing external", async () => {
  const svg = await renderComparisonTable();
  // Three roles are passed to buildFontFaceCss: ui (Inter 400), uiBold (Inter 600), mono.
  assert.equal((svg.match(/@font-face/g) || []).length, 3);
  for (const fam of ["CI Sans", "CI Mono"]) {
    assert.ok(svg.includes(`font-family:"${fam}"`), fam);
  }
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 780" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every drawn string is part of the subset input (no missing glyphs)", async () => {
  const svg = await renderComparisonTable();
  for (const s of Object.values(COMPARISON_TABLE_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("the counts gate's own readers of this file accept the generated content (live code)", async () => {
  const svg = await renderComparisonTable();
  const checks = buildChecks().filter((c) => Array.isArray(c.files) && c.files.includes(FILE));
  assert.ok(checks.length > 0, `no counts-gate check reads ${FILE}`);
  for (const c of checks) {
    const r = c.validate(svg);
    assert.equal(r.ok, true, `${c.label}: ${r.detail}`);
  }
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderComparisonTable();
  assert.match(svg, /:root\{[^}]*--bg:#fbfbf8/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#040d10/);
  assert.doesNotMatch(svg.slice(svg.indexOf("</style>")), /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
