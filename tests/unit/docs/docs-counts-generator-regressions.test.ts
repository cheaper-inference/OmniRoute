import test from "node:test";
import assert from "node:assert/strict";
import { CURRENT_DOC_COUNTS } from "../../../scripts/docs/lib/read-count-facts.ts";
import { renderReadmeHero } from "../../../scripts/docs/gen-readme-hero.mjs";
import { renderReadmePromisePillars } from "../../../scripts/docs/gen-readme-promise-pillars.mjs";
import { renderComparisonTable } from "../../../scripts/docs/gen-readme-comparison-table.mjs";
import { renderCliTerminal } from "../../../scripts/docs/gen-readme-cli-terminal.mjs";

const changed = { ...CURRENT_DOC_COUNTS, providers: CURRENT_DOC_COUNTS.providers + 1 };

for (const [name, render] of [
  ["hero", renderReadmeHero],
  ["promise", renderReadmePromisePillars],
  ["comparison", renderComparisonTable],
  ["CLI", renderCliTerminal],
] as const) {
  test(`a newly registered provider reaches the ${name} diagram without editing a constant`, async () => {
    const svg = await render({ counts: changed });
    assert.ok(
      svg.includes(`${changed.providers} providers`),
      `${name} did not render the supplied measured provider total`
    );
  });
}

test("a free-catalog regime change updates accessible and visible promise counts", async () => {
  // One neighboring total can coincide with a stale constant; verify a second total too.
  for (const added of [1, 7]) {
    const counts = { ...CURRENT_DOC_COUNTS, freeForever: CURRENT_DOC_COUNTS.freeForever + added };
    const svg = await renderReadmePromisePillars({ counts });
    assert.ok(
      svg.includes(`${counts.freeForever} recurring or keyless free-forever`),
      "accessible count remained stale"
    );
    assert.ok(
      svg.includes(`free tier, ${counts.freeForever} free`),
      "visible count remained stale"
    );
  }
});

test("a CLI record addition cannot be reverted by regenerating the promise card", async () => {
  const counts = { ...CURRENT_DOC_COUNTS, cliTotal: CURRENT_DOC_COUNTS.cliTotal + 1 };
  const svg = await renderReadmePromisePillars({ counts });
  assert.ok(
    svg.includes(`${counts.cliTotal} CLI and agent integration records`),
    "accessible CLI inventory remained stale"
  );
  assert.ok(
    svg.includes(`${counts.cliTotal} CLI/agent integrations`),
    "visible CLI inventory remained stale"
  );
});
