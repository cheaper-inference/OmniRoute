---
title: "Cached input token reporting"
description: "Report cache-read input tokens and incomplete historical measurements."
---

# Cached input token reporting

The active `/dashboard/analytics` input KPI and model table show provider-reported cache-read
input tokens beneath total input tokens. The analytics response exposes `cachedInputTokens` and
`cachedInputTokensComplete` on its summary and model rows. The legacy usage-statistics component
also retains its overview/model/account display for existing integrations. These tokens are
already part of input usage: do not add the cached value to the input total. Cache writes and
OmniRoute response-cache hits are separate measurements.

The `/api/usage/history` statistics response exposes `totalCachedInputTokens` and
`totalCachedInputTokensComplete`, and each
provider/model/account/API-key/minute bucket has `cachedInputTokens` and
`cachedInputTokensComplete`. Recorded per-request usage is reused; no extra provider request or
cache configuration change is made. Billing and the existing input/output fields remain unchanged.

New daily archives preserve cache-read totals. Archives created before this change have no retained
cache-read count: the count is `null` when entirely unknown, or a known subtotal with a false
completeness flag when mixed with measured data. The panel displays missing data instead of zero;
`+` marks a known subtotal whose historical coverage is incomplete. Historical data cannot be
reconstructed from the ordinary input total. Daily archives retain provider/model identity only,
not account or API-key identity. Those breakdowns therefore show only retained per-request data
and are marked incomplete whenever the selected history includes archives. On the active analytics
page, API-key-filtered cache measurements similarly remain incomplete when relevant archives lack
key identity; those tokens are never assigned to a guessed key. Pricing queries keep their previous
cache-cost columns; the nullable reporting column does not change historical billing fallback.

Migration `213_daily_cached_input.sql` adds the nullable archive count. Startup reconciles the
previously published `206_daily_cached_input` ledger entry to 213 without replaying the archive
change, allowing the upstream migration occupying 206 to run. Existing measurements and unknown
historical counts are retained; an unrelated migration occupying the target slot fails closed.
This standalone contribution does not reserve migration numbers across other unmerged PRs.

The existing ingestion convention records zero when raw cache-read metadata is absent; this change
does not turn that into a new provider-capability guarantee. Availability depends on the provider's
actual usage metadata.
