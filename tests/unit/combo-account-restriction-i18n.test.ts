import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const KEYS = ["builderRestrictAccounts", "builderRestrictAccountsHint"] as const;

function loadCombos(locale: string): Record<string, unknown> {
  return JSON.parse(
    readFileSync(new URL(`../../src/i18n/messages/${locale}.json`, import.meta.url), "utf8")
  ).combos;
}

describe("combo account restriction English messages", () => {
  // Feature PRs add only English keys; other locales use the runtime fallback until
  // the translation refresh. See docs/guides/I18N.md for the catalog policy.
  it("provides nonempty English fallback messages", () => {
    const english = loadCombos("en");
    for (const key of KEYS) {
      const value = english[key];
      const context = `en: combos.${key}`;
      assert.equal(typeof value, "string", `${context} must be present`);
      assert.ok((value as string).trim(), `${context} must not be empty`);
      assert.ok(
        !(value as string).startsWith("__MISSING__:"),
        `${context} must not be a placeholder`
      );
    }
  });

  it("explains optional account restrictions in English", () => {
    const english = loadCombos("en");
    assert.equal(english.builderRestrictAccounts, "Restrict to accounts (optional)");
    assert.equal(
      english.builderRestrictAccountsHint,
      "Leave empty to use all active accounts. When selected, automatic routing stays within these accounts."
    );
  });
});
