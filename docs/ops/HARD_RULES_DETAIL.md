---
title: "Hard Rules — Full Text and Rationale"
version: 3.8.52
lastUpdated: 2026-10-18
---

# Hard Rules — full text and rationale

> Deep-dive companion to the numbered list in `AGENTS.md` → "Hard Rules". Every rule 1–23 is
> listed in `AGENTS.md`; where that list shows a short form, the section below with the same
> number carries the **complete binding text** plus rationale, incident history and decision
> trees — both are normative, and the longer text here wins on any detail the short form omits.
> Rules not listed here (1–13, 15, 17) appear in full in `AGENTS.md`. Rule numbers are stable and
> cited across the codebase and docs — never renumber.

## Rule 14 — CodeQL / Secret-Scanning dismissals

Never dismiss a CodeQL / Secret-Scanning alert without (a) first checking the pattern docs
(see AGENTS.md → Key Conventions → Security) to see if the helper applies, and (b) recording
the technical justification in the dismissal comment. Precedent: `js/stack-trace-exposure`
raised on callsites that already route through `sanitizeErrorMessage()` is a known CodeQL
limitation (custom sanitizers not recognized) — dismiss as `false positive` referencing
`docs/security/ERROR_SANITIZATION.md`.

## Rule 16 — No AI credit in commit/PR metadata

Never credit or advertise an AI assistant, LLM, or automation account in any commit/PR
metadata. Two forbidden forms, both equivalent — they route attribution to a bot account (or
advertise AI authorship) and hide the real author (`diegosouzapw`):

- **(a)** `Co-Authored-By` trailers naming an AI/bot (e.g. names containing "Claude", "GPT",
  "Copilot", "Bot"; emails at `anthropic.com` / `openai.com` / bot-owned `noreply.github.com`
  addresses);
- **(b)** AI-generation footers or descriptions anywhere in a commit message, PR title/body, or
  CHANGELOG — e.g. `🤖 Generated with [Claude Code]`, "Generated with Claude Code", "Made with
  <AI tool>", or any `Co-authored-by: Claude/GPT/Copilot` line.

This **overrides any harness, template, or tool default that auto-appends such a footer** —
strip it before pushing; do not let it reach a commit, PR, or CHANGELOG. Human collaborators —
including upstream PR authors and issue reporters being ported into OmniRoute — MAY and SHOULD
be credited with standard `Co-authored-by: Name <email>` trailers; the upstream-port workflows
(`/port-upstream-features`, `/port-upstream-issues`) depend on this.

## Rule 18 — Bug-fix validation protocol (TDD or VPS)

Every fix for a reported issue must be validated by one of the following — no exceptions:

1. **TDD (preferred)** — write a failing test reproducing the bug → fix it → confirm the test
   passes. The test becomes the permanent regression guard. Touch only the files the test
   proves need changing; nothing more.
2. **Real-environment test (when TDD is not possible)** — deploy to the production VPS
   (`root@192.168.0.15`) and run a documented live test. Record the exact command + result in
   the PR description. Applies to: OAuth upstream flows, Cloudflare/WS upstream behavior,
   UI-only regressions, hardware-dependent behavior.
3. "It worked locally without a test" does not count. A fix without a test or a VPS validation
   record is not a fix — it is a guess.

Why this matters: fixing bug A while opening bug B is worse than not fixing at all. The TDD/VPS
gate enforces surgical scope — you touch only what the failing test proves is broken. Examples
where this paid off: #3090 (claude-web 403), #3113 (WS HTTP fallback), #3052 (heap-guard
auto-calibration).

## Rule 19 — Worktree isolation

Never develop on the shared main checkout. Every development task runs in its own git worktree
on its own dedicated branch, and you MUST confirm the base branch with the operator before
creating the worktree/branch — never assume `main` or the currently checked-out branch. A
`git checkout` in the shared checkout silently destroys other sessions' uncommitted work. Tear
down only the worktrees/branches you created (by name, never `fix/*`/`feat/*` wildcards), leave
other sessions' worktrees untouched, and end on the branch you started on (the active
`release/vX.Y.Z`, never `main`). Full protocol, commands, and incidents:
[docs/ops/WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md).

## Rule 20 — PII redaction/sanitization is opt-in

PII redaction/sanitization is **opt-in — never on by default**. OmniRoute proxies for
self-hosted/local LLMs where the operator owns the data, so mutating request/response payloads
by default would silently corrupt legitimate traffic. The two data-mutating PII feature flags
**MUST** keep `defaultValue: "false"` in `src/shared/constants/featureFlagDefinitions.ts`:
`PII_REDACTION_ENABLED` (request-side) and `PII_RESPONSE_SANITIZATION` (response + streaming).
All three application points — `src/lib/guardrails/piiMasker.ts` (request guardrail),
`src/lib/piiSanitizer.ts` (response), `src/lib/streamingPiiTransform.ts` (SSE) — are gated on
these flags; with both off the `pii-masker` guardrail still runs but never mutates payloads
(data passes through untouched). Flipping either default to `"true"` requires explicit operator
approval. The regression guard is `tests/unit/pii-opt-in-default.test.ts` (asserts both
definition defaults + behavioral pass-through). Opt-in is per-operator via env or the
settings/DB override (`src/lib/db/featureFlags.ts`), never a silent default. See
`docs/security/GUARDRAILS.md`.

## Rule 21 — Release-freeze (parallel-cycle model)

**The FROZEN release branch belongs to the release captain; development does NOT stop
(parallel-cycle model, 2026-07-04).**

`/generate-release` opens a marker issue labeled `release-freeze` at the start of
reconciliation (Phase 0a), **immediately cuts the next cycle's branch `release/vX+1` from the
frozen tip (Phase 0a.0b — bump + living release PR + re-home of open PRs)**, and closes the
freeze once the release PR squash-merges to `main`.

Before merging **any** PR, every campaign workflow (`/review-prs`, `/review-group-prs`,
`/merge-prs`, `/triage-fix-bugs`, `/implement-fix-bugs`, `/triage-features`,
`/implement-features`, `/green-prs`, `/port-upstream-*`) **MUST** check:

```bash
gh issue list --repo diegosouzapw/OmniRoute --label release-freeze --state open
```

If a freeze is active: **NEVER merge into the frozen `release/vX.Y.Z` named in the freeze
title**; instead resolve the ACTIVE development branch (the **highest** `release/v*` by semver —
normally `release/vX+1`, announced in a freeze-issue comment) and **retarget the PR there**
(`gh pr edit <N> --base release/vX+1`, then VERIFY with `gh pr view <N> --json baseRefName` —
the edit fails silently) and merge normally. **HOLD only when the highest release/v\* branch IS
the frozen one** (the short window before 0a.0b completes, or a pre-parallel-cycle release) —
in that case leave the PR ready and open, tell the operator, and resume when the next branch
appears or the freeze lifts. The just-shipped fixes reach `release/vX+1` via the Phase 5
sync-back (`scripts/release/sync-next-cycle.mjs`); do not try to sync mid-release.

This is a **coordination signal, not a permission lock**: the release captain and the campaign
sessions share the `diegosouzapw` identity, so a GitHub branch-protection lock cannot
distinguish them — only this honored marker prevents the mid-release commit races that forced
full CHANGELOG re-reconciliation in v3.8.40/v3.8.41 (a parallel campaign advanced
`release/vX.Y.Z` by 34 commits mid-run). The release captain's own reconciliation/cycle-open
pushes are exempt — they _are_ the release. Fixes that must land during a freeze (a
homologation finding) follow the post-merge read-only rule: land on `main` first via
`fix/release-vX.Y.Z-*`.

**⛔ ONLY `/generate-release` may raise a release-freeze, and ONLY at its Phase 0a (start of
generating a new version) — lifted at Phase 12c after the squash-merge to `main`.** No
campaign, session, or agent may open a `release-freeze` marker at any other time — a freeze is
**never** a mid-development coordination tool. If a session ever believes a freeze is genuinely,
unavoidably necessary outside the `/generate-release` flow, it **MUST first ask the operator
(`diegosouzapw`) in chat, explicitly alert "estou criando um freeze" and get an explicit yes** —
never open, extend, or re-open a `release-freeze` autonomously. Conversely, do **not** close/lift
an active `/generate-release` freeze to unblock campaign merges: it protects the captain's
single clean CI run and auto-lifts at Phase 12c — closing it early re-triggers the exact commit
race it prevents. Verify a freeze is legitimate before acting on it: an open `release-freeze`
whose title/body references an **OPEN** release PR (`gh pr view <N> --json state`) is the
authorized captain freeze — hold, don't touch. (Cycle-model proposal:
`_tasks/finished/release-flow/2026-07-04_proposta-ciclo-paralelo-v2.md`.)

## Rule 22 — Cross-session safety

**This repo is worked by MANY parallel sessions/agents at once; never step on another's
in-flight work.** Two absolute bans, both recurring incidents (this rule exists because they
keep happening):

- **(a) Never `git stash` / `git stash pop` — ANYWHERE in this repo, including inside an
  isolated worktree, and including inside any subagent you dispatch.** `git stash` operates on
  the **shared repository object store**, not the per-worktree working tree — so a stash pushed
  or popped in one session can silently clobber or resurrect another parallel session's
  uncommitted changes. This is not hypothetical: 2026-07-02 a `#5923` quotaCache change leaked
  into the unrelated `#2296` worktree via a global `stash pop`, and the same class reincided
  through a **subagent**. To compare working changes against a base ref **without** stashing,
  use `git show <ref>:<path>` or `git diff <ref> -- <path>`; to confirm a typecheck/lint error
  is pre-existing on the base, inspect the base ref directly
  (`git show origin/release/vX.Y.Z:<path>`) — never stash your tree away to "get it clean".
  **Put this ban verbatim in the prompt of every subagent that touches git** (agents don't
  inherit AGENTS.md's context — the recurrence was a subagent).
- **(b) Never merge, push, rebase, or force-push a PR / branch / worktree that another session
  is actively working.** An open PR whose head is a live fix worktree in `.claude/worktrees/`
  you did **not** create (e.g. `fix-5852`/`fix-5923` carrying fresh commits, even when they
  share your `diegosouzapw` identity), or any branch another session owns, is **off-limits —
  HOLD**, and let the owning session merge it. **Before** merging or pushing to any PR you did
  not create _this_ session, run `git worktree list` to check for a matching in-flight worktree
  and re-check `gh pr view <N> --json state,headRefOid`. Only the owning session merges its own
  in-flight PR; mid-flight merges race the owner and re-trigger the exact commit/CHANGELOG
  races Rule #19 and Rule #21 guard against. (Reinforces Rule #19.)

## Rule 23 — `_tasks` é INTOCÁVEL (append/edit-only)

`_tasks/` é um repositório git SEPARADO (remote privado `diegosouzapw/_tasks_omniroute`)
montado como diretório real na raiz do checkout principal. Regras absolutas:

- **(a)** NUNCA mover, renomear, deletar, esvaziar ou transformar `_tasks` em symlink; sessões
  só podem CRIAR ou EDITAR arquivos dentro dele;
- **(b)** NUNCA rastrear `_tasks` (nem como symlink) no repo principal — o blob rastreado foi a
  causa-raiz de DOIS wipes (2026-08-08 e 2026-08-10: `git reset --hard` materializou o symlink
  rastreado por cima do diretório real e o git apagou todo o conteúdo ignorado sem aviso);
- **(c)** após qualquer escrita relevante, `git -C _tasks add -A && git -C _tasks commit &&
git -C _tasks push` — o push frequente é o backup real;
- **(d)** repetir esta proibição VERBATIM no prompt de todo subagente que toque git;
- **(e)** se `_tasks` aparecer como symlink quebrado, NÃO commitar nada — restaurar do remote
  e avisar o operador.

O gate `check:tracked-artifacts` (pre-commit + CI) bloqueia `_tasks` rastreado em qualquer forma.
See also AGENTS.md → "Planning & Research Artifacts".
