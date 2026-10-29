import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Split guard for the #3501 god-file decomposition (PR 2): the target-resolution
// stage of handleComboChat (wildcard expansion → weighted step groups → strategy
// ordering → stickiness/eval/compat/context filters → task-aware reorder →
// prompt-cache affinity → pre-screen) was extracted verbatim into
// resolveComboTargetPipeline. These tests pin the leaf's own contract: the shape it
// hands back to the attempt loop and pass-through ordering for the plain `priority`
// path. The strategy-specific branches stay covered end-to-end by the combo-*
// consumer suites through combo.ts.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-target-resolution-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { resolveComboTargetPipeline } =
  await import("../../open-sse/services/combo/targetResolution.ts");
const { filterJevTargetsByHardRequestContext } =
  await import("../../open-sse/services/combo/jevBlockChecker.ts");
const {
  clearAllStickyBindings,
  peekSessionStickinessBinding,
  recordStickyBinding,
  __setStickinessHeadroomFetcherForTests,
  __setStickinessConnectionFetcherForTests,
  __setStickinessQuotaCheckerForTests,
} = await import("../../open-sse/services/combo/sessionStickiness.ts");

test.after(() => {
  __setStickinessHeadroomFetcherForTests(null);
  __setStickinessConnectionFetcherForTests(null);
  __setStickinessQuotaCheckerForTests(null);
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  clearModelsDevCapabilities();
  clearAllStickyBindings();
});

test.afterEach(() => {
  __setStickinessHeadroomFetcherForTests(null);
  __setStickinessConnectionFetcherForTests(null);
  __setStickinessQuotaCheckerForTests(null);
});

const noopLog = { info() {}, warn() {}, error() {}, debug() {} } as never;

function capabilityEntry(limitContext: number) {
  return {
    tool_call: true,
    reasoning: false,
    attachment: false,
    structured_output: true,
    temperature: true,
    modalities_input: JSON.stringify(["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: false,
    limit_context: limitContext,
    limit_input: limitContext,
    limit_output: 4096,
    interleaved_field: null,
  };
}

const deps = (overrides: Record<string, unknown> = {}): never =>
  ({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: { id: "c1", name: "c1", models: ["openai/gpt-4o", "anthropic/claude-3"], config: {} },
    strategy: "priority",
    config: {},
    settings: null,
    allCombos: null,
    relayOptions: null,
    signal: null,
    apiKeyAllowedConnections: null,
    log: noopLog,
    resilienceSettings: { providerCooldown: { enabled: false } },
    isModelAvailable: undefined,
    handleSingleModelWithTimeout: async () => new Response("{}"),
    buildAutoCandidates: async () => [],
    ...overrides,
  }) as never;

test("exports resolveComboTargetPipeline", () => {
  assert.equal(typeof resolveComboTargetPipeline, "function");
});

test("priority strategy resolves combo models into orderedTargets in declared order", async () => {
  const result = await resolveComboTargetPipeline(deps());
  assert.ok(!("earlyResponse" in result), "expected a resolved pipeline, not an early response");
  if ("earlyResponse" in result) return;
  assert.deepEqual(
    result.orderedTargets.map((t) => t.modelStr),
    ["openai/gpt-4o", "anthropic/claude-3"]
  );
});

test("#15241 priority pipeline keeps its declared head after a mid-list sticky success", async () => {
  const priorityWithConnections = {
    id: "c-sticky-priority",
    name: "sticky-priority",
    strategy: "priority",
    models: [
      { model: "openai/gpt-4o", connectionId: "conn-priority-a" },
      { model: "anthropic/claude-3", connectionId: "conn-priority-b" },
    ],
    config: {},
  };
  const first = await resolveComboTargetPipeline(deps({ combo: priorityWithConnections }));
  assert.ok(!("earlyResponse" in first));
  if ("earlyResponse" in first) return;
  assert.ok(first.sticky.messageHash, "pipeline derives the conversation stickiness key");
  assert.ok(first.orderedTargets[1]?.connectionId, "second target has a connection id to pin");

  recordStickyBinding(first.sticky.messageHash!, first.orderedTargets[1]!.connectionId!);

  const repeated = await resolveComboTargetPipeline(deps({ combo: priorityWithConnections }));
  assert.ok(!("earlyResponse" in repeated));
  if ("earlyResponse" in repeated) return;
  assert.deepEqual(
    repeated.orderedTargets.map((target) => target.modelStr),
    ["openai/gpt-4o", "anthropic/claude-3"],
    "a prior mid-list success must not become runtime try-slot #1 for priority"
  );
  assert.equal(repeated.sticky.stuck, false);
});

test("returns the derived values the attempt loop consumes", async () => {
  const result = await resolveComboTargetPipeline(deps());
  assert.ok(!("earlyResponse" in result));
  if ("earlyResponse" in result) return;
  assert.equal(typeof result.stickyWeightedLimit, "number");
  assert.equal(typeof result.getWeightedStepKeyForTarget, "function");
  assert.ok(result.preScreenMap instanceof Map);
  assert.equal(result.sticky.messageHash === null || typeof result.sticky.messageHash, "string");
  // Non-weighted strategies have no weighted step resolution, so the mapper is a
  // constant null — the sticky-weighted write-back in combo.ts is then skipped.
  assert.equal(result.getWeightedStepKeyForTarget(result.orderedTargets[0]), null);
});

test("an empty combo yields an empty target pool (combo.ts turns it into a 404)", async () => {
  const result = await resolveComboTargetPipeline(deps({ combo: { name: "empty", models: [] } }));
  assert.ok(!("earlyResponse" in result));
  if ("earlyResponse" in result) return;
  assert.deepEqual(result.orderedTargets, []);
});

test("request exceeding every approximate context hint keeps the target pool", async () => {
  saveModelsDevCapabilities({
    "unit-target-resolution": {
      tiny: capabilityEntry(8_000),
      small: capabilityEntry(16_000),
    },
  });

  const result = await resolveComboTargetPipeline(
    deps({
      combo: {
        id: "c2",
        name: "known-context-overflow",
        models: ["unit-target-resolution/tiny", "unit-target-resolution/small"],
        config: {},
      },
      body: { messages: [{ role: "user", content: "word ".repeat(200_000) }] },
    })
  );

  assert.ok(!("earlyResponse" in result), "approximate context hints must not reject the pool");
  if ("earlyResponse" in result) return;
  assert.deepEqual(
    result.orderedTargets.map((target) => target.modelStr),
    ["unit-target-resolution/tiny", "unit-target-resolution/small"]
  );
});

test("Jev context prefilter removes known-too-small choices only when a fitting target exists", () => {
  saveModelsDevCapabilities({
    "unit-jev-context": {
      small: capabilityEntry(8_000),
      large: capabilityEntry(1_000_000),
    },
  });
  const targets = [
    {
      kind: "model",
      stepId: "small",
      executionKey: "small",
      modelStr: "unit-jev-context/small",
      provider: "unit-jev-context",
      providerId: null,
      connectionId: null,
      weight: 1,
      label: null,
    },
    {
      kind: "model",
      stepId: "large",
      executionKey: "large",
      modelStr: "unit-jev-context/large",
      provider: "unit-jev-context",
      providerId: null,
      connectionId: null,
      weight: 1,
      label: null,
    },
  ] as import("../../open-sse/services/combo/types.ts").ResolvedComboTarget[];
  const body = { messages: [{ role: "user", content: "word ".repeat(200_000) }] };

  assert.deepEqual(
    filterJevTargetsByHardRequestContext(targets, body).map((target) => target.executionKey),
    ["large"]
  );
  assert.deepEqual(
    filterJevTargetsByHardRequestContext(targets, body, true).map((target) => target.executionKey),
    ["small", "large"],
    "compressible requests keep the candidates for deferred context handling"
  );
  assert.deepEqual(
    filterJevTargetsByHardRequestContext([targets[0]], body).map((target) => target.executionKey),
    ["small"],
    "when no candidate is known to fit, preserve existing fallback handling"
  );
});

test("Jev selection order survives preferLargeContext in the final target pipeline", async () => {
  saveModelsDevCapabilities({
    "unit-jev-order": {
      small: capabilityEntry(8_000),
      large: capabilityEntry(1_000_000),
    },
  });
  await providersDb.createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    apiKey: "ts-jev-order-test",
    name: "typesafe-jev-order-test",
    isActive: true,
    testStatus: "active",
  });
  let admitFallback = true;
  const fetchMock = mock.method(
    globalThis,
    "fetch",
    async (input: RequestInfo | URL, init?: RequestInit) => {
      assert.match(String(input), /\/v1\/systemone/);
      const payload = JSON.parse(String(init?.body)) as {
        questions?: { route?: { criteria?: Record<string, string | null> } };
      };
      const optionIds = Object.keys(payload.questions?.route?.criteria ?? {});
      const winner = optionIds[0];
      return Response.json({
        answers: {
          route: {
            type: "choice",
            choice: winner,
            probabilities: Object.fromEntries(
              optionIds.map((id) => [id, id === winner ? 0.9 : admitFallback ? 0.3 : 0.05])
            ),
            confidence: 0.95,
          },
        },
      });
    }
  );
  const config = {
    contextRequirements: { preferLargeContext: true },
  };
  const contextBody = { messages: [{ role: "user", content: "word ".repeat(200_000) }] };

  try {
    const result = await resolveComboTargetPipeline(
      deps({
        body: contextBody,
        combo: {
          id: "jev-order",
          name: "jev-order",
          strategy: "jev",
          models: ["unit-jev-order/small", "unit-jev-order/large"],
          config,
        },
        strategy: "jev",
        config,
        deferContextOverflowWhenCompressible: true,
      })
    );
    assert.ok(!("earlyResponse" in result));
    if ("earlyResponse" in result) return;
    assert.deepEqual(
      result.orderedTargets.map((target) => target.modelStr),
      ["unit-jev-order/small", "unit-jev-order/large"],
      "the Jev winner and remaining user preference order must survive context sorting"
    );
    assert.ok(
      result.sticky.messageHash,
      "winner-only and filtered outcomes retain the session key"
    );

    admitFallback = false;
    const winnerOnly = await resolveComboTargetPipeline(
      deps({
        body: contextBody,
        combo: {
          id: "jev-order",
          name: "jev-order",
          strategy: "jev",
          models: ["unit-jev-order/small", "unit-jev-order/large"],
          config,
        },
        strategy: "jev",
        config,
        deferContextOverflowWhenCompressible: true,
      })
    );
    assert.ok(!("earlyResponse" in winnerOnly));
    if ("earlyResponse" in winnerOnly) return;
    assert.deepEqual(
      winnerOnly.orderedTargets.map((target) => target.modelStr),
      ["unit-jev-order/small"]
    );
    assert.ok(
      winnerOnly.sticky.messageHash,
      "a one-target Jev verdict must retain the pre-admission session key for sticky write-back"
    );
  } finally {
    fetchMock.mock.restore();
  }
});

test("Jev continuation resolves a sticky account before judging with expansion disabled", async () => {
  clearAllStickyBindings();
  __setStickinessHeadroomFetcherForTests(async () => ({ util5h: 0.2, util7d: 0.2 }));
  __setStickinessConnectionFetcherForTests(async () => undefined);
  __setStickinessQuotaCheckerForTests(() => false);
  const connection = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    apiKey: "sk-jev-sticky-test",
    name: "jev-sticky-account",
    isActive: true,
    testStatus: "active",
  });
  await providersDb.createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    apiKey: "ts-jev-sticky-test",
    name: "typesafe-jev-sticky-test",
    isActive: true,
    testStatus: "active",
  });
  let systemOneCalls = 0;
  const fetchMock = mock.method(globalThis, "fetch", async () => {
    systemOneCalls += 1;
    return Response.json(
      { error: "Jev should have skipped the pinned continuation" },
      { status: 500 }
    );
  });
  const messages = [{ role: "user", content: "continue the same conversation" }];
  const comboName = "jev-sticky-expansion-off";
  const messageHash = peekSessionStickinessBinding(messages, comboName).messageHash;
  assert.ok(messageHash);
  recordStickyBinding(messageHash, String(connection.id), comboName);

  const config = { connectionAwareExpansion: false };
  try {
    const result = await resolveComboTargetPipeline(
      deps({
        body: { messages },
        combo: {
          id: comboName,
          name: comboName,
          strategy: "jev",
          models: ["openai/gpt-4o", "anthropic/claude-3"],
          config,
        },
        strategy: "jev",
        config,
      })
    );

    assert.ok(!("earlyResponse" in result));
    if ("earlyResponse" in result) return;
    assert.equal(result.sticky.stuck, true);
    assert.equal(result.orderedTargets[0].modelStr, "anthropic/claude-3");
    assert.equal(result.orderedTargets[0].connectionId, String(connection.id));
    assert.equal(systemOneCalls, 0);
  } finally {
    fetchMock.mock.restore();
  }
});

test("Jev preserves an eligible native Codex turn pin without asking TypeSafe", async () => {
  await providersDb.createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    apiKey: "ts-jev-native-pin-test",
    name: "typesafe-jev-native-pin-test",
    isActive: true,
    testStatus: "active",
  });
  let systemOneCalls = 0;
  const fetchMock = mock.method(globalThis, "fetch", async () => {
    systemOneCalls += 1;
    return Response.json({ error: "Jev should have bypassed this call" }, { status: 500 });
  });
  const pinnedModel = "anthropic/claude-3";

  try {
    const result = await resolveComboTargetPipeline(
      deps({
        combo: {
          id: "jev-native-pin",
          name: "jev-native-pin",
          strategy: "jev",
          models: ["openai/gpt-4o", pinnedModel],
          config: {},
        },
        strategy: "jev",
        nativeTurnPin: {
          comboName: "jev-native-pin",
          modelStr: pinnedModel,
          provider: "anthropic",
          connectionId: "native-pin-connection",
          createdAt: Date.now(),
          expiresAt: Date.now() + 60_000,
        },
      })
    );
    assert.ok(!("earlyResponse" in result));
    if ("earlyResponse" in result) return;
    assert.equal(systemOneCalls, 0);
    assert.ok(result.orderedTargets.some((target) => target.modelStr === pinnedModel));
  } finally {
    fetchMock.mock.restore();
  }
});

test("Jev returns cooldown diagnostics when every candidate has an open breaker", async () => {
  const { getCircuitBreaker } = await import("../../src/shared/utils/circuitBreaker.ts");
  const breaker = getCircuitBreaker("unit-jev-all-open", {
    failureThreshold: 1,
    resetTimeout: 60_000,
  });
  breaker.failureThreshold = 1;
  breaker._onFailure();

  try {
    const result = await resolveComboTargetPipeline(
      deps({
        combo: {
          id: "jev-all-open",
          name: "jev-all-open",
          strategy: "jev",
          models: ["unit-jev-all-open/one", "unit-jev-all-open/two"],
          config: {},
        },
        strategy: "jev",
      })
    );
    assert.ok("earlyResponse" in result);
    if (!("earlyResponse" in result)) return;
    assert.equal(result.earlyResponse.status, 503);
    assert.ok(Number(result.earlyResponse.headers.get("Retry-After")) > 0);
    const body = (await result.earlyResponse.json()) as {
      diagnostics?: { terminalReason?: string; excluded?: unknown[] };
    };
    assert.equal(body.diagnostics?.terminalReason, "all_targets_cooling_down");
    assert.equal(body.diagnostics?.excluded?.length, 2);
  } finally {
    breaker.reset();
  }
});

// #8790: maxContextWindow rejects every target whose known context window
// exceeds the configured ceiling. When that empties the pool, the
// context-requirements guard (applyContinuityFilters → #8786's
// buildEmptyComboTargetsPayload) must surface a 404 context_requirements_exhausted
// early response instead of letting an empty orderedTargets[] fall through to the
// attempt loop.
test("maxContextWindow rejecting every target returns a 404 context_requirements_exhausted earlyResponse", async () => {
  saveModelsDevCapabilities({
    "unit-target-resolution-max": {
      big1: capabilityEntry(500_000),
      big2: capabilityEntry(1_000_000),
    },
  });

  const result = await resolveComboTargetPipeline(
    deps({
      combo: {
        id: "c3",
        name: "max-context-window-exhausted",
        models: ["unit-target-resolution-max/big1", "unit-target-resolution-max/big2"],
        config: {},
      },
      config: {
        contextRequirements: { maxContextWindow: 128_000, contextFilterMode: "strict" },
      },
    })
  );

  assert.ok("earlyResponse" in result, "expected a context-requirements-exhausted early response");
  if (!("earlyResponse" in result)) return;
  assert.equal(result.earlyResponse.status, 404);
  const body = (await result.earlyResponse.json()) as {
    error?: { code?: string };
    diagnostics?: { terminalReason?: string; excluded?: unknown[] };
  };
  assert.equal(body.error?.code, "model_not_found");
  assert.equal(body.diagnostics?.terminalReason, "context_requirements_exhausted");
  assert.equal(body.diagnostics?.excluded?.length, 2);
});
