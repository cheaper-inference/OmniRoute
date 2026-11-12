import assert from "node:assert/strict";
import test from "node:test";
import {
  planDocumentCounts,
  spellCount,
  validateCountRegistry,
} from "../../../scripts/docs/lib/count-sync.mjs";

const formats = [
  ["grouped-space", " "],
  ["grouped-nbsp", "\u00a0"],
  ["grouped-narrow-nbsp", "\u202f"],
];

for (const [format, separator] of formats) {
  test(`${format} updates only the registered integer slots`, () => {
    const doc = {
      path: "docs/example.md",
      groups: [
        {
          parts: ["Pairs ", "; raw IDs ", "; unrelated 99."],
          claims: [
            { slot: 0, fact: "distinctProviderModelPairs", format },
            { slot: 1, fact: "uniqueRawModelIds", format },
          ],
        },
      ],
    };
    validateCountRegistry({ version: 1, families: [], generated: [], documents: [doc] });
    const content = `Unchanged heading\n\nPairs 3${separator}155; raw IDs 1${separator}524; unrelated 99.\n`;
    const result = planDocumentCounts(doc, content, {
      distinctProviderModelPairs: 12345,
      uniqueRawModelIds: 6789,
    });
    assert.equal(result.operations.length, 2);
    assert.equal(
      result.after,
      `Unchanged heading\n\nPairs 12${separator}345; raw IDs 6${separator}789; unrelated 99.\n`
    );
    assert.deepEqual(
      planDocumentCounts(doc, result.after, {
        distinctProviderModelPairs: 12345,
        uniqueRawModelIds: 6789,
      }).operations,
      []
    );
  });

  test(`${format} preserves the Bengali digit script`, () => {
    assert.equal(
      spellCount(12345, `১${separator}২৩৪`, "uniqueRawModelIds", format),
      `১২${separator}৩৪৫`
    );
  });

  test(`${format} rejects malformed and mixed grouping`, () => {
    for (const sample of [`12${separator}34`, `1${separator}234,567`, `1\t234`]) {
      assert.throws(
        () => spellCount(12345, sample, "uniqueRawModelIds", format),
        /COUNT_INTEGER_FORMAT/
      );
    }
  });
}

test("grouped integers still require an explicit supported format", () => {
  for (const separator of [" ", "\u00a0", "\u202f"]) {
    assert.throws(
      () => spellCount(12345, `1${separator}234`, "uniqueRawModelIds"),
      /COUNT_INTEGER_FORMAT/
    );
  }
  assert.throws(
    () => spellCount(12345, "1234", "uniqueRawModelIds", "unknown"),
    /COUNT_NUMBER_FORMAT/
  );
});
