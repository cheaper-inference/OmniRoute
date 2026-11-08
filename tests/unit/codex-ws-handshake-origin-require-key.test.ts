/**
 * The Responses-over-WebSocket handshake (`/v1/responses` upgrade → internal
 * `authenticate` bridge action) must apply the same gate as HTTP `/v1/responses`:
 *
 *  - `REQUIRE_API_KEY=true` needs a valid API key or dashboard session; before this
 *    fix the handshake only honoured the `wsAuth` setting, so a key-less socket
 *    reached Codex while HTTP returned 401.
 *  - Browsers skip CORS for WebSocket, so a cross-site page (`Origin: evil`) could
 *    open the socket on a keyless install and read the completion. A present,
 *    foreign `Origin` is now refused unless the CORS allowlist admits it, it is one
 *    of OmniRoute's own public origins, or the handshake carries a valid API key.
 *    No `Origin` (Codex CLI and other non-browser clients) is unaffected.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-ws-origin-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-ws-origin-api-key-secret";
process.env.OMNIROUTE_WS_BRIDGE_SECRET = "codex-ws-origin-bridge-secret";
process.env.OMNIROUTE_PEER_STAMP_TOKEN = "codex-ws-origin-peer-token";
process.env.JWT_SECRET = "codex-ws-origin-jwt-secret-0123456789abcdef";

const ENV_KEYS = [
  "REQUIRE_API_KEY",
  "CORS_ALLOW_ALL",
  "CORS_ALLOWED_ORIGINS",
  "CORS_ORIGIN",
  "OMNIROUTE_PUBLIC_BASE_URL",
  "OMNIROUTE_TRUST_PROXY",
] as const;

const coreDb = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const sessionToken = await import("../../src/shared/utils/dashboardSessionToken.ts");
const route = await import("../../src/app/api/internal/codex-responses-ws/route.ts");

const LOOPBACK_STAMP = `${process.env.OMNIROUTE_PEER_STAMP_TOKEN}|127.0.0.1`;
const LOCAL_HOST = "127.0.0.1:20128";

type Handshake = Record<string, string>;

function bridgeRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost/api/internal/codex-responses-ws", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-omniroute-ws-bridge-secret": process.env.OMNIROUTE_WS_BRIDGE_SECRET as string,
    },
    body: JSON.stringify(body),
  });
}

function authenticateRequest({
  apiKey,
  origin,
  cookie,
  handshake = { host: LOCAL_HOST, "x-omniroute-peer-ip": LOOPBACK_STAMP },
}: {
  apiKey?: string;
  origin?: string;
  cookie?: string;
  handshake?: Handshake;
} = {}): Request {
  const headers: Record<string, string> = {};
  if (apiKey) headers.authorization = `Bearer ${apiKey}`;
  if (origin) headers.origin = origin;
  if (cookie) headers.cookie = cookie;
  return bridgeRequest({ action: "authenticate", requestUrl: "/v1/responses", headers, handshake });
}

async function status(request: Request): Promise<{ status: number; code: string | null }> {
  const response = await route.POST(request);
  const body = (await response.json()) as { error?: { code?: string } };
  return { status: response.status, code: body.error?.code ?? null };
}

function setEnv(values: Partial<Record<(typeof ENV_KEYS)[number], string>>) {
  for (const key of ENV_KEYS) delete process.env[key];
  Object.assign(process.env, values);
}

test.beforeEach(() => {
  apiKeysDb.resetApiKeyState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  setEnv({});
});

test.after(() => {
  setEnv({});
  apiKeysDb.resetApiKeyState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("REQUIRE_API_KEY=true: handshake without a key is refused (401)", async () => {
  setEnv({ REQUIRE_API_KEY: "true" });
  assert.deepEqual(await status(authenticateRequest()), {
    status: 401,
    code: "ws_auth_required",
  });
});

test("REQUIRE_API_KEY=true: handshake with an unknown key is refused (403)", async () => {
  setEnv({ REQUIRE_API_KEY: "true" });
  assert.deepEqual(await status(authenticateRequest({ apiKey: "sk-not-a-real-key" })), {
    status: 403,
    code: "ws_auth_invalid",
  });
});

test("REQUIRE_API_KEY=true: handshake with a valid key is accepted", async () => {
  setEnv({ REQUIRE_API_KEY: "true" });
  const key = await apiKeysDb.createApiKey("ws origin key", "machine-ws-origin-a");
  assert.equal((await status(authenticateRequest({ apiKey: key.key }))).status, 200);
});

test("REQUIRE_API_KEY=true: prepare without a key is refused too", async () => {
  setEnv({ REQUIRE_API_KEY: "true" });
  const result = await status(
    bridgeRequest({
      action: "prepare",
      requestUrl: "/v1/responses",
      response: { model: "gpt-5.5" },
    })
  );
  assert.deepEqual(result, { status: 401, code: "ws_auth_required" });
});

test("keyless install: a cross-site Origin without a key is refused (403)", async () => {
  assert.deepEqual(await status(authenticateRequest({ origin: "https://evil.example" })), {
    status: 403,
    code: "ws_origin_forbidden",
  });
});

test("keyless install: a cross-site Origin with an unknown key is refused (403)", async () => {
  const result = await status(
    authenticateRequest({ origin: "https://evil.example", apiKey: "sk-garbage" })
  );
  assert.deepEqual(result, { status: 403, code: "ws_origin_forbidden" });
});

test("keyless install: an opaque `null` Origin is refused", async () => {
  assert.equal((await status(authenticateRequest({ origin: "null" }))).status, 403);
});

test("DNS rebinding (Host and Origin both the attacker domain) is refused", async () => {
  const result = await status(
    authenticateRequest({
      origin: "http://rebind.evil.test:20128",
      handshake: { host: "rebind.evil.test:20128", "x-omniroute-peer-ip": LOOPBACK_STAMP },
    })
  );
  assert.equal(result.status, 403);
});

test("no Origin (Codex CLI and other non-browser clients) keeps working without a key", async () => {
  assert.equal((await status(authenticateRequest())).status, 200);
});

test("same-origin page on the loopback host keeps working without a key", async () => {
  assert.equal((await status(authenticateRequest({ origin: `http://${LOCAL_HOST}` }))).status, 200);
});

test("same-origin page on the configured public base URL keeps working", async () => {
  setEnv({ OMNIROUTE_PUBLIC_BASE_URL: "https://omni.example.com" });
  const result = await status(
    authenticateRequest({
      origin: "https://omni.example.com",
      handshake: { host: "127.0.0.1:20128", "x-omniroute-peer-ip": LOOPBACK_STAMP },
    })
  );
  assert.equal(result.status, 200);
});

test("Origin in CORS_ALLOWED_ORIGINS is accepted; CORS_ALLOW_ALL accepts any", async () => {
  setEnv({ CORS_ALLOWED_ORIGINS: "https://app.example" });
  assert.equal((await status(authenticateRequest({ origin: "https://app.example" }))).status, 200);
  assert.equal((await status(authenticateRequest({ origin: "https://evil.example" }))).status, 403);
  setEnv({ CORS_ALLOW_ALL: "true" });
  assert.equal((await status(authenticateRequest({ origin: "https://evil.example" }))).status, 200);
});

test("a cross-site Origin with a valid API key is accepted (same as HTTP token CORS)", async () => {
  const key = await apiKeysDb.createApiKey("ws origin key", "machine-ws-origin-b");
  const result = await status(
    authenticateRequest({ origin: "https://browser-client.example", apiKey: key.key })
  );
  assert.equal(result.status, 200);
});

test("a dashboard session cookie does not exempt a cross-site Origin", async () => {
  setEnv({ REQUIRE_API_KEY: "true" });
  const secret = sessionToken.getDashboardJwtSecret();
  assert.ok(secret, "JWT secret must be configured for this test");
  const token = await sessionToken.mintDashboardSessionToken(secret);
  const cookie = `${sessionToken.DASHBOARD_SESSION_COOKIE}=${token}`;
  assert.equal((await status(authenticateRequest({ cookie }))).status, 200);
  assert.equal(
    (await status(authenticateRequest({ cookie, origin: `http://${LOCAL_HOST}` }))).status,
    200
  );
  assert.deepEqual(await status(authenticateRequest({ cookie, origin: "http://localhost:5173" })), {
    status: 403,
    code: "ws_origin_forbidden",
  });
});

test("a forged peer stamp does not turn the Host into a trusted origin", async () => {
  const result = await status(
    authenticateRequest({
      origin: "http://192.168.1.50:20128",
      handshake: { host: "192.168.1.50:20128", "x-omniroute-peer-ip": "wrong-token|127.0.0.1" },
    })
  );
  assert.equal(result.status, 403);
});
