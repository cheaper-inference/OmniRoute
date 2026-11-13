// scripts/merge-queue/compose.mjs — WP2. Plan §3.1 step 3: build the candidate with git.
// STUB written by the lead: exported names, parameters and return shapes are the contract.
//
// Security contract: NEVER check out a working tree of PR code. Compose with
// `git merge-tree --write-tree` + `git commit-tree` in a bare scratch repository (git ≥ 2.38).
// All git calls go through gitexec.createGit (no shell, token in env, redacted errors).

/**
 * @typedef {import("./gitexec.mjs").Git} Git
 * @typedef {import("./contracts.mjs").PrRef} PrRef
 */

/**
 * @typedef {object} ComposeResult
 * @property {string|null} candidateSha   null when no PR could be included
 * @property {string|null} treeSha
 * @property {string} baseSha
 * @property {PrRef[]} included            merged into the candidate, in order
 * @property {PrRef[]} excludedBatchConflict  conflicts with earlier PRs of this batch only (stay queued)
 * @property {PrRef[]} excludedBaseConflict   conflicts with the bare base too (leave the queue)
 * @property {PrRef[]} excludedHeadMoved      fetched refs/pull/N/head ≠ pr.head (approval is stale)
 */

/**
 * Initialize a bare scratch repository at git.cwd with `origin` = remoteUrl and
 * `remote.origin.promisor`/`partialclonefilter=blob:none` (blobs fetched on demand by merge-tree).
 * Idempotent.
 * @param {{git: Git, remoteUrl: string}} input
 */
export function prepareRepo(input) {
  void input;
  throw new Error("not implemented (WP2)");
}

/**
 * Fetch refs/heads/<base> and refs/pull/<n>/head for every PR into local refs
 * (refs/omni-queue/base, refs/omni-queue/pr/<n>). Returns the fetched base tip and heads.
 * @param {{git: Git, base: string, prs: PrRef[]}} input
 * @returns {{baseSha: string, heads: Object<number, string>}}
 */
export function fetchInputs(input) {
  void input;
  throw new Error("not implemented (WP2)");
}

/**
 * Starting at baseSha, merge each PR's exact head in order (`merge-tree --write-tree`, then
 * `commit-tree -p <current> -p <head>` with contracts.buildMergeMessage). A PR that conflicts
 * with the candidate-so-far is re-tried against the bare base to decide between
 * excludedBatchConflict and excludedBaseConflict. Never a working tree, never a rebase.
 * @param {{git: Git, base: string, baseSha: string, prs: PrRef[], batchId: string,
 *          heads: Object<number, string>}} input   heads = fetchInputs().heads
 * @returns {ComposeResult}
 */
export function composeCandidate(input) {
  void input;
  throw new Error("not implemented (WP2)");
}

/**
 * Create refs/heads/<ref> on origin pointing at sha. Refuses any ref outside
 * contracts.CANDIDATE_PREFIX and never forces (candidate refs are unique per SHA).
 * @param {{git: Git, sha: string, ref: string}} input
 */
export function pushCandidate(input) {
  void input;
  throw new Error("not implemented (WP2)");
}

/**
 * Delete a candidate branch on origin (refuses refs outside CANDIDATE_PREFIX; missing = ok).
 * @param {{git: Git, ref: string}} input
 */
export function deleteCandidate(input) {
  void input;
  throw new Error("not implemented (WP2)");
}
