/**
 * A gateway key allowlist must scope the TypeSafe credential Jev uses.
 * An allowlist of model connections must not send the latest user text
 * through an operator TypeSafe key, and ordering falls open.
 */
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-jev-allowlist-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
const JEV_FLAG = "COMBO_JEV_STRATEGY_ENABLED";
const ORIGINAL_JEV_FLAG = process.env[JEV_FLAG];

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { resolveComboTargetPipeline } =
  await import("../../open-sse/services/combo/targetResolution.ts");

const noopLog = { info() {}, warn() {}, error() {}, debug() {} } as never;

test.afterEach(() => {
  if (ORIGINAL_JEV_FLAG === undefined) delete process.env[JEV_FLAG];
  else process.env[JEV_FLAG] = ORIGINAL_JEV_FLAG;
});

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function pipelineDeps(apiKeyAllowedConnections: string[] | null) {
  return {
    body: { messages: [{ role: "user", content: "rewrite the release notes" }] },
    combo: {
      id: "jev-allow",
      name: "jev-allow",
      strategy: "jev",
      models: [
        { kind: "model", id: "opus", model: "openai/gpt-4o", providerId: "openai" },
        { kind: "model", id: "glm", model: "anthropic/claude-3", providerId: "anthropic" },
      ],
      config: { disableSessionStickiness: true },
    },
    strategy: "jev",
    config: { disableSessionStickiness: true },
    settings: null,
    allCombos: null,
    relayOptions: null,
    signal: null,
    apiKeyAllowedConnections,
    log: noopLog,
    resilienceSettings: { providerCooldown: { enabled: false } },
    isModelAvailable: undefined,
    handleSingleModelWithTimeout: async () => new Response("{}"),
    buildAutoCandidates: async () => [],
  } as never;
}

test("jev credential lookup honors the gateway connection allowlist", async () => {
  process.env[JEV_FLAG] = "true";
  const modelConn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-model-only",
    name: "model-key",
    isActive: true,
    testStatus: "active",
  });
  await providersDb.createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    apiKey: "ts-operator-key",
    name: "typesafe-key",
    isActive: true,
    testStatus: "active",
  });

  let systemOneFetches = 0;
  const fetchMock = mock.method(
    globalThis,
    "fetch",
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (!url.includes("/v1/systemone")) {
        return new Response("unexpected", { status: 500 });
      }
      systemOneFetches += 1;
      const payload = JSON.parse(String(init?.body)) as {
        state?: string;
        questions?: { route?: { criteria?: Record<string, string | null> } };
      };
      assert.equal(payload.state, "rewrite the release notes");
      const ids = Object.keys(payload.questions?.route?.criteria ?? {});
      const winner = ids[ids.length - 1];
      const probabilities = Object.fromEntries(ids.map((id) => [id, id === winner ? 0.9 : 0.05]));
      return Response.json({
        answers: {
          route: {
            type: "choice",
            choice: winner,
            probabilities,
            confidence: 0.95,
          },
        },
      });
    }
  );

  try {
    const restricted = await resolveComboTargetPipeline(pipelineDeps([String(modelConn.id)]));
    assert.ok(!("earlyResponse" in restricted));
    if ("earlyResponse" in restricted) return;
    assert.equal(systemOneFetches, 0);
    assert.deepEqual(
      restricted.orderedTargets.map((target) => target.modelStr),
      ["openai/gpt-4o", "anthropic/claude-3"]
    );

    const open = await resolveComboTargetPipeline(pipelineDeps(null));
    assert.ok(!("earlyResponse" in open));
    if ("earlyResponse" in open) return;
    assert.equal(systemOneFetches, 1);
    assert.deepEqual(
      open.orderedTargets.map((target) => target.modelStr),
      ["anthropic/claude-3"]
    );
  } finally {
    fetchMock.mock.restore();
  }
});

test("a stored TypeSafe key alone never calls TypeSafe: flag off keeps the preference order", async () => {
  delete process.env[JEV_FLAG];
  await providersDb.createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    apiKey: "ts-flag-off-key",
    name: "typesafe-flag-off",
    isActive: true,
    testStatus: "active",
  });
  let systemOneFetches = 0;
  const fetchMock = mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    if (String(input).includes("typesafe")) systemOneFetches += 1;
    return new Response("unexpected", { status: 500 });
  });
  try {
    const result = await resolveComboTargetPipeline(pipelineDeps(null));
    assert.ok(!("earlyResponse" in result));
    if ("earlyResponse" in result) return;
    assert.equal(systemOneFetches, 0);
    assert.deepEqual(
      result.orderedTargets.map((target) => target.modelStr),
      ["openai/gpt-4o", "anthropic/claude-3"]
    );
  } finally {
    fetchMock.mock.restore();
  }
});
