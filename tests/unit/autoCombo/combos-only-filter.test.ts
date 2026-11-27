/**
 * `combos_only` mirror for the `auto/*` candidate pool.
 *
 * An operator who marks a model (or a whole provider) "combos only" still lets a stored combo
 * dispatch it — that is the whole point of the state. `auto/*` is a *virtual* combo the operator
 * never compiled, so it must not become a back door: the candidate pool has to drop those models
 * exactly like `/v1/models` does. Same trap #6512 fixed for `hidePaidModels` and #11481 for the
 * exposure allow/deny list.
 *
 * Tests the pure `filterCombosOnlyCandidates` helper wired into
 * `open-sse/services/autoCombo/virtualFactory.ts::buildPreparedPool`.
 */
import { test } from "vitest";
import assert from "node:assert/strict";

import { filterCombosOnlyCandidates } from "../../../open-sse/services/autoCombo/combosOnlyFilter.ts";

const EMPTY = new Map<string, ReadonlySet<string>>();

const DENIED = { provider: "openai", model: "gpt-4o" };
const KEPT = { provider: "anthropic", model: "claude-opus-5" };

test("nothing configured (default) returns the pool UNCHANGED (identity guard)", () => {
  const pool = [DENIED, KEPT];
  const result = filterCombosOnlyCandidates(pool, { combosOnly: EMPTY });
  assert.equal(result, pool, "must return the exact same array reference when nothing is marked");
  assert.deepEqual(result, [DENIED, KEPT]);
});

test("an empty combos-only provider set also returns the pool UNCHANGED", () => {
  const pool = [DENIED, KEPT];
  assert.equal(
    filterCombosOnlyCandidates(pool, { combosOnly: EMPTY, combosOnlyProviders: new Set() }),
    pool
  );
});

test("a per-model combos_only override drops that candidate and keeps the rest", () => {
  const result = filterCombosOnlyCandidates([DENIED, KEPT], {
    combosOnly: new Map([["openai", new Set(["gpt-4o"])]]),
  });
  assert.deepEqual(result, [KEPT]);
});

test("a combos-only provider drops every candidate of that provider", () => {
  const result = filterCombosOnlyCandidates([DENIED, { provider: "openai", model: "o3" }, KEPT], {
    combosOnly: EMPTY,
    combosOnlyProviders: new Set(["openai"]),
  });
  assert.deepEqual(result, [KEPT], "an all-marked pool becomes empty, never a back door");
});

test("an explicit visible override is the positive exception over a combos-only provider", () => {
  const result = filterCombosOnlyCandidates([DENIED, { provider: "openai", model: "o3" }], {
    combosOnly: EMPTY,
    explicitVisible: new Map([["openai", new Set(["gpt-4o"])]]),
    combosOnlyProviders: new Set(["openai"]),
  });
  assert.deepEqual(result, [DENIED], "only the explicitly visible model survives");
});

test("an explicit visible override outranks that model's own combos_only override", () => {
  const result = filterCombosOnlyCandidates([DENIED], {
    combosOnly: new Map([["openai", new Set(["gpt-4o"])]]),
    explicitVisible: new Map([["openai", new Set(["gpt-4o"])]]),
  });
  assert.deepEqual(result, [DENIED]);
});

test("provider aliases and node ids resolve to the same provider default", () => {
  const aliases = new Map<string, readonly string[]>([["openai", ["oa", "node-1"]]]);
  const pool = [
    { provider: "openai", model: "gpt-4o" },
    { provider: "oa", model: "gpt-4o" },
    { provider: "node-1", model: "gpt-4o" },
    KEPT,
  ];
  const result = filterCombosOnlyCandidates(pool, {
    combosOnly: EMPTY,
    combosOnlyProviders: new Set(["node-1"]),
    providerAliases: aliases,
  });
  assert.deepEqual(result, [KEPT], "every identifier form must answer to the same mark");
});

test("preserves extra candidate fields on kept entries", () => {
  const enriched = { provider: "anthropic", model: "claude-opus-5", connectionId: "abc", extra: 1 };
  const result = filterCombosOnlyCandidates([enriched, DENIED], {
    combosOnly: new Map([["openai", new Set(["gpt-4o"])]]),
  });
  assert.deepEqual(result, [enriched], "generic <T> filter must not strip candidate fields");
});
