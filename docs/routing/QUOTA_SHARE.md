---
title: "Quota Sharing Engine"
version: 3.8.40
lastUpdated: 2026-11-20
---

# Quota Sharing Engine

> **Doc reference**: `docs/routing/QUOTA_SHARE.md`
> Part of Group B (plans 16 + 22).

---

## Overview

The Quota Sharing Engine distributes a provider's time-based quota (e.g. Codex
5-hour window, Kimi 1500 req/h) fairly across multiple API keys that share the
same connection.

**Problem it solves:** OmniRoute proxies many API keys against the same upstream
provider account. Without sharing logic, a burst from key A can exhaust the
provider quota for the hour, leaving keys B and C blocked until the window resets.
The engine prevents this by:

1. Tracking each key's rolling consumption per dimension (%, requests, tokens, $).
2. Applying a work-conserving fair-share algorithm: a key may borrow from idle
   shares while the global pool is not saturated.
3. Enforcing the result in the hot path (`chatCore.ts`) before the request
   reaches the upstream executor.

---

## Algorithm: Fair-Share Work-Conserving

Implemented in `src/lib/quota/fairShare.ts`.

### Modes

| Condition                                  | Mode         | Behaviour                                              |
| ------------------------------------------ | ------------ | ------------------------------------------------------ |
| `globalUsedPercent < saturationThreshold`  | **Generous** | Key may borrow up to global limit minus consumed-total |
| `globalUsedPercent >= saturationThreshold` | **Strict**   | Enforce individual fair share strictly                 |

Default `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

### Per-dimension decision

For each active dimension in the pool, the engine computes:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

For `percent` dimensions, `consumed` comes from the attribution book instead (see
[Percent dimensions: per-key attribution](#percent-dimensions-per-key-attribution)).

Then:

- **`policy = hard`**: if `consumed > fairShareAllowed` and mode is strict → **block**.
- **`policy = soft`**: if `consumed > fairShareAllowed` and mode is strict → **penalize** (deprioritize in combo; never hard-block).
- **`policy = burst`**: allow while global headroom exists regardless of fair share.

### Cap absoluto

`capValue` + `capUnit` on an allocation is a hard ceiling independent of mode or
policy. Any dimension where `consumed >= capValue` always **blocks** the request.
For a `percent` cap, `consumed` is only the part attributed to the key.

### Multi-dimension check

A request is blocked if **any** dimension in the pool would block it. Dimensions
are independent — a 5h% exhaustion does not affect the weekly% dimension.

### Borrowing

In generous mode, a key whose allocation is under-consumed can use surplus from
other keys' unallocated shares. The formula is:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

where `consumedByOtherKeys = consumedTotal - consumedByThisKey`. The teto global
(pool `limit` for that dimension) is always the hard ceiling.

---

## Sliding Window Counter

Implemented in `src/lib/quota/sqliteQuotaStore.ts` and `redisQuotaStore.ts`.

Two buckets per `(apiKeyId, dimensionKey)`:

- `curr`: current bucket (`floor(nowMs / windowMs)`)
- `prev`: previous bucket (`curr - 1`)

Effective rolling value:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precision**: ~99% accurate. The error is at most 1% of the window size at the
boundary between buckets (inherent to the 2-bucket approximation).

### Concurrency

SQLite driver: in-memory mutex per `(apiKeyId | dimensionKey)` key prevents the
read-modify-write race. Pattern mirrors `src/sse/services/auth.ts` anti-thundering-herd.

Redis driver: Lua EVAL script for atomic increment — runs as a single Redis command.

---

## Drivers

### SQLite (default, 0-install)

- Table: `quota_consumption` (see migration `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Best for single-instance deployments.
- All persistence is in the existing OmniRoute SQLite DB (`DATA_DIR/storage.sqlite`).

### Redis (optional, multi-instance)

- Requires `ioredis` npm package.
- Counters stored in Redis; metadata (pools/allocations) still in SQLite.
- Best for multi-replica deployments where counters must be shared.

### Switching drivers

Via settings UI (`/dashboard/settings` → Quota Store), or via env vars:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

DB setting has precedence over env. If `driver=redis` but URL is absent or
`ioredis` is not installed, the factory falls back to SQLite and logs a warning.

Driver selection order:

1. DB setting `quotaStore.driver`
2. Env `QUOTA_STORE_DRIVER`
3. Default: `sqlite`

---

## Multi-Dimension

A pool can have multiple dimensions. Each dimension is independent:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Example: Codex plan** (5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

A request must satisfy all dimensions to be allowed.

### Percent dimensions: per-key attribution

A percent plan reports one usage figure per account and plan window. The provider gives no
counter per API key.

To give each key a part of that figure, each pool keeps an attribution book per account and
plan window. `src/lib/quota/percentLedger.ts` holds the book's rules.
`src/lib/quota/percentAttribution.ts` turns the book into the numbers that enforcement uses. The
result is an estimate. It is built from the tokens each key routes and from the observed changes
of one number.

#### Readings that move the book

The book moves only on the provider's own figure for the requested plan window. These connections
report one:

| Provider                            | Plan windows              |
| ----------------------------------- | ------------------------- |
| Claude, through an OAuth connection | `5h`, `weekly`            |
| Codex                               | `5h`, `weekly`            |
| Bailian                             | `5h`, `weekly`, `monthly` |

These do not count as a reading:

- a response the provider client marks as stale;
- a window whose figure the provider did not report, or a Bailian window without a reported total;
- another window's figure, or the worst case across windows;
- the rate-limit header fallback;
- a failed read.

Other providers, including Claude with an API key, have no book. Each key is charged 0 on their
percent dimensions, as before this change.

A reading shares the 30-second cache of the saturation signal. A Claude reading is dated by when
the figure was observed in response headers or read from the usage endpoint, when that time is
known. Other readings are dated by when that cache entry was built.

#### How a reading changes the book

The book stores the last applied figure, the part attributed to each key and an external part.
Each transition keeps these parts adding up to the last applied figure.

Each recorded request adds its tokens, once, to a counter per pool, account and key. The book is
updated when enforcement or the usage route computes the attribution. The first matching rule
applies:

- **First reading:** it is a baseline and counts as external. Tokens already on the counters are
  marked as seen, so they explain no later rise.
- **Older reading:** a reading dated before the last applied one is ignored.
- **Older window:** a reading whose reset time is more than 30 minutes earlier than the stored one
  is ignored.
- **New provider window:** a reset time that moves forward by more than 30 minutes starts a new
  window. Every part returns to 0, keys without a counter leave the book, and the new figure is
  applied as a rise.
- **Rise:** it is shared among the keys in proportion to their pending tokens, the tokens the book
  has not used yet. Together they explain at most one point per `DEFAULT_MIN_TOKENS_PER_PCT`
  tokens (1,000). The rest of the rise is external.
- **Same figure:** nothing changes and nothing is written.
- **Drop:** it is applied only from a reading at least two minutes newer than the last applied
  one. Any drop rescales every part when three things hold: both reset times are known, they are
  within 30 minutes of each other, and the stored one is still ahead of the reading. Otherwise a
  drop of up to one point rescales, and a larger drop starts a new window.

At a rise, a key whose last token write is more than 15 minutes old explains nothing. Its pending
tokens are marked as seen. A rescale multiplies every part by the ratio of the new figure to the
old one, and pending tokens stay pending. A token counter that cannot be read is ignored for that
observation, and the key keeps its place in the book.

The attributed part of a key added to a pool in the middle of a window counts only the tokens it
routes after joining. Writes are compare-and-set on a revision number. A writer that loses retries
once on a fresh read.

#### Without a usable reading

Without a usable reading, the stored book is used only while it can still be the current
window's book. That holds in two cases:

- its reset time is known and still ahead;
- it has no reset time, and the last reading that changed it is at most 15 minutes old.

Otherwise nothing is attributed, as when there is no book.

#### Enforcement

A key's consumption on a percent dimension is its attributed part plus a share of the external
part. The external part first uses the capacity no allocation claims (100 minus the sum of the
weights). Only the excess is shared among the keys by weight.

That consumption is compared with the key's fair share as for any other dimension. Strict mode
still starts when the saturation signal reaches `QUOTA_SATURATION_THRESHOLD` (default 0.5).
Every number is scaled by the effective limit: the per-account limit times the number of
accounts in the pool.

An absolute cap with `capUnit: "percent"` counts only the part attributed to the key, scaled the
same way. With a per-account limit of 100 and k accounts, a cap of N is reached when the key's
part of the serving account's figure reaches N/k points. Each account is checked against its own
book. For example, with two accounts, a cap of 10 is reached at 5 points of one account's figure.

When the store cannot be read, nothing is attributed and every key is charged 0 on that
dimension. When a book write fails, that attribution uses the book as it was read. A failed token
write can leave that request's tokens out of the book.

#### Usage route

`GET /api/quota/pools/{id}/usage` reports the same numbers through the same function. A percent
dimension has one entry per pool connection in `accounts`. Its top-level `consumedTotal` and
`perKey` mirror the first entry.

The route applies the current reading too, so it can advance the book as a request does.
`internal + external` can differ from `consumedTotal` when there is no usable reading, or when a
drop is not confirmed yet.

#### Storage and retention

Both quota stores keep the book. On SQLite, the automatic database cleanup, when enabled, removes
rows not updated for 60 days. On Redis, the books and counters of a pool connection share one key.
It expires 60 days after its last token write or book change. A book that does not change is not
rewritten, so the cutoff is set above the longest plan window.

#### Limitations

- Usage made elsewhere on the account, in an interval in which a key routed real volume, is
  attributed to that key as far as its tokens cover it. The floor of 1,000 tokens per point
  protects only against small volume.
- "Elsewhere" includes traffic on the same account from keys outside the pool.
- A rise first seen more than 15 minutes after the key's last token write counts as external. The
  book observes the figure only when a request or the usage route computes the attribution.
- Tokens routed shortly before a provider reset can be charged against the first figure of the
  new window.
- A stream that does not complete records no tokens. Its usage shows up as external.
- In a pool with several accounts, the serving account's figure is applied to the summed budget.
  This is unchanged by the book.
- When no usable reading arrives after the stored reset time, per-key percent shares and percent
  caps are not enforced until a reading returns. Without a reset time, this starts 15 minutes
  after the last reading that changed the book.
- On the Redis store, a book idle for 60 days can expire between a writer's check and its write.
  It is then re-created at a revision above 1, which is a valid state.

---

## Plan Resolver

Implemented in `src/lib/quota/planResolver.ts`.

Precedence (highest to lowest):

1. **Manual DB override** — `provider_plans` table, per `connectionId`.
2. **Known catalog** — `src/lib/quota/planRegistry.ts` (data-only).
3. **Empty plan** — no dimensions, manual configuration required.

### Known catalog

| Provider              | Dimensions                                                    |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, unknown), `tokens/weekly`               |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | No default — manual configuration required                    |

---

## Pipeline Integration

### PRE hook (`open-sse/handlers/chatCore.ts`)

Runs before the upstream executor, after auth and policy checks:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Fail-open**: if `enforceQuotaShare` throws, the request is allowed through
with a `pino.warn` log. This prevents a quota-engine bug from blocking all
traffic.

### POST hook (record consumption)

After a successful response:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Drift note**: if `consume` fails post-response, the rolling counter under-counts.
The saturation signal from the provider (e.g. `anthropic-ratelimit-unified-5h-utilization`)
corrects the global estimate on the next request.

### Combo soft penalty (`open-sse/services/combo.ts`)

When `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

The penalty is applied after all other scoring factors. It lowers the auto-combo
probability of selecting a saturated key without hard-blocking it.

---

## UI Walkthrough

### `/dashboard/costs/quota-share` — Main pools page

Components (all in `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Component              | Purpose                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| `QuotaConceptCard`     | Introductory card explaining quota sharing to new users           |
| `CreatePoolModal`      | Create a new quota pool (connection + name + initial allocations) |
| `PoolCard`             | Per-pool summary: name, connection, allocation count              |
| `DimensionBar`         | Per-dimension stacked bar: each key's share + global usage        |
| `AllocationTable`      | Table with consumed, fair share, deficit/surplus, borrowing flag  |
| `BurnRateChart`        | EMA burn-rate line chart (lazy Recharts via `dynamic()`)          |
| `EditAllocationsModal` | Edit allocation weights, caps, and policies for a pool            |

The page hooks:

- `usePools` — fetches `GET /api/quota/pools` every 30s.
- `usePoolUsage` — fetches `GET /api/quota/pools/[id]/usage` on demand.
- `useLocalStoragePoolMigration` — runs once on mount to migrate legacy LS data.

### `/dashboard/costs/quota-share/plans` — Provider plan config

- `ProviderPlanConfigClient.tsx`: dropdown to select a provider, view resolved
  plan (auto from catalog or manual override), and edit dimensions.
- Changes write to `PUT /api/quota/plans/[connectionId]`.
- Deletion reverts to catalog or empty plan.

---

## Environment Variables

| Variable                           | Default   | Description                                            |
| ---------------------------------- | --------- | ------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`               | `sqlite`  | Driver to use: `sqlite` or `redis`                     |
| `QUOTA_STORE_REDIS_URL`            | _(empty)_ | Redis URL, e.g. `redis://localhost:6379`               |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`     | 0..1; `>= threshold` activates strict mode             |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`     | 0..1; multiplier for soft-policy combo score           |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`      | Days before GC removes old `quota_consumption` buckets |

DB settings (`quotaStore.*`) override env vars.

---

## Troubleshooting

### Redis configured but not connecting

Check that `ioredis` is installed (`npm ls ioredis`) and `QUOTA_STORE_REDIS_URL`
is reachable. On connection failure the factory falls back to SQLite (logged at
`warn`).

### `peek` returns stale / fail-open

If `peek` throws, `enforceQuotaShare` treats the result as "allow" (fail-open).
Check `pino` logs for `quota:enforce` and `quota:factory` entries to identify
the root cause.

### Consumption counter drift

If the actual provider usage differs from the counters, it is expected — the
2-bucket sliding window has ~1% error at window boundaries, and `consume` is
fire-and-forget post-response. The saturation signal (`saturationSignals.ts`)
reads the real provider utilization with a 30s TTL and adjusts `globalUsedPercent`
accordingly.

### Pool shows "no data" for burn rate

`computeBurnRate` requires at least 2 historical samples. New pools without prior
`consume` calls will show `tokensPerSecond: 0` and `timeToExhaustionMs: null`.

---

## Migration from localStorage

When `/dashboard/costs/quota-share` first loads, the hook `useLocalStoragePoolMigration`
checks:

1. `localStorage.getItem("omniroute:quota-share:pools")` is non-empty.
2. `GET /api/quota/pools` returns `[]` (DB is empty).

If both are true, it posts each legacy pool to `POST /api/quota/pools` in batch,
then removes the localStorage key. The migration is idempotent: condition 2 prevents
re-migration.

---

## Internal Strategy Classification

`quota-share` is an **internal-only** routing strategy (`INTERNAL_ROUTING_STRATEGY_VALUES` in
`src/shared/constants/routingStrategies.ts`). It is used exclusively by system-minted
`qtSd/` pool combos and is deliberately excluded from `ROUTING_STRATEGY_VALUES` so it never
appears as a user-selectable option in the UI or API.

---

## Test Coverage

Two layers of automated coverage ship with the quota-share engine:

| Suite              | Command                                                                | What it covers                                                                                                                                                                                       |
| :----------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit (29 tests)    | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR scheduler, saturation gating, concurrency caps, fairShare math, backlog queueing                                                                                                                 |
| Integration matrix | `npm run test:combo:matrix`                                            | End-to-end routing decision through the real combo pipeline; DRR fairness + saturation deprioritization via live seams (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

The integration matrix runs in CI alongside all 22 public strategies. The unit suite
can be run standalone.

---

## DB Schema Summary

Three tables added by migrations `078`, `079` and `085`:

- `quota_pools` + `quota_allocations` — pool definitions and per-key allocations.
- `quota_consumption` — rolling 2-bucket counters per `(apiKeyId, dimensionKey)`.
- `provider_plans` — manual provider plan overrides (dimensions JSON per connectionId).

All tables added via idempotent `CREATE TABLE IF NOT EXISTS` migrations.

The percent attribution book adds `quota_percent_ledger` (one row per pool, account and plan
window) and `quota_percent_ledger_tokens` (one token counter per pool, account and API key).
`src/lib/db/quotaPercentLedger.ts` reads and writes them.
