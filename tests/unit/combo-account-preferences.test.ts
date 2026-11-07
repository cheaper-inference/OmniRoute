import { test, after } from "node:test";
import assert from "node:assert/strict";
import {
  accountPreferenceAttemptConfig,
  orderAccountPreferences,
  firstAccountPreferenceTier,
  readAccountPreferences,
} from "../../open-sse/services/combo/accountPreferences.ts";
import { resolveAutoStrategyOrder } from "../../open-sse/services/combo/resolveAutoStrategy.ts";
import { comboRuntimeConfigSchema } from "../../src/shared/validation/schemas/combo.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
after(() => resetDbInstance());

test("account preferences disable speculative hedging without mutating stored configuration", () => {
  const config = { hedging: true, hedgeDelayMs: 0, maxRetries: 1 };
  assert.deepEqual(accountPreferenceAttemptConfig(config, true), { ...config, hedging: false });
  assert.equal(config.hedging, true);
  assert.equal(accountPreferenceAttemptConfig(config, false), config);
});

const prefs = {
  a: "preferred",
  b: "preferred",
  d: "reserve",
  e: "reserve",
  x: "excluded",
} as const;
const ids = (values: Array<{ connectionId?: string | null }>) => values.map((v) => v.connectionId);
const targets = ["e", "c", "b", "x", "d", "a"].map((connectionId) => ({ connectionId }));

test("multiple accounts per tier, stable order, exclusions and unbound fallbacks", () => {
  assert.deepEqual(ids(orderAccountPreferences([...targets, { connectionId: null }], prefs)), [
    "b",
    "a",
    "c",
    "e",
    "d",
  ]);
  assert.deepEqual(ids(firstAccountPreferenceTier(targets, prefs)), ["b", "a"]);
  assert.deepEqual(ids(firstAccountPreferenceTier(targets.slice(0, 2), prefs)), ["c"]);
  assert.deepEqual(ids(firstAccountPreferenceTier([targets[0], targets[4]], prefs)), ["e", "d"]);
  assert.deepEqual(ids(targets), ["e", "c", "b", "x", "d", "a"]);
});

test("unset preferences are identity; continuity wins over soft preference, never exclusion", () => {
  assert.equal(orderAccountPreferences(targets, {}), targets);
  assert.deepEqual(ids(orderAccountPreferences(targets, prefs, true)), ["e", "b", "a", "c", "d"]);
  assert.deepEqual(ids(orderAccountPreferences([{ connectionId: "x" }, ...targets], prefs, true)), [
    "b",
    "a",
    "c",
    "e",
    "d",
  ]);
});

test("schema validates and round-trips all tiers, rejecting invalid values and oversized maps", () => {
  assert.deepEqual(
    comboRuntimeConfigSchema.parse({ accountPreferences: prefs }).accountPreferences,
    prefs
  );
  assert.equal(
    comboRuntimeConfigSchema.safeParse({ accountPreferences: { a: "bogus" } }).success,
    false
  );
  assert.equal(
    comboRuntimeConfigSchema.safeParse({ accountPreferences: { "": "reserve" } }).success,
    false
  );
  assert.equal(
    comboRuntimeConfigSchema.safeParse({
      accountPreferences: Object.fromEntries(
        Array.from({ length: 501 }, (_, i) => [String(i), "preferred"])
      ),
    }).success,
    false
  );
  assert.deepEqual(readAccountPreferences(null), {});
  assert.deepEqual(readAccountPreferences({ a: "normal" }), {});
});

const target = {
  kind: "model" as const,
  stepId: "s1",
  executionKey: "openai/gpt-4o",
  modelStr: "openai/gpt-4o",
  provider: "openai",
  providerId: null,
  connectionId: null,
  weight: 1,
  label: null,
};

async function route(
  accountPreferences: Record<string, string>,
  blocked: string[] = [],
  routerStrategy = "rules"
) {
  return resolveAutoStrategyOrder({
    orderedTargets: [target],
    body: { messages: [{ role: "user", content: "Hi" }] },
    combo: {
      name: "account-preferences-test",
      config: {
        accountPreferences,
        candidatePool: ["openai"],
        explorationRate: 1,
        routerStrategy,
      },
    },
    config: {},
    settings: null,
    resilienceSettings: { quotaPreflight: { enabled: false } } as never,
    log: { info() {}, warn() {}, error() {}, debug() {} },
    buildAutoCandidates: async () =>
      targets.map(({ connectionId }) => ({
        ...target,
        connectionId,
        executionKey: `openai/gpt-4o@${connectionId}`,
        model: "gpt-4o",
        quotaRemaining: 100,
        quotaTotal: 100,
        circuitBreakerState: "CLOSED" as const,
        costPer1MTokens: 1,
        p95LatencyMs: 10,
        latencyStdDev: 0,
        errorRate: 0,
        quotaCutoffBlocked: blocked.includes(connectionId),
      })),
  });
}

test("real auto resolver bounds exploration and explicit routers to first tier", async () => {
  for (const router of ["rules", "lkgp"]) {
    const result = await route(prefs, [], router);
    assert.ok("orderedTargets" in result);
    assert.ok(["a", "b"].includes(result.orderedTargets[0].connectionId!));
    assert.deepEqual(new Set(ids(result.orderedTargets)), new Set(["a", "b", "c", "d", "e"]));
    assert.deepEqual(ids(result.orderedTargets).slice(2, 3), ["c"]);
  }
});

test("blocked preferred accounts never reappear in fallback; reserve remains usable", async () => {
  const result = await route(prefs, ["a", "b", "c"]);
  assert.ok("orderedTargets" in result);
  assert.deepEqual(new Set(ids(result.orderedTargets)), new Set(["d", "e"]));
});

test("all excluded fails closed rather than routing an unbound provider fallback", async () => {
  const result = await route(Object.fromEntries(targets.map((t) => [t.connectionId, "excluded"])));
  assert.ok("earlyResponse" in result);
  assert.equal(result.earlyResponse.status, 503);
});

test("each attempt stays bound to its own account, including its credential fallback", () => {
  const result = orderAccountPreferences(
    [
      { connectionId: "a", allowedConnectionIds: ["a", "x", "d"] },
      { connectionId: "d", allowedConnectionIds: ["a", "d"] },
    ],
    prefs
  );
  assert.deepEqual(
    result.map((t) => t.allowedConnectionIds),
    [["a"], ["d"]]
  );
});

test("an excluded native turn binding stops without dispatching to another account", async () => {
  const { handleComboChat } = await import("../../open-sse/services/combo.ts");
  const { pinNativeCodexTurn, clearNativeCodexTurnPinsForTests } =
    await import("../../open-sse/services/combo/nativeCodexTurnPin.ts");
  const body = {
    client_metadata: {
      "x-codex-turn-metadata": JSON.stringify({ thread_id: "prefs-thread", turn_id: "prefs-turn" }),
    },
    messages: [{ role: "user", content: "Hello" }],
  };
  const pinned = { ...target, provider: "codex", modelStr: "codex/gpt-5", connectionId: "x" };
  pinNativeCodexTurn({ body, comboName: "prefs-pinned", target: pinned, connectionId: "x" });
  let dispatched = false;
  try {
    const response = await handleComboChat({
      body,
      combo: {
        name: "prefs-pinned",
        strategy: "auto",
        models: ["codex/gpt-5"],
        config: { accountPreferences: prefs },
      },
      handleSingleModel: async () => {
        dispatched = true;
        return new Response("unexpected");
      },
      log: { info() {}, warn() {}, error() {}, debug() {} },
      settings: {},
      hiddenModelsByProvider: {},
      clientManagedResponsesContext: true,
    });
    assert.equal(response.status, 503);
    assert.equal(dispatched, false);
  } finally {
    clearNativeCodexTurnPinsForTests();
  }
});
