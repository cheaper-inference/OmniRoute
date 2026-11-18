#!/usr/bin/env node
// Local checks for the post-merge mirror writer. Translation and drift policy stay with
// their existing producers; this consumer binds their evidence to the published bytes.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstatSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { pathToFileURL } from "node:url";
import { blockingDrift } from "./run-translation.mjs";

const MAX_BYTES = 64 * 1024 * 1024;
const SHA = /^[a-f0-9]{40}$/;
const MARKER = "<!-- omniroute:i18n-mirror-refresh:v1 -->";
const BUCKETS = ["driftedSources", "missingTargets", "driftedTargets", "staleTargets"];

function requireValue(condition, message) {
  if (!condition) throw new Error(message);
}

function object(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function relativePath(value) {
  requireValue(
    typeof value === "string" &&
      value.length > 0 &&
      value.length <= 4096 &&
      !/[\u0000-\u001f\u007f,\\]/.test(value) &&
      value.split("/").every((part) => part && part !== "." && part !== ".." && part !== ".git"),
    "unsafe repository-relative path"
  );
  return value;
}

function unit(value) {
  requireValue(object(value), "invalid translation unit");
  relativePath(value.rel);
  requireValue(
    typeof value.locale === "string" && /^[A-Za-z0-9-]{1,64}$/.test(value.locale),
    "invalid translation locale"
  );
  return `${value.rel}\0${value.locale}`;
}

function git(...args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: MAX_BYTES,
    timeout: 30000,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function readBytes(filename, optional = false) {
  let stat;
  try {
    stat = lstatSync(filename);
  } catch (error) {
    if (optional && error.code === "ENOENT") return null;
    throw error;
  }
  requireValue(stat.isFile() && !stat.isSymbolicLink(), `not a regular file: ${filename}`);
  requireValue(stat.size <= MAX_BYTES, `file exceeds ${MAX_BYTES} bytes: ${filename}`);
  const bytes = readFileSync(filename);
  requireValue(bytes.length <= MAX_BYTES, `file grew beyond the read limit: ${filename}`);
  return bytes;
}

function readJson(filename) {
  return JSON.parse(readBytes(filename).toString("utf8"));
}

function workingBytes(filename) {
  const parts = relativePath(filename).split("/");
  for (let i = 1; i < parts.length; i++) {
    try {
      const stat = lstatSync(parts.slice(0, i).join("/"));
      requireValue(stat.isDirectory() && !stat.isSymbolicLink(), "unsafe mirror parent path");
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
  return readBytes(filename, true);
}

function baseBytes(base, filename) {
  const parts = relativePath(filename).split("/");
  for (let i = 1; i < parts.length; i++) {
    const parent = parts.slice(0, i).join("/");
    const row = git("ls-tree", "-z", base, "--", parent).split("\0").filter(Boolean);
    if (!row.length) return null;
    requireValue(
      row.length === 1 && row[0].startsWith("040000 tree ") && row[0].endsWith(`\t${parent}`),
      `unsafe base mirror parent: ${parent}`
    );
  }
  const listing = git("ls-tree", "-z", base, "--", filename).split("\0").filter(Boolean);
  if (listing.length === 0) return null;
  requireValue(listing.length === 1, "ambiguous base preimage");
  const entry = listing[0].match(/^(100644|100755) blob ([a-f0-9]{40})\t(.*)$/s);
  requireValue(entry && entry[3] === filename, `unsafe base preimage: ${filename}`);
  return execFileSync("git", ["cat-file", "blob", entry[2]], {
    maxBuffer: MAX_BYTES,
    timeout: 30000,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function baseSha() {
  const value = process.env.BASE_SHA;
  requireValue(SHA.test(value ?? ""), "missing or invalid selected base SHA");
  return value;
}

export function assertSelectedHead() {
  requireValue(
    git("rev-parse", "HEAD").trim() === baseSha(),
    "checkout differs from selected base"
  );
}

export function validateReport(report) {
  requireValue(object(report) && typeof report.ok === "boolean", "incomplete drift report");
  for (const count of ["checkedSources", "checkedTargets"]) {
    requireValue(
      Number.isSafeInteger(report[count]) && report[count] >= 0,
      "missing drift coverage"
    );
  }
  for (const bucket of BUCKETS) {
    requireValue(Array.isArray(report[bucket]), `missing drift bucket: ${bucket}`);
    const seen = new Set();
    for (const item of report[bucket]) {
      requireValue(object(item), "invalid drift item");
      const key = bucket === "driftedSources" ? relativePath(item.rel) : unit(item);
      requireValue(!seen.has(key), "duplicate drift item");
      seen.add(key);
    }
  }
  // The writer requests the full report, without --base-report. Stale targets remain
  // advisory, exactly as in the current producer; they are still refresh work items.
  requireValue(
    report.ok === BUCKETS.slice(0, 3).every((bucket) => report[bucket].length === 0),
    "inconsistent full drift verdict"
  );
  return report;
}

function translationSummary() {
  const filename = resolve(process.env.RUNNER_TEMP, "translate-failures.json");
  const bytes = readBytes(filename, true);
  const fingerprint = bytes ? createHash("sha256").update(bytes).digest("hex") : "absent";
  if (process.env.TRANSLATION_SHA) {
    requireValue(
      fingerprint === process.env.TRANSLATION_SHA,
      "translation summary changed after checks"
    );
  }
  if (!bytes) {
    requireValue(process.env.PARTIAL !== "true", "partial translation summary is missing");
    return { failures: [], translatedUnits: [], fingerprint };
  }
  const summary = JSON.parse(bytes.toString("utf8"));
  requireValue(object(summary), "invalid translation summary");
  for (const field of ["considered", "translated", "skipped", "failed"]) {
    requireValue(
      Number.isSafeInteger(summary[field]) && summary[field] >= 0,
      "invalid translation count"
    );
  }
  requireValue(
    summary.considered === summary.translated + summary.skipped + summary.failed,
    "translation counts do not cover considered units"
  );
  requireValue(
    Array.isArray(summary.failures) && Array.isArray(summary.translatedUnits),
    "missing translation units"
  );
  requireValue(summary.failures.length === summary.failed, "failure count does not match units");
  requireValue(
    summary.translatedUnits.length === summary.translated,
    "translated count does not match units"
  );
  const seen = new Set();
  for (const item of [...summary.failures, ...summary.translatedUnits]) {
    const key = unit(item);
    requireValue(!seen.has(key), "duplicate or contradictory translation unit");
    seen.add(key);
  }
  requireValue(
    process.env.PARTIAL === "true"
      ? summary.failed > 0 && summary.translated > 0
      : summary.failed === 0,
    "translation result does not match partial status"
  );
  return { ...summary, fingerprint };
}

function localeRecord(state, rel, locale) {
  requireValue(object(state) && object(state.sources), "incomplete translation state");
  if (!Object.hasOwn(state.sources, rel)) return undefined;
  const source = state.sources[rel];
  requireValue(object(source) && object(source.locales), "invalid translation source record");
  return Object.hasOwn(source.locales, locale) ? source.locales[locale] : undefined;
}

export function assertFailedPreimages(summary = translationSummary()) {
  if (summary.failures.length === 0) return;
  const before = baseBytes(baseSha(), ".i18n-state.json");
  requireValue(before !== null, "base translation state is missing");
  const baseState = JSON.parse(before.toString("utf8"));
  const currentState = readJson(".i18n-state.json");
  for (const failed of summary.failures) {
    const filename = `docs/i18n/${failed.locale}/${failed.rel}`;
    const oldMirror = baseBytes(baseSha(), filename);
    const mirror = workingBytes(filename);
    requireValue(
      oldMirror === null ? mirror === null : mirror !== null && oldMirror.equals(mirror),
      `failed mirror differs from selected base: ${filename}`
    );
    requireValue(
      isDeepStrictEqual(
        localeRecord(baseState, failed.rel, failed.locale),
        localeRecord(currentState, failed.rel, failed.locale)
      ),
      `failed locale record differs from selected base: ${failed.rel} [${failed.locale}]`
    );
  }
}

export function checkRefreshedReport(filename) {
  const report = validateReport(readJson(filename));
  const summary = translationSummary();
  assertFailedPreimages(summary);
  const blocking = blockingDrift(report, summary.failures, summary.translatedUnits);
  requireValue(
    blocking.length === 0,
    `blocking drift remains: ${blocking.map((item) => `${item.kind}: ${item.rel} ${item.locale ?? ""}`).join(", ")}`
  );
}

function changedPaths(...args) {
  return git("diff", "--no-renames", "--name-only", "-z", ...args)
    .split("\0")
    .filter(Boolean);
}

function assertScope(paths) {
  for (const filename of paths) {
    relativePath(filename);
    requireValue(
      filename === ".i18n-state.json" || filename.startsWith("docs/i18n/"),
      `outside mirror writer scope: ${filename}`
    );
    // A symlink (including a parent symlink) is not an acceptable mirror output.
    workingBytes(filename);
  }
}

export function assertCandidate(index = false) {
  if (index) {
    assertSelectedHead();
    assertScope(changedPaths("--cached"));
    requireValue(changedPaths().length === 0, "unstaged changes remain before commit");
  } else {
    const candidate = process.env.CANDIDATE_SHA;
    requireValue(SHA.test(candidate ?? ""), "missing final candidate SHA");
    requireValue(git("rev-parse", "HEAD").trim() === candidate, "candidate HEAD changed");
    const parents = git("rev-list", "--parents", "-n", "1", candidate).trim().split(" ");
    requireValue(
      parents.length === 2 && parents[1] === baseSha(),
      "candidate is not one commit on selected base"
    );
    requireValue(
      git("status", "--porcelain=v1", "--untracked-files=normal").trim() === "",
      "candidate worktree is not clean"
    );
    assertScope(changedPaths(baseSha(), candidate));
  }
  assertFailedPreimages();
}

export function assertUnfrozen(filename, base) {
  const pages = readJson(filename);
  requireValue(Array.isArray(pages) && pages.every(Array.isArray), "incomplete freeze pages");
  const issues = pages.flat();
  requireValue(issues.length <= 10000, "freeze index exceeds the explicit issue limit");
  const version = base.replace(/^release\//, "");
  for (const issue of issues) {
    requireValue(
      object(issue) && Number.isSafeInteger(issue.number) && typeof issue.title === "string",
      "invalid freeze issue"
    );
    if (issue.pull_request) continue;
    const versions = issue.title.match(/v\d+\.\d+\.\d+/g) ?? [];
    requireValue(
      versions.length > 0 && !versions.includes(version),
      `selected base is frozen by #${issue.number}`
    );
  }
}

function remoteHead(branch) {
  requireValue(typeof branch === "string" && /^[A-Za-z0-9._/-]+$/.test(branch), "invalid branch");
  const ref = `refs/heads/${branch}`;
  const rows = git("ls-remote", "--heads", "origin", ref).trim().split("\n").filter(Boolean);
  requireValue(rows.length <= 1, "ambiguous remote branch");
  if (!rows.length) return "";
  const [sha, actualRef] = rows[0].split("\t");
  requireValue(SHA.test(sha) && actualRef === ref, "invalid remote branch identity");
  return sha;
}

export function assertRemoteIdentity() {
  requireValue(remoteHead(process.env.BASE) === baseSha(), "selected remote base moved");
  const expected = process.env.REFRESH_SHA ?? "";
  requireValue(expected === "" || SHA.test(expected), "invalid initial refresh SHA");
  requireValue(
    remoteHead(process.env.REFRESH_BRANCH) === expected,
    "refresh branch moved since selection"
  );
}

function validateOwnedPr(pr, sha) {
  requireValue(
    object(pr) && Number.isSafeInteger(pr.number) && pr.number > 0,
    "invalid refresh PR"
  );
  requireValue(pr.state === "OPEN" && typeof pr.isDraft === "boolean", "refresh PR is not open");
  requireValue(
    pr.headRefName === process.env.REFRESH_BRANCH && pr.headRefOid === sha,
    "refresh PR head mismatch"
  );
  requireValue(
    pr.isCrossRepository === false &&
      pr.headRepository?.nameWithOwner?.toLowerCase() === process.env.REPO?.toLowerCase(),
    "refresh PR repository mismatch"
  );
  requireValue(
    typeof pr.baseRefName === "string" && /^[A-Za-z0-9._/-]+$/.test(pr.baseRefName),
    "invalid PR base"
  );
  requireValue(
    typeof pr.body === "string" && pr.body.split(MARKER).length === 2,
    "missing exclusive writer marker"
  );
  const receipts = [...pr.body.matchAll(/^- Candidate: `([a-f0-9]{40})`\r?$/gm)];
  requireValue(
    receipts.length === 1 && receipts[0][1] === sha,
    "head differs from last writer-published candidate"
  );
  return pr;
}

export function ownedPullRequest(filename) {
  const prs = readJson(filename);
  // gh pr list paginates up to 101; reaching that cap is not proof of completeness.
  requireValue(Array.isArray(prs) && prs.length < 101, "incomplete PR index");
  const expected = process.env.REFRESH_SHA ?? "";
  if (expected === "") {
    requireValue(prs.length === 0, "PR exists without its selected branch");
    return `0\ttrue\t${process.env.BASE}`;
  }
  requireValue(prs.length === 1, "existing refresh branch has no unambiguous owner");
  const pr = validateOwnedPr(prs[0], expected);
  return `${pr.number}\t${pr.isDraft}\t${pr.baseRefName}`;
}

function reviewState(filename, published = false) {
  const pr = validateOwnedPr(
    readJson(filename),
    published ? process.env.CANDIDATE_SHA : process.env.REFRESH_SHA
  );
  requireValue(pr.isDraft, "refresh PR did not return to draft");
  if (published)
    requireValue(pr.baseRefName === process.env.BASE, "refresh PR retarget did not apply");
}

export function reviewBody() {
  assertCandidate();
  const paths = changedPaths(baseSha(), process.env.CANDIDATE_SHA);
  const protectedPaths = paths.filter((filename) =>
    /(?:^|\/)(?:AGENTS\.md|CLAUDE\.md|GEMINI\.md|SKILL\.md|llm\.txt)$/.test(filename)
  );
  const summary = translationSummary();
  const quote = (value) => String(value ?? "").replace(/[\r\n`]/g, " ");
  const lines = [
    MARKER,
    "Automatic post-merge mirror refresh, proposed for review.",
    "",
    `- Target: \`${quote(process.env.BASE)}\``,
    `- Base SHA: \`${baseSha()}\``,
    `- Candidate: \`${process.env.CANDIDATE_SHA}\``,
    `- Engine: \`${quote(process.env.ENGINE || "none")}\``,
    `- Run: ${quote(process.env.RUN_URL)}`,
    `- Mirror files changed: ${paths.filter((filename) => filename.startsWith("docs/i18n/")).length}`,
    `- protected_surface: ${protectedPaths.length > 0}`,
    "",
    "The exact committed candidate passed check:docs-all in pr mode and the mirror drift check after normal Git hooks. Hosted CI and release acceptance remain separate requirements.",
  ];
  if (summary.failures.length) {
    lines.push(
      "",
      "Partial translation: these failed units retain their base mirror bytes and locale records:",
      ""
    );
    for (const failure of summary.failures) {
      lines.push(
        `- \`${quote(failure.rel)}\` [${quote(failure.locale)}]: ${quote(failure.error).slice(0, 200)}`
      );
    }
  }
  if (protectedPaths.length) {
    lines.push(
      "",
      "Protected instruction mirrors require explicit operator approval before merge:",
      ""
    );
    for (const filename of protectedPaths) lines.push(`- \`${quote(filename)}\``);
  }
  lines.push(
    "",
    "This draft uses a lease against the observed writer-owned branch. A later manual commit prevents automatic replacement.",
    "PRs opened with GITHUB_TOKEN do not trigger other workflows; configure I18N_REFRESH_TOKEN when hosted CI must run."
  );
  return `${lines.join("\n")}\n`;
}

function main([action, filename, argument]) {
  if (action === "head") assertSelectedHead();
  else if (action === "sources") {
    assertSelectedHead();
    const report = validateReport(readJson(filename));
    process.stdout.write(
      [...new Set(BUCKETS.flatMap((key) => report[key].map((item) => item.rel)))].sort().join(",")
    );
  } else if (action === "check") checkRefreshedReport(filename);
  else if (action === "summary-sha") process.stdout.write(translationSummary().fingerprint);
  else if (action === "index") assertCandidate(true);
  else if (action === "candidate") assertCandidate();
  else if (action === "freeze") assertUnfrozen(filename, argument);
  else if (action === "remote") assertRemoteIdentity();
  else if (action === "owner") process.stdout.write(ownedPullRequest(filename));
  else if (action === "draft") reviewState(filename);
  else if (action === "published") reviewState(filename, true);
  else if (action === "body") process.stdout.write(reviewBody());
  else throw new Error("unknown mirror refresh safety action");
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(`[mirror-refresh] ${error.message}`);
    process.exitCode = 1;
  }
}
