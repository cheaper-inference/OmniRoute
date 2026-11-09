import assert from "node:assert/strict";
import test from "node:test";

import { planSectionReuse, sectionHashes } from "../../scripts/i18n/run-translation.mjs";

function plan(previous: string, current: string, mirror: string, proven = previous) {
  return planSectionReuse({
    previousHashes: sectionHashes([previous]),
    previousSections: [proven],
    sections: [current],
    mirrorSections: [mirror],
  });
}

const previous = "## Catalog\n\n375 providers are available.";
const current = "## Catalog\n\n376 providers are available.";

test("a proven single count change updates translated content without translating unchanged prose", () => {
  const result = plan(previous, current, "## Catálogo\n\nHá **375** provedores disponíveis.");
  assert.deepEqual(result?.translate, []);
  assert.equal(result?.reuse.get(0), "## Catálogo\n\nHá **376** provedores disponíveis.");
});

test("a count update preserves non-Latin prose byte for byte", () => {
  const result = plan(previous, current, "## カタログ\n\n375 のプロバイダーを利用できます。");
  assert.deepEqual(result?.translate, []);
  assert.equal(result?.reuse.get(0), "## カタログ\n\n376 のプロバイダーを利用できます。");
});

test("an old source with a different recorded hash invalidates the reuse plan", () => {
  const result = plan(
    previous,
    current,
    "## Catálogo\n\nHá 374 provedores.",
    previous.replace("375", "374")
  );
  assert.equal(result, null);
});

test("missing old source text keeps the normal translation path", () => {
  const result = planSectionReuse({
    previousHashes: sectionHashes([previous]),
    sections: [current],
    mirrorSections: ["## Catálogo\n\nHá 375 provedores."],
  });
  assert.deepEqual(result?.translate, [0]);
});

test("missing section hashes cannot authorize numeric reuse or throw during planning", () => {
  const result = planSectionReuse({
    previousHashes: [undefined],
    sections: [current],
    mirrorSections: ["## Catálogo\n\nHá 375 provedores."],
  });
  assert.deepEqual(result?.translate, [0]);
});

for (const [label, oldText, newText, mirror] of [
  [
    "a count attached to a non-BMP numeral",
    previous,
    current,
    "## Catálogo\n\nHá 𝟛375 provedores.",
  ],
  [
    "prose changed",
    previous,
    current.replace("available", "disabled"),
    "## Catálogo\n\nHá 375 provedores.",
  ],
  [
    "two counts changed",
    "## Counts\n\n375 providers and 209 migrations.",
    "## Counts\n\n376 providers and 210 migrations.",
    "## Contagens\n\n375 provedores e 209 migrações.",
  ],
  [
    "source count ambiguous",
    "## Counts\n\n375 providers and 375 models.",
    "## Counts\n\n376 providers and 375 models.",
    "## Contagens\n\n375 provedores e 375 modelos.",
  ],
  ["mirror count ambiguous", previous, current, "## Catálogo\n\n375 provedores e 375 modelos."],
  ["native numerals require translation", previous, current, "## الكتالوج\n\n٣٧٥ مزود متاح."],
  [
    "explicitly signed value",
    "## Counts\n\nChange of +375 providers.",
    "## Counts\n\nChange of +376 providers.",
    "## Contagens\n\nVariação de +375 provedores.",
  ],
  [
    "version change",
    "## Runtime\n\nVersion 3.8.375.",
    "## Runtime\n\nVersion 3.8.376.",
    "## Ambiente\n\nVersão 3.8.375.",
  ],
  [
    "path change",
    "## Files\n\nRead /releases/375/list.",
    "## Files\n\nRead /releases/376/list.",
    "## Arquivos\n\nLeia /releases/375/list.",
  ],
  ["untranslated English", previous, current, previous],
] as const) {
  test(`numeric reuse rejects ${label}`, () => {
    assert.deepEqual(plan(oldText, newText, mirror)?.translate, [0]);
  });
}

test("numeric reuse cannot bless a mirror with a missing code literal", () => {
  const oldText = "## Catalog\n\n375 providers. Run `npm run check:docs-all`.";
  const newText = oldText.replace("375", "376");
  const result = plan(oldText, newText, "## Catálogo\n\nHá 375 provedores disponíveis.");
  assert.deepEqual(result?.translate, [0]);
});
