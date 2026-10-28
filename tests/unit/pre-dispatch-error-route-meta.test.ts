// @ts-nocheck
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pre-dispatch-meta-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { createErrorResult } = await import("../../open-sse/utils/error.ts");
const tracker = await import("../../open-sse/services/geminiRateLimitTracker.ts");

const originalFetch = globalThis.fetch;
const MODEL = "gemini-2.5-flash";

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  tracker.resetCounters();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the Gemini TPM pre-dispatch 429 carries the resolved provider and model headers", async () => {
  const tpm = tracker.getModelTpm(MODEL);
  assert.ok(tpm > 0, `${MODEL} must have a TPM limit for this guard to fire`);
  tracker.incrementTokenUsage(MODEL, tpm + 1);
  let dispatched = false;
  globalThis.fetch = async () => {
    dispatched = true;
    return new Response("{}", { status: 200 });
  };
  const body = { model: MODEL, messages: [{ role: "user", content: "hi" }] };

  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "gemini", model: MODEL, extendedContext: false },
    credentials: { apiKey: "test-gemini-key", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ "content-type": "application/json" }),
    },
    userAgent: "test",
  });

  assert.equal(dispatched, false, "the guard must reject before any upstream call");
  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.equal(result.errorCode, "GEMINI_TPM_EXHAUSTED");
  assert.equal(result.response.status, 429);
  assert.equal(result.response.headers.get("X-OmniRoute-Provider"), "gemini");
  assert.equal(result.response.headers.get("X-OmniRoute-Model"), MODEL);
  assert.match(result.response.headers.get("Content-Type"), /application\/json/);
  const payload = await result.response.json();
  assert.equal(payload.error.code, "GEMINI_TPM_EXHAUSTED");
  assert.match(payload.error.message, /Gemini TPM rate limit reached/);
});

test("createErrorResult without route metadata keeps only its JSON content type", () => {
  const result = createErrorResult(429, "Token limit exceeded", null, "TOKEN_LIMIT_EXCEEDED");
  assert.deepEqual([...result.response.headers.keys()], ["content-type"]);
  assert.equal(result.errorCode, "TOKEN_LIMIT_EXCEEDED");
});

test("both pre-dispatch rejections, and no other error, attach the route metadata", () => {
  const source = fs.readFileSync(
    path.join(import.meta.dirname, "../../open-sse/handlers/chatCore.ts"),
    "utf8"
  );
  for (const code of ["TOKEN_LIMIT_EXCEEDED", "GEMINI_TPM_EXHAUSTED"]) {
    const site = new RegExp(
      `"${code}"\\n\\s+\\);\\n\\s+return \\{ \\.\\.\\.rejected, response: attachRouteMeta\\(rejected\\.response, \\{ provider, model \\}\\) \\};`
    );
    assert.match(source, site, `${code} must return through attachRouteMeta`);
  }
  assert.equal(source.match(/attachRouteMeta\(/g)?.length, 2, "only the two guards opt in");
});
