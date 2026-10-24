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

### QUAL-04 — Silent catches replacement

**Problem:** 140 empty catches in 79 files, concentrated in adapters/API handlers. Worst: `src/lib/db/adapters/nodeSqliteShared.ts` has 8 empty catches swallowing SQLite failures. `src/app/api/provider-stats/route.ts` returns HTTP 200 with empty data on DB error.

**Fix pattern:**

```diff
src/lib/db/adapters/nodeSqliteShared.ts
.catch(() => {})
+.catch((error) => {
+  logger.error(`SQLite operation failed: ${error.message}`);
+  throw error; // Re-throw with logging
+});
```

**Priority order:**

1. Adapters (`nodeSqliteShared.ts`) — critical path
2. API handlers returning 200/empty data (`provider-stats`, `usage-analytics`)
3. All other `src/lib` catches

**Exception:** 6 stream-abort cleanup catches are legitimate no-ops (no need to log cancellation).

**Timeline:** Day 7-10

---

### QUAL-05 — asRecord/isRecord/toRecord consolidation

**Problem:** 143 divergent `asRecord` definitions, 83 `isRecord`, 80 `toRecord`. Returns `null` in some executor families and `{}` in others. Copy-paste propagates variant errors invisibly.

**Fix:**

```ts
// src/shared/utils/recordHelpers.ts
export function asRecord<T>(data: T | null | undefined): Partial<T> | null {
  return data == null ? null : data;
}

export function isRecord(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}

export function toRecord<T>(data: T): Partial<T> {
  return data ?? {};
}
```

**Migration strategy:**

1. Export new helpers
2. Grep all usages, categorize by behavior
3. Replace gradually, run tests

**Timeline:** Day 8-10

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

**Problem:** Three coexisting provider counts (375 catalog / 291 runtime REGISTRY / 294 executors). "110 MCP tools" measured as 45 manifest / 84 runtime.

**Fix:** Update docs with actual measurements and clarify what each number means.

**Timeline:** Day 12-13

---

### PERF-06 — Pool ordering hash comparison

**Problem:** `JSON.stringify(filter)` per request compares objects character-by-character. With C=10k+ connections, M=model count, this is O(C·M) stringify work.

**Fix:**

```diff
open-sse/services/sorting/poolOrdering.ts
+ const cache = new Map<string, number>();
+
+ function computeOrderHash(connections: Connection[]): number {
+   const hash = JSON.stringify(connections.map(c => c.id).sort());
+   return Number(hash) % Number.MAX_SAFE_INTEGER;
+ }
+
+ // Compare hashes instead of full objects
+ if (cache.has(currentHash) && cache.get(currentHash) === lastHash) {
+   return lastOrder; // Reuse cached result
+ }
```

**Timeline:** Day 14-16

---

### PERF-07 — Cache key canonicalization

**Problem:** Same logical filter, different key order → cache miss.

**Fix:**

```diff
src/lib/db/readCache.ts
const cacheKey = filter && Object.keys(filter).length > 0
-  ? JSON.stringify(filter)
+  ? JSON.stringify(Object.keys(filter).sort().reduce((obj, key) => { obj[key] = filter[key]; return obj; }, {}))
   : "all";
```

**Timeline:** Day 16-17

---

### PERF-08 — Image CLS fix

**Problem:** `<img className="w-full" />` causes layout shift as images load.

**Fix:** Add aspect ratios:

```jsx
<div className="aspect-square">
  <img className="w-full h-full object-cover" src={dataURI} alt="" />
</div>
```

**Timeline:** Day 17-18

---

### PERF-09 — Provider metadata build-time JSON

**Problem:** 288 provider modules evaluated eagerly. Lazy Proxy alone won't help—`Object.entries(REGISTRY)` at import forces every getter.

**Fix:** Build-time script generates `config/providers/metadata.json`:

```json
{
  "count": 288,
  "hasVision": ["gpt-4o", "claude-3"],
  "needsApiKey": ["openai", "anthropic"],
  ...
}
```

**Consumers:** Import JSON instead of iterating `REGISTRY`.

**Timeline:** Day 18-20

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
