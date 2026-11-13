// scripts/merge-queue/github.mjs — WP4. Minimal REST client for omni-queue (fetch, no deps).
// STUB written by the lead: exported names, parameters and return shapes are the contract.
//
// Every method returns NORMALIZED objects (shapes below / in eligibility.mjs, checks.mjs,
// classify.mjs) so pure modules never see raw API payloads. Retries with exponential backoff on
// network errors, 5xx, 429 and secondary-rate-limit 403 (honors Retry-After / x-ratelimit-reset).
// Never logs the token or Authorization headers.

export class GitHubError extends Error {
  /** @param {number} status @param {string} method @param {string} path @param {string} message */
  constructor(status, method, path, message) {
    super(`${method} ${path} → ${status}: ${message}`);
    this.name = "GitHubError";
    this.status = status;
    this.method = method;
    this.path = path;
  }
}

/**
 * @typedef {object} PullSummary
 * @property {number} number
 * @property {boolean} draft
 * @property {string} baseRef
 * @property {string} headSha
 * @property {string} headRef
 * @property {string|null} headRepoFullName
 * @property {string} title
 * @property {string} author
 * @property {string[]} labels
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {PullSummary & {state: "open"|"closed", merged: boolean, mergeable: boolean|null,
 *           mergeableState: string, body: string}} Pull
 */

/**
 * @typedef {object} GitHubClient
 * @property {string} owner
 * @property {string} repo
 * @property {(method: string, path: string, opts?: {query?: object, body?: unknown,
 *            accept?: string, allowStatuses?: number[]}) => Promise<{status: number, data: any,
 *            headers: Headers}>} request
 * @property {(path: string, query?: object) => Promise<any[]>} paginate  follows Link rel="next";
 *            unwraps {total_count, <items>} envelopes (check_runs, workflow_runs, ...)
 *
 * — pull requests / issues —
 * @property {(opts?: {base?: string}) => Promise<PullSummary[]>} listOpenPulls
 * @property {(n: number) => Promise<Pull>} getPull
 * @property {(n: number) => Promise<string[]>} listPullFiles   incl. previous_filename of renames
 * @property {(n: number) => Promise<import("./eligibility.mjs").TimelineEvent[]>} listIssueTimeline
 * @property {(n: number, labels: string[]) => Promise<void>} addLabels
 * @property {(n: number, label: string) => Promise<void>} removeLabel   404 = already absent (ok)
 * @property {(n: number) => Promise<{id: number, body: string, author: string,
 *            createdAt: string}[]>} listIssueComments
 * @property {(n: number, body: string) => Promise<{id: number}>} createIssueComment
 * @property {(n: number, key: string, body: string) => Promise<{posted: boolean}>} commentOnce
 *            posts `body + "\n\n" + contracts.commentMarker(key)` unless a comment on issue/PR n
 *            already contains that marker (then {posted:false}). The ONLY way queue code comments.
 * @property {(opts: {labels?: string[], state?: "open"|"closed"|"all"}) => Promise<{number: number,
 *            title: string, body: string, labels: string[], state: string,
 *            updatedAt: string}[]>} listIssues   issues only (PRs filtered out)
 * @property {(input: {title: string, body: string, labels?: string[]}) => Promise<{number: number}>} createIssue
 * @property {(n: number, patch: {title?: string, body?: string, state?: string}) => Promise<void>} updateIssue
 *
 * — commits / checks / statuses —
 * @property {(branch: string) => Promise<string|null>} getBranchSha   null when absent
 * @property {(sha: string) => Promise<{sha: string, treeSha: string, parents: string[],
 *            message: string}>} getCommit
 * @property {(sha: string) => Promise<import("./checks.mjs").CheckRun[]>} listCheckRuns
 * @property {(checkRunId: number) => Promise<import("./classify.mjs").Annotation[]>} listCheckRunAnnotations
 * @property {(sha: string) => Promise<import("./eligibility.mjs").CommitStatus[]>} listCommitStatuses  newest first
 * @property {(sha: string, s: {state: string, context: string, description: string,
 *            targetUrl?: string}) => Promise<void>} createCommitStatus
 *
 * — merge (squash-api landing) —
 * @property {(n: number, opts: {method: "squash"|"merge", sha: string, commitTitle?: string,
 *            commitMessage?: string}) => Promise<{merged: boolean, sha: string|null,
 *            status: number, message: string}>} mergePull   405/409 → merged:false (no throw)
 *
 * — contents API (state store CAS) —
 * @property {(path: string, ref: string) => Promise<{content: string, sha: string}|null>} getFileContent
 * @property {(path: string, input: {branch: string, message: string, content: string,
 *            sha?: string|null}) => Promise<{ok: true, sha: string}|{ok: false,
 *            conflict: true}>} putFileContent   409/422 sha mismatch → conflict
 * @property {(branch: string, files: {path: string, content: string}[], message: string)
 *            => Promise<string|null>} createOrphanBranch   commit sha; null if branch exists
 *
 * — refs / actions / rulesets —
 * @property {(prefix: string) => Promise<{ref: string, sha: string}[]>} listMatchingBranches
 *            (GET /git/matching-refs/heads/<prefix>; ref = branch name without refs/heads/)
 * @property {(branch: string) => Promise<void>} deleteBranch   refuses names outside
 *            contracts.CANDIDATE_PREFIX; 404/422 = already gone
 * @property {(q: {branch?: string, headSha?: string, event?: string}) => Promise<{id: number,
 *            name: string, status: string, conclusion: string|null, htmlUrl: string,
 *            headSha: string, event: string}[]>} listWorkflowRuns
 * @property {(workflowFile: string, ref: string, inputs: object) => Promise<void>} dispatchWorkflow
 * @property {() => Promise<object[]>} listRulesets
 * @property {(id: number) => Promise<object>} getRuleset
 * @property {(body: object) => Promise<object>} createRuleset
 * @property {(id: number, body: object) => Promise<object>} updateRuleset
 */

/**
 * @param {{token: string, repository: string, apiUrl?: string, fetchImpl?: typeof fetch,
 *          sleep?: (ms: number) => Promise<void>, log?: (msg: string) => void,
 *          maxRetries?: number, userAgent?: string}} options
 * @returns {GitHubClient}
 */
export function createGitHubClient(options) {
  void options;
  throw new Error("not implemented (WP4)");
}
