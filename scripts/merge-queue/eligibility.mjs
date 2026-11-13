// scripts/merge-queue/eligibility.mjs — WP1 (pure). Plan §3.3: which PRs may enter a batch.
// STUB written by the lead: exported names, parameters and return shapes are the contract.
// WP1 replaces the bodies; changing a signature requires the lead.

/**
 * @typedef {import("./contracts.mjs").Action} Action
 * @typedef {import("./contracts.mjs").PrRef} PrRef
 * @typedef {import("./contracts.mjs").QueueState} QueueState
 * @typedef {import("./config.mjs").QueueConfig} QueueConfig
 */

/**
 * @typedef {object} TimelineEvent   normalized by github.listIssueTimeline (oldest first)
 * @property {string} event          "labeled" | "unlabeled" | "head_ref_force_pushed" | ...
 * @property {string|null} actor     login (server-side actor, trusted)
 * @property {string} createdAt      ISO, server time
 * @property {string} [label]        label name for labeled/unlabeled
 * @property {string} [sha]          commit id when the event carries one
 */

/**
 * @typedef {object} CommitStatus    normalized by github.listCommitStatuses (newest first)
 * @property {string} context
 * @property {"success"|"failure"|"error"|"pending"} state
 * @property {string|null} creator   login of the status creator
 * @property {string} description
 * @property {string} createdAt      ISO
 * @property {string|null} targetUrl
 */

/**
 * @typedef {object} PrSnapshot      assembled by the tick for every open PR carrying the label
 * @property {number} number
 * @property {"open"|"closed"} state
 * @property {boolean} draft
 * @property {boolean} merged
 * @property {string} baseRef
 * @property {string} headSha
 * @property {string} title
 * @property {string} author
 * @property {string[]} labels
 * @property {boolean|null} mergeable   GitHub `mergeable` (null = not computed yet)
 * @property {string} mergeableState    GitHub `mergeable_state`
 * @property {string[]} files           changed paths, including previous names of renames
 * @property {TimelineEvent[]} timeline
 * @property {CommitStatus[]} headStatuses   statuses on headSha (approval contexts live here)
 * @property {"success"|"failure"|"pending"|null} prGreenCheck  latest config.prGreenCheck on head
 */

/**
 * @typedef {object} EligibilityContext
 * @property {QueueConfig} config
 * @property {{number: number, title: string, body: string}[]} freezeIssues  open release-freeze issues
 * @property {QueueState|null} state   state of the PR's base (in-flight / shadow bookkeeping)
 * @property {string} now              ISO
 */

/**
 * @typedef {object} Approval
 * @property {boolean} valid
 * @property {string|null} actor       approver who applied the label
 * @property {string|null} labeledAt   ISO of that label event (FIFO key)
 * @property {string|null} reason      INELIGIBLE_REASONS code when invalid
 */

/**
 * @typedef {object} Eligibility
 * @property {boolean} eligible
 * @property {{code: string, detail: string}[]} reasons  INELIGIBLE_REASONS codes; [] when eligible
 * @property {Action[]} actions          comment-once / remove-label requests for the tick
 * @property {Approval} approval         queue-label approval (valid when eligible)
 * @property {boolean} protectedSurface  diff touches config.protectedPaths
 */

/**
 * Approval of one label kind, bound to the CURRENT head:
 *  - the latest `labeled` timeline event for that label is by an approver, and
 *  - the newest status of APPROVAL_CONTEXTS[kind] on headSha is `success`, created by
 *    `${config.appSlug}[bot]`, and created within APPROVAL_STATUS_SKEW_SECONDS after that event.
 * A success status only on an older head → "head-changed-after-label".
 * @param {PrSnapshot} pr
 * @param {EligibilityContext} ctx
 * @param {"queue"|"protected"} kind
 * @returns {Approval}
 */
export function approvalFor(pr, ctx, kind) {
  void pr;
  void ctx;
  void kind;
  throw new Error("not implemented (WP1)");
}

/**
 * True when an OPEN release-freeze issue names `base` exactly (word-boundary match in title or
 * body; "release/v3.8.5" must not match "release/v3.8.54").
 * @param {string} base
 * @param {{title: string, body: string}[]} freezeIssues
 */
export function isBaseFrozen(base, freezeIssues) {
  void base;
  void freezeIssues;
  throw new Error("not implemented (WP1)");
}

/**
 * All §3.3 rules. Never performs I/O; returns the side effects as `actions`:
 *  - label by a non-approver → comment once (key "not-approver"), label kept, ineligible;
 *  - head changed after the label → comment + removeLabel;
 *  - conflicting (mergeable === false) → comment + removeLabel;
 *  - approval/protected approval missing on the current head → comment once (key includes head12).
 * @param {PrSnapshot} pr
 * @param {EligibilityContext} ctx
 * @returns {Eligibility}
 */
export function evaluateEligibility(pr, ctx) {
  void pr;
  void ctx;
  throw new Error("not implemented (WP1)");
}

/**
 * Pick the next batch. Order: FIFO by approval.labeledAt; with config.preferGreenPrChecks, PRs
 * whose prGreenCheck is "success" come first, then null/pending, then "failure" (FIFO inside each
 * group). Takes at most config.batch.maxSize. Waits (waiting=true, batch=[]) while fewer than
 * maxSize are eligible AND the oldest approval is younger than batch.maxWaitMinutes; never returns
 * fewer than batch.minSize.
 * @param {{pr: PrSnapshot, eligibility: Eligibility}[]} candidates   eligible ones only
 * @param {EligibilityContext} ctx
 * @returns {{batch: PrRef[], waiting: boolean, reason: string}}
 */
export function selectBatch(candidates, ctx) {
  void candidates;
  void ctx;
  throw new Error("not implemented (WP1)");
}
