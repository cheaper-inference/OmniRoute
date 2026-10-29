---
title: Relay integration queue
---

# Relay integration queue

The opt-in `relay-integration` rule in `.mergify.yml` handles one precomposed,
owner-reviewed PR. It does not enable Mergify batching, change a subscription,
replace contributor PRs, or waive their acceptance requirements. Ordinary PRs
continue through the `release` squash queue.

## Routing and admission

The integration rule requires all of these conditions:

| Condition             | Required value                             |
| --------------------- | ------------------------------------------ |
| Base                  | `release/v3.8.52`                          |
| Head branch           | `fix/relay-integration-candidate-20261015` |
| PR author             | `diegosouzapw`                             |
| Owner approval labels | Both `queue` and `integration-reviewed`    |
| PR state              | Non-draft and conflict-free                |
| Merge/update methods  | `merge`, preserving original commits       |

The ordinary queue excludes the integration label and reserved candidate branch
prefix. A missing label or changed target must leave the candidate unqueued, not
silently squash contributor history. The integration rule retains every ordinary
merge condition and additionally requires affirmative `Gate / CI` and
`Gate / Quality` results. Its timeout remains 240 minutes. No new failure allowance,
paid batch setting, bypass identity, rebase or fast-forward push is configured.

The contract is tested in `tests/unit/mergify-queue-config.test.ts`. That local test
checks configuration semantics; it is not evidence that the service has activated
the rule or that an integration candidate passed CI.

## Activation is a separate prerequisite

Mergify reads configuration from the repository's default branch. A configuration
PR cannot activate its own new queue merely by containing the rule. First verify
that the configuration change was admitted through the existing policy, is present
on the default branch, and is accepted by the service. Do not label an integration
candidate before this readback. If existing base failures prevent that initial
landing, report the bootstrap HOLD; do not bypass checks, push directly to the
release, change repository settings, or purchase a plan.

The rule uses a single precomposed PR and ordinary merge commits rather than the
paid batch feature. Service configuration acceptance and account availability must
still be verified before use; a local YAML test cannot establish either.

## Preparing the candidate

1. Obtain approval for the exact selected PR group and every protected instruction
   hunk. Check release-freeze state and coordinate ownership with every active
   session. Do not move, merge or queue another session's in-flight branch.
2. In an owned worktree, record the live base, ordered original PR head SHAs and
   contributors. Integrate those exact commits with merge commits, not copies,
   squash or rebase. Required repairs stay on their original authorized PR branches;
   refresh the candidate after those branches change.
3. Verify every selected head is an ancestor of the candidate. Review the complete
   resulting diff, translations, generated artifacts and changelog credit. Preserve
   original PRs; never close them after copying their work.
4. Record candidate SHA/tree, lockfile, toolchain and check receipts. Require a clean
   dependency installation for full acceptance and every applicable mandatory lane
   on the actual current candidate. Focused, quick, borrowed-dependency and draft
   receipts are not acceptance. Resolve failures before queueing.
5. Recheck the base, original heads, candidate, ownership and policy immediately
   before applying both approval labels. Any changed identity returns to validation.
   If an original head moves while queued, stop admission and rebuild/review the
   group; do not claim the later head was tested.

The manual train described in [MERGE_TRAIN.md](MERGE_TRAIN.md) may help construct
a diagnostic candidate. Its historical validate-once/merge-many shortcut does not
admit this group or different intermediate squash trees. This queue is for the
reviewed combined landing only; it is not permission to land a red intermediate.

## Readback

After the server-enforced merge, verify the actual landed tree, each original
head's ancestry, original PR merged states and contributor attribution. A PR whose
head changed may remain open; do not close it manually to make the group look
complete. Validate the resulting base and report any divergence. Deployment and
release publication require separate authority.

GitHub can mark a PR merged indirectly when its commits become reachable from
the base, even without its individual protection checks passing. Therefore a
merged badge is not a substitute for the complete candidate's validation receipts.

References: [Mergify configuration source](https://docs.mergify.com/configuration/file-format/),
[merge strategies](https://docs.mergify.com/merge-queue/merge-strategies/),
[GitHub indirect merges](https://docs.github.com/en/pull-requests/reference/pull-request-merges).
