import assert from "node:assert/strict";
import test from "node:test";
import { PROVIDER_COLLECTION_NAMES } from "../../../scripts/docs/lib/count-facts.mjs";
import {
  countCliToolRecords,
  countCliToolCategories,
} from "../../../scripts/docs/lib/read-count-facts.ts";
import {
  renderProviderReference,
  planProviderReference,
} from "../../../scripts/docs/gen-provider-reference.ts";

function options() {
  return {
    catalog: Object.fromEntries(PROVIDER_COLLECTION_NAMES.map((name) => [name, {}])),
    version: "3.8.56",
    generatedDate: "2026-10-29",
    executorCount: 158,
  };
}

test("provider reference is a pure deterministic renderer with a measured union", () => {
  const input = options();
  input.catalog.FREE_PROVIDERS.one = { id: "one", name: "Example One" };
  input.catalog.APIKEY_PROVIDERS.alias = { id: "one", name: "Example One" };
  const first = renderProviderReference(input);
  assert.ok(first.includes("Total providers: **1**"));
  assert.equal(renderProviderReference(input), first);
  input.catalog.APIKEY_PROVIDERS.two = { id: "two", name: "Example Two" };
  const next = renderProviderReference(input);
  assert.ok(next.includes("Total providers: **2**"));
  assert.match(next, /Example Two/);
});

test("provider reference does not churn its date when regenerated on the following day", async () => {
  const input = options();
  const existing = renderProviderReference(input);
  assert.equal(await planProviderReference({ ...input, existing, today: "2026-10-30" }), existing);
  input.catalog.FREE_PROVIDERS.one = { id: "one", name: "Example One" };
  const changed = await planProviderReference({ ...input, existing, today: "2026-10-30" });
  assert.match(changed, /Last generated:\*\* 2026-10-30/);
  assert.equal(
    await planProviderReference({ ...input, existing: changed, today: "2026-10-31" }),
    changed
  );
});

test("provider reference compares formatted bytes before deciding whether to update", async () => {
  const input = options();
  const format = (text) => text.trimEnd() + "\n";
  const existing = format(renderProviderReference(input));
  assert.equal(
    await planProviderReference({ ...input, existing, today: "2026-10-30", format }),
    existing
  );
  await assert.rejects(
    planProviderReference({ ...input, existing: "unknown document", today: "2026-10-30" }),
    /DATE_MISSING/
  );
});

test("CLI measurement parses literal records without evaluating application imports", () => {
  const source =
    'import "application-that-must-not-run"; export const CLI_TOOLS = { one: { category: "code" }, "two": { category: "agent" } } as const;';
  assert.equal(countCliToolRecords(source), 2);
  assert.equal(countCliToolRecords(source.replace('"two":', 'third: {}, "two":')), 3);
});

test("CLI measurement refuses spreads, computed keys, duplicates and nonliteral construction", () => {
  for (const source of [
    "export const CLI_TOOLS = { ...other };",
    "export const CLI_TOOLS = { [key]: {} };",
    "export const CLI_TOOLS = { one: {}, one: {} };",
    "export const CLI_TOOLS = buildTools();",
  ])
    assert.throws(() => countCliToolRecords(source), /COUNT_FACTS_CLI/);
});

test("CLI category measurement resolves reviewed literal aliases and rejects unknown category sources", () => {
  const source = 'export const CLI_TOOLS = { first: { category: "agent" }, second: EXTRA }';
  assert.deepEqual(
    countCliToolCategories(source, { EXTRA: 'export const EXTRA = { category: "code" }' }),
    { cliCode: 1, cliAgent: 1 }
  );
  assert.throws(() => countCliToolCategories(source), /CATEGORY_SHAPE/);
  assert.throws(
    () => countCliToolCategories('export const CLI_TOOLS = { first: { category: "other" } }'),
    /CATEGORY_UNKNOWN/
  );
});

test("provider reference preserves existing bytes when only formatting differs", async () => {
  const input = options();
  const format = (text: string) => text.trimEnd() + "\n";
  const existing = renderProviderReference(input) + "\n\n";
  assert.equal(
    await planProviderReference({ ...input, existing, today: "2026-11-02", format }),
    existing
  );
});
