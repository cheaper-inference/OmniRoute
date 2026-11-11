/**
 * The Resilience tab PATCHes the ENTIRE `requestQueue` object it received from
 * GET /api/resilience (see ResilienceTab.tsx -> savePatch("requestQueue", ...)).
 * `requestQueueSettingsSchema` is `.strict()`, so any field present in
 * `RequestQueueSettings` but missing from the schema makes the whole Request
 * Queue card unsavable with "Unrecognized key: <field>".
 *
 * That is what happened with `globalConcurrentRequests` (#11493 added the field
 * to the runtime settings, defaults, normalizer and the dashboard form, but not
 * to this schema): every save failed with a 400 before reaching the handler.
 *
 * Guard: the schema must accept the resolved settings object verbatim, and
 * must keep accepting each key individually, so the two stay in lockstep.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { requestQueueSettingsSchema } from "../../../src/shared/validation/schemas/settings.ts";
import { DEFAULT_RESILIENCE_SETTINGS } from "../../../src/lib/resilience/settings.ts";

test("requestQueueSettingsSchema accepts the full resolved requestQueue object (round-trip)", () => {
  const result = requestQueueSettingsSchema.safeParse(DEFAULT_RESILIENCE_SETTINGS.requestQueue);
  assert.equal(
    result.success,
    true,
    result.success ? undefined : JSON.stringify(result.error.issues)
  );
});

test("requestQueueSettingsSchema declares every RequestQueueSettings key", () => {
  for (const key of Object.keys(DEFAULT_RESILIENCE_SETTINGS.requestQueue)) {
    const result = requestQueueSettingsSchema.safeParse({ [key]: undefined });
    assert.equal(
      result.success,
      true,
      `requestQueueSettingsSchema is missing "${key}" — the Request Queue card will fail to save with "Unrecognized key: ${key}"`
    );
  }
});

test("requestQueueSettingsSchema accepts an explicit globalConcurrentRequests (the #11493 regression)", () => {
  const result = requestQueueSettingsSchema.safeParse({ globalConcurrentRequests: 4 });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.globalConcurrentRequests, 4);
  }
});

test("requestQueueSettingsSchema bounds globalConcurrentRequests like the normalizer", () => {
  assert.equal(requestQueueSettingsSchema.safeParse({ globalConcurrentRequests: 0 }).success, true);
  assert.equal(
    requestQueueSettingsSchema.safeParse({ globalConcurrentRequests: -1 }).success,
    false
  );
  assert.equal(
    requestQueueSettingsSchema.safeParse({ globalConcurrentRequests: 100_001 }).success,
    false
  );
});
