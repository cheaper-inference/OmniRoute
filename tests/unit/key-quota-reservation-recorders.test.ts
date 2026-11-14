// The two usage recorders are where a successful call turns its reservation into recorded use.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-recorders-"));
process.env.DATA_DIR = dataDir;
process.env.STREAM_DISCONNECT_GRACE_PERIOD_MS = "0";
const core = await import("../../src/lib/db/core.ts");
const quotaDb = await import("../../src/lib/db/keyQuota.ts");
const quota = await import("../../src/domain/keyQuota.ts");
const { recordNonStreamingUsageStats } =
  await import("../../open-sse/handlers/chatCore/nonStreamingUsageStats.ts");
const { recordStreamingUsageStats } =
  await import("../../open-sse/handlers/chatCore/streamingUsageStats.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

const USAGE = { prompt_tokens: 5, completion_tokens: 5, total_tokens: 10 };
const base = {
  provider: "openai",
  model: "gpt-4o-mini",
  startTime: Date.now(),
  connectionId: "conn-1",
  effectiveServiceTier: undefined,
  isCombo: false,
  comboStrategy: null,
};

function admittedCall(keyId: string, rpmLimit: number) {
  quotaDb.upsertKeyQuotaLimits(keyId, { rpmLimit });
  const verdict = quota.checkKeyQuota(keyId);
  assert.ok(verdict.allowed && verdict.reservation);
  const apiKeyInfo = { id: keyId, name: "k" };
  quota.bindKeyQuotaReservation(apiKeyInfo, verdict.reservation);
  return { apiKeyInfo, reservation: verdict.reservation };
}

test("non-streaming success: the recorder converts the reservation of its own call", () => {
  const mine = admittedCall("rec-ns", 5);
  const other = admittedCall("rec-ns", 5); // a second call in flight on the same key
  recordNonStreamingUsageStats(USAGE, {
    ...base,
    traceEnabled: false,
    apiKeyInfo: mine.apiKeyInfo,
  });
  assert.equal(mine.reservation.released, true);
  assert.equal(other.reservation.released, false, "the other call keeps its slot");
  assert.equal(quotaDb.getKeyQuotaCounters("rec-ns").rpmUsed, 1);
  assert.equal(quota.countKeyQuotaReservations("rec-ns"), 1);
});

test("streaming success: the recorder converts the reservation of its own call", () => {
  const mine = admittedCall("rec-s", 5);
  const other = admittedCall("rec-s", 5);
  recordStreamingUsageStats(USAGE, {
    ...base,
    streamStatus: 200,
    ttft: 1,
    streamErrorCode: null,
    apiKeyInfo: mine.apiKeyInfo,
  });
  assert.equal(mine.reservation.released, true);
  assert.equal(other.reservation.released, false);
  assert.equal(quotaDb.getKeyQuotaCounters("rec-s").rpmUsed, 1);
});

test("an aborted stream that is counted also converts its reservation", () => {
  const mine = admittedCall("rec-ab", 5);
  recordStreamingUsageStats(null, {
    ...base,
    streamStatus: 499,
    ttft: 0,
    streamErrorCode: "client_disconnected",
    apiKeyInfo: mine.apiKeyInfo,
    partialUsage: USAGE,
  });
  assert.equal(mine.reservation.released, true);
  assert.equal(quotaDb.getKeyQuotaCounters("rec-ab").rpmUsed, 1);
});

test("a combo attempt that is not counted keeps its reservation for the wrapper to release", () => {
  const mine = admittedCall("rec-combo", 5);
  recordStreamingUsageStats(null, {
    ...base,
    isCombo: true,
    streamStatus: 502,
    ttft: 0,
    streamErrorCode: "upstream_error",
    apiKeyInfo: mine.apiKeyInfo,
    emittedOutput: false,
  });
  assert.equal(mine.reservation.released, false);
  assert.equal(quotaDb.getKeyQuotaCounters("rec-combo").rpmUsed, 0);
});

test("an apiKeyInfo with no bound reservation converts nothing", () => {
  const other = admittedCall("rec-none", 5);
  recordNonStreamingUsageStats(USAGE, {
    ...base,
    traceEnabled: false,
    apiKeyInfo: { id: "rec-none", name: "copy" }, // a copy that never took a reservation
  });
  assert.equal(other.reservation.released, false, "another call's slot must not be stolen");
  assert.equal(quotaDb.getKeyQuotaCounters("rec-none").rpmUsed, 1);
});
