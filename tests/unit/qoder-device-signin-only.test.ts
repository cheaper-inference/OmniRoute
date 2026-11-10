/**
 * #18737 — Qoder device-flow sign-in is SIGN-IN ONLY.
 *
 * The device flow yields `dt-` (access) / `drt-` (refresh) tokens. No Qoder
 * inference endpoint that accepts them is known, and the executor's HTTP path
 * talks to DashScope (Alibaba Cloud) with a Bearer token. A connection created
 * by this sign-in must therefore never have its `dt-` token sent to DashScope
 * (or to any other upstream): the executor refuses it with a sanitized error,
 * connection selection skips it, and the validation / usage paths do not
 * forward it either.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-18737-qoder-device-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Hermetic machine id: never read ~/.qoder or write to the real home.
process.env.QODER_MACHINE_ID = "test-machine-id-18737";
delete process.env.QODER_PERSONAL_ACCESS_TOKEN;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { qoder } = await import("../../src/lib/oauth/providers/qoder.ts");
const { QODER_CONFIG } = await import("../../src/lib/oauth/constants/oauth.ts");
const { QoderExecutor } = await import("../../open-sse/executors/qoder.ts");
const capabilities = await import("../../open-sse/services/qoderCapabilities.ts");
const { refreshQoderToken } =
  await import("../../open-sse/services/tokenRefresh/providers/qoder.ts");
const { validateQoderProvider } =
  await import("../../src/lib/providers/validation/specialtyInline.ts");
const { getQoderUsage } = await import("../../open-sse/services/usage/qoder.ts");
const { OAUTH_PROVIDERS } = await import("../../src/shared/constants/providers/oauth.ts");

const DEVICE_ACCESS = "dt-secret-device-access-token-18737";
const DEVICE_REFRESH = "drt-secret-device-refresh-token-18737";

type FetchCall = { url: string; authorization: string | null };

/** Replace global fetch, record every call, and fail loudly if anything is sent. */
async function withRecordedFetch<T>(
  fn: (calls: FetchCall[]) => Promise<T>,
  respond: (url: string) => Response = () =>
    new Response(JSON.stringify({ choices: [{ message: { content: "should not happen" } }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
): Promise<T> {
  const original = globalThis.fetch;
  const calls: FetchCall[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input);
    const headers = new Headers(init?.headers || {});
    calls.push({ url, authorization: headers.get("authorization") });
    return respond(url);
  }) as typeof fetch;
  try {
    return await fn(calls);
  } finally {
    globalThis.fetch = original;
  }
}

function mappedDeviceConnection() {
  return qoder.mapTokens(
    {
      access_token: DEVICE_ACCESS,
      refresh_token: DEVICE_REFRESH,
      expires_in: 2592000,
      token_type: "Bearer",
    },
    { id: "usr_18737", email: "device@example.com", nickname: "Device User" }
  );
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("mapTokens never mirrors the dt- device token into apiKey and marks the account sign-in only", () => {
  const mapped = mappedDeviceConnection();
  assert.equal(mapped.accessToken, DEVICE_ACCESS);
  assert.equal(mapped.refreshToken, DEVICE_REFRESH);
  assert.ok(!mapped.apiKey, "the device token must not be stored as apiKey");
  assert.equal(mapped.providerSpecificData?.authMethod, "device_code");
  assert.equal(mapped.providerSpecificData?.chatSupported, false);
});

test("a device-flow connection stays refused even when userinfo reports an apiKey", async () => {
  const mapped = qoder.mapTokens(
    { access_token: DEVICE_ACCESS, refresh_token: DEVICE_REFRESH },
    { email: "device@example.com", apiKey: "sk-from-userinfo" }
  );
  assert.notEqual(mapped.apiKey, DEVICE_ACCESS);
  await withRecordedFetch(async (calls) => {
    const result = await new QoderExecutor().execute({
      model: "qwen3.6-plus",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: mapped,
    } as never);
    assert.equal(calls.length, 0, `no upstream call expected, got ${JSON.stringify(calls)}`);
    const text = await result.response.text();
    assert.equal(JSON.parse(text).error.code, "qoder_sign_in_only");
    assert.ok(!text.includes("sk-from-userinfo"));
  });
});

test("mapTokens drops a dt- token reported as apiKey by userinfo", () => {
  const mapped = qoder.mapTokens(
    { access_token: DEVICE_ACCESS, refresh_token: DEVICE_REFRESH },
    { email: "device@example.com", apiKey: "dt-another-device-token" }
  );
  assert.ok(!mapped.apiKey);
});

test("a device-flow connection is never dispatched to DashScope (sign-in result → executor)", async () => {
  const mapped = mappedDeviceConnection();
  const executor = new QoderExecutor();

  await withRecordedFetch(async (calls) => {
    const result = await executor.execute({
      model: "qwen3.6-plus",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: mapped,
    } as never);

    assert.equal(calls.length, 0, `no upstream call expected, got ${JSON.stringify(calls)}`);
    assert.ok(!calls.some((c) => c.url.includes("dashscope.aliyuncs.com")));
    assert.ok(result.response.status >= 400 && result.response.status < 500);
    assert.ok(!String(result.url).includes("dashscope"));

    const text = await result.response.text();
    const body = JSON.parse(text);
    assert.equal(body.error.code, "qoder_sign_in_only");
    assert.match(body.error.message, /sign-in only|cannot serve chat/i);
    assert.ok(!text.includes(DEVICE_ACCESS), "the refusal must not echo the device token");
    assert.ok(!text.includes(DEVICE_REFRESH), "the refusal must not echo the refresh token");
    assert.ok(!JSON.stringify(result.headers || {}).includes(DEVICE_ACCESS));
  });
});

test("dt-/drt- tokens are refused in every credential slot, even with a custom API base", async () => {
  const executor = new QoderExecutor();
  const variants = [
    { apiKey: DEVICE_ACCESS },
    { accessToken: DEVICE_ACCESS },
    { refreshToken: DEVICE_REFRESH },
    { accessToken: DEVICE_ACCESS, customApiBase: "https://example.invalid/compatible-mode" },
    { accessToken: DEVICE_ACCESS, resourceUrl: "proxy.example.invalid" },
  ];

  for (const credentials of variants) {
    await withRecordedFetch(async (calls) => {
      const result = await executor.execute({
        model: "qwen3.6-plus",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: true,
        credentials,
      } as never);
      assert.equal(calls.length, 0, `upstream call for ${Object.keys(credentials).join(",")}`);
      const text = await result.response.text();
      assert.equal(JSON.parse(text).error.code, "qoder_sign_in_only");
      assert.ok(!text.includes("dt-secret"), "no token fragment in the refusal");
    });
  }
});

test("a connection marked sign-in only is refused even if its token lacks the dt- prefix", async () => {
  const executor = new QoderExecutor();
  await withRecordedFetch(async (calls) => {
    const result = await executor.execute({
      model: "qwen3.6-plus",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {
        accessToken: "opaque-device-token",
        providerSpecificData: { authMethod: "device_code" },
      },
    } as never);
    assert.equal(calls.length, 0);
    const text = await result.response.text();
    assert.equal(JSON.parse(text).error.code, "qoder_sign_in_only");
    assert.ok(!text.includes("opaque-device-token"));
  });
});

test("device-flow credentials are not chat-capable and not tool-capable", () => {
  assert.equal(capabilities.isQoderSignInOnlyCredential(mappedDeviceConnection()), true);
  assert.equal(capabilities.isQoderSignInOnlyCredential({ accessToken: DEVICE_ACCESS }), true);
  assert.equal(capabilities.isQoderSignInOnlyCredential({ apiKey: "pt-real-pat" }), false);
  assert.equal(capabilities.isQoderSignInOnlyCredential({ apiKey: "sk-dashscope" }), false);
  assert.equal(capabilities.qoderSupportsCallerTools({ accessToken: DEVICE_ACCESS }), false);
  assert.equal(capabilities.qoderSupportsCallerTools(mappedDeviceConnection()), false);
  assert.equal(capabilities.qoderSupportsCallerTools({ apiKey: "sk-dashscope" }), true);
});

test("connection selection skips device-flow accounts and falls back to a usable one", async () => {
  await resetStorage();
  const mapped = mappedDeviceConnection();
  await providersDb.createProviderConnection({
    provider: "qoder",
    authType: "oauth",
    ...mapped,
    name: "device-account",
    isActive: true,
    testStatus: "active",
    priority: 1,
  });

  const onlyDevice = await auth.getProviderCredentials("qoder");
  const onlyDeviceToken = onlyDevice ? capabilities.resolveQoderAuthToken(onlyDevice as never) : "";
  assert.ok(
    !onlyDeviceToken.startsWith("dt-"),
    "a pool holding only a device-flow account must not hand its dt- token to the executor"
  );

  await providersDb.createProviderConnection({
    provider: "qoder",
    authType: "apikey",
    apiKey: "sk-dashscope-usable-18737",
    name: "dashscope-key",
    isActive: true,
    testStatus: "active",
    priority: 2,
  });

  for (let i = 0; i < 4; i++) {
    const creds = await auth.getProviderCredentials("qoder");
    assert.ok(creds, "the usable connection must be selected");
    assert.equal(capabilities.resolveQoderAuthToken(creds as never), "sk-dashscope-usable-18737");
  }
});

test("validation and usage never forward a dt- device token upstream", async () => {
  await withRecordedFetch(async (calls) => {
    const validation = await validateQoderProvider({ apiKey: DEVICE_ACCESS });
    assert.equal(validation.valid, false);
    assert.ok(!String(validation.error).includes(DEVICE_ACCESS));

    const usage = await getQoderUsage(DEVICE_ACCESS);
    assert.ok(!JSON.stringify(usage).includes(DEVICE_ACCESS));

    assert.equal(calls.length, 0, `no upstream call expected, got ${JSON.stringify(calls)}`);
  });
});

test("legacy (non drt-) refresh tokens never go to the device refresh endpoint", async () => {
  await withRecordedFetch(async (calls) => {
    await refreshQoderToken("legacy-oauth-refresh-token", null);
    assert.ok(
      !calls.some((c) => c.url.includes("deviceToken/refresh")),
      "only drt- tokens belong to the device refresh endpoint"
    );
  });
});

test("device refresh keeps the rotated token out of apiKey", async () => {
  await withRecordedFetch(
    async () => {
      const refreshed = await refreshQoderToken(DEVICE_REFRESH, null);
      assert.ok(refreshed && !("error" in refreshed));
      assert.equal(refreshed.accessToken, "dt-rotated");
      assert.ok(!("apiKey" in refreshed) || !refreshed.apiKey);
    },
    () =>
      new Response(
        JSON.stringify({ data: { token: "dt-rotated", refresh_token: "drt-rotated" } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
  );
});

test("pollToken network errors are sanitized before they reach the route", async () => {
  await withRecordedFetch(
    async () => {
      const result = await qoder.pollToken(QODER_CONFIG, "nonce-1", "verifier-1");
      assert.equal(result.ok, false);
      assert.equal(result.data.error, "network_error");
      const description = String(result.data.error_description || "");
      assert.ok(!description.includes("/home/runner/secret/path.ts"), description);
      assert.ok(!description.includes("access_token=leaky"), description);
    },
    () => {
      throw new Error(
        "connect ECONNREFUSED access_token=leaky\n    at poll (/home/runner/secret/path.ts:10:5)"
      );
    }
  );
});

test("the Qoder auth hint says device sign-in accounts cannot serve chat yet", () => {
  const hint = String(OAUTH_PROVIDERS.qoder.authHint || "");
  assert.match(hint, /cannot serve chat/i);
  assert.doesNotMatch(hint, /direct streaming/i);
  assert.doesNotMatch(hint, /device code flow\) for/i);
});
