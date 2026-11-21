---
title: "Quota Sharing Engine"
version: 3.8.40
lastUpdated: 2026-06-28
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

Then:

- **`policy = hard`**: if `consumed > fairShareAllowed` and mode is strict → **block**.
- **`policy = soft`**: if `consumed > fairShareAllowed` and mode is strict → **penalize** (deprioritize in combo; never hard-block).
- **`policy = burst`**: allow while global headroom exists regardless of fair share.

### Cap absoluto

`capValue` + `capUnit` on an allocation is a hard ceiling independent of mode or
policy. Any dimension where `consumed >= capValue` always **blocks** the request.

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

| Visibility    | Requires                                                                                  | Fields                                                                                                                                                                |
| ------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Own share     | `self:usage`                                                                              | `pools[]` (ref, name, provider, policy, weight, cap), `dimensions[].yourShare`, `accounts[]` with `yourShare`, `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl` |
| Account level | `self:usage` + `self:account-quota`, and the provider in the key's `sharedQuotaProviders` | adds `dimensions[].total`, `accounts[].dimensions[].account` and `accounts[].modelWindows`                                                                            |

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

| `status`      | Meaning                                                                                                                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | A current reading.                                                                                                                                                                                        |
| `stale`       | A cached account reading marked stale, or one whose reset time has passed since it was read. Numbers are kept. One model window whose reset time has passed marks the whole `modelWindows` group `stale`. |
| `unavailable` | No reading; the numbers are `null`, never `0`. `reason` says why.                                                                                                                                         |

| `reason`                          | When                                                                        |
| --------------------------------- | --------------------------------------------------------------------------- |
| `store_unavailable`               | The quota store could not be read.                                          |
| `percent_attribution_unavailable` | The key's own share of a `percent` window (see Limitations).                |
| `window_not_reported`             | The provider-limits cache has no reading for that plan window.              |
| `connection_lookup_failed`        | The account's connection could not be read.                                 |
| `not_supported`                   | OmniRoute cannot read usage limits for the account's provider.              |
| `fetch_failed`                    | No cached reading was usable and the provider-limits refresh failed.        |
| `not_available`                   | The reading carries no usage windows, or the account has no reading at all. |

When the quota store cannot be read, the store-backed fields of `blocks` (a schedule budget's
`exhausted`, a model cap's `consumed` and `reached`) are `null` as well.

### Errors

Every response of this route, success or error, carries `Cache-Control: no-store`. A refusal
that happens before the route runs does not carry it, for example the client API policy's 401
or the IP filter's 403. Errors of the route use the standard error body with a fixed message: 400 (invalid
provider), 401 (missing or invalid key), 403 (missing `self:usage`), 404 (flag off) and 500
(`Failed to build quota view`). The 500 covers any failure once the request reaches the route,
including the key lookup itself; its cause is logged on the server and never returned.

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
- The key's own share of a `percent` window is reported as `unavailable`
  (`percent_attribution_unavailable`) for now.
- Reserve floors of a schedule are not evaluated by the view: a schedule can show as `open`
  while a request is refused with reason `schedule-reserve`.
- When two pools of the same key share a connection, enforcement applies one of them, and the
  view lists both.
- There is no per-address limit on failed key attempts: behind a reverse proxy callers can share
  one address (it depends on whether forwarded client addresses are trusted), so a lockout could
  deny the route to every key holder. With `REQUIRE_API_KEY=true`, an invalid key is refused by
  the client API policy before the route runs, with that policy's 401 body instead of this
  route's.

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
