---
name: merge-batch
description: Prepare and merge an owner-selected PR batch with contributor credit and exact-candidate admission. Use for a pasted PR list; combined focused validation is diagnostic, and every actual landing still requires its applicable checks and authorization.
allowed-tools: Bash, Read, Edit, Write, Grep, Glob, AskUserQuestion
---

# Merge batch: shared preparation, exact admission

Read `../_shared/base-green.md`, `../_shared/validation-gate.md` and
`../_shared/merge-gates.md`. Their current-candidate, authority, protected-surface
and credit rules govern this workflow. Historical throughput, administrative
merge and blanket rebaseline exceptions are superseded by that protocol.

Batching shares discovery and conflict diagnosis. It does not make a combined
board's PASS evidence valid for different intermediate squash candidates.

## 1. Intake and authority

Resolve each selected PR's open/draft state, current head/base, target, contributor
and write authority. Read the diff and current freeze state, and check active
worktree ownership. Hold any item another session is working. A request to analyze
or prepare a list is not authority to merge or close it.

Run `scripts/quality/check-skill-contract.mjs` against the actual installed skills
root before admission. Missing or drifted modeled instructions mean HOLD; a
template-only check does not verify the installation being used.

Show a 1–5 star table with rationale, overlaps and holds. Stars prioritize work;
they do not waive required checks or protected-surface approval. Ask the owner
before acting on low-star items or dispatching rework not already authorized.
For a subsumed item, prove the current behavior and obtain the separate per-item
closure decision; preserve the original PR when its work is being used.

Completion: selected scope, target, ownership and permitted actions are explicit.

## 2. Build the diagnostic board

Pin the approved live base and record the ordered PR heads. Use one owned branch
and worktree under `.claude/worktrees/`, with active hooks and dependencies
matching the candidate lockfile. Verify dependency identity instead of assuming a
copy from the shared checkout is current. Do not install over shared hard links.

Board the selected refs and verify each is an ancestor of the combined head.
Resolve overlaps without dropping sibling behavior or contributor attribution.
Keep unrelated worktrees and the shared checkout untouched; never use git stash.
Parallel preparation needs authorized delegation and disjoint write ownership.

Completion: the board has a recorded base, ordered heads, final SHA/tree and a
scoped diff that contains every intended change and reconciliation.

## 3. Diagnose and repair

Run the applicable static profile and focused tests with their actual collectors.
Keep stdout/stderr, exits, signals, versions and identities. These are PARTIAL
evidence, not merge acceptance. Full workflow evidence can be supplied by the
approved server queue; it need not be redundantly simulated for every local probe.

Compare a failed requirement on the exact pinned base under comparable runtime
and installation before attributing it. Record resource/setup interruptions
separately. Controlled repetitions may diagnose instability; a later PASS does
not erase an earlier required FAIL. Preserve assertions, thresholds and baselines.

Apply every required conflict, i18n, documentation and code reconciliation to
the candidate before its acceptance. Do not deliberately land a red tip and
promise a follow-up after distributing the batch.

Completion: proven defects have scoped RED/GREEN evidence, and remaining failures
or incomplete lanes have explicit dispositions without green-by-bypass.

## 4. Admit each actual landing

Use the shared merge gates for every selected PR/group. Resolve its current base,
head, tested candidate and policy again. Require all applicable required lanes,
including `Gate / CI`, `Gate / Quality` and requirements outside those aggregates.
Draft skips, MERGEABLE, a green board, an old head and inherited failures are not
acceptance. A changed identity returns the item to validation.

Use an approved server-enforced queue or reviewed identity-preserving protocol
for each actual landing. `gh pr merge --match-head-commit` guards the head only;
it does not atomically guard the base or replace missing required checks. If the
tool cannot preserve the tested candidate or exclude a race, HOLD.

Merge only the owner-authorized item after protected-surface approval where
applicable. Keep contributor fixes in their authorized branch; a locked fork
needs the shared credit-preserving fallback, not a direct protected-branch push.
Administrative bypass, trust approval and release/deploy authority are separate
exceptional decisions, never inferred from a batch request or star rating.

Completion: the actual landed identity has current required evidence and the
specific authority for that mutation, or the item remains prepared/HOLD.

## 5. Readback and handoff

Verify merged state, actual SHA/tree and contributor credit. Refresh and validate
the resulting base before admitting the next landing. Report prepared, integrated
and currently validated separately; a partially landed batch is not a full PASS.

Retain an ordered ledger of PRs, base/head/candidate/landing identities, checks,
receipts, contributor attribution and holds in the owned private task artifacts.
Close only separately authorized items and use the shared credit rules. Preserve
evidence before safe teardown of worktrees created for this batch; never remove
another session's work or leave the shared checkout on a different branch.
