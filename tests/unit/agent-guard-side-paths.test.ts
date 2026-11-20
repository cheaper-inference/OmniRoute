/**
 * Agent guard `block` mode on the paths that answer outside the chat pipeline.
 *
 * The sidecar fast path, the two relay routes and the provider-side token count
 * reach an upstream before the chat pipeline's dispatch gate runs. A request the
 * guard would refuse must not reach the sidecar or the provider from these paths.
 * An official client, and any client with the flag off, keeps today's behavior.
 */

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

process.env.REQUIRE_API_KEY = "false";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "agent-guard-side-paths-secret";

const { gateBifrostFastPath } =
  await import("../../src/shared/services/bifrost/bifrostFastPathGate.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const relayRoute = await import("../../src/app/api/v1/relay/chat/completions/route.ts");
const countTokensRoute = await import("../../src/app/api/v1/messages/count_tokens/route.ts");

const KILO = { "user-agent": "Kilo-Code/4.2.1", "x-title": "Kilo Code" };
const CLI = {
  "user-agent": "claude-cli/2.1.80 (external, cli)",
  "x-app": "cli",
  "anthropic-beta": "oauth-2025-04-20",
};
const CURL = { "user-agent": "curl/8.5.0" };

const SIDECAR = "http://bifrost.test.local:8080";
const ENV_KEYS = [
  "AGENT_GUARD_MODE",
  "AGENT_GUARD_STRICT",
  "BIFROST_BASE_URL",
  "BIFROST_API_KEY",
  "OMNIROUTE_BIFROST_KEY",
  "BIFROST_TIMEOUT_MS",
  "BIFROST_STREAMING_ENABLED",
  "OMNIROUTE_RELAY_BACKEND",
] as const;
const originalEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
const originalFetch = globalThis.fetch;

function setGuard(mode: string, strict = "false") {
  process.env.AGENT_GUARD_MODE = mode;
  process.env.AGENT_GUARD_STRICT = strict;
}

test.afterEach(() => {
  for (const key of ENV_KEYS) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
  globalThis.fetch = originalFetch;
});

test.after(() => {
  core.resetDbInstance();
});

/** Counts the calls that reach the sidecar and answers them with a chat completion. */
function stubSidecar() {
  const sidecarCalls: string[] = [];
  globalThis.fetch = (async (url: unknown) => {
    const target = String(url);
    if (target.startsWith(SIDECAR)) {
      sidecarCalls.push(target);
      return Response.json({
        id: "chatcmpl-sidecar",
        object: "chat.completion",
        choices: [{ index: 0, message: { role: "assistant", content: "from-sidecar" } }],
      });
    }
    return Response.json({ data: [] });
  }) as typeof fetch;
  return sidecarCalls;
}

function useSidecarEnv() {
  process.env.BIFROST_BASE_URL = SIDECAR;
  process.env.BIFROST_TIMEOUT_MS = "5000";
  delete process.env.BIFROST_API_KEY;
  delete process.env.OMNIROUTE_BIFROST_KEY;
  delete process.env.BIFROST_STREAMING_ENABLED;
}

function seedRelayToken() {
  const rawToken = `relay_agent_guard_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const id = `rl_agent_guard_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const now = Math.floor(Date.now() / 1000);
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO relay_tokens (id, name, token_hash, token_prefix, description, combo_id,
        allowed_models, max_tokens_per_request, max_requests_per_minute, max_requests_per_day,
        max_cost_per_day, enabled, created_at, updated_at, expires_at, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?)`
    )
    .run(
      id,
      "agent-guard-side-paths",
      createHash("sha256").update(rawToken).digest("hex"),
      "rl_test",
      "",
      null,
      JSON.stringify(["*"]),
      128000,
      60,
      10000,
      0,
      now,
      now,
      null,
      "{}"
    );
  return rawToken;
}

function relayRequest(path: string, headers: Record<string, string>) {
  return new Request(`http://localhost${path}`, {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${seedRelayToken()}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "anthropic/claude-opus-5",
      messages: [{ role: "user", content: "hi" }],
    }),
  });
}

const gateFor = (headers: Record<string, string>) =>
  gateBifrostFastPath(
    new Request("http://localhost/v1/chat/completions", { method: "POST", headers }),
    {
      model: "anthropic/claude-opus-5",
      messages: [],
    }
  );

test("sidecar gate: a request the guard would refuse is left to the native pipeline", async () => {
  setGuard("block");
  assert.deepEqual(await gateFor(KILO), { rejection: null, allow: false });
  assert.deepEqual(await gateFor(CLI), { rejection: null, allow: true });
  assert.deepEqual(await gateFor(CURL), { rejection: null, allow: true });
  process.env.AGENT_GUARD_STRICT = "true";
  assert.deepEqual(await gateFor(CURL), { rejection: null, allow: false });
  process.env.AGENT_GUARD_MODE = "off";
  assert.deepEqual(await gateFor(KILO), { rejection: null, allow: true });
});

test("sidecar-only relay route: a refused client gets the TS-path hint and the sidecar is never called", async () => {
  useSidecarEnv();
  const { POST } = await import(
    `../../src/app/api/v1/relay/chat/completions/bifrost/route.ts?case=${Date.now()}-${Math.random()}`
  );
  const path = "/api/v1/relay/chat/completions/bifrost";

  setGuard("block");
  let sidecarCalls = stubSidecar();
  const refused = await POST(relayRequest(path, KILO));
  assert.equal(refused.status, 503);
  assert.equal(refused.headers.get("X-Bifrost-Fallback"), "/api/v1/relay/chat/completions");
  const body = await refused.json();
  // buildErrorBody masks the path in the message; the header above carries it.
  assert.equal(body?.error?.message, "This request is served by the TS path. Use <path>.");
  assert.equal(sidecarCalls.length, 0);

  sidecarCalls = stubSidecar();
  const official = await POST(relayRequest(path, CLI));
  assert.equal(official.status, 200);
  assert.equal(official.headers.get("X-Routed-By"), "bifrost");
  assert.equal(sidecarCalls.length, 1);

  setGuard("off");
  sidecarCalls = stubSidecar();
  const unguarded = await POST(relayRequest(path, KILO));
  assert.equal(unguarded.status, 200);
  assert.equal(sidecarCalls.length, 1);
});

test("relay route: a refused client goes to the chat pipeline, never to the sidecar", async () => {
  useSidecarEnv();
  process.env.OMNIROUTE_RELAY_BACKEND = "bifrost";
  const path = "/api/v1/relay/chat/completions";

  setGuard("block");
  let sidecarCalls = stubSidecar();
  const refused = await relayRoute.POST(relayRequest(path, KILO));
  assert.equal(sidecarCalls.length, 0);
  assert.equal(refused.status, 403);
  assert.equal((await refused.json())?.error?.code, "client_agent_not_allowed");

  sidecarCalls = stubSidecar();
  const official = await relayRoute.POST(relayRequest(path, CLI));
  assert.equal(official.status, 200);
  assert.equal(sidecarCalls.length, 1);

  setGuard("off");
  sidecarCalls = stubSidecar();
  const unguarded = await relayRoute.POST(relayRequest(path, KILO));
  assert.equal(unguarded.status, 200);
  assert.equal(sidecarCalls.length, 1);
});

type CountTokensResponse = { input_tokens: number; source: string; provider?: string };

let countTokensKey: string | null = null;
/** One `anthropic` connection and one unrestricted key, created on first use. */
async function countTokensSetup(): Promise<string> {
  if (countTokensKey) return countTokensKey;
  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "anthropic-agent-guard",
    apiKey: "sk-ant-agent-guard",
    isActive: true,
    testStatus: "active",
    priority: 1,
    providerSpecificData: {},
  });
  const key = await apiKeysDb.createApiKey("agent-guard-count", "machine-agent-guard-count");
  countTokensKey = key.key as string;
  return countTokensKey;
}

/** Counts the provider-side count calls and answers them with a plausible count. */
function stubProvider() {
  const providerCalls: string[] = [];
  globalThis.fetch = (async (url: unknown) => {
    providerCalls.push(String(url));
    return Response.json({ input_tokens: 77 });
  }) as typeof fetch;
  return providerCalls;
}

async function countFor(headers: Record<string, string>) {
  const apiKey = await countTokensSetup();
  const response = await countTokensRoute.POST(
    new Request("http://localhost/api/v1/messages/count_tokens", {
      method: "POST",
      headers: {
        ...headers,
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "anthropic/claude-opus-4.6",
        messages: [{ role: "user", content: "Count these tokens" }],
      }),
    })
  );
  assert.equal(response.status, 200);
  return (await response.json()) as CountTokensResponse;
}

test("count_tokens: a refused client gets the local estimate and the provider is never called", async () => {
  setGuard("block");
  let providerCalls = stubProvider();
  const refused = await countFor(KILO);
  assert.equal(refused.source, "local");
  assert.ok(refused.input_tokens > 0);
  assert.equal(providerCalls.length, 0);

  providerCalls = stubProvider();
  const official = await countFor(CLI);
  assert.equal(official.source, "provider");
  assert.equal(official.input_tokens, 77);
  assert.equal(providerCalls.length, 1);

  setGuard("off");
  providerCalls = stubProvider();
  const unguarded = await countFor(KILO);
  assert.equal(unguarded.source, "provider");
  assert.equal(providerCalls.length, 1);
});
