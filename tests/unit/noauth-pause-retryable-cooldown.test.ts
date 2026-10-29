/**
 * A paused no-auth provider must answer with a retryable cooldown (429 +
 * Retry-After), not a fatal 401 "No active credentials".
 *
 * Symptom: while the short refusal pause covers the shared synthetic
 * connection, every request for that provider received null from selection
 * and surfaced as 401, which clients do not retry.
 */
import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-noauth-pause-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-noauth-pause-secret";

const core = await import("../../src/lib/db/core.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { handleNoCredentials } = await import("../../src/sse/handlers/chatHelpers.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { noteOpencodeFreeTierSkip, clearOpencodeFreeTierSkips, getOpencodeFreeTierSkipRemainingMs } =
  await import("../../open-sse/services/opencodeFreeTierSkip.ts");
const { pauseCooldownIfPaused } = await import("../../src/sse/services/noAuthModelCooldown.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");

const PROVIDER = "opencode";
const MODEL = "muse-spark-1.3-contributor-free";

beforeEach(() => {
  clearOpencodeFreeTierSkips();
  clearAllModelLockouts();
});
after(() => {
  clearOpencodeFreeTierSkips();
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("reader reports the positive remaining time while the pause covers the provider", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, 60_000);
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + 10_000), 50_000);
});

test("reader returns null with no entry", () => {
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER), null);
});

test("reader returns null for a foreign provider", () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  assert.equal(getOpencodeFreeTierSkipRemainingMs("groq"), null);
});

test("reader returns null once the pause expires and drops the entry", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, 50);
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + 50), null);
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + 51), null);
});

test("builder returns a connection-scoped 429 envelope near the end of the pause", () => {
  noteOpencodeFreeTierSkip(PROVIDER, Date.now(), 60_000);
  const before = Date.now();
  const outcome = pauseCooldownIfPaused(PROVIDER, "noauth");
  assert.ok(outcome, "an active pause must answer a cooldown, not null");
  if (!outcome) return;
  assert.equal(outcome.allRateLimited, true);
  assert.equal(outcome.lastErrorCode, 429);
  assert.equal(outcome.cooldownScope, "connection");
  assert.equal(outcome.cooldownModel, null);
  assert.equal(outcome.lastError, "The shared no-auth connection is in a refusal pause");
  assert.equal(outcome.connectionsCount, 1);
  const remaining = Date.parse(outcome.retryAfter) - before;
  assert.ok(
    remaining > 0 && remaining <= 60_000 + 2000,
    `retryAfter near pause end (${remaining}ms)`
  );
});

test("an unrelated Free pause does not bypass exclusion of a live noauth connection", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const baseline = await auth.getProviderCredentials(
    "uncloseai",
    null,
    null,
    "Lorbus/Qwen3.6-27B-int4-AutoRound"
  );
  assert.equal(baseline?.connectionId, "noauth");
  const result = await auth.getProviderCredentials(
    "uncloseai",
    "noauth",
    null,
    "Lorbus/Qwen3.6-27B-int4-AutoRound"
  );
  assert.equal(result, null);
});

test("an unrelated Free pause does not bypass a live noauth connection allowlist", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const baseline = await auth.getProviderCredentials(
    "uncloseai",
    null,
    null,
    "Lorbus/Qwen3.6-27B-int4-AutoRound"
  );
  assert.equal(baseline?.connectionId, "noauth");
  const result = await auth.getProviderCredentials(
    "uncloseai",
    null,
    ["conn-other"],
    "Lorbus/Qwen3.6-27B-int4-AutoRound"
  );
  assert.equal(result, null);
});

test("another provider is unchanged during a pause", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const result = await auth.getProviderCredentials("groq", null, null, MODEL);
  assert.equal(result, null);
});

test("storage returns to its starting size after pauses expire", () => {
  const start = Date.now();
  const count = 25;
  for (let i = 0; i < count; i += 1) {
    noteOpencodeFreeTierSkip(`opencode-${i}`, start, 50);
  }
  for (let i = 0; i < count; i += 1) {
    assert.equal(getOpencodeFreeTierSkipRemainingMs(`opencode-${i}`, start + 51), null);
  }
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, start + 51), null);
});

test("pause cooldown maps to a 429 with Retry-After on a fresh attempt", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const credentials = pauseCooldownIfPaused(PROVIDER, "noauth");
  const res = handleNoCredentials(credentials, null, PROVIDER, MODEL, null, null);
  assert.equal(res.status, 429);
  assert.ok(res.headers.get("Retry-After"), "429 carries Retry-After");
  const body = (await res.json()) as { error: { code?: string } };
  assert.notEqual(body.error.code, "model_cooldown");
});

test("pause cooldown on a retried attempt documents the inherited status", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const credentials = pauseCooldownIfPaused(PROVIDER, "noauth");
  const res = handleNoCredentials(credentials, null, PROVIDER, MODEL, null, 500);
  assert.equal(res.status, 500);
});

test("combo: paused target answers a retryable 429 and selection passes to the next target", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const pausedTarget = pauseCooldownIfPaused(PROVIDER, "noauth");
  assert.ok(pausedTarget?.allRateLimited, "paused combo target must answer a cooldown, not null");
  assert.equal(pausedTarget?.lastErrorCode, 429);
  const pausedRes = handleNoCredentials(pausedTarget, null, PROVIDER, MODEL, null, null, [], true);
  assert.equal(pausedRes.status, 429);
  assert.ok(pausedRes.headers.get("Retry-After"), "paused combo target carries Retry-After");
  const pausedBody = (await pausedRes.json()) as { error?: { message?: string } };
  assert.ok(
    typeof pausedBody.error?.message === "string" &&
      pausedBody.error.message.includes("refusal pause"),
    "paused combo target names the refusal pause"
  );
  const retryAfterMs = Date.parse(pausedTarget?.retryAfter ?? "") - Date.now();
  assert.ok(
    retryAfterMs > 0 && retryAfterMs <= 3 * 60 * 1000 + 2000,
    `paused combo target Retry-After near the pause end, not a full 180 s wait (${retryAfterMs}ms)`
  );
  const fallback = checkFallbackError(
    pausedRes.status,
    pausedBody.error?.message ?? "",
    0,
    null,
    PROVIDER,
    pausedRes.headers
  );
  assert.equal(fallback.shouldFallback, true);
});
