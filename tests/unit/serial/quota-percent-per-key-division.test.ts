/**
 * tests/unit/serial/quota-percent-per-key-division.test.ts
 *
 * Percent plans report only how full the whole account is. The quota-share
 * gate must still give each pool member its own share of that number: the
 * growth of the account figure since the book opened is split between the
 * keys by the tokens each one routed through the proxy since then.
 *
 * Scenario: 5h window, two hard keys at 50/50, the book opened at 0, key a
 * routed 900k tokens and key b 100k, then the account at 60%. Attributed:
 * a = 54, b = 6 (strict mode, 60 ≥ 50).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { PoolAllocation } from "../../../src/lib/db/quotaPools.ts";

// ── Set DATA_DIR BEFORE any DB import (resolved as module-level constant) ───
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-percent-division-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Every expected value below assumes the default floor.
const FLOOR_ENV = "QUOTA_PERCENT_MIN_TOKENS_PER_POINT";
const savedFloor = process.env[FLOOR_ENV];
delete process.env[FLOOR_ENV];

const providerPlans = await import("../../../src/lib/db/providerPlans.ts");
const quotaPools = await import("../../../src/lib/db/quotaPools.ts");
const { enforceQuotaShare, recordConsumption } = await import("../../../src/lib/quota/enforce.ts");
const sat = await import("../../../src/lib/quota/saturationSignals.ts");
const core = await import("../../../src/lib/db/core.ts");

test.after(() => {
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  core.resetDbInstance();
  if (savedFloor === undefined) delete process.env[FLOOR_ENV];
  else process.env[FLOOR_ENV] = savedFloor;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PROV = "claude";

function mockUsage(byConn: Record<string, { fiveHour?: number; weekly?: number }>) {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id: string) => ({ id, accessToken: "tok", authType: "oauth" }),
    fetchUsage: async (conn: Record<string, unknown>) => {
      const u = byConn[String(conn.id)] ?? {};
      return {
        quotas: {
          ...(u.fiveHour !== undefined ? { "session (5h)": { used: u.fiveHour, total: 100 } } : {}),
          ...(u.weekly !== undefined ? { "weekly (7d)": { used: u.weekly, total: 100 } } : {}),
        },
      };
    },
  });
}

const hard = (ids: string[], weight: number): PoolAllocation[] =>
  ids.map((apiKeyId) => ({ apiKeyId, weight, policy: "hard" as const }));

/** Manual one-dimension percent plan + a pool on that connection. */
function makePool(conn: string, window: "5h" | "weekly", allocations: PoolAllocation[]) {
  providerPlans.upsertPlan(conn, PROV, [{ unit: "percent", window, limit: 100 }], "manual");
  return quotaPools.createPool({ connectionId: conn, name: conn, allocations });
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

await test("quota-percent-per-key-division", async (t) => {
  await t.test("a 50/50 pool blocks the heavy key and keeps the light key open", async () => {
    const C = "conn-percent-division";
    makePool(C, "5h", hard(["a", "b"], 50));
    mockUsage({ [C]: { fiveHour: 0 } });
    assert.equal((await ask(C, "a")).kind, "allow"); // opens the book at 0
    await burn(C, "a", 900_000);
    await burn(C, "b", 100_000);
    mockUsage({ [C]: { fiveHour: 60 } });

    assert.equal((await ask(C, "a")).kind, "block"); // 54 ≥ 50
    assert.equal((await ask(C, "b")).kind, "allow"); // 6 < 50
  });
});
