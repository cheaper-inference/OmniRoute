/**
 * The public quota page reads every string from the `quotaSelf` namespace of the English catalog.
 * This pins that the namespace exists and that plural and variable strings keep their placeholders.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const EN = JSON.parse(
  readFileSync(path.join(process.cwd(), "src/i18n/messages/en.json"), "utf8")
) as Record<string, unknown>;

const KEYS = [
  "metaTitle",
  "heading",
  "intro",
  "updatedAt",
  "refresh",
  "retry",
  "keyLabel",
  "keyPlaceholder",
  "keyHint",
  "keySubmit",
  "keyRemember",
  "keyRememberHint",
  "keyInUse",
  "keySessionNote",
  "keyDeviceNote",
  "keyNotSaved",
  "keyForget",
  "keyEmpty",
  "keyMalformed",
  "noKeyTitle",
  "noKeyBody",
  "loading",
  "invalidKeyTitle",
  "invalidKeyBody",
  "missingScopeTitle",
  "missingScopeBody",
  "failedTitle",
  "failedNetwork",
  "failedServer",
  "failedInvalidResponse",
  "noPoolsTitle",
  "noPoolsBody",
  "expiryNone",
  "expiryDays",
  "expiryHours",
  "expirySoon",
  "expiryOn",
  "poolShare",
  "policyHard",
  "policySoft",
  "policyBurst",
  "poolCap",
  "accountHidden",
  "accountLagNote",
  "noWindows",
  "window5h",
  "windowHourly",
  "windowDaily",
  "windowWeekly",
  "windowMonthly",
  "resetsOn",
  "barAccount",
  "barPool",
  "barYourShare",
  "usedPercent",
  "usedOf",
  "amountRequests",
  "amountTokens",
  "amountPercent",
  "shareLeft",
  "shareNone",
  "shareOverHard",
  "shareOverSoft",
  "shareOverBurst",
  "staleBadge",
  "staleNote",
  "unavailableBadge",
  "reasonStoreUnavailable",
  "reasonPercentAttributionUnavailable",
  "reasonWindowNotReported",
  "reasonConnectionLookupFailed",
  "reasonNotSupported",
  "reasonFetchFailed",
  "reasonNotAvailable",
  "reasonUnknown",
  "modelWindowsTitle",
  "modelWindowsNote",
  "modelWindowsShowAll",
  "modelWindowsShowFewer",
  "scheduleBlackoutTitle",
  "scheduleBlackoutBody",
  "scheduleOutsideTitle",
  "scheduleOutsideBody",
  "scheduleBudgetTitle",
  "scheduleBudgetBody",
  "scheduleName",
  "scheduleReopens",
  "durationMinutes",
  "durationHours",
  "modelCapsTitle",
  "modelCapUsage",
  "modelCapUnknown",
  "modelCapReached",
  "spendTitle",
  "spendRangeLabel",
  "range1d",
  "range7d",
  "range30d",
  "range90d",
  "spendRequests",
  "spendTokens",
  "spendCost",
  "spendCostHint",
  "spendListPrice",
  "spendListPriceHint",
  "spendDailyTitle",
  "spendDailyAria",
  "spendByModelTitle",
  "spendTableLabel",
  "spendColModel",
  "spendColRequests",
  "spendColTokens",
  "spendColListPrice",
  "spendEmpty",
  "spendTruncated",
  "spendLoading",
  "spendFailed",
];

function namespace(): Record<string, unknown> {
  const value = EN.quotaSelf;
  assert.ok(value && typeof value === "object", "en.json has a quotaSelf object");
  return value as Record<string, unknown>;
}

test("the quotaSelf namespace carries every string of the page", () => {
  const quotaSelf = namespace();
  for (const key of KEYS) {
    const value = quotaSelf[key];
    assert.equal(typeof value, "string", `quotaSelf.${key} is a string`);
    assert.notEqual((value as string).trim(), "", `quotaSelf.${key} is not empty`);
  }
});

test("plural and variable strings keep their placeholders", () => {
  const quotaSelf = namespace();
  assert.ok(String(quotaSelf.expiryDays).includes("{days, plural,"));
  assert.ok(String(quotaSelf.amountTokens).includes("{count, plural,"));
  assert.ok(String(quotaSelf.usedOf).includes("{used}"));
  assert.ok(String(quotaSelf.usedOf).includes("{limit}"));
  assert.ok(String(quotaSelf.keyInUse).includes("{key}"));
  assert.ok(String(quotaSelf.noPoolsBody).includes("{provider}"));
});
