import test from "node:test";
import assert from "node:assert/strict";
import { selectProvider, type AutoComboConfig } from "../../open-sse/services/autoCombo/engine.ts";
import { getStrategy } from "../../open-sse/services/autoCombo/routerStrategy.ts";
import { buildComplexityRoutingHint } from "../../open-sse/services/autoCombo/complexityRouter.ts";
import { DEFAULT_WEIGHTS } from "../../open-sse/services/autoCombo/scoring.ts";
import { resolveAutoStrategyOrder } from "../../open-sse/services/combo/resolveAutoStrategy.ts";
import type {
  AutoProviderCandidate,
  ResolvedComboTarget,
} from "../../open-sse/services/combo/types.ts";
import { getTierConfig, setTierConfig } from "../../open-sse/services/tierResolver.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { DEFAULT_RESILIENCE_SETTINGS } from "../../src/lib/resilience/settings.ts";

const log = { info() {}, warn() {}, debug() {} };
const originalTierConfig = getTierConfig();
const providers = ["primary-complexity-cheap", "primary-complexity-free"];
const targets: ResolvedComboTarget[] = providers.map((provider) => ({
  kind: "model",
  stepId: provider,
  executionKey: `${provider}>shared-model`,
  modelStr: "shared-model",
  provider,
  providerId: null,
  connectionId: null,
  weight: 1,
  label: null,
}));
const candidates: AutoProviderCandidate[] = targets.map((target) => ({
  provider: target.provider,
  stepId: target.stepId,
  executionKey: target.executionKey,
  modelStr: target.modelStr,
  model: target.modelStr,
  quotaRemaining: 100,
  quotaTotal: 100,
  circuitBreakerState: "CLOSED",
  costPer1MTokens: 1,
  p95LatencyMs: 100,
  latencyStdDev: 0,
  errorRate: 0,
}));
const weights = { ...DEFAULT_WEIGHTS };
for (const key of Object.keys(weights) as Array<keyof typeof weights>) weights[key] = 0;
weights.tierAffinity = 1;
const config: AutoComboConfig = {
  id: "primary-complexity",
  name: "primary-complexity",
  type: "auto",
  candidatePool: providers,
  weights,
  explorationRate: 0,
};
const simpleBody = { messages: [{ role: "user", content: "hi" }] };

test.before(() => {
  setTierConfig({
    providerOverrides: [
      { provider: providers[0], tier: "cheap" },
      { provider: providers[1], tier: "free" },
    ],
  });
});
test.after(() => {
  setTierConfig(originalTierConfig);
  resetDbInstance();
});

for (const strategy of ["score", "rules"]) {
  test(`${strategy}: primary selection honors the request complexity hint`, async () => {
    const hint = await buildComplexityRoutingHint(targets, simpleBody, log);
    assert.ok(hint);
    assert.equal(hint.recommendedMinTier, "free");
    const context = { taskType: "default", weights, explorationRate: 0, manifestHint: hint };

    assert.equal(getStrategy(strategy).select(candidates, context).provider, providers[1]);

    const toolHint = await buildComplexityRoutingHint(
      targets,
      { ...simpleBody, tools: [{ type: "function", function: { name: "read_file" } }] },
      log
    );
    assert.ok(toolHint);
    assert.equal(toolHint.recommendedMinTier, "cheap");
    assert.equal(
      getStrategy(strategy).select(candidates, { ...context, manifestHint: toolHint }).provider,
      providers[0]
    );
  });

  test(`${strategy}: omitted or null hints preserve tier-neutral selection`, () => {
    for (const manifestHint of [undefined, null]) {
      const decision = getStrategy(strategy).select(candidates, {
        taskType: "default",
        weights,
        explorationRate: 0,
        manifestHint,
      });
      assert.equal(decision.provider, providers[0]);
      assert.equal(decision.finalScore, 0.5);
    }
  });

  test(`${strategy}: request resolver forwards complexity to the primary selector`, async () => {
    const result = await resolveAutoStrategyOrder({
      orderedTargets: targets,
      body: simpleBody,
      combo: {
        id: config.id,
        name: config.name,
        models: [],
        autoConfig: { ...config, routerStrategy: strategy },
      },
      settings: null,
      config: {},
      resilienceSettings: {
        ...DEFAULT_RESILIENCE_SETTINGS,
        quotaPreflight: { ...DEFAULT_RESILIENCE_SETTINGS.quotaPreflight, enabled: false },
      },
      log,
      buildAutoCandidates: async () => candidates,
    });
    assert.ok("orderedTargets" in result);
    assert.equal(result.orderedTargets[0].provider, providers[1]);
  });
}

test("default engine honors complexity and keeps null hints neutral", async () => {
  const manifestHint = await buildComplexityRoutingHint(targets, simpleBody, log);
  assert.ok(manifestHint);
  const selected = selectProvider({ ...config, manifestHint }, candidates, "default");
  assert.equal(selected.provider, providers[1]);
  assert.equal(selected.factors.tierAffinity, 1);

  for (const hint of [undefined, null]) {
    const neutral = selectProvider({ ...config, manifestHint: hint }, candidates, "default");
    assert.equal(neutral.factors.tierAffinity, 0.5);
  }
});
