/**
 * Kiro long-lived API keys authenticate only on the Amazon Q surface
 * (`q.<region>.amazonaws.com`). The same key is rejected by the Kiro IDE gateway
 * (runtime.*.kiro.dev) and gets HTTP 400 REQUEST_BODY_INVALID on
 * codewhisperer.us-east-1 — so API-key inference must always target the regional q.* host,
 * including in us-east-1, and the region must stay inside the Q profile-region allowlist.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { KiroExecutor } from "../../open-sse/executors/kiro.ts";
import { kiroApiKeyRuntimeHost } from "../../open-sse/services/kiroRegion.ts";

type Credentials = Record<string, unknown>;

async function captureExecuteUrls(credentials: Credentials): Promise<string[]> {
  const executor = new KiroExecutor();
  executor.transformEventStreamToSSE = () =>
    new Response("data: [DONE]\n\n", {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = (async (url: URL | string) => {
    urls.push(String(url));
    return new Response("ok", { status: 200 });
  }) as typeof fetch;
  try {
    await executor.execute({
      model: "kiro-model",
      body: { conversationState: {} },
      stream: true,
      credentials,
    } as Parameters<KiroExecutor["execute"]>[0]);
  } finally {
    globalThis.fetch = originalFetch;
  }
  return urls;
}

test("kiroApiKeyRuntimeHost always uses the regional Amazon Q host", () => {
  assert.equal(kiroApiKeyRuntimeHost("us-east-1"), "https://q.us-east-1.amazonaws.com");
  assert.equal(kiroApiKeyRuntimeHost("eu-central-1"), "https://q.eu-central-1.amazonaws.com");
});

test("kiroApiKeyRuntimeHost falls back to us-east-1 for regions outside the allowlist", () => {
  assert.equal(kiroApiKeyRuntimeHost("evil.com/x"), "https://q.us-east-1.amazonaws.com");
  assert.equal(kiroApiKeyRuntimeHost("eu-west-1"), "https://q.us-east-1.amazonaws.com");
  assert.equal(kiroApiKeyRuntimeHost(""), "https://q.us-east-1.amazonaws.com");
});

test("API-key connection in us-east-1 calls only q.us-east-1 (never codewhisperer or kiro.dev)", async () => {
  const urls = await captureExecuteUrls({
    apiKey: "ksk_test",
    providerSpecificData: { authMethod: "api_key", region: "us-east-1" },
  });
  assert.deepEqual(urls, ["https://q.us-east-1.amazonaws.com/generateAssistantResponse"]);
});

test("API-key connection in eu-central-1 calls q.eu-central-1", async () => {
  const urls = await captureExecuteUrls({
    apiKey: "ksk_test",
    providerSpecificData: { authMethod: "api_key", region: "eu-central-1" },
  });
  assert.deepEqual(urls, ["https://q.eu-central-1.amazonaws.com/generateAssistantResponse"]);
});

test("API-key connection with a bogus stored region falls back to q.us-east-1", async () => {
  const urls = await captureExecuteUrls({
    apiKey: "ksk_test",
    providerSpecificData: { authMethod: "api_key", region: "evil.com/x" },
  });
  assert.deepEqual(urls, ["https://q.us-east-1.amazonaws.com/generateAssistantResponse"]);
});

test("API-key connection does not fail over to another surface on 403", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = (async (url: URL | string) => {
    urls.push(String(url));
    return new Response("denied", { status: 403 });
  }) as typeof fetch;
  try {
    const result = await executor.execute({
      model: "kiro-model",
      body: { conversationState: {} },
      stream: true,
      credentials: {
        apiKey: "ksk_test",
        providerSpecificData: { authMethod: "api_key", region: "us-east-1" },
      },
    } as Parameters<KiroExecutor["execute"]>[0]);
    assert.equal(result.response.status, 403);
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.deepEqual(urls, ["https://q.us-east-1.amazonaws.com/generateAssistantResponse"]);
});

test("IdC connection in us-east-1 still uses codewhisperer.us-east-1 (regression guard)", async () => {
  const urls = await captureExecuteUrls({
    accessToken: "idc-token",
    providerSpecificData: { authMethod: "idc", region: "us-east-1" },
  });
  assert.deepEqual(urls, [
    "https://codewhisperer.us-east-1.amazonaws.com/generateAssistantResponse",
  ]);
});

test("social connection in us-east-1 still tries the Kiro IDE gateway first (regression guard)", async () => {
  const urls = await captureExecuteUrls({
    accessToken: "social-token",
    providerSpecificData: { authMethod: "social", region: "us-east-1" },
  });
  assert.deepEqual(urls, ["https://runtime.us-east-1.kiro.dev/generateAssistantResponse"]);
});
