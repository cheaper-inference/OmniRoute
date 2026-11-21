/**
 * #8 (OmniCopilot) — the usage command answered `text/plain`, which a UI cannot
 * parse safely. The structured form (`?format=json`) returns the same
 * `ApiKeyUsageLimitStatus` + `UsageSnapshot` the text is rendered from.
 *
 * These tests pin the contract the extension depends on: JSON when asked,
 * text by default, the 403 as a structured reason rather than a bare string,
 * and an error body that never carries a stack trace.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  handleInternalUsageCommand,
  handleInternalUsageCommandHttpRequest,
} from "../../src/lib/usage/internalUsageCommand";

const NOW = Date.parse("2026-08-19T12:00:00.000Z");

const LIMIT_STATUS = {
  enabled: true,
  dailyLimitUsd: 5,
  weeklyLimitUsd: 20,
  dailySpentUsd: 1.25,
  weeklySpentUsd: 8,
  dailyWindowStartIso: "2026-08-19T03:00:00.000Z",
  dailyResetAtIso: "2026-08-20T03:00:00.000Z",
  weeklyWindowStartIso: "2026-08-16T03:00:00.000Z",
  weeklyResetAtIso: "2026-08-23T03:00:00.000Z",
  dailyExceeded: false,
  weeklyExceeded: false,
};

function allowedDeps(overrides: Record<string, unknown> = {}) {
  return {
    now: () => NOW,
    isValidApiKey: async (apiKey: string) => apiKey === "sk-allowed",
    // The panel key is explicitly granted the shared-account view; a plain
    // client key (self:usage only) is covered by the tests at the bottom.
    getApiKeyMetadata: async () => ({
      id: "key-allowed",
      name: "panel key",
      allowUsageCommand: true,
      usageLimitEnabled: true,
      scopes: ["self:usage", "self:account-quota"],
    }),
    getProviderConnections: async () => [
      { id: "conn-claude", provider: "claude", isActive: true },
      { id: "conn-codex", provider: "codex", isActive: true },
    ],
    getAllProviderLimitsCache: () => ({
      "conn-claude": {
        plan: "Claude Max",
        quotas: {
          weekly: { used: 25, total: 100, remaining: 75, resetAt: "2026-08-25T03:00:00.000Z" },
        },
        message: null,
        fetchedAt: new Date(NOW).toISOString(),
      },
      "conn-codex": {
        plan: "Codex Pro",
        quotas: {
          weekly: { used: 9, total: 100, remaining: 91, resetAt: "2026-08-24T03:00:00.000Z" },
        },
        message: null,
        fetchedAt: new Date(NOW).toISOString(),
      },
    }),
    getProviderConnectionById: async () => null,
    getProviderLimitsCache: () => null,
    getQuotaPolicy: async () => ({ defaultThresholdPercent: 0, providerWindowDefaults: {} }),
    getApiKeyUsageLimitStatus: async () => LIMIT_STATUS,
    ...overrides,
  };
}

test("om-usage ?format=json returns the structured personal + provider quota", async () => {
  const response = await handleInternalUsageCommandHttpRequest(
    new Request("http://localhost/api/usage/om-usage?format=json", {
      headers: { Authorization: "Bearer sk-allowed" },
    }),
    allowedDeps()
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /application\/json/);
  const body = (await response.json()) as {
    allowed: boolean;
    personal: { dailySpentUsd: number } | null;
    provider: { provider: string; connectionId: string } | null;
  };
  assert.equal(body.allowed, true);
  assert.equal(body.personal?.dailySpentUsd, 1.25);
  assert.equal(body.provider?.provider, "claude");
  assert.equal(body.provider?.connectionId, "conn-claude");
});

test("om-usage without ?format stays text/plain (the historical contract)", async () => {
  const response = await handleInternalUsageCommandHttpRequest(
    new Request("http://localhost/api/usage/om-usage", {
      headers: { Authorization: "Bearer sk-allowed" },
    }),
    allowedDeps()
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /text\/plain/);
  const text = await response.text();
  assert.match(text, /Personal quota/);
  assert.match(text, /Provider quota/);
});

test("om-usage ?format=json returns every connection under providers[], not just the selected one", async () => {
  // #11191 — a panel needs Codex + Claude side by side; the single `provider`
  // pick is a terminal presentation choice, the collector had them all.
  const response = await handleInternalUsageCommandHttpRequest(
    new Request("http://localhost/api/usage/om-usage?format=json", {
      headers: { Authorization: "Bearer sk-allowed" },
    }),
    allowedDeps()
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    allowed: boolean;
    provider: { provider: string } | null;
    providers: Array<{ provider: string }>;
  };
  assert.equal(body.allowed, true);
  const names = body.providers.map((s) => s.provider).sort();
  assert.deepEqual(names, ["claude", "codex"]);
  // the single-pick field is still present and one of them
  assert.ok(["claude", "codex"].includes(body.provider?.provider ?? ""));
});

test("om-usage ?format=json reports a disallowed key as structured allowed:false", async () => {
  // A usage panel must tell "this key may not ask" apart from "no data yet",
  // which a bare 403 text body cannot express.
  const response = await handleInternalUsageCommandHttpRequest(
    new Request("http://localhost/api/usage/om-usage?format=json", {
      headers: { Authorization: "Bearer sk-allowed" },
    }),
    allowedDeps({
      getApiKeyMetadata: async () => ({ id: "key-off", allowUsageCommand: false }),
    })
  );

  assert.equal(response.status, 403);
  const body = (await response.json()) as { allowed: boolean };
  assert.equal(body.allowed, false);
});

test("om-usage ?format=json rejects an invalid key and never leaks a stack trace", async () => {
  const response = await handleInternalUsageCommandHttpRequest(
    new Request("http://localhost/api/usage/om-usage?format=json", {
      headers: { Authorization: "Bearer sk-wrong" },
    }),
    allowedDeps()
  );

  assert.equal(response.status, 401);
  const body = (await response.json()) as { allowed: boolean; error?: { message?: string } };
  assert.equal(body.allowed, false);
  assert.ok(
    !body.error?.message?.includes("at /"),
    "error bodies must not carry stack frames (ERROR_SANITIZATION)"
  );
});

test("om-usage preserves raw quota in json while text scales remaining quota by cutoff", async () => {
  // #15530 — Clarify raw vs cutoff-adjusted usage percentages contract:
  // For 60% raw usage and a 25% cutoff, raw remaining is 40%, whereas
  // cutoff-adjusted remaining is (40 - 25) / (100 - 25) * 100 = 20% left.
  const customDeps = allowedDeps({
    getProviderConnections: async () => [
      {
        id: "conn-claude",
        provider: "claude",
        isActive: true,
        quotaWindowThresholds: { "weekly (7d)": 25 },
      },
    ],
    getAllProviderLimitsCache: () => ({
      "conn-claude": {
        plan: "Claude Max",
        quotas: {
          "weekly (7d)": {
            used: 60,
            total: 100,
            remaining: 40,
            resetAt: "2026-08-25T03:00:00.000Z",
          },
        },
        message: null,
        fetchedAt: new Date(NOW).toISOString(),
      },
    }),
  });

  // 1. JSON format returns raw snapshot quotas and connection thresholds
  const jsonResponse = await handleInternalUsageCommandHttpRequest(
    new Request("http://localhost/api/usage/om-usage?format=json", {
      headers: { Authorization: "Bearer sk-allowed" },
    }),
    customDeps
  );
  assert.equal(jsonResponse.status, 200);
  const body = (await jsonResponse.json()) as {
    allowed: boolean;
    provider: {
      quotas: Record<string, { used: number; total: number; remaining: number }>;
      quotaWindowThresholds: Record<string, number> | null;
    } | null;
  };
  assert.equal(body.allowed, true);
  assert.equal(body.provider?.quotas["weekly (7d)"]?.used, 60);
  assert.equal(body.provider?.quotas["weekly (7d)"]?.remaining, 40);
  assert.deepEqual(body.provider?.quotaWindowThresholds, { "weekly (7d)": 25 });

  // 2. Text format computes cutoff-adjusted remaining: (40 - 25) / (100 - 25) * 100 = 20% left
  const textResponse = await handleInternalUsageCommandHttpRequest(
    new Request("http://localhost/api/usage/om-usage", {
      headers: { Authorization: "Bearer sk-allowed" },
    }),
    customDeps
  );
  assert.equal(textResponse.status, 200);
  const text = await textResponse.text();
  assert.match(text, /Weekly/);
  assert.match(text, /20% left/);
});

// A client key with the usage command could read, through ?format=json, every
// shared provider account: connection ids, plan, raw quota and resets. Those
// belong to the operator, not to the key holder.
function failingProviderCollectors() {
  const fail = () => {
    throw new Error("provider accounts must not be read for this key");
  };
  return {
    getProviderConnections: async () => fail(),
    getAllProviderLimitsCache: () => fail(),
    getProviderConnectionById: async () => fail(),
    getProviderLimitsCache: () => fail(),
  };
}

for (const [label, scopes] of [
  ["a plain client key (self:usage only)", ["self:usage"]],
  ["a key whose metadata carries no scopes", undefined],
] as const) {
  test(`om-usage ?format=json hides the shared provider accounts from ${label}`, async () => {
    const response = await handleInternalUsageCommandHttpRequest(
      new Request("http://localhost/api/usage/om-usage?format=json", {
        headers: { Authorization: "Bearer sk-allowed" },
      }),
      allowedDeps({
        getApiKeyMetadata: async () => ({
          id: "key-client",
          name: "client key",
          allowUsageCommand: true,
          usageLimitEnabled: true,
          ...(scopes ? { scopes: [...scopes] } : {}),
        }),
        ...failingProviderCollectors(),
      })
    );

    assert.equal(response.status, 200);
    const body = (await response.json()) as {
      allowed: boolean;
      personal: { weeklySpentUsd: number } | null;
      provider: unknown;
      providers: unknown[];
    };
    assert.equal(body.allowed, true);
    assert.equal(body.personal?.weeklySpentUsd, 8);
    assert.equal(body.provider, null);
    assert.deepEqual(body.providers, []);
    assert.doesNotMatch(JSON.stringify(body), /conn-claude|conn-codex|Claude Max|Codex Pro/);
  });
}

test("om-usage ?format=json still shows the shared accounts to a management key", async () => {
  const response = await handleInternalUsageCommandHttpRequest(
    new Request("http://localhost/api/usage/om-usage?format=json", {
      headers: { Authorization: "Bearer sk-allowed" },
    }),
    allowedDeps({
      getApiKeyMetadata: async () => ({
        id: "key-admin",
        name: "operator key",
        allowUsageCommand: true,
        usageLimitEnabled: false,
        scopes: ["manage", "self:usage"],
      }),
    })
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as { providers: Array<{ provider: string }> };
  assert.deepEqual(body.providers.map((s) => s.provider).sort(), ["claude", "codex"]);
});

// The text form (`@@om-usage`, plain GET without ?format) applies the same rule:
// a key without `self:account-quota` and without a management scope sees only
// its personal quota, and the shared accounts are never read for it.
function clientKeyMetadata(
  scopes: readonly string[] | undefined,
  overrides: Record<string, unknown> = {}
) {
  return {
    id: "key-client",
    name: "client key",
    allowUsageCommand: true,
    usageLimitEnabled: true,
    ...(scopes ? { scopes: [...scopes] } : {}),
    ...overrides,
  };
}

for (const [label, scopes] of [
  ["a plain client key (self:usage only)", ["self:usage"]],
  ["a key whose metadata carries no scopes", undefined],
] as const) {
  test(`om-usage text hides the shared provider accounts from ${label}`, async () => {
    const response = await handleInternalUsageCommandHttpRequest(
      new Request("http://localhost/api/usage/om-usage", {
        headers: { Authorization: "Bearer sk-allowed" },
      }),
      allowedDeps({
        getApiKeyMetadata: async () => clientKeyMetadata(scopes),
        ...failingProviderCollectors(),
      })
    );

    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /text\/plain/);
    const text = await response.text();
    assert.match(text, /^Personal quota\n/);
    assert.doesNotMatch(text, /Provider quota/);
  });

  test(`@@om-usage in chat hides the shared provider accounts from ${label}`, async () => {
    const response = await handleInternalUsageCommand(
      new Request("http://localhost/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: "Bearer sk-allowed" },
      }),
      { model: "claude-opus-4-8", messages: [{ role: "user", content: "@@om-usage" }] },
      allowedDeps({
        getApiKeyMetadata: async () => clientKeyMetadata(scopes),
        ...failingProviderCollectors(),
      })
    );

    assert.ok(response, "command should be handled locally");
    assert.equal(response.status, 200);
    const body = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    const text = body.choices[0].message.content;
    assert.match(text, /^Personal quota\n/);
    assert.doesNotMatch(text, /Provider quota/);
  });
}

test("om-usage text without personal limits or shared access reads no provider account", async () => {
  const response = await handleInternalUsageCommandHttpRequest(
    new Request("http://localhost/api/usage/om-usage", {
      headers: { Authorization: "Bearer sk-allowed" },
    }),
    allowedDeps({
      getApiKeyMetadata: async () =>
        clientKeyMetadata(["self:usage"], { usageLimitEnabled: false }),
      getApiKeyUsageLimitStatus: async () => {
        throw new Error("usage limit lookup must not run without per-key limits");
      },
      ...failingProviderCollectors(),
    })
  );

  assert.equal(response.status, 200);
  const text = await response.text();
  assert.equal(text, "Personal quota\nNo personal usage limits configured for this API key.");
});

for (const [label, scopes] of [
  ["a key granted self:account-quota", ["self:usage", "self:account-quota"]],
  ["a management key", ["manage"]],
] as const) {
  test(`om-usage text still shows the provider quota to ${label}`, async () => {
    const response = await handleInternalUsageCommandHttpRequest(
      new Request("http://localhost/api/usage/om-usage", {
        headers: { Authorization: "Bearer sk-allowed" },
      }),
      allowedDeps({
        getApiKeyMetadata: async () => clientKeyMetadata(scopes),
      })
    );

    assert.equal(response.status, 200);
    const text = await response.text();
    assert.match(text, /Personal quota/);
    assert.match(text, /Provider quota\nSession\n/);
  });
}
