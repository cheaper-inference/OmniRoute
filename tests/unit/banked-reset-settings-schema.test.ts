/**
 * Auto-apply banked resets — `bankedResetAutoApply` settings: Zod bounds on PATCH
 * /api/settings and the off-by-default value returned by getSettings().
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-banked-reset-settings-"));

const { updateSettingsSchema, bankedResetAutoApplySchema } =
  await import("../../src/shared/validation/settingsSchemas.ts");
const { getSettings } = await import("../../src/lib/db/settings.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createBankedResetAutoApplyDefaults } =
  await import("../../src/shared/constants/bankedResetAutoApply.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(process.env.DATA_DIR as string, { recursive: true, force: true });
});

const FULL = {
  enabled: true,
  mode: "last-resort",
  creditTypes: { codexCredits: true, claudeCredits: false, claudeSessionReset: true },
  accountScope: "selected",
  connections: { "conn-a": true, "conn-b": false },
  sessionResetGuardMinutes: 1440,
  weeklyResetGuardHours: 168,
  weeklyFloorPercent: 100,
  expiringCreditHours: 0,
  expiringCreditMinUsedPercent: 0,
  poolHeadroomPercent: 10,
  maxPerAccountPerDay: 50,
  maxPerDay: 0,
  minSpacingMinutes: 30,
  schedule: { enabled: true, startHourUtc: 0, endHourUtc: 24 },
};

test("schema accepts the full object (bounds inclusive) through updateSettingsSchema", () => {
  const parsed = updateSettingsSchema.safeParse({ bankedResetAutoApply: FULL });
  assert.equal(parsed.success, true, JSON.stringify(parsed.error?.issues));
  assert.deepEqual(parsed.data?.bankedResetAutoApply, FULL);
});

test("schema accepts the defaults and an empty object", () => {
  assert.equal(
    bankedResetAutoApplySchema.safeParse(createBankedResetAutoApplyDefaults()).success,
    true
  );
  assert.equal(bankedResetAutoApplySchema.safeParse({}).success, true);
});

const rejected: Array<[string, Record<string, unknown>]> = [
  ["unknown mode", { mode: "always" }],
  ["unknown scope", { accountScope: "some" }],
  ["non-boolean enabled", { enabled: "yes" }],
  ["non-boolean credit type", { creditTypes: { codexCredits: 1 } }],
  ["non-boolean connection flag", { connections: { "conn-a": "on" } }],
  ["percent above 100", { weeklyFloorPercent: 101 }],
  ["negative percent", { poolHeadroomPercent: -1 }],
  ["fractional percent", { expiringCreditMinUsedPercent: 12.5 }],
  ["hours above 168", { weeklyResetGuardHours: 169 }],
  ["expiring hours above 168", { expiringCreditHours: 200 }],
  ["minutes above 1440", { sessionResetGuardMinutes: 1441 }],
  ["spacing above 1440", { minSpacingMinutes: 2000 }],
  ["per-account cap above 50", { maxPerAccountPerDay: 51 }],
  ["pool cap negative", { maxPerDay: -1 }],
  ["schedule start above 24", { schedule: { startHourUtc: 25 } }],
  ["schedule end negative", { schedule: { endHourUtc: -1 } }],
];

for (const [name, value] of rejected) {
  test(`schema rejects ${name}`, () => {
    const parsed = updateSettingsSchema.safeParse({ bankedResetAutoApply: value });
    assert.equal(parsed.success, false);
  });
}

test("getSettings() exposes the feature OFF by default", async () => {
  const settings = await getSettings();
  assert.deepEqual(settings.bankedResetAutoApply, createBankedResetAutoApplyDefaults());
  assert.equal((settings.bankedResetAutoApply as { enabled: boolean }).enabled, false);
});
