#!/usr/bin/env node
// scripts/release/sync-next-cycle.mjs
//
// Parallel-cycle sync-back (generate-release Phase 5, step 20).
// Merges origin/main (which carries the just-shipped release's closing fixes +
// finalized CHANGELOG) into the live next-cycle branch release/v<NEXT> that was
// cut at the freeze (Phase 0a.0b) — resolving CHANGELOG.md with the anti-eat
// protocol: main's CHANGELOG wins VERBATIM, and the next cycle's own
// `## [<NEXT>] — TBD` section (with any bullets it already accumulated) is
// re-inserted on top. Design: _tasks/release-flow/2026-07-04_proposta-ciclo-paralelo-v2.md
//
// Usage: see SYNC_USAGE below (`--help`).
//
// The merge commit lands through a PULL REQUEST: release/vX+1 is the default branch and
// ruleset 21899981 ("Require PR on default branch", no bypass actors) refuses a direct
// push. The script pushes the merge commit to chore/sync-back-main-<sha12> and opens a PR
// into the release branch; it never merges that PR (the owner lands it as a merge commit).
//
// Idempotent: safe to re-run after resolving any conflicts it could not
// auto-resolve (it detects an in-progress merge in its worktree and resumes), and
// after the side branch reached origin (it finds the open PR, or opens it, and stops).

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const SYNC_USAGE = `usage: node scripts/release/sync-next-cycle.mjs <nextVersion> [--skip-green-gate] [--direct-push]
  e.g. node scripts/release/sync-next-cycle.mjs 3.8.45

Merges origin/main into release/v<nextVersion>, pushes the merge commit to the side branch
chore/sync-back-main-<first 12 hex of origin/main> and opens a pull request into the release
branch. It never pushes to the release branch and never merges the PR: land it as a MERGE
COMMIT (never squash or rebase) once the required gates are green.

  --skip-green-gate  skip the release-green --quick gate on the merged tree (emergency only:
                     verify first that the tip reds pre-exist on the release branch)
  --direct-push      push the merge commit straight to the release branch instead of opening
                     a PR. Off by default, for a repository without a PR-only rule on that
                     branch: this repository refuses it (ruleset 21899981, "Require PR on
                     default branch", no bypass actors).
  -h, --help         print this text`;

/** Pure: parse the CLI (`argv` = process.argv). `next` is null when absent or malformed. */
export function parseSyncArgs(argv) {
  const out = { next: null, skipGreenGate: false, directPush: false, help: false, unknown: [] };
  for (const arg of argv.slice(2)) {
    if (arg === "--skip-green-gate") out.skipGreenGate = true;
    else if (arg === "--direct-push") out.directPush = true;
    else if (arg === "--help" || arg === "-h") out.help = true;
    else if (arg.startsWith("-")) out.unknown.push(arg);
    else if (out.next === null && /^\d+\.\d+\.\d+$/.test(arg)) out.next = arg;
    else out.unknown.push(arg);
  }
  return out;
}

/** Pure: the side branch the sync-back merge commit is pushed to. */
export function syncBackBranchName(mainSha) {
  const sha = String(mainSha || "").toLowerCase();
  if (!/^[0-9a-f]+$/.test(sha)) throw new Error(`not a hex commit SHA: ${mainSha}`);
  if (sha.length < 12) throw new Error(`need at least 12 hex characters, got ${sha.length}`);
  return `chore/sync-back-main-${sha.slice(0, 12)}`;
}

/** Pure: the push argument array. Only --direct-push targets the release branch. */
export function syncPushArgs({ directPush, branch, sideBranch }) {
  const target = directPush ? branch : sideBranch;
  return ["push", "origin", `HEAD:refs/heads/${target}`];
}

/** Pure: `owner/name` from a GitHub remote URL (https, scp-style or ssh://), else null. */
export function githubRepoFromRemoteUrl(url) {
  const m = String(url || "")
    .trim()
    .match(/^(?:https:\/\/|ssh:\/\/git@|git@)github\.com[:/]([^/\s]+)\/([^/\s]+?)(?:\.git)?\/?$/);
  return m ? `${m[1]}/${m[2]}` : null;
}

/** Pure: the sync-back PR title. */
export function syncBackPrTitle(branch) {
  return `chore(release): sync-back main → ${branch}`;
}

/** Pure: `gh pr create` argument array (body always through a file). */
export function ghPrCreateArgs({ repo, base, head, title, bodyFile }) {
  return [
    "pr",
    "create",
    "--repo",
    repo,
    "--base",
    base,
    "--head",
    head,
    "--title",
    title,
    "--body-file",
    bodyFile,
  ];
}

/** Pure: `gh pr list` argument array that prints the URL of an OPEN PR head → base (or ""). */
export function ghOpenPrListArgs({ repo, base, head }) {
  return [
    "pr",
    "list",
    "--repo",
    repo,
    "--head",
    head,
    "--base",
    base,
    "--state",
    "open",
    "--json",
    "url",
    "--jq",
    ".[0].url // empty",
  ];
}

function landingRules(branch) {
  return [
    "Land it as a MERGE COMMIT, never squash or rebase: a squash drops `main` from the release " +
      "ancestry and the next sync-back re-conflicts on every file (551 files on v3.8.50 → v3.8.51).",
    "The required gates must be green on the head commit before landing.",
    "After landing, `git merge-base --is-ancestor origin/main origin/" +
      branch +
      "` must be true (exit 0).",
  ];
}

const GREEN_GATE_TEXT = {
  passed: "`validate-release-green.mjs --quick` passed on the merged tree before the push.",
  skipped:
    "skipped with `--skip-green-gate` (the operator verified that the tip reds pre-exist on the release branch).",
};

/** Pure: the sync-back PR body (written to a file and passed with --body-file). */
export function syncBackPrBody({ branch, mainSha, prevVersion, greenGate }) {
  const rules = landingRules(branch);
  return [
    "## Summary",
    "",
    `Parallel-cycle sync-back: merges \`origin/main\` at \`${String(mainSha).slice(0, 12)}\` ` +
      `(v${prevVersion} close) into \`${branch}\`, opened by \`scripts/release/sync-next-cycle.mjs\`. ` +
      "The release branch only accepts changes through a pull request (ruleset 21899981).",
    "",
    `Release-green gate: ${GREEN_GATE_TEXT[greenGate] || "not re-run (PR opened from a side branch already on origin)."}`,
    "",
    "## How to land",
    "",
    ...rules.map((r, i) => `${i + 1}. ${r}`),
    "",
    "Also check that `config/quality/eslint-suppressions.json` and `config/quality/quality-baseline.json` " +
      "carried main's freezes (they merge as ours silently).",
    "",
  ].join("\n");
}

/** Pure: the final console output — PR URL + the three landing statements as next steps. */
export function syncBackNextSteps({ branch, prUrl }) {
  return [
    `[sync-next-cycle] sync-back PR: ${prUrl}`,
    "Next steps (the script never merges the PR):",
    ...landingRules(branch).map((r, i) => `  ${i + 1}. ${r}`),
  ].join("\n");
}

/**
 * Pure: insert (or replace) the next cycle's section into main's CHANGELOG.
 * - `mainChangelog`: the full CHANGELOG.md content from origin/main (wins verbatim).
 * - `nextSection`: the `## [<next>] — …` section text captured from the cycle
 *   branch BEFORE the merge (header line through the line before the next `## [`
 *   heading), or null/empty when the cycle has no section yet (a fresh `— TBD`
 *   placeholder is synthesized).
 * The section lands right after the `## [Unreleased]` block (mirroring the
 * layout every cycle-open produces), before the first `## [x.y.z]` heading.
 */
export function insertNextSection(mainChangelog, nextSection, nextVersion) {
  const lines = mainChangelog.split("\n");
  const isVersionHeading = (l) => /^## \[\d+\.\d+\.\d+\]/.test(l);

  // Drop any pre-existing copy of the next section from main's content (it
  // normally has none — main only learns about <next> at the NEXT release).
  const startIdx = lines.findIndex((l) => l.startsWith(`## [${nextVersion}]`));
  if (startIdx !== -1) {
    let endIdx = lines.length;
    for (let i = startIdx + 1; i < lines.length; i++) {
      if (isVersionHeading(lines[i]) || lines[i].startsWith("## [Unreleased]")) {
        endIdx = i;
        break;
      }
    }
    lines.splice(startIdx, endIdx - startIdx);
  }

  const section =
    nextSection && nextSection.trim().length > 0
      ? nextSection.replace(/\s+$/, "")
      : `## [${nextVersion}] — TBD`;

  // Insert before the first released-version heading.
  const firstVersionIdx = lines.findIndex(isVersionHeading);
  const insertAt = firstVersionIdx === -1 ? lines.length : firstVersionIdx;
  lines.splice(insertAt, 0, ...section.split("\n"), "", "---", "");

  // Collapse accidental duplicate separators introduced by the splice.
  return lines
    .join("\n")
    .replace(/\n---\n\n---\n/g, "\n---\n")
    .replace(/\n{4,}/g, "\n\n\n");
}

/** Pure: the version whose `## [x.y.z]` heading follows `version`'s section (or null). */
export function versionAfter(changelog, version) {
  const lines = changelog.split("\n");
  const start = lines.findIndex((l) => l.startsWith(`## [${version}]`));
  if (start === -1) return null;
  for (let i = start + 1; i < lines.length; i++) {
    const m = lines[i].match(/^## \[(\d+\.\d+\.\d+)\]/);
    if (m) return m[1];
  }
  return null;
}

/** Pure: extract the `## [<version>]` section (header included, next heading excluded). */
export function extractSection(changelog, version) {
  const lines = changelog.split("\n");
  const start = lines.findIndex((l) => l.startsWith(`## [${version}]`));
  if (start === -1) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^## \[/.test(lines[i])) {
      end = i;
      break;
    }
  }
  // Trim a trailing `---` separator so re-insertion controls its own framing.
  let sectionLines = lines.slice(start, end);
  while (
    sectionLines.length &&
    (sectionLines[sectionLines.length - 1].trim() === "---" ||
      sectionLines[sectionLines.length - 1].trim() === "")
  ) {
    sectionLines.pop();
  }
  return sectionLines.join("\n");
}

function git(args, opts = {}) {
  // maxBuffer: the default 1 MiB overflows on `git show origin/main:CHANGELOG.md`
  // (the CHANGELOG alone is >1 MiB) — ENOBUFS found live in the v3.8.45 run (2026-07-06).
  return execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    ...opts,
  }).trim();
}

// The sync-back is the ONE write path to the release branch with no CI gate — a red
// merged tree pushed here turns the whole PR queue red (G1, v3.8.49 quality plan WS0.3).
// Returns the validate-release-green invocation to run before the push, or null when
// the operator passed --skip-green-gate (emergency hatch: tip reds verified pre-existing).
export function greenGateArgs(argv) {
  if (argv.includes("--skip-green-gate")) return null;
  return ["scripts/quality/validate-release-green.mjs", "--quick"];
}

function gh(args) {
  return execFileSync("gh", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  }).trim();
}

function isAncestor(ancestor, descendant, cwd) {
  try {
    execFileSync("git", ["merge-base", "--is-ancestor", ancestor, descendant], {
      cwd,
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

// Find the open sync-back PR, or open it (body through a temp file + --body-file).
function openSyncBackPr({ repo, branch, side, mainSha, prevVersion, greenGate }) {
  const existing = gh(ghOpenPrListArgs({ repo, base: branch, head: side }));
  if (existing) return { url: existing, created: false };
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "sync-next-cycle-"));
  try {
    const bodyFile = path.join(dir, "pr-body.md");
    fs.writeFileSync(bodyFile, syncBackPrBody({ branch, mainSha, prevVersion, greenGate }));
    const out = gh(
      ghPrCreateArgs({
        repo,
        base: branch,
        head: side,
        title: syncBackPrTitle(branch),
        bodyFile,
      })
    );
    const url = out
      .split("\n")
      .filter((l) => /\/pull\/\d+\s*$/.test(l))
      .pop();
    return { url: (url || out).trim(), created: true };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function main() {
  const opts = parseSyncArgs(process.argv);
  if (opts.help) {
    console.log(SYNC_USAGE);
    return;
  }
  if (!opts.next || opts.unknown.length) {
    if (opts.unknown.length) {
      console.error(`[sync-next-cycle] unknown argument(s): ${opts.unknown.join(" ")}`);
    }
    console.error(SYNC_USAGE);
    process.exit(2);
  }
  const NEXT = opts.next;
  const ROOT = git(["rev-parse", "--show-toplevel"]);
  const BRANCH = `release/v${NEXT}`;
  const WT = path.join(ROOT, ".claude", "worktrees", `sync-next-${NEXT}`);

  git(["fetch", "origin", "main", BRANCH], { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
  const prevVersion = JSON.parse(git(["show", "origin/main:package.json"], { cwd: ROOT })).version;
  const mainSha = git(["rev-parse", "origin/main"], { cwd: ROOT });
  const SIDE = syncBackBranchName(mainSha);
  console.log(`[sync-next-cycle] main is v${prevVersion} → syncing into ${BRANCH}`);

  let repo = null;
  if (!opts.directPush) {
    repo = githubRepoFromRemoteUrl(git(["remote", "get-url", "origin"], { cwd: ROOT }));
    if (!repo) {
      console.error("[sync-next-cycle] ABORT: origin is not a GitHub remote (needed for the PR).");
      process.exit(1);
    }
    // Idempotent: this main commit's side branch is already on origin → reuse it.
    const remoteSide = git(["ls-remote", "--heads", "origin", `refs/heads/${SIDE}`], {
      cwd: ROOT,
    });
    if (remoteSide) {
      const remoteSha = remoteSide.split(/\s+/)[0];
      git(["fetch", "origin", SIDE], { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
      if (!isAncestor(mainSha, remoteSha, ROOT)) {
        console.error(
          `[sync-next-cycle] ABORT: origin/${SIDE} exists but does not contain origin/main ` +
            `(${mainSha.slice(0, 12)}) — inspect it by hand; this script never force-pushes.`
        );
        process.exit(1);
      }
      const pr = openSyncBackPr({
        repo,
        branch: BRANCH,
        side: SIDE,
        mainSha,
        prevVersion,
        greenGate: "unknown",
      });
      console.log(
        pr.created
          ? `[sync-next-cycle] ${SIDE} was already on origin — opened its PR.`
          : `[sync-next-cycle] ${SIDE} is already on origin with an open PR — nothing to do.`
      );
      console.log(syncBackNextSteps({ branch: BRANCH, prUrl: pr.url }));
      return;
    }
  }

  // Worktree (idempotent — reuse if a previous run left it for conflict resolution).
  // Detached at origin/<BRANCH>: the merge commit never moves a local release branch ref
  // (and the add does not fail when another checkout already has <BRANCH> checked out).
  if (!fs.existsSync(WT)) {
    git(["worktree", "add", "--detach", WT, `origin/${BRANCH}`], {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
    });
  }
  const mergeHeadPath = git(["rev-parse", "--path-format=absolute", "--git-path", "MERGE_HEAD"], {
    cwd: WT,
  });
  const mergeInProgress = fs.existsSync(mergeHeadPath);
  if (!mergeInProgress) {
    git(["pull", "--ff-only", "origin", BRANCH], { cwd: WT, stdio: ["ignore", "pipe", "pipe"] });
  }

  // Capture the cycle's own section BEFORE the merge touches the file.
  const cycleChangelog = fs.readFileSync(path.join(WT, "CHANGELOG.md"), "utf8");
  const nextSection = extractSection(cycleChangelog, NEXT);

  if (!mergeInProgress) {
    try {
      execFileSync("git", ["merge", "--no-commit", "--no-ff", "origin/main"], {
        cwd: WT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch {
      // Conflicts are expected (CHANGELOG at minimum) — handled below.
    }
  }

  // Anti-CHANGELOG-eat: main's CHANGELOG verbatim + the cycle's section on top.
  const mainChangelog = git(["show", "origin/main:CHANGELOG.md"], { cwd: WT });
  const merged = insertNextSection(mainChangelog + "\n", nextSection, NEXT);
  // Assertions: main's latest section intact + next section present.
  if (!merged.includes(`## [${prevVersion}]`)) {
    console.error(
      `[sync-next-cycle] ABORT: main's ## [${prevVersion}] section missing after re-insertion`
    );
    process.exit(1);
  }
  if (!merged.includes(`## [${NEXT}]`)) {
    console.error(`[sync-next-cycle] ABORT: ## [${NEXT}] section missing after re-insertion`);
    process.exit(1);
  }
  fs.writeFileSync(path.join(WT, "CHANGELOG.md"), merged);
  git(["add", "CHANGELOG.md"], { cwd: WT });

  // i18n mirrors: regenerate instead of merging them one by one.
  const mirrors = git(["diff", "--name-only", "--diff-filter=U"], { cwd: WT })
    .split("\n")
    .filter((f) => f.startsWith("docs/i18n/") && f.endsWith("CHANGELOG.md"));
  for (const m of mirrors) {
    execFileSync("git", ["checkout", "origin/main", "--", m], { cwd: WT });
    execFileSync("git", ["add", m], { cwd: WT });
  }
  try {
    execFileSync("npm", ["run", "release:sync-changelog-i18n", "--", NEXT, prevVersion], {
      cwd: WT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    // Also propagate the just-FINALIZED [prevVersion] section (dated bullets +
    // Contributors) into the mirrors — syncing only [NEXT] leaves the shipped
    // section as "— TBD" in all 42 mirrors (found live in the v3.8.45 run).
    // Boundary = the version heading right below it in main's CHANGELOG.
    const belowPrev = versionAfter(mainChangelog, prevVersion);
    if (belowPrev) {
      execFileSync("npm", ["run", "release:sync-changelog-i18n", "--", prevVersion, belowPrev], {
        cwd: WT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
    }
    execFileSync("git", ["add", "-A", "docs/i18n"], { cwd: WT });
  } catch (e) {
    console.warn("[sync-next-cycle] i18n mirror resync failed (resolve manually):", e.message);
  }

  // Anything still conflicted is for the human (migrations, lockfile, code).
  const unresolved = git(["diff", "--name-only", "--diff-filter=U"], { cwd: WT })
    .split("\n")
    .filter(Boolean);
  if (unresolved.length) {
    console.error(
      `[sync-next-cycle] ${unresolved.length} conflict(s) need manual resolution in ${WT}:\n` +
        unresolved.map((f) => `  ✗ ${f}`).join("\n") +
        `\n  → resolve + git add, then re-run this script (it resumes the merge).` +
        `\n  → migrations: renumber per the cross-PR collision precedent; lockfile: npm install.`
    );
    process.exit(1);
  }

  git(
    [
      "commit",
      "-m",
      `chore(release): sync main (v${prevVersion} close) into ${BRANCH} — parallel-cycle sync-back`,
    ],
    { cwd: WT }
  );

  // WS0.3 green gate: validate the MERGED tree before it reaches origin. The commit
  // stays local on failure so the captain can inspect/fix in the sync worktree.
  const gate = greenGateArgs(process.argv);
  if (gate) {
    const nm = path.join(WT, "node_modules");
    if (!fs.existsSync(nm)) fs.symlinkSync(path.join(ROOT, "node_modules"), nm, "dir");
    console.log("[sync-next-cycle] release-green --quick on the merged tree (pre-push gate)…");
    try {
      execFileSync("node", gate, { cwd: WT, stdio: "inherit", maxBuffer: 64 * 1024 * 1024 });
    } catch {
      console.error(
        `[sync-next-cycle] ABORT: release-green --quick found HARD failures in the merged tree.` +
          `\n  The sync commit is LOCAL-ONLY in ${WT} — fix the reds there, then re-run this script.` +
          `\n  Use --skip-green-gate ONLY after verifying the reds pre-exist on origin/${BRANCH}.`
      );
      process.exit(1);
    }
    fs.rmSync(nm, { force: true });
  } else {
    console.warn(
      "[sync-next-cycle] ⚠ --skip-green-gate: pushing WITHOUT release-green validation."
    );
  }

  // The side branch is named after mainSha: refuse to push a tree that does not contain it
  // (a reused worktree may hold a merge of an older main — re-run to merge the newer one).
  if (!opts.directPush && !isAncestor(mainSha, "HEAD", WT)) {
    console.error(
      `[sync-next-cycle] ABORT: the merged tree in ${WT} does not contain origin/main ` +
        `(${mainSha.slice(0, 12)}) — re-run this script to merge it.`
    );
    process.exit(1);
  }

  // Default: side branch + PR (ruleset 21899981 refuses a push to the release branch).
  const target = opts.directPush ? BRANCH : SIDE;
  git(syncPushArgs({ directPush: opts.directPush, branch: BRANCH, sideBranch: SIDE }), { cwd: WT });

  const left = git(["rev-list", "--count", "HEAD..origin/main"], { cwd: WT });
  console.log(
    `[sync-next-cycle] pushed ${target}. origin/main commits not in it: ${left} (expected 0)`
  );

  git(["worktree", "remove", "--force", WT], { cwd: ROOT });
  console.log("[sync-next-cycle] worktree removed.");
  if (opts.directPush) {
    console.log(`[sync-next-cycle] done — --direct-push landed the merge commit on ${BRANCH}.`);
    return;
  }

  const pr = openSyncBackPr({
    repo,
    branch: BRANCH,
    side: SIDE,
    mainSha,
    prevVersion,
    greenGate: gate ? "passed" : "skipped",
  });
  console.log(syncBackNextSteps({ branch: BRANCH, prUrl: pr.url }));
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
