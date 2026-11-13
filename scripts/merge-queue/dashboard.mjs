// scripts/merge-queue/dashboard.mjs — WP4. Plan §3.6: the per-base dashboard issue.
// STUB written by the lead: exported names, parameters and return shapes are the contract.
//
// One issue per base: title contracts.dashboardTitle(base), label contracts.DASHBOARD_LABEL.
// Body regenerated each tick: ordered queue, in-flight candidate (run link), pause banner,
// last 20 history events, metrics.

/**
 * @typedef {import("./contracts.mjs").QueueState} QueueState
 * @typedef {import("./contracts.mjs").HistoryEvent} HistoryEvent
 * @typedef {import("./config.mjs").QueueConfig} QueueConfig
 */

/**
 * @typedef {object} QueueEntry
 * @property {number} number
 * @property {string} title
 * @property {string} author
 * @property {boolean} eligible
 * @property {{code: string, detail: string}[]} reasons
 * @property {string|null} labeledAt
 */

/**
 * Metrics from the history window: PRs landed, CI runs per merged PR (state.counters.ciRuns /
 * landedPrs), red batches, bisections, median and p90 minutes from approval (labeledAt) to
 * landed (from "landed" events joined with the PRs' labeledAt recorded in batch events).
 * @param {QueueState} state
 * @param {string} now ISO
 * @returns {{landedPrs: number, ciRunsPerMergedPr: number|null, redBatches: number,
 *            bisections: number, medianLabelToMergeMinutes: number|null,
 *            p90LabelToMergeMinutes: number|null}}
 */
export function computeMetrics(state, now) {
  void state;
  void now;
  throw new Error("not implemented (WP4)");
}

/**
 * Markdown body. Deterministic for a given input (no clock reads besides `now`). Escapes PR
 * titles (attacker-controlled) so they cannot inject markdown links, mentions or HTML.
 * @param {{base: string, state: QueueState, queue: QueueEntry[], config: QueueConfig,
 *          now: string, runUrl: string|null, repository?: string}} input
 *   repository = "owner/repo", used to build PR / commit-checks links (plain text when absent)
 * @returns {string}
 */
export function renderDashboard(input) {
  void input;
  throw new Error("not implemented (WP4)");
}

/**
 * Find the open dashboard issue (exact title + label) or create it; update the body only when
 * it changed. Returns the issue number.
 * @param {{gh: object, base: string, body: string}} input
 * @returns {Promise<number>}
 */
export async function upsertDashboard(input) {
  void input;
  throw new Error("not implemented (WP4)");
}
