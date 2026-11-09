# Availability overview and router parity

The overview reads GET `/api/usage/availability` and the cooldown summary. Both
are management routes protected by the central proxy authentication pipeline.
The availability endpoint reads memory, persisted quota snapshots and the
ProviderLimits cache; it does not fetch provider usage, refresh tokens, test
connections, write snapshots, or change routing policy.

## Quota decisions

`src/lib/usage/availability.ts:evaluateCachedQuotaAvailability` calls the routing
limit-policy, exhaustion and cutoff functions. Snapshot hydration and expired
reset advancement run in a private, cloned cache view, leaving routing's cache
and recent-success state unchanged. Allowance reasons, blocking windows, scopes
and observation times come from this server decision, not browser thresholds.
Runtime cooldown, terminal and paused states still take precedence.

The browser polls both summaries every 30 seconds while visible and on returning
to visibility. Failed reads retain the previous successful quota verdict for up
to 90 seconds. Missing or expired verdicts are unknown, never inferred from a
quota meter. Cached quota percentages remain display-only.

## Known limitations

Preflight verdicts are not cached: `quotaPreflight.ts:preflightQuota` fetches a
QuotaInfo, evaluates it and returns the result to the current request. Individual
fetchers may cache their live inputs, but there is no shared persisted verdict.
The overview reconstructs generic QuotaInfo with `convertUsageToQuotaInfo` and
Codex QuotaInfo with the same parser as its live fetcher. Other dedicated fetchers
cannot be reconstructed exactly from ProviderLimits rows. When preflight is
enabled, those decisions carry `cutoffEvaluated: false` and the tooltip explains
that live thresholds are checked when routing a request. No cutoff outcome is
guessed; ordinary cached exhaustion and local limit-policy checks still apply.
No warning is needed when the routing preflight gate is disabled.

The following provider IDs are derived from the startup `registerQuotaFetcher`
registry (dedicated fetchers other than Codex):

- `agentrouter`
- `bailian-coding-plan`
- `context7`
- `crof`
- `deepseek`
- `firecrawl`
- `freemodel-dev`
- `grok-cli`
- `grok-web`
- `jina`
- `jina-ai`
- `jina-reader`
- `jina-search`
- `kimi`
- `llmgateway`
- `lyceum`
- `moonshot`
- `opencode-go`
- `opencode-zen`
- `openrouter`
- `qwen-cloud-token-plan`
- `tavily`
- `tavily-search`
- `v0-vercel`
- `xai-oauth`
- `xao`

Custom Moonshot node IDs/prefixes registered at startup inherit this limitation.
The registry-driven cutoff contract tests enumerate the IDs without contacting
providers. Dynamically resolved compatible-provider aggregator fetchers also
require live input; they must not be inferred from unrelated usage rows.

Codex code_review meters remain display-only for request eligibility: the routing
selector distinguishes Spark from non-Spark, and the dedicated Codex parser
omits code_review. Review-only refusal would require a routing contract that
these selectors do not currently provide.

Module initialization can attempt the same public Copilot/Codex version metadata
probes as the existing provider-limits route. Synthetic tests intercept every
fetch URL and reject all real networking, permitting only those metadata URLs
in their recorded call list. These probes carry no account credentials.
Cold module loading also reaches the existing reasoning-cache boot cleanup,
which only deletes expired reasoning rows. The synthetic test mocks this write,
allows at most one cold-import call, and requires zero calls during both GETs.
Warm reads do not refresh providers, write DB rows or mutate routing's cache.

Alternative-budget meters use the server's display-only window thresholds to
select the usable budget. Allowance reasons can remove bypassed plan meters from
the waterline while retaining independent Spark meters. None of these display
calculations decide eligibility or capsule color.

The presentation uses the Keak CI UI Kit Button adapter for stat tiles, layout
choices, drag handles, legend toggles and order reset. Capsules alone remain
native buttons to preserve their exact geometry and fill without the kit's
padding/min-height. Available accounts use the semantic success token; five-hour
cooldowns and partial caps use warning; weekly cooldowns and needs-action use
error. Paused and unknown accounts retain the muted token in both themes.

## Provider order

`useProviderOrder` uses one module-level store and `useSyncExternalStore`.
Successful storage operations persist order; inaccessible storage or failed writes
retain the shared session order across Full, overview and later mounts. A failed
write cannot reread old storage over the new order. Storage events synchronize
cross-tab changes. Reset updates every subscriber even without storage.
