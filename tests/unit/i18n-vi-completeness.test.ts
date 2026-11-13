import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "@formatjs/icu-messageformat-parser";

import {
  localeParityIsReleaseOnly,
  localeParityOptions,
  placeholderParityDeferred,
} from "../_helpers/localeParityMode.ts";
import en from "../../src/i18n/messages/en.json" with { type: "json" };
import vi from "../../src/i18n/messages/vi.json" with { type: "json" };

type MessageEntry = {
  key: string;
  value: string;
};

function flattenMessages(value: unknown, segments: Array<string | number> = []): MessageEntry[] {
  if (typeof value === "string") {
    return [{ key: segments.map(String).join("."), value }];
  }
  if (Array.isArray(value)) {
    return value.flatMap((child, index) => flattenMessages(child, [...segments, index]));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      flattenMessages(child, [...segments, key])
    );
  }
  return [];
}

function placeholderNames(value: string): string[] {
  return [...value.matchAll(/\{\s*([A-Za-z][A-Za-z0-9_]*)\s*(?=[,}])/g)]
    .map((match) => match[1])
    .sort();
}

const englishMessages = flattenMessages(en);
const vietnameseMessages = flattenMessages(vi);
const vietnameseByKey = new Map(vietnameseMessages.map((entry) => [entry.key, entry.value]));

// Key parity is a release-mode assertion since 2026-11-13: a feature PR adds keys to en.json only
// and the release refresh completes vi (tests/_helpers/localeParityMode.ts). The placeholder and
// ICU checks below keep judging every key vi carries; only an ABSENT key is left to release mode.
test("Vietnamese locale has complete key parity with English", localeParityOptions(), () => {
  assert.deepEqual(
    vietnameseMessages.map((entry) => entry.key).sort(),
    englishMessages.map((entry) => entry.key).sort()
  );
});

test("Vietnamese locale has no internal missing markers or empty fallbacks", () => {
  const invalid = vietnameseMessages.filter(
    ({ value }) => !value.trim() || /__(?:MISSING|TODO)__:?/i.test(value)
  );
  assert.deepEqual(invalid, []);
});

test("Vietnamese locale preserves every ICU placeholder name", () => {
  const mismatches = englishMessages.flatMap(({ key, value }) => {
    const translated = vietnameseByKey.get(key);
    if (translated === undefined) {
      return localeParityIsReleaseOnly ? [] : [{ key, reason: "missing" }];
    }
    // English rewritten by the PR (pr mode only): the release refresh retranslates vi.
    if (placeholderParityDeferred(key)) return [];
    const sourceNames = placeholderNames(value);
    const targetNames = placeholderNames(translated);
    return JSON.stringify(sourceNames) === JSON.stringify(targetNames)
      ? []
      : [{ key, sourceNames, targetNames }];
  });
  assert.deepEqual(mismatches, []);
});

test("Vietnamese locale introduces no ICU parse regression", () => {
  const regressions = englishMessages.flatMap(({ key, value }) => {
    try {
      parse(value, { captureLocation: false, shouldParseSkeletons: true });
    } catch {
      return [];
    }

    const translated = vietnameseByKey.get(key);
    if (translated === undefined) {
      return localeParityIsReleaseOnly ? [] : [{ key, reason: "missing" }];
    }
    try {
      parse(translated, { captureLocation: false, shouldParseSkeletons: true });
      return [];
    } catch (error) {
      return [{ key, reason: error instanceof Error ? error.message : String(error) }];
    }
  });
  assert.deepEqual(regressions, []);
});

test("no-auth provider controls keep locale translators unambiguous", () => {
  const source = readFileSync(
    new URL(
      "../../src/app/(dashboard)/dashboard/providers/[id]/components/NoAuthProviderControls.tsx",
      import.meta.url
    ),
    "utf8"
  );

  assert.equal(source.match(/import \{ useTranslations \} from "next-intl";/g)?.length, 1);
  assert.match(source, /const noAuthT = useTranslations\("noAuthProvider"\);/);
  assert.match(source, /const t = useTranslations\("providers"\);/);
});
