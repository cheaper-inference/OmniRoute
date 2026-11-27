/**
 * Decision routing, step 7: the `decision` auto-router strategy. The decider picks a model,
 * which narrows the pool; `rules` then picks the connection. Every failure falls back to
 * `rules` with the reason in the log. COMBO_DECISION_ROUTER_ENABLED (default off) gates
 * every decider: off = no credential read, no fetch, `fallback (disabled)`.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { DecisionStrategyImpl } from "../../../open-sse/services/autoCombo/decisionStrategy.ts";
import {
  getStrategy,
  listStrategies,
  selectWithStrategyAsync,
} from "../../../open-sse/services/autoCombo/routerStrategy.ts";
import type { ProviderCandidate } from "../../../open-sse/services/autoCombo/scoring.ts";
import { resolveDecisionRoutingConfig } from "../../../open-sse/services/decision/schema.ts";
import { buildDecisionRoutingContext } from "../../../open-sse/services/decision/factory.ts";
import { runInDecisionScope } from "../../../open-sse/services/decision/scope.ts";
import { DECISION_API_KEY_ENV } from "../../../open-sse/services/decision/credentials.ts";
import type { Decider, DecisionChoiceRequest } from "../../../open-sse/services/decision/types.ts";
import { AUTO_ROUTING_STRATEGY_VALUES } from "../../../src/shared/constants/routingStrategies.ts";

const FLAG = "COMBO_DECISION_ROUTER_ENABLED";

const pool = [
  {
    provider: "p",
    model: "cheap",
    connectionId: "a1",
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 1,
  },
  {
    provider: "q",
    model: "capable",
    connectionId: "b1",
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 9,
  },
  {
    provider: "r",
    model: "capable",
    connectionId: "b2",
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 9,
  },
] as ProviderCandidate[];

const fallbackPools: ProviderCandidate[][] = [];
const rules = {
  name: "rules",
  description: "fallback",
  select: (items: ProviderCandidate[]) => {
    fallbackPools.push(items);
    const last = items[items.length - 1];
    return {
      provider: last.provider,
      model: last.model,
      connectionId: last.connectionId,
      strategy: "rules",
      reason: "rules picked",
      candidatesConsidered: items.length,
      finalScore: 1,
    };
  },
};

function context(config: unknown, body: unknown = { messages: [{ role: "user", content: "hi" }] }) {
  return {
    taskType: "general",
    decision: {
      config: resolveDecisionRoutingConfig(config),
      body: body as Record<string, unknown>,
      apiKeyAllowedConnections: null,
    },
  };
}

function spyDecider(result: Awaited<ReturnType<Decider>>) {
  const requests: DecisionChoiceRequest[] = [];
  let created = 0;
  const createDecider = () => {
    created += 1;
    return (async (request: DecisionChoiceRequest) => {
      requests.push(request);
      return result;
    }) as Decider;
  };
  return { requests, createDecider, created: () => created };
}

const picked = (choice: string, confidence = 0.9) =>
  ({
    ok: true,
    choice,
    confidence,
    probabilities: { [choice]: confidence },
    latencyMs: 3,
  }) as const;

test("`decision` is a registered async auto-router strategy and an allowed value", () => {
  assert.ok(AUTO_ROUTING_STRATEGY_VALUES.includes("decision" as never));
  assert.equal(typeof getStrategy("decision").selectAsync, "function");
  assert.ok(listStrategies().some((s) => s.name === "decision"));
});

test("flag off: no decider is built (no credential read, no fetch) and the log says disabled", async () => {
  const spy = spyDecider(picked("capable"));
  const strategy = new DecisionStrategyImpl({
    fallback: rules,
    isEnabled: () => false,
    createDecider: spy.createDecider,
  });
  const result = await strategy.selectAsync(pool, context({ decider: "systemone" }));
  assert.equal(spy.created(), 0);
  assert.match(result.reason, /^decision: fallback \(disabled\); rules picked$/);
});

test("flag off on the registered strategy: zero fetch even with a key in the environment", async () => {
  const previousFlag = process.env[FLAG];
  const previousKey = process.env[DECISION_API_KEY_ENV];
  const originalFetch = globalThis.fetch;
  let fetches = 0;
  globalThis.fetch = (async () => {
    fetches += 1;
    return Response.json({});
  }) as typeof fetch;
  delete process.env[FLAG];
  process.env[DECISION_API_KEY_ENV] = "sk-should-never-be-used";
  try {
    for (const config of [
      { decider: "systemone" },
      { decider: "http", baseUrl: "https://decider.invalid", model: "m" },
    ]) {
      const result = await selectWithStrategyAsync(pool, context(config), "decision");
      assert.match(result.reason, /fallback \(disabled\)/);
    }
    assert.equal(fetches, 0);
  } finally {
    globalThis.fetch = originalFetch;
    if (previousFlag === undefined) delete process.env[FLAG];
    else process.env[FLAG] = previousFlag;
    if (previousKey === undefined) delete process.env[DECISION_API_KEY_ENV];
    else process.env[DECISION_API_KEY_ENV] = previousKey;
  }
});

test("a choice narrows the pool to that model and rules picks the connection", async () => {
  fallbackPools.length = 0;
  const spy = spyDecider(picked("capable", 0.82));
  const strategy = new DecisionStrategyImpl({
    fallback: rules,
    isEnabled: () => true,
    createDecider: spy.createDecider,
  });
  const result = await strategy.selectAsync(
    pool,
    context({ decider: "http", baseUrl: "https://d.invalid", model: "m" })
  );
  assert.deepEqual(Object.keys(spy.requests[0].options), ["cheap", "capable"]);
  assert.equal(spy.requests[0].state, "hi");
  assert.deepEqual(
    fallbackPools[0].map((c) => c.connectionId),
    ["b1", "b2"]
  );
  assert.equal(result.model, "capable");
  assert.equal(result.connectionId, "b2");
  assert.equal(result.strategy, "decision");
  assert.equal(result.candidatesConsidered, 3);
  assert.equal(
    result.reason,
    "decision(http): selected capable from 2; confidence 0.82 (rules picked)"
  );
});

test("missing or invalid config (a plain-text apiKey included) is not_configured", async () => {
  const spy = spyDecider(picked("capable"));
  const strategy = new DecisionStrategyImpl({
    fallback: rules,
    isEnabled: () => true,
    createDecider: spy.createDecider,
  });
  const none = await strategy.selectAsync(pool, { taskType: "general" });
  assert.match(none.reason, /fallback \(not_configured\)/);
  const withKey = await strategy.selectAsync(
    pool,
    context({ decider: "http", baseUrl: "https://d.invalid", model: "m", apiKey: "sk-x" })
  );
  assert.match(withKey.reason, /fallback \(not_configured\)/);
  assert.doesNotMatch(withKey.reason, /sk-x|d\.invalid/);
  assert.equal(spy.created(), 0);
});

test("decider failures, low confidence and out-of-menu answers fall back with the reason", async () => {
  const cases: Array<[Awaited<ReturnType<Decider>>, RegExp, Record<string, unknown>]> = [
    [{ ok: false, reason: "timeout" }, /decision\(systemone\): fallback \(timeout\)/, {}],
    [{ ok: false, reason: "http_error", status: 503 }, /fallback \(http_error\)/, {}],
    [picked("gpt-unlisted"), /fallback \(out_of_menu\)/, {}],
    [picked("capable", 0.4), /fallback \(low_confidence\)/, { minConfidence: 0.6 }],
  ];
  for (const [answer, expected, extra] of cases) {
    const spy = spyDecider(answer);
    const strategy = new DecisionStrategyImpl({
      fallback: rules,
      isEnabled: () => true,
      createDecider: spy.createDecider,
    });
    const result = await strategy.selectAsync(pool, context({ decider: "systemone", ...extra }));
    assert.match(result.reason, expected);
    assert.equal(result.reason.endsWith("; rules picked"), true);
  }
});

test("a one-model pool, a request without user text, or a nested decision never asks", async () => {
  const spy = spyDecider(picked("capable"));
  const strategy = new DecisionStrategyImpl({
    fallback: rules,
    isEnabled: () => true,
    createDecider: spy.createDecider,
  });
  const single = await strategy.selectAsync([pool[1], pool[2]], context({ decider: "systemone" }));
  assert.match(single.reason, /fallback \(single_option\)/);
  const silent = await strategy.selectAsync(
    pool,
    context({ decider: "systemone" }, { messages: [{ role: "system", content: "s" }] })
  );
  assert.match(silent.reason, /fallback \(no_user_text\)/);
  const nested = await runInDecisionScope(() =>
    strategy.selectAsync(pool, context({ decider: "systemone" }))
  );
  assert.match(nested.reason, /fallback \(recursion\)/);
  assert.equal(spy.requests.length, 0);
});

test("the sync select path never calls out", () => {
  const spy = spyDecider(picked("capable"));
  const strategy = new DecisionStrategyImpl({
    fallback: rules,
    isEnabled: () => true,
    createDecider: spy.createDecider,
  });
  const result = strategy.select(pool, context({ decider: "systemone" }));
  assert.match(result.reason, /fallback \(sync_caller\)/);
  assert.equal(spy.created(), 0);
});

test("operator descriptions reach the decider; the user text is the only request content", async () => {
  const spy = spyDecider(picked("cheap"));
  const strategy = new DecisionStrategyImpl({
    fallback: rules,
    isEnabled: () => true,
    createDecider: spy.createDecider,
  });
  await strategy.selectAsync(
    pool,
    context(
      { decider: "systemone", descriptions: { cheap: "Fast drafts" } },
      {
        system: "SECRET SYSTEM",
        tools: [{ name: "x" }],
        messages: [{ role: "user", content: "plan a trip" }],
      }
    )
  );
  assert.equal(spy.requests[0].options.cheap, "Fast drafts");
  assert.equal(spy.requests[0].state, "plan a trip");
  assert.doesNotMatch(JSON.stringify(spy.requests[0]), /SECRET/);
});

test("the routing context carries the allowlist and request seams, and is absent without config", () => {
  const signal = new AbortController().signal;
  const body = { messages: [] };
  assert.equal(buildDecisionRoutingContext(undefined, { signal }, body, ["a"]), undefined);
  const config = resolveDecisionRoutingConfig({ decider: "systemone", connectionId: "conn-a" });
  const built = buildDecisionRoutingContext(config, { signal, allCombos: [] }, body, ["conn-a"]);
  assert.deepEqual(built?.apiKeyAllowedConnections, ["conn-a"]);
  assert.equal(built?.signal, signal);
  assert.equal(built?.body, body);
  assert.equal(built?.config, config);
});
