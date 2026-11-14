import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse, TYPE, type MessageFormatElement } from "@formatjs/icu-messageformat-parser";

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
  const names: string[] = [];
  /** Collect ICU argument and tag names recursively, excluding literals and pound markers. */
  function visit(elements: MessageFormatElement[]): void {
    for (const element of elements) {
      if (element.type === TYPE.literal || element.type === TYPE.pound) continue;
      names.push(element.value);
      if (element.type === TYPE.select || element.type === TYPE.plural) {
        for (const option of Object.values(element.options)) visit(option.value);
      } else if (element.type === TYPE.tag) {
        visit(element.children);
      }
    }
  }
  visit(parse(value, { captureLocation: false, shouldParseSkeletons: true }));
  return names.sort();
}

test("ICU placeholder extraction ignores translated branch text and escaped syntax", () => {
  assert.deepEqual(placeholderNames(en.managedProxy.state), ["state"]);
  assert.deepEqual(placeholderNames(vi.managedProxy.state), ["state"]);
  assert.deepEqual(placeholderNames("'{literal}' '<tag>' {actual}"), ["actual"]);
});

test("ICU placeholder extraction visits nested branches, formats, and rich text", () => {
  const message =
    "{kind, select, active {<strong>{count, plural, offset:1 =0 {None} one {{name}} other {# {amount, number, ::currency/USD} {day, date, short} {time, time, short}}}</strong>} other {{rank, selectordinal, one {First} other {{fallback}}}}}";
  assert.deepEqual(placeholderNames(message), [
    "amount",
    "count",
    "day",
    "fallback",
    "kind",
    "name",
    "rank",
    "strong",
    "time",
  ]);
});

test("ICU placeholder extraction retains repeated arguments and detects lost or renamed values", () => {
  const source = "<link>{name} {name} {count, plural, one {{detail}} other {#}}</link>";
  assert.deepEqual(placeholderNames(source), ["count", "detail", "link", "name", "name"]);
  for (const changed of [
    source.replace("{detail}", "Detail"),
    source.replace("{detail}", "{renamed}"),
    source.replace("{name} {name}", "{name}"),
    source.replaceAll("link", "strong"),
  ])
    assert.notDeepEqual(placeholderNames(source), placeholderNames(changed));
  assert.throws(() => placeholderNames("{broken"));
});

const englishMessages = flattenMessages(en);
const vietnameseMessages = flattenMessages(vi);
const vietnameseByKey = new Map(vietnameseMessages.map((entry) => [entry.key, entry.value]));

test("Vietnamese locale has complete key parity with English", () => {
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
    if (translated === undefined) return [{ key, reason: "missing" }];
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
    if (translated === undefined) return [{ key, reason: "missing" }];
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
