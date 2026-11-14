import assert from "node:assert/strict";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("account-fallback-telemetry");
const {
  apiKeysDb,
  buildOpenAIResponse,
  buildRequest,
  handleChat,
  resetStorage,
  seedApiKey,
  seedConnection,
  settingsDb,
} = harness;
const { withSelectedConnectionHeader } = await import("../../src/sse/handlers/chatHelpers.ts");

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("telemetry headers are bounded and never echo untrusted errors", () => {
  const response = withSelectedConnectionHeader(new Response("ok"), "id", {
    accountFallbacks: 2,
    accountFallbackReasons: ["http_401", "secret:token", "stream_readiness"],
    sameAccountRetries: 1,
    routingWaitMs: 175,
  });
  assert.equal(response.headers.get("X-OmniRoute-Account-Fallbacks"), "2");
  assert.equal(
    response.headers.get("X-OmniRoute-Account-Fallback-Reasons"),
    "http_401,stream_readiness"
  );
  assert.equal(response.headers.get("X-OmniRoute-Same-Account-Retries"), "1");
  assert.equal(response.headers.get("X-OmniRoute-Routing-Wait-Ms"), "175");
  assert.equal(response.headers.get("X-OmniRoute-Selected-Connection-Plan"), null);
});

test("immutable response clone retains trusted response policies alongside telemetry", async () => {
  const { markProviderProbeResponse, isProviderProbeResponse } =
    await import("../../src/shared/utils/providerProbeResult.ts");
  const original = Response.redirect("https://example.invalid/probe", 302);
  markProviderProbeResponse(original);
  const wrapped = withSelectedConnectionHeader(original, "id", {
    accountFallbacks: 1,
    accountFallbackReasons: ["http_503"],
  });
  assert.notEqual(wrapped, original);
  assert.equal(isProviderProbeResponse(wrapped), true);
  assert.equal(wrapped.headers.get("X-OmniRoute-Account-Fallbacks"), "1");
  assert.equal(wrapped.headers.get("X-OmniRoute-Account-Fallback-Reasons"), "http_503");
});

test("account rotation is exposed through bounded routing telemetry headers", async () => {
  const first = await seedConnection("openai", {
    name: "openai-fallback-primary",
    apiKey: "sk-account-fallback-first",
    priority: 1,
  });
  const second = await seedConnection("openai", {
    name: "openai-fallback-secondary",
    apiKey: "sk-account-fallback-second",
    priority: 2,
  });
  assert.notEqual(first.id, second.id, "fixture must create two distinct connections");

  const attempts: string[] = [];
  let failedAuthorization: string | null = null;
  globalThis.fetch = async (input, init) => {
    const request = input instanceof Request ? input : new Request(input, init);
    const authorization = request.headers.get("authorization") || "";
    attempts.push(authorization);
    failedAuthorization ??= authorization;

    // An upstream executor can retry the same URL/account on HTTP 429.
    // Keep that account rate-limited through those transport retries; only a
    // genuinely different connection is allowed to return a 200.
    if (authorization === failedAuthorization) {
      return new Response(
        JSON.stringify({
          error: {
            message: "Rate limit exceeded",
            type: "rate_limit_error",
            code: "rate_limit_exceeded",
          },
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    return buildOpenAIResponse("healthy sibling", "gpt-4o-mini");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "hello" }],
      },
    })
  );

  assert.equal(response.status, 200);
  assert.ok(attempts.length >= 2, "expected an upstream error before the healthy sibling");
  assert.equal(new Set(attempts).size, 2, "fallback must use exactly one distinct sibling");
  assert.notEqual(attempts.at(-1), attempts[0], "fallback must switch connections");
  const servingConnection = attempts.at(-1)?.includes("sk-account-fallback-first") ? first : second;
  assert.equal(response.headers.get("X-OmniRoute-Selected-Connection-Id"), servingConnection.id);
  assert.equal(response.headers.get("X-OmniRoute-Account-Fallbacks"), "1");
  assert.equal(response.headers.get("X-OmniRoute-Account-Fallback-Reasons"), "http_429");
  assert.equal(response.headers.get("X-OmniRoute-Same-Account-Retries"), null);
  assert.equal(response.headers.get("X-OmniRoute-Routing-Wait-Ms"), null);

});

test("a failed account without an eligible sibling does not claim a completed fallback", async () => {
  await seedConnection("openai", { apiKey: "sk-only-account", priority: 1 });
  globalThis.fetch = async () =>
    new Response(JSON.stringify({
      error: { message: "Invalid API key", type: "invalid_request_error", code: "invalid_api_key" },
    }), { status: 401, headers: { "Content-Type": "application/json" } });

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "hello" }],
      },
    })
  );
  assert.equal(response.headers.get("X-OmniRoute-Account-Fallbacks"), null);
  assert.equal(response.headers.get("X-OmniRoute-Account-Fallback-Reasons"), null);
});

test("completed empty-content sibling rotation uses its own allowlisted reason", () => {
  const response = withSelectedConnectionHeader(new Response("ok"), "safe-id", {
    accountFallbacks: 1,
    accountFallbackReasons: ["empty_content_sibling"],
    sameAccountRetries: 0,
  });
  assert.equal(
    response.headers.get("X-OmniRoute-Account-Fallback-Reasons"),
    "empty_content_sibling"
  );
  assert.equal(response.headers.get("X-OmniRoute-Same-Account-Retries"), null);
});

test("preferred response-start timeout records a real sibling hop in routing telemetry", async () => {
  const slow = await seedConnection("openai", {
    name: "preferred-slow",
    apiKey: "sk-preferred-slow",
    priority: 1,
  });
  const sibling = await seedConnection("openai", {
    name: "preferred-healthy",
    apiKey: "sk-preferred-healthy",
    priority: 2,
  });
  const key = await seedApiKey();
  await apiKeysDb.updateApiKeyPermissions(key.id, {
    allowedConnections: [slow.id, sibling.id],
    preferredConnections: [slow.id, sibling.id],
  });
  await settingsDb.updateSettings({
    resilienceSettings: {
      preferredAccountFailover: {
        enabled: true,
        defaultTimeoutMs: 500,
        providerTimeoutsMs: {},
        modelTimeoutsMs: {},
      },
    },
  });

  const attemptedAccounts: string[] = [];
  globalThis.fetch = async (input, init) => {
    const request = input instanceof Request ? input : new Request(input, init);
    const authorization = request.headers.get("authorization") ?? "";
    attemptedAccounts.push(authorization);
    if (authorization.includes("sk-preferred-slow")) {
      // Finish after the 500ms preferred response-start deadline; a sibling
      // must answer first, without marking the slow account as globally dead.
      await new Promise((resolve) => setTimeout(resolve, 1_500));
      return buildOpenAIResponse("late primary", "gpt-4o-mini");
    }
    return buildOpenAIResponse("healthy sibling", "gpt-4o-mini");
  };

  const response = await handleChat(
    buildRequest({
      authKey: key.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "hello" }],
      },
    })
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("X-OmniRoute-Selected-Connection-Id"), sibling.id);
  assert.equal(response.headers.get("X-OmniRoute-Account-Fallbacks"), "1");
  assert.equal(
    response.headers.get("X-OmniRoute-Account-Fallback-Reasons"),
    "pre_response_timeout"
  );
  assert.ok(attemptedAccounts.some((value) => value.includes("sk-preferred-slow")));
  assert.ok(attemptedAccounts.some((value) => value.includes("sk-preferred-healthy")));
});
