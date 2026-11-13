import test from "node:test";
import assert from "node:assert/strict";
import { getManagedZcodeUsage } from "../../open-sse/services/usage/zcode.ts";
import { toProviderLimitsCacheEntry } from "../../src/lib/usage/providerLimitsCache.ts";
import { isSupportedUsageConnection } from "../../src/lib/usage/providerLimits.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(() => resetDbInstance());

const makeAccount = (id: string, family: "zai" | "bigmodel") => ({
  id,
  provider: "zcode",
  authType: "oauth",
  accessToken: `business-${id}`,
  idToken: `jwt-${id}`,
  refreshToken: `refresh-${id}`,
  providerSpecificData: { family, userId: `user-${id}`, accessTokenFormat: "business" },
});
function snapshot(family: string, plan: string, count: number) {
  return {
    authenticated: true,
    generatedAt: 1794074350439,
    provider: {
      id: `account:${family}-${plan === "start" ? "start-plan" : "individual-coding-plan"}`,
    },
    quota: {
      level: plan,
      limits:
        plan === "start"
          ? [
              {
                meter: "model_usage",
                unitType: "token",
                unit: 500,
                usage: count,
                nextResetTime: 1794186000000,
              },
            ]
          : [
              {
                type: "CREDIT_LIMIT",
                unit: 3,
                number: 5,
                usage: 28000,
                currentValue: count,
                remaining: 28000 - count,
                nextResetTime: 1794091925066,
              },
              {
                type: "CREDIT_LIMIT",
                unit: 6,
                number: 1,
                usage: 140000,
                currentValue: count,
                remaining: 140000 - count,
              },
            ],
    },
  };
}

test("separate managed OAuth accounts and tariffs retain their own entitlement", async () => {
  const seen: Array<Record<string, unknown>> = [];
  const observations: Record<string, unknown> = {};
  for (const [id, family, count] of [
    ["a", "zai", 100],
    ["b", "bigmodel", 300],
  ] as const) {
    const account = makeAccount(id, family);
    const result = await getManagedZcodeUsage(account, {
      ensureHost: async (creds) => {
        seen.push(creds);
        return `/managed/${id}`;
      },
      clientFactory: (root) => ({
        async start() {
          assert.equal(root, `/managed/${id}`);
        },
        async call(_c, _m, args) {
          const request = args[0] as {
            preferredProviderId: string;
            accountAccess: { accountType: string; mode: string };
            requirePreferredProvider: boolean;
          };
          assert.equal(request.requirePreferredProvider, true);
          assert.equal(request.accountAccess.accountType, family);
          const plan = request.accountAccess.mode === "start-plan" ? "start" : "individual";
          return snapshot(family, plan, count);
        },
        async close() {},
      }),
    });
    assert.equal(result.quotas, undefined, "no aggregate may poison shared routing quota cache");
    assert.equal(result.quotaGroups.length, 2);
    assert.equal(result.quotaGroups[0].quotas.tokens.used, count);
    assert.equal(result.quotaGroups[1].quotas.session.used, count);
    assert.equal(result.quotaGroups[1].quotas.weekly.total, 140000);
    assert.ok(result.quotaGroups[0].observedAt);
    const cache = toProviderLimitsCacheEntry(result, "test");
    assert.equal(cache.quotaGroups?.length, 2);
    observations[id] = result;
  }
  assert.notDeepEqual(observations.a, observations.b);
  assert.equal(seen[0].authType, "oauth");
  assert.equal(seen[0].connectionId, "a");
  assert.equal(seen[0].accessToken, "business-a");
  assert.equal(seen[0].refreshToken, "refresh-a");
  assert.equal(seen[0].idToken, "jwt-a");
  assert.equal((seen[0].providerSpecificData as { userId: string }).userId, "user-a");
  assert.equal(isSupportedUsageConnection(makeAccount("a", "zai")), true);
});

test("wrong provider, host failure and unknown limits are unknown, never zero", async () => {
  const account = makeAccount("x", "zai");
  const wrong = await getManagedZcodeUsage(account, {
    ensureHost: async () => "root",
    clientFactory: () => ({
      async start() {},
      async call() {
        return snapshot("bigmodel", "start", 0);
      },
      async close() {},
    }),
  });
  assert.ok(
    wrong.quotaGroups.every(
      (group) => group.status === "unknown" && Object.keys(group.quotas).length === 0
    )
  );
  const unavailable = await getManagedZcodeUsage(account, {
    ensureHost: async () => {
      throw new Error("SECRET");
    },
  });
  assert.ok(unavailable.quotaGroups.every((group) => group.status === "unknown"));
  assert.doesNotMatch(JSON.stringify(unavailable), /SECRET|business-x|jwt-x/);
});

test("one unavailable plan does not hide the other, API keys cannot use managed OAuth", async () => {
  const account = makeAccount("mixed", "bigmodel");
  let calls = 0;
  const result = await getManagedZcodeUsage(account, {
    ensureHost: async () => "managed",
    clientFactory: () => ({
      async start() {},
      async call(_channel, _method, args) {
        calls++;
        const request = args[0] as { accountAccess: { mode: string } };
        if (request.accountAccess.mode === "start-plan") return snapshot("bigmodel", "start", 42);
        return { authenticated: true, unavailableReason: "not_configured", provider: null };
      },
      async close() {},
    }),
  });
  assert.equal(calls, 2);
  assert.equal(result.quotaGroups[0].status, "available");
  assert.equal(result.quotaGroups[1].status, "unknown");
  assert.equal(Object.keys(result.quotaGroups[1].quotas).length, 0);
  assert.equal(isSupportedUsageConnection({ ...account, authType: "apikey" }), false);
  let started = false;
  const rejected = await getManagedZcodeUsage(
    { ...account, authType: "apikey" },
    {
      ensureHost: async () => {
        started = true;
        return "root";
      },
    }
  );
  assert.equal(started, false);
  assert.ok(rejected.quotaGroups.every((group) => group.status === "unknown"));
});

test("saved non-OAuth Start cannot read the global virtual-account quota", async () => {
  const { getUsageForProvider } = await import("../../open-sse/services/usage.ts");
  const result = await getUsageForProvider({
    id: "saved-api-key",
    provider: "zcode-start",
    authType: "apikey",
    apiKey: "fixture",
  });
  assert.ok("message" in result);
  assert.equal("quotas" in result, false);
  assert.equal(
    isSupportedUsageConnection({
      id: "saved-api-key",
      provider: "zcode-start",
      authType: "apikey",
    }),
    false
  );
});

test("usage API returns and caches separate unknown groups for an incomplete saved account", async () => {
  const { createProviderConnection, deleteProviderConnection } =
    await import("../../src/lib/db/providers.ts");
  const { getProviderLimitsCache } = await import("../../src/lib/db/providerLimits.ts");
  const { GET } = await import("../../src/app/api/usage/[connectionId]/route.ts");
  const connection = await createProviderConnection({
    provider: "zcode",
    authType: "oauth",
    name: "quota fixture",
    accessToken: "fixture",
    isActive: true,
    providerSpecificData: { family: "zai", userId: "fixture" },
  });
  try {
    const response = await GET(new Request("http://localhost/api/usage"), {
      params: Promise.resolve({ connectionId: connection.id }),
    });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.quotas, undefined);
    assert.deepEqual(
      result.quotaGroups.map((group: { plan: string; status: string }) => [
        group.plan,
        group.status,
      ]),
      [
        ["start", "unknown"],
        ["individual", "unknown"],
      ]
    );
    const cache = getProviderLimitsCache(connection.id);
    assert.equal(cache?.quotas, null);
    assert.equal(cache?.quotaGroups?.length, 2);
  } finally {
    await deleteProviderConnection(connection.id);
  }
});

test("default quota path reuses shared host manager without closing it", async (t) => {
  const { nativeZcodeHosts } = await import("../../open-sse/executors/zcode/nativeHostManager.ts");
  const calls: Array<Record<string, unknown>> = [];
  const ensure = t.mock.method(nativeZcodeHosts, "ensure", async (credentials) => {
    calls.push(credentials);
    return "/shared-managed-root";
  });
  const close = t.mock.method(nativeZcodeHosts, "close", async () => {});
  const result = await getManagedZcodeUsage(makeAccount("shared", "zai"), {
    clientFactory: (root) => ({
      async start() {
        assert.equal(root, "/shared-managed-root");
      },
      async call(_channel, _method, args) {
        const request = args[0] as { accountAccess: { mode: string } };
        return snapshot(
          "zai",
          request.accountAccess.mode === "start-plan" ? "start" : "individual",
          42
        );
      },
      async close() {},
    }),
  });
  assert.equal(ensure.mock.callCount(), 1);
  assert.equal(close.mock.callCount(), 0);
  assert.equal(calls[0].authType, "oauth");
  assert.equal(calls[0].connectionId, "shared");
  assert.equal(calls[0].accessToken, "business-shared");
  assert.ok(result.quotaGroups.every((group) => group.status === "available"));
});
