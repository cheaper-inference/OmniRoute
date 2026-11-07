import test from "node:test";
import assert from "node:assert/strict";

// #18344: the Quota Tracker provider order is saved as `settings.quotaProviderOrder`
// (PATCH /api/settings). The client sanitizer and the settings schema share bounds.

const {
  sanitizeQuotaProviderOrder,
  QUOTA_PROVIDER_ORDER_MAX_ENTRIES,
  QUOTA_PROVIDER_ID_MAX_LENGTH,
} = await import("../../src/shared/utils/quotaProviderOrder.ts");
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");

test("sanitizeQuotaProviderOrder drops non-strings, trims, dedupes and caps", () => {
  assert.deepEqual(sanitizeQuotaProviderOrder(undefined), []);
  assert.deepEqual(sanitizeQuotaProviderOrder(null), []);
  assert.deepEqual(sanitizeQuotaProviderOrder("claude"), []);
  assert.deepEqual(sanitizeQuotaProviderOrder({ 0: "claude" }), []);
  assert.deepEqual(
    sanitizeQuotaProviderOrder([" claude ", 42, null, "", "   ", "codex", "claude", {}]),
    ["claude", "codex"]
  );
  const longest = "x".repeat(QUOTA_PROVIDER_ID_MAX_LENGTH);
  assert.deepEqual(sanitizeQuotaProviderOrder([`${longest}x`, longest, "ok"]), [longest, "ok"]);
  const many = Array.from({ length: 500 }, (_, i) => `p${i}`);
  const capped = sanitizeQuotaProviderOrder(many);
  assert.equal(capped.length, QUOTA_PROVIDER_ORDER_MAX_ENTRIES);
  assert.equal(capped[0], "p0");
  assert.equal(capped.at(-1), `p${QUOTA_PROVIDER_ORDER_MAX_ENTRIES - 1}`);
});

test("every sanitized order is accepted by the settings PATCH schema", () => {
  const many = Array.from({ length: 500 }, (_, i) => `p${i}`);
  for (const raw of [[], ["claude"], many, [" claude ", "x".repeat(64), "claude"]]) {
    const parsed = updateSettingsSchema.safeParse({
      quotaProviderOrder: sanitizeQuotaProviderOrder(raw),
    });
    assert.equal(parsed.success, true, JSON.stringify(raw).slice(0, 60));
  }
});

test("settings PATCH schema accepts quotaProviderOrder and rejects bad payloads", () => {
  const ok = updateSettingsSchema.safeParse({ quotaProviderOrder: [" claude ", "codex"] });
  assert.equal(ok.success, true);
  if (ok.success) assert.deepEqual(ok.data.quotaProviderOrder, ["claude", "codex"]);
  assert.equal(updateSettingsSchema.safeParse({ quotaProviderOrder: [] }).success, true);

  const tooMany = Array.from({ length: 201 }, (_, i) => `p${i}`);
  assert.equal(updateSettingsSchema.safeParse({ quotaProviderOrder: tooMany }).success, false);
  assert.equal(
    updateSettingsSchema.safeParse({ quotaProviderOrder: ["claude", 42] }).success,
    false
  );
  assert.equal(updateSettingsSchema.safeParse({ quotaProviderOrder: ["   "] }).success, false);
  assert.equal(
    updateSettingsSchema.safeParse({ quotaProviderOrder: ["x".repeat(65)] }).success,
    false
  );
  assert.equal(updateSettingsSchema.safeParse({ quotaProviderOrder: "claude" }).success, false);
});
