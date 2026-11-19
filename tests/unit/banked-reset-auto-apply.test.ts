/**
 * "Auto-apply banked resets" — the background job (src/lib/services/bankedResetAutoApply.ts).
 *
 * Every external effect is an injected dep and the clock is injected, so these tests run
 * without timers, DB or network: only walled accounts get their credits listed (plus a
 * memoised expiring-credit scan), at most one redemption per tick, idempotency keys,
 * caps from the audit history, a 1 h failure backoff, single-flight and disabled = no calls.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-banked-reset-job-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const job = await import("../../src/lib/services/bankedResetAutoApply.ts");

test.after(() => fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }));

const NOW = Date.parse("2026-11-07T12:00:00.000Z");
const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const iso = (ms: number) => new Date(ms).toISOString();

type Provider = "codex" | "claude";
type WindowStatus = {
  remainingPercentage: number;
  usedPercentage: number;
  resetAt: string | null;
  reachedThreshold: boolean;
};
type Credit = {
  selectionToken: string;
  resetType?: string;
  expiresAt?: string | null;
  usableNow?: boolean;
  resetsLeft?: number;
};
type AuditRow = { action: string; target: string; status: string; timestamp: string };
type AuditEntry = { action: string; target?: string; status?: string; details?: unknown };

function windowAt(usedPercentage: number, resetAt: number | null): WindowStatus {
  return {
    usedPercentage,
    remainingPercentage: 100 - usedPercentage,
    resetAt: resetAt === null ? null : iso(resetAt),
    reachedThreshold: usedPercentage >= 99,
  };
}

/** Session walled, resets in 3 h; weekly half used. */
function walledSession(now = NOW) {
  return { session: windowAt(100, now + 3 * HOUR_MS), weekly: windowAt(50, now + 72 * HOUR_MS) };
}

function idle(used = 10, now = NOW) {
  return { session: windowAt(used, now + 3 * HOUR_MS), weekly: windowAt(used, now + 72 * HOUR_MS) };
}

interface WorldOptions {
  feature?: Record<string, unknown>;
  connections?: { id: string; provider: Provider; authType?: string }[];
  windows?: Record<string, { session?: WindowStatus | null; weekly?: WindowStatus | null }>;
  credits?: Record<string, Credit[]>;
  rows?: AuditRow[];
  leased?: string[];
  redeemFails?: boolean;
}

function createWorld(options: WorldOptions = {}) {
  const calls = {
    settings: 0,
    connections: 0,
    windows: 0,
    lease: 0,
    throttle: 0,
    rows: 0,
    list: [] as string[],
    redeem: [] as { provider: Provider; id: string; key: string; creditId: string }[],
  };
  const audit: AuditEntry[] = [];
  const webhooks: { event: string; data: Record<string, unknown> }[] = [];
  const world = {
    feature: options.feature,
    connections: options.connections ?? [{ id: "conn-a", provider: "codex" as Provider }],
    windows: options.windows ?? { "conn-a": walledSession() },
    credits: options.credits ?? {
      "conn-a": [
        { selectionToken: "credit-late", expiresAt: iso(NOW + 96 * HOUR_MS) },
        { selectionToken: "credit-soon", expiresAt: iso(NOW + 48 * HOUR_MS) },
      ],
    },
    rows: options.rows ?? [],
    redeemFails: options.redeemFails ?? false,
  };
  const deps = {
    getSettings: async () => {
      calls.settings += 1;
      return world.feature ? { bankedResetAutoApply: world.feature } : {};
    },
    getProviderConnections: async (filter: Record<string, unknown>) => {
      calls.connections += 1;
      return world.connections
        .filter((c) => c.provider === filter.provider)
        .map((c) => ({ authType: "oauth", isActive: true, ...c }));
    },
    getQuotaWindowStatus: (id: string, window: "session" | "weekly") => {
      calls.windows += 1;
      return world.windows[id]?.[window] ?? null;
    },
    isConnectionUnavailableToAuxiliaryActivity: async (id: string) => {
      calls.lease += 1;
      return (options.leased ?? []).includes(id);
    },
    throttleQuotaFetch: async () => {
      calls.throttle += 1;
    },
    listCredits: async (_provider: Provider, id: string) => {
      calls.list.push(id);
      const credits = world.credits[id] ?? [];
      return { availableCount: credits.length, credits };
    },
    redeemCredit: async (provider: Provider, id: string, key: string, creditId: string) => {
      calls.redeem.push({ provider, id, key, creditId });
      if (world.redeemFails) {
        throw Object.assign(new Error("upstream said no for sk-secret-token"), {
          code: "codex_reset_credit_upstream_error",
        });
      }
      return { outcome: "reset" };
    },
    readAuditRows: () => {
      calls.rows += 1;
      return world.rows;
    },
    sinks: {
      logAuditEvent: (entry: AuditEntry) => {
        audit.push(entry);
        world.rows.push({
          action: entry.action,
          target: entry.target ?? "",
          status: entry.status ?? "",
          timestamp: iso(NOW),
        });
      },
      notifyWebhookEvent: (event: string, data: Record<string, unknown>) =>
        webhooks.push({ event, data }),
    },
  };
  const state = job.createBankedResetAutoApplyState();
  const tick = (now = NOW) => job.runBankedResetAutoApplyTick(deps, state, () => now);
  return { world, deps, state, calls, audit, webhooks, tick };
}

const EAGER = { enabled: true, mode: "eager", minSpacingMinutes: 0 };

test("disabled → zero calls beyond reading the settings", async () => {
  for (const feature of [undefined, { enabled: false, mode: "eager" }]) {
    const w = createWorld({ feature });
    await w.tick();
    assert.equal(w.calls.settings, 1);
    assert.equal(w.calls.connections + w.calls.windows + w.calls.lease + w.calls.rows, 0);
    assert.equal(w.calls.throttle + w.calls.list.length + w.calls.redeem.length, 0);
    assert.equal(w.audit.length + w.webhooks.length, 0);
  }
});

test("only walled accounts get their credits listed; the soonest-expiring credit is redeemed", async () => {
  const w = createWorld({
    feature: EAGER,
    connections: [
      { id: "conn-a", provider: "codex" },
      { id: "conn-b", provider: "codex" },
    ],
    windows: { "conn-a": walledSession(), "conn-b": idle() },
    credits: {
      "conn-a": [
        { selectionToken: "credit-late", expiresAt: iso(NOW + 96 * HOUR_MS) },
        { selectionToken: "credit-soon", expiresAt: iso(NOW + 48 * HOUR_MS) },
      ],
      "conn-b": [{ selectionToken: "credit-b", expiresAt: iso(NOW + 2 * HOUR_MS) }],
    },
  });
  await w.tick();
  assert.deepEqual(w.calls.list, ["conn-a"]);
  assert.ok(w.calls.throttle >= 1, "listing goes through the quota-fetch throttle");
  assert.deepEqual(w.calls.redeem, [
    {
      provider: "codex",
      id: "conn-a",
      key: "auto-reset:conn-a:2026-11-07:1",
      creditId: "credit-soon",
    },
  ]);
  assert.equal(w.audit.length, 1);
  assert.deepEqual(w.audit[0], {
    action: "bankedReset.redeem",
    actor: "system",
    target: "conn-a",
    resourceType: "provider_connection",
    status: "success",
    details: {
      provider: "codex",
      creditType: "codexCredits",
      mode: "eager",
      trigger: "walled-session",
      reason: "walled-session",
    },
  });
  assert.equal(w.webhooks.length, 1);
  assert.equal(w.webhooks[0].event, "provider.reset_redeemed");
  assert.equal(JSON.stringify(w.audit).includes("credit-soon"), false, "no credit ids in audit");
});

test("weekly wins when both windows are walled", async () => {
  const w = createWorld({
    feature: EAGER,
    windows: {
      "conn-a": {
        session: windowAt(100, NOW + 3 * HOUR_MS),
        weekly: windowAt(100, NOW + 72 * HOUR_MS),
      },
    },
  });
  await w.tick();
  assert.equal(w.calls.redeem.length, 1);
  assert.equal((w.audit[0].details as { trigger: string }).trigger, "walled-weekly");
});

test("at most one redemption per tick", async () => {
  const w = createWorld({
    // maxPerAccountPerDay stays 1, so the next tick moves on to the other walled account.
    feature: { ...EAGER, maxPerDay: 10 },
    connections: [
      { id: "conn-a", provider: "codex" },
      { id: "conn-b", provider: "codex" },
    ],
    windows: { "conn-a": walledSession(), "conn-b": walledSession() },
    credits: {
      "conn-a": [{ selectionToken: "credit-a", expiresAt: null }],
      "conn-b": [{ selectionToken: "credit-b", expiresAt: null }],
    },
  });
  await w.tick();
  assert.equal(w.calls.redeem.length, 1);
  assert.equal(w.calls.redeem[0].id, "conn-a");
  await w.tick(NOW + MINUTE_MS);
  assert.equal(w.calls.redeem.length, 2);
  assert.equal(w.calls.redeem[1].id, "conn-b");
});

test("idempotency key counts today's successful redemptions of the account", async () => {
  const w = createWorld({
    feature: { ...EAGER, maxPerAccountPerDay: 3 },
    rows: [
      {
        action: "bankedReset.redeem",
        target: "conn-a",
        status: "success",
        timestamp: iso(NOW - 2 * HOUR_MS),
      },
      // Yesterday (still inside 24 h) and a failure do not bump today's counter.
      {
        action: "bankedReset.redeem",
        target: "conn-a",
        status: "success",
        timestamp: "2026-11-06T20:00:00.000Z",
      },
      {
        action: "bankedReset.redeem",
        target: "conn-a",
        status: "failed",
        timestamp: iso(NOW - HOUR_MS),
      },
    ],
  });
  await w.tick();
  assert.equal(w.calls.redeem.length, 1);
  assert.equal(w.calls.redeem[0].key, "auto-reset:conn-a:2026-11-07:2");
});

test("caps from history: a reached cap means no listing and no redemption", async () => {
  const recent = iso(NOW - HOUR_MS);
  const w = createWorld({
    feature: { ...EAGER, maxPerDay: 1 },
    rows: [
      { action: "bankedReset.redeem", target: "conn-z", status: "success", timestamp: recent },
    ],
  });
  await w.tick();
  assert.equal(w.calls.list.length, 0);
  assert.equal(w.calls.redeem.length, 0);
  assert.equal(w.audit.length, 0, "skip decisions are not audited");

  const spaced = createWorld({
    feature: { ...EAGER, maxPerDay: 5, minSpacingMinutes: 120 },
    rows: [
      { action: "bankedReset.redeem", target: "conn-z", status: "success", timestamp: recent },
    ],
  });
  await spaced.tick();
  assert.equal(spaced.calls.redeem.length, 0);
});

test("a failed redemption is audited without secrets and backs the account off for 1 h", async () => {
  const w = createWorld({ feature: { ...EAGER, maxPerAccountPerDay: 5 }, redeemFails: true });
  await w.tick();
  assert.equal(w.calls.redeem.length, 1);
  assert.equal(w.audit.length, 1);
  assert.equal(w.audit[0].status, "failed");
  assert.equal(
    (w.audit[0].details as { reason: string }).reason,
    "codex_reset_credit_upstream_error"
  );
  assert.equal(JSON.stringify(w.audit).includes("sk-secret-token"), false);
  assert.equal(w.webhooks.length, 0, "webhook only on success");

  await w.tick(NOW + 10 * MINUTE_MS);
  await w.tick(NOW + 59 * MINUTE_MS);
  assert.equal(w.calls.redeem.length, 1, "backed off for an hour");
  assert.equal(w.calls.list.length, 1);

  w.world.redeemFails = false;
  w.world.windows["conn-a"] = walledSession(NOW + 61 * MINUTE_MS);
  await w.tick(NOW + 61 * MINUTE_MS);
  assert.equal(w.calls.redeem.length, 2);
});

/**
 * Redeem once with `error` thrown, then again after the 1 h backoff with the redemption
 * succeeding. maxPerAccountPerDay = 1, so the second attempt only happens when the first
 * row does not count toward the caps.
 */
async function redeemTwiceAfterError(error: unknown) {
  const w = createWorld({ feature: { ...EAGER, maxPerAccountPerDay: 1 } });
  const redeem = w.deps.redeemCredit;
  w.deps.redeemCredit = async (provider: Provider, id: string, key: string, creditId: string) => {
    await redeem(provider, id, key, creditId);
    throw error;
  };
  await w.tick();
  w.deps.redeemCredit = redeem;
  w.world.windows["conn-a"] = walledSession(NOW + 61 * MINUTE_MS);
  await w.tick(NOW + 61 * MINUTE_MS);
  return w;
}

test("a redemption whose outcome is unknown is recorded as unknown and counts toward the caps", async () => {
  const unknown = [
    // Claude: the claim POST timed out, the network failed or the status was unexpected.
    Object.assign(new Error("Reset credit claim failed: error"), {
      code: "claim_error",
      status: 502,
    }),
    // Codex: the consume POST threw (timeout / network) and was wrapped.
    Object.assign(new Error("The operation was aborted due to timeout"), {
      code: "codex_reset_credit_failed",
      status: 500,
    }),
    // Codex: the consume answered 5xx, or 2xx with a body nobody can read.
    Object.assign(new Error("Codex reset-credit API returned HTTP 504."), {
      code: "codex_reset_credit_upstream_error",
      status: 504,
    }),
    Object.assign(new Error("Codex returned an unknown reset-credit response."), {
      code: "unknown_reset_credit_response",
      status: 502,
    }),
    // Not a typed reset-credit error at all: nothing says the credit was not spent.
    new DOMException("The operation was aborted due to timeout", "TimeoutError"),
    new TypeError("fetch failed"),
  ];
  for (const error of unknown) {
    const w = await redeemTwiceAfterError(error);
    const label = String((error as { code?: unknown }).code ?? (error as Error).name);
    assert.equal(w.audit.length, 1, label);
    assert.equal(w.audit[0].status, "unknown", label);
    assert.equal(w.webhooks.length, 0, `${label}: webhook only on success`);
    assert.equal(w.calls.redeem.length, 1, `${label}: the unknown outcome holds the daily cap`);
  }
});

test("a definite refusal stays failed and does not count toward the caps", async () => {
  const definite = [
    Object.assign(new Error("already used"), { code: "already_used", status: 409 }),
    Object.assign(new Error("no credit"), { code: "no_credit", status: 409 }),
    Object.assign(new Error("ineligible"), { code: "ineligible", status: 403 }),
    Object.assign(new Error("HTTP 400"), {
      code: "codex_reset_credit_upstream_error",
      status: 400,
    }),
    Object.assign(new Error("claim refused"), { code: "claim_unavailable", status: 502 }),
  ];
  for (const error of definite) {
    const w = await redeemTwiceAfterError(error);
    const label = (error as { code: string }).code;
    assert.equal(w.audit[0].status, "failed", label);
    assert.equal(w.calls.redeem.length, 2, `${label}: a refusal does not hold the cap`);
    assert.equal(w.audit[1].status, "success", label);
  }
});

test("single-flight: overlapping ticks never redeem twice", async () => {
  const w = createWorld({ feature: { ...EAGER, maxPerAccountPerDay: 5, maxPerDay: 5 } });
  let release: () => void = () => undefined;
  const gate = new Promise<void>((resolve) => (release = resolve));
  const throttle = w.deps.throttleQuotaFetch;
  w.deps.throttleQuotaFetch = async () => {
    await gate;
    await throttle();
  };
  const first = w.tick();
  const second = w.tick();
  release();
  await Promise.all([first, second]);
  assert.equal(w.calls.redeem.length, 1);
  assert.equal(w.state.running, false);
});

test("dry-run lists and records a dry-run row but never redeems", async () => {
  const w = createWorld({ feature: { enabled: true, mode: "dry-run", minSpacingMinutes: 0 } });
  await w.tick();
  assert.equal(w.calls.list.length, 1);
  assert.equal(w.calls.redeem.length, 0);
  assert.equal(w.audit.length, 1);
  assert.equal(w.audit[0].status, "dry-run");
  assert.equal(w.webhooks.length, 0);

  // The dry-run row counts toward the per-account cap while in dry-run mode.
  await w.tick(NOW + 5 * MINUTE_MS);
  assert.equal(w.audit.length, 1);
});

test("walled account without usable credits: no redemption, listing not repeated every tick", async () => {
  const w = createWorld({ feature: EAGER, credits: { "conn-a": [] } });
  await w.tick();
  await w.tick(NOW + MINUTE_MS);
  await w.tick(NOW + 2 * MINUTE_MS);
  assert.equal(w.calls.list.length, 1);
  assert.equal(w.calls.redeem.length, 0);
  assert.equal(w.audit.length, 0);
});

test("Claude: only GRANT credits are redeemable (the session reset is not a banked credit)", async () => {
  const onlySession = createWorld({
    feature: EAGER,
    connections: [{ id: "conn-c", provider: "claude" }],
    windows: { "conn-c": walledSession() },
    credits: {
      "conn-c": [
        { selectionToken: "session_reset", resetType: "SESSION", usableNow: true, resetsLeft: 1 },
      ],
    },
  });
  await onlySession.tick();
  assert.equal(onlySession.calls.list.length, 1);
  assert.equal(onlySession.calls.redeem.length, 0);

  const withGrant = createWorld({
    feature: EAGER,
    connections: [{ id: "conn-c", provider: "claude" }],
    windows: { "conn-c": walledSession() },
    credits: {
      "conn-c": [
        { selectionToken: "session_reset", resetType: "SESSION", usableNow: true, resetsLeft: 1 },
        { selectionToken: "grant:pending", resetType: "GRANT", usableNow: false, resetsLeft: 1 },
        { selectionToken: "grant:g1", resetType: "GRANT", usableNow: true, resetsLeft: 1 },
      ],
    },
  });
  await withGrant.tick();
  assert.deepEqual(withGrant.calls.redeem, [
    {
      provider: "claude",
      id: "conn-c",
      key: "auto-reset:conn-c:2026-11-07:1",
      creditId: "grant:g1",
    },
  ]);
  assert.equal((withGrant.audit[0].details as { creditType: string }).creditType, "claudeCredits");
});

test("credit type off or account out of scope → never listed", async () => {
  const off = createWorld({ feature: { ...EAGER, creditTypes: { codexCredits: false } } });
  await off.tick();
  const outOfScope = createWorld({ feature: { ...EAGER, accountScope: "selected" } });
  await outOfScope.tick();
  const excluded = createWorld({ feature: { ...EAGER, connections: { "conn-a": false } } });
  await excluded.tick();
  for (const w of [off, outOfScope, excluded]) {
    assert.equal(w.calls.list.length, 0);
    assert.equal(w.calls.redeem.length, 0);
  }
});

test("an exclusive lease defers the account (no listing, no redemption)", async () => {
  const w = createWorld({ feature: EAGER, leased: ["conn-a"] });
  await w.tick();
  assert.equal(w.calls.list.length, 0);
  assert.equal(w.calls.redeem.length, 0);
});

test("last-resort: no listing while another in-scope account has headroom", async () => {
  const connections = [
    { id: "conn-a", provider: "codex" as Provider },
    { id: "conn-b", provider: "codex" as Provider },
  ];
  const windows = { "conn-a": walledSession(), "conn-b": idle(20) };
  const w = createWorld({ feature: { ...EAGER, mode: "last-resort" }, connections, windows });
  await w.tick();
  assert.equal(w.calls.list.length, 0);
  assert.equal(w.calls.redeem.length, 0);

  const outOfPool = createWorld({
    feature: { ...EAGER, mode: "last-resort", connections: { "conn-b": false } },
    connections,
    windows,
  });
  await outOfPool.tick();
  assert.equal(outOfPool.calls.redeem.length, 1);
});

test("expiring credit: memoised 6 h scan of busy accounts, redeemed once inside the window", async () => {
  const w = createWorld({
    feature: EAGER,
    windows: { "conn-a": idle(60) },
    credits: { "conn-a": [{ selectionToken: "credit-x", expiresAt: iso(NOW + 30 * HOUR_MS) }] },
  });
  await w.tick();
  assert.equal(w.calls.list.length, 1, "busy, non-walled account is scanned");
  assert.equal(w.calls.redeem.length, 0, "credit expires in 30 h, outside the 24 h window");

  await w.tick(NOW + HOUR_MS);
  await w.tick(NOW + 5 * HOUR_MS);
  assert.equal(w.calls.list.length, 1, "scan memoised for 6 h");

  const later = NOW + 7 * HOUR_MS;
  w.world.windows["conn-a"] = idle(60, later);
  await w.tick(later);
  assert.equal(w.calls.list.length, 2);
  assert.equal(w.calls.redeem.length, 1);
  assert.equal(w.calls.redeem[0].creditId, "credit-x");
  assert.equal((w.audit[0].details as { trigger: string }).trigger, "expiring-credit");
});

test("expiring credit: idle accounts are never scanned", async () => {
  const w = createWorld({
    feature: EAGER,
    windows: { "conn-a": idle(10) },
    credits: { "conn-a": [{ selectionToken: "credit-x", expiresAt: iso(NOW + HOUR_MS) }] },
  });
  await w.tick();
  assert.equal(w.calls.list.length, 0);
  assert.equal(w.calls.redeem.length, 0);
});

test("a listing error backs the account off without an audit row", async () => {
  const w = createWorld({ feature: EAGER });
  w.deps.listCredits = async (_provider: Provider, id: string) => {
    w.calls.list.push(id);
    throw new Error("HTTP 502");
  };
  await w.tick();
  await w.tick(NOW + 5 * MINUTE_MS);
  assert.equal(w.calls.list.length, 1);
  assert.equal(w.audit.length, 0);
});

test("start/stop are idempotent", () => {
  job.stopBankedResetAutoApply();
  job.stopBankedResetAutoApply();
  assert.equal(typeof job.startBankedResetAutoApply, "function");
  assert.equal(job.BANKED_RESET_TICK_INTERVAL_MS, 60_000);
});
