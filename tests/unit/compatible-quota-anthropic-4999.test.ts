/**
 * "Quota check" for compatible provider nodes.
 *
 * The configurable quota fetcher used to cover only `openai-compatible-*`. These tests pin:
 *  - `anthropic-compatible-*` (CC-compatible included) is dispatched and gated too;
 *  - the standard `/credits` preset the dashboard toggle writes, and its Zod validation;
 *  - the quota call goes through the SSRF-guarded outbound fetch;
 *  - the node update route writes/removes the preset on the node's connections without
 *    touching a hand-written endpoint.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compatible-quota-4999-"));
Object.assign(process.env, {
  DATA_DIR: TEST_DATA_DIR,
  OMNIROUTE_PLUGINS_DIR: path.join(TEST_DATA_DIR, "plugins"),
  APP_LOG_TO_FILE: "false",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  API_KEY_SECRET: "compatible-quota-4999-fixture-secret",
  JWT_SECRET: "compatible-quota-4999-fixture-session-secret",
});

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerNodesIdRoute = await import("../../src/app/api/provider-nodes/[id]/route.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");
const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
const { getUsageForProvider } = await import("../../open-sse/services/usage.ts");
const { supportsProviderQuota } = await import("../../src/shared/utils/providerQuotaVisibility.ts");
const { validateProviderSpecificData, compatibleQuotaPathSchema } =
  await import("../../src/shared/validation/providerSpecificData.ts");
const {
  buildStandardCreditsQuotaEndpoint,
  applyCompatibleQuotaCheck,
  inheritCompatibleQuotaCheck,
  readCompatibleQuotaCheck,
  compatibleQuotaAuthFor,
} = await import("../../src/shared/utils/compatibleQuotaCheck.ts");
const { z } = await import("zod");

test.after(async () => {
  await new Promise<void>((resolve) => setTimeout(resolve, 20));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type FetchCall = { url: string; headers: Record<string, string> };

async function withFetch<T>(body: unknown, fn: () => Promise<T>) {
  const original = globalThis.fetch;
  const calls: FetchCall[] = [];
  globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
    calls.push({ url: String(url), headers: (init?.headers ?? {}) as Record<string, string> });
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  try {
    return { result: await fn(), calls };
  } finally {
    globalThis.fetch = original;
  }
}

type UsageResult = {
  message?: string;
  quotas?: Record<string, { total: number; used: number; remaining: number; displayName?: string }>;
};

test("anthropic-compatible connections are dispatched to the configurable quota fetcher", async () => {
  const quotaEndpoint = buildStandardCreditsQuotaEndpoint(
    "https://gw.example.com/v1/",
    "/credits",
    "x-api-key"
  );
  for (const provider of ["anthropic-compatible-abc", "anthropic-compatible-cc-abc"]) {
    const { result, calls } = await withFetch({ credits: 5099.44 }, () =>
      getUsageForProvider({ provider, apiKey: "sk-ant", providerSpecificData: { quotaEndpoint } })
    );
    const usage = result as UsageResult;
    assert.equal(usage.message, undefined, `${provider}: ${usage.message}`);
    assert.equal(usage.quotas?.credits.total, 5099.44);
    assert.equal(usage.quotas?.credits.remaining, 5099.44);
    assert.equal(usage.quotas?.credits.used, 0);
    assert.equal(usage.quotas?.credits.displayName, "Credits");
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://gw.example.com/v1/credits");
    assert.equal(calls[0].headers["x-api-key"], "sk-ant");
    assert.equal(calls[0].headers.authorization, undefined);
  }
});

test("the standard preset reads optional total/used", async () => {
  const quotaEndpoint = buildStandardCreditsQuotaEndpoint("https://gw.example.com/v1");
  const { result, calls } = await withFetch({ credits: 25, total: 100, used: 75 }, () =>
    getUsageForProvider({
      provider: "openai-compatible-chat-abc",
      apiKey: "sk-oai",
      providerSpecificData: { quotaEndpoint },
    })
  );
  const usage = result as UsageResult;
  assert.equal(usage.quotas?.credits.total, 100);
  assert.equal(usage.quotas?.credits.used, 75);
  assert.equal(usage.quotas?.credits.remaining, 25);
  assert.equal(calls[0].headers.authorization, "Bearer sk-oai");
});

test("the quota call is SSRF-guarded: a cloud-metadata endpoint is never fetched", async () => {
  const { result, calls } = await withFetch({ credits: 1 }, () =>
    getUsageForProvider({
      provider: "anthropic-compatible-abc",
      apiKey: "sk",
      providerSpecificData: {
        quotaEndpoint: buildStandardCreditsQuotaEndpoint("http://169.254.169.254/latest"),
      },
    })
  );
  assert.equal(calls.length, 0, "the guard must reject the URL before any request");
  const message = String((result as UsageResult).message);
  assert.match(message, /unreachable|blocked/i);
  assert.doesNotMatch(message, /169\.254/, "the operator URL is not echoed");
});

test("the visibility gate accepts anthropic-compatible connections with an endpoint", () => {
  const quotaEndpoint = buildStandardCreditsQuotaEndpoint("https://x/v1", "/credits", "x-api-key");
  for (const id of ["anthropic-compatible-abc", "anthropic-compatible-cc-abc"]) {
    assert.equal(
      supportsProviderQuota(id, { provider: id, providerSpecificData: { quotaEndpoint } }),
      true
    );
    assert.equal(supportsProviderQuota(id, { provider: id, providerSpecificData: {} }), false);
  }
  assert.equal(
    supportsProviderQuota("claude", {
      provider: "claude",
      providerSpecificData: { quotaEndpoint },
    }),
    true,
    "first-party ids keep their static support"
  );
});

test("buildStandardCreditsQuotaEndpoint joins base URL and path and picks the auth header", () => {
  const endpoint = buildStandardCreditsQuotaEndpoint("https://x/v1/", "/credits");
  assert.equal(endpoint.url, "https://x/v1/credits");
  assert.equal(endpoint.auth, "bearer");
  assert.equal(endpoint.preset, "standard-credits");
  assert.deepEqual(endpoint.quotas.credits, {
    remaining: "$.credits",
    total: "$.total",
    used: "$.used",
    displayName: "Credits",
  });
  assert.equal(compatibleQuotaAuthFor("anthropic-compatible-cc-x"), "x-api-key");
  assert.equal(compatibleQuotaAuthFor("openai-compatible-chat-x"), "bearer");
});

test("quota path schema only accepts a path on the node's own host", () => {
  for (const ok of ["/credits", "/v1/account/credits", "/credits?refresh=1"]) {
    assert.equal(compatibleQuotaPathSchema.safeParse(ok).success, true, ok);
  }
  for (const bad of [
    "https://evil",
    "//evil.example.com/credits",
    "credits",
    "/\\evil",
    "/a b",
    "",
  ]) {
    assert.equal(compatibleQuotaPathSchema.safeParse(bad).success, false, bad);
  }
});

test("providerSpecificData.quotaEndpoint is validated", () => {
  const schema = z.record(z.string(), z.unknown()).superRefine(validateProviderSpecificData);
  const valid = buildStandardCreditsQuotaEndpoint("https://x/v1");
  assert.equal(schema.safeParse({ quotaEndpoint: valid }).success, true);
  assert.equal(
    schema.safeParse({ quotaEndpoint: { url: "https://x/u", quotas: { a: { used: "$.a" } } } })
      .success,
    true,
    "a hand-written mapping keeps validating"
  );
  for (const bad of [
    { ...valid, url: "ftp://x/credits" },
    { ...valid, auth: "basic" },
    { ...valid, quotaPath: "https://evil" },
    { ...valid, quotas: { credits: { remaining: 5 } } },
    "https://x/credits",
  ]) {
    assert.equal(schema.safeParse({ quotaEndpoint: bad }).success, false, JSON.stringify(bad));
  }
});

test("the toggle writes, regenerates and removes only its own preset", () => {
  const opts = { baseUrl: "https://a/v1", auth: "bearer" as const };
  const on = applyCompatibleQuotaCheck({ prefix: "p" }, { ...opts, setting: { enabled: true } });
  assert.equal((on.quotaEndpoint as { url: string }).url, "https://a/v1/credits");
  assert.equal(on.prefix, "p");

  const moved = applyCompatibleQuotaCheck(on, { baseUrl: "https://b/v2", auth: "bearer" });
  assert.equal((moved.quotaEndpoint as { url: string }).url, "https://b/v2/credits");

  const custom = applyCompatibleQuotaCheck(on, {
    ...opts,
    setting: { enabled: true, path: "/bal" },
  });
  assert.equal((custom.quotaEndpoint as { url: string }).url, "https://a/v1/bal");

  const off = applyCompatibleQuotaCheck(on, { ...opts, setting: { enabled: false } });
  assert.equal("quotaEndpoint" in off, false);
  assert.equal("quotaEndpoint" in applyCompatibleQuotaCheck({}, opts), false);

  const handWritten = { quotaEndpoint: { url: "https://own/u", quotas: { a: { used: "$.a" } } } };
  assert.equal(
    applyCompatibleQuotaCheck(handWritten, { ...opts, setting: { enabled: true } }),
    handWritten
  );
  assert.equal(
    applyCompatibleQuotaCheck(handWritten, { ...opts, setting: { enabled: false } }),
    handWritten
  );

  assert.deepEqual(readCompatibleQuotaCheck([{ providerSpecificData: custom }]), {
    enabled: true,
    path: "/bal",
  });
  assert.deepEqual(
    readCompatibleQuotaCheck([handWritten, {}].map((p) => ({ providerSpecificData: p }))),
    {
      enabled: false,
      path: "/credits",
    }
  );
});

test("a connection added later inherits the preset from its siblings", () => {
  const sibling = {
    providerSpecificData: {
      quotaEndpoint: buildStandardCreditsQuotaEndpoint("https://a/v1", "/bal"),
    },
  };
  const opts = { baseUrl: "https://a/v1", auth: "x-api-key" as const };
  const inherited = inheritCompatibleQuotaCheck({ prefix: "p" }, [sibling], opts);
  assert.equal((inherited.quotaEndpoint as { url: string }).url, "https://a/v1/bal");
  assert.equal((inherited.quotaEndpoint as { auth: string }).auth, "x-api-key");
  assert.equal("quotaEndpoint" in inheritCompatibleQuotaCheck({}, [{}], opts), false);
});

async function putNode(id: string, body: Record<string, unknown>) {
  return providerNodesIdRoute.PUT(
    new Request(`http://localhost/api/provider-nodes/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }),
    { params: Promise.resolve({ id }) }
  );
}

test("PUT /api/provider-nodes/[id] writes the preset to the node's connections", async () => {
  const id = "anthropic-compatible-quota4999";
  await providersDb.createProviderNode({
    id,
    type: "anthropic-compatible",
    name: "Gateway",
    prefix: "gw4999",
    baseUrl: "https://gw.example.com/v1",
  });
  const plain = await providersDb.createProviderConnection({
    provider: id,
    authType: "apikey",
    name: "plain",
    apiKey: "sk-1",
    providerSpecificData: { prefix: "gw4999", baseUrl: "https://gw.example.com/v1" },
  });
  const handWrittenEndpoint = { url: "https://own.example.com/q", quotas: { a: { used: "$.a" } } };
  const custom = await providersDb.createProviderConnection({
    provider: id,
    authType: "apikey",
    name: "custom",
    apiKey: "sk-2",
    providerSpecificData: { quotaEndpoint: handWrittenEndpoint },
  });
  const base = { name: "Gateway", prefix: "gw4999", baseUrl: "https://gw.example.com/v1" };

  const enabled = await putNode(id, { ...base, quotaCheck: { enabled: true, path: "/balance" } });
  assert.equal(enabled.status, 200, JSON.stringify(await enabled.clone().json()));
  const plainAfter = (await providersDb.getProviderConnectionById(plain.id)) as {
    providerSpecificData: { quotaEndpoint?: { url: string; auth: string; preset: string } };
  };
  assert.equal(
    plainAfter.providerSpecificData.quotaEndpoint?.url,
    "https://gw.example.com/v1/balance"
  );
  assert.equal(plainAfter.providerSpecificData.quotaEndpoint?.auth, "x-api-key");
  const customAfter = (await providersDb.getProviderConnectionById(custom.id)) as {
    providerSpecificData: { quotaEndpoint?: unknown };
  };
  assert.deepEqual(customAfter.providerSpecificData.quotaEndpoint, handWrittenEndpoint);

  const rejected = await putNode(id, {
    ...base,
    quotaCheck: { enabled: true, path: "https://evil" },
  });
  assert.equal(rejected.status, 400);

  const disabled = await putNode(id, { ...base, quotaCheck: { enabled: false } });
  assert.equal(disabled.status, 200);
  const plainOff = (await providersDb.getProviderConnectionById(plain.id)) as {
    providerSpecificData: { quotaEndpoint?: unknown };
  };
  assert.equal(plainOff.providerSpecificData.quotaEndpoint, undefined);
  const customOff = (await providersDb.getProviderConnectionById(custom.id)) as {
    providerSpecificData: { quotaEndpoint?: unknown };
  };
  assert.deepEqual(customOff.providerSpecificData.quotaEndpoint, handWrittenEndpoint);
});

test("POST /api/providers gives a new key the node's preset", async () => {
  const id = "openai-compatible-chat-quota4999";
  await providersDb.createProviderNode({
    id,
    type: "openai-compatible",
    name: "Gateway",
    prefix: "oai4999",
    apiType: "chat",
    baseUrl: "https://oai.example.com/v1",
  });
  await providersDb.createProviderConnection({
    provider: id,
    authType: "apikey",
    name: "first",
    apiKey: "sk-1",
    providerSpecificData: {
      quotaEndpoint: buildStandardCreditsQuotaEndpoint("https://oai.example.com/v1", "/bal"),
    },
  });

  const { result } = await withFetch({ data: [] }, async () => {
    const response = await providersRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/providers", {
        method: "POST",
        headers: { "X-Skip-Model-Sync": "true" },
        body: { provider: id, name: "second", apiKey: "sk-2" },
      })
    );
    await new Promise<void>((resolve) => setTimeout(resolve, 20));
    return response;
  });
  const body = (await result.json()) as { connection?: { id: string } };
  assert.equal(result.status, 201, JSON.stringify(body));
  const created = (await providersDb.getProviderConnectionById(String(body.connection?.id))) as {
    providerSpecificData: { quotaEndpoint?: { url: string; preset: string } };
  };
  assert.equal(created.providerSpecificData.quotaEndpoint?.url, "https://oai.example.com/v1/bal");
  assert.equal(created.providerSpecificData.quotaEndpoint?.preset, "standard-credits");
});
