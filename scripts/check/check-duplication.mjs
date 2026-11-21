#!/usr/bin/env node
// scripts/check/check-duplication.mjs
// Code duplication ratchet. Runs jscpd@4 (PINRED — v5 is a Rust rewrite with
// Incompatible CLI/JSON) on src+open-sse and compares the current % against a frozen
// frozen (duplication-baseline.json). Fails if duplication INCREASES. Targets the
// #1 AI slop (GitClear 2026: 4-8x duplication in the IA era) — in our case, the
// copy-paste of executors (48/50 overwrite the entire execute()). --update ratchet.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const BASELINE_PATH = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "config/quality/duplication-baseline.json")
);
const UPDATE = process.argv.includes("--update");
const EPS = 0.05; // float noise tolerance (jscpd is deterministic; this is margin)
// Use local binary (pinned in package.json devDependencies — no registry download at CI time)
const JSCPD_BIN = path.join(ROOT, "node_modules", ".bin", "jscpd");
const JSCPD_FIXED_ARGS = [
  "src",
  "open-sse",
  "--reporters",
  "json",
  "--silent",
  "--min-tokens",
  "50",
  "--ignore",
  "**/*.test.ts,**/*.test.tsx,**/__tests__/**",
];

/** Evaluates the current % against the baseline. */
export function evaluateDuplication(current, baseline, eps = EPS) {
  return {
    regressed: current > baseline + eps,
    improved: current < baseline - eps,
  };
}

function measureDuplicationPct() {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "jscpd-"));
  execFileSync(JSCPD_BIN, [...JSCPD_FIXED_ARGS, "--output", out], { stdio: "ignore" });
  const report = JSON.parse(fs.readFileSync(path.join(out, "jscpd-report.json"), "utf8"));
  return report.statistics.total.percentage;
}

function main() {
  if (!fs.existsSync(BASELINE_PATH)) {
    console.error(`[duplication] FAIL — ${path.basename(BASELINE_PATH)} missing.`);
    process.exit(2);
  }
  const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  const current = measureDuplicationPct();
  const { regressed, improved } = evaluateDuplication(current, baseline.percentage, EPS);

  if (UPDATE && improved) {
    baseline.percentage = current;
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + "\n");
    console.log(`[duplication] ratcheted baseline: ${current}% (was ${baseline.percentage}%)`);
  }
  if (regressed) {
    console.error(
      `[duplication] REGRESSION — ${current}% > baseline ${baseline.percentage}% (+${EPS} tolerance)\n` +
        `  → extraia o trecho duplicado (helper compartilhado) ou ajuste duplication-baseline.json com justificativa.`
    );
    process.exit(1);
  }
  console.log(`[duplication] OK — ${current}% (baseline ${baseline.percentage}%)`);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
