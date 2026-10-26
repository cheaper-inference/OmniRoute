---
title: "Worktree Isolation Protocol"
version: 3.8.52
lastUpdated: 2026-10-18
---

# Worktree Isolation Protocol

> Operational deep-dive for AGENTS.md → Git Workflow → "Worktree isolation" and Hard Rules
> #19/#22. The normative rules live in `AGENTS.md`; this file carries the step-by-step
> procedure, commands, and incident history.

## Why isolation is mandatory

Multiple sessions/agents work this repo in parallel. The main checkout is **shared**, so a
`git checkout`/branch switch in it silently discards another session's uncommitted work and
yanks the branch out from under whatever else is running (incidents: 2026-06-05, 2026-06-13).

**Rule: never develop on the shared main checkout. Every task gets its own git worktree on its
own dedicated branch, and you MUST confirm the base branch with the operator before creating it.**

## Step-by-step

1. **Ask first — which base branch?** Before creating anything, ask the operator (unless they
   already told you) from which branch the new worktree/branch should be cut. Do NOT assume
   `main` or "whatever I'm on" — the answer is usually the active `release/vX.Y.Z`, but it can
   be another feature/release branch. Get the base explicitly.
2. **Create an isolated worktree + branch off that base** (never reuse the main checkout).
   **🔴 MANDATORY PATH: every worktree lives under `.claude/worktrees/` — and nowhere else.**
   This is the single canonical location. It is gitignored AND in the `tsconfig.json` /
   `.dockerignore` excludes, so worktrees never leak into the build scope. **Never** use
   `.worktrees/`, repo-root, or any other path — a worktree outside `.claude/worktrees/`
   (a) escapes the build-scope excludes and poisons `next build` (the `tsconfig`
   `include: **/*` globs ~70× the codebase → OOM; incident 2026-06-25) and (b) scatters
   worktrees across two dirs.

   ```bash
   BASE_BRANCH="release/vX.Y.Z"          # ← the branch the operator confirmed in step 1
   TASK="feat/your-feature"               # feat/ fix/ refactor/ docs/ test/ chore/
   git fetch origin "$BASE_BRANCH"
   git worktree add ".claude/worktrees/${TASK##*/}" -b "$TASK" "origin/$BASE_BRANCH"
   cd ".claude/worktrees/${TASK##*/}"
   # Reuse the main checkout's node_modules to skip a per-worktree npm install.
   # HARD LINKS (`cp -al`), never a symlink: ~5s for the whole tree and near-zero extra
   # disk (the inodes are shared), and unlike a symlink it does not break the dev server.
   cp -al "$(git -C <main_checkout> rev-parse --show-toplevel)/node_modules" node_modules
   # `.husky/_` is gitignored, so a fresh worktree does NOT have it and
   # `core.hooksPath=.husky/_` then points at a directory that does not exist —
   # every pre-commit gate goes silently mute. Copy it too.
   cp -a "$(git -C <main_checkout> rev-parse --show-toplevel)/.husky/_" .husky/_
   ```

   `scripts/dev/new-worktree.sh <branch> [base]` does all of the above (canonical path,
   hard-linked `node_modules`, `.husky/_`) and then **verifies** the hook is actually
   executable, so prefer it over running the steps by hand.

   **Never `ln -s` node_modules.** Turbopack rejects a symlink that resolves outside the
   project root, so `npm run dev` dies with a FATAL panic (`Symlink [project]/node_modules
is invalid, it points out of the filesystem root`) while typecheck, lint and the test
   runners all keep passing — the error names "filesystem root", not the worktree, so it
   reads like a Next/build bug and costs real time to trace (incident 2026-07-31, #9043).

   **A worktree without `.husky/_` runs NO pre-commit gate — and says nothing.** `git`
   resolves `core.hooksPath` relative to the worktree top; when the directory is missing it
   simply finds no hook and commits. Nothing is printed, the commit succeeds, and the
   identity/lint/docs gates never ran. This is how 59 commits carrying a stale identity
   override (name of a contributor + the maintainer's e-mail) got past
   `scripts/check/check-git-identity.sh` between 2026-08-29 and 09-02 — they were all made in
   `cp -al` worktrees. Verify with `ls .husky/_/pre-commit` inside a new worktree, or just use
   `scripts/dev/new-worktree.sh`, which fails loudly when the hook is not executable.

3. **Work, commit, push, open the PR — all from inside the worktree.** Never `git checkout` a
   different branch inside a worktree another session might share.
4. **Tear down only your own** worktree + branch when done, from the main checkout:
   `git worktree remove .claude/worktrees/<dir>` then `git branch -D <task>`. Never blanket-delete
   `fix/*`/`feat/*` — other sessions keep their own; delete only the branches you created, by name.
5. **Never touch another session's worktree, branch, or uncommitted changes.** If `git worktree
list` shows worktrees you didn't create, leave them alone. End every session with the main
   checkout back on the branch it started on (the active `release/vX.Y.Z`, never `main`).

## Base-green check (PRs must not be born red)

Before cutting a branch, merging the base into a PR branch, mass-retargeting PRs, or opening a
PR: check whether the base tip is green. The `Release-Green (continuous)` workflow
(`.github/workflows/nightly-release-green.yml`) publishes the verdict in a single deduplicated
issue titled `🔴 Release branch not green: <branch>` (label `base-red`). One call replaces any
local suite run for this purpose:

```bash
gh issue list --repo diegosouzapw/OmniRoute --state open \
  --search "Release branch not green: <base> in:title"
```

If the base is red: never treat the inherited failures as your branch's defect; never "fix" them
inside your feature branch (a base-red fix is its own freeze-gated `fix/release-vX.Y.Z-basereds`
PR); and if you must open a PR anyway, add `⚠️ base-red inherited: #<issue>` to the PR body so
reviewers and CI babysitters do not chase ghosts.

## Sync-back landings are fast-forward, never squash

A `main → release/vX+1` sync-back (Phase 5 of `/generate-release`, or any later "bring main's
post-release commits over" PR) must reach the release branch as the merge commit it already is:
`git merge-base --is-ancestor origin/release/vX+1 <head>` then
`git push origin <head>:refs/heads/release/vX+1` (GitHub marks the PR merged). Squash-merging it
drops `main` from the release branch's ancestry and the next sync-back re-conflicts on every file
main touched (551 conflicts on the v3.8.50 → v3.8.51 sync before the two-step merge). After
landing, `git merge-base --is-ancestor origin/main origin/release/vX+1` must be true — and check
that `config/quality/eslint-suppressions.json` / `quality-baseline.json` carried main's freezes
(they merge as "ours" silently). Details: `.agents/skills/generate-release/phases/phase-5-next-cycle.md`.
