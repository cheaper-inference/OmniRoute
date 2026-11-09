import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

import { LOCALES } from "../../src/i18n/config.ts";

const KEYS = ["builderRestrictAccounts", "builderRestrictAccountsHint"] as const;

function loadCombos(locale: string): Record<string, unknown> {
  return JSON.parse(
    readFileSync(new URL(`../../src/i18n/messages/${locale}.json`, import.meta.url), "utf8")
  ).combos;
}

describe("combo account restriction translations", () => {
  it("provides real, nonempty translations in every configured locale", () => {
    const english = loadCombos("en");
    for (const locale of LOCALES) {
      const combos = loadCombos(locale);
      for (const key of KEYS) {
        const value = combos[key];
        const context = `${locale}: combos.${key}`;
        assert.equal(typeof value, "string", `${context} must be present`);
        assert.ok((value as string).trim(), `${context} must not be empty`);
        assert.ok(!(value as string).startsWith("__MISSING__:"), `${context} must be translated`);
        if (locale !== "en") {
          assert.notEqual(value, english[key], `${context} must not be an English placeholder`);
        }
      }
    }
  });

  it("explains optional account restrictions in English and Persian", () => {
    const english = loadCombos("en");
    assert.equal(english.builderRestrictAccounts, "Restrict to accounts (optional)");
    assert.equal(
      english.builderRestrictAccountsHint,
      "Leave empty to use all active accounts. When selected, automatic routing stays within these accounts."
    );

    const persian = loadCombos("fa");
    assert.equal(persian.builderRestrictAccounts, "محدود کردن به حساب‌ها (اختیاری)");
    assert.equal(
      persian.builderRestrictAccountsHint,
      "برای استفاده از همهٔ حساب‌های فعال، خالی بگذارید. با انتخاب حساب‌ها، مسیریابی خودکار فقط از همین حساب‌ها استفاده می‌کند."
    );
  });
});
