#!/usr/bin/env node
// Pin CHANGELOG comparison to the event that created the candidate. Reruns must
// not compare an old candidate with a moving origin/<base> branch.
import { fileURLToPath } from "node:url";

const COMMIT_SHA = /^[0-9a-f]{40}$/;

function requireCommitSha(value, field) {
  if (typeof value !== "string" || !COMMIT_SHA.test(value) || /^0+$/.test(value)) {
    throw new Error(`Missing or invalid immutable ${field}`);
  }
  return value;
}

/**
 * @param {{eventName?: string, candidateSha?: string, eventRef?: string,
 *   pullRequestBaseSha?: string, mergeGroupBaseSha?: string, pushBeforeSha?: string,
 *   queueCandidateBaseSha?: string}} input
 */
export function resolveChangelogComparisonBase(input = {}) {
  const candidateSha = requireCommitSha(input.candidateSha, "candidate SHA");
  switch (input.eventName) {
    case "pull_request":
      return requireCommitSha(input.pullRequestBaseSha, "pull-request base SHA");
    case "merge_group":
      return requireCommitSha(input.mergeGroupBaseSha, "merge-group base SHA");
    case "push":
    case "workflow_dispatch":
      if (input.eventRef?.startsWith("refs/heads/omni-queue/")) {
        // candidate-base.mjs validates batch trailers/ancestry and base-check refs.
        // A base-check deliberately compares the candidate with itself. A missing
        // queue base must never fall back to push.before or the first parent.
        return requireCommitSha(input.queueCandidateBaseSha, "omni-queue candidate base SHA");
      }
      if (input.eventName === "push") {
        return requireCommitSha(input.pushBeforeSha, "push before SHA");
      }
      // The checker fails closed if this exact candidate's first parent is absent.
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
        eventRef: process.env.CHANGELOG_EVENT_REF,
        pullRequestBaseSha: process.env.CHANGELOG_PR_BASE_SHA,
        mergeGroupBaseSha: process.env.CHANGELOG_MERGE_GROUP_BASE_SHA,
        pushBeforeSha: process.env.CHANGELOG_PUSH_BEFORE_SHA,
        queueCandidateBaseSha: process.env.CHANGELOG_BASE_REF,
      })
    );
  } catch (error) {
    console.error(`[changelog-comparison] ${error.message}`);
    process.exitCode = 1;
  }
}
