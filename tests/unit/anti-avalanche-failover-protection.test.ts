import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The markAccountUnavailable tests below create provider connections: keep them off the real
// home database.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-anti-avalanche-"));
const previousDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
import {
  applyAvalancheSuppressionHeaders,
  evaluateAvalancheRisk,
  formatAntiAvalancheMessage,
  resolveAvalancheSettings,
  DEFAULT_AVALANCHE_BURST_COOLDOWN_MS,
} from "../../open-sse/services/accountFallback/antiAvalanche.ts";
import {
  incrementTokenUsage,
  resetCounters,
} from "../../open-sse/services/geminiRateLimitTracker.ts";

// The guard is opt-in: every test below exercises the enabled guard unless it says otherwise.
const ENABLE_ENV = "OMNIROUTE_AVALANCHE_PROTECTION_ENABLED";
const previousEnabled = process.env[ENABLE_ENV];

test.beforeEach(() => {
  process.env[ENABLE_ENV] = "true";
});

const OPENAI_TPM_ERROR =
  "Rate limit reached for model gpt-4o on tokens per minute (TPM): Limit 30000, Requested 45000.";

test("Anti-Avalanche: the guard is OFF unless the env var is exactly true", () => {
  for (const value of [undefined, "", "false", "0", "1", "yes", "TRUE"]) {
    if (value === undefined) delete process.env[ENABLE_ENV];
    else process.env[ENABLE_ENV] = value;

    assert.equal(resolveAvalancheSettings().enabled, false, String(value));
    const result = evaluateAvalancheRisk({
      status: 429,
      errorText: OPENAI_TPM_ERROR,
      provider: "openai",
      model: "gpt-4o",
      promptTokens: 150000,
    });
    assert.equal(result.isAvalancheRisk, false, String(value));
    assert.equal(result.shouldSuppressFallback, false, String(value));
    assert.equal(result.suggestedCooldownMs, 0, String(value));
  }

  process.env[ENABLE_ENV] = "true";
  assert.equal(resolveAvalancheSettings().enabled, true);
});

test("Anti-Avalanche: small payload without explicit token metric does not suppress fallback", () => {
  const result = evaluateAvalancheRisk({
    status: 429,
    errorText: "Rate limit exceeded. Please try again later.",
    provider: "gemini",
    model: "gemini-3.8-flash",
    promptTokens: 1200,
  });

  assert.equal(result.isAvalancheRisk, false);
  assert.equal(result.shouldSuppressFallback, false);
  assert.equal(result.suggestedCooldownMs, 0);
});

test("Anti-Avalanche: explicit Gemini TPM metric in error text triggers immediate suppression (0 retries)", () => {
  const tpmError =
    "Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 16000";
  const result = evaluateAvalancheRisk({
    status: 429,
    errorText: tpmError,
    provider: "gemini",
    model: "gemini-3.8-flash",
    promptTokens: 25000,
  });

  assert.equal(result.isAvalancheRisk, true);
  assert.equal(result.reason, "explicit_tpm_limit");
  assert.equal(result.shouldSuppressFallback, true);
  assert.equal(result.suggestedCooldownMs, DEFAULT_AVALANCHE_BURST_COOLDOWN_MS);
  assert.match(result.explanation || "", /Token rate limit/);
});

test("Anti-Avalanche: OpenAI-style tokens per minute 429 triggers immediate suppression", () => {
  const openaiTpmError =
    "Rate limit reached for model gpt-4o on tokens per minute (TPM): Limit 30000, Requested 45000.";
  const result = evaluateAvalancheRisk({
    status: 429,
    errorText: openaiTpmError,
    provider: "openai",
    model: "gpt-4o",
    promptTokens: 45000,
  });

  assert.equal(result.isAvalancheRisk, true);
  assert.equal(result.reason, "explicit_tpm_limit");
  assert.equal(result.shouldSuppressFallback, true);
});

test("Anti-Avalanche: a quota-exhausted 429 keeps failing over however large the prompt is", () => {
  // The incident prompt size (115,618 tokens) and the former 50k-100k band: payload size alone
  // says nothing about the sibling accounts, whose quota may be intact.
  for (const errorText of [
    "Resource has been exhausted (e.g. check quota).",
    "You exceeded your current quota, please check your plan and billing details.",
    "Too Many Requests",
  ]) {
    for (const promptTokens of [115618, 60000]) {
      const result = evaluateAvalancheRisk({
        status: 429,
        errorText,
        provider: "gemini",
        model: "gemini-3.8-flash",
        promptTokens,
      });
      assert.equal(result.isAvalancheRisk, false, errorText);
      assert.equal(result.shouldSuppressFallback, false, errorText);
      assert.equal(result.suggestedCooldownMs, 0, errorText);
    }
  }
});

test("Anti-Avalanche: token wording on a daily/plan quota is not a TPM marker", () => {
  const cases: Array<[string | null, string]> = [
    [
      "openai",
      '{"error":{"code":"rate_limit_exceeded","message":"Rate limit reached for gpt-4o on tokens per day (TPD): Limit 200000, Used 199000, Requested 45000."}}',
    ],
    ["openai", "Monthly token limit reached"],
    ["openai", "Token limit reached for your plan"],
    ["openai", "Your input tokens exceeded the monthly allowance"],
    ["openai", "Usage limit exceeded: token rate limit for your plan"],
    [
      "gemini",
      "Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, quotaId: GenerateContentInputTokensPerModelPerDay-FreeTier",
    ],
    [
      "gemini",
      "Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 15",
    ],
  ];

  for (const [provider, errorText] of cases) {
    const result = evaluateAvalancheRisk({
      status: 429,
      errorText,
      provider,
      model: "some-model",
      promptTokens: 115618,
    });
    assert.equal(result.isAvalancheRisk, false, errorText);
    assert.equal(result.shouldSuppressFallback, false, errorText);
  }
});

test("Anti-Avalanche: the local Gemini token counter is not a marker on the 429 itself", () => {
  // The counter is per model across every key, so it cannot tell this key's quota 429 apart
  // from a pool-wide TPM limit.
  resetCounters();
  incrementTokenUsage("gemini-2.5-flash", 250001);
  try {
    const result = evaluateAvalancheRisk({
      status: 429,
      errorText: "Resource has been exhausted (e.g. check quota).",
      provider: "gemini",
      model: "gemini-2.5-flash",
      promptTokens: 115618,
    });
    assert.equal(result.isAvalancheRisk, false);
    assert.equal(result.shouldSuppressFallback, false);
  } finally {
    resetCounters();
  }
});

test("Anti-Avalanche: HTTP 413 Payload Too Large keeps the #13350 fallback contract (not suppressed)", () => {
  // accountFallback.ts classifies 413 PAYLOAD_TOO_LARGE as a retryable fallback (#13350):
  // another account/provider may accept the payload, so the guard must not suppress it.
  const result = evaluateAvalancheRisk({
    status: 413,
    errorText: "Request entity too large",
    provider: "anthropic",
    model: "claude-3-5-sonnet",
    promptTokens: 180000,
  });

  assert.equal(result.isAvalancheRisk, false);
  assert.equal(result.shouldSuppressFallback, false);
  assert.equal(result.suggestedCooldownMs, 0);
});

test("Anti-Avalanche: generic token_count / token-quota wording on a 429 is not an explicit TPM limit", () => {
  for (const errorText of [
    "Invalid request: token_count field is required",
    "You exceeded your current token quota, please check your plan and billing details.",
  ]) {
    const result = evaluateAvalancheRisk({
      status: 429,
      errorText,
      provider: "openai",
      model: "gpt-4o",
      promptTokens: 1200,
    });
    assert.equal(result.isAvalancheRisk, false, errorText);
    assert.equal(result.shouldSuppressFallback, false, errorText);
  }
});

test("Anti-Avalanche: HTTP 400 context length overflow suppresses failover immediately", () => {
  const result = evaluateAvalancheRisk({
    status: 400,
    errorText:
      "InvalidRequestError: This model's maximum context length is 32768 tokens. However, your messages resulted in 35000 tokens.",
    provider: "openai",
    model: "gpt-4",
    promptTokens: 35000,
  });

  assert.equal(result.isAvalancheRisk, true);
  assert.equal(result.reason, "context_length_exceeded");
  assert.equal(result.shouldSuppressFallback, true);
});

test("Anti-Avalanche: disabled via OMNIROUTE_AVALANCHE_PROTECTION_ENABLED bypasses protection", () => {
  process.env[ENABLE_ENV] = "false";
  const result = evaluateAvalancheRisk({
    status: 429,
    errorText: "generate_content_free_tier_input_token_count",
    provider: "gemini",
    model: "gemini-3.8-flash",
    promptTokens: 115618,
  });

  assert.equal(result.isAvalancheRisk, false);
  assert.equal(result.shouldSuppressFallback, false);
});

test("Anti-Avalanche: formatAntiAvalancheMessage provides actionable guidance", () => {
  const msg = formatAntiAvalancheMessage(
    "gemini",
    "gemini-3.8-flash",
    115618,
    "explicit_tpm_limit",
    "RESOURCE_EXHAUSTED"
  );

  assert.match(msg, /Anti-Avalanche/);
  assert.match(msg, /115,618/);
  assert.match(msg, /agy\/\*/);
  assert.match(msg, /RESOURCE_EXHAUSTED/);
});

test("Anti-Avalanche: resolveAvalancheSettings respects the cooldown env", () => {
  const previous = process.env.OMNIROUTE_AVALANCHE_BURST_COOLDOWN_MS;
  process.env.OMNIROUTE_AVALANCHE_BURST_COOLDOWN_MS = "45000";
  try {
    const custom = resolveAvalancheSettings();
    assert.equal(custom.enabled, true);
    assert.equal(custom.burstCooldownMs, 45000);
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_AVALANCHE_BURST_COOLDOWN_MS;
    else process.env.OMNIROUTE_AVALANCHE_BURST_COOLDOWN_MS = previous;
  }
});

test("Anti-Avalanche: suppression headers are best-effort on an immutable response", () => {
  const mutable = new Response("x", { status: 429 });
  applyAvalancheSuppressionHeaders(mutable, "explicit_tpm_limit");
  assert.equal(mutable.headers.get("x-omniroute-anti-avalanche"), "suppressed");
  assert.equal(mutable.headers.get("x-omniroute-avalanche-reason"), "explicit_tpm_limit");

  // Response.error() has immutable headers: .set() throws a TypeError.
  const immutable = Response.error();
  assert.doesNotThrow(() => applyAvalancheSuppressionHeaders(immutable, "explicit_tpm_limit"));
  assert.doesNotThrow(() => applyAvalancheSuppressionHeaders(null, undefined));
});

test("Anti-Avalanche: markAccountUnavailable honors suppressFallback and bounds lockout cooldown", async () => {
  const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
  const providersDb = await import("../../src/lib/db/providers.ts");

  const conn = await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "Anti-Avalanche Test Key",
    apiKey: "test-gemini-key-avalanche",
  });
  const connId = (conn as { id: string }).id;

  const result = await markAccountUnavailable(
    connId,
    429,
    "Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 16000",
    "gemini",
    "gemini-3.8-flash",
    null,
    {
      isAvalancheRisk: true,
      avalancheCooldownMs: 60000,
      suppressFallback: true,
    }
  );

  assert.equal(result.shouldFallback, false, "suppressFallback must return shouldFallback: false");
  assert.equal(
    result.cooldownMs,
    60000,
    "cooldown must be bounded to 60000ms instead of escalating to 1800s"
  );
});

const GEMINI_TPM_ERROR =
  "Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 16000";
const AVALANCHE_OPTIONS = {
  isAvalancheRisk: true,
  avalancheCooldownMs: 60000,
  suppressFallback: true,
};
const ONE_HOUR_MS = 3600 * 1000;
// Retry-After is parsed against the wall clock, so the hint can read slightly under the hour.
const CLOCK_TOLERANCE_MS = 5000;

async function createKey(provider: string, name: string) {
  const providersDb = await import("../../src/lib/db/providers.ts");
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `test-${name}`,
  });
  return (conn as { id: string }).id;
}

test("Anti-Avalanche: a longer upstream reset beats the burst cooldown on the model lockout", async () => {
  const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
  const { getModelLockoutInfo } = await import("../../open-sse/services/accountFallback.ts");
  const connId = await createKey("gemini", "avalanche-long-reset");

  const result = await markAccountUnavailable(
    connId,
    429,
    GEMINI_TPM_ERROR,
    "gemini",
    "gemini-3.8-flash",
    null,
    { ...AVALANCHE_OPTIONS, headers: new Headers({ "retry-after": "3600" }) }
  );

  assert.equal(result.shouldFallback, false);
  assert.ok(result.cooldownMs > ONE_HOUR_MS - CLOCK_TOLERANCE_MS, String(result.cooldownMs));
  const lock = getModelLockoutInfo("gemini", connId, "gemini-3.8-flash");
  assert.ok(lock && lock.remainingMs > ONE_HOUR_MS - CLOCK_TOLERANCE_MS, JSON.stringify(lock));
});

test("Anti-Avalanche: a shorter upstream reset keeps the burst cooldown", async () => {
  const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
  const connId = await createKey("gemini", "avalanche-short-reset");

  const result = await markAccountUnavailable(
    connId,
    429,
    GEMINI_TPM_ERROR,
    "gemini",
    "gemini-3.8-flash",
    null,
    { ...AVALANCHE_OPTIONS, headers: new Headers({ "retry-after": "10" }) }
  );

  assert.equal(result.shouldFallback, false);
  assert.equal(result.cooldownMs, 60000);
});

test("Anti-Avalanche: a connection-scoped 429 still records the longer upstream reset", async () => {
  const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
  const { getModelLockoutInfo } = await import("../../open-sse/services/accountFallback.ts");
  const connId = await createKey("openai", "avalanche-connection-reset");

  const result = await markAccountUnavailable(
    connId,
    429,
    OPENAI_TPM_ERROR,
    "openai",
    "gpt-4o",
    null,
    { ...AVALANCHE_OPTIONS, headers: new Headers({ "retry-after": "3600" }) }
  );

  assert.equal(result.shouldFallback, false);
  assert.ok(result.cooldownMs > ONE_HOUR_MS - CLOCK_TOLERANCE_MS, String(result.cooldownMs));
  const lock = getModelLockoutInfo("openai", connId, "gpt-4o");
  assert.ok(lock && lock.remainingMs > ONE_HOUR_MS - CLOCK_TOLERANCE_MS, JSON.stringify(lock));
});

test("Anti-Avalanche: a connection-scoped 429 without a hint applies the burst cooldown", async () => {
  const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
  const { getModelLockoutInfo } = await import("../../open-sse/services/accountFallback.ts");
  const connId = await createKey("openai", "avalanche-connection-no-hint");

  const result = await markAccountUnavailable(
    connId,
    429,
    OPENAI_TPM_ERROR,
    "openai",
    "gpt-4o",
    null,
    AVALANCHE_OPTIONS
  );

  assert.equal(result.shouldFallback, false);
  assert.equal(result.cooldownMs, 60000);
  const lock = getModelLockoutInfo("openai", connId, "gpt-4o");
  assert.ok(lock && lock.remainingMs > 0 && lock.remainingMs <= 60000, JSON.stringify(lock));
});

test("Anti-Avalanche: normal 429 without suppressFallback still allows fallback", async () => {
  const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
  const providersDb = await import("../../src/lib/db/providers.ts");

  const conn = await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "Normal Fallback Test Key",
    apiKey: "test-gemini-key-normal",
  });
  const connId = (conn as { id: string }).id;

  const result = await markAccountUnavailable(
    connId,
    429,
    "Rate limit exceeded (generic RPM)",
    "gemini",
    "gemini-3.8-flash"
  );

  assert.equal(result.shouldFallback, true, "normal 429 must allow fallback across accounts");
});

test.after(async () => {
  if (previousEnabled === undefined) delete process.env[ENABLE_ENV];
  else process.env[ENABLE_ENV] = previousEnabled;
  const core = await import("../../src/lib/db/core.ts");
  core.resetDbInstance();
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
