import test from "node:test";
import assert from "node:assert/strict";

const {
  trackPendingRequest,
  getPendingById,
  getPendingRequests,
  sweepStalePendingRequests,
  getMaxPendingRequestAgeMs,
  getMaxPendingDetails,
  getPendingRetainedBytes,
  finalizePendingRequestById,
  updatePendingRequestById,
  updatePendingRequest,
  updatePendingRequestStreamChunks,
  clearPendingRequests,
} = await import("../../src/lib/usage/usageHistory.ts");

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;

test("pending map is bounded by RETAINED BYTES, not just the 5000-entry count cap", () => {
  clearPendingRequests();
  assert.equal(getPendingRetainedBytes(), 0, "cleared state retains nothing");

  // Payloads pass through protectPendingPreview, so a retained entry is capped at
  // the preview bounds: depth 6, 24 object keys, 12 array items, 1200-char
  // strings. One worst-case entry is tens of KB, not the multi-MB of a raw
  // request. Build entries at that shape so the test exercises the real ceiling
  // rather than an unreachable one.
  const worstCaseString = "x".repeat(1200);
  const worstCaseArray = Array.from({ length: 12 }, () => ({
    role: "user",
    content: worstCaseString,
  }));
  const worstCaseObject = Object.fromEntries(
    Array.from({ length: 24 }, (_, i) => [`key${i}`, worstCaseArray])
  );
  const meta = () => ({
    clientRequest: worstCaseObject,
    providerRequest: worstCaseObject,
    providerResponse: worstCaseObject,
    clientResponse: worstCaseObject,
  });

  const CEILING = 256 * 1024 * 1024;
  const before = getPendingRetainedBytes();
  trackPendingRequest("m", "p", "warm", true, meta());
  const perEntry = getPendingRetainedBytes() - before;
  assert.ok(perEntry > 4096, `a worst-case entry must retain >4KB (got ${perEntry})`);

  // Enough entries to blow through 256 MB (past the 5000-entry count cap too).
  const target = Math.ceil(CEILING / perEntry) + 200;
  for (let i = 0; i < target; i++) {
    trackPendingRequest("m", "p", `conn-${i}`, true, meta());
  }

  const retained = getPendingRetainedBytes();
  assert.ok(
    retained <= CEILING,
    `retained bytes ${retained} must stay under the ${CEILING} ceiling`
  );
  assert.ok(
    getPendingById().size < target,
    `entries must be evicted under pressure (kept ${getPendingById().size}/${target})`
  );
  assert.ok(getPendingById().size > 0, "the ceiling must not wipe in-flight requests entirely");
  // Counters self-heal: the map and the dashboard buckets stay consistent.
  const counted = getPendingRequests().byModel["m (p)"];
  assert.equal(counted, getPendingById().size, "pending counts must match the map after eviction");

  clearPendingRequests();
  assert.equal(getPendingRetainedBytes(), 0, "clear resets retained bytes");
});

test("pending ids are unique across a large burst (regression: 24-bit suffix collided ~52%)", () => {
  clearPendingRequests();
  // 5000 requests tracked inside one millisecond. With the old
  // `${now}-${uuid.slice(0,6)}` id the 24-bit suffix collided by the birthday
  // bound ~52% of the time, and `pendingById.set` overwrote a LIVE request's
  // entry (the map lost one while its bucket kept both).
  const COUNT = 5000;
  const ids = new Set<string>();
  for (let i = 0; i < COUNT; i++) {
    const id = trackPendingRequest("m", "p", "c-burst", true);
    assert.ok(id, "id returned");
    ids.add(id);
  }
  assert.equal(ids.size, COUNT, "every insert must yield a unique id");
  assert.equal(
    getPendingById().size,
    COUNT,
    "one insert must be exactly one map entry (no silent overwrite)"
  );
  clearPendingRequests();
});

test("UPDATE path measures payloads (regression: the ceiling must not no-op in production)", () => {
  clearPendingRequests();

  const worstCaseString = "x".repeat(1200);
  const worstCaseArray = Array.from({ length: 12 }, () => ({
    role: "user",
    content: worstCaseString,
  }));
  const worstCaseObject = Object.fromEntries(
    Array.from({ length: 24 }, (_, i) => [`key${i}`, worstCaseArray])
  );

  // Path 1: updatePendingRequestById (targets one exact id).
  const idA = trackPendingRequest("m", "p", "c-a", true);
  assert.ok(idA, "id tracked");
  const afterInsertA = getPendingRetainedBytes();
  assert.ok(afterInsertA < 4096, `a bare entry retains almost nothing (got ${afterInsertA})`);
  updatePendingRequestById(idA, { providerResponse: worstCaseObject });
  const afterById = getPendingRetainedBytes();
  assert.ok(
    afterById > afterInsertA + 10_000,
    `updatePendingRequestById must be measured (insert ${afterInsertA} -> ${afterById})`
  );

  // Path 2: updatePendingRequest (targets the LAST entry of one account/model
  // bucket) — a different connection, so it is a genuinely different entry.
  const idB = trackPendingRequest("m", "p", "c-b", true);
  assert.ok(idB, "second id tracked");
  const beforeBucket = getPendingRetainedBytes();
  updatePendingRequest("m", "p", "c-b", { providerResponse: worstCaseObject });
  const afterBucket = getPendingRetainedBytes();
  assert.ok(
    afterBucket > beforeBucket + 10_000,
    `updatePendingRequest must be measured (${beforeBucket} -> ${afterBucket})`
  );

  // Replacing the same field with the same size must not double-count.
  updatePendingRequest("m", "p", "c-b", { providerResponse: worstCaseObject });
  assert.equal(getPendingRetainedBytes(), afterBucket, "replacing a payload must not accumulate");

  // After inserting enough fat entries, the byte ceiling should cap retained bytes.
  // Insert entries until we're at or near the ceiling, then verify we can't exceed it
  // by adding more payloads — the ceiling should reclaim or refuse.
  const CEILING = 256 * 1024 * 1024;
  const perEntry = afterById - afterInsertA;
  const extra = Math.ceil(CEILING / perEntry) + 50;
  for (let i = 0; i < extra; i++) {
    const nextId = trackPendingRequest("m", "p", `c${i}`, true);
    assert.ok(nextId);
    updatePendingRequestById(nextId, { providerResponse: worstCaseObject });
  }
  // After the burst, retained bytes should be close to but not exceed the ceiling.
  assert.ok(
    getPendingRetainedBytes() <= CEILING * 1.01,
    `the map should stay at or near the ceiling after a fat insert burst (retained ${getPendingRetainedBytes()})`
  );

  trackPendingRequest("m", "p", "c-trigger", true);
  assert.ok(
    getPendingRetainedBytes() <= CEILING,
    `ceiling must reclaim on insert (retained ${getPendingRetainedBytes()})`
  );

  clearPendingRequests();
  assert.equal(getPendingRetainedBytes(), 0, "clear resets retained bytes");
});

test("UPDATE path enforces the byte ceiling when growing bare entries (regression)", () => {
  clearPendingRequests();

  const worstCaseString = "x".repeat(1200);
  const worstCaseArray = Array.from({ length: 12 }, () => ({
    role: "user",
    content: worstCaseString,
  }));
  const worstCaseObject = Object.fromEntries(
    Array.from({ length: 24 }, (_, i) => [`key${i}`, worstCaseArray])
  );
  const ceiling = 256 * 1024 * 1024;
  const count = getMaxPendingDetails();
  const ids: string[] = [];

  // Keep insertion below the byte ceiling, then grow every entry through the
  // update path. Without update-time enforcement, the count-capped map exceeds
  // the byte ceiling because each protected preview is larger than 1/5000 of it.
  for (let i = 0; i < count; i++) {
    const id = trackPendingRequest("m", "p", `c-update-${i}`, true);
    assert.ok(id, "id tracked");
    ids.push(id);
  }
  assert.ok(getPendingRetainedBytes() < ceiling, "bare inserts stay below the byte ceiling");

  for (const id of ids) {
    updatePendingRequestById(id, { providerResponse: worstCaseObject });
  }

  assert.ok(
    getPendingRetainedBytes() <= ceiling,
    `update-time growth must stay under the ${ceiling} byte ceiling`
  );
  assert.ok(
    getPendingById().size < count,
    "update-time byte enforcement must evict entries after the count cap is reached"
  );

  clearPendingRequests();
  assert.equal(getPendingRetainedBytes(), 0, "clear resets retained bytes");
});

test("stream-chunks update path is measured and re-enforces the ceiling (regression)", () => {
  clearPendingRequests();

  // A bare entry retains almost nothing; chunks arrive later via the
  // streaming path. Before the fix, growing chunks were neither measured nor
  // enforced, so the byte ceiling silently stopped binding for streams.
  const id = trackPendingRequest("m", "p", "c-stream", true);
  assert.ok(id, "id tracked");
  const afterInsert = getPendingRetainedBytes();

  const bigChunk = "y".repeat(1200);
  updatePendingRequestStreamChunks("m", "p", "c-stream", {
    provider: [bigChunk],
  });
  const afterChunks = getPendingRetainedBytes();
  assert.ok(
    afterChunks > afterInsert,
    `stream-chunks update must be measured (insert ${afterInsert} -> ${afterChunks})`
  );

  // Replacing with the same-size payload must not accumulate.
  updatePendingRequestStreamChunks("m", "p", "c-stream", {
    provider: [bigChunk],
  });
  assert.equal(getPendingRetainedBytes(), afterChunks, "replacing a payload must not accumulate");

  // Clearing chunks must drop the retained bytes back down.
  updatePendingRequestStreamChunks("m", "p", "c-stream", null);
  assert.ok(
    getPendingRetainedBytes() < afterChunks,
    "clearing stream chunks must reclaim their bytes"
  );

  clearPendingRequests();
  assert.equal(getPendingRetainedBytes(), 0, "clear resets retained bytes");
});

test("sweepStalePendingRequests prunes then removes over-age pending details after a grace period", () => {
  clearPendingRequests();

  // One request that will age past the max age (still in flight), one fresh.
  const staleId = trackPendingRequest("gpt-x", "openai", "conn-stale", true, {
    providerResponse: { body: "x".repeat(20_000) },
    correlationId: "corr-stale",
  });
  const freshId = trackPendingRequest("gpt-x", "openai", "conn-fresh", true);

  assert.ok(staleId && freshId, "both started requests should produce ids");
  assert.equal(getPendingById().size, 2);
  assert.equal(getPendingRequests().byModel["gpt-x (openai)"], 2);

  // Age the stale entry well beyond the max age.
  const stale = getPendingById().get(staleId);
  assert.ok(stale, "stale detail should exist");
  stale.tokens = {
    in: 12,
    out: 34,
    cacheRead: null,
    cacheCreation: null,
    reasoning: null,
    compressed: null,
  };
  const retainedBeforeSweep = getPendingRetainedBytes();
  stale.startedAt = Date.now() - 2 * HOUR_MS;

  const removed = sweepStalePendingRequests(Date.now(), HOUR_MS);

  assert.equal(removed, 0, "age-only sweep removes nothing, it marks");
  assert.equal(getPendingById().size, 2, "both entries should remain");
  const marked = getPendingById().get(staleId);
  assert.equal(marked?.stale, true, "over-age entry should be marked");
  assert.ok(typeof marked?.sweptAt === "number", "marked entry should carry a sweep timestamp");
  assert.equal(marked?.providerResponse, undefined, "stale payloads should be pruned");
  assert.deepEqual(marked?.tokens, stale.tokens, "lightweight token metadata should be preserved");
  assert.ok(
    getPendingRetainedBytes() < retainedBeforeSweep,
    "pruning stale payloads must reduce retained-byte accounting"
  );
  assert.ok(getPendingById().has(freshId), "fresh entry must survive");
  assert.equal(getPendingById().get(freshId)?.stale, undefined);

  // Counts still include the marked entry.
  assert.equal(getPendingRequests().byModel["gpt-x (openai)"], 2);
  assert.equal(getPendingRequests().byAccount["conn-stale"]["gpt-x (openai)"], 1);
  assert.equal(getPendingRequests().byAccount["conn-fresh"]["gpt-x (openai)"], 1);

  const removedAfterGrace = sweepStalePendingRequests(Date.now() + 5 * MINUTE_MS, HOUR_MS);
  assert.equal(removedAfterGrace, 1);
  assert.equal(getPendingById().has(staleId), false, "stale detail should be physically removed");
  assert.equal(getPendingRequests().byModel["gpt-x (openai)"], 1);
  assert.equal(getPendingRequests().byAccount["conn-stale"], undefined);
  assert.equal(getPendingById().has(freshId), true, "fresh detail must remain");
  const replacementId = trackPendingRequest("gpt-x", "openai", "conn-retry", true, {
    correlationId: "corr-stale",
  });
  assert.ok(replacementId);
  assert.notEqual(replacementId, staleId, "removed stale correlation IDs must not be reused");

  clearPendingRequests();
});

test("sweepStalePendingRequests is a no-op when nothing is stale", () => {
  clearPendingRequests();
  trackPendingRequest("m", "p", "c1", true);
  trackPendingRequest("m", "p", "c2", true);

  const removed = sweepStalePendingRequests(Date.now(), HOUR_MS);

  assert.equal(removed, 0);
  assert.equal(getPendingById().size, 2);
  clearPendingRequests();
});

test("sweepStalePendingRequests defaults to a one hour max pending age", () => {
  clearPendingRequests();

  const staleId = trackPendingRequest("m", "p", "old", true);
  const recentId = trackPendingRequest("m", "p", "recent", true);
  assert.ok(staleId && recentId);

  const now = Date.now();
  const stale = getPendingById().get(staleId);
  const recent = getPendingById().get(recentId);
  assert.ok(stale && recent);

  stale.startedAt = now - 61 * MINUTE_MS;
  recent.startedAt = now - 59 * MINUTE_MS;

  const removed = sweepStalePendingRequests(now);

  assert.equal(removed, 0, "age-only sweep removes nothing, it marks");
  const marked = getPendingById().get(staleId);
  assert.equal(marked?.stale, true, "entry past the age bound should be marked");
  assert.ok(typeof marked?.sweptAt === "number");
  assert.equal(getPendingById().has(staleId), true);
  assert.equal(getPendingById().has(recentId), true);
  assert.equal(getPendingById().get(recentId)?.stale, undefined);
  clearPendingRequests();
});

test("pending sweep max age can be overridden through environment", () => {
  clearPendingRequests();
  const previous = process.env.MAX_PENDING_REQUEST_AGE_MS;
  process.env.MAX_PENDING_REQUEST_AGE_MS = String(2 * HOUR_MS);

  try {
    const requestId = trackPendingRequest("m", "p", "custom-age", true);
    assert.ok(requestId);

    const detail = getPendingById().get(requestId);
    assert.ok(detail);
    detail.startedAt = Date.now() - 90 * MINUTE_MS;

    assert.equal(getMaxPendingRequestAgeMs(), 2 * HOUR_MS);
    assert.equal(sweepStalePendingRequests(Date.now()), 0);
    assert.equal(getPendingById().has(requestId), true);
  } finally {
    if (previous === undefined) delete process.env.MAX_PENDING_REQUEST_AGE_MS;
    else process.env.MAX_PENDING_REQUEST_AGE_MS = previous;
    clearPendingRequests();
  }
});

test("invalid pending sweep max age falls back to one hour", () => {
  const previous = process.env.MAX_PENDING_REQUEST_AGE_MS;
  process.env.MAX_PENDING_REQUEST_AGE_MS = "not-a-number";

  try {
    assert.equal(getMaxPendingRequestAgeMs(), HOUR_MS);
  } finally {
    if (previous === undefined) delete process.env.MAX_PENDING_REQUEST_AGE_MS;
    else process.env.MAX_PENDING_REQUEST_AGE_MS = previous;
  }
});

test("pending detail cap is configurable through the environment", () => {
  const previous = process.env.MAX_PENDING_DETAILS;
  process.env.MAX_PENDING_DETAILS = "17";

  try {
    assert.equal(getMaxPendingDetails(), 17);
    assert.equal(getMaxPendingDetails("0"), 5000);
    assert.equal(getMaxPendingDetails("-1"), 5000);
    assert.equal(getMaxPendingDetails("1.5"), 5000);
    assert.equal(getMaxPendingDetails("not-a-number"), 5000);
  } finally {
    if (previous === undefined) delete process.env.MAX_PENDING_DETAILS;
    else process.env.MAX_PENDING_DETAILS = previous;
  }
});

test("pending correlation map is immediately bounded by the configured detail cap", () => {
  clearPendingRequests();
  const previous = process.env.MAX_PENDING_DETAILS;
  process.env.MAX_PENDING_DETAILS = "2";

  try {
    const firstId = trackPendingRequest("m", "p", "c1", true, {
      correlationId: "corr-1",
    });
    assert.ok(firstId);
    assert.ok(trackPendingRequest("m", "p", "c2", true, { correlationId: "corr-2" }));
    assert.ok(trackPendingRequest("m", "p", "c3", true, { correlationId: "corr-3" }));

    const replacementId = trackPendingRequest("m", "p", "c4", true, {
      correlationId: "corr-1",
    });
    assert.ok(replacementId);
    assert.notEqual(
      replacementId,
      firstId,
      "an evicted correlation mapping should not resurrect its old pending id"
    );
    assert.equal(
      sweepStalePendingRequests(Date.now(), HOUR_MS),
      2,
      "the configured pending-detail cap should remove entries over the limit"
    );
    assert.equal(getPendingById().size, 2);
  } finally {
    if (previous === undefined) delete process.env.MAX_PENDING_DETAILS;
    else process.env.MAX_PENDING_DETAILS = previous;
    clearPendingRequests();
  }
});

// Live incident: a combo dispatch calls trackPendingRequest once PER TARGET
// ATTEMPT (open-sse/handlers/chatCore.ts's single "started" call site, hit
// again on every fallback), each previously generating its OWN fresh id. A
// dashboard tab polling /api/logs/<id> for the FIRST attempt went stale the
// moment that attempt finalized and the combo silently retried under a
// different id -- the tab had no way to discover the new id, even though the
// request kept streaming successfully. Fix: reuse the same pending id for
// every attempt sharing a correlationId (already passed as metadata on every
// "started" call, already stable across a combo's retries).
test("trackPendingRequest reuses the same id across a combo's target-attempt retries sharing a correlationId", () => {
  clearPendingRequests();

  const firstId = trackPendingRequest("model-a", "provider-a", "conn-a", true, {
    correlationId: "corr-retry-1",
  });
  assert.ok(firstId, "first attempt should produce an id");

  // First target attempt finalizes (fails) -- the combo retries with a
  // different target, but the SAME client-facing request/correlation.
  trackPendingRequest("model-a", "provider-a", "conn-a", false);
  assert.equal(getPendingById().has(firstId), false, "finalized attempt is removed by id");

  const secondId = trackPendingRequest("model-b", "provider-b", "conn-b", true, {
    correlationId: "corr-retry-1",
  });

  assert.equal(secondId, firstId, "retry attempt must reuse the first attempt's id");
  assert.equal(
    getPendingById().has(firstId),
    true,
    "reused id is live again under the new attempt"
  );
  assert.equal(
    getPendingById().get(firstId)?.model,
    "model-b",
    "entry reflects the NEW attempt's target"
  );

  clearPendingRequests();
});

test("trackPendingRequest never reuses an id across two different correlationIds", () => {
  clearPendingRequests();

  const idA = trackPendingRequest("model-a", "provider-a", "conn-a", true, {
    correlationId: "corr-unrelated-1",
  });
  const idB = trackPendingRequest("model-a", "provider-a", "conn-b", true, {
    correlationId: "corr-unrelated-2",
  });

  assert.ok(idA && idB);
  assert.notEqual(idA, idB, "unrelated client requests must never share a pending id");

  clearPendingRequests();
});

test("trackPendingRequest without a correlationId keeps generating a fresh id every attempt (unchanged behavior)", () => {
  clearPendingRequests();

  const idA = trackPendingRequest("model-a", "provider-a", "conn-a", true);
  trackPendingRequest("model-a", "provider-a", "conn-a", false);
  const idB = trackPendingRequest("model-a", "provider-a", "conn-a", true);

  assert.ok(idA && idB);
  assert.notEqual(idA, idB, "no correlationId means no cross-attempt identity to reuse");

  clearPendingRequests();
});

test("sweepStalePendingRequests evicts stale correlation-id-to-pending-id mappings so an old id can never resurface", () => {
  clearPendingRequests();

  const firstId = trackPendingRequest("model-a", "provider-a", "conn-a", true, {
    correlationId: "corr-stale-mapping",
  });
  assert.ok(firstId);
  trackPendingRequest("model-a", "provider-a", "conn-a", false);

  // Sweep with a max age of 0 so the just-recorded correlation mapping (whose
  // touchedAt is "now") is immediately treated as stale, mirroring what a
  // real 1-hour-later sweep does to a genuinely abandoned mapping.
  sweepStalePendingRequests(Date.now() + HOUR_MS + MINUTE_MS, HOUR_MS);

  const secondId = trackPendingRequest("model-b", "provider-b", "conn-b", true, {
    correlationId: "corr-stale-mapping",
  });

  assert.notEqual(secondId, firstId, "an evicted mapping must not resurrect the old id");

  clearPendingRequests();
});

test("second sweep leaves an already marked entry untouched", () => {
  clearPendingRequests();
  try {
    const requestId = trackPendingRequest("m", "p", "c-mark", true);
    assert.ok(requestId);
    const detail = getPendingById().get(requestId);
    assert.ok(detail);
    const now = Date.now();
    detail.startedAt = now - 2 * HOUR_MS;

    assert.equal(sweepStalePendingRequests(now, HOUR_MS), 0);
    const firstSweptAt = getPendingById().get(requestId)?.sweptAt;
    assert.equal(getPendingById().get(requestId)?.stale, true);

    assert.equal(sweepStalePendingRequests(now + MINUTE_MS, HOUR_MS), 0);
    assert.equal(getPendingById().get(requestId)?.stale, true);
    assert.equal(getPendingById().get(requestId)?.sweptAt, firstSweptAt);
    assert.equal(getPendingById().size, 1);
  } finally {
    clearPendingRequests();
  }
});

test("entries without an account are marked in the map and still fall under the cap", () => {
  clearPendingRequests();
  try {
    const requestId = trackPendingRequest("m", "p", "c-noconn", true);
    assert.ok(requestId);
    const detail = getPendingById().get(requestId);
    assert.ok(detail);
    // Entries tracked without an account have no detail bucket; drop the
    // account link to cover that path deterministically.
    detail.connectionId = null;
    const now = Date.now();
    detail.startedAt = now - 2 * HOUR_MS;

    assert.equal(sweepStalePendingRequests(now, HOUR_MS), 0);
    const marked = getPendingById().get(requestId);
    assert.equal(marked?.stale, true);
    assert.ok(typeof marked?.sweptAt === "number");
    assert.equal(getPendingRequests().byModel["m (p)"], 1);

    // The cap is the only removal path and still reaches map-only entries:
    // age sweep marks but never removes, so push past the cap with fresh
    // entries sharing one account (bounded: exactly the cap overflow).
    for (let i = 0; i < 5000; i++) {
      trackPendingRequest("m", "p", "c-fresh-cap", true);
    }
    const sizeBefore = getPendingById().size;
    assert.ok(sizeBefore > 5000, `expected to exceed the cap, got ${sizeBefore}`);
    const removedByCap = sweepStalePendingRequests(now, HOUR_MS);
    assert.equal(removedByCap, sizeBefore - 5000, "sweep removes exactly the overflow");
    assert.equal(getPendingById().size, 5000, "the cap holds after the sweep");
    assert.equal(getPendingById().has(requestId), false);
  } finally {
    clearPendingRequests();
  }
});

test("a marked entry finalizes exactly once without double counting", () => {
  clearPendingRequests();
  try {
    const requestId = trackPendingRequest("m", "p", "c-final", true);
    assert.ok(requestId);
    const detail = getPendingById().get(requestId);
    assert.ok(detail);
    const now = Date.now();
    detail.startedAt = now - 2 * HOUR_MS;
    sweepStalePendingRequests(now, HOUR_MS);
    assert.equal(getPendingById().get(requestId)?.stale, true);
    assert.equal(getPendingRequests().byModel["m (p)"], 1);

    // Both payload sides set so the finalize path skips its async artifact
    // enrichment (no database handle needed in this unit test).
    const finalized = finalizePendingRequestById(requestId, {
      providerResponse: "done",
      clientResponse: "done",
    });
    assert.equal(finalized, true);
    assert.equal(getPendingById().has(requestId), false);
    assert.equal(getPendingRequests().byModel["m (p)"], undefined);
    assert.equal(getPendingRequests().byAccount["c-final"], undefined);
  } finally {
    clearPendingRequests();
  }
});

test("a marked entry that leaves through the queue path keeps counters consistent", () => {
  clearPendingRequests();
  try {
    const requestId = trackPendingRequest("m", "p", "c-queue", true);
    assert.ok(requestId);
    const detail = getPendingById().get(requestId);
    assert.ok(detail);
    detail.startedAt = Date.now() - 2 * HOUR_MS;
    sweepStalePendingRequests(Date.now(), HOUR_MS);
    assert.equal(getPendingById().get(requestId)?.stale, true);

    trackPendingRequest("m", "p", "c-queue", false);
    assert.equal(getPendingById().has(requestId), false);
    assert.equal(getPendingRequests().byModel["m (p)"], 0);
  } finally {
    clearPendingRequests();
  }
});

test("marked entries are removed first when the pending map exceeds the cap", () => {
  clearPendingRequests();
  try {
    const now = Date.now();
    const markedIds: string[] = [];
    for (let i = 0; i < 3; i++) {
      const id = trackPendingRequest("m", "p", `c-marked-${i}`, true);
      assert.ok(id);
      const detail = getPendingById().get(id);
      assert.ok(detail);
      detail.startedAt = now - (3 - i + 1) * HOUR_MS;
      markedIds.push(id);
    }
    sweepStalePendingRequests(now, HOUR_MS);
    for (const id of markedIds) assert.equal(getPendingById().get(id)?.stale, true);

    // Fill past the cap with fresh entries.
    for (let i = 0; i < 5000; i++) {
      trackPendingRequest("m", "p", `c-fresh-${i}`, true);
    }
    const sizeBefore = getPendingById().size;
    assert.ok(sizeBefore > 5000, `expected to exceed the cap, got ${sizeBefore}`);

    // Derive the expectation from the ACTUAL pre-sweep size rather than
    // hardcoding: every insert must be a distinct map entry, and the sweep
    // removes exactly the overflow.
    const removed = sweepStalePendingRequests(now, HOUR_MS);
    assert.equal(getPendingById().size, 5000, "the cap holds after the sweep");
    assert.equal(removed, sizeBefore - 5000, "sweep removes exactly the overflow");
    for (const id of markedIds) assert.equal(getPendingById().has(id), false);
  } finally {
    clearPendingRequests();
  }
});

test("marking fields are never ingested from caller metadata", () => {
  clearPendingRequests();
  try {
    const requestId = trackPendingRequest("m", "p", "c-hostile", true, {
      stale: false,
      sweptAt: 123,
    } as unknown as Parameters<typeof trackPendingRequest>[4]);
    assert.ok(requestId);
    const detail = getPendingById().get(requestId);
    assert.ok(detail);
    assert.equal(detail.stale, undefined);
    assert.equal(detail.sweptAt, undefined);

    const updated = updatePendingRequestById(requestId, {
      stale: true,
      sweptAt: 456,
    } as unknown as Parameters<typeof updatePendingRequestById>[1]);
    assert.equal(updated, true);
    assert.equal(getPendingById().get(requestId)?.stale, undefined);
    assert.equal(getPendingById().get(requestId)?.sweptAt, undefined);
  } finally {
    clearPendingRequests();
  }
});

test("marked pending rows stay active and pass row filters", async () => {
  const { buildCallLogListRows, rowMatchesFilter } =
    await import("../../src/app/api/usage/call-logs/route.ts");
  const now = Date.now();
  const rows = buildCallLogListRows({
    logs: [
      {
        id: "persisted-1",
        timestamp: new Date(now - 5_000).toISOString(),
      },
    ],
    connections: [],
    pendingDetails: [
      {
        id: "marked-1",
        startedAt: now - 2 * 60 * 60 * 1000,
        provider: "p",
        model: "m",
        connectionId: "c-marked",
        correlationId: null,
        stale: true,
        sweptAt: now,
      },
      {
        id: "active-1",
        startedAt: now - 1_000,
        provider: "p",
        model: "m",
        connectionId: "c-active",
        correlationId: null,
      },
    ],
    completedDetails: [],
    now,
  });

  const marked = rows.find((row) => row.id === "marked-1");
  const fresh = rows.find((row) => row.id === "active-1");
  assert.equal(marked?.active, true);
  assert.equal(marked?.stale, true);
  assert.equal(marked?.sweptAt, new Date(now).toISOString());
  assert.equal(fresh?.active, true);
  assert.equal(fresh?.stale, undefined);
  // Same priority (active first): recency decides, so the older marked row
  // follows the fresher active row.
  assert.equal(rows[0].id, "active-1");
  assert.equal(rows[1].id, "marked-1");
  assert.equal(rowMatchesFilter(marked, {}), true);
  assert.equal(rowMatchesFilter(marked, { model: "m" }), true);
});
