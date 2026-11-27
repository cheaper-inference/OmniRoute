import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  FREE_MODEL_BUDGETS,
  RETIRED_FREE_ROWS,
  RETIRED_LEDGER_SINCE,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { FREE_CATALOG_CURATED_AT } from "@omniroute/open-sse/config/freeModelCatalog.data.ts";

// These invariants run on the shipped ledger in every PR: empty today, filled by the re-audit.

test("every retired row carries a positive last quota, a date in range and evidence", () => {
  assert.match(RETIRED_LEDGER_SINCE, /^\d{4}-\d{2}-\d{2}$/);
  for (const r of RETIRED_FREE_ROWS) {
    const key = `${r.provider}/${r.modelId}`;
    assert.ok(r.lastListedMonthlyTokens > 0, key);
    assert.match(r.retiredAt, /^\d{4}-\d{2}-\d{2}$/, key);
    assert.ok(r.retiredAt >= RETIRED_LEDGER_SINCE, `${key} retired before the ledger starts`);
    assert.ok(r.retiredAt <= FREE_CATALOG_CURATED_AT, `${key} retired after the catalog date`);
    assert.ok(r.evidence.trim().length > 0, key);
  }
});

test("a retired row is never live in the catalog", () => {
  for (const r of RETIRED_FREE_ROWS) {
    const live = FREE_MODEL_BUDGETS.find(
      (m) => m.provider === r.provider && m.modelId === r.modelId
    );
    assert.ok(
      !live || live.freeType === "discontinued",
      `${r.provider}/${r.modelId} is live and retired`
    );
    assert.ok(!live || (live.monthlyTokens === 0 && live.creditTokens === 0));
  }
});

test("ledger keys are unique", () => {
  const keys = RETIRED_FREE_ROWS.map((r) => `${r.provider}/${r.modelId}`);
  assert.equal(new Set(keys).size, keys.length);
});

test("no provider removed from the project appears in the ledger", () => {
  const doc = fs.readFileSync(
    path.join(process.cwd(), "docs/reference/REMOVED_PROVIDERS.md"),
    "utf8"
  );
  const removed = new Set<string>();
  for (const line of doc.split("\n")) {
    if (!line.startsWith("|")) continue;
    const cells = line.split("|").map((c) => c.trim());
    // The provider id is the first back-ticked id in the row.
    const id = cells.map((c) => c.match(/^`([a-z0-9][a-z0-9-]*)`/)?.[1]).find(Boolean);
    if (id) removed.add(id);
  }
  assert.ok(removed.has("puter"), "the parser reads the removed-providers table");
  for (const r of RETIRED_FREE_ROWS) assert.ok(!removed.has(r.provider), r.provider);
});

test("every discontinued catalog row carries no quota and no credit", () => {
  for (const m of FREE_MODEL_BUDGETS.filter((x) => x.freeType === "discontinued")) {
    assert.equal(m.monthlyTokens, 0, `${m.provider}/${m.modelId}`);
    assert.equal(m.creditTokens, 0, `${m.provider}/${m.modelId}`);
  }
});
