import assert from "node:assert/strict";
import test from "node:test";
import { acquire, resetAll } from "../../open-sse/services/accountSemaphore.ts";
import {
  adaptiveConnectionKey,
  getAdaptiveConnectionLimit,
  recordAdaptiveConnectionResponse,
  resetAdaptiveConnectionLimitsForTest,
  resolveConnectionConcurrencyCap,
} from "../../open-sse/services/adaptiveConnectionConcurrency.ts";
import { updateProviderConnectionSchema } from "../../src/shared/validation/schemas/provider.ts";

// The adaptive controller is process-local and must not carry state between cases.
test("default applies only to unset connection; explicit and adaptive win", () => {
  resetAdaptiveConnectionLimitsForTest();
  const key = adaptiveConnectionKey("codex", "connection-a");
  assert.equal(resolveConnectionConcurrencyCap(null, null, key), null);
  assert.equal(resolveConnectionConcurrencyCap(0, 6, key), 6);
  assert.equal(resolveConnectionConcurrencyCap(null, 6, key), 6);
  assert.equal(resolveConnectionConcurrencyCap(2, 6, key), 2);
  assert.equal(resolveConnectionConcurrencyCap(-1, 6, key), 6);
  assert.notEqual(key, adaptiveConnectionKey("codex", "connection-b"));
});

test("429 halves adaptive cap with floor one; successes add one after sixteen, ceiling 32", () => {
  resetAdaptiveConnectionLimitsForTest();
  const key = adaptiveConnectionKey("codex", "connection-a");
  assert.equal(getAdaptiveConnectionLimit(key, 8), 8);
  recordAdaptiveConnectionResponse(key, 429);
  assert.equal(getAdaptiveConnectionLimit(key), 4);
  recordAdaptiveConnectionResponse(key, 429);
  recordAdaptiveConnectionResponse(key, 429);
  assert.equal(getAdaptiveConnectionLimit(key), 1);
  recordAdaptiveConnectionResponse(key, 499);
  recordAdaptiveConnectionResponse(key, 503);
  assert.equal(getAdaptiveConnectionLimit(key), 1);
  for (let i = 0; i < 15; i++) recordAdaptiveConnectionResponse(key, 200);
  assert.equal(getAdaptiveConnectionLimit(key), 1);
  recordAdaptiveConnectionResponse(key, 200);
  assert.equal(getAdaptiveConnectionLimit(key), 2);
  const ceilingKey = adaptiveConnectionKey("codex", "connection-b");
  assert.equal(getAdaptiveConnectionLimit(ceilingKey, 999), 32);
  for (let i = 0; i < 32; i++) recordAdaptiveConnectionResponse(ceilingKey, 204);
  assert.equal(getAdaptiveConnectionLimit(ceilingKey), 32);
});

test("adaptive cap is enforced by the real account gate after 429", async () => {
  resetAll();
  resetAdaptiveConnectionLimitsForTest();
  const key = adaptiveConnectionKey("codex", "admission-test");
  const first = await acquire(key, { maxConcurrency: resolveConnectionConcurrencyCap(-1, 2, key) });
  const second = await acquire(key, {
    maxConcurrency: resolveConnectionConcurrencyCap(-1, 2, key),
  });
  recordAdaptiveConnectionResponse(key, 429);
  assert.equal(getAdaptiveConnectionLimit(key), 1);
  await assert.rejects(
    acquire(key, { maxConcurrency: resolveConnectionConcurrencyCap(-1, 2, key), failFast: true }),
    /SEMAPHORE_QUEUE_FULL|queue full|capacity|Semaphore busy/i
  );
  first();
  second();
  const release = await acquire(key, {
    maxConcurrency: resolveConnectionConcurrencyCap(-1, 2, key),
  });
  release();
  resetAll();
});

test("provider update accepts adaptive sentinel but rejects other negatives", () => {
  // Inspect the field itself: the complete route schema includes unrelated required fields.
  const field = updateProviderConnectionSchema.shape.maxConcurrent;
  assert.equal(field.safeParse(-1).success, true);
  assert.equal(field.safeParse(-2).success, false);
});
