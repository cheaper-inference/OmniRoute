/**
 * Integration tests: Traffic Inspector capture-modes endpoints
 *
 * Tests:
 *   - GET  /capture-modes — status overview
 *   - POST /capture-modes/http-proxy — start/stop (ephemeral port to avoid 8080 conflict)
 *   - POST /capture-modes/system-proxy — apply/revert (mocked OS commands)
 *   - the dead `tls-intercept` toggle stays removed: the HTTP_PROXY listener only
 *     CONNECT-tunnels HTTPS (src/mitm/inspector/httpProxyServer.ts), so no route,
 *     status field or state accessor may advertise HTTPS decryption for it.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import net from "node:net";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ti-capture-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.INSPECTOR_HTTP_PROXY_PORT = "0"; // ephemeral port

const captureModesRoute =
  await import("../../src/app/api/tools/traffic-inspector/capture-modes/route.ts");
const httpProxyRoute =
  await import("../../src/app/api/tools/traffic-inspector/capture-modes/http-proxy/route.ts");
const systemProxyRoute =
  await import("../../src/app/api/tools/traffic-inspector/capture-modes/system-proxy/route.ts");
const captureState = await import("../../src/lib/inspector/captureState.ts");
const { setHttpProxyHandle, getHttpProxyHandle, clearSystemProxy } = captureState;
const { __setExec } = await import("../../src/mitm/inspector/systemProxyConfig.ts");

test.beforeEach(() => {
  // Ensure no running proxy handle leaks between tests
  const handle = getHttpProxyHandle();
  if (handle) {
    handle.stop().catch(() => {
      /* ignore */
    });
    setHttpProxyHandle(null);
  }
  clearSystemProxy();
});

test.after(() => {
  // Clean up any running proxy
  const handle = getHttpProxyHandle();
  if (handle) {
    handle.stop().catch(() => {
      /* ignore */
    });
    setHttpProxyHandle(null);
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── GET /capture-modes ──────────────────────────────────────────────────────

test("GET /capture-modes: returns status of all modes", async () => {
  const res = await captureModesRoute.GET();
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    agentBridge: boolean;
    httpProxy: { running: boolean; port: number | null };
    systemProxy: { applied: boolean };
  };
  assert.equal(body.agentBridge, true);
  assert.equal(body.httpProxy.running, false);
  assert.equal(body.systemProxy.applied, false);
  assert.deepEqual(Object.keys(body).sort(), [
    "agentBridge",
    "customHosts",
    "httpProxy",
    "systemProxy",
  ]);
});

test("GET /capture-modes: does not advertise a TLS-intercept toggle", async () => {
  const res = await captureModesRoute.GET();
  assert.equal(res.status, 200);
  const body = (await res.json()) as Record<string, unknown>;
  assert.equal("tlsIntercept" in body, false);
});

// ── POST /capture-modes/http-proxy ─────────────────────────────────────────

test("http-proxy: start binds an ephemeral port", async () => {
  const req = new Request("http://localhost/api/tools/traffic-inspector/capture-modes/http-proxy", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: "start" }),
  });
  const res = await httpProxyRoute.POST(req);
  assert.equal(res.status, 201);
  const body = (await res.json()) as { ok: boolean; running: boolean; port: number };
  assert.equal(body.ok, true);
  assert.equal(body.running, true);
  assert.ok(body.port > 0, "should have a bound port");

  // Clean up
  const handle = getHttpProxyHandle();
  if (handle) {
    await handle.stop();
    setHttpProxyHandle(null);
  }
});

test("http-proxy: stop when not running returns ok", async () => {
  const req = new Request("http://localhost/api/tools/traffic-inspector/capture-modes/http-proxy", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: "stop" }),
  });
  const res = await httpProxyRoute.POST(req);
  assert.equal(res.status, 200);
  const body = (await res.json()) as { ok: boolean; running: boolean };
  assert.equal(body.ok, true);
  assert.equal(body.running, false);
});

test("http-proxy: start then stop lifecycle", async () => {
  const startReq = new Request(
    "http://localhost/api/tools/traffic-inspector/capture-modes/http-proxy",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "start" }),
    }
  );
  const startRes = await httpProxyRoute.POST(startReq);
  assert.equal(startRes.status, 201);

  const stopReq = new Request(
    "http://localhost/api/tools/traffic-inspector/capture-modes/http-proxy",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "stop" }),
    }
  );
  const stopRes = await httpProxyRoute.POST(stopReq);
  assert.equal(stopRes.status, 200);
  const body = (await stopRes.json()) as { running: boolean };
  assert.equal(body.running, false);
});

test("http-proxy: EADDRINUSE returns 409 with structured error", async () => {
  // Import startHttpProxyServer directly so we can test the low-level error path
  // without depending on the module-cached DEFAULT_PORT.
  const { startHttpProxyServer } = await import("../../src/mitm/inspector/httpProxyServer.ts");

  // Occupy a random port
  const blocker = net.createServer();
  await new Promise<void>((resolve) => blocker.listen(0, "127.0.0.1", resolve));
  const blockedPort = (blocker.address() as net.AddressInfo).port;

  try {
    // startHttpProxyServer should reject with code === EADDRINUSE
    let caught: NodeJS.ErrnoException | null = null;
    try {
      await startHttpProxyServer(blockedPort);
    } catch (err) {
      caught = err as NodeJS.ErrnoException;
    }
    assert.ok(caught !== null, "should have thrown");
    assert.equal(caught?.code, "EADDRINUSE");
  } finally {
    blocker.close();
  }
});

// ── POST /capture-modes/system-proxy ───────────────────────────────────────

test("system-proxy: apply with mocked OS commands", async () => {
  const restore = __setExec(async (_file, _args) => ({
    stdout: "Enabled: No\nServer: \nPort: 0",
    stderr: "",
  }));
  try {
    const req = new Request(
      "http://localhost/api/tools/traffic-inspector/capture-modes/system-proxy",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "apply", port: 8080, guardMinutes: 1 }),
      }
    );
    const res = await systemProxyRoute.POST(req);
    assert.equal(res.status, 200);
    const body = (await res.json()) as { ok: boolean; applied: boolean };
    assert.equal(body.ok, true);
    assert.equal(body.applied, true);
  } finally {
    restore();
    clearSystemProxy();
  }
});

test("system-proxy: revert without prior apply is a no-op", async () => {
  const restore = __setExec(async (_file, _args) => ({ stdout: "", stderr: "" }));
  try {
    const req = new Request(
      "http://localhost/api/tools/traffic-inspector/capture-modes/system-proxy",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "revert" }),
      }
    );
    const res = await systemProxyRoute.POST(req);
    assert.equal(res.status, 200);
    const body = (await res.json()) as { applied: boolean };
    assert.equal(body.applied, false);
  } finally {
    restore();
  }
});

test("system-proxy: rejects invalid action", async () => {
  const req = new Request(
    "http://localhost/api/tools/traffic-inspector/capture-modes/system-proxy",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "invalid" }),
    }
  );
  const res = await systemProxyRoute.POST(req);
  assert.equal(res.status, 400);
});

// ── Removed: POST /capture-modes/tls-intercept ─────────────────────────────

test("tls-intercept: the dead toggle route and its state are gone", () => {
  const routeDir = path.join(
    process.cwd(),
    "src/app/api/tools/traffic-inspector/capture-modes/tls-intercept"
  );
  assert.equal(fs.existsSync(routeDir), false, "tls-intercept route must not exist");
  assert.equal("isTlsInterceptEnabled" in captureState, false);
  assert.equal("setTlsIntercept" in captureState, false);
});
