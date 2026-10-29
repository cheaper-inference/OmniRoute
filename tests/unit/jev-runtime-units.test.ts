import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-jev-runtime-units-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "jev-runtime-units-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { resolveComboTargetPipeline } =
  await import("../../open-sse/services/combo/targetResolution.ts");
const { getComboTrace, startComboTrace } =
  await import("../../open-sse/services/combo/decisionTrace.ts");
const { acquire, buildAccountSemaphoreKey, resetAll } =
  await import("../../open-sse/services/accountSemaphore.ts");
const { calculatePromptCacheAffinityScores, promptCacheTargetIdentity } =
  await import("../../open-sse/services/combo/promptCacheAffinity.ts");

const logged: string[] = [];
const log = {
  info(_module: string, message: string) {
    logged.push(message);
  },
  warn(_module: string, message: string) {
    logged.push(message);
  },
  debug() {},
  error() {},
};

function okResponse(content: string): Response {
  return Response.json({ choices: [{ message: { role: "assistant", content } }] });
}

function pipelineDeps(combo: Record<string, unknown>, traceInvocationId: string) {
  return {
    body: { messages: [{ role: "user", content: "choose the right route" }] },
    combo,
    strategy: "jev",
    config: combo.config,
    settings: null,
    allCombos: [combo],
    relayOptions: null,
    signal: null,
    apiKeyAllowedConnections: null,
    log,
    resilienceSettings: { providerCooldown: { enabled: false } },
    isModelAvailable: async () => true,
    handleSingleModelWithTimeout: async () => okResponse("unused"),
    buildAutoCandidates: async () => [],
    traceInvocationId,
  } as never;
}

test.after(() => {
  mock.restoreAll();
  resetAll();
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("jev blocks a full concrete account before asking and keeps an available fallback", async () => {
  await providersDb.createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    apiKey: "ts-test-key",
    name: "jev-concurrency-typesafe",
    isActive: true,
    testStatus: "active",
  });
  const full = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-full-account",
    name: "jev-full-account",
    isActive: true,
    testStatus: "active",
    maxConcurrent: 1,
  });
  assert.ok(full);
  const release = await acquire(
    buildAccountSemaphoreKey({ provider: "openai", accountKey: String(full.id) }),
    { maxConcurrency: 1 }
  );
  let systemOneFetches = 0;
  const fetchMock = mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    if (String(input).includes("/v1/systemone")) systemOneFetches += 1;
    return Response.json({ answers: {} }, { status: 500 });
  });
  const combo = {
    name: "jev-capacity",
    strategy: "jev",
    config: { disableSessionStickiness: true },
    models: [
      {
        kind: "model",
        id: "full",
        model: "openai/gpt-4.1",
        providerId: "openai",
        connectionId: String(full.id),
      },
      { kind: "model", id: "fallback", model: "anthropic/claude-3", providerId: "anthropic" },
    ],
  };
  const invocationId = "jev-capacity-preask";
  startComboTrace(invocationId, { strategy: "jev", comboName: combo.name });

  try {
    const resolution = await resolveComboTargetPipeline(pipelineDeps(combo, invocationId));
    assert.ok(!("earlyResponse" in resolution));
    if ("earlyResponse" in resolution) return;
    assert.deepEqual(
      resolution.orderedTargets.map((target) => target.stepId),
      ["fallback"]
    );
    assert.deepEqual(
      getComboTrace(invocationId)
        ?.decisions.map((decision) => decision.reason)
        .filter((reason): reason is string => typeof reason === "string"),
      ["concurrency_cap"]
    );
    assert.equal(systemOneFetches, 0, "one surviving choice should skip the Jev call");
  } finally {
    fetchMock.mock.restore();
    release();
  }
});

test("jev treats a referenced fusion combo as one choice and dispatches its own panel", async () => {
  logged.length = 0;
  await providersDb.createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    apiKey: "ts-test-key",
    name: "jev-runtime-typesafe",
    isActive: true,
    testStatus: "active",
  });
  let systemOneFetches = 0;
  const fetchMock = mock.method(
    globalThis,
    "fetch",
    async (input: RequestInfo | URL, init?: RequestInit) => {
      if (!String(input).includes("/v1/systemone")) return Response.json({}, { status: 500 });
      systemOneFetches += 1;
      const payload = JSON.parse(String(init?.body)) as {
        questions?: { route?: { criteria?: Record<string, string | null> } };
      };
      const ids = Object.keys(payload.questions?.route?.criteria ?? {});
      assert.equal(ids.length, 2, "Jev should receive one option per outer runtime unit");
      assert.ok(
        Object.values(payload.questions?.route?.criteria ?? {}).includes("fusion panel"),
        "the fusion reference is represented by one opaque label"
      );
      const winner = ids.find((id) =>
        payload.questions?.route?.criteria?.[id]?.includes("fusion panel")
      );
      assert.ok(winner);
      return Response.json({
        answers: {
          route: {
            type: "choice",
            choice: winner,
            probabilities: Object.fromEntries(ids.map((id) => [id, id === winner ? 0.95 : 0.05])),
            confidence: 0.95,
          },
        },
      });
    }
  );

  const child = {
    name: "nested-fusion",
    strategy: "fusion",
    models: ["panel/a", "panel/b"],
    config: { judgeModel: "panel/judge", fusionTuning: { stragglerGraceMs: 0 } },
  };
  const combo = {
    name: "jev-parent",
    strategy: "jev",
    models: [
      { kind: "model", id: "backup", model: "fallback/model", providerId: "fallback" },
      { kind: "combo-ref", id: "fusion-choice", comboName: child.name, label: "fusion panel" },
    ],
    config: { disableSessionStickiness: true, maxRetries: 0 },
  };
  const dispatched: string[] = [];
  try {
    const response = await handleComboChat({
      body: { messages: [{ role: "user", content: "synthesize two panel answers" }] },
      combo,
      allCombos: [combo, child],
      settings: {},
      log,
      isModelAvailable: async () => true,
      handleSingleModel: async (_body, model) => {
        dispatched.push(model);
        return okResponse(model.endsWith("/judge") ? "synthesis" : `answer-${model}`);
      },
    });
    assert.equal(response.status, 200);
    assert.deepEqual(dispatched.sort(), ["panel/a", "panel/b", "panel/judge"]);
    assert.equal(systemOneFetches, 1);
    assert.ok(logged.some((message) => message.includes("Trying combo-ref combo:nested-fusion")));
    assert.ok(!dispatched.includes("fallback/model"));
  } finally {
    fetchMock.mock.restore();
  }
});

test("jev uses the prompt-cache affinity winner without asking System One", async () => {
  logged.length = 0;
  const fetchMock = mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    if (String(input).includes("/v1/systemone")) {
      throw new Error("prompt-cache pin should skip the Jev ask");
    }
    return Response.json({}, { status: 500 });
  });
  const child = {
    name: "cached-fusion",
    strategy: "fusion",
    models: ["panel/a", "panel/b"],
    config: { judgeModel: "panel/judge", fusionTuning: { stragglerGraceMs: 0 } },
  };
  const combo = {
    name: "jev-cache-pin",
    strategy: "jev",
    models: [
      { kind: "model", id: "fallback", model: "fallback/model", providerId: "fallback" },
      { kind: "combo-ref", id: "cached-panel", comboName: child.name, label: "cached panel" },
    ],
    config: { disableSessionStickiness: true, maxRetries: 0 },
  };
  const promptCacheBody = {
    prompt_cache_key: "stable-cache-key",
    messages: [
      { role: "user", content: "first turn" },
      { role: "assistant", content: "cached prefix" },
      { role: "user", content: "continue" },
    ],
  };
  const cacheScores = calculatePromptCacheAffinityScores(
    [
      { executionKey: "fallback", connectionId: null, authType: null },
      { executionKey: "cached-panel", connectionId: null, authType: null },
    ],
    promptCacheBody
  );
  const fallbackIdentity = promptCacheTargetIdentity({
    executionKey: "fallback",
    connectionId: null,
  });
  const nestedIdentity = promptCacheTargetIdentity({
    executionKey: "cached-panel",
    connectionId: null,
  });
  const expectedFirst =
    (cacheScores.get(fallbackIdentity) ?? -1) >= (cacheScores.get(nestedIdentity) ?? -1)
      ? "Trying model fallback/model"
      : "Trying combo-ref combo:cached-fusion";
  const dispatched: string[] = [];
  try {
    const response = await handleComboChat({
      body: promptCacheBody,
      combo,
      allCombos: [combo, child],
      settings: {},
      log,
      isModelAvailable: async () => true,
      handleSingleModel: async (_body, model, target) => {
        dispatched.push(target?.executionKey ?? model);
        return okResponse("ok");
      },
    });
    assert.equal(response.status, 200);
    assert.equal(
      fetchMock.mock.calls.filter((call) => String(call.arguments[0]).includes("/v1/systemone"))
        .length,
      0
    );
    assert.ok(dispatched.length > 0);
    assert.equal(
      logged.find((message) => message.startsWith("Trying ")),
      expectedFirst
    );
  } finally {
    fetchMock.mock.restore();
  }
});
