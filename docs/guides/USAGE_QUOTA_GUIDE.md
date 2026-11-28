---
title: "Usage, Quota & Spend Tracking"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Usage, Quota & Spend Tracking

> **TL;DR**: OmniRoute tracks every request's token usage, computes cost, enforces per-API-key quota, and surfaces analytics in the dashboard. This guide explains how it all works.

**Sources:**

- `open-sse/services/usage.ts` (~70KB) — main usage tracking
- `src/lib/usageAnalytics.ts` (~10KB) — aggregation for dashboard
- `src/lib/db/quotaSnapshots.ts` — historical quota data
- `src/lib/db/usage*.ts` — multiple usage-related DB modules

---

## Overview

Every request that flows through OmniRoute generates a **usage record** that captures:

- **Identity**: which API key, provider, model, combo
- **Tokens**: prompt tokens, completion tokens, cached tokens, total
- **Cost**: USD amount (computed from pricing data)
- **Timing**: latency, start/end timestamps
- **Status**: success, error, rate-limited, etc.

These records are aggregated into **analytics**, persisted as **quota snapshots**, and used to enforce **per-key budget limits**.

```
Request ──▶ chatCore ──▶ usage.record() ──▶ SQLite
                                  │
                          ┌───────┼───────┐
                          ▼       ▼       ▼
                    analytics  quota   billing
                    (dashboard) (enforce) (export)
```

---

## What Gets Recorded

The `usage.ts` service captures a **usage event** for every request:

| Field              | Type    | Source                                                     |
| ------------------ | ------- | ---------------------------------------------------------- |
| `id`               | string  | UUID generated on record                                   |
| `apiKeyId`         | string  | The API key that initiated the request                     |
| `provider`         | string  | Provider ID (openai, anthropic, etc.)                      |
| `model`            | string  | Model ID (gpt-5, claude-opus-4-6, etc.)                    |
| `comboId`          | string? | Combo ID if routed through a combo                         |
| `promptTokens`     | number  | From upstream response                                     |
| `completionTokens` | number  | From upstream response                                     |
| `cachedTokens`     | number  | Cache hit tokens (Anthropic prompt caching, etc.)          |
| `totalTokens`      | number  | prompt + completion                                        |
| `costUsd`          | number  | Computed from pricing data                                 |
| `latencyMs`        | number  | End-to-end request duration                                |
| `status`           | enum    | `success`, `error`, `rate_limited`, `timeout`, `cancelled` |
| `errorClass`       | string? | Error class if status != success                           |
| `timestamp`        | string  | ISO 8601 UTC                                               |
| `metadata`         | object  | Custom plugin-injected data                                |

### Where Tokens Come From

Tokens are extracted from the upstream provider's response in the **response handler**:

```ts
// From open-sse/handlers/chatCore.ts
const response = await providerExecutor.execute(provider, request);
const usage = response.usage || {
  prompt_tokens: 0,
  completion_tokens: 0,
  cached_tokens: 0,
};
```

For providers that don't return usage (some web-cookie providers), OmniRoute **estimates** tokens using a `~4 chars per token` heuristic (see `open-sse/services/autoCombo/pipelineRouter.ts`).

### Cached Tokens

OmniRoute tracks `cached_tokens` separately from `prompt_tokens` because:

- Anthropic prompt caching charges a reduced rate for cached tokens (10% of normal)
- Some providers return `cache_read_input_tokens` that should be priced differently
- Analytics can show the **cache hit rate** = `cached_tokens / prompt_tokens`

### Cache-write tier diagnostics

The Analytics dashboard's prompt-cache health panel distinguishes provider-reported
5-minute and 1-hour cache writes. Anthropic's
`usage.cache_creation.ephemeral_5m_input_tokens` and
`usage.cache_creation.ephemeral_1h_input_tokens` are retained through streaming and
non-streaming usage translation and stored with call-log summaries. The combined
cache-write total is not added to those buckets a second time.

Calls with only a combined write counter, including older records, have an unknown
tier. A partial breakdown keeps its unassigned remainder unknown; invalid or
conflicting counters are flagged rather than silently assigned a TTL. Request-side
TTL markers are not evidence of a billed tier.

The panel's API-equivalent write estimate covers only reported, priced tiers, not
the whole request. For native Claude/Anthropic model pricing it uses 1.25 times the
input rate for 5-minute writes and twice the input rate for 1-hour writes. Missing
pricing is unavailable, not zero. Prices are captured when each new call is logged;
historical records are not repriced. Subscription accounts can therefore have an
API-equivalent estimate without incurring that amount as cash spend or subscription
quota. Existing quota, budget and provider-exact cost calculations are unchanged.

These diagnostics use the existing bounded cache-health summary and call-log
retention. They do not change request TTL defaults, routing or account selection.
Capturing client-requested versus effective outgoing TTL at the provider send
boundary is deferred; this panel reports receipt tiers, not effective outgoing TTL.

Implementation: `src/lib/usage/cacheWriteEstimate.ts`,
`src/lib/usage/cacheHealth.ts`, and `open-sse/utils/cacheWriteUsage.ts`.

---

## Cost Calculation

Costs are computed from **pricing data** synced from LiteLLM (`src/lib/pricingSync.ts`):

| Model             | Input $/1M | Output $/1M | Cached $/1M |
| ----------------- | ---------- | ----------- | ----------- |
| gpt-5             | $2.50      | $10.00      | —           |
| claude-opus-4-6   | $15.00     | $75.00      | $1.50       |
| claude-sonnet-4-5 | $3.00      | $15.00      | $0.30       |
| gemini-2.5-pro    | $1.25      | $10.00      | —           |

The cost formula (`src/lib/usage/costCalculator.ts`):

```ts
cost =
  (prompt_tokens - cached_tokens) * input_price +
  cached_tokens * cached_price +
  completion_tokens * output_price;
```

> **Why subtract cached from prompt?** The cached portion is priced separately; charging input price on the whole prompt would over-count.

### Pricing Sync

Pricing data is auto-synced from LiteLLM via the `/api/pricing/sync` endpoint (triggered by the built-in cron task, not a user-facing env var):

```bash
# Manual trigger
curl -X POST http://localhost:20128/api/pricing/sync
```

For models with no pricing data, OmniRoute falls back to **estimating cost** using internal average rates (sourced from LiteLLM's pricing data).

---

## Date Range Aggregation

The `usageAnalytics.ts` module computes dashboard widgets from raw usage data. It supports 7 time ranges:

| Range    | Window                      | Use case                    |
| -------- | --------------------------- | --------------------------- |
| `1d`     | Last 24 hours               | Hourly cost spike detection |
| `7d`     | Last 7 days                 | Weekly review               |
| `30d`    | Last 30 days                | Monthly billing             |
| `90d`    | Last 90 days                | Quarterly analysis          |
| `ytd`    | Since Jan 1 of current year | Annual budget tracking      |
| `all`    | All time                    | Lifetime stats              |
| `custom` | User-defined start/end      | Audits, ad-hoc queries      |

### Dashboard Widgets Computed

For any date range, the analytics layer computes:

| Widget                 | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| **Summary cards**      | Total requests, total cost, total tokens, success rate |
| **Daily trend chart**  | Cost + tokens per day, stacked by model                |
| **Activity heatmap**   | Hour-of-day × day-of-week grid, color = request count  |
| **Model breakdown**    | Pie chart of cost by model                             |
| **Provider breakdown** | Bar chart of requests by provider                      |
| **Top API keys**       | Table of top 10 keys by cost                           |
| **Error analysis**     | Error rate over time, top error classes                |

### Programmatic Access

````ts
import { computeAnalytics } from "@/lib/usageAnalytics";

const analytics = await computeAnalytics(
  history,              // usage history records
  "7d",                 // time range: "1d" | "7d" | "30d" | "90d" | "ytd" | "all" | "custom"
  connectionMap,        // provider connection map (connectionId → account name)
  {
    startDate: "2025-01-01",  // optional: for "custom" range
    endDate: "2025-06-01",   // optional: for "custom" range
  }
);

console.log(analytics.summary.totalCost);   // 12.34 (cents)
console.log(analytics.byModel[0]);           // { model, cost, requests, promptTokens, completionTokens }

---

## Quota Enforcement

Per-API-key quota is enforced in two places:

1. **Soft limit** (`quotaWarnAt`): dashboard warning when usage exceeds threshold
2. **Hard limit** (`quotaLimit`): request rejected with HTTP 429 when exceeded

### Configuration

```ts
// Per API key
await updateApiKey(keyId, {
  quotaWarnAt: 5_00,    // $5.00 — show warning
  quotaLimit: 10_00,    // $10.00 — hard stop
  quotaWindow: "month", // "day" | "week" | "month" | "all"
});
````

### Enforcement Flow

```
Request ──▶ quotaCheck()
              │
              ├── Within limit?  ──▶ allow
              │
              └── Over limit?  ──▶ 429 Too Many Requests
                                   with Retry-After header
```

### Quota Snapshots

`quotaSnapshots` table stores **historical quota state** for trend analysis:

| Field | Description |
| ----------- | -------------------------------- | ------ | ------- |
| `apiKeyId` | The key being tracked |
| `window` | "day" | "week" | "month" |
| `used` | Cost used in this window (cents) |
| `limit` | The limit (cents) |
| `resetAt` | When the window resets |
| `createdAt` | When the snapshot was taken |

Snapshots are taken **on every request** that uses > 0 cost, and used to:

- Render the quota progress bar in the dashboard
- Show 30-day quota trend charts
- Trigger alerts when usage approaches the limit

---

## Quota Window Pings (Subscription Windows)

Some subscription providers grant quota in **first-use windows**: the window's
`resetAt` only starts counting down after the first billed request lands inside
it, so an idle window keeps sliding forward and the first real request pays the
warm-up. A quota window ping is one tiny, opt-in request that starts the window
so the next real request does not have to.

Open **Settings → AI → Codex Quota Auto-Ping** to manage targets. The section
sits after Codex Wakeups and is management-authenticated.

### Eligibility

A window is targetable only when the provider reports a **first-use** window
with a **global upstream `resetAt`** that the first billed request sets. A target
also needs:

- an OAuth connection for the same provider (API-key connections are rejected),
- a known window duration,
- a fresh usage reading that reports the window, its `resetAt`, and its
  remaining fraction, plus the longer window when a session gate applies (below).

Per-model reset windows, sliding windows, fixed-calendar windows, token buckets,
and windows without a global `resetAt` are **not** targetable. The targetable set
is the fixed descriptor registry in `src/shared/constants/quotaWindowPing.ts`;
adding a provider is a registry change, not a runtime setting.

### Default-off and kill switch

The feature is off at every level by default:

- `settings.quotaWindowPing.enabled` defaults to `false`
  (`src/lib/db/settings.ts`).
- Every new target stores `enabled = 0`.
- The scheduler is lazy: no timer and no target query until the kill switch is
  on **and** at least one enabled target exists. It ticks every 30 seconds.
- With the kill switch off, scheduled runs skip. **Ping now** still records a
  `kill_switch_off` skip and sends no request. Targets remain listed and
  editable.

Turning the kill switch on or off re-evaluates the scheduler immediately, so a
settings write arms or disarms it without a restart.

### Per-target opt-in and schedules

Each target is one `(connection, window)` pair. Enabling a target requires a
schedule (except manual-only windows). Supported schedules:

| Kind     | Options                                                                       |
| -------- | ----------------------------------------------------------------------------- |
| Daily    | `HH:mm` in an IANA timezone, one or more weekdays (0 = Sunday … 6 = Saturday) |
| Interval | Every 5 to 10,080 minutes (7 days)                                            |

A disabled target has no persisted schedule; the editor keeps the draft in the
page until you enable and save. A manual-only target shows no schedule controls
and uses **Ping now**.

Limits: at most 100 targets, one target per connection + window, and the newest
200 finished run rows are retained.

### Provider support matrix

| Provider                   | Window                | Policy                             | Notes                                                                                                                             |
| -------------------------- | --------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Codex                      | Session (5h)          | Scheduled                          | The existing Codex auto-ping (`settings.codexAutoPing`) is unchanged; both share the per-reset dedupe key on the same connection. |
| Codex                      | Weekly                | Scheduled                          | No longer window to guard; the same telemetry and per-reset dedupe gates apply.                                                   |
| Claude                     | Session (5h)          | Manual by default, schedule opt-in | Requires the billable confirmation and risk acknowledgement described below.                                                      |
| Claude                     | Weekly (7d)           | Manual by default, schedule opt-in | Same confirmation gate.                                                                                                           |
| Claude                     | Weekly `<model>` (7d) | Excluded                           | Per-model `resetAt`, not one global window.                                                                                       |
| Antigravity, `agy`, Google | n/a                   | Telemetry only                     | No descriptor is registered; the windows are observed but never pinged.                                                           |
| Any other provider         | n/a                   | Telemetry only                     | Pinging requires a descriptor with a first-use window and a global upstream reset.                                                |

The matrix comes from the descriptor registry. "Telemetry only" providers can
still show quota in the dashboard; they simply have no ping target.

### Claude: billable confirmation and risk

A Claude ping is a real request against the Claude subscription and can spend
remaining quota. Scheduled Claude targets therefore require an explicit checkbox
("I understand this target sends automatic billable requests to Claude and spends
real quota."). The API rejects an enabled Claude target without
`claudeBillableConfirmed = true`; the UI disables the enable toggle and schedule
editor until it is checked. A target that was enabled before the confirmation
shows a warning and stays blocked until repaired.

Scheduled Claude targets are off by default: the add form creates the target
disabled, and enabling one requires a saved schedule plus this confirmation.

> **Risk:** every ping, manual or scheduled, consumes real provider quota. Use
> dry run first to see what would happen before sending requests.

### Longer-window threshold

Session windows guard the longer window first:

- Codex session → weekly
- Claude session → weekly (7d)

A session ping is skipped when the longer window is exhausted
(`longer_window_exhausted`). A target window with no remaining quota is skipped
as `window_exhausted`. The optional **Minimum remaining on longer window
(%)** gate (`minLongerWindowRemainingPct`, 0-100, default 0) adds a headroom
requirement: the ping is skipped when the longer window's remaining percentage
is **below** the value. A value equal to the threshold passes. `0` keeps only
the exhausted check. Weekly targets have no longer window, so the threshold
field is not shown for them.

### Dry run

Dry run evaluates every gate, including the usage read, but sends no request and
writes no call-log row. It records a `skipped` run with reason `would_ping` and a
`dry run` marker, so you can confirm the decision and reset fingerprint before
spending quota. Dry run is available on manual-only targets too.

### Skip reasons and where to see them

Every evaluation writes one run row (a `running` lease row, then its final
status). The per-target **Last decision** line and the collapsible **Recent
decisions** list show the newest 20 runs (the API returns the newest 50). Each
row carries the reason, status, trigger (`scheduled` or `manual`), target and
window, reset fingerprint, dry-run marker, and a sanitized detail code.

Pre-fetch skip reasons, in evaluation order:

1. `target_disabled`: the target is disabled (manual **Ping now** bypasses this one)
2. `kill_switch_off`: the global kill switch is off
3. `account_disabled`: the connection is missing, inactive, or in a terminal state
4. `breaker_open`: the provider circuit breaker is open
5. `breaker_cooling`: rate-limited now or within 15 minutes of a failure
6. `exclusive_lease`: another activity holds the connection's exclusive lease
7. `in_flight`: this target already has a live run (same process or DB lease)
8. `no_model`: no selectable ping model in the provider catalog

Post-fetch skip reasons, in evaluation order:

9. `telemetry_stale`: the usage reading is stale, message-only, or missing a required field
10. `window_exhausted`: the target window has no remaining quota
11. `window_active`: reset-horizon evidence proves the window already started (Codex session only)
12. `longer_window_exhausted`: the longer window is exhausted
13. `longer_window_below_threshold`: the longer window is below the configured threshold
14. `already_pinged_reset`: this target (or, for Codex, the legacy auto-ping) already pinged this reset, or the last successful ping of this target was under 10 minutes ago

Outcome reasons for runs that reach the provider: `completed`, `not_completed`,
`timeout`, `error`, `auth_failed`, and `no_token`. `would_ping` is dry run only.
A ping failure sets a 15-minute failure cooldown and surfaces as
`breaker_cooling` on later evaluations.

### Execution and labeling

Pings use the normal provider executor registry, never a feature-local HTTP
client, and run inside the connection's resolved proxy context. The request is
the smallest body that starts a window:

- **Codex:** Responses stream, input "hi", instructions "Reply with OK.",
  reasoning effort `none`, `store: false`. Only a `response.completed` event
  counts as success.
- **Claude:** non-streaming message, `max_tokens: 1`, content "hi". Only a
  complete `message` object with a string `stop_reason` counts as success.

A 60-second timeout aborts the request. There is no retry, no account rotation,
and no fallback to the default egress; the exclusive lease is re-checked
immediately before dispatch. Credential refresh follows the legacy auto-ping
behavior (no rotating refresh).

Each executed attempt writes one call-log row with
`request_type = quota_window_ping`, metadata only (no prompt/completion tokens,
no cost), so quota pings are visible in request history without polluting spend
analytics. A successful ping writes the minute-rounded reset fingerprint to the
target and, for cross-feature dedupe, to the connection's
`last_pinged_reset_key` (Codex and Claude). One ping per reset fingerprint,
plus a 10-minute minimum interval after a successful ping of the same target.

### Management API

- `GET /api/settings/quota-window-ping` returns the kill switch, descriptors,
  targets, and the newest 50 runs.
- `POST /api/settings/quota-window-ping` accepts
  `{ action: "create" | "update" | "delete" | "run", ... }`.
- `PATCH /api/settings` with `{ "quotaWindowPing": { "enabled": true } }` toggles
  the global kill switch.

### Non-goals

This feature does not implement:

- true sliding windows or token buckets,
- pings for providers without a first-use window backed by a global upstream
  `resetAt`,
- per-model windows (for example Claude weekly per model),
- Antigravity or Google windows (telemetry only),
- account rotation, multi-account selection, or fallback on failure.

### Unresolved provider semantics

- **Claude "window not started":** Claude telemetry does not attest whether a
  session window is already running, so the `window_active` evidence applies to
  Codex only (`windowActiveEvidence = "none"` for Claude). Whether a Claude ping
  starts a window or spends quota in an already-started window is **not
  verified** by this implementation; only the per-reset dedupe prevents a
  repeat.
- **Claude token refresh:** scheduled Claude pings use the same non-rotating
  credential refresh as the legacy auto-ping, so an expired token tends to
  surface as `telemetry_stale` rather than `auth_failed`. Forcing a rotating
  refresh for scheduled Claude pings remains an open product decision.
- **Legacy race:** the legacy Codex auto-ping has no DB claim, so an overlapping
  legacy ping and a new target can both send once in the same reset. New-target
  to new-target, and new-target after legacy, are deduped.

---

## REST API

### List Usage Records

```bash
GET /api/usage?range=7d&limit=100
GET /api/usage?apiKeyId=key-123&range=30d
GET /api/usage?provider=openai&range=1d
```

Response:

```json
{
  "records": [
    {
      "id": "uuid",
      "apiKeyId": "key-123",
      "provider": "openai",
      "model": "gpt-5",
      "promptTokens": 1234,
      "completionTokens": 567,
      "totalTokens": 1801,
      "costUsd": 0.005,
      "latencyMs": 1234,
      "status": "success",
      "timestamp": "2026-06-08T12:00:00Z"
    }
  ],
  "total": 1234,
  "nextCursor": "..."
}
```

### Get Analytics Summary

```bash
GET /api/usage/analytics?range=7d&groupBy=model
```

Response:

```json
{
  "summary": {
    "totalCost": 12.34,
    "totalRequests": 5678,
    "totalTokens": 12345678,
    "successRate": 0.987,
    "avgLatencyMs": 1234
  },
  "models": [
    { "model": "gpt-5", "cost": 8.5, "requests": 1234, "tokens": 4567890 },
    { "model": "claude-opus-4-6", "cost": 3.84, "requests": 234, "tokens": 234567 }
  ],
  "daily": [
    { "date": "2026-06-01", "cost": 1.5, "requests": 800 },
    { "date": "2026-06-02", "cost": 2.0, "requests": 1000 }
  ]
}
```

### Query Usage Analytics

Usage data is accessed via the dashboard or MCP tools, not direct REST export endpoints. Available analytics:

- **`/api/usage/analytics`** — aggregated usage metrics (group by model, provider, key)
- **`/api/usage/quota`** — current quota status per API key
- **`/api/usage/history`** — request history logs

---

## MCP Tools

Two MCP tools expose usage data to agents (see `open-sse/mcp-server/tools/`):

| Tool                    | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `omniroute_cost_report` | Generates a per-key cost report for a given period |
| `omniroute_check_quota` | Returns current quota status for an API key        |

Example agent invocation:

```json
{
  "tool": "omniroute_cost_report",
  "args": { "period": "week" }
}
```

---

## Retention and Cleanup

Usage data grows ~1-10KB per request. At scale, this can be significant.

### Retention Settings

Usage history retention is configured via the Database Settings in the UI or via `/api/settings/database`.

By default, usage history is retained for **90 days**.

### Cleanup

Old records are cleaned up by `src/lib/db/cleanup.ts`:

- Triggered by the background cron process
- Deletes records from `usage_history` older than the configured `usageHistory` retention setting

### Storage Estimation

| Request rate    | 30-day storage | 90-day storage |
| --------------- | -------------- | -------------- |
| 100 req/day     | ~3MB           | ~9MB           |
| 1,000 req/day   | ~30MB          | ~90MB          |
| 10,000 req/day  | ~300MB         | ~900MB         |
| 100,000 req/day | ~3GB           | ~9GB           |

For very high traffic, consider:

- Reducing the retention period via Database Settings
- Using `aggregated_metrics` instead of raw records (only for analytics)

---

## Cost Optimization Tips

### 1. Use the Right Model

```bash
# Quick answer — use cheap + fast
curl -d '{"model":"auto/fast","messages":[...]}'

# Complex task — use quality
curl -d '{"model":"auto/smart","messages":[...]}'
```

### 2. Enable Caching

Anthropic prompt caching saves **90% on repeated context**:

```ts
// The caching is automatic — just include the same large system prompt
const response = await openai.chat({
  model: "claude-sonnet-4-5",
  system: longSystemPrompt, // Will be cached automatically
  messages: [{ role: "user", content: "..." }],
});
```

### 3. Use Compression

RTK + Caveman compression saves **15-95% on tool-heavy sessions**:

```ts
const config = {
  compression: {
    engine: "rtk",
    intensity: "aggressive",
  },
};
```

### 4. Set Per-Key Quotas

Always set `quotaLimit` to prevent runaway costs:

```ts
await updateApiKey(keyId, { quotaLimit: 10_00 }); // $10/month cap
```

### 5. Audit Top Consumers

Use the dashboard or **`/api/usage/analytics`** to group by API key and sort by cost:

```bash
GET /api/usage/analytics?groupBy=apiKey
```

---

## Troubleshooting

### "Cost is higher than expected"

1. Check **`/api/usage/analytics?groupBy=model`** — find the expensive model
2. Check **`/api/usage/analytics?groupBy=apiKey`** — find the heavy consumer
3. Verify pricing data is up to date: `POST /api/pricing/sync`

### "Records missing"

- Check DB retention settings under Dashboard → Database → Cleanup — old records are deleted by the periodic cleanup task (`src/lib/db/cleanup.ts`)
- Check for errors in `src/lib/db/usage*.ts` — DB write failures are logged but not surfaced
- Verify the request actually reached `chatCore` — check combo routing

### "Quota not enforcing"

- Check the key's `quotaLimit` setting
- Verify `quotaWindow` is set correctly
- Look for `quotaSnapshots` records — they should be created on every request

---

## See Also

- [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md) — Schema for usage tables
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md#18-pricing-sync) — pricing sync env vars
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — How `auto/fast`, `auto/cheap` reduce cost
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — Full `/api/usage/*` reference
- Source: `open-sse/services/usage.ts`, `src/lib/usageAnalytics.ts`, `src/lib/db/usage*.ts`
