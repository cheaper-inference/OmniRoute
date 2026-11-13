import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vertex-combo-429-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-vertex-combo-429-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { clearAllModelLockouts, isModelLocked } =
  await import("../../open-sse/services/accountFallback.ts");

// Vertex answers a bare RESOURCE_EXHAUSTED "try again later" 429 when the whole region is busy.
// It says nothing about this account, so the combo must not lock the model for it (the account
// path in auth.ts already skips the lockout for the same body).
const SHARED =
  '{"error":{"code":429,"message":"Resource exhausted. Please try again later. Please refer to https://cloud.google.com/vertex-ai/generative-ai/docs/error-code-429 for more details.","status":"RESOURCE_EXHAUSTED"}}';
const QUOTA =
  '{"error":{"code":429,"message":"Quota exceeded for aiplatform.googleapis.com/generate_content_requests_per_minute_per_project_per_base_model.","status":"RESOURCE_EXHAUSTED"}}';
const WITH_RETRY_INFO =
  '{"error":{"code":429,"message":"Resource exhausted. Please try again later.","status":"RESOURCE_EXHAUSTED","details":[{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"30s"}]}}';
// handleChat does not hand the combo the upstream body. It returns the client-safe error JSON built
// by createErrorResult: the message is kept, `status` and `details` are gone, and a parsed retry
// hint rides the Retry-After header. Build the responses the same way, so these tests follow the
// production response path.
const { createErrorResult } = await import("../../open-sse/utils/error.ts");
const clientSafe = (upstream: string, retryAfterMs: number | null = null) => {
  const { response } = createErrorResult(429, JSON.parse(upstream).error.message, retryAfterMs);
  return { body: response.text(), retryAfter: response.headers.get("retry-after") };
};
const MODEL = "gemini-2.5-pro";
const SETTINGS = {
  modelLockout: {
    enabled: true,
    errorCodes: [429, 503],
    baseCooldownMs: 3000,
    maxCooldownMs: 5000,
    maxBackoffSteps: 10,
    useExponentialBackoff: true,
  },
};
const log = { info() {}, warn() {}, error() {}, debug() {} };

test.beforeEach(() => clearAllModelLockouts());

test.after(() => {
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function runCombo(
  provider: string,
  status: number,
  body: string | Promise<string>,
  maxRetries = 0,
  extraHeaders: Record<string, string> = {}
) {
  const text = await body;
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: `sk-test-${Math.random().toString(16).slice(2, 8)}`,
    isActive: true,
    testStatus: "active",
  });
  const connectionId = connection.id as string;
  await handleComboChat({
    body: {},
    combo: {
      name: "vertex-shared-429",
      strategy: "priority",
      models: [`${provider}/${MODEL}`],
      config: { maxRetries, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () =>
      new Response(text, {
        status,
        headers: {
          ...extraHeaders,
          "content-type": "application/json",
          "X-OmniRoute-Selected-Connection-Id": connectionId,
        },
      }),
    isModelAvailable: async () => true,
    log,
    settings: SETTINGS,
    allCombos: null,
  });
  return isModelLocked(provider, connectionId, MODEL);
}

for (const provider of ["vertex", "vertex-partner"]) {
  test(`${provider}: a shared-capacity 429 does not lock the model in the combo`, async () => {
    assert.equal(await runCombo(provider, 429, SHARED), false);
  });

  test(`${provider}: a quota 429 still locks the model in the combo`, async () => {
    assert.equal(await runCombo(provider, 429, QUOTA), true);
  });

  test(`${provider}: a 429 with retry details still locks the model in the combo`, async () => {
    assert.equal(await runCombo(provider, 429, WITH_RETRY_INFO), true);
  });
}

test("vertex: with retries enabled a shared-capacity 429 still leaves the model unlocked", async () => {
  assert.equal(await runCombo("vertex", 429, SHARED, 1), false);
});

test("vertex: with retries enabled a quota 429 still locks the model", async () => {
  assert.equal(await runCombo("vertex", 429, QUOTA, 1), true);
});

test("the same body on another provider still locks the model in the combo", async () => {
  assert.equal(await runCombo("gemini", 429, SHARED), true);
});

test("a 503 with the same body on vertex still locks the model in the combo", async () => {
  assert.equal(await runCombo("vertex", 503, SHARED), true);
});

for (const provider of ["vertex", "vertex-partner"]) {
  test(`${provider}: the client-safe shared-capacity 429 that handleChat returns does not lock the model`, async () => {
    assert.equal(await runCombo(provider, 429, clientSafe(SHARED).body), false);
  });

  test(`${provider}: the client-safe quota 429 that handleChat returns still locks the model`, async () => {
    assert.equal(await runCombo(provider, 429, clientSafe(QUOTA).body), true);
  });

  test(`${provider}: a client-safe 429 that carries a retry hint still locks the model`, async () => {
    // WITH_RETRY_INFO has details, so the pipeline sets Retry-After on the rebuilt response.
    const hinted = clientSafe(WITH_RETRY_INFO, 30_000);
    assert.equal(hinted.retryAfter, "30");
    assert.equal(
      await runCombo(provider, 429, hinted.body, 0, { "retry-after": hinted.retryAfter ?? "" }),
      true
    );
  });
}

test("the client-safe shared-capacity body on another provider still locks the model", async () => {
  assert.equal(await runCombo("gemini", 429, clientSafe(SHARED).body), true);
});
