---
title: "Cost & Spend Tracking"
version: 3.8.54
lastUpdated: 2026-11-09
---

# Cost & Spend Tracking

How OmniRoute estimates, records, and reports the cost of every request — and why the
dashboard number is a **savings tracker**, not a bill.

See also: [User Guide](./USER_GUIDE.md) · [Features Gallery](./FEATURES.md)

---

## What it is (and what it is not)

OmniRoute attributes a per-request USD cost to every completion by multiplying token
counts by a model's pricing rates. These numbers power the **Costs** dashboard, the
`omniroute cost` / `omniroute usage` CLI, CSV/JSON exports, and per-API-key budgets.

> **The dashboard "cost" is a savings tracker, not a bill.** OmniRoute never charges you
> — it routes your requests to providers you have already connected (your own
> subscriptions, free tiers, and API keys). A "$290 total cost" accrued entirely on free
> models means roughly **$290 you did _not_ pay** a paid API. The figure is an _estimate_
> of what the same traffic would have cost at standard list prices, so you can see where
> your usage is concentrated and how much routing to cheaper/free providers is saving you.

This framing is stated directly in the project [README](../../README.md) ("the dashboard
'cost' is a savings tracker, not a bill").

Because the number is an estimate:

- It depends on the pricing table OmniRoute has for each model. A model with no pricing
  entry contributes `0` cost (it shows as a "Legacy / Free" row in the explorer).
- Free-tier and subscription traffic still accrues an _estimated_ cost — that is the
  amount you are saving, not an amount owed.

---

## How costs are estimated

### The pricing source

Costs come from the merged pricing table in
[`src/lib/db/settings/pricing.ts`](../../src/lib/db/settings/pricing.ts),
in this order of precedence (**highest first**):

1. **User overrides** — prices set in the dashboard or via `PATCH /api/pricing`
   (the `pricing` namespace).
2. **models.dev sync** — pricing fetched from `https://models.dev/api.json`
   (the `models_dev_pricing` namespace).
3. **LiteLLM sync** — prices fetched from LiteLLM's public
   `model_prices_and_context_window.json` (the `pricing_synced` namespace).
4. **Hardcoded defaults** — rates shipped in
   [`src/shared/constants/pricing/`](../../src/shared/constants/pricing/).

For the same provider/model, values from higher-priority layers overwrite
matching fields in lower layers; fields absent from an upper layer can still
come from a lower layer. The order is fixed even when both independent sync
jobs run at the same time. `GET /api/pricing?includeSources=1` returns
`pricing` and `sourceMap`, whose per-model labels (`user`, `modelsDev`,
`litellm`, `default`) identify the highest-priority layer containing that model.

**LiteLLM sync** is opt-in, disabled by default. Its environment variables
(see [`.env.example`](../../.env.example)) are:

| Env var                 | Default   | Purpose                                                                     |
| ----------------------- | --------- | --------------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`   | Enable background LiteLLM pricing sync.                                     |
| `PRICING_SYNC_INTERVAL` | `86400`   | Sync interval in seconds (daily).                                           |
| `PRICING_SYNC_SOURCES`  | `litellm` | Source selection for this sync only; currently only `litellm` is supported. |

**models.dev sync** is separate from the LiteLLM sync and is also disabled
by default. Enable it in Settings (models.dev sync) or use these variables:

| Env var                    | Default   | Purpose                                                                                                                     |
| -------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `MODELS_DEV_SYNC_ENABLED`  | _(unset)_ | Unset follows the Settings toggle; `1/true/on/yes` forces on and `0/false/off/no` forces off (even if Settings enables it). |
| `MODELS_DEV_SYNC_INTERVAL` | `86400`   | Default models.dev sync interval in seconds (daily).                                                                        |

`PRICING_SYNC_SOURCES` does **not** enable models.dev; it controls only
the LiteLLM sync. Deleting a user override does not clear either synced namespace; the next
available pricing layer becomes effective. For an unpriced model, check both
sync settings and the `sourceMap` before adding a manual override.

### The cost formula

Cost is computed per request from token counts and per-million-token rates in
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
(`computeCostFromPricing` / `calculateCost`):

- **Input tokens** (minus cache reads and cache-creation tokens) × `input` rate.
- **Cache-read tokens** × `cached` rate (falls back to the input rate).
- **Cache-creation tokens** × `cache_creation` rate (falls back to the input rate).
- **Output tokens** × `output` rate.
- **Reasoning tokens** × `reasoning` rate (falls back to the output rate).

All rates are interpreted as USD per 1,000,000 tokens. A Codex "fast"/"priority" or
"flex" service tier applies a cost multiplier (`getCodexFastCostMultiplier`) — e.g. flex
is billed at a 50% token discount, surfaced as **flex savings** in the dashboard.

Model names are normalized first (provider-path prefixes such as `openai/` or
`accounts/fireworks/models/` are stripped) so historical rows still match a price.

### How spend is recorded

- The per-request cost is computed at request completion. Shared-quota consumption
  is scheduled on the next
  event-loop tick via [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- API-key spend is buffered and flushed in batches by the
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (default 60s flush interval,
  1,000-entry buffer). Tunable via:

  | Env var                             | Default | Purpose                            |
  | ----------------------------------- | ------- | ---------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000` | Flush interval in milliseconds.    |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`  | Max buffered entries before flush. |

Costs prefer an exact provider-reported charge (`provider_cost_usd`), then a
catalogue-priced request snapshot (`calculated_cost_usd`), then token repricing
from the current catalogue. Stored costs are not charged again through their
token counts. Legacy token-only rows still change when their catalogue price changes.

### OCR and embeddings

- Successful `/v1/ocr` requests use upstream `usage_info.pages_processed`, not
  the requested page range or the number of returned page objects. The estimate
  is pages × `ocr_cost_per_page` (absolute USD/page, **not** USD/million).
- Requests with document or bounding-box annotations require a separate
  `ocr_cost_per_annotated_page` tariff. Without it, the cost remains unknown;
  the ordinary OCR tariff is not silently substituted.
- LiteLLM sync maps its upstream `annotation_cost_per_page` field into
  `ocr_cost_per_annotated_page`, retaining the absolute USD/page value and
  annotation-only entries, including explicit zero. A supplied canonical field
  takes precedence; invalid alias values are ignored. User pricing overrides
  retain their normal priority. See [LiteLLM's OCR pricing keys](https://docs.litellm.ai/docs/providers/mistral_batches#batch-ocr-cost-tracking).
- OCR usage stores the page count, unit price, calculated USD cost, API key
  and selected connection. Pages are never represented as tokens. Call logs
  contain billing metadata, not document URLs, PDF bytes or extracted text.
- Successful `/v1/embeddings` requests record one usage row per physical batch,
  including separate batches completed in the same millisecond. Provider-reported
  charges take precedence over token estimates; combo wrappers do not add a charge.
- Usage history, the Costs analytics, provider/account windows, API-key spending
  limits, the request-cost ledger and daily usage rollups include these charges.
  No-log keys retain numerical accounting without retaining source text.
- Missing usage or tariffs are **unknown**, not free: the response-cost header is
  omitted, and the existing unpriced-usage policy applies to limited API keys.
  Explicitly configured zero rates remain valid zero-cost usage.

This is forward-only accounting. Old OCR/embedding calls that never wrote usage
history cannot be reconstructed from this migration. Catalogue estimates are USD
estimates, not an invoice, and do not include currency conversion, tax or discounts.

### Speech and images

- Successful `/v1/audio/transcriptions`, `/v1/audio/speech` and image-generation
  attempts share numerical accounting. Direct and combo calls carry the caller's
  API key and the selected connection; a combo wrapper never adds a second debit.
- Provider-reported USD wins over a catalogue estimate, including an explicit
  zero charge. OpenRouter's JSON `usage.cost` is normalized to `cost_usd`.
  Otherwise, measured tokens use token prices, transcription seconds use
  per-second prices, speech input uses Unicode character counts, and flat-price
  images use the number actually returned, not the requested `n`.
- Binary OpenRouter TTS has no JSON usage body. After the audio completes or the
  caller cancels, OmniRoute queries its generation ID on the **same** configured
  OpenRouter origin. An EU request never falls back to the global origin. This is
  a bounded, read-only lookup; synthesis is not retried for accounting.
  Billing records can appear after the audio has finished: lookup retries run
  in the background for up to about 52 seconds, including network deadlines.
- During that lookup, the audio response has `X-OmniRoute-Cost-Status: pending`
  and no response-cost header. Its final charge appears in usage history,
  analytics and the key ledger after reconciliation. If metadata is unavailable,
  a configured tariff snapshot is used; otherwise the cost stays unknown.
- Seconds, characters and image counts have separate billing-unit fields, never
  fake token counts. Accounting retains only numerical usage, not speech text,
  transcripts or image bytes. Existing unpriced-image exemptions are unchanged:
  a genuinely missing image tariff does not newly lock a limited key, and the
  response omits the cost header rather than declaring the call free. A pricing
  store failure still retains usage evidence for fail-closed enforcement.

No historical speech/image charge is invented or backfilled. Provider billing
remains the reference for invoices and for calls whose charge was not reported.

---

## Cortecs reranking costs

For dynamic reranker nodes targeting `https://api.cortecs.ai/v1/rerank`,
OmniRoute sends `x-cortecs-cost-unit: USD` and records the returned `usage.cost`
directly as USD for each successful physical request. This also applies to
the existing `/rerank` fallback. Cortecs performs the currency conversion;
see its [USD cost-header documentation](https://docs.cortecs.ai/integration-examples/tooling/litellm.md).
There is no extra account/management key, manually maintained exchange rate,
token-tariff estimate or second conversion. Fractional and whole-dollar USD
amounts are both accepted, including explicit zero. USD amounts are not stored
as native credits or used to invent a credit quantity.

The numerical USD cost is snapshotted in `provider_cost_usd` for reporting and
key budgets. Later token-catalogue edits do not reprice already-valued requests.

Missing or invalid reported USD costs remain **unknown**, never guessed: the
response omits its numeric cost header, sets `X-OmniRoute-Cost-Status: unknown`,
and existing unpriced-budget safeguards apply to limited keys. An explicit zero
remains a known zero cost.
Unknown credit spending is not estimated from token tariffs.

Each new rerank usage row records `billing_unit=request` and
`billing_quantity=1`. Missing USD charges use the existing
`unpricedUnitRequests` reporting and budget path, not a separate rerank
counter. Older rerank rows without unit metadata retain the same unknown-cost
protection through their recorded endpoint; no historical rows are rewritten.
Cloud initialization reconciles the endpoint and billing columns as well,
without relying on filesystem migrations.

The usage vendor is canonical `cortecs`, independent of the node alias.
The selected custom connection, model and caller key remain attributed.
The response body retains the provider's reported USD `usage.cost` unchanged.
No-log keys keep numerical accounting without document payloads.
Other rerank providers retain their existing behavior. This is forward-only
accounting, not a historical backfill or an invoice reconciliation.

The name `cortecs` alone does not disable a custom chat/embedding node's
configured token prices. Rerank accounting is distinguished by the recorded
endpoint or explicit normalized credit provenance. Missing rerank costs remain
unpriced in durable quotas, reports and rollups even if a token tariff exists;
those tokens remain visible but are not billed. Archived Cortecs snapshots,
including zero/unknown values, are not retrospectively token-repriced.

## Dashboard: the Costs page

The **Costs** page lives at `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Its main view is the **Cost Overview** tab
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
which loads everything from `GET /api/usage/analytics`.

What it shows:

- **Spend tiles** — estimated spend for _Today (1d)_, _7d_, _30d_, and the selected
  window. Range selector: `7d`, `30d`, `90d`, `all`.
- **Headline metrics** — requests in window, active providers, active models, average
  cost per request.
- **Cost Explorer** — a sortable/filterable table grouped by **provider**, **model**,
  **API key**, **account**, or **service tier**, with cost, requests, tokens, avg
  cost/request, and share-of-total %.
- **Token usage** — total / input / output tokens and input:output ratio.
- **Routing efficiency** — fallback count, fallback rate, and requested-model coverage.
- **Monthly forecast** — projects month-end spend from the recent daily average.
- **Period comparison** — % change between the first and second half of the window.
- **Charts** — daily cost trend, provider share (pie), top providers, top models, cost
  by API key, cost by account, weekly usage pattern, and an activity heatmap.
- **Export** — download the current window as **CSV** or **JSON** (the buttons appear
  once there is non-zero cost data).

When there is no priced traffic, rows render as a "Legacy / Free" label instead of `$0`,
reflecting the savings-tracker model.

### Related Costs sub-pages

The Costs area also hosts (all under `/dashboard/costs/`):

- **Pricing** (`/dashboard/costs/pricing`) — view and override per-model prices (renders
  the shared Pricing tab).
- **Budget** (`/dashboard/costs/budget`) — set per-scope spend limits (renders the shared
  Budget tab).
- **Quota Share** (`/dashboard/costs/quota-share`) — shared-quota pools and burn-rate
  views.

---

## API endpoints

All of these require management auth (loopback/JWT, via `requireManagementAuth`) unless
noted.

### Usage & cost analytics

| Method | Endpoint                 | Purpose                                                                                                                                                  |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/analytics`   | Full cost/usage analytics: summary, daily trend, by provider/model/API key/account/tier. Query: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Per-provider quota utilization over time. Query: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                            |
| `GET`  | `/api/usage/history`     | Raw usage history rows.                                                                                                                                  |
| `GET`  | `/api/usage/call-logs`   | Per-request call logs (model, tokens, cost, latency, status).                                                                                            |
| `GET`  | `/api/usage/quota`       | Provider quota status.                                                                                                                                   |
| `GET`  | `/api/usage/proxy-logs`  | Proxy request logs.                                                                                                                                      |

### Budgets

| Method | Endpoint                 | Purpose                                                                        |
| ------ | ------------------------ | ------------------------------------------------------------------------------ |
| `GET`  | `/api/usage/budget`      | Cost summary + budget check for one API key (`apiKeyId` query param required). |
| `POST` | `/api/usage/budget`      | Set daily/weekly/monthly USD limits + warning threshold for an API key.        |
| `GET`  | `/api/usage/budget/bulk` | Bulk budget summaries across API keys.                                         |

> The budget API is scoped per **API key** (`apiKeyId`). Limits returned by
> `GET /api/usage/budget` include `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> a `warningThreshold`, and the running totals (`totalCostToday`, `totalCostMonth`, …).

### Pricing

| Method   | Endpoint                | Purpose                                                                                                                        |
| -------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/pricing`          | Merged four-layer pricing (user, models.dev, LiteLLM, defaults). `?includeSources=1` returns `pricing` + `sourceMap`.          |
| `PATCH`  | `/api/pricing`          | Override pricing for `{ provider: { model: { input, output, cached, … } } }`.                                                  |
| `DELETE` | `/api/pricing`          | Remove user price overrides (optionally scoped by `?provider=&model=`); synced rates or built-in defaults remain as fallbacks. |
| `GET`    | `/api/pricing/defaults` | Show default per-1M fallback rates.                                                                                            |
| `GET`    | `/api/pricing/models`   | Pricing keyed by model.                                                                                                        |
| `POST`   | `/api/pricing/sync`     | Trigger a manual sync from external sources (LiteLLM).                                                                         |
| `GET`    | `/api/pricing/sync`     | Current sync status.                                                                                                           |
| `DELETE` | `/api/pricing/sync`     | Clear LiteLLM-synced pricing only (`pricing_synced`); models.dev data is separate.                                             |

### Other cost-relevant endpoints

| Method | Endpoint                      | Purpose                                                                 |
| ------ | ----------------------------- | ----------------------------------------------------------------------- |
| `GET`  | `/api/free-tier/summary`      | Free-model token totals, used-this-month, and remaining free allowance. |
| `GET`  | `/api/quota/pools/[id]/usage` | Usage for a shared-quota pool.                                          |

---

## CLI

OmniRoute's CLI exposes cost, usage, and pricing commands (registered in
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

A cost report aggregated from `/api/usage/analytics`.

```bash
omniroute cost                          # last 30d, grouped by provider
omniroute cost --period 7d              # last 7 days
omniroute cost --group-by model         # group by provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Columns: group, requests, tokens in/out, cost (USD), and % of total. A grand total line
is printed at the end (suppressed with `--quiet` or `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # per-provider cost summary
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Budgets
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` reads `GET /api/pricing/defaults`. To edit individual model
> prices instead, use the **Pricing** dashboard page or `PATCH /api/pricing`.

---

## Troubleshooting

- **All costs show $0 / "Legacy / Free".** The models in use have no pricing entry.
  Enable external sync (`PRICING_SYNC_ENABLED=true`) and run `omniroute pricing sync`, or
  set prices manually via the Pricing page / `PATCH /api/pricing`.
- **A historical model is mispriced.** Fix the price (override or re-sync) — cost is
  recomputed from token counts on every analytics read, so estimates update retroactively.
- **Spend lags behind real time.** Per-key spend is batched; lower
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` if you need fresher numbers.

---

For where this fits in the broader dashboard, see the [User Guide](./USER_GUIDE.md) and
the [Features Gallery](./FEATURES.md).
