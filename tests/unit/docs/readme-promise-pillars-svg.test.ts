import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderReadmePromisePillars,
  PROMISE_PILLARS_COPY,
} from "../../../scripts/docs/gen-readme-promise-pillars.mjs";
import { buildChecks } from "../../../scripts/check/check-docs-counts-sync.mjs";

// The committed six-pillar promise card must be exactly what the generator produces, draw the kit type as outlines, keep every string as text, keep the counts gate's numbers readable as
// text and declare both palettes with no literal color escaping the theme. Same staleness
// contract as tests/unit/docs/readme-hero-svg.test.ts.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

test("the committed promise-pillars diagram is exactly what the generator produces", async () => {
  const generated = await renderReadmePromisePillars();
  const committed = readFileSync("docs/diagrams/promise-pillars.svg", "utf8");
  assert.equal(
    committed,
    generated,
    "docs/diagrams/promise-pillars.svg is stale — regenerate with `node scripts/docs/gen-readme-promise-pillars.mjs`"
  );
});

test("the only embedded font is the mono subset for the command footer, and nothing is external", async () => {
  const svg = await renderReadmePromisePillars();
  assert.equal((svg.match(/@font-face/g) || []).length, 1);
  assert.ok(svg.includes('font-family:"CI Mono"'));
  const style = svg.slice(svg.indexOf("<style>"), svg.indexOf("</style>"));
  assert.doesNotMatch(style, /Switzer|CI Serif|CI Sans/, "the mono subset is the only face");
  assert.match(svg, /<use href="#g[0-9a-z]+"/, "the Switzer text is drawn as outlines");
  assert.doesNotMatch(
    svg,
    /(href|src|xlink:href)=["']https?:|url\(["']?https?:|@import|<script|<foreignObject/
  );
  assert.match(svg, /^<svg viewBox="0 0 1200 540" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every copy string stays in the file as text", async () => {
  const svg = await renderReadmePromisePillars();
  for (const s of Object.values(PROMISE_PILLARS_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("the counts gate's own readers of this file accept the generated content (live code)", async () => {
  const svg = await renderReadmePromisePillars();
  const checks = buildChecks().filter(
    (c) => Array.isArray(c.files) && c.files.includes("docs/diagrams/promise-pillars.svg")
  );
  assert.ok(checks.length > 0, "the counts gate no longer reads promise-pillars.svg");
  for (const c of checks) {
    const r = c.validate(svg);
    assert.equal(r.ok, true, `${c.label}: ${r.detail}`);
  }
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderReadmePromisePillars();
  assert.match(svg, /:root\{[^}]*--bg:#fbfbf8/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#040d10/);
  const body = svg.slice(svg.indexOf("</style>"));
  assert.doesNotMatch(body, /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
