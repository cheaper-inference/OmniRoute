# Family Alias Auto-Maintainer v2 Design

**Status:** Approved 2026-11-11
**Date:** 2026-11-11

## Decision

The v1 implementation is rejected and must not be deployed. It proved the desired UX, but violated routing identity, subscription-only semantics, ownership safety, CPA preservation, and deployment durability.

v2 starts from these non-negotiable invariants.

## Product intent

Each OmniRoute / CLIProxyAPI installation automatically maintains stable model-line aliases from its own actual subscriptions and locally routable models.

Examples:

- `claude/fable` means a Fable model only
- `gpt/astra` means an Astra model only
- `openai/gpt/sol` means Sol served by the OpenAI/Codex subscription channel only
- `claude/fable/5.2` pins one version
- optional `/latest` is only a spelling alias for the same family; it never changes family identity

No person has to manually add releases, reorder provider copies, or remove stale generated aliases.

## Hard invariants

### 1. Identity preservation

A family alias may contain only concrete endpoints classified into that exact lineage.

Forbidden:

- `claude/fable -> claude/haiku`
- `gpt/astra -> gpt/luna`
- any cross-family fallback hidden behind a family name

If no verified subscription endpoint exists for the requested family, return a clear unavailable error. Cross-family routing belongs only in explicit intent aliases such as `auto/best-coding`, never family aliases.

### 2. Local routability only

models.dev is metadata only. It may enrich version, release date, limits, modality, and capability metadata. It must never create a routable endpoint.

Every emitted endpoint must originate from the local OmniRoute or CPA catalog and have a matching active local connection/account.

### 3. Strict subscription-only

The generated family graph contains only endpoints backed by an explicitly allowlisted subscription/OAuth class.

A family with zero subscription endpoints is omitted/unavailable. It must never fall back to API-key/pay-per-use, marketplace, unknown, or unconfigured providers.

Provider policy is instance-local configuration, not a global source-code table. Each configured subscription connection supplies:

- connection ID
- provider/channel ID
- billing class (`subscription`)
- allowed model IDs from that exact account

### 4. Account-specific entitlement

Discovery uses the per-connection model listing (`/api/providers/:id/models`), not only the global `/api/v1/models` list.

A model is eligible only if at least one active subscription connection advertises it. The generated combo step is pinned to that connection with `connectionId` or `allowedConnectionIds`.

### 5. Bounded health validation

Do not issue dozens of paid model completions hourly.

Health algorithm:

1. Trust account model advertisement for discovery.
2. Reuse provider/account quota/cooldown/health state.
3. Probe only newly discovered or previously failing `(connection, model)` pairs.
4. Cache probe result with exponential backoff and a minimum 24-hour success TTL.
5. Global probe budget defaults to 5 requests/day per installation.
6. A 429/temporary outage does not delete the endpoint; mark it temporarily unavailable while preserving last-known-good state.
7. Auth/model-not-supported permanently disables that pair until model resync or credential refresh.

### 6. Ownership and preservation

Every generated OmniRoute combo has an exact description marker:

`managed-by:family-alias-maintainer/v2; graph:<hash>; kind:<family|version|qualified>`

Rules:

- never update a combo lacking the marker
- never update a combo whose marker version/owner differs
- never overwrite pinned/manual names
- create a deterministic conflict report when a manual combo already owns a desired name
- remove stale combos only when they carry this maintainer's ownership marker
- validate the complete desired DAG before any write
- apply version combos before family combos; delete stale family wrappers before stale version leaves

### 7. Dry-run first

Mutation is disabled by default.

Modes:

- `plan`: discover, classify, diff, validate, report; no writes
- `apply`: enabled only by explicit config/flag and requires a current plan hash

The service must refuse apply if the live combo set changed since planning.

### 8. Independent targets

OmniRoute and CPA reconcile independently.

A CPA failure must not mark a successful OmniRoute reconciliation as wholly failed or cause expensive rediscovery/probes to repeat.

Reports include independent status, plan hash, readback evidence, and retry state for each target.

### 9. CPA managed subset merge

Never replace the complete CPA `oauth-model-alias` or `openai-compatibility` maps.

CPA integration must:

1. GET current config
2. identify only entries with an explicit v2 ownership marker / dedicated managed provider name
3. merge the desired managed subset
4. preserve every unrelated/manual entry
5. PUT or PATCH only after validating that the precondition hash is unchanged
6. GET again and verify exact managed-subset readback

If CPA cannot represent ordered multi-endpoint fallback faithfully, narrow the CPA contract: expose only aliases that map to one verified subscription model, or implement a real CPA plugin with its own owned routing graph. Do not silently claim parity.

### 10. Durable official deployment

No execution from worktrees or unmerged commits.

Deployment choices:

- preferred: merged upstream feature + official released image
- fallback: standalone maintained plugin/service in its own repository with immutable versioned image

Never deploy a forked OmniRoute/CPA runtime. A standalone plugin/service may use their public APIs.

Deployment requires:

- immutable image digest
- startup/readiness health
- bounded request deadlines
- single-run lock (`concurrencyPolicy: Forbid` / process lock)
- timeout (`activeDeadlineSeconds` / `TimeoutStartSec`)
- structured logs without secrets
- metrics: plan/apply outcome, aliases desired/created/updated/deleted/conflicted, probes used, target readback status
- alert after consecutive failures
- rollback runbook and retained sanitized plan/evidence artifacts

## Domain model

### Endpoint identity

A routable endpoint is:

```text
connection_id + provider_id + concrete_model_id
```

Provider ID alone is never a deduplication key.

### Family identity

Family identity is resolved in this order:

1. local curated `familyId` metadata (Radar/local catalog)
2. provider/account model metadata
3. models.dev metadata enrichment matched to a local concrete model
4. conservative parser fallback

Unclassified models are reported but not auto-routed.

### Version identity

Keep separate fields:

- semantic/generation version (`5.2`, `v3.1`)
- release/date suffix (`20251001`, `0528`)
- context size (`32b`, `120b`, `131072`)
- modality/variant (`coder`, `vl`, `instruct`)
- reasoning/effort (`high`, `thinking`)

Do not merge distinct lines such as DeepSeek R1 vs V3 or Qwen Coder vs VL vs Instruct.

### Generated graph

```text
family alias
  -> version alias (newest semantic release first)
       -> endpoint pinned to subscription connection A
       -> endpoint pinned to subscription connection B
```

A base family alias never includes thinking/effort variants. Harness/request parameters control reasoning.

## Reconciliation transaction

1. Fetch local connections and per-account model listings.
2. Load cached entitlement/health state.
3. Enrich local models from metadata sources.
4. Classify into exact lineages and versions.
5. Build desired owned graph.
6. Fetch live target state.
7. Detect manual/pinned conflicts.
8. Validate DAG, depth, family invariants, and endpoint routability.
9. Emit signed/hashed plan artifact.
10. In apply mode, verify precondition hash.
11. Apply owned creates/updates/deletes in dependency order.
12. Read back and verify.
13. Emit retained evidence and independent target statuses.

## Acceptance tests

- Fable alias contains Fable only; unavailable when no Fable subscription entitlement exists.
- Astra alias contains Astra only; never responds with Luna.
- One installation with Claude+GitHub subscriptions emits only their models.
- Another installation with OpenCode Go only emits only its advertised models.
- models.dev contains a model absent locally: no route is emitted.
- same provider exposes multiple same-version models: all concrete endpoint identities are preserved.
- DeepSeek R1/V3 and Qwen Coder/VL/Instruct remain distinct.
- temporary 429 preserves last-known-good endpoint but marks it unavailable; no destructive graph churn.
- manual combo with desired name remains untouched and produces a conflict.
- second unchanged run has zero writes and zero probes.
- desired graph shrinks: stale owned combos are deleted, manual combos remain.
- CPA unrelated aliases/providers survive reconciliation byte-for-byte.
- CPA failure after OmniRoute success produces partial-success report, not total failure.
- deployment restart/reboot uses stable immutable artifact, not a worktree.

## v1 artifacts

v1 code remains isolated and undeployed for forensic reference only. Its live automation was stopped; CPA was restored exactly; generated OmniRoute combos were removed except dependencies referenced by the pre-existing manual `gpt` combo. A full DB backup and cleanup evidence are retained privately.
