import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderComparisonTable,
  COMPARISON_TABLE_COPY,
} from "../../../scripts/docs/gen-readme-comparison-table.mjs";
import { buildChecks } from "../../../scripts/check/check-docs-counts-sync.mjs";
import { loadFactsSnapshot } from "../../../scripts/release/facts.mjs";

// The numbers drawn in this diagram are DERIVED (plan 2026-11-13): the release refresh
// (`npm run release:refresh-derived`) regenerates the SVG from docs/reference/derived-facts.json.
// Between releases the live code moves ahead of the drawing by design, so the counts gate's
// readers are run here with the snapshot facts the drawing was generated from, never with the
// live code. The live comparison is release mode's job.
const snapshotFacts = loadFactsSnapshot();
assert.ok(
  snapshotFacts,
  "docs/reference/derived-facts.json is missing — run npm run release:refresh-derived"
);

// The committed comparison table must be exactly what the generator produces, draw the kit type as outlines, keep every string as text, keep the counts gate's numbers readable as text
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

test("no font is embedded (every string is outlined) and nothing is external", async () => {
  const svg = await renderComparisonTable();
  assert.equal((svg.match(/@font-face/g) || []).length, 0);
  const style = svg.slice(svg.indexOf("<style>"), svg.indexOf("</style>"));
  assert.doesNotMatch(style, /font-family|Switzer/, "nothing here is text: no family to name");
  assert.match(svg, /<use href="#g[0-9a-z]+"/, "the Switzer text is drawn as outlines");
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 780" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every copy string stays in the file as text", async () => {
  const svg = await renderComparisonTable();
  for (const s of Object.values(COMPARISON_TABLE_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("the counts gate's own readers of this file accept the generated content (snapshot facts)", async () => {
  const svg = await renderComparisonTable();
  const checks = buildChecks({ facts: snapshotFacts }).filter(
    (c) => Array.isArray(c.files) && c.files.includes(FILE)
  );
  assert.ok(checks.length > 0, `no counts-gate check reads ${FILE}`);
  for (const c of checks) {
    const r = c.validate(svg);
    assert.equal(r.ok, true, `${c.label}: ${r.detail}`);
  }
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderComparisonTable();
  assert.match(svg, /:root\{[^}]*--bg:#f3f1e9/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#11120f/);
  assert.doesNotMatch(svg.slice(svg.indexOf("</style>")), /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
