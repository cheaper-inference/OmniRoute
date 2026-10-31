#!/usr/bin/env node
// scripts/check/check-build-typecheck.mjs
// Whole-app production typecheck ratchet.
//
// Why this exists: `next build` sets `typescript.ignoreBuildErrors: true`, the
// blocking `typecheck:core` gate covers a curated 27-file allowlist, and the
// dashboard gate covers only `src/app/(dashboard)`. The root tsconfig would cover
// the rest, but it also pulls tests/ in through `**/*.ts` and cannot finish on a
// normal machine, so it is not runnable as a gate. This program narrows to
// shipped code and is held against a frozen count baseline.
//
// A live count above the baseline is a regression and fails; a lower count is an
// improvement and only asks you to ratchet the baseline down.
//
// Two escapes are closed:
//
//   1. `--update` refuses to rewrite the baseline while the live run contains a
//      new or raised pair, so widening it to get green has to be a deliberate
//      `--force`.
//   2. `@ts-nocheck` is scanned across the build scope and frozen. A file using
//      it reports no diagnostics, so nothing else here can see that it opted out.
//
// Run:
//   node scripts/check/check-build-typecheck.mjs            # verify (CI)
//   node scripts/check/check-build-typecheck.mjs --update   # ratchet down after fixes
//   node scripts/check/check-build-typecheck.mjs --update --force-regressions   # accept a new counted error
//                                  --force-nocheck   # accept a permanent silence

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { runScopedTypecheck } from "./run-scoped-typecheck.mjs";
import { parseTscOutput, diffAgainstBaseline } from "./typecheckBaseline.mjs";
import {
  countLineSuppressions,
  fingerprintDrift,
  programFiles,
  programFingerprint,
  scanNoCheckFiles,
  suppressionDrift,
  suppressedIntersection,
  updateRefusal,
} from "./ratchet.mjs";

const ROOT = process.cwd();
const TSCONFIG = path.join(ROOT, "tsconfig.build.json");
const BASELINE_PATH = path.join(ROOT, "config/quality/build-typecheck-baseline.json");
const NOCHECK_BASELINE_PATH = path.join(ROOT, "config/quality/ts-nocheck-baseline.json");
const SUPPRESSION_BASELINE_PATH = path.join(ROOT, "config/quality/ts-suppressions-baseline.json");
const UPDATE = process.argv.includes("--update");
// Accepting a new counted error and granting a permanent silence are different
// decisions and must not share one flag.
const FORCE_REGRESSIONS = process.argv.includes("--force-regressions");
const FORCE_NOCHECK = process.argv.includes("--force-nocheck");

// `--force` used to mean "accept everything". Silently ignoring it now would be
// worse than either behaviour, so say so.
if (process.argv.includes("--force")) {
  process.stderr.write(
    `[build-typecheck] --force was split: use --force-regressions to accept a counted error, ` +
      `or --force-nocheck to accept a permanent silence.\n`
  );
  process.exit(2);
}
// The whole-app program needs several GB of heap; the default is not enough and
// tsc dies with an opaque "Ineffective mark-compacts" OOM instead of diagnostics.
const MAX_HEAP_MB = 8192;

function totalErrors(counts) {
  return Object.values(counts).reduce(
    (sum, codes) => sum + Object.values(codes).reduce((s, c) => s + c, 0),
    0
  );
}

function readJson(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function loadNoCheckBaseline() {
  const parsed = readJson(NOCHECK_BASELINE_PATH, {});
  return Array.isArray(parsed.files) ? parsed.files : [];
}

/**
 * Regenerate the docs collection before compiling.
 *
 * `src/lib/source.ts` imports `.source/server`, which fumadocs-mdx generates and
 * git ignores. Without it the import is TS2307, so a checkout that has never run
 * `next build` reports six more errors than one that has — the same code, two
 * different verdicts. Generating it here costs about a second and makes the
 * gate's answer depend on the tree rather than on someone's build history.
 */
function ensureGeneratedSources() {
  const bin = path.join(ROOT, "node_modules/.bin/fumadocs-mdx");
  if (!fs.existsSync(bin)) return;
  const result = spawnSync(bin, [], { cwd: ROOT, stdio: "ignore" });
  if (result.error || result.status !== 0) {
    throw new Error(
      "fumadocs-mdx could not generate .source, so the program would be missing " +
        "the docs collection and report errors that belong to the build, not the code"
    );
  }
}

function main() {
  if (!fs.existsSync(TSCONFIG)) {
    process.stderr.write(`[build-typecheck] FAIL — tsconfig not found at ${TSCONFIG}\n`);
    process.exit(2);
  }

  try {
    ensureGeneratedSources();
  } catch (err) {
    process.stderr.write(
      `[build-typecheck] FAIL — ${err instanceof Error ? err.message : String(err)}\n`
    );
    process.exit(2);
  }

  console.log("[build-typecheck] Running tsc over the production program…");
  let stdout;
  try {
    stdout = runScopedTypecheck(ROOT, TSCONFIG, {
      maxOldSpaceSizeMb: MAX_HEAP_MB,
      incremental: false,
    });
  } catch (err) {
    process.stderr.write(
      `[build-typecheck] FAIL — the compiler did not produce a complete result, so this run ` +
        `proves nothing about the baseline:\n${err instanceof Error ? err.message : String(err)}\n`
    );
    process.exit(2);
  }

  const live = parseTscOutput(stdout);
  const liveErrorCount = totalErrors(live);
  console.log(`buildTypecheckErrors=${liveErrorCount}`);

  const baseline = readJson(BASELINE_PATH, {});
  const { regressions, improvements } = diffAgainstBaseline(live, baseline);

  const files = programFiles(ROOT, TSCONFIG, MAX_HEAP_MB);
  if (files.length === 0) {
    // An empty program reports zero diagnostics, which would read as "all clear".
    process.stderr.write(
      `[build-typecheck] FAIL — the program resolved to zero files, so this run proves nothing\n`
    );
    process.exit(2);
  }
  const noCheckNow = scanNoCheckFiles(files, ROOT);
  const fingerprint = programFingerprint(ROOT, TSCONFIG, files.length);
  const recordedProgram = readJson(NOCHECK_BASELINE_PATH, {})._program || null;
  const programDrift = fingerprintDrift(recordedProgram, fingerprint);
  const noCheckAllowed = new Set(loadNoCheckBaseline());
  const lineSuppressions = countLineSuppressions(files, ROOT);
  const suppressionRegressions = suppressionDrift(
    readJson(SUPPRESSION_BASELINE_PATH, {}),
    lineSuppressions
  );
  const addedNoCheck = noCheckNow.filter((f) => !noCheckAllowed.has(f));
  const removedNoCheck = [...noCheckAllowed].filter((f) => !noCheckNow.includes(f));
  // Same check on both paths, so verify and --update cannot disagree about it.
  // The first argument must be the BASELINE's files, not the live ones: a file
  // that gains @ts-nocheck drops out of the live diagnostics entirely, so
  // intersecting with `live` is empty by construction and would never fire.
  const suppressionViolations = suppressedIntersection(Object.keys(baseline), noCheckNow);

  if (UPDATE) {
    const refusal = updateRefusal(regressions, { force: FORCE_REGRESSIONS });
    if (refusal) {
      process.stderr.write(
        `[build-typecheck] REFUSING to update — ${refusal}:\n` +
          regressions
            .map((r) => `  + ${r.file} ${r.code} (baseline ${r.baselineCount} -> live ${r.liveCount})`)
            .join("\n") +
          `\n\nFix those, or pass --force if accepting the debt is a deliberate decision.\n`
      );
      process.exit(1);
    }
    if (addedNoCheck.length > 0 && !FORCE_NOCHECK) {
      process.stderr.write(
        `[build-typecheck] REFUSING to update — ${addedNoCheck.length} new @ts-nocheck file(s):\n` +
          addedNoCheck.map((f) => `  + ${f}`).join("\n") +
          `\n\n@ts-nocheck makes a file invisible to every diagnostic, so it is not a way ` +
          `to record debt. Fix the file, or pass --force with a written reason.\n`
      );
      process.exit(1);
    }
    if (suppressionViolations.length > 0 && !FORCE_NOCHECK) {
      process.stderr.write(
        `[build-typecheck] REFUSING to update — ${suppressionViolations.length} file(s) carry ` +
          `baselined errors while silencing the compiler:\n` +
          suppressionViolations.map((f) => `  + ${f}`).join("\n") +
          `\n\nRewriting the baseline here would delete the frozen debt and hide the file at ` +
          `the same time.\n`
      );
      process.exit(1);
    }

    // A program that shrank is not an improvement to bank. Without this, adding a
    // directory to `exclude` is the cheapest way to make this gate green.
    if (programDrift.length > 0 && !FORCE_NOCHECK) {
      process.stderr.write(
        `[build-typecheck] REFUSING to update — the program changed shape:\n` +
          programDrift.map((d) => `  ~ ${d}`).join("\n") +
          `\n\nShrinking the program removes diagnostics without fixing them, so the ` +
          `frozen counts stop describing this codebase. Revert the change, or pass ` +
          `--force if the program really is meant to change.\n`
      );
      process.exit(1);
    }

    if (suppressionRegressions.length > 0 && !FORCE_NOCHECK) {
      process.stderr.write(
        `[build-typecheck] REFUSING to update — ${suppressionRegressions.length} file(s) gained ` +
          `line-level @ts-ignore/@ts-expect-error:\n` +
          suppressionRegressions
            .map((r) => `  + ${r.file} (${r.was} -> ${r.live})`)
            .join("\n") +
          `\n\nA suppression deletes the diagnostic, so rewriting the baseline here would ` +
          `record the deletion as progress.\n`
      );
      process.exit(1);
    }

    // Serialise both documents before writing either, so a failure cannot leave
    // one file updated and the other stale.
    const nextDiagnostics = JSON.stringify(live, null, 2) + "\n";
    const priorNoCheck = readJson(NOCHECK_BASELINE_PATH, {});
    const nextNoCheck =
      JSON.stringify(
        { ...priorNoCheck, _program: fingerprint, files: [...noCheckNow].sort() },
        null,
        2
      ) + "\n";
    const nextSuppressions = JSON.stringify(lineSuppressions, null, 2) + "\n";
    try {
      fs.writeFileSync(BASELINE_PATH, nextDiagnostics);
      fs.writeFileSync(NOCHECK_BASELINE_PATH, nextNoCheck);
      fs.writeFileSync(SUPPRESSION_BASELINE_PATH, nextSuppressions);
    } catch (err) {
      process.stderr.write(
        `[build-typecheck] FAIL — could not persist the baselines: ` +
          `${err instanceof Error ? err.message : String(err)}\n`
      );
      process.exit(2);
    }
    console.log(
      `[build-typecheck] baseline rewritten (${liveErrorCount} errors frozen over ` +
        `${Object.keys(live).length} files; ${noCheckNow.length} @ts-nocheck files).`
    );
    process.exit(0);
  }

  if (improvements.length > 0) {
    console.log(
      `[build-typecheck] ${improvements.length} baselined error(s) are gone ` +
        `— run 'node scripts/check/check-build-typecheck.mjs --update' to ratchet the baseline down:\n` +
        improvements
          .map((i) => `  - ${i.file} ${i.code} (baseline ${i.baselineCount} -> live ${i.liveCount})`)
          .join("\n")
    );
  }

  if (suppressionRegressions.length > 0) {
    process.stderr.write(
      `[build-typecheck] FAIL — ${suppressionRegressions.length} file(s) gained line-level ` +
        `@ts-ignore/@ts-expect-error since the baseline:\n` +
        suppressionRegressions.map((r) => `  ✗ ${r.file} (${r.was} -> ${r.live})`).join("\n") +
        `\n\nA suppression makes a diagnostic disappear without fixing it. If the suppression ` +
        `is correct (a genuine upstream type bug), record it with ` +
        `'node scripts/check/check-build-typecheck.mjs --update'.\n`
    );
    process.exit(1);
  }

  if (programDrift.length > 0) {
    process.stderr.write(
      `[build-typecheck] FAIL — the program changed shape since the baseline was recorded:\n` +
        programDrift.map((d) => `  ✗ ${d}`).join("\n") +
        `\n\nDiagnostics disappear when the program shrinks, so a lower count here is not ` +
        `progress. Revert the config change, or if the program is meant to change, record ` +
        `it with 'node scripts/check/check-build-typecheck.mjs --update'.\n`
    );
    process.exit(1);
  }

  if (addedNoCheck.length > 0) {
    process.stderr.write(
      `[build-typecheck] FAIL — ${addedNoCheck.length} file(s) added @ts-nocheck, which ` +
        `silences every diagnostic in them:\n` +
        addedNoCheck.map((f) => `  ✗ ${f}`).join("\n") +
        `\n\nThis is not a fix: the file stops being checked at all. Fix the errors, or if ` +
        `the file genuinely cannot be typed yet, add it to ` +
        `config/quality/ts-nocheck-baseline.json deliberately.\n`
    );
    process.exit(1);
  }

  if (suppressionViolations.length > 0) {
    process.stderr.write(
      `[build-typecheck] FAIL — ${suppressionViolations.length} file(s) have baselined errors ` +
        `and also silence the compiler:\n` +
        suppressionViolations.map((f) => `  ✗ ${f}`).join("\n") +
        `\n\nThe frozen count describes a file that is no longer checked. Remove the directive ` +
        `or fix the errors.\n`
    );
    process.exit(1);
  }

  if (regressions.length > 0) {
    process.stderr.write(
      `[build-typecheck] FAIL — ${regressions.length} new/regressed TypeScript error(s) outside ` +
        `the frozen baseline:\n` +
        regressions
          .map((r) => `  ✗ ${r.file} ${r.code} (baseline ${r.baselineCount}, live ${r.liveCount})`)
          .join("\n") +
        `\n\nFix the new errors. Do not widen the baseline to get green — that is the exact ` +
        `failure mode this gate exists to prevent.\n`
    );
    process.exit(1);
  }

  if (removedNoCheck.length > 0) {
    console.log(
      `[build-typecheck] ${removedNoCheck.length} file(s) no longer use @ts-nocheck — ` +
        `run with --update to ratchet the list down:\n` +
        removedNoCheck.map((f) => `  - ${f}`).join("\n")
    );
  }

  console.log(
    `[build-typecheck] OK — ${liveErrorCount} pre-existing error(s) within the frozen baseline, ` +
      `${noCheckNow.length} @ts-nocheck file(s) unchanged.`
  );
  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main();
}
