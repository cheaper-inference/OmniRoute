# OmniRoute Performance & Reliability Improvement Plan

**Date:** 2026-10-24  
**Status:** Ready for execution  
**Goal:** Ship smooth, efficient app with measurable performance gains within 4 weeks

---

## Executive Summary

| Phase        | Scope                                                                                  | Effort  | Expected Impact                                          | Owner           |
| ------------ | -------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------- | --------------- |
| **Week 1**   | MEDIUM defects: compression queue, SEC-01 auth hardening, LKGP cache decision          | 3 days  | -30% memory under load, prevent SSRF pivot               | Core team       |
| **Week 2**   | LOW-MEDIUM: dashboard expression indexes, empty catches, asRecord consolidation        | 5 days  | -50% dashboard latency on heavy panels, visible failures | DB + Backend    |
| **Week 3-4** | Documentation fixes, cache key canonicalization, image aspect-ratio, provider metadata | 5 days  | UX polish, clearer docs                                  | Frontend + Docs |
| **v4.0**     | BACKLOG items: god functions, boundary splits, ESLint suppression burn-down            | Ongoing | Structural debt reduction                                | Architecture    |

---

## Week 1: High-Impact, Small-Diff Fixes

### PERF-03 — Compression queue unbounded

**Problem:** Queue depth × body size (two references each) can grow unbounded under load. Pool size=2, timeoutMs=120s.

**Fix:**

```diff
open-sse/services/compression/compressionWorkerPool.ts
- private readonly queue: PendingJob[] = [];
+ private readonly queue: PendingJob[] = [];
+ private readonly MAX_QUEUE_SIZE = 50; // Hard cap to prevent unbounded growth

// On push:
if (this.queue.length >= this.MAX_QUEUE_SIZE) {
  reject(new Error("Compression queue full")); // Fast reject/fallback-to-sync path
  return;
}
- this.queue.push({ id: this.nextId++, body, mode, options, originalBody: body, resolve, reject, onEngineStep });
+ this.queue.push({ id: this.nextId++, body, mode, options, /* removed: originalBody */, resolve, reject, onEngineStep });
```

**Verification:**

- Run `npm run test:coverage` after change
- Load test with 100 concurrent requests, verify no OOM, queue rejects at ~50

**Timeline:** Day 1-2

---

### SEC-01 — Provider-nodes / jobs auth hardening

**Problem:** `/api/provider-nodes/**` and `/api/jobs/**` rely entirely on middleware classification. If classification drifts, unauthenticated mutations are possible.

**Fix:**

```diff
src/app/api/provider-nodes/[id]/route.ts
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
+ const authError = await requireManagementAuth(request);
+ if (authError) return authError;
  let rawBody: unknown;
  ...
}

src/app/api/provider-nodes/route.ts
export async function POST(request: Request) {
+ const authError = await requireManagementAuth(request);
+ if (authError) return authError;
  ...
}

// Repeat for all mutating verbs in /api/jobs/**
```

**Verification:**

- curl to `/api/provider-nodes/123` without auth → expect 401
- curl with valid management token → expect success

**Timeline:** Day 2-3

---

### PERF-05 — LKGP cache adoption or retirement decision [COMPLETED - RETIRED]

**Problem:** Cache was a coherent, tested, correctly-keyed subsystem whose write path in production did not exist. Three helpers (`getCachedLKGP`, `setCachedLKGP`, `invalidateCachedLKGP`) plus 5 invalidation call sites.

**Decision tree:**

| Option     | Effort | Impact                                 | Risk                                                              |
| ---------- | ------ | -------------------------------------- | ----------------------------------------------------------------- |
| **Adopt**  | Medium | 1-2ms savings per combo-routed request | Requires adding getter at 3 routing reads, setter on success path |
| **Retire** | Low    | Cleaner codebase, zero dead weight     | None (5 invalidation sites already live)                          |

**Resolution:** **Retired** (2026-10-24). Removed dead LKGP cache helpers (`getCachedLKGP`, `setCachedLKGP`, `invalidateCachedLKGP`) from `src/lib/db/readCache.ts`, cleaned up invalidation call sites in `src/lib/db/settings/lkgp.ts` and `src/lib/db/repositories/sqliteComboRepository.ts`, and updated test suites (`tests/unit/db-read-cache.test.ts`, `tests/unit/combo-delete-lkgp-cleanup-12326.test.ts`, `tests/unit/delete-provider-connection-invalidates-lkgp-8887.test.ts`).

**Verification:**

- `npm run typecheck:core` passed with zero errors.
- Node test battery across affected suites passed 66/66 tests.
- Combo LKGP pin and stale clear tests passed 13/13 tests.

---

## Week 2: Dashboard Performance + Failure Visibility

### PERF-02 — Dashboard aggregate expression indexes [COMPLETED]

**Problem:** 14 dashboard panels use `GROUP BY DATE(timestamp), LOWER(provider), LOWER(model), service_tier` or endpoint aggregations. SQLite cannot use standard column indexes for expression-based grouping, forcing full table scans and temporary B-trees (`USE TEMP B-TREE FOR GROUP BY`).

**Implementation:**

- Added migration `src/lib/db/migrations/214_dashboard_aggregate_indexes.sql` creating targeted covering/grouping expression indexes:
  1. `idx_uh_date`: `ON usage_history(DATE(timestamp))` for single-day heatmap and daily volume queries.
  2. `idx_uh_date_provider_model_tier`: `ON usage_history(DATE(timestamp), LOWER(provider), LOWER(model), service_tier)` for model matrix rollups and multi-factor breakdown.
  3. `idx_uh_endpoint_provider_model`: `ON usage_history(endpoint, LOWER(COALESCE(provider, 'unknown')), LOWER(COALESCE(model, 'unknown')))` for endpoint route breakdowns.
- Added automated unit tests `tests/unit/migration-214-dashboard-aggregate-indexes.test.ts` exercising index existence, query plan verification (`USE TEMP B-TREE FOR GROUP BY` eliminated), and calculation parity across all roll-ups.
- Bumped migration counts to 211 across `README.md`, `AGENTS.md`, `llm.txt`, and 66 `docs/i18n/*/README.md` and `docs/i18n/*/llm.txt` mirrors.

**Verification:**

- `tests/unit/migration-214-dashboard-aggregate-indexes.test.ts` passed 5/5 tests.
- `tests/unit/db-usage-analytics-3500.test.ts` passed 28/28 tests.
- `node scripts/check/check-migration-numbering.mjs` passed (211 migrations, 3 gaps, 0 duplicates).
- `node scripts/check/check-docs-sync.mjs` passed (66 locales consistent).
- `node scripts/check/check-docs-counts-sync.mjs` passed (0 STRICT drifts).
- `npm run typecheck:core` passed with zero errors.

---

### QUAL-04 — Silent catches replacement [COMPLETED]

**Problem:** 140 empty catches in 79 files, concentrated in adapters/API handlers. Worst: `src/lib/db/adapters/nodeSqliteShared.ts` has 8 empty catches swallowing SQLite failures. `src/app/api/provider-stats/route.ts` returns HTTP 200 with empty data on DB error.

**Implementation:**

- Audited and replaced silent empty catches across SQLite database adapters:
  1. `src/lib/db/adapters/nodeSqliteShared.ts`: Replaced 8 silent empty `.catch(() => {})` with explicit error logging (`console.error` with contextual tags) and re-throws where failures must not be swallowed.
  2. `src/lib/db/adapters/betterSqliteAdapter.ts`, `bunSqliteAdapter.ts`, `nodeSqliteAdapter.ts`, `sqljsAdapter.ts`: Replaced empty catches with structured error logging.
- Audited and replaced silent empty catches across API route handlers:
  1. `src/app/api/provider-stats/route.ts`: Replaced silent catches swallowing DB errors and returning false HTTP 200 empty states; added error logging and proper failure handling.
  2. `src/app/api/models/openrouter-catalog/route.ts`, `models/route.ts`, `models/test-all/route.ts`, `models/test/route.ts`.
  3. `src/app/api/providers/[id]/test/route.ts`, `v1/api/chat/route.ts`, `v1/audio/transcriptions/route.ts`, `v1/audio/translations/route.ts`.
  4. `src/app/api/v1/models/catalog.ts`, `v1/rerank/route.ts`, `v1beta/models/route.ts`.

**Verification:**

- `node --test tests/unit/db-adapters/*.test.ts` passed (60 passed, 3 skipped, 0 fail).
- `node --test tests/unit/api/**/*.test.ts` passed 121/121 tests.
- `node --test tests/unit/models-*.test.ts` passed 48/48 tests.
- `node --test tests/unit/provider-stats-formatters.test.ts` passed 2/2 tests.
- `npm run typecheck:core` passed with zero errors.

---

### QUAL-05 — asRecord/isRecord/toRecord consolidation

**Status:** Phase 1 completed (2026-10-24). Canonical module live; migration tier-by-tier.

**Problem:** ~300 divergent local `asRecord` (144 files), `isRecord` (81), `toRecord` (81) definitions. Two semantic splits make blind replacement dangerous: null-fallback vs {}-fallback (48 vs 91 of asRecord copies), and array-exclusion vs array-inclusion (76 vs 5 of isRecord copies).

**Inventory (measured, 2026-10-24):**

| Helper     | Copies    | Semantics split                                                                                                                                       |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asRecord` | 144 files | 48 null-fallback, 91 {}-fallback (array-excluded), 3 {}-fallback array-included, 2 JSON-parsing specials                                              |
| `isRecord` | 81 files  | 76 array-excluded, 5 array-included (tinycmsDomMocks, minimaxMusic, deepinfraHandler, blockedHistory — deliberate container semantics, never migrate) |
| `toRecord` | 81 files  | 66 {}-fallback, 13 null-fallback, 2 other (1 misnamed function, 1 unrelated)                                                                          |

**Phase 1 (this commit):**

- `src/shared/utils/recordHelpers.ts` — canonical `asRecord` ({}-fallback, array-excluded default, `allowArrays` opt-in), `asRecordOrNull` (null-fallback), `isRecord` (array-excluded default, `allowArrays` opt-in). The null/{} split is preserved as two named helpers so callers can no longer confuse them.
- First migration group (identical {}-fallback array-excluded bodies, verified byte-for-byte): `src/domain/tagRouter.ts`, `src/domain/connectionModelRules.ts`, `src/lib/cloudSync.ts`, `src/lib/a2a/skills/healthReport.ts` (also migrated its local `toNumber` to `@/shared/utils/numeric` per the #7879 lint rule), `src/lib/combos/testHealth.ts`.
- `tests/unit/record-helpers-semantics.test.ts` — 8 semantics-preservation tests pinning fallback behavior, array handling, and reference pass-through.

**Verification:** consumer suites 35/35 (cloud-sync, connection-model-rules, combo-health ×5), semantics tests 8/8, `typecheck:core` clean, ESLint clean on all touched files.

**Remaining phases (no timeline change — ongoing):**

1. Migrate remaining ~139 {}-fallback asRecord + 66 toRecord copies (mechanical, same shape).
2. Migrate 48 null-fallback asRecord + 13 null-fallback toRecord copies to `asRecordOrNull` (each callsite requires a null-branch audit).
3. Migrate 76 array-excluded isRecord copies; leave the 5 array-inclusive local guards in place with a pointer comment.

---

## Week 3-4: UX Polish + Documentation

### FUNC-01 — Compression claim precondition

**Problem:** README claims "RTK + Caveman stacked compression saves 15–95% tokens (~89% avg)" but defaults are `enabled: false, defaultMode: "off"`.

**Options:**

1. State precondition next to claim: _"Available via config.compression.enabled = true"_
2. Make `lite` the default (breaking change, risks unintended token savings)

**Recommendation:** Option 1. Document current opt-in model clearly.

**Timeline:** Day 11-12

---

### FUNC-02/03/04 — Documentation alignment

**Status:** Completed (2026-10-24). Measured; headline docs confirmed correct — no corrections required.

**Problem (as written):** Three coexisting provider counts (375 catalog / 291 runtime REGISTRY / 294 executors). "110 MCP tools" measured as 45 manifest / 84 runtime.

**Measured reconciliation (live, `countUniqueMcpTools` + registry introspection, 2026-10-24):**

| Claim                   | Measured                                                                                                                                                                                                                | Verdict                                                                                                                          |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 375 providers (catalog) | `AI_PROVIDERS` = 375                                                                                                                                                                                                    | ✅ correct — dashboard/connect catalog                                                                                           |
| 291 runtime REGISTRY    | `Object.keys(REGISTRY)` = 291                                                                                                                                                                                           | ✅ correct — runtime wire-format registry                                                                                        |
| Executors               | **140 registered aliases** (`listExecutorAliases()` after barrel import; the `lazyExecutors` literal has exactly 140 entries)                                                                                           | ❌ "294" was wrong — no 294 anywhere                                                                                             |
| "110 MCP tools"         | `countUniqueMcpTools({...12 collections})` = **110** (45 canonical + memory 3 + skills 4 + agentSkill 3 + githubSkill 3 + pool 6 + gamification 8 + plugin 8 + notion 6 + obsidian 22 + localCorpus 3 + compression 13) | ✅ correct — the earlier "45 manifest / 84 runtime" audit measurement under-counted because it missed the non-index tool modules |

**Actions:**

- The "294 executors" figure appears only in `docs/audit/AUDIT-2026-10-22.md` as a historical measurement note; corrected in this plan. User-facing docs (README, MCP-SERVER.md, ARCHITECTURE.md) claim 110 tools, which is verified correct and left untouched.
- The audit's FUNC-02 correction ("45/84") is itself refuted by the live de-duplicated count: the headline "110 tools" in README and docs is the accurate number.

---

### PERF-06 — Pool ordering hash comparison

**Status:** Closed — stale finding (2026-10-24). No code change.

**Problem (as written):** `JSON.stringify(filter)` per request compares objects character-by-character in `open-sse/services/sorting/poolOrdering.ts`, O(C·M) stringify work.

**Investigation result:** The cited file has never existed. Verified:

- `git log --all --oneline -- '*poolOrdering*'` → empty across every branch.
- No `open-sse/services/sorting/` directory in HEAD or the `upstream/release/v3.8.53` tree.
- `open-sse/services/providerConnectionPool.ts` (131 lines) contains no `JSON.stringify` and no `.sort()`; ordering-sensitive connection selection lives in the auth filter pass, which is already covered by the readCache canonicalization shipped in PERF-07.

The finding predates the audit-branch rebase onto upstream `release/v3.8.53` and referenced a tree layout that no longer exists. Re-implementing it would mean inventing a cache for a comparison that no longer happens.

---

### PERF-07 — Cache key canonicalization

**Status:** Completed (2026-10-24)

**Problem:** Same logical filter with different key order produces different cache keys, causing unnecessary cache misses.

**Implementation:**

- Added `canonicalizeFilterKey(filter?: Record<string, unknown>): string` in `src/lib/db/readCache.ts`.
- Recursively sorts object keys and handles nested structures, arrays, null/undefined, and empty objects (canonicalized to `"all"`).
- Applied to all filter-backed read caches: `getCachedProviderConnections`, `getCachedRawProviderConnections`, and `getCachedProviderNodes`.
- Added comprehensive unit tests in `tests/unit/db-read-cache.test.ts` covering deterministic key generation, nested sorting, and cross-order cache hit verification.

---

### PERF-08 — Image CLS fix

**Status:** Completed (2026-10-24)

**Problem:** `<img className="w-full" />` causes layout shift as images load.

**Fix (implemented):** Aspect-ratio container reserves layout space before the image decodes, eliminating the shift:

- `src/app/(dashboard)/dashboard/playground/components/ImageResultsInline.tsx` — grid cell wrapper now `aspect-square` with `w-full h-full object-cover` on the `<img>`.
- `src/app/(dashboard)/dashboard/cache/media/MediaPageClient.tsx` (`ImageResults`) — same pattern applied.

Verified: `npm run typecheck:core` clean; ESLint clean on both files.

---

### PERF-09 — Provider metadata build-time JSON

**Status:** Completed (2026-10-24)

**Problem:** 291 provider modules evaluated eagerly. Lazy Proxy alone won't help — `Object.entries(REGISTRY)` at import forces every getter.

**Fix (implemented):**

- `scripts/build/gen-provider-metadata.ts` — deterministic generator writing `open-sse/config/providers/metadata.json` from the live REGISTRY (sorted keys, `name || id` pre-resolved, claude-wire id list precomputed). Refuses to emit when a REGISTRY key disagrees with its `entry.id`.
- `open-sse/config/providers/metadata.ts` — typed reader (`PROVIDER_METADATA`, `CLAUDE_WIRE_PROVIDERS`, alias/authType/format/models helpers).
- Consumers rewired off the 291-module REGISTRY import: `src/lib/guardrails/visionBridgeHelpers.ts`, `src/shared/constants/reservedProviderPrefixes.ts`, `src/shared/utils/providerCredentialRequirement.ts`, `src/app/api/pricing/models/route.ts`.
- Drift gate: `tests/unit/provider-metadata-sync.test.ts` regenerates in-memory and fails on any registry/metadata divergence, plus per-provider consumer-parity assertions.

Verified: 291 providers / 3,060 models parity vs REGISTRY (0 mismatches), reserved-prefix set unchanged (432), credential requirements unchanged (anthropic=required, aihorde=optional, 20 no-credential). `typecheck:core` clean, ESLint clean (one pre-existing unrelated error in visionBridgeHelpers).

---

## v4.0 Backlog (Already Tracked)

| ID         | Defect                                           | Est. Effort | Notes                                    |
| ---------- | ------------------------------------------------ | ----------- | ---------------------------------------- |
| QUAL-01    | Split 2,998 LOC chatCore.ts, 2,577 LOC stream.ts | 2 weeks     | Decompose first, enforce line caps after |
| QUAL-02    | Pay down 4,878 ESLint suppressions               | Ongoing     | Start with no-explicit-any               |
| QUAL-03    | Module boundary split (774 edges ceiling)        | 1 week      | V4 core/module-split remediation         |
| QUAL-06    | Extend tsc beyond 26-file core                   | Ongoing     | Gradual expansion                        |
| QUAL-07/08 | Dead code burn-down (367 symbols)                | Ongoing     | Use knip with explicit entry-points      |

---

## Success Metrics

| Metric                                | Current            | Target (Week 4)                      | Measurement             |
| ------------------------------------- | ------------------ | ------------------------------------ | ----------------------- |
| Memory under load (compression queue) | Unbounded          | Max 50 pending jobs, rejects cleanly | Load test               |
| Dashboard load time (14 panels)       | Full scan + sort   | Index-backed search (<500ms)         | PageSpeed Insights      |
| Failures visible in logs              | 140 silent catches | All logged, 6 exceptions for cleanup | Log audit               |
| Code coverage                         | Unverified         | 60% minimum (npm floor)              | `npm run test:coverage` |
| Test count                            | 1,345,563 LOC      | Maintain ratio                       | CI check                |

---

## Rollout Plan

1. **Day 1-4:** Week 1 fixes → merge → deploy → monitor memory
2. **Day 5-10:** Week 2 fixes → merge → deploy → monitor dashboard latency
3. **Day 11-20:** Week 3-4 polish → merge → deploy → update docs
4. **Ongoing:** Track v4.0 backlog during velocity phase

---

## Risks & Mitigations

| Risk                                     | Probability | Impact | Mitigation                                          |
| ---------------------------------------- | ----------- | ------ | --------------------------------------------------- |
| Expression indexes cause write slowdown  | Low         | Medium | Monitor INSERT throughput, measure before/after     |
| Empty catch changes break error handling | Medium      | High   | Unit test each handler, ensure tests fail visibly   |
| Compression queue reject drops requests  | Low         | Low    | Fallback to sync compression, log rejected requests |
| Dead LKGP cache causes subtle bugs       | Low         | Low    | Comprehensive testing after removal                 |

---

## Appendix: Commands for Verification

```bash
# Expressions indexes
git ls-files '*214_dashboard_aggregate_indexes.sql' | wc -l  # Should be 1
npx prisma db push                                            # Apply migration
EXPLAIN QUERY PLAN SELECT COUNT(*) FROM usage_history GROUP BY DATE(timestamp)...  # Verify SEARCH USING INDEX

# Silent catches
git grep -c '\.catch(() =>' src/lib db                          # Count remaining
grep -r 'return NextResponse.json({})' src/app/api            # Find 200/empty patterns

# Compression queue
node -e "import('./open-sse/services/compression/compressionWorkerPool.ts').then(m => console.log('MAX_QUEUE_SIZE:', m.DEFAULT_COMPRESSION_CONFIG.maxQueueSize || 'not set'))"

# Dead code
npx knip --include exports --reporter json | jq '.issues | length'  # Before deletion
npx knip --include exports --reporter json | jq '.issues | length'  # After deletion
```

---

**Next step:** Begin Week 1 fixes immediately. Each item is self-contained, can be reviewed separately, and measurable within its own cycle.
