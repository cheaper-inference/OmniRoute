---
title: "Team Cost Centers and Shared Budgets"
---

# Team cost centers and shared budgets

OmniRoute Team cost centers group independently managed API keys under one billing owner. They are deliberately separate from API-key groups:

```text
API Key --< key_group_members >-- Key Groups   # many-to-many model ACL
API Key --1 active billing binding--> Team     # one billing owner at a time
```

Keep one API key per person, agent, or application. Per-key model access, revocation, request limits, token limits, and audit identity continue to apply. A Team adds shared attribution, reporting, and an optional shared budget window; it does not replace those controls.

## Cost semantics

Team APIs use distinct fields rather than treating every dollar-looking value as an invoice:

- `estimatedListCostUsd`: token usage evaluated against OmniRoute's model pricing catalog. This is the phase-1 Team budget metric.
- `actualProviderCostUsd`: provider-reported or invoiced cost when available. Phase 1 returns `null` rather than substituting an estimate.
- `subscriptionQuotaUsed`: provider subscription quota units, when available. Phase 1 returns `null`.
- `compressionSavingsUsd`: estimated savings caused by compression. Phase 1 returns `null` in Team reports; existing compression analytics remain authoritative.

For subscription-backed providers, `estimatedListCostUsd` is useful for allocation and comparison but is not necessarily an invoiceable provider cost.

Reports estimate all recorded attempts, including failed attempts with token usage, and show their request and token totals. An unknown price on a failed attempt therefore sets the report's `hasUnpricedUsage`. The shared budget evaluates successful requests only: a failed-only unknown price does not block the next request. Both values use current catalog prices and can change when prices change; neither is a historical invoice.

## Immutable attribution

When the terminal usage row is written, OmniRoute resolves the API key's billing Team at the effective `UsageEntry.timestamp` and stores the resulting Team ID on the row. The timestamp defaults to the current wall clock only when the caller omits it; callers may supply it, so it is not an independent persistence-time clock. Reassigning a key never rewrites rows that are already stored. Operators should avoid transferring a key while it has in-flight requests: phase 1 does not persist a separate request-start ownership reservation, and attribution follows that effective usage-entry timestamp.

Before raw usage retention cleanup, Team usage is rolled into `daily_team_usage_summary`, preserving Team, API key, provider, model, service tier, token classes, successful-request counters, and counts of distinct per-request token shapes. Missing provider or model is stored in an explicit unknown bucket and successful usage fails closed in the budget. Previously retained rows without token-shape counts cannot recover precise nonlinear prices: the report shows an aggregate estimate marked unpriced, while a successful legacy bucket makes the budget fail closed. The retention rollup is one bucket per UTC day. For an arbitrary timestamp range that cuts through an already rolled-up day, phase 1 excludes that whole boundary bucket rather than attributing usage outside the requested range; complete UTC-day reports remain exact when token-shape counts are available.

## Shared budget behavior

A Team may define:

- `maxBudgetUsd`
- `budgetDuration`: `1d`, `7d`, or `30d`

Phase 1 enforcement mode is explicitly `soft_committed_usage`. Before a request, OmniRoute sums committed successful usage in the active Team window using `estimatedListCostUsd` and rejects new traffic after the cap is reached. Usage without a matching local catalog price is reported as unpriced and makes an enabled Team budget fail closed rather than silently counting it as zero. A budget's reset cadence begins when it is first enabled; later amount, duration, or metadata edits preserve the established reset instant. Stale windows advance by whole durations with a compare-and-swap update, so a stale concurrent writer cannot move the cadence backward. After raw rows age out, only complete UTC-day rollup buckets contained inside that rolling window are counted; partial boundary days are conservatively omitted because a daily bucket cannot be split without fabricating precision.

This is not a strict no-overshoot financial ledger. Concurrent requests can pass the preflight check before either request commits usage. Strict enforcement would require an atomic, idempotent request ledger:

```text
reserve(request_id, estimated_cost)
  -> commit(request_id, actual_cost)
  -> release(request_id, unused_reservation)
```

with the invariant:

```text
committed_spend + active_reservations <= team_budget
```

Retries, fallbacks, duplicate callbacks, streaming cancellation, and final-cost adjustment must be covered before exposing such a mode.

## Dashboard

Open **Costs → Teams** at `/dashboard/costs/teams`. Management administrators can create and edit a Team, configure its optional soft budget, assign or transfer API keys, and archive a Team. Transfers show the current and destination owners before confirmation; archived Teams remain available as read-only reports. Only key names and internal identifiers are needed, not key secrets.

The selected Team is retained in the `team` URL parameter. A responsive toolbar keeps a searchable Team dropdown and status filter above the full-width cost content, without a second sidebar. Search appears inside the dropdown and only filters its options; the report changes after an explicit selection. Reports offer 7-day, 30-day, or all-time ranges over complete UTC dates. Their all-attempt catalog estimate is separate from the successful-use amount in the current rolling budget window.

The budget card shows its reset time, known spend, limit, and remaining allowance. Unknown prices or legacy summaries without exact token shapes remain conservative as described above. `GET /api/teams/{id}` also exposes `budgetStatus.hasPartialRetainedUsage` when retained daily buckets overlap a window boundary. In that case the page highlights incomplete coverage and withholds a numerical remaining allowance; it does not change the existing soft-enforcement policy or invent time-level detail from daily summaries.

For management selectors, `GET /api/teams?includeKeyOptions=true` adds an all-key metadata projection with `id`, `name`, `teamId`, and `teamName`. Assignment accepts optional `expectedTeamId` (including `null` for an unassigned key); a changed owner returns 409 before any history is changed. Existing clients that omit it retain their prior behavior.

## Management API

All Team endpoints use OmniRoute management authentication.

| Method                     | Endpoint                  | Purpose                             |
| -------------------------- | ------------------------- | ----------------------------------- |
| `GET` / `POST`             | `/api/teams`              | List or create Teams                |
| `GET` / `PATCH` / `DELETE` | `/api/teams/{id}`         | Inspect, update, or archive a Team  |
| `GET` / `PUT` / `DELETE`   | `/api/teams/{id}/members` | List, assign, or unassign API keys  |
| `GET`                      | `/api/teams/{id}/usage`   | Team summary and per-key drill-down |

`DELETE /api/teams/{id}` archives rather than physically deleting the Team. It closes active key assignments while preserving usage attribution.

## Backup and emergency recovery

SQLite backups and JSON exports with history include retained Team summaries. The database emergency critical-state salvage is best-effort configuration recovery, not a complete usage backup: it can preserve Teams and bindings without restoring retained usage. After that recovery path, restore a full backup before relying on historical reports or budget totals.

## Deliberate phase-1 limits

Phase 1 does not add Organization, User, Role, Membership, delegated Team Admin, SSO, or SCIM objects. The existing global Management Admin manages Team configuration. It also does not reuse Quota Share as a strict USD ledger: Quota Share remains suited to provider capacity and fairness, while Team financial enforcement remains explicitly soft until reservation accounting exists.
