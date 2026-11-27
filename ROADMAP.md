---
title: "OmniRoute Roadmap"
version: 3.8.55
lastUpdated: 2026-11-17
---

# OmniRoute Roadmap

> Version-gated, not date-gated: each milestone ships when its quality gates pass.
> Current development line: **v3.8.55** (`release/v3.8.55`), the first version of the
> validation window.
> Latest published release: **[v3.8.54](https://github.com/cheaper-inference/OmniRoute/releases/tag/v3.8.54)** (2026-11-17).
> Status checked: 2026-11-17. Versions **3.8.56–3.8.59** are planned validation milestones,
> not published releases.

OmniRoute is heading from a monolithic router to a **modular AI platform**: a lightweight
core engine, a typed SDK, and everything else as installable modules and plugins. The path
runs through a stabilization rail (3.8.50 → 3.8.59), an LTS anchor (**3.9.0**), and the
modular **4.0**.

## The rail at a glance

```
3.8.50 ─ 3.8.54   PREPARE   non-breaking structural prep (all PRs welcome)
3.8.55 ─ 3.8.59   VALIDATE  stabilization (fixes / docs / i18n / providers only)
3.9.0             LTS       stable/v3 branch · long-term support line
4.0.0-nightly/rc  MODULAR   core + SDK + modules + marketplace (develop branch)
4.0.0             GA        latest switches to v4 · v3 stays supported as LTS
```

## Phase 1 — Preparation (3.8.50 → 3.8.54)

Non-breaking structural work that prepares the modular split. The table separates release
status from milestone work: a task can land before its planned version. See the
[changelog](CHANGELOG.md) for the complete release history and the
[release checklist](docs/ops/RELEASE_CHECKLIST.md) for the closing quality gates.

| Version | Focus                                                                                                           | Status                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.8.50  | CI safety net on release branches · dead-code cleanup · catalog/topology fixes · contribution guide             | **Published 2026-08-26.**                                                                                                                                                                                                                                                                                                                                                                                       |
| 3.8.51  | Executor registry · provider-journey CI contract · scoped-test development loop · CI lane consolidation (#8084) | **Published 2026-09-30.** Includes #10633, #12353, #12408 and the first `combo.ts` slices (#12746, #12811).                                                                                                                                                                                                                                                                                                     |
| 3.8.52  | `combo.ts` decomposition · routing-strategy registry · unified model catalog · CI policy alignment              | **Published 2026-10-19.** Routing-strategy registry (#16206) and classifier step 1 (#16078) landed; a single CI policy was deferred (RFC #16075 closed). Also shipped here, ahead of their planned milestones: headless mode (`omniroute serve --headless` / `OMNIROUTE_HEADLESS=1`, #16079), the dormant LTS release-channel workflows (#16172, with #16073 and #16066), and `POST /v1/models/query` (#16945). |
| 3.8.53  | `chatCore.ts` decomposition · headless adoption · local candidate build/promote loop                            | **Published 2026-11-06.** Earlier slices shipped in 3.8.52 (#14725, #16180); remaining `chatCore.ts` slices were not completed by the closed #15709.                                                                                                                                                                                                                                                            |
| 3.8.54  | Release channels, labels and PR templates · merge-queue infrastructure · preparation for the feature freeze     | **Published 2026-11-17.** Omni Queue cut-over part 1 landed in #20277. The public feature-freeze announcement and the LTS channel cut remain separate owner decisions.                                                                                                                                                                                                                                          |

## Phase 2 — Validation (3.8.55 → 3.8.59)

**Policy for this window** (applied once the public feature-freeze announcement is made):
external feature PRs pause (they get the `v4-feature` label and are re-targeted to the v4
channel when it opens). Fixes, docs, i18n, and provider updates keep flowing. Preparation already merged does not close a milestone; each version still
needs current evidence and its release gates.

| Version | Focus                                                                                                                 | Status                                                                                                                                                                                              |
| ------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.8.55  | Characterization tests for extraction candidates · coupling re-measurement                                            | **Current development line.** Earlier tests (#16179, #16192, #16205) and the 2026-10-16 coupling snapshot are preparation; re-measure against the validation candidate.                             |
| 3.8.56  | Extended canary · performance baselines (heap, TTFB, build)                                                           | **Planned.** Script and preliminary report exist (#16211); the dedicated-host canary and acceptance baseline remain pending.                                                                        |
| 3.8.57  | Security and compliance sweep · publish-provenance (OIDC) rehearsal                                                   | **Planned.** Prior sweep #16209 and nightly restoration #16847 are preparation; candidate-specific checks and the registry rehearsal remain required.                                               |
| 3.8.58  | Full rehearsal of the 3.9.0 cut: branches, channels, forward-port, preview artifacts and build-once promotion (#8084) | **Planned.** Tooling #16210 and a private-remote rehearsal on 2026-10-16 provide historical evidence, not an activated LTS channel. The real cut requires a full clone and an open freeze (#16875). |
| 3.8.59  | Final freeze · full-suite audit · GO/NO-GO                                                                            | **Planned.** Requires the closing battery and explicit owner GO/NO-GO; see the [LTS checklist](docs/ops/LTS_GO_NO_GO.md).                                                                           |

## Phase 3 — v3.9.0 LTS

The planned version after 3.8.59 is **3.9.0** (there is no planned 3.8.60). Once approved,
the LTS cut creates the long-lived branch model below; these are future channels:

- **`stable/v3`** — the LTS line (3.9.x). Receives fixes, security patches, and provider
  updates. `npm install omniroute` (aka `latest`) stays on v3 during the whole v4 cycle.
- **`develop`** — v4 development, published as `4.0.0-nightly.*`.
- **`main`** — v4 release candidates (`next`) and, eventually, GA.
- Fixes merged to `stable/v3` are automatically forward-ported to `develop` with full
  contributor credit (`Co-authored-by`).

New features land in the v4 channel. The LTS line is stability-first. The support window
(12 months after the 3.9.0 cut, or 90 days after v4.0.0 becomes `latest`, whichever is later)
is defined in [SECURITY.md](SECURITY.md#lts-support-window-v39x).

See also: [LTS GO/NO-GO checklist](docs/ops/LTS_GO_NO_GO.md), the [3.9.0 cut runbook](docs/ops/RELEASE_CHECKLIST.md#390-lts-cut-rehearsed-in-3858) (dry-run, fork rehearsal, PR preview artifact), the [LTS security baseline](docs/security/LTS_SECURITY_BASELINE.md) and the [LTS performance baseline](docs/ops/PERF_BASELINE.md).

## Phase 4 — v4.0: the modular platform

The monolith is intentionally disassembled on `develop`:

- **`@omniroute/core`** (npm name stays `omniroute`) — just the engine: `/v1/*`, routing,
  combo/fallback, providers.
- **`@omniroute/sdk`** — one typed contract: hooks, extension points, two-phase lifecycle,
  UI contributions. The five extension systems that exist today (plugins, CLI plugins,
  skills, MCP tools, A2A skills) collapse into one declarative manifest.
- **Modules** (`@omniroute/mod-*`) — cloud agents, traffic inspection (MITM), evals,
  webhooks, memory, guardrails, observability and more move out of the core, each with its
  own version and lifecycle.
- **Providers as plugins** — adding a provider stops touching the core.
- **Marketplace** — one-click install with verified integrity (hash pinning, signing,
  sandbox). Free in v1; a paid tier later with revenue share for creators.
- Ships as `4.0.0-nightly.*` → `4.0.0-rc.N` (soak in production) → **4.0.0 GA**, when
  `latest` switches to v4 and v3 enters its announced LTS support window.

**The core is MIT and free, forever.**

## For contributors

| You are sending... | Target today            | From 3.8.55                  | After 3.9.0    |
| ------------------ | ----------------------- | ---------------------------- | -------------- |
| Bug fix / security | active `release/v3.8.x` | same                         | `stable/v3`    |
| Provider update    | active `release/v3.8.x` | same                         | `stable/v3`    |
| Docs / i18n        | active `release/v3.8.x` | same                         | `stable/v3`    |
| New feature        | active `release/v3.8.x` | held with `v4-feature` label | `develop` (v4) |

See `CONTRIBUTING.md` and the [contribution golden path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) per change type.

See also: [Release Strategy](docs/ops/RELEASE_STRATEGY.md) — branches, npm channels, forward-port
and the `v4-feature` label rule for the LTS rail.
