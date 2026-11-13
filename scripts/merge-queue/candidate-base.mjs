#!/usr/bin/env node
// scripts/merge-queue/candidate-base.mjs — WP5. Base SHA of an omni-queue candidate push.
// STUB written by the lead: exported names, parameters and return shapes are the contract.
//
// ci.yml / quality.yml call this on `push` to `omni-queue/**` to get the SHA every
// base-relative step must compare against (the equivalent of merge_group.base_sha):
//   node scripts/merge-queue/candidate-base.mjs [--sha <commit>]  → prints
//     BASE_SHA=<40-hex>
//     TARGET=<base branch or empty>
//     SOURCE=trailer|self
// Source "trailer": HEAD's Omni-Queue-Base trailer (contracts.parseQueueTrailers) — a batch
// candidate. Source "self": no trailer → a base-check candidate (the bare base): BASE_SHA=HEAD.

/**
 * @param {{message: string, headSha: string}} input   message of the candidate's top commit
 * @returns {{baseSha: string, target: string|null, source: "trailer"|"self"}}
 */
export function resolveCandidateBase(input) {
  void input;
  throw new Error("not implemented (WP5)");
}

/** CLI entry. @returns {number} exit code */
export function main(argv = process.argv.slice(2)) {
  void argv;
  throw new Error("not implemented (WP5)");
}
