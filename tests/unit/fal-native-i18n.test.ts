import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import i18nConfig from "../../config/i18n.json" with { type: "json" };

// These controls were added with markers in 63 locales. Keep this guard independent
// of the diff-aware gate so translations cannot regress after the feature lands.
const nativeControlKeys = [
  "title",
  "description",
  "connectionRequired",
  "category",
  "endpoint",
  "reasoning",
  "input",
  "transport",
  "run",
  "job",
  "register",
  "schema",
  "download",
];

function readNativeMessages(locale: string): Record<string, string> {
  return JSON.parse(
    readFileSync(new URL(`../../src/i18n/messages/${locale}.json`, import.meta.url), "utf8")
  ).falNative;
}

test("Fal native controls have real translations in every configured locale", () => {
  const untranslated: string[] = [];
  const english = readNativeMessages("en");
  for (const { code } of i18nConfig.locales) {
    const messages = readNativeMessages(code);
    for (const key of nativeControlKeys) {
      const value = messages?.[key];
      if (typeof value !== "string" || !value.trim() || value.includes("__MISSING__")) {
        untranslated.push(`${code}.falNative.${key}`);
      }
    }
    // Short labels can legitimately match English (for example, "Transport").
    // The explanatory sentences must not be copied from the English catalog.
    for (const key of ["description", "connectionRequired"]) {
      if (code !== "en" && messages?.[key] === english[key]) {
        untranslated.push(`${code}.falNative.${key}`);
      }
    }
  }
  assert.deepEqual(untranslated, [], "Fal native controls must not fall back to English markers");
});

test("Fal native translations preserve product and protocol identifiers", () => {
  for (const { code } of i18nConfig.locales) {
    const messages = readNativeMessages(code);
    assert.ok(messages.title.includes("Fal"), `${code}: preserve Fal in the title`);
    assert.ok(messages.connectionRequired.includes("Fal"), `${code}: preserve Fal in setup`);
    assert.ok(messages.connectionRequired.includes("API"), `${code}: preserve API in setup`);
    assert.ok(messages.input.includes("JSON"), `${code}: preserve JSON input format`);
    assert.ok(messages.schema.includes("OpenAPI 3"), `${code}: preserve OpenAPI version`);
  }
});
