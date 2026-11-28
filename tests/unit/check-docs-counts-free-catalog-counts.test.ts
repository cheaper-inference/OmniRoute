// Public free-catalog counts by access type (Radar v2, plan 02, Task 4).
//
// The README and the free-tier reference publish how many providers give free access (and
// through what: an API key, no key, a tool account, a web chat), how many catalog rows give free
// access, how many pools carry a published quota and how many distinct models are free. Each of
// those sentences is a claim the counts gate reads against the facts probe (`code.freeProviders`,
// `code.freeAccessRows`, `code.freePublishedPools`, `code.freeModels`), and the release refresh
// rewrites a stale one. The facts below are synthetic: the live values move with the catalog.
import test from "node:test";
import assert from "node:assert/strict";

type Verdict = { ok: boolean; detail: string };
type Edit = { start: number; end: number; to: string };
type Check = {
  label: string;
  scope: string;
  files: string[];
  validate?: (content: string) => Verdict;
  extract?: (content: string) => { value: unknown }[];
  plan?: (content: string) => { edits: Edit[]; manual: string[] };
};
type Facts = Record<string, unknown> & { code?: Record<string, unknown> | null };

const gate = (await import("../../scripts/check/check-docs-counts-sync.mjs")) as unknown as {
  buildChecks: (opts?: { facts?: Facts }) => Check[];
  PR_MODE_FACTS: Facts;
};
const factsLib = (await import("../../scripts/release/facts.mjs")) as unknown as {
  loadFactsSnapshot: () => Facts | null;
};

const snapshot = factsLib.loadFactsSnapshot() as Facts;
const FACTS: Facts = {
  ...snapshot,
  code: {
    ...(snapshot.code ?? {}),
    freeProviders: { total: 50, apiKey: 38, keyless: 8, toolAccount: 3, webChat: 1 },
    freePublishedPools: 13,
    freeAccessRows: 218,
    freeModels: 188,
  },
};
const checks = gate.buildChecks({ facts: FACTS });
const byLabel = (label: string) => {
  const found = checks.find((c) => c.label === label);
  assert.ok(found, `no check labelled ${label}`);
  return found;
};

const CASES: Array<[string, string, string]> = [
  ["providers with free access (live code)", "50 with free access", "51 with free access"],
  ["free providers with an API key (live code)", "38 with an API key", "39 with an API key"],
  ["free providers without a key (live code)", "8 without a key", "6 without a key"],
  [
    "free providers through a tool account (live code)",
    "3 through a tool account",
    "1 through a tool account",
  ],
  ["free providers through a web chat (live code)", "1 through a web chat", "0 through a web chat"],
  [
    "pools with a published quota (live code)",
    "13 pools with a published quota",
    "12 pools with a published quota",
  ],
  [
    "catalog rows with free access (live code)",
    "218 catalog rows with free access",
    "214 catalog rows with free access",
  ],
  ["distinct free models (live code)", "188 distinct free models", "185 distinct free models"],
];

test("each public free-catalog count is a claim judged against its own fact", () => {
  for (const [label, good, stale] of CASES) {
    const c = byLabel(label);
    assert.equal(c.scope, "derived", label);
    assert.equal(c.validate?.(`Today: ${good}.`).ok, true, `${label}: ${good}`);
    assert.equal(c.validate?.(`Today: ${stale}.`).ok, false, `${label}: ${stale}`);
  }
});

test("the provider count and the row count never read each other's sentence", () => {
  const providers = byLabel("providers with free access (live code)");
  const rows = byLabel("catalog rows with free access (live code)");
  assert.deepEqual(providers.extract?.("214 catalog rows with free access"), []);
  assert.deepEqual(rows.extract?.("51 with free access"), []);
  assert.equal(providers.extract?.("## 394 AI Providers, 50 With Free Access").length, 1);
  assert.equal(providers.extract?.("50 providers with free access").length, 1);
  assert.equal(
    byLabel("distinct free models (live code)").extract?.("1 distinct free model").length,
    1
  );
});

test("the counts are read where they are published", () => {
  const files = (label: string) => byLabel(label).files;
  for (const [label] of CASES) {
    assert.ok(files(label).includes("README.md"), `${label}: README.md`);
    assert.ok(files(label).includes("docs/reference/FREE_TIERS.md"), `${label}: FREE_TIERS.md`);
  }
  for (const label of [
    "pools with a published quota (live code)",
    "catalog rows with free access (live code)",
  ]) {
    assert.ok(files(label).includes("docs/diagrams/free-tier-budget.svg"), label);
  }
  for (const doc of [
    "docs/getting-started/SELF_HOST_GUIDE.md",
    "docs/guides/FREE_PROVIDER_RANKINGS.md",
    "docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md",
  ]) {
    assert.ok(files("providers with free access (live code)").includes(doc), doc);
  }
});

test("the release refresh rewrites a stale count", () => {
  const c = byLabel("catalog rows with free access (live code)");
  const content = "We keep 214 catalog rows with free access.";
  const plan = c.plan?.(content);
  assert.ok(plan);
  assert.deepEqual(plan.manual, []);
  assert.equal(plan.edits.length, 1);
  const [e] = plan.edits;
  assert.equal(
    content.slice(0, e.start) + e.to + content.slice(e.end),
    "We keep 218 catalog rows with free access."
  );
});

test("the checks build without facts (pr mode)", () => {
  const pr = gate.buildChecks({ facts: gate.PR_MODE_FACTS });
  for (const [label] of CASES) {
    const c = pr.find((x) => x.label === label);
    assert.ok(c, label);
    assert.equal(typeof c.extract, "function", label);
  }
});

test("a facts document without the counts leaves them unjudged", () => {
  const legacy = gate.buildChecks({
    facts: {
      ...snapshot,
      code: { ...(snapshot.code ?? {}), freeProviders: undefined, freeAccessRows: undefined },
    },
  });
  const rows = legacy.find((c) => c.label === "catalog rows with free access (live code)");
  assert.ok(rows?.validate && rows.plan);
  assert.equal(rows.validate("We keep 214 catalog rows with free access.").ok, true);
  assert.deepEqual(rows.plan("We keep 214 catalog rows with free access.").edits, []);
  const providers = legacy.find((c) => c.label === "providers with free access (live code)");
  assert.equal(providers?.validate?.("50 with free access").ok, true);
});
