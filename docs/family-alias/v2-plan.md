# Family Alias Auto-Maintainer v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dry-run-first, locally authoritative family-alias reconciler that preserves exact family identity, routes only verified subscription entitlements, owns only its generated resources, and never destructively replaces unrelated CPA/OmniRoute configuration.

**Architecture:** A pure domain library consumes per-connection local model entitlements plus metadata enrichment and produces an owned desired graph. Separate target planners diff that graph against OmniRoute and CPA live state. Apply mode requires a plan hash and uses owned-subset reconciliation with readback verification; probes are cached and globally budgeted.

**Tech Stack:** TypeScript, Node test runner, OmniRoute management APIs, CPA management APIs, local JSON state cache.

**Spec:** `docs/family-alias/v2-design.md`

## Global Constraints

- Identity is strict: Fable never routes Haiku; Astra never routes Luna.
- models.dev enriches metadata only and never creates an endpoint.
- Routability originates only from local active connection-specific model listings.
- Subscription-only is absolute: zero eligible subscription endpoints means no alias.
- Endpoint identity is `(connectionId, providerId, concreteModelId)`; provider alone is not a dedupe key.
- Base aliases exclude thinking/effort variants.
- Default mode is plan/dry-run; apply requires explicit enablement and matching precondition hash.
- Never modify/delete combos without `managed-by:family-alias-maintainer/v2` ownership marker.
- Never overwrite manual/pinned name conflicts.
- CPA reconciliation preserves all unmanaged entries byte-for-byte.
- No live deployment until final review and explicit approval.

## Review Focus

- Metadata-only model absent locally never becomes routable.
- Same provider/version with multiple accounts/endpoints preserves every concrete endpoint.
- Temporary 429 does not destructively remove last-known-good; permanent unsupported disables only that pair.
- Manual combo name conflict produces a conflict, not an update.
- Stale owned combo removal is dependency-ordered and leaves no missing refs.

---

### Task 1: V2 domain types and exact lineage classifier

**Files:**
- Create: `packages/family-alias-v2/src/types.ts`
- Create: `packages/family-alias-v2/src/classify.ts`
- Create: `packages/family-alias-v2/src/version.ts`
- Test: `packages/family-alias-v2/tests/classify.test.ts`

**Interfaces:**
- Produces `LocalEndpoint`, `Lineage`, `VersionIdentity`, `FamilyGraph` types.
- `classifyLocalEndpoint(endpoint, metadata?) -> ClassifiedEndpoint | null`.

- [ ] Write failing tests for Claude Fable, GPT Astra/Sol, DeepSeek R1 vs V3, Qwen Coder/VL/Instruct, MiniMax and date/context suffix separation.
- [ ] Run focused tests and verify failure.
- [ ] Implement conservative classifier: curated local `familyId` first, metadata second, parser last; unclassified returns null.
- [ ] Run tests; expect PASS.
- [ ] Commit `feat(family-alias-v2): add exact lineage classifier`.

### Task 2: Local entitlement collector and metadata-only enrichment

**Files:**
- Create: `packages/family-alias-v2/src/omniroute/connectionCatalog.ts`
- Create: `packages/family-alias-v2/src/metadata/modelsDev.ts`
- Create: `packages/family-alias-v2/src/catalog.ts`
- Test: `packages/family-alias-v2/tests/catalog.test.ts`

**Interfaces:**
- `collectConnectionCatalog()` reads active connections and `/api/providers/:id/models`.
- `enrichLocalEndpoints(local, metadata) -> LocalEndpoint[]` never adds endpoint identities.

- [ ] Test two installations with disjoint providers/models and assert disjoint output.
- [ ] Test models.dev-only entry is absent from local output.
- [ ] Test duplicate same-provider accounts are preserved by connection ID.
- [ ] Implement collector/enrichment.
- [ ] Run tests and commit.

### Task 3: Subscription policy and cached entitlement health

**Files:**
- Create: `packages/family-alias-v2/src/policy.ts`
- Create: `packages/family-alias-v2/src/health/cache.ts`
- Create: `packages/family-alias-v2/src/health/probeBudget.ts`
- Create: `packages/family-alias-v2/src/health/evaluate.ts`
- Test: `packages/family-alias-v2/tests/health.test.ts`

**Interfaces:**
- Instance config explicitly maps connection IDs to billing class.
- `evaluateEndpoint()` returns eligible / temporarily_unavailable / permanently_unavailable.
- Probe budget defaults to five/day; success TTL 24h; 429 preserves last-known-good.

- [ ] Write tests for strict subscription-only and unknown/pay-per-use exclusion.
- [ ] Write tests for 429, auth failure, unsupported model, cache TTL, and probe budget.
- [ ] Implement without real network calls in domain tests.
- [ ] Run tests and commit.

### Task 4: Desired owned graph builder

**Files:**
- Create: `packages/family-alias-v2/src/graph.ts`
- Create: `packages/family-alias-v2/src/ownership.ts`
- Test: `packages/family-alias-v2/tests/graph.test.ts`

**Interfaces:**
- `buildDesiredGraph(eligibleEndpoints) -> DesiredGraph`.
- Ownership description marker includes v2 owner, graph hash, and kind.

- [ ] Test newest version ordering within exact family.
- [ ] Test no cross-family fallback.
- [ ] Test zero eligible endpoints omits alias.
- [ ] Test generated version/family/provider-qualified names and ownership markers.
- [ ] Implement and commit.

### Task 5: OmniRoute plan/diff with conflict and stale-owned cleanup

**Files:**
- Create: `packages/family-alias-v2/src/omniroute/plan.ts`
- Create: `packages/family-alias-v2/src/omniroute/dag.ts`
- Test: `packages/family-alias-v2/tests/omniroute-plan.test.ts`

**Interfaces:**
- `planOmniRoute(desired, live) -> TargetPlan` with creates, updates, deletes, conflicts, preconditionHash.
- Only v2-owned live combos are mutable/deletable.

- [ ] Test manual conflict remains untouched.
- [ ] Test unchanged run produces zero operations.
- [ ] Test stale owned wrappers/leaves delete in safe order.
- [ ] Test full DAG validates before operations emit.
- [ ] Implement and commit.

### Task 6: OmniRoute apply with plan hash and readback

**Files:**
- Create: `packages/family-alias-v2/src/omniroute/apply.ts`
- Test: `packages/family-alias-v2/tests/omniroute-apply.test.ts`

**Interfaces:**
- `applyOmniRoute(plan, client, expectedHash) -> TargetResult`.

- [ ] Test dry-run never writes.
- [ ] Test live precondition mismatch refuses apply.
- [ ] Test operation order and exact readback verification.
- [ ] Implement and commit.

### Task 7: CPA owned-subset planner and applier

**Files:**
- Create: `packages/family-alias-v2/src/cpa/plan.ts`
- Create: `packages/family-alias-v2/src/cpa/apply.ts`
- Test: `packages/family-alias-v2/tests/cpa.test.ts`

**Interfaces:**
- Dedicated managed provider/channel identifies v2-owned subset.
- Existing unrelated OAuth aliases/openai-compatible providers remain byte-identical.

- [ ] Test preservation of arbitrary manual CPA entries.
- [ ] Test omission when CPA cannot represent fallback semantics.
- [ ] Test precondition mismatch and readback.
- [ ] Implement and commit.

### Task 8: CLI, state cache, reports, and fail-closed defaults

**Files:**
- Create: `packages/family-alias-v2/src/cli.ts`
- Create: `packages/family-alias-v2/src/run.ts`
- Create: `packages/family-alias-v2/src/report.ts`
- Create: `packages/family-alias-v2/README.md`
- Test: `packages/family-alias-v2/tests/run.test.ts`

**Interfaces:**
- Commands: `plan`, `apply --plan <file>`.
- No daemon mutation loop in v2 package.
- Independent OmniRoute/CPA target statuses.

- [ ] Test default command is plan and writes zero target mutations.
- [ ] Test apply requires explicit plan artifact/hash.
- [ ] Test partial success does not repeat discovery/probes.
- [ ] Implement and commit.

### Task 9: Full branch verification only (no deployment)

**Files:**
- Create: `packages/family-alias-v2/tests/e2e-mocked.test.ts`
- Create: `docs/family-alias/v2-runbook.md`

- [ ] Run all v2 tests, typecheck, lint, diff-check.
- [ ] Run mocked E2E for two different installations and target failures.
- [ ] Independent code/architecture/security review.
- [ ] Produce sanitized dry-run plan against live read-only APIs; do not apply.
- [ ] Commit verification/runbook.
- [ ] Stop for explicit deployment approval.
