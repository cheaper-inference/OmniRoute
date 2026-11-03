import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderTierCascade,
  TIER_CASCADE_COPY,
} from "../../../scripts/docs/gen-readme-tier-cascade.mjs";
import { buildChecks } from "../../../scripts/check/check-docs-counts-sync.mjs";

// The committed tier cascade must be exactly what the generator produces, draw the kit type as outlines, keep every string as text, keep the counts gate's numbers readable as text
// and declare both palettes. Same staleness contract as tests/unit/docs/readme-hero-svg.test.ts.

const FILE = "docs/diagrams/tier-cascade.svg";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

test("the committed tier cascade is exactly what the generator produces", async () => {
  const generated = await renderTierCascade();
  const committed = readFileSync(FILE, "utf8");
  assert.equal(
    committed,
    generated,
    `${FILE} is stale — regenerate with \`node scripts/docs/gen-readme-tier-cascade.mjs\``
  );
});

test("the only embedded font is the mono subset for the endpoint URL, and nothing is external", async () => {
  const svg = await renderTierCascade();
  assert.equal((svg.match(/@font-face/g) || []).length, 1);
  assert.ok(svg.includes('font-family:"CI Mono"'));
  const style = svg.slice(svg.indexOf("<style>"), svg.indexOf("</style>"));
  assert.doesNotMatch(style, /Switzer|CI Serif|CI Sans/, "the mono subset is the only face");
  assert.match(svg, /<use href="#g[0-9a-z]+"/, "the Switzer text is drawn as outlines");
  // Reference-based "nothing external" check (review ruling R10): every place the renderer could
  // fetch from — element references, CSS url(), @import — must not carry an http(s) scheme, and
  // no script / foreignObject. Drawn text such as "http://localhost:20128/v1" is copy, not a
  // fetch, so it is not matched by any of these.
  assert.doesNotMatch(svg, /(href|src|xlink:href)=["']https?:/);
  assert.doesNotMatch(svg, /url\(\s*["']?https?:/);
  assert.doesNotMatch(svg, /@import|<script|<foreignObject/);
  assert.ok(svg.includes("http://localhost:20128/v1"), "the endpoint label is still drawn");
  assert.match(svg, /^<svg viewBox="0 0 1200 650" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every copy string stays in the file as text", async () => {
  const svg = await renderTierCascade();
  for (const s of Object.values(TIER_CASCADE_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("the counts gate's own readers of this file accept the generated content (live code)", async () => {
  const svg = await renderTierCascade();
  const checks = buildChecks().filter((c) => Array.isArray(c.files) && c.files.includes(FILE));
  assert.ok(checks.length > 0, `no counts-gate check reads ${FILE}`);
  for (const c of checks) {
    const r = c.validate(svg);
    assert.equal(r.ok, true, `${c.label}: ${r.detail}`);
  }
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderTierCascade();
  assert.match(svg, /:root\{[^}]*--bg:#fbfbf8/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#040d10/);
  assert.doesNotMatch(svg.slice(svg.indexOf("</style>")), /#[0-9a-fA-F]{3,8}(?![\w-])/);
  // SMIL never animates `fill` between literal colors — state changes cross-fade kit tokens.
  assert.doesNotMatch(svg, /attributeName="fill"/);
});
