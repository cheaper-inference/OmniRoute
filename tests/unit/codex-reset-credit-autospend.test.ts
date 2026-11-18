import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-autospend-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-codex-autospend-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const resetCredits = await import("../../src/lib/usage/codexResetCredits.ts");
const autospendDb = await import("../../src/lib/db/codexResetCreditAutospend.ts");
const autospendScheduler = await import("../../src/lib/services/codexResetCreditAutospend.ts");
const accountFallback = await import("@omniroute/open-sse/services/accountFallback.ts");
const codexAccount = await import("@omniroute/open-sse/services/codexAccount/index.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function createCodexConnection(overrides: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: `Codex Autospend ${Date.now()} ${Math.random()}`,
    email: `codex-autospend-${Date.now()}-${Math.random()}@example.test`,
    accessToken: "codex-access-token",
    refreshToken: "codex-refresh-token",
    providerSpecificData: { workspaceId: "workspace-123" },
    ...overrides,
  });
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function isoHoursFrom(fromMs: number, hours: number) {
  return new Date(fromMs + hours * 3_600_000).toISOString();
}

/** Persist the `codexSpendExpiringResetCredits` opt-in for one connection. */
async function enableAutospend(connectionId: string, extra: Record<string, unknown> = {}) {
  await settingsDb.updateSettings({
    codexSpendExpiringResetCredits: {
      enabled: true,
      horizonHours: 24,
      maxPerDay: 2,
      connections: { [connectionId]: true },
      ...extra,
    },
  } as never);
}

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

type ConsumeCall = { body: Record<string, unknown>; headers: Record<string, string> };

/**
 * Mock the whole Codex wire: credits listing, consume, usage refresh.
 * `credits` is what the listing returns; every consume POST is recorded.
 */
function mockCodexWire(options: {
  credits: unknown[];
  hoursToExpiry?: number[];
  consumeBody?: unknown;
  consumeStatus?: number;
  usageBody?: unknown;
}): { consumeCalls: ConsumeCall[]; listCalls: () => number } {
  const consumeCalls: ConsumeCall[] = [];
  let listCount = 0;
  const now = Date.now();
  const creditPayload = options.credits.map((credit, index) => {
    const hours = options.hoursToExpiry?.[index];
    if (credit && typeof credit === "object" && !Array.isArray(credit) && hours !== undefined) {
      return {
        ...(credit as Record<string, unknown>),
        expires_at: new Date(now + hours * 3600_000).toISOString(),
      };
    }
    return credit;
  });

  globalThis.fetch = (async (url: string, init: RequestInit = {}) => {
    const href = String(url);
    if (href.endsWith("/rate-limit-reset-credits")) {
      listCount += 1;
      return new Response(JSON.stringify({ credits: creditPayload }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (href.includes("/rate-limit-reset-credits/consume")) {
      consumeCalls.push({
        body: JSON.parse(String(init.body ?? "{}")),
        headers: (init.headers ?? {}) as Record<string, string>,
      });
      return new Response(JSON.stringify(options.consumeBody ?? { code: "reset" }), {
        status: options.consumeStatus ?? 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (href.includes("/backend-api/wham/usage")) {
      return new Response(
        JSON.stringify(
          options.usageBody ?? {
            plan_type: "plus",
            rate_limit: {
              primary_window: { used_percent: 100 },
              secondary_window: { used_percent: 100 },
            },
          }
        ),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return new Response("unexpected", { status: 500 });
  }) as typeof fetch;

  return { consumeCalls, listCalls: () => listCount };
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  accountFallback.clearAllModelLockouts();
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("spendExpiringResetCredits redeems an expiring credit when the opt-in is on", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  await enableAutospend(connection.id);
  const wire = mockCodexWire({
    credits: [{ id: "credit-expiring", status: "available" }],
    hoursToExpiry: [4],
  });

  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(wire.consumeCalls.length, 1);
  assert.equal(wire.consumeCalls[0].body.credit_id, "credit-expiring");
  assert.deepEqual(Object.keys(wire.consumeCalls[0].body).sort(), [
    "credit_id",
    "redeem_request_id",
  ]);
  // Same v4 UUID shape the dashboard modal sends: whether upstream takes anything else is unverified.
  assert.match(String(wire.consumeCalls[0].body.redeem_request_id), UUID_V4);
  assert.equal(result.spent.length, 1);
  assert.equal(result.spent[0].creditId, "credit-expiring");
  assert.equal(result.spent[0].outcome, "reset");
});

test("spendExpiringResetCredits reuses the same idempotency key on a retry", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  await enableAutospend(connection.id);
  const wire = mockCodexWire({
    credits: [{ id: "credit-retry", status: "available" }],
    hoursToExpiry: [2],
  });

  await resetCredits.spendExpiringResetCredits(connection.id);
  await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(wire.consumeCalls.length, 2);
  assert.equal(
    wire.consumeCalls[0].body.redeem_request_id,
    wire.consumeCalls[1].body.redeem_request_id
  );
});

test("spendExpiringResetCredits leaves credits outside the horizon untouched", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  await enableAutospend(connection.id, { horizonHours: 24 });
  const wire = mockCodexWire({
    credits: [{ id: "credit-far", status: "available" }],
    hoursToExpiry: [72],
  });

  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(wire.consumeCalls.length, 0);
  assert.deepEqual(result.spent, []);
  assert.equal(result.considered, 1);
});

test("spendExpiringResetCredits honours a custom horizon", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  await enableAutospend(connection.id, { horizonHours: 72 });
  const wire = mockCodexWire({
    credits: [{ id: "credit-custom", status: "available" }],
    hoursToExpiry: [48],
  });

  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(wire.consumeCalls.length, 1);
  assert.equal(result.spent[0].creditId, "credit-custom");
});

test("spendExpiringResetCredits never spends when the opt-in is off", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  const wire = mockCodexWire({
    credits: [{ id: "credit-off", status: "available" }],
    hoursToExpiry: [1],
  });

  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(wire.listCalls(), 0);
  assert.equal(wire.consumeCalls.length, 0);
  assert.equal(result.skipped, "opt_in_off");
});

test("spendExpiringResetCredits never spends for a connection not in the allowlist", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  // An explicit allowlist that doesn't name this connection (fail-closed).
  await settingsDb.updateSettings({
    codexSpendExpiringResetCredits: { enabled: true, connections: { "other-conn": true } },
  } as never);
  const wire = mockCodexWire({
    credits: [{ id: "credit-not-listed", status: "available" }],
    hoursToExpiry: [1],
  });

  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(wire.consumeCalls.length, 0);
  assert.equal(result.skipped, "opt_in_off");
});

test("spendExpiringResetCredits respects maxPerDay", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  await enableAutospend(connection.id, { maxPerDay: 1 });
  const wire = mockCodexWire({
    credits: [
      { id: "credit-a", status: "available" },
      { id: "credit-b", status: "available" },
    ],
    hoursToExpiry: [1, 2],
  });

  const first = await resetCredits.spendExpiringResetCredits(connection.id);
  const second = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(wire.consumeCalls.length, 1);
  assert.equal(first.spent.length, 1);
  assert.equal(second.spent.length, 0);
  assert.equal(second.skipped, "daily_cap_reached");
});

test("spendExpiringResetCredits tolerates a nothing_to_reset rejection", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  await enableAutospend(connection.id);
  const wire = mockCodexWire({
    credits: [{ id: "credit-idle", status: "available" }],
    hoursToExpiry: [1],
    consumeBody: { code: "nothing_to_reset" },
    consumeStatus: 409,
  });

  // Quota refresh must keep working after the rejected redemption, so this
  // resolves with a recorded failure instead of throwing.
  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(wire.consumeCalls.length, 1);
  assert.deepEqual(result.spent, []);
  assert.equal(result.failed.length, 1);
  assert.equal(result.failed[0].creditId, "credit-idle");
  assert.equal(result.failed[0].code, "nothing_to_reset");
});

test("spendExpiringResetCredits tolerates a no_credit rejection", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  await enableAutospend(connection.id);
  mockCodexWire({
    credits: [{ id: "credit-gone", status: "available" }],
    hoursToExpiry: [1],
    consumeBody: { code: "no_credit" },
    consumeStatus: 409,
  });

  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(result.failed.length, 1);
  assert.equal(result.failed[0].code, "no_credit");
});

test("spendExpiringResetCredits never throws when the credits listing itself fails", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  await enableAutospend(connection.id);
  globalThis.fetch = (async (url: string) => {
    if (String(url).endsWith("/rate-limit-reset-credits")) {
      return new Response("boom", { status: 500 });
    }
    return new Response("unexpected", { status: 500 });
  }) as typeof fetch;

  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.deepEqual(result.spent, []);
  assert.equal(typeof result.error, "string");
  assert.ok(result.error.length > 0);
});

test("spendExpiringResetCredits works with only a provider-level switch and no allowlist", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  // No `connections` key at all => the master switch covers every connection.
  await settingsDb.updateSettings({
    codexSpendExpiringResetCredits: { enabled: true },
  } as never);
  const wire = mockCodexWire({
    credits: [{ id: "credit-provider-wide", status: "available" }],
    hoursToExpiry: [1],
  });

  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(wire.consumeCalls.length, 1);
  assert.equal(result.spent[0].creditId, "credit-provider-wide");
});

test("spendExpiringResetCredits treats an empty allowlist as nobody", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  await settingsDb.updateSettings({
    codexSpendExpiringResetCredits: { enabled: true, connections: {} },
  } as never);
  const wire = mockCodexWire({
    credits: [{ id: "credit-empty-allowlist", status: "available" }],
    hoursToExpiry: [1],
  });

  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(wire.consumeCalls.length, 0);
  assert.equal(result.skipped, "opt_in_off");
});

test("spendExpiringResetCredits never spends on an inactive connection", async () => {
  const connection = (await createCodexConnection({ isActive: false })) as { id: string };
  await enableAutospend(connection.id);
  const wire = mockCodexWire({
    credits: [{ id: "credit-disabled", status: "available" }],
    hoursToExpiry: [1],
  });

  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(wire.listCalls(), 0);
  assert.equal(wire.consumeCalls.length, 0);
  assert.equal(result.skipped, "connection_inactive");
});

test("a real tick only reaches active Codex connections", async () => {
  const active = (await createCodexConnection()) as { id: string };
  const inactive = (await createCodexConnection({ isActive: false })) as { id: string };
  await settingsDb.updateSettings({
    codexSpendExpiringResetCredits: { enabled: true },
  } as never);
  mockCodexWire({
    credits: [{ id: "credit-tick", status: "available" }],
    hoursToExpiry: [1],
  });
  const spendCalls: string[] = [];
  const defaults = autospendScheduler.createDefaultCodexAutospendDeps();

  await autospendScheduler.runCodexAutospendTick({
    ...defaults,
    spend: (connectionId: string, options: { now: () => number }) => {
      spendCalls.push(connectionId);
      return defaults.spend(connectionId, options);
    },
  });

  assert.deepEqual(spendCalls, [active.id]);
  assert.equal(autospendDb.getCodexAutospendCount(inactive.id, todayKey()), 0);
  assert.equal(autospendDb.getCodexAutospendCount(active.id, todayKey()), 1);
});

function todayKey() {
  return autospendDb.utcDayKey(Date.now());
}

test("a spend refreshes limits once and releases the cooldown, like the manual path", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  await enableAutospend(connection.id, { maxPerDay: 2 });
  const codexUntil = new Date(Date.now() + 60_000).toISOString();
  await codexAccount.persistCodexChildCooldown({
    connectionId: connection.id,
    model: "gpt-5.5",
    rateLimitedUntil: codexUntil,
  });
  accountFallback.lockModel("codex", connection.id, "gpt-5.5", "quota_exhausted", 3_600_000);
  accountFallback.lockModel("codex", connection.id, "gpt-missing", "not_found", 3_600_000);

  const now = Date.now();
  let usageReads = 0;
  let consumes = 0;
  globalThis.fetch = (async (url: string) => {
    const href = String(url);
    if (href.endsWith("/rate-limit-reset-credits")) {
      return jsonResponse({
        credits: [
          { id: "credit-1", status: "available", expires_at: isoHoursFrom(now, 1) },
          { id: "credit-2", status: "available", expires_at: isoHoursFrom(now, 2) },
        ],
      });
    }
    if (href.includes("/rate-limit-reset-credits/consume")) {
      consumes += 1;
      return jsonResponse({ code: "reset" });
    }
    if (href.includes("/backend-api/wham/usage")) {
      usageReads += 1;
      return jsonResponse({
        plan_type: "plus",
        rate_limit: {
          primary_window: { used_percent: 0 },
          secondary_window: { used_percent: 0 },
        },
      });
    }
    return new Response("unexpected", { status: 500 });
  }) as typeof fetch;

  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(result.spent.length, 2);
  assert.equal(consumes, 2);
  assert.equal(usageReads, 1);
  const after = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(codexAccount.getCodexChildCooldown(after as never, "gpt-5.5"), null);
  const lockouts = accountFallback
    .getAllModelLockouts()
    .filter((lockout: { connectionId: string }) => lockout.connectionId === connection.id);
  // Only the quota lockout is cured by the reset; the unrelated one survives.
  assert.deepEqual(
    lockouts.map((lockout: { model: string }) => lockout.model),
    ["gpt-missing"]
  );
});

test("a failed post-spend refresh keeps the credit reported as spent and counted", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  await enableAutospend(connection.id);
  const now = Date.now();
  globalThis.fetch = (async (url: string) => {
    const href = String(url);
    if (href.endsWith("/rate-limit-reset-credits")) {
      return jsonResponse({
        credits: [{ id: "credit-1", status: "available", expires_at: isoHoursFrom(now, 1) }],
      });
    }
    if (href.includes("/rate-limit-reset-credits/consume")) return jsonResponse({ code: "reset" });
    return new Response("usage down", { status: 500 });
  }) as typeof fetch;

  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(result.spent.length, 1);
  assert.equal(result.error, undefined);
  assert.equal(autospendDb.getCodexAutospendCount(connection.id, todayKey()), 1);
});

test("nothing_to_reset is account-level: the first one ends the candidate loop", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  await enableAutospend(connection.id, { maxPerDay: 5 });
  const wire = mockCodexWire({
    credits: [
      { id: "credit-a", status: "available" },
      { id: "credit-b", status: "available" },
      { id: "credit-c", status: "available" },
    ],
    hoursToExpiry: [1, 2, 3],
    consumeBody: { code: "nothing_to_reset" },
    consumeStatus: 409,
  });

  const result = await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(wire.consumeCalls.length, 1);
  assert.equal(wire.consumeCalls[0].body.credit_id, "credit-a");
  assert.deepEqual(result.failed, [{ creditId: "credit-a", code: "nothing_to_reset" }]);
});

/**
 * Upstream double. `memoizeFailures` decides the open question from the PR review: does a known
 * `redeem_request_id` replay its stored failure? The window starts not exhausted.
 */
function mockUpstreamWithWindow(memoizeFailures: boolean) {
  const seen = new Map<string, unknown>();
  const requestIds: string[] = [];
  const upstream = { windowExhausted: false, requestIds };
  const now = Date.now();
  globalThis.fetch = (async (url: string, init: RequestInit = {}) => {
    const href = String(url);
    if (href.endsWith("/rate-limit-reset-credits")) {
      return jsonResponse({
        credits: [{ id: "credit-1", status: "available", expires_at: isoHoursFrom(now, 2) }],
      });
    }
    if (href.includes("/rate-limit-reset-credits/consume")) {
      const id = String(JSON.parse(String(init.body)).redeem_request_id);
      requestIds.push(id);
      if (memoizeFailures && seen.has(id)) return jsonResponse(seen.get(id), 409);
      if (!upstream.windowExhausted) {
        const refused = { code: "nothing_to_reset" };
        seen.set(id, refused);
        return jsonResponse(refused, 409);
      }
      return jsonResponse({ code: "reset" });
    }
    if (href.includes("/backend-api/wham/usage")) {
      return jsonResponse({
        plan_type: "plus",
        rate_limit: {
          primary_window: { used_percent: 0 },
          secondary_window: { used_percent: 0 },
        },
      });
    }
    return new Response("unexpected", { status: 500 });
  }) as typeof fetch;
  return upstream;
}

for (const memoizeFailures of [true, false]) {
  test(`a refused credit is spent once the window exhausts (upstream memoizes failures: ${memoizeFailures})`, async () => {
    const connection = (await createCodexConnection()) as { id: string };
    await enableAutospend(connection.id);
    const upstream = mockUpstreamWithWindow(memoizeFailures);

    const first = await resetCredits.spendExpiringResetCredits(connection.id);
    assert.equal(first.failed[0]?.code, "nothing_to_reset");
    assert.equal(first.spent.length, 0);

    upstream.windowExhausted = true;
    const second = await resetCredits.spendExpiringResetCredits(connection.id);

    assert.equal(second.spent[0]?.creditId, "credit-1");
    assert.equal(second.spent[0]?.outcome, "reset");
    assert.notEqual(upstream.requestIds[0], upstream.requestIds[1]);
    for (const id of upstream.requestIds) assert.match(id, UUID_V4);
  });
}

test("an ambiguous failure keeps the same redeem_request_id so upstream can dedupe it", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  await enableAutospend(connection.id);
  const wire = mockCodexWire({
    credits: [{ id: "credit-ambiguous", status: "available" }],
    hoursToExpiry: [1],
    consumeBody: { error: "upstream exploded" },
    consumeStatus: 503,
  });

  const first = await resetCredits.spendExpiringResetCredits(connection.id);
  await resetCredits.spendExpiringResetCredits(connection.id);

  assert.equal(first.failed[0]?.code, "codex_reset_credit_upstream_error");
  assert.equal(wire.consumeCalls.length, 2);
  assert.equal(
    wire.consumeCalls[0].body.redeem_request_id,
    wire.consumeCalls[1].body.redeem_request_id
  );
});

test("the key differs per connection and per credit", async () => {
  const first = (await createCodexConnection()) as { id: string };
  const second = (await createCodexConnection()) as { id: string };
  await settingsDb.updateSettings({
    codexSpendExpiringResetCredits: { enabled: true, maxPerDay: 5 },
  } as never);
  const wire = mockCodexWire({
    credits: [
      { id: "credit-a", status: "available" },
      { id: "credit-b", status: "available" },
    ],
    hoursToExpiry: [1, 2],
  });

  await resetCredits.spendExpiringResetCredits(first.id);
  await resetCredits.spendExpiringResetCredits(second.id);

  const ids = wire.consumeCalls.map((call) => call.body.redeem_request_id);
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
});

test("deleting a connection purges its auto-spend bookkeeping", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  autospendDb.setCodexAutospendCount(connection.id, todayKey(), 1);
  autospendDb.setCodexAutospendKeyGenerations(connection.id, { "credit-1": 2 });

  await providersDb.deleteProviderConnection(connection.id);

  assert.equal(autospendDb.getCodexAutospendCount(connection.id, todayKey()), 0);
  assert.deepEqual(autospendDb.getCodexAutospendKeyGenerations(connection.id), {});
});
