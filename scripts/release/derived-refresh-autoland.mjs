#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { parseArgs } from "node:util";

import { categoryOf, loadFamilies } from "../check/check-pr-derived-paths.mjs";
import { isMainModule } from "../lib/is-main-module.mjs";
import { isManagedBase, loadConfig } from "../merge-queue/config.mjs";
import { isProtectedPath, isSha } from "../merge-queue/contracts.mjs";

const REPOSITORY = "cheaper-inference/OmniRoute";
const HEAD_BRANCH = "chore/derived-refresh";
export const BOT_EMAIL = "41898282+github-actions[bot]@users.noreply.github.com";
const RELEASE_BRANCH = /^release\/v\d+\.\d+\.\d+$/;
const QUEUE_LABEL = "omni-queue";
const DIGITS_ONLY_FILES = ["README.md"];
const GATES = [
  ["Gate / CI", "ci.yml"],
  ["Gate / Quality", "quality.yml"],
];

class AutolandError extends Error {}

function isApprover(config, login) {
  return config.approvers.some((approver) => approver.toLowerCase() === login?.toLowerCase());
}

// Fail closed above the same bound used by the span patterns.
const MAX_README_LINE_LENGTH = 4096;
const MAX_README_BYTES = 2 * 1024 * 1024;
const FROZEN_SPAN_START = new RegExp(
  [
    /(?<![\w:-])(?<attribute>href|src|srcset)[ \t]{0,4096}=[ \t]{0,4096}(?:"(?<double>[^"]{0,4096})"|'(?<single>[^']{0,4096})'|(?<bare>[^\s"'`<>]{1,4096}))/,
    /(?<escape>\\[\\`\]])/,
    /(?<markdown>\]\([ \t]{0,4096})/,
    /(?<htmlCode><code(?:[ \t][^<>]{0,4096})?>)/,
    /(?<ticks>`{1,4096})/,
    /https?:\/\/[^\s<>"'`]{1,4096}/,
    /(?<![A-Za-z0-9])v?[0-9]{1,4096}\.[0-9]{1,4096}\.[0-9]{1,4096}(?:-[A-Za-z0-9.-]{1,4096})?/,
  ]
    .map((pattern) => pattern.source)
    .join("|"),
  "gi"
);

function markdownDestination(line, start) {
  const bracketed = line[start] === "<";
  const targetStart = start + Number(bracketed);
  let depth = 0;
  for (let end = targetStart; end < line.length; end++) {
    const character = line[end];
    if (character === "\\") {
      end++;
    } else if (bracketed) {
      if (character === ">") return { target: line.slice(targetStart, end), end: end + 1 };
    } else {
      if (depth === 0 && (character === ")" || character === " " || character === "\t")) {
        return { target: line.slice(targetStart, end), end };
      }
      if (character === "(") depth++;
      if (character === ")") depth--;
    }
  }
  // A destination can span lines. Freeze the remainder when this line has no terminator.
  return { target: null, end: line.length };
}

function htmlCodeEnd(line, start) {
  const tags = /<(\/)?code(?:[ \t][^<>]{0,4096})?>/gi;
  tags.lastIndex = start;
  let depth = 1;
  for (let tag = tags.exec(line); tag; tag = tags.exec(line)) {
    depth += tag[1] ? -1 : 1;
    if (depth === 0) return tags.lastIndex;
  }
  return line.length;
}

function inlineCodeEnd(line, start, ticks) {
  const runs = /`{1,4096}/g;
  runs.lastIndex = start;
  for (let run = runs.exec(line); run; run = runs.exec(line)) {
    if (run[0] === ticks) return runs.lastIndex;
  }
  return start;
}

export function frozenReadmeSpans(line) {
  const spans = [];
  const tokenSegments = [];
  let tokenStart = 0;
  const starts = new RegExp(FROZEN_SPAN_START);
  for (let match = starts.exec(line); match; match = starts.exec(line)) {
    const { attribute, double, single, bare, escape, markdown, htmlCode, ticks } = match.groups;
    if (escape) continue;
    let sameDocumentAnchor = false;
    if (attribute) {
      const target = double ?? single ?? bare;
      const sourceSet = attribute.toLowerCase() === "srcset" && /[\s,]/.test(target);
      sameDocumentAnchor = target.startsWith("#") && !sourceSet;
    } else if (markdown) {
      const { target, end } = markdownDestination(line, starts.lastIndex);
      starts.lastIndex = end;
      sameDocumentAnchor = target?.startsWith("#");
    } else if (htmlCode) {
      starts.lastIndex = htmlCodeEnd(line, starts.lastIndex);
    } else if (ticks) {
      const end = inlineCodeEnd(line, starts.lastIndex, ticks);
      if (end === starts.lastIndex) continue;
      starts.lastIndex = end;
    }
    if (sameDocumentAnchor) {
      tokenSegments.push(line.slice(tokenStart, match.index));
      tokenStart = starts.lastIndex;
    } else {
      spans.push(line.slice(match.index, starts.lastIndex));
    }
  }

  // Scan tokens separately so a connector cannot hide a URL or version from the span scan.
  tokenSegments.push(line.slice(tokenStart));
  const tokens = /[A-Za-z0-9][A-Za-z0-9._:/+=-]{14,4094}[A-Za-z0-9]/g;
  for (const [token] of tokenSegments.join(" ").matchAll(tokens)) {
    if (/[A-Za-z]/.test(token) && /[0-9]/.test(token)) spans.push(token);
  }
  return spans;
}

export function frozenReadmeLines(readme) {
  const lines = readme.split(/\r?\n/);
  if (lines.at(-1) === "") lines.pop();

  const frozen = new Set();
  let open = null;
  for (const [index, line] of lines.entries()) {
    const fence = /^( {0,3})(`{3}|~{3})/.exec(line);
    if (open || fence) frozen.add(index + 1);
    if (!fence) continue;

    const [, indent, run] = fence;
    const marker = run[0];
    let end = indent.length + run.length;
    while (line[end] === marker) end++;
    const length = end - indent.length;
    if (!open) {
      open = { marker, length };
    } else if (marker === open.marker && length >= open.length && !/[^ \t]/.test(line.slice(end))) {
      open = null;
    }
  }
  return frozen;
}

export function isReadmeDigitEdit(before, after) {
  if (before.length > MAX_README_LINE_LENGTH || after.length > MAX_README_LINE_LENGTH) return false;
  // Keep the literal text chunks separate so a marker in the file cannot stand in for digits.
  const digits = /[0-9]{1,4096}/;
  if (JSON.stringify(before.split(digits)) !== JSON.stringify(after.split(digits))) return false;
  const oldSpans = frozenReadmeSpans(before);
  const newSpans = frozenReadmeSpans(after);
  return (
    oldSpans.length === newSpans.length && oldSpans.every((span, index) => span === newSpans[index])
  );
}

/** @param {Set<number>} [frozenLines] */
export function isDigitsOnlyPatch(patch, evidence, frozenLines) {
  const { status, additions, deletions } = evidence ?? {};
  if (!(frozenLines instanceof Set)) return false;
  if (status !== "modified" || additions !== deletions || !Number.isSafeInteger(additions)) {
    return false;
  }
  if (additions < 1 || typeof patch !== "string" || !patch) return false;

  let oldRemaining = 0;
  let newRemaining = 0;
  let oldLine = 0;
  let addedLines = 0;
  let inHunk = false;
  let changed = false;
  let removed = [];
  let matched = 0;
  const lines = patch.split("\n");
  if (lines.at(-1) === "") lines.pop();

  for (const line of lines) {
    if (line === "\\ No newline at end of file") return false;

    const kind = line[0];
    if (kind !== "+" && (kind !== "-" || matched > 0)) {
      if (removed.length !== matched) return false;
      removed = [];
      matched = 0;
    }

    if (kind === "@") {
      if (oldRemaining !== 0 || newRemaining !== 0) return false;
      const hunk =
        /^@@ -([0-9]{1,16})(?:,([0-9]{1,16}))? \+([0-9]{1,16})(?:,([0-9]{1,16}))? @@(?: |$)/.exec(
          line
        );
      if (!hunk) return false;
      oldLine = Number(hunk[1]);
      if (!Number.isSafeInteger(oldLine) || oldLine < 1 || oldLine !== Number(hunk[3]))
        return false;
      oldRemaining = Number(hunk[2] ?? 1);
      newRemaining = Number(hunk[4] ?? 1);
      inHunk = true;
    } else if (!inHunk) {
      return false;
    } else if (kind === "+") {
      const before = removed[matched];
      if (before === undefined || !isReadmeDigitEdit(before, line.slice(1))) return false;
      changed ||= before !== line.slice(1);
      matched++;
      addedLines++;
      newRemaining--;
    } else if (kind === "-") {
      if (frozenLines.has(oldLine)) return false;
      removed.push(line.slice(1));
      oldLine++;
      oldRemaining--;
    } else if (kind === " ") {
      oldLine++;
      oldRemaining--;
      newRemaining--;
    } else {
      return false;
    }
    if (oldRemaining < 0 || newRemaining < 0 || addedLines > additions) return false;
  }

  return (
    changed &&
    addedLines === additions &&
    removed.length === matched &&
    oldRemaining === 0 &&
    newRemaining === 0
  );
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
  digitsOnlyFiles = [],
  headSha,
  prCommitCount,
  comparison,
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

  const commits = comparison?.commits;
  const commit = Array.isArray(commits) && commits.length === 1 ? commits[0] : undefined;
  const mergeBaseSha = comparison?.merge_base_commit?.sha;
  if (!commit || comparison.ahead_by !== 1 || commit.sha !== headSha || prCommitCount !== 1) {
    reasons.push("not-single-commit");
  } else if (
    typeof mergeBaseSha !== "string" ||
    !isSha(mergeBaseSha) ||
    !Array.isArray(commit.parents) ||
    commit.parents.length !== 1 ||
    commit.parents[0]?.sha !== mergeBaseSha
  ) {
    reasons.push("commit-not-on-base");
  } else if (
    commit.commit?.author?.email !== BOT_EMAIL ||
    commit.commit?.committer?.email !== BOT_EMAIL
  ) {
    reasons.push("non-robot-commit");
  }

  if (!files.length) reasons.push("empty-diff");
  if (files.some((file) => DIGITS_ONLY_FILES.includes(file) && !digitsOnlyFiles.includes(file))) {
    reasons.push("readme-not-digits-only");
  }
  if (
    files.some(
      (file) =>
        !DIGITS_ONLY_FILES.includes(file) &&
        !families.some((family) => categoryOf(file, family) !== null)
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

function gh(operation, args, env, encoding = "utf8") {
  try {
    return execFileSync("gh", args, {
      env,
      encoding,
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 32 * 1024 * 1024,
    });
  } catch {
    throw new AutolandError(`GitHub CLI failed to ${operation}.`);
  }
}

function readReadmeAt(read, raw, sha) {
  const endpoint = `contents/README.md?ref=${sha}`;
  let contents;
  try {
    contents = read(
      "read the base README",
      endpoint,
      "--header",
      "Accept: application/vnd.github.object+json"
    );
  } catch {
    return { reason: "base-readme-unavailable" };
  }
  if (contents?.type !== "file" || !Number.isSafeInteger(contents.size) || contents.size < 0) {
    return { reason: "base-readme-unavailable" };
  }
  if (contents.size > MAX_README_BYTES) return { reason: "base-readme-too-large" };
  if (contents.truncated) return { reason: "base-readme-incomplete" };
  if (contents.size === 0) return { reason: "base-readme-empty" };

  let bytes;
  if (contents.encoding === "base64" && typeof contents.content === "string") {
    const encoded = contents.content.replace(/[\r\n]/g, "");
    bytes = Buffer.from(encoded, "base64");
    if (bytes.toString("base64") !== encoded) return { reason: "base-readme-incomplete" };
  } else if (contents.encoding === "none") {
    // The Contents API provides metadata without base64 for larger files.
    try {
      bytes = raw("read the raw base README", endpoint);
    } catch {
      return { reason: "base-readme-unavailable" };
    }
  }
  if (bytes?.length !== contents.size) return { reason: "base-readme-incomplete" };
  try {
    const text = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes);
    return text.trim() ? { text } : { reason: "base-readme-empty" };
  } catch {
    return { reason: "base-readme-incomplete" };
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
    prCommitCount: pr.commits,
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
  const read = (operation, endpoint, ...args) => JSON.parse(api(operation, endpoint, ...args));
  const raw = (operation, endpoint) =>
    gh(
      operation,
      ["api", `${repo}/${endpoint}`, "--header", "Accept: application/vnd.github.raw+json"],
      readEnv,
      "buffer"
    );
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
  const readme = entries.find(
    (entry) =>
      DIGITS_ONLY_FILES.includes(entry.filename) &&
      !entry.previous_filename &&
      entry.status === "modified"
  );
  const baseSha = pr.base?.sha;
  const headSha = pr.head?.sha;
  const hasBaseSha = typeof baseSha === "string" && isSha(baseSha);
  if (readme && !hasBaseSha) {
    return report(number, { apply: false, reasons: ["base-readme-unavailable"] });
  }
  let comparison;
  if (hasBaseSha && typeof headSha === "string" && isSha(headSha)) {
    try {
      // Two entries are enough to detect a non-singleton list, even on a paginated response.
      comparison = read(
        "compare the base and head commits",
        `compare/${baseSha}...${headSha}?per_page=2`
      );
    } catch {
      // Without a comparison neither the commit shape nor the README merge base can be verified.
    }
  }
  if (!comparison || typeof comparison !== "object" || Array.isArray(comparison)) {
    const reason = files.some((file) => DIGITS_ONLY_FILES.includes(file))
      ? "readme-diff-base-unavailable"
      : "commit-shape-unavailable";
    return report(number, { apply: false, reasons: [reason] });
  }

  const digitsOnlyFiles = [];
  if (readme) {
    const base = readReadmeAt(read, raw, baseSha);
    if (base.reason) return report(number, { apply: false, reasons: [base.reason] });
    if (isDigitsOnlyPatch(readme.patch, readme, frozenReadmeLines(base.text))) {
      // PR hunks are relative to the merge base. Verify they address the same README on both bases.
      const mergeBaseSha = comparison.merge_base_commit?.sha;
      if (typeof mergeBaseSha !== "string" || !isSha(mergeBaseSha)) {
        return report(number, { apply: false, reasons: ["readme-diff-base-unavailable"] });
      }
      if (mergeBaseSha !== baseSha) {
        const ancestor = readReadmeAt(read, raw, mergeBaseSha);
        if (ancestor.reason || ancestor.text !== base.text) {
          return report(number, { apply: false, reasons: ["readme-diff-base-mismatch"] });
        }
      }
      digitsOnlyFiles.push(readme.filename);
    }
  }

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
    digitsOnlyFiles,
    comparison,
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
  // The label approves whatever head the pull request has now. Withdraw it unless that head is the
  // examined one, including when the pull request cannot be read back.
  const removeLabel = () => {
    try {
      gh(
        "remove the queue label",
        ["pr", "edit", String(number), "--repo", REPOSITORY, "--remove-label", QUEUE_LABEL],
        process.env
      );
    } catch {
      throw new AutolandError(
        `The omni-queue label may remain on an unexamined head for PR #${number}.`
      );
    }
  };
  let labeled;
  try {
    labeled = read("verify the pull request after labeling", `pulls/${number}`);
  } catch {
    // Handled below as an unreadable pull request.
  }
  if (
    typeof labeled?.head?.sha !== "string" ||
    !isSha(labeled.head.sha) ||
    !["open", "closed"].includes(labeled.state) ||
    typeof labeled.base?.ref !== "string" ||
    !labeled.base.ref
  ) {
    removeLabel();
    throw new AutolandError(
      `Could not verify PR #${number} after labeling. Removed the omni-queue label.`
    );
  }
  if (
    labeled.head.sha !== fields.headSha ||
    labeled.state !== "open" ||
    labeled.base.ref !== fields.baseBranch
  ) {
    removeLabel();
    return report(
      number,
      { apply: false, reasons: ["head-changed-after-label"] },
      `::warning::Removed the omni-queue label from PR #${number}. ` +
        "The head or base branch changed, or the PR closed after labeling."
    );
  }
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
