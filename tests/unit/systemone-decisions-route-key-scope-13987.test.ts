/**
 * #13987 — route-level coverage for POST/GET /v1/systemone and /v1/decisions.
 *
 * The decisions route mirrors /v1/classify, so it must apply the same
 * API-key policy and the same connection scope (GHSA-3w2r): a key restricted
 * to specific connections can only be served by those connections, and a key
 * whose scope admits no connection is refused without an upstream call.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-route-13987-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "systemone-route-test-secret";
useDecollidedMigrationsDir();

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const systemOneRoute = await import("../../src/app/api/v1/systemone/route.ts");
const decisionsRoute = await import("../../src/app/api/v1/decisions/route.ts");

const DEAD_CONNECTION_ID = "00000000-0000-4000-8000-00000000dead";
const VALID_BODY = {
  model: "typesafe/jev-latest",
  state: "The customer asks for a refund",
  questions: { risk: { type: "choice", choices: ["low", "high"] } },
};

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedConnection(provider: string, name: string, apiKey: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

function postRequest(pathname: string, body: unknown, bearer?: string) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (bearer) headers.Authorization = `Bearer ${bearer}`;
  return new Request(`http://localhost${pathname}`, {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

/** Captures the upstream Authorization header of every provider call. */
function stubUpstream() {
  const originalFetch = globalThis.fetch;
  const upstreamAuth: string[] = [];
  globalThis.fetch = (async (_url: RequestInfo | URL, init: RequestInit = {}) => {
    upstreamAuth.push(new Headers(init.headers).get("authorization") ?? "");
    return new Response(
      JSON.stringify({
        model: "typesafe/jev-latest",
        answers: { risk: { type: "choice", choice: "low", confidence: 1 } },
        usage: { input_tokens: 10, output_tokens: 2, cost: 0.00001 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
  return { upstreamAuth, restore: () => (globalThis.fetch = originalFetch) };
}

test("#13987 route: the connection-scoped key is served only by its allowed connection", async () => {
  // B is created first, so it would win an unrestricted pool selection.
  const connB = await seedConnection("typesafe", "systemone-conn-B", "sk-typesafe-B");
  const connA = await seedConnection("typesafe", "systemone-conn-A", "sk-typesafe-A");
  assert.notEqual(connA.id, connB.id);
  const key = await apiKeysDb.createApiKey("systemone-restricted-to-A", "machine-13987", [], {
    allowedConnections: [connA.id],
  });
  const disjointKey = await apiKeysDb.createApiKey("systemone-elsewhere", "machine-13987", [], {
    allowedConnections: [DEAD_CONNECTION_ID],
  });
  apiKeysDb.clearApiKeyCaches();

  const upstream = stubUpstream();
  try {
    for (const route of [systemOneRoute, decisionsRoute]) {
      const pathname = route === systemOneRoute ? "/v1/systemone" : "/v1/decisions";
      for (let i = 0; i < 3; i++) {
        const response = await route.POST(postRequest(pathname, VALID_BODY, key.key));
        assert.equal(response.status, 200, await response.clone().text());
        const payload = (await response.json()) as { answers?: unknown };
        assert.ok(payload.answers, "answers pass through");
      }
    }
    assert.equal(upstream.upstreamAuth.length, 6);
    assert.deepEqual(
      [...new Set(upstream.upstreamAuth)],
      ["Bearer sk-typesafe-A"],
      "a connection-scoped key must only reach its allowed connection"
    );

    // The scope admits no connection that serves the provider: refused, no upstream call.
    upstream.upstreamAuth.length = 0;
    const denied = await systemOneRoute.POST(
      postRequest("/v1/systemone", VALID_BODY, disjointKey.key)
    );
    assert.notEqual(denied.status, 200, "no allowed connection -> no decision");
    assert.ok(denied.status >= 400 && denied.status < 600);
    assert.ok(!(await denied.text()).includes("at /"), "no stack trace leaks");
    assert.equal(upstream.upstreamAuth.length, 0, "no upstream call outside the key's scope");
  } finally {
    upstream.restore();
  }
});

test("#13987 route: a scoped key is refused when the requested provider has no in-scope connection", async () => {
  const connOnly = await seedConnection("openrouter", "systemone-or-conn", "sk-or-only");
  const typesafeScopedKey = await apiKeysDb.createApiKey(
    "systemone-or-elsewhere",
    "machine-13987",
    [],
    { allowedConnections: [connOnly.id] }
  );
  apiKeysDb.clearApiKeyCaches();

  const upstream = stubUpstream();
  try {
    // typesafe/* needs a typesafe connection; the key is only scoped to an openrouter one.
    const response = await decisionsRoute.POST(
      postRequest("/v1/decisions", VALID_BODY, typesafeScopedKey.key)
    );
    assert.notEqual(response.status, 200);
    assert.equal(upstream.upstreamAuth.length, 0, "the typesafe pool is never used out of scope");
    assert.ok(
      !upstream.upstreamAuth.includes("Bearer sk-typesafe-A") &&
        !upstream.upstreamAuth.includes("Bearer sk-typesafe-B")
    );
  } finally {
    upstream.restore();
  }
});

test("#13987 route: key model policy rejects a model outside allowedModels", async () => {
  const restricted = await apiKeysDb.createApiKey("systemone-models", "machine-13987", [], {
    allowedModels: ["openrouter/*"],
  });
  apiKeysDb.clearApiKeyCaches();

  const upstream = stubUpstream();
  try {
    const response = await systemOneRoute.POST(
      postRequest("/v1/systemone", VALID_BODY, restricted.key)
    );
    assert.ok([401, 403].includes(response.status), `status ${response.status}`);
    assert.equal(upstream.upstreamAuth.length, 0);
  } finally {
    upstream.restore();
  }
});

test("#13987 route: malformed JSON, schema failures and unknown models answer 400", async () => {
  const key = await apiKeysDb.createApiKey("systemone-open", "machine-13987");
  apiKeysDb.clearApiKeyCaches();

  const badJson = await systemOneRoute.POST(postRequest("/v1/systemone", "{not json", key.key));
  assert.equal(badJson.status, 400);

  const noQuestions = await systemOneRoute.POST(
    postRequest("/v1/systemone", { state: "s", questions: {} }, key.key)
  );
  assert.equal(noQuestions.status, 400);

  const chatModel = await systemOneRoute.POST(
    postRequest("/v1/systemone", { ...VALID_BODY, model: "openai/gpt-6" }, key.key)
  );
  assert.equal(chatModel.status, 400);
  assert.match(await chatModel.text(), /Unknown decisions model/);
});

test("#13987 route: OPTIONS advertises GET/POST and GET lists a models envelope", async () => {
  const options = systemOneRoute.OPTIONS();
  assert.match(options.headers.get("Access-Control-Allow-Methods") ?? "", /POST/);
  assert.match(options.headers.get("Access-Control-Allow-Methods") ?? "", /GET/);

  const listing = await decisionsRoute.GET(new Request("http://localhost/v1/decisions"));
  assert.equal(listing.status, 200);
  const payload = (await listing.json()) as { object?: string; data?: unknown[] };
  assert.equal(payload.object, "list");
  assert.ok(Array.isArray(payload.data));
  for (const entry of payload.data ?? []) {
    const model = entry as { type?: string; supported_endpoints?: string[] };
    assert.ok(
      model.type === "decisions" || (model.supported_endpoints ?? []).includes("decisions"),
      "only decisions-capable models are listed"
    );
  }
});
