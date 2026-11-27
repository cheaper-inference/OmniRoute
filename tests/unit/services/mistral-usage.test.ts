import assert from "node:assert/strict";
import test from "node:test";

import { fetchJson, getMistralUsage } from "../../../open-sse/services/usage/mistral.ts";

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

const vibeBudget = {
  usage_percentage: 25,
  initial_budget: 10,
  currency: "USD",
  reset_at: "2026-12-01T00:00:00.000Z",
};
const apiBudget = {
  usage_percentage: 40,
  initial_budget: 20,
  currency: "USD",
  reset_at: "2026-12-02T00:00:00.000Z",
};

function mockMistralFetch(whoami: unknown, budget: unknown, whoamiStatus = 200): void {
  globalThis.fetch = async (input: string | URL | Request) => {
    const url = String(input);
    return url.includes("whoami") ? jsonResponse(whoami, whoamiStatus) : jsonResponse(budget);
  };
}

test("CHAT plan selects only the Vibe budget", async () => {
  mockMistralFetch(
    { plan_type: "CHAT", plan_name: "INDIVIDUAL" },
    { vibe_budget: vibeBudget, api_budget: apiBudget }
  );

  const usage = await getMistralUsage("secret-key");

  assert.equal(usage.plan, "Pro");
  assert.deepEqual(Object.keys(usage.quotas ?? {}), ["Vibe Budget"]);
  assert.equal(usage.quotas?.["Vibe Budget"].used, 2.5);
  assert.equal(usage.quotas?.["Vibe Budget"].total, 10);
  assert.equal(usage.quotas?.["Vibe Budget"].remaining, 7.5);
  assert.equal(usage.quotas?.["Vibe Budget"].remainingPercentage, 75);
});

test("API plan selects only the API budget", async () => {
  mockMistralFetch(
    { plan_type: "API", plan_name: "TEAM" },
    { vibe_budget: vibeBudget, api_budget: apiBudget }
  );

  const usage = await getMistralUsage("secret-key");

  assert.equal(usage.plan, "Studio");
  assert.deepEqual(Object.keys(usage.quotas ?? {}), ["API Budget"]);
  assert.equal(usage.quotas?.["API Budget"].used, 8);
  assert.equal(usage.quotas?.["API Budget"].total, 20);
  assert.equal(usage.quotas?.["API Budget"].remaining, 12);
  assert.equal(usage.quotas?.["API Budget"].remainingPercentage, 60);
});

test("known non-CHAT/API plan types select both budgets", async () => {
  mockMistralFetch(
    { plan_type: "HYBRID", plan_name: "FREE" },
    { vibe_budget: vibeBudget, api_budget: apiBudget }
  );

  const usage = await getMistralUsage("secret-key");

  assert.deepEqual(Object.keys(usage.quotas ?? {}), ["Vibe Budget", "API Budget"]);
});

test("plan parsing preserves normalization, labels, and fallback behavior", async (t) => {
  const cases = [
    { whoami: { plan_type: " aPi ", plan_name: "FREE" }, plan: "Studio", keys: ["API Budget"] },
    { whoami: { plan_type: " cHaT ", plan_name: "edu" }, plan: "Student", keys: ["Vibe Budget"] },
    { whoami: { plan_type: "CHAT", plan_name: "custom" }, plan: "CUSTOM", keys: ["Vibe Budget"] },
    { whoami: { plan_type: "CHAT" }, plan: null, keys: ["Vibe Budget"] },
    { whoami: { plan_type: 42, plan_name: 42 }, plan: null, keys: [] },
    { whoami: null, plan: null, keys: [] },
  ];

  for (const { whoami, plan, keys } of cases) {
    await t.test(JSON.stringify(whoami), async () => {
      mockMistralFetch(whoami, { vibe_budget: vibeBudget, api_budget: apiBudget });

      const usage = await getMistralUsage("secret-key");

      assert.equal(usage.plan, plan);
      assert.deepEqual(Object.keys(usage.quotas ?? {}), keys);
    });
  }
});

test("failed whoami lookup creates no enforceable budget windows", async () => {
  globalThis.fetch = async (input: string | URL | Request) => {
    if (String(input).includes("whoami")) throw new Error("network failure");
    return jsonResponse({ vibe_budget: vibeBudget, api_budget: apiBudget });
  };

  const usage = await getMistralUsage("secret-key");

  assert.deepEqual(usage.quotas, {});
});

test("non-OK whoami lookup creates no enforceable budget windows", async () => {
  mockMistralFetch(
    { error: "unauthorized" },
    { vibe_budget: vibeBudget, api_budget: apiBudget },
    401
  );

  const usage = await getMistralUsage("secret-key");

  assert.deepEqual(usage.quotas, {});
});

test("empty plan_type creates no enforceable budget windows", async () => {
  mockMistralFetch(
    { plan_type: "", plan_name: "FREE" },
    { vibe_budget: vibeBudget, api_budget: apiBudget }
  );

  const usage = await getMistralUsage("secret-key");

  assert.deepEqual(usage.quotas, {});
});

test("whitespace-only plan_type creates no enforceable budget windows", async () => {
  mockMistralFetch(
    { plan_type: "   ", plan_name: "FREE" },
    { vibe_budget: vibeBudget, api_budget: apiBudget }
  );

  const usage = await getMistralUsage("secret-key");

  assert.deepEqual(usage.quotas, {});
});

test("absent budget for the selected plan type is omitted", async () => {
  mockMistralFetch({ plan_type: "CHAT" }, { api_budget: apiBudget });

  const usage = await getMistralUsage("secret-key");

  assert.deepEqual(usage.quotas, {});
});

test("both null budgets are omitted", async () => {
  mockMistralFetch({ plan_type: "HYBRID" }, { vibe_budget: null, api_budget: null });

  const usage = await getMistralUsage("secret-key");

  assert.deepEqual(usage.quotas, {});
});

test("fetchJson rejects non-HTTPS URLs before attaching authorization", async () => {
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return jsonResponse({});
  };

  const result = await fetchJson("http://example.com/usage", "secret-key");

  assert.equal(result, null);
  assert.equal(called, false);
});

test("Mistral requests pass the Kilo Code timeout signal and preserve headers", async (t) => {
  const timeoutSignal = new AbortController().signal;
  let timeoutMs: number | undefined;
  t.mock.method(AbortSignal, "timeout", (milliseconds: number) => {
    timeoutMs = milliseconds;
    return timeoutSignal;
  });
  let init: RequestInit | undefined;
  globalThis.fetch = async (_input: string | URL | Request, requestInit?: RequestInit) => {
    init = requestInit;
    return jsonResponse({ ok: true });
  };

  await getMistralUsage("secret-key");

  assert.equal(timeoutMs, 8_000);
  assert.equal(init?.signal, timeoutSignal);
  assert.deepEqual(init?.headers, {
    Authorization: "Bearer secret-key",
    Accept: "application/json",
  });
});

test("response-body read failures follow the null catch path", async () => {
  globalThis.fetch = async (input: string | URL | Request) => {
    if (String(input).includes("whoami")) {
      return jsonResponse({ plan_type: "CHAT" });
    }
    return {
      ok: true,
      json: async () => {
        throw new DOMException("timed out", "AbortError");
      },
    } as Response;
  };

  const usage = await getMistralUsage("secret-key");

  assert.match(usage.message ?? "", /Unable to fetch budget/);
});
