// Doc-sync guard for audit #15159 — DOC-01.
//
// Several documents state how many routing strategies the combo engine supports,
// and they had all drifted independently from the code:
//
//   AGENTS.md:87                        "19 public strategies" + inline list
//                                        missing `quota-weighted`
//   AGENTS.md:427                       "19 strategies"
//   open-sse/services/AGENTS.md:12      "Strategies (17)" — and its list is missing
//                                        `p2c`, `quota-weighted`, `cache-optimized`
//                                        and `pipeline`
//   docs/routing/AUTO-COMBO.md:279      "19 routing strategies"
//   docs/routing/AUTO-COMBO.md:828      "(19 strategies)"
//   docs/i18n/bs/AGENTS.md:90, :414     "19 javnih strategija" (hand-maintained fork)
//   docs/routing/AUTO-COMBO.md table    missing the `quota-weighted` ROW entirely,
//                                        even though AGENTS.md calls this document
//                                        "the full strategy table"
//
// Two different things are checked, against two different sources:
//
// - The strategy NAMES are checked against the code: a PR that adds a strategy writes its name
//   into these lists and into the AUTO-COMBO.md table itself (that text is the PR's own content).
// - The strategy COUNT is a derived number (plan 2026-11-13): feature PRs no longer write it;
//   `npm run release:refresh-derived` rewrites it and records the same value in
//   docs/reference/derived-facts.json. Between releases the code count moves ahead of the prose
//   by design, so the stated counts are compared with the snapshot (written by the same refresh
//   as the prose), never with the live constant. The snapshot itself must equal the code right
//   after a refresh; that is the release-mode check (`release:refresh-derived --check`).
//
// `quota-share` is deliberately NOT public (`INTERNAL_ROUTING_STRATEGY_VALUES`),
// so it must never appear in these lists.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { loadFactsSnapshot } from "../../scripts/release/facts.mjs";
import {
  INTERNAL_ROUTING_STRATEGY_VALUES,
  ROUTING_STRATEGY_VALUES,
} from "../../src/shared/constants/routingStrategies.ts";

const PUBLIC = [...ROUTING_STRATEGY_VALUES] as string[];
const INTERNAL = [...INTERNAL_ROUTING_STRATEGY_VALUES] as string[];

const snapshot = loadFactsSnapshot() as { routingStrategies: number } | null;
assert.ok(
  snapshot,
  "docs/reference/derived-facts.json is missing — run npm run release:refresh-derived"
);
/** The strategy count the prose must state: the one recorded by the last refresh. */
const COUNT = snapshot.routingStrategies;

function doc(path: string): string {
  return readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
}

/**
 * Strategy ids from the "All Routing Strategies" table only.
 *
 * Scoped deliberately: the document has other tables whose first column is also a
 * backticked id (`| `auto` | default | ... |` at the top of the file), so a
 * whole-document scan double-counts. Matching the section keeps the assertion
 * about the table AGENTS.md actually points at.
 */
function tableStrategies(markdown: string): string[] {
  const start = markdown.indexOf("## All Routing Strategies");
  assert.notEqual(start, -1, "AUTO-COMBO.md must keep its 'All Routing Strategies' section");
  const rest = markdown.slice(start);
  // Stop at the next H2 so a later section's tables cannot leak in.
  const end = rest.slice(3).search(/^## /m);
  const section = end === -1 ? rest : rest.slice(0, end + 3);
  // `0-9` is required: `p2c` is a real strategy id, and a `[a-z-]` class silently
  // drops it — which is exactly how this test would pass while the table is
  // incomplete.
  return [...section.matchAll(/^\|\s*`([a-z0-9-]+)`/gm)].map((m) => m[1]);
}

test("DOC-01: the code exposes a non-trivial public strategy set", () => {
  // Guards the test itself: if the constant ever empties, every count assertion
  // below would pass vacuously.
  assert.ok(PUBLIC.length >= 20, `expected >= 20 public strategies, got ${PUBLIC.length}`);
  // Same guard for the snapshot count the prose is compared with (it may differ from the code
  // between releases, by design).
  assert.ok(COUNT >= 20, `expected >= 20 strategies in derived-facts.json, got ${COUNT}`);
  assert.ok(PUBLIC.includes("quota-weighted"), "quota-weighted must be public");
  assert.ok(!PUBLIC.includes("quota-share"), "quota-share must stay internal");
  assert.deepEqual(INTERNAL, ["quota-share"]);
});

// Phase 2 of plan 2026-11-13: the agent-instruction files (AGENTS.md, its bs fork, the services
// guide) no longer carry the strategy count or the inline list — both went stale (the bs fork said
// "20 strategija", llm.txt's list had lost `expiry-first`). They point to the registry instead, so
// there is no copy to drift. What #15159 DOC-01 guarded is still guarded: no instruction file can
// state a wrong count or an incomplete list, because it states neither, and the counts gate's
// "No derived counts (agent-instruction file …)" invariant keeps it that way. The one place that
// names every strategy is the AUTO-COMBO.md table, checked against the code below.
const REGISTRY = "`ROUTING_STRATEGY_VALUES` in `src/shared/constants/routingStrategies.ts`";
const REGISTRY_BS = "`ROUTING_STRATEGY_VALUES` u `src/shared/constants/routingStrategies.ts`";

function assertNoStrategyCountOrList(text: string, file: string) {
  const count = text.match(
    /(\d+)\*{0,2}\s+(?:public\s+|routing\s+|javn\p{L}*\s+)?strategi(?:es|j\p{L}*)\b/iu
  );
  assert.equal(count, null, `${file} states a strategy count again: "${count?.[0]}"`);
  // An inline list is a line naming most public strategies; a single mention (`fusion`,
  // `quota-share`) is fine.
  const listed = text.split("\n").find((l) => PUBLIC.filter((s) => l.includes(s)).length >= 8);
  assert.equal(listed, undefined, `${file} carries an inline strategy list again: ${listed}`);
}

test("DOC-01: AGENTS.md points to the strategy registry and carries no count or list", () => {
  const text = doc("AGENTS.md");
  assert.ok(text.includes(REGISTRY), "AGENTS.md must point to the strategy registry");
  assertNoStrategyCountOrList(text, "AGENTS.md");
  assert.ok(
    /Auto-Combo \(scoring factors, strategy table\) — `docs\/routing\/AUTO-COMBO\.md`/.test(text),
    "the reference-table row must still send readers to the AUTO-COMBO.md strategy table"
  );
});

test("DOC-01: open-sse/services/AGENTS.md points to the registry and carries no count or list", () => {
  const text = doc("open-sse/services/AGENTS.md");
  const line = text.split("\n").find((l) => /\*\*Strategies\*\*/.test(l));
  assert.ok(line, "open-sse/services/AGENTS.md must document the strategies");
  assert.ok(line.includes(REGISTRY), "the strategies line must point to the registry");
  assertNoStrategyCountOrList(text, "open-sse/services/AGENTS.md");
});

test("DOC-01: AUTO-COMBO.md count and full strategy table match the code", () => {
  const text = doc("docs/routing/AUTO-COMBO.md");

  const counts = [...text.matchAll(/(\d+)\s+(?:routing\s+)?strategies/g)].map((m) => Number(m[1]));
  assert.ok(
    counts.length >= 2,
    "AUTO-COMBO.md must state the count in prose and in its file table"
  );
  for (const count of counts) {
    assert.equal(
      count,
      COUNT,
      `AUTO-COMBO.md states ${count} strategies, derived-facts.json has ${COUNT}`
    );
  }

  const rows = tableStrategies(text);
  assert.deepEqual(
    rows.slice().sort(),
    PUBLIC.slice().sort(),
    "the AUTO-COMBO.md strategy table must have exactly one row per public strategy"
  );
});

test("DOC-01: the bs i18n fork points to the registry too", () => {
  // docs/i18n/bs/AGENTS.md is a hand-maintained translation fork (DOC-03), so it drifted
  // silently ("20 strategija" while the code had 21). It is the only AGENTS.md mirror tracked in
  // the repo; like the source it now points to the registry and states no count.
  const text = doc("docs/i18n/bs/AGENTS.md");
  assert.ok(text.includes(REGISTRY_BS), "the bs mirror must point to the strategy registry");
  assertNoStrategyCountOrList(text, "docs/i18n/bs/AGENTS.md");
});
