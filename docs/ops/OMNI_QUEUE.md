---
title: "omni-queue — OmniRoute's own merge queue"
---

# omni-queue: OmniRoute's own merge queue

`omni-queue` is the merge queue OmniRoute runs on its own GitHub Actions minutes, built to replace
the Mergify queue described in [MERGE_TRAIN.md](MERGE_TRAIN.md). It ships **inert**: nothing runs
until the repository variable OMNI_QUEUE_ENABLED is `true`, and the default `mode` in
`config/merge-queue/config.json` is `shadow` (compose and test, never land). Until the owner
approves the cut-over (see [Cut-over and rollback](#cut-over-and-rollback)), Mergify and the
`queue` label stay the default merge path.

## Why

- **Cost.** Mergify bills per active contributor seat, and batching with automatic bisection is a
  paid feature ("Cannot use Merge Queue batch" on the free plan, #7220). omni-queue costs the CI
  minutes it uses and nothing else.
- **Throughput.** One CI run validates a batch of up to `batch.maxSize` PRs (6 by default). With
  6 green PRs per batch, 30 PRs land in about 5 full CI runs instead of 30. A red batch costs
  roughly log2(N) extra runs to isolate the culprit.
- **The tested tree is the tree that lands.** The default landing mode pushes the exact
  candidate commit that CI validated. No intermediate, untested tree ever reaches the base.
- **PRs stay "Merged" with their contributors' credit.** Every PR head becomes an ancestor of the
  base, so GitHub marks each PR as merged by its own author's commits.
- **House rules no product sees**: release freeze (Hard Rule #21), agent-instruction surfaces,
  `hold` labels and a red base are all part of the eligibility rules below.

## Design at a glance

```text
approver labels the PR `omni-queue`
        │  (pull_request_target: labeled)
        ▼
job "approval" ── approve.mjs writes commit status omni-queue/approval = success
                  on the head SHA of the labeled event, the head the approver saw
                  (App token, creator <appSlug>[bot])
        │
        ▼
job "tick" (every 5 min, on label changes and when a candidate's CI completes;
            one global concurrency group omni-queue-tick: a running tick is never
            cancelled; a newer waiting tick replaces an older waiting one, which shows
            up as a "cancelled" omni-queue run and is harmless)
  1. load state/<base>.json from branch omni-queue-state (compare-and-swap)
  2. nothing in flight → pick up to batch.maxSize eligible PRs, FIFO by approval time
  3. compose in a scratch bare repository: git merge-tree --write-tree + git commit-tree,
     one merge commit per PR, base first-parent chain
  4. push the candidate as a NEW branch omni-queue/<base>/<batchId>-<sha12>
       → ci.yml + quality.yml run their full profile (as for merge_group today)
  5. later ticks read the candidate's checks:
       green   → land (merge-ff push) or record "would-land" (shadow)
       red     → classify: infra retry | base check | bisect | culprit
       timeout → infra path
  6. save state (CAS) and regenerate the dashboard issue
```

The entry points are `scripts/merge-queue/tick.mjs` (one idempotent tick, the only writer of queue
state) and `scripts/merge-queue/approve.mjs` (binds a label to a head SHA), both run by
`.github/workflows/omni-queue.yml`. Every module under `scripts/merge-queue/` uses Node built-ins
only: the queue workflow never runs `npm ci`, so no third-party install script runs next to the
App token.

| File                                     | Responsibility                                                     |
| ---------------------------------------- | ------------------------------------------------------------------ |
| `scripts/merge-queue/contracts.mjs`      | shared names, state shape, ref naming, merge-commit trailers       |
| `scripts/merge-queue/config.mjs`         | loads and validates `config/merge-queue/config.json`               |
| `scripts/merge-queue/eligibility.mjs`    | which PRs may enter a batch, and why not                           |
| `scripts/merge-queue/checks.mjs`         | verdict of a candidate's check runs and statuses                   |
| `scripts/merge-queue/classify.mjs`       | infra vs base-red vs PR-red                                        |
| `scripts/merge-queue/compose.mjs`        | builds and pushes candidates without a working tree                |
| `scripts/merge-queue/land.mjs`           | `merge-ff` push and `squash-api` landing with the tree guard       |
| `scripts/merge-queue/bisect.mjs`         | bisection state machine                                            |
| `scripts/merge-queue/state.mjs`          | state document on `omni-queue-state` with compare-and-swap         |
| `scripts/merge-queue/github.mjs`         | minimal REST client (retries, pagination, comment-once)            |
| `scripts/merge-queue/dashboard.mjs`      | the per-base dashboard issue                                       |
| `scripts/merge-queue/candidate-base.mjs` | base SHA of a candidate push, read by `ci.yml` / `quality.yml`     |
| `scripts/merge-queue/cli.mjs`            | `npm run queue -- …` for the owner and the skills                  |
| `scripts/merge-queue/apply-ruleset.mjs`  | applies `config/merge-queue/ruleset.release.json` to one branch    |
| `scripts/merge-queue/gitexec.mjs`        | the one way the queue runs git (no shell, token in env, redaction) |

### Candidates

- **Ref name**: `omni-queue/<sanitized-base>/<batchId>-<sha12>`, for example
  `omni-queue/release-v3.8.55/b42-0123456789ab`. The SHA suffix makes every distinct candidate a
  new branch, so the queue **never force-pushes**. An infra retry of the same SHA gets a new batch
  id (`b42-r1`), a CI run on the bare base gets `omni-queue/<sanitized-base>/basecheck-<sha12>`.
- **Merge commits**: one per PR, subject `Merge PR #N: <title> (@author)` (title flattened and
  truncated by `sanitizeTitle`), followed by machine-readable trailers: `Omni-Queue-PR`,
  `Omni-Queue-Head`, `Omni-Queue-Author`, `Omni-Queue-Base`, `Omni-Queue-Target`,
  `Omni-Queue-Batch`. Nothing is written into the tree: CI reads the base SHA from the
  `Omni-Queue-Base` trailer of the top commit (`scripts/merge-queue/candidate-base.mjs`).
- **Skip markers are disarmed**: GitHub skips push workflows when the head commit message carries
  `[skip ci]`, `[ci skip]`, `[no ci]`, `[skip actions]` or `[actions skip]`. A PR title with one of
  them would silence CI on its candidate, so `sanitizeTitle` puts each marker in parentheses
  (`[skip ci]` → `(skip ci)`) before the title reaches a merge commit.
- **Stacked PRs**: a PR whose head is already contained in another PR of the same batch gets no
  merge commit of its own; it lands with the batch and is reported as merged with it.
- **CI profile**: `ci.yml` and `quality.yml` treat a push to `omni-queue/**` like a `merge_group`
  event (full profile, hosted runners). Deploy and publish workflows never run on that prefix.
- **AI attribution over the whole range**: with `merge-ff` the contributors' own commits land
  unchanged, so `ci.yml` runs `check:ai-attribution` over `<candidate base>..<candidate>` (Hard
  Rule #16), not only over the PR metadata.

### Landing modes (`landing.mode`)

| Mode                 | How                                                                                                                                                                                                                                                               | Trade-off                                                                                                                                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `merge-ff` (default) | `git push origin <candidateSha>:refs/heads/<base>` **without force**. If the base moved since composition the push is refused (non-fast-forward): that refusal is the compare-and-swap, the event is `land-rejected` and the next tick recomposes on the new tip. | Atomic; the landed tree is the tested tree; PRs become "Merged" automatically. History gains merge commits (`git log --first-parent` stays readable). Needs the App as a bypass actor of the ruleset's `pull_request` rule. |
| `squash-api`         | Checks that the base tip is still the composed base, then `PUT /repos/{owner}/{repo}/pulls/N/merge` with `merge_method=squash` and `sha=<head>` for each PR in order, then compares the base tree with the candidate tree.                                        | One commit per PR, like Mergify. The writes are not atomic and the intermediate trees were never tested. A tree mismatch pauses the queue (`tree-divergence`) and opens an issue.                                           |

## Eligibility

A PR can enter a batch only when **all** of these hold (`scripts/merge-queue/eligibility.mjs`;
reason codes come from `INELIGIBLE_REASONS` in `scripts/merge-queue/contracts.mjs`):

| Rule                                                                                                                    | Reason code when it fails                      |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| open and not a draft                                                                                                    | `not-open`, `draft`                            |
| base matches `bases` (default `^release/v\d+\.\d+\.\d+$`)                                                               | `base-mismatch`                                |
| carries `label` (`omni-queue` during shadow)                                                                            | `no-label`                                     |
| no label from `blockLabels` (`hold`, `hold-vps`, `do-not-merge`, `wip`)                                                 | `blocked-label`                                |
| no open `release-freeze` issue citing the base (Hard Rule #21)                                                          | `base-frozen`                                  |
| the label was applied by a login in `approvers`                                                                         | `label-not-by-approver`                        |
| a `success` status `omni-queue/approval`, created by the App bot, exists on the **current** head SHA                    | `approval-missing`, `head-changed-after-label` |
| when the diff touches `protectedPaths`: also `protected-approved`, bound the same way (`omni-queue/protected-approval`) | `protected-approval-missing`                   |
| GitHub does not report the PR as conflicting with its base                                                              | `conflicting`                                  |
| not already validated in shadow mode at this exact head, not already in flight                                          | `shadow-processed`, `in-flight`                |

**Truncated file list.** GitHub lists at most 3,000 files of a PR. When the tick receives fewer
files than the PR's `changed_files` (or no count at all), a protected path may be among the
missing ones, so the PR is treated as a protected surface: it needs `protected-approved` too
(`protected-approval-missing`, detail `file list incomplete`).

**Why commit statuses.** "The label was applied after the last push" cannot be decided from
commit dates: they are set by the author and trivially forged. Instead, the `approval` job
writes a commit status on the head SHA that was current when an approver applied the label. A
new push creates a new SHA without that status, so the PR silently stops being eligible until an
approver labels it again. Removing the label writes `failure` on the same context (approval
withdrawn). A label applied by anyone else gets one comment and no status.

- **The status goes on the head of the event**, not on the head the job finds when it runs: a push
  that lands between the label and the job must not inherit the approval.
- **Level-triggered**: the jobs of a quick label/unlabel pair can run in either order, so the job
  re-reads the PR first. `labeled` writes `success` only while the label is still there, and
  `unlabeled` writes `failure` only while it is still absent.
- **Waiting for the status**: a labeled PR without its approval status is simply not eligible
  (`approval-missing`, no action) for up to 6 hours after the label (`APPROVAL_STATUS_SKEW_SECONDS`),
  which absorbs a backed-up Actions queue. After that the queue concludes the head changed after
  the label (`head-changed-after-label`): it removes the label with one comment.
- **Already in the base**: a PR whose head is already reachable from the base (its commits entered
  some other way) leaves the queue for good, with both labels removed and one comment.

The PR's own checks are **not** required (the candidate is what gets validated), but with
`preferGreenPrChecks` the selection prefers PRs whose latest `prGreenCheck` (`Gate / Quality`)
is green, so batches are not wasted on PRs that are already red.

## Accepting a candidate

`scripts/merge-queue/checks.mjs` mirrors the `merge_conditions` the Mergify queue uses today:

- every name in `requiredChecks` (`Gate / CI`, `Gate / Quality`,
  `Merge integrity (changelog + generated skills)`) concluded `success` on the candidate SHA;
- no other check run or commit status in `failure`, `cancelled`, `timed_out`,
  `action_required`, `startup_failure` or `stale`, except the names in `advisoryChecks`
  (`Build (advisory)`);
- nothing pending. Only the latest run per check name counts (re-runs report several);
- a required check counts only as a check run of the `github-actions` app, and only runs started
  by the push of the candidate ref (the `head_branch` of the run's check suite) are read, so a run
  of the same SHA on another branch never decides the verdict;
- no GitHub Actions run at all `NO_RUN_TIMEOUT_MINUTES` (45) after the push → `timeout` with
  reason `no-ci-run` (the push triggered nothing), handled like an infra failure;
- not decided after `checksTimeoutMinutes` (240) → `timeout`, handled like an infra failure.

## Red candidates: classification, base check, bisection

`scripts/merge-queue/classify.mjs` turns every failing run into a signature (the check name with
the matrix shard suffix removed, plus the failing test or gate from its annotations) and decides:

1. **Infra** — every failure carries positive evidence of infrastructure trouble (runner lost,
   `CreateArtifact` 404, "No space left on device", `startup_failure`, a cancellation without any
   failure annotation). The same SHA is retried once under a new ref (`infraRetries`); a second
   infra failure pauses the base with reason `infra`.
2. **Needs a base check** — a `🔴 Release branch not green: <base>` issue (label `base-red`) is open
   and no finished base check exists for this base SHA. The tick pushes a `basecheck-<sha12>`
   candidate with the bare base SHA (same CI profile) and parks the red batch in
   `inFlight.pendingRed`.
3. **Base-red** — the base check is red and every non-infra failure of the batch matches one of
   its signatures. The batch is not guilty: the base is paused with reason `base-red` and the
   pause lifts by itself when the base tip moves (someone landed the fix).
4. **PR-red** — anything else. A batch of one: that PR is the culprit, loses the queue label and
   gets a comment with the failing checks. A larger batch is **bisected**: it is split in halves
   (first half = ceil(n/2), order preserved) and the first half is tested on the base as it is
   at that moment. A green half lands (or would land in shadow) and the next segment is tested; a
   red half is split again. Two culprits in one batch are found the same way.

## State

The queue state lives on the branch `omni-queue-state` (`STATE_BRANCH`), one JSON file per base:
`state/<sanitized-base>.json`, for example `state/release-v3.8.55.json`. It holds the pause, the
candidate in flight (refs, SHAs, PRs, stage, attempts, bisection), the last base checks, the
shadow bookkeeping, counters and the last 200 history events.

- **Why not `omni-queue/state`**: `ci.yml` and `quality.yml` run their full matrix on every push
  to `omni-queue/**`. Keeping the state branch outside that prefix means a state write never
  starts CI. No workflow triggers on `omni-queue-state`.
- **Compare-and-swap**: writes go through the Contents API with the blob SHA that was read. A
  concurrent writer makes the save fail, and the tick re-reads and redoes its work (never a force
  push, never last-write-wins). Every network side effect happens before the save that records
  it, and repeating a tick is safe.
- **Invalid documents are never reset silently**: the tick fails loudly. Do not edit the state
  branch while the queue is enabled; pause first, then fix it with an ordinary commit.

## Dashboard

One issue per base, titled `🚦 omni-queue: <base>` and labelled `omni-queue-dashboard`. Each tick
regenerates its body: the ordered queue with the reason each waiting PR is not eligible, the
candidate in flight with a link to its checks, the pause banner, the last 20 events and metrics
(PRs landed, CI runs per merged PR, red batches, bisections, median and p90 minutes from approval
to landing). The issue is rewritten only when its body changes. A dashboard that stopped changing
is an incident (see below).

## CLI

`npm run queue -- <command>` (`scripts/merge-queue/cli.mjs`) uses the GitHub CLI token
(`gh auth token`). It reads state but never writes it: the workflow is the single writer.

```bash
npm run queue -- status [--base <branch>]          # queue, in-flight candidate, pause
npm run queue -- add <PR...>                       # apply the queue label
npm run queue -- remove <PR...>                    # remove the queue label
npm run queue -- pause <base> [--reason <text>]    # workflow_dispatch action=pause
npm run queue -- resume <base>                     # workflow_dispatch action=resume
npm run queue -- why <PR>                          # eligibility verdict and reasons
npm run queue -- history [--base <branch>] [--limit <n>]
```

`add` only applies the label: the approval is recorded by the `approval` job, under the identity
of whoever ran the command. It counts only if that login is in `approvers`.

The CLI evaluates eligibility with the local config file (`config/merge-queue/config.json`, or the
file in OMNI_QUEUE_CONFIG), so `status` shows the mode of your checkout, not necessarily the one on
the default branch. `--repo <owner/repo>` points it at another repository (default: `gh repo view`).

The same `pause`, `resume` and `dry-run` actions are available from the Actions tab: workflow
`omni-queue` → "Run workflow" → inputs `base`, `action`, `reason`. `dry-run` observes and decides,
prints the plan and writes nothing.

## Shadow mode and live mode

- **`shadow`** (default): the queue composes candidates, runs the full CI on them, bisects and
  classifies exactly as in live mode, but never lands. A green candidate produces a `would-land`
  event; each PR head validated that way is skipped until it changes. Use it to compare the
  batches the queue would land with the merges Mergify actually performs.
- **`live`**: green candidates land through `landing.mode`.
- During shadow, the queue label is `omni-queue`, distinct from Mergify's `queue`, so the two
  never act on the same PR by accident.

`config/merge-queue/config.json` is read from the **default branch** by the workflow, so a mode
change takes effect when it is merged there.

## Kill switch

Every job of `.github/workflows/omni-queue.yml` is skipped unless the repository variable
OMNI_QUEUE_ENABLED is exactly `true` (Settings → Secrets and variables → Actions → Variables).
Setting it to anything else stops the queue at the next event: nothing new is composed, and a
candidate already in flight simply stops being followed (nothing lands). Forks never inherit
repository variables.

The workflow and the orchestrator must exist on the **default branch**: `schedule`,
`workflow_run` and `pull_request_target` always run the default branch's copy of the workflow.

The 5-minute `schedule` trigger only acts on `cheaper-inference/OmniRoute`: both jobs skip a
scheduled run in any other repository (a fork, or the sandbox used for the rehearsal). There,
ticks come from label changes, from a candidate's CI finishing (`workflow_run`), and from a
manual "Run workflow". GitHub may also take a long time to start a cron in a new repository (none
fired during the first hour of the rehearsal sandbox), so the cron is a safety net, never the
main driver: a batch whose window has passed is composed by the next label change, the next
candidate CI completion or a manual tick.

## Actions event policy (`pull_request_target` in public repositories)

The `approval` job runs on `pull_request_target`: it is the only trigger that gives a labeled fork
PR a job with the App secrets, and the job never checks out PR code. GitHub announced that
**from December 2, 2026, `pull_request_target` is blocked by default in public repositories**
unless an Actions policy explicitly allows it, with brownouts before that date
([changelog](https://github.blog/changelog/2026-11-02-pull_request_target-blocked-by-default-december-2),
[docs](https://docs.github.com/en/actions/how-tos/administer/control-workflow-execution)). A
blocked run fails with an error annotation and the workflow does not execute.

Blocked approvals fail closed: no status is written, so no labeled PR becomes eligible and the
queue lands nothing. To run the queue in a public repository, the owner creates an Actions policy
(Settings → Actions → Policies, or the organization's) that targets only the workflow file
`.github/workflows/omni-queue.yml` and allows its events. Policy rules are an allowlist, so list
every trigger of the workflow, not only `pull_request_target`: `pull_request_target`, `schedule`,
`workflow_dispatch` and `workflow_run`. The rehearsal sandbox runs with exactly this policy,
created through the REST API by a repository admin (Team plan):

```bash
gh api -X POST -H "X-GitHub-Api-Version: 2026-03-10" \
  repos/cheaper-inference/OmniRoute/actions/policies --input policy.json
```

```json
{
  "name": "Allow omni-queue workflow events",
  "enforcement": "active",
  "conditions": {
    "workflow_path": { "include": [".github/workflows/omni-queue.yml"], "exclude": [] }
  },
  "rules": [
    {
      "type": "restrict_action_events",
      "parameters": {
        "allowed_events": ["pull_request_target", "schedule", "workflow_dispatch", "workflow_run"]
      }
    }
  ]
}
```

The policy only targets the queue workflow: `ci.yml`, `quality.yml` and every other workflow keep
running as before.

## Installing the GitHub App

The queue pushes with a GitHub App installation token: refs pushed with the `GITHUB_TOKEN` do not
trigger workflows, so a candidate pushed with it would never get CI. Creating the App is an owner
action.

1. Organization settings → Developer settings → GitHub Apps → **New GitHub App**.
2. **GitHub App name**: `omni-queue`. The slug must match `appSlug` in
   `config/merge-queue/config.json` (the queue trusts statuses created by `<appSlug>[bot]`); if the
   name is taken, change `appSlug` to the slug GitHub assigns.
3. **Homepage URL**: the repository URL. **Webhook**: untick "Active" (the queue needs no webhook).
4. **Repository permissions**:

   | Permission      | Access         |
   | --------------- | -------------- |
   | Contents        | Read and write |
   | Pull requests   | Read and write |
   | Issues          | Read and write |
   | Commit statuses | Read and write |
   | Workflows       | Read and write |
   | Checks          | Read-only      |
   | Actions         | Read-only      |
   | Metadata        | Read-only      |

   No organization or account permissions. No events to subscribe to. **Workflows** is needed
   because GitHub refuses a push that adds or changes a file under `.github/workflows/` unless the
   token has that permission: without it, every candidate (and every `merge-ff` landing) that
   contains a PR touching a workflow would be rejected.

5. **Where can this GitHub App be installed?** → "Only on this account". Create the App and note
   the **App ID** shown on its page.
6. **Private keys** → "Generate a private key". A `.pem` file downloads; keep it in the vault and
   delete the local copy after step 8.
7. **Install App** → the organization → "Only select repositories" → pick the repositories (first
   the rehearsal sandbox, the production repository only at the cut-over).
8. In each selected repository: Settings → Secrets and variables → Actions:

   ```text
   Secrets:    OMNI_QUEUE_APP_ID            the App ID from step 5
               OMNI_QUEUE_APP_PRIVATE_KEY   the full contents of the .pem from step 6
   Variables:  OMNI_QUEUE_ENABLED           "true" only when the queue should run
   ```

9. Create the labels if they do not exist yet: the queue label (`omni-queue`),
   `protected-approved` and `omni-queue-dashboard`.

The workflow mints a short-lived token per job with `actions/create-github-app-token` and narrows
it to what that job needs (the `approval` job writes statuses and comments only).

## Ruleset

`config/merge-queue/ruleset.release.json` is the protection for **one** release branch:

- `deletion` and `non_fast_forward`;
- `pull_request` with 0 required approvals and every other flag off (as today);
- **no required status checks**: the queue validates the candidate, not the PR;
- bypass actors: the `omni-queue` App (`Integration`, id from `--app-id`), so the `merge-ff`
  landing push is accepted although it is not a PR merge, and the repository **admin** role
  (`RepositoryRole` 5), for sync-back fast-forward pushes and hotfixes.

Rulesets stack, and **a ruleset's bypass list only covers that ruleset's own rules**. Two
existing repository rulesets also match release branches:

| Ruleset (id)                              | Matches                | Rules                            | Effect on the landing push                                                                                                                |
| ----------------------------------------- | ---------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| "Protect release branches" (15605329)     | `refs/heads/release/*` | `deletion`, `non_fast_forward`   | None: nobody, the App included, can delete or force-push a release branch, and the landing push is a fast-forward.                        |
| "Require PR on default branch" (21899981) | `~DEFAULT_BRANCH`      | `pull_request`, no bypass actors | **Rejects it** on whichever release branch is the default branch (the active release): the App bypass in our ruleset does not cover this. |

So, at the cut-over, the owner must also either add the `omni-queue` App (`Integration`, the App
ID, bypass mode `always`) to the bypass actors of "Require PR on default branch", or exclude the
release branches from it. Without one of the two, the queue lands everywhere except on the active
release. The sandbox rehearsal recreates an equivalent `~DEFAULT_BRANCH` `pull_request` ruleset to
exercise this.

`scripts/merge-queue/apply-ruleset.mjs` creates the ruleset `omni-queue release protection: <base>`,
updates it when its normalized content drifted, or leaves it alone, printing a readable diff:

```bash
# preview: prints the diff and the REST body, writes nothing
node scripts/merge-queue/apply-ruleset.mjs --base release/v3.8.55 --dry-run \
  --repo cheaper-inference/omni-queue-sandbox --app-id <app-id>

# apply on the sandbox
node scripts/merge-queue/apply-ruleset.mjs --base release/v3.8.55 \
  --repo cheaper-inference/omni-queue-sandbox --app-id <app-id>
```

- `--repo` defaults to `GITHUB_REPOSITORY`, `--app-id` to `OMNI_QUEUE_APP_ID`. A real apply
  without an App id is refused (the landing push would be rejected).
- The token comes from `GITHUB_TOKEN`, else from `gh auth token`; it needs administration access
  to the repository.
- **Production lock**: a real apply on `cheaper-inference/OmniRoute` (or its old name
  `diegosouzapw/OmniRoute`) is refused unless `OMNI_QUEUE_ALLOW_PRODUCTION_RULESET` is `1`.
  The `--repo` string is checked before any API call; before any write the repository is also
  resolved through the API (`GET /repos/{repo}`, which follows renames and transfers) and the
  check repeats on the returned full name. `--dry-run` is always allowed.
- **Landing-path check**: after the apply (or the preview) it reads every rule GitHub enforces on
  the branch (`GET /repos/{repo}/rules/branches/{base}`, organization rulesets included) and lists
  the rules from **other** rulesets that would reject the App's fast-forward push (`pull_request`,
  `required_status_checks`, `update`, `required_linear_history`, `required_signatures`, and the
  other types in `LANDING_BLOCKING_RULE_TYPES`) because the App is not an `always` (or `exempt`)
  bypass actor of that ruleset. On `--dry-run` this is a warning; on a real apply the script exits
  `1`, after writing its own ruleset, until those rulesets are fixed. Rules whose ruleset is not
  readable with the token count as not bypassed.
- Exit codes: `0` ok, `1` failure (API error, or a foreign rule blocks the landing push), `2` usage
  error or refused.
- Run it once per new release branch, after the branch is cut.

## Security posture

- **No PR code runs in the queue workflow.** Both jobs check out the default branch (sparse:
  `scripts/merge-queue` and `config/merge-queue`) and run zero-dependency Node scripts. PR content
  is handled only as git objects in a scratch bare repository (`git merge-tree` /
  `git commit-tree`); no working tree of PR code is ever created.
- **Candidates run with repository secrets**, the same posture as Mergify's draft PRs today: a
  candidate contains fork code and `ci.yml` / `quality.yml` run on it. The approver's label is the
  authorization, so review a PR before labelling it.
- **Hosted runners only.** The queue jobs run on `ubuntu-latest`, never on a self-hosted runner,
  and the candidate CI uses the hosted lanes of the `merge_group` profile.
- **No deploy or publish on `omni-queue/**`**: VPS deploy, Docker and npm publication never
  trigger on candidate branches.
- **Least privilege**: one App token per job with only the permissions that job needs; the
  workflow's own `GITHUB_TOKEN` is read-only.
- **Untrusted text**: PR titles are flattened by `sanitizeTitle` before they reach a commit
  message and escaped in the dashboard; git runs through `scripts/merge-queue/gitexec.mjs` (no
  shell, token in the environment as an HTTP header, redacted errors).
- **Approvals are bound to SHAs**, never to commit dates (see [Eligibility](#eligibility)).

## Incidents

**Base-red.** The dashboard shows a `base-red` pause and the `🔴 Release branch not green: <base>`
issue links the base check. The batch is innocent and stays queued. Fix the base through its own
`fix/release-vX.Y.Z-basereds` PR (AGENTS.md → "Base-green check"); the pause lifts by itself
when the base tip moves. If the
failure turns out to be flaky and the tip will not move soon, resume by hand:
`npm run queue -- resume <base>`.

**Pause and resume.** `npm run queue -- pause <base> --reason "<text>"` freezes one base (reason
`manual`): its ticks do nothing, and a candidate in flight is picked up again after
`npm run queue -- resume <base>`. To stop everything at once, use the kill switch.

**Recomposition when the base moves.** A `land-rejected` event means the base advanced between
composition and landing (a manual merge, a sync-back, a hotfix). Nothing is lost: the next tick
composes the same PRs on the new tip and runs CI again. Frequent `land-rejected` events mean
something else merges into a managed base; route those merges through the label instead.

**Tree divergence (`squash-api` only).** The base tree after the squash merges differs from the
candidate tree. The queue pauses with reason `tree-divergence` and opens an issue. Compare the
two trees (`git diff <candidateSha> <base>`), fix the base by PR if needed, then resume. Prefer
`merge-ff`, which cannot diverge.

**Infra failure or timeout.** One retry under a new ref (`-r1`); a second failure pauses the base
with reason `infra`. Check the Actions status page and the candidate's run, then resume. A
`checks-timeout` event whose detail says "no CI run for candidate" means GitHub never started a
workflow for the candidate push: check the Actions policies and that `ci.yml` / `quality.yml`
still trigger on `omni-queue/**`.

**Dashboard stopped updating.** Check, in order: the latest `omni-queue` runs in the Actions tab;
the OMNI_QUEUE_ENABLED variable; the App secrets (a rotated key or an uninstalled App fails at the
token step); a tick failing on an invalid state document (fix it with an ordinary commit on
`omni-queue-state` while paused); a queue run that is pending forever (only one tick runs at a
time, by design).

**Dequeued PR.** The PR lost the label and got a comment with the reason (culprit of a red batch,
conflict with the base, head moved after approval, head already part of the base). Fix it and
label it again; a PR already in the base needs nothing more.

**Labels with no effect.** If labeled PRs stay `approval-missing` and no `omni-queue/approval`
status appears on their heads, the `approval` job is not running: look for failed
`pull_request_target` runs with an "is not allowed to trigger Actions workflows" error (see
[Actions event policy](#actions-event-policy-pull_request_target-in-public-repositories)).

## Cut-over and rollback

The cut-over is a separate owner decision, taken after the sandbox rehearsal and a few days of
shadow mode on the real repository. In order:

1. Stop Mergify from acting on release PRs (remove its queue rules in a PR that also updates
   `tests/unit/mergify-queue-config.test.ts`) and drain or remove the remaining `queue` labels.
2. Merge `mode: "live"` into `config/merge-queue/config.json` on the default branch.
3. Apply the ruleset to every active release branch:
   `OMNI_QUEUE_ALLOW_PRODUCTION_RULESET=1 node scripts/merge-queue/apply-ruleset.mjs --base <branch> --repo cheaper-inference/OmniRoute --app-id <app-id>`.
   With the owner's approval, add the App (`Integration`, the App ID, `always`) to the bypass
   actors of "Require PR on default branch" (21899981), or exclude the release branches from it
   (see [Ruleset](#ruleset)). The script exits `1` while any foreign rule still blocks the landing
   push; rerun it until it exits `0` on every branch.
4. Make sure the Actions policy that allows `.github/workflows/omni-queue.yml` exists on the
   production repository (see
   [Actions event policy](#actions-event-policy-pull_request_target-in-public-repositories)); it
   is needed already for shadow mode.
5. Decide the label: keep `omni-queue` or set `label` to `queue`.
6. Update the merge skills and `AGENTS.md` (agent-instruction surfaces: each change needs the
   owner's explicit approval).

Rollback: set OMNI_QUEUE_ENABLED to `false` (immediate; nothing in flight lands), re-enable the
Mergify queue rules, and, if non-admin pushes must be allowed again, delete the
`omni-queue release protection: <base>` rulesets in Settings → Rules → Rulesets. Remove the App
from the bypass actors of "Require PR on default branch" (or restore its branch condition). Leftover
`omni-queue/**` candidate branches can be deleted once nothing is in flight; the
`omni-queue-state` branch can stay as an audit trail.
