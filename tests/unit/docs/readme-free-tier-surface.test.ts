// The free-tier surfaces of the README and the reference page (Radar v2, plan 02).
//
// The free-token figures follow the owner's decisions of 2026-11-21 (D47: the big figure on top,
// with its label, the real one right below; D48: one-line surfaces carry the short pair; D49: the
// growth sentence; D50: the price sentence with its check date; D51: the top of the README keeps
// its tool line) and the texts approved on 2026-11-24 (option A in every group). Every number is
// read from the facts snapshot here, never typed: the release refresh moves them.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { HERO_COPY } from "../../../scripts/docs/gen-readme-hero.mjs";
import { buildFreeTierBudgetCopy } from "../../../scripts/docs/gen-readme-free-tier-budget.mjs";
import {
  locateFreeTokenClaims,
  locateGatedClaims,
} from "../../../scripts/check/lib/derivedClaims.mjs";
import { checkRowSumPlacement } from "../../../scripts/check/check-docs-counts-sync.mjs";
import { loadFactsSnapshot } from "../../../scripts/release/facts.mjs";
import { PROMISE_PILLARS_COPY } from "../../../scripts/docs/gen-readme-promise-pillars.mjs";
import { TIER_CASCADE_TIERS } from "../../../scripts/docs/gen-readme-tier-cascade.mjs";
import { getProviderById } from "../../../src/shared/constants/providers.ts";
import { FREE_MODEL_BUDGETS } from "../../../open-sse/config/freeModelCatalog.data.ts";

const flat = (copy: Record<string, string[]>) => Object.values(copy).flat().join("\n");

// --- Task 9: free examples ------------------------------------------------------------------

// Every provider a free example names, by the name the copy prints. A new name in the copy must
// be added here, which forces the check below to run on it.
const FREE_EXAMPLE_IDS: Record<string, string> = {
  Gemini: "gemini",
  Groq: "groq",
  Cloudflare: "cloudflare-ai",
  Kiro: "kiro",
  Qoder: "qoder",
  Pollinations: "pollinations",
};

function pillarFreeExamples(): string[] {
  const text = PROMISE_PILLARS_COPY.bodies.join(" ");
  const m = /with a free offer[^—]*—\s*([^…]+)…/.exec(text);
  assert.ok(m, `no free-example list after "with a free offer" in the pillars: ${text}`);
  return m[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

test("free examples name only providers that still give free access", () => {
  const free = TIER_CASCADE_TIERS.find((t: { kicker: string }) => /FREE/.test(t.kicker));
  assert.ok(free, "the cascade has no free tier");
  const names = [...pillarFreeExamples(), ...free.models.map((m: string) => m.trim())];
  assert.ok(names.length >= 4, names.join(", "));
  for (const name of names) {
    const id = FREE_EXAMPLE_IDS[name];
    assert.ok(id, `"${name}" is not in FREE_EXAMPLE_IDS — add it and check it`);
    assert.equal(getProviderById(id)?.hasFree, true, `${name} (${id}) is not flagged free`);
    const rows = FREE_MODEL_BUDGETS.filter((r) => r.provider === id);
    assert.ok(rows.length > 0, `${name} (${id}) has no free-catalog row`);
    assert.ok(
      rows.some((r) => r.freeType !== "discontinued"),
      `${name} (${id}): every free-catalog row is discontinued`
    );
  }
  assert.doesNotMatch(flat(PROMISE_PILLARS_COPY), /Mistral/);
  assert.doesNotMatch(JSON.stringify(TIER_CASCADE_TIERS), /Mistral/);
  // D51: "Antigravity" stays in the pillars.
  assert.match(flat(PROMISE_PILLARS_COPY), /Antigravity/);
});

// --- Task 11: the README ----------------------------------------------------------------------

type Claim = { key: string; start: number; end: number; text: string; via?: string };
type Section = { name: string; text: string };

const README = readFileSync("README.md", "utf8");
const FREE_TIERS = readFileSync("docs/reference/FREE_TIERS.md", "utf8");
const snapshot = loadFactsSnapshot() as { code: Record<string, unknown> };
const code = snapshot.code;
const BIG = String(code.rowSumTotalLabel);
const REAL = String(code.headlineSteadyLabel);
const LIVE = String(code.rowSumLiveLabel);

const STAR_INVITE =
  "★ [Like it? Star us on GitHub](https://github.com/cheaper-inference/OmniRoute)";
const PRICE_SENTENCE =
  "Other catalogs charge from US$ 19 a year to US$ 49 for lifetime access to live data. Here everything is free.";
const GROWTH_SENTENCE =
  "New free offers and promotions are added every week. Watch the real number grow on the Radar.";

/** Phrases no free-tier copy may carry (comparisons stay generic; no figure quoted from others). */
export const FORBIDDEN_PUBLIC_PHRASES: RegExp[] = [
  /10[.,]1\s*B/i,
  /\bmore than\b/i,
  /\bexceed/i,
  /\bbeats?\b/i,
  /\bsupera/i,
];

/** From `start` to the `nth` "\n## " after it (or the end). */
function upToHeading(content: string, start: number, nth: number): string {
  let at = start;
  for (let i = 0; i < nth; i++) {
    const next = content.indexOf("\n## ", at + 1);
    if (next === -1) return content.slice(start);
    at = next;
  }
  return content.slice(start, at);
}

/** The free-tier sections of the README or of the reference page, cut by stable markers. */
export function freeTierSections(content: string, file: "README.md" | "FREE_TIERS.md"): Section[] {
  const out: Section[] = [];
  if (file === "README.md") {
    const hero = content.split("\n").find((l) => l.includes("readme-hero.svg"));
    if (hero) out.push({ name: "hero", text: hero });
    for (const id of ["free-tokens", "ai-providers"]) {
      const at = content.indexOf(`<a id="${id}"></a>`);
      // The first "## " after the anchor is the section's own title.
      if (at !== -1) out.push({ name: id, text: upToHeading(content, at, 2) });
    }
    const radar = content.search(/\n## [^\n]*OmniRoute Radar/);
    if (radar !== -1) out.push({ name: "radar", text: upToHeading(content, radar + 1, 1) });
    return out;
  }
  for (const title of ["TL;DR", "Correction, November 2026", "What counts", "How we count"]) {
    const at = content.indexOf(`\n## ${title}`);
    if (at !== -1) out.push({ name: title, text: upToHeading(content, at + 1, 1) });
  }
  return out;
}

const readmeSections = freeTierSections(README, "README.md");
const section = (name: string) => {
  const found = readmeSections.find((x) => x.name === name);
  assert.ok(found, `README section ${name} not found`);
  return found.text;
};

function assertEveryFigureClassified(text: string, where: string) {
  const claims = [...locateFreeTokenClaims(text), ...locateGatedClaims(text)] as Claim[];
  for (const m of text.matchAll(/~\d+(?:[.,]\d+)?\s?[MB]\b/g)) {
    const start = m.index + 1;
    const covered = claims.some((c) => start >= c.start - 2 && start < c.end + 1);
    assert.ok(
      covered,
      `${where}: "${m[0]}" is not read by the counts gate (${text.slice(m.index, m.index + 60)})`
    );
  }
}

test("the free-tier sections are found", () => {
  for (const name of ["hero", "free-tokens", "radar", "ai-providers"]) {
    assert.ok(section(name).trim().length > 0, name);
  }
});

test("every ~N token figure in the free-tier sections is classified", () => {
  for (const { name, text } of readmeSections) {
    assertEveryFigureClassified(text, `README ${name}`);
    for (const c of locateFreeTokenClaims(text) as Claim[]) {
      if (c.text === BIG) assert.equal(c.key, "rowSum:total", `${name}: ${c.text}`);
      if (c.text === REAL) assert.equal(c.key, "headline:steady", `${name}: ${c.text}`);
    }
  }
  assert.ok(!README.includes(LIVE), "the live row sum stays on the method page");
});

test("the big figure never appears without its label and the real one", () => {
  const claims = locateFreeTokenClaims(README) as Claim[];
  const big = claims.filter((c) => c.key === "rowSum:total");
  assert.ok(big.length >= 3, "the README carries the big figure (hero, block, card alt)");
  for (const c of big) assert.ok(c.via === "label" || c.via === "short", `${c.text} via ${c.via}`);
  const v = checkRowSumPlacement(README, { methodPage: false });
  assert.equal(v.ok, true, v.detail);
  assert.doesNotMatch(README, /row by row|per live row/i);
  const pair = `${BIG} as others count · ${REAL} real`;
  const heroLine = section("hero");
  assert.ok(heroLine.includes(pair), "the hero alt carries the short pair");
  const cardAlt = README.split("\n").find((l) => l.includes("free-tier-budget.svg"));
  assert.ok(cardAlt?.includes(pair), "the card alt carries the short pair");
});

test("the big figure comes first, the real one right below, and both equal the card", () => {
  const block = section("free-tokens");
  const body = block.slice(block.indexOf("</div>"));
  const first = body.indexOf(BIG);
  const real = body.indexOf(REAL);
  assert.ok(first !== -1 && real > first, "big figure, then the real one");
  assert.doesNotMatch(body.slice(first + BIG.length, real), /~\d/, "nothing in between");
  const free = body.indexOf("Everything here is free. No paywall.", real);
  assert.ok(free > real, "then: Everything here is free");
  assert.ok(body.indexOf(STAR_INVITE, free) > free, "then: the star invite");
  const card = buildFreeTierBudgetCopy() as Record<string, string[]>;
  assert.equal(card.big[0], BIG);
  assert.equal(card.hero[0], REAL);
});

test("the big figure is never called capacity or available", () => {
  const claims = locateFreeTokenClaims(README) as Claim[];
  for (const c of claims.filter((x) => x.key === "rowSum:total")) {
    assert.doesNotMatch(
      README.slice(c.end, c.end + 200),
      /\b(?:capacity|available|you get)\b/i,
      c.text
    );
  }
  const steady = claims.filter((x) => x.key === "headline:steady");
  for (const m of README.matchAll(/what you can actually use/gi)) {
    assert.ok(
      steady.some((c) => m.index > c.end && m.index - c.end <= 200),
      '"what you can actually use" only right after the real figure'
    );
  }
});

test("the price sentence carries its check date and names no one", () => {
  const block = section("free-tokens");
  const at = block.indexOf(PRICE_SENTENCE);
  assert.ok(at !== -1, "the price sentence (D50) is in the free-tokens section");
  assert.match(block.slice(at, at + PRICE_SENTENCE.length + 200), /\d{4}-\d{2}-\d{2}/);
  for (const { name, text } of readmeSections) {
    for (const m of text.matchAll(/US\$/g)) {
      const s = text.indexOf(PRICE_SENTENCE);
      assert.ok(
        s !== -1 && m.index >= s && m.index < s + PRICE_SENTENCE.length,
        `${name}: US$ outside the price sentence`
      );
    }
  }
});

test("the growth sentence sits in the Radar section", () => {
  const radar = section("radar");
  assert.ok(radar.includes(GROWTH_SENTENCE));
  assert.ok(!/every day/i.test(radar));
});

test("the top of the README keeps its tool line", () => {
  const hero = section("hero");
  assert.match(hero, /Antigravity/);
  assert.match(hero, /FREE Claude \/ GPT \/ Gemini/);
});

test("no forbidden phrase in the free-tier copy", () => {
  const texts: Array<[string, string]> = [
    ...readmeSections.map((x): [string, string] => [`README ${x.name}`, x.text]),
    ...freeTierSections(FREE_TIERS, "FREE_TIERS.md").map((x): [string, string] => [
      `FREE_TIERS ${x.name}`,
      x.text,
    ]),
    ["HERO_COPY", flat(HERO_COPY)],
    ["card copy", flat(buildFreeTierBudgetCopy() as Record<string, string[]>)],
  ];
  for (const [where, text] of texts) {
    for (const re of FORBIDDEN_PUBLIC_PHRASES) assert.doesNotMatch(text, re, where);
  }
});

test("the retired supporter ceiling and the dead plans link are gone", () => {
  for (const s of ["approximately 3B", "radar.omniroute.online/planos", "~10B", "1.62B", "2.22B"]) {
    assert.ok(!README.includes(s), s);
  }
});

test("the audit date is the catalog date", () => {
  assert.ok(README.includes(`Catalog last audited on ${code.catalogDate}`));
});

test("the star invite asks, never conditions", () => {
  // Owner decision 2026-11-24: the invite is the bare line, without the note under it.
  const block = section("free-tokens");
  const quote = block
    .split("\n")
    .filter((l) => l.startsWith(">"))
    .join("\n");
  assert.ok(quote.includes(STAR_INVITE), "the invite is the fourth part of the block");
  assert.ok(!block.includes("Optional. Nothing in OmniRoute depends on it."));
  assert.doesNotMatch(quote, /unlock|in exchange|to get access|star to/i);
  assert.doesNotMatch(quote, /img\.shields\.io\/github\/stars/);
  // The badges (C13) sit under "Join the community", apart from the invite.
  const join = block.indexOf("Join the community");
  const stars = block.indexOf("img.shields.io/github/stars");
  assert.ok(join !== -1 && stars > join, "the star badges moved below Join the community");
});

/** GitHub's heading slug: lowercase, drop what is not a letter, digit, space or hyphen, spaces to "-". */
function slug(heading: string): string {
  return heading
    .replace(/<[^>]+>/g, "")
    .replace(/[*_`]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/ /g, "-");
}

// "#-omniroute" (Back to top) predates this change and does not resolve; it is not touched here.
const KNOWN_BROKEN_LINKS = new Set(["-omniroute"]);

test("stable anchors exist and every table-of-contents link resolves", () => {
  assert.ok(README.includes('<a id="free-tokens"></a>'));
  assert.ok(README.includes('<a id="ai-providers"></a>'));
  const ids = new Set([...README.matchAll(/<a id="([^"]+)"><\/a>/g)].map((m) => m[1]));
  for (const m of README.matchAll(/^#{1,4} (.+)$/gm)) ids.add(slug(m[1]));
  for (const m of README.matchAll(/\]\(#([^)]+)\)/g)) {
    if (KNOWN_BROKEN_LINKS.has(m[1])) continue;
    assert.ok(ids.has(m[1]), `#${m[1]} does not resolve`);
  }
});

test("the AgentRouter referral link stays (D53)", () => {
  assert.ok(README.includes("agentrouter.org/register?aff="));
});
