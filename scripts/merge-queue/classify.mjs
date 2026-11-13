// scripts/merge-queue/classify.mjs — WP1 (pure). Plan §3.5: base-red vs PR-red vs infra.
// STUB written by the lead: exported names, parameters and return shapes are the contract.

/**
 * @typedef {import("./checks.mjs").CheckRun} CheckRun
 * @typedef {import("./contracts.mjs").FailureSignature} FailureSignature
 * @typedef {import("./contracts.mjs").BaseCheck} BaseCheck
 */

/**
 * @typedef {object} Annotation      normalized by github.listCheckRunAnnotations
 * @property {string|null} path
 * @property {string|null} title
 * @property {string} message
 * @property {string} level          notice | warning | failure
 */

/**
 * Positive evidence of an infrastructure failure for one run: runner lost / shutdown signal,
 * "lost communication with the server", `CreateArtifact` 404, "No space left on device",
 * startup_failure, job-level timed_out, or cancelled without any failure annotation.
 * @param {CheckRun} run
 * @param {Annotation[]} annotations
 */
export function isInfraFailure(run, annotations) {
  void run;
  void annotations;
  throw new Error("not implemented (WP1)");
}

/**
 * One signature per failing run. `check` is the run name with any matrix shard suffix removed
 * ("Unit Tests (3/8)" → "Unit Tests"): shards re-balance when files are added, so the same
 * failing test can move between shards from base to candidate. `key` is the normalized failing
 * test/gate identifier from failure annotations (path + title), else from output.title, else "".
 * @param {CheckRun[]} failures
 * @param {Object<number, Annotation[]>} annotationsByRunId
 * @returns {FailureSignature[]}
 */
export function extractSignatures(failures, annotationsByRunId) {
  void failures;
  void annotationsByRunId;
  throw new Error("not implemented (WP1)");
}

/**
 * Classify a red candidate:
 *  - every signature infra → "infra";
 *  - baseCheck for the SAME base SHA is "green" → "pr-red";
 *  - baseCheck "red" and every non-infra signature matches one of its signatures (same `check`,
 *    and same `key` when both keys are non-empty) → "base-red"; otherwise "pr-red";
 *  - no finished baseCheck for this base SHA and baseRedIssueOpen → "needs-base-check";
 *  - otherwise → "pr-red".
 * @param {{signatures: FailureSignature[], baseSha: string, baseCheck: BaseCheck|null,
 *          baseRedIssueOpen: boolean}} input
 * @returns {{kind: "infra"|"base-red"|"pr-red"|"needs-base-check", detail: string,
 *            matched: FailureSignature[], unmatched: FailureSignature[]}}
 */
export function classifyRed(input) {
  void input;
  throw new Error("not implemented (WP1)");
}
