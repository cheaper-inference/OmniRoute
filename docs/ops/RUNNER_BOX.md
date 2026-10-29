---
title: Self-Hosted Runner Box Operations
---

# Self-Hosted Runner Box Operations (.113 pool)

The self-hosted pool runs on the **.113** box (`tomni-proxmox-113`). Since 2026-10-18 each
OmniRoute runner has **one role**, one label, and a memory/CPU budget sized to what its workload
measured. The Turbopack slot gets what the build needs; the other slots are sized to their
measured peaks. The box only overcommits when a Turbopack build coincides with a Release-Green
webpack build and a lint job; host swap (16 GB) absorbs that, and because pull-request Builds run
hosted, the Turbopack slot is idle most of the time:

| runner               | label          | role                                                                                                                                                 | `MemoryHigh` / `MemoryMax` | `CPUQuota` |
| -------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------- |
| `omniroute-113-5`    | `omni-build`   | Turbopack builds: `ci.yml` `Build` (push/dispatch only), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, the nightly a11y build | 56 GB / 60 GB (swap 0)     | 1600 %     |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), webpack build                                                                                        | 20 GB / 24 GB (swap 4 GB)  | 800 %      |
| `omniroute-113-2`    | `omni-light`   | nightlies (Schemathesis, promptfoo, garak, k6) and `quality.yml` `lint-guard`                                                                        | 12 GB / 16 GB (swap 4 GB)  | 600 %      |
| `omniroute-113`      | `omni-light`   | same pool as above                                                                                                                                   | 8 GB / 12 GB               | 400 %      |
| OmniHeuris, OmniMind | (their repos)  | Dependabot only (peak 155 MB each, 2026-10-18)                                                                                                       | 4 GB / 6 GB                | 200 % each |

Measured 2026-10-18:

| resource  | value                        | what it means for scheduling                                                                                                                                                                                                                                                                                                                          |
| --------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 cores**         | a Turbopack production build peaked at 49 GB uncapped (`tests/unit/ci-build-bundler-webpack.test.ts`); on Next 16.3.8 the compile phase alone holds ~40 GB (36 GB RSS in `next-build` plus 17 loader workers at 3 GB, measured 2026-10-18); a webpack build at ~14–16 GB. One Turbopack + one webpack build fit together; two Turbopack builds do not |
| swap      | 16 GB                        | `omniroute-113-5` runs with swap off (`MemorySwapMax=0`) so a runaway build is cut at its cap instead of swapping the box                                                                                                                                                                                                                             |
| `/tmp`    | **12 GB tmpfs = RAM**        | anything parked there is memory; leftovers are swept after 3 h                                                                                                                                                                                                                                                                                        |
| CPU       | load 60 on 32 cores observed | before the quotas, one Turbopack build (~1166 % CPU) plus a coverage suite on the same box starved the other listeners' heartbeats (`The self-hosted runner lost communication`, #16853)                                                                                                                                                              |
| runners   | **7 listeners** (2026-10-28) | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` also carries `omni-build`; `omniroute-113-3/-4/-8` were deleted from the repo (2026-10-28)                                                                                                                                                                                                     |

The limits live in each unit's `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
(previous values kept as `override.conf.bak-20261018`) and were applied live with
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — no restart, so no
running job was touched. Labels are changed through the runners API
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), also live.

## Install the janitor (one-time, on the box)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): every 30 min, log to /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` is required: the janitor proves a path is idle with one snapshot of open
files before removing it, and without the tool it removes nothing and says so
(exit 1). Try any change with `--dry-run` first — it prints exactly what it would
do and touches nothing.

What it does every run: sweeps our own leftovers (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) after **3 h on tmpfs** and 24 h on disk
`_work/_temp`; kills a `next-build` older than 75 min (no job runs that long — on
2026-08-27 one ran 70 min after GitHub had declared its job lost); prunes 48 h-old
checkouts of runners whose unit is **stopped**; alerts on disk ≥ 85 %, memory PSI
`full/avg60` ≥ 10 %, and more listeners than `MAX_ACTIVE_RUNNERS` (with an
omniroute/other breakdown). Exit 1 = attention needed; read the log.

The 75-minute rule does not catch a build whose job GitHub already gave up on. When the
`Runner.Listener` cannot renew its job, `_diag/Runner_*.log` shows
`POST request to …/renewjob timed out after 100 seconds`, the API reports the job `completed`
(failure) about ten minutes after the last successful renewal, and `next-build` keeps running with
no job attached (2026-10-18: the Build of #17066 was failed at 19:43 and its build was still
holding 40 GB five minutes later). Confirm the ref in the newest `_diag/Worker_*.log`, then
SIGTERM only the build tree by PID — `next-build`, `npm run build`, `build-next-isolated.mjs` and
the `_work` workers. Never touch `Runner.Listener`, `RunnerService.js` or `Runner.Worker`: the
worker reports the job as cancelled and the listener goes back online by itself.

## Runner units: KillMode

The runner's default `KillMode=process` leaves `Runner.Worker → npm → next-build`
alive when a unit is stopped or restarted — an orphan build keeps eating RAM and
CPU with no job attached. Every OmniRoute unit carries a drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
with `KillMode=mixed`: SIGTERM to the listener first, SIGKILL to the whole cgroup at
`TimeoutStop`. It takes effect on the unit's next restart — restart **one runner at
a time, only when idle**, with the idle check and the restart in the same command.

## Operating rules

- **One Turbopack build at a time — enforced by label.** Every job that runs a full Turbopack
  `next build` targets `[self-hosted, omni-build]`, and only **`omniroute-113-5`** carries that
  label: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  the nightly a11y build (#16853) and `docker-publish.yml` **amd64** (webpack inside BuildKit —
  Turbopack panicked there, run 33253576569). The arm64 Docker leg stays on `ubuntu-24.04-arm`.
  `docker-publish` amd64 shares the `heavy-build-main` concurrency group with `ci.yml` `Build`
  (`cancel-in-progress: false`). Docker Engine must be on `omniroute-113-5`. A second Turbopack
  slot does not fit 78 GB (2 × 33–37 GB plus the rest of the box); a second slot is only safe for
  webpack builds.
- **Pull-request Builds run hosted (2026-10-18).** `ci.yml` `Build` reaches `omni-build` only for
  `push` and `workflow_dispatch`; every `pull_request` (own-origin or fork) and `merge_group` Build
  runs on `ubuntu-latest` with webpack. With every own-origin PR routed to the slot, a Turbopack
  Build held it 29–58 min, 18 Builds queued for up to 18 h, and the release line's own push Build
  got the slot once in 40 jobs. Hosted, the same PR Build takes 8–12 min next to the PR's other
  jobs. Turbopack, the bundler `npm-publish` ships, stays exercised on the release line by the
  nightly a11y build of the default branch (04:41 UTC), by every push or dispatch Build that
  reaches the slot, and by `npm-publish` itself. `tests/unit/build/heavy-build-queue.test.ts`
  pins the four-clause gate.
- **Never size the Turbopack slot below its measured need.** On 2026-10-18 at 18:06 the slot was
  lowered from 56G/60G to 40G/44G to make room for `omni-release`. The compile phase sat at the
  `MemoryHigh` for its whole run (memory PSI `full` 30–43 %), and the `Runner.Listener`, which
  shares the cgroup, could not renew its job. The owner's 56G/60G of 2026-10-17 was restored the
  same day. Below that value the build does not fail; it thrashes, and the job is lost.
- **Release-Green has its own slot (2026-10-18).** Until then both Release-Green validations ran
  on `omni-build`: on every push (~10/hour, 97 of 100 push runs cancelled mid-work in one day)
  and three ~2 h full sweeps a day (the 05:29 sweep waited 6 h for the slot) — the single build
  slot was oversubscribed several times over and own-origin PR Builds waited for hours.
  `release-green` and `main-green` now target `omni-release` (`omniroute-113-6` only) with
  `OMNIROUTE_USE_TURBOPACK=0`, and a started run is no longer cancelled by a newer push (the
  pending slot still collapses the storm). `tests/unit/build/runner-capacity-routing.test.ts`
  pins the routing, the webpack switch and that nothing on `omni-release` builds with Turbopack.
- **Light pool: `omni-light`.** `omniroute-113` and `omniroute-113-2` run the nightlies that need
  a backend-only `next build` (~5–6 GB; webpack) and `quality.yml` `lint-guard`. `omniroute-113`
  had `MemoryHigh=4G` until 2026-10-18 — the promptfoo build reclaimed its way through 54 minutes
  there; 8 GB removes the throttling.
- **Fewer listeners on purpose.** Four OmniRoute units were disabled on 2026-08-29 — each extra
  listener is another tenant for the memory budget above. The janitor ceiling is 8 (`MAX_ACTIVE_RUNNERS=8` in cron): it counts
  every `Runner.Listener` on the box, and OmniHeuris + OmniMind add two to our five.
- **Unit and Vitest jobs stay hosted.** `ci.yml` sends its unit shards and the Vitest job to
  `[self-hosted, omni-ci]` only when the repository variable `vars.USE_VPS_TEST_RUNNER` is
  `true`, and then only for same-repository `pull_request` runs; forks, `merge_group` and pushes
  stay on `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). The variable is
  `false`. On 2026-10-28 three 4-core `omni-ci` listeners took 250–270 s for `npm ci` and every
  unit shard hit the 30-minute job limit, against ~634 s for a hosted shard, with the box at load
  17–24. The listeners were deleted. Do not turn the variable back on without listeners sized for
  a unit shard.
- **Never clean `/tmp` or `_work` by hand while any runner is busy.** A
  check-then-delete with a gap between the two is how a live Build job lost its
  `_work` on 2026-08-27. The janitor does the check and the removal in one step;
  let it.
- Stopping a runner mid-job cancels the job (observed live): `systemctl stop` only
  when its listener has no `Runner.Worker` child — and do it in one command.
- Workflows must not park artefacts in `/tmp` (it is RAM). Download to
  `$RUNNER_TEMP` (on disk, per runner) — the 1.3 GB `next-build` artefact took 27–32
  minutes to land on the tmpfs and 2 minutes to upload from disk.
- The `.15` VPS is homologation-only — never runs CI runners.

## Hosted lane (GitHub-hosted runners)

The repository belongs to the `cheaper-inference` organization, on the **Team** plan: **60
concurrent hosted jobs**, shared by every repository in the organization, every PR check, every
push-triggered workflow and CodeQL's default setup. The figures below were measured on the
**Pro** plan (40 concurrent hosted jobs). Measured on 2026-10-18 during a
merge campaign (~10 merges/hour on `release/v3.8.52`): **2,500 workflow runs created in
24 h**, 44 pushes to the branch in 6 h, **106 hosted jobs queued** while PR checks waited for
hours and PRs were merged without them. Nine workflows fired on every push to the branch:

| per push to `release/v*`                    | hosted jobs | outcome under the storm                                        | since 2026-10-18                                                         |
| ------------------------------------------- | ----------: | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `ci.yml` (full matrix)                      |    up to 30 | cancelled by the next push, 24 of 24 in a day                  | not started on `release/**` pushes (PR run + Release-Green)              |
| `quality.yml`                               |          ~6 | cancelled, 23 of 23                                            | not started on `release/**` pushes                                       |
| `Release-Green` `--quick`                   |           0 | ran on `omni-build`, cancelled 97 of 100                       | `omni-release` slot, never cancelled, pending run collapses              |
| `Lock released branch`, `OpenSSF Scorecard` |           2 | one queued run per push                                        | one run per ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)     |
| `Release acceptance` (shadow report)        |           1 | one hosted `npm ci` per push, never cancelled                  | unchanged — candidate for a `paths:` filter                              |
| `Publish to Docker Hub` → `Deploy to VPS`   |           2 | cancelled per push; amd64 leg competes on `omni-build`         | unchanged — owner's deploy channel                                       |
| CodeQL default setup (`dynamic`)            |           4 | `javascript-typescript`, `actions`, `c-cpp`, `python` per push | unchanged — Settings → Code security; `c-cpp`/`python` scan nothing here |

`tests/unit/build/push-storm-diet.test.ts` pins the `main`-only push trigger of `ci.yml` and
`quality.yml`. Side effect: Codecov no longer receives a base upload per release push (the
step is informational and `continue-on-error`); the in-repo coverage gate and PR comment are
unaffected.

**More self-hosted capacity does not fix the hosted queue.** The devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) could host a runner, but the agent sessions already
keep its load at 20–26, the agent container has no Docker daemon, and the saturated lane is
the hosted one. The `.113` box had 71 GB free and load 5–8 at the same moment; its constraint
is the per-listener memory budget above (ceiling 6 listeners), not CPU. The remaining levers
are process ones: land campaign PRs through the Mergify queue (`label=queue`, batches share
one `merge_group` CI run instead of one run per PR plus one per push), trim the CodeQL
default-setup languages, and filter `release-acceptance.yml` by the files it reads.
