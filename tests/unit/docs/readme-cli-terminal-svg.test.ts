import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderCliTerminal,
  CLI_TERMINAL_COPY,
} from "../../../scripts/docs/gen-readme-cli-terminal.mjs";
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

// The committed terminal demo must be exactly what the generator produces, carry the kit mono
// face inline, keep every string as text, keep the counts gate's numbers readable as text
// and declare both palettes with no literal color escaping the theme. Same staleness contract
// as tests/unit/docs/readme-hero-svg.test.ts.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

test("the committed cli-terminal diagram is exactly what the generator produces", async () => {
  const generated = await renderCliTerminal();
  const committed = readFileSync("docs/diagrams/cli-terminal.svg", "utf8");
  assert.equal(
    committed,
    generated,
    "docs/diagrams/cli-terminal.svg is stale — regenerate with `node scripts/docs/gen-readme-cli-terminal.mjs`"
  );
});

test("the only embedded font is the mono subset for its terminal text, and nothing is external", async () => {
  const svg = await renderCliTerminal();
  assert.equal((svg.match(/@font-face/g) || []).length, 1);
  assert.ok(svg.includes('font-family:"CI Mono"'));
  const style = svg.slice(svg.indexOf("<style>"), svg.indexOf("</style>"));
  assert.doesNotMatch(style, /Switzer|CI Serif|CI Sans/, "the mono subset is the only face");
  assert.doesNotMatch(svg, /<use href="#g/, "a terminal is all code: nothing to outline");
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 350" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every copy string stays in the file as text", async () => {
  const svg = await renderCliTerminal();
  for (const s of Object.values(CLI_TERMINAL_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("the counts gate still reads the terminal's canonical numbers (snapshot facts, same check the release runs)", async () => {
  const svg = await renderCliTerminal();
  const checks = buildChecks({ facts: snapshotFacts }).filter(
    (c) => Array.isArray(c.files) && c.files.includes("docs/diagrams/cli-terminal.svg")
  );
  assert.ok(checks.length > 0, "the counts gate no longer reads docs/diagrams/cli-terminal.svg");
  for (const c of checks) {
    const r = c.validate(svg);
    assert.equal(r.ok, true, `${c.label}: ${r.detail}`);
  }
});

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderCliTerminal();
  assert.match(svg, /:root\{[^}]*--bg:#f3f1e9/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#11120f/);
  // url(#id) references are not hex colors; everything else after the stylesheet is tokens.
  assert.doesNotMatch(svg.slice(svg.indexOf("</style>")), /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
