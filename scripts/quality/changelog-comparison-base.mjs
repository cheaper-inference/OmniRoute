#!/usr/bin/env node
// Pin the CHANGELOG comparison to the event that created this candidate.
// A rerun must not compare an old merge result with today's origin/<base>.
import { fileURLToPath } from "node:url";

const COMMIT_SHA = /^[0-9a-f]{40}$/;

function requireCommitSha(value, field) {
  if (typeof value !== "string" || !COMMIT_SHA.test(value) || /^0+$/.test(value)) {
    throw new Error(`Missing or invalid immutable ${field}`);
  }
  return value;
}

/**
 * @param {{eventName?: string, candidateSha?: string, pullRequestBaseSha?: string,
 *   mergeGroupBaseSha?: string, pushBeforeSha?: string}} input
 */
export function resolveChangelogComparisonBase(input = {}) {
  const candidateSha = requireCommitSha(input.candidateSha, "candidate SHA");
  switch (input.eventName) {
    case "pull_request":
      return requireCommitSha(input.pullRequestBaseSha, "pull-request base SHA");
    case "merge_group":
      return requireCommitSha(input.mergeGroupBaseSha, "merge-group base SHA");
    case "push":
      return requireCommitSha(input.pushBeforeSha, "push before SHA");
    case "workflow_dispatch":
      // Manual validation checks the exact candidate's last transition. An absent
      // first parent remains an error in the checker; never select a moving branch.
      return `${candidateSha}^1`;
    default:
      throw new Error("Unsupported CHANGELOG comparison event");
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    console.log(
      resolveChangelogComparisonBase({
        eventName: process.env.CHANGELOG_EVENT_NAME,
        candidateSha: process.env.CHANGELOG_CANDIDATE_SHA,
        pullRequestBaseSha: process.env.CHANGELOG_PR_BASE_SHA,
        mergeGroupBaseSha: process.env.CHANGELOG_MERGE_GROUP_BASE_SHA,
        pushBeforeSha: process.env.CHANGELOG_PUSH_BEFORE_SHA,
      })
    );
  } catch (error) {
    console.error(`[changelog-comparison] ${error.message}`);
    process.exitCode = 1;
  }
}
