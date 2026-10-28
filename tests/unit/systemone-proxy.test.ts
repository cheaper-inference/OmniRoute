/**
 * System One decision proxy: dispatch, accounting and failure handling.
 *
 * Every upstream outcome is asserted through injected collaborators, so no test
 * here touches the network, the provider store or the usage tables. The rules
 * being locked in: usage/cost is written exactly once per request through the
 * existing writers, a provider/account failure cools down the selected
 * connection while a caller-shape error does not, upstream error text is
 * sanitized (it can echo the caller's state or the operator's key), and a
 * free-tier model is never dispatched on a paid account.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  handleSystemOneProxy,
  type SystemOneProxyDeps,
} from "../../open-sse/handlers/systemOne.ts";

const STATE = "patient record: Jane Doe, diagnosed with a secret condition";
const UPSTREAM_KEY = "sk-live-operator-key";

const ANSWER_BODY = {
  model: "typesafe/jev-1.13",
  answers: {
    urgent: { type: "noul", noul: 0.9 },
  },
  usage: { input_tokens: 100, output_tokens: 2 },
};

type Recorded = {
  callLogs: Record<string, unknown>[];
  usage: Record<string, unknown>[];
  costs: { apiKeyId: string; costUsd: number; details: Record<string, unknown> }[];
  cooldowns: Record<string, unknown>[];
  requests: { url: string; init: RequestInit; credentials: Record<string, unknown> }[];
};

function recorder() {
  const recorded: Recorded = {
    callLogs: [],
    usage: [],
    costs: [],
    cooldowns: [],
    requests: [],
  };
  return recorded;
}

function deps(
  recorded: Recorded,
  respond: (url: string, init: RequestInit) => Promise<Response>,
  overrides: Partial<SystemOneProxyDeps> = {}
): SystemOneProxyDeps {
  return {
    withCapacity: async (_options, _signal, run) => run(),
    fetchSystemOne: async (url, credentials, init) => {
      recorded.requests.push({ url, init, credentials: credentials as Record<string, unknown> });
      return respond(url, init);
    },
    saveCallLog: async (entry) => {
      recorded.callLogs.push(entry as Record<string, unknown>);
    },
    saveRequestUsage: async (entry) => {
      recorded.usage.push(entry as Record<string, unknown>);
    },
    recordCost: (apiKeyId, costUsd, details) => {
      recorded.costs.push({ apiKeyId, costUsd, details: details as Record<string, unknown> });
    },
    markAccountUnavailable: async (connectionId, status, errorText, provider, model) => {
      recorded.cooldowns.push({ connectionId, status, errorText, provider, model });
    },
    calculateCost: async () => ({ costUsd: 0, priced: false }),
    ...overrides,
  };
}

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(typeof body === "string" ? body : JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

function options(overrides: Record<string, unknown> = {}) {
  return {
    provider: "openrouter",
    body: {
      model: "typesafe/jev-1.13",
      state: STATE,
      questions: { urgent: { type: "noul", instructions: "Is this urgent?" } },
    },
    requestedModel: "jev-1.13",
    canonicalModel: "openrouter/typesafe/jev-1.13",
    tier: "paid" as const,
    credentials: { connectionId: "conn-1", apiKey: UPSTREAM_KEY },
    apiKeyInfo: { id: "key-1", name: "dash key" },
    correlationId: "corr-1",
    ...overrides,
  };
}

test("a successful decision is returned with its answers and accounted once", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(recorded, async () => jsonResponse(ANSWER_BODY))
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as typeof ANSWER_BODY;
  assert.equal(body.answers.urgent.type, "noul");
  assert.equal(body.answers.urgent.noul, 0.9);

  assert.equal(recorded.requests.length, 1);
  assert.equal(recorded.requests[0].url, "https://openrouter.ai/api/v1/systemone");
  assert.equal(JSON.parse(String(recorded.requests[0].init.body)).model, "typesafe/jev-1.13");

  assert.equal(recorded.usage.length, 1, "usage must be written exactly once");
  assert.equal(recorded.callLogs.length, 1, "the call must be logged exactly once");
  assert.deepEqual(
    {
      provider: recorded.usage[0].provider,
      model: recorded.usage[0].model,
      connectionId: recorded.usage[0].connectionId,
      apiKeyId: recorded.usage[0].apiKeyId,
      endpoint: recorded.usage[0].endpoint,
      success: recorded.usage[0].success,
    },
    {
      provider: "openrouter",
      model: "typesafe/jev-1.13",
      connectionId: "conn-1",
      apiKeyId: "key-1",
      endpoint: "/v1/systemone",
      success: true,
    }
  );
  assert.equal(recorded.callLogs[0].path, "/v1/systemone");
  assert.equal(recorded.callLogs[0].requestType, "systemone");
  assert.equal(recorded.callLogs[0].provider, "openrouter");
  assert.equal(recorded.callLogs[0].requestedModel, "jev-1.13");
  assert.equal(recorded.callLogs[0].connectionId, "conn-1");
  assert.equal(recorded.callLogs[0].correlationId, "corr-1");
  assert.equal(recorded.callLogs[0].status, 200);
  assert.deepEqual(recorded.callLogs[0].tokens, { prompt_tokens: 100, completion_tokens: 2 });
});

test("the response carries the OmniRoute meta headers and a correlation id", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(recorded, async () => jsonResponse(ANSWER_BODY))
  );
  assert.equal(response.headers.get("X-OmniRoute-Provider"), "openrouter");
  assert.equal(response.headers.get("X-OmniRoute-Model"), "openrouter/typesafe/jev-1.13");
  assert.equal(response.headers.get("X-OmniRoute-Cost-Status"), "unknown");
  assert.equal(response.headers.get("X-OmniRoute-Response-Cost"), null);
});

test("an upstream-reported cost is recorded against the downstream API key", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(recorded, async () =>
      jsonResponse({ ...ANSWER_BODY, usage: { input_tokens: 10, output_tokens: 1, cost: 0.0004 } })
    )
  );
  assert.equal(response.headers.get("X-OmniRoute-Cost-Status"), "known");
  assert.equal(recorded.costs.length, 1);
  assert.equal(recorded.costs[0].apiKeyId, "key-1");
  assert.equal(recorded.costs[0].costUsd, 0.0004);
  assert.equal(recorded.costs[0].details.provider, "openrouter");
  assert.equal(recorded.costs[0].details.model, "openrouter/typesafe/jev-1.13");
});

test("a reported zero cost is recorded as a known zero", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(recorded, async () =>
      jsonResponse({ ...ANSWER_BODY, usage: { input_tokens: 10, output_tokens: 1, cost: 0 } })
    )
  );
  assert.equal(response.headers.get("X-OmniRoute-Cost-Status"), "known");
  assert.equal(recorded.costs.length, 1);
  assert.equal(recorded.costs[0].costUsd, 0);
});

test("without a reported cost the existing pricing resolver decides, else unknown", async () => {
  const priced = recorder();
  const pricedResponse = await handleSystemOneProxy(
    options(),
    deps(priced, async () => jsonResponse(ANSWER_BODY), {
      calculateCost: async () => ({ costUsd: 0.000042, priced: true }),
    })
  );
  assert.equal(pricedResponse.headers.get("X-OmniRoute-Cost-Status"), "known");
  assert.equal(priced.costs[0].costUsd, 0.000042);

  const unpriced = recorder();
  const unpricedResponse = await handleSystemOneProxy(
    options(),
    deps(unpriced, async () => jsonResponse(ANSWER_BODY))
  );
  assert.equal(unpricedResponse.headers.get("X-OmniRoute-Cost-Status"), "unknown");
  assert.equal(unpriced.costs.length, 0, "an unknown cost is not billed as zero");
  assert.equal(unpriced.usage.length, 1, "usage is still recorded for the budget paths");
});

test("a 401 cools down the selected connection and records unknown failed usage", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(recorded, async () => jsonResponse({ error: { message: "invalid key" } }, 401))
  );
  assert.equal(response.status, 401);
  assert.equal(recorded.usage.length, 1, "an issued failure still has an unknown billing outcome");
  assert.equal(recorded.usage[0].success, false);
  assert.equal((recorded.usage[0].tokens as Record<string, unknown>).prompt_tokens, null);
  assert.equal(recorded.costs.length, 0);
  assert.equal(recorded.callLogs.length, 1);
  assert.equal(recorded.callLogs[0].status, 401);
  assert.equal(recorded.cooldowns.length, 1);
  assert.equal(recorded.cooldowns[0].connectionId, "conn-1");
  assert.equal(recorded.cooldowns[0].status, 401);
  assert.equal(recorded.cooldowns[0].model, "typesafe/jev-1.13");
});

test("a 403 is surfaced as 403 — a restricted free tier is not reported as success", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options({
      provider: "opencode-zen",
      tier: "free",
      credentials: {
        connectionId: "conn-free",
        apiKey: ["fixture", "free", "key"].join("-"),
        providerSpecificData: { systemOneTier: "free" },
      },
    }),
    deps(recorded, async () => jsonResponse({ error: "FreeTierError" }, 403))
  );
  assert.equal(response.status, 403);
  assert.equal(recorded.usage.length, 1);
  assert.equal(recorded.usage[0].success, false);
  assert.equal(recorded.cooldowns.length, 0);
  assert.equal((await response.json()).error.code, "upstream_request_error");
});

test("a 402 out-of-credits response cools the connection down", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(recorded, async () => jsonResponse({ error: { message: "no credits" } }, 402))
  );
  assert.equal(response.status, 402);
  assert.equal(recorded.cooldowns.length, 1);
});

test("a 429 preserves retry-after without inferring account-specific quota", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(recorded, async () =>
      jsonResponse({ error: { message: "slow down" } }, 429, { "retry-after": "37" })
    )
  );
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "37");
  assert.equal(recorded.cooldowns.length, 0);
});

test("a missing requested answer is rejected without recording successful usage", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(recorded, async () =>
      jsonResponse({ answers: { unrelated: { type: "noul", noul: 0.9 } } })
    )
  );
  assert.equal(response.status, 502);
  assert.equal(recorded.usage.length, 1);
  assert.equal(recorded.usage[0].success, false);
});

test("a 5xx cools the connection down, a 422 request-shape error does not", async () => {
  const serverError = recorder();
  const serverResponse = await handleSystemOneProxy(
    options(),
    deps(serverError, async () => jsonResponse({ message: "upstream exploded" }, 503))
  );
  assert.equal(serverResponse.status, 503);
  assert.equal(serverError.cooldowns.length, 1);

  const shapeError = recorder();
  const shapeResponse = await handleSystemOneProxy(
    options(),
    deps(shapeError, async () => jsonResponse({ message: "criteria too long" }, 422))
  );
  assert.equal(shapeResponse.status, 422);
  assert.equal(shapeError.cooldowns.length, 0, "the caller's body is not the account's fault");
});

test("upstream error text never leaks the request state or the operator credential", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(recorded, async () =>
      jsonResponse(
        {
          error: {
            message: `rejected state "${STATE}" with key ${UPSTREAM_KEY} at /srv/app/handler.ts:12`,
          },
        },
        400
      )
    )
  );
  const body = (await response.json()) as { error?: { message?: string } };
  const message = String(body.error?.message ?? "");
  assert.doesNotMatch(message, /Jane Doe/);
  assert.doesNotMatch(message, /sk-live-operator-key/);
  assert.doesNotMatch(message, /\/srv\/app/);
  const logged = String(recorded.callLogs[0].error ?? "");
  assert.doesNotMatch(logged, /sk-live-operator-key/);
});

test("an identifier-shaped upstream error cannot echo an opaque credential", async () => {
  const credential = "opaque-provider-credential";
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options({ credentials: { apiKey: credential, connectionId: "fixture" } }),
    deps(recorded, async () => jsonResponse({ error: { code: credential } }, 401))
  );
  assert.doesNotMatch(await response.text(), new RegExp(credential));
  assert.doesNotMatch(String(recorded.callLogs[0].error), new RegExp(credential));
});

test("a success body that answers nothing is a 502, not an empty decision", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(recorded, async () => jsonResponse({ model: "jev", answers: {} }))
  );
  assert.equal(response.status, 502);
  assert.equal(recorded.usage.length, 1);
  assert.equal(recorded.usage[0].success, false);
  assert.equal(recorded.callLogs.length, 1);
  assert.equal(recorded.callLogs[0].status, 502);
});

test("a non-JSON success body is a 502", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(recorded, async () => jsonResponse("<html>gateway</html>"))
  );
  assert.equal(response.status, 502);
});

test("an upstream timeout answers 504 and cools the connection down", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options({ timeoutMs: 5 }),
    deps(
      recorded,
      (_url, init) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => {
            const error = new Error("aborted");
            error.name = "TimeoutError";
            reject(error);
          });
        })
    )
  );
  assert.equal(response.status, 504);
  const body = (await response.json()) as { error?: { message?: string } };
  assert.match(String(body.error?.message), /timed out/i);
  assert.equal(recorded.cooldowns.length, 1);
  assert.equal(recorded.usage.length, 1);
  assert.equal((recorded.usage[0].tokens as Record<string, unknown>).prompt_tokens, null);
});

test("a caller cancellation answers 499 and does not blame the connection", async () => {
  const recorded = recorder();
  const controller = new AbortController();
  const pending = handleSystemOneProxy(
    options({ signal: controller.signal }),
    deps(
      recorded,
      (_url, init) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => reject(new Error("aborted by caller")));
        })
    )
  );
  controller.abort();
  const response = await pending;
  assert.equal(response.status, 499);
  assert.equal(recorded.cooldowns.length, 0, "the caller hung up; the account is healthy");
  assert.equal(recorded.usage.length, 1);
  assert.equal((recorded.usage[0].tokens as Record<string, unknown>).prompt_tokens, null);
  assert.equal(recorded.callLogs.length, 1, "the upstream attempt still needs attribution");
  assert.equal(recorded.callLogs[0].status, 499);
});

test("a transport failure answers 502 and cools the connection down", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(recorded, async () => {
      throw new Error("ECONNRESET at /srv/app/net.ts:4");
    })
  );
  assert.equal(response.status, 502);
  const body = (await response.json()) as { error?: { message?: string } };
  assert.doesNotMatch(String(body.error?.message), /\/srv\/app/);
  assert.equal((body.error as { code?: string }).code, "upstream_error");
  assert.equal(recorded.cooldowns.length, 1);
});

test("a rejected endpoint override is a configuration error, not an unhealthy account", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options({
      credentials: {
        connectionId: "conn-1",
        apiKey: UPSTREAM_KEY,
        providerSpecificData: { systemOneUrl: "https://evil.example.com/systemone" },
      },
    }),
    deps(recorded, async () => jsonResponse(ANSWER_BODY))
  );
  assert.equal(response.status, 400);
  assert.equal(recorded.requests.length, 0, "no request may leave for a non-allowlisted host");
  assert.equal(recorded.cooldowns.length, 0);
});

test("missing or sentinel credentials are rejected before any upstream call", async () => {
  for (const credentials of [
    null,
    {},
    { allRateLimited: true },
    { allExpired: true },
    { blockedByKeyPolicy: true },
    { apiKey: "   ", connectionId: "synthetic-blank-key" },
    { accessToken: "\n\t", connectionId: "synthetic-blank-token" },
    { apiKey: 123, connectionId: "synthetic-wrong-type" },
  ]) {
    const recorded = recorder();
    const response = await handleSystemOneProxy(
      options({ credentials }),
      deps(recorded, async () => jsonResponse(ANSWER_BODY))
    );
    assert.equal(response.status, 401, `dispatched with ${JSON.stringify(credentials)}`);
    assert.equal(recorded.requests.length, 0);
    assert.equal(recorded.usage.length, 0);
  }
});

test("a tagged free-tier OpenCode key authenticates while a keyless connection is rejected", async () => {
  const credential = ["zen", "free", "fixture"].join("-");
  const free = recorder();
  const freeResponse = await handleSystemOneProxy(
    options({
      provider: "opencode-zen",
      tier: "free",
      canonicalModel: "opencode-zen/jev-1.13-free",
      body: {
        model: "jev-1.13-free",
        state: STATE,
        questions: { urgent: { type: "noul", instructions: "Is this urgent?" } },
      },
      credentials: {
        connectionId: "conn-free",
        apiKey: credential,
        providerSpecificData: { systemOneTier: "free" },
      },
    }),
    deps(free, async () => jsonResponse(ANSWER_BODY))
  );
  assert.equal(freeResponse.status, 200);
  assert.equal(free.requests.length, 1);
  assert.equal(
    (free.requests[0].init.headers as Record<string, string>).Authorization,
    `Bearer ${credential}`
  );

  const keyless = recorder();
  const keylessResponse = await handleSystemOneProxy(
    options({
      provider: "opencode-zen",
      tier: "free",
      canonicalModel: "opencode-zen/jev-1.13-free",
      credentials: {
        connectionId: "conn-keyless",
        apiKey: null,
        providerSpecificData: { systemOneTier: "free" },
      },
    }),
    deps(keyless, async () => jsonResponse(ANSWER_BODY))
  );
  assert.equal(keylessResponse.status, 401);
  assert.equal(keyless.requests.length, 0);
});

test("a free-tier model is never dispatched on a paid account", async () => {
  const recorded = recorder();
  const response = await handleSystemOneProxy(
    options({
      provider: "opencode-zen",
      tier: "free",
      canonicalModel: "opencode-zen/jev-1.13-free",
      body: {
        model: "jev-1.13-free",
        state: STATE,
        questions: { urgent: { type: "noul", instructions: "Is this urgent?" } },
      },
      credentials: { connectionId: "conn-paid", apiKey: "sk-paid-zen-account" },
    }),
    deps(recorded, async () => jsonResponse(ANSWER_BODY))
  );
  assert.equal(response.status, 403);
  assert.equal(recorded.requests.length, 0, "the free alias must not bill a paid account");
  assert.equal(recorded.cooldowns.length, 0);
});

test("RFC9457 native diagnostics preserve the cause while redacting request/account values", async () => {
  const r = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(r, async () =>
      jsonResponse(
        {
          title: "FreeUsageLimitError",
          detail: `Free usage limit reached. key=${UPSTREAM_KEY}; account=conn-1; request=${STATE}`,
          type: "https://errors.example.invalid/problems/free-usage-limit?account=private-user",
        },
        429
      )
    )
  );
  const body = await response.json();
  assert.match(body.error.message, /FreeUsageLimitError/);
  assert.match(body.error.message, /Free usage limit reached/);
  const text = JSON.stringify(body);
  assert.doesNotMatch(text, /sk-live-operator-key|conn-1|Jane Doe|private-user/);
  assert.equal(response.headers.get("x-omniroute-provider-error-kind"), "unknown");
  assert.equal(response.headers.get("x-omniroute-provider-auth-scope"), "unknown");
});

test("Cloudflare1010 native denial is useful and never marks a credential invalid", async () => {
  const r = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(
      r,
      async () =>
        new Response(
          "<html><title>Access denied</title><h1>Cloudflare error 1010</h1><p>private edge trace</p></html>",
          { status: 403, headers: { "content-type": "text/html" } }
        )
    )
  );
  assert.equal(response.status, 403);
  const text = await response.text();
  assert.match(text, /Cloudflare|1010/);
  assert.doesNotMatch(text, /<html>|private edge trace|invalid key/i);
  assert.equal(r.cooldowns.length, 0);
  assert.equal(r.requests.length, 1);
  assert.equal(response.headers.get("x-omniroute-provider-error-kind"), "edge");
});

for (const reportedCost of [0, 0.00012, null]) {
  test(`failed native response preserves explicit usage and cost ${reportedCost}`, async () => {
    const r = recorder();
    const response = await handleSystemOneProxy(
      options(),
      deps(r, async () =>
        jsonResponse(
          {
            title: "FreeUsageLimitError",
            detail: "Free usage limit reached.",
            usage: {
              input_tokens: 4,
              output_tokens: 0,
              ...(reportedCost === null ? {} : { cost: reportedCost }),
            },
          },
          429
        )
      )
    );
    assert.equal(response.status, 429);
    assert.equal(r.requests.length, 1);
    assert.equal(r.callLogs.length, 1);
    assert.equal(r.usage.length, 1);
    assert.equal(r.usage[0].success, false);
    const tokens = r.usage[0].tokens as Record<string, unknown>;
    assert.equal(tokens.prompt_tokens, 4);
    assert.equal(tokens.completion_tokens, 0);
    assert.equal(tokens.cost_usd, reportedCost ?? undefined);
    assert.equal(r.costs.length, reportedCost === null ? 0 : 1);
    if (reportedCost !== null) assert.equal(r.costs[0].costUsd, reportedCost);
  });
}

test("a zero failure charge remains known even when token counts are absent", async () => {
  const r = recorder();
  const response = await handleSystemOneProxy(
    options(),
    deps(r, async () =>
      jsonResponse(
        {
          error: { message: "Free usage limit reached." },
          usage: { cost: 0 },
        },
        429
      )
    )
  );
  assert.equal(response.headers.get("x-omniroute-cost-status"), "known");
  assert.equal(response.headers.get("x-omniroute-response-cost"), "0");
  assert.equal(r.usage.length, 1);
  assert.equal((r.usage[0].tokens as Record<string, unknown>).prompt_tokens, null);
  assert.equal((r.usage[0].tokens as Record<string, unknown>).completion_tokens, null);
  assert.equal(r.costs[0].costUsd, 0);
});

test("ordinary OpenRouter key may execute the exact free SKU without paid fallback", async () => {
  const r = recorder();
  const response = await handleSystemOneProxy(
    options({
      tier: "free",
      canonicalModel: "openrouter/typesafe/jev-1.13:free",
      body: {
        model: "typesafe/jev-1.13:free",
        state: "synthetic",
        questions: { urgent: { type: "noul", instructions: "Synthetic?" } },
      },
    }),
    deps(r, async (_url, init) => {
      assert.equal(JSON.parse(String(init.body)).model, "typesafe/jev-1.13:free");
      return jsonResponse(ANSWER_BODY);
    })
  );
  assert.equal(response.status, 200);
  assert.equal(r.requests.length, 1);
  const denied = recorder();
  const rejection = await handleSystemOneProxy(
    options({
      tier: "paid",
      credentials: { apiKey: "synthetic-key", providerSpecificData: { systemOneTier: "free" } },
    }),
    deps(denied, async () => jsonResponse(ANSWER_BODY))
  );
  assert.equal(rejection.status, 401);
  assert.equal(denied.requests.length, 0);
});
