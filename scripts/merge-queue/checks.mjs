// scripts/merge-queue/checks.mjs — WP1 (pure). Plan §3.4: verdict of a candidate's checks.
// STUB written by the lead: exported names, parameters and return shapes are the contract.

/**
 * @typedef {import("./eligibility.mjs").CommitStatus} CommitStatus
 * @typedef {import("./config.mjs").QueueConfig} QueueConfig
 */

/**
 * @typedef {object} CheckRun        normalized by github.listCheckRuns
 * @property {number} id
 * @property {string} name
 * @property {string} status         queued | in_progress | completed | waiting | requested | pending
 * @property {string|null} conclusion success | failure | neutral | cancelled | skipped | timed_out |
 *                                   action_required | stale | startup_failure | null
 * @property {string|null} startedAt
 * @property {string|null} completedAt
 * @property {string|null} htmlUrl
 * @property {string|null} appSlug   "github-actions" for workflow jobs
 * @property {{title: string|null, summary: string|null, text: string|null}} output
 */

/**
 * @typedef {object} ChecksVerdict
 * @property {"green"|"red"|"pending"|"timeout"} verdict
 * @property {Object<string, string>} required   required name → conclusion | "missing" | "pending"
 * @property {CheckRun[]} failures         failed, non-advisory runs (latest attempt per name)
 * @property {CheckRun[]} advisoryFailures
 * @property {string[]} pending            names still running, plus required ones not reported yet
 */

/**
 * Keep only the latest run per check name (highest id) — re-runs and retried candidates report
 * several runs with the same name on one SHA.
 * @param {CheckRun[]} checkRuns
 * @returns {CheckRun[]}
 */
export function latestByName(checkRuns) {
  void checkRuns;
  throw new Error("not implemented (WP1)");
}

/**
 * Plan §3.4 (mirrors the Mergify merge_conditions):
 *  - red: any completed non-advisory run/status with failure | cancelled | timed_out |
 *    action_required | startup_failure | stale, or a required check concluded other than success;
 *  - green: every config.requiredChecks is `success`, nothing pending, no non-advisory failure;
 *  - timeout: not decided after config.checksTimeoutMinutes since startedAt;
 *  - pending: otherwise.
 * Statuses: failure/error → failure, pending → pending (advisory names tolerated as for runs).
 * @param {{checkRuns: CheckRun[], statuses: CommitStatus[], config: QueueConfig,
 *          startedAt: string, now: string}} input
 * @returns {ChecksVerdict}
 */
export function evaluateChecks(input) {
  void input;
  throw new Error("not implemented (WP1)");
}
