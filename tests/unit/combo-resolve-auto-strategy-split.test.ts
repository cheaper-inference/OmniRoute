import { test, after, mock } from "node:test";
import assert from "node:assert/strict";

import {
  evaluateAutoCandidates,
  resolveAutoStrategyOrder,
} from "@omniroute/open-sse/services/combo/resolveAutoStrategy.ts";
import { scoreAutoTargets } from "@omniroute/open-sse/services/combo/autoStrategy.ts";
import { DEFAULT_WEIGHTS } from "@omniroute/open-sse/services/autoCombo/scoring.ts";
import { buildComplexityRoutingHint } from "@omniroute/open-sse/services/autoCombo/complexityRouter.ts";
import { setTierConfig } from "@omniroute/open-sse/services/tierResolver.ts";
import { resetDbInstance } from "@/lib/db/core.ts";
import {
  getStrategy,
  registerStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy.ts";

// resolveAutoStrategyOrder loads the LKGP via the DB singleton (dynamic import);
// release the handle so the node:test runner does not hang on teardown (learning #3).
after(() => {
  resetDbInstance();
});

// Split guard for Block J Task 2 (coupled slice): the `if (strategy === "auto")`
// branch of handleComboChat was extracted verbatim into resolveAutoStrategyOrder,
// with `buildAutoCandidates` injected (it lives in combo.ts, so a direct import
// would cycle). These tests pin the DI contract and the two control-flow exits
// that the host now forwards: an early 429 Response, and the default-ordering
// pass-through. The routable-selection path is covered end-to-end by the 60
// consumer tests (router-strategies / auto-combo-engine / combo-strategy-fallbacks).

const noopLog = {
  info() {},
  warn() {},
  error() {},
  debug() {},
} as never;

const target = (provider: string, modelStr: string): never =>
  ({
    kind: "model",
    stepId: "s1",
    executionKey: `${provider}>${modelStr}`,
    modelStr,
    provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  }) as never;

const baseDeps = (buildAutoCandidates: never) =>
  ({
    orderedTargets: [target("openai", "gpt-4o"), target("anthropic", "claude-3")],
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: { id: "c1", name: "autoc", config: {} },
    settings: null,
    config: {},
    relayOptions: null,
    resilienceSettings: { quotaPreflight: { enabled: false } },
    log: noopLog,
    buildAutoCandidates,
  }) as never;

test("exports resolveAutoStrategyOrder", () => {
  assert.equal(typeof resolveAutoStrategyOrder, "function");
});

// Unified decision routing (step 7). Two candidates on different models so an explicit
// router has a real choice to make.
const decisionCandidates = () =>
  [
    {
      kind: "model",
      stepId: "s1",
      executionKey: "openai>gpt-4o@account-a",
      modelStr: "gpt-4o",
      provider: "openai",
      model: "gpt-4o",
      connectionId: "account-a",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 5,
      p95LatencyMs: 100,
      latencyStdDev: 10,
      errorRate: 0,
    },
    {
      kind: "model",
      stepId: "s2",
      executionKey: "anthropic>claude-3@account-b",
      modelStr: "claude-3",
      provider: "anthropic",
      model: "claude-3",
      connectionId: "account-b",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 1,
      p95LatencyMs: 100,
      latencyStdDev: 10,
      errorRate: 0,
    },
  ] as never;

let capturedDecisionContext: Record<string, unknown> | undefined;
registerStrategy("decision-forwarding-regression", {
  name: "decision-forwarding-regression",
  description: "captures the routing context",
  select: (pool, context) => {
    capturedDecisionContext = context as unknown as Record<string, unknown>;
    const last = pool[pool.length - 1];
    return {
      provider: last.provider,
      model: last.model,
      connectionId: last.connectionId,
      strategy: "decision-forwarding-regression",
      reason: "captured",
      candidatesConsidered: pool.length,
      finalScore: 1,
    };
  },
});

test("decision config and request runtime reach the explicit router context", async () => {
  const controller = new AbortController();
  const dispatch = (async () => new Response("{}")) as never;
  const deps = baseDeps((async () => decisionCandidates()) as never);
  // (An allowlist would send the pool through DB connection expansion; its forwarding is
  // pinned by the buildDecisionRoutingContext unit test in decision-strategy.test.ts.)
  deps.decisionRuntime = { signal: controller.signal, dispatch, allCombos: [] };
  deps.combo.config = {
    auto: {
      routerStrategy: "decision-forwarding-regression",
      decision: { decider: "combo-model", model: "openai/gpt-4o-mini", timeoutMs: 800 },
      explorationRate: 0,
    },
  };

  const result = await resolveAutoStrategyOrder(deps);
  assert.ok("orderedTargets" in result);
  const decision = capturedDecisionContext?.decision as Record<string, unknown>;
  assert.deepEqual(decision.config, {
    valid: true,
    config: { decider: "combo-model", model: "openai/gpt-4o-mini", timeoutMs: 800 },
  });
  assert.equal(decision.body, deps.body);
  assert.equal(decision.apiKeyAllowedConnections, null);
  assert.equal(decision.signal, controller.signal);
  assert.equal(decision.dispatch, dispatch);
});

test("combos without decision config keep exactly today's order and context", async () => {
  // Same combo, same candidates: once as today (no decision key, flag off) and once with the
  // decision flag on and a key in the environment. Nothing may differ, and nothing may leave
  // the process. The engine's `rules` path draws a weighted random tier, so Math.random is
  // pinned to compare like with like.
  const previousFlag = process.env.COMBO_DECISION_ROUTER_ENABLED;
  const previousKey = process.env.OMNIROUTE_DECISION_API_KEY;
  const originalFetch = globalThis.fetch;
  const random = mock.method(Math, "random", () => 0.42);
  let fetches = 0;
  globalThis.fetch = (async () => {
    fetches += 1;
    return Response.json({});
  }) as typeof fetch;
  const run = async (strategy: string) => {
    const deps = baseDeps((async () => decisionCandidates()) as never);
    deps.orderedTargets = [target("openai", "gpt-4o"), target("anthropic", "claude-3")];
    deps.combo.config = { routerStrategy: strategy, explorationRate: 0 };
    capturedDecisionContext = undefined;
    const result = await resolveAutoStrategyOrder(deps);
    assert.ok("orderedTargets" in result);
    return {
      order: result.orderedTargets.map((t: { executionKey: string }) => t.executionKey),
      explicit: result.autoUsedExplicitRouter,
      context: capturedDecisionContext,
    };
  };
  try {
    delete process.env.COMBO_DECISION_ROUTER_ENABLED;
    delete process.env.OMNIROUTE_DECISION_API_KEY;
    const todayExplicit = await run("decision-forwarding-regression");
    const todayRules = await run("rules");
    process.env.COMBO_DECISION_ROUTER_ENABLED = "true";
    process.env.OMNIROUTE_DECISION_API_KEY = "sk-env";
    const flagOnExplicit = await run("decision-forwarding-regression");
    const flagOnRules = await run("rules");

    assert.deepEqual(flagOnExplicit.order, todayExplicit.order);
    assert.equal(flagOnExplicit.explicit, todayExplicit.explicit);
    assert.equal(todayExplicit.context?.decision, undefined);
    assert.equal(flagOnExplicit.context?.decision, undefined);
    assert.deepEqual(flagOnRules.order, todayRules.order);
    assert.equal(todayRules.explicit, false);
    assert.equal(flagOnRules.explicit, false);
    assert.equal(fetches, 0);
  } finally {
    random.mock.restore();
    globalThis.fetch = originalFetch;
    if (previousFlag === undefined) delete process.env.COMBO_DECISION_ROUTER_ENABLED;
    else process.env.COMBO_DECISION_ROUTER_ENABLED = previousFlag;
    if (previousKey === undefined) delete process.env.OMNIROUTE_DECISION_API_KEY;
    else process.env.OMNIROUTE_DECISION_API_KEY = previousKey;
  }
});

// The registry's `rules` strategy (scorePool) is what every explicit router falls back to.
registerStrategy("rules-registry-probe", {
  name: "rules-registry-probe",
  description: "delegates to the registry rules strategy",
  select: (pool, context) => getStrategy("rules").select(pool, context),
});

test("a decision combo with the flag off routes exactly like the rules fallback, zero fetch", async () => {
  const previousFlag = process.env.COMBO_DECISION_ROUTER_ENABLED;
  const originalFetch = globalThis.fetch;
  let fetches = 0;
  globalThis.fetch = (async () => {
    fetches += 1;
    return Response.json({});
  }) as typeof fetch;
  const order = async (config: Record<string, unknown>) => {
    const deps = baseDeps((async () => decisionCandidates()) as never);
    deps.orderedTargets = [target("openai", "gpt-4o"), target("anthropic", "claude-3")];
    deps.combo.config = { ...config, explorationRate: 0 };
    const result = await resolveAutoStrategyOrder(deps);
    assert.ok("orderedTargets" in result);
    return {
      order: result.orderedTargets.map((t: { executionKey: string }) => t.executionKey),
      explicit: result.autoUsedExplicitRouter,
    };
  };
  try {
    delete process.env.COMBO_DECISION_ROUTER_ENABLED;
    const decision = await order({
      routerStrategy: "decision",
      decision: { decider: "http", baseUrl: "https://decider.invalid", model: "m" },
    });
    const rules = await order({ routerStrategy: "rules-registry-probe" });
    assert.deepEqual(decision, rules);
    assert.equal(fetches, 0);
  } finally {
    globalThis.fetch = originalFetch;
    if (previousFlag === undefined) delete process.env.COMBO_DECISION_ROUTER_ENABLED;
    else process.env.COMBO_DECISION_ROUTER_ENABLED = previousFlag;
  }
});

test("no candidates -> keeps default ordering, no explicit router", async () => {
  const build = (async () => []) as never;
  const result = await resolveAutoStrategyOrder(baseDeps(build));
  assert.ok(!("earlyResponse" in result));
  if ("orderedTargets" in result) {
    assert.equal(result.autoUsedExplicitRouter, false);
    // default ordering preserved (both original targets survive)
    assert.equal(result.orderedTargets.length, 2);
    assert.equal(result.orderedTargets[0].provider, "openai");
  }
});

test("all candidates quota-cutoff-blocked -> early 429 Response", async () => {
  const build = (async () => [
    {
      kind: "model",
      stepId: "s1",
      executionKey: "openai>gpt-4o",
      modelStr: "gpt-4o",
      provider: "openai",
      model: "gpt-4o",
      quotaCutoffBlocked: true,
    },
  ]) as never;
  const result = await resolveAutoStrategyOrder(baseDeps(build));
  assert.ok("earlyResponse" in result);
  if ("earlyResponse" in result) {
    assert.ok(result.earlyResponse instanceof Response);
    assert.equal(result.earlyResponse.status, 429);
  }
});

test("candidate evaluation is deterministic and does not mutate builder-owned candidates", async () => {
  const candidates = [
    {
      kind: "model",
      stepId: "s1",
      executionKey: "openai>gpt-4o@account-a",
      modelStr: "gpt-4o",
      provider: "openai",
      model: "gpt-4o",
      connectionId: "account-a",
      quotaRemaining: 80,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 1,
      p95LatencyMs: 100,
      latencyStdDev: 10,
      errorRate: 0,
    },
  ];
  const before = structuredClone(candidates);
  const options = {
    targets: [target("openai", "gpt-4o")],
    comboName: "autoc",
    body: { prompt_cache_key: "pure-evaluation", messages: [] },
    taskType: "default",
    weights: DEFAULT_WEIGHTS,
    buildAutoCandidates: (async () => candidates) as never,
  };

  const first = await evaluateAutoCandidates(options);
  const second = await evaluateAutoCandidates(options);

  assert.deepEqual(first.scoredTargets, second.scoredTargets);
  assert.deepEqual(candidates, before);
  assert.notEqual(first.candidates[0], candidates[0]);
  assert.equal(first.scoredTargets[0].factors.quota, 0.8);
});

test("cache affinity scores expanded auto account candidates directly", async () => {
  const candidates = [
    {
      kind: "model",
      stepId: "s1",
      executionKey: "openai>gpt-4o@account-a",
      modelStr: "gpt-4o",
      provider: "openai",
      model: "gpt-4o",
      connectionId: "account-a",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 1,
      p95LatencyMs: 100,
      latencyStdDev: 10,
      errorRate: 0,
    },
    {
      kind: "model",
      stepId: "s1",
      executionKey: "openai>gpt-4o@account-b",
      modelStr: "gpt-4o",
      provider: "openai",
      model: "gpt-4o",
      connectionId: "account-b",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 1,
      p95LatencyMs: 100,
      latencyStdDev: 10,
      errorRate: 0,
    },
  ];
  const deps = baseDeps((async () => candidates) as never);
  deps.orderedTargets = [target("openai", "gpt-4o")];
  deps.body = { prompt_cache_key: "expanded-account-key", messages: [] };
  deps.combo.autoConfig = {
    candidatePool: ["openai"],
    explorationRate: 0,
    weights: { cacheAffinity: 1 },
  };

  await resolveAutoStrategyOrder(deps);

  assert.deepEqual(candidates.map((candidate) => candidate.cacheAffinity).sort(), [0, 1]);
});

// #7008 follow-up: parseAutoConfig() (see combo-auto-config-split.test.ts) already
// makes `weights` honor a combo's own STORED modePack. But resolveAutoStrategyOrder()
// also supports a per-request `X-OmniRoute-Mode` override (relayOptions.mode) that can
// pick a *different* mode pack than the one stored on the combo for that single
// request — and `weights` must track that EFFECTIVE (post-override) modePack, not the
// stored one, so scoreAutoTargets' fallback ranking doesn't drift from the primary
// selection. These three synthetic candidates are built so every scoring factor is
// IDENTICAL between them except cost/latency/stability, and "dominant" clearly wins
// selection under any weight profile (so the engine's own randomized tier-rotation
// never affects which one becomes `orderedTargets[0]`) — isolating the assertion to
// the *fallback ranking order* of the remaining two, which is exactly what
// scoreAutoTargets (and only scoreAutoTargets) controls.
const weightSensitiveCandidates = () =>
  [
    {
      kind: "model",
      stepId: "dominant",
      executionKey: "groq>dominant-model",
      modelStr: "dominant-model",
      provider: "groq",
      model: "dominant-model",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 0.01,
      p95LatencyMs: 10,
      latencyStdDev: 1,
      errorRate: 0,
    },
    {
      // Wins under "quality-first" (high taskFit/stability weight): low latencyStdDev
      // (=> high stability), but the highest cost and highest latency in the pool.
      kind: "model",
      stepId: "quality-leaning",
      executionKey: "openai>model-alpha",
      modelStr: "model-alpha",
      provider: "openai",
      model: "model-alpha",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 20,
      p95LatencyMs: 5000,
      latencyStdDev: 1,
      errorRate: 0,
    },
    {
      // Wins under "ship-fast" (high latencyInv/health weight): lowest latency and
      // lowest cost in the pool, but the highest latencyStdDev (=> low stability).
      kind: "model",
      stepId: "speed-leaning",
      executionKey: "anthropic>model-beta",
      modelStr: "model-beta",
      provider: "anthropic",
      model: "model-beta",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 1,
      p95LatencyMs: 100,
      latencyStdDev: 900,
      errorRate: 0,
    },
  ] as never;

const weightSensitiveDeps = (autoConfig: Record<string, unknown>, mode?: string) =>
  ({
    orderedTargets: [
      target("groq", "dominant-model"),
      target("openai", "model-alpha"),
      target("anthropic", "model-beta"),
    ],
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      id: "auto-mode-override",
      name: "auto-mode-override",
      autoConfig: {
        // Fixed candidatePool skips the DB-backed expandAutoComboCandidatePool
        // path entirely (see the `candidatePool.length > 0` early-return there) —
        // this test only cares about weight-driven ranking, not pool expansion.
        candidatePool: ["groq", "openai", "anthropic"],
        explorationRate: 0,
        ...autoConfig,
      },
    },
    settings: null,
    config: {},
    relayOptions: mode ? { mode } : null,
    resilienceSettings: { quotaPreflight: { enabled: false } },
    log: noopLog,
    buildAutoCandidates: (async () => weightSensitiveCandidates()) as never,
  }) as never;

test("per-request X-OmniRoute-Mode override changes the EFFECTIVE weights used for fallback ranking, not just selection", async () => {
  // Combo's own stored modePack is "quality-first" (would rank model-alpha before
  // model-beta if the override were ignored), but the request overrides to
  // "ship-fast" for this one call.
  const overridden = await resolveAutoStrategyOrder(
    weightSensitiveDeps({ modePack: "quality-first" }, "ship-fast")
  );
  assert.ok("orderedTargets" in overridden, "expected a normal ordering result, not earlyResponse");
  if (!("orderedTargets" in overridden)) return;

  // A combo natively configured with "ship-fast" (no override at all) is the ground
  // truth for what "effective modePack = ship-fast" should rank like.
  const native = await resolveAutoStrategyOrder(weightSensitiveDeps({ modePack: "ship-fast" }));
  assert.ok("orderedTargets" in native, "expected a normal ordering result, not earlyResponse");
  if (!("orderedTargets" in native)) return;

  // "dominant" overwhelms every weight profile tried here, so it is always the
  // engine's selection (position 0) regardless of any exploration/tier-rotation
  // randomness — the two asserted positions below are populated exclusively by
  // scoreAutoTargets' deterministic weight-driven sort.
  assert.equal(overridden.orderedTargets[0].provider, "groq");
  assert.equal(native.orderedTargets[0].provider, "groq");

  // Ship-fast weights favor low-latency/high-health over stability, so the
  // speed-leaning candidate outranks the quality-leaning one when the effective
  // modePack is ship-fast — whether that's because it's natively configured that
  // way, or because a per-request override made it so.
  assert.equal(
    overridden.orderedTargets[1].provider,
    "anthropic",
    "request-level ship-fast override should rank the speed-leaning candidate above the quality-leaning one"
  );
  assert.equal(overridden.orderedTargets[2].provider, "openai");

  // The override case must match the native ship-fast case EXACTLY — proving the
  // override drives an identical effective weight vector for fallback ranking, not
  // just for the initial selection.
  assert.deepEqual(
    overridden.orderedTargets.map((t) => t.provider),
    native.orderedTargets.map((t) => t.provider)
  );
});

// Regression for #13386: `resolveAutoStrategyOrder` used to gate the complexity
// hint behind `config.complexityAwareRouting === true`, but that flag was
// orphaned by migration 103 (stripped from every persisted combo config) —
// the feature was permanently unreachable. The fix removed the gate entirely
// (the field no longer even exists on `ResolveAutoStrategyDeps["config"]`), so
// the hint must now be built unconditionally. This proves the mechanism the
// fix depends on: when the hint IS built (as it always is now), a free-tier
// candidate under a trivial prompt scores full tierAffinity instead of the
// neutral 0.5 a null hint (the pre-fix, gate-off state) would produce.
test("scoreAutoTargets: the always-on complexity hint (#13386) moves tierAffinity off the null-hint neutral baseline", async () => {
  const freeProvider = "regression-free-provider-13386";
  setTierConfig({
    providerOverrides: [{ provider: freeProvider, tier: "free" }],
  });
  try {
    const t = [target(freeProvider, "shared-model-13386")];
    const candidates = [
      {
        kind: "model",
        stepId: "s1",
        executionKey: `${freeProvider}>shared-model-13386`,
        modelStr: "shared-model-13386",
        provider: freeProvider,
        model: "shared-model-13386",
        quotaRemaining: 90,
        quotaTotal: 100,
        circuitBreakerState: "CLOSED",
        costPer1MTokens: 5,
        p95LatencyMs: 200,
        latencyStdDev: 10,
        errorRate: 0.01,
      },
    ] as never;

    const withoutHint = scoreAutoTargets(t, candidates, "default", DEFAULT_WEIGHTS, null);
    assert.equal(
      withoutHint[0].factors.tierAffinity,
      0.5,
      "a null hint (the pre-#13386 opt-in-off state) must be tier-neutral"
    );

    const hint = await buildComplexityRoutingHint(
      t as never,
      { messages: [{ role: "user", content: "oi" }] },
      { info() {} }
    );
    assert.ok(
      hint,
      "expected a non-null hint for a trivial prompt — buildComplexityRoutingHint takes no config param, so it cannot be gated"
    );

    const withHint = scoreAutoTargets(t, candidates, "default", DEFAULT_WEIGHTS, hint);
    assert.equal(
      withHint[0].factors.tierAffinity,
      1.0,
      "a free-tier candidate under a trivial-prompt hint must score full tier affinity"
    );
  } finally {
    setTierConfig(null);
  }
});
