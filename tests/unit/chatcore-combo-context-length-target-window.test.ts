/**
 * A combo's `context_length` applies only up to the executing model's own window.
 *
 * A combo can declare 1,000,000 while some members hold less (codex 872k,
 * Bedrock Claude models at 200k through model_context_overrides). The input gate already
 * stops at the member's window, but the output room was computed against the combo's 1M,
 * so `max_tokens` was never trimmed: input plus `max_tokens` could exceed the member's
 * window.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-target-window-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const compressionDb = await import("../../src/lib/db/compression.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const PROVIDER = "openai";
const MODEL = "combo-window-target-model";
const MODEL_WINDOW = 400_000;
const COMBO_NAME = "combo-window-cap-test";
// ~395k estimated input tokens (chars / 4): fits the 400k window with ~5k to spare.
const PROMPT = "x".repeat(1_580_000);
const REQUESTED_OUTPUT = 10_000;

const originalFetch = globalThis.fetch;
const sentBodies: Array<Record<string, unknown>> = [];
const contextLogs: string[] = [];
const log = {
  debug() {},
  info(tag: string, message: string) {
    if (tag === "CONTEXT") contextLogs.push(String(message));
  },
  warn(tag: string, message: string) {
    if (tag === "CONTEXT") contextLogs.push(String(message));
  },
  error() {},
};

test.before(async () => {
  core.resetDbInstance();
  await compressionDb.updateCompressionSettings({
    enabled: false,
    defaultMode: "off",
    autoTriggerTokens: 0,
  });
  assert.equal(contextOverrides.setModelContextOverride(PROVIDER, MODEL, MODEL_WINDOW), true);
  await combosDb.createCombo({
    name: COMBO_NAME,
    models: [`${PROVIDER}/${MODEL}`],
    context_length: 1_000_000,
  } as never);
  globalThis.fetch = async (_url: unknown, init?: RequestInit) => {
    sentBodies.push(JSON.parse(String(init?.body ?? "{}")));
    return new Response(
      JSON.stringify({
        id: "chatcmpl-window",
        object: "chat.completion",
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a combo's 1M context_length does not widen a 400k member's output room", async () => {
  const body = {
    model: MODEL,
    messages: [{ role: "user", content: PROMPT }],
    max_tokens: REQUESTED_OUTPUT,
    stream: false,
  };
  const result = await handleChatCore({
    body,
    modelInfo: { provider: PROVIDER, model: MODEL, extendedContext: false },
    credentials: { apiKey: "sk-test" },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body,
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    isCombo: true,
    comboName: COMBO_NAME,
    log,
  } as never);

  assert.equal(
    sentBodies.length,
    1,
    `expected one upstream call; logs: ${contextLogs.join(" | ")}`
  );
  assert.equal((result as { success?: boolean }).success, true);
  const sent = sentBodies[0];
  const maxOutput = Number(sent.max_tokens ?? sent.max_completion_tokens);
  assert.ok(
    maxOutput > 0 && maxOutput <= 6_000,
    `max output sent upstream: ${maxOutput}; the ${MODEL_WINDOW} member leaves ~5k tokens. Logs: ${contextLogs.join(" | ")}`
  );
});
