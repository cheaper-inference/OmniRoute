/**
 * #17958: under outputLimitAdvisory an oversized max_tokens no longer removes a
 * target, but it still fed the context-window check (input + requested output
 * vs the target's window). A target whose own output limit caps the reply well
 * inside its window was demoted behind a bigger fallback for a budget it would
 * never be sent. The window check now sizes the output per target.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-output-limit-tiering-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { resolveComboTargetPipeline } =
  await import("../../open-sse/services/combo/targetResolution.ts");

test.after(() => {
  clearModelsDevCapabilities();
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const noopLog = { info() {}, warn() {}, error() {}, debug() {} };

function capabilityEntry(limitContext: number, limitOutput: number | null, toolCall = true) {
  return {
    tool_call: toolCall,
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
    limit_output: limitOutput,
    interleaved_field: null,
  };
}

// 500k chars is about 125k input tokens by the chars/4 estimate: 125k + 64k
// fits a 200k window, 125k + 131k does not.
async function orderFor(
  provider: string,
  models = ["primary", "big"],
  extraBody: Record<string, unknown> = {},
  outputLimitAdvisory = true
): Promise<string[]> {
  const result = await resolveComboTargetPipeline({
    body: {
      messages: [{ role: "user", content: "word ".repeat(100_000) }],
      max_tokens: 131_072,
      ...extraBody,
    },
    combo: {
      id: provider,
      name: provider,
      models: models.map((model) => `${provider}/${model}`),
      config: {},
    },
    strategy: "priority",
    config: {},
    settings: { outputLimitAdvisory },
    allCombos: null,
    relayOptions: null,
    signal: null,
    apiKeyAllowedConnections: null,
    log: noopLog,
    resilienceSettings: { providerCooldown: { enabled: false } },
    isModelAvailable: undefined,
    handleSingleModelWithTimeout: async () => new Response("{}"),
    buildAutoCandidates: async () => [],
  } as never);
  assert.ok("orderedTargets" in result, "pipeline must hand back a target list");
  return (result as { orderedTargets: Array<{ modelStr: string }> }).orderedTargets.map(
    (target) => target.modelStr
  );
}

test("a target whose own output limit fits its window keeps its declared place", async () => {
  saveModelsDevCapabilities({
    "tier-fits": {
      primary: capabilityEntry(200_000, 64_000),
      big: capabilityEntry(1_000_000, 64_000),
    },
  });
  assert.deepEqual(await orderFor("tier-fits"), ["tier-fits/primary", "tier-fits/big"]);
});

test("the window check uses each target's own output limit, not the pool's highest", async () => {
  saveModelsDevCapabilities({
    "tier-mixed": {
      primary: capabilityEntry(200_000, 64_000),
      big: capabilityEntry(1_000_000, 128_000),
    },
  });
  assert.deepEqual(await orderFor("tier-mixed"), ["tier-mixed/primary", "tier-mixed/big"]);
});

test("a target whose own output limit still overflows its window is demoted", async () => {
  saveModelsDevCapabilities({
    "tier-overflow": {
      primary: capabilityEntry(200_000, 100_000),
      big: capabilityEntry(1_000_000, 128_000),
    },
  });
  assert.deepEqual(await orderFor("tier-overflow"), ["tier-overflow/big", "tier-overflow/primary"]);
});

test("a target with an unknown output limit keeps the full requested budget", async () => {
  saveModelsDevCapabilities({
    "tier-unknown": {
      primary: capabilityEntry(200_000, null),
      big: capabilityEntry(1_000_000, 64_000),
    },
  });
  assert.deepEqual(await orderFor("tier-unknown"), ["tier-unknown/big", "tier-unknown/primary"]);
});

test("the preferred tier sizes each target the same way when another target is too small", async () => {
  saveModelsDevCapabilities({
    "tier-three": {
      primary: capabilityEntry(200_000, 64_000),
      tiny: capabilityEntry(100_000, null),
      big: capabilityEntry(1_000_000, 64_000),
    },
  });
  assert.deepEqual(await orderFor("tier-three", ["primary", "tiny", "big"]), [
    "tier-three/primary",
    "tier-three/big",
    "tier-three/tiny",
  ]);
});

test("a sole survivor that fits once sized does not pull hard-rejected targets back", async () => {
  saveModelsDevCapabilities({
    "tier-sole": {
      primary: capabilityEntry(200_000, 64_000),
      notools: capabilityEntry(1_000_000, 64_000, false),
    },
  });
  const tools = [{ type: "function", function: { name: "noop", parameters: { type: "object" } } }];
  assert.deepEqual(await orderFor("tier-sole", ["primary", "notools"], { tools }), [
    "tier-sole/primary",
  ]);
});

test("without the advisory the context check still counts the full max_tokens", async () => {
  // `limited` is dropped for its output limit either way. Its context verdict
  // still counts toward tiering, and only the full budget makes it too small.
  saveModelsDevCapabilities({
    "tier-strict": {
      limited: capabilityEntry(200_000, 64_000),
      big: capabilityEntry(1_000_000, null),
    },
  });
  assert.deepEqual(await orderFor("tier-strict", ["uncatalogued", "limited", "big"], {}, false), [
    "tier-strict/big",
    "tier-strict/uncatalogued",
  ]);
});

test("a max_tokens below the target's own output limit is not raised to that limit", async () => {
  saveModelsDevCapabilities({
    "tier-small-request": {
      primary: capabilityEntry(200_000, 64_000),
      big: capabilityEntry(1_000_000, 64_000),
    },
  });
  // 600k chars is about 150k input tokens: 150k + 8k fits a 200k window,
  // 150k + 64k does not.
  const body = {
    messages: [{ role: "user", content: "word ".repeat(120_000) }],
    max_tokens: 8_000,
  };
  assert.deepEqual(await orderFor("tier-small-request", ["primary", "big"], body), [
    "tier-small-request/primary",
    "tier-small-request/big",
  ]);
});
