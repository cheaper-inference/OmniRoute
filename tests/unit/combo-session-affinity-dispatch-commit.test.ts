import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

/**
 * A combo's availability preflight selects credentials with `affinityReadOnly`, so a
 * check of one candidate can never rebind or extend a session's account binding.
 * Non-OAuth preflight credentials used to be cached and reused at dispatch, which
 * meant the account that actually served the request never got its binding created
 * or refreshed: session continuity silently stopped working for API-key combo
 * targets. Dispatch must commit the binding for the account it really uses.
 */
const harness = await createChatPipelineHarness("combo-affinity-dispatch-commit");
const {
  buildOpenAIResponse,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
} = harness;
const affinity = await import("../../src/lib/db/sessionAccountAffinity.ts");

const TTL_MS = 1_800_000;

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

async function sendComboRequest(comboName: string, sessionId: string) {
  return handleChat(
    buildRequest({
      body: {
        model: comboName,
        stream: false,
        messages: [{ role: "user", content: "hello" }],
      },
      headers: { "x-session-id": sessionId },
    })
  );
}

test("an API-key combo target dispatched after the read-only preflight binds the session", async () => {
  await settingsDb.updateSettings({
    sessionAffinityTtlMs: TTL_MS,
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });
  const connection = await seedConnection("openai", { apiKey: "sk-openai-affinity-commit" });
  await combosDb.createCombo({
    name: "affinity-dispatch-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/gpt-4.1-mini", "openai/gpt-4o-mini"],
  });

  let upstreamCalls = 0;
  globalThis.fetch = async () => {
    upstreamCalls += 1;
    return buildOpenAIResponse("ok", "gpt-4.1-mini");
  };

  const response = await sendComboRequest("affinity-dispatch-combo", "affinity-dispatch");

  assert.equal(response.status, 200);
  assert.equal(upstreamCalls, 1);
  const binding = affinity.getSessionAccountAffinity("header:affinity-dispatch", "openai", TTL_MS);
  assert.equal(
    binding?.connectionId,
    connection.id,
    "the account that served the request must hold the session binding"
  );
});

test("without session affinity the combo still dispatches and writes no binding", async () => {
  await settingsDb.updateSettings({
    sessionAffinityTtlMs: 0,
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });
  await seedConnection("openai", { apiKey: "sk-openai-affinity-off" });
  await combosDb.createCombo({
    name: "affinity-off-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/gpt-4.1-mini", "openai/gpt-4o-mini"],
  });

  globalThis.fetch = async () => buildOpenAIResponse("ok", "gpt-4.1-mini");

  const response = await sendComboRequest("affinity-off-combo", "affinity-off");

  assert.equal(response.status, 200);
  assert.equal(affinity.getSessionAccountAffinity("header:affinity-off", "openai", TTL_MS), null);
});
