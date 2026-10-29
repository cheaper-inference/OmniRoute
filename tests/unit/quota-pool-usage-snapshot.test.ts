import test from "node:test";
import assert from "node:assert/strict";
import { buildPoolUsageSnapshot } from "../../src/lib/quota/poolUsageSnapshot.ts";

test("zero-weight allocations share the budget equally and preserve read order", async () => {
  const reads: string[] = [];
  const snapshot = await buildPoolUsageSnapshot(
    "pool",
    [
      { apiKeyId: "a", weight: 0 },
      { apiKeyId: "b", weight: 0 },
    ],
    [
      { unit: "tokens", window: "invalid", limit: 999 },
      { unit: "tokens", window: "hourly", limit: 100 },
    ],
    async (key, dim) => {
      reads.push(`${key}:${dim.poolId}:${dim.window}`);
      return key === "a" ? 60 : 20;
    },
    0
  );
  assert.equal(snapshot.generatedAt, "1970-01-01T00:00:00.000Z");
  assert.deepEqual(reads, ["a:pool:hourly", "b:pool:hourly"]);
  assert.equal(snapshot.dimensions.length, 1);
  assert.equal(snapshot.dimensions[0].consumedTotal, 80);
  assert.deepEqual(snapshot.dimensions[0].perKey, [
    { apiKeyId: "a", consumed: 60, fairShare: 50, deficit: 10, borrowing: true },
    { apiKeyId: "b", consumed: 20, fairShare: 50, deficit: -30, borrowing: false },
  ]);
  assert.ok(snapshot.burnRate && snapshot.burnRate.tokensPerSecond > 0);
});

test("nonzero allocation weights remain percentages rather than being normalized", async () => {
  const snapshot = await buildPoolUsageSnapshot(
    "pool",
    [{ apiKeyId: "a", weight: 20 }],
    [{ unit: "requests", window: "hourly", limit: 100 }],
    async () => 20,
    0
  );
  assert.equal(snapshot.dimensions[0].perKey[0].fairShare, 20);
  assert.equal(snapshot.dimensions[0].perKey[0].borrowing, false);
  assert.equal(snapshot.burnRate, undefined);
});

test("counter read failures propagate without returning a partial snapshot", async () => {
  await assert.rejects(
    buildPoolUsageSnapshot(
      "pool",
      [{ apiKeyId: "a", weight: 100 }],
      [{ unit: "tokens", window: "hourly", limit: 100 }],
      async () => {
        throw new Error("counter unavailable");
      },
      0
    ),
    /counter unavailable/
  );
});
