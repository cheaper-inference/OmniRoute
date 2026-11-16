---
title: "omni-queue — OmniRoute's own merge queue"
---

# omni-queue: OmniRoute's own merge queue

`omni-queue` is the merge queue OmniRoute runs on its own GitHub Actions minutes, built to replace
the Mergify queue described in [MERGE_TRAIN.md](MERGE_TRAIN.md). It ships **inert**: nothing runs
until the repository variable OMNI_QUEUE_ENABLED is `true` (set it only after the `omni-queue`
environment exists, see [Before OMNI_QUEUE_ENABLED is set](#before-omni_queue_enabled-is-set)), and the default `mode` in
`config/merge-queue/config.json` is `shadow` (compose and test, never land). Until the owner
approves the cut-over (see [Cut-over and rollback](#cut-over-and-rollback)), Mergify and the
`queue` label stay the default merge path.

## Why

- **Cost.** Mergify bills per active contributor seat, and batching with automatic bisection is a
  paid feature ("Cannot use Merge Queue batch" on the free plan, #7220). omni-queue costs the CI
  minutes it uses and nothing else.
- **Throughput.** One CI run validates a batch of up to `batch.maxSize` PRs (12 in the shipped
  config, where the batch size starts at 6 and adapts; see `batch.adaptive`). With 6 green PRs per
  batch, 30 PRs land in about 5 full CI runs instead of 30. A red batch costs
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
job "tick" (every 5 min, on queue-relevant PR events and when a candidate's CI completes;
            one global concurrency group omni-queue-tick: a running tick is never
            cancelled; a newer waiting tick replaces an older waiting one, which shows
            up as a "cancelled" omni-queue run and is harmless)
  1. load state/<base>.json from branch omni-queue-state (compare-and-swap)
  2. nothing in flight → a hotfix or base-repair PR alone (lanes), else pick up to the batch
     size (batch.maxSize, or the adaptive window) eligible PRs, FIFO by approval time
  3. compose in a scratch bare repository: git merge-tree --write-tree + git commit-tree,
     one merge commit per PR, base first-parent chain
  4. push the candidate as a NEW branch omni-queue/<base>/<batchId>-<sha12>
       → ci.yml + quality.yml run their full profile (as for merge_group today)
  5. later ticks read the candidate's checks:
       green   → check composition, queue-refs protection and base tip, then
                 write omni-queue/land and land (merge-ff push), or record
                 "would-land" (shadow)
       red     → classify: infra retry | base check | bisect | culprit
       timeout → infra path
  6. regenerate the dashboard issue and save state (CAS) when it changed
```

The entry points are `scripts/merge-queue/tick.mjs` (one idempotent tick, the only writer of queue
state) and `scripts/merge-queue/approve.mjs` (binds a label to a head SHA), both run by
`.github/workflows/omni-queue.yml`, and `scripts/merge-queue/watchdog.mjs`, run by
`.github/workflows/omni-queue-watchdog.yml` with the default token (it reads the state files and
opens an issue when no tick has completed for too long). Every module under `scripts/merge-queue/`
uses Node built-ins only: the queue workflow never runs `npm ci`, so no third-party install script
runs next to the App token.

| File                                     | Responsibility                                                     |
| ---------------------------------------- | ------------------------------------------------------------------ |
| `scripts/merge-queue/contracts.mjs`      | shared names, state shape, ref naming, merge-commit trailers       |
| `scripts/merge-queue/config.mjs`         | loads and validates `config/merge-queue/config.json`               |
| `scripts/merge-queue/eligibility.mjs`    | which PRs may enter a batch, and why not                           |
| `scripts/merge-queue/checks.mjs`         | verdict of a candidate's check runs                                |
| `scripts/merge-queue/classify.mjs`       | infra vs base-red vs PR-red                                        |
| `scripts/merge-queue/compose.mjs`        | builds and pushes candidates without a working tree                |
| `scripts/merge-queue/land.mjs`           | `merge-ff` push and `squash-api` landing with the tree guard       |
| `scripts/merge-queue/bisect.mjs`         | bisection state machine                                            |
| `scripts/merge-queue/state.mjs`          | state document on `omni-queue-state` with compare-and-swap         |
| `scripts/merge-queue/github.mjs`         | minimal REST client (retries, pagination, comment-once)            |
| `scripts/merge-queue/dashboard.mjs`      | the per-base dashboard issue                                       |
| `scripts/merge-queue/candidate-base.mjs` | base SHA of a candidate push, read by `ci.yml` / `quality.yml`     |
| `scripts/merge-queue/cli.mjs`            | `npm run queue -- …` for the owner and the skills                  |
| `scripts/merge-queue/apply-ruleset.mjs`  | applies the release and the queue-refs rulesets                    |
| `scripts/merge-queue/gitexec.mjs`        | the one way the queue runs git (no shell, token in env, redaction) |
| `scripts/merge-queue/watchdog.mjs`       | the issue opened when no tick has completed for 90 minutes         |

### Candidates

- **Ref name**: `omni-queue/<sanitized-base>/<batchId>-<sha12>`, for example
  `omni-queue/release-v3.8.55/b42-0123456789ab`. The SHA suffix makes every distinct candidate a
  new branch, so the queue **never force-pushes**. An infra retry of the same SHA gets a new batch
  id (`b42-r1`), a CI run on the bare base gets `omni-queue/<sanitized-base>/basecheck-<sha12>`,
  and its infra retry `basecheck-<sha12>-r1` (the SHA is named once).
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
- **Never stricter than a pull request**: the gates that are base-relative on a pull request
  (`check:file-size`, `check:complexity-ratchets`, `check:dead-code`, `check:boundary`,
  `check:ts7-diagnostics-ratchet`) compare a candidate with its base (`--base-ref` = the
  candidate base), and the i18n docs drift check is advisory against that base, as it is on a
  pull request. Drift the base picked up mid-cycle therefore never reds a candidate; the absolute
  and strict verdicts stay on `main`, `merge_group` and Release-Green.
- **AI attribution over the whole range**: with `merge-ff` the contributors' own commits land
  unchanged, so `ci.yml` runs `check:ai-attribution` over `<candidate base>..<candidate>` (Hard
  Rule #16), not only over the PR metadata.
- **Release numbers**: `npm run release:reconcile` maps each landed commit to its PR through the
  `Omni-Queue-PR` trailer, writes one changelog bullet per PR, and counts a PR landed by the queue
  as one commit in "Release by the numbers" and in the Top 25 ranking, so `merge-ff` cycles stay
  comparable with squash-only ones (`landingUnits` in `scripts/release/reconcile-changelog.mjs`).

### Landing modes (`landing.mode`)

| Mode                 | How                                                                                                                                                                                                                                                               | Trade-off                                                                                                                                                                                                                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `merge-ff` (default) | `git push --force-with-lease=refs/heads/<base>:<tip read> origin <candidateSha>:refs/heads/<base>`, no `+`. The lease is the compare-and-swap: a base moved, rewound or deleted since that read is refused (`stale info` → `land-rejected`); the tick recomposes. | Atomic; the landed tree is the tested tree; PRs become "Merged" automatically. History gains merge commits (`git log --first-parent` stays readable). The land status is written right before the candidate is landed, not when the candidate branch is pushed (see [Who lands](#who-lands-landingactor)). |
| `squash-api`         | Checks that the base tip is still the composed base, then `PUT /repos/{owner}/{repo}/pulls/N/merge` with `merge_method=squash` and `sha=<head>` for each PR in order, then compares the base tree with the candidate tree.                                        | One commit per PR, like Mergify. The writes are not atomic and the intermediate trees were never tested. A tree mismatch pauses the queue (`tree-divergence`) and opens an issue.                                                                                                                          |

### Who lands (`landing.actor`)

The `landing` block of `config/merge-queue/config.json` also says who performs the landing and which
commit status the release rulesets require (`scripts/merge-queue/config.mjs`):

| Key             | Values                                                                           | Meaning                                                                                                                                                                                              |
| --------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `actor`         | `app` (the default when absent) or `owner`                                       | `app`: the App's token pushes or merges. `owner`: the owner's token (`OMNI_QUEUE_LAND_TOKEN`) does, and the queue's merge commits carry `landing.identity`.                                          |
| `identity`      | `{name, email}`; the email ends in `@users.noreply.github.com`                   | Required when `actor` is `owner`, refused otherwise.                                                                                                                                                 |
| `statusContext` | `[A-Za-z0-9._/-]{1,100}`, starting with `omni-queue/`; default `omni-queue/land` | The commit status the release ruleset requires. It must not equal a name in `requiredChecks` or `aggregateChecks`, nor an approval context (`omni-queue/approval`, `omni-queue/protected-approval`). |

With `actor: "owner"` (the value in the shipped config):

- the merge commits of a candidate carry `landing.identity`;
- right before landing, the tick writes the land status with the **App's** client (never the land
  token), then lands with `OMNI_QUEUE_LAND_TOKEN`: the fast-forward push with `merge-ff`, each
  per-PR API merge with `squash-api`. Everything else the tick does, composing and pushing the
  candidate included, still uses the App token, and the land token reaches only the tick step of the
  workflow;
- the land status is all the App contributes to the landing. The push itself is the owner's, so the
  base's activity shows a push by the owner.

**Identity of the merge commits**, first match wins (`createTickDeps` in
`scripts/merge-queue/tick.mjs`):

1. `OMNI_QUEUE_GIT_NAME` and `OMNI_QUEUE_GIT_EMAIL`, both set (tests and the sandbox only; the
   workflow never sets them);
2. `landing.identity`, when `landing.actor` is `owner`;
3. `OMNI_QUEUE_BOT_NAME` and `OMNI_QUEUE_BOT_EMAIL`, both set: the App's bot user, which the
   workflow resolves in the step "Resolve the bot identity";
4. the bot identity derived from `appSlug` (`<appSlug>[bot]`).

**When the landing does not complete**, the queue withdraws the land status: it writes `failure`
on the same commits. Every commit is attempted even when GitHub refuses one, and a refused
withdrawal never stops the pause or the failure that follows. The tick also saves the in-flight
stage `landing` before it writes the land status. At the end of every tick (every mode, never in a
dry-run), when a batch that was at that stage is no longer kept there (dropped, recomposed,
retried, isolated as culprit, candidate lost, paused), the tick reads the newest land status the
App created on its commits and turns a `success` into `failure`; this also covers a tick that died
after the blessing. Only the App's statuses count, as for the release ruleset: a later
`omni-queue/land` status posted by anybody else neither hides the App's `success` nor stands for
one. A status whose creator GitHub does not report (missing or null) may be the App's, and may
only add a reason to withdraw, never remove one: the tick writes `failure` when the App's newest
status is `success`, or when the newest of the App's and those statuses is `success` (a
withdrawal only ever writes `failure`, so this side is the safe one). A batch that is **held** at
that stage instead of landed goes back to the stage `testing`, so the same tick withdraws its
status too: a manual pause, a release-freeze that holds the green
batch, or checks that went back to pending. The batch is blessed again only right before it lands
(after the resume, when the freeze lifts, when the checks are green again).

A withdrawal GitHub refuses while the landing withdraws its own blessing (the landing ended with a
verdict other than landed) is tried once more by the end-of-tick pass above; other refusals wait
for the next tick. Every refused write is recorded with an `error` event, detail
`<batch>: could not withdraw <landing.statusContext> (<why>) on <sha12> (<error>)`, and stored in
the state field `landWithdrawals` (see [State](#state)). Every later tick, on a paused base too,
retries the stored withdrawals before it handles the batch in flight: it reads the land statuses
of each stored commit, writes `failure` where the same rule finds a `success` (the App's newest,
or the newest of the App's and those without a readable creator), and drops the entry once that
write succeeds or neither is `success` any more (or there is no status). A refused retry keeps
the entry and counts an attempt, and so does a failed read: `attempts` is the number of failed
attempts so far (a read that failed or a write that was refused). No count drops an entry: the
queue never gives up on withdrawing a blessing. A commit the tick blesses for landing, or an
approver blesses by hand, leaves the list.
Shadow mode retries the stored withdrawals too, and withdraws the status of a batch stored at the
landing stage, so a switch from live to shadow strands no blessing (see
[Before a mode change or a stop](#before-a-mode-change-or-a-stop)); a queue that was never live
has nothing to withdraw.

A tick that fails before the landing stage is saved saves nothing but an `error` event. One that
fails after it has already saved that stage, the attempt count and everything the tick did before
it: a withdrawal refused later in that tick is not stored, but its batch is still stored at the
landing stage, and the next tick either lands it or withdraws its status as above.

Two cases are not closed:

- a tick that throws late, after it abandoned a batch at the landing stage and before its
  end-of-tick pass, leaves the status `success`, and the batch stays stored at the landing stage.
  The attempts limit (below) does not bound this: it counts only the ticks that store the landing
  stage again before a blessing. When every later tick throws before that point too (for example
  the base moved and each tick's push of the recomposed candidate fails), the stage stays
  `landing`, `landAttempts` is never set, nothing pauses and the status stays `success`, with no
  bound. A pause of the base withdraws it (`npm run queue -- pause <base>`: the pause tick sends
  the batch back to `testing` and withdraws its status). This is a known limit, to be closed
  before live mode;
- the list holds at most 20 entries (`LAND_WITHDRAWALS_LIMIT` in
  `scripts/merge-queue/contracts.mjs`); when it is full the oldest entry is dropped with an `error`
  event that says its newest status may still be `success`.

In live mode:

- **No land token** (`actor: "owner"` and `OMNI_QUEUE_LAND_TOKEN` empty): nothing is blessed and the
  base is paused with reason `error`. The message is
  `landing needs OMNI_QUEUE_LAND_TOKEN (landing.actor is "owner")`. In shadow mode nothing lands, so
  the token is not needed.
- **The landing is refused for authentication** (expired or revoked token, missing permission: a git
  `Authentication failed` or `Permission to … denied`, or a REST 401, or a 403 that is not a rate
  limit): the base is paused with reason `error` and the message ends with
  `(check OMNI_QUEUE_LAND_TOKEN: landing.actor is "owner")`. Replace the token in the environment
  (see [Installing the GitHub App](#installing-the-github-app)), then
  `npm run queue -- resume <base>`: the batch is recomposed.
- Any other failure of the landing, without a verdict, fails the tick: the status just written is
  withdrawn and the tick ends with an error. A 403 whose message says `rate limit` belongs here,
  not to the authentication case: the credential is fine. The next tick looks at the base again,
  recognizes a landing that did happen, or writes the status and lands again. Each such attempt is
  counted in `inFlight.landAttempts` and saved before its blessing, so a tick that died after the
  blessing counts too. After `LANDING_ATTEMPTS_LIMIT` (3, in `scripts/merge-queue/tick.mjs`)
  attempts in a row without a verdict the batch is not blessed again and the base is paused with
  reason `error` (see [Incidents](#incidents)). The count goes with the landing stage: a held batch,
  a manual pause or an infra retry starts it again.
- **A per-PR merge call of `squash-api` that fails** (a rate limit included) is not retried: the
  error is caught inside `landSquashApi` and is a verdict, `merge-failed`, so the base is paused
  with reason `error`. The rate-limit rule above decides the token hint here too: with
  `actor: "owner"` a pause detail that says `rate limit` never gets
  `(check OMNI_QUEUE_LAND_TOKEN: landing.actor is "owner")`, since the token is fine; a refused
  credential (a 403 without that text, for example) gets it.

The land token is fine-grained and valid for 90 days: write the date it expires next to the secret
and rotate it before then.

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
| every check in `prChecksRequired` (`Gate / CI`, `Gate / Quality`) is green on the head, except for a base repair        | `pr-checks-not-green`                          |
| not already settled in shadow mode at this exact head, not already in flight                                            | `shadow-processed`, `in-flight`                |

Right before a green batch lands, the tick reads every PR again and re-runs these rules, except
`prChecksRequired`: the PR gates are not read again then, so they never drop a PR from a batch
whose candidate is green. A PR
whose head moved, or whose base changed (retargeted to another release branch during CI), is
dropped from the batch, so a retargeted PR never lands on the branch it left.

**Truncated file list.** GitHub lists at most 3,000 files of a PR. When the tick receives fewer
files than the PR's `changed_files` (or no count at all), a protected path may be among the
missing ones, so the PR is treated as a protected surface: it needs `protected-approved` too
(`protected-approval-missing`, detail `file list incomplete`).

**What `protectedPaths` covers.** Besides the agent-instruction surfaces, the list holds the
queue's own control plane: `.github/workflows/**`, `.github/actions/**`, `scripts/merge-queue/**`,
`config/merge-queue/**` and `.mergify.yml`. The privileged jobs run that code and read that config
from the default branch, and a candidate runs the workflows of its own tree with repository
secrets, so a PR that changes any of them could add an approver, switch `mode`, empty
`requiredChecks` or read a secret. Such a PR needs `protected-approved` on top of the queue label.

**Label names live in two places.** `label`, `protectedApprovalLabel`, `blockLabels` and the two
`lanes` labels are read from the config by the scripts, but the job filters of
`.github/workflows/omni-queue.yml` (see [Kill switch](#kill-switch)) cannot read a file, so the
same names are repeated there as literals.
Renaming or adding a label means changing both; `tests/unit/merge-queue/workflows.test.mjs` fails
when they differ.

**Why commit statuses.** "The label was applied after the last push" cannot be decided from
commit dates: they are set by the author and trivially forged. Instead, the `approval` job
writes a commit status on the head SHA that was current when an approver applied the label. A
new push creates a new SHA without that status, so the PR silently stops being eligible until an
approver labels it again. In live mode, removing the label writes `failure` on the same context
(approval withdrawn); in shadow mode a removal writes nothing (see
[Shadow mode and live mode](#shadow-mode-and-live-mode)). A label applied by anyone else gets one
comment and no status.

- **The status goes on the head of the event**, not on the head the job finds when it runs: a push
  that lands between the label and the job must not inherit the approval.
- **Level-triggered**: the jobs of a quick label/unlabel pair can run in either order, so the job
  re-reads the PR first. `labeled` writes `success` only while the label is still there, and
  `unlabeled` (live mode) writes `failure` only while it is still absent.
- **Waiting for the status**: a labeled PR without its approval status is simply not eligible
  (`approval-missing`, no action) for up to 6 hours after the label (`APPROVAL_STATUS_SKEW_SECONDS`),
  which absorbs a backed-up Actions queue. After that the queue concludes the head changed after
  the label (`head-changed-after-label`): it removes the label with one comment.
- **Already in the base**: a PR whose head is already reachable from the base (its commits entered
  some other way) leaves the queue for good, with both labels removed and one comment.

A PR enters a batch only when each check in `prChecksRequired` (`Gate / CI` and `Gate / Quality`
in the shipped config) is green on its head (`pr-checks-not-green` otherwise: no action, the label
stays and no comment is posted; the PR becomes eligible by itself once its gates turn green). A
gate is read once per check suite that reported it on the head, and the worst state wins. Only
when those suites disagree does the tick list the head's workflow runs (`listWorkflowRuns`): a
suite that belongs to a run superseded by a newer run of the same workflow and the same event on
that head (a newer `pull_request` run after a retarget cancelled the older one) is dropped. A
`workflow_dispatch` run never supersedes a `pull_request` run, nor the other way round, and a job
of the same name in another workflow counts too. Until the newest run's gate job has started, the
previous run's result is what counts. The candidate's own CI still decides whether anything lands.
With `preferGreenPrChecks` the
selection also prefers PRs whose latest `prGreenCheck` (`Gate / Quality`) is green.

## Accepting a candidate

`scripts/merge-queue/checks.mjs` mirrors the `merge_conditions` the Mergify queue uses today, for
check runs only. Mergify's `#check-failure` and `#check-pending` also count commit statuses; the
queue deliberately reads none (see below):

- every name in `requiredChecks` (`Gate / CI`, `Gate / Quality`,
  `Merge integrity (changelog + generated skills)`) concluded `success` on the candidate SHA;
- no other check run in `failure`, `cancelled`, `timed_out`,
  `action_required`, `startup_failure` or `stale`, except the names in `advisoryChecks`
  (`Build (advisory)`);
- nothing pending. Only the latest run per check name counts (re-runs report several);
- a required check counts only as a check run of the `github-actions` app;
- a check run whose name starts with `omni-queue/` is not part of the verdict;
- commit statuses are not part of the verdict at all: the tick does not read them for it, whoever
  created them (another App, a user's token, the queue's own App) and whatever their context or
  state. A status in `failure` or `error` does not make a candidate red, a `pending` one does not
  keep it pending, and a required name that exists only as a status counts as missing. The
  queue's own statuses (`omni-queue/approval`, `omni-queue/protected-approval` and the land
  status) are read by their own code paths, never by the verdict;
- only the check runs produced by the push of the candidate ref are read. The tick lists the
  `push` workflow runs of that branch and SHA (`listWorkflowRuns` in
  `scripts/merge-queue/github.mjs`) and keeps the check runs that belong to their check suites.
  Everything else on the SHA is ignored: a run of the same SHA on another branch (the base's own
  push, the previous ref of an infra retry) and the CI of a pull request somebody opened on the
  candidate commit, from a fork or from a branch of this repository. The candidate SHA is public,
  so without this rule that PR's author could cancel, fail or re-run checks on it at will. Check
  runs that come from no Actions workflow run (other apps) are not read either. Until GitHub
  lists a push run for the ref, the verdict stays pending;
- no GitHub Actions run at all `NO_RUN_TIMEOUT_MINUTES` (45) after the push → `timeout` with
  reason `no-ci-run` (the push triggered nothing), handled like an infra failure;
- not decided after `checksTimeoutMinutes` (240) → `timeout`, handled like an infra failure.

## Red candidates: classification, base check, bisection

`scripts/merge-queue/classify.mjs` turns every failing run into a signature (the check name with
the matrix shard suffix removed, plus the failing test or gate from its annotations) and decides
as follows. A batch or an ordinary bisection segment that items 2 and 4 would act on first has its
failed jobs re-run once (`flakyReruns`; the `flaky-rerun` event), and those items apply only when it
is red again. A candidate turns red at its first failed job while the rest of its CI still runs,
and GitHub re-runs the failed jobs of a finished workflow run only, so the tick first waits for
every push run of the candidate's ref to conclude (the tick log says `waiting for <n> run(s) of
<ref> to conclude before re-running the failed jobs`; nothing is classified yet), then re-runs, then
waits for the re-run. A real failure is therefore blamed later than without the re-run: by the
rest of the CI run plus the re-run. Both waits end at `checksTimeoutMinutes` from the candidate's
start: past it, a candidate still waiting for its runs to conclude is classified without a
re-run, and a candidate waiting for a re-run it asked for is classified without waiting any longer
for the re-run's result. A re-run that GitHub accepted and that does not show as a second attempt
of the re-run workflow run within `RERUN_START_MINUTES` (30) is taken as never started, and the
old failure is classified; only the runs the queue re-ran count, not another run of the ref that
was re-run earlier. A second attempt of those runs that is running is never cut short by those
30 minutes. Before the queue asks, a running second attempt of any push run of the ref (a re-run
started by a person, or by a tick that died before saving) is adopted and waited for, and the
queue never asks for another. A refused re-run (or
an unreadable list of runs) adds `; re-run refused (<status or reason>)` to the detail of that
tick's `checks-red`; when no re-run was accepted, the candidate is classified in the same tick:

1. **Infra** — every failure carries positive evidence of infrastructure trouble (runner lost,
   `CreateArtifact` 404, "No space left on device", `startup_failure`, a job that hit its time
   limit, a cancellation without any failure annotation). The aggregate gates in `aggregateChecks`
   (`Gate / CI`, `Gate / Quality`) run with `if: always()` and fail whenever a job they need
   failed, so next to the failure of any other check a gate failure that names no test is left
   out; a gate that fails alone still blocks. The same SHA is retried under a new ref up
   to `infraRetries` times (once in the shipped config); the infra failure that comes after the last
   retry (with `infraRetries: 0`, the first one) pauses the base with reason `infra`, except when
   every run of the candidate only hit a job time limit (see 5).
2. **Needs a base check** — the batch is red on a base SHA that has no finished verdict (green, red
   or timeout). The tick pushes a `basecheck-<sha12>` candidate with the bare base SHA (same CI
   profile), records `base-check-started` and parks the red batch in `inFlight.pendingRed`. This
   does not depend on the `🔴 Release branch not green: <base>` issue: the system that writes it
   does not cover every check the queue requires. The tip the queue lands itself is recorded as a
   green verdict, so only a tip that arrived from outside the queue (a hotfix, a sync-back, a
   manual push) starts a red batch without one. While a base check for that SHA is pending, no
   second one starts. A base check whose runs fail for infrastructure reasons follows item 1 (up to
   `infraRetries` retries, then an `infra` pause on the failure after the last one). A base check that ends with no verdict after its retries (no CI
   run at all, or no result within `checksTimeoutMinutes`) is stored as `timeout` for that SHA, and
   the parked batch is then treated as PR-red (item 4). That verdict is not redone for the same
   SHA: the ref is named by the SHA and the queue never force-pushes.
3. **Base-red** — the base check is red and every non-infra failure of the batch also fails there:
   same check, and each failing test or gate is compared on its own across all shards of that
   check (shards re-balance, so failures grouped differently still match). The batch is not
   guilty: the base is paused with reason `base-red` and the pause lifts by itself when the base
   tip moves (someone landed the fix), or, in live mode, when a PR of the base-repair lane lands
   (`resumed`, detail `base repaired by #<n>`). While it lasts the queue processes only that lane.
   When a `🔴 Release branch not green: <base>` issue is open, the queue comments on it.
4. **PR-red** — anything else: the base is green on this SHA, or its check timed out, or some
   failure of the batch does not fail on the base. A batch of one: that PR is the culprit, loses
   the queue label and gets a comment with the failing checks. If the culprit's head moved after
   the candidate was composed, the label (which may approve the new head) stays and no comment is
   posted; only the `culprit-found` event records it. A larger batch is **bisected**: it is split
   in halves (first half = ceil(n/2), order preserved) and the first half is tested on the base as
   it is at that moment. A green half lands (or would land in shadow) and the next segment is
   tested; a red half is split again. Two culprits in one batch are found the same way.
5. **Suspected hang** (`hang-suspected`) — a job that hits its time limit (conclusion `timed_out`,
   or `cancelled` with GitHub's "exceeded the maximum execution time" annotation) on **every** run
   of a candidate points at a hanging test, not at the machine, and a retry would only cost
   another full timeout. When the retry is used up the tick records `hang-suspected` and classifies
   the batch like any red batch, with a signature that names the job and no test: a base check
   first when the base has no verdict, then, unless the base explains it, the PR-red path of item 4
   (a batch of one is the culprit; a larger batch is bisected as a hang bisection). Inside a hang
   bisection a segment whose job times out is not retried: one timeout is enough to treat the
   segment as red. The culprit comment then names the job that timed out. If any run of the
   candidate failed for another infrastructure reason (runner lost, startup failure, a plain
   cancel), nothing of this applies and item 1 does: up to `infraRetries` retries, then an `infra` pause
   on the failure after the last one. Hang
   evidence on the base only matches a hang of the candidate in the same job, never an ordinary
   test failure. A base check whose job times out on every run is recorded as a red verdict with
   that hang, so a batch that hangs on the same job is paused as `base-red` instead of blamed.

**Known limits.** These are accepted trade-offs of the current design, not bugs to work around:

- **Bisection on an unverified base.** When a base check gives no verdict (`timeout`), the batch
  is bisected although nothing showed that the base passes, so a PR can be removed from the queue
  although the base fails the same check.
- **One timeout removes a PR in a hang bisection.** A single PR is declared the culprit after one
  timeout of its own run, with no retry. Combined with the previous limit, that can happen on an
  unverified base.
- **The land status is not per base.** Every release ruleset requires the same context
  (`landing.statusContext`), so a commit blessed for one release branch, by a landing or by a
  bless, also carries it for every other managed base: a pull request from that commit can be
  merged into another release branch the door protects.
- **The queue-refs check reads rule types, not bypass actors.** Before a blessing the tick reads the
  rules GitHub enforces on `omni-queue-state` and on the batch's candidate ref and requires
  `creation`, `update` and `deletion` on both (`QUEUE_REF_RULES` in
  `scripts/merge-queue/refs-guard.mjs`; see
  [Before the land status is written](#before-the-land-status-is-written)). It does not read who
  may bypass those rules: the App's token has no Administration permission, and anyone who can
  edit a ruleset's bypass list can disable the ruleset as well. A rule that comes from another
  ruleset with the same types counts as protection.
- **The tree recomposition depends on the runner's git.** The composition check recomposes each
  merge commit of the candidate with `git merge-tree` on the tick's runner. A different git version
  on the runner that composed the candidate and on the runner that checks it could, in principle,
  give another tree for the same merge, and the queue pauses a legitimate batch with a message about
  state tampering or corruption. Shadow mode runs the same check, so it is where the rate of such
  false mismatches is measured before `mode: "live"`.
- **A check that keeps failing to run stalls a live queue without a pause.** In live mode a
  failed rules read or a git error while recomposing fails the tick, and the next tick tries
  again: an error that persists fails every tick, with an `error` event each time, and nothing
  pauses the base or alerts anyone (the queue has no stalled-queue alert yet). To get out: pause
  the base (`npm run queue -- pause <base>`, a paused base does not check its batch), fix the
  cause, then `npm run queue -- resume <base>`. Removing the queue label from a pull request drops
  it from the batch at the next tick, and the rest is recomposed.
- **Test-level matching needs a key on both sides.** A failure of the batch matches the base's only
  when the same check fails there and either both failures carry a test-level key (the candidate's
  tests must all fail on the base) or neither does (a match on the check name alone, reported as
  such). When only one side has a key the failures cannot be shown to be the same, and the batch is
  treated as PR-red. In this repository node:test and vitest emit no failure annotations, so the
  check-name match is the usual one.

## State

The queue state lives on the branch `omni-queue-state` (`STATE_BRANCH`), one JSON file per base:
`state/<sanitized-base>.json`, for example `state/release-v3.8.55.json`. It holds the pause, the
candidate in flight (refs, SHAs, PRs, stage, attempts, bisection), the last base checks, the
shadow bookkeeping, counters and the last 200 history events. Two fields belong to the land status
(see [Who lands](#who-lands-landingactor)):

- `inFlight.landAttempts`: only while the batch is at the stage `landing`, the number of ticks in a
  row that blessed it without reaching a verdict. At `LANDING_ATTEMPTS_LIMIT` (3) the queue pauses
  instead of blessing it again.
- `landWithdrawals`: present only when it is not empty. Each entry is a commit whose `failure` land
  status GitHub refused to write (`sha`, `batchId`, `candidateSha`, `why`, `since`, `attempts`),
  oldest first, one per SHA, at most 20. Later ticks retry them.

A document without these fields loads as before, and code that predates them loads a document that
has them (`validateState` ignores fields it does not know), but that code does not act on them (see
[Cut-over and rollback](#cut-over-and-rollback)).

- **Why not `omni-queue/state`**: `ci.yml` and `quality.yml` run their full matrix on every push
  to `omni-queue/**`. Keeping the state branch outside that prefix means a state write never
  starts CI. No workflow triggers on `omni-queue-state`.
- **Compare-and-swap**: writes go through the Contents API with the blob SHA that was read. A
  concurrent writer makes the save fail, and the tick re-reads and redoes its work (never a force
  push, never last-write-wins). Every network side effect happens before the save that records
  it, and repeating a tick is safe.
- **An unchanged state is not written again**: most ticks change nothing (idle queue, candidate
  checks still pending), and a commit per tick would add hundreds of commits a day to the state
  branch. A tick saves only when the document changed. When it did not, the tick writes a
  heartbeat at most once per hour (`STATE_HEARTBEAT_MINUTES` in `scripts/merge-queue/tick.mjs`),
  which only moves `updatedAt`. Ticks visit a base that has labeled PRs, a candidate in flight or
  a pause; for such a base, an `updatedAt` older than an hour plus one tick interval means no
  tick is completing (see [Incidents](#incidents)).
- **Invalid documents are never reset silently**: the tick fails loudly. Do not edit the state
  branch while the queue is enabled; pause first, then fix it with an ordinary commit. Once the
  queue-refs ruleset is applied (see [Ruleset](#ruleset)), only the App can write that branch: the
  ruleset has to be disabled first for a commit by hand.

## Dashboard

One issue per base, titled `🚦 omni-queue: <base>` and labelled `omni-queue-dashboard`. Each tick
regenerates its body: the ordered queue with the reason each waiting PR is not eligible, the
candidate in flight with a link to its checks, the pause banner, the last 20 events and metrics
(PRs landed, CI runs per merged PR, red batches, bisections, median and p90 minutes from approval
to landing). The issue is rewritten only when its body changes. A dashboard that stopped changing
is an incident (see below).

## Events

Every event of a base's history (`npm run queue -- history`, the dashboard's last events) has one
of the types of `EVENT_TYPES` in `scripts/merge-queue/contracts.mjs`. A state document whose
history holds a type the code does not know is refused, which matters for a rollback (see
[Cut-over and rollback](#cut-over-and-rollback)). `tests/unit/merge-queue/runbook.test.mjs` fails
when this table and `EVENT_TYPES` differ.

| Event                 | When it happens                                                                                                                                                                                                                                                                                                                                                                                                                                                          | What the operator does                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `batch-started`       | A candidate was composed and pushed: a new batch, a recomposition or a bisection segment. The detail names the PRs and the base, and for a root batch with `batch.adaptive` the window it was cut to (`window W`). A lane batch names its lane instead of a window (`lane hotfix` or `lane base-repair`).                                                                                                                                                                | Nothing. Its CI is linked from the dashboard.                                                                                                          |
| `pr-skipped-conflict` | A PR conflicts with an earlier PR of the same batch. It is left out of this candidate and stays queued for a later batch.                                                                                                                                                                                                                                                                                                                                                | Nothing. If it repeats, the author rebases the PR over the one it conflicts with.                                                                      |
| `pr-dequeued`         | A PR left the queue: `base-conflict` (it no longer merges into the base: label removed, comment), `already-in-base`, or `withdrawn: <why>` before composition (label, head or approval changed).                                                                                                                                                                                                                                                                         | For `base-conflict` the author updates the branch and an approver labels it again; the other cases need nothing.                                       |
| `checks-green`        | Every required check of the candidate (or of a base check) concluded `success`.                                                                                                                                                                                                                                                                                                                                                                                          | Nothing. The landing (or `would-land`) follows.                                                                                                        |
| `checks-red`          | A check of the candidate failed. The detail names the failing checks; on a base check it starts with `base-check red`.                                                                                                                                                                                                                                                                                                                                                   | Nothing yet: classification follows (a re-run of the failed jobs, infra retry, base check, bisection or culprit).                                      |
| `flaky-rerun`         | A red batch or bisection segment that would be bisected, tested against the base or dequeued: its failed jobs are re-run once after its runs end (`flakyReruns`). Detail: `re-running the failed jobs of <batch> once (<jobs>) before <bisecting\|a base check\|dequeuing #n>` (five jobs at most). A green re-run's `checks-green` reads `green after re-running <jobs> (flaky)`.                                                                                       | Nothing. A real failure is blamed later: after the rest of the CI run and the re-run. Jobs that often turn green on the re-run are flaky tests to fix. |
| `checks-timeout`      | No verdict after `checksTimeoutMinutes`, or no CI run at all after 45 minutes (`no CI run for candidate`).                                                                                                                                                                                                                                                                                                                                                               | For `no CI run`, check the Actions policies and the `omni-queue/**` triggers of `ci.yml` / `quality.yml` (see [Incidents](#incidents)).                |
| `land-blessed`        | Live mode: the App wrote the land status (`landing.statusContext`, `success`) on the commits about to land, right before the landing.                                                                                                                                                                                                                                                                                                                                    | Nothing. A `landed` event should follow; if a pause follows, the status was withdrawn.                                                                 |
| `manual-bless`        | An approver's `bless`: the App wrote the land status on one chosen commit. The detail names who and why.                                                                                                                                                                                                                                                                                                                                                                 | Push or merge that commit yourself (see [Land status and manual bless](#land-status-and-manual-bless)).                                                |
| `landed`              | Live mode: the batch reached the base (the `merge-ff` push or every `squash-api` merge).                                                                                                                                                                                                                                                                                                                                                                                 | Nothing.                                                                                                                                               |
| `would-land`          | Shadow mode: a green batch that live mode would have landed. The detail can add `merged meanwhile by another path`, `live mode would pause: queue refs unprotected (…)` and, after the name of a check, `could not run (…): live mode would fail the tick`.                                                                                                                                                                                                              | Compare with what Mergify merged. Both notes must be gone before `mode: "live"`: apply the queue-refs ruleset, or fix the check that could not run.    |
| `would-dequeue`       | Shadow mode: live mode would have removed this PR from the queue (label kept, no comment). The detail gives the reason code(s).                                                                                                                                                                                                                                                                                                                                          | Nothing during shadow.                                                                                                                                 |
| `land-rejected`       | The batch was not landed: the base moved (`base moved…; recomposing`: the same PRs are recomposed on the tip), the batch changed before landing (`batch changed before landing: …`: the PRs left are recomposed), or a release-freeze holds it (`base-frozen: …; <batch> waits for the freeze to lift`, once per batch: it stays in flight, not recomposed, and lands after the freeze).                                                                                 | Nothing for an occasional one; frequent ones mean something else merges into the base (see [Incidents](#incidents)).                                   |
| `bisect-split`        | A red batch (or a red segment of a bisection) is split; the detail names the segment tested next.                                                                                                                                                                                                                                                                                                                                                                        | Nothing.                                                                                                                                               |
| `culprit-found`       | Bisection or a batch of one isolated the PR that fails. Live: label removed, comment. Shadow, or a head that moved: label kept.                                                                                                                                                                                                                                                                                                                                          | The author fixes the PR and an approver labels it again.                                                                                               |
| `base-check-started`  | A red batch on a base with no verdict: the bare base is pushed as a `basecheck-<sha12>` candidate.                                                                                                                                                                                                                                                                                                                                                                       | Nothing.                                                                                                                                               |
| `base-red-paused`     | The base check is red with the same failures as the batch: the base is paused with reason `base-red`.                                                                                                                                                                                                                                                                                                                                                                    | Fix the base (see [Incidents](#incidents), Base-red). The pause lifts when the tip moves.                                                              |
| `hang-suspected`      | A job hit its time limit on every run of the candidate: treated as a hanging test (base check, then bisection) instead of an infra pause.                                                                                                                                                                                                                                                                                                                                | Nothing yet; look at the culprit comment when one is named.                                                                                            |
| `infra-retry`         | Every failure is infrastructure (or the checks timed out): the same SHA is retried under a new ref (`-r1`, `-r2`, …), while retries of `infraRetries` are left. The detail reads `retry <n>/<infraRetries>: …`.                                                                                                                                                                                                                                                          | Nothing.                                                                                                                                               |
| `infra-paused`        | An infrastructure failure (or a timeout) with no retry of `infraRetries` left: the base is paused with reason `infra`. With the shipped `infraRetries: 1` that is the second failure; with `0`, the first. When every run only hit a job time limit, the outcome is `hang-suspected` instead (see its row).                                                                                                                                                              | Check the Actions status and the candidate's run, then `npm run queue -- resume <base>`.                                                               |
| `paused`              | A manual pause (`npm run queue -- pause`, or `action=pause`).                                                                                                                                                                                                                                                                                                                                                                                                            | `npm run queue -- resume <base>` when ready.                                                                                                           |
| `resumed`             | A manual resume (`manual resume (was <reason>)`), a `base-red` pause lifted because the base tip moved (`base moved <sha12> → <sha12> after a base-red pause`), or, in live mode, a `base-red` pause lifted because a PR of the base-repair lane landed (`base repaired by #<n>`).                                                                                                                                                                                       | Nothing.                                                                                                                                               |
| `tree-divergence`     | `squash-api` only: the base tree after the merges differs from the candidate tree, or an open divergence issue stops a landing. The base is paused with reason `tree-divergence`.                                                                                                                                                                                                                                                                                        | Compare the trees, fix the base, close the issue, resume (see [Incidents](#incidents)).                                                                |
| `error`               | A tick failed; a landing pause (reason `error`: land token, landing refused, composition mismatch, queue refs, base not found, attempts limit); a land-status withdrawal GitHub refused, or a stored one dropped because the list was full; a candidate gone from origin (`… is gone from origin; recomposing …`), whose PRs are recomposed. The detail says which.                                                                                                      | Read the detail: each pause detail has an entry in [Incidents](#incidents). A landing that fails on every tick ends in the pause after three attempts. |
| `queue-stalled`       | The queue stopped making progress (`assessHealth` in `scripts/merge-queue/dashboard.mjs`): paused for more than 120 minutes, a candidate in flight for more than `checksTimeoutMinutes` + 60, eligible PRs and nothing started for more than `batch.maxWaitMinutes` + 30, or the last three events are `error`. Recorded once per episode, with `stalled` in the state and one comment on the dashboard issue that mentions the approvers. The detail lists the reasons. | Read the reasons; each points at its cause (the pause, the candidate's checks, the eligible PRs, the failing tick's `error` events).                   |

## Configuration keys

`config/merge-queue/config.json`, validated by `validateConfig` in `scripts/merge-queue/config.mjs`.
The workflow reads the copy on the default branch. Every key without a default is required, except
`landing.identity`, which is required or refused depending on `landing.actor` (see its row). An
unknown key, top-level or in `batch` or `landing`, is refused. "Shipped" is the value in the
config file of this repository. `tests/unit/merge-queue/runbook.test.mjs` fails when this table
and the keys `validateConfig` reads differ.

| Key                      | Type                                                         | Default                                                                    | Effect                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `schemaVersion`          | `1`                                                          | none; shipped `1`                                                          | Version of the config format.                                                                                                                                                                                                                                                                                                                                                                              |
| `mode`                   | `shadow` or `live`                                           | none; shipped `shadow`                                                     | `shadow` composes and tests but never lands or changes a PR; `live` lands (see [Shadow mode and live mode](#shadow-mode-and-live-mode)).                                                                                                                                                                                                                                                                   |
| `label`                  | label name                                                   | none; shipped `omni-queue`                                                 | The queue label. Repeated as a literal in the job filters of `omni-queue.yml` (see [Eligibility](#eligibility)).                                                                                                                                                                                                                                                                                           |
| `protectedApprovalLabel` | label name, different from `label`                           | none; shipped `protected-approved`                                         | Second label a PR that touches `protectedPaths` needs. Also repeated in the job filters.                                                                                                                                                                                                                                                                                                                   |
| `approvers`              | list of logins, at least one                                 | none; shipped `["diegosouzapw"]`                                           | Whose label applications count; also who may dispatch a `bless`.                                                                                                                                                                                                                                                                                                                                           |
| `appSlug`                | App slug                                                     | none; shipped `omni-queue`                                                 | The App whose bot (`<appSlug>[bot]`) must have created the approval statuses.                                                                                                                                                                                                                                                                                                                              |
| `bases`                  | anchored RegExp source                                       | none; shipped `^release/v\d+\.\d+\.\d+$`                                   | Which base branches the queue manages.                                                                                                                                                                                                                                                                                                                                                                     |
| `blockLabels`            | list of label names                                          | none; shipped `hold`, `hold-vps`, `do-not-merge`, `wip`                    | A PR with one of them is not eligible (`blocked-label`).                                                                                                                                                                                                                                                                                                                                                   |
| `batch.maxSize`          | integer 1 to 32                                              | none; shipped `12`                                                         | Most PRs in one batch. With `batch.adaptive` the ceiling the window can grow to.                                                                                                                                                                                                                                                                                                                           |
| `batch.adaptive`         | boolean                                                      | `false`; shipped `true`                                                    | The batch size is a window (`batchWindow` in the state): halved after a batch whose own PRs made it red, one more after a full batch lands. A lane batch never moves it; a suspected hang (a job that hit its time limit) does not halve it; nor does a red verdict that rests on a base check that timed out. `false`: every batch takes up to `batch.maxSize`.                                           |
| `batch.startSize`        | integer from `batch.minSize` to `batch.maxSize`              | `batch.maxSize`; shipped `6`                                               | With `batch.adaptive`, the window of a state that has none yet.                                                                                                                                                                                                                                                                                                                                            |
| `batch.minSize`          | integer 1 to 32, not above `batch.maxSize`                   | none; shipped `1`                                                          | Fewest eligible PRs to start a batch. Below it the queue waits, whatever `batch.maxWaitMinutes` says.                                                                                                                                                                                                                                                                                                      |
| `batch.maxWaitMinutes`   | integer 0 to 1440                                            | none; shipped `10`                                                         | With fewer eligible PRs than the batch size (`batch.maxSize`, or the window with `batch.adaptive`), how long the oldest approval waits for more before a smaller batch starts.                                                                                                                                                                                                                             |
| `landing.mode`           | `merge-ff` or `squash-api`                                   | none; shipped `merge-ff`                                                   | How a green batch lands (see [Landing modes](#landing-modes-landingmode)).                                                                                                                                                                                                                                                                                                                                 |
| `landing.actor`          | `app` or `owner`                                             | `app`; shipped `owner`                                                     | Whose token lands: the App's, or `OMNI_QUEUE_LAND_TOKEN` (see [Who lands](#who-lands-landingactor)).                                                                                                                                                                                                                                                                                                       |
| `landing.identity`       | `{name, email}`, the email a `@users.noreply.github.com` one | none; required with `actor: "owner"`, refused otherwise                    | Identity of the queue's merge commits when the owner lands.                                                                                                                                                                                                                                                                                                                                                |
| `landing.statusContext`  | `omni-queue/<name>`, `[A-Za-z0-9._/-]{1,100}`                | `omni-queue/land`; shipped `omni-queue/land`                               | The land status the release ruleset requires. Must not be a required, aggregate or approval context.                                                                                                                                                                                                                                                                                                       |
| `requiredChecks`         | list of check names, at least one                            | none; shipped three checks                                                 | Checks that must conclude `success` on a candidate (see [Accepting a candidate](#accepting-a-candidate)).                                                                                                                                                                                                                                                                                                  |
| `advisoryChecks`         | list of check names, none in `requiredChecks`                | none; shipped `Build (advisory)`                                           | Checks whose failure does not make a candidate red.                                                                                                                                                                                                                                                                                                                                                        |
| `aggregateChecks`        | list of check names                                          | none; shipped `Gate / CI`, `Gate / Quality`                                | `if: always()` gates left out of the classification next to another failure (see [Red candidates](#red-candidates-classification-base-check-bisection)).                                                                                                                                                                                                                                                   |
| `checksTimeoutMinutes`   | integer 10 to 1440                                           | none; shipped `240`                                                        | A candidate without a verdict after this long is a `checks-timeout`, handled like an infra failure.                                                                                                                                                                                                                                                                                                        |
| `infraRetries`           | integer 0 to 5                                               | none; shipped `1`                                                          | Retries of the same SHA after an infrastructure failure before the `infra` pause.                                                                                                                                                                                                                                                                                                                          |
| `flakyReruns`            | `0` or `1`                                                   | `1`; shipped `1`                                                           | Re-runs of a red batch's failed jobs before it is bisected, tested against the base or dequeued (`flaky-rerun`); `0` turns them off.                                                                                                                                                                                                                                                                       |
| `preferGreenPrChecks`    | boolean                                                      | none; shipped `true`                                                       | When choosing a batch, PRs whose `prGreenCheck` is green come first.                                                                                                                                                                                                                                                                                                                                       |
| `prGreenCheck`           | check name                                                   | none; shipped `Gate / Quality`                                             | The PR-level check `preferGreenPrChecks` looks at.                                                                                                                                                                                                                                                                                                                                                         |
| `prChecksRequired`       | list of distinct check names                                 | `[]`; shipped `Gate / CI`, `Gate / Quality`                                | Green on a PR head to enter a batch: worst of the suites reporting it; if they disagree, a run superseded by a newer run of the same workflow and event drops ([Eligibility](#eligibility)).                                                                                                                                                                                                               |
| `protectedPaths`         | list of globs, at least one                                  | none; shipped the agent-instruction surfaces and the queue's control plane | A PR that touches one also needs `protectedApprovalLabel` (see [Eligibility](#eligibility)).                                                                                                                                                                                                                                                                                                               |
| `lanes.hotfixLabel`      | label name, distinct from every other label of the config    | no `lanes` = no lanes; shipped `omni-queue-hotfix`                         | Applied by an approver to an eligible PR: at the next batch start it is composed alone, ahead of the FIFO. Never replaces what is in flight. Repeated in the tick's job filter.                                                                                                                                                                                                                            |
| `lanes.baseRepairLabel`  | label name, distinct from every other label of the config    | no `lanes` = no lanes; shipped `omni-queue-base-repair`                    | Applied by an approver: composed alone (PR gates not required), the only work of a `base-red` pause; its landing lifts the pause. Never in a FIFO batch. Repeated in the tick's job filter. A repair that fails like the base is not composed again at that head (`repairTried`): push a fix (a new head is tried again), or have an approver remove this label so the PR goes back to the ordinary queue. |

## CLI

`npm run queue -- <command>` (`scripts/merge-queue/cli.mjs`) uses the GitHub CLI token
(`gh auth token`). It reads state but never writes it: the workflow is the single writer.

```bash
npm run queue -- status [--base <branch>]          # queue, in-flight candidate, pause
npm run queue -- add <PR...>                       # apply the queue label
npm run queue -- remove <PR...>                    # remove the queue label
npm run queue -- pause <base> [--reason <text>]    # workflow_dispatch action=pause
npm run queue -- resume <base>                     # workflow_dispatch action=resume
npm run queue -- bless <base> --sha <sha> --reason <text>   # workflow_dispatch action=bless
npm run queue -- why <PR>                          # eligibility verdict and reasons
npm run queue -- history [--base <branch>] [--limit <n>]
```

`add` only applies the label: the approval is recorded by the `approval` job, under the identity
of whoever ran the command. It counts only if that login is in `approvers`.

`pause`, `resume` and `bless` dispatch the workflow and then wait until the base's state document
shows the action applied (a new `paused` event, no pause left, or a new `manual-bless` event for
that SHA; see [Land status and manual bless](#land-status-and-manual-bless)). The dispatched run
waits in the tick's concurrency group behind any running tick, and a newer tick can replace it
there (it ends `cancelled`); the CLI then dispatches again. The command prints
`<action> applied to <base>` (a bless prints its own line) only after that confirmation. It exits
`1` when the run ends any other way without applying the action (for example `skipped` while the
kill switch is off), or after 20 minutes without confirmation; in that case check
`npm run queue -- status --base <base>` and the `omni-queue` runs before retrying.

A `resume` names the pause it saw (`expect-pause:<since>` in the dispatch reason), and the tick
clears only that pause. On a base that is not paused the CLI sends nothing. So a resume that
waited behind a running tick never clears a pause recorded later (a safety pause), and sending the
same request twice is harmless. When the targeted pause is gone but the base was paused again, the
CLI says so and leaves it paused. A resume dispatched by hand in the Actions tab, with no reason,
clears whatever pause is there.

The CLI evaluates eligibility with the local config file (`config/merge-queue/config.json`, or the
file in OMNI_QUEUE_CONFIG, an override for the sandbox and the tests that the workflow never sets),
so `status` shows the mode of your checkout, not necessarily the one on the default branch. `--repo <owner/repo>` points it at another repository (default: `gh repo view`).

The same `pause`, `resume`, `dry-run` and `bless` actions are available from the Actions tab:
workflow `omni-queue` → "Run workflow" → inputs `base`, `action`, `reason` and, for `bless` only,
`sha`. `dry-run` observes and decides, prints the plan and writes nothing.

## Shadow mode and live mode

- **`shadow`** (default): the queue composes candidates, runs the full CI on them, bisects and
  classifies exactly as in live mode, but never lands and never changes a pull request. A green
  candidate produces a `would-land` event; each PR head settled that way is skipped until it
  changes. Use it to compare the batches the queue would land with the merges Mergify actually
  performs.
- **`live`**: green candidates land through `landing.mode`.
- During shadow, the queue label is `omni-queue`, distinct from Mergify's `queue`, so the two
  never act on the same PR by accident.

### What shadow mode writes, and what it does not

Shadow mode observes. The PRs it reads are the ones Mergify still lands, so it leaves them alone.

| Shadow mode writes                                                                  | Shadow mode never writes                                                                                    |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| candidate branches `omni-queue/<base>/…` (pushed, then deleted)                     | a label removal, on any path (culprit, conflict, head changed after the label, head already in the base)    |
| the state file on `omni-queue-state`                                                | a comment on a pull request from the tick (culprit, conflict, not eligible, protected surface, frozen base) |
| the dashboard issue, and a comment on the `base-red` issue when it pauses a base    | a `failure` status when a label is removed: the `approval` job writes nothing for `unlabeled`               |
| the `success` approval status when an approver applies a label (the `approval` job) | a landing, a merge, or any push to a base                                                                   |
| a `failure` land status, only as a withdrawal (below the table)                     | a `success` land status                                                                                     |
| a re-run of the failed jobs of its own candidate (`flaky-rerun`)                    | the "not an approver" comment of the `approval` job: a label from a non-approver is only logged             |

Shadow mode writes a `failure` land status only to withdraw one: on the commits of a batch stored
at the landing stage whose land status is `success` by the rule of
[Who lands](#who-lands-landingactor) or cannot be read (unknown: withdrawn anyway), and on the
commits of stored withdrawals (`landWithdrawals`). Only live mode stores a batch at the landing
stage. A shadow tick stores a withdrawal too, when GitHub refuses its own withdrawal of such a
batch, but every stored withdrawal comes from a batch live mode blessed: a queue that was never
live writes none.

What live mode would have done is recorded instead:

- **Culprit**: the `culprit-found` event is recorded as in live mode and its detail ends with
  `shadow mode: label kept, no comment`.
- **Would-dequeue**: a `would-dequeue` event names the PR, its head and the reason: `base-conflict`
  or `already-in-base` from the composition, or the eligibility reason codes when the rules asked
  for the label to go (`conflicting`, `head-changed-after-label`). One event per head.
- **Not batched again**: a culprit, a base conflict and a head already in the base are remembered
  per head SHA in `shadow.processed`, next to the heads that would have landed. The PR shows up on
  the dashboard as `shadow-processed` until its head changes. A PR the eligibility rules reject
  stays out by its own reason for as long as that reason holds.
- **Merged meanwhile**: Mergify may merge a PR of the batch while the candidate CI runs. When it
  merged the head the candidate tested, the green batch still counts: the `would-land` event ends
  with `merged meanwhile by another path: #N`. A PR merged at another head, closed, or whose
  label or approval went away drops out as in live mode and the rest is recomposed.
- **Live-mode locks**: the first two checks that run before a blessing, the composition and the
  queue-refs protection, run in shadow mode too (see
  [Before the land status is written](#before-the-land-status-is-written)); the base-tip check and
  the land-token check are live only. Unprotected queue refs
  do not pause shadow mode: the `would-land` detail ends with
  `; live mode would pause: queue refs unprotected (<ref>: <rule>, …)`. A composition mismatch
  does pause the base in shadow mode as well, with reason `error`, and records no `would-land`.
  A check that cannot run (a git error while recomposing, a failed rules read) does not fail a
  shadow tick: the `would-land` detail ends with
  `; <composition check|queue refs check> could not run (<why>): live mode would fail the tick`,
  where `<why>` is the error on one line, cut to 200 characters.

Removing a label without a `failure` status is safe: without the label the PR is not eligible, a
label put back by someone who is not an approver does not count, and after an approver labels
again only a status created no earlier than 60 seconds before that label approves the head
(`approvalFor` in `scripts/merge-queue/eligibility.mjs`).

`config/merge-queue/config.json` is read from the **default branch** by the workflow, so a mode
change takes effect when it is merged there.

### Before a mode change or a stop

A live tick can leave the land status `success` on commits of a batch that did not land: a tick
that died after the blessing leaves its batch stored at the in-flight stage `landing`, and a
withdrawal GitHub refused is stored in `landWithdrawals` (see
[Who lands](#who-lands-landingactor)). Every later tick withdraws both, in shadow mode too (a
shadow tick sends a batch stored at the landing stage back to `testing` and turns its `success`
into `failure` first), but no tick runs while the kill switch is off. So before switching a live
queue to shadow (or shadow to live), turning the kill switch off or rolling back:

1. Pause each base: `npm run queue -- pause <base> --reason "<text>"`. The pause tick sends a
   batch at the landing stage back to `testing` and withdraws its land status; a paused base's
   ticks still retry the stored withdrawals.

   Before you pause, check that a batch at stage `landing` is not already the tip of the base:
   `npm run queue -- status --base <base>` prints `stage <stage> · candidate <sha12>` for the batch
   in flight; compare that candidate with the tip (`git ls-remote origin refs/heads/<base>`). If
   they match, that batch did land (its push went through and the state save was lost): let the
   next live tick record it before you pause or change the mode. With `merge-ff` that tick logs
   `<batchId> is already the tip of <base>` and records a `landed` event. If the pause or a shadow
   tick meets it first, it is treated as abandoned: the base tip gets an `omni-queue/land`
   `failure` status (`omni-queue <batchId>: landing withdrawn (batch abandoned)`). After a pause,
   the first live tick after the resume still finds the candidate at the tip and records `landed`;
   when the base runs in shadow instead, history records no `landed` event for that batch. Either
   way it is harmless for the branch, whose commits are already in the base, and nothing needs
   undoing.

2. Check that no batch is at stage `landing` (`npm run queue -- status --base <base>` prints
   `stage <stage>` for the batch in flight) and that `landWithdrawals` is empty: the field is absent
   from `state/<sanitized-base>.json` on `omni-queue-state` (an empty list leaves no field). While
   entries remain, wait for the next ticks to retry them and check again. A stored withdrawal
   dropped because the list was full (20 entries) leaves no field behind either, so also look in
   the history (`npm run queue -- history --base <base> --limit <n>`) for its `error` event:
   `<batchId>: stored withdrawal of <landing.statusContext> on <sha12> dropped (20 stored already); its newest status may still be success`.
   Each one names a commit whose land status may still be `success`: check it before the change.

3. Only then make the change. After a mode change, resume each base
   (`npm run queue -- resume <base>`).

## Kill switch

Every job of `.github/workflows/omni-queue.yml` is skipped unless the repository variable
OMNI_QUEUE_ENABLED is exactly `true` (Settings → Secrets and variables → Actions → Variables).
Setting it to anything else stops new ticks from being admitted: nothing new is composed, a
candidate still waiting on its CI stops being followed, and a `bless` dispatch is skipped like any
other run. It is not an immediate stop: the variable
is read only when a job starts, so a tick already running (and possibly one already pending)
finishes and can still land a green candidate. Pause the base first
(`npm run queue -- pause <base>`) and check that no batch is at stage `landing` and that
`landWithdrawals` is empty (see [Before a mode change or a stop](#before-a-mode-change-or-a-stop)):
with the variable off no tick runs, so nothing withdraws a land status left by a tick that died.
Then flip the variable, cancel the in-progress and pending `omni-queue` runs in the Actions tab,
and confirm with `npm run queue -- history` and the base tip that nothing landed after the cut.
Forks never inherit repository variables.

The workflow and the orchestrator must exist on the **default branch**: `schedule`,
`workflow_run` and `pull_request_target` always run the default branch's copy of the workflow.

`pull_request_target` fires for every pull request of the repository, and each job mints an App
token, so the jobs' `if:` keep only the events the queue cares about. The `approval` job starts
only when the label added or removed is `label` or `protectedApprovalLabel`. A pull request event
starts a tick only when that label is one of those two, one of `blockLabels` or one of the two
`lanes` labels, when the pull request carries the queue label, or when the event is the merge of
a pull request (a base moved). Both jobs run only for pull requests whose base starts with `release/v`: the queue manages
release bases only, and no App token is minted for any other pull request. A label on, or a push
to, a pull request that is not queued starts nothing.

The 5-minute `schedule` trigger only acts on `cheaper-inference/OmniRoute`: both jobs skip a
scheduled run in any other repository (a fork, or the sandbox used for the rehearsal). There,
ticks come from the pull request events above, from a candidate's CI finishing (`workflow_run`),
and from a manual "Run workflow". GitHub may also take a long time to start a cron in a new
repository (none fired during the first hour of the rehearsal sandbox), so the cron is a safety
net, never the main driver: a batch whose window has passed is composed by the next
queue-relevant pull request event, the next candidate CI completion or a manual tick.

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
   | Actions         | Read and write |
   | Metadata        | Read-only      |

   No organization or account permissions. No events to subscribe to. **Workflows** is needed
   because GitHub refuses a push that adds or changes a file under `.github/workflows/` unless the
   token has that permission: without it, every candidate (and every `merge-ff` landing) that
   contains a PR touching a workflow would be rejected. **Actions** write lets the tick re-run the
   failed jobs of a red candidate (`flakyReruns`), and the `tick` job of the workflow asks for it
   when it mints the App token (`permission-actions: write`). Grant "Actions: Read and write" to
   the App, and accept the new permission on the installation, **before** the version of the queue
   that re-runs failed jobs reaches the default branch. What happens in the other order has not
   been measured yet (a rehearsal will record it): an installation without that permission may
   refuse to mint any token, which would fail every tick, not only the re-run.

5. **Where can this GitHub App be installed?** → "Only on this account". Create the App and note
   the **Client ID** and the numeric **App ID** shown on its page. The workflow mints the token with
   the Client ID (the secret OMNI_QUEUE_APP_CLIENT_ID, step 8); the numeric App ID is used only
   by `scripts/merge-queue/apply-ruleset.mjs --app-id` (see [Ruleset](#ruleset)) and is not a
   secret of the workflow.
6. **Private keys** → "Generate a private key". A `.pem` file downloads. It is the key of the
   production environment and of nothing else: keep it in the vault and delete the local copy after
   step 8. When you create it, revoke every other key of the App that was ever stored anywhere else
   (a rehearsal repository, a repository-level secret, a file).
7. **Install App** → the organization → "Only select repositories" → the production repository.
   Shadow mode already needs the App there: both jobs mint its token.

   **One App per repository that holds its key.** An App's private key is valid for every
   installation of that App: whoever holds it can mint a token for any repository the App is
   installed on. So a rehearsal repository gets a GitHub App of its own, never this one. If one App
   is shared for a while, the key stored in the rehearsal repository is a way into production: it can
   write the land status on any commit of the production repository. Before `mode: "live"` the App's
   key exists in this repository's `omni-queue` environment only (see
   [Cut-over and rollback](#cut-over-and-rollback), step 9).

8. In the repository, create the environment `omni-queue` (Settings → Environments → New
   environment) and its configuration:

   ```text
   Environment omni-queue
     Deployment branches: "Selected branches and tags", ONE rule: the default branch,
                          by its exact name (for example release/v3.8.55), never a pattern
     Required reviewers:  none
     Secrets:             OMNI_QUEUE_APP_CLIENT_ID     the Client ID from step 5
                          OMNI_QUEUE_APP_PRIVATE_KEY   the full contents of the .pem from step 6
                          OMNI_QUEUE_LAND_TOKEN        the owner's fine-grained token (see below)
   Repository variable (Settings → Secrets and variables → Actions → Variables)
                          OMNI_QUEUE_ENABLED           "true" only when the queue should run
   ```

   The secrets live in the environment, **not** at repository level (see
   [Before OMNI_QUEUE_ENABLED is set](#before-omni_queue_enabled-is-set) for the order, and for
   deleting repository secrets of the same names). `OMNI_QUEUE_LAND_TOKEN` is a fine-grained
   personal access token of the owner, limited to this repository, with the permissions Contents:
   read and write, Pull requests: read and write, and Workflows: read and write, valid for 90 days;
   write the expiry date down and rotate it before then. GitHub requires the Workflows permission
   for a push of commits that change files under `.github/workflows/`, and the landing is made with
   this token: without it, the landing of every batch that touches a workflow is refused. The token
   is optional while the queue runs in shadow mode (see [Who lands](#who-lands-landingactor)).

   Both jobs of `.github/workflows/omni-queue.yml` declare this environment with
   `deployment: false`: they get its secrets and its branch policy, and no deployment record is
   created per run.

   **Why the branch policy admits the default branch only.** `schedule`, `workflow_run` and
   `pull_request_target` always run the copy of the workflow on the default branch, but
   `workflow_dispatch` runs the workflow file of the ref it is dispatched on. With a pattern such as
   `release/v*`, anyone with write access could create a matching branch carrying an edited
   workflow, dispatch it and read the App's private key. That key is the root of trust of the
   status door (see [Ruleset](#ruleset)): whoever holds it can write the land status on any commit.
   With the default branch as the only admitted ref, a run from any other branch is refused by the
   environment before a step starts.

   That policy does not stop the queue from serving a pull request whose base is another managed
   release branch: a `pull_request_target` run is evaluated against the default branch, whatever the
   pull request's base. This was rehearsed in the sandbox repository on 2026-11-15, with one branch
   rule naming the default branch: a pull request into another release branch got the queue label,
   and the `Approval` job ran in the environment and wrote the approval status with the App. In the
   same rehearsal both jobs declared the environment with `deployment: false`, used its secrets, and
   no deployment record was created in the repository.

   **Release rollover.** The rule names a branch, so it changes whenever the default branch changes.
   Do it in this order:

   1. apply the door to the new release branch (`--kind release --base <new branch>`, see
      [Ruleset](#ruleset));
   2. make the new branch the default branch;
   3. replace the environment's branch rule with the new branch's exact name (replace it, never add
      a second rule).

   In any other order the new branch is, for a while, the default branch or admitted by the
   environment without a door: anyone with write access could push an edited `omni-queue.yml` there,
   and the next scheduled run would read the App's private key.

9. Create the labels if they do not exist yet: the queue label (`omni-queue`),
   `protected-approved` and `omni-queue-dashboard`.

The workflow mints a short-lived token per job with `actions/create-github-app-token` and narrows
it to what that job needs (the `approval` job writes statuses and comments only).

### Before OMNI_QUEUE_ENABLED is set

The environment is a prerequisite of enabling the queue, shadow mode included, not a step of the
cut-over. Both jobs of the workflow name the environment `omni-queue` and read the App's credentials
from it, and a run only happens while OMNI_QUEUE_ENABLED is `true` (the `if:` of both jobs). In
this order:

1. create the environment `omni-queue` with its deployment-branch policy (the default branch, by
   exact name, step 8 above);
2. put its secrets in it: OMNI_QUEUE_APP_CLIENT_ID and OMNI_QUEUE_APP_PRIVATE_KEY, and
   `OMNI_QUEUE_LAND_TOKEN`. A shadow run never lands, so it works without the land token, but a live
   landing needs it: have it in place at the latest before `mode: "live"`;
3. apply the ruleset of the queue's own refs (see [Ruleset](#ruleset)); on the production
   repository:
   `OMNI_QUEUE_ALLOW_PRODUCTION_RULESET=1 node scripts/merge-queue/apply-ruleset.mjs --kind queue-refs --repo cheaper-inference/OmniRoute --app-id <app-id>`.
   The App is already the only legitimate writer of `omni-queue-state` and `omni-queue/**`, so
   shadow mode is not affected;
4. only then set OMNI_QUEUE_ENABLED to `true`.

This cannot be left to GitHub: a job that names an environment that does not exist makes GitHub
create it with no branch policy, and the first run would then read the secrets in an unprotected
environment.

**If the queue is already enabled with a workflow version that has no `environment:`** (the secrets
are at repository level), do 1 and 2 first, before the change that adds `environment:` reaches the
default branch. After the first successful run in the environment, delete the repository-level
secrets of the same names.

**If the environment still holds `OMNI_QUEUE_APP_ID`** from a workflow version that minted the
token with the numeric App ID: add OMNI_QUEUE_APP_CLIENT_ID before the change that reads it
reaches the default branch, and delete `OMNI_QUEUE_APP_ID` from the environment after the first
successful run. The numeric id stays useful only on your machine, for `apply-ruleset.mjs`.

**What the security design assumes**, in one place:

- the environment `omni-queue` exists before the first run of the workflow;
- it has one deployment-branch rule, of type branch, naming the default branch by its exact name;
- no repository-level secret has the name of one of its secrets;
- the App's private key is stored in no other repository (a rehearsal repository has an App of its
  own);
- the ruleset of the queue's own refs (`omni-queue refs protection`) is active before
  OMNI_QUEUE_ENABLED is set.

## Ruleset

Two templates under `config/merge-queue/` are applied by `scripts/merge-queue/apply-ruleset.mjs`,
one per `--kind`.

**`ruleset.release.json`** (`--kind release`, the default) is the door of **one** release branch,
named `omni-queue release protection: <base>`:

- `deletion` and `non_fast_forward`;
- **no `pull_request` rule** and **no bypass actor**: nobody, the owner's admin role and the App
  included, puts a commit on the branch unless the commit carries the land status;
- `required_status_checks` with **one** check only: the context `landing.statusContext` (default
  `omni-queue/land`), pinned with `integration_id` to the queue's GitHub App (`--app-id`), so a
  status of that name written by anyone else does not count. Not strict, and the ruleset does not
  require the PR's own checks: the queue reads them before a PR enters a batch
  (`prChecksRequired`) and validates the candidate before it lands.

The queue's App writes the land status on the commit it is about to land, and `bless` writes it on
one chosen commit (see [Land status and manual bless](#land-status-and-manual-bless)). The landing
push or merge is then made as `landing.actor`. The App's private key is therefore the root of trust
of the door, which is why it lives in a protected environment (see
[Installing the GitHub App](#installing-the-github-app)).

**`ruleset.queue-refs.json`** (`--kind queue-refs`) protects the queue's own refs,
`omni-queue-state` and `omni-queue/**`, with the fixed name `omni-queue refs protection`. It has the
rules `creation`, `update`, `deletion` and `non_fast_forward`, and one bypass actor: the App
(`Integration`, bypass mode `always`). Only the App creates, updates or deletes the state branch and
the candidate branches. Its include patterns are `refs/heads/omni-queue-state` and
`refs/heads/omni-queue/**/*`: in GitHub's ruleset patterns a trailing `**` matches one path segment
only, and a candidate ref has two (`omni-queue/<base>/<batchId>-<sha12>`), so `omni-queue/**` left
the candidates unprotected (measured against GitHub on 2026-11-15); do not simplify the pattern.
Two consequences:

- once it is applied, a candidate rehearsal can only be started through `workflow_dispatch` of the
  `omni-queue` workflow: a user token can no longer push an `omni-queue/**` ref;
- a commit by hand on `omni-queue-state` (see [State](#state)) and the deletion of leftover
  candidate branches (see [Cut-over and rollback](#cut-over-and-rollback)) need the ruleset to be
  disabled first.

Rulesets stack, and **a ruleset's bypass list only covers that ruleset's own rules**. Two
existing repository rulesets also match release branches:

| Ruleset (id)                              | Matches                | Rules                            | Effect on the landing push                                                                                                                                                 |
| ----------------------------------------- | ---------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Protect release branches" (15605329)     | `refs/heads/release/*` | `deletion`, `non_fast_forward`   | None: nobody can delete or force-push a release branch, and the landing push is a fast-forward.                                                                            |
| "Require PR on default branch" (21899981) | `~DEFAULT_BRANCH`      | `pull_request`, no bypass actors | **Rejects it** on whichever release branch is the default branch (the active release): it has no bypass actor, and a ruleset of ours cannot lift it for the landing actor. |

The status door replaces "Require PR on default branch", so the cut-over removes it (see
[Cut-over and rollback](#cut-over-and-rollback)). Until it is gone, the landing-path check below
reports it.

`apply-ruleset.mjs` creates the ruleset, updates it when its normalized content drifted, or leaves
it alone, printing a readable diff:

```bash
# preview: prints the diff and the REST body, writes nothing
node scripts/merge-queue/apply-ruleset.mjs --base release/v3.8.55 --dry-run \
  --repo <owner>/<rehearsal-repo> --app-id <app-id>

# apply the door of one release branch on the rehearsal repository
node scripts/merge-queue/apply-ruleset.mjs --base release/v3.8.55 \
  --repo <owner>/<rehearsal-repo> --app-id <app-id>

# apply the ruleset of the queue's own refs (no --base)
node scripts/merge-queue/apply-ruleset.mjs --kind queue-refs \
  --repo <owner>/<rehearsal-repo> --app-id <app-id>
```

- `--kind` is `release` (the default; `--base` is required) or `queue-refs` (takes no `--base`).
- `--repo` defaults to `GITHUB_REPOSITORY`, `--app-id` to the environment variable
  `OMNI_QUEUE_APP_ID` of the shell that runs the script. It is the numeric App ID, not the Client
  ID the workflow uses, and it is not a secret of the workflow. A real apply of
  either kind without an App id is refused: the id pins the land status to the App (release) or is
  the only bypass actor of the queue's refs (queue-refs). A `--dry-run` without it warns and leaves
  that part out of the preview.
- The land status context and the landing actor come from `config/merge-queue/config.json`
  (`landing.statusContext`, `landing.actor`).
- The token comes from `GITHUB_TOKEN`, else from `gh auth token`; it needs administration access
  to the repository.
- **Production lock**: a real apply of either kind on `cheaper-inference/OmniRoute` (or its old
  name `diegosouzapw/OmniRoute`) is refused unless `OMNI_QUEUE_ALLOW_PRODUCTION_RULESET` is `1`.
  The `--repo` string is checked before any API call; before any write the repository is also
  resolved through the API (`GET /repos/{repo}`, which follows renames and transfers) and the
  check repeats on the returned full name. `--dry-run` is always allowed.
- **Landing-path check** (`--kind release` only): after the apply (or the preview) it reads every
  rule GitHub enforces on the branch (`GET /repos/{repo}/rules/branches/{base}`, all pages, org
  rulesets too) and lists the rules from **other** rulesets that would reject the landing push
  (`pull_request`, `required_status_checks`, `update`, `required_linear_history`,
  `required_signatures`, and the other types in `LANDING_BLOCKING_RULE_TYPES`) because the landing
  actor is not a bypass actor of that ruleset. For `landing.actor: "app"` the App must be an
  `Integration` bypass actor in mode `always` or `exempt`; for `"owner"` the repository admin role
  (`RepositoryRole` 5) or `OrganizationAdmin` in mode `always`. On `--dry-run` this is a warning;
  on a real apply the script exits `1`, after writing its own ruleset, until those rulesets are
  fixed. Its hint is to remove them: the status door replaces them. Rules whose ruleset is not
  readable with the token count as not bypassed.
- Exit codes: `0` ok, `1` failure (API error, or a foreign rule blocks the landing push), `2` usage
  error or refused.
- Run `--kind release` once per new release branch, after the branch is cut and before it becomes
  the default branch (see the release rollover in
  [Installing the GitHub App](#installing-the-github-app), step 8), and `--kind queue-refs` once
  per repository, before the queue is enabled.

## Land status and manual bless

**The land status** is the commit status `landing.statusContext` (`omni-queue/land` by default).
The release ruleset requires it in `success`, from the queue's App, on the commit that reaches the
branch.

- **Who writes it.** The queue's App, through the tick's own App client (never the land token).
  The tick writes `success` right before it lands: on the candidate with `merge-ff`, on each PR
  head with `squash-api` (the `land-blessed` event). If the landing does not complete, the tick
  turns the status of the same commits into `failure`. `bless` (below) is the only other writer.
  In shadow mode nothing lands, so the tick writes no `success`. It writes `failure` only to
  withdraw a `success` that live mode left before a switch to shadow (see
  [Before a mode change or a stop](#before-a-mode-change-or-a-stop)); a queue that was never live
  reads and writes no land status.
- **Who reads it.** The release ruleset. The queue's own verdict on a candidate reads no commit
  status at all (see [Accepting a candidate](#accepting-a-candidate)).

### Before the land status is written

The tick trusts two things it reads back from the repository: the batch in flight on
`omni-queue-state` and the candidate commit under `omni-queue/**`. Before a green batch is blessed
(and, in shadow mode, before it is recorded as `would-land`), after its pull requests are re-read
(see [Eligibility](#eligibility)), the tick checks, in this order:

1. **The candidate is the composition of the stored batch** (`verifyComposition` in
   `scripts/merge-queue/land.mjs`, live and shadow). The first-parent chain from the stored base to
   the candidate holds one queue merge commit per pull request (stacked pull requests excepted),
   with the `Omni-Queue-PR` and `Omni-Queue-Head` trailers and the second parent the batch names,
   and nothing else. Each merge commit's tree must be what its two parents merge to: the tick
   recomposes it with `git merge-tree`, the call the composition makes. Each merge commit must also
   carry exactly one `Omni-Queue-Base`, equal to the stored base: the candidate's CI takes its base
   from that trailer (`scripts/merge-queue/candidate-base.mjs`), and a second line with that key, in
   any paragraph of the message, is a mismatch (the queue never writes two). The tick reads each
   commit's whole message, as the CI does: output of `git log` that does not split into whole
   commits is a mismatch too, never skipped. With `squash-api` the candidate's tree must
   also be the stored one. The check does not compare the subject line, the other trailers
   (`Omni-Queue-Author`, `Omni-Queue-Target`, `Omni-Queue-Batch`) or the commits' author and
   committer. A mismatch blesses nothing, records no `would-land` in shadow mode, and pauses the
   base with reason `error` and this detail:

   ```text
   the stored in-flight batch <batchId> does not match its candidate <sha12>: <what differs> (state tampering or corruption: not landed, not retried)
   ```

   For a tree, `<what differs>` reads
   `merge commit <sha12> of #<n>: tree <sha12>, recomposing gives <sha12 or conflict>`. For the
   base trailer it reads
   `merge commit <sha12> of #<n> carries Omni-Queue-Base <sha12>, the batch's base is <sha12>`,
   `merge commit <sha12> of #<n> carries no Omni-Queue-Base trailer`, or
   `merge commit <sha12> of #<n> carries <count> Omni-Queue-Base trailers`. A chain that cannot be
   read reads `the first-parent chain cannot be read as whole commits` or
   `the first-parent chain cannot be read past commit <n>`.

   A git error while recomposing (an object the tick's scratch repository cannot fetch) is not a
   mismatch. In live mode it fails the tick, which blesses nothing (the next tick checks again). In
   shadow mode the tick goes on and the `would-land` detail ends with
   `; composition check could not run (<why>): live mode would fail the tick`.

2. **GitHub protects the queue's refs** (`readQueueRefsProtection` in
   `scripts/merge-queue/refs-guard.mjs`). The tick reads the rules GitHub enforces on
   `omni-queue-state` and on the batch's candidate ref (`GET /repos/{owner}/{repo}/rules/branches/{branch}`,
   once per tick) and requires `creation`, `update` and `deletion` on both: the rules of the
   `omni-queue refs protection` ruleset (see [Ruleset](#ruleset)). In live mode, when one is missing,
   nothing is blessed and the base is paused with reason `error`:

   ```text
   queue refs are not protected (<ref>: <rule>, …): not blessed, not landed; apply apply-ruleset.mjs --kind queue-refs, then resume
   ```

   In shadow mode nothing pauses: the `would-land` detail ends with
   `; live mode would pause: queue refs unprotected (<ref>: <rule>, …)`. A failed read is never
   taken for protected or unprotected. In live mode it fails the tick (the next tick reads again);
   in shadow mode the `would-land` detail ends with
   `; queue refs check could not run (<why>): live mode would fail the tick`.

3. **The base tip is the stored base** (live mode only). The tick reads the base tip once, at the
   start of the landing, and it must equal the base the batch was composed on: a stored base that
   is not the tip (planted in the state, or rewound away) would otherwise let a blessed candidate
   carry it into the branch by a manual fast-forward. If the base moved, nothing is blessed: a
   `land-rejected` event with the detail
   `base moved: base <base> is at <tip>, expected <stored base>; recomposing`, and the same pull
   requests are composed on the tip. If the base branch does not exist, the base is paused with
   reason `error` and the detail `base <base> not found: not blessed, not landed`.

Then the landing-attempts limit (see [Who lands](#who-lands-landingactor)) and, in live mode, the
land token are checked, the landing stage is saved and the land status is written. Shadow mode
judges a batch on its stored base: there the base moves all the time and nothing lands.

A manual bless does none of this: it does not use the batch in flight, and the approver chooses
the commit.

**Manual bless** is the explicit exit for a commit that has to reach a release branch without going
through a batch. It writes the land status on one commit of your choosing.

```bash
npm run queue -- bless release/v3.8.55 --sha <40-hex sha> --reason "sync-back of main"
```

The CLI takes the base as a positional argument. It dispatches the `omni-queue` workflow with
`action=bless` (from the Actions tab you fill the workflow inputs `base`, `action`, `sha` and
`reason` yourself; the tick receives them as `--base`, `--action`, `--sha` and `--reason`) and
waits for the `manual-bless` event of that SHA before it reports the bless as applied. It needs
OMNI_QUEUE_ENABLED to be `true`, like any run of the workflow.

Dispatch a bless through the CLI, not from the Actions tab. The run waits in the tick's
concurrency group (`omni-queue-tick`), where GitHub keeps one pending run: a newer tick can replace
the pending bless, and that run ends `cancelled` without writing anything. The CLI sees it, dispatches
the bless again and keeps waiting for the `manual-bless` event; a bless dispatched by hand is lost
the same way and nobody dispatches it again (see [CLI](#cli)).

The tick checks, in this order, **before anything is written**:

1. both the person who dispatched the run (`github.actor`, passed to the tick as `GITHUB_ACTOR`) and
   the person who triggered this run of it (`github.triggering_actor`, passed as
   `GITHUB_TRIGGERING_ACTOR`) are in `approvers`. They differ on a re-run, which keeps the inputs of
   the original dispatch; when either variable is missing the bless is refused;
2. `--sha` is a full 40-hex, lower-case commit SHA;
3. a reason is given (whitespace is collapsed);
4. the repository's Git commits endpoint (`GET /repos/{owner}/{repo}/git/commits/{sha}`) returns a
   commit with that SHA. The check proves that GitHub can read the commit through this repository,
   not that the commit is on one of its branches.

The base (the CLI's positional argument, the `base` input of the workflow) must also be matched by
`bases`. A refused bless writes nothing: no status, no
event, no state change. The run ends failed and the CLI reports that the run ended without applying
the bless.

An accepted bless:

- writes `omni-queue/land` in `success` on that commit, with the description
  `manual bless by @<login>: <reason>` (cut to GitHub's 140 characters), or
  `manual bless by @<dispatcher> (re-run by @<re-runner>): <reason>` when the two logins differ;
- records a `manual-bless` event in the base's history (`npm run queue -- history`) with the SHA,
  the login and the reason, and saves the state;
- touches nothing else: no in-flight batch, no pause, no pull request, no dashboard.

After it, **you** push or merge that commit yourself. The queue lands nothing for a bless, and the
rules of the release ruleset that stay (`non_fast_forward`, `deletion`) still apply, so a push has
to be a fast-forward of the branch. The commit is not validated by the queue: the bless is a
maintainer's decision, not a CI verdict.

The three uses:

- **Hotfix**: a commit that cannot wait for a batch.
- **Sync-back landing**: the `main → release/vX+1` merge commit, pushed as the merge commit it
  already is (see AGENTS.md → "Sync-back landings are fast-forward, never squash").
- **Base repair**: a fix to a red base that the maintainer lands directly instead of through a
  batch.

A bless works in shadow mode and while the base is paused: the code checks neither the `mode` nor
the pause. While no ruleset requiring the status is applied to the branch (the case in shadow mode
before the cut-over), a bless changes nothing about what can be pushed: it only records the status
and the event.

## Security posture

- **No PR code runs in the queue workflow.** Both jobs check out the default branch (sparse:
  `scripts/merge-queue` and `config/merge-queue`) and run zero-dependency Node scripts. PR content
  is handled only as git objects in a scratch bare repository (`git merge-tree` /
  `git commit-tree`); no working tree of PR code is ever created.
- **Candidates run with repository secrets** (not those of the `omni-queue` environment), the same
  posture as Mergify's draft PRs today: a candidate contains fork code and `ci.yml` /
  `quality.yml` run on it. The approver's label is the authorization, so review a PR before
  labelling it.
- **Hosted runners only.** The queue jobs run on `ubuntu-latest`, never on a self-hosted runner,
  and the candidate CI uses the hosted lanes of the `merge_group` profile.
- **No deploy or publish on `omni-queue/**`**: VPS deploy, Docker and npm publication never
  trigger on candidate branches.
- **Least privilege**: one App token per job with only the permissions that job needs; the
  workflow's own `GITHUB_TOKEN` is read-only. The owner's `OMNI_QUEUE_LAND_TOKEN` reaches only the
  tick step, and only the landing uses it.
- **The App key is the root of trust of the status door.** Whoever can use it can write the land
  status on any commit. Both jobs run in the `omni-queue` environment, which holds the App's
  credentials and the land token and admits the default branch only, so a workflow on a candidate
  branch, or on a branch someone creates and dispatches, cannot read them (see
  [Installing the GitHub App](#installing-the-github-app), step 8).
- **Untrusted text**: PR titles are flattened by `sanitizeTitle` before they reach a commit
  message and escaped in the dashboard; git runs through `scripts/merge-queue/gitexec.mjs` (no
  shell, token in the environment as an HTTP header, OMNI_QUEUE_TOKEN and `OMNI_QUEUE_LAND_TOKEN`
  removed from the environment of every git process, redacted errors).
- **Approvals are bound to SHAs**, never to commit dates (see [Eligibility](#eligibility)).

## Incidents

**Base-red.** The dashboard shows a `base-red` pause, and when a `🔴 Release branch not green:
<base>` issue is open the queue comments on it with the candidate's checks. The batch is innocent
and stays queued. Fix the base through its own `fix/release-vX.Y.Z-basereds` PR (AGENTS.md →
"Base-green check"); the pause lifts by itself when the base tip moves, or when a PR of the
base-repair lane (`lanes.baseRepairLabel`) lands through the queue. Once the door is applied
(see [Ruleset](#ruleset)), that fix reaches the paused base only through a bless: bless the head of
the fix PR (`npm run queue -- bless <base> --sha <head> --reason "base repair"`), then merge it (see
[Land status and manual bless](#land-status-and-manual-bless)). If the failure turns out to be
flaky and the tip will not move soon, resume by hand: `npm run queue -- resume <base>`.

**Base-repair lane.** An `infra` or `error` pause reached while a repair is in flight replaces the
`base-red` pause, as for any batch. After the resume the repair is taken again; if it lands there
is no `resumed` event `base repaired by #<n>`, because no `base-red` pause was left; without a
valid repair, the next ordinary batch on the red base is classified base-red again from the
recorded verdict. A lane label removed while its candidate is in CI does not drop the candidate
(lane labels, like the PR gates, are not re-read before landing); removing the queue label still
does. In shadow mode a repair that does not fix the base leaves only the `checks-red` event and the
`repairTried` entry (and `base-red-paused` when the base was not paused yet): shadow mode posts no
comment on a PR.

**Pause and resume.** `npm run queue -- pause <base> --reason "<text>"` freezes one base (reason
`manual`): its ticks neither follow the candidate in flight nor compose or land anything, and that
candidate is picked up again after `npm run queue -- resume <base>`. A paused base's ticks still
run: they retry the stored land-status withdrawals (see [Who lands](#who-lands-landingactor)), take
the PR snapshot and run eligibility (dashboard, eligibility comments and label removals), delete
stray candidate refs and update the dashboard. The pause tick itself sends a batch at the landing
stage back to `testing` and withdraws its land status. To stop every base, use the kill switch, and cancel any
running `omni-queue` run (see [Kill switch](#kill-switch)).

**Recomposition when the base moves.** A `land-rejected` event whose detail starts with
`base moved` means the base is no longer where the batch was composed (a manual merge, a sync-back,
a hotfix). In live mode the tick compares the base tip with the stored base before it blesses
anything (`base moved: base <base> is at <tip>, expected <stored base>; recomposing`), so in the
ordinary case nothing was blessed. Between that read and the landing the base can still move. With
`squash-api` the landing refuses any move, forward ones included; with `merge-ff` the push refuses
a base that moved anywhere other than towards the candidate. A refused landing withdraws the status
written for it, records `land-rejected` and loses nothing: the same PRs are composed on the new tip
and CI runs again. One exception, `merge-ff` only: a tip that moved forward to a commit between the
stored base and the candidate (one of the batch's own PR heads, for example) is not refused, and
the push lands the exact tested tree, with no `land-rejected`. Frequent `land-rejected` events mean something else
merges into a managed base; route those merges through the label instead. A tip the queue did not
expect and nobody pushed (a rewind, a commit named in the state that never was the tip) is worth a
look at the base's history before anything else.

**Landing paused: base not found.** The detail `base <base> not found: not blessed, not landed`
means the release branch did not exist when the tick read it. Nothing was blessed. Find out what
happened to the branch (deleted, renamed, a release rollover done out of order) and restore it
before `npm run queue -- resume <base>`: a resume recomposes the batch on the tip.

**Tree divergence (`squash-api` only).** The base tree after the squash merges differs from the
candidate tree. The queue pauses with reason `tree-divergence` and opens an issue. Compare the
two trees (`git diff <candidateSha> <base>`), fix the base by PR if needed, close the
`🛑 omni-queue tree divergence: <base>` issue, then resume (`npm run queue -- resume <base>`).
While that issue is open, every `squash-api` landing pauses the base again. Prefer `merge-ff`,
which cannot diverge.

**Infra failure or timeout.** Up to `infraRetries` retries under a new ref (`-r1`, `-r2`, …; one
in the shipped config); the failure after the last retry pauses the base with reason `infra`, unless every run of the candidate only hit a job time limit: that is a
suspected hanging test (`hang-suspected`) and ends in a base check and a bisection, not a pause
(see [Red candidates](#red-candidates-classification-base-check-bisection)). Check the Actions
status page and the candidate's run, then resume. A
`checks-timeout` event whose detail says "no CI run for candidate" means GitHub never started a
workflow for the candidate push: check the Actions policies and that `ci.yml` / `quality.yml`
still trigger on `omni-queue/**`.

**Dashboard stopped updating.** An idle queue rewrites only the dashboard's heartbeat line, once per
hour, and only for a base that ticks visit, so first tell idle from dead: while ticks complete for
a base, `updatedAt` in `state/<sanitized-base>.json` on `omni-queue-state` moves at least once per
hour. If it is older,
check, in order: the latest `omni-queue` runs in the Actions tab;
the OMNI_QUEUE_ENABLED variable; the secrets of the `omni-queue` environment (a rotated key or an
uninstalled App fails at the token step) and its deployment branch, which must still be the default
branch (a run refused by the environment never starts a step); a tick failing on an invalid state
document (fix it with an ordinary commit on `omni-queue-state` while paused; with the queue-refs
ruleset applied, disable it first); a queue run that is pending forever (only one tick runs at a
time, by design).

**Dequeued PR.** The PR lost the label and got a comment with the reason (culprit of a red batch,
conflict with the base, head moved after approval, head already part of the base). Fix it and
label it again; a PR already in the base needs nothing more. In shadow mode the PR keeps its
label and gets no comment: look for the `culprit-found` or `would-dequeue` event on the dashboard.

**Landing paused with reason `error`.** The pause detail names `OMNI_QUEUE_LAND_TOKEN` when the
token is missing or refused (see [Who lands](#who-lands-landingactor)). Fix the token in the
`omni-queue` environment, then `npm run queue -- resume <base>`. The two cases differ in what is
left on the commits:

- **Token refused**: the status was written and then turned into `failure`, so nothing can merge
  the commits of that batch by hand in the meantime.
- **Token missing**: nothing was blessed, so the commits have no land status at all.

The same pause, with a detail that says the stored in-flight batch `does not match its candidate`
and names `state tampering or corruption`, means the candidate is not exactly the composition of
the PRs the state names (no PR, a PR the candidate does not merge, a commit that is not a queue
merge commit, a merge commit whose tree is not the merge of its two parents, a merge commit whose
`Omni-Queue-Base` is not the stored base or that carries more than one, or another candidate tree
with `squash-api`; see
[Before the land status is written](#before-the-land-status-is-written)). Nothing was blessed or
landed, and in shadow mode nothing was recorded as would-land. Find out how the state document or
the candidate ref changed before you resume: the queue does not retry it. When the detail names a
tree (`merge commit <sha12> of #<n>: tree <sha12>, recomposing gives <sha12>`) and neither ref was
touched, the cause can be the runner: the tick recomposes the merge with the git of its own runner,
and a git version that merges differently from the one that composed the candidate gives another
tree for a legitimate batch. Recompose that merge locally with the parents of the named commit
(`git merge-tree --write-tree <first parent> <second parent>`) and compare; if the trees agree and
nothing was tampered with, resume. Shadow mode runs the same check, so repeated tree mismatches
there are the signal to look at before `mode: "live"`.

**Landing paused: queue refs are not protected.** The detail
`queue refs are not protected (<ref>: <rule>, …): not blessed, not landed; apply apply-ruleset.mjs --kind queue-refs, then resume`
means GitHub did not enforce `creation`, `update` or `deletion` on `omni-queue-state` or on the
candidate ref when the tick read it. Nothing was blessed. The usual cause is the
`omni-queue refs protection` ruleset left disabled after a manual edit of the state, or never
applied. Enable it, or apply it again
(`node scripts/merge-queue/apply-ruleset.mjs --kind queue-refs --repo <owner/repo> --app-id <app-id>`,
with `OMNI_QUEUE_ALLOW_PRODUCTION_RULESET=1` on the production repository; see [Ruleset](#ruleset)).
If the refs were unprotected for a while, read the state document again and check the candidate
branches before `npm run queue -- resume <base>`: the resume recomposes the batch. In shadow mode
the same finding only adds `live mode would pause: queue refs unprotected (…)` to the `would-land`
detail.

**Landing paused: the landing was refused.** The detail
`landing <batchId> failed (<reason>): <detail>` means the landing ended with a verdict that is
not a success, a moved base or a tree divergence: `rejected` (the push was refused by a
ruleset, a protected-branch hook or another server-side rule, or the base was missing at the
landing's own read), `not-descendant` (a local check before any push: the stored base is not an ancestor of the
candidate) or,
with `squash-api`, `merge-failed` (GitHub refused one PR's merge; the PRs merged before it are on
the base and named on the `error` event). The status written for the landing was withdrawn. Read
the detail: for `rejected`, check the rules GitHub enforces on the base (the landing-path check of
`apply-ruleset.mjs --kind release` lists the rules of other rulesets that block the landing actor,
see [Ruleset](#ruleset)); for `merge-failed`, look at the PR GitHub refused. Fix the cause, then
`npm run queue -- resume <base>`: the batch is recomposed on the tip. The reason `auth-failed`
has the same format and is the authentication case of [Who lands](#who-lands-landingactor).

**Landing paused after three attempts.** The detail
`landing of <batchId> ended without a verdict 3 times in a row (last error: <detail>); not blessed again`
means three ticks in a row blessed the batch and none of them reached a verdict: the landing threw
an error that is neither an authentication refusal nor a known refusal, or the tick died after the
blessing. The status of the batch's commits was withdrawn. Read the last `error` events of
`npm run queue -- history --base <base>` and the failed `omni-queue` runs. A GitHub rate limit
that outlasts three ticks ends here too: a 403 that says `rate limit` is retried, not treated as a
refused token. Once the cause is gone, `npm run queue -- resume <base>` recomposes the batch.

**Labels with no effect.** If labeled PRs stay `approval-missing` and no `omni-queue/approval`
status appears on their heads, the `approval` job is not running: look for failed
`pull_request_target` runs with an "is not allowed to trigger Actions workflows" error (see
[Actions event policy](#actions-event-policy-pull_request_target-in-public-repositories)).

## Cut-over and rollback

The cut-over is a separate owner decision, taken after the sandbox rehearsal and a few days of
shadow mode on the real repository. In order:

1. Stop Mergify from acting on release PRs (remove its queue rules in a PR that also updates
   `tests/unit/mergify-queue-config.test.ts`) and drain or remove the remaining `queue` labels.
2. Make sure the Actions policy that allows `.github/workflows/omni-queue.yml` exists on the
   production repository (see
   [Actions event policy](#actions-event-policy-pull_request_target-in-public-repositories)); it
   is needed already for shadow mode.
3. Confirm that the environment `omni-queue` exists with the default branch as its only deployment
   branch, by exact name, and no required reviewers. It was created before the queue was enabled
   (see [Before OMNI_QUEUE_ENABLED is set](#before-omni_queue_enabled-is-set)); if it was not,
   stop and do that first.
4. Confirm that OMNI_QUEUE_APP_CLIENT_ID, OMNI_QUEUE_APP_PRIVATE_KEY and `OMNI_QUEUE_LAND_TOKEN`
   are secrets of that environment (the land token: fine-grained, this repository only, Contents,
   Pull requests and Workflows in read and write, valid for 90 days, with its replacement date
   written down), that no repository-level secret of the same names is left, and that no
   `OMNI_QUEUE_APP_ID` secret is left: the workflow no longer reads it.
5. Confirm that the ruleset of the queue's own refs (`omni-queue refs protection`) is active. It
   was applied before the queue was enabled (see
   [Before OMNI_QUEUE_ENABLED is set](#before-omni_queue_enabled-is-set)); if it was not, stop and
   apply it first.
6. Apply the door to every active release branch:
   `OMNI_QUEUE_ALLOW_PRODUCTION_RULESET=1 node scripts/merge-queue/apply-ruleset.mjs --base <branch> --repo cheaper-inference/OmniRoute --app-id <app-id>`.
   While "Require PR on default branch" still exists, the script exits `1` on the base that is the
   default branch (the rule matches `~DEFAULT_BRANCH`) and names it as a rule that would reject the
   landing push. From this step on nothing reaches a release branch without the land status,
   Mergify included.
7. Remove the old ruleset "Require PR on default branch" (21899981): the status door replaces it.
   Rerun the apply of step 6 until it exits `0` on every branch.
8. Decide the label: keep `omni-queue` or set `label` to `queue` (in the config **and** in the
   job filters of `omni-queue.yml`, see [Eligibility](#eligibility)). A change goes in a pull
   request into the default branch, and from step 6 on nothing reaches it without the land status
   while the queue is still in shadow mode: bless the head of that pull request
   (`npm run queue -- bless <default branch> --sha <head> --reason "<text>"`), then merge it.
9. Only then put `mode: "live"` into `config/merge-queue/config.json` on the default branch. Before
   that, confirm the preconditions of live mode:
   - the App's private key exists in this repository's `omni-queue` environment only: no rehearsal
     repository, repository-level secret or file holds a key of this App (see
     [Installing the GitHub App](#installing-the-github-app), step 7);
   - the `omni-queue refs protection` ruleset is active (step 5): without it a live tick blesses
     nothing and pauses (see
     [Before the land status is written](#before-the-land-status-is-written));
   - recent shadow `would-land` events carry neither suffix: no
     `live mode would pause: queue refs unprotected (…)` and no
     `<composition check|queue refs check> could not run (…): live mode would fail the tick`; and
     no shadow batch was paused for a composition mismatch;
   - for this and any later mode change: each base paused, no batch at stage `landing` and an
     empty `landWithdrawals` (see
     [Before a mode change or a stop](#before-a-mode-change-or-a-stop)).

   The queue cannot land that pull request (it is still in shadow mode): bless its head, then merge
   it, as in step 8.

10. Retire any local guard that blocks manual merges into release branches while a gate is red: the
    ruleset refuses a manual merge without the land status from step 6 on, so such a guard is
    redundant.
11. Update the merge skills and `AGENTS.md` (agent-instruction surfaces: each change needs the
    owner's explicit approval). These pull requests touch protected paths: once step 9 is on the
    default branch they land through the queue, with the queue label and `protected-approved`.
    One merged before that cannot be landed by the queue (still in shadow mode): bless its head,
    then merge it, as in step 8.

Rollback: first pause each base and check that no batch is at stage `landing` and that
`landWithdrawals` is empty (see [Before a mode change or a stop](#before-a-mode-change-or-a-stop)).
Then set OMNI_QUEUE_ENABLED to `false`. That stops new ticks only: cancel the in-progress and
pending `omni-queue` runs in the Actions tab (or wait for them to end), and check with
`npm run queue -- history` and each base tip that nothing landed after the cut before declaring
the rollback done (see [Kill switch](#kill-switch)). Then:

- delete the `omni-queue release protection: <base>` rulesets in Settings → Rules → Rulesets
  (while they exist, nothing reaches those branches without the land status) and restore "Require
  PR on default branch" if it was removed;
- re-enable the Mergify queue rules;
- delete the `omni-queue refs protection` ruleset if the state branch or the candidate branches
  have to be changed by hand. Leftover `omni-queue/**` candidate branches can be deleted once
  nothing is in flight; the `omni-queue-state` branch can stay as an audit trail;
- before rolling the code back (the workflow and `scripts/merge-queue` on the default branch) to a
  version from before the land status, clean the state. That code refuses a state document whose
  history holds an event type it does not know (`validateState` in
  `scripts/merge-queue/contracts.mjs` checks each history event against `EVENT_TYPES`), and
  `manual-bless`, `land-blessed` and `hang-suspected` are new: its ticks would fail on every base
  whose last 200 events hold one of them. With OMNI_QUEUE_ENABLED `false` and the
  `omni-queue refs protection` ruleset disabled or deleted, remove those events from each
  `state/<sanitized-base>.json` on `omni-queue-state` with an ordinary commit, and only then merge
  the older code. `flaky-rerun` is newer still: a rollback to any version from before the re-run of
  failed jobs removes the `flaky-rerun` events the same way (the `inFlight.rerun` field it leaves
  needs no cleaning: that code ignores it). `queue-stalled` is newer still: a rollback to any
  version from before the stalled-queue alert removes the `queue-stalled` events the same way; the
  `stalled` field it leaves needs no cleaning (that code ignores it), and neither does the
  watchdog's open issue (close it by hand, or delete `omni-queue-watchdog.yml` too). The
  `batchWindow` field (adaptive batch size) needs no
  cleaning either: older code loads the document and ignores it, and its batches take up to
  `batch.maxSize` again. Nor do the lane fields: `inFlight.lane` (a hotfix or base-repair batch in
  flight; older code processes it as an ordinary batch, which can move the window and, under a
  base-red pause, is left as is) and `repairTried` (base-repair heads that failed like the base;
  older code ignores it, never prunes it, and never composes a repair alone);
- rolling the code back to a version from before the live-mode locks (the state fields
  `landWithdrawals` and `inFlight.landAttempts`) needs no cleaning: that code loads the document
  and carries both fields along without acting on them. Its ticks do not retry a stored withdrawal,
  and a blessing by hand does not drop one. So **before rolling forward again**, read
  `landWithdrawals` in each `state/<sanitized-base>.json`. An entry whose SHA was blessed while the
  older code ran (a `manual-bless` event for that SHA after the entry's `since`) would have its
  `success` turned into `failure` by the first new tick. Remove such entries with an ordinary
  commit (OMNI_QUEUE_ENABLED `false`, the queue-refs ruleset disabled, then enabled again), or, after
  the first new tick, check the newest `omni-queue/land` status of each blessed SHA and bless it
  again where it reads `failure`. A batch stored at the landing stage also keeps its
  `inFlight.landAttempts` across both moves, so after the roll-forward it can reach the attempts
  limit with fewer than three new attempts.
