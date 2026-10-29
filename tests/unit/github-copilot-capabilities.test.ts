/**
 * Tests for GitHub Copilot capability discovery (#9000-series).
 *
 * Covers: plan inference, model selection mode, quota state, capability record
 * lifecycle, entitlement verification, auto-model fallback, free-tier catalog
 * exclusion, and error classification.
 *
 * All GitHub API responses are fixture objects; no real GitHub account is needed.
 * Fixtures are named to reflect the account tier they represent.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  COPILOT_AUTO_MODEL_ID,
  CAPABILITY_WARNING_VERSION,
  inferPlanFromApiResponse,
  inferModelSelectionMode,
  inferQuotaState,
  discoverCopilotCapabilities,
  filterModelsForCapabilities,
  buildDefaultCapabilityRecord,
  shouldShowPolicyWarning,
  areCapabilitiesFresh,
  planRequiresAutoModelSelection,
} = await import("../../open-sse/services/githubCopilotCapabilities.ts");

// ── Plan inference ────────────────────────────────────────────────────────────

test("inferPlanFromApiResponse: copilot_plan=free → 'free'", () => {
  assert.equal(inferPlanFromApiResponse({ copilot_plan: "free" }), "free");
});

test("inferPlanFromApiResponse: copilot_plan=student → 'student'", () => {
  assert.equal(inferPlanFromApiResponse({ copilot_plan: "student" }), "student");
});

test("inferPlanFromApiResponse: copilot_plan=pro → 'pro'", () => {
  assert.equal(inferPlanFromApiResponse({ copilot_plan: "pro" }), "pro");
});

test("inferPlanFromApiResponse: copilot_plan=PRO+ (case-insensitive) → 'pro_plus'", () => {
  assert.equal(inferPlanFromApiResponse({ copilot_plan: "PRO+" }), "pro_plus");
});

test("inferPlanFromApiResponse: copilot_plan=max → 'max'", () => {
  assert.equal(inferPlanFromApiResponse({ copilot_plan: "max" }), "max");
});

test("inferPlanFromApiResponse: copilot_plan=business → 'business'", () => {
  assert.equal(inferPlanFromApiResponse({ copilot_plan: "business" }), "business");
});

test("inferPlanFromApiResponse: copilot_plan=enterprise → 'enterprise'", () => {
  assert.equal(inferPlanFromApiResponse({ copilot_plan: "enterprise" }), "enterprise");
});

test("inferPlanFromApiResponse: access_type_sku SKU fallback — pro_plus SKU", () => {
  assert.equal(inferPlanFromApiResponse({ access_type_sku: "copilot_pro_plus" }), "pro_plus");
});

test("inferPlanFromApiResponse: unknown plan string → 'unknown'", () => {
  assert.equal(inferPlanFromApiResponse({ copilot_plan: "ultra_new_tier" }), "unknown");
});

test("inferPlanFromApiResponse: empty object → 'unknown'", () => {
  assert.equal(inferPlanFromApiResponse({}), "unknown");
});

test("inferPlanFromApiResponse: null → 'unknown'", () => {
  assert.equal(inferPlanFromApiResponse(null), "unknown");
});

// ── Auto model selection enforcement ─────────────────────────────────────────

test("planRequiresAutoModelSelection: free plan requires auto", () => {
  assert.equal(planRequiresAutoModelSelection("free"), true);
});

test("planRequiresAutoModelSelection: student plan requires auto", () => {
  assert.equal(planRequiresAutoModelSelection("student"), true);
});

test("planRequiresAutoModelSelection: pro does NOT require auto", () => {
  assert.equal(planRequiresAutoModelSelection("pro"), false);
});

test("planRequiresAutoModelSelection: unknown does NOT require auto (conservative: trust /models signal)", () => {
  assert.equal(planRequiresAutoModelSelection("unknown"), false);
});

// ── Model selection mode from /models response ────────────────────────────────

const FREE_MODELS_FIXTURE = {
  data: [
    { id: "gpt-4o-2024-11-20", name: "GPT-4o", model_picker_enabled: false },
    { id: "claude-sonnet-5", name: "Claude Sonnet 5", model_picker_enabled: false },
  ],
};

const PAID_MODELS_FIXTURE = {
  data: [
    { id: "gpt-5.4", name: "GPT-5.4", model_picker_enabled: true },
    { id: "claude-opus-5", name: "Claude Opus 5", model_picker_enabled: true },
    { id: "gpt-4o-2024-11-20", name: "GPT-4o", model_picker_enabled: true },
  ],
};

test("inferModelSelectionMode: all model_picker_enabled:false → 'auto'", () => {
  assert.equal(inferModelSelectionMode(FREE_MODELS_FIXTURE), "auto");
});

test("inferModelSelectionMode: at least one model_picker_enabled:true → 'explicit'", () => {
  assert.equal(inferModelSelectionMode(PAID_MODELS_FIXTURE), "explicit");
});

test("inferModelSelectionMode: missing model_picker_enabled → 'auto' (conservative)", () => {
  const noPickerField = { data: [{ id: "gpt-4o", name: "GPT-4o" }] };
  assert.equal(inferModelSelectionMode(noPickerField), "auto");
});

test("inferModelSelectionMode: empty data array → 'auto'", () => {
  assert.equal(inferModelSelectionMode({ data: [] }), "auto");
});

test("inferModelSelectionMode: malformed payload → 'auto'", () => {
  assert.equal(inferModelSelectionMode(null), "auto");
  assert.equal(inferModelSelectionMode("not-an-object"), "auto");
});

// ── Quota state inference ─────────────────────────────────────────────────────

test("inferQuotaState: Free account brand new (all remaining = total) → 'available'", () => {
  const state = inferQuotaState({
    copilot_plan: "free",
    monthly_quotas: { chat: 50, completions: 2000 },
    limited_user_quotas: { chat: 50, completions: 2000 },
  });
  assert.equal(state, "available");
});

test("inferQuotaState: Free account fully exhausted → 'exhausted'", () => {
  const state = inferQuotaState({
    copilot_plan: "free",
    monthly_quotas: { chat: 50 },
    limited_user_quotas: { chat: 0 },
  });
  assert.equal(state, "exhausted");
});

test("inferQuotaState: Paid account with remaining credits → 'available'", () => {
  const state = inferQuotaState({
    copilot_plan: "pro",
    quota_snapshots: {
      premium_interactions: { remaining: 800, total: 1500, percent_remaining: 53 },
    },
  });
  assert.equal(state, "available");
});

test("inferQuotaState: Paid account low credits (≤10%) → 'low'", () => {
  const state = inferQuotaState({
    copilot_plan: "pro",
    quota_snapshots: {
      premium_interactions: { remaining: 80, total: 1500, percent_remaining: 5 },
    },
  });
  assert.equal(state, "low");
});

test("inferQuotaState: Paid account all buckets at zero → 'exhausted'", () => {
  const state = inferQuotaState({
    copilot_plan: "pro",
    quota_snapshots: {
      premium_interactions: { remaining: 0, total: 1500, percent_remaining: 0 },
    },
  });
  assert.equal(state, "exhausted");
});

test("inferQuotaState: No quota data present → 'unknown'", () => {
  assert.equal(inferQuotaState({ copilot_plan: "free" }), "unknown");
});

test("inferQuotaState: Empty response → 'unknown'", () => {
  assert.equal(inferQuotaState({}), "unknown");
});

// ── Capability discovery (with injected fetch) ────────────────────────────────

function makeUserApiResponse(opts: {
  plan?: string;
  limited?: Record<string, number>;
  monthly?: Record<string, number>;
  status?: number;
}) {
  const { plan = "free", limited, monthly, status = 200 } = opts;
  return new Response(
    JSON.stringify({
      copilot_plan: plan,
      ...(monthly ? { monthly_quotas: monthly } : {}),
      ...(limited ? { limited_user_quotas: limited } : {}),
    }),
    { status, headers: { "content-type": "application/json" } }
  );
}

function makeModelsResponse(models: Array<{ id: string; model_picker_enabled: boolean }>) {
  return new Response(
    JSON.stringify({ data: models.map((m) => ({ ...m, capabilities: { type: "chat" } })) }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function makeFetchStub(responses: Record<string, Response>) {
  return async (url: string) => {
    const urlStr = String(url);
    for (const [key, resp] of Object.entries(responses)) {
      if (urlStr.includes(key)) return resp.clone();
    }
    return new Response("not found", { status: 404 });
  };
}

test("discoverCopilotCapabilities: Free account → auto mode, unknown quota, entitlement verified", async () => {
  const fetchStub = makeFetchStub({
    "copilot_internal/user": makeUserApiResponse({
      plan: "free",
      monthly: { chat: 50 },
      limited: { chat: 50 },
    }),
    "githubcopilot.com/models": makeModelsResponse([
      { id: "gpt-4o-2024-11-20", model_picker_enabled: false },
    ]),
  });

  const rec = await discoverCopilotCapabilities({
    accessToken: "gho_test_free",
    copilotToken: "ghs_copilot_free",
    fetchImpl: fetchStub as typeof fetch,
  });

  assert.equal(rec.plan, "free");
  assert.equal(rec.modelSelectionMode, "auto");
  assert.equal(rec.entitlementVerified, true);
  assert.equal(rec.endpointCompatible, true);
  assert.equal(rec.policyStatus, "ambiguous");
  assert.ok(rec.lastCapabilityRefreshAt, "refresh timestamp set");
  // Quota: Free plan with full remaining → available
  assert.equal(rec.quotaState, "available");
});

test("discoverCopilotCapabilities: Paid Pro account → explicit mode", async () => {
  const fetchStub = makeFetchStub({
    "copilot_internal/user": makeUserApiResponse({
      plan: "pro",
      status: 200,
    }),
    "githubcopilot.com/models": makeModelsResponse([
      { id: "gpt-5.4", model_picker_enabled: true },
      { id: "claude-opus-5", model_picker_enabled: true },
    ]),
  });

  const rec = await discoverCopilotCapabilities({
    accessToken: "gho_test_pro",
    copilotToken: "ghs_copilot_pro",
    fetchImpl: fetchStub as typeof fetch,
  });

  assert.equal(rec.plan, "pro");
  assert.equal(rec.modelSelectionMode, "explicit");
  assert.equal(rec.entitlementVerified, true);
});

test("discoverCopilotCapabilities: No Copilot entitlement (403) → entitlementVerified:false", async () => {
  const fetchStub = makeFetchStub({
    "copilot_internal/user": new Response("Forbidden", { status: 403 }),
  });

  const rec = await discoverCopilotCapabilities({
    accessToken: "gho_no_copilot",
    fetchImpl: fetchStub as typeof fetch,
  });

  assert.equal(rec.entitlementVerified, false);
  assert.equal(rec.modelSelectionMode, "auto");
  assert.equal(rec.policyStatus, "ambiguous");
});

test("discoverCopilotCapabilities: 401 → entitlementVerified:false (invalid token)", async () => {
  const fetchStub = makeFetchStub({
    "copilot_internal/user": new Response("Unauthorized", { status: 401 }),
  });

  const rec = await discoverCopilotCapabilities({
    accessToken: "invalid_token",
    fetchImpl: fetchStub as typeof fetch,
  });

  assert.equal(rec.entitlementVerified, false);
});

test("discoverCopilotCapabilities: network failure → conservative default record", async () => {
  const throwingFetch = async () => {
    throw new Error("network error");
  };

  const rec = await discoverCopilotCapabilities({
    accessToken: "gho_test",
    fetchImpl: throwingFetch as typeof fetch,
  });

  assert.equal(rec.plan, "unknown");
  assert.equal(rec.modelSelectionMode, "auto");
  assert.equal(rec.entitlementVerified, false);
  assert.equal(rec.lastCapabilityRefreshAt, null);
});

test("discoverCopilotCapabilities: Free plan enforces auto regardless of model_picker_enabled", async () => {
  // A /models response that has model_picker_enabled:true should NOT override
  // the plan-based auto enforcement for Free accounts.
  const fetchStub = makeFetchStub({
    "copilot_internal/user": makeUserApiResponse({ plan: "free" }),
    // Adversarial fixture: model_picker_enabled:true for a Free account
    "githubcopilot.com/models": makeModelsResponse([{ id: "gpt-5.4", model_picker_enabled: true }]),
  });

  const rec = await discoverCopilotCapabilities({
    accessToken: "gho_free_adversarial",
    copilotToken: "ghs_copilot",
    fetchImpl: fetchStub as typeof fetch,
  });

  // Plan-based enforcement takes precedence
  assert.equal(rec.plan, "free");
  assert.equal(
    rec.modelSelectionMode,
    "auto",
    "Free plan must stay auto regardless of model_picker signal"
  );
});

// ── filterModelsForCapabilities ───────────────────────────────────────────────

const AUTO_ENTRY = { id: COPILOT_AUTO_MODEL_ID, name: "Copilot (auto select)" };

test("filterModelsForCapabilities: auto-only account → only the auto model returned", () => {
  const autoCapabilities = {
    ...buildDefaultCapabilityRecord(),
    modelSelectionMode: "auto" as const,
  };
  const allModels = [
    { id: "gpt-5.4", name: "GPT-5.4" },
    { id: "claude-opus-5", name: "Claude Opus 5" },
    { id: COPILOT_AUTO_MODEL_ID, name: "Copilot (auto select)" },
  ];

  const filtered = filterModelsForCapabilities(allModels, autoCapabilities, AUTO_ENTRY);
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0]!.id, COPILOT_AUTO_MODEL_ID);
});

test("filterModelsForCapabilities: explicit-capable account → all models returned as-is", () => {
  const explicitCapabilities = {
    ...buildDefaultCapabilityRecord(),
    modelSelectionMode: "explicit" as const,
  };
  const models = [
    { id: "gpt-5.4", name: "GPT-5.4" },
    { id: "claude-opus-5", name: "Claude Opus 5" },
  ];

  const filtered = filterModelsForCapabilities(models, explicitCapabilities, AUTO_ENTRY);
  assert.equal(filtered.length, 2);
  assert.equal(filtered[0]!.id, "gpt-5.4");
});

// ── Policy and warning state ─────────────────────────────────────────────────

test("shouldShowPolicyWarning: ambiguous status → true", () => {
  const rec = buildDefaultCapabilityRecord();
  assert.equal(rec.policyStatus, "ambiguous");
  assert.equal(shouldShowPolicyWarning(rec), true);
});

test("shouldShowPolicyWarning: ok status → false", () => {
  const rec = { ...buildDefaultCapabilityRecord(), policyStatus: "ok" as const };
  assert.equal(shouldShowPolicyWarning(rec), false);
});

// ── Capability freshness ──────────────────────────────────────────────────────

test("areCapabilitiesFresh: refreshed 1 minute ago → true", () => {
  const rec = {
    ...buildDefaultCapabilityRecord(),
    lastCapabilityRefreshAt: new Date(Date.now() - 60_000).toISOString(),
  };
  assert.equal(areCapabilitiesFresh(rec), true);
});

test("areCapabilitiesFresh: refreshed 7 hours ago → false", () => {
  const rec = {
    ...buildDefaultCapabilityRecord(),
    lastCapabilityRefreshAt: new Date(Date.now() - 7 * 60 * 60_000).toISOString(),
  };
  assert.equal(areCapabilitiesFresh(rec), false);
});

test("areCapabilitiesFresh: never refreshed → false", () => {
  const rec = buildDefaultCapabilityRecord();
  assert.equal(rec.lastCapabilityRefreshAt, null);
  assert.equal(areCapabilitiesFresh(rec), false);
});

// ── Default record sanity ─────────────────────────────────────────────────────

test("buildDefaultCapabilityRecord: conservative defaults", () => {
  const rec = buildDefaultCapabilityRecord();
  assert.equal(rec.plan, "unknown");
  assert.equal(rec.modelSelectionMode, "auto");
  assert.equal(rec.quotaState, "unknown");
  assert.equal(rec.entitlementVerified, false);
  assert.equal(rec.policyStatus, "ambiguous");
  assert.equal(rec.policyWarningVersion, CAPABILITY_WARNING_VERSION);
  assert.equal(rec.paidOverageEnabled, null);
  assert.equal(rec.endpointCompatible, false);
});

// ── COPILOT_AUTO_MODEL_ID constants ──────────────────────────────────────────

test("COPILOT_AUTO_MODEL_ID is non-empty string", () => {
  assert.equal(typeof COPILOT_AUTO_MODEL_ID, "string");
  assert.ok(COPILOT_AUTO_MODEL_ID.length > 0);
});

// Free / Student auto selection is served by the catalog's `auto` model, which the
// github executor resolves per request through Copilot's /auto endpoint
// (open-sse/executors/github/autoModel.ts). The former virtual `copilot-auto` id
// pinned the retired `gpt-4o-2024-11-20` upstream and is gone.
test("COPILOT_AUTO_MODEL_ID is the catalog's Copilot /auto model, never a retired id", async () => {
  const autoModel = await import("../../open-sse/executors/github/autoModel.ts");
  const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");
  const { isRetiredGitHubCopilotModelId } =
    await import("../../open-sse/config/providers/registry/github/retiredModels.ts");

  assert.equal(COPILOT_AUTO_MODEL_ID, autoModel.COPILOT_AUTO_MODEL_ID);
  assert.ok(autoModel.isCopilotAutoModel(COPILOT_AUTO_MODEL_ID));
  const catalogIds = getModelsByProviderId("github").map((model) => model.id);
  assert.ok(catalogIds.includes(COPILOT_AUTO_MODEL_ID), "auto model must be in the github catalog");
  assert.ok(!catalogIds.includes("copilot-auto"), "the retired virtual id must not return");
  assert.equal(isRetiredGitHubCopilotModelId("github", COPILOT_AUTO_MODEL_ID), false);
});

// ── Free-tier catalog exclusion ───────────────────────────────────────────────

test("GitHub is not in FREE_MODEL_BUDGETS (no numeric tokens contributed to headline)", async () => {
  const { FREE_MODEL_BUDGETS } = await import("../../open-sse/config/freeModelCatalog.data.ts");
  const githubEntries = FREE_MODEL_BUDGETS.filter(
    (m: { provider: string }) => m.provider === "github" || m.provider === "ghe-copilot"
  );
  assert.equal(
    githubEntries.length,
    0,
    "GitHub Copilot must not be in FREE_MODEL_BUDGETS — its credit quantity is undisclosed"
  );
});

test("GitHub is classified as 'ambiguous' in FREE_TIER_TOS", async () => {
  const { FREE_TIER_TOS } = await import("../../open-sse/config/freeTierCatalog.ts");
  assert.equal(FREE_TIER_TOS["github"], "ambiguous");
  assert.equal(FREE_TIER_TOS["ghe-copilot"], "ambiguous");
});

test("computeFreeModelTotals: GitHub contributes zero to steadyRecurringTokens", async () => {
  const { computeFreeModelTotals } = await import("../../open-sse/config/freeModelCatalog.ts");
  const totals = computeFreeModelTotals({ excludeTosAvoid: false });
  // If GitHub were in the catalog, it would appear in perModel with provider=github.
  // This asserts it does not — the headline must not include speculative credits.
  const githubModels = totals.perModel.filter(
    (m) => m.provider === "github" || m.provider === "ghe-copilot"
  );
  assert.equal(githubModels.length, 0);
});

// ── Quota exhaustion does not affect other accounts ───────────────────────────

test("inferQuotaState: exhausted Free account leaves paid account unaffected", () => {
  // Two independent calls; only the first is exhausted
  const freeExhausted = inferQuotaState({
    copilot_plan: "free",
    monthly_quotas: { chat: 50 },
    limited_user_quotas: { chat: 0 },
  });
  const proAvailable = inferQuotaState({
    copilot_plan: "pro",
    quota_snapshots: {
      premium_interactions: { remaining: 500, total: 1500, percent_remaining: 33 },
    },
  });
  assert.equal(freeExhausted, "exhausted");
  assert.equal(proAvailable, "available");
});

// ── Student plan parity with Free ────────────────────────────────────────────

test("Student plan is treated identically to Free for auto-selection enforcement", () => {
  assert.equal(planRequiresAutoModelSelection("student"), true);
  const studentRec = {
    ...buildDefaultCapabilityRecord(),
    plan: "student" as const,
    modelSelectionMode: "auto" as const,
  };
  const models = [{ id: "gpt-5.4", name: "GPT-5.4" }];
  const filtered = filterModelsForCapabilities(models, studentRec, AUTO_ENTRY);
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0]!.id, COPILOT_AUTO_MODEL_ID);
});
