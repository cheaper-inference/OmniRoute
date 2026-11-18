// scripts/check/lib/derivedClaims.mjs
//
// Claim LOCATORS for the docs-counts gate (scripts/check/check-docs-counts-sync.mjs).
//
// Plan "derived numbers and texts resolved only at release" (2026-11-13): every derived number
// in the docs is checked in two ways —
//   release  the claim must equal the live code (strict, the gate's historical behaviour);
//   pr       the claim must not be a value the PR itself wrote (diff against the PR base).
// Both views read claims through the SAME locator, so a sentence the release mode accepts or
// rejects is the exact sentence the PR mode diffs and the release refresh rewrites. Each locator
// returns the span of the VALUE (`start`/`end` in UTF-16 offsets of `content`) besides the value
// itself, which is what `planDerivedRewrites` splices.
//
// Everything here is pure (strings in, arrays out). The validators in the gate keep their exact
// accept/reject rules; they now map these richer claims back to the shapes their exports have
// always returned.

/** RegExp clone with the `d` (hasIndices) flag: same source and matching, plus capture spans. */
function withIndices(pattern) {
  if (pattern.hasIndices) return pattern;
  return new RegExp(pattern.source, `${pattern.flags}d`);
}

/** Span of capture group `group` of a match produced by a `d`-flagged RegExp. */
function groupSpan(m, group = 1) {
  const span = m.indices?.[group];
  return span ? { start: span[0], end: span[1] } : { start: -1, end: -1 };
}

/** 1-based line number of `index` in `content`. */
export function lineOf(content, index) {
  if (index < 0) return 0;
  let line = 1;
  for (let i = content.indexOf("\n"); i !== -1 && i < index; i = content.indexOf("\n", i + 1)) {
    line++;
  }
  return line;
}

// --- Generic numeric claims --------------------------------------------------
// Docs legitimately carry numbers that are NOT the aggregate being gated (per-module tool
// counts like "Memory tool definitions (3 tools)", the CLI catalog's "33 tools (25 CLI Code's
// ...)" next to the MCP total). So every check declares what to skip rather than assuming any
// "N tools" is the claim.
export function locateNumberClaims(content, { pattern, skipBefore, skipAfter }) {
  const claims = [];
  for (const m of content.matchAll(withIndices(pattern))) {
    const before = content.slice(Math.max(0, m.index - 40), m.index);
    const after = content.slice(m.index + m[0].length, m.index + m[0].length + 40);
    if (skipBefore && skipBefore.test(before)) continue;
    if (skipAfter && skipAfter.test(after)) continue;
    claims.push({ value: Number(m[1]), text: m[0].trim(), index: m.index, ...groupSpan(m) });
  }
  return claims;
}

// --- Product version claims ----------------------------------------------------------------
// G-06 (#15159): the original list matched only TWO literal phrasings, so the gate saw at most
// one claim per file and four stale strings shipped through it — README.md "reported by
// OmniRoute 3.8.51", the compatibility table's "**v3.8.50**", "Recent highlights from v3.8.20
// → v3.8.50", and llm.txt's "## Key Features (v3.8.50)".
//
// The load-bearing lesson: fixing those four STRINGS is not enough. Any new phrasing nobody
// anticipated slips through again.
//
// The subtlety that makes widening safe: a version NUMBER alone is not a defect. `v3.8.49` in a
// compatibility table, `v3.9.0 LTS` in a roadmap, and the `v3.8.20` end of a "from X → Y" range
// are all CORRECT. Only a claim that asserts which version is CURRENT is checkable. So each
// pattern below is anchored to a context that marks the version as the current one, and
// captures exactly the asserting version:
//
//   1. the product name immediately before it   "OmniRoute 3.8.51"
//   2. an explicit "Current version:" label
//   3. a bold range — emphasis picks out the target, so capture the SECOND
//      endpoint ("**v3.8.20 → v3.8.50**" asserts the right one is current)
//   4. a single bold version — emphasis marks the notable/current one
//      (outside markdown table rows; see isTableRowAt below)
//   5. a version inside a heading's parentheses ("## Key Features (v3.8.50)")
//   6. an inline range's target ("from v3.8.20 → v3.8.50")
//   7. a backticked floor ("`v3.8.51+`") — a floor below current understates
//      what users on that version actually get
//
// A naive `/\d+\.\d+\.\d+/` would redden on Node (22.22.2), TypeScript and every dependency
// version; that was the failure mode avoided here.
//
// scripts/release/bump-version-claims.mjs (`findVersionClaims`) carries the same seven patterns
// for the mechanical cycle bump; tests/unit/check-docs-counts-pr-mode.test.ts proves both find
// the same spans on the real README.md and llm.txt. This copy keeps the gate's own semantics:
// claims are NOT de-duplicated by span (the release report counts them as it always did).
const SEMVER = String.raw`\d+\.\d+\.\d+`;
// Written as ordinary escaped strings, NOT String.raw templates: a template literal ending in
// `\*\*` immediately before the closing backtick makes the `**` ambiguous to the reader and easy
// to corrupt (it once produced `s***` and a "Nothing to repeat" SyntaxError at import time).
const BOLD = "\\*\\*";
const ARROW = "(?:\\u2192|->|\\u2014|\\u2013)";

function versionPatterns() {
  return [
    // 1. product-named
    new RegExp(`OmniRoute\\s+v?(${SEMVER})`, "gd"),
    // 2. explicit label
    new RegExp(`[Cc]urrent\\s+version:?\\s*\\**\\s*v?(${SEMVER})`, "gd"),
    // 3. bold range — capture the TARGET (last endpoint)
    new RegExp(`${BOLD}\\s*v?${SEMVER}\\s*${ARROW}\\s*v?(${SEMVER})\\s*${BOLD}`, "gd"),
    // 4. single bold version
    new RegExp(`${BOLD}\\s*v?(${SEMVER})\\s*${BOLD}`, "gd"),
    // 5. heading with a parenthesised/backticked version
    new RegExp(`^#{1,6}[^\\n]*?[\\(\\\`]\\s*v?(${SEMVER})`, "gmd"),
    // 6. inline range target
    new RegExp(`v${SEMVER}\\s*${ARROW}\\s*v?(${SEMVER})`, "gd"),
    // 7. backticked floor, e.g. `v3.8.51+`
    new RegExp("\\`\\s*v?(" + SEMVER + ")\\s*\\+\\s*\\`", "gd"),
  ];
}

// Ranges are matched by patterns 3 and 6, but their LEFT endpoint also looks like a plain
// bold/inline version. Record the ranges first and ignore any other pattern's match that falls
// inside one, so "**v3.8.20 → v3.8.52**" yields a single claim (3.8.52) instead of also
// claiming 3.8.20.
const RANGE_SOURCE = `v?${SEMVER}\\s*${ARROW}\\s*v?${SEMVER}`;

/** A match whose line, before it, starts with `|` sits in a markdown table row. */
export function isTableRowAt(content, index) {
  const lineStart = content.lastIndexOf("\n", index - 1) + 1;
  return content.slice(lineStart, index).trimStart().startsWith("|");
}

export function locateVersionClaims(content) {
  const patterns = versionPatterns();
  const rangeSpans = [];
  for (const m of content.matchAll(new RegExp(RANGE_SOURCE, "g"))) {
    rangeSpans.push([m.index ?? 0, (m.index ?? 0) + m[0].length]);
  }
  const insideRange = (index) => rangeSpans.some(([s, e]) => index >= s && index < e);

  const claims = [];
  patterns.forEach((pattern, p) => {
    for (const m of content.matchAll(pattern)) {
      const index = m.index ?? 0;
      // Patterns 3 and 6 capture a range's TARGET, which legitimately sits inside the range
      // span. Every other match inside a range is that range's left endpoint being
      // double-counted — skip it.
      const isRangeTarget = p === 2 || p === 5;
      if (insideRange(index) && !isRangeTarget) continue;
      // A bold version inside a markdown TABLE row is a column marker, not a current-version
      // claim: the README compatibility table bolds the last SHIPPED release
      // (`| v3.8.50 | **v3.8.51** | \`v3.8.52+\` |`) while package.json already carries the
      // in-development version. In such a row the current version is asserted by the
      // backticked floor (pattern 7), which is still checked.
      if (p === 3 && isTableRowAt(content, index)) continue;
      claims.push({ value: m[1], text: m[0].trim(), index, pattern: p + 1, ...groupSpan(m) });
    }
  });
  return claims;
}

// --- Coverage floor claims -----------------------------------------------------------------
// "60/60/60/60", "67.33 / 67.33 / 72.02 / 65.08", "60 / 60 / 60 / 60".
const COVERAGE_FLOOR_SOURCE = String.raw`(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)`;

export function locateCoverageFloorClaims(content) {
  const claims = [];
  for (const m of content.matchAll(new RegExp(COVERAGE_FLOOR_SOURCE, "gd"))) {
    const values = [m[1], m[2], m[3], m[4]].map(Number);
    claims.push({
      values,
      // One comparable value per tuple: what the PR diff compares between base and head.
      value: values.join("/"),
      text: m[0],
      index: m.index ?? 0,
      start: m.index ?? 0,
      end: (m.index ?? 0) + m[0].length,
      parts: [1, 2, 3, 4].map((group) => groupSpan(m, group)),
    });
  }
  return claims;
}

// What the PR diff and the rewrite plan treat as a managed coverage floor: only tuples whose four
// components can be percentages. The release validator keeps judging every tuple (a tuple above
// the floors always passes there), but the diff must not call `408/500/502/503` — the provider
// breaker's HTTP statuses in AGENTS.md — a managed value, or a PR editing that list would be told
// to restore it.
export function locateManagedCoverageFloorClaims(content) {
  return locateCoverageFloorClaims(content).filter((claim) =>
    claim.values.every((value) => value >= 0 && value <= 100)
  );
}

// --- Free-tier headline -------------------------------------------------------------------
// The docs publish a rounded aggregate headline ("~1.4B"). Only the AGGREGATE headline is a
// claim, via an explicit whitelist. These files also carry figures that are legitimately not the
// headline and must never trip the gate: the theoretical ceiling ("would read ~10B; not
// published"), the historical "previous ~1.94B", and per-model rows ("mistral … ~1.00B").
const HEADLINE_AFTER = /^\s*(?:documented\s+)?free tokens|^\s*in (?:your|the) first month/i;
const HEADLINE_BEFORE = /(recurring grant[^|]*\|\s*\**|signup credits[^|]*\|\s*\**|up to\s*)$/i;

export function locateHeadlineClaims(content) {
  const claims = [];
  for (const m of content.matchAll(/~(\d+(?:\.\d+)?)B/dg)) {
    const after = content.slice(m.index + m[0].length, m.index + m[0].length + 80);
    const before = content.slice(Math.max(0, m.index - 80), m.index);
    if (!HEADLINE_AFTER.test(after) && !HEADLINE_BEFORE.test(before)) continue;
    claims.push({ key: "headline", value: Number(m[1]), text: m[0], ...groupSpan(m) });
  }
  return claims;
}

// The eligibility-gated figure ("+~6M behind regional identity verification") is validated with
// its own anchor so it can neither drift nor be silently dropped once it exists.
const GATED_ANCHOR = /^\s*behind regional identity verification/i;

export function locateGatedClaims(content) {
  const claims = [];
  for (const m of content.matchAll(/\+?~?(\d+(?:\.\d+)?)([BM])\b/dg)) {
    const after = content.slice(m.index + m[0].length, m.index + m[0].length + 60);
    if (!GATED_ANCHOR.test(after)) continue;
    claims.push({
      key: "gated",
      value: Number(m[1]) * (m[2] === "B" ? 1e9 : 1e6),
      tokens: Number(m[1]) * (m[2] === "B" ? 1e9 : 1e6),
      unit: m[2],
      text: m[0],
      ...groupSpan(m),
    });
  }
  return claims;
}

// --- README SVG diagrams ------------------------------------------------------------------
// Patterns are deliberately narrow — they anchor on the surrounding words so path coordinates,
// width/font-size attributes and small unrelated counts ("15 providers ToS-flagged", "100+
// providers") can never register as claims. Providers require 3+ digits for the same reason.
export const SVG_CANONICAL_PATTERNS = [
  { key: "providers", what: "providers", pattern: /(\d{3,4}) (?:AI )?providers\b/g },
  { key: "mcpTools", what: "MCP tools", pattern: /MCP (?:server with |with |\()(\d+)/g },
  { key: "strategies", what: "routing strategies", pattern: /(\d+) routing strategies\b/g },
  { key: "pools", what: "free-tier pools", pattern: /(\d+) provider pools\b/g },
];

/** Every canonical claim, grouped in pattern order; `keys` limits which patterns run. */
export function locateSvgCanonicalClaims(content, keys = null) {
  const claims = [];
  for (const { key, what, pattern } of SVG_CANONICAL_PATTERNS) {
    if (keys && !keys.includes(key)) continue;
    for (const m of content.matchAll(withIndices(pattern))) {
      claims.push({ key, what, value: Number(m[1]), text: m[0], ...groupSpan(m) });
    }
  }
  return claims;
}

// --- Rewrites --------------------------------------------------------------------------------

const ARABIC_INDIC_ZERO = 0x0660;
const EXTENDED_ARABIC_INDIC_ZERO = 0x06f0;

/**
 * `to` written in the digit system of `original` (Western, Arabic-Indic or Extended
 * Arabic-Indic): a translated README that spells its counts in local digits keeps them local.
 */
export function inDigitsOf(original, to) {
  const code = original.codePointAt(0) ?? 0;
  let zero = 0;
  if (code >= ARABIC_INDIC_ZERO && code <= ARABIC_INDIC_ZERO + 9) zero = ARABIC_INDIC_ZERO;
  if (code >= EXTENDED_ARABIC_INDIC_ZERO && code <= EXTENDED_ARABIC_INDIC_ZERO + 9) {
    zero = EXTENDED_ARABIC_INDIC_ZERO;
  }
  if (!zero) return to;
  return to.replace(/\d/g, (digit) => String.fromCodePoint(zero + Number(digit)));
}

/**
 * Applies non-overlapping edits `{ start, end, to }` to `content`. Overlapping edits are a
 * caller bug (the planner resolves conflicts before calling this), so they throw.
 */
export function applyEdits(content, edits) {
  const sorted = [...edits].sort((a, b) => b.start - a.start);
  let out = content;
  let limit = Infinity;
  for (const edit of sorted) {
    if (edit.end > limit) throw new Error(`overlapping edits at ${edit.start}-${edit.end}`);
    out = out.slice(0, edit.start) + edit.to + out.slice(edit.end);
    limit = edit.start;
  }
  return out;
}
