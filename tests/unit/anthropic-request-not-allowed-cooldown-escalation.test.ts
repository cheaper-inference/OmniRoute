/**
 * #12859 end-to-end through the real chat route: an Anthropic OAuth
 * `403 "Request not allowed"` must not ban the `claude` connection.
 *
 * Contract after #18574 (owner decision, 2026-11-04 — supersedes the "banned on
 * the 3rd consecutive refusal" rung of #12864): the refusal answers *what was
 * asked*, so the streak is scoped to connection + model and the exclusion is a
 * MODEL lockout (`lockModel`), never a connection-level state. The connection
 * stays `active` (no `unavailable`, no `rateLimitedUntil`, never `banned`); the
 * model leaves the rotation for 5 min, then 15 min, then the capped 1 h rung
 * (`REQUEST_REJECTED_MAX_COOLDOWN_MS`) on the 3rd consecutive refusal. A burst of
 * requests while the model is already excluded is one episode, and a healthy
 * response on the model resets the streak. Any other claude 403 keeps the
 * previous behaviour (banned on the first one).
 *
 * Pattern mirrors tests/unit/probe-gate-autodisable.test.ts: temp DATA_DIR,
 * real SQLite, `globalThis.fetch` mocked as the upstream. The model id must
 * exist in the catalog (src/shared/constants/modelSpecs.ts).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rr-escalation-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { buildInternalChatRequest } = await import("../../src/lib/api/modelTestRunner.ts");
const chatRouteModule = await import("../../src/app/api/v1/chat/completions/route.ts");
const postChatCompletion = chatRouteModule.POST;
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const {
  __resetRequestRejectedStreaksForTests,
  __setRequestRejectedClockForTests,
  hasRequestRejectedStreak,
  REQUEST_REJECTED_MAX_COOLDOWN_MS,
} = await import("../../open-sse/services/requestRejectedStreak.ts");
const { isModelLocked, getModelLockoutInfo, clearModelLock, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const { COOLDOWN_MS } = await import("../../open-sse/config/errorConfig.ts");

const originalFetch = globalThis.fetch;
const MODEL = "claude/claude-sonnet-5";
// What chatCore hands to lockModel / the streak: provider id + bare model id.
const LOCK_PROVIDER = "claude";
const LOCK_MODEL = "claude-sonnet-5";

// The streak's own clock is advanced when a test "elapses" a cooldown, so the
// in-memory episode boundary moves together with the DB row.
let clockOffsetMs = 0;

test.beforeEach(() => {
  resetAllCircuitBreakers();
  __resetRequestRejectedStreaksForTests();
  clearAllModelLockouts();
  clockOffsetMs = 0;
  __setRequestRejectedClockForTests(() => Date.now() + clockOffsetMs);
  invalidateDbCache("connections");
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Row = Record<string, unknown> | undefined;

function readRow(connId: string): Row {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { get: (id: string) => Record<string, unknown> | undefined };
  };
  return db
    .prepare(
      "SELECT is_active, test_status, rate_limited_until, last_error, last_error_type, last_error_at, error_code FROM provider_connections WHERE id = ?"
    )
    .get(connId);
}

async function createClaudeConnection(): Promise<string> {
  const conn = await createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "rr-escalation",
    accessToken: "claude-oauth-access", // pragma: allowlist secret
    refreshToken: "claude-oauth-refresh", // pragma: allowlist secret
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    isActive: true,
    testStatus: "active",
  });
  return String((conn as { id: string }).id);
}

let upstreamCalls = 0;

function mockAnthropic403(message: string): void {
  globalThis.fetch = (async () => {
    upstreamCalls += 1;
    return new Response(
      JSON.stringify({ type: "error", error: { type: "permission_error", message } }),
      { status: 403, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;
}

function mockAnthropic200(): void {
  globalThis.fetch = (async () => {
    upstreamCalls += 1;
    return new Response(
      JSON.stringify({
        id: "msg_test",
        type: "message",
        role: "assistant",
        model: "claude-sonnet-5",
        content: [{ type: "text", text: "OK" }],
        stop_reason: "end_turn",
        stop_sequence: null,
        usage: { input_tokens: 1, output_tokens: 1 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;
}

async function sendOnce(connId: string): Promise<Response> {
  return postChatCompletion(
    buildInternalChatRequest(
      { model: MODEL, messages: [{ role: "user", content: "hi" }], stream: false },
      new AbortController().signal,
      connId
    )
  );
}

/**
 * The refusal excluded the MODEL, not the connection: the row stays active with
 * no cooldown fields, the refusal is only recorded for the dashboard, and the
 * model lockout carries the expected remaining time.
 */
function assertModelCoolingDown(connId: string, expectedMs: number, label: string) {
  const row = readRow(connId);
  assert.equal(row?.is_active, 1, `${label}: connection stays active`);
  assert.equal(row?.test_status, "active", `${label}: connection is not cooled down or banned`);
  assert.equal(row?.rate_limited_until, null, `${label}: no connection-wide cooldown`);
  assert.equal(row?.last_error_type, "request_rejected", `${label}: error type`);
  assert.equal(Number(row?.error_code), 403, `${label}: error code`);
  assert.equal(typeof row?.last_error_at, "string", `${label}: last_error_at written`);
  assert.equal(isModelLocked(LOCK_PROVIDER, connId, LOCK_MODEL), true, `${label}: model locked`);
  const info = getModelLockoutInfo(LOCK_PROVIDER, connId, LOCK_MODEL);
  assert.equal(info?.reason, "request_rejected", `${label}: lockout reason`);
  const ms = info?.remainingMs ?? 0;
  assert.ok(
    Math.abs(ms - expectedMs) < 30_000,
    `${label}: model cooldown ≈ ${expectedMs / 60000}min expected, got ${Math.round(ms / 1000)}s`
  );
}

/** What lockout expiry does once the window has elapsed — not a success. */
async function elapseCooldown(connId: string, cooldownMs: number) {
  clockOffsetMs += cooldownMs + 1000;
  clearModelLock(LOCK_PROVIDER, connId, LOCK_MODEL);
  invalidateDbCache("connections");
}

test("claude 403 'Request not allowed': model out 5 min, then 15 min, then 1 h — connection never banned (#18574)", async () => {
  const connId = await createClaudeConnection();
  mockAnthropic403("Request not allowed");

  const first = await sendOnce(connId);
  assert.notEqual(first.status, 200);
  assertModelCoolingDown(connId, COOLDOWN_MS.requestRejected, "1st refusal");

  await elapseCooldown(connId, COOLDOWN_MS.requestRejected);
  await sendOnce(connId);
  assertModelCoolingDown(connId, COOLDOWN_MS.requestRejectedRepeat, "2nd refusal");

  await elapseCooldown(connId, COOLDOWN_MS.requestRejectedRepeat);
  await sendOnce(connId);
  // The 3rd consecutive refusal used to ban the connection (#12864). Now it is
  // the longest rung of the ladder: a capped cooldown on the model, nothing terminal.
  assertModelCoolingDown(connId, REQUEST_REJECTED_MAX_COOLDOWN_MS, "3rd refusal");
  const row = readRow(connId);
  assert.notEqual(row?.test_status, "banned", "3rd consecutive refusal: never terminal");
  assert.equal(row?.is_active, 1);
  assert.equal(
    hasRequestRejectedStreak(connId, LOCK_MODEL),
    true,
    "the streak keeps counting; it is not cleared by a ban"
  );
});

test("requests arriving while the model is already excluded are one episode, not new refusals", async () => {
  const connId = await createClaudeConnection();
  mockAnthropic403("Request not allowed");
  upstreamCalls = 0;

  await sendOnce(connId);
  assertModelCoolingDown(connId, COOLDOWN_MS.requestRejected, "1st refusal");
  // The mocked fetch also serves auxiliary calls (identity bootstrap), so only
  // the delta matters below.
  const callsAfterFirst = upstreamCalls;
  const lockedUntilAfterFirst =
    Date.now() + (getModelLockoutInfo(LOCK_PROVIDER, connId, LOCK_MODEL)?.remainingMs ?? 0);

  // Follow-ups pinned to the same connection all get the 403 (or are turned
  // away by the model lockout) while the cooldown is running — like parallel
  // sessions that were in flight when the first 403 came back. They are one
  // episode: the lockout is not extended and, above all, three of them must
  // not escalate the ladder.
  for (let i = 0; i < 3; i += 1) await sendOnce(connId);
  const afterBurst = readRow(connId);
  assert.ok(
    upstreamCalls > callsAfterFirst,
    "the burst did reach the upstream (pinned connection)"
  );
  assert.equal(afterBurst?.test_status, "active", "connection untouched by the burst");
  assert.equal(afterBurst?.is_active, 1);
  assert.equal(afterBurst?.rate_limited_until, null);
  const lockedUntilAfterBurst =
    Date.now() + (getModelLockoutInfo(LOCK_PROVIDER, connId, LOCK_MODEL)?.remainingMs ?? 0);
  assert.ok(
    Math.abs(lockedUntilAfterBurst - lockedUntilAfterFirst) < 5_000,
    "model lockout unchanged by the burst"
  );
  assert.equal(hasRequestRejectedStreak(connId, LOCK_MODEL), true, "streak still open at 1");

  // Once the cooldown has elapsed, the next refusal is the 2nd of the streak.
  await elapseCooldown(connId, COOLDOWN_MS.requestRejected);
  await sendOnce(connId);
  assertModelCoolingDown(connId, COOLDOWN_MS.requestRejectedRepeat, "2nd episode");
});

test("a successful response resets the streak — sporadic refusals never accumulate", async () => {
  const connId = await createClaudeConnection();
  mockAnthropic403("Request not allowed");
  await sendOnce(connId);
  assertModelCoolingDown(connId, COOLDOWN_MS.requestRejected, "1st refusal");

  await elapseCooldown(connId, COOLDOWN_MS.requestRejected);
  mockAnthropic200();
  const ok = await sendOnce(connId);
  assert.equal(ok.status, 200, "healthy response goes through");
  assert.equal(hasRequestRejectedStreak(connId, LOCK_MODEL), false, "success clears the streak");
  const clean = readRow(connId);
  assert.equal(clean?.test_status, "active");
  assert.equal(clean?.rate_limited_until, null);

  mockAnthropic403("Request not allowed");
  await sendOnce(connId);
  assertModelCoolingDown(connId, COOLDOWN_MS.requestRejected, "refusal after success");
});

test("any other claude 403 still bans on the first response (regression guard)", async () => {
  const connId = await createClaudeConnection();
  mockAnthropic403("Your organization has been disabled.");
  await sendOnce(connId);
  const row = readRow(connId);
  assert.equal(row?.test_status, "banned");
  assert.equal(row?.is_active, 0);
});
