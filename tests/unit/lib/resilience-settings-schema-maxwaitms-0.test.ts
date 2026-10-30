/**
 * requestQueueSettingsSchema previously clamped maxWaitMs to min(1), so an operator
 * PATCHing requestQueue.maxWaitMs: 0 through the settings API got a 400 before the
 * request ever reached normalizeRequestQueueSettings() (which #12902 already taught
 * to treat 0 as a disable sentinel). Without this schema relax, the fix is unreachable
 * through the real product surface.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  requestQueueSettingsSchema,
  updateResilienceSchema,
  waitForCooldownSettingsSchema,
} from "../../../src/shared/validation/schemas/settings.ts";

test("requestQueueSettingsSchema accepts maxWaitMs=0 (disable sentinel)", () => {
  const result = requestQueueSettingsSchema.safeParse({ maxWaitMs: 0 });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.maxWaitMs, 0);
  }
});

test("requestQueueSettingsSchema still rejects a negative maxWaitMs", () => {
  const result = requestQueueSettingsSchema.safeParse({ maxWaitMs: -1 });
  assert.equal(result.success, false);
});

test("requestQueueSettingsSchema still rejects executionMaxWaitMs=0 (untouched by #12902)", () => {
  const result = requestQueueSettingsSchema.safeParse({ executionMaxWaitMs: 0 });
  assert.equal(result.success, false);
});

test("requestQueueSettingsSchema accepts globalConcurrentRequests runtime bounds", () => {
  for (const globalConcurrentRequests of [0, 100_000]) {
    const result = requestQueueSettingsSchema.safeParse({ globalConcurrentRequests });
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data.globalConcurrentRequests, globalConcurrentRequests);
    }
  }
});

test("requestQueueSettingsSchema rejects globalConcurrentRequests outside runtime bounds", () => {
  assert.equal(
    requestQueueSettingsSchema.safeParse({ globalConcurrentRequests: -1 }).success,
    false
  );
  assert.equal(
    requestQueueSettingsSchema.safeParse({ globalConcurrentRequests: 100_001 }).success,
    false
  );
});

test("waitForCooldownSettingsSchema accepts budgetMs runtime bounds", () => {
  for (const budgetMs of [0, 300_000]) {
    const result = waitForCooldownSettingsSchema.safeParse({ budgetMs });
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data.budgetMs, budgetMs);
    }
  }
});

test("waitForCooldownSettingsSchema rejects budgetMs outside runtime bounds", () => {
  assert.equal(waitForCooldownSettingsSchema.safeParse({ budgetMs: -1 }).success, false);
  assert.equal(waitForCooldownSettingsSchema.safeParse({ budgetMs: 300_001 }).success, false);
});

test("updateResilienceSchema accepts both runtime-consumed fields and remains strict", () => {
  const valid = updateResilienceSchema.safeParse({
    requestQueue: { globalConcurrentRequests: 0 },
    waitForCooldown: { budgetMs: 300_000 },
  });
  assert.equal(valid.success, true);

  const unknown = updateResilienceSchema.safeParse({
    requestQueue: { globalConcurrentRequests: 0, unexpected: true },
  });
  assert.equal(unknown.success, false);
});
