import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { releaseOnlyUnlessTouched } from "../../../scripts/check/lib/derivedArtifactScope.mjs";
import {
  buildProviderNumbersCards,
  renderReadmeProviderNumbers,
} from "../../../scripts/docs/gen-readme-provider-numbers.mjs";
import { captureTextBoxes } from "../../../scripts/docs/readme-outline.mjs";
import { hasFreeLabel, readmeFact, readmeFactText } from "../../../scripts/docs/readmeFacts.mjs";
import { AI_PROVIDERS } from "../../../src/shared/constants/providers.ts";

const path = "docs/diagrams/provider-numbers.svg";

test(
  "provider-numbers.svg matches its generator byte for byte",
  {
    skip: releaseOnlyUnlessTouched(path),
  },
  async () => {
    assert.equal(readFileSync(path, "utf8"), await renderReadmeProviderNumbers());
  }
);

test("the provider figures use separate denominators for offers, rows, IDs and pools", async () => {
  const cards = await buildProviderNumbersCards();
  const [registered, freeOffers, catalog, recurring, active, distinct, pools, budget] = cards;
  const categoryCounts = registered.lines.flatMap((line) => line.match(/\d+/g) ?? []).map(Number);

  assert.equal(categoryCounts.length, 10);
  assert.equal(
    categoryCounts.reduce((sum, count) => sum + count, 0),
    Object.keys(AI_PROVIDERS).length
  );
  assert.equal(registered.value, readmeFact("providers"));
  assert.equal(freeOffers.value, hasFreeLabel(readmeFact("code.hasFreeProviders")));
  assert.equal(catalog.value, readmeFact("code.freeProviders.total"));
  assert.deepEqual(catalog.lines.slice(0, 4), [
    `${readmeFact("code.freeProviders.apiKey")} with an API key`,
    `${readmeFact("code.freeProviders.keyless")} without a key`,
    `${readmeFact("code.freeProviders.toolAccount")} through a tool account`,
    `${readmeFact("code.freeProviders.webChat")} through a web chat`,
  ]);
  assert.equal(recurring.value, readmeFact("code.freeForever"));
  assert.equal(active.value, readmeFact("code.freeAccessRows"));
  assert.equal(distinct.value, readmeFact("code.freeModels"));
  assert.equal(pools.value, readmeFact("code.freePublishedPools"));
  assert.equal(budget.value, readmeFactText("code.rowSumTotalLabel"));
  assert.ok(budget.lines[0].startsWith(`${readmeFactText("code.headlineSteadyLabel")} real`));
  assert.match(
    budget.lines.join(" "),
    /First month: .+ with signup credits\. Not an OmniRoute allowance\./
  );
});

test("the provider figure SVG shows two rows of four outlined cards and embeds the mono flag", async () => {
  const svg = await renderReadmeProviderNumbers();
  const doc = new JSDOM(svg, { contentType: "image/svg+xml" }).window.document;
  const cards = [...doc.querySelectorAll(".provider-stat")];
  assert.deepEqual(
    cards.map((card) => card.getAttribute("transform")),
    [
      "translate(32,96)",
      "translate(320,96)",
      "translate(608,96)",
      "translate(896,96)",
      "translate(32,328)",
      "translate(320,328)",
      "translate(608,328)",
      "translate(896,328)",
    ]
  );
  assert.deepEqual(
    cards.map((card) => card.querySelector('text.ol[y="96"]')?.textContent),
    (await buildProviderNumbersCards()).map(({ label }) => label)
  );
  for (const card of cards) {
    const surface = card.querySelector("rect.surface");
    assert.ok(surface);
    const cardHeight = Number(surface.getAttribute("height"));
    const baselines = [...card.querySelectorAll("text")].map((text) =>
      Number(text.getAttribute("y"))
    );
    const bottomClearance = cardHeight - Math.max(...baselines);
    assert.ok(
      bottomClearance >= 16,
      `${card.getAttribute("transform")} has ${bottomClearance}px below its last baseline`
    );
  }
  assert.equal(doc.querySelector("text.mono")?.textContent, "hasFree");
  assert.match(svg, /@font-face\{font-family:"CI Mono"/);
  assert.match(svg, /<use href="#g[0-9a-z]+"/);
  assert.match(doc.querySelector("desc")?.textContent ?? "", /None of them is added to another\./);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024);
});

test("the provider figures and definitions fit their cards with readable horizontal padding", async () => {
  const boxes = await captureTextBoxes(renderReadmeProviderNumbers);
  const cardBoxes = boxes.filter(({ top }) => top >= 96);
  assert.ok(cardBoxes.length > 0);
  for (const box of cardBoxes) {
    const column = Math.floor((box.left - 32) / 288);
    const innerRight = 32 + column * 288 + 272 - 12;
    assert.ok(box.right <= innerRight, `${box.text} extends past x=${innerRight}`);
  }
});
