/**
 * An unknown model is a 404 in the caller's wire envelope, not a generic 400.
 * Claude Code shows a model-switch hint on 404 and treats 400 as a bad request.
 *
 * Three outcomes stay apart: unknown model (404), malformed or ambiguous model
 * string (400), empty auto pool (503).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-unknown-model-404-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { resolveModelOrError } = await import("../../src/sse/handlers/chatHelpers.ts");

const BODY = { messages: [{ role: "user", content: "hello" }] };

type WireError = {
  type?: string;
  error: { type?: string; code?: string | number; status?: string; message: string };
};

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function failure(model: string, endpoint: string) {
  const result = await resolveModelOrError(model, BODY, endpoint);
  assert.ok(result.error, "expected an error response");
  return {
    status: result.error.status,
    json: (await result.error.json()) as WireError,
  };
}

test("unknown model answers 404 model_not_found on the OpenAI wire", async () => {
  const { status, json } = await failure("completely-unknown-model-xyz", "/v1/chat/completions");
  assert.equal(status, 404);
  assert.equal(json.error.type, "invalid_request_error");
  assert.equal(json.error.code, "model_not_found");
  assert.match(json.error.message, /completely-unknown-model-xyz/);
});

test("unknown model answers a not_found_error envelope on a /messages route", async () => {
  for (const endpoint of ["/v1/messages", "/api/v1/messages"]) {
    const { status, json } = await failure("completely-unknown-model-xyz", endpoint);
    assert.equal(status, 404, endpoint);
    assert.equal(json.type, "error", endpoint);
    assert.equal(json.error.type, "not_found_error", endpoint);
    assert.match(json.error.message, /completely-unknown-model-xyz/, endpoint);
  }
});

test("unknown model answers a Gemini envelope on a /v1beta route", async () => {
  const { status, json } = await failure(
    "completely-unknown-model-xyz",
    "/v1beta/models/completely-unknown-model-xyz:generateContent"
  );
  assert.equal(status, 404);
  assert.equal(json.error.code, 404);
  assert.equal(json.error.status, "NOT_FOUND");
  assert.match(json.error.message, /completely-unknown-model-xyz/);
});

test("unknown built-in auto combo answers 404 and keeps its message", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-unknown-model-404",
    apiKey: "sk-openai-unknown-model-404",
    isActive: true,
    testStatus: "active",
    defaultModel: "gpt-4o-mini",
  });
  const { status, json } = await failure("auto/not-a-real-template", "/v1/chat/completions");
  assert.equal(status, 404);
  assert.equal(json.error.code, "model_not_found");
  assert.match(json.error.message, /Unknown built-in auto combo/i);
});

test("a malformed model string stays a 400 request error", async () => {
  const { status, json } = await failure("../etc/passwd", "/v1/chat/completions");
  assert.equal(status, 400);
  assert.match(json.error.message, /Invalid model format/i);
});

test("an ambiguous model alias stays a 400 request error", async () => {
  const { status, json } = await failure("claude-sonnet-4-6", "/v1/chat/completions");
  assert.equal(status, 400);
  assert.match(json.error.message, /Ambiguous model/i);
});

test("an empty auto pool stays a 503", async () => {
  const { status } = await failure("auto/coding:pro", "/v1/chat/completions");
  assert.equal(status, 503);
});
