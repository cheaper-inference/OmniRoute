import "../_setup/isolateDataDir.ts";
import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { CloudflareAIExecutor } from "../../open-sse/executors/cloudflare-ai.ts";
import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";

import {
  cloudflareAiValidationResult,
  validateCloudflareAiProvider,
} from "../../src/lib/providers/validation/cloudflareAi.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");
const scheduler = await import("../../src/lib/credentialHealth/scheduler.ts");
test.after(() => {
  scheduler.stopCredentialHealthCheck();
  core.resetDbInstance();
});
const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("Cloudflare dispatch probes account-scoped metadata without inference", async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init: init || {} });
    return Response.json({ success: true, result: [] });
  };
  const result = await validateProviderApiKey({
    provider: "cloudflare-ai",
    apiKey: "fixture-token",
    providerSpecificData: { accountId: "fixture-account" },
  });
  assert.equal(result.valid, true);
  assert.equal(calls.length, 1);
  assert.equal(
    calls[0].url,
    "https://api.cloudflare.com/client/v4/accounts/fixture-account/ai/models/search?per_page=1"
  );
  assert.equal(calls[0].init.method, "GET");
  assert.equal(calls[0].init.body, undefined);
  assert.equal(new Headers(calls[0].init.headers).get("Authorization"), "Bearer fixture-token");
});

test("explicit Global API Key mode sends the legacy header pair without Bearer", () => {
  const headers = new CloudflareAIExecutor().buildHeaders(
    {
      apiKey: "fixture-global-key",
      providerSpecificData: {
        accountId: "fixture-account",
        authType: "global",
        email: "fixture@example.invalid",
      },
    },
    false
  );
  assert.equal(headers["X-Auth-Key"], "fixture-global-key");
  assert.equal(headers["X-Auth-Email"], "fixture@example.invalid");
  assert.equal(headers.Authorization, undefined);
});

test("only recognized successful Cloudflare envelopes validate", () => {
  assert.deepEqual(cloudflareAiValidationResult(200, { success: true, result: [] }), {
    valid: true,
    error: null,
  });
  for (const body of [
    null,
    "html",
    [],
    {},
    { success: false, result: [] },
    { success: true, result: {} },
    { result: [] },
  ]) {
    const result = cloudflareAiValidationResult(200, body);
    assert.equal(result.valid, false);
    assert.equal(result.unsupported, true);
  }
});

test("recognized auth errors reject while bare 403/429 are inconclusive", () => {
  for (const status of [400, 403]) {
    for (const code of [6003, 9106, 10000]) {
      const result = cloudflareAiValidationResult(status, { errors: [null, { code }] });
      assert.equal(result.valid, false);
      assert.notEqual(result.unsupported, true);
      assert.equal(result.error, "Invalid API key");
    }
  }
  assert.equal(cloudflareAiValidationResult(401, null).error, "Invalid API key");
  for (const status of [403, 429]) {
    const result = cloudflareAiValidationResult(status, { errors: [{ code: "10000" }] });
    assert.equal(result.valid, false);
    assert.equal(result.unsupported, true);
    assert.equal(result.statusCode, status);
  }
  assert.deepEqual(cloudflareAiValidationResult(503, { errors: [{ message: "untrusted body" }] }), {
    valid: false,
    error: "Validation failed: 503",
    statusCode: 503,
  });
});

test("missing account or Global API Key email fails before any fetch", async () => {
  const saved = process.env.CLOUDFLARE_ACCOUNT_ID;
  delete process.env.CLOUDFLARE_ACCOUNT_ID;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new Error("unexpected fetch");
  };
  try {
    const missingAccount = await validateCloudflareAiProvider({ apiKey: "fixture" });
    assert.equal(missingAccount.valid, false);
    assert.match(missingAccount.error!, /Account ID/);
    const missingEmail = await validateCloudflareAiProvider({
      apiKey: "fixture",
      providerSpecificData: { accountId: "fixture-account", authType: "global" },
    });
    assert.equal(missingEmail.valid, false);
    assert.match(missingEmail.error!, /email/);
    assert.equal(calls, 0);
  } finally {
    if (saved === undefined) delete process.env.CLOUDFLARE_ACCOUNT_ID;
    else process.env.CLOUDFLARE_ACCOUNT_ID = saved;
  }
});

test("probe and executor share Global API Key headers and the fixed official account root", async () => {
  const credentials = {
    apiKey: "fixture-global-key",
    providerSpecificData: {
      accountId: "fixture-account",
      authType: "global",
      email: "fixture@example.invalid",
      baseUrl: "https://ignored.example.invalid",
    },
  };
  const executor = new CloudflareAIExecutor();
  let calls = 0;
  globalThis.fetch = async (url, init) => {
    calls++;
    assert.equal(
      String(url),
      executor
        .buildUrl("unused", false, 0, credentials)
        .replace("/ai/v1/chat/completions", "/ai/models/search?per_page=1")
    );
    const headers = new Headers(init?.headers);
    assert.equal(headers.get("X-Auth-Key"), "fixture-global-key");
    assert.equal(headers.get("X-Auth-Email"), "fixture@example.invalid");
    assert.equal(headers.get("Authorization"), null);
    assert.equal(init?.method, "GET");
    assert.equal(init?.body, undefined);
    return Response.json({ success: true, result: [] });
  };
  assert.equal((await validateCloudflareAiProvider(credentials)).valid, true);
  assert.equal(calls, 1);
});

test("HTML 200 is inconclusive and 429 is never retried as inference", async () => {
  for (const status of [200, 429]) {
    let calls = 0;
    globalThis.fetch = async () => {
      calls++;
      return new Response("<html>blocked</html>", { status });
    };
    const result = await validateCloudflareAiProvider({
      apiKey: "fixture",
      providerSpecificData: { accountId: "fixture-account" },
    });
    assert.equal(result.valid, false);
    assert.equal(result.unsupported, true);
    assert.equal(calls, 1);
  }
});

test("inconclusive Cloudflare probes preserve persisted connection health", async () => {
  for (const status of [403, 429]) {
    let calls = 0;
    globalThis.fetch = async () => {
      calls++;
      return new Response("blocked", { status });
    };
    const connection = await createProviderConnection({
      provider: "cloudflare-ai",
      authType: "apikey",
      name: `fixture-${status}`,
      apiKey: "fixture-token",
      providerSpecificData: { accountId: "fixture-account" },
      isActive: true,
      testStatus: "active",
    });
    const readHealth = () =>
      core
        .getDbInstance()
        .prepare(
          "SELECT test_status, last_tested, last_error, last_error_at, error_code FROM provider_connections WHERE id = ?"
        )
        .get(connection.id);
    const before = readHealth();
    const result = await testSingleConnection(connection.id);
    assert.equal(result.valid, false);
    assert.equal(result.skipped, true);
    assert.equal(calls, 1);
    assert.deepEqual(readHealth(), before);
  }
});
