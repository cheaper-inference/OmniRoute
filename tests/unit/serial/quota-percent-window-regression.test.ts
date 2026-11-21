/**
 * tests/unit/serial/quota-percent-window-regression.test.ts
 *
 * The per-key part of a percent plan must follow the PROVIDER's plan window, not the quota
 * store's time slices. The store slices windows at fixed multiples of the window length since
 * the epoch and fades the previous slice out, while the provider's 5h/weekly window turns on
 * the account's own clock. Attributing the account figure by tokens kept in the store's slices
 * therefore moves a blocked key's usage onto the keys still working once the store slice turns,
 * and keeps charging a key for a provider window that has already reset.
 *
 * Five hard keys of weight 20 on one Claude connection (fair share 20 each), 5h window, with a
 * controlled clock and the real quota-share gate.
 */

import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── Set DATA_DIR BEFORE any DB import (resolved as module-level constant) ───
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-percent-window-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Every expected value below assumes the default floor.
const FLOOR_ENV = "QUOTA_PERCENT_MIN_TOKENS_PER_POINT";
const savedFloor = process.env[FLOOR_ENV];
delete process.env[FLOOR_ENV];

const providerPlans = await import("../../../src/lib/db/providerPlans.ts");
const quotaPools = await import("../../../src/lib/db/quotaPools.ts");
const { enforceQuotaShare, recordConsumption } = await import("../../../src/lib/quota/enforce.ts");
const sat = await import("../../../src/lib/quota/saturationSignals.ts");
const { attributePercentDimension } = await import("../../../src/lib/quota/percentAttribution.ts");
const { SqliteQuotaStore } = await import("../../../src/lib/quota/sqliteQuotaStore.ts");
const core = await import("../../../src/lib/db/core.ts");

test.after(() => {
  mock.timers.reset();
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  core.resetDbInstance();
  if (savedFloor === undefined) delete process.env[FLOOR_ENV];
  else process.env[FLOOR_ENV] = savedFloor;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PROV = "claude";
const W = 5 * 60 * 60 * 1000;
const H = 60 * 60 * 1000;
const KEYS = ["A", "B", "C", "D", "E"];

/** The account's 5h figure (percent), optionally with the provider's reset time (epoch ms). */
function usage(conn: string, pct: number, reset?: number): void {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id: string) => ({ id, accessToken: "tok", authType: "oauth" }),
    fetchUsage: async (c: Record<string, unknown>) =>
      String(c.id) === conn
        ? {
            quotas: {
              "session (5h)": {
                used: pct,
                total: 100,
                ...(reset !== undefined ? { resetAt: new Date(reset).toISOString() } : {}),
              },
            },
          }
        : { quotas: {} },
  });
}

function makePool(conn: string) {
  providerPlans.upsertPlan(conn, PROV, [{ unit: "percent", window: "5h", limit: 100 }], "manual");
  return quotaPools.createPool({
    connectionId: conn,
    name: conn,
    allocations: KEYS.map((apiKeyId) => ({ apiKeyId, weight: 20, policy: "hard" as const })),
  });
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

const kind = async (conn: string, key: string) => (await ask(conn, key)).kind;

const near = (a: number | undefined, b: number) =>
  assert.ok(a !== undefined && Math.abs(a - b) < 1e-6, `${a} ≈ ${b}`);

await test("quota-percent-window-regression", async (t) => {
  // Next store slice boundary, from the real clock, before the clock is controlled.
  const b = (Math.floor(Date.now() / W) + 1) * W;
  mock.timers.enable({ apis: ["Date"], now: b - 10 * 60_000 });

  await t.test("a store bucket boundary inside one provider window changes nothing", async () => {
    const C2 = "conn-window-slice-turn";
    makePool(C2);
    usage(C2, 0);
    await ask(C2, "A"); // clock at b − 10 min; the book opens at 0
    await burn(C2, "A", 10_000_000); // A really used 60 points
    usage(C2, 60);
    assert.deepEqual([await kind(C2, "A"), await kind(C2, "B")], ["block", "allow"]);

    mock.timers.setTime(b + 2 * H);
    await burn(C2, "B", 2_000_000); // B really used 12 points, in the same provider window
    usage(C2, 72);
    for (const h of [2, 2.5, 3, 4, 4.75]) {
      mock.timers.setTime(b + h * H);
      usage(C2, 72);
      assert.deepEqual(
        [await kind(C2, "A"), await kind(C2, "B"), await kind(C2, "C")],
        ["block", "allow", "allow"],
        `b+${h}h`
      );
    }
  });

  await t.test(
    "a provider reset before the store bucket turns frees the old heavy key and charges the new one",
    async () => {
      const b2 = b + 2 * W;
      mock.timers.setTime(b2 + 0.5 * H);
      const C1 = "conn-window-provider-reset";
      makePool(C1);
      usage(C1, 0);
      await ask(C1, "A");
      await burn(C1, "A", 10_000_000); // the old provider window
      usage(C1, 60);
      assert.deepEqual([await kind(C1, "A"), await kind(C1, "B")], ["block", "allow"]);

      mock.timers.setTime(b2 + 1.5 * H);
      usage(C1, 2); // the provider window reset
      assert.deepEqual([await kind(C1, "A"), await kind(C1, "B")], ["allow", "allow"]);

      mock.timers.setTime(b2 + 3 * H);
      await burn(C1, "B", 6_000_000); // only B used the new provider window
      usage(C1, 60);
      for (const h of [3, 4.9, 6, 8, 9.9]) {
        mock.timers.setTime(b2 + h * H);
        usage(C1, 60);
        assert.deepEqual([await kind(C1, "A"), await kind(C1, "B")], ["allow", "block"], `b+${h}h`);
      }
    }
  );

  await t.test(
    "a reset reported by its reset time turns the window even when the bar did not drop",
    async () => {
      const b3 = b + 4 * W;
      mock.timers.setTime(b3);
      const R1 = b3 + 4 * H;
      const C3 = "conn-window-reset-time";
      const pool = makePool(C3);
      usage(C3, 0, R1);
      await ask(C3, "A");
      await burn(C3, "A", 10_000_000);
      usage(C3, 60, R1);
      assert.equal(await kind(C3, "A"), "block");

      mock.timers.setTime(R1 + 10 * 60_000); // the provider window turned at R1
      await burn(C3, "B", 7_000_000); // routed before the first reading of the new window
      usage(C3, 65, R1 + 5 * H);
      // The turn makes 65 the baseline and marks B's counter there: 65 external, 65 / 5 = 13 each.
      assert.deepEqual([await kind(C3, "A"), await kind(C3, "B")], ["allow", "allow"]);
      const attribute = () =>
        attributePercentDimension({
          store: new SqliteQuotaStore(),
          pool,
          connectionId: C3,
          provider: PROV,
          dimension: { window: "5h", limit: 100 },
        });
      near((await attribute()).external, 65);

      await burn(C3, "B", 7_000_000);
      usage(C3, 80, R1 + 5 * H);
      // B: min(80 − 65 = 15, 7_000_000 / 1000 / 100) = 15, plus 65 / 5 = 13 → 28 ≥ 20; A: 13.
      assert.deepEqual([await kind(C3, "A"), await kind(C3, "B")], ["allow", "block"]);
      near((await attribute()).internalByKey.B, 15);
    }
  );
});
