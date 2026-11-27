#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { parseArgs } from "node:util";

import { categoryOf, loadFamilies, matchesAny } from "../check/check-pr-derived-paths.mjs";
import { isMainModule } from "../lib/is-main-module.mjs";
import { isManagedBase, loadConfig } from "../merge-queue/config.mjs";
import { isProtectedPath, isSha } from "../merge-queue/contracts.mjs";

const REPOSITORY = "cheaper-inference/OmniRoute";
const HEAD_BRANCH = "chore/derived-refresh";
const RELEASE_BRANCH = /^release\/v\d+\.\d+\.\d+$/;
const QUEUE_LABEL = "omni-queue";
const GATES = [
  ["Gate / CI", "ci.yml"],
  ["Gate / Quality", "quality.yml"],
];

class AutolandError extends Error {}

function isApprover(config, login) {
  return config.approvers.some((approver) => approver.toLowerCase() === login?.toLowerCase());
}

export function decideAutoland({
  state,
  isDraft,
  headBranch,
  headRepository,
  repository,
  baseBranch,
  latestRelease,
  author,
  labels,
  files,
  headSha,
  checksHeadSha,
  checks,
  releaseFreezeOpen,
  baseRedOpen,
  config,
  families,
}) {
  const reasons = [];
  if (state !== "OPEN") reasons.push("pr-not-open");
  if (isDraft !== false) reasons.push("draft");
  if (headBranch !== HEAD_BRANCH) reasons.push("wrong-head-branch");
  if (!repository || headRepository?.toLowerCase() !== repository.toLowerCase()) {
    reasons.push("wrong-head-repository");
  }
  if (!isApprover(config, author)) reasons.push("wrong-author");
  if (
    !RELEASE_BRANCH.test(baseBranch) ||
    baseBranch !== latestRelease ||
    !isManagedBase(config, baseBranch)
  ) {
    reasons.push("wrong-base");
  }

  if (!files.length) reasons.push("empty-diff");
  if (
    files.some(
      (file) =>
        !families.some((family) => categoryOf(file, family) || matchesAny(file, family.companions))
    )
  ) {
    reasons.push("non-derived-file");
  }
  if (files.some((file) => isProtectedPath(file, config.protectedPaths))) {
    reasons.push("protected-file");
  }
  if (releaseFreezeOpen !== false) reasons.push("release-freeze");
  if (baseRedOpen !== false) reasons.push("base-red");

  if (!isSha(headSha) || checksHeadSha !== headSha) reasons.push("checks-head-mismatch");
  for (const [gate] of GATES) {
    if (checks[gate] !== "success") reasons.push(`${gate} has no successful current check`);
  }

  const labelNames = new Set(labels.map((label) => label.toLowerCase()));
  if (labelNames.has(QUEUE_LABEL)) reasons.push("already-labeled");
  if (config.blockLabels.some((label) => labelNames.has(label.toLowerCase()))) {
    reasons.push("blocking-label");
  }
  return { apply: reasons.length === 0, reasons };
}

function gh(operation, args, env) {
  try {
    return execFileSync("gh", args, {
      env,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 32 * 1024 * 1024,
    });
  } catch {
    throw new AutolandError(`GitHub CLI failed to ${operation}.`);
  }
}

function pullFields(pr) {
  return {
    state: pr.state?.toUpperCase(),
    isDraft: pr.draft,
    headBranch: pr.head?.ref,
    headRepository: pr.head?.repo?.full_name,
    baseBranch: pr.base?.ref,
    author: pr.user?.login,
    labels: pr.labels.map(({ name }) => name),
    headSha: pr.head?.sha,
  };
}

function report(number, decision, outcome = "") {
  const target = number ? `PR #${number}` : HEAD_BRANCH;
  console.log(`${target} apply=${decision.apply} ${decision.reasons.join(", ") || "eligible"}`);
  if (outcome) console.log(outcome);
  return 0;
}

function main() {
  const { values } = parseArgs({
    options: { "dry-run": { type: "boolean" }, pr: { type: "string" } },
  });
  if (values.pr !== undefined && !/^[1-9]\d*$/.test(values.pr)) {
    throw new AutolandError("The --pr argument must be a positive pull request number.");
  }

  const repo = `repos/${REPOSITORY}`;
  // Workflow reads use the read-only token. The approver token is scoped to the label write.
  const readEnv = process.env.DERIVED_REFRESH_READ_TOKEN
    ? { ...process.env, GH_TOKEN: process.env.DERIVED_REFRESH_READ_TOKEN }
    : process.env;
  const api = (operation, endpoint, ...args) =>
    gh(operation, ["api", `${repo}/${endpoint}`, ...args], readEnv);
  const read = (operation, endpoint) => JSON.parse(api(operation, endpoint));
  const pages = (operation, endpoint) =>
    JSON.parse(api(operation, endpoint, "--paginate", "--slurp"));

  const config = loadConfig();
  if (config.label !== QUEUE_LABEL) throw new AutolandError("The queue label has changed.");
  const number =
    values.pr ??
    pages("list robot pull requests", `pulls?state=open&head=cheaper-inference%3A${HEAD_BRANCH}`)
      .flat()
      .find((pr) => pr.head?.repo?.full_name?.toLowerCase() === REPOSITORY.toLowerCase())?.number;
  if (!number) return report(null, { apply: false, reasons: ["no-open-robot-pr"] });

  const pr = read("read the pull request", `pulls/${number}`);
  const entries = pages("list the pull request files", `pulls/${number}/files?per_page=100`).flat();
  if (entries.length !== pr.changed_files) {
    return report(number, { apply: false, reasons: ["incomplete-file-list"] });
  }
  const files = entries.flatMap(({ filename, previous_filename }) =>
    previous_filename ? [filename, previous_filename] : [filename]
  );

  const branches = api(
    "list release branches",
    "branches?per_page=100",
    "--paginate",
    "--jq",
    ".[].name"
  );
  const latestRelease = branches
    .split("\n")
    .filter((branch) => RELEASE_BRANCH.test(branch))
    .sort(new Intl.Collator("en", { numeric: true }).compare)
    .at(-1);

  const issues = api(
    "list open issues",
    "issues?state=open&per_page=100",
    "--paginate",
    "--jq",
    '.[] | select(has("pull_request") | not) | {title, labels: [.labels[].name]} | @json'
  )
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));

  const fields = pullFields(pr);
  const checks = {};
  if (isSha(fields.headSha) && fields.headBranch === HEAD_BRANCH) {
    const query = new URLSearchParams({
      branch: HEAD_BRANCH,
      event: "pull_request",
      head_sha: fields.headSha,
      per_page: "100",
    });
    for (const [gate, workflow] of GATES) {
      const newest = pages("list gate workflow runs", `actions/workflows/${workflow}/runs?${query}`)
        .flatMap((page) => page.workflow_runs)
        .filter((run) => run.head_sha === fields.headSha)
        .sort((a, b) => b.id - a.id)[0];
      if (!newest) continue;
      const jobs = pages(
        "list gate jobs",
        `actions/runs/${newest.id}/attempts/${newest.run_attempt}/jobs?per_page=100`
      ).flatMap((page) => page.jobs);
      const matching = jobs.filter((job) => job.name === gate);
      if (matching.length === 1 && matching[0].status === "completed") {
        checks[gate] = matching[0].conclusion;
      }
    }
  }

  const input = {
    ...fields,
    repository: REPOSITORY,
    latestRelease,
    files,
    checksHeadSha: fields.headSha,
    checks,
    releaseFreezeOpen: issues.some((issue) => issue.labels.includes("release-freeze")),
    baseRedOpen: issues.some(
      (issue) => issue.title === `🔴 Release branch not green: ${fields.baseBranch}`
    ),
    config,
    families: loadFamilies(),
  };
  const decision = decideAutoland(input);
  if (!decision.apply) return report(number, decision);
  if (values["dry-run"] || process.env.DERIVED_REFRESH_AUTOLAND !== "true") {
    return report(number, decision, "Dry run. No label applied.");
  }

  const actor = JSON.parse(gh("verify the label token identity", ["api", "user"], process.env));
  if (!isApprover(config, actor.login)) {
    return report(number, { apply: false, reasons: ["label-token-is-not-an-approver"] });
  }
  const current = read("verify the current pull request head", `pulls/${number}`);
  if (current.head?.sha !== fields.headSha) {
    return report(number, { apply: false, reasons: ["head-changed"] });
  }
  if (current.base?.sha !== pr.base?.sha || current.changed_files !== pr.changed_files) {
    return report(number, { apply: false, reasons: ["diff-changed"] });
  }
  const final = decideAutoland({ ...input, ...pullFields(current) });
  if (!final.apply) return report(number, final);

  gh(
    "apply the queue label",
    ["pr", "edit", String(number), "--repo", REPOSITORY, "--add-label", QUEUE_LABEL],
    process.env
  );
  return report(number, final, "Applied the omni-queue label.");
}

if (isMainModule(import.meta.url)) {
  try {
    process.exitCode = main();
  } catch (error) {
    const message =
      error instanceof AutolandError
        ? error.message
        : "Could not read the configuration, arguments or GitHub response.";
    console.error(`Derived refresh autoland failed. ${message}`);
    process.exitCode = 2;
  }
}
