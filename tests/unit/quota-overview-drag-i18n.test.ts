import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { IntlMessageFormat } from "intl-messageformat";
// Related components/ProviderLimits/ProviderRowSort.tsx drag announcements: real ICU compilation and formatting,
// no fallback strings or generated fake catalogs.
const root = new URL("../../src/i18n/messages/", import.meta.url);
const files = readdirSync(root).filter((file) => file.endsWith(".json"));
for (const file of files) {
  const locale = file.slice(0, -5);
  test(`${locale} drag position is translated, has matching ICU parameters and all plural categories`, () => {
    const source = JSON.parse(readFileSync(new URL(file, root), "utf8")).usage.healthDragPosition;
    const english = JSON.parse(readFileSync(new URL("en.json", root), "utf8")).usage
      .healthDragPosition;
    assert.equal(typeof source, "string");
    assert.ok(!source.includes("__MISSING__"));
    if (locale !== "en") assert.notEqual(source, english);
    const message = new IntlMessageFormat(source, locale);
    const args = new Set<string>();
    function visit(elements: ReturnType<IntlMessageFormat["getAst"]>) {
      for (const e of elements) {
        if ([1, 2, 3, 4, 5, 6].includes(e.type) && "value" in e) args.add(e.value);
        if (e.type === 6 || e.type === 5) for (const o of Object.values(e.options)) visit(o.value);
      }
    }
    visit(message.getAst());
    assert.deepEqual([...args].sort(), ["count", "position", "provider"]);
    const plural = message.getAst().find((e) => e.type === 6 && e.value === "count");
    assert.ok(plural && plural.type === 6);
    assert.equal(plural.pluralType, "cardinal");
    for (const category of new Intl.PluralRules(locale).resolvedOptions().pluralCategories)
      assert.ok(plural.options[category]);
    for (const count of [1, 2, 5]) {
      const output = String(message.format({ provider: "OpenAI Codex", position: 1, count }));
      assert.ok(output.includes("OpenAI Codex"));
      assert.ok(!/[{}]/.test(output));
    }
  });
}
