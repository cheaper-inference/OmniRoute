#!/usr/bin/env node
// scripts/check/check-api-typecheck.mjs
// API-route-scoped typecheck ratchet (#11601).
//
// `typecheck:core` uses a curated file allowlist, the dashboard gate covers only
// src/app/(dashboard)/**, and Next builds ignore TypeScript build errors, which
// left src/app/api/** without a blocking typecheck gate.
//
// This compiles tsconfig.typecheck-api.json and compares live diagnostics against
// a frozen per-(file, TS code) count baseline. The ratchet rules — refuse to bank a
// regression, freeze @ts-nocheck by name, count line-level suppressions, freeze the
// program's own shape — live in ./ratchet.mjs and are shared with the build gate so
// the two cannot drift apart.
//
// Metadata lives in the same JSON under `_`-prefixed keys, which the baseline
// differ skips.
//
// Run:
//   node scripts/check/check-api-typecheck.mjs                   # verify (CI)
//   node scripts/check/check-api-typecheck.mjs --update          # ratchet down
//   node scripts/check/check-api-typecheck.mjs --update --force-regressions  # accept a new counted error
//                                  --force-nocheck  # accept a permanent silence

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { runScopedTypecheck } from "./run-scoped-typecheck.mjs";
import { diffAgainstBaseline, parseTscOutput } from "./typecheckBaseline.mjs";
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

export { diffAgainstBaseline, parseTscOutput } from "./typecheckBaseline.mjs";

const ROOT = process.cwd();
const TSCONFIG = path.join(ROOT, "tsconfig.typecheck-api.json");
const BASELINE_PATH = path.join(ROOT, "config/quality/api-typecheck-baseline.json");
const UPDATE = process.argv.includes("--update");
// Accepting a new counted error and granting a permanent silence are different
// decisions and must not share one flag.
const FORCE_REGRESSIONS = process.argv.includes("--force-regressions");
const FORCE_NOCHECK = process.argv.includes("--force-nocheck");

// `--force` used to mean "accept everything". Silently ignoring it now would be
// worse than either behaviour, so say so.
if (process.argv.includes("--force")) {
  process.stderr.write(
    `[api-typecheck] --force was split: use --force-regressions to accept a counted error, ` +
      `or --force-nocheck to accept a permanent silence.\n`
  );
  process.exit(2);
}

function loadBaseline() {
  if (!fs.existsSync(BASELINE_PATH)) return {};
  return JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
}

function totalErrors(counts) {
  return Object.values(counts).reduce(
    (sum, codes) => sum + Object.values(codes).reduce((s, c) => s + c, 0),
    0
  );
}

function main() {
  if (!fs.existsSync(TSCONFIG)) {
    process.stderr.write(`[api-typecheck] FAIL — tsconfig not found at ${TSCONFIG}\n`);
    process.exit(2);
  }

  console.log("[api-typecheck] Running tsc scoped to src/app/api/**…");
  let stdout;
  try {
    stdout = runScopedTypecheck(ROOT, TSCONFIG, { incremental: false });
  } catch (err) {
    process.stderr.write(
      `[api-typecheck] FAIL — the compiler did not produce a complete result, so this run ` +
        `proves nothing about the baseline:\n${err instanceof Error ? err.message : String(err)}\n`
    );
    process.exit(2);
  }

  const live = parseTscOutput(stdout);
  const liveErrorCount = totalErrors(live);
  console.log(`apiTypecheckErrors=${liveErrorCount}`);

  const stored = loadBaseline();
  const { _program, _nocheck, _suppressions, ...baselineCounts } = stored;
  const { regressions, improvements } = diffAgainstBaseline(live, baselineCounts);

  const files = programFiles(ROOT, TSCONFIG);
  if (files.length === 0) {
    process.stderr.write(
      `[api-typecheck] FAIL — the program resolved to zero files, so this run proves nothing\n`
    );
    process.exit(2);
  }

  const noCheckNow = scanNoCheckFiles(files, ROOT);
  const noCheckAllowed = new Set(Array.isArray(_nocheck) ? _nocheck : []);
  const addedNoCheck = noCheckNow.filter((f) => !noCheckAllowed.has(f));
  const removedNoCheck = [...noCheckAllowed].filter((f) => !noCheckNow.includes(f));

  const lineSuppressions = countLineSuppressions(files, ROOT);
  const suppressionRegressions = suppressionDrift(
    _suppressions && typeof _suppressions === "object" ? _suppressions : {},
    lineSuppressions
  );

  const fingerprint = programFingerprint(ROOT, TSCONFIG, files.length);
  const programDrift = fingerprintDrift(_program || null, fingerprint);

  const suppressionViolations = suppressedIntersection(Object.keys(baselineCounts), noCheckNow);

  if (UPDATE) {
    const refusal = updateRefusal(regressions, { force: FORCE_REGRESSIONS });
    if (refusal) {
      process.stderr.write(
        `[api-typecheck] REFUSING to update — ${refusal}:\n` +
          regressions
            .map((r) => `  + ${r.file} ${r.code} (baseline ${r.baselineCount} -> live ${r.liveCount})`)
            .join("\n") +
          `\n\nFix those, or pass --force if accepting the debt is a deliberate decision.\n`
      );
      process.exit(1);
    }
    if (addedNoCheck.length > 0 && !FORCE_NOCHECK) {
      process.stderr.write(
        `[api-typecheck] REFUSING to update — ${addedNoCheck.length} new @ts-nocheck file(s):\n` +
          addedNoCheck.map((f) => `  + ${f}`).join("\n") +
          `\n\n@ts-nocheck makes a file invisible to every diagnostic. Fix the errors instead.\n`
      );
      process.exit(1);
    }
    if (suppressionRegressions.length > 0 && !FORCE_NOCHECK) {
      process.stderr.write(
        `[api-typecheck] REFUSING to update — ${suppressionRegressions.length} file(s) gained ` +
          `line-level @ts-ignore/@ts-expect-error:\n` +
          suppressionRegressions.map((r) => `  + ${r.file} (${r.was} -> ${r.live})`).join("\n") +
          `\n\nA suppression deletes the diagnostic; banking it here would record the ` +
          `deletion as progress.\n`
      );
      process.exit(1);
    }
    if (programDrift.length > 0 && !FORCE_NOCHECK) {
      process.stderr.write(
        `[api-typecheck] REFUSING to update — the program changed shape:\n` +
          programDrift.map((d) => `  ~ ${d}`).join("\n") +
          `\n\nShrinking the program removes diagnostics without fixing them.\n`
      );
      process.exit(1);
    }
    if (suppressionViolations.length > 0 && !FORCE_NOCHECK) {
      process.stderr.write(
        `[api-typecheck] REFUSING to update — ${suppressionViolations.length} file(s) carry ` +
          `baselined errors while silencing the compiler:\n` +
          suppressionViolations.map((f) => `  + ${f}`).join("\n") +
          `\n\nRewriting the baseline here would delete the frozen debt and hide the file.\n`
      );
      process.exit(1);
    }

    const next =
      JSON.stringify(
        {
          ...live,
          _program: fingerprint,
          _nocheck: [...noCheckNow].sort(),
          _suppressions: lineSuppressions,
        },
        null,
        2
      ) + "\n";
    try {
      fs.writeFileSync(BASELINE_PATH, next);
    } catch (err) {
      process.stderr.write(
        `[api-typecheck] FAIL — could not persist the baseline: ` +
          `${err instanceof Error ? err.message : String(err)}\n`
      );
      process.exit(2);
    }
    console.log(
      `[api-typecheck] baseline rewritten (${liveErrorCount} errors frozen; ` +
        `${noCheckNow.length} @ts-nocheck files; ${Object.values(lineSuppressions).reduce((a, b) => a + b, 0)} suppressions).`
    );
    process.exit(0);
  }

  if (improvements.length > 0) {
    console.log(
      `[api-typecheck] ${improvements.length} baselined error(s) no longer present ` +
        `— run 'node scripts/check/check-api-typecheck.mjs --update' to ratchet the baseline down:\n` +
        improvements
          .map(
            (i) => `  - ${i.file} ${i.code} (baseline ${i.baselineCount} -> live ${i.liveCount})`
          )
          .join("\n")
    );
  }

  if (addedNoCheck.length > 0) {
    process.stderr.write(
      `[api-typecheck] FAIL — ${addedNoCheck.length} file(s) added @ts-nocheck, which silences ` +
        `every diagnostic in them:\n` +
        addedNoCheck.map((f) => `  ✗ ${f}`).join("\n") +
        `\n\nThis is not a fix: the file stops being checked at all.\n`
    );
    process.exit(1);
  }

  if (suppressionRegressions.length > 0) {
    process.stderr.write(
      `[api-typecheck] FAIL — ${suppressionRegressions.length} file(s) gained line-level ` +
        `@ts-ignore/@ts-expect-error:\n` +
        suppressionRegressions.map((r) => `  ✗ ${r.file} (${r.was} -> ${r.live})`).join("\n") +
        `\n\nA suppression makes a diagnostic disappear without fixing it.\n`
    );
    process.exit(1);
  }

  if (programDrift.length > 0) {
    process.stderr.write(
      `[api-typecheck] FAIL — the program changed shape since the baseline was recorded:\n` +
        programDrift.map((d) => `  ✗ ${d}`).join("\n") +
        `\n\nDiagnostics disappear when the program shrinks, so a lower count is not progress.\n`
    );
    process.exit(1);
  }

  if (suppressionViolations.length > 0) {
    process.stderr.write(
      `[api-typecheck] FAIL — ${suppressionViolations.length} file(s) have baselined errors and ` +
        `also silence the compiler:\n` +
        suppressionViolations.map((f) => `  ✗ ${f}`).join("\n") +
        `\n\nThe frozen count describes a file that is no longer checked.\n`
    );
    process.exit(1);
  }

  if (removedNoCheck.length > 0) {
    console.log(
      `[api-typecheck] ${removedNoCheck.length} file(s) no longer use @ts-nocheck — ` +
        `run with --update to ratchet the list down:\n` +
        removedNoCheck.map((f) => `  - ${f}`).join("\n")
    );
  }

  if (regressions.length > 0) {
    process.stderr.write(
      `[api-typecheck] FAIL — ${regressions.length} new/regressed TypeScript error(s) ` +
        `under src/app/api/ not covered by the frozen baseline:\n` +
        regressions
          .map((r) => `  ✗ ${r.file} ${r.code} (baseline ${r.baselineCount}, live ${r.liveCount})`)
          .join("\n") +
        `\n\nFix new API-route TypeScript regressions rather than widening the baseline.\n`
    );
    process.exit(1);
  }

  console.log(
    `[api-typecheck] OK — ${liveErrorCount} pre-existing error(s), all within frozen baseline; ` +
      `${noCheckNow.length} @ts-nocheck file(s) unchanged.`
  );
  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main();
}
