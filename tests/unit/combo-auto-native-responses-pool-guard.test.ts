import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Guard for the auto-combo candidate pool on native Responses requests. An auto
// combo with an empty model list still expands its pool to the active catalog
// when the request has no chat messages: an empty message list is estimated
// above zero tokens, so the expansion branch runs. Pin that behaviour here so a
// future change to the estimator or to the empty-message fallback fails a test
// instead of silently serving a smaller pool in production.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-pool-guard-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModels = await import("../../open-sse/config/providerModels.ts");
const { resolveAutoStrategyOrder } =
  await import("../../open-sse/services/combo/resolveAutoStrategy.ts");

const noopLog = {
  info() {},
  warn() {},
  error() {},
  debug() {},
} as never;

const NATIVE_INPUT = {
  input: [{ role: "user", content: [{ type: "input_text", text: "hello" }] }],
};

const CHAT_MESSAGES = {
  messages: [{ role: "user", content: "hello" }],
};

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  resetStorage();
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI",
    apiKey: "sk-test-openai",
    defaultModel: "gpt-4o-mini",
  });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

// The injected builder captures the post-expansion target list, which is the
// observable proof of whether the expansion branch ran for a given request.
async function capturePools(
  bodies: Array<Record<string, unknown>>,
  comboConfig: Record<string, unknown> = {}
): Promise<string[][]> {
  const captured: string[][] = [];
  const buildAutoCandidates = (async (targets: Array<{ modelStr: string }>) => {
    captured.push(targets.map((target) => target.modelStr));
    return [];
  }) as never;

  for (const body of bodies) {
    const deps = {
      orderedTargets: [],
      body,
      combo: { id: "guard", name: "guard", config: {}, autoConfig: {}, ...comboConfig },
      settings: null,
      config: {},
      relayOptions: null,
      resilienceSettings: { quotaPreflight: { enabled: false } },
      log: noopLog,
      buildAutoCandidates,
    };
    await resolveAutoStrategyOrder(deps as never);
  }
  return captured;
}

test("auto combo with empty models expands its pool on a native Responses request without messages", async () => {
  const captured = await capturePools([NATIVE_INPUT]);
  const catalog = [
    ...new Set(providerModels.getProviderModels("openai").map((model) => `openai/${model.id}`)),
  ].sort();
  assert.ok(catalog.length > 0, "expected a non-empty catalog for the test provider");
  assert.deepEqual(captured[0].sort(), catalog);
});

test("auto combo pool is identical for native Responses input and chat messages", async () => {
  const captured = await capturePools([NATIVE_INPUT, CHAT_MESSAGES]);
  assert.ok(captured[0].length > 0, "expected the native Responses pool to be expanded");
  assert.deepEqual(captured[0], captured[1]);
  assert.equal(new Set(captured[0]).size, captured[0].length);
});

test("fail-closed empty auto pool stays empty on a native Responses request", async () => {
  const captured = await capturePools([NATIVE_INPUT], {
    autoConfig: { failClosedWhenEmpty: true },
  });
  assert.deepEqual(captured[0], []);
});
