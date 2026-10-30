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
  // Deterministic idempotency key: retrying the same tick must not double-spend.
  assert.equal(
    wire.consumeCalls[0].body.redeem_request_id,
    `auto-spend:${connection.id}:credit-expiring`
  );
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
