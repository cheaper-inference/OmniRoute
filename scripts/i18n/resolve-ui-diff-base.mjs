#!/usr/bin/env node
import { appendFileSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { resolveOpenapiBaseline } from "../check/openapiBaseline.mjs";

const SHA = /^[0-9a-f]{40}$/;
const BASE_BRANCH = /^(?:main|release\/v\d+\.\d+\.\d+)$/;
const REPOSITORY = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const PINNED_CONTEXT_FIELDS = [
  "I18N_BASE_SHA",
  "I18N_CANDIDATE_SHA",
  "I18N_BASE_TIP_SHA",
  "I18N_COMPARISON_SOURCE",
  "I18N_COMPARISON_SCOPE",
];

function git(cwd, ...args) {
  try {
    return execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      timeout: 30000,
      maxBuffer: 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    throw new Error("Cannot resolve immutable i18n comparison history");
  }
}

function assertSha(value) {
  if (!SHA.test(value ?? "") || /^0+$/.test(value)) {
    throw new Error("Missing immutable i18n comparison SHA");
  }
  return value;
}

export function assertUiCandidateUnchanged(cwd, candidateSha) {
  if (git(cwd, "rev-parse", "--verify", "HEAD^{commit}") !== candidateSha) {
    throw new Error("i18n candidate changed during comparison");
  }
}

function validateComparison(cwd, comparison) {
  const { baseSha, baseTipSha, candidateSha } = comparison;
  for (const sha of [baseSha, baseTipSha, candidateSha]) {
    assertSha(sha);
    if (git(cwd, "rev-parse", "--verify", sha + "^{commit}") !== sha) {
      throw new Error("Unresolvable i18n comparison commit");
    }
  }
  if (baseSha === candidateSha) {
    throw new Error("Empty i18n comparison: base equals candidate");
  }
  assertUiCandidateUnchanged(cwd, candidateSha);
  return comparison;
}

/** Read-only, all pages; an API error or incomplete result never selects a guessed base. */
export function lookupAssociatedPullRequests({ cwd, env, candidateSha }) {
  if (!REPOSITORY.test(env.GITHUB_REPOSITORY ?? "")) {
    throw new Error("Missing repository for i18n dispatch comparison");
  }
  try {
    const pages = JSON.parse(
      execFileSync(
        "gh",
        [
          "api",
          "--paginate",
          "--slurp",
          "repos/" + env.GITHUB_REPOSITORY + "/commits/" + candidateSha + "/pulls?per_page=100",
        ],
        {
          cwd,
          env,
          encoding: "utf8",
          timeout: 30000,
          maxBuffer: 8 * 1024 * 1024,
          stdio: ["ignore", "pipe", "pipe"],
        }
      )
    );
    if (!Array.isArray(pages) || pages.some((page) => !Array.isArray(page))) {
      throw new Error("Invalid pull request response");
    }
    return pages.flat();
  } catch {
    throw new Error("Cannot resolve dispatch PR; provide i18n_base_sha explicitly");
  }
}

/**
 * Differential scope only. PR/retarget, push and merge-group reuse the existing
 * immutable event contract. Dispatch of a candidate needs its exact open PR or an
 * explicit base SHA. Direct main/release dispatch observes only the last commit.
 */
export function resolveUiDiffBase({
  cwd = process.cwd(),
  env = process.env,
  lookupPullRequests = lookupAssociatedPullRequests,
} = {}) {
  const candidateSha = git(cwd, "rev-parse", "--verify", "HEAD^{commit}");
  const eventName = env.GITHUB_EVENT_NAME;

  // The workflow resolves once, then passes this same pinned pair to both UI gates.
  // A partial or explicitly empty context cannot fall back to local or event history.
  if (PINNED_CONTEXT_FIELDS.some((field) => Object.hasOwn(env, field))) {
    assertSha(env.I18N_BASE_SHA);
    assertSha(env.I18N_CANDIDATE_SHA);
    if (env.I18N_CANDIDATE_SHA !== candidateSha) {
      throw new Error("Pinned i18n candidate does not match checkout");
    }
    return validateComparison(cwd, {
      baseSha: env.I18N_BASE_SHA,
      baseTipSha: env.I18N_BASE_TIP_SHA || env.I18N_BASE_SHA,
      candidateSha,
      source: env.I18N_COMPARISON_SOURCE || "explicit-pinned-pair",
      scope: env.I18N_COMPARISON_SCOPE || "differential",
    });
  }

  if (!eventName || ["pull_request", "push", "merge_group"].includes(eventName)) {
    const resolved = resolveOpenapiBaseline({ cwd, env });
    return validateComparison(cwd, {
      ...resolved,
      scope: eventName === "push" ? "push-range" : "candidate",
    });
  }

  if (!["workflow_dispatch", "schedule"].includes(eventName)) {
    throw new Error("Unsupported i18n comparison event");
  }
  if (env.GITHUB_SHA !== candidateSha) {
    throw new Error("Event candidate does not match checkout");
  }

  let event;
  try {
    event = JSON.parse(readFileSync(env.GITHUB_EVENT_PATH, "utf8"));
  } catch {
    throw new Error("Unreadable i18n comparison event");
  }
  const requested = event.inputs?.i18n_base_sha;
  let baseTipSha;
  let source;
  let scope = "candidate";
  let pullRequest = null;

  if (requested) {
    baseTipSha = assertSha(requested);
    source = eventName + ":explicit-base";
  } else {
    const branch = (env.GITHUB_REF || "").replace(/^refs\/heads\//, "");
    if (!env.GITHUB_REF?.startsWith("refs/heads/") || !branch) {
      throw new Error("Dispatch comparison requires a branch or explicit base SHA");
    }
    if (BASE_BRANCH.test(branch)) {
      baseTipSha = git(cwd, "rev-parse", "--verify", candidateSha + "^1");
      source = eventName + ":first-parent";
      scope = "last-commit";
    } else if (eventName === "workflow_dispatch") {
      const repo = env.GITHUB_REPOSITORY?.toLowerCase();
      if (!repo || !REPOSITORY.test(env.GITHUB_REPOSITORY)) {
        throw new Error("Missing repository for i18n dispatch comparison");
      }
      const pulls = lookupPullRequests({ cwd, env, candidateSha });
      if (!Array.isArray(pulls)) throw new Error("Invalid dispatch PR response");
      const matches = pulls.filter(
        (pr) =>
          pr.state === "open" &&
          pr.head?.sha === candidateSha &&
          pr.head?.ref === branch &&
          pr.head?.repo?.full_name?.toLowerCase() === repo &&
          pr.base?.repo?.full_name?.toLowerCase() === repo
      );
      if (matches.length !== 1 || !BASE_BRANCH.test(matches[0].base?.ref ?? "")) {
        throw new Error("Dispatch needs one exact open PR or explicit i18n_base_sha");
      }
      baseTipSha = assertSha(matches[0].base.sha);
      pullRequest = matches[0].number;
      source = "workflow_dispatch:pull_request";
    } else {
      throw new Error("Scheduled i18n comparison requires main or a release branch");
    }
  }

  const baseSha =
    scope === "last-commit"
      ? baseTipSha
      : git(cwd, "merge-base", assertSha(baseTipSha), candidateSha);
  return validateComparison(cwd, {
    baseSha,
    baseTipSha,
    candidateSha,
    source,
    scope,
    pullRequest,
  });
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    const comparison = resolveUiDiffBase();
    console.log(JSON.stringify({ gate: "i18n-differential", ...comparison }, null, 2));
    if (process.env.GITHUB_OUTPUT) {
      const output = {
        base_sha: comparison.baseSha,
        base_tip_sha: comparison.baseTipSha,
        candidate_sha: comparison.candidateSha,
        source: comparison.source,
        scope: comparison.scope,
      };
      appendFileSync(
        process.env.GITHUB_OUTPUT,
        Object.entries(output)
          .map(([key, value]) => key + "=" + value)
          .join("\n") + "\n"
      );
    }
  } catch (error) {
    console.error("[i18n-differential] INCOMPLETE: " + error.message);
    process.exitCode = 2;
  }
}
