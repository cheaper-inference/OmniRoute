import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { resolveRequestedLocale } from "../../src/i18n/resolveRequestedLocale.js";
import { DEFAULT_LOCALE, LOCALE_ALIASES, LOCALES } from "../../src/i18n/config.js";

/**
 * Regression tests for #18699:
 * - `cookies()` must be awaited in `getDocsLocale` (Next.js 16 async cookies).
 * - `resolveRequestedLocale` correctly maps cookie values to configured locales
 *   so non-English /docs pages actually serve translations.
 */

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

function read(rel: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, rel), "utf8");
}

// ── Source-level guard: cookies() must be awaited ────────────────────────────

test("docs slug page awaits cookies() so non-EN translations render (#18699)", () => {
  const source = read("src/app/docs/[...slug]/page.tsx");

  assert.match(
    source,
    /async function getDocsLocale\(\): Promise<string>/,
    "getDocsLocale must be async"
  );
  assert.match(
    source,
    /const cookieStore = await cookies\(\);/,
    "cookies() must be awaited in getDocsLocale"
  );
  assert.match(
    source,
    /const locale = await getDocsLocale\(\);/,
    "the page must await getDocsLocale()"
  );
});

// ── Unit tests: locale detection logic ──────────────────────────────────────

test("resolveRequestedLocale returns fallback for empty cookie", () => {
  assert.equal(resolveRequestedLocale("", LOCALES, LOCALE_ALIASES, DEFAULT_LOCALE), DEFAULT_LOCALE);
});

test("resolveRequestedLocale returns exact match for a configured locale", () => {
  assert.equal(resolveRequestedLocale("fr", LOCALES, LOCALE_ALIASES, DEFAULT_LOCALE), "fr");
  assert.equal(resolveRequestedLocale("ja", LOCALES, LOCALE_ALIASES, DEFAULT_LOCALE), "ja");
  assert.equal(resolveRequestedLocale("pt-BR", LOCALES, LOCALE_ALIASES, DEFAULT_LOCALE), "pt-BR");
});

test("resolveRequestedLocale is case-insensitive for locale codes", () => {
  assert.equal(resolveRequestedLocale("FR", LOCALES, LOCALE_ALIASES, DEFAULT_LOCALE), "fr");
  assert.equal(resolveRequestedLocale("ZH-CN", LOCALES, LOCALE_ALIASES, DEFAULT_LOCALE), "zh-CN");
});

test("resolveRequestedLocale resolves known aliases", () => {
  // uk → uk-UA is a documented alias
  const result = resolveRequestedLocale("uk", LOCALES, LOCALE_ALIASES, DEFAULT_LOCALE);
  assert.notEqual(
    result,
    DEFAULT_LOCALE,
    "alias 'uk' should resolve to a configured locale, not the fallback"
  );
});

test("resolveRequestedLocale returns fallback for unknown locale", () => {
  assert.equal(
    resolveRequestedLocale("xx-UNKNOWN", LOCALES, LOCALE_ALIASES, DEFAULT_LOCALE),
    DEFAULT_LOCALE
  );
});
