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

- `accountedCostUsd`: known amount used for enforcement. Each request uses its recorded provider USD charge first (including explicit zero), otherwise its stored calculated USD snapshot, otherwise a current catalog estimate. These are alternatives, never added together for one request.
- `estimatedListCostUsd`: token usage evaluated against the current catalog, separately from recorded costs. Missing catalog prices set `hasUnpricedListUsage`; they do not invalidate a recorded charge.
- `actualProviderCostUsd`: sum of recorded provider USD charges, including explicit zero; `null` when none were recorded. May cover only part of the usage and is not a complete invoice. Stored estimates are never labelled actual.
- `subscriptionQuotaUsed`: provider subscription quota units, when available. Phase 1 returns `null`.
- `compressionSavingsUsd`: estimated savings caused by compression. Phase 1 returns `null` in Team reports; existing compression analytics remain authoritative.

For subscription-backed providers, `estimatedListCostUsd` is useful for allocation and comparison but is not necessarily an invoiceable provider cost.

Reports cover all recorded attempts, including failed attempts, and show their request and token totals. A missing charge with no usable price on a failed attempt sets the report's `hasUnpricedUsage`. Budgets count successful requests only: a failed-only unknown charge does not block the next request. Recorded charges and calculated snapshots are not repriced when the catalog changes; only the fallback and separate list estimate use current catalog prices.

## Immutable attribution

When the terminal usage row is written, OmniRoute resolves the API key's billing Team at the effective `UsageEntry.timestamp` and stores the resulting Team ID on the row. The timestamp defaults to the current wall clock only when the caller omits it; callers may supply it, so it is not an independent persistence-time clock. Reassigning a key never rewrites rows that are already stored. Operators should avoid transferring a key while it has in-flight requests: phase 1 does not persist a separate request-start ownership reservation, and attribution follows that effective usage-entry timestamp.

Before raw usage retention cleanup, Team usage is rolled into `daily_team_usage_summary`, preserving Team, API key, provider, model, service tier, token classes, successful-request counters, and counts of distinct per-request billing shapes. New shapes retain provider/calculated USD amounts and billing units alongside tokens; legacy five-field token shapes still work. Older buckets without complete shape counts remain explicitly unpriced, while later recorded costs in the same bucket remain usable without fabricating historical amounts. JSON history export/import preserves these shapes without a schema migration. A non-token billing unit without a recorded amount is unknown, not a free zero-token request. Daily rollups still exclude partial boundary days rather than attributing usage outside the requested range.

## Shared budget behavior

A Team may define:

- `maxBudgetUsd`
- `budgetDuration`: `1d`, `7d`, or `30d`

Phase 1 enforcement mode is explicitly `soft_committed_usage`. Before a request, OmniRoute sums committed successful usage using `accountedCostUsd` and rejects new traffic after the known amount reaches the cap. Budget edits preserve the established reset cadence; stale windows advance by whole durations with a compare-and-swap update. After retention, only complete UTC-day buckets inside the window count; partial boundary days are conservatively omitted.

### Missing pricing: explicit availability policy

Teams use the existing installation-wide `UNPRICED_USAGE_BUDGET_POLICY` resolver, shared with per-key limits:

- `fail_closed` (unchanged default): unknown successful-use costs block new requests.
- `count_as_zero` (explicit opt-in): continue inference when only prices are missing. Unknown requests contribute no known amount but keep `hasUnpricedUsage=true` and `unpricedModels` visible; they are **not known-free usage**. `unpricedUsagePolicy` exposes the effective policy, and the dashboard warns that the total is incomplete.

Management overrides precede environment values. The legacy `USAGE_LIMIT_IGNORE_UNPRICED=true` alias applies only without an explicit policy. Invalid explicit policies fail closed. This is not a new per-Team setting; enabling it also affects per-key limits.

The opt-in policy can exceed the nominal cap because the unknown portion cannot be measured. Known cap exhaustion and fallback pricing failures still block. Usage-store failures are not converted into zero spend.

Status distinguishes `blockReason=cap_exceeded`, `unpriced_usage`, and `pricing_unavailable`; a permitted request has `blockReason=null` even with unknown usage. The existing HTTP 400 rejection supports both OpenAI and Anthropic envelopes. OpenAI errors additionally carry `team_budget_exceeded`, `team_usage_unpriced`, or `team_pricing_unavailable` codes. Missing-price errors name affected models and an administrator action instead of claiming a cap overage or recommending waiting for a reset.

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
