#!/usr/bin/env node
// check-mutation-test-coverage — guards against tap.testFiles drift.
//
// WHY: Stryker (nightly-mutation) only runs the test files in the resolved
// stryker.conf.mjs `tap.testFiles` against each mutant. When a unit test that covers
// a mutated module is NOT in that list, its kills stop counting. The mutants it would
// kill then go COVERED-but-unkilled = SURVIVED on a cold run, so the module's COVERED
// mutation score collapses and the blocking mutationScore ratchet (nightly-mutation.yml)
// false-fails — but only on cold-cache nights, because the warm incremental run reuses
// the older (passing) verdicts. The pass/fail then tracks GitHub cache state, not code
// quality. tap.testFiles used to be a hand-maintained list; since 2026-11-13 the config
// COMPUTES it with the rule in scripts/quality/mutation-test-files.mjs. This gate loads
// the config the way Stryker does (dynamic import of the default export) and re-checks
// the resolved list against the git-tracked unit tests with the same rule, so it still
// fails if the config stops computing the list, narrows it, or reverts to a hand list.
//
// INVARIANT: every UNIT test (tests/unit/**) that imports a mutated module
// (stryker.conf.mjs `mutate`) MUST be in the resolved `tap.testFiles`. Integration/e2e
// tests are intentionally excluded (the tap-runner runs node:test units only).
//
// MODE: advisory by default (prints drift, exit 0). `--strict` exits 1 on drift
// so CI can block. Skip-graceful (exit 0) if stryker.conf.mjs is absent.
//
// USAGE:
//   node scripts/check/check-mutation-test-coverage.mjs            # advisory
//   node scripts/check/check-mutation-test-coverage.mjs --strict   # blocking

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import {
  isUnitTestCandidate,
  moduleFragment,
  mutatedModules,
  testImportsModule,
} from "../quality/mutation-test-files.mjs";

// Re-exported so existing importers of this gate keep working; the rule lives in
// scripts/quality/mutation-test-files.mjs (shared with stryker.conf.mjs).
export { moduleFragment, testImportsModule };

export const STRYKER_CONFIG_FILE = "stryker.conf.mjs";

/**
 * @param {{mutate: string[], tapTestFiles: string[], unitTests: {path:string, content:string}[]}} input
 * @returns {Record<string,string[]>} module -> covering unit tests NOT in tap.testFiles (drift)
 */
export function findCoverageDrift({ mutate, tapTestFiles, unitTests }) {
  const tap = new Set(tapTestFiles);
  const drift = {};
  for (const mod of mutatedModules(mutate)) {
    const frag = moduleFragment(mod);
    const missing = unitTests
      .filter((t) => testImportsModule(t.content, frag) && !tap.has(t.path))
      .map((t) => t.path)
      .sort();
    if (missing.length > 0) drift[mod] = missing;
  }
  return drift;
}

function listUnitTests() {
  // Static argv — no shell, no interpolation.
  const out = execFileSync("git", ["ls-files", "tests/unit"], { encoding: "utf8" });
  return (
    out
      .split("\n")
      // *.test.ts outside tests/unit/build/ (build-tooling tests embed module paths as
      // fixture strings, which would otherwise false-match) — see isUnitTestCandidate.
      .filter(isUnitTestCandidate)
      .map((file) => ({ path: file, content: fs.readFileSync(file, "utf8") }))
  );
}

/**
 * Load the Stryker config the way Stryker 10 does for a JS config file: dynamic
 * import of the module and its default export. Returns null when the file is absent.
 */
export async function loadStrykerConfig(configFile = STRYKER_CONFIG_FILE) {
  const abs = path.resolve(configFile);
  if (!fs.existsSync(abs)) return null;
  const mod = await import(pathToFileURL(abs).href);
  const conf = mod.default;
  if (!conf || typeof conf !== "object") {
    throw new Error(`${configFile} must default-export a Stryker options object`);
  }
  return conf;
}

async function main() {
  const STRICT = process.argv.includes("--strict");
  const conf = await loadStrykerConfig();
  if (!conf) {
    console.warn(
      `[mutation-test-coverage] ${STRYKER_CONFIG_FILE} not found — skipping (advisory).`
    );
    process.exit(0);
  }
  const mutate = mutatedModules(conf.mutate);
  const tapTestFiles = conf.tap?.testFiles || [];
  const unitTests = listUnitTests();

  const drift = findCoverageDrift({ mutate, tapTestFiles, unitTests });
  const modules = Object.keys(drift);
  const total = modules.reduce((n, m) => n + drift[m].length, 0);

  console.log("Mutation test-coverage gate — tap.testFiles drift detection");
  console.log("===========================================================");
  console.log(
    `Scanned ${unitTests.length} unit test file(s) against ${mutate.length} mutated module(s); ` +
      `${STRYKER_CONFIG_FILE} resolves ${tapTestFiles.length} tap.testFiles.`
  );

  if (total === 0) {
    console.log("✓ No drift — every covering unit test is listed in tap.testFiles.");
    process.exit(0);
  }

  for (const m of modules) {
    console.log(`\n  ${m}`);
    for (const t of drift[m]) console.log(`    + ${t}`);
  }
  const msg = `${total} covering unit test(s) across ${modules.length} module(s) are missing from the resolved ${STRYKER_CONFIG_FILE} tap.testFiles.`;
  if (STRICT) {
    console.error(
      `\n✗ ${msg} The config must compute tap.testFiles with ` +
        `scripts/quality/mutation-test-files.mjs so their mutant kills count (--strict).`
    );
    process.exit(1);
  }
  console.warn(`\n⚠ ${msg} Re-run with --strict to fail.`);
  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((err) => {
    console.error(`[mutation-test-coverage] could not load ${STRYKER_CONFIG_FILE}:`, err);
    process.exit(1);
  });
}
