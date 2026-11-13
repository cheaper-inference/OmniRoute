#!/usr/bin/env node
// scripts/merge-queue/tick.mjs — WP3. Plan §3.1: ONE idempotent tick of the queue.
// STUB written by the lead: exported names, parameters and return shapes are the contract.
//
// Entry point of .github/workflows/omni-queue.yml (the only writer of queue state):
//   node scripts/merge-queue/tick.mjs [--base <branch>] [--action tick|pause|resume|dry-run]
//                                     [--reason <text>]
// Environment (set by the workflow; never logged):
//   OMNI_QUEUE_TOKEN       GitHub App installation token (contents/pull_requests/issues: write)
//   GITHUB_REPOSITORY      owner/repo
//   OMNI_QUEUE_GIT_NAME, OMNI_QUEUE_GIT_EMAIL   bot identity for queue merge commits
//   OMNI_QUEUE_CONFIG      optional path to an alternative config file (sandbox)
//   RUNNER_TEMP            scratch directory for the bare compose repository
//   GITHUB_SERVER_URL, GITHUB_RUN_ID   for run links in history/dashboard
//
// Tick algorithm (per base): load state (CAS) → handle action (pause/resume) → if paused:
// auto-resume a base-red pause when the base tip moved, else stop → if inFlight: read checks of
// candidateSha (checks.evaluateChecks) → pending: nothing; green: land (or would-land in shadow)
// / advance bisection; red: classify (classify.classifyRed) → infra retry / base-check / bisect /
// culprit; timeout: infra path → if nothing in flight: snapshot labeled PRs, run eligibility,
// execute its actions, select a batch, compose, push the candidate → render dashboard → save.
// Every network side effect happens BEFORE the state save that records it, and every step is
// safe to repeat when the save loses the CAS race (the next tick re-observes GitHub).

/**
 * @typedef {import("./contracts.mjs").QueueState} QueueState
 * @typedef {import("./config.mjs").QueueConfig} QueueConfig
 */

/**
 * @typedef {object} TickDeps
 * @property {QueueConfig} config
 * @property {object} gh                      github.mjs client
 * @property {import("./state.mjs").StateStore} store
 * @property {(cwd: string) => import("./gitexec.mjs").Git} gitFor  git runner factory
 * @property {string} repoDir                 scratch dir for the bare compose repository
 * @property {string} remoteUrl               https://github.com/<owner>/<repo>.git
 * @property {{name: string, email: string}} identity
 * @property {() => string} now               ISO clock (injected for tests)
 * @property {(msg: string) => void} log
 * @property {string|null} runUrl
 * @property {string} repository              owner/repo (dashboard and comment links)
 * @property {object} [modules]               optional overrides of the imported modules
 *   ({eligibility, checks, classify, compose, land, bisect, dashboard}) — tests inject fakes;
 *   main() uses the real ones
 */

/**
 * @param {TickDeps} deps
 * @param {{base: string, action: "tick"|"pause"|"resume"|"dry-run", reason?: string}} options
 *   dry-run = observe and decide, print the plan, perform NO write of any kind.
 * @returns {Promise<{base: string, decisions: string[], state: QueueState}>}
 */
export async function runTick(deps, options) {
  void deps;
  void options;
  throw new Error("not implemented (WP3)");
}

/**
 * Bases to visit when --base is absent: managed bases (config.bases) that have open PRs with the
 * queue label, an existing state file with something in flight, or a pause to re-evaluate.
 * @param {TickDeps} deps
 * @returns {Promise<string[]>}
 */
export async function discoverBases(deps) {
  void deps;
  throw new Error("not implemented (WP3)");
}

/** CLI entry (argv without node/script). Exit code 0 on success, 1 on error. */
export async function main(argv = process.argv.slice(2), env = process.env) {
  void argv;
  void env;
  throw new Error("not implemented (WP3)");
}
