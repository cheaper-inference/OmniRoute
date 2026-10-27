/**
 * System One candidate dispatch — the route's attempt loop.
 *
 * `POST /v1/systemone` has to decide, before and between credential spends,
 * which (provider, model, connection) to try next. That loop is the only place
 * where a decision request can leak across a tier or a provider boundary, so it
 * lives in its own dependency-injected module and is proven here with fakes:
 * no network, no provider store, no usage tables.
 *
 * The rules locked in:
 *  - a retryable failure rotates to another connection of the SAME provider
 *    first, passing the already-attempted connections as exclusions;
 *  - only a bare alias may then cross to another backend; a provider-qualified
 *    id and a free-tier alias never do;
 *  - the calling key's model rules are re-checked per candidate against the
 *    canonical `<provider>/<model>` id, before a credential is selected;
 *  - a caller-fault status (400/413/415/422) and an ambiguous 502 fail closed
 *    instead of spending another account;
 *  - both loops are bounded, and the all-rate-limited/Retry-After answer
 *    survives to the client.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/systemone-dispatch.test.ts
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The module graph reaches the provider-store/auth layer for its production
// defaults; point DATA_DIR at a throwaway dir BEFORE that import so nothing can
// touch a real ~/.omniroute. Every collaborator is injected, so no test here
// opens the database.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "systemone-dispatch-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "systemone-dispatch-test-secret";

const { dispatchSystemOne, isRetryableSystemOneStatus, SYSTEMONE_MAX_CONNECTION_ATTEMPTS } =
  await import("../../src/app/api/v1/systemone/dispatch.ts");
const { resolveSystemOneCandidates, SYSTEMONE_MAX_FALLBACK_CANDIDATES } =
  await import("../../open-sse/config/systemOneRegistry.ts");

type SystemOneDispatchDeps =
  import("../../src/app/api/v1/systemone/dispatch.ts").SystemOneDispatchDeps;
type SystemOneCredentialSelection =
  import("../../src/app/api/v1/systemone/dispatch.ts").SystemOneCredentialSelection;

/** The caller's own data: it must never appear in any response this loop builds. */
const STATE = "patient record: Jane Doe, flagged for review";

function requestBody(extra: Record<string, unknown> = {}) {
  return {
    model: "jev",
    state: STATE,
    questions: { urgent: { type: "noul", instructions: "Is this urgent?" } },
    ...extra,
  };
}

type FakeConnection = {
  id: string;
  apiKey?: string | null;
  accessToken?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
};

/** Either a pool of connections or one of the selector's diagnostic sentinels. */
type Pool = FakeConnection[] | Record<string, unknown>;

type RecordedAttempt = {
  provider: string;
  upstreamModel: unknown;
  canonicalModel: string;
  requestedModel: string | null;
  tier: string | undefined;
  connectionId: string | null;
  apiKeyId: string | null;
  correlationId: string | null;
  body: Record<string, unknown>;
};

type Harness = {
  deps: Partial<SystemOneDispatchDeps>;
  selections: SystemOneCredentialSelection[];
  attempts: RecordedAttempt[];
  recovered: (string | null)[];
  policyChecks: string[];
};

function json(status: number, body: unknown, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

const ANSWER = { model: "jev-1.13", answers: { urgent: { type: "noul", noul: 0.8 } } };

function harness(options: {
  pools: Record<string, Pool>;
  respond?: (attempt: RecordedAttempt) => Response;
  policy?: (canonicalModel: string) => Response | null;
}): Harness {
  const selections: SystemOneCredentialSelection[] = [];
  const attempts: RecordedAttempt[] = [];
  const recovered: (string | null)[] = [];
  const policyChecks: string[] = [];

  const deps: Partial<SystemOneDispatchDeps> = {
    selectCredentials: async (selection) => {
      selections.push({
        ...selection,
        excludeConnectionIds: [...selection.excludeConnectionIds],
        allowedConnections: selection.allowedConnections ? [...selection.allowedConnections] : null,
      });
      const pool = options.pools[selection.provider];
      if (!pool) return null;
      if (!Array.isArray(pool)) return pool;
      const eligible = pool.filter(
        (connection) =>
          !selection.excludeConnectionIds.includes(connection.id) &&
          (!selection.allowedConnections || selection.allowedConnections.includes(connection.id))
      );
      const chosen = eligible[0];
      if (!chosen) return null;
      return {
        connectionId: chosen.id,
        apiKey: chosen.apiKey ?? null,
        accessToken: chosen.accessToken ?? null,
        providerSpecificData: chosen.providerSpecificData ?? null,
      };
    },
    dispatch: async (proxyOptions) => {
      const attempt: RecordedAttempt = {
        provider: proxyOptions.provider,
        upstreamModel: proxyOptions.body.model,
        canonicalModel: proxyOptions.canonicalModel,
        requestedModel: proxyOptions.requestedModel ?? null,
        tier: proxyOptions.tier,
        connectionId:
          (proxyOptions.credentials as { connectionId?: string } | null)?.connectionId ?? null,
        apiKeyId: proxyOptions.apiKeyInfo?.id ?? null,
        correlationId: proxyOptions.correlationId ?? null,
        body: proxyOptions.body,
      };
      attempts.push(attempt);
      return options.respond ? options.respond(attempt) : json(200, ANSWER);
    },
    clearRecoveredProviderState: async (credentials) => {
      recovered.push((credentials as { connectionId?: string } | null)?.connectionId ?? null);
      return { applied: true };
    },
    validateRoutingTarget: async (canonicalModel) => {
      policyChecks.push(canonicalModel);
      return options.policy ? options.policy(canonicalModel) : null;
    },
  };

  return { deps, selections, attempts, recovered, policyChecks };
}

function keyed(id: string): FakeConnection {
  return { id, apiKey: `sk-${id}` };
}

/** OpenCode Zen's free model still requires a key from a free-tier account. */
function freeKey(id: string): FakeConnection {
  return {
    id,
    apiKey: ["test", "free", id].join("-"),
    providerSpecificData: { systemOneTier: "free" },
  };
}

async function dispatch(
  model: string,
  configured: readonly string[],
  harnessed: Harness,
  input: Record<string, unknown> = {}
) {
  return dispatchSystemOne(
    {
      candidates: resolveSystemOneCandidates(model, { availableProviders: configured }),
      body: requestBody({ model }),
      requestedModel: model,
      apiKeyInfo: { id: "key-1", name: "dash key" },
      correlationId: "corr-1",
      ...input,
    },
    harnessed.deps
  );
}

test("a retryable failure rotates to the next connection of the same provider", async () => {
  const harnessed = harness({
    pools: { openrouter: [keyed("conn-1"), keyed("conn-2")] },
    respond: (attempt) =>
      attempt.connectionId === "conn-1"
        ? json(503, { error: { code: "upstream_unavailable" } })
        : json(200, ANSWER),
  });

  const response = await dispatch(
    "openrouter/typesafe/jev-1.13",
    ["openrouter", "opencode-zen"],
    harnessed
  );

  assert.equal(response.status, 200);
  assert.deepEqual(
    harnessed.attempts.map((attempt) => attempt.connectionId),
    ["conn-1", "conn-2"]
  );
  // The second selection must exclude the connection that just failed, or the
  // selector would hand back the same bad account forever.
  assert.deepEqual(harnessed.selections[1].excludeConnectionIds, ["conn-1"]);
  // Only the pinned provider was consulted.
  assert.deepEqual(new Set(harnessed.selections.map((s) => s.provider)), new Set(["openrouter"]));
  // Recovery state is cleared for the connection that actually succeeded.
  assert.deepEqual(harnessed.recovered, ["conn-2"]);
});

test("a bare alias crosses to the next backend once its connections are exhausted", async () => {
  const harnessed = harness({
    pools: { "opencode-zen": [freeKey("zen-1")], openrouter: [keyed("or-1")] },
    respond: (attempt) =>
      attempt.provider === "opencode-zen"
        ? json(503, { error: "upstream_down" })
        : json(200, ANSWER),
  });

  const response = await dispatch("jev", ["opencode-zen", "openrouter"], harnessed);

  assert.equal(response.status, 200);
  assert.deepEqual(
    harnessed.attempts.map((attempt) => `${attempt.provider}:${attempt.upstreamModel}`),
    ["opencode-zen:jev-1.13", "openrouter:typesafe/jev-1.13"]
  );
  // Each candidate keeps its own canonical identity for policy/usage/cooldown.
  assert.deepEqual(
    harnessed.attempts.map((attempt) => attempt.canonicalModel),
    ["opencode-zen/jev-1.13", "openrouter/typesafe/jev-1.13"]
  );
  assert.equal(harnessed.attempts[0].requestedModel, "jev");
});

test("a provider-qualified id never crosses to another backend", async () => {
  const harnessed = harness({
    pools: { "opencode-zen": [freeKey("zen-1")], openrouter: [keyed("or-1")] },
    respond: () => json(429, { error: "rate_limited" }, { "retry-after": "30" }),
  });

  const response = await dispatch(
    "opencode-zen/jev-1.13",
    ["opencode-zen", "openrouter"],
    harnessed
  );

  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "30");
  assert.deepEqual(new Set(harnessed.attempts.map((a) => a.provider)), new Set(["opencode-zen"]));
  assert.ok(harnessed.selections.every((selection) => selection.provider === "opencode-zen"));
});

test("a free-tier refusal stops without rotating identity or reaching a paid backend", async () => {
  // Even a faulty selector must not turn an entitlement refusal into identity rotation.
  const harnessed = harness({
    pools: {
      "opencode-zen": [keyed("zen-paid"), freeKey("zen-free")],
      openrouter: [keyed("or-1")],
    },
    respond: (attempt) =>
      attempt.connectionId === "zen-paid"
        ? json(403, { error: "FreeTierError" })
        : json(200, ANSWER),
  });

  const response = await dispatch("jev-free", ["opencode-zen", "openrouter"], harnessed);

  assert.equal(response.status, 403);
  assert.deepEqual(
    harnessed.attempts.map((attempt) => attempt.connectionId),
    ["zen-paid"]
  );
  // The tier travels with every attempt, so the proxy can refuse a paid account.
  assert.ok(harnessed.attempts.every((attempt) => attempt.tier === "free"));
  // No paid backend is ever consulted for a free alias, not even after a failure.
  assert.ok(harnessed.selections.every((selection) => selection.provider === "opencode-zen"));
});

test("a free-tier alias with only paid accounts fails closed instead of falling back", async () => {
  const harnessed = harness({
    pools: { "opencode-zen": [keyed("zen-paid")], openrouter: [keyed("or-1")] },
    respond: () => json(403, { error: "FreeTierError" }),
  });

  const response = await dispatch("jev-free", ["opencode-zen", "openrouter"], harnessed);

  assert.equal(response.status, 403);
  assert.deepEqual(
    harnessed.attempts.map((attempt) => attempt.connectionId),
    ["zen-paid"]
  );
  assert.ok(harnessed.selections.every((selection) => selection.provider === "opencode-zen"));
});

test("the key's connection allowlist is passed to every credential selection", async () => {
  const harnessed = harness({
    pools: { openrouter: [keyed("or-1"), keyed("or-2")] },
  });

  const response = await dispatch("openrouter/typesafe/jev-1.13", ["openrouter"], harnessed, {
    allowedConnections: ["or-2"],
  });

  assert.equal(response.status, 200);
  assert.deepEqual(harnessed.selections[0].allowedConnections, ["or-2"]);
  assert.deepEqual(
    harnessed.attempts.map((attempt) => attempt.connectionId),
    ["or-2"]
  );
});

test("each candidate is re-checked against the key's rules by canonical id", async () => {
  const harnessed = harness({
    pools: { "opencode-zen": [freeKey("zen-1")], openrouter: [keyed("or-1")] },
    policy: (canonicalModel) =>
      canonicalModel === "opencode-zen/jev-1.13"
        ? json(403, { error: { message: "Model not allowed for this API key" } })
        : null,
  });

  const response = await dispatch("jev", ["opencode-zen", "openrouter"], harnessed);

  assert.equal(response.status, 200);
  assert.deepEqual(harnessed.policyChecks, [
    "opencode-zen/jev-1.13",
    "openrouter/typesafe/jev-1.13",
  ]);
  // A rejected candidate must not spend a credential selection at all.
  assert.ok(harnessed.selections.every((selection) => selection.provider === "openrouter"));
  assert.deepEqual(
    harnessed.attempts.map((attempt) => attempt.provider),
    ["openrouter"]
  );
});

test("a candidate the key may not use is reported, not silently dropped", async () => {
  const harnessed = harness({
    pools: { "opencode-zen": [freeKey("zen-1")] },
    policy: () => json(403, { error: { message: "Model not allowed for this API key" } }),
  });

  const response = await dispatch("opencode-zen/jev-1.13", ["opencode-zen"], harnessed);

  assert.equal(response.status, 403);
  assert.equal(harnessed.attempts.length, 0);
  assert.equal(harnessed.selections.length, 0);
});

test("no connection for the pinned provider is a request error, not an upstream call", async () => {
  const harnessed = harness({ pools: {} });

  const response = await dispatch("openrouter/typesafe/jev-1.13", ["openrouter"], harnessed);

  assert.equal(response.status, 400);
  const body = (await response.json()) as { error: { message: string } };
  assert.match(body.error.message, /openrouter/);
  assert.ok(!body.error.message.includes(STATE));
  assert.equal(harnessed.attempts.length, 0);
});

test("an all-rate-limited provider keeps its Retry-After answer", async () => {
  const retryAfter = new Date(Date.now() + 60_000).toISOString();
  const harnessed = harness({
    pools: { openrouter: { allRateLimited: true, retryAfter, retryAfterHuman: "in 1 minute" } },
  });

  const response = await dispatch("openrouter/typesafe/jev-1.13", ["openrouter"], harnessed);

  assert.equal(response.status, 429);
  assert.ok(response.headers.get("retry-after"));
  assert.equal(harnessed.attempts.length, 0);
});

test("terminal and policy-blocked provider pools map to their own statuses", async () => {
  const expired = harness({
    pools: { openrouter: { allExpired: true, expiredCount: 2, expiredStatus: "expired" } },
  });
  const expiredResponse = await dispatch("openrouter/typesafe/jev-1.13", ["openrouter"], expired);
  assert.equal(expiredResponse.status, 401);

  const exhausted = harness({
    pools: {
      openrouter: { allExpired: true, expiredCount: 1, expiredStatus: "credits_exhausted" },
    },
  });
  const exhaustedResponse = await dispatch(
    "openrouter/typesafe/jev-1.13",
    ["openrouter"],
    exhausted
  );
  assert.equal(exhaustedResponse.status, 402);

  const blocked = harness({
    pools: { openrouter: { blockedByKeyPolicy: true, blockedCount: 3 } },
  });
  const blockedResponse = await dispatch("openrouter/typesafe/jev-1.13", ["openrouter"], blocked);
  assert.equal(blockedResponse.status, 403);

  for (const probe of [expired, exhausted, blocked]) {
    assert.equal(probe.attempts.length, 0);
  }
});

test("a lease-fenced selection is treated as unusable rather than dispatched", async () => {
  const harnessed = harness({ pools: { openrouter: { leaseFenceStale: true } } });

  const response = await dispatch("openrouter/typesafe/jev-1.13", ["openrouter"], harnessed);

  assert.equal(response.status, 503);
  assert.equal(harnessed.attempts.length, 0);
});

test("a caller-fault status is returned without spending another account", async () => {
  for (const status of [400, 404, 413, 415, 422]) {
    const harnessed = harness({
      pools: { "opencode-zen": [freeKey("zen-1"), freeKey("zen-2")], openrouter: [keyed("or-1")] },
      respond: () => json(status, { error: "bad_request" }),
    });

    const response = await dispatch("jev", ["opencode-zen", "openrouter"], harnessed);

    assert.equal(response.status, status);
    assert.equal(harnessed.attempts.length, 1, `status ${status} must not be retried`);
  }
});

test("an ambiguous 502 fails closed instead of rotating accounts", async () => {
  // The proxy maps BOTH a contract-violating success body and a transport
  // failure onto 502. A contract violation would repeat on every account, so
  // the conservative choice is to stop.
  const harnessed = harness({
    pools: { "opencode-zen": [freeKey("zen-1"), freeKey("zen-2")], openrouter: [keyed("or-1")] },
    respond: () => json(502, { error: { message: "invalid response body" } }),
  });

  const response = await dispatch("jev", ["opencode-zen", "openrouter"], harnessed);

  assert.equal(response.status, 502);
  assert.equal(harnessed.attempts.length, 1);
  assert.equal(harnessed.recovered.length, 0);
});

test("a classified gateway failure rotates but a malformed successful payload does not", async () => {
  const harnessed = harness({
    pools: { openrouter: [keyed("or-1"), keyed("or-2")] },
    respond: (attempt) =>
      attempt.connectionId === "or-1"
        ? json(502, { error: { code: "upstream_error", message: "Gateway unavailable" } })
        : json(200, ANSWER),
  });
  const response = await dispatch("openrouter/typesafe/jev-1.13", ["openrouter"], harnessed);
  assert.equal(response.status, 200);
  assert.deepEqual(
    harnessed.attempts.map((attempt) => attempt.connectionId),
    ["or-1", "or-2"]
  );
});

test("a caller cancellation is not retried", async () => {
  const harnessed = harness({
    pools: { "opencode-zen": [freeKey("zen-1"), freeKey("zen-2")] },
    respond: () => json(499, { error: "aborted" }),
  });

  const response = await dispatch("opencode-zen/jev-1.13", ["opencode-zen"], harnessed);

  assert.equal(response.status, 499);
  assert.equal(harnessed.attempts.length, 1);
});

test("connection rotation and the candidate chain are both bounded", async () => {
  const pool = Array.from({ length: 10 }, (_, index) => keyed(`or-${index}`));
  const bounded = harness({
    pools: { openrouter: pool },
    respond: () => json(500, { error: "upstream" }),
  });

  const response = await dispatch("openrouter/typesafe/jev-1.13", ["openrouter"], bounded);

  assert.equal(response.status, 500);
  assert.equal(bounded.attempts.length, SYSTEMONE_MAX_CONNECTION_ATTEMPTS);

  const chained = harness({
    pools: {
      "opencode-zen": [freeKey("zen-1")],
      openrouter: [keyed("or-1")],
      "vercel-ai-gateway": [keyed("v-1")],
    },
    respond: () => json(500, { error: "upstream" }),
  });
  const chainedResponse = await dispatch(
    "jev",
    ["opencode-zen", "openrouter", "vercel-ai-gateway"],
    chained
  );

  assert.equal(chainedResponse.status, 500);
  const providers = new Set(chained.attempts.map((attempt) => attempt.provider));
  assert.equal(providers.size, 3);
  assert.ok(providers.size <= SYSTEMONE_MAX_FALLBACK_CANDIDATES);
});

test("the last upstream failure is preserved over a later selector diagnostic", async () => {
  const harnessed = harness({
    pools: { "opencode-zen": [freeKey("zen-1")] },
    respond: () => json(503, { error: "upstream_unavailable" }, { "retry-after": "11" }),
  });

  // openrouter is a configured candidate for the alias but has no pool here, so
  // its selection returns null AFTER opencode already answered 503.
  const response = await dispatch("jev", ["opencode-zen", "openrouter"], harnessed);

  assert.equal(response.status, 503);
  assert.equal(response.headers.get("retry-after"), "11");
});

test("the backend's own request limits reject before any credential is spent", async () => {
  const tooManyLevels = harness({ pools: { "opencode-zen": [freeKey("zen-1")] } });
  const levelsResponse = await dispatchSystemOne(
    {
      candidates: resolveSystemOneCandidates("opencode-zen/jev-1.13"),
      body: {
        model: "opencode-zen/jev-1.13",
        state: STATE,
        questions: {
          severity: { type: "score", criteria: Array.from({ length: 11 }, (_, i) => `l${i}`) },
        },
      },
      requestedModel: "opencode-zen/jev-1.13",
    },
    tooManyLevels.deps
  );

  assert.equal(levelsResponse.status, 400);
  assert.equal(tooManyLevels.attempts.length, 0);
  assert.equal(tooManyLevels.selections.length, 0);

  const oversized = harness({ pools: { "opencode-zen": [freeKey("zen-1")] } });
  const oversizedResponse = await dispatchSystemOne(
    {
      candidates: resolveSystemOneCandidates("opencode-zen/jev-1.13"),
      body: {
        model: "opencode-zen/jev-1.13",
        state: "x".repeat(1_100_000),
        questions: { urgent: { type: "noul", instructions: "Is this urgent?" } },
      },
      requestedModel: "opencode-zen/jev-1.13",
    },
    oversized.deps
  );

  assert.equal(oversizedResponse.status, 413);
  assert.equal(oversized.attempts.length, 0);
});

test("the upstream body carries the backend's own model id, not the client alias", async () => {
  const harnessed = harness({ pools: { openrouter: [keyed("or-1")] } });

  await dispatch("jev", ["openrouter"], harnessed);

  assert.equal(harnessed.attempts[0].body.model, "typesafe/jev-1.13");
  assert.equal(harnessed.attempts[0].body.state, STATE);
  assert.equal(harnessed.attempts[0].apiKeyId, "key-1");
  assert.equal(harnessed.attempts[0].correlationId, "corr-1");
});

test("the retry classification matches the documented contract", () => {
  for (const status of [408, 500, 503, 504, 529]) {
    assert.equal(isRetryableSystemOneStatus(status), true, `${status} should be retryable`);
  }
  for (const status of [
    200, 400, 401, 402, 403, 404, 409, 413, 415, 422, 429, 451, 499, 501, 502,
  ]) {
    assert.equal(isRetryableSystemOneStatus(status), false, `${status} must not be retryable`);
  }
});

test.after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

for (const [status, payload] of [
  [403, { title: "Access denied", detail: "Cloudflare error 1010" }],
  [401, { error: { message: "Authentication required" } }],
  [429, { error: { name: "FreeUsageLimitError", message: "Free usage limit reached." } }],
] as const) {
  test(`native access restriction HTTP${status} stops before identity/provider rotation`, async () => {
    const h = harness({
      pools: { "opencode-zen": [freeKey("zen-1"), freeKey("zen-2")], openrouter: [keyed("or-1")] },
      respond: () => json(status, payload, { "retry-after": "17" }),
    });
    const response = await dispatch("jev", ["opencode-zen", "openrouter"], h);
    assert.equal(response.status, status);
    assert.equal(h.attempts.length, 1);
    assert.equal(h.selections.length, 1);
    assert.equal(response.headers.get("retry-after"), "17");
    assert.equal(h.recovered.length, 0);
  });
}
