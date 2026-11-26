# CLAUDE.md

@AGENTS.md

**All project rules live in [`AGENTS.md`](AGENTS.md)** — the single source of truth for every AI assistant; the import above already loads it. Do not re-add project rules here. Everything below applies ONLY to Claude Code — operational refinements of rules already defined in `AGENTS.md`.

## Worktree isolation — Claude Code specifics

- Confirm the base branch with the operator via `AskUserQuestion` (Hard Rule #19) unless they already told you.
- Create the worktree with `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (it lands under `.claude/worktrees/`, hard-links `node_modules` and copies `.husky/_`), then call `EnterWorktree` with its `path`. Always pass the base: without it the script picks the highest `release/*`, which may not be the one the operator confirmed. A worktree that `EnterWorktree` creates by itself has neither the hard links nor the hooks, so no pre-commit gate runs in it.

## Subagents and git

Every subagent that touches git (Agent tool or Workflow script) gets Hard Rule #22a's `git stash` ban verbatim in its prompt — the recorded recurrence of the stash incident came through a subagent.

## Planning artifacts — superpowers path overrides

Superpowers skills announce defaults under `docs/superpowers/plans/`, `docs/superpowers/specs/` and `docs/research/`. Rewrite each to its `_tasks/` equivalent in `AGENTS.md` → "Planning & Research Artifacts" before writing, and commit it with `git -C _tasks …`, never in the main repo.

## Scratch files — `_artifacts/`, not `/tmp`

This project overrides the harness's session scratchpad (`/tmp/claude-*/…`). Write temporary files — exports, generated zips, one-off intermediate outputs — to `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: a gitignored root `_*` path, so the operator finds and deletes all scratch in one place. Durable plans, specs, research and hand-offs go to `_tasks/` instead (Hard Rule #23).

## Red base

To drain an accumulated red state (base tip + red PRs), use the `/sweep-reds` skill.
