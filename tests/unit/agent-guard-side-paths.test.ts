/**
 * Agent guard `block` mode on the paths that answer outside the chat pipeline.
 *
 * The sidecar fast path, the two relay routes and the provider-side token count
 * reach an upstream before the chat pipeline's dispatch gate runs. A request the
 * guard would refuse must not reach the sidecar or the provider from these paths.
 * An official client, and any client with the flag off, keeps today's behavior.
 * When the guard itself fails, each path proceeds as with the flag off and writes
 * one `warn` line, so the SSE logger is replaced with a capture (module mocks).
 */

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import test, { mock } from "node:test";
import { fileURLToPath } from "node:url";

const TEST_COUNT = 10;

if (typeof mock.module !== "function") {
  test("agent guard side paths run with module mocks in a child process", (t) => {
    const env = { ...process.env };
    delete env.NODE_TEST_CONTEXT;
    const child = spawnSync(
      process.execPath,
      [
        "--experimental-test-module-mocks",
        "--import",
        "tsx/esm",
        "--import",
        "./open-sse/utils/setupPolyfill.ts",
        "--import",
        "./tests/_setup/isolateDataDir.ts",
        "--test",
        "--test-reporter=tap",
        "--test-force-exit",
        fileURLToPath(import.meta.url),
      ],
      {
        cwd: fileURLToPath(new URL("../../", import.meta.url)),
        env,
        encoding: "utf8",
        timeout: 600_000,
        maxBuffer: 16 * 1024 * 1024,
      }
    );
    assert.equal(child.status, 0, `${child.error || ""}\n${child.stdout}\n${child.stderr}`);
    assert.match(child.stdout, new RegExp(`# tests ${TEST_COUNT}\\b`));
    assert.match(child.stdout, new RegExp(`# pass ${TEST_COUNT}\\b`));
    assert.match(child.stdout, /# skipped 0\b/);
    t.diagnostic(`Child run: ${TEST_COUNT} tests passed.`);
  });
} else {
  await registerSidePathTests();
}

async function registerSidePathTests() {
  const logLines: unknown[][] = [];
  const capture =
    (level: string) =>
    (...args: unknown[]) => {
      logLines.push([level, ...args]);
    };
  mock.module("../../src/sse/utils/logger.ts", {
    namedExports: {
      debug: capture("debug"),
      info: capture("info"),
      warn: capture("warn"),
      error: capture("error"),
      request: capture("request"),
    },
  });
  const agentGuardLines = () => logLines.filter((line) => line[1] === "AGENT_GUARD");
  const FAIL_OPEN_LINE = ["warn", "AGENT_GUARD", "agent guard failed open", { error: "TypeError" }];

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

  /**
   * Runs `fn` with a mode read that throws, the way the gate's fail-open test does,
   * and returns the agent guard lines it wrote. The thrown message carries a value
   * that must never reach the log.
   */
  async function withThrowingModeRead<T>(fn: () => T | Promise<T>) {
    const realEnv = process.env;
    process.env = new Proxy(realEnv, {
      get(target, key) {
        if (key === "AGENT_GUARD_MODE") throw new TypeError("mode unreadable sk-SECRET");
        return Reflect.get(target, key);
      },
    });
    const before = agentGuardLines().length;
    let result: T;
    try {
      result = await fn();
    } finally {
      process.env = realEnv;
    }
    return { result, lines: agentGuardLines().slice(before) };
  }

  test.beforeEach(() => {
    logLines.length = 0;
  });

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

  /** `token`: undefined seeds a valid relay token, null sends none, a string is sent as is. */
  function relayRequest(path: string, headers: Record<string, string>, token?: string | null) {
    const bearer = token === undefined ? seedRelayToken() : token;
    return new Request(`http://localhost${path}`, {
      method: "POST",
      headers: {
        ...headers,
        ...(bearer === null ? {} : { authorization: `Bearer ${bearer}` }),
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "anthropic/claude-opus-5",
        messages: [{ role: "user", content: "hi" }],
      }),
    });
  }

  async function importSidecarRoute() {
    useSidecarEnv();
    const { POST } = await import(
      `../../src/app/api/v1/relay/chat/completions/bifrost/route.ts?case=${Date.now()}-${Math.random()}`
    );
    return POST as (request: Request) => Promise<Response>;
  }

  const gateFor = (headers: Record<string, string>, model = "anthropic/claude-opus-5") =>
    gateBifrostFastPath(
      new Request("http://localhost/v1/chat/completions", { method: "POST", headers }),
      { model, messages: [] }
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

  test("sidecar gate: a refused client loses the fast path for a model of another provider too", async () => {
    setGuard("block");
    assert.deepEqual(await gateFor(KILO, "openai/gpt-4.1"), { rejection: null, allow: false });
    assert.deepEqual(await gateFor(CLI, "openai/gpt-4.1"), { rejection: null, allow: true });
  });

  test("sidecar gate: a guard that fails opens the fast path and writes one warn line", async () => {
    setGuard("block");
    const { result, lines } = await withThrowingModeRead(() => gateFor(KILO));
    assert.deepEqual(result, { rejection: null, allow: true });
    assert.deepEqual(lines, [FAIL_OPEN_LINE]);
  });

  test("sidecar-only relay route: a refused client gets the TS-path hint and the sidecar is never called", async () => {
    const POST = await importSidecarRoute();
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

  test("sidecar-only relay route: without a valid relay token the answer does not reveal block mode", async () => {
    const POST = await importSidecarRoute();
    const path = "/api/v1/relay/chat/completions/bifrost";
    const answer = async (token: string | null) => {
      const response = await POST(relayRequest(path, KILO, token));
      return [response.status, await response.json()];
    };
    for (const token of [null, "relay_not_a_real_token"]) {
      setGuard("off");
      const unguarded = await answer(token);
      setGuard("block");
      const guarded = await answer(token);
      // A missing token is a 401. An unknown token's answer is whatever the route gives
      // today, so only its equality across the two modes is asserted.
      if (token === null) assert.equal(unguarded[0], 401);
      assert.notEqual(guarded[0], 503);
      assert.deepEqual(guarded, unguarded);
    }
  });

  test("sidecar-only relay route: a guard that fails lets the sidecar serve and writes one warn line", async () => {
    const POST = await importSidecarRoute();
    setGuard("block");
    const sidecarCalls = stubSidecar();
    const request = relayRequest("/api/v1/relay/chat/completions/bifrost", KILO);
    const { result, lines } = await withThrowingModeRead(() => POST(request));
    assert.equal(result.status, 200);
    assert.equal(sidecarCalls.length, 1);
    assert.deepEqual(lines, [FAIL_OPEN_LINE]);
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

  test("relay route: a guard that fails lets the sidecar serve and writes one warn line", async () => {
    useSidecarEnv();
    process.env.OMNIROUTE_RELAY_BACKEND = "bifrost";
    setGuard("block");
    const sidecarCalls = stubSidecar();
    const request = relayRequest("/api/v1/relay/chat/completions", KILO);
    const { result, lines } = await withThrowingModeRead(() => relayRoute.POST(request));
    assert.equal(result.status, 200);
    assert.equal(sidecarCalls.length, 1);
    assert.deepEqual(lines, [FAIL_OPEN_LINE]);
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

  async function countRequest(headers: Record<string, string>) {
    const apiKey = await countTokensSetup();
    return new Request("http://localhost/api/v1/messages/count_tokens", {
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
    });
  }

  async function countFor(headers: Record<string, string>) {
    const response = await countTokensRoute.POST(await countRequest(headers));
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

  test("count_tokens: a guard that fails keeps the provider count and writes one warn line", async () => {
    setGuard("block");
    const providerCalls = stubProvider();
    const request = await countRequest(KILO);
    const { result, lines } = await withThrowingModeRead(() => countTokensRoute.POST(request));
    const body = (await result.json()) as CountTokensResponse;
    assert.equal(body.source, "provider");
    assert.equal(providerCalls.length, 1);
    assert.deepEqual(lines, [FAIL_OPEN_LINE]);
  });
}
