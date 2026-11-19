/**
 * Tests for `formatFreeBudget` (@omniroute/opencode-plugin/src/naming.ts):
 * formats a free-tier model's budget info into a short human-readable
 * suffix, branching on `freeType`.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  disambiguateDisplayNames,
  formatFreeBudget,
  type FreeModelFreeType,
} from "../src/shared/naming.js";

test("formatFreeBudget: recurring-daily formats tokens/day", () => {
  assert.equal(
    formatFreeBudget({ freeType: "recurring-daily", monthlyTokens: 25_000_000 }),
    "25M tokens/day"
  );
});

test("formatFreeBudget: recurring-monthly formats tokens/month", () => {
  assert.equal(
    formatFreeBudget({ freeType: "recurring-monthly", monthlyTokens: 1_000_000 }),
    "1M tokens/month"
  );
});

test("formatFreeBudget: recurring-credit formats credits", () => {
  assert.equal(
    formatFreeBudget({ freeType: "recurring-credit", creditTokens: 10_000_000 }),
    "10M credits"
  );
});

test("formatFreeBudget: one-time-initial formats credits with (one-time) suffix", () => {
  assert.equal(
    formatFreeBudget({ freeType: "one-time-initial", creditTokens: 1_000_000 }),
    "1M credits (one-time)"
  );
});

test("formatFreeBudget: keyless has no token/credit args", () => {
  assert.equal(formatFreeBudget({ freeType: "keyless" }), "(keyless)");
});

test("formatFreeBudget: discontinued has no token/credit args", () => {
  assert.equal(formatFreeBudget({ freeType: "discontinued" }), "(discontinued)");
});

test("formatFreeBudget: a daily quota not stated in tokens is labelled explicitly", () => {
  assert.equal(formatFreeBudget({ freeType: "recurring-daily" }), "(usage-based quota)");
});

test("formatFreeBudget: a monthly quota of zero is labelled explicitly too", () => {
  assert.equal(
    formatFreeBudget({ freeType: "recurring-monthly", monthlyTokens: 0 }),
    "(usage-based quota)"
  );
});

test("formatFreeBudget: unknown future value renders its own name, never empty", () => {
  // `freeType` is populated from catalog data at runtime, so a value the
  // build doesn't know about is reachable even though TypeScript treats the
  // `default:` arm as dead code for a well-typed caller. The picker shows
  // the value itself instead of an empty suffix.
  assert.equal(
    formatFreeBudget({ freeType: "some-future-type" as FreeModelFreeType }),
    "(some-future-type)"
  );
});

test("formatFreeBudget: sub-1K token count is not abbreviated", () => {
  assert.equal(
    formatFreeBudget({ freeType: "recurring-daily", monthlyTokens: 500 }),
    "500 tokens/day"
  );
});

test("formatFreeBudget: the 999_999 rounding wart is fixed — promotes to 1M", () => {
  // `toFixed(1)` rounds 999999/1e3 up to "1000.0" before the `>= 1e6` threshold
  // check has a chance to apply. fmtTokens now promotes a rounded-up "1000" in
  // any unit to the next unit up, so this correctly reads "1M" instead of the
  // old "1000K" wart.
  assert.equal(
    formatFreeBudget({ freeType: "recurring-daily", monthlyTokens: 999_999 }),
    "1M tokens/day"
  );
});

test("formatFreeBudget: uncapped budget has no counters, label only", () => {
  assert.equal(
    formatFreeBudget({ freeType: "recurring-uncapped" as FreeModelFreeType }),
    "(uncapped)"
  );
});

// CodeRabbit R3 (#19191): the publication-key fallback can itself be a name another
// entry already keeps; fallback candidates are checked until one is unused.
test("disambiguateDisplayNames: a fallback name that is already taken is not reused", () => {
  const entries = [
    { id: "p/d", name: "X (a) (p/c)" },
    { id: "p/a/m", name: "X" },
    { id: "p/b/m", name: "X" },
    { id: "p/c", name: "X (a)" },
  ];
  const renamed = disambiguateDisplayNames(entries);
  const finalNames = entries.map((entry) => renamed.get(entry.id) ?? entry.name);
  assert.equal(
    new Set(finalNames).size,
    entries.length,
    `published names must be unique: ${JSON.stringify(finalNames)}`
  );
  assert.equal(finalNames[0], "X (a) (p/c)", "an entry that is already unique keeps its name");
});
