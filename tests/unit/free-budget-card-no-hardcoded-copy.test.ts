import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const source = readFileSync(
  new URL(
    "../../src/app/(dashboard)/dashboard/usage/components/FreeBudgetCard.tsx",
    import.meta.url
  ),
  "utf8"
);
const { freeBudget } = JSON.parse(
  readFileSync(new URL("../../src/i18n/messages/en.json", import.meta.url), "utf8")
);

test("FreeBudgetCard contains no hardcoded CJK characters", () => {
  assert.equal(source.match(/[㐀-鿿]/u)?.[0], undefined);
});

test("FreeBudgetCard reads the migrated copy from the locale catalog", () => {
  for (const literal of [
    "No models match the current filters.",
    "· updated",
    "· catalog curated",
  ]) {
    assert.ok(!source.includes(literal), `Hardcoded UI copy: ${literal}`);
  }
  assert.doesNotMatch(source, />\s*ToS\s*</);
});

test("the English catalog contains every new free-budget label", () => {
  for (const key of ["keylessCount", "noMatches", "tosColumn", "updatedRelative", "curatedOn"]) {
    assert.equal(typeof freeBudget[key], "string", `Missing freeBudget.${key}`);
  }
});
