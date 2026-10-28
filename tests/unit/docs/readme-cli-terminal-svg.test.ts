import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderCliTerminal,
  CLI_TERMINAL_COPY,
} from "../../../scripts/docs/gen-readme-cli-terminal.mjs";
import { buildChecks } from "../../../scripts/check/check-docs-counts-sync.mjs";

// The committed terminal demo must be exactly what the generator produces, carry the kit mono
// face inline, draw every string it subsets, keep the counts gate's numbers readable as text
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

test("the terminal embeds the kit mono face only (1 face) and nothing external", async () => {
  const svg = await renderCliTerminal();
  // One role is passed to buildFontFaceCss: mono — a terminal draws nothing else.
  assert.equal((svg.match(/@font-face/g) || []).length, 1);
  assert.ok(svg.includes('font-family:"CI Mono"'));
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 350" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every drawn string is part of the subset input (no missing glyphs)", async () => {
  const svg = await renderCliTerminal();
  for (const s of Object.values(CLI_TERMINAL_COPY).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("the counts gate still reads the terminal's canonical numbers (live code, same check CI runs)", async () => {
  const svg = await renderCliTerminal();
  const checks = buildChecks().filter(
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
  assert.match(svg, /:root\{[^}]*--bg:#fbfbf8/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#040d10/);
  // url(#id) references are not hex colors; everything else after the stylesheet is tokens.
  assert.doesNotMatch(svg.slice(svg.indexOf("</style>")), /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
