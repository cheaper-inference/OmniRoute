import test from "node:test";
import assert from "node:assert/strict";

// Kiro API-key validator cases (#16497): the key is proven on the Amazon Q model catalog of the
// connection's region before profile lookup. Moved out of the frozen
// provider-validation-specialty.test.ts so that file does not grow.
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function toPlainHeaders(headers: HeadersInit | undefined) {
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers || {}).map(([key, value]) => [key, String(value)])
  );
}

test("Kiro API key validator resolves profiles with bearer auth", async () => {
  const calls: Array<{ url: string; headers: Record<string, string> }> = [];
  globalThis.fetch = async (url, init = {}) => {
    const headers = toPlainHeaders(init.headers);
    calls.push({ url: String(url), headers });

    // Step 1: the key is proven on the Amazon Q model catalog of the connection's region.
    if (calls.length === 1) {
      assert.equal(
        String(url),
        "https://q.us-east-1.amazonaws.com/ListAvailableModels?origin=AI_EDITOR"
      );
      return new Response(JSON.stringify({ models: [] }), { status: 200 });
    }

    assert.equal(String(url), "https://codewhisperer.us-east-1.amazonaws.com");
    assert.equal(headers.Authorization, "Bearer ksk-valid");
    assert.equal(headers["x-amz-target"], "AmazonCodeWhispererService.ListAvailableProfiles");
    assert.equal(headers.Accept, "application/json");

    return new Response(
      JSON.stringify({
        profiles: [{ arn: "arn:aws:codewhisperer:us-east-1:123:profile/API" }],
      }),
      { status: 200 }
    );
  };

  const result = await validateProviderApiKey({
    provider: "kiro",
    apiKey: "ksk-valid",
    providerSpecificData: { region: "us-east-1" },
  });

  assert.equal(result.valid, true);
  assert.equal(result.error, null);
  assert.equal(result.method, "kiro_list_available_profiles");
  assert.equal(calls.length, 2);
});

test("Kiro API key validator accepts API keys that cannot list profiles", async () => {
  const calls: Array<{
    url: string;
    headers: Record<string, string>;
    body?: Record<string, unknown>;
  }> = [];
  globalThis.fetch = async () => new Response("unexpected", { status: 500 });

  globalThis.fetch = async (url, init = {}) => {
    const headers = toPlainHeaders(init.headers);
    const body = init.body ? JSON.parse(String(init.body)) : undefined;
    calls.push({ url: String(url), headers, body });

    if (calls.length === 1) {
      return new Response(JSON.stringify({ models: [] }), { status: 200 });
    }
    if (calls.length === 2) {
      return new Response(
        JSON.stringify({
          __type: "com.amazon.aws.codewhisperer#AccessDeniedException",
          message: "API key authentication is not supported for this operation.",
        }),
        { status: 403 }
      );
    }

    assert.equal(String(url), "https://q.us-east-1.amazonaws.com/generateAssistantResponse");
    assert.equal(headers.Authorization, "Bearer ksk-valid-without-profile-list");
    assert.equal(headers.tokentype, "API_KEY");
    assert.equal(
      headers["X-Amz-Target"] || headers["x-amz-target"],
      "AmazonCodeWhispererStreamingService.GenerateAssistantResponse"
    );
    assert.equal(body.conversationState.currentMessage.userInputMessage.modelId, "auto");
    assert.equal(body.inferenceConfig.maxTokens, 1);
    return new Response(new ReadableStream(), { status: 200 });
  };

  const result = await validateProviderApiKey({
    provider: "kiro",
    apiKey: "ksk-valid-without-profile-list",
    providerSpecificData: { region: "us-east-1" },
  });

  assert.equal(result.valid, true);
  assert.equal(result.error, null);
  assert.equal(result.method, "kiro_generate_assistant_response");
  assert.equal(calls.length, 3);
});

test("Kiro API key validator rejects runtime auth failures after profile lookup is unsupported", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    if (calls === 1) {
      return new Response(JSON.stringify({ models: [] }), { status: 200 });
    }
    if (calls === 2) {
      return new Response(
        JSON.stringify({
          __type: "com.amazon.aws.codewhisperer#AccessDeniedException",
          message: "API key authentication is not supported for this operation.",
        }),
        { status: 403 }
      );
    }
    return new Response(JSON.stringify({ message: "bearer token is invalid" }), { status: 403 });
  };

  const result = await validateProviderApiKey({
    provider: "kiro",
    apiKey: "ksk-runtime-invalid",
    providerSpecificData: { region: "us-east-1" },
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid Kiro API key or AWS region");
  assert.equal(calls, 3);
});

test("Kiro API key validator fails as invalid instead of unsupported", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ message: "Access denied" }), { status: 403 });

  const result = await validateProviderApiKey({
    provider: "kiro",
    apiKey: "ksk-invalid",
    providerSpecificData: { region: "us-east-1" },
  });

  assert.equal(result.valid, false);
  assert.equal(result.unsupported, false);
  // Rejected on the Amazon Q model catalog → the import/test reports an invalid key.
  assert.match(result.error || "", /Invalid Kiro API key/);
});
