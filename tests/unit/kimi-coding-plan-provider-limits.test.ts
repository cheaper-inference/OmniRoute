import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kimi-plan-limits-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "kimi-plan-fixture-key-with-32-bytes";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const limitsDb = await import("../../src/lib/db/providerLimits.ts");
const { setProxyForLevel } = await import("../../src/lib/db/settings.ts");
const { hasAmbientProxyContext } = await import("../../open-sse/utils/proxyFetch.ts");
const { fetchAndPersistProviderLimits } = await import("../../src/lib/usage/providerLimits.ts");
const { getCredentialRefreshExecutor } = await import("../../open-sse/executors/credential.ts");
const { resolvePlanValue, normalizePlanTier } =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx");

const originalFetch = globalThis.fetch;
const payload = {
  usage: { limit: "100", used: "20", remaining: "80" },
  boosterWallet: {
    balance: { type: "BOOSTER", amountLeft: "1234000000" },
    status: "STATUS_ACTIVE",
  },
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

async function createConnection(
  authType: "apikey" | "oauth",
  provider = "kimi-coding",
  baseUrl = "https://api.kimi.ai/coding/v1"
) {
  const connection = await providers.createProviderConnection({
    provider,
    authType,
    name: "Kimi plan fixture",
    ...(authType === "apikey"
      ? { apiKey: "fixture-key" }
      : { accessToken: "fixture-access", refreshToken: "fixture-refresh" }),
    testStatus: "active",
    isActive: true,
    providerSpecificData: { baseUrl },
  });
  await setProxyForLevel("key", connection.id as string, {
    type: "socks5",
    host: "127.0.0.1",
    port: 9,
  });
  return connection;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Provider Limits refreshes and persists the profile plan for both auth modes and legacy id", async () => {
  for (const [authType, provider] of [
    ["apikey", "kimi-coding"],
    ["apikey", "kimi-coding-apikey"],
    ["apikey", "moonshot"],
    ["oauth", "kimi-coding"],
  ] as const) {
    const connection = await createConnection(authType, provider);
    let name = "Pro";
    const calls: string[] = [];
    globalThis.fetch = async (input) => {
      const url = String(input);
      assert.equal(hasAmbientProxyContext(), true);
      calls.push(url);
      if (url.endsWith("/usages")) return jsonResponse(payload);
      assert.equal(url, "https://api.kimi.ai/coding/v1/me");
      return jsonResponse({ user_level_name: name, email: "private-profile@example.invalid" });
    };

    for (const expected of ["Pro", "Team"]) {
      name = expected;
      const result = await fetchAndPersistProviderLimits(connection.id as string);
      assert.equal(result.usage.plan, expected);
      assert.ok(result.usage.quotas);
      assert.equal(result.usage.message, undefined);
      assert.equal(result.cache.plan, expected);
      const stored = limitsDb.getProviderLimitsCache(connection.id as string);
      assert.equal(stored?.plan, expected);
      assert.equal(
        resolvePlanValue(stored?.plan, connection.providerSpecificData, provider),
        expected
      );
      assert.equal(JSON.stringify(stored).includes("private-profile"), false);
      const saved = await providers.getProviderConnectionById(connection.id as string);
      assert.deepEqual(saved?.providerSpecificData, connection.providerSpecificData);
    }
    assert.deepEqual(calls, [
      "https://api.kimi.ai/coding/v1/usages",
      "https://api.kimi.ai/coding/v1/me",
      "https://api.kimi.ai/coding/v1/usages",
      "https://api.kimi.ai/coding/v1/me",
    ]);
  }
});

test("profile auth and network failures do not trigger Provider Limits recovery or status changes", async (t) => {
  const executor = await getCredentialRefreshExecutor("kimi-coding");
  t.mock.method(executor, "needsRefresh", () => false);
  const refresh = t.mock.method(executor, "refreshCredentials", async () => {
    throw new Error("profile failure must not refresh credentials");
  });
  for (const failure of [
    () => new Response("unauthorized private-profile-error", { status: 401 }),
    () => new Response("access denied private-profile-error", { status: 403 }),
    () => {
      throw new Error("fetch failed ECONNREFUSED");
    },
  ]) {
    const connection = await createConnection("oauth");
    const calls: string[] = [];
    globalThis.fetch = async (input) => {
      const url = String(input);
      assert.equal(hasAmbientProxyContext(), true);
      calls.push(url);
      if (url.endsWith("/usages")) return jsonResponse(payload);
      assert.equal(url, "https://api.kimi.ai/coding/v1/me");
      return failure();
    };

    const result = await fetchAndPersistProviderLimits(connection.id as string, "manual", {
      allowRotatingRefresh: true,
    });
    assert.equal(result.usage.plan, "Kimi Coding");
    assert.ok(result.usage.quotas);
    assert.equal(result.usage.message, undefined);
    assert.equal(refresh.mock.callCount(), 0);
    const saved = await providers.getProviderConnectionById(connection.id as string);
    assert.equal(saved?.testStatus, "active");
    assert.equal(saved?.isActive, true);
    assert.equal(saved?.accessToken, "fixture-access");
    assert.equal(saved?.refreshToken, "fixture-refresh");
    assert.equal(saved?.lastError, connection.lastError);
    assert.equal(saved?.rateLimitedUntil, connection.rateLimitedUntil);
    assert.deepEqual(calls, [
      "https://api.kimi.ai/coding/v1/usages",
      "https://api.kimi.ai/coding/v1/me",
    ]);
  }
});

test("Provider Limits keeps plan opt-in after the existing OAuth usage recovery retry", async (t) => {
  const connection = await createConnection("oauth");
  const executor = await getCredentialRefreshExecutor("kimi-coding");
  t.mock.method(executor, "needsRefresh", () => false);
  const refresh = t.mock.method(executor, "refreshCredentials", async () => ({
    accessToken: "recovered-access",
    refreshToken: "recovered-refresh",
    expiresIn: 3600,
  }));
  const calls: Array<{ url: string; authorization: string | null }> = [];
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    assert.equal(hasAmbientProxyContext(), true);
    const authorization = new Headers(init?.headers).get("authorization");
    calls.push({ url, authorization });
    if (url.endsWith("/usages")) {
      return authorization === "Bearer fixture-access"
        ? jsonResponse({ error: "unauthorized" }, 401)
        : jsonResponse(payload);
    }
    assert.equal(url, "https://api.kimi.ai/coding/v1/me");
    return jsonResponse({ user_level_name: "Pro" });
  };

  const result = await fetchAndPersistProviderLimits(connection.id as string, "manual", {
    allowRotatingRefresh: true,
  });
  assert.equal(refresh.mock.callCount(), 1);
  assert.equal(result.usage.plan, "Pro");
  assert.equal(result.cache.plan, "Pro");
  assert.ok(result.usage.quotas);
  assert.equal(result.connection.accessToken, "recovered-access");
  assert.deepEqual(calls, [
    { url: "https://api.kimi.ai/coding/v1/usages", authorization: "Bearer fixture-access" },
    { url: "https://api.kimi.ai/coding/v1/usages", authorization: "Bearer recovered-access" },
    { url: "https://api.kimi.ai/coding/v1/me", authorization: "Bearer recovered-access" },
  ]);
});

test("Provider Limits cancels rejected profile bodies while preserving successful usage", async () => {
  const connection = await createConnection("apikey", "moonshot");
  let cancellations = 0;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("private-profile-error"));
    },
    cancel() {
      cancellations += 1;
    },
  });
  const calls: string[] = [];
  globalThis.fetch = async (input) => {
    const url = String(input);
    assert.equal(hasAmbientProxyContext(), true);
    calls.push(url);
    if (url.endsWith("/usages")) return jsonResponse(payload);
    assert.equal(url, "https://api.kimi.ai/coding/v1/me");
    return new Response(body, { status: 403 });
  };

  const result = await fetchAndPersistProviderLimits(connection.id as string);
  assert.equal(cancellations, 1);
  assert.equal(result.usage.plan, "Kimi Coding");
  assert.ok(result.usage.quotas);
  assert.equal(result.usage.message, undefined);
  assert.equal(
    (result.usage.billing as { extraCreditsMinorUnits?: number })?.extraCreditsMinorUnits,
    1234
  );
  assert.equal(JSON.stringify(result.cache).includes("private-profile-error"), false);
  assert.deepEqual(calls, [
    "https://api.kimi.ai/coding/v1/usages",
    "https://api.kimi.ai/coding/v1/me",
  ]);
});

test("documented China profile persists Vivace through Provider Limits and UI for both auth modes", async () => {
  const chinaProfile = {
    region: "REGION_CN",
    user_level: 30,
    user_level_name: "Vivace",
    goods_version: 1,
  };
  for (const authType of ["apikey", "oauth"] as const) {
    const connection = await createConnection(
      authType,
      "kimi-coding",
      "https://api.kimi.com/coding/v1"
    );
    const calls: Array<{ url: string; headers: Headers }> = [];
    globalThis.fetch = async (input, init) => {
      const url = String(input);
      assert.equal(hasAmbientProxyContext(), true);
      calls.push({ url, headers: new Headers(init?.headers) });
      if (url === "https://api.kimi.com/coding/v1/usages") return jsonResponse(payload);
      assert.equal(url, "https://api.kimi.com/coding/v1/me");
      return jsonResponse(chinaProfile);
    };

    const result = await fetchAndPersistProviderLimits(connection.id as string);
    assert.equal(result.usage.plan, "Vivace");
    assert.ok(result.usage.quotas);
    assert.equal(result.usage.message, undefined);
    assert.equal(result.cache.plan, "Vivace");
    const stored = limitsDb.getProviderLimitsCache(connection.id as string);
    assert.equal(stored?.plan, "Vivace");
    const resolved = resolvePlanValue(stored?.plan, connection.providerSpecificData, "kimi-coding");
    assert.equal(resolved, "Vivace");
    assert.equal(normalizePlanTier(resolved, "kimi-coding").label, "Vivace");
    assert.deepEqual(
      calls.map((call) => call.url),
      ["https://api.kimi.com/coding/v1/usages", "https://api.kimi.com/coding/v1/me"]
    );
    assert.equal(calls[0].headers.get("x-api-key"), authType === "apikey" ? "fixture-key" : null);
    assert.equal(
      calls[0].headers.get("authorization"),
      authType === "oauth" ? "Bearer fixture-access" : null
    );
    assert.deepEqual(Object.fromEntries(calls[1].headers), {
      accept: "application/json",
      authorization: authType === "apikey" ? "Bearer fixture-key" : "Bearer fixture-access",
    });
  }
});
