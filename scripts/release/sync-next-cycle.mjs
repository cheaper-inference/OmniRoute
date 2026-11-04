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
// Usage: node scripts/release/sync-next-cycle.mjs <nextVersion>   e.g. 3.8.45
//
// Idempotent: safe to re-run after resolving any conflicts it could not
// auto-resolve (it detects an in-progress merge in its worktree and resumes).

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

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

/** Bind a physical worktree to this repository and branch before writing into it. */
function verifySyncWorktree(root, worktree, branch) {
  const identity = fs.lstatSync(worktree);
  if (identity.isSymbolicLink() || !identity.isDirectory()) {
    throw new Error("[sync-next-cycle] worktree must be a physical directory");
  }
  const commonArgs = ["rev-parse", "--path-format=absolute", "--git-common-dir"];
  if (
    path.resolve(git(["rev-parse", "--show-toplevel"], { cwd: worktree })) !==
      path.resolve(worktree) ||
    git(commonArgs, { cwd: worktree }) !== git(commonArgs, { cwd: root }) ||
    git(["symbolic-ref", "--short", "HEAD"], { cwd: worktree }) !== branch
  ) {
    throw new Error("[sync-next-cycle] worktree repository or branch mismatch; preserving it");
  }
  const head = git(["rev-parse", "HEAD"], { cwd: worktree });
  const registrations = git(["worktree", "list", "--porcelain", "-z"], { cwd: root })
    .split("\0\0")
    .map((record) => record.split("\0"))
    .filter((fields) => fields[0] === `worktree ${path.resolve(worktree)}`);
  if (
    !/^[0-9a-f]{40}$/.test(head) ||
    registrations.length !== 1 ||
    !registrations[0].includes(`branch refs/heads/${branch}`) ||
    !registrations[0].includes(`HEAD ${head}`)
  ) {
    throw new Error("[sync-next-cycle] worktree registration mismatch; preserving it");
  }
  return { dev: identity.dev, ino: identity.ino, head };
}

/** Prepare physical dependencies and active hooks before any worktree commit. */
export function prepareSyncWorktree(root, worktree, branch) {
  const identity = verifySyncWorktree(root, worktree, branch);
  const created = [];
  const physicalDirectory = (directory, label) => {
    const stat = fs.lstatSync(directory);
    if (stat.isSymbolicLink() || !stat.isDirectory()) {
      throw new Error(`[sync-next-cycle] ${label} must be a physical directory`);
    }
    return stat;
  };
  const assertOwned = ({ destination, parent, identity, parentIdentity }) => {
    const currentParent = physicalDirectory(parent, "copy parent");
    const current = physicalDirectory(destination, "owned copy");
    if (
      current.dev !== identity.dev ||
      current.ino !== identity.ino ||
      currentParent.dev !== parentIdentity.dev ||
      currentParent.ino !== parentIdentity.ino
    ) {
      throw new Error("[sync-next-cycle] owned copy identity changed; manual recovery required");
    }
  };
  const copyIfMissing = (relative, flags) => {
    const source = path.join(root, relative);
    const destination = path.join(worktree, relative);
    const parent = path.dirname(destination);
    const parentIdentity = physicalDirectory(parent, `${relative} parent`);
    let existing;
    try {
      existing = fs.lstatSync(destination);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    if (existing) {
      physicalDirectory(destination, `existing ${relative}`);
      return;
    }
    physicalDirectory(path.dirname(source), `${relative} source parent`);
    physicalDirectory(source, `source ${relative}`);
    // Claim only an absent destination. Copy contents, never nest a second directory.
    fs.mkdirSync(destination);
    const owned = { destination, parent, identity: fs.lstatSync(destination), parentIdentity };
    created.push(owned);
    execFileSync("cp", [flags, "--", `${source}${path.sep}.`, destination], { stdio: "pipe" });
    assertOwned(owned);
  };
  try {
    copyIfMissing("node_modules", "-al");
    copyIfMissing(path.join(".husky", "_"), "-a");
    const hooks = path.join(worktree, ".husky", "_");
    const preCommit = path.join(hooks, "pre-commit");
    const hookStat = fs.lstatSync(preCommit);
    if (hookStat.isSymbolicLink() || !hookStat.isFile() || (hookStat.mode & 0o111) === 0) {
      throw new Error("[sync-next-cycle] pre-commit must be a regular executable file");
    }
    fs.accessSync(preCommit, fs.constants.X_OK);
    const configured = git(["config", "--get", "core.hooksPath"], { cwd: worktree });
    if (!configured || path.resolve(worktree, configured) !== path.resolve(hooks)) {
      throw new Error("[sync-next-cycle] core.hooksPath must activate this worktree's .husky/_");
    }
    // Keep the copies for hooks, the quick gate and conflict-resolution retries.
    return identity;
  } catch (error) {
    const cleanupErrors = [];
    for (const owned of created.reverse()) {
      try {
        assertOwned(owned);
        fs.rmSync(owned.destination, { recursive: true, force: false });
      } catch (cleanupError) {
        cleanupErrors.push(cleanupError);
      }
    }
    if (cleanupErrors.length) {
      throw new AggregateError(
        [error, ...cleanupErrors],
        "[sync-next-cycle] setup failed and rollback is incomplete; manual recovery required"
      );
    }
    throw error;
  }
}

/** Publish one immutable source SHA and confirm the exact remote branch before cleanup. */
export function publishSyncWorktree(worktree, branch, expectedHead) {
  if (!/^[0-9a-f]{40}$/.test(expectedHead || "")) {
    throw new Error("[sync-next-cycle] invalid publication HEAD; preserving worktree");
  }
  if (git(["rev-parse", "HEAD"], { cwd: worktree }) !== expectedHead) {
    throw new Error("[sync-next-cycle] worktree HEAD changed before publication; preserving it");
  }
  const destination = `refs/heads/${branch}`;
  git(["push", "origin", `${expectedHead}:${destination}`], { cwd: worktree });
  const readback = git(["ls-remote", "--exit-code", "--refs", "origin", destination], {
    cwd: worktree,
  });
  if (readback !== `${expectedHead}\t${destination}`) {
    throw new Error("[sync-next-cycle] remote publication readback mismatch; preserving worktree");
  }
  if (git(["rev-parse", "HEAD"], { cwd: worktree }) !== expectedHead) {
    throw new Error("[sync-next-cycle] worktree HEAD changed during publication; preserving it");
  }
  return { expectedHead, confirmedHead: expectedHead };
}

/** Retain reused worktrees; remove a clean, unchanged worktree owned by this run only. */
export function finishSyncWorktree(root, worktree, ownership) {
  if (!ownership.createdWorktreeThisRun) return false;
  const current = verifySyncWorktree(root, worktree, ownership.branch);
  if (current.dev !== ownership.identity.dev || current.ino !== ownership.identity.ino) {
    throw new Error("[sync-next-cycle] worktree identity changed; preserving it");
  }
  if (
    !/^[0-9a-f]{40}$/.test(ownership.publishedHead || "") ||
    current.head !== ownership.publishedHead
  ) {
    throw new Error("[sync-next-cycle] worktree HEAD changed since publication; preserving it");
  }
  if (git(["status", "--porcelain", "--untracked-files=normal"], { cwd: worktree })) {
    throw new Error("[sync-next-cycle] worktree clean state changed; preserving it");
  }
  // No --force: Git rechecks cleanliness and must refuse newly arrived work.
  git(["worktree", "remove", worktree], { cwd: root });
  return true;
}

function main() {
  const NEXT = process.argv[2];
  if (!/^\d+\.\d+\.\d+$/.test(NEXT || "")) {
    console.error("usage: node scripts/release/sync-next-cycle.mjs <nextVersion>  (e.g. 3.8.45)");
    process.exit(2);
  }
  const ROOT = git(["rev-parse", "--show-toplevel"]);
  const BRANCH = `release/v${NEXT}`;
  const WT = path.join(ROOT, ".claude", "worktrees", `sync-next-${NEXT}`);

  git(["fetch", "origin", "main", BRANCH], { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
  const prevVersion = JSON.parse(git(["show", "origin/main:package.json"], { cwd: ROOT })).version;
  console.log(`[sync-next-cycle] main is v${prevVersion} → syncing into ${BRANCH}`);

  // Worktree (idempotent — reuse if a previous run left it for conflict resolution).
  let createdWorktreeThisRun = false;
  if (!fs.existsSync(WT)) {
    git(["worktree", "add", WT, BRANCH], { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
    createdWorktreeThisRun = true;
  }
  const worktreeIdentity = prepareSyncWorktree(ROOT, WT, BRANCH);
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
  const expectedHead = git(["rev-parse", "HEAD"], { cwd: WT });

  // WS0.3 green gate: validate the MERGED tree before it reaches origin. The commit
  // stays local on failure so the captain can inspect/fix in the sync worktree.
  const gate = greenGateArgs(process.argv);
  if (gate) {
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
  } else {
    console.warn(
      "[sync-next-cycle] ⚠ --skip-green-gate: pushing WITHOUT release-green validation."
    );
  }

  const publication = publishSyncWorktree(WT, BRANCH, expectedHead);

  const left = git(["rev-list", "--count", `${BRANCH}..origin/main`], { cwd: WT });
  console.log(
    `[sync-next-cycle] pushed. origin/main commits not in ${BRANCH}: ${left} (expected 0)`
  );

  const removed = finishSyncWorktree(ROOT, WT, {
    createdWorktreeThisRun,
    identity: worktreeIdentity,
    branch: BRANCH,
    publishedHead: publication.confirmedHead,
  });
  console.log(
    removed
      ? "[sync-next-cycle] done — worktree created by this run removed."
      : `[sync-next-cycle] done — reused worktree preserved at ${WT}.`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
