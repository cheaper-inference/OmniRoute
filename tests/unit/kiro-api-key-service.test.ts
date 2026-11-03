import test from "node:test";
import assert from "node:assert/strict";

import { KiroService } from "../../src/lib/oauth/services/kiro.ts";

// Validation proves the key on the Amazon Q model catalog first; ListAvailableProfiles is
// only a best-effort profileArn discovery that runs after that proof succeeds.
function modelCatalogOk(): Response {
  return new Response(JSON.stringify({ models: [] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

test("KiroService.validateApiKey discovers the profile via ListAvailableProfiles with API_KEY token type", async () => {
  const service = new KiroService();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    if (String(url).includes("/ListAvailableModels")) return modelCatalogOk();
    assert.equal(url, "https://q.eu-central-1.amazonaws.com");
    const headers = init?.headers as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer kiro-api-key");
    assert.equal(headers.tokentype, "API_KEY");
    assert.equal(headers["x-amz-target"], "AmazonCodeWhispererService.ListAvailableProfiles");
    return new Response(
      JSON.stringify({
        profiles: [
          { arn: "arn:aws:codewhisperer:us-east-1:1:profile/OTHER" },
          { arn: "arn:aws:codewhisperer:eu-central-1:1:profile/MATCH" },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;

  try {
    const credential = await service.validateApiKey(" kiro-api-key ", "eu-central-1");
    assert.equal(credential.accessToken, "kiro-api-key");
    assert.equal(credential.refreshToken, null);
    assert.equal(credential.authMethod, "api_key");
    assert.equal(credential.region, "eu-central-1");
    assert.equal(credential.profileArn, "arn:aws:codewhisperer:eu-central-1:1:profile/MATCH");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("KiroService.validateApiKey accepts API keys when profile discovery is denied", async () => {
  const service = new KiroService();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async (url: string) =>
    String(url).includes("/ListAvailableModels")
      ? modelCatalogOk()
      : new Response(
          JSON.stringify({
            __type: "com.amazon.aws.codewhisperer#AccessDeniedException",
            message: "API key authentication is not supported for this operation.",
          }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        )) as typeof fetch;

  try {
    const credential = await service.validateApiKey(" kiro-api-key ", "us-east-1");
    assert.equal(credential.accessToken, "kiro-api-key");
    assert.equal(credential.refreshToken, null);
    assert.equal(credential.authMethod, "api_key");
    assert.equal(credential.region, "us-east-1");
    assert.equal(credential.profileArn, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
