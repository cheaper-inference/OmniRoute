#!/usr/bin/env node
// scripts/check/check-cognitive-complexity.mjs
// Blocking ratchet for cognitive complexity (sonarjs/cognitive-complexity).
// Shares ESLint walk with check-complexity via complexityEslintReport.mjs.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  countCognitiveViolations,
  getComplexityEslintReport,
} from "./complexityEslintReport.mjs";

// Re-export for existing unit tests.
export { countCognitiveViolations };

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const UPDATE = process.argv.includes("--update");

const BASELINE_PATH = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "config/quality/quality-baseline.json")
);

/**
 * Evaluates the current count of cognitive violations against the baseline.
 * @param {number} current
 * @param {number} baseline
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateCognitiveComplexity(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

function main() {
  if (!fs.existsSync(BASELINE_PATH)) {
    process.stderr.write(
      `[cognitive-complexity] FAIL — ${path.basename(BASELINE_PATH)} missing.\n`
    );
    process.exit(2);
  }

  const baselineJson = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  const baselineMetric = baselineJson.metrics && baselineJson.metrics.cognitiveComplexity;
  if (!baselineMetric || typeof baselineMetric.value !== "number") {
    process.stderr.write(
      "[cognitive-complexity] FAIL — metrics.cognitiveComplexity missing in quality-baseline.json.\n"
    );
    process.exit(2);
  }
  const baselineValue = baselineMetric.value;

  const report = getComplexityEslintReport();
  const count = countCognitiveViolations(report);

  console.log(`cognitiveComplexity=${count}`);

  if (!QUIET) {
    console.log(
      `[cognitive-complexity] ${count} function(s) exceed the cognitive-complexity threshold (15).`
    );
  }

  const { regressed, improved } = evaluateCognitiveComplexity(count, baselineValue);

  if (UPDATE && improved) {
    baselineJson.metrics.cognitiveComplexity.value = count;
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baselineJson, null, 2) + "\n");
    console.log(`[cognitive-complexity] ratcheted baseline: ${count} (was ${baselineValue})`);
  }

  if (regressed) {
    process.stderr.write(
      `[cognitive-complexity] REGRESSION — ${count} violations > baseline ${baselineValue}\n` +
        ` → Break complex functions into smaller helpers, or run\n`
        `    'node scripts/check/check-cognitive-complexity.mjs --update' if the count has legitimately dropped.\n`
    );
    process.exit(1);
  }

  if (!QUIET) {
    console.log(`[cognitive-complexity] OK — ${count} violations (baseline ${baselineValue})`);
  }

  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
