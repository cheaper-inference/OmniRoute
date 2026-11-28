import assert from "node:assert/strict";
import test from "node:test";

import {
  computePublicFreeHeadline,
  computeRowSumMirror,
  type FreeModelBudget,
  type RetiredFreeRow,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";

type Row = FreeModelBudget & { enabled?: boolean };

function row(p: Partial<Row> & { provider: string }): Row {
  return {
    modelId: `${p.provider}-model`,
    displayName: p.provider,
    monthlyTokens: 0,
    creditTokens: 0,
    freeType: "recurring-daily",
    poolKey: null,
    tos: "caution",
    ...p,
  };
}

function retired(p: Partial<RetiredFreeRow> & { provider: string }): RetiredFreeRow {
  return {
    modelId: "m",
    poolKey: p.provider,
    lastListedMonthlyTokens: 1e9,
    retiredAt: "2026-11-18",
    reason: "ended",
    evidence: "fixture",
    ...p,
  };
}

const NOW = new Date("2026-11-18T00:00:00Z");

test("a pool listed under N rows counts N times in the mirror and once in the real figure", () => {
  const entries = ["a", "b", "c"].map((id) =>
    row({ provider: "xkiro", modelId: id, poolKey: "p", monthlyTokens: 5e6 })
  );
  const m = computeRowSumMirror({ entries, retired: [], asOf: NOW });
  assert.equal(m.liveTokens, 15e6);
  assert.equal(m.realSteadyTokens, 5e6);
  assert.deepEqual(m.byProvider, [
    { provider: "xkiro", liveRows: 3, retiredRows: 0, tokens: 15e6 },
  ]);
});

test("non-token units are zero by default and count with countNonTokenUnits", () => {
  const entries = [row({ provider: "api-airforce", poolKey: "aa", monthlyTokens: 24e6 })];
  assert.equal(computeRowSumMirror({ entries, retired: [], asOf: NOW }).liveTokens, 0);
  assert.equal(
    computeRowSumMirror({ entries, retired: [], asOf: NOW, countNonTokenUnits: true }).liveTokens,
    24e6
  );
});

test("a retired ledger row enters retiredTokens and never the real figure", () => {
  const m = computeRowSumMirror({
    entries: [],
    retired: [retired({ provider: "mistral" })],
    asOf: NOW,
  });
  assert.equal(m.retiredTokens, 1e9);
  assert.equal(m.totalTokens, 1e9);
  assert.equal(m.realSteadyTokens, 0);
  assert.equal(m.retiredShare, 1);
  assert.deepEqual(m.byProvider, [
    { provider: "mistral", liveRows: 0, retiredRows: 1, tokens: 1e9 },
  ]);
});

test("a row with gates enters the mirror and not the real figure", () => {
  const entries = [row({ provider: "groq", poolKey: "g", monthlyTokens: 7e6, gates: ["card"] })];
  const m = computeRowSumMirror({ entries, retired: [], asOf: NOW });
  assert.equal(m.liveTokens, 7e6);
  assert.equal(m.realSteadyTokens, 0);
});

test("unknown provider from an overlay counts zero", () => {
  const entries = [row({ provider: "brand-new-provider", poolKey: "n", monthlyTokens: 9e6 })];
  const m = computeRowSumMirror({ entries, retired: [], asOf: NOW });
  assert.equal(m.liveTokens, 0);
  assert.deepEqual(m.byProvider, []);
});

test("enabled:false rows never count", () => {
  const entries = [row({ provider: "groq", poolKey: "g", monthlyTokens: 7e6, enabled: false })];
  const m = computeRowSumMirror({ entries, retired: [], asOf: NOW });
  assert.equal(m.liveTokens, 0);
  assert.equal(m.realSteadyTokens, 0);
});

test("rows that grant nothing or sit outside the steady bucket stay out", () => {
  const entries = [
    row({ provider: "groq", modelId: "d", freeType: "discontinued" }),
    row({ provider: "groq", modelId: "o", freeType: "one-time-initial", creditTokens: 5e6 }),
    row({ provider: "groq", modelId: "u", freeType: "recurring-uncapped" }),
  ];
  assert.equal(computeRowSumMirror({ entries, retired: [], asOf: NOW }).totalTokens, 0);
});

test("retired rows leave the mirror exactly 12 months after retiredAt", () => {
  const r = [retired({ provider: "mistral", retiredAt: "2026-11-18" })];
  assert.equal(
    computeRowSumMirror({ entries: [], retired: r, asOf: new Date("2027-11-17T23:59:00Z") })
      .retiredTokens,
    1e9
  );
  assert.equal(
    computeRowSumMirror({ entries: [], retired: r, asOf: new Date("2027-11-18T00:00:00Z") })
      .retiredTokens,
    0
  );
  assert.equal(
    computeRowSumMirror({ entries: [], retired: r, asOf: new Date("2026-11-17T00:00:00Z") })
      .retiredTokens,
    0
  );
});

test("an empty catalog has a zero share instead of NaN", () => {
  const m = computeRowSumMirror({ entries: [], retired: [], asOf: NOW });
  assert.equal(m.totalTokens, 0);
  assert.equal(m.retiredShare, 0);
});

test("byProvider is ordered by tokens, then by provider id", () => {
  const entries = [
    // Fixture providers must have a tokens unit in FREE_QUOTA_UNIT (llm7 left the map when its pool
    // was retired in the November 2026 re-audit).
    row({ provider: "xkiro", poolKey: "x", monthlyTokens: 3e6 }),
    row({ provider: "groq", poolKey: "g", monthlyTokens: 3e6 }),
    row({ provider: "nara", poolKey: "n", monthlyTokens: 9e6 }),
  ];
  const m = computeRowSumMirror({ entries, retired: [], asOf: NOW });
  assert.deepEqual(
    m.byProvider.map((p) => p.provider),
    ["nara", "groq", "xkiro"]
  );
});

test("the shipped mirror is internally consistent", () => {
  const m = computeRowSumMirror();
  assert.equal(m.method, "row-sum-v1");
  assert.equal(m.totalTokens, m.liveTokens + m.retiredTokens);
  assert.equal(
    m.byProvider.reduce((s, p) => s + p.tokens, 0),
    m.totalTokens
  );
  assert.equal(m.realSteadyTokens, computePublicFreeHeadline().steadyRecurringTokens);
  assert.ok(m.totalTokens >= m.realSteadyTokens);
});
