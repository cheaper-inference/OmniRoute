---
title: "Radar Free-Model Catalog"
version: 3.8.51
lastUpdated: 2026-09-01
---

# Radar Free-Model Catalog

> **Source of truth:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Hosted-service evidence boundary:** server-side rules described here were verified on
> 2026-09-01 against the intentionally private Radar server at exact revision
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. That implementation is not distributed in
> this OSS repository; hosted availability remains a separate operational state.

Radar is an **optional add-on** that overlays a signed, freshly-curated free-model
catalog on top of the release baseline (`FREE_MODEL_BUDGETS` in
`open-sse/config/freeModelCatalog.data.ts`). It exists because the free-tier landscape moves
faster than release cadence — providers add, shrink, or discontinue free quotas between
releases, and the baseline catalog can only be refreshed when a new version ships.

**Nothing that is free today stops being free because of the remote feed.** Radar never
paywalls a baseline entry; it only refreshes limits/status fields at read time and can
layer in newly-discovered free models between releases. An operator can still hide a
model locally, and can restore it from the same dashboard. The baseline catalog itself
is never mutated on disk — see
[Read-time overlay merge rules](#read-time-overlay-merge-rules) below.

---

## Delivery status

| Area           | Client behavior                                                                                                                                     |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Signed catalog | `RADAR_ENABLED` exposes Radar. Opt-in starts server-side downloads with Ed25519 verification, local caching, and read-time model overrides.         |
| Referral links | A separately signed feed supplies fixed links and campaigns on its own refresh schedule.                                                            |
| Offers         | A separate signed feed supplies the local offers page. The client validates the benefit schema, filters expired entries, and labels partner offers. |
| Intel          | A separate signed feed supplies rankings, catalog freshness, and catalog movement. The Radar page links to Intel when a cache is available.         |
| CLI            | The `omniroute radar status` and `omniroute radar sync` commands use the local API.                                                                 |

---

## Public announcement reader

The generic announcement reader is separate from the Radar feature flag. The dashboard Home and
Changelog viewer fetch the repository's public `news.json` through a plain `GET` to
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). They send no Radar setting, prompt, provider
configuration, usage record, or local dismissal state.

`news.json` uses the closed v2 schema implemented by `parseNewsPayload()`:

- `schemaVersion: 2` and a bounded `items[]` collection;
- stable, unique announcement `id` values;
- explicit `active` and ISO `publishedAt` fields;
- required English copy with optional localized copy;
- optional credential-free HTTPS links and an allowlisted icon;
- newest-active-first selection, locale fallback to English, and per-ID local dismissal.

The parser temporarily accepts the former singular `{ active, title, message, ... }` shape so
older forks can migrate without a broken Changelog view. Invalid feeds are inert. The Radar launch
entry ships with `active: false`; changing it to `true` is a separate post-merge, post-deploy
release action and does not change `RADAR_ENABLED` or the independent feed-sync opt-in.

---

## Flag: `RADAR_ENABLED` (default off)

Radar is gated end-to-end by the `RADAR_ENABLED` feature flag
(`src/shared/constants/featureFlagDefinitions.ts`, category `policies`,
`defaultValue: "false"`).

**When the flag is off, the surface does not exist:**

- All `/api/radar/*` endpoints, including local model-state reads and writes,
  return `404` before touching any Radar module.
- The dashboard screens (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) render
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) returns the untouched baseline —
  same entry count, same values, every entry tagged `origin: "baseline"` — and never
  reads the feed cache.
- No Radar network call is ever made; each sync module returns `{ status: "disabled" }`
  before touching `fetch`.

This is a strict superset gate: flipping the flag on unlocks the _screens_, nothing
more. It does not upload data, does not start a background sync, and does not change
routing or model selection — see the separate opt-in below.

---

## Data sync is a SEPARATE opt-in — the privacy promise

Turning `RADAR_ENABLED` on only unlocks the UI. Syncing the feed requires a second,
independent opt-in stored in `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migration `136_radar_cache_settings.sql`). `syncRadar()` checks the flag _and_ the
opt-in before making any network call:

```
Flag off      → { status: "disabled" }   — no network call
Opt-in false  → { status: "opt_out" }    — no network call
```

When the flag and opt-in are on, server-side sync downloads the published Radar feeds
over HTTPS. The catalog request uses `x-omniroute-radar-schema: 2`. Self-hosters can
publish a separately signed v1 artifact for clients that omit the schema header.

Sync sends an ordinary GET request. The HTTPS service sees the source IP. OmniRoute
sends no authorization credential, account identifier, prompts, responses,
conversations, provider credentials, model traffic, uptime, latency, or local
provider configuration. The client verifies each response before caching its
payload. See [Security model](#security-model).

The scheduler checks the catalog, offers, and Intel about once a day. Equal verified
versions renew `fetchedAt` without replacing the payload when the cache already
matches. Referrals have a six-hour freshness window and can also refresh on read.
Turning sync off clears the signed feed caches and preserves local model overrides.

---

## Access and safety rules shown before opt-in

The inactive dashboard renders `RadarAccessExplainer` before the opt-in button.
The catalog, referrals, offers, and Intel are free to every installation when
published. Offers expire on the date carried in the feed. The explainer identifies
the signed downloads, ordinary HTTPS connection metadata, and local data that
OmniRoute keeps private.

---

## End-to-end activation and guided setup

1. Enable `RADAR_ENABLED` on the local OmniRoute installation.
2. Open `/dashboard/radar` and select **Keep the catalog updated**. The browser
   saves consent with `POST /api/radar/settings` and `{ optIn: true }`.
3. Let the page sync the catalog or select **Sync now**, then confirm the displayed
   version and fetch time. An authenticated `GET /api/radar/status` shows opt-in
   and the cache state for each feed. `POST /api/radar/sync-all` can refresh all feeds.
4. Open `/dashboard/radar/setup?provider=<provider>` and follow the provider's
   setup guide. Save your connection through the Providers dashboard, return to
   Radar, and select **Test connection**.
5. Open `/dashboard/radar/combos` once compatible provider connections are active.
   Review the suggested family and create a combo.
6. Reload Radar and the setup page to confirm opt-in, the cached catalog, and the
   provider connection persist.

## Private admin-panel link

`RADAR_ADMIN_URL` optionally adds **Radar Admin ↗** immediately after the user-facing
Radar item in the Costs sidebar section. It has deliberately no default: when the variable is
unset or invalid, the static sidebar, command palette, and sidebar-customization screen contain no
admin item and no private URL.

The value is resolved server-side and relayed through the management-authenticated
`GET /api/settings` response only to an authenticated dashboard session, or to the trusted
loopback owner during a local no-login bootstrap. CLI, internal-service, and manage-scope API-key
authentication do not receive it. The browser validates the response again before materializing
the external link, which opens with `noopener noreferrer`.

Use a credential-free HTTPS tunnel/tailnet URL. Plain HTTP is accepted only for a loopback SSH
forward such as `http://127.0.0.1:9351`; other schemes, embedded credentials, malformed URLs, and
remote HTTP destinations fail closed and leave navigation inert.

---

## Security model

### Ed25519 signature over exact bytes

The feed payload is signed with Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) verifies the signature over the **exact response bytes**
received over the wire — the payload is never re-serialized before verification, so a
byte-for-byte re-encoding cannot silently invalidate or bypass the signature check.
Verification failure (`invalid_signature`) aborts the sync before the payload is ever
parsed or cached.

### Pinned public key + rotation

The verifying public key is pinned in `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), an array so a new key can be prepended ahead of a
rotation while old cached feeds signed with a previous key remain valid until
re-synced.

### Fork-friendly env overrides

Two env vars let forks and self-hosters point the client at their own feed instead of
the default OmniRoute service — see
[How to self-host a feed](#how-to-self-host-a-feed) below:

| Var                 | Purpose                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `RADAR_FEED_URL`    | Overrides the feed base URL (default `https://radar.omniroute.online`).                                      |
| `RADAR_FEED_PUBKEY` | Overrides the pinned public key (base64-DER SPKI or PEM), replacing the built-in array with this single key. |

### Version floor

`syncRadar()` rejects a downloaded feed whose `version` is not strictly newer than the
currently cached version (`compareVersions()`, dotted `YYYY.MM.DD.n` comparison) —
`{ status: "stale" }`. This prevents a compromised or misconfigured feed endpoint from
rolling a client back to an older, differently-signed payload.

### Two dates, and why both are kept

A cached feed carries two distinct dates, and confusing them is the whole point of
keeping both:

| Field         | Comes from           | Answers                                    |
| ------------- | -------------------- | ------------------------------------------ |
| `generatedAt` | the signed feed body | how old the **data** is                    |
| `fetchedAt`   | this install's clock | when this install last confirmed the cache |

A feed fetched minutes ago can carry weeks-old figures, so `fetchedAt` alone cannot
tell an operator whether the overlay is fresher than the baseline it sits on. Both are
persisted in `radar_feed_cache`, returned by `getRadarCatalog().meta`, and reported
separately by `GET /api/radar/status`. A row cached before the `generated_at` column
existed (migration 163) reads back as `null` — unknown stays unknown rather than
borrowing the fetch time. `radar_referrals_cache` has kept its own `generated_at` since
migration 142.

The version floor above compares `version`, not either date.

The dashboard shows `Last fetched`. The offers and Intel caches store only
`fetchedAt`, so their entries in `GET /api/radar/status` omit `generatedAt`.

### Schema validation

The downloaded bytes are parsed and validated against `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, a Zod schema) **after** signature verification. A
schema mismatch returns `{ status: "invalid_schema" }` and the cache is left
untouched. The cached payload is defensively re-validated again on every read
(`getRadarCatalog()`) — a corrupted or hand-edited cache row falls back to the
baseline rather than being served.

### Response size cap (10 MB)

`syncRadar()` enforces a **10 MB hard cap** on the feed response body — the signed
feed is a KB-scale JSON document, so anything past this points at a misconfigured or
hostile `RADAR_FEED_URL` (or an upstream serving garbage), not a legitimate catalog.
Enforcement is two-layered:

1. A `Content-Length` preflight check skips reading the body entirely when the
   header already declares a value over the cap.
2. A running-total check while reading the body enforces the cap even when
   `Content-Length` is absent or understates the real size — the header is never
   trusted on its own. Concatenating the accumulated chunks preserves the exact
   bytes needed for the Ed25519 signature check afterward.

Exceeding the cap returns `{ status: "too_large" }` and leaves the cache untouched,
following the same non-destructive pattern as every other sync failure
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Tiers: `community` and `live`

The feed schema carries a `tier: "community" | "live"` field, decided **server-side**
by the feed service based on the request (presence and validity of the supporter key)
— the client never decides its own tier.

- **`community`** — the free catalog delayed by roughly 30 days behind the freshest
  data. This is what an unauthenticated or invalid-key request receives.
- **`live`** — the freshest catalog, served to requests carrying a valid supporter
  key.

**An invalid or expired supporter key degrades to `community` — it is never an
error.** The sync path only distinguishes signature/schema/version failures (all
recoverable, all non-fatal to the cached state) from a successful `{ status:
"updated", version, tier }`. There is no tier-specific error path a client needs to
handle.

### The served tier comes from a response header, not the signed body

The signed feed **body**'s `tier` field is always `"live"` — the feed service ships
**two signed artifacts per version**: live includes current campaigns and community
omits them. Each artifact is signed over its own exact bytes. The body still does not
serve as the entitlement decision; the tier actually selected for a request is carried
in the **`x-omniroute-feed-tier` response header**, decided server-side from the request's
`Authorization` key.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) is the single place
that resolves the tier a client should trust:

1. Parse `x-omniroute-feed-tier` with `RadarTierSchema` (Zod) — an absent header, or
   a value that isn't exactly `"community"` or `"live"`, is treated as **not
   present** (never trusted into the cache/UI as-is; this also covers older feed
   servers that predate the header).
2. Fall back to the signed body's `tier` field (always `"live"`) only when step 1
   yields nothing.
3. The resolved tier is what gets cached and returned as `{ status: "updated",
version, tier }` — this is the value the dashboard shows, never the raw body
   field.

---

## Read-time overlay merge rules

`applyFeed()` (`src/lib/radar/applyFeed.ts`) merges the cached feed **over** the
static baseline at **read time**, inside `getRadarCatalog()`. The baseline array
(`FREE_MODEL_BUDGETS`) is never mutated — a `MergedEntry[]` is computed fresh on every
call.

Four rules, in order of precedence:

1. **Feed never overwrites a local override.** Per-field: if the operator has
   customized a field on an entry (`localOverrides` map, keyed `provider:modelId`),
   the feed's value for that specific field is skipped — the operator's value wins.
2. **`enabled: false` disables the entry, with provenance.** A feed entry that turns
   an entry off sets `enabled: false` and `disabledBy: "radar"` on the merged result,
   so the UI can explain _why_ an entry went from available to disabled.
3. **A user-added entry not present in the feed survives untouched.** Entries that
   only exist in the baseline (or were added locally) and have no corresponding feed
   entry pass through unchanged.
4. **A tombstoned entry is never resurrected.** If the operator explicitly deleted an
   entry (`tombstones` set), the feed re-adding that `provider:modelId` in a later
   version does not bring it back.

The editable fields and tombstones are persisted in
`radar_local_model_state` (migration `153_radar_local_model_state.sql`). The public DB
adapter (`src/lib/db/radar.ts`) converts those rows into the `localOverrides` map and
`tombstones` set used by `applyFeed()`; production `getRadarCatalog()` loads that state
after the flag, cache, and schema gates pass. Only `displayName` and `enabled` are
operator-editable. Provider/model identity, feed provenance, quota, capabilities, ToS,
and setup data cannot be written through this surface.

The dashboard exposes four local actions:

- **Edit** changes the local display name and enabled state.
- **Reset local changes** clears both editable fields without changing a tombstone.
- **Hide** creates a tombstone, so later feed updates cannot recreate the row.
- **Restore** removes the tombstone; any separately-saved override remains in effect.

A feed `enabled: false` remains the safety exception: it wins over a stale local
`enabled: true`, keeps the merged entry disabled, and records `disabledBy: "radar"`.

Catalog publications use `schemaVersion: 2`. `contextWindow` and each of `tools`, `vision`, and
`thinking` are independently `number | null` / `boolean | null`: `null` means unknown, while
`false` means a D16-confirmed official provider source explicitly says the capability is absent.
Internal OmniRoute registry/model-spec flags are never promoted directly to feed facts. The client
still accepts v1 snapshots; because the old builder used `false` as an absence placeholder, v1 `false` is
normalized to unknown while v1 `true` remains factual. Unknown schema versions fail closed and the
last valid cache remains available. Every v2 model with a non-null context/capability must carry a
credential-free HTTPS `metadataEvidenceUrls[]`; otherwise schema validation fails and the cache is
not replaced. The catalog table renders all three states as `✓`, `✕`, and `?`.

### Guided combos and MCP access

Confirmed `familyId` values survive the read-time overlay and drive the pure
`buildRadarComboSuggestions()` module (`src/lib/radar/comboSuggestions.ts`). A family is suggested
only when at least two distinct providers have active connections and expose the exact curated model
ID. Disabled models, inactive providers, missing model IDs, singleton families, and ambiguous
alias/prefix matches fail closed. Suggestions use the existing `priority` strategy, ordering the
largest recurring monthly budget first; the UI creates them only through `POST /api/combos`.

The guided UI lives at `/dashboard/radar/combos`. It reads only the local
`GET /api/radar/catalog` and `GET /api/combos/builder/options` endpoints. It never triggers Radar sync,
reads provider credentials, or writes directly to the combo database.

MCP clients can read the same local projection with `omniroute_radar_catalog` (`read:radar`). The
optional `provider`, `familyId`, and `enabledOnly` filters are evaluated after one local
`GET /api/radar/catalog` read. Its closed output includes catalog metadata plus provider/model,
display name, `familyId`, quota, capabilities, enabled state, origin, and `disabledBy`; setup URLs,
steps, connections, e-mail addresses, keys, and referral data are never returned. This tool is
read-only and never invokes `/api/radar/sync`.
When the cached feed predates the installed catalog, `meta.olderThanRelease` is `true` and
the tool returns models from the installed catalog with local overrides and tombstones applied.

### Provenance markers

Every merged entry carries an `origin` field the UI renders as a badge:

- `"baseline"` — untouched from the static release catalog.
- `"radar"` — one or more fields were refreshed by the feed.
- `"local"` — the operator has at least one local override on this entry (local
  overrides always win over the feed per rule 1, regardless of what the feed says).

---

## Local surfaces — never a feed proxy

The local Radar route families below back the UI under `src/app/api/radar/`:

| Route                          | Method | Purpose                                                                                                               |
| ------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Returns the merged catalog (`getRadarCatalog()`) from the local cache.                                                |
| `/api/radar/sync`              | POST   | Triggers `syncRadar()` server-side; returns the resulting status.                                                     |
| `/api/radar/settings`          | GET    | Returns `{ optIn }`.                                                                                                  |
| `/api/radar/settings`          | POST   | Sets opt-in from `{ optIn: boolean }`.                                                                                |
| `/api/radar/referrals`         | GET    | Returns `{ fixed, campaigns, tier }` from the local cache — see [Referral links](#referral-links-free-credits) below. |
| `/api/radar/offers`            | GET    | Returns active offers from the verified local cache.                                                                  |
| `/api/radar/offers/sync`       | POST   | Triggers `syncRadarOffers()` server-side when opted in.                                                               |
| `/api/radar/intel`             | GET    | Returns verified local Intel and its cache metadata.                                                                  |
| `/api/radar/intel/sync`        | POST   | Triggers `syncRadarIntel()` server-side when opted in.                                                                |
| `/api/radar/status`            | GET    | Returns read-only local settings/cache status for catalog, referrals, offers, and Intel, without secrets.             |
| `/api/radar/sync-all`          | POST   | Runs all four server-side sync modules and returns a separate status for each feed.                                   |
| `/api/radar/local-model-state` | GET    | Lists persisted overrides and tombstones for edit/restore controls.                                                   |
| `/api/radar/local-model-state` | PATCH  | Sets or clears the validated `displayName`/`enabled` override fields.                                                 |
| `/api/radar/local-model-state` | PUT    | Creates or removes a tombstone with `{ provider, modelId, tombstoned }`.                                              |
| `/api/radar/local-model-state` | DELETE | Clears editable override fields while preserving any tombstone.                                                       |

**Hard rule: these routes never proxy the feed service.** The browser only ever talks
to the local OmniRoute server. The four modules that touch the Radar service are
`src/lib/radar/sync.ts` (catalog), `src/lib/radar/referralsSync.ts` (referrals), and
`src/lib/radar/offersSync.ts` (offers) plus `src/lib/radar/intelSync.ts` (Intel); all run
server-side.

All Radar endpoints return `404` when `RADAR_ENABLED` is off (see
[Flag](#flag-radar_enabled-default-off) above), and route error responses through
`buildErrorBody()`/`sanitizeErrorMessage()` per the repo-wide error-sanitization rule
(`docs/security/ERROR_SANITIZATION.md`).

### Authentication

All Radar endpoints require authentication via `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — a dashboard session cookie or a management-scoped
API key, the same gate that protects the rest of `/api/settings/*`. The flag-off
`404` check always runs **before** the auth check, so an install with `RADAR_ENABLED`
off stays byte-identical (no auth prompt just to learn the surface doesn't exist);
once the flag is on, an unauthenticated request gets `401` before any DB read or
write.

`GET /api/free-tier/summary` serves the free-tier catalog used by the dashboard.
A current Radar overlay is available to every caller. The release catalog serves as
the fallback when a current overlay is unavailable.
The existing totals and `perModel` honor `?excludeTosAvoid=1`. The instance's usage
and remaining tokens are available only with authentication.

- `source` gives the catalog's `kind` (`release` or `radar`), `version`,
  `generatedAt`, and `servedAt` in UTC. For a release, `version` is `null` and
  `generatedAt` is the release catalog's curation date.
- `realTokens` counts eligible recurring tokens with each shared quota counted once,
  excluding ToS-`avoid` entries. `socialGatedTokens` reports the separate total
  behind social gates. Both use the served catalog and apply the public headline
  rules regardless of the query filter.
- `rowSum` contains the `row-sum-v1` method, `liveTokens`, `retiredTokens`,
  `totalTokens`, and `retiredShare`. It adds recurring quotas row by row, including
  eligible ended offers. `rowSumSource` identifies the feed or release calculation.
  A missing or unsupported feed method uses the release calculation. Clients
  should display the row sum alongside `realTokens` only when `rowSumSource`
  matches `source.kind`.
- `priceReference` is `{ yearlyUsd, lifetimeUsd, checkedAt }` when the served Radar
  feed includes a valid reference. It is `null` otherwise. `checkedAt` uses
  `YYYY-MM-DD`.
- Each `perModel` row includes `inRelease` for membership in the shipped free-model
  catalog and `routable` for provider membership in the local registry.
- `activePromotions` is reserved for the promotions summary and currently returns `null`.

---

## Supporter offers

Offers use their own signed artifact, `GET /v1/offers/latest`, and never share the catalog or
referrals cache. `syncRadarOffers()` downloads this public feed only when the feature
flag is enabled and the operator has opted in.

After a successful GET, the client verifies the Ed25519 signature over the exact response bytes,
validates the signed body with `RadarOffersFeedSchema` (including its `live` marker), and
only replaces `radar_offers_cache` (migration `144_radar_offers_cache.sql`) for a newer version.
An equal version renews the fetch time. The same 10 MB header-plus-stream cap used by
the other feeds applies. Signature, schema, replay, size, HTTP, and network failures
preserve the last verified cache.

The closed offer shape supports three comparable benefit types: percentage in basis points, credit
in minor currency units, or trial days. A partner offer must include a same-kind public baseline and
its benefit must be strictly greater; official offers have no partner baseline. URLs must be
credential-free HTTPS. `getRadarOffers()` defensively revalidates the cached payload and filters
expired entries on every local read; `/dashboard/radar/offers` filters expiry again before rendering,
uses Portuguese text when available with English fallback, and labels partner offers explicitly.

The browser calls only local routes. It reads opt-in from settings and asks
`POST /api/radar/offers/sync` to refresh server-side when opted in.
`GET /api/radar/offers` reads the local cache. External
offer links open in a new tab with `noopener noreferrer`. No `radar_offers` MCP tool is exposed in
this release.

---

## Radar Intel, supporter badge, and CLI

Intel is a signed artifact at `GET /v1/intel/latest`. The closed `RadarIntelFeedSchema` accepts
only Radar-owned ELO rankings derived by the private curator from confirmed comparisons and factual
catalog age/count deltas derived from signed catalog snapshots. The methodology is fixed at initial
rating 1000 and K=32. An empty ranking is valid when no comparison has been confirmed; the client
never synthesizes one.

`syncRadarIntel()` downloads the public feed after opt-in and verifies the exact
response bytes with Ed25519 before schema validation. A newer version replaces
the local snapshot, and an equal version updates only its fetch time. An upstream
`404` returns `{ status: "unpublished" }` and clears the Intel cache. Other HTTP errors
preserve the cache. The main Radar page shows the Intel link when local status
reports an available cache. Opening `/dashboard/radar/intel` directly shows the
empty state when no snapshot is available.

The `radar-supporter` badge recognizes early Radar supporters. Existing awards
remain recorded. Radar sync no longer issues the badge.

The CLI exposes `omniroute radar status` and `omniroute radar sync`. Both communicate
with the local OmniRoute API. `status` reads `GET /api/radar/status`. `sync` sends
one `POST /api/radar/sync-all` and prints the result for each feed.

---

## Referral links (free credits)

Referral links are served from a **standalone, always-current** feed —
`GET /v1/referrals/latest` — separate from the catalog feed. This is deliberate: the
catalog feed on the community tier is a snapshot that can be up to 30 days old, so a
referral link extracted from it used to lag the server's real link list by the same
amount (a newly-added referral wouldn't reach a free/community user for up to a month).
The referrals feed removes that delay by syncing on its own, much shorter cadence.

```ts
// GET /v1/referrals/latest response body (Ed25519-signed, same pinned key as
// the catalog feed):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministic: max(updatedAt) across referral
                                  // links, so two identical requests produce the exact
                                  // same signed bytes/signature
  referrals: {
    fixed: RadarReferral[],      // present in EVERY tier, including no-auth/community
    campaigns: RadarReferral[],  // published limited-time campaigns
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

The body carries no `tier` field. The `x-omniroute-feed-tier` response header is
the source for the served tier
(`referralsSync.ts::syncRadarReferrals`); an absent/unrecognized header degrades to
`"community"`, the least-privileged assumption. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) validates the whole body, reusing the same
per-referral `RadarReferralSchema` exported from `feedSchema.ts` so both feeds validate
individual referrals identically. Every `RadarReferral.url` must be `https://` — a
`http://` url fails schema validation.

The OLD catalog-embedded `referrals` field on `RadarFeedSchema` (`feedSchema.ts`) is
kept for backward-compat with already-cached catalog feeds, but `getRadarReferrals()`
no longer reads it — see [Accessor](#accessor) below.

### Sync

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) is the ONLY module that
touches the network for referrals, mirroring `syncRadar()`'s contract exactly: flag off
→ `disabled`; opt-in false → `opt_out`; downloads `${RADAR_FEED_URL}/v1/referrals/latest`
(same `RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` fork overrides as the catalog), verifies the
Ed25519 signature over the exact response bytes (`verifyFeedBytes`), validates against
`RadarReferralsFeedSchema`, and caches into the `radar_referrals_cache` table
(migration `142_radar_referrals_cache.sql`) — a table entirely separate from the
catalog's `radar_feed_cache`. A 10 MB response cap and a `generatedAt` floor reject an
incoming feed older than the cached one, guarding against replay of an older signed
artifact. An equal timestamp is accepted: the server intentionally gives the community
and live referral variants the same deterministic `generatedAt`, so the signed payload
and served tier can change without the underlying link set changing. Never throws — always returns a status object; errors never carry a stack trace
in `reason`.

Two triggers keep the referrals cache warm, both independent of the catalog's own
24h cadence:

- **Sync-on-read** — `GET /api/radar/referrals` itself calls `syncRadarReferrals()`
  inline whenever the cache is missing or at least `REFERRALS_STALE_MS` old (6h,
  `shouldSyncReferralsOnRead()`), before serving the response. This is what makes fixed
  links "always current" for the very next dashboard load, without waiting on any
  background timer.
- **Scheduler side-sync** — `radarSchedulerTick()` (`scheduler.ts`) independently
  evaluates referrals staleness on the same hourly tick used for the catalog, calling
  `syncRadarReferrals()` when due. This runs regardless of whether the catalog itself
  was due that tick, and never affects `RadarTickResult`'s shape (best-effort side
  effect only, swallowed on error).

### Accessor

`src/lib/radar/index.ts` exports two read-only accessors, both never throwing (same
defensive contract as `getRadarCatalog()` — flag off, no cache, or a corrupt cached
payload all resolve to the empty shape instead of an error):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  reading from `radar_referrals_cache` (via `getRadarReferralsCache()`) and validating
  through `RadarReferralsFeedSchema` — **not** the catalog cache.
- `getDefaultReferralFor(provider)` → the `fixed` referral with `isDefault: true` for
  that provider, or `null`. Only looks at `fixed` — a campaign is never used as a
  provider's "default" link.

The actual "which referral is the default for a provider" rule lives in
`findDefaultReferral()` (`src/lib/radar/referrals.ts`), a small pure function with **no
DB import** — it is safe to import into a `"use client"` component. `getRadarReferrals`/
`getDefaultReferralFor` (in `index.ts`) pull in `@/lib/db/radar` and therefore stay
server-only; the providers dashboard imports `referrals.ts` directly instead of
`index.ts` (see below) to avoid bundling `better-sqlite3` into the browser.

### `GET /api/radar/referrals`

Follows the exact same gate order as every other Radar route: `RADAR_ENABLED` off →
`404` (checked first, byte-identical inertia); unauthenticated → `401`; otherwise
triggers a sync-on-read (see above) when stale, then `200` with
`{ fixed, campaigns, tier }` — `tier` comes straight from the (possibly just-refreshed)
cache row and is purely informative. Never
proxies the feed server directly — the route's own source contains no `fetch(` call;
the network only ever happens inside `syncRadarReferrals()`, same local-cache-only
principle as `/api/radar/catalog`.

### Dashboard UI — "Free credits" tab on `/dashboard/radar`

Reuses the existing Radar page (`src/app/(dashboard)/dashboard/radar/page.tsx`) as a
second tab instead of a new route — less routing/i18n surface for a feature that is a
variation on data the page already fetches. Once opted in, the tab bar offers
**Catalog** (existing table) and **Free credits**:

- Fixed links are grouped by provider, each showing `requiredAction` (when present)
  and a `target="_blank" rel="noopener noreferrer"` button to the referral URL.
- Campaigns show the same, plus `validUntil` when present.

### Referral link on the provider name (providers dashboard)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
already linked the provider name to `providerInfo.website` when present, with one
precedent for a monetized link: the Kimi (Moonshot AI) partner-link note
(`providers.kimiPartnerLinkNote` i18n key). D28 reuses that exact same discreet-note
pattern for Radar default referrals instead of introducing a new key.

Loose coupling, by design:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  is a **pure** function — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — with no dependency on `@/lib/radar` or `@/lib/db/*`. `providerPageUtils.ts` as a
  whole stays free of those imports (asserted by
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (a `"use client"` component) is the one place allowed
  to fetch Radar data — via `fetch("/api/radar/referrals")`, the same local-route
  pattern the Radar dashboard page itself uses — and it computes the default referral
  client-side with `findDefaultReferral()` from the DB-free `src/lib/radar/referrals.ts`.
- With `RADAR_ENABLED` off, the fetch 404s, `referralUrl` stays `null`, and
  `resolveProviderHeaderLink()` returns the static catalog `website` unchanged — the
  provider page is byte-identical to before this feature existed. Same outcome when
  there is no cache yet or no default referral for that specific provider.
- When a default referral does apply, `ProviderPageHeader` receives `isReferralLink`
  and shows the same discreet note/tooltip as the Kimi partner link (reusing the
  `providers.kimiPartnerLinkNote` key) — never a new, separate visual treatment.

---

## How to self-host a feed

A fork or self-hoster that wants full control over the catalog can run their own feed
service without touching client code:

1. Serve a `GET /v1/catalog/latest` endpoint returning a JSON body that satisfies
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — top-level `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks`, and `totals`. Honor `x-omniroute-radar-schema: 2`; a transition-compatible server
   should default requests without it to a separately signed v1 artifact.
2. Sign the exact response bytes with an Ed25519 key pair and return the base64
   signature in the `x-omniroute-feed-signature` response header.
3. Set `RADAR_FEED_URL` to the new base URL and `RADAR_FEED_PUBKEY` to the matching
   public key (base64-DER SPKI or PEM) — see the
   [env var reference](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Enable `RADAR_ENABLED` and opt in via `POST /api/radar/settings`
   (`{ optIn: true }`).

No other code changes are required — `verifyFeedBytes()` picks up the override
automatically (`getFeedPublicKeys()` in `src/lib/radar/pinnedKeys.ts`), and version
comparison, schema validation, and the merge rules apply identically to a self-hosted
feed.

Referral links (see [Referral links (free credits)](#referral-links-free-credits)
above) are a separate, optional artifact: a fork that only serves `/v1/catalog/latest`
still works fully — `syncRadarReferrals()` degrades to `{ status: "error" }` on a `404`
from `/v1/referrals/latest` and the cache simply stays empty, so
`GET /api/radar/referrals` keeps returning `{ fixed: [], campaigns: [], tier: null }`
instead of failing the rest of the page. To also offer referral links, serve
`GET /v1/referrals/latest` satisfying `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) and sign it with the same Ed25519 key pair as
the catalog feed.

Offers are another optional artifact. To serve them, implement a public
`GET /v1/offers/latest` with the closed `RadarOffersFeedSchema`
(`src/lib/radar/offersFeedSchema.ts`) and sign the exact bytes with the same key. A fork that omits this
endpoint keeps the catalog/referrals behavior unchanged; offer refresh fails non-destructively and
the last verified local offer cache remains available.

Intel is optional in the same way. A self-hoster can serve `GET /v1/intel/latest` using
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`) and sign the exact bytes with
the shared Ed25519 key. Omitting the
endpoint leaves catalog, referrals, and offers unchanged; Intel refresh preserves any last verified
local snapshot.

---

## Related docs

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — the
  error-response pattern the `/api/radar/*` routes follow.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY` reference.
