/**
 * #14667 (ported): POST /v1/systemone served by a local Ollama through the
 * existing `ollama-local` connection. Opt-in via
 * SYSTEMONE_OLLAMA_LOCAL_BACKEND_ENABLED (default off): with the flag off an
 * `ollama-local/<model>` id is refused with a 400 and no upstream call.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-ollama-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "systemone-ollama-test-secret";
useDecollidedMigrationsDir();

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const systemOneRoute = await import("../../src/app/api/v1/systemone/route.ts");
const { resolveSystemOneTarget } = await import("../../open-sse/config/systemOneRegistry.ts");
const { handleSystemOneProxy } = await import("../../open-sse/handlers/systemOne.ts");
const { validateOllamaSystemOneBody } = await import("../../open-sse/handlers/systemOneOllama.ts");
const { buildOllamaSystemOneUrl } =
  await import("../../src/app/api/v1/_shared/systemOneOllamaUrl.ts");

const FLAG = "SYSTEMONE_OLLAMA_LOCAL_BACKEND_ENABLED";
const originalFlag = process.env[FLAG];
const ANSWERS = { route: { type: "choice", choice: "billing", confidence: 0.9 } };
const BODY = {
  state: "The customer asks for a refund",
  questions: {
    route: { type: "choice", criteria: { billing: "Billing", support: "Support" } },
  },
};

test.afterEach(() => {
  if (originalFlag === undefined) delete process.env[FLAG];
  else process.env[FLAG] = originalFlag;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function stubFetch() {
  const calls: Array<{ url: string; headers: Headers; body: Record<string, unknown> }> = [];
  const fetchImpl = (async (url: RequestInfo | URL, init: RequestInit = {}) => {
    calls.push({
      url: String(url),
      headers: new Headers(init.headers),
      body: JSON.parse(String(init.body)),
    });
    return new Response(
      JSON.stringify({ model: "qwen3:8b", answers: ANSWERS, usage: { input_tokens: 9 } }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
  return { calls, fetchImpl };
}

test("registry: ollama-local/<model> resolves to the local backend, unsafe ids do not", () => {
  assert.deepEqual(resolveSystemOneTarget("ollama-local/qwen3:8b"), {
    backend: "ollama-local",
    provider: "ollama-local",
    upstreamModel: "qwen3:8b",
    upstreamUrl: "",
  });
  assert.equal(resolveSystemOneTarget("ollama-local/"), null);
  assert.equal(resolveSystemOneTarget("ollama-local/../etc"), null);
  assert.equal(resolveSystemOneTarget("ollama-local/has space"), null);
  // Existing backends are untouched.
  assert.equal(resolveSystemOneTarget("jev-latest")?.backend, "typesafe");
  assert.equal(resolveSystemOneTarget("openrouter/typesafe/jev-1.13")?.backend, "openrouter");
});

test("URL: the connection base URL becomes <host>/v1/systemone; Ollama cloud is refused", () => {
  assert.equal(buildOllamaSystemOneUrl(undefined), "http://localhost:11434/v1/systemone");
  assert.equal(
    buildOllamaSystemOneUrl("http://10.0.0.5:11434/v1/chat/completions?x=1#f"),
    "http://10.0.0.5:11434/v1/systemone"
  );
  assert.equal(
    buildOllamaSystemOneUrl("http://box:11434/api/chat"),
    "http://box:11434/v1/systemone"
  );
  // Embedded credentials and cloud metadata are refused by the shared outbound guard.
  assert.throws(() => buildOllamaSystemOneUrl("http://user:pw@box:11434/"), /credentials/);
  assert.throws(() => buildOllamaSystemOneUrl("https://ollama.com/v1"), /Ollama cloud/);
  assert.throws(() => buildOllamaSystemOneUrl("http://169.254.169.254/v1"));
});

test("validation: Ollama's candidate, question and field limits", () => {
  assert.deepEqual(validateOllamaSystemOneBody(BODY), { ok: true });
  const one = { ...BODY, questions: { q: { type: "choice", criteria: { a: "A" } } } };
  assert.equal(validateOllamaSystemOneBody(one).ok, false);
  const many = Object.fromEntries(Array.from({ length: 27 }, (_, i) => [`c${i}`, `C${i}`]));
  assert.equal(
    validateOllamaSystemOneBody({ ...BODY, questions: { q: { type: "choice", criteria: many } } })
      .ok,
    false
  );
  const tooManyQuestions = Object.fromEntries(
    Array.from({ length: 65 }, (_, i) => [`q${i}`, { type: "noul" }])
  );
  assert.equal(validateOllamaSystemOneBody({ ...BODY, questions: tooManyQuestions }).ok, false);
  assert.match(
    String((validateOllamaSystemOneBody({ ...BODY, stream: true }) as { message: string }).message),
    /stream/
  );
  assert.equal(
    validateOllamaSystemOneBody({ ...BODY, images: ["data:image/png;base64,AA=="] }).ok,
    false
  );
  assert.equal(validateOllamaSystemOneBody({ ...BODY, images: ["QUJD"] }).ok, true);
  const big = validateOllamaSystemOneBody({ ...BODY, state: "x".repeat(70 * 1024) });
  assert.equal(big.ok === false && big.status, 413);
});

test("handler: posts to the connection's Ollama with no Authorization when it has no key", async () => {
  const { calls, fetchImpl } = stubFetch();
  const resolved = resolveSystemOneTarget("ollama-local/qwen3:8b");
  assert.ok(resolved);
  // The route binds the connection's base URL into the target before the handler runs.
  const target = { ...resolved, upstreamUrl: buildOllamaSystemOneUrl("http://127.0.0.1:11434/v1") };
  const response = await handleSystemOneProxy({
    path: "/v1/systemone",
    target,
    body: { ...BODY, keep_alive: "5m" },
    credentials: {
      apiKey: "",
      connectionId: null,
      providerSpecificData: { baseUrl: "http://127.0.0.1:11434/v1" },
    },
    requestedModel: "ollama-local/qwen3:8b",
    fetchImpl,
  });
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(((await response.json()) as { answers: unknown }).answers, ANSWERS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "http://127.0.0.1:11434/v1/systemone");
  assert.equal(calls[0].headers.get("authorization"), null);
  assert.deepEqual(calls[0].body, {
    model: "qwen3:8b",
    state: BODY.state,
    questions: BODY.questions,
    keep_alive: "5m",
  });
});

test("handler: an ollama-local target without a bound URL is refused before any call", async () => {
  const { calls, fetchImpl } = stubFetch();
  const target = resolveSystemOneTarget("ollama-local/qwen3:8b");
  assert.ok(target);
  const response = await handleSystemOneProxy({
    path: "/v1/systemone",
    target,
    body: BODY,
    credentials: { apiKey: "", connectionId: null, providerSpecificData: {} },
    fetchImpl,
  });
  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

test("handler: an Ollama-invalid body is refused before any upstream call", async () => {
  const { calls, fetchImpl } = stubFetch();
  const target = resolveSystemOneTarget("ollama-local/qwen3:8b");
  assert.ok(target);
  const response = await handleSystemOneProxy({
    path: "/v1/systemone",
    target,
    body: { ...BODY, temperature: 0.2 },
    credentials: { apiKey: "", connectionId: null, providerSpecificData: {} },
    fetchImpl,
  });
  assert.equal(response.status, 400);
  assert.match(await response.text(), /temperature/);
  assert.equal(calls.length, 0);
});

test("route: with the flag off an ollama-local model is refused with no upstream call", async () => {
  delete process.env[FLAG];
  const key = await apiKeysDb.createApiKey("systemone-ollama-off", "machine-ollama-off");
  apiKeysDb.clearApiKeyCaches();
  const originalFetch = globalThis.fetch;
  let fetched = 0;
  globalThis.fetch = (async () => {
    fetched++;
    return new Response("{}");
  }) as typeof fetch;
  try {
    const response = await systemOneRoute.POST(
      new Request("http://localhost/v1/systemone", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key.key}` },
        body: JSON.stringify({ ...BODY, model: "ollama-local/qwen3:8b" }),
      })
    );
    assert.equal(response.status, 400);
    assert.match(await response.text(), /SYSTEMONE_OLLAMA_LOCAL_BACKEND_ENABLED/);
    assert.equal(fetched, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("route: with the flag on the stored ollama-local connection serves the decision", async () => {
  process.env[FLAG] = "true";
  const conn = await providersDb.createProviderConnection({
    provider: "ollama-local",
    authType: "apikey",
    name: "ollama-systemone",
    apiKey: "",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { baseUrl: "http://127.0.0.1:11434/v1" },
  });
  const key = await apiKeysDb.createApiKey("systemone-ollama-on", "machine-ollama-on", [], {
    allowedConnections: [String(conn.id)],
  });
  apiKeysDb.clearApiKeyCaches();
  const { calls, fetchImpl } = stubFetch();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    const response = await systemOneRoute.POST(
      new Request("http://localhost/v1/systemone", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key.key}` },
        body: JSON.stringify({ ...BODY, model: "ollama-local/qwen3:8b" }),
      })
    );
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "http://127.0.0.1:11434/v1/systemone");
    assert.equal(calls[0].body.model, "qwen3:8b");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
