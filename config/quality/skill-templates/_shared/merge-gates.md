# Merge gates: current candidate, explicit authority

Read `base-green.md`, `validation-gate.md`, `protected-surfaces.md` and
`credit-preservation.md`. This protocol replaces historical fast-train, old-head
and base-red administrative exceptions. It never authorizes a merge by itself.

## 1. Freeze and authority immediately before mutation

Require owner authorization for the selected PR/group and explicit per-PR approval
for protected instruction surfaces. Read current freeze state and intended release
branch immediately before admission. If the authorized target is frozen, HOLD.
A new development branch or retarget is a new candidate: review scope, refresh the
owner decision where needed, and validate before merging. Never retarget and merge
in one block using the previous target's checks.

## 2. Base and head verification

Resolve live base SHA, head SHA and tested combined candidate SHA/tree. Confirm
the PR is still open and no other session owns active changes. Default contributor
target is the approved active release; infrastructure companions may explicitly
target main. Do not infer the target from stale local refs or the default branch.

Any head/base/policy change invalidates the receipt. Require successful applicable
checks for the new identity. Draft skips, `MERGEABLE`, a head-only stamp or lack of
branch protection is not acceptance. Recheck immediately before the merge; where
available use server-enforced required checks/merge queue (omni-queue on release branches,
§9) and expected-head matching.
If a race cannot be excluded or the tool cannot preserve the tested candidate,
HOLD rather than pretend a read-then-write sequence is atomic.

## 3. Failure discrimination

Reproduce the same signature on the exact base under comparable environment before
calling it inherited. A content read can establish a static defect but cannot
replace runtime execution. Different SHA/runtime/install state is not a valid
comparison. A closed issue, common failure name or frequency is not causal proof.

Collect evidence for infrastructure/resource failures; shutdown alone does not
prove OOM. Alternating controlled runs are needed to call a failure flaky. Do not
cancel another session's jobs or classify a slow job as hung from elapsed time alone.
Required base-red/DRIFT/infra failures block admission until repaired and revalidated.

## 4. No green-by-bypass

Do not use `--admin`, override rules, approve unreviewed fork code or change baselines
to bypass a failed/incomplete required gate. Emergency authority, if requested by
the owner, is a separate exceptional decision with explicit scope, risks and audit;
it does not convert the result into PASS. Routine merge authority grants none of it.

## 5. Changelog and credit

Prefer one changelog fragment per PR where the release supports it. Preserve sibling
entries during resync and validate integrity. A changelog-only change still changes
the candidate and needs the applicable policy's checks. Never reuse an old full PASS
as a blanket exemption. Record actual contributor author/co-author attribution.

Merge-commit identity: when the PR is the owner's own (release, sync-back, base-red or
post-release fix), pass `--author-email 8016841+diegosouzapw@users.noreply.github.com` to the
merge; without it GitHub writes the account's private default e-mail into the squash or merge
commit (v3.8.54: 61be5406 on `main`, e23b4395 and 5340875b on `release/v3.8.55`). Never rewrite
a protected branch to fix it after the fact; `.mailmap` already maps the old address.

## 6. Locked forks

If push authority is missing, keep the original PR open and follow the owner-reviewed
credit-preserving fallback. Use a separate repair PR with original author/co-author
and explicit public credit when appropriate; do not reset/overwrite the contributor
branch or land directly on a protected release. The replacement candidate must pass
its own gates. Closing the original requires separate per-item owner authorization.

## 7. Batch/train validation

A train can diagnose interactions and validate its exact final candidate. It cannot
authorize different intermediate squash trees or later heads. Each actual landing
must satisfy required candidate checks through an approved server queue or another
reviewed identity-preserving protocol; on a release branch the landing step is the one §9
gives for the queue's current mode. `--fast` and a once-daily full run are partial
evidence only. Record base, ordered heads, final SHA/tree, policy and all receipts.

Run in an owned isolated worktree with matching dependencies and bounded resource
allocation. Never commandeer a runner's active `_work` directory, change global git
configuration, or deploy/build on a live service host just because it appears idle.
Remote execution needs authorized capacity; failure/unreachability means HOLD.
Keep real exit status; never fall back to a smaller command after a failed full gate.

## 8. Readback and companion fixes

After an authorized merge, verify actual merged state/SHA/tree and contributor credit.
Refresh the base and validate its post-merge state; report divergence immediately.
Prepare a main companion for gate/infra fixes when semantically applicable, on its
own current main base. Preserve main-specific baselines and dependencies. Opening
a companion is not authority to merge it, and release success is not main success.

Update only owned private plans and retain evidence before any safe teardown.
Report prepared versus integrated versus currently validated separately.

## 9. omni-queue: who lands a PR on a release branch

Mergify is retired: do not apply the `queue` label and do not rely on it. Release branches
(`release/vX.Y.Z`) are served by omni-queue (`docs/ops/OMNI_QUEUE.md`). What you do depends on the
queue's mode, so read it first, every time, from the default branch:

```bash
DEFAULT=$(gh api repos/cheaper-inference/OmniRoute --jq .default_branch)
gh api "repos/cheaper-inference/OmniRoute/contents/config/merge-queue/config.json?ref=$DEFAULT" \
  -H "Accept: application/vnd.github.raw+json" | jq -r .mode    # shadow | live
gh api repos/cheaper-inference/OmniRoute/actions/variables/OMNI_QUEUE_ENABLED --jq .value
# "true" = the queue runs; a 404 or "false" = it is off
```

**Off, or `shadow`** (the state since 2026-11-19): the queue lands nothing. Merges are manual,
exactly as §1–§8 say. The server enforces part of §2: the ruleset "Require green gates on the
active release" refuses any merge into the default branch whose head lacks a green `Gate / CI` and
`Gate / Quality`, and it has no bypass, so `--admin` cannot pass a red gate there (§4 stands). A PR
that is red only for an inherited base failure waits for the base repair; it is not merged around
it.

In shadow mode the queue is also the pre-merge test (owner's rule, 2026-11-20). Green checks on a
PR head prove the PR against the base they ran on, not against today's base: #19132 had green
gates from 2026-11-18, touched no file the base had changed since, and alone on the 2026-11-20
base it failed an integration test that had landed in between. A manual merge would have turned
the release red; the shadow queue isolated it as the culprit first. So, before a manual merge into
a release branch:

1. **Label.** The PR carries the `omni-queue` label at its final head (plus `protected-approved`
   when the owner approved a protected surface for it). The session that is about to merge it,
   with the owner's authorization, applies the label; nobody labels a PR it is not about to merge.
2. **Wait for the verdict on that exact head.** The queue composes the PR on the current base, runs
   the full CI on the candidate and records the result:

   ```bash
   npm run queue -- history --base release/vX.Y.Z --limit 200 | grep -w "#<PR>"
   npm run queue -- why <PR>     # "shadow-processed: head <sha> …" = this head has a verdict
   ```

   - `would-land` → merge by hand as §1–§8 say, then remove the `omni-queue` label if it is still
     there.
   - `culprit-found` or `would-dequeue` → do NOT merge. Apply the `hold` label, tell the author
     which check and which test failed on the candidate (the run of the candidate branch
     `omni-queue/<base>/<batch>-…` has the log) and what the likely fix is, and send the PR back
     through the fix flow. A new push needs the label and a verdict again.
   - No verdict yet is not a verdict: a busy queue is not a reason to merge around it.

3. **A verdict is for the base it was tested on.** Merge soon after it. If the base has since moved
   in a file the PR touches, or `git merge-tree` of the base tip and the head is not clean, label
   again and wait for a new verdict. "The base only moved in files the PR does not touch" is no
   longer enough by itself to merge a PR whose checks are old: it only says an existing verdict is
   still good.
4. **Merge trains.** A train whose own full CI ran green on the current base tip is the same
   validation for its members (the train's candidate is the thing tested): they need no separate
   verdict. Do not label the train PR itself.
5. **A head that already contains the base tip.** When the base tip is an ancestor of the PR head
   (`git merge-base --is-ancestor <base tip> <head>`: a branch just updated from the base, a
   sync-back merge) and the PR's gates are green on that head, those checks are about today's
   base: no separate verdict is needed. If the base moved after that, item 3 applies.

Do not remove the queue's labels or comments from a PR you are not merging.

**`live`**: a PR reaches a managed release branch only through the queue. Do not run a merge
command against that branch: its ruleset requires the `omni-queue/land` status and refuses the
merge. After the usual gates (§1–§3) and the owner's authorization, the landing step is to apply
the `omni-queue` label (plus `protected-approved` when the owner approved a protected surface for
that PR). Only an approver's label counts (`approvers` in `config/merge-queue/config.json`), and a
push after the label needs the label again. Then follow the PR, not the clock:
`npm run queue -- why <PR>` says why it is or is not eligible, and the dashboard issue (label
`omni-queue-dashboard`) shows the batch. Proof of landing is the PR in state MERGED with its
commits on the base (§8 readback), never the label.

- The queue re-runs the failed jobs of a red batch once, then finds the culprit; a PR it takes out
  of the queue is told why on the PR. Fix it and label it again; do not re-label an unchanged head.
- `omni-queue-hotfix` (next batch, alone) and `omni-queue-base-repair` (the only work accepted
  while the base is paused as red) are lanes for an owner-authorized hotfix or base repair, never a
  way to jump the line.
- A paused base is not yours to resume unless you own the repair: read "Incidents" in the runbook,
  report, and HOLD.
- `bless` (the queue writing the land status on a commit by hand) is the emergency exit and the
  owner's decision, per commit.

In every mode: never push to, edit or delete `omni-queue-state` or `omni-queue/**` (only the
queue's App may), and never change `config/merge-queue/**`, `scripts/merge-queue/**` or the queue
workflows without the owner's explicit approval (protected surface).
