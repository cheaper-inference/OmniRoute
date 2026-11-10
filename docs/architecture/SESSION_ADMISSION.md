---
title: "Session admission thresholds"
---

# Session admission thresholds

A connection can opt into `rateLimitOverrides.newSessionMaxConcurrent` in the edit
connection modal, next to the account concurrency cap. This is an advisory routing
threshold, not another semaphore or a reservation. The JSON override accepts an integer
from 0 through 10000; omitted or 0 disables it. No global default or schema migration is
required. The normal provider update path validates and persists the JSON override.

## Two thresholds, one total

The existing `maxConcurrent` account gate remains the hard cap for every request and
model on that connection. When rate-limit protection is enabled for the connection,
a positive `rateLimitOverrides.maxConcurrent` retains its existing precedence over
`maxConcurrent`. Neither session affinity nor the new routing threshold changes that
executor admission rule. Model, provider, and global gates still compose with it.

For automatic credential selection, the new routing threshold compares against the
same process-local account semaphore's total running count, across all models and
sessions. At or above the threshold, fresh or unpinned requests skip that connection.
The threshold is clamped to the effective positive hard cap. A previously stored,
unexpired affinity record whose identity resolves to a connection in the current
policy-eligible pool may reuse that account up to the hard cap instead. Merely having
a session key, or creating a new affinity record during selection, is not reuse.
Stored mapping counts never represent concurrent work.

The filter runs after model, cooldown, key allowlist, and quota eligibility. It does
not expand that pool. Exclusive lease policy still runs afterward. If every candidate
is filtered, credential selection returns no credentials; existing caller fallback
handles that outcome. It does not silently fall back to an over-threshold account.

## Scope and concurrency limitations

Requests carrying an explicit `forcedConnectionId` or managed lease options retain
their existing targeting, affinity-override, and lease claim semantics. This includes
requests whose force is released by existing cooldown/retry logic. The advisory
threshold does not reinterpret an explicit target as automatic routing. These paths
still use the hard executor gate, quotas, model gates, and lease fencing.

The observation and dispatch are not atomic. Concurrent selections can observe the
same remaining space; an affinity can expire or change between selection and dispatch.
The routing threshold can therefore be exceeded. The existing executor hard cap is
still enforced atomically by the shared account semaphore. This feature makes no
strict fresh-session admission or cross-process concurrency guarantee, even when
session affinity uses Redis. Only work passing through the chat-core account gate is
counted; queued requests are not running work. The count includes work holding an
account slot while waiting for the existing rate limiter.

Opt-in connections without a positive hard cap use that same account gate with
`Number.MAX_SAFE_INTEGER` solely to keep a running count; no second capacity pool is
created. Without the override, the unlimited path remains unchanged. After enabling
an override on an already-running unlimited connection, older untracked attempts are
not retroactively counted. Non-chat request families that do not use this gate are
outside this routing preference's scope.
The synthetic no-auth and optional-key no-auth credential fast paths return before
the automatic pool filter and likewise do not apply the routing preference.

Implementation: `src/sse/services/freshSessionAdmission.ts`,
`src/sse/services/connectionConcurrencyFields.ts`, and
`open-sse/handlers/chatCore/executorHelpers.ts`.
