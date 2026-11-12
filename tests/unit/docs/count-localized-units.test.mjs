import assert from "node:assert/strict";
import test from "node:test";
import {
  planDocumentCounts,
  spellCount,
  validateCountRegistry,
} from "../../../scripts/docs/lib/count-sync.mjs";

const format = "ten-thousands";

for (const [locale, unit] of [
  ["ko", "만 토큰"],
  ["zh-CN", " 万 tokens"],
  ["zh-TW", " 萬 tokens"],
]) {
  test(`${locale} preserves the local unit and detects a changed gated allowance`, () => {
    const doc = {
      path: `docs/i18n/${locale}/README.md`,
      groups: [
        {
          parts: ["> Budget ", ` entries; allowance `, `${unit}; unrelated 17.`],
          claims: [
            { slot: 0, fact: "catalogEntries" },
            { slot: 1, fact: "gatedMillions", format },
          ],
        },
      ],
    };
    validateCountRegistry({ version: 1, families: [], generated: [], documents: [doc] });
    const content = `Heading\n\n> Budget 485 entries; allowance 600${unit}; unrelated 17.\n`;
    const facts = { catalogEntries: 485, gatedMillions: "6" };
    assert.deepEqual(planDocumentCounts(doc, content, facts).operations, []);
    const changed = { ...facts, gatedMillions: "7" };
    const result = planDocumentCounts(doc, content, changed);
    assert.equal(result.operations.length, 1);
    assert.equal(result.operations[0].fact, "gatedMillions");
    assert.equal(result.after, content.replace(`600${unit}`, `700${unit}`));
    assert.deepEqual(planDocumentCounts(doc, result.after, changed).operations, []);
    assert.equal(planDocumentCounts(doc, result.after, facts).operations.length, 1);
  });
}

for (const [value, expected] of [
  ["6.25", "625"],
  ["0.0001", "0.01"],
  ["9007199254740993.01", "900719925474099301"],
]) {
  test(`ten-thousand conversion is exact for ${value}`, () => {
    assert.equal(spellCount(value, "600", "gatedMillions", format), expected);
  });
}

test("the local unit format preserves digit script and decimal separator", () => {
  assert.equal(spellCount("0.0001", "৬০০,৫", "gatedMillions", format), "০,০১");
  assert.equal(spellCount("0", "600", "gatedMillions", format), "0");
  assert.equal(spellCount("6.2500", "600", "gatedMillions", format), "625");
});

test("ten-thousands is restricted to the gatedMillions fact", () => {
  for (const fact of ["providers", "steadyBillions", "firstBillions"]) {
    const doc = {
      path: "docs/example.md",
      groups: [{ parts: ["Amount ", "."], claims: [{ slot: 0, fact, format }] }],
    };
    assert.throws(
      () => validateCountRegistry({ version: 1, families: [], generated: [], documents: [doc] }),
      /COUNT_NUMBER_FORMAT/
    );
    assert.throws(() => spellCount(6, "600", fact, format), /COUNT_NUMBER_FORMAT/);
  }
});

test("unknown formats cannot silently change a numeric unit", () => {
  assert.throws(() => spellCount("6", "600", "gatedMillions", "hundreds"), /COUNT_NUMBER_FORMAT/);
});

test("localized decimals reject ambiguous separators and nonnumeric samples", () => {
  for (const sample of ["6,000,000", "6.000.000", "6,0.0", "600万", "600 000", "-600"]) {
    assert.throws(() => spellCount("6", sample, "gatedMillions", format), /COUNT_DECIMAL_FORMAT/);
  }
  assert.throws(() => spellCount("6", "৬0০", "gatedMillions", format), /COUNT_MIXED_DIGIT_SCRIPT/);
});

test("unscaled millions and ordinary integer counts keep their existing units", () => {
  assert.equal(spellCount("6.25", "6,0", "gatedMillions"), "6,25");
  assert.equal(spellCount(380, "377", "providers"), "380");
  assert.equal(spellCount(3114, "3,155", "distinctProviderModelPairs", "grouped-comma"), "3,114");
});
