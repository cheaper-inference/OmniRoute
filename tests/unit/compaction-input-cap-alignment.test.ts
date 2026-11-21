import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-compaction-input-cap-alignment-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { setModelCapabilityOverride } = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const { updateCompressionSettings } = await import("../../src/lib/db/compression.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { estimateTokens } = await import("../../open-sse/services/contextManager.ts");

const TEST_PROVIDER = "test-compaction-prov";
const TEST_MODEL = "test-compaction-model";
const ENV_CONTEXT_LIMIT = "CONTEXT_LENGTH_TEST_COMPACTION_PROV";

const originalFetch = globalThis.fetch;
const originalEnvContext = process.env[ENV_CONTEXT_LIMIT];

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.before(async () => {
  await resetStorage();
  // Window is 8000 tokens, but input-only cap is 4000 tokens
  process.env[ENV_CONTEXT_LIMIT] = "8000";

  await updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
  });

  setModelCapabilityOverride(`${TEST_PROVIDER}/${TEST_MODEL}`, "max_input_tokens", 4000);

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        id: "chatcmpl-test",
        object: "chat.completion",
        created: Date.now(),
        model: TEST_MODEL,
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: "ok from upstream" },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 3000, completion_tokens: 5, total_tokens: 3005 },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  if (originalEnvContext === undefined) {
    delete process.env[ENV_CONTEXT_LIMIT];
  } else {
    process.env[ENV_CONTEXT_LIMIT] = originalEnvContext;
  }
  await new Promise((r) => setTimeout(r, 200));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("aligns reactive compaction ceiling to max_input_tokens so dead band [cap, window) auto-compacts instead of 400", async () => {
  // Generate multi-turn history with ~5,500 estimated tokens (chars/4).
  // Fits in window (8000) but exceeds input cap (4000).
  // Without the fix, last-resort compaction skipped (5500 < 8000) and enforceOutputTokenBudget rejects with 400.
  // With the fix, last-resort targets 4000, prunes older history, fits < 4000 and succeeds.
  const turns = [];
  for (let i = 0; i < 10; i++) {
    turns.push({
      role: "user",
      content: `Turn ${i} user request: ` + "word ".repeat(250),
    });
    turns.push({
      role: "assistant",
      content: `Turn ${i} assistant reply: ` + "answer ".repeat(250),
    });
  }

  const result = await handleChatCore({
    body: {
      model: TEST_MODEL,
      messages: turns,
      stream: false,
    },
    modelInfo: {
      provider: TEST_PROVIDER,
      model: TEST_MODEL,
      extendedContext: false,
    },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: {
        baseUrl: "https://test-compaction.example.test",
      },
    },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: {
        model: TEST_MODEL,
        messages: turns,
        stream: false,
      },
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    isCombo: false,
    log: {
      debug() {},
      info() {},
      warn() {},
      error() {},
    },
  });

  assert.equal(
    result.success,
    true,
    `expected request to succeed via last-resort compaction to input cap, got error: ${
      (result as { error?: string }).error
    }`
  );
});

test("last-resort shrinks messages when system tokens overflow a body the tools-only target would keep", async () => {
  // Messages stay under both the 70% proactive threshold and `ceiling - tools`.
  // A top-level system field is outside compressContext, so one tools-only pass
  // no-ops and the gate 400s. The budget has to come from this request's own
  // breakdown. The 4000 cap is the test override, not a catalog change.
  const turns = [];
  for (let i = 0; i < 12; i++) {
    turns.push({ role: "user", content: `u${i} ` + "m".repeat(280) });
    turns.push({ role: "assistant", content: `a${i} ` + "m".repeat(280) });
  }
  const system = "S".repeat(10_400);
  const messageTokens = estimateTokens(turns);
  const systemTokens = estimateTokens(system);
  const ceiling = 4000;
  const oldToolsOnlyTarget = ceiling - 1;
  assert.ok(
    messageTokens < Math.floor(ceiling * 0.7),
    `messages must stay under the proactive threshold, got ${messageTokens}`
  );
  assert.ok(
    messageTokens < oldToolsOnlyTarget,
    `messages must fit the old tools-only target, got ${messageTokens}`
  );
  assert.ok(
    messageTokens + systemTokens >= ceiling,
    `system must push the body over the cap, got messages=${messageTokens} system=${systemTokens}`
  );

  const result = await handleChatCore({
    body: {
      model: TEST_MODEL,
      messages: turns,
      system,
      stream: false,
    },
    modelInfo: {
      provider: TEST_PROVIDER,
      model: TEST_MODEL,
      extendedContext: false,
    },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: {
        baseUrl: "https://test-compaction.example.test",
      },
    },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: {
        model: TEST_MODEL,
        messages: turns,
        system,
        stream: false,
      },
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    isCombo: false,
    log: {
      debug() {},
      info() {},
      warn() {},
      error() {},
    },
  });

  assert.equal(
    result.success,
    true,
    `expected system overflow to compact to the live input cap, got error: ${
      (result as { error?: string }).error
    }`
  );
});
