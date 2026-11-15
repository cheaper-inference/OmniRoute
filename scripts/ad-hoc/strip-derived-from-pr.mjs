#!/usr/bin/env node
// scripts/ad-hoc/strip-derived-from-pr.mjs — plan 2026-11-13 (derived numbers resolved only at
// release), section 8: the one-time pass over the PRs opened before phases 1 and 2.
//
// Those PRs still write values the release refresh now owns (provider/migration counts in docs,
// the 66 llm.txt mirrors, the Stryker test list, the package description, counts in the
// agent-instruction files). In `pr` mode the counts gate fails them. This script restores, in each
// PR, the lines it changed ONLY to update such values back to the text of the PR's merge base, so
// merging the current base brings the values the refresh maintains. The PR's own changes stay.
//
//   node scripts/ad-hoc/strip-derived-from-pr.mjs [--prs=1,2] [--out=report.json]          dry-run
//   node scripts/ad-hoc/strip-derived-from-pr.mjs --apply --prs=1,2                          apply
//
// --apply adds ONE commit on top of each PR head (built with plumbing — no checkout) and pushes it
// as a fast-forward to the PR's head branch (a fork through its maintainer-edit permission). It
// never force-pushes and never rewrites the contributor's commits: if the head moved since it was
// read, the push is refused and the PR is reported. Run it batch by batch, with the owner's go.
//
// Classification of every file a PR changed (relative to its merge base):
//   computed     stryker.conf.json — phase 0 computes tap.testFiles
//   mirror       docs/i18n/<locale>/llm.txt — exact copy of llm.txt, rebuilt by the refresh
//   snapshot     docs/reference/derived-facts.json — written only by the refresh
//     → whole file back to the merge-base version (deleted if the merge base did not have it)
//   claims       a doc a derived check covers — each managed value the PR changed goes back to the
//                merge-base value of the same claim; a structural change is left to a human
//   instruction  an agent-instruction file — lines that differ from the merge base ONLY in digits
//                go back to the merge-base line (phase 2 removed those counts)
//   description  package.json "description" back to the merge-base string
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const REPO = "cheaper-inference/OmniRoute";
const NS = "refs/derived-strip";

// --- pure planning ------------------------------------------------------------------------------

/** Kind of derived content a changed file carries, or null. */
export function classifyFile(file, { claimFiles, instructionFiles }) {
  if (file === "stryker.conf.json") return "computed";
  if (/^docs\/i18n\/[^/]+\/llm\.txt$/.test(file)) return "mirror";
  if (file === "docs/reference/derived-facts.json") return "snapshot";
  if (instructionFiles.has(file)) return "instruction";
  if (file === "package.json") return "description";
  if (claimFiles.has(file)) return "claims";
  return null;
}

/**
 * Each managed value the head changed goes back to the base value of the same claim (same check,
 * same position). A check whose claim count differs between base and head is left to a human.
 */
export function restoreClaims(base, head, checks) {
  const edits = [];
  const manual = [];
  for (const check of checks) {
    const b = check.extract(base ?? "");
    const h = check.extract(head ?? "");
    const bv = b.map((c) => String(c.value));
    const hv = h.map((c) => String(c.value));
    if (bv.join("|") === hv.join("|")) continue;
    if (bv.length !== hv.length) {
      manual.push(`${check.label}: base has ${bv.length} claim(s), the PR has ${hv.length}`);
      continue;
    }
    h.forEach((claim, i) => {
      if (hv[i] !== bv[i] && claim.start >= 0) {
        edits.push({
          label: check.label,
          from: hv[i],
          to: bv[i],
          start: claim.start,
          end: claim.end,
        });
      }
    });
  }
  let content = head ?? "";
  const seen = new Set();
  for (const e of [...edits].sort((x, y) => y.start - x.start)) {
    const key = `${e.start}:${e.end}`;
    if (seen.has(key)) continue;
    seen.add(key);
    content = content.slice(0, e.start) + e.to + content.slice(e.end);
  }
  for (const check of checks) {
    if (!edits.some((e) => e.label === check.label)) continue;
    const after = check
      .extract(content)
      .map((c) => String(c.value))
      .join("|");
    const want = check
      .extract(base ?? "")
      .map((c) => String(c.value))
      .join("|");
    if (after !== want)
      manual.push(`${check.label}: the restore did not reproduce the base values`);
  }
  return { content, edits: edits.map(({ label, from, to }) => ({ label, from, to })), manual };
}

const maskDigits = (line) => line.replace(/\d+/g, "#");

/** Line diff (LCS) → [{ type: "same"|"del"|"add", line }]. Files here are a few thousand lines. */
function diffLines(a, b) {
  const n = a.length;
  const m = b.length;
  const w = m + 1;
  const dp = new Uint32Array((n + 1) * w);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i * w + j] =
        a[i] === b[j]
          ? dp[(i + 1) * w + j + 1] + 1
          : Math.max(dp[(i + 1) * w + j], dp[i * w + j + 1]);
    }
  }
  const ops = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      ops.push({ type: "same", line: a[i] });
      i++;
      j++;
    } else if (dp[(i + 1) * w + j] >= dp[i * w + j + 1]) {
      ops.push({ type: "del", line: a[i++] });
    } else {
      ops.push({ type: "add", line: b[j++] });
    }
  }
  while (i < n) ops.push({ type: "del", line: a[i++] });
  while (j < m) ops.push({ type: "add", line: b[j++] });
  return ops;
}

/**
 * Lines the head changed only in their digits go back to the base line; every other change of
 * the head stays. Inside a replacement hunk, lines are paired by digit-masked shape, in order.
 */
export function revertDigitOnlyLines(base, head) {
  const ops = diffLines((base ?? "").split("\n"), (head ?? "").split("\n"));
  const out = [];
  const reverted = [];
  for (let k = 0; k < ops.length;) {
    if (ops[k].type === "same") {
      out.push(ops[k++].line);
      continue;
    }
    const dels = [];
    const adds = [];
    while (k < ops.length && ops[k].type !== "same") {
      (ops[k].type === "del" ? dels : adds).push(ops[k].line);
      k++;
    }
    // Pair each added line with the next unused deleted line of the same digit-masked shape, in
    // order: a hunk that also inserts or rewrites prose keeps those lines and still finds the
    // count lines around them.
    let from = 0;
    for (const line of adds) {
      let match = -1;
      for (let d = from; d < dels.length; d++) {
        if (dels[d] !== line && maskDigits(dels[d]) === maskDigits(line)) {
          match = d;
          break;
        }
      }
      if (match === -1) {
        out.push(line);
        continue;
      }
      out.push(dels[match]);
      reverted.push({ from: line, to: dels[match] });
      from = match + 1;
    }
  }
  return { content: out.join("\n"), reverted };
}

/** package.json with the base "description" value, every other byte of the head kept. */
export function restoreDescription(base, head) {
  let baseDesc;
  let headDesc;
  try {
    baseDesc = JSON.parse(base).description;
    headDesc = JSON.parse(head).description;
  } catch {
    return { content: head, changed: false, manual: ["package.json could not be parsed"] };
  }
  if (baseDesc === headDesc || typeof baseDesc !== "string" || typeof headDesc !== "string") {
    return { content: head, changed: false, manual: [] };
  }
  const needle = `"description": ${JSON.stringify(headDesc)}`;
  if (!head.includes(needle)) {
    return { content: head, changed: false, manual: ["description line not found verbatim"] };
  }
  return {
    content: head.replace(needle, `"description": ${JSON.stringify(baseDesc)}`),
    changed: true,
    manual: [],
    from: headDesc,
    to: baseDesc,
  };
}

/**
 * The restore plan of one PR. `readBase`/`readHead` return a file's text at the merge base / PR
 * head (null when absent). Returns the files to write (content null = delete) and manual notes.
 */
export function planPrRestore({ changed, readBase, readHead, ctx }) {
  const files = [];
  const manual = [];
  for (const file of changed) {
    const kind = classifyFile(file, ctx);
    if (!kind) continue;
    const base = readBase(file);
    const head = readHead(file);
    if (kind === "computed" || kind === "mirror" || kind === "snapshot") {
      if (base !== head) files.push({ file, kind, content: base });
      continue;
    }
    if (kind === "description") {
      if (head == null || base == null) continue;
      const r = restoreDescription(base, head);
      for (const m of r.manual) manual.push(`${file}: ${m}`);
      if (r.changed) files.push({ file, kind, content: r.content, from: r.from, to: r.to });
      continue;
    }
    if (head == null) continue;
    if (kind === "claims") {
      const r = restoreClaims(base, head, ctx.claimFiles.get(file) ?? []);
      for (const m of r.manual) manual.push(`${file}: ${m}`);
      if (r.content !== head) files.push({ file, kind, content: r.content, edits: r.edits });
      continue;
    }
    // instruction
    const r = revertDigitOnlyLines(base, head);
    if (r.content !== head)
      files.push({ file, kind, content: r.content, reverted: r.reverted.length });
  }
  return { files, manual };
}

/** Planning context from the gate of this tree (phases 1 and 2). */
export async function loadContext(root = ROOT) {
  const gate = await import(path.join(root, "scripts/check/check-docs-counts-sync.mjs"));
  const facts = await import(path.join(root, "scripts/release/facts.mjs"));
  const snapshot = facts.loadFactsSnapshot(root);
  if (!snapshot) throw new Error("docs/reference/derived-facts.json is missing");
  const claimFiles = new Map();
  for (const check of gate.buildChecks({ facts: snapshot })) {
    if (check.scope !== "derived" || typeof check.extract !== "function") continue;
    for (const f of check.files) (claimFiles.get(f) ?? claimFiles.set(f, []).get(f)).push(check);
  }
  return { claimFiles, instructionFiles: new Set(gate.agentInstructionFiles(root)) };
}

// --- git ----------------------------------------------------------------------------------------

function git(args, { cwd = ROOT, env, input } = {}) {
  return execFileSync("git", args, {
    cwd,
    env: env ? { ...process.env, ...env } : process.env,
    input,
    encoding: "utf8",
    stdio: [input == null ? "ignore" : "pipe", "pipe", "pipe"],
    maxBuffer: 256 << 20,
  }).trim();
}

function tryGit(args, opts) {
  try {
    return git(args, opts);
  } catch {
    return null;
  }
}

export const RESTORE_MESSAGE = [
  "chore: drop derived values the release refresh now owns",
  "",
  "Plan 2026-11-13 (derived numbers resolved only at release): feature PRs no longer write values",
  "that depend on the state of the base. This commit restores the lines this PR changed only to",
  "update such values (counts in docs, the llm.txt mirrors, the Stryker test list, the package",
  "description, counts in agent-instruction files) to the text of the PR's merge base, so merging",
  "the current base brings the values `npm run release:refresh-derived` maintains. Every other",
  "change of the PR is untouched.",
].join("\n");

/** One commit on top of `head` with `files` applied (content null = delete). Returns its sha. */
export function buildRestoreCommit({ cwd = ROOT, head, files, message = RESTORE_MESSAGE }) {
  const index = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "strip-index-")), "index");
  const env = { GIT_INDEX_FILE: index };
  try {
    git(["read-tree", head], { cwd, env });
    for (const f of files) {
      if (f.content == null) {
        git(["update-index", "--force-remove", "--", f.file], { cwd, env });
        continue;
      }
      const entry = tryGit(["ls-tree", head, "--", f.file], { cwd });
      const mode = entry ? entry.split(/\s+/)[0] : "100644";
      const blob = git(["hash-object", "-w", "--stdin"], { cwd, input: f.content });
      git(["update-index", "--add", "--cacheinfo", `${mode},${blob},${f.file}`], { cwd, env });
    }
    const tree = git(["write-tree"], { cwd, env });
    return git(["commit-tree", tree, "-p", head, "-m", message], { cwd });
  } finally {
    fs.rmSync(path.dirname(index), { recursive: true, force: true });
  }
}

// --- CLI ----------------------------------------------------------------------------------------

function ghJson(args) {
  return JSON.parse(execFileSync("gh", args, { encoding: "utf8", maxBuffer: 64 << 20 }));
}

async function main() {
  const arg = (name) =>
    process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
  const apply = process.argv.includes("--apply");
  const baseRef = arg("base") ?? "origin/release/v3.8.54";
  const wanted = arg("prs") ? new Set(arg("prs").split(",").map(Number)) : null;
  if (apply && !wanted) {
    console.error("--apply needs an explicit --prs=<list> (one batch at a time)");
    process.exit(2);
  }
  const ctx = await loadContext();
  const open = ghJson([
    "pr",
    "list",
    "--repo",
    REPO,
    "--state",
    "open",
    "--limit",
    "500",
    "--json",
    "number,baseRefName,headRefName,headRefOid,headRepository,headRepositoryOwner,isCrossRepository,maintainerCanModify,author,title",
  ]);
  const prs = open.filter(
    (p) => p.baseRefName === baseRef.replace(/^origin\//, "") && (!wanted || wanted.has(p.number))
  );
  const report = [];
  for (const pr of prs) {
    const ref = `${NS}/${pr.number}`;
    if (
      tryGit(["fetch", "-q", "--no-tags", "origin", `+refs/pull/${pr.number}/head:${ref}`]) === null
    ) {
      report.push({ pr: pr.number, error: "fetch failed" });
      continue;
    }
    const head = git(["rev-parse", ref]);
    const mb = tryGit(["merge-base", ref, baseRef]);
    if (!mb) {
      report.push({ pr: pr.number, error: "no merge base" });
      continue;
    }
    const changed = git(["diff", "--name-only", mb, ref]).split("\n").filter(Boolean);
    const plan = planPrRestore({
      changed,
      readBase: (f) => tryGit(["show", `${mb}:${f}`]),
      readHead: (f) => tryGit(["show", `${ref}:${f}`]),
      ctx,
    });
    const entry = {
      pr: pr.number,
      title: pr.title,
      author: pr.author?.login,
      fork: pr.isCrossRepository,
      maintainerCanModify: pr.maintainerCanModify,
      headRef: pr.headRefName,
      head,
      files: plan.files.map(({ content, ...rest }) => ({ ...rest, delete: content == null })),
      manual: plan.manual,
    };
    if (apply && plan.files.length) {
      if (pr.isCrossRepository && !pr.maintainerCanModify) {
        entry.applied = "skipped: the fork does not allow maintainer edits";
      } else if (head !== pr.headRefOid) {
        entry.applied = "skipped: the head moved while it was read";
      } else {
        const commit = buildRestoreCommit({ head, files: plan.files });
        const remote = pr.isCrossRepository
          ? `https://github.com/${pr.headRepositoryOwner.login}/${pr.headRepository.name}.git`
          : "origin";
        // Re-check the PR right before the push (Hard Rule 22b): still open, same head.
        const now = ghJson([
          "pr",
          "view",
          String(pr.number),
          "--repo",
          REPO,
          "--json",
          "state,headRefOid",
        ]);
        if (now.state !== "OPEN" || now.headRefOid !== head) {
          entry.applied = `skipped: PR is ${now.state} at ${now.headRefOid.slice(0, 9)}`;
        } else {
          // A plain push: fast-forward only, never --force.
          const pushed = tryGit(["push", "-q", remote, `${commit}:refs/heads/${pr.headRefName}`]);
          entry.applied = pushed === null ? "push refused" : `pushed ${commit.slice(0, 9)}`;
        }
      }
    }
    if (entry.files.length || entry.manual.length || entry.applied) report.push(entry);
  }
  for (const line of git(["for-each-ref", "--format=%(refname)", NS]).split("\n").filter(Boolean)) {
    tryGit(["update-ref", "-d", line]);
  }
  const summary = {
    mode: apply ? "apply" : "dry-run",
    base: baseRef,
    scanned: prs.length,
    affected: report.filter((r) => r.files?.length).length,
    byKind: report
      .flatMap((r) => r.files ?? [])
      .reduce((acc, f) => ((acc[f.kind] = (acc[f.kind] ?? 0) + 1), acc), {}),
    manual: report.flatMap((r) => (r.manual ?? []).map((m) => `#${r.pr} ${m}`)),
    applied: report.filter((r) => r.applied).map((r) => `#${r.pr} ${r.applied}`),
    errors: report.filter((r) => r.error),
  };
  const out = arg("out");
  if (out) fs.writeFileSync(out, JSON.stringify({ summary, prs: report }, null, 2) + "\n");
  console.log(JSON.stringify(summary, null, 2));
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((err) => {
    console.error(`strip-derived-from-pr: ${err.message}`);
    process.exit(1);
  });
}
