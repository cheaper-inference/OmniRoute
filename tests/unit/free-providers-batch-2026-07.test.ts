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

test("providers with no published token quota never inflate the headline", () => {
  // ainative ("claimed"), aion (per-day request cap), sealion (RPM only),
  // routeway (RPD): real free access, no verifiable monthly token figure.
  for (const id of ["ainative", "aion", "sealion", "routeway"]) {
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
  // Re-audit 2026-11-23: ainative became a paid plan after a 3-day trial and every routeway id
  // left its /v1/models (all rows discontinued); aion activates free keys only after a verified
  // card (gates ["card"]), so none of the three is listed as open to anyone.
  for (const id of ["ainative", "routeway"])
    assert.ok(
      byProvider(id).every((m) => m.freeType === "discontinued"),
      id
    );
  assert.ok(
    byProvider("aion")
      .filter((m) => m.freeType !== "discontinued")
      .every((m) => m.gates?.includes("card"))
  );
  for (const id of ["ainative", "aion", "routeway"])
    assert.ok(!totals.uncappedProviders.includes(id), `${id} is not open to anyone`);
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
