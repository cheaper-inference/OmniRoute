// Plugin hooks must not receive the client's credentials. A plugin is third-party code
// running as a plain Node child process, so whatever the hook context carries is fully
// readable by it. The request headers handed to onRequest/onResponse/onError must not
// include `authorization`, `x-api-key`, `proxy-authorization` or `cookie` (any casing), and the
// API key record must not carry the key itself — only its id/name/scopes-style metadata.
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const { registerHook, unregisterHooks, runOnResponse, runOnError } =
  await import("../../src/lib/plugins/hooks.ts");
const { runPluginOnRequestHook } =
  await import("../../open-sse/handlers/chatCore/pluginOnRequest.ts");
const { loadPlugin } = await import("../../src/lib/plugins/loader.ts");

const SECRET = "sk-client-secret-value-0001";
const CREDENTIAL_HEADERS = ["authorization", "x-api-key", "proxy-authorization", "cookie"];

function clientHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${SECRET}`,
    "X-Api-Key": SECRET,
    "proxy-authorization": `Basic ${SECRET}`,
    Cookie: `auth_token=${SECRET}; theme=dark`,
    "x-trace-id": "trace-123",
    "content-type": "application/json",
  };
}

function apiKeyRecord() {
  return {
    id: "key-id-1",
    name: "ci key",
    scopes: ["chat"],
    noLog: false,
    key: SECRET,
    keyHash: "fingerprint-of-the-key",
  };
}

function assertNoCredentials(seen: unknown) {
  const ctx = seen as { headers?: Record<string, unknown>; apiKeyInfo?: Record<string, unknown> };
  assert.ok(ctx, "expected the hook to run");
  const headerNames = Object.keys(ctx.headers ?? {}).map((h) => h.toLowerCase());
  for (const name of CREDENTIAL_HEADERS) {
    assert.equal(headerNames.includes(name), false, `hook received the ${name} header`);
  }
  assert.equal(ctx.headers?.["x-trace-id"], "trace-123", "non-credential headers stay visible");
  assert.equal(ctx.apiKeyInfo?.id, "key-id-1");
  assert.equal(ctx.apiKeyInfo?.name, "ci key");
  assert.deepEqual(ctx.apiKeyInfo?.scopes, ["chat"]);
  assert.equal("key" in (ctx.apiKeyInfo ?? {}), false, "hook received the API key value");
  assert.equal("keyHash" in (ctx.apiKeyInfo ?? {}), false, "hook received the key fingerprint");
  assert.equal(JSON.stringify(seen).includes(SECRET), false, "the client secret reached the hook");
}

const registered: string[] = [];
afterEach(() => {
  for (const name of registered.splice(0)) unregisterHooks(name);
});

test("a real plugin process's onRequest hook never sees the client's credentials", async (t) => {
  const pluginDir = await mkdtemp(join(tmpdir(), "omniroute-plugin-cred-"));
  const entryPoint = join(pluginDir, "index.mjs");
  await writeFile(
    entryPoint,
    `export async function onRequest(ctx) {
  return { body: { seen: { headers: ctx.headers ?? null, apiKeyInfo: ctx.apiKeyInfo ?? null } } };
}
`,
    "utf-8"
  );
  const loaded = await loadPlugin(entryPoint, {
    name: "credential-probe",
    version: "1.0.0",
    license: "MIT",
    main: "index.mjs",
    source: "local",
    tags: [],
    requires: { permissions: [] },
    hooks: { onRequest: true, onResponse: false, onError: false },
    skills: [],
    enabledByDefault: false,
    configSchema: {},
  } as unknown as Parameters<typeof loadPlugin>[1]);
  t.after(async () => {
    loaded.cleanup();
    await rm(pluginDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });
  registerHook("onRequest", "credential-probe", loaded.plugin.onRequest as never);
  registered.push("credential-probe");

  const headers = clientHeaders();
  const gate = await runPluginOnRequestHook({
    requestId: "req-cred-1",
    body: { messages: [{ role: "user", content: "hi" }] },
    model: "gpt-x",
    provider: "openai",
    apiKeyInfo: apiKeyRecord(),
    headers,
  });

  assert.equal(gate.blocked, false);
  if (gate.blocked) return;
  const body = gate.body as { seen?: unknown } | undefined;
  assertNoCredentials(body?.seen);
  // The caller's own header record is not mutated: the request pipeline still needs it.
  assert.equal(headers.Authorization, `Bearer ${SECRET}`);
  assert.equal(headers["X-Api-Key"], SECRET);
});

test("onResponse hooks never see the client's credentials", async () => {
  let seen: unknown;
  registerHook("onResponse", "credential-probe-response", async (ctx: unknown) => {
    seen = ctx;
  });
  registered.push("credential-probe-response");

  await runOnResponse(
    {
      requestId: "req-cred-2",
      body: {},
      model: "gpt-x",
      provider: "openai",
      apiKeyInfo: apiKeyRecord(),
      headers: clientHeaders(),
      metadata: {},
    },
    { status: 200 }
  );

  assertNoCredentials(seen);
});

test("onError hooks never see the client's credentials", async () => {
  let seen: unknown;
  registerHook("onError", "credential-probe-error", async (ctx: unknown) => {
    seen = ctx;
  });
  registered.push("credential-probe-error");

  await runOnError(
    {
      requestId: "req-cred-3",
      body: {},
      model: "gpt-x",
      provider: "openai",
      apiKeyInfo: apiKeyRecord(),
      headers: clientHeaders(),
      metadata: {},
    },
    new Error("upstream failed")
  );

  assertNoCredentials(seen);
});

test("a context without headers or API key record still reaches the hook unchanged", async () => {
  let seen: Record<string, unknown> | undefined;
  registerHook("onError", "credential-probe-empty", async (ctx: unknown) => {
    seen = ctx as Record<string, unknown>;
  });
  registered.push("credential-probe-empty");

  await runOnError(
    { requestId: "req-cred-4", body: {}, model: "m", provider: "p", metadata: {} },
    new Error("x")
  );

  assert.ok(seen);
  assert.equal(seen!.headers, undefined);
  assert.equal(seen!.apiKeyInfo, undefined);
  assert.equal(seen!.requestId, "req-cred-4");
});
