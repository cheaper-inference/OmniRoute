import "../_setup/isolateDataDir.ts";
import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { validateProviderApiKeySchema } from "../../src/shared/validation/schemas.ts";
import { buildProviderValidateRequestBody } from "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/providerValidateRequestBody.ts";
import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";
import { CLOUDFLARE_ACCOUNT_ID_REQUIRED } from "../../open-sse/executors/cloudflare-ai.ts";

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("validateProviderApiKeySchema accepts and trims accountId (#19304)", () => {
  const result = validateProviderApiKeySchema.safeParse({
    provider: "cloudflare-ai",
    apiKey: "test-token",
    accountId: "  cf-account-12345  ",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.accountId, "cf-account-12345");
  }
});

test("buildProviderValidateRequestBody forwards accountId from formData (#19304)", () => {
  const body = buildProviderValidateRequestBody({
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
      accountId: "cf-acc-777",
    },
    isAwsPolly: false,
    showsRegion: false,
    defaultRegion: "",
    isChatGptWebCodex: false,
  });

  assert.equal(body.accountId, "cf-acc-777");
});

test("buildProviderValidateRequestBody sets accountId to undefined when empty (#19304)", () => {
  const body = buildProviderValidateRequestBody({
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
    defaultRegion: "",
    isChatGptWebCodex: false,
  });

  assert.equal(body.accountId, undefined);
});

test("Cloudflare AI validation fails with CLOUDFLARE_ACCOUNT_ID_REQUIRED when accountId is missing (#19304)", async () => {
  const prevEnv = process.env.CLOUDFLARE_ACCOUNT_ID;
  delete process.env.CLOUDFLARE_ACCOUNT_ID;
  try {
    const result = await validateProviderApiKey({
      provider: "cloudflare-ai",
      apiKey: "test-token",
      providerSpecificData: {},
    });
    assert.equal(result.valid, false);
    assert.equal(result.error, CLOUDFLARE_ACCOUNT_ID_REQUIRED);
  } finally {
    if (prevEnv !== undefined) process.env.CLOUDFLARE_ACCOUNT_ID = prevEnv;
  }
});

test("Cloudflare AI validation succeeds when accountId is forwarded via providerSpecificData (#19304)", async () => {
  const calls: Array<{ url: string; headers: Headers }> = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), headers: new Headers(init?.headers) });
    return Response.json({ success: true, result: [{ id: "model-1", name: "@cf/meta/llama-3" }] });
  };

  const result = await validateProviderApiKey({
    provider: "cloudflare-ai",
    apiKey: "my-cf-token",
    providerSpecificData: { accountId: "acc-cf-xyz" },
  });

  assert.equal(result.valid, true);
  assert.equal(calls.length, 1);
  assert.equal(
    calls[0].url,
    "https://api.cloudflare.com/client/v4/accounts/acc-cf-xyz/ai/models/search?per_page=1"
  );
  assert.equal(calls[0].headers.get("Authorization"), "Bearer my-cf-token");
});
