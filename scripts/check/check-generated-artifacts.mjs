#!/usr/bin/env node
// scripts/check/check-generated-artifacts.mjs
// Are the committed GENERATED artifacts exactly what their generators write?
//
//   npm run check:generated-artifacts            (node --import tsx/esm …; one generator reads TS)
//   npm run check:generated-artifacts -- --mode=pr
//
// Artifacts: the 12 README diagrams (README_DIAGRAMS in scripts/docs/gen-readme-diagrams.mjs)
// and the e2e shard timings seed (config/quality/e2e-timings.json must list every spec).
//
// Plan "derived numbers and texts resolved only at release" (2026-11-13): these files are
// rewritten by the release refresh (`release:refresh-derived`) or a nightly refresh PR, not by
// feature PRs (config/quality/derived-paths/generated.json, baselines.json). Gate mode
// (scripts/check/lib/gateMode.mjs):
//
//   release — every artifact must match its generator (the strict check the unit tests
//             tests/unit/docs/readme-*-svg.test.ts and balance-e2e-shards.test.ts always ran).
//   pr      — only the artifacts the change itself edits are judged: an edited generated file
//             must still be exactly the generator output, so a hand edit or a stale
//             regeneration fails; drift the base accumulated since the last refresh is skipped.
//             No resolvable diff base → every artifact is judged (fail-closed).
//
// Why a separate check: test-unit checks out a shallow merge ref with no base, so in a PR the
// unit tests cannot tell whether the PR edited an artifact and skip the byte comparison. This
// check runs where the full history is (a job with fetch-depth: 0) and owns that comparison.
//
// Exit codes: 0 = every judged artifact matches (or none judged), 1 = at least one differs.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { describeGateMode } from "./lib/gateMode.mjs";
import { prModeSkipLine, resolveDerivedScope } from "./lib/derivedArtifactScope.mjs";

export const GENERATED_ARTIFACT_TAG = "[generated-artifacts]";
const E2E_TIMINGS = "config/quality/e2e-timings.json";
const E2E_DIR = "tests/e2e";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

/** Specs under tests/e2e/ without an entry in config/quality/e2e-timings.json, sorted. */
export function missingE2eTimings(root = ROOT) {
  const timings = JSON.parse(fs.readFileSync(path.join(root, E2E_TIMINGS), "utf8"));
  return fs
    .readdirSync(path.join(root, E2E_DIR))
    .filter((f) => f.endsWith(".spec.ts"))
    .filter((f) => !(f in timings))
    .sort();
}

/**
 * The checks this gate runs, in README order then the timings seed. Each `verify` resolves to
 * null when the committed file is current, or to a one-line reason when it is not.
 * @param {string} [root]
 * @returns {Promise<Array<{ path: string, verify: () => Promise<string | null> }>>}
 */
export async function defaultGeneratedArtifactChecks(root = ROOT) {
  const { README_DIAGRAMS } = await import("../docs/gen-readme-diagrams.mjs");
  const diagrams = README_DIAGRAMS.map(({ render, out }) => ({
    path: out,
    verify: async () => {
      const committed = fs.readFileSync(path.join(root, out), "utf8");
      const generated = await render();
      return committed === generated
        ? null
        : `${out} is stale — regenerate with \`npm run docs:readme-diagrams\``;
    },
  }));
  const timings = {
    path: E2E_TIMINGS,
    verify: async () => {
      const missing = missingE2eTimings(root);
      return missing.length === 0
        ? null
        : `${E2E_TIMINGS} misses ${missing.length} spec(s): ${missing.join(", ")} — run \`node scripts/quality/balance-e2e-shards.mjs --sync\``;
    },
  };
  return [...diagrams, timings];
}

/**
 * @param {object} opts
 * @param {Array<{ path: string, verify: () => Promise<string | null> }>} opts.checks
 * @param {string[]} [opts.argv]
 * @param {Record<string, string | undefined>} [opts.env]
 * @param {string} [opts.cwd]
 * @param {string[]} [opts.changedFiles] explicit change list (tests)
 * @param {(line: string) => void} [opts.log]
 * @returns {Promise<{ failed: string[], judged: string[], skipped: string[] }>}
 */
export async function runGeneratedArtifactChecks({
  checks,
  argv = process.argv,
  env = process.env,
  cwd = ROOT,
  changedFiles,
  log = (line) => console.log(line),
}) {
  const scope = resolveDerivedScope({
    artifacts: checks.map((c) => c.path),
    argv,
    env,
    cwd,
    changedFiles,
    onUnresolved: "strict",
  });
  const mode = describeGateMode(scope.info);
  const total = checks.length;
  if (scope.reason === "base-unresolved") {
    log(
      `${GENERATED_ARTIFACT_TAG} ${mode}; no diff base to tell which generated artifacts this change edits — judging all ${total} strictly (fail-closed)`
    );
  } else if (scope.info.mode === "release") {
    log(`${GENERATED_ARTIFACT_TAG} ${mode}; judging all ${total} generated artifact(s)`);
  } else {
    if (scope.strict.length > 0) {
      log(
        `${GENERATED_ARTIFACT_TAG} ${mode}; judging the ${scope.strict.length} generated artifact(s) this change edits: ${scope.strict.join(", ")}`
      );
    }
    if (scope.skipped.length > 0) {
      log(
        prModeSkipLine(
          GENERATED_ARTIFACT_TAG,
          "pr-mode",
          `${mode}; this change does not edit ${scope.skipped.length} of ${total} generated artifact(s), so their drift from the base is the release refresh's (release:refresh-derived)`
        )
      );
    }
  }

  const failed = [];
  for (const check of checks) {
    if (!scope.strict.includes(check.path)) continue;
    const problem = await check.verify();
    if (problem) {
      failed.push(check.path);
      log(`${GENERATED_ARTIFACT_TAG} ✗ ${problem}`);
    }
  }
  if (failed.length > 0) {
    log(
      `${GENERATED_ARTIFACT_TAG} FAIL — ${failed.length} of ${scope.strict.length} judged generated artifact(s) differ from their generator`
    );
  } else {
    log(
      `${GENERATED_ARTIFACT_TAG} OK — ${scope.strict.length} judged generated artifact(s) match their generator (${scope.skipped.length} skipped)`
    );
  }
  return { failed, judged: [...scope.strict], skipped: [...scope.skipped] };
}

async function main() {
  const checks = await defaultGeneratedArtifactChecks(ROOT);
  const { failed } = await runGeneratedArtifactChecks({ checks });
  process.exit(failed.length > 0 ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(`${GENERATED_ARTIFACT_TAG} error: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  });
}
