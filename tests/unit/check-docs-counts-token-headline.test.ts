// Free-token figures in the docs, read by kind (plan "Radar v2 — honest numbers", PR 3).
//
// The docs carry three token figures with different meanings: the real one (each shared quota
// counted once), the row-sum reading of the live catalog, and the big figure (every row added
// up, ended offers included — the way other catalogs count). The owner's decisions of
// 2026-11-21 (D47 and D48) put the big figure first, always with its label and always next to
// the real one. This file pins how the counts gate reads those figures (Task 9), how it judges
// them against the live catalog (Task 10) and where the big figure may appear (Task 11).
//
// Fixture strings are copied literally from the tree on 2026-11-23 (README.md,
// docs/reference/FREE_TIERS.md, docs/getting-started/FREE-TIERS-GUIDE.md) and from the README of
// PR #20421 (branch chore/derived-readme-round2-20261117). They are strings, never reads of the
// live files: the release refresh rewrites those numbers.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { formatTokenHeadline as formatCatalogTokenHeadline } from "@omniroute/open-sse/config/freeModelCatalog.ts";

type TokenKind =
  "headline:steady" | "headline:first" | "rowSum:live" | "rowSum:total" | "retiredShare";
type TokenClaim = {
  key: TokenKind;
  value: number;
  tokens: number;
  halfStep: number;
  text: string;
  start: number;
  end: number;
  via?: "label" | "short" | "method";
};
type Verdict = { ok: boolean; detail: string };
type Edit = { start: number; end: number; to: string };
type Totals = { s?: number; m?: number; g?: number; l?: number; t?: number; r?: number };
type Check = {
  label: string;
  actual: unknown;
  docKey: string;
  strict: boolean;
  scope: "derived" | "invariant" | "release-only";
  files: string[];
  requiredKeys?: string[];
  validate?: (content: string) => Verdict;
  extract?: (content: string) => { key?: string; value: unknown }[];
  plan?: (content: string) => { edits: Edit[]; manual: string[] };
};
type Facts = Record<string, unknown> & { code?: Record<string, unknown> | null };

const claimsLib = (await import("../../scripts/check/lib/derivedClaims.mjs")) as unknown as {
  locateFreeTokenClaims: (content: string) => TokenClaim[];
  locateHeadlineClaims: (content: string) => TokenClaim[];
  applyEdits: (content: string, edits: Edit[]) => string;
};
const gate = (await import("../../scripts/check/check-docs-counts-sync.mjs")) as unknown as {
  formatTokenHeadline: (tokens: number) => string;
  checkFreeTierHeadline: (content: string, totals: Totals) => Verdict;
  checkRowSumPlacement: (
    content: string,
    opts?: { totalPublic?: boolean; methodPage?: boolean }
  ) => Verdict;
  buildChecks: (opts?: { facts?: Facts }) => Check[];
  PR_MODE_FACTS: Facts;
  ROW_SUM_REQUIRED_FILES: string[];
  ROW_SUM_FORBIDDEN_FILES: string[];
  TOKEN_FIGURE_FREE_FILES: string[];
  ROW_SUM_TOTAL_PUBLIC: boolean;
};
const factsLib = (await import("../../scripts/release/facts.mjs")) as unknown as {
  loadFactsSnapshot: () => Facts | null;
};

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const locate = (content: string) => claimsLib.locateFreeTokenClaims(content);
const kinds = (content: string) => locate(content).map((c) => [c.key, c.value]);

test("the gate formats token figures exactly like the catalog", () => {
  for (const tokens of [
    0, 1, 499_999, 500_000, 92_780_000, 89_780_000, 162_000_000, 999_400_000, 999_600_000,
    11_349_500_000, 11_352_500_000, 11_502_500_000,
  ]) {
    assert.equal(gate.formatTokenHeadline(tokens), formatCatalogTokenHeadline(tokens), `${tokens}`);
  }

  for (const tokens of [-1, NaN, Infinity]) {
    assert.throws(() => gate.formatTokenHeadline(tokens), RangeError, `${tokens}`);
    assert.throws(() => formatCatalogTokenHeadline(tokens), RangeError, `${tokens}`);
  }
});

// --- Task 9: the typed locator ------------------------------------------------------------

// README.md on 2026-11-23.
const README_12 =
  '<img src="./docs/diagrams/readme-hero.svg" width="100%" alt="OmniRoute — Never stop coding. Every AI tool → 394 providers — 150+ free — through one endpoint. Claude Code, Codex, Cursor, Cline, Copilot & Antigravity into FREE Claude / GPT / Gemini with auto-fallback. RTK + Caveman stacked compression saves 15–95% tokens (~89% avg) — never hit limits. 394 AI providers · 150+ free tiers · ~1.62B free tokens/mo · 22 routing strategies · $0 to start."/>';
const README_18 = "## 💰 ~1.62B Tokens / Month Across Third-Party Free Tiers";
const README_24 =
  "> Stacking free tiers by hand is painful — dozens of SDKs, dozens of rate limits, and no idea how much you actually have. OmniRoute catalogs **465 free-tier entries across 34 recurring pool keys** and computes the token headline from the **17 pools with a published positive monthly budget plus five per-model Groq caps**, deduplicated by shared pool. Quotas that only open after a regional identity check (today: ModelScope) are shown apart, +~6M behind regional identity verification, and never summed into the headline. The result stays visible on the dashboard (`/dashboard/free-tiers`).";
const README_26 =
  '<img src="./docs/diagrams/free-tier-budget.svg" width="100%" alt="OmniRoute free-tier budget card: ~1.62B free tokens per month steady, up to ~2.22B in the first month with signup credits, from 34 documented recurring pool keys covering 465 cataloged free-tier entries behind one endpoint. Honest pool-deduped math — each shared pool counted once, including 17 recurring pools with a published positive monthly token budget plus five per-model Groq caps; 12 providers are marked avoid in the terms-risk catalog so you decide. Budget bar includes Mistral 1B, Nara 210M, LLM7 150M, xKiro 150M, Groq 30M (five per-model caps) and smaller pools, plus first-month signup credits and permanently-free no-token-cap providers surfaced separately so they never inflate the headline. Live used/remaining on /dashboard/free-tiers."/>';
const README_573_575 = [
  "The main free-tier headline remains **~1.62B tokens/month** from the documented,",
  "pool-deduplicated catalog above. Temporary provider signup credits can separately lift the first",
  "month to **~2.22B**. Radar is an optional, signed catalog overlay for people who want fresher",
].join("\n");

// README.md of PR #20421 (chore/derived-readme-round2-20261117). Lines 24, 26 and 630-632 are
// byte-identical to README.md:24, :26 and :573-575 above.
const PR20421_12 =
  '<img src="./docs/diagrams/readme-hero.svg" width="100%" alt="OmniRoute — Never stop coding. Every AI tool → 394 providers — 150+ with a free offer — through one endpoint. Claude Code, Codex, Cursor, Cline, Copilot & Antigravity into FREE Claude / GPT / Gemini with auto-fallback. RTK + Caveman stacked compression saves 15–95% tokens (~89% avg) — never hit limits. 394 AI providers · 150+ with a free offer · ~1.62B free tokens/mo · 22 routing strategies · $0 to start."/>';
const PR20421_18 = "## ~1.62B Tokens / Month Across Third-Party Free Tiers";
const PR20421_24 = README_24;
const PR20421_26 = README_26;
const PR20421_630_632 = README_573_575;
const PR20421_1001 =
  '    <td valign="top" width="25%"><b>~1.62B</b><br/><sub><b>Recurring free tokens / month</b></sub><br/><sub>Pool-deduplicated estimate across provider accounts; ~2.22B in the first month with signup credits. Not an OmniRoute allowance.</sub></td>';

// docs/reference/FREE_TIERS.md on 2026-11-23.
const FREE_TIERS_22 =
  "| **Documented recurring grant (steady)**     | **~1.62B**        | Free-tier **pools** (per-model catalog), each shared pool counted **once**. The live source behind `/api/free-tier/summary` and the dashboard's Free-Tier Budget page. **Use this number.**                                                                |";
const FREE_TIERS_23 =
  "| **+ first month with signup credits**       | **~2.22B**        | Steady + one-time signup credits (Z.AI 20M, DeepSeek 5M, …), deduped per account. **First month only** — does not recur.                                                                                                                                   |";
const FREE_TIERS_26 =
  "| **+ behind a regional identity check**      | **+~6M**          | `modelscope` (Alibaba Cloud binding + mainland-China real-name verification). Real recurring quota, exposed as `gatedRecurringTokens` / `gatedProviders` and on the dashboard. Never summed into the headline: +~6M behind regional identity verification. |";
const FREE_TIERS_27 =
  "| Theoretical ceiling (all rate limits, 24/7) | ~10B              | Sum of every provider rate limit extrapolated to non-stop use. **Not a guarantee** — do not headline this.                                                                                                                                                 |";
const FREE_TIERS_29 =
  "**Honest headline:** _OmniRoute aggregates **~1.62B documented free tokens per month** (up to ~2.22B in your first month with signup credits) across 34 free-tier pools — plus a long tail of permanently-free, no-cap providers — and RTK + Caveman compression (15–95% token savings) stretches that further._";
const FREE_TIERS_31 =
  "> **Why this dropped from the previous ~1.94B.** The 2026-06-17 refresh is an honesty correction, not a loss: `gemini` is now pool-deduped (was inflated by counting each Flash variant separately, 462M → 60M), `cloudflare-ai` corrected to its real 10k-Neurons/day (122M → 30M), `doubao` reclassified as a one-time signup credit (not recurring), and shut-down tiers removed (`chutes`/`phind`/`kluster` discontinued). Partly offset by `llm7` (correct 5M/day → 150M) and new free providers (Kilo, OpenCode Zen, Z.AI GLM-Flash).";
const FREE_TIERS_132 =
  "- **Each shared pool is counted once.** Mistral's free plan is one 1B/month allowance per organization; listing it under five models does not make it 5B. Summed per model, our own catalog would read **~7.4B** (recomputed on 2026-09-03; this figure is not CI-gated — re-measure it whenever the catalog changes) — the headline says **~1.47B** because that is what one account of each provider can actually spend.";

// docs/getting-started/FREE-TIERS-GUIDE.md on 2026-11-23.
const GUIDE_35 =
  "| **Cloudflare AI** | Workers AI catalog                                                             | Audited pool estimates ~30M tokens/month from published usage units                                              | Cloudflare account and API credentials                                                   |";
const GUIDE_37 =
  "| **Groq**          | Llama, GPT-OSS, and Qwen models                                                | Audited pool estimates ~15M tokens/month                                                                         | Groq API key; rate limits apply                                                          |";
const GUIDE_167 =
  "| Recurring quantified grant     | **~1.62B tokens/month** | Shared pools counted once; excludes uncapped providers from the sum |";
const GUIDE_168 =
  "| First month with signup grants |       **~2.22B tokens** | Recurring total plus one-time and recurring credits                 |";

const STEADY_162 = ["headline:steady", 1.62e9];
const FIRST_222 = ["headline:first", 2.22e9];

test("token-headline locator classifies every tilde figure of today's docs", () => {
  const cases: [string, string, (string | number)[][]][] = [
    ["README.md:12", README_12, [STEADY_162]],
    ["README.md:18", README_18, [STEADY_162]],
    ["README.md:24", README_24, []],
    ["README.md:26", README_26, [STEADY_162, FIRST_222]],
    ["README.md:573-575", README_573_575, [STEADY_162, FIRST_222]],
    ["#20421 README.md:12", PR20421_12, [STEADY_162]],
    ["#20421 README.md:18", PR20421_18, [STEADY_162]],
    ["#20421 README.md:24", PR20421_24, []],
    ["#20421 README.md:26", PR20421_26, [STEADY_162, FIRST_222]],
    ["#20421 README.md:630-632", PR20421_630_632, [STEADY_162, FIRST_222]],
    ["#20421 README.md:1001", PR20421_1001, [STEADY_162, FIRST_222]],
    ["FREE_TIERS.md:22", FREE_TIERS_22, [STEADY_162]],
    ["FREE_TIERS.md:23", FREE_TIERS_23, [FIRST_222]],
    ["FREE_TIERS.md:26", FREE_TIERS_26, []],
    ["FREE_TIERS.md:27 (theoretical ceiling)", FREE_TIERS_27, []],
    ["FREE_TIERS.md:29", FREE_TIERS_29, [STEADY_162, FIRST_222]],
    ["FREE_TIERS.md:31 (historical figure)", FREE_TIERS_31, []],
    ["FREE_TIERS.md:132 (per-model sum, old figure)", FREE_TIERS_132, []],
    ["FREE-TIERS-GUIDE.md:35 (per provider)", GUIDE_35, []],
    ["FREE-TIERS-GUIDE.md:37 (per provider)", GUIDE_37, []],
    ["FREE-TIERS-GUIDE.md:167", GUIDE_167, [STEADY_162]],
    ["FREE-TIERS-GUIDE.md:168", GUIDE_168, [FIRST_222]],
  ];
  for (const [where, content, expected] of cases) {
    assert.deepEqual(kinds(content), expected, where);
  }

  // README.md:18 — the value is in tokens and the half step is half a unit of the last digit.
  const [title] = locate(README_18);
  assert.equal(title.tokens, 1.62e9);
  assert.equal(title.halfStep, 5e6);
  assert.equal(title.text, "~1.62B");
  assert.equal(README_18.slice(title.start, title.end), "1.62");

  // New figures, in M and with a comma.
  const real = locate("~93M documented free tokens/month");
  assert.deepEqual(
    real.map(({ key, value, halfStep }) => ({ key, value, halfStep })),
    [{ key: "headline:steady", value: 93e6, halfStep: 5e5 }]
  );
  const struck = locate("<del>~11,4B somados linha por linha</del>");
  assert.deepEqual(
    struck.map(({ key, value, via }) => ({ key, value, via })),
    [{ key: "rowSum:total", value: 11.4e9, via: "method" }]
  );
  assert.deepEqual(kinds("~162M summed per live row"), [["rowSum:live", 162e6]]);
  const share = locate("98.6% from offers that no longer exist");
  assert.deepEqual(
    share.map(({ key, value, halfStep }) => ({ key, value, halfStep })),
    [{ key: "retiredShare", value: 98.6, halfStep: 0.05 }]
  );
});

// Decision of the owner, 2026-11-21 (D47 and D48).
test("the big figure with its label is never read as the real one", () => {
  const block =
    "~11.4B free tokens / month\n  counted the way other catalogs count: every row added up, ended offers included";
  const plain = locate(block);
  assert.equal(plain.length, 1, JSON.stringify(plain));
  assert.equal(plain[0].key, "rowSum:total");
  assert.equal(plain[0].value, 11.4e9);
  assert.equal(plain[0].via, "label");
  assert.ok(!plain.some((c) => c.key === "headline:steady"));

  const marked = locate(
    "**~11.4B free tokens / month**\n> <sub>counted the way other catalogs count"
  );
  assert.deepEqual(
    marked.map(({ key, value, via }) => ({ key, value, via })),
    [{ key: "rowSum:total", value: 11.4e9, via: "label" }]
  );

  const realToday = locate("~93M real today");
  assert.deepEqual(
    realToday.map(({ key, value, halfStep }) => ({ key, value, halfStep })),
    [{ key: "headline:steady", value: 93e6, halfStep: 5e5 }]
  );

  const pair = locate("~11.4B as others count · ~93M real");
  assert.deepEqual(
    pair.map(({ key, value, via }) => ({ key, value, ...(via ? { via } : {}) })),
    [
      { key: "rowSum:total", value: 11.4e9, via: "short" },
      { key: "headline:steady", value: 93e6 },
    ]
  );

  assert.equal(locate("<del>~11,4B somados linha por linha</del>")[0].via, "method");

  // Without the label, the big figure reads as the real one, so the judge (Task 10) rejects it.
  assert.deepEqual(kinds("~11.4B free tokens / month"), [["headline:steady", 11.4e9]]);
});

test("locateHeadlineClaims keeps only the headline kinds, valued in tokens", () => {
  const content = `${FREE_TIERS_29}\n~11.4B as others count · ~162M summed per live row`;
  const headline = claimsLib.locateHeadlineClaims(content);
  assert.deepEqual(
    headline.map((c) => [c.key, c.value]),
    [STEADY_162, FIRST_222]
  );
  for (const c of headline) assert.equal(content.slice(c.start, c.end), c.text.slice(1, -1));
});

test("the locator stays linear on hostile input (bounded windows, no nested repetition)", () => {
  const hostile = `${"~1".repeat(20_000)}${"<b>".repeat(20_000)}${" ".repeat(20_000)}~9B`;
  const started = process.hrtime.bigint();
  locate(hostile);
  locate(`${"~9.9B **".repeat(10_000)}free`);
  const ms = Number(process.hrtime.bigint() - started) / 1e6;
  assert.ok(ms < 2_000, `locator took ${ms} ms`);
});

// --- Task 10: judged by kind and by printed precision ------------------------------------

const T = {
  s: 92_780_000,
  m: 156_280_000,
  g: 6_000_000,
  l: 162_000_000,
  t: 11_352_500_000,
  r: 0.9857,
};
const GATED_SUFFIX = " +~6M behind regional identity verification";
const checkHeadline = (content: string, totals: Totals) =>
  gate.checkFreeTierHeadline(content, totals);

test("each free-token claim is judged against its own kind, within its printed precision", () => {
  for (const ok of [
    "~93M free tokens/month",
    "~0.09B free tokens/month",
    "~0.1B free tokens/month",
    "~11.4B summed row by row",
    "~11,4B somados linha por linha",
    "~162M summed per live row",
    "98.6% from offers that no longer exist",
    "up to ~156M in your first month",
    // Decision of the owner, 2026-11-21 (D47 and D48): the block and the short pair.
    "~11.4B free tokens / month\n  counted the way other catalogs count: every row added up, ended offers included",
    "~93M real today",
    "~11.4B as others count · ~93M real",
  ]) {
    const v = checkHeadline(`${ok}${GATED_SUFFIX}`, T);
    assert.equal(v.ok, true, `${ok}: ${v.detail}`);
  }
  for (const bad of [
    "~0.05B free tokens/month",
    "~0.14B free tokens/month",
    "~90M free tokens/month",
    "~250M free tokens/month",
    "~12.0B summed row by row",
    "~156M free tokens/month",
    "~1.62B Tokens / Month",
    "~12.0B as others count · ~93M real",
    "~11.4B as others count · ~90M real",
    // A big figure without its label is read as the real one and fails.
    "~11.4B free tokens / month",
  ]) {
    const v = checkHeadline(`${bad}${GATED_SUFFIX}`, T);
    assert.equal(v.ok, false, bad);
    assert.match(v.detail, /live catalog computes/, bad);
  }
});

test("a kind without a finite live total is not judged", () => {
  const onlyReal = { s: T.s, g: T.g };
  assert.equal(
    checkHeadline(`~12.0B as others count · ~93M real${GATED_SUFFIX}`, onlyReal).ok,
    true
  );
  assert.equal(checkHeadline(`~90M real${GATED_SUFFIX}`, onlyReal).ok, false);
  assert.equal(checkHeadline(`~5B free tokens/month${GATED_SUFFIX}`, {}).ok, true);
  assert.equal(checkHeadline("97.0% from retired rows", { r: T.r }).ok, false);
  assert.equal(checkHeadline("99% from retired rows", { r: T.r }).ok, true);
});

const freeTierChecks = (facts: Facts) =>
  gate.buildChecks({ facts }).filter((c) => c.docKey === "free-tier headline");

test("headline checks build with absent facts", () => {
  const prFacts = { ...gate.PR_MODE_FACTS, code: {} };
  assert.doesNotThrow(() => gate.buildChecks({ facts: prFacts }));
  const snapshot = factsLib.loadFactsSnapshot();
  assert.ok(snapshot, "docs/reference/derived-facts.json is missing");
  assert.doesNotThrow(() => gate.buildChecks({ facts: snapshot }));

  const checks = freeTierChecks(prFacts);
  assert.deepEqual(
    checks.map((c) => c.files),
    [["README.md"], ["docs/reference/FREE_TIERS.md"], ["docs/getting-started/FREE-TIERS-GUIDE.md"]]
  );
  for (const c of checks) {
    assert.equal(c.actual, "n/a");
    assert.equal(c.scope, "derived");
    assert.doesNotThrow(() => c.validate?.(`${FREE_TIERS_29}${GATED_SUFFIX}`));
  }
  assert.deepEqual(
    checks.map((c) => c.requiredKeys ?? []),
    [["gated", "headline:steady"], ["gated"], []]
  );
});

// Fixtures per file: today's lines and the #20421 README, pasted above.
const README_TODAY = [README_12, README_18, README_24, README_26, README_573_575].join("\n\n");
const README_20421 = [
  PR20421_12,
  PR20421_18,
  PR20421_24,
  PR20421_26,
  PR20421_630_632,
  PR20421_1001,
].join("\n\n");
const FREE_TIERS_TODAY = [
  FREE_TIERS_22,
  FREE_TIERS_23,
  FREE_TIERS_26,
  FREE_TIERS_27,
  FREE_TIERS_29,
  FREE_TIERS_31,
  FREE_TIERS_132,
].join("\n");
const GUIDE_TODAY = [GUIDE_35, GUIDE_37, GUIDE_167, GUIDE_168].join("\n");

test("today's numbers keep today's docs and the #20421 README green", () => {
  const today = { s: 1_623_200_000, m: 2_212_700_000, g: 6_000_000 };
  for (const [where, content] of [
    ["README.md", README_TODAY],
    ["#20421 README.md", README_20421],
    ["FREE_TIERS.md", FREE_TIERS_TODAY],
  ]) {
    const v = checkHeadline(content, today);
    assert.equal(v.ok, true, `${where}: ${v.detail}`);
  }
  assert.equal(checkHeadline(GUIDE_TODAY, { s: today.s, m: today.m }).ok, true);

  const snapshot = factsLib.loadFactsSnapshot() as Facts;
  const facts = {
    ...snapshot,
    code: { ...snapshot.code, headlineSteady: today.s, headlineFirst: today.m },
  };
  const fixtureOf: Record<string, string[]> = {
    "README.md": [README_TODAY, README_20421],
    "docs/reference/FREE_TIERS.md": [FREE_TIERS_TODAY],
    "docs/getting-started/FREE-TIERS-GUIDE.md": [GUIDE_TODAY],
  };
  const checks = freeTierChecks(facts);
  assert.equal(checks.length, 3);
  for (const c of checks) {
    assert.equal(c.actual, "~1.6B");
    for (const file of c.files) {
      for (const content of fixtureOf[file]) {
        const v = c.validate?.(content);
        assert.equal(v?.ok, true, `${file}: ${v?.detail}`);
      }
    }
  }

  // The README check also demands the real figure: a README without it fails.
  const readme = checks.find((c) => c.files.includes("README.md"));
  assert.equal(readme?.validate?.(README_24).ok, false);
  assert.match(readme?.validate?.(README_24).detail ?? "", /headline:steady/);
  // A stale real figure is still caught on a file that carries it.
  const stale = { ...facts, code: { ...facts.code, headlineSteady: 92_780_000 } };
  for (const c of freeTierChecks(stale).filter((x) => !x.files.includes("README.md"))) {
    const content = fixtureOf[c.files[0]][0];
    assert.equal(c.validate?.(content).ok, false, c.files[0]);
  }
});

// --- Task 11: the pair, files without figures, comparisons -------------------------------

const place = (content: string, opts?: { totalPublic?: boolean; methodPage?: boolean }) =>
  gate.checkRowSumPlacement(content, opts);

const D47_BLOCK =
  "~11.4B free tokens / month\n  counted the way other catalogs count: every row added up, ended offers included\n\n~93M real today\n  each shared quota counted once: what you can actually use";
const SHORT_PAIR = "~11.4B as others count · ~93M real";

const UPDATED_TOTALS = { headlineSteady: 89_780_000, rowSumTotal: 11_349_500_000 };

function headlineCheck(file: string, code: Record<string, unknown> = UPDATED_TOTALS) {
  const check = freeTierChecks({ ...gate.PR_MODE_FACTS, code }).find((c) => c.files.includes(file));
  assert.ok(check?.plan && check.validate);
  return { plan: check.plan, validate: check.validate };
}

test("the README plan refreshes the Markdown pair and alt figures in place", () => {
  const { plan, validate } = headlineCheck("README.md");
  for (const content of [D47_BLOCK, `<img alt="… ${SHORT_PAIR} …">`]) {
    assert.equal(validate(content).ok, false);
    const { edits, manual } = plan(content);
    assert.deepEqual(manual, []);
    assert.deepEqual(
      edits.map(({ start, end, to }) => [content.slice(start, end), to]),
      [
        ["~11.4B", "~11.3B"],
        ["~93M", "~90M"],
      ]
    );
    const after = claimsLib.applyEdits(content, edits);
    assert.equal(after, content.replace("~11.4B", "~11.3B").replace("~93M", "~90M"));
    assert.equal(validate(after).ok, true);
    assert.deepEqual(plan(after), { edits: [], manual: [] });
  }
  assert.deepEqual(plan("~11.4B as others count · ~90M real"), { edits: [], manual: [] });
  const separate = '<img alt="~11.4B as others count · ~90M real">\n\n~93M real today';
  assert.equal(
    claimsLib.applyEdits(separate, plan(separate).edits),
    separate.replace("~93M", "~90M")
  );
});

test("the headline plan skips claims without a finite catalog value", () => {
  const { plan } = headlineCheck("README.md", {
    headlineSteady: 89_780_000,
    rowSumTotal: Infinity,
  });
  assert.equal(
    claimsLib.applyEdits(SHORT_PAIR, plan(SHORT_PAIR).edits),
    "~11.4B as others count · ~90M real"
  );
});

test("the method page refreshes the other token kinds and retired share at their anchors", () => {
  const { plan, validate } = headlineCheck("docs/reference/FREE_TIERS.md", {
    headlineFirst: 153_280_000,
    rowSumLive: 1_250_000_000,
    rowSumRetiredShare: 0.9761,
  });
  const content =
    "up to **~156M** in your first month. **~162 M** summed per live row. " +
    "98.6% from retired rows. Historical: ~156M.";
  const { edits, manual } = plan(content);
  assert.deepEqual(manual, []);
  const after = claimsLib.applyEdits(content, edits);
  assert.equal(
    after,
    "up to **~153M** in your first month. **~1.3B** summed per live row. " +
      "97.6% from retired rows. Historical: ~156M."
  );
  assert.equal(validate(after).ok, true);
});

test("the headline plan keeps missing steady and unresolved gated claims manual", () => {
  const { plan } = headlineCheck("README.md", { ...UPDATED_TOTALS, freeGated: 6_000_000 });
  const missing = plan("~12.0B as others count");
  assert.equal(missing.edits.length, 1);
  assert.match(missing.manual.join(" "), /missing gated figure.*no headline:steady/);
  assert.doesNotMatch(missing.manual.join(" "), /stale free-token figure/);

  const stale = plan(`${SHORT_PAIR} +~7M behind regional identity verification`);
  assert.equal(stale.edits.length, 2);
  assert.match(stale.manual.join(" "), /stale gated figure/);
});

test("the big figure never travels without its label and the real one", () => {
  assert.equal(place(D47_BLOCK).ok, true, place(D47_BLOCK).detail);
  assert.equal(place(SHORT_PAIR).ok, true);
  assert.equal(place('<img alt="… ~11.4B as others count · ~93M real …">').ok, true);
  assert.equal(place("## ~11.4B as others count · ~93M real").ok, true);

  const alone = place("~11.4B as others count");
  assert.equal(alone.ok, false);
  assert.match(alone.detail, /without the real figure in the same block/);
  assert.equal(place('<img alt="~11.4B as others count"> ~93M real').ok, false);
  assert.equal(place("## ~11.4B as others count\n~93M real today").ok, false);
  const far = `~11.4B as others count\n\n${"x".repeat(601)}\n\n~93M real today`;
  assert.equal(place(far).ok, false);
  assert.equal(place(`~11.4B as others count\n${"x".repeat(500)} ~93M real today`).ok, true);

  const method = "~93M free tokens/month. ~11.4B summed row by row";
  const unlabeled = place(method, { methodPage: false });
  assert.equal(unlabeled.ok, false);
  assert.match(unlabeled.detail, /without its label/);
  assert.equal(place(method).ok, false, "methodPage defaults to false");
  assert.equal(place(method, { methodPage: true }).ok, true);

  const live = "~93M real today … ~162M summed per live row";
  assert.equal(place(live).ok, true);
  assert.equal(place(`## ${live}`).ok, false);
  assert.equal(place(`<img alt="${live}">`).ok, false);
  assert.equal(place("~162M summed per live row").ok, false);
});

test("comparisons stay generic around the big figure", () => {
  assert.equal(place(`${SHORT_PAIR}, more than anyone`).ok, false);
  assert.equal(place(`${SHORT_PAIR}; nothing else to add`).ok, true);
});

test("a third-party headline figure is refused", () => {
  assert.equal(place("Other catalogs print 10.1B.").ok, false);
  assert.equal(place("Other catalogs print 10,1 B.").ok, false);
  const placement = gate
    .buildChecks({ facts: factsLib.loadFactsSnapshot() as Facts })
    .filter((c) => c.scope === "invariant" && /^Row-sum figure placement/.test(c.label));
  const files = placement.flatMap((c) => c.files).sort();
  assert.deepEqual(files, [
    "README.md",
    "docs/getting-started/FREE-TIERS-GUIDE.md",
    "docs/reference/FREE_TIERS.md",
  ]);
  for (const c of placement) {
    assert.equal(c.validate?.("A list elsewhere reads 10.1B.").ok, false, c.label);
  }
});

const invariants = () =>
  gate
    .buildChecks({ facts: factsLib.loadFactsSnapshot() as Facts })
    .filter((c) => c.scope === "invariant");

test("row-sum file lists follow the owner's decision of 2026-11-21", () => {
  assert.deepEqual(gate.ROW_SUM_REQUIRED_FILES, ["README.md", "docs/reference/FREE_TIERS.md"]);
  assert.deepEqual(gate.TOKEN_FIGURE_FREE_FILES, ["package.json", "llm.txt"]);
  assert.equal(gate.ROW_SUM_TOTAL_PUBLIC, true);
  for (const file of ["package.json", "llm.txt"]) {
    assert.ok(gate.ROW_SUM_FORBIDDEN_FILES.includes(file), file);
  }
  assert.ok(!gate.ROW_SUM_FORBIDDEN_FILES.includes("docs/diagrams/readme-hero.svg"));
});

test("package.json, llm.txt and MCP/A2A outputs carry no big figure", () => {
  const all = invariants();
  const keptOut = all.find((c) => /^Row-sum figure kept out/.test(c.label));
  const figureFree = all.find((c) => /^No free-token figure/.test(c.label));
  assert.ok(keptOut && figureFree);
  assert.deepEqual(figureFree.files, ["package.json", "llm.txt"]);
  for (const file of ["package.json", "llm.txt"]) assert.ok(keptOut.files.includes(file));
  assert.ok(keptOut.files.some((f) => f.startsWith("open-sse/mcp-server/") && f.endsWith(".ts")));
  assert.ok(keptOut.files.some((f) => f.startsWith("src/lib/a2a/") && f.endsWith(".ts")));
  assert.ok(!keptOut.files.includes("docs/diagrams/readme-hero.svg"));

  const pkg = (description: string) => JSON.stringify({ name: "omniroute", description });
  for (const figure of [SHORT_PAIR, "~93M free tokens/month"]) {
    assert.equal(figureFree.validate?.(pkg(figure)).ok, false, `package.json: ${figure}`);
    assert.equal(
      figureFree.validate?.(`# OmniRoute\n\n${figure}\n`).ok,
      false,
      `llm.txt: ${figure}`
    );
  }
  assert.equal(keptOut.validate?.(`const text = "${SHORT_PAIR}";`).ok, false);
  assert.equal(keptOut.validate?.('const text = "~162M summed per live row";').ok, false);
  assert.equal(keptOut.validate?.('const text = "~93M real";').ok, true);
});

test("the row-sum invariants pass on today's tree", () => {
  const rowSum = invariants().filter((c) => /^(Row-sum figure|No free-token figure)/.test(c.label));
  assert.equal(rowSum.length, 5, rowSum.map((c) => c.label).join(", "));
  for (const c of rowSum) {
    assert.equal(c.strict, true, c.label);
    for (const file of c.files) {
      const content = readFileSync(path.join(ROOT, file), "utf8");
      const v = c.validate?.(content);
      assert.equal(v?.ok, true, `${c.label} — ${file}: ${v?.detail}`);
    }
  }
  const required = rowSum.find((c) => /^Row-sum figure required/.test(c.label));
  assert.deepEqual(required?.files, ["README.md", "docs/reference/FREE_TIERS.md"]);
  assert.equal(required?.validate?.("~93M real today").ok, false);
  assert.equal(required?.validate?.(SHORT_PAIR).ok, true);
});

test("the big figure leaves every surface when the owner retires it", () => {
  const retired = { totalPublic: false };
  assert.equal(place(SHORT_PAIR, retired).ok, false);
  assert.equal(place("98.6% from offers that no longer exist", retired).ok, false);
  assert.equal(place("~93M real today", retired).ok, true);
  const shown = { totalPublic: true };
  assert.equal(place(SHORT_PAIR, shown).ok, true);
  assert.equal(place("98.6% from offers that no longer exist", shown).ok, true);
  assert.equal(place("~93M real today", shown).ok, true);
});

test("the README and FREE_TIERS must keep the row-sum figure", () => {
  assert.ok(gate.ROW_SUM_REQUIRED_FILES.includes("README.md"));
  assert.ok(gate.ROW_SUM_REQUIRED_FILES.includes("docs/reference/FREE_TIERS.md"));
  const required = invariants().find((c) => /^Row-sum figure required/.test(c.label));
  assert.ok(required?.validate);
  const readme = readFileSync(path.join(ROOT, "README.md"), "utf8");
  const freeTiers = readFileSync(path.join(ROOT, "docs/reference/FREE_TIERS.md"), "utf8");
  assert.equal(required.validate(readme).ok, true);
  assert.equal(required.validate(freeTiers).ok, true);
  // The README with every big figure removed (block, title, alt texts keep only the real one).
  const withoutBig = readme
    .replace(/~\d+(?:\.\d+)?B free tokens \/ month/g, "free tokens / month")
    .replace(/~\d+(?:\.\d+)?B as [Oo]thers [Cc]ount · /g, "");
  assert.equal(required.validate(withoutBig).ok, false);
  assert.equal(place(readme, { methodPage: false }).ok, true);
  assert.equal(place(freeTiers, { methodPage: true }).ok, true);
  // The hero alt that lost its real figure breaks the pair (D48).
  const heroAt = readme.indexOf("readme-hero.svg");
  const lineEnd = readme.indexOf("\n", heroAt);
  const heroLine = readme.slice(readme.lastIndexOf("\n", heroAt) + 1, lineEnd);
  const broken = readme.replace(heroLine, heroLine.replace(/ · ~\d+(?:\.\d+)?M real/, ""));
  assert.notEqual(broken, readme);
  assert.equal(place(broken, { methodPage: false }).ok, false);
});
