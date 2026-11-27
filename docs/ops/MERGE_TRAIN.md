---
title: Merge Queue & Manual Merge-Train Runbook
---

# Merge Queue & Manual Merge-Train Runbook

## Landing on a release branch

The omni-queue governs landings into `release/vX.Y.Z`. Read the top-level `mode` in
`config/merge-queue/config.json` on the default branch before landing a PR. See [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** runs validation and leaves landing to a manual merge. Apply `omni-queue`
  to the approved PR at its final head. Check eligibility with `npm run queue -- why <PR>`.
  Wait for the verdict for that head in `npm run queue -- history --base <branch>`.
  Proceed on `would-land`. On `culprit-found` or `would-dequeue`, hold the merge and fix the cause.
- **Shadow exceptions.** A train with green full CI against the current base tip can proceed
  without a separate queue verdict. The same exception applies when the PR head already
  contains the current base tip.
- **`live`** uses the `omni-queue` label to trigger landing. The queue alone lands the PR.
  Leave merge commands and direct pushes to the queue.

Every landing requires the owner's authorization and the applicable required checks.
Apply `omni-queue` only after the owner has authorized landing. Queued PRs touching protected
paths also require the owner's `protected-approved` decision for that PR.

The "Require green gates on the active release" ruleset requires green `Gate / CI` and
`Gate / Quality` on the head. Never use `--admin` to bypass a red gate.
A release freeze blocks merges into the frozen branch. See [Hard Rule 21](HARD_RULES_DETAIL.md).
Never label, merge or push to a pull request that another session is working.
See [Hard Rule 22](HARD_RULES_DETAIL.md).

## The train pull request

1. Start a train branch at the current release base tip. Integrate the exact approved
   member heads using merge commits. Preserve their commit history by avoiding squash
   and rebase.
2. Open one pull request for the train branch. Validate that PR with its own full CI
   on the current base tip. Recheck the base tip and the approved member heads before
   landing. Refresh the train and its CI when the validated candidate changes.
3. Land the train PR with a merge commit under the applicable queue mode. In live mode,
   the queue's `merge-ff` landing method preserves the merge commits. The original
   member heads become reachable from the release branch. GitHub marks the member PRs
   as merged and the commits retain their authors.

A public example is [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071).
It combined 18 member PRs and landed with a merge commit on 2026-11-24.

A sync-back from `main` to the next release branch also lands through a merge commit.
Preserving `main` ancestry is required for later sync-backs. See
[Worktree Isolation](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## The local merge-train validator

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

The validator fetches the base and PR heads and combines them in a disposable worktree.
It runs its parity suite once on the resulting tree. A failed head fetch or merge conflict
ejects that PR and the script continues with the remaining PRs.

- **`--plan`** prints the selected mode's steps and exits without creating a worktree
  or contacting the remote. Combine it with `--fast` to inspect the fast plan.
- **`--fast`** runs the common static gates, the selected changed `node:test` files under
  `tests/unit/`, and `npm run test:vitest`. Run a full local validation at least once a day
  on the accumulated tip when using fast mode.
- **Full mode** adds the full-only static gates and runs `npm run test:unit` and
  `npm run test:vitest`.

A failing static gate is rerun on the untouched base if the base probe is available.
The script reports inherited failures and continues when every recognized violation
line also appears on the base and the total count has not grown.

| Exit | Meaning                                                                                                                      |
| ---- | ---------------------------------------------------------------------------------------------------------------------------- |
| `0`  | Printed the plan or completed the suite. The suite summary lists any inherited static failures and ejected PRs.              |
| `1`  | Invalid arguments, no Git checkout, failed preflight, or no PR boarded.                                                      |
| `2`  | A suite check failed and did not qualify as inherited. The operator can bisect the batch, eject the offending PR, and rerun. |

A local pass supplies diagnostic evidence for the owner's dossier only. Each landing
still requires owner authorization, its own required checks, and the shadow queue
verdict when applicable.

## Tiering

- **Per PR.** CI and Quality select checks based on the changed paths. Code PRs run
  fast quality gates and impacted tests, with separate unit and Vitest jobs in CI.
- **Per queue candidate.** CI and Quality run the full profile for the composed
  candidate on its queue ref.
- **Per release tip.** Release-Green runs quick hard gates on pushes that match its
  path filters. Three scheduled runs per day use the full sweep for the release branch.
- **Per release.** The full CI matrix includes E2E shards, package validation,
  tarball boot smoke, and coverage checks. See the [Release Checklist](RELEASE_CHECKLIST.md).

## Fresh-checkout prerequisites for `merge-train.sh`

The preflight runs before creating worktrees. Install dependencies with `npm ci`.
Confirm that `node_modules/.bin/tsc` is executable and that `node_modules/node_modules`
is absent. Check that `node_modules/.bin/bun --version` succeeds.

If the Bun postinstall was skipped, run `(cd node_modules/bun && node install.js)`.
The provider consistency and known-symbol checks use Bun. The validator runs
`npm run check:cycles:ratchet` as a blocking gate. The standalone `npm run check:cycles`
command is advisory.

## History

The Mergify merge queue was retired on 2026-11-19.
