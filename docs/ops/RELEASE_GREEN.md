---
title: "Release-Green — candidate validation and evidence"
---

# Release-Green: candidate validation and evidence

Release-Green observes a specific commit and reports its validation results. The
[Quality Gates reference](../architecture/QUALITY_GATES.md) defines the current CI
profiles, required checks and acceptance policy. The versioned
[admission policy](../../config/quality/admission-policy.json) is the executable
contract for `Gate / CI` and `Gate / Quality`.

## CI and observer scope

`ci.yml` and `quality.yml` cover pull requests into main and release branches.
The selected profile determines which jobs apply. Full CI also includes lanes
that an ordinary pull request does not execute. A quick observer result cannot
replace those jobs, and a completed workflow wrapper cannot replace its receipts.

The production build belongs to CI. There is no duplicate advisory build in
`quality.yml`. Missing artifacts, cancelled work and incomplete measurements do
not establish a successful required check. Confirm the current base, head and
combined candidate before accepting the results.

## Local validation

Run the observer in an owned worktree after preparing its dependencies. Use the
[worktree and resource protocol](WORKTREE_ISOLATION.md) before heavy validation.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

The quick profile is partial. The full profile checks its modeled requirements
and preserves command receipts; it does not certify deployment or substitute for
applicable hosted checks. The report distinguishes execution failure from metric
drift. Required ratchets remain blocking according to the selected policy.
Do not raise a baseline merely to obtain a passing result.

## Nightly and manual sweeps

The nightly release and compatibility resolvers select a canonical release branch.
That selection must match the branch that triggered the workflow, and the suites
use the event's immutable SHA. For manual execution, select the intended release
in `RELEASE_BRANCH` and dispatch on that same ref:

```bash
gh workflow run nightly-release-green.yml --ref "$RELEASE_BRANCH" -f branch="$RELEASE_BRANCH"
gh workflow run nightly-compat.yml --ref "$RELEASE_BRANCH" -f branch="$RELEASE_BRANCH"
```

Cross-branch dispatch is rejected before executing the selected code. Hosted main
suites checkout `main` and verify that its SHA still matches the resolved target
before installation. If main moves during resolution, rerun the incomplete sweep
on the new commit. Do not combine suite receipts from different candidates.

## Failure triage and recovery

Use the incident as a diagnostic index, then inspect the exact run, attempt,
failing step and artifact. Compare equivalent base and candidate evidence before
attributing a failure to a contributor. Infrastructure errors, inherited defects,
candidate regressions and pending approvals require different remedies.

The `/green-prs`, `/sweep-reds`, `/validate-release-green` and `/babysit` skills
collect evidence and prepare fixes under their documented scope. Keep contributor
credit, use isolated repair branches, and verify all required checks before an
authorized merge. No automatic rebaseline or incident closure substitutes for a
passing current candidate.
