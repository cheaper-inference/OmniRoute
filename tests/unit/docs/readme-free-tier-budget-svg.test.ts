import test, { before, describe } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { JSDOM } from "jsdom";
import {
  renderReadmeFreeTierBudget,
  buildFreeTierBudgetCopy,
  fmtTokens,
  fmtWords,
} from "../../../scripts/docs/gen-readme-free-tier-budget.mjs";
import { buildChecks } from "../../../scripts/check/check-docs-counts-sync.mjs";
import { releaseOnlyUnlessTouched } from "../../../scripts/check/lib/derivedArtifactScope.mjs";
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

// The committed free-tier budget card must be exactly what the generator produces from the live
// catalog, draw the kit type as outlines, keep every string as text, keep the counts gate's
// numbers readable as text and declare both palettes with no literal color escaping the theme.
// Same staleness contract as tests/unit/docs/readme-hero-svg.test.ts.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const { code } = snapshotFacts;
const budget = code.publicFreeTierBudget;
const notePrefix = "Counting each shared quota once:";
const steadyNote = `${notePrefix} ${code.headlineSteadyLabel} a month today`;
const hasSignupCredits = budget.oneTime.length > 0 && code.headlineFirst > code.headlineSteady;

function generateWithCode(codeOverride: typeof code) {
  const dir = mkdtempSync(join(process.env.DATA_DIR || tmpdir(), "readme-free-tier-budget-"));
  try {
    const factsFile = join(dir, "facts.json");
    const out = join(dir, "budget.svg");
    writeFileSync(factsFile, JSON.stringify({ ...snapshotFacts, code: codeOverride }));
    const result = spawnSync(
      process.execPath,
      [
        "--import",
        "tsx/esm",
        resolve("scripts/docs/gen-readme-free-tier-budget.mjs"),
        "--out",
        out,
      ],
      {
        encoding: "utf8",
        timeout: 60000,
        env: { ...process.env, OMNIROUTE_DERIVED_FACTS_PATH: factsFile },
      }
    );
    assert.ifError(result.error);
    return { result, svg: result.status === 0 ? readFileSync(out, "utf8") : "" };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// Release mode (and a change that edits this file) compares it byte for byte; a feature PR
// leaves the drift to the release refresh (scripts/check/lib/derivedArtifactScope.mjs).
const stalenessCheck = { skip: releaseOnlyUnlessTouched("docs/diagrams/free-tier-budget.svg") };

test(
  "the committed free-tier-budget diagram is exactly what the generator produces",
  stalenessCheck,
  async () => {
    const generated = await renderReadmeFreeTierBudget();
    const committed = readFileSync("docs/diagrams/free-tier-budget.svg", "utf8");
    assert.equal(
      committed,
      generated,
      "docs/diagrams/free-tier-budget.svg is stale — regenerate with `node --import tsx/esm scripts/docs/gen-readme-free-tier-budget.mjs`"
    );
  }
);

test("no font is embedded (every string is outlined) and nothing is external", async () => {
  const svg = await renderReadmeFreeTierBudget();
  assert.equal((svg.match(/@font-face/g) || []).length, 0);
  const style = svg.slice(svg.indexOf("<style>"), svg.indexOf("</style>"));
  assert.doesNotMatch(style, /font-family|Switzer/, "nothing here is text: no family to name");
  assert.match(svg, /<use href="#g[0-9a-z]+"/, "the Switzer text is drawn as outlines");
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 \d+" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every copy string stays in the file as text", async () => {
  const svg = await renderReadmeFreeTierBudget();
  for (const s of Object.values(buildFreeTierBudgetCopy()).flat()) {
    assert.ok(svg.includes(esc(s)), `string not drawn: ${s}`);
  }
});

test("the counts gate's own readers of this file accept the generated content (snapshot facts)", async () => {
  const svg = await renderReadmeFreeTierBudget();
  const checks = buildChecks({ facts: snapshotFacts }).filter(
    (c) => Array.isArray(c.files) && c.files.includes("docs/diagrams/free-tier-budget.svg")
  );
  assert.ok(checks.length > 0, "the counts gate no longer reads free-tier-budget.svg");
  for (const c of checks) {
    const r = c.validate(svg);
    assert.equal(r.ok, true, `${c.label}: ${r.detail}`);
  }
});

test("the card highlights the starred row sum and puts the applicable headline figures in the footnote", async () => {
  const label = (k: string) => String(code[k]);
  const c = buildFreeTierBudgetCopy() as Record<string, string[]>;
  const flat = Object.values(c).flat().join("\n");
  assert.deepEqual(c.hero, [`${label("rowSumTotalLabel")}*`]);
  assert.deepEqual(c.heroLabel, ["FREE TOKENS / MONTH"]);
  assert.deepEqual(c.note, [
    "* Sum of every catalog row, ended offers included, the way free-tier catalogs count.",
    hasSignupCredits
      ? `${steadyNote}, up to ${label("headlineFirstLabel")} in your first month with signup credits.`
      : `${steadyNote}.`,
  ]);
  assert.doesNotMatch([...c.hero, ...c.heroLabel].join(" "), /capacity|available|you get|real/i);
  assert.doesNotMatch(flat, /two ways to count|real today/i);
  assert.match(c.barTitle.join(""), /^RECURRING QUOTAS · \d+ QUANTIFIED POOLS/);
  assert.ok(
    flat.indexOf(label("rowSumTotalLabel")) < flat.indexOf(label("headlineSteadyLabel")),
    "the big figure comes first"
  );
  const svg = await renderReadmeFreeTierBudget();
  assert.ok(svg.includes(`>${esc(c.note[1])}</text>`));
  if (hasSignupCredits) {
    assert.match(svg, /\+ FIRST MONTH · ONE-TIME SIGNUP CREDITS /);
    assert.ok(c.creditChips.length > 0);
    assert.equal(
      (svg.match(/<rect [^>]+class="ok-bg stroke-ok"/g) ?? []).length,
      c.creditChips.length
    );
    assert.ok(
      svg.includes(
        `Up to ${label("headlineFirstLabel")} in your first month with one-time signup credits.`
      )
    );
  } else {
    assert.deepEqual(c.creditChips, []);
  }
  assert.ok(
    svg.includes(
      `${label("rowSumTotalLabel")} free tokens a month adding up every catalog row, ended offers included; ${label("headlineSteadyLabel")} a month counting each shared quota once.`
    )
  );
  assert.ok(!flat.includes("~10B"));
  assert.doesNotMatch(flat, /we don't publish that/);
  assert.ok(flat.includes(label("catalogDate")));
  assert.ok(c.ladder.some((s) => s.includes(`${label("rowSumLiveLabel")} summed per live row`)));
  for (const s of Object.values(c).flat()) assert.doesNotMatch(s, /\b0\.\d+B\b/, s);
  const meta = c.heroMeta.join("");
  assert.ok(meta.includes(`${code.freePublishedPools} pools with a published quota`), meta);
  assert.ok(meta.includes(`${code.freeAccessRows} catalog rows with free access`), meta);
  assert.doesNotMatch(meta, /recurring pools|catalog entries/);
});

describe("the signup section follows the facts snapshot", () => {
  const credits = [{ provider: "test-credit", v: 1_000 }];
  const higherFirst = code.headlineSteady + credits[0].v;
  const documentFrom = (svg: string) =>
    new JSDOM(svg, { contentType: "image/svg+xml" }).window.document;
  const heightOf = (doc: Document) =>
    Number(doc.documentElement.getAttribute("viewBox")?.split(" ")[3]);
  const textStartingWith = (doc: Document, prefix: string) => {
    const node = Array.from(doc.querySelectorAll("text")).find((el) =>
      el.textContent?.startsWith(prefix)
    );
    assert.ok(node, `missing text: ${prefix}`);
    return node;
  };
  let withCredits: Document;

  before(() => {
    const { result, svg } = generateWithCode({
      ...code,
      headlineFirst: higherFirst,
      headlineFirstLabel: code.headlineSteadyLabel,
      publicFreeTierBudget: { ...budget, first: higherFirst, oneTime: credits },
    });
    assert.equal(result.status, 0, result.stderr);
    withCredits = documentFrom(svg);
  });

  test("the card shows signup credits when the numeric totals differ but their labels round equally", () => {
    textStartingWith(withCredits, "+ FIRST MONTH · ONE-TIME SIGNUP CREDITS ");
    assert.equal(withCredits.querySelectorAll("rect.ok-bg.stroke-ok").length, 1);
    assert.equal(heightOf(withCredits), 914);
    assert.equal(
      textStartingWith(withCredits, notePrefix).textContent,
      `${steadyNote}, up to ${code.headlineSteadyLabel} in your first month with signup credits.`
    );
  });

  for (const [name, oneTime, first] of [
    ["there are no credits and both totals are equal", [], code.headlineSteady],
    ["there are no credits even though the first-month total is higher", [], higherFirst],
    ["there are credit entries even though both totals are equal", credits, code.headlineSteady],
  ] as const) {
    test(`the card omits the signup section when ${name}`, () => {
      const { result, svg } = generateWithCode({
        ...code,
        headlineFirst: first,
        headlineFirstLabel: code.headlineSteadyLabel,
        publicFreeTierBudget: { ...budget, first, oneTime },
      });
      assert.equal(result.status, 0, result.stderr);
      const doc = documentFrom(svg);
      const height = heightOf(doc);
      const shrink = heightOf(withCredits) - height;
      for (const node of doc.querySelectorAll("text, title, desc")) {
        assert.doesNotMatch(node.textContent ?? "", /first month|signup credits/i);
      }
      assert.equal(doc.querySelectorAll("rect.ok-bg.stroke-ok").length, 0);
      assert.ok(shrink > 0, "the viewBox should lose the height of the signup section");
      assert.equal(textStartingWith(doc, notePrefix).textContent, `${steadyNote}.`);
      for (const prefix of ["PLUS THE UN-COUNTABLE", "$10 OpenRouter top-up", notePrefix]) {
        const y = (source: Document) => Number(textStartingWith(source, prefix).getAttribute("y"));
        assert.equal(y(withCredits) - y(doc), shrink, `${prefix} should move up with the viewBox`);
      }
      for (const group of doc.querySelectorAll("g[transform]")) {
        const translateY = group
          .getAttribute("transform")
          ?.match(/translate\([^,\s)]+[,\s]+([^ )]+)/);
        if (translateY) assert.ok(Number(translateY[1]) <= height, group.getAttribute("transform"));
      }
    });
  }
});

for (const key of ["headlineSteady", "headlineFirst"] as const) {
  test(`the card fails loudly when code.${key} is missing even with no signup credits`, () => {
    const { result } = generateWithCode({
      ...code,
      [key]: undefined,
      publicFreeTierBudget: { ...budget, oneTime: [] },
    });
    assert.notEqual(result.status, 0);
    assert.ok(result.stderr.includes(`no numeric fact at "code.${key}"`), result.stderr);
  });
}

test("light and dark palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderReadmeFreeTierBudget();
  assert.match(svg, /:root\{[^}]*--bg:#f3f1e9/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#11120f/);
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
