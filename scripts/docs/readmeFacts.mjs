// Derived numbers for the README diagram generators (scripts/docs/gen-readme-*.mjs).
//
// Every count a README SVG draws that the counts gate also checks (provider total, MCP tools,
// routing strategies, free-forever providers, scoring factors, …) comes from the committed facts
// snapshot, docs/reference/derived-facts.json, instead of a literal typed into the generator.
// The snapshot is written only by `npm run release:refresh-derived` (release + nightly refresh
// PR), so a feature PR never has to touch a generator because a sibling PR added a provider, and
// regenerating a diagram on any branch reproduces the committed file byte for byte.
//
// OMNIROUTE_DERIVED_FACTS_PATH points the generators at another facts file. refresh-derived uses
// it to render the diagrams for facts it has not written yet (`--check`); tests use it to prove
// the generators follow the snapshot. Numbers that are not facts (150+, 15–95%, $0) stay literal
// in the generators.
import { readFileSync } from "node:fs";
import { FACTS_SNAPSHOT_PATH, getFactAt, loadFactsSnapshot } from "../release/facts.mjs";

export const DERIVED_FACTS_PATH_ENV = "OMNIROUTE_DERIVED_FACTS_PATH";

function loadReadmeFacts() {
  const override = process.env[DERIVED_FACTS_PATH_ENV];
  if (override) return JSON.parse(readFileSync(override, "utf8"));
  const facts = loadFactsSnapshot();
  if (!facts) {
    throw new Error(
      `readmeFacts: ${FACTS_SNAPSHOT_PATH} is missing or not JSON — ` +
        "run `npm run release:refresh-derived` (or `npm run facts`) to recreate it"
    );
  }
  return facts;
}

export const README_FACTS = Object.freeze(loadReadmeFacts());

/** A numeric fact from the snapshot; throws on a missing or non-numeric value. */
export function readmeFact(dotted) {
  const value = getFactAt(README_FACTS, dotted);
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`readmeFacts: no numeric fact at "${dotted}" in the facts snapshot`);
  }
  return value;
}

// The README diagrams' vocabulary, one name per fact they draw.
export const RF = Object.freeze({
  /** Live provider modules (the counts gate's "SVG canonical numbers" provider total). */
  providers: readmeFact("providers"),
  routingStrategies: readmeFact("routingStrategies"),
  scoringFactors: readmeFact("scoringFactors"),
  locales: readmeFact("locales"),
  mcpTools: readmeFact("code.mcpTools"),
  freeForever: readmeFact("code.freeForever"),
  cliTotal: readmeFact("code.cliTotal"),
  engines: readmeFact("code.engines"),
  /** Steady monthly free tokens in billions, two decimals ("1.62"), as the hero prints it. */
  freeSteadyBillions: (readmeFact("code.freeSteady") / 1e9).toFixed(2),
});
