import test from "node:test";
import assert from "node:assert/strict";

const settingsSchemas = await import("../../src/shared/validation/settingsSchemas.ts");

/**
 * The `comboAutoPromoteEnabled` incident: a setting accepted by the API but
 * missing from the update schema returns 200 and silently never persists.
 * Pin the auto-spend key so it cannot regress that way.
 */
test("the update-settings schema accepts codexSpendExpiringResetCredits", () => {
  const schema = settingsSchemas.updateSettingsSchema;
  assert.ok(schema, "updateSettingsSchema must be exported");

  const parsed = schema.safeParse({
    codexSpendExpiringResetCredits: {
      enabled: true,
      horizonHours: 12,
      maxPerDay: 3,
      connections: { "conn-1": true },
    },
  });

  assert.equal(parsed.success, true, JSON.stringify(parsed.error?.issues ?? []));
});

test("the update-settings schema rejects an out-of-range horizon", () => {
  const parsed = settingsSchemas.updateSettingsSchema.safeParse({
    codexSpendExpiringResetCredits: { horizonHours: 99_999 },
  });

  assert.equal(parsed.success, false);
});

test("the update-settings schema rejects an out-of-range maxPerDay", () => {
  const parsed = settingsSchemas.updateSettingsSchema.safeParse({
    codexSpendExpiringResetCredits: { maxPerDay: 0 },
  });

  assert.equal(parsed.success, false);
});
