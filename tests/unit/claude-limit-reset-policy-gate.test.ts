/**
 * "Auto-apply banked resets" — the Claude weekly session-reset gate.
 *
 * open-sse side: `handleClaudeUsageLimitResponse({ limitResetGate })`, the
 * `setClaudeLimitResetPolicy()` registration hook, `attemptClaudeLimitReset({ onSettled })`
 * and the executor wiring in `ClaudeUsageLimitGuard`.
 * src side: `createClaudeSessionResetPolicy()` — settings → decideBankedReset → audit rows.
 *
 * Feature disabled (or `claudeSessionReset` off) must leave today's per-account behavior
 * untouched; enabled, the account scope is the opt-in, dry-run and skip never claim, and a
 * failing gate never claims and never throws into the request path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-reset-gate-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const lowPriority = await import("../../open-sse/services/claudeLowPriority.ts");
const limitReset = await import("../../open-sse/services/claudeLimitReset.ts");
const { ClaudeUsageLimitGuard } = await import("../../open-sse/executors/claudeUsageLimit.ts");
const { createClaudeSessionResetPolicy } =
  await import("../../src/lib/usage/claudeSessionResetPolicy.ts");
const bankedResetAudit = await import("../../src/lib/usage/bankedResetAudit.ts");

type Attempt = Awaited<ReturnType<typeof limitReset.attemptClaudeLimitReset>>;

const NOW = Date.parse("2026-11-07T12:00:00.000Z");
const HOUR_MS = 3_600_000;
const SESSION_RESET_SECONDS = Math.floor((NOW + 3 * HOUR_MS) / 1000);
const TOKEN = "sk-ant-oat-test-token";
const CLAIM_PREFIX = "https://api.anthropic.com/api/organizations/";

function wall429Headers(extra: Record<string, string> = {}): Record<string, string> {
  return {
    "anthropic-ratelimit-unified-status": "rejected",
    "anthropic-ratelimit-unified-reset": String(SESSION_RESET_SECONDS),
    "anthropic-ratelimit-unified-representative-claim": "five_hour",
    ...extra,
  };
}

const OFF = { lowPriorityMode: false, autoLimitReset: false };
const AUTO_RESET_ON = { lowPriorityMode: false, autoLimitReset: true };

function counter(result: boolean | (() => never)) {
  const calls = { count: 0 };
  const fn = async () => {
    calls.count += 1;
    if (typeof result === "function") return result();
    return result;
  };
  return { calls, fn };
}

async function handleWall(opts: {
  config: { lowPriorityMode: boolean; autoLimitReset: boolean };
  gate?: () => Promise<boolean | null>;
  claim: () => Promise<boolean>;
  headers?: Record<string, string>;
}) {
  return lowPriority.handleClaudeUsageLimitResponse({
    key: "conn-a",
    config: opts.config,
    response: { status: 429, headers: opts.headers ?? wall429Headers() },
    wait: lowPriority.createClaudeLowPriorityWait(),
    claimLimitReset: opts.claim,
    limitResetGate: opts.gate,
    now: NOW,
  });
}

test.beforeEach(() => {
  lowPriority._resetClaudeLowPriorityState();
  limitReset._resetClaudeLimitResetMemo();
  limitReset.setClaudeLimitResetPolicy(null);
});

test.after(() => {
  limitReset.setClaudeLimitResetPolicy(null);
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── handleClaudeUsageLimitResponse: the gate ────────────────────────────────

test("gate returning null keeps today's per-account behavior (toggle off → no claim)", async () => {
  const claim = counter(true);
  const gate = counter(null as unknown as boolean);
  const decision = await handleWall({ config: OFF, gate: gate.fn, claim: claim.fn });
  assert.deepEqual(decision, { kind: "none" });
  assert.equal(claim.calls.count, 0);
});

test("gate returning null keeps today's per-account behavior (toggle on → claim)", async () => {
  const claim = counter(true);
  const decision = await handleWall({
    config: AUTO_RESET_ON,
    gate: async () => null,
    claim: claim.fn,
  });
  assert.deepEqual(decision, { kind: "retry", delayMs: 0, via: "limit-reset" });
  assert.equal(claim.calls.count, 1);
});

test("gate returning true opts the account in even with both per-account toggles off", async () => {
  const claim = counter(true);
  const decision = await handleWall({ config: OFF, gate: async () => true, claim: claim.fn });
  assert.deepEqual(decision, { kind: "retry", delayMs: 0, via: "limit-reset" });
  assert.equal(claim.calls.count, 1);
});

test("gate returning false never claims, even with the per-account toggle on", async () => {
  const claim = counter(true);
  const decision = await handleWall({
    config: AUTO_RESET_ON,
    gate: async () => false,
    claim: claim.fn,
  });
  assert.deepEqual(decision, { kind: "none" });
  assert.equal(claim.calls.count, 0);
});

test("a throwing gate never claims and never throws into the request path", async () => {
  const claim = counter(true);
  const decision = await handleWall({
    config: AUTO_RESET_ON,
    gate: async () => {
      throw new Error("settings unavailable");
    },
    claim: claim.fn,
  });
  assert.deepEqual(decision, { kind: "none" });
  assert.equal(claim.calls.count, 0);
});

test("gate is not consulted for a wall that blames a non-5h window", async () => {
  const claim = counter(true);
  const gate = counter(true);
  const decision = await handleWall({
    config: OFF,
    gate: gate.fn,
    claim: claim.fn,
    headers: wall429Headers({ "anthropic-ratelimit-unified-representative-claim": "seven_day" }),
  });
  assert.deepEqual(decision, { kind: "none" });
  assert.equal(gate.calls.count, 0);
  assert.equal(claim.calls.count, 0);
});

test("gate is not consulted for a non-wall 429 or a success", async () => {
  const gate = counter(true);
  const claim = counter(true);
  for (const response of [
    { status: 429, headers: { "retry-after": "3" } },
    { status: 200, headers: {} },
  ]) {
    const decision = await lowPriority.handleClaudeUsageLimitResponse({
      key: "conn-a",
      config: OFF,
      response,
      wait: lowPriority.createClaudeLowPriorityWait(),
      claimLimitReset: claim.fn,
      limitResetGate: gate.fn,
      now: NOW,
    });
    assert.deepEqual(decision, { kind: "none" });
  }
  assert.equal(gate.calls.count, 0);
  assert.equal(claim.calls.count, 0);
});

test("a denied gate still lets an opted-in slow lane activate", async () => {
  const claim = counter(true);
  const decision = await handleWall({
    config: { lowPriorityMode: true, autoLimitReset: false },
    gate: async () => false,
    claim: claim.fn,
    headers: wall429Headers({
      "anthropic-ratelimit-unified-slow-offer": "treatment",
      "anthropic-ratelimit-unified-reset": String(Math.floor(NOW / 1000) + 3600),
    }),
  });
  assert.deepEqual(decision, { kind: "retry", delayMs: 0, via: "low-priority-accepted" });
  assert.equal(claim.calls.count, 0);
});

// ── registration hook ───────────────────────────────────────────────────────

test("consultClaudeLimitResetPolicy: no policy → null; throwing policy → do not claim", async () => {
  const input = { connectionId: "conn-a", sessionResetAt: null, now: NOW };
  assert.equal(limitReset.hasClaudeLimitResetPolicy(), false);
  assert.equal(await limitReset.consultClaudeLimitResetPolicy(input), null);

  limitReset.setClaudeLimitResetPolicy(async () => {
    throw new Error("boom");
  });
  assert.equal(limitReset.hasClaudeLimitResetPolicy(), true);
  assert.deepEqual(await limitReset.consultClaudeLimitResetPolicy(input), { allow: false });

  limitReset.setClaudeLimitResetPolicy(async () => ({ allow: true }));
  assert.equal((await limitReset.consultClaudeLimitResetPolicy(input))?.allow, true);

  limitReset.setClaudeLimitResetPolicy(async () => null);
  assert.equal(await limitReset.consultClaudeLimitResetPolicy(input), null);
});

// ── attemptClaudeLimitReset: onSettled ──────────────────────────────────────

function mockClaimFetch(claimResult: string) {
  const calls: { url: string; method: string }[] = [];
  const fetchImpl = (async (input: unknown, init: RequestInit = {}) => {
    const url = String(input);
    calls.push({ url, method: init.method ?? "GET" });
    const body = url.startsWith(limitReset.CLAUDE_LIMIT_RESET_STATUS_URL)
      ? { juniper_tide: { eligible: true, arm: "reset", available: true } }
      : url.startsWith(CLAIM_PREFIX)
        ? { result: claimResult, next_available_at: "2026-11-14T00:00:00Z" }
        : null;
    if (!body) throw new Error(`unexpected fetch ${url}`);
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return { calls, fetchImpl };
}

test("onSettled: reported once by the request that ran the claim, shared by its siblings", async () => {
  const { calls, fetchImpl } = mockClaimFetch("reset");
  const settled: Attempt[] = [];
  const opts = {
    key: "conn-a",
    accessToken: TOKEN,
    providerSpecificData: { organizationUUID: "org-1" },
    now: NOW,
    fetchImpl,
    onSettled: (attempt: Attempt) => settled.push(attempt),
  };
  const results = await Promise.all([
    limitReset.attemptClaudeLimitReset(opts),
    limitReset.attemptClaudeLimitReset(opts),
    limitReset.attemptClaudeLimitReset(opts),
  ]);
  assert.ok(results.every((r) => r.reset));
  assert.equal(calls.filter((c) => c.method === "POST").length, 1);
  assert.equal(settled.length, 1, "exactly one report per real claim");
  assert.equal(settled[0].outcome, "reset");

  // The recent-reset shortcut and the memo are not claims: nothing reported.
  await limitReset.attemptClaudeLimitReset({ ...opts, now: NOW + 1_000 });
  await limitReset.attemptClaudeLimitReset({ ...opts, now: NOW + 120_000 });
  assert.equal(settled.length, 1);
});

test("onSettled: not called when no claim is made (reset not on offer)", async () => {
  const settled: Attempt[] = [];
  const fetchImpl = (async () =>
    new Response(JSON.stringify({ juniper_tide: { eligible: false, arm: "control" } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })) as typeof fetch;
  const attempt = await limitReset.attemptClaudeLimitReset({
    key: "conn-a",
    accessToken: TOKEN,
    now: NOW,
    fetchImpl,
    onSettled: (a) => settled.push(a),
  });
  assert.equal(attempt.outcome, "not_offered");
  assert.equal(settled.length, 0);
});

test("onSettled: a throwing reporter never breaks the attempt", async () => {
  const { fetchImpl } = mockClaimFetch("already_used");
  const attempt = await limitReset.attemptClaudeLimitReset({
    key: "conn-a",
    accessToken: TOKEN,
    providerSpecificData: { organizationUUID: "org-1" },
    now: NOW,
    fetchImpl,
    onSettled: () => {
      throw new Error("audit write failed");
    },
  });
  assert.equal(attempt.outcome, "already_used");
  assert.equal(attempt.reset, false);
});

// ── executor wiring (ClaudeUsageLimitGuard) ────────────────────────────────

const CREDENTIALS = {
  connectionId: "conn-a",
  accessToken: TOKEN,
  providerSpecificData: { organizationUUID: "org-1" },
};

async function guardWall(): Promise<boolean> {
  const guard = new ClaudeUsageLimitGuard("claude", null);
  guard.applyHeader({}, CREDENTIALS);
  return guard.shouldRetry(
    { status: 429, headers: new Headers(wall429Headers()) },
    "https://api.anthropic.com/v1/messages",
    { credentials: CREDENTIALS, sentSlow: false }
  );
}

async function withFetch<T>(fetchImpl: typeof fetch, run: () => Promise<T>): Promise<T> {
  const original = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    return await run();
  } finally {
    globalThis.fetch = original;
  }
}

test("guard: no registered policy and no toggle → no claim, no network (unchanged)", async () => {
  const { calls, fetchImpl } = mockClaimFetch("reset");
  const retry = await withFetch(fetchImpl, guardWall);
  assert.equal(retry, false);
  assert.equal(calls.length, 0);
});

test("guard: policy gets the connection and the wall's session reset; deny → no claim", async () => {
  const inputs: unknown[] = [];
  limitReset.setClaudeLimitResetPolicy(async (input) => {
    inputs.push(input);
    return { allow: false };
  });
  const { calls, fetchImpl } = mockClaimFetch("reset");
  const retry = await withFetch(fetchImpl, guardWall);
  assert.equal(retry, false);
  assert.equal(calls.length, 0);
  assert.equal(inputs.length, 1);
  const input = inputs[0] as { connectionId: string; sessionResetAt: string; now: number };
  assert.equal(input.connectionId, "conn-a");
  assert.equal(input.sessionResetAt, new Date(SESSION_RESET_SECONDS * 1000).toISOString());
  assert.equal(typeof input.now, "number");
});

test("guard: policy allow → claims once and reports the outcome once", async () => {
  const settled: Attempt[] = [];
  limitReset.setClaudeLimitResetPolicy(async () => ({
    allow: true,
    onSettled: (attempt) => settled.push(attempt),
  }));
  const { calls, fetchImpl } = mockClaimFetch("reset");
  const retry = await withFetch(fetchImpl, guardWall);
  assert.equal(retry, true);
  assert.equal(calls.filter((c) => c.method === "POST").length, 1);
  assert.equal(settled.length, 1);
  assert.equal(settled[0].reset, true);
});

test("guard: a throwing policy never claims and never throws", async () => {
  limitReset.setClaudeLimitResetPolicy(async () => {
    throw new Error("db locked");
  });
  const { calls, fetchImpl } = mockClaimFetch("reset");
  const retry = await withFetch(fetchImpl, guardWall);
  assert.equal(retry, false);
  assert.equal(calls.length, 0);
});

// ── src policy: createClaudeSessionResetPolicy ──────────────────────────────

type AuditEntry = {
  action: string;
  target?: string;
  resourceType?: string;
  status?: string;
  details?: unknown;
};

type WindowStatus = {
  remainingPercentage: number;
  usedPercentage: number;
  resetAt: string | null;
  reachedThreshold: boolean;
};

function windowStatus(usedPercentage: number, resetInMs: number | null): WindowStatus {
  return {
    usedPercentage,
    remainingPercentage: 100 - usedPercentage,
    resetAt: resetInMs === null ? null : new Date(NOW + resetInMs).toISOString(),
    reachedThreshold: usedPercentage >= 99,
  };
}

function createPolicyHarness(
  feature: Record<string, unknown> | undefined,
  opts: {
    rows?: { action: string; target: string; status: string; timestamp: string }[];
    windows?: Record<string, Partial<Record<"session" | "weekly", WindowStatus | null>>>;
    connections?: { id: string; provider: string; authType: string }[];
    failSettings?: boolean;
  } = {}
) {
  // Each harness is a fresh world: an allowed verdict whose onSettled a test never calls
  // would otherwise keep its in-process slot reserved into the next harness.
  bankedResetAudit._resetBankedResetReservations();
  const audit: AuditEntry[] = [];
  const webhooks: { event: string; data: Record<string, unknown> }[] = [];
  const calls = { settings: 0, connections: 0, windows: 0, rows: 0 };
  const windows = opts.windows ?? {
    "conn-a": { session: windowStatus(100, 3 * HOUR_MS), weekly: windowStatus(40, 72 * HOUR_MS) },
  };
  const policy = createClaudeSessionResetPolicy({
    getSettings: async () => {
      calls.settings += 1;
      if (opts.failSettings) throw new Error("settings read failed");
      return feature === undefined ? {} : { bankedResetAutoApply: feature };
    },
    getProviderConnections: async () => {
      calls.connections += 1;
      return (
        opts.connections ?? [
          { id: "conn-a", provider: "claude", authType: "oauth" },
          { id: "conn-b", provider: "claude", authType: "oauth" },
        ]
      );
    },
    getQuotaWindowStatus: (id, window) => {
      calls.windows += 1;
      return windows[id]?.[window] ?? null;
    },
    readAuditRows: () => {
      calls.rows += 1;
      return opts.rows ?? [];
    },
    sinks: {
      logAuditEvent: (entry) => audit.push(entry),
      notifyWebhookEvent: (event, data) => webhooks.push({ event, data }),
    },
  });
  return { policy, audit, webhooks, calls };
}

const SESSION_RESET_AT = new Date(SESSION_RESET_SECONDS * 1000).toISOString();
const WALL = { connectionId: "conn-a", sessionResetAt: SESSION_RESET_AT, now: NOW };
const ENABLED = {
  enabled: true,
  mode: "eager",
  creditTypes: { claudeSessionReset: true },
};

test("policy: feature disabled → null (today's behavior) and nothing else is read", async () => {
  for (const feature of [
    undefined,
    { enabled: false, creditTypes: { claudeSessionReset: true } },
  ]) {
    const h = createPolicyHarness(feature);
    assert.equal(await h.policy(WALL), null);
    assert.equal(h.calls.connections + h.calls.windows + h.calls.rows, 0);
    assert.equal(h.audit.length, 0);
  }
});

test("policy: claudeSessionReset off → null (today's behavior)", async () => {
  const h = createPolicyHarness({ enabled: true, mode: "eager" });
  assert.equal(await h.policy(WALL), null, "claudeSessionReset defaults to off");
  const h2 = createPolicyHarness({ ...ENABLED, creditTypes: { claudeSessionReset: false } });
  assert.equal(await h2.policy(WALL), null);
});

test("policy: enabled → account scope is the opt-in", async () => {
  const outOfScope = createPolicyHarness({ ...ENABLED, accountScope: "selected" });
  assert.deepEqual(await outOfScope.policy(WALL), { allow: false });
  const excluded = createPolicyHarness({ ...ENABLED, connections: { "conn-a": false } });
  assert.deepEqual(await excluded.policy(WALL), { allow: false });
  const selected = createPolicyHarness({
    ...ENABLED,
    accountScope: "selected",
    connections: { "conn-a": true },
  });
  assert.equal((await selected.policy(WALL))?.allow, true);
  assert.equal(outOfScope.audit.length + excluded.audit.length + selected.audit.length, 0);
});

test("policy: eager allow → success report writes one audit row and fires the webhook", async () => {
  const h = createPolicyHarness(ENABLED);
  const verdict = await h.policy(WALL);
  assert.equal(verdict?.allow, true);
  assert.equal(h.audit.length, 0, "nothing is recorded before the claim settles");
  verdict?.onSettled?.({ reset: true, outcome: "reset", nextAvailableAt: null });
  assert.equal(h.audit.length, 1);
  assert.deepEqual(h.audit[0], {
    action: "bankedReset.redeem",
    actor: "system",
    target: "conn-a",
    resourceType: "provider_connection",
    status: "success",
    details: {
      provider: "claude",
      creditType: "claudeSessionReset",
      mode: "eager",
      trigger: "walled-session",
      reason: "walled-session",
    },
  });
  assert.equal(h.webhooks.length, 1);
  assert.equal(h.webhooks[0].event, "provider.reset_redeemed");
  assert.equal(h.webhooks[0].data.connectionId, "conn-a");
  assert.equal(JSON.stringify(h.webhooks[0].data).includes(TOKEN), false);
});

test("policy: a failed claim writes a failed row and no webhook", async () => {
  const h = createPolicyHarness(ENABLED);
  const verdict = await h.policy(WALL);
  verdict?.onSettled?.({ reset: false, outcome: "already_used", nextAvailableAt: null });
  assert.equal(h.audit.length, 1);
  assert.equal(h.audit[0].status, "failed");
  assert.equal((h.audit[0].details as { reason: string }).reason, "already_used");
  assert.equal(h.webhooks.length, 0);
});

test("policy: dry-run never claims but records one dry-run row", async () => {
  const h = createPolicyHarness({ ...ENABLED, mode: "dry-run" });
  const verdict = await h.policy(WALL);
  assert.equal(verdict?.allow, false);
  assert.equal(h.audit.length, 1);
  assert.equal(h.audit[0].status, "dry-run");
  assert.equal(h.audit[0].target, "conn-a");
  assert.equal((h.audit[0].details as { mode: string }).mode, "dry-run");
  assert.equal(h.webhooks.length, 0);
});

test("policy: skip decisions never claim and are not audited", async () => {
  // Session resets naturally within the 90-minute guard.
  const soon = createPolicyHarness(ENABLED);
  const soonVerdict = await soon.policy({
    ...WALL,
    sessionResetAt: new Date(NOW + 30 * 60_000).toISOString(),
  });
  assert.deepEqual(soonVerdict, { allow: false });

  // Weekly window unknown → fail closed.
  const unknownWeekly = createPolicyHarness(ENABLED, {
    windows: { "conn-a": { session: windowStatus(100, 3 * HOUR_MS), weekly: null } },
  });
  assert.deepEqual(await unknownWeekly.policy(WALL), { allow: false });

  assert.equal(soon.audit.length + unknownWeekly.audit.length, 0);
});

test("policy: caps are counted from the audit rows of the last 24 h", async () => {
  const recent = new Date(NOW - 2 * HOUR_MS).toISOString();
  const capped = createPolicyHarness(ENABLED, {
    rows: [
      { action: "bankedReset.redeem", target: "conn-a", status: "success", timestamp: recent },
    ],
  });
  assert.deepEqual(await capped.policy(WALL), { allow: false }, "maxPerAccountPerDay = 1");

  const old = new Date(NOW - 25 * HOUR_MS).toISOString();
  const expired = createPolicyHarness(ENABLED, {
    rows: [{ action: "bankedReset.redeem", target: "conn-a", status: "success", timestamp: old }],
  });
  assert.equal((await expired.policy(WALL))?.allow, true);

  // A failed attempt is not a redemption; a dry-run row only counts in dry-run mode.
  const notCounted = createPolicyHarness(ENABLED, {
    rows: [
      { action: "bankedReset.redeem", target: "conn-a", status: "failed", timestamp: recent },
      { action: "bankedReset.redeem", target: "conn-a", status: "dry-run", timestamp: recent },
    ],
  });
  assert.equal((await notCounted.policy(WALL))?.allow, true);
  const dryRunCapped = createPolicyHarness(
    { ...ENABLED, mode: "dry-run" },
    {
      rows: [
        { action: "bankedReset.redeem", target: "conn-a", status: "dry-run", timestamp: recent },
      ],
    }
  );
  assert.deepEqual(await dryRunCapped.policy(WALL), { allow: false });
  assert.equal(dryRunCapped.audit.length, 0);
});

test("policy: last-resort skips while another in-scope Claude account has headroom", async () => {
  const windows = {
    "conn-a": { session: windowStatus(100, 3 * HOUR_MS), weekly: windowStatus(40, 72 * HOUR_MS) },
    "conn-b": { session: windowStatus(20, 3 * HOUR_MS), weekly: windowStatus(20, 72 * HOUR_MS) },
  };
  const h = createPolicyHarness({ ...ENABLED, mode: "last-resort" }, { windows });
  assert.deepEqual(await h.policy(WALL), { allow: false });

  const outOfPool = createPolicyHarness(
    { ...ENABLED, mode: "last-resort", connections: { "conn-b": false } },
    { windows }
  );
  assert.equal((await outOfPool.policy(WALL))?.allow, true, "out-of-scope accounts are no pool");
});

test("policy: unknown connection or a failing read never claims", async () => {
  const h = createPolicyHarness(ENABLED);
  assert.deepEqual(await h.policy({ ...WALL, connectionId: null }), { allow: false });
  const failing = createPolicyHarness(ENABLED, { failSettings: true });
  assert.deepEqual(await failing.policy(WALL), { allow: false });
});
