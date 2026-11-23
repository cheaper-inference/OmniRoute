/**
 * The public quota page reads every string from the `quotaSelf` namespace of the English catalog.
 * This pins that the namespace exists and that plural and variable strings keep their placeholders.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { IntlMessageFormat } from "intl-messageformat";
import { createTranslator } from "next-intl";

import { IntlMessageFormat } from "intl-messageformat";

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
  "lendingTitle",
  "lendingIntro",
  "lendingStatusOff",
  "lendingStatusOpen",
  "lendingStatusUntil",
  "lendingStatusEnded",
  "lendingStoredInactive",
  "lendingPercentLabel",
  "lendingPercentHint",
  "lendingPercentInvalid",
  "lendingDeadlineLabel",
  "lendingDeadlineHint",
  "lendingDeadlineIdleHint",
  "lendingDeadlineNone",
  "lendingDeadlineKeep",
  "lendingDeadlineHours",
  "lendingDeadlineDays",
  "lendingDeadlinePassed",
  "lendingSave",
  "lendingWithdraw",
  "lendingSaved",
  "lendingErrorKey",
  "lendingErrorClosed",
  "lendingErrorGone",
  "lendingErrorRejected",
  "lendingErrorRateLimited",
  "lendingErrorRateLimitedUnknown",
  "lendingErrorServer",
  "lendingErrorNetwork",
  "lendingErrorUnreadable",
  "lendingReload",
  "lendingBorrowTitle",
  "lendingBorrowAmount",
  "lendingBorrowUnknown",
  "lendingBorrowNotApplicable",
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
  "onboardingTitle",
  "onboardingIntro",
  "onboardingIncludeKey",
  "onboardingIncludeKeyHint",
  "onboardingKeyPlaceholder",
  "onboardingBaseUrlPlaceholder",
  "onboardingNoBaseUrl",
  "onboardingMainModel",
  "onboardingModelsTruncated",
  "onboardingNoModels",
  "onboardingLongContext",
  "onboardingLongContextHint",
  "onboardingTabsLabel",
  "onboardingTabClaudeCode",
  "onboardingTabShell",
  "onboardingTabDesktop",
  "onboardingSettingsHelp",
  "onboardingSettingsBlockLabel",
  "onboardingShellHelp",
  "onboardingProfilePublic",
  "onboardingProfileLocal",
  "onboardingProfileLocalHint",
  "onboardingShellPublicBlockLabel",
  "onboardingShellLocalBlockLabel",
  "onboardingDesktopHelp",
  "onboardingDesktopBaseUrl",
  "onboardingDesktopApiKey",
  "onboardingDesktopCredentialKind",
  "onboardingDesktopCredentialKindValue",
  "onboardingDesktopAuthScheme",
  "onboardingDesktopAuthSchemeValue",
  "onboardingDesktopModelsHelp",
  "onboardingDesktopModelsBlockLabel",
  "onboardingCopySettings",
  "onboardingCopyShellPublic",
  "onboardingCopyShellLocal",
  "onboardingCopyBaseUrl",
  "onboardingCopyApiKey",
  "onboardingCopyModels",
  "onboardingCopied",
  "onboardingCopyFailed",
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

test("the lending strings keep their placeholders and plain punctuation", () => {
  const quotaSelf = namespace();
  assert.ok(
    String(quotaSelf.lendingStatusUntil).includes("{percent}") &&
      String(quotaSelf.lendingStatusUntil).includes("{until}")
  );
  assert.ok(String(quotaSelf.lendingStoredInactive).includes("{percent}"));
  assert.ok(String(quotaSelf.lendingDeadlineHours).includes("{hours, plural,"));
  assert.ok(String(quotaSelf.lendingDeadlineDays).includes("{days, plural,"));
  assert.ok(String(quotaSelf.lendingErrorRateLimited).includes("{seconds, plural,"));
  assert.ok(
    String(quotaSelf.lendingBorrowAmount).includes("{window}") &&
      String(quotaSelf.lendingBorrowAmount).includes("{amount}")
  );
  const lending = Object.entries(quotaSelf).filter(([key]) => key.startsWith("lending"));
  assert.equal(lending.length, 35);
  for (const [key, value] of lending) assert.doesNotMatch(String(value), /['<>;—]|anonym/i, key);
});

test("every lending string compiles as an ICU message", () => {
  const quotaSelf = namespace();
  for (const [key, value] of Object.entries(quotaSelf).filter(([name]) =>
    name.startsWith("lending")
  )) {
    assert.doesNotThrow(() => new IntlMessageFormat(String(value), "en"), key);
  }
  const format = (key: string, values: Record<string, unknown>) =>
    new IntlMessageFormat(String(quotaSelf[key]), "en").format(values);
  assert.equal(
    format("lendingErrorRateLimited", { seconds: 1 }),
    "Too many changes in a short time. Try again in 1 second."
  );
  assert.equal(
    format("lendingErrorRateLimited", { seconds: 7 }),
    "Too many changes in a short time. Try again in 7 seconds."
  );
  assert.equal(format("lendingDeadlineDays", { days: 7 }), "For 7 days");
  assert.equal(
    format("lendingStoredInactive", { percent: 40 }),
    "You stored a lending percentage of 40%. It has no effect while this pool does not lend."
  );
});

test("the lending block sits right after modelCapReached", () => {
  const keys = Object.keys(namespace());
  const start = keys.indexOf("modelCapReached") + 1;
  assert.ok(keys.slice(start, start + 35).every((key) => key.startsWith("lending")));
});

test("the onboarding strings keep their placeholders and exact code tokens", () => {
  const q = EN.quotaSelf as Record<string, string>;
  const t = createTranslator({
    locale: "en",
    messages: { quotaSelf: q },
    namespace: "quotaSelf",
    onError: (error) => {
      throw error;
    },
  });
  for (const key of KEYS.filter((name) => name.startsWith("onboarding"))) {
    assert.doesNotThrow(() => new IntlMessageFormat(q[key], "en"), `quotaSelf.${key} is valid ICU`);
  }
  assert.equal(new IntlMessageFormat(q.onboardingKeyPlaceholder, "en").format(), "<your API key>");
  assert.equal(
    new IntlMessageFormat(q.onboardingBaseUrlPlaceholder, "en").format(),
    "<gateway base URL>"
  );
  assert.equal(t("onboardingKeyPlaceholder"), "<your API key>");
  assert.equal(t("onboardingBaseUrlPlaceholder"), "<gateway base URL>");
  assert.match(q.onboardingModelsTruncated, /\{shown\}.*\{total\}/);
  assert.equal(
    t("onboardingModelsTruncated", { shown: 40, total: 45 }),
    "Showing 40 of the 45 models this key can call."
  );
  assert.match(q.onboardingNoModels, /\{provider\}/);
  assert.match(t("onboardingSettingsHelp"), /~\/\.claude\/settings\.json/);
});

const PERCENT_SHARE_AND_MEMBER_STRINGS: Record<string, string> = {
  reasonPercentAttributionUnavailable:
    "Your part of this window is not counted yet. Counting starts when a request goes through this pool and the account reports its usage.",
  reasonPercentWindowEnded:
    "The window that was being counted has ended. Your part returns when the account reports the new window.",
  reasonAccountNotUsedByKey: "Your key does not use this account.",
  sharePercentEstimate:
    "This is an estimate. The account reports one figure. The part routed through this pool is split by the tokens each key sent.",
  sharePercentParts:
    "{own} came from your requests. {external} is your part of usage made outside this pool.",
  membersTitle: "Usage by member",
  membersBarLabel: "Usage split between {count} members",
  memberYou: "You",
  memberOther: "Member {number}",
  memberValue: "{name}: {amount}",
  membersNote:
    "Other members are shown without names. Member numbers can change when a key joins or leaves the pool.",
  membersPercentNote:
    "On this plan each figure is an estimate of what the member routed through the pool.",
};

test("the percent share and member bar strings read exactly as written", () => {
  const quotaSelf = namespace();
  assert.equal(Object.keys(PERCENT_SHARE_AND_MEMBER_STRINGS).length, 12);
  for (const [key, text] of Object.entries(PERCENT_SHARE_AND_MEMBER_STRINGS)) {
    assert.equal(quotaSelf[key], text, `quotaSelf.${key}`);
  }
});
