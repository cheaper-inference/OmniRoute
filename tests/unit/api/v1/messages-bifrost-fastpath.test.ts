import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DB: the native fallback and the API-key policy both read SQLite.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-bifrost-messages-fastpath-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "bifrost-fastpath-api-secret";

const core = await import("../../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../../src/lib/db/apiKeys.ts");
const { resetBifrostCooldowns } =
  await import("../../../../src/shared/services/bifrost/bifrostRouting.ts");

const ORIGINAL_FETCH = globalThis.fetch;
const ORIGINAL_ENV = { ...process.env };

function restore() {
  process.env = { ...ORIGINAL_ENV };
  globalThis.fetch = ORIGINAL_FETCH;
}

test.beforeEach(() => resetBifrostCooldowns());
test.afterEach(() => restore());
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function enableBifrost(backend: "bifrost" | "auto" = "bifrost") {
  process.env.BIFROST_BASE_URL = "http://127.0.0.1:8080";
  process.env.OMNIROUTE_RELAY_BACKEND = backend;
  process.env.BIFROST_ENABLED = "1";
  process.env.BIFROST_TIMEOUT_MS = "5000";
}

function messagesRequest(headers: Record<string, string> = {}) {
  return new Request("http://localhost:20128/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({
      model: "anthropic/claude-3-5-sonnet",
      max_tokens: 16,
      messages: [{ role: "user", content: "hi" }],
    }),
  });
}

test("POST /v1/messages: forwards to bifrost when active and eligible", async () => {
  process.env.BIFROST_BASE_URL = "http://127.0.0.1:8080";
  process.env.OMNIROUTE_RELAY_BACKEND = "bifrost";
  process.env.BIFROST_ENABLED = "1";
  process.env.BIFROST_TIMEOUT_MS = "5000";

  let capturedTargetUrl = "";
  globalThis.fetch = async (url, _init) => {
    capturedTargetUrl = String(url);
    return new Response(
      JSON.stringify({ id: "msg-fastpath-123", role: "assistant", content: [] }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const { POST } = await import(
    `../../../../src/app/api/v1/messages/route.ts?testCase=${Date.now()}-1`
  );

  const req = new Request("http://localhost:20128/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-request-id": "req-fastpath-msg-1",
    },
    body: JSON.stringify({
      model: "anthropic/claude-3-5-sonnet",
      messages: [{ role: "user", content: "hi" }],
    }),
  });

  const res = await POST(req);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("X-Routed-By"), "bifrost");
  // Anthropic-format body -> the sidecar's Anthropic-compatible endpoint, not its OpenAI one.
  assert.equal(capturedTargetUrl, "http://127.0.0.1:8080/anthropic/v1/messages");

  const json = await res.json();
  assert.equal(json.id, "msg-fastpath-123");

  restore();
});

test("POST /v1/messages: falls back to native handleChat on bifrost failure", async () => {
  process.env.BIFROST_BASE_URL = "http://127.0.0.1:8080";
  process.env.OMNIROUTE_RELAY_BACKEND = "auto";
  process.env.BIFROST_ENABLED = "1";

  // Simulate Bifrost failure (502)
  globalThis.fetch = async () => {
    return new Response(JSON.stringify({ error: "gateway down" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  };

  const { POST } = await import(
    `../../../../src/app/api/v1/messages/route.ts?testCase=${Date.now()}-2`
  );

  const req = new Request("http://localhost:20128/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "anthropic/claude-3-5-sonnet",
      messages: [{ role: "user", content: "test messages fallback" }],
    }),
  });

  const res = await POST(req);
  assert.ok(res.headers.get("X-Routing-Fallback"));
  assert.match(res.headers.get("X-Routing-Fallback")!, /bifrost/);

  restore();
});

test("POST /v1/messages: a deactivated API key is rejected before the sidecar is called", async () => {
  enableBifrost("bifrost");
  const created = await apiKeysDb.createApiKey("bifrost-msg-disabled", "machine-bifrost-m1");
  await apiKeysDb.updateApiKeyPermissions(created.id, { isActive: false });

  const bifrostCalls: string[] = [];
  globalThis.fetch = async (url) => {
    bifrostCalls.push(String(url));
    return new Response(JSON.stringify({ id: "must-not-be-served" }), { status: 200 });
  };

  const { POST } = await import(
    `../../../../src/app/api/v1/messages/route.ts?testCase=${Date.now()}-policy-1`
  );
  const res = await POST(messagesRequest({ "x-api-key": created.key }));

  assert.ok([401, 403].includes(res.status), `expected 401/403, got ${res.status}`);
  assert.equal(res.headers.get("X-Routed-By"), null);
  assert.deepEqual(
    bifrostCalls.filter((u) => u.startsWith("http://127.0.0.1:8080")),
    [],
    "the sidecar must not be called for a rejected key"
  );
});

test("POST /v1/messages: a key whose allowedModels excludes the model never reaches the sidecar", async () => {
  enableBifrost("bifrost");
  const created = await apiKeysDb.createApiKey("bifrost-msg-restricted", "machine-bifrost-m2");
  await apiKeysDb.updateApiKeyPermissions(created.id, { allowedModels: ["openai/gpt-4o"] });

  const bifrostCalls: string[] = [];
  globalThis.fetch = async (url) => {
    bifrostCalls.push(String(url));
    return new Response(JSON.stringify({ id: "must-not-be-served" }), { status: 200 });
  };

  const { POST } = await import(
    `../../../../src/app/api/v1/messages/route.ts?testCase=${Date.now()}-policy-2`
  );
  const res = await POST(messagesRequest({ "x-api-key": created.key }));

  assert.ok(res.status >= 400 && res.status < 500, `expected 4xx, got ${res.status}`);
  assert.equal(res.headers.get("X-Routed-By"), null);
  assert.equal(bifrostCalls.length, 0);
});

test("POST /v1/messages: an active, permitted API key is still served by the sidecar", async () => {
  enableBifrost("bifrost");
  const created = await apiKeysDb.createApiKey("bifrost-msg-ok", "machine-bifrost-m3");

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ id: "msg-keyed", type: "message", content: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  const { POST } = await import(
    `../../../../src/app/api/v1/messages/route.ts?testCase=${Date.now()}-policy-3`
  );
  const res = await POST(messagesRequest({ "x-api-key": created.key }));

  assert.equal(res.status, 200);
  assert.equal(res.headers.get("X-Routed-By"), "bifrost");
});

test("POST /v1/messages: a sidecar without the Anthropic endpoint (404) falls back to the native pipeline", async () => {
  enableBifrost("auto");

  globalThis.fetch = async (url) => {
    if (String(url).startsWith("http://127.0.0.1:8080")) {
      return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
    }
    return new Response("{}", { status: 500 });
  };

  const { POST } = await import(
    `../../../../src/app/api/v1/messages/route.ts?testCase=${Date.now()}-unsupported`
  );
  const res = await POST(messagesRequest());

  assert.equal(res.headers.get("X-Routed-By"), null, "the 404 must not be relayed to the client");
  assert.equal(res.headers.get("X-Routing-Fallback-Reason"), "bifrost-error");
});

test("POST /v1/messages: the sidecar's echoed credential and cookie headers are not relayed", async () => {
  enableBifrost("bifrost");

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ id: "msg-echo", type: "message", content: [] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer sidecar-secret",
        "set-cookie": "session=sidecar; Path=/",
      },
    });

  const { POST } = await import(
    `../../../../src/app/api/v1/messages/route.ts?testCase=${Date.now()}-echo`
  );
  const res = await POST(messagesRequest());

  assert.equal(res.status, 200);
  assert.equal(res.headers.get("authorization"), null);
  assert.equal(res.headers.get("set-cookie"), null);
});
