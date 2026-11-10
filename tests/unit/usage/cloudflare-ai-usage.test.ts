// Cloudflare Workers AI daily neuron usage (Provider Limits).
//
// Cloudflare has no quota API for Workers AI, so the fetcher sums today's
// neurons from the GraphQL Analytics dataset `aiInferenceAdaptiveGroups`
// and compares them with the documented free allocation (10,000 neurons/day,
// reset 00:00 UTC). These tests pin the request shape, the quota mapping and
// the fail-soft paths (missing account id, auth error, non-200).
import { test } from "node:test";
import assert from "node:assert/strict";

const CF = await import("../../../open-sse/services/usage/cloudflareAi.ts");
const { USAGE_FETCHER_PROVIDERS } =
  await import("../../../open-sse/services/usage/fetcherProviders.ts");
const { USAGE_SUPPORTED_PROVIDERS } =
  await import("../../../open-sse/services/usage/supportedProviders.ts");

type Quota = {
  used: number;
  total: number;
  remaining?: number;
  remainingPercentage?: number;
  resetAt: string | null;
  unlimited: boolean;
};
type UsageResult = { message?: string; plan?: string; quotas?: Record<string, Quota> };

type CapturedCall = { url: string; init: RequestInit };

function withFetch(handler: (url: string, init: RequestInit) => Response | Promise<Response>): {
  calls: CapturedCall[];
  restore: () => void;
} {
  const originalFetch = globalThis.fetch;
  const calls: CapturedCall[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init: RequestInit = {}) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    calls.push({ url, init });
    return handler(url, init);
  }) as typeof fetch;
  return { calls, restore: () => (globalThis.fetch = originalFetch) };
}

function graphqlGroups(groups: Array<{ count: number; neurons: number }>) {
  return new Response(
    JSON.stringify({
      data: {
        viewer: {
          accounts: [
            {
              aiInferenceAdaptiveGroups: groups.map((g) => ({
                count: g.count,
                sum: { totalNeurons: g.neurons },
              })),
            },
          ],
        },
      },
      errors: null,
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function startOfTodayUtcDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function nextUtcMidnightIso(): string {
  const next = new Date();
  next.setUTCHours(24, 0, 0, 0);
  return next.toISOString();
}

test("sums today's neurons against the 10k/day free allocation", async () => {
  const { restore } = withFetch(() =>
    graphqlGroups([
      { count: 7, neurons: 1200 },
      { count: 3, neurons: 300 },
    ])
  );
  try {
    const r = (await CF.getCloudflareAiUsage("cf-token", { accountId: "acc123" })) as UsageResult;
    const neurons = r.quotas?.neurons;
    assert.ok(neurons, "neurons quota present");
    assert.equal(neurons.used, 1500);
    assert.equal(neurons.total, 10_000);
    assert.equal(neurons.remaining, 8500);
    assert.equal(neurons.remainingPercentage, 85);
    assert.equal(neurons.unlimited, false);
    assert.equal(neurons.resetAt, nextUtcMidnightIso());

    const requests = r.quotas?.requests;
    assert.ok(requests, "requests counter present");
    assert.equal(requests.used, 10);
    assert.equal(requests.unlimited, true);

    assert.match(r.plan ?? "", /free tier/i);
  } finally {
    restore();
  }
});

test("sends a parameterized GraphQL query with the bearer token", async () => {
  const { calls, restore } = withFetch(() => graphqlGroups([]));
  try {
    await CF.getCloudflareAiUsage("cf-token", { accountId: "acc123" });
    assert.equal(calls.length, 1);
    const [{ url, init }] = calls;
    assert.equal(url, "https://api.cloudflare.com/client/v4/graphql");
    assert.equal(init.method, "POST");
    const headers = new Headers(init.headers);
    assert.equal(headers.get("authorization"), "Bearer cf-token");
    const body = JSON.parse(String(init.body)) as {
      query: string;
      variables: { accountTag: string; since: string };
    };
    assert.equal(body.variables.accountTag, "acc123");
    assert.equal(body.variables.since, startOfTodayUtcDate());
    assert.match(body.query, /aiInferenceAdaptiveGroups/);
    assert.match(body.query, /date_geq:\s*\$since/);
    // The account id travels only as a variable, never spliced into the query text.
    assert.ok(!body.query.includes("acc123"));
    assert.ok(init.signal, "request is bounded by an abort signal");
  } finally {
    restore();
  }
});

test("honors a dailyNeuronLimit override for paid accounts", async () => {
  const { restore } = withFetch(() => graphqlGroups([{ count: 1, neurons: 15_000 }]));
  try {
    const r = (await CF.getCloudflareAiUsage("cf-token", {
      accountId: "acc123",
      dailyNeuronLimit: 50_000,
    })) as UsageResult;
    assert.equal(r.quotas?.neurons.total, 50_000);
    assert.equal(r.quotas?.neurons.used, 15_000);
    assert.equal(r.quotas?.neurons.remainingPercentage, 70);
  } finally {
    restore();
  }
});

test("missing accountId returns a message without any network call", async () => {
  const { calls, restore } = withFetch(() => graphqlGroups([]));
  try {
    const r = (await CF.getCloudflareAiUsage("cf-token", {})) as UsageResult;
    assert.match(r.message ?? "", /Account ID/i);
    assert.equal(r.quotas, undefined);
    const r2 = (await CF.getCloudflareAiUsage("", { accountId: "acc123" })) as UsageResult;
    assert.match(r2.message ?? "", /API token/i);
    assert.equal(calls.length, 0);
  } finally {
    restore();
  }
});

test("auth failures explain the missing Analytics read permission", async () => {
  const { restore } = withFetch(
    () =>
      new Response(JSON.stringify({ data: null, errors: [{ message: "not authorized" }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
  );
  try {
    const r = (await CF.getCloudflareAiUsage("cf-token", { accountId: "acc123" })) as UsageResult;
    assert.match(r.message ?? "", /Analytics.*Read/i);
  } finally {
    restore();
  }

  const second = withFetch(() => new Response("forbidden", { status: 403 }));
  try {
    const r = (await CF.getCloudflareAiUsage("cf-token", { accountId: "acc123" })) as UsageResult;
    assert.match(r.message ?? "", /Analytics.*Read/i);
  } finally {
    second.restore();
  }
});

test("non-200 responses yield a sanitized message that never echoes the token", async () => {
  const { restore } = withFetch(
    () => new Response("upstream exploded at /srv/app/index.js:1:1 cf-token", { status: 500 })
  );
  try {
    const r = (await CF.getCloudflareAiUsage("cf-token", { accountId: "acc123" })) as UsageResult;
    assert.match(r.message ?? "", /500/);
    assert.ok(!(r.message ?? "").includes("cf-token"));
    assert.ok(!(r.message ?? "").includes("at /"));
  } finally {
    restore();
  }

  const thrown = withFetch(() => {
    throw new Error("network down");
  });
  try {
    const r = (await CF.getCloudflareAiUsage("cf-token", { accountId: "acc123" })) as UsageResult;
    assert.match(r.message ?? "", /Cloudflare/);
    assert.equal(r.quotas, undefined);
  } finally {
    thrown.restore();
  }
});

test("cloudflare-ai is registered in both usage provider lists", () => {
  assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("cloudflare-ai"));
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("cloudflare-ai"));
});

test("the usage dispatcher routes cloudflare-ai to the neuron fetcher", async () => {
  const { getUsageForProvider } = await import("../../../open-sse/services/usage.ts");
  const { calls, restore } = withFetch(() => graphqlGroups([{ count: 2, neurons: 400 }]));
  try {
    const r = (await getUsageForProvider({
      id: "conn-1",
      provider: "cloudflare-ai",
      apiKey: "cf-token",
      providerSpecificData: { accountId: "acc123" },
    })) as UsageResult;
    assert.equal(calls.length, 1);
    assert.equal(r.quotas?.neurons.used, 400);
  } finally {
    restore();
  }
});
