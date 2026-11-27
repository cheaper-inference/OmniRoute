import assert from "node:assert/strict";
import test from "node:test";

import {
  FREE_MODEL_BUDGETS,
  RETIRED_FREE_ROWS,
  computeFreeModelTotals,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { AI_PROVIDERS } from "@/shared/constants/providers.ts";

/**
 * Five OpenAI-compatible free-tier aggregators (ainative, aion, sealion,
 * routeway, nara). The tests pin the decisions that are easy to break silently.
 */

const NEW_PROVIDERS = ["ainative", "aion", "sealion", "routeway", "nara"] as const;
const byProvider = (id: string) => FREE_MODEL_BUDGETS.filter((m) => m.provider === id);

test("each new provider is both routable and canonically registered", () => {
  for (const id of NEW_PROVIDERS) {
    assert.ok(REGISTRY[id], `${id} must exist in the execution REGISTRY`);
    assert.ok(AI_PROVIDERS[id], `${id} must exist as a canonical provider`);
    assert.equal(REGISTRY[id].format, "openai");
    assert.ok(byProvider(id).length > 0, `${id} must have free-catalog entries`);
  }
});

test("routeway pins a browser User-Agent (Cloudflare rejects non-browser UAs with 1010)", () => {
  const ua = REGISTRY.routeway.extraHeaders?.["User-Agent"] ?? "";
  assert.match(ua, /Mozilla/, "routeway must send a browser-style User-Agent");
});

test("providers with no ungated token quota never inflate the headline", () => {
  // AINative and SeaLion have no published quota eligible for these rows.
  for (const id of ["ainative", "sealion"]) {
    const rows = byProvider(id);
    assert.ok(
      rows.every((m) => m.monthlyTokens === 0 && m.creditTokens === 0),
      `${id} has no published token quota — it must not carry invented numbers`
    );
    assert.ok(
      rows.every((m) => m.freeType === "recurring-uncapped" || m.freeType === "discontinued")
    );
  }
  const totals = computeFreeModelTotals();
  assert.ok(totals.uncappedProviders.includes("sealion"), "sealion must surface as uncapped");
  // AINative became paid; Aion requires a verified card.
  assert.ok(byProvider("ainative").every((m) => m.freeType === "discontinued"));
  // https://api.routeway.ai/v1/models and https://docs.routeway.ai/getting-started/rate-limits.md
  // (2026-11-27): eight discontinued ids and seven live ids at 200 requests/day.
  const routeway = byProvider("routeway");
  assert.equal(routeway.filter((row) => row.freeType === "discontinued").length, 8);
  assert.equal(routeway.filter((row) => row.freeType === "recurring-daily").length, 7);
  for (const row of routeway) {
    assert.ok(row.freeType === "discontinued" || row.freeType === "recurring-daily");
    assert.equal(row.monthlyTokens, row.freeType === "recurring-daily" ? 4_800_000 : 0);
    assert.equal(row.creditTokens, 0);
  }
  // https://www.aionlabs.ai/docs/rate-limits/ (2026-11-27): 20,000 tokens/day behind card verification.
  const aion = byProvider("aion");
  assert.equal(aion.filter((row) => row.freeType === "recurring-daily").length, 6);
  for (const row of aion) {
    assert.ok(row.freeType === "recurring-daily" || row.freeType === "discontinued");
    assert.equal(row.monthlyTokens, row.freeType === "recurring-daily" ? 600_000 : 0);
    assert.equal(row.creditTokens, 0);
    if (row.freeType === "recurring-daily") assert.deepEqual(row.gates, ["card"]);
  }
  for (const id of ["ainative", "aion", "routeway"])
    assert.ok(!totals.uncappedProviders.includes(id), `${id} has no uncapped offer`);
});

test("nara was a single shared 7M/day pool; its free plan now lists no models", () => {
  const rows = byProvider("nara");
  assert.ok(rows.length >= 1);
  // 7M tokens/day shared across all plan models => 210M/month (2026-09-02); retired on 2026-11-23
  // (GET /api/plans → "models":[]), so the pool's last quota lives in the ledger.
  assert.ok(rows.every((m) => m.poolKey === "nara-free"));
  assert.ok(rows.every((m) => m.monthlyTokens === 0 && m.freeType === "discontinued"));
  const ledger = RETIRED_FREE_ROWS.filter((r) => r.provider === "nara");
  assert.equal(ledger.length, rows.length);
  assert.ok(ledger.every((r) => r.lastListedMonthlyTokens === 210_000_000));
});

test("every catalog provider id still resolves to a canonical provider", () => {
  const unknown = [...new Set(FREE_MODEL_BUDGETS.map((m) => m.provider))].filter(
    (id) => !AI_PROVIDERS[id]
  );
  assert.deepEqual(unknown, [], `dangling catalog providers: ${unknown.join(", ")}`);
});
