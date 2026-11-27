// #20969: a model-only cooldown keeps the connection active, so connection.lastError is never
// written and the all-cooling-down answer carried `lastError=null, lastErrorCode=429` even when
// the lock came from a 400 "credit balance is too low". The client read a transient rate limit
// and waited out the reset on a dead key. The lock entry now keeps the upstream message and
// status, the credentials expose them, and a non-429 lock keeps its upstream status class.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-20969-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "omniroute-20969-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const { handleNoCredentials } = await import("../../src/sse/handlers/chatHelpers.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { LOCAL_MODEL_COOLDOWN_HEADER } = await import("../../open-sse/utils/localCooldownHeader.ts");

const MODEL = "claude-sonnet-5-5";
const CREDIT_MESSAGE =
  "Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits.";

type ApiErrorJson = {
  error?: { message?: string; code?: string; type?: string; model?: string };
};

async function seedClaude(name: string) {
  return providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name,
    accessToken: `${name}-access`,
    refreshToken: `${name}-refresh`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

test.beforeEach(() => {
  fallback.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  fallback.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("lockModelIfPerModelQuota keeps the upstream message and status on the lock entry", () => {
  const locked = fallback.lockModelIfPerModelQuota(
    "ollama",
    "conn-20969",
    "llama3",
    "quota_exhausted",
    60_000,
    undefined,
    { lastError: CREDIT_MESSAGE, errorCode: 400 }
  );
  assert.equal(locked, true);

  const info = fallback.getModelLockoutInfo("ollama", "conn-20969", "llama3");
  assert.ok(info);
  assert.equal(info.reason, "quota_exhausted");
  assert.equal(info.lastError, CREDIT_MESSAGE);
  assert.equal(info.errorCode, 400);
});

test("a model-only cooldown from a 400 credit error surfaces the upstream message and status", async () => {
  const conn = await seedClaude("claude-20969-dead-key");
  fallback.lockModel("claude", conn.id, MODEL, "quota_exhausted", 120_000, {
    lastError: CREDIT_MESSAGE,
    errorCode: 400,
  });

  const credentials = await auth.getProviderCredentials("claude", null, null, MODEL);

  assert.equal(credentials.allRateLimited, true);
  assert.equal(credentials.cooldownScope, "model");
  assert.equal(credentials.cooldownModel, MODEL);
  assert.equal(credentials.lastErrorCode, 400);
  assert.equal(credentials.lastError, CREDIT_MESSAGE);

  const response = handleNoCredentials(credentials, null, "claude", MODEL, null, null);
  const json = (await response.json()) as ApiErrorJson;
  assert.equal(response.status, 400);
  assert.match(json.error?.message ?? "", /credit balance is too low/i);
  assert.match(json.error?.message ?? "", /reset after/i);
  assert.notEqual(json.error?.code, "model_cooldown");
});

test("a model-only cooldown from a 429 keeps the existing model_cooldown answer byte-for-byte", async () => {
  const conn = await seedClaude("claude-20969-rate-limited");
  fallback.lockModel("claude", conn.id, MODEL, "quota_exhausted", 120_000, {
    lastError: "rate limit exceeded, please slow down",
    errorCode: 429,
  });
  const withMetadata = await auth.getProviderCredentials("claude", null, null, MODEL);
  assert.equal(withMetadata.allRateLimited, true);
  assert.equal(withMetadata.cooldownScope, "model");
  assert.equal(withMetadata.lastErrorCode, 429);

  // Same lock without metadata = the pre-#20969 shape. Pin the retry timing so the only
  // possible difference is the new upstream diagnostics.
  fallback.clearAllModelLockouts();
  fallback.lockModel("claude", conn.id, MODEL, "quota_exhausted", 120_000);
  const legacy = await auth.getProviderCredentials("claude", null, null, MODEL);
  assert.equal(legacy.allRateLimited, true);
  assert.equal(legacy.lastErrorCode, 429);
  assert.equal(legacy.lastError, null);

  const pinned = {
    ...legacy,
    retryAfter: withMetadata.retryAfter,
    retryAfterHuman: withMetadata.retryAfterHuman,
  };
  const current = handleNoCredentials(withMetadata, null, "claude", MODEL, null, null);
  const expected = handleNoCredentials(pinned, null, "claude", MODEL, null, null);
  assert.equal(current.status, 429);
  assert.equal(current.status, expected.status);
  assert.equal(await current.text(), await expected.text());
  assert.deepEqual(
    Object.fromEntries(current.headers.entries()),
    Object.fromEntries(expected.headers.entries())
  );
});

test("a prior attempt's 429 does not replace a model-scoped 400 lock's status and message", async () => {
  const conn = await seedClaude("claude-20969-prior-429");
  fallback.lockModel("claude", conn.id, MODEL, "quota_exhausted", 120_000, {
    lastError: CREDIT_MESSAGE,
    errorCode: 400,
  });
  const credentials = await auth.getProviderCredentials("claude", null, null, MODEL);
  assert.equal(credentials.cooldownScope, "model");

  const response = handleNoCredentials(
    credentials,
    null,
    "claude",
    MODEL,
    "rate limit exceeded, please slow down",
    429
  );
  const json = (await response.json()) as ApiErrorJson;
  assert.equal(response.status, 400);
  assert.match(json.error?.message ?? "", /credit balance is too low/i);
  assert.notEqual(json.error?.code, "model_cooldown");
});

test("a model-only cooldown from a 402 credit lock echoes that status and message", async () => {
  const conn = await seedClaude("claude-20969-402");
  fallback.lockModel("claude", conn.id, MODEL, "quota_exhausted", 120_000, {
    lastError: CREDIT_MESSAGE,
    errorCode: 402,
  });
  const credentials = await auth.getProviderCredentials("claude", null, null, MODEL);
  assert.equal(credentials.lastErrorCode, 402);
  assert.equal(credentials.lastError, CREDIT_MESSAGE);

  const response = handleNoCredentials(credentials, null, "claude", MODEL, null, null);
  assert.equal(response.status, 402);
  const json = (await response.json()) as ApiErrorJson;
  assert.match(json.error?.message ?? "", /credit balance is too low/i);
});

// A local cooldown answer must never read as "your OmniRoute key was rejected" (401/403) or as a
// provider outage the lock never saw (5xx): only 400/402 are echoed, every other status stays the
// byte-identical 429 model_cooldown answer and drops the upstream message.
for (const upstreamStatus of [401, 403, 500, 503]) {
  test(`a model lock from an upstream ${upstreamStatus} still answers 429 model_cooldown`, async () => {
    const conn = await seedClaude(`claude-20969-clamp-${upstreamStatus}`);
    fallback.lockModel("claude", conn.id, MODEL, "quota_exhausted", 120_000, {
      lastError: "upstream said: invalid api key for the provider account",
      errorCode: upstreamStatus,
    });
    const credentials = await auth.getProviderCredentials("claude", null, null, MODEL);
    assert.equal(credentials.allRateLimited, true);
    assert.equal(credentials.cooldownScope, "model");
    assert.equal(credentials.lastErrorCode, 429);
    assert.equal(credentials.lastError, null);

    const response = handleNoCredentials(credentials, null, "claude", MODEL, null, null);
    assert.equal(response.status, 429);
    const text = await response.text();
    assert.doesNotMatch(text, /invalid api key/i);
    assert.equal((JSON.parse(text) as ApiErrorJson).error?.code, "model_cooldown");

    // An earlier attempt's own status must not be hidden by, nor replaced with, the lock status.
    const afterAttempt = handleNoCredentials(credentials, null, "claude", MODEL, "boom", 503);
    assert.equal(afterAttempt.status, 503);
  });
}

// The 400/402 answer carries no X-OmniRoute-Local-Cooldown header (that header marks only the
// 429 model_cooldown answer). A combo must still advance to its next target on it, and must not
// mark the first target's provider as exhausted for the whole request.
for (const upstreamStatus of [400, 402]) {
  test(`a combo advances past a ${upstreamStatus} model-cooldown answer to the next target`, async () => {
    const conn = await seedClaude(`claude-20969-combo-${upstreamStatus}`);
    fallback.lockModel("claude", conn.id, MODEL, "quota_exhausted", 120_000, {
      lastError: CREDIT_MESSAGE,
      errorCode: upstreamStatus,
    });
    const credentials = await auth.getProviderCredentials("claude", null, null, MODEL);
    const cooldownAnswer = handleNoCredentials(credentials, null, "claude", MODEL, null, null);
    assert.equal(cooldownAnswer.status, upstreamStatus);
    assert.equal(cooldownAnswer.headers.get(LOCAL_MODEL_COOLDOWN_HEADER), null);
    // Drop the lock so the combo's pre-dispatch lock skip does not bypass the first target: the
    // answer above is what the target returns, and the combo must classify it on its own.
    fallback.clearAllModelLockouts();

    const combo = {
      name: `combo-20969-${upstreamStatus}`,
      strategy: "priority",
      config: { maxRetries: 0 },
      models: [
        {
          kind: "model",
          provider: "claude",
          providerId: "claude",
          model: MODEL,
          connectionId: conn.id,
          id: `20969-${upstreamStatus}-0`,
        },
        {
          kind: "model",
          provider: "codex",
          providerId: "codex",
          model: "m-next",
          connectionId: "conn-next",
          id: `20969-${upstreamStatus}-1`,
        },
      ],
    };
    const calls: string[] = [];
    const log = { info() {}, warn() {}, debug() {}, error() {} };
    const result = await handleComboChat({
      body: { model: combo.name, messages: [{ role: "user", content: "hi" }], stream: false },
      combo,
      allCombos: [combo],
      isModelAvailable: async () => true,
      relayOptions: undefined,
      signal: undefined,
      settings: {},
      log,
      handleSingleModel: async (_b: unknown, modelStr: string) => {
        calls.push(modelStr);
        if (calls.length === 1) return cooldownAnswer.clone();
        return Response.json({ choices: [{ message: { role: "assistant", content: "next" } }] });
      },
    });

    assert.equal(calls.length, 2, `expected both targets to be tried, got ${calls.join(",")}`);
    assert.equal(result.status, 200);
  });
}
