// A Claude 429 that rejects only an overage claim (Fable) must stay model scoped when the usage
// cache is cold. The proof is in the raw upstream headers. handleChat and the combo only hold the
// sanitized client response, which carries none of them. They must read `result.upstreamHeaders`
// for the Claude quota-scope decision, and for nothing else: retry-hint cooldowns keep reading the
// sanitized headers.
import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("claude-fable-raw-headers");
const { BaseExecutor, buildOpenAIResponse, buildRequest, combosDb, handleChat } = harness;
const { resetStorage, seedConnection } = harness;
const providersDb = await import("../../src/lib/db/providers.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { applyComboTargetExhaustion } =
  await import("../../open-sse/services/combo/targetExhaustion.ts");
const { recordClaudeScopeHeaders } = await import("../../open-sse/services/claudeScopeHeaders.ts");

const FABLE = "claude-fable-5-1";
const OPUS = "claude-opus-5-5";
const QUOTA_TEXT = "This request would exceed your account's rate limit. Please try again later.";
const P = "anthropic-ratelimit-unified-";
const FABLE_ONLY = {
  [`${P}status`]: "rejected",
  [`${P}7d-status`]: "allowed",
  [`${P}representative-claim`]: "seven_day_overage",
};
const originalFetch = globalThis.fetch;
const originalDelay = BaseExecutor.RETRY_CONFIG.delayMs;

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  fallback.clearAllModelLockouts();
  quotaCache.__clearForTests();
  await resetStorage();
});
test.after(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = originalDelay;
  globalThis.fetch = originalFetch;
  await resetStorage();
});

function stubClaude429(headers: Record<string, string>) {
  globalThis.fetch = async (url) => {
    if (new URL(String(url)).hostname === "api.openai.com") {
      return buildOpenAIResponse("served by the second target");
    }
    return Response.json(
      { type: "error", error: { type: "rate_limit_error", message: QUOTA_TEXT } },
      { status: 429, headers }
    );
  };
}

async function assertOnlyFableLocked(connectionId: string) {
  const row = await providersDb.getProviderConnectionById(connectionId);
  assert.notEqual(row.testStatus, "unavailable");
  assert.equal(row.rateLimitedUntil ?? null, null);
  assert.equal(fallback.isModelLocked("claude", connectionId, FABLE), true);
  assert.equal(fallback.isModelLocked("claude", connectionId, OPUS), false);
}

for (const stream of [false, true]) {
  test(`handleChat reads the raw upstream headers: Fable-only 429 locks only Fable (stream=${stream})`, async () => {
    const connection = await seedConnection("claude", { apiKey: "sk-test-fable-single" });
    stubClaude429(FABLE_ONLY);
    const res = await handleChat(
      buildRequest({
        body: { model: `claude/${FABLE}`, stream, messages: [{ role: "user", content: "q" }] },
      })
    );
    assert.equal(res.status, 429);
    // The raw upstream headers must not reach the client.
    assert.equal(res.headers.get(`${P}status`), null);
    await assertOnlyFableLocked(connection.id);
  });

  test(`combo reads the raw upstream headers: Fable-only 429 locks only Fable (stream=${stream})`, async () => {
    const connection = await seedConnection("claude", { apiKey: "sk-test-fable-combo" });
    await seedConnection("openai", { apiKey: "sk-test-fable-combo-openai" });
    await combosDb.createCombo({
      name: `fable-raw-${stream}`,
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0 },
      models: [`claude/${FABLE}`, "openai/gpt-4.1"],
    });
    stubClaude429(FABLE_ONLY);
    const res = await handleChat(
      buildRequest({
        body: { model: `fable-raw-${stream}`, stream, messages: [{ role: "user", content: "q" }] },
      })
    );
    assert.equal(res.status, 200);
    assert.equal(res.headers.get(`${P}status`), null);
    await assertOnlyFableLocked(connection.id);
  });
}

test("control: a real 5h wall in the raw headers still parks the whole account", async () => {
  const connection = await seedConnection("claude", { apiKey: "sk-test-fable-wall" });
  stubClaude429({
    [`${P}status`]: "rejected",
    [`${P}7d-status`]: "allowed",
    [`${P}5h-status`]: "rejected",
    [`${P}representative-claim`]: "five_hour",
  });
  const res = await handleChat(
    buildRequest({
      body: { model: `claude/${FABLE}`, stream: false, messages: [{ role: "user", content: "q" }] },
    })
  );
  assert.equal(res.status, 429);
  assert.equal(fallback.isModelLocked("claude", connection.id, OPUS), false);
  const row = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(row.testStatus, "unavailable");
});

// Retry-hint cooldowns. `x-ratelimit-reset` is a retry hint that the sanitized response never
// carries. If the raw headers reached the retry-hint code, the cooldown would follow this hour.
const RAW_HINT = () => ({
  "x-ratelimit-reset": String(Math.floor(Date.now() / 1000) + 3600),
  "retry-after": "3600",
});

const RAW_HINT_RESET_ONLY = () => ({
  "x-ratelimit-reset": String(Math.floor(Date.now() / 1000) + 3600),
});

for (const provider of ["claude", "openai", "gemini"]) {
  test(`raw upstream headers never change the retry-hint cooldown (${provider})`, async () => {
    const profile = { ...fallback.getProviderProfile(provider), useUpstreamRetryHints: true };
    // Reset storage before each run: the harness reuses one connection per provider and the
    // backoff level grows with every failure recorded on it.
    const run = async (opts: Record<string, unknown>) => {
      await resetStorage();
      fallback.clearAllModelLockouts();
      const connection = await seedConnection(provider, { apiKey: `sk-hint-${provider}` });
      const out = await auth.markAccountUnavailable(
        connection.id,
        429,
        "Too many requests, slow down",
        provider,
        "some-model",
        profile,
        opts
      );
      return out.cooldownMs;
    };
    const without = await run({ headers: new Headers() });
    const withRaw = await run({
      headers: new Headers(),
      quotaScopeHeaders: new Headers(RAW_HINT()),
    });
    assert.equal(withRaw, without, "raw upstream headers must not move the cooldown");
    // Control: the same hint passed as the retry-hint `headers` does move it.
    const asHint = await run({ headers: new Headers(RAW_HINT()) });
    assert.notEqual(asHint, without, "the control must be able to see a hint");
  });
}

test("combo target cooldown ignores the raw upstream headers (non-Claude and Claude)", () => {
  const sets = () => ({
    exhaustedProviders: new Set<string>(),
    exhaustedConnections: new Set<string>(),
    transientRateLimitedProviders: new Set<string>(),
  });
  const log = { info() {}, warn() {}, error() {}, debug() {} };
  const derive = (provider: string, raw: Headers | null, text: string) => {
    const result = new Response("{}", { status: 429 });
    if (raw) recordClaudeScopeHeaders(result, raw);
    const out = applyComboTargetExhaustion(
      {
        kind: "model",
        executionKey: "ek",
        modelStr: `${provider}/m`,
        provider,
        providerId: null,
        connectionId: "conn-x",
      } as Parameters<typeof applyComboTargetExhaustion>[0],
      {
        result,
        fallbackResult: { cooldownMs: 7000 },
        errorText: text,
        rawModel: "m",
        isTokenLimitBreach: false,
        allAccountsRateLimited: false,
        requestScopedFailure: false,
        sets: sets(),
        log,
        tag: "COMBO",
        exhaustedLogLevel: "info",
      }
    );
    return [out.effectiveTargetCooldownMs, out.lockoutHintMs, out.isModelScopedClaudeQuota];
  };
  for (const [provider, text] of [
    ["openai", "slow down"],
    ["claude", "overloaded"],
  ]) {
    assert.deepEqual(derive(provider, new Headers(RAW_HINT()), text), derive(provider, null, text));
  }
  // The decision itself does read them: an overage-only rejection becomes model scoped.
  assert.equal(derive("claude", new Headers(FABLE_ONLY), QUOTA_TEXT)[2], true);
  assert.equal(derive("claude", null, QUOTA_TEXT)[2], false);
});

// End to end: a raw `x-ratelimit-reset` of one hour never reaches the retry-hint code. The sanitized
// response keeps only what the upstream error parser read, so the connection cooldown stays short.
for (const viaCombo of [false, true]) {
  test(`handleChat keeps the retry-hint cooldown off the raw headers (combo=${viaCombo})`, async () => {
    const connection = await seedConnection("openai", { apiKey: "sk-test-hint-e2e" });
    await seedConnection("gemini", { apiKey: "sk-test-hint-e2e-gemini" });
    await combosDb.createCombo({
      name: "hint-e2e",
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0 },
      models: ["openai/gpt-4.1", "gemini/gemini-2.5-flash"],
    });
    globalThis.fetch = async (url) => {
      if (new URL(String(url)).hostname.includes("openai")) {
        return Response.json(
          { error: { message: "Too many requests, slow down", type: "rate_limit" } },
          { status: 429, headers: RAW_HINT_RESET_ONLY() }
        );
      }
      return buildOpenAIResponse("served by the second target");
    };
    await handleChat(
      buildRequest({
        body: {
          model: viaCombo ? "hint-e2e" : "openai/gpt-4.1",
          stream: false,
          messages: [{ role: "user", content: "q" }],
        },
      })
    );
    const row = await providersDb.getProviderConnectionById(connection.id);
    const until = row.rateLimitedUntil ? new Date(row.rateLimitedUntil).getTime() - Date.now() : 0;
    assert.ok(until < 60_000, `cooldown ${until} ms must not follow the raw one-hour reset`);
  });
}
