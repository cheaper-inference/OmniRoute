#!/usr/bin/env node
// scripts/quality/validate-release-green.mjs
//
// "Release-green" pre-flight validator (Solution C).
//
// WHY: the full gate (ci.yml — unit shards, vitest, ratchets, package-artifact)
// runs ONLY on the release PR (PR → main). PRs into release/** only get the
// fast-gates (quality.yml: TIA-impacted tests + typecheck + lint checks). So
// reds accumulate silently on the release branch and explode — in layers — at
// release time. This script reproduces the release-equivalent validation against
// the CURRENT working tree so the maintainer (or the nightly, Solution D) can see
// the real state of the release branch at any time.
//
// DESIGN — never blocking to contributors:
//   • HARD checks (typecheck, lint errors, db-rules, public-creds, docs-all,
//     unit, vitest, integration, optionally package-artifact) → a failure here is
//     a real defect; exit 1.
//   • DRIFT checks (eslint WARNINGS, cognitive-complexity, file-size, cyclomatic
//     complexity, dead-code, type-coverage, compression-budget, openapi-coverage,
//     pricing-freshness,
//     workflow-lint/zizmor, codeql-ratchet) → ratchet drift accrued across the
//     cycle is NOT a contributor's fault; it is reported and rebaselined by the
//     maintainer at release. Drift NEVER changes the exit code, so wiring this as
//     a check can never block anyone on drift.
//
// SCOPE: this diagnoses the curated checks below and, with --full-ci, the static
// commands extracted from selected CI jobs. It does not reproduce every workflow,
// matrix, hosted scanner or merge-candidate gate. A local PASS is not merge admission.
//
// This script DIAGNOSES + REPORTS only (no auto-fix). The fix-to-green
// orchestration lives in the /green-prs + review-prs flows that call it.
//
// Usage:
//   node scripts/quality/validate-release-green.mjs [--json] [--with-build] [--quick] [--full-ci] [--hermetic]
//     --json        emit machine-readable JSON to stdout (report goes to stderr)
//     --with-build  also run check:pack-artifact (needs a dist/ build — slow)
//     --quick       skip the slow unit + vitest + integration suites (drift + fast
//                   gates only)
//     --full-ci     ALSO run every static gate declared in ci.yml's gate jobs (lint,
//                   quality-gate, quality-extended, docs-sync-strict, pr-test-policy) —
//                   read straight from ci.yml so the set never drifts. Catches the whole
//                   "static base-red" category the curated list missed (v3.8.46: 11 of 16
//                   leaked reds). Pair with --quick for the fast "1 command, 0 CI layers" pass.
//     --hermetic    scrub OMNIROUTE_API_KEY/OMNIROUTE_URL from gate env so live
//                   tests self-skip exactly like CI (dev machines otherwise run
//                   them against localhost and produce false-positive reds)
//
// Per-gate output is saved to _artifacts/release-green/<gate>.log (gitignored) —
// diagnose a red from the file instead of re-running the gate.

import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { availableParallelism } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { load as parseYaml } from "js-yaml";
import { runGateProcess } from "./gate-process.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
export const ESLINT_TIMEOUT_MS = 60 * 60 * 1000;

// Convenient per-gate summaries. The supervisor additionally persists immutable,
// incremental command logs and receipts under commands/; these are required evidence.
const LOG_DIR = join(ROOT, "_artifacts", "release-green");
function saveGateLog(id, out) {
  try {
    mkdirSync(LOG_DIR, { recursive: true });
    writeFileSync(join(LOG_DIR, `${id}.log`), String(out ?? ""));
  } catch {
    /* log persistence is best-effort — never fails a gate */
  }
}

// ─── Pure helpers (exported for tests) ──────────────────────────────────────

/** Read the committed ratchet baseline value for a metric (null if unknown). */
export function baselineValue(metric, root = ROOT) {
  try {
    const raw = JSON.parse(
      readFileSync(join(root, "config/quality/quality-baseline.json"), "utf8")
    );
    const metrics = raw.metrics || raw;
    const v = metrics?.[metric]?.value;
    return typeof v === "number" ? v : null;
  } catch {
    return null;
  }
}

// A line that is unambiguously a PASS. Test reporters print the file name on BOTH the
// pass and the fail line, so a green line for a file whose NAME contains "fail"
// (fail-fast-*.test.ts, failover-*.test.ts) must never be offered as a failure cause.
const GREEN_LINE_RE = /^[✓✔√]/;

// Markers that are only meaningful at the START of a line: "FAIL" also occurs inside test
// FILE NAMES and inside summary prose ("Test Files 1 failed"), so matching it anywhere —
// and case-insensitively — reports a PASSING file as the cause of the red.
const LINE_START_FAILURE_RE = /^(?:[✖✗×]|FAIL\b|not ok\b|REGRESS)/;

// Markers that are unambiguous ANYWHERE in the line: tsc and Node emit them mid-line
// ("src/x.ts(10,5): error TS2322: ..."), so these stay unanchored. They are matched
// case-SENSITIVELY because that is how the emitting tools actually spell them.
const INLINE_FAILURE_RE = /\berror TS\d+\b|\bAssertionError\b|\bError:|\bREGRESS/;

/** Best-effort "first meaningful failure line" from captured command output. */
export function firstFailureLine(out) {
  const lines = String(out || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const hit = lines.find(
    (l) => !GREEN_LINE_RE.test(l) && (LINE_START_FAILURE_RE.test(l) || INLINE_FAILURE_RE.test(l))
  );
  return (hit || lines[lines.length - 1] || "failed").slice(0, 200);
}

/** Sum {errorCount,warningCount} across an eslint --format json result array. */
export function eslintCounts(parsed) {
  let errors = 0;
  let warnings = 0;
  for (const f of parsed || []) {
    errors += f.errorCount || 0;
    warnings += f.warningCount || 0;
  }
  return { errors, warnings };
}

/**
 * Parse the eslint JSON array out of mixed stdout (tolerates a leading banner AND trailing
 * non-JSON text, e.g. ESLint 9.x's `--suppressions-location` "unpruned suppressions" stderr
 * sentence glued onto the report when stdout+stderr are concatenated — #7837).
 */
export function parseEslintJson(out) {
  const str = String(out || "");
  const start = str.indexOf("[");
  if (start < 0) return null;
  // Fast path: the whole remainder is valid JSON (no trailing text).
  try {
    return JSON.parse(str.slice(start));
  } catch {
    // fall through to bracket-depth scan below
  }
  // Slow path: find the matching closing "]" for the array that starts at `start`, tolerating
  // any non-JSON text appended after it. Depth-tracks brackets while skipping over string
  // literals (so a "]" or "[" inside a message string doesn't miscount).
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < str.length; i++) {
    const ch = str[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
    } else if (ch === "[") {
      depth++;
    } else if (ch === "]") {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(str.slice(start, i + 1));
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

/**
 * Turn one ESLint process result into release-green records.
 *
 * Keep process failures distinct from report parsing failures. In particular, a timed-out
 * ESLint process has no JSON report by definition; collapsing its code-124 diagnostic into
 * "could not parse eslint json" hides the actionable cause and sends maintainers debugging
 * the parser instead of the gate ceiling.
 */
export function evaluateEslintRun({ code, out }, warningBaseline) {
  if (code !== 0) {
    return [
      {
        id: "lint",
        label: "ESLint",
        kind: "hard",
        ok: false,
        detail:
          code === 124
            ? firstFailureLine(out)
            : `ESLint process exited ${code}: ${firstFailureLine(out)}`,
      },
    ];
  }
  const parsed = parseEslintJson(out);
  if (!parsed) {
    return [
      {
        id: "lint",
        label: "ESLint",
        kind: "hard",
        ok: false,
        detail:
          code === 0
            ? "ESLint exited successfully but produced no valid JSON report"
            : firstFailureLine(out),
      },
    ];
  }

  const { errors, warnings } = eslintCounts(parsed);
  const warningDrift = isDrift(warnings, warningBaseline);
  return [
    {
      id: "lint-errors",
      label: "ESLint errors",
      kind: "hard",
      ok: errors === 0,
      detail: `${errors} error(s)`,
    },
    {
      id: "eslint-warnings",
      label: "ESLint warnings (ratchet)",
      kind: "drift",
      ok: !warningDrift,
      detail:
        warningBaseline == null
          ? `${warnings} (no baseline)`
          : `${warnings} vs baseline ${warningBaseline}${
              warningDrift ? ` (+${warnings - warningBaseline} drift → rebaseline at release)` : ""
            }`,
    },
  ];
}

/** Pull the cognitive-complexity violation count from the gate's output. */
export function parseCognitiveCount(out) {
  const s = String(out || "");
  // `check:complexity-ratchets` runs ONE shared ESLint walk and prints BOTH ratchets, with the
  // cyclomatic "N violações" summary emitted FIRST — so a bare `\d+ violações` regex would grab
  // the cyclomatic count. Prefer the unambiguous machine-readable `cognitiveComplexity=N` line
  // (mirrors the cyclomatic `complexity=N` parse used for cycCurrent below).
  const machine = s.match(/(?:^|\n)cognitiveComplexity=(\d+)/);
  if (machine) return Number(machine[1]);
  const m = s.match(/(\d+)\s+(?:function\(s\) exceed|violações|violations)/i);
  return m ? Number(m[1]) : null;
}

/** Translate the shared complexity walk into the two metric records. */
export function evaluateComplexityRun({ code, out }, cogBase) {
  // The shared walk emits both machine counts followed by both ratchet verdicts.
  // Do not use the legacy generic "N violações" fallback here: a partial walk
  // containing only the cyclomatic summary would masquerade as cognitive data.
  const cogMatch = /^cognitiveComplexity=(\d+)\r?$/m.exec(out);
  const cycMatch = /^complexity=(\d+)\r?$/m.exec(out);
  const cogSummary = /^\[cognitive-complexity\] (OK|REGRESSÃO) — (\d+) violações /m.exec(out);
  const cycSummary = /^\[complexity\] (OK|REGRESSÃO) — (\d+) violações /m.exec(out);
  const cogCurrent = cogMatch ? Number(cogMatch[1]) : null;
  const cycCurrent = cycMatch ? Number(cycMatch[1]) : null;
  const cogOver = isDrift(cogCurrent, cogBase);
  const cycRegressed = cycSummary?.[1] === "REGRESSÃO";
  const measured =
    [cogCurrent, cycCurrent, cogBase].every((count) => Number.isSafeInteger(count) && count >= 0) &&
    Number(cogSummary?.[2]) === cogCurrent &&
    Number(cycSummary?.[2]) === cycCurrent &&
    (cogSummary?.[1] === "REGRESSÃO") === cogOver;
  // Exit 1 is expected only for a complete, measured ratchet regression. A
  // cancelled/crashed tool or missing metrics is execution failure, not drift.
  const measuredDrift = code === 1 && measured && (cogOver || cycRegressed);
  if (!measured || (code !== 0 && !measuredDrift)) {
    return [
      {
        id: "complexity",
        label: "Complexity measurement",
        kind: "hard",
        ok: false,
        detail:
          code !== 0
            ? `Complexity process exited ${code}: ${firstFailureLine(out)}`
            : "Complexity process did not report complete finite metrics and baseline",
      },
    ];
  }
  return [
    {
      id: "cognitive-complexity",
      label: "Cognitive complexity (ratchet)",
      kind: "drift",
      ok: !cogOver,
      detail: `${cogCurrent} vs baseline ${cogBase}${cogOver ? ` (+${cogCurrent - cogBase} drift → rebaseline at release)` : ""}`,
    },
    {
      id: "complexity",
      label: "Cyclomatic complexity (ratchet)",
      kind: "drift",
      ok: !cycRegressed,
      detail: `complexity=${cycCurrent} (shared walk with cognitive)${cycRegressed ? " REGRESSED" : ""}`,
    },
  ];
}

/**
 * Drift verdict for a ratchet: a metric that grew past its committed baseline is
 * "drift" (reported, never blocking). `direction:"down"` metrics (warnings,
 * complexity, file-size counts) regress when current > baseline.
 */
export function isDrift(current, baseline) {
  if (typeof current !== "number" || typeof baseline !== "number") return false;
  return current > baseline;
}

/** releaseGreen iff there are zero failing HARD checks (drift never blocks). */
export function computeVerdict(results) {
  const hardFailures = results.filter((r) => r.kind === "hard" && !r.ok);
  const drift = results.filter((r) => r.kind === "drift" && !r.ok);
  return { releaseGreen: hardFailures.length === 0, hardFailures, drift };
}

// ─── --full-ci: reproduce the EXACT ci.yml gate set (P0, v3.8.46 post-mortem) ──
//
// WHY: the curated HARD/DRIFT lists above are a hand-maintained SUBSET. The v3.8.46
// release leaked 11 static/gate base-reds (route-validation:t06, docs-counts --strict,
// docs-symbols, bundle-size --ratchet, test-masking, …) that the pre-flight never ran
// because they live only in the ci.yml gate JOBS, not in this script. --full-ci reads
// ci.yml itself and runs every `npm run check:*` / `npm run lint` from those jobs, so the
// set stays current as gates are added (no drift between this script and CI). One command
// → zero CI layers for the whole static category.

/** ci.yml jobs whose npm-run gate steps --full-ci reproduces locally. */
export const FULL_CI_GATE_JOBS = [
  "lint",
  "quality-gate",
  "quality-extended",
  "docs-sync-strict",
  "pr-test-policy",
];

// Gates that cannot run meaningfully in a local working-tree pre-flight:
//   • check:pr-evidence  — inspects the open PR body (no PR locally)
//   • check:codeql-ratchet — queries GitHub's code-scanning alerts for the REMOTE main
//     branch (CodeQL Default Setup only analyzes main/PRs→main; a local run reflects
//     post-merge server state the pre-flight can't change). Checked on the release PR.
export const FULL_CI_SKIP = new Set(["check:pr-evidence", "check:codeql-ratchet"]);

// Gates that need a specific env to behave like CI (else they compare against the wrong base).
export const FULL_CI_ENV = { "check:test-masking": { GITHUB_BASE_REF: "main" } };

const FULL_CI_DEFAULT_TIMEOUT_MS = 10 * 60 * 1000;
const FULL_CI_TIMEOUT_OVERRIDES_MS = {
  // Measured at 19m38s on the loaded release-v3.8.50 devbox. The former generic
  // 10m ceiling killed a green scan before it could report its result.
  "check:test-masking": 30 * 60 * 1000,
};

export function fullCiTimeoutFor(gateId) {
  return FULL_CI_TIMEOUT_OVERRIDES_MS[gateId] ?? FULL_CI_DEFAULT_TIMEOUT_MS;
}

// ci.yml gate scripts whose result the CURATED pass already records under a DIFFERENT id.
// Without this map the --full-ci pass re-records them unconditionally as kind:"hard" while
// the curated pass recorded them as kind:"drift", and the SAME gate is printed in BOTH
// verdict buckets of one report (file-size / compression-budget appeared as a hard failure
// and as drift simultaneously in the #9985 verdict).
export const FULL_CI_CURATED_ALIASES = {
  lint: "lint-errors",
  "check:workflows": "workflow-lint",
  "check:complexity-ratchets": "complexity",
};

/** Curated-pass id equivalent to a ci.yml gate script id ("check:file-size" -> "file-size"). */
export function curatedEquivalentId(scriptId) {
  const id = String(scriptId || "");
  if (Object.hasOwn(FULL_CI_CURATED_ALIASES, id)) return FULL_CI_CURATED_ALIASES[id];
  return id.startsWith("check:") ? id.slice("check:".length) : id;
}

/**
 * Bucket a --full-ci gate must be reported under: the classification the curated pass already
 * gave the equivalent gate, else "hard" (the --full-ci default for gates the curated list does
 * not cover). This only changes WHICH BUCKET a result is printed in — it never changes whether
 * a gate runs, nor whether it passed.
 */
export function fullCiKindFor(scriptId, results) {
  const equivalent = curatedEquivalentId(scriptId);
  const curated = (results || []).find((r) => r.id === scriptId || r.id === equivalent);
  return curated?.kind ?? "hard";
}

/**
 * Parse a ci.yml text and return the ordered, de-duplicated list of gate commands to run.
 * Each entry: { id, job, args:["run", <script>, ...("--" + args)], env }.
 * Only `npm run lint` and `npm run check:*` steps are taken (build/install/test-run npm
 * scripts are ignored); a `run: |` block is scanned line-by-line so multi-command steps work.
 * Exported pure (no side effects) so the extraction has a fixture-driven unit test.
 */
export function extractCiGates(
  yamlText,
  { jobs = FULL_CI_GATE_JOBS, skip = FULL_CI_SKIP, envMap = FULL_CI_ENV } = {}
) {
  const doc = parseYaml(yamlText) || {};
  const gates = [];
  const seen = new Set();
  for (const job of jobs) {
    const steps = doc?.jobs?.[job]?.steps;
    if (!Array.isArray(steps)) continue;
    for (const step of steps) {
      // A step guarded to pull_request events reads the PR's base/head/title/body, which a
      // scheduled or push validation does not have (check:ai-attribution ran `git log ".."`).
      if (typeof step?.if === "string" && /event_name\s*==\s*['"]pull_request['"]/.test(step.if)) {
        continue;
      }
      const runStr = typeof step?.run === "string" ? step.run : "";
      if (!runStr) continue;
      for (const rawLine of runStr.split("\n")) {
        const m = rawLine.trim().match(/^npm run (\S+)(?:\s+--\s+(.+?))?\s*$/);
        if (!m) continue;
        const script = m[1];
        if (script !== "lint" && !script.startsWith("check:")) continue; // gates only
        if (skip.has(script) || seen.has(script)) continue; // dedup + skip non-local
        seen.add(script);
        const extra = m[2] ? m[2].split(/\s+/).filter(Boolean) : [];
        gates.push({
          id: script,
          job,
          // preserve the `--` so args reach the script (npm run x -- --ratchet)
          args: extra.length ? ["run", script, "--", ...extra] : ["run", script],
          env: envMap[script],
        });
      }
    }
  }
  return gates;
}

// ─── Unit shards (2026-10-19 full sweep) ─────────────────────────────────────

/**
 * ci.yml's unit shard count, read from its `test-unit` job: the matrix must be 1..N and the
 * step's TEST_SHARD must be `${{ matrix.shard }}/N`, so this validator runs exactly the shards a
 * PR's "Unit Tests (i/N)" jobs run. Anything it cannot reproduce exactly (no matrix, a gap, a
 * different denominator, unparsable YAML) returns null: the caller then runs the unsharded suite.
 */
export function unitShardCountFromCi(yamlText) {
  return shardCountFromCi(yamlText, "test-unit");
}

/** Same reading for any sharded ci.yml job (`test-unit`, `test-integration`). */
export function shardCountFromCi(yamlText, jobId) {
  let doc;
  try {
    doc = parseYaml(yamlText);
  } catch {
    return null;
  }
  const job = doc?.jobs?.[jobId];
  const matrix = job?.strategy?.matrix?.shard;
  if (!Array.isArray(matrix) || matrix.length < 2) return null;
  if (!matrix.every((value, index) => value === index + 1)) return null;
  const denominators = (Array.isArray(job.steps) ? job.steps : [])
    .map((step) =>
      /^\$\{\{\s*matrix\.shard\s*\}\}\/(\d+)$/.exec(String(step?.env?.TEST_SHARD ?? ""))
    )
    .filter(Boolean)
    .map((match) => Number(match[1]));
  if (denominators.length === 0 || denominators.some((n) => n !== matrix.length)) return null;
  return matrix.length;
}

/**
 * Unit shards running at once: one per four cores (each shard runs --test-concurrency=4),
 * capped at the shard count. `cpus` is availableParallelism(), which honours the runner's
 * cgroup cpu.max: the omni-release slot (CPUQuota=800% on the 32-core .113) reports 8, so 2
 * shards run at once there; a hosted 4-vCPU runner runs them one at a time.
 */
export function unitShardPool(shards, cpus) {
  return Math.max(1, Math.min(shards, Math.floor(cpus / 4)));
}

/** Runs `worker` over `items` with at most `limit` in flight; results keep the input order. */
export async function runPool(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  const lanes = Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(lanes);
  return results;
}

/**
 * Folds the per-shard results into the single `unit` gate: exit 0 only when every shard passed,
 * otherwise the first failing shard's code. `out` keeps each shard's output under a header;
 * `detail` names the failing shards plus the first failure line of the first shard that failed
 * on a test. A shard killed at its ceiling contributes no line of its own: its log is full of
 * deliberate fixture errors (the batch route's SQLITE_CANTOPEN headed the 2026-10-19 report).
 */
export function mergeUnitShardResults(shardResults) {
  const status = (r) => (r.code === 0 ? "PASS" : r.code === 124 ? "TIMEOUT" : `exit ${r.code}`);
  const out = shardResults
    .map((r) => `──── unit shard ${r.shard}/${r.total}: ${status(r)} ────\n${r.out ?? ""}`)
    .join("\n");
  const failed = shardResults.filter((r) => r.code !== 0);
  if (failed.length === 0) return { code: 0, out, detail: "pass" };
  const named = failed.map((r) => `${r.shard}/${r.total} ${status(r)}`).join(", ");
  const testFailure = failed.find((r) => r.code !== 124);
  const line = testFailure ? ` — ${firstFailureLine(testFailure.out)}` : "";
  return { code: failed[0].code, out, detail: `unit shard ${named}${line}` };
}

// ─── Hosted suite results (2026-10-20) ───────────────────────────────────────

/**
 * Names of the hosted Release-Green suite jobs, in the order they are reported: ci.yml's unit
 * shards, its integration shards, then vitest (MCP + UI). The workflow's `suites` matrix writes
 * one `<name>.json` per job; a name with no file is a job that never reported.
 */
export function hostedSuiteNames(unitShards, integrationShards) {
  const range = (n, prefix) => Array.from({ length: n }, (_, i) => `${prefix}-${i + 1}`);
  return [...range(unitShards, "unit"), ...range(integrationShards, "integration"), "vitest"];
}

/** Parses one hosted suite result file; anything malformed counts as "no result". */
export function parseHostedSuiteResult(text) {
  try {
    const r = JSON.parse(text);
    if (typeof r?.name !== "string" || !Number.isInteger(r?.code)) return null;
    return { name: r.name, code: r.code, detail: typeof r.detail === "string" ? r.detail : "" };
  } catch {
    return null;
  }
}

/**
 * Folds the hosted suite results into the `unit`, `integration` and `vitest` HARD gates the
 * local lanes used to record, so the verdict, the tracking issue and every reader of
 * release-green.json keep the same ids. A lane passes only when every expected job reported
 * exit 0; a job that never reported (cancelled, timed out, upload lost) fails it.
 */
export function foldHostedSuiteResults(results, { unitShards, integrationShards }) {
  const byName = new Map(results.filter(Boolean).map((r) => [r.name, r]));
  const lane = (id, label, names) => {
    const parts = [];
    let line = "";
    for (const name of names) {
      const r = byName.get(name);
      if (!r) {
        parts.push(`${name} no result`);
        continue;
      }
      if (r.code === 0) continue;
      parts.push(`${name} ${r.code === 124 ? "TIMEOUT" : `exit ${r.code}`}`);
      if (!line && r.code !== 124 && r.detail) line = r.detail;
    }
    return {
      id,
      label,
      kind: "hard",
      ok: parts.length === 0,
      detail: parts.length === 0 ? "pass" : `${parts.join(", ")}${line ? ` — ${line}` : ""}`,
    };
  };
  const names = hostedSuiteNames(unitShards, integrationShards);
  return [
    lane(
      "unit",
      `Unit tests (ci.yml's ${unitShards} shards on hosted runners)`,
      names.filter((n) => n.startsWith("unit-"))
    ),
    lane(
      "integration",
      `Integration tests (ci.yml's ${integrationShards} shards on hosted runners)`,
      names.filter((n) => n.startsWith("integration-"))
    ),
    lane("vitest", "Vitest (MCP + UI, hosted runner)", ["vitest"]),
  ];
}

// ─── Orchestration (only when run directly) ─────────────────────────────────

/**
 * Map a thrown `execFileSync` error to a {code, out} gate result. Exported as a pure helper
 * so the timeout/hang path has a regression test: a gate that exceeds its ceiling (e.g. the unit
 * suite wedged on an unreleased SQLite handle — see CLAUDE.md "Database Handles in Tests") is
 * killed by `execFileSync` (`err.killed === true`) and MUST surface as a visible non-zero gate,
 * never an infinite block that the release captain mistakes for a hang and kills the pre-flight.
 */
export function classifyRunError(err, timeoutMs) {
  const timedOut = err?.killed === true || err?.code === "ETIMEDOUT";
  if (timedOut && timeoutMs) {
    return {
      code: 124,
      out: `${err?.stdout || ""}${err?.stderr || ""}${err?.stdout || err?.stderr ? "\n" : ""}gate exceeded its ${Math.round(timeoutMs / 1000)}s ceiling and was killed — treat as a hung/failed gate (e.g. an unreleased DB handle in the unit suite); does NOT pass`,
    };
  }
  return {
    code: typeof err?.status === "number" ? err.status : 1,
    out: `${err?.stdout || ""}${err?.stderr || ""}`,
  };
}

// --hermetic: scrub the live-test trigger vars so the pre-flight behaves like CI
// (a dev machine with OMNIROUTE_API_KEY set runs 17+ live tests that CI skips —
// every one a false-positive red against the release branch).
const HERMETIC_SCRUB = ["OMNIROUTE_API_KEY", "OMNIROUTE_URL"];
let hermetic = false;
/**
 * Env for the pack gate's provenance guard (#10427).
 *
 * `validate-pack-artifact.ts` checks `dist/BUILD_SHA` for ancestry against
 * `OMNIROUTE_RELEASE_REF`, defaulting to `origin/main`. That default is right at
 * PUBLICATION (npm-publish.yml runs on main) but structurally impossible here: this
 * validator runs ON a release branch, whose tip is by definition NOT an ancestor of
 * main mid-cycle, so the gate reported `off-release-line` on every single run and the
 * tarball boot-smoke cascaded off it. `ci.yml` already resolves the same problem for
 * `pull_request` by pointing the ref at the head under test; the checkable invariant
 * here is identical — "the stamp matches the tree we just validated" — so point it at
 * HEAD. This does not relax the guard: a dist/ built from some other commit still
 * fails, and a missing BUILD_SHA still fails.
 */
const PACK_GATE_ENV = { OMNIROUTE_RELEASE_REF: "HEAD" };

/**
 * Heap for the sweep's webpack build. build-next-isolated.mjs defaults to 8192 MB, and on the
 * omni-release slot the Next build worker died with "JavaScript heap out of memory" after
 * ~20 min (sweep 39254440706, 2026-10-19); the earlier sweeps sat in the same phase until their
 * ceiling. docker-publish builds with 12288 (proven 2026-10-16/17); the build runs alone in the
 * slot's 20 GB memory.high, so 12 GB of V8 heap fits.
 */
const BUILD_GATE_ENV = { OMNIROUTE_BUILD_MEMORY_MB: "12288" };

function buildGateEnv(extra) {
  const env = { ...process.env, FORCE_COLOR: "0", ...(extra || {}) };
  if (hermetic) for (const k of HERMETIC_SCRUB) delete env[k];
  return env;
}

const commandReceipts = [];
const cancellation = new AbortController();

async function run(cmd, cmdArgs, opts = {}) {
  const label = opts.label || `${cmd} ${cmdArgs.join(" ")}`;
  const logPath = join(LOG_DIR, "commands", `${randomUUID()}.log`);
  const result = await runGateProcess(cmd, cmdArgs, {
    cwd: ROOT,
    env: buildGateEnv(opts.env),
    logPath,
    timeout: opts.timeout || 30 * 60 * 1000,
    signal: cancellation.signal,
    onHeartbeat: ({ elapsedMs, bytes, lastOutputAt }) =>
      process.stderr.write(
        `… ${label}: ${Math.round(elapsedMs / 1000)}s, ${bytes} bytes, last output ${lastOutputAt}\n`
      ),
  });
  commandReceipts.push({ command: label, receiptPath: result.receiptPath, ...result.receipt });
  return result;
}

const runAsync = run;

/**
 * Package-artifact gate, run the way ci.yml's pack job runs it (#10427).
 *
 * `check:pack-artifact` assembles dist/ through `build:cli` when staging is missing, and
 * `build:cli` never writes dist/BUILD_SHA — only `build:release` does. Pointing the ref at
 * HEAD (PACK_GATE_ENV) is not enough on its own: the guard still stops at "dist/BUILD_SHA is
 * missing". ci.yml builds, stamps, then validates; mirror that order here. The guard is not
 * relaxed: an unstamped dist/ or one built from another commit still fails.
 */
async function runPackArtifactGate(timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  const steps = [
    { cmd: npmCmd, args: ["run", "build:cli"], env: BUILD_GATE_ENV },
    { cmd: process.execPath, args: ["scripts/build/write-build-sha.mjs"] },
    {
      cmd: npmCmd,
      args: ["run", "check:pack-artifact"],
      env: PACK_GATE_ENV,
    },
  ];
  let out = "";
  for (const step of steps) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) return classifyRunError({ killed: true, signal: "SIGTERM" }, timeoutMs);
    const result = await runAsync(step.cmd, step.args, { env: step.env, timeout: remaining });
    out += result.out;
    if (result.code !== 0) return { code: result.code, out };
  }
  return { code: 0, out };
}

/**
 * The unit lane: ci.yml's own shards (`npm run test:unit:ci:shard` with TEST_SHARD=i/N, the
 * command each "Unit Tests (i/N)" job runs), `pool` at a time, each under its own ceiling.
 */
async function runUnitShards(total, pool, timeout) {
  const shards = Array.from({ length: total }, (_, index) => index + 1);
  const results = await runPool(shards, pool, async (shard) => {
    const { code, out } = await runAsync(npmCmd, ["run", "test:unit:ci:shard"], {
      timeout,
      env: { TEST_SHARD: `${shard}/${total}` },
      label: `${npmCmd} run test:unit:ci:shard (TEST_SHARD=${shard}/${total})`,
    });
    return { shard, total, code, out };
  });
  return mergeUnitShardResults(results);
}

async function main() {
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.once(signal, () => cancellation.abort(signal));
  }
  const args = new Set(process.argv.slice(2));
  const JSON_OUT = args.has("--json");
  const WITH_BUILD = args.has("--with-build");
  const QUICK = args.has("--quick");
  const FULL_CI = args.has("--full-ci");
  hermetic = args.has("--hermetic");
  // --suites-from <dir>: unit, integration and vitest already ran as hosted jobs (the
  // workflow's `suites` matrix); read their results instead of running them on this slot.
  const suitesFromIndex = process.argv.indexOf("--suites-from");
  const SUITES_FROM = suitesFromIndex >= 0 ? process.argv[suitesFromIndex + 1] : null;

  const results = [];
  const record = (r) => {
    results.push(r);
    const icon = r.ok ? "✅" : r.kind === "drift" ? "🟡" : "❌";
    process.stderr.write(`${icon} [${r.kind}] ${r.label}${r.detail ? ` — ${r.detail}` : ""}\n`);
  };

  // Announce before running; supervisor heartbeats then distinguish a quiet process
  // from a missing observation without treating silence as a successful result.
  const announce = (label) => process.stderr.write(`▶ ${label}…\n`);

  const hardCmd = async (id, label, cmd, cmdArgs, opts) => {
    announce(label);
    const { code, out } = await run(cmd, cmdArgs, opts);
    saveGateLog(id, out);
    record({
      id,
      label,
      kind: "hard",
      ok: code === 0,
      detail: code === 0 ? "pass" : firstFailureLine(out),
    });
  };

  // A ratchet command (check:complexity, check:dead-code, …) exits 1 ONLY on a
  // measured regression and self-skips (exit 0) when its tooling is absent — so a
  // non-zero exit here is drift to rebaseline at release, never a contributor block.
  // ALL checks run regardless of earlier failures (the report is collected, not
  // fail-fast) so one pass surfaces every red instead of revealing them in layers.
  const driftCmd = async (id, label, cmd, cmdArgs, okDetail = "within baseline", opts) => {
    announce(label);
    const { code, out } = await run(cmd, cmdArgs, opts);
    saveGateLog(id, out);
    record({
      id,
      label,
      kind: "drift",
      ok: code === 0,
      detail: code === 0 ? okDetail : firstFailureLine(out),
    });
  };

  process.stderr.write("🔎 Release-green validation (current working tree)\n\n");

  await hardCmd("typecheck", "Typecheck (core)", npmCmd, ["run", "typecheck:core"]);

  // ESLint: ONE pass → errors (hard) + warnings (drift)
  {
    announce("ESLint (errors + warnings — ~15-45min)");
    // Suppressions-aware, matching `npm run lint` (Pacote 4 no-new-warnings): the frozen
    // pre-existing debt in config/quality/eslint-suppressions.json must not count as
    // errors here — only NET-NEW violations are release reds. The cold release runner can
    // exceed 30 minutes as the repository grows, and this pre-flight often runs under load.
    const lintRun = await run(
      "npx",
      [
        "eslint",
        ".",
        "--cache",
        "--cache-location",
        ".eslintcache",
        "--format",
        "json",
        "--suppressions-location",
        "config/quality/eslint-suppressions.json",
        // An "unpruned" suppression means a previously-frozen violation was legitimately
        // fixed — release-time housekeeping (same bucket as ratchet drift), never a
        // contributor-blocking defect. Without this flag ESLint 9.x exits 2 for that
        // reason alone, which used to mask the real `--format json` report (#7837).
        "--pass-on-unpruned-suppressions",
      ],
      // The cold release runner crossed the old 30-minute ceiling as the repository grew,
      // then the timeout text was misreported as invalid JSON. Keep a real upper bound, but
      // leave enough headroom for the same full-tree walk that completes immediately after it
      // under the complexity config on that runner.
      { timeout: ESLINT_TIMEOUT_MS }
    );
    const { out } = lintRun;
    saveGateLog("lint", out);
    for (const result of evaluateEslintRun(lintRun, baselineValue("eslintWarnings"))) {
      record(result);
    }
  }

  await hardCmd("db-rules", "DB rules", npmCmd, ["run", "check:db-rules"]);
  await hardCmd("public-creds", "Public creds", npmCmd, ["run", "check:public-creds"]);

  // Complexity + cognitive (one ESLint walk; both still recorded as drift)
  {
    announce("Complexity + cognitive ratchets (shared ESLint walk)");
    const result = await run(npmCmd, ["run", "check:complexity-ratchets"]);
    saveGateLog("complexity-ratchets", result.out);
    for (const metric of evaluateComplexityRun(result, baselineValue("cognitiveComplexity"))) {
      record(metric);
    }
  }

  // file-size (drift)
  {
    const { code, out } = await run(npmCmd, ["run", "check:file-size"]);
    record({
      id: "file-size",
      label: "File-size ratchet",
      kind: "drift",
      ok: code === 0,
      detail: code === 0 ? "within frozen caps" : firstFailureLine(out),
    });
  }

  // test-masking (hard) — a PR-context gate: it only runs on the release PR (PR→main) in CI, so
  // net-assert reductions accrue unseen on release/** and explode on the release PR. Reproduce it
  // here against origin/main so a non-allowlisted reduction surfaces in the pre-flight, not in a
  // ~40-min CI layer (v3.8.43 cost 3 such round-trips). Legitimate reductions get allowlisted in
  // config/quality/test-masking-allowlist.json; tautology/skip/deletion signals are never allowlistable.
  if (!QUICK) {
    announce("Test-masking (weakened-assert guard vs main)");
    // best-effort fetch so the merge-base diff is accurate; ignore fetch failure (offline pre-flight)
    await run("git", ["fetch", "--no-tags", "origin", "main", "--depth=200"], {
      timeout: 60 * 1000,
    });
    const { code, out } = await run(npmCmd, ["run", "check:test-masking"], {
      env: { GITHUB_BASE_REF: "main" },
    });
    saveGateLog("test-masking", out);
    record({
      id: "test-masking",
      label: "Test-masking (weakened-assert guard)",
      kind: "hard",
      ok: code === 0,
      detail: code === 0 ? "no weakening" : firstFailureLine(out),
    });
  }

  // Remaining quality-gate / quality-extended ratchets that the PR→release
  // fast-gates skip and that historically surfaced — one at a time, because the
  // CI Quality Ratchet job is fail-fast — only on the release PR. Running them all
  // here (drift, never blocking) means a single rebaseline pass at release.
  // complexity recorded above with cognitive (check:complexity-ratchets)
  await driftCmd("dead-code", "Dead-code (ratchet)", npmCmd, ["run", "check:dead-code"]);
  await driftCmd("type-coverage", "Type coverage (ratchet)", npmCmd, [
    "run",
    "check:type-coverage",
  ]);
  await driftCmd("compression-budget", "Compression budget (ratchet)", npmCmd, [
    "run",
    "check:compression-budget",
  ]);
  await driftCmd("openapi-coverage", "OpenAPI route coverage (ratchet)", npmCmd, [
    "run",
    "check:openapi-coverage",
  ]);
  await driftCmd("workflow-lint", "Workflow lint (zizmor ratchet)", npmCmd, [
    "run",
    "check:workflows",
    "--",
    "--ratchet",
  ]);
  await driftCmd("codeql-ratchet", "CodeQL alerts (ratchet)", npmCmd, [
    "run",
    "check:codeql-ratchet",
  ]);
  // Pricing data untouched for 90 days: a clock, not a regression, so it can't belong to a
  // PR gate (it would red every PR at once). Reported here, refreshed at release.
  await driftCmd(
    "pricing-freshness",
    "Pricing freshness (90 days)",
    npmCmd,
    ["run", "check:pricing-freshness"],
    "touched within 90 days"
  );

  // Docs sync + fabricated-docs (strict) is a real-defect gate (invented env vars /
  // routes, i18n mirror drift) — HARD.
  await hardCmd("docs-all", "Docs sync + fabricated-docs (strict)", npmCmd, [
    "run",
    "check:docs-all",
  ]);

  if (!QUICK) {
    // These are the gates that catch inherited base-red tests from cycle PRs (the v3.8.42
    // release PR exploded with 15 such reds). Non-draft code PRs into release/** run the unit
    // suite and test:vitest per PR (quality.yml fast-unit, fast-vitest); only integration is
    // absent. These gates run SILENTLY for many minutes; the announce line above + these
    // hard ceilings keep a long-but-healthy run from being mistaken for a hang (the ceiling also
    // converts a genuine DB-handle hang into a visible failure instead of an infinite block).
    // Integration runs ONLY on the release PR full CI, so a regression there is invisible
    // until release — that is why it is a HARD pre-flight gate.
    //
    // The lanes run ONE AT A TIME (they ran as one Promise.all wave from v3.8.45 until
    // 2026-10-19). The 2026-10-18 sweep (omni-build, 56 GB, no CPU quota yet) and the 10-19
    // one (omni-release: 8 cores by CPUQuota, 20 GB memory.high) both killed unit, integration
    // and the package build at their ceilings inside that wave, where four suites and a webpack
    // build (14-16 GB) shared one slot. On 10-19 the cgroup also passed memory.high, the kernel
    // throttled every lane, and the app's own resourcePressure guard read that cgroup and
    // answered 503 inside unit tests (3 false reds). Both days the single unit process
    // (--test-concurrency=4) had run ~29k of its ~32k tests when its 80 min ceiling hit, while
    // ci.yml spreads the same suite over 8 shard jobs of 11-18 min. So unit runs as ci.yml's
    // shards, as many at once as the slot has cores for, and each lane has the slot to itself.
    let unitShards = null;
    try {
      unitShards = unitShardCountFromCi(
        readFileSync(join(ROOT, ".github/workflows/ci.yml"), "utf8")
      );
    } catch {
      unitShards = null; // unreadable ci.yml: the unsharded suite below still runs
    }
    const unitPool = unitShards ? unitShardPool(unitShards, availableParallelism()) : 1;
    if (SUITES_FROM) {
      // The 2026-10-19/20 sweeps showed the 8-core slot cannot run the suites in useful time
      // (4h15 per sweep, shards 26-40 min against ~13 min hosted, timing tests failing on CPU
      // starvation such as the catalog's 8 s build bound). The suites now run on hosted
      // runners exactly like a PR's CI; this slot keeps the static gates and the build.
      let integrationShards = null;
      try {
        integrationShards = shardCountFromCi(
          readFileSync(join(ROOT, ".github/workflows/ci.yml"), "utf8"),
          "test-integration"
        );
      } catch {
        integrationShards = null;
      }
      if (!unitShards || !integrationShards) {
        record({
          id: "hosted-suites",
          label: "Hosted suites: read ci.yml's unit and integration matrices",
          kind: "hard",
          ok: false,
          detail: "could not read the shard counts from .github/workflows/ci.yml",
        });
      } else {
        let files = [];
        try {
          files = readdirSync(SUITES_FROM).filter((f) => f.endsWith(".json"));
        } catch {
          files = [];
        }
        const results = files.map((f) =>
          parseHostedSuiteResult(readFileSync(join(SUITES_FROM, f), "utf8"))
        );
        for (const r of foldHostedSuiteResults(results, { unitShards, integrationShards })) {
          announce(r.label);
          record(r);
        }
      }
    }
    const slow = [
      unitShards
        ? {
            id: "unit",
            label: `Unit tests (ci.yml's ${unitShards} shards, ${unitPool} at a time — ~13min per shard on a hosted runner)`,
            run: (timeout) => runUnitShards(unitShards, unitPool, timeout),
            // Per shard. ci.yml gives a shard 25 min including setup; 40 min still turns a
            // stuck SQLite handle (zero progress forever) into a visible failure.
            timeout: 40 * 60 * 1000,
          }
        : {
            id: "unit",
            label: "Unit tests (full suite unsharded — ci.yml's unit matrix was not readable)",
            args: ["run", "test:unit:ci"],
            timeout: 120 * 60 * 1000,
          },
      {
        // Measured 2026-08-05 on an idle 16-core box: 22m08s hermetic (935 tests,
        // 112 files at --test-concurrency=1, i.e. strictly serial because ~16 of
        // them bind a port or share a DB). The old "~3-10min" estimate was stale by
        // ~3x and the 20min ceiling killed a healthy run. 40min keeps the ceiling's
        // real purpose — turning a genuine hang (unreleased DB handle) into a
        // visible failure — without punishing a long-but-healthy suite.
        id: "integration",
        label: "Integration tests (~20-25min)",
        args: ["run", "test:integration"],
        timeout: 40 * 60 * 1000,
      },
      {
        id: "vitest",
        label: "Vitest (MCP / autoCombo / cache — ~3-8min)",
        args: ["run", "test:vitest"],
        timeout: 15 * 60 * 1000,
      },
    ];
    if (WITH_BUILD) {
      // Last, alone: ci.yml's unit and integration jobs never see a built tree either.
      slow.push({
        id: "pack-artifact",
        label: "Package artifact (npm pack policy)",
        run: runPackArtifactGate,
        timeout: 20 * 60 * 1000,
      });
    }
    // With --suites-from only the build lane is left for this slot.
    const lanes = SUITES_FROM ? slow.filter((g) => g.id === "pack-artifact") : slow;
    const slowResults = [];
    for (const g of lanes) {
      announce(g.label);
      const result = await (g.run
        ? g.run(g.timeout)
        : runAsync(npmCmd, g.args, { timeout: g.timeout, env: g.env }));
      slowResults.push(result);
      saveGateLog(g.id, result.out);
      record({
        id: g.id,
        label: g.label,
        kind: "hard",
        ok: result.code === 0,
        detail: result.code === 0 ? "pass" : result.detail || firstFailureLine(result.out),
      });
    }

    if (WITH_BUILD) {
      // WS1.2 (#7065 class): boot the REAL packed tarball from a clean install.
      // check:pack-artifact is the builder for dist/ when staging is absent, so the
      // boot smoke MUST run after it completes, never alongside it: it would race
      // check:pack-boot against dist/server.js creation on clean worktrees.
      const packArtifactIndex = lanes.findIndex((g) => g.id === "pack-artifact");
      const packArtifactResult = slowResults[packArtifactIndex];
      const bootLabel = "Tarball boot-smoke (installed CLI serves /health)";

      if (!packArtifactResult || packArtifactResult.code !== 0) {
        const out = "skipped because package-artifact did not produce a valid dist/ build";
        saveGateLog("pack-boot", out);
        record({
          id: "pack-boot",
          label: bootLabel,
          kind: "hard",
          ok: false,
          detail: out,
        });
      } else {
        announce(bootLabel);
        const { code, out } = await runAsync(npmCmd, ["run", "check:pack-boot"], {
          timeout: 15 * 60 * 1000,
        });
        saveGateLog("pack-boot", out);
        record({
          id: "pack-boot",
          label: bootLabel,
          kind: "hard",
          ok: code === 0,
          detail: code === 0 ? "pass" : firstFailureLine(out),
        });
      }
    }
  } else if (WITH_BUILD) {
    // --with-build without the suites (--quick): still verify the package artifact.
    const { code, out } = await runPackArtifactGate(20 * 60 * 1000);
    saveGateLog("pack-artifact", out);
    record({
      id: "pack-artifact",
      label: "Package artifact (npm pack policy)",
      kind: "hard",
      ok: code === 0,
      detail: code === 0 ? "pass" : firstFailureLine(out),
    });
  }

  // --full-ci: run every static gate declared in ci.yml's gate jobs (superset of the
  // curated HARD list above). Combine with --quick to run ONLY these + drift ratchets
  // (skip the slow suites) — the "1 command, 0 CI layers" pre-flight for the static category.
  if (FULL_CI) {
    let gates = [];
    try {
      gates = extractCiGates(readFileSync(join(ROOT, ".github/workflows/ci.yml"), "utf8"));
    } catch (err) {
      record({
        id: "full-ci-extract",
        label: "full-ci: parse .github/workflows/ci.yml",
        kind: "hard",
        ok: false,
        detail: `could not read/parse ci.yml: ${err?.message || err}`,
      });
    }
    const already = new Set(results.map((r) => r.id));
    process.stderr.write(`\n──── full-ci gates from ci.yml (${gates.length}) ────\n`);
    for (const g of gates) {
      // Skip a gate the curated pass already ran with the same id (avoid double-running lint).
      if (already.has(g.id)) continue;
      const { code, out } = await run(npmCmd, g.args, {
        env: g.env,
        timeout: fullCiTimeoutFor(g.id),
      });
      saveGateLog(`fullci-${g.id.replace(/[^a-z0-9]+/gi, "-")}`, out);
      record({
        id: g.id,
        label: `ci.yml:${g.job} → npm ${g.args.join(" ")}`,
        // Respect the curated classification when the curated pass already ran an equivalent
        // gate under a different id — otherwise the same ratchet is reported as a HARD failure
        // here AND as drift above, in one self-contradicting verdict.
        kind: fullCiKindFor(g.id, results),
        ok: code === 0,
        detail: code === 0 ? "pass" : firstFailureLine(out),
      });
    }
  }

  // A crashed or unobserved tool is not measured ratchet drift. Keep infrastructure
  // uncertainty blocking even when the command normally produces advisory findings.
  commandReceipts.forEach((receipt, index) => {
    if (!["PASS", "FAIL"].includes(receipt.outcome)) {
      record({
        id: `execution-${index}`,
        label: receipt.command,
        kind: "hard",
        ok: false,
        detail: `${receipt.outcome}: ${receipt.receiptPath}`,
      });
    }
  });
  const { releaseGreen, hardFailures, drift } = computeVerdict(results);

  process.stderr.write("\n──────── verdict ────────\n");
  process.stderr.write(`HARD failures (block — real defects): ${hardFailures.length}\n`);
  hardFailures.forEach((r) => process.stderr.write(`  ❌ ${r.label}: ${r.detail}\n`));
  process.stderr.write(`Ratchet drift (non-blocking — rebaseline at release): ${drift.length}\n`);
  drift.forEach((r) => process.stderr.write(`  🟡 ${r.label}: ${r.detail}\n`));
  process.stderr.write(
    releaseGreen
      ? "\n✅ RELEASE-GREEN (no hard failures). Any drift above is rebaselined at release, not a contributor concern.\n"
      : "\n❌ NOT release-green — inspect execution evidence and compare the exact base before attributing a failure to a contributor.\n"
  );

  if (JSON_OUT) {
    process.stdout.write(
      JSON.stringify(
        {
          schemaVersion: 1,
          candidateSha: execFileSync("git", ["rev-parse", "HEAD"], {
            cwd: ROOT,
            encoding: "utf8",
          }).trim(),
          profile: QUICK ? "quick" : WITH_BUILD && FULL_CI ? "full" : "standard",
          completedAt: new Date().toISOString(),
          releaseGreen,
          hardFailures: hardFailures.map((r) => ({ id: r.id, label: r.label, detail: r.detail })),
          drift: drift.map((r) => ({ id: r.id, label: r.label, detail: r.detail })),
          checks: results.map((r) => ({ id: r.id, kind: r.kind, ok: r.ok, detail: r.detail })),
          commandReceipts,
        },
        null,
        2
      ) + "\n"
    );
  }

  process.exit(releaseGreen ? 0 : 1);
}

// Run only when invoked directly (so tests can import the pure helpers).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
