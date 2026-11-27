import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  FREE_MODEL_BUDGETS,
  RETIRED_FREE_ROWS,
  computeFreeModelTotals,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { FREE_TIER_BUDGETS } from "@omniroute/open-sse/config/freeTierCatalog.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";

/**
 * 2026-09-02 re-audit against the providers' own pages — the official pages
 * cited in the `// evidence:` comments next to each entry in
 * `open-sse/config/freeModelCatalog.data.ts`. Each test pins one verified
 * fact so the catalog cannot drift back to an invented number.
 */
const rows = (id: string) => FREE_MODEL_BUDGETS.filter((m) => m.provider === id);
const ids = (id: string) =>
  rows(id)
    .map((m) => m.modelId)
    .sort();

test("gemini publishes no per-model free limits any more — uncapped, never summed", () => {
  const g = rows("gemini");
  assert.ok(g.length >= 1);
  assert.ok(g.every((m) => m.freeType === "recurring-uncapped" && m.monthlyTokens === 0));
  assert.ok(computeFreeModelTotals().uncappedProviders.includes("gemini"));
});

test("ollama-cloud ended its free tier on 2026-11-09 — no rows, not listed as uncapped (#19334)", () => {
  assert.equal(rows("ollama-cloud").length, 0);
  const totals = computeFreeModelTotals();
  assert.equal(totals.uncappedProviders.includes("ollama-cloud"), false);
  assert.equal(
    totals.perModel.some((m) => m.poolKey === "ollama-cloud"),
    false
  );
});

test("groq free plan: 200K TPD per model × 30 = 6M per model, each cap independent", () => {
  // Re-audit 2026-11-23 (console.groq.com/docs/rate-limits.md and deprecations.md): four live
  // models; qwen/qwen3.6-27b was deprecated on 2026-09-14 and is kept as discontinued.
  const live = rows("groq").filter((m) => m.freeType !== "discontinued");
  assert.deepEqual(live.map((m) => m.modelId).sort(), [
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "openai/gpt-oss-safeguard-20b",
    "qwen/qwen3.8-27b",
  ]);
  for (const m of live) {
    assert.equal(m.monthlyTokens, 6_000_000, m.modelId);
    assert.equal(m.poolKey, null, `${m.modelId} is a per-model cap, not a shared pool`);
    assert.equal(m.freeType, "recurring-daily");
    assert.equal(m.hardStopGuaranteed, true);
  }
  const retired = rows("groq").filter((m) => m.freeType === "discontinued");
  assert.deepEqual(
    retired.map((m) => [m.modelId, m.monthlyTokens, m.creditTokens]),
    [["qwen/qwen3.6-27b", 0, 0]]
  );
  // https://console.groq.com/docs/deprecations.md (2026-11-27) confirms the retired routes.
  for (const dead of [
    "groq/compound",
    "groq/compound-mini",
    "llama-3.3-70b-versatile",
    "meta-llama/llama-4-scout-17b-16e-instruct",
    "qwen/qwen3-32b",
  ]) {
    assert.ok(!ids("groq").includes(dead), `${dead} must not be in the free catalog`);
  }
  const registryIds = new Set(REGISTRY.groq.models.map((m) => m.id));
  for (const m of live) assert.ok(registryIds.has(m.modelId), `${m.modelId} must be routable`);
});

test("nara restores Agnes 2.5 Flash and keeps the other seven free rows retired", () => {
  // https://router.bynara.id/api/plans and https://router.bynara.id/docs (2026-11-27).
  const registered = [
    "agnes-2.0-flash",
    "agnes-2.5-flash",
    "laguna-s-2.1",
    "minimax-m3-free",
    "mistral-large",
    "mistral-medium-3-5",
    "qwen3.8-27b",
    "stepfun-3.7-flash",
  ];
  const activeId = "agnes-2.5-flash";
  const retiredIds = registered.filter((id) => id !== activeId);
  assert.deepEqual(ids("nara"), registered);
  for (const m of rows("nara")) {
    const active = m.modelId === activeId;
    assert.equal(m.monthlyTokens, active ? 210_000_000 : 0, m.modelId);
    assert.equal(m.creditTokens, 0, m.modelId);
    assert.equal(m.poolKey, "nara-free");
    assert.equal(m.freeType, active ? "recurring-daily" : "discontinued");
    assert.deepEqual(m.gates ?? [], active ? ["telegram"] : []);
  }
  const ledger = RETIRED_FREE_ROWS.filter((r) => r.provider === "nara");
  assert.deepEqual(ledger.map((r) => r.modelId).sort(), registered);
  assert.deepEqual(
    ledger
      .filter((r) => r.revivedAt === undefined)
      .map((r) => r.modelId)
      .sort(),
    retiredIds
  );
  assert.equal(ledger.find((r) => r.modelId === activeId)?.revivedAt, "2026-11-27");
  assert.ok(ledger.every((r) => r.lastListedMonthlyTokens === 210_000_000));
  assert.ok(ledger.every((r) => r.reason === "no-models"));
  // Routing is untouched: the paid models stay reachable with a paid key.
  assert.deepEqual(REGISTRY.nara.models.map((m) => m.id).sort(), registered);
});

test("mistral keeps its 1B pool only with a dated console verification on record", () => {
  const src = readFileSync(
    new URL("../../open-sse/config/freeModelCatalog.data.ts", import.meta.url),
    "utf8"
  );
  const m = rows("mistral");
  assert.ok(m.length >= 1);
  const pooled = m.filter((r) => r.monthlyTokens > 0);
  if (pooled.length > 0) {
    // All-or-nothing: a mixed 1B/0 state is neither console-verified nor honestly uncapped.
    assert.equal(pooled.length, m.length, "every mistral row must carry the pooled 1B");
    assert.ok(
      pooled.every(
        (r) =>
          r.monthlyTokens === 1_000_000_000 &&
          r.poolKey === "mistral" &&
          r.freeType === "recurring-monthly"
      )
    );
    assert.match(
      src,
      /evidence: console-verified 20\d\d-\d\d-\d\d por \S+ \(https:\/\/console\.mistral\.ai/
    );
  } else {
    // Re-audit 2026-11-23 (docs.mistral.ai/admin/billing-usage/usage-limits): the free mode has no
    // API access, so the pool is retired and its last quota lives in the ledger.
    assert.ok(
      m.every((r) => r.monthlyTokens === 0 && r.creditTokens === 0 && r.freeType === "discontinued")
    );
    const ledger = RETIRED_FREE_ROWS.filter((r) => r.provider === "mistral");
    assert.deepEqual(ledger.map((r) => r.modelId).sort(), m.map((r) => r.modelId).sort());
    assert.ok(ledger.every((r) => r.lastListedMonthlyTokens === 1_000_000_000));
    assert.ok(ledger.every((r) => r.reason === "ended"));
  }
});

test("legacy provider-level catalog agrees with the per-model catalog for the re-audited providers", () => {
  assert.equal(FREE_TIER_BUDGETS.gemini, undefined);
  assert.equal(FREE_TIER_BUDGETS["ollama-cloud"], undefined);
  // https://console.groq.com/docs/rate-limits (2026-11-27): 4 live models × 6M.
  // https://router.bynara.id/docs (2026-11-27): Nara Free API access needs Telegram.
  assert.equal(FREE_TIER_BUDGETS.groq, 24_000_000);
  assert.equal(FREE_TIER_BUDGETS.nara, undefined);
});

test("modelscope: 250 魔粒/day → 6M/month, one pool, behind mainland real-name verification", () => {
  const m = rows("modelscope");
  assert.ok(m.length >= 1);
  for (const r of m) {
    assert.equal(r.monthlyTokens, 6_000_000, r.modelId);
    assert.equal(r.poolKey, "modelscope-free");
    assert.equal(r.freeType, "recurring-daily");
    assert.equal(r.eligibilityGate, "regional-identity");
    assert.equal(r.tos, "caution");
  }
  const t = computeFreeModelTotals();
  // https://www.aionlabs.ai/docs/rate-limits/ (2026-11-27): Aion adds 0.6M behind a card.
  assert.equal(t.gatedRecurringTokens, 6_600_000);
  assert.deepEqual(t.gatedProviders, ["aion", "modelscope"]);
  assert.ok(!t.uncappedProviders.includes("modelscope"));
});

test("a shared pool never mixes gated and ungated entries", () => {
  const byPool = new Map<string, Set<string>>();
  for (const r of FREE_MODEL_BUDGETS) {
    if (!r.poolKey) continue;
    const gate = r.eligibilityGate ?? "none";
    const seen = byPool.get(r.poolKey) ?? new Set<string>();
    seen.add(gate);
    byPool.set(r.poolKey, seen);
  }
  for (const [poolKey, gates] of byPool) {
    assert.equal(
      gates.size,
      1,
      `pool ${poolKey} mixes eligibility gates: ${[...gates].join(", ")}`
    );
  }
});
