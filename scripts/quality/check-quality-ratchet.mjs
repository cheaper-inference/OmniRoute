#!/usr/bin/env node
// scripts/quality/check-quality-ratchet.mjs
// Generic multi-metric ratchet. Clones the spirit of check-t11-any-budget.mjs:
// a frozen baseline per metric; fails any regression; it only goes in one direction.
//
// v2 (6A.5): --require-tighten, eps per metric, orphan metrics warning.
import fs from "node:fs";
import path from "node:path";

import { describeGateMode, resolveGateModeInfo } from "../check/lib/gateMode.mjs";

const cwd = process.cwd();
function getArg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const BASELINE = path.resolve(
  getArg("--baseline", path.join(cwd, "config/quality/quality-baseline.json"))
);
const METRICS = path.resolve(
  getArg("--metrics", path.join(cwd, "config/quality/quality-metrics.json"))
);
const SUMMARY = getArg("--summary", null);
const UPDATE = process.argv.includes("--update");
// --allow-missing: skip missing baseline metrics from metrics (instead of failing).
// Local use: coverage only exists in CI; locally quality:gate runs with this flag.
// In CI, the quality-gate job runs WITHOUT the flag (strict — lowers the coverage merged beforehand).
const ALLOW_MISSING = process.argv.includes("--allow-missing");
// --require-tighten: fails when a metric has improved beyond TightSlack without the
// baseline tenha sido apertado. Garante que melhorias permanentes sejam capturadas.
// Without this flag, improvements are only recorded (v1 behavior — retrocompat).
const REQUIRE_TIGHTEN = process.argv.includes("--require-tighten");

// Global fallback eps. Each metric can override via `eps` in the baseline.
const GLOBAL_EPS = 0.01;

function load(p) {
  if (!fs.existsSync(p)) {
    console.error(`[quality-ratchet] missing file: ${p}`);
    process.exit(2);
  }
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

const baseline = load(BASELINE);
const metrics = load(METRICS);
// Velocity phase (relax-baselines.mjs writes `_policy`): while it is active the
// --require-tighten gate is advisory — the baselines were loosened on purpose, so
// "measured better than baseline" is the expected state, not a forgotten tighten.
// Closing the phase (v4.0) deletes `_policy` and the flag bites again.
const POLICY = baseline._policy && typeof baseline._policy === "object" ? baseline._policy : null;
const VELOCITY_ADVISORY = Boolean(POLICY && POLICY.requireTighten === false);
// Gate mode (scripts/check/lib/gateMode.mjs; plan 2026-11-13): baselines are banked by the
// release refresh / nightly, never by a feature PR — two PRs that each tightened the same
// number conflicted on quality-baseline.json. In `pr` mode an improvement is reported, not
// failed; a regression fails in both modes. `release` mode (push, schedule, the release PR,
// local runs) keeps --require-tighten exactly as before.
const GATE_MODE = resolveGateModeInfo({ argv: process.argv, env: process.env });
const PR_ADVISORY = REQUIRE_TIGHTEN && !VELOCITY_ADVISORY && GATE_MODE.mode === "pr";
const TIGHTEN_ENFORCED = REQUIRE_TIGHTEN && !VELOCITY_ADVISORY && !PR_ADVISORY;
if (REQUIRE_TIGHTEN && VELOCITY_ADVISORY) {
  console.log(
    `[quality-ratchet] --require-tighten advisory: velocity phase active (phase=${POLICY.phase}, until ${POLICY.until}, relax ${POLICY.relaxPct}%)`
  );
}
if (PR_ADVISORY) {
  console.log(
    `[quality-ratchet] --require-tighten advisory: ${describeGateMode(GATE_MODE)} — a feature PR does not bank improvements; the release refresh / nightly does (strict in release mode)`
  );
}
const failures = [];
// Each entry is the measurement only; the instruction is appended when printed, because it
// differs by mode: release asks this run to bank the improvement, a feature PR (pr mode) never
// edits the baseline — the release refresh / nightly banks it.
const tightenFailures = [];
const TIGHTEN_HINT_RELEASE =
  " — rode 'npm run quality:ratchet -- --update' e commite o baseline apertado neste PR";
const TIGHTEN_HINT_PR = " — banked by the release refresh / nightly, not by this PR";
const improvements = [];
const rows = [];

for (const [key, spec] of Object.entries(baseline.metrics)) {
  const current = metrics[key];
  const base = spec.value;
  const dir = spec.direction; // "down" = lower-is-better | "up" = bigger-is-better

  // Per-metric eps; falls back to global EPS if not specified in the spec.
  const eps = spec.eps !== undefined ? spec.eps : GLOBAL_EPS;

  // Per-metric tightenSlack; falls back to eps (same tolerance as regression check).
  const tightenSlack = spec.tightenSlack !== undefined ? spec.tightenSlack : eps;

  if (current === undefined) {
    if (ALLOW_MISSING || spec.dedicatedGate === true) {
      const reason = spec.dedicatedGate === true ? "SKIP (dedicated gate)" : "SKIP (absent)";
      rows.push([key, base, "—", reason]);
    } else {
      failures.push(`missing metric "${key}" in ${path.basename(METRICS)}`);
      rows.push([key, base, "—", "MISSING"]);
    }
    continue;
  }
  let status = "ok";
  if (dir === "down") {
    if (current > base + eps) {
      failures.push(`${key}: ${current} > baseline ${base} (cannot increase)`);
      status = "REGRESSION";
    } else if (current < base - eps) {
      improvements.push([key, current]);
      status = "↑ melhorou";
      if (REQUIRE_TIGHTEN && base - current > tightenSlack) {
        tightenFailures.push(
          `${key}: melhorou de ${base} para ${current} (delta ${(base - current).toFixed(4)} > slack ${tightenSlack})`
        );
      }
    }
  } else {
    if (current < base - eps) {
      failures.push(`${key}: ${current} < baseline ${base} (cannot fall)`);
      status = "REGRESSION";
    } else if (current > base + eps) {
      improvements.push([key, current]);
      status = "↑ melhorou";
      if (REQUIRE_TIGHTEN && current - base > tightenSlack) {
        tightenFailures.push(
          `${key}: melhorou de ${base} para ${current} (delta ${(current - base).toFixed(4)} > slack ${tightenSlack})`
        );
      }
    }
  }
  rows.push([key, base, current, status]);
}

// Behavior 3: warn about orphan metrics (present in collected metrics but absent in baseline).
const baselineKeys = new Set(Object.keys(baseline.metrics));
const orphans = Object.keys(metrics).filter((k) => !baselineKeys.has(k));
if (orphans.length > 0) {
  console.warn(
    `[quality-ratchet] WARN: ${orphans.length} orphan metric(s) — present in ${path.basename(METRICS)} but no entry in baseline: ${orphans.join(", ")}`
  );
  console.warn(
    `[quality-ratchet] WARN: add ${orphans.length === 1 ? "this metric" : "these metrics"} to the baseline (with value/direction) so that they are traced.`
  );
}

if (SUMMARY) {
  const md = [
    "# Quality Ratchet",
    "",
    "| Metric | Baseline | Current | Status |",
    "|---|---|---|---|",
    ...rows.map(([k, b, c, s]) => `| ${k} | ${b} | ${c} | ${s} |`),
    "",
    failures.length
      ? `**${failures.length} regression(s) — gate BLOCKED.**`
      : "**No regressions — gate OK.**",
  ].join("\n");
  fs.mkdirSync(path.dirname(SUMMARY), { recursive: true });
  fs.writeFileSync(SUMMARY, md + "\n");
}

// Tighten check runs only when there are no regressions (regressions take priority).
// With --update, improvements are captured into the baseline, so tighten check
// is bypassed (the update itself is the required action).
if (UPDATE && failures.length === 0 && improvements.length) {
  for (const [key, val] of improvements) baseline.metrics[key].value = val;
  fs.writeFileSync(BASELINE, JSON.stringify(baseline, null, 2) + "\n");
  console.log(`[quality-ratchet] baseline ratcheado: ${improvements.length} metric(s) improved`);
}

if (failures.length) {
  console.error("[quality-ratchet] FAILED:\n" + failures.map((f) => " ✗ " + f).join("\n"));
  process.exit(1);
}

// Behavior 1: --require-tighten gate (only triggers when there are no regressions and no --update).
if (TIGHTEN_ENFORCED && !UPDATE && tightenFailures.length > 0) {
  console.error(
    "[quality-ratchet] FAILED (--require-tighten): metric(s) improved but baseline was not tightened:\n" +
      tightenFailures.map((f) => "  ✗ " + f + TIGHTEN_HINT_RELEASE).join("\n")
  );
  process.exit(1);
}

if (PR_ADVISORY && !UPDATE && tightenFailures.length > 0) {
  console.log(
    "[quality-ratchet] non-bench improvement(s) — informative in PR mode (the squeeze is from release/nightly; this PR does not edit the baseline):\n" +
      tightenFailures.map((f) => "  · " + f + TIGHTEN_HINT_PR).join("\n")
  );
}

console.log(`[quality-ratchet] OK (${rows.length} metrics, ${improvements.length} improved)`);
