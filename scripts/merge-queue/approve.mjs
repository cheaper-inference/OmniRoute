#!/usr/bin/env node
// scripts/merge-queue/approve.mjs — WP4. Binds a label approval to the exact head SHA.
// STUB written by the lead: exported names, parameters and return shapes are the contract.
//
// Runs in the `approval` job of .github/workflows/omni-queue.yml on pull_request_target
// (labeled | unlabeled), WITHOUT the tick's concurrency group (a pending tick can be cancelled by
// GitHub; an approval must never be lost). Reads only the event payload (GITHUB_EVENT_PATH) and
// the API — never PR code.
//
//   labeled config.label / config.protectedApprovalLabel by an approver → commit status
//     `success` on pull_request.head.sha, context APPROVAL_CONTEXTS[kind],
//     description "approved by <login>" (App token, so the creator is `<appSlug>[bot]`);
//   labeled by a non-approver → comment once (key "not-approver"), no status;
//   unlabeled → status `failure` "approval withdrawn by <login>" on the same head/context.

/**
 * @param {{gh: object, config: object, event: object, eventName: string,
 *          log?: (msg: string) => void}} input   event = parsed GITHUB_EVENT_PATH
 * @returns {Promise<{action: "approved"|"withdrawn"|"rejected-actor"|"ignored",
 *                    kind?: "queue"|"protected", sha?: string, actor?: string}>}
 */
export async function handleLabelEvent(input) {
  void input;
  throw new Error("not implemented (WP4)");
}

/** CLI entry: reads OMNI_QUEUE_TOKEN, GITHUB_REPOSITORY, GITHUB_EVENT_NAME, GITHUB_EVENT_PATH. */
export async function main(env = process.env) {
  void env;
  throw new Error("not implemented (WP4)");
}
