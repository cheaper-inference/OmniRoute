/**
 * Hermetic contract tests for POST /v1/systemone, driven through the real route, key policy,
 * credential selection, handler, call log and cost accounting with the upstream `fetch`
 * stubbed. Request/response shapes come from the PR author's captured OpenRouter exchange
 * (tests/unit/systemone-openrouter.test.ts) and the System One backend registry
 * (open-sse/config/systemOneRegistry.ts). They prove the code matches those shapes; they do
 * not prove the vendors still answer that way.
 */
import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-contract-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "systemone-contract-test-secret";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const { getCallLogs } = await import("../../src/lib/usage/callLogs.ts");
const { getDailyTotal } = await import("../../src/domain/costRules.ts");
const { setRateLimiterTestMode } = await import("../../src/shared/utils/rateLimiter.ts");
const { getModelLockoutInfo } = await import("../../open-sse/services/accountFallback.ts");
const { POST } = await import("../../src/app/api/v1/systemone/route.ts");
const originalFetch = globalThis.fetch;
setRateLimiterTestMode(true);

const BODY = {
  model: "jev-latest",
  state: "I was charged twice for my subscription.",
  questions: { refund: { type: "noul", instructions: "Is the customer asking for money back?" } },
};
const OPENROUTER_REPLY = {
  id: "gen-dec-1",
  model: "typesafe/jev-1.13-20260917",
  provider: "TypeSafe",
  answers: { refund: { type: "noul", noul: 0.98 } },
  usage: { input_tokens: 275, output_tokens: 20, cost: 0.00003 },
};

type Seen = { url: string; init: RequestInit; headers: Headers; body: Record<string, unknown> };
let seen: Seen[] = [];
function stub(reply: (call: Seen, index: number) => Response | Promise<Response>) {
  seen = [];
  globalThis.fetch = (async (input: unknown, init: RequestInit = {}) => {
    const call: Seen = {
      url: String(input),
      init,
      headers: new Headers(init.headers),
      body: JSON.parse(String(init.body ?? "null")),
    };
    seen.push(call);
    return reply(call, seen.length - 1);
  }) as typeof fetch;
}
function post(raw: unknown, key?: string) {
  return new Request("http://localhost/v1/systemone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(key ? { Authorization: `Bearer ${key}` } : {}),
    },
    body: JSON.stringify(raw),
  });
}
async function systemOneLog(model: string) {
  const rows = await getCallLogs({ model });
  return rows.find((row: { path?: string }) => row.path === "/v1/systemone");
}
async function setActive(provider: string, isActive: boolean) {
  for (const row of await providers.getProviderConnections({ provider })) {
    await providers.updateProviderConnection(row.id, { isActive });
  }
}

let openrouterId = "";
test.before(async () => {
  await core.ensureDbInitialized();
  openrouterId = String(
    (
      await providers.createProviderConnection({
        provider: "openrouter",
        name: "Gateway",
        apiKey: "sk-or-contract",
        isActive: true,
      })
    ).id
  );
});
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(async () => {
  await new Promise<void>((resolve) => setImmediate(resolve));
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("OpenRouter: bare jev-latest reaches /api/v1/systemone and returns answers, usage, cost and a systemone call log", async () => {
  const key = await keys.createApiKey("SO contract", "machine-so-contract");
  await keys.updateApiKeyPermissions(key.id, { allowedEndpoints: ["systemone"] });
  stub(() => Response.json(OPENROUTER_REPLY));

  const response = await POST(post({ ...BODY, provider: { order: ["TypeSafe"] } }, key.key));

  assert.equal(response.status, 200);
  const json = (await response.json()) as typeof OPENROUTER_REPLY;
  assert.deepEqual(json.answers, OPENROUTER_REPLY.answers);
  assert.deepEqual(json.usage, OPENROUTER_REPLY.usage);
  assert.equal(seen.length, 1);
  assert.equal(seen[0].url, "https://openrouter.ai/api/v1/systemone");
  assert.equal(seen[0].init.method, "POST");
  assert.equal(seen[0].headers.get("Authorization"), "Bearer sk-or-contract");
  assert.equal(seen[0].headers.get("Content-Type"), "application/json");
  // The gateway sees the connection's key, never the caller's OmniRoute key.
  assert.ok(!JSON.stringify(seen[0].init).includes(key.key));
  assert.deepEqual(seen[0].body, {
    ...BODY,
    model: "typesafe/jev-latest",
    provider: { order: ["TypeSafe"] },
  });

  // Cost: OpenRouter reports the exact USD amount; it must surface and be non-zero.
  assert.equal(response.headers.get("X-OmniRoute-Provider"), "openrouter");
  assert.equal(response.headers.get("X-OmniRoute-Cost-Status"), "known");
  assert.notEqual(Number(response.headers.get("X-OmniRoute-Response-Cost")), 0);
  assert.equal(Number(response.headers.get("X-OmniRoute-Response-Cost")), 0.00003);
  assert.equal(response.headers.get("X-OmniRoute-Tokens-In"), "275");

  const row = await systemOneLog("typesafe/jev-1.13-20260917");
  assert.ok(row, "the call is logged");
  assert.equal(row.requestType, "systemone");
  assert.equal(row.provider, "openrouter");
  assert.equal(row.status, 200);
  assert.equal(row.requestedModel, "jev-latest");
  assert.equal(row.apiKeyId, key.id);
  assert.equal(row.tokens.in, 275);
  assert.equal(row.tokens.out, 20);
  assert.ok(Math.abs(getDailyTotal(key.id) - 0.00003) < 1e-12, "cost is charged to the key");
});

test("key policy: allowedModels without the model and allowedEndpoints without systemone are 403 before any upstream call", async () => {
  const modelKey = await keys.createApiKey("SO other model", "machine-so-other-model");
  await keys.updateApiKeyPermissions(modelKey.id, {
    modelAccessMode: "restricted",
    allowedModels: ["gpt-4o"],
  });
  const endpointKey = await keys.createApiKey("SO chat only", "machine-so-chat-only");
  await keys.updateApiKeyPermissions(endpointKey.id, { allowedEndpoints: ["chat"] });
  const allowedKey = await keys.createApiKey("SO allowed", "machine-so-allowed");
  await keys.updateApiKeyPermissions(allowedKey.id, {
    modelAccessMode: "restricted",
    allowedModels: ["openrouter/typesafe/jev-latest"],
  });
  stub(() => Response.json(OPENROUTER_REPLY));

  assert.equal((await POST(post(BODY, modelKey.key))).status, 403);
  assert.equal((await POST(post(BODY, endpointKey.key))).status, 403);
  assert.equal(seen.length, 0);

  // The bare id and the qualified id are one policy namespace.
  assert.equal((await POST(post(BODY, allowedKey.key))).status, 200);
  assert.equal(seen.length, 1);
});

test("no active OpenRouter connection is a 400 'No credentials' error and never reaches the network", async () => {
  await setActive("openrouter", false);
  try {
    stub(() => Response.json(OPENROUTER_REPLY));
    const response = await POST(post(BODY));
    assert.equal(response.status, 400);
    const json = (await response.json()) as { error: { message: string } };
    assert.match(json.error.message, /No credentials for provider: openrouter/);
    assert.equal(seen.length, 0);
  } finally {
    await setActive("openrouter", true);
  }
});

test("a cooling connection yields 429 with Retry-After and no upstream call", async () => {
  await providers.updateProviderConnection(openrouterId, {
    rateLimitedUntil: new Date(Date.now() + 90_000).toISOString(),
    testStatus: "unavailable",
  });
  try {
    stub(() => Response.json(OPENROUTER_REPLY));
    const response = await POST(post(BODY));
    assert.equal(response.status, 429);
    assert.ok(Number(response.headers.get("Retry-After")) > 0, "Retry-After is set");
    assert.equal(seen.length, 0);
  } finally {
    await providers.updateProviderConnection(openrouterId, {
      rateLimitedUntil: null,
      testStatus: "active",
    });
  }
});

test("upstream 5xx is relayed sanitized (no stack, no key), logged, and locks only that model", async () => {
  stub(() =>
    Response.json(
      {
        error: {
          message:
            "boom at /srv/app/handler.ts:10:5 using Bearer sk-or-contract-leaked\n    at run (/srv/app/x.js:1:1)",
        },
      },
      { status: 503 }
    )
  );

  const response = await POST(post({ ...BODY, model: "openrouter/typesafe/jev-fail" }));

  assert.equal(response.status, 503);
  const text = await response.text();
  assert.ok(!text.includes("sk-or-contract-leaked"));
  assert.ok(!text.includes("at /"));
  assert.ok(!text.includes("/srv/app"));
  const row = await systemOneLog("typesafe/jev-fail");
  assert.ok(row, "the failure is logged");
  assert.equal(row.requestType, "systemone");
  assert.equal(row.status, 503);
  // A 503 is scoped to the model: the connection keeps serving other models.
  assert.ok(getModelLockoutInfo("openrouter", openrouterId, "typesafe/jev-fail"));
  const [connection] = await providers.getProviderConnections({ provider: "openrouter" });
  assert.ok(!connection.rateLimitedUntil, "the connection is not cooled down");
  assert.equal(getModelLockoutInfo("openrouter", openrouterId, "typesafe/jev-latest"), null);
});

test("native TypeSafe: its own URL, key and body; published-rate cost beats a reported cost; 429 rotates to the next key", async () => {
  const first = String(
    (
      await providers.createProviderConnection({
        provider: "typesafe",
        name: "Native A",
        apiKey: "ts-key-a",
        priority: 1,
        isActive: true,
      })
    ).id
  );
  await providers.createProviderConnection({
    provider: "typesafe",
    name: "Native B",
    apiKey: "ts-key-b",
    priority: 2,
    isActive: true,
  });
  const nativeBody = { ...BODY, model: "typesafe/jev-latest" };
  const reply = {
    model: "jev-latest",
    answers: { refund: { type: "noul", noul: 0.1 } },
    usage: { input_tokens: 1000, output_tokens: 20, cost: 9 },
  };

  // Request 1: key A is rate limited upstream; Retry-After passes through the route.
  stub(() =>
    Response.json(
      { error: { message: "slow down" } },
      { status: 429, headers: { "retry-after": "30" } }
    )
  );
  const limited = await POST(post(nativeBody));
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "30");
  assert.equal(seen[0].url, "https://api.typesafe.ai/v1/systemone");
  assert.equal(seen[0].headers.get("Authorization"), "Bearer ts-key-a");
  assert.equal(seen[0].body.model, "jev-latest");
  const rows = await providers.getProviderConnections({ provider: "typesafe" });
  assert.ok(rows.find((row: { id: string }) => row.id === first)?.rateLimitedUntil);

  // Request 2: the next key serves it; the native price (not usage.cost) is charged.
  stub(() => Response.json(reply));
  const ok = await POST(post(nativeBody));
  assert.equal(ok.status, 200);
  assert.equal(seen[0].headers.get("Authorization"), "Bearer ts-key-b");
  assert.deepEqual(((await ok.json()) as typeof reply).answers, reply.answers);
  assert.equal(ok.headers.get("X-OmniRoute-Provider"), "typesafe");
  assert.equal(ok.headers.get("X-OmniRoute-Cost-Status"), "known");
  const cost = Number(ok.headers.get("X-OmniRoute-Response-Cost"));
  assert.notEqual(cost, 0);
  assert.ok(Math.abs(cost - 0.000042) < 1e-9, `published Jev rate, got ${cost}`);
  const row = await systemOneLog("jev-latest");
  assert.ok(row);
  assert.equal(row.provider, "typesafe");
  assert.equal(row.requestType, "systemone");
  assert.equal(row.status, 200);
  await setActive("typesafe", false);
});

test("local Ollama: URL derived from the configured base, no Authorization, zero known cost, logged as ollama-local", async () => {
  const cases: Array<[string, string]> = [
    ["http://127.0.0.1:11434/v1", "http://127.0.0.1:11434/v1/systemone"],
    ["http://127.0.0.1:11434", "http://127.0.0.1:11434/v1/systemone"],
    ["http://127.0.0.1:11434/api/chat", "http://127.0.0.1:11434/v1/systemone"],
  ];
  for (const [index, [baseUrl, expected]] of cases.entries()) {
    const name = `Local ${index}`;
    const id = String(
      (
        await providers.createProviderConnection({
          provider: "ollama-local",
          name,
          isActive: true,
          providerSpecificData: { baseUrl },
        })
      ).id
    );
    stub(() =>
      Response.json({ ...OPENROUTER_REPLY, model: "clef-flash", usage: { input_tokens: 40 } })
    );

    const response = await POST(post({ ...BODY, model: "ollama-local/clef-flash" }));

    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(seen[0].url, expected);
    assert.equal(seen[0].headers.get("Authorization"), null);
    assert.equal(seen[0].body.model, "clef-flash");
    // The header carries the provider alias; the call log keeps the provider id.
    assert.equal(response.headers.get("X-OmniRoute-Provider"), "ollama");
    assert.equal(response.headers.get("X-OmniRoute-Cost-Status"), "known");
    assert.equal(Number(response.headers.get("X-OmniRoute-Response-Cost")), 0);
    await providers.updateProviderConnection(id, { isActive: false });
  }
  const row = await systemOneLog("clef-flash");
  assert.ok(row);
  assert.equal(row.provider, "ollama-local");
  assert.equal(row.requestType, "systemone");
});

test("local Ollama: a failing host is a sanitized 5xx and never falls back to another backend", async () => {
  await providers.createProviderConnection({
    provider: "ollama-local",
    name: "Local down",
    isActive: true,
    providerSpecificData: { baseUrl: "http://127.0.0.1:11434/v1" },
  });
  stub(() => {
    throw new Error("connect ECONNREFUSED 127.0.0.1:11434 at /srv/net.js:1:1");
  });

  const response = await POST(post({ ...BODY, model: "ollama-local/clef-flash" }));

  assert.equal(response.status, 502);
  const text = await response.text();
  assert.ok(!text.includes("at /"));
  assert.equal(seen.length, 1);
  assert.ok(seen[0].url.startsWith("http://127.0.0.1:11434/"), "no gateway fallback");
});
