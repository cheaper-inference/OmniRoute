/**
 * tests/unit/quota-block-reset.test.ts
 *
 * A quota-share refusal says when capacity returns. Percent windows use the provider's reset.
 * Countable units use an upper bound from the sliding window. An unknown instant stays unknown:
 * no time in the message and no Retry-After.
 */

import test from "node:test";
import assert from "node:assert/strict";
import type { PlanWindowReading } from "../../src/lib/quota/types.ts";

const { countableRetryAt, resolveBlockReset, blockResetSuffix, retryAfterSecondsFor } =
  await import("../../src/lib/quota/blockReset.ts");
const { decideFairShare } = await import("../../src/lib/quota/fairShare.ts");

const HOUR = 3_600_000;
const NOW = 10 * HOUR + 15 * 60_000;
const percent = { unit: "percent" as const, window: "5h" as const, consumed: 54, ceiling: 50 };

const key = { poolId: "p", unit: "tokens" as const, window: "daily" as const };
type Case = {
  weight: number;
  consumed: number;
  borrowAvailable?: number;
  used?: number;
  policy?: "hard" | "soft" | "burst";
  total?: number;
  capValue?: number;
  capUnit?: "tokens";
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
    allocation: {
      weight: c.weight,
      policy: c.policy ?? "hard",
      ...(c.capValue === undefined ? {} : { capValue: c.capValue, capUnit: c.capUnit }),
    },
    consumedByThisKey: { "p:tokens:daily": c.consumed },
    saturationThreshold: 0.5,
  });

test("countable: the next bucket start plus the share of one window the key is over", () => {
  assert.equal(
    countableRetryAt({ window: "hourly", consumed: 500, ceiling: 500, nowMs: NOW }),
    11 * HOUR
  );
  assert.equal(
    countableRetryAt({ window: "hourly", consumed: 1000, ceiling: 500, nowMs: NOW }),
    11 * HOUR + HOUR / 2
  );
  assert.equal(
    countableRetryAt({ window: "hourly", consumed: 100, ceiling: 0, nowMs: NOW }),
    12 * HOUR
  );
  assert.equal(
    countableRetryAt({ window: "hourly", consumed: 0, ceiling: 0, nowMs: NOW }),
    11 * HOUR
  );
});

test("percent: the reset is the provider's, and unknown stays unknown", async () => {
  const at = (reading: PlanWindowReading | null | Error) =>
    resolveBlockReset(
      { blocked: percent, connectionId: "c", provider: "claude", nowMs: NOW },
      {
        readPlanWindow: async () => {
          if (reading instanceof Error) throw reading;
          return reading;
        },
      }
    );
  assert.equal(await at({ used: 0.6, resetAt: NOW + 90_000, fetchedAt: NOW }), NOW + 90_000);
  assert.equal(await at({ used: 0.6, resetAt: null, fetchedAt: NOW }), null);
  assert.equal(await at({ used: 0.6, resetAt: NOW, fetchedAt: NOW }), null); // not in the future
  assert.equal(await at(null), null);
  assert.equal(await at(new Error("down")), null);
  assert.equal(
    await resolveBlockReset({
      blocked: undefined,
      connectionId: "c",
      provider: "claude",
      nowMs: NOW,
    }),
    null
  );
});

test("countable blocks resolve without any provider read", async () => {
  const blocked = {
    unit: "tokens" as const,
    window: "hourly" as const,
    consumed: 1000,
    ceiling: 500,
  };
  const never = {
    readPlanWindow: async () => {
      throw new Error("must not be called");
    },
  };
  assert.equal(
    await resolveBlockReset({ blocked, connectionId: "c", provider: "p", nowMs: NOW }, never),
    11 * HOUR + HOUR / 2
  );
});

test("the suffix names the window and the instant, and is empty when the instant is unknown", () => {
  assert.equal(
    blockResetSuffix(percent, Date.UTC(2026, 10, 20, 18)),
    ". The 5h window resets at 2026-11-20T18:00:00.000Z."
  );
  assert.equal(
    blockResetSuffix(
      { unit: "tokens", window: "daily", consumed: 600, ceiling: 500 },
      Date.UTC(2026, 10, 21, 6)
    ),
    ". Enough daily usage is expected to clear by 2026-11-21T06:00:00.000Z."
  );
  assert.equal(blockResetSuffix(percent, null), "");
  assert.equal(blockResetSuffix(undefined, NOW), "");
  assert.deepEqual(
    [
      retryAfterSecondsFor(NOW + 90_500, NOW),
      retryAfterSecondsFor(NOW + 1, NOW),
      retryAfterSecondsFor(null, NOW),
    ],
    [91, 1, undefined]
  );
});

test("decideFairShare reports the dimension that refused", () => {
  assert.deepEqual(decide({ weight: 50, consumed: 540, borrowAvailable: 40 }).blocked, {
    unit: "tokens",
    window: "daily",
    consumed: 540,
    ceiling: 540,
  });
  assert.deepEqual(decide({ weight: 50, consumed: 100, total: 1000 }).blocked, {
    unit: "tokens",
    window: "daily",
    consumed: 1000,
    ceiling: 1000,
  });
  // An absolute cap is not a share: it carries no reset information.
  const cap = decide({ weight: 50, consumed: 200, capValue: 200, capUnit: "tokens" });
  assert.equal(cap.reason, "cap-absolute");
  assert.equal(cap.blocked, undefined);
  assert.equal(decide({ weight: 50, consumed: 10 }).blocked, undefined);
});

test("the refusal reaches the wire with Retry-After and the same public code", async () => {
  const { createErrorResult } = await import("../../open-sse/utils/error.ts");
  const result = createErrorResult(
    429,
    "Quota share limit reached for your API key on claude. The 5h window resets at 2026-11-20T18:00:00.000Z.",
    91_000,
    "quota_share_blocked"
  );
  assert.equal(result.response.headers.get("Retry-After"), "91");
  const body = await result.response.json();
  assert.equal(body.error.code, "quota_share_blocked");
  assert.match(body.error.message, /resets at 2026-11-20T18:00:00\.000Z/);
});

test("Retry-After lands strictly after the reset instant", () => {
  assert.deepEqual(
    [
      retryAfterSecondsFor(NOW + 30_000, NOW),
      retryAfterSecondsFor(NOW + 30_001, NOW),
      retryAfterSecondsFor(NOW + 29_999, NOW),
      retryAfterSecondsFor(NOW + 1, NOW),
    ],
    [31, 31, 30, 1]
  );
});
