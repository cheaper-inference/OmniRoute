import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * OpenCode Zen's free `deepseek-v4.1-flash-free` backend rejects prompts above
 * ~330k tokens with `400 context_length_exceeded`, while models.dev lists the
 * model at 1M. Clients size their compaction budget from the advertised
 * window, so a 1M advertisement means long sessions never compact and
 * hard-fail mid-run. The real window must win over the synced 1M row.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oc-deepseek-free-ctx-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getTokenLimit, getSourcedTokenLimit } =
  await import("../../open-sse/services/contextManager.ts");

const MODEL = "deepseek-v4.1-flash-free";
const LEGACY_ALIAS = "deepseek-v4-flash-free";
const REAL_WINDOW = 330000;
const MAX_OUTPUT = 128000;
const SYNCED_WINDOW = 1000000;

function syncedRow(limitContext: number) {
  return {
    tool_call: true,
    reasoning: true,
    attachment: false,
    structured_output: null,
    temperature: true,
    modalities_input: JSON.stringify(["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context: limitContext,
    limit_input: limitContext,
    limit_output: null,
    interleaved_field: null,
  };
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("opencode-zen registry row declares the real ~330k window and 128k output", () => {
  const row = REGISTRY["opencode-zen"].models.find((model) => model.id === MODEL);
  assert.ok(row, `opencode-zen must list ${MODEL}`);
  assert.equal(row.contextLength, REAL_WINDOW);
  assert.equal(row.maxOutputTokens, MAX_OUTPUT);
  assert.ok(row.maxOutputTokens <= row.contextLength, "max output must fit the window");
  assert.deepEqual(row.aliases, [LEGACY_ALIAS]);
});

test("without a synced row the runtime limit is 330k, not the 200k provider default", () => {
  assert.equal(getTokenLimit("opencode-zen", MODEL), REAL_WINDOW);
});

test("a synced models.dev 1M window does not override the real 330k window", () => {
  modelsDevSync.saveModelsDevCapabilities({
    "opencode-zen": { [MODEL]: syncedRow(SYNCED_WINDOW) },
    opencode: { [MODEL]: syncedRow(SYNCED_WINDOW) },
  });

  for (const modelId of [`opencode-zen/${MODEL}`, `opencode/${MODEL}`]) {
    const caps = modelCapabilities.getResolvedModelCapabilities(modelId);
    assert.equal(caps.contextWindow, REAL_WINDOW, modelId);
    assert.equal(caps.maxInputTokens, REAL_WINDOW, modelId);
  }

  assert.equal(getTokenLimit("opencode-zen", MODEL), REAL_WINDOW);
  // The value the /v1/models catalog publishes when no canonical window is set.
  assert.equal(getSourcedTokenLimit("opencode-zen", MODEL), REAL_WINDOW);
});

test("the legacy deepseek-v4-flash-free alias resolves to the same 330k window", () => {
  modelsDevSync.saveModelsDevCapabilities({
    "opencode-zen": { [MODEL]: syncedRow(SYNCED_WINDOW) },
  });

  assert.equal(getTokenLimit("opencode-zen", LEGACY_ALIAS), REAL_WINDOW);
  const caps = modelCapabilities.getResolvedModelCapabilities(`opencode-zen/${LEGACY_ALIAS}`);
  assert.equal(caps.contextWindow, REAL_WINDOW);
});
