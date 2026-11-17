// A reasoning entry is served only to the provider and model that stored it. Tool call ids are
// not unique across providers, so the id alone must not select another provider's reasoning.
import { after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-reasoning-provider-scope-"));
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "reasoning-provider-scope-test-secret";

const reasoningCache = await import("../../open-sse/services/reasoningCache.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { setReasoningCache } = await import("../../src/lib/db/reasoningCache.ts");
const { clearModelsDevCapabilities, saveModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const STORED_PROVIDER = "deepseek";
const STORED_MODEL = "deepseek-v4-pro";
const SECRET = "reasoning captured under the deepseek provider";
const SCOPE = "api-key:scope-1";

beforeEach(() => {
  reasoningCache.clearReasoningCacheAll();
  clearModelsDevCapabilities();
  saveModelsDevCapabilities({
    [STORED_PROVIDER]: {
      [STORED_MODEL]: {
        tool_call: true,
        reasoning: true,
        attachment: null,
        structured_output: null,
        temperature: null,
        modalities_input: "[]",
        modalities_output: "[]",
        knowledge_cutoff: null,
        release_date: null,
        interleaved_field: "reasoning_content",
      },
    },
  } as never);
});

after(() => {
  resetDbInstance();
});

test("replays cached reasoning to a request from the same provider and model", () => {
  reasoningCache.cacheReasoning("call_same", STORED_PROVIDER, STORED_MODEL, SECRET);
  assert.equal(reasoningCache.lookupReasoning("call_same", STORED_PROVIDER, STORED_MODEL), SECRET);
});

test("does not replay cached reasoning to a request from another provider", () => {
  reasoningCache.cacheReasoning("call_other_provider", STORED_PROVIDER, STORED_MODEL, SECRET);
  assert.equal(reasoningCache.lookupReasoning("call_other_provider", "openai", "gpt-5"), null);
});

test("does not replay cached reasoning to a request for another model", () => {
  reasoningCache.cacheReasoning("call_other_model", STORED_PROVIDER, STORED_MODEL, SECRET);
  assert.equal(
    reasoningCache.lookupReasoning("call_other_model", STORED_PROVIDER, "deepseek-v4-pro-alt"),
    null
  );
});

test("replays a persisted entry only to the provider and model that stored it", () => {
  setReasoningCache("call_db_match", STORED_PROVIDER, STORED_MODEL, SECRET);
  assert.equal(
    reasoningCache.lookupReasoning("call_db_match", STORED_PROVIDER, STORED_MODEL),
    SECRET
  );
});

test("does not replay a persisted entry to another provider, but its owner still can", () => {
  setReasoningCache("call_db_other_provider", STORED_PROVIDER, STORED_MODEL, SECRET);
  assert.equal(reasoningCache.lookupReasoning("call_db_other_provider", "openai", "gpt-5"), null);
  assert.equal(
    reasoningCache.lookupReasoning("call_db_other_provider", STORED_PROVIDER, STORED_MODEL),
    SECRET
  );
});

test("does not replay a persisted entry for another model, but its owner still can", () => {
  setReasoningCache("call_db_other_model", STORED_PROVIDER, STORED_MODEL, SECRET);
  assert.equal(
    reasoningCache.lookupReasoning("call_db_other_model", STORED_PROVIDER, "deepseek-v4-pro-alt"),
    null
  );
  assert.equal(
    reasoningCache.lookupReasoning("call_db_other_model", STORED_PROVIDER, STORED_MODEL),
    SECRET
  );
});

test("an expired persisted entry stays a miss for any provider", () => {
  setReasoningCache("call_expired", STORED_PROVIDER, STORED_MODEL, SECRET, -1000);
  assert.equal(reasoningCache.lookupReasoning("call_expired", STORED_PROVIDER, STORED_MODEL), null);
});

test("the translator does not replay reasoning captured under another provider", () => {
  reasoningCache.cacheReasoningFromAssistantMessage(
    { role: "assistant", reasoning_content: SECRET, tool_calls: [{ id: "call_0" }] },
    STORED_PROVIDER,
    STORED_MODEL,
    { scope: SCOPE, historyMessages: [{ role: "user", content: "hi" }] }
  );
  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI,
    STORED_MODEL,
    {
      messages: [
        { role: "user", content: "hi" },
        {
          role: "assistant",
          tool_calls: [
            { id: "call_0", type: "function", function: { name: "ls", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "call_0", content: "ok" },
      ],
    },
    false,
    null,
    "openai",
    null,
    { reasoningCacheScope: SCOPE }
  ) as { messages: Array<Record<string, unknown>> };
  const assistant = translated.messages.find((message) => message.role === "assistant");
  assert.notEqual(assistant?.reasoning_content, SECRET);
});
