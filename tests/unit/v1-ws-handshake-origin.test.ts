/**
 * The `/v1/ws` bridge (run-next: `npm start` / `npm run dev`) returns
 * `/v1/chat/completions`, `/v1/messages` and `/v1/responses` output as WebSocket frames.
 * Browsers skip CORS for WebSocket, so the `/api/v1/ws?handshake=1` route must check the
 * browser's `Origin` (forwarded by the bridge) the same way `/v1/responses` does, and the
 * bridge must refuse to upgrade unless the route ran that check.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-v1-ws-origin-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "v1-ws-origin-api-key-secret";
process.env.OMNIROUTE_PEER_STAMP_TOKEN = "v1-ws-origin-peer-token";

const ENV_KEYS = [
  "CORS_ALLOW_ALL",
  "CORS_ALLOWED_ORIGINS",
  "CORS_ORIGIN",
  "OMNIROUTE_PUBLIC_BASE_URL",
  "OMNIROUTE_TRUST_PROXY",
] as const;

const coreDb = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const wsRoute = await import("../../src/app/api/v1/ws/route.ts");
const { createOmnirouteWsBridge } = await import("../../scripts/dev/v1-ws-bridge.mjs");

const LOOPBACK_STAMP = `${process.env.OMNIROUTE_PEER_STAMP_TOKEN}|127.0.0.1`;
const LOCAL_HOST = "127.0.0.1:20128";

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

function handshakeGet({
  origin,
  bridge = { host: LOCAL_HOST, "x-omniroute-peer-ip": LOOPBACK_STAMP },
  bridgeRaw,
  apiKey,
}: {
  origin?: string;
  bridge?: Record<string, string> | null;
  bridgeRaw?: string;
  apiKey?: string;
} = {}): Request {
  const headers: Record<string, string> = {};
  if (origin !== undefined) headers.origin = origin;
  if (bridgeRaw !== undefined) headers["x-omniroute-ws-handshake"] = bridgeRaw;
  else if (bridge) headers["x-omniroute-ws-handshake"] = JSON.stringify(bridge);
  const query = apiKey ? `&api_key=${encodeURIComponent(apiKey)}` : "";
  return new Request(`http://127.0.0.1:20128/api/v1/ws?handshake=1${query}`, { headers });
}

async function verdict(request: Request) {
  const response = await wsRoute.GET(request);
  const body = (await response.json()) as { originChecked?: boolean; error?: { code?: string } };
  return {
    status: response.status,
    code: body.error?.code ?? null,
    originChecked: body.originChecked ?? null,
  };
}

test("bridge handshake: cross-site Origin is refused (403 ws_origin_forbidden)", async () => {
  assert.deepEqual(await verdict(handshakeGet({ origin: "https://evil.example" })), {
    status: 403,
    code: "ws_origin_forbidden",
    originChecked: null,
  });
});

test("bridge handshake: Origin null and DNS-rebinding Host are refused", async () => {
  assert.equal((await verdict(handshakeGet({ origin: "null" }))).status, 403);
  const rebinding = handshakeGet({
    origin: "http://evil.example:20128",
    bridge: { host: "evil.example:20128", "x-omniroute-peer-ip": LOOPBACK_STAMP },
  });
  assert.equal((await verdict(rebinding)).status, 403);
});

test("bridge handshake: forged peer stamp does not make a LAN Host a candidate", async () => {
  const forged = handshakeGet({
    origin: "http://192.168.1.20:20128",
    bridge: { host: "192.168.1.20:20128", "x-omniroute-peer-ip": "wrong-token|127.0.0.1" },
  });
  assert.equal((await verdict(forged)).status, 403);
});

test("bridge handshake: malformed or missing handshake JSON fails closed", async () => {
  assert.equal(
    (await verdict(handshakeGet({ origin: "https://evil.example", bridgeRaw: "{not json" })))
      .status,
    403
  );
  assert.equal(
    (await verdict(handshakeGet({ origin: "http://127.0.0.1:20128", bridgeRaw: "[]" }))).status,
    403
  );
});

test("bridge handshake: no Origin (CLI/SDK) and same-origin loopback are accepted", async () => {
  assert.deepEqual(await verdict(handshakeGet()), {
    status: 200,
    code: null,
    originChecked: true,
  });
  assert.deepEqual(await verdict(handshakeGet({ origin: "http://127.0.0.1:20128" })), {
    status: 200,
    code: null,
    originChecked: true,
  });
});

test("bridge handshake: CORS allowlist admits a configured origin", async () => {
  setEnv({ CORS_ALLOWED_ORIGINS: "https://app.example" });
  assert.equal((await verdict(handshakeGet({ origin: "https://app.example" }))).status, 200);
});

test("bridge handshake: a valid API key is exempt from the Origin check", async () => {
  const key = await apiKeysDb.createApiKey("v1 ws origin key", "machine-v1-ws-origin");
  const result = await verdict(handshakeGet({ origin: "https://evil.example", apiKey: key.key }));
  assert.deepEqual(result, { status: 200, code: null, originChecked: true });
  assert.equal(
    (await verdict(handshakeGet({ origin: "https://evil.example", apiKey: "sk-bogus" }))).status,
    403
  );
});

test("plain GET without the bridge header gets no verdict and is not blocked", async () => {
  assert.deepEqual(await verdict(handshakeGet({ origin: "https://evil.example", bridge: null })), {
    status: 200,
    code: null,
    originChecked: false,
  });
});

function listen(server: http.Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve((server.address() as { port: number }).port));
  });
}

function rawUpgrade(port: number, headers: Record<string, string>): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: "127.0.0.1",
      port,
      path: "/v1/ws",
      headers: {
        connection: "Upgrade",
        upgrade: "websocket",
        "sec-websocket-version": "13",
        "sec-websocket-key": "dGhlIHNhbXBsZSBub25jZQ==",
        ...headers,
      },
    });
    req.on("upgrade", (res, socket) => {
      socket.destroy();
      resolve(String(res.statusCode));
    });
    req.on("response", (res) => {
      res.resume();
      resolve(String(res.statusCode));
    });
    req.on("error", reject);
    req.end();
  });
}

test("bridge forwards the browser handshake and fails closed without originChecked", async () => {
  const seen: Array<Record<string, unknown>> = [];
  let inferenceCalls = 0;
  let answerOriginChecked = false;
  const backend = http.createServer((req, res) => {
    const url = new URL(req.url || "/", "http://x");
    if (url.pathname === "/api/v1/ws") {
      seen.push(JSON.parse(String(req.headers["x-omniroute-ws-handshake"] || "null")));
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify(
          answerOriginChecked ? { ok: true, originChecked: true, path: "/v1/ws" } : { ok: true }
        )
      );
      return;
    }
    inferenceCalls += 1;
    res.writeHead(404);
    res.end();
  });
  const backendPort = await listen(backend);
  const bridge = createOmnirouteWsBridge({ baseUrl: `http://127.0.0.1:${backendPort}` });
  const front = http.createServer();
  front.on("upgrade", (req, socket, head) => {
    void bridge.handleUpgrade(req, socket, head);
  });
  const frontPort = await listen(front);

  try {
    assert.equal(await rawUpgrade(frontPort, { origin: "https://evil.example" }), "403");
    assert.equal(seen.length, 1);
    assert.equal(seen[0]?.host, `127.0.0.1:${frontPort}`);
    assert.match(String(seen[0]?.["x-omniroute-peer-ip"]), /\|127\.0\.0\.1$/);

    answerOriginChecked = true;
    assert.equal(await rawUpgrade(frontPort, {}), "101");
    assert.equal(inferenceCalls, 0);
  } finally {
    front.close();
    backend.close();
  }
});
