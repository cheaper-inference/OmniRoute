// A request for an unknown `auto/<x>` model must answer 404 in the caller's wire envelope on the
// main chat path, like any other unknown model. createVirtualAutoCombo runs before
// resolveModelOrError there, so it needs the endpoint path to pick the envelope.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-unknown-auto-404-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "unknown-auto-404-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");

type WireError = {
  type?: string;
  error: { type?: string; code?: string | number; status?: string; message: string };
};

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  initTranslators();
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-unknown-auto-404",
    apiKey: "placeholder-key-not-used",
    isActive: true,
    testStatus: "active",
    defaultModel: "gpt-4o-mini",
  });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function ask(endpoint: string, model: string) {
  const response = await handleChat(
    new Request(`http://localhost${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        max_tokens: 8,
        messages: [{ role: "user", content: "hello" }],
      }),
    })
  );
  return { status: response.status, json: (await response.json()) as WireError };
}

test("unknown auto/<x> answers 404 model_not_found on the OpenAI wire", async () => {
  const { status, json } = await ask("/v1/chat/completions", "auto/not-a-real-template");
  assert.equal(status, 404);
  assert.equal(json.error.type, "invalid_request_error");
  assert.equal(json.error.code, "model_not_found");
  assert.match(json.error.message, /Unknown built-in auto combo/i);
});

test("unknown auto/<x> answers a not_found_error envelope on a /messages route", async () => {
  const { status, json } = await ask("/v1/messages", "auto/not-a-real-template");
  assert.equal(status, 404);
  assert.equal(json.type, "error");
  assert.equal(json.error.type, "not_found_error");
  assert.match(json.error.message, /Unknown built-in auto combo/i);
});

test("a recognised auto variant keeps its own answer, not the unknown-template one", async () => {
  // No connected candidate: the pool is empty, so no upstream call is made.
  const { json } = await ask("/v1/chat/completions", "auto/coding:pro");
  assert.doesNotMatch(json.error.message, /Unknown built-in auto combo/i);
});
