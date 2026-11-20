#!/usr/bin/env node
// scripts/check/check-complexity.mjs
// Code complexity ratchet (cyclomatic max-lines-per-function).
// Shares one ESLint walk with cognitive-complexity via complexityEslintReport.mjs
// / eslint.complexity-ratchets.config.mjs. Counts by ruleId so cognitive
// violations never inflate this baseline.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  ESLINT_ARGS,
  countComplexityViolations,
  getComplexityEslintReport,
} from "./complexityEslintReport.mjs";

const ROOT = process.cwd();
const BASELINE_PATH = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "config/quality/complexity-baseline.json")
);
const UPDATE = process.argv.includes("--update");

// Re-export for tests that lock scan scope (src+open-sse+electron+bin).
export { ESLINT_ARGS };

/** Evaluates the current count of violations against the baseline. */
export function evaluateComplexity(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

function measureComplexityCount() {
  return countComplexityViolations(getComplexityEslintReport());
}

function main() {
  if (!fs.existsSync(BASELINE_PATH)) {
    console.error(`[complexity] FAIL — ${path.basename(BASELINE_PATH)} missing.`);
    process.exit(2);
  }
  const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  const current = measureComplexityCount();
  const { regressed, improved } = evaluateComplexity(current, baseline.count);

  if (UPDATE && improved) {
    console.log(`[complexity] baseline ratcheted: ${current} (was ${baseline.count})`);
    baseline.count = current;
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + "\n");
  }
  if (regressed) {
    console.error(
      `[complexity] REGRESSION — ${current} violations > baseline ${baseline.count}\n` +
        `  → break the function into smaller helpers (reduce branches/size) or run\n` +
        `    'node scripts/check/check-complexity.mjs --update' if the count has legitimately dropped.`
    );
    process.exit(1);
  }
  console.log(`[complexity] OK — ${current} violations (baseline ${baseline.count})`);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
