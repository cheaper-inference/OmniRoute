import test from "node:test";
import assert from "node:assert/strict";
import { validateProviderApiKeySchema } from "../../src/shared/validation/schemas.ts";
import { buildProviderValidateRequestBody } from "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/providerValidateRequestBody.ts";

// Import validateRoute first so proxyFetch installs its patched globalThis.fetch,
// and subsequent mock assignment to globalThis.fetch is not clobbered.
const validateRoute = await import("../../src/app/api/providers/validate/route.ts");

test("validateProviderApiKeySchema accepts and trims accountId", () => {
  const parsed = validateProviderApiKeySchema.safeParse({
    provider: "cloudflare-ai",
    apiKey: "test-token",
    accountId: "   cf-account-12345   ",
  });
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.accountId, "cf-account-12345");
  }
});

test("buildProviderValidateRequestBody includes trimmed accountId when provided", () => {
  const reqBody = buildProviderValidateRequestBody({
    provider: "cloudflare-ai",
    apiKey: "test-token",
    formData: {
      customUserAgent: "",
      baseUrl: "",
      region: "",
      awsAccessKeyId: "",
      awsSessionToken: "",
      cx: "",
      runtimeKey: "",
      tunnelId: "",
      connectorName: "",
      accountId: "  my-cf-account-id  ",
    },
    isAwsPolly: false,
    showsRegion: false,
    defaultRegion: "us-east-1",
    isChatGptWebCodex: false,
  });

  assert.equal(reqBody.accountId, "my-cf-account-id");
});

test("buildProviderValidateRequestBody omits accountId when empty or missing", () => {
  const reqBody = buildProviderValidateRequestBody({
    provider: "cloudflare-ai",
    apiKey: "test-token",
    formData: {
      customUserAgent: "",
      baseUrl: "",
      region: "",
      awsAccessKeyId: "",
      awsSessionToken: "",
      cx: "",
      runtimeKey: "",
      tunnelId: "",
      connectorName: "",
      accountId: "   ",
    },
    isAwsPolly: false,
    showsRegion: false,
    defaultRegion: "us-east-1",
    isChatGptWebCodex: false,
  });

  assert.equal(reqBody.accountId, undefined);
});

test("POST /api/providers/validate forwards accountId to cloudflare-ai validator", async () => {
  const saved = process.env.CLOUDFLARE_ACCOUNT_ID;
  delete process.env.CLOUDFLARE_ACCOUNT_ID;
  const originalFetch = globalThis.fetch;
  let interceptedUrl = "";
  (globalThis as unknown as { fetch: typeof originalFetch }).fetch = async (url) => {
    interceptedUrl = String(url);
    return Response.json({ success: true, result: [] });
  };
  try {
    const request = new Request("http://localhost/api/providers/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "cloudflare-ai",
        apiKey: "test-token",
        accountId: "my-custom-account",
      }),
    });
    const res = await validateRoute.POST(request);
    const body = (await res.json()) as { valid?: boolean; error?: string };
    assert.equal(res.status, 200);
    assert.equal(body.valid, true);
    assert.equal(
      interceptedUrl,
      "https://api.cloudflare.com/client/v4/accounts/my-custom-account/ai/models/search?per_page=1"
    );
  } finally {
    globalThis.fetch = originalFetch;
    if (saved === undefined) delete process.env.CLOUDFLARE_ACCOUNT_ID;
    else process.env.CLOUDFLARE_ACCOUNT_ID = saved;
  }
});
