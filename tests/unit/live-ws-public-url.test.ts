import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-live-ws-public-url-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_PUBLIC_URL = process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-live-ws-public-url-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { updateSettings } = await import("@/lib/db/settings");
const localDb = { updateSettings };
const wsRoute = await import("../../src/app/api/v1/ws/route.ts");

function resetStorage() {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  resetStorage();
  delete process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL;
  await localDb.updateSettings({
    wsAuth: false,
    requireLogin: true,
    password: "hashed-password",
  });
});

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  if (ORIGINAL_API_KEY_SECRET === undefined) {
    delete process.env.API_KEY_SECRET;
  } else {
    process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  }

  if (ORIGINAL_PUBLIC_URL === undefined) {
    delete process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL;
  } else {
    process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL = ORIGINAL_PUBLIC_URL;
  }
});

test("handshake response includes publicUrl when NEXT_PUBLIC_LIVE_WS_PUBLIC_URL is set", async () => {
  process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL = "wss://ws.my-ai.com/live-ws";

  const response = await wsRoute.GET(
    new Request("http://localhost/api/v1/ws?handshake=1", {
      headers: { origin: "http://localhost" },
    })
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.live.publicUrl, "wss://ws.my-ai.com/live-ws");
});

test("handshake response includes null publicUrl when NEXT_PUBLIC_LIVE_WS_PUBLIC_URL is unset", async () => {
  delete process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL;

  const response = await wsRoute.GET(
    new Request("http://localhost/api/v1/ws?handshake=1", {
      headers: { origin: "http://localhost" },
    })
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.live.publicUrl, null);
});

test("protocol.live.publicUrl reflects env set after module import (lazy read)", async () => {
  process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL = "wss://custom.example.com/ws";

  const response = await wsRoute.GET(new Request("http://localhost/api/v1/ws"));

  assert.equal(response.status, 426);
  const body = await response.json();
  assert.equal(body.protocol.live.publicUrl, "wss://custom.example.com/ws");
});

test("publicUrl with non-WebSocket scheme is rejected (null)", async () => {
  process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL = "https://ws.my-ai.com/live-ws";

  const response = await wsRoute.GET(
    new Request("http://localhost/api/v1/ws?handshake=1", {
      headers: { origin: "http://localhost" },
    })
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.live.publicUrl, null);
  assert.equal(body.protocol.live.publicUrl, null);
});

test("publicUrl with ws:// scheme is accepted", async () => {
  process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL = "ws://lan-host:20132/live-ws";

  const response = await wsRoute.GET(
    new Request("http://localhost/api/v1/ws?handshake=1", {
      headers: { origin: "http://localhost" },
    })
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.live.publicUrl, "ws://lan-host:20132/live-ws");
});

test("handshake path is derived from NEXT_PUBLIC_LIVE_WS_PUBLIC_URL pathname", async () => {
  process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL = "wss://ws.my-ai.com/my-custom-ws";

  const response = await wsRoute.GET(
    new Request("http://localhost/api/v1/ws?handshake=1", {
      headers: { origin: "http://localhost" },
    })
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.live.path, "/my-custom-ws");
});

test("handshake path defaults to /live-ws when NEXT_PUBLIC_LIVE_WS_PUBLIC_URL is unset", async () => {
  delete process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL;

  const response = await wsRoute.GET(
    new Request("http://localhost/api/v1/ws?handshake=1", {
      headers: { origin: "http://localhost" },
    })
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.live.path, "/live-ws");
});

// KEA-9514: the client only dials the live server when the handshake does not say it is
// off, and only dials the page's own origin when the main HTTP port relays `/live-ws`.
const RELAY_FLAG = "__omnirouteLiveWsSameOriginRelay";

async function handshakeLive() {
  const response = await wsRoute.GET(
    new Request("http://localhost/api/v1/ws?handshake=1", {
      headers: { origin: "http://localhost" },
    })
  );
  assert.equal(response.status, 200);
  return (await response.json()).live;
}

test("KEA-9514 handshake reports the live server enabled by default and disabled when off", async () => {
  const original = process.env.OMNIROUTE_ENABLE_LIVE_WS;
  try {
    delete process.env.OMNIROUTE_ENABLE_LIVE_WS;
    assert.equal((await handshakeLive()).enabled, true);
    for (const off of ["0", "false", "FALSE"]) {
      process.env.OMNIROUTE_ENABLE_LIVE_WS = off;
      assert.equal((await handshakeLive()).enabled, false, `OMNIROUTE_ENABLE_LIVE_WS=${off}`);
    }
    process.env.OMNIROUTE_ENABLE_LIVE_WS = "1";
    assert.equal((await handshakeLive()).enabled, true);
  } finally {
    if (original === undefined) delete process.env.OMNIROUTE_ENABLE_LIVE_WS;
    else process.env.OMNIROUTE_ENABLE_LIVE_WS = original;
  }
});

test("KEA-9514 handshake reports sameOrigin only when the main port relays /live-ws", async () => {
  const globals = globalThis as Record<string, unknown>;
  const original = globals[RELAY_FLAG];
  try {
    delete globals[RELAY_FLAG];
    assert.equal((await handshakeLive()).sameOrigin, false);
    globals[RELAY_FLAG] = true;
    assert.equal((await handshakeLive()).sameOrigin, true);
  } finally {
    if (original === undefined) delete globals[RELAY_FLAG];
    else globals[RELAY_FLAG] = original;
  }
});

test("KEA-9514 the production wrapper marks the relay before Next loads", () => {
  const src = fs.readFileSync(
    new URL("../../scripts/dev/standalone-server-ws.mjs", import.meta.url),
    "utf8"
  );
  const mark = src.indexOf(`globalThis.${RELAY_FLAG} = true`);
  assert.ok(mark >= 0, "standalone-server-ws.mjs must set the relay flag");
  assert.ok(
    mark < src.indexOf('import("./server.js")'),
    "the flag must be set before ./server.js loads"
  );
});
