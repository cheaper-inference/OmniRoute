import test from "node:test";
import assert from "node:assert/strict";

import { getMistralUsage } from "../../open-sse/services/usage/mistral.ts";
import { getUsageForProvider } from "../../open-sse/services/usage.ts";
import { USAGE_FETCHER_PROVIDERS } from "../../open-sse/services/usage/fetcherProviders.ts";
import { USAGE_SUPPORTED_PROVIDERS } from "../../open-sse/services/usage/supportedProviders.ts";
import { isSupportedUsageConnection } from "../../src/lib/usage/providerLimits.ts";
import { toProviderLimitsCacheEntry } from "../../src/lib/usage/providerLimitsCache.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("Mistral API-key connections are registered for provider limits", () => {
  assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("mistral"));
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("mistral"));
  assert.equal(
    isSupportedUsageConnection({ id: "mistral-1", provider: "mistral", authType: "apikey" }),
    true
  );
});

test("dispatcher fetches Vibe and API budgets as two quotas without duplicating top-level fields", async () => {
  const requests: Array<{ url: string; init?: RequestInit }> = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    requests.push({ url: String(input), init });
    if (String(input).endsWith("/api/vibe/whoami")) {
      return Response.json({ plan_type: "CHAT", plan_name: "EDU" });
    }
    return new Response(
      JSON.stringify({
        usage_percentage: 99,
        initial_budget: 999,
        vibe_budget: {
          usage_percentage: 25,
          initial_budget: 80,
          currency: "EUR",
          reset_at: "2026-12-01T00:00:00Z",
          payg_enabled: false,
        },
        api_budget: {
          usage_percentage: 12.5,
          initial_budget: 40,
          currency: "USD",
          reset_at: "2027-01-01T00:00:00Z",
          payg_enabled: true,
        },
      }),
      { status: 200 }
    );
  }) as typeof fetch;

  const result = (await getUsageForProvider({
    provider: "mistral",
    apiKey: "mistral-test-key",
  })) as { plan: string; quotas: Record<string, Record<string, unknown>> };

  assert.deepEqual(
    requests.map((request) => request.url),
    ["https://api.mistral.ai/v1/billing/budget", "https://console.mistral.ai/api/vibe/whoami"]
  );
  for (const request of requests) {
    assert.equal(request.init?.method, "GET");
    assert.equal(
      (request.init?.headers as Record<string, string>)?.Authorization,
      "Bearer mistral-test-key"
    );
    assert.ok(request.init?.signal instanceof AbortSignal);
  }
  assert.equal(result.plan, "Student");
  assert.deepEqual(Object.keys(result.quotas), ["vibe_budget", "api_budget"]);
  assert.deepEqual(result.quotas.vibe_budget, {
    displayName: "Vibe budget",
    used: 20,
    total: 80,
    remaining: 60,
    remainingPercentage: 75,
    resetAt: "2026-12-01T00:00:00.000Z",
    currency: "EUR",
    paygEnabled: false,
    unlimited: false,
  });
  assert.deepEqual(result.quotas.api_budget, {
    displayName: "API budget",
    used: 5,
    total: 40,
    remaining: 35,
    remainingPercentage: 87.5,
    resetAt: "2027-01-01T00:00:00.000Z",
    currency: "USD",
    paygEnabled: true,
    unlimited: false,
  });

  const cached = toProviderLimitsCacheEntry(result, "manual");
  assert.deepEqual(Object.keys(cached.quotas ?? {}), ["vibe_budget", "api_budget"]);
  assert.equal(cached.plan, "Student");
});

test("Mistral API plans stay API-scoped and console host can be overridden", async () => {
  const requests: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    requests.push(String(input));
    return String(input).includes("whoami")
      ? Response.json({ plan_type: "API", plan_name: "FREE" })
      : Response.json({ api_budget: { usage_percentage: 0, initial_budget: 10 } });
  }) as typeof fetch;

  const result = await getUsageForProvider({
    provider: "mistral",
    apiKey: "test-key",
    providerSpecificData: { consoleBaseUrl: "https://console.example.test///" },
  });
  assert.equal((result as { plan?: string }).plan, "API Free");
  assert.deepEqual(requests, [
    "https://api.mistral.ai/v1/billing/budget",
    "https://console.example.test/api/vibe/whoami",
  ]);
});

test("Mistral Code plan scope is retained and alternate console setting is supported", async () => {
  const requests: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    requests.push(String(input));
    return String(input).includes("whoami")
      ? Response.json({ plan_type: "MISTRAL_CODE", plan_name: "INDIVIDUAL" })
      : Response.json({ vibe_budget: { usage_percentage: 0, initial_budget: 10 } });
  }) as typeof fetch;

  const result = await getUsageForProvider({
    provider: "mistral",
    apiKey: "test-key",
    providerSpecificData: { mistralConsoleBaseUrl: "https://code.example.test/" },
  });
  assert.equal((result as { plan?: string }).plan, "Mistral Code Pro");
  assert.equal(requests[1], "https://code.example.test/api/vibe/whoami");
});

test("Mistral CHAT tiers use the user subscription name, not a product scope", async () => {
  let name = "FREE";
  globalThis.fetch = (async (input: RequestInfo | URL) =>
    String(input).includes("whoami")
      ? Response.json({ plan_type: "CHAT", plan_name: name })
      : Response.json({
          vibe_budget: { usage_percentage: 0, initial_budget: 10 },
        })) as typeof fetch;

  for (const [planName, expected] of [
    ["FREE", "Free"],
    ["INDIVIDUAL", "Pro"],
    ["EDU", "Student"],
    ["TEAM", "Team"],
  ]) {
    name = planName;
    assert.equal((await getMistralUsage("test-key")).plan, expected);
  }
});

test("unsafe console base URLs fall back to the official host", async () => {
  const requests: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    requests.push(String(input));
    return String(input).includes("whoami")
      ? Response.json({ plan_type: "CHAT", plan_name: "TEAM" })
      : Response.json({ vibe_budget: { usage_percentage: 0, initial_budget: 10 } });
  }) as typeof fetch;

  const result = await getMistralUsage("test-key", {
    consoleBaseUrl: "https://user:password@console.example.test/",
  });
  assert.equal(result.plan, "Team");
  assert.equal(requests[1], "https://console.mistral.ai/api/vibe/whoami");
});

test("failed whoami lookup leaves budget quotas available without leaking response content", async () => {
  globalThis.fetch = (async (input: RequestInfo | URL) =>
    String(input).includes("whoami")
      ? new Response("Bearer test-key", { status: 403 })
      : Response.json({
          api_budget: { usage_percentage: 50, initial_budget: 20 },
        })) as typeof fetch;

  const result = await getMistralUsage("test-key");
  assert.equal(result.quotas?.api_budget.remaining, 10);
  assert.doesNotMatch(JSON.stringify(result), /test-key/);
});

test("only present Mistral budget sections become rows", async () => {
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({ vibe_budget: { usage_percentage: 0, initial_budget: 10, currency: "EUR" } }),
      { status: 200 }
    )) as typeof fetch;

  const result = (await getMistralUsage("test-key")) as {
    quotas: Record<string, Record<string, unknown>>;
  };
  assert.deepEqual(Object.keys(result.quotas), ["vibe_budget"]);
  assert.equal(result.quotas.vibe_budget.remaining, 10);
  assert.equal(result.quotas.vibe_budget.resetAt, null);
});

test("Mistral failures do not expose upstream error content or credentials", async () => {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ message: "Bearer mistral-test-key" }), {
      status: 403,
    })) as typeof fetch;
  assert.deepEqual(await getMistralUsage("mistral-test-key"), {
    message: "Mistral quota API error (403)",
  });

  globalThis.fetch = (async () => {
    throw new Error("Bearer mistral-test-key");
  }) as typeof fetch;
  const result = await getMistralUsage("mistral-test-key");
  assert.ok(result.message);
  assert.doesNotMatch(result.message ?? "", /mistral-test-key/);
});
