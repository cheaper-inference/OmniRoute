// scripts/check/lib/derivedArtifactScope.mjs
// How strictly a check on a GENERATED artifact applies in each gate mode (gateMode.mjs).
//
// Plan "derived numbers and texts resolved only at release" (2026-11-13): generated files
// (docs/reference/PROVIDER_REFERENCE.md, the README diagrams, the generated agent skills,
// config/quality/e2e-timings.json) are rewritten by one refresh at release
// (`release:refresh-derived`) or by a nightly refresh PR, never by feature PRs
// (config/quality/derived-paths/*.json). A check that compares such a file with its generator
// therefore means two different things:
//
//   release  — the committed file must equal the generator output (strict, as always).
//   pr       — the base may have moved the generator's inputs since the last refresh; that is
//              not this change's doing. Only an artifact the change itself edited is judged
//              (an edited generated file must still be exactly what the generator writes, so a
//              hand edit or a stale regeneration fails); every other artifact is skipped.
//
// No resolvable diff base in pr mode → skip by default, the same rule check-pr-derived-paths.mjs
// and the other diff-aware gates follow. That default is for the unit tests: test-unit checks
// out a shallow merge ref with no base, so a test there can never tell whether the PR edited the
// artifact. The edited-artifact comparison is therefore owned by a check that runs with full
// history (scripts/check/check-generated-artifacts.mjs, `npm run check:generated-artifacts`),
// which passes `onUnresolved: "strict"`: no base → every artifact is judged (fail-closed).

import {
  describeGateMode,
  listChangedFiles,
  resolveGateModeInfo,
  resolvePrDiffBase,
} from "./gateMode.mjs";

export const RELEASE_MODE_TAIL =
  "the strict check runs in release mode (release PR, Release-Green, nightly)";

/**
 * True when a changed path is `target` itself or, for a target ending in "/", sits under it.
 * @param {string[]} changedFiles repo-relative POSIX paths
 * @param {string} target exact file, or a directory written with a trailing slash
 */
export function pathTouches(changedFiles, target) {
  if (target.endsWith("/")) return changedFiles.some((file) => file.startsWith(target));
  return changedFiles.includes(target);
}

/** `<tag> SKIP reason=<reason> — <what>; the strict check runs in release mode (…)`. */
export function prModeSkipLine(tag, reason, what) {
  const prefix = tag ? `${tag} ` : "";
  return `${prefix}SKIP reason=${reason} — ${what}; ${RELEASE_MODE_TAIL}`;
}

/**
 * @param {object} opts
 * @param {string[]} opts.artifacts   generated files (or directories with a trailing slash)
 * @param {string[]} [opts.argv]
 * @param {Record<string, string | undefined>} [opts.env]
 * @param {string} [opts.cwd]
 * @param {string[]} [opts.changedFiles] explicit change list (tests); otherwise read from git
 * @param {"skip" | "strict"} [opts.onUnresolved] pr mode with no diff base: skip every artifact
 *   (default) or judge every artifact (fail-closed)
 * @returns {{ info: ReturnType<typeof resolveGateModeInfo>, strict: string[], skipped: string[],
 *             reason: null | "pr-mode" | "base-unresolved", changed: string[] | null }}
 */
export function resolveDerivedScope({
  artifacts,
  argv = process.argv,
  env = process.env,
  cwd = process.cwd(),
  changedFiles,
  onUnresolved = "skip",
} = {}) {
  const info = resolveGateModeInfo({ argv, env });
  if (info.mode === "release") {
    return { info, strict: [...artifacts], skipped: [], reason: null, changed: null };
  }
  let changed = changedFiles;
  if (!changed) {
    const base = resolvePrDiffBase({ env, cwd });
    if (!base) {
      const closed = onUnresolved === "strict";
      return {
        info,
        strict: closed ? [...artifacts] : [],
        skipped: closed ? [] : [...artifacts],
        reason: "base-unresolved",
        changed: null,
      };
    }
    changed = listChangedFiles(base.sha, { cwd, includeWorktree: !env.CI });
  }
  const strict = artifacts.filter((artifact) => pathTouches(changed, artifact));
  const skipped = artifacts.filter((artifact) => !strict.includes(artifact));
  return { info, strict, skipped, reason: "pr-mode", changed };
}

/**
 * node:test `skip` option for a "the committed file equals the generator output" test:
 * `false` (run it) in release mode or when the change touched the artifact; otherwise the
 * shared SKIP line as the skip reason.
 * @param {string} artifact
 * @param {Omit<Parameters<typeof resolveDerivedScope>[0], "artifacts">} [opts]
 * @returns {false | string}
 */
export function releaseOnlyUnlessTouched(artifact, opts = {}) {
  const scope = resolveDerivedScope({ ...opts, artifacts: [artifact] });
  if (scope.strict.length > 0) return false;
  const why =
    scope.reason === "base-unresolved"
      ? `${describeGateMode(scope.info)} and no diff base to tell whether this change edited ${artifact} (a shallow checkout); the edited-artifact comparison runs in \`npm run check:generated-artifacts\` (full history)`
      : `${describeGateMode(scope.info)}; this change does not edit ${artifact}, so drift from the base is the release refresh's (release:refresh-derived)`;
  return prModeSkipLine("", scope.reason, why);
}
