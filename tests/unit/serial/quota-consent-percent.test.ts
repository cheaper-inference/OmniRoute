/**
 * tests/unit/serial/quota-consent-percent.test.ts
 *
 * Consented lending on a percent plan window (5h, limit 100). The book opens at 0, key a routes
 * 900k tokens and key b 100k, then the account reads 40%. With weights a 30 and b 50 the book
 * attributes a = 36 and b = 4. Saturation mode is below its threshold (40 < 50) and allows.
 * Consent mode stops a hard key at its share plus what the other keys lend.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { PoolAllocation } from "../../../src/lib/db/quotaPools.ts";

// ── Set DATA_DIR BEFORE any DB import (resolved as module-level constant) ───
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-consent-percent-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const providerPlans = await import("../../../src/lib/db/providerPlans.ts");
const quotaPools = await import("../../../src/lib/db/quotaPools.ts");
const { setAllocationLending } = await import("../../../src/lib/db/quotaLending.ts");
const { enforceQuotaShare, recordConsumption } = await import("../../../src/lib/quota/enforce.ts");
const sat = await import("../../../src/lib/quota/saturationSignals.ts");
const { runQuotaSharePreHook } =
  await import("../../../open-sse/handlers/chatCore/quotaSharePreHook.ts");
const core = await import("../../../src/lib/db/core.ts");

test.after(() => {
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PROV = "claude";

function mockUsage(
  byConn: Record<string, { fiveHour?: number; weekly?: number; resetAt?: string }>
) {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id: string) => ({ id, accessToken: "tok", authType: "oauth" }),
    fetchUsage: async (conn: Record<string, unknown>) => {
      const u = byConn[String(conn.id)] ?? {};
      return {
        quotas: {
          ...(u.fiveHour !== undefined
            ? { "session (5h)": { used: u.fiveHour, total: 100, resetAt: u.resetAt } }
            : {}),
          ...(u.weekly !== undefined ? { "weekly (7d)": { used: u.weekly, total: 100 } } : {}),
        },
      };
    },
  });
}

/** Manual one-dimension percent plan + a pool on that connection in the given borrow mode. */
function makePool(conn: string, mode: "saturation" | "consent", allocations: PoolAllocation[]) {
  providerPlans.upsertPlan(conn, PROV, [{ unit: "percent", window: "5h", limit: 100 }], "manual");
  return quotaPools.createPool({ connectionId: conn, name: conn, borrowMode: mode, allocations });
}

const burn = (conn: string, key: string, tokens: number) =>
  recordConsumption({
    apiKeyId: key,
    connectionId: conn,
    provider: PROV,
    cost: { tokens, usd: 0, requests: 1 },
  });

const ask = (conn: string, key: string) =>
  enforceQuotaShare({ apiKeyId: key, connectionId: conn, provider: PROV });

const WEIGHTED: PoolAllocation[] = [
  { apiKeyId: "a", weight: 30, policy: "hard" },
  { apiKeyId: "b", weight: 50, policy: "hard" },
];

/** Open the book at 0, route 900k tokens on a and 100k on b, then read the account at 40%. */
async function prime(conn: string, mode: "saturation" | "consent", resetAt?: string) {
  const pool = makePool(conn, mode, WEIGHTED);
  mockUsage({ [conn]: { fiveHour: 0, resetAt } });
  assert.equal((await ask(conn, "a")).kind, "allow"); // opens the book at 0
  await burn(conn, "a", 900_000);
  await burn(conn, "b", 100_000);
  mockUsage({ [conn]: { fiveHour: 40, resetAt } });
  return pool;
}

await test("quota-consent-percent", async (t) => {
  await t.test(
    "saturation pool: the heavy key passes while the account is below the threshold",
    async () => {
      const C = "p-sat";
      await prime(C, "saturation");
      assert.equal((await ask(C, "a")).kind, "allow"); // 40% < 50%
    }
  );

  await t.test("consent pool, nobody lending: the heavy key is refused at its share", async () => {
    const C = "p-none";
    await prime(C, "consent");
    const refused = await ask(C, "a");
    assert.equal(refused.kind, "block"); // 36 >= 30
    assert.match(
      refused.kind === "block" ? refused.reason : "",
      /^Quota share limit reached for your API key on claude/
    );
    // The mocked provider reports no reset, so no time is shown and no Retry-After is set.
    assert.doesNotMatch(refused.kind === "block" ? refused.reason : "", /resets at/);
    assert.equal(refused.kind === "block" ? refused.retryAfterSeconds : 0, undefined);
    assert.equal((await ask(C, "b")).kind, "allow"); // 4 < 50
  });

  await t.test(
    "the refusal reaches the client with the provider's reset and Retry-After",
    async () => {
      const C = "p-wire";
      const resetAt = new Date(Date.now() + 2 * 3_600_000).toISOString();
      await prime(C, "consent", resetAt);
      const before = Date.now();
      const result = await runQuotaSharePreHook({
        apiKeyInfo: { id: "a" },
        credentials: { connectionId: C },
        provider: PROV,
        model: "",
        isCombo: false,
        comboStepId: null,
        comboExecutionKey: null,
        finalizePendingRequest: () => {},
      });
      assert.ok(result);
      assert.equal(result.response.status, 429);
      const body = await result.response.json();
      assert.equal(body.error.code, "quota_share_blocked");
      assert.equal(
        body.error.message,
        `Quota share limit reached for your API key on claude. The 5h window resets at ${resetAt}.`
      );
      const retryAfter = Number(result.response.headers.get("Retry-After"));
      const expected = Math.floor((Date.parse(resetAt) - before) / 1000) + 1;
      assert.ok(retryAfter > 0 && retryAfter <= expected && expected - retryAfter < 30);
    }
  );

  await t.test(
    "consent pool: the idle share another key lends lets the heavy key pass",
    async () => {
      const C = "p-lend";
      const pool = await prime(C, "consent");
      setAllocationLending(pool.id, "b", { lendingPercent: 100, lendingUntil: null });
      assert.equal((await ask(C, "a")).kind, "allow"); // lendable 46, 36 < 76
      setAllocationLending(pool.id, "b", { lendingPercent: 10, lendingUntil: null });
      assert.equal((await ask(C, "a")).kind, "block"); // lendable 4.6, 36 >= 34.6
    }
  );

  await t.test(
    "no usable book: weighted keys pass and a zero-weight key needs a lender",
    async () => {
      const C = "p-nobook";
      const pool = makePool(C, "consent", [
        { apiKeyId: "a", weight: 50, policy: "hard" },
        { apiKeyId: "z", weight: 0, policy: "hard" },
      ]);
      mockUsage({}); // no plan-window reading, so no book
      assert.equal((await ask(C, "a")).kind, "allow");
      assert.equal((await ask(C, "z")).kind, "block");
      setAllocationLending(pool.id, "a", { lendingPercent: 100, lendingUntil: null });
      assert.equal((await ask(C, "z")).kind, "allow");
    }
  );
});
