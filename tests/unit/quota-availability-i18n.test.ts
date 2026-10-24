import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { IntlMessageFormat } from "intl-messageformat";

const root = new URL("../../src/i18n/messages/", import.meta.url);
const catalogs = Object.fromEntries(
  readdirSync(root)
    .filter((file) => file.endsWith(".json"))
    .map((file) => [file.slice(0, -5), JSON.parse(readFileSync(new URL(file, root), "utf8"))])
);
// usage keys added between 1591cd55e0c2b4195cb41ea9e1967d3eb8f56d5e and
// f03850e1ee56e8eab5efc43a9f7db08928835bb3. Global completeness is an upstream gate.
const ownedKeys = [
  "healthAccountHint",
  "healthAction",
  "healthAvailable",
  "healthAwaitingSync",
  "healthBannerAvailable",
  "healthBannerUnavailable",
  "healthCd5",
  "healthCdw",
  "healthCooldown",
  "healthCutoffAtRequest",
  "healthDetailsHint",
  "healthDrag",
  "healthDragPosition",
  "healthExtraUsageBypass",
  "healthFastest",
  "healthFilteringBypass",
  "healthFiveHour",
  "healthIncluded",
  "healthLegendAction",
  "healthLegendCooldown",
  "healthLegendHide",
  "healthLegendOk",
  "healthLegendPartial",
  "healthLegendShow",
  "healthNoRuntime",
  "healthOldestQuota",
  "healthOtherPool",
  "healthOverall",
  "healthOverview",
  "healthPaidCreditsBypass",
  "healthPeakHourProtection",
  "healthPool",
  "healthPreviousFailure",
  "healthPreviousSnapshot",
  "healthPurchasedBalanceBypass",
  "healthQuotaError",
  "healthQuotaExhausted",
  "healthQuotaObserved",
  "healthRatio",
  "healthRecentSuccessBypass",
  "healthRecovery",
  "healthRecoveryUnknown",
  "healthResetOrder",
  "healthRestricted",
  "healthRuntimeObserved",
  "healthSummaryFailed",
  "healthTitle",
  "healthUnavailable",
  "healthVerdictUnavailable",
  "healthWait",
  "healthWaited",
  "layoutCompact",
  "layoutFull",
];
const keys = [
  "healthAction",
  "healthTitle",
  "healthDrag",
  "healthDragPosition",
  "healthResetOrder",
  "healthPool",
  "healthOtherPool",
  "healthIncluded",
  "healthBannerUnavailable",
  "healthBannerAvailable",
  "healthLegendOk",
  "healthLegendCooldown",
  "healthLegendAction",
  "healthLegendPartial",
  "healthWaited",
  "healthWait",
  "healthFastest",
  "healthRatio",
  "healthCd5",
  "healthCdw",
  "healthAccountHint",
  "healthAvailable",
  "healthRestricted",
  "healthUnavailable",
  "healthCooldown",
  "healthQuotaExhausted",
  "healthRecovery",
  "noQuotaData",
  "healthQuotaError",
  "healthNoRuntime",
  "healthPreviousSnapshot",
  "healthPreviousFailure",
  "healthAwaitingSync",
  "healthVerdictUnavailable",
  "healthSummaryFailed",
  "healthRuntimeObserved",
  "healthQuotaObserved",
  "healthOldestQuota",
  "healthRecoveryUnknown",
  "healthDetailsHint",
  "healthFiveHour",
  "healthOverall",
  "healthRecentSuccessBypass",
  "healthPurchasedBalanceBypass",
  "healthCutoffAtRequest",
];
// Quantity-sensitive usage/common keys used by the availability overview.
// active is only the ratio denominator; available controls agreement. Percentages,
// remaining quota, timestamps and durations arrive already localized by useHealthText.
const quantityKeys = {
  healthIncluded: "count",
  healthBannerUnavailable: "count",
  healthBannerAvailable: "count",
  healthRatio: "available",
} as const;

for (const [locale, catalog] of Object.entries(catalogs)) {
  for (const [key, argument] of Object.entries(quantityKeys)) {
    test(`${locale}.usage.${key} covers every cardinal plural category`, () => {
      const categories = new Intl.PluralRules(locale).resolvedOptions().pluralCategories;
      const message = new IntlMessageFormat(catalog.usage[key], locale);
      if (categories.length === 1) return;
      const plural = message
        .getAst()
        .find((element) => element.type === 6 && element.value === argument);
      assert.ok(plural && plural.type === 6, `${locale}.${key} needs ${argument}, plural`);
      assert.equal(plural.pluralType, "cardinal");
      for (const category of categories) {
        assert.ok(plural.options[category], `${locale}.${key} missing ${category}`);
      }
      assert.ok(plural.options.other, `${locale}.${key} missing other`);
    });
  }
}

for (const locale of ["de", "fr", "ru", "ar", "pl"]) {
  for (const [key, argument] of Object.entries(quantityKeys)) {
    test(`${locale}.usage.${key} formats 1, 2 and 5 with localized agreement`, () => {
      const message = new IntlMessageFormat(catalogs[locale].usage[key], locale);
      const results = [1, 2, 5].map((count) =>
        message.format({ count, available: count, active: 9 })
      );
      assert.ok(new Set(results).size > 1, `${locale}.${key}: ${results.join(" | ")}`);
      // Numbers alone must not make a broken, single-form translation pass.
      if (argument === "count") {
        const forms = results.map((result) => String(result).replace(/\p{N}+/gu, "#"));
        assert.ok(
          new Set(forms).size > 1,
          `${locale}.${key} never changes agreement for ${argument}`
        );
      }
    });
  }
}

const obsolete = ["healthObservationUnavailable", "statCritical", "statAlert", "statHealthy"];
test("all 67 catalogs have every availability-owned key, no owned placeholders, and no obsolete availability keys", () => {
  assert.equal(Object.keys(catalogs).length, 67);
  for (const [locale, catalog] of Object.entries(catalogs)) {
    for (const key of ownedKeys) {
      const value = catalog.usage[key];
      assert.equal(typeof value, "string", `${locale}.usage.${key}`);
      assert.ok(value.trim().length > 0, `${locale}.usage.${key}`);
      assert.ok(!value.includes("__MISSING__"), `${locale}.usage.${key}`);
    }
    for (const key of obsolete)
      assert.equal(catalog.usage[key], undefined, `${locale}.${key} is obsolete`);
  }
});
test("availability copy is translated in every locale and compiles as ICU", () => {
  for (const [locale, catalog] of Object.entries(catalogs)) {
    for (const key of keys) {
      const value = catalog.usage[key];
      assert.equal(typeof value, "string", `${locale}.${key}`);
      assert.ok(value.trim().length > 0, `${locale}.${key}`);
      if (locale !== "en")
        assert.notEqual(
          value,
          catalogs.en.usage[key],
          `${locale}.${key} must not use English fallback`
        );
      assert.doesNotThrow(() => new IntlMessageFormat(value, locale), `${locale}.${key}`);
    }
  }
  assert.equal(catalogs["zh-CN"].usage.healthAvailable, "可用");
  assert.equal(catalogs["zh-CN"].usage.healthRestricted, "部分受限");
  assert.equal(catalogs.en.usage.healthRestricted, "Partially restricted");
});
