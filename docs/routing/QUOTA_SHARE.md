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

These two modes describe a pool in the default borrow mode, `saturation`. A pool in `consent` mode
always applies the strict rules, whatever the saturation. See
[Consented lending (per-pool opt-in)](#consented-lending-per-pool-opt-in).

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

### Consented lending (per-pool opt-in)

Each pool has a borrow mode. `saturation` is the default and keeps the rules above. In `consent`
mode a `hard` key passes its share only within capacity that other keys agreed to lend. The
administrator sets the mode of each pool. Each key holder sets their own consent through
[Lending consent](#lending-consent).

A consent is a percentage from 0 to 100 and an optional deadline in epoch milliseconds. The key
lends that percentage of its idle share while the deadline is in the future.

For one dimension, `L` is the effective limit: the plan limit times the accounts in the pool.
The gate computes, for the requesting key:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` is the key's weight, or `100 / n` for every key when no weight is above 0. `lend_k` is the
key's active percentage, and 0 once its deadline has passed. The requesting key's own consent
never counts. A `hard` key is refused once its consumption reaches its share plus
`borrowAvailable`.

Capacity that no allocation claims (100 minus the sum of the weights) is not lendable. No key
agreed to lend it.

**Example.** `L` is 1000.

| Key | Weight | Share | Consumed | Lends |
| --- | ------ | ----- | -------- | ----- |
| A   | 50     | 500   | 530      | 0%    |
| B   | 30     | 300   | 100      | 50%   |
| C   | 0      | 0     | 60       | 0%    |

- B lends 50% of its idle 200, which is 100. C already took 60 above its share. A may borrow 40.
- A is served at 530 and refused once its consumption reaches 540.
- Before C used anything, with A at or under its share, C could borrow 100.
- Before C used anything, with A at 530, C could borrow 70.

**Zero weight.** A key with weight 0 has a share of 0. It is served only while its consumption
is below what others lend. When nobody lends, it is refused from its first request.

**Deadlines.** No background task expires a consent. Each request compares the deadline with
its own time, and a deadline equal to that time has passed. A stored deadline that is not a
finite number, or is past the largest date a `Date` can hold, counts as passed.

**`soft` and `burst`.** Lending does not limit them. A `soft` key is deprioritized once past its
share. A `burst` key passes while the pool has room. The pool ceiling still refuses every key
once the pool's total reaches its limit.

**Cost on the request path.** A `saturation` pool reads nothing more than before. In a `consent`
pool, a countable dimension reads the other keys only for a `hard` key at or above its share
while another key lends. It then makes one read per other key, in parallel. A failed read counts
as a consumption of 0 for that key. A `percent` dimension adds no read, because the attribution
book holds every key.

**Editing a pool.** An edit keeps the consent of the keys that stay. This holds for allocation
edits, group-wide replacements and `ensure` calls. A removed key loses its consent, and a key
added back starts at 0. The admin routes return each key's consent and never write it. Switching
a pool back to `saturation` keeps every stored consent, which has no effect in that mode.
Switching the pool to `consent` again reactivates the stored consents whose deadline has not
passed. A key holder can clear a stored consent in either mode.

**Upgrading.** If the columns `lending_percent` and `lending_until` already exist, the migration
adds only `borrow_mode`, and stored percentages stay as they are. Every pool starts in
`saturation` mode. Turn `consent` on per pool in the pool wizard. Nothing is inferred from the
stored values.

**Limitations.**

- A lender can find the pool at its ceiling before it uses its own share. Capacity that others
  borrowed counts toward the pool's total.
- The check runs before the request and reserves nothing. Concurrent requests read consumption
  before any is recorded, so lent capacity can be spent more than once, bounded by the requests
  in flight. The share check of `saturation` mode has the same property.

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

To split that figure between keys, each pool keeps an attribution book per account and plan
window. `src/lib/quota/percentLedger.ts` holds the book's rules.
`src/lib/quota/percentAttribution.ts` turns the book into the numbers that enforcement uses. The
result is an estimate built from the tokens each key routes.

#### Readings that move the book

The book moves only on the provider's own figure for the requested plan window. These connections
report one:

| Provider                            | Plan windows   |
| ----------------------------------- | -------------- |
| Claude, through an OAuth connection | `5h`, `weekly` |
| Codex                               | `5h`, `weekly` |

These do not count as a reading:

- a response the provider client marks as stale
- a Claude window whose percentage the provider did not report
- another window's figure, or the worst case across windows
- the rate-limit header fallback
- a failed read

Other providers, including Claude with an API key, have no book. Each key is charged 0 on their
percent dimensions, as before this change.

A reading shares the 30-second cache of the saturation signal. A Claude reading is dated by when
the figure was observed in response headers or read from the usage endpoint, when that time is
known. Other readings are dated by when that cache entry was built.

#### What the book keeps

Each recorded request adds its tokens, once, to a counter per pool, account and key. A counter
only grows. The book keeps three things:

- the baseline: the figure when the book opened or the window last turned
- the last applied figure
- per key, its token counter at that same moment, called its mark

The book is updated when enforcement or the usage route computes the attribution. Writes are
compare-and-set on a revision number. A writer that loses retries once on a fresh read.

#### How a key's part is computed

Each key's part is computed when the book is read. The growth of the figure since the baseline is
split between the keys in proportion to the tokens each one routed since its mark.

Together, those tokens explain at most one point of the figure per
`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` tokens (default 1,000). The growth they do not explain is
external. The baseline is external too.

For example, a book opens at 0. Key A then routes 900,000 tokens and key B routes 100,000. At a
figure of 60, A's part is 54 points and B's part is 6.

A counter below its key's mark has restarted and counts in full. A key without a mark, such as a
key that joins the pool in the middle of a window, counts all its tokens. A figure that lags the
tokens causes an error that goes away at the next reading. It does not accumulate.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` is read on every attribution. A value that is not a finite
number of at least 1 falls back to 1,000.

#### How a reading changes the book

The first matching rule applies:

1. **No book yet:** the reading opens the book. Its figure is the baseline and every counter is
   marked.
2. **Older reading:** a reading dated before the last applied one is ignored. So is a reading
   whose reset time is more than 30 minutes earlier than the stored one.
3. **New provider window:** a reset time more than 30 minutes later than the stored one turns the
   book. The figure becomes the baseline and every counter is marked again. Keys without a counter
   leave the book.
4. **Ended window:** a stored reset time that is not after the reading's data time means that
   window has ended. The reading turns the book, whatever its figure.
5. **Higher figure:** only the last figure moves. The baseline and the marks stay.
6. **Same figure:** the figure, baseline and marks stay. Only a reset time the book lacks is
   written.
7. **Lower figure:** a lower figure is never applied as such. It turns the book only when three
   things hold. It is at least two minutes newer than the last applied reading. Nothing says the
   window is the same open one. It is more than one point lower.

The window counts as the same open one when three things hold. Both reset times are known. They
are within 30 minutes of each other. The stored one is still ahead of the reading. A lower figure
inside that window changes nothing.

A reset time is stored only while it is ahead of the data time of the reading that carries it. A
higher figure stores its reading's reset time when that one is usable, and keeps the stored one
otherwise. An equal figure records its reading's reset time only when the book has none. It
changes nothing else. A lower figure that does not turn the book records no reset time.

#### When the book is used

After a reading, the book is used unless its stored reset time is not after the current time.
That case arises when a reading taken just before the reset, such as one served from the cache, is
observed just after it.

Without a usable reading, the stored book is used only while it can still be the current
window's book. That holds in two cases:

- its reset time is known and still ahead
- it has no reset time, and the last reading that changed it is at most 15 minutes old

Otherwise nothing is attributed, as when there is no book. A book whose stored reset time has
passed is never charged.

#### Enforcement

A key's consumption on a percent dimension is its attributed part plus a share of the external
part. The external part first uses the capacity no allocation claims (100 minus the sum of the
weights). Only the excess is shared among the keys by weight.

That consumption is compared with the key's fair share as for any other dimension. Strict mode
still starts when the saturation signal reaches `QUOTA_SATURATION_THRESHOLD` (default 0.5).
Every number is scaled by the effective limit: the per-account limit times the number of
accounts in the pool.

An absolute cap with `capUnit: "percent"` counts only the part attributed to the key, scaled the
same way. Take a per-account limit of 100 and k accounts. A cap of N is then reached when the
key's part of the serving account's figure reaches N/k points. Each account is checked against its
own book. For example, with two accounts, a cap of 10 is reached at 5 points of one account's
figure.

When the store cannot be read, nothing is attributed and every key is charged 0 on that
dimension. When a book write fails, that attribution uses the book as it was read. A failed token
write leaves that request's tokens out of the book. None of these failures blocks a request.

In a `consent` pool, the lending formula uses each key's consumption on the percent dimension as
described above. When another key lends, the book is read once and attributed to every key.
Without a usable book every key is charged 0. A key with a weight then passes, and a key with
weight 0 passes only when another key lends.

#### Usage route

`GET /api/quota/pools/{id}/usage` reports the same numbers through the same function. A percent
dimension has one entry per pool connection in `accounts`. Its top-level `consumedTotal` and
`perKey` mirror the first entry.

The route applies the current reading too, so it can advance the book as a request does.
`internal + external` can differ from `consumedTotal` when there is no usable reading, or when a
lower figure is not applied.

#### Storage and retention

Both quota stores keep the book. On SQLite, the automatic database cleanup, when enabled, removes
rows not updated for 60 days. On Redis, the books and counters of a pool connection share one key.
It expires 60 days after its last token write or book change. A book that does not change is not
rewritten, so the cutoff is set above the longest plan window. The manual usage-history reset also
clears the books on SQLite (see Limitations).

#### Limitations

- All growth of the account figure since the baseline is split by the tokens each key routed since
  then. When that growth happened does not matter.
- So usage made outside OmniRoute is charged to the keys up to what their tokens allow. That
  includes usage made before a key's first request of the window, when the book was already open.
- For example, outside use raises the account 60 points while no key routes. A key then routes
  30,000 tokens and the figure reaches 60.6.
- If the book was open before that use, the key's part is 30 points. It also carries 7.65 of
  external usage, with four keys of weight 25.
- If the book opened after that use, the 60 points are baseline. The key's part is 0.6 points, and
  it carries 15 of external usage.
- A request or a visit to the usage route opens the book. So whether such usage counts as baseline
  depends on when the book opened.
- With the default floor, a key that routes 60,000 tokens while outside use raises the account 60
  points gets all 60 as its own part.
- With the floor at 50,000, its own part is 1.2 points. The other 58.8 are external and charged by
  weight, like any external usage.
- Set `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` close to what one point costs on your plan. Outside use
  includes traffic on the same account from keys outside the pool.
- A percent cap applies in every mode. A capped key can be refused while the account is far below
  the saturation threshold.
- Take a cap of 10 and 12 points of outside use earlier in the window. A key that routes 20,000
  tokens is then refused at an account figure of 12.4%.
- The split is an estimate by token volume. A request counts as its prompt tokens plus its
  completion tokens. Cache discounts and model prices do not change that count.
- A request that does not end with status 200 records no tokens. Examples are a stream the client
  disconnects and an upstream error after usage was consumed.
- The usage such a request caused is charged to the keys that did record tokens, up to what their
  tokens allow. The rest is external. It does not move back. A response that reports no token
  usage records no tokens either.
- The usage of a request in progress can show up in another active key's part for the whole
  request. It moves back only when the request ends with status 200.
- Usage already on the account when a book opens counts as external. This covers an upgrade, a new
  pool and a new account. Usage in a new window before its first reading counts as external too.
- Each key starts with its weight share of that usage, after the capacity no allocation claims.
  With one account at 85% and five keys of weight 20, each starts with 17 of its 20 used.
- In a pool with several accounts, the serving account's figure is applied to the summed budget.
  This is unchanged by the book.
- A lower figure inside a window the provider reports as open is not applied. A reset time that
  moves back by more than 30 minutes is treated as an old reading.
- In both cases the book keeps its state until the stored reset time passes. After that, the book
  is not charged until a reading turns it.
- The remedy is the manual usage-history reset (`POST /api/settings/purge-usage-history`). It
  clears the attribution books and their token counters in the SQLite database.
- The `all` period clears every book and counter. A shorter period first clears the books not
  written within it. It then clears the counters not written within it, but only for a pool
  connection that has no book left. A kept book still marks each key against its counter.
- A book whose figure has not moved is not rewritten, so a shorter period can also clear the
  current window's book. The next reading then opens a fresh book at the current figure.
- The reset does not touch a Redis quota store. There a book ends with its window, or expires 60
  days after its last write.
- When the provider sends no reset time, a window that resets and refills above the old figure
  between two readings looks like a higher figure. The book keeps the old baseline and marks.
- Readings are dated by the local clock. When it runs ahead of the provider's, or a source reports
  a reset time a little early, the book can turn up to that difference early.
- The growth in that short span is split by the tokens routed in it. The next window's first
  reading corrects it. When the turned book holds no reset time, that correction needs a lower
  figure at least two minutes newer than the last applied reading.
- Instances that share a Redis store date readings with their own clocks, so keep those clocks in
  sync. Readings of an instance whose clock runs behind look older and are ignored.
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

**When capacity returns.** A refusal at the key's share or at the pool ceiling ends with one of
two sentences, in both borrow modes:

- `percent` window: `. The <window> window resets at <time>.` The time is the reset the
  provider reports.
- Countable unit: `. Enough <window> usage is expected to clear by <time>.` The time is an upper
  bound from the sliding window, if the key sends nothing else.

`<time>` is an ISO 8601 instant in UTC. The refusal then carries `Retry-After`: the whole seconds
until that instant, plus one. A client that waits that long retries at most one second after the
instant. When the instant is not known, the refusal carries neither the sentence nor the header.
An absolute cap refusal carries neither. The public code stays `quota_share_blocked`.

A share refusal does not touch the shared connection. It sets no cooldown, no model lock and no
provider breaker failure, and the other keys of the pool keep being served. When every target of
a combo refuses the key for its share, the combo answers 429 without waiting. Its answer carries
the hint as `Retry-After`. The embeddings path ends its refusal with the same sentence and sends
no `Retry-After`.

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
| `BorrowModeField`      | Borrow mode selector (`saturation` or `consent`) in the wizard    |
| `LendingBadge`         | Read-only badge on a key that lends, in `consent` pools only      |

The lending badge shows the percentage and, when set, the deadline in UTC with the zone named.
It judges the deadline at the time of the usage snapshot. An expired or unreadable deadline shows
as `lending expired`.

The page hooks:

- `usePools` — fetches `GET /api/quota/pools` every 30s.
- `usePoolUsage` — fetches `GET /api/quota/pools/[id]/usage` on demand.
- `useLocalStoragePoolMigration` — runs once on mount to migrate legacy LS data.

The keys step of the pool wizard has a `Show usage by member to key holders` box. It sets the
pool's `memberBreakdown` option (see [Member usage](#member-usage)). Below it, the wizard warns
that someone who knows what one key used can match a bar to that key. With the box ticked, it says
so when the step lists fewer than three or more than 20 keys, as the bars then stay hidden. It
counts the keys in the step and cannot tell which of them can make requests.

### `/dashboard/costs/quota-share/plans` — Provider plan config

- `ProviderPlanConfigClient.tsx`: dropdown to select a provider, view resolved
  plan (auto from catalog or manual override), and edit dimensions.
- Changes write to `PUT /api/quota/plans/[connectionId]`.
- Deletion reverts to catalog or empty plan.

---

## Self-Service Quota API (opt-in)

`GET /api/v1/me/quota/{provider}` (also served at `/v1/me/quota/{provider}`) lets an API key
holder read, with their own key, how much of a shared subscription is theirs and what is
blocking them. The route is a thin shell over `src/server/selfService/quotaHandler.ts`; the view
is built by `src/lib/quota/selfView.ts` and its response contract is
`src/shared/schemas/selfQuota.ts` (`SelfQuotaView` in `docs/openapi.yaml`).

### Enabling and authentication

- Feature flag `QUOTA_SELF_PANEL`, default `false`. While it is off, a request that reaches the
  route gets 404. With `REQUIRE_API_KEY=true`, the client API policy refuses a missing or invalid
  key with 401 before the route runs, whatever the flag. A request with no key but a signed-in
  dashboard session passes that policy and gets the route's own answer. The flag resolves like
  every other flag (dashboard or REST override, then the environment variable of the same name);
  see [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Each pool's display name and each schedule's label are returned to the pool's key holders
  exactly as the administrator wrote them. Before turning the flag on, check that they are fit to
  be read by those key holders.
- The key is read from headers only: `Authorization: Bearer <key>` or `x-api-key: <key>`. When
  both are sent, the first one that validates is used. A key in the query string or a cookie is
  ignored. The server's environment key is refused (401).
- The key needs the `self:usage` scope (403 without it).
- The provider segment is trimmed, lower-cased and checked against
  `^[a-z0-9][a-z0-9._-]{0,63}$` (400 otherwise), then resolved through the provider registry,
  so an alias such as `cc` reads the `claude` pools. `claude` and `anthropic` read the same pools.

### What each visibility shows

| Visibility    | Requires                                                                                  | Fields                                                                                                                                                                                                                                             |
| ------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Own share     | `self:usage`                                                                              | `pools[]` (ref, name, provider, policy, weight, cap), `dimensions[].yourShare`, `accounts[]` with `yourShare` (on a `percent` window without `attributed` and `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                  |
| Account level | `self:usage` + `self:account-quota`, and the provider in the key's `sharedQuotaProviders` | adds `dimensions[].total`, `accounts[].dimensions[].account` and `accounts[].modelWindows`, `attributed` and `external` on the `yourShare` of a `percent` window, and `members` on a pool with member usage on (see [Member usage](#member-usage)) |

- `sharedQuotaProviders` is a per-key setting (`PUT /api/keys/[id]/self-service`): `null`, the
  default, means every provider the key reaches; `[]` means none. Each pool's `accountVisible`
  says which visibility applied to it.
- Account bars and model windows are shown only for accounts whose connection the key may use.
  When the key has a list of allowed connections, an account outside it keeps its `Account N`
  entry without `account` or `modelWindows`. An empty list means no restriction, as for
  `/v1/me/status`. The pool total (`dimensions[].total`) does not depend on that list.
- Two figures shown with `self:usage` alone come from other keys' use. A schedule budget's
  `exhausted` reflects the consumption of every key under that schedule. In a pool whose weights
  are all zero, the key's `weight` is `100 / number of members`. Both are what enforcement
  applies to the key.
- A pool is identified only by `ref`, an opaque value bound to the calling key. Its display name
  (`name`) is included as the administrator wrote it. A `ref` is derived from the key and the
  pool with the server's API-key secret (`API_KEY_SECRET`). Clients must not persist it: it
  changes if that secret is rotated.
- Accounts are listed as `Account 1`, `Account 2`, … in pool order. No pool id, connection id,
  account e-mail or account name is returned, and the response goes through the contract schema,
  which drops any field outside it.
- Countable units (`requests`, `tokens`, `usd`) are reported as the pool bucket the quota gate
  enforces: `limit` = plan limit × accounts in the pool, `fairShare` = weight / 100 × `limit`
  (equal split when every weight is 0), `consumed` = the key's own counter in the quota store,
  `remaining` = `fairShare` − `consumed`, floored at 0.
- `blocks.schedules` lists the key's schedule windows (`open`/`closed`, `blackout` or
  `outside-window`, `retryAfterSeconds`, reserve floors, and whether the window's budget is
  spent); `blocks.modelCaps` lists its per-model hourly caps with consumption.
- A key outside every pool of the provider gets 200 with `pools: []`; `availableModels` (the
  `qtSd/` ids the key sees in `/v1/models`), `expiresAt` and `apiBaseUrl` are still filled.
- `apiBaseUrl` is `OMNIROUTE_PUBLIC_API_BASE_URL`, then `OMNIROUTE_PUBLIC_BASE_URL`, else
  `null`. It is never the request's own origin.

### `status` and `reason`

| `status`      | Meaning                                                                                                                                                                                                                                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | A current reading.                                                                                                                                                                                                                                                                                                                       |
| `stale`       | A cached account reading marked stale, or one whose reset time has passed since it was read. Numbers are kept. One model window whose reset time has passed marks the whole `modelWindows` group `stale`. For the key's own share of a `percent` window: the book was read without an account reading in the gate's cache to confirm it. |
| `unavailable` | No reading; the numbers are `null`, never `0`. `reason` says why.                                                                                                                                                                                                                                                                        |

| `reason`                          | When                                                                                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | The quota store could not be read, or it cannot read attribution books.                                                                   |
| `percent_attribution_unavailable` | The key's own share of a `percent` window: no attribution book exists yet for that account and window, or the book does not list the key. |
| `percent_window_ended`            | The key's own share of a `percent` window: the book belongs to a plan window that has ended.                                              |
| `account_not_used_by_key`         | The key's own share of a `percent` window: the account's connection is outside the key's allowed connections. Its book is not read.       |
| `window_not_reported`             | The provider-limits cache has no reading for that plan window.                                                                            |
| `connection_lookup_failed`        | The account's connection could not be read.                                                                                               |
| `not_supported`                   | OmniRoute cannot read usage limits for the account's provider.                                                                            |
| `fetch_failed`                    | No cached reading was usable and the provider-limits refresh failed.                                                                      |
| `not_available`                   | The reading carries no usage windows, or the account has no reading at all.                                                               |

When the quota store cannot be read, the store-backed fields of `blocks` (a schedule budget's
`exhausted`, a model cap's `consumed` and `reached`) are `null` as well.

### Lending consent

`PATCH /api/v1/me/quota/{provider}` records the calling key's own consent for one pool. It uses
the flag, headers and provider rules of the `GET`. The `self:usage` scope authorizes this one
write, although its name reads as read-only.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` is the `ref` the `GET` returns for that pool.
- `lendingPercent` is an integer from 0 to 100. A value of 0 clears the consent and its deadline.
  A body with `lendingPercent` 0 is accepted in either mode.
- `lendingUntil` is optional: epoch milliseconds, or `null` for no deadline. It must be in the
  future and at most 8640000000000000. A value below 100000000000 reads as seconds and is refused.
- Any other field is refused. A body longer than 4096 bytes is refused. The read stops at that
  size, so a longer body is never held whole.

The checks run in the order of this table. Every refusal uses the standard error body with a
fixed message. A refusal by one of these checks writes nothing.

| Status | Message                                                                                            | When                                                               |
| ------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 404    | `Not found`                                                                                        | The `QUOTA_SELF_PANEL` flag is off.                                |
| 401    | `Valid API key required`                                                                           | The key is missing or invalid, or is the server's environment key. |
| 403    | `API key lacks the self:usage scope`                                                               | The key lacks `self:usage`.                                        |
| 400    | `Invalid provider`                                                                                 | The provider segment is invalid.                                   |
| 429    | `Too many lending changes. Retry later.`                                                           | The key passed its limit. The answer carries `Retry-After`.        |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | The body is not JSON, is too long, or does not match the schema.   |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | The deadline reads as seconds.                                     |
| 400    | `lendingUntil must be in the future`                                                               | The deadline is at or before the request time.                     |
| 404    | `Pool not found`                                                                                   | The `ref` names no pool of this key for this provider.             |
| 403    | `Lending is not enabled for this pool`                                                             | The pool is in `saturation` mode and `lendingPercent` is above 0.  |
| 500    | `Failed to build quota view`                                                                       | Any other failure. Its cause is logged on the server.              |

The limit is 20 requests per 60 seconds for each key. Every request that passes the provider check
counts, even one refused later or one that changes nothing. It has its own counter, apart from the
key's request rate limit.

A request that changes the stored consent writes one `quota.pool.lending.updated` audit record.
It names the key with the old and new values. The same body sent twice writes once and audits
once. The answer is 200 with the full `GET` view, built after the write.

The `GET` view reports lending as follows:

- Each pool carries `borrowMode` (`saturation` or `consent`), and the key's own `lendingPercent`
  and `lendingUntil`.
- `lendingActive` is `true` only in a `consent` pool, with a percentage above 0 and a deadline
  not reached.
- In a `consent` pool, each countable `dimensions[].yourShare` carries `borrowAvailable`. It is
  what the key may use above its share now, lent by the other keys.
- `borrowAvailable` uses the gate's formula. It reads every other key, also while the key is under
  its share. For a `hard` key that is one extra read per other key and countable dimension, in
  parallel.
- `borrowAvailable` is `null` for a `soft` or `burst` key, and `null` when a read fails.
- `borrowAvailable` is one figure for all other keys together. In a pool of two keys it is the
  other key's own figure.
- `borrowAvailable` is not reported for `percent` windows or in `accounts[]` yet.
- In a `saturation` pool the view reports the stored consent with `lendingActive: false` and no
  `borrowAvailable`.

### Errors

Every response of this route, success or error, carries `Cache-Control: no-store`. A refusal
that happens before the route runs does not carry it, for example the client API policy's 401
or the IP filter's 403. Errors of the route use the standard error body with a fixed message: 400 (invalid
provider), 401 (missing or invalid key), 403 (missing `self:usage`), 404 (flag off) and 500
(`Failed to build quota view`). The 500 covers any failure once the request reaches the route,
including the key lookup itself; its cause is logged on the server and never returned.
The errors of the `PATCH` are listed in [Lending consent](#lending-consent).

### Limitations

- `remaining` is the part of the key's fair share it has not used. It is not a guarantee. A key
  may still be served beyond it while the pool has room. Once the pool's total reaches `limit`,
  every key of the pool is refused, whatever its own `remaining`, and a key without
  `self:account-quota` cannot see that total.
- `remaining` does not take the allocation's absolute `cap` into account. Enforcement refuses the
  key once its own consumption in a window of the cap's unit reaches the cap's value.
- The account-level bar comes from the provider-limits cache and can lag the enforcement
  decision by a few minutes. A reading whose reset time has passed is reported as `stale`.
- Per-model windows (`modelWindows`) are reported only for providers that have a plan-window
  mapping: Claude and Codex today. For other providers `modelWindows` is still present when
  account data is shown, with an empty `windows` list.
- The key's own share of a `percent` window is an estimate. It comes from the attribution book and
  carries every limitation listed under "Percent dimensions: per-key attribution" above.
- `consumed` is the number enforcement compares with the fair share. It is `attributed` plus
  `external`, exactly. `attributed` is the part the book gives the key for the tokens it routed.
  `external` is the key's part of the account's use that the pool's keys do not account for.
- Both parts are sent only when the pool's `accountVisible` is true: the key has
  `self:account-quota` and the provider is in its `sharedQuotaProviders`. A key without it gets
  `consumed` alone, with the same `status` and `reason`.
- With both parts and its own weight, a holder can work out the use made outside the pool that is
  charged to the pool's keys. A holder with the account scope already sees the account total.
- A key that routed nothing in the window can still read its external charge from `consumed`,
  because its attributed part is then 0.
- For example, a book opens at 0, with keys A and B at weight 50 each. Key A routes 900,000 tokens
  and key B 100,000. The account then reaches 60% of a limit of 100. Then `attributed` is 54 for
  key A and 6 for key B, and `external` is 0 for both.
- The view reads the book and never writes its state. It does not open a book, and it never asks
  the provider for a reading. With the Redis store, a read removes superseded revision fields in
  the background, as the gate's reads do.
- The share is `ok` only while the gate's cache holds a reading of the account. Without one it is
  `stale`, so in a pool with no recent request it shows as possibly out of date.
- Until a request goes through the pool, the share is unavailable. That request opens the book,
  and the account's figure at that moment counts as use made outside the pool.
- In a pool with several accounts, each account entry uses that account's own book and the limit
  of one account. Enforcement scales both sides by the number of accounts, so the proportion is the
  same.
- Per-model windows carry no share for the key. The book keeps no per-model data.
- Reserve floors of a schedule are not evaluated by the view: a schedule can show as `open`
  while a request is refused with reason `schedule-reserve`.
- When two pools of the same key share a connection, enforcement applies one of them, and the
  view lists both.
- There is no per-address limit on failed key attempts: behind a reverse proxy callers can share
  one address (it depends on whether forwarded client addresses are trusted), so a lockout could
  deny the route to every key holder. With `REQUIRE_API_KEY=true`, an invalid key is refused by
  the client API policy before the route runs, with that policy's 401 body instead of this
  route's.

### Member usage

An administrator can let key holders see how a window's use splits between the pool's members.
The option is the pool's `memberBreakdown`, off by default. It is set in the pool wizard or with
`PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` and `GET /api/quota/pools/{id}` report it.

A dimension of the view carries `members` only when all of these hold:

- the pool's option is on
- the pool has at most 20 allocated keys, and at least three of them can make requests: active,
  not revoked, not banned and not past their expiry
- the pool's `accountVisible` is true: the key has `self:account-quota` and the provider is in its
  `sharedQuotaProviders`
- on a `percent` window, the account's connection is one the key may use
- the key's own share of that window was read: its `status` is not `unavailable`

Otherwise `members` is absent. It is never an empty list.

- Each slice is `{ slot, consumed, isYou }`. The response schema rejects any other property on a
  slice, and a list of more than 20 slices. Slices are listed in slot order.
- There is one slice per allocated key, including a key that can no longer make requests. A
  member with no use shows a real zero.
- Slot 1 is always the asking key, with `isYou` true. The other slot numbers are ranks of a keyed
  hash. It is keyed with `API_KEY_SECRET` and covers the pool, the asking key and the member.
- So the numbers do not line up between holders. For one holder they stay the same between
  visits. They can change when a key joins or leaves the pool, or when that secret is rotated.
- On a countable window a slice is the member's counter in the quota store, the same counter as
  its own `consumed`.
- On a `percent` window a slice is the member's `attributed` part, from the same book read as the
  key's own share. Usage made outside the pool is never split into slices. That charge is split by
  weight, so slices that carried it would show the weights.
- Each view reads one value per other member and countable window, in parallel. On a `percent`
  window the slices cost no read beyond the share's own book read. When one value cannot be read,
  that window has no `members`, and the key's own share stays.
- The option and the number of usable keys are read once per pool, and only for a key that may
  see account data. A failing read of the option or of the usable-key count turns the bars off for
  that pool. The server logs a warning, and the rest of the view is built.

The bars carry no names or ids. They still tell a key holder things about the other members:

- Holders can still match slices by their values.
- A stable numbering lets a holder follow one member over time.
- The number of slices shows how many keys are allocated in the pool.
- In a pool of three keys, someone who knows what one key used can tell what the last key used.
- When a pool drops below three usable keys, the bars disappear. Views taken earlier still show
  what each member used.
- On a countable window, the pool total minus the slices can show the use of keys that are no
  longer allocated.
- A member that shows zero on one account and use on another can show which member uses which
  account.
- In a countable pool with the `hard` policy, a slice that stops growing at a member's fair share
  hints at that member's weight.

### Usage series (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (also served at `/v1/me/usage`) returns the usage and cost
of the calling key's own requests: totals, one entry per UTC day, per day and model, per model
and per provider. It shares the flag, the authentication rules, the `self:usage` scope,
`Cache-Control: no-store` and the error behavior of the quota route above. The key is checked
before `range`. Errors are 400 (`Invalid range`), 401, 403, 404 and 500 (`Failed to build usage`).

- `range` is one of `1d`, `7d`, `30d` (the default) or `90d`. Any other value, an empty value or
  a repeated parameter is a 400. The set stops at `90d` to bound the cost of a call. The view
  reads raw usage history only, never the daily summaries, which carry no key.
- Rows are selected by the calling key's id. The key name column is never matched, and rows
  recorded without a key id are never counted.
- Building a series runs five grouped queries over the key's rows in the window. The built
  series is reused for 60 seconds per key and range, and a reused call runs none. Its
  `generatedAt` gives its age.
- The window ends when the series is built. A row stamped later, for example by clock skew, is
  not counted.
- `coverage.retentionDays` is the operator's raw usage-history retention setting
  (`retention.usageHistory` in the database settings). `coverage.truncatedByRetention` is true
  when the requested range is longer than that setting. It compares the two numbers and does not
  check whether rows are actually missing.
- Provider is returned as recorded for the key's own requests. Model is the recorded name after
  its last `/`, and rows are grouped by it. A combo request whose
  every target was refused is recorded with the routing label as provider (the combo name, `auto`
  or `combo`) and the model string the client sent. Other refused requests, for example by an
  open circuit breaker, a model cooldown or a quota-parked skip, keep the target provider and
  model.
- Besides counts and costs, the response carries average latency, success rates and the times of
  the first and last request.
- `byModel` lists the 50 provider-and-model pairs with the most requests. With more pairs its
  entries do not add up to `summary`, and `summary.uniqueModels` counts every recorded model
  spelling. `byModelTruncated` is then true, and a model whose pairs fall on both sides of the
  cut shows partial totals.
- Two costs are reported. `costUsd` is the billed cost, as the usage analytics show it.
  Flat-rate subscription providers, such as the Claude Code plan, count $0 there. `listPriceUsd`
  is the same usage priced at list price, subscriptions included. A request whose model has no
  price row counts its stored cost: a cost the provider reported, or one calculated when the
  request was recorded. Only a request with neither counts 0, with no marker, so a total can be
  partial.
- The response contract is `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` in
  `docs/openapi.yaml`).

### Self-service page

With `QUOTA_SELF_PANEL` on, `/quota/{provider}` is a public page. A key holder types an API key
there and sees that key's pools for the provider. Each pool shows one card per pool window, with
the pool's use for everyone and the key's own share. Each account of the pool has its own cards,
with the account's use and the key's share. The account's use appears only when the key may see
account data. The page also lists the per-model limits of each account and the key's own usage. A
notice appears when a schedule blocks the key right now. A card lists every per-model cap of the
key with its use, and marks the ones reached. `{provider}` is a provider id or its alias (`/quota/claude`, `/quota/cc`). An unknown
provider, and every `/quota/*` path while the flag is off, answer 404. Pools on a custom OpenAI-
or Anthropic-compatible node have no page. The API still answers for them.

The page has no session. The key is sent only in the `Authorization` header of
`GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` and `GET /api/v1/me/usage`,
never in a URL. A key the server accepts is kept in the tab's `sessionStorage`. With "Remember on
this device" it is kept in `localStorage` instead, and "Forget key" removes it from both. A key
the server rejects is removed from storage.

A pool in `consent` mode shows a lending card. There the key holder sets a whole percentage from
0 to 100 of the key's idle share to lend. The holder also picks how long the consent lasts: until
turned off, 1 hour, 8 hours, 24 hours, 7 days or 30 days. A duration counts from the moment of
saving. While a deadline is in force, the holder can keep it instead. If that deadline passes
before Save, the card sends nothing and asks for another choice. With 0% no deadline is sent.
The card shows the stored deadline with its time zone named. A consent whose deadline has passed
is shown as ended.

For a `hard` key the card also lists, per pool window, what other keys lend to the key right now.
Each row is one figure for all other keys together. In a pool of two keys it is the other key's
own figure. A figure the view does not report reads as not available, not as zero. For a `soft` or
`burst` key the card says that no figure applies.

A pool in `saturation` mode whose key stores a percentage above 0 shows a withdrawal only. It says
that the stored percentage has no effect there. Its Withdraw button sends 0 with no deadline. A
pool in `saturation` mode with a stored 0 shows no lending card. After a save, a card that the
returned view no longer needs stays with its message until the page's view changes again.

Nothing is saved until the holder presses Save or Withdraw. Each press sends one
`PATCH /api/v1/me/quota/{provider}` request, and a second press sends nothing while the first is
pending. The body carries the pool's opaque `ref` from the view, the percentage and the deadline.
The answer is the rebuilt quota view, and the page shows it with no second read. When two saves
overlap, the page reads the quota once after the last answer. The page does not keep the consent
in browser storage.

A refused change is explained on the card by a text chosen from the HTTP status. The error body is
not read. A 401 says the key was not accepted and reloads the quota. A 403 says the pool is not
taking lending changes, and a 404 says the pool is gone. Both offer a button that reloads the
quota. A 400 or another 4xx answer asks the holder to check the percentage and the deadline. A
429 asks the holder to wait, with the seconds of `Retry-After` when the answer gives them. A 5xx
answer, a 408 or a network failure says the change may not have been saved, and keeps the typed
values. An answer outside the contract reloads the quota. A failed save does not remove the key by
itself.
When the reload after it is refused, the page removes the key as on any refused read.

Once a key is accepted, the page also shows a "Set up your tools" card with three tabs. "Claude
Code" gives the `env` block for `~/.claude/settings.json`. "Shell" gives the same variables as
`export` lines. "Claude Desktop" gives the values for its third-party inference window. The models
are the quota-share models the key may call for that provider. When no such list comes with the
key, the block turns on gateway model discovery instead. The gateway address is the public API
origin the server reports (`OMNIROUTE_PUBLIC_API_BASE_URL`, then `OMNIROUTE_PUBLIC_BASE_URL`).
When neither is set, the card shows a placeholder and tells the holder to ask the administrator.
The key is shown as a placeholder. "Include my key" puts the whole key in the text on screen and in
what a copy button copies. That lasts until the box is cleared, the key is forgotten or replaced,
or the page is left. The card sends no request and offers no file download.

A reading the API marks `stale` is shown as possibly out of date. A reading it marks
`unavailable` is shown with its reason, never as zero.

On percentage plans the page draws the key's own share when the API reports it. It says that the
number is an estimate and names its two parts. Per-model limits show the account only.

When a window carries `members`, its card also shows a bar with one segment per member, in slot
order. The asking key's segment uses the accent colour. The other segments cycle through the
theme's chart colours. A text legend lists every segment with its value, so nothing depends on
colour. Segments are labelled `You` or `Member N`, where N is the slot.

### Dedicated port for the page

`QUOTA_PANEL_PORT` opens a second listener that serves only the self-service page. It is off
unless the variable is set. `QUOTA_PANEL_HOST` is the bind address and defaults to `127.0.0.1`.

The listener relays these paths to the main port and answers 404 for every other path:

| Path                                                                     | Serves                                 |
| ------------------------------------------------------------------------ | -------------------------------------- |
| `/quota/{provider}`                                                      | The page                               |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | The quota view the page reads          |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | The usage series the page reads        |
| `/_next/static/`                                                         | Scripts, styles and fonts of the build |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Icons                                  |

`GET` and `HEAD` are relayed without a body. One request with a body is also relayed: a `PATCH` of
the quota view path, which the page sends to save a lending choice. Any other method answers 404,
except a CONNECT request, whose connection is closed with no answer. Any other request that declares
a body answers 404 and its connection is closed. Upgrade requests are refused and their connection
is closed. A path with a dot segment or a fragment marker is refused, as on the API port. So is a
request target with a character outside printable ASCII. A raw control character in the target is
answered 400 by the HTTP parser, before this port's own check. Request headers that the framework
reserves for its own use are not relayed: names that begin with `x-middleware-`, `x-invoke-`,
`x-nextjs-`, `x-now-` or `x-next-`, and the names `x-matched-path` and `next-resume`. The request is
relayed without them. The dashboard, the login page, the management API and the inference routes
cannot be reached through this port.

The `PATCH` must carry `Content-Type: application/json`, with no parameter or with `charset=utf-8`
only. It must carry one `Content-Length` from 1 to 4096, written as plain digits, and no
`Transfer-Encoding`. A `PATCH` that breaks one of these rules answers 404. Some malformed lengths,
such as a signed or a repeated one, are answered 400 by the HTTP parser before this port's own
check. The port reads the declared bytes before it contacts the main port, and waits at most 5
seconds for them. A body that is not complete by then answers 404 and its connection is closed.
Nothing reaches the main port in that case, or when the client leaves first. The port relays exactly
the declared bytes, with the same `Content-Length`. Bytes after them are read as the next request on
the connection. A TLS reverse proxy in front must forward `Content-Length` and must not re-chunk the
request body. The main port checks the API key in the `Authorization` header, as for the `GET`.

The 404 body is `{"error":"not_found","message":"Not found."}`. A failed relay answers 502
(`api_bridge_unavailable`) or 504 (`api_bridge_timeout`) with no `detail` field.

The listener does not read `QUOTA_SELF_PANEL`, and it does not turn the page on. While the flag
is off, the page and its API answer 404 on the main port, and the listener relays that answer.

Under the development server (`next dev`), the page does not become interactive through this
port. The development hot-reload socket is an upgrade request, and the port refuses it. Use the
main port while developing.

The port serves plain HTTP and the page sends API keys. Keep the default bind address and put a
reverse proxy with TLS in front of it. A bind address other than loopback logs this notice:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

A loopback peer that sends no forwarding header counts as local on the main port. So a proxy on
the same host must send `X-Forwarded-For`. A proxy on a private address is trusted for that
header only with `OMNIROUTE_TRUST_PROXY=private` (or `lan`). Any other peer is reported by the
address of its connection, and the forwarding headers it sent are dropped.

The listener holds at most 256 connections at a time. A client has 10 seconds to send the request
headers and 30 seconds to send the whole request. An idle kept-alive connection closes after
about 5 seconds. A connection with no activity for 60 seconds is closed. These values are fixed.
Set connection and rate limits on the reverse proxy in front as well. A reverse proxy in front
should keep its idle upstream connections for less than 5 seconds, or not reuse them. The relay
to the main port uses the upstream timeouts of the API port (`API_BRIDGE_*`).

The listener also starts when `API_PORT` is not set. `QUOTA_PANEL_PORT` must be a port from 1 to
65535, written in digits only. It must differ from the dashboard port and the API port. While the
live WebSocket server is on, it must also differ from `LIVE_WS_PORT` (default 20132). Any other
value opens nothing and logs a warning. A warning about a refused value names the variable and
does not repeat the value. A port that is already in use opens nothing and logs this warning:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

With `OMNIROUTE_BASE_PATH` set, the listener expects every path above under that prefix. Use the
same `OMNIROUTE_BASE_PATH` at build time and at run time. Write it with a leading slash and no
trailing slash, for example `/omniroute`. Another shape, including `/` and `/omniroute/`, leaves
the port off with a warning, although the build accepts those forms. So does a base path whose
first segment names an application route: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`,
`docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` or `connect`, in any case.

Limitations:

- `/quota/{provider}/` with a trailing slash answers 404 on this port.
- The service worker and the web app manifest are not served on this port.
- A custom favicon set in the dashboard is not shown on this port.
- Icons are not shown when the application runs under a base path.
- The port speaks plain HTTP/1.1.
- A bind that fails is not retried until the process restarts.
- The listener has no connection or rate limit per client address.
- Container setups are not covered by this section.

---

## Environment Variables

| Variable                             | Default     | Description                                                        |
| ------------------------------------ | ----------- | ------------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`                 | `sqlite`    | Driver to use: `sqlite` or `redis`                                 |
| `QUOTA_STORE_REDIS_URL`              | _(empty)_   | Redis URL, e.g. `redis://localhost:6379`                           |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`       | 0..1; `>= threshold` activates strict mode                         |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`      | Tokens that explain at most one point of a percent plan window     |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`       | 0..1; multiplier for soft-policy combo score                       |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`        | Days before GC removes old `quota_consumption` buckets             |
| `QUOTA_PANEL_PORT`                   | _(unset)_   | Dedicated port for the self-service page. Unset means no listener. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1` | Bind address for that port                                         |

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

Consented lending adds three columns: `quota_allocations.lending_percent` (integer, default 0),
`quota_allocations.lending_until` (epoch milliseconds, or `NULL` for no deadline) and
`quota_pools.borrow_mode` (default `saturation`). Its migration only adds these columns and
writes no existing row.

The percent attribution book adds `quota_percent_ledger` (one row per pool, account and plan
window) and `quota_percent_ledger_tokens` (one token counter per pool, account and API key).
`src/lib/db/quotaPercentLedger.ts` reads and writes them.
