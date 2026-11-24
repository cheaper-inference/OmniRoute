/**
 * tests/unit/quota-consent-fair-share.test.ts
 *
 * A dimension that carries borrowAvailable belongs to a pool in consent mode. There a hard key
 * stops at its own share plus what other keys lend, whatever the account saturation is.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { decideFairShare } = await import("../../src/lib/quota/fairShare.ts");

const key = { poolId: "p", unit: "tokens" as const, window: "daily" as const };
type Case = {
  weight: number;
  consumed: number;
  borrowAvailable?: number;
  used?: number;
  policy?: "hard" | "soft" | "burst";
  total?: number;
};
const decide = (c: Case) =>
  decideFairShare({
    dimensions: [
      {
        key,
        limit: 1000,
        consumedTotal: c.total ?? c.consumed,
        globalUsedPercent: c.used ?? 0,
        ...(c.borrowAvailable === undefined ? {} : { borrowAvailable: c.borrowAvailable }),
      },
    ],
    allocation: { weight: c.weight, policy: c.policy ?? "hard" },
    consumedByThisKey: { "p:tokens:daily": c.consumed },
    saturationThreshold: 0.5,
  });

test("without borrowAvailable the dimension follows the saturation rules", () => {
  assert.equal(decide({ weight: 50, consumed: 600 }).kind, "allow");
  assert.equal(decide({ weight: 50, consumed: 600, used: 0.7 }).reason, "fair-share");
});

test("a consent dimension locks a hard key at its share plus what is lent, whatever the saturation", () => {
  assert.equal(decide({ weight: 50, consumed: 499, borrowAvailable: 0 }).kind, "allow");
  assert.equal(decide({ weight: 50, consumed: 500, borrowAvailable: 0 }).reason, "fair-share");
  assert.equal(decide({ weight: 50, consumed: 539, borrowAvailable: 40 }).kind, "allow");
  assert.equal(decide({ weight: 50, consumed: 540, borrowAvailable: 40 }).reason, "fair-share");
});

test("a zero-weight key uses only lent capacity", () => {
  assert.equal(decide({ weight: 0, consumed: 0, borrowAvailable: 0 }).reason, "fair-share");
  assert.equal(decide({ weight: 0, consumed: 99, borrowAvailable: 100 }).kind, "allow");
  assert.equal(decide({ weight: 0, consumed: 100, borrowAvailable: 100 }).reason, "fair-share");
});

test("soft is penalised, burst passes, and the pool ceiling still wins in a consent dimension", () => {
  assert.equal(
    decide({ weight: 50, consumed: 600, borrowAvailable: 0, policy: "soft" }).penalized,
    true
  );
  assert.equal(
    decide({ weight: 50, consumed: 600, borrowAvailable: 0, policy: "burst" }).kind,
    "allow"
  );
  assert.equal(
    decide({ weight: 50, consumed: 100, borrowAvailable: 900, total: 1000 }).reason,
    "global-saturated"
  );
});
