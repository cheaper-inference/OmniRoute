import test from "node:test";
import assert from "node:assert/strict";

import { getUsageForProvider } from "../../open-sse/services/usage.ts";
import { USAGE_FETCHER_PROVIDERS } from "../../open-sse/services/usage/fetcherProviders.ts";
import { USAGE_SUPPORTED_PROVIDERS } from "../../open-sse/services/usage/supportedProviders.ts";
import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts";
import {
  assignEditApiKeyProviderSpecificData,
  buildAddProviderSpecificData,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/connectionProviderSpecificData.ts";
import { sanitizeProviderSpecificDataForResponse } from "../../src/lib/providers/requestDefaults.ts";

// TokenRouter's inference key is rejected by its Management API, so the quota
// tracker reads an optional account-level Management Key stored in
// providerSpecificData.consoleApiKey (the same secondary-credential field the
// AgentRouter / Bailian trackers use — stripped from API responses and audits).

const MGMT_BASE = "https://api.tokenrouter.com/api/management";
const MGMT_KEY = "sk-mgmt-secret-1234567890";

type FetchCall = { url: string; headers: Record<string, string> };

const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function mockFetch(handler: (url: string) => Response | Promise<Response>): FetchCall[] {
  const calls: FetchCall[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    calls.push({ url, headers: { ...((init?.headers as Record<string, string>) || {}) } });
    return handler(url);
  }) as typeof fetch;
  return calls;
}

const WALLET = { data: { topUpBalance: 3, voucherEfficientAmount: 2, voucherSpent: 0.1 } };
const KEYS = {
  data: {
    page: 1,
    page_size: 100,
    total: 2,
    items: [
      {
        name: "prod",
        key: "sk-inference-key",
        status: 1,
        unlimited_quota: false,
        remain_quota: 6,
        used_quota: 4,
        expired_time: -1,
      },
      {
        name: "dev",
        key: "sk-other-account-key",
        status: 1,
        unlimited_quota: true,
        remain_quota: -0.0005,
        used_quota: 0.0005,
        expired_time: -1,
      },
    ],
  },
};

type UsageResult = {
  message?: string;
  plan?: string;
  quotas?: Record<string, Record<string, unknown>>;
};

function connection(providerSpecificData: Record<string, unknown> = {}) {
  return {
    id: `tokenrouter-test-${Math.random()}`,
    provider: "tokenrouter",
    apiKey: "sk-inference-key",
    providerSpecificData,
  };
}

test("tokenrouter is registered in the usage dispatcher lists", () => {
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("tokenrouter"));
  assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("tokenrouter"));
});

test("missing Management Key returns a hint and performs no request", async () => {
  const calls = mockFetch(() => jsonResponse({}));
  const result = (await getUsageForProvider(connection())) as UsageResult;

  assert.match(result.message ?? "", /Management Key/);
  assert.deepEqual(result.quotas ?? {}, {});
  assert.equal(calls.length, 0, "no upstream call without a management key");
});

test("Management API calls use the Management Key, never the inference key", async () => {
  const calls = mockFetch((url) =>
    url.includes("/self/wallet") ? jsonResponse(WALLET) : jsonResponse(KEYS)
  );
  await getUsageForProvider(connection({ consoleApiKey: ` ${MGMT_KEY} ` }));

  assert.deepEqual(
    calls.map((c) => c.url),
    [`${MGMT_BASE}/self/wallet`, `${MGMT_BASE}/api-keys?page=1&page_size=100`]
  );
  for (const call of calls) {
    assert.equal(call.headers.Authorization, `Bearer ${MGMT_KEY}`);
  }
});

test("401 from /api-keys reports an invalid/expired key without echoing the key or body", async () => {
  mockFetch(() => jsonResponse({ error: `bad token ${MGMT_KEY}` }, 401));
  const result = (await getUsageForProvider(
    connection({ consoleApiKey: MGMT_KEY })
  )) as UsageResult;

  assert.match(result.message ?? "", /invalid or expired/i);
  assert.ok(!(result.message ?? "").includes(MGMT_KEY), "message must not echo the key");
  assert.ok(
    !(result.message ?? "").includes("bad token"),
    "message must not echo the upstream body"
  );
});

test("non-auth upstream errors return a fixed status message", async () => {
  mockFetch((url) =>
    url.includes("/self/wallet") ? jsonResponse(WALLET) : jsonResponse({ detail: "boom" }, 503)
  );
  const result = (await getUsageForProvider(
    connection({ consoleApiKey: MGMT_KEY })
  )) as UsageResult;

  assert.equal(result.message, "TokenRouter Management API error (503).");
});

test("network failure never throws and never leaks the error text", async () => {
  mockFetch(() => {
    throw new Error(`connect ECONNREFUSED with ${MGMT_KEY}`);
  });
  const result = (await getUsageForProvider(
    connection({ consoleApiKey: MGMT_KEY })
  )) as UsageResult;

  assert.match(result.message ?? "", /unreachable/i);
  assert.ok(!(result.message ?? "").includes(MGMT_KEY));
});

test("wallet + limited + unlimited keys map to dashboard quota rows", async () => {
  mockFetch((url) => (url.includes("/self/wallet") ? jsonResponse(WALLET) : jsonResponse(KEYS)));
  const result = (await getUsageForProvider(
    connection({ consoleApiKey: MGMT_KEY })
  )) as UsageResult;

  assert.equal(result.plan, "TokenRouter");
  const quotas = result.quotas ?? {};

  assert.equal(quotas.balance?.remaining, 5);
  assert.equal(quotas.balance?.currency, "USD");

  const prod = quotas["key:prod"];
  assert.ok(prod, `limited key row missing: ${JSON.stringify(quotas)}`);
  assert.equal(prod.used, 4);
  assert.equal(prod.total, 10);
  assert.equal(prod.remaining, 6);
  assert.equal(prod.remainingPercentage, 60);
  assert.equal(prod.unlimited, false);

  const dev = quotas["key:dev"];
  assert.ok(dev, "unlimited key row missing");
  assert.equal(dev.unlimited, true);
  assert.equal(dev.remainingPercentage, 100);
  assert.equal(dev.remaining, undefined, "unlimited keys carry no absolute remaining");
});

test("only this connection's own key can mark the connection exhausted", async () => {
  const keys = {
    data: {
      items: [
        { name: "own", key: "sk-inference-key", status: 1, remain_quota: 0, used_quota: 5 },
        { name: "other", key: "sk-other-account-key", status: 1, remain_quota: 0, used_quota: 5 },
      ],
    },
  };
  mockFetch((url) => (url.includes("/self/wallet") ? jsonResponse({}, 404) : jsonResponse(keys)));
  const result = (await getUsageForProvider(
    connection({ consoleApiKey: MGMT_KEY })
  )) as UsageResult;

  const own = result.quotas?.["key:own"];
  const other = result.quotas?.["key:other"];
  assert.equal(own?.remainingPercentage, 0);
  assert.equal(own?.fractionReported, undefined, "own key is a real routing window");
  assert.match(String(own?.displayName), /this connection/);
  assert.equal(other?.fractionReported, false, "other keys are informational only");
  assert.ok(
    !JSON.stringify(result).includes("sk-other-account-key"),
    "key values must never be copied into the usage payload"
  );
});

test("disabled and expired keys are labelled", async () => {
  const keys = {
    data: {
      items: [
        {
          name: "off",
          status: 2,
          unlimited_quota: false,
          remain_quota: 1,
          used_quota: 1,
          expired_time: -1,
        },
        {
          name: "old",
          status: 1,
          unlimited_quota: false,
          remain_quota: 1,
          used_quota: 1,
          expired_time: 1,
        },
      ],
    },
  };
  mockFetch((url) => (url.includes("/self/wallet") ? jsonResponse({}, 404) : jsonResponse(keys)));
  const result = (await getUsageForProvider(
    connection({ consoleApiKey: MGMT_KEY })
  )) as UsageResult;

  assert.match(String(result.quotas?.["key:off"]?.displayName), /disabled/);
  assert.match(String(result.quotas?.["key:old"]?.displayName), /expired/);
  assert.equal(result.quotas?.balance, undefined, "no wallet row when the wallet is unavailable");
});

test("wallet fetch failure still returns per-key rows", async () => {
  mockFetch((url) => {
    if (url.includes("/self/wallet")) throw new Error("wallet down");
    return jsonResponse(KEYS);
  });
  const result = (await getUsageForProvider(
    connection({ consoleApiKey: MGMT_KEY })
  )) as UsageResult;

  assert.equal(result.message, undefined);
  assert.ok(result.quotas?.["key:prod"]);
  assert.equal(result.quotas?.balance, undefined);
});

test("dashboard parser renders the balance as USD credits and unlimited keys as 100%", async () => {
  mockFetch((url) => (url.includes("/self/wallet") ? jsonResponse(WALLET) : jsonResponse(KEYS)));
  const usage = await getUsageForProvider(connection({ consoleApiKey: MGMT_KEY }));
  const rows = parseQuotaData("tokenrouter", usage) as Array<Record<string, unknown>>;

  const balance = rows.find((r) => r.isCredits === true);
  assert.equal(balance?.isCredits, true);
  assert.equal(balance?.currency, "USD");
  assert.equal(balance?.creditCount, 5);

  const dev = rows.find((r) => r.name === "key:dev");
  assert.equal(dev?.remainingPercentage, 100, "unlimited key must not render as 0%");
  assert.equal(dev?.remaining, undefined);
});

const BASE_FORM_DATA = {
  accountId: "",
  apiRegion: "international",
  ccCompatibleContext1m: false,
  ccCompatibleRedactThinking: false,
  ccCompatibleSummarizeThinking: false,
  consoleApiKey: "",
  customUserAgent: "",
  cx: "",
  excludedModels: "",
  glmOrganizationId: "",
  glmProjectId: "",
  importFreeModelsOnly: false,
  m365Tier: undefined,
  newApiUserId: "",
  ollamaCloudUsageCookie: "",
  opencodeGoAuthCookie: "",
  opencodeGoWorkspaceId: "",
  passthroughModels: false,
  region: "",
  routingTags: "",
  tag: "",
  validationModelId: undefined,
};

test("Add modal persists the Management Key into consoleApiKey for tokenrouter", () => {
  const data = buildAddProviderSpecificData({
    provider: "tokenrouter",
    formData: { ...BASE_FORM_DATA, consoleApiKey: ` ${MGMT_KEY} ` } as never,
    openRouterPreset: { applyTo: () => {} },
    showFreeModelsToggle: false,
    isGooglePse: false,
    usesBaseUrl: false,
    validatedBaseUrl: null,
    showsRegion: false,
    defaultRegion: "",
    isGlm: false,
    isCloudflare: false,
  });
  assert.equal(data?.consoleApiKey, MGMT_KEY);
});

test("Edit modal with an empty Management Key field keeps the stored key", () => {
  const target: Record<string, unknown> = {};
  assignEditApiKeyProviderSpecificData({
    provider: "tokenrouter",
    formData: BASE_FORM_DATA as never,
    target,
    extraApiKeys: [],
    openRouterPreset: { getPatch: () => ({}) },
    usesBaseUrl: false,
    validatedBaseUrl: null,
    showsRegion: false,
    defaultRegion: "",
    isGlm: false,
    isCloudflare: false,
    isAntigravityFamily: false,
    trimmedCloudCodeProjectId: "",
    isGooglePse: false,
    isCcCompatible: false,
  });
  // undefined is dropped by JSON.stringify, so the PUT merge keeps the stored value.
  assert.ok("consoleApiKey" in target);
  assert.equal(target.consoleApiKey, undefined);
});

test("the stored Management Key is never returned to the dashboard", () => {
  const sanitized = sanitizeProviderSpecificDataForResponse({ consoleApiKey: MGMT_KEY }) ?? {};
  assert.equal(sanitized.consoleApiKey, undefined);
});
