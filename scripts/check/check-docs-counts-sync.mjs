#!/usr/bin/env node
// Validates that count-based assertions in docs match the actual code state.
//
// Two tiers of checks:
//   • STRICT (always blocking — exit 1 on drift): high-confidence, slow-moving counts
//     that historically caused the worst drift across user-facing documentation.
//       - provider count (source of truth: docs/reference/PROVIDER_REFERENCE.md total,
//         which is auto-generated from src/shared/constants/providers.ts)
//       - i18n locale count (source of truth: config/i18n.json `locales`)
//   • SOFT (heuristic — only fails with --strict): file-count based assertions that can
//     false-positive.
//       - executors count in open-sse/executors/
//       - routing strategies in src/shared/constants/routingStrategies.ts
//       - OAuth providers in src/lib/oauth/providers/
//       - A2A skills in src/lib/a2a/skills/
//       - Cloud agents in src/lib/cloudAgent/agents/
//
// Two MODES (plan "derived numbers and texts resolved only at release", 2026-11-13; the mode
// comes from scripts/check/lib/gateMode.mjs: --mode=pr|release, OMNIROUTE_GATE_MODE, then the
// Actions event — a feature pull_request or a queue batch is `pr`, everything else `release`):
//
//   release  strict equality between the docs and the live code, exactly as this gate always
//            ran: the release PR, the release skill, `release:refresh-derived --check`, local runs.
//   pr       judges only what the change did. A derived number is written once, by the release
//            refresh (`npm run release:refresh-derived`) or the nightly refresh PR, so between
//            releases the base is stale BY DESIGN and a feature PR must not be red for it. Each
//            derived check reads its claims at the PR base and at the head with the SAME locator
//            the release mode uses, and fails only (1) a value the PR wrote that the base did not
//            have, or (2) a required claim the base had and the PR removed. Content invariants
//            that need no facts run in both modes; checks that need the live facts and have no
//            claim span to diff run in release mode only. No tsx subprocess in pr mode.
//
// Every check carries `scope`: "derived" | "invariant" | "release-only".
//
// Exit codes: 0 ok · 1 divergence (STRICT, soft with --strict, or a PR violation) ·
// 2 infrastructure (code facts could not be collected; PR diff base unresolvable in CI) — never
// a documentation divergence.
// Run: node scripts/check/check-docs-counts-sync.mjs [--mode=pr|release] [--strict]
//
// NOTE: PROVIDER_REFERENCE.md is no longer blindly trusted — a STRICT check compares
// the doc's `Total providers` against the live provider modules (the same collections
// the generator reads), so a hand-stale doc is a red, not a silently propagated total.
// Fix by running `npm run gen:provider-reference`. Additional STRICT coverage added in
// the 2026-08-12 hardening: llm.txt + package.json description (providers), migration
// count (README/AGENTS/llm.txt), and canonical numbers inside the README SVG diagrams
// (providers / MCP tools / routing strategies / free-tier pools).

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildReadmeMigrationChecks } from "./lib/readmeMigrationCount.mjs";
import {
  SVG_CANONICAL_PATTERNS,
  locateCoverageFloorClaims,
  locateManagedCoverageFloorClaims,
  locateGatedClaims,
  locateHeadlineClaims,
  locateNumberClaims,
  locateSvgCanonicalClaims,
  locateVersionClaims,
} from "./lib/derivedClaims.mjs";
import {
  evaluatePrDiff,
  isDerivedWriterBranch,
  planRewritesForChecks,
} from "./lib/derivedClaimsDiff.mjs";
import {
  describeGateMode,
  listChangedFiles,
  resolveGateModeInfo,
  resolveHeadBranch,
  resolvePrDiffBase,
} from "./lib/gateMode.mjs";
import * as factsLib from "../release/facts.mjs";
import {
  countFiles,
  parseProviderTotal,
  countRoutingStrategies,
  countScoringFactors,
  readProviderTotal,
  countMigrations,
  countLocales,
  readCodeFacts,
  readPackageVersion,
  readCoverageRatchetFloors,
} from "../release/facts.mjs";

// The fact readers live in scripts/release/facts.mjs (shared with `npm run facts` and
// `npm run release:refresh-derived`). Re-exported so existing importers keep working.
export {
  __setSpawnSyncForTest,
  __resetSpawnSyncForTest,
  parseScoringFactors,
  parseProviderTotal,
  readProviderTotal,
  countMigrations,
  countLocales,
  readPackageVersion,
  readCoverageRatchetFloors,
} from "../release/facts.mjs";
export {
  DERIVED_VALUE_WRITER_BRANCHES,
  evaluatePrDiff,
  isDerivedWriterBranch,
} from "./lib/derivedClaimsDiff.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

// PURE: the reference document must NAME every shipped pack. Reporting which one is
// missing is the point — "6 packs" tells a doc it is stale, "chaos-mode is missing"
// tells it what to write.
export function makeModePackNamesValidator(names) {
  return (content) => {
    if (!names.length) return { ok: true, detail: "no mode packs found in source — skipping" };
    // Token boundary, not `includes`: "ship-fast" is a substring of
    // "ship-fast-v2", so a doc could satisfy the gate while naming a pack that
    // does not ship — and a future pack named as a prefix of another would be
    // masked by it.
    const missing = names.filter(
      (name) =>
        !new RegExp(`(^|[^\\w-])${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^\\w-]|$)`).test(
          content
        )
    );
    if (!missing.length) return { ok: true, detail: `all ${names.length} mode packs are named` };
    return { ok: false, detail: `mode pack(s) never named in this file: ${missing.join(", ")}` };
  };
}

// PURE: tally STRICT vs SOFT drift for a list of checks, given a content lookup.
// `getContent(file) -> string | null`. A check whose `actual` is 0 is skipped (the
// source count could not be determined). `actual==="ERR"` is a STRICT failure, not a skip.
// Returns { strict, soft, lines }.
export function tallyDrift(checks, getContent) {
  let strict = 0;
  let soft = 0;
  const lines = [];
  for (const c of checks) {
    const tier = c.strict ? "STRICT" : "soft";
    lines.push(`\n• ${c.label}: ${c.actual} (real) [${tier}]`);
    if (c.actual === "ERR") {
      if (c.validate) {
        const v = c.validate("", `code facts:${c.actual}`);
        lines.push(`  ${v.ok ? "✓" : c.strict ? "✗" : "⚠"} ${c.label} — ${v.detail}`);
        if (!v.ok) {
          if (c.strict) strict++;
          else soft++;
        }
      } else {
        lines.push(`  ${c.strict ? "✗" : "⚠"} ${c.label} — readCodeFacts unavailable`);
        if (c.strict) strict++;
        else soft++;
      }
      continue;
    }
    if (c.actual === 0 || c.actual === "0") {
      lines.push(`  ⚠ could not determine ${c.docKey} count from source — skipping`);
      continue;
    }
    for (const f of c.files) {
      const content = getContent(f);
      if (c.validate) {
        if (content == null) continue;
        const v = c.validate(content);
        lines.push(`  ${v.ok ? "✓" : c.strict ? "✗" : "⚠"} ${f} — ${v.detail}`);
        if (!v.ok) {
          if (c.strict) strict++;
          else soft++;
        }
        continue;
      }
      const found = content != null && content.includes(String(c.actual));
      if (found) {
        lines.push(`  ✓ ${f} mentions "${c.actual}"`);
      } else {
        lines.push(`  ${c.strict ? "✗" : "⚠"} ${f} does NOT mention "${c.actual}" for ${c.docKey}`);
        if (c.strict) strict++;
        else soft++;
      }
    }
  }
  return { strict, soft, lines };
}

// Lightweight literal claim helper — checks that the expected string appears in the file.
function makeLiteralClaimValidator(expected, opts) {
  return (content) =>
    content.includes(String(expected))
      ? { ok: true, detail: `literal "${expected}" present — ${opts?.what ?? "literal"}` }
      : {
          ok: false,
          detail: `expected literal "${expected}" not found — ${opts?.what ?? "literal"}`,
        };
}

// The docs publish a rounded aggregate headline ("~1.4B"). Accept a claim that rounds to
// the live value at one decimal place; reject a stale one. Tolerance is tight on purpose:
// this gate exists so the headline cannot drift upward unnoticed.
//
// Only the AGGREGATE headline is validated, via an explicit whitelist (see
// lib/derivedClaims.mjs → locateHeadlineClaims): the theoretical ceiling, the historical
// "previous ~1.94B" and per-model rows must never trip the gate.
export function extractHeadlineClaims(content) {
  return locateHeadlineClaims(content).map(({ value, text }) => ({ value, text }));
}

// The eligibility-gated figure ("+~6M behind regional identity verification") is validated
// with its own anchor so it can neither drift nor be silently dropped once it exists.
export function extractGatedClaims(content) {
  return locateGatedClaims(content).map(({ tokens, unit, text }) => ({ tokens, unit, text }));
}

export function checkFreeTierHeadline(content, totals) {
  const claims = extractHeadlineClaims(content);
  if (!claims.length) return { ok: true, detail: "no aggregate free-tier headline in this file" };
  const steady = totals.s / 1e9;
  const first = totals.m / 1e9;
  const stale = claims.filter(
    (c) => Math.abs(c.value - steady) >= 0.05 && Math.abs(c.value - first) >= 0.05
  );
  const problems = [];
  if (stale.length) {
    problems.push(
      `stale headline ${[...new Set(stale.map((c) => c.text))].join(", ")} — live catalog ` +
        `computes ~${steady.toFixed(2)}B steady / ~${first.toFixed(2)}B first month`
    );
  }
  if (totals.g != null && totals.g > 0) {
    const gated = extractGatedClaims(content);
    const tol = (c) => (c.unit === "B" ? 0.05e9 : 0.5e6);
    const gatedStale = gated.filter((c) => Math.abs(c.tokens - totals.g) >= tol(c));
    if (!gated.length) {
      problems.push(
        `missing gated figure — live catalog computes ${Math.round(totals.g / 1e6)}M behind regional identity verification`
      );
    } else if (gatedStale.length) {
      problems.push(
        `stale gated figure ${[...new Set(gatedStale.map((c) => c.text))].join(", ")} — live catalog ` +
          `computes ${Math.round(totals.g / 1e6)}M behind regional identity verification`
      );
    }
  }
  if (!problems.length)
    return { ok: true, detail: `${claims.length} headline claim(s) match the live catalog` };
  return { ok: false, detail: problems.join("; ") };
}

// G-06 (#15159): every claim that asserts which OmniRoute version is CURRENT must equal
// package.json. The seven anchored phrasings and why a bare semver is never a claim are
// documented with the locator (lib/derivedClaims.mjs → locateVersionClaims).
export function makeVersionClaimValidator(expected) {
  return (content) => {
    if (!expected) return { ok: false, detail: "package.json version could not be read" };

    const claims = locateVersionClaims(content);

    if (!claims.length) return { ok: true, detail: "no version claim in this file" };
    const stale = claims.filter((c) => c.value !== expected);
    if (!stale.length)
      return {
        ok: true,
        detail: `${claims.length} version claim(s) match package.json ${expected}`,
      };
    return {
      ok: false,
      detail:
        `stale version: ${[...new Set(stale.map((c) => `"${c.text}"`))].join(", ")} — ` +
        `package.json is ${expected}`,
    };
  };
}

/**
 * G-08 (#15159): validate a documented coverage floor against the BLOCKING
 * ratchet, not against `npm run test:coverage`.
 *
 * AGENTS.md advertised `60/60/60/60` (statements/lines/functions/branches).
 * That number is accurate in isolation — it is what test:coverage hardcodes —
 * but the blocking gate enforces 67.33 / 67.33 / 72.02 / 65.08 from
 * config/quality/quality-baseline.json. So an agent reading AGENTS.md alone
 * would run the floor below the real one and be surprised by a red quality-gate
 * on correct work. AGENTS.md is also an agent-instruction surface: a wrong floor
 * there misleads every future session, not just a human reading docs.
 *
 * Deliberately narrow: it only fires on an explicit four-number coverage-floor
 * claim, so ordinary prose about coverage is untouched.
 *
 * @param {{statements:number,lines:number,functions:number,branches:number}} floors
 * @returns {(content: string) => {ok: boolean, detail: string}}
 */
export function makeCoverageFloorClaimValidator(floors) {
  return (content) => {
    const claims = locateCoverageFloorClaims(content);
    if (!claims.length) return { ok: true, detail: "no coverage-floor claim in this file" };

    const required = [floors.statements, floors.lines, floors.functions, floors.branches];
    const problems = [];
    for (const claim of claims) {
      // Only compare against the requirement it can actually fail: a floor claim
      // sits BELOW the blocking floor, so any component below its requirement is
      // a real understatement. Being above is harmless (stricter than required).
      const shortfalls = required
        .map((required_, i) => ({ required: required_, claimed: claim.values[i] }))
        .filter((c) => c.claimed < c.required);
      if (shortfalls.length) {
        // Show the surrounding line so the report names the offending text.
        const lineStart = content.lastIndexOf("\n", claim.index) + 1;
        const lineEnd = content.indexOf("\n", claim.index);
        const line = content.slice(lineStart, lineEnd === -1 ? undefined : lineEnd).trim();
        problems.push(
          `${claim.text} understates the blocking coverage floor ` +
            `(${shortfalls
              .map((c) => `claims ${c.claimed}, gate requires ${c.required}`)
              .join("; ")}) — ${line}`
        );
      }
    }

    if (!problems.length)
      return {
        ok: true,
        detail: `${claims.length} coverage-floor claim(s) meet or exceed the blocking ratchet`,
      };
    return { ok: false, detail: problems.join(" | ") };
  };
}

// --- Generic numeric-claim gate ---------------------------------------------
// Same principle as the free-tier headline: docs legitimately carry numbers that are
// NOT the aggregate being gated (per-module tool counts like "Memory tool definitions
// (3 tools)", the CLI catalog's "33 tools (25 CLI Code's ...)" next to the MCP total).
// So every check declares what to skip rather than assuming any "N tools" is the claim.
export function extractNumberClaims(content, opts) {
  return locateNumberClaims(content, opts).map(({ value, text }) => ({ value, text }));
}

// Three spellings of the same claim are in use across the docs, and all three
// must be watched: "6 curated **mode packs**", "6 pre-defined weight profiles",
// "4 weight profiles". Matching only the first left the other two unguarded.
const MODE_PACK_CLAIM_PATTERN =
  /(\d+)\s+(?:curated\s+|pre-defined\s+)?\*{0,2}(?:mode\s+packs?|weight\s+profiles?)\b/gi;

export function makeNumberClaimValidator(expected, opts) {
  return (content) => {
    const claims = extractNumberClaims(content, opts);
    if (!claims.length) {
      // Most files in a check's list legitimately never mention the number, so
      // "no claim" is normally a pass. But for a reference document that is
      // supposed to state it, silence is the failure mode that matters: reword
      // the sentence past the pattern and the gate goes quiet while reporting
      // green. `requireClaim` says this file must carry the claim.
      if (opts.requireClaim)
        return {
          ok: false,
          detail:
            `no ${opts.what} claim found, and this file is required to state one — ` +
            `either the sentence was reworded past the pattern, or it was deleted ` +
            `(code has ${expected})`,
        };
      return { ok: true, detail: `no ${opts.what} claim in this file` };
    }
    const stale = claims.filter((c) => c.value !== expected);
    if (!stale.length)
      return { ok: true, detail: `${claims.length} ${opts.what} claim(s) match the code` };
    return {
      ok: false,
      detail:
        `stale ${opts.what}: ${[...new Set(stale.map((c) => `"${c.text}"`))].join(", ")} — ` +
        `code has ${expected}`,
    };
  };
}

// --- v3.8.50 hardening validators --------------------------------------------
// PURE: doc total must equal the live provider-module total (closes the falso-verde
// found in the 2026-08-12 audit: the doc sat hand-stale at 291 while the modules
// defined 338, and every downstream check inherited the stale total).
export function makeProviderReferenceValidator(expected) {
  return (content) => {
    const total = parseProviderTotal(content);
    if (!total) return { ok: false, detail: "no `Total providers: **N**` marker found" };
    if (total === expected)
      return { ok: true, detail: `doc total ${total} matches the live provider modules` };
    return {
      ok: false,
      detail:
        `doc total ${total} is stale — the live provider modules define ${expected} ` +
        `(run npm run gen:provider-reference)`,
    };
  };
}

// PURE: the npm package description must carry the live provider count.
export function makePackageDescriptionValidator(expected) {
  return (content) => {
    let desc = "";
    try {
      desc = String(JSON.parse(content).description || "");
    } catch {
      return { ok: false, detail: "package.json could not be parsed" };
    }
    if (desc.includes(String(expected)))
      return { ok: true, detail: `description mentions the live provider count ${expected}` };
    return {
      ok: false,
      detail: `description does not mention the live provider count ${expected}: "${desc}"`,
    };
  };
}

// PURE: sweep an SVG's text/aria content for the canonical numbers. Patterns are
// deliberately narrow (lib/derivedClaims.mjs → SVG_CANONICAL_PATTERNS) so path coordinates,
// width/font-size attributes and small unrelated counts can never register as claims.
export function checkSvgCanonicalNumbers(content, expected) {
  const keys = SVG_CANONICAL_PATTERNS.filter(({ key }) => expected[key] != null).map((p) => p.key);
  const claims = locateSvgCanonicalClaims(content, keys);
  const stale = claims
    .filter((c) => c.value !== expected[c.key])
    .map((c) => `"${c.text}" (${c.what} — code has ${expected[c.key]})`);
  if (!claims.length) return { ok: true, detail: "no canonical-number claims in this SVG" };
  if (!stale.length)
    return { ok: true, detail: `${claims.length} canonical claim(s) match the code` };
  return { ok: false, detail: `stale: ${[...new Set(stale)].join(", ")}` };
}

// The README-embedded diagrams that historically rotted because no gate read them
// (the alt-text in README.md is checked, the SVG text nodes never were).
const SVG_DIAGRAM_FILES = [
  "docs/diagrams/readme-hero.svg",
  "docs/diagrams/free-tier-budget.svg",
  "docs/diagrams/promise-pillars.svg",
  "docs/diagrams/comparison-table.svg",
  "docs/diagrams/cli-terminal.svg",
  "docs/diagrams/tier-cascade.svg",
  "public/images/tier-flow-dark.svg",
  "public/images/tier-flow-light.svg",
];

const PROVIDER_COUNT_CLAIM = {
  what: "aggregate provider count",
  // Subsets and approximate counts (100+) have their own denominators.
  pattern: /\b(\d{3,4})\*{0,2}(?:\s+(?:(?:AI|LLM|registered|unique)\s+)?providers\b|-provider\b)/gi,
  skipBefore: /chat model registry covers\s+\*{0,2}$/i,
  skipAfter: /^\s+in\s+(?:>\s*)?OmniRoute v\d+\.\d+\.\d+/i,
};

// --- Derived-check plumbing (PR diff + release refresh) ------------------------
// A derived check keeps its release validator untouched and adds the locator its validator
// reads (`extract`) plus the rewrite that brings a file to the live value (`plan`).

/** Edits for every numeric claim that differs from `expected`. */
function numericPlan(expected, opts) {
  return (content) => {
    const claims = locateNumberClaims(content, opts);
    if (!claims.length && opts.requireClaim) {
      return {
        edits: [],
        manual: [
          `no ${opts.what} claim found, and this file is required to state one (code has ${expected})`,
        ],
      };
    }
    return {
      edits: claims
        .filter((c) => c.value !== expected && c.start >= 0)
        .map((c) => ({ start: c.start, end: c.end, to: String(expected) })),
      manual: [],
    };
  };
}

/** A check over a numeric claim pattern, wired for the release, PR and refresh views. */
function numericClaimCheck({ label, actual, docKey, strict = true, files, claim }) {
  return {
    label,
    actual,
    docKey,
    strict,
    scope: "derived",
    requireClaim: Boolean(claim.requireClaim),
    files,
    validate: makeNumberClaimValidator(actual, claim),
    extract: (content) => locateNumberClaims(content, claim),
    plan: numericPlan(actual, claim),
  };
}

function versionPlan(expected) {
  return (content) => ({
    edits: locateVersionClaims(content)
      .filter((c) => c.value !== expected && c.start >= 0)
      .map((c) => ({ start: c.start, end: c.end, to: String(expected) })),
    manual: [],
  });
}

function coverageFloorPlan(floors) {
  const required = [floors.statements, floors.lines, floors.functions, floors.branches];
  return (content) => {
    const edits = [];
    for (const claim of locateManagedCoverageFloorClaims(content)) {
      claim.values.forEach((claimed, i) => {
        if (claimed < required[i] && claim.parts[i].start >= 0) {
          edits.push({ ...claim.parts[i], to: String(required[i]) });
        }
      });
    }
    return { edits, manual: [] };
  };
}

function svgPlan(expected) {
  return (content) => ({
    edits: locateSvgCanonicalClaims(
      content,
      SVG_CANONICAL_PATTERNS.filter(({ key }) => expected[key] != null).map((p) => p.key)
    )
      .filter((c) => c.value !== expected[c.key] && c.start >= 0)
      .map((c) => ({ start: c.start, end: c.end, to: String(expected[c.key]) })),
    manual: [],
  });
}

// --- Facts ------------------------------------------------------------------------------

/**
 * Facts in the scripts/release/facts.mjs document format, collected from the tree at `root`.
 * Unlike `collectFacts()` (which refuses a partial document), the top-level counts are kept
 * when the code facts fail, so the release report still judges every check that does not need
 * them; `facts.code` is then null and `error` says why (infrastructure, not drift).
 *
 * @returns {{ facts: object, error: null | { kind: string, detail: string } }}
 */
export function collectGateFacts({ root = ROOT, timeoutMs } = {}) {
  const result =
    typeof factsLib.readCodeFactsResult === "function"
      ? factsLib.readCodeFactsResult({ root, timeoutMs })
      : (() => {
          const code = readCodeFacts();
          return code
            ? { facts: code, error: null }
            : { facts: null, error: { kind: "exit", detail: "readCodeFacts returned null" } };
        })();
  const code = result.facts ?? null;
  return {
    facts: {
      schemaVersion: 1,
      version: readPackageVersion(root),
      providers: code?.providers ?? null,
      providerReferenceTotal: readProviderTotal(root),
      migrations: countMigrations(root),
      locales: countLocales(root),
      routingStrategies: countRoutingStrategies(root),
      scoringFactors: countScoringFactors(root),
      coverageFloors: readCoverageRatchetFloors(root),
      executors: countFiles("open-sse/executors", ".ts", root),
      oauthProviders: countFiles("src/lib/oauth/providers", ".ts", root),
      a2aSkills: countFiles("src/lib/a2a/skills", ".ts", root),
      cloudAgents: countFiles("src/lib/cloudAgent/agents", ".ts", root),
      code,
    },
    error: code ? null : (result.error ?? { kind: "exit", detail: "code facts unavailable" }),
  };
}

// PR mode builds the checks without facts: derived checks only need their locators, and the
// invariants read content rules alone. `code: {}` keeps the code-derived block expanded (an
// absent `code` collapses it into the ERR check) so its invariants still run.
const PR_MODE_FACTS = Object.freeze({
  schemaVersion: 1,
  version: null,
  providers: null,
  providerReferenceTotal: null,
  migrations: null,
  locales: null,
  routingStrategies: null,
  scoringFactors: null,
  coverageFloors: { statements: null, lines: null, functions: null, branches: null },
  executors: null,
  oauthProviders: null,
  a2aSkills: null,
  cloudAgents: null,
  code: {},
});

// --- Checks -----------------------------------------------------------------------------

/**
 * Every check, built from facts in the scripts/release/facts.mjs document format. With
 * `facts` it never starts a subprocess (tests, the refresh, the snapshot); without it the
 * facts are collected from the live tree, as the gate always did.
 */
export function buildChecks({ facts } = {}) {
  return assembleChecks(facts ?? collectGateFacts().facts);
}

function assembleChecks(facts) {
  const providerTotal = facts.providerReferenceTotal;
  const migrations = facts.migrations;
  const version = facts.version;
  const floors = facts.coverageFloors ?? {};
  return [
    ...buildReadmeMigrationChecks(ROOT, migrations),
    numericClaimCheck({
      label: "Provider count",
      actual: providerTotal,
      docKey: "providers",
      files: ["README.md", "AGENTS.md", "llm.txt"],
      claim: { ...PROVIDER_COUNT_CLAIM, requireClaim: true },
    }),
    numericClaimCheck({
      label: "Provider count (secondary docs and skills)",
      actual: providerTotal,
      docKey: "providers",
      files: [
        "docs/architecture/ARCHITECTURE.md",
        "docs/architecture/CODEBASE_DOCUMENTATION.md",
        "docs/architecture/REPOSITORY_MAP.md",
        "docs/frameworks/A2A-SERVER.md",
        "docs/frameworks/ACP.md",
        "docs/frameworks/AGENTBRIDGE.md",
        "docs/frameworks/OPEN_SSE_ARCHITECTURE.md",
        "docs/getting-started/FREE-TIERS-GUIDE.md",
        "docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md",
        "docs/guides/FREE_PROVIDER_RANKINGS.md",
        "src/shared/constants/agentSkills.ts",
        "skills/README.md",
        "skills/omni-auth/SKILL.md",
        "skills/omni-providers/SKILL.md",
      ],
      claim: PROVIDER_COUNT_CLAIM,
    }),
    {
      // Release-only: `includes()` over the description has no claim span to diff. A parallel
      // phase turns this into "the description carries NO exact provider count", an invariant
      // that then runs in both modes.
      label: "Provider count (package.json description)",
      actual: providerTotal,
      docKey: "providers",
      strict: true,
      scope: "release-only",
      files: ["package.json"],
      validate: makePackageDescriptionValidator(providerTotal),
    },
    numericClaimCheck({
      label: "DB migrations count",
      actual: migrations,
      docKey: "migrations",
      files: ["README.md", "AGENTS.md", "llm.txt"],
      claim: {
        what: "migrations",
        pattern: /(\d+)\+? (?:versioned )?(?:SQL )?migrations?\b/gi,
      },
    }),
    {
      // The README footer and llm.txt each carry the product version as prose; both
      // shipped stale ("v3.8.50" on a 3.8.51 tree) in the 2026-08-31 audit. Compare
      // every such claim against package.json, which is authoritative.
      label: "Package version (docs prose)",
      actual: version,
      docKey: "package version",
      strict: true,
      scope: "derived",
      files: ["README.md", "llm.txt"],
      validate: makeVersionClaimValidator(version),
      extract: locateVersionClaims,
      plan: versionPlan(version),
    },
    {
      // G-08 (#15159): AGENTS.md advertised `60/60/60/60`, which is what
      // test:coverage hardcodes but NOT what the BLOCKING ratchet enforces. Read
      // the real floors from quality-baseline.json rather than hardcoding them
      // here, so a future rebaseline cannot leave the docs silently wrong.
      label: "Coverage floor (docs vs blocking ratchet)",
      actual: [floors.statements, floors.lines, floors.functions, floors.branches].join(" / "),
      docKey: "coverage floor",
      strict: true,
      scope: "derived",
      files: ["AGENTS.md", "README.md"],
      validate: makeCoverageFloorClaimValidator(floors),
      extract: locateManagedCoverageFloorClaims,
      plan: coverageFloorPlan(floors),
    },
    {
      // Release-only: an `includes()` of the count anywhere in the file — no claim span. A
      // locator is not safe here: these files state two different totals (67 languages vs 66
      // translated locales) plus historical and subset counts ("all 65 locales" in an incident
      // note, "30 locales have …"), so "N locales" / "N languages" cannot tell the claim apart.
      label: "i18n locales count",
      actual: facts.locales,
      docKey: "i18n locales",
      strict: true,
      scope: "release-only",
      files: ["docs/README.md", "docs/guides/I18N.md"],
    },
    ...buildCodeFactChecks(facts),
    {
      label: "ToS caution (16) (live docs)",
      actual: 16,
      docKey: "ToS caution (16)",
      strict: false,
      scope: "invariant",
      files: ["docs/reference/FREE_TIERS.md"],
      validate: makeNumberClaimValidator(16, {
        what: "ToS caution (16)",
        pattern: /Caution[^\n]*\(\s*(16)\s*\)/gi,
        requireClaim: true,
      }),
    },
    {
      label: "quality neutral prose (live docs)",
      actual: "quality neutral 0.5",
      docKey: "quality neutral",
      strict: false,
      scope: "invariant",
      files: ["docs/routing/AUTO-COMBO.md"],
      validate: (content) =>
        /quality.*neutral.*0\.5/is.test(content)
          ? { ok: true, detail: "quality neutral 0.5 mentioned" }
          : {
              ok: false,
              detail: "quality neutral 0.5 not found — prose must carry quality neutral 0.5",
            },
    },
    {
      label: "Executors count",
      actual: facts.executors,
      docKey: "executors",
      strict: false,
      scope: "release-only",
      files: ["docs/architecture/ARCHITECTURE.md", "docs/architecture/CODEBASE_DOCUMENTATION.md"],
    },
    // The Auto-Combo engine is advertised as "N-factor" in a dozen places, in
    // prose and in code comments alike, and N had drifted to five different
    // values (6, 9, 12, 13, 14) against a code that declares 15. The number
    // now comes from `DEFAULT_WEIGHTS`; adding a factor without touching the
    // prose fails here. `CHANGELOG.md` is deliberately out of scope: its old
    // entries record what was true when they were written.
    numericClaimCheck({
      label: "Auto-Combo scoring factors count",
      actual: facts.scoringFactors,
      docKey: "scoring factors",
      files: [
        "README.md",
        "AGENTS.md",
        "docs/routing/AUTO-COMBO.md",
        "docs/guides/TIERS.md",
        "docs/guides/FEATURES.md",
        "docs/guides/FREE_PROVIDER_RANKINGS.md",
        "docs/diagrams/strategies-grid.svg",
        "docs/diagrams/auto-combo-scoring.mmd",
        "llm.txt",
        "docs/architecture/ARCHITECTURE.md",
        "docs/architecture/REPOSITORY_MAP.md",
        "docs/architecture/RESILIENCE_GUIDE.md",
        "docs/frameworks/OPEN_SSE_ARCHITECTURE.md",
        "docs/getting-started/AUTO-COMBO-GUIDE.md",
        "skills/omni-combos-routing/SKILL.md",
        "open-sse/services/autoCombo/routerStrategy.ts",
        "open-sse/services/taskAwareRouter.ts",
        "tests/unit/lkgp-enabled-context-11181.test.ts",
        "tests/integration/combo-matrix/auto.test.ts",
      ],
      claim: { what: "scoring factors", pattern: /(\d+)[- ]factors?\b/gi },
    }),
    {
      label: "Routing strategies count",
      actual: facts.routingStrategies,
      docKey: "strategies",
      strict: false,
      scope: "release-only",
      files: ["docs/routing/AUTO-COMBO.md", "docs/architecture/RESILIENCE_GUIDE.md", "llm.txt"],
    },
    // The strategy COUNT as prose states it (#15159 DOC-01: AGENTS.md, AUTO-COMBO.md and
    // open-sse/services/AGENTS.md had drifted to 17 and 19). The soft `includes()` check above
    // has no span to rewrite, so the release refresh needs these two narrow, rewritable claims:
    // "N public strategies" / "N routing strategies" / "**N** strategies" / "(…, N strategies)",
    // and the services guide's "**Strategies** (N)". Every match in these files is the public
    // total today (no subset phrasing), so no skip is needed. The docs/i18n mirrors are carried
    // by the refresh, as for every other derived number.
    numericClaimCheck({
      label: "Routing strategies count (prose claims)",
      actual: facts.routingStrategies,
      docKey: "strategies",
      files: [
        "AGENTS.md",
        "README.md",
        "llm.txt",
        "docs/routing/AUTO-COMBO.md",
        "docs/architecture/RESILIENCE_GUIDE.md",
        "docs/architecture/ARCHITECTURE.md",
        "docs/guides/FEATURES.md",
      ],
      claim: {
        what: "routing strategies",
        pattern: /(?<![\d.])(\d+)\*{0,2}\s+(?:public\s+|routing\s+)?strategies\b/gi,
      },
    }),
    numericClaimCheck({
      label: "Routing strategies count (services guide)",
      actual: facts.routingStrategies,
      docKey: "strategies",
      files: ["open-sse/services/AGENTS.md"],
      claim: {
        what: "routing strategies",
        pattern: /Strategies\*{0,2}\s*\((\d+)\)/g,
        requireClaim: true,
      },
    }),
    {
      label: "OAuth providers count",
      actual: facts.oauthProviders,
      docKey: "OAuth providers",
      strict: false,
      scope: "release-only",
      files: ["docs/architecture/ARCHITECTURE.md"],
    },
    {
      label: "A2A skills count",
      actual: facts.a2aSkills,
      docKey: "A2A skills",
      strict: false,
      scope: "release-only",
      files: ["docs/frameworks/A2A-SERVER.md"],
    },
    {
      label: "Cloud agents count",
      actual: facts.cloudAgents,
      docKey: "cloud agents",
      strict: false,
      scope: "release-only",
      files: ["docs/frameworks/CLOUD_AGENT.md", "docs/frameworks/AGENT_PROTOCOLS_GUIDE.md"],
    },
  ];
}

function buildCodeFactChecks(facts) {
  const f = facts.code;
  if (!f)
    return [
      {
        label: "Code-derived counts",
        actual: "ERR",
        docKey: "code facts",
        strict: true,
        scope: "release-only",
        files: [],
        validate: () => ({
          ok: false,
          detail: "readCodeFacts unavailable — tsx/spawnSync failed",
        }),
      },
    ];
  const claim = (expected, what, opts, files) =>
    numericClaimCheck({
      label: `${what} (live code)`,
      actual: expected,
      docKey: what,
      files,
      claim: { what, ...opts },
    });
  const packs = Array.isArray(f.modePacks) ? f.modePacks : [];
  const strategies = facts.routingStrategies;
  return [
    // Two packs shipped after the docs were written and nothing noticed.
    // The count and the names are two different gates: a table can carry
    // the right number and still describe the wrong four out of six.
    numericClaimCheck({
      label: "Auto-Combo mode packs",
      actual: packs.length,
      docKey: "mode packs",
      files: [
        "README.md",
        "llm.txt",
        "docs/guides/FEATURES.md",
        "docs/architecture/ARCHITECTURE.md",
        "docs/architecture/REPOSITORY_MAP.md",
        "docs/routing/AUTO-COMBO.md",
      ],
      // Three spellings are in use across the docs, and all three are the
      // same claim: "6 curated **mode packs**", "6 pre-defined weight
      // profiles", "4 weight profiles". Matching only the first left the
      // other two unwatched.
      claim: { what: "mode packs", pattern: MODE_PACK_CLAIM_PATTERN },
    }),
    // Same claim, but on the one document that MUST carry it. Without
    // `requireClaim` the strongest gate in this file is also the easiest to
    // silence: reword the sentence and "no claim in this file" reads as a pass.
    numericClaimCheck({
      label: "Auto-Combo mode packs (reference doc must state the count)",
      actual: packs.length,
      docKey: "mode packs",
      files: ["docs/routing/AUTO-COMBO.md"],
      claim: { what: "mode packs", pattern: MODE_PACK_CLAIM_PATTERN, requireClaim: true },
    }),
    {
      // Release-only: names come from the live MODE_PACKS and are prose, not a span the refresh
      // can rewrite — a missing pack name is written by hand.
      label: "Auto-Combo mode packs (named in the reference doc)",
      actual: packs.length,
      docKey: "mode packs",
      strict: true,
      scope: "release-only",
      files: ["docs/routing/AUTO-COMBO.md"],
      validate: makeModePackNamesValidator(packs),
    },
    {
      // Every pack must pin `quality` explicitly (6 pins, 0.02/0.03) so
      // no pack silently inherits a future DEFAULT. Validates live code,
      // not docs — the gate loops `files` content through `validate`.
      label: "mode packs pin quality explicitly (live code)",
      actual: 6,
      docKey: "packs quality pins",
      strict: true,
      scope: "invariant",
      files: ["open-sse/services/autoCombo/modePacks.ts"],
      validate: (content) => {
        const pins = (content.match(/^\s*quality:\s*0\.0\d,?\s*$/gm) ?? []).length;
        return pins >= 6
          ? { ok: true, detail: `${pins} quality pins` }
          : { ok: false, detail: `only ${pins} quality pins — every pack must pin quality` };
      },
    },
    {
      // Release-only: the doc total against the live provider modules (the refresh regenerates
      // the doc with `npm run gen:provider-reference` before anything else).
      label: "Provider reference total (doc vs live modules)",
      actual: f.providers,
      docKey: "providers (live)",
      strict: true,
      scope: "release-only",
      files: ["docs/reference/PROVIDER_REFERENCE.md"],
      validate: makeProviderReferenceValidator(f.providers),
    },
    // Gate: manifest emission vs catalogue intersection. Both numbers are
    // live code facts from the same spawnSync computeur. The catalogue can
    // name providers the registry does not serve yet (arcee-ai at
    // 9d1a896c6), so the leaf raw size is informational — the gate
    // compares the intersected count, never the raw size, and the script
    // itself always exists so tallyDrift runs validate (skips null only).
    {
      label: "Manifest free-tier capability count (live code)",
      actual: f.manifestFreeTier,
      docKey: "free-tier capability",
      strict: true,
      scope: "release-only",
      files: ["scripts/check/check-docs-counts-sync.mjs"],
      validate: () => ({
        ok: f.manifestFreeTier === f.freeTierReg,
        detail: `manifest ${f.manifestFreeTier} vs leaf∩registry ${f.freeTierReg} (leaf ${f.freeTierCount})`,
      }),
    },
    (() => {
      const expected = {
        providers: f.providers,
        mcpTools: f.mcpTools,
        strategies,
        pools: f.freePools,
      };
      return {
        label: "SVG canonical numbers (live code)",
        actual:
          `${f.providers} providers / ${f.mcpTools} MCP tools / ` +
          `${strategies} strategies / ${f.freePools} pools`,
        docKey: "SVG canonical numbers",
        strict: true,
        scope: "derived",
        files: SVG_DIAGRAM_FILES,
        validate: (content) => checkSvgCanonicalNumbers(content, expected),
        extract: (content) => locateSvgCanonicalClaims(content),
        plan: svgPlan(expected),
      };
    })(),
    {
      // Derived, but the refresh does not rewrite it: the headline is a ROUNDED figure that
      // may quote the steady or the first-month total, so a stale one goes to `manual`.
      label: "Free-tier headline (live catalog)",
      actual: `~${(f.freeSteady / 1e9).toFixed(2)}B steady / ${f.freePools} pools / ${Math.round(f.freeGated / 1e6)}M gated`,
      docKey: "free-tier headline",
      strict: true,
      scope: "derived",
      requiredKeys: ["gated"],
      files: ["README.md", "docs/reference/FREE_TIERS.md"],
      validate: (content) =>
        checkFreeTierHeadline(content, { s: f.freeSteady, m: f.freeFirst, g: f.freeGated }),
      extract: (content) => [...locateHeadlineClaims(content), ...locateGatedClaims(content)],
      plan: (content) => {
        const v = checkFreeTierHeadline(content, {
          s: f.freeSteady,
          m: f.freeFirst,
          g: f.freeGated,
        });
        return { edits: [], manual: v.ok ? [] : [v.detail] };
      },
    },
    claim(
      f.engines,
      "compression engines",
      { pattern: /(\d+)[-\s](?:engine stack|composable engines|stacked engines)/gi },
      ["README.md"]
    ),
    claim(
      f.mcpTools,
      "MCP tools",
      {
        pattern: /(\d+)[- ]tools?\b/gi,
        // per-module rows ("Memory tool definitions (3 tools)") and the CLI catalog
        // total ("33 tools (25 CLI Code's …)") are not the MCP aggregate
        // per-module rows read "… tool definitions (N tools" / "… management tools
        // (N tools" — the word tool(s)/definitions sits right before the paren. The
        // aggregate ("MCP Server (109 tools", "all 109 tools") never does.
        // "Phase 2 tool handlers" is a phase number, not a tool count
        skipBefore: /(tools?|definitions?)\s*\(\s*$|phase\s+$/i,
        skipAfter: /^\s*\(\d+ CLI/,
      },
      [
        "README.md",
        "AGENTS.md",
        "docs/frameworks/MCP-SERVER.md",
        "llm.txt",
        "open-sse/mcp-server/README.md",
        "skills/omni-mcp/SKILL.md",
      ]
    ),
    claim(f.mcpScopes, "MCP scopes", { pattern: /(\d+) scopes/gi }, [
      "README.md",
      "AGENTS.md",
      "llm.txt",
      "skills/omni-mcp/SKILL.md",
    ]),
    claim(f.cliTotal, "CLI tools", { pattern: /(\d+) tools(?=\s*\(\d+ CLI)/gi }, ["README.md"]),
    claim(
      f.freeForever,
      "free-forever providers",
      { pattern: /(\d+)(?:\s+recurring(?:\/|\s+or\s+)keyless)?\s+free[- ]forever/gi },
      ["README.md", "docs/diagrams/promise-pillars.svg"]
    ),
    claim(
      f.entries,
      "free-tier catalog entries",
      { pattern: /(\d+) (?:cataloged |catalogued )?(?:free-tier |catalog )entries\b/gi },
      ["README.md", "docs/diagrams/free-tier-budget.svg"]
    ),
    claim(
      f.freePools,
      "recurring pools",
      {
        pattern: /(\d+) (?:documented )?(?:recurring|free-tier) pool(?:s|(?:\s+keys))?\b/gi,
        // "20 recurring pools with a published positive monthly budget" is the
        // positive-budget SUBSET, not the recurring-pool total — never gate it.
        skipAfter: /^\s+with a published positive/i,
      },
      ["README.md", "docs/diagrams/free-tier-budget.svg", "docs/reference/FREE_TIERS.md"]
    ),
    // The reference page says what an entry vouches for. These two facts are
    // curated by hand rather than inferred, so the page quotes their counts —
    // and quoting a count is how a page goes stale. The patterns are deliberately
    // narrow: FREE_TIERS.md is full of numbers, and a loose one would gate a
    // token budget by accident.
    claim(
      f.hardStop,
      "hard-stop-guaranteed entries",
      {
        // `requireClaim`: this page is the one place that states the number,
        // so a reworded or deleted sentence must fail rather than pass as
        // "no claim in this file" — otherwise the gate is one edit from silent.
        requireClaim: true,
        pattern:
          /(\d+) entr(?:y|ies) (?:that )?(?:carry|carries) an? independently documented hard stop/gi,
      },
      ["docs/reference/FREE_TIERS.md"]
    ),
    claim(
      f.trainsOnPrompts,
      "training-disclosure entries",
      {
        requireClaim: true,
        pattern:
          /(\d+) entr(?:y|ies) (?:that )?(?:carry|carries) a (?:prompt-)?training disclosure/gi,
      },
      ["docs/reference/FREE_TIERS.md"]
    ),
    {
      label: "Free provider rankings sortBy (live code)",
      actual: f.sortBy ?? "reliability",
      docKey: "rankings sortBy",
      strict: true,
      scope: "invariant",
      files: ["src/lib/freeProviderRankings.ts", "src/app/api/free-provider-rankings/route.ts"],
      validate: (content) => {
        // Disjunctive: the gate loops over two files with different shapes —
        // freeProviderRankings.ts carries the union + branch, route.ts the z.enum.
        const hasUnion = /sortBy\?\s*:\s*"elo"\s*\|\s*"reliability"/.test(content);
        const hasReliabilityBranch =
          /sortBy\s*===\s*"reliability"|sortBy\s*!==\s*"reliability"/.test(content);
        const hasZEnum = /z\.enum\(\["elo",\s*"reliability"\]\)/.test(content);
        return (hasUnion && hasReliabilityBranch) || hasZEnum
          ? { ok: true, detail: "union+branch (rankings) or z.enum (route) present" }
          : { ok: false, detail: "ELO-only regression: union+branch and z.enum both missing" };
      },
    },
    {
      // Release-only: the expected literal is itself read from the data file by the facts probe.
      label: "FREE_CATALOG_CURATED_AT (live code)",
      actual: f.catalogDate ?? 0,
      docKey: "FREE_CATALOG_CURATED_AT",
      strict: false,
      scope: "release-only",
      files: ["open-sse/config/freeModelCatalog.data.ts"],
      validate: makeLiteralClaimValidator(f.catalogDate, { what: "FREE_CATALOG_CURATED_AT" }),
    },
    // Duplicate coverage with combo-scoring-weights-schema-coverage.test.ts — soft gate only.
    {
      label: "INTELLIGENT vs DEFAULT (live code)",
      actual: f.intelligentKeys ?? 16,
      docKey: "INTELLIGENT vs DEFAULT",
      strict: false,
      scope: "invariant",
      files: ["src/lib/combos/intelligentRouting.ts", "open-sse/services/autoCombo/scoring.ts"],
      validate: (content) =>
        content.includes("DEFAULT_INTELLIGENT_WEIGHTS") || content.includes("DEFAULT_WEIGHTS")
          ? {
              ok: true,
              detail:
                "weight constant present (strict coverage in combo-scoring-weights-schema-coverage:66)",
            }
          : { ok: false, detail: "no weight constant found" },
    },
  ];
}

// --- Release refresh -----------------------------------------------------------------------

/**
 * Pure rewrite plan (nothing is written): the edits that bring every derived claim to `facts`.
 * Applying `files[].after` and running the release mode on the result clears every STRICT drift
 * the plan rewrites; whatever cannot be rewritten safely (mode pack names, a stale rounded
 * headline, a missing required sentence, release-only checks) is listed in `manual`.
 *
 * @param {{ facts: object, readFile: (path: string) => string | null }} args
 */
export function planDerivedRewrites({ facts, readFile }) {
  if (!facts || typeof facts !== "object") throw new Error("planDerivedRewrites needs facts");
  return planRewritesForChecks(assembleChecks(facts), readFile);
}

// --- Gate run --------------------------------------------------------------------------------

// Queue batches (Mergify drafts, the omni-queue candidate, GitHub's merge queue) are sums of PRs
// this gate already judged one by one; a batch holding the nightly refresh PR next to a feature
// would otherwise read as a feature editing managed values.
const QUEUE_BRANCHES = [/^mergify\/merge-queue\//, /^omni-queue\//, /^gh-readonly-queue\//];
const PR_EVENTS = new Set(["pull_request", "pull_request_target"]);
const BASE_ENV = ["BASE_SHA", "GITHUB_BASE_SHA", "BASE_REF", "GITHUB_BASE_REF"];

function tryGit(args, cwd) {
  try {
    return execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch {
    return null;
  }
}

const revParse = (ref, cwd) =>
  tryGit(["rev-parse", "--verify", "--quiet", `${ref}^{commit}`], cwd)?.trim() || null;

/**
 * Diff base for pr mode. `resolvePrDiffBase` (BASE_SHA, …, origin/release/v<version>) first.
 * On a pull_request run the checkout is GitHub's merge commit: its FIRST PARENT is exactly the
 * base the PR was merged onto, so it is used when nothing else resolves (a `fetch-depth: 2`
 * clone holds HEAD and its two parents) and when the event's base SHA is older than that parent
 * (the base moved between the event and the merge commit — diffing against the older SHA would
 * judge the base's own commits as the PR's).
 */
export function resolveCountsDiffBase({ env = process.env, cwd = ROOT } = {}) {
  const base = resolvePrDiffBase({ env, cwd });
  if (!PR_EVENTS.has(env.GITHUB_EVENT_NAME || "")) return base;
  const first = revParse("HEAD^1", cwd);
  const second = revParse("HEAD^2", cwd);
  if (!first || !second) return base;
  const merged = { sha: first, ref: "HEAD^1 (base side of the PR merge commit)" };
  if (!base) return merged;
  if (
    base.sha !== first &&
    tryGit(["merge-base", "--is-ancestor", base.sha, first], cwd) !== null
  ) {
    return merged;
  }
  return base;
}

/**
 * What the pr mode diffs against: `{ base, branch, skip, infra }` — exactly one of `base`,
 * `skip` (a reason the diff is not judged: writer branch, queue batch, no PR in this run, local
 * run without a base) or `infra` (a PR run in CI whose base cannot be resolved) is set.
 */
export function resolvePrDiffContext({ env = process.env, cwd = ROOT, branch } = {}) {
  const head = branch ?? resolveHeadBranch({ env, cwd });
  const event = env.GITHUB_EVENT_NAME || "";
  // A local batch (the merge train's detached worktree) sums PRs whose own CI already judged
  // their managed values; it cannot know which of them is a writer branch (the nightly refresh
  // PR, a translation wave), so it declares itself a batch instead of being diffed as one PR.
  if ((env.OMNIROUTE_GATE_BATCH || "").trim() === "1") {
    return {
      branch: head,
      skip: "batch run (OMNIROUTE_GATE_BATCH=1) — the PRs it sums were judged one by one",
    };
  }
  if (event === "merge_group" || QUEUE_BRANCHES.some((re) => re.test(head))) {
    return {
      branch: head,
      skip: `queue batch (${head || event}) — the PRs it sums were judged one by one`,
    };
  }
  if (isDerivedWriterBranch(head)) return { branch: head, writer: true };
  const inCi = env.GITHUB_ACTIONS === "true";
  const prContext =
    PR_EVENTS.has(event) || BASE_ENV.some((name) => (env[name] || "").trim() !== "");
  if (inCi && !prContext) {
    return {
      branch: head,
      skip: `no pull request in this run (${event || "no event"}) — nothing to diff`,
    };
  }
  const base = resolveCountsDiffBase({ env, cwd });
  if (base) return { branch: head, base };
  if (inCi) {
    return {
      branch: head,
      infra:
        "the PR diff base could not be resolved (BASE_SHA / GITHUB_BASE_REF not reachable, and " +
        "HEAD is not a merge commit) — check the job's checkout depth and BASE_SHA",
    };
  }
  return {
    branch: head,
    skip:
      "no merge base found locally — set BASE_REF=<ref> or fetch origin/release/v<version> " +
      "to judge managed values",
  };
}

function readRepoFile(root) {
  return (rel) => {
    const abs = path.join(root, rel);
    return fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
  };
}

function gitShowReader(sha, cwd) {
  return (rel) => tryGit(["show", `${sha}:${rel}`], cwd);
}

const INFRA_HINT =
  "This is an infrastructure failure, NOT a documentation divergence — re-run the job; if it " +
  "persists, fix the environment (tsx, OMNIROUTE_FACTS_TIMEOUT_MS, checkout depth).";

/**
 * One run of the gate. Pure apart from what the defaults read: pass `facts` (release) or
 * `base`/`readBase`/`readHead`/`changedFiles` (pr) to run it entirely in memory.
 *
 * @param {object} opts
 * @param {"pr"|"release"} [opts.mode]
 * @param {object} [opts.modeInfo]      resolveGateModeInfo() result, for the header line
 * @param {object} [opts.facts]         release: facts document (collected when absent)
 * @param {object} [opts.factsError]    release: infrastructure error that came with `facts`
 * @param {string} [opts.root]
 * @param {{sha:string,ref:string}|null} [opts.base]  pr: diff base (resolved when undefined)
 * @param {string} [opts.branch]        pr: head branch (resolved when undefined)
 * @param {boolean} [opts.strictSoft]   --strict: soft drift fails too
 * @returns {{ mode, exitCode: 0|1|2, strict: number, soft: number, infra: null|{kind:string,detail:string}, lines: string[], footer: Array<{stream:"log"|"warn"|"error",text:string}>, violations: object[] }}
 */
export function runCountsGate(opts = {}) {
  const mode = opts.modeInfo?.mode ?? opts.mode ?? "release";
  const info = opts.modeInfo ?? { mode, source: "flag", reason: `--mode=${mode}` };
  const root = opts.root ?? ROOT;
  const lines = [`Docs counts sync report — ${describeGateMode(info)}`, "======================="];
  const readHead = opts.readHead ?? readRepoFile(root);
  return mode === "pr"
    ? runPrMode({ ...opts, root, lines, readHead })
    : runReleaseMode({ ...opts, root, lines, readHead });
}

function runReleaseMode({ facts, factsError, root, lines, readHead, strictSoft }) {
  let error = factsError ?? null;
  let resolved = facts;
  if (!resolved) {
    const collected = collectGateFacts({ root });
    resolved = collected.facts;
    error = collected.error;
  }
  if (!resolved.code && !error) error = { kind: "exit", detail: "code facts unavailable" };
  const checks = assembleChecks(resolved);
  const tally = tallyDrift(checks, readHead);
  lines.push(...tally.lines, "");
  const infra = error ? { kind: error.kind, detail: error.detail } : null;
  const strict = tally.strict - (infra ? checks.filter((c) => c.actual === "ERR").length : 0);
  const footer = [];
  let exitCode = 0;
  if (strict > 0) {
    footer.push({
      stream: "error",
      text:
        `✗ ${strict} STRICT drift(s) detected. ` +
        `Update the docs above to the real counts, or regenerate auto-generated sources ` +
        `(npm run gen:provider-reference).`,
    });
    exitCode = 1;
  }
  if (infra) {
    footer.push({
      stream: "error",
      text: `✗ Code facts could not be collected (${infra.kind}): ${infra.detail}. ${INFRA_HINT}`,
    });
    if (!exitCode) exitCode = 2;
  }
  // As before the split: a STRICT drift ends the report; otherwise soft drift is reported (and
  // fails only with --strict), and a clean run says so.
  if (strict === 0) {
    if (tally.soft > 0) {
      footer.push({
        stream: "warn",
        text: `⚠ ${tally.soft} potential (soft) drift(s) detected. Review the docs above.`,
      });
      if (strictSoft && !exitCode) exitCode = 1;
    } else if (!infra) {
      footer.push({ stream: "log", text: "✓ All checks pass." });
    }
  }
  return {
    mode: "release",
    exitCode,
    strict,
    soft: tally.soft,
    infra,
    lines,
    footer,
    violations: [],
  };
}

function runPrMode(opts) {
  const { root, lines, readHead, strictSoft } = opts;
  const env = opts.env ?? process.env;
  const checks = assembleChecks(PR_MODE_FACTS);
  const invariants = checks.filter((c) => c.scope === "invariant");
  const derived = checks.filter((c) => c.scope === "derived");
  const releaseOnly = checks.filter((c) => c.scope === "release-only");

  let context;
  if (opts.base !== undefined || opts.readBase) {
    context = { branch: opts.branch ?? "", base: opts.base ?? null };
    if (opts.branch && isDerivedWriterBranch(opts.branch)) context.writer = true;
  } else {
    context = resolvePrDiffContext({ env, cwd: root, branch: opts.branch });
  }

  if (context.base) {
    lines.push(
      `PR diff base: ${context.base.ref} @ ${context.base.sha.slice(0, 10)}` +
        (context.branch ? ` (head ${context.branch})` : "")
    );
  } else if (context.writer) {
    lines.push(`PR diff base: not needed — ${context.branch} writes managed values`);
  } else if (context.skip) {
    lines.push(`PR diff base: skipped — ${context.skip}`);
  } else if (context.infra) {
    lines.push(`PR diff base: UNRESOLVED — ${context.infra}`);
  } else if (opts.readBase) {
    lines.push("PR diff base: provided by the caller");
  }

  const tally = tallyDrift(invariants, readHead);
  lines.push(...tally.lines, "");

  let violations = [];
  if (context.writer) {
    lines.push(...evaluatePrDiff({ checks: derived, writerBranch: context.branch || true }).lines);
  } else if (context.base || opts.readBase) {
    const readBase = opts.readBase ?? gitShowReader(context.base.sha, root);
    let changedFiles = opts.changedFiles;
    if (changedFiles === undefined && context.base) {
      changedFiles = listChangedFiles(context.base.sha, {
        cwd: root,
        includeWorktree: !env.CI,
      });
    }
    const diff = evaluatePrDiff({ checks: derived, readBase, readHead, changedFiles });
    violations = diff.violations;
    lines.push(...diff.lines);
  } else {
    lines.push(`• Managed values edited by this change: not judged (${context.skip || "no base"})`);
  }
  lines.push(
    `• Release-only checks (need the live code facts; run by the release PR and ` +
      `release:refresh-derived --check): ${releaseOnly.map((c) => c.label).join("; ")}`,
    ""
  );

  const infra = context.infra ? { kind: "base", detail: context.infra } : null;
  const footer = [];
  let exitCode = 0;
  if (tally.strict > 0 || violations.length > 0) {
    footer.push({
      stream: "error",
      text:
        `✗ ${tally.strict} STRICT drift(s) and ${violations.length} managed-value edit(s) ` +
        `detected. Managed numbers are written by the release refresh ` +
        `(npm run release:refresh-derived) — restore the lines above to the base text.`,
    });
    exitCode = 1;
  }
  if (infra) {
    footer.push({
      stream: "error",
      text: `✗ PR diff base unresolved: ${infra.detail}. ${INFRA_HINT}`,
    });
    if (!exitCode) exitCode = 2;
  }
  if (!exitCode) {
    if (tally.soft > 0) {
      footer.push({
        stream: "warn",
        text: `⚠ ${tally.soft} potential (soft) drift(s) detected. Review the docs above.`,
      });
      if (strictSoft) exitCode = 1;
    } else {
      footer.push({ stream: "log", text: "✓ All checks pass." });
    }
  }
  return {
    mode: "pr",
    exitCode,
    strict: tally.strict,
    soft: tally.soft,
    infra,
    lines,
    footer,
    violations,
  };
}

function main() {
  let info;
  try {
    info = resolveGateModeInfo({ argv: process.argv, env: process.env });
  } catch (err) {
    console.error(`✗ ${err.message}`);
    process.exit(2);
  }
  let result;
  try {
    result = runCountsGate({
      modeInfo: info,
      env: process.env,
      strictSoft: process.argv.includes("--strict"),
    });
  } catch (err) {
    console.error(`✗ Docs counts gate could not run: ${err?.stack || err}\n${INFRA_HINT}`);
    process.exit(2);
  }
  for (const l of result.lines) console.log(l);
  for (const { stream, text } of result.footer) console[stream](text);
  process.exit(result.exitCode);
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
